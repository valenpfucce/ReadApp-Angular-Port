import { Component, OnInit } from '@angular/core'
import { HeaderComponent } from '../../../../components/header/header.component'
import { SidebarPerfilComponent } from '../../sidebar-perfil.component'
import { CardLibroComponent } from '../../../../components/card-libro/card-libro.component'
import { CardLibroMasComponent } from '../../../../components/card-libro-mas/card-libro-mas.component'
import { ModalComponent } from '../../../../components/modal/modal.component'
import { CommonModule } from '@angular/common'
import { Usuario } from '../../../../domain/usuario'
import { Libro } from '../../../../domain/libro'
import { UserSessionStorageService } from '../../../../services/service_user_session_storage/user-session-storage.service'
import { UsuariosService } from '../../../../services/service_usuarios/usuarios.service'

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
    '../../../../pages/pag-recomendacion/pag-recomendacion.component.css',
    '../../../../components/card-libro/card-libro.component.css',
    '../perfil-amigos/perfil-amigos.component.css',
    './perfil-libros-leidos.component.css'
  ]
})
export class PerfilLibrosLeidosComponent implements OnInit {
  palabraABuscar: string = ''
  librosLeidos!: Libro[]
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
      this.cargarLibrosLeidos(userIdSS)
    } else {
      console.error('El userId es nulo')
    }
  }

  async cargarLibrosLeidos(userIdSS: number) {
    this.userActive = userIdSS

    const usuario = await this.userServiceUS.getUserById(userIdSS)
    this.librosLeidos = usuario.librosLeidos.map((libro) => {
      return Libro.fromBackend(libro)
    })
  }

  openModal() {
    this.isModalOpen = true
  }

  closeModal() {
    this.isModalOpen = false
    this.cargarLibrosLeidos(this.userActive)
  }

  reload() {
    window.location.reload()
  }
}
