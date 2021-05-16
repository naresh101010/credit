import { FinaliseModalComponent } from './../../dialog/finalise-modal/finalise-modal.component';
import { ExtendManifestComponent } from './../../dialog/extend-manifest/extend-manifest.component';
import { ConfirmManifestModalComponent } from './../../dialog/confirm-manifest-modal/confirm-manifest-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ManifestService } from 'src/app/core/service/manifest.service';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { BookingInformationService } from 'src/app/core/service/booking-information.service';
import { CommonService } from 'src/app/core/common.service';
import { Router, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DateUtilService } from 'src/app/core/util/date-util.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-manifest-creation',
  templateUrl: './manifest-creation.component.html',
  styleUrls: ['./manifest-creation.component.css']
})
export class ManifestCreationComponent implements OnInit {
  toDate;
  fromDate;
  currentDate = new Date();
  maxToDate = new Date();
  dataSource: MatTableDataSource<any>;
  serviceOfferId;
  serviceOfferId1 = [];
  createdManifaests: MatTableDataSource<any>
  serviceOfferingList = [];
  branchId = JSON.parse(sessionStorage.getItem("branchId"))
  userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  headerData = {
    branchCode: "02",
    journeyId: "01",
    originUserType: "03",
    branchId: this.branchId,
    userId: this.userDetails.userId,
  } as any;
  offeringname: any;
  dataLength: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  pageNumber = 0;
  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;
  stageList = [];
  constructor(
    private dialog: MatDialog,
    private manifestService: ManifestService,
    private bookingInfo: BookingInformationService,
    private commonService: CommonService,
    private matSnackBar: MatSnackBar,
    private dateUtil: DateUtilService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    sessionStorage.removeItem('selectedManifest')
    sessionStorage.removeItem('manifestId');
    sessionStorage.removeItem('extended');
    this.getServiceOffering();
    this.getAllOfferings();

    this.getAllLookups();
    this.getAllVehicles();
    this.getDateRangeFromLookup();
    this.getStageList();
  }
  dateRange = 0;
  getDateRangeFromLookup() {
    this.commonService.getLookUpByType('SEARCH_DATE_RANGE').subscribe((res: any) => {
      console.log('getDateRangeFromLookupgetDateRangeFromLookup', res);
      if (res.length) {
        this.dateRange = +res[0].lookupVal;
      } else {
        this.dateRange = 0;
      }
    }, (err: any) => {
      console.log(err);
    })
  }
  getStageList() {
    this.commonService.getLookUpByType('MANIFEST_STATUS').subscribe((res: any) => {
      this.stageList = res.filter(el => el.lookupVal !== 'FINALIZE' && el.lookupVal !== 'EXTEND');
      console.log('this.stageList', this.stageList);
    }, (err: any) => {
      console.log(err);
    })
  }
  isManifest: boolean = true;
  displayedColumns: string[] = ['request', 'waybill', 'pick', 'booking', 'destination', 'sfx', 'customer', 'location', 'created', 'finalish'];
  displayedColumns2: string[] = ['request', 'waybill', 'pick', 'booking', 'destination', 'sfx', 'customer', 'location', 'created'];
  dataSource2 = ELEMENT_DATA2;
  ProgressScreen() {
    this.isManifest = !this.isManifest;
    if (!this.isManifest) {
      this.fromDate = new Date();
      this.toDate = new Date();
      this.getManifestByserviceOfferingAndDate();
    }
  }
  selectedOffering(offeringIds) {
    console.log('offeringids', offeringIds);
    // console.log('this.dataSource.data', this.dataSource.data);
    // if (offeringIds && offeringIds.length) {
    //   console.log(this.stage);
    //   if (this.stage) {
    //     this.dataSource.filter = (this.getOfferings(offeringIds) + this.stage).trim();
    //   } else {
    //     this.dataSource.filter = this.getOfferings(offeringIds).trim()
    //   }
    // } else {
    //   if (this.stage) {
    //     this.dataSource.filter = this.stage.trim();
    //   }
    //   this.dataSource.filter = ''.trim();
    // }
    this.filterByStageAndServiceOffrung();
  }
  filterByStageAndServiceOffrung() {
    console.log(this.serviceOfferId);
    console.log(this.stage);
    if (this.serviceOfferId && this.serviceOfferId.length) {
      console.log(this.stage);
      if (this.stage) {
        const str = JSON.stringify({ offerings: this.getOfferings(this.serviceOfferId), stage: this.stage });
        this.dataSource.filter = str;
      } else {
        const str = JSON.stringify({ offerings: this.getOfferings(this.serviceOfferId) })
        this.dataSource.filter = str;
      }
    } else if (this.stage) {
      const str = JSON.stringify({ stage: this.stage });
      this.dataSource.filter = str;
    } else {
      this.dataSource.filter = ''.trim();
    }
  }
  onSelectedStage(val) {
    console.log(val);
    this.filterByStageAndServiceOffrung();
    // this.dataSource.filter = val.trim();
  }
  getServiceOffering() {
    this.bookingInfo.getAllServiceOffering(this.headerData).subscribe((response) => {
      if (response) {
        this.serviceOfferingList = response;
        // this.serviceOfferId = [this.serviceOfferingList[0].id];
        this.serviceOfferingList.forEach((elem) => {
          elem.value = elem.descr;
        });
        console.log('this.serviceOfferingList', this.serviceOfferingList);
        console.log('this.serviceOfferId', this.serviceOfferId);
      }
    });
  }
  getSelectedService() {
    const obj = this.serviceOfferingList.find(offering => offering.id == this.serviceOfferId);
    // console.log('obj', obj);
    if (!obj) {
      return ''
    }
    return obj.value;
  }

