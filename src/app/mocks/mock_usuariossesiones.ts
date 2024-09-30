import { sistemaValidacion, ValidationMessage } from '../domains/usuario'

export class UsuarioSession {
  validador: sistemaValidacion
  errors: ValidationMessage[] = []
  constructor(
    public mail: String,
    public pass: String
  ) {
    this.validador = new sistemaValidacion()
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

export const sesionesUsuarios = [
  new UsuarioSession('mariano999@gmail.com', 'soyUnGil'),
  new UsuarioSession('admin@gmail.com', 'password'),
  new UsuarioSession('MC@gmail.com', 'password')
]
