import { Component, OnInit } from '@angular/core';
import { EditVehicleMakeComponent } from 'src/app/modals/edit-vehicle-make/edit-vehicle-make.component';
import { MatDialog } from '@angular/material';
import { EditVehicleModelComponent } from 'src/app/modals/edit-vehicle-model/edit-vehicle-model.component';

@Component({
    selector: 'app-vehicle-model',
    templateUrl: './vehicle-model.component.html',
})
export class VehicleModelComponent implements OnInit {

    constructor(public dialog: MatDialog) { }

    ngOnInit() {
    }
    allVehicleModel;
    addVehicleModel;
    vehicleModelDetails;
    addVehicleModelPopup() {
        this.addVehicleModel = true;
        this.vehicleModelDetails = false;
        this.allVehicleModel = true;
    }
    viewVehicleModelDetails() {
        this.addVehicleModel = false;
        this.vehicleModelDetails = true;
        this.allVehicleModel = true;
    }

    editVehicleModelPopup() {
        this.dialog.open
            (EditVehicleModelComponent, {
                width: '73vw',
                panelClass: 'mdmDialog'
            })
    }
}
