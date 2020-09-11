import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

import { AuthorizationService } from "../core/services/authorization.service";
import { ToasterService } from "../core/services/toaster.service";
import { AppSetting } from "../app.setting";
import { ErrorConstants } from "../core/interceptor/ErrorHnadle";
import { CommonService } from "../common.service";
// import { AppConfigService } from "src/app/AppConfigService.service";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  holdCredential: {
    username: any;
    password: any;
    channelId: number;
  } = { username: "", password: "", channelId: 33 };
  loginCreate: any;
  credentials: boolean = false;
  config: any;
  rememberMe: boolean = false;
  constructor(
    private httpservice: HttpClient,
    private SpinnerService: NgxSpinnerService,
    public router: Router,
    public toster: ToasterService,
    private AuthorizationService: AuthorizationService,
    private toast: ToastrService,
    private commonService:CommonService
  ) {}
  ngOnInit() {
    console.log('check deployment status', new Date())
    this.AuthorizationService.clearsessionStroage();
    //check if credentials persist in sessionStorage then fill it in form --naresh
    this.credentilFromLocalSt();
    this.commonService.hidemenu()
  }

  runFocus() {
    this.credentials = false;
  }
  loginUser() {
    // console.log(this.holdCredential);
    this.credentials = false;
    if (
      this.holdCredential.username == "" ||
      this.holdCredential.password == ""
    ) {
      this.credentials = true;
      return;
    }
    var headers = { journeyId: "1", userId: "" };
    headers.userId = this.holdCredential.username.toUpperCase();
    this.SpinnerService.show();
    this.httpservice
      .post<any>(
        AppSetting.API_ENDPOINT_AUTH + "v1/login",
        {...this.holdCredential, username:this.holdCredential.username.toUpperCase()},
        {
          headers: headers,
          observe: "response",
        }
      )
      .subscribe(
        (data) => {
          let token = data.headers.get("authorization");
          this.loginCreate = data;
          sessionStorage.setItem("access-token", token);
          this.loginCreate = data;
          this.AuthorizationService.setUserDetails({
            userId: this.holdCredential.username,
            token: token,
          });
          this.AuthorizationService.getPermi(
            this.holdCredential.username,
            token
          );

          // handle if user checked rememberMe -- naresh

          if(this.rememberMe){
            this.rememberme()
          }
           
        },
        (error) => {
          let ob = ErrorConstants.validateException(error.error);
          // debugger;
          this.toast.warning(ob.message != "" ? ob.message : ErrorConstants.errorServiceNotAvailable , ob.code);
          this.SpinnerService.hide();
        }
      );
  }

  // strore credentials in sessionStorage
  rememberme() {
    //encr credential
    const u = this.AuthorizationService.encreptIt(this.holdCredential.username);

    sessionStorage.setItem(
      "RememberMe",
      JSON.stringify({
        catchX: u,
      })
    );
  }

  credentilFromLocalSt() {
    let remMe = JSON.parse(sessionStorage.getItem("RememberMe"));
    if (remMe !== null) {
      this.holdCredential.username = this.AuthorizationService.dencreptIt(
        remMe.catchX
      );
    }
  }
}
