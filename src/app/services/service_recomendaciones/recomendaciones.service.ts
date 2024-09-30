import { Injectable } from '@angular/core';
import { recomendaciones } from '../../mocks/mock_recomendaciones';

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

  busquedaMisRecomendaciones(palabraABuscar?: string){
    return this.listaRecomendaciones.filter(recomendacion => recomendacion.propia)
  }
}
