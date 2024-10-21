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
  static fromBackend(libroBackend: any): Libro {
    const libroJSON: LibroJSON = {
      id: libroBackend.id,
      titulo_libro: libroBackend.titulo,
      autor_nombre: libroBackend.autor?.nombre,
      autor_apellido: libroBackend.autor?.apellido,
      imagen_libro_url: libroBackend.imagen,
      cant_pags_libro: libroBackend.paginas,
      cant_palabras_libro: libroBackend.palabras,
      idiomas_libro: libroBackend.traducciones,
      ventas_semanales: libroBackend.ventasSemanales,
      esBestSeller: false,
      esDesafiante: libroBackend.complejo,
      esLargo: false,
      paginasLargo: libroBackend.paginasLargo
    }
    return Libro.fromJson(libroJSON)
  }
}
