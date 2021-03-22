import { Directive, ElementRef, HostListener} from '@angular/core';
import { NgControl } from "@angular/forms";


@Directive({
  selector: '[alphanumeric]'
})

export class AlphanumericDirective {

  constructor(public el: ElementRef, private control: NgControl) {  }

  private VALID_REGEX = /[^0-9a-z ]/gi;

  formatInput(input) {
    return input.replace(this.VALID_REGEX, '');
  }

  setControlValue(val) {
    let value = val;
    setTimeout(() => { 
      this.control.control.setValue(value);      
    }); 
  }

  @HostListener('input', ['$event']) onInput(event) {
    this.setControlValue(this.formatInput(this.el.nativeElement.value));
  }


}