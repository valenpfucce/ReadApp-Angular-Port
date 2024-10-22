
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
  waitForAsync
} from '@angular/core/testing'
import { getHttpClientSpy, usuarioActualizado, usuarioAsignatario } from '../../../../services/service_usuarios/httpClientSpy'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { lastValueFrom, of, throwError } from 'rxjs'
import { UserSessionStorageService } from '../../../../services/service_user_session_storage/user-session-storage.service'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { PerfilInfoComponent } from './perfil-info.component';
import { UsuariosService } from '../../../../services/service_usuarios/usuarios.service'
import { Usuario } from '../../../../domain/usuario'
import {ComponentFixtureAutoDetect} from '@angular/core/testing';
import { REST_SERVER_URL } from '../../../../services/configuration'

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
      ['getUserById','putVerificationUser', 'actualizarUsuario']
    )
    userSessionStorageServiceSpy = jasmine.createSpyObj(
      'UserSessionStorageService',
      ['loginGetUsuarioIdToSS']
    )


    await TestBed.configureTestingModule({
      //declarations: [PerfilInfoComponent, HeaderComponent],
      imports: [PerfilInfoComponent,ReactiveFormsModule, FormsModule ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Router, useValue: routerSpy },
        [{provide: ComponentFixtureAutoDetect, useValue: true}],
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

  it('trae los datos del backend y los asigna al usuario', async () => {
   
   inicializarUsuarioSpy()
   await component.ngOnInit();
   expect(component.usuario).toEqual(usuarioAsignatario);
   
  });
  
  
  it('verifica que el input nombre este cargado con el valor correspondiente',  fakeAsync(   () => {
    //const botonMenuInfo = fixture.debugElement.nativeElement.querySelector('button[data-testid="aPerfilTest"]')
    //botonMenuInfo.click()
    inicializarUsuarioSpy()
    component.ngOnInit();
    fixture.detectChanges()
    tick(0);
     
    console.log("usertestes2", component.usuario)
    fixture.whenStable()
    fixture.detectChanges()
   
    const nombreInput = getByTestId('nombreTest') as HTMLInputElement
    const apellidoInput = getByTestId('apellidoTest') as HTMLInputElement
    
    tick(0);
   
    expect(nombreInput.value).toBe('Carlitos')
    expect(apellidoInput.value).toBe('ApelldioFalso')
    expect(component.usuario.nombre).toBe('Carlitos')
   
    
  }))
  
  // fit('verifica que se haga el click y se llama el service ActualizarUsuario (put)', fakeAsync(() => {
  //   // Simular la llamada al servicio y el retorno de usuario
   
  //   component.ngOnInit();
  //   fixture.detectChanges()
  //   tick(0);

  //   const guardarButton = getByTestId('guardarBoton')
  //   guardarButton.click();
  //   fixture.detectChanges()
  //   tick(0);
  //   //UsuariosServiceSpy.actualizarUsuario.and.returnValue(Promise.resolve()); // Simula el éxito del método
  //   // expect(UsuariosServiceSpy.actualizarUsuario).toHaveBeenCalledWith(usuarioAsignatario, usuarioActualizado);
  //   // httpClientSpy.put
    
  //   //const { usuarioActualizable} =httpClientSpy.put.calls.mostRecent().args[0]
  //   //expect(id).toBe(1)
  //   expect(usuarioActualizable).toBe(usuarioActualizado)
    
  //   component.ngOnInit();
  //   fixture.detectChanges();
  //   fixture.whenStable()
  //   tick(9000)
  //   // Asegúrate de que se llame al método actualizarUsuario del servicio
  //   //expect(UsuariosServiceSpy.actualizarUsuario).toHaveBeenCalledWith(usuarioAsignatario, usuarioActualizado);
  // }))



  

     
    
 







  function inicializarUsuarioSpy(){
    userSessionStorageServiceSpy.obtenerIDuserSS;
    UsuariosServiceSpy.getUserById.and.returnValue(Promise.resolve(usuarioAsignatario));

    //httpClientSpy.get.and.returnValue(of(usuarioAsignatario)) 
  }  

  function getByTestId(testId: string) {
    const resultHtml = fixture.debugElement.nativeElement
    return  resultHtml.querySelector(`[data-testid="${testId}"]`)
  }

});



