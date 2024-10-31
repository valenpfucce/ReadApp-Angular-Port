import { of } from 'rxjs'
import { Usuario } from '../../domain/usuario'
import { REST_SERVER_URL } from '../configuration'
import {Recomendacion} from "../../domain/recomendacion";

export const usuarioAsignatario = new Usuario(1, "Carlitos", "ApelldioFalso", "SoyCarlitos", "SoyCarlitos@gmail.com")
export const usuarioActualizado = new Usuario(1, "John", "Pepona", "SoyPepo", "SoyPepo@gmail.com")
export const usuarioCarlos = new Usuario(1, "Carlitos", "ApelldioFalso", "SoyCarlitos", "SoyCarlitos@gmail.com")



const usuariosStub = [
  { id: 1, nombre: 'Victoria Marconi' },
  { id: 2, nombre: 'Gabriel Pérez' }
]

export const getHttpClientSpy = () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', [
    'get',
    'put',
    'post',
    'patch'
  ])

  httpClientSpy.get
    .withArgs(`${REST_SERVER_URL}/usuarios/` + usuarioAsignatario.id)
    .and.returnValue(of(usuarioAsignatario))
  httpClientSpy.put
    .withArgs(`${REST_SERVER_URL}/usuarios/actualizar/` + usuarioAsignatario.id,
    usuarioActualizado)
    .and.returnValue(Promise.resolve())
  // httpClientSpy.get
  //   .withArgs(`${REST_SERVER_URL}/recomendaciones/` + recomendacion1.id)
  //   .and.returnValue(of(recomendacionesStub[0]))

    
//    httpClientSpy.get
//     .withArgs(`${REST_SERVER_URL}/usuarios`)
//     .and.returnValue(of(usuariosStub))
//   httpClientSpy.put.and.returnValue(of(tareasStub[0]))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   httpClientSpy.post.and.callFake((_url: string, body: any) =>
//     of({ ...body, id: 3 })
//   )

  return httpClientSpy
}


// export const recomendacion1 = new Recomendacion(1, 1, "Recomendacion 1", true, "Descripción", [], [], 4, 9)
// const recomendacionesStub = [
//   recomendacion1,
//   new Recomendacion(2, 2, "Ejemplo", true, "Descripción", [], [], 4, 9)
// ].map((recomendacion) => recomendacion.toJSON)
