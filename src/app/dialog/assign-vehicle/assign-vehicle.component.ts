import { Component, OnInit, Inject ,ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource ,MatSort} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-assign-vehicle',
  templateUrl: './assign-vehicle.component.html',
  styleUrls: ['./assign-vehicle.component.css'],
  providers: [DatePipe]
})
export class AssignVehicleComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: string[] = ['vehicleNumber', 'vehicleModel', 'vehicleTonnge','HeightLengthWidth'];
  dataSource: any;
  allVehicle = [];
  arrayNeedToDelete=[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private apiSer: ApiService, private SpinnerService: NgxSpinnerService, public router: Router, private toast: ToastrService,
   public dialogRef: MatDialogRef<AssignVehicleComponent>, private datePipe: DatePipe) { }

  ngOnInit() {
    let addArrElement = [];
    if (this.data.obj.nrmAssignVehicles && this.data.obj.nrmAssignVehicles.length) {
      const tempAssBranch = this.data.obj.nrmAssignVehicles;
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
    console.log("vehicleTypeStatus-->",this.data.vehicleTypeStatus,"addArrElement-->",addArrElement,"this.data.tempVehicle--->",this.data.tempVehicle)
  
    this.allVehicle = [... this.data.tempVehicle, ...addArrElement]; 
    let displayVehicles = this.filterActiveVehicles(this.allVehicle);   
    this.dataSource = new MatTableDataSource(displayVehicles);
    this.arrayNeedToDelete =   this.allVehicle.filter((item)=>{ return item.vendorMktFlag != this.data.vehicleTypeStatus });
   if(this.arrayNeedToDelete.length >0)
   { 
     let message=this.data.vehicleTypeStatus ?`Vehicle Number  ${this.arrayNeedToDelete.map((item)=>{return item.vehicleNumber}).toString()},Not Alllowed For Market Contract, Please Remove!`:`Vehicle Number ${this.arrayNeedToDelete.map((item)=>{return item.vehicleNumber}).toString()},Not Alllowed For Scheduled Contract,Please Remove!`;   
     this.toast.info(message);
   }

  }

  addVehicle() {
    if(this.arrayNeedToDelete.filter((obj) => { return obj.checked == true}).length == 0){
      let checkedVehicle = this.allVehicle.filter(obj => obj.checked);
      this.data.obj.nrmAssignVehicles = checkedVehicle;
      this.dialogRef.close({ 'checkedVehicle': checkedVehicle, 'obj': this.data.obj })
    }else{
      let message= this.data.vehicleTypeStatus ?`Vehicle Number  ${this.arrayNeedToDelete.map((item)=>{return item.vehicleNumber}).toString()},Not Alllowed For Market Contract, Please Remove!`:`Vehicle Number ${this.arrayNeedToDelete.map((item)=>{return item.vehicleNumber}).toString()},Not Alllowed For Scheduled Contract,Please Remove!`;   
      this.toast.info(message);
    }
  }
  checkedAll(event){
    if(event){
      this.dataSource.data.forEach(element => {
        element.checked = event.checked;
      });
    }
  }
  closeDialog() {
    // if(this.arrayNeedToDelete.filter((obj) => {return obj.checked == true}).length == 0){
    //   this.dialogRef.close();
    // }else{
    //   let message=this.data.vehicleTypeStatus?`Vehicle Number  ${this.arrayNeedToDelete.map((item)=>{return item.vehicleNumber}).toString()},Not Alllowed For Market Contract, Please Remove!`:`Vehicle Number ${this.arrayNeedToDelete.map((item)=>{return item.vehicleNumber}).toString()},Not Alllowed For Scheduled Contract,Please Remove!`;   
    //   this.toast.info(message);
    // }
    this.dialogRef.close();
   
  }
  lbh(l,b,h)
{
  return `${l} X ${b} X ${h}` ;
}
ngAfterViewInit() {
  this.dataSource.sort = this.sort;
  // this.dataSource.paginator = this.paginator;
}

filterActiveVehicles(vehicleArray) {
  let todayDt =  this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  let activeVehiles = vehicleArray.filter(v => {
   
    if(v.checked){
      return v;
    } else {
      let expiryDt =  this.datePipe.transform(v.expDt, 'yyyy-MM-dd')
      if(expiryDt){
          if(v.status == 1 && expiryDt >= todayDt){
            return v;
          }
      } else if(v.status == 1){
          return v;
      }
    }
  });
  return activeVehiles;

}
}



