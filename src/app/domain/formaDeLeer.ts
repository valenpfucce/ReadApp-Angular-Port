import { Libro } from "./libro";
import { Usuario } from "./usuario";

export interface FormaDeLeer {
    type: any;
    tiempoDeLectura(libro: Libro, usuario: Usuario): number;
}

export class Promedio implements FormaDeLeer {
    type: any;
    
    constructor() {
        this.type = 'Promedio'; // Inicializa el tipo en el constructor
    }
    
    tiempoDeLectura(libro: Libro, usuario: Usuario): number {
        return usuario.tiempoDeLecturaPromedio(libro);
    }
}

// Clase Ansioso
export class Ansioso implements FormaDeLeer {
    type: any;
    
    constructor() {
        this.type = 'Ansioso'; // Inicializa el tipo en el constructor
    }
    
    tiempoDeLectura(libro: Libro, usuario: Usuario): number {
        return libro.esBestSeller
            ? usuario.tiempoDeLecturaPromedio(libro) * 0.5
            : usuario.tiempoDeLecturaPromedio(libro) * 0.8;
    }
}

// Clase Fanatico
export class Fanatico implements FormaDeLeer {
    type: any;
    
    constructor() {
        this.type = 'Fanatico'; // Inicializa el tipo en el constructor
    }
    

    tiempoDeLectura(libro: Libro, usuario: Usuario): number {
        return this.validacionFanatico(libro, usuario)
            ? this.tiempoLongitud(libro, usuario)
            : usuario.tiempoDeLecturaPromedio(libro);
    }

    private validacionFanatico(libro: Libro, usuario: Usuario): boolean {
        return (
            !usuario.librosLeidos.includes(libro) &&
            usuario.autoresPreferidos.includes(libro.autor_apellido) //REVISAR get usuario -> obj.autor y necesito una listas de
        );
    }

    private tiempoLongitud(libro: Libro, usuario: Usuario): number {
        return !libro.esLargo
            ? usuario.tiempoDeLecturaPromedio(libro) + libro.cant_palabras_libro * 2
            : usuario.tiempoDeLecturaPromedio(libro) +
            libro.paginasLargo * 2 +
            (libro.cant_palabras_libro - libro.paginasLargo);
    }
}

// Clase Recurrente

export class Recurrente implements FormaDeLeer {
    type: any;
    
    constructor() {
        this.type = 'Recurrente'; // Inicializa el tipo en el constructor
    }
    
    private valorRecurrente(libro: Libro, usuario: Usuario): number {
        const vecesLeido = usuario.cantVecesLeido.get(libro.id) || 0;
        return vecesLeido <= 5
            ? this.calculoPorcentaje(libro, usuario)
            : usuario.tiempoDeLecturaPromedio(libro) * 0.95;
    }

    private calculoPorcentaje(libro: Libro, usuario: Usuario): number {
        const vecesLeido = usuario.cantVecesLeido.get(libro.id) || 0;   //REVISAR, map de libro.id , number
        return (
            usuario.tiempoDeLecturaPromedio(libro) -
            (vecesLeido / 100) * usuario.tiempoDeLecturaPromedio(libro)
        );
    }

    tiempoDeLectura(libro: Libro, usuario: Usuario): number {
        return usuario.librosLeidos.includes(libro)
            ? this.valorRecurrente(libro, usuario)
            : usuario.tiempoDeLecturaPromedio(libro);
    }
}

export class Perfil  {
    // type: any;
    // constructor() {
    //     this.type = 'Recurrente'; // Inicializa el tipo en el constructor
    // }
   
}
