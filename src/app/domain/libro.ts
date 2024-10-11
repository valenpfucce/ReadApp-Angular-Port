import { Entidad } from "./entidad";


export type LibroJSON = {
  id: number,
  titulo_libro: string,
  autor_libro: string,
  imagen_libro_url : string,
  cant_pags_libro: string,
  cant_palabras_libro: string,
}

export class Libro implements Entidad {
    constructor(
      public id: number,
      public titulo_libro: string,
      public autor_libro: string,
      public imagen_libro_url: string,
      public cant_pags_libro: number,
      public cant_palabras_libro: number,
      public idiomas_libro: string[],
      public ventas_semanales: number
    ){}
}
