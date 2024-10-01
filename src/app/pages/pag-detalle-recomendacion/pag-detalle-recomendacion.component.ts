import { Component } from '@angular/core'
import { HeaderComponent } from '../../components/header/header.component'
import { CardLibroComponent } from '../../components/card-libro/card-libro.component'
import { Recomendacion } from '../../domains/recomendacion'
import { ActivatedRoute, Router } from '@angular/router'
import { RecomendacionesService } from '../../services/service_recomendaciones/recomendaciones.service'
import { CardValoracionComponent } from '../../components/card-valoracion/card-valoracion.component'


@Component({
  selector: 'app-pag-detalle-recomendacion',
  standalone: true,
  imports: [HeaderComponent,CardValoracionComponent, CardLibroComponent],
  templateUrl: './pag-detalle-recomendacion.component.html',
  styleUrls: [
    '../../estilos_generales/estilo_recomendacion.css',
    './pag-detalle-recomendacion.component.css'
  ]
})
export class PagDetalleRecomendacionComponent {
  modoEdicion = new ModoEdicion()
  idRecomendacion! : number
  recomendacion! : Recomendacion
  
  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private serviceRecomendacion : RecomendacionesService
  ){}

  ngOnInit() {
    //Si no esta loggeado --> Al login
    const usuarioSession = sessionStorage.getItem('userSession');
    if (!usuarioSession) this.navegarA('/login')

    //Si esta loggeado, chequear si tiene permisos de edicion (llamar al backend de alguna forma)

    
    //Traer los parametros del routing
    this.route.params.subscribe(params => {
      this.idRecomendacion = +params['id']; 
      console.log('ID Recomendacion:', this.idRecomendacion);
      const recomendacionEncontrada = this.serviceRecomendacion.getRecomendacion(this.idRecomendacion);
      if (recomendacionEncontrada) {
        this.recomendacion = recomendacionEncontrada;
        console.log('Recomendación encontrada:', recomendacionEncontrada);
      } else {
        console.log('Recomendación no encontrada --> /home');
        this.navegarA('/home'); 
      }
    });
  }

  navegarA(ruta : string) {
    this.router.navigate([ruta])
  }

}

class ModoEdicion {
  estaEnModoEdicion = false;
}

