import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { confimationdialog } from '../confirmationdialog/confimationdialog';
@Component({
  selector: 'app-assign-vehicle',
  templateUrl: './assign-vehicle.component.html'
})
export class AssignVehicleComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumnsBranch: string[] = ['vehicleNumber', 'vehicleModel', 'vehicleTonnge', 'vehicleVal'];
  displayedColumnsCommercial: string[] = ['vehicleNumber', 'vehicleModel', 'vehicleTonnge', 'vehicleVal', 'price'];
  displayedColumns: string[] = (this.data.component === 'payment_term') ? this.displayedColumnsCommercial : this.displayedColumnsBranch;
  dataSource: any;
  allVehicle = [];
  inputDiableFlag: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private apiSer: ApiService, private SpinnerService: NgxSpinnerService, public router: Router, private toast: ToastrService, public dialogRef: MatDialogRef<AssignVehicleComponent>, private dialog: MatDialog) { }

  ngOnInit() {
    let addArrElement = [];
    console.log(this.data)
    if (this.data.obj.assocBranchVehicles && this.data.obj.assocBranchVehicles.length > 0) {
      this.mapVehiclesWithExist(this.data.obj.assocBranchVehicles, addArrElement);
    }
    if(this.data.obj.deliveryVehicleChargeList && this.data.obj.deliveryVehicleChargeList.length > 0){
      this.mapVehiclesWithExist(this.data.obj.deliveryVehicleChargeList, addArrElement);
    }
    this.allVehicle = [... this.data.tempVehicle, ...addArrElement];    
    this.dataSource = new MatTableDataSource(this.allVehicle);
    this.dataSource.data.forEach(element => {
      if(element.price === null) {
        this.inputDiableFlag = true;
        return;
      }
    });
  }

  onInputChange() {  
    let inputDiableFlag : boolean = false;
    let temp = this.dataSource.data.filter(obj => obj.checked);
    if(!temp || temp.length == 0){
      inputDiableFlag = true;
      return inputDiableFlag;
    }
    if(this.data.component == 'payment_term'){
    this.dataSource.data.forEach(element => {
      if(element.checked && (element.price == null || element.price == '')){
        inputDiableFlag = true;
          return inputDiableFlag;
      }
    });
  }
    return inputDiableFlag;

  }

  mapVehiclesWithExist(obj, addArr){
    const tempAssBranch = obj;
    tempAssBranch.forEach(element => {
      this.data.tempVehicle.forEach(objTemp => {
        if (objTemp.vehicleId == element.vehicleId) {
          if(element.id){
            objTemp.id = element.id;
          }            
          objTemp.checked = true;
          if(element.price){
            objTemp.price = element.price;
          }
          element.exist = true;
        }
      });
    });
    addArr = tempAssBranch.filter(newObj => !newObj.exist);
  }

  addVehicle() {
    let checkedVehicle = this.allVehicle.filter(obj => obj.checked);
    
    if(this.data.component == 'payment_term'){
      this.data.obj.deliveryVehicleChargeList = [...checkedVehicle];
    }else{
      this.data.obj.assocBranchVehicles = [...checkedVehicle];
    }
    
    this.dialogRef.close({ 'checkedVehicle': checkedVehicle, 'obj': this.data.obj })
  }
  checkedAll(event){
    if(event){
      this.dataSource.data.forEach(element => {
        element.checked = event.checked;
      });
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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }
}



