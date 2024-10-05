import { Component, input } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ActivatedRoute, Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service';
import { Usuario } from '../../domain/usuario';


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
    private userServiceSS: UserSessionStorageService
  ) {}

  ngOnInit() {
    this.usuario = this.userServiceSS.obtenerUsuarioDelSS();
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
      'info'
    ),
  
    new menuSidebar(
      "Libros a leer",
      "/imagenes/librosaleer.svg",
      'info'
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

