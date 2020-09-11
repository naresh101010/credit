import { NgModel } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appAutoSelectFirstOption]'
})
export class AutoSelectFirstOptionDirective {

    constructor(private ngModel: NgModel) { }

    @Input() set dataArr(arr:any){
      this.setFirstOption(arr);
    }

    setFirstOption(arr:Array<any>){
        if(arr.length == 1){
          this.ngModel.update.emit(arr);
        }
    }


}
