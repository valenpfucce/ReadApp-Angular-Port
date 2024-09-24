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
    new CardRecomendacion(
      'Recomendación Loca', 
      false,
      '"Es un conjunto de libros re copados que se puede leer en familia. Muy recomendable para niños"',
      ['Cuidado con el perro', 'Cuidado con el perro', 'Cuidado con el perro', 'Cuidado con el perro'],
      4.5, 
      '8hs'
    ),
    new CardRecomendacion(
      'Recomendación Misteriosa',
      true,
      '"Espero que te guste este conjunto de libros de misterios de Agatha Christie"',
      ['Los cuatro grandes', 'Asesinato en el Orient Express', 'Muerte en el Nilo'],
      4.3,
      '12hs'),
    new CardRecomendacion(
      'Clásicos!', 
      false,
      '"Te dejo una lista de libros clásicos que TENES que leer"',
      ['Jane Ayre', 'El Principito', 'Don Quijote de la Mancha'],
      4.8,
      '18hs'),
    new CardRecomendacion(
      'Jane Austen <3', 
      false,
      '"Mejores libros de esta hermosa escritora. Romance"',
      ['Orgullo y Prejuicio', 'Emma', 'Persuación', 'Lady Susan'], 
      4.2,
      '25hs'),
    new CardRecomendacion(
      'Mitología Griega', 
      true,
      'Estos libros son reversiones de historias clásicas de la mitología griega. Muy entretenidos',
      ['La canción de Aquiles', 'Circe', 'Medusa', 'Mientras no tengamos rostro'], 
      4.9,  
      '19hs'),
    new CardRecomendacion(
      'Fantasía', 
      false,
      'Estos libros son el comienzo de sagas que te van a dejar maravillado y con ganas de estar dentro de ese mundo',
      ['Percy Jackson y el ladrón del rayo', 'Harry Potter y la piedra filosofal', 'Eragon'], 
      5,
      '8hs'),
  ]
}
