import { Entidad } from "./entidad";
import { Libro, LibroJSON } from './libro'
import { Valoracion, ValoracionJSON } from './valoracion'


export type RecomendacionJSON = {
  id: number,
  creadorId: number,
  titulo: string,
  publica: boolean,
  descripcion: string,
  lista_libros: LibroJSON[],
  valoraciones: ValoracionJSON[],
  tiempoLectura: number,
  avgValoraciones: number
}

export class Recomendacion implements Entidad {
  constructor(
    public id: number,
    public creadorId: number,
    public titulo: string,
    public publica: boolean,
    public descripcion: string,
    public lista_libros: Libro[],
    public valoraciones: Valoracion[],
    public tiempoLectura?: number,
    public avgValoraciones?: number
  ) {}

  // static fromJson(recomendacionJSON: RecomendacionJSON): Recomendacion {
  //
  //   // @ts-ignore
  //   return Object.assign(new Recomendacion(), recomendacionJSON, {
  //     lista_libros: recomendacionJSON.lista_libros
  //     ? JSON.parse(recomendacionJSON.lista_libros)
  //       : undefined,
  //     // asignatario: tareaJSON.asignadoA
  //     //   ? Usuario.fromJSON(tareaJSON.asignadoA)
  //     //   : undefined,
  //     // fecha: tareaJSON.fecha
  //     //   ? DateTime.fromFormat(tareaJSON.fecha, FORMATO_FECHA).toJSDate()
  //     //   : undefined
  //   })
  // }

  static fromJson(recomendacionJSON: RecomendacionJSON): Recomendacion {
    const listaLibros: Libro[] = recomendacionJSON.lista_libros.map(libroJSON => Libro.fromJson(libroJSON));

    const valoraciones: Valoracion[] = recomendacionJSON.valoraciones.map(valoracion => Valoracion.fromJson(valoracion));

    return new Recomendacion(
      recomendacionJSON.id,
      recomendacionJSON.creadorId,
      recomendacionJSON.titulo,
      recomendacionJSON.publica,
      recomendacionJSON.descripcion,
      listaLibros,
      valoraciones,
      recomendacionJSON.tiempoLectura,
      recomendacionJSON.avgValoraciones
    );
  }
}

