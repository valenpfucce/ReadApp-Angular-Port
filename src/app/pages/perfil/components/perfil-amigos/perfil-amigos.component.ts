import { Component } from '@angular/core';
import { SidebarPerfilComponent } from '../../sidebar-perfil.component';
import { Usuario } from '../../../../domain/usuario';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../../services/service_usuarios/usuarios.service';
import { UserSessionStorageService } from '../../../../services/service_user_session_storage/user-session-storage.service';
import {CardLibroMasComponent} from "../../../../components/card-libro-mas/card-libro-mas.component";
import { CardAmigoComponent } from '../../../../components/card-amigo/card-amigo.component';

@Component({
  selector: 'readapp-perfil-amigos',
  standalone: true,
    imports: [SidebarPerfilComponent, CardAmigoComponent,CardLibroMasComponent],
  templateUrl: './perfil-amigos.component.html',
  styleUrl: './perfil-amigos.component.css'
})
export class PerfilAmigosComponent {
  usuario! : Usuario
  listaAmigos! : Usuario[]
  
  
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
  
  

  navegarA(ruta : string) {
    this.router.navigate([ruta])
  }
}



