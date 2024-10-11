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

  getRecomendacion(id: number) {
    return this.listaRecomendaciones.find(recomendacion => recomendacion.id === id)
  }

  async getRecomendacionCompleta(id: number) {
    // const recomendacionJSON$ = await this.httpClient.get<Recomendacion>(`${REST_SERVER_URL}/recomendaciones/completa/${id}`)
    const recomendacionJSON = await lastValueFrom(this.httpClient.get<Recomendacion>(`${REST_SERVER_URL}/recomendaciones/completa/${id}`))
    return recomendacionJSON ? Recomendacion.fromJson(recomendacionJSON) : undefined
  }

  busquedaGeneral(palabraABuscar?: string){
    return this.listaRecomendaciones
  }

  busquedaMisRecomendaciones(palabraABuscar?: string, idUsuario?: Number){
    return this.listaRecomendaciones.filter(recomendacion => recomendacion.creadorId == idUsuario)
  }
}
