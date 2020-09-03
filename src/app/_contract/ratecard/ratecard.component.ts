import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { ContractService } from '../contract.service';
import { ViewChild } from '@angular/core'
import { MatExpansionPanel } from '@angular/material';
import { AppSetting } from "../../app.setting";
import { Modeltnc } from '../models/modeltnc';
import { BranchModel } from '../models/BranchModel';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { vmiDTO } from '../models/vmiDTO';
import {CommercialDataModel} from '../models/Commercial/CommercialData'
import {ReferenceDataModel} from '../models/Commercial/ReferenceData'
import {CommercialProductMap} from '../models/Commercial/CommercialProductMap'
import {ZmPrice} from '../models/Commercial/ZmPrice'
import {ZmCustomPrice} from '../models/Commercial/ZmCustomPrice';
import {SafextBkngCustomCharge} from '../models/Commercial/SafextBkngCustomCharge'
import {SafextDlvryCustomCharge} from '../models/Commercial/SafextDlvryCustomCharge'
import {SafextCharge} from '../models/Commercial/SafextCharge'
import {PricingParamTrans} from '../models/Commercial/PricingParamTrans'
import { ErrorConstants }  from '../models/constants';
import { customSlaDTO } from '../models/customSlaDTO';
import { slaDTO } from '../models/slaDTO';
import { PincodesearchComponent } from '../pincodesearch/pincodesearch.component';
import { confimationdialog } from '../confirmationdialog/confimationdialog';
import * as _ from 'lodash';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from '../services/authorization.service';
import { CitysearchComponent } from '../citysearch/citysearch.component';
import { StatesearchComponent } from '../statesearch/statesearch.component';

//for select
export interface Food {
  value: string;
  viewValue: string;
}
//end of select

export interface PopData {
  animal: string;
  name: string;
}

export interface ccData {
  element: any;
  referenceList: any;
  editflow: false;
  businessType: any;
}

export interface SearchBrData {
  branchName: any
  branchId:any
  branchIdList:any
}



