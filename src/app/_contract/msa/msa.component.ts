import { Component, OnInit, Inject, ViewChild, ElementRef} from '@angular/core';
import { ContractService } from '../contract.service';
import { MatSort, MatTableDataSource} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSetting } from '../../app.setting';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TosterService } from './../toster.service';
import { NgxSpinnerService } from "ngx-spinner";
import * as XLSX from 'xlsx';
import { ErrorConstants }  from '../models/constants';
import { DataService } from './sharedata.service';

export interface DialogData {conModuleId: any,
  editflow: false;
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
  styleUrls: ['../core.css']
})

export class MsaComponent implements OnInit {
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
  constructor(private spinner: NgxSpinnerService, private tosterservice: TosterService, private formBuilder: FormBuilder, public dialog: MatDialog, private _contractService: ContractService, private router: Router, private ChangeDetectorRef: ChangeDetectorRef
    ,private acrouter: ActivatedRoute,private sharedSearchdata: DataService) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(ConsignorUploadFile, {disableClose: true,
      data: {editflow: this.editflow}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getMsa()
      this.model = {}
    });
  }
 
//#BulkUpload dialog for downloadErrorFile
conModuleEntitiId=''; 
openDialogForDownloadError(): void {
  const dialogRef = this.dialog.open(DownloadErrorFile, {disableClose: true,
    data: {conModuleId:this.conModuleEntitiId},
    width: '40%',
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');    
  });
}

  AddressType: any[] = [{ id: 44, value: 'Consignor' },
  { id: 45, value: 'Consignee' },{ id: 46, value: 'Both' },
  ]
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
advanceDefaultBranchName(str){ 
  if(str){
    if(str.term.length > 2 && str.term){
      this._contractService.searchBranchByName(str.term)
        .subscribe(success => {
            this.tableData = success.data.responseData;
            for(let val of this.tableData){
              val["baseLocation"]= val.branchName;
              val["baseLocationBranchId"] = val.branchId;
            }
            this.tabledataLength = this.tableData.length;          
        },
          error => {
            this.tosterservice.Error(ErrorConstants.getValue(404));
            this.spinner.hide();
          });  
  }
  this.tableData = [];
  this.tabledataLength = 0;
  }
}

