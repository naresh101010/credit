import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatExpansionPanel } from "@angular/material";
import { ApiService } from "src/app/core/services/api.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { AppSetting } from "src/app/app.setting";
import { PaymentCommercialGen } from "src/app/core/models/paymentTermsModel";
import { PayoutGenDetailComponent } from "./payout-gen-detail/payout-gen-detail.component";
import * as _ from "lodash";
import { DatePipe } from "@angular/common";
import { PaymentTermsModel, DeliveryWtSlabChargeList, DeliveryVehicleChargeList, DeliveryProductList } from "./paymentTermsModel";
import { ErrorConstants } from "src/app/core/models/constants";
import { AssignVehicleComponent } from "src/app/dialog/assign-vehicle/assign-vehicle.component";
import { PaymentGeneralTermsComponent } from "./payment-general-terms/payment-general-terms.component";
import { AuthorizationService } from '../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { ScheduledPayoutComponent } from "./scheduled-payout/scheduled-payout.component";
import { SelectCustomerComponent } from './../../dialog/select-customer/select-customer.component';
import { confimationdialog } from 'src/app/dialog/confirmationdialog/confimationdialog';
import { LocalServiceService } from "src/app/core/services/local-service.service";

@Component({
  selector: "app-booking-payout",
  templateUrl: "./booking-payout.component.html",
  styleUrls: ["./booking-payout.component.css"],
  providers: [PaymentCommercialGen, DatePipe],
})
export class BookingPayoutComponent implements OnInit {
  @ViewChild(PayoutGenDetailComponent, null) childValidation: PayoutGenDetailComponent;
  @ViewChild(ScheduledPayoutComponent, null) sheduleComp: ScheduledPayoutComponent;

  @ViewChild('safex', { static: false }) safex: MatExpansionPanel;
  @ViewChild('schedule', { static: false }) schedule: MatExpansionPanel;
  @ViewChild('gen', { static: false }) gen: MatExpansionPanel;
  @ViewChild(PaymentGeneralTermsComponent, null) genValidation: PaymentGeneralTermsComponent;


