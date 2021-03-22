import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { PaymentCommercialGen } from '../../../core/models/paymentTermsModel';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppSetting } from 'src/app/app.setting';
import { DatePipe } from '@angular/common';


// table 4
export interface PeriodicElement3 {
  Flabel: string;
  Fvalue: string;
}

const ELEMENT_DATA_3: PeriodicElement3[] = [
  { Flabel: '', Fvalue: '' },
];

export interface PeriodicElement {
  PserviceO: string;
  Pcreadit: string;
  Ppaid: string;
  PtoPay: string;
}
// InterFace Start
const ELEMENT_DATA: PeriodicElement[] = [
  { PserviceO: '', Pcreadit: '', Ppaid: '', PtoPay: '' },
  { PserviceO: '', Pcreadit: '', Ppaid: '', PtoPay: '' },
];
// 

@Component({
  selector: 'app-payout-gen-detail',
  templateUrl: './payout-gen-detail.component.html',
  styleUrls: ['./payout-gen-detail.component.css'],
  providers: [DatePipe]
})
export class PayoutGenDetailComponent implements OnInit {
  @Input() payoutGenDetail: PaymentCommercialGen;
  @Input() payoutGenRefDetail: any;
  @Input() indexValue: any;
  // @Input() validation: any;
  
  
  custId = 780;
  main = 779;

  // Data Sources

  
  displayedColumns: string[] = ['PserviceO', 'Pcreadit', 'Ppaid', 'PtoPay'];
  displayedColumnVehicle: string[] = ['PserviceO', 'Ppaid'];
  dataSourceServiceoff:any
  dataSourceServiceBook:any // = ELEMENT_DATA;
  dataSourceVehicle:any // = ELEMENT_DATA;

  displayedColumns3: string[] = ['Flabel', 'Fvalue'];
  dataSource3 = ELEMENT_DATA_3;
  creditId:any; 
  paidId:any; 
  topayId:any; 
  bookingId:any;
  offeringId:any;
  pertipId: any;
  editflow: any;
  editStatusId = AppSetting.editStatus;
  @ViewChild('fAssoPaygen', null) fAssoPaygen: NgForm;
  searchExpType = '';

  frieWayId;
  chargeWeightId;
  actualWeightId;
  perPackId;
  perTripId;
  myDate = new Date();
  expMinDt: Date;


  constructor( private acRoute: ActivatedRoute, public datePipe : DatePipe) { }

  ngOnInit() {
    this.getRouteParams();
    this.expMinDt = this.myDate;

  }
  ngOnChanges() {
    if(this.payoutGenDetail){
      this.getRouteParams();
      this.setStaticIds();  
      this.setPaymentObj(this.payoutGenDetail); 
      // payoutGenDetail.effectiveDt
      this.payoutGenDetail.effectiveMinDt = this.payoutGenDetail.effectiveDt ? this.payoutGenDetail.effectiveDt : new Date();
      // this.payoutGenDetail.isValidEffectiveDt = false;
      // this.payoutGenDetail.isValidExpDt = false;
      let e = new Date(this.payoutGenDetail.effectiveMinDt );
      e.setDate(e.getDate()+1);
      this.expMinDt = e;
      
    }
  }
  setStaticIds(){
    this.payoutGenRefDetail.assocPaymentTypeList.forEach(element => {
      if(element.lookupVal == 'CREDIT'){
        this.creditId = element.id;
      }else if(element.lookupVal == 'PAID'){
        this.paidId = element.id;
      }else if(element.lookupVal == 'TOPAY'){
        this.topayId = element.id;
      }
    });

    this.payoutGenRefDetail.assocPayoutTypeList.forEach(element => {
      if(element.lookupVal == 'OFFERING'){
        this.offeringId = element.id;
      }else if(element.lookupVal == 'BOOKING'){
        this.bookingId = element.id;
      }else if(element.lookupVal == 'PERTRIP'){
        this.pertipId = element.id;
      }
    });
    this.payoutGenRefDetail.assocExpenseTypeList.forEach(element => {
      if(element.lookupVal == 'FRIEGHT OF WAYBILL'){
        this.frieWayId = element.id;
        element['sortForm'] = '%';
      }else if(element.lookupVal == 'CHARGED WEIGHT'){
        element['sortForm'] = 'RS/KG';
        this.chargeWeightId = element.id;
      }else if(element.lookupVal == 'ACTUAL WEIGHT'){
        element['sortForm'] = 'RS/KG';
        this.actualWeightId = element.id;
      }else if(element.lookupVal == 'PER PACKAGE'){
        element['sortForm'] = 'RS/PCKG';
        this.perPackId = element.id;
      }else if(element.lookupVal == 'PER TRIP'){
        element['sortForm'] = 'RS/TRIP';
        this.perTripId = element.id;
      }else{
        element['sortForm'] = 'RS/PCKG';
        this.frieWayId = element.id;
      }
    });
  }


