import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent {

  constructor(
    private router: Router,
  ) {}

  volverAlInicio() {
    //Si no esta loggeado --> Al login
    const usuarioSession = sessionStorage.getItem('userSession')
    if (!usuarioSession) this.navegarA('/login')
    this.navegarA('/login')
  }
  navegarA(ruta: string) {
    this.router.navigate([ruta])
  }
}
