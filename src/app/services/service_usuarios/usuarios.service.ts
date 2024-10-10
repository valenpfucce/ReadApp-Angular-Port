import { Injectable } from '@angular/core'
import { usuarios, LoginVer } from '../../mocks/mock_usuarios'
import { sistemaValidacion, Usuario, UsuarioJSON } from '../../domain/usuario'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom, lastValueFrom, Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { REST_SERVER_URL } from '../configuration'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  idUsuarioActivo!: number
  // listaUsuarios = usuarios;
  validador!: sistemaValidacion
  router!: Router
  errors: String[] = []
  loginVerification!: LoginVer

  private readonly sessionKey = 'userSession'

  constructor(/*private router: Router,*/ private httpClient: HttpClient) {
    this.validador = new sistemaValidacion()
    this.loginVerification = new LoginVer()
  }

  async loginGetUsuarioIdToSS(
    mail: string,
    contrasenia: string
  ): Promise<number | null> {
    const usuarioLogin = { mail, contrasenia }

    try {
      // Usamos firstValueFrom para convertir el observable en una promesa
      const response = await firstValueFrom(
        this.httpClient.post<UsuarioLoginJSON>(
          `${REST_SERVER_URL}/usuarios/login`,
          usuarioLogin
        )
      )

      if (response?.id) {
        // Guardamos el ID del usuario en sessionStorage
        sessionStorage.setItem(this.sessionKey, response.id.toString())
        return response.id
      } else {
        return null
      }
    } catch (error) {
      console.error('Error en el login:', error)
      throw error
    }
  }

  navegarALogin() {
    this.router.navigate(['/login'])
  }

  async getUser(id: number) {
    // const usuarioSS$ = this.httpClient.get<UsuarioJSON>(REST_SERVER_URL + '/user/login' + id)
    // return usuarioSS$
    // return this.listaUsuarios.find(usuario => usuario.id === id);
  }

  putVerificationUser(
    mailLogin: string,
    contraseniaLogin: string
  ): Observable<number | null> {
    const usuarioLogin = new UsuarioLogin(mailLogin, contraseniaLogin)
    return this.httpClient
      .post<UsuarioLoginJSON>(`${REST_SERVER_URL}/usuarios/login`, usuarioLogin)
      .pipe(
        map((response) => response?.id || null),
        catchError((error) => {
          this.addError('Error al verificar el usuario.')
          console.error('Error en la verificación de usuario:', error)
          return of(null) // Retornar null en caso de error
        })
      )
  }

  addError(mensajeError: string) {
    this.errors.push(mensajeError)
  }

  getUserActivate() {
    const existeUsuario = usuarios[1]

    if (existeUsuario === undefined) {
      //  this.router.navigate(['/login']);
      throw new Error('Redirigiendo por usuario no encontrado')
    } else {
      return existeUsuario
    }
  }

  actualizarUsuario(usuario: Usuario): Observable<UsuarioJSON[] | null> {
    return this.httpClient
      .put<UsuarioJSON[]>(`${REST_SERVER_URL}/usuario/login`, usuario.toJSON())
      .pipe(
        catchError((error) => {
          this.addError('Error al actualizar el usuario.')
          console.error('Error al actualizar el usuario:', error)
          return of(null) // Retornar null en caso de error
        })
      )
  }
}

class UsuarioLogin {
  mail: string
  contrasenia: string

  constructor(mail: string, contrasenia: string) {
    this.mail = mail
    this.contrasenia = contrasenia
  }
}

export type UsuarioLoginJSON = {
  id: number
}
