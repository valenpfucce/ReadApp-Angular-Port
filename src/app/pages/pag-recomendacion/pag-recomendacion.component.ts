import { Component } from '@angular/core'
import { HeaderComponent } from '../../components/header/header.component'
import { CardLibroComponent } from '../../components/card-libro/card-libro.component'
import { Recomendacion } from '../../domains/recomendacion'
import { ActivatedRoute, Router } from '@angular/router'
import { RecomendacionesService } from '../../services/service_recomendaciones/recomendaciones.service'
import { CardValoracionComponent } from '../../components/card-valoracion/card-valoracion.component'
import { CardLibroMasComponent } from '../../components/card-libro-mas/card-libro-mas.component'


@Component({
  selector: 'app-pag-recomendacion',
  standalone: true,
  imports: [HeaderComponent,CardValoracionComponent, CardLibroComponent, CardLibroMasComponent],
  templateUrl: './pag-recomendacion.component.html',
  styleUrls: [
    '../../estilos_generales/estilo_recomendacion.css',
    './pag-recomendacion.component.css'
  ]
})
export class PagRecomendacionComponent {
  modo!: 'detalle' | 'edicion';
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
      this.modo = this.route.snapshot.data['modo'];
      //Acá hay que validar si el usuario tiene permisos de edicion sea cual fuere el modo
    });
  }

  modoEdicion(){
    return (this.modo === 'edicion') ? true : false
  }

  modoDetalle(){
    return (this.modo === 'detalle') ? true : false
  }
  
  navegarA(ruta : string) {
    this.router.navigate([ruta])
  }

}


