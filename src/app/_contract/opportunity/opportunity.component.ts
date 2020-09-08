import { Component, OnInit, Inject, HostListener, SecurityContext, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractService } from '../contract.service';
import { AppSetting } from '../../app.setting';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ErrorConstants }  from '../models/constants';
import { ExistingsafexlistComponent } from '../existingsafexlist/existingsafexlist.component';
import { confimationdialog } from '../confirmationdialog/confimationdialog';
import { HttpClient } from "@angular/common/http";
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from '../services/authorization.service';
import { DomSanitizer } from '@angular/platform-browser';
import { StepperComponent } from '../stepper/stepper.component';

export interface ccData {
  element: any;
}


@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['../core.css'],
  providers: []
})
export class OpportunityComponent implements OnInit {
  @ViewChild(StepperComponent, null) stepper: StepperComponent;

  //FORM VALIDATION
  registerForm: FormGroup;
  submitted = false;
  //END OF VALIDATION
  gst: any[] = [{ id: 1, value: 'Yes', checked: true },
  { id: 0, value: 'No', checked: false },
  ];
  model: any = {};
  oportunity: any = {};
  isDataAvailable:boolean;
  constructor(private spinner: NgxSpinnerService,private tosterservice: ToastrService, private formBuilder: FormBuilder, private router: Router, private contractservice: ContractService, private datePipe: DatePipe,
    private acrouter: ActivatedRoute,private dialog: MatDialog, private http: HttpClient,
    private permissionsService: NgxPermissionsService, private authorizationService: AuthorizationService, private dom: DomSanitizer) { }
  date: any;
  
  sfdcAccId = AppSetting.sfdcAccId;
  custName = AppSetting.customerName;
  cntrCode = AppSetting.sfxCode;
  editflow = false;
  openDialog = false;
	searchCtrl = '';
	searchCtrlSub = '';
  isDisable:boolean;
  // maxNewDate;
sfxValue='New PRC';
  SFXTypes = ['New PRC', 'Existing PRC']
  changeSfxType(type) {
    this.sfxValue = type;
    if (type === 'Existing PRC') {
      this.openDialogSFXSearch(AppSetting.msaCustId,type);
    }
  }



  isValidSignDt:boolean = false;
  isValidEffectiveDt:boolean = false;
  isValidExpDt:boolean = false;

  // MatDatePicker Validation
  minDate;
  maxdate;

