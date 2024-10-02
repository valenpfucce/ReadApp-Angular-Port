import { Component, input } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'readapp-sidebar-perfil',
  standalone: true,
  imports: [HeaderComponent, RouterModule,CommonModule],
  templateUrl: './sidebar-perfil.component.html',
  styleUrl: './sidebar-perfil.component.css'
})
export class SidebarPerfilComponent {

  infoSidebar = [
   
    new menuSidebar(
      "Informacion",
      '/imagenes/info.svg',
      'info'
    ),
  
    new menuSidebar(
      "Amigos",
      "/imagenes/amigos.svg" ,
      'amigos'
    ),
    
    new menuSidebar(
      "Libros leidos",
      "/imagenes/libros.svg",
      'info'
    ),
  
    new menuSidebar(
      "Libros a leer",
      "/imagenes/librosaleer.svg",
      'info'
    ),
  
    new menuSidebar(
      "Recomendaciones a valorar",
      "/imagenes/valorarReco.svg",
      'recomendacionesAValorar'
    ),
  
  ]
  
}

export class menuSidebar{

  constructor(
    public nombre: string,
    public icono_url: string,
    public router: string,
   
  ){}
}

