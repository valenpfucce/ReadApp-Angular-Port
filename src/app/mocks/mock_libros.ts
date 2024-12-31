// import { Libro } from "../domain/libro";

// export const libros = [
//     new Libro(
//       1,
//       'The Book of Bill',
//       'Alex Hirsch',
//       '/imagenes/prueba.jpg',
//       45,
//       1805,
//       ['Español', 'Inglés', 'Mandarín', 'Árabe'],
//       1055584
//     ),
//     new Libro(
//       2,
//       'Don Quijote de la Mancha',
//       'Miguel de Cervantes',
//       'https://www.planetalector.com/usuaris/thumbnails/libros/fotos/374/360/portada_don-quijote-de-la-mancha-comic_miguel-de-cervantes_202310231106.jpg',
//       920,
//       120298,
//       ['Español', 'Inglés'],
//       13029
//     ),
//     new Libro(
//       3,
//       "I'm Glad My Mom Died",
//       'Janette McCurdy',
//       'https://upload.wikimedia.org/wikipedia/en/2/2a/I%27m_Glad_My_Mom_Died_Cover.png',
//       160,
//       25005,
//       ['Ingles', 'Español', 'Portugues', 'Francés'],
//       1250000
//     ),
//     new Libro(
//       4,
//       'Cuidado con el perro',
//       'Liliana Cinetto',
//       'https://www.loqueleo.com/ar/uploads/2015/11/9789504633440.jpg',
//       120,
//       20000,
//       ['Español', 'Inglés', 'Portugués'],
//       3000
//     ),
//     new Libro(
//       5,
//       'Los cuatro grandes',
//       'Agatha Christie',
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlA2blkm3WtOYXx59QXWI0e_VBV5rjJIQ5-Q&s',
//       256,
//       45245,
//       ['Español', 'Inglés', 'Portugués', 'Francés', 'Mandarín'],
//       7800
//     ),
//     new Libro(
//       6,
//       'Asesinato en el Orient Express',
//       'Agatha Christie',
//       'https://images.cdn1.buscalibre.com/fit-in/360x360/2f/e4/2fe487d9fe7072bfc1a4f419964b0c0a.jpg',
//       248,
//       40789,
//       ['Español', 'Inglés', 'Portugués', 'Francés'],
//       15790
//     ),
//     new Libro(
//       7,
//       'Muerte en el Nilo',
//       'Agatha Christie',
//       'https://proassetspdlcom.cdnstatics2.com/usuaris/libros/fotos/201/original/portada_muerte-en-el-nilo_agatha-christie_201505291004.jpg',
//       344,
//       50935,
//       ['Español', 'Inglés', 'Portugués', 'Francés'],
//       6200
//     ),
//     new Libro(
//       8,
//       'Jane Eyre',
//       'Charlotte Brontë',
//       'https://m.media-amazon.com/images/I/81Zs-tJ6N0L._SY522_.jpg',
//       632,
//       93050,
//       ['Español', 'Inglés', 'Portugués', 'Francés', 'Mandarín'],
//       14300
//     ),
//     new Libro(
//       9,
//       'El Principito',
//       ' Antoine De Saint-Exupery',
//       'https://m.media-amazon.com/images/I/71Ime1IrO3L._SY522_.jpg',
//       144,
//       27800,
//       ['Español', 'Inglés', 'Portugués','Francés','Mandarín','Árabe'],
//       25400
//     ),
//     new Libro(
//       10,
//       'Orgullo y Prejuicio',
//       'Jane Austen',
//       'https://m.media-amazon.com/images/I/71snWNh97JL._SY522_.jpg',
//       448,
//       69803,
//       ['Español', 'Inglés', 'Portugués','Francés'],
//       32600
//     ),
//     new Libro(
//       11,
//       'Emma',
//       'Jane Austen',
//       'https://m.media-amazon.com/images/I/61LNPggwz0L._SY522_.jpg',
//       512,
//       83022,
//       ['Español', 'Inglés', 'Portugués','Francés'],
//       26794
//     ),
//     new Libro(
//       12,
//       'Persuación',
//       'Jane Austen',
//       'https://m.media-amazon.com/images/I/61G4+n0K+0L._SY522_.jpg',
//       150,
//       35207,
//       ['Español', 'Inglés', 'Portugués','Francés'],
//       12480
//     ),
//     new Libro(
//       13,
//       'Eragon',
//       'Christopher Paolini',
//       'https://images.cdn1.buscalibre.com/fit-in/360x360/33/6e/336ee8f85de8a52fb119ac103f13fe03.jpg',
//       656,
//       50281,
//       ['Español', 'Inglés', 'Portugués','Francés'],
//       13029
//     ),
//     new Libro(
//       14,
//       'Sentido y sensibilidad',
//       'Jane Austen',
//       'https://m.media-amazon.com/images/I/61r-OTBq-mL._SL1216_.jpg',
//       376,
//       50328,
//       ['Español', 'Inglés', 'Portugués','Francés'],
//       9103
//     ),
//     new Libro(
//       15,
//       'La canción de Aquiles',
//       'Madeline Miller',
//       'https://images.cdn3.buscalibre.com/fit-in/360x360/a2/4e/a24e1d213892418e4ba12d4edceb8a96.jpg',
//       392,
//       54278,
//       ['Español', 'Inglés', 'Portugués','Francés'],
//       14782
//     ),
//     new Libro(
//       16,
//       'Circe',
//       'Madeline Miller',
//       'https://haverhillpl.org/wp-content/uploads/2021/06/51dzuwLmm-L.jpg',
//       440,
//       56291,
//       ['Español', 'Inglés', 'Portugués','Francés'],
//       18299
//     ),
//     new Libro(
//       17,
//       'Medusa',
//       'Jessie Burton',
//       'https://http2.mlstatic.com/D_NQ_NP_608521-MLA69549461173_052023-O.webp',
//       224,
//       18920,
//       ['Español', 'Inglés', 'Portugués','Francés'],
//       7290
//     ),
//     new Libro(
//       18,
//       'Las mujeres de Troya',
//       'Pat Barker',
//       'https://http2.mlstatic.com/D_NQ_NP_884346-MLA53624916554_022023-O.webp',
//       340,
//       35208,
//       ['Español', 'Inglés', 'Portugués','Francés'],
//       9200
//     ),
//     new Libro(
//       19,
//       'Percy Jackson y el ladrón del rayo',
//       'Rick Riordan',
//       'https://d22fxaf9t8d39k.cloudfront.net/e76e5a7e8259c2ee382859dcb1b31b4c503aee32146f1eedb7fd952b28495b44167807.png',
//       288,
//       29182,
//       ['Español', 'Inglés', 'Portugués','Francés'],
//       20340
//     ),
//     new Libro(
//       20,
//       'Harry Potter y la pidra filosofal',
//       'J.K. Rowling',
//       'https://images.cdn3.buscalibre.com/fit-in/360x360/ce/e6/cee6ef96dad70d3f599b953f0e50afc7.jpg',
//       255,
//       23281,
//       ['Español', 'Inglés', 'Portugués','Francés'],
//       43000
//     )
//   ]
