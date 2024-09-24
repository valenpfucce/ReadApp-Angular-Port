import { Component, Input } from '@angular/core';
import { JoinListaGuionPipe } from "../join_lista_guion_pipe/join-lista-guion.pipe";

@Component({
  selector: 'readapp-card-libro',
  standalone: true,
  imports: [JoinListaGuionPipe],
  templateUrl: './card-libro.component.html',
  styleUrls: ['../estilos_generales/cartas_libros.css', './card-libro.component.css']
})
export class CardLibroComponent {
  @Input() cardLibro!: CardLibro
  @Input() estaEnModoEdicion!: boolean;

  mostrarBotonBorrar() {
    return this.estaEnModoEdicion;
  }
}

export class CardLibro {
  constructor(
    public titulo_libro: string,
    public autor_libro: string,
    public imagen_libro_url: string,
    public cant_pags_libro: number,
    public cant_palabras_libro: number,
    public idiomas_libro: string[],
    public ventas_semanales: number
  ){}
}