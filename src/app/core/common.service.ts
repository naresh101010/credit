import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppSetting } from "../app.setting";
import { map } from "rxjs/operators";
import { HeaderService } from "./util/header.service";
@Injectable({ providedIn: 'root' })

export class CommonService {
  steperNextFlg = true;
  settimeout: any;
  userdetails
  headerData = {
    'userId': sessionStorage.getItem('userId')
  }
  constructor(
    private http: HttpClient,
    private headerUtil: HeaderService
  ) {
    sessionStorage.removeItem('login');
  }
  getBranchLogin() {
    sessionStorage.removeItem('login');
    return JSON.parse(sessionStorage.getItem('login'));
  }
  setBranchLogin(val) {
    sessionStorage.setItem('login', JSON.stringify(val));
  }
  showMessage(message: string, type?: string) {
    let snackbar = document.getElementById("snackbar_module");
    let snack_msg = document.getElementById("snack_msg");
    snackbar.style.display = "block";
    snackbar.style.animation = "fadeIn 0.5s linear";
    snackbar.style.background = "#27AE60";
    snackbar.style.textTransform = "capitalize";
    if (type == "danger") {
      snackbar.style.background = "#ef4848";
    }
    snack_msg.innerText = message;
    this.removeToast(snackbar);
  }

  cleartimeout() {
    clearTimeout(this.settimeout);
  }

  removeToast(snackbar = null) {
    if (!snackbar) {
      snackbar = document.getElementById("snackbar_module");
    }
    this.settimeout = setTimeout(() => {
      snackbar.style.animation = "fadeOut 0.5s linear";
      setTimeout(() => {
        snackbar.style.display = "none";
      }, 300);
    }, 3500);
  }

