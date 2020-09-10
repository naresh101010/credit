import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AppSetting } from '../../app.setting';
import { ApiService } from '../../core/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ErrorConstants } from '../../core/models/constants';
import { DatePipe } from '@angular/common';
import { AuthorizationService } from '../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-associate-kyc',
  templateUrl: './associate-kyc.component.html',
  styleUrls: ['./associate-kyc.component.css'],
  providers : [DatePipe]
})
export class AssociateKycComponent implements OnInit {
  @ViewChild("docform", null) docformupload: any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  editflow = false;
  isDisable: boolean;
  associateData: any;
  deptName: any;
  sfdcAccId = AppSetting.sfdcAccId;
  custName = AppSetting.customerName;
  msaCustId: number = AppSetting.contractId;
  cntrCode = AppSetting.contractId;
  sfxCode = AppSetting.sfxCode;
  associateId = AppSetting.associateId
  entityType = AppSetting.entitytype;
  contractId = null;
  docExpiryDate = '';
  displayedColumns: string[] = ['Kname', 'KdocumentType','subType','expiry','view'];
  displayedColumnsForPending : string[] = ['name','docType'];
  fileModel : any = {};
  isValidDocExpiryDate: boolean = false;
  isToggle = false;
  pendingDocsUplod : any = [];
  noRecdFundMsg: boolean;
  pengingListDataSource : any;
  minDate : Date;
  assocType: String;
  fileToUpload: File = null;
  uploadedFileName: string = '';
  fileBrowseflag: boolean = false;
  perList: any = [];

  constructor(private apiSer: ApiService,
    private spinner: NgxSpinnerService,
    private httpservice: HttpClient,
    private toaster: ToastrService,
    private router: Router,
    private acrouter: ActivatedRoute,
    private datePipe : DatePipe,
    private authorizationService : AuthorizationService,
    private permissionsService: NgxPermissionsService) { }

  ngOnInit() {
 
    this.authorizationService.setPermissions('DOCUMENT UPLOAD');
    this.perList = this.authorizationService.getPermissions('DOCUMENT UPLOAD') == null ? [] : this.authorizationService.getPermissions('DOCUMENT UPLOAD');
    this.permissionsService.loadPermissions(this.perList);
    console.log('perlist',this.perList);

    this.isDisable = false;
    let e = new Date();
    e.setDate(e.getDate() + 1);
    this.minDate = e;

    this.associateData = AppSetting.associateData;
    if(this.associateData.assocTypeMaps[0].lkpAssocTypeId == 1934){
      this.assocType = " MARKET"
    }
    else{
      this.assocType = " REGISTERED"
    }
    this.deptName = AppSetting.associateDepartment;
    this.acrouter.params.subscribe(params => {
      if (params['editflow']) {
        this.editflow = params['editflow'];
        this.isDisable = true;
      }
    });

    this.apiSer.get("secure/v1/associates/" + AppSetting.associateId)
    .subscribe((suc) => {
      const data = suc.data.responseData;
      AppSetting.associateData = data;
    });
    this.spinner.show();
    this.getDocumentDetailbyId();
  }

