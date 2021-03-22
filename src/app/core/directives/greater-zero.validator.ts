import { AbstractControl, ValidatorFn } from '@angular/forms';

export function GreaterZeroValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if(control.value != ''){
    let isWhitespace = (control.value <= 0)
    // //console.log('hello', isWhitespace);
    let isValid = !isWhitespace;
    return isValid ? null : { 'greaterZero': 'value is greater than zero' }
  } else {
    return null;
  }
}
  
}