import { Component, Inject , OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-mode-of-payment-validate',
  templateUrl: './mode-of-payment-validate.component.html',
  styleUrls: ['./mode-of-payment-validate.component.css']
})
export class ModeOfPaymentValidateComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModeOfPaymentValidateComponent>,
    @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog,
  ) { }
  
  selectedMop;
  ngOnInit() {
    this.selectedMop=this.data.selectedMop;
  }

}
