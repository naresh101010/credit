import { HostListener, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { SearchCustomerComponent } from "src/app/dialog/search-customer/search-customer.component";
import { ApiService } from "src/app/core/services/api.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { NavigationStart, Router, ActivatedRoute } from "@angular/router";
import { AppSetting } from "src/app/app.setting";
import { PaymentCommercialGen } from "src/app/core/models/paymentTermsModel";
import { PayoutGenDetailShowComponent } from "./payout-gen-detail-show/payout-gen-detail-show.component";
import * as _ from "lodash";
import { DatePipe } from "@angular/common";
import { Subscription } from 'rxjs';
import { confimationdialog } from 'src/app/dialog/confirmationdialog/confimationdialog';
import { NgxPermissionsService } from "ngx-permissions";
import { AuthorizationService } from "src/app/core/services/authorization.service";


@Component({
  selector: 'app-booking-payout-show',
  templateUrl: './booking-payout-show.component.html',
  styleUrls: ['./booking-payout-show.component.css'],
  providers: [PaymentCommercialGen, DatePipe],
})
export class BookingPayoutShowComponent implements OnInit {
  public isClicked = [];
  @ViewChild(PayoutGenDetailShowComponent, null) childValidation: PayoutGenDetailShowComponent;
  subscription: Subscription;
  // @ViewChild('cust', {static: false}) cust: PaymentCommercialGen;
  // @ViewChild('gen', {static: false}) gen: PaymentCommercialGen;

  cusBpayment;
  soffhide;
  hrHideEx;
  HoffringBkg;
  hidePerWay;
  addBRemark;
  csBpay;
  otherEAdd;
  netAdd;

  radioButtontncData = [];
  selectortncData = [];
  stringtncData = [];

  contractId;
  associateId;
  paymentData;
  paymentCommercialRefData: any;
  assocAdditionalParamList;
  assocExpenseTypeList;
  assocPaymentTypeList;
  assocPayoutTypeList;
  mdmNotepadList;
  serviceOfferingList;
  vehicleCargoCapacityList;
  attrTypeListTnc = [];
  notepadAttributesList = [];
  branchIds: any = [];
  customerIdList: any = [];
  paymentDataBranch;
  editflow: any;
  editStatusId = AppSetting.editStatus;
  searchNotePad = '';
  Rateshow: boolean = true;
  Weightshow: boolean = false;
  contractdata: any;
  maxdate: any;
  minDate: any = new Date();
  minDateStart: any = new Date();
  perList: any = [];
  exAttrMap = new Map();
  exAttrKeyList =  [];

  paymentCommercialData: any = {
    assocCntrId: AppSetting.contractId,
    effectiveDt: null,
    expDt: null,
    lkpAirFreightPayoutOptId: null,
    lkpPymtMethodId: null,
  //  minAmt: null,
 //   price: null,
    recIdentifier: 0,
 //   wtCalcCtgy: 'RATE PER KG',
    wtType: '',
    assocNotepads: [],
    airFreightCityPrdctCtgys: [],
    validationStatus:false
   // airFreightWtSlabChrgs: []
  };

  ngAfterViewInit(): void {
    // this.childValidation.test();
    // this.childValidation.setValueOfCityProductWeight()
    // console.log('hello343');
  }
  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private acRoute: ActivatedRoute,
    public datePipe: DatePipe,
    private authorizationService : AuthorizationService,
    private permissionsService: NgxPermissionsService
  ) {
    this.contractId = AppSetting.contractId;
    this.associateId = AppSetting.associateId;

  }
  ngOnInit() {

    this.authorizationService.setPermissions('COMMERCIAL');
    this.perList = this.authorizationService.getPermissions('COMMERCIAL') == null ? [] : this.authorizationService.getPermissions('COMMERCIAL');
    this.permissionsService.loadPermissions(this.perList);
    this.exAttrMap = this.authorizationService.getExcludedAttributes('COMMERCIAL');
    this.exAttrKeyList = Array.from(this.exAttrMap.values());
    console.log('Attribute List', this.exAttrKeyList);
    console.log('perlist',this.perList)
    this.spinner.show();
    this.acRoute.params.subscribe(x => {
      if (x.editflow) {
        this.editflow = x.editflow;
      }

    })
    this.setData();
    // this.getCommerceDataWithctrtId();
    // this.apiService.get('/secure/v1/airfreightcontract/' + AppSetting.contractId)
    //   .subscribe(response => {
    //     this.spinner.hide();
    //     this.contractdata = response.data.responseData;
    //   })
    // console.log("model", this.paymentCommercialData);
  
  }

  setData(){

    this.apiService.get('/secure/v1/airfreightcontract/' + AppSetting.contractId)
      .subscribe(response => {
        // this.spinner.hide();
        this.contractdata = response.data.responseData;
      })
    console.log("model", this.paymentCommercialData);
    this.getCommerceDataWithctrtId();
  
  }


  notepadData() {
    console.log('this.notepadAttributesList', this.notepadAttributesList);
    this.radioButtontncData = this.notepadAttributesList.filter(function (
      filt
    ) {
      return filt.attributeTypeId == 1;
    });
    this.selectortncData = this.notepadAttributesList.filter(function (filt) {
      return filt.attributeTypeId == 2;
    });
    this.stringtncData = this.notepadAttributesList.filter(function (filt) {
      return filt.attributeTypeId == 3;
    });
  }

  getCommerceDataWithctrtId() {
    this.notepadAttributesList = [];
    // this.spinner.show();
    this.apiService
      .get(`secure/v1/airfreightcontract/commercial/${this.contractId}`)
      .subscribe(
        (res) => {
          // console.log("res", res);
          if (res.data) {
            this.paymentData = res.data;
            this.paymentCommercialRefData = res.data.referenceData;
            if (res.data.responseData && res.data.responseData.id) {
              this.paymentCommercialData = res.data.responseData;
              //  this.setDataObject(this.paymentCommercialData);
            }
            this.attrTypeListTnc = this.paymentCommercialRefData.attrTypeList;
            for (var item of this.paymentCommercialRefData.mdmNotepadList) {
              if (item.attributeTypeId === 3) {
                item.notepadInputVal = item.attributeValue;
              }
              if (this.paymentCommercialData && this.paymentCommercialData.assocNotepads && this.paymentCommercialData.assocNotepads.length > 0) {
                for (var notepadData of this.paymentCommercialData[
                  "assocNotepads"
                ]) {
                  if (
                    item.id == notepadData.notepadId &&
                    notepadData.notepadInputVal != undefined
                  ) {
                    item.notepadInputVal = notepadData.notepadInputVal ? notepadData.notepadInputVal.trim() : '';
                    item.status = notepadData.status;
                  }
                }
              }

              if (item.attributeTypeId == 1 || item.attributeTypeId == 2) {
                if (item.attributeValue){
                  item.attributeValue =  item.attributeValue              
                    .toUpperCase()
                    .split(",");
                    let finalValue = item.attributeValue.map(element => {
                      return element.trim();
                    });
                    item.attributeValue = finalValue;
                }
              }
              this.notepadAttributesList.push(item);
            }
            this.notepadData();
          }
          //   this.notepadData();
          //    this.getbranchWithctrtId();
          console.log("this.paymentCommercialData", this.paymentCommercialData);
          this.spinner.hide();
        },
        (err) => {
          // this.toastr.error()
          console.log(
            "Message : " + err.error.message,
            +"Path : " + err.error.path
          );
          this.spinner.hide();
        }

      );
    // this.spinner.show();
  }

  submitPayment(flag) {
    this.spinner.show();
    let validflag: boolean = false;
    let cloneObject = JSON.parse(JSON.stringify(this.paymentCommercialData));
    let asstypeObj = this.paymentCommercialRefData.assocPayoutTypeList.find(({ id }) => id == this.paymentCommercialData.lkpAirFreightPayoutOptId);

    if(asstypeObj.lookupVal != 'WEIGHT' &&  (!this.paymentCommercialData.airFreightCityPrdctCtgys ||  this.paymentCommercialData.airFreightCityPrdctCtgys.length == 0)){
      this.toastr.info('Add alteast a Product Catagory or City');
      validflag = true;
      this.spinner.hide();
      return
    }else{
      if(asstypeObj.lookupVal == 'CITY BASIS'){
        this.paymentCommercialData.airFreightCityPrdctCtgys.forEach(element => {
         if(!element.fromCityId || !element.toCityId){
          this.toastr.info('Add alteast a City');
          validflag = true;
          this.spinner.hide();
          return
         } 
        });
      }else{
        // this.spinner.hide();
        // this.addSlabTotalWeightProduct(obj);
        this.paymentCommercialData.airFreightCityPrdctCtgys.forEach(element => {
          if(element.prodIdArray){
            element.prdctCtgyId = element.prodIdArray.toString();
          }
          
        });
      }
    }

    this.paymentCommercialData.airFreightCityPrdctCtgys.forEach(element => {
      delete element.isValidEffectiveDt;
      delete element.isValidExpDt ;
      delete element.maxdate;
      if(element.wtCalcCtgy == "RATE PER KG"){
        element.airFreightWtSlabChrgs = [];
      }else{
        if(element.airFreightWtSlabChrgs && element.airFreightWtSlabChrgs.length > 0){
          element.airFreightWtSlabChrgs.forEach(elementObj => {
            if(elementObj.flag){
              this.toastr.info('Please fill  valid input in slab');
              validflag = true;
              this.spinner.hide();
              return
            }
          });
        }else{
          this.toastr.info('Please fill slab');
          validflag = true;
          this.spinner.hide();
          return
        }
      }
      this.paymentCommercialData.effectiveDt=element.effectiveDt;
     this.paymentCommercialData.expDt=element.expDt;
    });

    // if(asstypeObj.lookupVal == 'WEIGHT'){
    //   this.paymentCommercialData.airFreightCityPrdctCtgys.forEach(element => {
    //     delete element.assocCntrId;
    //   });
    // }
    // for (let key in this.paymentCommercialData) {
    //   if (this.paymentCommercialData[key] == null ) {
    //     console.log('this.paymentCommercialData[key]', key);
    //     return;
    //   }
    // }    
   
    let notepadTrans = []
    for (let item of this.radioButtontncData) {

      let data1 = {};
      data1["notepadId"] = item.id;
      data1["notepadInputVal"] = item.notepadInputVal;
      data1["effectiveDt"] = this.paymentCommercialData.effectiveDt;
      data1["expDt"] = this.paymentCommercialData.expDt;
      if (item['status'] && item['status'] !== 1) {
        data1["status"] = item['status'];
      }
      notepadTrans.push(data1);
    }
    for (let item of this.selectortncData) {
      let data1 = {};
      data1["notepadId"] = item.id;
      data1["notepadInputVal"] = item.notepadInputVal;
      data1["effectiveDt"] = this.paymentCommercialData.effectiveDt;
      data1["expDt"] = this.paymentCommercialData.expDt;
      if (item['status'] && item['status'] !== 1) {
        data1["status"] = item['status'];
      }
      notepadTrans.push(data1);
    }

    for (let item of this.stringtncData) {
      let data1 = {};
      data1["notepadId"] = item.id;
      data1["effectiveDt"] = this.paymentCommercialData.effectiveDt;
      data1["expDt"] = this.paymentCommercialData.expDt;
      data1["notepadInputVal"] = item.notepadInputVal;
      if (item['status'] && item['status'] !== 1) {
        data1["status"] = item['status'];
      }
      notepadTrans.push(data1);
    }

    if (this.paymentCommercialData && this.paymentCommercialData.assocNotepads && this.paymentCommercialData.assocNotepads.length) {
      for (let i = 0; i < this.paymentCommercialData.assocNotepads.length; i++) {
        for (let j = 0; j < notepadTrans.length; j++) {
          if (this.paymentCommercialData.assocNotepads[i].notepadId == notepadTrans[j].notepadId) {
            notepadTrans[j]["id"] = this.paymentCommercialData.assocNotepads[i].id;
            notepadTrans[j]["recIdentifier"] = this.paymentCommercialData.assocNotepads[i].recIdentifier;
            notepadTrans[j]["entityRefId"] = this.paymentCommercialData.assocNotepads[i].entityRefId;
          }
        }
      }
    }
    this.paymentCommercialData["assocNotepads"] = notepadTrans;
    //   console.log("data", this.paymentCommercialData);
     console.log(this.paymentCommercialData)
     delete this.paymentCommercialData.validationStatus;

    if(validflag == false){
      this.apiService.post(`secure/v1/airfreightcontract/commercial`, this.paymentCommercialData).subscribe((res) => {
        if (res.status == "SUCCESS") {
       //   this.getCommerceDataWithctrtId();
          
     //     this.paymentCommercialData = cloneObject;
          this.toastr.success('Saved Successfully');
          if (flag == 'next') {
            this.spinner.hide();
            if (this.editflow) {
              this.router.navigate(['/asso_air-contract/booking-sla-show', { steper: true, 'editflow': 'true' }], { skipLocationChange: true });
            } else {
              this.router.navigate(['/asso_air-contract/booking-sla-show'], { skipLocationChange: true });
            }
          }else{
            this.paymentCommercialData.id = res.responseData;
            // this.getCommerceDataWithctrtId();
            this.setData();
            // this.childValidation.setValueOfCityProductWeight()
          }
        } else {
         this.paymentCommercialData = cloneObject;
         this.spinner.hide();
          this.toastr.error(res.message);
        }
      }, (err) => {
        this.paymentCommercialData = cloneObject;
        console.log('err', err);
        this.spinner.hide();
        this.toastr.error(err.error.errors.error[0].code + ' : ' + err.error.errors.error[0].description);
      }
      )
    }else{
      this.spinner.hide();
      this.paymentCommercialData = cloneObject;
    }

  }




  editInput(element) {
    if (this.editflow) {
      element.status = this.editStatusId;
    }
  }

  effectiveDate(isExpToUpdate, element) {
    let effYear = parseInt(this.datePipe.transform(element.effectiveDt, 'yyyy'))
    if (effYear > 9999) {
      element.effectiveDt = "";
    } else {
      let a = this.datePipe.transform(element.effectiveMinDt, 'yyyy-MM-dd')
      let b = this.datePipe.transform(element.effectiveDt, 'yyyy-MM-dd')
      let c = element.expDt ?  this.datePipe.transform(element.expDt, 'yyyy-MM-dd') : null
      if (c && a) {
        if (a <= b && b < c) {
          element.isValidEffectiveDt = false;
        }
        else {
          element.isValidEffectiveDt = true;
        }
      }
      else if (c) {
        if (b < c) {
          element.isValidEffectiveDt = false;
        }
        else {
          element.isValidEffectiveDt = true;
        }
      } else if (a) {
        if (b >= a) {
          element.isValidEffectiveDt = false;
        }
        else {
          element.isValidEffectiveDt = true;
        }
      } else {
        element.isValidEffectiveDt = false;
      }
      if (b) {
        let e = new Date(b);
        e.setDate(e.getDate() + 1);
        element.expDt = e;
      }

      // increment exp date by one year
      // if(isExpToUpdate && b && !element.isValidEffectiveDt){
      //   let f = new Date(b);
      //   f.setFullYear(f.getFullYear()+1);
      //   element.expDt = f;
      // }
    }
    this.expDate(element);
  }

  expDate(element) {
    let expYear = parseInt(this.datePipe.transform(element.expDt, 'yyyy'))
    if (expYear > 9999) {
      element.expDt = "";
    } else {
      let a = this.datePipe.transform(element.effectiveMinDt, 'yyyy-MM-dd')
      let b = this.datePipe.transform(element.effectiveDt, 'yyyy-MM-dd')
      let c = element.expDt ? this.datePipe.transform(element.expDt, 'yyyy-MM-dd') : null

      if (b) {
        if (b < c) {
          element.isValidExpDt = false;
        }
        else {
          element.isValidExpDt = true;
        }
      } else if (a) {
        if (a < c) {
          element.isValidExpDt = false;
        }
        else {
          element.isValidExpDt = true;
        }
      } else {
        element.isValidExpDt = false;
      }
      if (c) {
        var e = new Date(c);
        e.setDate(e.getDate() - 1);
        element.maxdate = e;
      } else {

        element.isValidExpDt = false;
      }
    }
  }

  deleteBranchDialog(customer) {
    const dialog = this.dialog.open(confimationdialog, {
      data: { message: "Are you sure want to Delete?" },
      disableClose: true,
      panelClass: 'creditDialog',
      width: '300px'
    });

    dialog.afterClosed().subscribe(res => {
      if (res) {
        this.paymentCommercialData.bookingCommercialCustomerList = this.paymentCommercialData.bookingCommercialCustomerList.filter(function (obj) {
          return obj.msaCustId !== customer.msaCustId;
        });
        this.paymentCommercialData.custPymtFlag = 0;
      }
    });
  }

  remove() {
    this.router.navigate(['/asso_air-contract/booking-sla-show'], { skipLocationChange: true });
  }

  nextReadMode() {
    if(this.editflow){
      this.router.navigate(['/asso_air-contract/booking-sla-show',{steper:true, editflow : this.editflow}], {skipLocationChange: true})
    } else {
      this.router.navigate(['/asso_air-contract/booking-sla-show'], {skipLocationChange: true});
    }
  }

}
