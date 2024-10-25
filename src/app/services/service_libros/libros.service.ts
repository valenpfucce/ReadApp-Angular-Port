import { Injectable } from '@angular/core'
import { Libro, LibroJSON } from '../../domain/libro'
import { HttpClient, HttpParams } from '@angular/common/http'
import { lastValueFrom } from 'rxjs'
import { REST_SERVER_URL } from '../configuration'

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  listaAgregarALeer: Libro[] = []
  listaEliminarALeer: Libro[] = []
  listaAgregarLeidos: Libro[] = []
  listaEliminarLeidos: Libro[] = []

  constructor(private httpClient: HttpClient) {}

  async busquedaLibros(busqueda: string = ''): Promise<Libro[]> {
    try {
      let params = new HttpParams().append('busqueda', busqueda)
      const librosJSON = await lastValueFrom(
        this.httpClient.get<LibroJSON[]>(`${REST_SERVER_URL}/libros/busqueda`, {
          params
        })
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

  /* PERFIL LIBROS A LEER Y LEIDOS*/
  getLibrosALeer(userId: number): Promise<Libro[]> {
    return lastValueFrom(
      this.httpClient.get<Libro[]>(
        `${REST_SERVER_URL}/usuarios/${userId}/libros-a-leer`
      )
    )
  }

  getLibrosLeidosMenosTodos(userId: number): Promise<Libro[]> {
    return lastValueFrom(
      this.httpClient.get<Libro[]>(
        `${REST_SERVER_URL}/usuarios/${userId}/libros-leidos`
      )
    )
  }

  async agregarLibrosLeidos(userId: number) {
    const librosEnviar = this.listaAgregarLeidos.map((libro) => libro.id)
    console.log('Esto estoy enviando a agregar', librosEnviar)
    try {
      await lastValueFrom(
        this.httpClient.patch(
          `${REST_SERVER_URL}/usuarios/${userId}/agregar-leidos`,
          librosEnviar
        )
      )
      this.listaAgregarLeidos = []
      console.log('IDs enviados exitosamente al backend', librosEnviar)
    } catch (error) {
      console.error('Error al agregar libros a leer:', error)
    }
  }

  async eliminarLibrosLeidos(userId: number) {
    console.log('Este quiero eliminar', this.listaEliminarLeidos)
    const librosEnviar = this.listaEliminarLeidos.map((libro) => libro.id)
    await lastValueFrom(
      this.httpClient.patch(
        `${REST_SERVER_URL}/usuarios/${userId}/eliminar-leidos`,
        librosEnviar
      )
    )
    this.listaEliminarLeidos = []
  }

  async agregarLibrosALeer(userId: number) {
    const librosEnviar = this.listaAgregarALeer.map((libro) => libro.id)
    console.log('Esto estoy enviando a agregar', librosEnviar)
    try {
      await lastValueFrom(
        this.httpClient.patch(
          `${REST_SERVER_URL}/usuarios/${userId}/agregar-a-leer`,
          librosEnviar
        )
      )
      this.listaAgregarALeer = []
      console.log('IDs enviados exitosamente al backend', librosEnviar)
    } catch (error) {
      console.error('Error al agregar libros a leer:', error)
    }
  }

  async eliminarLibrosALeer(userId: number) {
    const librosEnviar = this.listaEliminarALeer.map((libro) => libro.id)
    console.log('Este quiero eliminar', librosEnviar)
    try {
      await lastValueFrom(
        this.httpClient.patch(
          `${REST_SERVER_URL}/usuarios/${userId}/eliminar-a-leer`,
          librosEnviar
        )
      )
      this.listaEliminarALeer = []
      console.log('IDs enviados exitosamente al backend', librosEnviar)
    } catch (error) {
      console.error('Error al eliminar libros a leer:', error)
    }
  }

  /* PERFIL LIBROS A LEER Y LEIDOS*/
}
