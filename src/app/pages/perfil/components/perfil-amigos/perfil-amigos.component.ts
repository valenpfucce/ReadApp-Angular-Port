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


@Component({
  selector: 'readapp-perfil-amigos',
  standalone: true,
    imports: [SidebarPerfilComponent, CardAmigoComponent,CardLibroMasComponent,ModalComponent,CommonModule],
  templateUrl: './perfil-amigos.component.html',
  styleUrl: './perfil-amigos.component.css'
})
export class PerfilAmigosComponent {
  usuario! : Usuario
  listaAmigos! : Usuario[]
  isModalOpen = false
  

  constructor(
    private router: Router,
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService
  ) {}

  ngOnInit() {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    this.obtenerAmigos(userIdSS)
    console.log("id usuario",userIdSS)

  }

  async obtenerAmigos(userIdSS : number | null ): Promise<Usuario[]>{
    this.listaAmigos = await this.userServiceUS.getAmigosId(userIdSS)
    console.log("lista amigos",this.listaAmigos)
    return this.listaAmigos
  }
  
  openModal() {
    console.log('Método openModal ejecutado') // Verificar si se ejecuta al hacer clic
    this.isModalOpen = true // Cambiar el estado para abrir el modal
  }
   
  closeModal() {
    this.isModalOpen = false // Cerrar el modal
  }

  navegarA(ruta : string) {
    this.router.navigate([ruta])
  }
}



