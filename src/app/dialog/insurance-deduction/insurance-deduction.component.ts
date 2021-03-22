import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AppSetting } from '../../app.setting';
import { confimationdialog } from '../confirmationdialog/confimationdialog';

@Component({
  selector: 'app-insurance-deduction',
  templateUrl: './insurance-deduction.component.html',
  styleUrls: ['./insurance-deduction.component.css'],
  providers: [DatePipe]
})
export class InsuranceDeductionComponent implements OnInit {
  displayedColumns: string[] = ['vehicleNumber'];
  dataSource: any;
  vehicleData: any;
  insuranceForm: FormGroup;
  insuranceDeductions: any[] = [];
  branchVehicleList: any;
  oldInsuranceDeductions : any[]=[];
  maxdate : Date;
  isValidEffectiveDt : boolean;
  isValidExpDt : boolean;
  minDate : Date;
  editflow : boolean;
  checkArray : any = [];
  minchar:boolean= false;
  nomatch: boolean=false;
  activeClassFlag: boolean = false;

  constructor(public dialogRef: MatDialogRef<InsuranceDeductionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private tosterservice: ToastrService,
    public dialog: MatDialog,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.branchVehicleList = this.data.branchVehicleList;
    this.dataSource = new MatTableDataSource<any>(this.data.branchVehicleList);
    this.insuranceDeductions = [...this.data.previousData];
    this.oldInsuranceDeductions = [...this.data.oldData];
    this.editflow = this.data.editflow;

    this.minDate = new Date();
    let e = new Date();
    e.setDate(e.getDate()+1);
    this.maxdate = e;
    if(this.dataSource.data.length === 1) {
      this.activeClassFlag = true;
    }

    this.insuranceForm = this.fb.group({
      id: [0],
      vehicleId: [''],
      assocCntrId: AppSetting.contractId,
      dedctnAmt: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      dedctnCateg: ["INSURANCE"],
      effectiveDt: ['', Validators.required],
      expDt: ['', Validators.required],
      recIdentifier : [1],
      status : [''],
      dedctnType:["daily"],
      dedctnDt:['']
    })

    this.singleVehicleSelection();
  }

  get f() {return this.insuranceForm.controls } // get form controls

  singleVehicleSelection() {
    let id: number;
    let selected: any;
    if(this.dataSource.data.length === 1) {
      this.vehicleData = this.dataSource.data[0];
     // selected = this.vehicleData;
     selected = this.insuranceDeductions.find(x => x.vehicleId === this.vehicleData.vehicleId);
      this.insuranceForm.controls.status.enable();
      if(selected !== undefined) {
        id = selected.id;
      } else {
        id = 0;
      }

    this.insuranceForm.patchValue({
      id: id,
      vehicleId: this.vehicleData.vehicleId,
      assocCntrId: AppSetting.contractId,
      status: '',
      dedctnCateg: 'INSURANCE',
      recIdentifier: 1
    });

      this.editflow ? this.insuranceForm.controls.status.patchValue(AppSetting.editStatus) : 
      (id !== 0 ? this.insuranceForm.controls.status.patchValue(selected.status) : this.insuranceForm.controls.status.disable())
  
    }
  }

