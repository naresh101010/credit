import { Component, OnInit, ViewChild, Inject, HostListener } from '@angular/core';


import {MatTableDataSource} from '@angular/material/table';
import { AppSetting } from '../../app.setting';
import {MatPaginator, MatSort, MatDialog } from '@angular/material';
import { NgxSpinnerService } from "ngx-spinner";
import { ContractService } from '../contract.service';
import { ErrorConstants }  from '../models/constants';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ContractversionComponent } from '../contractversion/contractversion.component';
import { confimationdialog } from '../confirmationdialog/confimationdialog';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-existingsafexlist',
  templateUrl: './existingsafexlist.component.html',
  styleUrls: ["../core.css"]
})
export class ExistingsafexlistComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private _contractService: ContractService,
    public dialogRefEdit: MatDialogRef<ExistingsafexlistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private spinner: NgxSpinnerService, private tosterservice: ToastrService,
    private dialog: MatDialog, private authorizationService: AuthorizationService) { }
  sfxCodeList = [];

  isEditflow: boolean = false;
  ngOnInit() {
    let perList = [];
    this.authorizationService.setPermissions('CONTRACT');
    perList = this.authorizationService.getPermissions('CONTRACT');
    console.log("msa ID ::::::: ", this.data);
    if (this.data) {
      this.displayedColumns = ['cntrCode', 'lkpBizTypeId', 'service', 'effectiveDt', 'expDt', 'crtdDt', 'status'];
      if (perList.includes('CONTRACT_READ')) {
        this.displayedColumns.push('version');
      }
      if (this.data.isEditflow) {
        this.isEditflow = true;
        if (perList.includes('CONTRACT_UPDATE')) {
          this.displayedColumns.push('edit');
        }
      }
      if(this.data.msaId){
        this.getSFXCodeByMsaId(this.data.msaId);
      }else if(this.data.sfxType){
        this.getSFXCodeBySFXId(this.data.sfxType);
      }
    }
  }

  displayedColumns: string[] ;
  dataSource = new MatTableDataSource(this.sfxCodeList);
  getSFXCodeBySFXId(code){
    if(!code.trim()){
      this.tosterservice.info('Please input SFX Code !');
      this.dialogRefEdit.close();
      this.spinner.hide();
      return;
    }
    this.spinner.show();
    this._contractService.getSfxCodeSFXId(code)
      .subscribe(data => {
        let ob = ErrorConstants.validateException(data);
        if (ob.isSuccess) {
          var resData:any =data;
          this.sfxCodeList = [];
          for(let data of resData.data.responseData){
            this.listoffNames = []
            if(data.cntrCode != null || data.cntrCode != '') {
              for(let status of resData.data.referenceData.statusList){
                if(data.status==status.id){
                  data["statusName"] = status.lookupVal;
                }
              }
              resData.data.referenceData.businessTypeList.forEach(element => {
                if (element.id == data.lkpBizTypeId) {
                  data['businessType'] = element.lookupVal;
                }
              });
              for(let offr of data.offering){
                this.listoffNames.push(offr.serviceOffering);
              }
              data['servicetype']= this.listoffNames.toString();
              if(data.statusName=='ACTIVE'){this.sfxCodeList.push(data);}
            }
          }
          console.log(this.sfxCodeList, "sfxCodeList");
          if(this.sfxCodeList.length==0){
            this.tosterservice.info('No Submitted SFX Found !!');
            this.spinner.hide();
            this.dialogRefEdit.close();
            return;
          }
          this.spinner.hide();
          this.dataSource = new MatTableDataSource(this.sfxCodeList); 
        }else{
            this.tosterservice.error(ob.message);
            this.spinner.hide();
            this.dialogRefEdit.close();
        }
      },error => {
        this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      }); 
  }

  listoffNames = []

  getSFXCodeByMsaId(msaId){
    
    console.log("msaId",msaId);
  if(msaId =='undefined' || msaId == null || msaId ==''){
    this.tosterservice.error('MSA Id Undefined');
    this.sfxCodeList=[];
    msaId='';
  }else{
    this.spinner.show();
    this._contractService.getSfxCodeByMSAId(msaId)
      .subscribe(data => {
        let ob = ErrorConstants.validateException(data);
        if (ob.isSuccess) {
          var resData:any =data;
          this.sfxCodeList = [];
          for(let data of resData.data.responseData){
            this.listoffNames = []
            if(data.cntrCode != null || data.cntrCode != '') {
              for(let status of resData.data.referenceData.statusList){
                if(data.status==status.id){
                  data["statusName"] = status.lookupVal;
                }
                
              }
              resData.data.referenceData.businessTypeList.forEach(element => {
                if (element.id == data.lkpBizTypeId) {
                  data['businessType'] = element.lookupVal;
                }
              });
              for(let status of resData.data.referenceData.statusList){
                if(data.status==status.id){
                  data["statusName"] = status.lookupVal;
                } 
              }
              for(let offr of data.offering){
                this.listoffNames.push(offr.serviceOffering);
              }
              data['servicetype']= this.listoffNames.toString();
              if(data.statusName=='ACTIVE'){this.sfxCodeList.push(data);}
            }
          }
          console.log(this.sfxCodeList, "sfxCodeList");
          if(this.sfxCodeList.length==0){
            this.tosterservice.info('No Submitted SFX Found !!');
            this.spinner.hide();
            this.dialogRefEdit.close();
            return;
          }
          this.spinner.hide();
          this.dataSource = new MatTableDataSource(this.sfxCodeList); 
        }else{
            this.tosterservice.error(ob.message);
            this.spinner.hide();
            this.dialogRefEdit.close();
        }
      },error => {
        this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      }); 
  } 

  }

  showSfxCodeData(data){
      console.log("data",JSON.stringify(data));
      AppSetting.msaCustId=data.msaCustId
      AppSetting.contractId=data.id;
      AppSetting.stepperFlag=true;
      if(this.isEditflow){
        this.dialogRefEdit.close();
        AppSetting.oprtunityId=data.opportunityId;
        this.router.navigate(['contract/opportunity',{'openDialog':'true'}], {skipLocationChange: true});
      }else{
        this.dialogRefEdit.close(data);
      }
      
  }

  closeDialog(){
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      data:{message:'Are you sure ?'},
      panelClass: 'creditDialog',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if(value){
        this.dialogRefEdit.close();
      }else{
        console.log('Keep Open');
      }
    });
  }

  openDialogContractVersion(data): void {
    this.dialogRefEdit.close();
    const dialogRefVersion = this.dialog.open(ContractversionComponent, {
      width: '690px',
      panelClass: 'creditDialog',
      data: {contractId:data.id,cntrCode: data.cntrCode},
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefVersion.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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

export interface PopData {
  msaId: object;
  isEditflow:boolean;
}