@Component({
  selector: "dialog-base-location-br",
  templateUrl: "advance_search1.html",
  styleUrls: ["../core.css"]
})
export class BaseLocationSearchB { 
model: any = {};
twoAPIdata: any;

constructor(
  @Inject(MAT_DIALOG_DATA) public data: SearchBrData,
  public dialogBaseLRefB: MatDialogRef<BaseLocationSearchB>,
  public dialog: MatDialog,
  private httpservice: HttpClient,
  private contractService: ContractService,
  private tosterservice: ToastrService,
  private spinner: NgxSpinnerService,
  public router: Router,
  
) {}
ngOnInit() {
  this.model.search='NAME';
  this.model.searchbyname='';
}
onNoClick(): void {
  this.dialogBaseLRefB.close();
}

closeDialog(): void {
  // this.dialogBaseLRefB.close();
  const dialogRefConfirm = this.dialog.open(confimationdialog, {
    width: '300px',
    panelClass: 'creditDialog',
    data:{message:'Are you sure ?'},
    disableClose: true,
    backdropClass: 'backdropBackground'
  });

  dialogRefConfirm.afterClosed().subscribe(value => {
    if(value){
      this.dialogBaseLRefB.close();
    }else{
      console.log('Keep Open');
    }
  });
}

allTableData: any = [];
fiterData(filterValue){
  if(!filterValue){
    return this.tableData = this.allTableData.filter(obj => {
        return obj;       
    });
  }else{
    return this.tableData = this.allTableData.filter(obj => {
        return obj.branchCode.toLowerCase().includes(filterValue.toLowerCase());    
      });

  }
}

searchBranchFlag: boolean = false;
advanceFlag() {
  this.searchBranchFlag = true;
}
//default Branch Advance Search
showData: any = [];
tableData: any ;
newData: any = [];
tabledataLength;
advanceSearch:boolean;
advanceDefaultBranchName(str) {  
 if(str){
   this.advanceSearch=true;
   if(str.length >2 &&  str){
     this.advanceSearch=false;
    if (this.model.search == "NAME") {
      this.spinner.show();
      let searcgObj=this.model.searchbyname.toUpperCase();
      this.contractService.searchBranchByName(searcgObj)
        .subscribe(success => {
          let ob = ErrorConstants.validateException(success);
          if(ob.isSuccess){
          this.twoAPIdata = {};
          this.tableData = {};
          this.spinner.hide();
         // this.newData = [];
          if(success.data.responseData.length>0){
            for( var i = 0; i < success.data.responseData.length; i++){ 
            for( var j = 0; j < this.data.branchIdList.length; j++){ 
              if ( this.data.branchIdList[j] === success.data.responseData[i].branchId) {
                success.data.responseData[i]["isDisabled"]= true;
                break;
              }
              }}
          }
          this.twoAPIdata = success.data.responseData;
          this.tableData = success.data.responseData;

          if (this.tableData && this.tableData.length > 0) {
            this.tableData.sort((a, b) => {
              const branchNameA = a.branchName.toUpperCase();
              const branchNameB = b.branchName.toUpperCase();
              let comparison = 0;
              if (branchNameA > branchNameB) {
                comparison = 1;
              } else if (branchNameA < branchNameB) {
                comparison = -1;
              }
              return comparison;
            });
            this.twoAPIdata.sort((a, b) => {
              const branchNameA = a.branchName.toUpperCase();
              const branchNameB = b.branchName.toUpperCase();
              let comparison = 0;
              if (branchNameA > branchNameB) {
                comparison = 1;
              } else if (branchNameA < branchNameB) {
                comparison = -1;
              }
              return comparison;
            });
          }

          for(let data of this.tableData){
            if(data.branchType=='CORPORATE'){
              data.regionBranch='';
            }else if(data.branchType=='REGION'){
              data.regionBranch=data.branchName;
            }
          }
          this.allTableData = [...this.tableData];
          this.tabledataLength = this.tableData.length;
          for (let advanceValue of this.twoAPIdata) {
            this.showData.push(advanceValue);
          }
     }else{
      this.tosterservice.error(ob.message);
      this.spinner.hide();
    }},
  error => {
    this.tosterservice.info('No Branch found !!');
    this.spinner.hide();
  });
    }
   }
 }
}

filterDataByAreaList(branch){
  this.data.branchName=branch.branchName;
  this.data.branchId=branch.branchId;
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

@Component({
  selector: 'app-ratecard',
  templateUrl: './ratecard.component.html',
  styleUrls: ['../core.css']
})

export class RatecardComponent implements OnInit {  
  selectedCommandment:any='RATECARD LEVEL';
  
// hover flag
  //zonal rate card
  show = false; 
  prevzmslabto1;
  prevzmslabto2;
  prevzmslabto3;
  prevzmslabto4;
  prevzmslabto5;

  toggle(oldVal) {
  this.show = !this.show;
  if(this.show){
    this.prevzmslabto1 = JSON.parse(JSON.stringify(oldVal));
  }
  if(this.zmslabto1 && this.zmslabto1 > 0){
    this.zmslabfrom2 = this.zmslabto1 +1
  }else{
    this.zmslabto1= 100;
    this.zmslabfrom2 = this.zmslabto1 +1
  }
  }

  showArray = false;
  toggleArray(oldVal) {
  this.showArray = !this.showArray; 
  if(this.showArray){
    this.prevzmslabto2 = JSON.parse(JSON.stringify(oldVal));
  }
  if(this.zmslabto2 && this.zmslabto2 > 0){
    this.zmslabfrom3 = this.zmslabto2 +1
  }else{
    this.zmslabto2 = this.zmslabfrom2 + 100;
    this.zmslabfrom3 = this.zmslabto2 +1
  }
  }

 addSlabVal(){
  if(this.zmslabto1>99898 || this.zmslabto1<0) {
    this.zmslabto1 = this.prevzmslabto1;
    this.tosterservice.info('Please enter values between <0 - 99898>');
    return;
   }
   if(this.CommercialDataModel.ZonalSlabCounter===2){
    this.zmslabfrom2 = this.zmslabto1 +1
    this.zmslabto2 = this.zmslabfrom2+100;
   }
   if(this.CommercialDataModel.ZonalSlabCounter===3){
    this.zmslabfrom3 = this.zmslabto2 +1
    this.zmslabto3 = this.zmslabfrom3+100;
   }
   if(this.CommercialDataModel.ZonalSlabCounter===4){
    this.zmslabfrom4 = this.zmslabto3 +1
    this.zmslabto4 = this.zmslabfrom4+100;
   }
   if(this.CommercialDataModel.ZonalSlabCounter===5){
    this.zmslabfrom5 = this.zmslabto4 +1
    this.zmslabto5 = this.zmslabfrom5+100;
   }
 }
 addSlabVal1(){
  if(this.zmslabto1>99898 || this.zmslabto1<0) {
    this.zmslabto1 = this.prevzmslabto1;
   this.tosterservice.info('Please enter values between <0 - 99898>');
   return;
  }
  if(this.CommercialDataModel.ZonalSlabCounter===2){
    this.zmslabfrom2 = this.zmslabto1 +1
    this.zmslabto2 = this.zmslabfrom2+100;
  }
 if(this.CommercialDataModel.ZonalSlabCounter===3){
   this.zmslabfrom2 = this.zmslabto1 +1
   this.zmslabto2 = this.zmslabfrom2+100;
   this.zmslabfrom3 = this.zmslabto2 +1
   this.zmslabto3 = this.zmslabfrom3+100;
  }
  if(this.CommercialDataModel.ZonalSlabCounter===4){
   this.zmslabfrom2 = this.zmslabto1 +1
   this.zmslabto2 = this.zmslabfrom2+100;
   this.zmslabfrom3 = this.zmslabto2 +1
   this.zmslabto3 = this.zmslabfrom3+100;
   this.zmslabfrom4 = this.zmslabto3 +1
   this.zmslabto4 = this.zmslabfrom4+100;
  }
  if(this.CommercialDataModel.ZonalSlabCounter===5){
   this.zmslabfrom2 = this.zmslabto1 +1
   this.zmslabto2 = this.zmslabfrom2+100;
   this.zmslabfrom3 = this.zmslabto2 +1
   this.zmslabto3 = this.zmslabfrom3+100;
   this.zmslabfrom4 = this.zmslabto3 +1
   this.zmslabto4 = this.zmslabfrom4+100;
   this.zmslabfrom5 = this.zmslabto4 +1
   this.zmslabto5 = this.zmslabfrom5+100;
  }

}
 addSlabVal2(){
   if(this.zmslabto2<this.zmslabfrom2 || this.zmslabto2>99898) {
    this.zmslabto2 = this.prevzmslabto2;
    this.tosterservice.info('Please enter values between <0 - 99898>');
    return;
   }
  if(this.CommercialDataModel.ZonalSlabCounter===3){
    this.zmslabfrom3 = this.zmslabto2 +1
    this.zmslabto3 = this.zmslabfrom3+100;
   }
   if(this.CommercialDataModel.ZonalSlabCounter===4){
    this.zmslabfrom3 = this.zmslabto2 +1
    this.zmslabto3 = this.zmslabfrom3+100;
    this.zmslabfrom4 = this.zmslabto3 +1
    this.zmslabto4 = this.zmslabfrom4+100;
   }
   if(this.CommercialDataModel.ZonalSlabCounter===5){
    this.zmslabfrom3 = this.zmslabto2 +1
    this.zmslabto3 = this.zmslabfrom3+100;
    this.zmslabfrom4 = this.zmslabto3 +1
    this.zmslabto4 = this.zmslabfrom4+100;
    this.zmslabfrom5 = this.zmslabto4 +1
    this.zmslabto5 = this.zmslabfrom5+100;
   }

 }
 addSlabVal3(){
  if(this.zmslabto3<this.zmslabfrom3 || this.zmslabto3>99898) {
    this.zmslabto3 = this.prevzmslabto3;
    this.tosterservice.info('Please enter values between <0 - 99898>');
    return;
   }
   if(this.CommercialDataModel.ZonalSlabCounter===4){
    this.zmslabfrom4 = this.zmslabto3 +1
    this.zmslabto4 = this.zmslabfrom4+100;
   }
   if(this.CommercialDataModel.ZonalSlabCounter===5){
    this.zmslabfrom4 = this.zmslabto3 +1
    this.zmslabto4 = this.zmslabfrom4+100;
    this.zmslabfrom5 = this.zmslabto4 +1
    this.zmslabto5 = this.zmslabfrom5+100;
   }
}
addSlabVal4(){
  if(this.zmslabto4<this.zmslabfrom4 || this.zmslabto4>99898) {
    this.zmslabto4 = this.prevzmslabto4;
    this.tosterservice.info('Please enter values between <0 - 99898>');
    return;
   }
   if(this.CommercialDataModel.ZonalSlabCounter===5){
    this.zmslabfrom5 = this.zmslabto4 +1
    this.zmslabto5 = this.zmslabfrom5+100;
   }

}

addSlabVal5(){
  if(this.zmslabto5<this.zmslabfrom5) {
    this.zmslabto5 = this.prevzmslabto5;
    this.tosterservice.info('Please enter values between <0 - 99898>');
    return;
   }
}

  showArray2 = false;
  toggleArray2(oldval) {
    this.showArray2 = !this.showArray2;
    if(this.showArray2){
      this.prevzmslabto3 = JSON.parse(JSON.stringify(oldval));
    }
    if (this.zmslabto3 && this.zmslabto3 > 0) {
      this.zmslabfrom4 = this.zmslabto3 + 1
    } else {
      this.zmslabto3 = this.zmslabfrom3 + 100;
      this.zmslabfrom4 = this.zmslabto3 + 1
    }
  }
  showArray3 = false;
  toggleArray3(oldval) {
    this.showArray3 = !this.showArray3;
    if(this.showArray3){
      this.prevzmslabto4 = JSON.parse(JSON.stringify(oldval));
    }
    if (this.zmslabto4 && this.zmslabto4 > 0) {
      this.zmslabfrom5 = this.zmslabto4 + 1
    } else {
      this.zmslabto4 = this.zmslabfrom4 + 100;
      this.zmslabfrom5 = this.zmslabto4 + 1
    }
  }
  showArray4 = false;
  toggleArray4(oldval) {
    this.showArray4 = !this.showArray4;
    if(this.showArray4){
      this.prevzmslabto5 = JSON.parse(JSON.stringify(oldval));
    }
  }

  removeFieldColumn(){
    const dialogRefEdit = this.dialog.open(confimationdialog,{

      data: { message: "Are you sure you want to delete slab ?" },
      disableClose: true,
      panelClass: 'creditDialog',
      width: '310px'
    });
  
    dialogRefEdit.afterClosed().subscribe(result => {
      if(result){
        this.CommercialDataModel.ZonalSlabCounter = this.CommercialDataModel.ZonalSlabCounter -1;
        if(this.CommercialDataModel.ZonalSlabCounter==5){
          this.CommercialDataModel.stopZonalSlab=true;
        }else{
          this.CommercialDataModel.stopZonalSlab=false;
        } 
      }
      console.log('The dialog was closed with pinocde ' ,result);
    });
  }
   //add columns
   private fieldArray1: Array<any> = [];
   private newAttribute1: any = {};
 
   addFieldColumn() {
    
    if(this.CommercialDataModel.ZonalSlabCounter==1){
      if(this.zmslabto1>99899){
        this.tosterservice.info('You Have Reached Max<99999> Slab Value !');
        return;
      }
    }
    if(this.CommercialDataModel.ZonalSlabCounter==2){
      if(this.zmslabto2>99899){
        this.tosterservice.info('You Have Reached Max<99999> Slab Value !');
        return;
      }
    }
    if(this.CommercialDataModel.ZonalSlabCounter==3){
      if(this.zmslabto3>99899){
        this.tosterservice.info('You Have Reached Max<99999> Slab Value !');
        return;
      }
    }
    if(this.CommercialDataModel.ZonalSlabCounter==4){
      if(this.zmslabto4>99899){
        this.tosterservice.info('You Have Reached Max<99999> Slab Value !');
        return;
      }
    }
    if(this.CommercialDataModel.ZonalSlabCounter==5){
      if(this.zmslabto5>99899){
        this.tosterservice.info('You Have Reached Max<99999> Slab Value !');
        return;
      }
    }
    const dialogRefEdit = this.dialog.open(confimationdialog,{

      data: { message: "Are you sure you want to add another slab ?" },
      disableClose: true,
      panelClass: 'creditDialog',
      width: '310px'
    });
  
    dialogRefEdit.afterClosed().subscribe(result => {
      if(result){
        this.CommercialDataModel.ZonalSlabCounter = this.CommercialDataModel.ZonalSlabCounter +1;
        if(this.CommercialDataModel.ZonalSlabCounter==5){
          this.CommercialDataModel.stopZonalSlab=true;
        }  
        this.addSlabVal();
        this.changeSlabProtion();
      }
      console.log('The dialog was closed with pinocde ' ,result);
    });
   }


   isValidCommercial(type) {
    if(this.CommercialDataModel.lkpChrgByPiece && this.CommercialDataModel.commercialProductMap.length==0){
      this.prdListChk = true
    }
    if ((this.commSurface == undefined || this.commSurface.form.valid === true) && 
    (this.zonalSlab == undefined || this.zonalSlab.form.valid === true) && 
    (this.rateMapping == undefined || this.rateMapping.form.valid === true) && 
    (this.delCustMaster == undefined || this.delCustMaster.form.valid === true) &&
    (this.bookCustMaster == undefined || this.bookCustMaster.form.valid === true) &&
    !this.prdListChk
    ) {
     this.postCommercialCardDetail(type);
    }else {
      if(
        (this.commSurface && this.commSurface.form.valid === false) ||
        (this.zonalSlab && this.zonalSlab.form.valid === false) ||
        (this.delCustMaster && this.delCustMaster.form.valid === false) ||
        (this.rateMapping && this.rateMapping.form.valid === false) ||
        (this.bookCustMaster && this.bookCustMaster.form.valid === false) || this.prdListChk
        ) {
        this.tosterservice.error('Some Required Fields Missing/Invalid !')
      }
    }
  }

  isValidSLA(type) {
    
   if ((this.slaForm == undefined || this.slaForm.form.valid === true) && 
   (this.customSla == undefined || this.customSla.form.valid === true) && 
   (this.safeExtnType == undefined || this.safeExtnType.form.valid === true)) {
    this.saveSLA(type);
   }else {
     if((this.slaForm != undefined && this.customSla !=undefined && this.safeExtnType != undefined) &&
       this.slaForm.form.valid == false || this.customSla.form.valid || this.safeExtnType.form.valid) {
      this.tosterservice.error('Some Required Fields Missing/Invalid !')
    }
   }
 }

 				  
 isValidStartDt:boolean = false;
 isValidEndDt:boolean = false;
 isValidSignDt:boolean = false;

 startDate() {
  this.first.close();
  let effYear = parseInt(this.datePipe.transform(this.model.effectiveDt, 'yyyy'))
  if (effYear > 9999) {
    this.model.effectiveDt = "";
  } else {
  this.endDate();
  let b = this.datePipe.transform(this.model.effectiveDt, 'yyyy-MM-dd')
  if (b < this.minDate || b > this.maxdateRCStart) {
    this.isValidStartDt = true;
  }
  else {
    this.isValidStartDt = false;
  }
  {
    let e = new Date(b);
    e.setDate(e.getDate()+1);
    this.mindateRCExp = e;
    }
}
}

endDate() {
  this.first.close();
  let expYear = parseInt(this.datePipe.transform(this.model.expDt, 'yyyy'))
    if (expYear > 9999) {
      this.model.expDt = "";
    } else {
    let c = this.datePipe.transform(this.model.expDt, 'yyyy-MM-dd')
    if (c < this.mindateRCExp || c > this.maxDate) {
      this.isValidEndDt = true;
    }
    else {
      this.isValidEndDt = false;
    }
    {
      let e = new Date(c);
      e.setDate(e.getDate()-1);
      this.maxdateRCStart = e;
      }
  }
}

signDate(){
  this.first.close();
  let expYear = parseInt(this.datePipe.transform(this.model.rateCardSignDt, 'yyyy'));
  if (expYear > 9999) {
    this.model.expDt = "";
  } else {
    //incase any validation provided for sign date then to be implemented here
  }
}

 rateCard: boolean = false;
 rateCardDetail: boolean = false;
 commercialSurface: boolean = false;
 commandmentPanel: boolean = false;
 termsPanel: boolean = false;
 branchPanel: boolean = false;
 slaPanel: boolean = false;
 vmiPanel: boolean = false;

 openRateCard(){
  this.rateCard = true;
 }
 closeRateCard(){
  this.rateCard = false;
 }

 openRateCardDetail(){
  this.rateCardDetail = true;
 }
 openRateCardDetailClick(){
  if(!this.model.id){
    this.tosterservice.error('No Rate Card Selected !!')
    this.second.close();
    this.spinner.hide();
    return
  }
 }
 closeRateCardDetail(){
  this.rateCardDetail = false;
 }
 
 openCommercialSurface(){
  this.commercialSurface = true;
 }
 closeCommercialSurface(){
  this.commercialSurface = false;
 }

 openCommandment(){
  this.commandmentPanel = true;
 }
 closeCommandment(){
  this.commandmentPanel = false;
 }

 openTerms(){
  this.termsPanel = true;
 }
 closeTerms(){
  this.termsPanel = false;
 }

 openBranch(){
  this.branchPanel = true;
 }
 closeBranch(){
  this.branchPanel = false;
 }

 openSLA(){
  this.slaPanel = true;
 }
 closeSLA(){
  this.slaPanel = false;
 }

 openVMI(){
  this.vmiPanel = true;
 }
 closeVMI(){
  this.vmiPanel = false;
 }



 @HostListener('document:keydown', ['$event'])
 handleKeyboardEvent(event: KeyboardEvent) {    
    // if (event.ctrlKey && (event.keyCode === 65)) { // ctrl+a [Add New Card]
    //   event.preventDefault();

    //   if(this.rateCard && document.getElementById('addRateCard')){
    //     let element: HTMLElement = document.getElementById('addRateCard') as HTMLElement;
    //     element.click();
    //   }

    //   else if(this.commercialSurface && document.getElementById('addCommercialSurface')){
    //    let element: HTMLElement = document.getElementById('addCommercialSurface') as HTMLElement;
    //    element.click();
    //   }

    //   else {
    //   }
      
    // }

    if (event.ctrlKey && (event.keyCode === 83)) { // ctrl+s [Save as Draft]
       event.preventDefault();

       if(this.rateCardDetail && document.getElementById('rateCardDraftButton')){
         let element: HTMLElement = document.getElementById('rateCardDraftButton') as HTMLElement;
         element.click();
       }      

       else if(this.commercialSurface && document.getElementById('commercialDraftButton')){
        let element: HTMLElement = document.getElementById('commercialDraftButton') as HTMLElement;
        element.click();
       }

       else if(this.commandmentPanel && document.getElementById('commandmentDraftButton')){
        let element: HTMLElement = document.getElementById('commandmentDraftButton') as HTMLElement;
        element.click();
       }

       else if(this.slaPanel && document.getElementById('slaSaveButton')){
         let element: HTMLElement = document.getElementById('slaSaveButton') as HTMLElement;
         element.click();
       }
        
    }
        
    
     if (event.altKey && (event.keyCode === 78)) { // alt+n [Next]
      event.preventDefault();

      if(this.rateCardDetail && document.getElementById('rateCardNextButton')){
        let element: HTMLElement = document.getElementById('rateCardNextButton') as HTMLElement;
        element.click();
      }

      else if(this.commercialSurface && document.getElementById('commercialNextButton')){
        let element: HTMLElement = document.getElementById('commercialNextButton') as HTMLElement;
        element.click();
      }

      else if(this.commandmentPanel && document.getElementById('commandmentNextButton')){
        let element: HTMLElement = document.getElementById('commandmentNextButton') as HTMLElement;
        element.click();
      }

      else if(this.termsPanel && document.getElementById('termsNextButton')){
        let element: HTMLElement = document.getElementById('termsNextButton') as HTMLElement;
        element.click();
      }

      else if(this.branchPanel && document.getElementById('branchNextButton')){
        let element: HTMLElement = document.getElementById('branchNextButton') as HTMLElement;
        element.click();
      }

      else if(this.slaPanel && document.getElementById('slaNextButton')){
        let element: HTMLElement = document.getElementById('slaNextButton') as HTMLElement;
        element.click();
      }      

      else if(this.vmiPanel && document.getElementById('vmiNextButton')){
        let element: HTMLElement = document.getElementById('vmiNextButton') as HTMLElement;
        element.click();
      }

      else {
        let element: HTMLElement = document.getElementById('rateSubmitButton') as HTMLElement;
        element.click();
      }
    }
 }

  searchCtrl = '';
  searchCtrlZone1 = '';
  searchCtrlZone = '';
  searchCtrlPrdct = '';
  searchCtrlFrom = '';
  searchCtrlTo = '';
  searchCtrlCnee = '';
  searchCtrlCnor = '';
  searchCtrlState = '';
  searchCtrlState1 = '';
  searchCtrlState2 = '';
  searchCtrlState3 = '';
  searchCtrlState4 = '';
  searchCtrlState5 = '';
  searchCtrlState6 = '';
  searchCtrlState7 = '';
  searchCtrlState8 = '';
  searchCtrlCity = '';
  searchCtrlCity1 = '';
  searchCtrlCity2 = '';
  searchCtrlCity3 = '';
  searchCtrlDis = '';
  searchCtrlDis1 = '';
  searchCtrlDis2 = '';
  searchCtrlDis3 = '';
  scrollActiveValue(){
    let selectItem = document.getElementsByClassName('mat-selected')[0];
    setTimeout(()=>{  
        if(selectItem){
          selectItem.scrollIntoView(false);
        }
    },500)
  }
  
  showCustom: boolean ;
  //custom rate mapping
  toggleCustomRate(){
    this.showCustom=!this.showCustom;
  }

  // safextension charges
  safeDArray = false;
  safeDCharges(){
    this.safeDArray = !this.safeDArray;
  }
  //safextension array charges
  safeDArray1 = false;
  safeDCharges1(){
    this.safeDArray1 = !this.safeDArray1;
  }

  //safextension booking charges
  safeBArray = false;
  safeBCharges(){
    this.safeBArray = !this.safeBArray;
  }
  // safextension booking charges within loop
  safeBArray1 = false;
  safeBCharges1(){
    this.safeBArray1 = !this.safeBArray1;
  }


  //hover flag end

// safextension chargesadd row
  //add columns
  private safeArray: Array<any> = [];
  safeAttribute: any = {};

  addFieldColumnSafextension() {
    this.safeArray.push(this.safeAttribute)
    this.safeAttribute = {};
  }
  //end of safextension row
  //safextension booking changes
  private safeBookingArray: Array<any> = [];
  safebookingAttribute: any = {};

  safebookiningColumns() {
    this.safeBookingArray.push(this.safebookingAttribute)
    this.safebookingAttribute = {};
  }
  //end of booking charges




  sfdcAccId = AppSetting.sfdcAccId;
  custName = AppSetting.customerName;
  sfxCode = AppSetting.sfxCode;
  //for multiple select option
  toppings = new FormControl();
  toppingList = ['Washing machine', 'Led tv', ];
  //end of multiple select option
  opportunity : any={};

  minDate;
  maxDate;

  @ViewChild('first',{static: false}) first: MatExpansionPanel;
  @ViewChild('second',{static: false}) second: MatExpansionPanel;
  @ViewChild('third',{static: false}) third: MatExpansionPanel;
  @ViewChild('four',{static: false}) four: MatExpansionPanel;
  @ViewChild('five',{static: false}) five: MatExpansionPanel;
  @ViewChild('six',{static: false}) six: MatExpansionPanel;
  @ViewChild('seven',{static: false}) seven: MatExpansionPanel;
  @ViewChild('eight',{static: false}) eight: MatExpansionPanel;
  @ViewChild("fRatecard", null) ratecard: any;
  @ViewChild("fCommercial", null) commSurface: any;
  @ViewChild("fBookCustMaster", null) bookCustMaster: any;
  @ViewChild("fZonalSlab", null) zonalSlab: any;
  @ViewChild("fRateMapping", null) rateMapping: any;
  @ViewChild("fDelCustMaster", null) delCustMaster: any;
  @ViewChild("fSLA", null) slaForm: any;
  @ViewChild("fCustomSla", null) customSla: any;
  @ViewChild("fSafeExtnType", null) safeExtnType: any;
  @ViewChild("fVmiSection", null) vmiSection: any;
  @ViewChild("fTerms", null) fTerms: any;
  @ViewChild("fbranch", null) fbranch: any;

   clearAllRateCardPageForms(){

    
    if(this.commSurface)this.commSurface.resetForm();
    if(this.bookCustMaster)this.bookCustMaster.resetForm();
    if(this.zonalSlab)this.zonalSlab.resetForm();
    if(this.rateMapping)this.rateMapping.resetForm();
    if(this.delCustMaster)this.delCustMaster.resetForm();
    if(this.slaForm)this.slaForm.resetForm();
    if(this.customSla)this.customSla.resetForm();
    if(this.safeExtnType)this.safeExtnType.resetForm();
    if(this.vmiSection)this.vmiSection.resetForm();
    if(this.fTerms)this.fTerms.resetForm();
    if(this.fbranch)this.fbranch.resetForm();
    this.show= false;
    this.showArray= false;
    this.showArray2= false;
    this.showArray3= false;
    this.showArray4= false;  
    this.zmslabto1= 100;
    this.zmslabfrom1= 0;

   }
   maxdateRCStart;
   mindateRCExp;
   changeState1() { 
    this.spinner.show();
    this.isZoneMatrixFound = true;
    this.isDisable = false;
    this.isCopyRateCard= false;
    this.isFCopyRc = false;
    this.isCopyRc = false;
    this.isDisableZm = false;
    this.isCommercialCopy = false;
    this.isCommandmentCopy = false;
    this.isBranchCopy = false;
    this.isSlaCopy = false;
    this.isRCCopyDone = false;
    this.isVmiCopy = false;
    this.isTncCopy = false;
    this.serviceOfferingName = '';
    this.RateCardName = '';
    this.clearAllRateCardPageForms();
    if(this.ratecard)this.ratecard.resetForm();
    this.isValidStartDt= false;
    this.isValidEndDt = false;
    this.isValidSignDt = false;
    this.contractservice.getOportunity(AppSetting.oprtunityId,this.editflow).subscribe(success => {
      
      this.opportunity.opportunityData = success.data.responseData;
      this.minDate = this.opportunity.opportunityData.contract.effectiveDt;
      this.maxDate = this.opportunity.opportunityData.contract.expDt;
      {
      let e = new Date(this.maxDate);
      e.setDate(e.getDate()-1);
      this.maxdateRCStart = e;
      }
      {
        let e = new Date(this.minDate);
        e.setDate(e.getDate()+1);
        this.mindateRCExp = e;
        }
      let ob = ErrorConstants.validateException(success);
        if(ob.isSuccess){
      this.opportunity.opportunityData = success.data.responseData;
      this.spinner.hide();
      this.model = {};
      this.model.rateCardSignDt = this.opportunity.opportunityData.contract.cntrSignDt;
      this.model.effectiveDt = this.opportunity.opportunityData.contract.effectiveDt;
      this.model.expDt = this.opportunity.opportunityData.contract.expDt;
      this.model.cmdmntLevel='RATECARD LEVEL';
      this.rcCmdLevel = 'RATECARD LEVEL';
      this.tableDataLocSearch = this.defaultableDataLocSearch;
      this.model.baseLocnBranchId = this.defaultBaseLocId;
      if(this.offerings.length==1){
        this.model.offeringId = this.offerings[0].id;
      }
       
      if (this.first.expanded) {
        this.first.close();
        this.second.open();
      } else {
        this.second.open();
      }
   }else{
    this.tosterservice.error(ob.message);
    this.spinner.hide();
  }},
error => {
  this.tosterservice.error(ErrorConstants.getValue(404));
  this.spinner.hide();
});
  
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  constructor(private spinner: NgxSpinnerService, private contractservice: ContractService, private dialog: MatDialog,
     private tosterservice: ToastrService, private datePipe: DatePipe,private router: Router, private acrouter: ActivatedRoute,
     private permissionsService: NgxPermissionsService, private authorizationService: AuthorizationService) { }

     showData: any = [];
     tableDataLocSearch: any = [];
     tableDataLocSearchLength;
     baseLocationError: boolean;
     advanceDefaultBranchName(str){
       if(str){
        this.baseLocationError=true;
         if(str.term.length > 2 && str.term){
          this.baseLocationError=false;
           this.contractservice.searchBranchByName(str.term)
             .subscribe(success => {
                 this.tableDataLocSearch = []
                 this.tableDataLocSearch = success.data.responseData;
                
                 if (this.tableDataLocSearch && this.tableDataLocSearch.length > 0) {
                  this.tableDataLocSearch.sort((a, b) => {
                    const branchNameA = a.branchName.toUpperCase();
                    const branchNameB = b.branchName.toUpperCase();
                    let comparison = 0;
                    if (branchNameA > branchNameB) {
                      comparison = 1;
                    } else if (branchNameA < branchNameB) {
                      comparison = -1;
                    }
                    return comparison;
                  });
                }

                 for(let val of this.tableDataLocSearch){
                  val["baseLocnBranchName"]= val.branchName;
                  val["baseLocnBranchId"] = val.branchId;
                 }
                 this.tableDataLocSearchLength = this.tableDataLocSearch.length;          
             },
               error => {
                 this.tosterservice.info('No Base Location found !!');
                 this.spinner.hide();
               });  
       }
       }
     }
     emptyData(){
      this.tableDataLocSearch=[];
     }
     onClear(){
      this.baseLocationError=false;
      if(this.tableDataLocSearch.length>0 &&  this.tableDataLocSearch[0].baseLocation==='BRANCH UNAVAILABLE'){
        this.emptyData();
      }
     }


  //add row
  private zmCustomPrice: Array<any> = [];
  private newAttribute: any = {
    "destId": 0,
    "id": 0,
    "lkpDestTypeId": 0,
    "lkpSrcTypeId": 0,
    "price": 0,
    "slabFrom": 0,
    "slabTo": 0,
    "srcId": 0
  };

  openCCDialog(field): void {
    const dialogCCRef = this.dialog.open(SearchCcDialogBox, {disableClose: true,
      width: '750px',
      panelClass: 'creditDialog',
      data: {element:field, referenceList: this.branchAssignModel.referenceList,editflow: this.editflow,businessType: this.businessType},
    });

    dialogCCRef.afterClosed().subscribe(result => {
      if(result){
      for(let item of this.branchAssignModel){
         if(item.bkngBranchId == result.element.bkngBranchId){
          item=result.element;
         }
      }}
    });
  }

openBaseLDialogBr(field): void {
  let branchName = ""
  let brIdList = []
  for(let data of this.branchAssignModel){
    if(data.bkngBranchId){
    brIdList.push(data.bkngBranchId);}
  }
  const dialogBaseLRefB = this.dialog.open(BaseLocationSearchB, {disableClose: true,
    panelClass: 'creditDialog',
    data: {branchName:field.bkngBranchName,branchIdList:brIdList}
  });

  dialogBaseLRefB.afterClosed().subscribe(result => {
    console.log(result,'The dialog was closed');
    if(result){
      field.bkngBranchName=result.branchName
      field.bkngBranchId=result.branchId
    }
  });
}

  carddetail: any = {}
  // commerical 
  commercial: any = {}
  CommercialDataModel = new CommercialDataModel();
  ReferenceDataModel = new ReferenceDataModel();
  //commercial_byid
  commercial_id: number
  //commandment_details
  commandment: any = {}
  //ratecarddetailsbyofferingid
  ratecardbyofferingid: any = {}
  //terms and condition
  tnc: any = {}
  //vmi 
  vmi: any = {}
  model: any = {}
  modelc: any = {}
  branchAssignModel: any = {};
  serviceOffering
  serviceOfferingName;
  RateCardName;
  editflow = false;
  isDisable:boolean;
  isDisableZm:boolean;
  oldAssignBranchList= [];

  ngOnInit() {
    let perList = [];
    this.authorizationService.setPermissions('RATE CARD');
    perList = perList.concat(this.authorizationService.getPermissions('RATE CARD'));
    this.authorizationService.setPermissions('COMMERCIAL');
    perList = perList.concat(this.authorizationService.getPermissions('COMMERCIAL'));
    this.authorizationService.setPermissions('COMMANDMENT');
    perList = perList.concat(this.authorizationService.getPermissions('COMMANDMENT'));
    this.authorizationService.setPermissions('TNC');
    let tncPermission = [];
    tncPermission = this.authorizationService.getPermissions('TNC');
    if (tncPermission.includes('FUEL DETAILS_CREATE') && tncPermission.includes('FLFC_CREATE')
      && tncPermission.includes('INCREMENT_CREATE') && tncPermission.includes('INSURANCE_CREATE')
      && tncPermission.includes('SECURITY_CREATE') && tncPermission.includes('NOTEPAD_CREATE')) {
      tncPermission.push('TNC_CREATE');
      tncPermission.push('TNC_UPDATE');
    } else if (tncPermission.includes('FUEL DETAILS_UPDATE') && tncPermission.includes('FLFC_UPDATE')
      && tncPermission.includes('INCREMENT_UPDATE') && tncPermission.includes('INSURANCE_UPDATE')
      && tncPermission.includes('SECURITY_UPDATE') && tncPermission.includes('NOTEPAD_UPDATE')) {
      tncPermission.push('TNC_UPDATE');
    }
    perList = perList.concat(tncPermission);
    this.authorizationService.setPermissions('BRANCH');
    perList = perList.concat(this.authorizationService.getPermissions('BRANCH'));
    this.authorizationService.setPermissions('SLA');
    perList = perList.concat(this.authorizationService.getPermissions('SLA'));
    this.authorizationService.setPermissions('VMI');
    perList = perList.concat(this.authorizationService.getPermissions('VMI'));
    this.authorizationService.setPermissions('BILLING');
    perList = perList.concat(this.authorizationService.getPermissions('BILLING'));
    this.authorizationService.setPermissions('COMMANDMENT');
    perList = perList.concat(this.authorizationService.getPermissions('COMMANDMENT'));
    this.permissionsService.loadPermissions(perList);


    this.isDisable = false;
    this.isDisableZm = false;
    this.acrouter.params.subscribe(params => {
      if (params['editflow']) { 
        this.editflow = params['editflow'];
        this.isDisable = true;
        this.isDisableZm = true;
      }
    });
    this.getMsa();
    this.getRateCardDetail();
    this.getOpportunityDetails();

  }
  msa:any;
  defaultBaseLocId:any;
  defaultableDataLocSearch:any=[];
  getMsa() {
    this.contractservice.getMsa(AppSetting.msaCustId)
      .toPromise()
      .then(
        success => {
          let ob = ErrorConstants.validateException(success);
          if (ob.isSuccess) {
            this.msa = success.data;
            for (let data of this.msa.responseData) { 
            if(data.baseLocation){
              let val={};
              val["baseLocnBranchName"]= data.baseLocation;
              val["baseLocnBranchId"] = data.baseLocationBranchId;
              this.defaultBaseLocId = data.baseLocationBranchId;
              this.defaultableDataLocSearch.push(val);
            }
          }
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

  businessType:any;
  businessTypeId:any;
  customerTypeId:any;
  getOpportunityDetails() {
    this.contractservice.getOportunity(AppSetting.oprtunityId,this.editflow).subscribe(opprResult => {

      this.opportunity.opportunityData = opprResult.data.responseData;
      this.minDate = this.opportunity.opportunityData.contract.effectiveDt;
      this.maxDate = this.opportunity.opportunityData.contract.expDt;

      var result = opprResult.data;
      this.businessTypeId= result.responseData.contract.lkpBizTypeId;
      this.customerTypeId = result.responseData.contract.cntrType;
      result.referenceData.businessTypeList.forEach(element => {
        if (element.id == result.responseData.contract.lkpBizTypeId) {
          this.businessType = element.lookupVal;
        }
      });
    },error=>{
      this.spinner.hide();
      this.tosterservice.error("Error in fetching opportunity");
    });
  }

  removeAllBranchIdsForCopy(data){
    for(let d of data){
      d.id=null;
     for(let child of d.branchPinCneeCnorMap){
      child.id=null;
     }
     d.ratecardId = this.model.id;
    }
  }
  getAssignBranchdata() {
    if(!this.model.id){
      this.tosterservice.error('No Rate Card Selected !!')
      this.six.close();
      this.spinner.hide();
      return
    }
    if(this.isCopyRateCard && this.isTncCopy){
      this.tosterservice.error('Tnc Not saved !!')
      this.six.close();
      this.spinner.hide();
      return
    }
    if(this.fbranch)this.fbranch.resetForm();
    this.spinner.show();
    let id;
    if(this.isCopyRateCard && this.isBranchCopy){
      id=this.copiedRcId;
    }else{
      id=this.model.id;
    }
    console.log('ratecardID :: ', id);
    this.contractservice.getAssignBranchDetail(id,this.editflow)
      .subscribe(
        success => {
          let ob = ErrorConstants.validateException(success);
        if(ob.isSuccess){
          this.spinner.hide();
          this.branchAssignModel = success.data.responseData;
          if(this.isCopyRateCard && this.isBranchCopy){
            this.tosterservice.info('Save To Copy All Branches !');
            this.removeAllBranchIdsForCopy(this.branchAssignModel);
          }
          this.branchAssignModel.assignBranch = success.data.responseData;
          this.branchAssignModel.assignBranch.forEach(obj => {
            obj['newBranch'] = false;
            obj['isValidBranchExpiryDt'] = false;
            obj['isValidBranchEffectiveDt'] = false;
          })
          this.oldAssignBranchList = JSON.parse(JSON.stringify(success.data.responseData));
          this.branchAssignModel.referenceList=success.data.referenceData;
          if (this.branchAssignModel) {
            if (this.branchAssignModel.length < 1) {
              this.branchAssignment();
            }
          }
        }else{
          this.tosterservice.error(ob.message);
          this.spinner.hide();
        }},
      error => {
        this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      });
  }

postBranch() {
  let postData = [];
  console.log('postData before validation',this.branchAssignModel);
  let isCCAddedInLastBranch=true;
  for(let data of this.branchAssignModel){
    if(data.bkngBranchId){
    if(this.validationChecksBr(data)){
      postData.push(data);
    }}
    if(data.branchPinCneeCnorMap.length==0){
      isCCAddedInLastBranch=false;
      break;
    }
  }
    if(isCCAddedInLastBranch){
      let inputData = this.deactivateOrphanBranchChild(postData);
      this.spinner.show();
      this.contractservice.postBranch(inputData,this.editflow,AppSetting.contractId)
      .subscribe(success => {
        let ob = ErrorConstants.validateException(success);
        if(ob.isSuccess){
        console.log(success.data.responseData, "branch status")
        this.tosterservice.success('Saved Successfully');
        this.isBranchCopy = false;
        this.six.close();
        this.first.close();
        this.seven.open();
        this.getSLAById();
      }else{
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }},
    error => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });}else{
      this.spinner.hide();
      let branchName:any;
      branchName = [];
      for(let brdata of this.branchAssignModel){
        if(brdata.branchPinCneeCnorMap.length==0){
          branchName.push(brdata.bkngBranchName);
        }
      }
      this.tosterservice.info('Please Map Customer Location For '+ branchName.toString());
    }
  
}

  deactivateOrphanBranchChild(newAssignBranchList): any {
    var inactiveStatus = 0;
    this.branchAssignModel.referenceList.statusList.forEach(element => {
      if (element.lookupVal === 'DELETED')
        inactiveStatus = element.id;
    });
    if (this.oldAssignBranchList.length > 0) {
      this.oldAssignBranchList.forEach(oldElement => {
        if (oldElement.branchPinCneeCnorMap && oldElement.branchPinCneeCnorMap.length > 0) {
          let deactivatedCneeCnorList = [];
          let i = null;
          for (let x = 0; x < newAssignBranchList.length; x++) {
            if (oldElement.id === newAssignBranchList[x].id) {
              oldElement.branchPinCneeCnorMap.forEach(oldCneeCnor => {
                var exists = false;
                newAssignBranchList[x].branchPinCneeCnorMap.forEach(newCneeCnor => {
                  if (oldCneeCnor.id === newCneeCnor.id) {
                    exists = true;
                  }
                });
                if (!exists && inactiveStatus > 0) {
                  oldCneeCnor.status = inactiveStatus;
                  deactivatedCneeCnorList.push(oldCneeCnor);
                  i = x;
                }
              });
            }
          }
          if (deactivatedCneeCnorList.length > 0 && i != null) {
            newAssignBranchList[i].branchPinCneeCnorMap = newAssignBranchList[i].branchPinCneeCnorMap.concat(deactivatedCneeCnorList);
          }
        }
      });

      // deactivating branch
      for (let old of this.oldAssignBranchList) {
        let isFound: boolean = false;
        for (let latest of newAssignBranchList) {
          if (latest.id) {
            if (old.id == latest.id) {
              isFound = true
            }
          }
        }
        if (!isFound) {
          old['status'] = inactiveStatus;
          if (old.id) {
            old.branchPinCneeCnorMap.forEach(oldCneeCnor => {
              oldCneeCnor.status = inactiveStatus;
            });
            newAssignBranchList.push(old);
          }
        }
      }
    }
    return newAssignBranchList;
  }
  
validationChecksBr(data){
  if(data.bkngBranchHoldFlag && !data.lkpBkngBranchHoldRsn){
    return false;
  }
  if(data.dlvryBranchHoldFlag && !data.lkpDlvryBranchHoldRsn){
      return false;
  }
  return true;
}

//branch assignment

onchangeReasonBkg(value){
  console.log(value);
  value.bkngBranchHoldFlag=1;}

  onchangeReasonDlvr(value){
    console.log(value);
    value.dlvryBranchHoldFlag=1;}

branchAssignment() {
  console.log("this.model.id",this.model.id);
  let assignBranch: any = {
    ratecardId:this.model.id,
    billableWghtFlag:0,
    bkngBranchHoldFlag:0,
    dlvryBranchHoldFlag:0,
    effectiveDt:this.model.effectiveDt,
    expDt:'',
    branchPinCneeCnorMap: [],
    newBranch: true,
    isValidBranchEffectiveDt: false,
    isValidBranchExpiryDt: false
  };
  if(!this.branchAssignModel)
    this.branchAssignModel=[];
  
  let isCCAddedInLastBranch=false;
  if(this.branchAssignModel.length>0){
    if(this.branchAssignModel[this.branchAssignModel.length-1].branchPinCneeCnorMap.length>0){
      isCCAddedInLastBranch=true;
    }
  }else{
    isCCAddedInLastBranch=true;
  }

    if(isCCAddedInLastBranch) {this.branchAssignModel.push(assignBranch);}else{
      this.tosterservice.info('Please Map Customer Location For ' +this.branchAssignModel[this.branchAssignModel.length-1].bkngBranchName);
    }
}

isValidflfcDate:boolean = false;
isValidIncrDate:boolean = false;
isValidInsuranceDate:boolean = false;

dateFormatEffective(field){
  let effYear = parseInt(this.datePipe.transform(field.effectiveDt, 'yyyy'))
    if (effYear > 9999) {
      field.effectiveDt = "";
    } else {
  field.effectiveDt = this.datePipe.transform(field.effectiveDt, 'yyyy-MM-dd')
  field.expDt = this.datePipe.transform(field.expDt, 'yyyy-MM-dd')

  if (field.effectiveDt < this.minDate || field.effectiveDt > field.expDt) {
    field.isValidBranchEffectiveDt = true;
  }
  else {
    field.isValidBranchEffectiveDt = false;
  }
  }
}

dateFormatExpiry(field){
  let expYear = parseInt(this.datePipe.transform(field.expDt, 'yyyy'))
    if (expYear > 9999) {
      field.expDt = "";
    } else {
  field.effectiveDt = this.datePipe.transform(field.effectiveDt, 'yyyy-MM-dd')
  field.expDt = this.datePipe.transform(field.expDt, 'yyyy-MM-dd')

  if (field.expDt < field.effectiveDt || field.expDt > this.maxDate) {
    field.isValidBranchExpiryDt = true;
  }
  else {
    field.isValidBranchExpiryDt = false;
  }
  }
}

flfcDate(modeltnc) {
  let flfcYear = parseInt(this.datePipe.transform(modeltnc.flfcAppcblDt, 'yyyy'))
    if (flfcYear > 9999) {
      modeltnc.flfcAppcblDt = "";
    } else {
  modeltnc.flfcAppcblDt = this.datePipe.transform(modeltnc.flfcAppcblDt, 'yyyy-MM-dd')
}
}
priceFound:boolean=false;
BaseFuelDate(modeltnc) {
  if(!modeltnc.baseFuelDt) return;
  let flfcYear = parseInt(this.datePipe.transform(modeltnc.baseFuelDt, 'yyyy'))
    if (flfcYear > 9999) {
      modeltnc.baseFuelDt = "";
    } else {
  modeltnc.baseFuelDt = this.datePipe.transform(modeltnc.baseFuelDt, 'yyyy-MM-dd')
  this.priceFound = false;
  this.modeltnc.fuelPrice=null;
  for(let fdata of this.fuelData){
    let date = this.datePipe.transform(fdata.fuelbaseDt, 'yyyy-MM-dd');
    if(modeltnc.baseFuelDt==date){
      this.priceFound = true;
      modeltnc.fuelPrice=fdata.fuelbasePrice;
      break;
    }
  }
  if(!this.priceFound){
    this.tosterservice.error('No Fuel Price Found !');
  }
}
}

incEffectiveDate(modeltnc) {
  let incYear = parseInt(this.datePipe.transform(modeltnc.incrEffectiveDt, 'yyyy'))
    if (incYear > 9999) {
      modeltnc.incrEffectiveDt = "";
    } else {
  modeltnc.incrEffectiveDt = this.datePipe.transform(modeltnc.incrEffectiveDt, 'yyyy-MM-dd')
  }
}

insuValidDate(modeltnc) {
  let insuYear = parseInt(this.datePipe.transform(modeltnc.insuValidUptoDt, 'yyyy'))
    if (insuYear > 9999) {
      modeltnc.insuValidUptoDt = "";
    } else {
  modeltnc.insuValidUptoDt = this.datePipe.transform(modeltnc.insuValidUptoDt, 'yyyy-MM-dd')
  }
}


  // for select

  isExpanded
  expand() {
    this.isExpanded = !this.isExpanded;
  }

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Commercial Level' },

  ];
  isZoneMatrixFound:any;
  rcCmdLevel:any;
  //***ratecard detail
  ratecardDeailbyId(item,isCopyRateCard){
  this.isZoneMatrixFound = false;
   if(this.editflow){
    this.isDisable = true;
    this.isDisableZm = true;
   }else{
    this.isDisable = false;
    this.isDisableZm = false;
   }
   if(!isCopyRateCard){
    this.isCopyRateCard= false;
    this.isFCopyRc = false;
    this.isCopyRc = false;
    this.isCommercialCopy = false;
    this.isCommandmentCopy = false;
    this.isBranchCopy = false;
    this.isSlaCopy = false;
    this.isRCCopyDone = false;
    this.isVmiCopy = false;
    this.isTncCopy = false;
   }
   if(this.isCopyRateCard){
    this.isDisableZm = false;
   }
   this.isValidStartDt= false;
   this.isValidEndDt = false;
   this.isValidSignDt = false;
   for(let data of this.rateCardDetails){
     console.log(data, "print data")
    if(data.id==item.id){
      this.model=data
      this.RateCardName = '('+data.rateCardCode+')';
      for(let zone of this.zoneMatrix){
        if(zone.id==this.model.zoneMtxId)
          {
            this.isZoneMatrixFound=true;
            break;
          }
      }
      if(!this.isZoneMatrixFound){
        this.tosterservice.info('Zone Matrix Inactive. Please Map new Zone Matrix .')
      }
      for(let off of this.offerings){
        if(off.id==this.model.offeringId){
          let str = off.serviceOffering.toLowerCase();
         this.serviceOfferingName = str[0].toUpperCase() + str.slice(1);
         this.serviceOfferingName = '('+this.serviceOfferingName+')';
        }
      }
      {
        let e = new Date(this.model.expDt);
        e.setDate(e.getDate()-1);
        this.maxdateRCStart = e;
        }
        {
          let e = new Date(this.model.effectiveDt);
          e.setDate(e.getDate()+1);
          this.mindateRCExp = e;
          }
      let val={};
      this.tableDataLocSearch = [];
      val["baseLocnBranchName"]= data.baseLocnBranchName;
      val["baseLocnBranchId"] = data.baseLocnBranchId;
      this.tableDataLocSearch.push(val);
      if(this.isRCCopyDone){
        this.tosterservice.info('Save To Copy RC Details ! ');
        this.copiedRateCardModel = JSON.parse(JSON.stringify(data));
        this.model.rateCardCode=null;
        console.log(this.model.rateCardCode, 'model.ratecardCode')
        this.model.id=null;
        this.initialZmMatrix = this.model.zoneMtxId;
      }
      if (this.first.expanded) {
        this.first.close();
        this.second.open();
      } else {
        this.second.open();
      }
      this.getAllStatesList();
      this.rcCmdLevel= JSON.parse(JSON.stringify(this.model.cmdmntLevel));
    }

   }
  }

  initialZmMatrix:number;
  isZmChange:boolean=false;
  changeZoneMatrix(){
     this.first.close();
      if(this.model.zoneMtxId!=this.initialZmMatrix){
        this.isZmChange=true;
      }else{
        this.isZmChange=false;
      }
  }

  zoneMatrix = []
  offerings = []
  rateCardDetails=[]
  originalRCList=[];
  onRCPageLaunch = true;
  getRateCardDetail() {
    this.rateCardDetails=[];
    this.originalRCList=[];
    this.offerings = [];
    this.zoneMatrix = [];
    this.selectedId='';
    this.selectedIdcmd='';
     this.spinner.show();
     this.isCommercialCopy = false;
     this.isCommandmentCopy = false;
     this.isBranchCopy = false;
     this.isSlaCopy = false;
     this.isRCCopyDone = false;
     this.isVmiCopy = false;
     this.isTncCopy = false;
     this.isCopyRateCard= false;
     this.isFCopyRc = false;
     this.isCopyRc = false;
     if(this.second)this.second.close();
     if(this.third)this.third.close();
     if(this.four)this.four.close();
     if(this.five)this.five.close();
     if(this.six)this.six.close();
     if(this.seven)this.seven.close();
     if(this.eight)this.eight.close();
     this.clearAllRateCardPageForms();
    this.contractservice.getRateCardDetail(AppSetting.contractId,this.editflow)
      .subscribe(success => {
        let ob = ErrorConstants.validateException(success);
        if(ob.isSuccess){
        this.carddetail = success.data.responseData;
        console.log(this.carddetail, 'carddetails')
         this.spinner.hide();
        for (var item of this.carddetail) {
          item["showRctoggle"] = false;
          item["baseLocnBranchName"]= item.baseLocnBranchName;
          item["baseLocnBranchId"] = item.baseLocnBranchId;
                    this.rateCardDetails.push(item)
                  }
        this.rateCardDetails.sort((a, b) => a.id - b.id); 
        for (var item of success.data.referenceData.zoneMatrixList) {
          this.zoneMatrix.push(item)
        }      
        if(this.rateCardDetails.length==1 && this.onRCPageLaunch){
          this.ratecardDeailbyId(this.rateCardDetails[0],false)
          this.first.open();
          this.onRCPageLaunch = false;
          }

        this.originalRCList = JSON.parse(JSON.stringify(this.rateCardDetails));
        for (var item of success.data.referenceData.offerings) {
             console.log(item, "offering");
          this.offerings.push(item)
        }
        for(let off of this.offerings){
          if(off.id==this.model.offeringId){
            let str = off.serviceOffering.toLowerCase();
           this.serviceOfferingName = str[0].toUpperCase() + str.slice(1);
           this.serviceOfferingName = '('+this.serviceOfferingName+')';
          }
        }
        if(this.offerings.length==1){
          this.model.offeringId = this.offerings[0].id;
        }
        this.getAllStatesList();
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
  offeringId
  selectOffering(data){
    this.offeringId = null
    data.id=this.offeringId
}
copiedRcId;
copiedRateCardModel;
oldCommercialIdList=[]
newCommercialIdList=[]
isCommercialCopy = false;
isCommandmentCopy = false;
isRCCopyDone = false;
isBranchCopy = false;
isSlaCopy = false;
isVmiCopy = false;
isTncCopy = false;
showCommercialData:boolean = false;
isFCopyRc:boolean;
isCopyRc:boolean;
isCopyRateCard:boolean;

isRcToggle:boolean = false;
  toggleCopyRc(data) {

    event.stopPropagation();
    
    for(let rcDetails of this.rateCardDetails){
      if(data.id !== rcDetails.id)
        rcDetails.showRctoggle = false;
    }
    if (!data.showRctoggle) {
      
      data.showRctoggle = true;
      this.isRcToggle = true;
    } else {
      data.showRctoggle = false;
    }
  }



  clickBodyElem(event) {
    this.isRcToggle = false;
    this.baseLocationError=false;
   }

  copyRateCard(data, copyType) {
    event.stopPropagation();
    this.isCommercialCopy = true;
    this.isCommandmentCopy = true;
    if(!(this.businessType=='ANYWHERE TO ANYWHERE')){this.isBranchCopy = true;}
    this.isSlaCopy = true;
    this.isRCCopyDone = true;
    this.isVmiCopy = true;
    this.isTncCopy = true;
    this.oldCommercialIdList = []
    this.newCommercialIdList = []
    if (copyType === 'FCP') {
      this.isCopyRateCard= true;
      this.isFCopyRc = true;
      this.isCopyRc = false;
    } else if (copyType === 'CP') {
      this.isCopyRateCard= true;
      this.isFCopyRc = false;
      this.isCopyRc = true;
    }
    this.copiedRcId = data.id;
    this.ratecardDeailbyId(data,this.isCopyRateCard);
  }

putRatecard(data){
  event.stopPropagation();


  const dialogRefEdit = this.dialog.open(confimationdialog,{

    data:{message:"Rate card would be permanently deleted.Are you sure you want to delete RateCard: "+data.rateCardCode+" ?"},
        disableClose: true,
        panelClass: 'creditDialog',
        width: '300px'
      });

  dialogRefEdit.afterClosed().subscribe(result => {
    if(result){
      let id = data.id;
      this.spinner.show();
      console.log(data);
      this.contractservice.putRateCardDetail(data,this.editflow)
      .subscribe(success => {
        let ob = ErrorConstants.validateException(success);
          if(ob.isSuccess){
        this.getRateCardDetail()
      }else {
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }
    },
      error => {
        this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      });
    }
    console.log('The dialog was closed with pinocde ' ,result);
  });

}

  updateExpirydateForOldRC(data){
    let y = new Date(this.model.effectiveDt);
    y.setDate(y.getDate()-1);
    data.expDt = this.datePipe.transform(y, 'yyyy-MM-dd');
    this.contractservice.postRateCardDetail(data,this.editflow)
      .subscribe(success => {
        let ob = ErrorConstants.validateException(success);
        if(ob.isSuccess){
        let id = success.data.responseData
      }else {
          this.tosterservice.error(ob.message);
          this.spinner.hide();
        }
      },
        error => {
          this.tosterservice.error(ErrorConstants.getValue(404));
          this.spinner.hide();
        });
  }
  rateCardId
  checkForDuplicateRateCard(id,offid,zmxid,effectiveDt){
    if(this.isFCopyRc){
      return true;
    }
    let isNotDuplicateRc = true;
    var x = new Date(effectiveDt);
    for(let item of this.originalRCList){
        var y = new Date(item.expDt);
        if(item.offeringId==offid && item.zoneMtxId==zmxid && !(item.id==id) && x<y){
          this.tosterservice.error('Active Rate Card For Zone matrix and Offering already exists !!')
          this.spinner.hide();
          isNotDuplicateRc=false;
          break;
        }
    }
    return isNotDuplicateRc;
  }
  postRateCardDetail(type) {
    this.spinner.show();
    var data = {     
      "baseLocnBranchId": this.model.baseLocnBranchId,
      "cmdmntLevel": this.model.cmdmntLevel,
      "cntrId": AppSetting.contractId,
      "descr": this.model.descr,
      "effectiveDt": this.datePipe.transform(this.model.effectiveDt, 'yyyy-MM-dd'),
      "expDt": this.datePipe.transform(this.model.expDt, 'yyyy-MM-dd'),
      "rateCardSignDt": this.model.rateCardSignDt,
      "offeringId": this.model.offeringId,
      "rateCardCode": this.model.rateCardCode,
      "serviceOffering": this.model.serviceOffering,
      "status": this.model.status,
      "zoneMtxId": this.model.zoneMtxId,
      "id":0
    };
    if(this.model.id){data.id=this.model.id;}
    // if(this.checkForDuplicateRateCard(this.model.id,this.model.offeringId,this.model.zoneMtxId,this.model.effectiveDt)){
    {
    this.contractservice.postRateCardDetail(data,this.editflow)
      .subscribe(success => {
        let ob = ErrorConstants.validateException(success);
        if(ob.isSuccess){
        if(this.isFCopyRc && this.isRCCopyDone){
        this.updateExpirydateForOldRC(this.copiedRateCardModel);
        }
        if(this.isCopyRateCard){
          this.isRCCopyDone = false;
        }
        this.tosterservice.success('Saved Successfully');
        let id = success.data.responseData
        this.rateCardId = id;
        this.model.id = id;
        this.model.rateCardCode = 'RC'+id;
        this.RateCardName = '('+this.model.rateCardCode+')';
        this.rcCmdLevel= JSON.parse(JSON.stringify(this.model.cmdmntLevel));
        for(let off of this.offerings){
          if(off.id==this.model.offeringId){
            let str = off.serviceOffering.toLowerCase();
           this.serviceOfferingName = str[0].toUpperCase() + str.slice(1);
           this.serviceOfferingName = '('+this.serviceOfferingName+')';
          }
        }
        if(type=='continue'){
            this.second.close();
            this.four.close();
            this.third.open();
            this.getCommercialDetail(false);
        }
        else if(type=='save'){
          this.ratecard.resetForm();
          this.getRateCardDetail();
          this.changeState1();
        }

      }else {
          this.tosterservice.error(ob.message);
          this.spinner.hide();
        }
      },
        error => {
          this.tosterservice.error(ErrorConstants.getValue(404));
          this.spinner.hide();
        }); 
   } 
  }
  //***commercial details
  customRateGroup() {
    let zmCP = new ZmCustomPrice();
    zmCP.deleteicon=true;
    this.CommercialDataModel.zmCustomPrice.push(zmCP);
  }

  deleteCustomRM(field,i){
    this.CommercialDataModel.zmCustomPrice.splice(i,1);
  }

  //add row at safextension addDelivery 
  private customDilivery: Array<any> = [];
  private newAttribute2: any = {
    "fromId": 0,
    "id": 0,
    "lkpDestTypeId": 0,
    "minAmt": 0,
    "price": 0
  };

  addCustomDelivery() {
    let item = new SafextDlvryCustomCharge()
    item.lkpDestTypeId= this.CommercialDataModel.safeextTypeFlag;
    item.deleteicon = true;
    this.CommercialDataModel.safextDlvryCustomCharge.push(item);
  }
  deleteSfxDlvrCusMP(i){
    this.CommercialDataModel.safextDlvryCustomCharge.splice(i,1);
  }
  //add row at safextension booking master
  private customBooking: Array<any> = [];
  private newAttribute3: any = {
    "id": 0,
    "lkpSrcTypeId": 0,
    "minAmt": 0,
    "price": 0,
    "toId": 0
  };


  addCustomBooking() {
    let item = new SafextBkngCustomCharge()
    item.lkpSrcTypeId= this.CommercialDataModel.safeextTypeFlag;
    item.deleteicon = true;
    this.CommercialDataModel.safextBkngCustomCharge.push(item);
  }

  deleteSfxBkngCusM(field,i){
    this.CommercialDataModel.safextBkngCustomCharge.splice(i,1)
  }

  addsafexBookingCharges() {

    let isType:string;
    let isTypeId:number;
    let contains:boolean;
    for(let i of this.CommercialDataModel.safextCharge){
      if(i.safextCtgy=='BOOKING'){
        contains = true
        break;
      }
    }
      for(let slid of this.ReferenceDataModel.safexLevelList){
        if(slid.id == this.CommercialDataModel.safeextTypeFlag){
          isType=slid.lookupVal;
          isTypeId=slid.id;
        }
      }
    if(this.CommercialDataModel.id && this.CommercialDataModel.safextFlag && this.CommercialDataModel.safextCharge.length>0){
     
      
      if (isType == 'PINCODE') {
        if (this.CommercialDataModel.safextCharge[0].lkpSafextLevelId == isTypeId && contains) {
          for (let item of this.CommercialDataModel.safextCharge) {
            for (let data of this.ReferenceDataModel.safexTypeList) {
              if(data.id===item.safextEntityId)
                item["groupName"]=data.lookupVal;
            }
          }
        }else{
          this.createFreshSafexChargeBkg(isType);
        }
      }
      if (isType == 'STATE') {
        if (this.CommercialDataModel.safextCharge[0].lkpSafextLevelId == isTypeId && contains) {
          for (let item of this.CommercialDataModel.safextCharge) {
            for (let data of this.ReferenceDataModel.stateTypeList) {
              if(data.id===item.safextEntityId)
                item["groupName"]=data.lookupVal;
            }
          }
        }else{
          this.createFreshSafexChargeBkg(isType);
        }
      }
    }else{
      if(this.CommercialDataModel.bookingFlag)this.createFreshSafexChargeBkg(isType);
      if(!this.successDataForCommer)this.createFreshSafexChargeBkg(isType);
  }
}


createFreshSafexChargeBkg(isType){

    let arr = this.CommercialDataModel.safextCharge;
    for( var i = 0; i < arr.length; i++){ 
      if ( arr[i].safextCtgy === 'BOOKING' ) {
        arr.splice(i, 1); 
        i--;
      }
   }
    if (isType == 'PINCODE') {
      for (let data of this.ReferenceDataModel.safexTypeList) {
        let safextC = new SafextCharge();
        safextC.safextCtgy = "BOOKING"
        safextC.lkpSafextLevelId = this.CommercialDataModel.safeextTypeFlag;
        safextC.safextEntityId = data.id;
        safextC["groupName"] = data.lookupVal
        this.CommercialDataModel.safextCharge.push(safextC);
      }
    } else { 
      for (let data of this.ReferenceDataModel.stateTypeList) {
        let safextC = new SafextCharge();
        safextC.safextCtgy = "BOOKING"
        safextC.lkpSafextLevelId = this.CommercialDataModel.safeextTypeFlag;
        safextC.safextEntityId = data.id;
        safextC["groupName"] = data.lookupVal;
        this.CommercialDataModel.safextCharge.push(safextC);
      }
    }
}
  
  pricingParamData(reloadFlag){
    if(this.CommercialDataModel.id && this.CommercialDataModel.pricingParamTrans.length>0 && !reloadFlag){

      for(let data of this.CommercialDataModel.pricingParamTrans){
        for(let pp of this.ReferenceDataModel.pricingParam){
          if(pp.priceParameterResponseDTO && data.pricingParamId===pp.priceParameterResponseDTO.id){
            data.pricingLabel = pp.priceParameterResponseDTO.pricingLabel;
            for(let atr of this.ReferenceDataModel.attrTypeList){
              if(atr.id=== pp.priceParameterResponseDTO.attributeTypeId){
                data.attrName = atr.lookupVal
              }
              if(pp.priceParameterResponseDTO.attrVal){
                data.pricingParamValArr= pp.priceParameterResponseDTO.attrVal.split(",").map(Number);}
          if(data.pricingParamValArr && data.pricingParamValArr.length>0 ){
                      data.attributeList =[];
                    data.pricingParamValArr.forEach(element => {
                      this.ReferenceDataModel.pricingCalculationTypeList.forEach(element1 => {
                        if(element===element1.id){
                          data.attributeList.push(element1);
                        }
                      });
                    });}
            }
          }
        }

        for(let type of this.ReferenceDataModel.pricingCalculationTypeList){
          if(type.id===data.lkpPricingCalcTypeId){
            data.calTypeName= type.lookupVal;
          }
        }
        for(let unit of this.ReferenceDataModel.pricingCalculationUnitList){
          if(unit.id=== data.lkpCalcUnitId){
            data.calUnitName = unit.lookupVal
          }
        }
      //   for(let ppData of this.ReferenceDataModel.pricingParam){
          
      // }
      this.changeRRFlagPPEdit(data.rrFlag,data);

    }
      console.log("this.CommercialDataModel.pricingParamTrans", this.CommercialDataModel.pricingParamTrans);
    } else{
      this.CommercialDataModel.pricingParamTrans = [];
     
      for(let data of this.ReferenceDataModel.pricingParam){
        if (data.priceParameterResponseDTO && data.priceParameterResponseDTO.priceCalculationTypeId.split(",").map(Number).includes(this.CommercialDataModel.lkpChrgById)) {
        let priceP = new PricingParamTrans();
        priceP.rrFlag = data.priceParameterResponseDTO.rrFlag;
        priceP.pricingLabel = data.priceParameterResponseDTO.pricingLabel;
        if(data.priceParameterResponseDTO.attrVal){
        priceP.pricingParamValArr= data.priceParameterResponseDTO.attrVal.split(",").map(Number);
        }
        if(priceP.pricingParamValArr && priceP.pricingParamValArr.length>0 ){
          priceP.attributeList =[];
        priceP.pricingParamValArr.forEach(element => {
          this.ReferenceDataModel.pricingCalculationTypeList.forEach(element1 => {
            if(element===element1.id){
              priceP.attributeList.push(element1);
            }
          });
        });}
        priceP.pricingParamId = data.priceParameterResponseDTO.id
        priceP.lkpCalcUnitId = data.priceParameterResponseDTO.priceCalculationUnitId;
        priceP.lkpPricingCalcTypeId = this.CommercialDataModel.lkpChrgById;
        if(data.pricingParamRrs.length>0){
        priceP.rrVal = data.pricingParamRrs[0].rrValue;
        priceP.attributeValue = data.pricingParamRrs[0].attributeValue;
      }
        if(priceP.rrFlag && priceP.rrVal){
          priceP.pricingParamVal = priceP.rrVal.toString();
        }
        for(let type of this.ReferenceDataModel.pricingCalculationTypeList){
          data.priceParameterResponseDTO.priceCalculationTypeId.split(",").map(Number).forEach(element => {
            if(type.id===element){
              priceP.calTypeName= type.lookupVal;
            }});}
        for(let unit of this.ReferenceDataModel.pricingCalculationUnitList){
          if(unit.id=== data.priceParameterResponseDTO.priceCalculationUnitId){
            priceP.calUnitName = unit.lookupVal
          }
        }
        for(let atr of this.ReferenceDataModel.attrTypeList){
          if(atr.id=== data.priceParameterResponseDTO.attributeTypeId){
            priceP.attrName = atr.lookupVal
          }
        }
        this.changeRRFlagPP(priceP.rrFlag,priceP);
        this.CommercialDataModel.pricingParamTrans.push(priceP);
      }}
    }

  }

  addsafexDeliveryCharges() {
    if(this.successDataForCommer){
        this.CommercialDataModel.safextCharge = this.successDataForCommer.safextCharge;
    }
    let isType:string;
    let isTypeId:number;
    let contains:boolean;
    for(let i of this.CommercialDataModel.safextCharge){
      if(i.safextCtgy=='DELIVERY'){
        contains = true
        break;
      }
    }
      for(let slid of this.ReferenceDataModel.safexLevelList){
        if(slid.id == this.CommercialDataModel.safeextTypeFlag){
          isType=slid.lookupVal;
          isTypeId=slid.id;
        }
      }
    if(this.CommercialDataModel.id && this.CommercialDataModel.safextFlag && this.CommercialDataModel.safextCharge.length>0){  
      if (isType == 'PINCODE') {
        if (this.CommercialDataModel.safextCharge[0].lkpSafextLevelId == isTypeId && contains) {
          for (let item of this.CommercialDataModel.safextCharge) {
            for (let data of this.ReferenceDataModel.safexTypeList) {
              if(data.id===item.safextEntityId)
                item["groupName"]=data.lookupVal;
            }
          }
        }else{
          this.createFreshSafexChargeDlvr(isType);
        }
      }
      if (isType == 'STATE') {
        if (this.CommercialDataModel.safextCharge[0].lkpSafextLevelId == isTypeId && contains) {
          for (let item of this.CommercialDataModel.safextCharge) {
            for (let data of this.ReferenceDataModel.stateTypeList) {
              if(data.id===item.safextEntityId)
                item["groupName"]=data.lookupVal;
            }
          }
        }else{
          this.createFreshSafexChargeDlvr(isType);
        }
      }
    }else{
      if(this.CommercialDataModel.deliveryFlag)this.createFreshSafexChargeDlvr(isType);
      if(!this.successDataForCommer)this.createFreshSafexChargeDlvr(isType);
  }
}
  createFreshSafexChargeDlvr(isType){
    let arr = this.CommercialDataModel.safextCharge;
    for( var i = 0; i < arr.length; i++){ 
      if ( arr[i].safextCtgy === 'DELIVERY' ) {
        arr.splice(i, 1); 
        i--;
      }
   }
        if (isType == 'PINCODE') {
          for (let data of this.ReferenceDataModel.safexTypeList) {
            let safextC = new SafextCharge();
            safextC.safextCtgy = "DELIVERY"
            safextC.lkpSafextLevelId = this.CommercialDataModel.safeextTypeFlag;
            safextC.safextEntityId = data.id;
            safextC["groupName"] = data.lookupVal
            this.CommercialDataModel.safextCharge.push(safextC);
          }
        } else { 
          for (let data of this.ReferenceDataModel.stateTypeList) {
            let safextC = new SafextCharge();
            safextC.safextCtgy = "DELIVERY"
            safextC.lkpSafextLevelId = this.CommercialDataModel.safeextTypeFlag;
            safextC.safextEntityId = data.id;
            safextC["groupName"] = data.lookupVal;
            this.CommercialDataModel.safextCharge.push(safextC);
          }
        }
  }
  private zonalrategroup: Array<any> = [];
  private zonalrategroupAttribute: any = {
    "commercialId": 0,
      "id": 0,
      "price": 0,
      "slabFrom": 0,
      "slabTo": 0,
      "zmRgMapId": 0,
      "name":"string"
  };
zonalRateGroup(){

  for (let item of this.ReferenceDataModel.rateGroupList) {
    this.zonalrategroupAttribute.zmRgMapId = item.id
    this.zonalrategroupAttribute.price = item.price
    this.zonalrategroupAttribute.name=item.name
    this.zonalrategroup.push(Object.assign({}, this.zonalrategroupAttribute))
console.log(this.zonalrategroup,"zonalrate group")

  }

}


  oldCommerIdForCmdCopy:any;
  isCommandmentAlreadyExist:any=false;
  getCommercialDetail(callFromCmdmnt) {
    this.selectedId='';
    if(!this.model.id){
      this.tosterservice.error('No Rate Card Selected !!')
      this.third.close();
      this.spinner.hide();
      return
    }
    let id;
    if(this.isCopyRateCard && this.isCommercialCopy){
      id=this.copiedRcId;
    }else{
      id=this.model.id; 
    }
    this.showCommercialData=false;
    this.spinner.show();
     this.contractservice.getCommercialDetail(id,this.editflow)
      .subscribe(success => {
        let ob = ErrorConstants.validateException(success);
        if(ob.isSuccess){
        this.commercial = success.data.responseData;
        console.log(this.commercial, 'print commercial surface')
          if (callFromCmdmnt) {
            if (this.commercial.length == 0 && this.rcCmdLevel == "COMMERCIAL LEVEL") {
              this.tosterservice.error('No Commercial exists !!')
              this.four.close();
              this.spinner.hide();
              return
            }
            if (this.commercial_id) {this.getCommandmentDetailbyId(this.commercial_id)}else{
              this.spinner.hide();
            }
          }
        if(this.isCopyRateCard && !this.isCommercialCopy){
          this.commercial = this.commercial.concat(this.oldCommercialIdList);
        }
          if(this.isCopyRateCard && this.isCommercialCopy && this.commercial.length==0){
            this.tosterservice.info("No Commercials To Copy ");
            this.third.close();
            {
              this.third.close();
              this.four.open();
              this.isCommercialCopy=false;
              this.opencmdmnt();
            }
          }
          this.commercial.sort((a, b) => a.id - b.id);
          for (let comm of this.commercial){
            if(this.isCopyRateCard && this.isCommercialCopy){
              comm["oldComm"]=true;
              this.oldCommercialIdList.push(comm);
            }
            if(!this.isCopyRateCard){
              comm["oldComm"]=false;
            }
            for (let ref of success.data.referenceData.chargeByList) {
              console.log(ref, 'print chargebyname')
              if (comm.lkpChrgById == ref.id) {
                comm["chargeByName"] = ref.lookupVal;
              }
            }
            if (comm.lkpPackTypeId) {
              for (let ref of success.data.referenceData.packagingTypeList) {
                console.log(ref, 'print reference value')
                if (comm.lkpPackTypeId == ref.id) {
                  comm["packageName"] = ref.lookupVal;
                }
              }
            } else{
              comm["packageName"] = '';
            }
            // product category
            if (comm.prdctCtgyId) {
              for (let ref of success.data.referenceData.productCategoryList) {
                console.log(ref, 'print product category')
                if (comm.prdctCtgyId == ref.id) {
                  comm["prdctCtgy"] = ref.prdctCtgy;
                }
              }
            } else{
              comm["prdctCtgy"] = '';
            }
      }
      if(this.isCopyRateCard){
        if(this.oldCommercialIdList.length>0){
          this.oldCommerIdForCmdCopy =this.oldCommercialIdList[0].id;
          this.getCommercialDetailbyId(this.oldCommerIdForCmdCopy);
        }
        if(this.oldCommercialIdList.length==0){
          this.spinner.hide();
        }
      }else{
        if(callFromCmdmnt){}else{
        this.spinner.hide();
        }
      }
      if(this.rcCmdLevel=="RATECARD LEVEL"){this.checkCommandmentCount();}
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
  checkCommandmentCount() {
    let serviceOfferingId ;
    for (let data of this.offerings) {
      if (data.id == this.model.offeringId) {
        serviceOfferingId = data.serviceOfferingId
      }
    }
    this.contractservice.getCommandmentDetail('RATECARD', this.model.id, serviceOfferingId, this.businessTypeId, this.customerTypeId, this.editflow)
      .subscribe(resultData => {
        let ob = ErrorConstants.validateException(resultData);
        console.log(resultData);
        if (ob.isSuccess) {
          if(resultData.data.responseData.length>0)
            this.isCommandmentAlreadyExist = true;
        }else{
          this.isCommandmentAlreadyExist = false;
        }
      },
        error => {
          this.spinner.hide();
        });
    // error => { }
  }
  createDlvrBkgList(){
    if(this.successDataForCommer && this.successDataForCommer.safextCharge.length>0){
      this.getListPinState();

    }else{
      let isType:string
      for(let slid of this.ReferenceDataModel.safexLevelList){
        if(slid.id == this.CommercialDataModel.safeextTypeFlag){
          isType=slid.lookupVal;
          //isTypeId=slid.id;
        }
      }
      this.createFreshSafexChargeDlvr(isType);
      this.createFreshSafexChargeBkg(isType);
    }
  }

  getListPinState(){

    let isType:string;
    for(let slid of this.SuccessDataRef.safexLevelList){
      if(slid.id == this.CommercialDataModel.safeextTypeFlag){
        isType=slid.lookupVal;
        this.CommercialDataModel.safeextTypeName = slid.lookupVal;
      }
    }

    if(this.successDataForCommer && this.successDataForCommer.safextCharge.length>0){
      if(!(this.successDataForCommer.safextCharge[0].lkpSafextLevelId==this.CommercialDataModel.safeextTypeFlag)){
        // clear everything
          this.CommercialDataModel.safextCharge = [];
          if(this.CommercialDataModel.deliveryFlag){
            this.CommercialDataModel.safextDlvryCustomCharge=[]
          }
          if(this.CommercialDataModel.bookingFlag){
            this.CommercialDataModel.safextBkngCustomCharge=[]
          }
          this.createFreshSafexChargeDlvr(isType);
          this.createFreshSafexChargeBkg(isType);
        return;
      }else{
        this.CommercialDataModel.safextCharge = [];
        this.CommercialDataModel.safextCharge = this.successDataForCommer.safextCharge;
        if(this.CommercialDataModel.deliveryFlag){
          this.CommercialDataModel.safextDlvryCustomCharge=this.successDataForCommer.safextDlvryCustomCharge
          for(let sfxDlvr of this.CommercialDataModel.safextDlvryCustomCharge){
            if(sfxDlvr.lkpDestTypeId!=this.sfxPincodeTypeId){
              sfxDlvr.stateNamesfrom = this.covertStateIdToStateName(sfxDlvr.fromId);
            }
          }
        }
        if(this.CommercialDataModel.bookingFlag){
          this.CommercialDataModel.safextBkngCustomCharge=this.successDataForCommer.safextBkngCustomCharge
          for(let sfxbkg of this.CommercialDataModel.safextBkngCustomCharge){
            if(sfxbkg.lkpSrcTypeId!=this.sfxPincodeTypeId){
              sfxbkg.stateNamesto = this.covertStateIdToStateName(sfxbkg.toId);
            }
          }
        }
        if (this.CommercialDataModel.slabFlag && this.CommercialDataModel.safextFlag) {
          if (this.successDataForCommer.safextBkngCustomCharge.length > 0) {
            this.editSafextBkngCustomCharge(this.successDataForCommer)
          }
          if (this.successDataForCommer.safextDlvryCustomCharge.length > 0) {
            this.editSafextDlvryCustomCharge(this.successDataForCommer)
          }

        }
      }
    }

    if (this.CommercialDataModel.slabFlag && this.CommercialDataModel.safextFlag && this.successDataForCommer) {
        if(this.successDataForCommer.safextCharge.length>0){
          this.editSafextCharge(this.successDataForCommer);
      }
    } else {
      
      this.addsafexDeliveryCharges();
      this.addsafexBookingCharges();
    }
    }
  

  //for addr Type
  stateAddr
  stateMap:any;
  cityMap:any;
  defaultFlag = true
  getAllStatesList() {
    this.contractservice.getAddrByState()

      .subscribe(success => {
        this.spinner.hide();
        this.stateAddr = success.data.responseData;
        this.stateMap = new Map();
        this.stateAddr.forEach((ele) => {
        ele.id = ele.id.toString()
        this.stateMap.set(ele.id,ele.stateName);
      });
        
        console.log(this.stateAddr, "state")
      },
        error => {
          this.spinner.hide();
        });
    // error => { }

  }

  addrByaddrType(from, field, isChange) {

    let srcType: string;
    let lkUpid: number;
    if (from == 'src') {
      lkUpid = field.lkpSrcTypeId;
    } else {
      lkUpid = field.lkpDestTypeId;
    }
    for (let data of this.ReferenceDataModel.srcDestList) {
      if (data.id == lkUpid) {
        srcType = data.lookupVal;
      }
    }
    if (from == 'src') {
      field['lkpSrcTypeName'] = srcType
    } else {
      field['lkpDestTypeName'] = srcType
    }
    if(srcType=='STATE' && from == 'src'){
      if(field.srcId){
        field.stateNamesfrom = this.covertStateIdToStateName(field.srcId);
      }
    }
    if(srcType=='STATE' && from == 'desc'){
      if(field.destId){
        field.stateNamesto = this.covertStateIdToStateName(field.destId );
      }
    }
    if(srcType=='CITY' && from == 'src'){
      if(field.srcId){
        field.cityNamesfrom = this.covertCityIdToCityName(field.srcId);

      }
    }
    if(srcType=='CITY' && from == 'desc'){
      if(field.destId){
        field.cityNamesto = this.covertCityIdToCityName(field.destId);

      }
    }

    // clearing all values from 
    if (isChange) {
      if (from == 'src') {
        if (field.hasOwnProperty('fromId')) {
          field.fromId = null;
        }
        if (field.hasOwnProperty('srcId')) {
          field.srcId = null;
        }
        if (field.hasOwnProperty('safextSrcId')) {
          field.safextSrcId = null;
        }
      } else {
        if (field.hasOwnProperty('destId')) {
          field.destId = null;
        }
        if (field.hasOwnProperty('toId')) {
          field.toId = null;
        }
        if (field.hasOwnProperty('safextDestId')) {
          field.safextDestId = null;
        }
      }
    }
  }

  index = 1
  trackByIndex(index: number, obj: any): any {
    return index;
  }


  createCustomRatePriceforSlab(arr){

    for(let zmp of this.CommercialDataModel.zmCustomPrice){
      if(this.CommercialDataModel.ZonalSlabCounter==1){
        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = 99999
        arr.push(zmp);
      }
      else if(this.CommercialDataModel.ZonalSlabCounter==2){
        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = this.zmslabto1
        arr.push(zmp);
        let zm2 = new ZmCustomPrice();
        zm2.slabFrom = this.zmslabfrom2;
        zm2.slabTo = 99999;
        zm2.minFreight = zmp.minFreight2;
        zm2.price = zmp.price2;
        zm2.lkpDestTypeId = zmp.lkpDestTypeId;
        zm2.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm2.srcId = zmp.srcId
        zm2.destId = zmp.destId
        if(zmp.id2){
          zm2.id = zmp.id2;
        }
        arr.push(zm2);
      }
      else if(this.CommercialDataModel.ZonalSlabCounter==3){
        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = this.zmslabto1
        arr.push(zmp);
        let zm2 = new ZmCustomPrice();
        zm2.slabFrom = this.zmslabfrom2;
        zm2.slabTo = this.zmslabto2;
        zm2.minFreight = zmp.minFreight2;
        zm2.price = zmp.price2;
        zm2.lkpDestTypeId = zmp.lkpDestTypeId;
        zm2.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm2.srcId = zmp.srcId
        zm2.destId = zmp.destId
        if(zmp.id2){
          zm2.id = zmp.id2;
        }
        arr.push(zm2);
        let zm3 = new ZmCustomPrice();
        zm3.slabFrom = this.zmslabfrom3;
        zm3.slabTo = 99999;
        zm3.minFreight = zmp.minFreight3;
        zm3.price = zmp.price3;
        zm3.lkpDestTypeId = zmp.lkpDestTypeId;
        zm3.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm3.srcId = zmp.srcId
        zm3.destId = zmp.destId
        if(zmp.id3){
          zm3.id = zmp.id3;
        }
        arr.push(zm3);
      }
      else if(this.CommercialDataModel.ZonalSlabCounter==4){
        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = this.zmslabto1
        arr.push(zmp);
        let zm2 = new ZmCustomPrice();
        zm2.slabFrom = this.zmslabfrom2;
        zm2.slabTo = this.zmslabto2;
        zm2.minFreight = zmp.minFreight2;
        zm2.price = zmp.price2;
        zm2.lkpDestTypeId = zmp.lkpDestTypeId;
        zm2.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm2.srcId = zmp.srcId
        zm2.destId = zmp.destId
        if(zmp.id2){
          zm2.id = zmp.id2;
        }
        arr.push(zm2);
        let zm3 = new ZmCustomPrice();
        zm3.slabFrom = this.zmslabfrom3;
        zm3.slabTo = this.zmslabto3;
        zm3.minFreight = zmp.minFreight3;
        zm3.price = zmp.price3;
        zm3.lkpDestTypeId = zmp.lkpDestTypeId;
        zm3.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm3.srcId = zmp.srcId
        zm3.destId = zmp.destId
        if(zmp.id3){
          zm3.id = zmp.id3;
        }
        arr.push(zm3);
        let zm4 = new ZmCustomPrice();
        zm4.slabFrom = this.zmslabfrom4;
        zm4.slabTo = 99999;
        zm4.minFreight = zmp.minFreight4;
        zm4.price = zmp.price4;
        zm4.lkpDestTypeId = zmp.lkpDestTypeId;
        zm4.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm4.srcId = zmp.srcId
        zm4.destId = zmp.destId
        if(zmp.id4){
          zm4.id = zmp.id4;
        }
        arr.push(zm4);
      }
      else if(this.CommercialDataModel.ZonalSlabCounter==5){
        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = this.zmslabto1
        arr.push(zmp);
        let zm2 = new ZmCustomPrice();
        zm2.slabFrom = this.zmslabfrom2;
        zm2.slabTo = this.zmslabto2;
        zm2.minFreight = zmp.minFreight2;
        zm2.price = zmp.price2;
        zm2.lkpDestTypeId = zmp.lkpDestTypeId;
        zm2.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm2.srcId = zmp.srcId
        zm2.destId = zmp.destId
        if(zmp.id2){
          zm2.id = zmp.id2;
        }
        arr.push(zm2);
        let zm3 = new ZmCustomPrice();
        zm3.slabFrom = this.zmslabfrom3;
        zm3.slabTo = this.zmslabto3;
        zm3.minFreight = zmp.minFreight3;
        zm3.price = zmp.price3;
        zm3.lkpDestTypeId = zmp.lkpDestTypeId;
        zm3.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm3.srcId = zmp.srcId
        zm3.destId = zmp.destId
        if(zmp.id3){
          zm3.id = zmp.id3;
        }
        arr.push(zm3);
        let zm4 = new ZmCustomPrice();
        zm4.slabFrom = this.zmslabfrom4;
        zm4.slabTo = this.zmslabto4;
        zm4.minFreight = zmp.minFreight4;
        zm4.price = zmp.price4;
        zm4.lkpDestTypeId = zmp.lkpDestTypeId;
        zm4.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm4.srcId = zmp.srcId
        zm4.destId = zmp.destId
        if(zmp.id4){
          zm4.id = zmp.id4;
        }
        arr.push(zm4);
        let zm5 = new ZmCustomPrice();
        zm5.slabFrom = this.zmslabfrom5;
        zm5.slabTo = 99999;
        zm5.minFreight = zmp.minFreight5;
        zm5.price = zmp.price5;
        zm5.lkpDestTypeId = zmp.lkpDestTypeId;
        zm5.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm5.srcId = zmp.srcId
        zm5.destId = zmp.destId
        if(zmp.id5){
          zm5.id = zmp.id5;
        }
        arr.push(zm5);
      }
    }

  }
  createZmPriceforSlab(arr){

    for(let zmp of this.CommercialDataModel.zmPrice){
      if(this.CommercialDataModel.ZonalSlabCounter==1){
        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = 99999
        arr.push(zmp);
      }
      else if(this.CommercialDataModel.ZonalSlabCounter==2){

        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = this.zmslabto1
        arr.push(zmp);
        let zm2 = new ZmPrice();
        zm2.slabFrom = this.zmslabfrom2;
        zm2.slabTo = 99999;
        zm2.minFreight = zmp.minFreight2;
        zm2.price = zmp.price2;
        zm2.zmRgMapId = zmp.zmRgMapId;
        if(zmp.id2){
          zm2.id = zmp.id2;
        }
        arr.push(zm2);

      }
      else if(this.CommercialDataModel.ZonalSlabCounter==3){
        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = this.zmslabto1
        arr.push(zmp);
        let zm2 = new ZmPrice();
        zm2.slabFrom = this.zmslabfrom2;
        zm2.slabTo = this.zmslabto2;
        zm2.minFreight = zmp.minFreight2;
        zm2.price = zmp.price2;
        zm2.zmRgMapId = zmp.zmRgMapId;
        if(zmp.id2){
          zm2.id = zmp.id2;
        }
        arr.push(zm2);
        let zm3 = new ZmPrice();
        zm3.slabFrom = this.zmslabfrom3;
        zm3.slabTo = 99999;
        zm3.minFreight = zmp.minFreight3;
        zm3.price = zmp.price3;
        zm3.zmRgMapId = zmp.zmRgMapId;
        if(zmp.id3){
          zm3.id = zmp.id3;
        }
        arr.push(zm3);
      }
      else if(this.CommercialDataModel.ZonalSlabCounter==4){
        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = this.zmslabto1
        arr.push(zmp);
        let zm2 = new ZmPrice();
        zm2.slabFrom = this.zmslabfrom2;
        zm2.slabTo = this.zmslabto2;
        zm2.minFreight = zmp.minFreight2;
        zm2.price = zmp.price2;
        zm2.zmRgMapId = zmp.zmRgMapId;
        if(zmp.id2){
          zm2.id = zmp.id2;
        }
        arr.push(zm2);
        let zm3 = new ZmPrice();
        zm3.slabFrom = this.zmslabfrom3;
        zm3.slabTo = this.zmslabto3;
        zm3.minFreight = zmp.minFreight3;
        zm3.price = zmp.price3;
        zm3.zmRgMapId = zmp.zmRgMapId;
        if(zmp.id3){
          zm3.id = zmp.id3;
        }
        arr.push(zm3);
        let zm4 = new ZmPrice();
        zm4.slabFrom = this.zmslabfrom4;
        zm4.slabTo = 99999;
        zm4.minFreight = zmp.minFreight4;
        zm4.price = zmp.price4;
        zm4.zmRgMapId = zmp.zmRgMapId;
        if(zmp.id4){
          zm4.id = zmp.id4;
        }
        arr.push(zm4);
      }
      else if(this.CommercialDataModel.ZonalSlabCounter==5){
        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = this.zmslabto1
        arr.push(zmp);
        let zm2 = new ZmPrice();
        zm2.slabFrom = this.zmslabfrom2;
        zm2.slabTo = this.zmslabto2;
        zm2.minFreight = zmp.minFreight2;
        zm2.price = zmp.price2;
        zm2.zmRgMapId = zmp.zmRgMapId;
        if(zmp.id2){
          zm2.id = zmp.id2;
        }
        arr.push(zm2);
        let zm3 = new ZmPrice();
        zm3.slabFrom = this.zmslabfrom3;
        zm3.slabTo = this.zmslabto3;
        zm3.minFreight = zmp.minFreight3;
        zm3.price = zmp.price3;
        zm3.zmRgMapId = zmp.zmRgMapId;
        if(zmp.id3){
          zm3.id = zmp.id3;
        }
        arr.push(zm3);
        let zm4 = new ZmPrice();
        zm4.slabFrom = this.zmslabfrom4;
        zm4.slabTo = this.zmslabto4;
        zm4.minFreight = zmp.minFreight4;
        zm4.price = zmp.price4;
        zm4.zmRgMapId = zmp.zmRgMapId;
        if(zmp.id4){
          zm4.id = zmp.id4;
        }
        arr.push(zm4);
        let zm5 = new ZmPrice();
        zm5.slabFrom = this.zmslabfrom5;
        zm5.slabTo = 99999;
        zm5.minFreight = zmp.minFreight5;
        zm5.price = zmp.price5;
        zm5.zmRgMapId = zmp.zmRgMapId;
        if(zmp.id5){
          zm5.id = zmp.id5;
        }
        arr.push(zm5);
      }

    }
  }

  createSafextBkngCustomforSlab(arr){

    for(let zmp of this.CommercialDataModel.safextBkngCustomCharge ){
      if(this.CommercialDataModel.ZonalSlabCounter==1){
        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = 99999
        arr.push(zmp);
      }
      else if(this.CommercialDataModel.ZonalSlabCounter==2){

        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = this.zmslabto1
        arr.push(zmp);
        let zm2 = new SafextBkngCustomCharge();
        zm2.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm2.toId = zmp.toId
        zm2.slabFrom = this.zmslabfrom2;
        zm2.slabTo = 99999;
        zm2.minAmt = zmp.minAmt2;
        zm2.price = zmp.price2;
        if(zmp.id2){
          zm2.id = zmp.id2;
        }
        arr.push(zm2);

      }
      else if(this.CommercialDataModel.ZonalSlabCounter==3){
        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = this.zmslabto1
        arr.push(zmp);
        let zm2 = new SafextBkngCustomCharge();
        zm2.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm2.toId = zmp.toId
        zm2.slabFrom = this.zmslabfrom2;
        zm2.slabTo = this.zmslabto2;
        zm2.minAmt = zmp.minAmt2;
        zm2.price = zmp.price2;
        if(zmp.id2){
          zm2.id = zmp.id2;
        }
        arr.push(zm2);
        let zm3 = new SafextBkngCustomCharge();
        zm3.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm3.toId = zmp.toId
        zm3.slabFrom = this.zmslabfrom3;
        zm3.slabTo = 99999;
        zm3.minAmt = zmp.minAmt3;
        zm3.price = zmp.price3;
        if(zmp.id3){
          zm3.id = zmp.id3;
        }
        arr.push(zm3);
      }
      else if(this.CommercialDataModel.ZonalSlabCounter==4){
        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = this.zmslabto1
        arr.push(zmp);
        let zm2 = new SafextBkngCustomCharge();
        zm2.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm2.toId = zmp.toId
        zm2.slabFrom = this.zmslabfrom2;
        zm2.slabTo = this.zmslabto2;
        zm2.minAmt = zmp.minAmt2;
        zm2.price = zmp.price2;
        if(zmp.id2){
          zm2.id = zmp.id2;
        }
        arr.push(zm2);
        let zm3 = new SafextBkngCustomCharge();
        zm3.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm3.toId = zmp.toId
        zm3.slabFrom = this.zmslabfrom3;
        zm3.slabTo = this.zmslabto3;
        zm3.minAmt = zmp.minAmt3;
        zm3.price = zmp.price3;
        if(zmp.id3){
          zm3.id = zmp.id3;
        }
        arr.push(zm3);
        let zm4 = new SafextBkngCustomCharge();
        zm4.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm4.toId = zmp.toId
        zm4.slabFrom = this.zmslabfrom4;
        zm4.slabTo = 99999;
        zm4.minAmt = zmp.minAmt4;
        zm4.price = zmp.price4;
        if(zmp.id4){
          zm4.id = zmp.id4;
        }
        arr.push(zm4);
      }
      else if(this.CommercialDataModel.ZonalSlabCounter==5){
        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = this.zmslabto1
        arr.push(zmp);
        let zm2 = new SafextBkngCustomCharge();
        zm2.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm2.toId = zmp.toId
        zm2.slabFrom = this.zmslabfrom2;
        zm2.slabTo = this.zmslabto2;
        zm2.minAmt = zmp.minAmt2;
        zm2.price = zmp.price2;
        if(zmp.id2){
          zm2.id = zmp.id2;
        }
        arr.push(zm2);
        let zm3 = new SafextBkngCustomCharge();
        zm3.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm3.toId = zmp.toId
        zm3.slabFrom = this.zmslabfrom3;
        zm3.slabTo = this.zmslabto3;
        zm3.minAmt = zmp.minAmt3;
        zm3.price = zmp.price3;
        if(zmp.id3){
          zm3.id = zmp.id3;
        }
        arr.push(zm3);
        let zm4 = new SafextBkngCustomCharge();
        zm4.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm4.toId = zmp.toId
        zm4.slabFrom = this.zmslabfrom4;
        zm4.slabTo = this.zmslabto4;
        zm4.minAmt = zmp.minAmt4;
        zm4.price = zmp.price4;
        if(zmp.id4){
          zm4.id = zmp.id4;
        }
        arr.push(zm4);
        let zm5 = new SafextBkngCustomCharge();
        zm5.lkpSrcTypeId = zmp.lkpSrcTypeId
        zm5.toId = zmp.toId
        zm5.slabFrom = this.zmslabfrom5;
        zm5.slabTo = 99999;
        zm5.minAmt = zmp.minAmt5;
        zm5.price = zmp.price5;
        if(zmp.id5){
          zm5.id = zmp.id5;
        }
        arr.push(zm5);
      }

    }

  }
  createSafextDlvryCustomforSlab(arr){

    for(let zmp of this.CommercialDataModel.safextDlvryCustomCharge ){
      if(this.CommercialDataModel.ZonalSlabCounter==1){
        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = 99999;
        arr.push(zmp);
      }
      else if(this.CommercialDataModel.ZonalSlabCounter==2){

        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = this.zmslabto1
        arr.push(zmp);
        let zm2 = new SafextDlvryCustomCharge();
        zm2.lkpDestTypeId = zmp.lkpDestTypeId
        zm2.fromId = zmp.fromId
        zm2.slabFrom = this.zmslabfrom2;
        zm2.slabTo = 99999;
        zm2.minAmt = zmp.minAmt2;
        zm2.price = zmp.price2;
        if(zmp.id2){
          zm2.id = zmp.id2;
        }
        arr.push(zm2);

      }
      else if(this.CommercialDataModel.ZonalSlabCounter==3){
        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = this.zmslabto1
        arr.push(zmp);
        let zm2 = new SafextDlvryCustomCharge();
        zm2.lkpDestTypeId = zmp.lkpDestTypeId
        zm2.fromId = zmp.fromId
        zm2.slabFrom = this.zmslabfrom2;
        zm2.slabTo = this.zmslabto2;
        zm2.minAmt = zmp.minAmt2;
        zm2.price = zmp.price2;
        if(zmp.id2){
          zm2.id = zmp.id2;
        }
        arr.push(zm2);
        let zm3 = new SafextDlvryCustomCharge();
        zm3.lkpDestTypeId = zmp.lkpDestTypeId
        zm3.fromId = zmp.fromId
        zm3.slabFrom = this.zmslabfrom3;
        zm3.slabTo = 99999;
        zm3.minAmt = zmp.minAmt3;
        zm3.price = zmp.price3;
        if(zmp.id3){
          zm3.id = zmp.id3;
        }
        arr.push(zm3);
      }
      else if(this.CommercialDataModel.ZonalSlabCounter==4){
        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = this.zmslabto1
        arr.push(zmp);
        let zm2 = new SafextDlvryCustomCharge();
        zm2.lkpDestTypeId = zmp.lkpDestTypeId
        zm2.fromId = zmp.fromId
        zm2.slabFrom = this.zmslabfrom2;
        zm2.slabTo = this.zmslabto2;
        zm2.minAmt = zmp.minAmt2;
        zm2.price = zmp.price2;
        if(zmp.id2){
          zm2.id = zmp.id2;
        }
        arr.push(zm2);
        let zm3 = new SafextDlvryCustomCharge();
        zm3.lkpDestTypeId = zmp.lkpDestTypeId
        zm3.fromId = zmp.fromId
        zm3.slabFrom = this.zmslabfrom3;
        zm3.slabTo = this.zmslabto3;
        zm3.minAmt = zmp.minAmt3;
        zm3.price = zmp.price3;
        if(zmp.id3){
          zm3.id = zmp.id3;
        }
        arr.push(zm3);
        let zm4 = new SafextDlvryCustomCharge();
        zm4.lkpDestTypeId = zmp.lkpDestTypeId
        zm4.fromId = zmp.fromId
        zm4.slabFrom = this.zmslabfrom4;
        zm4.slabTo = 99999;
        zm4.minAmt = zmp.minAmt4;
        zm4.price = zmp.price4;
        if(zmp.id4){
          zm4.id = zmp.id4;
        }
        arr.push(zm4);
      }
      else if(this.CommercialDataModel.ZonalSlabCounter==5){
        zmp.slabFrom = this.zmslabfrom1
        zmp.slabTo = this.zmslabto1
        arr.push(zmp);
        let zm2 = new SafextDlvryCustomCharge();
        zm2.lkpDestTypeId = zmp.lkpDestTypeId
        zm2.fromId = zmp.fromId
        zm2.slabFrom = this.zmslabfrom2;
        zm2.slabTo = this.zmslabto2;
        zm2.minAmt = zmp.minAmt2;
        zm2.price = zmp.price2;
        if(zmp.id2){
          zm2.id = zmp.id2;
        }
        arr.push(zm2);
        let zm3 = new SafextDlvryCustomCharge();
        zm3.lkpDestTypeId = zmp.lkpDestTypeId
        zm3.fromId = zmp.fromId
        zm3.slabFrom = this.zmslabfrom3;
        zm3.slabTo = this.zmslabto3;
        zm3.minAmt = zmp.minAmt3;
        zm3.price = zmp.price3;
        if(zmp.id3){
          zm3.id = zmp.id3;
        }
        arr.push(zm3);
        let zm4 = new SafextDlvryCustomCharge();
        zm4.lkpDestTypeId = zmp.lkpDestTypeId
        zm4.fromId = zmp.fromId
        zm4.slabFrom = this.zmslabfrom4;
        zm4.slabTo = this.zmslabto4;
        zm4.minAmt = zmp.minAmt4;
        zm4.price = zmp.price4;
        if(zmp.id4){
          zm4.id = zmp.id4;
        }
        arr.push(zm4);
        let zm5 = new SafextDlvryCustomCharge();
        zm5.lkpDestTypeId = zmp.lkpDestTypeId
        zm5.fromId = zmp.fromId
        zm5.slabFrom = this.zmslabfrom5;
        zm5.slabTo = 99999;
        zm5.minAmt = zmp.minAmt5;
        zm5.price = zmp.price5;
        if(zmp.id5){
          zm5.id = zmp.id5;
        }
        arr.push(zm5);
      }

    }

  }
  createSafextChargeforSlab(arr){
      for(let zmp of this.CommercialDataModel.safextCharge){
        if(this.CommercialDataModel.ZonalSlabCounter==1){
          zmp.slabFrom = this.zmslabfrom1
          zmp.slabTo = 99999
          arr.push(zmp);
        }
        else if(this.CommercialDataModel.ZonalSlabCounter==2){
  
          zmp.slabFrom = this.zmslabfrom1
          zmp.slabTo = this.zmslabto1
          arr.push(zmp);
          let zm2 = new SafextCharge();
          zm2.lkpSafextLevelId = zmp.lkpSafextLevelId;
          zm2.safextCtgy = zmp.safextCtgy;
          zm2.safextEntityId = zmp.safextEntityId
          zm2.slabFrom = this.zmslabfrom2;
          zm2.slabTo = 99999;
          zm2.minAmt = zmp.minAmt2;
          zm2.price = zmp.price2;
          if(zmp.id2){
            zm2.id = zmp.id2;
          }
          arr.push(zm2);
  
        }
        else if(this.CommercialDataModel.ZonalSlabCounter==3){
          zmp.slabFrom = this.zmslabfrom1
          zmp.slabTo = this.zmslabto1
          arr.push(zmp);
          let zm2 = new SafextCharge();
          zm2.lkpSafextLevelId = zmp.lkpSafextLevelId;
          zm2.safextCtgy = zmp.safextCtgy;
          zm2.safextEntityId = zmp.safextEntityId
          zm2.slabFrom = this.zmslabfrom2;
          zm2.slabTo = this.zmslabto2;
          zm2.minAmt = zmp.minAmt2;
          zm2.price = zmp.price2;
          if(zmp.id2){
            zm2.id = zmp.id2;
          }
          arr.push(zm2);
          let zm3 = new SafextCharge();
          zm3.lkpSafextLevelId = zmp.lkpSafextLevelId;
          zm3.safextCtgy = zmp.safextCtgy;
          zm3.safextEntityId = zmp.safextEntityId
          zm3.slabFrom = this.zmslabfrom3;
          zm3.slabTo = 99999;
          zm3.minAmt = zmp.minAmt3;
          zm3.price = zmp.price3;
          if(zmp.id3){
            zm3.id = zmp.id3;
          }
          arr.push(zm3);
        }
        else if(this.CommercialDataModel.ZonalSlabCounter==4){
          zmp.slabFrom = this.zmslabfrom1
          zmp.slabTo = this.zmslabto1
          arr.push(zmp);
          let zm2 = new SafextCharge();
          zm2.lkpSafextLevelId = zmp.lkpSafextLevelId;
          zm2.safextCtgy = zmp.safextCtgy;
          zm2.safextEntityId = zmp.safextEntityId
          zm2.slabFrom = this.zmslabfrom2;
          zm2.slabTo = this.zmslabto2;
          zm2.minAmt = zmp.minAmt2;
          zm2.price = zmp.price2;
          if(zmp.id2){
            zm2.id = zmp.id2;
          }
          arr.push(zm2);
          let zm3 = new SafextCharge();
          zm3.lkpSafextLevelId = zmp.lkpSafextLevelId;
          zm3.safextCtgy = zmp.safextCtgy;
          zm3.safextEntityId = zmp.safextEntityId
          zm3.slabFrom = this.zmslabfrom3;
          zm3.slabTo = this.zmslabto3;
          zm3.minAmt = zmp.minAmt3;
          zm3.price = zmp.price3;
          if(zmp.id3){
            zm3.id = zmp.id3;
          }
          arr.push(zm3);
          let zm4 = new SafextCharge();
          zm4.lkpSafextLevelId = zmp.lkpSafextLevelId;
          zm4.safextCtgy = zmp.safextCtgy;
          zm4.safextEntityId = zmp.safextEntityId
          zm4.slabFrom = this.zmslabfrom4;
          zm4.slabTo = 99999;
          zm4.minAmt = zmp.minAmt4;
          zm4.price = zmp.price4;
          if(zmp.id4){
            zm4.id = zmp.id4;
          }
          arr.push(zm4);
        }
        else if(this.CommercialDataModel.ZonalSlabCounter==5){
          zmp.slabFrom = this.zmslabfrom1
          zmp.slabTo = this.zmslabto1
          arr.push(zmp);
          let zm2 = new SafextCharge();
          zm2.lkpSafextLevelId = zmp.lkpSafextLevelId;
          zm2.safextCtgy = zmp.safextCtgy;
          zm2.safextEntityId = zmp.safextEntityId
          zm2.slabFrom = this.zmslabfrom2;
          zm2.slabTo = this.zmslabto2;
          zm2.minAmt = zmp.minAmt2;
          zm2.price = zmp.price2;
          if(zmp.id2){
            zm2.id = zmp.id2;
          }
          arr.push(zm2);
          let zm3 = new SafextCharge();
          zm3.lkpSafextLevelId = zmp.lkpSafextLevelId;
          zm3.safextCtgy = zmp.safextCtgy;
          zm3.safextEntityId = zmp.safextEntityId
          zm3.slabFrom = this.zmslabfrom3;
          zm3.slabTo = this.zmslabto3;
          zm3.minAmt = zmp.minAmt3;
          zm3.price = zmp.price3;
          if(zmp.id3){
            zm3.id = zmp.id3;
          }
          arr.push(zm3);
          let zm4 = new SafextCharge();
          zm4.lkpSafextLevelId = zmp.lkpSafextLevelId;
          zm4.safextCtgy = zmp.safextCtgy;
          zm4.safextEntityId = zmp.safextEntityId
          zm4.slabFrom = this.zmslabfrom4;
          zm4.slabTo = this.zmslabto4;
          zm4.minAmt = zmp.minAmt4;
          zm4.price = zmp.price4;
          if(zmp.id4){
            zm4.id = zmp.id4;
          }
          arr.push(zm4);
          let zm5 = new SafextCharge();
          zm5.lkpSafextLevelId = zmp.lkpSafextLevelId;
          zm5.safextCtgy = zmp.safextCtgy;
          zm5.safextEntityId = zmp.safextEntityId
          zm5.slabFrom = this.zmslabfrom5;
          zm5.slabTo = 99999;
          zm5.minAmt = zmp.minAmt5;
          zm5.price = zmp.price5;
          if(zmp.id5){
            zm5.id = zmp.id5;
          }
          arr.push(zm5);
        }
      }

  }

  postCommercialCardDetail(type) {
    this.spinner.show();
    if(!this.CommercialDataModel.safextFlag){
    this.CommercialDataModel.safextCharge = []
    this.CommercialDataModel.safextBkngCustomCharge = []
    this.CommercialDataModel.safextDlvryCustomCharge = []
    }
    if(!this.CommercialDataModel.deliveryFlag){
      let arr = this.CommercialDataModel.safextCharge;
      for( var i = 0; i < arr.length; i++){ 
        if ( arr[i].safextCtgy === 'DELIVERY' ) {
          arr.splice(i, 1); 
          i--;
        }
     }
     this.CommercialDataModel.safextDlvryCustomCharge = []
    }
    if(!this.CommercialDataModel.bookingFlag){
      let arr = this.CommercialDataModel.safextCharge;
      for( var i = 0; i < arr.length; i++){ 
        if ( arr[i].safextCtgy === 'BOOKING' ) {
          arr.splice(i, 1); 
          i--;
        }
   }
   this.CommercialDataModel.safextBkngCustomCharge = []
    }

    this.CommercialDataModel.zmCustomPrice = this.CommercialDataModel.zmCustomPrice.length>0?this.CommercialDataModel.zmCustomPrice:[]

    let postData = JSON.parse(JSON.stringify(this.CommercialDataModel));

    let zmPricePost = [];
    let zmCustomPrice = [];
    let safextCharge = [];
    let safextBkngCustomCharge = []
    let safextDlvryCustomCharge = []
    if(this.CommercialDataModel.slabFlag){
      
      this.createZmPriceforSlab(zmPricePost);
      postData.zmPrice = zmPricePost;
      if(this.CommercialDataModel.zmCustomPrice.length>0){
        this.createCustomRatePriceforSlab(zmCustomPrice); 
        postData.zmCustomPrice = zmCustomPrice;
      }
    }

    if(this.CommercialDataModel.safextFlag && this.CommercialDataModel.slabFlag){
      if(this.CommercialDataModel.safextCharge.length>0){
        this.createSafextChargeforSlab(safextCharge); 
        postData.safextCharge = safextCharge;
      }
      if(this.CommercialDataModel.safextBkngCustomCharge.length>0){
        this.createSafextBkngCustomforSlab(safextBkngCustomCharge); 
        postData.safextBkngCustomCharge = safextBkngCustomCharge;
      }
      if(this.CommercialDataModel.safextDlvryCustomCharge.length>0){
        this.createSafextDlvryCustomforSlab(safextDlvryCustomCharge); 
        postData.safextDlvryCustomCharge = safextDlvryCustomCharge;
      }
    }
// to make sure all safext level type is same 
if(postData.safextBkngCustomCharge.length>0){
  postData.safextBkngCustomCharge.forEach((ele) => {
    ele.lkpSrcTypeId = this.CommercialDataModel.safeextTypeFlag;
  })
}
if(postData.safextDlvryCustomCharge.length>0){
  postData.safextDlvryCustomCharge.forEach((ele) => {
    ele.lkpDestTypeId = this.CommercialDataModel.safeextTypeFlag;
  })
}  
// check if active childs needs to be deactivated
    this.deactiveOrphanChild(postData);
    if(this.checkForDuplicateCommercial(postData)){
   this.contractservice.postCommercialDetail(postData,this.editflow,this.rcCmdLevel=="COMMERCIAL LEVEL",this.oldCommerIdForCmdCopy,this.isCopyRateCard)
      .subscribe(success => {
        let ob = ErrorConstants.validateException(success);
        if(ob.isSuccess){
        if(!this.isCopyRateCard){
          this.commercial_id=success.data.responseData;
          if(type=='continue'){
             this.third.close();
             if(!this.isCommandmentAlreadyExist){
                this.four.open();
                this.opencmdmnt();
              }else{this.five.open();this.getTncDetail();}
          }
          if(type=='save'){
            this.getCommercialDetailbyId('');
         } 
        }else{
          this.newCommercialIdList.push(success.data.responseData);
          console.log(this.newCommercialIdList, 'print new commercial list')
          for( var i = 0; i < this.oldCommercialIdList.length; i++){ 
            if ( this.oldCommercialIdList[i].id === this.oldCommerIdForCmdCopy) { 
              this.oldCommercialIdList.splice(i, 1); }}
          if(type=='continue'){
            this.oldCommercialIdList = [];
            this.isCommercialCopy = false;
          }
          if(this.oldCommercialIdList.length==0){
            this.third.close();
            this.four.open();
            this.opencmdmnt();
            return;
          }
        }
        this.isCommercialCopy = false;
        this.getCommercialDetail(false);
        this.tosterservice.success('Saved Successfully');
        

      }else {
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }
    },
      error => {
        this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      });
    }

  }
  checkForDuplicateCommercial(postData){
    let deleteStatusId:number
    for (let status of this.ReferenceDataModel.statusList) {
      if (status.lookupVal == 'DELETED') {
        deleteStatusId = status.id
      }
    }
    let id = postData.id;
    let prdctCtgyId = postData.prdctCtgyId;
    let lkpChrgById = postData.lkpChrgById;
    let isNotDuplicateComm = true;
    let productListNew :any = [];
    postData.commercialProductMap.forEach(e=>{
      if(e.status!=deleteStatusId)productListNew.push(e.productId);
    });
    productListNew.sort();
    for(let item of this.commercial){
        if(this.quantityOfCharge=='Per Kg'){
        if(item.prdctCtgyId==prdctCtgyId && item.lkpChrgById==lkpChrgById && !(item.id==id)){
          if(this.isCopyRateCard && item.oldComm){
            return true;
          }
          this.tosterservice.error('Commercial For Product category and Charge by already exists !')
          this.spinner.hide();
          isNotDuplicateComm=false;
          break;
        }} else
        if(this.quantityOfCharge=='Per Piece'){
          let productListOld :any = [];
          item.commercialProductMap.forEach(e=>{
            productListOld.push(e.productId);
          })
          productListOld.sort();

          if(item.prdctCtgyId==prdctCtgyId && item.lkpChrgById==lkpChrgById && item.lkpPackTypeId==postData.lkpPackTypeId && item.packAlias==postData.packAlias.toUpperCase() && productListOld.toString()==productListNew.toString() && !(item.id==id)){
            if(this.isCopyRateCard && item.oldComm){
              return true;
            }
            this.tosterservice.error('Commercial For Product category,Charge by,Packaging Type,Packaging Alias Name and Product List  already exists !')
            this.spinner.hide();
            isNotDuplicateComm=false;
            break;
          }}
          else{
            if(item.prdctCtgyId==prdctCtgyId && item.lkpChrgById==lkpChrgById && item.lkpPackTypeId==postData.lkpPackTypeId && item.packAlias==postData.packAlias.toUpperCase() && !(item.id==id)){
              if(this.isCopyRateCard && item.oldComm){
                return true;
              }
              this.tosterservice.error('Commercial For Product category,Charge by,Packaging Type and Packaging Alias Name already exists !')
              this.spinner.hide();
              isNotDuplicateComm=false;
              break;
            }}

    }
    return isNotDuplicateComm;
  }
  deactiveOrphanChild(data){
    if(this.deactivateOldIdsData){
      let deleteStatusId:number
      for (let status of this.ReferenceDataModel.statusList) {
        if (status.lookupVal == 'DELETED') {
          deleteStatusId = status.id
        }
      }
      if (this.deactivateOldIdsData.zmPrice) {
        for (let old of this.deactivateOldIdsData.zmPrice) {
          let isFound: boolean = false;
          for (let latest of data.zmPrice) {
            if (latest.id) {
              if (old.id == latest.id) {
                isFound = true
              }
            }
          }
          if (!isFound) {
            old['status'] = deleteStatusId;
            if(old.id){
              data.zmPrice.push(old);
            }
          }
        }
      }
      if(this.deactivateOldIdsData.zmCustomPrice){
        for (let old of this.deactivateOldIdsData.zmCustomPrice) {
          let isFound: boolean = false;
          for (let latest of data.zmCustomPrice) {
            if (latest.id) {
              if (old.id == latest.id) {
                isFound = true
              }
            }
          }
          if (!isFound) {
            old['status'] = deleteStatusId;
            if(old.id){
              data.zmCustomPrice.push(old);
            }
          }
        }
      }
      if(this.deactivateOldIdsData.safextCharge){
        for (let old of this.deactivateOldIdsData.safextCharge) {
          let isFound: boolean = false;
          for (let latest of data.safextCharge) {
            if (latest.id) {
              if (old.id == latest.id) {
                isFound = true
              }
            }
          }
          if (!isFound) {
            old['status'] = deleteStatusId;
            if(old.id){
                data.safextCharge.push(old);
            }
          }
        }
      }
      if(this.deactivateOldIdsData.safextDlvryCustomCharge){
        for (let old of this.deactivateOldIdsData.safextDlvryCustomCharge) {
          let isFound: boolean = false;
          for (let latest of data.safextDlvryCustomCharge) {
            if (latest.id) {
              if (old.id == latest.id) {
                isFound = true
              }
            }
          }
          if (!isFound) {
            old['status'] = deleteStatusId;
            if(old.id){
                data.safextDlvryCustomCharge.push(old);
            }
          }
        }
      }
      if(this.deactivateOldIdsData.safextBkngCustomCharge){
        for (let old of this.deactivateOldIdsData.safextBkngCustomCharge) {
          let isFound: boolean = false;
          for (let latest of data.safextBkngCustomCharge) {
            if (latest.id) {
              if (old.id == latest.id) {
                isFound = true
              }
            }
          }
          if (!isFound) {
            old['status'] = deleteStatusId;
            if(old.id){
                data.safextBkngCustomCharge.push(old);
            }
          }
        }
      }
      if(this.deactivateOldIdsData.commercialProductMap){
        for (let old of this.deactivateOldIdsData.commercialProductMap) {
          let isFound: boolean = false;
          for (let latest of data.commercialProductMap) {
            if (latest.id) {
              if (old.id == latest.id) {
                isFound = true
              }
            }
          }
          if (!isFound) {
            old['status'] = deleteStatusId;
            if(old.id){
                data.commercialProductMap.push(old);

            }
          }
        }
      }
      if(this.deactivateOldIdsData.pricingParamTrans){
        for (let old of this.deactivateOldIdsData.pricingParamTrans) {
          let isFound: boolean = false;
          for (let latest of data.pricingParamTrans) {
            if (latest.id) {
              if (old.id == latest.id) {
                isFound = true
              }
            }
          }
          if (!isFound) {
            old['status'] = deleteStatusId;
            if(old.id){
                data.pricingParamTrans.push(old);

            }
          }
        }
      }

    }
  }

  //commercial by id
  commercialType = [{ id: 1, lookupVal: 'Default' },]


  gst: any[] = [{ id: 1, value: 'Yes' },
  { id: 0, value: 'No' },
  ]

  months: any[] = [
  { id: 1, value: 'January' },
  { id: 2, value: 'February' },
  { id: 3, value: 'March' },
  { id: 4, value: 'April' },
  { id: 5, value: 'May' },
  { id: 6, value: 'June' },
  { id: 7, value: 'July' },
  { id: 8, value: 'August' },
  { id: 9, value: 'September' },
  { id: 10, value: 'October' },
  { id: 11, value: 'November' },
  { id: 12, value: 'December' },
  ]

  Scurty_Provid_By: any[] = [{ id: 1, value: 'SAFEXPRESS' },
  { id: 0, value: 'CUSTOMER' },
  ]

  rateTypes: any[] = [{ id: 1, value: 'CONTRACTUAL' },
  { id: 0, value: 'NON-CONTRACTUAL'},
  ]
  prdListChk=false;
  selectedProduct(topping){
    this.CommercialDataModel.commercialProductMap = [];
    for(let top of topping){
      let commercialProductMap = new CommercialProductMap(); 
      commercialProductMap.productId = top;
      this.CommercialDataModel.commercialProductMap.push(commercialProductMap);
    }
    if(this.CommercialDataModel && this.CommercialDataModel.commercialProductMap.length==0){
      this.prdListChk=true;
    }else{
      this.prdListChk=false;
    }
  }
  selectedProductTouch(){
    if(this.CommercialDataModel && this.CommercialDataModel.commercialProductMap.length==0){
      this.prdListChk=true;
    }else{
      this.prdListChk=false;
    }
  }

  zmslabto1:number = 100;
  zmslabfrom1:number = 0;
  zmslabto2:number
  zmslabfrom2:number
  zmslabto3:number
  zmslabfrom3:number
  zmslabto4:number
  zmslabfrom4:number
  zmslabto5:number
  zmslabfrom5:number

  zonalGroupName(){
    if(this.CommercialDataModel.id && this.CommercialDataModel.zmPrice.length>0){
    for(let item of this.CommercialDataModel.zmPrice){
      for(let ref of this.ReferenceDataModel.rateGroupList){
        if(item.zmRgMapId == ref.id){
          item["name"]= ref.name;
        }
      }
    }}else{
      this.CommercialDataModel.zmPrice = [];
      for(let ref of this.ReferenceDataModel.rateGroupList){
        let zmpr = new ZmPrice();
        zmpr.zmRgMapId = ref.id;
        if(ref.price>0)
          zmpr.price = ref.price;
        zmpr.slabFrom=0;
        zmpr.slabTo=0;
        zmpr["name"]=ref.name;
        this.CommercialDataModel.zmPrice.push(zmpr);
      }
    }
  }
  isOptionBSelected = false;
  changeSlabProtion(){
    let typeId= this.CommercialDataModel.lkpSlabProtectionId;
    let optionName = ''; 
    for(let option of this.ReferenceDataModel.slabProtectTypeList){
        if(option.id==typeId){
          optionName= option.lookupVal
        }
    }
    if(optionName ==='OPTION B'){
      this.isOptionBSelected= true;
      this.updateZmPriceMinF();
      this.updateZmCustomPriceMinF();
      this.updatesafextChargeDlvrMinAmt();
      this.updatesafextChargeCusDlvrMinAmt();
      this.updatesafextChargeBkgMinAmt();
      this.updatesafextChargeCusBkgMinAmt();
    }else{
      this.isOptionBSelected= false;
    }
  }
  updateZmPriceMinF(){
    for(let item of this.CommercialDataModel.zmPrice){
    if(this.isOptionBSelected){
      if(this.CommercialDataModel.ZonalSlabCounter==2){
          item.minFreight2= item.minFreight
      }
      if(this.CommercialDataModel.ZonalSlabCounter==3){
        item.minFreight2= item.minFreight
        item.minFreight3= item.minFreight
      }
      if(this.CommercialDataModel.ZonalSlabCounter==4){
        item.minFreight2= item.minFreight
        item.minFreight3= item.minFreight
        item.minFreight4= item.minFreight
      }
      if(this.CommercialDataModel.ZonalSlabCounter==5){
        item.minFreight2= item.minFreight
        item.minFreight3= item.minFreight
        item.minFreight4= item.minFreight
        item.minFreight5= item.minFreight
      }
    }
  }
  }
  updateZmCustomPriceMinF(){
    for(let item of this.CommercialDataModel.zmCustomPrice){
      if(this.isOptionBSelected){
        if(this.CommercialDataModel.ZonalSlabCounter==2){
            item.minFreight2= item.minFreight
        }
        if(this.CommercialDataModel.ZonalSlabCounter==3){
          item.minFreight2= item.minFreight
          item.minFreight3= item.minFreight
        }
        if(this.CommercialDataModel.ZonalSlabCounter==4){
          item.minFreight2= item.minFreight
          item.minFreight3= item.minFreight
          item.minFreight4= item.minFreight
        }
        if(this.CommercialDataModel.ZonalSlabCounter==5){
          item.minFreight2= item.minFreight
          item.minFreight3= item.minFreight
          item.minFreight4= item.minFreight
          item.minFreight5= item.minFreight
        }
      }
    } 
  }
  updatesafextChargeDlvrMinAmt(){
    for(let item of this.CommercialDataModel.safextCharge){
      if(this.isOptionBSelected && item.safextCtgy=='DELIVERY'){
        if(this.CommercialDataModel.ZonalSlabCounter==2){
            item.minAmt2= item.minAmt
        }
        if(this.CommercialDataModel.ZonalSlabCounter==3){
          item.minAmt2= item.minAmt
          item.minAmt3= item.minAmt
        }
        if(this.CommercialDataModel.ZonalSlabCounter==4){
          item.minAmt2= item.minAmt
          item.minAmt3= item.minAmt
          item.minAmt4= item.minAmt
        }
        if(this.CommercialDataModel.ZonalSlabCounter==5){
          item.minAmt2= item.minAmt
          item.minAmt3= item.minAmt
          item.minAmt4= item.minAmt
          item.minAmt5= item.minAmt
        }
      }
    } 
  }
  updatesafextChargeCusDlvrMinAmt(){
    for(let item of this.CommercialDataModel.safextDlvryCustomCharge){
      if(this.isOptionBSelected){
        if(this.CommercialDataModel.ZonalSlabCounter==2){
            item.minAmt2= item.minAmt
        }
        if(this.CommercialDataModel.ZonalSlabCounter==3){
          item.minAmt2= item.minAmt
          item.minAmt3= item.minAmt
        }
        if(this.CommercialDataModel.ZonalSlabCounter==4){
          item.minAmt2= item.minAmt
          item.minAmt3= item.minAmt
          item.minAmt4= item.minAmt
        }
        if(this.CommercialDataModel.ZonalSlabCounter==5){
          item.minAmt2= item.minAmt
          item.minAmt3= item.minAmt
          item.minAmt4= item.minAmt
          item.minAmt5= item.minAmt
        }
      }
    } 
  }
  updatesafextChargeBkgMinAmt(){
    for(let item of this.CommercialDataModel.safextCharge){
      if(this.isOptionBSelected && item.safextCtgy=='BOOKING'){
        if(this.CommercialDataModel.ZonalSlabCounter==2){
            item.minAmt2= item.minAmt
        }
        if(this.CommercialDataModel.ZonalSlabCounter==3){
          item.minAmt2= item.minAmt
          item.minAmt3= item.minAmt
        }
        if(this.CommercialDataModel.ZonalSlabCounter==4){
          item.minAmt2= item.minAmt
          item.minAmt3= item.minAmt
          item.minAmt4= item.minAmt
        }
        if(this.CommercialDataModel.ZonalSlabCounter==5){
          item.minAmt2= item.minAmt
          item.minAmt3= item.minAmt
          item.minAmt4= item.minAmt
          item.minAmt5= item.minAmt
        }
      }
    } 
  }
  updatesafextChargeCusBkgMinAmt(){
    for(let item of this.CommercialDataModel.safextBkngCustomCharge){
      if(this.isOptionBSelected){
        if(this.CommercialDataModel.ZonalSlabCounter==2){
            item.minAmt2= item.minAmt
        }
        if(this.CommercialDataModel.ZonalSlabCounter==3){
          item.minAmt2= item.minAmt
          item.minAmt3= item.minAmt
        }
        if(this.CommercialDataModel.ZonalSlabCounter==4){
          item.minAmt2= item.minAmt
          item.minAmt3= item.minAmt
          item.minAmt4= item.minAmt
        }
        if(this.CommercialDataModel.ZonalSlabCounter==5){
          item.minAmt2= item.minAmt
          item.minAmt3= item.minAmt
          item.minAmt4= item.minAmt
          item.minAmt5= item.minAmt
        }
      }
    } 
  }
  slabHandleforZonal(val){
    this.show= false;
    this.showArray= false;
    this.showArray2= false;
    this.showArray3= false;
    this.showArray4= false;
    this.zmslabto1= 100;
    this.zmslabfrom1= 0;
    if(val==='Yes'){
      this.CommercialDataModel.ZonalSlabCounter =  this.CommercialDataModel.ZonalSlabCounter +1;
      if(!this.CommercialDataModel.id){
        for(let dt of this.CommercialDataModel.zmPrice){
          dt.price = null
          dt.minFreight = null;
        }
      }
    }
    if(val==='No'){
      this.CommercialDataModel.ZonalSlabCounter =  0;
      this.CommercialDataModel.stopZonalSlab=false;
      this.CommercialDataModel.lkpSlabProtectionId= null;
      this.fieldArray1 = []
      this.zmslabto1 = 100;
      this.zmslabfrom1 = 0;
      this.zonalGroupName();
    }
  }

  editCustomRatePrice(success){
    let viewCusRateP = [];
    let arr = success.zmCustomPrice;
    for(let i=0; i< arr.length ;){
      let sameRatezmList = []
      for(let j=0; j< arr.length ;j++){
        if(arr[i].destId == arr[j].destId && arr[i].srcId==arr[j].srcId && arr[i].lkpSrcTypeId == arr[j].lkpSrcTypeId && arr[i].lkpDestTypeId== arr[j].lkpDestTypeId){
          sameRatezmList.push(arr[j]);
        }
      }
      sameRatezmList = sameRatezmList.sort((a,b) => a.slabFrom-b.slabFrom);
      this.CommercialDataModel.ZonalSlabCounter = sameRatezmList.length;
      let row = new ZmCustomPrice();
      row.lkpDestTypeId = sameRatezmList[0].lkpDestTypeId
      row.lkpSrcTypeId = sameRatezmList[0].lkpSrcTypeId
      if (row.lkpDestTypeId == this.stateTypeId) {
        row.stateNamesto = this.covertStateIdToStateName(sameRatezmList[0].destId);
      } else if (row.lkpDestTypeId == this.cityTypeId) {
        row.cityNamesto = this.covertCityIdToCityName(sameRatezmList[0].destId);
      }
      if (row.lkpSrcTypeId == this.stateTypeId) {
        row.stateNamesfrom = this.covertStateIdToStateName(sameRatezmList[0].srcId);
      } else if (row.lkpSrcTypeId == this.cityTypeId) {
        row.cityNamesfrom = this.covertCityIdToCityName(sameRatezmList[0].srcId);
      }
      row.destId = sameRatezmList[0].destId
      row.srcId = sameRatezmList[0].srcId
      row.id = sameRatezmList[0].id;
      row.price= sameRatezmList[0].price
      row.minFreight = sameRatezmList[0].minFreight;
      row.slabFrom = sameRatezmList[0].slabFrom;
      row.slabTo = sameRatezmList[0].slabTo;
      this.zmslabto1 = sameRatezmList[0].slabTo;
      this.zmslabfrom1 = sameRatezmList[0].slabFrom;
      if(this.CommercialDataModel.ZonalSlabCounter == 2 || this.CommercialDataModel.ZonalSlabCounter>2){
        row.id2 = sameRatezmList[1].id;
        row.price2= sameRatezmList[1].price
        row.minFreight2 = sameRatezmList[1].minFreight;
        row.slabFrom2 = sameRatezmList[1].slabFrom;
        row.slabTo2 = sameRatezmList[1].slabTo;
        this.zmslabto2 = sameRatezmList[1].slabTo;
        this.zmslabfrom2 = sameRatezmList[1].slabFrom;
      }
      if(this.CommercialDataModel.ZonalSlabCounter == 3 || this.CommercialDataModel.ZonalSlabCounter>3){
        row.id3 = sameRatezmList[2].id;
        row.price3= sameRatezmList[2].price
        row.minFreight3 = sameRatezmList[2].minFreight;
        row.slabFrom3 = sameRatezmList[2].slabFrom;
        row.slabTo3 = sameRatezmList[2].slabTo;
        this.zmslabto3 = sameRatezmList[2].slabTo;
        this.zmslabfrom3 = sameRatezmList[2].slabFrom;
      }
      if(this.CommercialDataModel.ZonalSlabCounter == 4 || this.CommercialDataModel.ZonalSlabCounter>4){
        row.id4 = sameRatezmList[3].id;
        row.price4= sameRatezmList[3].price
        row.minFreight4 = sameRatezmList[3].minFreight;
        row.slabFrom4 = sameRatezmList[3].slabFrom;
        row.slabTo4 = sameRatezmList[3].slabTo;
        this.zmslabto4 = sameRatezmList[3].slabTo;
        this.zmslabfrom4 = sameRatezmList[3].slabFrom;
      }
      if(this.CommercialDataModel.ZonalSlabCounter == 5){
        row.id5 = sameRatezmList[4].id;
        row.price5= sameRatezmList[4].price
        row.minFreight5 = sameRatezmList[4].minFreight;
        row.slabFrom5 = sameRatezmList[4].slabFrom;
        row.slabTo5 = sameRatezmList[4].slabTo;
        this.zmslabto5 = sameRatezmList[4].slabTo;
        this.zmslabfrom5 = sameRatezmList[4].slabFrom;
        this.CommercialDataModel.stopZonalSlab=true;
      }
      viewCusRateP.push(row);
      arr = arr.filter((e) => { 
        return !sameRatezmList.some(s =>{ 
            return s.destId === e.destId && s.srcId === e.srcId && s.lkpSrcTypeId === e.lkpSrcTypeId && s.lkpDestTypeId === e.lkpDestTypeId;
        });
    });
    }
    this.CommercialDataModel.zmCustomPrice=viewCusRateP;
  }
  createSlabZmprice(ref){
    
    let viewZm = [];
    for(let rateGrp of ref.rateGroupList){
      let row = new ZmPrice();
      row.zmRgMapId = rateGrp.id;
      if(rateGrp.price>0)
       row.price = rateGrp.price;
      row.slabFrom = this.zmslabfrom1;
      row.slabTo = this.zmslabto1;
      if(this.CommercialDataModel.ZonalSlabCounter == 2 || this.CommercialDataModel.ZonalSlabCounter>2){
        row.slabFrom2 = this.zmslabfrom2;
        row.slabTo2 = this.zmslabto2;
      }
      if(this.CommercialDataModel.ZonalSlabCounter == 3|| this.CommercialDataModel.ZonalSlabCounter>3){
        row.slabFrom3 = this.zmslabfrom3;
        row.slabTo3 = this.zmslabto3;
      }
      if(this.CommercialDataModel.ZonalSlabCounter == 4 || this.CommercialDataModel.ZonalSlabCounter>4){
        row.slabFrom4 = this.zmslabfrom4;
        row.slabTo4 = this.zmslabto4;
      }
      if(this.CommercialDataModel.ZonalSlabCounter == 5){
        row.slabFrom5 = this.zmslabfrom5;
        row.slabTo5 = this.zmslabto5;
        this.CommercialDataModel.stopZonalSlab=true;
      }
      viewZm.push(row);
    }
    this.CommercialDataModel.zmPrice=viewZm;
  }

  editZmPrice(ref,data){

    let viewZm = [];
    for(let rateGrp of ref.rateGroupList){
      let sameRatezmList = []
      for(let zmprice of data.zmPrice){
        if(rateGrp.id == zmprice.zmRgMapId){
          sameRatezmList.push(zmprice)
        }
      }
      this.CommercialDataModel.ZonalSlabCounter = sameRatezmList.length;
      let row = new ZmPrice();
      sameRatezmList = sameRatezmList.sort((a,b) => a.slabFrom-b.slabFrom);
      row.zmRgMapId = sameRatezmList[0].zmRgMapId;
      row.id = sameRatezmList[0].id;
      row.price= sameRatezmList[0].price
      row.minFreight = sameRatezmList[0].minFreight;
      row.slabFrom = sameRatezmList[0].slabFrom;
      row.slabTo = sameRatezmList[0].slabTo;
      this.zmslabto1 = sameRatezmList[0].slabTo;
      this.zmslabfrom1 = sameRatezmList[0].slabFrom;
      if(this.CommercialDataModel.ZonalSlabCounter == 2 || this.CommercialDataModel.ZonalSlabCounter>2){
        row.id2 = sameRatezmList[1].id;
        row.price2= sameRatezmList[1].price
        row.minFreight2 = sameRatezmList[1].minFreight;
        row.slabFrom2 = sameRatezmList[1].slabFrom;
        row.slabTo2 = sameRatezmList[1].slabTo;
        this.zmslabto2 = sameRatezmList[1].slabTo;
        this.zmslabfrom2 = sameRatezmList[1].slabFrom;
      }
      if(this.CommercialDataModel.ZonalSlabCounter == 3 || this.CommercialDataModel.ZonalSlabCounter>3){
        row.id3 = sameRatezmList[2].id;
        row.price3= sameRatezmList[2].price
        row.minFreight3 = sameRatezmList[2].minFreight;
        row.slabFrom3 = sameRatezmList[2].slabFrom;
        row.slabTo3 = sameRatezmList[2].slabTo;
        this.zmslabto3 = sameRatezmList[2].slabTo;
        this.zmslabfrom3 = sameRatezmList[2].slabFrom;
      }
      if(this.CommercialDataModel.ZonalSlabCounter == 4 || this.CommercialDataModel.ZonalSlabCounter>4){
        row.id4 = sameRatezmList[3].id;
        row.price4= sameRatezmList[3].price
        row.minFreight4 = sameRatezmList[3].minFreight;
        row.slabFrom4 = sameRatezmList[3].slabFrom;
        row.slabTo4 = sameRatezmList[3].slabTo;
        this.zmslabto4 = sameRatezmList[3].slabTo;
        this.zmslabfrom4 = sameRatezmList[3].slabFrom;
      }
      if(this.CommercialDataModel.ZonalSlabCounter ==5){
        row.id5 = sameRatezmList[4].id;
        row.price5= sameRatezmList[4].price
        row.minFreight5 = sameRatezmList[4].minFreight;
        row.slabFrom5 = sameRatezmList[4].slabFrom;
        row.slabTo5 = sameRatezmList[4].slabTo;
        this.zmslabto5 = sameRatezmList[4].slabTo;
        this.zmslabfrom5 = sameRatezmList[4].slabFrom;
        this.CommercialDataModel.stopZonalSlab=true;
      }
      viewZm.push(row);
    }
    this.CommercialDataModel.zmPrice=viewZm;
  }

  editSafextCharge(success){
    if(this.successDataForCommer){
      this.CommercialDataModel.safextCharge=this.successDataForCommer.safextCharge
    }
    let viewSafextCharge = [];
    let arr = success.safextCharge;
    for(let i=0; i< arr.length ;){
      let sameRatezmList = []
      for(let j=0; j< arr.length ;j++){
        if(arr[i].safextEntityId == arr[j].safextEntityId && arr[i].safextCtgy==arr[j].safextCtgy){
          sameRatezmList.push(arr[j]);
        }
      }
      sameRatezmList = sameRatezmList.sort((a,b) => a.slabFrom-b.slabFrom);
      let row = new SafextCharge();
      row.safextCtgy = sameRatezmList[0].safextCtgy
      row.lkpSafextLevelId = sameRatezmList[0].lkpSafextLevelId
      row.safextEntityId = sameRatezmList[0].safextEntityId
      row.id = sameRatezmList[0].id;
      row.price= sameRatezmList[0].price
      row.minAmt = sameRatezmList[0].minAmt;
      row.slabFrom = sameRatezmList[0].slabFrom;
      row.slabTo = sameRatezmList[0].slabTo;
      if(this.CommercialDataModel.ZonalSlabCounter == 2 || this.CommercialDataModel.ZonalSlabCounter>2){
        row.id2 = sameRatezmList[1].id;
        row.price2= sameRatezmList[1].price
        row.minAmt2 = sameRatezmList[1].minAmt;
        row.slabFrom2 = sameRatezmList[1].slabFrom;
        row.slabTo2 = sameRatezmList[1].slabTo;
      }
      if(this.CommercialDataModel.ZonalSlabCounter == 3 || this.CommercialDataModel.ZonalSlabCounter>3){
        row.id3 = sameRatezmList[2].id;
        row.price3= sameRatezmList[2].price
        row.minAmt3 = sameRatezmList[2].minAmt;
        row.slabFrom3 = sameRatezmList[2].slabFrom;
        row.slabTo3 = sameRatezmList[2].slabTo;
      }
      if(this.CommercialDataModel.ZonalSlabCounter == 4 || this.CommercialDataModel.ZonalSlabCounter>4){
        row.id4 = sameRatezmList[3].id;
        row.price4= sameRatezmList[3].price
        row.minAmt4 = sameRatezmList[3].minAmt;
        row.slabFrom4 = sameRatezmList[3].slabFrom;
        row.slabTo4 = sameRatezmList[3].slabTo;
      }
      if(this.CommercialDataModel.ZonalSlabCounter == 5){
        row.id5 = sameRatezmList[4].id;
        row.price5= sameRatezmList[4].price
        row.minAmt5 = sameRatezmList[4].minAmt;
        row.slabFrom5 = sameRatezmList[4].slabFrom;
        row.slabTo5 = sameRatezmList[4].slabTo;
      }
      viewSafextCharge.push(row);
      arr = arr.filter((e) => { 
        return !sameRatezmList.some(s =>{ 
            return s.safextEntityId === e.safextEntityId && s.safextCtgy === e.safextCtgy ;
        });
    });
    }
    this.CommercialDataModel.safextCharge=viewSafextCharge; 
    this.addGrpNames();
  }
  addGrpNames(){
    let isType:string;
    for(let slid of this.ReferenceDataModel.safexLevelList){
      if(slid.id == this.CommercialDataModel.safeextTypeFlag){
        isType=slid.lookupVal;
      }
    }
    if(isType=='PINCODE'){
      for(let data of this.CommercialDataModel.safextCharge){
        for(let pinRef of this.ReferenceDataModel.safexTypeList){
          if(pinRef.id==data.safextEntityId){
            data["groupName"]=pinRef.lookupVal;
          }
        }
      }
    }
    if(isType=='STATE'){
      for(let data of this.CommercialDataModel.safextCharge){
        for(let stateRef of this.ReferenceDataModel.stateTypeList){
          if(stateRef.id==data.safextEntityId){
            data["groupName"]=stateRef.lookupVal;
          }
        }
      }
    }
    
  }
  editSafextBkngCustomCharge(success){
    
    let viewBkngCusRateP = [];
    let arr = success.safextBkngCustomCharge;
    for(let i=0; i< arr.length ;){
      let sameRatezmList = []
      for(let j=0; j< arr.length ;j++){
        if(arr[i].toId == arr[j].toId){
          sameRatezmList.push(arr[j]);
        }
      }
      sameRatezmList = sameRatezmList.sort((a,b) => a.slabFrom-b.slabFrom);
      let row = new SafextBkngCustomCharge();
      row.lkpSrcTypeId = sameRatezmList[0].lkpSrcTypeId
      if(row.lkpSrcTypeId!=this.sfxPincodeTypeId){
        row.stateNamesto = this.covertStateIdToStateName(sameRatezmList[0].toId);
      }
      row.toId = sameRatezmList[0].toId;
      row.id = sameRatezmList[0].id;
      row.price= sameRatezmList[0].price
      row.minAmt = sameRatezmList[0].minAmt;
      row.slabFrom = sameRatezmList[0].slabFrom;
      row.slabTo = sameRatezmList[0].slabTo;
      if(this.CommercialDataModel.ZonalSlabCounter == 2 || this.CommercialDataModel.ZonalSlabCounter>2){
        row.id2 = sameRatezmList[1].id;
        row.price2= sameRatezmList[1].price
        row.minAmt2 = sameRatezmList[1].minAmt;
        row.slabFrom2 = sameRatezmList[1].slabFrom;
        row.slabTo2 = sameRatezmList[1].slabTo;
      }
      if(this.CommercialDataModel.ZonalSlabCounter == 3 || this.CommercialDataModel.ZonalSlabCounter> 3){
        row.id3 = sameRatezmList[2].id;
        row.price3= sameRatezmList[2].price
        row.minAmt3 = sameRatezmList[2].minAmt;
        row.slabFrom3 = sameRatezmList[2].slabFrom;
        row.slabTo3 = sameRatezmList[2].slabTo;
      }
      if(this.CommercialDataModel.ZonalSlabCounter == 4 || this.CommercialDataModel.ZonalSlabCounter> 4){
        row.id4 = sameRatezmList[3].id;
        row.price4= sameRatezmList[3].price
        row.minAmt4 = sameRatezmList[3].minAmt;
        row.slabFrom4 = sameRatezmList[3].slabFrom;
        row.slabTo4 = sameRatezmList[3].slabTo;
      }
      if(this.CommercialDataModel.ZonalSlabCounter == 5){
        row.id5 = sameRatezmList[4].id;
        row.price5= sameRatezmList[4].price
        row.minAmt5 = sameRatezmList[4].minAmt;
        row.slabFrom5 = sameRatezmList[4].slabFrom;
        row.slabTo5 = sameRatezmList[4].slabTo;
      }
      viewBkngCusRateP.push(row);
      arr = arr.filter((e) => { 
        return !sameRatezmList.some(s =>{ 
            return s.toId === e.toId;
        });
    });
    }
    this.CommercialDataModel.safextBkngCustomCharge=viewBkngCusRateP;
  }

  editSafextDlvryCustomCharge(success){
    let viewDlvryCusRateP = [];
    let arr = success.safextDlvryCustomCharge;
    for(let i=0; i< arr.length ;){
      let sameRatezmList = []
      for(let j=0; j< arr.length ;j++){
        if(arr[i].fromId == arr[j].fromId){
          sameRatezmList.push(arr[j]);
        }
      }
      sameRatezmList = sameRatezmList.sort((a,b) => a.slabFrom-b.slabFrom);
      let row = new SafextDlvryCustomCharge();
      row.lkpDestTypeId = sameRatezmList[0].lkpDestTypeId
      if(row.lkpDestTypeId!=this.sfxPincodeTypeId){
        row.stateNamesfrom = this.covertStateIdToStateName(row.fromId = sameRatezmList[0].fromId);
      }
      row.fromId = sameRatezmList[0].fromId
      row.id = sameRatezmList[0].id;
      row.price= sameRatezmList[0].price
      row.minAmt = sameRatezmList[0].minAmt;
      row.slabFrom = sameRatezmList[0].slabFrom;
      row.slabTo = sameRatezmList[0].slabTo;
      if(this.CommercialDataModel.ZonalSlabCounter == 2 || this.CommercialDataModel.ZonalSlabCounter>2){
        row.id2 = sameRatezmList[1].id;
        row.price2= sameRatezmList[1].price
        row.minAmt2 = sameRatezmList[1].minAmt;
        row.slabFrom2 = sameRatezmList[1].slabFrom;
        row.slabTo2 = sameRatezmList[1].slabTo;
      }
      if(this.CommercialDataModel.ZonalSlabCounter == 3 || this.CommercialDataModel.ZonalSlabCounter > 3){
        row.id3 = sameRatezmList[2].id;
        row.price3= sameRatezmList[2].price
        row.minAmt3 = sameRatezmList[2].minAmt;
        row.slabFrom3 = sameRatezmList[2].slabFrom;
        row.slabTo3 = sameRatezmList[2].slabTo;
      }
      if(this.CommercialDataModel.ZonalSlabCounter == 4 || this.CommercialDataModel.ZonalSlabCounter > 4){
        row.id4 = sameRatezmList[3].id;
        row.price4= sameRatezmList[3].price
        row.minAmt4 = sameRatezmList[3].minAmt;
        row.slabFrom4 = sameRatezmList[3].slabFrom;
        row.slabTo4 = sameRatezmList[3].slabTo;
      }
      if(this.CommercialDataModel.ZonalSlabCounter == 5){
        row.id5 = sameRatezmList[4].id;
        row.price5= sameRatezmList[4].price
        row.minAmt5 = sameRatezmList[4].minAmt;
        row.slabFrom5 = sameRatezmList[4].slabFrom;
        row.slabTo5 = sameRatezmList[4].slabTo;
      }
      viewDlvryCusRateP.push(row);
      arr = arr.filter((e) => { 
        return !sameRatezmList.some(s =>{ 
            return s.fromId === e.fromId;
        });
    });
    }
    this.CommercialDataModel.safextDlvryCustomCharge=viewDlvryCusRateP;
  }
  quantityOfCharge="Per Kg";
  maxLength:number=8;
  clearingValues(){
    this.prdListChk = false;
    this.CommercialDataModel.commercialProductMap = [];
    this.toppings = new FormControl();
    if(this.CommercialDataModel.id){
      if(this.initialChargeByValue==this.CommercialDataModel.lkpChrgById){
        this.getCommercialDetailbyId(this.CommercialDataModel.id);
      }else{
        this.CommercialDataModel.slabFlag = 0;
        this.slabHandleforZonal(0);
        this.CommercialDataModel.zmPrice =[]
        this.zonalGroupName()
        this.clearCommercialData();
      }
    }else{
      this.CommercialDataModel.slabFlag = 0;
      this.slabHandleforZonal(0);
      this.CommercialDataModel.zmPrice =[]
      this.zonalGroupName()
      this.clearCommercialData();
    }
  }
  clearCommercialData(){
    for(let zmP of this.CommercialDataModel.zmPrice){
      if(zmP.price2)zmP.price2=null;
      if(zmP.minFreight2)zmP.minFreight2=null;
      if(zmP.price3)zmP.price3=null;
      if(zmP.minFreight3)zmP.minFreight3=null;
      if(zmP.price4)zmP.price4=null;
      if(zmP.minFreight4)zmP.minFreight4=null;
      if(zmP.price5)zmP.price5=null;
      if(zmP.minFreight5)zmP.minFreight5=null;
    }
    for(let zmCP of this.CommercialDataModel.zmCustomPrice){
      if(zmCP.price)zmCP.price=null;
      if(zmCP.minFreight)zmCP.minFreight=null;
      if(zmCP.price2)zmCP.price2=null;
      if(zmCP.minFreight2)zmCP.minFreight2=null;
      if(zmCP.price3)zmCP.price3=null;
      if(zmCP.minFreight3)zmCP.minFreight3=null;
      if(zmCP.price4)zmCP.price4=null;
      if(zmCP.minFreight4)zmCP.minFreight4=null;
      if(zmCP.price5)zmCP.price5=null;
      if(zmCP.minFreight5)zmCP.minFreight5=null;
    }
    for(let sfxR of this.CommercialDataModel.safextCharge){
      if(sfxR.price)sfxR.price=null;
      if(sfxR.minAmt)sfxR.minAmt=null;
      if(sfxR.price2)sfxR.price2=null;
      if(sfxR.minAmt2)sfxR.minAmt2=null;
      if(sfxR.price3)sfxR.price3=null;
      if(sfxR.minAmt3)sfxR.minAmt3=null;
      if(sfxR.price4)sfxR.price4=null;
      if(sfxR.minAmt4)sfxR.minAmt4=null;
      if(sfxR.price5)sfxR.price5=null;
      if(sfxR.minAmt5)sfxR.minAmt5=null;
    }
    for(let sfxRDlvr of this.CommercialDataModel.safextDlvryCustomCharge){
      if(sfxRDlvr.price)sfxRDlvr.price=null;
      if(sfxRDlvr.minAmt)sfxRDlvr.minAmt=null;
      if(sfxRDlvr.price2)sfxRDlvr.price2=null;
      if(sfxRDlvr.minAmt2)sfxRDlvr.minAmt2=null;
      if(sfxRDlvr.price3)sfxRDlvr.price3=null;
      if(sfxRDlvr.minAmt3)sfxRDlvr.minAmt3=null;
      if(sfxRDlvr.price4)sfxRDlvr.price4=null;
      if(sfxRDlvr.minAmt4)sfxRDlvr.minAmt4=null;
      if(sfxRDlvr.price5)sfxRDlvr.price5=null;
      if(sfxRDlvr.minAmt5)sfxRDlvr.minAmt5=null;
    }
    for(let sfxRBkg of this.CommercialDataModel.safextBkngCustomCharge){
      if(sfxRBkg.price)sfxRBkg.price=null;
      if(sfxRBkg.minAmt)sfxRBkg.minAmt=null;
      if(sfxRBkg.price2)sfxRBkg.price2=null;
      if(sfxRBkg.minAmt2)sfxRBkg.minAmt2=null;
      if(sfxRBkg.price3)sfxRBkg.price3=null;
      if(sfxRBkg.minAmt3)sfxRBkg.minAmt3=null;
      if(sfxRBkg.price4)sfxRBkg.price4=null;
      if(sfxRBkg.minAmt4)sfxRBkg.minAmt4=null;
      if(sfxRBkg.price5)sfxRBkg.price5=null;
      if(sfxRBkg.minAmt5)sfxRBkg.minAmt5=null;
    }
  }
  changeChargeBy(id){
    for(let chargeby of this.ReferenceDataModel.chargeByList){
      if(chargeby.id==id){
        if(chargeby.lookupVal=='BY WEIGHT'){
        this.CommercialDataModel.lkpChrgByWeight = true;
        this.CommercialDataModel.lkpChrgByPiece = false;
        this.quantityOfCharge= 'Per Kg'
        this.maxLength = 8;
        }
        else if(chargeby.lookupVal=='BY PIECE'){
        this.CommercialDataModel.lkpChrgByWeight = false;
        this.CommercialDataModel.lkpChrgByPiece = true;
        this.quantityOfCharge= 'Per Piece'
        this.maxLength = 8;
        }
        else if(chargeby.lookupVal=='BY PACKAGE'){
          this.CommercialDataModel.lkpChrgByWeight = false;
        this.CommercialDataModel.lkpChrgByPiece = false;
          this.quantityOfCharge= 'Per Package'
          this.maxLength = 8;
        }
        else if(chargeby.lookupVal=='BY INVOICE WITH GST'){
          this.CommercialDataModel.lkpChrgByWeight = false;
        this.CommercialDataModel.lkpChrgByPiece = false;
          this.quantityOfCharge= 'In Percentage'
          this.maxLength = 5;
        }
        else if(chargeby.lookupVal=='BY INVOICE W/O GST'){
        this.CommercialDataModel.lkpChrgByWeight = false;
        this.CommercialDataModel.lkpChrgByPiece = false;
          this.quantityOfCharge= 'In Percentage'
          this.maxLength = 5;
        }
       else{
        this.CommercialDataModel.lkpChrgByWeight = false;
        this.CommercialDataModel.lkpChrgByPiece = false;
       } 
      }
    }
  }
  deleteCommercialDetailbyId(id) {
    event.stopPropagation();

    const dialogRefEdit = this.dialog.open(confimationdialog,{

      data:{message:"Are you sure you want to delete this Commercial ?"},
          disableClose: true,
          panelClass: 'creditDialog',
          width: '300px'
        });
  
    dialogRefEdit.afterClosed().subscribe(result => {
      if(result){
        if (id) {
          this.spinner.show();
          this.contractservice.deleteCommercialDetailbyId(id,this.editflow,AppSetting.contractId).subscribe(success => {
            let ob = ErrorConstants.validateException(success);
            if (ob.isSuccess) {
              this.spinner.hide();
              this.tosterservice.info("DELETE SUCCESS");
              this.getCommercialDetail(false);
             }
            else {
              this.tosterservice.error("DELETE UNSUCCESSFULL");
              this.spinner.hide();
            }
          },
            error => {
              this.tosterservice.error(ErrorConstants.getValue(404));
              this.spinner.hide();
            });
        }
      }
      console.log('The dialog was closed with pinocde ' ,result);
    });
  }
  removeAllIdsForCopy(d) {
      d.ratecardId= this.model.id;
      for (let child of d.zmPrice) {
        child.id = null;
      }
      for (let child of d.zmCustomPrice) {
        child.id = null;
      }
      for (let child of d.safextCharge) {
        child.id = null;
      }
      for (let child of d.safextDlvryCustomCharge) {
        child.id = null;
      }
      for (let child of d.safextBkngCustomCharge) {
        child.id = null;
      }
      for (let child of d.commercialProductMap) {
        child.id = null;
      }
      for (let child of d.pricingParamTrans) {
        child.id = null;
      }
  }
  successDataForCommer:any;
  SuccessDataRef:any
  deactivateOldIdsData:any;
  selectedId: any = '';
  selectedIdcmd:any;
  initialChargeByValue:any;
  stateTypeId:any;
  sfxPincodeTypeId:any;
  cityTypeId:any;
  cityDataRef:any;
  getCommercialDetailbyId(id){
    this.selectedId = id;
    this.spinner.show();
    let commercialId;
    if(id){
     commercialId = id
     this.commercial_id = id;
    }
   var serviceofferingid
   for(let data of this.offerings){
    if(data.id==this.model.offeringId){     
       serviceofferingid=data.serviceOfferingId}
   }
    if(!this.model.id){
      this.tosterservice.error('No Rate Card Selected !!')
      this.third.close();
      this.spinner.hide();
      return;
    }
    if(this.isCopyRateCard){
      this.oldCommerIdForCmdCopy = this.selectedId;
    }
    this.four.close();
    if(this.commSurface)this.commSurface.resetForm();
    if(this.bookCustMaster)this.bookCustMaster.resetForm();
    if(this.zonalSlab)this.zonalSlab.resetForm();
    if(this.rateMapping)this.rateMapping.resetForm();
    if(this.delCustMaster)this.delCustMaster.resetForm();
    this.show= false;
    this.showArray= false;
    this.showArray2= false;
    this.showArray3= false;
    this.showArray4= false;
    this.prdListChk=false;
    this.zmslabto1= 100;
    this.zmslabfrom1= 0;
    this.toppings = new FormControl();
    this.cityMap = new Map();
    this.contractservice.getCommercialDetailbyId(commercialId, serviceofferingid, this.model.zoneMtxId,this.editflow)

      .subscribe(success => {
        let ob = ErrorConstants.validateException(success);
        if(ob.isSuccess){

          if(success.data.referenceData.rateGroupList.length==0){
            this.tosterservice.error('No Groups found in Zone Matrix !!')
            this.spinner.hide();
            return;
          }

        var SuccessData:any
        SuccessData = success.data.responseData;
        if(this.isCopyRateCard && SuccessData){
          for(let idsCheck of this.oldCommercialIdList){
            if(idsCheck.id==this.selectedId)
            this.removeAllIdsForCopy(SuccessData);
          }
        }
        this.SuccessDataRef = success.data.referenceData;
        this.successDataForCommer = SuccessData;
        this.CommercialDataModel = new CommercialDataModel();
        this.ReferenceDataModel = new ReferenceDataModel();
        this.CommercialDataModel.ZonalSlabCounter = 0;
        this.CommercialDataModel["ratecardId"]=this.model.id;
        this.CommercialDataModel["contractId"]=AppSetting.contractId;
        this.CommercialDataModel.slabFlag = 0
        this.CommercialDataModel.gstinFlag = 1
        this.CommercialDataModel.rateType = 'CONTRACTUAL'
        this.CommercialDataModel.safextFlag = 1
        this.CommercialDataModel.zmPrice = [];
        this.CommercialDataModel.safextBkngCustomCharge = []
        this.CommercialDataModel.safextDlvryCustomCharge = []
        this.CommercialDataModel.safextCharge = []
        this.CommercialDataModel.zmCustomPrice = [];
        this.CommercialDataModel.commercialProductMap = []
        this.CommercialDataModel.sfxStatePinList = []
        this.deactivateOldIdsData = {}
        this.ReferenceDataModel.srcDestList = this.SuccessDataRef.srcDestList;
        this.cityDataRef = this.SuccessDataRef.cityListMap;
        this.cityDataRef && this.cityDataRef.forEach(ele => {
          this.cityMap.set(ele.id.toString(),ele.cityName);
        });
        this.ReferenceDataModel.srcDestList.forEach((ele,index,object)=>{
          if (ele.lookupVal === 'DISTRICT') {
            object.splice(index, 1);
          }
          if (ele.lookupVal === 'STATE') {
            this.stateTypeId= ele.id;
          }
          if (ele.lookupVal === 'CITY') {
            this.cityTypeId = ele.id;
          }
        });
        this.ReferenceDataModel.safexLevelList = this.SuccessDataRef.safexLevelList
        this.ReferenceDataModel.safexLevelList.forEach((slId)=>{
          if (slId.lookupVal === 'PINCODE'){
            this.sfxPincodeTypeId = slId.id;
          }
        });
        if(SuccessData){
          this.deactivateOldIdsData = JSON.parse(JSON.stringify(SuccessData));
          if (SuccessData.zmPrice.length > 0) {
            //size check
            let refLength = this.SuccessDataRef.rateGroupList.length;
            let map = new Map();
            for (let ids of SuccessData.zmPrice) {
              map.set(ids.zmRgMapId, "zmRgMapId");
            }
            let zmDataLength = map.size;
            if (refLength == zmDataLength) {
              for (let ids of SuccessData.zmPrice) {
                let isIdNotFound = false;
                for (let testdata of this.SuccessDataRef.rateGroupList) {
                  if (testdata.id == ids.zmRgMapId)
                    isIdNotFound = true;
                }
                if (!isIdNotFound) {
                  SuccessData.zmPrice = [];
                  break;
                }
              }
            } else {
              SuccessData.zmPrice = [];
            }
          }
          this.CommercialDataModel.commercialProductMap = SuccessData.commercialProductMap;
          this.CommercialDataModel.gstTypeId = SuccessData.gstTypeId
          this.CommercialDataModel.gstinFlag = SuccessData.gstinFlag
          this.CommercialDataModel.id = SuccessData.id
          this.CommercialDataModel.lkpChrgById = SuccessData.lkpChrgById
          this.initialChargeByValue = JSON.parse(JSON.stringify(SuccessData.lkpChrgById));
          this.CommercialDataModel.lkpPackTypeId = SuccessData.lkpPackTypeId
          this.CommercialDataModel.lkpSlabProtectionId = SuccessData.lkpSlabProtectionId
          this.CommercialDataModel.packAlias = SuccessData.packAlias
          this.CommercialDataModel.prdctCtgyId = SuccessData.prdctCtgyId
          this.CommercialDataModel.pricingParamTrans = SuccessData.pricingParamTrans
          this.CommercialDataModel.rateType = SuccessData.rateType
          this.CommercialDataModel.ratecardId = SuccessData.ratecardId
          this.CommercialDataModel.safextFlag = SuccessData.safextFlag
          this.CommercialDataModel.slabFlag = SuccessData.slabFlag
          this.CommercialDataModel.safextCharge = SuccessData.safextCharge
          if (this.CommercialDataModel.slabFlag) {
            if (SuccessData.zmCustomPrice.length > 0) {
              this.editCustomRatePrice(SuccessData);
            }
            if(SuccessData.zmPrice.length>0){
              this.editZmPrice(this.SuccessDataRef, SuccessData);
            }else{
              this.createSlabZmprice(this.SuccessDataRef);
            }
          }
          else {
            this.CommercialDataModel.zmPrice = SuccessData.zmPrice
            this.CommercialDataModel.zmCustomPrice = SuccessData.zmCustomPrice
          }

          for (let safextChargeitem of SuccessData.safextCharge) {
            if (safextChargeitem.safextCtgy == 'BOOKING') {
              this.CommercialDataModel.bookingFlag = true;
            }
            if (safextChargeitem.safextCtgy == 'DELIVERY') {
              this.CommercialDataModel.deliveryFlag = true;
            }
          }
          

          if (this.CommercialDataModel.slabFlag && this.CommercialDataModel.safextFlag) {
            if (SuccessData.safextBkngCustomCharge.length > 0) {
              this.editSafextBkngCustomCharge(SuccessData)
            }
            if (SuccessData.safextDlvryCustomCharge.length > 0) {
              this.editSafextDlvryCustomCharge(SuccessData)
            }

          } else {
            this.CommercialDataModel.safextBkngCustomCharge = SuccessData.safextBkngCustomCharge
            for(let sfxbkg of this.CommercialDataModel.safextBkngCustomCharge){
              if(sfxbkg.lkpSrcTypeId!=this.sfxPincodeTypeId){
                sfxbkg.stateNamesto = this.covertStateIdToStateName(sfxbkg.toId);
              }
            }
            this.CommercialDataModel.safextDlvryCustomCharge = SuccessData.safextDlvryCustomCharge
            for(let sfxDlvr of this.CommercialDataModel.safextDlvryCustomCharge){
              if(sfxDlvr.lkpDestTypeId!=this.sfxPincodeTypeId){
                sfxDlvr.stateNamesfrom = this.covertStateIdToStateName(sfxDlvr.fromId);
              }
            }
          }
          this.productListData();
        }
        if(this.SuccessDataRef){
          this.ReferenceDataModel.chargeByList = this.SuccessDataRef.chargeByList
          this.ReferenceDataModel.productCategoryList = this.SuccessDataRef.productCategoryList
          this.ReferenceDataModel.packagingTypeList = this.SuccessDataRef.packagingTypeList
          this.ReferenceDataModel.slabProtectTypeList = this.SuccessDataRef.slabProtectTypeList
          this.ReferenceDataModel.safexTypeList = this.SuccessDataRef.safexTypeList
          this.ReferenceDataModel.rateGroupList = this.SuccessDataRef.rateGroupList
          this.ReferenceDataModel.pricingParam = this.SuccessDataRef.pricingParam?this.SuccessDataRef.pricingParam:[];
          this.ReferenceDataModel.pricingCalculationTypeList = this.SuccessDataRef.pricingCalculationTypeList
          this.ReferenceDataModel.pricingCalculationUnitList = this.SuccessDataRef.pricingCalculationUnitList
          this.ReferenceDataModel.attrTypeList = this.SuccessDataRef.attrTypeList
          this.ReferenceDataModel.gstTypeList = this.SuccessDataRef.gstTypeList
          this.ReferenceDataModel.safextStateWise = this.SuccessDataRef.safextStateWise;
          if(this.ReferenceDataModel.gstTypeList.length==1){
            this.CommercialDataModel.gstTypeId = this.ReferenceDataModel.gstTypeList[0].id;
          }
          this.ReferenceDataModel.safextStateWise.forEach((ele)=>{
            ele.stateId = ele.stateId.toString();
          });
          this.ReferenceDataModel.stateTypeList = this.SuccessDataRef.stateTypeList;
          this.ReferenceDataModel.statusList = this.SuccessDataRef.statusList;
          if (!SuccessData) {

            for (let chargeby of this.ReferenceDataModel.chargeByList) {
              if (chargeby.lookupVal == 'BY WEIGHT') {
                this.CommercialDataModel.lkpChrgById = chargeby.id;
                this.CommercialDataModel.lkpChrgByWeight = true;
                this.CommercialDataModel.lkpChrgByPiece = false;
              }
            }
            this.changeChargeBy(this.CommercialDataModel.lkpChrgById);
            for (let catItem of this.ReferenceDataModel.productCategoryList) {
              if (catItem.prdctCtgy == 'GENERAL') {
                this.CommercialDataModel.prdctCtgyId = catItem.id;
              }
            }
            this.CommercialDataModel.deliveryFlag=true;
            for (let slId of this.ReferenceDataModel.safexLevelList) {
                if (slId.lookupVal === 'PINCODE'){
                  this.CommercialDataModel.safeextTypeFlag = slId.id;
                  this.CommercialDataModel.safeextTypeName = slId.lookupVal
                }
              }
            this.createDlvrBkgList();
          }else{
            this.changeChargeBy(this.CommercialDataModel.lkpChrgById);
            if (SuccessData.safextCharge.length > 0) {
              this.CommercialDataModel.safeextTypeFlag = SuccessData.safextCharge[0].lkpSafextLevelId
              for (let slId of this.ReferenceDataModel.safexLevelList) {
                if (slId.id === this.CommercialDataModel.safeextTypeFlag)
                  this.CommercialDataModel.safeextTypeName = slId.lookupVal
              }
              if(this.CommercialDataModel.slabFlag && this.CommercialDataModel.safextFlag){
                this.editSafextCharge(this.successDataForCommer);
              }else {
                this.addsafexDeliveryCharges();
                this.addsafexBookingCharges();
              }
              let idDlvrEmpty = true;
              let idBkgEmpty = true;
              let isType:string
              for(let slid of this.ReferenceDataModel.safexLevelList){
                if(slid.id == this.CommercialDataModel.safeextTypeFlag){
                  isType=slid.lookupVal;
                }
              }
              for(let frshData of this.CommercialDataModel.safextCharge){
                if(frshData.safextCtgy=='DELIVERY') idDlvrEmpty = false;
                if(frshData.safextCtgy=='BOOKING') idBkgEmpty = false;
              }
              if(idDlvrEmpty)this.createFreshSafexChargeDlvr(isType);
              if(idBkgEmpty)this.createFreshSafexChargeBkg(isType);
            }
            if(this.CommercialDataModel.safextCharge.length==0){
              for (let slId of this.ReferenceDataModel.safexLevelList) {
                if (slId.lookupVal === 'PINCODE'){
                  this.CommercialDataModel.safeextTypeFlag = slId.id;
                  this.CommercialDataModel.safeextTypeName = slId.lookupVal
                }
              }
              this.createDlvrBkgList();
            }

          }
          this.zonalGroupName();
          this.pricingParamData(false);
          if (this.CommercialDataModel.zmCustomPrice.length>0) {
            for (let srcdesc of this.CommercialDataModel.zmCustomPrice) {
              this.addrByaddrType('src', srcdesc,false);
              this.addrByaddrType('desc', srcdesc,false);
            }
          }
        }
          if (this.isCopyRateCard) {
            if (this.isCommercialCopy)
              this.tosterservice.info('Save To Copy All Commercials ! ');
            for (let idsCheck of this.oldCommercialIdList) {
              if (idsCheck.id == this.selectedId)
                this.CommercialDataModel.id = null;
            }
          }
        this.showCommercialData=true;
        this.changeSlabProtion();
        this.spinner.hide();
       
    }else {
      this.tosterservice.error(ob.message);
      this.spinner.hide();
    }
  },
    error => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });

  }
  radioButtonData = []
  selectorData = []
  stringData = []

  productList
  productListData() {
    if(this.CommercialDataModel.prdctCtgyId){
    this.contractservice.productListData(this.CommercialDataModel.prdctCtgyId)
      .subscribe(success => {
        let ob = ErrorConstants.validateException(success);
        if(ob.isSuccess){
        let ar = [];
        for(let item of this.CommercialDataModel.commercialProductMap){
          ar.push(item.productId)
        }
        this.toppings = new FormControl(ar);
        this.productList = success.data.responseData;
      }else {
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }
    },
      error => {
        this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      });
    }

  }
  // commandment
  commandmentInput: any;
  commercialIdForCmdmntFetch: any;
  showcmdnt: any;
  getCommandmentDetailbyId(id){
    this.commercial_id=id
    this.selectedIdcmd=id
    if(id)this.showcmdnt = true;
    this.getCommandmentDetail();
  }
  closeCmdmnt(){
    if(this.four) this.four.close();
  }
  opencmdmnt(){
    this.showcmdnt = false;
    if(!this.model.id){
      this.tosterservice.error('No Rate Card Selected !!')
      this.four.close();
      this.spinner.hide();
      return
    }
    if(this.isCopyRateCard && this.isCommercialCopy){
      this.tosterservice.error('Commercial Not Saved !!')
      this.four.close();
      this.spinner.hide();
      return
    }
    this.third.close();
    if(this.rcCmdLevel=="RATECARD LEVEL"){
      this.getCommandmentDetail();
      this.showcmdnt = true;
    }else{
      this.getCommercialDetail(true);
    }
  }
  getCommandmentDetail() {
    var serviceOfferingId=0;
    if(!this.model.id){
      this.tosterservice.error('No Rate Card Selected !!')
      this.four.close();
      this.spinner.hide();
      return
    }
    for (let data of this.offerings) {
      if (data.id == this.model.offeringId) {
        serviceOfferingId = data.serviceOfferingId
      }
    }
    this.commandmentInput={
      "isEdit":this.editflow,
      "entityId":this.rcCmdLevel=="COMMERCIAL LEVEL"?this.commercial_id:this.model.id,
      "offeringId":serviceOfferingId,
      "level":this.rcCmdLevel=="COMMERCIAL LEVEL"?'COMMERCIAL':'RATECARD',
      "isCopyRateCard":this.isCopyRateCard,
      "copiedRcId":this.copiedRcId,
      "commercialList":this.commercial,
    };
    console.log(this.commandmentInput);
  }

  onCmdmntSaved(iscmdmntsaved: boolean){
    if(iscmdmntsaved){
      this.four.close();
      this.five.open();
      this.getTncDetail();
    }
  }

  onAnyCmdmntSaved(anyCmdmntSaved: boolean){
    if(anyCmdmntSaved){
      if(this.isCopyRateCard){
        this.isCommandmentCopy = false;
      }
  }}
  

  //terms and condition
  removeAllTncIdsForCopy(data){
    let tncData = data.responseData;
    tncData.id=null;
    for(let child of tncData.notepadTrans){
      child.id=null;
    }
  }

  incrementModeList = []
  incrementBasedOnList = []
  todBasedOnList = []
  baseFuelIndexList = []
  fuelTypeList = []
  incrementTypeList = []
  notepadAttributesList = []
  securityTypeList = []
  attrTypeListTnc=[]
  modeltnc:Modeltnc = new Modeltnc();
  
  flfcAppDtType: any[] = [{value: 'FORTNIGHTLY'},
  {value: 'MONTHLY'},{value: 'QUARTERLY'},
  {value: 'HALF YEARLY'},{ value: 'ANNUALLY'}
]
  getTncDetail() {
    if(!this.model.id){
      this.tosterservice.error('No Rate Card Selected !!')
      this.five.close();
      this.spinner.hide();
      return
    }
    if(this.isCopyRateCard && this.isCommandmentCopy){
      this.tosterservice.error('Commandment Not Saved !!')
      this.five.close();
      this.spinner.hide();
      return
    }
    if(this.fTerms)this.fTerms.resetForm();
    let pRateCardId;
    if(this.isCopyRateCard && this.isTncCopy){
      pRateCardId= this.copiedRcId;
    }else{
      pRateCardId= this.model.id;
    }
   // pRateCardId= 860;
   console.log( "ratecard id printing:"+pRateCardId);

   this. incrementModeList = []
   this.incrementBasedOnList = []
   this.todBasedOnList = []
   this.baseFuelIndexList = []
   this.fuelTypeList = []
   this.incrementTypeList = []
   this.notepadAttributesList = []
   this.securityTypeList = []
   this.attrTypeListTnc=[]
   this.modeltnc.flfcAppcblDtType ='';
   this.spinner.show();
   let testDate;
   this.contractservice.getTncdetail(pRateCardId,this.editflow)
      .subscribe(success => {
        let ob = ErrorConstants.validateException(success);
        if(ob.isSuccess){
        this.tnc = success.data;
         this.modeltnc = this.tnc.responseData
         if(this.modeltnc.id==undefined)
         {
          this.modeltnc.fuelDtlsFlag=0;
          this.modeltnc.flfcFlag=0;
          this.modeltnc.flfcAsOnDtFlag=0;
          this.modeltnc.incrClauseFlag=0;
          this.modeltnc.customAmtFlag=0;
          this.modeltnc.insuFlag=0;
          this.modeltnc.excessClauseFlag=0;
          this.modeltnc.securityFlag=0;
          this.modeltnc.pnltyFlag=0;
         }
         this.modeltnc.ratecardId=this.model.id
         this.modeltnc["contractId"] = AppSetting.contractId;
         for(let ft of this.tnc.referenceData.fuelTypeList){
           if(ft.lookupVal=='PETROL'){
           this.modeltnc.lkpFuelTypeId=ft.id
           }
         }
         if(this.modeltnc.baseFuelDt){
           this.priceFound=true;
         }
        for (var item of this.tnc.referenceData.incrementModeList) {

          this.incrementModeList.push(item)
        }
        for (var item of this.tnc.referenceData.incrementBasedOnList) {
          this.incrementBasedOnList.push(item)
        }
        for (var item of this.tnc.referenceData.attrTypeList) {
          this.attrTypeListTnc.push(item)
        }
        for (var item of this.tnc.referenceData.securityTypeList) {
          this.securityTypeList.push(item)
        }
        for (var item of this.tnc.referenceData.notepadAttributesList) {
          if (item.attributeTypeId === 3) {
            item.notepadInputVal = item.attributeValue;
        }
              for (var notepadData of this.modeltnc.notepadTrans){
            if(item.id==notepadData.notepadId && notepadData.notepadInputVal!=undefined){
              item.notepadInputVal=notepadData.notepadInputVal.trim()
              }
            }
            if(item.attributeTypeId==1 || item.attributeTypeId==2){
                if(item.attributeValue)
                item.attributeValue = item.attributeValue.toUpperCase().split(',').map(function(item) {
                  return item.trim();
                });
            }
          this.notepadAttributesList.push(item)
        }
        for (var item of this.tnc.referenceData.incrementTypeList) {
          this.incrementTypeList.push(item)
        }

        if(this.modeltnc.lkpIncrTypeId){
          this.abc(this.modeltnc.lkpIncrTypeId,'onload');
        }

        for (var item of this.tnc.referenceData.fuelTypeList) {
          this.fuelTypeList.push(item)
        }
        for (var item of this.tnc.referenceData.baseFuelIndexList) {
          this.baseFuelIndexList.push(item)
        }
        if(this.modeltnc.lkpFuelIndexId)
          this.getFuelPriceAndDate();
        this.notepadData();
        this.spinner.hide();
          if(this.isCopyRateCard && this.isTncCopy){
            this.tosterservice.info('Save To Copy All TNCs ! ');
            this.removeAllTncIdsForCopy(this.tnc);
            }  
      }else{
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }},
    error => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });
  }

  incType='Month';
  mxlength=2;
  abc(val,type){
    let data=_.find(this.incrementTypeList, { 'id': val});
    if(type=='change'){
      this.modeltnc.incrMnth=null;
    }
    
    if(data.lookupVal=='RECURRING'){
      this.incType='Frequency';
      this.mxlength=2;
    }
    else if(data.lookupVal=='ONE TIME'){
      this.incType='Month';
      this.mxlength=2;
    }
  }


  radioButtontncData = []
  selectortncData = []
  stringtncData = []
  notepadData() {

    for (var item of this.attrTypeListTnc) {
      if (item.id == 1) {
        let data = this.notepadAttributesList.filter(function (filt) {
          return filt.attributeTypeId == 1;
        })
        this.radioButtontncData=data
        console.log("Radio button data filtered here",this.radioButtontncData)
      }
      if (item.id == 2) {
        let data = this.notepadAttributesList.filter(function (filt) {
          return filt.attributeTypeId == 2;
        })
        this.selectortncData=data
        console.log("Selector data filtered here",this.selectortncData)
      }
      if (item.id == 3) {
        let data = this.notepadAttributesList.filter(function (filt) {
          return filt.attributeTypeId == 3;          
        })
        this.stringtncData =data
        console.log("String data filtered here",this.stringtncData)
      }

    }
  }
  
  incClouse(val){
    if(val.value==0){
      this.modeltnc.lkpIncrTypeId=null;
      this.modeltnc.lkpIncrBasedOnId=null;
      this.modeltnc.incrEffectiveDt=null;
      this.modeltnc.customAmtFlag=null;
      this.modeltnc.incrMnth=null;
      this.modeltnc.incrVal=null;
      this.modeltnc.lkpIncrModeId=null;
      this.modeltnc.customAmtToMnth=null;
      this.modeltnc.customAmtFromMnth=null;
      this.modeltnc.customAmt=null;
    }
    else{
      this.modeltnc.customAmt=0;
      this.modeltnc.customAmtFlag=0;
    }
  }

  OnsecurityClauseChange(val){
    if(val.value==0){
      this.modeltnc.lkpSecurityTypeId=null;
      this.modeltnc.bankName=null;
      this.modeltnc.bankIfscCode=null;
      this.modeltnc.securityAmt=null;
      this.modeltnc.bankAddr=null;
      // this.modeltnc.pnltyFlag=null;
      this.modeltnc.securityRefNum=null;
      this.modeltnc.securityProvidedBy=null;
    }
    else{
      this.modeltnc.securityProvidedBy='SAFEXPRESS';
      // this.modeltnc.pnltyFlag=0;
    }
  }


  PenalityClause(val){
    if(val.value==0){
      this.modeltnc.descr=null;
    }
  }


  IsInsured(val){
    if(val.value==0){
      this.modeltnc.insuPolicyNum=null;
      this.modeltnc.insuValidUptoDt=null;
      // this.modeltnc.excessClauseFlag=null;
      this.modeltnc.insuCo=null;
      this.modeltnc.insuVal=null;
    }
    else{
      // this.modeltnc.excessClauseFlag=1;
    }
  }

  excessClause(val){
    if(val.value==0){
      this.modeltnc.excessClauseAmt=null;
    }
  }

  fuelDtlsFlage(val){
    if(val.value==0){
      this.modeltnc.lkpFuelTypeId=null;
      this.modeltnc.lkpFuelIndexId=null;
      this.modeltnc.baseFuelDt=null;
      this.modeltnc.fuelPrice=null;
      this.modeltnc.fuelCalcBasedOn=null;
      this.modeltnc.fuelSurchrg=null;
      this.modeltnc.flfcFlag=0;
      this.modeltnc.flfcClause1=null;
      this.modeltnc.flfcClause2=null;
      this.modeltnc.flfcAsOnDtFlag=0;
      // this.modeltnc.flfcAppcblDt=0;
      this.modeltnc.flfcThresholdMin=null;
      this.modeltnc.flfcThresholdMax=null;
      this.modeltnc.flfcAppcblDt=null;
      this.modeltnc.flfcAppcblDtType=null
      this.modeltnc.fuelSurchrgMeasure=null;
    } else {
      for(let ft of this.tnc.referenceData.fuelTypeList){
        if(ft.lookupVal=='PETROL'){
        this.modeltnc.lkpFuelTypeId=ft.id
        }
      }
    }
  }

  customAmtFlage(val){
    if(val.value==0){
      this.modeltnc.customAmtToMnth=null;
      this.modeltnc.customAmtFromMnth=null;
      this.modeltnc.customAmt=null;
    }
    else{
      this.modeltnc.customAmt=null;
    }
  }
 
  FLFCApp(val){
    if(val.value==0){
      // this.modeltnc.flfcFlag=null;
      this.modeltnc.flfcClause1=null;
      this.modeltnc.flfcClause2=null;
      this.modeltnc.fuelSurchrgMeasure=null;
      this.modeltnc.flfcAsOnDtFlag=0;
      // this.modeltnc.flfcAppcblDt=0;
      this.modeltnc.flfcThresholdMin=null;
      this.modeltnc.flfcThresholdMax=null;
      this.modeltnc.flfcAppcblDt=null;
      this.modeltnc.flfcAppcblDtType=null;
    }
  }


  postTncDetail() {
    //delete this.modeltnc.notepadTrans;
console.log("modeltnc post data"+this.modeltnc)
    var notepadTrans=[]
    this.spinner.show();
   for(let item of this.radioButtontncData){
     let data1={};
      data1["entityRefId"]=this.modeltnc.id;
      data1["notepadId"]=item.id;
      data1["notepadInputVal"]=item.notepadInputVal;
     notepadTrans.push(data1);
    }
    for(let item of this.selectortncData){
        let data1={};
      data1["entityRefId"]=this.modeltnc.id;
      data1["notepadId"]=item.id;
      data1["notepadInputVal"]=item.notepadInputVal;
     notepadTrans.push(data1);
    }

    for(let item of this.stringtncData){
       let data1={};
      data1["entityRefId"]=this.modeltnc.id;
      data1["notepadId"]=item.id;
      data1["notepadInputVal"]=item.notepadInputVal;
     notepadTrans.push(data1);
    }
    

      for(let i=0; i<this.modeltnc.notepadTrans.length;i++) {
    for (let j = 0; j < notepadTrans.length; j++) {
    if(this.modeltnc.notepadTrans[i].notepadId==notepadTrans[j].notepadId)
        {
          notepadTrans[j]["id"]=this.modeltnc.notepadTrans[i].id;
        console.log("i value:",notepadTrans[j]);
          }
          }
}
    this.modeltnc["notepadTrans"] = notepadTrans
      
      var data = this.modeltnc
      console.log(data)
      this.contractservice.postTncdetail(data,this.editflow)
      .subscribe(success => {
        let ob = ErrorConstants.validateException(success);
        if(ob.isSuccess){
        console.log(success.data.responseData, "tncdetail")
        this.tosterservice.success('Saved Successfully');
        this.isTncCopy = false;
          this.five.close();
          if(this.businessType=='ANYWHERE TO ANYWHERE'){
            this.seven.open();
            this.getSLAById();
          }else{
            this.six.open();
            this.getAssignBranchdata();
          }
          this.spinner.hide();
      }else{
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }},
    error => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });


  }


  //on change event of fueltype
fuelData : any = [];  
getFuelPriceAndDate()
{
  this.spinner.show();
  console.log("basefuelindex",this.modeltnc.lkpFuelIndexId,"fueltype",this.modeltnc.lkpFuelTypeId)
   this.contractservice.getFuelPrice(this.modeltnc.lkpFuelIndexId,this.modeltnc.lkpFuelTypeId)
      .subscribe(success => {
        let ob = ErrorConstants.validateException(success);
        if(ob.isSuccess){
         this.fuelData=success.data.responseData;
         if(this.fuelData == undefined || this.fuelData.length==0){
            this.modeltnc.fuelPrice=null;
         }
         else{
         }
         //if(value)this.BaseFuelDate(this.modeltnc);
         this.spinner.hide();
      }
      else{
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }},
    error => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });
  }     

  furlTypeChange(event){
    this.modeltnc.baseFuelDt=null;
    this.modeltnc.lkpFuelIndexId=null;
    this.modeltnc.fuelPrice=null;
  }

  furlIndexChange(){
    this.modeltnc.baseFuelDt=null;
    this.modeltnc.fuelPrice=null;
    this.getFuelPriceAndDate();
  }
//tnc methods ends here
  //vmi
  modelbran = new BranchModel();
  getBranch() {
    this.contractservice.getRateCardDetail(AppSetting.contractId,this.editflow)
      .subscribe(success => { 
        let ob = ErrorConstants.validateException(success);
        if(ob.isSuccess){
        this.vmi = success.data.responseData;
       }else{
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }},
    error => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });
  }

 // SLA code starts here

  slaList: any = [];
  customSlaList: any = [];
  slaDetails : any = [];
  stateList : any = [];
  pincodeList : any = [];
  typeList : any = [];
  safextSlaList : any = [];
  safextCustomSlaList : any = [];
  slaSafexTypeRefList : any = [];
  slaStateTypeRefList : any = [];
  safextPincodeSlaList : any = [];
  safextStateSlaList : any =[];
  fromTypeSLA;
  toTypeSLA;
  stateAddrSla;
  safextTypeVal = 'PINCODE';
  safextTypeId;
  defaultFlagSla : boolean = true;
  slaValidationFlag : boolean = true;
  safextTypeValidationFlag : boolean = true;
  safeExtSlaStateList : any = [];


  clearAllSlaList(){
    this.safextSlaList  = [];
    this.safextCustomSlaList = [];
    this.slaSafexTypeRefList = [];
    this.slaStateTypeRefList = [];
    this.safextPincodeSlaList = [];
    this.safextStateSlaList =[];
    this.safeExtSlaStateList = [];
  }
  
  RRFlagList: any[] = [{ id: 1, value: 'RR', checked: false },
    { id: 0, value: 'Custom', checked: false },
  ]
  
  RRCusFlagList: any[] = [{ id: 1, value: 'RR', checked: false },
  { id: 0, value: 'NA', checked: false },
  { id: 2, value: 'Custom', checked: false },
]
  removeAllSlaIdsForCopy(data){
    let sladataObject = data.data.responseData;
    for(let child of sladataObject.safextSlaDTO){
      child.id=null;
      child.ratecardId=this.model.id;
    }
    for(let child of sladataObject.zmCustomSlaDTO){
      child.id=null;
      child.ratecardId=this.model.id;
    }
    for(let child of sladataObject.zmSlaDTO){
      child.id=null;
      child.ratecardId=this.model.id;
    }
    for(let child of sladataObject.safextCustomSlaDTO){
      child.id=null;
      child.ratecardId=this.model.id;
    }
  }
  updateSlaStatusIds:any
  slasrcDestList:any
  zoneMatrixName:any
  stateTypeIdSLA:any
  cityTypeIdSLA:any;
  cityDataRefSLA:any;
  getSLAById(){
    if(!this.model.id){
      this.tosterservice.error('No Rate Card Selected !!')
      this.seven.close();
      this.spinner.hide();
      return
    }
    this.clearAllSlaList();
    if(this.isCopyRateCard && this.isBranchCopy){
      this.tosterservice.error('Branch is Not Saved !!')
      this.seven.close();
      this.spinner.hide();
      return
    }
    if(this.slaForm)this.slaForm.resetForm();
    if(this.customSla)this.customSla.resetForm();
    if(this.safeExtnType)this.safeExtnType.resetForm();
    for(let zmx of this.zoneMatrix){
      if(zmx.id==this.model.zoneMtxId){
        this.zoneMatrixName = zmx.name;
      }
    }
    let id;
    if(this.isCopyRateCard && this.isSlaCopy){
      id= this.copiedRcId;
    }else{
      id= this.model.id;
    }
	  let zoneMatrixId = this.model.zoneMtxId;
    var serviceOfferingId=0;
    for (let data of this.offerings) {
      if (data.id == this.model.offeringId) {
        serviceOfferingId = data.serviceOfferingId
      }
    }
    this.spinner.show();
	  this.contractservice.getSLAById(id,zoneMatrixId,serviceOfferingId,this.editflow)
	    .subscribe(
	      data => {
          this.updateSlaStatusIds = {}
          let ob = ErrorConstants.validateException(data);
        if(ob.isSuccess){
          this.slaDetails = data;
          if(this.slaDetails.data.referenceData.rateGroupList.length==0){
            this.tosterservice.error('No Groups found in Zone Matrix !!')
            this.seven.close();
            this.spinner.hide();
            return;
          }
          this.cityMap = new Map();
          this.updateSlaStatusIds =  JSON.parse(JSON.stringify(data.data));
          if (this.slaDetails.data.responseData.zmSlaDTO.length > 0) {
            //size check
            let refLength = this.slaDetails.data.referenceData.rateGroupList.length;
            let map = new Map();
            for (let ids of this.slaDetails.data.responseData.zmSlaDTO) {
              map.set(ids.zmRgMapId, "zmRgMapId");
            }
            let zmDataLength = map.size;
            if (refLength == zmDataLength) {
              for (let ids of this.slaDetails.data.responseData.zmSlaDTO) {
                let isIdNotFound = false;
                for (let testdata of this.slaDetails.data.referenceData.rateGroupList) {
                  if (testdata.id == ids.zmRgMapId)
                    isIdNotFound = true;
                }
                if (!isIdNotFound) {
                  this.slaDetails.data.responseData.zmSlaDTO = [];
                  break;
                }
              }
            } else {
              this.slaDetails.data.responseData.zmSlaDTO = [];
            }
          }
          this.typeList = this.slaDetails.data.referenceData.safexLevelList;
          this.slaList = this.slaDetails.data.responseData.zmSlaDTO; 
          this.slaSafexTypeRefList = this.slaDetails.data.referenceData.safexTypeList;
          this.slaStateTypeRefList = this.slaDetails.data.referenceData.stateTypeList;
          this.customSlaList = this.slaDetails.data.responseData.zmCustomSlaDTO;
          this.safextSlaList = this.slaDetails.data.responseData.safextSlaDTO;
          this.slasrcDestList = this.slaDetails.data.referenceData.srcDestList;
          this.slasrcDestList.forEach((ele,index,object)=>{
            if (ele.lookupVal === 'DISTRICT') {
              object.splice(index, 1);
            }
          });
          this.cityDataRefSLA = this.slaDetails.data.referenceData.cityListMap;
          this.cityDataRefSLA && this.cityDataRefSLA.forEach(ele => {
            this.cityMap.set(ele.id.toString(),ele.cityName);
          });
          if(this.slaDetails.data.responseData.safextSlaDTO.length==0){
            this.safextTypeVal='PINCODE'
            this.safextTypeId = this.getAddressTypeId(this.safextTypeVal);
            this.changeSafextType(this.safextTypeVal,this.safextTypeId);
          }else{
            this.safextTypeId = this.slaDetails.data.responseData.safextSlaDTO[0].lkpSafextLevelId;
            this.typeList.forEach(element => {
              if (element.id == this.safextTypeId) {
                this.safextTypeVal = element.lookupVal;
              }
            });
          }
          this.slasrcDestList.forEach((e2) =>{
            if(e2.lookupVal=='STATE')
              this.stateTypeIdSLA = e2.id
            if(e2.lookupVal=='CITY')
              this.cityTypeIdSLA = e2.id;
          });
          // this.safextCustomSlaList = this.slaDetails.data.responseData.safextCustomSlaDTO;
          this.customSlaList.forEach((e1) => {this.slasrcDestList.forEach((e2) =>{
            e1["isNewSla"] = false;
            if(e2.id == e1.lkpSrcTypeId){
              e1['fromTypeSLA'] = e2.lookupVal;
              e1['defaultFlagFromSla'] = false;
            }else{
              e1['defaultFlagFromSla'] = true;
            }
            if(e2.id == e1.lkpDestTypeId){
              e1['toTypeSLA'] = e2.lookupVal;
              e1['defaultFlagToSla'] = false;  
            }else{
              e1['defaultFlagToSla'] = true;  
            }
          });
          if(e1.lkpSrcTypeId==this.stateTypeIdSLA){
              e1.stateNamesfrom = this.covertStateIdToStateName(e1.srcId);
          }
          if(e1.lkpDestTypeId==this.stateTypeIdSLA){
            e1.stateNamesto = this.covertStateIdToStateName(e1.destId);
          }
          if(e1.lkpSrcTypeId==this.cityTypeIdSLA){
            e1.cityNamesfrom = this.covertCityIdToCityName(e1.srcId);
          }
          if(e1.lkpDestTypeId==this.cityTypeIdSLA){
            e1.cityNamesto = this.covertCityIdToCityName(e1.destId);
          }
          
        });
            this.getAllAddress();
            this.getSafextTypeSlaGroups();
            this.getSafextTypeSLA();
            if(this.slaDetails.data.responseData.safextCustomSlaDTO.length>0){
              this.safextTypeVal = this.getAddressTypeValue(this.slaDetails.data.responseData.safextCustomSlaDTO[0].lkpSafextLevelId);
              this.slaDetails.data.responseData.safextCustomSlaDTO.forEach(e => {
                e['isNewSla'] = false;
              });
              this.typeList.forEach(element => {
                  if(element.id == this.slaDetails.data.responseData.safextCustomSlaDTO[0].lkpSafextLevelId){
                    this.changeSafextType(element.lookupVal,element.id);
                    this.safextTypeId = element.id;
                  }
              });
            }
            if(this.slaList.length>0){
	          this.slaList.forEach((sla,index)=>{
              this.slaDetails.data.referenceData.rateGroupList.forEach(rateGroup=>{ 
                if(rateGroup.id === sla.zmRgMapId){
                  sla["rateGroup"] = rateGroup;
                }
              });
              this.changeRRFlagSLA(index, sla.slaRrFlag);
            });}
            else{
              // create 
              this.slaDetails.data.referenceData.rateGroupList.forEach((rateGroup,index)=>{ 
                  let arr:any = {}
                  arr["zmRgMapId"]=rateGroup.id;
                  arr["ratecardId"]=this.model.id
                  arr["rateGroup"] = rateGroup;
                  arr["slaDays"]= rateGroup.sla;
                  if(rateGroup.sla>0){
                  arr["slaRrFlag"] = 1
                }else{
                  arr["slaRrFlag"] = 0
                }
                this.slaList.push(arr);
                this.changeRRFlagSLA(index, arr.slaRrFlag);
              });
            }
            console.log(this.slaDetails);
            this.spinner.hide();
            if(this.isCopyRateCard && this.isSlaCopy){
              this.tosterservice.info('Save To Copy All SLA ! ');
              this.removeAllSlaIdsForCopy(this.slaDetails);
            }
          }else{
            this.tosterservice.error(ob.message);
            this.spinner.hide();
          }},
        error => {
          this.tosterservice.error(ErrorConstants.getValue(404));
          this.spinner.hide();
        });
  }

  getAddressTypeValue(id){
    let tempVal;
    this.typeList.forEach(element => {
      if(element.id == id){
        tempVal =  element.lookupVal;
      }
    });
    return tempVal;
  }

  getAddressTypeId(val){
    let tempVal;
    this.typeList.forEach(element => {
      if(element.lookupVal == val){
        tempVal = element.id;
      }
    });
    return tempVal;
  }


  getSafextTypeSLA(){
    if(this.safextSlaList.length >0){
      // edit
      if(this.safextTypeVal == 'PINCODE'){
        this.slaSafexTypeRefList.forEach((ref) => this.safextSlaList.forEach((element) =>{
          if(ref.id == element.safextEntityId){
            // element["isNewSla"] = false;
            element['groupName'] = ref.lookupVal;
          }
        }));
        this.safextPincodeSlaList = this.safextSlaList;
        this.safextStateSlaList = [];
      }else if(this.safextTypeVal == 'STATE'){
        this.slaStateTypeRefList.forEach((ref) => this.safextSlaList.forEach((element) =>{
          if(ref.id == element.safextEntityId){
            // element["isNewSla"] = false;
            element['groupName'] = ref.lookupVal;
          }
        }));
        this.safextStateSlaList = this.safextSlaList;
        this.safextPincodeSlaList = [];
      }
    }
    this.getSafextTypeSlaGroups();
  }

  getSafextTypeSlaGroups(){
    if(this.safextPincodeSlaList.length == 0){
      this.slaSafexTypeRefList.forEach(ref => {
        let arr:any = {}
          arr["ratecardId"]=this.model.id;
          arr["groupName"]=ref.lookupVal;
          arr["safextEntityId"]=ref.id;
          arr['lkpSafextLevelId']=this.getAddressTypeId('PINCODE');
          this.safextPincodeSlaList.push(arr);
      });
      if(this.safextSlaList.length == 0){
        this.safextSlaList = this.safextPincodeSlaList;
      }
    }
    if(this.safextStateSlaList.length == 0){
      this.slaStateTypeRefList.forEach(ref => {
        let arr:any = {}
          arr["ratecardId"]=this.model.id;
          arr["groupName"]=ref.lookupVal;
          arr["safextEntityId"]=ref.id;
          arr['lkpSafextLevelId']=this.getAddressTypeId('STATE');
          this.safextStateSlaList.push(arr);
      });
      if(this.safextSlaList.length == 0){
        this.safextSlaList = this.safextStateSlaList;
      }
    }
  }

  changeSafextType(safexType, lkpId){
    this.safextTypeVal = safexType;
    this.safextTypeId = lkpId;
    let tempVal;
    if(this.slaDetails.data.responseData.safextCustomSlaDTO.length > 0){
      tempVal = this.getAddressTypeValue(this.slaDetails.data.responseData.safextCustomSlaDTO[0].lkpSafextLevelId);
    }
    if(safexType === 'STATE'){
      this.safeExtSlaStateList = this.slaDetails.data.referenceData.safextStateWise; 
      this.safeExtSlaStateList.forEach(element => {
        element.stateId = element.stateId.toString();
      });
      if( tempVal === safexType){
        this.safextCustomSlaList = this.slaDetails.data.responseData.safextCustomSlaDTO;
        this.safextCustomSlaList.forEach((ele) => {
          ele['stateNamesfrom'] = this.covertStateIdToStateName(ele.safextSrcId);
          ele['stateNamesto'] = this.covertStateIdToStateName(ele.safextDestId);
        });
      }else{
        this.safextCustomSlaList = [];
      }
        this.safextSlaList = this.safextStateSlaList;     
    }else if(safexType === 'PINCODE'){
      if(tempVal === safexType){
        this.safextCustomSlaList = this.slaDetails.data.responseData.safextCustomSlaDTO;
      }else{
        this.safextCustomSlaList = [];
      }
        this.safextSlaList = this.safextPincodeSlaList;
    }
  }

  saveSLA(type){
    this.safextCustomSlaList.forEach(element => {
      element.lkpSafextLevelId = this.safextTypeId;
    });
    let saveSlaDTO = new slaDTO;
    saveSlaDTO.zmSlaDTO = this.slaList;
    saveSlaDTO.safextCustomSlaDTO = this.safextCustomSlaList;
    saveSlaDTO.safextSlaDTO = this.safextSlaList;
    saveSlaDTO.zmCustomSlaDTO = this.customSlaList;


    console.log('saveSlaDTO',saveSlaDTO);
    this.validateSLAList();
    this.validateSafextTypeSlaList(saveSlaDTO);
	  if(this.slaValidationFlag == true && this.safextTypeValidationFlag == true){
      this.spinner.show();
      let postData = JSON.parse(JSON.stringify(saveSlaDTO));

      // check if active childs needs to be deactivated
         postData = this.deactiveSLAOrphanChild(postData);

	    this.contractservice.saveSLA(postData,this.editflow,AppSetting.contractId)
	    .subscribe(data => {
        let ob = ErrorConstants.validateException(data);
        this.tosterservice.success('Saved Successfully');
        if(ob.isSuccess){
        console.log(data, "SLA status")
        this.isSlaCopy = false;
        if(type=='save'){
          this.isCopyRateCard = false;
          this.seven.close();
          this.openBilling();
          this.slaForm.resetForm();
        }
        else if(type=='continue'){
          this.seven.close();
          this.getVMIById();
          this.eight.open();
        }
	    }else{
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }},
    error => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });
	  }
	}

  deactiveSLAOrphanChild(data){
    if(this.updateSlaStatusIds.responseData && !this.isCopyRateCard){
      let deleteStatusId:number
      for (let status of this.updateSlaStatusIds.referenceData.statusList) {
        if (status.lookupVal == 'DELETED') {
          deleteStatusId = status.id
        }
      }
      if (this.updateSlaStatusIds.responseData.safextCustomSlaDTO) {
        for (let old of this.updateSlaStatusIds.responseData.safextCustomSlaDTO) {
          let isFound: boolean = false;
          for (let latest of data.safextCustomSlaDTO) {
            if (latest.id) {
              if (old.id == latest.id) {
                isFound = true
              }
            }
          }
          if (!isFound) {
            old['status'] = deleteStatusId;
            if(old.id)
            data.safextCustomSlaDTO.push(old);
          }
        }
      }
      if (this.updateSlaStatusIds.responseData.zmSlaDTO) {
        for (let old of this.updateSlaStatusIds.responseData.zmSlaDTO) {
          let isFound: boolean = false;
          for (let latest of data.zmSlaDTO) {
            if (latest.id) {
              if (old.id == latest.id) {
                isFound = true
              }
            }
          }
          if (!isFound) {
            old['status'] = deleteStatusId;
            if(old.id)
            data.zmSlaDTO.push(old);
          }
        }
      }
      if (this.updateSlaStatusIds.responseData.safextSlaDTO) {
        for (let old of this.updateSlaStatusIds.responseData.safextSlaDTO) {
          let isFound: boolean = false;
          for (let latest of data.safextSlaDTO) {
            if (latest.id) {
              if (old.id == latest.id) {
                isFound = true
              }
            }
          }
          if (!isFound) {
            old['status'] = deleteStatusId;
            data.safextSlaDTO.push(old);
          }
        }
      }
      if (this.updateSlaStatusIds.responseData.zmCustomSlaDTO) {
        for (let old of this.updateSlaStatusIds.responseData.zmCustomSlaDTO) {
          let isFound: boolean = false;
          for (let latest of data.zmCustomSlaDTO) {
            if (latest.id) {
              if (old.id == latest.id) {
                isFound = true
              }
            }
          }
          if (!isFound) {
            old['status'] = deleteStatusId;
            data.zmCustomSlaDTO.push(old);
          }
        }
      }
    }
    return data;
  }
  getGeoByPincode(pincode){
    if(pincode.length >2){
    this.contractservice.getAddrByPincode(pincode)
    .subscribe(data => {
      this.pincodeList = data;
      });
    }
  }

  validateSLAList(){
	  this.customSlaList.forEach((sla, index) => {
	    sla.fromTypeValidation = false;
	    sla.toTypeValidation = false;
      sla.fromValidation = false;
      sla.toValidation = false;
      sla.slaDaysValidation = false;
	    if(!sla.lkpSrcTypeId){
	      sla.fromTypeValidation = true;
	      this.slaValidationFlag = false;
	    }else if(!sla.lkpDestTypeId){
	      sla.toTypeValidation = true;
	      this.slaValidationFlag = false;
	    }else if(!sla.srcId){
	      sla.fromValidation = true;
	      this.slaValidationFlag = false;
	    }else if(!sla.destId){
	      sla.toValidation = true;
	      this.slaValidationFlag = false;
	    }else if(!sla.slaDays){
	      sla.slaDaysValidation = true;
	      this.slaValidationFlag = false;
	    }else{
	      this.slaValidationFlag = true;
	    }
	  });
  }
  
  validateSafextTypeSlaList(slaDTO){
    let slaFlag = true;
    let slaCustomFlag = true;
    if(slaDTO.safextSlaDTO.length > 0){
      slaDTO.safextSlaDTO.forEach((sla, index) => {
        sla.slaDaysValidation = false;
        if(!sla.slaDays){
          sla.slaDaysValidation = true;
          slaFlag = false;
        }else{
          slaFlag = true;
        }
      });
    }
    if(slaDTO.safextCustomSlaDTO.length > 0){
      slaDTO.safextCustomSlaDTO.forEach(sla => {
        sla.fromValidation = false;
        sla.toValidation = false;
        sla.slaDaysValidation = false;
        if(!sla.safextSrcId){
          sla.fromValidation = true;
          slaCustomFlag = false;
        }else if(!sla.safextDestId){
          sla.toValidation = true;
          slaCustomFlag = false;
        }else if(!sla.slaDays){
          sla.slaDaysValidation = true;
          slaCustomFlag = false;
        }else{
          slaCustomFlag = true;
        }
      });
    }
    if(slaFlag && slaCustomFlag){
      this.safextTypeValidationFlag = true;
    }else{
      this.safextTypeValidationFlag = false;
    }
  }

  slaAddressByType(item,index, type) {

    this.slasrcDestList.forEach(element => {
      if(element.id == item && type=='from'){
        this.customSlaList[index].fromTypeSLA = element.lookupVal;
      }else if(element.id == item && type=='to'){
        this.customSlaList[index].toTypeSLA = element.lookupVal;
      }
    });

    if (this.customSlaList[index].fromTypeSLA == 'STATE' || this.customSlaList[index].toTypeSLA == 'STATE') {
      if(type=='from'){
        this.customSlaList[index].defaultFlagFromSla = false
        this.customSlaList[index].srcId = null;
      }else{
        this.customSlaList[index].defaultFlagToSla = false
        this.customSlaList[index].destId = null;
      }
    }

    if (this.customSlaList[index].fromTypeSLA == 'CITY' || this.customSlaList[index].toTypeSLA=='CITY') {
      if(type=='from'){
        this.customSlaList[index].defaultFlagFromSla = false
        this.customSlaList[index].srcId = null;
      }else{
        this.customSlaList[index].defaultFlagToSla = false
        this.customSlaList[index].destId = null;
      }
    }

    if (this.customSlaList[index].fromTypeSLA == 'DISTRICT' || this.customSlaList[index].toTypeSLA=='DISTRICT') {
      if(type=='from'){
        this.customSlaList[index].defaultFlagFromSla = false
        this.customSlaList[index].srcId = null;
      }else{
        this.customSlaList[index].defaultFlagToSla = false
        this.customSlaList[index].destId = null;
      }
    }

    if (this.customSlaList[index].fromTypeSLA == 'PINCODE' || this.customSlaList[index].toTypeSLA=='PINCODE') {
      if(type=='from'){
        this.customSlaList[index].srcId = null;
      }else{
        this.customSlaList[index].destId = null;
      }
    }
  }

  getAllAddress(){
    let tempdata;
    this.contractservice.getAddrByState()
    .subscribe(data => {
      tempdata = data;
      this.stateAddrSla = tempdata.data.responseData;
      this.stateAddrSla.forEach((ele) => ele.id= ele.id.toString());
      console.log(this.stateAddrSla, "state")
    },
    error => { 
      
    });
  }

  changeRRFlagPP(rrFlag,fielddata){
    this.RRCusFlagList.forEach(rr => {
      if(rr.id == rrFlag){
        if(rr.value == 'RR'){
          fielddata['safexSlaDisabled'] = true;
          if(fielddata.attrName != 'TEXT') {
            fielddata['pricingParamVal']= fielddata['attributeValue']
            fielddata['attr3'] = fielddata['rrVal']
          }
          else {
          fielddata['pricingParamVal']= fielddata['rrVal']
          fielddata['attr3'] = null
          }
          fielddata['rrFlag'] = 1
          
        }else if(rr.value == 'NA'){ 
          fielddata['safexSlaDisabled'] = true;
          fielddata['pricingParamVal']= null;
          fielddata['rrFlag'] = 0;
          fielddata['attr3'] = null;
        }else if(rr.value == 'Custom'){
          fielddata['safexSlaDisabled'] = false;
          fielddata['rrFlag'] = 2
        }
      }
    });
  }
  changeRRFlagPPEdit(rrFlag,fielddata){
    for(let e of this.ReferenceDataModel.pricingParam){
      if(e.priceParameterResponseDTO.id==fielddata.pricingParamId){
        if(e.pricingParamRrs.length>0){
          fielddata.rrVal = e.pricingParamRrs[0].rrValue;
          fielddata.attributeValue = e.pricingParamRrs[0].attributeValue;
        }
      }
    }
    this.RRCusFlagList.forEach(rr => {
      if(rr.id == rrFlag){
        if(rr.value == 'RR'){
          fielddata['safexSlaDisabled'] = true;
          if(fielddata.attrName != 'TEXT') {
            fielddata['pricingParamVal']= fielddata['attributeValue']
            fielddata['attr3'] = fielddata.rrVal
          }
          else {
          fielddata['pricingParamVal']= fielddata.rrVal
          fielddata['attr3'] = null
          }
          fielddata['rrFlag'] = 1
        }else if(rr.value == 'NA'){
          fielddata['safexSlaDisabled'] = true;
          fielddata['pricingParamVal']= null;
          fielddata['rrFlag'] = 0;
          fielddata['attr3'] = '';
        }else if(rr.value == 'Custom'){
          fielddata['safexSlaDisabled'] = false;
          fielddata['rrFlag'] = 2
        }
      }
    });
  }
  changeRRFlagSLA(index,rrFlag){
    console.log(index,rrFlag);
    this.RRFlagList.forEach(rr => {
      if(rr.id == rrFlag){
        if(rr.value == 'RR'){
          this.slaList[index]['safexSlaDisabled'] = true;
          this.slaList[index]['slaDays']= this.slaList[index].rateGroup.sla;
        }else if(rr.value == 'Custom'){
          this.slaList[index]['safexSlaDisabled'] = false;
          this.slaList[index]['slaDays']= this.slaList[index].id?this.slaList[index].slaDays:null;
        }
        this.slaList[index]['slaRrFlag'] = rrFlag;
      }
    });
    console.log('inside change SLA RR flag');
  }


  addCustomSLA(){
    this.validateSLAList();
    let slaDto = new customSlaDTO;
    slaDto.ratecardId = this.model.id;
    slaDto.slaRrFlag = 0;
    if(this.slaValidationFlag == true){
      this.customSlaList.push(slaDto);  
    }
  }

  addSlaListSLA() {
    let arr: any = {}
    this.typeList.forEach(element => {
      if (element.lookupVal == this.safextTypeVal) {
        this.safextTypeId = element.id;
      }
    });
    arr["isNewSla"] = true;
    arr["lkpSafextLevelId"] = this.safextTypeId;
    arr["ratecardId"] = this.model.id
    this.safextCustomSlaList.push(arr);
    if(this.safextTypeVal == 'STATE'){
      this.safextSlaList = this.safextStateSlaList;     
    }else if(this.safextTypeVal == 'PINCODE'){
      this.safextSlaList = this.safextPincodeSlaList;   
    }
  }

  removeSafexTypeSLA(index){
    this.safextCustomSlaList.splice(index,1);
  }

  removeCustomSLA(index){
    this.customSlaList.splice(index,1);
  }


  // SLA code ends here  
  
	// VMI code starts here

	vmiList = []
	vmiData: any = {}
	vmiDetails : any = [];
  vmiValidationFlag : boolean = true;
  vmiCombination : any = [];
  vmiMappingFlag : boolean = true;
	
	
	vmiFlagList: any[] = [{ id: 1, value: 'Yes', checked: false },
	  { id: 0, value: 'No', checked: true },
	]
	
	isVMIExpanded
	  expandVMI() {
	    this.isVMIExpanded = !this.isVMIExpanded;
    }
    
    removeAllVmiIdsForCopy(data){
      for(let child of data){
        child.id=null
        child.ratecardId=this.model.id;
      }
    }

	getVMIById(){
	  if(!this.model.id){
      this.tosterservice.error('No Rate Card Selected !!')
      this.eight.close()
      this.spinner.hide();
      return
    }
    if(this.isCopyRateCard && this.isSlaCopy){
      this.tosterservice.error('SLA Not Saved !!')
      this.eight.close()
      this.spinner.hide();
      return
    }
    if(this.vmiSection)this.vmiSection.resetForm();
    let msaId = AppSetting.msaCustId;
    let id;
    if(this.isCopyRateCard && this.isVmiCopy){
      id= this.copiedRcId;
    }else{
      id=this.model.id;
    }
    this.spinner.show();
	  this.contractservice.getVMIById(msaId,id,this.editflow)
	    .subscribe(
	      success => {
          let ob = ErrorConstants.validateException(success);
        if(ob.isSuccess){
          this.vmiList = []
          this.vmiDetails = success.data.responseData;
          if(this.isCopyRateCard && this.isVmiCopy){
            if(this.vmiList.length>0){
              this.tosterservice.info('Save To Copy All VMI ! ');
              this.removeAllVmiIdsForCopy(this.vmiDetails);
            }
          }
          this.vmiDetails.referenceList = success.data.referenceData;
	        this.vmiList = this.vmiDetails;  
	        this.vmiList.forEach(vm => {
	          vm["cnorValidation"] = false;
	          vm["cneeValidation"] = false;
	          vm["isNewVMI"] = false;
          });
          console.log(this.vmiList);
          this.spinner.hide();
	} else{
      this.tosterservice.error(ob.message);
      this.spinner.hide();
    }},
  error => {
    this.tosterservice.error(ErrorConstants.getValue(404));
    this.spinner.hide();
  });
	}
  
  validateDuplicateVMICombination(){
    this.vmiCombination = [];
    this.vmiMappingFlag = true;
    console.log()
    this.vmiList.forEach((vm, index) => {
      if (this.vmiCombination.indexOf(vm.cnorId+"-"+vm.cneeId) > -1) {
        this.vmiMappingFlag = false;
        return false;
      } else {
        this.vmiCombination.push(vm.cnorId+"-"+vm.cneeId);
        this.vmiMappingFlag = true;
        return true;
      }
    });
  }

	validateVMIList(){
	  this.vmiList.forEach((vm, index) => {
	    vm.cnorValidation = false;
	    vm.cneeValidation = false;
	    if(!vm.cnorId){
	      vm.cnorValidation = true;
	      this.vmiValidationFlag = false;
	    }else if(!vm.cneeId){
	      vm.cneeValidation = true;
	      this.vmiValidationFlag = false;
	    }else{
	      this.vmiValidationFlag = true;
	    }
    });
    this.validateDuplicateVMICombination();
	}
  
  vmiFlagChange(vmi, vmiFlagValue){
    if (vmiFlagValue == 0) {
      vmi.lkpVmiTypeId = null;
    }
  }

	saveVMI(){
    this.spinner.show();
    this.validateVMIList();
    this.vmiList.forEach(obj => {
      if(obj.vmiFlag == 0){
        obj.lkpVmiTypeId = 0;
      }
    })
	  if(this.vmiValidationFlag == true && this.vmiMappingFlag == true){
	    this.contractservice.saveVMI(this.vmiList,this.editflow,AppSetting.contractId)
	    .subscribe(success => {
        let ob = ErrorConstants.validateException(success);
        if(ob.isSuccess){
        console.log(success.data.responseData, "branch status");
        this.isCopyRateCard = false;
        this.isVmiCopy = false;
        this.spinner.hide();
        this.eight.close()
        this.tosterservice.success("Saved Successfully");
	    }else{
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }},
    error => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });
	  }else{
      this.tosterservice.error('Invalid Input !!');
      this.spinner.hide();
    }
	}
	
	addVMI(){
	  this.validateVMIList();
	  if(this.vmiValidationFlag ==  true && this.vmiMappingFlag ==true){
	    let vmiDto = new vmiDTO();
	    if(this.model.id){
	      vmiDto.ratecardId = this.model.id;
	    }
	    vmiDto.vmiFlag=1;
	    vmiDto.isNewVMI = true;
	    this.vmiList.push(vmiDto);  
	  }
	}
	
	removeVMI(index){
    this.vmiSection.submitted = false;
    this.vmiList.splice(index,1);
    this.vmiMappingFlag = true;
    }	

  openBilling() {
    this.spinner.show();
    this.contractservice.validateContract(AppSetting.contractId,this.editflow).subscribe(result => {
      let ob = ErrorConstants.validateException(result);
      if (ob.isSuccess) {
        var validationMessages = '';
        if (result.data.responseData)
          validationMessages = JSON.stringify(result.data.responseData);
        validationMessages = validationMessages.replace("{", "").replace("}", "");
        validationMessages = validationMessages.split(",").join(". \n");
        validationMessages = validationMessages.split("\"").join("");
        console.log(validationMessages);
        if (validationMessages && validationMessages != "") {
          this.tosterservice.error(validationMessages);
          this.spinner.hide();
        } else {
          if (this.editflow) {
            this.router.navigate(['/contract/billing', {steper:true, 'editflow': 'true' }], {skipLocationChange: true});
          } else {
            this.router.navigate(['/contract/billing'], {skipLocationChange: true});
          }
        }
      } else {
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }
    }, error => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });  
    
  }


openDialogPincodeSearch(element,name,isSFXStateList): void {

  let selectedPinCommaSep:any;
  let type:any;

  if(name=='fromId'){
    selectedPinCommaSep = element.fromId;
    type='From';
  }
  if(name=='toId'){
    selectedPinCommaSep = element.toId;
    type='To';
  }
  if(name=='srcId'){
    selectedPinCommaSep = element.srcId;
    type='From';
  }
  if(name=='destId'){
    selectedPinCommaSep = element.destId;
    type='To';
  }
  if(name=='safextSrcId'){
    selectedPinCommaSep =  element.safextSrcId;
    type='From';
  }
  if(name=='safextDestId'){
    selectedPinCommaSep= element.safextDestId;
    type='To';
  }

  if(!isSFXStateList){
    this.stateList = []
  }else{
    if(this.ReferenceDataModel.safextStateWise && this.ReferenceDataModel.safextStateWise.length>0){
      this.stateList = this.ReferenceDataModel.safextStateWise
    }else if(this.slaDetails && this.slaDetails.data && this.slaDetails.data.referenceData.safextStateWise.length>0){
      this.stateList = this.slaDetails.data.referenceData.safextStateWise
    }
  }

  const dialogRefEdit = this.dialog.open(PincodesearchComponent, {
    data: {type:type,msaId:null,isEditflow: true,isSafexttype:this.stateList,selectedPinCommaSep:selectedPinCommaSep},
    autoFocus: false,
    panelClass: 'creditDialog',
    disableClose: true,
    backdropClass: 'backdropBackground'
  });

  dialogRefEdit.afterClosed().subscribe(result => {
    if(name=='fromId'){
      element.fromId =  result;
    }
    if(name=='toId'){
      element.toId =  result;
    }
    if(name=='srcId'){
      element.srcId =  result;
    }
    if(name=='destId'){
      element.destId =  result;
    }
    if(name=='safextSrcId'){
      element.safextSrcId =  result;
    }
    if(name=='safextDestId'){
      element.safextDestId =  result;
    }
    console.log('The dialog was closed with pinocde ' ,result);
  });
}

openDialogCitySearch(element,name): void {

  let selectedCityIdCommaSep:any;
  let type:any;

  if(name=='fromId'){
    selectedCityIdCommaSep = element.fromId;
    type='From';
  }
  if(name=='toId'){
    selectedCityIdCommaSep = element.toId;
    type='To';
  }
  if(name=='srcId'){
    selectedCityIdCommaSep = element.srcId;
    type='From';
  }
  if(name=='destId'){
    selectedCityIdCommaSep = element.destId;
    type='To';
  }
  if(name=='safextSrcId'){
    selectedCityIdCommaSep =  element.safextSrcId;
    type='From';
  }
  if(name=='safextDestId'){
    selectedCityIdCommaSep= element.safextDestId;
    type='To';
  }

  const dialogRefEdit = this.dialog.open(CitysearchComponent, {
    data: {type:type,cityMap:this.cityMap,isEditflow: true,selectedCityIdCommaSep:selectedCityIdCommaSep},
    autoFocus: false,
    panelClass: 'creditDialog',
    disableClose: true,
    backdropClass: 'backdropBackground'
  });

  dialogRefEdit.afterClosed().subscribe(result => {
    let resultStr = this.covertCityIdToCityName(result);
    if(name=='fromId'){
      element.fromId =  result;
      element.cityNamesfrom = resultStr
    }
    if(name=='toId'){
      element.toId =  result;
      element.cityNamesto = resultStr
    }
    if(name=='srcId'){
      element.srcId =  result;
      element.cityNamesfrom = resultStr
    }
    if(name=='destId'){
      element.destId =  result;
      element.cityNamesto = resultStr
    }
    if(name=='safextSrcId'){
      element.safextSrcId =  result;
      element.cityNamesfrom = resultStr
    }
    if(name=='safextDestId'){
      element.safextDestId =  result;
      element.cityNamesto = resultStr
    }
    console.log('The dialog was closed with pinocde ' ,result);
  });
}
covertStateIdToStateName(liststr){
  let stateNames =[];
  var listArr = liststr.split(',');
    listArr.forEach((ele) => {
    stateNames.push(this.stateMap.get(ele));
  })
  stateNames.sort();
  return stateNames.toString();
}
covertCityIdToCityName(liststr){
  let cityNames =[];
  var listArr = liststr.split(',');
    listArr.forEach((ele) => {
      cityNames.push(this.cityMap.get(ele));
  })
  cityNames.sort();
  return cityNames.toString();
}
openDialogStateSearch(element,name,isSFXStateList): void {

  let selectedStateIdCommaSep:any;
  let type:any;

  if(name=='fromId'){
    selectedStateIdCommaSep = element.fromId;
    type='From';
  }
  if(name=='toId'){
    selectedStateIdCommaSep = element.toId;
    type='To';
  }
  if(name=='srcId'){
    selectedStateIdCommaSep = element.srcId;
    type='From';
  }
  if(name=='destId'){
    selectedStateIdCommaSep = element.destId;
    type='To';
  }
  if(name=='safextSrcId'){
    selectedStateIdCommaSep =  element.safextSrcId;
    type='From';
  }
  if(name=='safextDestId'){
    selectedStateIdCommaSep= element.safextDestId;
    type='To';
  }

  if(!isSFXStateList){
    this.stateList = []
  }else{
    if(this.ReferenceDataModel.safextStateWise && this.ReferenceDataModel.safextStateWise.length>0){
      this.stateList = this.ReferenceDataModel.safextStateWise
    }else if(this.slaDetails && this.slaDetails.data && this.slaDetails.data.referenceData.safextStateWise.length>0){
      this.stateList = this.slaDetails.data.referenceData.safextStateWise
    }
  }

  const dialogRefEdit = this.dialog.open(StatesearchComponent, {
    data: {type:type,msaId:null,isEditflow: true,isSafexttype:this.stateList,selectedStateIdCommaSep:selectedStateIdCommaSep},
    autoFocus: false,
    panelClass: 'creditDialog',
    disableClose: true,
    backdropClass: 'backdropBackground'
  });

  dialogRefEdit.afterClosed().subscribe(result => {
    let resultStr = this.covertStateIdToStateName(result);
    if(name=='fromId'){
      element.fromId =  result;
      element.stateNamesfrom = resultStr
    }
    if(name=='toId'){
      element.toId =  result;
      element.stateNamesto = resultStr
    }
    if(name=='srcId'){
      element.srcId =  result;
      element.stateNamesfrom = resultStr
    }
    if(name=='destId'){
      element.destId =  result;
      element.stateNamesto = resultStr
    }
    if(name=='safextSrcId'){
      element.safextSrcId =  result;
      element.stateNamesfrom = resultStr
    }
    if(name=='safextDestId'){
      element.safextDestId =  result;
      element.stateNamesto = resultStr
    }
    console.log('The dialog was closed with pinocde ' ,result);
  });
}

  deleteBranch(field, i){
    this.branchAssignModel.assignBranch.splice(i,1);
   }
}

// dialog box

@Component({
  selector: 'dialog-box-cc',
  templateUrl: 'dialog_Box_Cc_search.html',
  styleUrls: ['../core.css']
})
export class SearchCcDialogBox {

  constructor(public contractservice: ContractService,
    public dialogCCRef: MatDialogRef<SearchCcDialogBox>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: ccData,
    private spinner: NgxSpinnerService, private _contractService: ContractService,private tosterservice: ToastrService) {
      this.getCCDataByMsaId();
     }
     editflow: false
     ngOnInit() {
       this.editflow = this.data.editflow;
     }
  cneeCnor: any;
  branchName: any;
  onNoClick(): void {
    this.dialogCCRef.close();
  }
  closeDialog(): void {
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      data:{message:'Are you sure ?'},
      panelClass: 'creditDialog',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if(value){
        this.dialogCCRef.close();
      }else{
        console.log('Keep Open');
      }
    });
  }
  cneecnor: any = {
  }
  getCCDataByMsaId(){
      this.spinner.show();
      this.branchName = this.data.element.bkngBranchName;
      this.contractservice.getMsa(AppSetting.msaCustId)
      .subscribe(result => {
        let ob = ErrorConstants.validateException(result);
        if(ob.isSuccess){
        var successData: any = result.data.responseData;
        successData.msaData = result.data.responseData;
        let consignType = result.data.referenceData.consignType;
        this.cneecnor = successData[0].cneeCnor
        let arrayCCList = [];
        for (let element of this.cneecnor) {
          let ccTypeName = '';
          for(let typecc of consignType){
            if(element.lkpConsigntypeId==typecc.id){
              ccTypeName=typecc.lookupVal;
              break;
            }
          }
          if(ccTypeName=='CONSIGNEE'){
            if(this.data.businessType=='OUTBOUND'){
              // dont add to this ::::::::::
            }else{
              element.ctype="CONSIGNEE";
              arrayCCList.push(element);
                }
          }else if(ccTypeName=='CONSIGNOR'){
            if(this.data.businessType=='INBOUND'){
              // dont add to this ::::::::::
            }else{
              element.ctype="CONSIGNOR";
              arrayCCList.push(element);
            }
          }
          
          else{
            element.ctype="BOTH";
            arrayCCList.push(element);
          }
        }
        this.cneecnor = arrayCCList;
        for (var check of this.data.element.branchPinCneeCnorMap) {
          for (var item of this.cneecnor) {  
            if(check.cneeCnorId==item.id){
              item.ischecked= true;
              item.cneeCnorId= check.cneeCnorId;
            }
          }
        }
        this.spinner.hide();
  }else{
    this.tosterservice.error(ob.message);
    this.spinner.hide();
  }},
error => {
  this.tosterservice.error(ErrorConstants.getValue(404));
  this.spinner.hide();
});
    }
    changeCheckProp(){
      
      for (var item of this.cneecnor) {
        if(item.cneeCnorId && !item.ischecked){
          for (var j=0; j<this.data.element.branchPinCneeCnorMap.length; j++){
            if(this.data.element.branchPinCneeCnorMap[j].cneeCnorId==item.id){
              this.data.element.branchPinCneeCnorMap.splice(j,1);
            }
          }
        }

        if(item.ischecked && !item.cneeCnorId){
          let newItem = {
            cneeCnorId:item.id,
            pincode:item.pincode,
            ischecked:item.ischecked
          };
          this.data.element.branchPinCneeCnorMap.push(newItem);
        }
      }
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
