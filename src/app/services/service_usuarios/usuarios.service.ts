
import { Injectable } from '@angular/core';
import { AmigosJSON, sistemaValidacion, Usuario, UsuarioJSON } from '../../domain/usuario';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { REST_SERVER_URL } from '../configuration';
import { Recomendacion, RecomendacionJSON } from '../../domain/recomendacion'

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

  async getUserId(userIdSS : number | null): Promise<Usuario> {  //GetUserById

    const usuarioJSON = await lastValueFrom(this.httpClient.get<UsuarioJSON>(`${REST_SERVER_URL}/usuarios/` + userIdSS))
  
    if (!usuarioJSON) {
      throw new Error("Usuario Invalido")
    }
    const usuarioTipoUsuario = await Usuario.fromJson(usuarioJSON)
    return usuarioTipoUsuario
  }

  async getUsuariosCard(busqueda?: string):Promise<Usuario[]>{
    const usuarioAmigos = await lastValueFrom(this.httpClient.post<AmigosJSON[]>(REST_SERVER_URL + '/usuarios/busqueda', busqueda))

    const amigosLista = usuarioAmigos.map((AmigosJSON) =>
    Usuario.fromJsonAmigos(AmigosJSON))
    return amigosLista

  }


  async getAmigosId(userId : number | null): Promise<Usuario[]> {

    const usuarioAmigos = await lastValueFrom(this.httpClient.get<AmigosJSON[]>(REST_SERVER_URL + '/usuarios/amigos/' + userId))

    const amigosLista = usuarioAmigos.map((AmigosJSON) =>
    Usuario.fromJsonAmigos(AmigosJSON))
    return amigosLista
  }

  async agregarAmigo(amigoId: number, userId: number) {
    await lastValueFrom(
      this.httpClient.patch(`${REST_SERVER_URL}/usuarios/${userId}/agregar-amigo/${amigoId}`, {})
    );
  }


  putVerificationUser(mailLogin: string, contraseniaLogin: string): Observable<number | null> {

    const usuarioLogin = new UsuarioLogin(mailLogin, contraseniaLogin);
    return this.httpClient.post<UsuarioLoginJSON>(`${REST_SERVER_URL}/usuarios/login`, usuarioLogin).pipe(
      map((response) => response?.id || null)
    )

  }


  async actualizarUsuario(usuarioBack: Usuario, usuarioEditable:Usuario): Promise<void> {

    await lastValueFrom(
      this.httpClient.put<void>(`${REST_SERVER_URL}/usuarios/actualizar/` + usuarioBack.id, usuarioEditable.toJSON())
    )

  }




  navegarALogin() { this.router.navigate(['/login']); }


  addError(mensajeError: string) {
    this.errors.push(mensajeError)
  }



  async getRecomendacionesAValorar(userId: number): Promise<Recomendacion[]>{
    const recomendaciones = await lastValueFrom(
      this.httpClient.get<RecomendacionJSON[]>(REST_SERVER_URL + '/usuarios/recomendaciones-a-valorar/' + userId)
    )
    const recomendacionLista = recomendaciones.map((recomendacionJSON) =>
      Recomendacion.fromJson(recomendacionJSON)
    )
    return recomendacionLista
  }


  async agregarRecomendacionAValorar(recomendacionId: number, userId: number) {
    await lastValueFrom(
      this.httpClient.patch(`${REST_SERVER_URL}/usuarios/${userId}/agregar-recomendacion-a-valorar/${recomendacionId}`, {})
    );
  }

  async eliminarRecomendacionAValorar(recomendacionId: number, userId: number) {
    await lastValueFrom(
      this.httpClient.delete(`${REST_SERVER_URL}/usuarios/${userId}/eliminar-recomendacion-a-valorar/${recomendacionId}`)
    );
  }

  async estaEnRecomendacionesAValorar(recomendacionId : number, usuarioId: number): Promise<boolean> {
    return await lastValueFrom(
      this.httpClient.get<boolean>(REST_SERVER_URL + `/usuarios/${usuarioId}/recomendacion-en-a-valorar/${recomendacionId}`, {})

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
