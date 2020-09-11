import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import moment from 'moment';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SegmentLineService } from 'src/app/services/segment.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-segment',
  templateUrl: './add-segment.component.html',
})
export class AddSegmentComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    private $segment: SegmentLineService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddSegmentComponent>,
    private $common: CommonService,
  ) { }

  ngOnInit() {
  }
  @ViewChild("f", null) segmentForm: any;
  segmentObj;
  currentDate = moment(new Date()).format("YYYY-MM-DD");
  expiryMinDate: any;
  isInactive = <boolean>false;
  isVar = <boolean>true;
  minDate = new Date(new Date().setDate(new Date().getDate()));
  addSegment() {

    if (this.segmentObj.id) {
      this.segmentObj.isUpdateOrRemove = "Update";
    }
    if (this.segmentObj.status === 0) {
      let dialog = this.dialog.open(DeleteModalComponent, {
        width: '35vw',
        panelClass: 'mdmDialog',
        data: { title: this.segmentObj.countryName, heading: "Add Sub Segment" }
      });

      dialog.beforeClose().subscribe(response => {
        if (response === true) {
          this.submitData("delete");

        }
      })

    } else {
      this.submitData()
    }


  }

  submitData(type = null) {
    this.spinner.show();
    this.segmentObj.effectiveDate = moment(this.segmentObj.effectiveDate).format("DD-MM-YYYY HH:mm:ss");
    if (this.segmentObj.expiryDate) {
      this.segmentObj.expiryDate = moment(this.segmentObj.expiryDate).format("DD-MM-YYYY HH:mm:ss");
    }

    this.$segment.saveSegment(this.segmentObj).subscribe(response => {
      this.segmentForm.submitted = false;
      this.segmentObj.id = response.responseData;
      let segmentObj = { ...this.segmentObj };
      if (type == "delete") {
        this.dialogRef.close({ type: "delete", status: true });
      } else {
        this.dialogRef.close(segmentObj);
      }
      this.spinner.hide();
      this.segmentForm.reset();

      if (this.segmentObj.status == 0 && this.segmentObj.expDt < this.currentDate) {
          this.isInactive = true;
          this.expiryMinDate = this.currentDate;
      }else {
          this.isInactive = false;
      }

    })
  }

    removeMinDate(effectiveDate) {
        this.$common.setExpiryDate(effectiveDate, this.isInactive)
    }

  effDate() {
    let effYear = parseInt(this.datePipe.transform(this.segmentObj.effectiveDt, 'yyyy'))
    if (effYear > 9999) {
      this.segmentObj.effectiveDt = "";
    }
  }

  expDate() {
    let expYear = parseInt(this.datePipe.transform(this.segmentObj.expDt, 'yyyy'))
    if (expYear > 9999) {
      this.segmentObj.expDt = "";
    }
  }

}
