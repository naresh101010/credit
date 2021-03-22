import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { ApiService } from 'src/app/core/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppSetting } from 'src/app/app.setting';
import { AuthorizationService } from '../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { confimationdialog } from '../confirmationdialog/confimationdialog';

@Component({
  selector: 'app-search-branch',
  templateUrl: './search-branch.component.html',
  styleUrls: ['./search-branch.component.css'],
  providers: [ApiService]
})
export class SearchBranchComponent implements OnInit {
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
  advancepincode: boolean = false;
  nameSearchInbox: boolean = false;
  arr = [];
  referenceData;
  perList:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog, private apiSer: ApiService, private SpinnerService: NgxSpinnerService, private httpservice: HttpClient, public router: Router, private toast: ToastrService, public dialogRef: MatDialogRef<SearchBranchComponent>,private authorizationService : AuthorizationService,
  private permissionsService: NgxPermissionsService) { }

  ngOnInit() {
    this.authorizationService.setPermissions('VEHICLE');
    this.perList = this.authorizationService.getPermissions('VEHICLE') == null ? [] : this.authorizationService.getPermissions('VEHICLE');
    this.authorizationService.setPermissions('BRANCH');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('BRANCH'));
    this.permissionsService.loadPermissions(this.perList);

    console.log('perlist',this.perList)
    this.model.search = 'NAME';
    this.referenceData = this.data.referenceData;
    this.referenceData.statusList.forEach(element => {
      if(element.lookupVal == "ACTIVE"){
        this.activeStatus = element.id;
      }
    });
  }


  advanceFlag() {
    this.searchBranchFlag = true;
  }

  setExistBranch(tableDataObj) {
   let addArrElement = [];
    let tempTable = tableDataObj;
    let previousData = [...this.data.data]
    if (this.data.data && this.data.data.length > 0) {
        previousData.forEach(element => {
        tempTable.forEach(objTemp => {
          // console.log('element', element);
          // objTemp.status = this.activeStatus;
          if (objTemp.branchId == element.branchId) {
            objTemp.checked = true;
            element.exist = true;
            objTemp.id = element.id;
            objTemp.status = element.status;
            objTemp.assocBranchVehicles = element.assocBranchVehicles;
            objTemp.assocCntrId = element.assocCntrId;
            objTemp.expDt = element.expDt;
            objTemp.effectiveDt = element.effectiveDt;
          }else{
            element.checked = true;
            // element.expDt = element.expDt;
            // element.effectiveDt = element.effectiveDt;
          }
        });
      });
      addArrElement = previousData.filter(newObj => !newObj.exist);
    }
    this.tableData.responseData = [...tempTable, ...addArrElement];
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
  //default Branch Advance Search




  advanceDefaultBranchName(obj) {
    let contractId = AppSetting.contractId;
    if (obj.length > 2) {
      if (this.model.search == "NAME") {
        let searcgObj = this.model.searchbyname.toUpperCase();
        this.SpinnerService.show();
        this.apiSer.get(`secure/v1/branches/branchName/${searcgObj}/${contractId}`).subscribe(
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

              this.setExistBranch(this.tableData.responseData);
              this.branchStatus();
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
      } else {
        this.SpinnerService.show();
        this.apiSer.get(`secure/v1/branches/branchtype/${this.model.searchByType.$ngOptionLabel}`).subscribe(
          data => {
            this.arr = [];
            this.advanceArea = data.data;
            this.tableData = data.data;
            this.SpinnerService.hide();
          });
      }
    }
  }

  advanceDefaultBranchArea() {
    this.arr = [];
    this.tableData = [];
    this.areaDataByName = [];
    this.tableData.responseData = [];
    if (this.model.search != "NAME") {
      if (this.model.search == "TYPE") {
        this.SpinnerService.show();
        this.apiSer.get(`secure/v1/branches/types`).subscribe(
          data => {
            if (data.status == 'SUCCESS') {
              this.areaDataByName = data.data;
              this.SpinnerService.hide();
            }
            else {
              this.toast.error(data.message, data.code);
              this.SpinnerService.hide();
            }
          }, error => {
            this.toast.error(error.error.errors.error[0].description);
            this.SpinnerService.hide();
          });
      }
      else if (this.model.search != "PINCODE") {
        this.SpinnerService.show();
        let contractId = AppSetting.contractId;
        this.apiSer.get(`secure/v1/branches/branchtype/${this.model.search}/${contractId}`).subscribe(
          data => {
            if (data.status == 'SUCCESS') {
              this.areaDataByName = data.data;
              this.SpinnerService.hide();
            }

            else {
              this.toast.error(data.message, data.code);
              this.SpinnerService.hide();
            }
          },
          error => {
            this.toast.error(error.error.errors.error[0].description);
            this.SpinnerService.hide();
          }
        );
      }
    }
  }

  advanceDefaultBranchAreaById() {
    let contractId = AppSetting.contractId;
    this.SpinnerService.show();
    this.apiSer.get(`secure/v1/branches/${this.model.search}/${this.model.areaId.branchId}/${contractId}`)
      .subscribe(data => {
        if (data.status == 'SUCCESS') {
          this.arr = [];
          this.tableData = data.data;
          this.SpinnerService.hide();
          this.tabledataLength = this.tableData.responseData.length;
          
          this.setExistBranch(this.tableData.responseData);
          this.branchStatus();
        }
        else {
          this.tableData = [];
          this.arr = [];
          this.toast.error(data.message, data.code);
          this.SpinnerService.hide();
        }
      },
        Error => {
          this.tableData.responseData = [];
          this.toast.error(Error.error.errors.error[0].description);
          this.SpinnerService.hide();
        });
  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }


  filterDataByAreaList($event, data) {
    if ($event.checked == false) {
      const dialog = this.dialog.open(confimationdialog, {
        data: { message: "Do you want to delete branch?"},
        disableClose: true,
        panelClass: 'creditDialog',
        width: '300px'  
      });

      dialog.afterClosed().subscribe(res => {
        if(res) {
          console.log('res', res)
          // this.finalAreaData.splice(i, 1);
          this.finalAreaData.forEach((element, i) => {
            this.finalAreaData.splice(i, 1);
          });
          
        } else if(res === false && data.checked === false) {
          $event.checked = true;
          data.checked = true;
          data.addOrRemoveOrUpdate = "Add";
          this.finalAreaData.push(data);
        }
        console.log('The dialog was closed with pinocde ' ,res);
      })         
    }
    if ($event.checked == true) {
      data.addOrRemoveOrUpdate = "Add";
      this.finalAreaData.push(data)
    }
  }

  advanceDefaultBranchRegionById(data1) {
    let contractId = AppSetting.contractId;
    this.SpinnerService.show();
    this.apiSer.get(`secure/v1/branches/${this.model.search}/${this.model.searchByRegion.branchId}/${contractId}`)
      .subscribe(data => {
        if (data.status == 'SUCCESS') {
          this.arr = [];
          this.tableData = data.data;
          this.SpinnerService.hide();
          this.tabledataLength = this.tableData.responseData.length;
          
          this.setExistBranch(this.tableData.responseData);
          this.branchStatus();
        }
        else {
          this.tableData = [];
          this.arr = [];
          this.toast.error(data.message, data.code);
          this.SpinnerService.hide();
        }
      },
        Error => {
          this.tableData.responseData = [];
          this.toast.error(Error.error.errors.error[0].description);

          this.SpinnerService.hide();
        });
  }

  advanceDefaultBranchTypeById(data1) {
    let contractId = AppSetting.contractId;
    this.SpinnerService.show();
    this.apiSer.get(`secure/v1/branches/branchtype/${this.model.searchByType}/${contractId}`)
      .subscribe(data => {
        if (data.status == 'SUCCESS') {
          this.arr = [];
          this.tableData = data.data;
          this.SpinnerService.hide();
          this.tabledataLength = this.tableData.responseData.length;
         
          this.setExistBranch(this.tableData.responseData);
          this.branchStatus();
        }
        else {
          this.arr = [];
          this.tableData = [];
          this.toast.error(data.message, data.code);
          this.SpinnerService.hide();
        }
      },
        Error => {
          this.tableData.responseData = [];
          this.toast.error(Error.error.errors.error[0].description);
          this.SpinnerService.hide();
        });
    this.SpinnerService.hide();
  }

  advanceDefaultBranchPincode() {
    if (this.model.searchbypincode && this.model.searchbypincode.length >= 3) {
      this.SpinnerService.show();
      this.apiSer.get(`secure/v1/branches/pincodes/${this.model.searchbypincode}`
      )
        .subscribe(data => {
          if (data.status == 'SUCCESS') {
            this.pinCodeList = data.data;
            this.SpinnerService.hide();
            this.pinCodeDataLength = this.pinCodeList.responseData.length;
            if (this.pinCodeDataLength == 0) {
              this.toast.info('Data Not found');
              this.advancepincode = false;
            } else {
              this.advancepincode = true;
            }
          }
          else {
            this.toast.error(data.message, data.code);
            this.advancepincode = false;
            this.SpinnerService.hide();
          }
        });
    }
    else {
      console.log('err')
    }
  }

  advanceDefaultBranchPincodeByPincode(modle) {
    let contractId = AppSetting.contractId;
    this.apiSer.get(`secure/v1/branches/pincode/${this.model.apincode.pincode}/${contractId}`
    )
      .subscribe(data => {
        if (data.status == 'SUCCESS') {
          this.arr = [];
          this.tableData = data.data;
          this.tabledataLength = this.tableData.responseData.length;
          this.advancepincode = false;
          this.SpinnerService.hide();
          if (this.tabledataLength == 0) {
            this.toast.error('Branches for ' + this.model.apincode.pincode + ' pincode are not active in propel-i', 'RECORD_NOT_FOUND');
            this.advancepincode = false;
            this.tableData = [];
          }
          else {
           
            this.tableData.responseData.forEach(element => {
              if (element.branchType == 'REGION') {
                element.regionBranch = element.branchName;
              }
              else if (element.branchType == 'CORPORATE') {
                element.regionBranch = '';
              }
            });
            this.setExistBranch(this.tableData.responseData);
            this.branchStatus();
          }

        } else {
          this.arr = [];
          this.tableData = [];
          this.toast.error(data.error.error[0].description);
          this.advancepincode = false;
          this.SpinnerService.hide();
        }
        this.SpinnerService.hide();
      }, error => {
        this.tableData.responseData = [];
        this.advancepincode = false;
        this.SpinnerService.hide();
        this.toast.error(error.error.errors.error[0].description);
      }
      );

  }

  pincode() {
    this.advancepincode = true;
  }

  branchStatus(){
    this.tableData.responseData.forEach(element => {
      element.status = element.status == 1 ? this.activeStatus : element.status;
    });
  }
  activeStatus = 1409;
  // end of pincode

  allocateAreaData() {
    let defaultBranch = this.tableData.responseData.filter(obj => obj.checked);
    let searchTypedata = this.model.search;
    this.dialogRef.close({ defaultBranch, searchTypedata });
  }

  selectAll($event, table) {
    console.log("event detail", $event , "table detail",table)
    if ($event.checked == true) {
      table.forEach(element => {
        this.filterDataByAreaList($event, element);
        element.checked = $event.checked;
      });
    }
    else if ($event.checked == false) {
      table.forEach(element => {
        element.checked = false;
        this.finalAreaData.splice(element, 1);
      });
    }
  }
  //default Branch Advance for Area Region
  //dropdown list for advance Default Branch Name


  onChangeValue(val) {
    // this.model.search;

  }

  //for input box change

  inputFlag(val) {
    if (this.model.serach == 'NAME') {
      this.nameSearchInbox = true;
    }
  }

  onChangeValueforBranch() {
    // this.branchWild;
  }
  filterEntity() {
    let userBranch: any;
    let defaultBranch: any = []
    defaultBranch = this.twoAPIdata.data;
    userBranch = this.branchWild;
    this.dialogRef.close({ defaultBranch });
  }

  filterByArea(data) {
    for (let advaneAreaFilter of this.advanceArea) {
      if (advaneAreaFilter == this.model.area) {
        this.tableData.push(advaneAreaFilter)
      }
    }
  }

  filterByType(data) {
    for (let advanceTypeFilter of this.advanceArea) {
      if (advanceTypeFilter == this.model.area) {
        this.tableData.push(advanceTypeFilter)
      }
    }
  }


  filterByValue(array, string) {
    return array.filter(o => Object.keys(o).some(k => o.branchCode.toLowerCase().includes(string.toLowerCase())));
  }


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

  closeDialog(): void {
    this.dialogRef.close();
  }


}