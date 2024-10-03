import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CardRecomendacionComponent } from '../../components/card-recomendacion/card-recomendacion.component';
import { BarraBusquedaComponent } from "../../components/barra-busqueda/barra-busqueda.component";
import { ActivatedRoute, Router } from '@angular/router';
import { RecomendacionesService } from '../../services/service_recomendaciones/recomendaciones.service';
import { Recomendacion } from '../../domains/recomendacion';
import { DataBusqueda } from '../../app.routes';
import { UsuariosService } from '../../services/service_usuarios/usuarios.service';
import { Usuario } from '../../domains/usuario';

@Component({
  selector: 'readapp-busqueda-recomendaciones',
  standalone: true,
  imports: [HeaderComponent, CardRecomendacionComponent, BarraBusquedaComponent],
  templateUrl: './busqueda-recomendaciones.component.html',
  styleUrl: './busqueda-recomendaciones.component.css'
})
export class BusquedaRecomendacionesComponent {
  usuario!: Usuario
  data!: DataBusqueda
  recomendaciones!: Recomendacion[]
  constructor(
    private router : Router,
    private route : ActivatedRoute,
    public serviceRecomendaciones: RecomendacionesService,
    private userService: UsuariosService
  ){}

  ngOnInit(){
    // ===== USER =====
    const usuarioSessionIdString = sessionStorage.getItem('userSession');
    const usuarioSessionId: number | null = usuarioSessionIdString !== null ? +usuarioSessionIdString : null;

    if (usuarioSessionId !== null) {
      // Usar usuarioSessionId para obtener el usuario
      const usuarioEncontrado = this.userService.getUser(usuarioSessionId);
      
      if (usuarioEncontrado) {
        this.usuario = usuarioEncontrado;
      } else {
        console.error('Usuario no encontrado.');
        this.router.navigate(['/login']);
      }
    } else {
      // Navegar a la página de login si no se encuentra el ID de sesión
      this.router.navigate(['/login']);
    }

    this.data = this.route.snapshot.data as DataBusqueda
    this.recomendaciones = this.data.realizarBusqueda(
      this.serviceRecomendaciones,
      undefined
    )
  }

  puedeEditarRecomendacion(recomendacion : Recomendacion) : Boolean{
    return recomendacion.creadorId === this.usuario.id
  }
  
  buscar(palabraABuscar?: string){
    this.recomendaciones = this.data.realizarBusqueda(
      this.serviceRecomendaciones,
      palabraABuscar
    )
  }

  navegarA(ruta : string) {
    this.router.navigate([ruta])
  }
}
