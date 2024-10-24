import { Component, EventEmitter, Input, Output } from '@angular/core'
import { JoinListaGuionPipe } from '../../pipes/join_lista_guion_pipe/join-lista-guion.pipe'
import { CortarPalabraPipe } from '../../pipes/cortar-palabra-pipe/cortar-palabra.pipe'
import { Libro } from '../../domain/libro'
import { CommonModule } from '@angular/common'
import { UsuariosService } from '../../services/service_usuarios/usuarios.service'
import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service'

@Component({
  selector: 'readapp-card-libro',
  standalone: true,
  imports: [JoinListaGuionPipe, CortarPalabraPipe, CommonModule],
  templateUrl: './card-libro.component.html',
  styleUrl: '../../estilos_generales/cartas_libros.css'
})
export class CardLibroComponent {
  @Input() libro!: Libro
  @Input() modo!: 'detalle' | 'edicion' | 'nueva'
  @Input() esModal: boolean = false
  @Input() esPerfil: boolean = false
  @Input() tipoPerfil!: 'aleer' | 'leidos'
  @Output() libroABorrar = new EventEmitter<Libro>()

  constructor(
    private sessionStorage: UserSessionStorageService,
    private userServiceUS: UsuariosService
  ) {}

  mostrarBotonBorrar() {
    return this.modo === 'edicion' || this.modo === 'nueva'
  }

  esTrending() {
    return this.libro.esDesafiante
  }

  esBestSeller() {
    return this.libro.esBestSeller
  }

  borrarLibro() {
    this.libroABorrar.emit(this.libro)
  }

  agregarLibro(libro: Libro) {
    if (this.tipoPerfil == 'aleer') {
      this.agregarLibroALeer(libro)
    } else {
      this.agregarLibrosLeidos(libro)
    }
  }

  eliminarLibro(libro: Libro) {
    if (this.tipoPerfil == 'aleer') {
      this.eliminarLibrosALeer(libro)
    } else {
      this.eliminarLibrosLeidos(libro)
    }
  }

  async agregarLibroALeer(libro: Libro) {
    this.userServiceUS.listaAgregarALeer.push(libro)
  }

  async eliminarLibrosALeer(libro: Libro) {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    if (userIdSS != null) {
      this.userServiceUS.listaEliminarALeer.push(libro)
      await this.userServiceUS.actualizarLibrosALeer(userIdSS)
      window.location.reload()
    }
  }

  async agregarLibrosLeidos(libro: Libro) {
    this.userServiceUS.listaAgregarLeidos.push(libro)
  }

  async eliminarLibrosLeidos(libro: Libro) {
    this.userServiceUS.listaEliminarLeidos.push(libro)
  }
}