  allLookUps = [];
  allOfferings = [];
  allVehicles = [];
  stage = ''
  getAllLookups() {
    this.commonService.getAllLookups().subscribe((res: any) => {
      // console.log('res getalllookups', res);
      this.allLookUps = res;
      // this.allLookUps.forEach(el => {
      //   if (el.lookupVal == 'HUB' || el.lookupTypeVal == 'MANIFEST_SHIPMENT_TYPE') {
      //     console.log('el;;;;;;;;;;;', el);
      //   }
      // })
    }, (err: any) => {

    })
  }

  getAllOfferings() {
    this.spinner.show();
    this.commonService.getAllOfferings().subscribe((res: any) => {
      console.log('res getAllOfferings', res);
      this.allOfferings = res;
      this.getAllPendingManifestByUserId();
    }, (err: any) => {
      this.spinner.hide();
    })
  }

  getAllVehicles() {
    this.commonService.getAllVehicles().subscribe((res: any) => {
      console.log('res getAllVehicles', res);
      this.allVehicles = res;
    }, (err: any) => {
    })
  }
  refType(id: any) {
    if (!id) {
      return;
    }
    const nameData = this.allLookUps.filter((ref) => ref.id === id);
    // console.log(nameData)
    // console.log('id',id)

    let name = "";
    if (nameData[0]) {
      name = nameData[0].lookupVal;
    }
    return name;
  }

