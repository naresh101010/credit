import { ModeOfPaymentValidateComponent } from './../../dialog/mode-of-payment-validate/mode-of-payment-validate.component';
import { InvoiceAmountConfirmationComponent } from './../../dialog/invoice-amount-confirmation/invoice-amount-confirmation.component';
import * as moment from "moment";
import { NgxSpinnerService } from "ngx-spinner";
import { BranchService } from 'src/app/core/service/branch.service';
import { BookingInformationService } from "./../../core/service/booking-information.service";
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { AddNewConsigneeComponent } from "src/app/dialog/add-new-consignee/add-new-consignee.component";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { EwaybillNumberComponent } from "src/app/dialog/ewaybill-number/ewaybill-number.component";
import { StickerPrintComponent } from "src/app/dialog/sticker-print/sticker-print.component";
import { AppComponent } from "src/app/app.component";
import { SearchCustomerComponent } from 'src/app/dialog/search-customer/search-customer.component';
import { AppSetting } from '../../app.setting';
import { UgdRequestService } from 'src/app/core/service/ugd-request.service';
import { CommonService } from 'src/app/core/common.service';
import { AddEmailComponent } from 'src/app/dialog/add-email/add-email.component';

@Component({
  selector: 'app-rerouting-start-booking',
  templateUrl: './rerouting-start-booking.component.html',
  styleUrls: ['./rerouting-start-booking.component.css']
})
export class ReroutingStartBookingComponent implements OnInit {
  @ViewChild("f", null) bookingInfoForm: any;
  toBranchName: any;
  tobranchId: any;
  maxLength: number = 5;
  consigneeResp;
  pdcList = [
    { "name": "Yes", id: 1, "checked": false },
    { "name": "No", id: 0, "checked": true }
  ];
  hubflagList = [
    { "name": "Yes", id: 1, "checked": false },
    { "name": "No", id: 0, "checked": true }
  ]
  ewaybillflagList = [
    { "name": "Yes", id: 1, "checked": true },
    { "name": "No", id: 0, "checked": false }
  ]
  lkpBizTypevalue = {} as any;
  selectedpincodeBranch: any;
  selectedValue: string = 'MSA';
  contract: string;
  percentage: any;
  gstAmount: any = 0;
  grandCharges: any = 0;
  totalCharges: any = 0;
  discountClosebtn: boolean = false;
  grandTotalCharges: any = 0;
  editMode: boolean = false;
  contractOption = 1;
  branchId = JSON.parse(sessionStorage.getItem("branchId"))
  userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  headerData = {
    branchCode: "02",
    journeyId: "01",
    originUserType: "03",
    branchId: this.branchId,
    userId: this.userDetails.userId,
  } as any;
  headerData2 = {
    branchCode: "02",
    journeyId: "01",
    originUserType: "03",
    branchId: JSON.stringify(this.branchId),
    userId: this.userDetails.userId,
  };
  // ngOnChange(){
  //   this.isEditCheck = true;
  // }
  dataSource1: MatTableDataSource<any>;
  // dataSource4: MatTableDataSource<any>;
  commercialTypeList: Array<any> = [];
  serviceOfferingList: Array<any> = [];
  RateCardList: Array<any> = [];
  bookingInfoList: Array<any> = [];
  ncvList: Array<any> = [
    {
      invoiceNumber: "",
      invoiceDate: "",
      invoiceAmount: "",
    },
  ];
  searchtext: any;
  branchName;
  waybillList: Array<any> = [];
  consignerList: Array<any> = [];
  packageList: Array<any> = [];
  categoryList: Array<any> = [];
  packageDetailsTableList: Array<any> = [];
  categoryListWithAlisList: Array<any> = [];
  serviceOfferingReferenceList: Array<any> = [];
  selectedProductCategoryCardList: Array<any> = [];
  LocalconsigneeList: Array<any> = [];
  hubList: Array<any> = [];
  tempcategoryList: Array<any> = [];
  allLookupList: Array<any> = [];
  selectedProduct: Array<any> = [];
  waybillDetailList: Array<any> = [];
  selectedProductCategoryList;
  dodTypeList: Array<any> = [];
  mopList: Array<any> = [];
  consigneeList: Array<any> = [];
  ProductList: Array<any> = [];
  allProductList: Array<any> = [];
  bookingInfoObj = {
    ewaybillAvailableFlag: 1,
    hubDeliveryFlag: 0,
    ncvFlag: 0,
    dodDaccFlag: 0,
    invoiceList: [],
    packageList: [],
  } as any;
  searchWayBill;
  sfxCode;
  isProductIndex = 0;
  serviceOfferingName;
  packageTypeId;
  MopName;
  sfxObj;
  selectedProductCat;
  waybillNumber;
  mopModeSearch: string = "";
  ConsigneesearchObj;
  consignorSearchObj;
  productCategoryId;
  lkpSafextType;
  p = 1;
  page1 = 1;
  consigneeTypeId: any;
  consignorTypeId: any;
  ConrConeeTypeId: any;
  isExpand: boolean = true;
  isPincodeDisable: boolean = false;
  multiple1: boolean = false;
  isDisabled: boolean = false;
  sfxLengthValid: boolean = false;
  invalidPincode: boolean = false;
  IsMultipleProductCategory: boolean = false;
  isChargeWeight: boolean = true;
  isPeaceType: boolean = false;
  productCatIsChacked: boolean = true;
  isHideNcv: boolean = true;
  successMsg: boolean = false;
  isPackaging: boolean = false;
  isCreditCheck: boolean = true;
  isWaybillDisable: boolean = false;
  isFrieghtExpand: boolean = false;
  selectedInboundPackageType: boolean = false;
  isInvoiceCommercial: boolean = false;
  fieldsetDisabled: boolean = false;
  packTypeSearch: string = "";
  addProductSearch: string = "";
  unitCalculationType: string = "";
  serviceOfferCtrl: string = "";
  selectedMopName: string = "";
  addProductCategorySearch: string = "";
  destPincode;
  UnitOfMeasurement;
  isCommercialRequired: boolean = false;
  isRateCardRequired: boolean = false;
  consignerisExpand: boolean = false;
  reCalculate: boolean = false;
  searchConsignee = {} as any;
  searchCongner = {} as any;
  invoiceCost = 0;
  productId;
  contractType;
  searchHubName;
  selectedType;
  saveType: any;
  totalWayBill: number;
  isNCVchecked: boolean = false;
  localWaybillList: Array<any> = [];
  displayedColumns: string[] = ["radio", "name", "address", "contact"];
  displayedColumns1: string[] = [
    "radio",
    "name",
    "address",
    "contact",
    "height",
  ];
  IsCrate: boolean = true;
  displayedColumns2: string[] = ["radio", "name", "address"];
  dataSource2 = ELEMENT_DATA_2;
  localBookingObj = {} as any;
  todayDate = moment(new Date()).format("YYYY-MM-DD");
  customerArray: any[] = [];
  CustomerDatasource: any;
  oldCustomerDeductions: any[] = [];
  allBranchList: Array<any> = [];
  pincodeList: any;
  totalPackages;
  consigneeDetails;
  consignorDetails;
  toPayId;
  constructor(
    private dialog: MatDialog,
    private $bookingInfo: BookingInformationService,
    private spinner: NgxSpinnerService,
    private appComp: AppComponent,
    private $branch: BranchService,
    private ugdservice: UgdRequestService,
    private commonService: CommonService
  ) { }
  bookingFlag;
  allLookUps = [];
  requestedMop;
  reqNo;
  ngOnInit() {
    this.spinner.show();
    this.totalPackages = sessionStorage.getItem('totalWaybill');
    this.requestedMop = sessionStorage.getItem('requestedMop');
    this.reqNo = sessionStorage.getItem('rebookReqNo');
    this.getBranchType();
    this.getAllLookups();
    this.getAllOfferings();
    this.getMopByBranch();
    this.getAlProductcategory();
    this.getAllLoad();
    this.getpackageList();
    this.getServiceOffering();
    this.getProductList();
    this.getAllBranch();
    this.branchName = sessionStorage.getItem("branchName");
    this.checkBookingMannualOrAuto();

    // this.fieldsetDisabled = true;
  }
  getAllLookups() {
    this.commonService.getAllLookups().subscribe((res: any) => {
      console.log('res getalllookups', res);
      this.allLookUps = res;
    }, (err: any) => {

    })
  }
  getAllBranch() {
    this.$branch.getBranchDetails().subscribe((response) => {
      if (response) {
        this.spinner.hide();
        this.allBranchList = response;
        console.log(this.allBranchList, 'branchList');
      }
    });
  }
  refType(id: any) {
    if (!id) {
      return '';
    }
    const nameData = this.allLookUps.filter((ref) => ref.id === id);
    let name = "";
    if (nameData[0]) {
      name = nameData[0].lookupVal;
    }
    // console.log('nameeee', name);
    if (!name || name === 'undefined' || name === 'UNDEFINED') {
      name = ''
    }
    return name;
  }

  isWaybillNoDisable: boolean = true;

  checkBookingMannualOrAuto() {
    let checkAuto = true;
    this.$bookingInfo.branchMannualOrAuto(this.branchId, this.headerData).subscribe((response) => {
      console.log('dataaaaaaaaa response', response)
      if (response) {
        for (let data of response.responseData) {
          console.log('dataaaaaaaaa', data)
          if (data === "MANUAL WAYBILL") {
            checkAuto = false;
            // this.isWaybillNoDisable = false;
            // this.bookingInfoObj.autoWaybill = false;
            // checkAuto = true
          }
          // else {
          //   this.isWaybillNoDisable = true;
          //   this.bookingInfoObj.autoWaybill = true;
          //   this.bookingInfoObj.waybillNumber = ''
          // }
        }

      }
      if (checkAuto) {
        this.isWaybillNoDisable = true;
        this.bookingInfoObj.autoWaybill = true;
        const newWaybill = sessionStorage.getItem('newWaybill');
        if (!newWaybill) {
          this.bookingInfoObj.waybillNumber = ''
        }
      } else {
        this.isWaybillNoDisable = false;
        this.bookingInfoObj.autoWaybill = false;
      }
    });
  }
  onScreenHeader(screen) {

    if (screen == 'isExpand') {
      if (this.isExpand == true) {
        this.isExpand = false;
      } else {
        this.isExpand = true;
        this.consignerisExpand = false;
        this.isPackaging = false;
      }
    }
    if (screen == 'consignerisExpand') {
      if (this.consignerisExpand == true) {
        this.consignerisExpand = false;
      } else {
        this.isExpand = false;
        this.consignerisExpand = true;
        this.isPackaging = false;
      }
    }
    if (screen == 'isPackaging') {
      if (this.isPackaging == true) {
        this.isPackaging = false;
      } else {
        this.isExpand = false;
        this.consignerisExpand = false;
        this.isPackaging = true;
      }
    }
  }
  discountAmount = '';
  onApplyDiscount() {
    console.log(this.percentage);
    console.log(this.bookingInfoObj.waybillNumber);
    var percetageDiscountBody = {
      // discountPercentage: 0.1,
      // waybillId: 16668,
      discountPercentage: this.percentage,
      waybillId: this.bookingInfoObj.waybillId,
    };
    this.$bookingInfo.discount(percetageDiscountBody, this.headerData).subscribe((response) => {
      console.log(response.data.totalCharges);
      this.totalCharges = response.data.totalCharges;
      this.grandCharges = response.data.grandCharges;

      this.gstAmount = response.data.gstAmount;
      if (response.data.gstPercent) {
        this.gstPercent = response.data.gstPercent
        this.gstPercent = this.gstPercent + '%';
      }
      if (response.data.discountAmount) {
        this.discountAmount = response.data.discountAmount
      }
      if (response.data.grandTotalCharges) {
        this.grandTotalCharges = response.data.grandTotalCharges
      }
    });
  }
  sortConsigneeList() {
    this.consigneeList.sort()
  }
  isKeyType;
  checkWaybillNumberLength() {
    this.isKeyType = true;
  }
  validateWaybillNummanually(event) {
    if (event) {
      this.isKeyType = false;
      console.log(event);
      var strlength = this.bookingInfoObj.waybillNumber;
    }
    if (strlength.toString().length > 14) {
      this.$bookingInfo.validateWaybillNumber(this.bookingInfoObj.waybillNumber, this.headerData, this.branchId).subscribe(
        (response) => {
          if (response != undefined && response) {


          }
          else {
            this.appComp.showMessage(`Invalid Waybill Number !`, 'danger');
            this.bookingInfoObj.waybillNumber = '';
          }
        },
        (err) => {
          this.spinner.hide();
        }
      );

    }
  }

  clearSfxCode() {
    this.bookingInfoObj.sfxPrcContractcode = ''
  }
  saveWayBill(type) {

    if (!this.selectedProductCategoryList || !this.packageTypeId) {
      this.appComp.showMessage(`Please enter mandatory fields !`, 'danger')
      return;
    }

    this.saveType = type;
    if (!this.bookingInfoObj.autoWaybill) {
      if (!this.bookingInfoObj.waybillNumber || this.bookingInfoObj.waybillNumber === '') {
        this.appComp.showMessage(`Please enter waybill number !`, 'danger')
        return;
      }
    }
    if (!this.bookingInfoObj.consignorId) {
      this.appComp.showMessage(`Consignor not selected !`, 'danger')
      return;
    }
    if (!this.bookingInfoObj.consigneeId) {
      this.appComp.showMessage(`Consignee not selected !`, 'danger')
      return;
    }
    if (!this.bookingInfoObj.commercialId) {
      this.appComp.showMessage(`Please select commercial!`, 'danger')
      return;
    }
    if (!this.bookingInfoObj.rateCardId) {
      this.appComp.showMessage(`Please select rate card!`, 'danger')
      return;
    }

    if (this.bookingInfoObj.pickupTime) {
      let splitLen = this.bookingInfoObj.pickupTime.split(":");
      if (splitLen.length != 3) {
        this.bookingInfoObj.pickupTime = `${this.bookingInfoObj.pickupTime}:00`;
      }
    }


    let isPresent = this.selectedProductCategoryCardList.filter(
      (elem) =>
        this.bookingInfoObj.packageList.findIndex(
          (elm) => elm.productCategoryId == elem.id
        ) == -1
    );
    var selectedProductStr = '';
    isPresent.forEach(ele => {
      if (ele.prdctCtgy) {
        selectedProductStr = selectedProductStr + ele.prdctCtgy + ','
      }
    });
    if (isPresent.length) {
      this.appComp.showMessage(`${selectedProductStr} Product Category have no Packaging Details !`, 'danger');
      return;
    }
    console.log(isPresent, selectedProductStr);
    if (this.isPeaceType == true) {
      let isProduct = this.selectedProduct.filter(
        (elem) =>
          this.bookingInfoObj.packageList.findIndex(
            (elm) => elm.productId == elem.id
          ) == -1
      );
      isProduct.forEach(ele => {
        if (ele.prdctName) {
          selectedProductStr = selectedProductStr + ele.prdctName + ','
        }
      });
      if (isProduct.length) {
        console.log(isPresent, selectedProductStr);
        this.appComp.showMessage(`${selectedProductStr} Product have no Packaging Details !`, 'danger');
        return;
      }
    }

    if (this.bookingInfoObj.ncvFlag !== 1) {
      if (!this.bookingInfoObj.invoiceList) {
        this.appComp.showMessage(`Add Invoice Details !`, 'danger')
        return;
      }
      if (this.bookingInfoObj.invoiceList.length === 0) {
        this.appComp.showMessage(`Add Invoice Details !`, 'danger')
        return;
      }
    }

    if (this.bookingInfoObj.packageList && this.bookingInfoObj.packageList.length) {
      var totalWeight = 0;
      var totalpackage = 0;
      this.bookingInfoObj.packageList.forEach((element) => {
        if (element.actualWeight) {
          totalWeight =
            totalWeight +
            parseInt(element.actualWeight);
        }

      })
      let list = [];
      // console.log('isPresent', isPresent);
      console.log('this.selectedProductCategoryCardList', this.selectedProductCategoryCardList);
      console.log('this.this.bookingInfoObj.packageList', this.bookingInfoObj.packageList);

      if (this.selectedProductCategoryCardList.length > 0) {
        if (this.bookingInfoObj.packageList && this.bookingInfoObj.packageList.length) {
          for (let pack of this.bookingInfoObj.packageList) {
            for (let selected of this.selectedProductCategoryCardList) {
              if (pack.productCategoryId === selected.id) {
                list.push(pack);
              }
            }
          }
        }

        this.bookingInfoObj.packageList = list;
      }
      if (parseInt(this.bookingInfoObj.actualWeight) != totalWeight) {
        this.appComp.showMessage(`Total weight and Actual weight  are not matching !`, 'danger')
        return;
      }

      this.bookingInfoObj.packageList.forEach((element) => {
        if (element.numOfPackage) {
          totalpackage =
            totalpackage +
            parseInt(element.numOfPackage);
        }

      })
      if (parseInt(this.bookingInfoObj.totalPackageCount) != totalpackage) {
        this.appComp.showMessage(`Total packages and No. of packages are not matching !`, 'danger')
        return;
      }
    }
    if (!this.bookingInfoObj.packageList) {
      return;
    }
    const newWaybill = sessionStorage.getItem('newWaybill');
    if (newWaybill) {
      this.editing = true;
    }
    if (!this.editing) {
      delete this.bookingInfoObj.waybillId;
      delete this.bookingInfoObj.wayblCurrStatusLookupId;
    }
    // delete this.bookingInfoObj.deliveryGatewayBranchId;

    this.bookingInfoObj.reRoutingFlag = 1;

    return this.gettingWaybillId();
  }

  getContract(contractType, customerId) {

    this.$bookingInfo.getContractByContractTypANDMsaId(contractType, customerId, this.headerData).subscribe(resp => {

      console.log(resp);
      if (resp.length == 1) {
        this.bookingInfoObj.sfxPrcContractcode = resp[0].cntrCode;
        if (this.isCreditCheck == true) {
          this.contractOption = 1;
          this.selectedValue = 'SFX';
        } else {
          this.contractOption = 2;
          this.selectedValue = 'PRC';
        }
        return this.searchSafexId(this.bookingInfoObj.sfxPrcContractcode);
      } else if (resp.length > 1) {
        this.openContractModal(contractType, resp, 'MULTI-CONTRACT');
      }
      else {
        this.spinner.hide();
        this.appComp.showMessage(`Search MSA have no contract code !`, 'danger')
      }
    });
  }

  openContractModal(contractType, listOfMsaNameORContractCode, type) {

    console.log(listOfMsaNameORContractCode);
    if (this.isCreditCheck == true) {
      this.contract = 'CREDIT';
    } else {
      this.contract = "PRC"
    }
    let data = {
      msaName: listOfMsaNameORContractCode,
      contractType: this.contract,
      type: type
    }
    const dialogRefConfirm = this.dialog.open(SearchCustomerComponent, {
      width: '300px',
      panelClass: 'mat-dialog-responsive',
      // data:{ previousData : this.customerArray, oldData : this.oldCustomerDeductions},
      disableClose: true,
      backdropClass: 'backdropBackground',
      data: data,
    });

    dialogRefConfirm.afterClosed().subscribe(data => {

      console.log(data);
      if (data === true) {
        return;
      }
      if (data !== undefined) {
        this.bookingInfoObj.sfxPrcContractcode = data;
        this.spinner.hide();
        if (this.isCreditCheck == true) {
          this.contractOption = 1;
          this.selectedValue = 'SFX';
        } else {
          this.contractOption = 2;
          this.selectedValue = 'PRC';
        }
        this.searchSafexId(this.bookingInfoObj.sfxPrcContractcode);
        this.customerArray = data;
        console.log('after close model', this.customerArray);
        // this.CustomerDatasource = new MatTableDataSource<any>(this.customerArray);
      }
    })
  }

  checkMsaAndCotractIsSingle(msaName): void {

    if (this.isCreditCheck) {
      this.contractType = "CREDIT";
    } else {
      this.contractType = "PRC";
    }
    this.$bookingInfo.msaDetailByMsaName(msaName, this.headerData, this.contractType, this.branchId).subscribe(resp => {

      if (resp.length == 1) {
        console.log(resp[0].id);
        this.getContract(this.contractType, resp[0].id);
      } else if (resp.length > 1) {
        this.openContractModal(this.contractType, resp, 'MULTI-MSA')
      } else {
        this.spinner.hide();
        this.appComp.showMessage(`MSA Name Not Found !`, 'danger')
      }
    });
  }
  editing = false;
  enabledField() {
    this.fieldsetDisabled = false;
    this.editing = true;
    this.isExpand = true;
  }
  calculateWaybill() {
    var generate = {
      waybillId: this.bookingInfoObj.waybillId,
    };
    this.$bookingInfo.calculateWaybillApi(generate, this.headerData2).subscribe((response) => {
      if (response) {
        // this.spinner.hide();
        this.fieldsetDisabled = true;
        this.isFrieghtExpand = true;
        // this.spinner.hide();
        this.updateNewWaybill(this.bookingInfoObj.waybillId);
        this.updateStatus();
        this.gettingWaybillNumberById();
        return this.getFreightCharges();
      }
    }, err => {
      this.spinner.hide();
    });
  }
  updateNewWaybill(id) {
    this.spinner.show();
    if (!this.reqNo) {
      this.reqNo = sessionStorage.getItem('rebookReqNo');
    }
    const body = {
      newWaybillId: Number(id),
      requestNumber: Number(this.reqNo)
    }
    this.$bookingInfo.updateReqNo(body, this.headerData2).subscribe((res: any) => {
      this.spinner.hide();
    }, (err: any) => {
      this.spinner.hide();
    })
  }

