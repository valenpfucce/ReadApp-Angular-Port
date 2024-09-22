import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule} from '@angular/router';


@Component({
  selector: 'readapp-sidebar-perfil',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './sidebar-perfil.component.html',
  styleUrl: './sidebar-perfil.component.css'
})
export class SidebarPerfilComponent {


}

