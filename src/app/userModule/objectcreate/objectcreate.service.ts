import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import "rxjs/Rx";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppSetting } from "../../app.setting";
@Injectable({
 providedIn: "root"
})
export class ObjectcreateService {
 constructor(private http: HttpClient) {}
 headers = new HttpHeaders({
   branchCode: "String",
   journeyId: "String",
   userId: "String"
 });
 createObj(data: any) {
   const header = new Headers();
   header.append("Content-Type", "application/json");
   return this.http
     .post(AppSetting.API_ENDPOINT + "Url hear", data, {
     headers: this.headers
     })
     .map(
     response => { return response; },
     (error: any) => { console.log(error); }
     );
 }
 update() {
   return this.http.put(AppSetting.API_ENDPOINT + "Url hear", {})
   .map(
     (response) => {
        return response;
       },
     (error: any) => {
       console.log(error);
     });
 }
 getUsers() {
   return this.http.get(AppSetting.API_ENDPOINT + "Url hear").catch((error: Response) => {
     return Observable.throw("Something went wrong");
   });
 }
 moduleList(){
   return this.http.get(AppSetting.API_ENDPOINT + "Url hear").catch((error: Response) => {
     return Observable.throw("Something went wrong");
   });
 }
 scetionList(){
   return this.http.get(AppSetting.API_ENDPOINT + "Url hear").catch((error: Response) => {
     return Observable.throw("Something went wrong");
   });
 }
}