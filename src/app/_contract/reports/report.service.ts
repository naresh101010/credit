import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ReportService {
  constructor(private httpClient: HttpClient) {}

  API_ENDPOINT_REPORT = JSON.parse(sessionStorage.getItem("config")).shared
    .API_ENDPOINT_REPORT;

  // 'branchtype', this.searchByVal
  getCall(first, second?) {
    return this.httpClient.get<any>(
      this.API_ENDPOINT_REPORT + "/secure/v1/reports/" + first + "/" + second
    );
  }

  manualSearch(branchName) {
    return this.httpClient.get<any>(
      this.API_ENDPOINT_REPORT + "/secure/v1/reports/branchName/" + branchName
    );
  }
}
