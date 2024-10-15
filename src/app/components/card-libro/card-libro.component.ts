import {Component, EventEmitter, Input, Output} from '@angular/core'
import { JoinListaGuionPipe } from '../../pipes/join_lista_guion_pipe/join-lista-guion.pipe'
import { CortarPalabraPipe } from '../../pipes/cortar-palabra-pipe/cortar-palabra.pipe'
import { Libro } from '../../domain/libro'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'readapp-card-libro',
  standalone: true,
  imports: [JoinListaGuionPipe, CortarPalabraPipe, CommonModule],
  templateUrl: './card-libro.component.html',
  styleUrl: '../../estilos_generales/cartas_libros.css'
})
export class CardLibroComponent {
  librosSeleccionados: Libro[] = []
  @Input() libro!: Libro
  @Input() modo!: 'detalle' | 'edicion'
  @Input() esModal: boolean = false

  //PRUEBA PARA VER SI ME IMPRIME, ELIMINARLO
  ngOnInit() {}

  mostrarBotonBorrar() {
    return this.modo === 'edicion'
  }

  esTrending() {
    //Aca tendria que hacer el calculo con las ventas semanales, hacerlo en el front o back???
    return true
  }

  esBestSeller() {
    //Aca tendria que hacer el calculo de si es best seller, hacerlo en el front o back???
    return true
  }
}
