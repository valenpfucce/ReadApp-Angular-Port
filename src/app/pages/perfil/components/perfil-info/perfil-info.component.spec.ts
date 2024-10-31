
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
  waitForAsync
} from '@angular/core/testing'
import { getHttpClientSpy, usuarioActualizado, usuarioAsignatario, usuarioCarlos } from '../../../../services/service_usuarios/httpClientSpy'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { UserSessionStorageService } from '../../../../services/service_user_session_storage/user-session-storage.service'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { PerfilInfoComponent } from './perfil-info.component';
import { UsuariosService } from '../../../../services/service_usuarios/usuarios.service'
import {ComponentFixtureAutoDetect} from '@angular/core/testing';
import { REST_SERVER_URL } from '../../../../services/configuration'
import { By } from '@angular/platform-browser'
import { sistemaValidacion } from '../../../../domain/usuario'
import { ValidacionFieldComponent } from './validacion-field/validacion-field.component'

describe('PerfilInfoComponent', () => {
  let component: PerfilInfoComponent;
  let fixture: ComponentFixture<PerfilInfoComponent>;
  let routerSpy: jasmine.SpyObj<Router>
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let userSessionStorageServiceSpy: jasmine.SpyObj<UserSessionStorageService>
  let UsuariosServiceSpy: jasmine.SpyObj<UsuariosService>
  let sistemaValidacionSpy: jasmine.SpyObj<sistemaValidacion>

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl'])
    httpClientSpy = getHttpClientSpy() // Simulamos HttpClient como espía
    sistemaValidacionSpy = jasmine.createSpyObj('sistemaValidacion', ['validarDatos'])
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
      imports: [PerfilInfoComponent,ReactiveFormsModule, FormsModule, ValidacionFieldComponent ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Router, useValue: routerSpy },
        [{provide: ComponentFixtureAutoDetect, useValue: true}],
        {provide: UsuariosService,useValue: UsuariosServiceSpy},
        {provide:sistemaValidacion, useValue: sistemaValidacionSpy  }
        
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  
  it('should create', fakeAsync(   () => {
    component.ngOnInit()
    expect(component).toBeTruthy()
    flush()
  }))

  it('trae los datos del backend y los asigna al usuario', fakeAsync(   () => {
   
   inicializarUsuarioSpy()
   component.ngOnInit();
   tick(0);
   fixture.detectChanges()

   expect(component.usuario).toEqual(usuarioAsignatario);
   flush()

  }))
  
  
  it('verifica que el input nombre este cargado con el valor correspondiente',  fakeAsync(   () => {
    //inicializarUsuarioSpy()

    userSessionStorageServiceSpy.obtenerIDuserSS;
    UsuariosServiceSpy.getUserById.and.returnValue(Promise.resolve(usuarioCarlos));
    tick(0)
    fixture.detectChanges();
    console.log("inicializarUsuarioSpy",usuarioCarlos )
    
    component.ngOnInit();
    tick(0);
    fixture.whenStable()
    fixture.detectChanges()
     
    console.log("usertestes2", component.usuario)
    const nombreInput = getByTestId('nombreTest') as HTMLInputElement
    const apellidoInput = getByTestId('apellidoTest') as HTMLInputElement
    tick(0);
    fixture.whenStable()
    fixture.detectChanges()
    
   
    expect(nombreInput.value).toBe('Carlitos')
    expect(apellidoInput.value).toBe('ApelldioFalso')
    expect(component.usuario.nombre).toBe('Carlitos')
    flush()
   
    
  }))


  it('verifica que se muestre un mensaje de error cuando el campo nombre esta vacío y se hace clic en el botón Guardar cambios', fakeAsync(  () => {

    inicializarUsuarioSpy()
    component.ngOnInit()
    tick(0);
    fixture.detectChanges()
  
    spyOn(component.usuario, 'guardarDatos').and.callThrough(); //espia el metodo y ejecuta las llamadas originales 
    component.usuarioEditable.nombre = '';
    getByTestId('guardarBoton').click()
    
    expect(component.usuario.guardarDatos).toHaveBeenCalled();
    
    fixture.whenStable();
    fixture.detectChanges();
    
    const errorMessageElement = getByTestId("validacionCampos")   
  
   expect(errorMessageElement).not.toBeNull();
   expect(errorMessageElement.textContent).toContain('El campo no puede estar vacio');
   flush()
   
  }))


  async function inicializarUsuarioSpy(){
     userSessionStorageServiceSpy.obtenerIDuserSS;
     UsuariosServiceSpy.getUserById.and.returnValue(Promise.resolve(usuarioAsignatario));
     tick(0)
     fixture.detectChanges();
     console.log("inicializarUsuarioSpy",usuarioAsignatario )
    
  }  

  function getByTestId(testId: string) {
    const resultHtml = fixture.debugElement.nativeElement
    return  resultHtml.querySelector(`[data-testid="${testId}"]`)
  }

});



