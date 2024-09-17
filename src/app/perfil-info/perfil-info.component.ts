import { Component } from '@angular/core';
// import dayjs from 'dayjs'
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { SidebarPerfilComponent } from '../sidebar-perfil/sidebar-perfil.component';
import { Usuario } from '../usuario/usuario';

@Component({
  selector: 'readapp-perfil-info',
  standalone: true,
  imports: [HeaderComponent, SidebarPerfilComponent, FormsModule],
  templateUrl: './perfil-info.component.html',
  styleUrl: './perfil-info.component.css'
})

export class PerfilInfoComponent {
  usuario = new Usuario()


 guardar() {
  this.usuario.guardarDatos()
 }
 
 

 cancelar() {/* logica para poner los campos en blanco y quiza antes otra confirmacion*/}


}
