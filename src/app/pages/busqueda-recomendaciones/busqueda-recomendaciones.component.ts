import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CardRecomendacionComponent } from '../../components/card-recomendacion/card-recomendacion.component';
import { BarraBusquedaComponent } from "../../components/barra-busqueda/barra-busqueda.component";
import { ActivatedRoute } from '@angular/router';
import { RecomendacionesService } from '../../services/service_recomendaciones/recomendaciones.service';
import { Recomendacion } from '../../domains/recomendacion';

@Component({
  selector: 'readapp-busqueda-recomendaciones',
  standalone: true,
  imports: [HeaderComponent, CardRecomendacionComponent, BarraBusquedaComponent],
  templateUrl: './busqueda-recomendaciones.component.html',
  styleUrl: './busqueda-recomendaciones.component.css'
})
export class BusquedaRecomendacionesComponent {
  visible!: boolean
  recomendaciones!: Recomendacion[]
  constructor(
    public route: ActivatedRoute,
    public serviceRecomendaciones: RecomendacionesService
  ){}

  ngOnInit(){
    this.recomendaciones = this.serviceRecomendaciones.listar_recomendaciones()
    // this.visible = this.route.paramMap.esCheckbox as boolean
  }  
}
