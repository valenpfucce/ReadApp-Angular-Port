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

  async busquedaLibros(busqueda: string = ''): Promise<Libro[]> {   //ELIMINAR TRY CATCH
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

  async obtenerTodosLosLibros() {
    //LLAMADA AL BACK PARA OBTENER TODOS LOS LIBROS
    return lastValueFrom(
      this.httpClient.get<Libro[]>(`${REST_SERVER_URL}/libros/todos`)
    )
    // console.log('los libros todos', todosLosLibros)
    // return todosLosLibros
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
    await lastValueFrom(
       this.httpClient.patch(
          `${REST_SERVER_URL}/usuarios/${userId}/agregar-leidos`,
          librosEnviar
        )
      )
      this.listaAgregarLeidos = []
    
  }

  async eliminarLibrosLeidos(userId: number) {
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
    await lastValueFrom(
        this.httpClient.patch(
          `${REST_SERVER_URL}/usuarios/${userId}/agregar-a-leer`,
          librosEnviar
        )
      )
      this.listaAgregarALeer = []
    }

  async eliminarLibrosALeer(userId: number) {  
    const librosEnviar = this.listaEliminarALeer.map((libro) => libro.id)
    await lastValueFrom(
      this.httpClient.patch(
          `${REST_SERVER_URL}/usuarios/${userId}/eliminar-a-leer`,
          librosEnviar
        )
      )
      this.listaEliminarALeer = []
  }

  /* PERFIL LIBROS A LEER Y LEIDOS*/
}
