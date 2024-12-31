import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { Router } from '@angular/router'
import { ValidacionFieldComponent } from '../perfil/components/perfil-info/validacion-field/validacion-field.component'
import { CommonModule } from '@angular/common'
import { HttpErrorResponse } from '@angular/common/http'
import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service'

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
  mail!: string
  contrasenia!: string
  loginForm!: FormGroup
  showPasswordError: string | null = null

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userSesionStorageService: UserSessionStorageService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required]]
    })
  }

  async login(): Promise<void> {
    this.showPasswordError = null

    if (this.loginForm.invalid) {
      if (this.loginForm.get('mail')?.invalid) {
        this.showPasswordError = 'Ingrese un correo electrónico válido.'
      } else {
        this.showPasswordError = 'Complete los campos requeridos.'
      }
      this.loginForm.markAllAsTouched()
      return
    }

    const { mail, contrasenia } = this.loginForm.value

    try {
      const idUsuario =
        await this.userSesionStorageService.loginGetUsuarioIdToSS(
          mail,
          contrasenia
        )

      if (idUsuario) {
        this.router.navigate(['/home'])
      }
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 0) {
          this.showPasswordError = 'Conexión no exitosa. Intente más tarde'
        } else {
          this.showPasswordError = error.error?.message
        }
      } else {
        this.showPasswordError = 'Ocurrió un error inesperado.'
      }
    }
  }
}
