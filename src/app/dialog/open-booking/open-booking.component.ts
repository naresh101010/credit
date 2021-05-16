import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { CommonService } from 'src/app/core/common.service';
import { BookingInformationService } from 'src/app/core/service/booking-information.service';
import { OpenBookingService } from 'src/app/core/service/open-booking.service';
import { CancelBookingComponent } from '../cancel-booking/cancel-booking.component';
import { ForwardBookingComponent } from '../forward-booking/forward-booking.component';
import { ReschedulePickupComponent } from '../reschedule-pickup/reschedule-pickup.component';

@Component({
  selector: 'app-open-booking',
  templateUrl: './open-booking.component.html',
  styleUrls: ['./open-booking.component.css']
})
export class OpenBookingComponent implements OnInit {
  customerName = ''
  statusObj;
  isClosed:boolean = false;
  constructor(
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private openBookingService: OpenBookingService,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<OpenBookingComponent>, 
    private $bookingInfo: BookingInformationService,
    private commonService: CommonService
    ) { }
  waybilRequestDetail: any
  type: string;
  ngOnInit() {
    console.log('this.data', this.data);
    this.getAllLookups();
    this.type = this.data.type;
    this.customerName = this.data.waybilRequest.msaName;
    this.data = this.data.waybilRequest
    if (this.data) {
      if (this.data.consigneeId) {
        this.getConsigneeDetailsById(this.data.consigneeId);
      }
      if (this.data.consignorId) {
        this.getConsignorDetailsById(this.data.consignorId);
      }
      
    }
    // this.spinner.show();
    // this.openBookingService.getBookingRequestDetails(this.data.waybilRequest.wayBillSummary[0].bookingRequestId).subscribe(
    //   (resp: any) => {
    //     this.spinner.show();
    //     console.log(resp);
    //     this.waybilRequestDetail = resp.data;
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
    console.log('this.data', this.data);
    switch (this.type) {
      case 'wayBill':
        this.waybilRequestDetailWayabill();
        break;
      case 'preBook':
        this.waybilRequestDetailPrebook();
        break;
      case 'dayend':
        this.waybilRequestDetailPrebook();
        break;
    }
  }

  openResechedulePickupModal() {
    if(this.statusObj){
      console.log(this.statusObj.lookupVal,'this.statusObj.lookupVal')
      if(JSON.stringify(this.statusObj.lookupVal).includes('CALCULATED')){
        return ;
      }
    }
    // this.isClosed = true;
    const dialog = this.dialog.open(ReschedulePickupComponent, {
      width: '72rem',
      panelClass: 'mat-dialog-responsive',
      data: {data: this.data, type: this.type}
    });
    dialog.afterClosed().subscribe((resp) => {
      this.dialogRef.close(resp);
    })
  }

  openForwardBookingModal() {
    const dialog = this.dialog.open(ForwardBookingComponent, {
      width: '30vw',
      panelClass: 'mat-dialog-responsive',
      data: { waybilRequestDetail: this.waybilRequestDetail, type: this.type }
    });
    dialog.afterClosed().subscribe((resp) => {
      this.dialogRef.close(resp);
    })
  }

  consignorDetails = {}
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
  consigneeDetails = {};
  getConsigneeDetailsById(id) {
    this.spinner.show();
    this.$bookingInfo.getConsignorConsigneeById(id).subscribe(
      (resp) => {
        console.log('resp', resp)
        this.consigneeDetails = resp;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    )
  }


  openCancelBookingModal() {
    if(this.statusObj){
      console.log(this.statusObj.lookupVal,'this.statusObj.lookupVal')
      if(JSON.stringify(this.statusObj.lookupVal).includes('CALCULATED')){
        return ;
      }
    }
    const data = {action: 'cancel', data: this.waybilRequestDetail};
    this.dialogRef.close(data);
    // this.dialog.open(CancelBookingComponent, {
    //   width: '30vw',
    //   panelClass: 'mat-dialog-responsive',
    //   data: { waybilRequestDetail: this.waybilRequestDetail }
    // });
  }
  waybilRequestDetailWayabill() {

  }
  waybilRequestDetailPrebook() {
    console.log('this.data', this.data);
    this.spinner.show();
    let reqId = this.data.preBookingRequestId
    if (!reqId) {
      reqId = this.data.bookingReqId
    }
    this.openBookingService.getPrebookingRquestDetailsByPreBookingId(reqId).subscribe((resp: any) => {
      this.spinner.hide();
      this.waybilRequestDetail = resp.data.responseData.prebookingDetailList[0];
    },
      (err) => {
        this.spinner.hide();
        console.log(err);
      })
  }
  allLookUps = []
  getAllLookups() {
    this.commonService.getAllLookups().subscribe((res: any) => {
      console.log('res getalllookups', res);
      this.allLookUps = res;
      this.statusObj = this.allLookUps.find(elem => elem.id === this.data.bookingStatusLkpId);
      if(this.statusObj){

      }
    }, (err: any) => {

    })
  }
  refType(id: any) {
    if (!id) {
      return;
    }
    const nameData = this.allLookUps.filter((ref) => ref.id === id);
    let name = "";
    if (nameData[0]) {
      name = nameData[0].lookupVal;
    }
    return name;
  }
  isDisabled = false;
  getStatus() {
    if (this.data) {
      const status = this.refType(this.data.bookingStatusLkpId);
      console.log('status', status);
      if ((status && (status !== 'BOOKING CREATED') || !status)) {
        this.isDisabled = true;
        return true
      }
    }
    this.isDisabled = false;
    return false
  }
}
