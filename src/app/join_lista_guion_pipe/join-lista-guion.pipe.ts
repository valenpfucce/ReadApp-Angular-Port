import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinListaGuion',
  standalone: true
})
export class JoinListaGuionPipe implements PipeTransform {
  transform(value: string[], separador: string, cuantoACortar: number): string {
    return value.slice(0, cuantoACortar).join(separador);
  }
}
