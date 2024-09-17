import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CardValoracion, CardValoracionComponent } from '../card-valoracion/card-valoracion.component';
import { CardLibro, CardLibroComponent } from '../card-libro/card-libro.component';

@Component({
  selector: 'app-pag-detalle-recomendacion',
  standalone: true,
  imports: [HeaderComponent, CardValoracionComponent,CardLibroComponent],
  templateUrl: './pag-detalle-recomendacion.component.html',
  styleUrls: ['../estilos_generales/estilo_recomendacion.css', './pag-detalle-recomendacion.component.css']
})

export class PagDetalleRecomendacionComponent {
  cardValoraciones = [
    new CardValoracion(),
    new CardValoracion(),
  ]

  cardLibros = [
    new CardLibro('The Book of Bill','Alex Hirsch', '/imagenes/prueba.jpg',45,1805,['Español','Inglés','Mandarín','Árabe'],1055584),
    new CardLibro('Don Quijote de la man...','Miguel de Cervantes', 'https://www.planetalector.com/usuaris/thumbnails/libros/fotos/374/360/portada_don-quijote-de-la-mancha-comic_miguel-de-cervantes_202310231106.jpg',102,60504,['Español','Inglés'],9802),
    new CardLibro("I'm Glad My Mom Died",'Janette McCurdy', 'https://upload.wikimedia.org/wikipedia/en/2/2a/I%27m_Glad_My_Mom_Died_Cover.png',160,25005,['Ingles','Español','Portugues','Francés'],1250000)
  ]
}
