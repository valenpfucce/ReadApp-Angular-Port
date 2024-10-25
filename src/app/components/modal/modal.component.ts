import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core'
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
  // librosTodos!: Libro[]
  librosALeer!: Libro[]
  librosLeidos!: Libro[]
  librosSeleccionados: Libro[] = []
  librosGuardados: Libro[] = []
  amigos!: Usuario[]
  rutaActual: String = ''
  tituloModal = ''
  usuarioActual!: Usuario
  noHay = false
  userIdSS = ''

  @Input() isModalOpen: boolean = false
  @Output() close = new EventEmitter<void>()
  @Output() librosEnviados = new EventEmitter<Libro[]>()
  @Input() recomendacionNum: number = 0
  @ViewChild('cardLibro') cardLibro!: CardLibroComponent

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
    this.rutaActual = this.router.url

    // Llama a la función dependiendo de la ruta
    if (
      this.rutaActual.includes('perfil/libros_leidos') ||
      this.rutaActual.includes(
        '/recomendacion/' + this.recomendacionNum + '/edicion'
      )
    ) {
      await this.loadLibrosLeidos()
    } else if (this.rutaActual.includes('perfil/libros_a_leer')) {
      await this.loadLibrosALeer()
    } else if (this.rutaActual.includes('/recomendacion/nueva')) {
      await this.loadTodosLosLibros()
    }
    await this.getUsuarios(userIdSS!)
    this.asignarTitulo()
  }

  async obtenerDatosUsuario(userIdSS: number | null): Promise<void> {
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
      case '/recomendacion/nueva':
        this.tituloModal = 'Agregar Libros a Recomendación'
        const librosUserxIdN = this.usuarioActual.librosLeidos.map(
          (libro) => libro.id
        )
        //eseta variable es de todos los libros, no haria falta filtrar
        this.libros = this.libros.filter((libro) =>
          librosUserxIdN.includes(libro.id)
        )
        break
      default:
        this.tituloModal = 'Ventana modal'
        break
    }
  }

  /* START PERFIL LIBROS LEIDOS Y A LEER */
  // VER DE NO REPETIR LÓGICA LLAMANDO AL SESION STORAGE
  async loadTodosLosLibros(): Promise<void> {
    //ACÁ DEBERÍA TRAER TODOS LOS LIBROS PARA USARLO EN OTRA PÁGINA
    //QUE SE NECESITE
    //EJEMPLO LA DE AGREGAR LIBROS A UNA RECOMENDACIÓN
    //PARA VER CON EMI DECUZZI
    // this.librosTodos = await this.librosService.obtenerTodosLosLibros()
  }

  async loadLibrosALeer(): Promise<void> {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    try {
      this.librosALeer = await this.librosService.getLibrosALeer(userIdSS!)
    } catch (error) {
      console.error('Error al cargar los libros en front:', error)
    }
  }

  async loadLibrosLeidos(): Promise<void> {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    try {
      this.librosLeidos = await this.librosService.getLibrosLeidosMenosTodos(
        userIdSS!
      )
    } catch (error) {
      console.error('Error al cargar los libros en front:', error)
    }
  }
  /* END PERFIL LIBROS LEIDOS Y A LEER */

  async buscar(evento: BuscarEvento): Promise<void> {
    this.noHay = false
    if (this.tituloModal == 'Todos los usuarios') {
      console.log(false)
      this.amigos = await this.userServiceUS.getUsuariosCard(
        evento.palabraABuscar
      )
      if (this.amigos.length == 0) {
        this.noHay = true
      }
    } else {
      this.libros = await this.librosService.busquedaLibros(
        evento.palabraABuscar
      )
      if (this.libros.length == 0) {
        this.noHay = true
      }
    }
  }

  async getUsuarios(idActual: number) {
    const amigosTODOS = await this.userServiceUS.getUsuariosCard()
    const amigosFiltroSesion = amigosTODOS.filter(
      (amigo) => amigo.id !== this.usuarioActual.id
    )
    const amigosFiltro = amigosFiltroSesion.filter(
      (amigo) => !this.usuarioActual.amigos.includes(amigo.id!)
    )
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

  async saveChanges() {
    //SUMAR LÓGICA PARA MANDAR LOS AMIGOS AL BACK SI ESTÁ EN LA RUTA DE AMIGOS
    //VER DE NO VOLVER A REPETIR EL PEDIDO EN EL SESION STORAGE
    const userIdSS = this.sessionStorage.obtenerIDuserSS()

    if (userIdSS != null) {
      try {
        if (this.rutaActual.includes('libros_leidos')) {
          await this.librosService.agregarLibrosLeidos(userIdSS)
          console.log('Libros leídos actualizados')
        } else if (this.rutaActual.includes('libros_a_leer')) {
          await this.librosService.agregarLibrosALeer(userIdSS)
          console.log('Libros a leer actualizados')
        }
      } catch (error) {
        console.error('error al actualizar los libros', error)
      }
    }
    this.closeModal()
    window.location.reload()
  }

  cancel() {
    this.closeModal()
    this.amigoService.stageAmigosPorGuardar.splice(
      0,
      this.amigoService.stageAmigosPorGuardar.length
    )
  }

  llamarALibroAgregar(cardLibro: CardLibroComponent, libro: Libro) {
    this.cardLibro.agregarLibro(libro)
  }
}
