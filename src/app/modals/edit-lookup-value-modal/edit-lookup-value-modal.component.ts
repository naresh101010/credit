import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LookUpServices } from 'src/app/services/lookup.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-lookup-value-modal',
  templateUrl: './edit-lookup-value-modal.component.html',
})
export class EditLookupValueModalComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    private $lopkup: LookUpServices,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<EditLookupValueModalComponent>
  ) { }
  @ViewChild("f", null) lookupForm: any;
  ngOnInit() {
debugger    
    let lookupValueObj = { ... this.data };
    this.lookupValueObj = lookupValueObj;
    this.getLookupList();
  }
  lookupTypeNameSearchCtrl = <string>'';
  lookupValueObj = {} as any;
  lookupList: Array<any> = [];
  minDate = new Date(new Date().setDate(new Date().getDate()));
  updatelookupValue() {

    if (this.lookupValueObj.status === 0) {

      let dialog = this.dialog.open(DeleteModalComponent, {
        width: '35vw',
        panelClass: 'mdmDialog',
        data: { title: this.lookupValueObj.gstType, heading: "Gst" }
      });
      dialog.beforeClose().subscribe(response => {
        if (response === true) {
          this.submitData();
        }
      })
    }
    else {
      return this.submitData();
    }
  }

  submitData() {

    this.spinner.show();
    this.$lopkup.saveLookupValue(this.lookupValueObj).subscribe(response => {

      // this.lookupForm.submitted = false;
      this.lookupValueObj.id = response;
      let lookupValueObj = { ...this.lookupValueObj };
      this.dialogRef.close(lookupValueObj);
      this.spinner.hide();
      this.lookupForm.reset();

    })
  }
  getLookupList() {

    this.$lopkup.getLookup().subscribe(response => {

      this.lookupList = response;
    })
  }

  effDate() {
    let effYear = parseInt(this.datePipe.transform(this.lookupValueObj.effectiveDt, 'yyyy'))
    if (effYear > 9999) {
      this.lookupValueObj.effectiveDt = "";
    }
  }

  expDate() {
    let expYear = parseInt(this.datePipe.transform(this.lookupValueObj.expDt, 'yyyy'))
    if (expYear > 9999) {
      this.lookupValueObj.expDt = "";
    }
  }

}