  // Variables Difine
  contractId;
  associateId;
  editflow: any;
  contractData: any;
  contractRefData: any;
  paymentCommercialSefData: PaymentTermsModel = new PaymentTermsModel();
  paymentCommercialSchData: PaymentTermsModel = new PaymentTermsModel();
  deliveryWtSlabChargeList: DeliveryWtSlabChargeList;
  deliveryVehicleChargeList: DeliveryVehicleChargeList;
  deliveryProductList: DeliveryProductList;
  productCatList: any = [];
  productList: any = [];
  vehicleList: any = [];
  paymentCommercialRefData: any;
  perList: any = [];
  customerSpecificPayment: number = 0;
  customerSpecificPaymentRadioDisabled: boolean = false;
  isPCD: boolean = false;
  contractCustomerList: any[] = [{ attr1: "General", msaCustId: null, cntrCode: null, active: true }]
  lookupSubDeliveryId: number;
  paymentcomercialSchMasterData: PaymentTermsModel = new PaymentTermsModel();
  paymentcomercialSefMasterData: PaymentTermsModel = new PaymentTermsModel();
  paymentCommercialCustomerSchData: any[] = [];
  paymentCommercialCustomerSefData: any[] = [];
  activeTab = { attr1: "General", msaCustId: null, cntrCode: null, active: true }
  activeTabIndex: number;

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
    private localServiceService: LocalServiceService) {

    this.contractId = AppSetting.contractId;
    this.associateId = AppSetting.associateId;
  }

  ngOnInit() {
    this.authorizationService.setPermissions('COMMERCIAL');
    this.perList = this.authorizationService.getPermissions('COMMERCIAL') == null ? [] : this.authorizationService.getPermissions('COMMERCIAL');
    this.permissionsService.loadPermissions(this.perList);

    this.spinner.show();
    this.acRoute.params.subscribe(x => {
      if (x.editflow) {
        this.editflow = x.editflow;
      }
    });
    // this.getCommercialData();
    this.getContractData();
    this.getProductCat();
    this.getAllVehicle();
  }

  // ngOnChanges(){
  //   if(this.safex && this.safex.expanded){
  //     this.safex.close();
  //     // this.safex.expanded = false;
  //     this.gen.close();

  //   }
  // }


  openSchedule(obj) {
    obj.expanded = false;

  }

  closeSchedule(obj) {

    obj.expanded = true;

  }
  // Custmer Model Search Start
  getContractData() {
    this.apiService.get('secure/v1/deliverycontract/' + AppSetting.contractId).subscribe(data => {
      let ob = ErrorConstants.validateException(data);
      if (ob.isSuccess) {
        this.contractData = data.data.responseData;
        this.contractRefData = data.data.referenceData;
        this.paymentCommercialSefData.assocCntrId = this.contractData.id;
        this.paymentCommercialSefData.effectiveDt = this.contractData.effectiveDt;
        this.paymentCommercialSefData.expDt = this.contractData.expDt;
        this.paymentCommercialSchData.assocCntrId = this.contractData.id;
        this.paymentCommercialSchData.effectiveDt = this.contractData.effectiveDt;
        this.paymentCommercialSchData.expDt = this.contractData.expDt;
        this.lookupSubDeliveryId = this.contractData.lkpSubDeliveryId;
        if (this.contractRefData.subDeliveryTypeList.find(item => item.id === this.lookupSubDeliveryId).lookupVal === "PCD") {
          this.isPCD = true;
          this.customerSpecificPayment = 1;
          this.customerSpecificPaymentRadioDisabled = true;
          this.contractCustomerList = [];
        }
        if (this.schedule) {
          this.safex.expanded = false;
          this.schedule.expanded = true;
        } else {
          if (this.safex) {
            this.safex.expanded = true;
          }
        }
        if (this.gen) {
          this.gen.expanded = false;
        }
        this.getCommercialData();
      }
    }, (error) => {
      this.toastr.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    })
  }

  getCommercialData() {
    this.spinner.show();
    this.apiService.get(`secure/v1/deliveryCommercial/${this.contractId}`).subscribe(data => {
      let ob = ErrorConstants.validateException(data);
      if (ob.isSuccess) {
        this.paymentCommercialRefData = data.data.referenceData;
        if (data.data.responseData.length > 0) {

          if (this.isPCD) {
            data.data.responseData.forEach(element => {
              if (element.customerCommercial[0].dlvryPayoutCtgy == "SCHEDULED") {
                this.paymentCommercialSchData = element.customerCommercial[0];
                this.paymentcomercialSchMasterData = element;
                this.paymentCommercialCustomerSchData = element.customerCommercial[0];
              } else if (element.customerCommercial[0].dlvryPayoutCtgy == "SAFEXTENSION") {
                this.paymentCommercialSefData = element.customerCommercial[0];
                this.paymentcomercialSefMasterData = element;
                this.paymentCommercialCustomerSefData = element.customerCommercial[0];
              }

            });
          }
          else {
            data.data.responseData.forEach(element => {
              if (element.dlvryPayoutCtgy == "SCHEDULED") {
                this.paymentCommercialSchData = element;
                this.paymentcomercialSchMasterData = element;
                this.paymentCommercialCustomerSchData = element.customerCommercial
              } else if (element.dlvryPayoutCtgy == "SAFEXTENSION") {
                this.paymentCommercialSefData = element;
                this.paymentcomercialSefMasterData = element;
                this.paymentCommercialCustomerSefData = element.customerCommercial
              }
            });
          }

          // check if the customer specfic payment is mandate by checking if PCD is selected and field is disabled otherwise making it user interractive
          if (this.isPCD) {
            this.contractCustomerList = [];
            if (data.data.responseData[0].customerCommercial[0].attr1 !== undefined) {
              this.contractCustomerList = [{
                attr1: data.data.responseData[0].customerCommercial[0].attr1,
                msaCustId: data.data.responseData[0].customerCommercial[0].msaCustId,
                cntrCode: data.data.responseData[0].customerCommercial[0].cntrCode,
                active: true,
              }]
              this.activeTab = this.contractCustomerList[0];
            } else if (data.data.responseData[1].customerCommercial[1].attr1 !== undefined) {
              this.contractCustomerList = [{
                attr1: data.data.responseData[1].attr1,
                msaCustId: data.data.responseData[1].msaCustId,
                cntrCode: data.data.responseData[1].cntrCode,
                active: true,
              }]
              this.activeTab = this.contractCustomerList[0];
            } else {
              this.addCustomer(true);
              this.setDataisPCD();
            }
          } else {
            this.contractCustomerList = [{ attr1: "General", msaCustId: null, cntrCode: null, active: true }]
            this.isPCD = false;
            this.customerSpecificPayment =
              data.data.responseData[0] && data.data.responseData[0].customerCommercial &&
                data.data.responseData[0].customerCommercial.length > 0
                ? 1
                : data.data.responseData[1] && data.data.responseData[1].customerCommercial &&
                  data.data.responseData[1].customerCommercial.length > 0
                  ? 1
                  : 0;

            this.customerSpecificPaymentRadioDisabled = false;
            // get customer list from the customerCommercial Array from the response
            if (this.customerSpecificPayment) {
              if (data.data.responseData[0] && data.data.responseData[0].customerCommercial.length > 0) {
                data.data.responseData[0].customerCommercial.forEach(element => {
                  let tempObj = {
                    attr1: element.attr1,
                    msaCustId: element.msaCustId,
                    cntrCode: element.cntrCode,
                    active: false,
                  };
                  this.contractCustomerList.push(tempObj)
                });
              } else if (data.data.responseData[1] && data.data.responseData[1].customerCommercial.length > 0) {
                data.data.responseData[1].customerCommercial.forEach(element => {
                  let tempObj = {
                    attr1: element.attr1,
                    msaCustId: element.msaCustId,
                    cntrCode: element.cntrCode,
                    active: false,
                  };
                  this.contractCustomerList.push(tempObj)
                });
              }

              this.activeTab = this.contractCustomerList[0];
            }
          }

          // this.getProductList(this.paymentCommercialSefData.prdctCtgyId);     
        }
        else if (data.data.responseData.length === 0 && this.isPCD) {
          this.addCustomer(true);
          this.setDataisPCD();
        }

        this.setStaticIds();
        this.spinner.hide();
      }
      this.spinner.hide();
    }, (error) => {
      this.toastr.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    })
  }

  setDataisPCD() {
    this.paymentcomercialSchMasterData = new PaymentTermsModel();
    this.paymentcomercialSefMasterData = new PaymentTermsModel();
    this.paymentCommercialSefData = new PaymentTermsModel();
    this.paymentCommercialSchData = new PaymentTermsModel();
    this.paymentCommercialCustomerSchData = [];
    this.paymentCommercialCustomerSefData = [];
    this.paymentCommercialSefData.assocCntrId = this.contractData.id;
    this.paymentCommercialSefData.effectiveDt = this.contractData.effectiveDt;
    this.paymentCommercialSefData.expDt = this.contractData.expDt;
    this.paymentCommercialSchData.assocCntrId = this.contractData.id;
    this.paymentCommercialSchData.effectiveDt = this.contractData.effectiveDt;
    this.paymentCommercialSchData.expDt = this.contractData.expDt;
    if (this.schedule) {
      if (this.safex) this.safex.expanded = false;
      this.schedule.expanded = true;
    } else {
      if (this.safex) {
        this.safex.expanded = true;
      }
    }
    if (this.gen) {
      this.gen.expanded = false;
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

  editInput(obj) {

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



  // ----------- Payment General Term methods ----------- //

  savePaymentGeneralTerms(flag) {
    if (this.isPCD) {
      if (this.contractData && this.contractData.scheduledDeliveryFlag) { //schedule
        if (!this.paymentCommercialSchData.id) {
          if (!this.localServiceService.getSchCommercialId()) {
            this.toastr.info("Please add Scheduled Payout");
            return;
          }
        }
        if (!this.paymentCommercialSefData.id && this.contractData.safextDeliveryFlag) {
          if (!this.localServiceService.getSafCommercialId()) {
            this.toastr.info("Please add Safextension Payout");
            return;
          }
        }
      } //schedule
      else if (this.contractData && this.contractData.safextDeliveryFlag) {
        if (!this.paymentCommercialSefData.id) {
          if (!this.localServiceService.getSafCommercialId()) {
            this.toastr.info("Please add Safextension Payout");
            return;
          }
        }
      }
    }
    else {
      if (this.contractData && this.contractData.scheduledDeliveryFlag) {
        if (!this.paymentCommercialSchData.id) {
          this.toastr.info("Please add Scheduled Payout");
          return;
        }
        if (this.customerSpecificPayment) {
          if (!this.isPCD) {
            if (this.contractCustomerList.slice(1).length !== this.paymentCommercialCustomerSchData.length) {
              this.toastr.info("Please add Scheduled Payout Customer Data");
              return;
            }
          }
        }
      }
      if (this.contractData && this.contractData.safextDeliveryFlag) {
        if (!this.paymentCommercialSefData.id) {
          this.toastr.info("Please add Safextension Payout");
          return;
        }
        if (this.customerSpecificPayment) {
          if (!this.isPCD) {
            if (this.contractCustomerList.slice(1).length !== this.paymentCommercialCustomerSefData.length) {
              this.toastr.info("Please add Safextension Payout Customer Data");
              return;
            }
          }
        }
      }
    }

    // if(this.sheduleComp.checkValidScheOrSafexForm()) {
    //   return;
    // }

    this.genValidation.saveGeneralTerms(flag);


  }
  childToParent(event: any) {
    this.spinner.show();
    this.getCommercialDataCallForChild().then(data => {
      this.spinner.hide();
      if (event) this.customerSlectionchange(event, 0);
    })
  }

  /*-------- If permissions not provide for create and update ------------- */
  nextReadMode() {
    if (this.editflow) {
      this.router.navigate(['/asso_delivery-contract/booking-sla', { steper: true, editflow: this.editflow }], { skipLocationChange: true })
    } else {
      this.router.navigate(['/asso_delivery-contract/booking-sla'], { skipLocationChange: true });
    }
  }

  CustomerSpecfificPaymentSelection(value) {
    if (value === 1) {
      this.contractCustomerList = [{ attr1: "General", msaCustId: null, cntrCode: null, active: true }];
      this.addCustomer();
    } else {
      if (this.paymentcomercialSefMasterData.customerCommercial.length === 0 && this.paymentcomercialSchMasterData.customerCommercial.length === 0) {
        this.contractCustomerList = [{ attr1: "General", msaCustId: null, cntrCode: null, active: true }];
        return;
      }

      // delete the customer data when the user click the no radio button
      this.spinner.show();
      this.contractCustomerList = [];
      if (this.contractData.scheduledDeliveryFlag) {
        this.paymentcomercialSchMasterData.customerCommercial = [];
        this.deleteCustomerRecord(this.paymentcomercialSchMasterData).then(data => {
          if (this.contractData.safextDeliveryFlag) {
            this.paymentcomercialSefMasterData.customerCommercial = [];
            this.deleteCustomerRecord(this.paymentcomercialSefMasterData).then(data => {
              this.getCommercialData();
            })
          } else this.getCommercialData();
        })
      } else if (this.contractData.safextDeliveryFlag) {
        this.paymentcomercialSefMasterData.customerCommercial = [];
        this.deleteCustomerRecord(this.paymentcomercialSefMasterData).then(data => {
          if (this.contractData.scheduledDeliveryFlag) {
            this.paymentcomercialSchMasterData.customerCommercial = [];
            this.deleteCustomerRecord(this.paymentcomercialSchMasterData).then(data => {
              this.getCommercialData();
            })
          } else this.getCommercialData();
        })
      }
    }

  }

  addCustomer(pcd = false) {
    const dialogRef = this.dialog.open(SelectCustomerComponent, {
      data: {
        previousData: this.contractCustomerList,
        editflow: this.editflow,
        pcd: pcd,
        isPCD: this.isPCD
      },
      width: "55vw",
      panelClass: "mat-dialog-responsive",
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.contractCustomerList = data;
        if (this.isPCD) {
          this.contractCustomerList[0].active = true;
          this.activeTab = this.contractCustomerList[0];
          this.activeTabIndex = 0;
          this.currTabIndex = 0;
        }
      } 
      if(this.contractCustomerList.length == 1){
        if(this.contractCustomerList[0].attr1 == 'General'){
          this.customerSpecificPayment = 0;
        }
      }
    });
  }

  // funtion to be performed when the user changes the Tab Selection of customers / General
  currTabIndex = null;
  customerSlectionchange(index, flag = 1) {
    this.currTabIndex = index;
    if (flag) {
      if (this.activeTabIndex === index) return;
    }
    this.contractCustomerList.forEach((element, idx) => {
      if (index === idx) {
        element.active = true;
        this.activeTab = element;
        this.activeTabIndex = idx;
        this.sendCustomerDataFromParentToChild(element);
      }
      else element.active = false;
    });
  }

  // schCommercialId = null;
  // safCommercialId = null;
  // getCommercialId(event: any) {
  //   if (!this.isPCD) return;
  //   if (event && event.charAt(0) === "1") {
  //     this.schCommercialId = event.substr(1);
  //   }
  //   else if (event && event.charAt(0) === "0") {
  //     this.safCommercialId = event.substr(1);
  //   }
  // }

  /*-------- Delete Customer when customer Specific radio button is Yes and customer is added ------------- */
  deleteCustomer(event, idx, element) {
    event.stopPropagation();
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      panelClass: 'creditDialog',
      data: { message: 'Are you sure you want to delete?' },
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if (value) {
        // this.spinner.show();
        if (this.isPCD) { //PCD Scenario
          if (this.contractData.scheduledDeliveryFlag && this.paymentcomercialSchMasterData.customerCommercial[0]) { //Sch present
            this.paymentcomercialSchMasterData.customerCommercial[0].isPcdDel = 1;
            if (!this.paymentcomercialSchMasterData.customerCommercial[0].id) {
              this.paymentcomercialSchMasterData.customerCommercial[0].id = this.localServiceService.getSchCommercialId();
            }
            this.deleteCustomerRecord(this.paymentcomercialSchMasterData).then(data => {
              if (this.contractData.safextDeliveryFlag && this.paymentcomercialSefMasterData.customerCommercial[0]) {
                this.paymentcomercialSefMasterData.customerCommercial[0].isPcdDel = 1;
                if (!this.paymentcomercialSefMasterData.customerCommercial[0].id) {
                  this.paymentcomercialSefMasterData.customerCommercial[0].id = this.localServiceService.getSafCommercialId();
                }
                this.deleteCustomerRecord(this.paymentcomercialSefMasterData).then(data => {
                  this.contractCustomerList = [];
                  this.getCommercialData();
                  this.genValidation.getgeneralDetails();
                 // this.spinner.hide();
                });
              }
              else {
                this.contractCustomerList = [];
                this.getCommercialData();
                this.genValidation.getgeneralDetails();
               // this.spinner.hide();
              }
            });

          }
          else if (this.contractData.safextDeliveryFlag && this.paymentcomercialSefMasterData.customerCommercial[0]) {//sch not present
            this.paymentcomercialSefMasterData.customerCommercial[0].isPcdDel = 1;
            if (!this.paymentcomercialSefMasterData.customerCommercial[0].id) {
              this.paymentcomercialSefMasterData.customerCommercial[0].id = this.localServiceService.getSafCommercialId();
            }
            this.deleteCustomerRecord(this.paymentcomercialSefMasterData).then(data => {
              this.contractCustomerList = [];
              this.getCommercialData();
              this.genValidation.getgeneralDetails();
              //this.spinner.hide();
            });
          }
          else {
            this.contractCustomerList = [];
            this.getCommercialData();
            this.genValidation.getgeneralDetails();
           // this.spinner.hide();
          }
        }
        else { //Non-PCD Scenario
          this.contractCustomerList.splice(idx, 1);
          if (this.contractData.scheduledDeliveryFlag) {
            let customerCommercialSchIndex = this.paymentcomercialSchMasterData.customerCommercial.findIndex(item => item.cntrCode === element.cntrCode);
            if (customerCommercialSchIndex !== -1) {
              this.paymentcomercialSchMasterData.customerCommercial.splice(customerCommercialSchIndex, 1);
              this.deleteCustomerRecord(this.paymentcomercialSchMasterData).then(data => {
                if (this.contractData.safextDeliveryFlag) {
                  let customerCommercialSefIndex = this.paymentcomercialSefMasterData.customerCommercial.findIndex(item => item.cntrCode === element.cntrCode);
                  if (customerCommercialSefIndex !== -1) {
                    this.paymentcomercialSefMasterData.customerCommercial.splice(customerCommercialSefIndex, 1);
                    this.deleteCustomerRecord(this.paymentcomercialSefMasterData).then(data => {
                      this.getCommercialData();
                    });
                  } else this.getCommercialData()
                } else this.getCommercialData();
              });
            } else {
              if(this.contractCustomerList.length == 1){
                if(this.contractCustomerList[0].attr1 == 'General'){
                  this.customerSpecificPayment = 0;
                }
              }
              this.spinner.hide();
            }

          } else if (this.contractData.safextDeliveryFlag) {
            let customerCommercialSefIndex = this.paymentcomercialSefMasterData.customerCommercial.findIndex(item => item.cntrCode === element.cntrCode);
            if (customerCommercialSefIndex !== -1) {
              this.paymentcomercialSefMasterData.customerCommercial.splice(customerCommercialSefIndex, 1);
              this.deleteCustomerRecord(this.paymentcomercialSefMasterData).then(data => {
                if (this.contractData.scheduledDeliveryFlag) {
                  let customerCommercialSchIndex = this.paymentcomercialSchMasterData.customerCommercial.findIndex(item => item.cntrCode === element.cntrCode);
                  if (customerCommercialSchIndex !== -1) {
                    this.paymentcomercialSchMasterData.customerCommercial.splice(customerCommercialSchIndex, 1);
                    this.deleteCustomerRecord(this.paymentcomercialSchMasterData).then(data => {
                      this.getCommercialData();
                    })
                  } else this.getCommercialData()
                } else this.getCommercialData();
              });
            } else {
              if(this.contractCustomerList.length == 1){
                if(this.contractCustomerList[0].attr1 == 'General'){
                  this.customerSpecificPayment = 0;
                }
              }
              this.spinner.hide();
            } 

          }
          
  
          this.customerSlectionchange(0);
        }
      }
    });
  }





  deleteCustomerRecord(paymentCommercialData) {
    return new Promise((resolve, reject) => {
      this.apiService.post('secure/v1/deliveryCommercial', paymentCommercialData).subscribe((obj) => {
        if (obj.status == "SUCCESS") {
          resolve(true)
        }
      }, error => reject(error))

    })

  }

  //sending data from parent to child on tabselection
  sendCustomerDataFromParentToChild(element) {
    if (this.customerSpecificPayment && !this.isPCD) {
      if (element.attr1.toLowerCase() === "general") {
        this.paymentCommercialSchData = this.paymentcomercialSchMasterData;
        this.paymentCommercialSefData = this.paymentcomercialSefMasterData;
      } else {
        if (this.contractData.safextDeliveryFlag) {
          let customerCommercialSefIndex = this.paymentcomercialSefMasterData.customerCommercial.findIndex(item => item.cntrCode === element.cntrCode);
          if (customerCommercialSefIndex !== -1) {
            this.paymentCommercialSefData = this.paymentcomercialSefMasterData.customerCommercial[customerCommercialSefIndex];
          } else {
            this.paymentCommercialSefData = new PaymentTermsModel();
            this.paymentCommercialSefData.effectiveDt = this.paymentcomercialSefMasterData.effectiveDt;
            this.paymentCommercialSefData.expDt = this.paymentcomercialSefMasterData.expDt;
            this.paymentCommercialSefData.assocCntrId = this.paymentcomercialSefMasterData.assocCntrId;
          }
        }

        if (this.contractData.scheduledDeliveryFlag) {
          let customerCommercialSchIndex = this.paymentcomercialSchMasterData.customerCommercial.findIndex(item => item.cntrCode === element.cntrCode);
          if (customerCommercialSchIndex !== -1) {
            this.paymentCommercialSchData = this.paymentcomercialSchMasterData.customerCommercial[customerCommercialSchIndex];

          } else {
            this.paymentCommercialSchData = new PaymentTermsModel();
            this.paymentCommercialSchData.effectiveDt = this.paymentcomercialSchMasterData.effectiveDt;
            this.paymentCommercialSchData.expDt = this.paymentcomercialSchMasterData.expDt;
            this.paymentCommercialSchData.assocCntrId = this.paymentcomercialSchMasterData.assocCntrId

          }
        }

      }
    } else if (this.customerSpecificPayment && this.isPCD) {
      this.paymentCommercialSchData = this.paymentcomercialSchMasterData.customerCommercial[0];
      this.paymentCommercialSefData = this.paymentcomercialSefMasterData.customerCommercial[0];
    }
  }

  getCommercialDataCallForChild() {
    return new Promise((resolve, reject) => {
      this.apiService.get(`secure/v1/deliveryCommercial/${this.contractId}`).subscribe(data => {
        let ob = ErrorConstants.validateException(data);

        if (ob.isSuccess) {
          if (data.data.responseData.length > 0) {

            data.data.responseData.forEach(element => {
              if (element.dlvryPayoutCtgy == "SCHEDULED") {
                this.paymentCommercialSchData = element;
                this.paymentcomercialSchMasterData = element;
                this.paymentCommercialCustomerSchData = element.customerCommercial
              } else if (element.dlvryPayoutCtgy == "SAFEXTENSION") {
                this.paymentCommercialSefData = element;
                this.paymentcomercialSefMasterData = element;
                this.paymentCommercialCustomerSefData = element.customerCommercial
              }

            });

            resolve(true);
          }
        }
      }, err => reject(err));
    })
  }



}
