import { Component } from '@angular/core';
import { SidebarPerfilComponent } from '../../sidebar-perfil.component';
import { Usuario } from '../../../../domains/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../../services/service_usuarios/usuarios.service';

@Component({
  selector: 'readapp-perfil-amigos',
  standalone: true,
  imports: [SidebarPerfilComponent],
  templateUrl: './perfil-amigos.component.html',
  styleUrls: ['./perfil-amigos.component.css', '../../../../estilos_generales/cartas_libros_btn_mas.css']
})
export class PerfilAmigosComponent {
  usuario! : Usuario
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



  
  navegarA(ruta : string) {
    this.router.navigate([ruta])
  }
}
  


