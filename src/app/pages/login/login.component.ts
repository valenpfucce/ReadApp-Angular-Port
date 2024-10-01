import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { Router } from '@angular/router'
import { Usuario, ValidationMessage } from '../../domains/usuario'
import { ValidacionFieldComponent } from '../../pages/perfil/components/perfil-info/validacion-field/validacion-field.component'
import { UsuariosService } from '../../services/service_usuarios/usuarios.service'
import { UsuarioSession } from '../../mocks/mock_usuariossesiones'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'readapp-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ValidacionFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario = new UsuarioSession('', '')
  // mail = ''
  // contrasenia = 'password'
  loginForm: FormGroup
  showPasswordError = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UsuariosService
  ) {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required]]
    })
  }

  login() {
    const { mail, contrasenia } = this.loginForm.value
    console.log(this.loginForm)
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      this.showPasswordError = false
      return
    }

    const loginSuccess = this.userService.login(mail, contrasenia)

    if (loginSuccess) {
      this.router.navigateByUrl('/home')
    } else {
      this.showPasswordError = true
    }
  }
}
