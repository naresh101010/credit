import 'rxjs/add/operator/catch';
import { map } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSetting } from 'src/app/app.setting';

@Injectable({
    providedIn: 'root'
})
export class WaybillEditService {

    constructor(private http: HttpClient) { }
    branchId = JSON.parse(sessionStorage.getItem('branchId'));
    userDetails = JSON.parse(sessionStorage.getItem('userDetails'))
    headerData = {
        'branchCode': '02',
        'journeyId': '01',
        'originUserType': '03',
        'branchId': JSON.parse(sessionStorage.getItem('branchId')),
        'userId': this.userDetails.userId
    }
    getWayBillByNumber(waybillNumber){
   
        var headerData = {
            'branchCode': '02',
            'journeyId': '01',
            'originUserType': '03',
            'branchId': sessionStorage.getItem('branchId'),
            'userId': this.userDetails.userId
        }
        var headers = new HttpHeaders(headerData);
        return this.http.get(AppSetting.API_ENDPOINT + `secure/v1/waybill/waybillNumber/${waybillNumber}`, { headers: headers }).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }
    getEwayBill(fromDate, toDate) {
        
        var headerData = {
            'branchCode': '02',
            'journeyId': '01',
            'originUserType': '03',
            'branchId': sessionStorage.getItem('branchId'),
            'userId': this.userDetails.userId
        }
        var headers = new HttpHeaders(headerData);
        return this.http.get(AppSetting.API_ENDPOINT + `secure/v1/waybill/waybillByDate?fromDate=${fromDate}&toDate=${toDate}`, { headers: headers }).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }
  getLoad() {
        return this.http.get(AppSetting.API_ENDPOINT + `secure/v1/booking/lookups`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }
  getallOffering() {
        return this.http.get(AppSetting.API_ENDPOINT + `secure/v1/waybill/offerings`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }
}
