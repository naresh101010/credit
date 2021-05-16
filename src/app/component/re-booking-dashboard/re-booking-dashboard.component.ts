import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AppSetting } from '../../app.setting';
import { UgdRequestService } from 'src/app/core/service/ugd-request.service';
import { MatTableDataSource, PageEvent } from '@angular/material';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/common.service';
import { AppComponent } from "src/app/app.component";

@Component({
  selector: 'app-re-booking-dashboard',
  templateUrl: './re-booking-dashboard.component.html',
  styleUrls: ['./re-booking-dashboard.component.css']
})
export class ReBookingDashboardComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  page = 0;
  pageSize = 10;
  fromDate: any;
  toDate: any;
  requestType: string;
  displayedColumns: string[] = ['request', 'waybill', 'pick', 'booking', 'destination', 'sfx', 'customer', 'location', 'created', 'status', 'laying'];
  reqnum: any;
  requestNumber: any;
  fromDateValue: any;
  toDateVal: any;
  curDate = new Date()
  // MatPaginator Inputs
  length = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;
  pageNumber = 0;
  searchReqNo = '';
  constructor(
    private router: Router,
    private ugdService: UgdRequestService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService,
    private appComp: AppComponent
  ) { }

  ngOnInit() {
    sessionStorage.removeItem('oldWaybill');
    sessionStorage.removeItem("totalWaybill");
    sessionStorage.removeItem("waybillId");
    sessionStorage.removeItem('updatedServiceOffering');
    sessionStorage.removeItem('requestedMop');
    sessionStorage.removeItem('rebookReqNo');
    sessionStorage.removeItem('newWaybill');
    this.getRebookinData();
    this.getLookUpType();
  }

  raisedlookUp = [];
  raiseLayingAt;
  getLookUpType() {
    this.commonService.getLookUpByType('LKP_WAYBILL_RESCH_BRANCH_LOC_REQ_TYPE').subscribe((res: any) => {
      console.log('res getLookUpType', res)
      this.raisedlookUp = res;
    }, (err: any) => {
      this.raisedlookUp = [];
    })
  }

  bookingFlag: any = 0;
  createWaybill(element) {
    console.log('elemnt', element);
    AppSetting.bookingFlag = this.bookingFlag;
    sessionStorage.setItem("waybillId", element.waybillId);
    sessionStorage.setItem("oldWaybillId", element.reScheduleBookingDetailsDTO ? element.reScheduleBookingDetailsDTO.oldBookingWaybillId : 'NA');
    sessionStorage.setItem("totalWaybill", element.reScheduleBookingDetailsDTO.reSchedulePkgCount);
    sessionStorage.setItem("updatedServiceOffering", element.reScheduleBookingDetailsDTO.serviceOfferingId);
    sessionStorage.setItem("requestedMop", element.reScheduleBookingDetailsDTO.lkpBkgModeOfPaymentId);
    sessionStorage.setItem('rebookReqNo', element.reScheduleDataDTO.reScheduleReqNum);
    if (element.reScheduleBookingDetailsDTO.newBookingWaybillId && element.reScheduleBookingDetailsDTO.newBookingWaybillId !== null) {
        if (element.reScheduleBookingDetailsDTO.newBookingWaybillId !== element.reScheduleBookingDetailsDTO.oldBookingWaybillId) {
          sessionStorage.setItem('newWaybill', element.reScheduleBookingDetailsDTO.newBookingWaybillId)
        }
    }
    this.router.navigate(['/bookings-web-booking/create-start-booking']);
  }

  openReBooking() {
    let url = '/bookings-web-booking/create-rebooking-request';
    const navigationExtras: NavigationExtras = { state: { type: 'Re-Booking' } };
    this.router.navigateByUrl(url, navigationExtras)
  }
  onkeyUp(event) {
  
    // if (this.invalidDate) {
    //   return;
    // }
  
   if(this.dataSource){
    this.dataSource.filter = this.searchReqNo.trim().toUpperCase();
   }
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  search() {
    if (this.invalidDate) {
      return;
    }
    // this.spinner.show();
    this.getRebookinData();
  }
  pagiationData() {
    // this.page = 0;
    // this.pageSize = 10;
    this.toDate = new Date();
    this.toDate = moment(this.toDate).format('YYYY-MM-DD');
    // this.fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    this.fromDate = new Date()
    this.fromDate = moment(this.fromDate).format('YYYY-MM-DD');
    if (!this.fromDateValue) {
      this.fromDateValue = this.fromDate;
    }
    if (!this.toDateVal) {
      this.toDateVal = this.toDate;
    }
    this.fromDateValue = moment(this.fromDateValue).format('YYYY-MM-DD');
    this.toDateVal = moment(this.toDateVal).format('YYYY-MM-DD');
    console.log('date', moment(this.fromDate).format('YYYY-MM-DD'), this.toDate)
    this.requestType = 'RE_BOOKING'
    this.requestNumber = this.reqnum ? this.reqnum : 'null'
  }

  getRebookinData() {
    this.pagiationData();
    const branch = sessionStorage.getItem('branchId');

    const body = {
      page: this.page,
      pageSize: this.pageSize,
      raisedId: this.raiseLayingAt,
      reqtype: this.requestType,
      oldWaybillNumber: this.searchReqNo,
      toDate: this.toDateVal,
      fromDate: this.fromDateValue,
      branchId: Number(branch)
    }
    console.log('body', body);
    if ((!body.fromDate || body.fromDate === 'Invalid date')||(!body.toDate || body.toDate === 'Invalid date')) {
      this.appComp.showMessage('Please enter valid date', 'danger');
      return;
    }
    // if (body.oldWaybillNumber === '') {

    // }
    if (!body.oldWaybillNumber || body.oldWaybillNumber === '' || body.oldWaybillNumber === 'null') {
      delete body.oldWaybillNumber
    }
    if (!body.raisedId || body.raisedId === '') {
      delete body.raisedId
    }
    this.spinner.show();

    this.ugdService.getRescheduleReBookingData2(body).subscribe((res: any) => {
      // console.log('rebooking', res)
      this.dataSource = new MatTableDataSource(res.data.responseData.response);
      this.length = res.data.responseData.totalCount;
      // console.log('@@@@@@@', this.dataSource)
      this.spinner.hide();
    }, (err: any) => {
      this.dataSource = undefined;
      this.length = 0;
      this.spinner.hide();
    })
  }
  onPagechange(event) {
    this.pageEvent = event;
    this.page = this.pageEvent.pageIndex;
    this.pageSize = this.pageEvent.pageSize;
    this.getRebookinData();
  }
  fromdateValue(event) {
    // console.log('event', event)
    this.fromDateValue = event.target.value;
    this.fromDateValue = moment(this.fromDateValue).format('YYYY-MM-DD');
    this.compareDate();
  }
  invalidDate = false;
  toDateValue(event) {
    // console.log('event1', event)
    this.toDateVal = event.target.value;
    this.toDateVal = moment(this.toDateVal).format('YYYY-MM-DD');
    this.compareDate();
  }
  compareDate() {
    console.log('inside compare date from', this.fromDateValue);
    console.log('inside compare to from', this.toDateVal);
    if (this.fromDateValue > this.toDateVal) {
      this.invalidDate = true;
    } else {
      this.invalidDate = false;
    }
  }
  requestAgain(element) {
    sessionStorage.setItem('oldWaybill', JSON.stringify(element));
    let url = '/bookings-web-booking/create-rebooking-request';
    const navigationExtras: NavigationExtras = { state: { type: 'Re-Booking' } };
    this.router.navigateByUrl(url, navigationExtras)
  }
}

export interface PeriodicElement {
  request: number;
  waybill: number;
  pick: string;
  booking: string;
  destination: string;
  sfx: string;
  customer: string;
  location: string;
  created: string;
  status: string;
  laying: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { request: 12345, waybill: 12345, pick: '31/11/2020', booking: 'Del 10', destination: 'Del 12', sfx: 'SFX123', customer: 'TATA', location: 'Delhi', created: 'BranchCode', status: 'PENDING', laying: '' },
  { request: 12345, waybill: 12345, pick: '31/11/2020', booking: 'Del 10', destination: 'Del 12', sfx: 'SFX123', customer: 'TATA', location: 'Delhi', created: 'BranchCode', status: 'REJECTED', laying: '' },
  { request: 12345, waybill: 12345, pick: '31/11/2020', booking: 'Del 10', destination: 'Del 12', sfx: 'SFX123', customer: 'TATA', location: 'Delhi', created: 'BranchCode', status: 'APPROVED', laying: '' },
  { request: 12345, waybill: 12345, pick: '31/11/2020', booking: 'Del 10', destination: 'Del 12', sfx: 'SFX123', customer: 'TATA', location: 'Delhi', created: 'BranchCode', status: 'PENDING', laying: '' },
];