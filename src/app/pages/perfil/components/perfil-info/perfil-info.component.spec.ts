// import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
// import { Usuario } from '../../../../domain/usuario';
// import { PerfilInfoComponent } from './perfil-info.component';
// import { getHttpClientSpy,usuarioAsignatario } from '../../../../services/service_usuarios/httpClientSpy';
// import { HttpClient } from '@angular/common/http';
// import { of, throwError } from 'rxjs'
// import { Router } from '@angular/router'
// import { registerLocaleData } from '@angular/common'
// import { FormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
// import { HeaderComponent } from '../../../../components/header/header.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// import { UsuariosService } from '../../../../services/service_usuarios/usuarios.service';
// import { UserSessionStorageService } from '../../../../services/service_user_session_storage/user-session-storage.service';

// describe('PerfilInfoComponent', () => {
//   let component: PerfilInfoComponent;
//   let fixture: ComponentFixture<PerfilInfoComponent>;
//   let routerSpy: jasmine.SpyObj<Router>
//   let httpClientSpy: jasmine.SpyObj<HttpClient>

//   beforeEach(async () => {
//     httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'post']);
//     routerSpy = jasmine.createSpyObj('Router', ['navigate']);

//     await TestBed.configureTestingModule({
//       declarations: [PerfilInfoComponent, HeaderComponent],
//       imports: [PerfilInfoComponent, Usuario, FormsModule, BrowserModule, HeaderComponent, UsuariosService, UserSessionStorageService],
//       providers: [
//         { provide: HttpClient, useValue: httpClientSpy },
//         { provide: Router, useValue: routerSpy }
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(PerfilInfoComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     component.ngOnInit();
//     expect(component).toBeTruthy();
//   });

//   it('should receive a Usuario from the backend', fakeAsync(() => {

//     httpClientSpy.get

//     component.obtenerDatosUsuario(1);
//     tick();

//      // Verificamos que el usuario cargado sea el esperado
//      expect(component.usuario).toEqual(usuarioAsignatario);
//      expect(component.usuarioEditable).toEqual(usuarioAsignatario);

//   }))

//   function getByTestId(testId: string) {
//     const resultHtml = fixture.debugElement.nativeElement
//     return resultHtml.querySelector(`[data-testid="${testId}"]`)
//   }

// });
