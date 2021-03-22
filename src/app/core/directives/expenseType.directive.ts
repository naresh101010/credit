import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { NumericValidator } from './expenseType.validator';

@Directive({
  selector: "input[expenseType]",
  providers: [{ provide: NG_VALIDATORS, useExisting: ExpenseType, multi: true }]
})
export class ExpenseType {
  @Input() expenseType: any;
  @Input('isChkZero') isChkZero: boolean;

  constructor(private el: ElementRef) { 
  }


  private valFn = NumericValidator();
  
  validate(control: AbstractControl): { [key: string]: any } {
  if(!control.value){
    return null;
  }
    return this.expenseType?this.valFn(control):null;
  }

}