import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { LibrosService } from '../../services/service_libros/libros.service'
import { Libro } from '../../domain/libro'
import { CommonModule } from '@angular/common'
import { CardLibroComponent } from '../card-libro/card-libro.component'
import {
  BarraBusquedaComponent,
  BuscarEvento
} from '../barra-busqueda/barra-busqueda.component'
import { CardAmigoComponent } from '../card-amigo/card-amigo.component'
import { Router } from '@angular/router'
import { Usuario } from '../../domain/usuario'
import { UsuariosService } from '../../services/service_usuarios/usuarios.service'
import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service'
import { AmigosService } from '../../services/service_amigos/amigos.service'

@Component({
  selector: 'readapp-modal',
  standalone: true,
  imports: [
    CommonModule,
    CardLibroComponent,
    BarraBusquedaComponent,
    CardAmigoComponent
  ],
  templateUrl: './modal.component.html',
  styleUrls: [
    '../../estilos_generales/cartas_libros.css',
    './modal.component.css'
  ]
})
export class ModalComponent implements OnInit {
  libros!: Libro[]
  librosSeleccionados: Libro[] = []
  librosGuardados: Libro[] = []
  amigos!: Usuario[]
  rutaActual: String = ''
  tituloModal = ''
  usuarioActual!: Usuario


  @Input() isModalOpen: boolean = false
  @Output() close = new EventEmitter<void>()
  @Output() librosEnviados = new EventEmitter<Libro[]>()
  @Input() recomendacionNum: number = 0

  constructor(
    private librosService: LibrosService,
    private router: Router,
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService,
    private amigoService: AmigosService
  ) {}

  async ngOnInit(): Promise<void> {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    this.obtenerDatosUsuario(userIdSS)
    await this.loadLibros() // Llama a la función para cargar los libros

    this.rutaActual = this.router.url
    await this.getUsuarios(userIdSS!)
    this.asignarTitulo()
  }
   
  async obtenerDatosUsuario(userIdSS : number | null ): Promise<void>{
    const usuarioEnLinea = await this.userServiceUS.getUserById(userIdSS)
    this.usuarioActual = usuarioEnLinea
   
  }


  asignarTitulo() {
    switch (this.rutaActual) {
      case '/perfil/libros_leidos':
        this.tituloModal = 'Libros Leidos'
        break
      case '/perfil/libros_a_leer':
        this.tituloModal = 'Libros a leer'
        break
      case '/perfil/amigos':
        this.tituloModal = 'Todos los usuarios'
        break
      case '/recomendacion/' + this.recomendacionNum + '/edicion':
        this.tituloModal = 'Agregar Libros a Recomendación'
        break
      default:
        this.tituloModal = 'Ventana modal'
        break
    }
  }

  async loadLibros(): Promise<void> {
    try {
      this.libros = await this.librosService.busquedaLibros(undefined)
    } catch (error) {
      console.error('Error al cargar los libros en front:', error)
    }
  }

  async buscar(evento: BuscarEvento): Promise<void> {
    if (this.tituloModal == 'Todos los usuarios') {
      console.log(false)
      this.amigos = await this.userServiceUS.getUsuariosCard(
        evento.palabraABuscar
      )
    } else {
      this.libros = await this.librosService.busquedaLibros(
        evento.palabraABuscar
      )
    }
  }

  async getUsuarios(idActual: number) {
    const amigosTODOS = await this.userServiceUS.getUsuariosCard()
    const amigosFiltroSesion = amigosTODOS.filter((amigo) => amigo.id !== this.usuarioActual.id)
    const amigosFiltro = amigosFiltroSesion.filter((amigo) => !this.usuarioActual.amigos.includes(amigo.id!))
    this.amigos = amigosFiltro
  }


  seleccionarLibro(libro: Libro) {
    const index = this.librosSeleccionados.indexOf(libro)
    if (index === -1) {
      // Si no esta en la lista, lo agrego
      this.librosSeleccionados.push(libro)
    } else {
      // Si está en la lista, lo saco
      this.librosSeleccionados.splice(index, 1)
    }
    //tengo que hacer la funcion de manejo de errores
    console.log(this.librosSeleccionados)
  }

  closeModal() {
    this.close.emit()
  }

  saveChanges() {
    this.librosGuardados = this.librosSeleccionados
    this.librosEnviados.emit(this.librosGuardados)

    /* tengo que hacer la logica de que cuando aprieto guardar cambios del modal
    las cards seleccionadas se muestren en el perfil libros leidos.
    y cuando aprieto guardar cambios del perfil el boton guardar cambios del perfil,
    los libros que seleccione se manden al back */

    this.librosSeleccionados.forEach((libro) =>
      this.librosService.agregarALibrosLeidos(libro.id, this.usuarioActual.id!)
    )

    this.librosSeleccionados = []
    this.closeModal()
  }

  cancel() {
    this.closeModal()
    this.amigoService.stageAmigosPorGuardar.splice(0, this.amigoService.stageAmigosPorGuardar.length);

  }
}
