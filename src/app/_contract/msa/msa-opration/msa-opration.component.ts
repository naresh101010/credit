import { Component, OnInit, Inject, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ContractService } from '../../contract.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { searchCriteria } from '../../models/searchCriteria';
import { DataService } from "../sharedata.service";
import {ExistingsafexlistComponent } from "../../existingsafexlist/existingsafexlist.component";
import { confimationdialog } from '../../confirmationdialog/confimationdialog';
import { ErrorConstants } from '../../models/constants';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material';
import { AuthorizationService } from '../../services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
  selector: 'app-msa-opration',
  templateUrl: './msa-opration.component.html',
  styleUrls: ["../../core.css"]
})
export class MsaOprationComponent implements OnInit {

  displayedColumns: string[] = [
    'custName',
    'sfdcAccId',
    'sfdcAccType',
    'pan',
    'gstinNum',
    'email',
    'actions1',
    'actions2'
  ];


  constructor(private contractservice: ContractService,private sharedSearchdata: DataService,private spinner: NgxSpinnerService,private acrouter: ActivatedRoute,
    private router: Router, private dialog: MatDialog, private tosterservice: ToastrService,
    private permissionsService: NgxPermissionsService, private authorizationService: AuthorizationService) { }


    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild('TABLE',{static: false} ) table: ElementRef;

  searchModel:searchCriteria = new searchCriteria();
  isDisable = false;
  perList: any = [];

  ngOnInit() {
    this.authorizationService.setPermissions('CONTRACT');
    this.perList = this.authorizationService.getPermissions('CONTRACT') == null ? [] : this.authorizationService.getPermissions('CONTRACT');
    this.authorizationService.setPermissions('MSA');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('MSA'));
    this.authorizationService.setPermissions('COMMANDMENT');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('COMMANDMENT'));
    console.log(this.perList);
    this.permissionsService.loadPermissions(this.perList);

    this.isDisable = false;
    this.acrouter.params.subscribe(params => {
        if (params['openDialog']) {
          this.isDisable = true;
        this.displayedColumns = ['custName', 'sfdcAccId', 'sfdcAccType', 'pan', 'gstinNum', 'email', 'actions2'];
        }
    });
    this.sharedSearchdata.currentMessage.subscribe(msadata => msadata = msadata);
    this.referenceData=this.getMSAReferences();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dataSource: any;
  msaSearchResult;
  referenceData;
  createmsa=true;
  
  getMSAsearch(obj){
  let DisField=[];
  let fields=[];
  this.msaSearchResult = [];
  let trueOne=false;
  for (var key in this.searchModel) {
    if (this.searchModel[key].length<3 && this.searchModel[key].length!="")
      fields.push(key);
    else if(this.searchModel[key].length=="")
      DisField.push(key);
    else if(this.searchModel[key].length>=3)  
      trueOne=true;
    }
  let flg=true;
  if(fields.length>0){
    this.tosterservice.info(`Enter minimum 3 character in ${fields.toString()}!`);
    flg=false;
  }

  let blnkAll=true;
  if(obj.custName=="" && obj.pan=="" && obj.email == "" && obj.gstinNum=="" && obj.sfdcAccId==""){
    this.tosterservice.info(`Enter minimum 3 character in any field !`);
    blnkAll=false;
  }
  if(obj.custName == undefined && obj.pan == undefined && obj.email == undefined && obj.gstinNum == undefined && obj.sfdcAccId == undefined){
    this.tosterservice.info(`Enter minimum 3 character in any field !`);
    blnkAll=false;
  }
  if((obj.custName=="" || obj.pan=="" || obj.email == "" || obj.gstinNum=="" || obj.sfdcAccId=="") && flg==true && trueOne==false){
    this.tosterservice.info(`Enter minimum 3 character in any field !`);
    blnkAll=false;
  }

  else if(flg!=false && blnkAll==true ){this.spinner.show();
    this.contractservice.getMSASearch(this.searchModel)
    .subscribe(data => {
      let ob = ErrorConstants.validateException(data);
      if (ob.isSuccess) {
        this.spinner.hide();
        if (data.data && data.data.responseData && data.data.responseData.length > 0) {
          data.data.responseData.forEach(msaResult => {
            if (msaResult.accType !== 'PRC' && msaResult.accType !== 'RETAIL') {
              this.msaSearchResult.push(msaResult);
            }
          });
        }
        //added for #BulkUpload
        for (let item of data.data.referenceData.moduleEntityList) {
          if(item.lookupVal == "COMMANDMENT"){
            this.cmdModuleEntitiId=item.id;
          }
        }
        if(this.msaSearchResult.length==0){
          this.tosterservice.info("No MSA Search Result Found !");
        }
        this.dataSource = new MatTableDataSource(this.msaSearchResult);
        this.dataSource.sort = this.sort;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });

      } else {
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }
      },
    error => {
      this.tosterservice.error(ErrorConstants.errorNotFound);
    }); }
        
  }

  ngAfterViewInit() {
    if(this.dataSource){
          this.dataSource.paginator = this.paginator;

    }
   }

  getMSAReferences(){
    this.spinner.show();
    this.contractservice.getMSAReferences()
      .subscribe(data => {
      
        let ob = ErrorConstants.validateException(data);
        if (ob.isSuccess) {
          this.referenceData = data.data.referenceData;
          this.spinner.hide();
        }else {
          this.tosterservice.error(ob.message);
          this.spinner.hide();
        }
      }
        ,
        error => {
          this.spinner.hide()
          this.tosterservice.error("Something went wrong");
        });
  }
