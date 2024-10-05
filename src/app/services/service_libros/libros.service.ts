import { Injectable } from '@angular/core';
import { libros } from '../../mocks/mock_libros';
import { Libro } from '../../domain/libro';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  listaLibrosService = libros
  constructor() { }

  listar_libros() : Libro[] {
    return this.listaLibrosService
  }

  getLibro(id: number) {
    return this.listaLibrosService.find(libro => libro.id === id)
  }
}
