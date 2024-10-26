import { Entidad } from "./entidad";
import {Libro, LibroJSON} from './libro'
import { Valoracion } from './valoracion'

export type RecomendacionJSON = {
  id: number,
  creadorId: number,
  titulo: string,
  esPublica: boolean,
  descripcion: string,
  lista_libros: Libro[],
  valoraciones: Valoracion[],
  puedeEditar?: Boolean,
  puedeValorar?: Boolean,
  avgValoraciones?: number,
  tiempoLectura?: number
}

export class Recomendacion implements Entidad {
  //props: RecomendacionJSON
  constructor(
    public id: number = -1,
    public creadorId: number = -1,
    public titulo: string ="",
    public esPublica: boolean = false,
    public descripcion: string = "",
    public lista_libros: Libro[] = [],
    public valoraciones: Valoracion[] = [],
    public puedeEditar?: Boolean,
    public puedeValorar?: Boolean,
    public avgValoraciones?: number,
    public tiempoLectura?: number
  ) {}


  static fromJson(recomendacionJSON: RecomendacionJSON): Recomendacion {
    return Object.assign(new Recomendacion(), recomendacionJSON, {
      avgValoraciones: recomendacionJSON.avgValoraciones && !isNaN(recomendacionJSON.avgValoraciones)
        ? recomendacionJSON.avgValoraciones
        : 0
    })
  }

  toJSON(): RecomendacionJSON {
    return {
      id: this.id,
      creadorId: this.creadorId,
      titulo: this.titulo,
      esPublica: this.esPublica,
      descripcion: this.descripcion,
      lista_libros: this.lista_libros,
      valoraciones: this.valoraciones,
      avgValoraciones: this.avgValoraciones,
      tiempoLectura: this.tiempoLectura
    }
  }
}
