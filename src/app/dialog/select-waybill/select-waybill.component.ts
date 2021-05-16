import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/core/common.service';
import { OpenBookingService } from 'src/app/core/service/open-booking.service';
import { WaybillService } from 'src/app/core/service/waybill.service';

@Component({
  selector: 'app-select-waybill',
  templateUrl: './select-waybill.component.html',
  styleUrls: []
})
export class SelectWaybillComponent implements OnInit {
  dataSource = [];
  displayedColumns: string[] = ['waybill', 'weight', 'packages', 'status', 'assigned', 'proceed'];
  allLookUps = [];
  waybillStatusList = [];
  currentWaybillSummary: any;
  profileDataList = [];
  staffList = [];
  constructor(
    private matSnackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private openBookingService: OpenBookingService,
    @Inject(MAT_DIALOG_DATA) public data,
    private router: Router,
    private commonService: CommonService,
    private waybillService: WaybillService) { }

  ngOnInit() {
    this.staffList = this.data.staffList;
    this.getAllLookups()
    sessionStorage.removeItem('bookingReqId');
    sessionStorage.removeItem('fromScreen');
    sessionStorage.removeItem('waybillId');
    console.log('data', this.data.waybilRequest.wayBillSummary);
    if(this.data.waybilRequest.wayBillSummary){
      this.data.waybilRequest.wayBillSummary.sort((a,b) => a.bookingRequestId - b.bookingRequestId);
    }
    

  }
  bookingUserType = [];
  getAllLookups() {
    this.profileDataList = [];
    this.spinner.show();
    this.commonService.getAllLookups().subscribe(
      async (res: any) => {
        //console.log('res getalllookups', res);
        this.allLookUps = res;
        this.bookingUserType = this.allLookUps.filter(x => x.lookupTypeVal == 'BOOKING-USER-CTGY');
        this.waybillStatusList = this.allLookUps.filter(x => x.lookupTypeVal == 'WAYBILL_STATUS');
        // console.log('waybillStatusList', this.waybillStatusList)
        // console.log('bookingUserType', this.bookingUserType)
        
        let profileIds = [];
        this.currentWaybillSummary = this.data.waybilRequest.wayBillSummary;
        for (let item of this.currentWaybillSummary) {
          if (item.userType && item.userId) {
            if (item.userType == 'ASSOCIATE' || item.userType == 'EMPLOYEE') {
              if (!profileIds.includes(item.userId)) {
                profileIds.push(item.userId);
              }
            }
          }
          if (item.userId && item.lkpPickupUserTypeId) {
            let userType = this.getPickupType(item)
            if(userType){
            if (userType == 'ASSOCIATE' || userType == 'EMPLOYEE') {
              if (!profileIds.includes(item.userId)) {
                profileIds.push(item.userId);
              }
            }
          }
          }
        }

        if (profileIds.length > 0) {
          try {
            this.profileDataList = await this.commonService.getUserProfileData(profileIds).toPromise();
          } catch (e) {
            this.profileDataList = [];
          }
        }

        this.dataSource = this.currentWaybillSummary;
        this.spinner.hide();
      }, (err: any) => {
        this.spinner.hide();
      })
  }
  getList() {
    const body = {
      bookingReqIdList: this.getRequestId()
    }
    this.openBookingService.getWaybillListWithStatus(body).subscribe(
      (resp: any) => {
        this.spinner.hide();
        const refrenceData = resp.data.referenceData
        // console.log(resp);
        console.log(resp.data.responseData, 'trdsjhfsjdhjf');
        this.dataSource = resp.data.responseData
        if (this.dataSource && this.dataSource.length > 0) {
          for (let row of this.dataSource) {
            row.bookingRequestStatus = 'PENDING';
            this.allLookUps.forEach((el) => {
              if (el.id == row.wayblCurrStatusLookupId) {
                row.bookingRequestStatus = this.getStatus(el.lookupVal);
              }
            });
          }
        }
      },
      (err) => {
        this.spinner.hide();

        console.log(err);
      }
    );
  }
  getStatus(val: string) {
    switch (val) {
      case 'MANIFEST CREATED':
        return 'COMPLETED';
      case 'WAYBILL GENERATED':
        return 'In PROGRESS'
      case 'FREIGHT CALCULATED':
        return 'In PROGRESS';
      case 'BOOKING CREATED':
        return 'PENDING';
      default:
        return 'PENDING';
    }
  }
  refType(id: any) {
    if (!id) {
      return;
    }
    const nameData = this.allLookUps.filter((ref) => ref.id === id);

    let name = "";
    if (nameData[0]) {
      name = nameData[0].lookupVal;
    }
    return name;
  }

