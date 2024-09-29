import { Component } from '@angular/core'
import dayjs from 'dayjs'

import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { SidebarPerfilComponent } from '../../sidebar-perfil.component';
import { Usuario } from '../../../usuario/usuario';
import { ValidacionFieldComponent } from "./validacion-field/validacion-field.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'readapp-perfil-info',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarPerfilComponent,
    FormsModule,
    ValidacionFieldComponent,
    CommonModule
  ],

  templateUrl: './perfil-info.component.html',
  styleUrl: './perfil-info.component.css'
})
export class PerfilInfoComponent {

  usuario = new Usuario()
  fechaNacimiento= ''
  saveOK = false


 guardar() {
  this.usuario.fechaNacimiento = this.fechaNacimiento === '' ? undefined : dayjs(this.fechaNacimiento).toDate()
  const guardadoExitoso = this.usuario.guardarDatos()
   if (guardadoExitoso){
    this.indicarGuardado()
   }

  } 
  
  indicarGuardado(){
    this.saveOK = true
    setTimeout(() => {
    this.saveOK = false;
    }, 3000)
  }

 cancelar() {
  /* logica para poner los campos en blanco y quiza antes otra confirmacion*/}

}
