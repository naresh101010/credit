import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import SimpleCrypto from "simple-crypto-js";
import { ToastrService } from "ngx-toastr";

import { AppSetting } from "../../app.setting";
import { Constants } from "../../core/interceptor/Constants";

@Injectable({
  providedIn: "root",
})
export class AuthorizationService {
  constructor(
    private httpservice: HttpClient,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private toast: ToastrService
  ) {}

  user = [];
  role = [];
  object = [];
  isAdmin: boolean;
  setPermission(response) {
    let response_ = response.data.responseData;
    // console.log(permission)
    this.isAdmin = response_.user.isAdmin;

    //if user is admin
    if (response_.user.isAdmin) {
      this.user = ["CREATE", "READ", "UPDATE"];
      this.role = ["CREATE", "READ", "UPDATE"];
      this.object = ["CREATE", "READ", "UPDATE"];
    } else if (response_.menu.length > 0) {
            // if not admin
            for(let responseMenu of response_.menu){
            if(responseMenu.menuLabel =='USER MANAGEMENT' && responseMenu.childMenu.length > 0){
            responseMenu.childMenu.map((item) => {
              if (item.menuLabel == "USER") {
                item.permissions.map((v) => {
                  if (v.channelId == 33 && this.user.indexOf(v.permissionType) == -1) {
                    this.user.push(v.permissionType)
                  }
                });
              } else if (item.menuLabel == "ROLE") {
                item.permissions.map((v) => {
                  if (v.channelId == 33 &&  this.role.indexOf(v.permissionType) == -1) {
                    this.role.push(v.permissionType)
                  }
                });
              } else if (item.menuLabel == "OBJECT") {
                item.permissions.map((v) => {
                  if (v.channelId == 33 && this.object.indexOf(v.permissionType) == -1) {
                    this.object.push(v.permissionType)
                  }
                });
              }
            });
            }
            }
          }else {
      alert("permission error");
      this.router.navigate(["/login"]);
      return;
    }

    let user = this.user;
    let role = this.role;
    let object = this.object;
    sessionStorage.setItem(
      "permissions",
      JSON.stringify({ user, role, object })
    );
  }
//priyanka start
    getBookMarkObjects(user, token){
      var header = {
            branchCode: "B1",
            journeyId: "A1",
            userId: user,
            authorization: token,
          };
           // get dragged data, feature data
                var headers = new HttpHeaders(header);
               return this.httpservice.get<any>(AppSetting.API_ENDPOINT + "secure/v1/dashboard/bookmark/"+ 0, { headers: headers });
          }
//priyanka end
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

  setUserDetails(userDetails: { userId: string; token: any }) {
    sessionStorage.setItem("userDetails", JSON.stringify(userDetails));

    // todo remove it - set for mdm
    sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
  }
  getUserDetails() {
    return JSON.parse(sessionStorage.getItem("userDetails"));
  }



  logout() {
    let headers = { authorization: sessionStorage.getItem('access-token'),   userId : JSON.parse(sessionStorage.getItem("userDetails")).userId };
    this.spinnerService.show();
    this.httpservice
      .post<any>(AppSetting.API_ENDPOINT_AUTH + "secure/v1/logout", null, {headers:headers})
      .subscribe(
        (user) => {
          this.spinnerService.hide();
          this.router.navigate(["/login"]);
          this.user = [];
          this.role = [];
          this.object = [];
        },
        (err) => {
          this.user = [];
          this.role = [];
          this.object = [];
          this.router.navigate(["/login"]);
          this.spinnerService.hide();
        }
      );
  }

  clearsessionStroage() {
    sessionStorage.removeItem("userDetails");
    sessionStorage.removeItem("permissions");
    sessionStorage.removeItem("menu");
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("menuNew");
    sessionStorage.removeItem("all");
    sessionStorage.removeItem("extracted_permissions");
  }

  getMenu() {
    return JSON.parse(sessionStorage.getItem("menuNew"));
  }

