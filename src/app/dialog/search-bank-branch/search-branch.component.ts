import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { ApiService } from 'src/app/core/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthorizationService } from '../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { confimationdialog } from '../confirmationdialog/confimationdialog';

@Component({
  selector: 'app-search-branch',
  templateUrl: './search-branch.component.html',
  styleUrls: ['./search-branch.component.css'],
  providers: [ApiService]
})
export class SearchBankBranchComponent implements OnInit {
  model: any = {}
  branchWild: any = []
  model1: any = {}
  DefaultB: any;
  newdata: any = {}
  advanceDefaultName: any;
  advanceDefaultArea: any;
  advanceArea: any;
  pinCodeList: any = {}
  pinCodeDataLength: any;
  twoAPIdata: any;
  branchNameFilter: any = { branchName: '' };
  searchBranchFlag: boolean = false;
  showData: any = [];
  tableData: any = [];
  areaDataByName;
  tabledataLength;
  finalAreaData = [];
  checkedFinalId: any;
  filterBy;
  searchRegionType = '';
  searchAreaType = '';
  searchType = '';
  advance: any = []
  advanceSearchList: any = [
    { value: "NAME" },
    { value: "AREA", criteriaValue: "branchtype" },
    { value: "REGION", criteriaValue: "branchtype" },
    { value: "TYPE", criteriaValue: "branchtype" },
    { value: "PINCODE", criteriaValue: "PINCODE" }
  ];

  responseData: any;
  branchData: any;
  partyId: any;
  partyName: any;
  onLoadResponse: any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private apiSer: ApiService, private SpinnerService: NgxSpinnerService, private httpservice: HttpClient, public router: Router, private toast: ToastrService, public dialogRef: MatDialogRef<SearchBankBranchComponent>, private authorizationService: AuthorizationService,
    private spinner: NgxSpinnerService,
    private permissionsService: NgxPermissionsService,
    private appservice: ApiService) { }

  ngOnInit() {
    this.partyId = this.data.partyID;
    let bankName = this.data.bname;
    this.spinner.show();
    this.appservice.get(`secure/v1/fusion/cashbanks/branches/bankname/${bankName}`).subscribe(res => {
      this.onLoadResponse = res.data.responseData;
      this.tableData = res.data;
      this.spinner.hide();
    }, err => {
      this.toast.error('Please select bank first');
      this.spinner.hide();
    })
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  allocatedBranchData() {
    this.dialogRef.close({ data: this.branchData });
  }

  filterDataByAreaList(event, branch) {
    this.branchData = branch;
    console.log('branch', branch);
    console.log('event values', event);
  }

  filterByValue(array, string) {
    console.log('arr', array);
    return array.filter(o => Object.keys(o).some(k => o.BankBranchName.toLowerCase().includes(string.toLowerCase())));
  }


  arr = [];
  branchDataFilter(filterValue: string) {
    if (this.tableData.length >= 0) {
      if (this.arr.length == 0) {
        this.arr = [...this.tableData];
      }
      this.tableData = [];
      this.tableData = this.filterByValue(this.arr, filterValue);
    } else {
      if (this.arr.length == 0) {
        this.arr = [...this.onLoadResponse];
      }
      this.onLoadResponse = [];
      this.onLoadResponse = this.filterByValue(this.arr, filterValue);
    }
  }


}