  updateStatus() {
    console.log('update status');
    this.spinner.show();
    const status = this.allLookUps.find(elem => elem.lookupTypeVal.trim() == "WAYBILL_STATUS" &&
      elem.lookupVal.trim() === 'RE-ROUTED');
    const body = {
      reRoutingFlag: 1,
      waybillNumber: this.oldWaybillId,
      waybillStatus: status.id
    }
    this.ugdservice.updateWaybillStatus(body).subscribe((res: any) => {
      // this.router.navigate(['/bookings-web-booking/re-booking']);
      this.oldWaybillStatus = status.id
      this.spinner.hide();

    }, (err: any) => {
      this.spinner.hide()
    })
  }


  generateWayBill(type = null) {

    if (!this.bookingInfoObj.deliveryGatewayBranchId) {
      this.appComp.showMessage(
        `  Delivery Gateway Branch Is Required For The Booking , Please Contact Administrator !`, 'danger'
      );
      return;
    }
    this.spinner.show();
    var generate = {
      waybillId: this.bookingInfoObj.waybillId,
      waybillNumber: this.bookingInfoObj.waybillNumber,
    };
    if (type) {
      this.saveType = type;
    }


    this.$bookingInfo.generateBooking(generate, this.headerData).subscribe((response) => {
      if (response) {
        this.updateRequestStatus();
        // this.spinner.hide();
        if (this.saveType == 'create') {
          this.successMsg = true;
          sessionStorage.removeItem("waybillId");
          this.isFrieghtExpand = true;
          // this.spinner.hide();
          return this.getFreightCharges();
        }
        else if (this.saveType == 'generateCreate') {
          this.appComp.showMessage(
            `  Waybill generated successfully ${this.bookingInfoObj.waybillNumber}`
          );

          this.bookingInfoForm.resetForm();
          this.bookingInfoObj = {
            ewaybillAvailableFlag: 1,
            dodDaccFlag: 0,
            invoiceList: [],
            packageList: [],
          };
          this.toBranchName = '';
          this.selectedpincodeBranch = '';
          this.invoiceCost = 0;
          this.totalWayBill = 0;
          this.RateCardList = [];
          this.serviceOfferingList = [];
          this.selectedProductCategoryCardList = [];
          this.commercialTypeList = [];
          this.consignerList = [];
          this.consigneeList = [];
          this.isPackaging = false;
          this.isExpand = true;
          this.MopName = "";
          this.serviceOfferingName = "";
          if (sessionStorage.getItem("waybillId")) {
            sessionStorage.removeItem("waybillId");
          }
          this.selectedProduct = [];

          this.ngOnInit();

          this.bookingInfoObj.ewaybillAvailableFlag = 1;
          this.bookingInfoObj.ncvFlag = 0;
          this.bookingInfoObj.hubDeliveryFlag = 0;
          this.searchConsignee.pincode = '';
          this.bookingInfoObj.dodDaccFlag = 0;
          this.reCalculate = false;
          this.fieldsetDisabled = false;
          // this.localBookingObj.pickupDate=
          // moment(this.todayDate).format("YYYY-MM-DD");
          this.pdcList.forEach(elem => {
            if (elem.id == 1) {
              elem.checked = false;
            }
            else {
              elem.checked = true;
            }
          })

          this.hubflagList.forEach(elem => {
            if (elem.id == 1) {
              elem.checked = false;
            }
            else {
              elem.checked = true;
            }
          })
          this.ewaybillflagList = [
            { "name": "Yes", id: 1, "checked": true },
            { "name": "No", id: 0, "checked": false }
          ]

        }

        // this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
    });
  }

  oldWaybillStatus;
  gettingWaybillDetailsById(id) {

    this.$bookingInfo
      .getWaybillDetails(id)
      .subscribe((Response) => {
        if (Response) {
          console.log('responseeeeeeeeeeeeeeeeee ******************', Response);
          this.oldWaybillId = Response.waybillNumber;
          this.oldWaybillStatus = Response.wayblCurrStatusLookupId;
          this.oldOfferingId = Response.serviceOfferingId;
          this.initialEditWaybillDetails();

          this.spinner.hide();
        }
      }, err => {
        this.spinner.hide();
      });
  }


  gettingWaybillNumberById() {

    this.$bookingInfo
      .getWaybillDetails(this.bookingInfoObj.waybillId)
      .subscribe((Response) => {
        if (Response) {
          this.bookingInfoObj.waybillNumber = Response.waybillNumber;
          if (Response.deliveryGatewayBranchId) {
            this.bookingInfoObj.deliveryGatewayBranchId = Response.deliveryGatewayBranchId;
          }
          if (Response.chargeWeight) {
            this.bookingInfoObj.chargeWeight = Response.chargeWeight;
          }
          if (Response.invoiceList) {
            this.bookingInfoObj.invoiceList = [...Response.invoiceList];
          }
          if (Response.deliveryGatewayBranchName) {
            this.bookingInfoObj.deliveryGatewayBranchName = Response.deliveryGatewayBranchName;
          }

          this.IsCrate = false;
          // this.appComp.showMessage(
          //   `${this.waybillNumber} Request to Create waybill successfully processed`
          // );
          this.spinner.hide();
        }
      }, err => {
        this.spinner.hide();
      });
  }


  gettingWaybillId() {
    this.spinner.show();


    if (this.localBookingObj.pickupDate) {
      this.bookingInfoObj.pickupDate = this.localBookingObj.pickupDate;
      this.bookingInfoObj.pickupDate = moment(
        this.bookingInfoObj.pickupDate
      ).format("YYYY-MM-DD 14:40:56");
    }

    if (this.localBookingObj.shipmentDate) {
      this.bookingInfoObj.shipmentDate = this.localBookingObj.shipmentDate;
      this.bookingInfoObj.shipmentDate = moment(
        this.bookingInfoObj.shipmentDate
      ).format("YYYY-MM-DD 14:40:56");
    }
    if (this.bookingInfoObj.pdcDate) {
      this.bookingInfoObj.pdcDate = moment(this.bookingInfoObj.pdcDate).format(
        "YYYY-MM-DD"
      );
    }

    this.bookingInfoObj.bookingBranchId = JSON.parse(
      sessionStorage.getItem("branchId")
    );
    this.bookingInfoObj.discountPercentage = this.percentage
    this.$bookingInfo.saveBooking(this.bookingInfoObj).subscribe((response) => {
      if (response) {
        this.bookingInfoObj.waybillId = response;
        console.log(this.bookingInfoObj.waybillId);
        this.discountClosebtn = true;
        // this.bookingInfoObj.invoiceList.forEach(element => {
        //     element.waybillId = this.bookingInfoObj.waybillId;
        //     element.ewaybillInvoiceDetail.waybillId = this.bookingInfoObj.waybillId;
        // });
        this.bookingInfoList = response;
        return this.calculateWaybill();
      }
    }, err => {
      this.spinner.hide();
    });
  }
  invoiceDetailsChecked(line, event) {

    if (event.checked) {
      delete this.bookingInfoObj.invoiceList;
      this.bookingInfoObj.ncvFlag = 1;
      this.isHideNcv = false;
    } else {
      this.bookingInfoObj.invoiceList = [];
      this.bookingInfoObj.invoiceList.push({
        invoiceNumber: "",
        invoiceDate: "",
        invoiceAmount: "",
        status: 1
      });
      this.bookingInfoObj.ncvFlag = 0;
      this.isHideNcv = true;
    }
  }


  oldWaybillId;
  // oldWaybillStatus;
  getAllLoad() {

    this.$bookingInfo.getLoad(this.branchId).subscribe((Response) => {
      if (Response) {
        this.allLookupList = Response;

        this.dodTypeList = [];
        // console.log(this.allLookupList);
        this.allLookupList.forEach((element) => {

          if (element.lookupVal.trim() == 'WEB') {
            this.bookingInfoObj.lkpChannelId = element.id;
          }
          if (element.lookupVal.trim() == 'DIRECT_BOOKING' && element.lookupTypeVal.trim() == 'BOOKING_REQUEST_TYPE') {
            this.bookingInfoObj.lkpBookingRequestTypeId = element.id;
          }
          if (element.lookupTypeVal.trim() == "DOD_INSTRUMENT_TYPE") {
            this.dodTypeList.push(element);
          }
          if (
            element.lookupTypeVal.trim() == "RATE_CARD_TYPE" &&
            element.lookupVal.trim() == "RETAIL"
          ) {
            this.bookingInfoObj.rateCardTypeLookupId = element.id;
          }

          if (element.lookupTypeVal.trim() == 'CONSIGN_TYPE' && element.lookupVal.trim() == 'CONSIGNEE') {
            this.consigneeTypeId = element.id;
          }
          if (element.lookupTypeVal.trim() == 'CONSIGN_TYPE' && element.lookupVal.trim() == 'CONSIGNOR') {
            this.consignorTypeId = element.id;
          }
          if (element.lookupTypeVal.trim() == 'CONSIGN_TYPE' && element.lookupVal.trim() == 'BOTH') {
            this.ConrConeeTypeId = element.id;
          }
        });
        console.log(this.bookingInfoObj.lkpChannelId);
        this.dodTypeList = this.dodTypeList.sort((a, b) => a.id - b.id);
        this.dodTypeList = [...this.dodTypeList];
      }
      if (sessionStorage.getItem("waybillId")) {
        console.log('this.getwaybilldetails')
        const waybillId = sessionStorage.getItem("oldWaybillId");
        if (waybillId) {
          this.gettingWaybillDetailsById(waybillId);
        }
        // this.oldWaybillStatus = sessionStorage.getItem("oldWaybillStatus");
      }
      else {
        this.localBookingObj.pickupDate = new Date();
        this.localBookingObj.shipmentDate = new Date()

      }
    }, (err: any) => {
      this.spinner.hide();
    });
  }

  // checkPaid(){
  //   this.commonService.getAllLookups().subscribe((res: any) => {
  //     console.log('res getalllookups', res);
  //     this.allLookUps = res;
  //     if (this.refType(Number(this.requestedMop))) {

  //     }
  //   }, (err: any) => {

  //   })
  // }

  isFullyRebooked = false;
  isInvoiceDisabled = false;
  chargeWeight = null;
  isActualWeightDisabled = false;
  oldOfferingId;

  initialEditWaybillDetails() {
    try {
      let wayBillId;
      const newWaybill = sessionStorage.getItem('newWaybill');
      if (newWaybill) {
        wayBillId = sessionStorage.getItem("newWaybill");
      } else {
        wayBillId = sessionStorage.getItem("waybillId");
      }
      console.log('waybillllllll Idddddddd', wayBillId);
      this.$bookingInfo
        .getWaybillDetailByWaybillId(wayBillId, this.headerData)
        .subscribe((response) => {
          // console.log('initialEditWaybillDetails', response);

          if (response) {
            this.bookingInfoObj = response;
            this.bookingInfoObj.chargeWeight = null;

            // if (this.bookingInfoObj.ewaybillAvailableFlag) {
            //   this.bookingInfoObj.invoiceList = [];
            // }
            // deleting exsisting id from invoice and package details
            if (this.bookingInfoObj.invoiceList && this.bookingInfoObj.invoiceList.length) {
              for (let invoice of this.bookingInfoObj.invoiceList) {
                delete invoice.invoiceId
              }
            }
            if (this.bookingInfoObj.packageList && this.bookingInfoObj.packageList.length) {
              for (let packageList of this.bookingInfoObj.packageList) {
                delete packageList.packageDetailsId
              }
            }
            //finished here
            this.bookingInfoObj.branchMOPLookupId = Number(this.requestedMop);
            if (this.refType(Number(this.requestedMop)) === 'PAID') {
              this.bookingInfoObj.branchMOPLookupId = 90;
              this.bookingInfoObj.custTypeLookupId = 49;
            }
            // converting mop for inbound of to-pay type initiated from direct booking
            const bookingType = this.allLookupList.find(elem => elem.lookupTypeVal.trim() == "BOOKING_REQUEST_TYPE" &&
              this.bookingInfoObj.lkpBookingRequestTypeId == elem.id);
            const mop = this.allLookupList.find(elem => elem.lookupTypeVal.trim() == "BRANCH_MOP" &&
              this.bookingInfoObj.branchMOPLookupId == elem.id);
            const inbound = this.allLookupList.find(elem => elem.lookupTypeVal.trim() == "BIZ_TYPE" &&
              this.bookingInfoObj.businessTypeLookupId == elem.id);
            if (bookingType.lookupVal === 'DIRECT_BOOKING' && mop.lookupVal.trim() == 'TO-PAY' && inbound.lookupVal.trim() == 'INBOUND') {
              const type = this.allLookupList.find(elem => elem.lookupTypeVal.trim() == "RATE_CARD_TYPE" &&
                this.bookingInfoObj.rateCardTypeLookupId == elem.id);
              if (type.lookupVal.trim() == 'CREDIT') {
                const credit = this.allLookupList.find(elem => elem.lookupTypeVal.trim() == "BRANCH_MOP" &&
                  elem.lookupVal.trim() == 'CREDIT');
                const prc = this.allLookupList.find(elem => elem.lookupTypeVal.trim() == "CUST_TYPE" &&
                  elem.lookupVal.trim() == 'CREDIT');
                this.bookingInfoObj.branchMOPLookupId = credit.id;
                this.bookingInfoObj.custTypeLookupId = prc.id;
              }
            }
            // finished here
            // console.log('Number(this.requestedMop)', Number(this.requestedMop));
            if (!newWaybill) {
              delete this.bookingInfoObj.deliveryGatewayBranchName;
              delete this.bookingInfoObj.deliveryGatewayBranchId;
              this.bookingInfoObj.waybillNumber = '';
            }

            const pin = sessionStorage.getItem('pinId');
            console.log('*************** pinnnnnnnn ####################', pin);
            if (pin) {
              if (!newWaybill) {
                this.bookingInfoObj.consigneeId = null;
              }
              this.bookingInfoObj.destPincodeId = pin;
            }
            // delete this.bookingInfoObj.waybillId
            // const consignor = this.bookingInfoObj.consignorId;
            // const consignee = this.bookingInfoObj.consigneeId;
            // this.bookingInfoObj.consignorId = consignee;
            // this.bookingInfoObj.consigneeId = consignor;
            // console.log('this.totalPackages', this.totalPackages);
            // console.log('this.bookingInfoObj.totalPackageCount', this.bookingInfoObj.totalPackageCount);
            const updatedOffering = sessionStorage.getItem('updatedServiceOffering');

            if ((Number(this.totalPackages) === Number(this.bookingInfoObj.totalPackageCount)) && (Number(updatedOffering) === Number(this.bookingInfoObj.serviceOfferingId))) {
              // this.fieldsetDisabled = true;
              this.isFullyRebooked = true;
              this.isInvoiceDisabled = true;
            } else {
              if (Number(updatedOffering) !== Number(this.bookingInfoObj.serviceOfferingId) && !this.bookingInfoObj.msaCustId) {
                console.log('inside offering check ###################')
                this.bookingInfoObj.rateCardId = undefined;
                this.bookingInfoObj.commercialId = undefined;
              }
            }
            // else {
            //   if (Number(updatedOffering) !== Number(this.bookingInfoObj.serviceOfferingId)) {
            //     console.log('inside offering check ###################')
            //     if (!newWaybill) {
            //       this.bookingInfoObj.rateCardId = null;
            //       this.bookingInfoObj.commercialId = null;
            //     }
            //   }
            // }
            if (newWaybill) {
              if ((Number(this.totalPackages) === Number(this.bookingInfoObj.totalPackageCount)) && this.oldOfferingId === Number(this.bookingInfoObj.serviceOfferingId)) {
                this.isFullyRebooked = true;
                this.isInvoiceDisabled = true;
              } else {
                this.isFullyRebooked = false;
                this.isInvoiceDisabled = false;
              }
            }
            if (Number(this.totalPackages) === Number(this.bookingInfoObj.totalPackageCount)) {
              console.log('inside total packages change')
              this.isActualWeightDisabled = true;
            }
            this.checkBookingMannualOrAuto();

            // this.bookingInfoObj.hubDeliveryFlag = 0;
            if (updatedOffering) {
              this.bookingInfoObj.serviceOfferingId = Number(updatedOffering);
            }
            if (this.bookingInfoObj.consigneeId) {
              this.getConsigneeDetailByid(this.bookingInfoObj.consigneeId);
            }
            if (this.bookingInfoObj.consignorId) {
              this.getConsignorDetailByid(this.bookingInfoObj.consignorId);
            }

            this.editScreen = true;
            this.selectedType = 1;
            this.selectedValue = 'PRC';
            // this.bookingInfoObj.branchMOPLookupId = response.branchMOPLookupId;
            if (this.bookingInfoObj.waybillId) {
              let mopDetails = this.mopList.find(elem => elem.branchMOPLookupId == this.bookingInfoObj.branchMOPLookupId)
              if (mopDetails) {
                this.selectedMopName = mopDetails.branchMOPValue;
              }
            }
            this.isCreditCheck = false;
            this.contractOption = 2;
            let business_type = {} as any;
            let isRetailCheck = 0;
            business_type = this.allLookupList.find(elem => elem.lookupTypeVal.trim() == "BIZ_TYPE" &&
              this.bookingInfoObj.businessTypeLookupId == elem.id);
            this.allLookupList.forEach((elem) => {
              if (elem.lookupVal.trim() == "CREDIT" &&
                this.bookingInfoObj.custTypeLookupId == elem.id) {
                this.isCreditCheck = true;
                this.contractOption = 1;
                this.selectedValue = 'SFX';
                this.MopName = 'CREDIT';
                this.contractType = "CREDIT";
              }
              if (this.bookingInfoObj.rateCardTypeLookupId == elem.id && elem.lookupVal.trim() == 'RETAIL') {
                isRetailCheck = 1;
              }
            });
            console.log(isRetailCheck, 'redsdf')
            if (isRetailCheck == 1) {
              this.getSfxonMop(this.bookingInfoObj.branchMOPLookupId);
              this.MopName = 'RETAIL';
              if (!newWaybill) {
                if (Number(this.bookingInfoObj.serviceOfferingId) !== Number(this.oldOfferingId)) {
                  this.getProductCategoryIdWithoutRateCardOfferingChange()
                } else {
                  this.getProductCategoryIdWithoutRateCard();
                }
              } else {
                this.getProductCategoryIdWithoutRateCard();
              }
            }
            this.pdcList.forEach(elem => {
              if (elem.id == this.bookingInfoObj.dodDaccFlag) {
                elem.checked = true;
              }
              else {
                elem.checked = false;
              }
            })

            if (this.bookingInfoObj.sfxPrcContractcode) {
              if (this.bookingInfoObj.msaCustId) {
                this.searchSafexId(this.bookingInfoObj.sfxPrcContractcode);
              }
            }
            // this.getAllConsigneerExistingWithoutRateCard();
            // this.getExistingConsignee();

            if (this.bookingInfoObj.packageList != undefined) {
              if (this.bookingInfoObj.packageList.length) {
                this.bookingInfoObj.packageList.forEach(elem => {
                  if (elem.productId) {
                    this.isPeaceType = true;
                    this.getproductByproductCateId(elem.productCategoryId);
                  }
                })
              }
            }


            if (this.bookingInfoObj.hubDeliveryBranchId) {
              this.getBranchHub(this.bookingInfoObj.hubDeliveryBranchId);
            }
            // this.bookingInfoObj.destPincodeId = this.consignorDetails.addrBook.pincodeId;
            this.getpincodeDetailsById(this.bookingInfoObj.destPincodeId);
            // this.getpincodeDetailsById(this.consignorDetails.addrBook.pincodeId);


            this.spinner.hide();
            if (this.bookingInfoObj.pickupDate) {
              this.localBookingObj.pickupDate = moment(
                this.bookingInfoObj.pickupDate
              ).format("YYYY-MM-DD");
            }

            if (this.bookingInfoObj.shipmentDate) {
              this.localBookingObj.shipmentDate = moment(
                this.bookingInfoObj.shipmentDate
              ).format("YYYY-MM-DD");
            }
            if (this.bookingInfoObj.pdcDate) {
              this.bookingInfoObj.pdcDate = moment(
                this.bookingInfoObj.pdcDate
              ).format("YYYY-MM-DD");
            }
            if (this.bookingInfoObj.packageList != undefined) {
              this.bookingInfoObj.packageList = [
                ...this.bookingInfoObj.packageList,
              ];
            }
            if (this.bookingInfoObj.consigneeId) {
              // this.consigneeData(this.bookingInfoObj.consigneeId);
            }
            if (this.totalPackages) {
              this.bookingInfoObj.totalPackageCount = this.totalPackages;
            }

            this.localWaybillList = this.bookingInfoObj.invoiceList;
            // this.waybillList = this.bookingInfoObj.invoiceList;
            if (this.bookingInfoObj.invoiceList != undefined) {
              if (this.bookingInfoObj.invoiceList) {
                this.totalWayBill = this.bookingInfoObj.invoiceList.length;
                this.invoiceCost = 0;
                // this.getProductCategoriBycommercialCatId(this.bookingInfoObj.commercialId);
                this.bookingInfoObj.invoiceList.forEach((elem) => {
                  this.invoiceCost =
                    this.invoiceCost + parseInt(elem.invoiceAmount);
                });
              }
            }
            this.bookingInfoObj.dodDaccFlag = 0
            this.getExisting()
            this.spinner.hide();
          } else {
            this.spinner.hide();
          }

        });
    } catch (error) {
      this.spinner.hide();
    }
  }
  packagingTabOpen(id = null, type = null) {

    if (type == 'consignee') {
      this.bookingInfoObj.consigneeId = id;
    }
    if (type == 'consignor') {
      this.bookingInfoObj.consignorId = id;
    }
    if (this.bookingInfoObj.consigneeId && this.bookingInfoObj.consignorId) {
      this.consignerisExpand = false;
      this.onScreenHeader('isPackaging');
    }
    // if(this.bookingInfoObj.consigneeId && this.bookingInfoObj.consignorId && this.bookingInfoObj.waybillId && this.editScreen){
    //   this.isPackaging = true;
    //   this.consignerisExpand=false;
    // }
  }
  getMopByBranch() {

    // this.spinner.show();
    this.$bookingInfo.getBranchMop(this.branchId).subscribe((Response) => {

      if (Response) {
        this.mopList = Response;
        this.mopList.forEach((element) => {
          if (element.branchMOPValue.trim() == "CREDIT") {
            this.bookingInfoObj.branchMOPLookupId = element.branchMOPLookupId;
            this.isCreditCheck = true;
            this.contractType = element.branchMOPValue;
            this.MopName = "CREDIT";
            this.contractOption = 3;
            this.serviceOfferingList = [];
          }
          //       else{
          //         var str = element.branchMOPValue;
          //         var res1 = str.toLowerCase();
          // var res2= "Flag";
          // var res3 = res1.concat(res2.toString());
          //  element.flagName=res3;
          //       }
        });
        if (this.bookingInfoObj.waybillId) {
          let mopDetails = this.mopList.find(elem => elem.branchMOPLookupId == this.bookingInfoObj.branchMOPLookupId)
          this.selectedMopName = mopDetails.branchMOPValue;

        }
        if (this.isCreditCheck == false) {
          this.getServiceOffering();
        }
        if (!sessionStorage.getItem("waybillId")) {
          this.spinner.hide();
        }

      }
    });
  }

  RefreshOnChange(type = null) {

    if (this.fieldsetDisabled == false) {
      var str = new String(this.bookingInfoObj.sfxPrcContractcode);
      if (type == 1) {
        this.bookingInfoObj.businessTypeLookupId = '';
        this.bookingInfoObj.sfxPrcContractcode = "";
        this.bookingInfoObj.rateCardId = '';
        this.bookingInfoObj.commercialId = '';
      }
      if (type == 2 || type == 1) {
        // this.bookingInfoObj.serviceOfferingId = '';
        this.consigneeList = [];
        this.LocalconsigneeList = [];
      }
      if (type == 2) {
        if (str.length < 10) {
          this.serviceOfferingList = [];
          this.allLookupList.forEach((elem) => {
            if (
              elem.lookupVal.trim() == "RETAIL" &&
              elem.lookupTypeVal.trim() == "RATE_CARD_TYPE"
            ) {
              this.bookingInfoObj.rateCardTypeLookupId = elem.id;
            }
          });
          if (this.MopName != 'CREDIT') {
            this.getServiceOffering();
          }

        }
      }
      if (type == 3 || type == 1 || type == 2) {
        this.RateCardList = [];
      }
      if (type == 4 || type == 3 || type == 2 || type == 1) {
        this.commercialTypeList = [];
      }
      this.editScreen = false;
      this.isPeaceType = false;
      // this.bookingInfoObj.consignorId = '';
      // this.bookingInfoObj.consigneeId = '';
      // this.bookingInfoObj.packageList = [];
      // this.selectedInboundPackageType = false;
      // this.selectedProductCategoryCardList = [];
      // this.selectedProductCategoryList = [];
      // this.selectedProduct = [];
      // this.bookingInfoObj.actualWeight = '';
      // this.packageTypeId = '';
      // this.bookingInfoObj.pkgSaidToContain = '';
      // this.bookingInfoObj.totalPackageCount = '';
      this.bookingInfoObj.chargeWeight = null;
    }
  }
  getSfxonMop(mopId) {

    this.isCreditCheck = false;
    this.sfxCode = "";
    this.sfxObj = {};
    this.serviceOfferingName = '';
    this.MopName = "RETAIL";
    this.serviceOfferingList = [];

    this.mopList.forEach((elem) => {
      if (elem.branchMOPLookupId == mopId) {
        if (elem.branchMOPValue.trim() == "CREDIT") {
          this.isCreditCheck = true;
          this.MopName = elem.branchMOPValue;
          this.contractOption = 3;
          this.selectedValue = 'MSA';
          this.consignerList = [];
          this.consigneeList = [];
        }
        else {

          if (this.editScreen == false) {
            this.contractOption = 3;
            this.selectedValue = 'MSA';
          }
          this.allLookupList.forEach(elem => {
            if (
              elem.lookupTypeVal.trim() == "RATE_CARD_TYPE" &&
              elem.lookupVal.trim() == "RETAIL"
            ) {
              this.bookingInfoObj.rateCardTypeLookupId = elem.id;
            }
          })

          this.getServiceOffering();
          // this.getAllConsigneerExistingWithoutRateCard();
          // this.getExistingConsignee();
        }
        this.selectedMopName = elem.branchMOPValue;
      }

      this.contractType = "RETAIL";
    });

    this.allLookupList.forEach((elem) => {
      if (
        elem.lookupTypeVal.trim() == "RATE_CARD_TYPE" &&
        elem.lookupVal.trim() == "RETAIL"
      ) {
        this.bookingInfoObj.rateCardTypeLookupId = elem.id;
      }
      if (
        this.MopName.trim() == "RETAIL" &&
        elem.lookupVal.trim() == "CREDIT+RETAIL" &&
        elem.lookupTypeVal.trim() == "CUST_TYPE"
      ) {
        this.bookingInfoObj.custTypeLookupId = elem.id;
      }
    });
  }
  checkMopRateCardAvailable(TotalRateCard) {

    if (this.editScreen == false) {
      var paidToPayAvailable = 0;
      var PaidAvailable = 0;
      var toPayAvailable = 0;
      TotalRateCard.forEach(elem => {
        if (elem.paidFlag == 1 && elem.toPayFlag == 1) {
          paidToPayAvailable = 1;
        }
        if (elem.paidFlag == 1) {
          PaidAvailable = 1;
        }
        if (elem.toPayFlag == 1) {
          toPayAvailable = 1;
        }
      })
      if (paidToPayAvailable == 1) {
        return;
      }


      if (PaidAvailable == 1 && this.selectedMopName == 'TO-PAY' && toPayAvailable == 0) {
        return this.openModeOfPaymentModel(1);
      }
      if (PaidAvailable == 0 && this.selectedMopName == 'PAID' && toPayAvailable == 1) {
        return this.openModeOfPaymentModel(2);
      }
    }
  }
  openModeOfPaymentModel(type) {
    let data = {
      'selectedMop': this.selectedMopName
    }
    var dialog = this.dialog.open(ModeOfPaymentValidateComponent, {
      width: '50rem',
      data: data,
      panelClass: "bookingDialog"
    });
    dialog.afterClosed().subscribe((response) => {

      if (response === true) {
        this.sfxObj.rateCardApplicableFlag = 0;
        if (this.sfxObj.rateCardApplicableFlag == 0) {
          this.getAllConsigneeWithoutRateCard();
          this.getAllConsigneerWithoutRateCard();
          this.getServiceOffering();
          this.getAlProductcategory();
          this.getpackageList();
          this.selectedType = 1;
          this.allLookupList.forEach((elem) => {
            if (
              elem.lookupVal.trim() == "RETAIL" &&
              elem.lookupTypeVal.trim() == "RATE_CARD_TYPE"
            ) {
              this.bookingInfoObj.rateCardTypeLookupId = elem.id;
            }
          });
          this.bookingInfoObj.msaCustId = '';
        } return;
      }
      if (response == 1) {
        if (type == 1) {
          let toPay = this.mopList.find(elem => elem.branchMOPValue == 'PAID')
          this.bookingInfoObj.branchMOPLookupId = toPay.branchMOPLookupId;
          this.selectedMopName = toPay.branchMOPValue;
          console.log(this.selectedMopName);
          return this.getServiceOfferingBySafexId(this.sfxObj.id);;
        }
        if (type == 2 && response != true) {
          let paid = this.mopList.find(elem => elem.branchMOPValue == 'TO-PAY')
          this.bookingInfoObj.branchMOPLookupId = paid.branchMOPLookupId;
          this.selectedMopName = paid.branchMOPValue;
          console.log(this.selectedMopName);
          return this.getServiceOfferingBySafexId(this.sfxObj.id);
        }
      }
    });
  }
  getRateCardBySafexId() {
    console.log('getRateCardBySafexId');
    this.$bookingInfo
      .gettingRatecardByContract(this.bookingInfoObj.sfxPrcContractcode, this.contractType, this.headerData2)
      .subscribe((response) => {
        if (response) {
          var TotalRateCard = [];
          var isPrcRateCard = [];
          this.RateCardList = [];
          this.commercialTypeList = [];
          this.bookingInfoObj.businessTypeLookupId = this.sfxObj.lkpBizTypeId;
          TotalRateCard = response;

          if (this.isCreditCheck == false) {
            isPrcRateCard = response.filter(elem =>
              (this.selectedMopName.trim() == 'PAID' && elem.paidFlag == 1) || (this.selectedMopName.trim() == 'TO-PAY') || (this.selectedMopName.trim() == 'FOC'))
            // isPrcRateCard= response.filter(elem => this.mopList.findIndex(elm => (this.bookingInfoObj.branchMOPLookupId==elm.branchMOPLookupId && elem.paidFlag==1) || (this.bookingInfoObj.branchMOPLookupId==elm.branchMOPLookupId && elem.toPayFlag==1) || ( this.bookingInfoObj.branchMOPLookupId==elm.branchMOPLookupId && elem.focFlag==1 )) != -1);

            if (isPrcRateCard.length) {
              TotalRateCard = [...isPrcRateCard];
            }
            else {
              this.checkMopRateCardAvailable(TotalRateCard);
              // this.bookingInfoObj.serviceOfferingId = '';
              this.serviceOfferingList = [];
              TotalRateCard = [];
            }
          }

          if (this.bookingInfoObj.serviceOfferingId && this.bookingInfoObj.waybillId) {
            var contract = this.serviceOfferingReferenceList.find(
              (elem) =>
                elem.serviceOfferingId == this.bookingInfoObj.serviceOfferingId
            );
            if (contract) {
              TotalRateCard.forEach((elem) => {
                if (contract.id == elem.offeringId) {
                  this.RateCardList.push(elem);
                }
              });
            }

          }
          else {
            let abc = [];
            var unique = [];
            for (let i = 0; i < TotalRateCard.length; i++) {
              if (!unique[TotalRateCard[i].offeringId]) {
                abc.push({ offering: TotalRateCard[i].offeringId });
                unique[TotalRateCard[i].offeringId] = 1;
              }
            }
            let isPresent = [];
            this.serviceOfferingReferenceList.forEach((elem) => {
              abc.forEach((elm) => {
                if (elm.offering == elem.id) {
                  isPresent.push(elem);
                }
              });
            });
            this.serviceOfferingReferenceList = [...isPresent];
            //  let contract1=[];
            //   isPresent.forEach((elm) => {
            //   this.serviceOfferingList.forEach((elem) => {
            //       if (elm.serviceOfferingId == elem.id) {
            //         contract1.push(elem);
            //         contract1=[...contract];
            //       }
            //     });
            //   });

            var contract1 = this.serviceOfferingList.filter(elem => isPresent.findIndex(elm => elm.serviceOfferingId == elem.id) != -1);
            console.log(contract1);

            this.serviceOfferingList = [...contract1];
            if (!this.bookingInfoObj.serviceOfferingId) {
              this.serviceOfferingList.forEach((elem) => {
                if (elem.value == "SURFACE") {
                  this.bookingInfoObj.serviceOfferingId = elem.id;
                }
                this.serviceOfferingName = 'SURFACE';
              });
            }
          }

          if (this.serviceOfferingList.length == 1) {
            this.bookingInfoObj.serviceOfferingId = this.serviceOfferingList[0].id;
          }
          if (!this.bookingInfoObj.waybillId) {
            var contractId = this.serviceOfferingReferenceList.filter(
              (elem) =>
                elem.serviceOfferingId == this.bookingInfoObj.serviceOfferingId
            );
            if (contractId.length) {
              TotalRateCard.forEach((elem) => {
                if (contractId) {
                  if (contractId[0].id == elem.offeringId) {
                    this.RateCardList.push(elem);
                  }
                }
              });
            }
          }
          if (this.sfxObj.msaCustId) {
            this.bookingInfoObj.msaCustId = this.sfxObj.msaCustId;
          }
          if (this.bookingInfoObj.waybillId && this.bookingInfoObj.rateCardId) {
            return this.getCommercialByRateCard(this.bookingInfoObj.rateCardId);
          }
          if (this.RateCardList.length == 1) {
            this.getCommercialByRateCard(this.RateCardList[0].id);
          }
        }
      }, err => {
        console.log('here getting list empty')
        this.serviceOfferingList = [];
      });
  }
  searchSafexId(sfxId) {

    if (this.selectedValue == "SFX" || this.selectedValue == "PRC") {
      let strlength = sfxId.length;
      if (strlength > 2 && sfxId) {
        this.spinner.show();
        this.isDisabled = true;
        this.RateCardList = [];
        this.commercialTypeList = [];
        if (this.isCreditCheck) {
          this.contractType = "CREDIT";
        } else {
          this.contractType = "PRC";
        }
        this.sfxCode = sfxId;
        console.log('here giving issue');
        console.log('this.refType(this.bookingInfoObj.businessTypeLookupId)', this.refType(this.bookingInfoObj.businessTypeLookupId));
        console.log('contract type', this.contractType);
        // if ((this.refType(this.bookingInfoObj.businessTypeLookupId) === 'ANYWHERE TO ANYWHERE') && this.contractType === 'PRC') {
        //   console.log('inside condition')
        //   this.getServiceOfferingName(this.bookingInfoObj.serviceOfferingId);
        // } else {
        this.$bookingInfo.getSfxCode(sfxId, this.contractType, this.headerData).subscribe(
          (response) => {
            if (response) {
              this.isDisabled = false;
              this.sfxObj = response;
              this.bookingInfoObj.prcCntrId = this.sfxObj.id;

              var isInbound = this.allLookupList.find(elem => elem.lookupTypeVal.trim() == 'BIZ_TYPE' && elem.lookupVal.trim() == 'INBOUND' && this.sfxObj.lkpBizTypeId == elem.id)
              this.allLookupList.forEach((elem) => {
                if (
                  this.bookingInfoObj.sfxPrcContractcode.charAt(0) == "S" &&
                  elem.lookupVal.trim() == "CREDIT" &&
                  elem.lookupTypeVal.trim() == "CUST_TYPE"
                ) {
                  this.bookingInfoObj.custTypeLookupId = elem.id;
                } else if (
                  this.bookingInfoObj.sfxPrcContractcode.charAt(0) == "P" &&
                  elem.lookupVal.trim() == "PRC" &&
                  elem.lookupTypeVal.trim() == "CUST_TYPE"
                ) {
                  this.bookingInfoObj.custTypeLookupId = elem.id;
                  this.MopName = "PRC";
                }
                if (
                  this.isCreditCheck == true &&
                  elem.lookupVal.trim() == "CREDIT" &&
                  elem.lookupTypeVal.trim() == "RATE_CARD_TYPE"
                ) {
                  this.bookingInfoObj.rateCardTypeLookupId = elem.id;
                } else if (
                  this.sfxObj.rateCardApplicableFlag == 1 && this.isCreditCheck == false &&
                  elem.lookupVal.trim() == "PRC" &&
                  elem.lookupTypeVal.trim() == "RATE_CARD_TYPE"
                ) {
                  this.bookingInfoObj.rateCardTypeLookupId = elem.id;
                }
              });
              // if (isInbound) {
              //   if (isInbound.lookupVal.trim() == 'INBOUND') {
              //     this.appComp.showMessage(`Inbound / A2A contract cannot be used for direct booking `, "danger");
              //     this.bookingInfoObj.sfxPrcContractcode = '';
              //     this.bookingInfoObj.businessTypeLookupId = '';
              //     this.spinner.hide();
              //     return;
              //   }
              // }
              // this.getConsigneeByMsaCustId(this.sfxObj.msaCustId);
              if (this.sfxObj.rateCardApplicableFlag == 0) {
                // this.getAllConsigneeWithoutRateCard();
                // this.getAllConsigneerWithoutRateCard();
                this.getServiceOffering();
                this.selectedType = 1;
                this.allLookupList.forEach((elem) => {
                  if (
                    elem.lookupVal.trim() == "RETAIL" &&
                    elem.lookupTypeVal.trim() == "RATE_CARD_TYPE"
                  ) {
                    this.bookingInfoObj.rateCardTypeLookupId = elem.id;
                  }
                });
              } else {
                this.serviceOfferingList = [];
                this.serviceOfferingReferenceList = [];
                this.getServiceOfferingBySafexId(this.sfxObj.id);
              }

              // this.appComp.showMessage(`Request for search contract by contract-code processed successfully`);
            }
            setTimeout(() => {
              this.spinner.hide();
            }, 2500);

          },
          (err) => {
            this.isDisabled = false;
            this.bookingInfoObj.sfxPrcContractcode = '';
            this.spinner.hide();
          }
        );
        // }
      } else if (strlength && strlength < 3) {

        this.appComp.showMessage(`Enter valid ${this.isCreditCheck == true ? 'SFX Code' : 'PRC Code'}`, "danger");
        this.bookingInfoObj.sfxPrcContractcode = '';
      }
    }
    if (this.selectedValue == "MSA") {
      this.bookingInfoObj.sfxPrcContractcode = '';
      let msaName = sfxId;
      msaName = encodeURI(msaName);
      if (msaName.length > 2) {
        this.spinner.show();
        this.checkMsaAndCotractIsSingle(msaName);
      } else if (msaName.length && msaName.length < 3) {
        this.spinner.hide();
        this.appComp.showMessage(`Enter atleast Three characters !`, "danger");
      }
    }
  }
  onContractOption(selected) {
    this.selectedValue = '';
    this.selectedValue = selected;
    console.log(this.selectedValue);
  }
  allServiceOfferings = [];
  getAllOfferings() {
    this.ugdservice.getServiceOffering().subscribe((res: any) => {
      this.allServiceOfferings = res.data.responseData;
    })
  }
  getServiceOfferingName(serviceOfferingId) {
    console.log('get service offering name', serviceOfferingId);
    console.log('get service offering isEditCheck', this.isEditCheck)

    if (this.isEditCheck && this.bookingInfoObj.waybillId) {
      this.commercialTypeList = [];
      this.selectedProductCategoryList = [];
      this.bookingInfoObj.rateCardId = '';
      this.bookingInfoObj.commercialId = '';
      this.bookingInfoObj.chargeWeight = null;
      this.bookingInfoObj.actualWeight = '';
      this.bookingInfoObj.totalPackageCount = '';
      this.selectedProductCategoryCardList = [];
      this.bookingInfoObj.packageList = [];
    }
    // if (serviceOfferingId) {
    //   this.bookingInfoObj.serviceOfferingId = serviceOfferingId
    // }
    //  if(!this.RateCardList.length){
    //    this.bookingInfoObj.consigneeId='';
    //  }
    // console.log('this.service offering list', this.serviceOfferingList);
    // console.log('serviceOfferingId', serviceOfferingId);
    this.serviceOfferingList.forEach((elem) => {
      if (elem.id == serviceOfferingId) {
        this.serviceOfferingName = elem.value;
      }
    });
    if (this.bookingInfoObj.sfxPrcContractcode && this.sfxObj.id && (this.sfxObj.rateCardApplicableFlag || this.isCreditCheck)) {
      if (this.refType(this.bookingInfoObj.businessTypeLookupId) === 'ANYWHERE TO ANYWHERE') {
        this.getCommercialByRateCard(this.bookingInfoObj.rateCardId);
      } else {
        if (this.bookingInfoObj.sfxPrcContractcode && this.bookingInfoObj.sfxPrcContractcode !== '' && (this.oldOfferingId !== this.bookingInfoObj.serviceOfferingId)) {
          this.getCommercials();
        } else {
          this.getRateCardBySafexId();
        }
      }
    }
  }
  getServiceOfferingBySafexId(contractId) {
    console.log('getServiceOfferingBySafexId', contractId);
    this.$bookingInfo
      .getServiceOffering(contractId, this.contractType, this.headerData)
      .subscribe((response) => {
        if (response) {
          this.serviceOfferingList = response.referenceData.referenceItemList;
          this.serviceOfferingReferenceList = response.responseData;
          // if (!this.bookingInfoObj.serviceOfferingId) {
          //   this.serviceOfferingList.forEach((elem) => {
          //     if (elem.value == "SURFACE") {
          //       this.bookingInfoObj.serviceOfferingId = elem.id;
          //     }
          //   });
          // }

          if (this.bookingInfoObj.serviceOfferingId) {
            this.getServiceOfferingName(this.bookingInfoObj.serviceOfferingId);
          }
          // this.getRateCardBySafexId();
        }
      });
  }

  getServiceOffering() {

    if (this.isCreditCheck == false) {
      this.$bookingInfo.getAllServiceOffering(this.headerData).subscribe((response) => {
        if (response) {
          this.serviceOfferingList = response;
          this.serviceOfferingList.forEach((elem) => {
            elem.value = elem.descr;
          });
        }
      });
    }

  }

  handleChange(evt) {

    if (evt.value) {
      // this.bookingInfoObj.destPincodeId = "";
      this.bookingInfoObj.invoiceList = [];
      // this.destPincode = "";
      this.searchtext = '';
      this.invoiceCost = 0;
      this.totalWayBill = null;
    } else {
      // this.waybillList = [];
      this.bookingInfoObj.ewaybillRequirementFlag = 0;
      // this.bookingInfoObj.destPincodeId = "";
      this.bookingInfoObj.invoiceList = [];
      this.bookingInfoObj.invoiceList.push({
        invoiceNumber: "",
        invoiceDate: "",
        invoiceAmount: "",
        status: 1
      });
      this.isInvoiceDisabled = false;
      // this.destPincode = "";
      // this.searchtext = '';
    }
  }

  dodHandle(evt) {

    this.bookingInfoObj.dodDaccFlag = evt.value;
    this.pdcList.forEach(elem => {
      if (elem.id == this.bookingInfoObj.dodDaccFlag) {
        elem.checked = true;
      }
      else {
        elem.checked = false;
      }
    })
    if (evt.value == 0) {
      delete this.bookingInfoObj.dodTypeId;
      delete this.bookingInfoObj.pdcDate;
      delete this.bookingInfoObj.payeeName;
      delete this.bookingInfoObj.dodAmount;
    }
  }
  OnchangeHubDelivery(evt) {
    console.log(evt);

    this.searchtext = '';
    this.destPincode = "";
    this.bookingInfoObj.destPincodeId = '';
    this.bookingInfoObj.hubDeliveryFlag = evt.value;
    if (this.bookingInfoObj.ewaybillAvailableFlag == 1 && evt.value == 0) {
      if (
        this.bookingInfoObj.invoiceList.length
      ) {
        this.destPincode = this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail.deliveryPincode;
        this.getpincodeDetailsByPincode(
          this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail
            .deliveryPincode
        );


      } else {
        this.destPincode = "";
        this.lkpSafextType = "";
        this.hubList = [];
      }
    }
    this.bookingInfoObj.hubDeliveryBranchId = '';
    if (this.bookingInfoObj.ewaybillAvailableFlag == 0) {
      if (evt.value == 0) {
        this.destPincode = "";
        this.lkpSafextType = "";
        this.searchtext = '';
      }
      if (evt.value == 1) {
        this.emptyData();
        // this.hubList = [];
      }
    }
  }
  pasted = ''
  getWaybillBuId(event) {

    if (event) {
      console.log(event);
      var strlength = this.searchWayBill.length;
    }
    if (strlength > 11) {
      // this.spinner.show();
      if (event.target.value === this.pasted) {
        return;
      }
      this.spinner.show();

      this.pasted = event.target.value;

      this.$bookingInfo.getWaybillById(this.searchWayBill).subscribe(
        (response) => {
          if (response) {
            this.spinner.hide();
            if (response.deliveryPincode !== this.destPincode) {
              this.searchWayBill = '';
              this.appComp.showMessage(
                `E-Waybill Destination pincode Does not match with existing Destination pincode `,
                "danger"
              );
              return;
            }
            if (this.bookingInfoObj.invoiceList.length) {

              var duplicateEwaybill = this.bookingInfoObj.invoiceList.find(elem => elem.ewaybillInvoiceDetail.ewaybillNumber == response.ewaybillNumber)
              if (duplicateEwaybill) {
                this.searchWayBill = '';
                this.appComp.showMessage(
                  `This Ewaybill number already exist`,
                  "danger"
                );
                return;
              }
              if (
                this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail
                  .deliveryPincode != response.deliveryPincode
              ) {
                this.searchWayBill = '';
                this.appComp.showMessage(
                  `Destination pincode Does not match with existing e-waybill Destination pincode `,
                  "danger"
                );
                return;
              }
              if (
                this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail
                  .fromGstinNum != response.fromGstinNum
              ) {
                this.searchWayBill = '';
                this.appComp.showMessage(
                  `From Gst Number Does not match with existing e-waybill from gst Number `,
                  "danger"
                );
                return;
              }
              if (
                this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail
                  .toGstinNum != response.toGstinNum
              ) {
                this.searchWayBill = '';
                this.appComp.showMessage(
                  `To Gst Number Does not match with existing e-waybill to gst Number `,
                  "danger"
                );
                return;
              }
            }
            this.bookingInfoObj.invoiceList.push({
              ewaybillInvoiceDetail: response,
            });
            this.localWaybillList = [...this.bookingInfoObj.invoiceList];
            // this.waybillList = [...this.localWaybillList];
            this.searchWayBill = "";
            if (this.bookingInfoObj.invoiceList) {
              this.bookingInfoObj.invoiceList.forEach((element) => {
                element.invoiceNumber =
                  element.ewaybillInvoiceDetail.docNum;
                element.invoiceAmount =
                  element.ewaybillInvoiceDetail.totalInvoiceVal;
                element.invoiceDate = moment(
                  element.ewaybillInvoiceDetail.docDate
                ).format("YYYY-MM-DD");
                element.ewaybillInvoiceDetail.docDate = moment(
                  element.ewaybillInvoiceDetail.docDate
                ).format("YYYY-MM-DD");
                element.ewaybillInvoiceDetail.ewaybillDate = moment(
                  element.ewaybillInvoiceDetail.ewaybillDate
                ).format("YYYY-MM-DD");
              });
            }
            if (this.bookingInfoObj.invoiceList) {
              this.totalWayBill = this.bookingInfoObj.invoiceList.length;
            }
            this.destPincode = this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail.deliveryPincode;
            if (this.destPincode) {
              this.getpincodeDetailsByPincode(this.destPincode);

            }
            this.isPincodeDisable = true;
            this.invoiceCost = 0;
            this.bookingInfoObj.invoiceList.forEach((element) => {
              this.invoiceCost =
                this.invoiceCost +
                parseInt(element.ewaybillInvoiceDetail.totalInvoiceVal);
            });
            if (this.bookingInfoObj.invoiceList) {
              this.appComp.showMessage(`Record searched successfully`);
            } else {
              this.appComp.showMessage(`Record Doesn't Exist `, "danger");
            }
            // if (this.destPincode) {
            //   this.$bookingInfo
            //     .getPincodeIdByPincode(this.destPincode , this.headerData)
            //     .subscribe((Response) => {
            //       if (Response) {
            //         this.bookingInfoObj.destPincodeId = Response.id;
            //         this.allLookupList.forEach((elem) => {
            //           if (Response.lkpSafextTypeId == elem.id) {
            //             this.lkpSafextType = elem.lookupVal;
            //           }
            //         });
            //       }
            //     });
            // }
            if (
              this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail
                .deliveryPincode
            ) {
              this.consigneeList = this.consigneeList.filter(
                (elem) =>
                  elem.addrBook.pincodeId ==
                  this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail
                    .deliveryPincode
              );
              if (this.consigneeList != undefined) {
                if (this.consigneeList.length) {
                  this.consigneeList.sort((a, b) => a.name.localeCompare(b.name));

                }
              }

            }
          }
        },
        (err) => {
          this.spinner.hide();
          this.pasted = '';
          this.appComp.showMessage(`E-waybill Number Not Found`, 'danger');
        }
      );

    }
  }

  strLengthValid: boolean = false;

  timefunc(time, code) {
    // console.log(time, code);

    if (code == 8) {
      this.bookingInfoObj.pickupTime = time;
    } else {
      this.bookingInfoObj.pickupTime = time;
      if (time.length == 2) {
        this.bookingInfoObj.pickupTime = time + ":";
      }
    }
  }
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;

  checkMark(obj) {
    // console.log('checkmark', this.checkMark);
    // this.checkboxes.forEach((element) => {
    //   element.nativeElement.checked = true;
    // });
    if (obj.value.trim() == "BY INVOICE WITH GST" || obj.value.trim() == "BY INVOICE W/O GST") {
      this.isInvoiceCommercial = true;
      this.bookingInfoObj.ncvFlag = 0;
      this.bookingInfoObj.invoiceList = [];
      this.bookingInfoObj.invoiceList.push({
        invoiceNumber: "",
        invoiceDate: "",
        invoiceAmount: "",
        status: 1
      });
      this.isHideNcv = true;
      // this.checkMark();
    }
    else {
      this.isInvoiceCommercial = false;
    }

  }
  emptyData() {

    this.pincodeList = [];
    this.hubList = [];
    this.strLengthValid = false;
  }
  emptyData2() {

    this.hubList = [];
  }
  onClear() {

    this.strLengthValid = false;
    if (this.hubList.length > 0) {
      if (this.bookingInfoObj.hubDeliveryBranchId) {
        return;
      } else {
        this.emptyData();
      }
    }
    if (this.pincodeList.length > 0) {
      if (this.bookingInfoObj.pincode) {
        return;
      } else {
        this.emptyData();
      }
    }
  }
  isSafextension = false;
  getpincodeDetailsById(pincodeId) {

    this.hubList.forEach(hublist => {
      if (hublist.branchId == this.bookingInfoObj.hubDeliveryBranchId) {
        pincodeId = hublist.pincodeId;
        this.bookingInfoObj.destPincodeId = hublist.pincodeId;
      }
    })
    if (pincodeId == null) {
      this.destPincode = '';
      return;
    }
    if (pincodeId == 0) {
      this.appComp.showMessage(`Selected hub has no pincode Id`, "danger");
      this.destPincode = '';
      this.searchtext = '';
      return;
    }
    this.$bookingInfo.getPincodeByPincodeId(pincodeId, this.headerData).subscribe(
      (Response) => {
        if (Response) {
          this.invalidPincode = false;
          this.destPincode = Response.pincode;
          this.invalidPincode = false;
          this.isSafextension = Response.isSafextension;
          if (this.destPincode) {
            this.getpincodeDetailsByPincode(this.destPincode)
          }
          if (this.isSafextension) {
            this.allLookupList.forEach((elem) => {
              if (Response.lkpSafextTypeId == elem.id) {
                this.lkpSafextType = elem.lookupVal;
              }
            });
          }
          var isPresent = [];
          this.LocalconsigneeList.forEach((elem) => {
            if (elem.addrBook.pincodeId == Response.pincode) {
              isPresent.push(elem);
            }
          });
          this.consigneeList = [...isPresent];
        }
      },
      (err) => {
        // this.invalidPincode = true;
        this.destPincode = '';
        this.searchtext = '';
      }
    );
  }
  getpincodeDetailsByPincode(pincodeId) {

    this.pincodeList = [];
    if (pincodeId.term) {
      // this.searchConsignee.pincode = pincodeId.term || pincodeId.pincode;
      if (pincodeId.term.toString().length >= 3) {
        return this.gettingPincode(pincodeId.term)
      }
      else if (pincodeId.term.toString().length >= 1 && pincodeId.term.toString().length < 6) {
        this.invalidPincode = true;
      }
      else {
        this.invalidPincode = false;
      }
    }
    else if (pincodeId) {
      return this.gettingPincode(pincodeId);
    }

  }

  getConsigneePincode(pincode) {
    this.$bookingInfo.getPincodeIdByPincode(pincode, this.headerData).subscribe(
      (res) => {
        console.log('getConsigneePincode getConsigneePincode', res)
        this.bookingInfoObj.destPincodeId = res[0].id;
        this.getpincodeDetailsById(this.bookingInfoObj.destPincodeId);
      })
  }
  gettingPincode(pincodeId) {

    this.$bookingInfo.getPincodeIdByPincode(pincodeId, this.headerData).subscribe(
      (Response) => {

        this.pincodeList = Response;
        this.pincodeList.forEach(elem => {
          elem.pincode = JSON.parse(elem.pincode);
        })
        console.log(Response);
        if (this.pincodeList.length == 1) {
          if (this.destPincode == this.pincodeList[0].pincode) {
            return this.getPincodebyId(this.pincodeList[0]);
          }
        }
      },
      (err) => {

        this.destPincode = '';
        this.invalidPincode = true;
        this.consigneeList = [];
      }
    );
  }

  checkWaybillSelceted() {
    if (this.bookingInfoObj.hubDeliveryFlag == 0) {
      if (this.pincodeList.length == 1) {
        if (
          this.destPincode == this.pincodeList[0].pincode
        ) {
          return;
        }
        else {
          this.destPincode = '';
        }
      }
    }

  }
  getPincodebyId(pincodeId) {

    if (pincodeId == undefined) {
      return;
    }
    if (pincodeId.id) {

      console.log(pincodeId);

      this.$bookingInfo.getPincodeByPincodeId(pincodeId.id, this.headerData).subscribe(resp => {
        if (this.RateCardList.length == 1 && this.commercialTypeList.length == 1) {
          this.isExpand = false;
          this.consignerisExpand = true;
        }
        this.page1 = 1;
        this.p = 1;
        this.invalidPincode = false;
        this.destPincode = pincodeId.pincode;
        this.bookingInfoObj.destPincodeId = resp.id;
        this.isSafextension = pincodeId.isSafextension;
        if (this.isSafextension) {
          this.allLookupList.forEach((elem) => {
            if (resp.lkpSafextTypeId == elem.id) {
              this.lkpSafextType = elem.lookupVal;
            }
          });
        }
        var isPresent = [];
        this.LocalconsigneeList.forEach((elem) => {
          if (elem.addrBook.pincodeId == JSON.parse(pincodeId.pincode)) {
            isPresent.push(elem);
          }
        });
        this.consigneeList = [...isPresent];
      });




    }
  }
  searchHubByHubName(str) {

    if (str) {
      console.log(str);
      var strlength = str.term.length;
    }
    if (strlength > 2 && str.term) {
      this.strLengthValid = false;
      str.term = encodeURI(str.term);
      str.term = str.term.toUpperCase()
      console.log(str.term);
      this.$bookingInfo.searchHub(str.term, this.headerData).subscribe(
        (response) => {
          console.log(response);
          if (response) {
            this.hubList = response;
          } else {
            this.appComp.showMessage(`Record Doesn't Exist `, "danger");
          }
        },
        (err) => {
          this.searchtext = '';
        }
      );
    } else {
      this.strLengthValid = true;
      this.hubList = [];
    }
    // else {
    //   this.strLengthValid = true;
    // }
  }
  searchPincodeIdByPincode(str) {

    let strlength = str.term.length;
    if (strlength > 2 && str.term) {
      this.strLengthValid = false;
      this.$bookingInfo
        .getPincodeIdByPincode(str.term, this.headerData)
        .subscribe((Response) => {
          if (Response) {
            this.allLookupList.forEach((elem) => {
              if (Response.lkpSafextTypeId == elem.id) {
                this.lkpSafextType = elem.lookupVal;
              }
            });
          }
        });
    } else {
      this.strLengthValid = true;
    }
  }

  checkLength() {
    if (!this.searchHubName) {
      this.strLengthValid = false;
    }
  }
  singlePackgeType = [] as any;
  getpackageList() {
    this.$bookingInfo.getPackage(this.headerData).subscribe((response) => {
      if (response) {
        this.packageList = response;
        this.singlePackgeType = response;
      }
    });
  }
  getProductList() {

    this.$bookingInfo.getAllProduct(this.headerData).subscribe((response) => {
      if (response) {
        this.allProductList = response;
      }
    });
  }
  getCommercialByRateCard(ratecard) {

    try {
      if (this.fieldsetDisabled == false) {
        if (this.RateCardList.length > 1) {
          this.spinner.show();
        }
        this.RateCardList.forEach((elem, index) => {
          if (elem.id == ratecard) {
            elem.checked = true;
          } else {
            elem.checked = false;
          }
        });

        this.isRateCardRequired = false;
        this.bookingInfoObj.rateCardId = ratecard;
        this.getConsignerConsigneeWithRateCard(ratecard);
        this.selectedType = 1;
        this.$bookingInfo
          .getCommercialById(ratecard, this.contractType, this.headerData)
          .subscribe((Response) => {
            this.spinner.hide();
            if (Response) {
              let refrenceList = Response.referenceData.referenceItemList;
              this.commercialTypeList = Response.responseData;
              if (this.selectedCommercial) {
                this.commercialTypeList = this.commercialTypeList.filter(elem => (elem.lkpChrgById === this.selectedCommercial.lkpChrgById) && (elem.prdctCtgyId === this.selectedCommercial.prdctCtgyId))
              } else {
                this.commercialTypeList = this.commercialTypeList.filter(elem => this.bookingInfoObj.commercialId === elem.id);
              }
              // this.commercialTypeList.
              refrenceList.forEach((element) => {
                this.commercialTypeList.forEach((elem) => {
                  if (element.id == elem.lkpChrgById) {
                    elem.referenceItemType = element.referenceItemType;
                    elem.value = element.value;
                  }
                });
              });
              refrenceList.forEach((element) => {
                this.commercialTypeList.forEach((elem) => {
                  if (element.id == elem.prdctCtgyId) {
                    elem.productValue = element.value;
                  }
                });
              });


              // selected commercial in edit
              this.checkBillableWeightFlag();
              if (this.bookingInfoObj.waybillId) {
                this.getProductCategoriBycommercialCatId(
                  this.bookingInfoObj.commercialId
                );
                // if(this.isPeaceType==false){
                //   return this.getFilterProductCategory(this.selectedProductCategoryCardList[0], 0);

                // }
              }
              if (this.commercialTypeList.length == 1) {
                this.getProductCategoriBycommercialCatId(
                  this.commercialTypeList[0]
                );
                if (this.RateCardList.length == 1 && this.destPincode) {
                  this.isExpand = false;
                  this.consignerisExpand = true;
                }
              } else {
                const filter = this.commercialTypeList.filter(el => el.id == this.bookingInfoObj.commercialId);
                if (filter.length === 0) {
                  this.bookingInfoObj.commercialId = null;
                }
                console.log('this.commercialTypeList', this.commercialTypeList);
                console.log('this.bookingInfoObj.commercialId', this.bookingInfoObj.commercialId);
              }
            }
          });
      }


    } catch (error) {
      this.spinner.hide();
    }
  }


  checkTimeWithCutOffTime() {

    let branch = this.allBranchList.find(elem => elem.branchId == this.branchId);
    if (branch.cutoffTime) {
      if (this.bookingInfoObj.pickupTime) {
        var str1 = this.bookingInfoObj.pickupTime.replace(/;/g, "");
      }
      var str2 = branch.cutoffTime.replace(/;/g, "");
      if (str1 > str2) {
        this.localBookingObj.shipmentDate = new Date(new Date().setDate(new Date().getDate() + 1))
      }
      if (str1 < str2) {
        this.localBookingObj.shipmentDate = new Date();
      }
    }

  }
  checkBillableWeightFlag() {

    this.$bookingInfo.billableWeightFlag(this.contractType, this.bookingInfoObj.rateCardId, this.headerData2).subscribe((response) => {
      if (response) {
        if (response.billableWghtFlag == 1) {
          this.isChargeWeight = false;
        }
        else {
          this.isChargeWeight = true;
        }
      }
    });
  }
  getAlProductcategoryWithAlis() {

    this.$bookingInfo.getProductCategoryByAlis(this.headerData).subscribe((response) => {
      if (response) {
        this.categoryListWithAlisList = response;
        console.log(2);
        var returnVal;

        this.tempcategoryList.forEach((elem, index) => {
          returnVal = 0;
          this.categoryListWithAlisList.forEach((elm, index) => {
            if (elem.id == elm.prdctCtgyId) {
              this.categoryListWithAlisList[index].prdctCtgy = elem.prdctCtgy;
              this.categoryListWithAlisList[index].status = elem.status;
              this.categoryListWithAlisList[index].effectiveDt =
                elem.effectiveDt;
              this.categoryListWithAlisList[index].localId =
                elem.id + (`${this.categoryListWithAlisList[index].packAlias ? this.categoryListWithAlisList[index].packAlias : ''} `);
              this.categoryListWithAlisList[index].id = elem.id;
              this.categoryListWithAlisList[index].expDt = elem.expDt;
            } else {
              returnVal = 1;
            }
          });
          if (returnVal == 1) {
            elem.localId = elem.id;
            this.categoryListWithAlisList.push(elem);
          }

        });
        console.log(this.categoryListWithAlisList);
      }
    });

  }
  getAlProductcategory() {
    console.log('##############getAlProductcategory')
    this.$bookingInfo.getCategory(this.headerData).subscribe((response) => {
      if (response) {
        console.log('getAlProductcategory response', response);
        this.tempcategoryList = response;
        return this.getAlProductcategoryWithAlis();
      }
    });
  }

  getproductByproductCateId(productId) {

    if (this.isPeaceType) {
      this.spinner.show();
      this.$bookingInfo.getProductByCatId(productId, this.headerData).subscribe((response) => {
        if (response) {
          this.spinner.hide();
          this.ProductList = response;
          if (this.bookingInfoObj.packageList) {
            let isPresent = this.ProductList.filter(elem => this.bookingInfoObj.packageList.findIndex(elm => elm.productId == elem.id) != -1);

            this.selectedProduct = [...isPresent];
          }
          if (this.selectedProduct) {
            this.changeProductIndex();
          }
        } else {
          this.spinner.hide();
        }
      });
    }
  }
  onMultipleSelected(event) {

  }
  getProductCategoriBycommercialCatId(obj) {

    try {
      if (this.fieldsetDisabled == false) {
        this.spinner.show();
        if (!obj.prdctCtgyId) {
          obj = this.commercialTypeList.find((elem) => elem.id == obj);
        }

        this.commercialTypeList.forEach((elem, index) => {
          if (elem.id == obj.id) {
            elem.checked = true;
          } else {
            elem.checked = false;
          }
        });
        if (obj.value == "BY PIECE") {
          this.isPeaceType = true;
        }
        else {
          this.isPeaceType = false;
        }
        this.isCommercialRequired = false;
        this.bookingInfoObj.commercialId = obj.id;
        this.UnitOfMeasurement = obj.value;
        if (obj.value.trim() == "BY INVOICE WITH GST" || obj.value.trim() == "BY INVOICE W/O GST") {
          this.isInvoiceCommercial = true;
          // this.bookingInfoObj.ncvFlag = 0;

          // this.checkMark();
        }
        else {
          this.isInvoiceCommercial = false;
        }
        this.allLookupList.forEach((elem) => {
          if (elem.id == obj.lkpPricingCalcTypeId && elem.lookupTypeVal.trim() == "PRICING_CALC_TYPE") {
            this.unitCalculationType = elem.lookupVal
            if (this.unitCalculationType == "CM") {
              this.maxLength = 3;
            }
            if (this.unitCalculationType == "INCH") {
              this.maxLength = 2;
            }
            else {
              this.maxLength = 3;
            }
            this.bookingInfoObj.lbhUomLookupId = elem.id;
          }
        });
        this.$bookingInfo
          .getProductCategry(obj.prdctCtgyId, this.headerData)
          .subscribe((response) => {
            this.spinner.hide();
            if (response) {

              console.log('############# this.iseditcheck', this.isEditCheck);
              if (this.isEditCheck) {
                this.selectedProductCategoryList = [];
                this.selectedProductCategoryCardList = [];
                this.bookingInfoObj.packageList = [];
                this.bookingInfoObj.totalPackageCount = '';
                this.bookingInfoObj.actualWeight = '';
                this.bookingInfoObj.chargeWeight = null;
              }
              console.log('selectedProductCategoryCardList', this.selectedProductCategoryCardList);
              if (this.packageList && this.packageList.length == 1) {
                this.packageTypeId = this.packageList[0].id;
              }
              console.log('objjjjjjjjjjjjjj', obj);
              if (obj.lkpPackTypeId) {
                this.packageList = [];

                this.singlePackgeType.forEach(elem => {
                  if (elem.id == obj.lkpPackTypeId) {
                    this.packageList.push(elem);
                    this.packageTypeId = obj.lkpPackTypeId;
                  }
                })
                // this.packageList=[...this.singlePackgeType];
              }
              else {
                this.packageTypeId = '';
                this.getpackageList();
              }



              if (response.prdctCtgy.trim() == "GENERAL") {
                console.log('********* in general')
                this.isPeaceType = false;
                this.categoryListWithAlisList = [...this.tempcategoryList];
              } else {
                console.log('*********** else general')
                this.categoryListWithAlisList = [...[response]];


                if (this.categoryListWithAlisList.length == 1) {
                  this.selectedProductCategoryList = '';

                  this.categoryListWithAlisList[0].localId = this.categoryListWithAlisList[0].id + (`${this.categoryListWithAlisList[0].packAlias ? this.categoryListWithAlisList[0].packAlias : ''} `)
                  this.selectedProductCategoryList = this.categoryListWithAlisList[0].localId;
                  this.selectedProductCategoryCardList = [
                    ...this.categoryListWithAlisList,
                  ];
                  this.productCategoryId = this.categoryListWithAlisList[0].id;
                  if (this.isPeaceType == false) {
                    this.getFilterProductCategory(
                      this.categoryListWithAlisList[0],
                      0
                    );

                  }
                }
                if (this.isPeaceType) {

                  this.ProductList = [];
                  this.allProductList.forEach((elem) => {
                    if (elem.prdctCtgyId == this.categoryListWithAlisList[0].id) {
                      this.ProductList.push(elem);
                    }
                  });
                  if (obj.commercialProductMap) {
                    if (obj.commercialProductMap.length) {
                      this.ProductList = this.allProductList.filter(elem => obj.commercialProductMap.findIndex(elm => elm.productId == elem.id) != -1)
                      console.log(this.ProductList, 'dfsd sfsd');
                    }
                  }
                  if (this.ProductList.length == 1) {
                    this.ProductList[0].checked = true;
                    this.isProductIndex = this.ProductList[0].id;
                    this.selectedProduct = [...this.ProductList];
                    this.addProductRowByDefault();
                  }
                }
                // if (this.selectedProductCategoryList) {
                //     let isPresent = this.categoryListWithAlisList.filter(elem => this.selectedProductCategoryList.findIndex(elm => elm.id == elem.id) != -1);
                //     this.selectedProductCategoryCardList = [...isPresent];
                //     return this.getFilterProductCategory(this.selectedProductCategoryCardList[0], null);

                // }
              }


              if (this.bookingInfoObj.waybillId && this.bookingInfoObj.rateCardId) {
                let UniqueList = [];
                if (this.bookingInfoObj.packageList) {
                  UniqueList = this.bookingInfoObj.packageList.filter((thing, index, self) =>
                    index === self.findIndex((t) => (
                      t.productCategoryId === thing.productCategoryId
                    ))
                  )
                }

                if (this.RateCardList.length && UniqueList.length && this.categoryListWithAlisList.length > 1) {
                  this.selectedProductCategoryList = []
                  UniqueList.forEach((elm) => {

                    this.selectedProductCategoryList.push({
                      id: elm.productCategoryId,
                    });
                  });


                  this.selectedProductCategoryCardList = this.categoryListWithAlisList.filter(
                    (elem) =>
                      this.selectedProductCategoryList.findIndex(
                        (elm) => elm.id == elem.id
                      ) != -1
                  );
                  if (this.isPeaceType == false && this.categoryListWithAlisList.length > 1) {
                    return this.getFilterProductCategory(this.selectedProductCategoryList[0], 0);
                  }
                }

                // only for a2a
                if (this.refType(this.bookingInfoObj.businessTypeLookupId) === 'ANYWHERE TO ANYWHERE' && UniqueList.length && this.categoryListWithAlisList.length > 1) {
                  console.log('***************** inside a2a product list');
                  this.selectedProductCategoryList = []
                  UniqueList.forEach((elm) => {

                    this.selectedProductCategoryList.push({
                      id: elm.productCategoryId,
                    });
                  });

                  console.log('*********** selectedProductCategoryList ############', this.selectedProductCategoryList);
                  console.log('*********** categoryListWithAlisList ############', this.categoryListWithAlisList);
                  this.selectedProductCategoryCardList = this.categoryListWithAlisList.filter(
                    (elem) =>
                      this.selectedProductCategoryList.findIndex(
                        (elm) => elm.id == elem.id
                      ) != -1
                  );
                  console.log('*********** selectedProductCategoryCardList ############', this.selectedProductCategoryCardList);
                  if (this.isPeaceType == false && this.categoryListWithAlisList.length > 1) {
                    return this.getFilterProductCategory(this.selectedProductCategoryList[0], 0);
                  }
                  this.RateCardList.push({})
                }

              }
            }
          });
      }

    } catch (error) {
      this.spinner.hide();
    }
  }
  emptyselectedCategory() {
    this.selectedProductCategoryCardList = [];
  }
  openEwaybillModal(infoType) {
    if (this.bookingInfoObj.invoiceList && this.bookingInfoObj.invoiceList.length < 1) {
      return;
    }
    let data = {
      invoiceList: this.bookingInfoObj.invoiceList,
      infoType: infoType
    }
    if (infoType == 'opinfo') {
      var width = '50rem';
    } else {
      width = '60rem'
    }
    var dialog = this.dialog.open(EwaybillNumberComponent, {
      width: width,
      panelClass: "bookingDialog",
      data: data,
    });
    dialog.afterClosed().subscribe((response) => {

      if (response === true) {
        return;
      }
      if (response) {
        this.localWaybillList = response;
        this.invoiceCost = 0;
        this.bookingInfoObj.invoiceList = response;
        this.totalWayBill = this.bookingInfoObj.invoiceList.length;
        this.bookingInfoObj.invoiceList.forEach((element) => {
          if (element.ewaybillInvoiceDetail) {
            this.invoiceCost =
              this.invoiceCost +
              parseInt(element.invoiceAmount);
          } else {
            this.invoiceCost =
              this.invoiceCost + parseInt(element.totalInvoiceVal);
          }
        });
        if (!this.bookingInfoObj.invoiceList.length) {
          // this.isWaybillDisable = false;
          // this.destPincode = "";
          // this.bookingInfoObj.destPincodeId = '';
          // this.searchtext = "";
        } else {
          this.isWaybillDisable = true;
        }
      }
    });
  }
  isDiscountAllowed = false;
  getBranchType() {
    const branchId = sessionStorage.getItem('branchId');
    const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));

