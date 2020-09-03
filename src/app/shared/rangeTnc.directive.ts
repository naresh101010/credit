import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, Validators, NG_VALIDATORS } from '@angular/forms';
import { RangeTncValidator } from './rangeTnc.validator';

@Directive({
  selector: '[appRangeTnc]',
  providers: [{ provide: NG_VALIDATORS, useExisting: rangeTncDirective, multi: true }]
})
export class rangeTncDirective implements Validator{
  private valFn = RangeTncValidator();
	validate(control: AbstractControl): { [key: string]: any } {
    // console.log('hello >>> DirS', this.valFn(control));
		return this.valFn(control);
	}

  constructor() { }

}
