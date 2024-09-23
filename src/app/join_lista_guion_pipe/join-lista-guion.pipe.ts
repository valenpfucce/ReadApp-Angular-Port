import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinListaGuion',
  standalone: true
})
export class JoinListaGuionPipe implements PipeTransform {
  transform(value: string[], separator: string = ' - '): string {
    return value.slice(0, 4).join(separator);
  }
}
