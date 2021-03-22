import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { AppSetting } from 'src/app/app.setting';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { BookingCommercialCustomerListObj } from 'src/app/core/models/paymentTermsModel';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { confimationdialog } from '../confirmationdialog/confimationdialog';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  contractId :any;
  custType = 0;
  dataSourceCustomers:any =[];
  selectedCustomer: any = [];
  custObj: BookingCommercialCustomerListObj = {
    msaCustId: null,
    lkpAssocBkngPayoutCtgyId: 0,
    lkpAssocBkngExpnsTypeId: 0,
    maxAmtPerWaybl: 0,
    minAmtPerWaybl: 0,
    addtnlParamFlag: 0,
    lkpAssocAddtnlParamId: 0,
    addtnlParamVal: 0,
    cntrCode: '',
    effectiveDt: '',
    expDt: '',
    customerName: '',
    commercialEntList: []
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SearchCustomerComponent> ,public spinner: NgxSpinnerService, private apiService: ApiService, public toastr: ToastrService,public dialog: MatDialog) { 
    this.contractId = AppSetting.contractId;
 
  }

  ngOnInit() {
    console.log('data', this.data);
    this.getCustomersList();
  }

  custTypeChange(event){
    console.log("event", event, this.custType);
    this.getCustomersList();
  }
  // closeDailog(){
  //   this.dialogRef.close({ "customerList" : this.selectedCustomer});
  // }
  sendCustomerList: any[] = []; 
  setCustomers(obj){
    if(obj.msaCustId){
      this.sendCustomerList.push(JSON.parse(JSON.stringify(obj)));
    }else{
      this.custObj['msaCustId'] = Number(obj.msaId ? obj.msaId : obj.msaCustId);
      this.custObj['cntrCode'] = obj.contractCode;
      this.custObj['customerName'] = obj.customerName;
      this.custObj['branches'] = obj.branches;
      this.custObj['contractCode'] = obj.contractCode;
      this.sendCustomerList.push(JSON.parse(JSON.stringify(this.custObj)));
    }
    console.log('custObj', this.custObj);

    
  }

  setCustomerArray(obj){
    console.log('this.data.customerList', this.data.customerList);
    let tempArr = _.find(this.data.customerList , { 'msaCustId': obj.msaId });
    console.log('tempArr', tempArr);
    if(tempArr){
      tempArr['cntrCode'] = obj.contractCode;
      tempArr['customerName'] = obj.customerName;
      tempArr['branches'] = obj.branches;
      tempArr['contractCode'] = obj.contractCode;
      tempArr['checked'] = true;
      this.dataSourceCustomers.data.push(tempArr);
    }else{
      this.dataSourceCustomers.data.push(obj);
    }
  }
  getCustomersList(){
    this.spinner.show();
    this.dataSourceCustomers = new MatTableDataSource();
    // this.data.BranchIds = [1]; 
    let custType = (this.custType == 0) ? "CREDIT" : "PRC" ;        
      // this.spinner.show();
      this.apiService
        .post(`secure/v1/deliverycontract/commercial/assocBranchIds/customers?creditOrPrc=${custType}`, this.data.BranchIds )
        .subscribe(
          (res) => {             
            console.log('res', res);
            let tempRespose: any = [];
            if (res.data.responseData && res.data.responseData.length > 0) {
              tempRespose = (JSON.parse(JSON.stringify(res.data.responseData))) ;
              if(this.data.customerList.length > 0){
                tempRespose.forEach(element => {
                  this.setCustomerArray(element);
                });
                
              }else{
                this.dataSourceCustomers = new MatTableDataSource(
                  res.data.responseData
                );

              }
              this.dataSourceCustomers.sort = this.sort;
              this.dataSourceCustomers.paginator = this.paginator;
              console.log('this.dataSourceCustomers', this.dataSourceCustomers);

              this.spinner.hide();
            }else{
              this.toastr.error('Customer Not Exist in Branch');
              this.spinner.hide();
            }
          },
          (err) => {
            // this.toastr.error()
            this.toastr.error('Customer Not Exist in Branch');
            this.spinner.hide();
          }
        );
        
  
  }

  addCustomers(){
    this.dataSourceCustomers.data.forEach(obj => {      
      if(obj.checked){
        this.setCustomers(obj);
      }
    });

    this.dialogRef.close(this.sendCustomerList);
    console.log('customerts', this.sendCustomerList);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCustomers.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceCustomers.paginator) {
      this.dataSourceCustomers.paginator.firstPage();
    }
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
        this.dialogRef.close(false);
      }else{
        console.log('Keep Open');
      }
    });

  }

  displayedColumns: string[] = ['customerName', 'contractCode', 'Abranch'];
  dataSource = ELEMENT_DATA;

}

export interface PeriodicElement {
  Cname: string;
  sfxCode: string;
  Abranch: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Cname: '', sfxCode: '', Abranch: ''},
  {Cname: '', sfxCode: '', Abranch: ''},
  {Cname: '', sfxCode: '', Abranch: ''},
  {Cname: '', sfxCode: '', Abranch: ''},
  {Cname: '', sfxCode: '', Abranch: ''},
  {Cname: '', sfxCode: '', Abranch: ''},
];