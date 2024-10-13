import { Component, OnInit } from '@angular/core'
import { HeaderComponent } from '../../../../components/header/header.component'
import { SidebarPerfilComponent } from '../../sidebar-perfil.component'
import { CardLibroComponent } from '../../../../components/card-libro/card-libro.component'
import { Libro, LibroJSON } from '../../../../domain/libro';
import { LibrosService } from '../../../../services/service_libros/libros.service';
import { UserSessionStorageService } from '../../../../services/service_user_session_storage/user-session-storage.service';
import { Usuario } from '../../../../domain/usuario';
import { UsuariosService } from '../../../../services/service_usuarios/usuarios.service';
import { CardLibroMasComponent } from "../../../../components/card-libro-mas/card-libro-mas.component";

@Component({
  selector: 'readapp-perfil-libros-leidos',
  standalone: true,
  imports: [HeaderComponent, SidebarPerfilComponent, CardLibroComponent, CardLibroMasComponent],
  templateUrl: './perfil-libros-leidos.component.html',
  styleUrls: [
    '../../../../estilos_generales/estilo_recomendacion.css',
    '../../../../pages/pag-recomendacion/pag-recomendacion.component.css',
    '../../../../components/card-libro/card-libro.component.css',
    '../perfil-amigos/perfil-amigos.component.css',
    './perfil-libros-leidos.component.css'
  ]
})
export class PerfilLibrosLeidosComponent implements OnInit{ 
  libros: Libro[] = [];
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
    this.usuario = usuarioEnLinea
    this.listaLibrosLeidos()
    
  }

  async cargarLibros(){
    try{
      //ID desde el session storage
      const userId = this.sessionStorage.obtenerIDuserSS();

      if (userId != null){
        this.libros = await this.librosService.getLibros();
      } else {
        console.error('No se encontro el ID del usuario');
      }
      
    }catch (error){
      console.error('Error al cargar los libros:', error);
    }
  }

  listaLibrosLeidos() {
    this.libros = this.usuario.librosLeidos.map((libro: LibroJSON) => Libro.fromJson(libro));
     
    console.log('Libros leídos:', this.libros);
  }


 trackByFn(index: number, item: Libro) {
    return item.id; // Usamos el ID del libro para hacer tracking en el *ngFor
 }

}