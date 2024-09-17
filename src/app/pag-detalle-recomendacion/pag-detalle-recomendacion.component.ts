import { Component } from '@angular/core'
import { HeaderComponent } from '../header/header.component'
import {
  CardValoracion,
  CardValoracionComponent
} from '../card-valoracion/card-valoracion.component'
import {
  CardLibro,
  CardLibroComponent
} from '../card-libro/card-libro.component'

@Component({
  selector: 'app-pag-detalle-recomendacion',
  standalone: true,
  imports: [HeaderComponent, CardValoracionComponent, CardLibroComponent],
  templateUrl: './pag-detalle-recomendacion.component.html',
  styleUrls: [
    '../estilos_generales/estilo_recomendacion.css',
    './pag-detalle-recomendacion.component.css'
  ]
})
export class PagDetalleRecomendacionComponent {
  cardValoraciones = [
    new CardValoracion(
      'Blas Armando Giunta',
      '13/09/1999',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita error ut optio minus deleniti. Eligendi tenetur accusamus reprehenderit nemo, molestiae odio minima aspernatur non quaerat obcaecati fugiat doloribus, aperiam repellendus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus adipisci iusto atque soluta officia corrupti optio repudiandae sed dolores temporibus facilis at obcaecati odit rerum praesentium, placeat minima esse! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat repellendus sint animi adipisci voluptatibus blanditiis est ad exercitationem. Incidunt quod mollitia nulla in itaque ratione voluptate numquam. Labore, ipsam neque? Lorem ipsum dolor sit amet quasi repudiandae provident deserunt delectus similique asperiores nam, eaque nemo officia esse omnis quo! Aperiam.',
      4.5
    ),
    new CardValoracion('Agus Rey', '13/09/2024', 'NO ME GUSTÓ PARA NADA', 2)
  ]

  cardLibros = [new CardLibro(), new CardLibro(), new CardLibro()]
}
