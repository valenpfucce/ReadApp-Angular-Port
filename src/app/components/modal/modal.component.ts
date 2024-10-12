import { Component, OnInit } from '@angular/core'
import { LibrosService } from '../../services/service_libros/libros.service'
import { Libro } from '../../domain/libro'
import { CommonModule } from '@angular/common'
import { CardLibroComponent } from '../card-libro/card-libro.component'
import { BarraBusquedaComponent } from '../header/components/barra-busqueda/barra-busqueda.component'

@Component({
  selector: 'readapp-modal',
  standalone: true,
  imports: [CommonModule, CardLibroComponent, BarraBusquedaComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  libros!: Libro[] // Array para almacenar los libros

  constructor(private librosService: LibrosService) {}

  async ngOnInit(): Promise<void> {
    await this.loadLibros() // Llama a la función para cargar los libros
  }

  async loadLibros(): Promise<void> {
    try {
      this.libros = await this.librosService.getLibros() // Obtiene los libros del servicio
      console.log('Libros cargados:', this.libros) // Verifica que los libros se carguen correctamente
    } catch (error) {
      console.error('Error al cargar los libros:', error) // Maneja errores
    }
  }
}
