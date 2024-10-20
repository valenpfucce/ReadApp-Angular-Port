import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Usuario } from '../../domain/usuario'
import { UsuariosService } from '../../services/service_usuarios/usuarios.service'
import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service'
import {FormsModule} from "@angular/forms";
import {RecomendacionesService} from "../../services/service_recomendaciones/recomendaciones.service";
import {ValoracionDTO} from "../../domain/valoracion";

@Component({
  selector: 'readapp-moda-valoracion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './modal-valoracion.component.html',
  styleUrls: [
    '../../estilos_generales/cartas_libros.css',
    '../../estilos_generales/estilo_recomendacion.css',
    './modal-valoracion.component.css'
  ]
})
export class ModalValoracionComponent implements OnInit {
  tituloModal = ''
  usuarioActual!: Usuario
  descripcion!: string
  userIdSS !: number | null
  rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5]
  error: string = ''
  puedeValorar !: boolean

  @Input() isModalValoracionOpen: boolean = false
  @Input() recomendacionId !: number
  @Output() close = new EventEmitter<void>()

  constructor(
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService,
    private serviceRecomendacion : RecomendacionesService
  ) {}

  ngOnInit(){
    this.userIdSS = this.sessionStorage.obtenerIDuserSS()
    this.obtenerDatosUsuario(this.userIdSS)
    this.tituloModal = 'Agregar Valoración'
    this.puedeValorarLlamadaService()
  }

    async obtenerDatosUsuario(userIdSS : number | null ): Promise<void>{
      const usuarioEnLinea = await this.userServiceUS.getUserById(userIdSS)
      this.usuarioActual = usuarioEnLinea

    }

  valorar(star: number) {
    this.rating = star;
  }

  async puedeValorarLlamadaService(){
    if(this.userIdSS != null) {
      const puedeValorarSR = await this.serviceRecomendacion.puedeValorarRecomendacion(this.recomendacionId, this.userIdSS)
      this.puedeValorar = await puedeValorarSR
    }
  }


  closeModal() {
    this.close.emit()
  }

  async saveChanges() {
    if (this.rating === 0 || !this.descripcion.trim()) {
      this.error = 'Debe completar todos los campos'
      return
    }
    this.error = ''
    const valoracionAEnviar = new ValoracionDTO(this.userIdSS as number, this.rating, this.descripcion)
    await this.serviceRecomendacion.valorarRecomendacion(this.recomendacionId, valoracionAEnviar)
    this.closeModal()
    window.location.reload()
  }

  cancel() {
    this.closeModal()
  }
}
