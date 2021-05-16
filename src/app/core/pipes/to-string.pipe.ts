import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toString'
})
export class ToStringPipe implements PipeTransform {

  transform(value: any[], key: string): string {
    if (!value || !value.length || !key) return '';
    // console.log('value', value);
    return value.map(el => el[key]).join(', ');
  }

}