  proceed(element) {
    // [routerLink]="['/bookings-web-booking/start-booking']" [queryParams]="{'bookingRequestId': element.bookingRequestId}"
    console.log('proceed', element);
    sessionStorage.setItem('bookingReqId', element.bookingRequestId)
    sessionStorage.setItem('fromScreen', 'waybill');

    console.log('is wayill id exist', element.waybillId)
    if (element.waybillId) {
      const body = {
        "userId": JSON.parse(sessionStorage.getItem('userDetails')).userId,
        // "userId" : element.userId,
        "userType": "ASSOCIATE",
        "waybillId": element.waybillId
      }
      this.spinner.show();
      this.waybillService.reAssignWayBill(body).subscribe(res => {
        this.spinner.hide();
        setTimeout(() => {
          this.router.navigate(['/bookings-web-booking/initiate-waybill']);
        }, 500);
      }, (err) => {
        this.spinner.hide();
      });
    } else {

      let assocObj = this.bookingUserType.find(x => x.lookupVal == 'ASSOCIATE');
      if (assocObj) {

        const body = {
          "bookingReqId": element.bookingRequestId,
          //"pickupUserId": element.userId,
          "pickupUserId": JSON.parse(sessionStorage.getItem('userDetails')).userId,
          "lkpPickupUserTypeId": assocObj.id,
        }
        console.log('body', body);
        this.spinner.show();
        this.openBookingService.assignBooking(body).subscribe(
          (resp) => {
            this.spinner.hide();
            setTimeout(() => {
              this.router.navigate(['/bookings-web-booking/initiate-waybill']);
            }, 500);
          },
          (err) => {
            console.log(err);
            this.spinner.hide();
          });
      }
    }
  }

  /**  Get status  */
  displayStatus(element) {
    status = '';
    if (!element.wayblCurrStatusLookupId) {
      status = 'PENDING';
      return status;
    }

    let statusObj = this.waybillStatusList.find(x => x.id == element.wayblCurrStatusLookupId);

    if (statusObj) {
      status = statusObj.attr1;
    }

    return status;

  }

  getStatusCssClass(element) {
    const val = this.displayStatus(element);

    if (val == 'INPROGRESS' || val == 'WAYBILL GENERATED') {
      return 'ipColor';
    } else if (val == 'COMPLETED') {
      return 'cColor';
    } else if (val == 'PENDING') {
      return 'pColor';
    } else {
      return '';
    }
  }

  getRequestId() {
    return this.data.waybilRequest.wayBillSummary.map(el => el.bookingRequestId);
  }

  /** Get User Name */
  getUserName(element) {
    if (!element.userType && !element.lkpPickupUserTypeId) {
      return '';
    }
    let returnVal = ''
    if (element.userId && element.userType) {
      if (element.userType == 'ASSOCIATE' || element.userType == 'EMPLOYEE') {
        let profObj = this.profileDataList.find(p => p.userId == (element.userId).toUpperCase())
        if (profObj) {
          returnVal = profObj.name
        } else {
          returnVal = '';
        }
      }
      if (element.userType == 'PICKUP-PERSON') {
        returnVal = this.getPickUpName(element.userId);
      }
    } 

    if(element.userId && element.lkpPickupUserTypeId){
      let pickupType = this.getPickupType(element);
      if(pickupType){
        if(pickupType == 'ASSOCIATE' || pickupType == 'EMPLOYEE'){
          let profObj = this.profileDataList.find(p => p.userId == element.userId)
          if(profObj){
            returnVal = profObj.name
          } else {
            returnVal = '';
          }
        }
        if (pickupType == 'PICKUP-PERSON') {
          returnVal = this.getPickUpName(element.userId);
        }
      } 
    }
    return returnVal
  }

  getPickUpName(id) {
    // console.log('this.staffffffidddddddddddddd', this.staffList, id);
    if (!id) {
      return;
    }
    const nameData = this.staffList.filter((ref) => ref.id === Number(id));

    let name = "";
    if (nameData[0]) {
      name = nameData[0].staffFname;
      if (nameData[0].staffMname && nameData[0].staffMname !== 'undefined') {
        name = name + ' ' + nameData[0].staffMname
      }
      if (nameData[0].staffLname && nameData[0].staffLname !== 'undefined') {
        name = name + ' ' + nameData[0].staffLname
      }
    }
    // console.log('name', name);
    return name;
  }

  /**  Get Pickup Lookup Type  */
  getPickupType(element) {
    if (!element.lkpPickupUserTypeId) {
      return;
    }
    let lookup = '';
    let typeObj = this.bookingUserType.find(x => x.id == element.lkpPickupUserTypeId)

    if (typeObj) {
      lookup = typeObj.lookupVal;
    }

    return lookup;
  }

}

export interface PeriodicElement {
  waybill: number;
  weight: string;
  packages: number;
  status: string;
  assigned: string;
  proceed: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { waybill: 654345, weight: '100 Kg', packages: 1079, status: 'Pending', assigned: 'Rishab', proceed: '' },
//   { waybill: 123456, weight: '50 Kg', packages: 1079, status: 'Completed', assigned: 'Rajesh', proceed: '' },
// ];
