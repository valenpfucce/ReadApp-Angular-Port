import { Component, Input } from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'readapp-card-libro-mas',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './card-libro-mas.component.html',
  styleUrls: ['../../estilos_generales/cartas_libros.css', './card-libro-mas.component.css']
})
export class CardLibroMasComponent {
  @Input() tamanio!: 'chica' | 'mediana' | 'grande';
}
