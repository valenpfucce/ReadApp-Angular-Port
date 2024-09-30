import { Injectable } from '@angular/core';
import { recomendaciones } from '../../mocks/mock_recomendaciones';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {

  constructor() { }

  listar_recomendaciones(){
    return recomendaciones
  }
}
