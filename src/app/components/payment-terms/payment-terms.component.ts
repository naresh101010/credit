import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../../core/services/api.service';
import { AppSetting } from '../../app.setting';
import { ErrorConstants } from '../../core/models/constants';
import { AuthorizationService } from 'src/app/core/services/authorization.service';

@Component({
  selector: 'app-payment-terms',
  templateUrl: './payment-terms.component.html',
  styleUrls: ['./payment-terms.component.css'],
  providers: [DatePipe]
})
export class PaymentTermsComponent implements OnInit {
 // paymentTermsData: any;
  referenceData: any;
  contractData: any;
  radioButtontncData: any;
  selectortncData: any;
  stringtncData: any;
  mdmNotepadList: any = [];
  notepadAttributesList = [];
  searchNotePad: string = '';
  editflow: boolean;
  fuelData: any;
  routeData: any;
  routeID: number;
  commercialRefData: any;
  routeDistance: any;
  priceFound: boolean = false;
  contractID: number;
  rateLable :  string = "Rate Per KM";
  exAttrMap = new Map();
  exAttrKeyList =  [];

  paymentTermsData = {
    id: null,
    assocCntrId : null,
    lkpAssocNrmPayoutOptId: '',
    price: '',
    lkpFuelTypeId: '',
    fuelBaseDt: '',
    lkpFuelIndexId: '',
    fuelBasePrice: '',
    addtnlExpnsFlag: 0,
    addtnlExpnsRemark: '',
    flfcClause1: '',
    flfcClause2: '',
    effectiveDt: '',
    expDt: '',
    assocNotepads: [],
  }

  constructor(private apiService: ApiService,
    private tosterservice: ToastrService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    private router: Router,
    private authorizationService : AuthorizationService,
    private acRoute: ActivatedRoute) { }

  ngOnInit() {
    this.exAttrMap = this.authorizationService.getExcludedAttributes('PAYMENT TERMS');
    this.exAttrKeyList = Array.from(this.exAttrMap.values());
    console.log('Attribute List', this.exAttrKeyList);

    this.contractID = AppSetting.contractId;

    this.acRoute.params.subscribe(x => {
      this.editflow = x.editflow;
    });

    /*------ get contract data --------- */
    this.apiService.get('secure/v1/networkcontract/' + this.contractID).subscribe(data => {
      let ob = ErrorConstants.validateException(data);
      if (ob.isSuccess) {
        this.contractData = data.data.responseData;
      }
    }, (error) => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });

