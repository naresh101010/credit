import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AppSetting } from 'src/app/app.setting';
import { ApiService } from 'src/app/core/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { DatePipe } from '@angular/common';
import { ErrorConstants } from 'src/app/core/models/constants';
import { MatTableDataSource } from '@angular/material';
import { MatSort, MatPaginator } from '@angular/material';
import { DatePipe } from '@angular/common';
import { AuthorizationService } from '../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';


@Component({
  selector: 'app-booking-document',
  templateUrl: './booking-document.component.html',
  styleUrls: ['./booking-document.component.css'],
  providers : [DatePipe]
})
export class BookingDocumentComponent implements OnInit {
  @ViewChild("docform", null) docformupload: any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  editflow = false;
  isDisable: boolean;
  associateId: number;
  contractId: number;
  contractData : any;
  displayedColumns: string[] = ['Kname', 'KdocumentType','subType','expiry','view'];
  displayedColumnsForPending : string[] = ['name','docType'];
  pendingDocsUplod : any = [];
  noRecdFundMsg: boolean;
  pengingListDataSource : any;
  minDate : Date;
  perList: any = [];


  constructor(private apiSer: ApiService, private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private acrouter: ActivatedRoute,
    private datePipe: DatePipe,
    private authorizationService : AuthorizationService,
    private permissionsService: NgxPermissionsService) { }


  ngOnInit() {
    this.authorizationService.setPermissions('CONTRACT');
    this.perList = this.authorizationService.getPermissions('CONTRACT') == null ? [] : this.authorizationService.getPermissions('CONTRACT');
    this.permissionsService.loadPermissions(this.perList);
    console.log('perlist',this.perList)

    this.associateId = AppSetting.associateId;
    this.contractId = AppSetting.contractId;
    this.contractData = AppSetting.associateObject;

    let e = new Date();
    e.setDate(e.getDate() + 1);
    this.minDate = e;

    this.isDisable = false;
    this.acrouter.params.subscribe(params => {
      if (params['editflow']) {
        this.editflow = params['editflow'];
        this.isDisable = true;
      }
    });

    this.getDocumentDetailbyId();
  }

  sfdcAccId = AppSetting.sfdcAccId;
  custName = AppSetting.customerName;

  cntrCode = AppSetting.contractId;
  sfxCode = AppSetting.sfxCode;

  entityType = AppSetting.entitytype;


