import { DeleteModalComponent } from './../../modals/delete-modal/delete-modal.component';
import { AddLookupModalComponent } from './../../modals/add-lookup-modal/add-lookup-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LookUpServices } from 'src/app/services/lookup.service';
import moment from 'moment';
import { AppComponent } from 'src/app/app.component';
import { EditLookupValueModalComponent } from 'src/app/modals/edit-lookup-value-modal/edit-lookup-value-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthorizationService } from 'src/app/services/authorisation.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
	selector: 'app-look-up',
	templateUrl: './look-up.component.html',
})
export class LookUpComponent implements OnInit {
	@ViewChild("f", null) lookupForm: any;
	constructor(
		public dialog: MatDialog,
		private $lookup: LookUpServices,
		private appComp: AppComponent,
		private spinner: NgxSpinnerService, private AuthorizationService: AuthorizationService,
		private permissionsService: NgxPermissionsService
	) { }

	ngOnInit() {

		this.getLookupList()
		this.getLoadData();
		this.permissionsService.loadPermissions(this.AuthorizationService.getPermissions('LOOKUP', 'LOOKUP'));
	}
  lookupNameSearchCtrl = <string>'';
	addLookUp;
	searchLookupName;
	parentDropdown = <boolean>false;
	parentDisable = <boolean>false;
    	parentlookupType: boolean = false;
	submitPermission: boolean = true;
	lookupList: Array<any> = [];
	lookupParentList: Array<any> = [];
	lookups: Array<any> = [];
	lookupValueList: Array<any> = []
	abc: Array<any> = [];
	lookupObj = <any>{};
	lookupValObj = {} as any;
	typeObj = {} as any;
	lookupTypeValueList: Array<any> = [];
	p: number = 1;
	today = new Date();
	loadList: any = {};

	selectParentCompare(o1: any, o2: any): boolean {
		if (o2) {
			return o1.id === o2.id;
		}
	}
	clearObj() {
		this.lookupObj = {};
		this.strLengthValid = false;
		this.lookupValueList = [];
        	this.parentDisable =false;
    	this.parentlookupType = false;
	}

	checkType(elem){
		return typeof(elem);
	}

	listBusiness(event) {

		if (!this.lookupObj.lookups) {
			this.lookupObj.lookups = [];
		}

		if (event.checked) {
			let data = {
				"isChildFlag": 1
			}
			this.lookupObj.isChildFlag = data.isChildFlag;
		}
		else {
          this.lookupObj.parentLookupTypeId='';
			this.lookupObj.isChildFlag = 0;
		}
	}
	// lookupTypeList: Array<any>;
	lookupValueArray: Array<any>;
	addLookUpValue(lookupTypeId = null) {

		var dataObj: any = lookupTypeId;
		dataObj.lookupTypeList = [...this.lookupValueList];
		dataObj.lookupValueList = [...this.lookupValueArray];

		let dialog = this.dialog.open(AddLookupModalComponent, {
			width: '70vw',
            height:'60vh',
			panelClass: 'mdmDialog',
			data: dataObj
		})
		dialog.afterClosed().subscribe(response => {

			if (response === true) {
				return;
			}
			if (response) {

				let lkData = { ...response };
				this.lookupValueList = [...lkData.lookupvalueTableList];
				this.lookupValueArray = lkData.lookupValueList;
				this.lookupObj.lookups = lkData.lookupvalueTableList;

			}
		})
	}

	editLookUpValue(lookupval, index, permissionType = null) {

		var dataObj: any = { ...lookupval };
		dataObj.lookupTypeList = [...this.lookupValueList];
		dataObj.parentLookupTypeId = this.lookupObj.parentLookupTypeId;
		dataObj.isEdit = true;
		dataObj.editIndex = index;
		dataObj.permissionType = permissionType;
		let dialog = this.dialog.open(AddLookupModalComponent, {
			width: '70vw',
             height:'60vh',
			panelClass: 'mdmDialog',
			data: dataObj
		})
		dialog.afterClosed().subscribe(response => {

			if (response === true) {
				return;
			}
			if (response) {

				let lkData = { ...response };
				this.lookupValueList = [...lkData.lookupvalueTableList];
				this.lookupValueArray = lkData.lookupValueList;
				this.lookupObj.lookups = lkData.lookupvalueTableList;

			}
		})
	}

	deleteLookUpValue(lookupval, index) {

		let dialog = this.dialog.open(DeleteModalComponent, {
			width: '35vw',
			panelClass: 'mdmDialog',
			data: { title: this.lookupValObj.lookupVal, heading: "LookUp" }
		});
		dialog.beforeClose().subscribe(response => {
			if (response === "cancel") {
				return;
			}
			else if (response) {
				if (!lookupval.id || this.checkType(lookupval.id)=="string") {
					this.lookupValueList.splice(index, 1);
				} else {
					lookupval.status = 0;
				}
			}
		})
	}

