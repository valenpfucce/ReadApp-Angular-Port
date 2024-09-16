import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CardValoracion, CardValoracionComponent } from '../card-valoracion/card-valoracion.component';
import { CardLibro, CardLibroComponent } from '../card-libro/card-libro.component';

@Component({
  selector: 'app-pag-detalle-recomendacion',
  standalone: true,
  imports: [HeaderComponent, CardValoracionComponent,CardLibroComponent],
  templateUrl: './pag-detalle-recomendacion.component.html',
  styleUrl: './pag-detalle-recomendacion.component.css'
})
export class PagDetalleRecomendacionComponent {
  cardValoraciones = [
    new CardValoracion(),
    new CardValoracion(),
  ]

  cardLibros = [
    new CardLibro(),
    new CardLibro(),
    new CardLibro(),
  ]
}
