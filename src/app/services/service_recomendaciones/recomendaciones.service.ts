import { Injectable } from '@angular/core';
import { recomendaciones } from '../../mocks/mock_recomendaciones';
import {REST_SERVER_URL} from "../configuration";
import { HttpClient } from '@angular/common/http'
import {catchError, map} from "rxjs/operators";
import {lastValueFrom, of} from "rxjs";
import {UsuarioLoginJSON} from "../service_usuarios/usuarios.service";
import {Recomendacion} from "../../domain/recomendacion";

@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {
  listaRecomendaciones = recomendaciones
  constructor(private httpClient: HttpClient) { }

  listar_recomendaciones(){
    return this.listaRecomendaciones
  }

  // async getRecomendacion(id: number) : Recomendacion {
  //   const recomendacionEncontrada = this.httpClient
  //     .get<UsuarioLoginJSON>(`${REST_SERVER_URL}/recomendaciones/${id}`)
  //     .pipe(
  //       map((response) => response?.id || null),
  //       catchError((error) => {
  //         return of(null) // Retornar null en caso de error
  //       })
  //     )
  // }

  getRecomendacion(id: number) {
    return this.listaRecomendaciones.find(recomendacion => recomendacion.id === id)
  }

  async getRecomendacionCompleta(id: number): Promise<Recomendacion | null> {
    try {
      const recomendacionJSON$ =
        this.httpClient.get<Recomendacion>(`${REST_SERVER_URL}/recomendaciones/${id}`)
      const recomendacionJSON = await lastValueFrom(recomendacionJSON$)
      return recomendacionJSON ? Recomendacion.fromJson(recomendacionJSON) : undefined
    } catch (error) {
      console.error('Error al obtener recomendación:', error);
      return null; // Retorna null en caso de error
    }
  }

  busquedaGeneral(palabraABuscar?: string){
    return this.listaRecomendaciones
  }

  busquedaMisRecomendaciones(palabraABuscar?: string, idUsuario?: Number){
    return this.listaRecomendaciones.filter(recomendacion => recomendacion.creadorId == idUsuario)
  }
}
