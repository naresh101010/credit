import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BillingByValue } from 'src/app/services/billing-by-value.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-billing-by-value',
  templateUrl: './edit-billing-by-value.component.html',
})
export class EditBillingByValueComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    private $billingByValue: BillingByValue,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<EditBillingByValueComponent>,
    private spinner: NgxSpinnerService) { }
  @ViewChild("f", null) billingForm: any;
  ngOnInit() {

    let editBilingObj = { ... this.data };
    this.editStatus = this.data.status;
    this.inActiveStatus();
    if (editBilingObj.permissionType == 0) {
      this.submitPermission = false;
    }
    else {
        this.submitPermission = true;
    }
    this.isVar = false;
    this.editBilingObj = editBilingObj;
    if (this.editBilingObj.effectiveDt) {
      this.editBilingObj.effectiveDt = moment(this.editBilingObj.effectiveDt).format("YYYY-MM-DD");
      this.today = this.editBilingObj.effectiveDt;
    }
    this.getAll();
  }
  BillingByValueObjNameSearchCtrl = <string>'';
  BillingByObjNameSearchCtrl = <string>'';
  submitPermission:boolean = true
  editBilingObj = {} as any;
  lookuplist: Array<any> = [];
  billingByMultipleList: Array<any> = []
  today = new Date();
  currentDate = moment(new Date()).format("YYYY-MM-DD");
  getAll() {

    this.$billingByValue.getBillingByLevelMaster().subscribe(response => {
      this.lookuplist = response.referenceData.billingByLevelList;
      this.billingByMultipleList = response.referenceData.billingByList;
    })
  }

  updateBillingByValue() {

    this.isVar = false;
    if (this.editBilingObj.expDt) {
      if (this.editBilingObj.expDt < this.currentDate && this.editBilingObj.expDt < this.editBilingObj.effectiveDt) {
          this.isVar = true;
      }
      else {
          this.isVar = false;
          this.editBilingObj.expDt = moment(this.editBilingObj.expDt).format("YYYY-MM-DD");
      }
    }
    if (this.editBilingObj.status === 0) {

      let dialog = this.dialog.open(DeleteModalComponent, {
        width: '35vw',
        panelClass: 'mdmDialog',
        data: { title: this.editBilingObj.gstType, heading: "Billing By Level" }
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

  submitData(type = null) {
    this.isVar = false;
    this.spinner.show;
    this.$billingByValue.saveBillingByLevelMaster(this.editBilingObj).subscribe(response => {

      // this.billingForm.submitted = false;
      this.editBilingObj.id = response;
      let editBilingObj = { ...this.editBilingObj };
      this.dialogRef.close(editBilingObj);
      this.spinner.hide;
      this.billingForm.reset();

    })
  }

  editStatus={}as any;
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
      if(this.editBilingObj.expDt){
          this.editBilingObj.expDt = moment(this.editBilingObj.expDt).format("YYYY-MM-DD");
      }
      if(this.editBilingObj.effectiveDt){
          this.editBilingObj.effectiveDt = moment( this.editBilingObj.effectiveDt).format("YYYY-MM-DD");
      }
      if (this.editBilingObj.expDt <= effectiveDt && (!this.editBilingObj.id || this.editBilingObj.expDt <= effectiveDt)) {
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
          this.editBilingObj.effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
      }
      if (expDt) {
          this.editBilingObj.expDt = moment(expDt).format('YYYY-MM-DD');
      }

      this.checkForExpiryDate(effectiveDt)
  }


}
