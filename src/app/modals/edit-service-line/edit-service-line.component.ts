import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ServiceLineService } from 'src/app/services/service-line.service';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-edit-service-line',
    templateUrl: './edit-service-line.component.html',
})
export class EditServiceLineComponent implements OnInit {
    @ViewChild("f", null) serviceForm: any;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private http: HttpClient,
        private $serviceLine: ServiceLineService,
        public dialog: MatDialog,
        private datePipe: DatePipe,
        private spinner: NgxSpinnerService,
        public dialogRef: MatDialogRef<EditServiceLineComponent>,
        private $common: CommonService,
    ) { }

    ngOnInit() {

        this.serviceLineObj = { ...this.data };
        this.editStatus = this.data.status;
        this.inActiveStatus();
        this.serviceLineObj.serviceOffering = this.serviceLineObj.serviceOffering;
        if (this.serviceLineObj.effectiveDt) {
            this.serviceLineObj.effectiveDt = moment(this.serviceLineObj.effectiveDt).format("YYYY-MM-DD");
            this.today = this.serviceLineObj.effectiveDt;
        }
        if (this.serviceLineObj.permissionType == 0) {
            this.submitPermission = false;
            this.ModalType = "Edit";
        }
        else {
            this.submitPermission = true;
            this.ModalType = "View";
        }
         if(this.serviceLineObj.status==0 && this.serviceLineObj.expDt<this.currentDate){
           this.isInactive=true;
           this.isVar=false;
           this.expiryMinDate=this.currentDate;
        }
        else{
       this.isInactive=false;
           }

        
        if (this.serviceLineObj.expDt < this.currentDate) {
            this.isVar = false;
        }
        // setTimeout(() => {
        //     document.getElementById("checkInput").blur();
        // }, 500);
    }

    ModalType: string;
    submitPermission: boolean = true;
    isInactive: boolean = false;
    serviceLineObj = {} as any;
    today = new Date(new Date().setDate(new Date().getDate()));
    currentDate = moment(new Date()).format("YYYY-MM-DD");
    UpdateService() {

        if (this.serviceLineObj.status == 0) {
            let dialog = this.dialog.open(DeleteModalComponent, {
                width: '35vw',
                panelClass: 'mdmDialog',
                data: { title: this.serviceLineObj.serviceOffering, heading: "Service Line" }
            });
            dialog.beforeClose().subscribe(response => {
                if (response === true) {
                    this.saveServiceOfferList();

                }
            })
        }

        else {
            this.saveServiceOfferList();
        }
    }

    saveServiceOfferList(type = null) {
        
        this.spinner.show();
        
        if (this.serviceLineObj.effectiveDt) {
            this.serviceLineObj.effectiveDt = moment(this.serviceLineObj.effectiveDt).format("YYYY-MM-DD");
        }
        if (this.serviceLineObj.expDt) {
            this.serviceLineObj.expDt = moment(this.serviceLineObj.expDt).format("YYYY-MM-DD");
        }
        else {
            this.serviceLineObj.expDt = '';
        }

        if (this.serviceLineObj.expDt) {
            if (this.serviceLineObj.expDt < this.currentDate && this.serviceLineObj.expDt < this.serviceLineObj.effectiveDt) {
                this.isVar = true;
            }
            else {
                this.isVar = false;
                this.serviceLineObj.expDt = moment(this.serviceLineObj.expDt).format("YYYY-MM-DD");
            }
        }
        else{
             this.isVar = false;
        }

        this.$serviceLine.saveServiceLine(this.serviceLineObj).subscribe(response => {
            this.serviceLineObj.id = response;
            let serviceLineObj = { ...this.serviceLineObj };
            this.dialogRef.close(serviceLineObj);
            if (this.serviceLineObj.status == 0 && this.serviceLineObj.expDt < this.currentDate) {
                    this.isInactive = true;
                    this.expiryMinDate = this.currentDate;
                }else {
                    this.isInactive = false;
                }
                // this.serviceForm.reset();
                this.spinner.hide();
        })
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

    checkForExpiryDate(effectiveDt) {

        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
        if (this.serviceLineObj.expDt) {
            this.serviceLineObj.expDt = moment(this.serviceLineObj.expDt).format("YYYY-MM-DD");
        }
        if (this.serviceLineObj.effectiveDt) {
            this.serviceLineObj.effectiveDt = moment(this.serviceLineObj.effectiveDt).format("YYYY-MM-DD");
        }
        if (this.serviceLineObj.expDt <= effectiveDt && (!this.serviceLineObj.id || this.serviceLineObj.expDt <= effectiveDt)) {
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
            this.serviceLineObj.effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
        }
        if (expDt) {
            this.serviceLineObj.expDt = moment(expDt).format('YYYY-MM-DD');
        }

        this.checkForExpiryDate(effectiveDt)
    }


}
