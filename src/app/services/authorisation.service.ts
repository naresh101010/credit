// import { FuelPrice } from './../Models/fuel';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppSetting } from '../app.setting';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';

@Injectable({
    providedIn: "root"
})
export class AuthorizationService {
    constructor(private http: HttpClient, private app: AppSetting, private permissionsService: NgxPermissionsService) { }
    permisionList: Array<any> = [];
    getPermissions(response, subEntityName) {

        const adminUser = JSON.parse(sessionStorage.getItem("all"));
        const permi = JSON.parse(sessionStorage.getItem("extracted_permissions"));
        if (adminUser.data.responseData.user.isAdmin == true) {
            this.permisionList = [];
            this.permisionList.push("READ", "UPDATE", "CREATE")
        }
        else {
            let permisionObj = permi.find(elem => elem.menuLabel == response);
            this.permisionList = [];
            permisionObj.permissions.forEach(element => {
                if (element.subEntityName == subEntityName) {
                    this.permisionList.push(element.permissionType)
                }
            });
        }
        return this.permisionList;
    }
}
