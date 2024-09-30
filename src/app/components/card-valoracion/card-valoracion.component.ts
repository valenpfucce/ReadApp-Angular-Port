import { Component, Input } from '@angular/core'

@Component({
  selector: 'readapp-card-valoracion',
  standalone: true,
  imports: [],
  templateUrl: './card-valoracion.component.html',
  styleUrl: './card-valoracion.component.css'
})
export class CardValoracionComponent {
  @Input() cardValoracion!: CardValoracion
}

export class CardValoracion {
  constructor(
    public img_perfil: string,
    public nombre: string,
    public fecha: string,
    public detalle: string,
    public valoracion: number
  ) {}
}
