import { Component, input } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ActivatedRoute, Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../services/service_usuarios/usuarios.service';
import { Usuario } from '../../domains/usuario';


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
    private userService: UsuariosService
  ) {}

  ngOnInit() {
    const usuarioSessionIdString = sessionStorage.getItem('userSession');
    const usuarioSessionId: number | null = usuarioSessionIdString !== null ? +usuarioSessionIdString : null;

    if (usuarioSessionId !== null) {
      // Usar usuarioSessionId para obtener el usuario
      const usuarioEncontrado = this.userService.getUser(usuarioSessionId);
      
      if (usuarioEncontrado) {
        this.usuario = usuarioEncontrado;
      } else {
        console.error('Usuario no encontrado.');
        this.router.navigate(['/login']);
      }
    } else {
      // Navegar a la página de login si no se encuentra el ID de sesión
      this.router.navigate(['/login']);
    }
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

