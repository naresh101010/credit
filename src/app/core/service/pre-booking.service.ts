import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from 'src/app/app.setting';
import { DateUtilService } from '../util/date-util.service';
import { HeaderService } from '../util/header.service';
@Injectable({
  providedIn: 'root'
})
export class PreBookingService {

  constructor(
    private http: HttpClient, 
    private headerUtil: HeaderService, 
    private dateUtil: DateUtilService
  ) { }
  // getWaybilApiRequest(body: any, pendingFlag: boolean) {
  //   const headers = this.headerUtil.getHeader();
  //   // body.fromDate = '2020-09-01';
  //   const url = `${AppSetting.API_ENDPOINT}secure/v1/waybillApi/summaries/branch/pendingbookings?pendingFlag=${pendingFlag}`
  //   return this.http.post(url, body, { headers });
  // }
}
