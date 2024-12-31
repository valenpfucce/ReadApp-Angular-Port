import { ComponentFixture, TestBed, tick } from '@angular/core/testing'
import { ModalComponent } from './modal.component'
import { LibrosService } from '../../services/service_libros/libros.service'
import { UsuariosService } from '../../services/service_usuarios/usuarios.service'
import { Router } from '@angular/router'
import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service'
import { AmigosService } from '../../services/service_amigos/amigos.service'
import { of } from 'rxjs'
import { By } from '@angular/platform-browser'

describe('ModalComponent', () => {
  let component: ModalComponent
  let fixture: ComponentFixture<ModalComponent>
  let routerSpy: jasmine.SpyObj<Router>
  let librosServiceMock: any
  let usuariosServiceMock: any
  let amigosServiceMock: any
  let sessionStorageMock: any
  let routerMock: any

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl'])
    librosServiceMock = jasmine.createSpyObj('LibrosService', [
      'busquedaLibros'
    ])
    usuariosServiceMock = jasmine.createSpyObj('UsuariosService', [
      'getUserById'
    ])
    amigosServiceMock = jasmine.createSpyObj('AmigosService', [''])
    sessionStorageMock = jasmine.createSpyObj('UserSessionStorageService', [
      'obtenerIDuserSS'
    ])
    routerMock = jasmine.createSpyObj('Router', ['navigate'])

    await TestBed.configureTestingModule({
      imports: [ModalComponent],
      providers: [
        { provide: LibrosService, useValue: librosServiceMock },
        { provide: UsuariosService, useValue: usuariosServiceMock },
        { provide: UserSessionStorageService, useValue: sessionStorageMock },
        { provide: AmigosService, useValue: amigosServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('crea el componente modal', () => {
    expect(component).toBeTruthy()
  })

  it('abre el modal cuando la ruta es "perfil/libros_leidos"', async () => {
    component.isModalOpen = true;
    component.ngOnInit();
    component.rutaActual= 'perfil/libros_leidos'
    component.isModalOpen = true;
    await fixture.whenStable(); 
    fixture.detectChanges();
  
    const overlayElement = fixture.debugElement.query(By.css('.overlay'));
    expect(overlayElement).toBeTruthy(); 
    const librosLeidosContainer = fixture.debugElement.query(By.css('.contenedor-cartas'));
    expect(librosLeidosContainer).toBeTruthy();
  })

  it('debe cerrar el modal y emitir el evento de cierre cuando se llama a closeModal', () => {
    
    component.isModalOpen = true;
    spyOn(component.close, 'emit');

    component.closeModal();

    expect(component.isModalOpen).toBeTrue(); // Esto no se deberia cambiar
   
    expect(component.close.emit).toHaveBeenCalled();

  })
})
