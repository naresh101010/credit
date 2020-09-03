import { AbstractControl, ValidatorFn } from '@angular/forms';

export function RangeTncValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let isWhitespace = (Number(control.value.flfcThresholdMax) <  Number(control.value.flfcThresholdMin))
    let isValid = !isWhitespace;
    return isValid ? null : { 'range': 'value is greater than zero' }
  };
  
}