  getPermi(user, token) {
    var headers = {
      branchCode: "B1",
      journeyId: "A1",
      userId: user,
      authorization: token,
    };
    this.httpservice
      .get<any>(AppSetting.API_ENDPOINT_AUTH + "secure/v1/permissions", {
        headers: headers,
      })
      //.get<any>(AppSettingfig'].API_ENDPOINT_LOCAL + "no_per")
      .subscribe(
        (data) => {
           // if user is not admin than put permission manualy
           if( data.data.responseData.user.isAdmin){ this.getManualPermission(data)}
          //set all menu permission in sessionStorage
          this.setAllMenuPermission(data);
          //if user has no permission navigate to tracking page
          if (
            data.data.responseData.menu &&
            data.data.responseData.menu.length == 0
          ) {
            this.router.navigate(["/user-management/waybill-tracking"]);
            sessionStorage.setItem(
              "menuNew",
              JSON.stringify(data.data.responseData.menu)
            );
            sessionStorage.setItem("all", JSON.stringify(data));
            this.spinnerService.hide();
            return;
          }

          //if user has permission
          sessionStorage.setItem(
            "menuNew",
            JSON.stringify(data.data.responseData.menu)
          );
          this.setPermission(data);
          sessionStorage.setItem("all", JSON.stringify(data));

          //if user has no permission and isAdmin is false --- backup code
          // if(!this.isAdmin  && this.user.length == 0 && this.object.length == 0 && this.role.length == 0){
          //   this.toast.warning('This user has no permissions.', ' ');
          //   this.logout();
          //   this.clearsessionStroage();
          //   return
          // }

          // not navigate if user on inner page
          if (window.location.href.indexOf("login") != -1) {

            // find navigate path --- navigate by id code
              // const temp_ =  data.data.responseData;
              // const which_section_id = temp_.user.defaultMenuId;   // find menu id from user

              // const navigate_which_section = temp_.menu.find(v => v.id == which_section_id); // find which menu to navigate by finded id based

              // if(navigate_which_section){ //if it is defined
              //   const application_path = navigate_which_section.menuLabel;
              //   let target = navigate_which_section.childMenu[0].target;
              //   if(!target){
              //     target = navigate_which_section.childMenu[0].childMenu[0].menuLabel;
              //   }
              //   const path =  `${application_path}/${target}`.replace(" ", "-").toLowerCase();
              //   this.router.navigate([path]);  // navigate

              // }else {
              //   const application_path = temp_.menu[0].menuLabel;
              //   let target =  temp_.menu[0].childMenu[0].childMenu[0].menuLabel
              //   const path =  `${application_path}/${target}`.replace(" ", "-").toLowerCase()
              //   this.router.navigate([path]);
              // }
            //end find navigate path --- navigate by id code
/* commented by priyanka
            this.router.navigate(['/dashboard']);
            this.spinnerService.hide();      */
          if(!data.data.responseData.user.isAdmin){
          this.getBookMarkObjects(user, token).subscribe(success => {
           if(success.data ){
           this.routeDefaultNavigation(success, data);
           }});
           }
                      }

        },
        (err) => {
          // if user has no permission, navigate to waybill | disable nav | disable user detail
          if (err.error.message == "401 UNAUTHORIZED") {
            this.router.navigate(["/user-management/waybill-tracking"]);
            this.spinnerService.hide();
          }
          this.spinnerService.hide();
          this.toast.warning('Details not found', ' ');
          // if ( // if token is not valide then do not call logout call
          //   err.error.message == "401 UNAUTHORIZED" ||
          //   err.error.message == "User is not logged" ||
          //   err.error.message == "User is not logged in" ||
          //   err.error.message == "User is not logged-in or session has expired"
          // ) {
          //   this.router.navigate(["/login"]);
          //   this.clearsessionStroage();
          // } else{
          //   this.logout();
          // }
        }
      );
  }


  routeDefaultNavigation(success, data){
  if(success.data.pinnedObject){
          if(success.data.pinnedObject.targetValue){
              window['defaultLandingTarget'] = success.data.pinnedObject.targetValue;}
             //if routing path is already returned by service response
             if(success.data.pinnedObject.routingPath){
             this.routeCardObjectsOfModules(success)
             }else{
             if(success.data.pinnedObject.parentMenuId || success.data.pinnedObject.parentModuleId){
             let permissionArray = JSON.parse(sessionStorage.getItem("extracted_permissions"))
             var permission = permissionArray.find(x=>x.id == success.data.pinnedObject.menuHierarchyId);
             if(permission){
             this.navigatePinnedCardsBasedOnPermission(permission, success, data);
             }else{
             this.router.navigate(['/dashboard']);
               }
             }else{
             this.router.navigate(['/dashboard']);
                }
              }
             }else{
             this.router.navigate(['/dashboard']);
              }
                                      }

