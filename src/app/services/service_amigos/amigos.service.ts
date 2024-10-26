import {Injectable} from '@angular/core'
import {AmigosJSON, sistemaValidacion, Usuario} from '../../domain/usuario'
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http'
import {lastValueFrom} from 'rxjs'
import {REST_SERVER_URL} from '../configuration'

@Injectable({
  providedIn: 'root'
})


export class AmigosService {
  validador!: sistemaValidacion
  router!: Router
  errors: String[] = []
  stageAmigosPorGuardar: Usuario[] = []



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
    const amigosDTO = this.stageAmigosPorGuardar.map(amigo => amigo.toAmigoDTO());
    await lastValueFrom(
      this.httpClient.patch(`${REST_SERVER_URL}/usuarios/${userId}/agregar-amigo`, amigosDTO),
    )
    this.stageAmigosPorGuardar.splice(0, this.stageAmigosPorGuardar.length);
  }

  async eliminarAmigo(userId: number, idDelete: number) {
    await lastValueFrom(
      this.httpClient.patch(`${REST_SERVER_URL}/usuarios/${userId}/eliminar-amigo`, idDelete)
    )

  }

}
