import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'readapp-menu-desplegable',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './menu-desplegable.component.html',
  styleUrl: './menu-desplegable.component.css'
})
export class MenuDesplegableComponent {

  menuVisible: boolean = false;

  menuDesplegable() {
    this.menuVisible = !this.menuVisible;
  }

  navegar(opcion: string) {
    console.log(`${opcion}`);
    this.menuVisible = false; 
  }

}
