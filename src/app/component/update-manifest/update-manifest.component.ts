import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { BookingInformationService } from 'src/app/core/service/booking-information.service';
import { ManifestService } from 'src/app/core/service/manifest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CommonService } from 'src/app/core/common.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-manifest',
  templateUrl: './update-manifest.component.html',
  styleUrls: ['./update-manifest.component.css']
})
export class UpdateManifestComponent implements OnInit {
  displayedColumns3: string[] = ['request', 'congsigneename', 'custtype', 'booking', 'remaning'];
  branchId = JSON.parse(sessionStorage.getItem("branchId"))
  userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  headerData = {
    branchCode: "02",
    journeyId: "01",
    originUserType: "03",
    branchId: this.branchId,
    userId: this.userDetails.userId,
  } as any;
  serviceOfferingList;
  serviceOfferIds = [];
  waybillListData = [];
  vehicleLists: MatTableDataSource<any>;
  dataSource3: MatTableDataSource<any>;
  data: any;
  updateButtondata: any;
  scanpackageArray: any = [];
  vehicleId: any;
  dataType: any;
  branchList: any;
  branchIdValue: any;
  manifestId: any;
  wayData: any;
  consignerName: any;
  custType: any;
  selectedBranch = '';
  addForm: FormGroup;
  constructor(
    private bookingInfo: BookingInformationService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRefs: ChangeDetectorRef,
    private manifestService: ManifestService,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private commonService: CommonService) {

  }
  isExtended = false;
  ngOnInit() {
    this.manifestId = sessionStorage.getItem('manifestId');
    const isExtended = sessionStorage.getItem('extended');
    console.log('isExtended', isExtended);
    console.log('this.manifestId', this.manifestId);
    if (isExtended) {
      this.isExtended = true;
    }
    if (!this.manifestId) {
      return this.router.navigateByUrl('/bookings-web-booking/manifest-creation')
    } else {
      this.getManifestByManifestId()
      this.getServiceOffering();
      this.getVehicles();
      this.getAllLookups();
      this.getBranches();
      this.addForm = this.fb.group({
        rows: this.fb.array([])
      });
      this.getHubListByBranchId();
    }
  }
  get getDatasource() {
    console.log(this.rows.value);
    return new MatTableDataSource(this.rows.value);
  }
  getBranchById() {
    this.commonService.getBranchDetailByBrancId([this.selectedBranch]).subscribe(resp => {
      if (resp && resp.length) {
        this.hubname = resp[0].branchName;
      }
    },(err)=>{
      this.spinner.hide();
    })
  }
  getHubListByBranchId() {
    const id = sessionStorage.getItem('branchId');
    this.manifestService.getHubListByBranchId(id).subscribe((res: any) => {
      console.log('Hub List', res)
      this.hubList = res.data.responseData;
    });
  }
  selectedOffering($event) {
    this.serviceOfferIds = $event;
    this.createManifest(false);
    console.log('this.serviceOfferIds', this.serviceOfferIds);
  }
  get rows() {
    return this.addForm.get('rows') as FormArray;
  }
  onAddRow(val?: any) {
    this.rows.push(this.fb.group({
      wayBillNumber: [val ? val.wayBillNumber : '', Validators.required],
      loadPackages: [val ? val.loadPackages : '', Validators.required],
      consignerName: [val ? val.consignerName : ''],
      customerType: [val ? val.customerType : ''],
      totalPackage: [val ? val.totalPackage : '']
    }));
  }
  waybillNumbers = [];
  onRemoveRow(i) {
    this.rows.removeAt(i);
    this.waybillNumbers.splice(i, 1);

  }
  keyValue(event, i) {
    // console.log('event', event.target.value, i);
    let wayBillnumber = event.target.value;
    if (wayBillnumber.length == 15) {
      this.spinner.show();
      this.manifestService.getByWayBillNumber(wayBillnumber).subscribe((res: any) => {
        this.spinner.hide();
        const response = res.data.responseData;
        const statusObj = this.allLookUps.find(el => el.id == response.wayblCurrStatusLookupId);
        console.log('statusObj', statusObj);
        if (statusObj && (statusObj.lookupVal == 'FREIGHT CALCULATED' || statusObj.lookupVal == 'BOOKING CREATED')) {
          this.matSnackBar.open(`waybill number ${wayBillnumber} needs to be generated to create manifest`, "", {
            duration: 3000,
            panelClass: ["text-white", "bg-red"],
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          return;
        }
        const loggedBranchId = sessionStorage.getItem('branchId');
        console.log('loggedBranchId', loggedBranchId);
        if (response.bookingBranchId != loggedBranchId) {
          this.matSnackBar.open(`Waybill branch should be same the logged in branch`, "", {
            duration: 3000,
            panelClass: ["text-white", "bg-red"],
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          return;
        }
        this.waybillNumbers[i] = response;
        // console.log('this.waybillNumbers', this.waybillNumbers);
        let lookUp = [];
        lookUp = res.data.referenceData.referenceItemList;
        let a = lookUp.filter(data => data.id == response.custTypeLookupId);
        const customerType = a[0].value;
        const consignorId = response.consignorId;
        if (consignorId) {
          this.getConsignerName1(consignorId, i);
          const totalPackage = response.totalPackageCount;
          this.rows.controls[i].patchValue({ totalPackage, customerType });
        } else {
          this.rows.controls[i].get('consignerName').patchValue(null);
          this.waybillNumbers.splice(i, 1);
          this.matSnackBar.open('Consignor doees not exist for the waybill number.', "", {
            duration: 3000,
            panelClass: ["text-white", "bg-red"],
            horizontalPosition: "right",
            verticalPosition: "top",
          });
        }

      })
    }
  }
  hubList = [];
  showHubList = true;
  onKeyUp(event) {
    console.log(event.target.value)
    let hubname = event.target.value;
    let hubnameLength = event.target.value.length;
    if (hubnameLength >= 3) {
      this.spinner.show();
      this.manifestService.getHubname(hubname).subscribe((resp: any) => {
        this.spinner.hide();
        this.hubList = resp.data.responseData;
        const branchName = sessionStorage.getItem('branchName');
        console.log('branchName', branchName);
        this.hubList = this.hubList.filter(el => el.branchName != branchName);
        this.showHubList = true;
      }, (err) => {
        this.spinner.hide();
      })
    }
  }
  getConsignerName1(consignorId, i) {
    this.manifestService.getConsignerName(consignorId).subscribe((res: any) => {
      // console.log('res', res)
      const consignerName = res.data.responseData.name;
      this.rows.controls[i].get('consignerName').patchValue(consignerName);
    })
  }
  getVehicles() {
    this.manifestService.getVehicleListByuserId().subscribe(
      (resp: any) => {
        // console.log('vehicle', resp);
        this.vehicleLists = new MatTableDataSource(resp.data.responseData);
        // console.log('thisssss', this.vehicleLists)
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getServiceOffering() {
    this.bookingInfo.getAllServiceOffering(this.headerData).subscribe((response) => {
      if (response) {
        this.serviceOfferingList = response;
        // this.serviceOfferIds = this.serviceOfferingList[0].id;
        this.serviceOfferingList.forEach((elem) => {
          elem.value = elem.descr;
        });
        // console.log('this.serviceOfferingList', this.serviceOfferingList);
        // console.log('this.serviceOfferId', this.serviceOfferId);
      }
    });
  }

  displayedColumns: string[] = ['checkbox', 'waybill', 'pickup', 'mop'];
  dataSource = ELEMENT_DATA;

  getwayByWaybillNumber() {
    let i = 0;
    this.spinner.show();
    if (!this.updateButtondata.length) {
      this.spinner.hide();
    }
    for (let data of this.updateButtondata) {
      this.manifestService.getByWayBillNumber(data.waybillNumber).subscribe((res: any) => {
        // console.log('response way bill @@@', res)
        let responseData = res.data.responseData;
        delete responseData.id;
        if (this.isBranchScannable) {
          this.scannnedStickerCount++;
          this.waybillNumbersWihScan[this.scannnedStickerCount] = responseData
          this.waybillNumbersWihScan[this.scannnedStickerCount].id = data.id;
        }
        this.waybillNumbers[i] = responseData;
        this.waybillNumbers[i].id = data.id;
        console.log('this.waybillNumbers', this.waybillNumbers);
        this.waybillListData = JSON.parse(JSON.stringify(this.waybillNumbers));
        i++;
        let lookUpData = res.data.referenceData.referenceItemList;
        let filterData = lookUpData.filter(data => data.id == responseData.custTypeLookupId);
        //  console.log('filterData' , filterData);
        if (filterData) {
          this.custType = filterData[0].value;
        }

        this.getConsignerName(data, responseData, i);
        // console.log('ressss' , this.wayData.consignorId)
        // console.log('this.consigner name @@' , this.consignerName); 
      },(err)=>{
        this.spinner.hide();
      })
    }

  }
  getConsignerName(data, waybillResponse, i) {
    this.manifestService.getConsignerName(waybillResponse.consignorId).subscribe(async (res: any) => {
      
      if (res.status == 'SUCCESS') {
        const remaninigPackages = await this.manifestService.getRemainingPackages(waybillResponse.waybillId).toPromise();
        let consignerName = res.data.responseData.name;
        this.onAddRow({ wayBillNumber: data.waybillNumber, loadPackages: data.loadedPkgCount, customerType: this.custType, consignerName: consignerName, totalPackage: waybillResponse.totalPackageCount });
        this.scanpackageArray.push({ 'consignerName': consignerName, 'consigneeId': waybillResponse.consigneeId, 'custTypeLookupId': this.custType, 'wayBillNumber': data.waybillNumber, 'availablepackage': data.avlPkgCount ? data.avlPkgCount : 0, 'remaninigPackages': remaninigPackages.length })
        this.dataSource3 = new MatTableDataSource(this.scanpackageArray);
        this.changeDetectorRefs.detectChanges();
      }
      this.spinner.hide();
    }, (err) => {
      this.spinner.hide();
    })
  }
  onKeyUpInLoadedPackage(index) {
    const loadedPackages = +this.rows.controls[index].get('loadPackages').value;
    console.log('loadedPackages', loadedPackages);
    console.log('this.waybillNumbers', this.waybillNumbers);
    if (this.waybillNumbers[index].totalPackageCount < loadedPackages) {
      // console.log('Value must be lessa than total package');
      this.matSnackBar.open('Value must be less than or eqaul to total package', "", {
        duration: 3000,
        panelClass: ["text-white", "bg-red"],
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      this.rows.controls[index].get('loadPackages').patchValue(0);
    }
  }


  radioChange(event) {
    // console.log('event', event)
    this.vehicleId = event;
    this.createManifest(false);
  }

  makeMainfestWaybillList() {
    const waybillNumbers = this.isBranchScannable ? this.waybillNumbersWihScan : this.waybillNumbers

    return waybillNumbers.map((el, i) => {
      return {
        avlPkgCount: el.totalPackageCount,
        bookingRequestId: el.bookingReqId,
        bookingWaybillId: el.waybillId,
        id: el.id ? el.id : null,
        lkpServiceOfferingTypeId: el.serviceOfferingId,
        loadedPkgCount: this.isBranchScannable ? el.loadedPkgCount : +this.rows.controls[i].get('loadPackages').value,
        manifestId: this.manifestId,
        waybillNumber: el.waybillNumber
      }
    });
  }
  getVehicleNum() {
    const vehicles = this.vehicleLists.data;
    // console.log('vehicles', vehicles);
    const vehicle = vehicles.filter(vehicle => vehicle.id == this.vehicleId);
    // console.log('vehicle', vehicle);
    return vehicle[0].vehicleNum;
  }
  getCreateBody() {
    // console.log('this.serviceOfferingIdList', this.serviceOfferingIdList);
    if (!this.branchIdValue) {
      this.matSnackBar.open('Please select To Location', "", {
        duration: 3000,
        panelClass: ["text-white", "bg-red"],
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      // console.log('please select to branch');
      return 0;
    }
    if (!this.vehicleId) {
      // console.log('Please select vehicle');
      this.matSnackBar.open('Please select vehicle', "", {
        duration: 3000,
        panelClass: ["text-white", "bg-red"],
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      return 0;
    }
    if (!this.serviceOfferIds.length) {
      this.matSnackBar.open('Please select service offering', "", {
        duration: 3000,
        panelClass: ["text-white", "bg-red"],
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      return 0;
    }
    let isWaybillOfferingInSelectedOffrings = true;
    let isFoundInvoiceWithMoreThan50k = false;
    const waybillNumbers = this.isBranchScannable ? this.waybillNumbersWihScan : this.waybillNumbers
    for (let waybillNumber of waybillNumbers) {
      if (this.serviceOfferIds.indexOf(waybillNumber.serviceOfferingId) === -1) {
        this.matSnackBar.open(`Service offering of ${waybillNumber.waybillNumber} does not match the selected offering`, "", {
          duration: 3000,
          panelClass: ["text-white", "bg-red"],
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        isWaybillOfferingInSelectedOffrings = false;
        break;
      } else if (waybillNumber.ewaybillAvailableFlag == 0 && waybillNumber.invoiceList && waybillNumber.invoiceList.length) {
        // console.log('waybillNumber', waybillNumber);
        waybillNumber.invoiceList.forEach(element => {
          // console.log('element', element);
          if (element.invoiceAmount > 50000) {
            // console.log('element, element', element);
            isFoundInvoiceWithMoreThan50k = true;
          }
        });
        // console.log('isFoundInvoiceWithMoreThan50k', isFoundInvoiceWithMoreThan50k);
        if (isFoundInvoiceWithMoreThan50k) {
          this.matSnackBar.open(`E-waybill needs to be added to allow manifest for this waybill.`, "", {
            duration: 3000,
            panelClass: ["text-white", "bg-red"],
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          break;
        }
      }
    }
    if (!isWaybillOfferingInSelectedOffrings || isFoundInvoiceWithMoreThan50k) {
      return 0;
    }
    return {
      "fromBranchId": +sessionStorage.getItem('branchId'),
      "id": this.manifestId ? this.manifestId : null,
      "lkpManifestShipmentType": this.getLookupId('HUB'),
      "lkpServiceOfferingTypeIdList": this.serviceOfferIds,
      "manifestEWaybillMapList": [

      ],
      "manifestWaybillList": this.makeMainfestWaybillList(),
      "toBranchId": +this.branchIdValue,
      "vehicleId": +this.vehicleId,
      "vehicleNum": this.getVehicleNum()
    }
  }
  getLookupId(val) {
    const filtered = this.allLookUps.filter(el => el.lookupVal == val);
    if (filtered.length) {
      return filtered[0].id;
    }
  }
  allLookUps = [];
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
  isBranchScannable = false;
  getBranches() {
    this.manifestService.getBranchByUserId().subscribe((res: any) => {
      // console.log('res branch', res)
      this.branchList = res.data.responseData;
      const branchId = sessionStorage.getItem('branchId');
      this.branchList.forEach(el => {
        // console.log(el);
        if (el.branchId == branchId && el.scanFlag) {
          this.isBranchScannable = true;
        }
      })
    })
  }
  selectBranch(event) {
    // console.log('event', event)
    this.branchIdValue = event.value;
    this.createManifest(false);
  }
  hubname = '';

  selectLocation(item) {
    console.log('item', item)
    this.branchIdValue = item.branchId;
    this.hubname = item.branchName
    this.showHubList = false
    this.createManifest(false);
  }

  getscanpackageBody() {
    return {
      "manifestId": this.manifestId,
      "serviceOfferingIds": [
        0
      ],
      "stickerNumber": "string",
      "waybillId": 0
    }
  }
  consolidateManifest() {
    // sessionStorage.setItem('manifestId', this.manifestId);
    // this.router.navigate(['/bookings-web-booking/view-manifest'])
    this.spinner.show();
    this.manifestService.consilidateDataByManifestId(this.manifestId).subscribe(resp => {
      console.log(resp);
      this.spinner.hide();
      sessionStorage.setItem('manifestId', this.manifestId);
      this.router.navigate(['/bookings-web-booking/view-manifest'])
    }, (err) => {
      this.spinner.hide();
      console.log(err);
      sessionStorage.setItem('manifestId', this.manifestId);
      this.router.navigate(['/bookings-web-booking/view-manifest']);
    })
  }
  createManifest(isSubmit = true) {
    const body = this.getCreateBody();
    if (body == 0) {
      return 0;
    }
    this.spinner.show();
    if (this.isBranchScannable) {
      console.log('scannable');
      delete body.manifestWaybillList;
    }
    if(body.manifestWaybillList){
      body.manifestWaybillList.forEach(element => {
        let obj = this.waybillListData.find(e => e.waybillNumber == element.waybillNumber);
        if(obj){
          element.id = obj.id;
        }

    });
    }
    
    this.manifestService.createManifest(body).subscribe((res: any) => {
      console.log('updated list', res)
      if (res.status == 'SUCCESS') {
        if (isSubmit) {
          this.consolidateManifest();
        } else {
          this.spinner.hide();
        }
        // sessionStorage.setItem('manifestId', this.manifestId);
        // this.router.navigate(['/bookings-web-booking/view-manifest'])
      } else {
      this.spinner.hide();

      }
    }, (err) => {
      this.spinner.hide();
    })
  }

  stickerNumber = ''
  scannnedStickerCount = -1;
  waybillNumbersWihScan = []
  scanAndSavePakages(stickerNumber) {
    if (!this.manifestId) {
      this.matSnackBar.open('Please select vehicle', "", {
        duration: 3000,
        panelClass: ["text-white", "bg-red"],
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      return;
    }
    const body = {
      "manifestId": this.manifestId,
      "serviceOfferingIds": this.serviceOfferIds,
      "stickerNumber": stickerNumber.trim().toUpperCase(),
    }
    this.spinner.show();
    this.manifestService.saveAndScanPackages(body).subscribe(async (resp) => {
      try {
        this.stickerNumber = '';
        this.scanpackageArray = [];
        this.scannnedStickerCount = 0;
        const manifestResp: any = await this.manifestService.getManfestDetailsById(this.manifestId).toPromise();
        const manifestWaybliList = manifestResp.data.responseData.manifestWaybillList;
        for (let data of manifestWaybliList) {
          this.scannnedStickerCount++;
          const waybillResp: any = await this.manifestService.getByWayBillNumber(data.waybillNumber).toPromise()
          const waybillDetails = waybillResp.data.responseData;
          const waybillRefrence = waybillResp.data.referenceData.referenceItemList;
          this.waybillNumbersWihScan[this.scannnedStickerCount] = waybillDetails;
          this.waybillNumbersWihScan[this.scannnedStickerCount].loadedPkgCount = data.loadedPkgCount
          console.log('this.waybillNumbersWihScan', this.waybillNumbersWihScan);
          let filterData = waybillRefrence.filter(data => data.id == waybillDetails.custTypeLookupId);
          if (filterData) {
            this.custType = filterData[0].value;
          }
          if (waybillDetails.consignorId) {
            const consignorResp: any = await this.manifestService.getConsignerName(waybillDetails.consignorId).toPromise();
            const remaninigPackages = await this.manifestService.getRemainingPackages(waybillDetails.waybillId).toPromise();
            let consignerName = consignorResp.data.responseData.name;
            const obj = {
              consignerName: consignerName,
              custTypeLookupId: this.custType,
              wayBillNumber: data.waybillNumber,
              availablepackage: data.avlPkgCount,
              remaninigPackages: remaninigPackages.length
            };
            console.log('obj', obj);
            this.scanpackageArray.push(obj);
            console.log('this.scanpackageArray', this.scanpackageArray);
            this.dataSource3 = new MatTableDataSource(this.scanpackageArray);
            this.changeDetectorRefs.detectChanges();
            console.log('this.dataSource3', this.dataSource3);
          } else {
            this.matSnackBar.open('Consignor does not exist for a waybill number', "", {
              duration: 3000,
              panelClass: ["text-white", "bg-red"],
              horizontalPosition: "right",
              verticalPosition: "top",
            });
          }
        }
        this.spinner.hide();
      } catch (err) {
        this.spinner.hide();
        console.log(err);
      }
    }, (err) => {
      this.spinner.hide();
    });
  }
manifestDetails;
  getManifestByManifestId() {
    this.spinner.show();
    this.manifestService.getManfestDetailsById(this.manifestId).subscribe(
      (resp: any) => {
        if (resp.status == 'SUCCESS') {
          console.log('resp', resp);
          const response = resp.data.responseData;
          this.manifestDetails = response 
          // this.getTolocation(this.manifestDeatils.toBranchId);
          const manifestWaybillList = response.manifestWaybillList;
          this.serviceOfferIds = response.lkpServiceOfferingTypeIdList;
          this.selectedBranch = response.toBranchId
          this.vehicleId = response.vehicleId
          if (this.selectedBranch) {
            this.branchIdValue = this.selectedBranch;
            this.getBranchById();
          }else{
            this.spinner.hide();
          }
          this.updateButtondata = manifestWaybillList;

          console.log('this.updateButtondata', this.updateButtondata);
          // this.wayBillArray = this.manifestDeatils.manifestWaybillList;
          this.getwayByWaybillNumber();
        }

      }, (err: any) => {
        this.spinner.hide();

      }
    );
  }
}


export interface PeriodicElement {
  checkbox: string;
  waybill: number;
  pickup: string;
  mop: string;
}

export interface PeriodicElement3 {
  request: string;
  waybill: string;
  pick: string;
  booking: string;
  remaning: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { checkbox: '', waybill: 12345, pickup: '31/12/2020', mop: 'Credit' },
];

// const ELEMENT_DATA_3: PeriodicElement3[] = [
//   { request: 'WB00101', waybill: 'Tata Aerocity', pick: 'Credit', booking: '200', remaning: '200' },
//   { request: 'WB00101', waybill: 'Tata Aerocity', pick: 'Credit', booking: '200', remaning: '200' },
//   { request: 'WB00101', waybill: 'Tata Aerocity', pick: 'Credit', booking: '200', remaning: '200' },
//   { request: 'WB00101', waybill: 'Tata Aerocity', pick: 'Credit', booking: '200', remaning: '200' },
// ];