import { Usuario } from "../domains/usuario";


export const usuarios = [
    new Usuario(
        1,
        'Juan', 
        'Perez',
        'juancito',
        new Date(12-9-24),
        'juanperez@gmail.com',
        'password'
    ),
    new Usuario(
        2,
        'Maria', 
        'Gomez',
        'mariagomez',
        new Date(2-5-29),
        'mariagomez@gmail.com',
        'password'
    ),
    new Usuario(
        3,
        'Mariano', 
        'Apellido Falso',
        'marianox34',
        new Date(2-5-29),
        'mariano999@gmail.com',
        'mamatequiero123'
    ),
    new Usuario(
        4,
        'User', 
        'Admin',
        'admin',
        new Date(2-5-29),
        'admin@gmail.com',
        'password'
    ),
    new Usuario(
        5,
        'MC', 
        'A',
        'mc@gmail.com',
        new Date(2-5-29),
        'mca.lo@gmail.com',
        '12345678'
    ),
]

export class LoginVer{
    login(mail: string, contrasenia: string) {
        const usuarioEncontrado = usuarios.find(
          usuario => usuario.mail.trim().toLowerCase() === mail.trim().toLowerCase()
        );
        if (usuarioEncontrado?.password.trim() === contrasenia.trim()) {
          return usuarioEncontrado.id
        } else {
          return null 
        }
    }
}