import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cortarPalabra',
  standalone: true
})
export class CortarPalabraPipe implements PipeTransform {

  transform(string: string, limite: number): string {
    if(!string) return '';

    if(string.length > limite) {
      return string.substring(0,limite-3) + '...';
    }

    return string;
  }

}
