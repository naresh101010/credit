import { Injectable } from '@angular/core';
import {  HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';

import { AppSetting } from '../../app.setting';
// import { JwtService } from './jwt.service';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
   // private jwtService: JwtService
  ) {}

  headerData = {
    'userId': '123',
    'Content-Type': 'application/json'
  }

  headerDoc = {
    'userId': '123'
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    let headers = new HttpHeaders(this.headerData);
    return this.http.get(`${AppSetting.API_ENDPOINT}${path}`, { headers: headers })     
  }

  put(path: string, body: Object = {}): Observable<any> {
    let headers = new HttpHeaders(this.headerData);
    return this.http.put(
      `${AppSetting.API_ENDPOINT}${path}`,
      JSON.stringify(body), { headers: headers }
    )
  }

  post(path: string, body: Object = {}): Observable<any> {
    let headers = new HttpHeaders(this.headerData);
    return this.http.post(
      `${AppSetting.API_ENDPOINT}${path}`,
      JSON.stringify(body), { headers: headers }
    )
  }

  delete(path): Observable<any> {
    let headers = new HttpHeaders(this.headerData);
    return this.http.delete(
      `${AppSetting.API_ENDPOINT}${path}`, { headers: headers }
    )
  }


  // postSearchDocuments(data): Observable<MSA[]> {
  //   var headers = new HttpHeaders(this.headerData);
  //   return this.http.post<MSA[]>(AppSetting.API_ENDPOINT + "secure/v1/document/search", data, { headers: headers }).catch((error: Response) => {
  //     return Observable.throw("Something went wrong");
  //   });

  // }

  sendEmail(file,data){
    var headers = new HttpHeaders(this.headerData);
    headers.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    formData.append('emailData', data);
    formData.append('file', file,"preview.pdf");
    return this.http.post<any>(AppSetting.API_ENDPOINT + "/secure/credit-contract/v1/document/email", formData, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }
  
  documentTypeData(entityType, entiyId) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get(AppSetting.API_ENDPOINT + `secure/v1/document/associate/${entityType}/${entiyId}`, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  getSubDocTypeData(id) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get(AppSetting.API_ENDPOINT + "secure/v1/document/subtype/" + id, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  postDocumentUploadDetail(data, file): Observable<any> {
    let headers = new HttpHeaders(this.headerDoc);
    headers.append('Content-Type', 'multipart/form-data');
    let formData = new FormData();
    formData.append('entityId', data.entityId);
    formData.append('entityType', data.entityType);
    formData.append('expDt', data.expDt);
    formData.append('lkpDocSubtypeId', data.lkpDocSubtypeId);
    formData.append('lkpDocTypeId', data.lkpDocTypeId);
    formData.append('file', file);
    return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/v1/document/associate", formData, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  postDocumentUploadForContract(data, file): Observable<any> {
    let headers = new HttpHeaders(this.headerDoc);
    headers.append('Content-Type', 'multipart/form-data');
    let formData = new FormData();
    formData.append('entityId', data.entityId);
    formData.append('contractCode', data.contractCode);
    formData.append('expDt', data.expDt);
    formData.append('lkpDocSubtypeId', data.lkpDocSubtypeId);
    formData.append('lkpDocTypeId', data.lkpDocTypeId);
    formData.append('file', file);
    return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/v1/document/contract", formData, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  postDownloadDocument(fileName: string) {
    var headers = new HttpHeaders(this.headerData);
    console.log("calling download service..");
    return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/v1/document/download", fileName, { responseType: 'blob' as 'json', headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }



}

