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
  @Input() modo!: 'detalle' | 'edicion'
  @Input() esModal: boolean = false
  @Output() libroABorrar = new EventEmitter<Libro>()

  constructor(private userServiceUS: UsuariosService) {}

  //PRUEBA PARA VER SI ME IMPRIME, ELIMINARLO
  ngOnInit() {}

  mostrarBotonBorrar() {
    return this.modo === 'edicion'
  }

  esTrending() {
    //Aca tendria que hacer el calculo con las ventas semanales, hacerlo en el front o back???
    return true
  }

  esBestSeller() {
    //Aca tendria que hacer el calculo de si es best seller, hacerlo en el front o back???
    return true
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

  async agregarLibroALeer(libro: Libro) {
    this.userServiceUS.listaAgregarALeer.push(libro)
  }

  async eliminarLibrosALeer(libro: Libro) {
    this.userServiceUS.listaEliminarALeer.push(libro)
  }
}
