import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { OpenBookingService } from 'src/app/core/service/open-booking.service';
import { SalesDashboardService } from 'src/app/core/service/sales-dashboard.service';
import { WaybillService } from 'src/app/core/service/waybill.service';

@Component({
  selector: 'app-assign-booking',
  templateUrl: './assign-booking.component.html',
  styleUrls: ['./assign-booking.component.css']
})
export class AssignBookingComponent implements OnInit {

  constructor(
    private openBookingService: OpenBookingService, 
    @Inject(MAT_DIALOG_DATA) public data, 
    private dialogRef: MatDialogRef<AssignBookingComponent>, 
    private spinner: NgxSpinnerService,
    private salesDashboardService: SalesDashboardService,
    private waybillService : WaybillService
    ) { }
  staffList = [];
  activeDevices = [];
  activeDeviceCount = 0
  type = '';
  searchModel = '';
  bookingData : any;
  bookingUserType = [];
  ngOnInit() {
    console.log('this.data', this.data);
    this.getBookingSummary();
    this.type = this.data.type;
    this.bookingData = this.data.preBooking;
    this.bookingUserType =  this.data.bookingUserTypes;
    this.spinner.show();
    // this.getActiveStaffList()
  }

  getActiveDevices() {
    this.openBookingService.getActiveDevices().subscribe((resp: any) => {
      console.log(resp);
      this.activeDevices = resp.data.responseData.activeDeviceList;
      this.activeDeviceCount = resp.data.responseData.activeDeviceCount
      // this.staffList = this.staffList.filter(staff => {
      //   return this.activeDevices.some(device => device.userId == staff.id);
      // });
      this.spinner.hide();

    }, (err) => {
      this.spinner.hide();

      console.log(err);
    })
  }
  getDeviceId(userId: any) {
    const filtered = this.activeDevices.filter(device => device.userId == userId);
    if (filtered.length > 0) {
      return filtered[0].deviceId;
    }
    return null;
  }
  getActiveStaffList() {
    this.openBookingService.getActiveStaffList().subscribe((resp: any) => {
      console.log(resp,'activestafflist');
      this.staffList = resp.data.responseData.activeDeviceList;
      this.activeDeviceCount = resp.data.responseData.activeDeviceCount;
      this.spinner.hide();
      // this.getActiveDevices();
    }, (err) => {
      console.log(err);
      this.spinner.hide();
    })
  }
  getFullName(staff: any) {
    return `${staff.staffFname} ${staff.staffMname || ''} ${staff.staffLname}`;
  }
  assign(staff) {
    console.log('selected staff',staff)
    
    if(this.bookingData.waybillId){
      const body = {
        // "bookingReqId": rqstId,
        "userId": staff.userId,
        "userType": "PICKUP-PERSON",
        "waybillId": this.bookingData.waybillId
      }
      this.spinner.show();
      this.waybillService.reAssignWayBill(body).subscribe(res => {
       
        this.spinner.hide();
        this.dialogRef.close({
          data: { status: "success" }
        });
      }, (err) => {
        this.spinner.hide();
      });

    } else {
    

    let assocObj = this.bookingUserType.find(x => x.lookupVal == 'PICKUP-PERSON');
      console.log('assocObj',assocObj);
     if(assocObj) {

      const body = {
        "bookingReqId": this.bookingData.preBookingRequestId,
        "pickupUserId": staff.userId,
        "lkpPickupUserTypeId": assocObj.id,
      }
      console.log('body', body);
      this.spinner.show();
      this.openBookingService.assignBooking(body).subscribe(
        (resp) => {
          this.spinner.hide();
              this.dialogRef.close({
                data: { status: "success" }
              });
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
      });
    } 

    }
  }


  filter(val: string) {
    console.log(val);
  }
  bookingSummary: any = [];
  getBookingSummary() {
    this.spinner.show();
    this.salesDashboardService.getBookingSummary().subscribe((res: any) => {
      console.log('getBookingSummaryyyyyyyyyyyyyyyyyy', res);
      this.bookingSummary = res.data.responseData;
      this.getActiveStaffList();
    }, (err: any) => {
      console.log(err);
      this.spinner.hide();
    })
  }
  getAssignedBookingCount(id: any) {
    if (!id) {
      return;
    }
    const nameData = this.bookingSummary.filter((ref) => ref.userId === id);
    let name = "0";
    if (nameData[0]) {
      name = nameData[0].assignedBookingCount;
    }
    return name;
  }

  getOpenBookingCount(id: any) {
    if (!id) {
      return;
    }
    const nameData = this.bookingSummary.filter((ref) => ref.userId === id);
    let name = 0;
    if (nameData[0]) {
      name = (+nameData[0].assignedBookingCount - (+nameData[0].openBookingCount));
    }
    return name;
  }
}
