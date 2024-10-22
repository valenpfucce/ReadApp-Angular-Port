// import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
// import { PagRecomendacionComponent } from './pag-recomendacion.component';
// import { ActivatedRoute, Router, RouterModule } from "@angular/router";
// import { UsuariosService } from "../../services/service_usuarios/usuarios.service";
// import { RecomendacionesService } from "../../services/service_recomendaciones/recomendaciones.service";
// import { UserSessionStorageService } from "../../services/service_user_session_storage/user-session-storage.service";
// import { HeaderComponent } from "../../components/header/header.component";
// import { CardValoracionComponent } from "../../components/card-valoracion/card-valoracion.component";
// import { CardLibroComponent } from "../../components/card-libro/card-libro.component";
// import { CardLibroMasComponent } from "../../components/card-libro-mas/card-libro-mas.component";
// import { FormsModule } from "@angular/forms";
// import { ModalComponent } from "../../components/modal/modal.component";
// import { CommonModule } from "@angular/common";
// import { ModalValoracionComponent } from "../../components/modal-valoracion/modal-valoracion.component";
// import { HttpClient, provideHttpClient } from "@angular/common/http";
// import { of } from "rxjs";
// import { Recomendacion } from "../../domain/recomendacion";
// import { Libro } from "../../domain/libro";
// import {NO_ERRORS_SCHEMA} from "@angular/core";
//
// describe('PagRecomendacionComponent', () => {
//   let component: PagRecomendacionComponent
//   let fixture: ComponentFixture<PagRecomendacionComponent>
//   let routerSpy: jasmine.SpyObj<Router>
//   let serviceRecomendacionSpy: jasmine.SpyObj<RecomendacionesService>
//   let userServiceUSSpy: jasmine.SpyObj<UsuariosService>
//   let sessionStorageSpy: jasmine.SpyObj<UserSessionStorageService>
//
//   const mockActivatedRoute = {
//     params: of({ id: 1 }),
//     snapshot: {
//       paramMap: {
//         get: (key: string) => {
//           if (key === 'id') {
//             return '1';
//           }
//           return '0';
//         }
//       },
//       data: {
//         modo: 'detalle',
//       }
//     }
//   }
//
//   beforeEach(fakeAsync(() => {
//     routerSpy = jasmine.createSpyObj('Router', ['navigate'])
//     serviceRecomendacionSpy = jasmine.createSpyObj('RecomendacionesService', ['getRecomendacionById','puedeValorarRecomendacion','puedeEditarRecomendacion'])
//     userServiceUSSpy = jasmine.createSpyObj('UsuariosService', ['getUserById'])
//     sessionStorageSpy = jasmine.createSpyObj('UserSessionStorageService', ['obtenerIDuserSS'])
//
//     TestBed.configureTestingModule({
//       imports: [
//         FormsModule,
//         CommonModule,
//         RouterModule.forRoot([]),
//         PagRecomendacionComponent,
//         PagRecomendacionComponent,
//         HeaderComponent,
//         CardValoracionComponent,
//         CardLibroComponent,
//         CardLibroMasComponent,
//         ModalComponent,
//         ModalValoracionComponent,
//       ],
//       declarations: [],
//       providers: [
//         { provide: HttpClient, useValue: provideHttpClient() },
//         { provide: Router, useValue: routerSpy },
//         { provide: ActivatedRoute, useValue: mockActivatedRoute },
//         { provide: RecomendacionesService, useValue: serviceRecomendacionSpy },
//         { provide: UsuariosService, useValue: userServiceUSSpy },
//         { provide: UserSessionStorageService, useValue: sessionStorageSpy }
//       ]
//     }).compileComponents()
//
//
//     component.idRecomendacion = 1
//     const listaLibros: Libro[] = [
//       new Libro(3, "Principito", "AQ", "QA", "./imagenes/fire.svg", 40, 3000, ["Ingles", "Aleman"], 20, true, true, true, 4),
//     ]
//     const recomendacionr = new Recomendacion(component.idRecomendacion, 2, "Recomendacion Titulo", true, "Que loco", listaLibros, [])
//     serviceRecomendacionSpy.getRecomendacionById.and.returnValue(Promise.resolve(recomendacionr))
//     serviceRecomendacionSpy.puedeValorarRecomendacion.and.returnValue(Promise.resolve(true))
//     serviceRecomendacionSpy.puedeEditarRecomendacion.and.returnValue(Promise.resolve(true))
//     //sessionStorageSpy.obtenerIDuserSS.and.returnValue(1)
//
//
//     fixture = TestBed.createComponent(PagRecomendacionComponent)
//     component = fixture.componentInstance
//     tick();
//     fixture.detectChanges();
//   }))
//
//   it('should create', fakeAsync(() => {
//     tick()
//     fixture.detectChanges()
//     tick()
//     expect(component).toBeTruthy();
//   }))
//
//   it('should set recomendacion correctly', fakeAsync(() => {
//     tick()
//     fixture.detectChanges()
//     tick()
//     expect(component.recomendacion).toBeTruthy();
//     expect(component.recomendacion.titulo).toBe("Recomendacion Titulo");
//   }))
// })
