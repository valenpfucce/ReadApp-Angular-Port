import { Entidad } from './entidad'

export type LibroJSON = {
  id: number
  titulo_libro: string
  autor_nombre: string,
  autor_apellido: string,
  imagen_libro_url: string
  cant_pags_libro: number
  cant_palabras_libro: number
  idiomas_libro: string[]
  ventas_semanales: number
}

export class Libro implements Entidad {
  constructor(
    public id: number,
    public titulo_libro: string,
    public autor_nombre: string,
    public autor_apellido: string,
    public imagen_libro_url: string,
    public cant_pags_libro: number,
    public cant_palabras_libro: number,
    public idiomas_libro: string[],
    public ventas_semanales: number
  ) {}

  static fromJson(libroJSON: LibroJSON): Libro {
    // @ts-ignore
    return Object.assign(new Libro(), libroJSON, {})
  }
}
