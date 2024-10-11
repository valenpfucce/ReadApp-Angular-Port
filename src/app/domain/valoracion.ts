import { Entidad } from './entidad'
import { Usuario } from './usuario'
import dayjs from 'dayjs'

export type ValoracionJSON = {
  creador_nombre: string,
  creador_apellido: string,
  img_perfil: string,
  valor : number,
  comentario: string,
  fecha: Date
}

export class Valoracion {
  constructor(
    public creador_nombre: string,
    //public user : Usuario,   //<- CUANDO BORREMOS LO DE ABAJO ESTO HAY QUE PONERLO
    public creador_apellido: string, //<- ESTO HABRA QUE BORRARLO UNA VEZ ESTE IMPLEMENTADO CON EL USER
    public img_perfil: string, //<- ESTO HABRA QUE BORRARLO UNA VEZ ESTE IMPLEMENTADO CON EL USER
    public valor: number,
    public comentario: string,
    public fecha: string
  ) {}

  static fromJson(valoracionJSON: ValoracionJSON): Valoracion {
    // @ts-ignore
    return Object.assign(new Valoracion(), valoracionJSON, {})
  }
}
