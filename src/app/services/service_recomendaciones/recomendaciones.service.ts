import { Injectable } from '@angular/core'
import { REST_SERVER_URL } from '../configuration'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { lastValueFrom, of } from 'rxjs'
import { UsuarioLoginJSON } from '../service_usuarios/usuarios.service'
import { Recomendacion, RecomendacionJSON } from '../../domain/recomendacion'

@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {
  constructor(private httpClient: HttpClient) {}

  async getAllRecomendaciones() {
    const recomendaciones = await lastValueFrom(
      this.httpClient.get<RecomendacionJSON[]>(REST_SERVER_URL + '/recomendaciones/todas')
    )
    return recomendaciones.map((recomendacionJSON) =>
      Recomendacion.fromJson(recomendacionJSON)
    )
  }

  // getRecomendacion(id: number) {
  //   return this.listaRecomendaciones.find(
  //     (recomendacion) => recomendacion.id === id
  //   )
  // }

  async getRecomendacionById(id: number) {
    // const recomendacionJSON$ = await this.httpClient.get<Recomendacion>(`${REST_SERVER_URL}/recomendaciones/completa/${id}`)
    const recomendacionJSON = await lastValueFrom(
      this.httpClient.get<RecomendacionJSON>(
        `${REST_SERVER_URL}/recomendaciones/` + id
      )
    )
    if (!recomendacionJSON) {
      throw new Error("Recomendacion no encontrada")
    }
    return Recomendacion.fromJson(recomendacionJSON)
  }

  async busquedaGeneral(palabraABuscar?: string) {
    return this.getAllRecomendaciones()
  }

  async busquedaMisRecomendaciones(palabraABuscar?: string, idUsuario?: Number) {
    return await this.getAllRecomendaciones() /*.filter(recomendacion => recomendacion.creadorId == idUsuario)*/
  }
}