onBranchChanged(event){
console.log('event', event )


}




  ngOnInit() {
    
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
    this.dataSource.sort = this.sort;
    if (AppSetting.msaCustId) {
      msaCustId = AppSetting.msaCustId
      this.model.lkpConsigntypeId = "Consignor"
    }

    this.getMsa();
    this.model

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
  passData:any;
  cneeCnorList=[];
  getMsa() {
    this.spinner.show();
    this._contractService.getMsa(AppSetting.msaCustId)
      // .subscribe(
      .toPromise()
      .then(
        success => {
        let ob = ErrorConstants.validateException(success);
        if (ob.isSuccess) {
          this.msa = success.data;
          this.passData=success;
          this.spinner.hide();
          msadata = this.msa
          ELEMENT_DATA=[]
          for (let data of this.msa.responseData) {    
            console.log(data, 'print data')        
            AppSetting.customerName = data.custName
            AppSetting.sfdcAccId = data.sfdcAccId
            if(data.baseLocation){
              let val={};
              val["baseLocation"]= data.baseLocation;
              val["baseLocationBranchId"] = data.baseLocationBranchId;
              this.tableData.push(val);
            }
            for (let data1 of data.cneeCnor) {
              if (data1.lkpConsigntypeId == 44) {
                data1.lkpConsigntypeId = "Consignor"
              } else {
                data1.lkpConsigntypeId = "Consignee"
              }
              ELEMENT_DATA.push(data1)    
              console.log(ELEMENT_DATA, "listdeatail")
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
        }

          if(ELEMENT_DATA)
            this.dataSource = new MatTableDataSource(ELEMENT_DATA);
                }else {
                  this.tosterservice.Error(ob.message);
                  this.spinner.hide();
                }
              },
                error => {
                  this.tosterservice.Error(ErrorConstants.getValue(404));
                  this.spinner.hide();
                });
  }

  putMsa() {
    let val
    for (let d of this.msa.responseData) {
      val = d
      console.log(val)
    }
    for(let data of ELEMENT_DATA){
      if(data.lkpConsigntypeId=="Consignor"){
        data.lkpConsigntypeId=44
       }else{
        data.lkpConsigntypeId=45
       }
    }

    val["cneeCnor"] = ELEMENT_DATA
    // val.sla = this.user.sla
    this.spinner.show();
    this._contractService.putMsa(val)
      .subscribe(
        success => {
          let ob = ErrorConstants.validateException(success);
        if (ob.isSuccess) {
          this.spinner.hide();
          msaPostId = success.data.responseData;
          this.tosterservice.Success("save success full");
          console.log(this.msa);
          this.getMsa()
          ELEMENT_DATA = []
          this.dataSource = null
        }
        else {
          this.tosterservice.Error(ob.message);
          this.spinner.hide();
        }
      },
        error => {
          this.tosterservice.Error(ErrorConstants.getValue(404));
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
      this.router.navigate(['/retail-contract/msaopportunity']);
    }
    else if(this.editflow){
      this.router.navigate(['/retail-contract/opportunity', { 'editflow': 'true'}]);
    }else{
      this.router.navigate(['/retail-contract/opportunity']);
    }
  }

  // for table
  value1 = '';
  @ViewChild('TABLE',{static: false} ) table: ElementRef;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  displayedColumns: string[] = [ 'name', 'lkpConsigntypeId', 'panNum', 'gstinNum', 'tanNum', 'mob', 'addr1', 'city', 'pincode', 'dealerCode'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);  
  // ngAfterViewInit (){
  //   this.dataSource.sort = this.sort;
  // }
    // for xlxs file
    ExportTOExcel(){      
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');      
      /* save to file */
      XLSX.writeFile(wb, 'SheetJS.xlsx');      
    }
   // end of xlxs file

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
          console.log(this.address)
          var consignorTYpe
          // if(this.model.lkpConsigntypeId==11){
          //   consignorTYpe="Consignor"
          //  }else{
          //    consignorTYpe="Consignee"
          //  }
          ELEMENT_DATA.push({
            name: this.model.name, lkpConsigntypeId: this.model.lkpConsigntypeId,
            panNum: this.model.panNum, gstinNum: this.model.gstinNum, tanNum: this.model.tanNum, mob: this.model.mob,
            address: this.model.address, city: city.cityName, pincode: this.model.pincode, addrBookId: addrBookId, addrBook: addrBook, dealerCode: this.model.dealerCode,
            msaCustId: msaCustId, lkpConsigntypeName: consignorTYpe
          })


          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
          console.log(city.cityName);
          // this.model.name = null
          // this.model.lkpConsigntypeId = null
          // this.model.address = null
          // this.model.lkpConsigntypeId = null
          // this.model.panNum = null
          // this.model.gstinNum = null
          // this.model.pincode = null
          // this.model.mobileNum = null
          // this.model.address = null
          // this.model.dealerCode = null
          // this.model.tanNum = null
          // this.model.mob = null


        }else {
          this.tosterservice.Error(ob.message);
          this.spinner.hide();
        }
      },
        error => {
          this.tosterservice.Error(ErrorConstants.getValue(404));
          this.spinner.hide();
        });




  }


  removeData(vall, j) {
    
    for (let i = 0; i < ELEMENT_DATA.length; i++) {
      //   if ((j != null) && (ELEMENT_DATA[i].name == vall.name)) {
      //     var arr = ELEMENT_DATA[i];
      //     //this.DefaultB.data.push(arr);

      //     console.log(ELEMENT_DATA);
      //   }
    }
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
    //console.log(isNullOrUndefined(this.uploadedBFileName),"uploaded file flag");
    var validExt: Boolean
    if (this.uploadedBFileName) {
      validExt = this.uploadedBFileName.substr(this.uploadedBFileName.lastIndexOf("."), this.uploadedBFileName.length) == '.xls' ? true : false;
    }
    if (validExt) {
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
          this.tosterservice.Success("File uploaded");
          this.getMsa();
          this.uploadedBFileName = '';
        });
      error => {
        console.log(error)
      }
    } else {
      this.uploadedBFileName='';
      this.tosterservice.Error("Please upload valid file i.e .xls");
    }
  }

  /**
   * Download templete for bulk upload
   */
  downloadTemplate(){
    console.log("inside download Template");
    var fName="Consigner_consignee.xls";
    
    this._contractService.postDownloadDocument(this.templateRefPath)
      .subscribe(data => {
        console.log("inside downloadDocument response");
        console.log(data,"download file");
        var a = document.createElement("a");
        var blob = new Blob([data], {type: "octet/stream"});

          // for edge
          console.log('naresh dofds')
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, fName);
            return;
          } 
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fName;
        a.click();
        window.URL.revokeObjectURL(url);
        this.tosterservice.Success("Template downloaded");
      });
    
      error => {
        console.log(error,"Error in download")
        this.tosterservice.Error("Something went wrong");
      } 
  }

  selFlag: Boolean=false;
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
    console.log(this.usersForDeactivate,"Selected user for deactivation");
  }

  
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
      for(let cc of postData){
        if(cc.lkpConsigntypeId=="Consignee"){
          cc.lkpConsigntypeId=45
        }else{
          cc.lkpConsigntypeId=44
        }
      }
      this._contractService.putDeactivateCneeCor(postData)
      .subscribe(data => {
        //var response:any=data;
        console.log(data,"deactivateCneeCor response ");
        this.tosterservice.Success("Deleted successfully");
        this.usersForDeactivate=[];
        this.getMsa();
        this.selFlag=false;
      });
    
      error => {
        console.log(error,"Error in delete");
        this.tosterservice.Error("Something went wrong");
      } 
    }else{
      this.tosterservice.Info("No Consignor or Consignee is selected");
    }
  }
  
  
}

