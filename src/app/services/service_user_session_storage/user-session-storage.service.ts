import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../service_usuarios/usuarios.service';
import { firstValueFrom } from 'rxjs';
import {Usuario} from "../../domain/usuario";


@Injectable({
  providedIn: 'root'
})

export class UserSessionStorageService {

  errors: String[] = [];
  private readonly sessionKey = 'userSession';

  constructor(
    private router : Router,
    private userService: UsuariosService
  ) { }
  // ===== SESSION STORAGE ===== //


  async loginGetUsuarioIdToSS(
    mail: string,
    contrasenia: string
  ): Promise<number | null> {

    try {
      // Usamos firstValueFrom para convertir el observable en una promesa
      const response = await firstValueFrom(this.userService.putVerificationUser(mail, contrasenia))
      sessionStorage.setItem(this.sessionKey, response!.toString())
      const usuarioEncontrado: Usuario = await this.obtenerDatosUsuario(response)
      sessionStorage.setItem("user_name", usuarioEncontrado.nombre)
      sessionStorage.setItem("user_lastname", usuarioEncontrado.apellido)
      sessionStorage.setItem("user_img", usuarioEncontrado.img_perfil)
      return response
    } catch (error) {
      console.error('Error en el login:', error)
      throw error
    }
  }

  obtenerIDuserSS(): number | null {
    const idUser = sessionStorage.getItem(this.sessionKey)
    return idUser ? parseInt(idUser,10): null
  }

  obtenerNombreUserSS(){
    return sessionStorage.getItem("user_name")
  }
  obtenerApellidoUserSS(){
    return sessionStorage.getItem("user_lastname")
  }
  obtenerImgUserSS(){
    return sessionStorage.getItem("user_img")
  }

  async obtenerDatosUsuario(userIdSS : number | null ){
    const usuarioEnLinea = await this.userService.getUserId(userIdSS)
    return usuarioEnLinea;
  }

  addError(mensajeError: string) {
      this.errors.push(mensajeError);
  }


  navegarAHome(){this.router.navigate(['/login']);}
}