	editModalOpen(obj = null) {

		let data = {
			status: 1
		}
		if (obj.id) {
			data = { ...this.lookupValueList.find(elem => elem.id == obj.id) }
		}

		let dialog = this.dialog.open(EditLookupValueModalComponent, {
			width: '73vw',
			panelClass: 'mdmDialog',
			data: data
		})
		dialog.afterClosed().subscribe(response => {

			if (response) {

				if (response === true) {
					return;
				}
				let index = this.lookupValueList.findIndex(elem => elem.id == obj.id);
				this.lookupValueList[index] = response;
				// this.gstObj.id = response.id;
				if (response.staus == 0) {
					this.appComp.showMessage(`${response.lookupVal} IS DELETED`);
				}
				else {
					this.appComp.showMessage(`${response.lookupVal} IS UPDATED`);
				}
			}
		})
	}

	getLookupList() {
        
		this.spinner.show();
		this.$lookup.getLookup().subscribe(response => {
			this.lookupList = response;
			this.lookupParentList = [...response];

			this.spinner.hide();
		})
	}


	getLoadData() {
		this.$lookup.getLoadList().subscribe((response: any) => {
			this.loadList = response.referenceData
			this.lookupValueArray = this.loadList.attributeType
		})
	}

	addAllLookup() {

		if (this.lookupObj.effectiveDt) {
			this.lookupObj.effectiveDt = moment(this.lookupObj.effectiveDt).format("YYYY-MM-DD");
		}
		if (this.lookupObj.expDt) {
			this.lookupObj.expDt = moment(this.lookupObj.expDt).format("YYYY-MM-DD");
		}

		let data = { ...this.lookupObj }
		if (data.parentLookupTypeId) {
			if (data.parentLookupTypeId.id) {
				data.parentLookupTypeId = data.parentLookupTypeId.id
			}
		}

		this.lookupValueList.forEach(elem=>{
			if(typeof (elem.id)=="string"){
				elem.id =0
			}
		})
		data.lookups = [...this.lookupValueList]

		delete data.lookupValueList;
		delete data.lookupTypeList;
		if (!data.id) {
			data.status = 1
		}
		this.spinner.show();

		this.$lookup.saveLookupType(data).subscribe(response => {

			if (!this.lookupObj.id) {
				this.lookupObj.id = response;
				this.lookupList.splice(0, 0, this.lookupObj);
				this.appComp.showMessage(`${this.lookupObj.lookupType} IS CREATED`);
			}

			else {
				this.lookupList = this.lookupList.map(elem => {
					if (elem.id == this.lookupObj.id) {
						elem = this.lookupObj;
					}
					return elem;

				})
				this.appComp.showMessage(`${this.lookupObj.lookupType} IS UPDATED`);
			}
			setTimeout(() => {
				this.p = 1;
				this.addLookUp = false;
				this.lookupObj = <any>{};
				this.searchLookupName = '';
				this.getLookupList();
				this.spinner.hide();
			}, 1000);
		});
	}

	strLengthValid: boolean = false;
	searchLookup(str) {

		let strlength = str.target.value.length;
		if (strlength > 2 && str.target.value) {
			this.strLengthValid = false;
			this.spinner.show();
			this.p = 1;
			if (!this.searchLookupName || this.searchLookupName.trim() == "") {
				return this.getLookupList();
			}
			this.$lookup.searchByName(this.searchLookupName).subscribe(response => {
				this.lookupList = response;
				if (!this.lookupList.length) {
					this.appComp.showMessage(`Record doesn't exist in Propel-I`, "danger");
				}
				this.spinner.hide();
			});
		} else {
			this.strLengthValid = true;
		}
	}
	clearSearch() {
		if (!this.searchLookupName || this.searchLookupName == "") {
			this.strLengthValid = false;
			return this.getLookupList();
		}
	}

	showSelectDropdown() {
		this.parentDropdown = !this.parentDropdown;
	}

	getLookupValueByType(lookupType) {

		this.$lookup.getLookupValueByType(lookupType).subscribe(response => {
			this.lookupValueList = response;
		});
	}

	editLookupType(lookupTypeObj, type) {

		if (type == 0) {
			this.submitPermission = false;
		}
		else {
			this.submitPermission = true;
		}
        	this.parentDisable =false;
    	this.parentlookupType = false;
		this.strLengthValid = false;
		this.searchLookupName = '';
		this.addLookUp = true;
		this.spinner.show();
		this.$lookup.searchByName(lookupTypeObj.lookupType).subscribe(response => {
			this.spinner.hide();
			this.lookupObj = response.find(elem => elem.id == lookupTypeObj.id);
			this.lookupObj.parentLookupTypeId = this.lookupParentList.find(elem => elem.id == this.lookupObj.parentLookupTypeId);
			this.lookupValueList = response;
            if (this.lookupObj.isChildFlag) {
                this.parentDisable=true;
            }
            if (this.lookupObj.parentLookupTypeId) {
                this.parentlookupType=true;
            }
			this.getLookupValueByType(this.lookupObj.lookupType);
		});
	}
}
