// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ModalComponent } from './modal.component';

// describe('ModalComponent', () => {
//   let component: ModalComponent;
//   let fixture: ComponentFixture<ModalComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ModalComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ModalComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ModalComponent } from './modal.component'
import { LibrosService } from '../../services/service_libros/libros.service'
import { UsuariosService } from '../../services/service_usuarios/usuarios.service'
import { Router } from '@angular/router'
import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service'
import { AmigosService } from '../../services/service_amigos/amigos.service'
import { of } from 'rxjs'

describe('ModalComponent', () => {
  let component: ModalComponent
  let fixture: ComponentFixture<ModalComponent>
  let librosServiceMock: any
  let usuariosServiceMock: any
  let amigosServiceMock: any
  let sessionStorageMock: any
  let routerMock: any

  beforeEach(async () => {
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
      declarations: [ModalComponent],
      providers: [
        { provide: LibrosService, useValue: librosServiceMock },
        { provide: UsuariosService, useValue: usuariosServiceMock },
        { provide: UserSessionStorageService, useValue: sessionStorageMock },
        { provide: AmigosService, useValue: amigosServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the modal component', () => {
    expect(component).toBeTruthy()
  })

  it('should open the modal when isModalOpen is true', () => {
    component.isModalOpen = true
    fixture.detectChanges()
    const modalElement = fixture.nativeElement.querySelector('.modal')
    expect(modalElement).toBeTruthy() // Verifica si el modal se muestra
  })

  it('should close the modal and emit close event when closeModal is called', () => {
    spyOn(component.close, 'emit')
    component.closeModal()
    expect(component.close.emit).toHaveBeenCalled()
  })
})
