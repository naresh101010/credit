import { Component, OnInit, Inject, ChangeDetectorRef, HostListener } from '@angular/core';
import { ContractService } from '../contract.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AppSetting } from 'src/app/app.setting';
import { ErrorConstants } from '../models/constants';
import { confimationdialog } from '../confirmationdialog/confimationdialog';
import { AuthorizationService } from '../services/authorization.service';

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

  constructor(
    private contractService:ContractService,
    public dialogRefVersionPreview: MatDialogRef<VersionpreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private spinner: NgxSpinnerService, private tosterservice: ToastrService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef, private authorizationService: AuthorizationService
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

  @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.keyCode === 27) { // esc [Close Dialog]
          event.preventDefault();
          if(document.getElementById('closeButton')){
            let element: HTMLElement = document.getElementById('closeButton') as HTMLElement;
            element.click();
          }
        }
    }

}
