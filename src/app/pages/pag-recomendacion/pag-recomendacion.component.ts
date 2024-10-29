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
import {HttpErrorResponse} from "@angular/common/http";

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
  userIdSS!: number
  idRecomendacion!: number
  recomendacion!: Recomendacion
  error: string = ''

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private serviceRecomendacion : RecomendacionesService,
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService
  ){}

  async ngOnInit() {
    const userIdSSAChequear = this.sessionStorage.obtenerIDuserSS()
    if (userIdSSAChequear != null) { this.userIdSS = userIdSSAChequear }
    this.modo = this.route.snapshot.data['modo'];
    if (this.esModoDetalle()) { await this.modoDetalle() }
    if (this.esModoEdicion()) { await this.modoEdicion() }
    if (this.esModoNueva()) { this.modoNueva() }
  }

  async buscarRecomenandacion() {
      this.idRecomendacion = Number(this.route.snapshot.paramMap.get('id'))
      const recomendacionEncontrada = await this.serviceRecomendacion.getRecomendacionByIdWithUser(this.idRecomendacion, this.userIdSS)
      recomendacionEncontrada ? (this.recomendacion = recomendacionEncontrada) : this.navegarA('/home')
  }

  //Use getters para evitar la variable
  get iconoPublicaPrivada(): string {
    return this.recomendacion.esPublica
      ? '/imagenes/globe-simple.svg'
      : '/imagenes/globe-x.svg'
  }
  get textoAlt(): string {
    return this.recomendacion.esPublica
      ? 'Publica'
      : 'Privada'
  }

  //Tuve que hacer un getter y un setter pq no se puede poner en un binding bidireccional (en el html) con un negado antes
  get esPrivada(): boolean {
    return !this.recomendacion.esPublica
  }
  set esPrivada(valor: boolean) {
    this.recomendacion.esPublica = !valor
  }

  guardarCambios(){
    if(this.recomendacion.titulo === "" || this.recomendacion.descripcion === ""){
      this.error = 'Debe completar todos los campos con (*)'
      return
    }
    if(this.recomendacion.lista_libros.length === 0){
      this.error = 'Se necesita que la recomendación tenga al menos un libro'
      return
    }
      if (this.esModoEdicion()) {
        this.guardarCambiosEdicion()
      }
      if (this.esModoNueva()) {
        this.guardarCambiosNueva()
      }
  }

  //===> EDICION
  esModoEdicion(){
    return (this.modo === 'edicion')
  }
  async modoEdicion() {
    await this.buscarRecomenandacion()
    console.log(this.recomendacion.puedeEditar)
    if (!this.recomendacion.puedeEditar) { this.navegarA('/home') }
  }

  async guardarCambiosEdicion(){
  //guardar visibilidad privada?
    try{
      await this.serviceRecomendacion.editarRecomendacion(this.recomendacion, this.userIdSS)
      this.navegarA('/home')
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 0) {
          this.error = 'Conexión no exitosa. Intente más tarde'
        } else {
          this.error =
            error.error?.message || 'Ocurrió un error inesperado.'
        }
      } else {
        this.error = 'Ocurrió un error inesperado.'
      }
    }
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
    if (index !== -1) {
      this.recomendacion.lista_libros.splice(index, 1);
    }
  }
  //FIN EDICION <===

  //===> DETALLE
  esModoDetalle(){
    return (this.modo === 'detalle')
  }

  async modoDetalle(){
    await this.buscarRecomenandacion()
  }

  //FIN DETALLE


  //===> NUEVA
  esModoNueva(){
    return (this.modo === 'nueva')
  }

  modoNueva(){
    this.recomendacion = new Recomendacion({creadorId: this.userIdSS})
  }

  async guardarCambiosNueva(){
    try{
      await this.serviceRecomendacion.crearRecomendacion(this.recomendacion)
      this.navegarA('/mis_recomendaciones')
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 0) {
          this.error = 'Conexión no exitosa. Intente más tarde'
        } else {
          this.error =
            error.error?.message || 'Ocurrió un error inesperado.'
        }
      } else {
        this.error = 'Ocurrió un error inesperado.'
      }
    }
  }
  //FIN NUEVA


  navegarA(ruta : string) {
    this.router.navigate([ruta])
  }

  isModalOpen = false

  openModal() {
    this.isModalOpen = true
  }

  closeModal() {
    this.isModalOpen = false
  }

  isModalValoracionOpen = false

  openModalValoracion() {
    this.isModalValoracionOpen = true
  }

  closeModalValoracion() {
    this.isModalValoracionOpen = false
  }

}


