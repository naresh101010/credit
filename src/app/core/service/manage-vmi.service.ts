import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from 'src/app/app.setting';
import { DateUtilService } from '../util/date-util.service';
import { HeaderService } from '../util/header.service';

@Injectable({
  providedIn: 'root'
})
export class ManageVmiService {

  constructor(private http: HttpClient, private headerUtil: HeaderService, private dateUtil: DateUtilService) { }

  getWayBillData(waybillNumber){
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/waybillNumber/${waybillNumber}?fullDetail=true`
    return this.http.get(url, { headers });
  }
  getPartNumberWithwayBillId(wayBillId){
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/managevmi/fetchPartNumberForWaybillMapping/search?waybillId=${wayBillId}`
    return this.http.get(url, { headers });
  }
  saveManage(body:any){
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/managevmi/UpdateMappedPartNumberWithInvcId`
    return this.http.post(url, body, { headers });
  }
  getPartDetail(invoiceId){
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/managevmi/fetchMappedPartNumberWithInvcId/search?bookingInvcId=${invoiceId}`
    return this.http.get(url, { headers });
  }
}
