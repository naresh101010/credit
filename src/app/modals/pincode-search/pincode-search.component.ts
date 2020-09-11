import { Pincode } from './../../Models/pincode';
import { CityService } from './../../services/city.service';
import { City } from './../../Models/city';
import { DistrictService } from './../../services/district.service';
import { StateService } from './../../services/state.service';
import { PincodeService } from './../../services/pincode.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { State } from 'src/app/Models/state';
import { District } from 'src/app/Models/district';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-pincode-search',
    templateUrl: './pincode-search.component.html',
    styleUrls: ['./pincode-search.component.css']
})
export class PincodeSearchComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private $state: StateService,
        private $district: DistrictService,
        private $city: CityService,
        public dialogRef: MatDialogRef<PincodeSearchComponent>,
        private $pincode: PincodeService,
        private spinner: NgxSpinnerService
    ) { }

    stateId: number;
    districtId: number;
    cityId: number;
    pincodeId: number;
    searchCtrl = '';
    pincode = {} as Pincode;
    stateList: Array<State> = [];
    AllstateList: Array<any>;
    allPincodeList: Array<any>;
    allDistrictList: Array<any>;
    allcityList: Array<any>;
    districtList: Array<District>;
    cityList: Array<City>;
    pincodeList: Array<Pincode>;
    stateSearchCtrl: string = '';
    districtSearchCtrl: string = '';
    citySearchCtrl: string = '';
    pincodeSearchCtrl: string = '';

    ngOnInit() {
        this.getAllStates();
    }

    getAllStates() {

        this.districtList = [];
        this.cityList = [];
        this.pincodeList = [];
        this.districtSearchCtrl = '';
        this.citySearchCtrl = '';
        this.pincodeSearchCtrl = '';

        // this.spinner.show();
        this.$state.getAll().subscribe(response => {
            // this.spinner.hide();
            this.AllstateList = response;
            this.stateList = this.AllstateList.filter(elem => elem.status == 1);
            if (this.stateList.length == 1) {
                this.stateId = this.stateList[0].id;
                return this.getDistricts();
            }
        })
    }

    getDistricts() {
        this.spinner.show();
        this.cityList = [];
        this.pincodeList = [];
        this.citySearchCtrl = '';
        this.pincodeSearchCtrl = '';
        this.$district.getByStateId(this.stateId).subscribe(response => {
            this.spinner.hide();
            this.allDistrictList = response;
            this.districtList = this.allDistrictList.filter(elem => elem.status == 1);
            if (this.districtList.length == 1) {
                this.districtId = this.districtList[0].id;
                return this.getCities();
            }
        })
    }

    getCities() {

        this.spinner.show();
        this.pincodeList = [];
        this.pincodeSearchCtrl = '';
        this.$city.getByDistrictId(this.districtId).subscribe(response => {
            this.spinner.hide();
            this.allcityList = response;
            this.cityList = this.allcityList.filter(elem => elem.status == 1);
            if (this.cityList.length == 1) {
                this.cityId = this.cityList[0].id;
                return this.getPincodes();
            }
        })
    }

    getPincodes() {

        this.spinner.show();
        this.$pincode.getByCityId(this.cityId).subscribe(response => {
            this.spinner.hide();
            this.allPincodeList = response;
            this.pincodeList = this.allPincodeList.filter(elem => elem.status == 1);
            if (this.pincodeList.length == 1) {
                this.pincodeId = this.pincodeList[0].id;
            }
        })
    }

    selectPincode() {

        this.pincode.id = this.pincodeId;
        this.pincode.pincode = this.pincodeList.find(elem => elem.id == this.pincodeId).pincode;
    }
    submitPincode() {

        var pincode = this.pincodeList.find(elem => elem.id == this.pincodeId);
        this.dialogRef.close(pincode);
    }
}
