import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
	selector: 'app-custom-tool-tip',
	templateUrl: './custom-tool-tip.component.html',
	styleUrls: ['./custom-tool-tip.component.css']
})
export class CustomToolTipComponent implements OnInit {

	@Input() text: string;
	
	@Input() contentTemplate: TemplateRef<any>;

	constructor() { }

	ngOnInit() {
	}

} 