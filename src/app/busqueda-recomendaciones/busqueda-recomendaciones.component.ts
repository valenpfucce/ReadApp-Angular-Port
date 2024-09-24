import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CardRecomendacion, CardRecomendacionComponent } from '../card-recomendacion/card-recomendacion.component';
import { BarraBusquedaComponent } from "../barra-busqueda/barra-busqueda.component";

@Component({
  selector: 'readapp-busqueda-recomendaciones',
  standalone: true,
  imports: [HeaderComponent, CardRecomendacionComponent, BarraBusquedaComponent],
  templateUrl: './busqueda-recomendaciones.component.html',
  styleUrl: './busqueda-recomendaciones.component.css'
})
export class BusquedaRecomendacionesComponent {
  cardsRecomendaciones = [
    new CardRecomendacion('Recomendación Loca', '"Es un conjunto de libros re copados que se puede leer en familia. Muy recomendable para niños"','Cuidado con el perro', 'Cuidado con el perro', 'Cuidado con el perro', 'Cuidado con el perro', 4.5, 4, '8hs'),
    new CardRecomendacion('Recomendación Misteriosa', '"Espero que te guste este conjunto de libros de misterios de Agatha Christie"','Los cuatro grandes', 'Asesinato en el Orient Express', 'Muerte en el Nilo', 'Un cadáver en la biblioteca', 4.3, 4, '12hs'),
    new CardRecomendacion('Clásicos!', '"Te dejo una lista de libros clásicos que TENES que leer"','Jane Ayre', 'El principito', 'Don Quijote de la Mancha', 'La Odisea', 4.8, 4, '18hs'),
    new CardRecomendacion('Jane Austen <3', '"Mejores libros de esta hermosa escritora. Romance"','Orgullo y Prejuicio', 'Emma', 'Persuación', 'Lady Susan', 4.2, 4, '25hs'),
    new CardRecomendacion('Mitología Griega', 'Estos libros son reversiones de historias clásicas de la mitología griega. Muy entretenidos','Circe', 'La canción de Aquiles', 'Medusa', 'Mientras no tengamos rostro', 4.9, 4, '19hs'),
    new CardRecomendacion('Recomendacion 6', 'hola','libro1', 'libro2', 'libro3', 'libro4', 4.5, 4, '8hs'),
  ]
}
