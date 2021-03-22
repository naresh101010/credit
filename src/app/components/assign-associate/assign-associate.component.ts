import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ContractUpdateComponent } from 'src/app/dialog/contract-update/contract-update.component';
import { BookingAssociateContractUpdateComponent } from 'src/app/dialog/booking-associate-contract-update/booking-associate-contract-update.component';
import { ViewBranchesComponent } from 'src/app/dialog/view-branches/view-branches.component';
import { AppSetting } from '../../app.setting';
import { ApiService } from 'src/app/core/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorConstants } from 'src/app/core/models/constants';
import { DatePipe } from '@angular/common';
import { confimationdialog } from 'src/app/dialog/confirmationdialog/confimationdialog';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-assign-associate',
  templateUrl: './assign-associate.component.html',
  providers: [ApiService, DatePipe]
})
export class AssignAssociateComponent implements OnInit {

  constructor(public spinner: NgxSpinnerService, public dialog: MatDialog, private apiService: ApiService, private datePipe: DatePipe, public toastr: ToastrService, private router: Router,
    private authorizationService: AuthorizationService, private permissionsService: NgxPermissionsService,
    private acRoute: ActivatedRoute) { }
  nomatch: boolean = false;
  minchar: boolean = false;
  associateResData: any;
  associateRefData: any;
  selectedContractId: any;
  displayedColumns: string[] = ['AssoName', 'CrDate', 'VenDepartment', 'gst', 'pan', 'mobile'];
  dataSource: any;
  deptList = AppSetting.deptRefList;
  vehicleTypeList = [
    { lookupVal: "SCHEDULED" },
    { lookupVal: "MARKET VEHICLE" }
  ];
  assocData: any;

  assocTypeList: any = [];
  statusList = [{
    id: 417,
    lookupVal: 'DRAFT'
  }]
  isDisable = false;
  isDisableflag = true;
  associateObj: any;
  tileFlag: boolean;
  todayDate: any;
  cntrSignDtFlag: boolean = false;
  model: any = {
    "cntrSignDt": "",
    "cntrType": '330',
    "effectiveDt": "",
    "expDt": "",
    "lkpPymtFreqId": null,
    'status': 417
  };
  editflow: any;
  referenceData;
  exAttrMap = new Map();
  exAttrKeyList = [];
  perList: any = [];
  contractID: number;

  ngOnInit() {
    this.authorizationService.setPermissions('CONTRACT');
    this.perList = this.authorizationService.getPermissions('CONTRACT') == null ? [] : this.authorizationService.getPermissions('CONTRACT');
    this.permissionsService.loadPermissions(this.perList);
    this.contractID = AppSetting.contractId;
    if (this.contractID !== null) {
      this.exAttrMap = this.authorizationService.getExcludedAttributes('VIEW CONTRACT');
      this.exAttrKeyList = Array.from(this.exAttrMap.values());
    }
    console.log('Attribute List', this.exAttrKeyList);
    console.log('Permissions List', this.perList);
    this.getAllReferernceList();
    this.getAssociateContract();
    this.setAssociateObj();
    this.acRoute.params.subscribe(x => {
      if (x['termination']) {
        this.cntrSignDtFlag = true;
        this.tileFlag = x['termination'];
        this.isDisable = true;
      }

      if (x.editflow) {
        this.editflow = x.editflow;
        this.cntrSignDtFlag = true;
      }
    })

    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    //   this.getContractById();
    //   this.getContract();
  }

  getAllReferernceList() {
    this.spinner.show();
    this.apiService.get(`secure/v1/networkcontract`).subscribe((res) => {
      if (res.status == 'SUCCESS') {
        this.spinner.hide();
        this.referenceData = res.data.referenceData;
        this.model.status = this.referenceData.statusList.find(({ lookupVal }) => lookupVal == 'DRAFT').id;
      }

    }, (err) => {
      this.spinner.hide();

    });
  }

