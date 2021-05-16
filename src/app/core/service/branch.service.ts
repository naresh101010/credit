
import 'rxjs/add/operator/catch';
import { map } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSetting } from 'src/app/app.setting';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
userdetails
constructor(private http: HttpClient) { }
 headerData = {
        'userId': sessionStorage.getItem('userId')
    }

    getBranchDetails() {
         this.userdetails = JSON.parse(sessionStorage.getItem('userDetails'));
         var headerData=this.userdetails.userId;

        var headers= new HttpHeaders(headerData);
        return this.http.get(AppSetting.API_ENDPOINT + `secure/v1/branches/associates`, { headers: headers }).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }
}
