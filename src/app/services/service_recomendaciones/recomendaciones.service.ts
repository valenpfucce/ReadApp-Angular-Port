import { Injectable } from '@angular/core';
import { recomendaciones } from '../../mocks/mock_recomendaciones';
import { Usuario } from '../../domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {
  listaRecomendaciones = recomendaciones
  constructor() { }

  listar_recomendaciones(){
    return this.listaRecomendaciones
  }

  getRecomendacion(id: number) {
    return this.listaRecomendaciones.find(recomendacion => recomendacion.id === id)
  }

  busquedaGeneral(palabraABuscar?: string){
    return this.listaRecomendaciones
  }

  busquedaMisRecomendaciones(palabraABuscar?: string, idUsuario?: Number){
    return this.listaRecomendaciones /*.filter(recomendacion => recomendacion.creadorId == idUsuario)*/
  }
}
