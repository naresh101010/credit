import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ContractService } from '../contract.service';
import { AppSetting } from 'src/app/app.setting';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from '@angular/common';
import { AuthorizationService } from '../services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { ErrorConstants } from '../models/constants';

@Component({
  selector: 'app-documentupload',
  templateUrl: './documentupload.component.html',
  styleUrls: ["../core.css"]
})
export class DocumentuploadComponent implements OnInit {

  constructor(
    private contractservice: ContractService,
     private httpservice : HttpClient,
     private toaster : ToastrService,
     private router: Router,
     private acrouter: ActivatedRoute,
     private datePipe: DatePipe,
     private spinner: NgxSpinnerService,
     private permissionsService: NgxPermissionsService,
     private authorizationService: AuthorizationService) { }

     editflow = false;
     isDisable:boolean;

     @ViewChild("docform", null) docformupload: any;

     ngOnInit() {
      this.authorizationService.setPermissions('DOC UPLOAD');
      this.permissionsService.loadPermissions(this.authorizationService.getPermissions('DOC UPLOAD'));
       this.isDisable = false;
       this.acrouter.params.subscribe(params => {
         if (params['editflow']) { 
           this.editflow = params['editflow'];
           this.isDisable = true;
         }
       });

    this.getDocumentDetailbyId();
    this.getOpportunityDetails();
  }

  sfdcAccId = AppSetting.sfdcAccId;
  custName = AppSetting.customerName;
  msaCustId: number = AppSetting.msaCustId;
  cntrCode = AppSetting.contractId;
  sfxCode = AppSetting.sfxCode;

  fileToUpload: File = null;
  uploadedFileName: string ='';
  fileBrowseflag: boolean=false;
  //On file browse
  handleFileInput(event){
   let fileList: FileList = event.target.files;

    if(fileList.length > 0) {
        this.fileToUpload = fileList[0];
        this.fileToUpload = fileList[0];
      let fileSizeTemp = this.fileToUpload.size/ 1024 / 1024;
      if (fileSizeTemp > 5) {
        this.uploadedFileName = this.fileToUpload.name;
        this.fileBrowseflag = false;
        this.toaster.error("File size should be less then 5 MB");
        return
      }
        if(this.fileToUpload.name && !this.validateFileLength(this.fileToUpload.name)){
          this.uploadedFileName = this.fileToUpload.name;
          this.fileBrowseflag=false;
          this.toaster.error("File Name should not be greater than 50");
          return;
        }
        if(this.fileToUpload.name && this.validateFileExt(this.fileToUpload.name)){
          this.uploadedFileName = this.fileToUpload.name;
          this.fileBrowseflag=true;
        }else{
          this.fileBrowseflag=false;
          this.uploadedFileName = this.fileToUpload.name;
          this.toaster.error("Invalid file type");
        }
        console.log("Uploaded File "+this.uploadedFileName);
    }
    
  }

  /*
  *This function will be called On click of upload button to upload document details
  */
 clearDate() {
  this.docExpiryDate ='';
  };

  
  contractId=null;
  docExpiryDate =''; 
  postDocumentUploadDetail() {
    this.spinner.show();
    var entityName='';
    for(let entity of this.moduleEntityList){
      if(entity.id == this.moduleEntityId){
         entityName = entity.lookupVal;
      }
    }
    if(entityName == 'SFX'){
      this.contractId=this.cntrCode;
    }else{
     this.contractId=null;
    }



    if( this.validateUploadFile(this.docTypeId,this.subTypeId,this.docExpiryDate,
      this.moduleEntityId,this.uploadedFileName)){
    /*
    * Required Date format: yyyy-MM-dd
    * User input date formate: mm/dd/yyyy
    */
   var formattedDate='';
   if(this.docExpiryDate !=null && this.docExpiryDate !='' && this.docExpiryDate != 'undefined'){
     var userDate=Date.parse(this.docExpiryDate);
     let dateinMilli = new Date(userDate);
     let month = Number(dateinMilli.getMonth())+1;
     formattedDate = dateinMilli.getFullYear()+'-'+month+'-'+dateinMilli.getDate();
    }

    console.log("user date"+this.docExpiryDate+" formatted Date "+formattedDate);
  
    //this.msaCustId='3'; //for testing only
    var requestData: string= '{';
    requestData+='"msaCustId":';
    requestData+='"'+this.msaCustId+'",';
    requestData+='"lkpDocTypeId":';
    requestData+='"'+this.docTypeId+'",';
    requestData+='"lkpDocSubtypeId":';
    requestData+='"'+this.subTypeId+'",';
    requestData+='"expDt":';
    requestData+='"'+formattedDate+'",';
    requestData+='"lkpModuleEntityId":';
    requestData+='"'+this.moduleEntityId+'",';
    requestData+='"cntrCode":';
    requestData+='"'+this.contractId+'"';
    requestData+='}';

    if(this.contractId==null){
      requestData="";
      requestData='{';
      requestData+='"msaCustId":';
      requestData+='"'+this.msaCustId+'",';
      requestData+='"lkpDocTypeId":';
      requestData+='"'+this.docTypeId+'",';
      requestData+='"lkpDocSubtypeId":';
      requestData+='"'+this.subTypeId+'",';
      requestData+='"expDt":';
      requestData+='"'+formattedDate+'",';
      requestData+='"lkpModuleEntityId":';
      requestData+='"'+this.moduleEntityId+'"';
      requestData+='}';
    }
    
    
    console.log("testRequest : "+requestData);

   // console.log("request for UPLOAD "+JSON.stringify(requestData));
    //console.log("request for UPLOAD "+JSON.parse(requestData));
    this.contractservice.postDocumentUploadDetail(requestData,this.fileToUpload)
      .subscribe(data => {
        console.log(data, "documentUploadDetails");
        this.toaster.success("Saved Successfully");

        //Refesh Page data
        this.docTypeId=''; 
        this.subTypeId=''; 
        this.moduleEntityId='';
        this.docExpiryDate='';
        this.uploadedFileName='';
        this.docformupload.resetForm();
        this.getDocumentDetailbyId();
      }, error => {
        this.toaster.error(ErrorConstants.errorNotFound);
        console.log(error);
      this.spinner.hide();
    });
  }else{
    this.spinner.hide(); 
  }

  }