  requestToUpload(){
    console.log(this.associateId)
    this.spinner.show();
    this.apiSer.post("secure/v1/associates/docUpload/email" , AppSetting.associateId)
    .subscribe(
      data => {
        console.log(data);
        if (data.status == 'SUCCESS') { 
          this.spinner.hide();
          this.toaster.success("Email sent to " + data.data.responseData + " Successfully");
        }
        else{
          console.log(data)
        }
      },
      Error => {
        this.toaster.warning(Error.error.errors.error[0].description);
        this.spinner.hide();
      });
  }

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
      console.log("Uploaded File " + this.uploadedFileName);
    }

  }
  clearDate() {
    this.fileModel.docExpiryDate = '';
  }

  postDocumentUploadDetail() {
    this.spinner.show();
    if (this.validateUploadFile(this.fileModel.docTypeId, this.fileModel.subTypeId, this.fileModel.docExpiryDate, this.uploadedFileName)) {
      /*
      * Required Date format: yyyy-MM-dd
      * User input date formate: mm/dd/yyyy
      */
      var formattedDate = this.datePipe.transform(this.fileModel.docExpiryDate, 'yyyy-MM-dd');;

      let requestData: any;

      requestData = {
        entityId: this.associateId,
        entityType : 'ASSOCIATE',
        expDt : formattedDate,
        lkpDocTypeId : this.fileModel.docTypeId,
        lkpDocSubtypeId : this.fileModel.subTypeId
    }

      this.apiSer.postDocumentUploadDetail(requestData, this.fileToUpload)
        .subscribe(data => {
          this.toaster.success("Saved Successfully");

          //Refesh Page data
          this.fileModel = {};
          this.uploadedFileName = '';
          this.docformupload.resetForm();
          this.getDocumentDetailbyId();
        }, error => {
          this.toaster.error(ErrorConstants.errorNotFound);
          console.log(error);
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
  
    this.apiSer.documentTypeData(this.entityType, this.associateId)
      .subscribe(data => {
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
      },(error) => {
          this.spinner.hide();
          this.toaster.error(ErrorConstants.getValue(404));
        });
  }

  // To get the list of sub documents type on change of document type dropdown
  subTypeList //for subDocumentType dropdown
  subDocTypeData() {
    console.log(this.fileModel.docTypeId, "selected doc type id");

    if (this.fileModel.docTypeId == 'undefined' || this.fileModel.docTypeId == null || this.fileModel.docTypeId == '') {
      //do not hit the service and set the subtype list as empty
      this.subTypeList = [];
      this.fileModel.subTypeId = '';
    } else {
      this.spinner.show()
      this.apiSer.getSubDocTypeData(this.fileModel.docTypeId).subscribe(data => {
          var resData: any = data;
          this.subTypeList = resData.data.responseData;
          this.spinner.hide();
          console.log(data, "sub Document list");
        },(error) => {
          this.spinner.hide();
          this.toaster.error(ErrorConstants.getValue(404));
      })

    }
  }

  /*
  * This will be called on click of download icon to download the document
  */
  downloadDocument(fileName) {
    this.spinner.show();
    console.log(fileName);
    var fName = fileName.substr(fileName.lastIndexOf('/') + 1, fileName.length);
    console.log(fName, 'name of file');
    // fName="ss.png";

    this.apiSer.postDownloadDocument(fileName).subscribe(data => {
        var a = document.createElement("a");
        var blob = new Blob([data], { type: "octet/stream" });
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fName;
        a.click();
        window.URL.revokeObjectURL(url);
        this.spinner.hide();
        this.toaster.success("Download Successfully");
       
      }, (error) => {
        this.spinner.hide();
      console.log(error, "Error in download")
    });
  }

  /**diseable all date before current date in angular*/
  todaydate: Date = new Date();
  /**toggle button action */
  swapOffToggleButton() {
    this.uploadedFileName = '';
    this.noRecdFundMsg;
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
  validFormatsMgs: String = 'Allowed file formats are ' + this.validFileExtensions.join(', ');
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

  /*---- search Document ------- */

  searchDoc() {
    this.docList = this.docList.filter((v) => {
      return this.fileModel.docTypeId == v.docTypeid && this.fileModel.subTypeId == v.subDocTypeid;
    });
    console.log('doc list',this.docList);
    console.log('docType', this.fileModel.docTypeId + 'SubType', this.fileModel.subTypeId)
    if (this.docList.length == 0) {
      this.noRecdFundMsg = true;
    }
    setTimeout(() => {
      this.noRecdFundMsg = false;
    }, 2000);
  }
/*---------- check valid date ---------- */
checkValidDate(value) {
  let expYear = parseInt(this.datePipe.transform(value, 'yyyy'));
  if (expYear > 9999) {
    this.fileModel.docExpiryDate = '';
  }
}

}
