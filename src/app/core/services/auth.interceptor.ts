import { Observable } from "rxjs/Observable";
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse
} from "@angular/common/http";
import { NgxSpinnerService } from "ngx-spinner";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/do";

import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { AuthorizationService } from "./authorization.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private toast: ToastrService,
        private router: Router,
        private SpinnerService: NgxSpinnerService,
        private authorizationService_:AuthorizationService
    ) {}
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
      
        let token;
        let userId;
        let userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
        // if user switch branch 
           let sw_branchId;
           let hv_per_ = [];

            try {
                let extPer = JSON.parse(sessionStorage.getItem('extracted_permissions'));
                hv_per_ = extPer.find(v=> v.target == 'ASSOCIATE').childMenu.find(v => v.target == 'ASSO_BOOKING').permissions.filter(v=>v.entityName == 'CONTRACT').map( v => { return v.permissionType });
                console.log(hv_per_)
            }
            catch(err) {
                console.log(err)
            }
       
            // console.log(hv_per_)
           if(!hv_per_.includes("CREATE") && !hv_per_.includes("UPDATE") && sessionStorage.getItem("switchBranchWith")){ // if only read permission & switch branch avalb in session storage
               sw_branchId =  JSON.parse(sessionStorage.getItem("switchBranchWith")).branchId 
           }

       //end if user switch branch
        if (userDetails) {
            token = userDetails.token;
            userId = userDetails.userId;
            if (token) {
                request = request.clone({
                    headers: sw_branchId ? request.headers.set("authorization", `${token}`).set("userId", userId).set("branchId", sw_branchId) : request.headers.set("authorization", `${token}`).set("userId", userId)
                });
            }
        }

        return next.handle(request).do(
            (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // do stuff with response if you want
                    // console.log(event.headers);
                }
            },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (
                        err.error.message == "401 UNAUTHORIZED" ||
                        err.error.message == "User is not logged" ||
                        err.error.message == "User is not logged in" ||
                        err.error.message ==
                            "User is not logged-in or session has expired"
                    ) {
                        this.toast.warning(
                            err.error.message,
                            err.status.toString()
                        );
                        //this.router.navigate(["/login"]);
                        window.location.href = "/login";
                        setTimeout(() => {
                            this.SpinnerService.hide();
                        }, 4000);
                    } else if (
                        err.error.errors.error[0].description ==
                        "User must have default branch"
                    ) {
                        this.toast.warning("User must have default branch.");
                        setTimeout(() => {
                            this.SpinnerService.hide();
                        }, 4000);
                    }
                }
            }
        );
    }
}
