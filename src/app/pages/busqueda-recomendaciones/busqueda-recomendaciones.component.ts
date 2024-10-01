import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CardRecomendacionComponent } from '../../components/card-recomendacion/card-recomendacion.component';
import { BarraBusquedaComponent } from "../../components/barra-busqueda/barra-busqueda.component";
import { ActivatedRoute, Router } from '@angular/router';
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
    private router : Router,
    private route : ActivatedRoute,
    public serviceRecomendaciones: RecomendacionesService
  ){}

  ngOnInit(){
    //Si no esta loggeado --> Al login
    const usuarioSession = sessionStorage.getItem('userSession');
    if (!usuarioSession) this.navegarA('/login')

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

  navegarA(ruta : string) {
    this.router.navigate([ruta])
  }
}
