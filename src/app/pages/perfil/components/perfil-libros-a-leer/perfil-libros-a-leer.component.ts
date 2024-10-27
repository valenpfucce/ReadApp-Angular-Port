import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { HeaderComponent } from '../../../../components/header/header.component'
import { SidebarPerfilComponent } from '../../sidebar-perfil.component'
import { CardLibroComponent } from '../../../../components/card-libro/card-libro.component'
import { Libro } from '../../../../domain/libro'
import { UserSessionStorageService } from '../../../../services/service_user_session_storage/user-session-storage.service'
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
  librosALeer!: Libro[]
  modo!: 'detalle' | 'edicion'
  userIdSS!: number
  isModalOpen = false
  userActive!: number

  constructor(
    private sessionStorage: UserSessionStorageService,
    private userServiceUS: UsuariosService
  ) {}

  async ngOnInit() {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    if (userIdSS != null) {
      this.cargarLibrosALeer(userIdSS)
    }
  }

  async cargarLibrosALeer(userIdSS: number): Promise<Libro[]> {
    this.userActive = userIdSS
    const usuario = await this.userServiceUS.getUserById(userIdSS)

    this.librosALeer = usuario.librosPorLeer.map((libroBackend: any) => {
      return Libro.fromBackend(libroBackend)
    })
    return this.librosALeer
  }

  openModal() {
    this.isModalOpen = true
  }

  closeModal() {
    this.isModalOpen = false
    this.cargarLibrosALeer(this.userActive)
  }

  reload() {
    window.location.reload()
  }
}
