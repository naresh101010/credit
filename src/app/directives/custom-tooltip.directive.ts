import { Directive, Input, TemplateRef, ElementRef, HostListener, ComponentRef } from '@angular/core';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CustomToolTipComponent } from '../components/custom-tool-tip/custom-tool-tip.component';

@Directive({
	selector: '[customToolTip]'
})
export class CustomTooltipDirective {

	/**
	* This will be used to show tooltip or not
	* This can be used to show the tooltip conditionally
	*/
	@Input() showToolTip: boolean = true;

	@Input(`tooltipMsg`) tooltipMsg: string;

	//If this is specified then specified template will be rendered in the tooltip
	@Input() contentTemplate: TemplateRef<any>;

	private _overlayRef: OverlayRef;

	constructor(private _overlay: Overlay,
		private _overlayPositionBuilder: OverlayPositionBuilder,
		private _elementRef: ElementRef) { }

	/**
	 * Init life cycle event handler
	 */
	ngOnInit() {

		if (!this.showToolTip) {
			return;
		}

		//you can take the position as an input to adjust the position
		//, for now, it will show at the bottom always; but you can adjust your code as per your need
		const positionStrategy = this._overlayPositionBuilder
			.flexibleConnectedTo(this._elementRef)
			.withPositions([{
				originX: 'center',
				originY: 'bottom',
				overlayX: 'center',
				overlayY: 'top',
				offsetY: 5,
			}]);

		this._overlayRef = this._overlay.create({ positionStrategy });

	}

	/**
	 * This method will be called whenever the mouse enters in the Host element
	 * i.e. where this directive is applied
	 * This method will show the tooltip by instantiating the CustomToolTipComponent and attaching to the overlay
	 */
	@HostListener('mouseenter')
	show() {

		if (this._overlayRef && !this._overlayRef.hasAttached()) {
			const tooltipRef: ComponentRef<CustomToolTipComponent> = this._overlayRef.attach(new ComponentPortal(CustomToolTipComponent));
			tooltipRef.instance.text = this.tooltipMsg;
			tooltipRef.instance.contentTemplate = this.contentTemplate;
		}
	}

	/**
	 * This method will be called when the mouse goes out of the host element
	 * i.e. where this directive is applied
	 * This method will close the tooltip by detaching the overlay from the view
	 */
	@HostListener('mouseleave')
	hide() {
		this.closeToolTip();
	}

	/**
	 * Destroy lifecycle event handler
	 * This method will make sure to close the tooltip              
	 */
	ngOnDestroy() {
		this.closeToolTip();
	}

	/**
	 * This method will close the tooltip by detaching the component from the overlay
	 */
	private closeToolTip() {
		if (this._overlayRef) {
			this._overlayRef.detach();
		}
	}

}