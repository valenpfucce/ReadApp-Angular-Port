import { Component } from '@angular/core'
import dayjs from 'dayjs'
import { FormsModule } from '@angular/forms';
import { SidebarPerfilComponent } from '../../sidebar-perfil.component';
import { Usuario } from '../../../../domains/usuario';
import { ValidacionFieldComponent } from "./validacion-field/validacion-field.component";
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../../services/service_usuarios/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';


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
  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private userService: UsuariosService
  ){}
  usuario! : Usuario
  const usuarioSessionId = sessionStorage.getItem('userSession')
  
  if (this.usuarioSessionId != null) { 
    this.usuario = this.userService.getUser(this.usuarioSessionId) 
  } else {
    this.navegarA('/login')
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


