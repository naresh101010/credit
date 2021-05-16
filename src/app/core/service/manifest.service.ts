import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from 'src/app/app.setting';
import { DateUtilService } from '../util/date-util.service';
import { HeaderService } from '../util/header.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ManifestService {

  constructor(private http: HttpClient, private headerUtil: HeaderService, private dateUtil: DateUtilService) { }

  getAllPendingManifestByUserId() {
    const headers = this.headerUtil.getHeader();
    // const userDetails = JSON.parse(sessionStorage.getItem('userDetails'))
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/manifest/pendingManifests`
    return this.http.get(url, { headers });
  }
  getManifestByserviceOfferingAndDate(body) {
    body.toDate = this.dateUtil.getFormatedDate('YYYY-MM-DD', body.toDate);
    body.fromDate = this.dateUtil.getFormatedDate('YYYY-MM-DD', body.fromDate);
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/manifest/manifestByServiceOfferAndDate`;
    return this.http.post(url, body, { headers });
  }
  getManfestDetailsById(manifestId: any) {
    const headers = this.headerUtil.getHeader();
    let params = new HttpParams();
    params = params.append('fullDetail','true' )
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/manifest/${manifestId}?${params}`
    return this.http.get(url, { headers });
  }
  getVehicleListByuserId() {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/associates/vehicles`
    return this.http.get(url, { headers });
  }
  confirmManifest(id) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/manifest/confirm?manifestId=${id}`
    return this.http.get(url, { headers });
  }
  getHubname(hubName){
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/contract/hub/${hubName}`
    return this.http.get(url, { headers });
  }

  getHubListByBranchId(sourchBranchId) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/booking/branches/${sourchBranchId}/hub-list`
    return this.http.get(url, { headers });
  }
  extendManifest(toBranchId, manifestId){
    // let toBranchId = JSON.parse(sessionStorage.getItem('tobranchId'))
    // let manifestId = JSON.parse(sessionStorage.getItem('manifestId'))
    const headers = this.headerUtil.getHeader();
    let params = new HttpParams();
    params = params.append('toBranchId',toBranchId );
    params = params.append('manifestId',manifestId )
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/manifest/extend?${params}`
    return this.http.get(url, { headers });
  }
  finalizemanifest(manifestId){
    // let manifestId = JSON.parse(sessionStorage.getItem('manifestId'))
    const headers = this.headerUtil.getHeader();
    let params = new HttpParams();
    params = params.append('manifestId',manifestId )
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/manifest/finalize?${params}`
    return this.http.get(url, { headers });
  }
  getByWayBillNumber(wayBillNumber){
    wayBillNumber = wayBillNumber.toUpperCase();
    const headers = this.headerUtil.getHeader();
    let params = new HttpParams();
    params = params.append('fullDetail','true' )
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/waybillNumber/${wayBillNumber}?${params}`
    return this.http.get(url, { headers });
  }

  getByWayBillNumberDetails(wayBillNumber){
    wayBillNumber = wayBillNumber.toUpperCase();
    const headers = this.headerUtil.getHeader();
    let params = new HttpParams();
    params = params.append('fullDetail','false' )
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/waybillNumber/${wayBillNumber}?${params}`
    return this.http.get(url, { headers });
  }
  updateManifest(body:any){
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/manifest`
    return this.http.post(url, body, { headers });
  }
  getBranchByUserId(){
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/branches/associates`
    return this.http.get(url, { headers });
  }
  createManifest(body:any){
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/manifest`
    return this.http.post(url, body, { headers });
  }
  scanPackages(body:any){
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/manifest/scan-save-packages`
    return this.http.post(url, body, { headers }); 
  }
  getConsignerName(consignerId: any) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/cnor-cnee/${consignerId}`
    return this.http.get(url, { headers });
  }
  getConsilidateDataByManifestId(manifestId) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/manifest/consolidations/${manifestId}`
    return this.http.get(url, { headers }); 
  }
  consilidateDataByManifestId(manifestId) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/manifest/generate/consolidated-ewaybills/${manifestId}`
    return this.http.get(url, { headers })
    // .pipe(catchError(err => {
    //   if (err.error.errors && err.error.errors.error.length >= 0) {
    //     const code = err.error.errors.error[0].code;
    //     if (code === '001') {
    //       return of('skip');
    //     } else {
    //       throw new Error(err);
    //     }
    //   } else {
    //     throw new Error(err);
    //   }
    // }));
  }
  saveAndScanPackages(body) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/manifest/scan-save-packages`
    return this.http.post(url, body, { headers }); 
  }
  getRemainingPackages(waybillId) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/manifest/waybills/${waybillId}/remaining-packages`
    return this.http.get(url, { headers }).pipe(map((resp: any) => resp.data.responseData));
  }
  generateQrCode(str: string) {
    const headers = this.headerUtil.getHeader();
    const params = new HttpParams().set('ewbConsolidationNumber', str);
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybill/manifest/generate/nic/qr-code?${ params.toString() }`;
    return this.http.get(url, { headers }).pipe(map((resp: any) => resp.data.responseData));
  }

  
  /**  To share/send manifest report on email  */
  sendManifestEmail(manifestId,emailId) {
    const headers = this.headerUtil.getHeader();
    var params = new HttpParams();
    params = params.set('manifestId',manifestId);
    params = params.set('emailId',emailId)

      return this.http
        .get(AppSetting.API_ENDPOINT + `secure/v1/waybill/manifest/email`, {
          headers: headers,
          params:params
      });
  }

  /** To download Manifest-Report Pdf */
  downloadManifestReport(manifestId) {
    const headers = this.headerUtil.getHeader();
    var params = new HttpParams();
    params = params.set('manifestId',manifestId);

      return this.http
        .get(AppSetting.API_ENDPOINT + `secure/v1/waybill/manifest/report/download`, {
          headers: headers,
          params:params,
          responseType: 'blob'
      });
  }

}