    this.spinner.show();
    /*-------- get route data --------- */
    this.apiService.get('secure/v1/networkcontract/contracts/routes/' + this.contractID).subscribe(data => {
      let ob = ErrorConstants.validateException(data);
      if (ob.isSuccess) {
        this.routeData = data.data.responseData;
        let routeID = this.routeData.id;

        this.apiService.get(`secure/v1/networkcontract/commercial/${this.contractID}/${routeID}`).subscribe(response => {
          let ob1 = ErrorConstants.validateException(data);
          if (ob1.isSuccess) {
            this.commercialRefData = response.data.referenceData;
            if (this.commercialRefData.route) {
              this.routeDistance = this.commercialRefData.route.routeDistKm;
            } else {
              this.routeDistance = '';
            }
          }
          this.spinner.hide();
        }, (error) => {
          this.tosterservice.error(ErrorConstants.getValue(404));
          this.spinner.hide();
        });
      }
    }, (error) => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });

    this.getPaymentTermsData();

  }

  getPaymentTermsData() {
    this.spinner.show();
    this.notepadAttributesList = [];
    this.apiService.get('secure/v1/networkContract/paymentTerms/' + this.contractID).subscribe(data => {
      let ob = ErrorConstants.validateException(data);
      if (ob.isSuccess) {
        this.referenceData = data.data.referenceData;
        this.mdmNotepadList = data.data.referenceData.mdmNotepadList;
        if (data.data.responseData && Object.keys(data.data.responseData).length > 0) {
          this.paymentTermsData = data.data.responseData;
          this.payoutRateChange(this.paymentTermsData.lkpAssocNrmPayoutOptId);
          this.getFuelData();
          this.priceFound = true;
        } 
        for (var item of this.mdmNotepadList) {
          if (item.attributeTypeId === 3) {
            item.notepadInputVal = item.attributeValue;
          }
          if (this.paymentTermsData && this.paymentTermsData.assocNotepads && this.paymentTermsData.assocNotepads.length > 0) {
            for (var notepadData of this.paymentTermsData[
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
      // this.spinner.hide();
    }, (error) => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });
  }

  /*----------- Create and update payment Data ------ */
  onSavePaymentTerms(flag) {
 
    /* set Notepad Data */
    let notepadTrans = []

    for (let item of this.radioButtontncData) {
      let data1 = {};
     // data1["entityRefId"] = this.contractID;
     if(this.paymentTermsData.id !== null){
      data1['entityRefId'] = this.paymentTermsData.id;
     }
    
      data1["notepadId"] = item.id;
      data1["notepadInputVal"] = item.notepadInputVal;
      if (item['status'] && item['status'] !== 1) {
        data1["status"] = item['status'];
      }
      notepadTrans.push(data1);
    }
    for (let item of this.selectortncData) {
      let data1 = {};
      if(this.paymentTermsData.id !== null) {
        data1['entityRefId'] = this.paymentTermsData.id;
      } 
      data1["notepadId"] = item.id;
      data1["notepadInputVal"] = item.notepadInputVal;
      if (item['status'] && item['status'] !== 1) {
        data1["status"] = item['status'];
      }
      notepadTrans.push(data1);
    }

    for (let item of this.stringtncData) {
      let data1 = {};
      if(this.paymentTermsData.id !== null){
        data1['entityRefId'] = this.paymentTermsData.id;
      }
      data1["notepadId"] = item.id;
      data1["notepadInputVal"] = item.notepadInputVal;
      if (item['status'] && item['status'] !== 1) {
        data1["status"] = item['status'];
      }
      notepadTrans.push(data1);
    }

    if (this.paymentTermsData && this.paymentTermsData.assocNotepads && this.paymentTermsData.assocNotepads.length) {
      for (let i = 0; i < this.paymentTermsData.assocNotepads.length; i++) {
        for (let j = 0; j < notepadTrans.length; j++) {
          if (this.paymentTermsData.assocNotepads[i].notepadId == notepadTrans[j].notepadId) {
            notepadTrans[j]["id"] = this.paymentTermsData.assocNotepads[i].id;
          }
        }
      }
    }
    this.paymentTermsData["assocNotepads"] = notepadTrans;
    this.paymentTermsData["assocNotepads"].forEach(obj => {
      obj.effectiveDt = this.contractData.effectiveDt;
      obj.expDt = this.contractData.expDt;
    });

  if(this.paymentTermsData.id == null){
    delete this.paymentTermsData.id;
  }
  this.paymentTermsData.assocCntrId = this.contractID;
  this.paymentTermsData.effectiveDt= this.contractData.effectiveDt;
  this.paymentTermsData.expDt = this.contractData.expDt;
  //console.log('data', this.paymentTermsData);

  this.spinner.show();
  this.apiService.post('secure/v1/networkContract/paymentTerms',this.paymentTermsData).subscribe(data => {
    if(flag == 0){
      if(this.editflow){
        this.router.navigate(['/asso_network-contract/booking-sla',{steper:true, editflow : this.editflow}], {skipLocationChange: true})
      } else {
        this.router.navigate(['/asso_network-contract/booking-sla'], {skipLocationChange: true});
      }
    } else {
      this.paymentTermsData.id = data.data.responseData;
     this.getPaymentTermsData();
    }
    this.tosterservice.success('Saved Successfully');
    this.spinner.hide();
  }, (error) => {
    this.tosterservice.error(error.error.errors.error[0].description);
    this.spinner.hide();
  })


  }

  /*--------- filter notepad data into RadioButton, Dropdown and Input box groups---------- */
  notepadData() {
    this.radioButtontncData = this.notepadAttributesList.filter(function (filt) {
      return filt.attributeTypeId == 1;
    });
    this.selectortncData = this.notepadAttributesList.filter(function (filt) {
      return filt.attributeTypeId == 2;
    });
    this.stringtncData = this.notepadAttributesList.filter(function (filt) {
      return filt.attributeTypeId == 3;
    });
  }

  /*--------- On Select Fuel Index ------- */
  onSelectFuelIndex() {
    this.paymentTermsData.fuelBasePrice = null;
    this.paymentTermsData.fuelBaseDt = null;
    this.getFuelData();
  }


  /*---------- get base fuel price ------- */
  getFuelData() {
    if (this.paymentTermsData.lkpFuelTypeId != '' && this.paymentTermsData.lkpFuelIndexId != '') {
      this.spinner.show();
      this.fuelData = [];
      this.apiService.get(`secure/v1/networkContract/fuel?fuelIndex=${this.paymentTermsData.lkpFuelIndexId}&fuelType=${this.paymentTermsData.lkpFuelTypeId}`).subscribe(res => {
        let ob = ErrorConstants.validateException(res);
        if (ob.isSuccess) {
          this.fuelData = res.data.responseData;
          this.fuelData.forEach(element => {
            element['fuelbaseDt']=this.datePipe.transform(element.fuelbaseDt, 'yyyy-MM-dd');
          });
          // if (this.fuelData.length == 1) {
          //   this.paymentTermsData.fuelBaseDt = this.fuelData[0].fuelbaseDt;
          //   this.onSelectFuelBaseDate();
          // }
          if (this.fuelData == undefined || this.fuelData.length == 0) {
            this.paymentTermsData.fuelBasePrice = null;
          }
        }
         this.spinner.hide();
      }, (error) => {
        this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      })
    }
  }



  /*------ set edit status in edit flow ------------- */
  changeInEditFlow(obj) {
    if (this.editflow) {
      obj.status = AppSetting.editStatus;
    }
  }

  /*------------ on change fuel type ------ */
  onFuelTypeChange(){
    this.paymentTermsData.fuelBaseDt=null;
    this.paymentTermsData.lkpFuelIndexId=null;
    this.paymentTermsData.fuelBasePrice=null;
  }

  /*------ On select Fuel base date ------- */
  onSelectFuelBaseDate() {
   
    if (!this.paymentTermsData.fuelBaseDt) {
      this.paymentTermsData.fuelBasePrice = null;
      return;
    }
    let flfcYear = parseInt(this.datePipe.transform(this.paymentTermsData.fuelBaseDt, 'yyyy'))
    if (flfcYear > 9999) {
      this.paymentTermsData.fuelBaseDt = "";
    } else {
      this.paymentTermsData.fuelBaseDt = this.datePipe.transform(this.paymentTermsData.fuelBaseDt, 'yyyy-MM-dd')
      this.priceFound = false;
      this.paymentTermsData.fuelBasePrice = null;
      for (let fdata of this.fuelData) {
        let date = this.datePipe.transform(fdata.fuelbaseDt, 'yyyy-MM-dd');
        if (this.paymentTermsData.fuelBaseDt == date) {
          this.priceFound = true;
          this.paymentTermsData.fuelBasePrice = fdata.fuelbasePrice;
          break;
        }
      }
      if (!this.priceFound) {
        this.tosterservice.error('No Fuel Price Found !');
      }
    }
  }

  /*-------- On Change Payout Rate ------ */
  payoutRateChange(value) {
    if (this.referenceData && this.referenceData.nrmPayOutList) {
      let payout = this.referenceData.nrmPayOutList.find(x => x.id == value);
      if (payout) {
        if (payout.lookupVal == 'RATE PER KM') {
          this.rateLable = 'Rate Per KM';
        } else {
          this.rateLable = 'Rate Per Route';
        }
      }
    }
  }

}
