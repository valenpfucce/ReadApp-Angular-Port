import { Component } from '@angular/core';
import { CardRecomendacionComponent } from '../../../../components/card-recomendacion/card-recomendacion.component';
import { Usuario } from '../../../../domain/usuario';
import { ActivatedRoute, Router } from '@angular/router'
import { UsuariosService } from '../../../../services/service_usuarios/usuarios.service'
import {
  UserSessionStorageService
} from '../../../../services/service_user_session_storage/user-session-storage.service'
import { Recomendacion } from '../../../../domain/recomendacion'
import {CardLibroMasComponent} from "../../../../components/card-libro-mas/card-libro-mas.component";

@Component({
  selector: 'readapp-perfil-recomendaciones-a-valorar',
  standalone: true,
    imports: [CardRecomendacionComponent, CardLibroMasComponent],
  templateUrl: './perfil-recomendaciones-a-valorar.component.html',
  styleUrls: ['../perfil-amigos/perfil-amigos.component.css','./perfil-recomendaciones-a-valorar.component.css']
})
export class PerfilRecomendacionesAValorarComponent {
  recomendacionesAValorar!: Recomendacion[]
  constructor(
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService
  ) {}

  ngOnInit() {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    if(userIdSS != null)
      this.getRecomendaciones(userIdSS)
  }

  async getRecomendaciones(userId: number):Promise<Recomendacion[]>{
    this.recomendacionesAValorar = await this.userServiceUS.getRecomendacionesAValorar(userId)
    return this.recomendacionesAValorar
  }

}
