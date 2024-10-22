import { Injectable } from '@angular/core'
import { Libro, LibroJSON } from '../../domain/libro'
import {HttpClient, HttpParams} from '@angular/common/http'
import { lastValueFrom, Observable } from 'rxjs'
import { REST_SERVER_URL } from '../configuration'

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  constructor(private httpClient: HttpClient) {}

  async busquedaLibros(busqueda: string = ""): Promise<Libro[]> {
    try {
      let params = new HttpParams().append('busqueda', busqueda)
      const librosJSON = await lastValueFrom(
        this.httpClient.get<LibroJSON[]>(
          `${REST_SERVER_URL}/libros/busqueda`,
          {params}
        )
      )
      return librosJSON.map((libroJSON) => Libro.fromJson(libroJSON))
    } catch (error) {
      throw new Error('No se pudieron cargar los libros')
    }
  }

  async agregarALibrosLeidos(libroId: number, userId: number) {
    await lastValueFrom(
      this.httpClient.patch(
        `${REST_SERVER_URL}/${userId}/agregar-libro/${libroId}`,
        {}
      )
    )
  }


  

  async agregarLibrosPorLeer(
    userId: number,
    librosIds: number[]
  ): Promise<any> {
    const url = `${REST_SERVER_URL}/libros/${userId}/agregar-libros`

    try {
      const response = await lastValueFrom(
        this.httpClient.patch(url, librosIds)
      )
      return response
    } catch (error) {
      console.error('Error al agregar libros:', error)
      throw error // Puedes lanzar el error o manejarlo de acuerdo a tus necesidades
    }
  }

}
