import { Component } from '@angular/core';
import dayjs from 'dayjs'
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { SidebarPerfilComponent } from '../sidebar-perfil/sidebar-perfil.component';
import { Usuario } from '../usuario/usuario';
import { ValidacionFieldComponent } from "./validacion-field/validacion-field.component";

@Component({
  selector: 'readapp-perfil-info',
  standalone: true,
  imports: [HeaderComponent, SidebarPerfilComponent, FormsModule, ValidacionFieldComponent],
  templateUrl: './perfil-info.component.html',
  styleUrl: './perfil-info.component.css'
})

export class PerfilInfoComponent {
  usuario = new Usuario()
  fechaNacimiento= ''


 guardar() {
  this.usuario.fechaNacimiento = this.fechaNacimiento === '' ? undefined : dayjs(this.fechaNacimiento).toDate()
  this.usuario.guardarDatos()
  
 }
 
 

 cancelar() {
  /* logica para poner los campos en blanco y quiza antes otra confirmacion*/}


}
