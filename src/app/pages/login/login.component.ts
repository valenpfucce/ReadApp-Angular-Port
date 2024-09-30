import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { Usuario, ValidationMessage } from '../../domains/usuario'
import { ValidacionFieldComponent } from '../../pages/perfil/components/perfil-info/validacion-field/validacion-field.component'
import { UsuariosService } from '../../services/service_usuarios/usuarios.service'
import { UsuarioSession } from '../../mocks/mock_usuariossesiones'

@Component({
  selector: 'readapp-login',
  standalone: true,
  imports: [FormsModule, ValidacionFieldComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario = new UsuarioSession(
    '',
    ''
  )
  mail = ''
  contrasenia = 'password'
  loginForm: any
  private readonly sessionKey = 'userSession';

  constructor(private router: Router, private userService : UsuariosService) {}

  login() {
    const contraseniaVacia = this.contrasenia.trim() === ''
    //this.usuario.validador.validarDatos(this.usuario)
    // if (this.usuario.errors[4]?.message.trim() === '' && !contraseniaVacia) {
      const loginSuccess = this.userService.login(this.mail, this.contrasenia);
      if (loginSuccess) {
        console.log("ODIO ANGULAR")
        //this.router.navigateByUrl('/home');
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    //}
    //ESTO ESTÁ MAL YA SÉ PERO NO SABÍA COMO HACER PARA QUE SÓLO ME MUESTRE EL ERROR DEL MAIL :B
    //CORREGIR QUE SOLO NAVEGUE CUANDO TENGA MAIL Y CONTRASENIA
  }
}
