import { Entidad } from './entidad'
import { Usuario } from './usuario'
import dayjs from 'dayjs'

export class Valoracion {
  constructor(
    public creador_nombre: string,
    public creador_apellido: string, //<- ESTO HABRA QUE BORRARLO UNA VEZ ESTE IMPLEMENTADO CON EL USER
    public img_perfil: string, //<- ESTO HABRA QUE BORRARLO UNA VEZ ESTE IMPLEMENTADO CON EL USER
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
