import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { ContractService } from '../../../app/_contract/contract.service';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
import { defaultFormat as _rollupMoment } from 'moment';
import { MY_FORMATS } from 'src/app/app.setting.js';
import { AppSetting } from '../../app.setting';
import { DataService } from "../msa/sharedata.service";
import { NgxSpinnerService } from "ngx-spinner";
import { confimationdialog } from '../confirmationdialog/confimationdialog';
import { MatDialog } from '@angular/material/dialog';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from '../services/authorization.service';

const moment = _rollupMoment || _moment;
//import data from './contract_get.json';
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['../core.css'],
  providers: [
    // { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    // { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class ContractComponent implements OnInit {
  constructor(private fb: FormBuilder, private sharedSearchdata: DataService, private route: ActivatedRoute, private contractservice: ContractService,
    private router: Router,private datePipe: DatePipe, private spinner: NgxSpinnerService, private dialog: MatDialog, private tosterservice: ToastrService,
    private authorizationService : AuthorizationService,
    private permissionsService: NgxPermissionsService) { }

  contractForm: FormGroup;
  contractData: any;
  edit_flag: boolean = false;
  params_id: any;
  editFlow: boolean;
  cnractTermination: boolean;
  statusList: any = [];
  msaLevel: string;
  retailCode: string;
  rateCardStatus: string = "DRAFT";
  isValidEffectiveDt : boolean;
  isValidExpDt : boolean;
  minDate : Date;
  maxdate : Date;
  msaClData:any;
  perList : any = [];
  isSaved : boolean;

  ngOnInit() {
    this.spinner.show();
    this.authorizationService.setPermissions('CONTRACT');
    this.perList = this.authorizationService.getPermissions('CONTRACT') == null ? [] : this.authorizationService.getPermissions('CONTRACT');
    this.permissionsService.loadPermissions(this.perList);

    let e = new Date();
    e.setDate(e.getDate() + 1);
    this.minDate = e;

    this.contractForm = this.fb.group({
      effectiveDt:['',Validators.required],
      expDt: ['',Validators.required],
      folioNum: [''],
      cntrCode: [''],
      cntrSignDt: [''],
      cntrType: [''],
      cntrVersion: [''],
      crtdBy: [''],
      crtdDt: [''],
      descr: [''],
      directPickupFlag: [''],
      //dlvryHoldFlag: [''],
      id: [''],
      lkpBizTypeId: [''],
      // lkpDlvryHoldRsnId: [''],
      // lkpTermntnRsnId: [''],
      msaCustId: [''],
      opportunityId: [''],
      recIdentifier: [''],
      // segmentId: [''],
      //subsegmentId: [''],
      updBy: [''],
      updDt: [''],
      ver: ['']
    });

    this.sharedSearchdata.currentMessage.subscribe(contractId => {this.params_id = contractId;});
    this.sharedSearchdata.currentMSALevel.subscribe(level => this.msaLevel = level);
    this.sharedSearchdata.currentMsaData.subscribe(msaData => {this.msaClData=msaData;});
    this.sharedSearchdata.currentRetailCode.subscribe(code => this.retailCode = code);
    this.route.params.subscribe(params => {
      this.editFlow = params.editflow;
      this.cnractTermination = params.termination;

    })

    if (!this.editFlow) {
      this.getContractAndBindData();

    } else {
      this.spinner.show();
      this.contractservice.getContractByMSAIdInEditFlow(AppSetting.msaId)
        .subscribe(response => {
          this.contractData = response.data.responseData;
          this.spinner.hide();
          this.rateCardStatus = response.data.referenceData.statusList.find(({ id }) => id === response.data.responseData.status).lookupVal;
          this.contractForm.patchValue({
            effectiveDt: new Date(this.contractData.effectiveDt),
            expDt: new Date(this.contractData.expDt),
            folioNum: this.contractData.folioNum,
            cntrCode: this.contractData.cntrCode,
            cntrSignDt: this.contractData.cntrSignDt,
            cntrType: this.contractData.cntrType,
            cntrVersion: this.contractData.cntrVersion,
            crtdBy: this.contractData.crtdBy,
            crtdDt: this.contractData.crtdDt,
            descr: '',
            directPickupFlag: this.contractData.directPickupFlag,
            id: this.contractData.id,
            lkpBizTypeId: this.contractData.lkpBizTypeId,
            msaCustId: this.contractData.msaCustId,
            opportunityId: this.contractData.opportunityId,
            recIdentifier: this.contractData.recIdentifier,
            updBy: this.contractData.updBy,
            updDt: this.contractData.updDt,
            ver: this.contractData.ver

          });
          if(!this.cnractTermination){
            this.expDate();
          }
          this.sharedSearchdata.changeRetailCode(this.contractData.cntrCode);
        },
          (error) => {
            this.spinner.hide();
          });
    }

    if (this.cnractTermination) {
      this.spinner.show();
      this.contractservice.getContractByMSAIdInEditFlow(AppSetting.msaId)
        .subscribe(response => {
          this.contractData = response.data.responseData;
          this.statusList = response.data.referenceData.statusList;
          this.spinner.hide();
          this.rateCardStatus = "INACTIVE";
          this.contractForm.patchValue({
            effectiveDt: new Date(this.contractData.effectiveDt),
            expDt: new Date(),
            folioNum: this.contractData.folioNum,
            cntrCode: this.contractData.cntrCode,
            cntrSignDt: this.contractData.cntrSignDt,
            cntrType: this.contractData.cntrType,
            cntrVersion: this.contractData.cntrVersion,
            crtdBy: this.contractData.crtdBy,
            crtdDt: this.contractData.crtdDt,
            descr: '',
            directPickupFlag: this.contractData.directPickupFlag,
            id: this.contractData.id,
            lkpBizTypeId: this.contractData.lkpBizTypeId,
            msaCustId: this.contractData.msaCustId,
            opportunityId: 1,
            recIdentifier: this.contractData.recIdentifier,
            updBy: this.contractData.updBy,
            updDt: this.contractData.updDt,
            ver: this.contractData.ver

          });

          this.contractForm.controls.effectiveDt.disable();
          this.contractForm.controls.expDt.disable();
          //  this.sharedSearchdata.changeRetailCode(this.contractData.cntrCode);
        },
          (error) => {
            this.spinner.hide();
          });
    }

  }

  /*---------- get contract data and bind to form -------- */
  getContractAndBindData(){
    this.spinner.show();
    this.contractservice.getContractByMSAId(AppSetting.msaId)
      .subscribe(response => {
        //  this.sharedSearchdata.changeMessage(this.params_id);
        this.statusList = response.data.referenceData.statusList;
        if (response.data.responseData && response.data.responseData.length > 0) {
          this.contractData = response.data.responseData[0];
          this.rateCardStatus = response.data.referenceData.statusList.find(({ id }) => id === response.data.responseData[0].status).lookupVal;
          this.spinner.hide();
        }
        else {
          this.edit_flag = true;
          if(this.msaClData && this.msaClData.custLevel ==="MSA CLUSTER")
         {

            this.contractForm.patchValue({
              effectiveDt: new Date(this.msaClData.effectiveDt),
              expDt: new Date(this.msaClData.expDt),
              folioNum: '',
              cntrCode: '',
              cntrSignDt: '',
              cntrType:'',
              cntrVersion: '',
              crtdBy: '',
              crtdDt: '',
              descr: '',
              directPickupFlag: '',
              id: '',
              lkpBizTypeId: '',
              msaCustId: '',
              opportunityId: '',
              recIdentifier:'',
              updBy: '',
              updDt: '',
              ver: ''
            });
            this.spinner.hide();
          }else{
            this.contractData = this.contractForm.value;
            this.spinner.hide();
          }
        }

        if (this.edit_flag == false) {

          this.contractForm.patchValue({
            effectiveDt: new Date(this.contractData.effectiveDt),
            expDt: new Date(this.contractData.expDt),
            folioNum: this.contractData.folioNum,
            //  cntrCode: this.contractData.cntrCode,
            cntrCode: '',
            cntrSignDt: this.contractData.cntrSignDt,
            cntrType: this.contractData.cntrType,
            cntrVersion: this.contractData.cntrVersion,
            crtdBy: this.contractData.crtdBy,
            crtdDt: this.contractData.crtdDt,
            // descr: this.contractData.descr,
            descr: '',
            directPickupFlag: this.contractData.directPickupFlag,
            //dlvryHoldFlag: this.contractData.dlvryHoldFlag,
            id: this.contractData.id,
            lkpBizTypeId: this.contractData.lkpBizTypeId,
            // lkpDlvryHoldRsnId:this.contractData.lkpDlvryHoldRsnId,
            //lkpDlvryHoldRsnId: '',
            //lkpTermntnRsnId:this.contractData.lkpTermntnRsnId,
            //lkpTermntnRsnId: '',
            msaCustId: this.contractData.msaCustId,
            opportunityId: this.contractData.opportunityId,
            recIdentifier: this.contractData.recIdentifier,
            // segmentId: this.contractData.segmentId,
            //subsegmentId: this.contractData.subsegmentId,
            updBy: this.contractData.updBy,
            updDt: this.contractData.updDt,
            ver: this.contractData.ver

          });
         this.expDate();
          this.spinner.hide();
        }
      },
        (error) => {
          this.spinner.hide();
        }
      );
  }

  save(flag) {
    this.isSaved = true;
    if (!this.editFlow) {
      this.contractForm.value.effectiveDt = this.convert(this.contractForm.value.effectiveDt);
      this.contractForm.value.expDt = this.convert(this.contractForm.value.expDt)
      if (this.edit_flag == true) {
        let data = {
          cntrSignDt: this.contractForm.value.effectiveDt,
          cntrType: 48,
          cntrVersion: 1,
          effectiveDt: this.contractForm.value.effectiveDt,
          expDt: this.contractForm.value.expDt,
          lkpBizTypeId: 19,
          msaCustId: AppSetting.msaId,
          opportunityId: 1,
          folioNum: this.contractForm.value.folioNum,
          directPickupFlag: 0,
          status: this.statusList.find(({ lookupVal }) => lookupVal === "DRAFT").id,
          //status reference list draft value 
        };

        this.spinner.show();
        console.log('data',data)
        this.contractservice.postContract(data)
          .subscribe(response => {
            this.spinner.hide();
            AppSetting.contractId = response.data.responseData;
            this.isSaved = false;
            this.contractForm.controls.id.setValue(AppSetting.contractId);
            this.edit_flag = false;
            if (flag == 1) {
              this.router.navigate(['/retail-contract/service'], { skipLocationChange: true });
            } else {
             this.getContractAndBindData();
            }
          }, (error => {
            this.isSaved = false;
            this.spinner.hide();
          }));

      } else {
        let data: any = {};
        data = this.contractForm.value;
        delete data.cntrCode;
        this.contractservice.postContract(data)
          .subscribe(response => {
           
            AppSetting.contractId = response.data.responseData;
            if (flag == 0) {
              this.isSaved = false;
              this.tosterservice.success("Saved Successfully");
          
            } else{
              this.router.navigate(['/retail-contract/service'], { skipLocationChange: true });
              this.spinner.hide();
              this.isSaved = false;
            }
        },
            (error) => {
              this.isSaved = false;
              this.spinner.hide();
            });
      }
    } else {
      this.contractForm.value.effectiveDt = this.convert(this.contractForm.value.effectiveDt);
      this.contractForm.value.expDt = this.convert(this.contractForm.value.expDt)
      this.spinner.show();
      this.contractservice.postContractInEditFlow(this.contractForm.value)
        .subscribe(response => {
          this.spinner.hide();
          AppSetting.contractId = response.data.responseData;
          this.isSaved = false;
          if(flag == 1){
          this.router.navigate(['/retail-contract/service', { editflow: true }], { skipLocationChange: true });
         } else {
          this.tosterservice.success("Saved Successfully");
         }
        },
          (error) => {
            this.isSaved = false;
            this.spinner.hide();
          });
    }

    // 
    //this.router.navigate(['/retail-contract/service']);
  }
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  saveCnractTermination() {
    this.isSaved = true;
    const dialogRefEdit = this.dialog.open(confimationdialog, {

      data: { message: "Are you sure you want to terminate contract ?" },
      disableClose: true,
      panelClass: 'creditDialog',
      width: '300px'
    });

    dialogRefEdit.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show();
        this.contractForm.controls.effectiveDt.enable();
        this.contractForm.controls.expDt.enable();
        let data: any = {};
        data = this.contractForm.value;
        data.status = this.statusList.find(({ lookupVal }) => lookupVal === "INACTIVE").id;
        console.log(data);
        
        this.contractservice.postContract(data)
          .subscribe(response => {
            this.tosterservice.info("CONTRACT TERMINATED !")
            this.isSaved = false;
            this.router.navigate(['/retail-contract/creditdashboard'], { skipLocationChange: true });
            this.spinner.hide();
          },
            (error) => {
              this.isSaved = false;
              this.spinner.hide();
            });

      } else {
        this.isSaved = false;
      }
      console.log('The dialog was closed with pinocde ', result);
    });
  }
  closeNRedirect(){
    this.router.navigate(['/retail-contract/creditdashboard'], { skipLocationChange: true });
  }

  effectiveDate() {
    let effYear = parseInt(this.datePipe.transform(this.contractForm.controls.effectiveDt.value, 'yyyy'))
    if (effYear > 9999) {
      this.contractForm.controls.effectiveDt.setValue('');
    } else {
     
    let b = this.datePipe.transform(this.contractForm.controls.effectiveDt.value, 'yyyy-MM-dd')
    let c = this.datePipe.transform(this.contractForm.controls.expDt.value, 'yyyy-MM-dd') ;

   
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
    let expYear = parseInt(this.datePipe.transform(this.contractForm.controls.expDt.value, 'yyyy'))
    if (expYear > 9999) {
      this.contractForm.controls.expDt.setValue('');
    } else {
    let a = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    let b = this.datePipe.transform(this.contractForm.controls.effectiveDt.value, 'yyyy-MM-dd')
    let c = this.datePipe.transform(this.contractForm.controls.expDt.value, 'yyyy-MM-dd')

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
