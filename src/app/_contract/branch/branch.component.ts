import { Component, OnInit, Inject, HostListener, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ContractService } from '../contract.service';
import { ErrorConstants } from '../models/constants';
import { AppSetting } from '../../app.setting';
import { HttpClient } from "@angular/common/http";
import { confimationdialog } from '../confirmationdialog/confimationdialog';
import { DatePipe } from '@angular/common';
import { MatExpansionPanel } from '@angular/material';
import { modelMSA } from '../modelMSA';
import { DataService } from '../msa/sharedata.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from '../services/authorization.service';

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

var ELEMENT_POST_DATA: Element[] = [];
var ELEMENT_DATA: Element[] = [];

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['../core.css']
})
export class BranchComponent implements OnInit {
  branchAssignModel: any = {
    assignBranch: [],
    referenceList: []
  };
  editflow: boolean;
  msaLevel: string;
  retailCode: string;
  isValid: boolean = false;
  isValidBtn: boolean = false;
  isValidBranch: boolean;
  perList: any = [];
  branchDelList:any=[];
  constructor(public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private contractservice: ContractService,
    private tosterservice: ToastrService,
    private datePipe: DatePipe,
    private acrouter: ActivatedRoute,
    private sharedSearchdata: DataService,
    public router: Router,
    private authorizationService: AuthorizationService,
    private permissionsService: NgxPermissionsService
  ) { }

  @ViewChild('first', { static: false }) first: MatExpansionPanel;
  @ViewChild('second', { static: false }) second: MatExpansionPanel;
  @ViewChild("fbranch", null) fbranch: any;
  
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  ngOnInit() {
    this.authorizationService.setPermissions('BRANCH');
    this.perList = this.authorizationService.getPermissions('BRANCH') == null ? [] : this.authorizationService.getPermissions('BRANCH');
    this.authorizationService.setPermissions('CONTRACT');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('CONTRACT'));
    this.permissionsService.loadPermissions(this.perList);


    // ELEMENT_POST_DATA = []
    this.acrouter.params.subscribe(params => {
      if (params['editflow']) {
        this.editflow = params['editflow'];
      }
    });
    this.sharedSearchdata.currentMSALevel.subscribe(level => this.msaLevel = level);

