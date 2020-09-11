import { NgxSpinnerService } from 'ngx-spinner';
import { LoaderService } from './../../services/loader.service';
import { CountryService } from './../../services/country.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Country } from 'src/app/Models/country';
import * as moment from "moment";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from "@angular/material";
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { error } from 'protractor';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-add-country',
    templateUrl: './add-country.component.html',
})
export class AddCountryComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data, private datePipe: DatePipe, public dialog: MatDialog, private $country: CountryService, public dialogRef: MatDialogRef<AddCountryComponent>, private spinner: NgxSpinnerService) { }

    @ViewChild("f", null) countryForm: any;
    countryObj = {
        status: 1
    } as Country;
    hideBtn;
    isVar = <boolean>true;
    today = moment(new Date()).format("YYYY-MM-DD");
    disableEffectiveDate = false as any;
    ngOnInit() {
        
        let countryObj = this.data;
        if (this.data.type) {
            this.orgVar = this.data.type;
        }
        
        this.disableEffectiveDate = false;
        if (countryObj.id) {
            // this.today = undefined;
            this.getCountryDetails(countryObj.id);
        }
       
        if (countryObj.type != undefined) {
            if (countryObj.type == 1) {
                this.countryPrefix = "View";
                this.hideBtn = true;
            }
            else if (countryObj.type == 0 && countryObj.id) {
                this.countryPrefix = "Edit";
            }
        }
        else {
            this.countryPrefix = "Add";
        }
         if (countryObj.status==0) {
            this.isInactive=true;
            this.inactiveCheck=true;
        }
    }
    disabledBtn: any;
    countryPrefix: string;
    isValidText = <boolean>false;
    isInactive = <boolean>false;
    xyz = <boolean>false;
    inactiveCheck = <boolean>false;
    isChange = <boolean>true;
    orgVar: any;
    
    getCountryDetails(countryId) {
        this.spinner.show();
        this.isVar = false;
        this.$country.getDetailsById(countryId).subscribe((response: any) => {
            this.countryObj = response.responseData;
            this.spinner.hide();
        })
    }
    validDatePress(date) {
        
        this.isValidText = false;
        date = moment(date).format("YYYY-MM-DD");
        let today = moment(this.today).format("YYYY-MM-DD");
        if (date < today) {
            this.isValidText = true;
        }
    }
    getStatus() {

        if (this.countryObj.id  && this.countryObj.status == 0 && this.inactiveCheck==true) {
            this.isInactive=true;
        }
        else{
             this.isInactive=false;
        }
    }
    saveCountry() {

        if (this.countryObj.id) {
            this.countryObj.isUpdateOrRemove = "Update";
        }

        if (this.countryObj.expiryDate) {
            if (this.countryObj.expiryDate < this.currentDate && this.countryObj.expiryDate < this.countryObj.effectiveDate) {
                this.isVar = true;
            }
            else {
                this.isVar = false;
                this.countryObj.expiryDate = moment(this.countryObj.expiryDate).format("YYYY-MM-DD");
            }
        }
    if (this.countryObj.effectiveDate) {
                this.countryObj.effectiveDate = moment(this.countryObj.effectiveDate).format("YYYY-MM-DD");
            }
            if (this.countryObj.expiryDate) {
                this.countryObj.expiryDate = moment(this.countryObj.expiryDate).format("YYYY-MM-DD");
            }
        if (this.countryObj.status === 0) {
            let dialog = this.dialog.open(DeleteModalComponent, {
                width: '35vw',
                panelClass: 'mdmDialog',
                data: { title: this.countryObj.countryName, heading: "Country" }
            });

            dialog.beforeClose().subscribe(response => {
                if (response != 'cancel') {
                    this.submitData("delete");

                }
            })

        } else {
            this.submitData()
        }


    }

    submitData(type = null) {
        this.spinner.show();
        this.countryObj.effectiveDate = moment(this.countryObj.effectiveDate).format("YYYY-MM-DD");
        if (this.countryObj.expiryDate) {
            this.countryObj.expiryDate = moment(this.countryObj.expiryDate).format("YYYY-MM-DD");
        }
        else {
            this.countryObj.expiryDate = '';
        }
        this.disabledBtn = true;
        this.$country.saveDetails(this.countryObj).subscribe(response => {
            if (!response) return;
            this.countryForm.submitted = false;
            this.countryObj.id = response.responseData;
            let countryObj = { ...this.countryObj };
            if (type == "delete") {
                this.dialogRef.close({ type: "delete", status: true, countryName: countryObj.countryName });
            } else {
                this.dialogRef.close(countryObj);
            }
            this.disabledBtn = false;
            this.spinner.hide();
            this.countryForm.reset();

        })
    }

    expiryMinDate: any;

    currentDate = moment(new Date()).format("YYYY-MM-DD");

    checkForExpiryDate(effectiveDate) {
        
        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        if(this.countryObj.effectiveDate){
            this.countryObj.effectiveDate = moment(this.countryObj.effectiveDate).format('YYYY-MM-DD');
        }
        if(this.countryObj.expiryDate){
            this.countryObj.expiryDate = moment(this.countryObj.expiryDate).format('YYYY-MM-DD');
        }
        if (this.countryObj.expiryDate <= effectiveDate && (!this.countryObj.id || this.countryObj.expiryDate <= effectiveDate)) {
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
        this.expiryMinDate = moment(effectiveDate).format('YYYY-MM-DD');
    }

    changeDateFormat(effectiveDate, expiryDate) {
        
        this.isVar = true;
        console.log(effectiveDate)
        if (effectiveDate) {
            this.countryObj.effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        }
        if (expiryDate) {
            this.countryObj.expiryDate = moment(expiryDate).format('YYYY-MM-DD');
        }

        this.checkForExpiryDate(effectiveDate);
    }
}
