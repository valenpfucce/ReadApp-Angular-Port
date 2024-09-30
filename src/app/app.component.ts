import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Usuario } from './domains/usuario';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'readapp-grupo-6';

  guardarUsuarioSession(usuario: Usuario ){
    sessionStorage.setItem('user', JSON.stringify(usuario) );
  }


}