  offeringType(id: any) {
    // console.log('this.allOfferings', this.allOfferings);
    if (!id) {
      return;
    }
    const nameData = this.serviceOfferingList.filter((ref) => ref.id === id);
    // console.log('namedata',nameData)
    // console.log('id',id)

    let name = "";
    if (nameData[0]) {
      name = nameData[0].value;
      this.offeringname = name
    }
    return name;
  }
  vehicleType(id: any) {
    if (!id) {
      return;
    }
    const nameData = this.allVehicles.filter((ref) => ref.id === id);
    // console.log('namedata',nameData)
    // console.log('id',id)

    let name = "";
    if (nameData[0]) {
      name = nameData[0].vehicleNum;
    }
    return name;
  }
  openConfirmMenifestModel(element) {
    var dialog = this.dialog.open(ConfirmManifestModalComponent, {
      width: "55rem",
      panelClass: "bookingDialog",
      data: element
    });
    dialog.afterClosed().subscribe((res: any) => {
      console.log('res', res);
      if (res) {
        this.dataSource = new MatTableDataSource([]);
        this.getAllPendingManifestByUserId();
      }
    });
  }
  getOfferings(offeringIds) {
    // console.log('offeringIds', offeringIds);
    const offerings = offeringIds.map(el => this.offeringType(el)).join(', ');
    // console.log('offerings' , offerings);
    return offerings;
  }
  openExtendModel(element) {
    console.log('element', element)
    var dialog = this.dialog.open(ExtendManifestComponent, {
      width: "55rem",
      panelClass: "bookingDialog",
      data: {
        serviceOfferigs: this.getOfferings(element.lkpServiceOfferingTypeIdList),
        id: element.id
      }

    });
    dialog.afterClosed().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource([]);
      this.getAllPendingManifestByUserId();
    })
  }
  openFinaliseModal(element) {
    var dialog = this.dialog.open(FinaliseModalComponent, {
      width: "55rem",
      panelClass: "bookingDialog",
      data: element
    });
    dialog.afterClosed().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource([]);
      this.getAllPendingManifestByUserId();
    })
  }
  getAllPendingManifestByUserId() {
    this.spinner.show();
    this.manifestService.getAllPendingManifestByUserId().subscribe((resp: any) => {
      console.log(resp);
      let response = resp.data.responseData;
      response = response.map(el => {
        el.offerings = this.getOfferings(el.lkpServiceOfferingTypeIdList);
        el.stage = this.refType(el.lkpManifestStatusId);
        // el.shipmentType = 'HUB'; 
        if (el.lkpManifestShipmentType) {
          this.allLookUps.forEach(el => {
            if (el.id == el.lkpManifestShipmentType && el.lookupTypeVal == 'MANIFEST_SHIPMENT_TYPE') {
              console.log('el', el);
              el.shipmentType = el.lookupVal;
            }
          });
        }
        el.waybillPackages = (el.manifestWaybillList ? el.manifestWaybillList.length : 0) + '/' + this.getLoadedPackage(el)
        return el;
      });
      response.sort((a, b) => b.id - a.id);
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.customFilter
      this.dataLength = response.length;
      this.spinner.hide();

    }, (err) => {
      console.log(err);
      this.spinner.hide();

    })
  }
  private customFilter = (data: any, filter: string) => {
    console.log('data', data);
    console.log('filter', filter);
    if (!filter) return true;
    const obj = JSON.parse(filter);
    if (obj.offerings && obj.stage) {
      const output = data.offerings.indexOf(obj.offerings) > -1 && data.stage.indexOf(obj.stage) > -1
      console.log('offerings and stage output', output);
      return output;
    } else if (obj.offerings) {
      const output = data.offerings.indexOf(obj.offerings) > -1;
      console.log('offerings output', output);
      return output
    } else if (obj.stage) {
      const output = data.stage.indexOf(obj.stage) > -1;
      console.log('stage output', output);
      return output;
    } else if (obj.default) {
      let str = '';
      Object.keys(data).forEach(key => {
        str += data[key];
      });
      console.log('str', str);
      const output = str.indexOf(obj.default) > -1;
      console.log('default output', output);
      return output;
    } else {
      console.log('non of the above');
      return true;
    }
  };
  // getTotalAvialPackage(el) {
  //   const data: any = el.manifestWaybillList ? el.manifestWaybillList : [];
  //   console.log('el', el);
  //   return data.reduce((acc, el) => acc + (el.avlPkgCount ? el.avlPkgCount : 0), 0);
  // }
  getLoadedPackage(el) {
    const data: any = el.manifestWaybillList ? el.manifestWaybillList : [];
    return data.reduce((acc, el) =>
      acc + (el.loadedPkgCount ? el.loadedPkgCount : 0)
      , 0)
  }
  getManifestByserviceOfferingAndDate() {
    if (!this.fromDate || !this.toDate) {
      this.matSnackBar.open('From date and todate is mandatory', "", {
        duration: 3000,
        panelClass: ["text-white", "bg-red"],
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      return 0;
    }
    let offerings = this.serviceOfferingList.map(el => el.id);
    if (this.serviceOfferId1.length) {
      offerings = this.serviceOfferId1
    }
    this.spinner.show();
    const body = {
      toDate: this.toDate,
      fromDate: this.fromDate,
      serviceOfferId: offerings
    }
    this.manifestService.getManifestByserviceOfferingAndDate(body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      let response = resp.data.responseData;
      response = response.filter(el => {
        const status = this.refType(el.lkpManifestStatusId);
        return status == 'FINALIZE';
      });
      console.log('response', response);
      this.createdManifaests = new MatTableDataSource(response);
      this.createdManifaests.sort = this.sort;
      this.createdManifaests.paginator = this.paginator;
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    });
  }
  
  navigateToViewManifest(element) {
    sessionStorage.setItem('manifestId', element.id);
    this.router.navigateByUrl('/bookings-web-booking/view-manifest');
    // [routerLink]="['/bookings-web-booking/view-manifest']" [queryParams]="{manifestId: element.id}"
  }
  applyFilter(filterValue) {
    ;
    const str = JSON.stringify({default: filterValue.trim().toLowerCase()}) 
    console.log(str);
    this.dataSource.filter = str;
  }
  onChangeFromDate(event: any) {
    console.log(event);
    this.fromDate = event.value;
    let fromDate = new Date(this.fromDate);
    const currentDate = new Date();
    console.log('currentDate', currentDate);
    // fromDate.setDate(fromDate.getDate() + this.dateRange);
    fromDate = this.dateUtil.getDateafterDay(fromDate, this.dateRange);
    console.log('fromDate', fromDate);
    if (fromDate.getTime() > currentDate.getTime()) {
      console.log('inside');
      this.maxToDate = currentDate;
    } else {
      this.maxToDate = fromDate;
    }
  }
  onChangeToDate(event) {
    console.log(event);
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
  getDisabled(id) {
    const status = this.refType(id);
    // console.log('status', status);
    // if (status !== 'CONFIRM') {
    //   return true;
    // }
    // if (status !== 'EXTEND') {
    //   return true;
    // } 
    switch (status) {
      case 'EXTEND':
        return false;
      case 'CONFIRM':
        return false;
      default:
        return true;
    }

  }
  openUpdate(element) {
    console.log('eleement', element)
    sessionStorage.setItem('manifestId', element.id);
    let url = '/bookings-web-booking/update-manifest';
    // let navigationExtras: NavigationExtras = { state: { data: element, type: 'update' } };
    this.router.navigateByUrl(url);
    // this.router.navigateByUrl('/bookings-web-booking/update-manifest', { state: {data:element} });
    // this.router.navigate(['/bookings-web-booking/update-manifest',{data:element}])
  }
  createManifest() {
    let url = '/bookings-web-booking/create-manifest';
    let navigationExtras: NavigationExtras = { state: { type: 'Create' } };
    this.router.navigateByUrl(url, navigationExtras);
  }
}

export interface PeriodicElement {
  request: number;
  waybill: number;
  pick: string;
  booking: string;
  destination: string;
  sfx: string;
  customer: string;
  location: string;
  created: string;
  finalish: string;
  extrand: string;
}

export interface PeriodicElement2 {
  request: number;
  waybill: number;
  pick: string;
  booking: string;
  destination: string;
  sfx: string;
  customer: string;
  location: string;
  created: string;
}


const ELEMENT_DATA2: PeriodicElement2[] = [
  { request: 12345, waybill: 12345, pick: '31/11/2020', booking: 'Del 10', destination: 'Del 12', sfx: 'SFX123', customer: 'TATA', location: 'Delhi', created: 'BranchCode', },
  { request: 12345, waybill: 12345, pick: '31/11/2020', booking: 'Del 10', destination: 'Del 12', sfx: 'SFX123', customer: 'TATA', location: 'Delhi', created: 'BranchCode', },
  { request: 12345, waybill: 12345, pick: '31/11/2020', booking: 'Del 10', destination: 'Del 12', sfx: 'SFX123', customer: 'TATA', location: 'Delhi', created: 'BranchCode', },
];

const ELEMENT_DATA: PeriodicElement[] = [
  { request: 12345, waybill: 12345, pick: '31/11/2020', booking: 'Del 10', destination: 'Del 12', sfx: 'CREATED', customer: '25/01/2020', location: '', created: '', finalish: '', extrand: '', },
  { request: 12345, waybill: 12345, pick: '31/11/2020', booking: 'Del 10', destination: 'Del 12', sfx: 'UPLOADED', customer: '25/01/2020', location: '', created: '', finalish: '', extrand: '', },
  { request: 12345, waybill: 12345, pick: '31/11/2020', booking: 'Del 10', destination: 'Del 12', sfx: 'FINALIZED', customer: '25/01/2020', location: '', created: '', finalish: '', extrand: '', },
  { request: 12345, waybill: 12345, pick: '31/11/2020', booking: 'Del 10', destination: 'Del 12', sfx: 'EXTENDED', customer: '25/01/2020', location: '', created: '', finalish: '', extrand: '', },
];