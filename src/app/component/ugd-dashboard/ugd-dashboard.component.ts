import { Component, OnInit } from '@angular/core';
import { WaybillService } from 'src/app/core/service/waybill.service';
import { AppSetting } from '../../app.setting';
import { NavigationExtras, Router } from '@angular/router';
import { MatTableDataSource, PageEvent } from '@angular/material';
import * as moment from 'moment';
import { UgdRequestService } from 'src/app/core/service/ugd-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/common.service';
import { AppComponent } from "src/app/app.component";

@Component({
  selector: 'app-ugd-dashboard',
  templateUrl: './ugd-dashboard.component.html',
  styleUrls: ['./ugd-dashboard.component.css']
})
export class UgdDashboardComponent implements OnInit {
  // fromDate = new Date('01/11/2021');
  // toDate = new Date();
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
    private waybillService: WaybillService,
    private router: Router,
    private ugdService: UgdRequestService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService,
    private appComp: AppComponent
  ) { }

  ngOnInit() {
    // this.getUgdRequestList();
    sessionStorage.removeItem('oldWaybill');
    sessionStorage.removeItem("totalWaybill");
    sessionStorage.removeItem("waybillId");
    sessionStorage.removeItem('updatedServiceOffering');
    sessionStorage.removeItem('requestedMop');
    sessionStorage.removeItem('rebookReqNo');
    sessionStorage.removeItem('newWaybill');
    this.spinner.show()
    this.getUgdData();
    this.getLookUpType();
  }
  requestAgain(element) {
    sessionStorage.setItem('oldWaybill', JSON.stringify(element));
    let url = '/bookings-web-booking/create-rebooking-request';
    const navigationExtras: NavigationExtras = { state: { type: 'Re-Booking' } };
    this.router.navigateByUrl(url, navigationExtras)
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
    this.router.navigate(['/bookings-web-booking/ugd-start-booking']);
  }
  openUgd() {
    let url = '/bookings-web-booking/create-ugd-request';
    const navigationExtras: NavigationExtras = { state: { type: 'UGD' } };
    this.router.navigateByUrl(url, navigationExtras)
  }
  onChangeFromDate(event: any) {
    console.log(event);
    this.fromDate = event.value;
  }
  onChangeToDate(event) {
    console.log(event);
    this.toDate = event.value;
  }
  applyFilter(val) {
    this.dataSource.filter = val.trim().toUpperCase();
  }
  getUgdRequestList() {
    const body = { fromDate: this.fromDate, toDate: this.toDate };
    this.waybillService.getUgdRequestList(body);
  }
  onkeyUp(event) {
    
    // if (this.invalidDate) {
    //   this.spinner.hide();
    //   return;
    // }
   
    if(this.dataSource){
      this.dataSource.filter = this.searchReqNo.trim().toUpperCase();
     }
  }
  search() {
    if (this.invalidDate) {
      this.spinner.hide();
      return;
    }
    this.spinner.show();
    this.getUgdData();
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
    if ((!this.fromDateValue || this.fromDateValue === 'Invalid date') || (!this.toDateVal || this.toDateVal === 'Invalid date')) {
      this.appComp.showMessage('Please enter valid date', 'danger');
      this.spinner.hide();
      return;
    }
    console.log('date', moment(this.fromDate).format('YYYY-MM-DD'), this.toDate)
    this.requestType = 'UGD'
    this.requestNumber = this.reqnum ? this.reqnum : 'null'
  }
  onPagechange(event) {
    this.pageEvent = event;
    this.page = this.pageEvent.pageIndex;
    this.pageSize = this.pageEvent.pageSize;
    this.getUgdData();
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
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

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
  getUgdData() {
    this.pagiationData();
    const branch = sessionStorage.getItem('branchId');
    this.spinner.show();

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
      this.spinner.hide();
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
      // console.log('reROUTING', res)
      this.dataSource = new MatTableDataSource(res.data.responseData.response);
      this.length = res.data.responseData.totalCount
      setTimeout(() => {   
        console.log('inside timeout')                        //<<<---using ()=> syntax
        this.spinner.hide();
      }, 3000);
      // console.log('@@@@@@@', this.dataSource)
    }, (err: any) => {
      this.dataSource = undefined;

      // this.spinner.hide();
    })
  }
  fromdateValue(event) {
    console.log('event', event)
    this.fromDateValue = event.target.value;
    this.fromDateValue = moment(this.fromDateValue).format('YYYY-MM-DD');
    this.compareDate();

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