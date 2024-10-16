import { Component, OnInit } from '@angular/core'
import { HeaderComponent } from '../../../../components/header/header.component'
import { SidebarPerfilComponent } from '../../sidebar-perfil.component'
import { CardLibroComponent } from '../../../../components/card-libro/card-libro.component'
import { Libro, LibroJSON } from '../../../../domain/libro'
import { LibrosService } from '../../../../services/service_libros/libros.service'
import { UserSessionStorageService } from '../../../../services/service_user_session_storage/user-session-storage.service'
import { Usuario } from '../../../../domain/usuario'
import { UsuariosService } from '../../../../services/service_usuarios/usuarios.service'
import { CardLibroMasComponent } from '../../../../components/card-libro-mas/card-libro-mas.component'
import { ModalComponent } from '../../../../components/modal/modal.component'
import { CommonModule } from '@angular/common'
@Component({
  selector: 'readapp-perfil-libros-leidos',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarPerfilComponent,
    CardLibroComponent,
    CardLibroMasComponent,
    ModalComponent,
    CommonModule
  ],
  templateUrl: './perfil-libros-leidos.component.html',
  styleUrls: [
    '../../../../estilos_generales/estilo_recomendacion.css',
    '../../../../estilos_generales/cartas_libros.css',
    '../../../../pages/pag-recomendacion/pag-recomendacion.component.css',
    '../perfil-amigos/perfil-amigos.component.css',
    './perfil-libros-leidos.component.css'
  ]
})
export class PerfilLibrosLeidosComponent implements OnInit {

  libros: Libro[] = []
  librosRecibidos: Libro[] = []
  palabraABuscar: string = ''
  usuario!: Usuario
  modo!: 'detalle' | 'edicion'


  constructor(
    private librosService: LibrosService,
    private sessionStorage: UserSessionStorageService,
    private userServiceUS: UsuariosService
  ) {}

  ngOnInit() {
    //id desde el session storage
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    this.obtenerDatosUsuario(userIdSS)
    this.modo = 'detalle'
  }

  async obtenerDatosUsuario(userIdSS: number | null): Promise<void> {
    const usuarioEnLinea = await this.userServiceUS.getUserId(userIdSS)
    this.usuario = usuarioEnLinea
    this.listaLibrosLeidos()
  }

  async cargarLibros() {
    try {
      //ID desde el session storage
      const userId = this.sessionStorage.obtenerIDuserSS()

      if (userId != null) {
        this.libros = await this.librosService.busquedaLibros()
      } else {
        console.error('No se encontro el ID del usuario')
      }
    } catch (error) {
      console.error('Error al cargar los libros:', error)
    }
  }

  recibirLibros(libros: Libro[]){
    this.librosRecibidos = libros
    console.log(this.librosRecibidos)
  }


  listaLibrosLeidos() {
    this.libros = this.usuario.librosLeidos.map((libro: LibroJSON) =>
      Libro.fromJson(libro)
    )

    console.log('Libros leídos:', this.libros)
  }

  trackByFn(index: number, item: Libro) {
    return item.id // Usamos el ID del libro para hacer tracking en el *ngFor
  }

  isModalOpen = false

  openModal() {
    console.log('Método openModal ejecutado') // Verificar si se ejecuta al hacer clic
    this.isModalOpen = true // Cambiar el estado para abrir el modal
  }

  closeModal() {
    this.isModalOpen = false // Cerrar el modal
  }
}
