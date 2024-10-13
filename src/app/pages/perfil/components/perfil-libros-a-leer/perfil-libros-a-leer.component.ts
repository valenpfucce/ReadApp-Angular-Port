import { Component, OnInit } from '@angular/core'
import { HeaderComponent } from '../../../../components/header/header.component'
import { SidebarPerfilComponent } from '../../sidebar-perfil.component'
import { CardLibroComponent } from '../../../../components/card-libro/card-libro.component'
import { Libro, LibroJSON } from '../../../../domain/libro';
import { LibrosService } from '../../../../services/service_libros/libros.service';
import { UserSessionStorageService } from '../../../../services/service_user_session_storage/user-session-storage.service';
import { Usuario } from '../../../../domain/usuario';
import { UsuariosService } from '../../../../services/service_usuarios/usuarios.service';

@Component({
  selector: 'readapp-perfil-libros-leidos',
  standalone: true,
  imports: [HeaderComponent, SidebarPerfilComponent, CardLibroComponent,],
  templateUrl: './perfil-libros-a-leer.component.html',
  styleUrls: [
    '../../../../estilos_generales/estilo_recomendacion.css',
    '../../../../pages/pag-recomendacion/pag-recomendacion.component.css',
    '../../../../components/card-libro/card-libro.component.css',
    '../perfil-amigos/perfil-amigos.component.css',
    './perfil-libros-a-leer.component.css'
  ]
})
export class PerfilLibrosALeerComponent implements OnInit{ 
  librosLeidos: Libro[] = [];
  librosPorLeer: Libro[] = [];
  palabraABuscar: string = '';
  usuario!: Usuario;
  
  constructor(private librosService: LibrosService, 
    private sessionStorage: UserSessionStorageService, 
    private userServiceUS: UsuariosService){}
  
  ngOnInit() {
    //id desde el session storage
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    this.obtenerDatosUsuario(userIdSS)
      
  }

  async obtenerDatosUsuario(userIdSS : number | null ): Promise<void>{
    const usuarioEnLinea = await this.userServiceUS.getUserId(userIdSS) 
    this.usuario = usuarioEnLinea;
    this.listaLibrosLeidos();
    this.listaLibrosPorLeer();
    
  }

  listaLibrosLeidos() {
    // Filtra los libros que ya han sido leídos
    this.librosLeidos = this.usuario.librosLeidos.map((libro: LibroJSON) => Libro.fromJson(libro));
    console.log('Libros leídos:', this.librosLeidos);
  }

  listaLibrosPorLeer() {
    // Filtra los libros que no aparecen en cantVecesLeido, lo que indica que no han sido leídos
    this.librosPorLeer = this.usuario.librosLeidos.filter((libro: Libro) => {
      return !this.usuario.cantVecesLeido.has(libro.id);  // Si no ha sido leído, lo agregamos a la lista de libros por leer
    });

    console.log('Libros por leer:', this.librosPorLeer);
  }

  trackByFn(index: number, item: Libro) {
    return item.id;  // Usamos el ID del libro para hacer tracking en el *ngFor
  }

}