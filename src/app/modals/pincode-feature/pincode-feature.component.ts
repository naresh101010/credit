import { Component, OnInit } from '@angular/core';
import { GeographyService } from 'src/app/services/geography.service';

@Component({
	selector: 'app-pincode-feature',
	templateUrl: './pincode-feature.component.html',
})
export class PincodeFeatureComponent implements OnInit {

	constructor(private $geography: GeographyService) { }

	ngOnInit() {
		this.getPincodeFeatures();
	}

	pincodeFeatures:Array<any>;
	getPincodeFeatures() {
		this.$geography.getLoadData().subscribe(response => {
			this.pincodeFeatures = response.referenceData.pincodeFeatures;
		})
	}

}
