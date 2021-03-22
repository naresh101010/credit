import { AbstractControl, ValidatorFn } from '@angular/forms';

export function NumericValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {  
    if((Number(control.value) > Number(100))) {
      return { 'expenseType': 'Value is Invalid' }
    } else {
      return null;
    }    
  };
  
}