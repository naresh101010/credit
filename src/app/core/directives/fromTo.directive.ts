import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl,ValidatorFn,  NG_VALIDATORS } from '@angular/forms';
@Directive({
  selector: '[fromTo]',
  providers: [{ provide: NG_VALIDATORS, useExisting: FromToDirective, multi: true }]
})
export class FromToDirective implements Validator{
  @Input('isChkZero') isChkZero: boolean;
  @Input('from') from;
 
  private valFn = this.FromToValidator();
	validate(control: AbstractControl): { [key: string]: any } {
		return this.isChkZero?null:this.valFn(control);
    }
    
    FromToValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          let isWhitespace = (Number(control.value) <= Number(this.from))
          let isValid = !isWhitespace;
          return isValid ? null : { 'greaterFrom': 'value is greater than From' }
        };
        
      }

}