//msadata:any
  passResultData(msadata, flag) {
    let passData = {};
    passData["msadata"]=msadata;
    passData["referenceData"]=this.referenceData;
    this.sharedSearchdata.changeMessage(passData);
    if (flag === 0) {
    this.router.navigate(['contract/msacreation'], {skipLocationChange: true});
    } else {
    this.spinner.show();
    this.contractservice.getPRCContractByMSAId(msadata.id).subscribe(validateResult => {
      let ob = ErrorConstants.validateException(validateResult);
      if (ob.isSuccess) {
        let cntrCode = '';
        if (validateResult.data.responseData && validateResult.data.responseData.length > 0) {
          validateResult.data.responseData.forEach(element => {
            cntrCode = cntrCode + element.cntrCode + ', ';
          });
        }
        this.spinner.hide();
        if (cntrCode === '') {
          this.router.navigate(['contract/msacreation'], {skipLocationChange: true});
        } else {
          const dialogRefConfirm = this.dialog.open(confimationdialog, {
            width: '450px',
            data: { message: `PRC active contracts also exists for this MSA with contract code ${cntrCode} \n \n 
                              Do you want to continue ?`},
            panelClass: 'creditDialog',
            disableClose: true,
            backdropClass: 'backdropBackground'
          });
          dialogRefConfirm.afterClosed().subscribe(value => {
            if (value) {
              this.router.navigate(['contract/msacreation'], {skipLocationChange: true});
            }
          });
        }
      } else {
        this.spinner.hide();
        this.tosterservice.error(ob.message);
      }

    }, error => {
      this.spinner.hide();
      this.tosterservice.error(ErrorConstants.errorNotFound);
    });

    
  }

  }
  
  showMSA(msadata){
	    let passcustId=msadata.id
	    console.log("wholedata",msadata,"called pass showData",passcustId)
	    this.sharedSearchdata.changeMessage(passcustId)	   
	  }
  
      // dialog
  openDialogSFXSearch(msadata): void {
    
    const dialogRefEdit = this.dialog.open(ExistingsafexlistComponent, {
      width: '1000px',
      panelClass: 'creditDialog',
      data: {msaId:msadata.id,isEditflow: true},
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefEdit.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

    /**
   * Download templete for bulk upload
   */
  downloadCmdTemplate() {
    this.spinner.show();
    this.contractservice.getCmdDownloadDoc()
      .subscribe(data => {
        this.spinner.hide();
        var a = document.createElement("a");
        var blob = new Blob([data], {type: "octet/stream"});
         //for edge browser
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, 'COMMANDMENT_UPDATE_TEMPLATE.xls');
            return;
          } 
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'COMMANDMENT_UPDATE_TEMPLATE.xls';
        a.click();
        window.URL.revokeObjectURL(url);
        this.tosterservice.success("Template downloaded");
      },
      error => {
        this.spinner.hide()
        console.log(error,"Error in download")
        this.tosterservice.error("Something went wrong");
      });
    
      
  }

    /**
  *  #BulkUpload
  *  Call post service to upload the file
  */
 uploadedCmdFileName:any
 cmdModuleEntitiId:any
 fileToUpload:any
 uploadDocument(id) {
  var validExt: boolean
  if (this.uploadedCmdFileName) {
    validExt = this.uploadedCmdFileName.substr(this.uploadedCmdFileName.lastIndexOf("."), this.uploadedCmdFileName.length) == '.xls' ? true : false;
  }
  this.spinner.show();
  if (validExt) {
      this.contractservice.postCmdUploadDoc(id,this.cmdModuleEntitiId,this.fileToUpload)
      .subscribe(data => {
        this.spinner.hide()
        console.log("data" ,data);
        this.tosterservice.success("File uploaded");
        this.uploadedCmdFileName = '';
    
      },
    error => {
      console.log(error)
      this.spinner.hide()
    });
  } else {
    this.spinner.hide();
    this.uploadedCmdFileName='';
    this.tosterservice.error("Please upload valid file i.e .xls");
  }
}

handleFileInput(event,id){
  let fileList: FileList = event.target.files;
   if(fileList.length > 0) {
       this.fileToUpload = fileList[0];
       this.uploadedCmdFileName = this.fileToUpload.name;
       console.log("Uploaded File "+this.uploadedCmdFileName);

       this.openConfirmationDialog(id,event);
   }
 }

 openConfirmationDialog(id,event): void {

  const dialogRefConfirm = this.dialog.open(confimationdialog, {
    width: '500px',
    panelClass: 'creditDialog',
    data:{message:'Do you want to upload '+ this.uploadedCmdFileName+ ' ?'},
    disableClose: true,
    backdropClass: 'backdropBackground'
  });

  dialogRefConfirm.afterClosed().subscribe(result => {
    if(result){
      this.uploadDocument(id);
    }
    console.log('The dialog was closed');
  });
}

openDialogForDownloadError(id): void {
  const dialogRef = this.dialog.open(DownloadReportFile, {disableClose: true,
    panelClass: 'creditDialog',
    data: {conModuleId:this.cmdModuleEntitiId,msaId:id},
    width: '40%',
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');    
  });
}
}


