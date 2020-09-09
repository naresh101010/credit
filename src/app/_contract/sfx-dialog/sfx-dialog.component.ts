import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sfx-dialog',
  templateUrl: './sfx-dialog.component.html',
  styleUrls: ['./sfx-dialog.component.css']
})
export class SfxDialogComponent implements OnInit {

  constructor(
    private dialogSfxCode: MatDialogRef<SfxDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router : Router
  ) { }

  message:any;
  isNew:any;
  ngOnInit() {
    this.message = this.data.message;
    this.isNew = this.data.isNew;
    // this.autoRun;

  }

  autoRun:any = setTimeout(() => {
    this.dialogSfxCode.close();
    this.router.navigate(['/retail-contract/retail'],{skipLocationChange: true}); 
}, 15000);

  goToDashboard() {    
    this.dialogSfxCode.close();
    this.router.navigate(['/retail-contract/retail'],{skipLocationChange: true}); 
    clearTimeout(this.autoRun);
  }

}
