import { Injectable } from '@angular/core'
import { usuarios } from '../../mocks/mock_usuarios'
import { sesionesUsuarios } from '../../mocks/mock_usuariossesiones'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private readonly sessionKey = 'userSession'
  constructor() {}

  login(mail: string, contrasenia: string): Boolean {
    const usuarioEncontrado = sesionesUsuarios.find(
      (usuario) =>
        usuario.mail.trim().toLowerCase() === mail.trim().toLowerCase() &&
        usuario.pass.trim() === contrasenia.trim()
    )

    if (usuarioEncontrado) {
      sessionStorage.setItem(this.sessionKey, JSON.stringify(usuarioEncontrado))
      console.log('Login exitoso: ', usuarioEncontrado)
      return true
    }
    console.log('Usuario o contraseña incorrectos')
    return false
  }
}
