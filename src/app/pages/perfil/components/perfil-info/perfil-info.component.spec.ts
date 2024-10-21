
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick
} from '@angular/core/testing'
import { getHttpClientSpy } from '../../../../services/service_usuarios/httpClientSpy'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { throwError } from 'rxjs'
import { UserSessionStorageService } from '../../../../services/service_user_session_storage/user-session-storage.service'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { PerfilInfoComponent } from './perfil-info.component';
import { UsuariosService } from '../../../../services/service_usuarios/usuarios.service'

describe('PerfilInfoComponent', () => {
  let component: PerfilInfoComponent;
  let fixture: ComponentFixture<PerfilInfoComponent>;
  let routerSpy: jasmine.SpyObj<Router>
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let userSessionStorageServiceSpy: jasmine.SpyObj<UserSessionStorageService>
  let UsuariosServiceSpy: jasmine.SpyObj<UsuariosService>

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl'])
    httpClientSpy = getHttpClientSpy() // Simulamos HttpClient como espía
    UsuariosServiceSpy = jasmine.createSpyObj(
      'UsuariosService',
      ['getUserById' ]
    )


    await TestBed.configureTestingModule({
      //declarations: [PerfilInfoComponent, HeaderComponent],
      imports: [PerfilInfoComponent,ReactiveFormsModule, FormsModule],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: UsuariosService,
          useValue: UsuariosServiceSpy
        }
        
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    await fixture.whenStable()
    fixture.detectChanges()
  });

  it('should create', () => {
    component.ngOnInit()
    expect(component).toBeTruthy()
  })


  // it('should receive a Usuario from the backend', fakeAsync(() => {
   
  //   httpClientSpy.get
   
  //   component.obtenerDatosUsuario(1);
  //   tick();

  //    // Verificamos que el usuario cargado sea el esperado
  //    expect(component.usuario).toEqual(httpClientSpy.usuarioAsignatario);
  //    expect(component.usuarioEditable).toEqual(httpClientSpy.usuarioAsignatario);



  // }))

  function getByTestId(testId: string) {
    const resultHtml = fixture.debugElement.nativeElement
    return resultHtml.querySelector(`[data-testid="${testId}"]`)
  }

});

