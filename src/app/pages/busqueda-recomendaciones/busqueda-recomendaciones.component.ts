import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CardRecomendacionComponent } from '../../components/card-recomendacion/card-recomendacion.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RecomendacionesService } from '../../services/service_recomendaciones/recomendaciones.service';
import { Recomendacion } from '../../domain/recomendacion';
import { DataBusqueda } from '../../app.routes';
import { UserSessionStorageService } from '../../services/service_user_session_storage/user-session-storage.service';
import { Usuario } from '../../domain/usuario';
import { BarraBusquedaComponent } from '../../components/header/components/barra-busqueda/barra-busqueda.component';
import { CardLibroMasComponent } from "../../components/card-libro-mas/card-libro-mas.component";
import { UsuariosService } from '../../services/service_usuarios/usuarios.service';

@Component({
  selector: 'readapp-busqueda-recomendaciones',
  standalone: true,
  imports: [HeaderComponent, CardRecomendacionComponent, BarraBusquedaComponent, CardLibroMasComponent],
  templateUrl: './busqueda-recomendaciones.component.html',
  styleUrl: './busqueda-recomendaciones.component.css'
})
export class BusquedaRecomendacionesComponent {
  usuario!: Usuario
  userIdSS!: number;
  data!: DataBusqueda
  recomendaciones!: Recomendacion[]
  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private serviceRecomendaciones: RecomendacionesService,
    private userServiceUS: UsuariosService,
    private sessionStorage: UserSessionStorageService
  ){}

  ngOnInit() {
    const userIdSSAChequear = this.sessionStorage.obtenerIDuserSS()
    this.data = this.route.snapshot.data as DataBusqueda
    if (userIdSSAChequear != null) {
      this.userIdSS = userIdSSAChequear
      this.busquedaAlService(this.userIdSS)
    }


    // this.recomendaciones = this.busquedaAlService()
    // this.recomendaciones = this.data.realizarBusqueda(
    //   this.serviceRecomendaciones,
    //   undefined,
    //   this.usuario.id
    // )
  }

  async getSR(){
    return await this.serviceRecomendaciones.busquedaRecomendaciones()
  }

  async busquedaAlService(userIdSS : number, palabraABuscar?: string){
    this.recomendaciones = await this.data.realizarBusqueda(
      this.serviceRecomendaciones,
      undefined,
      userIdSS
    )
    console.log(this.recomendaciones)
    return this.recomendaciones
  }


  async buscar(palabraABuscar?: string) {
    this.recomendaciones = await this.data.realizarBusqueda(
      this.serviceRecomendaciones,
      palabraABuscar,
      undefined
    )
  }
}
