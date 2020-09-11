import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[percentageNumber]'
})
export class PercentageNumberDirective {

	// private regex: RegExp = new RegExp("^\d+[.]?\d*%?$");
	private regex: RegExp = new RegExp(/^\d{1,9}(\.\d{1,2})?%?$/g);
	private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete','.'];
	
    constructor(private el: ElementRef) { }
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        // Allow Backspace, tab, end, and home keys
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        let current: string = this.el.nativeElement.value;
        const position = this.el.nativeElement.selectionStart;
        const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    }

}
