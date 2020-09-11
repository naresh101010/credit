import { NgModel } from '@angular/forms';
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
	selector: '[limitTo]'
})
export class LimitToDirective {

	constructor(private _el: ElementRef, private ngmodel: NgModel,private renderer:Renderer2) { }

	@Input('limitTo') limitTo = "0";
	@Input('msgElem') msgElem;
	@Input('reqMsg') reqMsg;

	@HostListener('blur', ['$event']) onInputChange(event) {
		
		const initalValue = this._el.nativeElement.value;
		this.renderer.setStyle(this.msgElem,'display','none');
		if(this.reqMsg){
			this.renderer.setStyle(this.reqMsg,'display','none');
		}
		if(parseFloat(this.limitTo) > parseFloat(initalValue)){
			
			this._el.nativeElement.value =  '';
			this.renderer.setStyle(this.msgElem,'display','block');
			
			this.ngmodel.update.emit(this._el.nativeElement.value)
			if (initalValue !== this._el.nativeElement.value) {
				event.stopPropagation();
			}
		}
	}

}
