import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { BookingInformationService } from 'src/app/core/service/booking-information.service';
import { ManifestService } from 'src/app/core/service/manifest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms'
import { CommonService } from 'src/app/core/common.service';
@Component({
  selector: 'app-create-manifest',
  templateUrl: './create-manifest.component.html',
  styleUrls: ['./create-manifest.component.css']
})
export class CreateManifestComponent implements OnInit {

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
  serviceOfferId;
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
  addForm: FormGroup;

  // rows: FormArray;
  itemForm: FormGroup;
  type: boolean;
  responseData: any;
  serviceOfferingIdList = [];
  isBranchScannable = false;
  constructor(private bookingInfo: BookingInformationService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private manifestService: ManifestService,
    private matSnackBar: MatSnackBar,
    private commonService: CommonService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {

  }
  ngOnInit() {
    this.spinner.show();
    sessionStorage.removeItem('manifestId');
    this.getServiceOffering();
    this.getVehicles();
    this.getBranches();
    this.getHubListByBranchId();
    this.dataSource3 = null;
    // console.log('this.data', this.data);
    // this.updateButtondata = this.data.manifestWaybillList;
    // console.log('dataSource', this.dataSource3)
    // this.getwayByWaybillNumber();
    this.addForm = this.fb.group({
      rows: this.fb.array([])
    });
    this.getAllLookups();
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
  get rows() {
    return this.addForm.get('rows') as FormArray;
  }
  onAddRow() {
    this.rows.push(this.fb.group({
      wayBillNumber: ['', Validators.required],
      loadPackages: ['', Validators.required],
      consignerName: null,
      customerType: null,
      totalPackage: null
    }));
  }
  onRemoveRow(i) {
    this.rows.removeAt(i);
    this.waybillNumbers.splice(i, 1);
    console.log('this.waybillNumbers', this.waybillNumbers);
  }

  onSave() {
    console.log(this.rows.value)
  }
  getVehicles() {
    this.manifestService.getVehicleListByuserId().subscribe(
      (resp: any) => {
        console.log('vehicle', resp);
        this.vehicleLists = new MatTableDataSource(resp.data.responseData);
        // console.log('thisssss', this.vehicleLists);
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  hubList = [];
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
        // console.log('branchName', branchName);
        this.hubList = this.hubList.filter(el => el.branchName != branchName);
        this.showHubList = true;
      }, (err) => {
        this.spinner.hide();
      })
    }
  }
  getServiceOffering() {
    this.bookingInfo.getAllServiceOffering(this.headerData).subscribe((response) => {
      if (response) {
        this.serviceOfferingList = response;
        this.serviceOfferId = [this.serviceOfferingList[0].id];
        this.serviceOfferingIdList = [this.serviceOfferingList[0].id]
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
    return obj.value;
  }
  displayedColumns: string[] = ['checkbox', 'waybill', 'pickup', 'mop'];
  dataSource = ELEMENT_DATA;
  custType
  getConsignerName1(data, waybillResponse, i) {
    this.manifestService.getConsignerName(waybillResponse.consignorId).subscribe((res: any) => {
      // console.log('ressss' , res);
      // if (i == this.updateButtondata.length - 1) {
      //   this.spinner.hide();
      // }
      if (res.status == 'SUCCESS') {
        let consignerName = res.data.responseData.name;
        // console.log('this.consigner name' , this.consignerName); 
        this.scanpackageArray.push({ 'consignerName': consignerName, 'consigneeId': waybillResponse.consigneeId, 'custTypeLookupId': this.custType, 'wayBillNumber': data.waybillNumber, 'availablepackage': data.avlPkgCount, 'scanPackage': data.scannedPkgCount })
        console.log('this.scanpackageArray', this.scanpackageArray);
        if (this.dataSource3) {
          this.dataSource3.data = this.scanpackageArray;
        } else {
          this.dataSource3 = this.scanpackageArray
        }
        // console.log('datasource @@@@@@@@', this.dataSource3, this.scanpackageArray)
      }
    }, (err) => {
      this.spinner.hide();
    })
  }
  getwayByWaybillNumber(manifestWaybillList) {
    let i = 0;
    for (let data of manifestWaybillList) {
      this.manifestService.getByWayBillNumber(data.waybillNumber).subscribe((res: any) => {
        console.log('res', res)
        let responseData = res.data.responseData;
        this.waybillNumbers[i] = responseData
        i++;
        let lookUpData = res.data.referenceData.referenceItemList;
        let filterData = lookUpData.filter(data => data.id == responseData.custTypeLookupId);
        //  console.log('filterData' , filterData);
        if (filterData) {
          this.custType = filterData[0].value;
        }
        this.getConsignerName1(data, responseData, i);
        // this.scanpackageArray.push({ 'consignerId': responseData.consignorId, 'consigneeId': responseData.consigneeId, 'custTypeLookupId': responseData.custTypeLookupId, 'wayBillNumber': data.waybillNumber, 'availablepackage': data.avlPkgCount, 'scanPackage': data.scannedPkgCount })
        // this.dataSource3 = this.scanpackageArray;
        // console.log('datasource', this.dataSource3)
      })
    }

  }
  waybillNumbers = []
  keyValue(event, i) {
    console.log('event', event.target.value, i);
    let wayBillnumber = event.target.value;
    if (wayBillnumber.length == 15) {
      this.spinner.show();
      this.manifestService.getByWayBillNumber(wayBillnumber).subscribe((res: any) => {
        this.spinner.hide();
        this.responseData = res.data.responseData;
        const statusObj = this.allLookUps.find(el => el.id == this.responseData.wayblCurrStatusLookupId);
        console.log('statusObj', statusObj);
        // if (statusObj && (statusObj.lookupVal == 'FREIGHT CALCULATED' || statusObj.lookupVal == 'BOOKING CREATED')) {
        //   this.matSnackBar.open(`waybill number ${wayBillnumber} needs to be generated to create manifest`, "", {
        //     duration: 3000,
        //     panelClass: ["text-white", "bg-red"],
        //     horizontalPosition: "right",
        //     verticalPosition: "top",
        //   });
        //   return;
        // }
        const loggedBranchId = sessionStorage.getItem('branchId');
        console.log('loggedBranchId', loggedBranchId);
        if (this.responseData.bookingBranchId != loggedBranchId) {
          this.matSnackBar.open(`Waybill branch should be same the logged in branch`, "", {
            duration: 3000,
            panelClass: ["text-white", "bg-red"],
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          return;
        }
        this.waybillNumbers[i] = this.responseData;
        console.log('this.waybillNumbers', this.waybillNumbers);
        let lookUp = [];
        lookUp = res.data.referenceData.referenceItemList;
        let a = lookUp.filter(data => data.id == this.responseData.custTypeLookupId);
        const customerType = a[0].value;
        const consignorId = this.responseData.consignorId;
        if (consignorId) {
          this.getConsignerName(consignorId, i);
          const totalPackage = this.responseData.totalPackageCount;
          this.rows.controls[i].patchValue({ totalPackage, customerType });
        } else {
          this.rows.controls[i].get('consignerName').patchValue(null);
          this.waybillNumbers.splice(i, 1);
          this.matSnackBar.open('Consignor does not exist for a waybill number', "", {
            duration: 3000,
            panelClass: ["text-white", "bg-red"],
            horizontalPosition: "right",
            verticalPosition: "top",
          });
        }
      }, (err) => {
        this.rows.controls[i].patchValue({ totalPackage: null, consignerName: null, customerType: null, });
      });
    }
  }
  getConsignerName(consignorId, i) {
    this.manifestService.getConsignerName(consignorId).subscribe((res: any) => {
      console.log('res', res)
      const consignerName = res.data.responseData.name;
      this.rows.controls[i].get('consignerName').patchValue(consignerName);
    })
  }

  radioChange(event, index) {
    this.vehicleId = event;
    this.createManifest(true);
  }


  // }
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
  // hubList = [];
  getHubListByBranchId() {
    const id = sessionStorage.getItem('branchId');
    this.manifestService.getHubListByBranchId(id).subscribe((res: any) => {
      console.log('Hub List', res)
      this.hubList = res.data.responseData;
    });
  }
  selectBranch(event) {
    console.log('event', event)
    this.branchIdValue = event.value;
    if (this.vehicleId) {
      this.createManifest(true);
    }
  }
  hubname = '';
  showHubList = true;
  selectLocation(item) {
    console.log('item', item)
    this.branchIdValue = item.branchId;
    this.hubname = item.branchName
    this.showHubList = false
    if (this.vehicleId) {
      this.createManifest(true);
    }
    // if (this.vehicleId && this.serviceOfferId && this.serviceOfferId.length && !this.manifestId) {
    // } else {
    // }
  }
  getCreateBody(isCreate) {
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
    if (!this.serviceOfferingIdList.length) {
      this.matSnackBar.open('Please select service offering', "", {
        duration: 3000,
        panelClass: ["text-white", "bg-red"],
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      return 0;
    }
    if (isCreate) {
      return {
        "id": this.manifestId ? this.manifestId : null,
        "toBranchId": +this.branchIdValue, // to location
        "fromBranchId": +sessionStorage.getItem('branchId'),
        "vehicleId": this.vehicleId,
        "vehicleNum": this.getVehicleNum(),
        "lkpServiceOfferingTypeIdList": this.serviceOfferingIdList,
        "lkpManifestShipmentType": this.getLookupId('HUB'),
      }
    } else {
      // check the selected service offering in the selected package
      let isWaybillOfferingInSelectedOffrings = true;
      let isFoundInvoiceWithMoreThan50k = false;
      let isDiffrentBranch = false;
      const currentBranchId = sessionStorage.getItem('branchId');
      const waybillNumbers = this.isBranchScannable ? this.waybillNumbersWihScan : this.waybillNumbers
      for (let waybillNumber of waybillNumbers) {
        if (this.serviceOfferingIdList.indexOf(waybillNumber.serviceOfferingId) === -1) {
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
        } else if (waybillNumber.bookingBranchId && waybillNumber.bookingBranchId != currentBranchId) {
          this.matSnackBar.open(`Waybill number ${waybillNumber.waybillNumber}  must be same branch`, "", {
            duration: 3000,
            panelClass: ["text-white", "bg-red"],
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          isDiffrentBranch = true
          break;
        }
      }
      if (!isWaybillOfferingInSelectedOffrings || isFoundInvoiceWithMoreThan50k || isDiffrentBranch) {
        return 0;
      }
    }
    return {
      "fromBranchId": +sessionStorage.getItem('branchId'),
      "id": this.manifestId ? this.manifestId : null,
      "lkpManifestShipmentType": this.getLookupId('HUB'),
      "lkpServiceOfferingTypeIdList": this.serviceOfferingIdList,
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
  makeMainfestWaybillList() {
    const waybillNumbers = this.isBranchScannable ? this.waybillNumbersWihScan : this.waybillNumbers
    return waybillNumbers.map((el, i) => {
      return {
        avlPkgCount: el.totalPackageCount,
        bookingRequestId: el.bookingReqId,
        bookingWaybillId: el.waybillId,
        id: null,
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
    console.log('vehicle', vehicle);
    return vehicle[0].vehicleNum;
  }
  getscanpackageBody() {
    return {
      "manifestId": this.manifestId,
      "serviceOfferingIds": this.serviceOfferingIdList,
      "stickerNumber": "string",
      "waybillId": 0
    }
  }
  consolidateManifest() {
    this.spinner.show();
    this.manifestService.consilidateDataByManifestId(this.manifestId).subscribe(resp => {
      console.log(resp);
      this.spinner.hide();
      sessionStorage.setItem('manifestId', this.manifestId);
      this.router.navigate(['/bookings-web-booking/view-manifest'])
    }, (err) => {
      this.spinner.hide();
      sessionStorage.setItem('manifestId', this.manifestId);
      this.router.navigate(['/bookings-web-booking/view-manifest'])
    });
  }
  createManifest(isCreate?: boolean) {
    // console.log(this.rows.value)
    const body = this.getCreateBody(isCreate);
    if (body == 0) {
      return;
    }
    console.log('body', body)
    this.spinner.show();
    if (this.isBranchScannable) {
      console.log('scannebel');
      delete body.manifestWaybillList;
    }
    this.manifestService.createManifest(body).subscribe((res: any) => {
      console.log('updated list', res)
      if (res.status == 'SUCCESS') {
        const response = res.data.responseData
        this.manifestId = response.id;
        // this.router.navigate(['/bookings-web-booking/manifest-creation'])
        if (!isCreate) {
          // this.spinner.hide();
          this.consolidateManifest()
          // sessionStorage.setItem('manifestId', this.manifestId);
          // this.router.navigate(['/bookings-web-booking/view-manifest'])
        } else {
          this.spinner.hide();
        }
      } else {
        this.spinner.hide();
      }
    }, (err) => {
      this.spinner.hide();
    })
  }
  onKeyUpInLoadedPackage(index) {
    const loadedPackages = +this.rows.controls[index].get('loadPackages').value;
    console.log('loadedPackages', loadedPackages);
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
  scanSavePackages() {
    const body = this.getscanpackageBody();
    this.spinner.show();
    this.manifestService.scanPackages(body).subscribe((res: any) => {
      this.spinner.hide();
   
    })
  }
  selectedOffering(event) {
    console.log(event);
    this.serviceOfferingIdList = event;
    if (this.vehicleId) {
      this.createManifest(true);
    }
    // if (this.vehicleId && this.branchIdValue && this.serviceOfferingIdList.length && !this.manifestId) {
    // } else {
    // }
  }
  waybillNumbersWihScan = [];
  scannnedStickerCount = -1;
  stickerNumber = ''
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
      "serviceOfferingIds": this.serviceOfferingIdList,
      "stickerNumber": stickerNumber.trim().toUpperCase(),
    }
    this.spinner.show();
    this.scannnedStickerCount = 0;
    this.scanpackageArray = [];
    this.manifestService.saveAndScanPackages(body).subscribe(async (resp) => {
      try {
        this.stickerNumber = '';
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
            const remaninigPackages = await this.manifestService.getRemainingPackages(waybillDetails.waybillId).toPromise();
            console.log('remaninigPackages', remaninigPackages);
            const consignorResp: any = await this.manifestService.getConsignerName(waybillDetails.consignorId).toPromise();
            let consignerName = consignorResp.data.responseData.name;
            const obj = {
              consignerName: consignerName,
              custTypeLookupId: this.custType,
              wayBillNumber: data.waybillNumber,
              availablepackage: data.avlPkgCount,
              remaninigPackages: remaninigPackages.length
            };
            // console.log('obj', obj);
            // const isWaybillFound = this.scanpackageArray.some(scannedObj => scannedObj.wayBillNumber == data.waybillNumber);
            // console.log('isWaybillFound', isWaybillFound);
            // if (!isWaybillFound) {
            // } else {
            //   this.scanpackageArray[this.scanpackageArray.length - 1] = obj;
            // }
            this.scanpackageArray.push(obj);
            this.dataSource3 = new MatTableDataSource(this.scanpackageArray);
            console.log('this.scanpackageArray', this.scanpackageArray);
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
  // manifestDeatils;
  manifestWaybillList = [];
  getManifestByManifestId() {
    this.manifestService.getManfestDetailsById(this.manifestId).subscribe(
      (resp: any) => {
        if (resp.status == 'SUCCESS') {
          console.log('resp', resp);
          const response = resp.data.responseData;
          // this.getTolocation(this.manifestDeatils.toBranchId);
          this.manifestWaybillList = response.manifestWaybillList;
          // this.wayBillArray = this.manifestDeatils.manifestWaybillList;
          this.getwayByWaybillNumber(this.manifestWaybillList);
        }

      }, (err: any) => {
        this.spinner.hide();

      }
    );
  }
}
// 
// dataSource = ELEMENT_DATA;



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
}


const ELEMENT_DATA: PeriodicElement[] = [
  { request: 12345, waybill: 12345, pick: '31/11/2020', booking: 'Del 10', destination: 'Del 12', sfx: 'SFX123', customer: 'TATA', location: 'Delhi', created: 'BranchCode', },
  { request: 12345, waybill: 12345, pick: '31/11/2020', booking: 'Del 10', destination: 'Del 12', sfx: 'SFX123', customer: 'TATA', location: 'Delhi', created: 'BranchCode', },
  { request: 12345, waybill: 12345, pick: '31/11/2020', booking: 'Del 10', destination: 'Del 12', sfx: 'SFX123', customer: 'TATA', location: 'Delhi', created: 'BranchCode', },
];
