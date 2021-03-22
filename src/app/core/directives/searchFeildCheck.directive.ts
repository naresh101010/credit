import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSearchFieldCheck]'
})

export class SearchFieldCheckDirective {
  key;
  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    this.key = event.key;
    if (this.key == '<' || this.key == '>' || this.key == '/') {
      event.preventDefault();
    }
  }
}