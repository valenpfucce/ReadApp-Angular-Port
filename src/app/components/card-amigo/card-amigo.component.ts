import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CortarPalabraPipe } from '../../pipes/cortar-palabra-pipe/cortar-palabra.pipe';
import { RouterModule } from '@angular/router'
import { Usuario } from '../../domain/usuario';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'readapp-card-amigo',
  standalone: true,
  imports: [CommonModule, CortarPalabraPipe, RouterModule,ModalComponent],
  templateUrl: './card-amigo.component.html',
  styleUrls: ['./card-amigo.component.css', '../card-libro-mas/card-libro-mas.component.css']
  
})


export class CardAmigoComponent {
  @Input() amigo!: Usuario
  @Input() esModal: boolean = false;
 
}
