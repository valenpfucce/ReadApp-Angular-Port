import { Usuario } from "../domains/usuario";

export const usuarios = [
    new Usuario(
        1,
        'Juan', 
        'Perez',
        'juancito',
        new Date(12-9-24),
        'juanperez@gmail.com'
    ),
    new Usuario(
        2,
        'Maria', 
        'Gomez',
        'mariagomez',
        new Date(2-5-29),
        'mariagomez@gmail.com'
    )
]