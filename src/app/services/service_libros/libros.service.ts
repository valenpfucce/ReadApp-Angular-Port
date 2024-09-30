import { Injectable } from '@angular/core';
import { libros } from '../../mocks/mock_libros';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  constructor() { }

  listar_libros(){
    return libros
  }
}
