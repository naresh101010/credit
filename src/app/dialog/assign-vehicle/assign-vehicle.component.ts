import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthorizationService } from '../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-assign-vehicle',
  templateUrl: './assign-vehicle.component.html'
export class AssignVehicleComponent implements OnInit {
  displayedColumns: string[] = ['vehicleNumber', 'vehicleModel', 'vehicleTonnge'];
  dataSource: any;
  allVehicle = [];
  perList: any =[];
  exAttrMap = new Map();
  exAttrKeyList =  [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private apiSer: ApiService, private SpinnerService: NgxSpinnerService, public router: Router, private toast: ToastrService, public dialogRef: MatDialogRef<AssignVehicleComponent>,
              private authorizationService : AuthorizationService,
              private permissionsService: NgxPermissionsService) { }

  ngOnInit() {

    this.authorizationService.setPermissions('VEHICLE');
    this.perList = this.authorizationService.getPermissions('VEHICLE') == null ? [] : this.authorizationService.getPermissions('VEHICLE');
    this.authorizationService.setPermissions('BRANCH');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('BRANCH'));
    this.permissionsService.loadPermissions(this.perList);
    this.exAttrMap = this.authorizationService.getExcludedAttributes('ASSIGN VEHICLE');
    this.exAttrKeyList = Array.from(this.exAttrMap.values());
    console.log('Attribute List', this.exAttrKeyList);
    console.log('perlist',this.perList)

    let addArrElement = [];
    if (this.data.obj.assocBranchVehicles && this.data.obj.assocBranchVehicles.length) {
      const tempAssBranch = this.data.obj.assocBranchVehicles;
      tempAssBranch.forEach(element => {
        this.data.tempVehicle.forEach(objTemp => {
          if (objTemp.vehicleId == element.vehicleId) {
            if(element.id){
              objTemp.id = element.id;
            }            
            objTemp.checked = true;
            element.exist = true;
          }
        });
      });
      addArrElement = tempAssBranch.filter(newObj => !newObj.exist);
    }
    this.allVehicle = [... this.data.tempVehicle, ...addArrElement];    
    this.dataSource = new MatTableDataSource(this.allVehicle);
  }

  addVehicle() {
    let checkedVehicle = this.allVehicle.filter(obj => obj.checked);
    this.data.obj.assocBranchVehicles = checkedVehicle;
    this.dialogRef.close({ 'checkedVehicle': checkedVehicle, 'obj': this.data.obj })
  }
  checkedAll(event){
    if(event){
      this.dataSource.data.forEach(element => {
        element.checked = event.checked;
      });
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
}



