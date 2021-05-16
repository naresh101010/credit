import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { CommonService } from 'src/app/core/common.service';
import { OpenBookingService } from 'src/app/core/service/open-booking.service';
import { CancelBookingComponent } from '../cancel-booking/cancel-booking.component';
import { ForwardBookingComponent } from '../forward-booking/forward-booking.component';
import { ReschedulePickupComponent } from '../reschedule-pickup/reschedule-pickup.component';
@Component({
  selector: 'app-waybill-details',
  templateUrl: './waybill-details.component.html',
  styleUrls: ['./waybill-details.component.css']
})
export class WaybillDetailsComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService, 
    public dialog: MatDialog, 
    private openBookingService: OpenBookingService, 
    public dialogRef: MatDialogRef<WaybillDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private commonService: CommonService
    ) { }
  waybilRequestDetail: any
  type: string;
  allLookUps=[];     
  ngOnInit() {
    // console.log('this.data', this.data);
    this.getAllLookups();
    this.type = this.data.type;
    this.waybilRequestDetail = this.data.waybilRequest
    console.log('this.waybillreq', this.waybilRequestDetail);
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
    // switch (this.type) {
    //   case 'wayBill':
    //     this.waybilRequestDetailWayabill();
    //     break;
    //   case 'preBook':
    //     this.waybilRequestDetailPrebook();
    //     break;
    // }
  }
  getAllLookups() {
    this.commonService.getAllLookups().subscribe((res: any) => {
      console.log('res getalllookups', res);
      this.allLookUps = res;
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

  openResechedulePickupModal() {
    const dialog = this.dialog.open(ReschedulePickupComponent, {
      width: '40vw',
      panelClass: 'mat-dialog-responsive',
      data: { data: this.waybilRequestDetail, type: this.type }
    });
    dialog.afterClosed().subscribe((resp) => {
      if(resp) {
        this.dialogRef.close(resp);
      } else {
        this.dialogRef.close();
      }
    });
  }

  openForwardBookingModal() {
    const dialog = this.dialog.open(ForwardBookingComponent, {
      width: '30vw',
      panelClass: 'mat-dialog-responsive',
      data: { waybilRequestDetail: this.waybilRequestDetail, type: this.type }
    });
    dialog.afterClosed().subscribe((resp) => {
      this.dialogRef.close();
    });
  }

  openCancelBookingModal() {
    const dialog = this.dialog.open(CancelBookingComponent, {
      width: '30vw',
      panelClass: 'mat-dialog-responsive',
      data: { waybilRequestDetail: this.waybilRequestDetail, type: this.type }
    });
    dialog.afterClosed().subscribe((resp) => {
      this.dialogRef.close();
    });
  }
  waybilRequestDetailWayabill() {

  }
  waybilRequestDetailPrebook() {
    this.spinner.show();
    this.openBookingService.getPrebookingRquestDetailsByPreBookingId(this.data.preBookingRequestId).subscribe((resp: any) => {
      this.spinner.hide();
      this.waybilRequestDetail = resp.data.responseData.prebookingDetailList[0];
    },
      (err) => {
        this.spinner.hide();
        console.log(err);
      })
  }
  generatedWaybills() {
    let count = 0;
    if (this.waybilRequestDetail) {
      const waybills = this.waybilRequestDetail.wayBillSummary;
      if (waybills) {
        for(let waybill of waybills) {
          this.allLookUps.forEach((el) => {
            if(waybill.wayblCurrStatusLookupId){
              if (el.id == waybill.wayblCurrStatusLookupId) {
              if (el.lookupVal === 'WAYBILL GENERATED') {
                count++;
              }
            }
            }
            
          });
        }
      }
    }
    return count;
  }

}
