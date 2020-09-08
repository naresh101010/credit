import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NgxSpinnerService } from "ngx-spinner";

import { ReportService } from "./report.service";
import { ToastrService } from "ngx-toastr";
import { ErrorConstants } from "../models/constants";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["../core.css"],
})
export class ReportsComponent implements OnInit {
  constructor(
    private tosterService: ToastrService,
    private httpClient: HttpClient,
    private reportService_: ReportService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    // this.downloadFile();
    this.getdropDown();
  }

  offering_wiseVal;
  business_typeVal;
  record_typeVal;
  service_lineVal;

  searchCtrlZone2;
  advanceSearchVal;
  model1;

  finalObj = {
    branchId: null,
    branchName: "",
    businessTypeId: 0,
    businessTypeName: "",
    offeringId: 0,
    offeringName: "",
    recordTypeId: 0,
    recordTypeName: "",
    reportFormat: "pdf",
    reportName: "",
    reportTypeId: 0,
    reportTypeName: "",
    searchBy: "",
    serviceLineId: 0,
    serviceLineName: "",
  };

  // search by branch
  searchBy = [];
  searchByVal = "ALL";
  branchArr = [];
  search_branch = "";
  branchFlg = false;

  runSearchBy() {
    this.threeChar = true;
    this.finalObj.searchBy = this.searchByVal;
    this.finalObj.branchName = "";
    this.finalObj.branchId = null;
    this.searchArr = [];
    this.branchSearchId = "";
    if (this.searchByVal == "AREA" || this.searchByVal == "REGION") {
      this.branchFlg = true;
      this.spinner.show();
      this.reportService_
        .getCall("branchtype", this.searchByVal)
        .subscribe((data) => {
          this.spinner.hide();
          console.log(data);
          let res = data.data.responseData.sort(this.compare_branchName);
          this.branchArr = res;
        });
    } else {
      this.branchFlg = false;
    }
  }

  searchArr = [];
  searchVal = "";
  threeChar = true;
  reqMsgSearchBran = false;
  noRecordFound = false;

  manualSearch($event) {
    if (!$event.target.value) {
      this.reqMsgSearchBran = true;
    } else {
      this.reqMsgSearchBran = false;
    }

    if (this.searchVal.length >= 3) {
      this.threeChar = false;
      this.spinner.show();
      this.reportService_.manualSearch(this.searchVal).subscribe((data) => {
        debugger;
        if (data.data) {
          this.noRecordFound = false;
          this.spinner.hide();
          let res = data.data.responseData.sort(this.compare_branchName);
          this.searchArr = res;
        } else {
          this.noRecordFound = true;
          this.spinner.hide();
        }
      });
    } else {
      this.searchArr = [];
      this.threeChar = true;
      this.finalObj.branchId = "";
      this.finalObj.branchName = "";
    }
  }
  searchArrValue = "";

  advnSearchReq = false;
  manualSel(e) {
    console.log(e);
    let findItem = this.searchArr.find(
      (item) => item.branchId == this.searchArrValue
    );

    this.finalObj.branchId = findItem.branchId;
    this.finalObj.branchName = findItem.branchName;
  }
  onBlur() {
    console.log("ssd");
  }

  branchSearchId;
  runBranchSearch() {
    let item = this.branchArr.find((v) => v.branchId == this.branchSearchId);
    console.log(item);
    this.finalObj.branchId = item.branchId;
    this.finalObj.branchName = item.branchName;
  }

  // helper function
  compare_lookup(a, b) {
    // a should come before b in the sorted order
    if (a.lookupVal < b.lookupVal) {
      return -1;
      // a should come after b in the sorted order
    } else if (a.lookupVal > b.lookupVal) {
      return 1;
      // and and b are the same
    } else {
      return 0;
    }
  }

  compare_branchName(a, b) {
    // a should come before b in the sorted order
    if (a.branchName < b.branchName) {
      return -1;
      // a should come after b in the sorted order
    } else if (a.branchName > b.branchName) {
      return 1;
      // and and b are the same
    } else {
      return 0;
    }
  }

  compare_serviceOffering(a, b) {
    // a should come before b in the sorted order
    if (a.serviceOffering < b.serviceOffering) {
      return -1;
      // a should come after b in the sorted order
    } else if (a.serviceOffering > b.serviceOffering) {
      return 1;
      // and and b are the same
    } else {
      return 0;
    }
  }
  //end helper functon
  //end search by branch

