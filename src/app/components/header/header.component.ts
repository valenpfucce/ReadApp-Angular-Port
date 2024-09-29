import { Component } from '@angular/core';
import { MenuDesplegableComponent } from "../../menu-desplegable/menu-desplegable.component";

@Component({
  selector: 'readapp-header',
  standalone: true,
  imports: [MenuDesplegableComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
