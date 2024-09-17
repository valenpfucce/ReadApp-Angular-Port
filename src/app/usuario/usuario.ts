import { Component } from '@angular/core';
// import dayjs from 'dayjs'

// @Component({
//   selector: 'app-usuario',
//   standalone: true,
//   imports: [],
//   templateUrl: './usuario.component.html',
//   styleUrl: './usuario.component.css'
// })

export class ValidationMessage {
  constructor(public field: string, public message: string) {}
}


export class Usuario {
  nombre: string | undefined
  apellido: string | undefined
  username: string | undefined
  fechaNacimiento: Date | undefined
  mail: string | undefined
  tiempoLectura: number | undefined

  errors: ValidationMessage[] = []

  /*Agregar formas de lectura y criterios de busqueda, como listas?*/


 guardarDatos(){
 this.validarDatos()

 }
 
 validarDatos(){



 }

 
 
//  addError(field: string, message: string) {
//   this.errors.push(new ValidationMessage(field, message))
//  }


}
