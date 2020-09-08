import { Injectable, HostListener } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppSetting } from "../../app.setting";
import { BehaviorSubject, Subject } from "rxjs";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import SimpleCrypto from "simple-crypto-js";
import { ErrorConstants } from "../../core/interceptor/ErrorHnadle";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class AuthorizationService {

  // end Roles permission
  constructor(
    private httpservice: HttpClient,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private HttpClient: HttpClient,
    private toast: ToastrService
  ) {
  }
getMenuHierarchyId(entityName){
const extractedPerm = sessionStorage.getItem("extracted_permissions");
    if (extractedPerm && extractedPerm !== '') {
        var data = JSON.parse(sessionStorage.getItem("extracted_permissions")).find(v => v.menuLabel === entityName);
                return data;
                  }
}

  getPermissions(section) {
    const permi = JSON.parse(sessionStorage.getItem("permissions"));
    if (section == "user" && permi.user) {
      return permi.user;
    } else if (section == "object" && permi.object) {
      return permi.object;
    } else if (section == "role" && permi.role) {
      return permi.role;
    }
  }




  navigateToLogin(){
    window.location.href = '/login'
  }

  clearLocalStroage() {
    sessionStorage.removeItem("userDetails");
    sessionStorage.removeItem("permissions");
    sessionStorage.removeItem("menu");
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("menuNew");
    sessionStorage.removeItem("all");
    sessionStorage.removeItem("extracted_permission");
  }

  getMenu() {
    return JSON.parse(sessionStorage.getItem("menuNew"));
  }


  // get time stamp
  getTimeStamp() {
    return this.HttpClient.get<any>(
      AppSetting.API_ENDPOINT+ 'secure/v1/users/serverTime'
    );
  }

}