import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditBillingByValueComponent } from 'src/app/modals/edit-billing-by-value/edit-billing-by-value.component';
import { BillingByValue } from 'src/app/services/billing-by-value.service';
import { AppComponent } from 'src/app/app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import moment from 'moment';
import { AuthorizationService } from 'src/app/services/authorisation.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-billing-by-value',
  templateUrl: './billing-by-value.component.html',
})
export class BillingByValueComponent implements OnInit {
  @ViewChild("f", null) billingForm: any;
  constructor(public dialog: MatDialog, private $billingByValue: BillingByValue, private appComp: AppComponent, private spinner: NgxSpinnerService, private AuthorizationService: AuthorizationService,
    private permissionsService: NgxPermissionsService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getAll();
    this.permissionsService.loadPermissions(this.AuthorizationService.getPermissions('LOOKUP', 'BILING BY LEVEL'));
  }
  addBillingByValue;
  billingByValue;
  BillingByValueNameSearchCtrl = <string>'';
  BillingByNameSearchCtrl = <string>'';
  billingObj = {
    status: 1
  } as any;
  billingList: Array<any> = [];
  lookuplist: Array<any> = [];
  billingByMultipleList: Array<any> = []
  p: number = 1;
  // minDate = new Date(new Date().setDate(new Date().getDate()));
  currentDate = moment(new Date()).format("YYYY-MM-DD");
  editModal(obj = undefined, permissionType) {

    let data = {
      status: 1
    }
    if (obj.id) {
      data = { ...this.billingList.find(elem => elem.id == obj.id), permissionType:permissionType }
    }
    let dialog = this.dialog.open(EditBillingByValueComponent, {
      width: '65vw',
      panelClass: 'mdmDialog',
      data: data
    })
    dialog.afterClosed().subscribe(response => {

      if (response === true) {
        return;
      }
      if (response) {
        let index = this.billingList.findIndex(elem => elem.id == obj.id)
        if (!response.expDt) {
          response.expDt = '';
        }
        response.id = obj.id;
        this.billingList[index] = response;
        this.billingObj.id = obj.id;
        this.p = 1;
        if (response.status == 0) {
          this.appComp.showMessage(`BILLING BY LEVEL IS DELETED`);
        }
        else {
          this.appComp.showMessage(`BILLING BY LEVEL IS UPDATED`);
        }
      }
    })
  }


  getAll() {
    this.spinner.show();
    this.$billingByValue.getBillingByLevelMaster().subscribe(response => {
      this.billingList = response.responseData;
      this.lookuplist = response.referenceData.billingByLevelList;
      this.billingByMultipleList = response.referenceData.billingByList;
      this.spinner.hide();
    })
  }
  saveBillingByValue() {
    this.spinner.show();

    this.isVar = false;
    if (this.billingObj.expDt) {
      if (this.billingObj.expDt < this.currentDate && this.billingObj.expDt < this.billingObj.effectiveDt) {
          this.isVar = true;
      }
      else {
          this.isVar = false;
          this.billingObj.expDt = moment(this.billingObj.expDt).format("YYYY-MM-DD");
      }
    }
    this.$billingByValue.saveBillingByLevelMaster(this.billingObj).subscribe(response => {


      if (!this.billingObj.id) {
        this.billingObj.id = response;
        this.billingList.push(this.billingObj);
        this.appComp.showMessage(`BILLING BY LEVEL IS ADDED`);
      } else {
        this.appComp.showMessage(`BILLING BY LEVEL IS UPDATED`);
      }

      setTimeout(() => {
        this.p = 1;
        this.addBillingByValue = false;
        this.billingObj = {} as any;
        this.spinner.hide();
      }, 1000);
    })


  }

  strLengthValid:boolean = false;
  searchbillingByValue(str) {
    let strlength = str.target.value.length;
    if (strlength > 2 && str.target.value) {
      this.strLengthValid = false;
      this.spinner.show();
    if (!this.billingByValue || this.billingByValue.trim() == "") {
      return this.getAll();
    }
    this.$billingByValue.searchByName(this.billingByValue).subscribe(Response => {
      this.billingList = Response;
      if (!this.billingList.length) {
        this.appComp.showMessage(`Record does not exist`, "danger");
      }
      this.spinner.hide();
    });
  } else {
    this.strLengthValid = true;
  }
  }
  clearSearch() {
    if (!this.billingByValue || this.billingByValue == "") {
      return this.getAll();
    }
  }


  expiryMinDate: any;
  isVar = <boolean>true;
  isChange = <boolean>true;

  checkForExpiryDate(effectiveDt) {

      let todayDate = moment(new Date()).format('YYYY-MM-DD');
      effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
      if(this.billingObj.expDt){
          this.billingObj.expDt = moment(this.billingObj.expDt).format("YYYY-MM-DD");
      }
      if(this.billingObj.effectiveDt){
          this.billingObj.effectiveDt = moment( this.billingObj.effectiveDt).format("YYYY-MM-DD");
      }
      if (this.billingObj.expDt <= effectiveDt && (!this.billingObj.id || this.billingObj.expDt <= effectiveDt)) {
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
          this.billingObj.effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
      }
      if (expDt) {
          this.billingObj.expDt = moment(expDt).format('YYYY-MM-DD');
      }

      this.checkForExpiryDate(effectiveDt)
  }


}
