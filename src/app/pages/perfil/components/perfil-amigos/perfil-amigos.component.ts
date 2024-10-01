import { Component } from '@angular/core';
import { SidebarPerfilComponent } from '../../sidebar-perfil.component';
import { Usuario, UsuarioSession } from '../../../../domains/usuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'readapp-perfil-amigos',
  standalone: true,
  imports: [SidebarPerfilComponent],
  templateUrl: './perfil-amigos.component.html',
  styleUrls: ['./perfil-amigos.component.css', '../../../../estilos_generales/cartas_libros_btn_mas.css']
})
export class PerfilAmigosComponent {
  usuarioSession! : UsuarioSession
  usuarioPosta! : Usuario
  constructor(
    private router : Router,
    private route : ActivatedRoute,
  ){}

  ngOnInit() {
    //Si no esta loggeado --> Al login
    const usuarioSessionJSON = sessionStorage.getItem('userSession');
    if (!usuarioSessionJSON) this.navegarA('/login')
    
    this.usuarioSession = JSON.parse(usuarioSessionJSON as string);
    console.log('Usuario es:', this.usuarioSession.mail)
  }


  
  navegarA(ruta : string) {
    this.router.navigate([ruta])
  }
}
  


