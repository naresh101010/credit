import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { BranchService } from 'src/app/services/branch.service';
@Component({
	selector: 'app-pincode-branch-search',
	templateUrl: './pincode-branch-search.component.html',
	styleUrls: ['./pincode-branch-search.component.css']
})
export class PincodeBranchSearchComponent implements OnInit {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data,
		private $branchPinMap: BranchService,
		private spinner: NgxSpinnerService,
		public dialogRef: MatDialogRef<PincodeBranchSearchComponent>
	) { }
	@ViewChild("F", null) addState: any;
	ngOnInit() {

		if (this.data) {
			this.selectedPincodeList = [...this.data];
			this.pincodeList = [...this.data];
			// this.tempPincodeList = [...this.data];
			
		}
		this.getAllStates();

	}

	strLengthValid: boolean = false;
	pincodeSearch:any;
	stateId: number;
	districtId: number;
	cityId: number;
	pincodeId: number;
	searchCtrl = '';
	pincode = {} as any;
	stateList: Array<any>;
	districtList: Array<any>;
	allStateList: Array<any>;
	allDistrictList: Array<any>;
	selectedPincodeList: Array<any> = [];
	cityList: Array<any>;
	pincodeList: Array<any>;
	allCityList: Array<any>;
	allPincodeList: Array<any>;
	stateSearchCtrl: string = '';
	selectedcityName: string = '';
	districtSearchCtrl: string = '';
	citySearchCtrl: string = '';
	pincodeSearchCtrl: string = '';

	getAllStates() {
		setTimeout(() => {
			this.spinner.show();
		}, 100);
        debugger
		this.districtList = [];
		this.cityList = [];
		this.pincodeList = [];
		this.districtSearchCtrl = '';
		this.citySearchCtrl = '';
		this.pincodeSearchCtrl = '';
		this.$branchPinMap.getState().subscribe(response => {
			setTimeout(() => {
				this.spinner.hide();
			}, 500);
			this.allStateList = response;
               this.stateList = this.allStateList.filter(elem => elem.status == 1);
            if (this.stateList.length == 1) {
                this.stateId = this.stateList[0].id;
                return this.getDistricts();
            }
		})
	}

	getDistricts() {
		this.spinner.show();
		this.cityList = [];
		this.pincodeList = [];
		this.citySearchCtrl = '';
		this.pincodeSearchCtrl = '';
		this.$branchPinMap.getDistrictByState(this.stateId).subscribe(response => {
			this.spinner.hide();
			this.allDistrictList = response;
             this.districtList = this.allDistrictList.filter(elem => elem.status == 1);
            if (this.districtList.length == 1) {
                this.districtId = this.districtList[0].id;
                return this.getCities();
            }
		})
	}

	getCities() {
		this.spinner.show();
		this.pincodeList = [];
		this.pincodeSearchCtrl = '';
		this.$branchPinMap.getCityByDistrict(this.districtId).subscribe(response => {
			this.spinner.hide();
			this.allCityList = response;
              this.cityList = this.allCityList.filter(elem => elem.status == 1);
            if (this.cityList.length == 1) {
                this.cityId = this.cityList[0].id;
                return this.getPincodes();
            }
		})
	}

	getPincodes() {
		this.spinner.show();
		this.$branchPinMap.getPincodeByCity(this.cityId).subscribe(response => {
			this.spinner.hide();
			this.allPincodeList = response;
			this.tempPincodeList = [...response];
		})
	}

	selectPincode() {

		if (this.selectedPincodeList.length) {
			this.dialogRef.close(this.selectedPincodeList);
		}
	}


	isChecked(pincodeId) {

		if (!this.selectedPincodeList || !this.selectedPincodeList) return;

		let index = this.selectedPincodeList.findIndex(elem => elem.id == pincodeId.id && elem.status == 1);

		if (index != -1) {
			return true;
		}
		return false;

	}


	pincodeChecked(type, event, index = null) {
		this.cityList.map(elem => {
			if (elem.id == this.cityId) {
				this.selectedcityName = elem.cityName
			}
		})

		if (!this.selectedPincodeList) {
			this.selectedPincodeList = [];
		}
		if (event.checked) {

			let index = this.selectedPincodeList.findIndex(elem => elem.id == type.id);
			if (index == -1) {
				// type.status = 1;
				var dsd = {
					"id": type.id,
					"status": 1,
					"pincode": type.pincode,
					"cityName": this.selectedcityName
				}

				this.selectedPincodeList.push(dsd);
			} else {
				this.selectedPincodeList[index].status = 1;
			}

		} else {
			let index = this.selectedPincodeList.findIndex(elem => elem.id == type.id);
			this.selectedPincodeList.splice(index, 1);

		}

	}

	tempPincodeList:Array<any> =[]
	filterPincodes(){
		this.strLengthValid = false;
		if(this.pincodeSearch.length < 3 ){
			return this.strLengthValid = true;
		}

		this.tempPincodeList = this.pincodeList.filter(item => Object.keys(item)
		.some(elem => this.pincodeSearch.split(',').some(arg => item['pincode'].toLowerCase().includes(arg.toLowerCase()))) );

		return this.tempPincodeList;
	}

	
    clearSearchInput() {

        if (!this.pincodeSearch || this.pincodeSearch == '') {
            this.tempPincodeList = [...this.pincodeList]
        }
    }


}
