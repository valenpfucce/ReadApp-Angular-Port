import { Injectable } from '@angular/core'
import { usuarios, LoginVer } from '../../mocks/mock_usuarios'
import { sistemaValidacion, Usuario } from '../../domain/usuario'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  idUsuarioActivo!: number
  listaUsuarios = usuarios 
  validador: sistemaValidacion
  errors: String[] = []
  loginVerification! : LoginVer
  private readonly sessionKey = 'userSession'
  
  constructor( private router : Router ) {
      this.validador = new sistemaValidacion();
      this.loginVerification = new LoginVer();
  }

  loginGetUsuarioIdToSS(mail: string, contrasenia: string) {
    const idUsuarioEncontrado = this.loginVerification.login(mail, contrasenia) 
    if(idUsuarioEncontrado === null){
      this.addError('Contraseña incorrecta.')
      return null
    } else {
      sessionStorage.setItem(this.sessionKey, idUsuarioEncontrado.toString() )
      console.log('Login exitoso, ID de Usuario: ', idUsuarioEncontrado)
      this.idUsuarioActivo = idUsuarioEncontrado
      return idUsuarioEncontrado
    }
  }

  getUser(id: number){
    return this.listaUsuarios.find(usuario => usuario.id === id)
  }

  addError(mensajeError: string) {
    this.errors.push(mensajeError)
  }
  
  getUserActivate(){
    const existeUsuario = this.listaUsuarios.find(usuario => usuario.id === this.idUsuarioActivo)
    if (existeUsuario === undefined){
      this.router.navigate(['/login']);
      throw new Error('Redirigiendo por usuario no encontrado');
    } else {
      return existeUsuario
    }
  }

}
