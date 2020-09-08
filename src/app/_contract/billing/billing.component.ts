import { Component, OnInit, ViewChild, Inject, HostListener } from '@angular/core';
import { ContractService } from '../contract.service';
import { MatExpansionPanel} from '@angular/material';
import { AppSetting } from '../../app.setting';
import * as billing from '../models/billingModel';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';
import { FormBuilder } from '@angular/forms';
import { confimationdialog } from '../confirmationdialog/confimationdialog';
import * as _ from 'lodash';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from '../services/authorization.service';


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
  sfxCode = AppSetting.sfxCode;
  customerName = AppSetting.customerName;
  billingData: any = 
    {
      "addr": "",
      "cntrId": AppSetting.contractId,
      "crtdBy": "",
      "descr": "",
      "gstinNum": "",
      "id": 0,
      "lkpInvFreqId": null,
      "lkpPaymentTermId": null,
      "lkpPrcInvToId": null,
      "name": "",
      "relation": "",
      "status": null,
      "updBy": "",
    };
  prcPymtTermList = [];
  prcInvFreqList = [];
  prcInvToList = [];
  thirdPartyId :any;
  prcId:any;
  editflow = false;
  isDisable:boolean;

  constructor(
    private contractservice: ContractService, 
    private dialog: MatDialog, 
    private spinner: NgxSpinnerService, 
    private tosterService:ToastrService,
    private router: Router, 
    private formBuilder: FormBuilder, 
    private acrouter: ActivatedRoute,
    private permissionsService: NgxPermissionsService, 
    private authorizationService: AuthorizationService
    ) { }




  ngOnInit() {
    this.authorizationService.setPermissions('BILLING');
    this.permissionsService.loadPermissions(this.authorizationService.getPermissions('BILLING'));
    this.isDisable = false;
    this.acrouter.params.subscribe(params => {
      if (params['editflow']) { 
        this.editflow = params['editflow'];
        this.isDisable = true;
      }
    });
    this.getBillingData();
    this.getOpportunityDetails();
    this.getMsaDetails();    
  }

  prcAddress;
  getOpportunityDetails() {
    this.spinner.show();
    this.contractservice.getOportunity(AppSetting.oprtunityId, this.editflow).subscribe(opprResult => {
      // var result = opprResult.data;
      AppSetting.rateCardApplicableFlag=opprResult.data.responseData.contract.rateCardApplicableFlag;
      // this.prcAddress = opprResult.data.responseData.opprAddr[0].addr;
      // this.getBillingData();
    }, error => {
      this.spinner.hide();
      this.tosterService.error("Error in fetching opportunity and billing data");
    });

  }
  getMsaDetails() {
    this.spinner.show();
    this.contractservice.getMsa(AppSetting.msaCustId).subscribe(opprResult => {
      opprResult.data.responseData[0].msaCustAddrs[0].addr = opprResult.data.responseData[0].msaCustAddrs[0].addr.replace('|',' ');
      opprResult.data.responseData[0].msaCustAddrs[0].addr = opprResult.data.responseData[0].msaCustAddrs[0].addr + ' ' + opprResult.data.responseData[0].msaCustAddrs[0].pincodeId;
      this.prcAddress   =opprResult.data.responseData[0].msaCustAddrs[0].addr; 
      // this.prcAddress = opprResult.data.responseData[0].msaCustAddrs[0].addr;
      this.spinner.hide();
      // this.getBillingData();
    }, error => {
      this.spinner.hide();
      this.tosterService.error("Error in fetching opportunity, MSA and billing data");
    });
  }

  getBillingData() {
    this.spinner.show();
    this.contractservice.getBillingData(AppSetting.contractId,this.editflow)
      .subscribe(obj => {
        let temp = obj.data;
        if( temp && temp['responseData'].length > 0){  
          this.billingData = temp['responseData'][0];
        }
        if( temp && temp['referenceData']){  
          this.prcPymtTermList = temp['referenceData'].prcPymtTermList;
          this.prcInvFreqList = temp['referenceData'].prcInvFreqList;
          this.prcInvToList = temp['referenceData'].prcInvToList;
          let invoicedata =  _.find(this.prcInvToList, { 'lookupVal': 'THIRD PARTY'});
          let invoicedataPrc =  _.find(this.prcInvToList, { 'lookupVal': 'PRC'});
          this.thirdPartyId  = invoicedata.id;
          this.prcId  = invoicedataPrc.id;
        }
        this.spinner.hide();
       }, error => {
         this.spinner.hide();
        console.log("errrrrrrrrorrrrrr in getting billing data api");
      });

  }

  changePrcInv(){
    if(this.billingData.lkpPrcInvToId == this.prcId){
      this.billingData.addr = this.prcAddress;
    }else{
      this.billingData.addr = '';
    }
  }


  postBillingData(nextKey) {
    if(this.billingData.lkpPrcInvToId != this.thirdPartyId){
     delete this.billingData.name;
     delete this.billingData.relation;
     delete this.billingData.gstinNum;
    }else {
      this.billingData.name = this.billingData.name ? this.billingData.name.toUpperCase() : '';
      this.billingData.relation = this.billingData.relation ? this.billingData.relation.toUpperCase() : '';
      this.billingData.gstinNum = this.billingData.gstinNum ? this.billingData.gstinNum.toUpperCase() : '';
    }
    this.billingData.addr = this.billingData.addr ? this.billingData.addr.toUpperCase() : '';
    this.billingData.cntrId = AppSetting.contractId;
    this.spinner.show();
    this.contractservice.postBillingData(this.billingData,this.editflow).subscribe(result => {
      this.spinner.hide();
      // debugger
      this.billingData.id = result.responseData;
      this.tosterService.success("Save Successfully");
      if(nextKey==1){
        if(this.editflow){
          this.router.navigate(['/prc-contract/documentupload',{steper:true,'editflow':'true'}] , {skipLocationChange : true});
        }else{
          this.router.navigate(['/prc-contract/documentupload'] , {skipLocationChange : true});
        }
      }else{
        this.getBillingData();
      }
    },error=>{
      this.spinner.hide();
      this.tosterService.error("Error in adding billing",error);
    });
  }
  
  @HostListener('document:keydown', ['$event'])

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.altKey && (event.keyCode === 78)) { // alt+n [Next]
      // if (event.keyCode === 78) {
        event.preventDefault();
        if(document.getElementById('billingNextButton')){
          let element: HTMLElement = document.getElementById('billingNextButton') as HTMLElement;
          element.click();
        }
       
      }

      if (event.ctrlKey && (event.keyCode === 83)) { // ctrl+s [Save as Draft]
        event.preventDefault();
        if(document.getElementById('billingDraftButton')){
          let element: HTMLElement = document.getElementById('billingDraftButton') as HTMLElement;
          element.click();
        }
    
      }

      if (event.ctrlKey && (event.keyCode === 90)) { // ctrl+z [Reset]
          event.preventDefault();
          if(document.getElementById('billingResetButton')){
            let element: HTMLElement = document.getElementById('billingResetButton') as HTMLElement;
            element.click();
          }
    
        }
  
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
    // this.dialogRef.close();
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      panelClass: 'creditDialog',
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
          let escElement = document.getElementById('closeButton');
          escElement.click();
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


}

/* branch search dialog component ends */