//dialog box

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'consignor_Open.html',
  styleUrls: ['../core.css']

})
export class ConsignorUploadFile implements OnInit {
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private spinner: NgxSpinnerService, private tosterservice: TosterService, private formBuilder: FormBuilder, public dialog: MatDialog, private _contractService: ContractService, private router: Router, private ChangeDetectorRef: ChangeDetectorRef) { }
  //for consignor and consignee

  editflow: false
  ngOnInit() {
    this.editflow = this.data.editflow;
    ELEMENT_POST_DATA = []
    this.dataSource1 = null
  }
  AddressType: any[] = [{ id: 44, value: 'Consignor' },
                        { id: 45, value: 'Consignee' },
                        { id: 46, value: 'BOTH' },
                       ]
  value1 = '';
  //displayedColumns = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['name', 'lkpConsigntypeId', 'panNum', 'gstNum', 'tanNum', 'mob', 'address', 'city', 'pincode', 'dealercode', 'delete'];
  dataSource1 = new MatTableDataSource(ELEMENT_POST_DATA); 

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource1.filter = filterValue;
  }

  panChk=false;
  onPanChange(num){
    if(num.length==10){
      var lastDgt=Number(num.charAt(num.length-1));
      if(lastDgt==0 ||lastDgt==1||lastDgt==2||lastDgt==3||lastDgt==4||lastDgt==5||lastDgt==6||lastDgt==7||lastDgt==8||lastDgt==9){
         this.panChk=true;
      }
      else{
        this.panChk=false;
      }
    }
  }
  tanChk=false;
  onTanChange(num){
    if(num.length==10){
      var lastDgt=Number(num.charAt(num.length-1));
      if(lastDgt==0 ||lastDgt==1||lastDgt==2||lastDgt==3||lastDgt==4||lastDgt==5||lastDgt==6||lastDgt==7||lastDgt==8||lastDgt==9){
         this.tanChk=true;
      }
      else{
        this.tanChk=false;
      }
    }
  }

 
  address
  model: any = {}
  addElement(valid,form) {
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
          if(!city){
            this.tosterservice.Error('Pincode Invalid for City Details');
          }
          var addrBook = {
            addr1: this.model.Address,
            addr2: this.model.addressone,
            addr3: this.model.addresstwo,
            //"id": 1,
            //"latitude": 2,
            //"longitude": 20,
            pincodeId: this.model.pincode
          }

          var addrBookId = 0
          console.log(this.address, "Hello India")
          var consignorTYpe
          // if(this.model.lkpConsigntypeId==11){
          //   consignorTYpe="Consignor"
          //  }else{
          //    consignorTYpe="Consignee"
          //  }
          this.model.address = this.model.Address + ', ' + this.model.addressone + ', ' + this.model.addresstwo;
          console.log(this.model.address, "Hello Model.address")
          ELEMENT_POST_DATA.push({
            name: this.model.name, lkpConsigntypeId: this.model.lkpConsigntypeId,
            panNum: this.model.panNum, gstinNum: this.model.gstinNum, tanNum: this.model.tanNum, mob: this.model.mob,
            // address: this.model.address, city: city.cityName, pincode: this.model.pincode, addrBookId: addrBookId, addrBook: addrBook, dealerCode: this.model.dealerCode,
            address: this.model.address, city: city.cityName, pincode: this.model.pincode, addrBookId: addrBookId, addrBook: addrBook, dealerCode: this.model.dealerCode,
            msaCustId: msaCustId, lkpConsigntypeName: consignorTYpe
          })
          this.dataSource1 = new MatTableDataSource(ELEMENT_POST_DATA);
          console.log(city.cityName);
          form.reset();
          // this.model.name = null
          // this.model.lkpConsigntypeId = null
          // this.model.address = null
          // this.model.lkpConsigntypeId = null
          // this.model.panNum = null
          // this.model.gstinNum = null
          // this.model.pincode = null
          // this.model.mobileNum = null
          // this.model.address = null
          // this.model.dealerCode = null
          // this.model.tanNum = null
          // this.model.mob = null
        }
        else {
          this.tosterservice.Error(ob.message);
          this.spinner.hide();
        }
      },
        error => {
          this.tosterservice.Error(ErrorConstants.getValue(404));
          this.spinner.hide();
        });

  }

  removeData(vall, j) {
    ;
    for (let i = 0; i < ELEMENT_POST_DATA.length; i++) {
      //   if ((j != null) && (ELEMENT_DATA[i].name == vall.name)) {
      //     var arr = ELEMENT_DATA[i];
      //     //this.DefaultB.data.push(arr);

      //     console.log(ELEMENT_DATA);
      //   }
    }
    ELEMENT_POST_DATA.splice(j, 1);
    this.ChangeDetectorRef.detectChanges();
    this.dataSource1 = new MatTableDataSource(ELEMENT_POST_DATA);

  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  putMsa() {
    this.spinner.show();
    let val;
    for (let d of msadata.responseData) {
      val = d
      console.log(val)
    }    
    for (let data of ELEMENT_POST_DATA) {
      if (data.lkpConsigntypeId == "Consignor") {
        data.lkpConsigntypeId = 44
      } else {
        data.lkpConsigntypeId = 45
      }
    }

    val["cneeCnor"] = ELEMENT_POST_DATA
    // val.sla = this.user.sla
    this._contractService.putMsa(val)
      .subscribe(
        success => {
          let ob = ErrorConstants.validateException(success);
         if (ob.isSuccess) {
          msaPostId = success.data.responseData;
          this.tosterservice.Success("Save Successfull");
          console.log(msaPostId);
          ELEMENT_POST_DATA = []
          this.dataSource1 = null
        }else {
          this.tosterservice.Error(ob.message);
          this.spinner.hide();
        }
        this.dialogRef.close();
      },
        error => {
          this.tosterservice.Error(ErrorConstants.getValue(404));
          this.spinner.hide();
          this.dialogRef.close();
        });

  }



}

