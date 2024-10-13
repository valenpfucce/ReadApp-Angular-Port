import { Entidad } from "./entidad"
import { Recomendacion } from "./recomendacion"
import { FORMATO_FECHA } from "../services/configuration"
import dayjs from 'dayjs'
import { Libro } from "./libro"
import {FormaDeLeer,  Promedio, Ansioso, Fanatico,Recurrente} from "./formaDeLeer"


export type UsuarioJSON = {
  id: number,
  nombre : string, 
  apellido : string, 
  username : string,
  mail : string,
  password : string,
  fechaNacimiento? : Date,
  vpromedio: number,
  formaDeLeer: FormaDeLeer,
  perfilLista: string[],
  librosLeidos: Libro[],
  autoresPreferidos: string[],
  cantVecesLeido: Map<Libro["id"],number>,
  img_perfil: string
}

export class ValidationMessage {
  constructor(
    public field: string,
    public message: string
  ) {}
}

export class Usuario{ //SAQUE LA IMPLEMENTACION ENTIDAD
  
  // tipoLectura = [];
  
  recomendacionesAValorar ?: Recomendacion[];
  amigos ?:[Usuario];
  validador: sistemaValidacion;
  errors: ValidationMessage[] = [];

  constructor(
    public id?: number,
    public nombre : string = '', 
    public apellido : string= '',
    public username : string= '',
    public mail : string= '',
    public password : string= '',
    public fechaNacimiento? : Date,
    public vpromedio: number = 0,
    public formaDeLeer?: FormaDeLeer,
    public perfil: string[] = [], //es tipo de lectura, llega como objetos
    public librosLeidos: Libro[] = [],
    public autoresPreferidos: string[] = [],
    public cantVecesLeido: Map<Libro["id"],number> = new Map(),
    public img_perfil: string = ''
  
  ) {
    this.validador = new sistemaValidacion();
  }
  
  static fromJson(usuarioJSON: UsuarioJSON): Usuario {
    console.log("antes de transformar",usuarioJSON ) 
  
    const usertest = Object.assign(new Usuario(), usuarioJSON, {
      fechaNacimiento: usuarioJSON.fechaNacimiento
      ? dayjs(usuarioJSON.fechaNacimiento, FORMATO_FECHA).toDate()
      : undefined,
      perfil: Array.isArray(usuarioJSON.perfilLista)
      ? usuarioJSON.perfilLista.map((perfil:any) => perfil.type.toString()) // Convierte a string
      : [(usuarioJSON.perfilLista as any).type.toString()], // Si es un único perfil, lo envuelve en un array
      formaDeLeer: usuarioJSON.formaDeLeer.type == 'ansioso'
      ? usuarioJSON.formaDeLeer = new Ansioso()
      : usuarioJSON.formaDeLeer.type == 'promedio'
      ? usuarioJSON.formaDeLeer = new Promedio()
      : usuarioJSON.formaDeLeer.type == 'fanatico'
      ? usuarioJSON.formaDeLeer = new Fanatico()
      : usuarioJSON.formaDeLeer.type == 'recurrente'
      ? usuarioJSON.formaDeLeer = new Recurrente()
      : usuarioJSON.formaDeLeer.type == 'undefined'
      
    
      // autoresPreferidos: Array.isArray(usuarioJSON.autoresPreferidos)
      // ? usuarioJSON.autoresPreferidos.map((autor:any) => autor.type.toString()) // Convierte a string
      // : [(usuarioJSON.autoresPreferidos as any).type.toString()],
    
    });
    console.log("usertest",usertest )
    return usertest
  }
  
  asignarFormaLeer(usuarioJSON:UsuarioJSON){
    let formaDeLeer: FormaDeLeer | undefined;
    switch (usuarioJSON.formaDeLeer?.type) {
      case 'promedio':
        formaDeLeer = new Promedio();
        break;
      case 'ansioso':
        formaDeLeer = new Ansioso();
        break;
      case 'fanatico':
        formaDeLeer = new Fanatico();
        break;
      case 'recurrente':
        formaDeLeer = new Recurrente();
        break;
      default:
        formaDeLeer = undefined; 
    }
  }
  
  
  guardarDatos(): boolean{

    this.validador.validarDatos(this)
    if (this.errors.length > 0) {
      return false;
    }
      return true;

  }
 
  tiempoDeLecturaPromedio(libro: Libro): number {  
  return libro.cant_palabras_libro / this.vpromedio  
  } 

  
  hasErrors(field: string): boolean {
  return this.errors.some((_) => _.field == field)
  }

  errorsFrom(field: string) {
    return this.errors.filter((_) => _.field == field).map((_) => _.message).join(". ")
  }

  agregarRecomendacionAValorar(recomendacion: Recomendacion){
    this.recomendacionesAValorar?.push(recomendacion)
  }
  
  // fechaString(): string | undefined {
  //   return !this.fechaNacimiento ? '' : DateTime.fromJSDate(this.fechaNacimiento).toUTC().toFormat(FORMATO_FECHA)
  // }
  
  
  idUsuarioNotNull(): number{
    const idUsuarioAct = sessionStorage.getItem('userSession')
    if(idUsuarioAct === null){
      throw new Error('Usuaio Invalido');
    } else {
      return Number(idUsuarioAct) 
    }
    
  }
  
  
  toJSON(): UsuarioJSON {
    return {
      id : this.idUsuarioNotNull() ,
      nombre : this.nombre, 
      apellido : this.apellido, 
      username : this.username,
      mail : this.mail,
      password : this.password,
      fechaNacimiento : this.fechaNacimiento,
      vpromedio: this.vpromedio,
      formaDeLeer: this.formaDeLeer!,
      perfilLista: this.perfil,
      librosLeidos: this.librosLeidos,
      autoresPreferidos: this.autoresPreferidos,
      cantVecesLeido: this.cantVecesLeido,
      img_perfil: this.img_perfil
    }
  }
  

}

export class sistemaValidacion{
  
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
    
    if (this.numberVacio(usuario.vpromedio!)){
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

  numberVacio(numero: number | null | undefined | any): Boolean { 
  return typeof numero !== 'number' || isNaN(numero);
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

}

