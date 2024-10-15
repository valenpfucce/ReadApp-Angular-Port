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
import {FormsModule} from "@angular/forms";
import {ModalComponent} from "../../components/modal/modal.component";
import {CommonModule, NgIf} from "@angular/common";
import {Libro} from "../../domain/libro";

@Component({
  selector: 'app-pag-recomendacion',
  standalone: true,
  imports: [HeaderComponent, CardValoracionComponent, CardLibroComponent, CardLibroMasComponent, FormsModule, ModalComponent, NgIf, ModalComponent, CommonModule],
  templateUrl: './pag-recomendacion.component.html',
  styleUrls: [
    '../../estilos_generales/cartas_libros.css',
    '../../estilos_generales/estilo_recomendacion.css',
    './pag-recomendacion.component.css'
  ]
})
export class PagRecomendacionComponent {
  modo!: 'detalle' | 'edicion';
  usuario!: Usuario
  userIdSS!: number
  idRecomendacion! : number
  recomendacion! : Recomendacion
  esPublica! : Boolean
  iconoRecomendacion! : String
  altRecomendacion! : String
  puedeEditar! : boolean
  puedeValorar! : boolean
  guardarRecomendacion! : Recomendacion
  visibilidadPrivadaCheck! : Boolean

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private serviceRecomendacion : RecomendacionesService,
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService
  ){}

  ngOnInit() {
    const userIdSSAChequear = this.sessionStorage.obtenerIDuserSS()
    if (userIdSSAChequear != null) { this.userIdSS = userIdSSAChequear }
    // ===== ROUTE PARAMETRO =====
    //Traer los parametros del routing
    this.route.params.subscribe(async params => {
      this.idRecomendacion = +params['id'];
      console.log('ID Recomendacion:', this.idRecomendacion);
      const recomendacionEncontrada = await this.serviceRecomendacion.getRecomendacionById(this.idRecomendacion);
      if (recomendacionEncontrada) {
        this.recomendacion = recomendacionEncontrada;
        console.log('Recomendación encontrada:', recomendacionEncontrada);
      } else {
        console.log('Recomendación no encontrada --> /home');
        this.navegarA('/home');
      }
      this.modo = this.route.snapshot.data['modo'];
      this.setIconoRecomendacion(this.recomendacion.publica)
      console.log("puede editar recomendacion?: " ,await this.puedeEditarLlamadaService())
      if(this.esModoDetalle()){this.modoDetalle()}
      if(this.esModoEdicion()){this.modoEdicion()}
    });
  }



  async puedeValorarLlamadaService(){
    const puedeValorarSR = await this.serviceRecomendacion.puedeValorarRecomendacion(this.recomendacion.id, this.userIdSS)
    this.puedeValorar = puedeValorarSR
    return puedeValorarSR
  }

  async puedeEditarLlamadaService(){
    const puedeEditarSR = await this.serviceRecomendacion.puedeEditarRecomendacion(this.recomendacion.id, this.userIdSS)
    this.puedeEditar = puedeEditarSR
    return puedeEditarSR;
  }

  async obtenerDatosUsuario(userIdSS : number | null ): Promise<void>{
    const usuarioEnLinea = await this.userServiceUS.getUserId(userIdSS)
    this.usuario = usuarioEnLinea
  }

  setIconoRecomendacion(newPublicaBoolean : Boolean) {
    this.esPublica = newPublicaBoolean
    if (this.esPublica) {
      this.iconoRecomendacion = '/imagenes/globe-simple.svg';
      this.altRecomendacion = 'Publica';
    } else {
      this.iconoRecomendacion = '/imagenes/globe-x.svg';
      this.altRecomendacion = 'Privada';
    }
  }

  //===> EDICION
  esModoEdicion(){
    return (this.modo === 'edicion')
  }
  modoEdicion() {
    if(!this.puedeEditar){this.navegarA('/home')}
    this.guardarRecomendacion = Object.assign({}, this.recomendacion);

  }

  guardarCambiosEdicion(){
    this.visibilidadPrivadaGuardar()
    console.log(this.guardarRecomendacion);
  }

  visibilidadPrivadaGuardar(){
    this.guardarRecomendacion.publica = !this.visibilidadPrivadaCheck;
  }
  //FIN EDICION <===

  //===> DETALLE
  esModoDetalle(){
    return (this.modo === 'detalle')
  }

  modoDetalle(){
    this.puedeValorarLlamadaService()
  }

  //FIN DETALLE

  navegarA(ruta : string) {
    this.router.navigate([ruta])
  }

  trackByFn(index: number, item: Libro) {
    return item.id // Usamos el ID del libro para hacer tracking en el *ngFor
  }

  isModalOpen = false

  openModal() {
    console.log('Método openModal ejecutado') // Verificar si se ejecuta al hacer clic
    this.isModalOpen = true // Cambiar el estado para abrir el modal
  }

  closeModal() {
    this.isModalOpen = false // Cerrar el modal
  }


}


