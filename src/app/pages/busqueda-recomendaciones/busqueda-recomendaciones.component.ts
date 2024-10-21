import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CardRecomendacionComponent } from '../../components/card-recomendacion/card-recomendacion.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RecomendacionesService } from '../../services/service_recomendaciones/recomendaciones.service';
import { Recomendacion } from '../../domain/recomendacion';
import { DataBusqueda } from '../../app.routes';
import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service';
import { Usuario } from '../../domain/usuario';
import {BarraBusquedaComponent, BuscarEvento} from '../../components/barra-busqueda/barra-busqueda.component';
import { CardLibroMasComponent } from "../../components/card-libro-mas/card-libro-mas.component";
import { UsuariosService } from '../../services/service_usuarios/usuarios.service';

@Component({
  selector: 'readapp-busqueda-recomendaciones',
  standalone: true,
  imports: [HeaderComponent, CardRecomendacionComponent, BarraBusquedaComponent, CardLibroMasComponent],
  templateUrl: './busqueda-recomendaciones.component.html',
  styleUrl: './busqueda-recomendaciones.component.css'
})
export class BusquedaRecomendacionesComponent {
  idUsuario!: number;
  data!: DataBusqueda
  recomendaciones!: Recomendacion[]
  recomendacionesFiltradas!: Recomendacion[]
  noHayRecomendaciones = false
  constructor(
    private route : ActivatedRoute,
    private serviceRecomendaciones: RecomendacionesService,
    private sessionStorage: UserSessionStorageService
  ){}

  ngOnInit() {
    const idUsuarioAChequear = this.sessionStorage.obtenerIDuserSS()
    this.data = this.route.snapshot.data as DataBusqueda
    if (idUsuarioAChequear != null) {
      this.idUsuario = idUsuarioAChequear
      const evento: BuscarEvento = {palabraABuscar: undefined, idUsuario: this.idUsuario }
      this.buscar(evento)
    }
  }

  async buscar(evento: BuscarEvento) {
    this.noHayRecomendaciones = false
    this.recomendaciones = await this.data.realizarBusqueda(
      this.serviceRecomendaciones,
      evento.palabraABuscar,
      evento.idUsuario
    )
    this.recomendacionesFiltradas = [...this.recomendaciones]
    if(this.recomendacionesFiltradas.length == 0){
      this.noHayRecomendaciones = true
    }
  }

  filtrarRecomendacionesPrivadas(mostrarPrivadas: boolean) {
    if(mostrarPrivadas){
      this.recomendacionesFiltradas = this.recomendaciones.filter(recomendacion => !recomendacion.esPublica)
    }
    else {
      this.recomendacionesFiltradas = [...this.recomendaciones]
    }

    return this.recomendacionesFiltradas
  }
}
