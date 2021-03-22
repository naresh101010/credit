import { Component, OnInit,Inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confimationdialog.html',
  styleUrls: ['./confirmationdialog.component.css']
})
export class confimationdialog implements OnInit {

  constructor( private acrouter: ActivatedRoute,
    public dialogRefConfirm: MatDialogRef<confimationdialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router) { }
  
    message:any;
  ngOnInit() {
      this.message = this.data.message;
      //console.log('confirmation');
  }

  submit(value){
    this.dialogRefConfirm.close(value);
  }

}
