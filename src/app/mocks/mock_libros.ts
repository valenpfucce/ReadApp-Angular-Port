import { Libro } from "../domains/libro";

export const libros = [
    new Libro(
      1,
      'The Book of Bill',
      'Alex Hirsch',
      '/imagenes/prueba.jpg',
      45,
      1805,
      ['Español', 'Inglés', 'Mandarín', 'Árabe'],
      1055584
    ),
    new Libro(
      2,
      'Don Quijote de la mancha',
      'Miguel de Cervantes',
      'https://www.planetalector.com/usuaris/thumbnails/libros/fotos/374/360/portada_don-quijote-de-la-mancha-comic_miguel-de-cervantes_202310231106.jpg',
      102,
      60504,
      ['Español', 'Inglés'],
      9802
    ),
    new Libro(
      3,
      "I'm Glad My Mom Died",
      'Janette McCurdy',
      'https://upload.wikimedia.org/wikipedia/en/2/2a/I%27m_Glad_My_Mom_Died_Cover.png',
      160,
      25005,
      ['Ingles', 'Español', 'Portugues', 'Francés'],
      1250000
    )
    // new Libro(
    //   4,
    //   'Cuidado con el perro',
    //   'Liliana Cinetto'
    //   'https://www.loqueleo.com/ar/uploads/2015/11/9789504633440.jpg',
    // )
  ]