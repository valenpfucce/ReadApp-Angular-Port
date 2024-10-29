import { Injectable } from '@angular/core'
import { AmigosJSON, sistemaValidacion, Usuario, UsuarioJSON } from '../../domain/usuario'
import { Router } from '@angular/router'
import { HttpClient, HttpParams } from '@angular/common/http'
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { REST_SERVER_URL } from '../configuration'
import { Recomendacion, RecomendacionJSON } from '../../domain/recomendacion'
import { Libro } from '../../domain/libro'


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  idUsuarioActivo!: number
  validador!: sistemaValidacion
  router!: Router
  errors: String[] = []
  listaAgregarALeer: Libro[] = []
  listaEliminarALeer: Libro[] = []
  listaAgregarLeidos: Libro[] = []
  listaEliminarLeidos: Libro[] = []
  private readonly sessionKey = 'userSession'

  constructor(private httpClient: HttpClient) {
    this.validador = new sistemaValidacion()
  }

  async getUserById(userIdSS: number | null): Promise<Usuario> {
    const usuarioJSON = await lastValueFrom(
      this.httpClient.get<UsuarioJSON>(
        `${REST_SERVER_URL}/usuarios/` + userIdSS
      )
    )

    if (!usuarioJSON) {
      throw new Error("No se pudo obtener el usuario. Intente nuevamente.")
    }
    const usuarioTipoUsuario = await Usuario.fromJson(usuarioJSON)
    return usuarioTipoUsuario
  }

  async getUsuariosCard(busqueda: string = ''): Promise<Usuario[]> {
    let params = new HttpParams().append('busqueda', busqueda)
    const usuarioAmigos = await lastValueFrom(
      this.httpClient.get<AmigosJSON[]>(
        REST_SERVER_URL + '/usuarios/busqueda',
        { params }
      )
    )

    if (!usuarioAmigos) {
      throw new Error("No se pudo obtener la informacion, intentelo mas tarde.")
    }

    const amigosLista = usuarioAmigos.map((AmigosJSON) =>
      Usuario.fromJsonAmigos(AmigosJSON)
    )

    return amigosLista
  }

  putVerificationUser(mailLogin: string, contraseniaLogin: string): Observable<number | null> {
    const usuarioLogin = new UsuarioLogin(mailLogin, contraseniaLogin)
    return this.httpClient
      .post<UsuarioLoginJSON>(`${REST_SERVER_URL}/usuarios/login`, usuarioLogin)
      .pipe(map((response) => response?.id || null))
  }



  async actualizarUsuario(usuarioBack: Usuario, usuarioEditable: Usuario): Promise<void> {
    
    await lastValueFrom(this.httpClient.put<void>(`${REST_SERVER_URL}/usuarios/actualizar/` + usuarioBack.id, usuarioEditable.toJSON()))
    
  }

  navegarALogin() {
    this.router.navigate(['/login'])
  }

  addError(mensajeError: string) {
    this.errors.push(mensajeError)
  }

  async getRecomendacionesAValorar(userId: number): Promise<Recomendacion[]> {
    const recomendaciones = await lastValueFrom(
      this.httpClient.get<RecomendacionJSON[]>(
        REST_SERVER_URL + '/usuarios/recomendaciones-a-valorar/' + userId
      )
    )
    return recomendaciones.map((recomendacionJSON) =>
      Recomendacion.fromJson(recomendacionJSON)
    )
  }

  async agregarRecomendacionAValorar(recomendacionId: number, userId: number) {
    await lastValueFrom(
      this.httpClient.patch(
        `${REST_SERVER_URL}/usuarios/${userId}/agregar-recomendacion-a-valorar/${recomendacionId}`,
        {}
      )
    )
  }

  async eliminarRecomendacionAValorar(recomendacionId: number, userId: number) {
    await lastValueFrom(
      this.httpClient.delete(
        `${REST_SERVER_URL}/usuarios/${userId}/eliminar-recomendacion-a-valorar/${recomendacionId}`
      )
    )
  }

  async estaEnRecomendacionesAValorar(
    recomendacionId: number,
    usuarioId: number
  ): Promise<boolean> {
    return await lastValueFrom(
      this.httpClient.get<boolean>(
        REST_SERVER_URL +
        `/usuarios/${usuarioId}/recomendacion-en-a-valorar/${recomendacionId}`,
        {}
      )
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



