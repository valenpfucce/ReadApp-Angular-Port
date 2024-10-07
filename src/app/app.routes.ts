import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { SidebarPerfilComponent } from './pages/perfil/sidebar-perfil.component';
import { PerfilInfoComponent } from './pages/perfil/components/perfil-info/perfil-info.component';
import { BusquedaRecomendacionesComponent } from './pages/busqueda-recomendaciones/busqueda-recomendaciones.component';
import { PagRecomendacionComponent } from './pages/pag-recomendacion/pag-recomendacion.component';
import { PerfilAmigosComponent } from './pages/perfil/components/perfil-amigos/perfil-amigos.component';
import { PerfilLibrosLeidosComponent } from './pages/perfil/components/perfil-libros-leidos/perfil-libros-leidos.component';
import { PerfilRecomendacionesAValorarComponent } from './pages/perfil/components/perfil-recomendaciones-a-valorar/perfil-recomendaciones-a-valorar.component';
import { RecomendacionesService } from './services/service_recomendaciones/recomendaciones.service';
import { Recomendacion } from './domain/recomendacion';
import { Usuario } from './domain/usuario';
import { BarraBusquedaComponent } from './components/header/components/barra-busqueda/barra-busqueda.component';
import { HttpClient } from '@angular/common/http';

export type DataBusqueda = {
    showCheckBox: boolean
    showCardMas: boolean
    realizarBusqueda: (
        serviceRecomendaciones: RecomendacionesService,
        palabraABuscar?: string,
        idUsuario?: number
    ) => Recomendacion[]
}

const dataBusquedaHome: DataBusqueda = { 
    showCheckBox: false,
    showCardMas: false,
    realizarBusqueda:(serviceRecomendaciones, palabraABuscar) => {
        return serviceRecomendaciones.busquedaGeneral(palabraABuscar)
    }
}

const dataBusquedaMisRecomendaciones: DataBusqueda = {
    showCheckBox: true,
    showCardMas: true,
    realizarBusqueda:(serviceRecomendaciones, palabraABuscar, idUsuario) => {
        return serviceRecomendaciones.busquedaMisRecomendaciones(palabraABuscar, idUsuario)
    }
}


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component:LoginComponent },
    { path: 'home', component:BusquedaRecomendacionesComponent, data: dataBusquedaHome},
    { path: 'recomendacion/:id/detalle', component:PagRecomendacionComponent, data: { modo: 'detalle' } },
    { path: 'recomendacion/:id/edicion', component:PagRecomendacionComponent, data: { modo: 'edicion' } },
    { path: 'barra_busqueda', component:BarraBusquedaComponent},
    { path: 'libros_leidos', component:PerfilLibrosLeidosComponent},
    { path: 'mis_recomendaciones', component:BusquedaRecomendacionesComponent, data: dataBusquedaMisRecomendaciones},

    { path: 'perfil', component:SidebarPerfilComponent, children:[
        { path: 'amigos', title:'Amigos', component:PerfilAmigosComponent},
        { path: 'info', title:'Informacion del Usuario' , component:PerfilInfoComponent},
        { path: 'recomendacionesAValorar', title: 'Recomendaciones A Valorar', component: PerfilRecomendacionesAValorarComponent}
        ] 
    },
    
   { path: '**', component:NotfoundComponent}
];


