import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManageVmiService } from 'src/app/core/service/manage-vmi.service';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-attach-part-number',
  templateUrl: './attach-part-number.component.html',
  styleUrls: ['./attach-part-number.component.css']
})
export class AttachPartNumberComponent implements OnInit {
  invwayBillId: any;
  partsArray: any;
  totalArray: any = [];
  dataSource: any;
  rowArray = [{}];
  dynamicForm: FormGroup;
  resData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AttachPartNumberComponent>,
    private formBuilder: FormBuilder,
    private vmiService: ManageVmiService,
    private spinner: NgxSpinnerService,
    private matSnackBar: MatSnackBar
  ) {
    console.log('data', data)
    this.invwayBillId = data.item.waybillId;
  }

  ngOnInit() {
    this.spinner.show();
    this.getPartNumber();
    this.getPartsByInvoiceID();
    this.dynamicForm = this.formBuilder.group({
      dataSource: this.formBuilder.array([])
    })
  }


  getPartNumber() {
    this.vmiService.getPartNumberWithwayBillId(this.invwayBillId).subscribe((res: any) => {
      console.log(res);
      if (res.status == 'SUCCESS') {
        this.partsArray = res.data.responseData;
        // this.partsArray.push({id: 2, partNumber: 40})
      }
    })
  }
  selectPartNumber(val, index) {
    console.log('val', val);
    console.log('index', index);
    const id = val;
    const parts = this.partsArray.filter(el => el.id == id);
    console.log('parts', parts);
    let control = <FormArray>this.dynamicForm.controls.dataSource;
    control.controls[index].patchValue({ partNumber: parts[0].partNumber });
    // console.log('event', event);
    // this.partId = event.id;
    // this.partsNumber = event.partNumber;

  }
  isAlreadyAdded(partNumber) {
    const values = this.dynamicForm.controls.dataSource.value;
    // console.log('partNumber', partNumber);
    // console.log('values', values);
    const find = values.find(el => el.id == partNumber.id);
    // console.log('find', find);
    return find ? true : false;
  }
  addRow(val?: any) {
    let control = <FormArray>this.dynamicForm.controls.dataSource;
    control.push(
      this.formBuilder.group({
        partNumber: [val ? val.partNumber : '', Validators.required],
        quantity: [val ? val.quantity : '', Validators.required],
        id: [val ? val.id : '', Validators.required]
      })
    )
  }
  get dynamicFormGroup() {
    return this.dynamicForm.get('dataSource') as FormArray;
  }
  deleteCompany(index) {
    console.log('index', index)
    let control = <FormArray>this.dynamicForm.controls.dataSource;
    control.removeAt(index);

  }

  save() {
    // console.log('row', this.dynamicForm.value.dataSource)
    const partNumbers = this.dynamicForm.value.dataSource;
    if(!partNumbers.length) {
      this.matSnackBar.open('Please attach at least one part number', "", {
        duration: 3000,
        panelClass: ["text-white", "bg-red"],
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      return;
    }
    this.spinner.show();
    for (let data of partNumbers) {
      this.totalArray.push({
        "bookingInvId": this.data.element.invoiceId,
        "bookingWayblId": this.data.item.waybillId,
        "qty": data.quantity,
        "vmiPartId": data.id,
        "vmiPartNum": data.partNumber,
        "wayblNum": this.data.item.waybillNumber

      })
      console.log(this.totalArray);
    }
    this.vmiService.saveManage(this.totalArray).subscribe((res: any) => {
      console.log('res', res)
      this.spinner.hide();
      if (res.status == 'SUCCESS') {
        this.closeDialog();
      }
    }, (err) => {
      this.spinner.hide();
    });
  }
  closeDialog() {
    this.dialogRef.close(this.resData);
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  getPartsByInvoiceID() {
    this.vmiService.getPartDetail(this.data.element.invoiceId).subscribe((res: any) => {
      console.log('res', res)
      this.spinner.hide();
      if (res.status == 'SUCCESS') {
        const response = res.data.responseData;
        if (response.length) {
          response.forEach(element => {
            this.addRow({ partNumber: element.vmiPartNum, id: element.vmiPartId, quantity: element.qty })
          });
        } else {
          this.addRow();
        }
      }
    }, (err) => {
      this.addRow();
      this.spinner.hide();
    })
  }
}

export interface PeriodicElement {
  partnumber: string;
  quantity: string;
  delete: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { partnumber: '', quantity: '', delete: '' },
];