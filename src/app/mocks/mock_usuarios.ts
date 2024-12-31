// import { Injectable } from "@angular/core";
// import { Usuario } from "../domain/usuario";


// export const usuarios = [
//     new Usuario(
//         1,
//         'Juan', 
//         'Perez',
//         'juancito',
//         'juanperez@gmail.com',
//         'password',
//         new Date(12-9-24),
//         45,
//         ["ansioso"]
//     ),
//     new Usuario(
//         2,
//         'Maria', 
//         'Gomez',
//         'mariagomez',
//         'mariagomez@gmail.com',
//         'password',
//         new Date(2-5-29),
//         45,
//         ["ansioso"]
//     ),
//     new Usuario(
//         3,
//         'Mariano', 
//         'Apellido Falso',
//         'marianox34',
//         'mariano999@gmail.com',
//         'mamatequiero123',
//         new Date(2-5-29),
//         45,
//         ["ansioso"]
//     ),
//     new Usuario(
//         4,
//         'User', 
//         'Admin',
//         'admin',
//         'admin@gmail.com',
//         'password',
//         new Date(2-5-29),
//         45,
//         ["ansioso"]
//     ),
//     new Usuario(
//         5,
//         'MC', 
//         'A',
//         'mc@gmail.com',
//         'mca.lo@gmail.com',
//         '12345678',
//         new Date(2-5-29),
//         45,
//         ["ansioso"]
//     ),
// ]


// export class LoginVer{
//     login(mail: string, contrasenia: string) {
//         const usuarioEncontrado = usuarios.find(
//           usuario => usuario.mail.trim().toLowerCase() === mail.trim().toLowerCase()
//         );
//         if (usuarioEncontrado?.password.trim() === contrasenia.trim()) {
//           return usuarioEncontrado.id
//         } else {
//           return null 
//         }
//     }
// }