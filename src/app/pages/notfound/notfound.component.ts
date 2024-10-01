import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent {
  constructor(
    private router : Router,
    private route : ActivatedRoute,
  ){}

  volverAlInicio(){
    //Si no esta loggeado --> Al login
    const usuarioSession = sessionStorage.getItem('userSession');
    if (!usuarioSession) this.navegarA('/login');
    this.navegarA('/home')
  }
  navegarA(ruta : string) {
    this.router.navigate([ruta])
  }
}
