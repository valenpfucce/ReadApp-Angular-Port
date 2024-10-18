import { Injectable } from '@angular/core'
import {
  AmigosJSON,
  sistemaValidacion,
  Usuario,
  UsuarioJSON
} from '../../domain/usuario'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { lastValueFrom, Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
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
  private readonly sessionKey = 'userSession'

  constructor(private httpClient: HttpClient) {
    this.validador = new sistemaValidacion()
  }

  async getUserId(userIdSS: number | null): Promise<Usuario> {
    //GetUserById

    const usuarioJSON = await lastValueFrom(
      this.httpClient.get<UsuarioJSON>(
        `${REST_SERVER_URL}/usuarios/` + userIdSS
      )
    )
    console.log('json q trae del back', usuarioJSON)
    if (!usuarioJSON) {
      throw new Error('Usuario Invalido')
    }
    const usuarioTipoUsuario = await Usuario.fromJson(usuarioJSON)
    return usuarioTipoUsuario
  }

  async getUsuariosCard(busqueda?: string): Promise<Usuario[]> {
    const usuarioAmigos = await lastValueFrom(
      this.httpClient.post<AmigosJSON[]>(
        REST_SERVER_URL + '/usuarios/busqueda',
        busqueda
      )
    )

    const amigosLista = usuarioAmigos.map((AmigosJSON) =>
      Usuario.fromJsonAmigos(AmigosJSON)
    )
    return amigosLista
  }

  async getAmigosId(userId: number | null): Promise<Usuario[]> {
    const usuarioAmigos = await lastValueFrom(
      this.httpClient.get<AmigosJSON[]>(
        REST_SERVER_URL + '/usuarios/amigos/' + userId
      )
    )

    const amigosLista = usuarioAmigos.map((AmigosJSON) =>
      Usuario.fromJsonAmigos(AmigosJSON)
    )
    return amigosLista
  }

  async agregarAmigo(amigoId: number, userId: number) {
    await lastValueFrom(
      this.httpClient.patch(
        `${REST_SERVER_URL}/usuarios/${userId}/agregar-amigo/${amigoId}`,
        {}
      )
    )
  }

  putVerificationUser(
    mailLogin: string,
    contraseniaLogin: string
  ): Observable<number | null> {
    const usuarioLogin = new UsuarioLogin(mailLogin, contraseniaLogin)
    return this.httpClient
      .post<UsuarioLoginJSON>(`${REST_SERVER_URL}/usuarios/login`, usuarioLogin)
      .pipe(map((response) => response?.id || null))
  }

  async actualizarUsuario(
    usuarioBack: Usuario,
    usuarioEditable: Usuario
  ): Promise<void> {
    console.log('entra a actualuzar', usuarioEditable)
    console.log('entra a actualuzar JSON', usuarioEditable.toJSON())

    await lastValueFrom(
      this.httpClient.put<void>(
        `${REST_SERVER_URL}/usuarios/actualizar/` + usuarioBack.id,
        usuarioEditable.toJSON()
      )
    )
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
    const recomendacionLista = recomendaciones.map((recomendacionJSON) =>
      Recomendacion.fromJson(recomendacionJSON)
    )
    return recomendacionLista
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

  async getLibrosALeer(userId: number): Promise<Libro[]> {
    const usuarioJSON = await lastValueFrom(
      this.httpClient.get<UsuarioJSON>(`${REST_SERVER_URL}/usuarios/${userId}`)
    )
    // Convertir cada libro JSON en una instancia de la clase Libro
    const libros = usuarioJSON.librosPorLeer.map((libroJson) =>
      Libro.fromApiResponse(libroJson)
    )
    console.log('aca tenes tus libros', libros)
    return libros
  }

  async agregarLibrosALeer(userId: number, libros: Libro[]): Promise<void> {
    try {
      console.log('Enviando los siguientes libros al backend:', libros)
      const response = await this.httpClient
        .post(`${REST_SERVER_URL}/usuarios/${userId}/librosALeer`, libros)
        .toPromise()
      console.log('Libros enviados exitosamente al backend', response)
    } catch (error) {
      console.error(
        'Error al agregar los libros o al obtener la lista actualizada:',
        error
      )
      if (error instanceof Error) {
        console.error('Mensaje de error:', error.message)
      }
    }
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
