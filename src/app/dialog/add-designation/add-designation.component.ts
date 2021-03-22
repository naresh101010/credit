import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { confimationdialog } from '../confirmationdialog/confimationdialog';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html'
})
export class AddDesignationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<AddDesignationComponent>, private dialog: MatDialog) { }

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

}