  docData: any = {}
  subDocData: any = {}
  docTypeList = [] //for docuementType dropdown
 
  docList = [] // for available uploaded/searched documents
  docTypeId=''; //input for service, need to update as per service
  subTypeId=''; //sub document type id, required for post document data
 // docExpiryDate=''; 
  moduleEntityList=[]
  subTypeNameList = []
  moduleEntityId='';

  /*
  * To get the list of documents on load and on click of search button
  */
  getDocumentDetailbyId(){
    console.log("inside getDocumentDetailbyId");
    this.spinner.show();
    var requesData= {
      "docSubtype": this.subTypeId,
      "docType": this.docTypeId,
      "moduleEntityIds": [],
      "msaCustId":this.msaCustId
    };
    if(this.moduleEntityId){
      requesData.moduleEntityIds.push(this.moduleEntityId);
    }
   
   
    console.log("request json for Search/Get "+JSON.stringify(requesData));
    this.contractservice.postSearchDocuments(requesData)
      .subscribe(data => {
        console.log("Inside search document success");
        this.docData=data;
        this.spinner.hide();
        console.log(data, "DocumentDetailbyId")

        this.docTypeList=this.docData.data.referenceData.docTypeList;
        this.moduleEntityList=this.docData.data.referenceData.moduleEntityList;
        this.subTypeNameList=this.docData.data.referenceData.docSubTypeList;

        /**
         * To get the docType name and SubDocType name from ref list 
         * against received codes in document list
         */ 
        this.docList = [];
        for (let obj of this.docData.data.responseData) {
          var docObj={
            "docRef":"",
            "docType": "",
            "docSubtype": "",
            "expDt": "",
            "docPathRef": "",
            'signedUrl': '',
            'msaCustId': ''
          };
          //set all values in doc object
          docObj.docRef=obj.docRef;
          docObj.expDt=obj.expDt;
          docObj.docPathRef=obj.docPathRef;
          for(let docTypeObj of this.docTypeList){
            if (obj.lkpDocTypeId == docTypeObj.id) {
              docObj.docType=docTypeObj.lookupVal;
            }
          }
          for(let subTypeObj of this.subTypeNameList){
            if (obj.lkpDocSubtypeId == subTypeObj.id) {
              docObj.docSubtype=subTypeObj.lookupVal;
            }
          }
          docObj.signedUrl = obj.signedUrl;
          docObj.msaCustId = obj.msaCustId;
          this.docList.push(docObj);
        }
        //

      },
    error => {
      this.spinner.hide();
      console.log(error)
    });
  }

  subTypeList //for subDocumentType dropdown
  /*
  *To get the list of sub documents type on change of document type dropdown
  */
  subDocTypeData(){
    console.log(this.docTypeId, "selected doc type id");
    
    if(this.docTypeId =='undefined' || this.docTypeId == null || this.docTypeId ==''){
      //do not hit the service and set the subtype list as empty
      this.subTypeList=[];
      this.subTypeId='';
    }else{
      this.contractservice.getSubDocTypeData(this.docTypeId)
        .subscribe(data => {
          var resData: any=data;
          this.subTypeList=resData.data.responseData;
          console.log(data, "sub Document list");
        },
    
      error => {
        console.log(error,"Inside Error")
      });

    }
  }

