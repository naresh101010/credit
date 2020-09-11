import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { LookUpServices } from 'src/app/services/lookup.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import moment from 'moment';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';

@Component({
	selector: 'app-add-lookup-modal',
	templateUrl: './add-lookup-modal.component.html',
	styleUrls: ['./add-lookup-modal.component.css']
})
export class AddLookupModalComponent implements OnInit {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data,
		private http: HttpClient,
		private $lookup: LookUpServices,
		public dialogRef: MatDialogRef<AddLookupModalComponent>,
		public dialog: MatDialog,
		private datePipe: DatePipe,
        private $common: CommonService,
	) { }

	@ViewChild("f", null) lookupForm: any;

	ngOnInit() {

		var lookupTempObj = { ...this.data };
		if (lookupTempObj.permissionType == 1) {
			this.permissionType = lookupTempObj.permissionType;
		}
		if (this.permissionType == 1) {
			this.LookupName = "View";
		}
        // if(lookupTempObj.parentLookupTypeId.lookups.length){
        //     if (lookupTempObj.parentLookupTypeId.lookups.length[0].parentId) {
        //         this.isDisableParent=true;
        //     }
        // }
		else if (this.permissionType == 2 || this.data.permissionType === 2) {
			this.LookupName = "Edit";
		}
		else {
			this.LookupName = "Add";
		}

         if(lookupTempObj.status==0 && lookupTempObj.expDt<this.today){
           this.isInactive=true;
           this.isVar=false;
           this.expiryMinDate=this.today;
        }
        else{
       this.isInactive=false;
           }

		this.editStatus = this.data.status;
		this.inActiveStatus();
		this.lookupvalueTableList = lookupTempObj.lookupTypeList;
		if (lookupTempObj.parentLookupTypeId) {
			this.lookupValueList = [...lookupTempObj.parentLookupTypeId.lookups];
		}
		this.isVar = false;

		if (lookupTempObj.isEdit) {

			if (!isNaN(lookupTempObj.editIndex)) {
				this.editIndex = lookupTempObj.editIndex;
				this.lookupValObj = {...this.lookupvalueTableList[this.editIndex] };
				this.today = moment(this.lookupValObj.effectiveDt).format("YYYY-MM-DD");
			}
			return;
		}

		if (lookupTempObj.parentLookupTypeId && lookupTempObj.parentLookupTypeId.id) {
			this.lookupTempId = {
				"lookupTypeId": lookupTempObj.parentLookupTypeId.id
			}
		}



		if (lookupTempObj.id) {
			this.getLookupList();
		}
		if (this.lookupValObj.expDt < this.currentDate) {
            this.isVar = false;
        }
  }

  lookupNameSearchCtrl = <string>'';
	permissionType;
	editIndex;
	type;
	lookupIsIndex;
	LookupName: string;
	isPresent;
	lookupTempId = {} as any;
	lookup = {} as any;
	lookTypeName = {} as any;
	lookupValObj = {
		status: 1
	} as any;
    isDisableParent:boolean=true;
	lookupValueList: Array<any> = [];
	lookupTempObj = {} as any
	lookupList: Array<any> = [];
	lookupvalueTableList: Array<any> = [];
	lookupTypeValueList: Array<any> = [];
	today = new Date() as any;
	isDisableLookup = <boolean>false;
	isInactive = <boolean>false;
	// getLookupValueByType(lookupTypeName) {

	// 	this.$lookup.getLookupValueByType(lookupTypeName).subscribe(Response => {
	// 		this.lookupValueList = Response;

	// 	});
	// }

	selectParentCompare(o1: any, o2: any): boolean {
		if (o2 && o2) {
			return o1 === o2;
		}
	}

	getLookupList() {

		this.$lookup.getLookup().subscribe(response => {

			this.lookupList = response;
		})
		if (this.lookupValObj.status == 0 && this.lookupValObj.expDt < this.currentDate) {
            this.isInactive = true;
            this.expiryMinDate = this.currentDate;
        }else {
            this.isInactive = false;
        }
	}

	checkType(elem){
		return typeof(elem);
	}

	checkLookupValue() {
		this.isDisableLookup = false;
		// if (!this.lookupValObj.id) {
			this.isPresent = this.lookupvalueTableList.find(elem => elem.lookupVal.trim() == this.lookupValObj.lookupVal && elem.id !=this.lookupValObj.id);
			if (this.isPresent) {
				this.isDisableLookup = true;
				return true;
			}
			return false;
		// }

	}

	addLookup(index = null) {

		this.isVar = false;
		this.lookupValObj.lookupTypeId = this.lookupTempId.lookupTypeId;
		this.lookupValObj.id = this.lookupValObj.id ? this.lookupValObj.id : Math.random().toString(36).substring(7);
		this.lookupValObj.effectiveDt = moment(this.lookupValObj.effectiveDt).format("YYYY-MM-DD");
		if (this.isPresent && this.lookupIsIndex == undefined) {
			return;
		}
		if (this.lookupValObj.expDt) {
			if (this.lookupValObj.expDt < this.currentDate && this.lookupValObj.expDt < this.lookupValObj.effectiveDt) {
				this.isVar = true;
			}
			else {
				this.isVar = false;
				this.lookupValObj.expDt = moment(this.lookupValObj.expDt).format("YYYY-MM-DD");
			}
		}

		if (this.lookupValObj.expDt) {
			this.lookupValObj.expDt = moment(this.lookupValObj.expDt).format("YYYY-MM-DD");
		}


		if (this.lookupValObj.id) {
			let index = this.lookupvalueTableList.findIndex(elem => elem.id == this.lookupValObj.id);
			if(index==-1){
				if(!this.lookupvalueTableList || !this.lookupvalueTableList.length){
					this.lookupvalueTableList=[{ ...this.lookupValObj }];
				}else{
					this.lookupvalueTableList.splice(0, 0, { ...this.lookupValObj });
				}
			}else if (this.lookupValObj.isedit) {
				delete this.lookupValObj.isedit;
			}else {
				this.lookupvalueTableList[index] = { ...this.lookupValObj };
			}
		}
		else if (this.lookupIsIndex != undefined) {
			this.lookupvalueTableList[this.lookupIsIndex] = { ...this.lookupValObj };
		}
		else {
			this.lookupvalueTableList.splice(0, 0, { ...this.lookupValObj });
		}
		// if (this.editIndex!=null && this.editIndex!=undefined &&  !isNaN(this.editIndex)) {
		// 	this.lookupvalueTableList[this.editIndex] = this.lookupValObj;
		// 	this.editIndex = null;
		// } else {
		// 	this.lookupvalueTableList.push(this.lookupValObj);
		// }
		this.lookupIsIndex = null;
		this.lookupValObj = {
			status: 1
		};
		this.lookupForm.resetForm();
	}

	addLookUpVAlue(lookupval, index) {

		this.lookupIsIndex = index;
		this.lookupValObj = { ...lookupval };
	}

	deleteLookupValue(lookupval, index) {

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
					this.lookupvalueTableList.splice(index, 1);
				} else {
					lookupval.status = 0;
				}
			}
		})
	}

	saveLookup() {

		this.dialogRef.close({ lookupvalueTableList: this.lookupvalueTableList, lookupValueList: this.lookupValueList });
		// this.lookupForm.reset();
	}

	editStatus = {} as any;
	inActiveFlag = <boolean>false;
	inActiveStatus() {

		if (this.editStatus == 0) {
			this.inActiveFlag = true;
		}
	}

	expiryMinDate: any;
	isVar = <boolean>true;
	isChange = <boolean>true;
	currentDate = moment(new Date()).format("YYYY-MM-DD");

	checkForExpiryDate(effectiveDt) {

		let todayDate = moment(new Date()).format('YYYY-MM-DD');
		effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
		if (this.lookupValObj.expDt) {
			this.lookupValObj.expDt = moment(this.lookupValObj.expDt).format("YYYY-MM-DD");
		}
		if (this.lookupValObj.effectiveDt) {
			this.lookupValObj.effectiveDt = moment(this.lookupValObj.effectiveDt).format("YYYY-MM-DD");
		}
		if (this.lookupValObj.expDt <= effectiveDt && (!this.lookupValObj.id || this.lookupValObj.expDt <= effectiveDt)) {
			this.isVar = true;
		}
		else {
			this.isVar = false;
		}

		if (effectiveDt < todayDate) {
			return this.expiryMinDate = todayDate;
		}
		return this.expiryMinDate = moment(effectiveDt, 'YYYY-MM-DD').add(1, "d").format('YYYY-MM-DD');

	}

    removeMinDate(effectiveDate) {
        this.$common.setExpiryDate(effectiveDate, this.isInactive)
    }


	changeDateFormat(effectiveDt, expDt) {

		console.log(effectiveDt)
		this.isVar = true;

		if (effectiveDt) {
			this.lookupValObj.effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
		}
		if (expDt) {
			this.lookupValObj.expDt = moment(expDt).format('YYYY-MM-DD');
		}

		this.checkForExpiryDate(effectiveDt)
	}


}
