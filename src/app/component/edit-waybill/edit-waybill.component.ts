import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { WaybillEditService } from './../../core/service/Waybill-edit.service';
import {Component, OnInit, ViewChild } from '@angular/core';
import * as moment from "moment";
import { BookingInformationService } from 'src/app/core/service/booking-information.service';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/core/common.service';
@Component({
    selector: 'app-edit-waybill',
    templateUrl: './edit-waybill.component.html',
    styleUrls: ['./edit-waybill.component.css']
})
export class EditWaybillComponent implements OnInit {
    @ViewChild("f", null) editForm: any;
  @ViewChild(MatPaginator,null) paginator: MatPaginator;
    constructor(
        private $bookingInfo: BookingInformationService,
        private $editWaybill: WaybillEditService,
        private appComp: AppComponent,
        private route: Router, private spinner : NgxSpinnerService,
        private commonService: CommonService
        ) { }
    todate = '';
    fromdate = '';
    isFromDateMandatory: boolean = false;
    toDateMandatory: boolean = false;
    waybillNumber:any;
    filterValue;
    dataSource5: MatTableDataSource<any>;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    consignorList = [];
  
    ngOnInit() {
        this.getAllLoad();
        this.getOffeing();
        // this.dataSource5.filterPredicate = (data, filter) => {
        //   return data.waybillNumber == filter;
        //  };
        this.fromdate = moment(new Date()).format("YYYY-MM-DD");
        this.todate = moment(new Date()).format("YYYY-MM-DD");
        this.gettingWaybillByDate();
    }
    editWaybillObj;
    p=1;
    waybillList: Array<any> = [];
    allLookupList: Array<any> = [];
    allOfferingList: Array<any> = [];
    mopList:any = [];
    displayedColumns: string[] = ['waybillNumber', 'userType', 'wayblCurrStatusLookupId', 'branchMOPLookupId', 'serviceOfferingId', 'pickupDate','edit'];

    fromdatechange(fromdate){
        this.expiryMinDate = fromdate;
        this.fromdate = moment(fromdate).format("YYYY-MM-DD");
        console.log(this.fromdate);
        if(fromdate){
          this.toDateMandatory = true;
          }
    }

    todatechange(todate){
        this.todate = moment(todate).format("YYYY-MM-DD");
        console.log(this.todate);
        if(todate){
          this.isFromDateMandatory = true;
          }
    }
gettingWaybillbyWaybillNumber(){
   
  this.spinner.show()
  this.$editWaybill.getWayBillByNumber(this.waybillNumber).subscribe(response => {
      if (response) {
          this.spinner.hide()
          this.waybillList = [];
          this.waybillList.push(response);
          this.dataSource5 = new MatTableDataSource(this.waybillList);
          this.dataSource5.sort = this.sort;
          this.dataSource5.paginator = this.paginator;
          console.log(this.waybillList)
      }
  })
}
    gettingWaybillByDate() {
       
      if(this.fromdate){
        this.fromdate = moment(this.fromdate).format("YYYY-MM-DD");
      }
      if(this.todate){
        this.todate = moment(this.todate).format("YYYY-MM-DD");
      }
        
        if(this.fromdate && this.todate && !this.waybillNumber){
        this.spinner.show()
        this.$editWaybill.getEwayBill(this.fromdate, this.todate).subscribe(
          async response => {
            if (response) {
                this.spinner.hide()
                this.waybillList = response.waybillDetailList;
                let consignorArr = [];
                for(let item of this.waybillList){
                if(item.consignorId && item.custTypeLookupId){
                  let obj = this.allLookupList.find(e => e.id === item.custTypeLookupId);
                  if (obj) {
                    if ((obj.lookupVal).toUpperCase().includes('RETAIL') || (obj.lookupVal).toUpperCase().includes('CREDIT+RETAIL')) {
                      if(!consignorArr.includes(item.consignorId)){
                        consignorArr.push(item.consignorId);
                      }
                    }
                 }
                }
              }
              console.log('consignorArr',consignorArr)
              if (consignorArr.length > 0) {
                try {
                  this.consignorList = await this.commonService.getCnor_cneeList(consignorArr).toPromise();
                } catch (e) {
                  this.consignorList = [];
                }
              }

                this.dataSource5 = new MatTableDataSource(this.waybillList);
                // this.dataSource5.filterPredicate = (data, filter) => {
                //   return data.waybillNumber == filter;
                //  };
                this.dataSource5.sort = this.sort;
                this.dataSource5.paginator = this.paginator;
                this.applyWaybillFilter(this.filterValue)
                console.log(this.waybillList)
            }
        })
      }
     else if(this.waybillNumber){
        return this.gettingWaybillbyWaybillNumber();
      }
    }
    getAllLoad() {
        this.$editWaybill.getLoad().subscribe(Response => {
            if (Response) {
                this.allLookupList = Response;
                console.log(this.allLookupList);
            }
        })
    }
    getOffeing() {
        this.$editWaybill.getallOffering().subscribe(Response => {
            if (Response) {
                this.allOfferingList = Response;
                console.log(this.allOfferingList);
            }
        })
    }
    
