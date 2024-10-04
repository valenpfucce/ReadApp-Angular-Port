import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { HeaderComponent } from "../../header.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'readapp-barra-busqueda',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './barra-busqueda.component.html',
  styleUrl: './barra-busqueda.component.css'
})
export class BarraBusquedaComponent {
  @Output() buscarPalabra: EventEmitter<string> = new EventEmitter()
  palabraABuscar?: string
  @Input() showCheckBox = false

  buscar(){
    this.buscarPalabra.emit(this.palabraABuscar)
  }
}
