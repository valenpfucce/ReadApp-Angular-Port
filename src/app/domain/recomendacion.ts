import { Entidad } from "./entidad";
import { Libro } from './libro'
import { Valoracion } from './valoracion'

export type RecomendacionJSON = {
  id?: number,
  creadorId?: number,
  titulo?: string,
  esPublica?: boolean,
  descripcion?: string,
  lista_libros?: Libro[],
  valoraciones?: Valoracion[],
  puedeEditar?: Boolean,
  puedeValorar?: Boolean,
  avgValoraciones?: number,
  tiempoLectura?: number
}

export class Recomendacion implements Entidad, RecomendacionJSON {
  public id: number = -1
  public creadorId: number = -1
  public titulo: string =""
  public esPublica: boolean = false
  public descripcion: string = ""
  public lista_libros: Libro[] = []
  public valoraciones: Valoracion[] = []
  public puedeEditar: boolean = false
  public puedeValorar: boolean = false
  public avgValoraciones?: number
  public tiempoLectura?: number

  constructor(props?: RecomendacionJSON) {
    Object.assign(this, props)
  }

  static fromJson(recomendacionJSON: RecomendacionJSON): Recomendacion {
    return Object.assign(new Recomendacion(recomendacionJSON), recomendacionJSON, {
      avgValoraciones: recomendacionJSON.avgValoraciones && !isNaN(recomendacionJSON.avgValoraciones)
        ? recomendacionJSON.avgValoraciones
        : 0
    })
  }
}
