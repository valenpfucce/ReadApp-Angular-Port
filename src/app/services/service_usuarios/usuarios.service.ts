import { Injectable } from '@angular/core'
import { sesionesUsuarios } from '../../mocks/mock_usuariossesiones'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private readonly sessionKey = 'userSession'
  constructor() {}

  login(mail: string, contrasenia: string): boolean {
    const usuarioEncontrado = sesionesUsuarios.find(
      (usuario) =>
        usuario.mail.trim().toLowerCase() === mail.trim().toLowerCase()
    )

    if (usuarioEncontrado?.pass.trim() === contrasenia.trim()) {
      sessionStorage.setItem(this.sessionKey, JSON.stringify(usuarioEncontrado))
      console.log('Login exitoso: ', usuarioEncontrado)
      return true
    } else {
      usuarioEncontrado?.addError('Contraseña incorrecta.')
      return false
    }
  }
}
