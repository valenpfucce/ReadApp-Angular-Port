import { Component, Input } from '@angular/core';

@Component({
  selector: 'readapp-card-recomendacion',
  standalone: true,
  imports: [],
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
    public libro1: string,
    public libro2: string,
    public libro3: string,
    public libro4: string,
    public valoracion: number,
    public cantLibros: number,
    public tiempoLectura: string
  ){}
}