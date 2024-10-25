// import {
//   ComponentFixture,
//   TestBed,
//   fakeAsync,
//   flush,
//   tick,
//   waitForAsync
// } from '@angular/core/testing'
// import {
//   getHttpClientSpy,
//   usuarioActualizado,
//   usuarioAsignatario
// } from '../../services/service_usuarios/httpClientSpy'
// import { HttpClient } from '@angular/common/http'
// import { provideRouter, Router, RouterModule, RouterLink, Routes   } from '@angular/router'
// import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { lastValueFrom, of, throwError } from 'rxjs'
// import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service'
// import { ReactiveFormsModule, FormsModule } from '@angular/forms'
// import { UsuariosService } from '../../services/service_usuarios/usuarios.service'
// import { ComponentFixtureAutoDetect } from '@angular/core/testing'
// import { SidebarPerfilComponent } from './sidebar-perfil.component'
// import { CommonModule } from '@angular/common'
// import { HeaderComponent } from '../../components/header/header.component'

// import { NotfoundComponent } from '../notfound/notfound.component'
// import { PerfilInfoComponent } from './components/perfil-info/perfil-info.component'

// describe('SidebarPerfilComponent', () => {
//   let component: SidebarPerfilComponent
//   let fixture: ComponentFixture<SidebarPerfilComponent>
//   let routerSpy: jasmine.SpyObj<Router>
//   let httpClientSpy: jasmine.SpyObj<HttpClient>
//   let userSessionStorageServiceSpy: jasmine.SpyObj<UserSessionStorageService>
//   let UsuariosServiceSpy: jasmine.SpyObj<UsuariosService>
//    let RouterModuleSpy: jasmine.SpyObj<RouterModule>
//   let RouterLinkSpy: jasmine.SpyObj<RouterLink>


//   beforeEach(async () => {
//     routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl'])
//     RouterModuleSpy= jasmine.createSpyObj('RouterModule', ['RuterLink', 'navigateByUrl'])
//     httpClientSpy = getHttpClientSpy() 
//     UsuariosServiceSpy = jasmine.createSpyObj('UsuariosService', [
//       'getUserById',
//       'putVerificationUser'
//     ])
//     userSessionStorageServiceSpy = jasmine.createSpyObj(
//       'UserSessionStorageService',
//       ['loginGetUsuarioIdToSS']
//     )
    
//     const featureRoutes: Routes = 
//     [   {path: '', component:SidebarPerfilComponent},
//          {path: '**', component: NotfoundComponent}, 
//          {path: 'info', component: PerfilInfoComponent}

//     ]



//     await TestBed.configureTestingModule({
//       imports: [SidebarPerfilComponent, ReactiveFormsModule , FormsModule ,CommonModule,HeaderComponent,RouterLink, RouterModule.forRoot(featureRoutes)],
//       providers: [
//         { provide: HttpClient, useValue: httpClientSpy },
//         { provide: Router, useValue: routerSpy },
//         [{ provide: ComponentFixtureAutoDetect, useValue: true }],
//         { provide: UsuariosService, useValue: UsuariosServiceSpy },
//          {provide: RouterModule, useValue: RouterModuleSpy},
//          {provide: RouterLink, useValue: RouterLinkSpy}
        
        
//      ]
//     }).compileComponents()

//     fixture = TestBed.createComponent(SidebarPerfilComponent)
//     component = fixture.componentInstance
//     fixture.detectChanges()

//     await fixture.whenStable()
//   })

  
//   fit('should create', () => {
//    component.ngOnInit
//     expect(component).toBeTruthy();
//   })

  
//   function inicializarUsuarioSpy() {
//     userSessionStorageServiceSpy.obtenerIDuserSS
//     UsuariosServiceSpy.getUserById.and.returnValue(
//       Promise.resolve(usuarioAsignatario)
//     )

//     //httpClientSpy.get.and.returnValue(of(usuarioAsignatario))
//   }

  
//   function getByTestId(testId: string) {
//     const resultHtml = fixture.debugElement.nativeElement
//     return resultHtml.querySelector(`[data-testid="${testId}"]`)
//   }
// })
 //============================================================================//
//       await TestBed.configureTestingModule({
//         //declarations: [PerfilInfoComponent, HeaderComponent],
//         imports: [PerfilInfoComponent, ],
//
//       })
//       .compileComponents();

//       fixture = TestBed.createComponent(PerfilInfoComponent);
//       component = fixture.componentInstance;
//       fixture.detectChanges();

//
//     });

//     it('should create', () => {
//       component.ngOnInit()
//       expect(component).toBeTruthy()
//     })

//     it('trae los datos del backend y los asigna al usuario', async () => {

//      inicializarUsuarioSpy()
//      await component.ngOnInit();
//      expect(component.usuario).toEqual(usuarioAsignatario);

//     });

//     it('verifica que el input nombre este cargado con el valor correspondiente',  fakeAsync(   () => {
//       //const botonMenuInfo = fixture.debugElement.nativeElement.querySelector('button[data-testid="aPerfilTest"]')
//       //botonMenuInfo.click()
//       inicializarUsuarioSpy()
//       component.ngOnInit();
//       fixture.detectChanges()
//       tick(0);

//       console.log("usertestes2", component.usuario)
//       fixture.whenStable()
//       fixture.detectChanges()

//       const nombreInput = getByTestId('nombreTest') as HTMLInputElement
//       const apellidoInput = getByTestId('apellidoTest') as HTMLInputElement

//       tick(0);

//       expect(nombreInput.value).toBe('Carlitos')
//       expect(apellidoInput.value).toBe('ApelldioFalso')
//       expect(component.usuario.nombre).toBe('Carlitos')

//     }))

//   });
