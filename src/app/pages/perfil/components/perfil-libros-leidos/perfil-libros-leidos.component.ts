import { Component } from '@angular/core'
import { HeaderComponent } from '../../../../components/header/header.component'
import { SidebarPerfilComponent } from '../../sidebar-perfil.component'
import { CardLibroComponent } from '../../../../components/card-libro/card-libro.component'

@Component({
  selector: 'readapp-perfil-libros-leidos',
  standalone: true,
  imports: [HeaderComponent, SidebarPerfilComponent, CardLibroComponent],
  templateUrl: './perfil-libros-leidos.component.html',
  styleUrls: [
    '../../../../estilos_generales/estilo_recomendacion.css',
    '../../../../pages/pag-recomendacion/pag-recomendacion.component.css',
    '../../../../components/card-libro/card-libro.component.css',
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
