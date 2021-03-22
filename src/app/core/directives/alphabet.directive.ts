import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphabetOnly]'
})

export class AlphabetOnlyDirective {
  key;
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    this.key = event.keyCode;
    console.log(this.key);
    if ((this.key >= 48 && this.key <= 57) || (this.key >= 96 && this.key <= 105)) {
      event.preventDefault();
    }
  }
}