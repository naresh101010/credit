import { DeleteModalComponent } from './../delete-modal/delete-modal.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { AddressFeatureMasterService } from 'src/app/services/address-feature-master.service';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-edit-address-feature',
    templateUrl: './edit-address-feature.component.html',
})
export class EditAddressFeatureComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialog: MatDialog,
        private $Address: AddressFeatureMasterService,
        public dialogRef: MatDialogRef<EditAddressFeatureComponent>,
        private $addressType: AddressFeatureMasterService,
        private spinner: NgxSpinnerService,
        private datePipe: DatePipe,
        private $common: CommonService,
    ) { }

    ngOnInit() {

        let addressFeatureObj = { ... this.data }

        this.editStatus = this.data.status;
        if (this.data.permissionType == 0) {
          this.submitPermission = false;
          this.isType="Edit";
        }
        else {
            this.submitPermission = true;
               this.isType="View";
        }

        if (this.addressFeatureObj.expDt < this.currentDate) {
            this.isVar = false;
        }

        this.featureType = addressFeatureObj.addressFeatureName;
        this.addressFeatureObj = addressFeatureObj;
        if (this.addressFeatureObj.effectiveDate) {
            this.addressFeatureObj.effectiveDate = moment(this.addressFeatureObj.effectiveDate).format("YYYY-MM-DD");
            this.today = this.addressFeatureObj.effectiveDate;
        }
        this.getAllAddressFeature();
        this.inActiveStatus();
    }

    @ViewChild("f", null) addressForm: any;
    addressFeatureObj = {} as any;
    today = new Date();
    currentDate = moment(new Date()).format("YYYY-MM-DD");
    LoadList: Array<any> = [];
    featureType;
    editStatus={}as any;
    inActiveFlag = <boolean>false;
    isInactive = <boolean>false;
    submitPermission = <boolean>true;
    isType:string;
    featureTypeNameSearchCtrl = <string>'';

    getAllAddressFeature() {

        this.$addressType.getAddressFeature().subscribe(response => {

            this.LoadList = response.referenceData.featureTypeList;
        });
           if (this.addressFeatureObj.status == 0 && this.addressFeatureObj.expiryDate < this.currentDate) {
            this.isInactive = true;
            this.expiryMinDate = this.currentDate;
        } else {
            this.isInactive = false;
        }
    }

    updataAddressFeature() {

        this.isVar = false;
             if (this.addressFeatureObj.expiryDate) {
            if (this.addressFeatureObj.expiryDate < this.currentDate && this.addressFeatureObj.expiryDate < this.addressFeatureObj.effectiveDate) {
                this.isVar = true;
            }
            else {
                this.isVar = false;
                this.addressFeatureObj.expiryDate = moment(this.addressFeatureObj.expiryDate).format("YYYY-MM-DD");
            }
        }
        this.addressFeatureObj.effectiveDate = moment(this.addressFeatureObj.effectiveDate).format("YYYY-MM-DD");
        if (this.addressFeatureObj.effectiveDate) {
            this.addressFeatureObj.effectiveDate = moment(this.addressFeatureObj.effectiveDate).format("YYYY-MM-DD");
            this.today = new Date(this.addressFeatureObj.effectiveDate);
        }
        if (this.addressFeatureObj.expiryDate) {
            this.addressFeatureObj.expiryDate = moment(this.addressFeatureObj.expiryDate).format("YYYY-MM-DD");
        }
else{
    this.addressFeatureObj.expiryDate='';
}
        if (this.addressFeatureObj.expiryDate) {
          if (this.addressFeatureObj.expiryDate < this.currentDate && this.addressFeatureObj.expiryDate < this.addressFeatureObj.effectiveDate) {
              this.isVar = true;
          }
          else {
              this.isVar = false;
              this.addressFeatureObj.expiryDate = moment(this.addressFeatureObj.expiryDate).format("YYYY-MM-DD");
          }
        }

        if (this.addressFeatureObj.status === 0) {

            let dialog = this.dialog.open(DeleteModalComponent, {
                width: '35vw',
                panelClass: 'mdmDialog',
                data: { title: this.addressFeatureObj.featureName, heading: "Feature" }
            });
            dialog.beforeClose().subscribe(response => {
                if (response === true) {
                    this.submitData();
                }
            })
        }
        else {
            this.submitData();
        }

    }
    submitData() {
        this.spinner.show();
        this.isVar = false;
        this.$Address.saveAddressFeature(this.addressFeatureObj).subscribe(response => {

            this.addressForm.submitted = false;
            this.addressFeatureObj.id = response;
            let addressFeatureObj = { ...this.addressFeatureObj };
            this.dialogRef.close(addressFeatureObj);
            this.spinner.hide();
            this.addressForm.reset();

        })
        if (this.addressFeatureObj.status == 0 && this.addressFeatureObj.expDt < this.currentDate) {
            this.isInactive = true;
            this.expiryMinDate = this.currentDate;
        }else {
            this.isInactive = false;
        }
    }

    inActiveStatus() {

        if (this.editStatus == 0) {
        this.inActiveFlag = true;
        }
    }

    expiryMinDate: any;
    isVar = <boolean>false;
    isChange = <boolean>true;

    checkForExpiryDate(effectiveDate) {

        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        if(this.addressFeatureObj.expiryDate){
            this.addressFeatureObj.expiryDate = moment(this.addressFeatureObj.expiryDate).format("YYYY-MM-DD");
        }
        if(this.addressFeatureObj.effectiveDate){
            this.addressFeatureObj.effectiveDate = moment( this.addressFeatureObj.effectiveDate).format("YYYY-MM-DD");
        }
        if (this.addressFeatureObj.expiryDate <= effectiveDate && (!this.addressFeatureObj.id || this.addressFeatureObj.expiryDate <= effectiveDate)) {
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
        this.isVar = true;

        if (effectiveDate) {
            this.addressFeatureObj.effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        }
        if (expiryDate) {
            this.addressFeatureObj.expiryDate = moment(expiryDate).format('YYYY-MM-DD');
        }

        this.checkForExpiryDate(effectiveDate)
    }

    }
