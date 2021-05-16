import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/common.service';
import { BookingInformationService } from 'src/app/core/service/booking-information.service';
import { OpenBookingService } from 'src/app/core/service/open-booking.service';
import { DateUtilService } from 'src/app/core/util/date-util.service';
@Component({
  selector: 'app-reschedule-pickup',
  templateUrl: './reschedule-pickup.component.html',
  styleUrls: ['./reschedule-pickup.component.css']
})
export class ReschedulePickupComponent implements OnInit {
  details;
  reScheduleReason = [];
  safeReason: any;
  safePickUpDate;
  safePickUpTime;
  custPickUpDate;
  custPickUpTime;
  currentDate = new Date();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private commonService: CommonService,
    private dateutil: DateUtilService,
    private datepipe: DatePipe,
    private openBookingService: OpenBookingService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<ReschedulePickupComponent>,
    private matSnackBar: MatSnackBar,
    private $bookingInfo: BookingInformationService
  ) { }
  type;
  ngOnInit() {
    this.getReScheduleReason();
    console.log('this.data', this.data);
    if (this.data) {
      this.type = this.data.type;
      this.details = this.data.data
      if (this.details.pickUpFromTime) {
        this.getTime();
      }
      if (this.details.consignorId) {
        this.getConsignorDetailsById(this.details.consignorId);
      }
      const d = this.datepipe.transform(new Date(), 'yyyy-MM-dd')
      this.safePickUpDate = d;
      // this.safePickUpTime = this.details.pickUpToTime ? this.details.pickUpToTime.split(' ')[0] : null;
      // console.log('this.safePickUpDate', this.safePickUpDate);
      // console.log('this.safePickUpTime', this.safePickUpTime);
    }
    // console.log('this.details', this.details);
  }
  getTime() {
    var time = this.details.pickUpFromTime;
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM == "PM" && hours < 12) hours = hours + 12;
        if (AMPM == "AM" && hours == 12) hours = hours - 12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;

        console.log(sHours + ":" + sMinutes);
        const val = sHours + ":" + sMinutes
        this.safePickUpTime = val;
  }
  consignorDetails
  getConsignorDetailsById(id) {
    this.spinner.show();
    this.$bookingInfo.getConsignorConsigneeById(id).subscribe(
      (resp) => {
        console.log('resp', resp)
        this.consignorDetails = resp;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    )
  }

  initateFlag: string = 'CUSTOMER';
  backGround(value) {
    this.initateFlag = value;
    //this.safeReason = '';
  }

  sendOtp: any = 0;
  sendOtpRep;
  validatedOtp = false;
  Otp() {
    this.sendOtp = 0;
    this.spinner.show();
    // let contact = '';
    // if (this.type === 'wayBill') {
    //   contact = this.details.consignorPhoneNo
    // } else {
    //   contact = this.details.consignorContactNumber
    // }
    const body = {
      // "emailId": this.details,
      "mobileNumber": this.consignorDetails.mob,
      // "mobileNumber": "8527865041",
      // "sourceModule": "string"
    }
    this.openBookingService.generateOtp(body).subscribe(
      (resp: any) => {
        console.log(resp);
        this.matSnackBar.open(resp.message, "", {
          duration: 3000,
          panelClass: ["text-white", "bg-green"],
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        this.sendOtpRep = resp.data.responseData;
        this.sendOtp = 1;
        this.spinner.hide();

      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    )
  }
  validateOtp(code: string) {
    if (code && code.length === 6) {
      this.spinner.show();
      const body = {
        "code": code,
        "id": this.sendOtpRep.id,
        "mobileNumber": this.consignorDetails.mob,
      }
      this.openBookingService.validateOtp(body).subscribe(
        (resp: any) => {
          console.log(resp);
          this.spinner.hide();
          this.matSnackBar.open(resp.message, "", {
            duration: 3000,
            panelClass: ["text-white", "bg-green"],
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          this.validatedOtp = true;
        },
        (err) => {
          this.spinner.hide();
          console.log(err);
          this.validatedOtp = false;
        }
      )
    }
  }

  getReScheduleReason() {
    this.commonService.getRescheduleReason().subscribe(
      (res: any) => {
        // console.log('getReScheduleReason', res)
        this.reScheduleReason = res;
        //this.safeReason = this.reScheduleReason[0].id;
      },
      (err: any) => {
      }
    );
  }

  reSchedule() {
    console.log('date', this.safePickUpDate, this.safePickUpTime)

    if (!this.safePickUpDate || !this.safePickUpTime) {
      this.matSnackBar.open('Please fill the required field', "", {
        duration: 3000,
        panelClass: ["text-white", "bg-red"],
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      return;
    }
    // console.log('this.details', this.details)
    let userDetailString = sessionStorage.getItem("userDetails");
    let userDetails = JSON.parse(userDetailString);
    let body = {}
    this.safePickUpDate = this.datepipe.transform(this.safePickUpDate, 'yyyy-MM-dd')
    // this.safePickUpTime = this.datepipe.transform(this.safePickUpDate, 'hh:mm a')
    // console.log('safePickUpDate', this.safePickUpDate);
    // console.log('safePickUpTime', this.safePickUpTime);
    if (this.initateFlag == 'SAFEXPRESS') {
      body = {
        bookingReqIdList: this.type == 'wayBill' ? this.details.wayBillSummary.map(el => el.bookingRequestId) : undefined,
        bookingRequestId: this.type == 'preBook' ? this.details.preBookingRequestId : undefined,
        safexInitiatedReScheduleFlag: 1,
        reScheduleReasonLkpId: this.safeReason,
        pickupScheduleDate: this.dateutil.getDateFromDateTime(
          this.safePickUpDate,
          this.safePickUpTime
        ),
        userId: userDetails.userId,
        pickupFromTime:this.tConvert(this.safePickUpTime),
        pickupToTime:this.tConvert(this.safePickUpTime)
      };

    } else {
      if (!this.validatedOtp) {
        this.matSnackBar.open('Please Verify the otp first', "", {
          duration: 3000,
          panelClass: ["text-white", "bg-red"],
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        return;
      }
      body = {
        bookingReqIdList: this.type == 'wayBill' ? this.details.wayBillSummary.map(el => el.bookingRequestId) : undefined,
        bookingRequestId: this.type == 'preBook' ? this.details.preBookingRequestId : undefined,
        customerInitiatedReScheduleFlag: 1,
        otpVerifiedFlag: 1,
        pickupScheduleDate: this.dateutil.getDateFromDateTime(
          this.safePickUpDate,
          this.safePickUpTime
        ),
        userId: userDetails.userId,
        pickupFromTime:this.tConvert(this.safePickUpTime),
        pickupToTime:this.tConvert(this.safePickUpTime)
      };
    }
    console.log('bodyyyyyy', body);
    
    this.spinner.show();
    this.openBookingService.reSchedule(body, this.type).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.dialogRef.close(true);

      },
      (err: any) => {
        this.spinner.hide();
      }
    );
  }

  tConvert (time) {
    console.log('tconvert', time);
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }

}
