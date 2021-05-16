import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort } from '@angular/material';
import { BookingInformationService } from 'src/app/core/service/booking-information.service';
import { NgxSpinnerService } from "ngx-spinner";
import { CommonService } from 'src/app/core/common.service';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {
  sfxflag:boolean=false;
  minchar:boolean= false;
  nomatch: boolean=false;
  searchtext='';
  displayedColumns = ['custName'];
  displayedColumns1 = ['cntrCode']
  branchId= JSON.parse(sessionStorage.getItem("branchId"))
  userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  headerData = {
    branchCode: "02",
    journeyId: "01",
    originUserType: "03",
    branchId: this.branchId,
    userId: this.userDetails.userId,
  } as any;
  headerData2 = {
    branchCode: "02",
    journeyId: "01",
    originUserType: "03",
    branchId:  JSON.stringify(this.branchId),
    userId: this.userDetails.userId,
  };
  contractType:'';
  dataSource: MatTableDataSource<any>;
  dataSource1: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private $bookingInfo: BookingInformationService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<SearchCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog,
    private common: CommonService,
    ) { }

  ngOnInit() {
    // this.spinner.show();
     
      console.log(this.data);
      if(this.data.type === 'MULTI-MSA'){
        
        this.dataSource = new MatTableDataSource(this.data.msaName);
        this.dataSource.sort = this.sort;
        this.spinner.hide();
      }
      if(this.data.type === 'MULTI-CONTRACT'){
        
        this.dataSource1 = new MatTableDataSource(this.data.msaName);
        // this.dataSource1.sort = this.sort;
        this.spinner.hide();
      }
this.contractType=this.data.contractType;
    // this.$bookingInfo.msaDetailByMsaName(this.data.msaName , this.headerData).subscribe( resp => {
    //   console.log(resp);
    //   this.dataSource = new MatTableDataSource(resp);
    //   this.spinner.hide();
    // });
  }
  
  getMsaList(){
    this.dataSource = new MatTableDataSource(this.data.msaName);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if(!this.sfxflag){
      if (filterValue.length > 0 && filterValue.length<3){
        this.nomatch = false;
        this.minchar= true
        this.dataSource.filter = null;  
      }
      else if (filterValue.length == 0) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.minchar = false;
        this.nomatch = false;
      }
      else {
        this.minchar= false
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if( this.dataSource.filter.length == 0){
          this.nomatch = true
        }
      }
    }
    if(this.sfxflag){
      if (filterValue.length > 0 && filterValue.length<3){
        this.nomatch = false;
        this.minchar= true
        this.dataSource1.filter = null;  
      }
      else if (filterValue.length == 0) {
        this.dataSource1.filter = filterValue.trim().toLowerCase();
        this.minchar = false;
        this.nomatch = false;
      }
      else {
        this.minchar= false
        this.dataSource1.filter = filterValue.trim().toLowerCase();
        if( this.dataSource1.filter.length == 0){
          this.nomatch = true
        }
      }
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  closeDialog() {
    console.log(this.data);
    this.dialogRef.close(this.data);
  }
  OpenSfxcode(customerId){
    // this.spinner.show();
    
    console.log(customerId);
    this.$bookingInfo.getContractByContractTypANDMsaId(this.contractType, customerId , this.headerData).subscribe(resp => {
      console.log(resp, 'cntrCode');
      if(resp){
this.searchtext='';
        if(resp.length == 1){
          this.data = resp[0].cntrCode;
          this.closeDialog();
          this.spinner.hide();
        }else if(resp.length > 1){
          this.sfxflag=true;
          this.dataSource1 = new MatTableDataSource(resp);
          // this.dataSource1.sort = this.sort;
          this.spinner.hide();
        }else{
           this.common.showMessage(`Search MSA have no contract code !`, 'danger')
        }
      }
    });
  }

  onSelectedContract(el){
    console.log(el);
    this.data = el.cntrCode;
  }
}

export interface DataElement {
  name: string;

}
const ELEMENT_DATA: DataElement[] = [
  { name: 'Tata Motors'},
  { name: 'MSA'},
  {name: 'Eicher'},
  { name: 'Goodeirth'}
];