  getAllOfferings(){
    this.userdetails = JSON.parse(sessionStorage.getItem('userDetails'));
    var headerData = this.userdetails.userId;
    var headers = new HttpHeaders(headerData);
    return this.http.get(AppSetting.API_ENDPOINT + `secure/v1/waybill/offerings`, { headers: headers }).pipe(
      map((response: any) => {
        return response.data.responseData;
      })
    );
  }
  makeid(length = 5) {
    var array = new Uint32Array(500);
    let rand_no_arr:any= window.crypto.getRandomValues(array);
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(rand_no_arr[i].toString()[0]);
    }
    return result;
  }
  getRateCardsByCriteria(body) {
    console.log('getRateCardsByCriteria', body);
    this.userdetails = JSON.parse(sessionStorage.getItem('userDetails'));
    var headerData = this.userdetails.userId;
    var headers = new HttpHeaders(headerData);
    // const url = this.baseUrl + `common/getRateCards/criteria?chargeById=${body.chargeById}&contractId=${body.contractId}&contractType=${body.contractType}&productCategoryId=${body.productCategoryId}&serviceOfferingId=${body.serviceOfferingId}`;
    return this.http.get(AppSetting.API_ENDPOINT + `secure/v1/getRateCards/criteria?chargeById=${body.chargeById}&contractId=${body.contractId}&contractType=${body.contractType}&productCategoryId=${body.productCategoryId}&serviceOfferingId=${body.serviceOfferingId}`, { headers: headers }).pipe(
      map((response: any) => {
        return response.data.responseData;
      })
    );  }
  getBranchDetailByBrancId(branchList) {
    this.userdetails = JSON.parse(sessionStorage.getItem('userDetails'));
    var headerData = this.userdetails.userId;
    var headers = new HttpHeaders(headerData);
    return this.http
      .post(
        AppSetting.API_ENDPOINT +
        `secure/v1/branchList`, branchList,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }

  getCOBranch() {
    this.userdetails = JSON.parse(sessionStorage.getItem('userDetails'));
    var headerData = this.userdetails.userId;
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/corporateBranch`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
    
  }
  getUserDetailById(id: string) {
    return this.getStaffList().pipe(map((resp: any) => {
      const response = resp.data.responseData;
      const staffList = response.assocStaffs;
      const filteredStaff = staffList.filter(staff => staff.id == id);
      console.log('filteredStaff', filteredStaff);
      if (filteredStaff && filteredStaff.length) {
        return filteredStaff[0];
      } else {
        return '';
      }
    }));
  }
  getStaffList() {
    const headers = this.headerUtil.getHeader();
    const url = `${AppSetting.API_ENDPOINT}secure/v1/staff/list`
    return this.http.get(url, { headers }).pipe(map((resp: any) => resp.data.responseData));
  }
  getAllLookups() {
    this.userdetails = JSON.parse(sessionStorage.getItem('userDetails'));
    var headerData = this.userdetails.userId;

    var headers = new HttpHeaders(headerData);
    return this.http.get(AppSetting.API_ENDPOINT + `secure/v1/booking/lookups`, { headers: headers }).pipe(
      map((response: any) => {
        return response.data.responseData;
      })
    );
  }
  getCnr_ceeById(id) {
    this.userdetails = JSON.parse(sessionStorage.getItem('userDetails'));
    // var headerData = this.userdetails.userId;
    const headers = this.headerUtil.getHeader();

    // var headers = new HttpHeaders(headerData);
    return this.http.get(AppSetting.API_ENDPOINT + `secure/v1/cnor-cnee/${id}`, { headers }).pipe(
      map((response: any) => {
        return response.data.responseData;
      })
    );
  }

  getLookUpByType(lookupType) {
    this.userdetails = JSON.parse(sessionStorage.getItem('userDetails'));
    // const branch = sessionStorage.getItem('branchId');

    var headerData = this.userdetails.userId;
    // console.log('headerData', headerData)

    // headerData['branchId'] = Number(branch);
    var headers = new HttpHeaders(headerData);
    // var headers = new HttpHeaders({'userId': this.userdetails.userId,'branchId': branch});

    console.log('headers', headers)
    return this.http.get(AppSetting.API_ENDPOINT + `secure/v1/lookup/lookupType/${lookupType}`, { headers: headerData }).pipe(
      map((response: any) => {
        return response.data.responseData;
      })
    );
    
  }

  getRescheduleReason() {
    this.userdetails = JSON.parse(sessionStorage.getItem('userDetails'));
    var headerData = this.userdetails.userId;
    var headers = new HttpHeaders(headerData);
      return this.http.get(AppSetting.API_ENDPOINT + `secure/v1/lookup/lookupType/BOOKING_RESCHEDULE_REASON`, { headers: headers }).pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }

  getAllDesignation() {
    this.userdetails = JSON.parse(sessionStorage.getItem('userDetails'));
    var headerData = this.userdetails.userId;
    var headers = new HttpHeaders(headerData);
      return this.http.get(AppSetting.API_ENDPOINT + `secure/v1/staff/designation`, { headers: headers }).pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }

  getAllVehicles() {
    this.userdetails = JSON.parse(sessionStorage.getItem('userDetails'));
    // var headerData = this.userdetails.userId;
    const headers = this.headerUtil.getHeader();

    // var headers = new HttpHeaders(headerData);
    return this.http.get(AppSetting.API_ENDPOINT + `secure/v1/waybill/associates/vehicles`, { headers }).pipe(
      map((response: any) => {
        return response.data.responseData;
      })
    );
    
  }
  getContractDetails(contractType, code) {
    this.userdetails = JSON.parse(sessionStorage.getItem('userDetails'));
    var headerData = this.userdetails.userId;
    const branch = sessionStorage.getItem('branchId');

    var headers = new HttpHeaders(headerData);
    return this.http.get(AppSetting.API_ENDPOINT + `secure/v1/contract/${contractType}?brnchId=${branch}&cntrCode=${code}
    `, { headers: headers }).pipe(
      map((response: any) => {
        return response.data.responseData;
      })
    );
    
  }

  getOfferingByContract(contractType, id) {
    this.userdetails = JSON.parse(sessionStorage.getItem('userDetails'));
    var headerData = this.userdetails.userId;
    // const branch = sessionStorage.getItem('branchId');

    var headers = new HttpHeaders(headerData);
    return this.http.get(AppSetting.API_ENDPOINT + `secure/v1/waybill/offerings/${contractType}/contract/${id}`, { headers: headers }).pipe(
      map((response: any) => {
        return response.data.responseData;
      })
    );
    
  }

  /*-- Get Consigner and Consignee data list -- */
  getCnor_cneeList(list){
    this.userdetails = JSON.parse(sessionStorage.getItem('userDetails'));
    var headerData = this.userdetails.userId;
    var headers = new HttpHeaders(headerData);
    return this.http
      .post(
        AppSetting.API_ENDPOINT +
        `secure/v1/cnor-cnee/search/list`, list,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }

  /**--  Get User Profile Details -- */
  getUserProfileData(list){
    // this.userdetails = JSON.parse(sessionStorage.getItem('userDetails'));
    // var headerData = this.userdetails.userId;
    // var headers = new HttpHeaders(headerData);
    const headers = this.headerUtil.getHeader();
    return this.http
      .post(
        AppSetting.API_ENDPOINT +
        `secure/v1/user/userlist`, list,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }

  
}