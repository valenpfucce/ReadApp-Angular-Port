import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { NotfoundComponent } from './notfound/notfound.component';
import { PaginaEjemploComponent } from './pagina-ejemplo/pagina-ejemplo.component';
import { SidebarPerfilComponent } from './sidebar-perfil/sidebar-perfil.component';
import { PerfilInfoComponent } from './perfil-info/perfil-info.component';
import { BusquedaRecomendacionesComponent } from './busqueda-recomendaciones/busqueda-recomendaciones.component';
import { CardValoracionComponent } from './card-valoracion/card-valoracion.component';
import { PagDetalleRecomendacionComponent } from './pag-detalle-recomendacion/pag-detalle-recomendacion.component';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'ejemplo', component:PaginaEjemploComponent },
    { path: 'login', component:LoginComponent },
    { path: 'sidebar', component:SidebarPerfilComponent },
    { path: 'info', component:PerfilInfoComponent},
    { path: 'home', component:BusquedaRecomendacionesComponent},
    { path: 'detalle_recomendacion', component:PagDetalleRecomendacionComponent},
    { path: '**', component:NotfoundComponent}
    
];
