import { Component } from '@angular/core';
import { CardRecomendacionComponent } from '../../../../components/card-recomendacion/card-recomendacion.component';
import { Usuario } from '../../../../domains/usuario';

@Component({
  selector: 'readapp-perfil-recomendaciones-a-valorar',
  standalone: true,
  imports: [CardRecomendacionComponent],
  templateUrl: './perfil-recomendaciones-a-valorar.component.html',
  styleUrls: ['../perfil-amigos/perfil-amigos.component.css','./perfil-recomendaciones-a-valorar.component.css']
})
export class PerfilRecomendacionesAValorarComponent {
  usuario! : Usuario
}
