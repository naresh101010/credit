import { Component, OnInit, HostListener,Inject, ViewChild, ElementRef} from '@angular/core';
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
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ["../core.css"]
})
export class PreviewComponent implements OnInit {
  @ViewChild('previewContent', null) previewContent:ElementRef;


  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'previewContent', // the id of html/table element
  }
  
  
  printPage() {
    window.print();
  }

  constructor(private contractService:ContractService, private acrouter: ActivatedRoute,
    private tosterservice: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public dialog: MatDialog,
    private permissionsService: NgxPermissionsService,
    private authorizationService: AuthorizationService,private exportAsService: ExportAsService) { }
  
  customerName : string= AppSetting.customerName;
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

  closePreview($event){
    $event.preventDefault();
    if (this.editflow) {
      this.router.navigate(['/prc-contract/documentupload', { steper: true, 'editflow': 'true' }], { skipLocationChange: true });
    } else {
      this.router.navigate(['/prc-contract/documentupload'], { skipLocationChange: true });
    }
  }



  /**
   * get preview data
   */
  data:any={};
  loadingFlag: boolean=true;
  getPreviewData(){
    console.log("Getting Preview Data...");
    this.spinner.show();
    this.contractService.getPreview(AppSetting.contractId,this.editflow)
      .subscribe(result => {


            let ob = ErrorConstants.validateException(result);
            if (ob.isSuccess) {
    
              console.log(result,"get preview response");
              this.data=result.data.responseData;

              if(this.data  && this.data.branchDTOs && this.data.branchDTOs.length > 0 && this.data.isRatecardApplicable == 0){
                this.data.serviceOfferings[0]['rateCards'] = [] ;
                let temp = {
                  branchDTOs : [], 
                  ratecardDTO: {}, 
                  commercialDTOs: [], 
                  commandmentChargeDTOs: [], 
                  tncDTO : {}, 
                  safextSlaDTOs: [], 
                  zmSlaDTOs: [], 
                  safextCustomSlaDTOs: [], 
                  zmCustomSlaDTOs: [] }
                 temp.branchDTOs = this.data.branchDTOs;
                this.data.serviceOfferings[0]['rateCards'].push(temp)

              }
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

  expendPanel: boolean = false;
  expandToggle(){
    this.expendPanel = true;
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
        "subject": "Preview PDF For: " +this.customerName, "contractCode": this.data.sfxCode?this.data.sfxCode:'NOT GENERATED YET'
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
    this.contractService.sendEmail(file, JSON.stringify(ob))
    .subscribe(data => {
      this.spinner.hide();
      this.tosterservice.success("Email Sent Successfully !");
    }, error => {
      this.spinner.hide();
      this.tosterservice.error('Issue In Sending Email !');
    });

   }
  
  generateSFXCode(){
    this.spinner.show();
    this.contractService.generateSFXCode(AppSetting.contractId,this.editflow).subscribe(result=>{
      let ob = ErrorConstants.validateException(result);
      if (ob.isSuccess) {
        console.log(result);
        this.spinner.hide();
        const dialogSfxCode = this.dialog.open(SfxDialogComponent, {
        data:{message:result.data.responseData.sfxCode, messageHeader: 'PRC Code GENERATED'},
          disableClose: true,
          panelClass: 'creditDialog',
          width: '400px'
        });
  
      }else {
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      this.tosterservice.error('Issue in generating PRC Code. Kindly verfiy SFDC Oppr Id and MSA Account Id.');
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
            let element = document.getElementById('previewSubmitButton')  ;
            element.click();
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

    customerName : string= AppSetting.customerName;
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
              if(this.data && this.data.isRatecardApplicable == 0){
                // this.data.serviceOfferings[0]['rateCards'] = [] ;
                let temp = {
                  branchDTOs : [], 
                  // ratecardDTO: {}, 
                  // commercialDTOs: [], 
                  // commandmentChargeDTOs: [], 
                  // tncDTO : {}, 
                  // safextSlaDTOs: [], 
                  // zmSlaDTOs: [], 
                  // safextCustomSlaDTOs: [], 
                  // zmCustomSlaDTOs: [] 
                }
                temp.branchDTOs = this.data.branchDTOs;
                let tempRateCard = {
                  ['rateCards'] : []
                }
                
                tempRateCard.rateCards.push(temp);
                 
                this.data.serviceOfferings.push(tempRateCard);
              }
              
              
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
        data:{message:result.data.responseData.sfxCode, messageHeader: 'PRC CODE SUBMITTED'},
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
      this.tosterservice.error("Issue in generating PRC Code. Kindly verfiy SFDC Oppr Id and MSA Account Id.");
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

@Component({
  selector: 'email-dialog',
  templateUrl: 'email.dialog.html',
  styleUrls: ['../core.css']
})

export class EmailDialogBoxP {

  constructor( public dialogRef: MatDialogRef<EmailDialogBoxP>, 
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private tosterservice: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  bdmEmail:string=""

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeDialog(): void {
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      data:{message:'Are you sure ?'},
      panelClass: 'creditDialog',
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

  ngOnInit() {
    this.bdmEmail = this.data.email;
  }

  emailAddress(){
    this.data = this.bdmEmail.toUpperCase();
    this.spinner.show();
    this.dialogRef.close(this.data);
  }

  @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if (event.keyCode === 27) { // esc [Close Dialog]
        event.preventDefault();
        if(document.getElementById('closeButton')){
          let escElement = document.getElementById('closeButton')  ;
          escElement.click();
        }
      }
  }

}