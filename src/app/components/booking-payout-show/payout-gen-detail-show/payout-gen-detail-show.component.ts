import { Component, OnInit, Input } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import { AppSetting } from 'src/app/app.setting';
import { DatePipe } from '@angular/common';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { AddCityComponent } from 'src/app/dialog/add-city/add-city.component';
import { MatDialog } from '@angular/material';
import { ApiService } from "src/app/core/services/api.service";
import { confimationdialog } from 'src/app/dialog/confirmationdialog/confimationdialog';

export enum AllValues {
  WEIGHT = "A",
  CITY = "B",
  PRODUCT = "C",
}
@Component({
  selector: 'app-payout-gen-detail-show',
  templateUrl: './payout-gen-detail-show.component.html',
  styleUrls: ['./payout-gen-detail-show.component.css']
})
export class PayoutGenDetailShowComponent implements OnInit {

  @Input() payoutGenDetail: any;
  @Input() payoutGenRefDetail: any;
  @Input() indexValue: any;

  AddWeightFlag: boolean = false;
  allValues = AllValues;
  myValue: AllValues = AllValues.WEIGHT;
  addCityFlag: boolean = false;
  AddproductFlag: boolean = false;
  showCity: boolean = false;
  showProduct: boolean = false;
  valueOptions = Object.keys(AllValues);
  contractdata: any;
  productcategoryList: any = [];
  editflow: boolean;
  perList: any = [];
  exAttrMap = new Map();
  exAttrKeyList =  [];
  searchcityFromType:any[] = [];
  isInvalidSlabData: boolean = false;   
  constructor(
    private apiService: ApiService,
    private acRoute: ActivatedRoute,
    public datePipe: DatePipe,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private authorizationService : AuthorizationService,
    private permissionsService: NgxPermissionsService
  ) { }

