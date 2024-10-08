import { Injectable } from '@angular/core';
import { usuarios, LoginVer } from '../../mocks/mock_usuarios';
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
  // listaUsuarios = usuarios;
  validador!: sistemaValidacion;
  router!: Router
  errors: String[] = [];
  loginVerification!: LoginVer;


  private readonly sessionKey = 'userSession';

  constructor(/*private router: Router,*/ private httpClient: HttpClient) {
    this.validador = new sistemaValidacion();
    this.loginVerification = new LoginVer();
  }

  loginGetUsuarioIdToSS(mail: string, contrasenia: string): Observable<number | null> {

    return this.putVerificationUser(mail, contrasenia).pipe(
      map((idUsuarioEncontrado: number | null) => {
        if (idUsuarioEncontrado !== null) {
          sessionStorage.setItem(this.sessionKey, idUsuarioEncontrado.toString());
          console.log('Login exitoso, ID de Usuario: ', idUsuarioEncontrado);
          return idUsuarioEncontrado;
        } else {
          this.addError('Contraseña incorrecta.');
          return null;
        }
      }),
      catchError((error) => {
        this.addError('Error en el proceso de login.');
        console.error('Error en el login:', error);
        return of(null); // Retornar null en caso de error
      })
    );



    // const idUsuarioEncontrado = this.putVerificationUser(mail, contrasenia);
    // if (idUsuarioEncontrado === null) {

    //   console.error('Usuario no encontrado.');
    //   this.navegarALogin()
    //   throw new Error('Redirigiendo por usuario no encontrado');
    // } else {

    //   sessionStorage.setItem(this.sessionKey, idUsuarioEncontrado.toString());
    //   console.log('Login exitoso, ID de Usuario pero no de putVerificationUser: ', idUsuarioEncontrado);
    //   /*this.idUsuarioActivo = idUsuarioEncontrado;*/
    //    idUsuarioEncontrado;
    // }
  
  }

  
  navegarALogin() { this.router.navigate(['/login']); }


  async getUser(id: number) {
    // const usuarioSS$ = this.httpClient.get<UsuarioJSON>(REST_SERVER_URL + '/user/login' + id)
    // return usuarioSS$

    // return this.listaUsuarios.find(usuario => usuario.id === id);
  }

  putVerificationUser(mailLogin: string, contraseniaLogin: string): Observable<number | null> {

    const usuarioLogin = new UsuarioLogin(mailLogin, contraseniaLogin);
    return this.httpClient.post<UsuarioLoginJSON>(`${REST_SERVER_URL}/usuarios/login`, usuarioLogin).pipe(
      map((response) => response?.id || null),
      catchError((error) => {
        this.addError('Error al verificar el usuario.');
        console.error('Error en la verificación de usuario:', error);
        return of(null); // Retornar null en caso de error
    
      })
    )
    

    // const usuarioLogin = new UsuarioLogin(mailLogin, contraseniaLogin)

    // const userID$ = (this.httpClient.post<UsuarioLoginJSON>(`${REST_SERVER_URL}/usuario/login`, usuarioLogin))
    // console.log("pasa del postHTTP", userID$);

    // return userID$










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


  getUserActivate() {
    const existeUsuario = usuarios[1]

    if (existeUsuario === undefined) {
      //  this.router.navigate(['/login']);
      throw new Error('Redirigiendo por usuario no encontrado');
    } else {
      return existeUsuario;
    }

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


