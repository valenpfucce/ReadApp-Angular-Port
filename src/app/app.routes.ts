import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { NotfoundComponent } from './notfound/notfound.component';
import { PaginaEjemploComponent } from './pagina-ejemplo/pagina-ejemplo.component';
import { SidebarPerfilComponent } from './sidebar-perfil/sidebar-perfil.component';
import { PerfilInfoComponent } from './perfil-info/perfil-info.component';
import { BusquedaRecomendacionesComponent } from './busqueda-recomendaciones/busqueda-recomendaciones.component';
import { PagDetalleRecomendacionComponent } from './pag-detalle-recomendacion/pag-detalle-recomendacion.component';
import { PerfilAmigosComponent } from './perfil-amigos/perfil-amigos.component';

import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';

import { PerfilLibrosLeidosComponent } from './perfil-libros-leidos/perfil-libros-leidos.component';



export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'ejemplo', component:PaginaEjemploComponent },
    { path: 'login', component:LoginComponent },
    { path: 'sidebar', component:SidebarPerfilComponent },
    { path: 'info', component:PerfilInfoComponent},
    { path: 'home', component:BusquedaRecomendacionesComponent},
    { path: 'detalle_recomendacion', component:PagDetalleRecomendacionComponent},
    { path: 'amigos', component:PerfilAmigosComponent},

    { path: 'barra_busqueda', component:BarraBusquedaComponent},

    { path: 'libros_leidos', component:PerfilLibrosLeidosComponent},

    { path: '**', component:NotfoundComponent}

    
];
