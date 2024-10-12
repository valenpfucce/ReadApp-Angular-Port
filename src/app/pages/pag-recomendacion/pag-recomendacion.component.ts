import { Component } from '@angular/core'
import { HeaderComponent } from '../../components/header/header.component'
import { CardLibroComponent } from '../../components/card-libro/card-libro.component'
import { Recomendacion } from '../../domain/recomendacion'
import { ActivatedRoute, Router } from '@angular/router'
import { RecomendacionesService } from '../../services/service_recomendaciones/recomendaciones.service'
import { CardValoracionComponent } from '../../components/card-valoracion/card-valoracion.component'
import { CardLibroMasComponent } from '../../components/card-libro-mas/card-libro-mas.component'
import { Usuario } from '../../domain/usuario'
import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service'
import { UsuariosService } from '../../services/service_usuarios/usuarios.service'


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
  usuario!: Usuario
  idRecomendacion! : number
  recomendacion! : Recomendacion

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private serviceRecomendacion : RecomendacionesService,
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService
  ){}

  ngOnInit() {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    this.obtenerDatosUsuario(userIdSS)
    // ===== ROUTE PARAMETRO =====
    //Traer los parametros del routing
    this.route.params.subscribe(async params => {
      this.idRecomendacion = +params['id'];
      console.log('ID Recomendacion:', this.idRecomendacion);
      const recomendacionEncontrada = this.serviceRecomendacion.getRecomendacionById(this.idRecomendacion);
      if (recomendacionEncontrada) {
        this.recomendacion = await recomendacionEncontrada;
        console.log('Recomendación encontrada:', recomendacionEncontrada);
      } else {
        console.log('Recomendación no encontrada --> /home');
        this.navegarA('/home');
      }
      this.modo = this.route.snapshot.data['modo'];


      //VERIFICACION USUARIO DETALLE RECOMENDACION SI ES PRIVADA Y NO ES EL CREADOR
      // if((this.modoDetalle() && (this.recomendacion.creadorId === this.usuario.id) && this.recomendacion.propia === true)){ //NO ME ACUERDO COMO ERA EN EL BACK ESTO, no se si otro usuario que no era el creador podia editar
      //   console.log('El usuario no tiene permisos de edicion')
      //   this.navegarA('/home');
      // }

      //VERIFICACION USUARIO EDITAR RECOMENDACION
      if (this.modoEdicion() /*&& (this.recomendacion.creadorId != this.usuario.id)*/) { //NO ME ACUERDO COMO ERA EN EL BACK ESTO, no se si otro usuario que no era el creador podia editar
        console.log('El usuario no tiene permisos de edicion')
        this.navegarA('/home');
      }

    });
  }

  async obtenerDatosUsuario(userIdSS : number | null ): Promise<void>{
    const usuarioEnLinea = await this.userServiceUS.getUserId(userIdSS)
    this.usuario = usuarioEnLinea
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


