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
  // httpClient!: HttpClient;
  
  // usuarioSessionIdString = sessionStorage.getItem('userSession');
  // usuarioSessionId: number | null = this.usuarioSessionIdString !== null ? +this.usuarioSessionIdString : null;
  
  private readonly sessionKey = 'userSession';

  constructor(/*private router: Router,*/ private httpClient: HttpClient) {
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
    
    const response$ = (this.httpClient.post<UsuarioLoginJSON>(`${REST_SERVER_URL}/usuario/login`, usuarioLogin))
    const userId = await lastValueFrom(response$)
    return userId
    
 
 
 
    //   sessionStorage.setItem(USER_KEY_STORAGE, userId.userLogedID.toString())
    // .subscribe(
    
    //  response => {
    //   console.log('Login exitoso, responseE:', response);
    //   console.log('Login exitoso, ID de usuario:', response?.id);
    // },
    // error => {
    //   console.error('Error en el login:', error);
    // }
  // );
   

  // async login(userData: UserLoginDTO) {
  //   const response$ = this.httpClient.post<UserLoginResponseDTO>(
  //     ${API_URL}/user/login,
  //     userData
  //   )
  //   const userId = await lastValueFrom(response$)
  //   sessionStorage.setItem(USER_KEY_STORAGE, userId.userLogedID.toString())
  // }

  // try {
    //   const response = await lastValueFrom(this.httpClient.put<UsuarioLoginJSON>(`${REST_SERVER_URL}/usuario/login`, usuarioLogin)  ) ;
    //   console.log('Respuesta del servidor:', response);
    //   return response.id; // Devuelve la respuesta si es necesario //devuelve id
    // } catch (error) {
    //   console.error('Error al verificar el usuario:', error);
    //   throw error; // Lanzar el error para manejarlo más adelante si es necesario
    // }
  
 }
  
  
  
  
  
  
  
  



  addError(mensajeError: string) {
    this.errors.push(mensajeError);
  }

  
  // getUserActivate() {
  //   const existeUsuario = this.idUsuarioActivo;
  
  //   if (existeUsuario === undefined) {
  //     this.router.navigate(['/login']);
  //     throw new Error('Redirigiendo por usuario no encontrado');
  //   } else {
  //     return existeUsuario;
  //   }
  
  // }

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

class UsuarioLogin {
  mail: string;
  contrasenia: string;

  constructor(mail: string, contrasenia: string) {
    this.mail = mail;
    this.contrasenia = contrasenia;
  }
}

export type UsuarioLoginJSON = {
  id: number
}