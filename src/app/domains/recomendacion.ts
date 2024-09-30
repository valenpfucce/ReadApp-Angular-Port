import { Entidad } from "./entidad";
import { Libro } from "./libro";

export class Recomendacion implements Entidad{
    constructor(
      public id: number,
      public titulo: string,
      public propia: boolean,
      public descripcion: string,
      //public lista_libros: string[],
      public lista_libros: Libro[],
      public valoracion: number,
      public tiempoLectura: string
    ){}
}