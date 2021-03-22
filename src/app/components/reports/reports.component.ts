import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { ApiService } from 'src/app/core/services/api.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  selectedValue: string;
  // searchBy = 'DELHI-11';
  departmentList = [];
  vendorDepartment = ''
  contractList = [];
  contractType = '';
  reportName = 'ASSOCIATE_CONTRACT_ASSOCIATE_LEVEL_REPORT';
  reportFormat = 'pdf'
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getReference();
    const sw_branchId = JSON.parse(sessionStorage.getItem("switchBranchWith"))
    console.log('sw_branchId', sw_branchId);
  }
  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  getReference() {
    this.spinner.show();
    this.apiService.getReportRefrence().subscribe((res: any) => {
      console.log('res', res);
      if (res.data.referenceData) {
        this.departmentList = res.data.referenceData.assocDeptList;
        this.vendorDepartment = this.departmentList[0].id;
        this.contractList = res.data.referenceData.assocCntrTypeList;
        // console.log('contract list', this.contractList);
        this.contractList = this.contractList.filter(ref => ref.lookupVal === "AIRFREIGHT");
        // console.log('contract list', this.contractList);
        this.contractType = this.contractList[0].id;
      }
      this.spinner.hide();
    }, (err: any) => {
      this.spinner.hide();
    })
  }

  submit() {
    const body = {
      contractType: String(this.contractType),
      reportFormat: this.reportFormat,
      reportName: this.reportName,
      searchBy: this.finalObj.branchId,
      vendorDepartment: String(this.vendorDepartment)
    }
    this.spinner.show();
    this.apiService.getReportDownload(body).subscribe((res:any)=>{
      console.log('res', res);
      // this.spinner.hide();
      // this.router.navigate(["/retail-contract/retail"]);
      let filename = `Airfreight_${
        this.reportName
      }__report_${new Date().getTime()}.${
        this.reportFormat
      }`.toLowerCase();
      var a = document.createElement("a");
      var blob = new Blob([res], { type: "octet/stream" });
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
      this.spinner.hide();

    },(err:any)=>{
      this.spinner.hide();
    })

  }
  
  
   // search by branch
   searchBy = [{id: 2238, lookupVal: "REGION", descr: "REGION"},{id: 2237, lookupVal: "AREA", descr: "AREA"},{id: 2236, lookupVal: "BRANCH", descr: "BRANCH"}];
   searchByVal = "ALL";
   branchArr = [];
   search_branch = "";
   branchFlg = false;
   finalObj = {
     searchBy:'',
     branchName:'',
     branchId:'',
   }
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
       this.apiService
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
   //
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
   //
   branchSearchId;
   runBranchSearch() {
     let item = this.branchArr.find((v) => v.branchId == this.branchSearchId);
     console.log(item);
     this.finalObj.branchId = item.branchId;
     this.finalObj.branchName = item.branchName;
   }
 
 //
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
      //  this.spinner.show();
       this.apiService.manualSearch(this.searchVal).subscribe((data) => {        
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

}
