import { Component, Input } from '@angular/core'
import { Valoracion } from '../../domain/valoracion'

@Component({
  selector: 'readapp-card-valoracion',
  standalone: true,
  imports: [],
  templateUrl: './card-valoracion.component.html',
  styleUrl: './card-valoracion.component.css'
})
export class CardValoracionComponent {
  @Input() valoracion!: Valoracion
}