  ngOnInit() {
    // this.spinner.show();
    this.authorizationService.setPermissions('COMMERCIAL');
    this.perList = this.authorizationService.getPermissions('COMMERCIAL') == null ? [] : this.authorizationService.getPermissions('COMMERCIAL');
    this.permissionsService.loadPermissions(this.perList);
    this.exAttrMap = this.authorizationService.getExcludedAttributes('COMMERCIAL');
    this.exAttrKeyList = Array.from(this.exAttrMap.values());
    console.log('Attribute List', this.exAttrKeyList);
    console.log('perlist',this.perList)
    this.acRoute.params.subscribe(x => {
      if (x.editflow) {
        this.editflow = x.editflow;
      }
    });
  
    this.apiService.get('/secure/v1/airfreightcontract/' + AppSetting.contractId)
      .subscribe(response => {
        this.contractdata = response.data.responseData;
      })
    // this.setValueOfCityProductWeight();  

  }
  ngOnChanges() {
    this.setValueOfCityProductWeight();
    // this.spinner.hide();
    console.log('this.payoutGenDetail.id', this.payoutGenDetail.id);
  }
  setValueOfCityProductWeight(){
    if (this.payoutGenDetail.airFreightCityPrdctCtgys && this.payoutGenDetail.airFreightCityPrdctCtgys.length > 0) {  
      let producType = this.payoutGenRefDetail.assocPayoutTypeList.find(({ id }) => id == this.payoutGenDetail.lkpAirFreightPayoutOptId);
      if (this.payoutGenDetail.airFreightCityPrdctCtgys.length > 0 && producType.lookupVal == "CITY BASIS") {    
        this.addCityFlag = true;
        this.AddproductFlag = false;
        this.AddWeightFlag = false;
        this.payoutGenDetail.airFreightCityPrdctCtgys.forEach(element => {
          if(element.airFreightWtSlabChrgs && element.airFreightWtSlabChrgs.length > 0){
            // console.log(element, 'element');
            element.airFreightWtSlabChrgs.sort((a, b) => a.slabFrom < b.slabFrom ? -1 : (a.slabFrom > b.slabFrom ? 1 : 0))

          }
          // element.toCityName = '';
          // element.fromCityName=  '';
         let fromSplit= element.fromCityId ? element.fromCityId.split(',') : null;
         element['fromCityName']='';
         if(fromSplit && fromSplit.length > 0){
         fromSplit.forEach(fsplit => {
              this.apiService.get('/secure/v1/geography/city/id/' + fsplit)
            .subscribe(response => {
              element.fromCityName=  element.fromCityName ? `${element.fromCityName} , ${response.data.responseData.cityName} ` : response.data.responseData.cityName;
              // element.fromCityName= response.data.responseData.cityName+','+element.fromCityName;
            })
           
         });
        }
         element['toCityName'] ='';
         let toSplit= element.toCityId ? element.toCityId.split(',') : null;
         if(toSplit && toSplit.length > 0){
          toSplit.forEach(tsplit => {
            this.apiService.get('/secure/v1/geography/city/id/' + tsplit)
              .subscribe(response => {
               
                element.toCityName=  element.toCityName ? `${element.toCityName} , ${response.data.responseData.cityName} ` : response.data.responseData.cityName;
              }) 
       });
         }
        });
      
      } else if (this.payoutGenDetail.airFreightCityPrdctCtgys.length > 0 && producType.lookupVal == "PRODUCT CATEGORY") {
      
        this.getProductList();
        this.addCityFlag = false;
        this.AddproductFlag = true;
        this.AddWeightFlag = false;

      
      } else if (this.payoutGenDetail.airFreightCityPrdctCtgys.length > 0 && producType.lookupVal == "WEIGHT") {
        this.addCityFlag = false;
        this.AddproductFlag = false;
        this.AddWeightFlag = true;
      }
    }
    if(this.payoutGenDetail.airFreightCityPrdctCtgys && this.payoutGenDetail.airFreightCityPrdctCtgys.length > 0){
      this.payoutGenDetail.airFreightCityPrdctCtgys.forEach(element => {
        if(element.airFreightWtSlabChrgs && element.airFreightWtSlabChrgs.length > 0){
          // console.log(element, 'element');
          element.airFreightWtSlabChrgs.sort((a, b) => a.slabFrom < b.slabFrom ? -1 : (a.slabFrom > b.slabFrom ? 1 : 0))
  
        }});
    }
   console.log('this.payoutGenDetail.id',this.payoutGenDetail.id);
    this.spinner.hide();

      
  }
  getProductList(){     
  
  this.apiService.get('/secure/v1/airfreightcontract/commercial/productcategory')
  .subscribe(response => {
    this.productcategoryList = response.data.responseData;
    this.productcategoryList.forEach(element => {
      this.payoutGenDetail.airFreightCityPrdctCtgys.forEach(prctId => {
        let splitData = prctId.prdctCtgyId.split(',');
        // splitData.forEach(ele => {
        //   if (element.id == ele) {
        //     element.check = true;
        //   }
        // });
        if(splitData && splitData.length > 0){
          let mappedData = splitData.map(x => parseInt(x));
          prctId['prodIdArray'] = mappedData;
        } else {
          prctId['prodIdArray'] = [];
        }
      this.searchcityFromType.push('');
    });
  });
  console.log('product list',this.payoutGenDetail.airFreightCityPrdctCtgys)
  
  })}
  payoutChange(da, event) {
    let asstypeObj = this.payoutGenRefDetail.assocPayoutTypeList.find(({ id }) => id == event.value);
    if (asstypeObj.lookupVal == 'CITY BASIS') {
      this.addCityFlag = true;
      this.AddproductFlag = false;
      this.AddWeightFlag = false;
     
      if (this.payoutGenDetail.airFreightCityPrdctCtgys) {
        this.payoutGenDetail.airFreightCityPrdctCtgys = [];
      } else {
        this.payoutGenDetail['airFreightCityPrdctCtgys'] = [];
      }
      this.Addcities();
    }
    else if (asstypeObj.lookupVal == 'PRODUCT CATEGORY') {
      this.getProductList();
      this.addCityFlag = false;
      this.AddproductFlag = true;
      this.AddWeightFlag = false;
      
      if (this.payoutGenDetail.airFreightCityPrdctCtgys) {
        this.payoutGenDetail.airFreightCityPrdctCtgys = [];
      } else {
        this.payoutGenDetail['airFreightCityPrdctCtgys'] = [];
      }
      this.Addproduct();
    }
    else if (asstypeObj.lookupVal == 'WEIGHT') {

      if (this.payoutGenDetail.airFreightCityPrdctCtgys) {
        this.payoutGenDetail.airFreightCityPrdctCtgys = [];
      } else {
        this.payoutGenDetail['airFreightCityPrdctCtgys'] = [];
      }
      this.AddWeightFlag = true;
      this.addCityFlag = false;
      this.AddproductFlag = false;
      let obj: any = {
        "airFreightWtSlabChrgs": [],
        "assocCntrId": AppSetting.contractId,
        "crtdBy": this.contractdata.crtdBy,
        "crtdDt": this.contractdata.crtdDt,
        "effectiveDt": "",
        "expDt": "",
        "prdctCtgyId": null,
        "fromCityId": null,
        "toCityId": null,
        "updBy": this.contractdata.updBy,
        "updDt": this.contractdata.updDt,
        "wtCalcCtgy": "RATE PER KG"
      }
      if(this.payoutGenDetail.id){
        obj.airFreightCmrclId = this.payoutGenDetail.id;
      }
      if (this.payoutGenDetail.airFreightCityPrdctCtgys) {
        this.payoutGenDetail.airFreightCityPrdctCtgys.push(obj);
      } else {
        this.payoutGenDetail['airFreightCityPrdctCtgys'] = [];
        this.payoutGenDetail.airFreightCityPrdctCtgys.push(obj);
      }
    }
  }


