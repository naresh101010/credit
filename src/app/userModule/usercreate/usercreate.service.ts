import { Injectable } from '@angular/core';
import { Response } from "@angular/http";
import "rxjs/Rx";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppSetting } from "../../app.setting";

@Injectable({
  providedIn: 'root'
})
export class UsercreateService {

constructor(private http: HttpClient) { }

headerData={ 
'branchCode':AppSetting.branchCode,
'journeyId':AppSetting.journeyId, 
'userId': AppSetting.userId
}

//create User Service
createusr(usrdata) {
  return this.http.post(AppSetting.API_ENDPOINT+'secure/um/v1/users',usrdata,).catch((error: Response) => {
    return Observable.throw("Something went wrong");
  });
}

//Category DropDown Service
categoryDDL() {
  return this.http.get(AppSetting.API_ENDPOINT+'secure/um/v1/lookup/USER_CATEGORY',).catch((error: Response) => {
    return Observable.throw("Something went wrong");
  });
}


// Default Data Service
DefaultDoc() {
 return this.http.get(AppSetting.API_ENDPOINT+'secure/um/v1/branches',).catch((error: Response) => {
    return Observable.throw("Something went wrong");
  });
}


// Roll Data Service
Rolldoc() {
  return this.http.get(AppSetting.API_ENDPOINT+'secure/um/v1/users',).catch((error: Response) => {
    return Observable.throw("Something went wrong");
  });
}

// Department Type
GetDepartmentList(){
  return this.http.get(AppSetting.API_ENDPOINT+`secure/v1/roles/lookup/USER_DEPT`,).catch((error: Response) => {
    return Observable.throw("Something went wrong");
  });
}

getMenuHierarchList(){
  return this.http.get(`${AppSetting.API_ENDPOINT}secure/v1/users/menuHierarchies`,).catch((error: Response) => {
    return Observable.throw("Something went wrong");
  });
}



}

