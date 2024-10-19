import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Usuario } from '../../domain/usuario'
import { UsuariosService } from '../../services/service_usuarios/usuarios.service'
import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service'

@Component({
  selector: 'readapp-moda-valoracion',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './modal-valoracion.component.html',
  styleUrls: [
    '../../estilos_generales/cartas_libros.css',
    './modal-valoracion.component.css'
  ]
})
export class ModalValoracionComponent implements OnInit {
  tituloModal = ''
  usuarioActual!: Usuario

  @Input() isModalValoracionOpen: boolean = false
  @Output() close = new EventEmitter<void>()

  constructor(
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService
  ) {}

  async ngOnInit(): Promise<void> {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    this.obtenerDatosUsuario(userIdSS)
    this.tituloModal = 'Agregar Valoración'
  }

    async obtenerDatosUsuario(userIdSS : number | null ): Promise<void>{
      const usuarioEnLinea = await this.userServiceUS.getUserById(userIdSS)
      this.usuarioActual = usuarioEnLinea

    }

  closeModal() {
    this.close.emit()
  }

  saveChanges() {
    this.closeModal()
  }

  cancel() {
    this.closeModal()
  }
}
