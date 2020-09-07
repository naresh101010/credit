import { Component, OnInit, Inject, ViewChild, ElementRef, HostListener} from '@angular/core';
import { ContractService } from '../contract.service';
import { MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSetting } from '../../app.setting';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import * as XLSX from 'xlsx';
import { ErrorConstants }  from '../models/constants';
import { DataService } from './sharedata.service';
import { confimationdialog } from '../confirmationdialog/confimationdialog';
import { Validation } from 'src/app/shared/validation';
import * as _ from 'lodash';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from '../services/authorization.service';

export interface DialogData {conModuleId: any,
  editflow: false;
  AddressType:any;
  msaDataList:any;
  
 }

export interface SearchBrData {branchName: any, branchId:any }
var msaCustId
var msaPostId
var msadata
var ELEMENT_DATA: Element[] = [

];
var ELEMENT_POST_DATA: Element[] = [

];

@Component({
  selector: 'app-msa',
  templateUrl: './msa.component.html',
  styleUrls: ["../core.css"]
})

export class MsaComponent implements OnInit {
  sort: MatSort;
  //pincode validation
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  //end
  //FORM VALIDATION
  registerForm: FormGroup;
  submitted = false;
  //END OF VALIDATION
  constructor(private spinner: NgxSpinnerService, private tosterservice: ToastrService, private formBuilder: FormBuilder, public dialog: MatDialog, private _contractService: ContractService, private router: Router, private ChangeDetectorRef: ChangeDetectorRef
    ,private acrouter: ActivatedRoute,private sharedSearchdata: DataService,
     private permissionsService: NgxPermissionsService, private authorizationService: AuthorizationService) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(ConsignorUploadFile, {disableClose: true,
      maxWidth: '100%',
      panelClass: 'creditDialog',
      data: {editflow: this.editflow, AddressType: this.AddressType,msaDataList :JSON.parse(JSON.stringify(this.msa.responseData))}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.getMsa()
      this.model = {}
    });
  }
    
  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
}
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild('TABLE',{static: false} ) table: ElementRef;


//#BulkUpload dialog for downloadErrorFile
conModuleEntitiId=''; 
openDialogForDownloadError(): void {
  const dialogRef = this.dialog.open(DownloadErrorFile, {disableClose: true,
    panelClass: 'creditDialog',
    data: {conModuleId:this.conModuleEntitiId},
    width: '50%',
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');    
  });
}

  // AddressType: any[] = [{ id: 44, value: 'Consignor' },
  // { id: 45, value: 'Consignee' },{ id: 46, value: 'Both' },
  // ]
  AddressType: any[];
  model: any = {}
  user: any = {}
  // msa: any = {}
  detail = [{
    "Name": "mayank"
  }]
  editflow = false;
  isDisable:boolean;
  receivedCustId:number;
  sourcePage:string;

//default Branch Advance Search
showData: any = [];
tableData: any = [];
tabledataLength;
baseLocationError:boolean;
advanceDefaultBranchName(str){ 
  if(str){
    this.baseLocationError=true;
    if(str.term.length > 2 && str.term){
      this.baseLocationError=false;
      this._contractService.searchBranchByName(str.term)
        .subscribe(success => {
          let ob = ErrorConstants.validateException(success);
          if (ob.isSuccess) {
            this.tableData = [];
            this.tableData = success.data.responseData;
            if (this.tableData && this.tableData.length > 0) {
              this.tableData.sort((a, b) => {
                const branchNameA = a.branchName.toUpperCase();
                const branchNameB = b.branchName.toUpperCase();
                let comparison = 0;
                if (branchNameA > branchNameB) {
                  comparison = 1;
                } else if (branchNameA < branchNameB) {
                  comparison = -1;
                }
                return comparison;
              });
            }
            for(let val of this.tableData){
              val["baseLocation"]= val.branchName;
              val["baseLocationBranchId"] = val.branchId;
            }
            this.tabledataLength = this.tableData.length;          
        }
        else {
          this.tosterservice.error(ob.message);
          this.spinner.hide();
        }
      },
          error => {
            this.tosterservice.info('No Base Location found !!');
            this.spinner.hide();
          });  
  }
  }
}
emptyData(){
  this.tableData=[];
}
onClear(){
  this.baseLocationError = false;
  if(this.tableData.length>0 &&  this.tableData[0].baseLocation==='BRANCH UNAVAILABLE'){
    this.emptyData();
  }
}

