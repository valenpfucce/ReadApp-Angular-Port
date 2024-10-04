import { Entidad } from "./entidad";
import { Usuario } from "./usuario";

export class Valoracion implements Entidad {
    constructor(
      public id : number,
      //public user : Usuario,   //<- CUANDO BORREMOS LO DE ABAJO ESTO HAY QUE PONERLO
      public img_perfil: string, //<- ESTO HABRA QUE BORRARLO UNA VEZ ESTE IMPLEMENTADO CON EL USER
      public nombre: string,     //<- ESTO HABRA QUE BORRARLO UNA VEZ ESTE IMPLEMENTADO CON EL USER
      public fecha: string,
      public detalle: string,
      public valoracion: number
    ) {}
  }
  