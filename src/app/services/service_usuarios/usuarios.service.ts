
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

  async getUserId(userIdSS : number | null): Promise<Usuario> {  //GetUserById

    const usuarioJSON = await lastValueFrom(this.httpClient.get<UsuarioJSON>(`${REST_SERVER_URL}/usuarios/` + userIdSS))
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


  async actualizarUsuario(usuarioBack: Usuario, usuarioEditable:Usuario): Promise<void> {
    if(!usuarioBack.id){
      throw new Error("ID del Usuario invalido")
    }
    this.httpClient.put<void>(`${REST_SERVER_URL}/usuarios/actualizar/` + usuarioBack.id, usuarioEditable.toJSON())
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
