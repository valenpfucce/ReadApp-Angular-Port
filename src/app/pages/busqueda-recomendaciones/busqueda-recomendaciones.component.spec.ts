// import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
// import {BusquedaRecomendacionesComponent} from './busqueda-recomendaciones.component';
// import {RecomendacionesService} from '../../services/service_recomendaciones/recomendaciones.service';
// import {UserSessionStorageService} from '../../services/service_user_session_storage/user-session-storage.service';
// import {ActivatedRoute, Router} from '@angular/router';
// import {of} from 'rxjs';
// import {Recomendacion} from '../../domain/recomendacion';
// import {UsuariosService} from "../../services/service_usuarios/usuarios.service";
// import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import {HttpClient} from "@angular/common/http";
// import {CardRecomendacionComponent} from "../../components/card-recomendacion/card-recomendacion.component";
//
// describe('BusquedaRecomendacionesComponent', () => {
//   let component: BusquedaRecomendacionesComponent
//   let fixture: ComponentFixture<BusquedaRecomendacionesComponent>
//   let routerSpy: jasmine.SpyObj<Router>
//   let activatedRouteStub: Partial<ActivatedRoute>
//   let httpClientSpy: jasmine.SpyObj<HttpClient>
//   let usuariosServiceSpy: jasmine.SpyObj<UsuariosService>
//   let userSessionStorageServiceSpy: jasmine.SpyObj<UserSessionStorageService>
//   let recomendacionesServiceSpy: jasmine.SpyObj<RecomendacionesService>
//
//   beforeEach(async () => {
//     recomendacionesServiceSpy = jasmine.createSpyObj('RecomendacionesService', ['busquedaRecomendaciones']);
//     userSessionStorageServiceSpy = jasmine.createSpyObj('UserSessionStorageService', ['loginGetUsuarioIdToSS']);
//     usuariosServiceSpy = jasmine.createSpyObj(
//       'UsuariosService',
//       ['getUserById','putVerificationUser']
//     )
//     // Mockear las recomendaciones
//     const mockRecomendaciones: Recomendacion[] = [
//       new Recomendacion(1, 1, "Recomendación 1", true, "Descripción 1", [], [], 4, 9),
//       new Recomendacion(2, 2, "Recomendación 2", false, "Descripción 2", [], [], 4, 9)
//     ]
//
//     recomendacionesServiceSpy.busquedaRecomendaciones.and.returnValue(Promise.resolve(mockRecomendaciones));
//     userSessionStorageServiceSpy.obtenerIDuserSS.and.returnValue(1);
//
//     const activatedRouteStub = {
//       paramMap: of({ get: (param: string) => '/home' })
//     }
//
//     await TestBed.configureTestingModule({
//       imports: [BusquedaRecomendacionesComponent, CardRecomendacionComponent, ReactiveFormsModule, FormsModule],
//       providers: [
//         { provide: HttpClient, useValue: httpClientSpy },
//         { provide: Router, useValue: routerSpy },
//         { provide: RecomendacionesService, useValue: recomendacionesServiceSpy },
//         { provide: UserSessionStorageService, useValue: userSessionStorageServiceSpy },
//         { provide: ActivatedRoute, useValue: activatedRouteStub },
//         { provide: UsuariosService, useValue: usuariosServiceSpy }
//       ]
//     }).compileComponents();
//
//     fixture = TestBed.createComponent(BusquedaRecomendacionesComponent)
//     component = fixture.componentInstance
//     fixture.detectChanges()
//   })
//
//   it('should create', () => {
//     expect(component).toBeTruthy()
//   })

  // it('debería llenar las recomendaciones y pasarlas a las cards', fakeAsync( () => {
  //   component.ngOnInit()
  //   fixture.detectChanges()
  //
  //   expect(component.recomendacionesFiltradas.length).toBe(2)
  //   expect(component.recomendacionesFiltradas[0].titulo).toBe("Recomendación 1")
  //
  //   const cardComponent = fixture.debugElement.query(By.directive(CardRecomendacionComponent))
  //   expect(cardComponent).toBeTruthy()
  //
  //   const cardRecomendacionInstance = cardComponent.componentInstance
  //   expect(cardRecomendacionInstance.recomendacion).toEqual(component.recomendacionesFiltradas[0])
  // }));
//})

