import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AppSetting } from 'src/app/app.setting';
import { ApiService } from '../../core/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorConstants } from '../../core/models/constants';
import { confimationdialog } from '../confirmationdialog/confimationdialog';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { EmailPreviewComponent } from '../email-preview/email-preview.component';

@Component({
  selector: 'app-compare-version',
  templateUrl: './compare-version.component.html',
  styleUrls: ['./compare-version.component.css'],
  providers : [DatePipe]
})
export class CompareVersionComponent implements OnInit {
 // previewList: any;
  versions : any[] = [];
  islatest : boolean;
  obj1 : any;
  isv1 : boolean;
  obj2 : any;
  isv2 : boolean;
  enableDialog : boolean;
  versionDifference : any;
  versionCompare : any;
  insuranceList: any = [];
  emiList: any = [];
  uniqueOfferingsForCustomer: any = [];
  graciaList: any = [];
  mgList: any = [];
  previewRefList : any;
  myDate = new Date();
  currDate: string;

  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'previewContent', // the id of html/table element
  }

  constructor(public dialogRef: MatDialogRef<CompareVersionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private tosterservice: ToastrService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private exportAsService: ExportAsService,
    private confirmDialog : MatDialog) { }

  customerName : String= AppSetting.customerName;
  ngOnInit() {

    this.spinner.show();
    if (this.data) {
      this.compareVersions(this.data);
    }
    this.currDate = this.datePipe.transform(this.myDate, 'MM-dd-yyyy');
  }
  
  sendEmail(){
    let userDt = JSON.parse(sessionStorage.getItem("all")).data.responseData.user;
    const addrDialog = this.dialog.open(EmailPreviewComponent, {
      panelClass: 'mat-dialog-responsive',
      disableClose: true,
      data : {email : userDt.email}
    });

    addrDialog.afterClosed().subscribe(result => {           
      if (result && result!="") {
      this.spinner.show();
      let ob = {
        "userId": userDt.userId, "toEmail": result,
        "subject": "Preview PDF For: " +this.customerName, "contractCode": this.data.sfxCode?this.data.sfxCode:'NOT GENERATED YET'
      }
      this.exportAsService.get(this.exportAsConfig).subscribe(content => {
        let file1 = this.b64toBlob(content)
        this.sendData(ob,file1)
      }); 
      }
    });    
  }

  b64toBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'application/pdf' });
  }

  sendData(ob, file) {
    this.apiService.sendEmail(file, JSON.stringify(ob))
      .subscribe(data => {
        this.spinner.hide();
        this.tosterservice.success("Email Sent Successfully !");
      }, error => {
        this.spinner.hide();
        this.tosterservice.error('Issue In Sending Email !');
      });
  }

  compareVersions(data: any) {
    this.versions = this.data.versions;
    for (let i = 0; i < this.versions.length; i++) {
      if (this.versions[i].index === 0) {
        this.islatest = true;
      }
    }
    if (this.islatest) {
      let version2;
      for (let i = 0; i < this.versions.length; i++) {
        if (this.versions[i].index !== 0) {
          version2 = this.versions[i].cntrVer;
        }
      }
      this.apiService.get('secure/v1/bookingcontractpreview/' + this.data.data.contractId)
        .subscribe(result => {
          this.obj1 = result.data.responseData;
          this.previewRefList = result.data.referenceData;
          this.obj1 = this.renderPreviewData(this.obj1);
          console.log('obj1',this.obj1);
          this.isv1 = true;

          this.apiService.get('secure/v1/bookingcontractpreview/historypreview/' + this.data.data.contractId +'/' + version2)
            .subscribe(result1 => {
              this.obj2 = result1.data.responseData;
              this.obj2 = this.renderPreviewData(this.obj2);
              console.log('obj2',this.obj2)
              this.versionDifference = this.compareVersionDifference(this.obj2, this.obj1);
              console.log('versionDifference',this.versionDifference)
            
              this.isv2 = true;
              this.spinner.hide();
            },
              error => {
                this.spinner.hide();
                this.tosterservice.error(ErrorConstants.getValue(404));
              });
        },
          error => {
            this.tosterservice.error(ErrorConstants.getValue(404));
            this.dialogRef.close();
            this.spinner.hide();
          });

    }

    else {
      var version1 = (this.versions[0].cntrVer > this.versions[1].cntrVer) ? this.versions[0].cntrVer : this.versions[1].cntrVer;
      var version2 = (this.versions[0].cntrVer < this.versions[1].cntrVer) ? this.versions[0].cntrVer : this.versions[1].cntrVer;

      this.apiService.get('secure/v1/bookingcontractpreview/historypreview/' + this.data.data.contractId +'/' + version1)
        .subscribe(result => {
          this.obj1 = result.data.responseData;
          this.previewRefList = result.data.referenceData;
          this.obj1 = this.renderPreviewData(this.obj1);
          console.log('obj1',this.obj1)
          
          /**
           * Get the Distinct Safex category(Booking, Delivery) from child list for each commercial 
           * and set the same at commercial level
           */
         
          this.enableDialog = true;
          this.apiService.get('secure/v1/bookingcontractpreview/historypreview/' + this.data.data.contractId +'/' + version2)
            .subscribe(result1 => {
              this.obj2 = result1.data.responseData;
              this.obj2 = this.renderPreviewData(this.obj2);
              console.log('obj2',this.obj2)
              /**
               * Get the Distinct Safex category(Booking, Delivery) from child list for each commercial 
               * and set the same at commercial level
               */
            
              this.versionDifference = this.compareVersionDifference(this.obj2, this.obj1);
              // console.log('versionDifference',this.versionDifference)
             
              this.isv2 = true;
              this.spinner.hide();
            },
              error => {
                this.spinner.hide();
                this.tosterservice.error(ErrorConstants.getValue(404));
              });
        },
          error => {
            this.tosterservice.error(ErrorConstants.getValue(404));
            this.dialogRef.close();
            this.spinner.hide();
          });
    }
  }

  compareVersionDifference(obj1, obj2) {
    const result = {};
    if (Object.is(obj1, obj2)) {
      return undefined;
    }
    if (!obj2 || typeof obj2 !== 'object') {
      return obj2;
    }
    Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach(key => {
      if (obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
        result[key] = obj2[key];
      }
      if (typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
        const value = this.compareVersionDifference(obj1[key], obj2[key]);
        if (value !== undefined) {
          result[key] = value;
        }
      }
    });
    return result;
  }

  /*------------ on close dialog ---------------- */
  closeDialog() {
    const dialogRefConfirm = this.confirmDialog.open(confimationdialog, {
      width: '300px',
      data: { message: 'Are you sure ?' },
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if (value) {
        this.dialogRef.close();
      } else {
        console.log('Keep Open');
      }
    });
  }

  renderPreviewData(obj:any) {
    if (obj.paymentTermsPrev.lkpAssocBkngPayoutCtgyName === 'BOOKING') {
      let bookingOfferings : any = [];
      obj.paymentTermsPrev.serviceOffrnPrev.forEach((item) => {
        var i = bookingOfferings.findIndex(x => x.serviceOfferingId == item.serviceOfferingId);
        if (i <= -1) {
          bookingOfferings.push(item);
        }
      });
      for (let i = 0; i < bookingOfferings.length; i++) {
        bookingOfferings[i]['serviceLookup'] = this.getServiceLookup(bookingOfferings[i].serviceOfferingId);
        bookingOfferings[i]['creditAmt'] = this.returnAmout('CREDIT', bookingOfferings[i].serviceOfferingId, obj.paymentTermsPrev.serviceOffrnPrev);
        bookingOfferings[i]['paidAmt'] = this.returnAmout('PAID', bookingOfferings[i].serviceOfferingId, obj.paymentTermsPrev.serviceOffrnPrev);
        bookingOfferings[i]['toPayAmt'] = this.returnAmout('TOPAY', bookingOfferings[i].serviceOfferingId, obj.paymentTermsPrev.serviceOffrnPrev)
      }
      obj.paymentTermsPrev['bookingOfferings'] = bookingOfferings;

    }
    
    if (obj.bookingCommercialCustomerPrev && obj.bookingCommercialCustomerPrev !== null) {
      for (let j = 0; j < obj.bookingCommercialCustomerPrev.length; j++) {
        if (obj.bookingCommercialCustomerPrev[j].lkpAssocBkngPayoutCtgyName === 'BOOKING' && obj.bookingCommercialCustomerPrev[j].serviceOffrnPrev !== null) {
          // this.uniqueOfferingsForCustomer[j] = [];
          // obj.bookingCommercialCustomerPrev[j].serviceOffrnPrev.forEach((item) => {
          //   var i = this.uniqueOfferingsForCustomer[j].findIndex(x => x.serviceOfferingId == item.serviceOfferingId);
          //   if (i <= -1) {
          //     this.uniqueOfferingsForCustomer[j].push(item);
          //   }
          // });

          // this.uniqueOfferingsForCustomer[j].forEach(element => {
          //   element['serviceLookup'] = this.getServiceLookup(element.serviceOfferingId);
          //   element['creditAmt'] = this.returnAmout('CREDIT', element.serviceOfferingId, obj.bookingCommercialCustomerPrev[j].serviceOffrnPrev);
          //   element['paidAmt'] = this.returnAmout('PAID', element.serviceOfferingId, obj.bookingCommercialCustomerPrev[j].serviceOffrnPrev);
          //   element['toPayAmt'] = this.returnAmout('TOPAY', element.serviceOfferingId, obj.bookingCommercialCustomerPrev[j].serviceOffrnPrev)
          // });
          

          let uniqueOfferingsForCustomer = [];
            obj.bookingCommercialCustomerPrev[j].serviceOffrnPrev.forEach((item) => {
            var i = uniqueOfferingsForCustomer.findIndex(x => x.serviceOfferingId == item.serviceOfferingId);
            if (i <= -1) {
              uniqueOfferingsForCustomer.push(item);
            }
          });

          uniqueOfferingsForCustomer.forEach(element => {
            element['serviceLookup'] = this.getServiceLookup(element.serviceOfferingId);
            element['creditAmt'] = this.returnAmout('CREDIT', element.serviceOfferingId, obj.bookingCommercialCustomerPrev[j].serviceOffrnPrev);
            element['paidAmt'] = this.returnAmout('PAID', element.serviceOfferingId, obj.bookingCommercialCustomerPrev[j].serviceOffrnPrev);
            element['toPayAmt'] = this.returnAmout('TOPAY', element.serviceOfferingId, obj.bookingCommercialCustomerPrev[j].serviceOffrnPrev)
          });

          obj.bookingCommercialCustomerPrev[j]['uniqueOfferingsForCustomer'] = uniqueOfferingsForCustomer;
        }
      }
    }
    
    obj['bookingDeductionPrev']['insuranceList'] = [];
    obj['bookingDeductionPrev']['emiList'] = [];

    obj['bookingDeductionPrev']['vehicleDeductionList'].forEach(elem => {
      if (elem.type == 'STRING' || elem.type == 'INSURANCE') {
        obj['bookingDeductionPrev']['insuranceList'].push(elem);
      } else if (elem.type == 'EMI') {
        obj['bookingDeductionPrev']['emiList'].push(elem);
      }
    });

    obj['paymentTermsPrev']['graciaList'] = [];
    obj['paymentTermsPrev']['mgList'] = [];
    obj['paymentTermsPrev']['bookingBranchCommerciaList'].forEach(elem => {
      if (elem.type == 'Gratia' || elem.type == 'EX-GRATIA') {
        obj['paymentTermsPrev']['graciaList'].push(elem);
      } else if (elem.type == 'MG') {
        obj['paymentTermsPrev']['mgList'].push(elem);
      }
    });
   
    return obj;
  }

  /*----------- return  Credit , Paid and TOPAY amount ----------- */
  returnAmout(value, serviceOfferingId, array) {
    let obj = array.find(x => this.previewRefList.paymentModeList.find(y => (y.id === x.branchModType &&
      y.lookupVal === value && x.serviceOfferingId === serviceOfferingId)));
    
    if (obj !== undefined) {
      return obj.price;
    } else {
      return '';
    }
  }

  getServiceLookup(id) {
    let offering = this.previewRefList['serviceOfferingList'].find(x => x.id === id);
    if (offering !== undefined) {
      return offering.serviceOffering;
    } else {
      return ''
    }

  }

  /*---------- Compare branch Allocation ---------- */
  ifBranchAllocationObjChanges(item, property) {
    let branchObj;
    let branchObj2: any = [];
    branchObj = item; //this.obj1.branchAllocationPrev[index];
    
    if(this.obj2 !== undefined){
    branchObj2 = _.find(this.obj2.branchAllocationPrev, { 'branchName': branchObj.branchName });

    if (branchObj2) {
      if (branchObj2[property] != branchObj[property]) {
        return true
      } else {
        return false;
      }
    } else {
      return true;
    }
   }
  } 

  /*-----------  compare payment -------- */
  ifPaymentChange(obj,property){
    let paymentObj = obj
    if(this.obj2 !== undefined){
      if(this.obj2.paymentTermsPrev[property] != paymentObj[property]) {
        if (this.obj2.paymentTermsPrev[property] < paymentObj[property]) {
          return {flage : true, compare: 'arrow_upward'}
        } else if (this.obj2.paymentTermsPrev[property] > paymentObj[property]) {
          return {flage : true, compare: 'arrow_downward'}
        } else {
          return {flage : true, compare: 'change'} 
        } 
      } else {
        return {flage : false, compare: 'equall'}
      }
    } else {
      return {flage : true, compare: 'abcd'}
    }
  }

  ifPaymentServiceOfferingChange(item,property,value){
    let offeringObj;
    let offeringObj2: any;
    offeringObj = item; //this.obj1.branchAllocationPrev[index];
    
    if(this.obj2 !== undefined){
      if(value === 'BOOKING'){
        offeringObj2 = _.find(this.obj2.paymentTermsPrev.bookingOfferings, { 'serviceLookup': offeringObj.serviceLookup });
      } else if(value === 'PERTRIP'){
        offeringObj2 = _.find(this.obj2.paymentTermsPrev.serviceOffrnPrev, { 'lkpCargoCapacityId': offeringObj.lkpCargoCapacityId });
      } else if(value === 'OFFERING') {
        offeringObj2 = _.find(this.obj2.paymentTermsPrev.serviceOffrnPrev, { 'serviceOfferingId': offeringObj.serviceOfferingId });
      } else if(value === 'GRATIA'){
        offeringObj2 = _.find(this.obj2.paymentTermsPrev.graciaList, { 'branchName': offeringObj.branchName });
      } else if(value === 'MG'){
        offeringObj2 = _.find(this.obj2.paymentTermsPrev.mgList, { 'branchName': offeringObj.branchName });
      }
    if (offeringObj2) {
      if (offeringObj2[property] != offeringObj[property]) {
        if (offeringObj2[property] < offeringObj[property]) {
          return {flage : true, compare: 'arrow_upward'}
        } else if (offeringObj2[property] > offeringObj[property]) {
          return {flage : true, compare: 'arrow_downward'}
        } else {
          return {flage : true, compare: 'change'} 
        } 
      } else {
        return {flage : false, compare: 'equall'}
      }
    } else {
      return {flage : true, compare: 'abcd'}
    }
   } else {
    return {flage : true, compare: 'abcd'}
   }
  }

  /*----------- compare payment customer change ---- */
  ifCustomerPaymentChange(obj,property){
    let custPaymentObj = obj;
    let custPaymentObj2 : any;
    if(this.obj2 !== undefined && this.obj2.bookingCommercialCustomerPrev !== undefined && Object.keys(obj).length !== 0 && obj.constructor !== Object){
      custPaymentObj2 = _.find(this.obj2.bookingCommercialCustomerPrev, { 'customerName': custPaymentObj.customerName });

      if (custPaymentObj2) {
        if (custPaymentObj2[property] != custPaymentObj[property]) {
          if (custPaymentObj2[property] < custPaymentObj[property]) {
            return {flage : true, compare: 'arrow_upward'}
          } else if (custPaymentObj2[property] > custPaymentObj[property]) {
            return {flage : true, compare: 'arrow_downward'}
          } else {
            return {flage : true, compare: 'change'} 
          } 
        } else {
          return {flage : false, compare: 'equall'}
        }
      } else {
        return {flage : true, compare: 'abcd'}
      }
    }
  }

  /*-------------- Compare deduction data ----------- */
  ifDeductionChange(obj,property) {
    let deducionObj = obj;
    if(this.obj2 !== undefined){
      if(this.obj2.bookingDeductionPrev[property] != deducionObj[property]) {
        if (this.obj2.bookingDeductionPrev[property] < deducionObj[property]) {
          return {flage : true, compare: 'arrow_upward'}
        } else if (this.obj2.bookingDeductionPrev[property] > deducionObj[property]) {
          return {flage : true, compare: 'arrow_downward'}
        } else {
          return {flage : true, compare: 'change'}
        } 
      } else {
        return {flage : false, compare: 'equall'}
      }
    } else {
      return {flage : true, compare: 'abcd'}
    }
  }

  /*------- Compare EMI and Insurance Deduction ---------- */
  ifEmiOrInsuranceDednChange(obj,property,value) {
    let vehicleDeductionObj = obj;
    let vehicleDeductionObj2 : any;
    if(this.obj2 !== undefined && this.obj2.bookingDeductionPrev !== undefined){
      if(value == 'EMI'){
        vehicleDeductionObj2 = _.find(this.obj2.bookingDeductionPrev.emiList, { 'branchName': vehicleDeductionObj.branchName });
      } else {
        vehicleDeductionObj2 = _.find(this.obj2.bookingDeductionPrev.insuranceList, { 'branchName': vehicleDeductionObj.branchName });
      }

      if (vehicleDeductionObj2) {
        if (vehicleDeductionObj2[property] != vehicleDeductionObj[property]) {
          if (vehicleDeductionObj2[property] < vehicleDeductionObj[property]) {
            return {flage : true, compare: 'arrow_upward'}
          } else if (vehicleDeductionObj2[property] > vehicleDeductionObj[property]) {
            return {flage : true, compare: 'arrow_downward'}
          } else {
            return {flage : true, compare: 'change'} 
          } 
        } else {
          return {flage : false, compare: 'equall'}
        }
      } else {
        return {flage : true, compare: 'abcd'}
      }
    }
  }

}
