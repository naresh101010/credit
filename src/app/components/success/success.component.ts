import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppSetting } from '../../app.setting';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { timer, Subscription } from "rxjs";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  associateContractCode : string;
  id : string;
  countDown: Subscription;
  counter = 15;
  tick = 1000;
  timeData:any;
  constructor(
    private router: Router,
    private successDialog: MatDialogRef<SuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
   }

  ngOnInit() {
    this.countDown = timer(0, this.tick).subscribe(() => --this.counter);
    this.associateContractCode = AppSetting.sfxCode;
    this.id = this.data.id;
    this.timeData= setTimeout(() => {
      this.successDialog.close();
      this.router.navigate(['/asso_network-contract/asso_network'], {skipLocationChange: true}); 
  }, 15000);
  }

  closeSuccess(){
    clearTimeout(this.timeData);
    this.router.navigate(['/asso_network-contract/asso_network'], {skipLocationChange: true}); 
  }

}
