import { Component } from '@angular/core'
import { HeaderComponent } from '../../components/header/header.component'
import { CardValoracion, CardValoracionComponent } from '../../components/card-valoracion/card-valoracion.component'
import { CardLibroComponent } from '../../components/card-libro/card-libro.component'
import { Recomendacion } from '../../domains/recomendacion'
import { Libro } from '../../domains/libro'
import { LibrosService } from '../../services/service_libros/libros.service'
import { ActivatedRoute, Router } from '@angular/router'
import { RecomendacionesService } from '../../services/service_recomendaciones/recomendaciones.service'


@Component({
  selector: 'app-pag-detalle-recomendacion',
  standalone: true,
  imports: [HeaderComponent, CardValoracionComponent, CardLibroComponent],
  templateUrl: './pag-detalle-recomendacion.component.html',
  styleUrls: [
    '../../estilos_generales/estilo_recomendacion.css',
    './pag-detalle-recomendacion.component.css'
  ]
})
export class PagDetalleRecomendacionComponent {
  libros!: Libro[]
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

    //Si esta loggeado, traer el usuario
    
    
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

  cardValoraciones = [
    new CardValoracion(
      'bilardo.jpg',
      'Blas Armando Giunta',
      new Date().toLocaleDateString(),
      'Lorem ipsaperiam repellendus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus adipisci iusto atque soluta officia corrupti optio repudiandae sed dolores temporibus facilis at obcaecati odit rerum praesentium, placeat minima esse! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat repellendus sint animi adipisci voluptatibus blanditiis est ad exercitationem. Incidunt quod mollitia nulla in itaque ratione voluptate numquam. Labore, ipsam neque? Lorem ipsum dolor sit amet quasi repudiandae provident deserunt delectus similique asperiores nam, eaque nemo officia esse omnis quo! Aperiam.',
      4.5
    ),
    new CardValoracion(
      'roman.jpg',
      'Agus Rey',
      new Date().toLocaleDateString(),
      'NO ME GUSTÓ PARA NADA',
      2
    ),
    new CardValoracion(
      'roman.jpg',
      'Agus Rey',
      new Date().toLocaleDateString(),
      'no logró conectar conmigo de la manera que esperaba. Desde el principio, la trama parece prometedora, pero a medida que avanzas, te das cuenta de que se queda en la superficie',
      2
    ),
    new CardValoracion(
      'bilardo.jpg',
      'Agus Rey',
      new Date().toLocaleDateString(),
      'No sabía que estaba a punto de vivir una experiencia literaria tan profunda y reveladora. Desde la primera página, me atrapó con su narrativa tan envolvente que, honestamente, me fue imposible soltarlo. La forma en que el autor entrelaza las historias y los personajes es pura magia. Cada capítulo te sumerge en un universo único, donde las emociones se sienten tan reales que puedes casi tocarlas.',
      5
    )
  ]

  // recomendacion = new Recomendacion(
  //   7,
  //   'Recomendación Desquiciada',
  //   false,
  //   '"La verdad es que no hay una verdad"',
  //   ["libros[0].titulo", 'this.cardLibros[1].titulo', 'this.cardLibros[2].titulo', 'this.cardLibros[3].titulo'], //HABLAR CON TATI PARA CAMBIAR ESTO
  //   4.5,
  //   '8hs'
  // )
}

class ModoEdicion {
  estaEnModoEdicion = false;
}

