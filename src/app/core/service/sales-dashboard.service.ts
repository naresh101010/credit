import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from 'src/app/app.setting';
import { HeaderService } from '../util/header.service';

@Injectable({
  providedIn: 'root'
})
export class SalesDashboardService {

  constructor(private http: HttpClient, private headerUtil: HeaderService) { }
  getSalesBookingSummary(body) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/dashboard/booking-summary`
    return this.http.post(url, body, { headers });
  }
  getSalesDashboard(body) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/dashboard/sales`
    return this.http.post(url, body, { headers });
  }
  getSalesUsers(body) {
    delete body.userId
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/dashboard/sales/users`
    return this.http.post(url, body, { headers });
  }
  getBookingSummary(){
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/booking/summary/users`
    return this.http.get(url, { headers });
  }

  getTotalOutstandingAmt(body) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/totalOutstndgAmount`
    return this.http.post(url, body, { headers });
  }
}
