import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from 'src/app/app.setting';
import { DateUtilService } from '../util/date-util.service';
import { HeaderService } from '../util/header.service';
import { map } from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UgdRequestService {
  constructor(private http: HttpClient, private headerUtil: HeaderService, private dateUtil: DateUtilService) { }

  getWayBillData(waybillNumber) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/waybillNumber/${waybillNumber}`
    return this.http.get(url, { headers });
  }

   getLayingAt(waybillId) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/propeli/getDetails/bookingWaybillId/${waybillId}`
     return this.http.get(url, { headers });
  }


  getServiceOffering() {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/offerings`
    return this.http.get(url, { headers });
  }
  createResheduleReBooking(body: any) {
    let headers = this.updatedHeader();
    // headers.append('originUserType', 'propeli');
    // headers.set('originUserType', 'propeli')
    console.log('headers', headers)
    const url = `${AppSetting.API_ENDPOINT}secure/v1/reScheduleBooking/createReSchTypeRequest?requestType=RE_BOOKING`
    return this.http.post(url, body, { headers });
  }
  updateWaybillStatus(body:any) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/reScheduleBooking/updateWaybillStatus`;
    return this.http.post(url, body, { headers });
  }
  createResheduleReRouting(body: any) {
    let headers = this.updatedHeader();
    // headers.append('originUserType', 'propeli');

    const url = `${AppSetting.API_ENDPOINT}secure/v1/reScheduleBooking/createReSchTypeRequest?requestType=RE_ROUTING`
    return this.http.post(url, body, { headers });
  }
  createResheduleUgd(body: any) {
    let headers = this.updatedHeader();
    // headers.append('originUserType', 'propeli');

    const url = `${AppSetting.API_ENDPOINT}secure/v1/reScheduleBooking/createReSchTypeRequest?requestType=UGD`
    return this.http.post(url, body, { headers });
  }
  updatedHeader() {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'))
    const headerData = {
      'branchId': sessionStorage.getItem('branchId'),
      'userId': userDetails.userId,
      'authorization': userDetails.token,
      'originUserType':'propeli'
    }
    return new HttpHeaders(headerData);
  }
  // uploadDocument(body:any){
  //   const headers = this.headerUtil.getHeader();
  //   const url = `${AppSetting.API_ENDPOINT}/secure/v1/reScheduleBooking/upload`
  //   return this.http.post(url, body, { headers });
  // }
  getRescheduleReBookingData(page:any,pageSize:any,fromDate:any,toDate:any,requestType:any,requestNumber:any){
    if(requestNumber=='null'){
      const url = `${AppSetting.API_ENDPOINT}secure/v1/reScheduleBooking/fetchRequestsByRequestType?fromDate=${fromDate}&page=${page}&pageSize=${pageSize}&reqtype=${requestType}&toDate=${toDate}`;
      const headers = this.headerUtil.getHeader();
      return this.http.get(url, { headers });
    }
    if(requestType == 'RE_BOOKING'){
      const url = `${AppSetting.API_ENDPOINT}secure/v1/reScheduleBooking/fetchRequestsByRequestType?fromDate=${fromDate}&page=${page}&pageSize=${pageSize}&reqtype=${requestType}&requestNumber=${requestNumber}&toDate=${toDate}`;
      const headers = this.headerUtil.getHeader();
      return this.http.get(url, { headers }); 
    }
    if(requestType == 'RE_ROUTING'){
      const url = `${AppSetting.API_ENDPOINT}secure/v1/reScheduleBooking/fetchRequestsByRequestType?fromDate=${fromDate}&page=${page}&pageSize=${pageSize}&reqtype=${requestType}&requestNumber=${requestNumber}&toDate=${toDate}`;
      const headers = this.headerUtil.getHeader();
      return this.http.get(url, { headers }); 
    }

    if(requestType == 'UGD'){
      const url = `${AppSetting.API_ENDPOINT}secure/v1/reScheduleBooking/fetchRequestsByRequestType?fromDate=${fromDate}&page=${page}&pageSize=${pageSize}&reqtype=${requestType}&requestNumber=${requestNumber}&toDate=${toDate}`;
      const headers = this.headerUtil.getHeader();
      return this.http.get(url, { headers }); 
    }
  }

  getRescheduleReBookingData2(body) {
    const url = `${AppSetting.API_ENDPOINT}secure/v1/reScheduleBooking/getReScheduleDataByCriteria`;
    const headers = this.headerUtil.getHeader();
    return this.http.post(url, body, { headers });
  }

  uploadDocument(file: any, fileData: any) {
    let headers = this.headerUtil.getHeader();
    headers = headers.delete("Content-Type", "application/json");
    var fd = new FormData();
    fd.append("file", file);
    let params = new HttpParams();
    params = params.set("fileData", JSON.stringify(fileData));
    // const url =
    // this.baseUrl + `rebooking/upload?fileData=${JSON.stringify(fileData)}`;
    const url = `${AppSetting.API_ENDPOINT}secure/v1/reScheduleBooking/upload`;
    return this.http.post(url, fd, { headers, params });
  }
  // getRescheduleData(){
  //   const headers = this.headerUtil.getHeader();
  //   const url = `${AppSetting.API_ENDPOINT}/secure/v1/reScheduleBooking/fetchRequestsByRequestType?fromDate=2021-02-04&page=0&pageSize=10&reqtype=RE_BOOKING&toDate=2021-02-07`
  //   return this.http.get(url, { headers });
  // }
  // getRescheduleData(){
  //   const headers = this.headerUtil.getHeader();
  //   const url = `${AppSetting.API_ENDPOINT}/secure/v1/reScheduleBooking/fetchRequestsByRequestType?fromDate=2021-02-04&page=0&pageSize=10&reqtype=RE_BOOKING&toDate=2021-02-07`
  //   return this.http.get(url, { headers });
  // }
}

