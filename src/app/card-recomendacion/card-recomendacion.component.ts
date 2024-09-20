import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CortarPalabraPipe } from '../cortar-palabra-pipe/cortar-palabra.pipe';

@Component({
  selector: 'readapp-card-recomendacion',
  standalone: true,
  imports: [CommonModule, CortarPalabraPipe],
  templateUrl: './card-recomendacion.component.html',
  styleUrl: './card-recomendacion.component.css'
})
export class CardRecomendacionComponent {
  @Input() cardRecomendacion!: CardRecomendacion
}

export class CardRecomendacion {
  constructor(
    public titulo: string,
    public descripcion: string,
    public lista_libros: string[],
    public valoracion: number,
    public cantLibros: number,
    public tiempoLectura: string
  ){}
}