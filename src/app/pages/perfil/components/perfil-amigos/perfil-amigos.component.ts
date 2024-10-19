import { Component, OnInit, } from '@angular/core';
import { SidebarPerfilComponent } from '../../sidebar-perfil.component';
import { Usuario } from '../../../../domain/usuario';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../../services/service_usuarios/usuarios.service';
import { UserSessionStorageService } from '../../../../services/service_user_session_storage/user-session-storage.service';
import {CardLibroMasComponent} from "../../../../components/card-libro-mas/card-libro-mas.component";
import { CardAmigoComponent } from '../../../../components/card-amigo/card-amigo.component';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { AmigosService } from '../../../../services/service_amigos/amigos.service';


@Component({
  selector: 'readapp-perfil-amigos',
  standalone: true,
    imports: [SidebarPerfilComponent, CardAmigoComponent,CardLibroMasComponent,ModalComponent,CommonModule],
  templateUrl: './perfil-amigos.component.html',
  styleUrl: './perfil-amigos.component.css'
})
export class PerfilAmigosComponent {
  userActivate! : number
  listaAmigos! : Usuario[]
  isModalOpen = false
  

  constructor(
    private router: Router,
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService,
    private amigoService: AmigosService

  ) {}

  ngOnInit() {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    this.obtenerAmigos(userIdSS)

  }

  async obtenerAmigos(userIdSS : number | null ): Promise<Usuario[]>{
    this.listaAmigos = await this.amigoService.getAmigosId(userIdSS)
    this.userActivate = userIdSS!
    return this.listaAmigos
  }
  
  guardarCambios(){
    this.amigoService.enviarNuevosAmigos(this.userActivate)
    this.amigoService.eliminarAmigo(this.userActivate)
    window.location.reload();

  }

  cancelarCambios(){
    this.amigoService.stageAmigosPorGuardar.splice(0, this.amigoService.stageAmigosPorGuardar.length);
    window.location.reload();
  }

  openModal() {
    this.isModalOpen = true 
  }
   
  closeModal() {
    this.isModalOpen = false 
  }

  navegarA(ruta : string) {
    this.router.navigate([ruta])
  }
}



