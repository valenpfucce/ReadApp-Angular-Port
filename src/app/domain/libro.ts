

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
    public id: number = -1,
    public titulo_libro: string = "",
    public autor_nombre: string = "",
    public autor_apellido: string = "",
    public imagen_libro_url: string = "",
    public cant_pags_libro: number = -1,
    public cant_palabras_libro: number = -1,
    public idiomas_libro: string[] = [],
    public ventas_semanales: number = -1,
    public esBestSeller: Boolean = false,
    public esDesafiante: Boolean = false,
    public esLargo: Boolean = false,
    public paginasLargo: number = -1
  ) {}

  static fromJson(libroJSON: LibroJSON): Libro {
    return Object.assign(
      new Libro(), libroJSON, {}
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
