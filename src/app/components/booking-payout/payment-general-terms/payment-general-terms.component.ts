import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppSetting } from 'src/app/app.setting';
import { ErrorConstants } from 'src/app/core/models/constants';
import { MatTableDataSource } from '@angular/material';
import { NgForm } from '@angular/forms';
import { AuthorizationService } from '../../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { element } from 'protractor';

@Component({
  selector: 'app-payment-general-terms',
  templateUrl: './payment-general-terms.component.html',
  styleUrls: ['./payment-general-terms.component.css'],
  providers: [DatePipe]
})
export class PaymentGeneralTermsComponent implements OnInit {

  @Input() contractData: any;
  @ViewChild('generalTermPayment',{static:false}) genTermForm : NgForm;
  @ViewChild('fCustomSla',{static:false}) clauseSlabForm : NgForm;
  
  paymentCommercialData: any;
  contractId: number;
  editflow: boolean;
  dataSourceExBranch = new MatTableDataSource();
  exGratiaType: any = [
    { name: 'FIXED' },
    { name: 'CLAUSE' }
  ];
  branchList: any = [];
  exGratiaArray: any = [];
  mgArray: any = [];
  notepadAttributesList = [];
  searchMonth: string = '';
  displayedColumns1: string[] = [
    "ExBranch",
    "ExAmount",
    "ExReaspm",
    "ExSdate",
    "ExEdate",
  ];

  displayedColumns2: string[] = [
    "MgBranch",
    "MgAmount",
    "MgReaspm",
    "MgSdate",
    "MgEdate",
    "mgCycle",
    "Month"
  ];
  dataSourceMgBranch = new MatTableDataSource();
  mgCycles: any = [
    { name: 'MONTHLY' },
    { name: 'YEARLY' }
  ];

  monthData: any = [
    { name: 'JANUARY' },
    { name: 'FEBRUARY' },
    { name: 'MARCH' },
    { name: 'APRIL' },
    { name: 'MAY' },
    { name: 'JUNE' },
    { name: 'JULY' },
    { name: 'AUGUST' },
    { name: 'SEPTEMBER' },
    { name: 'OCTOBER' },
    { name: 'NOVEMBER' },
    { name: 'DECEMBER' }
  ]

  radioButtontncData: any;
  selectortncData: any;
  stringtncData: any;
  minDate: Date;
  mdmNotepadList: any = [];
  searchNotePad:string = '';
  // contractData: any;

  perList: any = [];
  exAttrMap = new Map();
  exAttrKeyList =  [];

  constructor(private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    public datePipe: DatePipe,
    private authorizationService : AuthorizationService,
    private permissionsService: NgxPermissionsService, 
    private acRoute : ActivatedRoute) { 
      this.contractId = AppSetting.contractId;
    }

  ngOnInit() {
    this.authorizationService.setPermissions('COMMERCIAL');
    this.perList = this.authorizationService.getPermissions('COMMERCIAL') == null ? [] : this.authorizationService.getPermissions('COMMERCIAL');
    this.permissionsService.loadPermissions(this.perList);
    this.exAttrMap = this.authorizationService.getExcludedAttributes('GENERAL TERMS');
    this.exAttrKeyList = Array.from(this.exAttrMap.values());

    this.minDate = new Date();
    this.contractId = AppSetting.contractId;

    this.acRoute.params.subscribe(x => {
      this.editflow = x.editflow;
    });

    // this.spinner.show();
    this. getgeneralDetails();
   
  }

