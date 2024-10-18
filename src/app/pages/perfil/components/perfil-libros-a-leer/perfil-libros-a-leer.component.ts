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
  templateUrl: './perfil-libros-a-leer.component.html',
  styleUrls: [
    '../../../../estilos_generales/estilo_recomendacion.css',
    '../../../../pages/pag-recomendacion/pag-recomendacion.component.css',
    '../../../../components/card-libro/card-libro.component.css',
    '../perfil-amigos/perfil-amigos.component.css',
    './perfil-libros-a-leer.component.css'
  ]
})
export class PerfilLibrosALeerComponent implements OnInit {
  palabraABuscar: string = ''
  usuario!: Usuario
  libros: Libro[] = []
  librosRecibidos: Libro[] = []
  modo!: 'detalle' | 'edicion'
  isModalOpen = false

  constructor(
    private librosService: LibrosService,
    private sessionStorage: UserSessionStorageService,
    private userServiceUS: UsuariosService
  ) {}

  ngOnInit() {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    this.obtenerDatosUsuario(userIdSS)
    if (userIdSS) {
      this.obtenerDatosUsuario(userIdSS)
    } else {
      console.error('Usuario ID no disponible en la sesión.')
    }
  }

  async obtenerDatosUsuario(userIdSS: number | null): Promise<void> {
    const usuarioEnLinea = await this.userServiceUS.getUserId(userIdSS)

    if (usuarioEnLinea) {
      this.usuario = usuarioEnLinea
      console.log('Usuario cargado correctamente:', this.usuario)
    } else {
      console.error('No se pudo cargar el usuario.')
    }
  }

  trackByFn(index: number, item: Libro) {
    return item.id // Usamos el ID del libro para hacer tracking en el *ngFor
  }

  openModal() {
    this.isModalOpen = true
  }

  closeModal() {
    this.isModalOpen = false
    console.log('Libros Recibidos:', this.librosRecibidos)
  }

  recibirLibros(libros: Libro[]) {
    this.librosRecibidos = libros
  }

  // Fusionamos las listas de libros (los actuales y los nuevos) eliminando duplicados.
  fusionarListasLibros(
    librosActuales: Libro[],
    librosRecibidos: Libro[]
  ): Libro[] {
    const librosUnicos = new Map<number, Libro>()

    // Agregamos los libros actuales al mapa (clave es el id del libro)
    librosActuales.forEach((libro) => {
      librosUnicos.set(libro.id, libro)
    })

    // Agregamos los nuevos libros, solo si no están ya en la lista
    librosRecibidos.forEach((libro) => {
      if (!librosUnicos.has(libro.id)) {
        librosUnicos.set(libro.id, libro)
      }
    })

    // Convertimos el mapa de vuelta en un array
    return Array.from(librosUnicos.values())
  }
}
