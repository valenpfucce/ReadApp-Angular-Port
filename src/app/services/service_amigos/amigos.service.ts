import { Injectable } from '@angular/core'
import {
  AmigosJSON,
  sistemaValidacion,
  Usuario,
  UsuarioJSON
} from '../../domain/usuario'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { lastValueFrom, Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { REST_SERVER_URL } from '../configuration'
import { Recomendacion, RecomendacionJSON } from '../../domain/recomendacion'
import { Libro } from '../../domain/libro'

@Injectable({
  providedIn: 'root'
})


export class AmigosService {
  idUsuarioActivo!: number
  validador!: sistemaValidacion
  router!: Router
  errors: String[] = []
  stageAmigosPorGuardar: Usuario[] = []
  stageAmigosPorEliminar: Usuario[] = []
  private readonly sessionKey = 'userSession'


  constructor(private httpClient: HttpClient) {
    this.validador = new sistemaValidacion()
  }


  async getAmigosId(userId: number | null): Promise<Usuario[]> {
    const usuarioAmigos = await lastValueFrom(
      this.httpClient.get<AmigosJSON[]>(
        REST_SERVER_URL + '/usuarios/amigos/' + userId
      )
    )

    const amigosLista = usuarioAmigos.map((AmigosJSON) =>
      Usuario.fromJsonAmigos(AmigosJSON)
    )
    
    return amigosLista
  }


  async enviarNuevosAmigos(userId: number) {
    //console.log("Datos serializados: ", JSON.stringify(this.stageAmigosPorGuardar));
    const amigosDTO = this.stageAmigosPorGuardar.map(amigo => amigo.toAmigoDTO());
    await lastValueFrom(
      this.httpClient.patch(`${REST_SERVER_URL}/usuarios/${userId}/agregar-amigo`, amigosDTO),
    )
    this.stageAmigosPorGuardar.splice(0, this.stageAmigosPorGuardar.length);
  }
  
  async eliminarAmigo(userId: number) {
    const amigosDTO = this.stageAmigosPorEliminar.map(amigo => amigo.toAmigoDTO());
    await lastValueFrom(
      this.httpClient.patch(`${REST_SERVER_URL}/usuarios/${userId}/eliminar-amigo`, amigosDTO)
    ) 
    this.stageAmigosPorEliminar.splice(0, this.stageAmigosPorEliminar.length);
  }

}