import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/common.service';
import { BookingInformationService } from 'src/app/core/service/booking-information.service';
import { OpenBookingService } from 'src/app/core/service/open-booking.service';

@Component({
  selector: 'app-forward-booking',
  templateUrl: './forward-booking.component.html',
  styleUrls: ['./forward-booking.component.css']
})
export class ForwardBookingComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private openBookingService: OpenBookingService, public dialogRef: MatDialogRef<ForwardBookingComponent>, private $openBooking: BookingInformationService, private spnner: NgxSpinnerService) { }
  reasonList: any;
  type;
  ngOnInit() {
    console.log('this.data', this.data);
    this.type = this.data.type;
    this.data = this.data.waybilRequestDetail;
    this.getReaonList();
  }

  forwardRequest(reasonForm: NgForm) {
    // console.log(reasonForm.value)
    switch (this.type) {
      case 'wayBill':
        this.forwardWaybillRequest(reasonForm);
        break;
      case 'preBook':
        this.forwardPrebookRequest(reasonForm);
        break;
    }
  }
  forwardPrebookRequest(reasonForm: NgForm) {
    const reasonFormValue = reasonForm.value;
    const body = {
      "assignedBranchId": 0,
      "bookingRequestId": this.data.preBookingRequestId,
      "description": reasonFormValue.remarks,
      "returnToCentraldeskReasonLkpId": +reasonFormValue.reason,
      "status": 1
    }
    this.openBookingService.forwardRequest(body).subscribe(
      (resp: any) => {
        console.log(resp);
        this.dialogRef.close(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  forwardWaybillRequest(reasonForm: NgForm) {
    const reasonFormValue = reasonForm.value;
    const body = {
      "assignedBranchId": 0,
      "bookingRequestId": this.data.preBookingRequestId,
      "description": reasonFormValue.remarks,
      "returnToCentraldeskReasonLkpId": +reasonFormValue.reason,
      "status": 1
    }
    this.openBookingService.forwardRequest(body).subscribe(
      (resp: any) => {
        console.log(resp);
        this.dialogRef.close();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getReaonList() {
    this.spnner.show();
    const branchId = JSON.parse(sessionStorage.getItem("branchId"));
    this.$openBooking.getLoad(branchId).subscribe(
      (reasons: any) => {
        this.spnner.hide();

        console.log('reasons', reasons);
        this.reasonList = reasons.filter(el => el.lookupTypeVal === 'BOOKING_CANCEL_REASON')
        console.log('this.reasonList', this.reasonList);
      },
      (err) => {
        this.spnner.hide();

        console.log(err);
      }
    );
  }
}
