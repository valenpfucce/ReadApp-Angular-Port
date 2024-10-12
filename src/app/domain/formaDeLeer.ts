// import { Libro } from "./libro";
// import { Usuario } from "./usuario";

// interface FormaDeLeer {
//     tiempoDeLectura(libro: Libro, usuario: Usuario): number;
// }

// class Promedio implements FormaDeLeer {
//     tiempoDeLectura(libro: Libro, usuario: Usuario): number {
//         return usuario.tiempoDeLecturaPromedio(libro);
//     }
// }

// // Clase Ansioso
// class Ansioso implements FormaDeLeer {
//     tiempoDeLectura(libro: Libro, usuario: Usuario): number {
//         return libro.esBestSeller()
//             ? usuario.tiempoDeLecturaPromedio(libro) * 0.5
//             : usuario.tiempoDeLecturaPromedio(libro) * 0.8;
//     }
// }

// // Clase Fanatico
// class Fanatico implements FormaDeLeer {
//     tiempoDeLectura(libro: Libro, usuario: Usuario): number {
//         return this.validacionFanatico(libro, usuario)
//             ? this.tiempoLongitud(libro, usuario)
//             : usuario.tiempoDeLecturaPromedio(libro);
//     }

//     private validacionFanatico(libro: Libro, usuario: Usuario): boolean {
//         return (
//             !usuario.librosLeidos.includes(libro) &&
//             usuario.autoresPreferidos.includes(libro.autor)
//         );
//     }

//     private tiempoLongitud(libro: Libro, usuario: Usuario): number {
//         return !libro.esLargo()
//             ? usuario.tiempoDeLecturaPromedio(libro) + libro.paginas * 2
//             : usuario.tiempoDeLecturaPromedio(libro) +
//             libro.paginasLargo * 2 +
//             (libro.paginas - libro.paginasLargo);
//     }
// }

// // Clase Recurrente

// class Recurrente implements FormaDeLeer {
//     private valorRecurrente(libro: Libro, usuario: Usuario): number {
//         const vecesLeido = usuario.cantVecesLeido.get(libro) || 0;
//         return vecesLeido <= 5
//             ? this.calculoPorcentaje(libro, usuario)
//             : usuario.tiempoDeLecturaPromedio(libro) * 0.95;
//     }

//     private calculoPorcentaje(libro: Libro, usuario: Usuario): number {
//         const vecesLeido = usuario.cantVecesLeido.get(libro) || 0;
//         return (
//             usuario.tiempoDeLecturaPromedio(libro) -
//             (vecesLeido / 100) * usuario.tiempoDeLecturaPromedio(libro)
//         );
//     }

//     tiempoDeLectura(libro: Libro, usuario: Usuario): number {
//         return usuario.librosLeidos.includes(libro)
//             ? this.valorRecurrente(libro, usuario)
//             : usuario.tiempoDeLecturaPromedio(libro);
//     }
// }