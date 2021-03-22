import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { ApiService } from "src/app/core/services/api.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { AppSetting } from "src/app/app.setting";
import { PaymentCommercialGen } from "src/app/core/models/paymentTermsModel";
import { PayoutGenDetailComponent } from "./payout-gen-detail/payout-gen-detail.component";
import * as _ from "lodash";
import { DatePipe } from "@angular/common";
import { AuthorizationService } from '../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Subscription } from 'rxjs';
import { confimationdialog } from 'src/app/dialog/confirmationdialog/confimationdialog';

// table 2
export interface PeriodicElement1 {
  ExBranch: string;
  ExAmount: string;
  ExReaspm: string;
  ExSdate: string;
  ExEdate: string;
}

export let browserRefresh = false;
export interface PeriodicElement2 {
  MgBranch: string;
  MgAmount: string;
  MgHndlrPrsn: string;
  MgReaspm: string;
  MgSdate: string;
  MgEdate: string;
}

@Component({
  selector: "app-booking-payout",
  templateUrl: "./booking-payout.component.html",
  styleUrls: ["./booking-payout.component.css"],
  providers: [PaymentCommercialGen, DatePipe],
})
export class BookingPayoutComponent implements OnInit {
  @ViewChild(PayoutGenDetailComponent, null) childValidation: PayoutGenDetailComponent;


  subscription: Subscription;
  // @ViewChild('cust', {static: false}) cust: PaymentCommercialGen;
  // @ViewChild('gen', {static: false}) gen: PaymentCommercialGen;
  perList: any = [];
  exAttrMap = new Map();
  exAttrKeyList = [];

  displayedColumns1: string[] = [
    "ExBranch",
    "ExAmount",
    "ExReaspm",
    "ExSdate",
    "ExEdate",
  ];
  dataSourceExBranch = new MatTableDataSource();

  displayedColumns2: string[] = [
    "MgBranch",
    "MgAmount",
    "MgHndlrPrsn",
    "MgReaspm",
    "MgSdate",
    "MgEdate",
  ];
  dataSourceMgBranch = new MatTableDataSource()// = ELEMENT_DATA_2;

  // displayedColumns3: string[] = ['Flabel', 'Fvalue'];
  // dataSource3 = ELEMENT_DATA_3;

  // Data set end for Tables

  // Variables Difine
  cusBpayment;
  soffhide;
  hrHideEx;
  HoffringBkg;
  hidePerWay;
  addBRemark;
  csBpay;
  otherEAdd;
  netAdd;

  radioButtontncData = [];
  selectortncData = [];
  stringtncData = [];

  contractId;
  associateId;
  paymentData;
  // paymentCommercialData: any; //= PaymentCommercialGen;
  paymentCommercialRefData: any;
  assocAdditionalParamList;
  assocExpenseTypeList;
  assocPaymentTypeList;
  assocPayoutTypeList;
  mdmNotepadList;
  serviceOfferingList;
  vehicleCargoCapacityList;
  attrTypeListTnc = [];
  notepadAttributesList = [];
  branchIds: any = [];
  customerIdList: any = [];
  paymentDataBranch;
  editflow: any;
  editStatusId = AppSetting.editStatus;
  searchNotePad = '';

  maxdate: any;
  minDate: any = new Date();
  minDateStart: any = new Date();
  radiodata : any;
  selectordata: any;
  textdata: any;

