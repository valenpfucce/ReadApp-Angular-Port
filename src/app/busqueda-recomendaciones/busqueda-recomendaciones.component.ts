import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CardRecomendacion, CardRecomendacionComponent } from '../card-recomendacion/card-recomendacion.component';

@Component({
  selector: 'readapp-busqueda-recomendaciones',
  standalone: true,
  imports: [HeaderComponent, CardRecomendacionComponent],
  templateUrl: './busqueda-recomendaciones.component.html',
  styleUrl: './busqueda-recomendaciones.component.css'
})
export class BusquedaRecomendacionesComponent {
  cardRecomendaciones = [
    new CardRecomendacion(),
    new CardRecomendacion(),
    new CardRecomendacion(),
    new CardRecomendacion(),
    new CardRecomendacion(),
    new CardRecomendacion(),
    new CardRecomendacion(),
  ]
}
