import { CommonService } from './../../services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { StateService } from './../../services/state.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Country } from 'src/app/Models/country';
import moment from 'moment';
import { GeographyService } from 'src/app/services/geography.service';
import { State } from 'src/app/Models/state';
import { MatDialogRef } from "@angular/material";
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-state',
    templateUrl: './state.component.html',
})
export class StateComponent implements OnInit {

    constructor(
        public dialog: MatDialog,
        private $state: StateService,
        private $geography: GeographyService,
        public dialogRef: MatDialogRef<StateComponent>,
        private spinner: NgxSpinnerService,
        private datePipe: DatePipe,
        private $common: CommonService,
        @Inject(MAT_DIALOG_DATA) public data,
    ) { }


    ngOnInit() {
        let stateObj = { ...this.data };
        this.editStatus = this.data.status;
        this.countryList = stateObj.countryList;
        this.inActiveStatus();
        if (stateObj.id) {
            this.isVar = false;
        }
        else {
            this.isVar = true;
        }

        if (stateObj.status == 0 && stateObj.expDt < this.currentDate) {
            this.isInactive = true;
            this.expiryMinDate = this.currentDate;
        }
        else {
            this.isInactive = false;
        }

        if (stateObj.type != undefined) {
            if (stateObj.type == 1) {
                this.statePrefix = "View";
                this.hideBtn = true;
            }
            else if (stateObj.type == 0 && stateObj.id) {
                this.statePrefix = "Edit";
            }
        }
        else {
            this.statePrefix = "Add";
        }
        this.getStateTypeList();
        if (stateObj.id) {
            return this.getStateDetails(stateObj.id);
        }

        // this.stateObj.status = 1;
        setTimeout(() => {
            this.countryId = stateObj.country.id;
        }, 400);


  }
  countryNameSearchCtrl = <string>'';
  featureNameSearchCtrl = <string>'';
	typeNameSearchCtrl = <string>'';
	@ViewChild("f", null) stateForm: any;
    today = moment(new Date()).format("YYYY-MM-DD");
	statePrefix: string;
    hideBtn;
    editStatus = {} as any;
    isVar = <boolean>true;
    inActiveFlag = <boolean>false;
    stateObj = {
        status: 1
    } as State;
    stateList: Array<any>;
    countryList: Array<Country>;
    stateTypes: Array<any>;
    disabledBtn: any;
    lkpStateTypeId: any;
    stateFeatures: Array<any> = [];
    stateFeatureList: Array<any> = [];
    selectedFeatureType: Array<any> = [];
    countryId: any;
    isInactive = <boolean>false;
    currentDate = moment(new Date()).format("YYYY-MM-DD");

    selectedFeature(o1: any, o2: any): boolean {
        if (o2) {
            return o1.id === o2.id;
        }
    }



    getStateDetails(stateId) {

        this.$state.getDetailsById(stateId).subscribe((response: any) => {
            let referenceData = response.referenceData
            if (referenceData.stateTypes) {
                this.stateTypes = referenceData.stateTypes
            }
            this.stateObj = response.responseData;

			this.selectedFeatureType= this.stateObj.features;

			if(this.stateFeatureList.length){
				this.stateObj.features = this.stateObj.features.filter(elem=>elem.status);
				this.stateObj.features = this.stateFeatureList.filter(elem=> this.stateObj.features.findIndex(elm=>elm.stateFeatureId==elem.id)!=-1 )
			}

            if (this.stateObj.effectiveDt) {
                this.stateObj.effectiveDt = moment(this.stateObj.effectiveDt).format("YYYY-MM-DD");
                let today = moment(this.today).format("YYYY-MM-DD");
                if (today < this.stateObj.effectiveDt) {
                    this.today = this.stateObj.effectiveDt;
                }
            }
            if (this.stateObj.expDt) {
                this.stateObj.expDt = moment(this.stateObj.expDt).format("YYYY-MM-DD");
            }


            setTimeout(() => {
                this.countryId = this.stateObj.country.id;
            }, 400);


        })
    }

    getStateTypeList() {
        this.$geography.getLoadData().subscribe(response => {
            this.stateTypes = response.referenceData.stateTypes;
			this.stateFeatureList = response.referenceData.stateFeatures;


			if(this.stateObj.features){
				this.stateObj.features = this.stateObj.features.filter(elem=>elem.status);
				this.stateObj.features = this.stateFeatureList.filter(elem=> this.stateObj.features.findIndex(elm=>elm.stateFeatureId==elem.id)!=-1 )
			}
        })
    }

