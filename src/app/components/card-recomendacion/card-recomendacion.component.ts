import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CortarPalabraPipe } from '../../pipes/cortar-palabra-pipe/cortar-palabra.pipe';
import { Router, RouterModule } from '@angular/router'
import { Recomendacion } from '../../domain/recomendacion';
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
  puedeEditar! : boolean
  constructor(
    private serviceRecomendaciones: RecomendacionesService,
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService
  ){}

  async ngOnInit() {
    const userIdSSAChequear = this.sessionStorage.obtenerIDuserSS()
    if (userIdSSAChequear != null) {
      this.userIdSS = userIdSSAChequear
      this.puedeEditar = await this.puedeEditarRecomendacion()
      this.corazonCliqueado = await this.estaEnRecomendacionesAValorar()
    } else {
      this.puedeEditar = false
    }
  }

  async puedeEditarRecomendacion() {
    return await this.serviceRecomendaciones.puedeEditarRecomendacion(this.recomendacion.id, this.userIdSS)
  }


  async aValorar(){
    this.corazonCliqueado = !this.corazonCliqueado
    if(this.corazonCliqueado) {
      await this.userServiceUS.agregarRecomendacionAValorar(this.recomendacion.id, this.userIdSS)
    }else {
      await this.userServiceUS.eliminarRecomendacionAValorar(this.recomendacion.id, this.userIdSS)
    }
  }

  async estaEnRecomendacionesAValorar(): Promise<boolean>{
    return await this.userServiceUS.estaEnRecomendacionesAValorar(this.recomendacion.id, this.userIdSS)
  }

}
