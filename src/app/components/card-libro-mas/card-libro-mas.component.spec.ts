// import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing'
// import {getHttpClientSpy} from '../../services/service_usuarios/httpClientSpy'
// import {HttpClient} from '@angular/common/http'
// import {Router} from '@angular/router'
// import {FormsModule, ReactiveFormsModule} from '@angular/forms'
// import {CardLibroMasComponent} from "./card-libro-mas.component";
//
// describe('CardLibroMasComponent', () => {
//   let component: CardLibroMasComponent
//   let fixture: ComponentFixture<CardLibroMasComponent>
//   let routerSpy: jasmine.SpyObj<Router>
//   let httpClientSpy: jasmine.SpyObj<HttpClient>
//
//   beforeEach(fakeAsync(() => {
//     routerSpy = jasmine.createSpyObj('Router', ['navigate'])
//     httpClientSpy = getHttpClientSpy()
//
//     TestBed.configureTestingModule({
//       imports: [CardLibroMasComponent, ReactiveFormsModule, FormsModule],
//       providers: [
//         { provide: HttpClient, useValue: httpClientSpy },
//         { provide: Router, useValue: routerSpy },
//       ]
//     }).compileComponents()
//
//     fixture = TestBed.createComponent(CardLibroMasComponent)
//     component = fixture.componentInstance
//     fixture.detectChanges()
//
//     fixture.whenStable()
//     fixture.detectChanges()
//   }))
//
//   it('should create', () => {
//     expect(component).toBeTruthy()
//   })
// })
