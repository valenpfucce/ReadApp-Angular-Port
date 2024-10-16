import { Injectable } from '@angular/core'
import { Libro, LibroJSON } from '../../domain/libro'
import { HttpClient } from '@angular/common/http'
import { lastValueFrom } from 'rxjs'
import { REST_SERVER_URL } from '../configuration'

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  constructor(private httpClient: HttpClient) {}

  async busquedaLibros(busqueda?: string): Promise<Libro[]> {
    try {
      const librosJSON = await lastValueFrom(
        this.httpClient.post<LibroJSON[]>(`${REST_SERVER_URL}/libros/busqueda`, busqueda)
      )
      return librosJSON.map((libroJSON) => Libro.fromJson(libroJSON))
    } catch (error) {
      throw new Error('No se pudieron cargar los libros')
    }
  }

  async agregarALibrosLeidos(libroId: number, userId: number) {
    await lastValueFrom(
    this.httpClient.post(`${REST_SERVER_URL}/${userId}/agregar-libro/${libroId}`, {})
    );
  }

}
