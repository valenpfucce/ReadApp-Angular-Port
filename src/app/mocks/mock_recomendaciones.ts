// import { Recomendacion } from "../domain/recomendacion";
// import { Valoracion } from "../domain/valoracion";
// import { libros } from '../mocks/mock_libros';
// import { Usuario } from "../domain/usuario";
//
// export const recomendaciones = [
//   new Recomendacion(
//     1,
//     // usuarios.id,
//     'Recomendación Loca',
//     false,
//     '"Es un conjunto de libros re copados que se puede leer en familia. Muy recomendable para niños"',
//     [libros[3], libros[3], libros[3], libros[3]],
//     [
//       new Valoracion(
//         undefined,
//         undefined,
//         'bilardo.jpg',
//         4.5,
//         'Lorem ipsaperiam repellendus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus adipisci iusto atque soluta officia corrupti optio repudiandae sed dolores temporibus facilis at obcaecati odit rerum praesentium, placeat minima esse! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat repellendus sint animi adipisci voluptatibus blanditiis est ad exercitationem. Incidunt quod mollitia nulla in itaque ratione voluptate numquam. Labore, ipsam neque? Lorem ipsum dolor sit amet quasi repudiandae provident deserunt delectus similique asperiores nam, eaque nemo officia esse omnis quo! Aperiam.',
//         new Date().toLocaleDateString()
//       ),
//       new Valoracion(
//         undefined,
//         undefined,
//         'roman.jpg',
//         2,
//         'NO ME GUSTÓ PARA NADA',
//         new Date().toLocaleDateString()
//       ),
//       new Valoracion(
//         undefined,
//         undefined,
//         'roman.jpg',
//         2,
//         'no logró conectar conmigo de la manera que esperaba. Desde el principio, la trama parece prometedora, pero a medida que avanzas, te das cuenta de que se queda en la superficie',
//         new Date().toLocaleDateString()
//       ),
//       new Valoracion(
//         undefined,
//         undefined,
//         'bilardo.jpg',
//         5,
//         'No sabía que estaba a punto de vivir una experiencia literaria tan profunda y reveladora. Desde la primera página, me atrapó con su narrativa tan envolvente que, honestamente, me fue imposible soltarlo. La forma en que el autor entrelaza las historias y los personajes es pura magia. Cada capítulo te sumerge en un universo único, donde las emociones se sienten tan reales que puedes casi tocarlas.',
//         new Date().toLocaleDateString()
//       )
//     ],
//     '8hs'
//   ),
//   new Recomendacion(
//     2,
//     // usuarios[3].id,
//     'Recomendación Misteriosa',
//     true,
//     '"Espero que te guste este conjunto de libros de misterios de Agatha Christie"',
//     [libros[4], libros[5], libros[6]],
//     [
//       new Valoracion(
//         undefined,
//         undefined,
//         'bilardo.jpg',
//         4.5,
//         'Si partimos de la base de donde estábamos parados, y dentro de la confrontación que hubo en determinadas situaciones sociales, donde el marco y el contexto iban avalando las realidades que suceden dentro de determinados organismos, lo principal y fundamental es trabajar en medidas a corto y mediano plazo que puedan satisfacer las necesidades de todo tipo, si esto sucede así, ¿no?',
//         new Date().toLocaleDateString()
//       )
//     ],
//     //['Los cuatro grandes', 'Asesinato en el Orient Express', 'Muerte en el Nilo'],
//     '12hs'
//   ),
//   new Recomendacion(
//     3,
//     // usuarios[3].id,
//     'Clásicos!',
//     false,
//     '"Te dejo una lista de libros clásicos que TENES que leer"',
//     [libros[7], libros[8], libros[1]],
//     //['Jane Eyre', 'El Principito', 'Don Quijote de la Mancha'],
//     [
//       new Valoracion(
//         undefined,
//         undefined,
//         'bilardo.jpg',
//         4.5,
//         'Si partimos de la base de donde estábamos parados, y dentro de la confrontación que hubo en determinadas situaciones sociales, donde el marco y el contexto iban avalando las realidades que suceden dentro de determinados organismos, lo principal y fundamental es trabajar en medidas a corto y mediano plazo que puedan satisfacer las necesidades de todo tipo, si esto sucede así, ¿no?',
//         new Date().toLocaleDateString()
//       )
//     ],
//     '18hs'
//   ),
//   new Recomendacion(
//     4,
//     // usuarios[4].id,
//     'Jane Austen <3',
//     false,
//     '"Mejores libros de esta hermosa escritora. Romance"',
//     [libros[9], libros[10], libros[11], libros[13]],
//     //['Orgullo y Prejuicio', 'Emma', 'Persuación', 'Sentido y sensiblidad'],
//     [
//       new Valoracion(
//         undefined,
//         undefined,
//         'bilardo.jpg',
//         4.5,
//         'Si partimos de la base de donde estábamos parados, y dentro de la confrontación que hubo en determinadas situaciones sociales, donde el marco y el contexto iban avalando las realidades que suceden dentro de determinados organismos, lo principal y fundamental es trabajar en medidas a corto y mediano plazo que puedan satisfacer las necesidades de todo tipo, si esto sucede así, ¿no?',
//         new Date().toLocaleDateString()
//       )
//     ],
//     '25hs'
//   ),
//   new Recomendacion(
//     5,
//     // usuarios[2].id,
//     'Mitología Griega',
//     true,
//     'Estos libros son reversiones de historias clásicas de la mitología griega. Muy entretenidos',
//     [libros[14], libros[15], libros[16], libros[17]],
//     //['La canción de Aquiles', 'Circe', 'Medusa', 'Mientras no tengamos rostro'],
//     [
//       new Valoracion(
//         undefined,
//         undefined,
//         'bilardo.jpg',
//         4.5,
//         'Si partimos de la base de donde estábamos parados, y dentro de la confrontación que hubo en determinadas situaciones sociales, donde el marco y el contexto iban avalando las realidades que suceden dentro de determinados organismos, lo principal y fundamental es trabajar en medidas a corto y mediano plazo que puedan satisfacer las necesidades de todo tipo, si esto sucede así, ¿no?',
//         new Date().toLocaleDateString()
//       )
//     ],
//     '19hs'
//   ),
//   new Recomendacion(
//     6,
//     // usuarios[3].id,
//     'Fantasía',
//     false,
//     'Estos libros son el comienzo de sagas que te van a dejar maravillado y con ganas de estar dentro de ese mundo',
//     [libros[18], libros[19], libros[12]],
//     //['Percy Jackson y el ladrón del rayo', 'Harry Potter y la piedra filosofal', 'Eragon'],
//     [
//       new Valoracion(
//         undefined,
//         undefined,
//         'bilardo.jpg',
//         4.5,
//         'Si partimos de la base de donde estábamos parados, y dentro de la confrontación que hubo en determinadas situaciones sociales, donde el marco y el contexto iban avalando las realidades que suceden dentro de determinados organismos, lo principal y fundamental es trabajar en medidas a corto y mediano plazo que puedan satisfacer las necesidades de todo tipo, si esto sucede así, ¿no?',
//         new Date().toLocaleDateString()
//       )
//     ],
//     '8hs'
//   )
// ]
