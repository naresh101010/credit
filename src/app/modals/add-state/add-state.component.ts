import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { State } from './../../Models/state';
import { Country } from './../../Models/country';

import { LogisticZoneService } from 'src/app/services/logistic-zone.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-add-state',
    templateUrl: './add-state.component.html',
    styleUrls: ['./add-state.component.css']
})
export class AddStateComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AddStateComponent>, private $logistic: LogisticZoneService,private $spinner:NgxSpinnerService) { }
    @ViewChild("F", null) addState: any;
    ngOnInit() {

        this.getCountryList();
        this.disabledStates = [...this.data.states];
        this.stateSelected = this.data.selectedStates;
    }
    sateNameSearchCtrl = <string>'';
    countryNameSearchCtrl = <string>'';
    selectedCountry: any;
    stateSelected: any;
    stateList: Array<State> = [];
    countryList: Array<Country> = [];
    disabledStates: any;
    countrySelected = true;
    isStateSelected = true;


    checkSelectedCities(o1: any, o2: any): boolean {
        if (o2 && o2.status) {
            return o1.id === o2.id;
        }
    }

    getStates() {
        this.$spinner.show();
        this.$logistic.getStates(this.selectedCountry).subscribe(response => {
            this.$spinner.hide();
            this.stateList = response;
            this.stateList.forEach(elem => {
                if (this.disabledStates.findIndex(el => el.id == elem.id) != -1 && this.stateSelected.findIndex(el => el.id == elem.id)==-1) {
                    elem.isDisabled = true;
                }

            })
            if (this.stateList.length == 1) {
                this.stateSelected = this.stateList[0].id;
            }
        })

    }

    getCountryList() {

        this.$logistic.getCountry().subscribe(response => {
            this.countryList = response;
            if (this.countryList.length == 1) {
                this.selectedCountry = this.countryList[0].id
                this.getStates();
            }
        })
    }


    submitStates() {
        this.dialogRef.close({ 'id': this.data.id, 'data': this.stateSelected });
    }


}
