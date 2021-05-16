import { ModeOfPaymentValidateComponent } from './../../dialog/mode-of-payment-validate/mode-of-payment-validate.component';
import { InvoiceAmountConfirmationComponent } from './../../dialog/invoice-amount-confirmation/invoice-amount-confirmation.component';
import * as moment from "moment";
import { NgxSpinnerService } from "ngx-spinner";
import { BranchService } from 'src/app/core/service/branch.service';
import { BookingInformationService } from "./../../core/service/booking-information.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AddNewConsigneeComponent } from "src/app/dialog/add-new-consignee/add-new-consignee.component";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { EwaybillNumberComponent } from "src/app/dialog/ewaybill-number/ewaybill-number.component";
import { StickerPrintComponent } from "src/app/dialog/sticker-print/sticker-print.component";
import { AppComponent } from "src/app/app.component";
import { SearchCustomerComponent } from 'src/app/dialog/search-customer/search-customer.component';
import { AppSetting } from '../../app.setting';
import { OpenBookingService } from 'src/app/core/service/open-booking.service';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/core/common.service';
import { DateUtilService } from 'src/app/core/util/date-util.service';
import { ProductConfirmationComponent } from 'src/app/dialog/product-confirmation/product-confirmation.component';
import { AddEmailComponent } from 'src/app/dialog/add-email/add-email.component';
import { WaybillService } from 'src/app/core/service/waybill.service';

@Component({
  selector: 'app-create-initiate-waybill',
  templateUrl: './create-initiate-waybill.component.html',
  styleUrls: ['./create-initiate-waybill.component.scss']
})
export class CreateInitiateWaybillComponent implements OnInit {

 @ViewChild("step1", null) consigneeInfo: any;
  @ViewChild("step2", null) packageInfo: any;
  lastDayEndDate = sessionStorage.getItem('lastDayEndDate');
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
  grandTotalCharges:any=0;
  totalCharges: any = 0;
  discountClosebtn: boolean = false;
  editMode: boolean = false;
  contractOption = 3;
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
  tempPackageList : Array<any> = [];
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
  isProductIndex;
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
  ExamptFalse:boolean=false;
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
  changevalue : boolean = false;
  isCreditCheck: boolean = true;
  isWaybillDisable: boolean = false;
  isFrieghtExpand: boolean = false;
  selectedInboundPackageType: boolean = false;
  isInvoiceCommercial: boolean = false;
  fieldsetDisabled: boolean = false;
  isGeneralRetail:boolean=false;
  packTypeSearch: string = "";
  addProductSearch: string = "";
  unitCalculationType: string = "";
  serviceOfferCtrl: string = "";
  selectedMopName: string = "";
  addProductCategorySearch: string = "";
  destPincode;
  UnitOfMeasurement;
  isCommercialRequired: boolean = false;
  isDiscountAllowed: boolean = false;
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
  isMandatoryField :boolean = false;
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
  retailGeneralproductcategory:any;

  constructor(
    private dialog: MatDialog,
    private waybillService: WaybillService,
    private $bookingInfo: BookingInformationService,
    private spinner: NgxSpinnerService,
    private appComp: AppComponent,
    private $branch: BranchService,
    private openBookingService: OpenBookingService,
    private datePipe: DatePipe,
    private commonService: CommonService,
    private dateUtil: DateUtilService
  ) { }
  bookingFlag;
  ngOnInit() {
    // console.log('this.lastDayEndDate', this.lastDayEndDate);
    this.getAlProductcategory();
    this.getAllLoad();
    this.getMopByBranch();
    // this.getProductList();
    // this.getAllBranch();
    this.branchName = sessionStorage.getItem("branchName");
  }
  consigneeDetails;
  consignorDetails;
  consigneePinDetails;
  consignorPinDetails;
  getConsigneeDetailByid() {
     
        if(this.bookingInfoObj.consigneeId){
          this.$bookingInfo.getConsignorConsigneeById(this.bookingInfoObj.consigneeId).subscribe(
            (response) => {
              // console.log('resp', resp)
              // this.consigneeList.push(resp)
              let localList = [];
              localList.splice(0,0,response);
              this.consigneeDetails = response;
              this.consigneeList   = localList;
              // if (this.consigneeDetails.addrBook) {
              //   if (this.consigneeDetails.addrBook.pincodeId) {
              //     this.getConsigneePinDetails(this.consigneeDetails.addrBook.pincodeId);
              //   }
              // }
            },
            (err) => {
              console.log(err);
            }
          )
        }
  }
  getConsignorDetailByid(id) {
    this.$bookingInfo.getConsignorConsigneeById(id).subscribe(
      (resp) => {
        // console.log('resp', resp)
        this.consignorDetails = resp;
        this.consignerList.splice( 0 , 0 ,resp);
        this.consignerList   = [...this.consignerList];
        this.bookingInfoObj.consignorId = id;
        // if (this.consignorDetails.addrBook) {
        //   if (this.consignorDetails.addrBook.pincodeId) {
        //     this.getConsignorPinDetails(this.consignorDetails.addrBook.pincodeId);
        //   }
        // }
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
  getAllBranch() {
    this.$branch.getBranchDetails().subscribe((response) => {
      if (response) {
        this.spinner.hide();
        this.allBranchList = response;
        console.log(this.allBranchList, 'branchList');
      }
    });
  }

  isWaybillNoDisable: boolean = true;

  checkBookingMannualOrAuto() {
    
    this.$bookingInfo.branchMannualOrAuto(this.branchId, this.headerData).subscribe((response) => {
      if (response) {
        this.isWaybillNoDisable = true;
        this.bookingInfoObj.autoWaybill = true;
        this.isDiscountAllowed=false;
        response.responseData.forEach(elem=>{
          if(elem=="MANUAL WAYBILL"){
            this.isWaybillNoDisable = false;
            this.bookingInfoObj.autoWaybill = false;
          }
          if(elem=="DISCOUNT ALLOWED"){
            this.isDiscountAllowed=true;
            console.log(this.isDiscountAllowed);
          }
        })
      }
    });
  }
  rateCardChecked(ratecard){
    this.RateCardList.forEach((elem, index) => {
      if (elem.id == ratecard) {
        elem.isTab = true;
      } else {
        elem.isTab = false;
      }
    });
  }
  commercialChecked(commercialId){
    this.commercialTypeList.forEach(elem=>{
      if (elem.id == commercialId) {
        elem.isTab = true;
      } else {
        elem.isTab = false;
      }
    })
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
      if(response.data.grandTotalCharges){
        this.grandTotalCharges=response.data.grandTotalCharges
      }
    });
  }
  // sortConsigneeList() {
  //   this.consigneeList.sort()
  // }
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
          this.bookingInfoObj.waybillNumber = '';
          this.spinner.hide();
        }
      );

    }
  }

  // consigneeTabValidation(){
  //   if(){

  //   }
  // }
  checkValidatior(){
    // if(this.sampleBody.consignorId){
    //   this.bookingInfoObj.consignorId = this.sampleBody.consignorId;
    // }
    // if(this.sampleBody.consigneeId){
    //   this.bookingInfoObj.consignorId = this.sampleBody.consigneeId;
    // }
  if(!this.consigneeInfo.valid){
    return;
  }
  else{
    if(this.RateCardList.length){
if(!this.bookingInfoObj.rateCardId){
this.consignerisExpand=false;
  this.isMandatoryField= true; 
this.appComp.showMessage(`Please Select RateCard !`, 'danger');   
}
else{
  if(this.commercialTypeList.length){
    if(!this.bookingInfoObj.commercialId){
    this.isMandatoryField= true; 
    this.consignerisExpand=false;
    this.appComp.showMessage(`Please Select Commercial !`, 'danger');   
  } 
  else{
    this.consignerisExpand=true;
    this.isMandatoryField= false; 
  }
    }
   
}
}
else{
  this.isMandatoryField= false; 
}
  }
  }
  validatePackaging(){
    if(!this.consigneeInfo.valid || !this.bookingInfoObj.consigneeId || !this.bookingInfoObj.consignorId){
      this.appComp.showMessage(`Please Select Consignee and Consignor !`, 'danger');
      return;
   }
  //  else{
  //    this.saveConsignorConsigneeInfo();
  //  }
  }
  checkPinCodeLength (pincodeId) {
    
    if( pincodeId.length <=5){
    //    if (term.length <=5) {
            return true;
        }
        return false;
    }
  clearSfxCode() {
    this.bookingInfoObj.sfxPrcContractcode = '';
    if(this.contractOption == 1){
      this.selectedValue = '';
    this.selectedValue = 'SFX';
    }
  else  if(this.contractOption == 2){
      this.selectedValue = '';
    this.selectedValue = 'PRC';
    }
   else if(this.contractOption == 3){
      this.selectedValue = '';
    this.selectedValue = 'MSA';
    }
  }
  saveBookingInfoDetails(){
    if(this.changevalue == true){
      if (this.bookingInfoObj.temppickupTime) {
        this.bookingInfoObj.pickupTime = this.bookingInfoObj.temppickupTime;
        let splitLen = this.bookingInfoObj.pickupTime.split(":");
        if (splitLen.length != 3) {
          this.bookingInfoObj.pickupTime = `${this.bookingInfoObj.pickupTime}:00`;
        }
      }
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
    this.bookingInfoObj.bookingBranchId = JSON.parse(
      sessionStorage.getItem("branchId")
    );
    let temoObj ={} as any;
    temoObj = {...this.bookingInfoObj};
    temoObj.packageList =[];
    if(this.bookingInfoObj.ewaybillAvailableFlag){

    }
    else{
      temoObj.invoiceList =[];
    }
    this.$bookingInfo.saveBookingFirstStep(temoObj).subscribe((response) => {
      if (response) {
        this.bookingInfoObj.waybillId = response;
        this.changevalue= false;
        return this.gettingWaybillNumberByStepFirst();
      }
    }, err => {
      this.spinner.hide();
    });
     }
    }

    gettingWaybillNumberByStepFirst() {
      if(!this.bookingInfoObj.waybillNumber){
        this.$bookingInfo
        .getWaybillDetails(this.bookingInfoObj.waybillId)
        .subscribe((Response) => {
          if (Response) {
            this.bookingInfoObj.waybillNumber = Response.waybillNumber;
          }
        }, err => {
          this.spinner.hide();
        });
      }
      }

