import { Component, OnInit, ViewChild } from '@angular/core';
import { EditServiceLineComponent } from 'src/app/modals/edit-service-line/edit-service-line.component';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ServiceLineService } from "src/app/services/service-line.service";
import { AppComponent } from 'src/app/app.component';
import { DeleteModalComponent } from 'src/app/modals/delete-modal/delete-modal.component';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthorizationService } from 'src/app/services/authorisation.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-service-line',
    templateUrl: './service-line.component.html',
})
export class ServiceLineComponent implements OnInit {
    @ViewChild("f", null) serviceLineForm: any;
    constructor(
        public dialog: MatDialog,
        private http: HttpClient,
        private $serviceLine: ServiceLineService,
        private appComp: AppComponent,
        private spinner: NgxSpinnerService,
        private AuthorizationService: AuthorizationService,
        private permissionsService: NgxPermissionsService,
        private datePipe: DatePipe

    ) { }

    ngOnInit() {
        this.getserviceLineList();
        this.permissionsService.loadPermissions(this.AuthorizationService.getPermissions('LOOKUP', 'SERVICE LINE'));
    }
    serviceNameSearchCtrl = <string>'';
    addServiceLine;
    serviceLineId = {} as any;
    serviceLineObj = <any>{
        status: 1
    };
    serviceLineList: Array<any> = [];
    serviceofferingList: Array<any> = [];
    p: number = 1;
    minDate = new Date(new Date().setDate(new Date().getDate()));
    editServiceLineModal(obj = null, permissionType) {

        var data = { ...this.serviceofferingList.find(elem => elem.id == obj.id), permissionType: permissionType }
        let dialog = this.dialog.open(EditServiceLineComponent, {
            width: '65vw',
            panelClass: 'mdmDialog',
            data: data
        });

        dialog.afterClosed().subscribe(response => {

            if (response === true) {
                return;
            }
            if (response) {
                this.p = 1;
                let index = this.serviceofferingList.findIndex(elem => elem.id == data.id);
                this.serviceofferingList[index] = response;
                this.serviceLineObj.id = response.id;
                // this.serviceLineObj = { ...response };
                if (response.status == 0) {
                    this.appComp.showMessage(`${response.serviceOffering} IS DELETED`);
                    return this.getServiceOfferingByServiceLine(response.lkpServiceLineId);
                }
                else {
                    this.appComp.showMessage(`${response.serviceOffering} IS UPDATED`);
                    return this.getServiceOfferingByServiceLine(response.lkpServiceLineId);
                }
            }
            setTimeout(() => {
                this.p = 1;
            }, 1000);
        })
    }
    clearObj() {
        this.serviceLineObj = {
            status: 1,
            lkpServiceLineId: this.serviceLineObj.lkpServiceLineId
        }
    }
    getserviceLineList() {
        this.spinner.show();
        this.$serviceLine.getServiceLineList().subscribe(response => {
            this.serviceLineList = response;
            this.serviceLineObj.lkpServiceLineId = this.serviceLineList[0].id;
            this.getServiceOfferingByServiceLine(this.serviceLineObj.lkpServiceLineId);
            this.spinner.hide();
        })
    }
    getServiceOfferingByServiceLine(lkpServiceLineId) {
        this.spinner.show();
        this.$serviceLine.getServiceLineOfferingList(lkpServiceLineId).subscribe(response => {
            this.spinner.hide();
            this.serviceofferingList = response;
        }, err => {
            this.spinner.hide();
            if (err.error.errors.error[0].code == "B_ERR-731") {
                this.serviceofferingList = [];
            }
        })
    }

    saveServiceOfferList(type = null) {

        this.spinner.show();
        this.isVar = false;
        this.serviceLineObj.effectiveDt = moment(this.serviceLineObj.effectiveDt).format("YYYY-MM-DD");
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

        this.$serviceLine.saveServiceLine(this.serviceLineObj).subscribe(response => {
            this.serviceofferingList.splice(0, 0, this.serviceLineObj);
            this.appComp.showMessage(`${this.serviceLineObj.serviceOffering} IS ADDED`);
            setTimeout(() => {
                this.p = 1
                let serviceId = this.serviceLineObj.lkpServiceLineId;
                this.serviceLineObj = {};
                this.serviceLineObj.lkpServiceLineId = serviceId;
                this.addServiceLine = false;
                this.spinner.hide();
            }, 1000);
        })


    }
    // editServiceLineOffer(obj) {
    //   this.serviceLineObj = { ...obj };
    //   this.addServiceLine = true;
    // }


    expiryMinDate: any;
    isVar = <boolean>true;
    isChange = <boolean>true;
    currentDate = moment(new Date()).format("YYYY-MM-DD");

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

    removeMinDate(effectiveDt) {

        this.expiryMinDate = moment(effectiveDt).format('YYYY-MM-DD');
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
