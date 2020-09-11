import { CommonService } from './../../services/common.service';
import { MatDialog } from '@angular/material';
import { DeleteModalComponent } from 'src/app/modals/delete-modal/delete-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from "./../../app.component";
import { LogisticZoneService } from "./../../services/logistic-zone.service";
import { LogisticZone } from "./../../Models/logistic-zone";
import { Component, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from 'src/app/services/authorisation.service';

@Component({
    selector: "app-view-logistic",
    templateUrl: "./view-logistic.component.html",
})
export class ViewLogisticComponent implements OnInit {
    constructor(
        private $logisticMatrix: LogisticZoneService,
        private appComp: AppComponent,
        private spinner: NgxSpinnerService,
        private datePipe: DatePipe,
        private AuthorizationService: AuthorizationService,
        private permissionsService: NgxPermissionsService,
        public dialog: MatDialog,
        private $common:CommonService
    ) { }

    ngOnInit() {
        
        this.getAllLogisticMatrixs();
        this.permissionsService.loadPermissions(this.AuthorizationService.getPermissions('ZONE MATRIX', 'LOGISTIC ZONE'));
        this.type="Create";
    }
type:string="Create"
    logisticMatrixList: Array<LogisticZone> = [];
    logisticObj = <LogisticZone>{
        status: 1
    };
    addLogistic = <boolean>false;
    logicticName: string;
    isVar = <boolean>true;
    isInactive = <boolean>false;
    isPresent = false;
    // today = moment(new Date()).format("YYYY-MM-DD");
    currentDate = moment(new Date()).format("YYYY-MM-DD");
    isDisabled = false;
    p: number = 1;
    inActiveFlag = false;
    submitPermission: boolean = true;
    @ViewChild("f", null) logisticForm: NgForm
    checkMinDate: any;

    addLogisticOpen() {
         this.type="Create";
        this.addLogistic = true;
        this.submitPermission = false;
        this.logisticObj = <LogisticZone>{
            status: 1,
        };
    }

    getAllLogisticMatrixs() {
        this.spinner.show();
        this.$logisticMatrix.getLastUpdated().subscribe(response => {
            this.logisticMatrixList = response;
            this.spinner.hide();
        });
    }

    strLengthValid:boolean = false;
    searchLogistic(str) {
        let strlength = str.target.value.length;
        if (strlength > 2 && str.target.value) {
          this.strLengthValid = false;
        this.p = 1;
        if (!this.logicticName || this.logicticName.trim() == "") {
            return this.getAllLogisticMatrixs();
        }
        this.$logisticMatrix.searchByName(this.logicticName).subscribe(response => {
            this.logisticMatrixList = response;
            if (!this.logisticMatrixList.length) {
                this.appComp.showMessage(`Record Doesn't Exist In Propel-I`, "danger");
            }
        });
       } else {
        this.strLengthValid = true;
    }
    }

    clearSearchInput() {

        if (!this.logicticName || this.logicticName == '') {
            return this.getAllLogisticMatrixs();
        }
    }


    checkNameIsExists() {

        this.isPresent = false;
        let isPresent = this.logisticMatrixList.filter(elem => elem.zoneName == this.logisticObj.zoneName)
        if (isPresent.length != 0) {
            this.isPresent = true;
            return this.appComp.showMessage(`${this.logisticObj.zoneName} Is Already Present`, "danger");
        }
    }

    editLogisticMatrix(logistic = null, type = null) {
        
        this.isVar = false;
         this.isDisabled = false;
          let todayDate = moment(new Date()).format('YYYY-MM-DD');
         this.inActiveFlag = false;
        if (type == 0) {
            this.submitPermission = false;
                this.type="Edit";
        }
        else {
            this.submitPermission = true;
        
              this.type="View";
        }
        if(logistic.status==0 && logistic.expDt<this.currentDate){
           this.isInactive=true;
           this.isVar=false;
           this.expiryMinDate=todayDate;
        }
        else{
       this.isInactive=false;
    //    this.expiryMinDate=moment(this.logisticObj.expDt).format("YYYY-MM-DD");
        }
        this.logisticObj = { ...logistic };
        if (this.logisticObj.effectiveDt) {
            this.logisticObj.effectiveDate = moment(this.logisticObj.effectiveDt).format("YYYY-MM-DD");
        }

        if (this.logisticObj.expDt) {
            this.logisticObj.expDt = moment(this.logisticObj.expDt).format("YYYY-MM-DD");
        }
        this.logisticObj.description = this.logisticObj.descr;
        this.addLogistic = true;
        this.inActiveStatus();
        // if (moment(logistic.effectiveDt).isBefore(this.currentDate)) {
        //     this.today = logistic.effectiveDt;
        // }
    }

    saveLogisticZone() {
        
        
        this.isVar = false;
        this.isInactive = false;
        if (this.isPresent) {
            this.isDisabled = false;
            return this.appComp.showMessage(`${this.logisticObj.zoneName} Is Already Present`, "danger");
        }
        // if(this.isInactive==true && this.logisticObj.expDt<this.currentDate){
        // }
        this.logisticObj.effectiveDate = moment(this.logisticObj.effectiveDate).format("YYYY-MM-DD");

        if (this.logisticObj.expDt) {
            if (this.logisticObj.expDt < this.currentDate && this.logisticObj.expDt < this.logisticObj.effectiveDate) {
                this.isVar = true;
            }
            else {
                this.isVar = false;
                this.logisticObj.expiryDate = moment(this.logisticObj.expDt).format("YYYY-MM-DD");
            }
        }
        else {
            this.logisticObj.expiryDate = '';
            this.logisticObj.expDt = '';

        }
        if (this.logisticObj.status == undefined) {
            this.logisticObj.status = 1;
        }

        this.logisticObj.descr = this.logisticObj.description;
        
        
        if(this.logisticObj.status==0){
            let dialog = this.dialog.open(DeleteModalComponent, {
                width: '35vw',
                panelClass: 'mdmDialog',
                data: {heading : "Logistic Zone" ,title:this.logisticObj.zoneName}
            });

            dialog.afterClosed().subscribe(response => {
                if(response===true){
                    this.isDisabled = true;
                    this.addLogisticZone();
                }
            })

        }else{
            this.isDisabled = true;
            this.addLogisticZone();
        }
    }

    addLogisticZone() {
        this.spinner.show();

        this.$logisticMatrix.saveLogistic(this.logisticObj).subscribe(response => {
            this.isDisabled = false;
            this.spinner.hide();
            if (response != null || response != undefined) {

                if (this.logisticObj.id) {
                    let index = this.logisticMatrixList.findIndex(elem => elem.id == this.logisticObj.id);
                    this.logisticMatrixList[index] = this.logisticObj;
                    this.appComp.showMessage(`${this.logisticObj.zoneName} Is Updated`);
                } else {
                    this.logisticObj.id = response;
                    this.logisticMatrixList.splice(0, 0, { ...this.logisticObj });
                    this.appComp.showMessage(`${this.logisticObj.zoneName} Is Added`);
                }
                setTimeout(() => {
                    this.addLogistic = false;
                    this.logisticForm.resetForm();
                    // this.today = moment(new Date()).format("YYYY-MM-DD");
                    this.p = 1;
                    this.logisticObj = <LogisticZone>{};
                    this.getAllLogisticMatrixs();
                }, 1000);

                if (this.logicticName) {
                    this.logicticName = '';
                }
            }
            else {
                this.spinner.hide();
                if (this.logisticObj.id) {
                    this.appComp.showMessage(`Logistic Zone Updation failed `, "danger");
                }
                else {
                    this.appComp.showMessage(`Logistic Zone Creation failed `, "danger");
                }
            }
        }, err => {
            // check here

            this.isDisabled = false;
        });
    }

    inActiveStatus() {
        
        if (this.logisticObj.status == 0) {
        this.inActiveFlag = true;
        }
    }

    expiryMinDate: any;
    isChange = <boolean>true;

    checkForExpiryDate(effectiveDate) {
        
        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        if(this.logisticObj.expDt){
            this.logisticObj.expDt = moment(this.logisticObj.expDt).format("YYYY-MM-DD");
        }
        if(this.logisticObj.effectiveDate){
            this.logisticObj.effectiveDate = moment( this.logisticObj.effectiveDate).format("YYYY-MM-DD");
        }
        if (this.logisticObj.expDt > effectiveDate && this.logisticObj.expDt > todayDate) {
            this.isVar = false;
        }
        else if (!this.logisticObj.id) {
            this.isVar = true;
        }
        if (effectiveDate < todayDate) {
            return this.expiryMinDate = todayDate;
        }
        return this.expiryMinDate = moment(effectiveDate, 'YYYY-MM-DD').add(1, "d").format('YYYY-MM-DD');

    }
    
    removeMinDate(effectiveDate) {
        this.$common.setExpiryDate(effectiveDate,this.isInactive);
    }

    changeDateFormat(effectiveDate, expDt) {
        
        console.log(effectiveDate)
        this.isVar = true;

        if (effectiveDate) {
            this.logisticObj.effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        }
        if (expDt) {
            this.logisticObj.expDt = moment(expDt).format('YYYY-MM-DD');
        }

        this.checkForExpiryDate(effectiveDate)
    }
}
