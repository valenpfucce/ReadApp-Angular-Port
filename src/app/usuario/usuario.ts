
export class ValidationMessage {
  constructor(
    public field: string,
    public message: string
  ) {}
}

export class Usuario {
  nombre?: string 
  apellido: string | undefined
  username: string | undefined

  fechaNacimiento: Date | undefined
  mail: string | undefined
  tiempoLectura: number | undefined

  errors: ValidationMessage[] = []

  validador: sistemaValidacion;
  constructor() {
    this.validador = new sistemaValidacion();
  }

  /*Agregar formas de lectura y criterios de busqueda, como listas?*/


 guardarDatos(): boolean{

  this.validador.validarDatos(this)
  if (this.errors.length > 0) {
    return false;
  }
  return true;
  
 /*pegarle al service / back con nuevos datos*/

 }
 
 
 hasErrors(field: string): boolean {
 return this.errors.some((_) => _.field == field)
 }

 errorsFrom(field: string) {
   return this.errors.filter((_) => _.field == field).map((_) => _.message).join(". ")
 }

};



class sistemaValidacion{
  
  validarDatos(usuario:Usuario):void{
    usuario.errors.length = 0
    
    if (this.stringVacio(usuario.nombre!)){
      this.addError(usuario, 'nombre', 'El campo no puede estar vacio')
    }else if (this.conSimbolos(usuario.nombre!)){
      this.addError(usuario, 'nombre', 'El campo solo puede contener letras')
    }
  
    if (this.stringVacio(usuario.apellido!)){
      this.addError(usuario, 'apellido', 'El campo no puede estar vacio')
    }else if (this.conSimbolos(usuario.apellido!)){
      this.addError(usuario, 'apellido', 'El campo solo puede contener letras')
    }
     
    if (this.stringVacio(usuario.username!)){
      this.addError(usuario, 'username', 'El campo no puede estar vacio')
    }
    
    if (this.stringVacio(usuario.tiempoLectura!)){
      this.addError(usuario, 'tiempoLectura', 'El campo no puede estar vacio')
    }
    
    if (this.validarFecha(usuario.fechaNacimiento!)){
      this.addError(usuario, 'fecha', 'Debe ingresar fecha de nacimiento')
    }
  
    if (this.stringVacio(usuario.mail!)){
      this.addError(usuario, 'mail', 'El campo no puede estar vacio')
    } else if (this.sinDireccion(usuario.mail!)){
      this.addError(usuario, 'mail', 'Dirección inválida')
    }
  }

  validarFecha(fecha: string | Date | null | undefined): boolean {
    if (!fecha) return false;  // Si está vacío o nulo, no es válido
  
    // Si es una cadena, verificamos que no esté vacía y tenga el formato correcto
  if (typeof fecha === 'string') {
    return fecha.trim() !== '' && /^\d{4}-\d{2}-\d{2}$/.test(fecha)
  }

  return false  // Si no es ni string ni Date, no es válida
 }

  stringVacio(nombre: string | null | undefined | any): Boolean { 
    return typeof nombre !== 'string' || nombre.trim() === '';}

  
  conSimbolos(nombre: string): Boolean {
    const regex = /^[A-Za-z\s]+$/
    return !regex.test(nombre) }
 
  sinDireccion(mail: string): Boolean{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   
    return !regex.test(mail) }
  

 addError(usuario:Usuario,field: string, message: string) {
  usuario.errors.push(new ValidationMessage(field, message))
 }

};

