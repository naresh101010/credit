import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { AppSetting } from '../../app.setting';
import { ErrorConstants } from '../../core/models/constants';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { SuccessComponent } from 'src/app/components/success/success.component';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { EmailPreviewComponent } from '../email-preview/email-preview.component';

@Component({
  selector: 'app-preview-popup',
  templateUrl: './preview-popup.component.html',
  styleUrls: ['./preview-popup.component.css'],
  providers : [DatePipe]
})
export class PreviewPopupComponent implements OnInit {

  previewList: any;
  previewRefList;
  graciaList: any = [];
  mgList: any = [];
  insuranceList: any = [];
  emiList: any = [];
  versionIndex: number;
  uniqueOfferings: any[] = [];
  uniqueOfferingsForCustomer: any = [];
  myDate = new Date();
  currDate: string;

  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'previewContent', // the id of html/table element
  }

  constructor(public dialogRef: MatDialogRef<PreviewPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private tosterservice: ToastrService,
    private datePipe: DatePipe,
    private exportAsService: ExportAsService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService) { }

  customerName : string= AppSetting.customerName;
  ngOnInit() {

    this.versionIndex = this.data.versionIndex;
    this.currDate = this.datePipe.transform(this.myDate, 'MM-dd-yyyy');

    this.spinner.show();
    if (this.versionIndex !== 0) {
      this.apiService.get('secure/v1/bookingcontractpreview/historypreview/' + this.data.data.contractId +'/' + this.data.version).subscribe(data => {
        this.previewList = data.data.responseData;
        this.previewRefList = data.data.referenceData;
        this.renderPreviewData();
        this.spinner.hide();
      }, (error) => {
        this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      });
    }
    else {
      this.apiService.get('secure/v1/bookingcontractpreview/' + this.data.data.contractId).subscribe(response => {
        this.previewList = response.data.responseData;
        this.previewRefList = response.data.referenceData;
        this.renderPreviewData();
        this.spinner.hide();
      }, (error) => {
        this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      });
    }
  }

  sendContractId() {
    this.spinner.show();
    this.apiService.put(`secure/v1/bookingcontract/submit/${this.data.data.contractId}`).subscribe((suc) => {
      console.log(suc.data.responseData);
      let ob = ErrorConstants.validateException(suc);
      if (ob.isSuccess) {
        this.spinner.hide();
        AppSetting.sfxCode = suc.data.responseData;
       // this.router.navigate(['/asso_booking-contract/success'])
       const dialogRef = this.dialog.open(SuccessComponent, {
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

}

