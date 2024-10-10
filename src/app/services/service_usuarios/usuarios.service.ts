
import { Injectable } from '@angular/core';
import { sistemaValidacion, Usuario, UsuarioJSON } from '../../domain/usuario';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { REST_SERVER_URL } from '../configuration';


@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  idUsuarioActivo!: number;
  validador!: sistemaValidacion;
  router!: Router
  errors: String[] = [];
  private readonly sessionKey = 'userSession'

  constructor(private httpClient: HttpClient) {
    this.validador = new sistemaValidacion();

  }




  async getUserId(): Promise<Usuario> {

    const idUser = sessionStorage.getItem(this.sessionKey)
    const usuarioJSON = await lastValueFrom(this.httpClient.get<UsuarioJSON>(`${REST_SERVER_URL}/usuarios/` + idUser))
    console.log("json q trae del back", usuarioJSON)
    if (!usuarioJSON) {
      throw new Error("Usuario Invalido")
    }
    const usuarioTipoUsuario = await Usuario.fromJson(usuarioJSON)
    return usuarioTipoUsuario
  }


  putVerificationUser(mailLogin: string, contraseniaLogin: string): Observable<number | null> {

    const usuarioLogin = new UsuarioLogin(mailLogin, contraseniaLogin);
    return this.httpClient.post<UsuarioLoginJSON>(`${REST_SERVER_URL}/usuarios/login`, usuarioLogin).pipe(
      map((response) => response?.id || null)

    )


  }


  actualizarUsuario(usuario: Usuario): Observable<UsuarioJSON[] | null> {
    return this.httpClient.put<UsuarioJSON[]>(`${REST_SERVER_URL}/usuario/login`, usuario.toJSON()).pipe(
      catchError((error) => {
        this.addError('Error al actualizar el usuario.');
        console.error('Error al actualizar el usuario:', error);
        return of(null); // Retornar null en caso de error
      })
    );
  }

  navegarALogin() { this.router.navigate(['/login']); }


  addError(mensajeError: string) {
    this.errors.push(mensajeError)
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
