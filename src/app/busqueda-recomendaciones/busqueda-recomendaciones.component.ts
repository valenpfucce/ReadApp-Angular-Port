import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CardRecomendacion, CardRecomendacionComponent } from '../card-recomendacion/card-recomendacion.component';
import { BarraBusquedaComponent } from "../barra-busqueda/barra-busqueda.component";
import { ActivatedRoute } from '@angular/router';
import { RecomendacionesService } from '../services/recomendaciones.service';

@Component({
  selector: 'readapp-busqueda-recomendaciones',
  standalone: true,
  imports: [HeaderComponent, CardRecomendacionComponent, BarraBusquedaComponent],
  templateUrl: './busqueda-recomendaciones.component.html',
  styleUrl: './busqueda-recomendaciones.component.css'
})
export class BusquedaRecomendacionesComponent {
  visible!: boolean
  recomendaciones!: CardRecomendacion[]
  constructor(
    public route: ActivatedRoute,
    public serviceRecomendaciones: RecomendacionesService
  ){}

  ngOnInit(){
    this.recomendaciones = this.serviceRecomendaciones.ddd()
    // this.visible = this.route.paramMap.esCheckbox as boolean
  }

  xxx(){
    this.serviceRecomendaciones.ddd()
  }
  
}
