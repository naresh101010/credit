import { Component, OnInit, ViewChild } from "@angular/core";
import { AppSetting } from "./../app.setting";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Params } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from "@angular/common";
import { DocUploadService } from "./docUpload.service";

@Component({
  selector: "app-documentupload",
  templateUrl: "./document-upload.component.html",
  styleUrls: ["../../core.css", './document-upload.component.css'],
})
export class DocumentuploadComponent implements OnInit {
  editflow = false;
  isDisable: boolean;
  allDocs;
  docData: any = {};
  subDocData: any = {};
  docTypeList = []; //for docuementType dropdown
  docList = []; // for available uploaded/searched documents
  docTypeId = ""; //input for service, need to update as per service
  subTypeId = ""; //sub document type id, required for post document data
  moduleEntityList = [];
  subTypeNameList = [];
  moduleEntityId = "";
  sfdcAccId = AppSetting.sfdcAccId;
  custName = AppSetting.customerName;
  msaCustId: number = AppSetting.msaCustId;
  cntrCode = AppSetting.contractId;
  sfxCode = AppSetting.sfxCode;
  contractId = null;
  docExpiryDate = "";
  fileToUpload: File = null;
  uploadedFileName = "";
  fileBrowseflag: boolean = false;
  associ_id;
  minDate;
  maxDate;
  isValidDocExpiryDate: boolean = false;
  opportunity: any = {};
  filterDocs;
  noRecdFundMsg: boolean = false;
  pendingDocsUplod = [];

  constructor(
    private DocUploadservice: DocUploadService,
    private toaster: ToastrService,
    private acrouter: ActivatedRoute,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService,
    private ar: ActivatedRoute
  ) {}

  @ViewChild("docform") docformupload: any;
  ngOnInit() {
    this.ar.params.subscribe((params: Params) => {
      console.log(params);
      this.associ_id = params["id"];
    });
    this.getDocumentDetailbyId();
    this.runGenerateOtp();
  }

