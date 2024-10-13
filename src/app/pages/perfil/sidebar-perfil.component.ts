import { Component, input } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ActivatedRoute, Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../domain/usuario';
import { UsuariosService } from '../../services/service_usuarios/usuarios.service';
import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service';


@Component({
  selector: 'readapp-sidebar-perfil',
  standalone: true,
  imports: [HeaderComponent, RouterModule,CommonModule],
  templateUrl: './sidebar-perfil.component.html',
  styleUrl: './sidebar-perfil.component.css'
})
export class SidebarPerfilComponent {
  usuario!: Usuario; 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService
  ) {}

  ngOnInit() {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    this.obtenerDatosUsuario(userIdSS); /*this.userServiceSS.obtenerUsuarioDelSS();*/
  }
  
  async obtenerDatosUsuario(userIdSS : number | null ): Promise<void>{
    const usuarioEnLinea = await this.userServiceUS.getUserId(userIdSS)
    this.usuario = usuarioEnLinea
  }
  
  
  infoSidebar = [
   
    new menuSidebar(
      "Informacion",
      '/imagenes/info.svg',
      'info'
    ),
  
    new menuSidebar(
      "Amigos",
      "/imagenes/amigos.svg" ,
      'amigos'
    ),
    
    new menuSidebar(
      "Libros leidos",
      "/imagenes/libros.svg",
      'libros_leidos'
    ),
  
    new menuSidebar(
      "Libros a leer",
      "/imagenes/librosaleer.svg",
      'libros_a_leer'
    ),
  
    new menuSidebar(
      "Recomendaciones a valorar",
      "/imagenes/valorarReco.svg",
      'recomendacionesAValorar'
    ),
  
  ]
  
}

export class menuSidebar{

  constructor(
    public nombre: string,
    public icono_url: string,
    public router: string,
   
  ){}
}

