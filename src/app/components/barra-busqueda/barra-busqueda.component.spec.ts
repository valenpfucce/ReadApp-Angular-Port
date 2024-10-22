import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing'
import {getHttpClientSpy} from '../../services/service_usuarios/httpClientSpy'
import {HttpClient} from '@angular/common/http'
import {ActivatedRoute, Router} from '@angular/router'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {BarraBusquedaComponent} from "./barra-busqueda.component";
import {By} from "@angular/platform-browser";

describe('BarraBusquedaComponent', () => {
  let component: BarraBusquedaComponent
  let fixture: ComponentFixture<BarraBusquedaComponent>
  let routerSpy: jasmine.SpyObj<Router>
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(fakeAsync(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    httpClientSpy = getHttpClientSpy()

    TestBed.configureTestingModule({
      imports: [BarraBusquedaComponent, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Router, useValue: routerSpy },
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(BarraBusquedaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    fixture.whenStable()
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('debería hacer correctamente el binding de palabraABuscar', fakeAsync(() => {
    const inputElement = fixture.debugElement.nativeElement.querySelector('input[data-testid="texto"]')

    inputElement.value = 'Libro'
    inputElement.dispatchEvent(new Event('input'))

    fixture.detectChanges()

    expect(component.palabraABuscar).toBe('Libro')
  }))

  // it('debería mostrar el checkbox en la ruta "mis-recomendaciones"', () => {
  //   component.ngOnInit()
  //   fixture.detectChanges()
  //   //expect(component.showCheckBox).toBeTrue();
  //
  //   const checkboxElement = fixture.debugElement.nativeElement.querySelector('input[data-testid="checkbox"]')
  //
  //   expect(checkboxElement).toBeTruthy()
  // })
})
