import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from "@angular/material";

import { NgxSpinnerService } from 'ngx-spinner';
import { AppSetting } from '../../app.setting';
import { AppService } from '../../core/services/app.service';
import { ApiService } from '../../core/services/api.service';
import { AuthorizationService } from '../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { confimationdialog } from 'src/app/dialog/confirmationdialog/confimationdialog';


@Component({
  selector: 'app-vehicle-allocation',
  templateUrl: './vehicle-allocation.component.html',
  styleUrls: ['./vehicle-allocation.component.css']
})
export class VehicleAllocationComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  displayedColumns: string[] = ['vehicleNum', 'vehicleMake', 'vehicleModelId', 'effectiveDt', 'expDt', 'status', 'Vicon'];
  dataSource : any;
  associateData : any;
  vehicleMakeList : any[] = [];
  vehicleModelList : any[] = [];
  deptName : any;
  perList: any = [];
  minchar:boolean= false;
  nomatch: boolean=false;
  assocType:string;
  refData:any;

  constructor(private spinner: NgxSpinnerService,
              private router : Router,
              private apiService : ApiService,
              private authorizationService : AuthorizationService,
              private permissionsService: NgxPermissionsService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.authorizationService.setPermissions('VEHICLE');
    this.perList = this.authorizationService.getPermissions('VEHICLE') == null ? [] : this.authorizationService.getPermissions('VEHICLE');
    this.authorizationService.setPermissions('DOCUMENT UPLOAD');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('DOCUMENT UPLOAD'));
    this.permissionsService.loadPermissions(this.perList);
    console.log('perList',this.perList)
    console.log('appsetting>>', AppSetting);

    this.associateData = AppSetting.associateData;
    this.refData = AppSetting.associateRefData;
    // if(this.associateData.assocTypeMaps[0].lkpAssocTypeId == 1934){
    //   this.assocType = " MARKET"
    // }
    // else{
    //   this.assocType = " REGISTERED"
    // }
    this.deptName = AppSetting.associateDepartment;
    this.spinner.show();
    this.apiService.get('secure/v1/associates/vehicles/associate/'+AppSetting.associateId).subscribe(res => {
        if(res.status == 'SUCCESS'){           
          this.vehicleMakeList = res.data.referenceData.vehicleMakeList;
          this.vehicleModelList = res.data.referenceData.vehicleModelList;
          let vehicleData = res.data.responseData;

          vehicleData.forEach(element => {
            element['vehicleMake'] = this.getVehicleMake(element.vehicleModelId);
            element['vehicleModel'] = this.getVehicleModel(element.vehicleModelId);
          });

          this.dataSource = new MatTableDataSource(vehicleData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          
        }
        this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
      })

  }

  submit(){
    const dialog = this.dialog.open(confimationdialog, {
      data: { message: "Do you want to create Associate Staff?"},
      disableClose: true,
      panelClass: 'creditDialog',
      width: '300px'  
    })

    dialog.afterClosed().subscribe(res => {
      if(res) {
        this.router.navigate(['/asso_booking-contract/associate-staff'], {skipLocationChange: true})
      } else {
        this.router.navigate(['/asso_booking-contract/asso_booking'], {skipLocationChange: true})
      }
    })
  }

  onBackClick($event) {
    $event.preventDefault();
    this.router.navigate(['/asso_booking-contract/associate-kyc'], { skipLocationChange: true });
  }

  addEditVehicle(id){
  AppSetting.vehicleId = id;
    this.router.navigate(['/asso_booking-contract/vehicle'], {skipLocationChange: true})
  }

  /*-------- Upload Vehicle Document ------- */
  addVehicleDocument(data) {
    AppSetting.vehicleId = data.id;
    AppSetting.vehicleNumber = (data.vehicleNum).toUpperCase();
      this.router.navigate(['/asso_booking-contract/vehicle-document'], {skipLocationChange: true});
  }
  /*---- get vehicle model ------- */
  getVehicleModel(modelId){
   var vehicleModel = this.vehicleModelList.find(x=> x.id == modelId);
   if(vehicleModel !== undefined){
     return vehicleModel.vehicleModelName;
   } else {
     return ''
   }
  }

  /*------- get vehicle Make name ------------ */
  getVehicleMake(modelId){
    var vehicleModel = this.vehicleModelList.find(x=> x.id == modelId);
    if(vehicleModel !== undefined){
    var vMake = this.vehicleMakeList.find(y => y.id == vehicleModel.vehicleMakeId);
    if(vMake !== undefined){
      return vMake.vehicleMakeName;
    } else {
      return '';
    }
  } else {
    return ''
  }
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

}