saveConsignorConsigneeInfo(){
  if(this.changevalue == true){
  this.$bookingInfo.saveBookingSecondStep(this.bookingInfoObj).subscribe((response) => {
    if (response) {
      this.bookingInfoObj.waybillId = response;
    }
  }, err => {
    this.spinner.hide();
  });
   }
}

  saveWayBill(type) {
    
    this.saveType = type;
    if (!this.bookingInfoObj.consignorId) {
      this.appComp.showMessage(`Consignor not selected !`, 'danger')
      return;
    }
    if (!this.bookingInfoObj.consigneeId) {
      this.appComp.showMessage(`Consignee not selected !`, 'danger')
      return;
    }

    if (this.bookingInfoObj.temppickupTime) {
      this.bookingInfoObj.pickupTime='';
      this.bookingInfoObj.pickupTime = this.bookingInfoObj.temppickupTime;
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
  enabledField() {
    this.fieldsetDisabled = false;
    this.isExpand = true;
  }
  calculateWaybill() {
    var generate = {
      waybillId: this.bookingInfoObj.waybillId,
    };
    this.$bookingInfo.calculateWaybillApi(generate, this.headerData2).subscribe((response) => {
      if (response) {
        this.spinner.hide();
        this.fieldsetDisabled = true;
        this.isFrieghtExpand = true;
        this.spinner.hide();
        this.gettingWaybillNumberById();
        return this.getFreightCharges();
      }
    }, err => {
      this.spinner.hide();
    });
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
        this.spinner.hide();
        if (this.saveType == 'create') {
          this.successMsg = true;
          sessionStorage.removeItem("waybillId");
          this.isFrieghtExpand = true;
          this.spinner.hide();
          return this.getFreightCharges();
        }
        else if (this.saveType == 'generateCreate') {
          this.appComp.showMessage(
            `  Waybill generated successfully ${this.bookingInfoObj.waybillNumber}`
          );
          this.consigneeInfo.resetForm();
          this.packageInfo.resetForm();
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
          if (sessionStorage.getItem("bookingReqId")) {
            sessionStorage.removeItem("bookingReqId")
            sessionStorage.removeItem('fromScreen');
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
            this.bookingInfoObj.chargeWeight = Number.parseFloat(Response.chargeWeight).toFixed(2);
            
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
          // this.spinner.hide();
        }
      }, err => {
        this.spinner.hide();
      });
  }
  waybillId;

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
    if (!this.bookingInfoObj.waybillId || this.bookingInfoObj.waybillId === '') {
      if (this.waybillId) {
        this.bookingInfoObj.waybillId = this.waybillId;
      }
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

  lkpBookingRequestTypeId;

  getAllLoad() {
    this.spinner.show();
    this.$bookingInfo.getLoad(this.branchId).subscribe((Response) => {
      if (Response) {
        this.allLookupList = Response;

        this.dodTypeList = [];
        console.log(this.allLookupList);
        this.allLookupList.forEach((element) => {

          if (element.lookupVal.trim() == 'WEB') {
            this.bookingInfoObj.lkpChannelId = element.id;
          }
          // if (element.lookupVal.trim() == 'DIRECT_BOOKING' && element.lookupTypeVal.trim() == 'BOOKING_REQUEST_TYPE') {
          //   this.bookingInfoObj.lkpBookingRequestTypeId = element.id;
          // }
          if (element.lookupVal.trim() == 'WAYBILL' && element.lookupTypeVal.trim() == 'BOOKING_REQUEST_TYPE') {
            this.bookingInfoObj.lkpBookingRequestTypeId = element.id;
            this.lkpBookingRequestTypeId = element.id
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
          if(element.lookupTypeVal.trim() == "PACK_TYPE"){
            this.tempPackageList.push(element);
            this.packageList.push(element);
          }
        });
        console.log(this.bookingInfoObj.lkpChannelId);
        this.dodTypeList = this.dodTypeList.sort((a, b) => a.id - b.id);
        this.dodTypeList = [...this.dodTypeList];
      }
       
      if (sessionStorage.getItem("bookingReqId")) {
        // console.log('this.getwaybibookingReqIdlldetails')
        const from = sessionStorage.getItem('fromScreen');
        if (from && from === 'waybill') {
          const waybillId = sessionStorage.getItem('waybillId');
          if (waybillId) {
            this.waybillId = waybillId;
            this.editWaybillDetails();
          } else {
            this.getPreBookingDetails(sessionStorage.getItem("bookingReqId"));
          }
          // console.log('inside waybilllll')
        }
      }
     
      else {
        this.localBookingObj.pickupDate = this.dateUtil.getNextDate(this.lastDayEndDate);
        this.localBookingObj.shipmentDate = new Date();
        this.spinner.hide();
      }
    
      // else {
      //   this.localBookingObj.pickupDate = new Date();
      //   this.localBookingObj.shipmentDate = new Date();
      //   // this.localBookingObj.pickupDate = this.dateUtil.getNextDate(this.lastDayEndDate);
      //   // this.localBookingObj.shipmentDate = this.dateUtil.getNextDate(this.lastDayEndDate);
      // }
    });
  }
  bookingIdDetailsByPre(id){

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
          // this.spinner.hide();
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
        this.isGeneralRetail=false;
        this.bookingInfoObj.rateCardId = '';
        this.bookingInfoObj.commercialId = '';
      }
      // if (type == 2 || type == 1) {
      //   this.bookingInfoObj.serviceOfferingId = '';
      //   this.consigneeList = [];
      //   this.LocalconsigneeList = [];
      // }
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
      this.changevalue = true;
      if(!this.sampleBody.consigneeId){
        this.bookingInfoObj.consigneeId = '';
      }
      if(!this.sampleBody.consignorId){
        this.bookingInfoObj.consignorId = '';
      }
      this.bookingInfoObj.packageList = [];
      this.selectedInboundPackageType = false;
      this.selectedProductCategoryCardList = [];
      this.selectedProductCategoryList = [];
      this.selectedProduct = [];
      this.unitCalculationType='';
      if(this.sampleBody.totalWeight){
        this.bookingInfoObj.actualWeight = this.sampleBody.totalWeight;
      }
      else{
        this.bookingInfoObj.actualWeight = ''
      }
      if(this.sampleBody.totalPackageCount){
        this.bookingInfoObj.totalPackageCount = this.sampleBody.totalPackageCount ;
      }
      else{
        this.bookingInfoObj.totalPackageCount = '';
      }
    
      this.packageTypeId = '';
      this.bookingInfoObj.pkgSaidToContain = '';
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
          // this.consignerList = [];
          // this.consigneeList = [];
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
              if(!this.sampleBody.consigneeId){
              this.getExistingConsignee();
              }
              if(!this.sampleBody.consignerId){
                this.getAllConsigneerExistingWithoutRateCard();
              }
            }
          })

          this.getServiceOffering();
          //  this.getAlProductcategory();
          //  this.packageList = [...this.tempPackageList];
        
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
          this.packageList = [...this.tempPackageList];
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
  getRateCardWithoutBranch(){
    this.$bookingInfo
    .gettingRatecardBserviceOffering(this.sfxObj.id, this.bookingInfoObj.serviceOfferingId, this.contractType , this.headerData)
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
            (this.selectedMopName.trim() == 'PAID' && elem.paidFlag == 1) || (this.selectedMopName.trim() == 'TO-PAY' && elem.toPayFlag == 1) || (this.selectedMopName.trim() == 'FOC' && elem.focFlag == 1))
          // isPrcRateCard= response.filter(elem => this.mopList.findIndex(elm => (this.bookingInfoObj.branchMOPLookupId==elm.branchMOPLookupId && elem.paidFlag==1) || (this.bookingInfoObj.branchMOPLookupId==elm.branchMOPLookupId && elem.toPayFlag==1) || ( this.bookingInfoObj.branchMOPLookupId==elm.branchMOPLookupId && elem.focFlag==1 )) != -1);

          if (isPrcRateCard.length) {
            TotalRateCard = [...isPrcRateCard];
          }
          else {
            this.checkMopRateCardAvailable(TotalRateCard);
            this.bookingInfoObj.serviceOfferingId = '';
            this.serviceOfferingList = [];
            TotalRateCard = [];
          }
        }

        if (this.bookingInfoObj.waybillId) {
          if (!this.bookingInfoObj.serviceOfferingId) {
          this.serviceOfferingList.forEach((elem) => {
            if (elem.value == "SURFACE") {
              this.bookingInfoObj.serviceOfferingId = elem.id;
            }
            this.serviceOfferingName = 'SURFACE';
          });
        }

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
        if(this.RateCardList.length){
          this.isMandatoryField = true;
        }
        if (this.bookingInfoObj.waybillId && this.bookingInfoObj.rateCardId) {
          return this.getCommercialByRateCard(this.bookingInfoObj.rateCardId);
        }
        if (this.RateCardList.length == 1) {
          this.getCommercialByRateCard(this.RateCardList[0].id);
        }
      }
    }, err => {
      this.serviceOfferingList = [];
    });
  }
  getRateCardBySafexId() {
    
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
              (this.selectedMopName.trim() == 'PAID' && elem.paidFlag == 1) || (this.selectedMopName.trim() == 'TO-PAY' && elem.toPayFlag == 1) || (this.selectedMopName.trim() == 'FOC' && elem.focFlag == 1))
            // isPrcRateCard= response.filter(elem => this.mopList.findIndex(elm => (this.bookingInfoObj.branchMOPLookupId==elm.branchMOPLookupId && elem.paidFlag==1) || (this.bookingInfoObj.branchMOPLookupId==elm.branchMOPLookupId && elem.toPayFlag==1) || ( this.bookingInfoObj.branchMOPLookupId==elm.branchMOPLookupId && elem.focFlag==1 )) != -1);

            if (isPrcRateCard.length) {
              TotalRateCard = [...isPrcRateCard];
            }
            else {
              this.checkMopRateCardAvailable(TotalRateCard);
              this.bookingInfoObj.serviceOfferingId = '';
              this.serviceOfferingList = [];
              TotalRateCard = [];
            }
          }

          if (this.bookingInfoObj.waybillId) {
            if (!this.bookingInfoObj.serviceOfferingId) {
            this.serviceOfferingList.forEach((elem) => {
              if (elem.value == "SURFACE") {
                this.bookingInfoObj.serviceOfferingId = elem.id;
              }
              this.serviceOfferingName = 'SURFACE';
            });
          }

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
          if(this.RateCardList.length){
            this.isMandatoryField = true;
          }
          if (this.bookingInfoObj.waybillId && this.bookingInfoObj.rateCardId) {
            return this.getCommercialByRateCard(this.bookingInfoObj.rateCardId);
          }
          if (this.RateCardList.length == 1) {
            this.getCommercialByRateCard(this.RateCardList[0].id);
          }
        }
      }, err => {
        this.serviceOfferingList = [];
      });
  }
  searchSafexId(sfxId) {
     
    if(sfxId == undefined){
      return;
    }
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
              // if (isInbound && !this.bookingInfoObj.waybillId) {
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
                this.getAllConsigneeWithoutRateCard();
                this.getAllConsigneerWithoutRateCard();
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
  
  getServiceOfferingBySafexId(contractId) {
     
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
            // this.getServiceOfferingName(this.bookingInfoObj.serviceOfferingId);
          }
          // if(this.isShowListOfCnorcee == false){
          //   this.getRateCardWithoutBranch();
          // }
          // else{
            this.getRateCardBySafexId();
          // }
          
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
  initialPincode = '';
  handleChange(evt) {
    
    if (evt.value) {
      this.changevalue = true;  
      // this.bookingInfoObj.destPincodeId = "";
      this.bookingInfoObj.invoiceList = [];
      // this.destPincode = "";
      // this.searchtext = '';
      this.bookingInfoObj.ncvFlag = 0;
      this.invoiceCost = 0;
      this.totalWayBill = null;
    } else {
      // this.waybillList = [];
      this.bookingInfoObj.ewaybillRequirementFlag = 0;
      // this.bookingInfoObj.destPincodeId = "";
       this.bookingInfoObj.invoiceList = [];
      // this.destPincode = this.initialPincode;
      this.bookingInfoObj.invoiceList.push({
        invoiceNumber: "",
        invoiceDate: "",
        invoiceAmount: "",
        status: 1
      });
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

  getWaybillBuId(event) {
     
    if (event) {
      console.log(event);
      var strlength = this.searchWayBill.length;
    }
    if (strlength > 11) {
      this.spinner.show();
      this.$bookingInfo.getWaybillById(this.searchWayBill).subscribe(
        (response) => {
          if (response) {
            this.spinner.hide();
            if (this.bookingInfoObj.invoiceList.length) {

              var duplicateEwaybill = this.bookingInfoObj.invoiceList.find(elem=> elem.ewaybillInvoiceDetail.ewaybillNumber == response.ewaybillNumber)
           
               }   if (duplicateEwaybill) {
                this.searchWayBill = '';
                this.appComp.showMessage(
                  `This Ewaybill number already exist`,
                  "danger"
                );
                return;
              }
              if (
                this.destPincode != response.deliveryPincode && this.isRetail == true
              ) {
                this.searchWayBill = '';
                this.appComp.showMessage(
                  `Destination pincode Does not match with existing  Destination pincode `,
                  "danger"
                );
                return;
              }
             if(this.bookingInfoObj.invoiceList.length){
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
             }
              if(this.bookingInfoObj.invoiceList.length){
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
                if (this.consigneeList.length > 1) {
                  this.consigneeList.sort((a, b) => a.name.localeCompare(b.name));

                }
              }

            }
          }
        },
        (err) => {
          this.spinner.hide();
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
  emptyData() {
    this.pincodeList = [];
    this.hubList = [];
    this.bookingInfoObj.consigneeId='';
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
        this.pincodeList = [];
        this.hubList = [];
        this.strLengthValid = false;
      }
    }
    if (this.pincodeList.length > 0) {
      if (this.bookingInfoObj.pincode) {
        return;
      } else {
        this.pincodeList = [];
        this.hubList = [];
        this.strLengthValid = false;
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
        if(isPresent != undefined && isPresent.length){
          this.consigneeList = [...isPresent];
        }
        if (this.RateCardList.length == 1 && this.commercialTypeList.length == 1) {
          setTimeout(() => {
            this.handleFocus()
           this.pincodeList=[];
           if(this.consigneeInfo.valid){
             this.getConsigneeDetailByid();
            this.isExpand = false;
            this.consignerisExpand = true;
           }
          }, 2000);
         }
      });
    }
  }
  handleFocus(): void {
    setTimeout(() => {
       const myCustomClass: string ="custom-class"
       const panel = document.querySelector('.ng-dropdown-panel');
       panel.classList.add(myCustomClass);
       console.log('panel', panel);
     }, 0);
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
          if(elem.isTab){
            elem.isTab=false
          }
        });

        this.isRateCardRequired = false;
        this.bookingInfoObj.rateCardId = ratecard;
        // if(!this.sampleBody.consigneeId){
        //   this.getConsignerConsigneeWithRateCard(ratecard);
        // this.selectedType = 1;
        // }
        this.$bookingInfo
          .getCommercialById(ratecard, this.contractType, this.headerData)
          .subscribe((Response) => {
            this.spinner.hide();
            if (Response) {
              let refrenceList = Response.referenceData.referenceItemList;
              this.commercialTypeList = Response.responseData;
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
              this.getProductCategoriBycommercialCatId(
                this.bookingInfoObj.commercialId
              );
              console.log('this.commercialTypeList', this.commercialTypeList);
              if (this.commercialTypeList.length == 1) {
                this.getProductCategoriBycommercialCatId(
                  this.commercialTypeList[0]
                );
                if (this.RateCardList.length == 1 && this.destPincode) {
                 if(this.consigneeInfo.valid){
                  this.isExpand = false;
                  this.consignerisExpand = true;
                 }
                }
                if(this.bookingInfoObj.commercialId){
                  let selectedCommercial = this.commercialTypeList.find(elem=>elem.id == this.bookingInfoObj.commercialId);
                  if(this.bookingInfoObj.packageList){
                    let returnValue = 0;
                   this.bookingInfoObj.packageList.forEach(element => {
                     if(element.productCategoryId == selectedCommercial.prdctCtgyId){
                       returnValue = 1;
                     }
                   });
                   if(returnValue == 0){
                     this.appComp.showMessage(`Product Category does not match with product Category`);
                    //  this.selectedProductCategoryList = [];
                    //  this.selectedProductCategoryCardList =  [];
                   }
                  }
   
              }
              }
            }
          });
      }


    } catch (error) {
      this.spinner.hide();
    }
  }


  checkTimeWithCutOffTime() {
    
    var cutoffTime = sessionStorage.getItem("cutoffTime");
    if (cutoffTime) {
      if (this.bookingInfoObj.temppickupTime) {
        var str1 = this.bookingInfoObj.temppickupTime;
      }
      var str2 = cutoffTime;
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
    this.$bookingInfo.getCategory(this.headerData).subscribe((response) => {
      if (response) {
        console.log(1);
        this.tempcategoryList = response;
       this.categoryListWithAlisList = [... this.tempcategoryList];
      }
    });
  }

  getproductByproductCateId(productId) {
    if (this.isPeaceType) {
      // this.spinner.show();
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
          // this.spinner.hide();
        }
      });
    }
  }
  onMultipleSelected(event) {
    
  }
  getProductCategoriBycommercialCatId(obj) {
    
    try {
      if (this.fieldsetDisabled == false) {
        // this.spinner.show();
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
        this.isMandatoryField = false;
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
        }
        else {
          this.isInvoiceCommercial = false;
        }
if(this.sampleBody.consignorId){
  this.bookingInfoObj.consignorId = this.sampleBody.consignorId;
}
if(this.sampleBody.consigneeId){
  this.bookingInfoObj.consignorId = this.sampleBody.consignorId;
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
            // this.spinner.hide();
            if (response) {
              

              if (this.isEditCheck) {
                this.selectedProductCategoryList = [];
                this.selectedProductCategoryCardList = [];
                this.bookingInfoObj.packageList = [];
                this.bookingInfoObj.totalPackageCount = '';
                this.bookingInfoObj.actualWeight = '';
                this.bookingInfoObj.chargeWeight = null;
              }

              if (this.packageList && this.packageList.length == 1) {
                this.packageTypeId = this.packageList[0].id;
              }
              if (obj.lkpPackTypeId) {
                this.packageList = [];

                this.tempPackageList.forEach(elem => {
                  if (elem.id == obj.lkpPackTypeId) {
                    this.packageList.push(elem);
                    this.packageTypeId = obj.lkpPackTypeId;
                  }
                })
                // this.packageList=[...this.tempPackageList];
              }
              else {
                this.packageTypeId = '';
               this.packageList = [...this.tempPackageList];
              }



              if (response.prdctCtgy.trim() == "GENERAL") {
                this.isPeaceType = false;
                this.categoryListWithAlisList = [...this.tempcategoryList];
              } else {
                this.categoryListWithAlisList = [...[response]];


                if (this.categoryListWithAlisList.length == 1) {
                  this.selectedProductCategoryList = '';
                  this.selectedProductCategoryList = this.categoryListWithAlisList[0].id;
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
                  if(this.categoryListWithAlisList[0].wayblExempt=='N'){
                    this.ExamptFalse=true;
                  }else{
                    this.ExamptFalse=false;
                  }
                  if(obj.commercialProductMap){
                    if(obj.commercialProductMap.length){
                      this.ProductList=this.allProductList.filter(elem=>obj.commercialProductMap.findIndex(elm=> elm.productId == elem.id) !=-1)
                      console.log(this.ProductList,'dfsd sfsd');
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
          this.isWaybillDisable = false;
          this.searchtext = "";
        } else {
          this.isWaybillDisable = true;
        }
      }
    });
  }

  openAddNewConsigner(lkpConsigntypeId) {
    
    if (this.fieldsetDisabled == false) {

      
      let data = {
        ConsigntypeId: lkpConsigntypeId,
        destinationPincode: this.destPincode,
        type: 'consignor'
      } as any;

      if (this.bookingInfoObj.ewaybillAvailableFlag == 1 &&  (this.selectedMopName == 'PAID' || this.selectedMopName == 'TO-PAY' )) {
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
          this.consignerList.sort((a, b) => a.name.localeCompare(b.name));
          this.consignerList.splice(0,0,response);
          this.consignerList = [...this.consignerList];
          this.bookingInfoObj.consignorId = response.id;
          if(this.bookingInfoObj.consignorId && this.bookingInfoObj.consigneeId){
            this.saveBookingInfoDetails();
          }
          this.packagingTabOpen();
          this.appComp.showMessage(`Consignor Created Successfully`);
        }
      });
    }

  }
  openAddNewConsignee(lkpConsigntypeId) {
    
    if (this.fieldsetDisabled == false) {
      if(this.bookingInfoObj.msaCustId){

      }
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
          if(this.consigneeList.length > 1){
            this.consigneeList.sort((a, b) => a.name.localeCompare(b.name));
          }
          this.addConsigneeList.push(response);
          this.consigneeList.splice(0, 0, response);
          this.consigneeList = [...this.consigneeList];
          this.bookingInfoObj.consigneeId = response.id;
          if(this.bookingInfoObj.consignorId && this.bookingInfoObj.consigneeId){
            this.saveBookingInfoDetails();
          }
          this.packagingTabOpen()
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
          if (this.consignerList.length > 1) {
            this.consignerList.sort((a, b) => a.name.localeCompare(b.name));
          }
        }

      }
    })
  }
  localConsigneeList: Array<any> = [];
  // searchByConsignee1(ccType) {
    
  //   this.p = 1;
  //   var search = {} as any;
  //   search.ccType = ccType;
  //   if (this.searchConsignee.name) {
  //     search.name = this.searchConsignee.name
  //   }
  //   if (this.destPincode) {
  //     search.pincode = this.destPincode;
  //   }
  //   if (this.searchConsignee.gstin) {
  //     search.gstin = this.searchConsignee.gstin
  //   }
  //   if (this.searchConsignee.contactNum) {
  //     search.contactNum = this.searchConsignee.contactNum
  //   }
  //   this.$bookingInfo.searchConsignerConsgnee(search).subscribe(response => {
  //     if (response) {
  //       this.consigneeList = response;
  //       if (this.consigneeList != undefined) {
  //         if (this.consigneeList.length) {
  //           this.consigneeList.sort((a, b) => a.name.localeCompare(b.name));
  //         }
  //       }

  //     }
  //   })
  // }
  localConsignorList: Array<any> = [];


  getConsigneerConsigneeByExsisting(type) {
    
    this.p = 1;
    // this.consigneeList = [];
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
    if(this.consigneeInfo.valid){
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
    }
   


  getConsignorByOnTab() {
    if(this.consigneeInfo.valid){
      this.localConsignorList=[];
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
          this.getConsigneeByMsaCustId(this.sfxObj.msaCustId);
        } else {
          this.getAllConsigneeWithoutRateCard();
        }
      } else if (this.selectedType == 2) {

        this.getExistingConsignee();
      }
      else {
        this.getExistingConsignee(2);
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
        if (this.consignerList.length > 1) {
          this.spinner.show();
          this.consignerList.sort((a, b) => a.name.localeCompare(b.name));
          this.spinner.hide();
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
            if (this.consignerList.length > 1) {
              this.consignerList.sort((a, b) => a.name.localeCompare(b.name));
              if(this.consignerList.length == 1){
                this.bookingInfoObj.consignorId = this.consignerList[0].id;
              }
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
        if(this.consignerList.length > 1){
          this.consigneeList.sort((a, b) => a.name.localeCompare(b.name));
        }
          if(this.consigneeList.length == 1){
            this.bookingInfoObj.consigneeId= this.consigneeList[0].id;
          }
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
            if (this.consigneeList.length > 1) {
              this.consigneeList.sort((a, b) => a.name.localeCompare(b.name));
            }
            if (this.addConsigneeList.length) {
              this.addConsigneeList.forEach(elem => {
                if (this.destPincode == elem.addrBook.pincodeId) {
                  this.consigneeList.splice(0, 0, elem);
                }
              })
          //     this.bookingInfoObj.consigneeId = this.consigneeList[0].id;
          //  this.packagingTabOpen();
            }
            if(this.consigneeList.length == 1){
              this.bookingInfoObj.consigneeId= this.consigneeList[0].id;
            }
          }
          // else {
          //   this.consigneeList = [];
          // }
         

          if (this.bookingInfoObj.waybillId && this.editScreen == true) {
            if (this.consigneeList.length > 1) {
              this.consigneeList.sort((a, b) => a.name.localeCompare(b.name));
            }
            let selectedConsignee = this.consigneeList.find(elem => this.bookingInfoObj.consigneeId == elem.id)
            let findIndex = this.consigneeList.findIndex(elem => this.bookingInfoObj.consigneeId == elem.id);
           if(findIndex != -1){
            this.consigneeList.splice(findIndex, 1);
           }

            if(selectedConsignee){
              this.consigneeList.splice(0, 0, selectedConsignee);
            }
          }
        }
      } , err=>{
        this.spinner.hide();
        if(err.error.errors.error[0].code == 'SERVICE-ERROR'){
          this.appComp.showMessage(`Consignor Does Not Exist In Selected Branch !`, 'warning');
        }
      });
  }
  packagingTabOpen(id = null, type = null){
    if(type =='consignee'){
      this.bookingInfoObj.consigneeId=id;
    }
    if(type == 'consignor'){
      this.bookingInfoObj.consignorId=id;
    }
    if(this.bookingInfoObj.consigneeId && this.bookingInfoObj.consignorId){
      this.consignerisExpand = false;
      this.onScreenHeader('isPackaging');
      this.saveBookingInfoDetails();
    }
    // if(this.bookingInfoObj.consigneeId && this.bookingInfoObj.consignorId && this.bookingInfoObj.waybillId && this.editScreen){
    //   this.isPackaging = true;
    //   this.consignerisExpand=false;
    // }
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
          if (this.consigneeList.length > 1) {
            this.consigneeList.sort((a, b) => a.name.localeCompare(b.name));
          }
          if (this.addConsigneeList.length) {
            this.addConsigneeList.forEach(elem => {
              if (this.destPincode == elem.addrBook.pincodeId) {
                this.consigneeList.splice(0, 0, elem);
              }
            })
          }
          if(this.consigneeList.length == 1){
            this.bookingInfoObj.consigneeId= this.consigneeList[0].id;
          }

        }
      });
    } catch (error) {
      this.spinner.hide();
    }
  }
  getAllConsigneeExistingWithRateCard() {
    
    try {
      // this.spinner.show();
      this.$bookingInfo.getAllConeeWithExisting(this.headerData).subscribe((response) => {
        if (response) {
          // this.spinner.hide();
          this.LocalconsigneeList = response;
          this.consigneeList = this.LocalconsigneeList.filter(
            (elem) => elem.addrBook.pincodeId == this.destPincode
          );
          // this.consigneeList = response.filter(elem => elem.lkpConsigntypeId == 45 || elem.lkpConsigntypeId == 46);
          if (this.consigneeList.length > 1) {
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
      },err=>{
         
        this.spinner.hide();
        this.appComp.showMessage(`Invalid Waybill Number !`, 'danger');
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
      },err=>{
        this.spinner.hide();
        if(err.error.errors.error[0].code == 'SERVICE-ERROR'){
          this.appComp.showMessage(`Consignor Does Not Exist In Selected Branch !`, 'warning');
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
     
    if (this.fieldsetDisabled == false) {
        this.isProductIndex = product.id;
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
        if (this.bookingInfoObj.packageList) {
          let presentVal = 0
          this.bookingInfoObj.packageList.forEach(elem => {
           
            if (product.id == elem.productCategoryId) {
              presentVal = 1;
          }
          })
          if (presentVal == 0) {
            this.bookingInfoObj.packageList.push({
              productCategoryId: product.id,
              packTypeLookupId: this.packageTypeId,
              lbhUomLookupId: this.bookingInfoObj.lbhUomLookupId,
              alias: product.packAlias ? product.packAlias : '',
              localId: product.localId ? product.localId : '',
              tempId: this.makeid(),
            });
          }
        }
        this.selectedProductCategoryCardList.forEach((elem, index) => {
         if(this.isGeneralRetail){
          if (elem.localId == product.localId) {
            elem.checked = true;
          } else {
            elem.checked = false;
          }
         }
         else{
          if (elem.id == product.id) {
            elem.checked = true;
          } else {
            elem.checked = false;
          }
         }
        });
      }
      this.productCatIsChacked = false;
      if (this.bookingInfoObj.packageList != undefined) {
        if (this.bookingInfoObj.packageList.length) {
            this.bookingInfoObj.packageList.forEach((elem) => {
              if(this.isGeneralRetail){
                if (elem.localId == product.localId) {
                  this.packageTypeId = elem.packTypeLookupId;
                }
              }
              else{
                if (elem.productCategoryId == product.id) {
                  this.packageTypeId = elem.packTypeLookupId;
                }
              }
              
            });
        }
        if (this.bookingInfoObj.waybillId && this.isPeaceType == false) {
          this.bookingInfoObj.packageList.forEach((ellem) => {
            if(this.isGeneralRetail){
              if (ellem.localId == product.localId) {
                this.packageTypeId = ellem.packTypeLookupId;
              }
            }
            else{
              if (ellem.productCategoryId == product.id) {
                this.packageTypeId = ellem.packTypeLookupId;
              }
            }
          });
        }
      }
     
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
          localId: isPresent.localId ? isPresent.localId : '',
          tempId: this.makeid(),
        });
        this.bookingInfoObj.packageList = [...tempList];
      }
    }

  }

   makeid(length = 5) {
    var array = new Uint32Array(500);
    let rand_no_arr:any= window.crypto.getRandomValues(array);
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(rand_no_arr[i].toString()[0]);
    }
    return result;
  }
  deletePackageInfoRow(index) {
    
    if (this.fieldsetDisabled == false) {
      this.bookingInfoObj.packageList.splice(index, 1);
    }

  }
  clearRetailGeneralPackage(product){
    if(this.retailGeneralproductcategory.localId == product.localId){
      this.selectedProductCategoryCardList = [];
      this.isGeneralRetail=false;
      this.selectedProductCategoryList='';
      this.bookingInfoObj.rateCardId='';
      this.bookingInfoObj.commercialId='';
      this.bookingInfoObj.packageList=[];
      this.packageTypeId= '';
      return;
    }
  }
  deleteProductCategory(product, index) {
    
    if (this.fieldsetDisabled == false) {
      if (this.selectedProductCategoryList.length) {
        if(this.isGeneralRetail){
          if(!this.bookingInfoObj.waybillId){
           this.clearRetailGeneralPackage(product);
          }
        }
      
        this.selectedProductCategoryCardList.splice(index, 1);
        this.selectedProductCategoryList = [
          ...this.selectedProductCategoryCardList,
        ];
        if(!this.selectedProductCategoryCardList.length && Array.isArray(this.selectedProductCategoryCardList)){
          this.selectedProductCategoryCardList = [];
      if(this.isGeneralRetail){
      this.selectedProductCategoryList='';
      this.bookingInfoObj.rateCardId='';
      this.bookingInfoObj.commercialId='';
      this.packageTypeId= '';
      this.isGeneralRetail=false;
      }
      this.bookingInfoObj.packageList=[];
   
          return;
        }
        this.categoryListWithAlisList = [...this.categoryListWithAlisList];
        if (this.bookingInfoObj.packageList.length) {
          let ispresent=[];
          if(this.isGeneralRetail){
             ispresent = this.bookingInfoObj.packageList.filter(
              (elem) => elem.localId != product.localId
            );
          }
          else{
             ispresent = this.bookingInfoObj.packageList.filter(
              (elem) => elem.productCategoryId != product.id
            );
          }
        
          this.bookingInfoObj.packageList = [...ispresent];
        }

        if (this.selectedProductCategoryList.length == 1) {
          this.selectedProductCategoryList[0].checked = true;
          this.isProductIndex = this.selectedProductCategoryList[0].id ;
        }
        else{
          let checkedIndex = this.selectedProductCategoryList.findIndex(elem=>elem.checked==true);
          if(checkedIndex==undefined || checkedIndex==-1){
            this.selectedProductCategoryList[0].checked=true;
            this.isProductIndex=this.selectedProductCategoryList[0].id;
            return this.getFilterProductCategory(this.selectedProductCategoryList[0] , 0);
          } 
        }
        let isExampt =this.selectedProductCategoryList.find(elem=>elem.wayblExempt=='N')
      if(isExampt){
        this.ExamptFalse=true;
        this.InvoiceListPresent();
      }
      else{
        this.ExamptFalse=false;
      }
      }
      
      if (!Array.isArray(this.selectedProductCategoryList)) {
        // ;
        this.ExamptFalse=false;
        this.selectedProductCategoryList='';
        this.packageTypeId= '';
        this.selectedProductCategoryCardList=[];
        this.bookingInfoObj.packageList=[];
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
    
    if(selectedProductCategory == undefined){
      return;
    }
    if (this.bookingInfoObj.packageList.length && Array.isArray(selectedProductCategory)) {
      let isnotpresent = this.bookingInfoObj.packageList.findIndex(
        (elem) =>
          selectedProductCategory.findIndex(
            (elm) => elm.id == elem.productCategoryId
          ) == -1
      );
     
      if (isnotpresent != -1) {
        if(this.isGeneralRetail){
          if(!this.bookingInfoObj.waybillId || !selectedProductCategory.length && !this.RateCardList.length && this.isGeneralRetail){
            this.selectedProductCategoryCardList = [];
            this.isGeneralRetail=false;
            this.selectedProductCategoryList='';
            this.bookingInfoObj.rateCardId='';
            this.bookingInfoObj.commercialId='';
            this.bookingInfoObj.packageList=[];
            this.packageTypeId= '';
            return;
        }
        }
        if(this.bookingInfoObj.packageList.length){
          this.bookingInfoObj.packageList.splice(isnotpresent, 1);
        }
      }
    }
    if (Array.isArray(selectedProductCategory)) {
      selectedProductCategory.forEach((elem, index) => {
        if (index == 0) {
          selectedProductCategory[index].checked = true;
          this.isProductIndex = elem.localId ? elem.localId : elem.id;
        } else {
          elem.checked = false;
        }
      });
      let isExampt =selectedProductCategory.find(elem=>elem.wayblExempt=='N')
      if(isExampt){
        this.ExamptFalse=true;
        this.InvoiceListPresent();
      }
      else{
        this.ExamptFalse=false;
      }
      this.selectedProductCategoryCardList = [...selectedProductCategory];
      if (this.bookingInfoObj.packageList) {
        let presentVal = 0
        this.bookingInfoObj.packageList.forEach(elem => {
          if(this.isGeneralRetail){
            if (this.selectedProductCategoryCardList[0].localId == elem.localId) {
              presentVal = 1;
            }
          }
          else{
            if (this.selectedProductCategoryCardList[0].id == elem.productCategoryId) {
              presentVal = 1;
            }
          }
        
        })
        if (presentVal == 0) {
          this.bookingInfoObj.packageList.push({
            productCategoryId: this.selectedProductCategoryCardList[0].id,
            packTypeLookupId: this.packageTypeId,
            lbhUomLookupId: this.bookingInfoObj.lbhUomLookupId,
            alias: this.selectedProductCategoryCardList[0].packAlias ? this.selectedProductCategoryCardList[0].packAlias : '',
            localId: this.selectedProductCategoryCardList[0].localId ? this.selectedProductCategoryCardList[0].localId : '',
            tempId: this.makeid(),
          });
        }
      }
    }
    else {
      this.selectedProductCategoryCardList = [];
        this.bookingInfoObj.packageList = [];
      if(!this.RateCardList.length){
        this.packageTypeId= '';
        selectedProductCategory = this.categoryListWithAlisList.find(elem => elem.localId == selectedProductCategory);
      }
      else{
      selectedProductCategory = this.categoryListWithAlisList.find(elem => elem.id == selectedProductCategory);

      }
      this.selectedProductCategoryCardList.push(selectedProductCategory);
      let isExampt =this.selectedProductCategoryCardList.find(elem=>elem.wayblExempt=='N')
      if(isExampt){
        this.ExamptFalse=true;
        this.InvoiceListPresent();
      }
      else{
        this.ExamptFalse=false;
      }
      if(this.isPeaceType==false){
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

 
  consigneeId;
  consignorId;
  isRetail:boolean = true;
  isShowListOfCnorcee = true;
  sampleBody = {} as any;
  preBookingRequestObj = {} as any;

getWaybillByReqId(reqId){
  let obj ={
    bookingRequestIds : [
      reqId
    ]
  }
  this.$bookingInfo.getWaybillByRequestId(obj , this.headerData).subscribe((response)=> {
    if(response.responseData.length){
      this.bookingInfoObj.waybillId = response;
     this.editWaybillDetails();
    }
    else{
      this.bookingInfoObj = this.preBookingRequestObj;
      this.bookingInfoObj.lkpBookingRequestTypeId = this.preBookingRequestObj.lkpBookingRequestTypeId;
      this.bookingInfoObj.lkpChannelId = this.preBookingRequestObj.lkpChannelId;
      this.getPreBookingResponse();
    }
  })
}


  editWaybillDetails() {
    try {
      this.$bookingInfo
        .getWaybillDetailByWaybillId(this.bookingInfoObj.waybillId, this.headerData)
        .subscribe((response) => {
          console.log(response);
          if (response) {
            this.bookingInfoObj = response;
            this.editScreen = true;
            this.bookingInfoObj.consigneePincodeId =this.bookingInfoObj.destPincodeId;
            if (this.bookingInfoObj.hubDeliveryBranchId) {
              this.getBranchHub(this.bookingInfoObj.hubDeliveryBranchId);
            }
            this.getpincodeDetailsById(this.bookingInfoObj.destPincodeId);
            this.bookingInfoObj.temppickupTime = this.bookingInfoObj.pickupTime;
            let abc = this.bookingInfoObj.temppickupTime.split(':');
            this.bookingInfoObj.temppickupTime = `${abc[0]}:${abc[1]}`;
          if(this.bookingInfoObj.chargeWeight){
            this.bookingInfoObj.chargeWeight = Number.parseFloat(this.bookingInfoObj.chargeWeight).toFixed(2);
          }
            if (this.bookingInfoObj.waybillId) {
              let mopDetails = this.mopList.find(elem => elem.branchMOPLookupId == this.bookingInfoObj.branchMOPLookupId)
              this.selectedMopName = mopDetails.branchMOPValue;
            }
            if(this.bookingInfoObj.packageList == undefined){
              if(this.preBookingRequestObj.totalWeight){
                this.bookingInfoObj.actualWeight = this.preBookingRequestObj.totalWeight;
              }
              if(this.preBookingRequestObj.totalWeight){
                this.bookingInfoObj.totalPackageCount = this.preBookingRequestObj.totalPackageCount;
              }
            }
            this.getPreBookingResponse();
          }

        });
    } catch (error) {
      this.spinner.hide();
    }
  }

  getPreBookingDetails(id) {
    try {
       
      this.spinner.show();
      this.openBookingService.getBookingRequestDetails(id)
        .subscribe((response : any) => {
          console.log(response);
          this.preBookingRequestObj  = response.data;
          this.bookingInfoObj.consigneePinCode = this.preBookingRequestObj.consigneePinCode
          this.getWaybillByReqId(id);
        });
    } catch (error) {
      this.spinner.hide();
    }
  }
  getPreBookingResponse(){
   
      this.changevalue = true;
      if(this.bookingInfoObj.chargeWeight){
        this.bookingInfoObj.chargeWeight = Number.parseFloat(this.bookingInfoObj.chargeWeight).toFixed(2);
      }
    
      this.selectedType = 1;
      // this.bookingInfoObj.destPincodeId = this.preBookingRequestObj..consigneePinCode;
      if(this.bookingInfoObj.rateCardCode){
        this.bookingInfoObj.rateCardId = this.bookingInfoObj.rateCardCode.substr(2);
      }
      if(!this.bookingInfoObj.ewaybillAvailableFlag){
        this.bookingInfoObj.ewaybillAvailableFlag = 0;
        this.bookingInfoObj.ncvFlag = 0;
      }
            const d = new Date();
            this.bookingInfoObj.pickupDate = this.dateUtil.getFormatedDate('yyyy-MM-DD', d);
      this.editScreen = true;
      this.selectedValue = 'PRC';
      this.contractType = 'PRC';
      this.bookingInfoObj.lkpBookingRequestTypeId = this.lkpBookingRequestTypeId;
      if(this.bookingInfoObj.pickUpFromTime){
        var time = this.bookingInfoObj.pickUpFromTime;
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM == "PM" && hours < 12) hours = hours + 12;
        if (AMPM == "AM" && hours == 12) hours = hours - 12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;

        console.log(sHours + ":" + sMinutes);
        const val = sHours + ":" + sMinutes
        this.bookingInfoObj.temppickupTime = val;
        this.checkTimeWithCutOffTime();
      }
      if(this.bookingInfoObj.chargeWeight){
        this.bookingInfoObj.chargeWeight = Number.parseFloat(this.bookingInfoObj.chargeWeight).toFixed(2);
      }
        let mopDetails = this.mopList.find(elem => elem.branchMOPLookupId == this.bookingInfoObj.branchMOPLookupId)
       if(mopDetails){
        this.selectedMopName = mopDetails.branchMOPValue;
       }
       this.sampleBody = this.bookingInfoObj;
      this.isCreditCheck = false;
     
      this.allLookupList.forEach((elem) => {
        if (elem.lookupVal.trim() == "CREDIT" &&
          this.bookingInfoObj.custTypeLookupId == elem.id) {
          this.isCreditCheck = true;
          this.contractOption = 1;
          this.selectedValue = 'SFX';
          this.MopName = 'CREDIT';
          this.contractType = "CREDIT";
        }
        
      });
    
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
    //  else if (this.bookingInfoObj.prcContractCode) {
    //     if (this.bookingInfoObj.msaCustId) {
    //       this.searchSafexId(this.bookingInfoObj.prcContractCode);
    //     }
    //   }
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
      // let pincodeTempObj ={
      //   id : this.bookingInfoObj.consigneePincodeId
      // }
      if(this.bookingInfoObj.consigneePinCode){
        this.destPincode = this.bookingInfoObj.consigneePinCode;
        this.gettingPincode(this.bookingInfoObj.consigneePinCode);
      }
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
          ...this.bookingInfoObj.packageList
        ];
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
      if (this.bookingInfoObj.packageList != undefined) {
        if(this.bookingInfoObj.packageList.length){
          let UniqueList = [];
          if (this.bookingInfoObj.packageList) {
            UniqueList = this.bookingInfoObj.packageList.filter((thing, index, self) =>
              index === self.findIndex((t) => (
                t.productCategoryId === thing.productCategoryId
              ))
            )
          }
  
          if (UniqueList.length && this.categoryListWithAlisList.length > 1) {
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
  
        }
      }

      if (this.bookingInfoObj.consigneeId) {
        this.selectedType = null;
        this.consigneeId = this.bookingInfoObj.consigneeId;
        this.getConsigneeDetailByid();
      }
      if (this.bookingInfoObj.consignorId) {
        this.consignorId = this.bookingInfoObj.consignorId
        this.getConsignorDetailByid(this.bookingInfoObj.consignorId);
      }
      setTimeout(() => {
        this.spinner.hide();
      }, 4000);
if(!this.bookingInfoObj.ncvFlag && !this.bookingInfoObj.invoiceList.length){
this.bookingInfoObj.ncvFlag = 0
this.bookingInfoObj.ewaybillAvailableFlag = 0;
this.bookingInfoObj.invoiceList.push({
invoiceNumber: "",
invoiceDate: "",
invoiceAmount: "",
status: 1
});
}
if(!this.bookingInfoObj.dodDaccFlag){
this.bookingInfoObj.dodDaccFlag = 0;
this.pdcList = [
{ "name": "Yes", id: 1, "checked": false },
{ "name": "No", id: 0, "checked": true }
];
}

  }
  getProductCategoryIdWithoutRateCard() {
    
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
              this.bookingInfoObj.packageList.forEach(elm=>{
                let returnVal=1;
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
                UniqueList.forEach((elm) => {
                  this.categoryListWithAlisList.forEach(elem=>{
                  if(elm.localId == elem.localId){
  this.selectedProductCategoryList.push(elem);
}
                  })
                  
                });

                
                this.selectedProductCategoryCardList = this.categoryListWithAlisList.filter(
                  (elem) =>
                    this.selectedProductCategoryList.findIndex(
                      (elm) => elm.id == elem.id
                    ) != -1
                );
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
  generalProduct(o1: any, o2: any) {
    if (o2) {
      return o1.localId === o2.localId;
    }
  }
  
  selectedproductCategory: any;
  getcommercialRateCardIdByAlias() {
    
    if (!this.RateCardList.length && this.bookingInfoObj.consignorId && !this.selectedInboundPackageType && !this.isGeneralRetail && this.selectedProductCategoryCardList && this.bookingInfoObj.serviceOfferingId) {
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
                this.bookingInfoObj.rateCardId =
                commercialDetalsByAlisa.ratecardId;
              }
              if (commercialDetalsByAlisa.id) {
                this.bookingInfoObj.commercialId = commercialDetalsByAlisa.id;
              }
              let isGeneralPresent = this.categoryListWithAlisList.find(elem => elem.id ==commercialDetalsByAlisa.prdctCtgyId && elem.prdctCtgy.trim() == 'GENERAL')
              if(isGeneralPresent){
                var dialog = this.dialog.open(ProductConfirmationComponent, {
                  width: "55rem",
                  panelClass: "bookingDialog",
                  disableClose: true,
                });
                dialog.afterClosed().subscribe((response) => {
                   ;
                  if (response === true) {
                    return;
                  }
                  if (response ==1) {
                  this.isGeneralRetail=true;
                  if(obj){
                    this.retailGeneralproductcategory = this.categoryListWithAlisList.find(elem => elem.localId == this.selectedProductCategoryList)
                   }
                   else{
                    this.retailGeneralproductcategory = this.categoryListWithAlisList.find(elem => elem.id == this.selectedProductCategoryList)
    
                   }
                this.selectedProductCategoryList=[];
                  this.selectedProductCategoryList.push(this.retailGeneralproductcategory);
                  this.addProductCategoryInCardList(this.selectedProductCategoryList);
                  }
                });
              }
              this.allLookupList.forEach(element => {
                if (element.lookupTypeVal.trim() == 'BIZ_TYPE' && element.lookupVal.trim() == 'OUTBOUND') {
                  this.bookingInfoObj.businessTypeLookupId = element.id;
                }
                if (element.id == commercialDetalsByAlisa.lkpPricingCalcTypeId && element.lookupTypeVal.trim() == "PRICING_CALC_TYPE") {
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
  openGeneralRetailConfirmationModel(){
    var dialog = this.dialog.open(ProductConfirmationComponent, {
      width: "55rem",
      panelClass: "bookingDialog",
    });
    dialog.afterClosed().subscribe((response) => {
      // ;
      if (response === true) {
        return;
      }
      if (response ==1) {
      this.isGeneralRetail=true;
      }
    });
  }

  setPackageIdInTable() {
    this.bookingInfoObj.packageList.forEach((elem, i) => {
      if(this.isGeneralRetail){
        if (this.isProductIndex == elem.localId ) {
          elem.packTypeLookupId = this.packageTypeId;
        }
      }
      else{
        if (this.isProductIndex == elem.productCategoryId  || this.isProductIndex == elem.productId ) {
          elem.packTypeLookupId = this.packageTypeId;
        }
      }
    })
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

  openAmountConfirmationModal(){
    // 
    this.bookingInfoObj.invoiceList.forEach((elem,index)=>{
      let Amount= 0;
      Amount= parseInt(elem.invoiceAmount);
      this.bookingInfoObj.ewaybillAvailableFlag=0;
      if(this.ExamptFalse==true){
        if(Amount>50000){
          var dialog = this.dialog.open(InvoiceAmountConfirmationComponent, {
            width: "55rem",
            panelClass: "bookingDialog",
          });
          dialog.afterClosed().subscribe((response) => {
            // ;
            if (response === true) {
              return;
            }
            if (response ==1) {
              this.bookingInfoObj.invoiceList=[];
              this.bookingInfoObj.ewaybillAvailableFlag=1;
              this.destPincode='';
              this.searchtext='';
              this.bookingInfoObj.destPincodeId='';
              this.bookingInfoObj.consigneeId='';
              this.deleteInvoiceInfoRow(index);
              this.isExpand=true;
             if(!this.isCreditCheck && !this.RateCardList.length){
              this.bookingInfoObj.packageList=[];
              this.selectedInboundPackageType=false;
              this.selectedProductCategoryCardList=[];
              this.selectedProductCategoryList=[];
              this.selectedProduct=[];
              this.bookingInfoObj.actualWeight='';
              this.bookingInfoObj.pkgSaidToContain='';
              this.bookingInfoObj.totalPackageCount='';
              this.bookingInfoObj.chargeWeight=null;
             }
            }
            this.bookingInfoObj.ewaybillRequirementFlag=1;
          });
        }
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

  clearPackageDetails() {
    if (this.fieldsetDisabled == false) {
      
      if (!this.RateCardList.length) {
        if(this.bookingInfoObj.ewaybillAvailableFlag==0){
          this.bookingInfoObj.invoiceList=[];
          this.bookingInfoObj.invoiceList.push({
            invoiceNumber: "",
            invoiceDate: "",
            invoiceAmount: "",
            status: 1
          });
        }
        this.bookingInfoObj.commercialId = '';
        this.isGeneralRetail=false;
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
      this.selectedInboundPackageType=false;
      if (!this.RateCardList.length && this.selectedMopName == 'TO-PAY') {
        this.$bookingInfo.getConsineeDetail(consignee, this.bookingInfoObj.serviceOfferingId).subscribe(res => {
          this.consigneeResp = res;
          this.isGeneralRetail=false;
          if (this.consigneeResp.id !== undefined) {
            this.bookingInfoObj.sfxPrcContractcode = res.cntrCode;
            this.bookingInfoObj.msaCustId = res.msaCustId;
            this.selectedInboundPackageType=true;
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
            // this.selectedProductCategoryCardList = [];
            // this.selectedProductCategoryList = '';
             this.isPeaceType = false;
            // this.selectedInboundPackageType = false;
            this.packageList = [...this.tempPackageList];
          }
        })
      }
    }

  }

  refreshInboundDetails() {
    this.packageList = [...this.tempPackageList];
    let singlepack = [];
    if (this.consigneeResp.bookingRatecardDTOList[0].bookingCommercialDTOList[0].lkpPackTypeId) {
      this.packageList.forEach(elem => {
        if (elem.id == this.consigneeResp.bookingRatecardDTOList[0].bookingCommercialDTOList[0].lkpPackTypeId) {
          singlepack.push(elem);
        }
      })
      this.packageList = [...singlepack];
      this.packageTypeId = singlepack[0].id;
      this.selectedInboundPackageType = true;
      return this.getProductcategoryForInbound();
  }
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
            if(this.categoryListWithAlisList[0].wayblExempt=='N'){
              this.ExamptFalse=true;
            }else{
              this.ExamptFalse=false;
            }
            if(this.consigneeResp.bookingRatecardDTOList[0].bookingCommercialDTOList[0].commercialProductMap){
              if(this.consigneeResp.bookingRatecardDTOList[0].bookingCommercialDTOList[0].commercialProductMap.length){
                this.ProductList=this.allProductList.filter(elem=>this.consigneeResp.bookingRatecardDTOList[0].bookingCommercialDTOList[0].commercialProductMap.findIndex(elm=> elm.productId == elem.id) !=-1)
                console.log(this.ProductList,'dfsd sfsd');
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

InvoiceListPresent(){
  if(this.bookingInfoObj.ewaybillAvailableFlag==0){
    if(this.bookingInfoObj.invoiceList){
      if(this.bookingInfoObj.invoiceList.length){
        if(this.bookingInfoObj.ewaybillRequirementFlag=1){

        }
        else{
          let amount= this.bookingInfoObj.invoiceList.find(elem=>elem.invoiceAmount>=50000) 
          if(amount){
            this.openAmountConfirmationModal();
          }
        }
      }
    }
  }
 
}

  searchByConsignee() {
    
    this.p = 1;
    if (!this.localConsigneeList.length) {
      this.localConsigneeList = [...this.consigneeList];
    }
    let isPresent = [];
     if (this.searchConsignee.name) {
        isPresent = this.localConsigneeList.filter(
          (val)=> val['name'].includes(this.searchConsignee.name))
          
          if(this.searchConsignee.gstin){
            isPresent = isPresent.filter(
              (val)=> val['gstinNum'].includes(this.searchConsignee.gstin))
          }
          if(this.searchConsignee.contactNum){
            isPresent = isPresent.filter(
              (val)=> val['mob'].includes(this.searchConsignee.contactNum))
          }
    }
       else if(this.searchConsignee.gstin){
          isPresent = this.localConsigneeList.filter(
            (val)=> val['gstinNum'].includes(this.searchConsignee.gstin))
            if(this.searchConsignee.contactNum){
              isPresent = isPresent.filter(
                (val)=> val['mob'].includes(this.searchConsignee.contactNum))
            }
  }
  else if(this.searchConsignee.contactNum){
    isPresent = this.localConsigneeList.filter(
      (val)=> val['mob'].includes(this.searchConsignee.contactNum))
      
      if(this.searchConsignee.gstin){
        isPresent = isPresent.filter(
          (val)=> val['gstinNum'].includes(this.searchConsignee.gstin))
      }
  }
  this.consigneeList = [...isPresent];
  if(this.consigneeList.length > 1){
    this.consigneeList.sort((a, b) => a.name.localeCompare(b.name));
  }
  }
  searchConsigner(ccType) {
     
    if (!this.localConsignorList.length) {
      this.localConsignorList = [...this.consignerList];
    }
    this.page1 = 1;
    let isPresent = [];

    if (this.searchCongner.name) {
      isPresent = this.localConsignorList.filter(
        (val)=> val['name'].includes(this.searchCongner.name))
        
        if(this.searchCongner.gstin){
          isPresent = isPresent.filter(
            (val)=> val['gstinNum'].includes(this.searchCongner.gstin))
        }
        if(this.searchCongner.contactNum){
          isPresent = isPresent.filter(
            (val)=> val['mob'].includes(this.searchCongner.contactNum))
        }
  }
 else if(this.searchCongner.gstin){
    isPresent = this.localConsignorList.filter(
      (val)=> val['gstinNum'].includes(this.searchCongner.gstin))
      if(this.searchCongner.contactNum){
        isPresent = isPresent.filter(
          (val)=> val['mob'].includes(this.searchCongner.contactNum))
      }
}
else if(this.searchCongner.contactNum){
  isPresent = this.localConsignorList.filter(
    (val)=> val['mob'].includes(this.searchCongner.contactNum))

    if(this.searchCongner.gstin){
      isPresent = isPresent.filter(
        (val)=> val['gstinNum'].includes(this.searchCongner.gstin))
    }
}
if(this.searchCongner.pincode){
  if(isPresent.length){
    var tempPresentList = [] as any;
    isPresent.forEach(elem=>{
      let val = elem.addrBook.pincodeId;
      val = JSON.stringify(val);
      let value = val.includes(this.searchCongner.pincode);
      if(value){
        tempPresentList.push(elem);
      }
    })
   
    if(tempPresentList.length){
      isPresent = [...tempPresentList];
    }
  }
  else{
    this.localConsignorList.forEach(elem=>{
      let val = elem.addrBook.pincodeId;
      val = JSON.stringify(val);
      let value = val.includes(this.searchCongner.pincode);
      if(value){
        isPresent.push(elem);
      }
          })
  }
}
this.consignerList = [...isPresent];
      this.consignerList.sort((a, b) => a.name.localeCompare(b.name));
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

  openEmailModal() {
    console.log('here you clicked')
    var dialog = this.dialog.open(AddEmailComponent, {
      width: "100rem",
      panelClass: "bookingDialog",
    });
    dialog.afterClosed().subscribe((res: any) => {
      if (res) {
        this.sendEmail(res);
      }
    });
  }
  sendEmail(email) {
    this.spinner.show();
    let wayBillIds = [this.bookingInfoObj.waybillId];
    this.waybillService.postSendMail(wayBillIds, email).subscribe(
      (resp: any) => {
        this.spinner.hide();
        console.log(resp);
        this.appComp.showMessage(resp['message'],'success');
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
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
