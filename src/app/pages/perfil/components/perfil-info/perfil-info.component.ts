import { Component } from '@angular/core'
import dayjs from 'dayjs'
import { FormsModule } from '@angular/forms';
import { SidebarPerfilComponent } from '../../sidebar-perfil.component';
import { ValidacionFieldComponent } from "./validacion-field/validacion-field.component";
import { CommonModule } from '@angular/common';
import { UserSessionStorageService } from '../../../../services/service_user_session_storage/user-session-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../../domain/usuario';
import { UsuariosService } from '../../../../services/service_usuarios/usuarios.service';


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
  usuarioEditable!: Usuario;
  fechaNacimiento= ''
  saveOK = false
  esCalculador = false 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userServiceUS: UsuariosService
    
  ) {}

  ngOnInit() {
   
    this.usuario = this.usuario /*this.userServiceUS.getUserActivate();*/
    const jsonPrueba = JSON.stringify(this.usuario)
    this.usuarioEditable = JSON.parse(JSON.stringify(this.usuario)); //no copia métodos, objetos de fecha, etc 
    console.log(jsonPrueba)
    
    // { ...this.usuario };

  }
  
  cambioCalculador(){
    this.esCalculador = !this.esCalculador
  }

  
  guardar() {
  this.usuario.fechaNacimiento = this.fechaNacimiento === '' ? undefined : dayjs(this.fechaNacimiento).toDate()
  const guardadoExitoso = this.usuario.guardarDatos()
   if (guardadoExitoso){
    this.indicarGuardadoExitoso()
   }
   this.llamarServerPutUS()
  } 
  
  async llamarServerPutUS(){
       try {
       await this.userServiceUS.actualizarUsuario(this.usuarioEditable)
     } catch (error) {
       console.error('Error al cargar los datos del usuario', error);
     }
   }

  
  indicarGuardadoExitoso(){
    this.saveOK = true
    setTimeout(() => {
    this.saveOK = false;
    }, 3000)
  }

 cancelar() {
 }

  


  navegarA(ruta : string) {
    this.router.navigate([ruta])
  }

}


