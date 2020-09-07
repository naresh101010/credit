  import { modelMSA } from '../../modelMSA';
  import { Component, OnInit, Inject, Input, HostListener, ViewChild } from '@angular/core';
  import { ContractService } from '../../contract.service';
  import { HttpClient } from "@angular/common/http";
  import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
  import { Router} from '@angular/router';
  import { ChangeDetectorRef } from '@angular/core';
  import { FormBuilder, } from '@angular/forms';
  import { MatDialog } from '@angular/material/dialog';
  import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
  import { ToastrService } from 'ngx-toastr';
  import { NgxSpinnerService } from "ngx-spinner";
  import { DataService } from "../sharedata.service";
  import { ErrorConstants }  from '../../models/constants';
import { confimationdialog } from '../../confirmationdialog/confimationdialog';
import { Validation } from 'src/app/shared/validation';


  @Component({
    selector: 'app-msacreation',
    templateUrl: './msacreation.component.html',
    styleUrls: ["../../core.css"]

  })
  export class MsacreationComponent implements OnInit {

    

    regexp = new RegExp(/^[a-zA-Z]*$/);
    contactPerson: boolean;
    contactValidation(){
      this.contactPerson = true;
      if(!this.regexp.test(this.msaSelectedData.contactPerson.trim())){
        this.contactPerson= true;
        return true
      }
      else{
        this.contactPerson = false;
      }
    }
  

    @Input() src: string;
    ngOnChanges() {
      console.log("SRC"+this.src);
    }

  msabehaviour:any={}
  referenceData:any={}
  msaSelectedData:modelMSA=new modelMSA();
  segmentDropdownList=[];
  subSegmentDropdownList=[];
  accountTypeDropdownList=[]
  addressList=[];
	searchCtrl = '';
	searchCtrlSub = '';
  regAddress={
    pincodeId :'',
    addr:''
  };
  consignTypeList=[];
 
constructor(private sharedSearchdata: DataService,
    private httpservice: HttpClient,
    public router: Router,private spinner: NgxSpinnerService,
    private contractservice: ContractService,public dialog: MatDialog,private tosterservice: ToastrService,) { }
    

    @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
      this.dataSource.sort = sort;
  }
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

        if (event.altKey && (event.keyCode === 78)) {  // alt+n [Next]
            event.preventDefault();
            if(document.getElementById('msaCreationNextButton')){
              let element = document.getElementById('msaCreationNextButton')  ;
              element.click();
            }
          }
    
    }

    
  scrollActiveValue(){
    let selectItem = document.getElementsByClassName('mat-selected')[0];
    setTimeout(()=>{  
        if(selectItem){
          selectItem.scrollIntoView(false);
        }
    },500)
  }
    
  AddressType: any[];
  msadata:any
    ngOnInit() {
      ELEMENT_POST_DATA=[];
       this.sharedSearchdata.currentMessage.subscribe(msadata => msadata = msadata)
        this.msabehaviour["_value"]={}
        this.msabehaviour=this.sharedSearchdata.currentMessage.source;
        if(this.msabehaviour._value){
        this.msaSelectedData=this.msabehaviour._value.msadata;
        this.referenceData=this.msabehaviour._value.referenceData;
        this.AddressType = this.referenceData.consignType;
        console.log(this.referenceData.consignType, 'reference data')
        }
        if(this.msaSelectedData!=undefined && this.msaSelectedData.accType!=undefined){
        this.msaSelectedData.accType=this.msaSelectedData.accType.toUpperCase();
        }
       console.log("msaselectedData retreived",this.msaSelectedData);
       this.sharedSearchdata.changeMessage(new modelMSA())
       this.segmentDropdownList=this.referenceData.segmentList;
       this.referenceData.contractTypeList.forEach(accType => {
        if(accType.lookupVal!=='PRC' && accType.lookupVal!=='RETAIL') {
         this.accountTypeDropdownList.push(accType);
        }
      });
       this.consignTypeList=this.referenceData.consignType;
       this.createSubSegmentDownList();      
       if(this.msaSelectedData!=undefined && this.msaSelectedData.msaCustAddrs!=undefined && this.msaSelectedData.msaCustAddrs.length !=0 ){
        
         let addrArry = this.msaSelectedData.msaCustAddrs[0].addr.split("|");
         this.msaSelectedData.msaCustAddrs[0].addr = addrArry[0];
         this.regAddress=this.msaSelectedData.msaCustAddrs[0];
         this.onPanChange(this.msaSelectedData.pan);
         this.onGstnChange(this.msaSelectedData.gstinNum);
         this.segmentFlg();
         this.tableData = [];
         let val = {};
         val['branchName'] = this.msaSelectedData.baseLocation;
         val['branchId'] = this.msaSelectedData.baseLocationBranchId;
         this.tableData.push(val);
         let pincode = {};
         pincode["pincode"]= this.regAddress.pincodeId;
         pincode["pincodeId"] = this.regAddress.pincodeId;
         this.pincodeData.push(pincode);
       }
      
      this.dataSource = new MatTableDataSource(ELEMENT_POST_DATA);   
      // console.log("registred address",this.regAddress,this.accountTypeDropdownList);
    }

