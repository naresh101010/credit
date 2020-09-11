import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FuelPriceService } from 'src/app/services/fuel.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import moment from 'moment';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-fuel',
  templateUrl: './edit-fuel.component.html',
})
export class EditFuelComponent implements OnInit {

  constructor(
    private $fuelPrice: FuelPriceService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditFuelComponent>,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) { }
  @ViewChild("f", null) fuelForm: any;
  ngOnInit() {

    let editPriceIndexObj = { ...this.data }
    this.editPriceIndexObj = editPriceIndexObj;
    this.getFuelPrice();
    if (this.editPriceIndexObj.effectiveDt) {
      this.editPriceIndexObj.effectiveDt = moment(this.editPriceIndexObj.effectiveDt).format("YYYY-MM-DD");
      this.today = this.editPriceIndexObj.effectiveDt;
    }
  }
  fuelNameSearchCtrl = <string>'';
  fuelEntityNameSearchCtrl = <string>'';
  fuelTypeNameSearchCtrl = <string>'';
  fuelContractNameSearchCtrl = <string>'';
  fuelEntity2NameSearchCtrl = <string>'';
  fuelPriceList: Array<any> = [];
  fuelFuelIndexList: Array<any> = [];
  fuelContractTypeList: Array<any> = []
  fuelStateList: Array<any> = [];
  fuelFuelTypeList: Array<any> = [];
  editPriceIndexObj = {} as any;
  today = new Date();
  currentDate = moment(new Date()).format("YYYY-MM-DD");
  updateFuelPrice() {

    if (this.editPriceIndexObj.status === 0) {

      let dialog = this.dialog.open(DeleteModalComponent, {
        width: '35vw',
        panelClass: 'mdmDialog',
        data: { title: this.editPriceIndexObj.gstType, heading: "Fuel" }
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
    this.spinner.show();
    this.editPriceIndexObj.effectiveDt = moment(this.editPriceIndexObj.effectiveDt).format("YYYY-MM-DD");
    if (this.editPriceIndexObj.fuelbaseDt) {
      this.editPriceIndexObj.fuelbaseDt = moment(this.editPriceIndexObj.fuelbaseDt).format("YYYY-MM-DD");
    }
    if (this.editPriceIndexObj.expDt) {
      this.editPriceIndexObj.expDt = moment(this.editPriceIndexObj.expDt).format("YYYY-MM-DD");
    }


    this.$fuelPrice.saveFuelPrice([this.editPriceIndexObj]).subscribe(response => {
      // this.fuelForm.submitted = false;
      this.editPriceIndexObj.id = response.data.responseData;
      let editPriceIndexObj = { ...this.editPriceIndexObj };
      this.dialogRef.close(editPriceIndexObj);
      this.spinner.hide();
      this.fuelForm.reset();

    })
  }

  getFuelPrice() {

    this.$fuelPrice.getAllFuelPrice().subscribe(response => {
      this.fuelFuelIndexList = response.referenceData.fuelIndexList;
      this.fuelFuelTypeList = response.referenceData.fuelTypeList;
      this.fuelContractTypeList = response.referenceData.contractType;
      this.fuelStateList = response.referenceData.stateList;
    });
  }


  effDate() {
    let effYear = parseInt(this.datePipe.transform(this.editPriceIndexObj.effectiveDt, 'yyyy'))
    if (effYear > 9999) {
      this.editPriceIndexObj.effectiveDt = "";
    }
  }

  fuelBaseDate() {
    let expYear = parseInt(this.datePipe.transform(this.editPriceIndexObj.fuelbaseDt, 'yyyy'))
    if (expYear > 9999) {
      this.editPriceIndexObj.fuelbaseDt = "";
    }
  }

  expDate() {
    let effYear = parseInt(this.datePipe.transform(this.editPriceIndexObj.expDt, 'yyyy'))
    if (effYear > 9999) {
      this.editPriceIndexObj.expDt = "";
    }
  }

  effectiveDate() {
    let expYear = parseInt(this.datePipe.transform(this.editPriceIndexObj.effectiveDt, 'yyyy'))
    if (expYear > 9999) {
      this.editPriceIndexObj.effectiveDt = "";
    }
  }

  basePriceDate() {
    let effYear = parseInt(this.datePipe.transform(this.editPriceIndexObj.fuelbaseDt, 'yyyy'))
    if (effYear > 9999) {
      this.editPriceIndexObj.fuelbaseDt = "";
    }
  }

  expiryDate() {
    let expYear = parseInt(this.datePipe.transform(this.editPriceIndexObj.expDt, 'yyyy'))
    if (expYear > 9999) {
      this.editPriceIndexObj.expDt = "";
    }
  }


}
