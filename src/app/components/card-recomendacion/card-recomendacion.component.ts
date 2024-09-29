import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CortarPalabraPipe } from '../../pipes/cortar-palabra-pipe/cortar-palabra.pipe';
import { Router } from '@angular/router'

@Component({
  selector: 'readapp-card-recomendacion',
  standalone: true,
  imports: [CommonModule, CortarPalabraPipe],
  templateUrl: './card-recomendacion.component.html',
  styleUrl: './card-recomendacion.component.css'
})
export class CardRecomendacionComponent {
  @Input() cardRecomendacion!: CardRecomendacion
  constructor(
    private router: Router
  ){}

  verMas(){
    this.router.navigateByUrl('/detalle_recomendacion')
  }
}

export class CardRecomendacion {
  constructor(
    public titulo: string,
    public propia: boolean,
    public descripcion: string,
    public lista_libros: string[],
    public valoracion: number,
    public tiempoLectura: string
  ){}
}