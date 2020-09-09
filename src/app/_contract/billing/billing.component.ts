import { Component, OnInit, Inject, ViewChild, HostListener } from '@angular/core';
import { ContractService } from '../contract.service';
import { AppSetting } from '../../app.setting';
import { MatExpansionPanel} from '@angular/material';
import * as billing from '../models/billingModel';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';
import { FormBuilder } from '@angular/forms';
import { confimationdialog } from '../confirmationdialog/confimationdialog';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['../core.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]

})
export class BillingComponent implements OnInit {
  sfdcAccId = AppSetting.sfdcAccId;
  customerName = AppSetting.customerName;
  sfxCode = AppSetting.sfxCode;
  billingData: billing.BillingModel;
  allBillingData: billing.BillingModel[];
  billingLevelList: billing.Lookup[];
  billingSubLevelList: billing.Lookup[];
  billingSubTypeList: billing.Lookup[];
  paymentTermList: billing.Lookup[];
  billingCycleList: billing.Lookup[];
  billingByList: billing.Lookup[];
  billingByAllList: billing.Lookup[];
  todBasedOnList: billing.Lookup[];
  billingFormatList: billing.Lookup[];
  gbCategoryList: billing.Lookup[];
  ebillingList: billing.Radio[];
  autoBillingList: billing.Radio[];
  todList: billing.Radio[];
  cneeCnorBillList: billing.Radio[];
  billingDtlsList: billing.Radio[];
  billingOfferingList: billing.Offering[];
  billingOfferingId: number = 0;
  cneeCnorFlagList: billing.Radio[];
  categoryList: any;
  excludeBillingFlagList: billing.Radio[];
  selectOffering: boolean = false;
  serviceOfferingId: number = null;
  cneeList: billing.CneeCnor[];
  cnorList: billing.CneeCnor[];
  displayedColumns: string[];
  stateList: billing.Lookup[];
  addBilling:boolean=false;
  billingLevel: string = '';
  opprName: string = '';
  businessType: string = '';
  billingByLevelMapId: number = 0;
  billingByLevelName: string = '';
  rateCardId: number;
  rateCardList: any;
  oldBillingLevelId:number;
  statusList: billing.Lookup[];

  @ViewChild('first',{static: false}) first: MatExpansionPanel;
  @ViewChild('second',{static: false}) second: MatExpansionPanel;

  constructor(private contractservice: ContractService, private dialog: MatDialog, private spinner: NgxSpinnerService, 
              private tosterService:ToastrService,private router: Router, private formBuilder: FormBuilder, private acrouter: ActivatedRoute) { }

  createRadio() {
    var radio: any[] = [{ id: 1, value: 'YES' },
    { id: 0, value: 'NO' },
    ];
    return radio;
  }
  setBillingDtls() {
    var billingDtls: any[] = [
      { value: 'BILLING CYCLE FLAG' },
      { value: 'ACTUAL BILL CREATION DATE' },
    ];
    return billingDtls;
  }

  createCategory() {
    var categoryList: any[] = [
     { value: 'CONSIGNEE' },
    ];
    if (this.businessType != "INBOUND") {
      categoryList.push({ value: 'CONSIGNOR TO CONSIGNEE' });
    }
    return categoryList;
  }

  editflow = false;
  isDisable:boolean;
  ngOnInit() {
    this.isDisable = false;
    this.acrouter.params.subscribe(params => {
      if (params['editflow']) { 
        this.editflow = params['editflow'];
        this.isDisable = true;
      }
    });
    if (this.first)
      this.first.close();
    
    this.billingData = new billing.BillingModel(this.billingData);
    this.billingLevelList = [];
    this.billingSubLevelList = [];
    this.billingSubTypeList = [];
    this.paymentTermList = [];
    this.billingCycleList = [];
    this.billingByList = [];
    this.billingByAllList = [];
    this.todBasedOnList = [];
    this.billingFormatList = [];
    this.gbCategoryList = [];
    this.ebillingList = this.createRadio();
    this.autoBillingList = this.createRadio();
    this.todList = this.createRadio();
    this.cneeCnorBillList = [];
    this.billingDtlsList = this.setBillingDtls();
    this.billingOfferingList = [];
    this.cneeCnorFlagList = this.createRadio();
    this.excludeBillingFlagList = this.createRadio();
    this.cneeList = [];
    this.cnorList = [];
    this.stateList = [];
    this.rateCardId = 0;
    this.rateCardList  = [];
    this.allBillingData=[];
    this.oldBillingLevelId = 0;
    this.statusList = [];
    this.getOpportunityDetails();
  }

  getOpportunityDetails() {
    this.spinner.show();
    this.contractservice.getOportunity(AppSetting.oprtunityId,this.editflow).subscribe(opprResult => {
      var result = opprResult.data;
      this.opprName = result.responseData.opprName;
      result.referenceData.businessTypeList.forEach(element => {
        if (element.id == result.responseData.contract.lkpBizTypeId) {
          this.businessType = element.lookupVal;
          console.log("111"+this.businessType)
        }
      });
      this.categoryList = this.createCategory();
      this.getBillingData();
    },error=>{
      this.spinner.hide();
      this.tosterService.error("Error in fetching opportunity and billing data");
    });
  }

