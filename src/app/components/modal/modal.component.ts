import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { LibrosService } from '../../services/service_libros/libros.service'
import { Libro } from '../../domain/libro'
import { CommonModule } from '@angular/common'
import { CardLibroComponent } from '../card-libro/card-libro.component'
import { BarraBusquedaComponent } from '../barra-busqueda/barra-busqueda.component'
import { CardAmigoComponent } from '../card-amigo/card-amigo.component';
import { Router } from '@angular/router';
import { Usuario } from '../../domain/usuario'
import { UsuariosService } from '../../services/service_usuarios/usuarios.service'

@Component({
  selector: 'readapp-modal',
  standalone: true,
  imports: [CommonModule, CardLibroComponent, BarraBusquedaComponent,CardAmigoComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['../../estilos_generales/cartas_libros.css', './modal.component.css']
})
export class ModalComponent implements OnInit {
  libros!: Libro[]
  librosSeleccionados: Libro[] = []
  librosGuardados: Libro[] = []
  amigos!: Usuario[]
  rutaActual: String = ''
  
 

  @Input() isModalOpen: boolean = false // Aquí declaras la propiedad como Input
  @Output() close = new EventEmitter<void>()
  @Output() librosEnviados = new EventEmitter<Libro[]>()
  // @Output() esModal:EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private librosService: LibrosService,private router: Router,private userServiceUS: UsuariosService) {}

  async ngOnInit(): Promise<void> {
    await this.loadLibros() // Llama a la función para cargar los libros
    this.rutaActual = this.router.url
    console.log("ruta actual", this.rutaActual)
    this.getUsuarios
  }
  
  // cambioesModal(){

  //   this.esModal.emit(true) 
    
  // }
 

  async loadLibros(): Promise<void> {
    try {
      this.libros = await this.librosService.getLibros() // Obtiene los libros del servicio
      console.log('Libros cargados en front:', this.libros) // Verifica que los libros se carguen correctamente
    } catch (error) {
      console.error('Error al cargar los libros en front:', error)
    }
  }
  
  async getUsuarios(){
    console.log("entra en getUser")
    this.amigos = await this.userServiceUS.getUsuariosCard()
   

  }
  
  seleccionarLibro(libro: Libro) {
    const index = this.librosSeleccionados.indexOf(libro);
    if (index === -1) {

      // Si no esta en la lista, lo agrego
      this.librosSeleccionados.push(libro)
    } else {
      // Si está en la lista, lo saco
      this.librosSeleccionados.splice(index, 1)
    }
    console.log(this.librosSeleccionados)
  }

  closeModal() {
    this.close.emit()
  }

  saveChanges() {
    console.log('Libros seleccionados guardados:', this.librosSeleccionados)
    this.librosGuardados = this.librosSeleccionados
    this.librosEnviados.emit(this.librosGuardados)
    this.librosSeleccionados = []
    this.closeModal()
  }

  cancel() {
    console.log('Cambios cancelados')
    this.closeModal()
  }
}