  setAssociateObj() {
    this.assocData = AppSetting.associateObject;
    if (!(this.assocData.contractId)) {
      // this.minDate = new Date();
      let p = new Date();
      p.setDate(p.getDate() + 1);
      this.minDate = p;
    }
    let resArray = [];
    if (AppSetting.associateObject) {
      resArray.push(AppSetting.associateObject);
      this.dataSource = new MatTableDataSource(resArray);
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if (filterValue.length > 0 && filterValue.length < 3) {
      this.nomatch = false;
      this.minchar = true
      this.dataSource.filter = null;
    }
    else if (filterValue.length == 0) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.minchar = false;
      this.nomatch = false;
    }
    else {
      this.minchar = false
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.filteredData.length == 0) {
        this.nomatch = true
      }
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getContractById() {
    this.spinner.show()
    let associateId = AppSetting.associateId;
    this.apiService.get(`secure/v1/networkcontract/${associateId}`).subscribe((res) => {
      if (res.status == 'SUCCESS') {
        if (res.data) {
          let resArray = [];
          this.referenceData = res.data.referenceData;

          if (res.data.responseData) {
            resArray.push(res.data.responseData);
            this.dataSource = new MatTableDataSource(resArray);
          }
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.toastr.error('Data not Found');
        }
      } else {
        this.spinner.hide();
        this.toastr.error(res.message);
      }

    }, (err) => {
      this.spinner.hide();

    });
    //  this.spinner.hide();
  }
  getAssociateContract() {
    this.spinner.show()
    let assoId = AppSetting.associateId;
    this.apiService.get(`secure/v1/networkcontract/associate/${assoId}`).subscribe((res) => {
      if (res.status == 'SUCCESS') {
        if (res.data) {

          this.associateResData = res.data.responseData;
          this.associateRefData = res.data.referenceData;
          //       this.statusList = this.associateRefData.statusList;
          //        this.assocTypeList = this.associateRefData.assocTypeList;
          this.selectedContract(this.associateResData, this.associateRefData);
          // this.effectiveDate(false)
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.toastr.error('Data not Found');
        }
      } else {
        this.spinner.hide();
        this.toastr.error(res.message);
      }

    }, (err) => {
      this.spinner.hide();

    });
    //  this.spinner.hide();

  }

  createContractPost() {
    this.spinner.show();
    this.model.assocId = AppSetting.associateId;
    let a = this.model.nrmVehicleType == "MARKET VEHICLE" ? 1 : 0;
    AppSetting.vehicleTypeStatus = a;

    if (this.editflow) {
      this.model.status = AppSetting.editStatus;
    }
    this.model.cntrSignDt = this.datePipe.transform(this.model.cntrSignDt, 'yyyy-MM-dd');
    this.model.effectiveDt = this.datePipe.transform(this.model.effectiveDt, 'yyyy-MM-dd');
    this.model.expDt = this.datePipe.transform(this.model.expDt, 'yyyy-MM-dd');
    AppSetting.wefDate = this.datePipe.transform(this.model.effectiveDt, 'yyyy-MM-dd');    // store effective date 
    this.apiService.post(`secure/v1/networkcontract`, this.model).subscribe((res) => {
      this.handleData(res);
    }, (err) => {
      this.spinner.hide();

    });
    //   this.spinner.hide();
  }

  openContractUpdateModal() {
   this.dialog.open(ContractUpdateComponent, {
      width: '50vw',
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
  }

  openBookingContractUpdateModal() {
    this.dialog.open(BookingAssociateContractUpdateComponent, {
      width: '30vw',
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
  }

  openViewBranchesModal(contract) {
    this.spinner.show();
    let branchData: any;
    this.apiService.get(`secure/v1/networkcontract/contracts/branches/${contract.id}`)
      .subscribe(res => {
        if (res.data) {
          if (res.data.responseData && res.data.responseData.length > 0) {
            branchData = res.data.responseData;
            if (branchData.length > 0) {
              this.dialog.open(ViewBranchesComponent, {
                data: { branchData: branchData },
                width: '55vw', minHeight: '20rem',
                panelClass: 'mat-dialog-responsive',
                disableClose: true
              });
              this.spinner.hide();
            } else {
              this.spinner.hide();
            }
          }
        }
        this.spinner.hide();
      })


  }

  selectedContract(contract, refList) {
    let contractID = AppSetting.contractId;
    if (contractID) {
      // if(contract.length > 0 && !this.editflow && !this.tileFlag) {
      //   this.toastr.info(`Contract Already Exist For ${this.assocData.contactFname} Associate`);
      //   this.router.navigate(['/asso_network-contract/asso_network'], {skipLocationChange: true})
      // }
      let obj = contract.filter(ele => ele.id == contractID);
      if (obj && obj.length > 0) {
        this.model = JSON.parse(JSON.stringify(obj[0]));
        this.selectedContractId = this.model.id;
        this.model.cntrType = Number(this.model.cntrType);
        this.minDateStart = this.model.effectiveDt ? this.model.effectiveDt : new Date();
        let dateMin = this.model.effectiveDt ? this.model.effectiveDt : new Date();
        let d = new Date(dateMin);
        d.setDate(d.getDate() + 1);
        this.minDate = d;
      } else {
        this.getContract();
      }
    } else {
      // if(contract.length > 0) {
      //   this.toastr.info(`Contract Already Exist For ${this.assocData.contactFname} Associate`);
      //   this.router.navigate(['/asso_network-contract/asso_network'], {skipLocationChange: true})
      // }
    }
    this.model.assocId = AppSetting.associateId;
    this.model.cntrType = Number(this.model.cntrType);
    this.minDateStart = this.model.effectiveDt ? this.model.effectiveDt : new Date();


    if (!this.model.status) {
      let tempStatus = refList.statusList.filter(obj => obj.lookupVal == 'DRAFT');
      this.model.status = tempStatus[0].id;
    }

  }
  maxdate: any;
  minDate: any = new Date();
  minDateStart: any = new Date();
  contractData: any;
  getContract() {
    this.apiService.get('secure/v1/networkcontract/' + AppSetting.contractId).subscribe(response => {
      let ob = ErrorConstants.validateException(response);
      if (ob.isSuccess) {
        this.referenceData = response.data.referenceData;
        if (response.data.responseData && Object.keys(response.data.responseData).length > 0) {
          this.contractData = response.data.responseData;
          this.model = this.contractData;
          this.model.cntrType = Number(this.model.cntrType);
          this.minDateStart = this.model.effectiveDt ? this.model.effectiveDt : new Date();
          let dateMin = this.model.effectiveDt ? this.model.effectiveDt : new Date();
          let d = new Date(dateMin);
          d.setDate(d.getDate() + 1);
          this.minDate = d;
        } else {
          this.minDate = new Date();
          let e = new Date();
          e.setDate(e.getDate() + 1);
          this.maxdate = e;
        }
        this.spinner.hide();
      } else {
        this.toastr.error(ob.message);
        this.spinner.hide();
      }
    }, (error) => {
      this.toastr.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    })

  }

  isValidSignDt: boolean = false;
  isValidEffectiveDt: boolean = false;
  isValidExpDt: boolean = false;

  // MatDatePicker Validation

  signDate() {
    let cntrYear = parseInt(this.datePipe.transform(this.model.cntrSignDt, 'yyyy'))
    if (cntrYear > 9999) {
      this.model.cntrSignDt = "";
    } else {
      let a = this.datePipe.transform(this.model.cntrSignDt, 'yyyy-MM-dd')
      let b = this.datePipe.transform(this.model.effectiveDt, 'yyyy-MM-dd')
      let c = this.datePipe.transform(this.model.expDt, 'yyyy-MM-dd')
      if (c) {
        if (a < c) {
          this.isValidSignDt = false;
        }
        else {
          this.isValidSignDt = true;
        }
      } else if (b) {
        if (a <= b) {
          this.isValidSignDt = false;
        }
        else if (b < a) {
          this.isValidEffectiveDt = true;
        }
        else {
          this.isValidSignDt = true;
        }
      } else {
        this.isValidSignDt = false;
      }
      if (!a) {
        let e = new Date(a);
        e.setDate(e.getDate() + 1);
        this.minDate = e;
      }
    }
    this.effectiveDate(false);
    this.expDate();

  }

  effectiveDate(isExpToUpdate) {
    let effYear = parseInt(this.datePipe.transform(this.model.effectiveDt, 'yyyy'))
    if (effYear > 9999) {
      this.model.effectiveDt = "";
    } else {
      let a = this.datePipe.transform(this.model.cntrSignDt, 'yyyy-MM-dd')
      let b = this.datePipe.transform(this.model.effectiveDt, 'yyyy-MM-dd')
      let c = this.datePipe.transform(this.model.expDt, 'yyyy-MM-dd')
      if (c) {
        if (b < c && b >= a) {
          this.isValidEffectiveDt = false;
        }
        else {
          this.isValidEffectiveDt = true;
          this.isValidExpDt = false;
        }
      } else {
        this.isValidEffectiveDt = false
        if (b >= a) {
          this.isValidEffectiveDt = false
        } else {
          this.isValidEffectiveDt = true
        }
      }
      if (b) {
        let e = new Date(b);
        e.setDate(e.getDate() + 1);
        this.minDate = e;
      }
    }
    this.expDate();
  }

  expDate() {
    let expYear = parseInt(this.datePipe.transform(this.model.expDt, 'yyyy'))
    if (expYear > 9999) {
      this.model.expDt = "";
    } else {
      let a = this.datePipe.transform(this.minDateStart, 'yyyy-MM-dd')
      let b = this.datePipe.transform(this.model.effectiveDt, 'yyyy-MM-dd')
      let c = this.model.expDt ? this.datePipe.transform(this.model.expDt, 'yyyy-MM-dd') : null
     
      if (b && c) {
        if (b < c) {
          this.isValidExpDt = false;
          //this.isValidEffectiveDt = false;
        }
        else {
          this.isValidExpDt = true;
        }
      } else if (a && c) {
        if (a < c) {
          this.isValidExpDt = false;
        }
        else {
          this.isValidExpDt = true;
        }
      } else {
        this.isValidExpDt = false;
      }
      if (c) {
        var e = new Date(c);
        e.setDate(e.getDate() - 1);
        this.maxdate = e;
      } else {
        this.maxdate = null
      }
    }
  }

  editJourney(object) {
    if (this.editflow) {
      object.status = AppSetting.editStatus;
    }
  }

  submitRenewal() {
    this.model.effectiveDt = this.datePipe.transform(this.model.effectiveDt, 'yyyy-MM-dd');
    this.model.expDt = this.datePipe.transform(this.model.expDt, 'yyyy-MM-dd');
    if (this.tileFlag == false) {
      this.createContractPost();
    } else {
      this.submitTermNClose();
    }

  }

  submitTermNClose() {
    const dialogRefEdit = this.dialog.open(confimationdialog, {
      data: { message: "Are you sure you want to terminate contract ?" },
      disableClose: true,
      panelClass: 'creditDialog',
      width: '300px'
    });

    dialogRefEdit.afterClosed().subscribe(result => {
      if (result) {
        this.editflow = false;
        this.terminateContract()

        this.model.expDt = new Date();
      }
    });

  }
  modelChange() {
    this.model.cntrType = Number(this.model.cntrType)
  }

  closeNRedirect() {
    this.router.navigate(['asso_network-contract/asso_network'], { skipLocationChange: true });
  }

  terminateContract() {
    if (this.editflow) {
      this.model.status = AppSetting.editStatus;
    }

    this.spinner.show();
    this.model.effectiveDt = this.datePipe.transform(this.model.effectiveDt, 'yyyy-MM-dd');
    this.model.expDt = this.datePipe.transform(this.model.expDt, 'yyyy-MM-dd');
    AppSetting.wefDate = this.datePipe.transform(this.model.effectiveDt, 'yyyy-MM-dd');
    let contractId = AppSetting.contractId;
    this.apiService.post(`secure/v1/networkcontract/terminate/`, { id: contractId, descr: this.model.desc }).subscribe((res) => {
      this.handleData(res);
    }, (err) => {
      this.spinner.hide();
      this.toastr.error(err.error.errors.error[0].description);

    });
  }

  nextReadMode() {
    if (this.editflow) {
      this.router.navigate(['asso_network-contract/route-allocation', { steper: true, 'editflow': 'true' }], { skipLocationChange: true })
    } else {
      this.router.navigate(['asso_network-contract/route-allocation'], { skipLocationChange: true })
    }
  }

  handleData(res) {
    if (res.status == 'SUCCESS') {
      if (res.data) {
        AppSetting.contractId = res.data.responseData;
        if (this.isDisable) {
          this.toastr.info(res.message);
          this.router.navigate(['/asso_network-contract/asso_network'], { skipLocationChange: true });
        } else {
          this.toastr.success('Saved Successfully');
          if (this.editflow) {
            this.router.navigate(['/asso_network-contract/route-allocation', { steper: true, 'editflow': 'true' }], { skipLocationChange: true })
          } else {
            this.router.navigate(['/asso_network-contract/route-allocation'], { skipLocationChange: true })
          }
        }
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.toastr.error('Data not Found');
      }
    } else {
      this.spinner.hide();
      this.toastr.error(res.message);
    }
  }

}