    this.sharedSearchdata.currentRetailCode.subscribe(code => this.retailCode = code);
    this.spinner.show();
    this.getBranch();
  }

  getBranch() { 
    this.spinner.show();
    this.contractservice.getAssignBranchEntity("MSA CLUSTER", AppSetting.contractId, this.editflow)
      .subscribe(
        success => {
          if (success.data.responseData.length === 0) {
            this.isValidBtn = true;

          } else {
            this.isValidBranch = true;
          }
          console.log(success.data.responseData.length)
        
          this.branchAssignModel.assignBranch = success.data.responseData;
          this.branchAssignModel.referenceList = success.data.referenceData;
          this.spinner.hide();
        },
        error => {
          this.tosterservice.error(ErrorConstants.getValue(404));
          this.spinner.hide();
        });
  }

  dateformat(field) {
    field.effectiveDt = this.datePipe.transform(field.effectiveDt, 'yyyy-MM-dd')
    field.expDt = this.datePipe.transform(field.expDt, 'yyyy-MM-dd')
  }
  branchAssignment() {
    this.isValid = true;
    this.isValidBtn = true;
    let branchAssign: any = {
      bkngBranchId: 0,
      bkngBranchName: '',
      dlvryBranchHoldFlag: 0,
      effectiveDt: '',
      lkpBkngBranchHoldRsn: '',
      entityId: AppSetting.contractId,
      expDt: '',
      assignBranchLevel: "MSA CLUSTER",
      branchPinCneeCnorMap: []
    };
    if (!this.branchAssignModel) {
      this.branchAssignModel = [];
    }
 
    this.branchAssignModel.assignBranch.push(branchAssign);
    console.log(this.branchAssignModel.assignBranch , this.branchAssignModel.ass)
  }

  checkbranch()
  {

    if(this.branchAssignModel.assignBranch.length === 0 )
    {
      return true;
    }else{
      return false;
    }
    
  }

  postBranch(form) {
    if (!this.isValidBtn) {
      this.spinner.show();
    
      for (let data of this.branchAssignModel.assignBranch) {
        if (!data.expDt) {
          data.lkpBkngBranchHoldRsn = '';
        }
      }
     
           this.branchAssignModel.assignBranch.push.apply(this.branchAssignModel.assignBranch,this.branchDelList);
          let tempBranch = [];
           this.branchAssignModel.assignBranch.forEach(element => { 
             if(element.status != AppSetting.deleteId){
              tempBranch.push({name:element.bkngBranchName,number: element.branchPinCneeCnorMap.filter(obj =>obj.status === AppSetting.activeId).length});
             }
            
           });
        console.log(tempBranch,":::",this.branchAssignModel.assignBranch)
        if(tempBranch.find((suc)=> suc.number == 0) === undefined ){
       
              this.contractservice.postBranch(this.branchAssignModel.assignBranch, this.editflow, AppSetting.contractId)
                .subscribe(success => {
                  let ob = ErrorConstants.validateException(success);
                  if (ob.isSuccess) {
                    this.isValidBranch = true;
                    this.branchDelList=[];
                    this.tosterservice.success('Save Successfully');
                    this.getBranch();
                  } else {
                    this.tosterservice.error(ob.message);
                     this.spinner.hide();
                  }
                },
                  error => {
                    this.tosterservice.error(ErrorConstants.getValue(404));
                    this.spinner.hide();
                  });
        
        }else{
              let  fname:string=" ";
             const result = tempBranch.filter((item)=>item.number == 0);
             console.log(result,tempBranch)
            result.forEach((a)=>{
              fname=fname +','+a.name;
            });
      
          this.tosterservice.info("Add Consignor For "+ fname.slice(2)+" !");
          this.spinner.hide();
        
        }



    } else {
     let tempBranchCneecor=[];
      this.branchAssignModel.assignBranch.forEach(element => { 
        if(element.status != AppSetting.deleteId){
          tempBranchCneecor.push({name:element.bkngBranchName,number: element.branchPinCneeCnorMap.filter(obj =>obj.status === AppSetting.activeId).length});
        }
       
      });
      let  fname:string=" ";
      const result = tempBranchCneecor.filter((item)=>item.number == 0);
     result.forEach((a)=>{
       fname=fname +','+a.name;
     });
    //  let a= this.branchAssignModel.assignBranch.filter(word => word.branchPinCneeCnorMap.length === 0);
    console.log(this.branchAssignModel.assignBranch)
      this.tosterservice.info("Add Consignor For Branch "+ fname.slice(2)+"456 !");
    //  this.tosterservice.info("Add Consignor");
      this.spinner.hide();
     // ('');
    }

  }
 
  openBaseLDialogBr(field,id): void {

    let branchName = ""
    let brNameList = []
    for (let data of this.branchAssignModel) {
      if (data.bkngBranchName) {
        brNameList.push(data.bkngBranchName);
      }
    }
    const dialogBaseLRefB = this.dialog.open(BaseLocationAdvanceSearch, {
      disableClose: true,
      data: { branchName: field.bkngBranchName, branchNameList: brNameList }
    });
    dialogBaseLRefB.afterClosed().subscribe(result => {
      if (result && result.length != 0) {
        let dublicateBranchList:any=[];
        this.branchAssignModel.assignBranch.forEach((element) => {
          if (result.find(({ bkngBranchName }) => bkngBranchName === element.bkngBranchName) != undefined) {
          dublicateBranchList.push(element);
          let i =result.findIndex(x => x.bkngBranchName === element.bkngBranchName);
          result.splice(i,1);   
          } 
        });
        this.branchAssignModel.assignBranch.push(...result);
        this.branchAssignModel.assignBranch.splice(id, 1);
        let cloneOfObjectB = JSON.parse(JSON.stringify(this.branchAssignModel.assignBranch));
        this.branchAssignModel.assignBranch=cloneOfObjectB;

        if(dublicateBranchList.length != 0)
        {
          let  fname:string=" ";
          dublicateBranchList.forEach((a)=>{
            fname=fname +','+a.bkngBranchName;
          });
          this.tosterservice.info("Branch "+ fname.slice(2)+" Already Exist!");
            if(result.length === 0)
            {
              this.isValid = false;
              this.isValidBtn = false;
              
            }

        }
     
         
        }
  
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConsignorDialog,
      {
        disableClose: true,
      });
    dialogRef.afterClosed().subscribe(result => {

      // ELEMENT_POST_DATA.push(result)
      this.dataSource = new MatTableDataSource(ELEMENT_POST_DATA);
    });
  }

  deleteBranch(field,i){
   
   field.status=AppSetting.deleteId;
   let obj={...field}
    if(field.id)
    {
      this.branchDelList.push(obj);
      this.isValid = false;
      this.isValidBtn = false;
    } else {
      this.isValid = false;
      this.isValidBtn = false;
    }

    this.branchAssignModel.assignBranch.splice(i, 1);
   
    let cloneOfObjectB = JSON.parse(JSON.stringify(this.branchAssignModel.assignBranch));
    this.branchAssignModel.assignBranch=cloneOfObjectB;
  
   }
  // consiner 
  msaSelectedData: modelMSA = new modelMSA();
  displayedColumns: string[] = ['name', 'lkpConsigntypeId', 'panNum', 'gstinNum', 'tanNum', 'mob', 'addr1', 'city', 'pincode', 'dealerCode'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  consignTypeList = [];

  getConsigneeConsignerData() {
    if (this.msaSelectedData && this.msaSelectedData.id > 0 && (!ELEMENT_POST_DATA || ELEMENT_POST_DATA.length <= 0)) {

      // let pMsaCustId=1915;
      this.contractservice.getCneeCnorData(this.msaSelectedData.id).subscribe(cneeCnorData => {
        ELEMENT_POST_DATA = [];
        ELEMENT_POST_DATA.push.apply(ELEMENT_POST_DATA, cneeCnorData.data.referenceData.msaCneeList);
        ELEMENT_POST_DATA.push.apply(ELEMENT_POST_DATA, cneeCnorData.data.referenceData.msaCnorList);
        this.dataSource = new MatTableDataSource(ELEMENT_POST_DATA);

        ELEMENT_POST_DATA.forEach(element => {
          if (typeof element.lkpConsigntypeId != 'string') {
            element.lkpConsigntypeId = this.consignTypeList.find(x => x.id == element.lkpConsigntypeId).lookupVal;
          }
        });


      }, error => {
      });
    }
  }
  openCCDialog(field): void {

    const dialogCCRef = this.dialog.open(BranchConsignorMapplingDialog, {
      disableClose: true,
      width: '750px',
      data: { editflow: true, fData: field.branchPinCneeCnorMap },
    });

    dialogCCRef.afterClosed().subscribe(result => {
      if (result) {


        if (field.branchPinCneeCnorMap.length != 0) {
          this.isValid = false;
          this.isValidBtn = false;
          field.branchPinCneeCnorMap = result;
        } else {
          this.isValid = true;
          this.tosterservice.info("Add CONSIGNOR!");
        }
      }

      //else {
      //   field.branchPinCneeCnorMap.push.apply(field.branchPinCneeCnorMap, result);
      // }
    });
  }


  previewData() {
    if (this.isValidBranch) {
      if (this.editflow) {
        this.router.navigate(['/retail-contract/preview', { editflow: this.editflow }], { skipLocationChange: true });
      } else {
        this.router.navigate(['/retail-contract/preview'], { skipLocationChange: true });
      }
    } else {
      this.tosterservice.info("BRANCH IS  UNSAVE !");
    }
  }
  // Branch Validation
  minDate;
  maxDate;
  dateFormatEffective(field) {
    let effYear = parseInt(this.datePipe.transform(field.effectiveDt, 'yyyy'))
    if (effYear > 9999) {
      field.effectiveDt = "";
    } else {
      field.effectiveDt = this.datePipe.transform(field.effectiveDt, 'yyyy-MM-dd')
      field.expDt = this.datePipe.transform(field.expDt, 'yyyy-MM-dd')

      if (field.effectiveDt < this.minDate || field.effectiveDt > field.expDt) {
        field.isValidBranchEffectiveDt = true;
      }
      else {
        field.isValidBranchEffectiveDt = false;
      }
    }
  }

  dateFormatExpiry(field) {
    let expYear = parseInt(this.datePipe.transform(field.expDt, 'yyyy'))
    if (expYear > 9999) {
      field.expDt = "";
    } else {
      field.effectiveDt = this.datePipe.transform(field.effectiveDt, 'yyyy-MM-dd')
      field.expDt = this.datePipe.transform(field.expDt, 'yyyy-MM-dd')

      if (field.expDt < field.effectiveDt || field.expDt > this.maxDate) {
        field.isValidBranchExpiryDt = true;
      }
      else {
        field.isValidBranchExpiryDt = false;
      }
    }
  }

}
//Branch Serach pop
export interface SearchBrData {
  branchName: any
  branchId: any
  branchNameList: any
}
@Component({
  selector: "dialog-base-location-br",
  templateUrl: "branch_advance_search.html",
  styleUrls: ["../core.css"]
})
export class BaseLocationAdvanceSearch {
  model: any = {};
  twoAPIdata: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SearchBrData,
    public dialogBaseLRefB: MatDialogRef<BaseLocationAdvanceSearch>,
    public dialog: MatDialog,
    private httpservice: HttpClient,
    private contractService: ContractService,
    private tosterservice: ToastrService,
    private spinner: NgxSpinnerService,
    public router: Router,

  ) { }
  ngOnInit() {
    this.model.search = 'NAME';
  }
  onNoClick(): void {
    this.dialogBaseLRefB.close();
  }

  closeDialog(): void {
    // this.dialogBaseLRefB.close();
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      data: { message: 'Are you sure ?' },
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if (value) {
        this.dialogBaseLRefB.close();
      } 
    });
  }

  searchBranchFlag: boolean = false;
  advanceFlag() {
    this.searchBranchFlag = true;
  }
  //default Branch Advance Search
  showData: any = [];
  tableData: any;
  newData: any = [];
  tabledataLength;
  advanceSearch: boolean;
  advanceDefaultBranchName(str) {
    if (str) {
      this.advanceSearch = true;
      if (str.length > 2 && str) {
        this.advanceSearch = false;
        if (this.model.search == "NAME") {
          this.spinner.show();
          let searcgObj = this.model.searchbyname.toUpperCase();
          this.contractService.searchBranchByName(searcgObj)
            .subscribe(success => {
              let ob = ErrorConstants.validateException(success);
              if (ob.isSuccess) {
                this.twoAPIdata = {};
                this.tableData = {};
                this.spinner.hide();
                // this.newData = [];
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
                this.tosterservice.error(ob.message);
                this.spinner.hide();
              }
            },
              error => {
                this.tosterservice.error(searcgObj+' '+"Branch Not Found !");
                this.spinner.hide();
              });
        }
      }
    }
  }

  filterDataByAreaList(branch) {
    console.log(this.data,this.tableData);
    this.data.branchName = branch.branchName;
    this.data.branchId = branch.branchId;
  }

  filterCheckData(tdata)
  {
    let fdata= tdata.map(function(num) {
          if (num.checked === true) {
            return {
            bkngBranchId: num.branchId,
            bkngBranchName: num.branchName,
            dlvryBranchHoldFlag: 0,
            effectiveDt: '',
            lkpBkngBranchHoldRsn: '',
            entityId: AppSetting.contractId,
            expDt: '',
            assignBranchLevel: "MSA CLUSTER",
            branchPinCneeCnorMap: []
          }
         
          }
          });

    let udata = fdata.filter(function( element ) {
    return element !== undefined;
    });

    return udata;
  }

  //retail changes
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) { // esc [Close Dialog]
      event.preventDefault();
      if (document.getElementById('closeButton')) {
        let element: HTMLElement = document.getElementById('closeButton') as HTMLElement;
        element.click();
      }
    }
  }

}

