
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { AssignVehicleComponent } from 'src/app/dialog/assign-vehicle/assign-vehicle.component';
import { SearchBranchComponent } from 'src/app/dialog/search-branch/search-branch.component';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSetting } from 'src/app/app.setting';
import { DatePipe } from '@angular/common';
import { AuthorizationService } from '../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { confimationdialog } from 'src/app/dialog/confirmationdialog/confimationdialog';

@Component({
  selector: 'app-branch-allocation',
  templateUrl: './branch-allocation.component.html'
  
  providers: [ApiService, DatePipe]
})
export class BranchAllocationComponent implements OnInit {
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  displayedColumns: string[] = ['branchName', 'branchType', 'effectiveDt', 'expDt', 'Avehicle', 'delete'];
  dataSource: any;
  SearchType;
  userBranch;
  DefaultB;
  todaydate;
  branches = [];  
  tempArr = [];
  existBranch = [];
  referenceData;
  editflow;
  perList:any=[];
  exAttrMap = new Map();
  exAttrKeyList =  [];
  flag: boolean = false;

  constructor(public dialog: MatDialog, private toast: ToastrService, private apiSer: ApiService, private SpinnerService: NgxSpinnerService, public router: Router, private acRoute:ActivatedRoute, public datePipe: DatePipe,
              private authorizationService : AuthorizationService,
              private permissionsService: NgxPermissionsService) { }

  ngOnInit() {

    this.authorizationService.setPermissions('VEHICLE');
    this.perList = this.authorizationService.getPermissions('VEHICLE') == null ? [] : this.authorizationService.getPermissions('VEHICLE');
    this.authorizationService.setPermissions('BRANCH');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('BRANCH'));
    this.permissionsService.loadPermissions(this.perList);
    this.exAttrMap = this.authorizationService.getExcludedAttributes('BRANCH ALLOCATION');
    this.exAttrKeyList = Array.from(this.exAttrMap.values());
    console.log('Attribute List', this.exAttrKeyList);
    console.log('perlist',this.perList)

