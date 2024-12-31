import { Component } from '@angular/core';
import { MenuDesplegableComponent } from "./components/menu-desplegable/menu-desplegable.component";
import { RouterModule } from '@angular/router';
import { Usuario } from '../../domain/usuario';
import { UsuariosService } from '../../services/service_usuarios/usuarios.service';
import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service';

@Component({
  selector: 'readapp-header',
  standalone: true,
  imports: [MenuDesplegableComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  nombreUser! : String | null
  apellidoUser!: String | null
  imgUser!: String | null
  usuario!:Usuario

  constructor(
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService

  ) {}

  ngOnInit() {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    this.obtenerDatosUsuario(userIdSS)
    this.nombreUser = this.sessionStorage.obtenerNombreUserSS()
    this.apellidoUser = this.sessionStorage.obtenerApellidoUserSS()
    this.imgUser = this.sessionStorage.obtenerImgUserSS()
  }

  async obtenerDatosUsuario(userIdSS : number | null ): Promise<void>{
    const usuarioEnLinea = await this.userServiceUS.getUserById(userIdSS)
    this.usuario = usuarioEnLinea

  }

  menuVisible: boolean = false;

  toggleMenu() {  //alternar vista menu
    this.menuVisible = !this.menuVisible;
  }



}
