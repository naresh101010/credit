import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[uppercaseOnly]',
    host: {
        '(input)': '$event'
    }
})
export class TextUpperCaseDirectiveOnly {

    lastValue: string;
    private VALID_REGEX = /[^0-9a-zA-Z, ]/gi;
    // /^[0-9.,]+$/

    constructor(public ref: ElementRef) { }
    formatInput(input) {
        return input.replace(this.VALID_REGEX, '');
    }


    @HostListener('input', ['$event']) onInput($event) {
        
        var start = $event.target.selectionStart;
        var end = $event.target.selectionEnd;
        $event.target.value = $event.target.value.toUpperCase();
        $event.target.value = this.formatInput($event.target.value)
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
