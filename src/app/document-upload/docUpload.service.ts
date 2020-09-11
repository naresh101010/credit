import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { AppSetting } from "../app.setting";

@Injectable({
  providedIn: "root",
})
export class DocUploadService {
  constructor(private http: HttpClient) {}
  headerData = {
    branchCode: "02",
    journeyId: "CREDIT_CNTR",
    originUserType: "03",
    userId: "user123",
  };
  // Dashboard

  /**
   * Function added for document upload
   */

  postSearchDocuments(data, id) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get(
      AppSetting.API_ENDPOINT_DOC_UPLD +
        "external/v1/document/associate/ASSOCIATE/" +
        id,
      { headers: headers }
    );
  }

  getSubDocTypeData(id) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get(
      AppSetting.API_ENDPOINT_DOC_UPLD + "external/v1/document/subtype/" + id,
      { headers: headers }
    );
  }

  postDocumentUploadDetail(entityId, docTypeId, subTypeId, formattedDat, file) {
    var headers = new HttpHeaders(this.headerData);
    headers.append("Content-Type", "multipart/form-data");
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(
      AppSetting.API_ENDPOINT_DOC_UPLD +
        `external/v1/document/associate?entityId=${entityId}&entityType=ASSOCIATE&expDt=${formattedDat}&lkpDocSubtypeId=${subTypeId}&lkpDocTypeId=${docTypeId}`,
      formData,
      { headers: headers }
    );
  }
  postDownloadDocument(fileName) {
    var headers = new HttpHeaders(this.headerData);
    console.log("calling download service..");
    return this.http.post<any>(
      AppSetting.API_ENDPOINT_DOC_UPLD + "external/v1/document/download",
      fileName,
      { responseType: "blob" as "json", headers: headers }
    );
  }

  getOportunity(data, isEdit) {
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.get<any>(
        AppSetting.API_ENDPOINT_DOC_UPLD +
          `external/credit-contract-stg/v1/opportunity/${data}`,
        { headers: headers }
      );
    } else {
      return this.http.get<any>(
        AppSetting.API_ENDPOINT_DOC_UPLD + `external/v1/opportunity/${data}`,
        { headers: headers }
      );
    }
  }


  //otp start
  generateOtp(id){
    var headers = new HttpHeaders(this.headerData);  
      return this.http.get<any>(
        AppSetting.API_ENDPOINT_DOC_UPLD + `external/v1/document/otpgenerate/${id}`,
        { headers: headers }
      );
    
  }


  // validate otp
  validateOtp(data){
    var headers = new HttpHeaders(this.headerData);  
    return this.http.post<any>(
      AppSetting.API_ENDPOINT_DOC_UPLD + "external/v1/document/otpvalidate",
      data,  { headers: headers }
    );
    
  }





}
