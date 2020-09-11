
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditAddressFeatureComponent } from 'src/app/modals/edit-address-feature/edit-address-feature.component';
import moment from 'moment';
import { AddressFeatureMasterService } from 'src/app/services/address-feature-master.service';
import { AppComponent } from 'src/app/app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthorizationService } from 'src/app/services/authorisation.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-address-feature',
    templateUrl: './address-feature.component.html',
})
export class AddressFeatureComponent implements OnInit {

    constructor(public dialog: MatDialog,
        private $addressType: AddressFeatureMasterService,
        private appComp: AppComponent,
        private spinner: NgxSpinnerService, private AuthorizationService: AuthorizationService,
        private permissionsService: NgxPermissionsService,
        private datePipe: DatePipe
    ) { }

    ngOnInit() {

        this.getAllAddressFeature();
        this.permissionsService.loadPermissions(this.AuthorizationService.getPermissions('LOOKUP', 'FEATURES'));

    }
    addAddressFeature;
    featureType;
    featureTab;
    featureNameSearchCtrl=<string>'';
    addressFeatureObj = {
        status: 1
    } as any;
    addressFeatureList: Array<any> = [];
    LoadList: Array<any> = [];
    p: number = 1;
    // today = new Date();
    currentDate = moment(new Date()).format("YYYY-MM-DD");

    clearObj(){
        this.addressFeatureObj = {
        status: 1
    }
    }
    editModal(addressFeatureObj = null, permissionType) {

   this.strLengthValid=false;
   this.featureType='';
        this.LoadList.forEach(elem => {
            if (elem.descr == addressFeatureObj.featureType) {
                addressFeatureObj.featureTypeId = elem.id;
            }
        })
        let data = {
            status: 1,
            permissionType:permissionType
        }

        // this.addressFeatureObj.effectiveDate = moment(this.addressFeatureObj.effectiveDate).format("YYYY-MM-DD");
        // if (this.addressFeatureObj.expiryDate) {
        //     this.addressFeatureObj.expiryDate = moment(this.addressFeatureObj.expiryDate).format("YYYY-MM-DD");
        // }
        if (addressFeatureObj.id) {
            data = { ... this.addressFeatureList.find(elem => elem.id == addressFeatureObj.id), permissionType:permissionType }
        }
        let dialog = this.dialog.open(EditAddressFeatureComponent, {
            width: '65vw',
            panelClass: 'mdmDialog',
            data: data
        })
        dialog.afterClosed().subscribe(response => {

            if (response === true) {
                return;
            }

            if (response) {
                let index = this.addressFeatureList.findIndex(elem => elem.id == addressFeatureObj.id)
                this.addressFeatureList[index] = response;
                this.addressFeatureObj.id = response.id;
                this.p = 1;
                if (response.status == 0) {
                    this.appComp.showMessage(`${response.featureName} IS DELETED`);
                }
                else {
                    this.appComp.showMessage(`${response.featureName} IS UPDATED`);
                }
                return this.getAllAddressFeature();
            }
        })
    }

    getAllAddressFeature() {
        this.spinner.show();
        this.$addressType.getAddressFeature().subscribe(response => {

            this.addressFeatureList = response.responseData;
            this.LoadList = response.referenceData.featureTypeList;
            for (let index = 0; index < this.addressFeatureList.length; index++) {
                this.addressFeatureList[index].effectiveDate = moment(this.addressFeatureList[index].effectiveDate).format("YYYY-MM-DD");
               if(this.addressFeatureList[index].expiryDate){
                    this.addressFeatureList[index].expiryDate = moment(this.addressFeatureList[index].expiryDate).format("YYYY-MM-DD");
               }
            } this.spinner.hide();
        });
    }




    addAllAddressFeature() {

        this.spinner.show();
        this.isVar = false;
        this.addressFeatureObj.effectiveDate = moment(this.addressFeatureObj.effectiveDate).format("YYYY-MM-DD");
        if (this.addressFeatureObj.expiryDate) {
            this.addressFeatureObj.expiryDate = moment(this.addressFeatureObj.expiryDate).format("YYYY-MM-DD");
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

        this.$addressType.saveAddressFeature(this.addressFeatureObj).subscribe(response => {

            // this.addressFeatureObj = {
            //     status: 1
            // } as gst;

            if (!this.addressFeatureObj.id) {
                this.addressFeatureObj.id = response;
                this.addressFeatureList.splice(0,0,this.addressFeatureObj);
                this.appComp.showMessage(`${this.addressFeatureObj.featureName} IS ADDED`);
            } else {
                this.appComp.showMessage(`${this.addressFeatureObj.featureName} IS UPDATED`);
            }

            setTimeout(() => {
                this.p = 1;
                this.addressFeatureObj = {
                    status: 1
                } as any;
                this.spinner.hide();
                this.addAddressFeature = false;
            }, 1000);
        })


    }
    editAddressFeature(obj) {
        this.addressFeatureObj = { ...obj };
        this.addAddressFeature = true;
    }

    strLengthValid:boolean = false;
    searchFeatureType(str) {

        let strlength = str.target.value.length;
        if (strlength > 2 && str.target.value) {
            this.strLengthValid = false;
            this.spinner.show();
             this.p = 1;
            if (!this.featureType || this.featureType.trim() == "") {
                return this.getAllAddressFeature();
            }
            this.$addressType.searchByName(this.featureType).subscribe(Response => {
                this.addressFeatureList = Response;
                if (!this.addressFeatureList.length) {
                    this.appComp.showMessage(`Record doesn't exist in Propel-I`, "danger");
                }
                this.spinner.hide();
            });
        }else {
            this.strLengthValid = true;
        }
    }
    clearSearch() {
        if (!this.featureType || this.featureType == "") {
               this.strLengthValid=false;
            return this.getAllAddressFeature();
        }
    }


    expiryMinDate: any;
    isVar = <boolean>true;
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
