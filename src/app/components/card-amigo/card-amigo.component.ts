import { AmigosService } from '../../services/service_amigos/amigos.service'
import { Usuario } from '../../domain/usuario'
import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CortarPalabraPipe } from '../../pipes/cortar-palabra-pipe/cortar-palabra.pipe'
import { RouterModule } from '@angular/router'
import { UsuariosService } from '../../services/service_usuarios/usuarios.service'
import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service'

@Component({
  selector: 'readapp-card-amigo',
  standalone: true,
  imports: [CommonModule, CortarPalabraPipe, RouterModule],
  templateUrl: './card-amigo.component.html',
  styleUrls: ['./card-amigo.component.css']
})
export class CardAmigoComponent {
  @Input() amigo!: Usuario
  @Input() esModal: boolean = false

  iduserActual: number = 0
  isActive: boolean = false
  isActiveTrash: boolean = false

  constructor(
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService,
    private amigoService: AmigosService
  ) {}

  ngOnInit() {
    const idUserSS = this.sessionStorage.obtenerIDuserSS()
    this.iduserActual = idUserSS!
  }

  toggleActive() {
    this.isActive = !this.isActive
  }

  toggleActivateTrash() {
    this.isActiveTrash = !this.isActiveTrash
  }

  async agregarAmigo(amigo: Usuario) {
    this.amigoService.stageAmigosPorGuardar.push(amigo)
  }

  async eliminarAmigo(amigo: Usuario) {
    await this.amigoService.eliminarAmigo(this.iduserActual, amigo.id!)
    window.location.reload()
  }


}
