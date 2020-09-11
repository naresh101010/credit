import { FuelPriceService } from 'src/app/services/fuel.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-add-metro',
	templateUrl: './add-metro.component.html',
	styleUrls: ['./add-metro.component.css']
})
export class AddMetroComponent implements OnInit {

	constructor(
		@Inject(MAT_DIALOG_DATA) public dataObj,
		private $fuel: FuelPriceService,
		public dialogRef: MatDialogRef<AddMetroComponent>,
		private spinner: NgxSpinnerService
	) { }

	cityList: Array<any> = [];
	fuelIndexList: Array<any> = [];
	metroObj = {} as any;
	isEdit = false;
	searchCtrl = '';
	isAdd = false;
	preSelectedCities = [];
  editMode;
  fuelNameSearchCtrl = <string>'';
  cityNameSearchCtrl = <string>'';

	ngOnInit() {

		this.cityList = this.dataObj.data.cityList;
		this.fuelIndexList = this.dataObj.data.fuelIndexList;
		if (this.dataObj.data.EditType) {
			this.editMode = this.dataObj.data.EditType;
		}
		if (this.dataObj.editObj) {
			this.isEdit = true;
			this.metroObj = { ...this.dataObj.editObj };
			let selectedCities = [...this.metroObj.cities.filter(elem => elem.status == 1)]
			this.metroObj.cities = [];
			selectedCities.forEach(elem => {
				let city = this.cityList.find(elm => elm.id == elem.cityId);
                if(!city) return;
				this.metroObj.cities.push(city);
			})
			//  selectedCities.filter(elem=>elem.status)

			this.preSelectedCities = [...this.dataObj.editObj.cities]
		} else if (this.dataObj.isAdd) {
			this.metroObj = { ...this.dataObj.isAdd }
			if (this.metroObj.lkpFuelIndexId) {
				this.isAdd = true;
			}

		}

	}

	checkSelectedCity(o1, o2): boolean {
		if (o2) {
			return o1.id === o2.id
			//  && o2.status;
		}
	}

	checkForCitiesNumber(ev=null) {

		let cities = [];

		if (this.isEdit) {

			this.preSelectedCities.forEach(elem => {
				let cityObj = this.metroObj.cities.find(elm => elm.id == elem.cityId);
				if (cityObj) {
					elem.status = 1;
					cities.push(elem)
				} else {
					elem.status = 0;
					cities.push(elem);
				}
			})

			this.metroObj.cities.map(elem => {
				let cityIndex = this.preSelectedCities.findIndex(elm => elm.cityId == elem.id);
				if (cityIndex == -1) {
					cities.push({
						"cityId": elem.id,
						"id": 0,
						"status": 1
					})
				}
			})

		} else {
			this.metroObj.cities.map(elem => {
				cities.push({
					"cityId": elem.id,
					"id": 0,
					"status": 1
				})
			})


		}

		let count = cities.filter(elem => elem.status).length;
		let lkpFuelIndexName = this.fuelIndexList.find(elem => elem.id == this.metroObj.lkpFuelIndexId)

		let eightState = lkpFuelIndexName.descr.includes('8')
		let fourState = lkpFuelIndexName.descr.includes('4')
		document.getElementById("errorMsg").innerText = "";
		let status=true;
		if (count != 4 && fourState) {
			document.getElementById("errorMsg").innerText = "Please Select 4 Cities";
			status = false;
		}
		if (count != 8 && eightState) {
			document.getElementById("errorMsg").innerText = "Please Select 8 Cities";
			status = false;
		}

		return {
			status : status,
			cities : cities
		};
	}

	mapMetroWithCity() {

		let returnObj = this.checkForCitiesNumber();
		if(!returnObj.status) return;

		let data = {
			cities: returnObj.cities,
			lkpFuelIndexId: this.metroObj.lkpFuelIndexId
		};

		if (this.isEdit) {
			this.spinner.show();
			this.$fuel.updateMetroMap(data).subscribe(response => {
				this.dialogRef.close({ status: true, data: response });
			})
		} else {
			this.spinner.show();
			this.$fuel.submitMetroMap(data).subscribe(response => {
				this.dialogRef.close({ status: true, data: data });
			})
		}
	}


}
