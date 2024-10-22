// import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing'
// import {getHttpClientSpy} from '../../services/service_usuarios/httpClientSpy'
// import {HttpClient} from '@angular/common/http'
// import {Router} from '@angular/router'
// import {FormsModule, ReactiveFormsModule} from '@angular/forms'
// import {HeaderComponent} from "./header.component";
//
// describe('HeaderComponent', () => {
//   let component: HeaderComponent
//   let fixture: ComponentFixture<HeaderComponent>
//   let routerSpy: jasmine.SpyObj<Router>
//   let httpClientSpy: jasmine.SpyObj<HttpClient>
//
//   beforeEach(fakeAsync(() => {
//     routerSpy = jasmine.createSpyObj('Router', ['navigate'])
//     httpClientSpy = getHttpClientSpy()
//
//     TestBed.configureTestingModule({
//       imports: [HeaderComponent, ReactiveFormsModule, FormsModule],
//       providers: [
//         { provide: HttpClient, useValue: httpClientSpy },
//         { provide: Router, useValue: routerSpy },
//       ]
//     }).compileComponents()
//
//     fixture = TestBed.createComponent(HeaderComponent)
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
