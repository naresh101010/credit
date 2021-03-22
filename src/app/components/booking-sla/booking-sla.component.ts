import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

import { ApiService } from '../../core/services/api.service';
import { ErrorConstants } from '../../core/models/constants';
import { AppSetting } from '../../app.setting';
import { AuthorizationService } from '../../core/services/authorization.service';
import { SlaCalulationComponent } from '../../dialog/sla-calulation/sla-calulation.component';


@Component({
  selector: 'app-booking-sla',
  templateUrl: './booking-sla.component.html',
  styleUrls: ['./booking-sla.component.css'],
  providers : [DatePipe]
})
export class BookingSlaComponent implements OnInit {
  deductionForm : FormGroup;
  cargoSlas: any[] = [];
  deductionID : number;
  deductionData : any;
  SlaDeductionArray : any[] = [];
  oldSlaDeductions : any[] = [];
  SlaDatasource : any;
  contractData : any;
  displayedColumns: string[] = ['vehicleModelName', 'loadingTime', 'unloadingTime', 'icon'];
  maxdate : Date;
  isValidStartDt : boolean;
  isValidEndDt : boolean;
  minDate : Date;
  editflow : boolean;
  associateData : any;
  perList: any = [];
  exAttrMap = new Map();
  exAttrKeyList =  [];
  deductionRefData : any;

  constructor(public dialog: MatDialog,
              private fb : FormBuilder,
              private apiService: ApiService,
              private tosterservice : ToastrService,
              private spinner: NgxSpinnerService,
              private datePipe: DatePipe,
              private router : Router,
              private route: ActivatedRoute,
              private authorizationService : AuthorizationService,
              private permissionsService: NgxPermissionsService) { }

