import { Component } from '@angular/core';
import { SidebarPerfilComponent } from '../../sidebar-perfil.component';
import { Usuario } from '../../../../domain/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../../services/service_usuarios/usuarios.service';
import { UserSessionStorageService } from '../../../../services/service_user_session_storage/user-session-storage.service';
import {CardLibroMasComponent} from "../../../../components/card-libro-mas/card-libro-mas.component";

@Component({
  selector: 'readapp-perfil-amigos',
  standalone: true,
    imports: [SidebarPerfilComponent, CardLibroMasComponent],
  templateUrl: './perfil-amigos.component.html',
  styleUrl: './perfil-amigos.component.css'
})
export class PerfilAmigosComponent {
  usuario! : Usuario
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService
  ) {}

  ngOnInit() {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    this.obtenerDatosUsuario(userIdSS)/*this.userServiceSS.obtenerUsuarioDelSS();*/

  }

  async obtenerDatosUsuario(userIdSS : number | null ): Promise<void>{
    const usuarioEnLinea = await this.userServiceUS.getUserId(userIdSS)
    this.usuario = usuarioEnLinea
  }


  navegarA(ruta : string) {
    this.router.navigate([ruta])
  }
}



