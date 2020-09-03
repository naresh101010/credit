import {
    CanActivate,
    Router,
} from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}
    canActivate() {
       //return true;
        if(!!sessionStorage.getItem('access-token')){
            return true;
        }else{
            window.location.href = "/login";           
             return false;
        }
    }
}