  signDate() {
    let cntrYear = parseInt(this.datePipe.transform(this.model.cntrSignDt, 'yyyy'))
    if (cntrYear > 9999) {
      this.model.cntrSignDt = "";
    } else {
    let a = this.datePipe.transform(this.model.cntrSignDt, 'yyyy-MM-dd')
    let b = this.datePipe.transform(this.model.effectiveDt, 'yyyy-MM-dd')
    let c = this.datePipe.transform(this.model.expDt, 'yyyy-MM-dd')
    if(c){
    if (a < c) {
      this.isValidSignDt = false;
    }
    else {
      this.isValidSignDt = true;
    }
  }else if(b){
    if (a <= b) {
      this.isValidSignDt = false;
    }
    else {
      this.isValidSignDt = true;
    }
  }else{
    this.isValidSignDt = false;
  }
  if(!b){
    let e = new Date(a);
    e.setDate(e.getDate()+1);
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
    if(c && a){
      if (a <=b && b < c) {
        this.isValidEffectiveDt = false;
      }
      else {
        this.isValidEffectiveDt = true;
      }
    }
    else if(c){
      if (b < c) {
        this.isValidEffectiveDt = false;
      }
      else {
        this.isValidEffectiveDt = true;
      }
    }else if(a){
      if (b >= a) {
        this.isValidEffectiveDt = false;
      }
      else {
        this.isValidEffectiveDt = true;
      }
    }else{
      this.isValidEffectiveDt = false;
    }
    if(b){
      let e = new Date(b);
      e.setDate(e.getDate()+1);
      this.minDate = e;
    }

    // increment exp date by one year
    if(isExpToUpdate && b && !this.isValidEffectiveDt){
      let f = new Date(b);
      f.setFullYear(f.getFullYear()+1);
      this.model.expDt = f;
    }
  }
  this.expDate();
  }

  expDate() {
    if (this.model.expDt === null) {
      return;
    }
    let expYear = parseInt(this.datePipe.transform(this.model.expDt, 'yyyy'))
    if (expYear > 9999) {
      this.model.expDt = "";
    } else {
    let a = this.datePipe.transform(this.model.cntrSignDt, 'yyyy-MM-dd')
    let b = this.datePipe.transform(this.model.effectiveDt, 'yyyy-MM-dd')
    let c = this.datePipe.transform(this.model.expDt, 'yyyy-MM-dd')

    if(b){
      if (b < c) {
        this.isValidExpDt = false;
      }
      else {
        this.isValidExpDt = true;
      }
    } else if(a){
      if ( a < c) {
        this.isValidExpDt = false;
      }
      else {
        this.isValidExpDt = true;
      }
    }else{
      this.isValidExpDt = false;
    }
    if(c){
      var e = new Date(c);
      e.setDate(e.getDate()-1);
      this.maxdate = e;
    }
  }
  }

  
  // dialog
  openDialogSFXSearch(msadata,type): void {

    const dialogRefEdit = this.dialog.open(ExistingsafexlistComponent, {
      width: '1000px',
      data: { msaId: msadata, isEditflow: false },
      panelClass: 'creditDialog',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefEdit.afterClosed().subscribe(result => {
      if(result){
      this.spinner.show();
       result.opportunityId = AppSetting.oprtunityId;
       this.serviceAssignOppCntr(result,true);
      }else{
        this.sfxValue='New PRC';
      }
      console.log('The dialog was closed');
    });
  }


  @HostListener('document:keydown', ['$event'])

  handleKeyboardEvent(event: KeyboardEvent) {
    
      if (event.ctrlKey && (event.keyCode === 83)) { // ctrl+s [Save as Draft]
        event.preventDefault();
        if(document.getElementById('secondry-button')){
          let element = document.getElementById('secondry-button');
          element.click();
        }
      }
  
      if (event.altKey && (event.keyCode === 78)) { // alt+n [Next]
          event.preventDefault();
          if(document.getElementById('opportunityNextButton')){
            let element = document.getElementById('opportunityNextButton');
            element.click();
          }
        }
  
  }
  

  ngOnInit() {

    this.authorizationService.setPermissions('CONTRACT');
    this.permissionsService.loadPermissions(this.authorizationService.getPermissions('CONTRACT'));

    // this.getTimeStamp();

    // this.maxNewDate = new Date();
    this.isDisable = false;
    this.acrouter.params.subscribe(params => {
        if (params['termination']) { 
          this.editflow = params['termination'];
          this.isDisable = true;
        }
        if (params['openDialog']) { 
          this.openDialog = params['openDialog'];
          this.editflow = params['openDialog'];
        }
        if (params['editflow']) { 
          this.editflow = params['editflow'];
          this.isDisable = false;
        }
        if(this.isDisable){
          for(let b of this.statusList){
            if(b.lookupVal=='INACTIVE'){
              this.model.status = b.id;
            }
          }
          this.setExpiryDate();
         }
    });
    this.model={};
    this.isDataAvailable =false;
    this.getMsa();
    //VALIDATION
    this.registerForm = this.formBuilder.group({
      Folio: ['', Validators.required],
      Sdate: ['', Validators.required],
      CSdate: ['', Validators.required],
      CEdate: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
    //VALIDATION
  }

  //VALIDATION
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
  changeBusinessType(){
    for (let type of this.businessTypeList) {
        if (type.id == this.model.lkpBizTypeId) {
          this.model.lkpBizTypeValue = type.descr;
      }
    }
  }
  segmentList = [];
  subSegmentList = [];
  businessTypeList = []
  contractTypeList = []
  opprAddr = []
  statusList = []
  cntrVersion;
  status:number;
  reasonList= []
  reasonId ;
  getOportunity(isEdit,isNavigate) {
    this.spinner.show();
    this.contractservice.getOportunity(AppSetting.oprtunityId,isEdit)
      .subscribe(
        success => {
        this.statusList= []
        let ob = ErrorConstants.validateException(success);
        if (ob.isSuccess) {
          if(!this.openDialog){
          this.spinner.hide();
          }
          this.oportunity = success.data;
          console.log(this.oportunity.responseData, "oportunity data");
          this.model = this.oportunity.responseData;
           for (var item of this.oportunity.referenceData.businessTypeList) {
            //  console.log(item.lookupVal, "testing");
            this.businessTypeList.push(item)
          }
          for (var item of this.oportunity.referenceData.statusList) {
           if(this.editflow){
            this.status = this.oportunity.responseData.status;
            if(item.lookupVal == 'ACTIVE'){
              this.statusList.push(item);
            }
            if(item.lookupVal == 'INACTIVE'){
              this.statusList.push(item);
            }
           }else{
            this.status = this.oportunity.responseData.status;
            if(item.lookupVal == 'DRAFT'){
              this.statusList.push(item);
            }
            if(item.lookupVal == 'PENDING'){
              this.statusList.push(item);
            }
           }
          }
          for (var item of this.oportunity.referenceData.contractTypeList) {
            // console.log(item, "gst");
            this.contractTypeList.push(item)
          }
          for (var item of this.oportunity.responseData.opprAddr) {
            // console.log(item, "testing");
            this.opprAddr.push(item)
          }
          for (var item of this.oportunity.referenceData.segmentList) {
            this.segmentList.push(item);
          }
          if (this.oportunity.referenceData.subSegmentList && this.oportunity.referenceData.subSegmentList.length > 0) {
            this.subSegmentList =[];
            for (var item of this.oportunity.referenceData.subSegmentList) {
              this.subSegmentList.push(item);
            }
          }
          if(this.oportunity.responseData.contract){
            if(this.oportunity.responseData.contract.cntrCode){
              AppSetting.sfxCode = this.oportunity.responseData.contract.cntrCode;
              this.cntrVersion = this.oportunity.responseData.contract.cntrVersion;
              }else{
                AppSetting.sfxCode = 'NOT GENERATED YET';
              }
            this.cntrCode = AppSetting.sfxCode;
            for(let data of this.contractTypeList){
              if(data.id == this.oportunity.responseData.contract.cntrType){
             this.model.cntrTypeValue = data.lookupVal;}
          }
          for(let type of this.businessTypeList){
            if(type.id==this.oportunity.responseData.contract.lkpBizTypeId){
              AppSetting.businessType = type.descr;
              this.model["lkpBizTypeValue"] = type.descr;
            }
          }
            this.model.id = this.oportunity.responseData.contract.id;
            this.model.cntrType = this.oportunity.responseData.contract.cntrType;
            this.model.lkpBizTypeId = this.oportunity.responseData.contract.lkpBizTypeId;
            this.model.directPickupFlag = this.oportunity.responseData.contract.directPickupFlag;
            this.model.dlvryHoldFlag = this.oportunity.responseData.contract.dlvryHoldFlag;
            this.model.expDt=this.oportunity.responseData.contract.expDt;
            this.model.effectiveDt=this.oportunity.responseData.contract.effectiveDt;
            this.model.cntrSignDt =this.oportunity.responseData.contract.cntrSignDt;
            this.model.cntrVersion=this.oportunity.responseData.contract.cntrVersion;
            this.model.folioNum=this.oportunity.responseData.contract.folioNum;
            this.model.segmentId= this.oportunity.responseData.contract.segmentId;
            this.model.subsegmentId= this.oportunity.responseData.contract.subsegmentId;
            this.model.desc = this.oportunity.responseData.contract.desc;
            this.model.rateCardApplicableFlag = this.oportunity.responseData.contract.rateCardApplicableFlag ? 1 : 0;
            AppSetting.rateCardApplicableFlag = this.model.rateCardApplicableFlag;

            this.stepper.changeStapperlabel();
            if(this.model.effectiveDt){

              let a = this.datePipe.transform(this.model.effectiveDt, 'yyyy-MM-dd');
              let e = new Date(a);
              e.setDate(e.getDate()+1);
              this.minDate = e;
            }
            if(this.model.expDt){
              let c = this.datePipe.transform(this.model.expDt, 'yyyy-MM-dd');
              let e = new Date(c);
              e.setDate(e.getDate()-1);
              this.maxdate = e;
            }
            // check if subsegment exist 
            let ifSubSegmentExist = true;
            for(let subseg of this.subSegmentList){
              if(subseg.id==this.model.subsegmentId){
                ifSubSegmentExist = false;
                break;}
            }
            if(ifSubSegmentExist){
              this.model.subsegmentId= null;
            }
          }else{
            this.model.id = null;
            for(let type of this.contractTypeList){
                if (type.lookupVal == 'PRC') {
                this.model.cntrType = type.id;
                this.model.cntrTypeValue = type.descr;
              }
            }
            for (let type of this.businessTypeList) {
              if (type.descr == 'OUTBOUND') {
                this.model.lkpBizTypeId = type.id;
                this.model["lkpBizTypeValue"] = type.descr; 
                AppSetting.businessType = type.descr;
              }
            }
            this.model.directPickupFlag = 0;
            this.model.dlvryHoldFlag = 0;
            this.model.rateCardApplicableFlag = 1;
            this.model.expDt=null;
            this.model.effectiveDt=null;
            this.model.cntrSignDt=null;
            this.model.segmentId= "";
            this.model.subsegmentId= "";
            AppSetting.sfxCode = 'NOT GENERATED YET';
            this.cntrCode = AppSetting.sfxCode;
          }
          // for (var item of this.oportunity.contract) {
          //   console.log(item, "contract");
          //   this.contract=item
          // }
          // for (var item of this.oportunity.referenceList.slabProtectTypeList) {
          //   // console.log(item.lookupVal, "testing");
          //   this.slabProtectTypeList.push(item)
          // }

          // for (var item of this.oportunity.referenceList.safexTypeList) {
          //   //  console.log(item.lookupVal, "testing");
          //   this.safexTypeList.push(item)
          // }
this.isDataAvailable=true;

          // if(this.openDialog){
          // }
          if(!this.oportunity.responseData.contract){
            for(let seg of  this.segmentList){
              if(seg.segmentName==this.segmentName){
                 this.model.segmentId = seg.id;
              }
             
            }
            for(let subseg of this.subSegmentList){
              if(subseg.subsegmentName==this.subsegmentName){
                 this.model.subsegmentId = subseg.id;
              }
             
            }
          }
          if(isNavigate){
            this.openConfirmationDialogEdit();
         }
         if(!isNavigate){
          for (let data of this.msa.responseData) {
            AppSetting.customerName = data.custName
            AppSetting.sfdcAccId = data.sfdcAccId
            this.sfdcAccId = AppSetting.sfdcAccId;
            this.custName = AppSetting.customerName;
            this.cntrCode = AppSetting.sfxCode
            if(this.openDialog){
            this.openDialogEditFlow();
          }
          }
       }
         if(this.editflow){
           this.reasonList = this.oportunity.referenceData.cntrTermRsn;
         }
       }
       else {
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }
    },
      error => {
        this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      });


  }


  openCCDialog(field): void {
    const dialogCCRef = this.dialog.open(SearchAllOppertunityDialogBox, {
      width: '110rem',
      panelClass: 'creditDialog',
      data: {element:field},
    });

    dialogCCRef.afterClosed().subscribe(result => {
      
    });
  }



  disableExp = false;
  setExpiryDate(){
    let statusType;
    for(let b of this.statusList){
      if(this.model.status==b.id){
        statusType= b.lookupVal;
      }
    }
    if(statusType=='INACTIVE'){
      this.disableExp = true;
      this.model.expDt= new Date();
      this.model.expDt=this.datePipe.transform(this.model.expDt, 'yyyy-MM-dd')
    }else{
      this.disableExp = false;
      this.model.expDt=this.oportunity.responseData.contract.expDt;
    }
  }
  postOprtunityData
  postOportunity() {
    this.spinner.show();

    this.model
    let data = {
      "cntrSignDt": this.datePipe.transform(this.model.cntrSignDt, 'yyyy-MM-dd'),
      "cntrType": this.model.cntrType,
      "cntrVersion": 1,
      "effectiveDt": this.datePipe.transform(this.model.effectiveDt, 'yyyy-MM-dd'),
      "expDt": this.datePipe.transform(this.model.expDt, 'yyyy-MM-dd'),
      "folioNum": this.model.folioNum,
      "lkpBizTypeId": this.model.lkpBizTypeId,
      "msaCustId": AppSetting.msaCustId,
      "opportunityId": AppSetting.oprtunityId,
      "segmentId": this.model.segmentId,
      "subsegmentId": this.model.subsegmentId,
      "rateCardApplicableFlag": this.model.rateCardApplicableFlag,
    }
    
    if(this.editflow){
      data["desc"] = this.model.desc;
      data["cntrCode"] = AppSetting.sfxCode;
      data["cntrVersion"] = this.cntrVersion;
      data["ver"] = this.cntrVersion;
      data["status"] =  this.model.status;
      data["lkpTermntnRsnId"] = this.reasonId;
    }

    if (this.oportunity.responseData.contract) {

      data["id"] = this.oportunity.responseData.contract.id
    }
    for (let type of this.businessTypeList) {
      if (type.lookupVal == 'ANYWHERE TO ANYWHERE') {
        data["dlvryHoldFlag"] = this.model.dlvryHoldFlag
      }
    }
       this.servicePostOppCntr(data,false);

  }

  
  serviceAssignOppCntr(data,isNavigate){
    this.contractservice.serviceAssignOppCntr(data)
      .subscribe(
        success => {
          let ob = ErrorConstants.validateException(success);
        if (ob.isSuccess) {
          AppSetting.oprtunityId = success.data.responseData
            this.tosterservice.success("PRC Linked Successfully !");
          this.getOportunity(this.editflow,isNavigate);
        }
        else {
          this.tosterservice.error(ob.message);
          this.spinner.hide();
        }
      },
        error => {
          this.tosterservice.error(ErrorConstants.getValue(404));
          this.spinner.hide();
        });
  }
  

  servicePostOppCntr(data,isNavigate){
    this.contractservice.postOportunity(data,this.editflow,this.isDisable)
      .subscribe(
        success => {
          let ob = ErrorConstants.validateException(success);
        if (ob.isSuccess) {
          this.postOprtunityData = success.data.responseData
          AppSetting.contractId = this.postOprtunityData
          console.log(this.postOprtunityData, "oportunity data")
          this.model = {}
          this.businessTypeList = []
          this.contractTypeList = []
          this.opprAddr = []
          this.oportunity = {}
          if (this.isDisable) {
            this.tosterservice.info("CONTRACT TERMINATED !")
            this.router.navigate(['prc-contract/'], { skipLocationChange: true });
          }else{
            this.tosterservice.success("Saved Successfully");
          }
          this.getOportunity(this.editflow,isNavigate);
        }
        else {
          this.tosterservice.error(ob.message);
          this.spinner.hide();
        }
      },
        error => {
          this.spinner.hide();
          this.tosterservice.error('Issue In Creating Contract. Kindly verfiy SFDC Oppr Id and MSA Account Id.');
        });
  }
  
  opportunityNext() {
    this.spinner.show();
      let data = {
        "cntrSignDt": this.datePipe.transform(this.model.cntrSignDt, 'yyyy-MM-dd'),
        "cntrType": this.model.cntrType,
        "cntrVersion": 1,
        "effectiveDt": this.datePipe.transform(this.model.effectiveDt, 'yyyy-MM-dd'),
        "expDt": this.datePipe.transform(this.model.expDt, 'yyyy-MM-dd'),
        "folioNum": this.model.folioNum,
        "lkpBizTypeId": this.model.lkpBizTypeId,
        "msaCustId": AppSetting.msaCustId,
        "opportunityId": AppSetting.oprtunityId,
        // "directPickupFlag": this.model.directPickupFlag,
        "segmentId": this.model.segmentId,
        "subsegmentId": this.model.subsegmentId,
        "rateCardApplicableFlag": this.model.rateCardApplicableFlag,
      }
      
      AppSetting.rateCardApplicableFlag = data.rateCardApplicableFlag;

      if(this.editflow){
        data["desc"] = this.model.desc;
        data["cntrCode"] = AppSetting.sfxCode;
        data["cntrVersion"] = this.cntrVersion;
        data["ver"] = this.cntrVersion;
        data["status"] =  this.model.status;
      }
  
      if (this.oportunity.responseData.contract) {
        data["id"] = this.oportunity.responseData.contract.id
      }
      for (let type of this.businessTypeList) {
        if (type.lookupVal == 'ANYWHERE TO ANYWHERE') {
          data["dlvryHoldFlag"] = this.model.dlvryHoldFlag
        }
      }
    
      // Con Cnee Check 

      let isConCneeFound= false;
      let messageForCCError:any;
      let lookupName:any;
      for (let type of this.businessTypeList) {
          if(type.id==this.model.lkpBizTypeId){
            lookupName = type.lookupVal;
          }
      }
        if (lookupName == 'INBOUND') {
          for (let data of this.msa.responseData) {
            for (let data1 of data.cneeCnor) {
                let cneeID ;
                let bothTypeId;
                for(let cc of this.consignType){
                  if(cc.lookupVal=='CONSIGNEE') cneeID = cc.id
                  if(cc.lookupVal=='BOTH') bothTypeId = cc.id
                }
                if(data1.lkpConsigntypeId==cneeID || data1.lkpConsigntypeId==bothTypeId){
                  isConCneeFound= true;
                }
            }
            if(!isConCneeFound)messageForCCError = 'No Consignee Exists! Please Add On MSA Page.'
          }
        }
        if (lookupName == 'OUTBOUND') {
          for (let data of this.msa.responseData) {
            for (let data1 of data.cneeCnor) {
                let cneeID ;
                let bothTypeId;
                for(let cc of this.consignType){
                  if(cc.lookupVal=='CONSIGNOR') cneeID = cc.id
                  if(cc.lookupVal=='BOTH') bothTypeId = cc.id
                }
                if(data1.lkpConsigntypeId==cneeID || data1.lkpConsigntypeId==bothTypeId){
                  isConCneeFound= true;
                }
            }
            if(!isConCneeFound)messageForCCError = 'No Consignor Exists! Please Add On MSA Page.'
          }
        }
        if (lookupName == 'ANYWHERE TO ANYWHERE') {
          isConCneeFound= true;
        }

      if(isConCneeFound){
      this.contractservice.postOportunity(data,this.editflow,this.isDisable)
      .subscribe(
        success => {
          let ob = ErrorConstants.validateException(success);
        if (ob.isSuccess) {
          this.postOprtunityData = success.data.responseData
          AppSetting.contractId = this.postOprtunityData
          this.tosterservice.success("Saved Successfully");
          this.model = {}
          this.businessTypeList = []
          this.contractTypeList = []
          this.opprAddr = []
          this.oportunity = {}
          this.spinner.hide();
          if(this.editflow){
                  this.router.navigate(['/prc-contract/service', { steper: true, 'editflow': 'true' }], { skipLocationChange: true });
                } else {
                  this.router.navigate(['/prc-contract/service'], { skipLocationChange: true });
          }
        }
        else {
          this.tosterservice.error(ob.message);
          this.spinner.hide();
        }
      },
        error => {
          this.spinner.hide();
          this.tosterservice.error('Issue In Creating Contract. Kindly verfiy SFDC Oppr Id and MSA Account Id.');
        });}else{
          this.spinner.hide();
          this.tosterservice.info(messageForCCError);
        }
  }
    getSubsegment(segmentId){
    this.model.subsegmentId = null;
    this.contractservice.getSubsefmentBySegmentId(segmentId)
      .subscribe( subsegmentList => {
        let ob = ErrorConstants.validateException(subsegmentList);
        if (ob.isSuccess) {
          let data: any=subsegmentList.data.responseData;
          this.subSegmentList =[]
          if (data && data.length > 0) {
            for (var item of data) {
              this.subSegmentList.push(item);
            }
          }
    
        }else {
          this.tosterservice.error(ob.message);
          this.spinner.hide();
        }
        }, error => {
          console.log("error in fetching subsegment data");
        });

  }

  scrollActiveValue(){
    let selectItem = document.getElementsByClassName('mat-selected')[0];
    setTimeout(()=>{  
        if(selectItem){
          selectItem.scrollIntoView(false);
        }
    },500)
  }

  // dialog
  openDialogEditFlow(): void {

    const dialogRefEdit = this.dialog.open(SearchContractEdit, {     
      data: {msa: 'hi'},
      panelClass: 'creditDialog',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefEdit.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  msa:any = {}
  consignType:any = []
  segmentName:any;
  subsegmentName:any;
  getMsa() {
    this.consignType= [];
    this.spinner.show();
    this.contractservice.getMsa(AppSetting.msaCustId)
      .toPromise()
      .then(
        success => {
          let ob = ErrorConstants.validateException(success);
          if (ob.isSuccess) {
            this.msa = success.data;
            this.consignType = this.msa.referenceData.consignType;
            this.segmentName = this.msa.responseData[0].segment;
            this.subsegmentName = this.msa.responseData[0].subsegment;
            this.subSegmentList = this.msa.referenceData.subSegmentList;
            this.getOportunity(this.editflow,false);
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
  closeNRedirect(){
    this.router.navigate(['prc-contract/'], { skipLocationChange: true });
  }
  submitTermNClose(){


    const dialogRefEdit = this.dialog.open(confimationdialog,{

      data: { message: "Are you sure you want to terminate contract ?" },
      disableClose: true,
      panelClass: 'creditDialog',
      width: '300px'
    });
  
    dialogRefEdit.afterClosed().subscribe(result => {
      if(result) {
        this.openDialog = false;
        this.postOportunity();
        this.editflow = false;
      }
      console.log('The dialog was closed with pinocde ' ,result);
    });

  }

    // dialog 
    openConfirmationDialogEdit(): void {

      const dialogRefConfirm = this.dialog.open(confimationdialog, {
        width: '300px',
        data:{message:'Do you want to edit the contract ?'},
        panelClass: 'creditDialog',
        disableClose: true,
        backdropClass: 'backdropBackground'
      });
  
      dialogRefConfirm.afterClosed().subscribe(result => {
        if(result){
          console.log('result'+result);
          this.openDialogEditFlow();
        }else{
        this.router.navigate(['/prc-contract/'], { skipLocationChange: true });
      }
        console.log('The dialog was closed');
    });
  }

  rateCardAppchange(e) {
    console.log(e);
    if (!e && this.model.id !== null && this.model.id > 0) {
      let temp = `<p class="popContent"> If you change Rate Card Applicable YES to NO , your existing Rate Card will be deleted. <p>
        <p class="popHead"><strong>Do you want to change this? <strong> </p>`;
      let dialogRef = this.dialog.open(InnerHtmlDialogComponent, {
        width: '65rem',
        disableClose: true,
        // panelClass: 'creditDialog',
        // backdropClass: 'backdropBackground'
      });
      dialogRef.componentInstance.htmlContent = this.dom.sanitize(SecurityContext.HTML, temp);
      dialogRef.afterClosed().subscribe(value => {
        if (value) {
          this.model.rateCardApplicableFlag = 0;
        } else {
          this.model.rateCardApplicableFlag = 1;
          console.log('Keep Open');
        }
      });
    }

  }
}



// dialog box Edit Journey

@Component({
  selector: 'dialog_contract_search',
  templateUrl: 'dialog_Box_search1.html',
  styleUrls: ['../core.css']
})


export class SearchContractEdit {
  constructor(public contractservice: ContractService,
    public dialogRefEdit: MatDialogRef<SearchContractEdit>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: PopData, public router: Router,
    private spinner: NgxSpinnerService, private _contractService: ContractService, private tosterservice: ToastrService
    , private route: Router) { }
  rateCardApplicableFlag =  AppSetting.rateCardApplicableFlag
  sfdcAccId = AppSetting.sfdcAccId;
  custName = AppSetting.customerName;
  cntrCode = AppSetting.sfxCode;
 
  closeDialog() {

    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      data: { message: 'Are you sure ?' },
      disableClose: true,
      panelClass: 'creditDialog',
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if (value) {
        this.dialogRefEdit.close();
        this.router.navigate(['/prc-contract/'], { skipLocationChange: true });
      } else {
        console.log('Keep Open');
      }
    });
  }
  contractTermRoute() {
    this.dialogRefEdit.close();
    this.router.navigate(['/prc-contract/opportunity', { steper: true, 'termination': 'true' }], { skipLocationChange: true });
  }
  newOffRoute() {
    this.dialogRefEdit.close();
    this.router.navigate(['/prc-contract/service', { steper: true, 'editflow': 'true' }], { skipLocationChange: true });
  }
  newRateRoute() {
    this.dialogRefEdit.close();
    this.router.navigate(['/prc-contract/ratecard', { steper: true, 'editflow': 'true' }], { skipLocationChange: true });
  }
  generalEditRoute() {
    this.dialogRefEdit.close();
    this.router.navigate(['/prc-contract/msa', { steper: true, 'editflow': 'true' }], { skipLocationChange: true });
  }
  billingRoute() {
    this.dialogRefEdit.close();
    this.router.navigate(['/prc-contract/billing', { steper: true, 'editflow': 'true' }], { skipLocationChange: true });
  }
  docRoute() {
    this.dialogRefEdit.close();
    this.router.navigate(['/prc-contract/documentupload', { steper: true, 'editflow': 'true' }], { skipLocationChange: true });
  }
  ngOnInit() {
    this.spinner.hide();
  }


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
      if (event.keyCode === 27) { // esc [Close Dialog]
        event.preventDefault();
        if(document.getElementById('closeButton')){
          let element: HTMLElement = document.getElementById('closeButton') as HTMLElement;
          element.click();
        }
      }
  }


}


export interface PopData {
  msa: object;
}



// dialog box

@Component({
  selector: 'dialog-box-cc',
  templateUrl: 'allOpportunity.html',
  styleUrls: ['../core.css']
})
export class SearchAllOppertunityDialogBox {

constructor(public contractservice: ContractService,
  public dialogCCRef: MatDialogRef<SearchAllOppertunityDialogBox>,
  @Inject(MAT_DIALOG_DATA) public data: ccData) {}

  allOpportunity:[];
  ngOnInit() {
    this.allOpportunity=this.data.element;
  }

  onNoClick(): void {
    this.dialogCCRef.close();
  }

}

// dialog box

@Component({
  selector: 'app-innerhtml-dialog',
  templateUrl: './areYouSure.html',
  styleUrls: ['../core.css'],
})
export class InnerHtmlDialogComponent {
  htmlContent: string;
  constructor(public dialogRefConfirm: MatDialogRef<InnerHtmlDialogComponent>) {

  }

  submit(value) {
    this.dialogRefConfirm.close(value);
  }
}

