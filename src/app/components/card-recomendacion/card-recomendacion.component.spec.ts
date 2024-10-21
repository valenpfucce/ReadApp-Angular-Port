import {ComponentFixture, TestBed, fakeAsync, flush, tick} from '@angular/core/testing'
import {getHttpClientSpy, recomendacion1} from '../../services/service_usuarios/httpClientSpy'
import {HttpClient} from '@angular/common/http'
import {ActivatedRoute, Router} from '@angular/router'
import {firstValueFrom, of, throwError} from 'rxjs'
import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import {CardRecomendacionComponent} from "./card-recomendacion.component";
import {RecomendacionesService} from "../../services/service_recomendaciones/recomendaciones.service";
import {Recomendacion} from "../../domain/recomendacion";
import {Libro} from "../../domain/libro";
import {Valoracion} from "../../domain/valoracion";

describe('CardRecomendacionComponent', () => {
  let component: CardRecomendacionComponent
  let fixture: ComponentFixture<CardRecomendacionComponent>
  let routerSpy: jasmine.SpyObj<Router>
  let activatedRouteStub: Partial<ActivatedRoute>
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let userSessionStorageServiceSpy: jasmine.SpyObj<UserSessionStorageService>
  let recomendacionesServiceSpy: jasmine.SpyObj<RecomendacionesService>

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl'])
    httpClientSpy = getHttpClientSpy()
    recomendacionesServiceSpy = jasmine.createSpyObj(
      'RecomendacionesService',
      ['getRecomendacionById']
    )

    const activatedRouteStub = {
      paramMap: of({ get: (param: string) => 'home' })
    };

    await TestBed.configureTestingModule({
      imports: [CardRecomendacionComponent, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        {
          provide: RecomendacionesService,
          useValue: recomendacionesServiceSpy
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(CardRecomendacionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    await fixture.whenStable()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('debería inicializar la recomendación con datos simulados', async () => {
    // Configura el servicio para devolver la recomendación simulada
    // @ts-ignore
    recomendacionesServiceSpy.getRecomendacionById.and.returnValue(of(recomendacion1));
    // Activa la detección de cambios para procesar los datos
    fixture.detectChanges();

    // Verifica que el componente tenga la recomendación cargada correctamente
    expect(component.recomendacion).toEqual(recomendacion1);
    expect(component.recomendacion.titulo).toBe('Recomendacion 1');
  });

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

})

