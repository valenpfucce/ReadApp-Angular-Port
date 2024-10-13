import { Component, ElementRef, ViewChild } from '@angular/core'
import dayjs from 'dayjs'
import { FormsModule } from '@angular/forms';
import { SidebarPerfilComponent } from '../../sidebar-perfil.component';
import { ValidacionFieldComponent } from "./validacion-field/validacion-field.component";
import { CommonModule } from '@angular/common';
import { UserSessionStorageService } from '../../../../services/service_user_session_storage/user-session-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../../domain/usuario';
import { UsuariosService } from '../../../../services/service_usuarios/usuarios.service';
import {FormaDeLeer, Promedio, Ansioso, Fanatico,Recurrente} from '../../../../domain/formaDeLeer'


@Component({
  selector: 'readapp-perfil-info',
  standalone: true,
  imports: [
    SidebarPerfilComponent,
    FormsModule,
    ValidacionFieldComponent,
    CommonModule,
  ],

  templateUrl: './perfil-info.component.html',
  styleUrl: './perfil-info.component.css'
})

export class PerfilInfoComponent {
  usuario!: Usuario;
  usuarioEditable!: Usuario;
  fechaNacimiento= ''
  saveOK = false
  esCalculador = false 
  esPromedio: boolean = false;
  esAnsioso: boolean = false;
  esFanatico: boolean = false;
  esRecurrente: boolean = false;
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService
    
  ) {}
  

  ngOnInit() {
    const userIdSS = this.sessionStorage.obtenerIDuserSS()
    console.log("userIdSS", userIdSS)
    this.obtenerDatosUsuario(userIdSS)
     
  }
  
  async obtenerDatosUsuario(userIdSS : number | null ): Promise<void>{
    const usuarioEnLinea = await this.userServiceUS.getUserId(userIdSS)
    this.usuario = usuarioEnLinea
    this.usuarioEditable = usuarioEnLinea
    this.comprobarFormaDeLeer()
    this.ngAfterViewInit()
  }
 
  cambioCalculador(){
    this.esCalculador = !this.esCalculador
  }
  
  comprobarFormaDeLeer() {
    if (this.usuarioEditable.formaDeLeer instanceof Promedio) {
      this.esPromedio = true;
    } else if (this.usuarioEditable.formaDeLeer instanceof Ansioso) {
      this.esAnsioso = true;
    } else if (this.usuarioEditable.formaDeLeer instanceof Fanatico) {
      this.esFanatico = true;
    } else if (this.usuarioEditable.formaDeLeer instanceof Recurrente) {
      this.esRecurrente = true;
    }
  }
  
  //ViweChild accede al elemnto del html con el #tipoPerfil, en este caso los checks
  @ViewChild('precavido', { static: false }) precavidoRef!: ElementRef;
  @ViewChild('demandante', { static: false }) demandanteRef!: ElementRef;
  @ViewChild('cambiante', { static: false }) cambianteRef!: ElementRef;
  @ViewChild('leedor', { static: false}, ) leedorRef!: ElementRef;
  @ViewChild('nativista', { static: false }) nativistaRef!: ElementRef;
  @ViewChild('poliglota', { static: false }) poliglotaRef!: ElementRef;
  @ViewChild('experimentado', { static: false }) experimentadoRef!: ElementRef;
  @ViewChild('calculador', { static: false }) calculadorRef!: ElementRef;

  ngAfterViewInit(){
    console.log(this.leedorRef.nativeElement);
    this.activarChecksCriterioPerfil(this.usuarioEditable); 
  }

  activarChecksCriterioPerfil(usuario: Usuario) {
    const tipoPerfil = usuario.perfil
    
    const checkboxes: { [key: string]: ElementRef } = {
      'precavido': this.precavidoRef,
      'demandante': this.demandanteRef,
      'cambiante': this.cambianteRef,
      'leedor': this.leedorRef,
      'nativista': this.nativistaRef,
      'poliglota': this.poliglotaRef,
      'experimentado': this.experimentadoRef,
      'calculador': this.calculadorRef
    };


    tipoPerfil.forEach(perfil => {
      if (checkboxes[perfil]) {
        checkboxes[perfil].nativeElement.checked = true;
      }
    })
  }
  
  guardar() {
   this.usuarioEditable.fechaNacimiento = this.fechaNacimiento === '' ? undefined : dayjs(this.fechaNacimiento).toDate()
   const guardadoExitoso = this.usuarioEditable.guardarDatos()
   this.llamarServerPutUS()
   if (guardadoExitoso){
    this.indicarGuardadoExitoso()
   }
   
  } 
  
  async llamarServerPutUS(){
        try {
        await this.userServiceUS.actualizarUsuario(this.usuario,this.usuarioEditable)
      } catch (error) {
        console.error('Error al cargar los datos del usuario', error);
      }
  }

  cancelar() {
  }

  indicarGuardadoExitoso(){
    this.saveOK = true
    setTimeout(() => {
    this.saveOK = false;
    }, 3000)
  }

  navegarA(ruta : string) {
    this.router.navigate([ruta])
  }

}


