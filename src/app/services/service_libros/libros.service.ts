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

  async getLibros(): Promise<Libro[]> {
    try {
      const librosJSON = await lastValueFrom(
        this.httpClient.get<LibroJSON[]>(`${REST_SERVER_URL}/libros`)
      )
      console.log('Libros traídos del backend:', librosJSON)
      return librosJSON.map((libroJSON) => Libro.fromJson(libroJSON))
      // (libroData) =>
      //   new Libro(
      //     libroData.id,
      //     libroData.titulo_libro, // Asegúrate de que el campo sea 'titulo', no 'titulo_libro'
      //     libroData.autor_nombre,
      //     libroData.autor_apellido, // Combina nombre y apellido
      //     libroData.imagen_libro_url, // Asigna un valor por defecto si no hay imagen
      //     libroData.cant_pags_libro, // Asegúrate de tener un valor por defecto
      //     libroData.cant_palabras_libro,
      //     libroData.idiomas_libro,
      //     libroData.ventas_semanales
      //   )
    } catch (error) {
      console.error('Error al obtener los libros:', error)
      throw new Error('No se pudieron cargar los libros')
    }
  }
}
