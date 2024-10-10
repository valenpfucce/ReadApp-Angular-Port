import { Entidad } from "./entidad";
import { Libro } from "./libro";
import { Valoracion } from "./valoracion";


export type RecomendacionJSON = {
  id: number,
  creadorId: number, //NO DEBERIA TRAER EL CREADOR ID, CHEQUEAR EN EL BACK
  titulo: string,
  publica: boolean,
  descripcion: string,
  lista_libros: string[],
  valoraciones: string[]
}

export class Recomendacion implements Entidad{
    constructor(
      public id: number,
      public creadorId : number,
      public titulo: string,
      public publica: boolean,
      public descripcion: string,
      public lista_libros: Libro[],
      public valoraciones: Valoracion[],
      public tiempoLectura?: string
    ){}

    promedioValoraciones(){
        return this.valoraciones.length === 0
            ? 0
            : (this.valoraciones.map(valoracion => valoracion.valoracion).reduce((a, b) => a + b, 0) / this.valoraciones.length).toFixed(1);
    }

  static fromJson(recomendacionJSON: RecomendacionJSON): Recomendacion {
    // @ts-ignore
    return Object.assign(new Recomendacion(), recomendacionJSON, {
      lista_libros: recomendacionJSON.lista_libros
        ?
      // asignatario: tareaJSON.asignadoA
      //   ? Usuario.fromJSON(tareaJSON.asignadoA)
      //   : undefined,
      // fecha: tareaJSON.fecha
      //   ? DateTime.fromFormat(tareaJSON.fecha, FORMATO_FECHA).toJSDate()
      //   : undefined
    })
  }

}