  getBillingData() {
    this.contractservice.getBillingData(AppSetting.contractId,this.editflow)
      .subscribe(billingData => {
        var data = billingData.data;
        console.log(data);
        console.log(this.billingData);
        console.log("2222"+this.businessType);
        var offeringId = 0;
        var billingLevelId = 0;
        this.billingLevel = '';
        if (data.responseData && data.responseData.length > 0) {
          this.billingData = JSON.parse(JSON.stringify(data.responseData[0]));
          this.allBillingData = JSON.parse(JSON.stringify(data.responseData));
          offeringId = this.billingData.lkpBillingSublevelId;
          billingLevelId = this.billingData.lkpBillingLevelId;
          this.oldBillingLevelId= billingLevelId;
        }

        if (data.referenceData.billingLevelList) {
          this.billingLevelList = this.billingLevelList.concat(data.referenceData.billingLevelList);
          this.billingLevelList.forEach(element => {
            if (element.id == billingLevelId)
            this.billingLevel = element.lookupVal;
            
          });
        }

        if (this.billingLevel == 'RATE CARD') {
          this.rateCardList = [];
          offeringId = 0;
          this.contractservice.getRateCardDetail(AppSetting.contractId,this.editflow).subscribe(result => {
            if (result && result.data.responseData)
              this.rateCardList = this.rateCardList.concat(result.data.responseData);
            this.second.close();
          },error=>{
            console.log("Error in getting rate card data")
          });
        }else if(this.billingLevel != ''){
          this.second.open();
        }

        if (data.referenceData.billingByList) {
          if (this.billingLevel != '' && this.billingLevel == 'MSA' && this.businessType != "ANYWHERE TO ANYWHERE") {
            data.referenceData.billingByList.forEach(element => {
              if ((element.lookupVal == 'CONSOLIDATION' || element.lookupVal == 'DESTINATION BRANCH WISE' || element.lookupVal == 'DESTINATION STATE WISE'))
                this.billingByList.push(element);
            });
          }
          else {
            data.referenceData.billingByList.forEach(element => {
              if (element.lookupVal != 'CONSOLIDATION') {
                if (this.businessType == 'INBOUND' && element.lookupVal != 'BOOKING BRANCH')
                  this.billingByList.push(element);
                else if (this.businessType == 'OUTBOUND')
                  this.billingByList.push(element);
              }
              if (this.businessType == "ANYWHERE TO ANYWHERE" && (element.lookupVal == 'DESTINATION BRANCH WISE' 
              || element.lookupVal == 'DESTINATION STATE WISE')) {
                this.billingByList.push(element);
              }
            });
          }
          this.billingByAllList = this.billingByAllList.concat(data.referenceData.billingByList);
        }


        if (data.referenceData.billingCycleList)
          this.billingCycleList = this.billingCycleList.concat(data.referenceData.billingCycleList);

        if (data.referenceData.billingSubLevelList) {
          this.billingSubLevelList = this.billingSubLevelList.concat(data.referenceData.billingSubLevelList);
          this.billingSubLevelList.forEach(element => {
            if (element.id == offeringId && element.lookupVal != 'ALL') {
              //this.selectOffering = true;
              this.selectOffering=false; //making false as offering not to be selected from UI
            }
          });
        }

        if (this.billingData && this.billingData.billingOfferingMap && this.billingData.billingOfferingMap.length ==1 && this.selectOffering)
          this.serviceOfferingId = this.billingData.billingOfferingMap[0].serviceOfferingId;
        
        if (data.referenceData.billingSubTypeList)
          this.billingSubTypeList = this.billingSubTypeList.concat(data.referenceData.billingSubTypeList);

        if (data.referenceData.paymentTermList)
          this.paymentTermList = this.paymentTermList.concat(data.referenceData.paymentTermList);

        if (data.referenceData.todBasedOnList)
          this.todBasedOnList = this.todBasedOnList.concat(data.referenceData.todBasedOnList);

        if (data.referenceData.billingFormatList)
          this.billingFormatList = this.billingFormatList.concat(data.referenceData.billingFormatList);

        if (data.referenceData.gbCategoryList)
          this.gbCategoryList = this.gbCategoryList.concat(data.referenceData.gbCategoryList);

        if (data.referenceData.offerings)
          this.billingOfferingList = this.billingOfferingList.concat(data.referenceData.offerings);
        
        if (data.referenceData.statusList)
          this.statusList = this.statusList.concat(data.referenceData.statusList);
        

        this.spinner.hide();
        if(this.billingData && this.billingData.billingBy){
          this.billingByList.forEach(element => {
            if (element.id == this.billingData.billingBy[0].billingByLevelMapId) {
              this.billingByLevelMapId = element.id;
              this.billingByLevelName = element.lookupVal;
              if(this.billingByLevelName == 'CONSOLIDATION'){
                this.addBilling = false;
                this.displayedColumns = ["billingBranchId", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
              }
              else if(this.businessType != "ANYWHERE TO ANYWHERE"){
                this.addBilling = false;
                if (this.billingByLevelName == 'BOOKING BRANCH') {
                  this.displayedColumns = ["billingBranchId", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
                }
                else if (this.billingByLevelName == 'SUBMISSION BRANCH' || this.billingByLevelName == 'COLLECTION BRANCH') {
                  this.displayedColumns = ["assignBranchId", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
                }
                else if (this.billingByLevelName == 'DESTINATION BRANCH WISE' && this.businessType==="OUTBOUND") {
                  this.displayedColumns = ["assignBranchId", "billingBranchId", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
                }
                else if (this.billingByLevelName == 'DESTINATION BRANCH WISE' && this.businessType==="INBOUND") {
                  this.displayedColumns = ["assignBranchId", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
                }
                else if(this.billingByLevelName == 'DESTINATION STATE WISE'){
                  this.displayedColumns = ["assignBranchId", "state", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
                }
              }else if(this.businessType == "ANYWHERE TO ANYWHERE"){
                this.addBilling = true;
                 if (this.billingByLevelName == 'DESTINATION BRANCH WISE') {
                  this.displayedColumns = ["billingBranchId", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
                }else if(this.billingByLevelName == 'DESTINATION STATE WISE'){
                  this.displayedColumns = ["state", "billingBranchId", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
                }
              }
            }
          });
          for (let i = 0; i < this.billingData.billingBy.length; i++) {
            this.billingData.billingBy[i].billtoAddrList=this.billingData.billingBy[i].billtoAddr.split("||");
        }
      }
        if (this.billingData && this.billingData.billingCneeCnorMap) {
          this.contractservice.getCneeCnorData(AppSetting.msaCustId).subscribe(cneeCnorData => {
            for (var k = 0; k < this.billingData.billingCneeCnorMap.length; k++) {
              this.cneeList = cneeCnorData.data.referenceData.msaCneeList;
              this.cnorList = cneeCnorData.data.referenceData.msaCnorList;
              for (var i = 0; i < this.cneeList.length; i++) {
                if (this.billingData.billingCneeCnorMap[k].cneeId == this.cneeList[i].id)
                  this.billingData.billingCneeCnorMap[k].cneeName = this.cneeList[i].name;
              }
              for (var j = 0; j < this.cnorList.length; j++) {
                if (this.billingData.billingCneeCnorMap[k].cnorId == this.cnorList[j].id)
                  this.billingData.billingCneeCnorMap[k].cnorName = this.cnorList[j].name;
              }
            }
          },error=>{
            console.log("error in getting cneeCnor data")
          });
        }
      }, error => {
        console.log("errrrrrrrrorrrrrr in getting billing data api");
      });

  }

  changeLevel() {
    console.log(this.billingData.lkpBillingLevelId);
    var billingLevelId=this.billingData.lkpBillingLevelId;
    this.rateCardId = null;
    this.billingLevel = '';
    this.billingByList = [];
    this.billingByLevelMapId=null;
    this.billingByLevelName='';
    this.billingData = new billing.BillingModel();
    this.billingData.lkpBillingLevelId=billingLevelId;
    this.billingLevelList.forEach(element => {
      if (element.id == this.billingData.lkpBillingLevelId)
        this.billingLevel = element.lookupVal;
    });
    if (this.billingLevel != '' && this.billingLevel == 'MSA') {
      this.billingByAllList.forEach(element => {
        if ((element.lookupVal == 'CONSOLIDATION' || element.lookupVal == 'DESTINATION BRANCH WISE' || element.lookupVal == 'DESTINATION STATE WISE'))
          this.billingByList.push(element);
      });
    } else {
      if (this.billingLevel == 'RATE CARD') {
        this.second.close();
        this.spinner.show();
        this.rateCardList = [];
        this.contractservice.getRateCardDetail(AppSetting.contractId,this.editflow).subscribe(result => {
          if (result && result.data.responseData)
            this.rateCardList = this.rateCardList.concat(result.data.responseData);
          this.spinner.hide();  
        },error=>{
        });
      }
      this.billingByAllList.forEach(element => {
        if (element.lookupVal != 'CONSOLIDATION') {
          if (this.businessType == 'INBOUND') {
            if (element.lookupVal != 'BOOKING BRANCH')
              this.billingByList.push(element);
          }
          else
            this.billingByList.push(element);
        }
      });
    }
    this.displayedColumns = ["billingBranchId", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
    this.second.open();
  }

  showOffering(item) {
    console.log(item);
    if (item.lookupVal == 'ALL'){
      this.selectOffering = false;
      console.log('1')
    }   
     else{
       this.selectOffering = false;
       console.log('2')
     }
       
      //this.selectOffering = true; 
      //code to be uncommented if service needs to be activated in future
      
  }

  assignConnCnee(item) {
    console.log(item);
    this.contractservice.getCneeCnorData(AppSetting.msaCustId)
      .subscribe(cneeCnorData => {
        console.log(cneeCnorData);
        this.cneeList = cneeCnorData.data.referenceData.msaCneeList;
        this.cnorList = cneeCnorData.data.referenceData.msaCnorList;

        if (this.billingData && this.billingData.billingCneeCnorMap && this.billingData.billingCneeCnorMap.length > 0) {
          this.billingData.billingCneeCnorMap.forEach(element => {
            for (var i = 0; i < this.cneeList.length; i++) {
              if (element.cneeId == this.cneeList[i].id)
                this.cneeList[i].ischecked = true;
            }
            for (var j = 0; j < this.cnorList.length; j++) {
              if (element.cnorId == this.cnorList[j].id)
                this.cnorList[j].ischecked = true;
            }
          });
        }

        const dialogCCRef = this.dialog.open(CneeCnorDialogBox, {disableClose: true,
          width: '80%',
          data: { element: item, cneeList: this.cneeList, cnorList: this.cnorList },
        });

        dialogCCRef.afterClosed().subscribe(result => {
          var newBillingCneeCnorMap = [];
          var cneeCnorMap = [];
          if (result && result.element == 'CONSIGNEE') {
            result.cneeList.forEach(element => {
              if (element.ischecked == true) {
                newBillingCneeCnorMap.push({ cneeId: element.id, cnorId: 0, id: null,cneeName: element.name });
              }
            });
            if (this.billingData.billingCneeCnorMap != null && this.billingData.billingCneeCnorMap[0].id > 0) {
              newBillingCneeCnorMap.forEach(elementNew => {
                var exists = false;
                this.billingData.billingCneeCnorMap.forEach(element => {
                  if (elementNew.cneeId == element.cneeId) {
                    exists = true;
                  }
                });
                if (!exists) {
                  cneeCnorMap.push({ cneeId: elementNew.cneeId, cnorId: 0, id: null, cneeName: elementNew.cneeName });
                }
              });
              this.billingData.billingCneeCnorMap = JSON.parse(JSON.stringify(cneeCnorMap));
            } else {
              this.billingData.billingCneeCnorMap = newBillingCneeCnorMap;
            }
          }
          else{
            result.cnorList.forEach(element => {
              if (element.ischecked) {
                result.cneeList.forEach(element1 => {
                  if (element1.ischecked) 
                    newBillingCneeCnorMap.push({ id: null, cneeId: element1.id, cnorId: element.id, cneeName: element1.name, cnorName: element.name });
                });
              }
            });

            if (this.billingData.billingCneeCnorMap != null && this.billingData.billingCneeCnorMap[0].id > 0) {
              newBillingCneeCnorMap.forEach(elementNew => {
                var exists = false;
                this.billingData.billingCneeCnorMap.forEach(element => {
                  if (elementNew.cneeId == element.cneeId && elementNew.cnorId == element.cnorId) {
                    exists = true;
                  }
                });
                if (!exists) {
                  cneeCnorMap.push({ cneeId: elementNew.cneeId, cnorId: elementNew.cnorId, id: null, cneeName: elementNew.cneeName,cnorName:elementNew.cnorName });
                }
              });
              this.billingData.billingCneeCnorMap = JSON.parse(JSON.stringify(cneeCnorMap));
            } else {
              this.billingData.billingCneeCnorMap = newBillingCneeCnorMap;
            }
          }         
        });

      },error=>{
        console.log("Error in getting cneeCnor data.")
      });
  }

  billingBranchError:boolean;
  searchBillingBranch(billingBy, str) {
    if(str){
      this.billingBranchError=true;
      if(str.length > 2 && str){
        this.billingBranchError=false;
        var flag = this.billingByLevelName == "DESTINATION BRANCH WISE" ? true : false && this.businessType == "OUTBOUND" ? true : false;;
        const billingBrDialog = this.dialog.open(BranchDialogBox, {disableClose: true,
          data: { branchId: billingBy.billingBranchId, branchName: billingBy.billingBranchName, hubFlag:flag }
        });
    
        billingBrDialog.afterClosed().subscribe(result => {
          if (result) {
            billingBy.billingBranchId = result.branchId;
            billingBy.billingBranchName = result.branchName;
          }
        });
      }
    }

  }

  submissionBranchError:boolean;
  searchSubmissionBranch(billingBy, str) {
    if(str){
      this.submissionBranchError=true;
      if(str.length > 2 && str){
        this.submissionBranchError=false;
        const billingBrDialog = this.dialog.open(BranchDialogBox, {disableClose: true,
          data: { branchId: billingBy.submsnBranchId, branchName: billingBy.submsnBranchName, hubFlag: false }
        });
    
        billingBrDialog.afterClosed().subscribe(result => {
          if (result) {
            billingBy.submsnBranchId = result.branchId;
            billingBy.submsnBranchName = result.branchName;
          }
        });
      }
    }
  }

  collectionBranchError:boolean;
  searchCollectionBranch(billingBy, str) {
      if(str){
        this.collectionBranchError=true;
        if(str.length > 2 && str){
          this.collectionBranchError=false;
          const billingBrDialog = this.dialog.open(BranchDialogBox, {disableClose: true,
            data: { branchId: billingBy.collBranchId, branchName: billingBy.collBranchName, hubFlag: false }
          });
      
          billingBrDialog.afterClosed().subscribe(result => {
            console.log(result, 'The dialog was closed');
            if (result) {
              billingBy.collBranchId = result.branchId;
              billingBy.collBranchName = result.branchName;
            }
          });
        }
      }
  }

  getAllStates(){
    this.contractservice.getAllStates().subscribe(result => {
      result.data.responseData.forEach(element => {
        this.stateList.push({ id: element.id, lookupVal: element.stateName,descr:element.stateName })
      });
    },error=>{
      this.tosterService.error("Error in fetching all states");
      console.log("Error in fetching all states");
    });
  }

  changeBillingBy(blngByLvlId) {
    console.log(blngByLvlId);
    console.log(this.billingByAllList);
    this.billingByLevelName='';
    this.stateList = [];
    this.billingData.billingBy = [];
    this.billingData.billingBy.push(new billing.BillingBy());
    this.billingByAllList.forEach(element => {
      if (blngByLvlId == element.id)
      this.billingByLevelName = element.lookupVal;
    });
    if (this.billingByLevelName == 'CONSOLIDATION') {
      this.billingData.billingBy = [];
      var newBillingBy = new billing.BillingBy();
      this.displayedColumns = ["billingBranchId", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
      this.billingData.billingBy.push(newBillingBy);
      this.addBilling = false;
    } 
    else if(this.businessType!="ANYWHERE TO ANYWHERE") {
      this.addBilling = false;
      this.contractservice.getAssignBranchDetailByCntr(AppSetting.contractId,this.editflow).subscribe(result => {
        this.billingData.billingBy = [];
        let map = new Map();
        if(result.data.responseData.length==0){
          this.tosterService.warning("No Assign branch found for this contract. Kindly create atleast one branch to use "+this.billingByLevelName+" as billing By");
        }
        result.data.responseData.forEach(element => {
          var newBillingBy = new billing.BillingBy();
          if (this.billingLevel == 'RATE CARD') {
            console.log(this.rateCardId,element.ratecardId);
            if (this.rateCardId == element.ratecardId) {
              if (this.billingByLevelName == 'BOOKING BRANCH') {
                newBillingBy.billingBranchId = element.bkngBranchId;
                newBillingBy.billingBranchName = element.bkngBranchName;
                this.displayedColumns = ["billingBranchId", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
              }
              else if (this.billingByLevelName == 'SUBMISSION BRANCH' || this.billingByLevelName == 'COLLECTION BRANCH') {
                newBillingBy.assignBranchId = element.bkngBranchId;
                newBillingBy.assignBranchName = element.bkngBranchName;
                this.displayedColumns = ["assignBranchId", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
              }
              else if (this.billingByLevelName == 'DESTINATION BRANCH WISE' && this.businessType=="OUTBOUND") {
                newBillingBy.assignBranchId = element.bkngBranchId;
                newBillingBy.assignBranchName = element.bkngBranchName;
                this.displayedColumns = ["assignBranchId", "billingBranchId", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
              }
              else if (this.billingByLevelName == 'DESTINATION BRANCH WISE' && this.businessType==="INBOUND") {
                newBillingBy.assignBranchId = element.bkngBranchId;
                newBillingBy.assignBranchName = element.bkngBranchName;
                this.displayedColumns = ["assignBranchId", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
              } else if (this.billingByLevelName == 'DESTINATION STATE WISE'){
                this.getAllStates();
                newBillingBy.assignBranchId = element.bkngBranchId;
                newBillingBy.assignBranchName = element.bkngBranchName;
                this.displayedColumns = ["assignBranchId", "state", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
              }
              map.set(newBillingBy.assignBranchName,newBillingBy);
            }
          }
          else{
            if (this.billingByLevelName == 'BOOKING BRANCH') {
              newBillingBy.billingBranchId = element.bkngBranchId;
              newBillingBy.billingBranchName = element.bkngBranchName;
              this.displayedColumns = ["billingBranchId", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
            } 
            else if (this.billingByLevelName == 'SUBMISSION BRANCH' || this.billingByLevelName == 'COLLECTION BRANCH') {
              newBillingBy.assignBranchId = element.bkngBranchId;
              newBillingBy.assignBranchName = element.bkngBranchName;
              this.displayedColumns = ["assignBranchId", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
            }
            else if (this.billingByLevelName == 'DESTINATION BRANCH WISE' && this.businessType==="OUTBOUND") {
              newBillingBy.assignBranchId = element.bkngBranchId;
              newBillingBy.assignBranchName = element.bkngBranchName;
              this.displayedColumns = ["assignBranchId", "billingBranchId", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
            }
            else if (this.billingByLevelName == 'DESTINATION BRANCH WISE' && this.businessType==="INBOUND") {
              newBillingBy.assignBranchId = element.bkngBranchId;
              newBillingBy.assignBranchName = element.bkngBranchName;
              this.displayedColumns = ["assignBranchId", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
            }
            else if (this.billingByLevelName == 'DESTINATION STATE WISE'){
              this.getAllStates();
              newBillingBy.assignBranchId = element.bkngBranchId;
              newBillingBy.assignBranchName = element.bkngBranchName;
              this.displayedColumns = ["assignBranchId", "state", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
            }
            map.set(newBillingBy.assignBranchName,newBillingBy);
          }
        });

        map.forEach(data => {
          console.log(data);
          this.billingData.billingBy.push(data);
        });
        console.log(this.billingData.billingBy);

      },error=>{
        this.tosterService.error("Error in getting assign branch data");
      });
      this.addBilling = false;
    }
    else if (this.businessType == "ANYWHERE TO ANYWHERE") {
      this.addBilling = true;
      this.billingData.billingBy = [];
      var newBillingBy = new billing.BillingBy();
      this.billingData.billingBy.push(newBillingBy);
      if (this.billingByLevelName == 'DESTINATION BRANCH WISE') {
        this.displayedColumns = ["billingBranchId", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
      } else if (this.billingByLevelName == 'DESTINATION STATE WISE') {
        this.getAllStates();
        this.displayedColumns = ["state","billingBranchId", "submsnBranchId", "collBranchId", "billtoAddr", "gstinNum", "minBillingAmt", "excludeBillingFlag", 'excludeBillingDt', 'tanNum', 'lkpGbCtgyId', 'creditRisk', 'mnthPotential', 'ebillEmail', 'bdmEmail', 'commBillEmail'];
      }
    }
    
  }

  postBillingData(nextKey) {
    this.spinner.show();
    console.log(nextKey,this.billingData);
    this.billingData.contractId = AppSetting.contractId;
    if (this.billingLevel == 'MSA')
      this.billingData.entityId = AppSetting.msaCustId;
    if (this.billingLevel == 'SFX')
      this.billingData.entityId = AppSetting.contractId;
    if (this.billingLevel == 'RATE CARD')
      this.billingData.entityId = this.rateCardId;
    var stateLevelId = 0;
    this.billingByAllList.forEach(element => {
      if (element.lookupVal.includes('STATE'))
        stateLevelId = element.id;
    });
    
    for (var i = 0; i < this.billingData.billingBy.length; i++) {
      this.billingData.billingBy[i].excludeBillingDt = this.billingData.billingBy[i].excludeBillingFlag == 1 ? null : this.billingData.billingBy[i].excludeBillingDt;
      this.billingData.billingBy[i].billtoAddr = this.billingData.billingBy[i].billtoAddrList.join("||");
      this.billingData.billingBy[i].billingByLevelMapId = this.billingByLevelMapId;
      if (this.billingByLevelMapId == stateLevelId) {
        this.billingData.billingBy[i].billingBranchId = null;
        this.billingData.billingBy[i].billingBranchName = null;
      } else {
        this.billingData.billingBy[i].stateId = null;
        if (this.billingByLevelName == "BOOKING BRANCH" && this.businessType != 'ANYWHERE TO ANYWHERE') {
          this.billingData.billingBy[i].assignBranchId = this.billingData.billingBy[i].billingBranchId;
          this.billingData.billingBy[i].assignBranchName = this.billingData.billingBy[i].billingBranchName;
        } else if (this.billingByLevelName == "SUBMISSION BRANCH" && this.businessType != 'ANYWHERE TO ANYWHERE') {
          this.billingData.billingBy[i].billingBranchId = this.billingData.billingBy[i].submsnBranchId;
          this.billingData.billingBy[i].billingBranchName = this.billingData.billingBy[i].submsnBranchName;
        } else if (this.billingByLevelName == "COLLECTION BRANCH" && this.businessType != 'ANYWHERE TO ANYWHERE') {
          this.billingData.billingBy[i].billingBranchId = this.billingData.billingBy[i].collBranchId;
          this.billingData.billingBy[i].billingBranchName = this.billingData.billingBy[i].collBranchName;
        } else if (this.billingByLevelName == 'DESTINATION BRANCH WISE' && this.businessType == 'ANYWHERE TO ANYWHERE') {
          this.billingData.billingBy[i].assignBranchId = this.billingData.billingBy[i].billingBranchId;
          this.billingData.billingBy[i].assignBranchName = this.billingData.billingBy[i].billingBranchName;
        } else if (this.billingByLevelName == 'COLLECTION BRANCH' && this.businessType == 'ANYWHERE TO ANYWHERE') {
          this.billingData.billingBy[i].assignBranchId = this.billingData.billingBy[i].collBranchId;
          this.billingData.billingBy[i].assignBranchName = this.billingData.billingBy[i].collBranchName;
          this.billingData.billingBy[i].billingBranchId = this.billingData.billingBy[i].collBranchId;
          this.billingData.billingBy[i].billingBranchName = this.billingData.billingBy[i].collBranchName;
        } else if (this.billingByLevelName == 'SUBMISSION BRANCH' && this.businessType == 'ANYWHERE TO ANYWHERE') {
          this.billingData.billingBy[i].assignBranchId = this.billingData.billingBy[i].submsnBranchId;
          this.billingData.billingBy[i].assignBranchName = this.billingData.billingBy[i].submsnBranchName;
          this.billingData.billingBy[i].billingBranchId = this.billingData.billingBy[i].submsnBranchId;
          this.billingData.billingBy[i].billingBranchName = this.billingData.billingBy[i].submsnBranchName;
        } else if (this.billingByLevelName == 'DESTINATION BRANCH WISE' && this.businessType != 'ANYWHERE TO ANYWHERE') {
          this.billingData.billingBy[i].billingBranchId = this.billingData.billingBy[i].assignBranchId;
          this.billingData.billingBy[i].billingBranchName = this.billingData.billingBy[i].assignBranchName;
        }

      }
    }
    
    if (this.selectOffering) {
      if (!(this.billingData.billingOfferingMap && this.billingData.billingOfferingMap.length > 0 && this.billingData.billingOfferingMap[0].serviceOfferingId > 0 
        && this.billingData.billingOfferingMap[0].serviceOfferingId == this.serviceOfferingId)) {
          this.billingData.billingOfferingMap=[];
          this.billingData.billingOfferingMap.push({ id: null, serviceOfferingId: this.serviceOfferingId, status: null });
      }
    } else {
      if (this.billingData.billingOfferingMap && this.billingData.billingOfferingMap.length > 0 && this.billingData.billingOfferingMap[0].serviceOfferingId > 0) {
        var existingOfferingList=JSON.parse(JSON.stringify(this.billingData.billingOfferingMap));
        existingOfferingList.forEach(element => {
          var exists= false;
          this.billingOfferingList.forEach(element1 => {
            if(element.serviceOfferingId==element1.serviceOfferingId)
              exists=true;
          });
          if(!exists)
            this.billingData.billingOfferingMap.push({id:null,serviceOfferingId:element.serviceOfferingId, status: null});
        });
      } else {
        this.billingData.billingOfferingMap=[];
        this.billingOfferingList.forEach(element => {
          this.billingData.billingOfferingMap.push({id:null,serviceOfferingId:element.serviceOfferingId, status: null});
        });
      }
    }

    

    if(this.oldBillingLevelId!=0 && this.oldBillingLevelId!=this.billingData.lkpBillingLevelId){
      var deactivateData={key:"cntrid",value:[AppSetting.contractId]};
      this.contractservice.deactivateOldBilling(deactivateData,this.editflow).subscribe(result=>{
        if(result.data.responseData==true){
          this.contractservice.postBillingData(this.billingData,this.editflow).subscribe(result => {
            console.log("result", result);
            this.spinner.hide();
            this.tosterService.success("Save Successfully");
            if(nextKey==1){
              if(this.editflow){
                this.router.navigate(['/retail-contract/documentupload',{steper:true,'editflow':'true'}]);
              }else{
                this.router.navigate(['/retail-contract/documentupload']);
              }
            }
          },error=>{
            this.spinner.hide();
            this.tosterService.error("Error in adding billing",error);
          });
        }else{
          this.spinner.hide()
          this.tosterService.error("Error in deactivating old billing data.");
        }
      },error=>{
        this.spinner.hide();
        this.tosterService.error("Error in deactivating old billing data.")
      });
    }else{
    this.billingData = this.deactivateOrphanChild(this.billingData);
    this.contractservice.postBillingData(this.billingData,this.editflow).subscribe(result => {
      console.log("result", result);
      this.spinner.hide();
      this.tosterService.success("Save Successfully");
      if(nextKey==1){
        if(this.editflow){
          this.router.navigate(['/retail-contract/documentupload',{steper:true,'editflow':'true'}]);
        }else{
          this.router.navigate(['/retail-contract/documentupload']);
        }
      }
    },error=>{
      this.spinner.hide();
      this.tosterService.error("Error in adding billing",error);
    });
  }
   }

  addBillingBy() {
    this.billingData.billingBy = this.billingData.billingBy.concat(new billing.BillingBy());
    console.log(this.billingData.billingBy);
  }

  loadRateCard(rateCardId) {
    console.log(rateCardId);
    this.spinner.show();
    var offeringId = 0;
    this.rateCardId=rateCardId;
    let rateCardExists=false;
    var billingLevel = this.billingData.lkpBillingLevelId;

    if (this.allBillingData ) {
      this.allBillingData.forEach(element => {
        if (element.entityId == rateCardId && element.lkpBillingLevelId == this.billingData.lkpBillingLevelId){
          this.billingData = element;
          rateCardExists = true;
        }
      });
      if (this.billingSubLevelList && rateCardExists) {
        this.billingSubLevelList.forEach(element => {
          if (element.id == offeringId && element.lookupVal != 'ALL') {
            //this.selectOffering = true; // code to be use if offering code needs to be change in future
            this.selectOffering = false;
          }
        });
      }

      if (rateCardExists && this.billingData && this.billingData.billingOfferingMap && this.billingData.billingOfferingMap.length ==1 && this.selectOffering)
        this.serviceOfferingId = this.billingData.billingOfferingMap[0].serviceOfferingId;
    }

    if(!rateCardExists) {
      this.billingData = new billing.BillingModel;
      this.billingData.lkpBillingLevelId=billingLevel;   
    }
    
    this.spinner.hide();
    this.first.open();
    this.second.open();
  }

  updateList(index, column, value) {
    console.log(event);
    this.billingData.billingBy[index][column] = value;
    console.log(this.billingData.billingBy[index][column]);
  }

  changeValue(index, column, value) {
    console.log(event);
    this.billingData.billingBy[index][column] = value;
    console.log(this.billingData.billingBy[index][column]);
  }

  addAddress(index){
    const addrDialog = this.dialog.open(AddressDialogBox, {
      disableClose: true
    });
    addrDialog.afterClosed().subscribe(result => {
      console.log(result, 'The dialog was closed');
      if (result && result!="") {
        this.billingData.billingBy[index]["billtoAddrList"].push(result);
        this.billingData.billingBy[index]["billtoAddr"] = JSON.parse(JSON.stringify(result));
      }
    });
  }

  
  @ViewChild("fBilling", null) saveBilling: any;
  
  isValidBilling() {
    if(this.saveBilling.form.valid === true) {
      this.postBillingData(1);
    }else {
    }
  }
  isValidBillingDraft() {
    if(this.saveBilling.form.valid === true) {
      this.postBillingData(0);
    }else {
    }
  }

  
  @HostListener('document:keydown', ['$event'])

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.altKey && (event.keyCode === 78)) { // alt+n [Next]
        event.preventDefault();
        if(document.getElementById('billingNextButton')){
          let element = document.getElementById('billingNextButton');
          element.click();
        }
        else {
                
        }
      }

      if (event.ctrlKey && (event.keyCode === 83)) { // ctrl+s [Save as Draft]
        event.preventDefault();
        if(document.getElementById('billingDraftButton')){
          let element = document.getElementById('billingDraftButton');
          element.click();
        }
        else {
                
        }
      }

      if (event.ctrlKey && (event.keyCode === 90)) { // ctrl+z [Reset]
          event.preventDefault();
          if(document.getElementById('billingResetButton')){
            let element = document.getElementById('billingResetButton');
            element.click();
          }
          else {
                  
          }
        }
  
  }



  deactivateOrpanChild(newBillingData:billing.BillingModel): billing.BillingModel {
    var inactiveStatus = 0;
    this.statusList.forEach(element => {
      if (element.lookupVal === 'INACTIVE')
        inactiveStatus = element.id;
    });
    
    if (this.allBillingData && this.allBillingData.length > 0) {
      this.allBillingData.forEach(oldElement => {

        if ((oldElement.billingBy && oldElement.billingBy.length > 0)
          || (oldElement.billingCneeCnorMap && oldElement.billingCneeCnorMap.length > 0)
          || (oldElement.billingOfferingMap && oldElement.billingOfferingMap.length > 0)) {

          let deactivatedBillingByList = [];
          let deactivatedCneeCnorList = [];
          let deactivatedOfferingList = [];
          
            if (oldElement.id === newBillingData.id) {

              //deactivate billing by
              if (oldElement.billingBy && oldElement.billingBy.length > 0) {
                oldElement.billingBy.forEach(oldBillingBy => {
                  var billingByExists = false;
                  newBillingData.billingBy.forEach(newBillingBy => {
                    if (oldBillingBy.id === newBillingBy.id) {
                      billingByExists = true;
                    }
                  });
                  if (!billingByExists && inactiveStatus > 0) {
                    oldBillingBy.status = inactiveStatus;
                    deactivatedBillingByList.push(oldBillingBy);
                  }
                });
              }

              //deactivate cnee-cnor
              if (oldElement.billingCneeCnorMap && oldElement.billingCneeCnorMap.length > 0) {
                oldElement.billingCneeCnorMap.forEach(oldCneeCnor => {
                  var cneeCnorExists = false;
                  newBillingData.billingCneeCnorMap.forEach(newCneeCnor => {
                    if (oldCneeCnor.id === newCneeCnor.id) {
                      cneeCnorExists = true;
                    }
                  });
                  if (!cneeCnorExists && inactiveStatus > 0) {
                    oldCneeCnor.status = inactiveStatus;
                    deactivatedCneeCnorList.push(oldCneeCnor);
                  }
                });
              }


              //deactivate offering
              if (oldElement.billingOfferingMap && oldElement.billingOfferingMap.length > 0) {
                oldElement.billingOfferingMap.forEach(oldOffering => {
                  var offeringExists = false;
                  newBillingData.billingOfferingMap.forEach(newOffering => {
                    if (oldOffering.id === newOffering.id) {
                      offeringExists = true;
                    }
                  });
                  if (!offeringExists && inactiveStatus > 0) {
                    oldOffering.status = inactiveStatus;
                    deactivatedOfferingList.push(oldOffering);
                  }
                });
              }
            }

          if (deactivatedBillingByList.length > 0) {
            newBillingData.billingBy = newBillingData.billingBy.concat(deactivatedBillingByList);
          }
          if (deactivatedCneeCnorList.length > 0) {
            newBillingData.billingCneeCnorMap = newBillingData.billingCneeCnorMap.concat(deactivatedCneeCnorList);
          }
          if (deactivatedOfferingList.length > 0) {
            newBillingData.billingOfferingMap = newBillingData.billingOfferingMap.concat(deactivatedOfferingList);
          }
         
        }

      });
    }
    return newBillingData;
  }

  deactivateOrphanChild(newBillingData:billing.BillingModel): billing.BillingModel {
    var inactiveStatus = 0;
    this.statusList.forEach(element => {
      if (element.lookupVal === 'INACTIVE')
        inactiveStatus = element.id;
    });
    
    console.log(this.allBillingData);
    console.log(newBillingData);

    if (this.allBillingData && this.allBillingData.length > 0) {
      this.allBillingData.forEach(oldElement => {

        if ((oldElement.billingBy && oldElement.billingBy.length > 0)
          || (oldElement.billingCneeCnorMap && oldElement.billingCneeCnorMap.length > 0)
          || (oldElement.billingOfferingMap && oldElement.billingOfferingMap.length > 0)) {

          let deactivatedBillingByList = [];
          let deactivatedCneeCnorList = [];
          let deactivatedOfferingList = [];
          
            if (oldElement.id === newBillingData.id) {

              //deactivate billing by
              if (oldElement.billingBy && oldElement.billingBy.length > 0) {
                oldElement.billingBy.forEach(oldBillingBy => {
                  var billingByExists = false;
                  newBillingData.billingBy.forEach(newBillingBy => {
                    if (oldBillingBy.id === newBillingBy.id) {
                      billingByExists = true;
                    }
                  });
                  if (!billingByExists && inactiveStatus > 0) {
                    oldBillingBy.status = inactiveStatus;
                    deactivatedBillingByList.push(oldBillingBy);
                  }
                });
              }

              //deactivate cnee-cnor
              if (oldElement.billingCneeCnorMap && oldElement.billingCneeCnorMap.length > 0) {
                oldElement.billingCneeCnorMap.forEach(oldCneeCnor => {
                  var cneeCnorExists = false;
                  newBillingData.billingCneeCnorMap.forEach(newCneeCnor => {
                    if (oldCneeCnor.id === newCneeCnor.id) {
                      cneeCnorExists = true;
                    }
                  });
                  if (!cneeCnorExists && inactiveStatus > 0) {
                    oldCneeCnor.status = inactiveStatus;
                    deactivatedCneeCnorList.push(oldCneeCnor);
                  }
                });
              }


              //deactivate offering
              if (oldElement.billingOfferingMap && oldElement.billingOfferingMap.length > 0) {
                oldElement.billingOfferingMap.forEach(oldOffering => {
                  var offeringExists = false;
                  newBillingData.billingOfferingMap.forEach(newOffering => {
                    if (oldOffering.id === newOffering.id) {
                      offeringExists = true;
                    }
                  });
                  if (!offeringExists && inactiveStatus > 0) {
                    oldOffering.status = inactiveStatus;
                    deactivatedOfferingList.push(oldOffering);
                  }
                });
              }
            }

          if (deactivatedBillingByList.length > 0) {
            newBillingData.billingBy = newBillingData.billingBy.concat(deactivatedBillingByList);
          }
          if (deactivatedCneeCnorList.length > 0) {
            newBillingData.billingCneeCnorMap = newBillingData.billingCneeCnorMap.concat(deactivatedCneeCnorList);
          }
          if (deactivatedOfferingList.length > 0) {
            newBillingData.billingOfferingMap = newBillingData.billingOfferingMap.concat(deactivatedOfferingList);
          }
         
        }

      });
    }
    return newBillingData;
  }

}

@Component({
  selector: 'address-dialog',
  templateUrl: 'billing.address.dialog.html',
  styleUrls: ['../core.css']
})

export class AddressDialogBox {

  constructor( public dialogRef: MatDialogRef<AddressDialogBox>, 
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  address1:string="";
  address2:string="";
  address3:string="";

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeDialog(): void {
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      data:{message:'Are you sure ?'},
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if(value){
        this.dialogRef.close();
      }else{
        console.log('Keep Open');
      }
    });
    
  }

  ngOnInit() {
  }

  addAddress(){
    this.data = this.address1.toUpperCase() +" "+ this.address2.toUpperCase() +" "+ this.address3.toUpperCase();
    this.dialogRef.close(this.data);
  }

  @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if (event.keyCode === 27) { // esc [Close Dialog]
        event.preventDefault();
        if(document.getElementById('closeButton')){
          let element = document.getElementById('closeButton');
          element.click();
        }
      }
  }

}


/* dialog component start */

@Component({
  selector: 'conn-cnee-dialog',
  templateUrl: 'billing.conn-cnee.dialog.html',
  styleUrls: ['../core.css']
})
export class CneeCnorDialogBox {

  constructor(
    public dialogRef: MatDialogRef<CneeCnorDialogBox>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeDialog(): void {
    // this.dialogRef.close();
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      data:{message:'Are you sure ?'},
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if(value){
        this.dialogRef.close();
      }else{
        console.log('Keep Open');
      }
    });
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

/* dialog component ends */

/* branch search dialog component start */

@Component({
  selector: 'branch-search-dialog',
  templateUrl: 'billing.branch.dialog.html',
  styleUrls: ['../core.css']
})
export class BranchDialogBox {

  model: any = {};
  twoAPIdata: any;
  showData: any = [];
  tableData: any;
  newData: any = [];
  tabledataLength: number = 0;

  constructor(private contractservice: ContractService, 
    public dialog: MatDialog, private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<BranchDialogBox>,
    @Inject(MAT_DIALOG_DATA) public data1: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeDialog(): void {
    // this.dialogRef.close();
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      data:{message:'Are you sure ?'},
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if(value){
        this.dialogRef.close();
      }else{
        console.log('Keep Open');
      }
    });
  }

  ngOnInit() {
    this.model.search = 'NAME';
    this.model.searchbyname = this.data1.branchName;
    this.advanceDefaultBranchName();
  }

  searchBranchFlag: boolean = false;
  advanceFlag() {
    this.searchBranchFlag = true;
  }

  advanceDefaultBranchName() {
    console.log(this.model);

    if (this.model.search == "NAME") {
      this.spinner.show();
      this.contractservice.searchBranch(this.model.searchbyname.toUpperCase(),this.data1.hubFlag).subscribe(branchList => {
        var data = branchList.data.responseData;
        this.twoAPIdata = {};
        this.tableData = {};        
        this.twoAPIdata = data;
        this.tableData = data;
        this.spinner.hide();
        for (let data of this.tableData) {
          if (data.branchType == 'CORPORATE') {
            data.regionBranch = '';
          } else if (data.branchType == 'REGION') {
            data.regionBranch = data.branchName;
          }
        }
        this.tabledataLength = this.tableData.length;
      },error=>{
        console.log("error in fetching branch data")
        this.spinner.hide();
      });
    }
  }

  setBranch(branch) {
    console.log(branch);
    this.data1 = branch;
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

/* branch search dialog component ends */