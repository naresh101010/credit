import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdMasterService } from 'src/app/services/product-master.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-hsn',
  templateUrl: './add-hsn.component.html',
})
export class AddHsnComponent implements OnInit {

  constructor(
    private $hsn: ProdMasterService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddHsnComponent>,
    private $common: CommonService,
  ) { }

  @ViewChild("f", null) hsnForm: any;
  ngOnInit() {
  }
  hsnObj = {
    status: 1
  } as any;
  hsnList: Array<any> = [];
  defaultSelected = 0;
  wayblExempt: number;
  minDate = new Date(new Date().setDate(new Date().getDate()));

  addHsn() {
    this.spinner.show();
    this.isVar = false;
    if (this.hsnObj.expDt) {
        if (this.hsnObj.expDt < this.currentDate && this.hsnObj.expDt < this.hsnObj.effectiveDt) {
            this.isVar = true;
        }
        else {
            this.isVar = false;
            this.hsnObj.expDt = moment(this.hsnObj.expDt).format("YYYY-MM-DD");
        }
    }
    if (this.hsnObj.effectiveDt) {
      this.hsnObj.effectiveDt = moment(this.hsnObj.effectiveDt).format("YYYY-MM-DD");
    }
    if (this.hsnObj.expDt) {
      this.hsnObj.expDt = moment(this.hsnObj.expDt).format("YYYY-MM-DD");
    }
    this.$hsn.saveHsnCode(this.hsnObj).subscribe(response => {
      this.hsnObj.id = response.responseData;
      let hsnObj = { ...this.hsnObj };
      this.dialogRef.close(hsnObj);
      this.spinner.hide();
      this.hsnForm.reset();

    });
  }

  
  
  expiryMinDate: any;
  isVar = <boolean>true;
  isChange = <boolean>true;
  currentDate = moment(new Date()).format("YYYY-MM-DD");

  checkForExpiryDate(effectiveDt) {
      
      let todayDate = moment(new Date()).format('YYYY-MM-DD');
      effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
      if(this.hsnObj.expDt){
          this.hsnObj.expDt = moment(this.hsnObj.expDt).format("YYYY-MM-DD");
      }
      if(this.hsnObj.effectiveDt){
          this.hsnObj.effectiveDt = moment( this.hsnObj.effectiveDt).format("YYYY-MM-DD");
      }
      if (this.hsnObj.expDt <= effectiveDt && (!this.hsnObj.id || this.hsnObj.expDt <= effectiveDt)) {
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
          this.hsnObj.effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
      }
      if (expDt) {
          this.hsnObj.expDt = moment(expDt).format('YYYY-MM-DD');
      }

      this.checkForExpiryDate(effectiveDt)
  }

}