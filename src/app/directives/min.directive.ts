import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, Validators } from '@angular/forms';

@Directive({
    selector: '[minValue]',
    providers: [{provide: NG_VALIDATORS, useExisting: MinValidatorDirective, multi: true}]
})
export class MinValidatorDirective implements Validator {

    @Input('minValue') min: number;

    validate(control: AbstractControl): { [key: string]: any } {

        return Validators.min(this.min)(control);
    }
}
