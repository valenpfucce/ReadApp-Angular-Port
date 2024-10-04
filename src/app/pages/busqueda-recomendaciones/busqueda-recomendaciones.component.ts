import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CardRecomendacionComponent } from '../../components/card-recomendacion/card-recomendacion.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RecomendacionesService } from '../../services/service_recomendaciones/recomendaciones.service';
import { Recomendacion } from '../../domain/recomendacion';
import { DataBusqueda } from '../../app.routes';
import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service';
import { Usuario } from '../../domain/usuario';
import { BarraBusquedaComponent } from '../../components/header/components/barra-busqueda/barra-busqueda.component';
import { CardLibroMasComponent } from "../../components/card-libro-mas/card-libro-mas.component";

@Component({
  selector: 'readapp-busqueda-recomendaciones',
  standalone: true,
  imports: [HeaderComponent, CardRecomendacionComponent, BarraBusquedaComponent, CardLibroMasComponent],
  templateUrl: './busqueda-recomendaciones.component.html',
  styleUrl: './busqueda-recomendaciones.component.css'
})
export class BusquedaRecomendacionesComponent {
  usuario!: Usuario
  data!: DataBusqueda
  recomendaciones!: Recomendacion[]
  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private serviceRecomendaciones: RecomendacionesService,
    private userServiceSS: UserSessionStorageService
  ){}

  ngOnInit(){
    this.usuario = this.userServiceSS.obtenerUsuarioDelSS();

    this.data = this.route.snapshot.data as DataBusqueda
    this.recomendaciones = this.data.realizarBusqueda(
      this.serviceRecomendaciones,
      undefined,
      undefined
    )
  }

  puedeEditarRecomendacion(recomendacion : Recomendacion) : Boolean{
    return recomendacion.creadorId === this.usuario.id
  }
  
  buscar(palabraABuscar?: string){
    this.recomendaciones = this.data.realizarBusqueda(
      this.serviceRecomendaciones,
      palabraABuscar
    )
  }

  navegarA(ruta : string) {
    this.router.navigate([ruta])
  }
}
