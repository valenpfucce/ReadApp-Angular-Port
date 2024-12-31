// import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing'
// import {getHttpClientSpy} from '../../services/service_usuarios/httpClientSpy'
// import {HttpClient} from '@angular/common/http'
// import {ActivatedRoute, Router} from '@angular/router'
// import {of} from 'rxjs'
// import {FormsModule, ReactiveFormsModule} from '@angular/forms'
// import {CardRecomendacionComponent} from "./card-recomendacion.component";
// import {RecomendacionesService} from "../../services/service_recomendaciones/recomendaciones.service";
// import {CortarPalabraPipe} from "../../pipes/cortar-palabra-pipe/cortar-palabra.pipe";
//
// describe('CardRecomendacionComponent', () => {
//   let component: CardRecomendacionComponent
//   let fixture: ComponentFixture<CardRecomendacionComponent>
//   let routerSpy: jasmine.SpyObj<Router>
//   let httpClientSpy: jasmine.SpyObj<HttpClient>
//   let recomendacionesServiceSpy: jasmine.SpyObj<RecomendacionesService>
//   beforeEach(fakeAsync( () => {
//     routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl'])
//     httpClientSpy = getHttpClientSpy()
//     recomendacionesServiceSpy = jasmine.createSpyObj(
//       'RecomendacionesService',
//       ['getRecomendacionById'])
//
//     const activatedRouteStub = {
//       paramMap: of({ get: (param: string) => 'home' })
//     }
//
//     TestBed.configureTestingModule({
//       imports: [CardRecomendacionComponent, ReactiveFormsModule, FormsModule, CortarPalabraPipe],
//       providers: [
//         { provide: HttpClient, useValue: httpClientSpy },
//         { provide: Router, useValue: routerSpy },
//         { provide: ActivatedRoute, useValue: activatedRouteStub },
//         {
//           provide: RecomendacionesService,
//           useValue: recomendacionesServiceSpy
//         }
//       ]
//     }).compileComponents()
//
//     fixture = TestBed.createComponent(CardRecomendacionComponent)
//     component = fixture.componentInstance
//     fixture.detectChanges()
//
//     fixture.whenStable()
//     fixture.detectChanges()
//   }))
//
//   it('should create', fakeAsync( () => {
//     //expect(component).toBeTruthy()
//   }))

  // it('debería inicializar la recomendación con datos simulados', async () => {
  //   await component.ngOnInit()
  //   // Configura el servicio para devolver la recomendación simulada
  //   const recomendacionDevuelta = recomendacionesServiceSpy.getRecomendacionById.and.returnValue(Promise.resolve(recomendacion1));
  //   console.log(recomendacionDevuelta)
  //   // Activa la detección de cambios para procesar los datos
  //
  //   fixture.detectChanges();
  //
  //   // Verifica que el componente tenga la recomendación cargada correctamente
  //   expect(component.recomendacion).toEqual(recomendacion1);
  //   expect(component.recomendacion.titulo).toBe('Recomendacion 1');
  // });

  // it('debería cambiar el estado del corazón cuando se hace clic', async () => {
  //   expect(component.corazonCliqueado).toBeFalse()
  //
  //   const corazonButton = fixture
  //     .debugElement.nativeElement.querySelector('button[data-testid="corazon"]');
  //   corazonButton.click();
  //
  //   fixture.detectChanges();
  //   await fixture.whenStable();
  //
  //   expect(component.corazonCliqueado).toBeTrue();
  //
  //   corazonButton.click();
  //
  //   fixture.detectChanges();
  //   await fixture.whenStable();
  //
  //   expect(component.corazonCliqueado).toBeFalse();
  // });

  // it('debería mostrar el corazón si el usuario puede valorar ', () => {
  //   component.recomendacion = new Recomendacion(1, 1, "Recomendación 1", true, "Descripción", [], [], 4, 9);
  //
  //   // Caso 1: El usuario puede valorar
  //   component.puedeValorar = true
  //   fixture.detectChanges()
  //
  //   const corazon = fixture.debugElement.nativeElement.querySelector('button[data-testid="corazon"]');
  //   expect(corazon).toBeTruthy()
  //
  //   // Caso 2: El usuario no puede valorar
  //   component.puedeValorar = false
  //   fixture.detectChanges()
  //
  //   expect(corazon).toBeFalsy()
  // })

  // it('debería mostrar el lapiz y el tacho si el usuario puede editar ', () => {
  //   component.recomendacion = new Recomendacion(1, 1, "Recomendación 1", true, "Descripción", [], [], 4, 9)
  //
  //   // Caso 1: El usuario puede editar
  //   component.puedeEditar = true
  //   fixture.detectChanges()
  //
  //   const lapiz = fixture.debugElement.nativeElement.querySelector('button[data-testid="lapiz"]')
  //   const tacho = fixture.debugElement.nativeElement.querySelector('button[data-testid="tacho"]')
  //
  //   expect(lapiz).toBeTruthy()
  //   expect(tacho).toBeTruthy()
  //
  //   // Caso 2: El usuario no puede editar
  //   component.puedeEditar = false
  //   fixture.detectChanges()
  //
  //   expect(lapiz).toBeFalsy()
  //   expect(tacho).toBeFalsy()
  // })

  // it('debería aparecer un mensaje de advertencia si se cliquea el tacho ', () => {
  //   component.recomendacion = new Recomendacion(1, 1, "Recomendación 1", true, "Descripción", [], [], 4, 9)
  //
  //   component.puedeEditar = true
  //   fixture.detectChanges()

  //   const tacho = fixture.debugElement.nativeElement.querySelector('button[data-testid="tacho"]')
  //   tacho.click()
  //   fixture.detectChanges()
  //
  //   expect(component.advertenciaVisible).toBeTrue()
  // })

  // it('se debería eliminar la recomendacion si se cliquea 'Eliminar' ', () => {
  //   component.recomendacion = new Recomendacion(1, 1, "Recomendación 1", true, "Descripción", [], [], 4, 9)
  //
  //   component.puedeEditar = true
  //   fixture.detectChanges()

  //   const tacho = fixture.debugElement.nativeElement.querySelector('button[data-testid="tacho"]')
  //   tacho.click()
  //   fixture.detectChanges()
  //
  //   const eliminarRec = fixture.debugElement.nativeElement.querySelector('button[data-testid="eliminarRec"]')
  //   eliminarRec.click()
  //   fixture.detectChanges()

  //   expect(component.recomendacion).toBeFalsy()
  // })

  // it('debería enrutarse a la página de detalle de la recomendación al hacer clic en "Ver más"', async () => {
  //   component.recomendacion = new Recomendacion(1, 1, "Recomendación 1", true, "Descripción", [], [], 4, 9)
  //   fixture.detectChanges()

  //   const botonVerMas = fixture.debugElement.nativeElement.querySelector(data-testid ="verMas")
  //   botonVerMas.click()
  //
  //   await fixture.whenStable()
  //   fixture.detectChanges()
  //
  //   expect(router.url).toBe(`/recomendacion/${component.recomendacion.id}/detalle`);
  // });


//})

