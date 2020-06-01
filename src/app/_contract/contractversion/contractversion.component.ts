import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { ContractService } from '../contract.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorConstants } from '../models/constants';
import { VersionpreviewComponent } from '../versionpreview/versionpreview.component';
import { ConsignorUploadFile } from '../msa/msa.component';
import { CompareversionsComponent } from '../compareversions/compareversions.component';
import { confimationdialog } from '../confirmationdialog/confimationdialog';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-contractversion',
  templateUrl: './contractversion.component.html',
  styleUrls: ['../core.css']
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
  constructor(private _contractService: ContractService,
    public dialogRefVersion: MatDialogRef<ContractversionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private spinner: NgxSpinnerService, private tosterservice: ToastrService,
    private dialog: MatDialog, private permissionsService: NgxPermissionsService, private authorizationService: AuthorizationService
  ) { }

  ngOnInit() {
    this.authorizationService.setPermissions('CONTRACT');
    this.permissionsService.loadPermissions(this.authorizationService.getPermissions('CONTRACT'));
    this.versions=[];
    this.contractVersionData=[];
    if (this.data) {
      this.displayedColumns = ['checked', 'cntrVer'];
      this.getContractVersions(this.data.contractId);
    }
  }
  displayedColumns: string[];
  dataSource = this.contractVersionData;

  getContractVersions(id: any) {
    this.spinner.show();
    this._contractService.getContractVersions(id)
      .subscribe(data => {
        let ob = ErrorConstants.validateException(data);
        if (ob.isSuccess) {
          var resData: any = data;
          for (let data of resData.data.responseData) {
            if (data.id != null || data.id != '') {
              this.contractVersionData.push(data);
            }
          }
          this.contractVersionData.forEach(item => {
            item.checked = false;
            item.disabled = false;
            item.index=0;
          });
          this.dataSource = this.contractVersionData;
          this.isEnabled=true;
        } else {
          this.tosterservice.error(ob.message);
          this.dialogRefVersion.close();
        }
        this.spinner.hide();
        this.isEnabled=true;
      }, error => {
        this.tosterservice.error(ErrorConstants.getValue(404));
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

  selection(index: any, event: any) {
   this.selectedVersion= this.dataSource[index].cntrVer;
   this.selectedIndex=index;
    this.isPreview = false;
    this.isCompare = false;
    this.dataSource[index].index=index;
    if (event == true) {
      this.rowSelected = this.rowSelected + 1;
      this.dataSource[index].checked = true;
      this.versions.push( this.dataSource[index]);
    }
    else {
      this.rowSelected = this.rowSelected - 1;
      this.dataSource[index].checked = false;
      for (let i = 0; i < this.versions.length; i++) {
        if ( this.versions[i].id === this.dataSource[index].id) { 
          this.versions.splice(i--, 1);
        }
      }
    }

    if (this.rowSelected == 1) {
      this.isPreview = true;

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
  }

  openDialogVersionpreview(): void {
    this.dialogRefVersion.close();
    const dialogRefVersionPreview = this.dialog.open(VersionpreviewComponent, {
      width: '140rem',
      height: '70rem',
      panelClass: 'creditDialog',
      data: {contractId:this.data.contractId,version: this.selectedVersion,versionIndex:this.selectedIndex},
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefVersionPreview.afterClosed().subscribe(result => {
    });
  }
  openDialogCompareVersions(): void {
    const dialogCompareVersions = this.dialog.open(CompareversionsComponent, {
      width: '140rem',
      height: '70rem',
      panelClass: 'creditDialog',
      data: {contractId:this.data.contractId,versions: this.versions},
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogCompareVersions.afterClosed().subscribe(result => {
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