  // report type
  report_typeVal;
  report_type = [];
  search_reportType = "";
  reportType() {
    let item = this.report_type.find((v) => v.id == this.report_typeVal);
    this.finalObj.reportTypeId = item.id;
    this.finalObj.reportTypeName = item.lookupVal;
  }
  //end report type

  advanceSearch = [];

  // record type
  record_type = [];
  search_recordType = "";
  recordType() {
    let item = this.record_type.find((v) => v.id == this.record_typeVal);
    this.finalObj.recordTypeId = item.id;
    this.finalObj.recordTypeName = item.lookupVal;
  }
  // end record type

  // offering wise
  offering_wise = [];
  search_offeringType = "";

  offeringWise() {
    let item = this.offering_wise.find((v) => v.id == this.offering_wiseVal);
    this.finalObj.offeringId = item.id;
    this.finalObj.offeringName = item.serviceOffering;
  }

  // end offering wise

  // bussiness type
  business_type = [];
  search_businessType = "";
  bussinessType() {
    let item = this.business_type.find((v) => v.id == this.business_typeVal);
    this.finalObj.businessTypeId = item.id;
    this.finalObj.businessTypeName = item.lookupVal;
  }
  // end bussiness type

  // service line
  service_line = [];
  search_serviceType = "";
  serviceLine() {
    let item = this.service_line.find((v) => v.id == this.service_lineVal);
    this.finalObj.serviceLineId = item.id;
    this.finalObj.serviceLineName = item.lookupVal;
  }
  // end service line

  // file type
  fileTypes: Object[] = [
    { fileType: "pdf", checked: true },
    { fileType: "xls", checked: false },
  ];
  //end file type

  getdropDown() {
    this.spinner.show();
    this.reportService_.getCall("reference", "").subscribe(
      (data) => {
        this.spinner.hide();
        let res = data.data.referenceData;
        this.business_type = res.businessTypeList.sort(this.compare_lookup);
        this.record_type = res.recordTypeList.sort(this.compare_lookup);
        this.searchBy = res.searchByList.sort(this.compare_lookup);
        this.report_type = res.reportTypeList
          .filter((v) => {
            return v.lookupVal.indexOf("CREDIT") !== -1;
          })
          .sort(this.compare_lookup);
        this.service_line = res.serviceLineList.sort(this.compare_lookup);
        this.offering_wise = res.serviceOfferingList.sort(
          this.compare_serviceOffering
        );
      },
      (err) => {
        this.tosterService.error(
          "Error in fetching opportunity and billing data"
        );
        this.spinner.hide();
      }
    );
  }
  downloadFile() {
    this.spinner.show();
    let headers = {
      userId: "USER4",
      JourneyId: "3",
    };
    console.log("calling download service..");
    this.httpClient
      .post<any>(
        this.reportService_.API_ENDPOINT_REPORT + "/secure/v1/reports/",
        this.finalObj,
        { responseType: "blob" as "json", headers: headers }
      )
      .subscribe(
        (data: any) => {
          let filename = `cc_${
            this.finalObj.reportTypeName
          }__report_${new Date().getTime()}.${
            this.finalObj.reportFormat
          }`.toLowerCase();
          this.spinner.hide();
          console.log(data, "download file");
          var a = document.createElement("a");
          var blob = new Blob([data], { type: "octet/stream" });
          //for edge browser
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, filename);
            return;
          }
          var url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = filename;
          console.log(a);

          a.click();
          window.URL.revokeObjectURL(url);
        },
        (err) => {
          this.tosterService.error(ErrorConstants.errorNotFound);
          this.spinner.hide();
        }
      );
  }

  enableSub = true;

  validateField() {
    if (
      this.finalObj.businessTypeName == "" ||
      this.finalObj.offeringName == "" ||
      this.finalObj.reportTypeName == "" ||
      this.finalObj.recordTypeName == "" ||
      this.finalObj.branchName == ""
    ) {
      this.enableSub = true;
    } else {
      this.enableSub = false;
    }
  }

  scrollActiveValue() {
    let selectItem = document.getElementsByClassName("mat-selected")[0];
    setTimeout(() => {
      if (selectItem) {
        selectItem.scrollIntoView(false);
      }
    }, 500);
  }
}
