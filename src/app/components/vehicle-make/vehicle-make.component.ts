import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditVehicleMakeComponent } from 'src/app/modals/edit-vehicle-make/edit-vehicle-make.component';

@Component({
    selector: 'app-vehicle-make',
    templateUrl: './vehicle-make.component.html',
})
export class VehicleMakeComponent implements OnInit {

    constructor(public dialog: MatDialog) { }

    ngOnInit() {
    }
    allVehicle;
    vehicleDetails;
    addVehicle;
    addVehicleMake() {
        this.addVehicle = true;
        this.vehicleDetails = false;
        this.allVehicle = true;
    }
    viewVehicleDetails() {
        this.addVehicle = false;
        this.vehicleDetails = true;
        this.allVehicle = true;
    }

    editVehicleMake() {
        this.dialog.open
            (EditVehicleMakeComponent, {
                width: '73vw',
                panelClass: 'mdmDialog'
            })
    }
}