// Consignor component Page 
export interface DialogData { }
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'consignor_Open_MSA.html',
  styleUrls: ['../core.css']
})
export class ConsignorDialog implements OnInit {
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
    public dialogRef: MatDialogRef<ConsignorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private spinner: NgxSpinnerService,
    private tosterservice: ToastrService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private contractservice: ContractService,
    private router: Router,
    private ChangeDetectorRef: ChangeDetectorRef) { }
  //for consignor and consignee
  // ELEMENT_POST_DATA = [];
  ngOnInit() {
    // this.ELEMENT_POST_DATA = []
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
    // const dialogRefConfirm = this.dialog.open(confimationdialog, {
    //   width: '300px',
    //   data:{message:'Are you sure ?'},
    //   disableClose: true,
    //   backdropClass: 'backdropBackground'
    // });
    // dialogRefConfirm.afterClosed().subscribe(value => {
    //   if(value){
    //     this.dialogRef.close();
    //   }else{
    //   }
    // });
  }
  PanChk = false;
  onPanChange(num) {
    if (num.length == 10) {
      var lastDgt = Number(num.charAt(num.length - 1));
      if (lastDgt == 0 || lastDgt == 1 || lastDgt == 2 || lastDgt == 3 || lastDgt == 4 || lastDgt == 5 || lastDgt == 6 || lastDgt == 7 || lastDgt == 8 || lastDgt == 9) {
        this.PanChk = true;
      }
      else {
        this.PanChk = false;
      }
    }
  }
  TanChk = false;
  onTanChange(num) {
    if (num.length == 10) {
      var lastDgt = Number(num.charAt(num.length - 1));
      if (lastDgt == 0 || lastDgt == 1 || lastDgt == 2 || lastDgt == 3 || lastDgt == 4 || lastDgt == 5 || lastDgt == 6 || lastDgt == 7 || lastDgt == 8 || lastDgt == 9) {
        this.TanChk = true;
      }
      else {
        this.TanChk = false;
      }
    }
  }

  address
  model: any = {}
  addElement(valid, form) {
    var city
    this.contractservice.getCity(this.model.pincode)
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
            var consignorTYpe
            this.model.address = this.model.Address + ', ' + this.model.addressone + ', ' + this.model.addresstwo;
            ELEMENT_POST_DATA.push({
              name: this.model.name, lkpConsigntypeId: this.model.lkpConsigntypeId,
              panNum: this.model.panNum, gstinNum: this.model.gstinNum, tanNum: this.model.tanNum, mob: this.model.mob,
              // address: this.model.address, city: city.cityName, pincode: this.model.pincode, addrBookId: addrBookId, addrBook: addrBook, dealerCode: this.model.dealerCode,
              address: this.model.address, city: city.cityName, pincode: this.model.pincode, addrBookId: addrBookId, addrBook: addrBook, dealerCode: this.model.dealerCode,
              msaCustId: this.model.msaCustId, lkpConsigntypeName: consignorTYpe
            })
            this.dataSource1 = new MatTableDataSource(ELEMENT_POST_DATA);
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
  saveMsa() {
    this.dialogRef.close();
  }

}
//Branch Consignor mapping  component Page

