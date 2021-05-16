import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-consignee-modal',
  templateUrl: './consignee-modal.component.html',
  styleUrls: ['./consignee-modal.component.css']
})
export class ConsigneeModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog, public dialogRef: MatDialogRef<ConsigneeModalComponent>) { }

  ngOnInit() {
    
        console.log(this.data);
  }

}
