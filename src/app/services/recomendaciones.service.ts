import { Injectable } from '@angular/core';
import { cardsRecomendaciones } from '../mocks/mock_recomendaciones';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {

  constructor() { }

  ddd(){
    return cardsRecomendaciones
  }
}
