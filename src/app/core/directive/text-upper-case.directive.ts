import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
    selector: '[uppercase]',
    host: {
        '(input)': '$event'
    },
    providers: [NgModel]

})
export class TextUpperCaseDirective {

    lastValue: string;
    private VALID_REGEX = /[^0-9a-zA-Z ]/gi;

    constructor(public ref: ElementRef,private ngModel: NgModel) { }
    formatInput(input) {
        return input.replace(this.VALID_REGEX, '');
    }

    @HostListener('input', ['$event']) onInput($event) {    
        
        var start = $event.target.selectionStart;
        var end = $event.target.selectionEnd;
        $event.target.value = $event.target.value.toUpperCase();
        $event.target.value = this.formatInput($event.target.value);
        this.ngModel.update.emit($event.target.value)
        $event.target.setSelectionRange(start, end);
        $event.preventDefault();

        if (!this.lastValue || (this.lastValue && $event.target.value.length > 0 && this.lastValue !== $event.target.value)) {
            this.lastValue = this.ref.nativeElement.value = $event.target.value;
            const evt = document.createEvent('HTMLEvents');
            evt.initEvent('input', false, true);
            event.target.dispatchEvent(evt);
        }
    }
}
