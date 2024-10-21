import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick
} from '@angular/core/testing'
import { LoginComponent } from './login.component'
import { getHttpClientSpy } from '../../services/service_usuarios/httpClientSpy'
import { HttpClient } from '@angular/common/http'
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
})
