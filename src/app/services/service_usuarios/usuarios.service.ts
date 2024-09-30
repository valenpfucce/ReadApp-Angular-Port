import { Injectable } from '@angular/core';
import { usuarios } from '../../mocks/mock_usuarios';
import { sesionesUsuarios } from '../../mocks/mock_usuariossesiones';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private readonly sessionKey = 'userSession';
  constructor() { }

  login(usuario: string, contrasenia: string) : Boolean{
    if (usuario === 'admin' && contrasenia === 'password') {
      sessionStorage.setItem('user', JSON.stringify({ usuario }));
      console.log("TODO OK USUARIO")
      return true;
    }
    console.log("TODO MAL")
    return true;
  }
  

  //this.libros.find(libro => libro.id === id)
} 


