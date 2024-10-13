import { Component, EventEmitter, Input, Output } from '@angular/core'
import { NgClass } from '@angular/common'

@Component({
  selector: 'readapp-card-libro-mas',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card-libro-mas.component.html',
  styleUrls: [
    '../../estilos_generales/cartas_libros.css',
    './card-libro-mas.component.css'
  ]
})
export class CardLibroMasComponent {
  @Input() tamanio!: 'chica' | 'mediana' | 'grande'
  @Output() openModalEvent = new EventEmitter<void>()

  openModal() {
    console.log('Evento openModalEvent emitido') // Para verificar si esto se ejecuta
    this.openModalEvent.emit() // Emitir evento para abrir el modal
  }
}
