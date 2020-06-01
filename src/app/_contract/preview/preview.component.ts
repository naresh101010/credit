import { Component, OnInit, HostListener} from '@angular/core';
import { ContractService } from '../contract.service';
import { AppSetting } from 'src/app/app.setting';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ErrorConstants } from '../models/constants';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { confimationdialog } from '../confirmationdialog/confimationdialog';
import { SfxDialogComponent } from '../sfx-dialog/sfx-dialog.component';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ["../core.css"]
})
export class PreviewComponent implements OnInit {
  
  
  printPage() {
    window.print();
  }

  constructor(private contractService:ContractService, private acrouter: ActivatedRoute,
    private tosterservice: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public dialog: MatDialog,
    private permissionsService: NgxPermissionsService,
    private authorizationService: AuthorizationService) { }
  
  customerName : String= AppSetting.customerName;
  sfdcAccId= AppSetting.sfdcAccId;
  editflow = false;
  isDisable:boolean;
  ngOnInit() {
    this.authorizationService.setPermissions('CONTRACT');
    this.permissionsService.loadPermissions(this.authorizationService.getPermissions('CONTRACT'));
    this.isDisable = false;
    this.acrouter.params.subscribe(params => {
      if (params['editflow']) { 
        this.editflow = params['editflow'];
        this.isDisable = true;
      }
    });
    this.getPreviewData();
  }

  closePreview(){
    if (this.editflow) {
      this.router.navigate(['/contract/documentupload', { steper: true, 'editflow': 'true' }], { skipLocationChange: true });
    } else {
      this.router.navigate(['/contract/documentupload'], { skipLocationChange: true });
    }
  }



  /**
   * get preview data
   */
  data:any={};
  loadingFlag: Boolean=true;
  getPreviewData(){
    console.log("Getting Preview Data...");
    this.spinner.show();
    this.contractService.getPreview(AppSetting.contractId,this.editflow)
      .subscribe(result => {


            let ob = ErrorConstants.validateException(result);
            if (ob.isSuccess) {
    
              console.log(result,"get preview response");
              this.data=result.data.responseData;
              
              /**
               * Get the Distinct Safex category(Booking, Delivery) from child list for each commercial 
               * and set the same at commercial level
               */
                for (let objS of this.data.serviceOfferings) {
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
                  this.spinner.hide();
        
            }else {
              this.tosterservice.error(ob.message);
              this.spinner.hide();
            }
      },
      error => {
        this.spinner.hide();
        this.tosterservice.error(ErrorConstants.getValue(404));
        console.log(ErrorConstants.getValue(404));
      });

  }

  printPreview(){
    const printContent = document.getElementById("previewContent");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }
  
  generateSFXCode(){
    this.spinner.show();
    this.contractService.generateSFXCode(AppSetting.contractId,this.editflow).subscribe(result =>{
      let ob = ErrorConstants.validateException(result);
      if (ob.isSuccess) {
        console.log(result);
        this.spinner.hide();
        const dialogSfxCode = this.dialog.open(SfxDialogComponent, {
        data:{message:result.data.responseData.sfxCode,isNew:true},
          disableClose: true,
          panelClass: 'creditDialog',
          width: '400px'
        });
      } else {
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      this.tosterservice.error('Issue in generating SFX code. Kindly verfiy SFDC Oppr Id and MSA Account Id.');
    });
  }

  openDialogForEditPreview(): void {
    const dialogRef = this.dialog.open(EditPreview, {disableClose: true,
      panelClass: 'creditDialog',
      width: '90%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');    
    });
  }

  
  @HostListener('document:keydown', ['$event'])

  handleKeyboardEvent(event: KeyboardEvent) {

      if (event.altKey && (event.keyCode === 78)) { // alt+n [Next]
          event.preventDefault();
          if(document.getElementById('previewSubmitButton')){
            let element: HTMLElement = document.getElementById('previewSubmitButton') as HTMLElement;
            element.click();
          }
          else {
                  
          }
        }

  }

}


//***********
//* For Edit Preview Dialog
//*************
@Component({
  selector: 'editPreview',
  templateUrl: 'editPreview.html',
  styleUrls: ['../core.css']
})

export class EditPreview implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<EditPreview>,
    public dialog: MatDialog,
    private contractService: ContractService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private tosterservice: ToastrService) {}

    ngOnInit(){
      this.getEditPreviewData();
    }

    customerName : String= AppSetting.customerName;
    sfdcAccId= AppSetting.sfdcAccId;
  /**
   * get preview from stage for edited data
   */
  data:any={};
  getEditPreviewData(){
    console.log("Getting Edit Preview Data...");
    this.spinner.show();
    this.contractService.getEditPreview(AppSetting.contractId)
      .subscribe(result => {
            let ob = ErrorConstants.validateException(result);
            if (ob.isSuccess) {
              console.log(result,"get preview response");
              this.data=result.data.responseData;
              this.spinner.hide();
              /**
               * Get the Distinct Safex category(Booking, Delivery) from child list for each commercial 
               * and set the same at commercial level
               */
                for (let objS of this.data.serviceOfferings) {
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
            }else {
              this.tosterservice.error(ob.message);
              this.spinner.hide();
            }
      },
      error => {
        this.spinner.hide();
        this.tosterservice.error(ErrorConstants.getValue(404));
        console.log(ErrorConstants.getValue(404));
      });
  }

  closeDialog(): void {     
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      panelClass: 'creditDialog',
      data:{message:'Are you sure ?'},
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if(value){
        this.dialogRef.close();
      }else{
        console.log('Keep Open');
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  generateSFXCodeSTGEdit(){
    this.spinner.show();
    this.contractService.generateSFXCode(AppSetting.contractId,true).subscribe(result=>{
      this.spinner.hide();
      let ob = ErrorConstants.validateException(result);
      if (ob.isSuccess) {
        this.dialogRef.close();
        console.log(result);
        this.dialog.open(SfxDialogComponent, {
        data:{message:result.data.responseData.sfxCode,isNew:false},
          disableClose: true,
          panelClass: 'creditDialog',
          width: '400px'
        });
  
      }else {
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }
    },error=>{
      this.spinner.hide();
      this.tosterservice.error("Issue in generating SFX code. Kindly verfiy SFDC Oppr Id and MSA Account Id.");
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