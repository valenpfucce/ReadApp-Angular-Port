import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CortarPalabraPipe } from '../../pipes/cortar-palabra-pipe/cortar-palabra.pipe';
import { Router, RouterModule } from '@angular/router'
import { Recomendacion } from '../../domains/recomendacion';

@Component({
  selector: 'readapp-card-recomendacion',
  standalone: true,
  imports: [CommonModule, CortarPalabraPipe, RouterModule],
  templateUrl: './card-recomendacion.component.html',
  styleUrl: './card-recomendacion.component.css'
})
export class CardRecomendacionComponent {
  @Input() recomendacion!: Recomendacion
  @Input() puedeEditar!: Boolean

  constructor(
    private router: Router
  ){}


}