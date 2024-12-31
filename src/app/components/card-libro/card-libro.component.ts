import { Component, EventEmitter, Input, Output } from '@angular/core'
import { JoinListaGuionPipe } from '../../pipes/join_lista_guion_pipe/join-lista-guion.pipe'
import { CortarPalabraPipe } from '../../pipes/cortar-palabra-pipe/cortar-palabra.pipe'
import { Libro } from '../../domain/libro'
import { CommonModule } from '@angular/common'
import { UsuariosService } from '../../services/service_usuarios/usuarios.service'
import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service'
import { LibrosService } from '../../services/service_libros/libros.service'
import { Router } from '@angular/router'

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
  @Output() libroClicked = new EventEmitter<{ libro: Libro; componente: CardLibroComponent }>()
  selectedCard : boolean = false


  constructor(
    private librosService: LibrosService,
    private sessionStorage: UserSessionStorageService,
    private userServiceUS: UsuariosService,
    private router: Router
  ) {}

  emitLibro() {
    this.selectedCard = !this.selectedCard
    this.libroClicked.emit({ libro: this.libro, componente: this })
  }

  get outputClassCard(): string {
    if(this.esModal){
      return this.selectedCard ? "carta carta-seleccionada carta-seleccionada-pointer" : "carta carta-seleccionada-pointer";
    } else {
      return "carta"
    }
  }

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
    this.librosService.listaAgregarALeer.push(libro)
  }

  async eliminarLibrosALeer(libro: Libro) {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()

    this.librosService.listaEliminarALeer.push(libro)
    try {
      await this.librosService.eliminarLibrosALeer(userIdSS!)
      window.location.reload()
    } catch {
      alert("No se pudo completar la operación.")
      this.router.navigate(['/**'])
    }
    
  }

  async agregarLibrosLeidos(libro: Libro) {
    this.librosService.listaAgregarLeidos.push(libro)
  }

  async eliminarLibrosLeidos(libro: Libro) {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    this.librosService.listaEliminarLeidos.push(libro)
    try {
      await this.librosService.eliminarLibrosLeidos(userIdSS!)
    window.location.reload()
    } catch {
      alert("No se pudo completar la operación.")
      this.router.navigate(['/**'])
    }
    
  }
}
