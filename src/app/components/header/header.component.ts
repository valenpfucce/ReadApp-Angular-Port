import { Component } from '@angular/core';
import { MenuDesplegableComponent } from "../../menu-desplegable/menu-desplegable.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'readapp-header',
  standalone: true,
  imports: [MenuDesplegableComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  menuVisible: boolean = false; 

  toggleMenu() {  //alternar vista menu
    this.menuVisible = !this.menuVisible;
  }
}
