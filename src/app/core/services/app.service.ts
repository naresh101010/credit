import { throwError as observableThrowError, Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSetting } from '../../app.setting';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _url: any = "http://localhost:4200/assets/json/";
  constructor(private http: HttpClient) { }
  headerData = {
    'userId': '123',
    'status': 'draft'
  }
  //-----------------------DashBoard------------------------------//
  getDashboard() {
   // debugger
    var headers = new HttpHeaders(this.headerData);
      return this.http.get<any>(this._url+"dashboard.json", {headers:headers}).catch((error: Response) => {
  //  return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/v1/networkcontract/all/draft", { headers: headers }).catch((error: Response) => {
      return observableThrowError("Something went wrong");
    }
    );
  }
  getDashboardTotalCount()
  {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/v1/networkcontract/all/draft", { headers: headers }).catch((error: Response) => {
      return observableThrowError("Something went wrong");
    }
    );
  }
  //-----------------------Associate Contract Page------------------------------//

  getActiveAssociates() {

    var headers = new HttpHeaders(this.headerData);
        return this.http.get<any>(AppSetting.API_ENDPOINT+"secure/v1/associates/status/active", {headers:headers}).catch((error: Response) => {
      return observableThrowError("Something went wrong");
    }
    );
  }

  //----------------------- Create Associate Contract Page------------------------------//

  getAssociatesContract(){
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/v1/associates", { headers: headers }).catch((error: Response) => {
      return observableThrowError("Something went wrong");
    }
    );
  }
  postAssociatesContract(data){
    var headers = new HttpHeaders(this.headerData);
    return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/v1/associates",data, { headers: headers }).catch((error: Response) => {
      return observableThrowError("Something went wrong");
    }
    );
  }

  getAssociatesContractById(id: number) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/v1/associates/" + id, { headers: headers }).catch((error: Response) => {
      return observableThrowError("Something went wrong");
    }
    );
  }

  //-----------------------Service for PINECODE searching-------------------------------//
  getAllStates() {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/v1/geography/state", { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  getCityByStateService(stateId): Observable<any> {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any[]>(AppSetting.API_ENDPOINT + 'secure/v1/geography/city/state/' + stateId, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  getPlaceByCityService(cityId): Observable<any> {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/v1/geography/pincode/city/" + cityId, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });

  }


}
