import { Entidad } from "./entidad";
import { Libro } from "./libro";
import { Valoracion } from "./valoracion";

export class Recomendacion implements Entidad{
    constructor(
      public id: number,
      public titulo: string,
      public propia: boolean,
      public descripcion: string,
      public lista_libros: Libro[],
      public valoraciones: Valoracion[],
      public tiempoLectura: string
    ){}

    promedioValoraciones(){
        return this.valoraciones.length === 0 
            ? 0 
            : (this.valoraciones.map(valoracion => valoracion.valoracion).reduce((a, b) => a + b, 0) / this.valoraciones.length).toFixed(1);
    }

}