import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ContractUpdateComponent } from 'src/app/dialog/contract-update/contract-update.component';
import { BookingAssociateContractUpdateComponent } from 'src/app/dialog/booking-associate-contract-update/booking-associate-contract-update.component';
import { Router } from "@angular/router";
import { AppSetting } from 'src/app/app.setting';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from 'src/app/core/services/api.service';
import { AuthorizationService } from '../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-create-associate-contract',
  templateUrl: './create-associate-contract.component.html',
  styleUrls: ['./create-associate-contract.component.css']
})
export class CreateAssociateContractComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['contactFname', 'crtdDt', 'vendorDeptt','gstinNum', 'panNum', 'mob', 'status', 'kycFlag','version', 'edit'];

  associateList=[];
  dataSource: any;
  assocDeptList:any=[];
  minchar:boolean= false;
  nomatch: boolean=false;
  perList: any = [];
  associateListActive
  assocDeptListActive
  associateListInactive
  assocDeptListInactive
  tempData: any = [];
  tempData1: any = [];
  assocDeptListTemp: any

  constructor(private spinner: NgxSpinnerService,public dialog: MatDialog,public appservice:ApiService,private router: Router,
    private authorizationService : AuthorizationService,
              private permissionsService: NgxPermissionsService) { }
 

   
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.authorizationService.setPermissions('ASSOCIATE');
    this.perList = this.authorizationService.getPermissions('ASSOCIATE') == null ? [] : this.authorizationService.getPermissions('ASSOCIATE');
    this.authorizationService.setPermissions('CONTRACT');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('CONTRACT'));
    this.permissionsService.loadPermissions(this.perList);
    this.spinner.show();
    this.apiCallForActiveData();
  }

  apiCallForActiveData() {
    this.appservice.get("secure/v1/associates/status/1")
    .subscribe((suc)=>{
      console.log('suc', suc);
      // this.spinner.hide();
      this.associateListActive=suc.data.responseData;
      this.assocDeptListActive = suc.data.referenceData.assocDeptList;
      this.tempData1 = this.associateListActive;

      this.dataSource = new MatTableDataSource(this.tempData1);
      this.assocDeptList = this.assocDeptListActive;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.apiCallForInactiveData();
    },(err)=>{
      this.spinner.hide();
    });
  }

  apiCallForInactiveData() {
    this.appservice.get("secure/v1/associates/status/0")
    .subscribe((suc)=>{
      this.associateListInactive=suc.data.responseData;
      this.assocDeptListInactive = suc.data.referenceData.assocDeptList;
      this.tempData = this.tempData1.concat(this.associateListInactive)
      this.assocDeptListTemp = this.assocDeptListActive.concat(this.assocDeptListInactive);
      this.dataSource = new MatTableDataSource(this.tempData);
      this.assocDeptList = this.assocDeptListTemp;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    },(err)=>{
      this.spinner.hide();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
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
      if( this.dataSource.filteredData.length > 0){
        this.nomatch = false;
      }
      else{
        this.nomatch = true;
      }
    }
  }

  openContractUpdateModal() {
    let dialog = this.dialog.open(ContractUpdateComponent, {
      width: '50vw',
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
  }

  openBookingContractUpdateModal() {
    this.dialog.open(BookingAssociateContractUpdateComponent, {
      width: '30vw',
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
  }


  //------------------------Edit Associate contract------------------//

  edditAssociateContract(data)
  {
    console.log(data,data.id);
    AppSetting.associateId=data.id;
    this.router.navigate(['/asso_delivery-contract/create-associate'], {skipLocationChange: true});

  }


   //------------------------Show Associate Contract ------------------//

   ShowAssociateContract(data)
   {
     console.log(data,data.id);
     AppSetting.associateId=data.id;
     let id=data.id;
     this.router.navigate(['/asso_delivery-contract/create-associate',  {id:id} ], {skipLocationChange: true});
   }

 //------------------------NEW Associate contract------------------//

  addNewAssociateContract()
  {
    AppSetting.associateId=null;
    this.router.navigate(['/asso_delivery-contract/create-associate'], {skipLocationChange: true});
  }

  /*------------ open contract page ------------ */
  goToContract(data) {
    AppSetting.associateId = data.id;
    AppSetting.contractId = null;
    AppSetting.associateObject = data;
    this.router.navigate(['/asso_delivery-contract/assign-associate'], {skipLocationChange: true});
  }

 
}