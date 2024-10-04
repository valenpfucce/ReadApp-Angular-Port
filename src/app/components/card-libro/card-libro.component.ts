import { Component, Input } from '@angular/core';
import { JoinListaGuionPipe } from '../../pipes/join_lista_guion_pipe/join-lista-guion.pipe';
import { CortarPalabraPipe } from '../../pipes/cortar-palabra-pipe/cortar-palabra.pipe';
import { Libro } from '../../domain/libro';

@Component({
  selector: 'readapp-card-libro',
  standalone: true,
  imports: [JoinListaGuionPipe, CortarPalabraPipe],
  templateUrl: './card-libro.component.html',
  styleUrl: './card-libro.component.css'
})
export class CardLibroComponent {
  @Input() libro!: Libro
  @Input() modo!: 'detalle' | 'edicion';

  mostrarBotonBorrar() {
    return (this.modo === 'edicion') ? true : false
  }

  esTrending(){
    //Aca tendria que hacer el calculo con las ventas semanales, hacerlo en el front o back???
    return true
  }

  esBestSeller(){
    //Aca tendria que hacer el calculo de si es best seller, hacerlo en el front o back???
    return true
  }
}