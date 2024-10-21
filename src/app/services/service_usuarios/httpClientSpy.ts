import { of } from 'rxjs'

import { Usuario } from '../../domain/usuario'
import { REST_SERVER_URL } from '../configuration'
import {Recomendacion} from "../../domain/recomendacion";

export const usuarioAsignatario = new Usuario(1, "Carlitos", "ApelldioFalso", "SoyCarlitos", "SoyCarlitos@gmail.com")



const usuarioActualizado = [
    usuarioAsignatario,
    new Usuario(1, "John", "Pepona", "SoyPepo", "SoyPepo@gmail.com"),
].map((usuario) => usuario.toJSON)
// export const tareaPrincipal = new Tarea(
//   1,
//   'Testear httpClient con stubs',
//   'Iteración 1',
//   usuarioAsignatario,
//   new Date('2020-05-02'),
//   50
// )

// const tareasStub = [
//   tareaPrincipal,
//   new Tarea(
//     2,
//     'Desarrollar testeo e2e',
//     'Iteración 2',
//     undefined,
//     new Date('2020-11-12'),
//     0
//   )
// ].map((tarea) => tarea.toJSON())

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
    .withArgs(`${REST_SERVER_URL}/usuarios/actualizar/` + usuarioAsignatario.id, usuarioActualizado)
  httpClientSpy.get
    .withArgs(`${REST_SERVER_URL}/recomendaciones/1`)
    .and.returnValue(of(recomendacionesStub[0]))
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

export const recomendacion1 = new Recomendacion(1, 1, "Recomendacion 1", true, "Descripción", [], [], 4, 9)
const recomendacionesStub = [
  recomendacion1,
  new Recomendacion(2, 2, "Ejemplo", true, "Descripción", [], [], 4, 9)
].map((recomendacion) => recomendacion.toJSON)
