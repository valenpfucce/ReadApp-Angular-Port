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
import { HttpErrorResponse } from '@angular/common/http'



@Component({
  selector: 'readapp-modal',
  standalone: true,
  imports: [
    CommonModule,
    CardLibroComponent,
    BarraBusquedaComponent,
    CardAmigoComponent,

  ],
  templateUrl: './modal.component.html',
  styleUrls: [
    '../../estilos_generales/cartas_libros.css',
    './modal.component.css'
  ]
})
export class ModalComponent implements OnInit {
  libros!: Libro[]
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
  mensajeError: string | null = null
  idActual!: number


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
    private amigoService: AmigosService,

  ) {}

  async ngOnInit(): Promise<void> {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    this.rutaActual = this.router.url
    this.obtenerDatosUsuario(userIdSS)

  }

  async obtenerDatosUsuario(userIdSS: number | null): Promise<void> {
    try{ const usuarioEnLinea = await this.userServiceUS.getUserById(userIdSS)
      this.usuarioActual = usuarioEnLinea
      this.idActual = usuarioEnLinea.id!

      if (this.usuarioActual) {

        await this.asignarTitulo();
      }

    }catch (error: unknown) {
      this.mostrarError(error)
    }

  }

  async asignarTitulo() {
    switch (this.rutaActual) {
      case '/perfil/libros_leidos':
        this.tituloModal = 'Libros Leidos'
        await this.loadLibrosLeidos()
        break
      case '/perfil/libros_a_leer':
        this.tituloModal = 'Libros a leer'
        await this.loadLibrosALeer()
        break
      case '/perfil/amigos':
        this.tituloModal = 'Todos los usuarios'
        await this.getUsuariosModal()
        break
      case '/recomendacion/' + this.recomendacionNum + '/edicion':
        this.tituloModal = 'Agregar Libros a Recomendación'
        await this.loadTodosLosLibros()
        const librosUserxId = this.usuarioActual.librosLeidos.map(
          (libro) => libro.id
        )
        this.libros = this.libros.filter((libro) =>
          librosUserxId.includes(libro.id)
        )
        break
      case '/recomendacion/nueva':
        this.tituloModal = 'Agregar Libros a Recomendación'
        await this.loadTodosLosLibros()
        const librosUserxIdN = this.usuarioActual.librosLeidos.map(
          (libro) => libro.id
        )
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
  async loadTodosLosLibros(): Promise<void> {
    this.libros = await this.librosService.obtenerTodosLosLibros()
    console.log('Estos son todos los libros', this.libros)
  }

  async loadLibrosALeer(): Promise<void> {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    try {
      this.librosALeer = await this.librosService.getLibrosALeer(userIdSS!)
    } catch (error) {
      this.mostrarError(error)
    }
  }

  async loadLibrosLeidos(): Promise<void> {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    try {
      this.librosLeidos = await this.librosService.getLibrosLeidosMenosTodos(
        userIdSS!
      )
    } catch (error) {
      this.mostrarError(error)
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
    }
    if (this.tituloModal == 'Libros Leidos'){
      this.librosLeidos = await this.librosService.busquedaLibros(
        evento.palabraABuscar
      )
      if (this.librosLeidos.length == 0) {
        this.noHay = true
      }
    }
    if (this.tituloModal == 'Libros a leer'){
      this.librosALeer = await this.librosService.busquedaLibros(
        evento.palabraABuscar
      )
      if (this.librosALeer.length == 0) {
        this.noHay = true
      }
    }else {
      this.libros = await this.librosService.busquedaLibros(
        evento.palabraABuscar
      )
      if (this.libros.length == 0) {
        this.noHay = true
      }
    }
  }

  async getUsuariosModal() {
    try {
      const amigosTODOS = await this.userServiceUS.getUsuariosCard()
      const amigosFiltroSesion = amigosTODOS.filter(
        (amigo) => amigo.id !== this.usuarioActual.id
      )
      const amigosFiltro = amigosFiltroSesion.filter(
        (amigo) => !this.usuarioActual.amigos.includes(amigo.id!)
      )
      this.amigos = amigosFiltro
    } catch (error: unknown) {
      this.mostrarError(error)
    }
  }

  seleccionarLibro(event: { libro: Libro; componente: CardLibroComponent }) {
    const { libro } = event;
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

    const rutas: string = this.getRutaKey(); // Función que obtiene una clave en función de la ruta actual

    const actions: { [key: string]: any } = {
      libros_leidos: async () => {
        try{
          await this.librosService.agregarLibrosLeidos(this.idActual);
        } catch  {
          //error si el back esta caido
          alert("No se pudo completar la operación.")
          this.router.navigate(['/**'])
        }
      },
      libros_a_leer: async () => {
        try {
          await this.librosService.agregarLibrosALeer(this.idActual);
        } catch  {
          //error si el back esta caido
          alert("No se pudo completar la operación.")
          this.router.navigate(['/**'])
        }
      },
      recomendacion_nueva: () => {
        this.librosEnviados.emit(this.librosSeleccionados);
      },
      recomendacion_edicion: () => {
        this.librosEnviados.emit(this.librosSeleccionados);
      },
      perfil_amigos: async () => {
        await this.amigoService.enviarNuevosAmigos(this.idActual);
      },
    }

    try {
      const action = actions[rutas];
      if (typeof action === 'function') {
        await action();
      }
    } catch (error: unknown) {
      this.mostrarError(error)
    }

    this.closeModal()
  }


  getRutaKey(): string {
    if (this.rutaActual.includes('libros_leidos')) return 'libros_leidos';
    if (this.rutaActual.includes('libros_a_leer')) return 'libros_a_leer';
    if (this.rutaActual.includes('/recomendacion/nueva')) return 'recomendacion_nueva';
    if (this.rutaActual.includes(`/recomendacion/${this.recomendacionNum}/edicion`)) return 'recomendacion_edicion';
    if (this.rutaActual.includes('/perfil/amigos')) return 'perfil_amigos';
    return '';
  }

  // Función para cargar el componente sin recargar toda la página

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

  mostrarError(error: unknown){
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this.mensajeError =
          'Error en el servidor. Por favor, inténtelo de nuevo mas tarde.'
      } else {
        this.mensajeError =
          error.error?.message || 'Ocurrió un error inesperado.'
      }
    } else {
      this.mensajeError = 'Ocurrió un error inesperado.'
    }
  }

}

