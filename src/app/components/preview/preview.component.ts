import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AppSetting } from '../../app.setting';
import { ErrorConstants } from '../../core/models/constants';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { SuccessComponent } from '../success/success.component';
import * as _ from "lodash";
import { confimationdialog } from 'src/app/dialog/confirmationdialog/confimationdialog';
import { DatePipe } from '@angular/common';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { EmailPreviewComponent } from 'src/app/dialog/email-preview/email-preview.component';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  providers : [DatePipe]
})

export class PreviewComponent implements OnInit {
  previewList;
  previewRefList;
  graciaList: any = [];
  mgList: any = [];
  insuranceList: any = [];
  emiList: any = [];
  uniqueOfferings: any[] = [];
  uniqueOfferingsForCustomer: any = [];
  editflow : boolean;
  perList:any = [];
  myDate = new Date();
  currDate: string;
  data:any={};
  constructor(
    private spinner: NgxSpinnerService,
    private apiService: ApiService,
    public dialog: MatDialog,
    private tosterservice: ToastrService,
    private router: Router,
    private datePipe: DatePipe,
    private exportAsService: ExportAsService,
    private authorizationService : AuthorizationService,
    private permissionsService: NgxPermissionsService,
    private activeRoute : ActivatedRoute) { }
  
  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'previewContent', // the id of html/table element
  }

  customerName : string= AppSetting.customerName;
  ngOnInit() {
    this.authorizationService.setPermissions('CONTRACT');
    this.perList = this.authorizationService.getPermissions('CONTRACT') == null ? [] : this.authorizationService.getPermissions('CONTRACT');
    this.permissionsService.loadPermissions(this.perList);
    console.log('perlist',this.perList)
    this.spinner.show();
    this.activeRoute.params.subscribe(params => {
      if (params['editflow']) {
        this.editflow = params['editflow'];
      }
      this.currDate = this.datePipe.transform(this.myDate, 'MM-dd-yyyy');
      
    });

    this.apiService.get(`secure/v1/bookingcontractpreview/${AppSetting.contractId}`).subscribe((suc) => {
      if (suc.data && suc.data.responseData) {
        this.previewList = suc.data.responseData;
        this.previewRefList = suc.data.referenceData;
        this.renderPreviewData();
       // this.spinner.hide();
      } else {
        console.log("Data not Found");
       // this.spinner.hide();
      }
    }, (err) => {
      this.tosterservice.error(ErrorConstants.getValue(404));
     // this.spinner.hide();
    });
  }
  
  closePreview($event){
    $event.preventDefault();
    if (this.editflow) {
      this.router.navigate(['/asso_booking-contract/booking-document', { steper: true, 'editflow': 'true' }], { skipLocationChange: true });
    } else {
      this.router.navigate(['/asso_booking-contract/booking-document'], { skipLocationChange: true });
    }
  }

  sendContractId(e) {
    this.spinner.show();
    this.apiService.put(`secure/v1/bookingcontract/submit/${AppSetting.contractId}`).subscribe((suc) => {
      console.log(suc.data.responseData);
      let ob = ErrorConstants.validateException(suc);
      if (ob.isSuccess) {
        this.spinner.hide();
        AppSetting.sfxCode = suc.data.responseData;
       // this.router.navigate(['/asso_booking-contract/success'])
       const dialogRef = this.dialog.open(SuccessComponent, {
        disableClose: false,
        data: {id:false},
        panelClass: 'mat-dialog-responsive',
        width: '64rem'
      });

      } else {
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      this.tosterservice.error('Issue in generating Associate Contract Code.');
    });
   
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

   sendData(ob, file){
    this.apiService.sendEmail(file, JSON.stringify(ob))
    .subscribe(data => {
      this.spinner.hide();
      this.tosterservice.success("Email Sent Successfully !");
    }, error => {
      this.spinner.hide();
      this.tosterservice.error('Issue In Sending Email !');
    });

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
  renderPreviewData() {
    if (this.previewList.paymentTermsPrev.lkpAssocBkngPayoutCtgyName === 'BOOKING') {
      this.uniqueOfferings = [];
      this.previewList.paymentTermsPrev.serviceOffrnPrev.forEach((item) => {
        var i = this.uniqueOfferings.findIndex(x => x.serviceOfferingId == item.serviceOfferingId);
        if (i <= -1) {
          this.uniqueOfferings.push(item);
        }
      });

      for (let i = 0; i < this.uniqueOfferings.length; i++) {
        this.uniqueOfferings[i]['serviceLookup'] = this.getServiceLookup(this.uniqueOfferings[i].serviceOfferingId);
        this.uniqueOfferings[i]['creditAmt'] = this.returnAmout('CREDIT', this.uniqueOfferings[i].serviceOfferingId, this.previewList.paymentTermsPrev.serviceOffrnPrev);
        this.uniqueOfferings[i]['paidAmt'] = this.returnAmout('PAID', this.uniqueOfferings[i].serviceOfferingId, this.previewList.paymentTermsPrev.serviceOffrnPrev);
        this.uniqueOfferings[i]['toPayAmt'] = this.returnAmout('TOPAY', this.uniqueOfferings[i].serviceOfferingId, this.previewList.paymentTermsPrev.serviceOffrnPrev)
      }

    }

    if (this.previewList.bookingCommercialCustomerPrev && this.previewList.bookingCommercialCustomerPrev !== null) {
      for (let j = 0; j < this.previewList.bookingCommercialCustomerPrev.length; j++) {
        if (this.previewList.bookingCommercialCustomerPrev[j].lkpAssocBkngPayoutCtgyName === 'BOOKING' && this.previewList.bookingCommercialCustomerPrev[j].serviceOffrnPrev !== null) {
          this.uniqueOfferingsForCustomer[j] = [];
          this.previewList.bookingCommercialCustomerPrev[j].serviceOffrnPrev.forEach((item) => {
            var i = this.uniqueOfferingsForCustomer[j].findIndex(x => x.serviceOfferingId == item.serviceOfferingId);
            if (i <= -1) {
              this.uniqueOfferingsForCustomer[j].push(item);
            }
          });

          this.uniqueOfferingsForCustomer[j].forEach(element => {
            element['serviceLookup'] = this.getServiceLookup(element.serviceOfferingId);
            element['creditAmt'] = this.returnAmout('CREDIT', element.serviceOfferingId, this.previewList.bookingCommercialCustomerPrev[j].serviceOffrnPrev);
            element['paidAmt'] = this.returnAmout('PAID', element.serviceOfferingId, this.previewList.bookingCommercialCustomerPrev[j].serviceOffrnPrev);
            element['toPayAmt'] = this.returnAmout('TOPAY', element.serviceOfferingId, this.previewList.bookingCommercialCustomerPrev[j].serviceOffrnPrev)
          });
        }
      }
    }

    this.previewList['bookingDeductionPrev']['vehicleDeductionList'].forEach(elem => {
      if (elem.type == 'STRING' || elem.type == 'INSURANCE') {
        this.insuranceList.push(elem);
      } else if (elem.type == 'EMI') {
        this.emiList.push(elem);
      }
    });

    this.previewList['paymentTermsPrev']['bookingBranchCommerciaList'].forEach(elem => {
      if (elem.type == 'Gratia' || elem.type == 'EX-GRATIA') {
        this.graciaList.push(elem);
      } else if (elem.type == 'MG') {
        this.mgList.push(elem);
      }
    });
    this.spinner.hide();
    console.log('preview', this.previewList)
  }

  /*--------- Open Edit preview Dialog ------- */
  openEditPreview() {
    const dialogRefVersion = this.dialog.open(EditPreviewComponent, {
      width: '80vw',
      panelClass: 'mat-dialog-responsive',
      data: {editflow : this.editflow}
    });

    dialogRefVersion.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}



@Component({
  selector: 'app-edit-preview',
  templateUrl: './edit-preview.component.html',
  styleUrls: ['./preview.component.css'],
  providers : [DatePipe]
})
export class EditPreviewComponent implements OnInit {

  editflow : boolean;
  previewList : any;
  data: any;
  previewRefList : any;
  graciaList: any = [];
  mgList: any = [];
  insuranceList: any = [];
  emiList: any = [];
  uniqueOfferings: any[] = [];
  uniqueOfferingsForCustomer: any = [];
  isDeductionExist : boolean;
  isPaymentExist : boolean;
  perList: any = [];
  myDate = new Date();
  currDate: string;
  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'previewContent', // the id of html/table element
  }

  customerName : string= AppSetting.customerName;
  constructor( public dialogRef: MatDialogRef<EditPreviewComponent>,
    private spinner: NgxSpinnerService,
    private apiService: ApiService,
    public dialog: MatDialog,
    private tosterservice: ToastrService,
    private router: Router,
    private activeRoute : ActivatedRoute,
    private confirmDialog : MatDialog,
    private authorizationService : AuthorizationService,
    private datePipe: DatePipe,
    private permissionsService: NgxPermissionsService,
    private exportAsService: ExportAsService) { }

  ngOnInit() {
    this.authorizationService.setPermissions('CONTRACT');
    this.perList = this.authorizationService.getPermissions('CONTRACT') == null ? [] : this.authorizationService.getPermissions('CONTRACT');
    this.permissionsService.loadPermissions(this.perList);
    console.log('perlist',this.perList)
    this.activeRoute.params.subscribe(params => {
      if (params['editflow']) {
        this.editflow = params['editflow'];
      }
      this.currDate = this.datePipe.transform(this.myDate, 'MM-dd-yyyy');
    });

   this.spinner.show();
   this.apiService.get(`secure/v1/bookingcontractpreview/editpreview/${AppSetting.contractId}`).subscribe((suc) => {
     if (suc.data && suc.data.responseData) {
       console.log('res',suc)
       this.previewList = suc.data.responseData;
       this.previewRefList = suc.data.referenceData;
       this.renderEditPreviewData();
       this.spinner.hide();
     } else {
       console.log("Data not Found");
       this.spinner.hide();
     }
   }, (err) => {
     this.tosterservice.error(ErrorConstants.getValue(404));
     this.spinner.hide();
   });
 }

//  closePreview() {
//   this.router.navigate(['/asso_booking-contract/booking-document'], {skipLocationChange: true}); 
//   }
  
  closePreview($event){
    $event.preventDefault();
    if (this.editflow) {
      this.router.navigate(['/asso_booking-contract/booking-document', { steper: true, 'editflow': 'true' }], { skipLocationChange: true });
    } else {
      this.router.navigate(['/asso_booking-contract/booking-document'], { skipLocationChange: true });
    }
  }

  renderEditPreviewData() {

    let paymentProperties = Object.getOwnPropertyNames(this.previewList.paymentTermsPrev);

    paymentProperties.forEach(element => {
      if(!(this.previewList.bookingDeductionPrev.hasOwnProperty('bookingBranchCommerciaList') ||
      this.previewList.bookingDeductionPrev.hasOwnProperty('mdmNotePadlist') || 
      this.previewList.bookingDeductionPrev.hasOwnProperty('serviceOffrnPrev'))){
        this.isPaymentExist = true;
        return;
      } 
    })
    console.log('this.isPaymentExist',this.isPaymentExist)
    let dednProperties = Object.getOwnPropertyNames(this.previewList.bookingDeductionPrev);
    dednProperties.forEach(element => {
      if(!this.previewList.bookingDeductionPrev.hasOwnProperty('vehicleDeductionList')){
        this.isDeductionExist = true;
        return;
      } 
    })
    console.log('this.isDeductionExist',this.isDeductionExist)


    if (this.previewList.paymentTermsPrev.lkpAssocBkngPayoutCtgyName === 'BOOKING') {
      this.uniqueOfferings = [];
      this.previewList.paymentTermsPrev.serviceOffrnPrev.forEach((item) => {
        var i = this.uniqueOfferings.findIndex(x => x.serviceOfferingId == item.serviceOfferingId);
        if (i <= -1) {
          this.uniqueOfferings.push(item);
        }
      });

      for (let i = 0; i < this.uniqueOfferings.length; i++) {
        this.uniqueOfferings[i]['serviceLookup'] = this.getServiceLookup(this.uniqueOfferings[i].serviceOfferingId);
        this.uniqueOfferings[i]['creditAmt'] = this.returnAmout('CREDIT', this.uniqueOfferings[i].serviceOfferingId, this.previewList.paymentTermsPrev.serviceOffrnPrev);
        this.uniqueOfferings[i]['paidAmt'] = this.returnAmout('PAID', this.uniqueOfferings[i].serviceOfferingId, this.previewList.paymentTermsPrev.serviceOffrnPrev);
        this.uniqueOfferings[i]['toPayAmt'] = this.returnAmout('TOPAY', this.uniqueOfferings[i].serviceOfferingId, this.previewList.paymentTermsPrev.serviceOffrnPrev)
      }

    }

    if (this.previewList.bookingCommercialCustomerPrev && this.previewList.bookingCommercialCustomerPrev !== null) {
      for (let j = 0; j < this.previewList.bookingCommercialCustomerPrev.length; j++) {
        if (this.previewList.bookingCommercialCustomerPrev[j].lkpAssocBkngPayoutCtgyName === 'BOOKING' && this.previewList.bookingCommercialCustomerPrev[j].serviceOffrnPrev !== null) {
          this.uniqueOfferingsForCustomer[j] = [];
          this.previewList.bookingCommercialCustomerPrev[j].serviceOffrnPrev.forEach((item) => {
            var i = this.uniqueOfferingsForCustomer[j].findIndex(x => x.serviceOfferingId == item.serviceOfferingId);
            if (i <= -1) {
              this.uniqueOfferingsForCustomer[j].push(item);
            }
          });

          this.uniqueOfferingsForCustomer[j].forEach(element => {
            element['serviceLookup'] = this.getServiceLookup(element.serviceOfferingId);
            element['creditAmt'] = this.returnAmout('CREDIT', element.serviceOfferingId, this.previewList.bookingCommercialCustomerPrev[j].serviceOffrnPrev);
            element['paidAmt'] = this.returnAmout('PAID', element.serviceOfferingId, this.previewList.bookingCommercialCustomerPrev[j].serviceOffrnPrev);
            element['toPayAmt'] = this.returnAmout('TOPAY', element.serviceOfferingId, this.previewList.bookingCommercialCustomerPrev[j].serviceOffrnPrev)
          });
          console.log('this.uniqueOfferingsForCustomer[j ---', this.uniqueOfferingsForCustomer[j]);
        }
      }
    }

    this.previewList['bookingDeductionPrev']['vehicleDeductionList'].forEach(elem => {
      if (elem.type == 'STRING' || elem.type == 'INSURANCE') {
        this.insuranceList.push(elem);
      } else if (elem.type == 'EMI') {
        this.emiList.push(elem);
      }
    });

    this.previewList['paymentTermsPrev']['bookingBranchCommerciaList'].forEach(elem => {
      if (elem.type == 'Gratia' || elem.type == 'EX-GRATIA') {
        this.graciaList.push(elem);
      } else if (elem.type == 'MG') {
        this.mgList.push(elem);
      }
    });
    console.log('preview', this.previewList)
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

  /*---------- On close dialog ------- */
  onCloseEditPreview(){
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

   sendData(ob, file){
    this.apiService.sendEmail(file, JSON.stringify(ob))
    .subscribe(data => {
      this.spinner.hide();
      this.tosterservice.success("Email Sent Successfully !");
    }, error => {
      this.spinner.hide();
      this.tosterservice.error('Issue In Sending Email !');
    });

   }
   
  /*---------- on submit prview open success page ------------ */
  submitContract() {
    this.spinner.show();
    this.apiService.put(`secure/v1/bookingcontract/submit/${AppSetting.contractId}`).subscribe((suc) => {
      console.log(suc.data.responseData);
      let ob = ErrorConstants.validateException(suc);
      if (ob.isSuccess) {
        this.spinner.hide();
        AppSetting.sfxCode = suc.data.responseData;
        this.dialogRef.close();
        this.dialog.open(SuccessComponent, {
         data: {id:true},
        disableClose: true,
        panelClass: 'mat-dialog-responsive',
        width: '64rem'
      });

      } else {
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      this.tosterservice.error('Issue in generating Associate Contract Code.');
    });
   
  }

}