onBranchChanged(event){
console.log('event', event )


}



@HostListener('document:keydown', ['$event'])

handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && (event.keyCode === 83)) { // ctrl+s [Save as Draft]
      event.preventDefault();
      if(document.getElementById('secondry-button')){
        let element = document.getElementById('secondry-button')  ;
        element.click();
      }
    }

    if (event.altKey && (event.keyCode === 78)) { // alt+n [Next]
        event.preventDefault();
        if(document.getElementById('msaNextButton')){
          let element = document.getElementById('msaNextButton')  ;
          element.click();
        }
      }

}

sfxCode = AppSetting.sfxCode;

  ngOnInit() {
    this.authorizationService.setPermissions('MSA');
    this.permissionsService.loadPermissions(this.authorizationService.getPermissions('MSA'));

    this.isDisable = false;
    //msa creation and link module subscribe block
    this.sharedSearchdata.currentMessage.subscribe(receivedCustId => {
      this.receivedCustId=receivedCustId;
      console.log("receivedCustId:",receivedCustId);
      if(this.receivedCustId>=0){
        this.sourcePage='msaSearchPage'        
        AppSetting.msaCustId=receivedCustId;
  
      }
    });
   
    this.acrouter.params.subscribe(params => {            
      if (params['editflow']) { 
        this.editflow = params['editflow'];
        this.isDisable = false;
      }
    });
    if (AppSetting.msaCustId) {
      msaCustId = AppSetting.msaCustId
    }

    this.getMsa();
    // this.model

    //VALIDATION
    this.registerForm = this.formBuilder.group({
      sla: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
    //VALIDATION
    //end validation
  }
  //validation 
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  msa: any = {}
  templateRefPath='';
  signedUrl = '';
  passData:any;
  cneeCnorList=[];
  AddRess:any;
  getMsa() {
    this.spinner.show();
    this._contractService.getMsa(AppSetting.msaCustId)
      .toPromise()
      .then(
        success => {
        let ob = ErrorConstants.validateException(success);
        if (ob.isSuccess) {
          this.msa = success.data;
          this.msa.responseData[0].msaCustAddrs[0].addr = this.msa.responseData[0].msaCustAddrs[0].addr.replace('|',' ');
          this.msa.responseData[0].msaCustAddrs[0].addr = this.msa.responseData[0].msaCustAddrs[0].addr + ' ' + this.msa.responseData[0].msaCustAddrs[0].pincodeId;
          // this.msa.responseData[0].msaCustAddrs[0].addr         
          this.passData=success;      
          this.AddressType=success.data.referenceData.consignType;
          this.spinner.hide();
          msadata = this.msa
          ELEMENT_DATA=[]
          for (let data of this.msa.responseData) {    
            AppSetting.customerName = data.custName
            AppSetting.sfdcAccId = data.sfdcAccId
            if(data.baseLocation){
              let val={};
              val["baseLocation"]= data.baseLocation;
              val["baseLocationBranchId"] = data.baseLocationBranchId;
              this.tableData.push(val);
            }
            for (let data1 of data.cneeCnor) {                               
              let temp = _.find(this.AddressType, { 'id': data1.lkpConsigntypeId});
              data1['lkpConsigntypeName']=temp.lookupVal;      
              ELEMENT_DATA.push(data1);
              setTimeout(() =>
               this.dataSource.paginator = this.paginator);
            }  
          }
         //added for #BulkUpload
         for (let data of this.msa.referenceData.moduleEntityList) {
          if(data.lookupVal == "CNOR-CNEE"){
            this.conModuleEntitiId=data.id;
          }
        } 
        if(this.msa.referenceData.cnorCneeTemplate.length>0){
          this.templateRefPath=this.msa.referenceData.cnorCneeTemplate[0].docPathRef;
          this.signedUrl = this.msa.referenceData.cnorCneeTemplate[0].signedUrl;
        }

          if(ELEMENT_DATA)
            this.dataSource = new MatTableDataSource(ELEMENT_DATA);
                }else {
                  this.tosterservice.error(ob.message);
                  this.spinner.hide();
                }
              },
                error => {
                  this.tosterservice.error(ErrorConstants.getValue(404));
                  this.spinner.hide();
                });
  }

  putMsa(value) {
    let val
    for (let d of this.msa.responseData) {
      val = d
      console.log(val)
    }
    for(let data of ELEMENT_DATA){   
      // let temp = _.find(this.AddressType, { 'lookupVal': data.lkpConsigntypeId});      
      // data.lkpConsigntypeId=temp.id;
      // data.lkpConsigntypeId=data.lkpConsigntypeId;
      if(data.panNum)
        data.panNum=data.panNum.toUpperCase();
      if(data.tanNum)
        data.tanNum=data.tanNum.toUpperCase();
      if(data.gstinNum)
        data.gstinNum=data.gstinNum.toUpperCase();




    // for(let data of ELEMENT_DATA){
    //   if(data.lkpConsigntypeId=="Consignor"){
    //     data.lkpConsigntypeId=44;
    //     data.panNum=data.panNum.toUpperCase();
    //     data.tanNum=data.tanNum.toUpperCase();
    //     data.gstinNum=data.gstinNum.toUpperCase();
    //    }else{
    //     data.lkpConsigntypeId=45;
    //     data.panNum=data.panNum.toUpperCase();
    //     data.tanNum=data.tanNum.toUpperCase();
    //     data.gstinNum=data.gstinNum.toUpperCase();
    //    }
    }

    val["cneeCnor"] = ELEMENT_DATA
    // val.sla = this.user.sla
    this.spinner.show();
    this._contractService.putMsa(val)
      .subscribe(
        success => {
          let ob = ErrorConstants.validateException(success);
        if (ob.isSuccess) {
          msaPostId = success.data.responseData;
          console.log('msaPostId',msaPostId) ;
          ELEMENT_DATA = []
          this.dataSource = null
          if (value) {
            if(val.cneeCnor.length==0){
              this.spinner.hide();
              this.tosterservice.info('Please Add Consignor/Consignee !');
              return;
            }
            this.tosterservice.success("Saved Successfully");
            if (this.editflow) {
              this.router.navigate(['/contract/opportunity', { steper: true, 'editflow': 'true' }], {skipLocationChange: true});
            } else {
              this.router.navigate(['/contract/opportunity'], {skipLocationChange: true});
            }
          }else{
            this.tosterservice.success("Saved Successfully");
            this.getMsa()
            this.spinner.hide();
          }
        }
        else {
          this.tosterservice.error(ob.message);
          this.spinner.hide();
        }
      },
        error => {
          this.tosterservice.error(ErrorConstants.getValue(404));
          this.spinner.hide();
        });
  }

  getDetail() {
    let data = { "Name": this.model.name }
    this.detail.push(data)
  }

  msaNext() {   
    let oprid
    //this condtion is for msa opportunity search and creation module
    if(this.sourcePage=='msaSearchPage'){
      this.passData.data.responseData=this.passData.data.responseData[0];
      this.sharedSearchdata.changeMessage(this.passData)
      this.router.navigate(['contract/msaopportunity'], {skipLocationChange: true});
    }
    else{
      this.putMsa(1);
    }
  }

  // for table
  value1 = '';
  displayedColumns: string[] = [ 'name', 'lkpConsigntypeName', 'panNum', 'gstinNum', 'tanNum', 'mob', 'addr1', 'city', 'pincode', 'dealerCode'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);  
  ngAfterViewInit (){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
    // for xlxs file
    ExportTOExcel(){      
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'ConsignorConsigneeSheet');      
      /* save to file */
      XLSX.writeFile(wb, 'ConsignorConsignee.xlsx');      
    }
   // end of xlxs file

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  address
  addElement() {

    var city
    this._contractService.getCity(this.model.pincode)
      .subscribe(
        success => {
          let ob = ErrorConstants.validateException(success);
        if (ob.isSuccess) {
          this.address = success.data.responseData;
          for (let d of success.data.responseData) {
            city = d.city

          }

          var addrBook = {
            "addr1": "string",
            "addr2": "string",
            "addr3": "string",
            "id": 1,
            "latitude": 2,
            "longitude": 20,
            "pincodeId": 2
          }

          var addrBookId = 1       
          var consignorTYpe
          ELEMENT_DATA.push({
            name: this.model.name, lkpConsigntypeId: this.model.lkpConsigntypeId,
            panNum: this.model.panNum, gstinNum: this.model.gstinNum, tanNum: this.model.tanNum, mob: this.model.mob,
            address: this.model.address, city: city.cityName, pincode: this.model.pincode, addrBookId: addrBookId, addrBook: addrBook, dealerCode: this.model.dealerCode,
            msaCustId: msaCustId, lkpConsigntypeName: consignorTYpe
          })


          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
    
        }else {
          this.tosterservice.error(ob.message);
          this.spinner.hide();
        }
      },
        error => {
          this.tosterservice.error(ErrorConstants.getValue(404));
          this.spinner.hide();
        });




  }


  removeData(vall, j) {
    
    // for (let i = 0; i < ELEMENT_DATA.length; i++) {
    // }
    ELEMENT_DATA.splice(j, 1);
    this.ChangeDetectorRef.detectChanges();
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);

  }

/**
    *  #BulkUpload
    *  On Browse file
    */
   fileToUpload: File = null;
   uploadedBFileName ='';
   //On file browse
   handleFileInput(event){
    let fileList: FileList = event.target.files;
     if(fileList.length > 0) {
         this.fileToUpload = fileList[0];
         this.uploadedBFileName = this.fileToUpload.name;
         console.log("Uploaded File "+this.uploadedBFileName);

         this.uploadDocument();
     }
   }

  /**
  *  #BulkUpload
  *  Call post service to upload the file
  */
  uploadDocument() {
    console.log(this.conModuleEntitiId, "moduleEntityid - uploadDocument")
    var validExt:boolean;
    if (this.uploadedBFileName) {
      validExt = this.uploadedBFileName.substr(this.uploadedBFileName.lastIndexOf("."), this.uploadedBFileName.length) == '.xls' ? true : false;
    }
    if (validExt) {
        this.spinner.show();
        this._contractService.postBulkUploadConsignee(AppSetting.msaCustId,this.conModuleEntitiId,this.fileToUpload)
        .subscribe(data => {
          //console.log(data, "postBulkUploadConsignee");
          
          var a = document.createElement("a");
          var blob = new Blob([data], { type: "octet/stream" });
          //for edge browser
          if(window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, this.uploadedBFileName);
            return;
          } 
         
          var url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = this.uploadedBFileName;
          a.click();
          window.URL.revokeObjectURL(url);
          this.tosterservice.success("Saved Successfully");
          this.getMsa();
          this.uploadedBFileName = '';
          
         
        },error => {
          this.spinner.hide();
          this.uploadedBFileName = '';
          this.tosterservice.error("Something went wrong ! Please validate uploaded template.");
        });
    } else {
      this.uploadedBFileName='';
      this.tosterservice.error("Please upload valid file i.e .xls");
    }
  }

  /**
   * Download templete for bulk upload
   */
  downloadTemplate(){
    console.log('inside download Template');
    let fName='Consigner_consignee.xls';
    console.log(fName, 'name of file');
    let a = document.createElement('a');
    a.href = this.signedUrl;
    a.download = fName;
    a.click();
    this.tosterservice.success('Download Successfully !');
  }

  selFlag:boolean =false;
  /**
   * will be called on check/uncheck of Select all
   * @param e 
   */
  selectAll(e){   
    if(e.checked){
      console.log("Selected ALL");
      this.selFlag=true;
      this.usersForDeactivate=[];
      //this.usersForDeactivate=ELEMENT_DATA;
      //console.log(ELEMENT_DATA.length,"element Data");
      //this.usersForDeactivate=ELEMENT_DATA;
      for(let cneCnor of ELEMENT_DATA){
        this.usersForDeactivate.push(cneCnor);
      }
    }else{
      console.log("Deselected ALL");
      this.selFlag=false;
      this.usersForDeactivate=[];
    }
    console.log(this.usersForDeactivate,"Selected user for deactivation");  }

  
    /**
   * Prepare list of users to be deactivate
   */
  usersForDeactivate=[];
  prepareDeactivateUsersList(e,dataObj){
    //console.log(dataObj," Data Object");
    console.log(e.checked,"is checked");
    console.log(JSON.stringify(dataObj),"Selected Object");

   if(e.checked){
      this.usersForDeactivate.push(dataObj);
    }else{
      var i=this.usersForDeactivate.indexOf(dataObj);
      console.log(i,"index of passed item");
      this.usersForDeactivate.splice(i,1);
    }
    console.log(this.usersForDeactivate,"Selected user for deactivation");
  }

  /**
   * Delete Users
   */
  deactivateCneeCor(){
    if(this.usersForDeactivate!=null && this.usersForDeactivate.length>0){
      let postData = JSON.parse(JSON.stringify(this.usersForDeactivate));
      this._contractService.putDeactivateCneeCor(postData)
      .subscribe(data => {
        let ob = ErrorConstants.validateException(data);
        if (ob.isSuccess) {
          this.tosterservice.success("Deleted successfully");
          this.usersForDeactivate=[];
          this.getMsa();
          this.selFlag=false;
        }else {
          this.tosterservice.error(ob.message);
          this.spinner.hide();
        }
      },error => {
        this.tosterservice.error("Something went wrong");
      });
    }else{
      this.tosterservice.info("No Consignor or Consignee is selected");
    }
  }   
}

