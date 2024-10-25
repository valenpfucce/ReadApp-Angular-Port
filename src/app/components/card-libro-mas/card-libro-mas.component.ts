import { Component, EventEmitter, Input, Output } from '@angular/core'
import { NgClass } from '@angular/common'
import { Router } from '@angular/router'

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
  @Input() tamanio: 'chica' | 'mediana' | 'grande' = 'grande'

  @Output() openModalEvent = new EventEmitter<void>()

  constructor(private router: Router) {}

  accionBoton() {
    if (
      this.tamanio == 'mediana' &&
      this.router.url == '/perfil/recomendacionesAValorar'
    ) {
      this.router.navigate(['/home'])
    } else if (this.tamanio === 'mediana') {
      this.router.navigate(['/recomendacion/nueva'])
    } else {
      this.openModalEvent.emit()
    }
  }
}
