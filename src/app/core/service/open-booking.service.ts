import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from 'src/app/app.setting';
import { DateUtilService } from '../util/date-util.service';
import { HeaderService } from '../util/header.service';

@Injectable({
  providedIn: 'root'
})
export class OpenBookingService {

  constructor(
    private http: HttpClient,
    private headerUtil: HeaderService,
    private dateUtil: DateUtilService
    ) { }
  getWaybilApiRequest(body: any, pendingFlag: boolean) {
    const headers = this.headerUtil.getHeader();
    // body.fromDate = '2020-09-01';
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybillApi/summaries/branch/pendingbookings?pendingFlag=${pendingFlag}`
    return this.http.post(url, body, { headers });
  }
  getBookingRequestDetails(bookingRequestId: number) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybillApi/bookingId/${bookingRequestId}`
    return this.http.get(url, { headers });
  }
  getBookingRequestDetailsByPre(bookingRequestId: number) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/prebooking/preBookingDetail/${bookingRequestId}`
    return this.http.get(url, { headers });
  }
  forwardRequest(body: any) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/booking/forwardRequestToCentralDesk`
    return this.http.post(url, body, { headers });
  }
  cancelReason(data: any) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/booking/cancelBookingReq/${data.bookingRequestId}/${data.cancelReason}`
    return this.http.post(url, null, { headers });
  }
  getWaybillListWithStatus(body: any) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/waybillApi/summmary/bookingRequestIds`
    return this.http.post(url, body, { headers });
  }
  getStaffDetailsByStaffId(staffId: any) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/staff/${staffId}`;
    return this.http.get(url, { headers });
  }
  getStaffDocumentList(staffId: any) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/staff/document/${staffId}`;
    return this.http.get(url, { headers });
  }
  staffDocumentUpload(body) {
    let headers = this.headerUtil.getHeader();
    headers = headers.delete("Content-Type", "application/json");
    var fd = new FormData();
    fd.append("file", body.file);
    console.log('headers', headers);
    const url = `${AppSetting.API_ENDPOINT}secure/v1/staff/document/upload?lkpDocSubtypeId=${body.lkpDocSubtypeId}&lkpDocTypeId=${body.lkpDocTypeId}&staffId=${body.staffId}`
    return this.http.post(url, fd, { headers });
  }
  updateStaff(body) {
    let headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/staff/update`
    return this.http.post(url, body, { headers });
  }
  getSubType(docType){
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/staff/subtype/${docType}`;
    return this.http.get(url, { headers });
  }
  createStaff(body) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/staff/create`;
    return this.http.post(url, body, { headers });
  }
  getPreBookingRequest(body: any, pendingFlag: boolean) {
    const headers = this.headerUtil.getHeader();
    // body.fromDate = '2020-09-01';
    const url = `${AppSetting.API_ENDPOINT}secure/v1/prebooking/summaries/branch/pending-prebookings?pendingFlag=${pendingFlag}`
    return this.http.post(url, body, { headers });
  }
  getDashboardStatus() {
    const headers = this.headerUtil.getHeader();
    return this.http.get(AppSetting.API_ENDPOINT + `secure/v1/booking/summary`, { headers });
  }
  getPrebookingRquestDetailsByPreBookingId(preBookingId: number) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/prebooking/preBookingDetail/${preBookingId}`
    return this.http.get(url, { headers });
  }
  getActiveDevices() {
    // const branchid = sessionStorage.getItem('branchId');
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/devices/active-devices`
    return this.http.get(url, { headers });
  }
  getInActiveDevices() {
    const branchid = sessionStorage.getItem('branchId');
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/devices/inactive-devices`
    return this.http.get(url, { headers });
  }
  getStaffList() {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/staff/list`
    return this.http.get(url, { headers });
  }
  getActiveStaffList() {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/devices/active-devices`
    return this.http.get(url, { headers });
  }
  assignBooking(body: any) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/booking/assignBookingRequest`
    return this.http.post(url, body, { headers });
  }
  getEpaymentList(body: any) {
    let userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
    body.branchId = sessionStorage.getItem('branchId');
    // body.branchId = '47';
    // body.toDate = this.dateUtil.getFormatedDate('YYYY-MM-DD', body.toDate);
    // body.fromDate = this.dateUtil.getFormatedDate('YYYY-MM-DD', body.fromDate);
    // body.userId = userDetails.userId.toUpperCase();
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/payment/status`
    return this.http.post(url, body, { headers });
  }
  getEpaymentStatusByRecieptNumber(recieptNumber) {
    // payment/status/reciept/{recieptNumber}
    //  ;
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/payment/status/reciept/${recieptNumber}`
    return this.http.get(url, { headers });
  }
  paymentSendLink(body: any) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/payment/sendLink`
    return this.http.post(url, body, { headers });
  }
  getEpaymentStatusByWaybillId(waybillId) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/payment/status/waybill/${waybillId}`
    return this.http.get(url, { headers });
  }
  getWayBill(waybillNumber: any) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}/secure/v1/waybill/waybillNumber/${waybillNumber}`
    return this.http.get(url, { headers });
  }
  getConsignerName(consignerId: any) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/cnor-cnee/${consignerId}`
    return this.http.get(url, { headers });
  }
  reSchedule(body, type){
    console.log('body', body);
    console.log('type', type);
    const headers = this.headerUtil.getHeader();
    let url = `${AppSetting.API_ENDPOINT}secure/v1/booking/reschedule`
    if (type === 'wayBill') {
      url = `${AppSetting.API_ENDPOINT}secure/v1/waybillApi/reschedule`
      return this.http.put(url, body, { headers });
    }
    return this.http.post(url, body, { headers });
  }
  generateOtp(body) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT_AUTH}v1/otp`;
    return this.http.post(url, body, { headers });
  }
  validateOtp(body) {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT_AUTH}v1/otp/validate`;
    return this.http.post(url, body, { headers });
  }
}
