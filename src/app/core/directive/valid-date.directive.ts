import { Directive, HostListener, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { NgModel } from '@angular/forms';

@Directive({
    selector: '[validDate]',
    providers: [NgModel]

})
export class ValidDateDirective {


    constructor(private _el: ElementRef, private ngModel: NgModel) { }
    @Output('minCompareDate') minCompareDate: EventEmitter<any> = new EventEmitter();
    @Input('minDate') minDate: any;

    // @HostListener('input', ['$event']) onInputChange(event) {
    //     const initalValue = this._el.nativeElement.value;
    //     this._el.nativeElement.value = initalValue.replace(/[^0-9/]*/g, '');
    //     if (initalValue !== this._el.nativeElement.value) {
    //         event.stopPropagation();
    //     }

    //     let checkDate = initalValue.split("/");
    //     if (checkDate.length == 3 && checkDate[2].length >= 4 && typeof (initalValue) == "string") {
    //         let dateVal = moment(initalValue, 'DD/MM/YYYY').format('YYYY-MM-DD');
    //         if (dateVal != "Invalid date")
    //             this.ngModel.update.emit(dateVal)
    //     }

    // }

    @HostListener('blur', ['$event']) onBlurChange(event) {
        const initalValue = this._el.nativeElement.value;
        let checkDate = initalValue.split("/");
        if (checkDate.length == 0 || checkDate.length ==1) {
            this._el.nativeElement.value = null;
            this.ngModel.update.emit(null)
        }

        let selectedYear: any = moment(initalValue, 'DD/MM/YYYYY').year();
        if (isNaN(selectedYear) || selectedYear > 9999) {
            this._el.nativeElement.value = null;
            this.ngModel.update.emit(null)
        }

        // this.sendMinCompareDate(initalValue)

    }


    sendMinCompareDate(value) {

        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        let minDate = moment(this.minDate).format('YYYY-MM-DD');

        if (minDate < todayDate) {
            return this.minCompareDate.emit(todayDate);
        }
        this.minCompareDate.emit(minDate);
    }
}