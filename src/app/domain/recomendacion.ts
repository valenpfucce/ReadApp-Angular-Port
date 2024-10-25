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
    return Object.assign(new Recomendacion(), recomendacionJSON, {})
  }

  // static fromJson(data: any): Recomendacion {
  //     const libros = data.libros.map((libroData: any) =>
  //       new Libro(
  //         libroData.id,
  //         libroData.titulo_libro,
  //         libroData.autor_nombre,
  //         libroData.autor_apellido,
  //         libroData.imagen_libro_url,
  //         libroData.cant_pags_libro,
  //         libroData.cant_palabras_libro,
  //         libroData.idiomas_libro,
  //         libroData.ventas_semanales,
  //         libroData.esBestSeller,
  //         libroData.esDesafiante,
  //         libroData.esLargo,
  //         libroData.paginasLargo
  //
  //       )
  //     );
  //
  //   const valoraciones = data.valoraciones.map((valoracionData: any) =>
  //     new Valoracion(
  //       valoracionData.creador_nombre,
  //       valoracionData.creador_apellido,
  //       valoracionData.img_perfil,
  //       valoracionData.valor,
  //       valoracionData.comentario,
  //       valoracionData.fecha
  //     )
  //   );
  //
  //     return new Recomendacion(data.id, data.creadorId, data.titulo, data.esPublica, data.descripcion, libros, valoraciones, isNaN(data.avgValoraciones) ? 0 : data.avgValoraciones);
  //   }

  toJSON(): RecomendacionJSON {
    return {
      id: this.id,
      creadorId : this.creadorId,
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


