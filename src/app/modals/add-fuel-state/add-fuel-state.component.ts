import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { FuelPriceService } from 'src/app/services/fuel.service';

@Component({
  selector: 'app-add-fuel-state',
  templateUrl: './add-fuel-state.component.html',
})
export class AddFuelStateComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    private $fuelPrice: FuelPriceService,
    public dialogRef: MatDialogRef<AddFuelStateComponent>
  ) { }

  ngOnInit() {
  }

}
