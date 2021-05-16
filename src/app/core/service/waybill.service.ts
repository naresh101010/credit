import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from 'src/app/app.setting';
import { DateUtilService } from '../util/date-util.service';
import { HeaderService } from '../util/header.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class WaybillService {

  constructor(private http: HttpClient, private dateUtil: DateUtilService, private headerService: HeaderService) { }
  public preBooking_tab = new BehaviorSubject(null);
  public preBooking_tabObs$ = this.preBooking_tab.asObservable();
  getWaybillInventoryBywaybilBranchid() {
    const headers = this.headerService.getHeader();
    const waybillBranchId = +sessionStorage.getItem('branchId');
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/availableInventory/${waybillBranchId}`
    return this.http.post(url, null, { headers });
  }
  viewWaybillList(body) {
    const headers = this.headerService.getHeader();
    body.fromDate = this.dateUtil.getFormatedDate('YYYY-MM-DD', body.fromDate);
    body.toDate = this.dateUtil.getFormatedDate('YYYY-MM-DD', body.toDate);
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/waybillByDate?fromDate=${body.fromDate}&toDate=${body.toDate}`;
    return this.http.get(url, { headers });
  }
  getUgdRequestList(body) {

  }
  getMyBookingList(body) {
    const headers = this.headerService.getHeader();
    body.fromDate = this.dateUtil.getFormatedDate('YYYY-MM-DD', body.fromDate);
    body.toDate = this.dateUtil.getFormatedDate('YYYY-MM-DD', body.toDate);
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/mybookings`;
    return this.http.post(url, body, { headers }).pipe(map((resp: any) => resp.data.responseData));
  }
  getWaybillBookingList(body) {
    const headers = this.headerService.getHeader();
    body.fromDate = this.dateUtil.getFormatedDate('YYYY-MM-DD', body.fromDate);
    body.toDate = this.dateUtil.getFormatedDate('YYYY-MM-DD', body.toDate);
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybillApi/summaries/branch/pendingbookings?pendingFlag=true`;
    return this.http.post(url, body, { headers }).pipe(map((resp: any) => resp.data.responseData));
  }
  searchwaybillBywybillNum(body) {
    const headers = this.headerService.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/waybillNumber/`;
    return this.http.get(url+body+'?fullDetail=true').pipe(map((resp: any) => resp.data.responseData));
  }
  getWaybillApiBookings(body) {
    const headers = this.headerService.getHeader();
    body.fromDate = this.dateUtil.getFormatedDate('YYYY-MM-DD', body.fromDate);
    body.toDate = this.dateUtil.getFormatedDate('YYYY-MM-DD', body.toDate);
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybillApi/booking/summary`;
    return this.http.post(url, body, { headers }).pipe(map((resp: any) => resp.data.responseData));
  }
  getDirectBookingList(body) {
    const headers = this.headerService.getHeader();
    body.fromDate = this.dateUtil.getFormatedDate('YYYY-MM-DD', body.fromDate);
    body.toDate = this.dateUtil.getFormatedDate('YYYY-MM-DD', body.toDate);
    const url = `${AppSetting.API_ENDPOINT}secure/v1/directBooking/waybill/view-booking`;
    return this.http.post(url, body, { headers }).pipe(map((resp: any) => resp.data.responseData));
  }
  getPreBookingList(body) {
    const headers = this.headerService.getHeader();
    body.fromDate = this.dateUtil.getFormatedDate('YYYY-MM-DD', body.fromDate);
    body.toDate = this.dateUtil.getFormatedDate('YYYY-MM-DD', body.toDate);
    const url = `${AppSetting.API_ENDPOINT}secure/v1/prebooking/summaries/branch/pending-prebookings?pendingFlag=true`;
    return this.http.post(url, body, { headers }).pipe(map((resp: any) => resp.data.responseData));
  }
  getPreBookingStatus(body) {
    const headers = this.headerService.getHeader();
    body.fromDate = this.dateUtil.getFormatedDate('YYYY-MM-DD', body.fromDate);
    body.toDate = this.dateUtil.getFormatedDate('YYYY-MM-DD', body.toDate);
    const url = `${AppSetting.API_ENDPOINT}secure/v1/prebooking/viewBookingSummary`;
    return this.http.post(url, body, { headers }).pipe(map((resp: any) => resp.data.responseData));
  }
  getWaybillDowcument(waybillId, emails) {
    // console.log('waybillId', waybillId);
    // console.log('emails', emails);
    const headers = this.headerService.getHeader();
    const params = new HttpParams()
    .set('emailId', emails)
    .set('waybillId', waybillId);
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/email?${ params.toString() }`;
    return this.http.get(url, { headers });
  }
  postSendMail(waybillIds, emails) {
    // console.log('waybillId', waybillId);
    // console.log('emails', emails);
    let body = {
      "emailIds":[...emails],
      "waybillIds":[...waybillIds]
    }
    const headers = this.headerService.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/email/bulk`;
    return this.http.post(url, body);
  }
  cancelWaybill(waybillIds) {
    // console.log('waybillId', waybillId);
    // console.log('emails', emails);
    let body = {
      "waybillIds":[waybillIds]
    }
    const headers = this.headerService.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/cancel-waybill`;
    return this.http.post(url, body);
  }
  getAllofferings() {
    const headers = this.headerService.getHeader();

      return this.http
        .get(AppSetting.API_ENDPOINT + `secure/v1/waybill/offerings`, {
          headers: headers,
        })
        .pipe(
          map((response: any) => {
            return response.data.responseData;
          })
        );
  }

  /**-- Re-assign waybill */

  reAssignWayBill(body){
    const headers = this.headerService.getHeader();

    return this.http
      .post(AppSetting.API_ENDPOINT + `secure/v1/waybill/re-assign`, body, {headers: headers})
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }

}
