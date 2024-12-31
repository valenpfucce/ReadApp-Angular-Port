
export class Valoracion {
  constructor(
    public creador_nombre: string,
    public creador_apellido: string,
    public img_perfil: string,
    public valor: number,
    public comentario: string,
    public fecha: string
  ) {}

}

export class ValoracionDTO {
  constructor(
    public creadorId: number,
    public valor: number,
    public comentario: string,
  ) {}

}
