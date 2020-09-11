import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppSetting } from './app.setting';
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    constructor(private spinner: NgxSpinnerService, private router: Router, private environment: AppSetting) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        try {
            let object: any = {
                setHeaders: {
                    'content-type': 'application/json',
                },
                url: this.checkUrlByApi(req.url) + req.url
            }


            let accessToken = sessionStorage.getItem('access-token');
            if (accessToken == undefined || accessToken == null) {
                console.log("Access Token Missing");
            } else {
                object.setHeaders.authorization = accessToken;
            }

            let userDetailString = sessionStorage.getItem('userDetails');
            if (userDetailString == undefined || userDetailString == null) {
                console.log("userDetailString Missing");
            } else {
                let userDetails = JSON.parse(userDetailString);
                object.setHeaders.userId = userDetails.userId;
            }
            object.setHeaders.journeyId = "1";

            // var accessToken = JSON.parse(localStorage.getItem('token-storage')).accessToken.accessToken
            // if (accessToken) {
            // object.setHeaders.authorization = localStorage.getItem('access-token');
            // let userDetails = JSON.parse(localStorage.getItem('userDetails'));
            // object.setHeaders.userId = userDetails.userId;
            // object.setHeaders.journeyId = "1";
            // }

            let dummyrequest = req.clone(object);
            // this.loaderService.show();
            return next.handle(dummyrequest).pipe(tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // close loader
                }
            },
                (err: any) => {

                    if (err instanceof HttpErrorResponse) {

                        if (
                            err.error.message == "401 UNAUTHORIZED" ||
                            err.error.message == "User is not logged" ||
                            err.error.message == "User is not logged in" ||
                            err.error.message == "User is not logged-in or session has expired"
                        ) {
                            if (err.url.indexOf('permissions') == -1 && err.url.indexOf('logout') == -1) { // show toster except permissions and logout

                                // this.toast.warning(err.error.message, err.status.toString());
                                this.showMessage(err.error.message, "danger");
                                setTimeout(() => { this.spinner.hide() }, 1000);
                                // this.router.navigateByUrl("/login");
                                location.href = "/login";
                                return;
                            }

                        } else if (err.error.errors.error[0].description == 'User must have default branch') {
                            this.showMessage("User must have default branch", "danger");
                            setTimeout(() => { this.spinner.hide() }, 1000)
                            location.href = "/login";
                            // this.router.navigateByUrl("/login");
                            return;
                        }
                    }

                    if (err.error) {
                        this.spinner.hide();

                        if (err.error.errors && err.error.errors.error.length >= 0) {
                            console.log(err.error.errors.error[0].description);
                            return this.showMessage(err.error.errors.error[0].description, "danger");
                        }
                        else {
                            return this.showMessage(err.error.errors.error[0].description, "danger");
                        }
                    } else {
                        return this.showMessage('Service Exception', "danger");
                    }
                }));
        } catch (error) {
            console.log(error);
            // close loader
        }


	}
	
	settimeout:any;

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
		let _this=this;
		snackbar.addEventListener('mouseenter',function(){
			console.log("hover in");
			clearTimeout(_this.settimeout);
		})
		// snackbar.addEventListener('mouseleave',function(){
		// 	console.log("hover out");
		// 	_this.removeToast();
		// })
    }
	
	
	removeToast(snackbar=null){
		if(!snackbar){
			snackbar = document.getElementById("snackbar_module");
		}
		this.settimeout= setTimeout(() => {
            snackbar.style.animation = "fadeOut 0.5s linear";
			setTimeout(() => {
			    snackbar.style.display = "none";
			}, 300);
        }, 3500);
	}

    checkUrlByApi(url: string) {

        // if (!this.environment.production) {
        //     return this.environment.localApiUrl;
        // }


        if (url.includes("geo")) {
            return this.environment.geoApiUrl
        } else if (url.includes("branches")) {
            return this.environment.branchApiUrl
        } else if (url.includes("commandments") || url.includes('commandment')) {
            return this.environment.commandmentApiUrl
        } else if (url.includes("logistic-zone") || url.includes('zone-matrix') || url.includes('rate-group') || url.includes('sla')) {
            return this.environment.zoneApiUrl
        }
        else if (url.includes("notepad") || url.includes("lookup")) {
            return this.environment.lookupNotepadApiUrl
        }
        else if (url.includes("priceparameter")) {
            return this.environment.pricingParameterapiUrl
        }
        else {
            return this.environment.localApiUrl
        }

        // else if(url.includes("sla")){
        //     return environment.lookupNotepadApiUrl
        // }else 

    }

}