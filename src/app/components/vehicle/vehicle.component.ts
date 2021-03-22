import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { AppService } from '../../core/services/app.service';
import { AppSetting } from '../../app.setting';
import { ApiService } from '../../core/services/api.service';
import { ErrorConstants } from '../../core/models/constants'


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
  providers:[DatePipe]
})
export class VehicleComponent implements OnInit {
  vehicleForm: FormGroup;
  vehicleData: any;

  vehicleModelList: any[] = [];
  vehicleMakeList: any[] = [];
  vehicleBodyList: any[] = [];
  stateList: any[] = [];
  filteredModelList: any[] = [];
  vehicleMakeId: number;
  maxdate : Date;
  isValidEffectiveDt : boolean;
  isValidExpDt : boolean;
  minDate : Date;
  associateData : any;
  searchStateName = '';
  searchStateName1 = '';
  searchVehMake = '';
  searchVehModel = '';
  id ='';

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService,
    private appService: AppService,
    private router: Router,
    private apiService: ApiService,
    private datePipe: DatePipe,
    private tosterservice : ToastrService) { }

  ngOnInit() {
    let e = new Date();
    e.setDate(e.getDate());
    this.maxdate = e;
    this.associateData = AppSetting.associateData;
    this.spinner.show();
    if (AppSetting.vehicleId === 0) {
      this.apiService.get('secure/v1/associates/vehicles/vehicle').subscribe(res => {
        let ob = ErrorConstants.validateException(res);
        if(ob.isSuccess){
        this.vehicleMakeList = res.data.referenceData.vehicleMakeList;
        this.vehicleModelList = res.data.referenceData.vehicleModelList;
        this.vehicleBodyList = res.data.referenceData.vehicleBodyList;
        this.stateList = res.data.referenceData.stateList;
        this.spinner.hide();
        this.minDate = new Date();
          
        } else {
          this.tosterservice.error(ob.message);
          this.spinner.hide();
        }
      }, (error) => {
        this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      })
    } else {
      this.apiService.get('secure/v1/associates/vehicles/vehicle/' + AppSetting.vehicleId).subscribe(res => {
        let ob = ErrorConstants.validateException(res);
        if (ob.isSuccess) {
          this.vehicleMakeList = res.data.referenceData.vehicleMakeList;
          this.vehicleModelList = res.data.referenceData.vehicleModelList;
          this.vehicleBodyList = res.data.referenceData.vehicleBodyList;
          this.stateList = res.data.referenceData.stateList;
          this.vehicleData = res.data.responseData;
          this.renderVehicleData();
          this.spinner.hide();
        } else {
          this.tosterservice.error(ob.message);
          this.spinner.hide();
        } 
      }, (error) => {
        this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      })
    }

    this.vehicleForm = this.fb.group({
      id: ['0'],
      assocId: [AppSetting.associateId],
      sfxFinFlag: [null, Validators.required],
      vendorMktFlag: [null, Validators.required],
      vehicleOwner: ['', Validators.required],
      vehicleModelId: ['', Validators.required],
      vehicleMakeId : ['', Validators.required],
      vehicleModelYear: ['', Validators.required],
      vehicleNum: ['',[ Validators.required, Validators.pattern('(?:[a-zA-Z0-9]*[a-zA-Z]){4,}.*')]],
      engineNum: ['', Validators.required],
      chassisNum: ['', Validators.required],
      regStateId: ['', Validators.required],
      regUpto: ['', Validators.required],
      insuNum: ['', Validators.required],
      insuComapny: ['', Validators.required],
      insuUpto: ['', Validators.required],
      taxPaidFlag: [null, Validators.required],
      taxPaidDt: ['', Validators.required],
      taxPaidValidity: ['', Validators.required],
      nationalPermitFlag: [null, Validators.required],
      pollutionCheckFlag: [null, Validators.required],
      pollutionCheckDt: ['', Validators.required],
      pollutionValidity: ['', Validators.required],
      fitnessCheckFlag: [null, Validators.required],
      fitnessCheckDt: ['', Validators.required],
      fitnessCheckValidity: ['', Validators.required],
      bodyLength: ['', Validators.required],
      bodyWidth: ['', Validators.required],
      bodyHeight: ['', Validators.required],
      tareWt: ['', Validators.required],
      paintedLogoFlag: [null, Validators.required],
      bodyPaintDt: ['', Validators.required],
      vehicleAcFlag: [null, Validators.required],
      bodyAcFlag: [null, Validators.required],
      gpsEnabledFlag: [null, Validators.required],
      gpsDeviceNum: ['', Validators.required],
      gpsVendor: ['', Validators.required],
      fastTagFlag: [null, Validators.required],
      fastTagNum: ['', Validators.required],
      effectiveDt: ['', Validators.required],
      expDt: [''],
      status: [1, Validators.required],
      descr: [''],
      lkpVehicleBodyId: ['', Validators.required],
      vehicleStatePermits: []
    });
    this.onChangeVendorMktFlag(0);
    this.onChangeTaxPaidFlag(0);
    this.onChangePollutionCheckFlag(0);
    this.onChangeFitnessCheckFlag(0);
    this.onChangeGpsFlag(0);
    this.onChangeFastTagFlag(0);
    this.onChangeBodyPaintFlag(0);
    this.onChangeVehicleAcFlag(0);
    if(AppSetting.vehicleId === 0){
      this.f.status.disable();
    }
  }

  get f() {return this.vehicleForm.controls}

  renderVehicleData() {
   // this.minDate = new Date(this.vehicleData.effectiveDt);
   this.minDate = null;
    // let e = new Date(this.vehicleData.effectiveDt);
    // e.setDate(e.getDate()+1);
    // this.maxdate = e;

    this.onChangeVendorMktFlag(this.vehicleData.vendorMktFlag);
    this.onChangeTaxPaidFlag(this.vehicleData.taxPaidFlag);
    this.onChangePollutionCheckFlag(this.vehicleData.pollutionCheckFlag);
    this.onChangeFitnessCheckFlag(this.vehicleData.fitnessCheckFlag);
    this.onChangeGpsFlag(this.vehicleData.gpsEnabledFlag);
    this.onChangeFastTagFlag(this.vehicleData.fastTagFlag);
    this.onChangeBodyPaintFlag(this.vehicleData.paintedLogoFlag);
    this.onChangeVehicleAcFlag(this.vehicleData.vehicleAcFlag);

    var vehicleStatePermitArray = this.vehicleData.vehicleStatePermits.map(({ stateId }) => stateId);

    const modelData = this.vehicleModelList.find(model => model.id == this.vehicleData.vehicleModelId);
    if (modelData !== undefined) {
      this.vehicleMakeId = modelData.vehicleMakeId
      this.onSelectMake(this.vehicleMakeId);
    }

    this.vehicleForm.patchValue({
      id: this.vehicleData.id,
      assocId: this.vehicleData.assocId,
      sfxFinFlag: this.vehicleData.sfxFinFlag,
      vendorMktFlag: this.vehicleData.vendorMktFlag,
      vehicleOwner: this.vehicleData.vehicleOwner,
      vehicleModelId: this.vehicleData.vehicleModelId,
      vehicleMakeId :this.vehicleMakeId,
      vehicleModelYear: this.vehicleData.vehicleModelYear,
      vehicleNum: this.vehicleData.vehicleNum,
      engineNum: this.vehicleData.engineNum,
      chassisNum: this.vehicleData.chassisNum,
      regStateId: this.vehicleData.regStateId,
      regUpto: this.vehicleData.regUpto,
      insuNum: this.vehicleData.insuNum,
      insuComapny: this.vehicleData.insuComapny,
      insuUpto: this.vehicleData.insuUpto,
      taxPaidFlag: this.vehicleData.taxPaidFlag,
      taxPaidDt: this.vehicleData.taxPaidDt,
      taxPaidValidity: this.vehicleData.taxPaidValidity,
      nationalPermitFlag: this.vehicleData.nationalPermitFlag,
      pollutionCheckFlag: this.vehicleData.pollutionCheckFlag,
      pollutionCheckDt: this.vehicleData.pollutionCheckDt,
      pollutionValidity: this.vehicleData.pollutionValidity,
      fitnessCheckFlag: this.vehicleData.fitnessCheckFlag,
      fitnessCheckDt: this.vehicleData.fitnessCheckDt,
      fitnessCheckValidity: this.vehicleData.fitnessCheckValidity,
      bodyLength: this.vehicleData.bodyLength,
      bodyWidth: this.vehicleData.bodyWidth,
      bodyHeight: this.vehicleData.bodyHeight,
      tareWt: this.vehicleData.tareWt,
      paintedLogoFlag: this.vehicleData.paintedLogoFlag,
      bodyPaintDt: this.vehicleData.bodyPaintDt,
      vehicleAcFlag: this.vehicleData.vehicleAcFlag,
      bodyAcFlag: this.vehicleData.bodyAcFlag,
      gpsEnabledFlag: this.vehicleData.gpsEnabledFlag,
      gpsDeviceNum: this.vehicleData.gpsDeviceNum,
      gpsVendor: this.vehicleData.gpsVendor,
      fastTagFlag: this.vehicleData.fastTagFlag,
      fastTagNum: this.vehicleData.fastTagNum,
      effectiveDt: this.vehicleData.effectiveDt,
      expDt: this.vehicleData.expDt,
      status: this.vehicleData.status,
      descr: this.vehicleData.descr,
      lkpVehicleBodyId: this.vehicleData.lkpVehicleBodyId,
      vehicleStatePermits: vehicleStatePermitArray
    });
    this. expDate();
    this.f.vehicleNum.disable();
  }

  onSaveVehicle() {

    this.vehicleForm.markAllAsTouched();
    if(this.vehicleForm.invalid || this.isValidExpDt || this.isValidEffectiveDt){
      return;
    }
    this.f.status.enable();
    var finalArray;

    if (AppSetting.vehicleId !== 0) {
      var previousData = this.vehicleForm.value.vehicleStatePermits.filter(x => this.vehicleData.vehicleStatePermits.find(y => y.stateId === x));
    
      let previousArray: any = [];
      for (let i = 0; i < previousData.length; i++) {
        previousArray.push({
          id: this.vehicleData.vehicleStatePermits.find(({ id }) => id).id,
          stateId: previousData[i]
        })
      }

      var newData = this.vehicleForm.value.vehicleStatePermits.filter(x => !previousData.find(y => x === y));
     
      let newArray: any = [];
      for (let j = 0; j < newData.length; j++) {
        newArray.push({
          stateId: newData[j]
        })
      }

      finalArray = previousArray.concat(newArray);

    } else {

    if(this.vehicleForm.value.vehicleStatePermits !== null){
      finalArray = new Array(this.vehicleForm.value.vehicleStatePermits.length);
      for (let j = 0; j < this.vehicleForm.value.vehicleStatePermits.length; j++) {
        var obj1 = {
          stateId: this.vehicleForm.value.vehicleStatePermits[j]
        }
        finalArray[j] = obj1;
      }
    }
   }


   var vehicleData: any = {};
   this.f.vehicleNum.enable();
   vehicleData = this.vehicleForm.value;
   vehicleData.regUpto = this.datePipe.transform(this.vehicleForm.value.regUpto, 'yyyy-MM-dd');
   vehicleData.insuUpto = this.datePipe.transform(this.vehicleForm.value.insuUpto, 'yyyy-MM-dd');

   
   if(vehicleData.taxPaidFlag == 1){
     vehicleData.taxPaidDt = this.datePipe.transform(this.vehicleForm.value.taxPaidDt, 'yyyy-MM-dd') 
   }
    
  if(vehicleData.taxPaidFlag == 1){
     vehicleData.taxPaidValidity = this.datePipe.transform(this.vehicleForm.value.taxPaidValidity, 'yyyy-MM-dd')
   }
   
   if(vehicleData.pollutionCheckFlag == 1){
     vehicleData.pollutionCheckDt = this.datePipe.transform(this.vehicleForm.value.pollutionCheckDt, 'yyyy-MM-dd')
   }
   if(vehicleData.pollutionCheckFlag == 1){
     vehicleData.pollutionValidity = this.datePipe.transform(this.vehicleForm.value.pollutionValidity, 'yyyy-MM-dd')
   }

   if(vehicleData.fitnessCheckFlag == 1){
     vehicleData.fitnessCheckDt = this.datePipe.transform(this.vehicleForm.value.fitnessCheckDt, 'yyyy-MM-dd') 
   }
   if(vehicleData.fitnessCheckFlag == 1){
     vehicleData.fitnessCheckValidity = this.datePipe.transform(this.vehicleForm.value.fitnessCheckValidity, 'yyyy-MM-dd') 
   }
   if(vehicleData.paintedLogoFlag == 1){
     vehicleData.bodyPaintDt = this.datePipe.transform(this.vehicleForm.value.bodyPaintDt, 'yyyy-MM-dd')
   }
  //  vehicleData.taxPaidFlag == 1 ? vehicleData.taxPaidDt = this.datePipe.transform(this.vehicleForm.value.taxPaidDt, 'yyyy-MM-dd') : '';
  //  vehicleData.taxPaidFlag == 1 ? vehicleData.taxPaidValidity = this.datePipe.transform(this.vehicleForm.value.taxPaidValidity, 'yyyy-MM-dd'):'';
  //  vehicleData.pollutionCheckFlag == 1 ? vehicleData.pollutionCheckDt = this.datePipe.transform(this.vehicleForm.value.pollutionCheckDt, 'yyyy-MM-dd'):'';
  //  vehicleData.pollutionCheckFlag == 1 ? vehicleData.pollutionValidity = this.datePipe.transform(this.vehicleForm.value.pollutionValidity, 'yyyy-MM-dd'):'';
  //  vehicleData.fitnessCheckFlag == 1 ? vehicleData.fitnessCheckDt = this.datePipe.transform(this.vehicleForm.value.fitnessCheckDt, 'yyyy-MM-dd') : '';
  //  vehicleData.fitnessCheckFlag == 1 ? vehicleData.fitnessCheckValidity = this.datePipe.transform(this.vehicleForm.value.fitnessCheckValidity, 'yyyy-MM-dd') : '';
  //  vehicleData.paintedLogoFlag == 1 ? vehicleData.bodyPaintDt = this.datePipe.transform(this.vehicleForm.value.bodyPaintDt, 'yyyy-MM-dd'): '';
   vehicleData.effectiveDt = this.datePipe.transform(this.vehicleForm.value.effectiveDt, 'yyyy-MM-dd');
   vehicleData.expDt = this.datePipe.transform(this.vehicleForm.value.expDt, 'yyyy-MM-dd');
  
   vehicleData.vehicleStatePermits = finalArray;

    this.spinner.show();
    this.apiService.post('secure/v1/associates/vehicles', vehicleData).subscribe(res => {
      this.spinner.hide();
      this.router.navigate(['/asso_air-contract/vehicle-allocation'], {skipLocationChange: true});
    }, (error) => {
      this.tosterservice.error(error.error.errors.error[0].description);
      this.spinner.hide();
    })
  }

  /*----- On select make --------- */
  onSelectMake(id) {
    this.vehicleMakeId = id;
    this.filteredModelList = this.vehicleModelList.filter(x => x.vehicleMakeId === id);
  }

  /*--------  On change Effective Date----------- */
  effectiveDate() {
    let effYear = parseInt(this.datePipe.transform(this.vehicleForm.controls.effectiveDt.value, 'yyyy'));
    if (effYear > 9999) {
      this.vehicleForm.controls.effectiveDt.setValue('');
    } else {
        let b = this.datePipe.transform(this.f.effectiveDt.value, 'yyyy-MM-dd');
        let c = this.datePipe.transform(this.f.expDt.value, 'yyyy-MM-dd');
  
        if (c) {
          if (b <= c) {
            this.isValidEffectiveDt = false;
          }
          else {
            this.isValidEffectiveDt = true;
            this.isValidExpDt = false;
          }
        } 
        else {
          this.isValidEffectiveDt = false
        }
      }
  }

  /*--------  On change Expiry Date----------- */
  expDate() {
    let expYear = parseInt(this.datePipe.transform(this.f.expDt.value, 'yyyy'))
    if (expYear > 9999) {
      this.f.expDt.setValue('');
    } else {
      let a = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      let b = this.datePipe.transform(this.f.effectiveDt.value, 'yyyy-MM-dd')
      let c = this.datePipe.transform(this.f.expDt.value, 'yyyy-MM-dd')
      if (b && c !== null) {
        if (b < c && c > a) {
          this.isValidExpDt = false;
          this.isValidEffectiveDt = false;
        }
        else {
          this.isValidExpDt = true;
          this.isValidEffectiveDt = false;
        }
      } else {
        this.isValidExpDt = false;
        this.isValidEffectiveDt = false;
      }
      // if (c) {
      //   if (b <= c) {
      //     this.isValidExpDt = false;
      //   }
      //   else {
      //     this.isValidExpDt = true;
      //   }
      // } else {
      //   this.isValidEffectiveDt = false
      // }
    }
  }
  
  /*--------- Radio button methods --------- */
  onChangeTaxPaidFlag(value){
    if(value == 1){
      this.vehicleForm.controls.taxPaidDt.enable();
      this.vehicleForm.controls.taxPaidValidity.enable();
    } else {
      this.vehicleForm.controls.taxPaidDt.disable();
      this.vehicleForm.controls.taxPaidValidity.disable();
    }
  }

  onChangePollutionCheckFlag(value) {
    if(value == 1){
      this.vehicleForm.controls.pollutionCheckDt.enable();
      this.vehicleForm.controls.pollutionValidity.enable();
    } else {
      this.vehicleForm.controls.pollutionCheckDt.disable();
      this.vehicleForm.controls.pollutionValidity.disable();
    }
  }

  onChangeFitnessCheckFlag(value) {
    if(value == 1){
      this.vehicleForm.controls.fitnessCheckDt.enable();
      this.vehicleForm.controls.fitnessCheckValidity.enable();
    } else {
      this.vehicleForm.controls.fitnessCheckDt.disable();
      this.vehicleForm.controls.fitnessCheckValidity.disable();
    }
  }

  onChangeGpsFlag(value) {
    if(value == 1){
      this.vehicleForm.controls.gpsDeviceNum.enable();
      this.vehicleForm.controls.gpsVendor.enable();
    } else {
      this.vehicleForm.controls.gpsDeviceNum.disable();
      this.vehicleForm.controls.gpsVendor.disable();
    }
  }

  onChangeFastTagFlag(value) {
    if(value == 1){
      this.vehicleForm.controls.fastTagNum.enable();
    } else {
      this.vehicleForm.controls.fastTagNum.disable();
    }
  }

  onChangeVendorMktFlag(value) {
    if(value == 1){
      this.vehicleForm.controls.vehicleOwner.enable();
    } else {
      this.vehicleForm.controls.vehicleOwner.disable();
    }
  }
  onChangeBodyPaintFlag(value) {
    if(value == 1){
      this.vehicleForm.controls.bodyPaintDt.enable();
    } else {
      this.vehicleForm.controls.bodyPaintDt.disable();
    }
  }
  onChangeVehicleAcFlag(value) {
    if(value == 1){
      this.vehicleForm.controls.bodyAcFlag.enable();
    } else {
      this.vehicleForm.controls.bodyAcFlag.disable();
    }
  }
  /*---------- check date validation ---------- */
  checkValidDate(control) {
    let expYear = parseInt(this.datePipe.transform(control.value, 'yyyy'));
    if (expYear > 9999) {
      control.setValue('');
    }
  }

  selected= null;
  getToolTipDEata(data){
    if(data && data.length){
      let msg="";
      this.stateList.forEach(res=>{
        for(let i = 0; i < data.length; i++) {
          if(res.id === data[i]) {
            msg+=res.stateName + " ";
          }
        }
      })
      return msg;
    }else{
      return;
    }
  }

  onBackClick($event) {
    $event.preventDefault();
    this.router.navigate(['/asso_air-contract/vehicle-allocation'], { skipLocationChange: true });
  }
}
