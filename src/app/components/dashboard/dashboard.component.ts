import { Component, OnInit, ViewChild, Inject, Input, Output, EventEmitter } from '@angular/core';
import{ ContractversionComponent } from './../contractversion/contractversion.component';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { AppSetting } from 'src/app/app.setting';
import { ApiService } from 'src/app/core/services/api.service';
import{BookingAssociateContractUpdateComponent} from '../../dialog/booking-associate-contract-update/booking-associate-contract-update.component';
import { ErrorConstants } from 'src/app/core/models/constants';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';

import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers : [DatePipe]
})
export class DashboardComponent implements OnInit{
  minchar:boolean= false;
  nomatch: boolean=false;
  DdraftMode;
  DactiveContract;
  bookemarkedArray;
  value;
  myDate = new Date();
  currDate: string;
  activeStatusValue='ACTIVE';
  userName = JSON.parse(sessionStorage.getItem('all')).data.responseData.user.username;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input() editFlag: boolean;
 
  @Output() flagEdit: EventEmitter<boolean> =   new EventEmitter();

  constructor(private spinner: NgxSpinnerService, public router: Router, public dialog: MatDialog, private apiService: ApiService, private datePipe: DatePipe,private authorizationService : AuthorizationService,
    private permissionsService: NgxPermissionsService) { }

  displayedColumns: string[] = ['contactFname','cntrCode', 'vendorDeptt', 'mob', 'contractStartDate', 'contractCreationDate', 'version', 'edit'];
  dataSource: any;  //= ELEMENT_DATA;
  dashboardTotalCount: any = new Object();
  selectedValue: string = 'ACTIVE';
  perList : any = [];
  exAttrMap = new Map();
  exAttrKeyList =  [];
  exAttrKeyList1 =  [];
  exAttrKeyList2 =  [];
  dataEdit: any

