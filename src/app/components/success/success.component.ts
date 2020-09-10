import { Component, OnInit, Inject } from '@angular/core';
import { timer, Subscription } from "rxjs";
import { Router } from '@angular/router';
import { AppSetting } from '../../app.setting';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html'
})
export class SuccessComponent implements OnInit {

  associateContractCode : string;
  id : string;  
  countDown: Subscription;
  counter = 15;
  tick = 1000;

  constructor(
    private router: Router,
    private successDialog: MatDialogRef<SuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
   }

  ngOnInit() {
    this.countDown = timer(0, this.tick).subscribe(() => --this.counter);
    this.associateContractCode = AppSetting.sfxCode;
    this.id = this.data.id;
    setTimeout(() => {
      this.successDialog.close();
      this.router.navigate(['/asso_booking-contract/asso_booking'], {skipLocationChange: true}); 
  }, 15000);
  }



  ngOnDestroy(){
    this.countDown=null;
  }
}
