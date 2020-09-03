import { Directive, Input} from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { GreaterZeroValidator } from './greater-zero.validator';

@Directive({
  selector: '[appGreaterZero]',
  providers: [{ provide: NG_VALIDATORS, useExisting: GreaterZeroDirective, multi: true }]
})
export class GreaterZeroDirective implements Validator{
  @Input('isChkZero') isChkZero: boolean;
  private valFn = GreaterZeroValidator();
	validate(control: AbstractControl): { [key: string]: any } {
    // console.log('hello >>> DirS', this.valFn(control));
		return this.isChkZero?null:this.valFn(control);
	}

  constructor() { }

}
