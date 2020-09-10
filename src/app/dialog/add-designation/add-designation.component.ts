import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.css']
})
export class AddDesignationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<AddDesignationComponent>) { }

  ngOnInit() {
    
  }

  Designation;
  Description;
  onSubmit() {
    let obj={
      Designation: this.Designation ,
      Description: this.Description
    }
    this.dialogRef.close({obj})
  }

}
