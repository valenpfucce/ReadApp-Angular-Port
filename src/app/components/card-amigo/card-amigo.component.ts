import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CortarPalabraPipe } from '../../pipes/cortar-palabra-pipe/cortar-palabra.pipe';
import { RouterModule } from '@angular/router'
import { Usuario } from '../../domain/usuario';

@Component({
  selector: 'readapp-card-amigo',
  standalone: true,
  imports: [CommonModule, CortarPalabraPipe, RouterModule],
  templateUrl: './card-amigo.component.html',
  styleUrl: './card-amigo.component.css'
})


export class CardAmigoComponent {
  @Input() amigo!: Usuario

 
}
