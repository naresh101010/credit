import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource,MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AppSetting } from '../../app.setting';
import { confimationdialog } from '../confirmationdialog/confimationdialog';
import { AuthorizationService } from 'src/app/core/services/authorization.service';

@Component({
  selector: 'app-emi-calculation',
  templateUrl: './emi-calculation.component.html',
  styleUrls: ['./emi-calculation.component.css'],
  providers: [DatePipe]
})
export class EmiCalculationComponent implements OnInit {
  displayedColumns: string[] = ['vehicleNumber'];
  dataSource: any;
  vehicleData: any;
  emiForm: FormGroup;
  emiDeductions: any[] = [];
  branchVehicleList: any;
  oldEmiDeductions : any[] =[];
  maxdate : Date;
  isValidEffectiveDt : boolean;
  isValidExpDt : boolean;
  minDate : Date;
  editflow: boolean;
  checkArray : any = [];
  minchar:boolean= false;
  nomatch: boolean=false;
  activeClassFlag: boolean = false;
  isValiddedctnDt: boolean = false;
  exAttrMap = new Map();
  exAttrKeyList =  [];

  constructor(public dialogRef: MatDialogRef<EmiCalculationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private tosterservice: ToastrService,
    private authorizationService : AuthorizationService,
    public dialog: MatDialog,
    private datePipe : DatePipe) { }

  ngOnInit() {
    this.exAttrMap = this.authorizationService.getExcludedAttributes('VEHICLE DEDUCTION');
    this.exAttrKeyList = Array.from(this.exAttrMap.values());
    let branchData = this.data.branchVehicleList;
    this.branchVehicleList = branchData.filter(x=> x.sfxFinFlag == 1);
    this.dataSource = new MatTableDataSource<any>(this.branchVehicleList);
    this.emiDeductions = [...this.data.previousData];
    this.oldEmiDeductions = [...this.data.oldData];
    this.editflow = this.data.editflow;
    this.minDate = new Date();
    let e = new Date();
    e.setDate(e.getDate()+1);
    this.maxdate = e;
    if(this.dataSource.data.length === 1) {
      this.activeClassFlag = true;
      console.log('activeFlag', this.activeClassFlag);
    }

    this.emiForm = this.fb.group({
      id: [0],
      vehicleId: [''],
      assocCntrId: AppSetting.contractId,
      dedctnAmt: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      dedctnCateg: ["EMI"],
      effectiveDt: ['', Validators.required],
      expDt: ['', Validators.required],
      recIdentifier : [1],
      status: [''],
      dedctnType:["daily"],
      dedctnDt:['']
    })
    
    this.singleVehicleSelection();
  }

  get f() { return this.emiForm.controls }   // return form controls

  singleVehicleSelection() {
    let id: number;
    if(this.dataSource.data.length === 1) {
      this.vehicleData = this.dataSource.data[0];
      //selected = this.vehicleData;
      let selected = this.emiDeductions.find(x => x.vehicleId === this.vehicleData.vehicleId);
      this.emiForm.controls.status.enable();
      if(selected !== undefined) {
         id = selected.id;
      } else {
         id = 0;
      }

      this.emiForm.patchValue({
        id: id,
        vehicleId: this.vehicleData.vehicleId,
        assocCntrId: AppSetting.contractId,
        status: '',
        dedctnCateg: 'EMI',
        recIdentifier : 1
      });

      this.editflow ? this.emiForm.controls.status.patchValue(AppSetting.editStatus) : 
      (id !== 0 ? this.emiForm.controls.status.patchValue(selected.status) : this.emiForm.controls.status.disable())

    }
  }

  /*----------- On Select Vehicle -------- */
  onSelectVehicle(vehicleData) {
    this.vehicleData = vehicleData;
    this.emiForm.controls.status.enable();

    let id: number;
    let selected = this.emiDeductions.find(x => x.vehicleId === this.vehicleData.vehicleId);
    if (selected !== undefined) {
      this.minDate = selected.effectiveDt;
      id = selected.id;
      this.emiForm.patchValue(selected);

    } else {
      this.emiForm.reset();
      this.minDate = new Date();
      let e = new Date();
      e.setDate(e.getDate()+1);
      this.maxdate = e;
      id = 0;
      this.emiForm.patchValue({
        id: id,
        vehicleId: this.vehicleData.vehicleId,
        assocCntrId: AppSetting.contractId,
        status: '',
        dedctnCateg: 'EMI',
        recIdentifier : 1
      });
    }

    this.editflow ? this.emiForm.controls.status.patchValue(AppSetting.editStatus) : 
    (id !== 0 ? this.emiForm.controls.status.patchValue(selected.status) : this.emiForm.controls.status.disable())

  }

  /*--- After close dialog --- */
 
  addEMIDeductions() {
    if (this.vehicleData !== null && this.vehicleData !== undefined) {
      this.checkArray.push(this.emiForm.value);

     let index = this.findIndexOfData();
     if(index == undefined){
      this.emiDeductions.push(this.emiForm.value);
     } else {
      this.emiDeductions[index] = this.emiForm.value;
     }
  
      // let data = this.branchVehicleList.filter(x => !this.emiDeductions.find(y => y.vehicleId === x.vehicleId));
      // this.dataSource = new MatTableDataSource<any>(data);
      this.emiForm.reset();
      let e = new Date();
      e.setDate(e.getDate()+1);
      this.maxdate = e;
      this.vehicleData = {};
    } else {
      this.tosterservice.error('Please Select Vehicle!!')
    }
  }

  saveEmiDeductions() {
    for(let i=0; i < this.emiDeductions.length; i++){
      this.emiDeductions[i].effectiveDt = this.datePipe.transform(this.emiDeductions[i].effectiveDt, 'yyyy-MM-dd');
      this.emiDeductions[i].expDt = this.datePipe.transform(this.emiDeductions[i].expDt, 'yyyy-MM-dd');
      this.emiDeductions[i].dedctnDt = this.datePipe.transform(this.emiDeductions[i].dedctnDt, 'yyyy-MM-dd');
    }
    this.dialogRef.close(this.emiDeductions);
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
    let effYear = parseInt(this.datePipe.transform(this.emiForm.controls.effectiveDt.value, 'yyyy'));
    if (effYear > 9999) {
      this.emiForm.controls.effectiveDt.setValue('');
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
    let obj = this.emiDeductions.find(x => x.vehicleId === data.vehicleId);
    if(obj !== undefined){
      return true;
    } else {
      return false;
    }

  }

  findIndexOfData(){
    for(let i=0; i< this.emiDeductions.length ; i++){
      if(this.emiDeductions[i].vehicleId == this.emiForm.value.vehicleId){
        return i;
      } 
    }
  }

  closeDialog() {
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      data: { message: 'Are you sure ?' },
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if (value) {
        this.dialogRef.close();
      } else {
        console.log('Keep Open');
      }
    });
  }
}