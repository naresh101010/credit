import { Component, OnInit } from '@angular/core';
import { AppSetting } from '../../app.setting';
import { NavigationExtras, Router } from '@angular/router';
import * as moment from 'moment';
import { UgdRequestService } from 'src/app/core/service/ugd-request.service';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/common.service';
import { AppComponent } from "src/app/app.component";

@Component({
  selector: 'app-re-routing-dashboard',
  templateUrl: './re-routing-dashboard.component.html',
  styleUrls: ['./re-routing-dashboard.component.css']
})
export class ReRoutingDashboardComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  page = 0;
  pageSize = 10;
  fromDate: any;
  toDate: any;
  requestType: string;
  reqnum: any;
  requestNumber: any;
  fromDateValue: any;
  toDateVal: any;
  // MatPaginator Inputs
  length = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;
  pageNumber = 0;
  curDate = new Date()
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
    this.getReroutingData();
    this.getLookUpType();
  }
  onPagechange(event) {
    this.pageEvent = event;
    this.page = this.pageEvent.pageIndex;
    this.pageSize = this.pageEvent.pageSize;
    this.getReroutingData();
  }

  bookingFlag: any = 3;
  createWaybill(element) {
    AppSetting.bookingFlag = this.bookingFlag;
    sessionStorage.setItem("waybillId", element.waybillId);
    sessionStorage.setItem("oldWaybillId", element.reScheduleBookingDetailsDTO ? element.reScheduleBookingDetailsDTO.oldBookingWaybillId : 'NA');
    sessionStorage.setItem("totalWaybill", element.reScheduleBookingDetailsDTO.reSchedulePkgCount);
    sessionStorage.setItem("updatedServiceOffering", element.reScheduleBookingDetailsDTO.serviceOfferingId);
    sessionStorage.setItem("requestedMop", element.reScheduleBookingDetailsDTO.lkpBkgModeOfPaymentId);
    sessionStorage.setItem('rebookReqNo', element.reScheduleDataDTO.reScheduleReqNum);
    sessionStorage.setItem('pinId', element.reScheduleBookingDetailsDTO.destPincodeId);
    if (element.reScheduleBookingDetailsDTO.newBookingWaybillId && element.reScheduleBookingDetailsDTO.newBookingWaybillId !== null) {
      if (element.reScheduleBookingDetailsDTO.newBookingWaybillId !== element.reScheduleBookingDetailsDTO.oldBookingWaybillId) {
        sessionStorage.setItem('newWaybill', element.reScheduleBookingDetailsDTO.newBookingWaybillId)
      }
    }
    this.router.navigate(['/bookings-web-booking/reRouting-start-booking']);
  }
  openReRouting() {
    let url = '/bookings-web-booking/create-rerouting-request';
    const navigationExtras: NavigationExtras = { state: { type: 'Re-Routing' } };
    this.router.navigateByUrl(url, navigationExtras)
  }
  requestAgain(element) {
    sessionStorage.setItem('oldWaybill', JSON.stringify(element));
    let url = '/bookings-web-booking/create-rebooking-request';
    const navigationExtras: NavigationExtras = { state: { type: 'Re-Booking' } };
    this.router.navigateByUrl(url, navigationExtras)
    // const body = {
    //   ...element,
    //   id: element.reScheduleDataDTO.id,
    //   newWaybillId: element.waybillId,
    //   oldWaybillId: element.waybillId
    // }
    // console.log('body', body);
  }
  onkeyUp(event) {
    // this.reqnum = event.target.value;
    // console.log('this..', this.reqnum)
    // if (this.reqnum.length > 2) {
    //   this.getReroutingData();
    // } else if (this.reqnum.length === 0) {
    // this.reqnum = undefined;
    // if (this.invalidDate) {
    //   return;
    // }
    if(this.dataSource){
      this.dataSource.filter = this.searchReqNo.trim().toUpperCase();
     }
  }
  pagiationData() {
    // this.page = 0;
    // this.pageSize = 20;
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
    this.requestType = 'RE_ROUTING'
    this.requestNumber = this.reqnum ? this.reqnum : 'null'
  }
  raisedlookUp = [];
  raiseLayingAt;
  getLookUpType() {
    this.commonService.getLookUpByType('LKP_WAYBILL_RESCH_BRANCH_LOC_REQ_TYPE').subscribe((res: any) => {
      console.log('res getLookUpType', res)
      this.raisedlookUp = res;
      // this.raiseLayingAt
    }, (err: any) => {
      this.raisedlookUp = [];
    })
  }
  invalidDate = false;
  compareDate() {
    console.log('inside compare date from', this.fromDateValue);
    console.log('inside compare to from', this.toDateVal);
    this.fromDateValue = moment(this.fromDateValue).format('YYYY-MM-DD');
    this.toDateVal = moment(this.toDateVal).format('YYYY-MM-DD');

    if (this.fromDateValue > this.toDateVal) {
      this.invalidDate = true;
    } else {
      this.invalidDate = false;
    }
  }
  getReroutingData() {
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
    if ((!body.fromDate || body.fromDate === 'Invalid date') || (!body.toDate || body.toDate === 'Invalid date')) {
      this.appComp.showMessage('Please enter valid date', 'danger');
      return;
    }
    if (!body.oldWaybillNumber || body.oldWaybillNumber === '' || body.oldWaybillNumber === 'null') {
      delete body.oldWaybillNumber
    }
    if (!body.raisedId || body.raisedId === '') {
      delete body.raisedId
    }
    this.spinner.show();

    this.ugdService.getRescheduleReBookingData2(body).subscribe((res: any) => {
      console.log('reROUTING', res)
      this.dataSource = new MatTableDataSource(res.data.responseData.response);
      this.length = res.data.responseData.totalCount
      this.spinner.hide();
      // console.log('@@@@@@@', this.dataSource)
    }, (err: any) => {
      this.dataSource = undefined;
      this.spinner.hide();
    })
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  fromdateValue(event) {
    console.log('event', event)
    this.fromDateValue = event.target.value;
    this.fromDateValue = moment(this.fromDateValue).format('YYYY-MM-DD');
    this.compareDate();
  }
  search() {
    if (this.invalidDate) {
      return;
    }
    // this.spinner.show();
    this.getReroutingData();
  }
  toDateValue(event) {
    console.log('event1', event)
    this.toDateVal = event.target.value;
    this.toDateVal = moment(this.toDateVal).format('YYYY-MM-DD');
    this.compareDate();

    // this.pagiationData();
    // this.ugdService.getRescheduleReBookingData(this.page, this.pageSize, this.fromDateValue, this.toDateVal, this.requestType, this.requestNumber).subscribe((res: any) => {
    //   console.log('reROUTING', res)
    //   this.dataSource = res.data.responseData.response;
    //   console.log('@@@@@@@', this.dataSource)
    // }, (err: any) => {
    //   this.dataSource = undefined;
    // })
    // this.toDate = event.target.value;
  }
  displayedColumns: string[] = ['request', 'waybill', 'pick', 'booking', 'destination', 'sfx', 'customer', 'location', 'created', 'status', 'laying'];


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