    // const headers = this.headerUtil.getHeader();
    const headerData = {
      branchCode: "02",
      journeyId: "01",
      originUserType: "03",
      branchId: branchId,
      userId: userDetails.userId,
    } as any;
    let res: any
    this.$bookingInfo.branchMannualOrAuto(branchId, headerData).subscribe((res: any) => {
      console.log('response branch discount type', res);
      const data = res.responseData;
      for (let d of data) {
        if (d === 'DISCOUNT ALLOWED') {
          console.log('inside DISCOUNT ALLOWED');
          this.isDiscountAllowed = true;
        }
      }
      // this.branchType = res.responseData
    })
  }
  openAddNewConsigner(lkpConsigntypeId) {

    if (this.fieldsetDisabled == false) {


      let data = {
        ConsigntypeId: lkpConsigntypeId,
        destinationPincode: this.destPincode,
        type: 'consignor'
      } as any;

      if (this.bookingInfoObj.ewaybillAvailableFlag == 1 && this.selectedMopName == 'PAID') {
        if (this.bookingInfoObj.invoiceList != undefined) {
          if (this.bookingInfoObj.invoiceList.length) {
            data.consigneeName = this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail
              .fromTraderName ? this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail
              .fromTraderName : '';
            data.gstinNum = this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail
              .fromGstinNum ? this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail
              .fromGstinNum : '';
          }
        }
      }
      let dialog = this.dialog.open(AddNewConsigneeComponent, {
        width: "107rem",
        panelClass: "bookingDialog",
        data: data,
      });
      dialog.afterClosed().subscribe((response) => {
        if (response === true) {
          return;
        }
        if (response) {
          this.consignerList.push(response);
          this.consignerList = [...this.consignerList];
          this.consignerList.sort((a, b) => a.name.localeCompare(b.name));
          this.appComp.showMessage(`Consignor Created Successfully`);
        }
      });
    }

  }
  openAddNewConsignee(lkpConsigntypeId) {

    if (this.fieldsetDisabled == false) {
      let data = {
        ConsigntypeId: lkpConsigntypeId,
        destinationPincode: this.destPincode ? this.destPincode : '',
        type: 'consignee'
      } as any;
      if (this.bookingInfoObj.invoiceList != undefined) {
        if (this.bookingInfoObj.invoiceList.length && this.bookingInfoObj.ewaybillAvailableFlag == 1) {
          data.gstinNum = this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail
            .toGstinNum ? this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail
            .toGstinNum : '';
        }
        if (this.bookingInfoObj.invoiceList.length && this.bookingInfoObj.ewaybillAvailableFlag == 1) {
          data.deliveryPlace = this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail
            .deliveryPlace ? this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail
            .deliveryPlace : '';
        }
        if (this.bookingInfoObj.invoiceList.length && this.bookingInfoObj.ewaybillAvailableFlag == 1) {
          data.consigneeName = this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail
            .toTraderName ? this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail
            .toTraderName : '';
        }
      }
      let dialog = this.dialog.open(AddNewConsigneeComponent, {
        width: "105rem",
        panelClass: "bookingDialog",
        data: data,
      });
      dialog.afterClosed().subscribe((response) => {

        if (response === true) {
          return;
        }
        if (response) {
          this.addConsigneeList.push(response);
          this.consigneeList.splice(0, 0, response);
          this.consigneeList = [...this.consigneeList];
          this.consigneeList.sort((a, b) => a.name.localeCompare(b.name));
          this.appComp.showMessage(`Consignee Created Successfully`);
        }
      });
    }
  }
  addConsigneeList: Array<any> = [];
  searchConsigner1(ccType) {

    this.page1 = 1
    var search = {} as any;
    search.ccType = ccType;
    if (this.searchCongner.name) {
      search.name = this.searchCongner.name
    }
    if (this.searchCongner.pincode) {
      search.pincode = this.searchCongner.pincode
    }
    if (this.searchCongner.gstin) {
      search.gstin = this.searchCongner.gstin
    }
    if (this.searchCongner.contactNum) {
      search.contactNum = this.searchCongner.contactNum
    }
    this.$bookingInfo.searchConsignerConsgnee(search).subscribe(response => {
      if (response) {
        this.consignerList = response;
        if (this.consignerList != undefined) {
          if (this.consignerList.length) {
            this.consignerList.sort((a, b) => a.name.localeCompare(b.name));
          }
        }

      }
    })
  }
  localConsigneeList: Array<any> = [];
  searchByConsignee1(ccType) {

    this.p = 1;
    var search = {} as any;
    search.ccType = ccType;
    if (this.searchConsignee.name) {
      search.name = this.searchConsignee.name
    }
    if (this.destPincode) {
      search.pincode = this.destPincode;
    }
    if (this.searchConsignee.gstin) {
      search.gstin = this.searchConsignee.gstin
    }
    if (this.searchConsignee.contactNum) {
      search.contactNum = this.searchConsignee.contactNum
    }
    this.$bookingInfo.searchConsignerConsgnee(search).subscribe(response => {
      if (response) {
        this.consigneeList = response;
        if (this.consigneeList != undefined) {
          if (this.consigneeList.length) {
            this.consigneeList.sort((a, b) => a.name.localeCompare(b.name));
          }
        }

      }
    })
  }
  localConsignorList: Array<any> = [];


  getConsigneerConsigneeByExsisting(type) {

    this.p = 1;
    this.consigneeList = [];
    this.LocalconsigneeList = [];
    if (type == 1) {
      if (this.RateCardList.length) {
        this.getConsigneeByMsaCustId(this.sfxObj.msaCustId, type);
      } else {
        this.getAllConsigneeWithoutRateCard(type);
      }
    } else if (type == 2) {

      this.getExistingConsignee(type);
    }
    this.searchConsignee.name = "";
    this.searchConsignee.gstin = "";
    this.searchConsignee.contactNum = "";
  }
  editScreen: boolean = false;
  getConsigneerByOnTab() {

    if (this.RateCardList.length && this.selectedType == 1 && this.editScreen == false) {
      if (this.sfxObj.msaCustId) {
        this.getConsigneeByMsaCustId(this.sfxObj.msaCustId);
      }

    } else if (this.sfxObj.msaCustId && this.selectedType == 1 && this.editScreen == false) {
      this.getAllConsigneeWithoutRateCard();
    }
    else {
      if (this.editScreen == true) {
        this.selectedType = 2;
      }
      this.getExistingConsignee();
    }
    this.searchCongner.name = "";
    this.searchCongner.gstin = "";
    this.searchCongner.contactNum = "";
    this.searchCongner.pincode = "";
  }


  getConsignorByOnTab() {

    if (this.RateCardList.length) {
      if (this.bookingInfoObj.rateCardId) {
        this.getConsignerConsigneeWithRateCard(this.bookingInfoObj.rateCardId);
      }
    }
    else if (this.isCreditCheck == false) {
      if (this.bookingInfoObj.sfxPrcContractcode && this.sfxObj.rateCardApplicableFlag == 0) {
        this.getAllConsigneerWithoutRateCard();
      }
      else {
        this.getAllConsigneerExistingWithoutRateCard();
      }

    }
    this.searchConsignee.name = "";
    this.searchConsignee.gstin = "";
    this.searchConsignee.contactNum = "";
  }

  clearSearch() {

    if (
      !this.searchConsignee.name && !this.searchConsignee.gstin &&
      !this.searchConsignee.contactNum
    ) {
      this.strLengthValid = false;
      if (this.selectedType == 1) {
        this.p = 1
        if (this.RateCardList.length) {
          this.getExisting()
          // this.getConsigneeByMsaCustId(this.sfxObj.msaCustId);
        } else {
          this.getAllConsigneeWithoutRateCard();
        }
      } else if (this.selectedType == 2) {

        this.getExistingConsignee();
      }
      else {
        this.getExistingConsignee();
      }
    }
  }

  // getConsigneeOnCheced(obj) {
  //   
  //   this.searchConsignee.name = obj.name;
  //   if (obj.gstinNum) {
  //     this.searchConsignee.gstin = obj.gstinNum;
  //   }
  //   this.searchConsignee.contactNum = obj.mob;
  //   this.searchConsignee.pincode = obj.addrBook.pincodeId;
  // }

  clearConsignorSearch() {

    if (!this.localConsignorList.length) {
      this.localConsignorList = [...this.consignerList];
    }

    if (
      !this.searchCongner.name &&
      (this.searchCongner.name == "" && !this.searchCongner.gstin) &&
      (this.searchCongner.gstin == "" && !this.searchCongner.pincode) &&
      (this.searchCongner.pincode == "" && !this.searchCongner.contactNum) &&
      this.searchCongner.contactNum == ""
    ) {
      this.strLengthValid = false;
      this.consignerList = [...this.localConsignorList];
      if (this.consignerList != undefined) {
        if (this.consignerList.length) {
          this.consignerList.sort((a, b) => a.name.localeCompare(b.name));
        }
      }

    }
  }
  // getConsignorOnCheced(obj) {
  //   
  //   this.searchCongner.name = obj.name;
  //   if (obj.gstinNum) {
  //     this.searchCongner.gstin = obj.gstinNum;
  //   }
  //   this.searchCongner.contactNum = obj.mob;
  //   this.searchCongner.pincode = obj.addrBook.pincodeId;
  // }
  getConsignerConsigneeWithRateCard(rateCardId) {

    this.$bookingInfo
      .getconsignerConsigneeByRateCardId(
        rateCardId,
        this.contractType,
        this.sfxCode, this.headerData
      )
      .subscribe((response) => {
        if (response) {
          this.consignerList = response;
          if (this.consignerList != undefined) {
            if (this.consignerList.length) {
              this.consignerList.sort((a, b) => a.name.localeCompare(b.name));
            }
          }

          // var isPresent = []
          // if (this.bookingInfoObj.invoiceList.length && this.bookingInfoObj.ewaybillAvailableFlag) {
          //     isPresent = this.consignerList.filter(elem => this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail.fromGstinNum == elem.gstinNum);
          //     this.consignerList = [...isPresent]
          // }
        }
      });
  }
  getConsigneeByMsaCustId(masId, type = null) {

    if (type) {
      this.spinner.show();
    }
    this.$bookingInfo.getConsigneeByMustCustId(masId, this.headerData).subscribe((response) => {
      if (type) {
        this.spinner.hide();
      }
      if (response) {
        this.consigneeList = response;
        this.LocalconsigneeList = response;
        var isPresent = [];
        if (
          this.bookingInfoObj.ewaybillAvailableFlag
        ) {
          if (this.bookingInfoObj.invoiceList && this.bookingInfoObj.invoiceList.length && this.bookingInfoObj.ewaybillAvailableFlag == 1 && this.bookingInfoObj.hubDeliveryFlag == 0) {
            isPresent = this.consigneeList.filter(
              (elem) =>
                this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail
                  .toGstinNum == elem.gstinNum ||
                this.bookingInfoObj.invoiceList[0].ewaybillInvoiceDetail
                  .deliveryPincode == elem.addrBook.pincodeId
            );
          }
        }
        else {
          isPresent = this.consigneeList.filter(
            (elem) => this.destPincode == elem.addrBook.pincodeId
          );
        }
        this.consigneeList = [...isPresent];
        if (this.addConsigneeList.length) {
          this.addConsigneeList.forEach(elem => {
            if (this.destPincode == elem.addrBook.pincodeId) {
              this.consigneeList.splice(0, 0, elem);
            }
          })
        }
        if (this.consigneeList.length)
          this.consigneeList.sort((a, b) => a.name.localeCompare(b.name));
      }
    });
  }

  getExistingConsignee(type = null) {

    if (type) {
      this.spinner.show();
    }

    this.$bookingInfo
      .getAllConrExistingWithOutRateCard(this.headerData)
      .subscribe((response) => {
        if (response) {
          if (type) {
            this.spinner.hide();
          }

          this.LocalconsigneeList = response;
          this.consigneeList = [...this.LocalconsigneeList];
          if (this.destPincode) {
            this.consigneeList = this.consigneeList.filter(
              (elem) => elem.addrBook.pincodeId == this.destPincode
            );
            if (this.addConsigneeList.length) {
              this.addConsigneeList.forEach(elem => {
                if (this.destPincode == elem.addrBook.pincodeId) {
                  this.consigneeList.splice(0, 0, elem);
                }
              })
            }
          }
          else {
            this.consigneeList = [];
          }
          if (this.consigneeList.length) {
            this.consigneeList.sort((a, b) => a.name.localeCompare(b.name));
          }

          if (this.bookingInfoObj.waybillId && this.editScreen == true) {
            let selectedConsignee = this.consigneeList.find(elem => this.bookingInfoObj.consigneeId == elem.id)
            let findIndex = this.consigneeList.findIndex(elem => this.bookingInfoObj.consigneeId == elem.id);
            this.consigneeList.splice(findIndex, 1);
            this.consigneeList.splice(0, 0, selectedConsignee);

          }
        }
      });
  }
  getExisting(type = null) {
    this.spinner.show();
    if (type) {
      this.spinner.show();
    }

    this.$bookingInfo
      .getAllConrExistingWithOutRateCard(this.headerData)
      .subscribe((response) => {
        console.log('existing list', response);
        if (response) {
          if (type) {
            this.spinner.hide();
          }

          this.LocalconsigneeList = response;
          this.consigneeList = [...this.LocalconsigneeList];
          if (this.destPincode) {
            this.consigneeList = this.consigneeList.filter(
              (elem) => elem.addrBook.pincodeId == this.destPincode
            );
            if (this.addConsigneeList.length) {
              this.addConsigneeList.forEach(elem => {
                if (this.destPincode == elem.addrBook.pincodeId) {
                  this.consigneeList.splice(0, 0, elem);
                }
              })
            }
          }
          else {
            this.consigneeList = [];
          }
          console.log('this.getconsigneelist', this.consigneeList);
          if (this.consigneeList.length) {
            this.consigneeList.sort((a, b) => a.name.localeCompare(b.name));
          }
          // for (let consignee of this.consigneeList) {
          //   if (!consignee.id) {
          //     console.log('consigneeeeeee#########', consignee);
          //   }
          // }
          // const d = this.consigneeList.find(con => );
          // console.log('d',d);
          // const index: number = this.consigneeList.findIndex(elem => elem === undefined);
          // console.log('index',index);

          // const ui = this.consigneeList.findIndex(con => !con.id);
          // this.consigneeList.splice(ui, 1);
          // console.log('uid',ui);
          // this.consigneeList.splice(0,1);
          delete this.consigneeList[0];
          this.spinner.hide();

          // console.log('this.bookingInfoObj.consigneeId', this.bookingInfoObj.consigneeId);
          // if (this.bookingInfoObj.consigneeId) {
          //   console.log('this.bookingInfoObj.consigneeId', this.bookingInfoObj.consigneeId);
          //   let selectedConsignee = this.consigneeList.find(elem => this.bookingInfoObj.consigneeId == elem.id)
          //   console.log('selectedConsignee', selectedConsignee);
          // }
          // if (this.bookingInfoObj.waybillId && this.editScreen == true) {
          //   let selectedConsignee = this.consigneeList.find(elem => this.bookingInfoObj.consigneeId == elem.id)
          //   let findIndex = this.consigneeList.findIndex(elem => this.bookingInfoObj.consigneeId == elem.id);
          //   this.consigneeList.splice(findIndex, 1);
          //   this.consigneeList.splice(0, 0, selectedConsignee);
          // }

        }
      }, (err: any) => {
        this.spinner.hide();
      });
  }
  getAllConsigneeWithoutRateCard(type = null) {

    try {
      if (type) {
        this.spinner.show();
      }
      this.$bookingInfo.getAllConeeWithOutRateCard(this.headerData).subscribe((response) => {
        if (response) {
          if (type) {
            this.spinner.hide();
          }
          this.LocalconsigneeList = response;
          this.consigneeList = this.LocalconsigneeList.filter(
            (elem) => elem.addrBook.pincodeId == this.destPincode
          );
          if (this.addConsigneeList.length) {
            this.addConsigneeList.forEach(elem => {
              if (this.destPincode == elem.addrBook.pincodeId) {
                this.consigneeList.splice(0, 0, elem);
              }
            })
          }
          if (this.consigneeList.length) {
            this.consigneeList.sort((a, b) => a.name.localeCompare(b.name));
          }

        }
      });
    } catch (error) {
      this.spinner.hide();
    }
  }
  getAllConsigneeExistingWithRateCard() {

    try {
      this.spinner.show();
      this.$bookingInfo.getAllConeeWithExisting(this.headerData).subscribe((response) => {
        if (response) {
          this.spinner.hide();
          this.LocalconsigneeList = response;
          this.consigneeList = this.LocalconsigneeList.filter(
            (elem) => elem.addrBook.pincodeId == this.destPincode
          );
          // this.consigneeList = response.filter(elem => elem.lkpConsigntypeId == 45 || elem.lkpConsigntypeId == 46);
          if (this.consigneeList.length) {
            this.consigneeList.sort((a, b) => a.name.localeCompare(b.name));
          }
        }

      });
    } catch (error) {
      this.spinner.hide();
    }
  }

  getAllConsigneerWithoutRateCard() {

    try {
      this.$bookingInfo.getAllConrWithOutRateCard(this.headerData).subscribe((response) => {
        if (response) {
          this.consignerList = response;
          this.$bookingInfo.getAllConsignorExistingWithOutRateCard(this.headerData).subscribe((res) => {
            if (res) {
              res.forEach(elem => {
                var isPresent = 0;
                this.consignerList.forEach(elm => {
                  if (elem.id == elm.id) {
                    isPresent = 1;
                  }
                })
                if (isPresent == 0) {
                  this.consignerList.push(elem);
                }
              })
              this.consignerList = [...this.consignerList];
              this.localConsignorList = [...this.consignerList];
              console.log(this.consignerList, 'merge Consignee List')
              this.consignerList.sort((a, b) => a.name.localeCompare(b.name));
            }
          });
        }
      });
    } catch (error) {
      this.spinner.hide();
    }
  }
  getAllConsigneerExistingWithoutRateCard() {
    try {
      this.$bookingInfo.getAllConsignorExistingWithOutRateCard(this.headerData).subscribe((response) => {
        if (response) {
          this.consignerList = response;
          this.consignerList.sort((a, b) => a.name.localeCompare(b.name));
        }
      });
    } catch (error) {
      this.spinner.hide();
    }
  }
  addNcvDetailsRow() {

    this.bookingInfoObj.invoiceList.push({
      invoiceNumber: "",
      invoiceDate: "",
      invoiceAmount: "",
      status: 1
    });
  }

  openStickerPrint() {
    this.dialog.open(StickerPrintComponent, {
      width: "60rem",
      panelClass: "bookingDialog",
    });
  }
  openEmailModal() {
    console.log('here you clicked')
    var dialog = this.dialog.open(AddEmailComponent, {
      width: "100rem",
      panelClass: "bookingDialog",
    });
    dialog.afterClosed().subscribe((res: any) => {
      if (res) {
        // this.sendEmail(res);
      }
    });
  }
  addProductRowByDefault() {
    let presentVal = 0;
    this.bookingInfoObj.packageList.forEach(elem => {
      if (this.isProductIndex == elem.productId) {
        presentVal = 1;
      }
    })
    if (presentVal == 0) {
      let isPresent = this.selectedProductCategoryCardList.find(
        (elem) => elem.checked == true
      );
      this.bookingInfoObj.packageList.splice(0, 0, {
        productCategoryId: this.categoryListWithAlisList[0].id,
        packTypeLookupId: this.packageTypeId,
        lbhUomLookupId: this.bookingInfoObj.lbhUomLookupId,
        tempId: this.makeid(),
        productId: this.isProductIndex
      });
      if (isPresent) {
        this.bookingInfoObj.packageList[0].alias = isPresent.alias ? isPresent.alias : '';
      }
    }
  }


  changeProductIndex() {

    this.selectedProduct.forEach((elem, index) => {
      if (index == 0) {
        elem.checked = true;
        this.isProductIndex = elem.id;
      } else {
        elem.checked = false;
      }
    });
    if (this.bookingInfoObj.packageList) {
      this.addProductRowByDefault();
    }
    if (this.bookingInfoObj.packageList) {
      if (this.bookingInfoObj.packageList.length) {
        let isnotpresent = this.bookingInfoObj.packageList.findIndex(
          (elem) =>
            this.selectedProduct.findIndex(
              (elm) => elm.id == elem.productId
            ) == -1
        );
        if (isnotpresent != -1) {
          this.bookingInfoObj.packageList.splice(isnotpresent, 1);
        }
      }
    }
  }
  getFilterProductCategory(product, i) {
    console.log('getFilterProductCategory**********', product);
    if (this.fieldsetDisabled == false) {
      this.isProductIndex = product.id;
      // if( this.selectedInboundPackageType == false){
      //   this.packageTypeId = "";
      // }
      if (this.isPeaceType == true) {

        this.selectedProduct.forEach((elem, index) => {
          if (elem.id == product.id) {
            elem.checked = true;
          } else {
            elem.checked = false;
          }
        });
      }
      else {
        console.log('inside else *************', this.bookingInfoObj.packageList)
        if (this.bookingInfoObj.packageList) {
          let presentVal = 0
          this.bookingInfoObj.packageList.forEach(elem => {
            if (product.id == elem.productCategoryId) {
              presentVal = 1;
            }
          })
          console.log('present *************', presentVal)

          if (presentVal == 0) {
            this.bookingInfoObj.packageList.push({
              productCategoryId: product.id,
              packTypeLookupId: this.packageTypeId,
              lbhUomLookupId: this.bookingInfoObj.lbhUomLookupId,
              alias: product.packAlias ? product.packAlias : '',
              tempId: this.makeid(),
            });
          }
        }
        console.log('selectedProductCategoryCardList *************', this.selectedProductCategoryCardList)

        this.selectedProductCategoryCardList.forEach((elem, index) => {
          if (elem.id == product.id) {
            elem.checked = true;
          } else {
            elem.checked = false;
          }
        });
      }
      this.productCatIsChacked = false;
      if (this.bookingInfoObj.packageList != undefined) {
        if (this.bookingInfoObj.packageList.length) {
          if (this.bookingInfoObj.packageList[i].packTypeLookupId) {
            this.packageTypeId = this.bookingInfoObj.packageList[i].packTypeLookupId;
          }
        }
        if (this.bookingInfoObj.waybillId && this.isPeaceType == false) {
          this.bookingInfoObj.packageList.forEach((ellem) => {
            if (ellem.productCategoryId == product.id) {
              this.packageTypeId = ellem.packTypeLookupId;
            }
          });
        }
      }
      this.allLookupList.forEach((elem) => {
        if (this.bookingInfoObj.rateCardTypeLookupId == elem.id && elem.lookupVal.trim() == 'RETAIL') {
          this.isEditCheck = true;
        }
      });
    }

  }
  addPackageDetailsRow() {

    if (this.fieldsetDisabled == false) {
      let isPresent = this.selectedProductCategoryCardList.find(
        (elem) => elem.checked == true
      );
      let ProductPresent = this.ProductList.find((elem) => elem.checked == true);
      if ((ProductPresent)) {
        this.bookingInfoObj.packageList.splice(0, 0, {
          productCategoryId: this.categoryListWithAlisList[0].id,
          packTypeLookupId: this.packageTypeId,
          lbhUomLookupId: this.bookingInfoObj.lbhUomLookupId,
          tempId: this.makeid(),
          productId: ProductPresent.id
        });
        if (isPresent) {
          this.bookingInfoObj.packageList[0].alias = isPresent.alias ? isPresent.alias : '';
        }
      } else if (isPresent) {
        var tempList = [];
        if (this.bookingInfoObj.packageList != undefined) {
          if (this.bookingInfoObj.packageList.length) {
            tempList = [...this.bookingInfoObj.packageList];
          }
        }
        tempList.push({
          productCategoryId: isPresent.id,
          packTypeLookupId: this.packageTypeId,
          lbhUomLookupId: this.bookingInfoObj.lbhUomLookupId,
          alias: isPresent.packAlias ? isPresent.packAlias : '',
          tempId: this.makeid(),
        });
        this.bookingInfoObj.packageList = [...tempList];
      }
    }

  }

  makeid(length = 5) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  deletePackageInfoRow(index) {

    if (this.fieldsetDisabled == false) {
      this.bookingInfoObj.packageList.splice(index, 1);
    }

  }
  deleteProductCategory(product, index) {

    if (this.fieldsetDisabled == false) {
      if (this.selectedProductCategoryList.length) {
        this.selectedProductCategoryCardList.splice(index, 1);
        this.selectedProductCategoryList = [
          ...this.selectedProductCategoryCardList,
        ];
        this.categoryListWithAlisList = [...this.categoryListWithAlisList];
        if (this.bookingInfoObj.packageList.length) {
          let ispresent = this.bookingInfoObj.packageList.filter(
            (elem) => elem.productCategoryId != product.id
          );
          this.bookingInfoObj.packageList = [...ispresent];
        }
        if (this.selectedProductCategoryList.length == 1) {
          this.selectedProductCategoryList[0].checked = true;
          this.isProductIndex = this.selectedProductCategoryList[0].id;
        }
        else {
          let checkedIndex = this.selectedProductCategoryList.findIndex(elem => elem.checked == true);
          if (checkedIndex == undefined || checkedIndex == -1) {
            this.selectedProductCategoryList[0].checked = true;
            this.isProductIndex = this.selectedProductCategoryList[0].id;
            return this.getFilterProductCategory(this.selectedProductCategoryList[0], 0);
          }
        }
      }
      if (!Array.isArray(this.selectedProductCategoryList)) {

        this.selectedProductCategoryList = '';
        this.selectedProductCategoryCardList = [];
        this.bookingInfoObj.packageList = [];
      }
    }

  }
  deleteProduct(product, index) {

    if (this.fieldsetDisabled == false) {
      if (this.selectedProduct.length) {
        this.selectedProduct.splice(index, 1);
        this.selectedProduct = [
          ...this.selectedProduct
        ];
        this.ProductList = [...this.ProductList];
        if (this.bookingInfoObj.packageList.length) {
          let ispresent = this.bookingInfoObj.packageList.filter(
            (elem) => elem.productId != product.id
          );
          this.bookingInfoObj.packageList = [...ispresent];
        }
        if (this.selectedProduct.length == 1) {
          this.isProductIndex = this.selectedProduct[0].id;
          this.selectedProduct[0].checked = true;
        }
        else {
          let checkedIndex = this.selectedProduct.findIndex(elem => elem.checked == true);
          if (checkedIndex == undefined || checkedIndex == -1) {
            this.isProductIndex = this.selectedProduct[0].id;
            this.selectedProduct[0].checked = true;
            return this.getFilterProductCategory(this.selectedProduct[0], 0);
          }
        }
      }
    }

  }

  deleteInvoiceInfoRow(index) {
    if (this.fieldsetDisabled == false) {
      this.bookingInfoObj.invoiceList.splice(index, 1);
    }
  }
  addProductCategoryInCardList(selectedProductCategory) {

    if (this.bookingInfoObj.packageList && this.bookingInfoObj.packageList.length && Array.isArray(selectedProductCategory)) {
      let isnotpresent = this.bookingInfoObj.packageList.findIndex(
        (elem) =>
          selectedProductCategory.findIndex(
            (elm) => elm.id == elem.productCategoryId
          ) == -1
      );
      if (isnotpresent != -1) {
        this.bookingInfoObj.packageList.splice(isnotpresent, 1);
      }
    }
    if (Array.isArray(selectedProductCategory)) {
      selectedProductCategory.forEach((elem, index) => {
        if (index == 0) {
          elem.checked = true;
          this.isProductIndex = elem.id;
        } else {
          elem.checked = false;
        }
      });
      this.selectedProductCategoryCardList = [...selectedProductCategory];
      if (this.bookingInfoObj.packageList) {
        let presentVal = 0
        this.bookingInfoObj.packageList.forEach(elem => {
          if (this.selectedProductCategoryCardList[0].id == elem.productCategoryId) {
            presentVal = 1;
          }
        })
        if (presentVal == 0) {
          this.bookingInfoObj.packageList.push({
            productCategoryId: this.selectedProductCategoryCardList[0].id,
            packTypeLookupId: this.packageTypeId,
            lbhUomLookupId: this.bookingInfoObj.lbhUomLookupId,
            alias: this.selectedProductCategoryCardList[0].packAlias ? this.selectedProductCategoryCardList[0].packAlias : '',
            tempId: this.makeid(),
          });
        }
      }
    }
    else {
      this.selectedProductCategoryCardList = [];
      if (this.bookingInfoObj.waybillId && this.isEditCheck) {
        this.bookingInfoObj.packageList = [];
      }
      else {
        this.bookingInfoObj.packageList = [];
      }
      selectedProductCategory = this.categoryListWithAlisList.find(elem => elem.localId == selectedProductCategory);
      this.selectedProductCategoryCardList.push(selectedProductCategory);
      if (this.isPeaceType == false) {
        this.getFilterProductCategory(selectedProductCategory, 0);
      }
    }
    // let isnotpresent = this.bookingInfoObj.packageList.findIndex(elem => selectedProductCategory.findIndex(elm => elm.id == elem.productCategoryId) == -1);
    // if (isnotpresent != -1) {
    //     this.bookingInfoObj.packageList.splice(isnotpresent, 1)
    // }
    // isPresent.forEach(element => {
    //     this.bookingInfoObj.packageList.push({
    //         productCategoryId: element.id
    //     })
    // });
  }

  // getTotalWeight() {
  //   
  //   this.bookingInfoObj.packageList.forEach((element) => {
  //     if(element.actualWeight){
  //       this.bookingInfoObj.actualWeight =
  //       parseInt(this.bookingInfoObj.actualWeight) +
  //       parseInt(element.actualWeight);
  //     }

  //   });
  // }
  // getTotalNoOfPackage() {
  //   
  //   this.bookingInfoObj.totalPackageCount = 0;
  //   this.bookingInfoObj.packageList.forEach((element) => {
  //     if(element.numOfPackage){
  //       this.bookingInfoObj.totalPackageCount =
  //       parseInt(this.bookingInfoObj.totalPackageCount) +
  //       parseInt(element.numOfPackage);
  //     }
  //   });
  // }

  // getWaybillDetailsById(waybillId) {
  //   
  //   this.$bookingInfo.getWaybillDetails(waybillId).subscribe((response) => {
  //     if (response) {
  //       this.waybillDetailList = response;
  //       this.bookingInfoObj.waybillNumber = response.waybillNumber;
  //     }
  //   });
  // }
  isEditCheck = false;

  getBranchHub(hubDeliveryBranchId) {
    this.$bookingInfo.getbranchDetail([hubDeliveryBranchId], this.headerData).subscribe(res => {
      console.log(res)

      this.hubflagList = [
        { "name": "Yes", id: 1, "checked": true },
        { "name": "No", id: 0, "checked": false }
      ]
      this.hubList = [...res];
      this.searchtext = hubDeliveryBranchId;
      this.hubList["branchId"] = this.hubList[0].branchId;
      // this.bookingInfoObj.hubDeliveryBranchId = this.hubList[0].branchId;
    });
  }
  // getConsigneeDetailByid(id) {
  //   this.$bookingInfo.getConsignorConsigneeById(id).subscribe(
  //     (resp) => {
  //       console.log('resp', resp)
  //       this.consigneeDetails = resp;
  //       this.getConsigneePincode(this.consigneeDetails.addrBook.pincodeId);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   )
  // }
  // getConsignorDetailByid(id) {
  //   this.$bookingInfo.getConsignorConsigneeById(id).subscribe(
  //     (resp) => {
  //       console.log('resp getConsignorDetailByid', resp)
  //       this.consignorDetails = resp;
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   )
  // }
  consigneePinDetails;
  consignorPinDetails;



  getConsigneeDetailByid(id) {
    this.$bookingInfo.getConsignorConsigneeById(id).subscribe(
      (resp) => {
        // console.log('resp', resp)
        this.consigneeDetails = resp;
        if (this.consigneeDetails.addrBook) {
          if (this.consigneeDetails.addrBook.pincodeId) {
            this.getConsigneePinDetails(this.consigneeDetails.addrBook.pincodeId);
            this.getConsigneePincode(this.consigneeDetails.addrBook.pincodeId);
          }
        }
      },
      (err) => {
        console.log(err);
      }
    )
  }
  getConsignorDetailByid(id) {
    this.$bookingInfo.getConsignorConsigneeById(id).subscribe(
      (resp) => {
        // console.log('resp', resp)
        this.consignorDetails = resp;
        if (this.consignorDetails.addrBook) {
          if (this.consignorDetails.addrBook.pincodeId) {
            this.getConsignorPinDetails(this.consignorDetails.addrBook.pincodeId);
          }
        }
      },
      (err) => {
        console.log(err);
      }
    )
  }
  getConsignorPinDetails(code) {
    this.$bookingInfo.getPincodeIdByPincode(code, this.headerData).subscribe(
      (response) => {
        console.log('response getConsignorPinDetails', response);
        this.getConsignorPinIdDetails(response[0].id)
      })
  }
  getConsignorPinIdDetails(id) {
    this.$bookingInfo.getPincodeByPincodeId(id, this.headerData).subscribe(resp => {
      console.log('pin consignor responseeeeeeeeeeee', resp);
      this.consignorPinDetails = resp;

      // this.consignorPinDetails = resp.data.responseData;
    })
  }

  getConsigneePinDetails(code) {
    console.log('resp getConsigneeDetailByid getConsigneeDetailByid getConsigneeDetailByid', code)

    this.$bookingInfo.getPincodeIdByPincode(code, this.headerData).subscribe(
      (response) => {
        console.log('response getConsigneePinDetails', response);
        this.getConsigneePinIdDetails(response[0].id)
      })
  }
  getConsigneePinIdDetails(id) {
    this.$bookingInfo.getPincodeByPincodeId(id, this.headerData).subscribe(resp => {
      console.log('pin consigneeee responseeeeeeeeeeee', resp);
      this.consigneePinDetails = resp;
      // this.consigneePinDetails = resp.data.responseData;
    })
  }

  editWaybillDetails() {

    try {
      var wayBillId = sessionStorage.getItem("waybillId");
      console.log('waybillllllll Idddddddd', wayBillId);
      this.$bookingInfo
        .getWaybillDetailByWaybillId(wayBillId, this.headerData)
        .subscribe((response) => {
          console.log(response);

          if (response) {
            this.bookingInfoObj = response;
            // const consignor = this.bookingInfoObj.consignorId;
            // const consignee = this.bookingInfoObj.consigneeId;
            // this.bookingInfoObj.consignorId = consignee;
            // this.bookingInfoObj.consigneeId = consignor;
            // this.chargeWeight = this.bookingInfoObj.chargeWeight
            // if (this.bookingInfoObj.autoWaybill) {
            //   this.bookingInfoObj.waybillNumber = ''
            // }
            this.checkBookingMannualOrAuto();

            // this.bookingInfoObj.hubDeliveryFlag = 0;
            // const updatedOffering = sessionStorage.getItem('updatedServiceOffering');
            // console.log('update offering', updatedOffering);
            // if (updatedOffering) {
            //   this.bookingInfoObj.serviceOfferingId = Number(updatedOffering);
            // }
            if (this.bookingInfoObj.consigneeId) {
              this.getConsigneeDetailByid(this.bookingInfoObj.consigneeId);
            }
            if (this.bookingInfoObj.consignorId) {
              this.getConsignorDetailByid(this.bookingInfoObj.consignorId);
            }
            this.editScreen = true;
            this.selectedType = 1;
            this.selectedValue = 'PRC';
            this.bookingInfoObj.branchMOPLookupId = response.branchMOPLookupId;
            if (this.bookingInfoObj.waybillId) {
              let mopDetails = this.mopList.find(elem => elem.branchMOPLookupId == this.bookingInfoObj.branchMOPLookupId)
              if (mopDetails) {
                this.selectedMopName = mopDetails.branchMOPValue;
              }
            }
            this.isCreditCheck = false;
            this.contractOption = 2;
            let business_type = {} as any;
            let isRetailCheck = 0;
            business_type = this.allLookupList.find(elem => elem.lookupTypeVal.trim() == "BIZ_TYPE" &&
              this.bookingInfoObj.businessTypeLookupId == elem.id);
            this.allLookupList.forEach((elem) => {
              if (elem.lookupVal.trim() == "CREDIT" &&
                this.bookingInfoObj.custTypeLookupId == elem.id) {
                this.isCreditCheck = true;
                this.contractOption = 1;
                this.selectedValue = 'SFX';
                this.MopName = 'CREDIT';
                this.contractType = "CREDIT";
              }
              if (this.bookingInfoObj.rateCardTypeLookupId == elem.id && elem.lookupVal.trim() == 'RETAIL') {
                isRetailCheck = 1;
              }
            });
            console.log(isRetailCheck, 'redsdf')
            if (isRetailCheck == 1) {
              this.getSfxonMop(this.bookingInfoObj.branchMOPLookupId);
              this.MopName = 'RETAIL';
              this.getProductCategoryIdWithoutRateCard();
            }
            this.pdcList.forEach(elem => {
              if (elem.id == this.bookingInfoObj.dodDaccFlag) {
                elem.checked = true;
              }
              else {
                elem.checked = false;
              }
            })

            if (this.bookingInfoObj.sfxPrcContractcode) {
              if (this.bookingInfoObj.msaCustId) {
                this.searchSafexId(this.bookingInfoObj.sfxPrcContractcode);
              }
            }
            // this.getAllConsigneerExistingWithoutRateCard();
            // this.getExistingConsignee();

            if (this.bookingInfoObj.packageList != undefined) {
              if (this.bookingInfoObj.packageList.length) {
                this.bookingInfoObj.packageList.forEach(elem => {
                  if (elem.productId) {
                    this.isPeaceType = true;
                    this.getproductByproductCateId(elem.productCategoryId);
                  }
                })
              }
            }


            if (this.bookingInfoObj.hubDeliveryBranchId) {
              this.getBranchHub(this.bookingInfoObj.hubDeliveryBranchId);
            }
            // this.bookingInfoObj.destPincodeId = this.consignorDetails.addrBook.pincodeId;
            // this.getpincodeDetailsById(this.bookingInfoObj.destPincodeId);
            // this.getpincodeDetailsById(this.consignorDetails.addrBook.pincodeId);


            this.spinner.hide();
            if (this.bookingInfoObj.pickupDate) {
              this.localBookingObj.pickupDate = moment(
                this.bookingInfoObj.pickupDate
              ).format("YYYY-MM-DD");
            }

            if (this.bookingInfoObj.shipmentDate) {
              this.localBookingObj.shipmentDate = moment(
                this.bookingInfoObj.shipmentDate
              ).format("YYYY-MM-DD");
            }
            if (this.bookingInfoObj.pdcDate) {
              this.bookingInfoObj.pdcDate = moment(
                this.bookingInfoObj.pdcDate
              ).format("YYYY-MM-DD");
            }
            if (this.bookingInfoObj.packageList != undefined) {
              this.bookingInfoObj.packageList = [
                ...this.bookingInfoObj.packageList,
              ];
            }
            if (this.bookingInfoObj.consigneeId) {
              // this.consigneeData(this.bookingInfoObj.consigneeId);
            }
            if (this.totalPackages) {
              this.bookingInfoObj.totalPackageCount = this.totalPackages;
            }

            this.localWaybillList = this.bookingInfoObj.invoiceList;
            // this.waybillList = this.bookingInfoObj.invoiceList;
            if (this.bookingInfoObj.invoiceList != undefined) {
              if (this.bookingInfoObj.invoiceList) {
                this.totalWayBill = this.bookingInfoObj.invoiceList.length;
                this.invoiceCost = 0;
                // this.getProductCategoriBycommercialCatId(this.bookingInfoObj.commercialId);
                this.bookingInfoObj.invoiceList.forEach((elem) => {
                  this.invoiceCost =
                    this.invoiceCost + parseInt(elem.invoiceAmount);
                });
              }
            }
            this.bookingInfoObj.dodDaccFlag = 0
            this.spinner.hide();
          } else {
            this.spinner.hide();
          }

        });
    } catch (error) {
      this.spinner.hide();
    }
  }
  isMultiple = false;
  getProductCategoryIdWithoutRateCard() {
    console.log('inside new ratecard offering change 1')

    this.$bookingInfo.getCategory(this.headerData).subscribe((response) => {
      if (response) {
        this.tempcategoryList = response;
        this.$bookingInfo.getProductCategoryByAlis(this.headerData).subscribe((response) => {
          if (response) {
            this.categoryListWithAlisList = response;
            var returnVal;
            this.tempcategoryList.forEach((elem, index) => {
              returnVal = 0;
              this.categoryListWithAlisList.forEach((elm, index) => {
                if (elem.id == elm.prdctCtgyId) {
                  this.categoryListWithAlisList[index].prdctCtgy = elem.prdctCtgy;
                  this.categoryListWithAlisList[index].status = elem.status;
                  this.categoryListWithAlisList[index].effectiveDt =
                    elem.effectiveDt;
                  this.categoryListWithAlisList[index].localId =
                    elem.id + (`${this.categoryListWithAlisList[index].packAlias ? this.categoryListWithAlisList[index].packAlias : ''} `);
                  this.categoryListWithAlisList[index].id = elem.id;
                  this.categoryListWithAlisList[index].expDt = elem.expDt;
                } else {
                  returnVal = 1;
                }
              });
              if (returnVal == 1) { 
                elem.localId = elem.id;
                this.categoryListWithAlisList.push(elem);
                console.log(this.categoryListWithAlisList);
              }
            });
            if (this.bookingInfoObj.waybillId && this.bookingInfoObj.rateCardId) {
              let UniqueList = [];
              this.bookingInfoObj.packageList.forEach((elm,index)=>{
                let returnVal=1;
                this.bookingInfoObj.packageList[index].localId =  
                elm.productCategoryId + (`${this.bookingInfoObj.packageList[index].alias ? this.bookingInfoObj.packageList[index].alias : ''} `);
             
                UniqueList.forEach(elem=>{
                  if(elem.productCategoryId == elm.productCategoryId && elem.alias == elm.alias){
                    returnVal=0;
                  }
                })
                if(returnVal==1){
                  UniqueList.push(elm)
                }
              })
              console.log(UniqueList , 'uniqueproductList');
              // UniqueList = this.bookingInfoObj.packageList.filter((thing, index, self) =>
              //   index === self.findIndex((t) => (
              //     t.productCategoryId === thing.productCategoryId &&  t.alias === thing.alias ? thing.alias : ''
              //   ))
              // )
              if (UniqueList.length > 1) {
                this.selectedProductCategoryList = [];
                // this.isGeneralRetail = true;
                UniqueList.forEach((elm) => {
                  this.categoryListWithAlisList.forEach(elem=>{
                  if(elm.localId == elem.localId){
  this.selectedProductCategoryList.push(elem);
}
                  })

                });
                // this.selectedProductCategoryCardList = [...this.selectedProductCategoryList]

                this.selectedProductCategoryCardList = this.categoryListWithAlisList.filter(
                  (elem) =>
                    this.selectedProductCategoryList.findIndex(
                      (elm) => elm.localId == elem.localId
                    ) != -1
                );
                if (this.selectedProductCategoryCardList.length > 1) {
                  this.isMultiple = true;
                }
              }
              else {
                this.selectedProductCategoryList = '';
                let obj = {} as any;
                if (UniqueList[0].alias) {
                  obj = this.categoryListWithAlisList.find(elem => elem.id == UniqueList[0].productCategoryId && UniqueList[0].alias == elem.packAlias);
                  this.selectedProductCategoryList = obj.localId;
                  this.selectedProductCategoryCardList = this.categoryListWithAlisList.filter(
                    (elem) => this.selectedProductCategoryList == elem.localId && UniqueList[0].alias == elem.packAlias
                  );
                }
                else {
                  obj = this.categoryListWithAlisList.find(elem => elem.id == UniqueList[0].productCategoryId);
                  this.selectedProductCategoryList = obj.localId;
                  this.selectedProductCategoryCardList = this.categoryListWithAlisList.filter(
                    (elem) => this.selectedProductCategoryList == elem.localId
                  );
                  if (this.selectedProductCategoryCardList.length > 1) {
                    this.isMultiple = true;
                  }
                }

              }
              if (this.isPeaceType == false) {
                return this.getFilterProductCategory(this.selectedProductCategoryCardList[0], 0);

              }
            }
          }
        });

      }
    });
  }
  productCategoryType(o1: any, o2: any) {
    if (o2) {
      return o1.id === o2.id;
    }
  }
  compareProduct(o1: any, o2: any) {
    if (o2) {
      return o1.id === o2.id;
    }
  }
  selectedproductCategory: any;
  getcommercialRateCardIdByAlias() {

    if (!this.RateCardList.length && this.bookingInfoObj.consignorId && !this.bookingInfoObj.rateCardId && !this.bookingInfoObj.commercialId && this.selectedProductCategoryCardList && this.bookingInfoObj.serviceOfferingId) {

      if (this.selectedProductCategoryCardList.length == 1) {
        var obj = this.categoryListWithAlisList.find(elem => elem.localId == this.selectedProductCategoryList);


        this.$bookingInfo
          .getCommercialRatecardByalias(
            obj.packAlias ? obj.packAlias : '',
            this.selectedProductCategoryList.id ? this.selectedProductCategoryList.id : obj.id,
            this.bookingInfoObj.consignorId,
            this.bookingInfoObj.serviceOfferingId,
            this.packageTypeId
            , this.headerData
          )
          .subscribe((response) => {
            if (response) {
              var commercialDetalsByAlisa = { ...response };
              if (commercialDetalsByAlisa.ratecardId) {
                if (!this.bookingInfoObj.rateCardId) {
                  this.bookingInfoObj.rateCardId =
                    commercialDetalsByAlisa.ratecardId;
                }

              }
              if (commercialDetalsByAlisa.id) {
                if (!this.bookingInfoObj.commercialId) {
                  this.bookingInfoObj.commercialId = commercialDetalsByAlisa.id;
                }
              }

              this.allLookupList.forEach(element => {
                if (element.lookupTypeVal.trim() == 'BIZ_TYPE' && element.lookupVal.trim() == 'OUTBOUND') {
                  this.bookingInfoObj.businessTypeLookupId = element.id;
                }
                if (element.id == commercialDetalsByAlisa.pricingParamTrans[0].lkpPricingCalcTypeId && element.lookupTypeVal.trim() == "PRICING_CALC_TYPE") {
                  this.unitCalculationType = element.lookupVal
                  if (this.unitCalculationType == "CM") {
                    this.maxLength = 3;
                  }
                  if (this.unitCalculationType == "INCH") {
                    this.maxLength = 2;
                  }
                  else {
                    this.maxLength = 3;
                  }
                  this.bookingInfoObj.lbhUomLookupId = element.id;
                }
              })
            }
          });
      }

    }
  }
  setPackageIdInTable() {
    if (this.bookingInfoObj.packageList) {
      this.bookingInfoObj.packageList.forEach((elem, i) => {
        if (this.isProductIndex == elem.productCategoryId || this.isProductIndex == elem.productId) {
          elem.packTypeLookupId = this.packageTypeId;
        }
      })
    }
  }
  expiryMinDate: any;
  isVar = <boolean>false;
  currentDate = moment(new Date()).format("YYYY-MM-DD");

  checkForExpiryDate(effectiveDate) {
    let todayDate = moment(new Date()).format("YYYY-MM-DD");
    effectiveDate = moment(effectiveDate).format("YYYY-MM-DD");
    if (this.localBookingObj.pickupDate) {
      this.localBookingObj.pickupDate = moment(effectiveDate).format(
        "YYYY-MM-DD"
      );
    }
    if (
      this.localBookingObj.shipmentDate > effectiveDate &&
      this.localBookingObj.shipmentDate > todayDate
    ) {
      this.isVar = false;
    } else if (!this.localBookingObj.id) {
      this.isVar = true;
    }

    if (effectiveDate < todayDate) {
      return (this.expiryMinDate = todayDate);
    }
    return (this.expiryMinDate = moment(effectiveDate, "YYYY-MM-DD")
      .add(1, "d")
      .format("YYYY-MM-DD"));
  }

  removeMinDate(effectiveDate) {
    this.expiryMinDate = moment(effectiveDate).format("YYYY-MM-DD");
  }

  changeDateFormat(effectiveDate, expiryDate) {
    this.isVar = true;
    console.log(effectiveDate);
    if (effectiveDate) {
      this.localBookingObj.pickupDate = moment(effectiveDate).format(
        "YYYY-MM-DD"
      );
    }
    if (expiryDate) {
      this.localBookingObj.shipmentDate = moment(expiryDate).format(
        "YYYY-MM-DD"
      );
    }

    this.checkForExpiryDate(effectiveDate);
  }

  openAmountConfirmationModal() {

    this.bookingInfoObj.invoiceList.forEach((elem, index) => {
      let Amount = 0;
      Amount = parseInt(elem.invoiceAmount);
      this.bookingInfoObj.ewaybillAvailableFlag = 0;
      if (Amount > 50000) {
        var dialog = this.dialog.open(InvoiceAmountConfirmationComponent, {
          width: "55rem",
          panelClass: "bookingDialog",
        });
        dialog.afterClosed().subscribe((response) => {

          if (response === true) {
            return;
          }
          if (response == 1) {
            this.bookingInfoObj.invoiceList = [];
            this.bookingInfoObj.ewaybillAvailableFlag = 1;
            this.destPincode = '';
            this.searchtext = '';
            this.bookingInfoObj.destPincodeId = '';
            this.bookingInfoObj.consigneeId = '';
            this.deleteInvoiceInfoRow(index);
            this.isExpand = true;
            if (!this.isCreditCheck && !this.RateCardList.length) {
              this.bookingInfoObj.packageList = [];
              this.selectedInboundPackageType = false;
              this.selectedProductCategoryCardList = [];
              this.selectedProductCategoryList = [];
              this.selectedProduct = [];
              this.bookingInfoObj.actualWeight = '';
              this.bookingInfoObj.pkgSaidToContain = '';
              this.bookingInfoObj.totalPackageCount = '';
              this.bookingInfoObj.chargeWeight = null;
            }
          }
          this.bookingInfoObj.ewaybillRequirementFlag = 1;
        });
      }
    })
  }
  frieghtChargesList: Array<any> = [];
  geoTypeList: Array<any> = [];
  nonGeoTypeList: Array<any> = [];
  frieghtypeList: Array<any> = [];
  gstPercent = '';
  getFreightCharges() {
    this.$bookingInfo.freightCharges(this.bookingInfoObj.waybillId, this.headerData).subscribe(res => {
      if (res) {
        this.totalCharges = '';
        this.grandCharges = '';
        this.gstPercent = '';
        this.frieghtChargesList = [];
        this.geoTypeList = [];
        this.nonGeoTypeList = [];
        this.frieghtypeList = [];
        this.gstAmount = '';
        this.frieghtChargesList = res.waybillFreightChargeDTOList;
        this.frieghtChargesList.forEach(elem => {
          if (elem.commandmentType) {
            if (elem.commandmentType.trim() == 'GEO') {
              this.geoTypeList.push(elem);
            }
            else if (elem.commandmentType.trim() == 'NON-GEO') {
              this.nonGeoTypeList.push(elem);
            }
          }
          else {
            this.frieghtypeList.push(elem);
          }

        })
        if (res.totalCharges) {
          this.totalCharges = res.totalCharges;
        }
        if (res.grandCharges) {
          this.grandCharges = res.grandCharges
        }
        if (res.gstAmount) {
          this.gstAmount = res.gstAmount
        }
        if (res.gstPercent) {
          this.gstPercent = res.gstPercent
          this.gstPercent = this.gstPercent + '%';
        }
        if (res.discountAmount) {
          this.discountAmount = res.discountAmount;
        }
      }
    })
  }

  updateRequestStatus() {
    this.spinner.show();
    const status = this.allLookupList.find(elem => elem.lookupTypeVal.trim() == "WAYBILL_STATUS" &&
      elem.lookupVal.trim() == "WAYBILL GENERATED");
    if (!this.reqNo) {
      this.reqNo = sessionStorage.getItem('rebookReqNo');
    }
    const body = {
      reScheduleStatus: String(status.id),
      requestNumber: Number(this.reqNo)
    }
    this.$bookingInfo.updateReqNo(body, this.headerData2).subscribe((res: any) => {
      this.spinner.hide();
    }, (err: any) => {
      this.spinner.hide();
    })
  }

  clearPackageDetails() {

    if (this.fieldsetDisabled == false) {

      if (!this.RateCardList.length) {
        this.bookingInfoObj.commercialId = '';
        this.bookingInfoObj.rateCardId = '';
        this.bookingInfoObj.packageList = [];
        this.selectedProductCategoryCardList = [];
        this.selectedProductCategoryList = [];
        this.selectedProduct = [];
        this.bookingInfoObj.actualWeight = '';
        this.packageTypeId = '';
        this.bookingInfoObj.pkgSaidToContain = '';
        this.bookingInfoObj.totalPackageCount = '';
        this.bookingInfoObj.chargeWeight = null;
      }
    }

  }

  consigneeData(consignee) {

    if (this.fieldsetDisabled == false) {
      if (!this.RateCardList.length && this.selectedMopName == 'PAID') {
        this.$bookingInfo.getConsineeDetail(consignee, this.bookingInfoObj.serviceOfferingId).subscribe(res => {
          this.consigneeResp = res;
          if (this.consigneeResp.id !== undefined) {
            this.allLookupList.forEach(el => {
              if (el.id == this.consigneeResp.cntrType) {
                this.lkpBizTypevalue.value = el.lookupVal;
              }
              if (el.id == this.consigneeResp.bookingRatecardDTOList[0].bookingCommercialDTOList[0].lkpChrgById && el.lookupVal.trim() == 'BY PIECE') {
                this.isPeaceType = true;
              }
            })

            var abc = this.allLookupList.find(elem => elem.lookupVal.trim() == this.lkpBizTypevalue.value.trim() && elem.lookupTypeVal.trim() == 'RATE_CARD_TYPE')
            console.log(abc);
            this.bookingInfoObj.rateCardTypeLookupId = abc.id;
            this.bookingInfoObj.custTypeLookupId = this.consigneeResp.cntrType;
            this.bookingInfoObj.businessTypeLookupId = this.consigneeResp.lkpBizTypeId;
            this.bookingInfoObj.commercialId = this.consigneeResp.bookingRatecardDTOList[0].bookingCommercialDTOList[0].id;
            this.bookingInfoObj.rateCardId = this.consigneeResp.bookingRatecardDTOList[0].bookingCommercialDTOList[0].ratecardId;


            // this.dialog.open(ConsigneeModalComponent, {
            //   width: '25vw',
            //   panelClass: 'mat-dialog-responsive',
            //   disableClose: true,
            //   data: this.lkpBizTypevalue
            // });
            return this.refreshInboundDetails()
          }
          else {
            this.allLookupList.forEach(elem => {
              if (elem.lookupTypeVal == 'BIZ_TYPE' && elem.lookupVal == 'OUTBOUND') {
                this.bookingInfoObj.businessTypeLookupId = elem.id;
              }
              if (elem.lookupTypeVal == 'CUST_TYPE' && elem.lookupVal == 'CREDIT+RETAIL') {
                this.bookingInfoObj.custTypeLookupId = elem.id;
              }
              if (elem.lookupTypeVal == 'RATE_CARD_TYPE' && elem.lookupVal == 'RETAIL') {
                this.bookingInfoObj.rateCardTypeLookupId = elem.id;
              }
            })
            this.getAlProductcategoryWithAlis();
            this.selectedInboundPackageType = false;
            this.getpackageList();
          }
        })
      }
    }

  }

  refreshInboundDetails() {
    this.$bookingInfo.getPackage(this.headerData).subscribe((response) => {
      if (response) {
        this.packageList = response;
        let singlePackgeType = [];
        if (this.consigneeResp.bookingRatecardDTOList[0].bookingCommercialDTOList[0].lkpPackTypeId) {
          this.packageList.forEach(elem => {
            if (elem.id == this.consigneeResp.bookingRatecardDTOList[0].bookingCommercialDTOList[0].lkpPackTypeId) {
              singlePackgeType.push(elem);
            }
          })
          this.packageList = [...singlePackgeType];
          this.packageTypeId = singlePackgeType[0].id;
          this.selectedInboundPackageType = true;
        }
        return this.getProductcategoryForInbound();
      }
    });
  }

  getProductcategoryForInbound() {
    this.$bookingInfo
      .getProductCategry(this.consigneeResp.bookingRatecardDTOList[0].bookingCommercialDTOList[0].prdctCtgyId, this.headerData)
      .subscribe((response) => {
        this.spinner.hide();
        if (response) {

          this.categoryListWithAlisList = [...[response]];
          if (response.prdctCtgy.trim() == "GENERAL") {
            this.isPeaceType = false;
            this.categoryListWithAlisList = [...this.tempcategoryList];
          }
          if (this.categoryListWithAlisList.length == 1) {
            this.selectedProductCategoryList = '';
            this.categoryListWithAlisList[0].localId = this.categoryListWithAlisList[0].id + (`${this.consigneeResp.bookingRatecardDTOList[0].bookingCommercialDTOList[0].packAlias ? this.consigneeResp.bookingRatecardDTOList[0].bookingCommercialDTOList[0].packAlias : ''} `);
            this.selectedProductCategoryList = this.categoryListWithAlisList[0].localId;
            this.selectedProductCategoryCardList = [
              ...this.categoryListWithAlisList,
            ];
            if (this.isPeaceType == false) {
              this.getFilterProductCategory(
                this.categoryListWithAlisList[0],
                0
              );

            }
          }
          if (this.isPeaceType) {

            this.productCategoryId = this.categoryListWithAlisList[0].id;
            this.ProductList = [];
            this.allProductList.forEach((elem) => {
              if (elem.prdctCtgyId == this.categoryListWithAlisList[0].id) {
                this.ProductList.push(elem);
              }
            });
            if (this.consigneeResp.bookingRatecardDTOList[0].bookingCommercialDTOList[0].commercialProductMap) {
              if (this.consigneeResp.bookingRatecardDTOList[0].bookingCommercialDTOList[0].commercialProductMap.length) {
                this.ProductList = this.allProductList.filter(elem => this.consigneeResp.bookingRatecardDTOList[0].bookingCommercialDTOList[0].commercialProductMap.findIndex(elm => elm.productId == elem.id) != -1)
                console.log(this.ProductList, 'dfsd sfsd');
              }
            }
            if (this.ProductList.length == 1) {
              this.ProductList[0].checked = true;
              this.isProductIndex = this.ProductList[0].id;
              this.selectedProduct = [...this.ProductList];
              this.addProductRowByDefault();
            }
          }
          // if (this.selectedProductCategoryList) {
          //     let isPresent = this.categoryListWithAlisList.filter(elem => this.selectedProductCategoryList.findIndex(elm => elm.id == elem.id) != -1);
          //     this.selectedProductCategoryCardList = [...isPresent];
          //     return this.getFilterProductCategory(this.selectedProductCategoryCardList[0], null);

          // }
        }


        if (this.bookingInfoObj.waybillId && this.bookingInfoObj.rateCardId) {
          let UniqueList = [];
          if (this.bookingInfoObj.packageList != undefined) {
            UniqueList = this.bookingInfoObj.packageList.filter((thing, index, self) =>
              index === self.findIndex((t) => (
                t.productCategoryId === thing.productCategoryId
              ))
            )
          }
        }
      });
  }

  searchByConsignee() {

    this.p = 1;
    if (!this.localConsigneeList.length) {
      this.localConsigneeList = [...this.consigneeList];
    }
    let isPresent = [];
    this.localConsigneeList.forEach((elem) => {
      if (
        this.searchConsignee.name &&
        this.searchConsignee.gstin &&
        this.searchConsignee.contactNum
      ) {
        if (
          this.searchConsignee.name == elem.name &&
          this.searchConsignee.gstin == elem.gstinNum &&
          this.searchConsignee.contactNum == elem.mob
        ) {
          isPresent.push(elem);
        }
      } else if (this.searchConsignee.name && this.searchConsignee.gstin) {
        if (
          this.searchConsignee.name == elem.name &&
          this.searchConsignee.gstin == elem.gstinNum
        ) {
          isPresent.push(elem);
        }
      } else if (this.searchConsignee.name && this.searchConsignee.contactNum) {
        if (
          this.searchConsignee.name == elem.name &&
          this.searchConsignee.contactNum == elem.mob
        ) {
          isPresent.push(elem);
        }
      } else if (
        this.searchConsignee.gstin &&
        this.searchConsignee.contactNum
      ) {
        if (
          this.searchConsignee.gstin == elem.gstinNum &&
          this.searchConsignee.contactNum == elem.mob
        ) {
          isPresent.push(elem);
        }
      } else if (
        this.searchConsignee.name ||
        this.searchConsignee.gstin ||
        this.searchConsignee.contactNum
      ) {
        if (
          this.searchConsignee.name == elem.name ||
          this.searchConsignee.gstin == elem.gstinNum ||
          this.searchConsignee.contactNum == elem.mob
        ) {
          isPresent.push(elem);
        }
      }
      this.consigneeList = [...isPresent];
      this.consigneeList.sort((a, b) => a.name.localeCompare(b.name));
    });
  }
  searchConsigner(ccType) {

    if (!this.localConsignorList.length) {
      this.localConsignorList = [...this.consignerList];
    }
    this.page1 = 1;
    let isPresent = [];

    if (this.searchCongner.pincode) {
      this.searchCongner.pincode = JSON.parse(this.searchCongner.pincode)
    }
    this.localConsignorList.forEach((elem) => {
      if (
        this.searchCongner.name &&
        this.searchCongner.gstin && this.searchCongner.gstin != '' &&
        this.searchCongner.contactNum &&
        this.searchCongner.pincode
      ) {
        if (
          this.searchCongner.name.trim() == elem.name.trim() &&
          this.searchCongner.gstin.trim() == elem.gstinNum.trim() &&
          this.searchCongner.contactNum == elem.mob && this.searchCongner.pincode == elem.addrBook.pincodeId
        ) {
          isPresent.push(elem);
        }
      }

      else if (
        this.searchCongner.name &&
        this.searchCongner.gstin &&
        this.searchCongner.contactNum
      ) {
        if (
          this.searchCongner.name.trim() == elem.name.trim() &&
          this.searchCongner.gstin.trim() == elem.gstinNum.trim() &&
          this.searchCongner.contactNum.trim() == elem.mob.trim()
        ) {
          isPresent.push(elem);
        }
      }



      else if (
        this.searchCongner.name &&
        this.searchCongner.gstin && this.searchCongner.gstin != '' &&
        this.searchCongner.pincode
      ) {
        if (
          this.searchCongner.name.trim() == elem.name.trim() &&
          this.searchCongner.gstin.trim() == elem.gstinNum.trim()
          && this.searchCongner.pincode == elem.addrBook.pincodeId
        ) {
          isPresent.push(elem);
        }
      }



      else if (
        this.searchCongner.name &&
        this.searchCongner.contactNum &&
        this.searchCongner.pincode
      ) {
        if (
          this.searchCongner.name.trim() == elem.name.trim() &&
          this.searchCongner.contactNum.trim() == elem.mob.trim()
          && this.searchCongner.pincode == elem.addrBook.pincodeId
        ) {
          isPresent.push(elem);
        }
      }



      else if (
        this.searchCongner.name &&
        this.searchCongner.gstin && this.searchCongner.gstin != ''
      ) {
        if (
          this.searchCongner.name.trim() == elem.name.trim() &&
          this.searchCongner.gstin.trim() == elem.gstinNum.trim()
        ) {
          isPresent.push(elem);
        }
      }



      else if (
        this.searchCongner.name &&
        this.searchCongner.contactNum
      ) {
        if (
          this.searchCongner.name.trim() == elem.name.trim() &&
          this.searchCongner.contactNum.trim() == elem.mob.trim()
        ) {
          isPresent.push(elem);
        }
      }
      else if (
        this.searchCongner.name &&
        this.searchCongner.pincode
      ) {
        if (
          this.searchCongner.name.trim() == elem.name.trim() && this.searchCongner.pincode == elem.addrBook.pincodeId
        ) {
          isPresent.push(elem);
        }
      }
      else if (
        this.searchCongner.name ||
        (this.searchCongner.gstin) ||
        this.searchCongner.contactNum || this.searchCongner.pincode
      ) {
        if (
          this.searchCongner.name.trim() == elem.name.trim() ||
          (this.searchCongner.gstin == elem.gstinNum && this.searchCongner.gstin != '') ||
          this.searchCongner.contactNum.trim() == elem.mob.trim() ||
          this.searchCongner.pincode == elem.addrBook.pincodeId
        ) {
          isPresent.push(elem);
        }
      }
      this.consignerList = [...isPresent];
      this.consignerList.sort((a, b) => a.name.localeCompare(b.name));

    });
  }

  removeactualWaight() {

    if (this.bookingInfoObj.actualWeight == 0 && this.bookingInfoObj.actualWeight) {
      this.bookingInfoObj.actualWeight = ''
    }
  }
  removeNpOfPackage() {
    if (this.bookingInfoObj.totalPackageCount == 0 && this.bookingInfoObj.totalPackageCount) {
      this.bookingInfoObj.totalPackageCount = '';
    }
  }
  removeLength() {
    this.bookingInfoObj.packageList.forEach(elem => {
      if (elem.actualWeight == 0 && elem.actualWeight) {
        elem.actualWeight = ''
      }
    })
  }
  removeWidth() {
    this.bookingInfoObj.packageList.forEach(elem => {
      if (elem.pkgBreadth == 0 && elem.pkgBreadth) {
        elem.pkgBreadth = ''
      }
    })
  }
  removeHeight() {
    this.bookingInfoObj.packageList.forEach(elem => {
      if (elem.pkgHeight == 0 && elem.pkgHeight) {
        elem.pkgHeight = ''
      }
    })
  }
  removeChargeWeight() {
    if (this.bookingInfoObj.chargeWeight == 0 && this.bookingInfoObj.chargeWeight) {
      this.bookingInfoObj.chargeWeight = null
    }
  }
  removeByPeace() {
    this.bookingInfoObj.packageList.forEach(elem => {
      if (elem.numOfPieces == 0 && elem.numOfPieces) {
        elem.numOfPieces = ''
      }
    })
  }
  removeNoOfPackageTable() {
    this.bookingInfoObj.packageList.forEach(elem => {
      if (elem.numOfPackage == 0 && elem.numOfPackage) {
        elem.numOfPackage = ''
      }
    })
  }
  removeActualWaightTable() {
    this.bookingInfoObj.packageList.forEach(elem => {
      if (elem.actualWeight == 0 && elem.actualWeight) {
        elem.actualWeight = ''
      }
    })

  }
  selectedCommercial;
  getCommercials() {
    console.log('getCommercials', this.bookingInfoObj.rateCardId);
    this.$bookingInfo
      .getCommercialById(this.bookingInfoObj.rateCardId, this.contractType, this.headerData).subscribe((res: any) => {
        console.log('get commercials', res);
        const commercialData = res.responseData;
        this.selectedCommercial = commercialData.find(elem => elem.id === this.bookingInfoObj.commercialId);
        // this.selectedCommercial = selectCommercial;
        console.log('selectedCommercial', this.selectedCommercial);
        this.offeringChange();
        // this.spinnerService.hide();
      }, (err: any) => {
        // this.spinnerService.hide();
      })
  }
  offeringChange() {
    // const val = +this.actionForm.controls.serviceOfferingId.value;
    // console.log('val', val);
    // console.log('this.details.reScheduleBookingDetailsDTO.serviceOfferingId', this.details.reScheduleBookingDetailsDTO.serviceOfferingId);
    console.log('selected commercial', this.selectedCommercial);
    // if (!this.waybillData.sfxPrcContractcode || this.waybillData.sfxPrcContractcode === '') {
    //   return;
    // }
    // this.spinnerService.show();
    const body = {
      chargeById: this.selectedCommercial.lkpChrgById,
      contractId: this.bookingInfoObj.prcCntrId,
      contractType: this.contractType,
      productCategoryId: this.selectedCommercial.prdctCtgyId,
      serviceOfferingId: this.bookingInfoObj.serviceOfferingId,
    }
    this.commonService.getRateCardsByCriteria(body).subscribe((res: any) => {
      console.log('response', res);
      if (res) {
        const response = res;
        if (response.length > 0) {
          this.getRateCardNew(response);
        }
      }

    }, (err: any) => {

    })
  }

  getRateCardNew(data) {
    console.log('inside getRateCardNew************')
    this.bookingInfoObj.rateCardId = null;
    this.bookingInfoObj.commercialId = null;

    if (data) {
      var TotalRateCard = [];
      var isPrcRateCard = [];
      this.RateCardList = [];
      this.commercialTypeList = [];
      this.bookingInfoObj.businessTypeLookupId = this.sfxObj.lkpBizTypeId;
      TotalRateCard = data;
      console.log('TotalRateCard', TotalRateCard)

      if (this.isCreditCheck == false) {
        isPrcRateCard = data.filter(elem =>
          (this.selectedMopName.trim() == 'PAID' && elem.paidFlag == 1) || (this.selectedMopName.trim() == 'TO-PAY') || (this.selectedMopName.trim() == 'FOC'))
        // isPrcRateCard= response.filter(elem => this.mopList.findIndex(elm => (this.bookingInfoObj.branchMOPLookupId==elm.branchMOPLookupId && elem.paidFlag==1) || (this.bookingInfoObj.branchMOPLookupId==elm.branchMOPLookupId && elem.toPayFlag==1) || ( this.bookingInfoObj.branchMOPLookupId==elm.branchMOPLookupId && elem.focFlag==1 )) != -1);
        console.log('this.selectedMopName.trim() ', this.selectedMopName.trim());
        console.log('this.selectedMopName.trim() ', this.selectedMopName.trim());

        console.log('isPrcRateCard', isPrcRateCard)
        if (isPrcRateCard.length) {
          TotalRateCard = [...isPrcRateCard];
        }
        else {
          this.checkMopRateCardAvailable(TotalRateCard);
          // this.bookingInfoObj.serviceOfferingId = '';
          this.serviceOfferingList = [];
          TotalRateCard = [];
        }
      }

      if (this.bookingInfoObj.serviceOfferingId && this.bookingInfoObj.waybillId) {
        var contract = this.serviceOfferingReferenceList.find(
          (elem) =>
            elem.serviceOfferingId == this.bookingInfoObj.serviceOfferingId
        );
        console.log('inside here 2')

        if (contract) {
          console.log('inside here 2', contract)
          console.log('total rate rards', TotalRateCard)

          TotalRateCard.forEach((elem) => {
            if (contract.id == elem.offeringId) {
              this.RateCardList.push(elem);
            }
          });
        }
        console.log('inside here 2', this.RateCardList);

      }
      else {
        let abc = [];
        var unique = [];
        for (let i = 0; i < TotalRateCard.length; i++) {
          if (!unique[TotalRateCard[i].offeringId]) {
            abc.push({ offering: TotalRateCard[i].offeringId });
            unique[TotalRateCard[i].offeringId] = 1;
          }
        }
        let isPresent = [];
        this.serviceOfferingReferenceList.forEach((elem) => {
          abc.forEach((elm) => {
            if (elm.offering == elem.id) {
              isPresent.push(elem);
            }
          });
        });
        this.serviceOfferingReferenceList = [...isPresent];
        //  let contract1=[];
        //   isPresent.forEach((elm) => {
        //   this.serviceOfferingList.forEach((elem) => {
        //       if (elm.serviceOfferingId == elem.id) {
        //         contract1.push(elem);
        //         contract1=[...contract];
        //       }
        //     });
        //   });

        var contract1 = this.serviceOfferingList.filter(elem => isPresent.findIndex(elm => elm.serviceOfferingId == elem.id) != -1);
        console.log(contract1);

        this.serviceOfferingList = [...contract1];
        if (!this.bookingInfoObj.serviceOfferingId) {
          this.serviceOfferingList.forEach((elem) => {
            if (elem.value == "SURFACE") {
              this.bookingInfoObj.serviceOfferingId = elem.id;
            }
            this.serviceOfferingName = 'SURFACE';
          });
        }
      }

      if (this.serviceOfferingList.length == 1) {
        this.bookingInfoObj.serviceOfferingId = this.serviceOfferingList[0].id;
      }
      if (!this.bookingInfoObj.waybillId) {
        var contractId = this.serviceOfferingReferenceList.filter(
          (elem) =>
            elem.serviceOfferingId == this.bookingInfoObj.serviceOfferingId
        );
        if (contractId.length) {
          console.log('inside here 1')
          TotalRateCard.forEach((elem) => {
            if (contractId) {
              if (contractId[0].id == elem.offeringId) {
                this.RateCardList.push(elem);
              }
              console.log('inside here 1', this.RateCardList)

            }
          });
        }
      }
      if (this.sfxObj.msaCustId) {
        this.bookingInfoObj.msaCustId = this.sfxObj.msaCustId;
      }
      console.log('this.bookingInfoObj.waybillId ', this.bookingInfoObj.waybillId);
      console.log('this.bookingInfoObj.rateCardId ', this.bookingInfoObj.rateCardId);

      if (this.bookingInfoObj.waybillId && this.bookingInfoObj.rateCardId) {
        return this.getCommercialByRateCard(this.bookingInfoObj.rateCardId);
      }
      if (this.RateCardList.length == 1) {
        this.getCommercialByRateCard(this.RateCardList[0].id);
      }
    }
  }

  getProductCategoryIdWithoutRateCardOfferingChange() {
    console.log('getProductCategoryIdWithoutRateCard***********');
    this.$bookingInfo.getCategory(this.headerData).subscribe((response) => {
      console.log('getCategory**********', response);
      if (response) {
        this.tempcategoryList = response;
        this.$bookingInfo.getProductCategoryByAlis(this.headerData).subscribe((response) => {
          console.log('getProductCategoryByAlis********', response);
          if (response) {
            this.categoryListWithAlisList = response;
            var returnVal;
            this.tempcategoryList.forEach((elem, index) => {
              returnVal = 0;
              this.categoryListWithAlisList.forEach((elm, index) => {
                if (elem.id == elm.prdctCtgyId) {
                  this.categoryListWithAlisList[index].prdctCtgy = elem.prdctCtgy;
                  this.categoryListWithAlisList[index].status = elem.status;
                  this.categoryListWithAlisList[index].effectiveDt =
                    elem.effectiveDt;
                  this.categoryListWithAlisList[index].localId =
                    elem.id + (`${this.categoryListWithAlisList[index].packAlias ? this.categoryListWithAlisList[index].packAlias : ''} `);
                  this.categoryListWithAlisList[index].id = elem.id;
                  this.categoryListWithAlisList[index].expDt = elem.expDt;
                } else {
                  returnVal = 1;
                }
              });
              if (returnVal == 1) {
                elem.localId = elem.id;
                this.categoryListWithAlisList.push(elem);
                // console.log(this.categoryListWithAlisList);
              }
            });
            this.getcommercialRateCardIdByAliasOfferingChange();
          }
        });

      }
    });
  }
  getcommercialRateCardIdByAliasOfferingChange() {

    var selectedProductId = this.bookingInfoObj.packageList[0].productCategoryId
    let packType = this.bookingInfoObj.packageList[0].packTypeLookupId
    var obj = this.categoryListWithAlisList.find(elem => elem.id == selectedProductId);
    console.log('selectedProductId', selectedProductId);
    console.log('obj', obj)


    this.$bookingInfo
      .getCommercialRatecardByalias(
        obj.packAlias ? obj.packAlias : '',
        selectedProductId ? selectedProductId : obj.id,
        this.bookingInfoObj.consignorId,
        this.bookingInfoObj.serviceOfferingId,
        packType
        , this.headerData
      )
      .subscribe((response) => {
        console.log('inside response');
        if (response) {
          var commercialDetalsByAlisa = { ...response };
          if (commercialDetalsByAlisa.ratecardId) {
            if (!this.bookingInfoObj.rateCardId) {
              this.bookingInfoObj.rateCardId =
                commercialDetalsByAlisa.ratecardId;
            }

          }
          if (commercialDetalsByAlisa.id) {
            if (!this.bookingInfoObj.commercialId) {
              this.bookingInfoObj.commercialId = commercialDetalsByAlisa.id;
            }
          }
          console.log('this.bookingInfoObj.rateCardId', this.bookingInfoObj.rateCardId);
          console.log('this.bookingInfoObj.commercialId', this.bookingInfoObj.commercialId);
          if (this.bookingInfoObj.rateCardId) {
            // this.spinner.show();
            this.getProductCategoryIdWithoutRateCard();
          }

        }
      });

  }
}

export interface PeriodicElement {
  radio: string;
  name: string;
  address: string;
  contact: number;
}

export interface PeriodicElement1 {
  radio: string;
  name: string;
  address: string;
  contact: number;
  height: number;
}

export interface PeriodicElement2 {
  radio: string;
  name: string;
  address: string;
}


const ELEMENT_DATA_2: PeriodicElement2[] = [
  { radio: "", name: "Consignor", address: "Plot No. 45, manesar" },
  { radio: "", name: "Consignor", address: "Plot No. 45, manesar" },
];