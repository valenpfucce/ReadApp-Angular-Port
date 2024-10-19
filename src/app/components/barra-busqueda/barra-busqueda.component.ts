import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {UserSessionStorageService} from "../../services/service_user_session_storage/user-session-storage.service";


export interface BuscarEvento {
  palabraABuscar?:string
  idUsuario?: number
}

@Component({
  selector: 'readapp-barra-busqueda',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './barra-busqueda.component.html',
  styleUrl: './barra-busqueda.component.css'
})

export class BarraBusquedaComponent {
  @Output() buscarPalabra: EventEmitter<BuscarEvento> = new EventEmitter()
  @Output() filtrarPrivadas: EventEmitter<boolean> = new EventEmitter()
  palabraABuscar?: string
  idUsuario!: number
  @Input() showCheckBox = false
  mostrarPrivadas = false

  constructor(private sessionStorage: UserSessionStorageService) {
  }
  ngOnInit(){
    const idUsuarioAChequear = this.sessionStorage.obtenerIDuserSS()
    if (idUsuarioAChequear != null) {
      this.idUsuario = idUsuarioAChequear
    }
  }

  buscar(){
    const evento: BuscarEvento = {palabraABuscar: this.palabraABuscar, idUsuario: this.idUsuario }
    this.buscarPalabra.emit(evento)
  }

  soloPrivadas() {
    this.mostrarPrivadas = !this.mostrarPrivadas
    this.filtrarPrivadas.emit(this.mostrarPrivadas)
  }
}
