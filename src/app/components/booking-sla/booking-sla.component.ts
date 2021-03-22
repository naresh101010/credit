import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../../core/services/api.service';
import { ErrorConstants } from '../../core/models/constants';
import { EmiCalculationComponent } from '../../dialog/emi-calculation/emi-calculation.component';
import { InsuranceDeductionComponent } from '../../dialog/insurance-deduction/insurance-deduction.component';
import { AppSetting } from '../../app.setting';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';


@Component({
  selector: 'app-booking-sla',
  templateUrl: './booking-sla.component.html',
  styleUrls: ['./booking-sla.component.css'],
  providers: [DatePipe]
})
export class BookingSlaComponent implements OnInit {

  deductionForm: FormGroup;
  branchVehicleList: any[] = [];
  financeflag: any; 
  deductionID: number;
  deductionData: any;
  emiDeductionArray: any[] = [];
  insuranceDeductionArray: any[] = [];
  oldEmiDeductions: any[] = [];
  oldInsuranceDeductions: any[] = [];
  emiDatasource: any;
  insuranceDatasource: any;
  contractData: any;
  //displayedColumns: string[] = ['Vnumber', 'dedctnAmt', 'effectiveDt', 'expDt', 'branch','icon'];
  displayedColumns: string[] = ['Vnumber', 'dedctnAmt', 'effectiveDt', 'expDt', 'icon'];
  vehicleDisplayedColumns: string[] = ['Vtype', 'dedctnAmt', 'maxDed'];
  processDisplayedColumns: string[] = ['rofFreight', 'charge'];
  maxdate: Date;
  isValidStartDt: boolean;
  isValidEndDt: boolean;
  minDate: Date;
  editflow: boolean;
  associateData: any;
  vehicleCargoCapacityArray: any;
  processChrgSlabArray: any;
  editEffectiveDt: any;
  editExpdt: any;
  exAttrMap = new Map();
  exAttrKeyList =  [];
  perList: any = [];
  isInvalidData : boolean = false;

  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private apiService: ApiService,
    private tosterservice: ToastrService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    private router: Router,
    private permissionsService: NgxPermissionsService,
    private authorizationService : AuthorizationService,
    private route: ActivatedRoute) { }

  ngOnInit() {
//    AppSetting.contractId=774;
    this.authorizationService.setPermissions('COMMERCIAL');
    this.perList = this.authorizationService.getPermissions('COMMERCIAL') == null ? [] : this.authorizationService.getPermissions('COMMERCIAL');
    this.permissionsService.loadPermissions(this.perList);
    this.exAttrMap = this.authorizationService.getExcludedAttributes('DEDUCTION');
    this.exAttrKeyList = Array.from(this.exAttrMap.values());
    console.log('Attribute List', this.exAttrKeyList);
    console.log('Permissions List', this.perList);
    this.vehicleCargoCapacityArray = []

    this.route.params.subscribe(x => {
      this.editflow = x.editflow;
    });
    this.spinner.show();

    //this.editflow = true;
    this.associateData = AppSetting.associateObject;
    this.apiService.get('secure/v1/networkcontract/' +AppSetting.contractId).subscribe(data => {
      let ob = ErrorConstants.validateException(data);
      if (ob.isSuccess) {
        this.contractData = data.data.responseData;
        this.editEffectiveDt = this.contractData.effectiveDt;
        this.editExpdt = this.contractData.expDt;

         if(this.contractData.expDt){
          this.deductionForm.patchValue({
            effectiveDt: [this.contractData.effectiveDt],
            expDt: [this.contractData.expDt],
          })
         }else{
          this.deductionForm.patchValue({
            effectiveDt: [this.contractData.effectiveDt]
          })
         }
      }
    }, (error) => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    })

    this.apiService.get('secure/v1/networkContract/deduction/' +AppSetting.contractId).subscribe(response => {
      let ob = ErrorConstants.validateException(response);
      if (ob.isSuccess) {
        if (response.data.responseData && Object.keys(response.data.responseData).length > 0) {
          this.deductionData = response.data.responseData;
          //console.log('deduction Data', this.deductionData)
          this.deductionID = this.deductionData.id;
          this.renderDeductionData(response.data.referenceData);
        } else {
          this.deductionID = 0;
          this.minDate = new Date();
          let e = new Date();
          e.setDate(e.getDate() + 1);
          this.maxdate = e;
          this.createvehicleCargoCapacityArray(response.data.referenceData.vehicleCargoCapacityList);
        }
        this.processChrgSlabArray = response.data.referenceData.networkProcessChrgSlab;
        if(this.processChrgSlabArray != undefined){
          this.processChrgSlabArray.sort((a,b) => a.attr1-b.attr1);
        }
        this.branchVehicleList = response.data.referenceData.assignedRouteVehicleList;
          for(let i of this.branchVehicleList){
              this.financeflag =i
          }
        this.spinner.hide();
        this.isInvalidData = false;
      } else {
        //   this.tosterservice.error(ob.message);
        this.isInvalidData = true;
        this.spinner.hide();
      }
    }, (error) => {
     // Error while fetching data from deduction
     this.isInvalidData = true;
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    })

    this.deductionForm = this.fb.group({
      advncDedctnAmt: ['', Validators.required],
      advncDedctnAmtFlag: [0, Validators.required],
      advncDedctnAmtFromDt: ['', Validators.required],
      advncDedctnAmtToDt: [''],
      assocCntrId: [AppSetting.contractId],
      effectiveDt: [''],
      expDt: [''],
      id: [this.deductionID],
      lateArrFlag: [0, Validators.required],
      mktVehicleExpenseFlag: [0, Validators.required],
      recIdentifier: [''],
      slaFlag: [0, Validators.required],
      // status: [''],
      vehicleDeductions: [],
      dmgFlag: [0, Validators.required],
      lossMatFlag: [0, Validators.required],
      geoFenceDedctn: [0, Validators.required],
      maxFreightDedctnAmt: [0, Validators.required],
      maxFreightDedctnFlag: [0, Validators.required],
      mktVehicleDedctnFlag: [0, Validators.required],
      nonTchpntPnltyAmt: ['', Validators.required],
      processChrgFlag: [0, Validators.required],
      sealDedctnAmt: ['', Validators.required],
      gpsNotWorkDedctnAmt: [0, Validators.required],
      gpsNotWorkDedctnFlag: [0, Validators.required],
      vehicleAbsentPnltyFlag: [0, Validators.required]
    });
    this.isAdvanceAmount(0);
  }



  get f() { return this.deductionForm.controls }    // get form controls

  openEmiModal() {

    let dialog = this.dialog.open(EmiCalculationComponent, {
      width: '92rem',
      data: { branchVehicleList: this.branchVehicleList, previousData: this.emiDeductionArray, oldData: this.oldEmiDeductions, editflow: this.editflow },
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });

    dialog.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.emiDeductionArray = data;
        this.emiDatasource = new MatTableDataSource<any>(this.emiDeductionArray);
      }
    })
  }

  // validateEmi(): boolean {
  //   let flag = false
  //   if (this.branchVehicleList.length == 0) {
  //     return flag = true;
  //   }
  //   else {
  //     this.branchVehicleList.forEach(obj => {
  //       if (obj.sfxFinFlag > 0) {
  //         if (this.emiDeductionArray.length > 0) {
  //           return flag = true;
  //         }
  //       }
  //       else {
  //         return flag = true;
  //       }
  //     })
  //   }
  //   return flag;
  // }

  ifFinanceFlagExist() {
    let isExist : boolean = false;
    this.branchVehicleList.forEach(element => {
     if(element.sfxFinFlag == 1) {
       return isExist=true;
     }
    });
    return isExist;
  }

  openInsuranceDeductionModal() {
    let insuDialog = this.dialog.open(InsuranceDeductionComponent, {
      width: '92rem',
      data: { branchVehicleList: this.branchVehicleList, previousData: this.insuranceDeductionArray, oldData: this.oldInsuranceDeductions, editflow: this.editflow },
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });

    insuDialog.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.insuranceDeductionArray = data;
        this.insuranceDatasource = new MatTableDataSource<any>(this.insuranceDeductionArray);
      }
    })
  }

  renderDeductionData(refObj) {
    if (this.deductionData.advncDedctnAmtFlag == 1) {
      this.minDate = new Date(this.deductionData.advncDedctnAmtFromDt);
      let e = new Date(this.deductionData.advncDedctnAmtFromDt);
      e.setDate(e.getDate() + 1);
      this.maxdate = e;
    } else {
      this.minDate = new Date();
      let e = new Date();
      e.setDate(e.getDate() + 1);
      this.maxdate = e;
    }

    if (this.deductionData.vehicleDeductions !== undefined) {
      this.emiDeductionArray = this.deductionData.vehicleDeductions.filter(x => x.dedctnCateg === 'EMI');
      this.oldEmiDeductions = [...this.emiDeductionArray];
      this.emiDatasource = new MatTableDataSource<any>(this.emiDeductionArray);
      this.insuranceDeductionArray = this.deductionData.vehicleDeductions.filter(x => x.dedctnCateg === 'INSURANCE');
      this.oldInsuranceDeductions = [...this.insuranceDeductionArray];
      this.insuranceDatasource = new MatTableDataSource<any>(this.insuranceDeductionArray);
    }
    this.isAdvanceAmount(this.deductionData.advncDedctnAmtFlag);

    this.deductionForm.patchValue({
      advncDedctnAmt: this.deductionData.advncDedctnAmt,
      advncDedctnAmtFlag: this.deductionData.advncDedctnAmtFlag,
      advncDedctnAmtFromDt: this.deductionData.advncDedctnAmtFromDt,
      advncDedctnAmtToDt: this.deductionData.advncDedctnAmtToDt,
      assocCntrId: this.deductionData.assocCntrId,
      effectiveDt: this.deductionData.effectiveDt,
      expDt: this.deductionData.expDt,
      id: this.deductionID,
      lateArrFlag: this.deductionData.lateArrFlag,
      mktVehicleExpenseFlag: 1,
      slaFlag: this.deductionData.slaFlag,
      recIdentifier: this.deductionData.recIdentifier,
      vehicleDeductions: this.deductionData.vehicleDeductions,
      dmgFlag: this.deductionData.dmgFlag,
      lossMatFlag: this.deductionData.lossMatFlag,
      geoFenceDedctn: this.deductionData.geoFenceDedctn,
      maxFreightDedctnAmt: this.deductionData.maxFreightDedctnAmt,
      maxFreightDedctnFlag: this.deductionData.maxFreightDedctnFlag,
      mktVehicleDedctnFlag: this.deductionData.mktVehicleDedctnFlag,
      nonTchpntPnltyAmt:this.deductionData.nonTchpntPnltyAmt,
      processChrgFlag:this.deductionData.processChrgFlag,
      sealDedctnAmt: this.deductionData.sealDedctnAmt,
      gpsNotWorkDedctnAmt: this.deductionData.gpsNotWorkDedctnAmt,
      gpsNotWorkDedctnFlag:this.deductionData.gpsNotWorkDedctnFlag,
      vehicleAbsentPnltyFlag:this.deductionData.vehicleAbsentPnltyFlag
    });


    if (this.deductionData.lateArrivalDeductions !== undefined) {
      this.deductionData.lateArrivalDeductions.forEach(element => {
        //console.log(element,refObj.vehicleCargoCapacityList)
         let cargoCapacityObj = refObj.vehicleCargoCapacityList.find(x => x.id == element.lkpCargoCapacityTypeId);
          element["lookupVal"]= cargoCapacityObj != undefined ? cargoCapacityObj.lookupVal : '';
        });
        this.vehicleCargoCapacityArray=[...this.deductionData.lateArrivalDeductions];
       }else{
      //   this.vehicleCargoCapacityArray();
         this.createvehicleCargoCapacityArray(refObj.vehicleCargoCapacityList);
       }
}

  /*---------  On Save Deduction Data ------- */
  onSaveDeduction(flag) {
    this.deductionForm.markAllAsTouched();
    if(this.emiDeductionArray.length == 0  && this.ifFinanceFlagExist()){
      this.tosterservice.info('Please Add Vehicle EMI Deduction Calculation');
      return;
    }
    
    if(this.deductionForm.invalid || this.isValidStartDt || this.isValidEndDt){
      return;
    }

    let finalDeductionData: any = {};
    finalDeductionData = { ...this.deductionForm.value };
    if (this.emiDeductionArray === undefined && this.insuranceDeductionArray === undefined) {
      finalDeductionData.vehicleDeductions = [];
    } else {
      finalDeductionData.vehicleDeductions = this.emiDeductionArray.concat(this.insuranceDeductionArray);
    }
    finalDeductionData.effectiveDt = this.datePipe.transform(this.deductionForm.value.effectiveDt, 'yyyy-MM-dd');
    finalDeductionData.expDt = this.deductionForm.value.expDt == undefined ? null:this.datePipe.transform(this.deductionForm.value.expDt, 'yyyy-MM-dd');
    
    if(finalDeductionData.advncDedctnAmtFlag == 1) {
      finalDeductionData.advncDedctnAmtFromDt = this.datePipe.transform(this.deductionForm.value.advncDedctnAmtFromDt, 'yyyy-MM-dd');
      finalDeductionData.advncDedctnAmtToDt = this.datePipe.transform(this.deductionForm.value.advncDedctnAmtToDt, 'yyyy-MM-dd');
    }

    for (let i = 0; i < finalDeductionData.vehicleDeductions.length; i++) {
      if (finalDeductionData.vehicleDeductions[i].id === 0) {
        delete finalDeductionData.vehicleDeductions[i].id;
      }
    }
    if (this.deductionID == 0) {
      delete finalDeductionData.id;
    }
    if(this.editflow && this.deductionForm.dirty){
      finalDeductionData.status = AppSetting.editStatus;
    } 
    
    if(finalDeductionData.lateArrFlag == 1){
      finalDeductionData["lateArrivalDeductions"] = this.vehicleCargoCapacityArray;
    } else {
      finalDeductionData["lateArrivalDeductions"] = [];
    }
    this.spinner.show();
    this.apiService.post('secure/v1/networkContract/deduction', finalDeductionData).subscribe(res => {

      if (flag == 0) {
        if (this.editflow) {
          this.router.navigate(['/asso_network-contract/booking-document', { steper: true, editflow: this.editflow }], { skipLocationChange: true })
        } else {
          this.router.navigate(['/asso_network-contract/booking-document'], { skipLocationChange: true });
        }
      } else {
       
        this.deductionID = res.data.responseData;
        this.deductionForm.controls.id.setValue(this.deductionID);
        this.tosterservice.success('Deduction Saved Successfully')
      }
      this.spinner.hide();
    }, (error) => {
        // if(error.error.errors.error[0].code =="ERR001"){
        //   this.tosterservice.info("Please Add Single Vehicle EMI Deduction From Indivisual Vehicle")
        // }      
      this.tosterservice.error(error.error.errors.error[0].description);
      this.spinner.hide();
    })
  }

  /*----- return vehicle number ---------- */
  getVehicleNumber(id) {
    let vehicle = this.branchVehicleList.find(x => x.vehicleId === id);
    if (vehicle !== undefined) {
      return vehicle.vehicleNumber;
    } else {
      return '';
    }
  }

  /*------------ return branch name ------- */
  getBranchName(id) {
    let vehicle = this.branchVehicleList.find(x => x.vehicleId === id);
    if (vehicle !== undefined) {
      return vehicle.branchName.join(', ');
    } else {
      return '';
    }
  }
  /*---------- remove EMI deduction -------------- */
  removeEmiDeduction(i) {
    this.emiDeductionArray.splice(i, 1);
    this.emiDatasource = new MatTableDataSource<any>(this.emiDeductionArray);
  }

  /*---------- remove insurance deduction -------------- */
  removeInsuranceDeduction(j) {
    this.insuranceDeductionArray.splice(j, 1);
    this.insuranceDatasource = new MatTableDataSource<any>(this.insuranceDeductionArray);
  }

  /*----------- check advance amount --------- */
  isAdvanceAmount(value) {
    if (value == 1) {
      this.f.advncDedctnAmt.enable();
      this.f.advncDedctnAmtFromDt.enable();
      // this.f.advncDedctnAmtToDt.enable();
    } else {
      this.f.advncDedctnAmt.disable();
      this.f.advncDedctnAmtFromDt.disable();
      // this.f.advncDedctnAmtToDt.disable();
    }
  }

  /*--------  On change Start Date----------- */
  effectiveDate() {
    let effYear = parseInt(this.datePipe.transform(this.f.advncDedctnAmtFromDt.value, 'yyyy'));
    if (effYear > 9999) {
      this.f.advncDedctnAmtFromDt.setValue('');
    } else {
      let a;
      if (this.deductionID != 0 && this.deductionData.advncDedctnAmtFlag == 1) {
        a = this.datePipe.transform(new Date(this.deductionData.advncDedctnAmtFromDt), 'yyyy-MM-dd');
      } else {
        a = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      }
      let b = this.datePipe.transform(this.f.advncDedctnAmtFromDt.value, 'yyyy-MM-dd');
      let c = this.datePipe.transform(this.f.advncDedctnAmtToDt.value, 'yyyy-MM-dd');
      let e = new Date(this.f.advncDedctnAmtFromDt.value);
      e.setDate(e.getDate() + 1);
      this.maxdate = e;

      if (c) {
        if (b < c && b >= a) {
          this.isValidStartDt = false;
        }
        else {
          this.isValidStartDt = true;
          this.isValidEndDt = false;
        }
      } else {
        this.isValidStartDt = false;
      }
    }
  }

  /*--------  On change Expiry Date----------- */
  expDate() {
    let expYear = parseInt(this.datePipe.transform(this.f.advncDedctnAmtToDt.value, 'yyyy'));
    if (expYear > 9999) {
      this.f.advncDedctnAmtToDt.setValue('');
    } else {
      //let a = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      let b = this.datePipe.transform(this.f.advncDedctnAmtFromDt.value, 'yyyy-MM-dd');
      let c = this.datePipe.transform(this.f.advncDedctnAmtToDt.value, 'yyyy-MM-dd');

      if (b) {
        if (c < b) {
          this.isValidEndDt = true;
          this.isValidStartDt = false;
        }
        else {
          this.isValidEndDt = false;
          this.isValidStartDt = false;
        }
      } else {
        this.isValidEndDt = false;
      }
    }
  }

  //-------------------------create vehicle -----

  createvehicleCargoCapacityArray(obj) {
    //console.log(this.editEffectiveDt, this.editExpdt, 'date is comming from contract ')
    obj.forEach(element => {
      let objData = {
        "assocCntrId": AppSetting.associateId,
        "effectiveDt": this.editEffectiveDt,
        "expDt": this.editExpdt,
        "recIdentifier": "",
        "lateArrChrg": "",
        "lkpCargoCapacityTypeId": element.id,
        "maxDedctnAmt": "",
        "nrmDeductionId": "",
        "lookupVal": element.lookupVal
      }
      this.vehicleCargoCapacityArray.push(objData)
    });
    this.vehicleCargoCapacityArray = [...this.vehicleCargoCapacityArray]
  }

  /*------- Add edit status --------- */
  addEditStatus(obj) {
    if(this.editflow){
      obj.status = AppSetting.editStatus;
    }
  }
  
  nextReadMode() {
    if(this.editflow){
      this.router.navigate(['asso_network-contract/booking-document',{ steper:true,'editflow': 'true' }], {skipLocationChange: true});
    }else{
      this.router.navigate(['asso_network-contract/booking-document'], {skipLocationChange: true});
    }
  }

  onChangeLateArrivalPenalty(value) {
    console.log('vehicleCargoCapacityArray',this.vehicleCargoCapacityArray)
   
  }

}

