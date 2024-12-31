import { Component, Input } from '@angular/core';

import { Router } from '@angular/router'

@Component({
  selector: 'readapp-menu-desplegable',
  standalone: true,
  imports: [],
  templateUrl: './menu-desplegable.component.html',
  styleUrl: './menu-desplegable.component.css'
})
export class MenuDesplegableComponent {

 @Input() menuVisible: boolean = false;

  constructor(private router: Router) {}

  navegar(opcion: string) {
    this.router.navigate([opcion]);
    this.menuVisible = false;
  }

  navegarOut() {
    sessionStorage.clear()
    this.navegar("/login")
  }


}