    editWaybill(waybillDetails){
       
      let arr = [
        "WAYBILL GENERATED","CREATED","FREIGHT CALCULATED"
      ]
      let wayBillStatus = '';
      let obj = this.allLookupList.find(element => element.id === waybillDetails.wayblCurrStatusLookupId);
      if(obj){
        let checkStatus = arr.find(elem => elem === obj.lookupVal.trim());
        if(checkStatus == undefined){
          this.appComp.showMessage('Manifested waybill is not editable','warning')
          return;
        }
      }
      sessionStorage.setItem('waybillId', waybillDetails.waybillId);
      // if(waybillDetails.reBookingFlag == 1){
      //   this.route.navigate(['bookings-web-booking/create-start-booking']);
      //   return;
      // }
      // else if(waybillDetails.reRoutingFlag == 1){
      //   this.route.navigate(['bookings-web-booking/reRouting-start-booking']);
      //   return;
      // }
      let bookingType = this.allLookupList.find(elem=> elem.lookupTypeVal == 'BOOKING_REQUEST_TYPE' && elem.id == waybillDetails.lkpBookingRequestTypeId)
   
      if(bookingType.lookupVal == "DIRECT_BOOKING"){
        this.route.navigate(['bookings-web-booking/start-booking']);
      }
       
      else if(bookingType.lookupVal == "PRE_BOOKING"){
        sessionStorage.setItem('bookingReqId', waybillDetails.bookingReqId);
        this.route.navigate(['bookings-web-booking/prebooking-waybill']);
      }
      else if(bookingType.lookupVal == "WAYBILL"){
        sessionStorage.setItem('bookingReqId', waybillDetails.bookingReqId);
        sessionStorage.setItem('waybillId', waybillDetails.waybillId);
        this.route.navigate(['bookings-web-booking/initiate-waybill']);
      }
          
            //  window.location.href ='booking/star-booking'
    }
    applyWaybillFilter(filterValue){
        this.filterValue = filterValue;
        if(this.dataSource5 && this.filterValue){
            this.dataSource5.filter = filterValue.trim().toLowerCase();
        }
    }
    expiryMinDate: any;
    isVar = <boolean>false;
    currentDate = moment(new Date()).format("YYYY-MM-DD");
    todayDate = moment(new Date()).format("YYYY-MM-DD");
    checkForExpiryDate(effectiveDate) {
      let todayDate = moment(new Date()).format("YYYY-MM-DD");
      effectiveDate = moment(effectiveDate).format("YYYY-MM-DD");
      if (this.fromdate) {
        this.fromdate = moment(effectiveDate).format(
          "YYYY-MM-DD"
        );
      }
      if (
        this.todate > effectiveDate &&
        this.todate > todayDate
      ) {
        this.isVar = false;
      } 
      if (effectiveDate < todayDate) {
        return (this.expiryMinDate = effectiveDate);
      }
      // return (this.expiryMinDate = moment(effectiveDate, "YYYY-MM-DD")
      //   .add(0, "d").format("YYYY-MM-DD"));
    }
  
    removeMinDate(effectiveDate) {
      this.expiryMinDate = moment(effectiveDate).format("YYYY-MM-DD");
    }
  
    changeDateFormat(effectiveDate, expiryDate) {
      this.isVar = true;
      console.log(effectiveDate);
      if (effectiveDate) {
        this.fromdate = moment(effectiveDate).format(
          "YYYY-MM-DD"
        );
      }
      if (expiryDate) {
        this.todate = moment(expiryDate).format(
          "YYYY-MM-DD"
        );
      }
  
      this.checkForExpiryDate(effectiveDate);
    }
    gotoDashboard(){

      this.route.navigate(['bookings-web-booking/web-booking']);
    }

    /**  Return Customer name or Consignor name */
  getCustNameForRetail(element) {
    if (this.consignorList.length > 0 && element.custTypeLookupId ) {
      let obj = this.allLookupList.find(e => e.id === element.custTypeLookupId);
      if (obj && element.consignorId) {
        let returnval = '';
        if ((obj.lookupVal).toUpperCase().includes('RETAIL') || (obj.lookupVal).toUpperCase().includes('CREDIT+RETAIL')) {
           let cnor = this.consignorList.find(x=>x.id == element.consignorId);
           if(cnor){
            returnval = cnor.name;
           }

           return returnval;
          
        } else {
          return element.customerName;
        }
      } else {
        return element.customerName;
      }
    } else {
      return element.customerName
    }
  }
}
