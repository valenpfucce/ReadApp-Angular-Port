import {Injectable} from '@angular/core'
import {REST_SERVER_URL} from '../configuration'
import {HttpClient} from '@angular/common/http'
import {firstValueFrom, lastValueFrom} from 'rxjs'
import {Recomendacion, RecomendacionJSON} from '../../domain/recomendacion'
import {RecomendacionUpdateDTO} from "../../dto/repositorioDTO";
import {ValoracionDTO} from "../../domain/valoracion";

@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {
  constructor(private httpClient: HttpClient) {}

  async busquedaRecomendaciones(busqueda?: string, idUsuario?: number): Promise<Recomendacion[]> {
    const recomendaciones = await lastValueFrom(
      this.httpClient.post<RecomendacionJSON[]>(REST_SERVER_URL + '/recomendaciones/busqueda/' + idUsuario, busqueda)
    )
    return recomendaciones.map((recomendacionJSON) => Recomendacion.fromJson(recomendacionJSON)
    )
  }

  async getRecomendacionById(id: number) {
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

  async busquedaGeneral(palabraABuscar?: string, idUsuario?: number) {
    return await this.busquedaRecomendaciones(palabraABuscar, idUsuario)
  }

  async busquedaMisRecomendaciones(palabraABuscar?: string, idUsuario?: number) {
    return await this.getRecomendacionesEditables(idUsuario, palabraABuscar)
  }

  async getRecomendacionesEditables(userId?: number, busqueda?: string) {
    const recomendaciones = await lastValueFrom(
      this.httpClient.post<RecomendacionJSON[]>(REST_SERVER_URL + '/recomendaciones/permiso/editar/usuario/' + userId, busqueda)
    )
    const recomendacionLista = recomendaciones.map((recomendacionJSON) =>
      Recomendacion.fromJson(recomendacionJSON)
    )
    return recomendacionLista
  }

  async puedeEditarRecomendacion(recomendacionId : number, usuarioId: number): Promise<boolean> {
    return await lastValueFrom(
      this.httpClient.get<boolean>(REST_SERVER_URL + `/recomendaciones/${recomendacionId}/puede/editar/usuario/${usuarioId}`)
    )
  }

  async editarRecomendacion(recomendacion: Recomendacion, userId: number): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpClient.patch(`${REST_SERVER_URL}/recomendaciones/editar/por/` + userId, (RecomendacionUpdateDTO.toJson(recomendacion))))
      return response;
    } catch (error) {
        console.error("Error al enviar al back:", error)
      throw error
    }
  }


  async puedeValorarRecomendacion(recomendacionId : number, usuarioId: number): Promise<boolean> {
      return await lastValueFrom(
        this.httpClient.get<boolean>(REST_SERVER_URL + `/recomendaciones/${recomendacionId}/puede/valorar/usuario/${usuarioId}`)
      )
  }

  async valorarRecomendacion(recomendacionId : number, valoracionDTO : ValoracionDTO){
    try {
      const response = await firstValueFrom(this.httpClient.post(`${REST_SERVER_URL}/recomendaciones/` + recomendacionId + `/agregar/valoracion`, valoracionDTO))
      console.log("Respuesta recibida:", response)
      return response;
    } catch (error) {
      console.error("Error al enviar al back:", error)
      throw error
    }
  }

  async eliminarRecomendacion(recomendacionId: number){
    await lastValueFrom(this.httpClient.patch(`${REST_SERVER_URL}/recomendaciones/eliminar-recomendacion/${recomendacionId}`, {})
    )
  }

  async crearRecomendacion(recomendacion: Recomendacion){
    try {
      const response = await firstValueFrom(this.httpClient.post(`${REST_SERVER_URL}/recomendaciones/crear`, (RecomendacionUpdateDTO.toJson(recomendacion))))
      return response;
    } catch (error) {
      console.error("Error al enviar al back:", error)
      throw error
    }
  }

}