  fileToUpload: File = null;
  uploadedFileName: string = '';
  fileBrowseflag: boolean = false;
  //On file browse
  handleFileInput(event) {
    let fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      this.fileToUpload = fileList[0];
      this.fileToUpload = fileList[0];
      let fileSizeTemp = this.fileToUpload.size / 1024 / 1024;
      if (fileSizeTemp > 5) {
        this.uploadedFileName = this.fileToUpload.name;
        this.fileBrowseflag = false;
        this.toaster.error("File size should be less then 5 MB");
        return
      }
      if (this.fileToUpload.name && !this.validateFileLength(this.fileToUpload.name)) {
        this.uploadedFileName = this.fileToUpload.name;
        this.fileBrowseflag = false;
        this.toaster.error("File Name should not be greater than 50");
        return;
      }
      if (this.fileToUpload.name && this.validateFileExt(this.fileToUpload.name)) {
        this.uploadedFileName = this.fileToUpload.name;
        this.fileBrowseflag = true;
      } else {
        this.fileBrowseflag = false;
        this.uploadedFileName = this.fileToUpload.name;
        this.toaster.error("Invalid file type");
      }
    }

  }
  clearDate() {
    this.docExpiryDate = '';
  }

  docExpiryDate = '';
  postDocumentUploadDetail() {
    this.spinner.show();
    if (this.validateUploadFile(this.docTypeId, this.subTypeId, this.docExpiryDate, this.uploadedFileName)) {
      /*
      * Required Date format: yyyy-MM-dd
      * User input date formate: mm/dd/yyyy
      */
      var formattedDate = '';
      if (this.docExpiryDate != null && this.docExpiryDate != '' && this.docExpiryDate != 'undefined') {
         formattedDate = this.datePipe.transform(this.docExpiryDate, 'yyyy-MM-dd');
      }

      let requestData: any;

      requestData = {
        contractCode : this.contractId,
        entityId : this.associateId,
        expDt : formattedDate,
        lkpDocTypeId : this.docTypeId,
        lkpDocSubtypeId : this.subTypeId
      }

      this.apiSer.postDocumentUploadForContract(requestData, this.fileToUpload).subscribe(data => {
          this.toaster.success("Saved Successfully");

          //Refesh Page data
          this.docTypeId = '';
          this.subTypeId = '';
          this.docExpiryDate = '';
          this.uploadedFileName = '';
          this.docformupload.resetForm();
          this.getDocumentDetailbyId();
          this.spinner.hide();
        }, (error) => {
          this.toaster.error(error.error.errors.error[0].description);
          this.spinner.hide();
        });
    } else {
      this.spinner.hide();
    }

  }


  subTypeId = ''; //sub document type id, required for post document data
  docTypeId = ''; //input for service, need to update as per service
  // moduleEntityId='';
  docData: any = {}
  subDocData: any = {}
  docTypeList = [] //for docuementType dropdown
  moduleEntityList = []
  subTypeNameList = []
  docList = [] // for available uploaded/searched documents

  // entityType = 'ASSOCIATE';
  dataSource: any;
  getDocumentDetailbyId() {
    this.spinner.show();
    this.apiSer.get(`secure/v1/document/contract/${this.associateId}/${this.contractId}`).subscribe(data => {
        this.docData = data;
      
        this.docTypeList = this.docData.data.referenceData.docTypeList;
        this.subTypeNameList = this.docData.data.referenceData.docSubTypeList;
        this.pendingDocsUplod = this.docData.data.referenceData.pendingDocumentList;   
        this.pengingListDataSource = new MatTableDataSource(this.pendingDocsUplod);
        this.spinner.hide();

        /**
         * To get the docType name and SubDocType name from ref list 
         * against received codes in document list
         */
        this.docList = [];
        for (let obj of this.docData.data.responseData) {
          var docObj = {
            "docRef": "",
            "docType": "",
            "docSubtype": "",
            "expDt": "",
            "docPathRef": "",
          };
          //set all values in doc object
          docObj.docRef = obj.docRef;
          docObj.expDt = obj.expDt;
          docObj.docPathRef = obj.docPathRef;
          for (let docTypeObj of this.docTypeList) {
            if (obj.lkpDocTypeId == docTypeObj.id) {
              docObj.docType = docTypeObj.lookupVal;
            }
          }
          for (let subTypeObj of this.subTypeNameList) {
            if (obj.lkpDocSubtypeId == subTypeObj.id) {
              docObj.docSubtype = subTypeObj.lookupVal;
            }
          }
          this.docList.push(docObj)
          this.dataSource = new MatTableDataSource(this.docList);
          this.dataSource.sort = this.sort
        }
        //
      },(error) => {
        this.toaster.error(ErrorConstants.getValue(404));
        this.spinner.hide();
          
        });
  }

  // To get the list of sub documents type on change of document type dropdown
  subTypeList //for subDocumentType dropdown
  subDocTypeData() {
    if (this.docTypeId == 'undefined' || this.docTypeId == null || this.docTypeId == '') {
      //do not hit the service and set the subtype list as empty
      this.subTypeList = [];
      this.subTypeId = '';
    } else {
      this.apiSer.getSubDocTypeData(this.docTypeId)
        .subscribe(data => {
          this.spinner.hide();
          var resData: any = data;
          this.subTypeList = resData.data.responseData;
        },
        error => {
          this.spinner.hide();
          this.toaster.error(ErrorConstants.getValue(404))
        });
    }
  }

  /*
  * This will be called on click of download icon to download the document
  */
  downloadDocument(fileName) {
    this.spinner.show();
    var fName = fileName.substr(fileName.lastIndexOf('/') + 1, fileName.length);
    console.log(fName, 'name of file');

    this.apiSer.postDownloadDocument(fileName)
      .subscribe(data => {
        var a = document.createElement("a");
        var blob = new Blob([data], { type: "octet/stream" });
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fName;
        a.click();
        window.URL.revokeObjectURL(url);
        this.spinner.hide();
        this.toaster.success("Download Successfully");
      },
      error => {
        this.spinner.hide();
        this.toaster.error(ErrorConstants.getValue(404));
      });
  }

  /**diseable all date before current date in angular*/
  todaydate: Date = new Date();
  /**toggle button action */
  isToggle = false;
  swapOffToggleButton() {
    this.uploadedFileName = '';
    // this.docformupload.resetForm();
    if (!this.isToggle) {
      console.log("on");
      this.isToggle = true;
    } else {
      console.log("off");
      this.isToggle = false;
    }
  }


  validateUploadFile(userDocTypeId, userSubTypeId, userDocExpiryDate, fileName) {
    let errorMsg = "";
    if (userDocTypeId == "") {
      errorMsg += "Please select document type!";
    } else if (userSubTypeId == "") {
      errorMsg += "Please select sub type!"
    } else if (userDocExpiryDate == "") {
      errorMsg += "Please select expiry date!"
    } else if (!this.validateFileLength(fileName)) {
      errorMsg += "File Name should not be greater than 50";
    } else if (!this.validateFileExt(fileName)) {
      errorMsg += "Invalid file type";
    } else if (!this.validateFileSize()) {
      errorMsg += 'File size should be less than 5 MB';
    }
    if (errorMsg.length > 0) {
      this.toaster.error(errorMsg);
      //alert(errorMsg);
      return false
    }
    return true;
  }

  validateFileSize() {
    let fileSizeTemp = this.fileToUpload.size / 1024 / 1024;
    if (fileSizeTemp > 5) {
      return false;
    } else {
      return true;
    }
  }

  validFileExtensions = [".jpg", ".jpeg", ".png", ".doc", ".pdf", ".docx"];
  validFormatsMgs: string = 'Allowed file formats are ' + this.validFileExtensions.join(', ');
  // fileName
  validateFileExt(fileName) {
    if (fileName && fileName.length < 51) {
      var blnValid = false;
      var ext = fileName.substr(fileName.lastIndexOf("."), fileName.length);
      console.log(ext, "file extension");
      for (var j = 0; j < this.validFileExtensions.length; j++) {
        var valExtension = this.validFileExtensions[j];
        if (ext.toLowerCase() == valExtension.toLowerCase()) {
          blnValid = true;
          break;
        }
      }
      return blnValid;

    }
  }

  validateFileLength(fileName) {
    if (fileName && fileName.length > 51) {
      return false;
    } else { return true }
  }

  navigateToPreview($event) {
    $event.preventDefault();
    if (this.editflow) {
      this.router.navigate(['/contract/preview', { steper: true, 'editflow': 'true' }], { skipLocationChange: true });
    } else {
      this.router.navigate(['/contract/preview'], { skipLocationChange: true });
    }
  }

  @HostListener('document:keydown', ['$event'])

  handleKeyboardEvent(event: KeyboardEvent) {

    if (event.altKey && (event.keyCode === 80)) { // alt+p [Preview]
      event.preventDefault();
      if (document.getElementById('previewButton')) {
        let element: HTMLElement = document.getElementById('previewButton') as HTMLElement;
        element.click();
      }
    }

  }

  maxDate;
  isValidDocExpiryDate: boolean = false;
  opportunity: any = {};


  /*------------- Open Preview Page ----------- */
  openPreviewPage() {
    this.spinner.show();
    this.apiSer.get('secure/v1/bookingcontract/validContract/' + AppSetting.contractId).subscribe(response => {
     // this.spinner.hide();
      if (this.editflow) {
        this.router.navigate(['/asso_booking-contract/preview', {steper:true, editflow : this.editflow}], {skipLocationChange: true});
      } else {
        this.router.navigate(['/asso_booking-contract/preview'], {skipLocationChange: true});
      }
    }, error => {
      this.toaster.error(error.error.errors.error[0].description);
      this.spinner.hide();
    });
  }

  nextReadMode() {
    if (this.editflow) {
      this.router.navigate(['/asso_booking-contract/preview', {steper:true, editflow : this.editflow}], {skipLocationChange: true});
    } else {
      this.router.navigate(['/asso_booking-contract/preview'], {skipLocationChange: true});
    }
  }

  expDate(element) {
    let expYear = parseInt(this.datePipe.transform(element.target.value, 'yyyy'))
    if (expYear > 9999) {
      this.docExpiryDate = "";
    }
  }


}


