import { Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[numericSpecialChar]'
})

export class NumericSpecialCharDirective {
  key;
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    this.key = event.keyCode;
    console.log(this.key);
    if ((this.key >= 65 && this.key <= 90) || (this.key >= 97 && this.key <= 122)) {
      event.preventDefault();
    }
  }


}