import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { PaymentTermsModel, DeliveryWtSlabChargeList, DeliveryProductList, DeliveryVehicleChargeList } from '../paymentTermsModel';
import { PayoutGenDetailComponent } from '../payout-gen-detail/payout-gen-detail.component';
import { MatDialog, MatExpansionPanel } from '@angular/material';
import { ApiService } from 'src/app/core/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppSetting } from 'src/app/app.setting';
import { AssignVehicleComponent } from 'src/app/dialog/assign-vehicle/assign-vehicle.component';
import { ErrorConstants } from 'src/app/core/models/constants';
import { NgForm } from '@angular/forms';
import { AuthorizationService } from '../../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { LocalServiceService } from 'src/app/core/services/local-service.service';

@Component({
  selector: 'app-scheduled-payout',
  templateUrl: './scheduled-payout.component.html',
  styleUrls: ['./scheduled-payout.component.css']
})
export class ScheduledPayoutComponent implements OnInit {
  [x: string]: any;
  @ViewChild(PayoutGenDetailComponent, null) childValidation: PayoutGenDetailComponent;
  @Output() getCommercial = new EventEmitter();
  @Output() getCommercialId = new EventEmitter();
  @Input() paymentCommercialData: PaymentTermsModel;
  @Input() paymentcomercialMasterData: PaymentTermsModel;
  @Input() pannel: MatExpansionPanel;
  @Input() expendPannel: MatExpansionPanel;
  @Input() defPannel: MatExpansionPanel;
  @Input() paymentCommercialRefData: any;
  @Input() indexName: any;
  @Input() vehicleList: any;
  @ViewChild('fAssoPay', { static: false }) scheduleForm: NgForm;
  editStatusId = AppSetting.editStatus;
  // Variables
  /**BEG - [2020-12-23 -> UI-GARAGE (Arup)] */
  @Input() activeTab: any;
  @Input() isPCD: boolean;
  @Input() contractCustomerList: any;
  @Input() currTabIndex: number = null;
  @Input() contractData: any;
  @Input() activeTabIndex = 0;
  totalContractCustomerListLen = 0;
  /**END - [2020-12-23 -> UI-GARAGE (Arup)] */
  // Variables Difine
  contractId;
  associateId;
  editflow: any;
  // contractData: any;
  // paymentCommercialData: PaymentTermsModel = new PaymentTermsModel();
  deliveryWtSlabChargeList: DeliveryWtSlabChargeList;
  deliveryVehicleChargeList: DeliveryVehicleChargeList;
  deliveryProductList: DeliveryProductList;
  productCatList: any = [];
  productList: any = [];
  searchProduct = '';
  searchCategory = '';
  // vehicleList: any = [];
  // paymentCommercialRefData: any;

