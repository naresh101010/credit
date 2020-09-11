import { AppComponent } from 'src/app/app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BranchService } from './../../services/branch.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
	selector: 'my-app-branch-advance-search',
	templateUrl: './branch-advance-search.component.html',
	styleUrls: ['./branch-advance-search.component.css'],
	providers: [AppComponent]
})
export class BranchAdvanceSearchComponent implements OnInit {

	constructor(@Inject(MAT_DIALOG_DATA) public data, private spinner: NgxSpinnerService, private $branch: BranchService, private appComp: AppComponent, public dialogRef: MatDialogRef<BranchAdvanceSearchComponent>) { }

	searchObj: any = {
		criteria: 'branchName'
  };
  branchNameSearchCtrl = <string>'';
  typetNameSearchCtrl = <string>'';
	checked = <boolean>false;
	localSearch: string;
	tableBranchList: Array<any> = [];
	branchDropdown: Array<any> = [];
	branchTypes: Array<any> = [];
	changeType = 'branchName';
	pincodeSearch = "";
	showTable = false;
	isAllignCenter = true;
	pincodeList: Array<any> = [];
	onload = true;
	pincode: string;
	strPincodeLengthValid = false

	ngOnInit() {
		// we need type list from load data; or we will get it from branch load
		this.branchTypes = this.data.branchTypes;
		// this.pincodeList = this.data.pincodeList;
		this.searchObj.criteria = this.data.searchCriteria;
		this.branchAdvanceSearch();
	}

	searchPincode() {
		this.strPincodeLengthValid = false;
		if (this.pincode.length < 3) {
			this.strPincodeLengthValid = true;
			return
		}

		this.spinner.show();
		this.$branch.searchPincode(this.pincode).subscribe((response: any) => {

			this.spinner.hide();

			this.pincodeList = response;
			if (this.pincodeList.length == 0) {
				this.appComp.showMessage(`Matching pincodes with : ${this.pincode} does not exists in propel-i`, 'danger');
			}
            else if(this.pincodeList.length==1){
              this.pincode=this.pincodeList[0].pincode;
            }
		})
	}

	strLengthValid: boolean = false;
	getPincodeNameArr: any[] = [];

	branchAdvanceSearch(isChange = null) {

		this.changeType = this.searchObj.criteria;

		let searchObject = { ...this.searchObj };
		if (isChange == "clearPrev") {
			this.branchDropdown = [];
			this.tableBranchList = [];
			this.getPincodeNameArr = [];
			// use it later to clear the previous search value
			this.searchObj.value = '';
		}

		if (this.searchObj.criteria == "REGION" || this.searchObj.criteria == "AREA") {
			return this.searchByRegionArea("branchtype", this.searchObj.criteria, isChange);
		} else if (this.searchObj.criteria == "type") {
			return this.searchByType();
		}

		if (!searchObject.value) {
			this.onload = false;
			return
		}

		let strlength = searchObject.value.length;

		if (strlength > 2 && searchObject.value) {
			this.strLengthValid = false;
			if (!searchObject.value || searchObject.value.trim() == "") {
				return;
			}

			this.spinner.show();
			this.$branch.branchAdvanceSearch(searchObject.criteria, searchObject.value).subscribe((response: any) => {
				this.spinner.hide();

				if (!this.onload) {
					this.showTable = true;
				}
				this.onload = false;

				this.tableBranchList = response.responseData;
				if(this.tableBranchList.length){
					this.isAllignCenter = false;
                    this.dialogRef.updateSize('40vw');
				}
				this.tableBranchList.forEach((elem) => {
					this.getPincodeNameArr.push(elem.pincodeId)
				})
				this.tableBranchList.forEach(elem => elem.checked = false);
				this.getPincodes();

			})

		} else {
			this.strLengthValid = true;
		}


	}

	clearSearch() {
		if (!this.searchObj.value || this.searchObj.value == "") {
			this.strLengthValid = false;
			return;
		}
	}

	selectedName() {

		this.tableBranchList.forEach(elem => {
			if (elem.checked == true) {
				this.dialogRef.close(elem);
			}
		})
	}


	searchByRegionArea(criteria, value, isChange = null) {

		if (criteria == 'pincode') {
			this.pincodeList = [];
			this.pincode = '';
		}

		this.tableBranchList = [];
		this.getPincodeNameArr = [];
		this.spinner.show();
		this.$branch.branchAdvanceSearch(criteria, value).subscribe((response: any) => {
			this.spinner.hide();



			if (isChange == "getbranchType") {
                if (!this.onload) {
                    this.showTable = true;
                }

                this.isAllignCenter = false;
                this.dialogRef.updateSize('40vw');
				this.tableBranchList = response.responseData;
				this.tableBranchList.forEach((elem) => {
					this.getPincodeNameArr.push(elem.pincodeId)
				})
				this.tableBranchList.forEach(elem => elem.checked = false);
				this.getPincodes();
			} else {
				this.branchDropdown = response.responseData;
			}

            this.onload = false;
		})
	}
branchDropdown2=[]
	searchByType() {
        
		this.onload = false;
		this.spinner.show();
		this.$branch.getSearchBranchTypes().subscribe((response) => {
			 this.branchDropdown = response.responseData;
             this.branchDropdown.sort();
           		this.spinner.hide();
		})

	}

	getPincodes(){

		this.$branch.getPincodesByIds(this.getPincodeNameArr).subscribe((response)=>{
			response.forEach(element => {
                this.dialogRef.updateSize('40vw');
				this.tableBranchList.forEach((elem,index)=>{
					if(element.pincode && element.id==elem.pincodeId){
						let fullAddress = this.tableBranchList[index].address;

						if(element.city){
							fullAddress = `${fullAddress} , ${element.city.cityName}`;
						}
						if(element.city.district){
							fullAddress = `${fullAddress} , ${element.city.district.districtName}`;
						}
						if(element.city.district.state){
							fullAddress = `${fullAddress} , ${element.city.district.state.stateName}`;
						}
						// this.branchList[index].fullAddress = fullAddress;
						this.tableBranchList[index].addressWithPincodeName = fullAddress + " , " + element.pincode;
					}
				})
			});
		})
	}

}