  payoutChange(obj, event){
    if(event.value == this.pertipId){
      this.dataSourceVehicle = new MatTableDataSource(obj.BookingCommercialEntListObjPer); //obj.BookingCommercialEntListObjPer ;//
      if(obj.bookingCommercialEntList){
        obj.bookingCommercialEntList =  this.dataSourceVehicle.data;
      }else{
        obj.commercialEntList = this.dataSourceVehicle.data;
      }
      
    }else if(event.value == this.bookingId){
      this.dataSourceServiceBook =  obj.BookingCommercialEntListObjBook; //new MatTableDataSource(obj.BookingCommercialEntListObjBook);
      this.dataSourceServiceBook.sort((a, b) => a.serviceOfferingId - b.serviceOfferingId);
      if(obj.bookingCommercialEntList){
        obj.bookingCommercialEntList =  this.dataSourceServiceBook;
      }else{
        obj.commercialEntList = this.dataSourceServiceBook;
      }
    }else if(event.value == this.offeringId){
      this.dataSourceServiceoff =  obj.BookingCommercialEntListObjOff; //new MatTableDataSource(obj.BookingCommercialEntListObjOff);
      if(obj.bookingCommercialEntList){
        obj.bookingCommercialEntList =  this.dataSourceServiceoff ;
      }else{
        obj.commercialEntList = this.dataSourceServiceoff ;
      }
      
    }

  }
  expenseChange(obj){
    obj.lkpAssocAddtnlParamId = null;
    obj.addtnlParamVal = null;
  }
  // minFlag:boolean = false;
  // compareMin(element, which){
  //   if(which == 'min'){
  //     this.enterDot(element, 'min')
  //   }else if(which == 'max'){
  //     this.enterDot(element, 'max')
  //   }
  //   if(element.maxAmtPerWaybl){
  //     if(Number(element.maxAmtPerWaybl) < Number(element.minAmtPerWaybl)){
  //       element.minFlag = true;
  //     }
  //     else{
  //       element.minFlag = false;
  //     }
  //   }
  // }


  //  enterDot(element, which_) {
     
  //   var value = '';
  //   if(which_ == 'min'){
  //      value = element.minAmtPerWaybl;
  //   }else if(which_ == 'max'){
  //      value = element.maxAmtPerWaybl;
  //   }
    
  //   value = value.split('.').join('');
  //   if(!value){return}

  //   if (value.length == 9) {
  //           value = value.substring(0, value.length - 1) + '.' + value.substring(value.length - 1, value.length);
  //   } else if (value.length == 10) {
  //           value = value.substring(0, value.length - 2) + '.' + value.substring(value.length - 2, value.length);
  //   }

  //   if(which_ == 'min'){    
  //     element.minAmtPerWaybl= value
  //  }else if(which_ == 'max'){
  //    element.maxAmtPerWaybl = value;
  //  }
    
  // }


  compareMin(element){
    if(Number(element.maxAmtPerWaybl)){
      if((Number(element.maxAmtPerWaybl))<(Number(element.minAmtPerWaybl))){
        element.minFlag = true;
      }
      else{
        element.minFlag = false;
      }
    }
  }


  payoutForEdit(obj, event){
    if(event.value == this.pertipId){
      if(obj.bookingCommercialEntList){
        obj.BookingCommercialEntListObjPer = obj.bookingCommercialEntList;
      }else{
        obj.BookingCommercialEntListObjPer = obj.commercialEntList;
      }
      
    }else if(event.value == this.bookingId){
      if(obj.bookingCommercialEntList){
        obj.BookingCommercialEntListObjBook = obj.bookingCommercialEntList ;
      }else{
        obj.BookingCommercialEntListObjBook = obj.commercialEntList ;
      }
      
    }else if(event.value == this.offeringId){
      if(obj.bookingCommercialEntList){
        obj.BookingCommercialEntListObjOff = obj.bookingCommercialEntList ;
      }else{
        obj.BookingCommercialEntListObjOff = obj.commercialEntList ;
      }
      
    }
    this.modelDataSet(obj);

  }

  setPaymentObj(objectData){
    if(objectData){
      objectData['BookingCommercialEntListObjOff'] = [];
      objectData['BookingCommercialEntListObjBook'] = [];
      objectData['BookingCommercialEntListObjPer'] = [];
      if((objectData.bookingCommercialEntList && objectData.bookingCommercialEntList.length > 0) || (objectData.commercialEntList && objectData.commercialEntList.length > 0) ){
        this.payoutForEdit(objectData, {value: this.payoutGenDetail.lkpAssocBkngPayoutCtgyId});
      }else{
        this.modelDataSet(objectData);
      }
      
    }
  }