  paymentCommercialData: any = {
    addtnlExpnsFlag: 0,
    addtnlExpnsRemark: '',
    assocCntrId: AppSetting.contractId,
    assocNotepads: [],
    cargoBranchPaymentTerms: [],
    lkpAssocBkngPayoutCtgyId: null,
    lkpCargoPayoutOptId: null,
    addtnlParamFlag: 0,
    lkpAssocAddtnlParamId: null,
    addtnlParamVal: null,
    effectiveDt: null,
    expDt: null,
    exgratiaFlag: 0,
    mgFlag: 0,
    price: 0,
    promoFlag: 0,
    hndlrPrsnNum: 0,
    custPymtFlag: 0,
    recIdentifier: '',
    wtType: ""

  };


  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private acRoute: ActivatedRoute,
    public datePipe: DatePipe,
    private authorizationService: AuthorizationService,
    private permissionsService: NgxPermissionsService
  ) {
    this.contractId = AppSetting.contractId;
    this.associateId = AppSetting.associateId;

  }

  ngOnInit() {
    this.apiService.get('secure/v1/cargocontract/' + AppSetting.contractId).subscribe(response => {
      this.paymentCommercialData.effectiveDt = response.data.responseData.effectiveDt;
      this.paymentCommercialData.expDt = response.data.responseData.expDt;
    });
    this.authorizationService.setPermissions('COMMERCIAL');
    this.perList = this.authorizationService.getPermissions('COMMERCIAL') == null ? [] : this.authorizationService.getPermissions('COMMERCIAL');
    this.permissionsService.loadPermissions(this.perList);
    this.exAttrMap = this.authorizationService.getExcludedAttributes('COMMERCIAL');
    this.exAttrKeyList = Array.from(this.exAttrMap.values());
    console.log('per list',this.perList);
    console.log('exAttrKeyList',this.exAttrKeyList)

    this.acRoute.params.subscribe(x => {
      if (x.editflow) {
        this.editflow = x.editflow;
      }

    });
    this.spinner.show();
    this.getCommerceDataWithctrtId();
    console.log("model", this.paymentCommercialData);
  }


  notepadData() {
    this.radioButtontncData = this.notepadAttributesList.filter(function (
      filt
    ) {
      return filt.attributeTypeId == 1;
    });
    this.selectortncData = this.notepadAttributesList.filter(function (filt) {
      return filt.attributeTypeId == 2;
    });
    this.stringtncData = this.notepadAttributesList.filter(function (filt) {
      return filt.attributeTypeId == 3;
    });
  }

  getbranchWithctrtId() {
    this.spinner.show();
    this.apiService
      .get(`secure/v1/cargocontract/contracts/branches/${this.contractId}`)
      .subscribe(
        (res) => {

          if (res.data) {
            this.paymentDataBranch = res.data.responseData;
            this.branchIds = res.data.responseData.map(obj => {
              return obj.branchId;
            })
            let exBranchTemp = JSON.parse(JSON.stringify(res.data.responseData));
            let mgBranchTemp = JSON.parse(JSON.stringify(res.data.responseData));
            let exBranchTempNew = [], mgBranchTempNew = [];
            exBranchTemp.filter(element => {
              element.amtType = "EX-GRATIA"
              element.assocBranchId = element.id;
              element.amt = null;
              element.rsn = '';
              delete element.id;
              delete element.assocBranchVehicles;
              delete element.branchName;
              delete element.branchType;
              let tempArr;
              if (this.dataSourceExBranch && this.dataSourceExBranch.data && this.dataSourceExBranch.data.length > 0) {
                tempArr = _.find(this.dataSourceExBranch.data, { 'assocBranchId': Number(element.assocBranchId) });
              }
              if (!tempArr || tempArr.length == 0) {
                exBranchTempNew.push(element);
              } else {
                exBranchTempNew.push(tempArr);
              }

            });
            this.dataSourceExBranch.data = JSON.parse(JSON.stringify(exBranchTempNew));
            mgBranchTemp.forEach(element => {
              element.amtType = "MG";
              element.assocBranchId = element.id;
              element.amt = null;
              element.hndlrPrsnNum = null;
              element.rsn = '';
              delete element.id;
              delete element.branchName;
              delete element.branchType;
              delete element.assocBranchVehicles;
              // return element;  
              let tempArr;
              if (this.dataSourceMgBranch && this.dataSourceMgBranch.data && this.dataSourceMgBranch.data.length > 0) {
                tempArr = _.find(this.dataSourceMgBranch.data, { 'assocBranchId': Number(element.assocBranchId) });
              }

              if (!tempArr || tempArr.length == 0) {
                mgBranchTempNew.push(element);
              } else {
                mgBranchTempNew.push(tempArr);
              }

            });
            this.dataSourceMgBranch.data = JSON.parse(JSON.stringify(mgBranchTempNew));

            this.exgratiaAndMGChange();
            this.spinner.hide();
          }
          this.spinner.hide();
        },
        (err) => {
          // this.toastr.error()
          this.spinner.hide();
        }
      );

  }

  getCommerceDataWithctrtId() {
    this.notepadAttributesList = [];
    this.apiService
      .get(`secure/v1/cargocontract/commercial/${this.contractId}`)
      .subscribe(
        (res) => {
          if (res.data) {
            this.paymentData = res.data;
            this.paymentCommercialRefData = res.data.referenceData;
            if (res.data.responseData && res.data.responseData.id) {
              this.paymentCommercialData = res.data.responseData;
              this.setDataObject(this.paymentCommercialData);
            }
            this.attrTypeListTnc = this.paymentCommercialRefData.attrTypeList;
            this.notepadAttributesList = [];
            for (var item of this.paymentCommercialRefData.mdmNotepadList) {
              delete item.status;
              if (item.attributeTypeId === 3) {
                item.notepadInputVal = item.attributeValue;
              }
              if (this.paymentCommercialData && this.paymentCommercialData.assocNotepads && this.paymentCommercialData.assocNotepads.length > 0) {
                for (var notepadData of this.paymentCommercialData[
                  "assocNotepads"
                ]) {
                  if (
                    item.id == notepadData.notepadId &&
                    notepadData.notepadInputVal != undefined
                  ) {
                    item.notepadInputVal = notepadData.notepadInputVal.trim();
                    if (notepadData.status) {
                      item.status = notepadData.status;
                    }

                  }
                }
              }

              if (item.attributeTypeId == 1 || item.attributeTypeId == 2) {
                if (item.attributeValue)
                  item.attributeValue = item.attributeValue
                    .toUpperCase()
                    .split(",");
              }
              this.notepadAttributesList.push(item);
            }
          }
          this.notepadData();
          this.getbranchWithctrtId();
          console.log("this.paymentCommercialData", this.paymentCommercialData);
        },
        (err) => {
          // this.toastr.error()
          this.spinner.hide();
        }

      );

  }
  exgratiaAndMGChange() {
    if (this.paymentCommercialData.mgFlag && this.paymentCommercialData.exgratiaFlag) {
      this.paymentCommercialData.cargoBranchPaymentTerms = [...this.dataSourceExBranch.data, ...this.dataSourceMgBranch.data];
    } else if (this.paymentCommercialData.mgFlag && !this.paymentCommercialData.exgratiaFlag) {
      this.paymentCommercialData.cargoBranchPaymentTerms = [...this.dataSourceMgBranch.data];
    } else if (!this.paymentCommercialData.mgFlag && this.paymentCommercialData.exgratiaFlag) {
      this.paymentCommercialData.cargoBranchPaymentTerms = [...this.dataSourceExBranch.data];
    } else {
      this.paymentCommercialData.cargoBranchPaymentTerms = [];
    }
  }

  submitPayment(flag) {
    let cloneObject = JSON.parse(JSON.stringify(this.paymentCommercialData));

    let notepadTrans = []
   
    this.radiodata = this.radioButtontncData.length;
    for (let item of this.radioButtontncData) {
      let data1 = {};
      if (this.paymentCommercialData['id']) {
        data1["entityRefId"] = this.paymentCommercialData['id'] ? this.paymentCommercialData['id'] : 0;
        if (item['status'] && item['status'] !== 1) {
          data1["status"] = item['status'];
        }

      }
      data1["notepadId"] = item.id;
      data1["notepadInputVal"] = item.notepadInputVal;
      notepadTrans.push(data1);
    }

    this.selectordata =this.selectortncData.length;
    for (let item of this.selectortncData) {
      let data1 = {};
      if (this.paymentCommercialData['id']) {
        data1["entityRefId"] = this.paymentCommercialData['id'] ? this.paymentCommercialData['id'] : 0;
        if (item['status'] && item['status'] !== 1) {
          data1["status"] = item['status'];
        }
      }
      data1["notepadId"] = item.id;
      data1["notepadInputVal"] = item.notepadInputVal;
      notepadTrans.push(data1);
    }
    this.textdata = this.stringtncData.length;
    for (let item of this.stringtncData) {
      let data1 = {};
      if (this.paymentCommercialData['id']) {
        data1["entityRefId"] = this.paymentCommercialData['id'] ? this.paymentCommercialData['id'] : 0;
        if (item['status'] && item['status'] !== 1) {
          data1["status"] = item['status'];
        }
      }

      data1["notepadId"] = item.id;
      data1["notepadInputVal"] = item.notepadInputVal;
      notepadTrans.push(data1);
    }

    if (this.paymentCommercialData && this.paymentCommercialData.assocNotepads && this.paymentCommercialData.assocNotepads.length) {
      for (let i = 0; i < this.paymentCommercialData.assocNotepads.length; i++) {
        for (let j = 0; j < notepadTrans.length; j++) {
          if (this.paymentCommercialData.assocNotepads[i].notepadId == notepadTrans[j].notepadId) {
            notepadTrans[j]["id"] = this.paymentCommercialData.assocNotepads[i].id;
            //notepadTrans[j]["status"]=this.paymentCommercialData.assocNotepads[i].status;
          }
        }
      }
    }
    this.paymentCommercialData["assocNotepads"] = notepadTrans;
    this.paymentCommercialData["assocNotepads"].forEach(obj => {
      obj.effectiveDt = this.paymentCommercialData.effectiveDt;
      obj.expDt = this.paymentCommercialData.expDt;
    });
    delete this.paymentCommercialData["BookingCommercialEntListObjOff"];
    delete this.paymentCommercialData['BookingCommercialEntListObjBook'];
    delete this.paymentCommercialData['BookingCommercialEntListObjPer'];
    if (!this.paymentCommercialData['id']) {
      delete this.paymentCommercialData["status"];
      if (this.paymentCommercialData.cargoBranchPaymentTerms && this.paymentCommercialData.cargoBranchPaymentTerms.length > 0) {
        this.paymentCommercialData.cargoBranchPaymentTerms.forEach(element => {
          delete element.status;
          if (this.paymentCommercialData['id']) {
            element.cargoCmrclId = this.paymentCommercialData['id'];
          }
        });
      }
    } else {
      if (this.paymentCommercialData.cargoBranchPaymentTerms && this.paymentCommercialData.cargoBranchPaymentTerms.length > 0) {
        this.paymentCommercialData.cargoBranchPaymentTerms.forEach(element => {
          if (this.paymentCommercialData['id']) {
            element.cargoCmrclId = this.paymentCommercialData['id'];
          }
        });
      }
    }
    console.log('Commercial Model', this.paymentCommercialData);
    this.apiService.post(`secure/v1/cargocontract/commercial`, this.paymentCommercialData).subscribe((res) => {
      if(res.status == "SUCCESS"){
        this.getCommerceDataWithctrtId();          
        this.toastr.success('Save Successfully');
        if(flag == 'next'){
          if(this.editflow){
            this.router.navigate(['/asso_cargo-contract/booking-sla',{ steper:true,'editflow': 'true' }], {skipLocationChange: true});
          }else{
            this.router.navigate(['/asso_cargo-contract/booking-sla'], {skipLocationChange: true});
          }
        }  
      }else{
        this.paymentCommercialData = cloneObject;
        this. exgratiaAndMGChange();
        this.toastr.error(res.message);
        // this.getCommerceDataWithctrtId();
      }
    }, (err) => {
      this.paymentCommercialData = cloneObject;
      this.exgratiaAndMGChange();
      this.toastr.error(err.error.errors.error[0].code + ' : ' + err.error.errors.error[0].description );
    })

  }

  nextReadMode() {
    if (this.editflow) {
      this.router.navigate(['/asso_cargo-contract/booking-sla', { steper: true, 'editflow': 'true' }], { skipLocationChange: true });
    } else {
      this.router.navigate(['/asso_cargo-contract/booking-sla'], { skipLocationChange: true });
    }
  }

  setDataObject(objectData) {
    let exBranchTemp = [];
    let mgBranchTemp = [];
    if (objectData.cargoBranchPaymentTerms && objectData.cargoBranchPaymentTerms.length > 0) {
      objectData.cargoBranchPaymentTerms.forEach(element => {
        if (element.amtType == "MG") {
          mgBranchTemp.push(element);
        } else {
          exBranchTemp.push(element);
        }
      });
    }


    this.dataSourceExBranch = new MatTableDataSource(
      exBranchTemp
    );
    this.dataSourceMgBranch = new MatTableDataSource(
      mgBranchTemp
    );
  }

  ngAfterViewInit(): void {
   // this.fAssoPaygen = this.child.form.form;
    console.log('hello', this.childValidation);

    // console.log('hello', this.gen);
  }

  validateNumber(event) {
    const keyCode = event.keyCode;
    const excludedKeys = [8, 9, 37, 39, 46];

    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
    }
  }

  editInput(element) {
    if (this.editflow) {
      element.status = AppSetting.editStatus;
    }
  }

  effectiveDate(isExpToUpdate, element) {
    let effYear = parseInt(this.datePipe.transform(element.effectiveDt, 'yyyy'))
    if (effYear > 9999) {
      element.effectiveDt = "";
    } else {
      element.effectiveDt = this.datePipe.transform(element.effectiveDt, 'yyyy-MM-dd');
      element.expDt = this.datePipe.transform(element.expDt, 'yyyy-MM-dd');

      let a = this.datePipe.transform(element.effectiveMinDt, 'yyyy-MM-dd')
      let b = this.datePipe.transform(element.effectiveDt, 'yyyy-MM-dd')
      let c = this.datePipe.transform(element.expDt, 'yyyy-MM-dd')
      if (c && a) {
        if (a <= b && b < c) {
          element.isValidEffectiveDt = false;
        }
        else {
          element.isValidEffectiveDt = true;
        }
      }
      else if (c) {
        if (b < c) {
          element.isValidEffectiveDt = false;
        }
        else {
          element.isValidEffectiveDt = true;
        }
      } else if (a) {
        if (b >= a) {
          element.isValidEffectiveDt = false;
        }
        else {
          element.isValidEffectiveDt = true;
        }
      } else {
        element.isValidEffectiveDt = false;
      }
      if (b) {
        let e = new Date(b);
        e.setDate(e.getDate() + 1);
        element.expiryDate_min = e;
      }

    }
    this.expDate(element);
  }


  expDate(element) {
    let expYear = parseInt(this.datePipe.transform(element.expDt, 'yyyy'))
    if (expYear > 9999) {
      element.expDt = "";
    } else {
      element.effectiveDt = this.datePipe.transform(element.effectiveDt, 'yyyy-MM-dd');
      element.expDt = this.datePipe.transform(element.expDt, 'yyyy-MM-dd');

      let a = this.datePipe.transform(element.effectiveMinDt, 'yyyy-MM-dd');
      let b = this.datePipe.transform(element.effectiveDt, 'yyyy-MM-dd');
      let c = this.datePipe.transform(element.expDt, 'yyyy-MM-dd');

      if (b) {
        if (b < c) {
          element.isValidExpDt = false;
        }
        else {
          element.isValidExpDt = true;
        }
      } else if (a) {
        if (a < c) {
          element.isValidExpDt = false;
        }
        else {
          element.isValidExpDt = true;
        }
      } else {
        element.isValidExpDt = false;
      }
      if (c) {
        var e = new Date(c);
        e.setDate(e.getDate() - 1);
        element.maxdate = e;
      } else {

        element.isValidExpDt = false;
      }
    }
  }


  deleteBranchDialog(customer) {
    const dialog = this.dialog.open(confimationdialog, {
      data: { message: "Are you sure want to Delete?" },
      disableClose: true,
      panelClass: 'creditDialog',
      width: '300px'
    });

    dialog.afterClosed().subscribe(res => {
      if (res) {
        this.paymentCommercialData.bookingCommercialCustomerList = this.paymentCommercialData.bookingCommercialCustomerList.filter(function (obj) {
          return obj.msaCustId !== customer.msaCustId;
        });
        if (this.paymentCommercialData.bookingCommercialCustomerList.length === 0) {
          this.paymentCommercialData.custPymtFlag = 0;
        }
      }
    });
  }

  getBranchName(branchID) {
    if (this.paymentDataBranch !== undefined) {
      let branch = this.paymentDataBranch.find(x => x.id == branchID);
      if (branch !== undefined) {
        return branch.branchName;
      } else {
        return '';
      }
    }
  }
}
