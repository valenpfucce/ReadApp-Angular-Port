import { Component, Input } from '@angular/core';
import { HeaderComponent } from "../components/header/header.component";
import { Router } from '@angular/router'

@Component({
  selector: 'readapp-menu-desplegable',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './menu-desplegable.component.html',
  styleUrl: './menu-desplegable.component.css'
})
export class MenuDesplegableComponent {

 @Input() menuVisible: boolean = false;

  constructor(private router: Router) {}

  navegar(opcion: string) {
    console.log(`Navegando a: ${opcion}`);
    this.router.navigate([opcion]);
    this.menuVisible = false; 
  }

}