  getNavigationLink(parentCard, childCard){
   var link;
   if(childCard.target == Constants.CREDIT_MENU){
   link = Constants.CREDIT_ROUTER_LINK;
   }else if(childCard.target == Constants.RETAIL_MENU){
   link = Constants.RETAIL_ROUTER_LINK;
   }else if(childCard.target == Constants.PRC_MENU){
   link = Constants.PRC_ROUTER_LINK;
   }else{
   link = parentCard.menuLabel.replace(' ', '-').toLowerCase() + '/'+ childCard.menuLabel.replace(' ','-').toLowerCase();
   }
   return link;
   }

   routeCardObjectsOfModules(success){
   let permissionArray = JSON.parse(sessionStorage.getItem("extracted_permissions"))
   if(permissionArray){
          //var permission = permissionArray.find(x=>x.id == success.data.pinnedObject.menuHierarchyId);
          //var objectPermissions = permission && permission.permissions && permission.permissions.find(x=> x.objectId== success.data.pinnedObject.objectId);
          if(this.isAdmin){
          if(success.data.pinnedObject.targetValue && success.data.pinnedObject.targetValue === 'COMMANDMENT'){
            this.router.navigate(['/'+ success.data.pinnedObject.routingPath, {'openDialog': 'true'}]);
            }
            else{
            this.router.navigate(['/' + success.data.pinnedObject.routingPath]);}
          }
            this.spinnerService.hide();
   }else{
    this.router.navigate(['/dashboard']);
        }
    }


navigatePinnedCardsBasedOnPermission(permission, success, data){
   var parentCard = data.data.responseData.menu.find(x=> x.id == success.data.pinnedObject.parentMenuId);
      if(!parentCard && data.data.responseData.menu.childMenu){
       parentCard = data.data.responseData.menu.childMenu.find(x=> x.id == success.data.pinnedObject.parentMenuId);
      }
      if(!parentCard && success.data.pinnedObject.parentModuleId){
      parentCard = data.data.responseData.menu.find(x=> x.id == success.data.pinnedObject.parentModuleId);
      }
      var childCard;
      if(success.data.pinnedObject.objectId){
      childCard = parentCard.childMenu.find(pCard=> pCard.id == success.data.pinnedObject.objectId);
      if(!childCard){
      childCard = parentCard.childMenu.find(pCard=> pCard.id == success.data.pinnedObject.parentModuleId);
            }
      }else{
      childCard = parentCard.childMenu.find(pCard=> pCard.id == success.data.pinnedObject.parentModuleId);
      if(!childCard){
      childCard = parentCard.childMenu.find(pCard=> pCard.id == success.data.pinnedObject.menuHierarchyId);
      }
      if(childCard && childCard.childMenu.length>0){
      childCard = childCard.childMenu.find(pCard=> pCard.id == success.data.pinnedObject.menuHierarchyId);
      }
      }
      var link = this.getNavigationLink(parentCard, childCard);
      if (success.data.pinnedObject.targetValue && success.data.pinnedObject.targetValue === 'COMMANDMENT') {
          this.router.navigate(['/'+ link, {'openDialog': 'true'}]);
          }else{
      this.router.navigate(['/' + link]);}
      this.spinnerService.hide();
      }



  //this function return a encrept txt
  encreptIt(txt: string) {
    const _secretKey = "989873298798798787638374";
    const simpleCrypto = new SimpleCrypto(_secretKey);
    return simpleCrypto.encrypt(txt);
  }

  //this function return a deencrept txt
  dencreptIt(txt: string) {
    const _secretKey = "989873298798798787638374";
    const simpleCrypto = new SimpleCrypto(_secretKey);
    return simpleCrypto.decrypt(txt);
  }

  setAllMenuPermission(data) {
    // debugger;
    let total = [];
    let menu = data.data.responseData.menu;
    let temp_ = menu.map((v) => v.childMenu);

    temp_.forEach((v) => {
      if (v.childMenu && v.childMenu.length > 0) {
        total = [...total, ...v.childMenu];
      } else if (v && v.length > 0) {
        total = [...total, ...v];
      }
    });

    for (var i = 0; i < 6; i++) {
      total.forEach((v) => {
        if (v.childMenu && v.childMenu.length > 0) {
          total = [...total, ...v.childMenu];
        } else if (v && v.length > 0) {
          total = [...total, ...v];
        }
      });
    }

    let letuniqueArray = total.filter(function (item, pos) {
      return total.indexOf(item) == pos;
    });

    sessionStorage.setItem(
      "extracted_permissions",
      JSON.stringify(letuniqueArray)
    );
  }



