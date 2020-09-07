import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sfx-dialog',
  templateUrl: './sfx-dialog.component.html',
  styleUrls: ['../core.css']
})
export class SfxDialogComponent implements OnInit {

  constructor(
    private dialogSfxCode: MatDialogRef<SfxDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  message:any;
  isNew:any;
  ngOnInit() {
    this.message = this.data.message;
    this.isNew = this.data.isNew;
    this.autoRun;
  }
  autoRun:any = setTimeout(() => {
    this.dialogSfxCode.close();
    this.router.navigate(['/contract']);
}, 15000);

  stopautoRun(){
    clearTimeout(this.autoRun);
  }

}