//end of dialog box

export interface Element {
  name: string;
  lkpConsigntypeId: any;

  panNum: number;
  gstinNum: number;
  tanNum: number;
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

  closeDialog(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<DownloadErrorFile>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _contractService: ContractService,
    private tosterservice: TosterService) {}

    ngOnInit(){
      console.log(this.data.conModuleId,"ModuleEntity Id");
      this.getErrorFiles(this.data.conModuleId);
    }

  onNoClick(): void {
    this.dialogRef.close();
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
                    
  console.log("request JSON for get ErrorFiles: "+JSON.stringify(requesData));
  this._contractService.postSearchDocuments(requesData)
    .subscribe(data => {
      console.log("Inside search document success");
     var docData: any = {}
      docData=data;
      console.log(data, "getErrorFiles")
      
      this.docList=docData.data.responseData;
    });

  error => {
    console.log(error)
    this.tosterservice.Error("Something went wrong");
  }  
}

/*
* #BulkUpload
* This will be called on click of download icon to download the document
*/
downloadDocument(fileName){
console.log(fileName, "ref path");
var fName=fileName.substr(fileName.lastIndexOf('/')+1,fileName.length);
console.log(fName,'name of file');

this._contractService.postDownloadDocument(fileName)
  .subscribe(data => {
    console.log("inside downloadDocument response");
    console.log(data,"download file");
    var a = document.createElement("a");
    //var json = JSON.stringify(data);
    var blob = new Blob([data], {type: "octet/stream"});
      // for edge
      console.log('naresh dofds')  
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, fName);
          return;
        } 
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fName;
    a.click();
    window.URL.revokeObjectURL(url);
    this.tosterservice.Success("File downloaded");
  });

  error => {
    console.log(error,"Error in download");
    this.tosterservice.Error("Something went wrong");
  } 
}
}
//Download Component Ends


