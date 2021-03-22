import { AbstractControl, ValidatorFn } from '@angular/forms';

export function NumericValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {      
      let regex = /^\d*\.?\d{0,2}$/g;    
      let current: string = control.value;
      let exp = String(current).match(regex);
    
      if(!exp || (Number(control.value) >= Number(100000000))) {
        return { 'isNumeric': 'Value is Invalid' }
      } else {
        return null;
      }
    
  };
  
}