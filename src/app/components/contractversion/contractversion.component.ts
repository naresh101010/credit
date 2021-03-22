import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../core/services/api.service';
import{confimationdialog}from '../../dialog/confirmationdialog/confimationdialog'
import { PreviewPopupComponent } from '../../dialog/preview-popup/preview-popup.component';
import { CompareVersionComponent } from '../../dialog/compare-version/compare-version.component';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { EmailPreviewComponent } from 'src/app/dialog/email-preview/email-preview.component';
import { AppSetting } from 'src/app/app.setting';

@Component({
  selector: 'app-contractversion',
  templateUrl: './contractversion.component.html',
  styleUrls: ['./contractversion.component.css']
})
export class ContractversionComponent implements OnInit {
  isEnabled:boolean=false;
  contractVersionData: any[];
  isSelected: any;
  rowSelected: any = 0;
  isPriview: boolean;
  isCompare: boolean;
  isPreview: boolean;
  selectedVersion: any;
  version: any[];
  versions: any[];
  dialogCompareVersions: any;
  selectedIndex: any;
  perList: any = [];

  constructor(
    private apiService:ApiService,
    public dialogRefVersion: MatDialogRef<ContractversionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private spinner: NgxSpinnerService, private tosterservice: ToastrService,
    private dialog: MatDialog,
    private exportAsService: ExportAsService
  ) { }
  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'previewContent', // the id of html/table element
  }

  customerName : string= AppSetting.customerName;
  dataSource:any;

  ngOnInit() {
    this.versions=[];
    this.contractVersionData=[];
    if (this.data) {
      this.displayedColumns = [ 'checked','cntrVer', 'updDt'];
      this.getContractVersions(this.data.contractId);
    }
  }
  displayedColumns: string[];
  // dataSource = this.contractVersionData;

  getContractVersions(id: any) {
    this.spinner.show();
    this.apiService.get("/secure/v1/cargocontractpreview/historypreview/version/"+id)
      .subscribe(suc => {
        if (suc) {
          let resData: any = suc;
          let obj = resData.data.responseData;
          let result = Object.keys(obj).map((key) => {
          let objnew= {
            cntrVer: 0,
            date: '',
            checked: false,
            disabled: false,
            index: 0
          }
          objnew.cntrVer = Number(key), 
          objnew.date = obj[key]
          return objnew;
          });
          this.contractVersionData.push(result);
          if(this.contractVersionData[0].length==1){
            this.contractVersionData[0][0].checked= true;
          }
          this.dataSource = this.contractVersionData[0];
          this.isEnabled=true;
          if(this.contractVersionData[0].length==1)
              this.selection(0,true,this.contractVersionData[0][0]);
        } else {
         
          this.dialogRefVersion.close();
        }
        if(this.dataSource !== undefined && this.dataSource.length > 0){
          let sortedArray = this.dataSource.sort((a,b) => b.cntrVer - a.cntrVer);
          this.dataSource = sortedArray;
          }
        this.spinner.hide();
        this.isEnabled=true;
      }, error => {
      //  this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      });
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
        this.dialogRefVersion.close();
      }else{
        console.log('Keep Open');
      }
    });
  }

  selection(index: any, event: any, obj) {
    this.selectedVersion= this.dataSource[index].cntrVer;
    this.selectedIndex=index;
     this.isPreview = false;
     this.isCompare = false;
     this.dataSource[index].index=index;
     if (event == true) {
       this.rowSelected = this.rowSelected + 1;
       this.dataSource[index].checked = true;
     }
     else {
       this.rowSelected = this.rowSelected - 1;
       this.dataSource[index].checked = false;
     }
 
     if (this.rowSelected == 1) {
       this.isPreview = true;

       let data = this.dataSource.find(x => x.checked);
       this.selectedVersion= data.cntrVer;
       this.selectedIndex= data.index;
     }
     if (this.rowSelected == 2) {
       this.isPreview = false;
       this.isCompare = true;
     }
     for (let i = 0; i < this.dataSource.length; i++) {
       if (this.rowSelected == 2) {
         this.dataSource[i].disabled = !this.dataSource[i].checked;
       } else {
         this.dataSource[i].disabled = false;
       }
     }
 
     this.versions = this.dataSource.filter(obj => {
      return obj.checked == true
    });
 
   }

   sharePreview(){
    let userDt = JSON.parse(sessionStorage.getItem("all")).data.responseData.user;
    const addrDialog = this.dialog.open(EmailPreviewComponent, {
      panelClass: 'mat-dialog-responsive',
      disableClose: true,
      data : {email : userDt.email}
    });

    addrDialog.afterClosed().subscribe(result => {    
      console.log('res', result,this.data );       
      if (result && result!="") {
      this.spinner.show();
      let ob = {
        "userId": userDt.userId, "associateEmailId": result,
        "assocId": this.data.id
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
    this.apiService.sendEmail(file, ob)
    .subscribe(data => {
      this.spinner.hide();
      this.tosterservice.success("Email Sent Successfully !");
    }, error => {
      this.spinner.hide();
      this.tosterservice.error('Issue In Sending Email !');
    });

   }

  openDialogPreview(btn) {
    const dialogRefVersion = this.dialog.open(PreviewPopupComponent, {
      width: '80vw',
      panelClass: 'mat-dialog-responsive',
      data: {data : this.data, version :this.selectedVersion, versionIndex:this.selectedIndex,  btn:btn}
    });

    dialogRefVersion.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /*------- Open compare preview dialog ---------- */
  openComparePreviewDialog() {
    const dialogRefCompare = this.dialog.open(CompareVersionComponent, {
      width: '80vw',
      panelClass: 'mat-dialog-responsive',
      data: {data : this.data, versions: this.versions}
    });

    dialogRefCompare.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  
  @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.keyCode === 27) { // esc [Close Dialog]
          event.preventDefault();
          if(document.getElementById('closeButton')){
            let element   = document.getElementById('closeButton')  ;
            element.click();
          }
        }
    }
    
}
