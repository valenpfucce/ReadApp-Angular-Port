import { Injectable } from '@angular/core'
import { REST_SERVER_URL } from '../configuration'
import { HttpClient } from '@angular/common/http'
import { lastValueFrom } from 'rxjs'
import { Recomendacion, RecomendacionJSON } from '../../domain/recomendacion'

@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {
  constructor(private httpClient: HttpClient) {}

  async busquedaRecomendaciones(busqueda?: string) {
    const recomendaciones = await lastValueFrom(
      this.httpClient.post<RecomendacionJSON[]>(REST_SERVER_URL + '/recomendaciones/busqueda', busqueda)
    )
    const recomendacionLista = recomendaciones.map((recomendacionJSON) =>
      Recomendacion.fromJson(recomendacionJSON)
    )
    console.log(recomendacionLista)
    // if (recomendacionLista.length > 0) {
    //   return recomendacionLista
    // }
    // const recomendacionVacia: Recomendacion[] = []
    // return recomendacionVacia
    return recomendacionLista
  }

  async getRecomendacionById(id: number) {
    // const recomendacionJSON$ = await this.httpClient.get<Recomendacion>(`${REST_SERVER_URL}/recomendaciones/completa/${id}`)
    const recomendacionJSON = await lastValueFrom(
      this.httpClient.get<RecomendacionJSON>(
        `${REST_SERVER_URL}/recomendaciones/` + id
      )
    )
    if (!recomendacionJSON) {
      throw new Error('Recomendacion no encontrada')
    }
    return Recomendacion.fromJson(recomendacionJSON)
  }

  async busquedaGeneral(palabraABuscar?: string) {
    return this.busquedaRecomendaciones(palabraABuscar)
  }

  async busquedaMisRecomendaciones(palabraABuscar?: string, idUsuario?: number) {
    return this.getRecomendacionesEditables(idUsuario, palabraABuscar)
  }

  async getRecomendacionesEditables(userId: number | undefined, busqueda?: string) {
    const recomendaciones = await lastValueFrom(
      this.httpClient.post<RecomendacionJSON[]>(REST_SERVER_URL + '/permiso/editar/usuario/' + userId, busqueda)
    )
    const recomendacionLista = recomendaciones.map((recomendacionJSON) =>
      Recomendacion.fromJson(recomendacionJSON)
    )
    console.log(recomendacionLista)
    // if (recomendacionLista.length > 0) {
    //   return recomendacionLista
    // }
    // const recomendacionVacia: Recomendacion[] = []
    // return recomendacionVacia
    return recomendacionLista
  }
}
