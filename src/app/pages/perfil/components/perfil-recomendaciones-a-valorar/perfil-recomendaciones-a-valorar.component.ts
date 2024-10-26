import {Component} from '@angular/core';
import {CardRecomendacionComponent} from '../../../../components/card-recomendacion/card-recomendacion.component';
import {RouterLink} from '@angular/router'
import {UsuariosService} from '../../../../services/service_usuarios/usuarios.service'
import {UserSessionStorageService} from '../../../../services/service_user_session_storage/user-session-storage.service'
import {Recomendacion} from '../../../../domain/recomendacion'
import {CardLibroMasComponent} from "../../../../components/card-libro-mas/card-libro-mas.component";

@Component({
  selector: 'readapp-perfil-recomendaciones-a-valorar',
  standalone: true,
  imports: [CardRecomendacionComponent, CardLibroMasComponent, RouterLink],
  templateUrl: './perfil-recomendaciones-a-valorar.component.html',
  styleUrls: ['../perfil-amigos/perfil-amigos.component.css','./perfil-recomendaciones-a-valorar.component.css']
})
export class PerfilRecomendacionesAValorarComponent {
  recomendacionesAValorar!: Recomendacion[]
  porSiElimina!:Recomendacion[]
  userId!: number
  constructor(
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService
  ) {}

  ngOnInit() {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    if(userIdSS != null)
      this.userId = userIdSS
      this.getRecomendaciones(this.userId)
  }

  async getRecomendaciones(userId: number):Promise<Recomendacion[]>{
    this.recomendacionesAValorar = await this.userServiceUS.getRecomendacionesAValorar(userId)
    this.porSiElimina = [...this.recomendacionesAValorar]
    return this.recomendacionesAValorar
  }

  async cancelarCambios(){
    this.porSiElimina.forEach((recomendacion) => this.userServiceUS.agregarRecomendacionAValorar(recomendacion.id, this.userId))
    this.reloadPage()
  }

  reloadPage(){
    window.location.reload();
  }

}
