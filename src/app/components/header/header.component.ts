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
  usuario!: Usuario;

  constructor(
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService
    
  ) {}
  
  ngOnInit() {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    this.obtenerDatosUsuario(userIdSS)
  }
  
  async obtenerDatosUsuario(userIdSS : number | null ): Promise<void>{
    const usuarioEnLinea = await this.userServiceUS.getUserId(userIdSS)
    this.usuario = usuarioEnLinea
  }
  
  
  
  menuVisible: boolean = false; 

  toggleMenu() {  //alternar vista menu
    this.menuVisible = !this.menuVisible;
  }



}
