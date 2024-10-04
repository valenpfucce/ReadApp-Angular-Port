import { Component } from '@angular/core'
import dayjs from 'dayjs'
import { FormsModule } from '@angular/forms';
import { SidebarPerfilComponent } from '../../sidebar-perfil.component';
import { ValidacionFieldComponent } from "./validacion-field/validacion-field.component";
import { CommonModule } from '@angular/common';
import { UserSessionStorageService } from '../../../../services/service_user_session_storage/user-session-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../../domain/usuario';


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
  usuario!: Usuario; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userServiceSS: UserSessionStorageService
  ) {}

  ngOnInit() {
    this.usuario = this.userServiceSS.obtenerUsuarioDelSS();
  }

  

  
  fechaNacimiento= ''
  saveOK = false
  esCalculador = false
  
  cambioCalculador(){
    this.esCalculador = !this.esCalculador

  }

  guardar() {
  this.usuario.fechaNacimiento = this.fechaNacimiento === '' ? undefined : dayjs(this.fechaNacimiento).toDate()
  const guardadoExitoso = this.usuario.guardarDatos()
   if (guardadoExitoso){
    this.indicarGuardadoExitoso()
   }

  } 
  
  indicarGuardadoExitoso(){
    this.saveOK = true
    setTimeout(() => {
    this.saveOK = false;
    }, 3000)
  }

 cancelar() {
  /* logica para poner los campos en blanco y quiza antes otra confirmacion*/}

  navegarA(ruta : string) {
    this.router.navigate([ruta])
  }

}


