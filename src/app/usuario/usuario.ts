import { Component } from '@angular/core'
// import dayjs from 'dayjs'

export class ValidationMessage {
  constructor(
    public field: string,
    public message: string
  ) {}
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

  guardarDatos() {
    this.validarDatos()
    if (this.errors.length > 0) return
    /*pegarle al service / back con nuevos datos*/
    /* cartel de guardado exitoso*/
  }

  validarDatos(): void {
    this.errors.length = 0

    if (this.stringVacio(this.nombre!)) {
      this.addError('nombre', 'El campo no puede estar vacio')
    } else if (this.conSimbolos(this.nombre!)) {
      this.addError('nombre', 'El campo solo puede contener letras')
    }

    if (this.stringVacio(this.apellido!)) {
      this.addError('apellido', 'El campo no puede estar vacio')
    } else if (this.conSimbolos(this.apellido!)) {
      this.addError('apellido', 'El campo solo puede contener letras')
    }

    if (this.stringVacio(this.username!)) {
      this.addError('username', 'El campo no puede estar vacio')
    }

    if (this.stringVacio(this.tiempoLectura!)) {
      this.addError('tiempoLectura', 'El campo no puede estar vacio')
    }

    if (this.stringVacio(this.mail!)) {
      this.addError('mail', 'El campo no puede estar vacio')
    } else if (this.sinDireccion(this.mail!)) {
      this.addError('mail', 'Direccion invalida')
    }
  }

  stringVacio(nombre: string | null | undefined | any): Boolean {
    return !nombre || nombre.trim() === ''
  }

  conSimbolos(nombre: string): Boolean {
    const regex = /^[A-Za-z\s]+$/
    return !regex.test(nombre)
  }

  sinDireccion(mail: string): Boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return !regex.test(mail)
  }

  addError(field: string, message: string) {
    this.errors.push(new ValidationMessage(field, message))
  }

  hasErrors(field: string): boolean {
    return this.errors.some((_) => _.field == field)
  }

  errorsFrom(field: string) {
    return this.errors
      .filter((_) => _.field == field)
      .map((_) => _.message)
      .join('. ')
  }
}
