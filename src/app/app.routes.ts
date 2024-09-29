import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { SidebarPerfilComponent } from './pages/perfil/sidebar-perfil.component';
import { PerfilInfoComponent } from './pages/perfil/components/perfil-info/perfil-info.component';
import { BusquedaRecomendacionesComponent } from './pages/busqueda-recomendaciones/busqueda-recomendaciones.component';
import { PagDetalleRecomendacionComponent } from './pages/pag-detalle-recomendacion/pag-detalle-recomendacion.component';
import { PerfilAmigosComponent } from './pages/perfil/components/perfil-amigos/perfil-amigos.component';
import { BarraBusquedaComponent } from './components/barra-busqueda/barra-busqueda.component';
import { PerfilLibrosLeidosComponent } from './pages/perfil/components/perfil-libros-leidos/perfil-libros-leidos.component';
import { PerfilRecomendacionesAValorarComponent } from './pages/perfil/components/perfil-recomendaciones-a-valorar/perfil-recomendaciones-a-valorar.component';



export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component:LoginComponent },
    { path: 'home', component:BusquedaRecomendacionesComponent, data: {esCheckbox: true}},
    { path: 'detalle_recomendacion', component:PagDetalleRecomendacionComponent},
    { path: 'barra_busqueda', component:BarraBusquedaComponent},
    { path: 'libros_leidos', component:PerfilLibrosLeidosComponent},
    { path: 'mis', component:BusquedaRecomendacionesComponent, data: {esCheckbox: false}},


    { path: 'perfil', component:SidebarPerfilComponent, children:[
        { path: 'amigos', title:'Amigos', component:PerfilAmigosComponent},
        { path: 'info', title:'Informacion del Usuario' , component:PerfilInfoComponent},
        { path: 'recomendacionesAValorar', title: 'Recomendaciones A Valorar', component: PerfilRecomendacionesAValorarComponent}
        ] 
    },
    
   { path: '**', component:NotfoundComponent}

    
];


