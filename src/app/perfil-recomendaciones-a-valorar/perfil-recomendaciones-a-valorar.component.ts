import { Component } from '@angular/core';
import { CardRecomendacion, CardRecomendacionComponent } from '../card-recomendacion/card-recomendacion.component';

@Component({
  selector: 'readapp-perfil-recomendaciones-a-valorar',
  standalone: true,
  imports: [CardRecomendacionComponent],
  templateUrl: './perfil-recomendaciones-a-valorar.component.html',
  styleUrls: ['../perfil-amigos/perfil-amigos.component.css','./perfil-recomendaciones-a-valorar.component.css']
})
export class PerfilRecomendacionesAValorarComponent {
  cardsRecomendaciones = [
    new CardRecomendacion(
      'Recomendación Loca', 
      true,
      '"Es un conjunto de libros re copados que se puede leer en familia. Muy recomendable para niños"',
      ['Cuidado con el perro', 'Cuidado con el perro', 'Cuidado con el perro', 'Cuidado con el perro'],
      4.5, 
      '8hs'
    ),
    new CardRecomendacion(
      'Clásicos!', 
      true,
      '"Te dejo una lista de libros clásicos que TENES que leer"',
      ['Jane Ayre', 'El Principito', 'Don Quijote de la Mancha'],
      4.8,
      '18hs'),
    new CardRecomendacion(
      'Jane Austen <3', 
      true,
      '"Mejores libros de esta hermosa escritora. Romance"',
      ['Orgullo y Prejuicio', 'Emma', 'Persuación', 'Lady Susan'], 
      4.2,
      '25hs'),
    new CardRecomendacion(
      'Fantasía', 
      true,
      'Estos libros son el comienzo de sagas que te van a dejar maravillado y con ganas de estar dentro de ese mundo',
      ['Percy Jackson y el ladrón del rayo', 'Harry Potter y la piedra filosofal', 'Eragon'], 
      5,
      '8hs'),
  ]
}
