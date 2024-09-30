import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CardRecomendacionComponent } from '../../components/card-recomendacion/card-recomendacion.component';
import { BarraBusquedaComponent } from "../../components/barra-busqueda/barra-busqueda.component";
import { ActivatedRoute } from '@angular/router';
import { RecomendacionesService } from '../../services/service_recomendaciones/recomendaciones.service';
import { Recomendacion } from '../../domains/recomendacion';
import { DataBusqueda } from '../../app.routes';

@Component({
  selector: 'readapp-busqueda-recomendaciones',
  standalone: true,
  imports: [HeaderComponent, CardRecomendacionComponent, BarraBusquedaComponent],
  templateUrl: './busqueda-recomendaciones.component.html',
  styleUrl: './busqueda-recomendaciones.component.css'
})
export class BusquedaRecomendacionesComponent {
  data!: DataBusqueda
  recomendaciones!: Recomendacion[]
  constructor(
    public route: ActivatedRoute,
    public serviceRecomendaciones: RecomendacionesService
  ){}

  ngOnInit(){
    this.data = this.route.snapshot.data as DataBusqueda
    this.recomendaciones = this.data.realizarBusqueda(
      this.serviceRecomendaciones,
      undefined
    )
  }
  
  buscar(palabraABuscar?: string){
    this.recomendaciones = this.data.realizarBusqueda(
      this.serviceRecomendaciones,
      palabraABuscar
    )
  }
}
