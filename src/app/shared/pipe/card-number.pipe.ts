// card-number.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumber'
})
export class CardNumberPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      const arr = value.match(/.{1,4}/g);  // quebra a string em grupos de quatro dígitos
      return arr ? arr.join(' ') : '';  // junta os grupos com ' '
    }
    return '';
  }
}
