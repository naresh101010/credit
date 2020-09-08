import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {

  key;
  @HostListener('keydown', ['$event']) 
  onKeydown(event: KeyboardEvent) {
    this.key = event.keyCode;
    console.log(this.key);
    if (!(this.key >= 48 && this.key <= 57)) {
      event.preventDefault();
    }
  }

}
