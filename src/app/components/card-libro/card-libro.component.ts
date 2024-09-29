import { Component, Input } from '@angular/core';
import { JoinListaGuionPipe } from '../../pipes/join_lista_guion_pipe/join-lista-guion.pipe';
import { CortarPalabraPipe } from '../../pipes/cortar-palabra-pipe/cortar-palabra.pipe';
import { Libro } from '../../domains/libro';

@Component({
  selector: 'readapp-card-libro',
  standalone: true,
  imports: [JoinListaGuionPipe, CortarPalabraPipe],
  templateUrl: './card-libro.component.html',
  styleUrls: ['../../estilos_generales/cartas_libros.css', './card-libro.component.css']
})
export class CardLibroComponent {
  @Input() libro!: Libro
  @Input() estaEnModoEdicion!: boolean;

  mostrarBotonBorrar() {
    return this.estaEnModoEdicion;
  }
}