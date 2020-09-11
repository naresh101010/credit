import { Component, OnInit, ViewChild, Inject, } from '@angular/core';
import { FuelPriceService } from 'src/app/services/fuel.service';
import { AppComponent } from 'src/app/app.component';
import moment from 'moment';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fuel-state-price',
  templateUrl: './fuel-state-price.component.html',
})
export class FuelStatePriceComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    private $fuelPrice: FuelPriceService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<FuelStatePriceComponent>
  ) { }
  @ViewChild("f", null) fuelForm: any;
  ngOnInit() {

    let statePriceObj = { ...this.data }
    if (statePriceObj.ids) {
      this.statePriceObj = {
        "lkpFuelIndexId": statePriceObj.ids
      }
    }
    else {
      this.statePriceObj = statePriceObj;
    }
    if (this.statePriceObj.status == null) {
      this.statePriceObj.status == 0;
    }
    this.getFuelPrice();

  }
  fuelEntityNameSearchCtrl = <string>'';
  fuelContractNameSearchCtrl = <string>'';
  fuelTypeNameSearchCtrl = <string>'';
  fuelPriceList: Array<any> = [];
  fuelFuelIndexList: Array<any> = [];
  fuelContractTypeList: Array<any> = []
  fuelStateList: Array<any> = []
  fuelFuelTypeList: Array<any> = []
  statePriceObj = {} as any;
  minDate = new Date(new Date().setDate(new Date().getDate()));
  getFuelPrice() {

    this.$fuelPrice.getAllFuelPrice().subscribe(response => {
      this.fuelContractTypeList = response.referenceData.contractType;
      this.fuelStateList = response.referenceData.stateList;
      this.fuelFuelTypeList = response.referenceData.fuelTypeList;
      if (this.statePriceObj.contractType) {
        this.fuelContractTypeList.map(elem => {
          if (elem.descr == this.statePriceObj.contractType) {
            this.statePriceObj.contractTypeId = elem.id;
          }
        })
      }

    });

  }

  saveStatePrice() {

    if (this.statePriceObj.status === 0) {
      let dialog = this.dialog.open(DeleteModalComponent, {
        width: '35vw',
        panelClass: 'mdmDialog',
        data: { title: this.statePriceObj.countryName, heading: "Country" }
      });

      dialog.beforeClose().subscribe(response => {
        if (response === true) {
          this.submitData();

        }
      })

    } else {
      this.submitData()
    }


  }

  submitData(type = null) {
    this.spinner.show();
    if (this.statePriceObj.effectiveDt) {
      this.statePriceObj.effectiveDt = moment(this.statePriceObj.effectiveDt).format("YYYY-MM-DD");
    }
    if (this.statePriceObj.fuelbaseDt) {
      this.statePriceObj.fuelbaseDt = moment(this.statePriceObj.fuelbaseDt).format("YYYY-MM-DD");
    }
    if (this.statePriceObj.expDt) {
      this.statePriceObj.expDt = moment(this.statePriceObj.expDt).format("YYYY-MM-DD");
    }
    this.$fuelPrice.saveFuelPrice([this.statePriceObj]).subscribe(response => {
      this.fuelForm.submitted = false;
      this.statePriceObj.id = response.responseData;
      let statePriceObj = { ...this.statePriceObj };
      this.dialogRef.close(statePriceObj);
      this.spinner.hide();
      this.fuelForm.reset();

    })
  }

  effDate() {
    let effYear = parseInt(this.datePipe.transform(this.statePriceObj.effectiveDt, 'yyyy'))
    if (effYear > 9999) {
      this.statePriceObj.effectiveDt = "";
    }
  }

  expDate() {
    let expYear = parseInt(this.datePipe.transform(this.statePriceObj.expDt, 'yyyy'))
    if (expYear > 9999) {
      this.statePriceObj.expDt = "";
    }
  }

  fuelBaseDate() {
    let expYear = parseInt(this.datePipe.transform(this.statePriceObj.fuelbaseDt, 'yyyy'))
    if (expYear > 9999) {
      this.statePriceObj.fuelbaseDt = "";
    }
  }

}


