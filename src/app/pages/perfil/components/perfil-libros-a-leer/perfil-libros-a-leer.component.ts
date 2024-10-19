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
  librosALeer!: Libro[]
  modo!: 'detalle' | 'edicion'
  isModalOpen = false
  userIdSS!: number

  constructor(
    private librosService: LibrosService,
    private sessionStorage: UserSessionStorageService,
    private userServiceUS: UsuariosService
  ) {}

  async ngOnInit() {
    const user = this.sessionStorage.obtenerIDuserSS()
    console.log(user)

    if (user != null) {
      this.cargarLibrosALeer(user)
    } else {
      console.error('El userId es nulo')
    }
  }

  async cargarLibrosALeer(userIdSS: number) {
    this.userIdSS = userIdSS
    try {
      const usuario = await this.userServiceUS.getUserById(userIdSS)
      console.log('Datos originales del backend:', usuario.librosPorLeer)
      this.librosALeer = usuario.librosPorLeer.map((libroBackend: any) =>
        Libro.fromBackend(libroBackend)
      )
      console.log('Libros transformados:', this.librosALeer)
    } catch (error) {
      console.error('Error al cargar la lista de libros por leer:', error)
    }
  }

  openModal() {
    this.isModalOpen = true
  }

  closeModal() {
    this.isModalOpen = false
    console.log('Libros Recibidossssssssssss:', this.librosRecibidos)
  }

  recibirLibros(libros: Libro[]) {
    this.librosRecibidos = libros
  }

  quitarLibro(libro: Libro) {
    const index = this.librosALeer.findIndex(l => l.id === libro.id);

    // Verifica que el libro existe en la lista antes de eliminarlo
    if (index !== -1) {
      this.librosALeer.splice(index, 1);
    }
  }

  async saveChanges() {
    const librosIDs = this.librosRecibidos.map((libro) => libro.id)

    try {
      await this.userServiceUS.agregarLibrosALeer(this.userIdSS, librosIDs)
      console.log('Libros añadidos correctamente a la lista de libros por leer')
      // this.reloadPage()
    } catch (error) {
      console.error(
        'Error al agregar los libros o al obtener la lista actualizada:',
        error
      )
    }
  }

  reloadPage() {
    window.location.reload()
  }
}