  //start Greeting Message
  greeting() {
    let myDate = new Date();
    let hrs = myDate.getHours();

    let greet;

    if (hrs < 12)
      greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
      greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
      greet = 'Good Evening';
    return greet
  }
  //End Greeting Message

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  rfrencList:any;
  expiredArray: any;
  ngOnInit() {
    this.authorizationService.setPermissions('DASHBOARD');
    this.perList = this.authorizationService.getPermissions('DASHBOARD') == null ? [] : this.authorizationService.getPermissions('DASHBOARD');
    this.authorizationService.setPermissions('CONTRACT');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('CONTRACT'));
    this.authorizationService.setPermissions('COMMERCIAL');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('COMMERCIAL'));
    this.authorizationService.setPermissions('DEDUCTION');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('DEDUCTION'));
    this.permissionsService.loadPermissions(this.perList);
    console.log('perlist',this.perList);

    this.spinner.show();
    this.resetAppSetting();
    this.apiService.get("secure/v1/bookingcontract/all/ACTIVE").subscribe((suc) => {
      this.spinner.hide();    
      console.log('data', suc);
      
      this.rfrencList=suc.data.referenceData;
      AppSetting.deptRefList =this.rfrencList.assocDeptList;
      this.dataSource = new MatTableDataSource(suc.data.responseData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (err) => {
      this.spinner.hide();
    });

    this.apiService.get("secure/v1/bookingcontract/countAssociateContracts").subscribe((suc) => {
      this.dashboardTotalCount = suc.data.responseData;
    }, (err) => {

    });


  }
  newContract(){
    this.router.navigate(['/asso_booking-contract/create-associate-contract'], {skipLocationChange: true}).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }
  createContrctnavigartion(object) {
    if (object) {
      console.log('object', object);
      // return
      this.router.navigate(['asso_booking-contract/assign-associate'], {skipLocationChange: true}).then(nav => {
        AppSetting.associateId = object.id;
        AppSetting.associateObject = object;
        AppSetting.contractId = object.contractId;

        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
    }
  }

  resetAppSetting(){
    AppSetting.contractId = null;
    AppSetting.associateId = null;
    AppSetting.associateObject = null ;
    AppSetting.editStatus = null;
    AppSetting.wefDate = null;
  }
  setAppSetting(obj){
    let editStatusObj =  this.rfrencList.statusList.filter(obj1 => obj1.lookupVal === 'EDIT')
    AppSetting.contractId = obj.contractId;
    AppSetting.associateId = obj.id;
    AppSetting.associateObject = obj ;
    AppSetting.editStatus = editStatusObj[0].id;
    // AppSetting.editFlow:any ;

  }
  countData(value) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.minchar= false
    if (filterValue.length > 0 && filterValue.length<3){
      this.nomatch = false;
      this.minchar= true
      this.dataSource.filter = null;  
    } 
    else if (filterValue.length == 0) {
      this.minchar = false;
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

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilterForActiveData(value) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  //new Add
  drop(event: Event) { }


  goToMsa(user) { }

  openDialogContractVersion(data) {
    const dialogRefVersion = this.dialog.open(ContractversionComponent, {
      width: '690px',
      panelClass: 'mat-dialog-responsive',
      data: data
    //  disableClose: true,
    //  panelClass: 'creditDialog',
    //  backdropClass: 'backdropBackground'
    });

    dialogRefVersion.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  onSelectBlock(value: string) {
    if (value !== 'report') {
      this.selectedValue = value;
    }
    if (this.selectedValue === 'PENDING') {
      this.displayedColumns = ['contactFname', 'vendorDeptt', 'gstinNum', 'panNum', 'mob', 'contractStartDate', 'contractCreationDate'];
      this.callstatusapi("PENDING");
    } else if (this.selectedValue === 'EXPIRING') {
      this.displayedColumns = ['contactFname', 'vendorDeptt', 'gstinNum', 'panNum', 'mob', 'contractStartDate', 'contractCreationDate', 'version', 'edit'];
      this.callstatusapi("EXPIRING");
    } else if (this.selectedValue === 'DRAFT') {
      this.displayedColumns = ['contactFname', 'vendorDeptt', 'gstinNum', 'panNum', 'mob', 'contractStartDate', 'contractCreationDate'];
      this.spinner.show();
      this.callstatusapi("DRAFT");
    } else if (this.selectedValue === 'ACTIVE') {
      this.displayedColumns = ['contactFname','cntrCode', 'vendorDeptt', 'mob', 'contractStartDate', 'contractCreationDate', 'version', 'edit'];
      this.spinner.show();
      this.callstatusapi("ACTIVE");
    }else if (this.selectedValue === 'INACTIVE') {
      this.displayedColumns = ['contactFname', 'vendorDeptt', 'gstinNum', 'panNum', 'mob', 'contractStartDate', 'contractCreationDate', 'version'];
      this.spinner.show();
      this.callstatusapi("INACTIVE");
    }
  }

  callstatusapi(status) {
    this.spinner.show();
    this.apiService.get("secure/v1/bookingcontract/all/" + status).subscribe(success => {

      if (success) {
        this.dataSource = new MatTableDataSource(success.data.responseData);
        this.rfrencList=success.data.referenceData;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
      }
      else {

        this.spinner.hide();
      }
    },
      error => {

        this.spinner.hide();
      });
  }

  
  callexpiredstatusapi() {
    this.spinner.show();
    this.expiredArray=[];
    this.apiService.get("secure/v1/bookingcontract/all/ACTIVE").subscribe(success => {

      if (success) {
        success.data.responseData.forEach(element => {
          this.currDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
        if (element.expDt < this.currDate) {
          this.expiredArray.push(element);
          this.dataSource = new MatTableDataSource(this.expiredArray);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.spinner.hide();
        }
      });
      }
      else {

        this.spinner.hide();
      }
    },
      error => {

        this.spinner.hide();
      });
  }

  showSfxCodeData(data) { }


   /*----------- on click on edit icon in case of active contracts ------------ */
   showEditFlowPopup(data) {
     this.spinner.show();
     this.setAppSetting(data);
    
      /**  Call get contract API to set contract object */
    this.apiService.get('secure/v1/bookingcontract/'+AppSetting.contractId).subscribe(data => {
      let ob = ErrorConstants.validateException(data);
      if(ob.isSuccess){
        AppSetting.wefDate = data.data.responseData.effectiveDt;        // set effective date (w.e.f)
        this.spinner.hide();
        const dialogRef = this.dialog.open(BookingAssociateContractUpdateComponent, {
          width: '65vw',
          panelClass: 'mat-dialog-responsive',
          data: data,
        });
        dialogRef.afterClosed().subscribe(result => {

          if(!result){
            this.resetAppSetting();
          }
        });
      } else {
        this.spinner.hide();
      }
    },(error) => {
      this.spinner.hide();
    })
    
  }
  
  getStatus(data) {
    var isEdit = this.rfrencList.statusList.find(x => x.lookupVal === 'EDIT');
    if(isEdit !=undefined){
      if(isEdit.id == data.status){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

}