  getManualPermission(data){
    let headers = { authorization: sessionStorage.getItem('access-token'), userId: JSON.parse(sessionStorage.getItem('userDetails')).userId };
    this.httpservice
    .get<any>(AppSetting.API_ENDPOINT + "secure/v1/objects", {headers:headers})
    .subscribe(
      (obj) => {

      console.log(obj)
      let extper =  JSON.parse(sessionStorage.getItem('extracted_permissions'));


      // for credit
      // FINAL ATTRIBUTE  - REQURED
          // attributeExclutionList: []
          // channelId: 33
          // entityName: "DASHBOARD"
          // isPublic: 0
          // moduleId: 4
          // moduleName: "CREDIT"
          // objectId: 269
          // permissionId: 0
          // permissionType: "CREATE"
          // subEntityName: "ACTIVE CONTRACTS"

      // for credit
          let filterCreditPermission = obj.data.responseData.filter(v => v.moduleName == 'CREDIT')
          extper.find(v=>v.menuLabel == 'CUSTOMER').childMenu.find(v=>v.menuLabel == 'CREDIT').permissions = filterCreditPermission;
          filterCreditPermission = this.removeExtraItem(filterCreditPermission).filter(v => v.channelId == 33)
          extper.find(v=>v.menuLabel == 'CUSTOMER').childMenu.find(v=>v.menuLabel == 'CREDIT').permissions = this.putPermis(filterCreditPermission);
      // end for credit


      // for PRC
           let prc_ = obj.data.responseData.filter(v => v.moduleName == 'PRC')
           extper.find(v=>v.menuLabel == 'CUSTOMER').childMenu.find(v=>v.menuLabel == 'PRC').permissions = prc_;
           prc_ = this.removeExtraItem(prc_).filter(v => v.channelId == 33)
           extper.find(v=>v.menuLabel == 'CUSTOMER').childMenu.find(v=>v.menuLabel == 'PRC').permissions = this.putPermis(prc_);
       // end for PRC

       // for RETAIL
        let retail_ = obj.data.responseData.filter(v => v.moduleName == 'RETAIL')
        extper.find(v=>v.menuLabel == 'CUSTOMER').childMenu.find(v=>v.menuLabel == 'RETAIL').permissions = retail_;
        retail_ = this.removeExtraItem(retail_).filter(v => v.channelId == 33)
        extper.find(v=>v.menuLabel == 'CUSTOMER').childMenu.find(v=>v.menuLabel == 'RETAIL').permissions = this.putPermis(retail_);
       // end for RETAIL

        // for associate booking
        let asso_booking = obj.data.responseData.filter(v => v.moduleName == 'ASSOCIATE BOOKING')
        extper.find(v=>v.menuLabel == 'ASSOCIATE').childMenu.find(v=>v.menuLabel == 'ASSOCIATE BOOKING').permissions = asso_booking;
        asso_booking = this.removeExtraItem(asso_booking).filter(v => v.channelId == 33)
        extper.find(v=>v.menuLabel == 'ASSOCIATE').childMenu.find(v=>v.menuLabel == 'ASSOCIATE BOOKING').permissions = this.putPermis(asso_booking);
        //end for associate booking

      sessionStorage.setItem(
        "extracted_permissions",
        JSON.stringify(extper)
      );
      this.getBookMarkObjects(JSON.parse(sessionStorage.getItem('userDetails')).userId, sessionStorage.getItem('access-token')).subscribe(success => {
                // debugger
                 if(success.data ){
                 this.routeDefaultNavigation(success, data);
                 }});

      },
      (err) => {
        this.spinnerService.hide();
      }
    );
  }

  removeExtraItem(arr){
    arr.forEach(v => {
      delete v.id;
      delete v.status;
      delete v.objectChannelMapStatus;
      delete v.entityId;
      if(v.attributeExclutionList && Array.isArray(v.attributeExclutionList)){
        v.attributeExclutionList = []
      }
    });
    return arr;
  }


  putPermis(arr){
    let putPermission = [];
    arr.forEach( v => {
      putPermission.push({...v, permissionType:'CREATE'})
      putPermission.push({...v, permissionType:'READ'})
      putPermission.push({...v, permissionType:'UPDATE'})
    });
    return putPermission;
  }
}