  getgeneralDetails(){
    this.notepadAttributesList = [];
    this.apiService.get(`secure/v1/deliveryCommercial/generalterms/${this.contractId}`).subscribe(res => {
      let ob = ErrorConstants.validateException(res);
      if (ob.isSuccess) {
        //this.spinner.hide();
        this.mdmNotepadList = res.data.referenceData.mdmNotepadList;     
      
        if (res.data.responseData && Object.keys(res.data.responseData).length > 0) {
          this.paymentCommercialData = res.data.responseData;
          if(this.paymentCommercialData.deliveryBranchCommercialList && this.paymentCommercialData.deliveryBranchCommercialList.length > 0 ){
            this.paymentCommercialData.deliveryBranchCommercialList.forEach(element => {
              if(element.amtType == 'EX-GRATIA'){
              // element.amt = 0;
              if(element.deliveryExGratiaSlabList && element.deliveryExGratiaSlabList.length > 0){
                // debugger
                element.deliveryExGratiaSlabList.sort((a,b) => a.wtSlabFrom-b.wtSlabFrom);
              }
              element.deliveryExGratiaSlabList.forEach(slab => {
                if(slab.dlvryBranchCmrclId == null){
                  delete slab.dlvryBranchCmrclId;
                }
              });
            }
            });
          }

        
          this.getBranchDetails();
        } else {
          this.paymentCommercialData = {
            addtnlExpnsFlag: 0,
            addtnlExpnsRemark: '',
            assocCntrctId: this.contractId,
            assocNotepadList: [],
            deliveryBranchCommercialList: [],
            exgratiaFlag: 0,
            exgratiaType: '',
            mgFlag: 0,
            promoFlag: 0
          }
         
          this.getBranchDetails();
        }
        // debugger
        // if()
      
        this.notepadAttributesList = [];
        for (var item of this.mdmNotepadList) {
          if (item.attributeTypeId === 3) {
            item.notepadInputVal = item.attributeValue;
          }
          if (this.paymentCommercialData && this.paymentCommercialData.assocNotepadList && this.paymentCommercialData.assocNotepadList.length > 0) {
            for (var notepadData of this.paymentCommercialData[
              "assocNotepadList"
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
    }, (error) => {
      this.toastr.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });
  }
  /*----------- convert string to array ------- */
  convertStringToArray(value: string) {
    var finalArray = value.split(',');
    return finalArray;
  }

  getBranchDetails() {
    // this.spinner.show();
    this.apiService.get(`secure/v1/deliverycontract/contracts/branches/${this.contractId}`).subscribe(data => {
      let ob = ErrorConstants.validateException(data);
     this.spinner.hide();
      if (ob.isSuccess) {
        this.branchList = data.data.responseData;
        this.setExGratiaAndMgData();
      }
    }, (error) => {
      this.toastr.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    })
  }

  setExGratiaAndMgData() {
    this.exGratiaArray = [];
    this.branchList.forEach(element => {
      let perviusData: any;
      if (this.paymentCommercialData.deliveryBranchCommercialList.length > 0) {
        perviusData = this.paymentCommercialData.deliveryBranchCommercialList.find(x => x.amtType == 'EX-GRATIA' && x.assocBranchId == element.id)
      }
      if (perviusData == undefined) {
        var obj = {
          assocCntrId: this.contractId,
          assocBranchId: element.id,
          effectiveDt: element.effectiveDt,
          expDt: element.expDt,
          descr: '',
          branchName: element.branchName,
          amt: '',
          amtType: 'EX-GRATIA',
          deliveryExGratiaSlabList: [this.setExGratiaSlabObj(element.effectiveDt, element.expDt, null,null)]
        }
        this.exGratiaArray.push(obj);
      } else {
        perviusData['branchName'] = element.branchName;
        this.exGratiaArray.push(perviusData);
      }
    });

    this.mgArray = [];

    this.branchList.forEach(element => {
      let previousMgData: any;
      if (this.paymentCommercialData.deliveryBranchCommercialList.length > 0) {
        previousMgData = this.paymentCommercialData.deliveryBranchCommercialList.find(x => x.amtType == 'MG' && x.assocBranchId == element.id)
      }
      if (previousMgData == undefined) {
        var obj1 = {
          assocCntrId: this.contractId,
          assocBranchId: element.id,
          effectiveDt: element.effectiveDt,
          expDt: element.expDt,
          descr: '',
          branchName: element.branchName,
          amt: '',
          amtType: 'MG',
          amtCycle: '',
          mnth: '',
          deliveryExGratiaSlabList: []
        }
        this.mgArray.push(obj1);
      } else {
        previousMgData['branchName'] = element.branchName;
        this.mgArray.push(previousMgData);
      }
    });
    this.dataSourceExBranch = new MatTableDataSource(this.exGratiaArray);
    this.dataSourceMgBranch = new MatTableDataSource(this.mgArray);
  }

  onChangeGratiaType() {
    // debugger
    if (this.paymentCommercialData.exgratiaType == 'CLAUSE' && this.exGratiaArray !== undefined) {
      this.exGratiaArray.forEach(element => {
        if (element.deliveryExGratiaSlabList.length == 0) {
          element.deliveryExGratiaSlabList = [this.setExGratiaSlabObj(element.effectiveDt, element.expDt,element.id,null)]
          if(element.deliveryExGratiaSlabList && element.deliveryExGratiaSlabList.length > 0){
            element.deliveryExGratiaSlabList.sort((a,b) => a.wtSlabFrom-b.wtSlabFrom)
          }
        }
      });
    }
  }
  dateFormatEffective(field) {
    let effYear = parseInt(this.datePipe.transform(field.effectiveDt, 'yyyy'))
    if (effYear > 9999) {
      field.effectiveDt = "";
    } else {
      field.effectiveDt = this.datePipe.transform(field.effectiveDt, 'yyyy-MM-dd')
      field.expDt = this.datePipe.transform(field.expDt, 'yyyy-MM-dd')

      if (field.effectiveDt < this.minDate || field.effectiveDt > field.expDt) {
        field.isValidEffectiveDt = true;
      }
      else {
        field.isValidEffectiveDt = false;
      }
    }
  }

  dateFormatExpiry(field) {
    let expYear = parseInt(this.datePipe.transform(field.expDt, 'yyyy'))
    if (expYear > 9999) {
      field.expDt = "";
    } else {
      field.effectiveDt = this.datePipe.transform(field.effectiveDt, 'yyyy-MM-dd')
      field.expDt = this.datePipe.transform(field.expDt, 'yyyy-MM-dd')

      if (field.expDt < field.effectiveDt) {
        field.isValidExpDt = true;
      }
      else {
        field.isValidExpDt = false;
      }
    }
  }

  /*--------- On save Payment General terms ----- */
  saveGeneralTerms(flag) {
   
    this.exgratiaAndMGChange();

    // PRADEEP CHANGES FOR NOTEPAD START
    let notepadTrans = []
   if(this.radioButtontncData && this.radioButtontncData.length > 0){
    for (let item of this.radioButtontncData) {
      let data1 = {};
      data1["entityRefId"] = this.contractId;
      data1["notepadId"] = item.id;
      data1["notepadInputVal"] = item.notepadInputVal ; //? item.notepadInputVal.trim(): '';
      if(item['status'] && item['status'] !== 1){
        data1["status"]= item['status'];
      }

      notepadTrans.push(data1);
    }
   }
   if(this.selectortncData && this.selectortncData.length > 0){
    for (let item of this.selectortncData) {
      let data1 = {};
      data1["entityRefId"] = this.contractId;
      data1["notepadId"] = item.id;
      data1["notepadInputVal"] = item.notepadInputVal;
      if(item['status'] && item['status'] !== 1){
        data1["status"]= item['status'];
      }
      notepadTrans.push(data1);
    }
  }
  if(this.stringtncData && this.stringtncData.length > 0){
    for (let item of this.stringtncData) {
      let data1 = {};
      data1["entityRefId"] = this.contractId;
      data1["notepadId"] = item.id;
      data1["notepadInputVal"] = item.notepadInputVal;
      if(item['status'] && item['status'] !== 1){
        data1["status"]= item['status'];
      }
      notepadTrans.push(data1);
    }
  }

    if (this.paymentCommercialData && this.paymentCommercialData.assocNotepadList && this.paymentCommercialData.assocNotepadList.length) {
      for (let i = 0; i < this.paymentCommercialData.assocNotepadList.length; i++) {
        for (let j = 0; j < notepadTrans.length; j++) {
          if (this.paymentCommercialData.assocNotepadList[i].notepadId == notepadTrans[j].notepadId) {
            notepadTrans[j]["id"] = this.paymentCommercialData.assocNotepadList[i].id;
          }
        }
      }
    }
    this.paymentCommercialData["assocNotepadList"] = notepadTrans;
    this.paymentCommercialData["assocNotepadList"].forEach(obj => {
      obj.effectiveDt = this.contractData.effectiveDt;
      obj.expDt = this.contractData.expDt;
    });
    // PRADEEP CHANGES FOR NOTEPAD END

    // if(this.paymentCommercialData.exgratiaFlag){
      if (this.paymentCommercialData.exgratiaType == 'FIXED' && this.paymentCommercialData.deliveryBranchCommercialList.length > 0) {
        this.paymentCommercialData.deliveryBranchCommercialList.forEach(element => {
          element.deliveryExGratiaSlabList = [];
        });
      } 
     
      if(this.paymentCommercialData.exgratiaType == 'CLAUSE' && this.paymentCommercialData.deliveryBranchCommercialList.length > 0){
        this.paymentCommercialData.deliveryBranchCommercialList.forEach(element => {
          if(element.amtType == 'EX-GRATIA'){
          element.amt = 0;
          if(element.deliveryExGratiaSlabList && element.deliveryExGratiaSlabList.length > 0){
            // debugger
            element.deliveryExGratiaSlabList.sort((a,b) => a.wtSlabFrom-b.wtSlabFrom);
          }
          element.deliveryExGratiaSlabList.forEach(slab => {
            if(slab.dlvryBranchCmrclId == null){
              delete slab.dlvryBranchCmrclId;
            }
          });
        }
        });
      }
    // }else{
    //   this.paymentCommercialData.deliveryBranchCommercialList = [];
    // }

   
   this.spinner.show()
    this.apiService.post('secure/v1/deliveryCommercial/generalterms', this.paymentCommercialData).subscribe(data => {
      this.spinner.hide();
      if (flag == 0) {
        if (this.editflow) {
          this.router.navigate(['/asso_delivery-contract/booking-sla', { steper: true, editflow: this.editflow }], {skipLocationChange: true})
        } else {
          this.router.navigate(['/asso_delivery-contract/booking-sla'], {skipLocationChange: true});
        }
      }else{
        this.spinner.show();
        this.getgeneralDetails();
      } 
      this.toastr.success('Saved Successfully');

    }, (error) => {
      this.toastr.error(error.error.errors.error[0].description);
      this.spinner.hide();
    });
  }
  exgratiaAndMGChange() {
    if (this.paymentCommercialData.mgFlag && this.paymentCommercialData.exgratiaFlag) {
      this.paymentCommercialData.deliveryBranchCommercialList = this.exGratiaArray.concat(this.mgArray);
    } else if (this.paymentCommercialData.mgFlag && !this.paymentCommercialData.exgratiaFlag) {
      this.paymentCommercialData.deliveryBranchCommercialList = this.mgArray;
    } else if (!this.paymentCommercialData.mgFlag && this.paymentCommercialData.exgratiaFlag) {
      this.paymentCommercialData.deliveryBranchCommercialList = this.exGratiaArray;
    } else {
      this.paymentCommercialData.deliveryBranchCommercialList = [];
    }

  }
  setExGratiaSlabObj(effDt, expDt,commID,  obj) {
    // console.log('>>>>', effDt, expDt,commID,  obj)
    let length:any;
    if(obj && obj.length > 0){
      length = obj.length;
    }
    let slabObj = {
      assocCntrId: this.contractId,
      wtSlabFrom: 0,
      wtSlabTo: '',
      price: '',
      descr: '',
      effectiveDt: effDt,
      expDt: expDt,
      dlvryBranchCmrclId : commID
    }
    if(length){
      slabObj.wtSlabFrom = Number(obj[length-1].wtSlabTo) + 1; 
      return slabObj;
    }
    return slabObj;
  }

  /*---------- Add new Ex-Gratia Slab ------ */
  addNewGratiaSlab(index) {
    this.exGratiaArray[index].deliveryExGratiaSlabList.push(this.setExGratiaSlabObj(this.exGratiaArray[index].effectiveDt, this.exGratiaArray[index].expDt,this.exGratiaArray[index].id, this.exGratiaArray[index].deliveryExGratiaSlabList));
  }

  /*----------- delete slab record ---------- */
  deleteSlabRecord(i, j) {
    this.exGratiaArray[i].deliveryExGratiaSlabList.splice(j, 1);
  }

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

  /*------ set edit status in edit flow ------------- */
  changeInEditFlow(obj) {
    if(this.editflow) {
      obj.status = AppSetting.editStatus;
    }
  }
  changeValue(index, column, value, obj ) {
    if(column=='wtSlabTo'){
      if(obj[index+1]){
        obj[index+1]['wtSlabFrom'] = Number(value)+1;
    }else{
      obj[index][column] = value;
    }
    }    
  }

  // slaFrmValidFlag: boolean = false;
  maxFlag: boolean = false;

  validCust(f, ObjNew){
    let slaFrmValidFlag: boolean = false;
    slaFrmValidFlag = false;
    if(f){
      slaFrmValidFlag = f.invalid;
    }
    // if(!f.invalid){
      let length = ObjNew.length;
      ObjNew.forEach((obj, index) => {
        if(Number(obj.wtSlabFrom) > Number(obj.wtSlabTo)){          
          slaFrmValidFlag = true;
          obj['flag'] = true;
          return slaFrmValidFlag;
        }else{
          if(((Number(obj.wtSlabTo)) + 1) >= 99999999){
            ObjNew.splice(-1, (length - (index +1)))
            slaFrmValidFlag = false;
            this.maxFlag = true;
            obj['flag'] = false;
            return this.maxFlag;
          }
          obj['flag'] = false;
        } 
        // console.log('obj',  obj);
      })
    // }
    
    return slaFrmValidFlag;
  }

}

