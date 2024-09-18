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
      'bilardo.jpg',
      'Blas Armando Giunta',
      '13/09/1999',
      'Lorem ipsaperiam repellendus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus adipisci iusto atque soluta officia corrupti optio repudiandae sed dolores temporibus facilis at obcaecati odit rerum praesentium, placeat minima esse! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat repellendus sint animi adipisci voluptatibus blanditiis est ad exercitationem. Incidunt quod mollitia nulla in itaque ratione voluptate numquam. Labore, ipsam neque? Lorem ipsum dolor sit amet quasi repudiandae provident deserunt delectus similique asperiores nam, eaque nemo officia esse omnis quo! Aperiam.',
      4.5
    ),
    new CardValoracion(
      'roman.jpg',
      'Agus Rey',
      '13/09/2024',
      'NO ME GUSTÓ PARA NADA',
      2
    ),
    new CardValoracion(
      'roman.jpg',
      'Agus Rey',
      '13/09/2024',
      'no logró conectar conmigo de la manera que esperaba. Desde el principio, la trama parece prometedora, pero a medida que avanzas, te das cuenta de que se queda en la superficie',
      2
    ),
    new CardValoracion(
      'bilardo.jpg',
      'Agus Rey',
      '13/09/2024',
      'No sabía que estaba a punto de vivir una experiencia literaria tan profunda y reveladora. Desde la primera página, me atrapó con su narrativa tan envolvente que, honestamente, me fue imposible soltarlo. La forma en que el autor entrelaza las historias y los personajes es pura magia. Cada capítulo te sumerge en un universo único, donde las emociones se sienten tan reales que puedes casi tocarlas.',
      5
    )
  ]

  cardLibros = [new CardLibro(), new CardLibro(), new CardLibro()]
}
