import { CommonService } from './../../services/common.service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { Country } from 'src/app/Models/country';
import { State } from 'src/app/Models/state';
import { District } from 'src/app/Models/district';
import moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DistrictService } from 'src/app/services/district.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-add-district',
    templateUrl: './add-district.component.html',
})
export class AddDistrictComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialog: MatDialog,
        private $state: StateService,
        private $district: DistrictService,
        private datePipe: DatePipe,
        private spinner: NgxSpinnerService,
        private $common: CommonService,
        public dialogRef: MatDialogRef<AddDistrictComponent>,
    ) { }

    @ViewChild("f", null) distritctForm: any;
    today = moment(new Date()).format("YYYY-MM-DD");
    ngOnInit() {

        // this.getCountryList();
        let data = { ...this.data };
        this.editStatus = this.data.district.status;
        this.countryList = data.countryList;
        this.inActiveStatus();
        if (data.type != undefined) {
            if (data.type == 1) {
                this.districtPrifix = "View";
                this.hideBtn = true;
            }
            else if (data.type == 0 && data.district.id) {
                this.districtPrifix = "Edit";
            }
        }

        else {
            this.districtPrifix = "Add";
        }

        if (data.district && data.district.id) {
            // this.districtObj = data.district;
            this.getDistrictDetails(data.district.id)
        }

        if (data.district.expDt < this.currentDate) {
            this.isVar = false;
        }
        if (data.stateList) {
            this.stateList = data.stateList;
        }
        this.districtObj.state = data.state ? data.state : null
        this.countryId = data.country ? data.country : null

        if (data.state && data.country) {
            this.isDisabled = true;
        }
    }

    districtObj = {
        status: 1
    } as any;
    countryNameSearchCtrl = <string>'';
    stateNameSearchCtrl = <string>'';
    stateObj = {} as State;
    countryList: Array<Country>;
    stateList: Array<State>
    districtPrifix: string;
    hideBtn;
    districtList: Array<District>;
    disabledBtn: any;
    countryId;
    isDisabled = false;
    editStatus={}as any;
    inActiveFlag = false;
    isVar = <boolean>true;
    checkCountry(o1: any, o2: any): boolean {
        if (o2) {
            return o1.id === o2.id
        }

    }

    checkState(o1: any, o2: any): boolean {
        if (o2) {
            return o1.id === o2.id
        }

    }

    getStateByCountry() {

        this.$state.getByCountryId(this.countryId.id).subscribe(response => {
            this.stateList = response
        })
    }

    getDistrictDetails(districtId) {
        this.$district.getDetailsById(districtId).subscribe((response: any) => {
            this.districtObj = response.responseData

            if (this.districtObj.effectiveDt) {
                this.districtObj.effectiveDt = moment(this.districtObj.effectiveDt).format("YYYY-MM-DD");
                let today = moment(this.today).format("YYYY-MM-DD");
                if (today < this.districtObj.effectiveDt) {
                    this.today = this.districtObj.effectiveDt;
                }
            }
            if (this.districtObj.expDt) {
                this.districtObj.expDt = moment(this.districtObj.expDt).format("YYYY-MM-DD");
            }

            if (this.districtObj.status == 0 && this.districtObj.expDt < this.currentDate) {
                this.isInactive = true;
                this.expiryMinDate = this.currentDate;
            }
            else {
                this.isInactive = false;
            }

        })
    }

    addDistrict() {

        this.isVar = false;
        if (this.districtObj.id) {
            this.districtObj.isUpdateOrRemove = "Update";
        }

        if (this.districtObj.expDt) {
            if (this.districtObj.expDt < this.currentDate && this.districtObj.expDt < this.districtObj.effectiveDt) {
                this.isVar = true;
            }
            else {
                this.isVar = false;
                this.districtObj.expDt = moment(this.districtObj.expDt).format("YYYY-MM-DD");
            }
        }
this.countryList.forEach(elem=> elem.countryName=elem.nameWithStatus);
this.countryList.forEach(elm=>{
     if(elm.id==this.countryId.id){
        this.districtObj.state.country={...elm};
    }
})
        if (this.districtObj.status == 0) {
            let dialog = this.dialog.open(DeleteModalComponent, {
                width: '35vw',
                panelClass: 'mdmDialog',
                data: { title: this.districtObj.districtName, heading: "District" }
            })
            dialog.beforeClose().subscribe(response => {
                if (response === true) {
                    this.submitData("delete");

                }
            })

        }
        else {
            this.submitData();
        }

    }


    submitData(type = null) {

        this.isVar = false;
        this.spinner.show();
        if (this.districtObj.effectiveDt) {
            this.districtObj.effectiveDt = moment(this.districtObj.effectiveDt).format("YYYY-MM-DD");
            this.today = this.districtObj.effectiveDt;
        }
        if (this.districtObj.expDt) {
            this.districtObj.expDt = moment(this.districtObj.expDt).format("YYYY-MM-DD");
        }

        this.$district.saveDistrict(this.districtObj).subscribe(response => {
            this.distritctForm.submitted = false;
            this.districtObj.id = response;
            this.districtObj.stateList=this.stateList;
            let districtObj = { ...this.districtObj };
            if (type == "delete") {
                this.dialogRef.close({ type: "delete", status: true, districtName: districtObj.districtName });
            }
            else {
                this.dialogRef.close(districtObj);
            }
            this.spinner.hide();
            this.distritctForm.reset();
        });
    }


    inActiveStatus() {
        if (this.editStatus == 0) {
        this.inActiveFlag = true;
        }
    }

    expiryMinDate: any;
    isChange = <boolean>true;
    currentDate = moment(new Date()).format("YYYY-MM-DD");

    checkForExpiryDate(effectiveDt) {

        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
        if(this.districtObj.expDt){
            this.districtObj.expDt = moment(this.districtObj.expDt).format("YYYY-MM-DD");
        }
        if(this.districtObj.effectiveDt){
            this.districtObj.effectiveDt = moment( this.districtObj.effectiveDt).format("YYYY-MM-DD");
        }
        if (this.districtObj.expDt <= effectiveDt && (!this.districtObj.id || this.districtObj.expDt <= effectiveDt)) {
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

    isInactive = <boolean>false;
    removeMinDate(effectiveDate) {
        this.$common.setExpiryDate(effectiveDate, this.isInactive)
    }

    changeDateFormat(effectiveDt, expDt) {

        console.log(effectiveDt)
        this.isVar = true;

        if (effectiveDt) {
            this.districtObj.effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
        }
        if (expDt) {
            this.districtObj.expDt = moment(expDt).format('YYYY-MM-DD');
        }

        this.checkForExpiryDate(effectiveDt)
    }

}
