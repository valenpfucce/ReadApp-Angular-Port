import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { NotfoundComponent } from './notfound/notfound.component';
import { PaginaEjemploComponent } from './pagina-ejemplo/pagina-ejemplo.component';
import { BusquedaRecomendacionesComponent } from './busqueda-recomendaciones/busqueda-recomendaciones.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'ejemplo', component:PaginaEjemploComponent },
    { path: 'login', component:LoginComponent },
    { path: 'home', component:BusquedaRecomendacionesComponent},
    { path: '**', component:NotfoundComponent}
];
