import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppSetting } from 'src/app/app.setting';
import { AuthorizationService } from '../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { confimationdialog } from '../confirmationdialog/confimationdialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dashboard-branch-search',
  templateUrl: './dashboard-branch-search.component.html',
  styleUrls: ['./dashboard-branch-search.component.css']
})
export class DashboardBranchSearchComponent implements OnInit {
  searchVal : string;
  showData: any = [];
  tableData: any = [];
  arr = [];
  twoAPIdata: any;
  tabledataLength;
  statusList : any;
  activeStatus : number;
  selectedBranch : number;
  searchBy : string = "NAME";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog, private apiSer: ApiService, private SpinnerService: NgxSpinnerService, private httpservice: HttpClient, public router: Router, private toast: ToastrService,
   public dialogRef: MatDialogRef<DashboardBranchSearchComponent>,private authorizationService : AuthorizationService,
  private permissionsService: NgxPermissionsService) { }

  ngOnInit() {

    this.statusList = this.data.statusList;
    this.statusList.forEach(element => {
      if(element.lookupVal == "ACTIVE"){
        this.activeStatus = element.id;
      }
    });
  }

  advanceDefaultBranchName(obj) {
    if (obj.length > 2) {

        let searcgObj = this.searchVal.toUpperCase();
        this.SpinnerService.show();
        this.apiSer.get(`secure/v1/branches/branchName/${searcgObj}`).subscribe(
          data => {
            if (data.status == 'SUCCESS') {
              this.arr = [];
              this.twoAPIdata = data.data;
              this.tableData = data.data;
              
              this.SpinnerService.hide();
              this.tableData.responseData.forEach(element => {
                if (element.branchType == 'REGION') {
                  element.regionBranch = element.branchName;
                }
                else if (element.branchType == 'CORPORATE') {
                  element.regionBranch = '';
                }
              });

              this.setExistBranch();
              //this.branchStatus();
              this.tabledataLength = this.tableData.responseData.length
              for (let advanceValue of this.twoAPIdata.responseData) {
                this.showData.push(advanceValue);
              }
            }
            else {
              this.tableData = [];
              this.arr = [];
              this.SpinnerService.hide();
              this.toast.error(data.message, data.code);
            }
          },
          error => {
            this.tableData.responseData = [];
            this.toast.error(error.error.errors.error[0].description);
            this.SpinnerService.hide();
          });
    
    }
  }

  setExistBranch() {
     if (this.tableData.responseData && this.tableData.responseData.length > 0) {
       this.tableData.responseData.sort((a, b) => {
         const branchNameA = a.branchName.toUpperCase();
         const branchNameB = b.branchName.toUpperCase();
         let comparison = 0;
         if (branchNameA > branchNameB) {
           comparison = 1;
         } else if (branchNameA < branchNameB) {
           comparison = -1;
         }
         return comparison;
       });
     }
     this.branchStatus();
   }

   branchStatus(){
    this.tableData.responseData.forEach(element => {
      element.status = element.status == 1 ? this.activeStatus : element.status;
    });
  }

  /*----- search table data ---*/
  branchDataFilter(filterValue: string) {
    if (this.tableData.length >= 0) {
      if (this.arr.length == 0) {
        this.arr = [...this.tableData];
      }
      this.tableData = [];
      this.tableData = this.filterByValue(this.arr, filterValue);
    } else {
      if (this.arr.length == 0) {
        this.arr = [...this.tableData.responseData];
      }
      this.tableData.responseData = [];
      this.tableData.responseData = this.filterByValue(this.arr, filterValue);
    }
  }

  filterByValue(array, string) {
    return array.filter(o => Object.keys(o).some(k => o.branchCode.toLowerCase().includes(string.toLowerCase())));
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitBranchID() {
      this.dialogRef.close(this.selectedBranch);
  }

}
