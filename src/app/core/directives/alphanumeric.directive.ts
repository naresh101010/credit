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

  @HostListener('input', ['$event']) onInput(event) {
    let alphaDiv = document.getElementById('alphanumeric');
    console.log("1")
    if(!alphaDiv){
      let new_div = document.createElement('div');
        new_div.id = 'alphanumeric';
        document.getElementsByTagName('body')[0].appendChild(new_div);
    }
    if(alphaDiv){
      alphaDiv.textContent = this.el.nativeElement.value;
        if(alphaDiv.textContent){
          this.control.control.setValue(this.formatInput(alphaDiv.textContent))
        }
    }else{
      this.control.control.setValue("")
    }
    
  }


}