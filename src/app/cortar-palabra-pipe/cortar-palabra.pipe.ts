import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cortarPalabra',
  standalone: true
})
export class CortarPalabraPipe implements PipeTransform {

  transform(libro: string, limite: number): string {
    if(!libro) return '';

    if(libro.length > limite) {
      return libro.substring(0,limite) + '...';
    }

    return libro;
  }

}
