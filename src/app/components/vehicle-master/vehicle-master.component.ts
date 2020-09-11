import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-vehicle-master',
    templateUrl: './vehicle-master.component.html',
})
export class VehicleMasterComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
    addVehicleMaster;
    allVehicleMaster;
    openAddVechilesMaster() {
        this.addVehicleMaster = true;
        this.allVehicleMaster = true;
    }
}
