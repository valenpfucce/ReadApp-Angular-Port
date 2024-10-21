import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick
} from '@angular/core/testing'
import { LoginComponent } from './login.component'
import { getHttpClientSpy } from '../../services/service_usuarios/httpClientSpy'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { throwError } from 'rxjs'
import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  let routerSpy: jasmine.SpyObj<Router>
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let userSessionStorageServiceSpy: jasmine.SpyObj<UserSessionStorageService>

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    httpClientSpy = getHttpClientSpy() // Simulamos HttpClient como espía
    userSessionStorageServiceSpy = jasmine.createSpyObj(
      'UserSessionStorageService',
      ['loginGetUsuarioIdToSS']
    )

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: UserSessionStorageService,
          useValue: userSessionStorageServiceSpy
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    await fixture.whenStable()
    fixture.detectChanges()
  })

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy()
  })

  it('debería navegar a /home después de un inicio de sesión exitoso', fakeAsync(() => {
    userSessionStorageServiceSpy.loginGetUsuarioIdToSS.and.returnValue(
      Promise.resolve(1)
    )

    component.loginForm.setValue({
      mail: 'test@example.com',
      contrasenia: 'contraseñaCorrecta'
    })
    component.login()
    tick(1000) // Simula el paso del tiempo
    fixture.detectChanges()

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home'])
    flush()
  }))

  it('debería mostrar mensaje de error de conexión si el backend no responde', fakeAsync(() => {
    // Simula un error de conexión (status 0)
    userSessionStorageServiceSpy.loginGetUsuarioIdToSS.and.returnValue(
      Promise.reject(new HttpErrorResponse({ status: 0 }))
    )

    // Configura el formulario de login con valores válidos
    component.loginForm.setValue({
      mail: 'test@example.com',
      contrasenia: 'contraseñaCorrecta'
    })

    // Llama a la función de login
    component.login()
    tick(1000) // Simula el paso del tiempo
    fixture.detectChanges()

    // Verifica que se muestra el mensaje de error de conexión
    expect(component.showPasswordError).toBe(
      'Conexión no exitosa. Intente más tarde'
    )
    flush()
  }))

  it('debería mostrar error cuando el correo electrónico no es válido', fakeAsync(() => {
    component.loginForm.setValue({
      mail: 'correoInvalido',
      contrasenia: 'contraseñaCorrecta'
    })

    component.login()
    fixture.detectChanges()

    expect(component.showPasswordError).toBe(
      'Ingrese un correo electrónico válido.'
    )
  }))

  it('debería mostrar error cuando los campos requeridos no están completos', fakeAsync(() => {
    component.loginForm.setValue({
      mail: '',
      contrasenia: ''
    })

    component.login()
    fixture.detectChanges()

    expect(component.showPasswordError).toBe(
      'Ingrese un correo electrónico válido.'
    )
    expect(component.loginForm.get('mail')?.touched).toBeTrue()
    expect(component.loginForm.get('contrasenia')?.touched).toBeTrue()
  }))

  it('debería mostrar error cuando la contraseña es incorrecta (error 401)', fakeAsync(() => {
    userSessionStorageServiceSpy.loginGetUsuarioIdToSS.and.returnValue(
      Promise.reject(
        new HttpErrorResponse({
          status: 401,
          error: { message: 'Contraseña incorrecta' }
        })
      )
    )

    component.loginForm.setValue({
      mail: 'test@example.com',
      contrasenia: 'contraseñaIncorrecta'
    })

    component.login()
    tick(1000) // Simula el paso del tiempo
    fixture.detectChanges()

    // Verifica que se muestra el mensaje correcto de error
    expect(component.showPasswordError).toBe('Contraseña incorrecta')
    flush()
  }))

  it('debería mostrar mensaje de error genérico cuando ocurre un error inesperado (error 500)', fakeAsync(() => {
    userSessionStorageServiceSpy.loginGetUsuarioIdToSS.and.returnValue(
      Promise.reject(new HttpErrorResponse({ status: 500 }))
    )

    component.loginForm.setValue({
      mail: 'test@example.com',
      contrasenia: 'contraseñaCorrecta'
    })

    component.login()
    tick(1000)
    fixture.detectChanges()

    expect(component.showPasswordError).toBe('Ocurrió un error inesperado.')
    flush()
  }))

  it('debería marcar los campos como "touched" cuando el formulario es inválido', fakeAsync(() => {
    component.loginForm.setValue({
      mail: '',
      contrasenia: ''
    })

    component.login()
    fixture.detectChanges()

    expect(component.loginForm.get('mail')?.touched).toBeTrue()
    expect(component.loginForm.get('contrasenia')?.touched).toBeTrue()
    flush()
  }))
})
