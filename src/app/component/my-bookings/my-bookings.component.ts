import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatTable, MatTableDataSource } from '@angular/material';
import { MatSort, Sort} from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/common.service';
import { ExportService } from 'src/app/core/service/export.service';
import { WaybillService } from 'src/app/core/service/waybill.service';
import { forkJoin } from 'rxjs';
import { DateUtilService } from 'src/app/core/util/date-util.service';
@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  fromDate = new Date();
  toDate = new Date();
  maxToDate = new Date();
  currentDate = new Date();
  dataSource: MatTableDataSource<any>;
  refrenceList;
  dateRange = 0;
  allLookups = [];
  dataLength: any;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;
  pageNumber = 0;
  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  myData = [];
  profileDataList = [];
  consignorList = [];
  constructor(
    private spinner: NgxSpinnerService,
    private commonService: CommonService,
    private waybillService: WaybillService,
    private matSnackBar: MatSnackBar,
    private exportService: ExportService,
    private dateUtil: DateUtilService
  ) {
   // this.dataSource = new MatTableDataSource([]);
   }
  staffList = [];

  ngOnInit() {
    this.viewBookingList();
    this.getDateRangeFromLookup();
    this.getAllLookups();
    this.getStaffList();
  }
  getStaffList() {
    this.commonService.getStaffList().subscribe((staffResponse: any) => {
      this.staffList = staffResponse.assocStaffs;
      console.log('this.staffList', this.staffList);
    }, (err) => {
      console.log(err);
    })
  }
  getAllLookups() {
    this.commonService.getAllLookups().subscribe((res: any) => {
       console.log('res getalllookups', res);
      this.allLookups = res;
    }, (err: any) => {

    })
  }
  getAddress(add) {
    if (add.consignorAddress) {
      return add.consignorAddress;
    }
    if (add.consignorAddressLine1) {
      return `${add.consignorAddressLine1 ? add.consignorAddressLine1 : ''} ${add.consignorAddressLine2 ? add.consignorAddressLine2 : ''} ${add.consignorAddressLine3 ? add.consignorAddressLine3 : ''}`;
    }
    if (add.cnsorAddress1) {
      return `${add.cnsorAddress1 ? add.cnsorAddress1 : ''} ${add.cnsorAddress2 ? add.cnsorAddress2 : ''} ${add.cnsorAddress3 ? add.cnsorAddress3 : ''}`;
    }
  }
  getLookup(id) {
    const filterdeArr = this.allLookups.filter(el => el.id == id);
    // console.log('filterdeArr', filterdeArr);
    if (filterdeArr.length > 0) {
      return filterdeArr[0].lookupVal;
    }
    return '';
  }


  displayedColumns: string[] = ['waybillNumber', 'request', 'waybill', 'pick', 'booking', 'destination', 'sfx', 'customer', 'location', 'created'];
  // dataSource = ELEMENT_DATA;
  onChangeFromDate(event: any) {
    // console.log(event);
    // this.fromDate = event.value;
    console.log(event);
    this.fromDate = event.value;
    // let fromDate = new Date(this.fromDate);
    // const currentDate = new Date();
    // console.log('currentDate', currentDate);
    // fromDate.setDate(fromDate.getDate() + this.dateRange);
    // fromDate = this.dateUtil.getDateafterDay(fromDate, this.dateRange);
    // console.log('fromDate', fromDate);
    // if (fromDate.getTime() > currentDate.getTime()) {
    //   console.log('inside');
    //   this.maxToDate = currentDate;
    // } else {
    //   this.maxToDate = fromDate;
    // }
  }
  downloadExcel() {
    // const id = 'my-booking-table';
    if (!this.dataSource) return;
    let data = this.myData;
    data.sort((a,b)=> b.waybillId-a.waybillId);
    data = data.map(el => {
      return [el.waybillNumber, el.msaName && el.msaName.toUpperCase(), el.businessType && el.businessType.toUpperCase(), el.sfxPrcContractcode && el.sfxPrcContractcode.toUpperCase(), el.custContact, el.pickUpDate, el.time, el.address && el.address.toUpperCase(), el.userName && el.userName.toUpperCase(),  el.status && el.status.toUpperCase()]
    });
    data = [['WAYBILL NO.', 'CUSTOMER NAME', 'BOOKING TYPE', 'CUSTOMER CODE', 'CONTACT', 'PICK UP DATE', 'PICK UP TIME', 'ADDRESS', 'ASSIGNED TO', 'STATUS'], ...data];
    console.log('data', data);
    const filename = `my-bookings_${this.dateUtil.getFormatedDate('DD/MM/YYYY', this.fromDate)}_to_${this.dateUtil.getFormatedDate('DD/MM/YYYY', this.toDate)}.xlsx`
    this.exportService.exportexcel(filename, data);
  }
  getDateRangeFromLookup() {
    this.commonService.getLookUpByType('SEARCH_DATE_RANGE').subscribe((res: any) => {
       console.log('getDateRangeFromLookupgetDateRangeFromLookup', res);
      if (res.length) {
        this.dateRange = +res[0].lookupVal;
      } else {
        this.dateRange = 0;
      }
    }, (err: any) => {

    })
  }
  onChangeToDate(event) {
    // console.log(event);
    if (!this.fromDate) {
      this.toDate = null;
      // alert('Please select from date first');
      this.matSnackBar.open('Please select from date first', "", {
        duration: 3000,
        panelClass: ["text-white", "bg-red"],
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      return;
    }
    this.toDate = event.value;
  }
  applyFilter(val) {
    this.dataSource.filter = val.trim().toUpperCase();
    console.log(this.dataSource.filteredData,'this.dataSource.filter');
    
    if(!this.dataSource.filteredData.length && val.length== 15){
      this.spinner.show();
       this.waybillService.searchwaybillBywybillNum(val).subscribe(res => {
         console.log(res,'waybill data by search');
         
         let resp = [res];
         let userIdArr = [];
         let consignorArr = [];
         for(let item of resp) {
           if(item.userType == 'EMPLOYEE' || item.userType == 'ASSOCIATE'){
             if(!userIdArr.includes(item.userId)){
               userIdArr.push(item.userId);
             }
           } 
           console.log(userIdArr,'userIdArr')
           if(item.consignorId){
            if(!consignorArr.includes(item.consignorId)){
              consignorArr.push(item.consignorId);
            }
           }
           console.log(consignorArr,'consignorArr')
         }
         if(userIdArr.length > 0){
             this.commonService.getUserProfileData(userIdArr).subscribe(respn => {
              this.profileDataList = respn;
              console.log(respn,'respn')
             });
         }
     
         if (consignorArr.length > 0) {
              this.commonService.getCnor_cneeList(consignorArr).subscribe(resn => {
                this.consignorList = resn
                console.log(resn,'resn')
              });
         }
     
         resp = resp.map(el => {
           el.address = this.getAddress(el);
           el.time = el.pickupTime ? el.pickupTime :
             (el.pickUpToTime ? el.pickUpToTime : el.pickUpTotime)
           el.pickUpDate = el.pickUpDate ? el.pickUpDate : el.pickupDate
           console.log('el.pickUpDate', el.pickUpDate);
           if (el.pickUpDate.indexOf('/') == -1) {
             el.pickUpDate = this.dateUtil.getFormatedDate('DD/MM/YYYY', el.pickUpDate);
           }
           if (el.time && (el.time.split(":").length === 3)) {
             el.time = this.dateUtil.getFormatedTime('hh:mm A', el.time);
            // console.log('el.time', el.time);
           }
           let objs = this.allLookups.find( e => e.id === el.wayblCurrStatusLookupId);
           if(objs){
            el.status = objs.attr1
           }
          //  el.status = el.waybillRequestMasterStatus ? el.waybillRequestMasterStatus : el.waybillMasterStatus;
           if(el.businessTypeLookupId){
             el.businessType = this.getLookup(el.businessTypeLookupId);
           }
           
           if(el.userType == 'EMPLOYEE' || el.userType == 'ASSOCIATE'){
             
             const profileDetail: any = this.profileDataList.find(x => x.userId == (el.userId).toUpperCase());
             if (profileDetail) {
               el.userName = `${profileDetail.name}`;
             } else {
               el.userName = '';
             }
           } else{
               const userDetail: any = this.getStaffName(parseInt(el.userId));
             if (userDetail) {
               el.userName = `${userDetail.staffFname ? userDetail.staffFname : ''}${userDetail.staffMname ? ' ' + userDetail.staffMname.trim() : ''}${userDetail.staffLname ? ' ' + userDetail.staffLname.trim() : ''}`;
             } else {
               el.userName = '';
             }
           } 
           return el;
         });
         this.myData = resp;
         this.dataSource = new MatTableDataSource(this.myData);
         this.spinner.hide();
       },(err)=>{
         this.spinner.hide();
       })
    }
  }
  async viewBookingList() {
    if (!this.fromDate || !this.toDate) {
      this.matSnackBar.open('From date and todate is mandatory', "", {
        duration: 3000,
        panelClass: ["text-white", "bg-red"],
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      return;
    }
    const fromdate = new Date(this.fromDate);
    const toDate = new Date(this.toDate);
    if (fromdate.getTime() > toDate.getTime()) {
      this.matSnackBar.open('From date must be less than to date', "", {
        duration: 3000,
        panelClass: ["text-white", "bg-red"],
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      return;
    }
    this.spinner.show();
    this.dataSource = new MatTableDataSource([]);
    const body = {
      branchId: +sessionStorage.getItem('branchId'),
      fromDate: this.fromDate,
      toDate: this.toDate,
    }
    // console.log('body', body);
    // let waybillApiBookingResp = [];
    // let directBookingResp = []
    // let preBookingResp = [];
    // try{
    //   waybillApiBookingResp = await this.waybillService.getWaybillApiBookings(body).toPromise()
    // } catch(e) {
    //   waybillApiBookingResp = [];
    // }
    // try{
    //   directBookingResp = await this.waybillService.getDirectBookingList(body).toPromise()
    // } catch(e) {
    //   directBookingResp = [];
    // }
    // try{
    //   preBookingResp = await this.waybillService.getPreBookingStatus(body).toPromise();
    // } catch(e) {
    //   preBookingResp = [];
    // }
    // for (let row of preBookingResp) {
    //   row.waybillMasterStatus = row.preBookingMasterStatus;
    //   row.sfxCode = row.prcContractCode
    // }
    // directBookingResp = directBookingResp.map(el => {
    //   el.sfxCode = el.sfxPrcContractcode;
    //   el.businessType = this.getLookup(el.businessTypeLookupId)
    //   return el;
    // });
     let resp = [];
    try{
      resp = await this.waybillService.getMyBookingList(body).toPromise()
    } catch(e) {
      resp = [];
    }
    let userIdArr = [];
    let consignorArr = [];
    for(let item of resp) {
      if(item.userType == 'EMPLOYEE' || item.userType == 'ASSOCIATE'){
        if(!userIdArr.includes(item.userId)){
          userIdArr.push(item.userId);
        }
      } 
      if(item.consignorId){
       if(!consignorArr.includes(item.consignorId)){
         consignorArr.push(item.consignorId);
       }
      }
    }
    if(userIdArr.length > 0){
      try {
        this.profileDataList = await this.commonService.getUserProfileData(userIdArr).toPromise();
      }catch(e) {
        this.profileDataList = [];
      }
    }

    if (consignorArr.length > 0) {
      try {
        this.consignorList = await this.commonService.getCnor_cneeList(consignorArr).toPromise();
      } catch (e) {
        this.consignorList = [];
      }
    }

    resp = resp.map(el => {
      el.address = this.getAddress(el);
      el.time = el.pickupTime ? el.pickupTime :
        (el.pickUpToTime ? el.pickUpToTime : el.pickUpTotime)
      el.pickUpDate = el.pickUpDate ? el.pickUpDate : el.pickupDate
      // console.log('el.pickUpDate', el.pickUpDate);
      if (el.pickUpDate.indexOf('/') == -1) {
        el.pickUpDate = this.dateUtil.getFormatedDate('DD/MM/YYYY', el.pickUpDate);
      }
      if (el.time && (el.time.split(":").length === 3)) {
        el.time = this.dateUtil.getFormatedTime('hh:mm A', el.time);
       // console.log('el.time', el.time);
      }
      el.status = el.waybillRequestMasterStatus ? el.waybillRequestMasterStatus : el.waybillMasterStatus;
      if(el.businessTypeLookupId){
        el.businessType = this.getLookup(el.businessTypeLookupId);
      }
      
      if(el.userType == 'EMPLOYEE' || el.userType == 'ASSOCIATE'){
        
        const profileDetail: any = this.profileDataList.find(x => x.userId == (el.userId).toUpperCase());
        if (profileDetail) {
          el.userName = `${profileDetail.name}`;
        } else {
          el.userName = '';
        }
      } else{
          const userDetail: any = this.getStaffName(parseInt(el.userId));
        if (userDetail) {
          el.userName = `${userDetail.staffFname ? userDetail.staffFname : ''}${userDetail.staffMname ? ' ' + userDetail.staffMname.trim() : ''}${userDetail.staffLname ? ' ' + userDetail.staffLname.trim() : ''}`;
        } else {
          el.userName = '';
        }
      } 
      return el;
    });
    this.myData = resp;
    this.dataSource = new MatTableDataSource(this.myData);
   
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'createdDate': return new Date(item.createdDate);
        default: return item[property];
      }
    };
    const sortState: Sort = { active: 'createdDate', direction: 'desc' };
    
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataLength = resp.length;
    this.spinner.hide();

  }
/**  Return Customer name or Consignor name */
  getCustNameForRetail(element) {
    if (this.consignorList.length > 0) {
      let obj = this.allLookups.find(e => e.id === element.custTypeLookupId);
      if (obj && element.consignorId) {
        let returnval = '';
        if ((obj.lookupVal).toUpperCase().includes('RETAIL') || (obj.lookupVal).toUpperCase().includes('CREDIT+RETAIL')) {
           let cnor = this.consignorList.find(x=>x.id == element.consignorId);
           if(cnor){
            returnval = cnor.name;
           }

           return returnval;
          
        } else {
          return element.msaName? element.msaName : element.customerName;
        }
      } else {
        return element.msaName;
      }
    } else {
      return element.msaName
    }
  }
/**  Get Consignor mobile number */
  getCnorMobileNum(element) {
    if(!element.custTypeLookupId) {
      return '';
    }
    let returnval = '';
    if (this.consignorList.length > 0) {
      let obj = this.allLookups.find(e => e.id === element.custTypeLookupId);
      if (obj && element.consignorId) {
        if ((obj.lookupVal).toUpperCase().includes('RETAIL') || (obj.lookupVal).toUpperCase().includes('CREDIT+RETAIL')) {
           let cnor = this.consignorList.find(x=>x.id == element.consignorId);
           if(cnor){
           return returnval = cnor.mob;
           }
          }else{
            return returnval = this.consignorList[0].mob;
          }
        }
      }
      return returnval;
  }
  getsearchAddress(element){
    if(!element.custTypeLookupId) {
      return '';
    }
    let returnval = '';
    if (this.consignorList.length > 0) {
      let obj = this.allLookups.find(e => e.id === element.custTypeLookupId);
      if (obj && element.consignorId) {
        if ((obj.lookupVal).toUpperCase().includes('RETAIL') || (obj.lookupVal).toUpperCase().includes('CREDIT+RETAIL')) {
          //  let cnor = this.consignorList.find(x=>x.id == element.consignorId);
          //  if(cnor){
          //  return returnval = cnor.mob;
          //  }
          }else{
            let addBk = this.consignorList[0]['addrBook']
            return returnval = addBk.addr1 ? addBk.addr1 : '' + addBk.addr2 ? addBk.addr2 : ' ' + addBk.addr3 ? addBk.addr3 : '';
          }
        }
      }
      return returnval;
  }

  getStaffName(userId) {
    const filteredStaff = this.staffList.filter(staff => staff.id == userId);
    // console.log('filteredStaff', filteredStaff);
    if (filteredStaff && filteredStaff.length) {
      return filteredStaff[0];
    } else {
      return '';
    }
  }

  getStatus(val: string) {
    switch (val) {
      case 'MANIFEST CREATED':
        return 'COMPLETED';
      case 'WAYBILL GENERATED':
      case 'BOOKING CREATED':
        return 'PENDING';
      default:
        return 'IN PROGRESS';
    }
  }
}


export interface PeriodicElement {
  request: string;
  waybill: string;
  pick: string;
  booking: string;
  destination: string;
  sfx: string;
  customer: string;
  location: string;
  created: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { request: '', waybill: '', pick: '', booking: '', destination: '', sfx: '', customer: '', location: '', created: 'PENDING' },
  { request: '', waybill: '', pick: '', booking: '', destination: '', sfx: '', customer: '', location: '', created: 'PENDING' },
  { request: '', waybill: '', pick: '', booking: '', destination: '', sfx: '', customer: '', location: '', created: 'PENDING' },
  { request: '', waybill: '', pick: '', booking: '', destination: '', sfx: '', customer: '', location: '', created: 'IN PROGRESS' },
  { request: '', waybill: '', pick: '', booking: '', destination: '', sfx: '', customer: '', location: '', created: 'IN PROGRESS' },
  { request: '', waybill: '', pick: '', booking: '', destination: '', sfx: '', customer: '', location: '', created: 'COMPLETED' },
  { request: '', waybill: '', pick: '', booking: '', destination: '', sfx: '', customer: '', location: '', created: 'COMPLETED' },
  { request: '', waybill: '', pick: '', booking: '', destination: '', sfx: '', customer: '', location: '', created: 'COMPLETED' },
];
