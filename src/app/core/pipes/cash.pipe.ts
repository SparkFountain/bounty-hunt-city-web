import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cash',
})
export class CashPipe implements PipeTransform {
  transform(value: number): string {
    const cashDigits = value.toString().length;
    return `${'0'.repeat(8 - cashDigits)}${value}`;
  }
}
