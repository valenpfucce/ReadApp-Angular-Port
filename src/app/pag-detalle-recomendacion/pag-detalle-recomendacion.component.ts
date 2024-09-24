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
import { CardRecomendacion, CardRecomendacionComponent } from '../card-recomendacion/card-recomendacion.component'

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

  modoEdicion = new ModoEdicion()
  cardLibros = [
    new CardLibro(
      'The Book of Bill',
      'Alex Hirsch',
      '/imagenes/prueba.jpg',
      45,
      1805,
      ['Español', 'Inglés', 'Mandarín', 'Árabe'],
      1055584
    ),
    new CardLibro(
      'Don Quijote de la mancha',
      'Miguel de Cervantes',
      'https://www.planetalector.com/usuaris/thumbnails/libros/fotos/374/360/portada_don-quijote-de-la-mancha-comic_miguel-de-cervantes_202310231106.jpg',
      102,
      60504,
      ['Español', 'Inglés'],
      9802
    ),
    new CardLibro(
      "I'm Glad My Mom Died",
      'Janette McCurdy',
      'https://upload.wikimedia.org/wikipedia/en/2/2a/I%27m_Glad_My_Mom_Died_Cover.png',
      160,
      25005,
      ['Ingles', 'Español', 'Portugues', 'Francés'],
      1250000
    )
  ]

  cardValoraciones = [
    new CardValoracion(
      'bilardo.jpg',
      'Blas Armando Giunta',
      new Date().toLocaleDateString(),
      'Lorem ipsaperiam repellendus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus adipisci iusto atque soluta officia corrupti optio repudiandae sed dolores temporibus facilis at obcaecati odit rerum praesentium, placeat minima esse! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat repellendus sint animi adipisci voluptatibus blanditiis est ad exercitationem. Incidunt quod mollitia nulla in itaque ratione voluptate numquam. Labore, ipsam neque? Lorem ipsum dolor sit amet quasi repudiandae provident deserunt delectus similique asperiores nam, eaque nemo officia esse omnis quo! Aperiam.',
      4.5
    ),
    new CardValoracion(
      'roman.jpg',
      'Agus Rey',
      new Date().toLocaleDateString(),
      'NO ME GUSTÓ PARA NADA',
      2
    ),
    new CardValoracion(
      'roman.jpg',
      'Agus Rey',
      new Date().toLocaleDateString(),
      'no logró conectar conmigo de la manera que esperaba. Desde el principio, la trama parece prometedora, pero a medida que avanzas, te das cuenta de que se queda en la superficie',
      2
    ),
    new CardValoracion(
      'bilardo.jpg',
      'Agus Rey',
      new Date().toLocaleDateString(),
      'No sabía que estaba a punto de vivir una experiencia literaria tan profunda y reveladora. Desde la primera página, me atrapó con su narrativa tan envolvente que, honestamente, me fue imposible soltarlo. La forma en que el autor entrelaza las historias y los personajes es pura magia. Cada capítulo te sumerge en un universo único, donde las emociones se sienten tan reales que puedes casi tocarlas.',
      5
    )
  ]

  recomendacion = new CardRecomendacion(
    'Recomendación Desquiciada', 
    false,
    '"La verdad es que no hay una verdad"',
    ["this.cardLibros[0].titulo", 'this.cardLibros[1].titulo', 'this.cardLibros[2].titulo', 'this.cardLibros[3].titulo'], //HABLAR CON TATI PARA CAMBIAR ESTO
    4.5, 
    '8hs'
  )
}

class ModoEdicion {
  estaEnModoEdicion = false; 
}