  perList: any = [];
  exAttrMap = new Map();
  exAttrKeyList = [];


  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private acRoute: ActivatedRoute,
    public datePipe: DatePipe,
    private authorizationService: AuthorizationService,
    private permissionsService: NgxPermissionsService,
    private localServiceService: LocalServiceService
  ) {
    this.contractId = AppSetting.contractId;
    this.associateId = AppSetting.associateId;
  }

  ngOnInit() {
    this.authorizationService.setPermissions('COMMERCIAL');
    this.perList = this.authorizationService.getPermissions('COMMERCIAL') == null ? [] : this.authorizationService.getPermissions('COMMERCIAL');
    this.permissionsService.loadPermissions(this.perList);
    this.exAttrMap = this.authorizationService.getExcludedAttributes('SAFEXTENSION PAYOUT');
    this.exAttrKeyList = Array.from(this.exAttrMap.values());
    this.totalContractCustomerListLen = this.contractCustomerList.length;
    this.acRoute.params.subscribe(x => {
      if (x.editflow) {
        this.editflow = x.editflow;
      }
    });
    this.getProductCat();
  }

  // Custmer Model Search Start

  ngOnChanges() {
    this.totalContractCustomerListLen = this.contractCustomerList.length;
    if (this.paymentCommercialData) {
      this.acRoute.params.subscribe(x => {
        if (x.editflow) {
          this.editflow = x.editflow;
        }

      })
      if (this.paymentCommercialData.prdctCtgyId) {
        this.getProductList(this.paymentCommercialData.prdctCtgyId, false);
      }
      if (this.paymentCommercialData.deliveryWtSlabChargeList && this.paymentCommercialData.deliveryWtSlabChargeList.length > 0) {
        this.paymentCommercialData.deliveryWtSlabChargeList.sort((a, b) => a.wtSlabFrom - b.wtSlabFrom)
      }
    }
    if (this.paymentCommercialRefData) {
      this.setStaticIds();
    }
  }



  getProductCat() {
    this.apiService.get(`secure/v1/deliveryCommercial/productcategory`).subscribe(data => {
      let ob = ErrorConstants.validateException(data);
      if (ob.isSuccess) {
        this.productCatList = data.data.responseData;
      }
    }, (error) => {
      this.toastr.error(ErrorConstants.getValue(404));
      // this.spinner.hide();
    })
  }

  getProductList(productcategoryid, flag) {

    this.spinner.show();
    if (flag) {
      this.productList = [];
      this.paymentCommercialData.deliveryProductList = [];
    }
   
    this.apiService.get(`secure/v1/deliveryCommercial/productcategory/${productcategoryid}`).subscribe(data => {
      let ob = ErrorConstants.validateException(data);
      if (ob.isSuccess) {
        if (data.data.responseData && data.data.responseData.length > 0) {
          this.productList = [];
          data.data.responseData.forEach(element => {
            let productObj = new DeliveryProductList();
            // productObj.assocCntrId = this.paymentCommercialData.assocCntrId;
            productObj.expDt = this.paymentCommercialData.expDt;
            productObj.effectiveDt = this.paymentCommercialData.effectiveDt;
            productObj.productId = element.id;
            productObj.prdctName = element.prdctName;
            if (this.paymentCommercialData.id) {
              productObj.dlvryCmrclId = this.paymentCommercialData.id;
            }
            /* --- Creates duplicate product records ---- */
            // if (this.paymentCommercialData.deliveryProductList && this.paymentCommercialData.deliveryProductList.length > 0) {
            //   this.paymentCommercialData.deliveryProductList.forEach(obj => {
            //     if (obj.productId == element.id) {
            //       obj.prdctName = element.prdctName;
            //       this.productList.push(obj);
            //     } 
            //     else {
            //       this.productList.push(productObj);
            //     }
            //   });
            // } else {
            //   this.productList.push(productObj);
            // }

            /* --- solve duplicate product records issue ---- */
            let obj = this.paymentCommercialData.deliveryProductList.find(x => x.productId == element.id)
              
            if(obj != undefined){
              obj.prdctName = element.prdctName;
              this.productList.push(obj);
            } else {
              this.productList.push(productObj);
            }
           
          });
          // this.productList = data.data.responseData;  
         
        } else {
          this.toastr.info('Products Not available ');
          this.productList = [];
          this.paymentCommercialData.deliveryProductList = [];
        }
        this.spinner.hide();
      }
      this.spinner.hide();
    }, (error) => {
      this.toastr.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    })
  }

  getAllVehicle() {
    this.vehicleList = [];
    let associateId = AppSetting.associateId;
    this.apiService.get(`secure/v1/associates/vehicles/associate/${associateId}`).subscribe(res => {
      this.vehicleList = [];
      if (res && res.data) {
        let newtemp = res.data.responseData;
        newtemp.forEach(element => {
          // Market Flag for Veicle  is false vendorMktFlag

          if (!element.vendorMktFlag) {
            this.vehicleList.push(this.setVehicle(element, res.data.referenceData))
          }
        });
      }
    });
  }

  rateAddOnVehicle(obj) {
    this.openAssignVehicleModal(obj);
  }

  setVehicle(obj, ref) {
    if (ref) {
      ref.vehicleModelList.forEach(element => {
        if (obj.vehicleModelId == element.id) {
          obj.vehicleModel = element.vehicleModelName
        }
      });
    }
    let temp = {
      "bodyHeight": obj.bodyHeight,
      "bodyLength": obj.bodyLength,
      "bodyWidth": obj.bodyWidth,
      "effectiveDt": obj.effectiveDt,
      "expDt": obj.expDt,
      "vehicleId": obj.id,
      "vehicleModel": obj.vehicleModel,
      "vehicleNumber": obj.vehicleNum,
      "price": obj.price ? obj.price : null,
      "vehicleTonnge": obj.vehicleTonnge ? obj.vehicleTonnge : obj.modelCargoCapacity,
      "checked": false
    }
    // if(obj.id){
    //   temp['id'] = obj.id;
    // }
    return temp;

  }

  openAssignVehicleModal(obj) {
    this.spinner.show();
    const vehicle = JSON.parse(JSON.stringify(this.vehicleList));
    const dialogRef = this.dialog.open(AssignVehicleComponent, {
      data: { 'tempVehicle': vehicle, 'obj': obj, 'component': 'payment_term' },
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
    this.spinner.hide();
    dialogRef.afterClosed().subscribe(result => {
    })

  }

  removeCustomSLA(index) {
    this.paymentCommercialData.deliveryWtSlabChargeList.splice(index, 1);
  }

  changeValue(index, column, value) {
    if (column == 'wtSlabTo') {
      if (this.paymentCommercialData.deliveryWtSlabChargeList[index + 1]) {
        this.paymentCommercialData.deliveryWtSlabChargeList[index + 1]['wtSlabFrom'] = Number(value) + 1;
      } else {
        this.paymentCommercialData.deliveryWtSlabChargeList[index][column] = value;
      }
    }
  }

  addCustomSLA(flag) {
    let length = this.paymentCommercialData.deliveryWtSlabChargeList.length ? this.paymentCommercialData.deliveryWtSlabChargeList.length : 1;
    let obj = new DeliveryWtSlabChargeList();
    obj.assocCntrId = this.paymentCommercialData.assocCntrId;
    obj.effectiveDt = this.paymentCommercialData.effectiveDt;
    obj.expDt = this.paymentCommercialData.expDt;
    obj.wtSlabFrom = this.paymentCommercialData.deliveryWtSlabChargeList.length > 0 ? Number(this.paymentCommercialData.deliveryWtSlabChargeList[length - 1].wtSlabTo) + 1 : 0;
    if (this.paymentCommercialData.id) {
      obj.dlvryCmrclId = this.paymentCommercialData.id;
    }
    if (flag) {

      if (this.paymentCommercialData.id) {
        obj.dlvryCmrclId = this.paymentCommercialData.id;
      }
      if (this.paymentCommercialData.deliveryWtSlabChargeList.length == 0) {


        this.paymentCommercialData.deliveryWtSlabChargeList.push(obj);
      }
    } else {
      obj.isNewSla = true;
      this.paymentCommercialData.deliveryWtSlabChargeList.push(obj);
    }
  }

  submitPayment(flag) {
    this.spinner.show();
    if (this.slaFrmValidFlag && this.paymentCommercialData.deliveryWtSlabChargeList && this.paymentCommercialData.deliveryWtSlabChargeList.length > 0) {
      this.toastr.info('Slab inputs are not valid');
      this.spinner.hide();
      return
    }

    if (((this.paymentCommercialData.addtnlAmtFlag && this.paymentCommercialData.addtnlPymtType == 'PER TRIP') || this.paymentCommercialData.lkpAssocDlvryPayoutOptId == this.perTripId) && this.paymentCommercialData.tripOpt == 'RATE PER VEHICLE') {
      if (this.paymentCommercialData.deliveryVehicleChargeList && this.paymentCommercialData.deliveryVehicleChargeList.length > 0) {
        this.paymentCommercialData.deliveryVehicleChargeList.forEach(obj => {
          if (!obj.price) {
            this.toastr.info('Please enter Price for each Vehicle');
            this.spinner.hide();
            return
          }
        })
      } else {
        this.toastr.info('Please add atleast one Vehicle');
        this.spinner.hide();
        return
      }
    }
    let clonePaymentData = JSON.parse(JSON.stringify(this.paymentCommercialData));
    // this.paymentCommercialData.dlvryPayoutCtgy = "SAFE EXTENSION";
    this.paymentCommercialData.cmprsnFlag = this.paymentCommercialData.cmprsnFlag ? 1 : 0;
    this.arrangeDataForSubmit();
    this.paymentCommercialData.dlvryPayoutCtgy = this.indexName == '1' ? "SCHEDULED" : "SAFEXTENSION";
    if (this.paymentCommercialData.deliveryVehicleChargeList && this.paymentCommercialData.deliveryVehicleChargeList.length > 0) {
      this.paymentCommercialData.deliveryVehicleChargeList.forEach(obj => {
        obj.assocCntrId = this.paymentCommercialData.assocCntrId;
        obj.effectiveDt = this.paymentCommercialData.effectiveDt;
        obj.expDt = this.paymentCommercialData.expDt;
        if (this.paymentCommercialData.id) {
          obj.dlvryCmrclId = this.paymentCommercialData.id;
        }
      })
    }

    let isScheduleData = 0;
    let finalPaymentCommercialData: any;
    let commercialId = null;
    if (this.activeTab.attr1 && this.activeTab.attr1.toLowerCase() !== "general" || this.isPCD) {

      finalPaymentCommercialData = this.paymentcomercialMasterData;
      this.paymentCommercialData.msaCustId = this.activeTab.msaCustId;
      this.paymentCommercialData.cntrCode = this.activeTab.cntrCode;
      this.paymentCommercialData.attr1 = this.activeTab.attr1;
      if (this.isPCD) {
        this.paymentCommercialData.isPcdDel = 0;
        if (this.paymentCommercialData.dlvryPayoutCtgy === "SCHEDULED") {
          isScheduleData = 1;
        }
        else isScheduleData = 0;
      }
      this.paymentCommercialData.custPymtFlag = 1;
     
      // let length = finalPaymentCommercialData.customerCommercial.length;
      // let xTrip = 0;
      // for (; xTrip < length; xTrip++) {
      //   if (finalPaymentCommercialData.customerCommercial[xTrip].cntrCode === this.activeTab.cntrCode) {
      //     finalPaymentCommercialData.customerCommercial.splice(xTrip, 1);
      //   }
      // }
      // finalPaymentCommercialData.customerCommercial.push(this.paymentCommercialData);

       /*----- solved undefined error ---------- */
      let existObj = finalPaymentCommercialData.customerCommercial.find(x => x.cntrCode === this.activeTab.cntrCode);
     
      if(existObj == undefined){
        finalPaymentCommercialData.customerCommercial.push(this.paymentCommercialData);
      }
    }
    else {
      if (this.activeTabIndex === undefined) this.activeTabIndex = 0;
      finalPaymentCommercialData = this.paymentCommercialData;
    }

    let tabValue = 0;
    if (this.isPCD) this.activeTabIndex = 0;

    let isBothAccordian = false;
    if (this.contractData.safextDeliveryFlag && this.contractData.scheduledDeliveryFlag) isBothAccordian = true;
    if (this.contractData.safextDeliveryFlag && this.contractData.scheduledDeliveryFlag && !this.isPCD) {

      if (this.indexName === 2 && (this.activeTabIndex + 1) < this.totalContractCustomerListLen) {
        tabValue = this.activeTabIndex + 1;
      }
      else tabValue = this.activeTabIndex;
    }
    else if (!this.isPCD) {
      if ((this.activeTabIndex + 1) < this.totalContractCustomerListLen) tabValue = this.activeTabIndex + 1;
      else tabValue = this.activeTabIndex;
    }
    // console.log("tabValue: ", tabValue);
    // console.log("finalPaymentCommercialData: ", finalPaymentCommercialData);
    // return false;
    console.log('finalPaymentCommercialData',finalPaymentCommercialData)
    this.apiService.post('secure/v1/deliveryCommercial', finalPaymentCommercialData).subscribe((obj) => {
      if (obj.status == "SUCCESS") {
        this.toastr.success('Saved Successfully');
        commercialId = obj.data.responseData;
        this.defPannel.expanded = false;

        if (isBothAccordian) {
          this.pannel.expanded = false;

          if (tabValue > this.activeTabIndex && this.indexName === 2) {
            this.expendPannel.expanded = true;
          }
          else if (tabValue === this.activeTabIndex && this.indexName === 2) {
            this.defPannel.expanded = true;
          }
          else {
            if (this.expendPannel) {
              this.expendPannel.expanded = true;
            } else {
              if (this.defPannel) {
                this.defPannel.expanded = true;
              }
            }
          }
        }
        else {
          if (tabValue === this.activeTabIndex) {
            this.pannel.expanded = false;
            this.defPannel.expanded = true;
          }
        }
        if (this.isPCD) {
          if (isScheduleData) this.localServiceService.setSchCommercialId(commercialId);
          else this.localServiceService.setSafCommercialId(commercialId);
        }
        this.getCommercial.emit(tabValue);
        if (flag == 'next') {
          this.spinner.hide();
          if (this.editflow) {
            this.router.navigate(['/asso_delivery-contract/booking-sla', { steper: true, 'editflow': 'true' }], { skipLocationChange: true });
          } else {
            this.router.navigate(['/asso_delivery-contract/booking-sla'], { skipLocationChange: true });
          }
        }
        this.spinner.hide();

      } else {
        this.spinner.hide();
        this.paymentCommercialData = clonePaymentData;
        this.toastr.error(obj.message);
      }

    }, err => {
      this.spinner.hide();
      this.paymentCommercialData = clonePaymentData;
      this.toastr.error(err.error.errors.error[0].code + ' : ' + err.error.errors.error[0].description);
      console.log('error', err)
    })
  }


  payoutChange(paymentCommercialData, $event) {
    this.slaFrmValidFlag = false;
    if (paymentCommercialData.lkpAssocDlvryPayoutOptId == this.weightBasId) {
      this.addCustomSLA(true);
      this.removeDataFrom();
    } else {
      this.removeDataFrom();
      this.weighBasisReset();
    }
  }

  removeDataFrom() {
    this.paymentCommercialData.addtnlPrice = null;
    this.paymentCommercialData.addtnlPymtType = null;
    this.paymentCommercialData.tripOpt = '';
    this.paymentCommercialData.price = null;
    this.paymentCommercialData.addtnlPrice = null;
  }

  weighBasisReset() {
    this.paymentCommercialData.wtType = null;
    this.paymentCommercialData.deliveryWtSlabChargeList = [];
    if (this.indexName == 2) {
      this.paymentCommercialData.minAmtWaybill = null;
    } else {
      this.paymentCommercialData.wtBasis = null;
    }

  }

  editInput(element) {
    if (this.editflow) {
      element.status = this.editStatusId;
    }
  }
  weightBasId: any;
  perTripId: any;
  productSpectId: any;
  perWayBillId: any;

  setStaticIds() {
    this.paymentCommercialRefData.assocDeliveryPayOutOptionList.forEach(element => {
      if (element.lookupVal == 'WEIGHT BASIS') {
        this.weightBasId = element.id;
      } else if (element.lookupVal == 'PER TRIP') {
        this.perTripId = element.id;
      } else if (element.lookupVal == 'PER WAYBILL') {
        this.perWayBillId = element.id;
      } else if (element.lookupVal == 'PRODUCT SPECIFIC') {
        this.productSpectId = element.id;
      }
    });
  }

  arrangeDataForSubmit() {
    switch (this.paymentCommercialData.lkpAssocDlvryPayoutOptId) {
      case (this.weightBasId): {
        delete this.paymentCommercialData.dlvryPayoutCtgy;
        delete this.paymentCommercialData.prdctCtgyId;
        this.paymentCommercialData['deliveryProductList'] = [];
        if (this.paymentCommercialData.addtnlPymtType != 'PER TRIP' || this.paymentCommercialData.tripOpt != 'RATE PER VEHICLE') {
          this.paymentCommercialData.deliveryVehicleChargeList = [];
        }
        break;
      }
      case (this.perTripId): {
        delete this.paymentCommercialData.dlvryPayoutCtgy;
        delete this.paymentCommercialData.prdctCtgyId;
        this.paymentCommercialData['deliveryProductList'] = [];
        this.paymentCommercialData['deliveryWtSlabChargeList'] = [];
        break;
      }

    }
  }
  slaFrmValidFlag: boolean = false;
  maxFlag: boolean = false;

  validCust(f) {
    this.maxFlag = false;
    this.slaFrmValidFlag = false;
    if (f) {
      this.slaFrmValidFlag = f.invalid;
      // return this.slaFrmValidFlag;
    }
    // if(!f.invalid){
    let length = this.paymentCommercialData.deliveryWtSlabChargeList.length;
    this.paymentCommercialData.deliveryWtSlabChargeList.forEach((obj, index) => {
      if (Number(obj.wtSlabFrom) > Number(obj.wtSlabTo)) {
        this.slaFrmValidFlag = true;
        obj['flag'] = true;
        return this.slaFrmValidFlag;
      } else {
        if (((Number(obj.wtSlabTo)) + 1) >= 99999999) {
          this.paymentCommercialData.deliveryWtSlabChargeList.splice(-1, (length - (index + 1)))
          this.slaFrmValidFlag = false;
          this.maxFlag = true;
          obj['flag'] = false;
          return this.maxFlag;
        }
        obj['flag'] = false;
      }
    })
    // }
    return this.slaFrmValidFlag;
  }

  /*------- Product list multiselect -------- */
  selectionArray: any = [];
  data: any;
  onChange() {
    this.selectionArray = [];
    this.paymentCommercialData.deliveryProductList.forEach(element => {
      this.productList.filter(obj => {
        if (element.productId == obj.productId) {
          this.selectionArray.push(obj.prdctName);
        }
      })
    })

    this.data = this.selectionArray;
  }
  /*--------- If create and update permission not given ---------- */
  nextReadMode() {
    this.pannel.expanded = false;
    if (this.expendPannel) {
      this.expendPannel.expanded = true;
    } else {
      if (this.defPannel) {
        this.defPannel.expanded = true;
      }

    }
  }

  /*-------- Check valid form ------------- */
  checkValidScheOrSafexForm() {
    let flag: boolean = false;
    if (this.slaFrmValidFlag && this.paymentCommercialData.deliveryWtSlabChargeList && this.paymentCommercialData.deliveryWtSlabChargeList.length > 0) {
      this.toastr.info('Slab inputs are not valid');
      // this.spinner.hide();
      return flag = true;
    }

    if (((this.paymentCommercialData.addtnlAmtFlag && this.paymentCommercialData.addtnlPymtType == 'PER TRIP') || this.paymentCommercialData.lkpAssocDlvryPayoutOptId == this.perTripId) && this.paymentCommercialData.tripOpt == 'RATE PER VEHICLE') {
      if (this.paymentCommercialData.deliveryVehicleChargeList && this.paymentCommercialData.deliveryVehicleChargeList.length > 0) {
        this.paymentCommercialData.deliveryVehicleChargeList.forEach(obj => {
          if (!obj.price) {
            this.toastr.info('Please enter Price for each Vehicle');
            // this.spinner.hide();
            return flag = true;
          }
        })
      } else {
        this.toastr.info('Please add atleast one Vehicle');
        // this.spinner.hide();
        return flag = true;
      }
    }
    return flag;
  }

}
