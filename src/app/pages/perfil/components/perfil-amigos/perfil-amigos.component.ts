import { Component } from '@angular/core';
import { SidebarPerfilComponent } from '../../sidebar-perfil.component';
import { Usuario } from '../../../../domain/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSessionStorageService } from '../../../../services/service_user_session_storage/user-session-storage.service';

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
    private userServiceSS: UserSessionStorageService
  ) {}

  ngOnInit() {
    this.usuario = this.userServiceSS.obtenerUsuarioDelSS();
  }



  
  navegarA(ruta : string) {
    this.router.navigate([ruta])
  }
}
  


