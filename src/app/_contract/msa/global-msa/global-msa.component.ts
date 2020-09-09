import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
//import * as msaData from './global-msa.json'
import { MSAModel } from './global-msa.model.js';
import { ContractService } from '../../contract.service';
import { ErrorConstants } from '../../models/constants';
import { NgxSpinnerService } from "ngx-spinner";
//import { TosterService } from './../../toster.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import * as _moment from 'moment';
import { defaultFormat as _rollupMoment } from 'moment';
import { MY_FORMATS, AppSetting } from '../../../app.setting';
import { DataService } from '../sharedata.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from '../../services/authorization.service';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/




interface msaLevelData {
  id: number;
  lookupVal: string;
}
@Component({
  selector: 'app-global-msa',
  templateUrl: './global-msa.component.html',
  styleUrls: ['../../core.css',
    'global-msa.component.css'],
  providers: [
    // { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    // { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class GlobalMsaComponent implements OnInit {
  msaData: MSAModel;
  notepadAttributesList: any[];
  securityTypeList: msaLevelData[];
  msaForm: FormGroup;
  msaNotepadArray: FormArray;
  msaId: any;
  msaSelectedData: any;
  editflow: boolean;
  minDate: Date;
  isValidEffectiveDt: boolean;
  isValidExpDt: boolean;
  perList: any[] = [];
  isSaved: boolean;
  checkDubMsaName:string;
  constructor(private fb: FormBuilder, private sharedSearchdata: DataService, private route: ActivatedRoute, private contractService: ContractService, private spinner: NgxSpinnerService,
    private tosterservice: ToastrService, private datePipe: DatePipe, private router: Router,
    private authorizationService: AuthorizationService,
    private permissionsService: NgxPermissionsService) {
  }
  ngOnInit() {

    this.authorizationService.setPermissions('MSA');
    this.perList = this.authorizationService.getPermissions('MSA') == null ? [] : this.authorizationService.getPermissions('MSA');
    this.permissionsService.loadPermissions(this.perList);

    let e = new Date();
    e.setDate(e.getDate() + 1);
    this.minDate = e;

    this.msaForm = this.fb.group({
      id: ['0'],
      custName: ['', Validators.required],
      custLevel: ['', Validators.required],
      descr: [''],
      status: AppSetting.draftId,
      effectiveDt: ['', Validators.required],
      expDt: ['', Validators.required],
      notepadTrans: this.fb.array([]),
      crtdBy: [''],
      crtdDt: [''],
      updBy: [''],
      updDt: [''],
      sla: ['', Validators.max(100)],
    });

    this.msaNotepadArray = <FormArray>this.msaForm.controls.notepadTrans;
    this.route.params.subscribe(x => {
      this.editflow = x.editflow;
    })
    this.spinner.show();
    //  this.sharedSearchdata.currentMessage.subscribe(contractId =>{this.msaId=contractId});
    this.contractService.getMsa({ id: AppSetting.msaId }).subscribe(success => {
      let ob = ErrorConstants.validateException(success);
      if (ob.isSuccess) {
        this.spinner.hide();
        if (AppSetting.msaId == 0) {
          this.msaData = this.msaForm.value;
        }
        else {
          this.msaData = success.data.responseData;
          this.checkDubMsaName=success.data.responseData.custName;
        }
        this.notepadAttributesList = success.data.referenceData.notepadAttributesList;
        this.securityTypeList = success.data.referenceData.securityTypeList;
        this.renderMSAData();

      } else {
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }
    },
      error => {
        this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      });
  }

  /**
   * to be called for rendering the data from ngonint
   */
  renderMSAData() {
    if (AppSetting.msaId == 0) {
      var notepadTransArray = new Array(this.notepadAttributesList.length);
      for (let i = 0; i < this.notepadAttributesList.length; i++) {
        this.msaNotepadArray.push(this.getNotepadTransFormGroup())
        let object = {
          id: 0,
          notepadId: this.notepadAttributesList[i].id,
          notepadInputVal: '',
          entityRefId: AppSetting.msaId
        }
        notepadTransArray[i] = object
      }
      this.msaForm.controls.notepadTrans.setValue(notepadTransArray);

    } else {
      AppSetting.MSALevel = this.msaData.custLevel;
      this.onSelectMSALevel(this.msaData.custLevel);
      if (this.msaData.notepadTrans != undefined) {
        var notepadTransArrayInEdit = new Array(this.msaData.notepadTrans.length);
        for (let k = 0; k < this.msaData.notepadTrans.length; k++) {
          this.msaNotepadArray.push(this.getNotepadTransFormGroup());
          let obj = {
            id: this.msaData.notepadTrans[k].id,
            notepadId: this.msaData.notepadTrans[k].notepadId,
            notepadInputVal: (this.msaData.notepadTrans[k].notepadInputVal).trim(),
            entityRefId: this.msaData.notepadTrans[k].entityRefId,
          }
          notepadTransArrayInEdit[k] = obj
        }
      }
      this.msaForm.patchValue({
        id: this.msaData.id,
        custName: this.msaData.custName,
        custLevel: this.msaData.custLevel,
        descr: this.msaData.descr,
        status: this.msaData.status,
        effectiveDt: new Date(this.msaData.effectiveDt),
        expDt: new Date(this.msaData.expDt),
        notepadTrans: notepadTransArrayInEdit,
        crtdBy: this.msaData.crtdBy,
        crtdDt: this.msaData.crtdDt,
        updBy: this.msaData.updBy,
        updDt: this.msaData.updDt,
        sla: this.msaData.sla,
      });
      this.msaForm.controls.custLevel.disable();
     
      for (let j = 0; j < this.notepadAttributesList.length; j++) {
        var isAvailable = this.msaData.notepadTrans.find(x => x.notepadId === this.notepadAttributesList[j].id)
        if (isAvailable === undefined) {
          this.msaNotepadArray.push(this.getNotepadTransFormGroup(this.notepadAttributesList[j].id))
        }
      }
    }
    if (this.editflow) {
      this.msaForm.disable();
    } else if(this.msaData.custLevel == 'MSA CLUSTER') {
      this.expDate();
    }

  }

  /*-------- get msaForm controls ----------- */
  get f() { return this.msaForm.controls; }

  /*---------- NotepadTrans array object format -------- */
  getNotepadTransFormGroup(notepadId?: number): FormGroup {
    return this.fb.group({
      id: 0,
      notepadId: notepadId || 0,
      notepadInputVal: [''],
      entityRefId: AppSetting.msaId
    })
  }

  saveMSA(flag, $event) {
    $event.preventDefault();
    if (!this.editflow) {
      this.isSaved = true;
      this.msaNotepadArray = this.msaForm.controls.notepadTrans as FormArray;
      this.msaForm.controls.custLevel.enable();
      this.spinner.show();
      this.contractService.checkDuplicateMSA(this.msaForm.value.custLevel, (this.msaForm.value.custName).toUpperCase()).subscribe(res => {
        if (res.data.responseData === 0 || (AppSetting.msaId != 0 && this.checkDubMsaName === this.msaForm.value.custName)) {
          for (let i = 0; i < this.msaNotepadArray.length; i++) {
            var cntl = this.msaNotepadArray.controls[i];
            let textData = this.getFieldLabelAndValue(cntl.get('notepadId').value)
            if ((cntl.get('notepadInputVal').value === undefined || cntl.get('notepadInputVal').value === '') && (textData.attributeTypeId !== 3) ) {
              this.msaNotepadArray.controls[i].disable();
            }
          }
          this.msaSelectedData = this.msaForm.value;
          this.msaSelectedData.custName = (this.msaForm.value.custName).toUpperCase();
          if (this.msaSelectedData.id && (this.msaSelectedData.id == '' || this.msaSelectedData.id == 0)) {
            delete this.msaSelectedData.id;
          }
          if (this.msaSelectedData.notepadTrans !== undefined) {
            for (let k = 0; k < this.msaSelectedData.notepadTrans.length; k++) {
              if (AppSetting.msaId == 0) {
                delete this.msaSelectedData.notepadTrans[k].id;
                delete this.msaSelectedData.notepadTrans[k].entityRefId
              } else {
                if (this.msaSelectedData.notepadTrans[k].id == 0) {
                  delete this.msaSelectedData.notepadTrans[k].id;
                }
              }
            }
          } else {
            this.msaSelectedData.notepadTrans = [];
          }
          if (this.msaSelectedData.custLevel === 'MSA CLUSTER') {
            this.msaSelectedData.effectiveDt = this.datePipe.transform(this.msaSelectedData.effectiveDt, 'yyyy-MM-dd');
            this.msaSelectedData.expDt = this.datePipe.transform(this.msaSelectedData.expDt, 'yyyy-MM-dd');
          } else {
            delete this.msaSelectedData.effectiveDt;
            delete this.msaSelectedData.expDt;
          }
          // this.msaSelectedData.sla == '' ? this.msaSelectedData.sla = null : '';
          if (this.msaSelectedData.sla == "") {
            this.msaSelectedData.sla = null;
          }
          this.msaForm.controls.custLevel.enable();

          this.contractService.postMSARetailCustomer(this.msaSelectedData)
            .subscribe(success => {
              AppSetting.msaId = success.data.responseData;
              AppSetting.msaCustId = success.data.responseData;
              this.sharedSearchdata.changeMsaData(this.msaForm.value);
              this.sharedSearchdata.changeMSALevel(this.msaForm.controls.custLevel.value);
              if (flag == 1) {
                this.isSaved = false;
                this.router.navigate(['/retail-contract/contract'], { skipLocationChange: true });
              } else if (flag == 0) {
                this.msaForm.controls.id.setValue(AppSetting.msaCustId);
                this.msaForm.controls.notepadTrans.enable();
                this.msaForm.controls.custLevel.disable();
                console.log('appsetting', AppSetting.msaCustId);

                this.spinner.show();
                this.msaForm.enable();
                this.contractService.getMsa({ id: AppSetting.msaId }).subscribe(success => {
                  let ob = ErrorConstants.validateException(success);
                  if (ob.isSuccess) {
                    
                    this.msaData = success.data.responseData;

                    this.msaNotepadArray = this.msaForm.controls.notepadTrans as FormArray;
                    this.msaNotepadArray.clear();
                  
                    let notepadData = new Array(this.msaData.notepadTrans.length);
                    if (this.msaData.notepadTrans !== undefined) {
                      for (let k = 0; k < this.msaData.notepadTrans.length; k++) {
                        this.msaNotepadArray.push(this.getNotepadTransFormGroup());
                        let obj = {
                          id: this.msaData.notepadTrans[k].id,
                          notepadId: this.msaData.notepadTrans[k].notepadId,
                          notepadInputVal: (this.msaData.notepadTrans[k].notepadInputVal).trim(),
                          entityRefId: this.msaData.notepadTrans[k].entityRefId,
                        }
                        notepadData[k]= obj;
                      }
                    }
                    this.msaForm.controls.notepadTrans.patchValue(notepadData);
                    for (let j = 0; j < this.notepadAttributesList.length; j++) {
                      var isAvailable = this.msaData.notepadTrans.find(x => x.notepadId === this.notepadAttributesList[j].id)
                      if (isAvailable === undefined) {
                        this.msaNotepadArray.push(this.getNotepadTransFormGroup(this.notepadAttributesList[j].id))
                      }
                    }
                    this.isSaved = false;
                    this.msaForm.controls.custLevel.disable();
                    this.spinner.hide();
                  } else {
                    this.isSaved = false;
                    this.tosterservice.error(ob.message);
                    this.spinner.hide();
                  }
                },
                  error => {
                    this.isSaved = false;
                    this.tosterservice.error(ErrorConstants.getValue(404));
                    this.spinner.hide();
                  });


              }
              this.spinner.hide();
              this.tosterservice.success("Saved Successfully");
            },
              error => {
                this.tosterservice.error(ErrorConstants.getValue(404));
                this.spinner.hide();
                this.isSaved = false;
              }
            );
        } else {
          this.msaForm.controls.custLevel.enable();
          this.tosterservice.error(this.msaForm.value.custLevel+' '+'with '+this.msaForm.value.custName.toUpperCase() +''+' Already Exist');
          if (AppSetting.msaId != 0) {
            this.msaForm.controls.custLevel.disable();
          }
          this.isSaved = false;
         
          this.spinner.hide();
        }
      })
    } else {
      this.msaForm.controls.custLevel.enable();
      this.sharedSearchdata.changeMSALevel(this.msaForm.controls.custLevel.value);
      //  this.sharedSearchdata.changeMessage(AppSetting.msaId);
      if (flag == 1) {
        this.router.navigate(['/retail-contract/contract', { editflow: true }], { skipLocationChange: true });
      }
    }
  }
  /*------ get notepad attribute object from notepadAttributesList -------- */
  getFieldLabelAndValue(id: number) {
    return this.notepadAttributesList.find(x => x.id === id)
  }
  /*----------- conver comma seperated string into an array ---------- */
  convertStringToArray(value: string) {
    var finalArray = value.split(',');
    return finalArray;
  }

  /*--------- on Change MSA Level -------- */
  onSelectMSALevel(value) {
    AppSetting.MSALevel = value;
    // console.log(AppSetting.MSALevel);
    this.sharedSearchdata.changeMSALevel(value);
    if (value == 'MSA CLUSTER') {
      this.msaForm.controls.effectiveDt.setValidators(Validators.required);
      this.msaForm.controls.expDt.setValidators(Validators.required);
      this.msaForm.controls.effectiveDt.updateValueAndValidity();
      this.msaForm.controls.expDt.updateValueAndValidity();
    } else {
      this.msaForm.controls.effectiveDt.clearValidators();
      this.msaForm.controls.expDt.clearValidators();
      this.msaForm.controls.effectiveDt.updateValueAndValidity();
      this.msaForm.controls.expDt.updateValueAndValidity();
    }
  }

  effectiveDate() {
    let effYear = parseInt(this.datePipe.transform(this.msaForm.controls.effectiveDt.value, 'yyyy'))
    if (effYear > 9999) {
      this.msaForm.controls.effectiveDt.setValue('');
    } else {
      let b = this.datePipe.transform(this.msaForm.controls.effectiveDt.value, 'yyyy-MM-dd');
      let c = this.datePipe.transform(this.msaForm.controls.expDt.value, 'yyyy-MM-dd');

      if (c) {
        if (b < c) {
          this.isValidEffectiveDt = false;
          this.isValidExpDt = false;
          
        }
        else {
          this.isValidEffectiveDt = true;
          this.isValidExpDt = false;
        }
      } else {
        this.isValidEffectiveDt = false
      }
    }
   }

  expDate() {
    let expYear = parseInt(this.datePipe.transform(this.msaForm.controls.expDt.value, 'yyyy'))
    if (expYear > 9999) {
      this.msaForm.controls.expDt.setValue('');
    } else {
      let a = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      let b = this.datePipe.transform(this.msaForm.controls.effectiveDt.value, 'yyyy-MM-dd')
      let c = this.datePipe.transform(this.msaForm.controls.expDt.value, 'yyyy-MM-dd')

      if (b) {
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
      }
    }
  }

}
