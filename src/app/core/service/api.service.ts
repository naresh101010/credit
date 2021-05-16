import { Injectable } from '@angular/core';
import {  HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppSetting } from '../../app.setting';
// import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) {}

  headerData = {
    'userId': '123',
    'Content-Type': 'application/json'
  }
  // post drag and drop data
  postDragDropData(data) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.post<any>(AppSetting.API_ENDPOINT_UM + "secure/v1/dashboard/bookmark",data, { headers: headers }).pipe(catchError((error: Response) => {
      return throwError("Something went wrong");
    }));
  }


   // get module card details for Dashboard
   getCardDetails(menuHierarchyId) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT_UM +"secure/v1/dashboard/moduleCardDetails/"+ menuHierarchyId, { headers: headers }).pipe(catchError((error: Response) => {
      return throwError("Something went wrong");
    }));
  }

   getDragDropData(menuHierarchyId) {
      var headers = new HttpHeaders(this.headerData);
      return this.http.get<any>(AppSetting.API_ENDPOINT_UM + "secure/v1/dashboard/bookmark/"+ menuHierarchyId, { headers: headers }).pipe(catchError((error: Response) => {
        return throwError("Something went wrong");
      }));
   }


}