  modelDataSet(objectData){
    if(objectData.BookingCommercialEntListObjBook.length == 0){
     this.payoutGenRefDetail.serviceOfferingList.forEach(element => {             
      this.payoutGenRefDetail.assocPaymentTypeList.forEach(obj => {
        let tempBook = {
          "serviceOfferingId" : element.id,
          "lkpBranchMopId": obj.id,
          "price": null,
          "effectiveDt" : this.payoutGenDetail.effectiveDt,
          "expDt" : this.payoutGenDetail.expDt
        };
        objectData.BookingCommercialEntListObjBook.push(tempBook);
      });
    });
  }
    if(objectData.BookingCommercialEntListObjOff.length == 0){
      this.payoutGenRefDetail.serviceOfferingList.forEach(element => {  
        let tempOff = {
          "serviceOfferingId" : element.id,
          "price": null,
          "effectiveDt" : this.payoutGenDetail.effectiveDt,
          "expDt" : this.payoutGenDetail.expDt
        };
        objectData.BookingCommercialEntListObjOff.push(tempOff);
      });
    }

    if(objectData.BookingCommercialEntListObjPer.length == 0){
    this.payoutGenRefDetail.vehicleCargoCapacityList.forEach(objVehi => {
      let tempPer = {
        "lkpCargoCapacityId": objVehi.id,
        "price": null,
        "effectiveDt" : this.payoutGenDetail.effectiveDt,
        "expDt" : this.payoutGenDetail.expDt
      }
      objectData.BookingCommercialEntListObjPer.push(tempPer);
    });
  }
  this.payoutChange(this.payoutGenDetail, {value: this.payoutGenDetail.lkpAssocBkngPayoutCtgyId});
}

  change($event, addtnlParamFlag, payoutGenDetail){
      //console.log($event, addtnlParamFlag, payoutGenDetail)
  }

  
  editInput(element){
    //console.log('element',element)
    if(this.editflow){
      element.status = this.editStatusId;
    }
  }

  effectiveDate(isExpToUpdate, element) {
    let effYear = parseInt(this.datePipe.transform(element.effectiveDt, 'yyyy'))
    if (effYear > 9999) {
      element.effectiveDt = "";
    } else {
    let a = this.datePipe.transform(element.effectiveMinDt, 'yyyy-MM-dd')
    let b = this.datePipe.transform(element.effectiveDt, 'yyyy-MM-dd')
    let c = this.datePipe.transform(element.expDt, 'yyyy-MM-dd')
    if(c && a){
      if (a <=b && b < c) {
        element.isValidEffectiveDt = false;
      }
      else {
        element.isValidEffectiveDt = true;
      }
    }
    else if(c){
      if (b < c) {
        element.isValidEffectiveDt = false;
      }
      else {
        element.isValidEffectiveDt = true;
      }
    }else if(a){
      if (b >= a) {
        element.isValidEffectiveDt = false;
      }
      else {
        element.isValidEffectiveDt = true;
      }
    }else{
      element.isValidEffectiveDt = false;
    }
    if(b){
      let e = new Date(b);
      e.setDate(e.getDate()+1);
      this.expMinDt = e;
    }

    // increment exp date by one year
    // if(isExpToUpdate && b && !element.isValidEffectiveDt){
    //   let f = new Date(b);
    //   f.setFullYear(f.getFullYear()+1);
    //   element.expDt = f;
    // }
  }
  this.expDate(element);
  }

  expDate(element) {
    let expYear = parseInt(this.datePipe.transform(element.expDt, 'yyyy'))
    if (expYear > 9999) {
      element.expDt = "";
    } else {
    let a = this.datePipe.transform(element.effectiveMinDt, 'yyyy-MM-dd')
    let b = this.datePipe.transform(element.effectiveDt, 'yyyy-MM-dd')
    let c = this.datePipe.transform(element.expDt, 'yyyy-MM-dd')

    if(b){
      if (b < c) {
        element.isValidExpDt = false;
      }
      else {
        element.isValidExpDt = true;
      }
    } else if(a){
      if ( a < c) {
        element.isValidExpDt = false;
      }
      else {
        element.isValidExpDt = true;
      }
    }else{
      element.isValidExpDt = false;
    }
    if(c){
      var e = new Date(c);
      e.setDate(e.getDate()-1);
      element.maxdate = e;
    }else{      
      element.isValidExpDt = false;
    }
  }
  }

  getRouteParams() {
    this.acRoute.params.subscribe(x => {
      if(x.editflow){
        this.editflow = x.editflow;
      }
    });
  }
}
