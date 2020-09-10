import {Directive, Input} from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { NumericValidator } from './numeric.validator';


@Directive({
    selector: '[numeric]',
    providers: [{ provide: NG_VALIDATORS, useExisting: NumericDirective, multi: true }]
})

export class NumericDirective {
  @Input('isChkZero') isChkZero: boolean;
  private valFn = NumericValidator();
	validate(control: AbstractControl): { [key: string]: any } {
    if(!control.value){
      return null;
    }
		return this.isChkZero?null:this.valFn(control);
	}

  constructor() { }
  
}