export interface MsaElement {
  custName: string
  opprId: string
  pan: string
  gstinNum: string
  sfdcAccId:string
  sfdcAccType:string
  msaCustAddrs: any
  actions1:string
  actions2:string
}


//  ***********
// Download Uploaded bulk files
// *************
@Component({
  selector: 'downloadErrorFile',
  templateUrl: '../downloadErrorFile.html',
  styleUrls: ['../../core.css']
})
export class DownloadReportFile implements OnInit{


  constructor(
    public dialogRef: MatDialogRef<DownloadReportFile>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _contractService: ContractService,
    private tosterservice: ToastrService) {}

    ngOnInit(){
      console.log(this.data.conModuleId,"ModuleEntity Id");
      this.getErrorFiles(this.data.conModuleId,this.data.msaId);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }


  closeDialog(): void {
    // this.dialogRef.close();
    
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

/*
* #BulkUpload
* to get the list of error files
*/
docList = []
getErrorFiles(moduleEntityId,id)
{
  console.log("inside getErrorFiles");
  var requesData= {
    "msaCustId": id,
    "moduleEntityIds": [
      moduleEntityId
    ]
  };
                    
  console.log("request JSON for get ErrorFiles: " + JSON.stringify(requesData));
  this._contractService.postSearchDocuments(requesData)
    .subscribe(data => {
      let ob = ErrorConstants.validateException(data);
      if (ob.isSuccess) {
        var docData: any = {}
        docData = data;
        this.docList = docData.data.responseData;
        if(this.docList.length==0)
          {
            this.tosterservice.info('No Bulk Commandment Report Found !!');
            this.dialogRef.close();
          }
      } else {
        this.tosterservice.error(ob.message);
      }
    },

  error => {
    console.log(error)
    this.tosterservice.error("Something went wrong");
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
//Download Component Ends

export interface DialogData {conModuleId: any,
  editflow: false;
  AddressType:any;
  msaDataList:any;
  msaId:any
  
 }
