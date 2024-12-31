import { Component, ElementRef, ViewChild } from '@angular/core'
import dayjs from 'dayjs'
import { FormsModule } from '@angular/forms';
import { SidebarPerfilComponent } from '../../sidebar-perfil.component';
import { ValidacionFieldComponent } from "./validacion-field/validacion-field.component";
import { CommonModule } from '@angular/common';
import { UserSessionStorageService } from '../../../../services/service_user_session_storage/user-session-storage.service';
import { Router } from '@angular/router';
import { Usuario } from '../../../../domain/usuario';
import { UsuariosService } from '../../../../services/service_usuarios/usuarios.service';
import { Promedio, Ansioso, Fanatico,Recurrente } from '../../../../domain/formaDeLeer'
import { HttpErrorResponse } from '@angular/common/http'



@Component({
  selector: 'readapp-perfil-info',
  standalone: true,
  imports: [
    SidebarPerfilComponent,
    FormsModule,
    ValidacionFieldComponent,
    CommonModule
  ],

  templateUrl: './perfil-info.component.html',
  styleUrl: './perfil-info.component.css'
})
export class PerfilInfoComponent {
  usuario!: Usuario
  usuarioEditable!: Usuario
  fechaNacimiento = ''
  saveOK = false
  esCalculador = false
  esPromedio: boolean = false
  esAnsioso: boolean = false
  esFanatico: boolean = false
  esRecurrente: boolean = false
  mensajeError: string | null = null

  constructor(
    private router: Router,
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService
  ) {}

  ngOnInit() {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    this.obtenerDatosUsuario(userIdSS)
  }

  async obtenerDatosUsuario(userIdSS: number | null): Promise<void> {
    try {
      const usuarioEnLinea = await this.userServiceUS.getUserById(userIdSS)
      this.usuario = usuarioEnLinea
      this.usuarioEditable = usuarioEnLinea
      this.fechaNacimiento = dayjs(this.usuarioEditable.fechaNacimiento).format('YYYY-MM-DD');
      this.comprobarFormaDeLeer()
      this.ngAfterViewInit()

    } catch(error: unknown){
     
      this.mostrarError(error)
      setTimeout(() => {
        this.mensajeError = null
      }, 3000)
      this.router.navigate(['**'])
      
    }
  }



  cambioCalculador(){

    this.esCalculador = !this.esCalculador
  }

  comprobarFormaDeLeer() {
    if (this.usuarioEditable.formaDeLeer instanceof Promedio) {
      this.esPromedio = true
    } else if (this.usuarioEditable.formaDeLeer instanceof Ansioso) {
      this.esAnsioso = true
    } else if (this.usuarioEditable.formaDeLeer instanceof Fanatico) {
      this.esFanatico = true
    } else if (this.usuarioEditable.formaDeLeer instanceof Recurrente) {
      this.esRecurrente = true
    }
  }

  cambioFormaLeerPUT(formaleer: string) {
    switch (formaleer) {
      case 'Promedio':
        this.esPromedio
        this.usuarioEditable.formaDeLeer = new Promedio()
        break
      case 'Ansioso':
        this.esAnsioso
        this.usuarioEditable.formaDeLeer = new Ansioso()
        break
      case 'Fanatico':
        this.esFanatico
        this.usuarioEditable.formaDeLeer = new Fanatico()
        break
      case 'Recurrente':
        this.esRecurrente
        this.usuarioEditable.formaDeLeer = new Recurrente()
        break
      default:
        break
    }
  }



  //ViweChild accede al elemnto del html con el #tipoPerfil, en este caso los checks
  @ViewChild('precavido', { static: false }) precavidoRef!: ElementRef
  @ViewChild('demandante', { static: false }) demandanteRef!: ElementRef
  @ViewChild('cambiante', { static: false }) cambianteRef!: ElementRef
  @ViewChild('leedor', { static: false }) leedorRef!: ElementRef
  @ViewChild('nativista', { static: false }) nativistaRef!: ElementRef
  @ViewChild('poliglota', { static: false }) poliglotaRef!: ElementRef
  @ViewChild('experimentado', { static: false }) experimentadoRef!: ElementRef
  @ViewChild('calculador', { static: false }) calculadorRef!: ElementRef

  ngAfterViewInit() {
    if (this.usuario?.perfilLista) {
      this.activarChecksCriterioPerfil(this.usuarioEditable)
    }
  }

  activarChecksCriterioPerfil(usuario: Usuario) {
    const tipoPerfil = usuario.perfilLista

    const checkboxes: { [key: string]: ElementRef } = {
      precavido: this.precavidoRef,
      demandante: this.demandanteRef,
      cambiante: this.cambianteRef,
      leedor: this.leedorRef,
      nativista: this.nativistaRef,
      poliglota: this.poliglotaRef,
      experimentado: this.experimentadoRef,
      calculador: this.calculadorRef
    }

    tipoPerfil.forEach((perfil) => {
      if (checkboxes[perfil]) {
        checkboxes[perfil].nativeElement.checked = true
      }
    })
  }

  onCheckboxChange(criterio: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked

    if (isChecked) {
      if (!this.usuarioEditable.perfilLista.includes(criterio)) {
        this.usuarioEditable.perfilLista.push(criterio)
      }
    } else {
      const index = this.usuarioEditable.perfilLista.indexOf(criterio)
      if (index > -1) {
        this.usuarioEditable.perfilLista.splice(index, 1)
      }
    }
  }

  guardar() {
    this.usuarioEditable.fechaNacimiento =
      this.fechaNacimiento === ''
        ? undefined
        : dayjs(this.fechaNacimiento).toDate()
    let okCampos = this.usuarioEditable.guardarDatos()
    if(okCampos){ this.llamarServerPutUS()}

  }

  async llamarServerPutUS() {
    try {
      await this.userServiceUS.actualizarUsuario(
        this.usuario,
        this.usuarioEditable
      )
      this.indicarGuardadoExitoso()
    } catch (error) {
      this.mostrarError(error)
      setTimeout(() => {
        this.mensajeError = null
      }, 5000)
    }
  }

  cancelar() {
    this.obtenerDatosUsuario(this.usuario.id!)
  }

  indicarGuardadoExitoso() {
    this.saveOK = true
    setTimeout(() => {
      this.saveOK = false
      this.obtenerDatosUsuario(this.usuario.id!)
    }, 3000)
  }

  navegarA(ruta: string) {
    this.router.navigate([ruta])
  }


  mostrarError(error: unknown){
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this.mensajeError =
          'Error en el servidor. Por favor, inténtelo de nuevo mas tarde.'
      } else {
        this.mensajeError =
          error.error?.message || 'Ocurrió un error inesperado.'
      }
    } else {
      this.mensajeError = 'Ocurrió un error inesperado.'
    }
  }
}