showData: any = [];
tableData: any = [];
tabledataLength;
baseLocationError:boolean = false;
advanceDefaultBranchName(str){ 
  if(str){
    this.baseLocationError=true;
    if((str.term.length > 2 && str.term)){
      this.baseLocationError=false;
      this.contractservice.searchBranchByName(str.term)
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
              this.tabledataLength = this.tableData.length;  
        
            }else {
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
emptyPincodeData(){
  this.pincodeData=[];
}
emptyBaselocationData(){
  this.tableData=[];
}
onClear(module) {
  if(module==='BRANCH') {
  this.baseLocationError = false;
} else if (module === 'PINCODE') {
  this.pincodeError=false;
}
}

clickBodyElem(event) {
  this.baseLocationError = false;
  this.pincodeError=false;
 }
panChk=false;
onPanChange(num){
  this.panChk= Validation.panValidation(num);
}

gstinChk=false;
onGstnChange(num){
  this.gstinChk= Validation.gstinValidation(num);
}

segmentFlg(){
      this.subSegmentFlage=false;
    }
  
    subSegmentFlage=false;
    
    createSubSegmentDownList(){
      this.subSegmentFlage=true;
      console.log("createSubSegmentdlist called1");
      var segmentName=this.msaSelectedData.segment;
      console.log("subseglist",this.referenceData.subSegmentList);
      if(segmentName!=undefined){
      var segmentId=this.segmentDropdownList.find(x=>x.segmentName==segmentName).id;
      if(segmentId != undefined && segmentId != null && segmentId !=''){
        this.subSegmentDropdownList = this.referenceData.subSegmentList.filter(function (subSegmentData) {
          return subSegmentData.segmentId == segmentId;
      });
      
      }
    }
      console.log("after filter subsegdropdn",this.subSegmentDropdownList,"segmentid",segmentId);
    } 

  postMSADataValue=false   
  MSANext() {
      let msaId
       if (!this.postMSADataValue) {        
         this.postMSAData();
       }
    }

    numberOnly(event): boolean {
    
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    }


    pastedText
    onPaste(event: ClipboardEvent) {
      var re = /^[0-9]+$/;
      this.pastedText = Number(event.clipboardData.getData('text'));
      if(re.test(this.pastedText)){
        console.log('1')
      }
      else{
        event.preventDefault();
      }
    }

//function to post MSA data
    postMSAData() {
      this.spinner.show();
      this.addressList=[];
      let oldaddr = JSON.parse(JSON.stringify(this.regAddress));
      this.addressList.push(this.regAddress);
      let cityName = '';
      let stateName = '';
      let distName = '';
      for (let citydata of this.pincodeData) {
        if (this.regAddress.pincodeId === citydata.pincode) {
          if (citydata.city) {
            cityName = ' , ' + citydata.city.cityName;
            if (citydata.city.district) {
              distName = ' , ' + citydata.city.district.districtName;
              if (citydata.city.district.state) {
                stateName = ' , ' + citydata.city.district.state.stateName;
              }
            }
          }
        }
    }
        this.addressList[0].addr = this.addressList[0].addr + '|' + cityName +  distName + stateName;
         this.msaSelectedData.msaCustAddrs=this.addressList;
         let val = Math.floor(Math.random() * (1000 + 5000)) + 1000;
         this.msaSelectedData.originatingSrc='PROPELI';
        // for uppercase
        this.msaSelectedData.gstinNum=this.msaSelectedData.gstinNum.toUpperCase();
        this.msaSelectedData.pan=this.msaSelectedData.pan.toUpperCase();
        this.msaSelectedData.custName = this.msaSelectedData.custName.toUpperCase();
        this.msaSelectedData.contactPerson = this.msaSelectedData.contactPerson.toUpperCase();
        this.msaSelectedData.cneeCnor=ELEMENT_POST_DATA;
        this.contractservice.postMSAPropeli(this.msaSelectedData)
        .subscribe(data => {
          let ob = ErrorConstants.validateException(data);
          if (ob.isSuccess) {
          this.spinner.hide();
          this.sharedSearchdata.changeMessage(data);
          if(data.status && data.status=='PARTIAL')
                    {
                      this.tosterservice.success("Partially saved: Consigner consignee not mapped!");
                    }

          this.router.navigate(['contract/msaopportunity'], {skipLocationChange: true});
      
          }else {
            this.tosterservice.error(data.errors.error[0].description);
            this.regAddress = oldaddr;
            this.spinner.hide();
          }
        },

    error => {
      console.log("error received:",error)
      this.regAddress = oldaddr;
      this.tosterservice.error(error.error.errors.error[0].description);
      this.spinner.hide();
    }
        );   
  
    }

//function to fetch consignee and consignor data    
getConsigneeConsignerData() {
  if(this.msaSelectedData && this.msaSelectedData.id>0 &&(!ELEMENT_POST_DATA || ELEMENT_POST_DATA.length<=0)){
  
 // let pMsaCustId=1915;
  this.contractservice.getCneeCnorData(this.msaSelectedData.id).subscribe(cneeCnorData => {

           let ob = ErrorConstants.validateException(cneeCnorData);
        if (ob.isSuccess) {
          ELEMENT_POST_DATA=[];
          console.log("connee returned:",cneeCnorData);
          for (let i = 0; i < cneeCnorData.data.referenceData.msaCneeList.length; i++) {
          cneeCnorData.data.referenceData.msaCneeList[i].city = cneeCnorData.data.referenceData.msaCneeList[i].city;
          cneeCnorData.data.referenceData.msaCneeList[i].pincode = cneeCnorData.data.referenceData.msaCneeList[i].pincode;
          cneeCnorData.data.referenceData.msaCneeList[i].address = cneeCnorData.data.referenceData.msaCneeList[i].addrBook.addr1 + ' ' +
          cneeCnorData.data.referenceData.msaCneeList[i].addrBook.addr2 + ' '  + cneeCnorData.data.referenceData.msaCneeList[i].addrBook.addr3;
    }
    for (let i = 0; i < cneeCnorData.data.referenceData.msaCnorList.length; i++) {
      cneeCnorData.data.referenceData.msaCnorList[i].city = cneeCnorData.data.referenceData.msaCnorList[i].city;
      cneeCnorData.data.referenceData.msaCnorList[i].pincode = cneeCnorData.data.referenceData.msaCnorList[i].pincode;
      cneeCnorData.data.referenceData.msaCnorList[i].address = cneeCnorData.data.referenceData.msaCnorList[i].addrBook.addr1 + ' ' +
      cneeCnorData.data.referenceData.msaCnorList[i].addrBook.addr2 + ' '  + cneeCnorData.data.referenceData.msaCnorList[i].addrBook.addr3;
    }
          ELEMENT_POST_DATA.push.apply(ELEMENT_POST_DATA,cneeCnorData.data.referenceData.msaCneeList);
          ELEMENT_POST_DATA.push.apply(ELEMENT_POST_DATA,cneeCnorData.data.referenceData.msaCnorList);
          console.log('element post data after call',ELEMENT_POST_DATA);
          this.dataSource = new MatTableDataSource(ELEMENT_POST_DATA);
      
          ELEMENT_POST_DATA.forEach(element => {
            for(let cc of this.consignTypeList){
              if(cc.id==element.lkpConsigntypeId){
                element['lkpConsigntypeName']= cc.lookupVal
              }
            }
          });
        }else {
          this.tosterservice.error(ob.message);
          this.spinner.hide();
        }
       
  },error=>{
    console.log("error in getting cneeCnor data")
  });
}
}

  //dialog box for consigner consignee
  openDialog(): void {
    const dialogRef = this.dialog.open(ConsignorAddition, {
      maxWidth: '100%',
      panelClass: 'creditDialog',
      disableClose: true,
      backdropClass: 'backdropBackground',
      data: {AddressType: this.AddressType,concneeList: JSON.parse(JSON.stringify(ELEMENT_POST_DATA))}
    });
    dialogRef.afterClosed().subscribe(result => {
      
      let temp:any[] = [...this.dataSource.data, ...ELEMENT_POST_DATA]
      ELEMENT_POST_DATA = temp;
      this.dataSource = new MatTableDataSource(temp);  
    });
  }  





//Open Dialog box for branch location
openBaseLDialog(): void {
  let branchName = ""
  const dialogBaseLRef = this.dialog.open(BaseLocationSearchMSA, {disableClose: true,
    panelClass: 'creditDialog',
    data: {branchName:this.msaSelectedData.baseLocation}
  });

  dialogBaseLRef.afterClosed().subscribe(result => {
    console.log(result,'The dialog was closed');
    if(result){
    this.msaSelectedData.baseLocation=result.branchName
    this.msaSelectedData.baseLocationBranchId=result.branchId
    }
  });
} 

displayedColumns: string[] = [ 'name', 'lkpConsigntypeName', 'panNum', 'gstinNum', 'tanNum', 'mob', 'addr1', 'city', 'pincode', 'dealerCode'];
dataSource = new MatTableDataSource(ELEMENT_DATA);
    
pincodeData:any = [];
pincodeError:any;
pincodeSearch(str){ 
  if(str.term.length>6){
  console.log(str, 'print str')
  return false
  }
  if(str){
    if(str.term.length > 3 && str.term){
      this.pincodeError=false;
      this.contractservice.getAddrByPincode(str.term)
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
              //val["city"] = val.city.cityName;
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

  export interface DialogData {
    AddressType: any[];
    concneeList: any[];
}
  
var ELEMENT_DATA: Element[] = [];
var ELEMENT_POST_DATA: Element[] = []; 
@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'consignor_Open_MSA.html',
    styleUrls: ['../../core.css']
  
  })
  export class ConsignorAddition implements OnInit {

    pastedText
    address1Error: boolean;
    isAddressChecked: boolean=false;
    addressData: any;
    addressDatalength: any;
    onPaste(event: ClipboardEvent) {
      var re = /^[0-9]+$/;
      this.pastedText = Number(event.clipboardData.getData('text'));
      if(re.test(this.pastedText)){
        console.log("test")
      }
      else{
        event.preventDefault();
      }
    }
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
      public dialogRef: MatDialogRef<ConsignorAddition>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,private spinner: NgxSpinnerService, private tosterservice: ToastrService, private formBuilder: FormBuilder, public dialog: MatDialog, private _contractService: ContractService, private router: Router, private ChangeDetectorRef: ChangeDetectorRef) { }
    //for consignor and consignee
    AddressType:any[];
    concneeList:any[];
    ngOnInit() {
      
      ELEMENT_POST_DATA = []
      this.dataSource1 = null
      this.AddressType = this.data.AddressType;
      this.concneeList = this.data.concneeList;
    }
    value1 = '';
    displayedColumns: string[] = ['name', 'lkpConsigntypeName', 'panNum', 'gstNum', 'tanNum', 'mob', 'address', 'city', 'pincode', 'dealercode', 'delete'];
    dataSource1 = new MatTableDataSource(ELEMENT_POST_DATA); 

  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource1.filter = filterValue;
      
    }
    removeData(vall, j) {
      
      // for (let i = 0; i < ELEMENT_POST_DATA.length; i++) {
      // }
      ELEMENT_POST_DATA.splice(j, 1);
      this.ChangeDetectorRef.detectChanges();
      this.dataSource1 = new MatTableDataSource(ELEMENT_POST_DATA);
  
    }

    closeDialog(): void {
      
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
   
    PanChk=false;
    panLength=false;
    onPanChange(num) {
      if(num.length>0) {
        this.PanChk= Validation.panValidation(num);
        this.panLength = true;
      } else {
        this.panLength = false;
        this.PanChk = false;
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

    GstinChk=false;
    onGstinChange(num){
      this.GstinChk= Validation.gstinValidation(num);
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
                console.log(JSON.stringify);
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


    address
    model: any = {
      addresstwo:'',
      addressone:''
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
              var consignorTYpe
              this.model.address = addrBook.addr1 + ' ' + addrBook.addr2 + ' ' + addrBook.addr3;
              if(this.model.tanNum)
                this.model.tanNum=this.model.tanNum.toUpperCase();
              if(this.model.gstinNum)
                this.model.gstinNum=this.model.gstinNum.toUpperCase();
              if(this.model.panNum)
                this.model.panNum=this.model.panNum.toUpperCase();

              let dataList ={
                name: this.model.name, lkpConsigntypeId: this.model.lkpConsigntypeId,
                panNum: this.model.panNum, gstinNum: this.model.gstinNum, tanNum: this.model.tanNum, mob: this.model.mob,
                address: this.model.address, city: city.cityName, pincode: tempPin.toString(), addrBookId: addrBookId, addrBook: addrBook, dealerCode: this.model.dealerCode,
                msaCustId: this.model.msaCustId, lkpConsigntypeName: this.ccname
              }
              ELEMENT_POST_DATA.push(dataList);
              this.dataSource1 = new MatTableDataSource(ELEMENT_POST_DATA);
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



    onChange(e: any) {
      console.log("ischeck"+this.isAddressChecked)
      this.model.id = null;
      this.model.addressone = '';
      this.model.addresstwo = '';
      this.model.pincode = null;

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
    pincodeData:any;
    pincodeError:any;
    pincodeSearch(str){ 
      if(!this.isAddressChecked){
      if(str){
        if(str.term.length > 3 && str.term){
          this.pincodeError=false;
          this._contractService.getAddrByPincode(str.term)
            .subscribe(success => {
              this.pincodeData = [];
              let ob = ErrorConstants.validateException(success);
              if (ob.isSuccess) {
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
    emptyPincodeData(){
      this.pincodeData=[];
    }
    onClear(){
      this.address1Error = false;
      this.pincodeError=false;
    }

    clickBodyElem(event) {
      this.pincodeError=false;
     }
  
  saveMsa() {
      console.log("savemsa called");
      this.dialogRef.close();     
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

 //PinCodeSearch Ends
  
  
  }
///Element interface
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
  
 

 //class and component for branch location diaglog box
 export interface SearchBrData {branchName: any, branchId:any }
 @Component({
  selector: "dialog-base-location-dialog",
  templateUrl: "advance_search_msa.html",
  styleUrls: ["../../core.css"]
})
 export class BaseLocationSearchMSA { 
  model: any = {};
  twoAPIdata: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SearchBrData,
    public dialogBaseLRef: MatDialogRef<BaseLocationSearchMSA>,
    public dialog: MatDialog,
    private httpservice: HttpClient,
    private _contractService: ContractService,
    public router: Router,
    private spinner: NgxSpinnerService,
    private tosterservice: ToastrService,
  ) {}
  ngOnInit() { 
    this.model.search='NAME';
    console.log(this.data.branchName);
  }
  
  closeDialog(): void {
    // this.dialogBaseLRef.close();
    
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      data:{message:'Are you sure ?'},
      panelClass: 'creditDialog',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if(value){
        this.dialogBaseLRef.close();
      }else{
        console.log('Keep Open');
      }
    });

  }
  
  searchBranchFlag: boolean = false;
  advanceFlag() {
    this.searchBranchFlag = true;
  }
  //default Branch Advance Search
  showData: any = [];
  tableData: any = [];
  tabledataLength;

  pastedText
  onPaste(event: ClipboardEvent) {
    var re = /^[0-9]+$/;
    this.pastedText = Number(event.clipboardData.getData('text'));
    if(re.test(this.pastedText)){
      console.log('1')
    }
    else{
      event.preventDefault();
    }
  }


  advanceDefaultBranchName() {
    
    if (this.model.search == "NAME") {
      let searcgObj = this.model.searchbyname.toUpperCase();
      this._contractService.searchBranchByName(searcgObj)
        .subscribe(success => {
          let ob = ErrorConstants.validateException(success);
          if (ob.isSuccess) {
            this.twoAPIdata = success.data.responseData;
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
              this.twoAPIdata.sort((a, b) => {
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

            for (let data of this.tableData) {
              if (data.branchType == 'CORPORATE') {
                data.regionBranch = '';
              } else if (data.branchType == 'REGION') {
                data.regionBranch = data.branchName;
              }
            }
            this.tabledataLength = this.tableData.length;
            for (let advanceValue of this.twoAPIdata) {
              this.showData.push(advanceValue);
            }
          } else {
            this.tosterservice.error(ob.message);
            this.spinner.hide();
          }
        },
          error => {
            this.tosterservice.error(ErrorConstants.getValue(404));
            this.spinner.hide();
          });
    }
  }
  filterDataByAreaList(branch){
    this.data.branchName=branch.branchName; 
    this.data.branchId = branch.branchId;
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
  // end branch location diaglogue component
