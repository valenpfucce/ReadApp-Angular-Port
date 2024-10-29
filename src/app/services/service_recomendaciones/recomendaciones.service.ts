import {Injectable} from '@angular/core'
import {REST_SERVER_URL} from '../configuration'
import {HttpClient, HttpParams} from '@angular/common/http'
import {firstValueFrom, lastValueFrom} from 'rxjs'
import {Recomendacion, RecomendacionJSON} from '../../domain/recomendacion'
import {RecomendacionUpdateDTO} from "../../dto/repositorioDTO";
import {ValoracionDTO} from "../../domain/valoracion";

@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {
  constructor(private httpClient: HttpClient) {}

  async busquedaRecomendaciones(busqueda: string = "", idUsuario?: number) {
    let params = new HttpParams().append('busqueda', busqueda)

    const recomendaciones = await lastValueFrom(
      this.httpClient.get<RecomendacionJSON[]>(`${REST_SERVER_URL}/recomendaciones/busqueda/${idUsuario}`, {params})
    )
    return recomendaciones.map((recomendacionJSON) => Recomendacion.fromJson(recomendacionJSON)
    )
  }

  async getRecomendacionByIdWithUser(idReco: number, idUser : number) {
    let params = new HttpParams().append('idUser', idUser)
    const recomendacionJSON = await lastValueFrom(
      this.httpClient.get<RecomendacionJSON>(
        `${REST_SERVER_URL}/recomendaciones/` + idReco, {params}
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

  async getRecomendacionesEditables(userId?: number, busqueda: string="") {
    let params = new HttpParams().append('busqueda', busqueda)
    const recomendaciones = await lastValueFrom(
      this.httpClient.get<RecomendacionJSON[]>(`${REST_SERVER_URL}/recomendaciones/permiso/editar/usuario/${userId}`, {params})
    )
    return recomendaciones.map((recomendacionJSON) =>
      Recomendacion.fromJson(recomendacionJSON)
    )
  }

  async editarRecomendacion(recomendacion: Recomendacion, userId: number): Promise<any> {
      return await firstValueFrom(this.httpClient.patch(`${REST_SERVER_URL}/recomendaciones/editar/por/` + userId, (RecomendacionUpdateDTO.toJson(recomendacion))));
  }


  async puedeValorarRecomendacion(recomendacionId : number, usuarioId: number): Promise<boolean> {
      return await lastValueFrom(
        this.httpClient.get<boolean>(REST_SERVER_URL + `/recomendaciones/${recomendacionId}/puede/valorar/usuario/${usuarioId}`)
      )
  }

  async valorarRecomendacion(recomendacionId : number, valoracionDTO : ValoracionDTO){
      return await firstValueFrom(this.httpClient.post(`${REST_SERVER_URL}/recomendaciones/` + recomendacionId + `/agregar/valoracion`, valoracionDTO));

  }

  async eliminarRecomendacion(recomendacionId: number){
    await lastValueFrom(this.httpClient.delete(`${REST_SERVER_URL}/recomendaciones/eliminar-recomendacion/${recomendacionId}`, {})
    )
  }

  async crearRecomendacion(recomendacion: Recomendacion){
    return await firstValueFrom(this.httpClient.post(`${REST_SERVER_URL}/recomendaciones/crear`, (RecomendacionUpdateDTO.toJson(recomendacion))));
  }

}
