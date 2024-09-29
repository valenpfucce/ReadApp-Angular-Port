import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { Usuario, ValidationMessage } from '../../domains/usuario'
import { ValidacionFieldComponent } from '../../pages/perfil/components/perfil-info/validacion-field/validacion-field.component'

@Component({
  selector: 'readapp-login',
  standalone: true,
  imports: [FormsModule, ValidacionFieldComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario = new Usuario()
  contrasenia = ''
  loginForm: any

  constructor(private router: Router) {}

  login() {
    const contraseniaVacia = this.contrasenia.trim() === ''
    this.usuario.validador.validarDatos(this.usuario)
    if (
      (!this.usuario.errors[4] ||
        this.usuario.errors[4].message.trim() === '') &&
      contraseniaVacia
    ) {
      this.router.navigateByUrl('/home')
      this.loginForm.reset()
    }else{
      this.usuario.errors[4]
    }
    //ESTO ESTÁ MAL YA SÉ PERO NO SABÍA COMO HACER PARA QUE SÓLO ME MUESTRE EL ERROR DEL MAIL :B
    //CORREGIR QUE SOLO NAVEGUE CUANDO TENGA MAIL Y CONTRASENIA
  }
}
