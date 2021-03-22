import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AppSetting } from '../../app.setting';
import { confimationdialog } from '../confirmationdialog/confimationdialog';

@Component({
  selector: 'app-sla-calulation',
  templateUrl: './sla-calulation.component.html',
  styleUrls: ['./sla-calulation.component.css'],
  providers: [DatePipe]
})
export class SlaCalulationComponent implements OnInit {
  displayedColumns: string[] = ['lkpVehicleTypeId'];
  dataSource: any;
  vehicleData: any;
  slaForm: FormGroup;
  branchVehicleList: any;
  cargoSlas:any;
  oldSlaDeductions : any[] =[];
  slaDeductions : any[] = []
  editflow: boolean;
  checkArray : any = [];
  minchar:boolean= false;
  nomatch: boolean=false;
  activeClassFlag : boolean =  false;

  constructor(public dialogRef: MatDialogRef<SlaCalulationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private tosterservice: ToastrService,
    private datePipe : DatePipe) { }

  ngOnInit() {
    this.branchVehicleList = this.data.referenceData.vehicleModelList;
    this.dataSource = new MatTableDataSource<any>(this.branchVehicleList);
    this.slaDeductions = [...this.data.previousData];
    this.oldSlaDeductions = [...this.data.oldData];
    this.editflow = this.data.editflow;

    if(this.dataSource.data.length === 1) {
      this.activeClassFlag = true;
    }
    // if (this.slaDeductions !== undefined) {
    //   let filteredData = this.branchVehicleList.filter(x => !this.slaDeductions.find(y => y.lkpVehicleTypeId === x.lkpVehicleTypeId));
    //   this.dataSource = new MatTableDataSource<any>(filteredData);
    // }

    this.slaForm = this.fb.group({
      id: [0],
      lkpVehicleTypeId: [''],
      lkpCargoCapacityId: [''],
      assocCntrId: AppSetting.contractId,
      loadingTime: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      unloadingTime: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      recIdentifier : [1],
      status: ['']
    });

    this.singleVehicleSelection();
  }

  get f() { return this.slaForm.controls }   // return form controls

  singleVehicleSelection() {
    let id: number;
    let selected: any;
    if(this.dataSource.data.length === 1) {
      this.vehicleData = this.dataSource.data[0];
      selected = this.slaDeductions.find(x => x.lkpVehicleTypeId === this.vehicleData.lkpVehicleTypeId);
      this.slaForm.controls.status.enable();
      if(selected !== undefined) {
         id = selected.id;
      } else {
         id = 0;
      }

      this.slaForm.patchValue({
        id: id,
        lkpVehicleTypeId: this.vehicleData.lkpVehicleTypeId,
        lkpCargoCapacityId: this.vehicleData.lkpCargoCapacityId,
        assocCntrId: AppSetting.contractId,
        status: '',
        recIdentifier : 1
      });
  

      this.editflow ? this.slaForm.controls.status.patchValue(AppSetting.editStatus) : 
      (id !== 0 ? this.slaForm.controls.status.patchValue(selected.status) : this.slaForm.controls.status.disable())
     
    }
  }
  
  /*----------- On Select Vehicle -------- */
  onSelectVehicle(vehicleData) {
   
    this.vehicleData = vehicleData;
    this.slaForm.controls.status.enable();

    let id: number;
     let selected = this.slaDeductions.find(x => x.lkpVehicleTypeId === this.vehicleData.lkpVehicleTypeId);
    //let selected = this.oldSlaDeductions.find(x => x.lkpVehicleTypeId === this.vehicleData.lkpVehicleTypeId);
    if (selected !== undefined) {
      id = selected.id;
      this.slaForm.patchValue(selected);
    } else {
      id = 0;

      this.slaForm.patchValue({
        id: id,
        lkpVehicleTypeId: this.vehicleData.lkpVehicleTypeId,
        lkpCargoCapacityId: this.vehicleData.lkpCargoCapacityId,
        assocCntrId: AppSetting.contractId,
        status: '',
        recIdentifier : 1
      });
  
    }

   
    this.editflow ? this.slaForm.controls.status.patchValue(AppSetting.editStatus) : 
    (id !== 0 ? this.slaForm.controls.status.patchValue(selected.status) : this.slaForm.controls.status.disable())

  }

  /*--- After close dialog --- */
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
        this.dialogRef.close(this.slaDeductions);
      }else{
        console.log('Keep Open');
      }
    });
  }

  addSlaDeductions() {
    if (this.vehicleData !== null && this.vehicleData !== undefined) {
      this.checkArray.push(this.slaForm.value);

      let index = this.findIndexOfData();
      if(index == undefined){
       this.slaDeductions.push(this.slaForm.value);
      } else {
       this.slaDeductions[index] = this.slaForm.value;
      }

     // this.slaDeductions.push(this.slaForm.value);
      // let data = this.branchVehicleList.filter(x => !this.slaDeductions.find(y => y.lkpVehicleTypeId === x.lkpVehicleTypeId));
      // this.dataSource = new MatTableDataSource<any>(data);
      this.slaForm.reset();
      this.vehicleData = {};
    } else {
      this.tosterservice.error('Please Select Vehicle Type!!')
    }
  }

  saveSlaDeductions() {
    this.dialogRef.close(this.slaDeductions);
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
      if( this.dataSource.filteredData.length == 0){
        this.nomatch = true
      }
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   /*---------- Check vehile is selected or not --------- */
   checkIsSelected(data) {
    let obj = this.slaDeductions.find(x => x.lkpVehicleTypeId === data.lkpVehicleTypeId);
    if(obj !== undefined){
      return true;
    } else {
      return false;
    }
  }


  findIndexOfData(){
    for(let i=0; i< this.slaDeductions.length ; i++){
      if(this.slaDeductions[i].lkpVehicleTypeId == this.slaForm.value.lkpVehicleTypeId){
        return i;
      } 
    }
  }

  /*------------ return vehicle type name name ------- */
 getVehicleTypeName(id) {
   if(this.data.referenceData && this.data.referenceData.vehicleTypeList !== undefined){
  let type = this.data.referenceData.vehicleTypeList.find(x=> x.id === id);
  if(type !== undefined) {
    return  type.lookupVal;
  } else {
    return '';
  }
 }
 }
}