  ngOnInit() {
    this.authorizationService.setPermissions('COMMERCIAL');
    this.perList = this.authorizationService.getPermissions('COMMERCIAL') == null ? [] : this.authorizationService.getPermissions('COMMERCIAL');
    this.permissionsService.loadPermissions(this.perList);
    this.exAttrMap = this.authorizationService.getExcludedAttributes('DEDUCTION');
    this.exAttrKeyList = Array.from(this.exAttrMap.values());
    console.log('perlist',this.perList);
    console.log('attributelist',this.exAttrKeyList);

    this.route.params.subscribe(x => {
      this.editflow = x.editflow;
    });
    this.spinner.show();
   
    this.associateData = AppSetting.associateObject;
    this.apiService.get('secure/v1/cargocontract/'+AppSetting.contractId).subscribe(data => {
      console.log('Data', data);
      let ob = ErrorConstants.validateException(data);
      if(ob.isSuccess){
        this.contractData = data.data.responseData;
        this.deductionForm.patchValue({
          effectiveDt: this.contractData.effectiveDt,
          expDt : this.contractData.expDt,
        })
      }
    },(error) => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    })
    console.log('Contract ID', AppSetting.contractId);
    this.apiService.get('secure/v1/cargocontract/deduction/'+AppSetting.contractId).subscribe(response => {
      let ob = ErrorConstants.validateException(response);
      console.log('SLA Response', response);
      if(ob.isSuccess){
        this.deductionRefData = response.data.referenceData;
        if(response.data.responseData && Object.keys(response.data.responseData).length > 0){
          this.deductionData =  response.data.responseData;
         
          console.log('deduction Data',this.deductionData);
          this.cargoSlas = this.deductionData.cargoSlas;
          this.deductionID = this.deductionData.id;
          this.renderDeductionData();
        } else {
          this.deductionID = 0;
          this.minDate = new Date();
          let e = new Date();
          e.setDate(e.getDate()+1);
          this.maxdate = e;
        }
        this.spinner.hide();
      } else {
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }
    }, (error) => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    })

    this.deductionForm = this.fb.group({
        advncDedctnAmt: ['',Validators.required],
        advncDedctnAmtFlag: [null,Validators.required],
        advncDedctnAmtFromDt: ['', Validators.required],
        advncDedctnAmtToDt: [''],
        assocCntrId: [AppSetting.contractId],
        cargoSlas: [],
        effectiveDt: null,
        expDt : null,
        id: [this.deductionID],
        mishandlingFlag: [null,Validators.required],
        mishandlingRemark: ['',Validators.required],
        recIdentifier: [''],
        schLatePnltyFlag: [null,Validators.required],
        schLatePnltyRemark: ['',Validators.required],
       
    });
    this.isAdvanceAmount(0);
  }


  get f() {return this.deductionForm.controls }    // get form controls

  
  openSlaModal(){
    let dialog = this.dialog.open(SlaCalulationComponent, {
      width: '92rem',
      data : {referenceData: this.deductionRefData, previousData : this.SlaDeductionArray, oldData : this.oldSlaDeductions, editflow : this.editflow},
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });

    dialog.afterClosed().subscribe(data => {
      if(data !== undefined){
        this.SlaDeductionArray = data;
        console.log('after close model',this.SlaDeductionArray);
        this.SlaDatasource = new MatTableDataSource<any>(this.SlaDeductionArray);
      }
    })
  }



 renderDeductionData() {
   if(this.deductionData.advncDedctnAmtFlag == 1){
      this.minDate = new Date(this.deductionData.advncDedctnAmtFromDt);
      let e = new Date(this.deductionData.advncDedctnAmtFromDt);
      e.setDate(e.getDate()+1);
      this.maxdate = e;
   } else {
      this.minDate = new Date();
      let e = new Date();
      e.setDate(e.getDate()+1);
      this.maxdate = e;
   }

  if(this.deductionData.cargoSlas !== undefined){
    this.SlaDeductionArray =  [...this.deductionData.cargoSlas];
    this.oldSlaDeductions = [...this.SlaDeductionArray];
    this.SlaDatasource = new MatTableDataSource<any>(this.SlaDeductionArray);
  }
  
  this.isAdvanceAmount(this.deductionData.advncDedctnAmtFlag);
  this.onChangeLatePenaltyFlag(this.deductionData.schLatePnltyFlag);
  this.onChangeMishandlingFlag(this.deductionData.mishandlingFlag);

  this.deductionForm.patchValue({
        advncDedctnAmt: this.deductionData.advncDedctnAmt,
        advncDedctnAmtFlag: this.deductionData.advncDedctnAmtFlag,
        advncDedctnAmtFromDt: this.deductionData.advncDedctnAmtFromDt,
        advncDedctnAmtToDt: this.deductionData.advncDedctnAmtToDt,
        assocCntrId: this.deductionData.assocCntrId,
        effectiveDt: this.deductionData.effectiveDt,
        expDt: this.deductionData.expDt,
        id: this.deductionID,
        mishandlingFlag: this.deductionData.mishandlingFlag,
        mishandlingRemark: this.deductionData.mishandlingRemark,
        schLatePnltyFlag: this.deductionData.schLatePnltyFlag,
        schLatePnltyRemark: this.deductionData.schLatePnltyRemark,
        recIdentifier : this.deductionData.recIdentifier,
        cargoSlas: this.deductionData.cargoSlas,
        
  });

 }

  /*---------  On Save Deduction Data ------- */
  onSaveDeduction(flag) {
    this.deductionForm.markAllAsTouched();
    if(this.deductionForm.invalid || this.isValidStartDt || this.isValidEndDt){
      return;
    }

    let finalDeductionData : any = {};
    finalDeductionData = {...this.deductionForm.value};
    // if(this.emiDeductionArray === undefined && this.insuranceDeductionArray === undefined)
    if(this.SlaDeductionArray === undefined){
      finalDeductionData.cargoSlas = [];
    } else {
      finalDeductionData.cargoSlas = this.SlaDeductionArray;
    }

    finalDeductionData.effectiveDt = this.deductionForm.value.effectiveDt ? this.datePipe.transform(this.deductionForm.value.effectiveDt, 'yyyy-MM-dd') : null;
    if(this.deductionForm.value.expDt){
      finalDeductionData.expDt =  this.datePipe.transform(this.deductionForm.value.expDt, 'yyyy-MM-dd');
    }
    finalDeductionData.advncDedctnAmtFlag == 1 ? finalDeductionData.advncDedctnAmtFromDt = this.datePipe.transform(this.deductionForm.value.advncDedctnAmtFromDt, 'yyyy-MM-dd') : '';
    finalDeductionData.advncDedctnAmtFlag == 1 ? finalDeductionData.advncDedctnAmtToDt = this.datePipe.transform(this.deductionForm.value.advncDedctnAmtToDt, 'yyyy-MM-dd') : '';

    for(let i=0; i< finalDeductionData.cargoSlas.length; i++){
      if(finalDeductionData.cargoSlas[i].id === 0){
        delete finalDeductionData.cargoSlas[i].id;
      }
      finalDeductionData.cargoSlas[i].effectiveDt = this.contractData.effectiveDt;
      finalDeductionData.cargoSlas[i].expDt = this.contractData.expDt;
    }
    if(this.deductionID == 0){
     delete finalDeductionData.id;
    } else {
      if(this.deductionData.status)
        finalDeductionData.status = this.deductionData.status; 
    }
    (this.editflow && this.deductionForm.dirty) ? finalDeductionData.status = AppSetting.editStatus : '';
 
   this.spinner.show();
   console.log('Final Deduction', finalDeductionData);
   console.log('stringify',JSON.stringify(finalDeductionData))
   
    this.apiService.post('secure/v1/cargocontract/deduction',finalDeductionData).subscribe(res => {
     
      if(flag == 0){
        if(this.editflow){
          this.router.navigate(['/asso_cargo-contract/booking-document',{steper:true, editflow : this.editflow}], {skipLocationChange: true})
        } else {
          this.router.navigate(['/asso_cargo-contract/booking-document'], {skipLocationChange: true});
        }
      } else {
        this.deductionID = res.data.responseData;
        this.deductionForm.controls.id.setValue(this.deductionID);
        this.tosterservice.success('Deduction Saved Successfully')
      }
      this.spinner.hide();
    }, (error) => {
      this.tosterservice.error(error.error.errors.error[0].description);
      this.spinner.hide();
    })
  }

  nextReadMode() {
    if(this.editflow){
      this.router.navigate(['/asso_cargo-contract/booking-document',{steper:true, editflow : this.editflow}], {skipLocationChange: true})
    } else {
      this.router.navigate(['/asso_cargo-contract/booking-document'], {skipLocationChange: true});
    }
  }

 /*------------ return vehicle type name name ------- */
 getVehicleTypeName(id) {
  let type = this.deductionRefData.vehicleTypeList.find(x=> x.id === id);
  if(type !== undefined) {
    return  type.lookupVal;
  } else {
    return '';
  }
}

