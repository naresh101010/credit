import { NgxSpinnerService } from "ngx-spinner";
import { Component, Inject, OnInit } from "@angular/core";
import { BranchService } from "src/app/core/service/branch.service";
import { CommonService } from "src/app/core/common.service";

import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

@Component({
  selector: "app-search-branch",
  templateUrl: "./search-branch.component.html",
  styleUrls: ["./search-branch.component.css"],
})
export class SearchBranchComponent implements OnInit {
  constructor(
    private $branch: BranchService,
    private spinner: NgxSpinnerService,
    private common: CommonService,
    public dialogRef: MatDialogRef<SearchBranchComponent>,
    @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog,
  ) { }
  settimeout: any;
  ngOnInit() {
    this.branchList = this.data.branches;
    this.dataSource = new MatTableDataSource(this.branchList);
    if(this.branchList.length){
      this.spinner.hide();
    }
   this.getAllBranch();
  }
  selectedBranch;
  branchList: Array<any> = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    "radio",
    "waybill",
    "weight",
    "address",
    "status",
  ];
  getAllBranch() {
    
if(this.data.textName == 'Switch Branch'){
  this.$branch.getBranchDetails().subscribe((response) => {
    if (response) {
      this.spinner.hide();
      this.branchList = response;
      let sessionBranch = JSON.parse(sessionStorage.getItem('branchId'));
      this.branchList.forEach(el => {
        if (el.branchId == sessionBranch) {
          this.selectedBranch = sessionBranch;
        }
      });

      this.dataSource = new MatTableDataSource(this.branchList);
    }
  });
}
else{
  setTimeout(() => {
    this.branchList = this.data.branches;
  this.dataSource = new MatTableDataSource(this.branchList);
  }, 10);
}
  }
  cleartimeout() {
    clearTimeout(this.settimeout);
  }

  removeToast(snackbar = null) {
    if (!snackbar) {
      snackbar = document.getElementById("snackbar_module");
    }
    this.settimeout = setTimeout(() => {
      snackbar.style.animation = "fadeOut 0.5s linear";
      setTimeout(() => {
        snackbar.style.display = "none";
      }, 300);
    }, 3500);
  }

  checkBranchSelectedOrNot() {
    if (this.selectedBranch) {
      this.selectBranch();
    } else {
      this.common.showMessage("Please Select Branch", "danger");
    }
  }

  selectBranch() {
    sessionStorage.setItem("branchId", this.selectedBranch);
    this.branchList.forEach((elem) => {
      if (this.selectedBranch == elem.branchId) {
        sessionStorage.setItem("branchName", elem.branchName);
        sessionStorage.setItem('branchCode', elem.branchCode);
        sessionStorage.setItem('cutoffTime', elem.cutoffTime);
      }
    });
    this.dialogRef.close();
  }
  applyFilter(filterValue) {
    ;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
