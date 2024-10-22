import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import { PagRecomendacionComponent } from './pag-recomendacion.component';
import {ActivatedRoute, Router} from "@angular/router";
import {UsuariosService} from "../../services/service_usuarios/usuarios.service";
import {RecomendacionesService} from "../../services/service_recomendaciones/recomendaciones.service";
import {UserSessionStorageService} from "../../services/service_user_session_storage/user-session-storage.service";
import {HeaderComponent} from "../../components/header/header.component";
import {CardValoracionComponent} from "../../components/card-valoracion/card-valoracion.component";
import {CardLibroComponent} from "../../components/card-libro/card-libro.component";
import {CardLibroMasComponent} from "../../components/card-libro-mas/card-libro-mas.component";
import {FormsModule} from "@angular/forms";
import {ModalComponent} from "../../components/modal/modal.component";
import {CommonModule} from "@angular/common";
import {ModalValoracionComponent} from "../../components/modal-valoracion/modal-valoracion.component";

describe('PagDetalleRecomendacionComponent', () => {
  let component: PagRecomendacionComponent;
  let fixture: ComponentFixture<PagRecomendacionComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let routeSpy: jasmine.SpyObj<ActivatedRoute>;
  let serviceRecomendacionSpy: jasmine.SpyObj<RecomendacionesService>;
  let userServiceUS: jasmine.SpyObj<UsuariosService>;
  let sessionStorage: jasmine.SpyObj<UserSessionStorageService>;

  beforeEach(fakeAsync(() => {
    // routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routeSpy = jasmine.createSpyObj('ActivatedRoute', [], { data: { modo: 'detalle' }}, );
    serviceRecomendacionSpy = jasmine.createSpyObj('RecomendacionesService', ['getRecomendacionById']);
    userServiceUS = jasmine.createSpyObj('UsuariosService', ['getUser']);
    sessionStorage = jasmine.createSpyObj('UserSessionStorageService', ['getSessionId']);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        CommonModule,
      ],
      declarations: [
        PagRecomendacionComponent,
        HeaderComponent,
        CardValoracionComponent,
        CardLibroComponent,
        CardLibroMasComponent,
        ModalComponent,
        ModalValoracionComponent,
      ],
      providers: [
        // { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: RecomendacionesService, useValue: serviceRecomendacionSpy },
        { provide: UsuariosService, useValue: userServiceUS },
        { provide: UserSessionStorageService, useValue: sessionStorage }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PagRecomendacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
