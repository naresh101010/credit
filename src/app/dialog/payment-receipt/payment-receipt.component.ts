import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.css']
})
export class PaymentReceiptComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,  public dialogRef: MatDialogRef<PaymentReceiptComponent>) { }
  
  ngOnInit() {

  }

}
