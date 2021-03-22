import { Component, OnInit } from '@angular/core';
import { AssignVehicleComponent } from '../assign-vehicle/assign-vehicle.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BookingAssociateContractUpdateComponent } from '../booking-associate-contract-update/booking-associate-contract-update.component';
import { confimationdialog } from '../confirmationdialog/confimationdialog';

@Component({
  selector: 'app-contract-update',
  templateUrl: './contract-update.component.html',
  styleUrls: ['./contract-update.component.css']
})
export class ContractUpdateComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ContractUpdateComponent>) { }

  ngOnInit() {
  }
  openSecondModal() {
    this.dialog.open(AssignVehicleComponent, {
      width: '40vw'
    })
  }

  openBookingContractUpdateModal() {
    let dialog = this.dialog.open(BookingAssociateContractUpdateComponent, {
      width: '50vw',
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });

    dialog.afterClosed().subscribe(response => {
    //  debugger
      if (response) {
        this.submitData(response);
      }
    })
  }
  submitData(data = null) {
    this.dialogRef.close(data);
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
