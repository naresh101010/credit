import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/common.service';
import { BookingInformationService } from 'src/app/core/service/booking-information.service';
import { OpenBookingService } from 'src/app/core/service/open-booking.service';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css']
})
export class CancelBookingComponent implements OnInit {
  reasonList;
  reqId;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private $openBooking: BookingInformationService,
    private openBookingService: OpenBookingService,
    public dialogRef: MatDialogRef<CancelBookingComponent>,
    private spinner: NgxSpinnerService) { }

  
  ngOnInit() {
    this.getReaonList();
    if (this.data) {
      console.log('this.data', this.data);
      if (this.data.waybilRequestDetail){
        if (this.data.waybilRequestDetail.preBookingRequestId) {
          this.reqId = this.data.waybilRequestDetail.preBookingRequestId
        } else {
          this.reqId = this.data.bookingRequestId
        }
      } else {
        this.reqId = this.data.bookingRequestId
      }
    }
  }

  cancelRequest(reasonForm: NgForm) {
    console.log(reasonForm.value)
    const data = {
      bookingRequestId: this.reqId,
      cancelReason: +reasonForm.value.reason
    }
    this.openBookingService.cancelReason(data).subscribe(
      (resp: any) => {
        console.log(resp);
        this.dialogRef.close('success');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getReaonList() {
    this.spinner.show();
    const branchId = JSON.parse(sessionStorage.getItem("branchId"));
    this.$openBooking.getLoad(branchId).subscribe(
      (reasons: any) => {
        this.spinner.hide();
        this.reasonList = reasons.filter(el => el.lookupTypeVal === 'BOOKING_CANCEL_REASON')
        console.log('this.reasonList', this.reasonList);
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
}
