import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../service_usuarios/usuarios.service';
import { Usuario, UsuarioJSON } from '../../domain/usuario';
import { HttpClient } from '@angular/common/http';
import { REST_SERVER_URL } from '../configuration';
import { firstValueFrom, lastValueFrom, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class UserSessionStorageService {

  
  errors: String[] = [];
  private readonly sessionKey = 'userSession';
  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private userService: UsuariosService,
    private httpClient: HttpClient
    
  ) { }
  
  
  
  // ===== USER =====

  
  async loginGetUsuarioIdToSS(
    mail: string,
    contrasenia: string
  ): Promise<number | null> {
    const usuarioLogin = { mail, contrasenia }

    try {
      // Usamos firstValueFrom para convertir el observable en una promesa
      const response = await firstValueFrom(this.userService.putVerificationUser(mail, contrasenia))
      sessionStorage.setItem(this.sessionKey, response!.toString())
      return response
    } catch (error) {
      console.error('Error en el login:', error)
      throw error
    }
  }


  // loginGetUsuarioIdToSS(mail: string, contrasenia: string): Observable<number | null> {

  //   return this.userService.putVerificationUser(mail, contrasenia).pipe(
  //     map((idUsuarioEncontrado: number | null) => {
  //       if (idUsuarioEncontrado !== null) {
  //         sessionStorage.setItem(this.sessionKey, idUsuarioEncontrado.toString());
  //         console.log('Login exitoso, ID de Usuario: ', idUsuarioEncontrado);
  //         return idUsuarioEncontrado;
  //       } else {
  //         this.addError('Contraseña incorrecta.');
  //         return null;
  //       }
  //     }),
  //     catchError((error) => {
  //       this.addError('Error en el proceso de login.');
  //       console.error('Error en el login:', error);
  //       return of(null); // Retornar null en caso de error
  //     })
  //   )
    
  //   // const idUsuarioEncontrado = this.putVerificationUser(mail, contrasenia);
  //   // if (idUsuarioEncontrado === null) {

  //   //   console.error('Usuario no encontrado.');
  //   //   this.navegarALogin()
  //   //   throw new Error('Redirigiendo por usuario no encontrado');
  //   // } else {

  //   //   sessionStorage.setItem(this.sessionKey, idUsuarioEncontrado.toString());
  //   //   console.log('Login exitoso, ID de Usuario pero no de putVerificationUser: ', idUsuarioEncontrado);
  //   //   /*this.idUsuarioActivo = idUsuarioEncontrado;*/
  //   //    idUsuarioEncontrado;
  //   // }



  // }
    
    
  addError(mensajeError: string) {
      this.errors.push(mensajeError);
  }
 

  
    
  
  
  // Método para hacer login y guardar el ID del usuario en sessionStorage
  
  
  //   loginGetUsuarioIdToSS(mail: string, contrasenia: string): Observable<number | null> {
  //     return this.putVerificationUser(mail, contrasenia).pipe(
  //       map((idUsuarioEncontrado: number | null) => {
  //         if (idUsuarioEncontrado !== null) {
  //           sessionStorage.setItem(this.sessionKey, idUsuarioEncontrado.toString());
  //           console.log('Login exitoso, ID de Usuario: ', idUsuarioEncontrado);
  //           return idUsuarioEncontrado;
  //         } else {
  //           this.addError('Contraseña incorrecta.');
  //           return null;
  //         }
  //       }),
  //       catchError((error) => {
  //         this.addError('Error en el proceso de login.');
  //         console.error('Error en el login:', error);
  //         return of(null); // Retornar null en caso de error
  //       })
  //     );
  //   }
  
  //   // Método para obtener los datos del usuario según su ID
  //   getUser(id: number): Observable<UsuarioJSON | null> {
  //     return this.httpClient.get<UsuarioJSON>(${REST_SERVER_URL}/usuario/${id}).pipe(
  //       catchError((error) => {
  //         this.addError('Error al obtener los datos del usuario.');
  //         console.error('Error al obtener usuario:', error);
  //         return of(null); // Retornar null en caso de error
  //       })
  //     );
  //   }
  
  //   // Método que envía la verificación del usuario al backend (login)
  //   putVerificationUser(mailLogin: string, contraseniaLogin: string): Observable<number | null> {
  //     const usuarioLogin = new UsuarioLogin(mailLogin, contraseniaLogin);
  //     return this.httpClient.post<UsuarioLoginJSON>(${REST_SERVER_URL}/usuario/login, usuarioLogin).pipe(
  //       map((response) => response?.id || null),
  //       catchError((error) => {
  //         this.addError('Error al verificar el usuario.');
  //         console.error('Error en la verificación de usuario:', error);
  //         return of(null); // Retornar null en caso de error
  //       })
  //     );
  //   }
  
  //   // Método para actualizar el usuario en el backend
  //   actualizarUsuario(usuario: Usuario): Observable<UsuarioJSON[] | null> {
  //     return this.httpClient.put<UsuarioJSON[]>(${REST_SERVER_URL}/usuario/${usuario.id}, usuario.toJSON()).pipe(
  //       catchError((error) => {
  //         this.addError('Error al actualizar el usuario.');
  //         console.error('Error al actualizar el usuario:', error);
  //         return of(null); // Retornar null en caso de error
  //       })
  //     );
  //   }
  
  //   // Método para añadir errores al array
  //   addError(mensajeError: string) {
  //     this.errors.push(mensajeError);
  //   }
  // }
  
  // // Clase auxiliar para el login del usuario
  // class UsuarioLogin {
  //   mail: string;
  //   contrasenia: string;
  
  //   constructor(mail: string, contrasenia: string) {
  //     this.mail = mail;
  //     this.contrasenia = contrasenia;
  //   }
  // }
  
  // // Tipo que representa la respuesta JSON del login del usuario
  // export type UsuarioLoginJSON = {
  //   id: number;
  // };
  
 




  
  
  navegarAHome(){this.router.navigate(['/login']);}
}
  

