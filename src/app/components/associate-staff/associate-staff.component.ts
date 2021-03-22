import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AppSetting } from 'src/app/app.setting';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthorizationService } from '../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-associate-staff',
  templateUrl: './associate-staff.component.html'
 
})
export class AssociateStaffComponent implements OnInit {
  minchar:boolean= false;
  nomatch: boolean=false;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private spinner: NgxSpinnerService, private apiService: ApiService, private router: Router,
              private authorizationService : AuthorizationService,
              private permissionsService: NgxPermissionsService,
              private toaster: ToastrService) { }

  displayedColumns: string[] = ['staffFname', 'crtdDt', 'ofcEmail', 'mob', 'Sedit'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  perList : any = [];

  ngOnInit() {
    this.authorizationService.setPermissions('ASSOCIATE');
    this.perList = this.authorizationService.getPermissions('ASSOCIATE') == null ? [] : this.authorizationService.getPermissions('ASSOCIATE');
    this.permissionsService.loadPermissions(this.perList);
    console.log('perlist',this.perList)

    this.getAssociateStaffList();
  }

  applyFilter(filterValue) {
    
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

  goToEditPage(id) {
    this.router.navigate(['/asso_booking-contract/create-associate-staff'], {skipLocationChange: true, queryParams: { id: id } });
  }

  getAssociateStaffList() {
    this.spinner.show();
    let assocId = AppSetting.associateId;
    console.log(assocId)
    this.apiService.get(`secure/v1/associates/staffs/associate/${assocId}`).subscribe((suc) => {
      console.log("success",suc)
      this.spinner.hide();
      this.dataSource = new MatTableDataSource(suc.data.responseData);
      setTimeout(() =>
      {
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
      });
    }, (err) => {
      this.spinner.hide();
    });
  }

  onSkipClick($event) {
    $event.preventDefault();
    this.router.navigate(['/asso_booking-contract/create-associate-contract'], { skipLocationChange: true });
  }

  onSubmitClick($event) {
    $event.preventDefault();
    this.toaster.success('Saved Successfully');
    this.router.navigate(['/asso_booking-contract/create-associate-contract'], { skipLocationChange: true });
  }


}

export interface PeriodicElement {
  id: number,
  staffFname: string,
  staffMname: string,
  staffLname: string,
  mob: number,
  altMob: number,
  emergencyPhone: number,
  whatsappNum: number,
  maritalStatus: string,
  ofcEmail: string,
  aadhaarNum: number
  panNum: string,
  dob: string,
  crtdBy: string,
  crtdDt: string,
  descr: string,
  dlNum: string,
  effectiveDt: string,
  estDt: string,
  expDt: string,
  gender: string,
  resAddr: string,
  status: number,
  updBy: string,
  updDt: string
}

const ELEMENT_DATA: PeriodicElement[] = [];
