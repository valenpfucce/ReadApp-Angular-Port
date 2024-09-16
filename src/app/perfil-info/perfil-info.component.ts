import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarPerfilComponent } from '../sidebar-perfil/sidebar-perfil.component';

@Component({
  selector: 'readapp-perfil-info',
  standalone: true,
  imports: [HeaderComponent, SidebarPerfilComponent],
  templateUrl: './perfil-info.component.html',
  styleUrl: './perfil-info.component.css'
})
export class PerfilInfoComponent {

}
