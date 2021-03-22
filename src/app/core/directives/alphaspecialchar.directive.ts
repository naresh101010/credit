import { Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[alphaSpecialChar]'
})

export class AlphaSpecialCharDirective {
  key;
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    this.key = event.key;
    //console.log(this.key);
    if (this.key >= 0 && this.key <= 9) {
      event.preventDefault();
    }
  }


}