export interface DialogData { }
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'branch_consignor_Mapping.html',
  styleUrls: ['../core.css']
})
export class BranchConsignorMapplingDialog implements OnInit {
  searchStr: string;
  constructor(
    public dialogRef: MatDialogRef<BranchConsignorMapplingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService,
    private tosterservice: ToastrService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private contractservice: ContractService,
    private router: Router,
    private ChangeDetectorRef: ChangeDetectorRef) { }
  cneecnor = [];
  editFlow: boolean = false;

  ngOnInit() {
    //  this.spinner.show();
    //  this.spinner.show();
    console.log(this.data.fData, '')
    if (this.data.fData.length != 0) {
      var b: string = '';
      for (let a of this.data.fData) {
        if (a.status === AppSetting.activeId) {
          b = b + ',' + a.cneeCnorId;
        }

      }
      this.contractservice.getConsignorData(b.slice(1))
        .subscribe(success => {
          this.editFlow = true;
          success.data.referenceData.msaCnorList.forEach(element => {
            element.ischecked = true;
          });
          this.cneecnor = success.data.referenceData.msaCnorList;
          //    this.spinner.hide();    
        }, error => {
          //     this.spinner.hide();
        });
    }

  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  searchConsignor(str) {
    if (str.target.value) {
      if (str.target.value.length > 2 && str.target.value) {
        // str.target.value=null;
        this.spinner.show();
        this.contractservice.getConsignorForMapping(str.target.value)
          .subscribe(
            success => {
              this.spinner.hide();
              this.cneecnor = success.data.referenceData.msaCnorList;
              str.target.value = null;
            },
            error => {
              this.tosterservice.error(ErrorConstants.getValue(404));
              this.spinner.hide();
             }
          );

      }
    }
  }
  editArray = [];
  changeCheckProp() {
    //  console.log(this.editArray,'befor adding data',this.cneecnor)
    //   if (this.editFlow) {
    console.log(this.cneecnor, 'edit flow', this.data.fData)
    this.cneecnor.forEach(element => {

      if (element.ischecked == false && this.data.fData.find(({ cneeCnorId }) => cneeCnorId === element.id) != undefined) {
        this.data.fData.find(({ cneeCnorId }) => cneeCnorId === element.id).status = AppSetting.inactiveId;

      } else if (element.ischecked == true && this.data.fData.find(({ cneeCnorId }) => cneeCnorId === element.id) == undefined) {

        let data = {
          crtdBy: element.name,
          descr: element.name,
          status: AppSetting.activeId,
          updBy: "test123",
          cneeCnorId: element.id
        }
        this.data.fData.push(data)
        console.log(this.data.fData)
      }
    });

    console.log(this.data.fData)
    this.dialogRef.close(this.data.fData);

    // } else {
    //   this.editArray = [];
    //   this.cneecnor.forEach(element => {
    //     if (element.ischecked == true) {
    //       let data = {
    //         crtdBy: element.name,
    //         descr: element.name,
    //         status: 195,
    //         updBy: "test123",
    //         cneeCnorId: element.id
    //       }
    //       this.editArray.push(data)
    //     }
    //   });
    //   this.dialogRef.close(this.editArray);

    // }

  }
}

