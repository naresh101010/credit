import { Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[numericSpecialChar]'
})

export class NumericSpecialCharDirective {
  key;
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    this.key = event.keyCode;
    if(this.key == 99 || this.key == 118 || this.key == 67 || this.key == 86) {
      return true
    }
    else if ((this.key >= 65 && this.key <= 90) || (this.key >= 97 && this.key <= 122)) {
      event.preventDefault();
    }
  }


}