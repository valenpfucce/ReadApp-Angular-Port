import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'readapp-pagina-ejemplo',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './pagina-ejemplo.component.html',
  styleUrl: './pagina-ejemplo.component.css'
})
export class PaginaEjemploComponent {

}
