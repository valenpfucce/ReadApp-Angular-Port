import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilLibrosLeidosComponent } from './perfil-libros-leidos.component';
import { Usuario } from '../../../../domain/usuario';
import { Libro } from '../../../../domain/libro';
import { UserSessionStorageService } from '../../../../services/service_user_session_storage/user-session-storage.service';
import { UsuariosService } from '../../../../services/service_usuarios/usuarios.service';
import { of } from 'rxjs';

describe('PerfilLibrosLeidosComponent', () => {
  let component: PerfilLibrosLeidosComponent
  let fixture: ComponentFixture<PerfilLibrosLeidosComponent>
  let mockSessionStorageService: jasmine.SpyObj<UserSessionStorageService>
  let mockUsuariosService: jasmine.SpyObj<UsuariosService>

  beforeEach(async () => {
    mockSessionStorageService = jasmine.createSpyObj('UserSessionStorageService', ['obtenerIDuserSS'])
    mockUsuariosService = jasmine.createSpyObj('UsuariosService', ['getUserById'])
    
    await TestBed.configureTestingModule({
        imports: [PerfilLibrosLeidosComponent],
        providers: [
          { provide: UserSessionStorageService, useValue: mockSessionStorageService },
          { provide: UsuariosService, useValue: mockUsuariosService }
        ]
      }).compileComponents();
  
      fixture = TestBed.createComponent(PerfilLibrosLeidosComponent);
      component = fixture.componentInstance;
    })

  it('deberia crear el componente', () => {
    expect(component).toBeTruthy()
  })

  describe('ngOnInit', () => {
    it('llama a cargarLibrosLeidos si userIdSS NO es nulo', async () => {
      const userId = 123
      mockSessionStorageService.obtenerIDuserSS.and.returnValue(userId)
      spyOn(component, 'cargarLibrosLeidos')

      await component.ngOnInit()

      expect(component.cargarLibrosLeidos).toHaveBeenCalledWith(userId)
    })

    it('debería registrar un error si userIdSS es nulo', async () => {
      spyOn(console, 'error')
      mockSessionStorageService.obtenerIDuserSS.and.returnValue(null)

      await component.ngOnInit()

      expect(console.error).toHaveBeenCalledWith('El userId es nulo')
    })
  })

    it('llama a getUserById de UsuariosService con el userId correcto', async () => {
        const userId = 123
        mockUsuariosService.getUserById.and.returnValue(Promise.resolve(new Usuario()))
      
        await component.cargarLibrosLeidos(userId)
      
        expect(mockUsuariosService.getUserById).toHaveBeenCalledWith(userId)
    })

    it('deja librosLeidos vacío si el usuario no tiene libros leídos', async () => {
        const userId = 123
        const mockUser = new Usuario()
        mockUser.librosLeidos = []
        mockUsuariosService.getUserById.and.returnValue(Promise.resolve(mockUser))
      
        await component.cargarLibrosLeidos(userId)
      
        expect(component.librosLeidos.length).toBe(0)
    })

    it('debería asignar userActive al cargar los libros leídos', async () => {
        const userId = 123
        mockUsuariosService.getUserById.and.returnValue(Promise.resolve(new Usuario()))
          
        await component.cargarLibrosLeidos(userId)
          
        expect(component.userActive).toBe(userId)
    })
          

})