removeSladeduction(i){
  this.SlaDeductionArray.splice(i,1);
  this.SlaDatasource = new MatTableDataSource<any>(this.SlaDeductionArray);
}


 /*----------- check advance amount --------- */
 isAdvanceAmount(value) {
   if(value == 1){
     this.f.advncDedctnAmt.enable();
     this.f.advncDedctnAmtFromDt.enable();
    // this.f.advncDedctnAmtToDt.enable();
   } else {
    this.f.advncDedctnAmt.disable();
    this.f.advncDedctnAmtFromDt.disable();
   // this.f.advncDedctnAmtToDt.disable();
   }
 }

 /*--------- On change MisHandling charges ----------- */
 onChangeMishandlingFlag(value) {
  if(value == 1){
    this.deductionForm.controls.mishandlingRemark.enable();
  } else {
    this.deductionForm.controls.mishandlingRemark.disable();
  }
}

/*--------- On change  Schedule Late Penalty ----------- */
onChangeLatePenaltyFlag(value) {
  if(value == 1){
    this.deductionForm.controls.schLatePnltyRemark.enable();
  } else {
    this.deductionForm.controls.schLatePnltyRemark.disable();
  }
}

  /*--------  On change Start Date----------- */
  effectiveDate() {
    let effYear = parseInt(this.datePipe.transform(this.f.advncDedctnAmtFromDt.value, 'yyyy'));
    if (effYear > 9999) {
      this.f.advncDedctnAmtFromDt.setValue('');
    } else {
      let a;
      if(this.deductionID != 0 && this.deductionData.advncDedctnAmtFlag == 1){
        a = this.datePipe.transform(new Date(this.deductionData.advncDedctnAmtFromDt), 'yyyy-MM-dd');
      } else {
        a = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      }
      let b = this.datePipe.transform(this.f.advncDedctnAmtFromDt.value, 'yyyy-MM-dd');
      let c = this.datePipe.transform(this.f.advncDedctnAmtToDt.value, 'yyyy-MM-dd');
      let e = new Date(this.f.advncDedctnAmtFromDt.value);
      e.setDate(e.getDate()+1);
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


}