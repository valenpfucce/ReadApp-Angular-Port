import { Entidad } from './entidad'

export type LibroJSON = {
  id: number
  titulo_libro: string
  autor_nombre: string
  autor_apellido: string
  imagen_libro_url: string
  cant_pags_libro: number
  cant_palabras_libro: number
  idiomas_libro: string[]
  ventas_semanales: number
  esBestSeller: Boolean
  esDesafiante: Boolean
  esLargo: Boolean
  paginasLargo: number
}

export class Libro {
  constructor(
    public id: number,
    public titulo_libro: string,
    public autor_nombre: string,
    public autor_apellido: string,
    public imagen_libro_url: string,
    public cant_pags_libro: number,
    public cant_palabras_libro: number,
    public idiomas_libro: string[],
    public ventas_semanales: number,
    public esBestSeller: Boolean,
    public esDesafiante: Boolean,
    public esLargo: Boolean,
    public paginasLargo: number
  ) {}

  static fromJson(libroJSON: LibroJSON): Libro {
    return Object.assign(
      new Libro(
        libroJSON.id,
        libroJSON.titulo_libro,
        libroJSON.autor_nombre,
        libroJSON.autor_apellido,
        libroJSON.imagen_libro_url,
        libroJSON.cant_pags_libro,
        libroJSON.cant_palabras_libro,
        libroJSON.idiomas_libro,
        libroJSON.ventas_semanales,
        libroJSON.esBestSeller,
        libroJSON.esDesafiante,
        libroJSON.esLargo,
        libroJSON.paginasLargo
      ),
      libroJSON,
      {}
    )
  }

  // Nuevo método para transformar los datos del backend
  static fromBackend(libroBackend: any): Libro {
    const libroJSON: LibroJSON = {
      id: libroBackend.id,
      titulo_libro: libroBackend.titulo, // Mapeo de 'titulo' a 'titulo_libro'
      autor_nombre: libroBackend.autor?.nombre, // Mapeo de 'autor.nombre' a 'autor_nombre'
      autor_apellido: libroBackend.autor?.apellido, // Mapeo de 'autor.apellido' a 'autor_apellido'
      imagen_libro_url: libroBackend.imagen, // Mapeo de 'imagen' a 'imagen_libro_url'
      cant_pags_libro: libroBackend.paginas, // Mapeo de 'paginas' a 'cant_pags_libro'
      cant_palabras_libro: libroBackend.palabras, // Mapeo de 'palabras' a 'cant_palabras_libro'
      idiomas_libro: libroBackend.traducciones, // Mapeo de 'traducciones' a 'idiomas_libro'
      ventas_semanales: libroBackend.ventasSemanales, // Mapeo de 'ventasSemanales' a 'ventas_semanales'
      esBestSeller: false, // Suponiendo que no está disponible en el backend
      esDesafiante: libroBackend.complejo, // Mapeo de 'complejo' a 'esDesafiante'
      esLargo: false, // No disponible en el backend, puedes ajustarlo según sea necesario
      paginasLargo: libroBackend.paginasLargo // Mapeo directo de 'paginasLargo'
    }

    // Llama al método `fromJson` para hacer la conversión
    return Libro.fromJson(libroJSON)
  }
}
