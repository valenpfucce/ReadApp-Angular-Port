import { Injectable } from '@angular/core';
import { usuarios, LoginVer } from '../../mocks/mock_usuarios';
import { sistemaValidacion, Usuario, UsuarioJSON } from '../../domain/usuario';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { REST_SERVER_URL } from '../configuration';




@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  idUsuarioActivo!: number;
  // listaUsuarios = usuarios;
  validador!: sistemaValidacion;
  errors: String[] = [];
  loginVerification!: LoginVer;
  httpClient!: HttpClient;
  private readonly sessionKey = 'userSession';

  constructor(private router: Router, /*public httpClient: HttpClient*/) {
    this.validador = new sistemaValidacion();
    this.loginVerification = new LoginVer();
  }

  loginGetUsuarioIdToSS(mail: string, contrasenia: string) {
    const idUsuarioEncontrado = this.putVerificationUser(mail, contrasenia);
    if (idUsuarioEncontrado === null) {
      this.addError('Contraseña incorrecta.');
      return null;
    } else {
      sessionStorage.setItem(this.sessionKey, idUsuarioEncontrado.toString());
      console.log('Login exitoso, ID de Usuario: ', idUsuarioEncontrado);
      /*this.idUsuarioActivo = idUsuarioEncontrado;*/
      return idUsuarioEncontrado;
    }
  }

  




  async getUser(id: number) {
    // const usuarioSS$ = this.httpClient.get<UsuarioJSON>(REST_SERVER_URL + '/user/login' + id)
    // return usuarioSS$
    
    // return this.listaUsuarios.find(usuario => usuario.id === id);
  
  
  }

  async putVerificationUser(mailLogin: string, contraseniaLogin: string){

    const usuarioLogin = new UsuarioLogin(mailLogin,contraseniaLogin) 
    const jsonString: string = JSON.stringify(usuarioLogin)
    try {
      const response = await lastValueFrom(this.httpClient.put<UsuarioLoginJSON>(`${REST_SERVER_URL}/usuario/login`, jsonString)  ) ;
      console.log('Respuesta del servidor:', response);
      return response.id; // Devuelve la respuesta si es necesario //devuelve id
    } catch (error) {
      console.error('Error al verificar el usuario:', error);
      throw error; // Lanzar el error para manejarlo más adelante si es necesario
    }
  }



  addError(mensajeError: string) {
    this.errors.push(mensajeError);
  }

  
  getUserActivate() {
    const existeUsuario = this.idUsuarioActivo;
  
    if (existeUsuario === undefined) {
      this.router.navigate(['/login']);
      throw new Error('Redirigiendo por usuario no encontrado');
    } else {
      return existeUsuario;
    }
  
  }

  async actualizarUsuario(usuario: Usuario) {
    try {
      const usuarios$ = this.httpClient.put<UsuarioJSON[]>({REST_SERVER_URL} + '/usuario/' + usuario.id, usuario.toJSON());
      return await lastValueFrom(usuarios$);
    } catch (error) {
      this.addError('Error al actualizar el usuario.');
      console.error('Error al actualizar el usuario:', error);
      throw error;
    }
  }
}

class UsuarioLogin{
  constructor(mail: string, contrasenia: string){}

}

export type UsuarioLoginJSON = {
  id: number
}