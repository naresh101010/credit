import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
    selector: '[appNumericAndDecimal]'
})
export class NumericAndDecimalDirective {

    constructor(private _el: ElementRef,private ngmodel:NgModel) { }

    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this._el.nativeElement.value;
        this._el.nativeElement.value = initalValue.replace(/[^0-9\.]/gi, '');
        this.ngmodel.update.emit(this._el.nativeElement.value)
        if (initalValue !== this._el.nativeElement.value) {
            event.stopPropagation();
        }
    }

}
