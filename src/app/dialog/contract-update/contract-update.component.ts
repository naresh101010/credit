import { Component, OnInit } from '@angular/core';
import { AssignVehicleComponent } from '../assign-vehicle/assign-vehicle.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BookingAssociateContractUpdateComponent } from '../booking-associate-contract-update/booking-associate-contract-update.component';

@Component({
  selector: 'app-contract-update',
  templateUrl: './contract-update.component.html'
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
}