//dialog box

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'consignor_Open.html',
  styleUrls: ["../core.css"]
})



export class ConsignorUploadFile implements OnInit {
  isAddressChecked=false;
  clicked=false;
  dialogRefConfirm: any;
  address1Error: boolean;
  addressData: any;
  addressDatalength: any;
  //pincode validation
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  //end
  constructor(
    public dialogRef: MatDialogRef<ConsignorUploadFile>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private spinner: NgxSpinnerService, private tosterservice: ToastrService, private formBuilder: FormBuilder, public dialog: MatDialog, private _contractService: ContractService, private router: Router, private ChangeDetectorRef: ChangeDetectorRef) { }
  //for consignor and consignee

  editflow: false
  AddressType:any[];
  msaDataList:any;
  ngOnInit() {

    this.editflow = this.data.editflow;
    ELEMENT_POST_DATA = []
    this.dataSource1 = null
    this.AddressType = this.data.AddressType;
    this.msaDataList = this.data.msaDataList;
  }

  value1 = '';
  displayedColumns: string[] = ['name', 'lkpConsigntypeName', 'panNum', 'gstNum', 'tanNum', 'mob', 'address', 'city', 'pincode', 'dealercode', 'delete'];
  dataSource1 = new MatTableDataSource(ELEMENT_POST_DATA); 


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource1.filter = filterValue;
  }

  pastedText
  onPaste(event: ClipboardEvent) {
    var re = /^[0-9]+$/;
    this.pastedText = Number(event.clipboardData.getData('text'));
    if(re.test(this.pastedText)){
      console.log(1)
    }
    else{
      event.preventDefault();
    }
  }

  clickBodyElem(event) {
    this.pincodeError=false;
   }

  panChk=false;
  panLength=false;
  onPanChange(num) {
  if(num.length>0) {
    this.panChk= Validation.panValidation(num);
    this.panLength = true;
  } else {
    this.panLength = false;
    this.panChk = false;
  }}
  tanChk=false;
  tanLength=false;
  onTanChange(num){
    if(num.length>0){
    this.tanLength= true;
    this.tanChk= Validation.tanValidation(num);
    }else{
      this.tanChk = false;
      this.tanLength= false;
    }
  }
  gstnChk=false;
  onGstnChange(num){
    this.gstnChk= Validation.gstinValidation(num);
  }


  pincodeData:any;
  pincodeError:any;
  pincodeSearch(str){
    if(!this.isAddressChecked){ 
    if(str){
      if(str.term.length > 3 && str.term){
        this.pincodeError=false;
        this._contractService.getAddrByPincode(str.term)
          .subscribe(success => {
            let ob = ErrorConstants.validateException(success);
            if (ob.isSuccess) {
              this.pincodeData = [];
              this.pincodeData = success.data.responseData;
              if(this.pincodeData.length==0){
                this.tosterservice.info('No Pincode found !!');
                return;
              }
              for(let val of this.pincodeData){
                val["pincode"]= val.pincode;
                val["pincodeId"] = val.pincode;
              }
          }
          else {
            this.tosterservice.error(ob.message);
            this.spinner.hide();
          }
        },
            error => {
              this.tosterservice.info('No Pincode found !!');
              this.spinner.hide();
            });  
    }else{
      this.pincodeError=true;
      }
    }
  }
  }

 
  address
  model: any = {
    addresstwo:'',
    addressone:'',
    Address:''
  }
 
  ccname:any;
    updateTypeName(){
      for(let data of this.AddressType){
        if(this.model.lkpConsigntypeId == data.id){
          this.ccname = data.lookupVal;
        }
      }
    }
  addElement(valid,form) {
    if(valid) {
      let tempPin  = this.model.pincode;
      this.model.pincode = '';
      this.spinner.show();
      this._contractService.getCity(tempPin)
      .subscribe(
        success => {
          let city;
          let ob = ErrorConstants.validateException(success);
         if (ob.isSuccess) {
         this.address = success.data.responseData;
          for (let d of success.data.responseData) {
            city = d.city
          }
          if(!city){
            this.model.pincode = tempPin;
            this.tosterservice.error('Pincode Invalid for City Details');
          }else {
            var addrBook = {
              id:this.model.id,
              addr1: this.model.Address?this.model.Address:'',
              addr2: this.model.addressone?this.model.addressone:'',
              addr3: this.model.addresstwo?this.model.addresstwo:'',
              pincodeId: tempPin
            }            
            var addrBookId = 0
            var consignorTYpe;
            this.model.address = addrBook.addr1 + ' ' + addrBook.addr2 + ' ' + addrBook.addr3;
            
            let dataList ={
              name: this.model.name, lkpConsigntypeId: this.model.lkpConsigntypeId,
              panNum: this.model.panNum, gstinNum: this.model.gstinNum, tanNum: this.model.tanNum, mob: this.model.mob,
              address: this.model.address, city: city.cityName, pincode: tempPin.toString(), addrBookId: addrBookId, addrBook: addrBook, dealerCode: this.model.dealerCode,
              msaCustId: msaCustId, lkpConsigntypeName: this.ccname
            }
            ELEMENT_POST_DATA.push(dataList);
            this.dataSource1 = new MatTableDataSource(ELEMENT_POST_DATA);
            console.log(city.cityName);
            form.reset();
            this.spinner.hide();
          }
         
        }
        else {
          this.model.pincode = tempPin;
          this.tosterservice.error(ob.message);
          this.spinner.hide();
        }
      },
        error => {
          this.model.pincode = tempPin;
          this.tosterservice.error(ErrorConstants.getValue(404));
          this.spinner.hide();
        });

    }
  }

  removeData(vall, j) {
    
 
    ELEMENT_POST_DATA.splice(j, 1);
    this.ChangeDetectorRef.detectChanges();
    this.dataSource1 = new MatTableDataSource(ELEMENT_POST_DATA);

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
  putMsa() {
    this.spinner.show();
    let val;
    for (let d of this.msaDataList){
      val = d
    }    
    for(let data of ELEMENT_POST_DATA){   
        if(data.panNum)
          data.panNum=data.panNum.toUpperCase();
        if(data.tanNum)
          data.tanNum=data.tanNum.toUpperCase();
        if(data.gstinNum)
          data.gstinNum=data.gstinNum.toUpperCase();
    }

    
    val["cneeCnor"] = ELEMENT_POST_DATA
    // val.sla = this.user.sla
    this._contractService.putMsa(val)
      .subscribe(
        success => {
          let ob = ErrorConstants.validateException(success);
         if (ob.isSuccess) {
          msaPostId = success.data.responseData;
          this.tosterservice.success("Saved Successfully");
          console.log(msaPostId);
          ELEMENT_POST_DATA = []
          this.dataSource1 = null
        }else {
          this.tosterservice.error(ob.message);
          this.spinner.hide();
        }
        this.dialogRef.close(true);
      },
        error => {
          this.tosterservice.error(ErrorConstants.getValue(404));
          this.spinner.hide();
          this.dialogRef.close();
        });

  }


 @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
      if (event.keyCode === 27) { // esc [Close Dialog]
        event.preventDefault();
        if(document.getElementById('signCloseButton')){
          let element = document.getElementById('signCloseButton')  ;
          element.click();
        }
      }
  }



  onChange(e: any) {
  
    this.model.id = null;
    this.model.addressone = '';
    this.model.addresstwo = '';
    this.model.pincode = '';

    if (e.id) {
      console.log(e);
      for (let val of this.addressData) {
        if (val["id"] == e.id) {
          this.model.id = val["id"];
          this.model.addressone = val["addr2"]?val["addr2"]:'';
          this.model.addresstwo = val["addr3"]?val["addr3"]:'';
          this.model.pincode=val["pincodeId"];
          this.pincodeData=[{"pincode": val["pincodeId"],"pincodeId" : val["pincodeId"]}];
          this.model.city=val["city"];
        }
      }
    }

  }
  emptyPincodeData(){
    this.pincodeData=[];
  }
  onClear(){
    this.address1Error = false;
    this.pincodeError=false;
  }
  clearAddresValues(){
    this.model.Address=null;
  }
  searchAddress(str){ 
    console.log(str)
    if(str){
      this.address1Error=true;
      if(str.term.length > 2 && str.term && this.isAddressChecked==true){
        this.address1Error=false;
        this._contractService.searchAddressByName(str.term.toUpperCase())
          .subscribe(success => {
            let ob = ErrorConstants.validateException(success);
            if (ob.isSuccess) {
              this.addressData = success.data.responseData;
              if(this.addressData.length==0){
                this.tosterservice.info('Address Not found !!')
                return;
              }
              for(let val of this.addressData){
                val["id"]=val.id;
                val["addr1"]= val.addr1;
                val["addr2"] = val.addr2;
                val["addr3"] = val.addr3;
              }
              this.addressDatalength= this.addressData.length;          
          }
          else {
            this.tosterservice.error(ob.message);
            this.spinner.hide();
          }
        },
            error => {
              this.tosterservice.info('Address Not found !!');
              this.spinner.hide();
            });  
    }
    this.addressData= [];
    this.addressDatalength = 0;
    }
  }
}









