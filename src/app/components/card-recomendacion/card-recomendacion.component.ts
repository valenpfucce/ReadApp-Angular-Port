import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {CortarPalabraPipe} from '../../pipes/cortar-palabra-pipe/cortar-palabra.pipe';
import {RouterModule} from '@angular/router'
import {Recomendacion} from '../../domain/recomendacion';
import {RecomendacionesService} from "../../services/service_recomendaciones/recomendaciones.service";
import {UsuariosService} from "../../services/service_usuarios/usuarios.service";
import {UserSessionStorageService} from "../../services/service_user_session_storage/user-session-storage.service";

@Component({
  selector: 'readapp-card-recomendacion',
  standalone: true,
  imports: [CommonModule, CortarPalabraPipe, RouterModule],
  templateUrl: './card-recomendacion.component.html',
  styleUrl: './card-recomendacion.component.css'
})
export class CardRecomendacionComponent {
  @Input() recomendacion!: Recomendacion
  corazonCliqueado!: boolean
  userIdSS! : number
  advertenciaVisible = false
  constructor(
    private serviceRecomendaciones: RecomendacionesService,
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService
  ){}

  async ngOnInit() {
    const userIdSSAChequear = this.sessionStorage.obtenerIDuserSS()
    if (userIdSSAChequear != null) {
      this.userIdSS = userIdSSAChequear
      this.corazonCliqueado = await this.estaEnRecomendacionesAValorar()
      await this.calculoTiempoLecturaRecomendacion(this.recomendacion)
    }
  }

  mostrarAdvertencia() {
    this.advertenciaVisible = true
  }

  async eliminarRecomendacion(){
    await this.serviceRecomendaciones.eliminarRecomendacion(this.recomendacion.id)
    window.location.reload()
  }

  cancelarEliminar(){
    this.cerrarAdvertencia();
  }

  cerrarAdvertencia() {
    this.advertenciaVisible = false;
  }

  async aValorar(){
    if (!await this.puedeValorarLlamadaService()){
      return
    }
    this.corazonCliqueado = !this.corazonCliqueado
    if(this.corazonCliqueado) {
      await this.userServiceUS.agregarRecomendacionAValorar(this.recomendacion.id, this.userIdSS)
    }else {
      await this.userServiceUS.eliminarRecomendacionAValorar(this.recomendacion.id, this.userIdSS)
    }
  }

  async puedeValorarLlamadaService(){
    return await this.serviceRecomendaciones.puedeValorarRecomendacion(this.recomendacion.id, this.userIdSS)
  }

  async estaEnRecomendacionesAValorar(): Promise<boolean>{
    return await this.userServiceUS.estaEnRecomendacionesAValorar(this.recomendacion.id, this.userIdSS)
  }

  async calculoTiempoLecturaRecomendacion(recomendacion: Recomendacion){
    const usuario = await this.userServiceUS.getUserById(this.userIdSS)
    const tiemposDeLecturaPorLibro = recomendacion.lista_libros.map(libro => usuario.tiempoDeLectura(libro))
    recomendacion.tiempoLectura = tiemposDeLecturaPorLibro.reduce((acumulador, valorActual) => acumulador + valorActual, 0)/60
  }

}
