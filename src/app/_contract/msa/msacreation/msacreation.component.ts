  import { modelMSA } from '../../modelMSA';
  import { Component, OnInit, Inject, Input } from '@angular/core';
  import { ContractService } from '../../contract.service';
  import { HttpClient } from "@angular/common/http";
  import { MatTableDataSource } from '@angular/material';
  import { Router} from '@angular/router';
  import { ChangeDetectorRef } from '@angular/core';
  import { FormBuilder, } from '@angular/forms';
  import { MatDialog } from '@angular/material/dialog';
  import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
  import { TosterService } from './../../toster.service';
  import { NgxSpinnerService } from "ngx-spinner";
  import { DataService } from "../sharedata.service";
  import { ErrorConstants }  from '../../models/constants';
//import { PancardDirective } from 'src/app/shared/pancard.directive';


  @Component({
    selector: 'app-msacreation',
    templateUrl: './msacreation.component.html',
    styleUrls: ["../../core.css"]

  })
  export class MsacreationComponent implements OnInit {

    @Input() src: string;
    ngOnChanges() {
      console.log("SRC"+this.src);
    }
    onSubmit
  msabehaviour:any={}
  referenceData:any={}
  msaSelectedData:modelMSA=new modelMSA();
  segmentDropdownList=[];
  subSegmentDropdownList=[];
  accountTypeDropdownList=[]
  addressList=[];
  regAddress={
    pincodeId :'',
    addr:''
  };
  consignTypeList=[];
 
constructor(private sharedSearchdata: DataService,
    private httpservice: HttpClient,
    public router: Router,private spinner: NgxSpinnerService,
    private contractservice: ContractService,public dialog: MatDialog, private tosterservice: TosterService) { }
    
  msadata:any
    ngOnInit() {
      ELEMENT_POST_DATA=[];
      //  this.sharedSearchdata.currentMessage.subscribe(msadata => msadata = msadata)
      
        this.msabehaviour["_value"]={}
        this.msabehaviour=this.sharedSearchdata.currentMessage.source;
        if(this.msabehaviour._value){
        this.msaSelectedData=this.msabehaviour._value.msadata;
        this.referenceData=this.msabehaviour._value.referenceData;
        }
        if(this.msaSelectedData!=undefined && this.msaSelectedData.accType!=undefined){
        this.msaSelectedData.accType=this.msaSelectedData.accType.toUpperCase();
        }
       console.log("msaselectedData retreived",this.msaSelectedData);
       this.sharedSearchdata.changeMessage(new modelMSA())
       this.segmentDropdownList=this.referenceData.segmentList;
       this.accountTypeDropdownList=this.referenceData.contractTypeList;
       this.consignTypeList=this.referenceData.consignType;
       this.createSubSegmentDownList();      
       if(this.msaSelectedData!=undefined && this.msaSelectedData.msaCustAddrs!=undefined && this.msaSelectedData.msaCustAddrs.length !=0 ){
        
         this.regAddress=this.msaSelectedData.msaCustAddrs[0];
      
       }
      
      this.dataSource = new MatTableDataSource(ELEMENT_POST_DATA);   
      // console.log("registred address",this.regAddress,this.accountTypeDropdownList);
    }

    showData: any = [];
tableData: any = [];
tabledataLength;
advanceDefaultBranchName(str){ 
  if(str){
    if(str.term.length > 2 && str.term){
      this.contractservice.searchBranchByName(str.term)
        .subscribe(success => {
            this.tableData = success.data.responseData;
            // for(let val of this.tableData){
            //   val["baseLocation"]= val.branchName;
            //   val["baseLocationBranchId"] = val.branchId;
            // }
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
      // if (this.postMSAData) {
      //   AppSetting.contractId = this.postMSAData
      //   this.router.navigate(['/retail-contract/service']);
      // }
  
    }

//function to post MSA data
    postMSAData() {
      this.spinner.show();
      this.addressList=[];
      this.addressList.push(this.regAddress);
         this.msaSelectedData.msaCustAddrs=this.addressList;
         let val = Math.floor(Math.random() * (1000 + 5000)) + 1000; 
         this.msaSelectedData.prdctCtgy='ELECTRONICS';
         this.msaSelectedData.originatingSrc='PROPELI';
         this.msaSelectedData.closeDt="2020-01-25";        
         if(ELEMENT_POST_DATA){
           ELEMENT_POST_DATA.forEach(element => {
             if(typeof element.lkpConsigntypeId != 'number'){
             element.lkpConsigntypeId = this.consignTypeList.find(x=>x.lookupVal==element.lkpConsigntypeId).id;
             }
           });           
         }
         this.msaSelectedData.cneeCnor=ELEMENT_POST_DATA;
      this.contractservice.postMSAPropeli(this.msaSelectedData)
        .subscribe(data => {
          console.log(data, "msa data")
          this.spinner.hide();
          this.sharedSearchdata.changeMessage(data);
          if(data.status && data.status=='PARTIAL')
                    {
                      this.tosterservice.Success("Partially saved:Consigner consignee not mapped!");
                    }

          this.router.navigate(['/retail-contract/msaopportunity']);
        },

    error => {
      console.log("error received:",error)
      this.tosterservice.Error(ErrorConstants.getValue(404));
      this.spinner.hide();
    }
        );   
  
    }

//function to fetch consignee and consignor data    
getConsigneeConsignerData() {
  if(this.msaSelectedData && this.msaSelectedData.id>0 &&(!ELEMENT_POST_DATA || ELEMENT_POST_DATA.length<=0)){
  
 // let pMsaCustId=1915;
  this.contractservice.getCneeCnorData(this.msaSelectedData.id).subscribe(cneeCnorData => {
    ELEMENT_POST_DATA=[];
    console.log("connee returned:",cneeCnorData);
    ELEMENT_POST_DATA.push.apply(ELEMENT_POST_DATA,cneeCnorData.data.referenceData.msaCneeList); 
    ELEMENT_POST_DATA.push.apply(ELEMENT_POST_DATA,cneeCnorData.data.referenceData.msaCnorList);
    console.log('element post data after call',ELEMENT_POST_DATA);
    this.dataSource = new MatTableDataSource(ELEMENT_POST_DATA);

    ELEMENT_POST_DATA.forEach(element => {
      //console.log("found dat",this.consignTypeList.find(x=>x.lookupVal==element.lkpConsigntypeId));
      if(typeof element.lkpConsigntypeId != 'string'){
        element.lkpConsigntypeId = this.consignTypeList.find(x=>x.id==element.lkpConsigntypeId).lookupVal;
      }
    });
     
       
  },error=>{
    console.log("error in getting cneeCnor data")
  });
}
}

  //dialog box for consigner consignee
  openDialog(): void {
    const dialogRef = this.dialog.open(ConsignorAddition, {disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('element post data after close',ELEMENT_POST_DATA);
      this.dataSource = new MatTableDataSource(ELEMENT_POST_DATA);
      
    });
  }  

//Open Dialog box for branch location
openBaseLDialog(): void {
  let branchName = ""
  const dialogBaseLRef = this.dialog.open(BaseLocationSearchMSA, {disableClose: true,
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

displayedColumns: string[] = [ 'name', 'lkpConsigntypeId', 'panNum', 'gstinNum', 'tanNum', 'mob', 'addr1', 'city', 'pincode', 'dealerCode'];
dataSource = new MatTableDataSource(ELEMENT_DATA);
    
  }

  export interface DialogData { }
  @Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'consignor_Open_MSA.html',
    styleUrls: ['../../core.css']
  
  })
  export class ConsignorAddition implements OnInit {
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
      @Inject(MAT_DIALOG_DATA) public data: DialogData,private spinner: NgxSpinnerService, private tosterservice: TosterService, private formBuilder: FormBuilder, public dialog: MatDialog, private _contractService: ContractService, private router: Router, private ChangeDetectorRef: ChangeDetectorRef) { }
    //for consignor and consignee
    ngOnInit() {
      ELEMENT_POST_DATA = []
      this.dataSource1 = null
    }
    AddressType: any[] = [{ id: 44, value: 'CONSIGNOR' },
                          { id: 45, value: 'CONSIGNEE' },
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

    closeDialog(): void {
      this.dialogRef.close();
    }
   
    PanChk=false;
    onPanChange(num){
    if(num.length==10){
        var lastDgt=Number(num.charAt(num.length-1));
        if(lastDgt==0 ||lastDgt==1||lastDgt==2||lastDgt==3||lastDgt==4||lastDgt==5||lastDgt==6||lastDgt==7||lastDgt==8||lastDgt==9){
           this.PanChk=true;
        }
        else{
          this.PanChk=false;
        }
      }
    }

    TanChk=false;
    onTanChange(num){
      if(num.length==10){
        var lastDgt=Number(num.charAt(num.length-1));
        if(lastDgt==0 ||lastDgt==1||lastDgt==2||lastDgt==3||lastDgt==4||lastDgt==5||lastDgt==6||lastDgt==7||lastDgt==8||lastDgt==9){
           this.TanChk=true;
        }
        else{
          this.TanChk=false;
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
            this.model.address = this.model.Address + ', ' + this.model.addressone + ', ' + this.model.addresstwo;
            console.log(this.model.address, "Hello Model.address")
            ELEMENT_POST_DATA.push({
              name: this.model.name, lkpConsigntypeId: this.model.lkpConsigntypeId,
              panNum: this.model.panNum, gstinNum: this.model.gstinNum, tanNum: this.model.tanNum, mob: this.model.mob,
              // address: this.model.address, city: city.cityName, pincode: this.model.pincode, addrBookId: addrBookId, addrBook: addrBook, dealerCode: this.model.dealerCode,
              address: this.model.address, city: city.cityName, pincode: this.model.pincode, addrBookId: addrBookId, addrBook: addrBook, dealerCode: this.model.dealerCode,
              msaCustId:this.model.msaCustId, lkpConsigntypeName: consignorTYpe
            })
            this.dataSource1 = new MatTableDataSource(ELEMENT_POST_DATA);
            console.log(city.cityName);
            form.reset();
            this.model.name = null
            this.model.lkpConsigntypeId = null
            this.model.address = null
            this.model.lkpConsigntypeId = null
            this.model.panNum = null
            this.model.gstinNum = null
            this.model.pincode = null
            this.model.mobileNum = null
            this.model.address = null
            this.model.dealerCode = null
            this.model.tanNum = null
            this.model.mob = null
            console.log("data build postdata:",ELEMENT_POST_DATA,"data build datasource",this.dataSource1);
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
  
  saveMsa() {
      console.log("savemsa called");
      this.dialogRef.close();     
    }
  
  
  
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
  
  var ELEMENT_DATA: Element[] = [
  
  ];
  var ELEMENT_POST_DATA: Element[] = [
  
  ];  

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
    private httpservice: HttpClient,
    private _contractService: ContractService,
    public router: Router,
    private spinner: NgxSpinnerService,
    private tosterservice: TosterService,
  ) {}
  ngOnInit() { 
    this.model.search='NAME';
    console.log(this.data.branchName);
  }
  
  closeDialog(): void {
    this.dialogBaseLRef.close();
  }
  
  searchBranchFlag: boolean = false;
  advanceFlag() {
    this.searchBranchFlag = true;
  }
  //default Branch Advance Search
  showData: any = [];
  tableData: any = [];
  tabledataLength;
  advanceDefaultBranchName() {
    
    if (this.model.search == "NAME") {
      let searcgObj = this.model.searchbyname.toUpperCase();
      this._contractService.searchBranchByName(searcgObj)
        .subscribe(success => {
          let ob = ErrorConstants.validateException(success);
          if (ob.isSuccess) {
            this.twoAPIdata = success.data.responseData;
            this.tableData = success.data.responseData;
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
            this.tosterservice.Error(ob.message);
            this.spinner.hide();
          }
        },
          error => {
            this.tosterservice.Error(ErrorConstants.getValue(404));
            this.spinner.hide();
          });
    }
  }
  filterDataByAreaList(branch){
    this.data.branchName=branch.branchName; 
    this.data.branchId = branch.branchId;
  }
  }
  // end branch location diaglogue component
