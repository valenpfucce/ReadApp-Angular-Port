import { Component } from '@angular/core'
import { HeaderComponent } from '../header/header.component'
import { SidebarPerfilComponent } from '../sidebar-perfil/sidebar-perfil.component'
import {
  CardLibro,
  CardLibroComponent
} from '../card-libro/card-libro.component'

@Component({
  selector: 'readapp-perfil-libros-leidos',
  standalone: true,
  imports: [HeaderComponent, SidebarPerfilComponent, CardLibroComponent],
  templateUrl: './perfil-libros-leidos.component.html',
  styleUrls: [
    '../estilos_generales/estilo_recomendacion.css',
    '../pag-detalle-recomendacion/pag-detalle-recomendacion.component.css',
    '../card-libro/card-libro.component.css',
    '../perfil-amigos/perfil-amigos.component.css',
    './perfil-libros-leidos.component.css'
  ]
})
export class PerfilLibrosLeidosComponent {
  // cardLibros = [
  //   new CardLibro(),
  //   new CardLibro(),
  //   new CardLibro(),
  // ]
}
