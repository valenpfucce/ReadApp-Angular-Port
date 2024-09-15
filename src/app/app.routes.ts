import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { NotfoundComponent } from './notfound/notfound.component';
import { PaginaEjemploComponent } from './pagina-ejemplo/pagina-ejemplo.component';
import { SidebarPerfilComponent } from './sidebar-perfil/sidebar-perfil.component';
import { PerfilInfoComponent } from './perfil-info/perfil-info.component';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'ejemplo', component:PaginaEjemploComponent },
    { path: 'login', component:LoginComponent },
    { path: 'sidebar', component:SidebarPerfilComponent },
    { path: 'info', component:PerfilInfoComponent},
    { path: '**', component:NotfoundComponent}
    
];
