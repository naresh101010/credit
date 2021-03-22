import {Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { NumericFourDigitsValidator } from './numeric-four-digits.validator';


@Directive({
    selector: '[numeric-4]',
    providers: [{ provide: NG_VALIDATORS, useExisting: NumericFourDigitsDirective, multi: true }]
})

export class NumericFourDigitsDirective {
  @Input('isChkZero') isChkZero: boolean;
  private valFn = NumericFourDigitsValidator();
	validate(control: AbstractControl): { [key: string]: any } {
    if(!control.value){
      return null;
    }
		return this.isChkZero?null:this.valFn(control);
	}

  constructor() { }
  
}