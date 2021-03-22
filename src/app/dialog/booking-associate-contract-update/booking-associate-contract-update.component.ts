import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { confimationdialog } from '../confirmationdialog/confimationdialog';

@Component({
  selector: 'app-booking-associate-contract-update',
  templateUrl: './booking-associate-contract-update.component.html',
  styleUrls: ['./booking-associate-contract-update.component.css']
})
export class BookingAssociateContractUpdateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BookingAssociateContractUpdateComponent>, public router: Router, public acRoute: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any,  private dialog: MatDialog ) { }

  ngOnInit() {
    
  }
  
  editmodules(url){
    this.dialogRef.close(true);
    this.router.navigate([url, { steper:true,'editflow': 'true' }], { skipLocationChange: true });

  }
  contractTermRoute(url) {
    this.dialogRef.close(true);
    this.router.navigate([url, {steper:true, 'termination': 'true' }], { skipLocationChange: true });
  }
  generalEdit(url) {
    this.dialogRef.close(true);
    this.router.navigate([url, {steper:true, 'editflow': 'true' }], { skipLocationChange: true });
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
