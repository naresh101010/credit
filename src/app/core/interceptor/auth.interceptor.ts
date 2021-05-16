import { AppSetting } from 'src/app/app.setting';
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
import { errorCode } from '../error-message-mapped';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private toast: ToastrService,
        private router: Router,
        private spinner: NgxSpinnerService,
        private environment: AppSetting
    ) { }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        let token;
        let userId;

        // //testing purpose
        // const users = { userId: 'user1', token: '2CB+BmaKNBvimaS4TAG6jHQVzrF01Tqem7jUfzMWyLUT9FhcBWzfJYiS0fSFfmvvn1LIAcn6Y/yGEIK0rnHUXtQszytILh7Hbpk9dWQCCIMtfQFF+nlxDcf5jJAYWm9LREfQ1R3QxxH90Nwn3yRIxxb521+fU2+OByP8Abi5OQsvODw/1Yqjqq7JCXcjbp6hoMIausGoS92O+FStQAtdO7Pg04YEmC8dp2gnIrtm0ZXDWV38XgqSq6/ISuLZ3v94w4pZZi0xhlnsMF2CxthCKYmBdi382rxOGW9cNOjbCuPEXpY3V9YJ4OKXu/PI9dEgXeCOl/tW9BFNm1YWkVRN19ierztwOZkjk2Scj9YUZqktfdfa4L3FIdAmhKRaAqGbIy2/9JZIb0sBXSyqjzMb0+nCUZ0gZzygshvCbyKGoBEQDh8OrGdUM4Vzmnx9FHkTUOCi5z/I8BdcjQrC4qDBQL3BrJ/cWQGhmarptGaiTqOmyx8Bz4lhcC9GO4RIS6em3Z1fXag/lILhm6aEY50ZqNeQniKnDQCFWyrybyupkyt7/Tg2WsyLxauxJLKDRWtzkl+9IvhahkXISx29TuSTL9KXc5AV93t8q/nCZn+e8rof/OtbbuQxBn4LMY2X/7b/Oml'}
        // sessionStorage.setItem('userDetails', JSON.stringify(users));
        // sessionStorage.setItem('branchId', '47');
        // testing purpose end

        let userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
        // console.log('user' , userDetails)
        if (userDetails) {
            token = userDetails.token;
            userId= userDetails.userId.toUpperCase();
            if (token && userId) {
                request = request.clone({
                    headers: request.headers.set("authorization", `${token}`).set("userId", userId).set("branchCode", "B1")
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
                //  
                if (err instanceof HttpErrorResponse) {
                    //  
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
                        location.href = "/login";
                        return;
                    } else if (
                        err.error.errors.error[0].description ==
                        "User must have default branch"
                    ) {
                        this.toast.warning("User must have default branch.");
                        setTimeout(() => {
                            this.spinner.hide();
                        }, 4000);
                    }
                }
                if (err.error) {
                    this.spinner.hide();
                    if ((err.error.errors && err.error.errors.error.length >= 0 )  && (err.error.errors.error[0].code.trim() == "B_ERR-404" || err.error.errors.error[0].code.trim() == "B_ERR-513" || err.error.errors.error[0].code.trim() === 'VAL_WBL_40059' || err.error.errors.error[0].code.trim() === 'VAL_WBA_60001' ||  err.error.errors.error[0].code.trim() === 'BUS_WBF_4041' ||  err.error.errors.error[0].code.trim() === 'VAL_WBF_4010')) {
                        return
                    }
                    if (err.error.errors && err.error.errors.error.length >= 0 && (err.error.errors.error[0].code.trim() == "RATECHRERR" ||
                        err.error.errors.error[0].code.trim() == "VAL_WBL_40019" || err.error.errors.error[0].code.trim() == "VAL_WBL_40026" ||
                        err.error.errors.error[0].code.trim() == "VAL_WBL_40027" || err.error.errors.error[0].code.trim() == "VAL_WBL_40028")
                    ) {
                        return this.showMessage('Waybill Created Successfully  But  Error Occured While Generate Waybill', "danger");
                    }
                    else {
                        if (err.error.errors && err.error.errors.error.length >= 0) {
                            // console.log(err.error.errors.error[0].description);
                            const code = err.error.errors.error[0].code;
                            if (errorCode[code]) {
                                return this.showMessage(errorCode[code], "danger");;
                            }
                            return this.showMessage(err.error.errors.error[0].description, "danger");
                        }
                        else {
                            return this.showMessage(err.error.errors.error[0].description, "danger");
                        }
                    }
                }
                else {
                    setTimeout(() => {
                        this.spinner.hide();
                    }, 400);
                    return this.showMessage('Service Exception', "danger");

                }
            }

        );
    }

    settimeout: any;

    showMessage(message: string, type?: string) {

        let snackbar = document.getElementById("snackbar_module");
        let snack_msg = document.getElementById("snack_msg");
        snackbar.style.display = "block";
        snackbar.style.animation = "fadeIn 0.5s linear";
        snackbar.style.background = "#27AE60";
        if (type == "danger") {
            snackbar.style.background = "#ef4848";
        }
        snack_msg.innerText = message;
        this.removeToast(snackbar);
        let _this = this;
        snackbar.addEventListener('mouseenter', function () {
            console.log("hover in");
            clearTimeout(_this.settimeout);
        })
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
}