//end of dialog box
export interface Element {
  name: string;
  lkpConsigntypeId: any;
  panNum: any;
  gstinNum: any;
  tanNum: any;
  mob: number;
  address: string;
  city: string;
  pincode: number;
  addrBookId: number;
  addrBook: any
  dealerCode: string
  msaCustId: number
  lkpConsigntypeName: string
}





//  ***********
// Download Uploaded bulk files
// *************
@Component({
  selector: 'downloadErrorFile',
  templateUrl: 'downloadErrorFile.html',
  styleUrls: ['../core.css']
})
export class DownloadErrorFile implements OnInit{


  constructor(
    public dialogRef: MatDialogRef<DownloadErrorFile>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _contractService: ContractService,
    private tosterservice: ToastrService) {}

    ngOnInit(){
      console.log(this.data.conModuleId,"ModuleEntity Id");
      this.getErrorFiles(this.data.conModuleId);
      
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
getErrorFiles(moduleEntityId)
{
  console.log("inside getErrorFiles");
  var requesData= {
    "msaCustId": AppSetting.msaCustId,
    "moduleEntityIds": [
      moduleEntityId
    ]
  };
                    
  console.log("request JSON for get ErrorFiles: " + JSON.stringify(requesData));
  this._contractService.postSearchDocuments(requesData)
    .subscribe(
      data => {
      let ob = ErrorConstants.validateException(data);
      if (ob.isSuccess) {
        var docData: any = {}
        docData = data;
        this.docList = docData.data.responseData;
        if(this.docList.length==0)
        {
          this.tosterservice.info('No Consignor/Consignee Report Found !!');
          this.dialogRef.close();
        }
      } else {
        this.tosterservice.error(ob.message);
      }
    },
    error => {
      console.log(error)
      this.tosterservice.error("Something went wrong");
    }  
    );

 
}

/*
* #BulkUpload
* This will be called on click of download icon to download the document
*/
  downloadDocument(item) {
    let fName = item.docPathRef.substr(item.docPathRef.lastIndexOf('/') + 1, item.docPathRef.length);
    console.log(fName, 'name of file');
    let a = document.createElement('a');
    a.href = item.signedUrl;
    a.download = fName;
    a.click();
    this.tosterservice.success('Download Successfully !');

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
//Download Component Ends


