import { Component } from '@angular/core';
import { SidebarPerfilComponent } from '../../sidebar-perfil.component';
import { Usuario } from '../../../../domain/usuario';
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
    private userServiceUS: UsuariosService
  ) {}

  ngOnInit() {
    this.obtenerDatosUsuario()/*this.userServiceSS.obtenerUsuarioDelSS();*/
  
  }

  async obtenerDatosUsuario(): Promise<void>{
    const usuarioEnLinea = await this.userServiceUS.getUserId()
    this.usuario = usuarioEnLinea
  }

  
  navegarA(ruta : string) {
    this.router.navigate([ruta])
  }
}
  


