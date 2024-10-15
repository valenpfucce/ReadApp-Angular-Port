import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CortarPalabraPipe } from '../../pipes/cortar-palabra-pipe/cortar-palabra.pipe';
import { RouterModule } from '@angular/router'
import { Usuario } from '../../domain/usuario';
import { ModalComponent } from '../modal/modal.component';
import { UsuariosService } from '../../services/service_usuarios/usuarios.service';
import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service';

@Component({
  selector: 'readapp-card-amigo',
  standalone: true,
  imports: [CommonModule, CortarPalabraPipe, RouterModule,ModalComponent],
  templateUrl: './card-amigo.component.html',
  styleUrls: ['./card-amigo.component.css',]
  
})


export class CardAmigoComponent {
  @Input() amigo!: Usuario
  @Input() esModal: boolean = false;
  iduserActual: number = 0

 
  constructor(
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService)
  {}
  
  
  
  ngOnInit(){
    const idUserSS = this.sessionStorage.obtenerIDuserSS()
    this.iduserActual = idUserSS!

  }

  async agregarAmigo(){
    
    await this.userServiceUS.agregarAmigo(this.amigo.id!, this.iduserActual)

  }


}
