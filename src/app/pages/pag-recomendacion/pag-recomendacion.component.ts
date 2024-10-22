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
import {ModalValoracionComponent} from "../../components/modal-valoracion/modal-valoracion.component";

@Component({
  selector: 'app-pag-recomendacion',
  standalone: true,
  imports: [HeaderComponent, CardValoracionComponent, CardLibroComponent, CardLibroMasComponent, FormsModule, ModalComponent, NgIf, ModalComponent, ModalValoracionComponent, CommonModule],
  templateUrl: './pag-recomendacion.component.html',
  styleUrls: [
    '../../estilos_generales/cartas_libros.css',
    '../../estilos_generales/estilo_recomendacion.css',
    './pag-recomendacion.component.css'
  ]
})
export class PagRecomendacionComponent {
  modo!: 'detalle' | 'edicion' | 'nueva';
  usuario!: Usuario
  userIdSS!: number
  idRecomendacion!: number
  recomendacion!: Recomendacion
  esPublica!: Boolean
  iconoRecomendacion!: String
  altRecomendacion!: String
  puedeEditar!: boolean
  puedeValorar!: boolean
  visibilidadPrivadaCheck!: Boolean

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private serviceRecomendacion : RecomendacionesService,
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService
  ){}

  async ngOnInit() {
    const userIdSSAChequear = this.sessionStorage.obtenerIDuserSS()
    if (userIdSSAChequear != null) {
      this.userIdSS = userIdSSAChequear
    }
    // ===== ROUTE PARAMETRO =====
    //Traer los parametros del routing
    // this.route.params.subscribe(async params => {
    this.modo = this.route.snapshot.data['modo'];
    if (this.esModoEdicion() || this.esModoDetalle()) {
      this.idRecomendacion = Number(this.route.snapshot.paramMap.get('id'))
      const recomendacionEncontrada = await this.serviceRecomendacion.getRecomendacionById(this.idRecomendacion);
      if (recomendacionEncontrada) {
        this.recomendacion = recomendacionEncontrada;
      } else {
        this.navegarA('/home');
      }
      this.setIconoRecomendacion(this.recomendacion.esPublica)
      await this.puedeEditarLlamadaService()
    }
    if (this.esModoDetalle()) {
      this.modoDetalle()
    }
    if (this.esModoEdicion()) {
      this.modoEdicion()
    }
    if (this.esModoNueva()) {
      this.modoNueva()
    }
    // });
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
    const usuarioEnLinea = await this.userServiceUS.getUserById(userIdSS)
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

  guardarCambios(){
    if(this.esModoEdicion()){
      this.guardarCambiosEdicion()
    }
    if(this.esModoNueva()){
      this.guardarCambiosNueva()
    }
  }

  //===> EDICION
  esModoEdicion(){
    return (this.modo === 'edicion')
  }
  modoEdicion() {
    if(!this.puedeEditar){this.navegarA('/home')}

  }

  guardarCambiosEdicion(){
    this.visibilidadPrivadaGuardar()
    console.log(this.recomendacion);
    this.serviceRecomendacion.editarRecomendacion(this.recomendacion, this.userIdSS)
    this.navegarA('/home')
  }

  visibilidadPrivadaGuardar(){
    this.recomendacion.esPublica = !this.visibilidadPrivadaCheck;
  }

  recibirLibros(libros: Libro[]){
    libros.forEach( libroNuevo => {
      const existe = this.recomendacion.lista_libros.some((libro) => libro.id === libroNuevo.id);
      if (!existe) {
        this.recomendacion.lista_libros.push(libroNuevo);
      }
    })
  }

  quitarLibro(libro: Libro) {
    const index = this.recomendacion.lista_libros.findIndex(l => l.id === libro.id);

    // Verifica que el libro existe en la lista antes de eliminarlo
    if (index !== -1) {
      this.recomendacion.lista_libros.splice(index, 1);
    }
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


  //===> NUEVA
  esModoNueva(){
    return (this.modo === 'nueva')
  }

  modoNueva(){
    this.recomendacion = new Recomendacion(-1, this.userIdSS, "", true,"", [],[])
    console.log("hola\n", this.recomendacion)
  }

  async guardarCambiosNueva(){
    console.log("hola\n", this.recomendacion)
    await this.serviceRecomendacion.crearRecomendacion(this.recomendacion)
    this.navegarA('/mis_recomendaciones')
  }
  //FIN NUEVA


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

  isModalValoracionOpen = false

  openModalValoracion() {
    console.log('Método openModal ejecutado') // Verificar si se ejecuta al hacer clic
    this.isModalValoracionOpen = true
  }

  closeModalValoracion() {
    this.isModalValoracionOpen = false
  }

}


