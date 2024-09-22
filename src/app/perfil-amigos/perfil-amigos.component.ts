import { Component } from '@angular/core';
import { SidebarPerfilComponent } from '../sidebar-perfil/sidebar-perfil.component';

@Component({
  selector: 'readapp-perfil-amigos',
  standalone: true,
  imports: [SidebarPerfilComponent],
  templateUrl: './perfil-amigos.component.html',
  styleUrls: ['./perfil-amigos.component.css', '../estilos_generales/cartas_libros_btn_mas.css']
})
export class PerfilAmigosComponent {

}
