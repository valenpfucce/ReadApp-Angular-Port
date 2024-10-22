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
import {Recomendacion, RecomendacionJSON} from './domain/recomendacion';
import { Usuario } from './domain/usuario';
import { BarraBusquedaComponent } from './components/barra-busqueda/barra-busqueda.component';
import { HttpClient } from '@angular/common/http';
import { PerfilLibrosALeerComponent } from './pages/perfil/components/perfil-libros-a-leer/perfil-libros-a-leer.component';

export type DataBusqueda = {
  showCheckBox: boolean;
  showCardMas: boolean;
  realizarBusqueda: (
    serviceRecomendaciones: RecomendacionesService,
    palabraABuscar?: string,
    idUsuario?: number
  ) => Promise<Recomendacion[]>;
};

const dataBusquedaHome: DataBusqueda = {
  showCheckBox: false,
  showCardMas: false,
  realizarBusqueda: (serviceRecomendaciones, palabraABuscar, idUsuario) => {
    return serviceRecomendaciones.busquedaGeneral(palabraABuscar, idUsuario);
  }
};

const dataBusquedaMisRecomendaciones: DataBusqueda = {
  showCheckBox: true,
  showCardMas: true,
  realizarBusqueda: async (serviceRecomendaciones, palabraABuscar, idUsuario) => {
    const resultados: Recomendacion[] = await serviceRecomendaciones.busquedaMisRecomendaciones(palabraABuscar, idUsuario);
    return resultados;
  }
};



export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', title:'Readapp', component:LoginComponent },
    { path: 'home', title: 'Home', component:BusquedaRecomendacionesComponent, data: dataBusquedaHome},
    { path: 'recomendacion/:id/detalle', title:'Detalle de Recomendación', component:PagRecomendacionComponent, data: { modo: 'detalle' } },
    { path: 'recomendacion/:id/edicion', title:'Edición de Recomendación', component:PagRecomendacionComponent, data: { modo: 'edicion' } },
    { path: 'recomendacion/nueva', title:'Nueva Recomendación', component:PagRecomendacionComponent, data: { modo: 'nueva' } },
    { path: 'barra_busqueda', component:BarraBusquedaComponent},
    { path: 'mis_recomendaciones', title: 'Mis Recomendaciones', component:BusquedaRecomendacionesComponent, data: dataBusquedaMisRecomendaciones},
    { path: 'perfil', component:SidebarPerfilComponent, children:[
        { path: 'amigos', title:'Amigos', component:PerfilAmigosComponent},
        { path: 'info', title:'Informacion del Usuario' , component:PerfilInfoComponent},
        { path: 'libros_leidos', title: 'Libros leídos', component:PerfilLibrosLeidosComponent},
        { path: 'libros_a_leer', title: 'Libros a leer', component:PerfilLibrosALeerComponent},
        { path: 'recomendacionesAValorar', title: 'Recomendaciones A Valorar', component: PerfilRecomendacionesAValorarComponent}
        ]
    },

   { path: '**', component:NotfoundComponent}
];


