import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../service_usuarios/usuarios.service';
import { Usuario } from '../../domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserSessionStorageService {
  
  usuarioSessionIdString = sessionStorage.getItem('userSession');
  usuarioSessionId: number | null = this.usuarioSessionIdString !== null ? +this.usuarioSessionIdString : null;
  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private userService: UsuariosService
  ) { }
  // ===== USER =====


  obtenerUsuarioDelSS(){
    if (this.usuarioSessionId !== null) {
      // Usar usuarioSessionId para obtener el usuario  
      const usuarioEncontrado = this.userService.getUser(this.usuarioSessionId);
      if (usuarioEncontrado) {
        return usuarioEncontrado;
      } else {
        console.error('Usuario no encontrado.');
        this.navegarAHome()
        throw new Error('Redirigiendo por usuario no encontrado');
      }
    } else {
      // Navegar a la página de login si no se encuentra el ID de sesión
      this.navegarAHome()
      throw new Error('Redirigiendo por usuario no encontrado');
    }
  }
  navegarAHome(){this.router.navigate(['/login']);}
}
