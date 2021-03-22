import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../../core/services/api.service';
import { ErrorConstants } from '../../core/models/constants';
import { AppSetting } from '../../app.setting';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-booking-sla-show',
  templateUrl: './booking-sla-show.component.html',
  styleUrls: ['./booking-sla-show.component.css'],
  providers : [DatePipe]
})

export class BookingSlaShowComponent implements OnInit {
  deductionForm : FormGroup;
  deductionID : number;
  deductionData : any;
  contractData : any;
  editflow : boolean;
  associateData : any;
  perList: any = [];
  exAttrMap = new Map();
  exAttrKeyList =  [];

  constructor(private fb : FormBuilder,
              private apiService: ApiService,
              private tosterservice : ToastrService,
              private spinner: NgxSpinnerService,
              private datePipe: DatePipe,
              private router : Router,
              private authorizationService : AuthorizationService,
              private permissionsService: NgxPermissionsService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.authorizationService.setPermissions('COMMERCIAL');
    this.perList = this.authorizationService.getPermissions('COMMERCIAL') == null ? [] : this.authorizationService.getPermissions('COMMERCIAL');
    this.permissionsService.loadPermissions(this.perList);
    this.exAttrMap = this.authorizationService.getExcludedAttributes('DEDUCTION');
    this.exAttrKeyList = Array.from(this.exAttrMap.values());
    console.log('Attribute List', this.exAttrKeyList);
    console.log('perlist',this.perList);

    this.route.params.subscribe(x => {
      this.editflow = x.editflow;
    });
    this.spinner.show();

    this.associateData = AppSetting.associateObject;

    this.apiService.get('secure/v1/airfreightcontract/'+AppSetting.contractId).subscribe(data => {
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

    this.apiService.get('secure/v1/deduction/'+AppSetting.contractId).subscribe(response => {
      let ob = ErrorConstants.validateException(response);
      if(ob.isSuccess){
        if(response.data.responseData && Object.keys(response.data.responseData).length > 0){
          this.deductionData =  response.data.responseData;
          console.log('deduction Data',this.deductionData)
          this.deductionID = this.deductionData.id;
          this.renderDeductionData();
          this.spinner.hide();
        } else {
          this.deductionID = 0;
          this.spinner.hide();
        }

      } else {
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }
    }, (error) => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    })

    this.deductionForm = this.fb.group({
      
        assocCntrId: [AppSetting.contractId],
        effectiveDt: null,
        expDt : null,
        id: [this.deductionID],
        slaFlag: [null ,Validators.required],
        dedctnLostFlag:[null ,Validators.required],
        lateArrFlag: [null,Validators.required],
        lateArrChrg: ['',Validators.required],
        maxDedctn: ['',Validators.required],
        offloadDedctn:['',Validators.required],
        recIdentifier: ['']
       
    });
    
  }

  get f() {return this.deductionForm.controls }    // get form controls


 renderDeductionData() {

  this.deductionForm.patchValue({
        assocCntrId: this.deductionData.assocCntrId,
        effectiveDt: this.deductionData.effectiveDt,
        expDt: this.deductionData.expDt,
        id: this.deductionID,
        slaFlag: this.deductionData.slaFlag,
        recIdentifier : this.deductionData.recIdentifier,
        dedctnLostFlag: this.deductionData.dedctnLostFlag,
        lateArrFlag: this.deductionData.lateArrFlag,
        lateArrChrg: this.deductionData.lateArrChrg,
        maxDedctn: this.deductionData.maxDedctn,
        offloadDedctn: this.deductionData.offloadDedctn
  });
  this.onChangeLateArrival(this.deductionData.lateArrFlag);

 }

  /*---------  On Save Deduction Data ------- */
  onSaveDeduction(flag) {
   
    console.log('this.deductionForm', this.deductionForm);
    this.deductionForm.markAllAsTouched();
    if(this.deductionForm.invalid){
      return;
    }

    let finalDeductionData : any = {};
     finalDeductionData = {...this.deductionForm.value};
    
    finalDeductionData.effectiveDt = this.deductionForm.value.effectiveDt ? this.datePipe.transform(this.deductionForm.value.effectiveDt, 'yyyy-MM-dd') : null;
    if(this.deductionForm.value.expDt){
      finalDeductionData.expDt =  this.datePipe.transform(this.deductionForm.value.expDt, 'yyyy-MM-dd');
    }
    
     
    if(this.deductionID == 0){
     delete finalDeductionData.id;
    }
    if(this.editflow && this.deductionForm.dirty){
      finalDeductionData.status = AppSetting.editStatus
    }
    this.spinner.show();

    this.apiService.post('secure/v1/deduction',finalDeductionData).subscribe(res => {
     
      if(flag == 0){
        if(this.editflow){
          this.router.navigate(['/asso_air-contract/booking-document',{steper:true, editflow : this.editflow}], {skipLocationChange: true})
        } else {
          this.router.navigate(['/asso_air-contract/booking-document'], {skipLocationChange: true});
        }
        this.spinner.hide();
      } else {
        this.deductionID = res.data.responseData;
        this.deductionForm.controls.id.setValue(this.deductionID);
      }
      this.tosterservice.success('Saved Successfully');
      this.spinner.hide();
    }, (error) => {
      this.tosterservice.error(error.error.errors.error[0].description);
      this.spinner.hide();
    })
  }

  nextReadMode() {
    if(this.editflow){
      this.router.navigate(['/asso_air-contract/booking-document',{steper:true, editflow : this.editflow}], {skipLocationChange: true})
    } else {
      this.router.navigate(['/asso_air-contract/booking-document'], {skipLocationChange: true});
    }
  }

  /*------- On Change Late Arrival penalty flag --------- */
  onChangeLateArrival(value) {
    if(value == 1) {
      this.f.lateArrChrg.enable();
    } else {
      this.f.lateArrChrg.disable();
    }
  }

}
