import { Component, EventEmitter, Input, Output } from '@angular/core'
import { JoinListaGuionPipe } from '../../pipes/join_lista_guion_pipe/join-lista-guion.pipe'
import { CortarPalabraPipe } from '../../pipes/cortar-palabra-pipe/cortar-palabra.pipe'
import { Libro } from '../../domain/libro'
import { CommonModule } from '@angular/common'
import { UsuariosService } from '../../services/service_usuarios/usuarios.service'

@Component({
  selector: 'readapp-card-libro',
  standalone: true,
  imports: [JoinListaGuionPipe, CortarPalabraPipe, CommonModule],
  templateUrl: './card-libro.component.html',
  styleUrl: '../../estilos_generales/cartas_libros.css'
})
export class CardLibroComponent {
  librosSeleccionados: Libro[] = []
  isActive: boolean = false
  isActiveTrash: boolean = false

  @Input() libro!: Libro
  @Input() modo!: 'detalle' | 'edicion' | 'nueva'
  @Input() esModal: boolean = false
  @Input() esPerfil: boolean = false
  @Input() tipoPerfil!: 'aleer' | "leidos"
  @Output() libroABorrar = new EventEmitter<Libro>()

  constructor(private userServiceUS: UsuariosService) {}

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

  toggleActive() {
    this.isActive = !this.isActive
  }

  toggleActivateTrash() {
    this.isActiveTrash = !this.isActiveTrash
  }

  agregarLibro(libro : Libro) {
    console.log("tipoPerfil", this.tipoPerfil)
    if(this.tipoPerfil == 'aleer'){
      console.log("Entro a agregar L a leer", libro)
      this.agregarLibroALeer(libro)
    }else{
      console.log("Entro a agregar L leido",libro)
      this.agregarLibrosLeidos(libro)
    }
  }

  eliminarLibro(libro : Libro) {
    console.log("tipoPerfil", this.tipoPerfil)
    if(this.tipoPerfil == 'aleer'){
      console.log("Entro a eliminar L a leer")
      this.eliminarLibrosALeer(libro)
    }else{
      console.log("Entro a eliminar L leidos")
      this.eliminarLibrosLeidos(libro)
    }
  }

  async agregarLibroALeer(libro: Libro) {
    this.userServiceUS.listaAgregarALeer.push(libro)
  }

  async eliminarLibrosALeer(libro: Libro) {
    this.userServiceUS.listaEliminarALeer.push(libro)
  }

  async agregarLibrosLeidos(libro: Libro) {
    this.userServiceUS.listaAgregarLeidos.push(libro)
  }

  async eliminarLibrosLeidos(libro: Libro) {
    this.userServiceUS.listaEliminarLeidos.push(libro)
  }
}