  //On file browse
  handleFileInput(event) {
    let fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      this.fileToUpload = fileList[0];
      this.fileToUpload = fileList[0];
      let fileSizeTemp = this.fileToUpload.size / 1024 / 1024;
      if (fileSizeTemp > 1) {
        this.uploadedFileName = this.fileToUpload.name;
        this.fileBrowseflag = false;
        this.toaster.error("File size should be less then 1 MB");
        return;
      }
      if (
        this.fileToUpload.name &&
        !this.validateFileLength(this.fileToUpload.name)
      ) {
        this.uploadedFileName = this.fileToUpload.name;
        this.fileBrowseflag = false;
        this.toaster.error("File Name should not be greater than 50");
        return;
      }
      if (
        this.fileToUpload.name &&
        this.validateFileExt(this.fileToUpload.name)
      ) {
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

  /*
   *This function will be called On click of upload button to upload document details
   */
  clearDate() {
    this.docExpiryDate = "";
  }

  postDocumentUploadDetail() {
    this.spinner.show();
    var entityName = "";

    if (
      this.validateUploadFile(
        this.docTypeId,
        this.subTypeId,
        this.docExpiryDate
        // this.moduleEntityId
      )
    ) {
      /*
       * Required Date format: yyyy-MM-dd
       * User input date formate: mm/dd/yyyy
       */
      var formattedDate = "";
      if (
        this.docExpiryDate != null &&
        this.docExpiryDate != "" &&
        this.docExpiryDate != "undefined"
      ) {
        var userDate = Date.parse(this.docExpiryDate);
        let dateinMilli = new Date(userDate);
        let month = Number(dateinMilli.getMonth()) + 1;
        formattedDate =
          dateinMilli.getFullYear() + "-" + month + "-" + dateinMilli.getDate();
      }
      console.log(
        "user date" + this.docExpiryDate + " formatted Date " + formattedDate
      );

      //this.msaCustId='3'; //for testing only
      let entityId = this.associ_id;

      this.DocUploadservice.postDocumentUploadDetail(
        entityId,
        this.docTypeId,
        this.subTypeId,
        formattedDate,
        this.fileToUpload
      ).subscribe(
        (data) => {
          // alert( "documentUploadDetails");
          this.toaster.success("Saved Successfully");

          //Refesh Page data
          this.docTypeId = "";
          this.subTypeId = "";
          this.moduleEntityId = "";
          this.docExpiryDate = "";
          this.uploadedFileName = "";
          this.docformupload.resetForm();
          this.getDocumentDetailbyId();
        },
        (error) => {
          // this.toaster.error(ErrorConstants.errorNotFound);
          console.log(error);
          this.spinner.hide();
        }
      );
    } else {
      this.spinner.hide();
    }
  }

  /*
   * To get the list of documents on load and on click of search button
   */
  getDocumentDetailbyId() {
    console.log("inside getDocumentDetailbyId");
    this.spinner.show();
    var requesData = {
      docSubtype: this.subTypeId,
      docType: this.docTypeId,
      moduleEntityIds: [],
      msaCustId: this.msaCustId,
    };
    if (this.moduleEntityId) {
      requesData.moduleEntityIds.push(this.moduleEntityId);
    }

    console.log("request json for Search/Get " + JSON.stringify(requesData));
    this.DocUploadservice.postSearchDocuments(
      requesData,
      this.associ_id
    ).subscribe(
      (data: any) => {
        this.docData = data;
        console.log("naresh", data);
        this.spinner.hide();
        this.allDocs = data.data.responseData;
        console.log(data, "naresh singh");

        this.docTypeList = this.docData.data.referenceData.docTypeList;
        this.moduleEntityList = this.docData.data.referenceData.moduleEntityList;
        this.subTypeNameList = this.docData.data.referenceData.docSubTypeList;
        this.pendingDocsUplod = this.docData.data.referenceData.pendingDocumentList;
        /**
         * To get the docType name and SubDocType name from ref list
         * against received codes in document list
         */

        this.docList = [];
        for (let obj of this.docData.data.responseData) {
          var docObj = {
            docRef: "",
            docType: "",
            docSubtype: "",
            expDt: "",
            docPathRef: "",
            docTypeid: "",
            subDocTypeid: "",
          };
          //set all values in doc object
          docObj.docRef = obj.docRef;
          docObj.expDt = obj.expDt;
          docObj.docPathRef = obj.docPathRef;
          for (let docTypeObj of this.docTypeList) {
            if (obj.lkpDocTypeId == docTypeObj.id) {
              docObj.docType = docTypeObj.lookupVal;
              docObj.docTypeid = docTypeObj.id;
            }
          }
          for (let subTypeObj of this.subTypeNameList) {
            if (obj.lkpDocSubtypeId == subTypeObj.id) {
              docObj.docSubtype = subTypeObj.lookupVal;
              docObj.subDocTypeid = subTypeObj.id;
            }
          }
          this.docList.push(docObj);
        }
        //
      },

      (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  subTypeList; //for subDocumentType dropdown
  /*
   *To get the list of sub documents type on change of document type dropdown
   */
  subDocTypeData() {
    this.getDocumentDetailbyId();
    console.log(this.docTypeId, this.subTypeId, "selected doc type id");
    if (
      this.docTypeId == "undefined" ||
      this.docTypeId == null ||
      this.docTypeId == ""
    ) {
      //do not hit the service and set the subtype list as empty
      this.subTypeList = [];
      this.subTypeId = "";
    } else {
      this.DocUploadservice.getSubDocTypeData(this.docTypeId).subscribe(
        (data) => {
          var resData: any = data;
          this.subTypeList = resData.data.responseData;
          console.log(data, "sub Document list");
        },
        (error) => {
          console.log(error, "Inside Error");
        }
      );
    }
  }

  /*
   * This will be called on click of download icon to download the document
   */
  downloadDocument(fileName) {
    console.log(fileName);
    var fName = fileName.substr(fileName.lastIndexOf("/") + 1, fileName.length);
    console.log(fName, "name of file");
    // fName="ss.png";

    this.DocUploadservice.postDownloadDocument(fileName).subscribe(
      (data) => {
        console.log("inside downloadDocument response");
        console.log(data, "download file");
        //var resData=data;
        //console.log(resData.originalFilename,"File Name");
        var a = document.createElement("a");
        //var json = JSON.stringify(data),
        var blob = new Blob([data], { type: "octet/stream" });
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fName;
        a.click();
        window.URL.revokeObjectURL(url);

        this.toaster.success("Saved Successfully");
      },
      (error) => {
        console.log(error, "Error in download");
      }
    );
  }

  searchDoc() {
    this.docList = this.docList.filter((v) => {
      return this.docTypeId == v.docTypeid && this.subTypeId == v.subDocTypeid;
    });

    if (this.docList.length == 0) {
      this.noRecdFundMsg = true;
    }
    setTimeout(() => {
      this.noRecdFundMsg = false;
    }, 2000);
    console.log(this.docTypeId);
    console.log(this.subTypeId);
  }
  /**diseable all date before current date in angular*/
  todaydate: Date = new Date();
  /**toggle button action */
  isToggle = false;
  swapOffToggleButton() {
    this.uploadedFileName = "";
    // this.docformupload.resetForm();
    if (!this.isToggle) {
      console.log("on");
      this.isToggle = true;
    } else {
      console.log("off");
      this.isToggle = false;
    }
  }

  /**
   * validation before uploadFile
   */
  validateUploadFile(userDocTypeId, userSubTypeId, userDocExpiryDate) {
    let errorMsg = "";
    if (userDocTypeId == "") {
      errorMsg += "Please select document type!";
    } else if (userSubTypeId == "") {
      errorMsg += "Please select sub type!";
    } else if (userDocExpiryDate == "") {
      errorMsg += "Please select expiry date!";
    } else if (!this.validateFileSize()) {
      errorMsg += "File size should be less than 1 MB";
    }
    if (errorMsg.length > 0) {
      this.toaster.error(errorMsg);
      //alert(errorMsg);
      return false;
    }
    return true;
  }

  validateFileSize() {
    let fileSizeTemp = this.fileToUpload.size / 1024 / 1024;
    if (fileSizeTemp > 1) {
      return false;
    } else {
      return true;
    }
  }

  validFileExtensions = [".jpg", ".jpeg", ".png", ".doc", ".pdf", ".docx"];
  validFormatsMgs: string =
    "Allowed file formats are " + this.validFileExtensions.join(", ");
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
    } else {
      return true;
    }
  }

  docExpiryDt() {
    let docYear = parseInt(this.datePipe.transform(this.docExpiryDate, "yyyy"));
    if (docYear > 9999) {
      this.docExpiryDate = "";
    }
  }




  // otp validation
  otpStatus = true;
  otpScreen:boolean = true;
  otp;
  wrongOtpMsg = false;
  runGenerateOtp(){
    this.validatBtnFlg = true;
    this.enteredOtp = '';
    this.DocUploadservice.generateOtp(this.associ_id).subscribe(data=>{
      this.otpStatus = true;
      this.otp = data.data
      console.log('initaila state', this.otp)
    },
    err=>{
      this.otpStatus = false;
    }
    );
  }

  validatBtnFlg = true;
  runValidateOtp(){
    // alert('start')
    this.DocUploadservice.validateOtp(this.otp).subscribe(
      data=>{
        // otp valiation success
          this.otpScreen = false;
         // alert('2')
      },  
        
    err=>{
      //alert('1')
      this.wrongOtpMsg = true;
    }
    )}

  enteredOtp = '';
  enterOtp(){
    if(this.enteredOtp.length==6){
      // console.log(this.otp)
      this.validatBtnFlg = false;
      delete this.otp.expiresAt;
      this.otp.code = this.enteredOtp;
      this.otp.channelId = 33;
      
    } else{
      this.validatBtnFlg = true;
      this.wrongOtpMsg = false;
    }   
  }
  


}