    this.getAllBranchWithCtr();
    this.getAllVehicle();
    this.acRoute.params.subscribe(x => {
      if(x.editflow){
        this.editflow = x.editflow;
      }
      
    })
    
  }

  getAllVehicle(){
    this.tempArr = [];
    this.SpinnerService.show();
    let associateId = AppSetting.associateId;
    this.apiSer.get(`secure/v1/associates/vehicles/associate/${associateId}`).subscribe(res => {
      this.tempArr = [];
      if (res && res.data) {
        let newtemp = res.data.responseData;
        newtemp.forEach(element => {
          // Market Flag for Veicle  is false vendorMktFlag
          if(!element.vendorMktFlag){
            this.tempArr.push(this.setVehicle(element, res.data.referenceData))
          }         
        });
      }
    });
    this.SpinnerService.hide();
  }
  backupBranch:any;
  getAllBranchWithCtr(){
    this.SpinnerService.show();
    let contractId = AppSetting.contractId;
    this.apiSer.get(`secure/v1/bookingcontract/contracts/branches/${contractId}`).subscribe(res => {
      if (res && res.data) {
        this.existBranch = res.data.responseData;
        this.backupBranch = JSON.parse(JSON.stringify(this.existBranch))
        this.referenceData = res.data.referenceData;
        this.branches = this.existBranch;
        if (this.existBranch && this.existBranch.length > 0) {
          this.existBranch.forEach(element => {
            element.effectiveDate_min = new Date(element.effectiveDt);
            console.log('Eff Date', element.effectiveDt);
            let e = new Date(element.effectiveDt);
            e.setDate(e.getDate()+1);
            element.expiryDate_min = e;
            // element.expiryDate_min = new Date(element.expDt);
            element.effectiveDate_max = null;
            // expiry
            element.expiryDate_max = null;
            element.checked = true;

            element.assocBranchVehicles.forEach(obj => {
              obj.checked = true;
            });
          });
        }
        this.dataSource = new MatTableDataSource(this.existBranch);
        this.dataSource.sort = this.sort;
      }
    });
    this.SpinnerService.show();
  }

  openSearchBranchModal() {
    console.log(this.existBranch)
    const dialogRef = this.dialog.open(SearchBranchComponent, {
      data: { data: this.branches, referenceData: this.referenceData },
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.searchType) {
        this.SearchType = result.searchType
      }
      if (result != undefined && result.userBranch) {
        this.userBranch = result.userBranch; // Defult Branch Data
        this.DefaultB = result.defaultBranch;   // Defult Branch Data
      }
      if (result != undefined && result.defaultBranch) {
        let existBranch = [];
        result.defaultBranch.forEach(element => {
            this.setBranchWithVecle(element);
        });
        if (existBranch.length > 0) {
          this.toast.warning(`Branch Name  ${existBranch} already exists in List`);
        }

      }
      if(result.defaultBranch){
        this.branches = result.defaultBranch;
        this.existBranch = this.branches;
        this.dataSource = new MatTableDataSource(this.branches);
        this.dataSource.sort = this.sort;
        console.log('this.branches', this.branches);
      }

    });

  }
  trackById(index, item) {
    console.log(item.branchId);
    return item.branchId;
  }

  ngOnChanges(changes: any) {
    if (changes.groupingTabValid) {
        if (changes.groupingTabValid.currentValue !== changes.groupingTabValid.previousValue) {
          
            // this.groupingTabValidChange.emit(this.groupingTabValid);
        }
    }
}

  setBranchWithVecle(element) {  
    if(!element.assocCntrId){ 
      element.assocBranchVehicles = [];
      element.assocCntrId = AppSetting.contractId;
      element.effectiveDate_min = new Date();
      let e = new Date();
      e.setDate(e.getDate()+1);
      element.expiryDate_min = e;
    }else{
      element.effectiveDate_min = new Date(element.effectiveDt);
      let e = new Date(element.effectiveDt);
      e.setDate(e.getDate()+1);
      element.expiryDate_min = e;
    }

    element.effectiveDate_max = null;
    element.expiryDate_max = null;
    
  }

  checkInPriviArry = (objArray, val) => {
    for (var i = 0; i < objArray.length; i++) {
      if (objArray[i].branchId == val.branchId) {
        return true;
      }
    }
    return false;
  };

  submit(btnName) {
    this.branches.forEach(element => {
      if(!element.id){
        this.backupBranch.forEach(obj => {
          console.log('id>>', obj.branchId, element.branchId);
          if(obj.branchId == element.branchId){            
            element.id = obj.id;
              element.assocBranchVehicles.forEach(elementvel => {
                obj.assocBranchVehicles.forEach(objVel => {
                  console.log('vehicleId>>', objVel.vehicleId, objVel.vehicleId);
                  if(objVel.vehicleId == elementvel.vehicleId){            
                    elementvel.id = objVel.id;
                  }
                });
              });
          }
        });
      }
    })
      this.apiSer.post(`secure/v1/bookingcontract/contracts/branches`, this.branches).subscribe((res) => {
      if(res.data.responseData){
        this.toast.success('Saved Successfully');
        if(btnName == 'next'){
          if(this.editflow){
            this.router.navigate(['asso_booking-contract/booking-payout',{ steper:true,'editflow': 'true' }], {skipLocationChange: true});
          }else{
            this.router.navigate(['asso_booking-contract/booking-payout'], {skipLocationChange: true});
          }
        }else {
          // this.getAllBranchWithCtr();
          // this.getAllVehicle();
          this.ngOnInit();
        }
      }
    }, (err) =>{
      debugger
      this.toast.error(err.error.errors.error[0].code + ' : ' + err.error.errors.error[0].description );
    })
  }

  nextReadMode() {
    if(this.editflow){
      this.router.navigate(['asso_booking-contract/booking-payout',{ steper:true,'editflow': 'true' }], {skipLocationChange: true});
    }else{
      this.router.navigate(['asso_booking-contract/booking-payout'], {skipLocationChange: true});
    }
  }

  validationBranchCheck(btnName){
    let cntrId = String(AppSetting.contractId);
   let listBranchIds =  this.branches.map( obj=> {
      return  obj.branchId;
    });
    let branchMap = {};
    branchMap[cntrId] = [...listBranchIds];

    this.apiSer.post(`secure/v1/bookingcontract/validBranches/`, branchMap).subscribe(
      res => {
        let listBranchNames = [];
        if (res && res.data && res.data.responseData) {
          if (res.data.responseData.length > 0) {
            this.branches.forEach(element => {
              res.data.responseData.filter(obj => {
                if (obj == element.branchId) {
                  listBranchNames.push(element.branchName);
                }
              });

            });
            this.toast.error('Not a Valid Branch, Already Allocated ! ', listBranchNames.toString());
          } else {
            this.submit(btnName);
          }
        }
      },
    );
  }
  setVehicle(obj, ref) {
    if(ref){
      ref.vehicleModelList.forEach(element => {
        if(obj.vehicleModelId == element.id){
          obj.vehicleModel = element.vehicleModelName
        }
      });
    }
    let temp = {
      "branchName": [
        "string"
      ],
      // "id" : obj.id,
      "refBranchName": obj.refBranchName,
      "status": obj.status,
      "vehicleId": obj.id,
      "vehicleModel": obj.vehicleModel,
      "vehicleNumber": obj.vehicleNum,
      "vehicleTonnge": obj.vehicleTonnge ? obj.vehicleTonnge : obj.modelCargoCapacity ,
      "checked": false
    }
    // if(obj.id){
    //   temp['id'] = obj.id;
    // }
    return temp;

  }

  openAssignVehicleModal(obj) {
    console.log('this.tempArr', this.tempArr);
    const vehicle = JSON.parse(JSON.stringify(this.tempArr));
    const dialogRef = this.dialog.open(AssignVehicleComponent, {
      data: { 'tempVehicle': vehicle, 'obj': obj },
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result);
    })

  }

  deleteBranchDialog(element) {
    const dialog = this.dialog.open(confimationdialog, {
      data: { message: "Are you sure want to delete?" },
      disableClose: true,
      panelClass: 'creditDialog',
      width: '300px'
    });

    dialog.afterClosed().subscribe(response => {
      if(response) {
        this.dataSource.data = this.branches = this.branches.filter(function( obj ) {
          return obj.branchId !== element.branchId;
      });
      }
    })
  }

  validateVehicle(): boolean{
    let flag = false
    if (this.branches.length == 0){
      return flag = true;
    }
    this.branches.forEach(obj => {
      if (obj.effectiveDt) {
        if(!obj.assocBranchVehicles || obj.assocBranchVehicles.length == 0){
          return flag = true;
        }
      } else {
        return flag = true;
      }

    })
    return flag;
  }

  editInput(element){
    if(this.editflow){
      element.status = AppSetting.editStatus;
    }
  }

  effectiveDate(isExpToUpdate, element) {
    let effYear = parseInt(this.datePipe.transform(element.effectiveDt, 'yyyy'))
    if (effYear > 9999) {
      element.effectiveDt = "";
    } else {
    let a = this.datePipe.transform(element.effectiveMinDt, 'yyyy-MM-dd')
    let b = this.datePipe.transform(element.effectiveDt, 'yyyy-MM-dd')
    let c = this.datePipe.transform(element.expDt, 'yyyy-MM-dd')
    if(c && a){
      if (a <=b && b < c) {
        element.isValidEffectiveDt = false;
      }
      else {
        element.isValidEffectiveDt = true;
      }
    }
    else if(c){
      if (b < c) {
        element.isValidEffectiveDt = false;
      }
      else {
        element.isValidEffectiveDt = true;
      }
    }else if(a){
      if (b >= a) {
        element.isValidEffectiveDt = false;
      }
      else {
        element.isValidEffectiveDt = true;
      }
    }else{
      element.isValidEffectiveDt = false;
    }
    if(b){
      let e = new Date(b);
      e.setDate(e.getDate()+1);
      element.expMinDt = e;
    }

    // increment exp date by one year
    if(isExpToUpdate && b && !element.isValidEffectiveDt){
      let f = new Date(b);
      f.setFullYear(f.getFullYear()+1);
      element.expDt = f;
    }
  }
  this.expDate(element);
  }
  
  expDate(element) {
    let expYear = parseInt(this.datePipe.transform(element.expDt, 'yyyy'))
    if (expYear > 9999) {
      element.expDt = "";
    } else {
    let a = this.datePipe.transform(element.effectiveMinDt, 'yyyy-MM-dd')
    let b = this.datePipe.transform(element.effectiveDt, 'yyyy-MM-dd')
    let c = this.datePipe.transform(element.expDt, 'yyyy-MM-dd')

    if (c) {
      if(b){
        if (b < c) {
          element.isValidExpDt = false;
          this.flag = false;
        }
        else {
          element.isValidExpDt = true;
          this.flag = true;
        }
      } else if(a){
        if ( a < c) {
          element.isValidExpDt = false;
        }
        else {
          element.isValidExpDt = true;
        }
      }else{
        element.isValidExpDt = false;
      }
    }

    if(c){
      var e = new Date(c);
      e.setDate(e.getDate()-1);
      element.maxdate = e;
    }
  }
  }
}


