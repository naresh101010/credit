import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, Validators, NG_VALIDATORS } from '@angular/forms';
import { GreaterZeroValidator } from './greater-zero.validator';

@Directive({
  selector: '[appGreaterZero]',
  providers: [{ provide: NG_VALIDATORS, useExisting: GreaterZeroDirective, multi: true }]
})
export class GreaterZeroDirective implements Validator{
  private valFn = GreaterZeroValidator();
	validate(control: AbstractControl): { [key: string]: any } {
    // console.log('hello >>> DirS', this.valFn(control));
		return this.valFn(control);
	}

  constructor() { }

}