  /*
  * This will be called on click of download icon to download the document
  */
  downloadDocument(item) {
    console.log(item.docPathRef);
    let fName = item.docPathRef.substr(item.docPathRef.lastIndexOf('/') + 1, item.docPathRef.length);
    console.log(fName, 'name of file');
    let a = document.createElement('a');
    a.href = item.signedUrl;
    a.download = fName;
    a.click();
    this.toaster.success('Download Successfully !');
  }

/**diseable all date before current date in angular*/
todaydate:Date = new Date();
/**toggle button action */
isToggle= false;
swapOffToggleButton(){
  this.uploadedFileName = '';
  // this.docformupload.resetForm();
  if(!this.isToggle){
    console.log("on");
    this.isToggle=true;
  }else{
    console.log("off");
    this.isToggle=false;
  }
}

/**
 * validation before uploadFile
 */
validateUploadFile(userDocTypeId,userSubTypeId,userDocExpiryDate,userModuleEntityId,fileName){
  let errorMsg="";
  if(userDocTypeId==""){
    errorMsg+="Please select document type!";
  }else if(userSubTypeId==""){
    errorMsg+="Please select sub type!"
  }else if(userDocExpiryDate==""){
    errorMsg+="Please select expiry date!"
  }else if(userModuleEntityId==""){
    errorMsg+="Please select Entity type!"
  } else if (!this.validateFileLength(fileName)) {
    errorMsg += "File Name should not be greater than 50";
  }else if (!this.validateFileExt(fileName)) {
    errorMsg += "Invalid file type";
  } else if (!this.validateFileSize()) {
    errorMsg += 'File size should be less than 5 MB';
  }
  if(errorMsg.length>0){
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

  validFileExtensions = [".jpg", ".jpeg",".png",".doc",".pdf",".docx"];    
  validFormatsMgs: string= 'Allowed file formats are '+ this.validFileExtensions.join(', ');
 // fileName
  validateFileExt(fileName) {
    if(fileName && fileName.length < 51){
       var blnValid = false;
       var ext= fileName.substr(fileName.lastIndexOf("."),fileName.length);
       console.log(ext, "file extension");
         for (var j = 0; j < this.validFileExtensions.length; j++) {
           var valExtension = this.validFileExtensions[j];
           if(ext.toLowerCase() == valExtension.toLowerCase())
           {
               blnValid = true;
               break;
           }
       }
       return blnValid;

    }
  }

  validateFileLength(fileName) {
    if(fileName && fileName.length > 51){
        return false;
    }else{return true}
  }

  navigateToPreview($event) {
    $event.preventDefault();
    if(this.editflow){
      this.router.navigate(['/contract/preview',{steper:true,'editflow':'true'}], {skipLocationChange: true});
    }else{
      this.router.navigate(['/contract/preview'], {skipLocationChange: true});
    }
  }

  @HostListener('document:keydown', ['$event'])

  handleKeyboardEvent(event: KeyboardEvent) {

      if (event.altKey && (event.keyCode === 80)) { // alt+p [Preview]
          event.preventDefault();
          if(document.getElementById('previewButton')){
            let element = document.getElementById('previewButton')  ;
            element.click();
          }
        }

  }

  minDate;
  maxDate;
  isValidDocExpiryDate:boolean = false;
  opportunity : any={};

  getOpportunityDetails() {
    this.contractservice.getOportunity(AppSetting.oprtunityId,this.editflow).subscribe(suc => {
      this.opportunity.opportunityData = suc.data.responseData;
      this.minDate = this.opportunity.opportunityData.contract.effectiveDt;
      this.maxDate = this.opportunity.opportunityData.contract.expDt;
    });
  }
  docExpiryDt(){
    let docYear = parseInt(this.datePipe.transform(this.docExpiryDate, 'yyyy'))
      if (docYear > 9999) {
        this.docExpiryDate = '';
      }
  }

  deleteFile(item) {
    this.spinner.show();
    console.log (item);
    const deactivateData = {key:'msa',value:[item.msaCustId]};
    this.contractservice.deactivateDocument(deactivateData).subscribe(result => {
      let ob = ErrorConstants.validateException(result);
      if(ob.isSuccess) {
      this.docformupload.resetForm();
      this.getDocumentDetailbyId();
      } else {
        this.toaster.error(ob.message);
        this.spinner.hide();
      }
    },error => {
      this.toaster.error(ErrorConstants.errorNotFound);
      console.log(error);
      this.spinner.hide();
    });
  }
}
