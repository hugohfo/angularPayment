import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expirationDate'
})
export class ExpirationDatePipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      const arr = value.match(/.{1,2}/g);  // quebra a string em grupos de dois dígitos
      return arr ? arr.join('/') : '';  // junta os grupos com '/'
    }
    return '';
  }
}
