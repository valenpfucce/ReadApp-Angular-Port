import { Entidad } from "./entidad";
import { Libro } from './libro'
import { Valoracion } from './valoracion'


export type RecomendacionJSON = {
  id: number,
  creadorId: number,
  titulo: string,
  publica: boolean,
  descripcion: string,
  lista_libros: Libro[],
  valoraciones: Valoracion[],
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
    public lista_libros: Libro[],  // Ya no es un string, sino un arreglo de Libro
    public valoraciones: Valoracion[],  // Ya no es un string, sino un arreglo de Valoracion
    public tiempoLectura?: number,
    public avgValoraciones?: number
  ) {}

  // static fromJson(recomendacionJSON: RecomendacionJSON): Recomendacion {
  //   // Inicializa listaLibros como un arreglo vacío
  //   const listaLibros: Libro[] = (recomendacionJSON.lista_libros && Array.isArray(recomendacionJSON.lista_libros))
  //     ? recomendacionJSON.lista_libros.map((libroJSON: LibroJSON) => Libro.fromJson(libroJSON))
  //     : [];
  //
  //   // Inicializa valoraciones como un arreglo vacío
  //   const valoraciones: Valoracion[] = (recomendacionJSON.valoraciones && Array.isArray(recomendacionJSON.valoraciones))
  //     ? recomendacionJSON.valoraciones.map((valoracionJSON: ValoracionJSON) => Valoracion.fromJson(valoracionJSON))
  //     : [];
  //
  //   console.log("fromJSON")
  //   return new Recomendacion(
  //     recomendacionJSON.id,
  //     recomendacionJSON.creadorId,
  //     recomendacionJSON.titulo,
  //     recomendacionJSON.publica,
  //     recomendacionJSON.descripcion,
  //     listaLibros,
  //     valoraciones,
  //     recomendacionJSON.tiempoLectura,
  //     recomendacionJSON.avgValoraciones
  //   );
  // }

  static fromJson(data: any): Recomendacion {
      const libros = data.libros.map((libroData: any) =>
        new Libro(
          libroData.id,
          libroData.titulo_libro,
          libroData.autor_nombre,
          libroData.autor_apellido,
          libroData.imagen_libro_url,
          libroData.cant_pags_libro,
          libroData.cant_palabras_libro,
          libroData.idiomas_libro,
          libroData.ventas_semanales,
          libroData.esBestSeller,
          libroData.esDesafiante,
          libroData.esLargo,
          libroData.paginasLargo
        )
      );

    const valoraciones = data.valoraciones.map((valoracionData: any) =>
      new Valoracion(
        valoracionData.creador_nombre,
        valoracionData.creador_apellido,
        valoracionData.img_perfil,
        valoracionData.valor,
        valoracionData.comentario,
        valoracionData.fecha
      )
    );

      return new Recomendacion(
        data.id,
        data.creadorId,
        data.titulo,
        data.publica,
        data.descripcion,
        libros,
        valoraciones,
        data.avgValoraciones
      );
    }
}


