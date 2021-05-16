import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from 'src/app/app.setting';
import { DateUtilService } from '../util/date-util.service';
import { HeaderService } from '../util/header.service';

@Injectable({
  providedIn: 'root'
})
export class DayEndService {

  constructor(private http: HttpClient, private headerUtil: HeaderService, private dateUtil: DateUtilService) { }

  getDayEndBookingList(body: any) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/dayend/booking?bookingBranchId=${body.bookingBranchId}&dayendDate=${this.dateUtil.getFormatedDate('YYYY-MM-DD', body.dayendDate)}`
    return this.http.get(url, { headers });
  }
  getDayFinancialList(body: any) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/dayend/finance?bookingBranchId=${body.bookingBranchId}&dayendDate=${this.dateUtil.getFormatedDate('YYYY-MM-DD', body.dayendDate)}`
    return this.http.get(url, { headers });
  }
  getMissingWaybillList(body: any) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/dayend/waybills?bookingBranchId=${body.bookingBranchId}&dayendDate=${this.dateUtil.getFormatedDate('YYYY-MM-DD', body.dayendDate)}`
    return this.http.get(url, { headers });
  }

  getCustomerNameList(body:any) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/msaList`
    return this.http.post(url, body, { headers });
  }

  submitReconcilation(body) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/dayend/save/booking`
    return this.http.post(url, body, { headers });
  }
  submitInformation(body) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/dayend/save/payment`
    return this.http.post(url, body, { headers });
  }
  submitWayBill(body) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/dayend/save/waybill`
    return this.http.post(url, body, { headers });
  }

  getDayEndDate() {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/dayend/lastDayend`
    return this.http.get(url, { headers });
  }
  getDayEndStatus(date) {
    const headers = this.headerUtil.getHeader();
    const branch = sessionStorage.getItem('branchId');
    const url = `${AppSetting.API_ENDPOINT}secure/v1/dayend/status?bookingBranchId=${branch}&dayendDate=${date}`
    return this.http.get(url, { headers });
  }
}