  /*----------- On Select Vehicle -------- */
  onSelectVehicle(vehicleData) {
    this.vehicleData = vehicleData;
    this.insuranceForm.controls.status.enable();
    let id: number;
    let selected = this.insuranceDeductions.find(x => x.vehicleId === this.vehicleData.vehicleId);
    if (selected !== undefined) {
      this.minDate = selected.effectiveDt;
      id = selected.id;
      this.insuranceForm.patchValue(selected);
    } else {
      this.insuranceForm.reset();
      this.minDate = new Date();
      let e = new Date();
      e.setDate(e.getDate()+1);
      this.maxdate = e;
      id = 0;

      this.insuranceForm.patchValue({
        id: id,
        vehicleId: this.vehicleData.vehicleId,
        assocCntrId: AppSetting.contractId,
        status: '',
        dedctnCateg: 'INSURANCE',
        recIdentifier: 1
      });
    }

    this.editflow ? this.insuranceForm.controls.status.setValue(AppSetting.editStatus) : 
    (id !== 0 ? this.insuranceForm.controls.status.setValue(selected.status) : this.insuranceForm.controls.status.disable())
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
        this.dialogRef.close();
      }else{
        console.log('Keep Open');
      }
    });

  }

  addInsuranceDeductions() {
    if (this.vehicleData !== null && this.vehicleData !== undefined) {
      this.checkArray.push(this.insuranceForm.value);

      let index = this.findIndexOfData();
      if(index == undefined){
       this.insuranceDeductions.push(this.insuranceForm.value);
      } else {
       this.insuranceDeductions[index] = this.insuranceForm.value;
      }

      // let data = this.branchVehicleList.filter(x => !this.insuranceDeductions.find(y => y.vehicleId === x.vehicleId));
      // this.dataSource = new MatTableDataSource<any>(data);
      this.insuranceForm.reset();
      let e = new Date();
      e.setDate(e.getDate()+1);
      this.maxdate = e;
      this.vehicleData = {};
    } else {
      this.tosterservice.error('Please Select Vehicle!!')
    }
  }

  saveInsuranceDeductions() {
    for(let i=0; i < this.insuranceDeductions.length; i++){
      this.insuranceDeductions[i].effectiveDt = this.datePipe.transform(this.insuranceDeductions[i].effectiveDt, 'yyyy-MM-dd');
      this.insuranceDeductions[i].expDt = this.datePipe.transform(this.insuranceDeductions[i].expDt, 'yyyy-MM-dd');
      this.insuranceDeductions[i].dedctnDt = this.datePipe.transform(this.insuranceDeductions[i].dedctnDt, 'yyyy-MM-dd');
    }
    this.dialogRef.close(this.insuranceDeductions);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length > 0 && filterValue.length<3){
      this.minchar= true
      this.nomatch = false;
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
    if(filterValue.length ==0){
      this.nomatch = false;
      this.dataSource.filter = null;  
    }
  }
  
  /*--------  On change Effective Date----------- */
  effectiveDate() {
    let effYear = parseInt(this.datePipe.transform(this.f.effectiveDt.value, 'yyyy'));
    if (effYear > 9999) {
      this.f.effectiveDt.setValue('');
    } else {
      let b = this.datePipe.transform(this.f.effectiveDt.value, 'yyyy-MM-dd');
      let c = this.datePipe.transform(this.f.expDt.value, 'yyyy-MM-dd');

      let e = new Date(this.f.effectiveDt.value);
      e.setDate(e.getDate()+1);
      this.maxdate = e;

      if (c) {
        if (b < c) {
          this.isValidEffectiveDt = false;
        }
        else {
          this.isValidEffectiveDt = true;
          this.isValidExpDt = false;
        }
      } else {
        this.isValidEffectiveDt = false
      }
    }
  }

  /*--------  On change Expiry Date----------- */
  expDate() {
    let expYear = parseInt(this.datePipe.transform(this.f.expDt.value, 'yyyy'));
    if (expYear > 9999) {
      this.f.expDt.setValue('');
    } else {
      let b = this.datePipe.transform(this.f.effectiveDt.value, 'yyyy-MM-dd');
      let c = this.datePipe.transform(this.f.expDt.value, 'yyyy-MM-dd');

      if (b) {
        if (b < c) {
          this.isValidExpDt = false;
          this.isValidEffectiveDt = false;
        }
        else {
          this.isValidExpDt = true;
          this.isValidEffectiveDt = false;
        }
      } else {
        this.isValidExpDt = false;
      }
    }
  }

  /*---------- Check vehile is selected or not --------- */
  checkIsSelected(data) {
    let obj = this.insuranceDeductions.find(x => x.vehicleId === data.vehicleId);
    if(obj !== undefined){
      return true;
    } else {
      return false;
    }

  }

  findIndexOfData(){
    for(let i=0; i< this.insuranceDeductions.length ; i++){
      if(this.insuranceDeductions[i].vehicleId == this.insuranceForm.value.vehicleId){
        return i;
      } 
    }
  }

}