  Addcities() {
    let obj: any = {
      "airFreightWtSlabChrgs": [],
      "assocCntrId": AppSetting.contractId,
      "crtdBy": this.contractdata.crtdBy,
      "crtdDt": this.contractdata.crtdDt,
      "effectiveDt": this.contractdata.effectiveDt,
      "expDt": this.contractdata.expDt,
      "fromCityId": null,
      "toCityId": null,
      "updBy": this.contractdata.updBy,
      "updDt": this.contractdata.updDt,
      "fromCityName": "",
      "toCityName": "",
      "wtCalcCtgy": "RATE PER KG"
    }
    if(this.payoutGenDetail.id){
      obj.airFreightCmrclId = this.payoutGenDetail.id;
    }

    if (this.payoutGenDetail.airFreightCityPrdctCtgys) {
      this.payoutGenDetail.airFreightCityPrdctCtgys.push(obj);
    } else {
      this.payoutGenDetail['airFreightCityPrdctCtgys'] = [];
      this.payoutGenDetail.airFreightCityPrdctCtgys.push(obj);
    }

  }
  Addproduct() {
    // this.showProduct= true;
    let obj: any = {
      "airFreightWtSlabChrgs": [],
      "assocCntrId": AppSetting.contractId,
      "crtdBy": this.contractdata.crtdBy,
      "crtdDt": this.contractdata.crtdDt,
      "effectiveDt": "",
      "expDt": "",
      "prdctCtgyId": null,
      "updBy": this.contractdata.updBy,
      "updDt": this.contractdata.updDt,
      "wtCalcCtgy": "RATE PER KG",
      "fromCityId": null,
      "minAmt": null,
      "price": null,
      "toCityId": null,
    }
    if(this.payoutGenDetail.id){
      obj.airFreightCmrclId = this.payoutGenDetail.id;
    }
    if (this.payoutGenDetail.airFreightCityPrdctCtgys) {
      this.payoutGenDetail.airFreightCityPrdctCtgys.push(JSON.parse(JSON.stringify(obj)));
      this.searchcityFromType.push('');
    } else {
      this.payoutGenDetail['airFreightCityPrdctCtgys'] = [];
      this.payoutGenDetail.airFreightCityPrdctCtgys.push(obj);
      this.searchcityFromType.push('');
    }

  }
  editInput(obj) {
    if (this.editflow ) {
      // && obj.id
      obj.status = AppSetting.editStatus;
      this.payoutGenDetail.status = AppSetting.editStatus;
    }

  }
  selectProductCategoryChange(obj, proName) {
    // console.log(obj, proName,);
    
    this.productcategoryList.forEach(element => {
    //   this.payoutGenDetail.airFreightCityPrdctCtgys.forEach(prctId => {
    //     prctId.prodIdArray.forEach(ele => {
    //       if (element.id == ele) {
    //         element.check = true;
    //       }else{
    //         element.check = false;
    //       }
    //     });
    // });
    });
  }
  effectiveDate(isExpToUpdate, element) {
    let effYear = parseInt(this.datePipe.transform(element.effectiveDt, 'yyyy'))
    if (effYear > 9999) {
      element.effectiveDt = "";
    } else {
      let a = this.datePipe.transform(element.effectiveMinDt, 'yyyy-MM-dd')
      let b = this.datePipe.transform(element.effectiveDt, 'yyyy-MM-dd')
      let c = this.datePipe.transform(element.expDt, 'yyyy-MM-dd')
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
      // if (b) {
      //   let e = new Date(b);
      //   e.setDate(e.getDate() + 1);
      //   element.expDt = e;
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
      let c = this.datePipe.transform(element.expDt, 'yyyy-MM-dd')

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


  openSearchCityModal(dObj, flag, obj) {
    console.log('><><><<', obj);
    const dialogRef = this.dialog.open(AddCityComponent, {
      data: {'dObj' : dObj, 'flag' : flag, 'obj' : obj},
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result);
      // console.log(result, 'akjdhsaksjdhalksj')
      if (result) {
        if (flag) {
          // dObj.fromCityName = result.checkedVehicle[0].cityName;
          dObj.fromCityName = result.checkedVehicle.map(x => x.cityName).toString();
          dObj.fromCityId = result.checkedVehicle.map(x => x.id).toString();
        } else {
          dObj.toCityName = result.checkedVehicle.map(x => x.cityName).toString();
          dObj.toCityId = result.checkedVehicle.map(x => x.id).toString();
        }
      }
    })

  }
  rateFunctionProduct(da: string, obj: any) {
    obj.wtCalcCtgy = da;
    if(obj.wtCalcCtgy == "TOTAL WEIGHT" || da == "TOTAL WEIGHT"){     
      let asstypeObj = this.payoutGenRefDetail.assocPayoutTypeList.find(({ id }) => id == this.payoutGenDetail.lkpAirFreightPayoutOptId);
      if(asstypeObj.lookupVal == 'CITY BASIS'){
        this.addSlabTotalWeightCity(obj,true);
      }else{
        this.addSlabTotalWeightProduct(obj, true);
      }

    } else {
      obj.price = null;
      obj.minAmt = null;
      obj.effectiveDt = null;
      obj.expDt = null;
      obj.airFreightWtSlabChrgs = [];
    }
    
  }
  weightFunctionProduct(da: string, obj: any) {
    obj.wtCalcCtgy = da;
    if(obj.wtCalcCtgy == "TOTAL WEIGHT" || da == "TOTAL WEIGHT"){     
      let asstypeObj = this.payoutGenRefDetail.assocPayoutTypeList.find(({ id }) => id == this.payoutGenDetail.lkpAirFreightPayoutOptId);
      if(asstypeObj.lookupVal == 'CITY BASIS'){
        this.addSlabTotalWeightCity(obj,true);
      }else{
        this.addSlabTotalWeightProduct(obj, true);
      }
    } else {
      obj.price = null;
      obj.minAmt = null;
      obj.effectiveDt = null;
      obj.expDt = null;
      obj.airFreightWtSlabChrgs = [];
    }
  }

  addSlabTotalWeightProduct(dataObj, flag) {    
    let obj = {
      "assocCntrId": AppSetting.contractId,
      "crtdBy": this.contractdata.crtdBy,
      "crtdDt": this.contractdata.crtdDt,
      "effectiveDt": this.contractdata.effectiveDt,
      "expDt": this.contractdata.expDt,
      //  "prdctCtgyId": null,
      "updBy": this.contractdata.updBy,
      "updDt": this.contractdata.updDt,
      "slabFrom": !flag ? (dataObj.airFreightWtSlabChrgs.length > 0 ? Number(dataObj.airFreightWtSlabChrgs[dataObj.airFreightWtSlabChrgs.length - 1].slabTo) + 1 : 0) : 0,
      "slabTo": null,
      "price": null,
    };
    if(this.payoutGenDetail.id){
      obj['airFreightCmrclId'] = this.payoutGenDetail.id;
    }

    // if (dataObj.airFreightWtSlabChrgs && dataObj.airFreightWtSlabChrgs.length > 0) {
    //   if(flag == false){
    //     dataObj.airFreightWtSlabChrgs.push(obj);
    //   }

    // } else {
    //   dataObj['airFreightWtSlabChrgs'] = [];
    //   dataObj.airFreightWtSlabChrgs.push(obj);
    // }

    // Make Object empty 
    if(flag){
    dataObj['airFreightWtSlabChrgs'] = [];
    dataObj.airFreightWtSlabChrgs.push(obj);
    dataObj.price = null;
    dataObj.minAmt = null;
    dataObj.effectiveDt = null;
    dataObj.expDt = null;
    } else {
      dataObj.airFreightWtSlabChrgs.push(obj);
    }
    this.validCust(null, dataObj);
  }
  deleteSlabTOTALWEIGHT(data: any, index: number) {
     data.splice(index, 1);
  }

  addSlabTotalWeightCity(dataObj,flag) {
    let obj = {
      "assocCntrId": AppSetting.contractId,
      "crtdBy": this.contractdata.crtdBy,
      "crtdDt": this.contractdata.crtdDt,
      "effectiveDt": this.contractdata.effectiveDt,
      "expDt": this.contractdata.expDt,
      "updBy": this.contractdata.updBy,
      "updDt": this.contractdata.updDt,
      "slabFrom": !flag ? (dataObj.airFreightWtSlabChrgs.length > 0 ? Number(dataObj.airFreightWtSlabChrgs[dataObj.airFreightWtSlabChrgs.length - 1].slabTo) + 1 : 0) : 0,
      "slabTo": null,
      "price": null,
    };
    if(this.payoutGenDetail.id){
      obj['airFreightCmrclId'] = this.payoutGenDetail.id;
    }
    // if (dataObj.airFreightWtSlabChrgs.length == 0) {
    //   dataObj.airFreightWtSlabChrgs.push(obj);
    // } else {
    //  if(dataObj.airFreightWtSlabChrgs.find( ({ slabTo ,price}) => slabTo ==  null || price == null) == undefined){
    //   dataObj.airFreightWtSlabChrgs.push(obj);
    //  }
    // }

    // On change button make obj empty
    if(flag){
    dataObj['airFreightWtSlabChrgs'] = [];
    dataObj.airFreightWtSlabChrgs.push(obj);
    dataObj.price = null;
    dataObj.minAmt = null;
    dataObj.effectiveDt = null;
    dataObj.expDt = null;
    } else {
      if(dataObj.airFreightWtSlabChrgs.find( ({ slabTo ,price}) => slabTo ==  null || price == null) == undefined){
         dataObj.airFreightWtSlabChrgs.push(obj);
      }
    }

  }

  validCust(f, objSlab){
    // console.log('f', f);
    objSlab.maxFlag = false; 
    objSlab.slaFrmValidFlag = false;
    if(f){
      objSlab.slaFrmValidFlag = f.invalid;
      // return this.slaFrmValidFlag;
    }
    // if(!f.invalid){
      let length = objSlab.airFreightWtSlabChrgs.length;
      objSlab.airFreightWtSlabChrgs.forEach((obj, index) => {
        if(Number(obj.slabFrom) >= Number(obj.slabTo)){          
          objSlab.slaFrmValidFlag = true;
          obj['flag'] = true;
          return objSlab.slaFrmValidFlag;
        }else{
          if(((Number(obj.slabTo)) + 1) >= 99999999){
            // console.log('length', index)
            objSlab.airFreightWtSlabChrgs.splice(-1, (length - (index +1)))
            objSlab.slaFrmValidFlag = false;
            objSlab.maxFlag = true;
            obj['flag'] = false;
            return objSlab.maxFlag;
          }
          obj['flag'] = false;
        } 
      })
    // }
    this.isInvalidSlabData = objSlab.slaFrmValidFlag;
    return objSlab.slaFrmValidFlag;
  }
  changeValue(index, column, value,objSlab) {
    // console.log('objSlab?>>>', objSlab, index);
    // debugger
    if(column=='slabTo'){
      if(objSlab.airFreightWtSlabChrgs[index + 1]){
        // console.log('objSlab.airFreightWtSlabChrgs[index + 1]', objSlab.airFreightWtSlabChrgs[index + 1]['slabFrom'])
        objSlab.airFreightWtSlabChrgs[index + 1]['slabFrom'] = Number(value) + 1;
    }else{
      objSlab.airFreightWtSlabChrgs[index][column] = value;
    }
    }    
  }

  validationData(data){
    this.payoutGenDetail.validationStatus=data;
  }

  deleteCity(obj,flag, index){
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      data:{message:'Are you sure ?'},
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if(value){
        if(flag == 'product'){
          // this.productcategoryList.forEach(objpro => {
          //   objpro.check = false;
          // });
          obj.splice(index, 1);
          this.searchcityFromType.splice(index,1);
            if(this.payoutGenDetail.airFreightCityPrdctCtgys && this.payoutGenDetail.airFreightCityPrdctCtgys.length > 0){
            //   this.productcategoryList.forEach(element => {
            //     this.payoutGenDetail.airFreightCityPrdctCtgys.forEach(prctId => {
            //       prctId.prodIdArray.forEach(ele => {
            //         if (element.id == ele) {
            //           element.check = true;
            //         }else{
            //           element.check = false;
            //         }
            //       });
            //   })
            // });
          }
        }else{
          obj.splice(index, 1);
        }
        
      }
    });

    
  }

  getProductCategoryNames(array) {
    let producatName = '';
    if(array != undefined) {
      array.forEach((element,index) => {
        let obj  = this.productcategoryList.find(x => x.id == element);
        if(obj !== undefined) {
          if (index == 0) {
            producatName = obj.prdctCtgy;
          } else {
            producatName = producatName + ',' + obj.prdctCtgy;
          }
        }
      });
      
    }
    return producatName;
  }

}
