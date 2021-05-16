import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-mop-dialog',
  templateUrl: './mop-dialog.component.html',
  styleUrls: ['./mop-dialog.component.scss']
})
export class MopDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<MopDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog,) { }

  ngOnInit() {
    this.type = this.data;
  }
  type ;
}
