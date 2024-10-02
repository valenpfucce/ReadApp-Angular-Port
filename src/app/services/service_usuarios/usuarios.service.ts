import { Injectable } from '@angular/core'
import { usuarios, LoginVer } from '../../mocks/mock_usuarios'
import { sistemaValidacion, Usuario } from '../../domains/usuario'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  listaUsuarios = usuarios 
  validador: sistemaValidacion
  errors: String[] = []
  private readonly sessionKey = 'userSession'
  //private readonly sessionKey = 'userSession'
  constructor(
    public mail: String,
    public pass: String,  
    private loginVerification : LoginVer
  ) {
    this.validador = new sistemaValidacion()
  }


  loginGetUsuarioIdToSS(mail: string, contrasenia: string) {
    const idUsuarioEncontrado = this.loginVerification.login(mail, contrasenia) 
    if(idUsuarioEncontrado === null){
      this.addError('Contraseña incorrecta.')
      return null
    } else {
      sessionStorage.setItem(this.sessionKey, idUsuarioEncontrado.toString() )
      console.log('Login exitoso, ID de Usuario: ', idUsuarioEncontrado)
      return idUsuarioEncontrado
    }
  }

  getUser(id: number){
    return this.listaUsuarios.find(usuario => usuario.id === id)
  }

  addError(mensajeError: string) {
    this.errors.push(mensajeError)
  }
}