    addStateCode() {

        this.isVar = false;
        if (this.stateObj.id) {
            this.stateObj.isUpdateOrRemove = "Update";
        }
        if (this.stateObj.status === 0) {
            let dialog = this.dialog.open(DeleteModalComponent, {
                width: '35vw',
                panelClass: 'mdmDialog',
                data: { stateName: this.stateObj.stateName, heading: "State" }
            });

            dialog.beforeClose().subscribe(response => {
                if (response === true) {
                    this.submitData("delete");

                }
            })

        } else {
            this.submitData()
        }

    }

    submitData(type = null) {

		let stateObj = {...this.stateObj};
		let stateFeature = [];
		if(stateObj.id){

			this.selectedFeatureType.forEach(elem => {
                let obj = stateObj.features.find(elm => elem.stateFeatureId == elm.id)
                if (!obj) {
				    elem.status = 0;
                    stateFeature.push(elem);
				}else{
				    elem.status = 1;
                    stateFeature.push(elem);
				}

            })

			stateObj.features.forEach(elem=>{
				let obj =this.selectedFeatureType.find(elm=>elm.stateFeatureId == elem.id)
				if(!obj){
					elem.stateFeatureId = elem.id ? elem.id : elem.stateFeatureId;
					delete elem.id;
					stateFeature.push(elem);
				}
			})


            stateObj.features = [...stateFeature];
		}else{
			if(!stateObj.features){
				stateObj.features=[]
			}else{
				stateObj.features.map(elem=>{
					elem.stateFeatureId = elem.id ? elem.id : elem.stateFeatureId;
					delete elem.id;
				})
			}
		}


        stateObj.ewayblInterTh = +stateObj.ewayblInterTh;
        stateObj.ewayblIntraTh = +stateObj.ewayblIntraTh;

        stateObj.country = this.countryList.find(elem => elem.id == this.countryId);


        if (stateObj.effectiveDt) {
            stateObj.effectiveDt = moment(stateObj.effectiveDt).format("YYYY-MM-DD");
        }
        if (stateObj.expDt) {
            if (stateObj.expDt < this.today && stateObj.expDt < stateObj.effectiveDt) {
                this.isVar = true;
            }
            else {
                this.isVar = false;
                stateObj.expDt = moment(stateObj.expDt).format("YYYY-MM-DD");
            }
        }
		this.spinner.show();
        this.$state.saveState(stateObj).subscribe(response => {
            this.stateForm.submitted = false;
            this.stateObj.id = response;
            let stateObj = { ...this.stateObj };
            if (type == "delete") {
                this.dialogRef.close({ type: "delete", status: true, stateName: stateObj.stateName });
            } else {
                this.dialogRef.close(stateObj);
            }

            this.stateForm.reset();
            setTimeout(() => {
                this.spinner.hide();
            }, 1000);

        })
    }

    inActiveStatus() {

        if (this.editStatus == 0) {
            this.inActiveFlag = true;
        }
    }

    expiryMinDate: any;
    isChange = <boolean>true;
    checkForExpiryDate(effectiveDate) {

        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        if (this.stateObj.expDt) {
            this.stateObj.expDt = moment(this.stateObj.expDt).format("YYYY-MM-DD");
        }
        if (this.stateObj.effectiveDt) {
            this.stateObj.effectiveDt = moment(this.stateObj.effectiveDt).format("YYYY-MM-DD");
        }
        if (this.stateObj.expDt <= effectiveDate && (!this.stateObj.id || this.stateObj.expDt <= effectiveDate)) {
            this.isVar = true;
        }
        else {
            this.isVar = false;
        }
        if (effectiveDate < todayDate) {
            return this.expiryMinDate = todayDate;
        }
        return this.expiryMinDate = moment(effectiveDate, 'YYYY-MM-DD').add(1, "d").format('YYYY-MM-DD');

    }

    removeMinDate(effectiveDate) {
        this.$common.setExpiryDate(effectiveDate, this.isInactive)
    }

    changeDateFormat(effectiveDate, expiryDate) {
        console.log(effectiveDate)
        if (effectiveDate) {
            this.stateObj.effectiveDt = moment(effectiveDate).format('YYYY-MM-DD');
        }
        if (expiryDate) {
            this.stateObj.expDt = moment(expiryDate).format('YYYY-MM-DD');
        }

        this.checkForExpiryDate(effectiveDate)
    }

}
