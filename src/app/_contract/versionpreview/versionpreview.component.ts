import { Component, OnInit, Inject, ChangeDetectorRef, HostListener } from '@angular/core';
import { ContractService } from '../contract.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorConstants } from '../models/constants';
import { confimationdialog } from '../confirmationdialog/confimationdialog';
import { AuthorizationService } from '../services/authorization.service';
import { EmailDialogBoxP } from '../preview/preview.component';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-versionpreview',
  templateUrl: './versionpreview.component.html',
  styleUrls: ['../core.css']
})
export class VersionpreviewComponent implements OnInit {
  enableDialog: boolean=false;
  versionIndex: any;
  perMap = new Map();
  exAttrMap = new Map();
  perKeyList = [];
  exAttrKeyList =  [];

  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'printPreview', // the id of html/table element
  }

  constructor(
    private contractService:ContractService,
    public dialogRefVersionPreview: MatDialogRef<VersionpreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private spinner: NgxSpinnerService, private tosterservice: ToastrService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef, private authorizationService: AuthorizationService,
    private exportAsService: ExportAsService
  ) { }
version:string
  editflow = false;
  isDisable:boolean;
  dataPreview:any={};

  ngOnInit() {
   this.authorizationService.setPermissions('ALL');
   this.perMap = this.authorizationService.getPermissions('ALL');
   this.exAttrMap = this.authorizationService.getExcludedAttributes('ALL');
   this.perKeyList = Array.from(this.perMap.keys());
   this.exAttrKeyList = Array.from(this.exAttrMap.keys());
   this.version=this.data.version; 
   this.versionIndex=this.data.versionIndex;
    this.isDisable = false;
    this.spinner.show();
    if(this.versionIndex==0){
      this.contractService.getPreview(this.data.contractId,true)
      .subscribe(result => {
            let ob = ErrorConstants.validateException(result);
            if (ob.isSuccess) {
              this.dataPreview=result.data.responseData;
              this.spinner.hide();
              /**
               * Get the Distinct Safex category(Booking, Delivery) from child list for each commercial 
               * and set the same at commercial level
               */
                for (let objS of this.dataPreview.serviceOfferings) {
                  if(objS.rateCards){
                  for (let objR of objS.rateCards) {  
                    if(objR.commercialDTOs){
                      for (let objCom of objR.commercialDTOs) {
                        var safexCharges='';
                        for (let objSafex of objCom.safextCharge) {
                            if(safexCharges.indexOf(objSafex.safextCtgy)==-1){
                            safexCharges=safexCharges+objSafex.safextCtgy+',';
                            }
                          }
                        objCom['safexChargesType']=safexCharges.substring(0,safexCharges.lastIndexOf(','));
                        }
                      }
                    }
                   }
                  }  
                  this.enableDialog=true;
        
            }else {
              this.tosterservice.error(ob.message);
              this.spinner.hide();
            }
      },
      error => {
        // this.spinner.hide();
        this.tosterservice.error(ErrorConstants.getValue(404));
      });

  }
  else {
    this.contractService.getHistoryPreviewContractVersion(this.data.contractId,this.version)
    .subscribe(result => {

     let ob = ErrorConstants.validateException(result);
     if (ob.isSuccess) {

      this.dataPreview=result.data.responseData;
      /**
       * Get the Distinct Safex category(Booking, Delivery) from child list for each commercial 
       * and set the same at commercial level
       */
        for (let objS of this.dataPreview.serviceOfferings) {
          if(objS.rateCards){
          for (let objR of objS.rateCards) {  
            if(objR.commercialDTOs){
              for (let objCom of objR.commercialDTOs) {
                var safexCharges='';
                for (let objSafex of objCom.safextCharge) {
                    if(safexCharges.indexOf(objSafex.safextCtgy)==-1){
                    safexCharges=safexCharges+objSafex.safextCtgy+',';
                    }
                  }
                objCom['safexChargesType']=safexCharges.substring(0,safexCharges.lastIndexOf(','));
                }
              }
            }
           }
          } 
          this.enableDialog=true; 
     this.spinner.hide();
 
     }else {
       this.tosterservice.error(ob.message);
       this.spinner.hide();
     }
    },
    error => {
      this.spinner.hide();
      this.tosterservice.error(ErrorConstants.getValue(404));
    });

  }
  }
  closeDialog() {
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      data:{message:'Are you sure ?'},
      panelClass: 'creditDialog',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if(value){
        this.dialogRefVersionPreview.close();
      }else{
        console.log('Keep Open');
      }
    });
  }

  sendEmail(){
    let userDt = JSON.parse(sessionStorage.getItem("all")).data.responseData.user;
    
    const addrDialog = this.dialog.open(EmailDialogBoxP, {
      panelClass: 'creditDialog',
      disableClose: true,
      data : {email : userDt.email}
    });
    addrDialog.afterClosed().subscribe(result => {           
      if (result && result!="") {
    this.spinner.show();
    let ob = {
      "userId": userDt.userId, "toEmail": result,
      "subject": "Preview PDF For: " +this.dataPreview.msaDto.custName, "contractCode": this.dataPreview.sfxCode?this.dataPreview.sfxCode:'NOT GENERATED YET'
    }
    this.exportAsService.get(this.exportAsConfig).subscribe(content => {
      let file1 = this.b64toBlob(content)
      this.sendData(ob,file1)
    }); 
    // const printContent = document.getElementById("previewContent");
    // let doc = new jspdf('p', 'pt', 'a4');
    // doc.fromHTML(printContent.innerHTML, 15, 15);
    // var file = new Blob([doc.output()], {
    //   type: 'application/pdf'
    // });
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
  this.spinner.show();
  this.contractService.sendEmail(file, JSON.stringify(ob))
  .subscribe(data => {
    this.spinner.hide();
    this.tosterservice.success("Email Sent Successfully !");
  }, error => {
    this.spinner.hide();
    this.tosterservice.error('Issue In Sending Email !');
  });

 }

  @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.keyCode === 27) { // esc [Close Dialog]
          event.preventDefault();
          if(document.getElementById('closeButton')){
            let element = document.getElementById('closeButton')  ;
            element.click();
          }
        }
    }

}
