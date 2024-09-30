import { Recomendacion } from "../domains/recomendacion";
import { libros } from '../mocks/mock_libros';

export const recomendaciones = [
    new Recomendacion(
      1,
      'Recomendación Loca', 
      false,
      '"Es un conjunto de libros re copados que se puede leer en familia. Muy recomendable para niños"',
      [libros[3], libros[3], libros[3], libros[3]],
      4.5, 
      '8hs'
    ),
    new Recomendacion(
      2,
      'Recomendación Misteriosa',
      true,
      '"Espero que te guste este conjunto de libros de misterios de Agatha Christie"',
      [libros[4], libros[5], libros[6]],
      //['Los cuatro grandes', 'Asesinato en el Orient Express', 'Muerte en el Nilo'],
      4.3,
      '12hs'),
    new Recomendacion(
      3,
      'Clásicos!', 
      false,
      '"Te dejo una lista de libros clásicos que TENES que leer"',
      [libros[7], libros[8], libros[1]],
      //['Jane Eyre', 'El Principito', 'Don Quijote de la Mancha'],
      4.8,
      '18hs'),
    new Recomendacion(
      4,
      'Jane Austen <3', 
      false,
      '"Mejores libros de esta hermosa escritora. Romance"',
      [libros[9], libros[10], libros[11], libros[13]],
      //['Orgullo y Prejuicio', 'Emma', 'Persuación', 'Sentido y sensiblidad'], 
      4.2,
      '25hs'),
    new Recomendacion(
      5,
      'Mitología Griega', 
      true,
      'Estos libros son reversiones de historias clásicas de la mitología griega. Muy entretenidos',
      [libros[14], libros[15], libros[16], libros[17]],
      //['La canción de Aquiles', 'Circe', 'Medusa', 'Mientras no tengamos rostro'], 
      4.9,  
      '19hs'),
    new Recomendacion(
      6,
      'Fantasía', 
      false,
      'Estos libros son el comienzo de sagas que te van a dejar maravillado y con ganas de estar dentro de ese mundo',
      [libros[18], libros[19], libros[12]],
      //['Percy Jackson y el ladrón del rayo', 'Harry Potter y la piedra filosofal', 'Eragon'], 
      5,
      '8hs'),
  ]