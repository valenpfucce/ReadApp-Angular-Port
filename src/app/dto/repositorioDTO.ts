import {Recomendacion} from "../domain/recomendacion";

export class RecomendacionUpdateDTO{
  constructor(
    public id: number,
    public creadorId: number,
    public titulo: string,
    public esPublica: boolean,
    public descripcion: string,
    public lista_libros: number[]
  ){}

  static toJson(recomendacion: Recomendacion): RecomendacionUpdateDTO {
    return new RecomendacionUpdateDTO(
      recomendacion.id,
      recomendacion.creadorId,
      recomendacion.titulo,
      recomendacion.esPublica,
      recomendacion.descripcion,
      recomendacion.lista_libros.map(libro => libro.id)
    );
  }

}
