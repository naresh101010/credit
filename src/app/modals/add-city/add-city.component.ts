import { CommonService } from './../../services/common.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Country } from 'src/app/Models/country';
import { StateService } from 'src/app/services/state.service';
import { CountryService } from 'src/app/services/country.service';
import { DistrictService } from 'src/app/services/district.service';
import { State } from 'src/app/Models/state';
import { District } from 'src/app/Models/district';
import moment from 'moment';
import { CityService } from 'src/app/services/city.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-add-city',
    templateUrl: './add-city.component.html',
})
export class AddCityComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialog: MatDialog,
        private $country: CountryService,
        private $state: StateService,
        private $city: CityService,
        private $district: DistrictService,
        private spinner: NgxSpinnerService,
        private datePipe: DatePipe,
        private $common: CommonService,
        public dialogRef: MatDialogRef<AddCityComponent>
    ) { }

    @ViewChild("f", null) cityForm: any;
    today = moment(new Date()).format("YYYY-MM-DD");
    stateList: Array<State>;
    districtList: Array<District>;
    countryList: Array<Country>;
    cityObj = {
        status: 1
    } as any;
    countryId: number;
    stateId: number;
    disabledBtn: boolean;
    editStatus={}as any;
    isDisabled = <boolean>false;
    inActiveFlag = <boolean>false;
    disableEffectiveDate = false as any;
    countryNameSearchCtrl = <string>'';
    stateNameSearchCtrl = <string>'';
    districtNameSearchCtrl = <string>'';

    ngOnInit() {

        let data = { ...this.data };
        this.editStatus=this.data.cityObj.status;
        this.countryList = this.data.countryList;
        this.stateList = this.data.stateList;
        this.districtList = this.data.districtList;
        this.cityObj.status = 1;
        this.inActiveStatus();
        if (data.type != undefined) {
            if (data.type == 1) {
                this.cityPrefix = "View";
                this.hideBtn = true;
            }
            else if (data.type == 0 && data.cityObj.id) {
                this.cityPrefix = "Edit";
            }
        }
        else {
            this.cityPrefix = "Add";
        }
        this.disableEffectiveDate = false;
        if (data.cityObj && data.cityObj.id) {
            this.getCityDetails(data.cityObj.id);
        }

        if (data.cityObj.expDt < this.currentDate) {
            this.isVar = false;
        }


        setTimeout(() => {
            this.cityObj.district = data.district;
            if (data.country && data.state) {
                this.countryList.map(elem => {
                    if (elem.id == data.country) {
                        this.countryId = elem.id
                    }
                })
                this.stateList.map(elem => {
                    if (elem.id == data.state) {
                        this.stateId = elem.id
                    }
                })
            }
        }, 500);

        if (data.state && data.country && data.district) {
            this.isDisabled = true;
        }
    }
    cityPrefix: string;
    hideBtn;
    checkDistrict(o1: any, o2: any): boolean {
        if (o2) {
            return o1.id === o2.id
        }

    }


    getAllCountry() {
        this.$country.getAll().subscribe(response => {
            this.countryList = response.responseData;
        })
    }

    getStateByCountry() {

        this.$state.getByCountryId(this.countryId).subscribe(response => {
            this.stateList = response;
        })
    }

    getDistrictByState() {

        this.$district.getByStateId(this.stateId).subscribe(response => {
            this.districtList = response;
        })
    }

    getCityDetails(cityId) {
        this.$city.getDetailsById(cityId).subscribe((response: any) => {

            this.cityObj = response.responseData
            if (this.cityObj.effectiveDt) {
                this.cityObj.effectiveDt = moment(this.cityObj.effectiveDt).format("YYYY-MM-DD");
                let today = moment(this.today).format("YYYY-MM-DD");
                if (today < this.cityObj.effectiveDt) {
                    this.today = this.cityObj.effectiveDt;
                } else {
                    this.disableEffectiveDate = true;
                }

                if (this.cityObj.status == 0 && this.cityObj.expDt < this.currentDate) {
                    this.isInactive = true;
                    this.expiryMinDate = this.currentDate;
                }else {
                    this.isInactive = false;
                }
            }
            if (this.cityObj.expiryDate) {
                this.cityObj.expiryDate = moment(this.cityObj.expiryDate).format("YYYY-MM-DD");
            }
        })
    }


    addCity() {

        this.isVar = false;
        this.cityObj.district.state = this.stateList.find(elem => elem.id == this.stateId);
        this.cityObj.district.state.country = this.countryList.find(elem => elem.id == this.countryId);

        if (this.cityObj.expDt) {
            if (this.cityObj.expDt < this.currentDate && this.cityObj.expDt < this.cityObj.effectiveDt) {
                this.isVar = true;
            }
            else {
                this.isVar = false;
                this.cityObj.expDt = moment(this.cityObj.expDt).format("YYYY-MM-DD");
            }
        }

        if (this.cityObj.status == 0) {
            let dialog = this.dialog.open(DeleteModalComponent, {
                width: '35vw',
                panelClass: 'mdmDialog',
                data: { title: this.cityObj.stateName, heading: "City" }
            });
            dialog.beforeClose().subscribe(response => {
                if (response === true) {
                    this.submitData("delete");

                }
            })
        }
        else {
            this.submitData();
        }
    }

    submitData(type = null) {

        this.isVar = false;
        this.spinner.show();
        if (this.cityObj.effectiveDt) {
            this.cityObj.effectiveDt = moment(this.cityObj.effectiveDt).format("YYYY-MM-DD");
        }
        if (this.cityObj.expiryDate) {
            this.cityObj.expiryDate = moment(this.cityObj.expiryDate).format("YYYY-MM-DD");
        }

        this.$city.saveCity(this.cityObj).subscribe(response => {
            // this.cityForm.submitted = false;

            this.cityObj.id = response;
            this.cityObj.stateList=this.stateList;
            this.cityObj.districtList=this.districtList;
            let cityObj = { ...this.cityObj };
            if (type == "delete") {
                this.dialogRef.close({ type: "delete", status: true, cityName: cityObj.cityName });
            } else {
                this.dialogRef.close(cityObj);
            }
            this.spinner.hide();
            this.cityForm.resetForm();
        });
    }

    inActiveStatus() {

        if (this.editStatus == 0) {
        this.inActiveFlag = true;
        }
    }

    expiryMinDate: any;
    isVar = <boolean>true;
    isChange = <boolean>true;
    currentDate = moment(new Date()).format("YYYY-MM-DD");

    checkForExpiryDate(effectiveDt) {

        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
        if(this.cityObj.expDt){
            this.cityObj.expDt = moment(this.cityObj.expDt).format("YYYY-MM-DD");
        }
        if(this.cityObj.effectiveDt){
            this.cityObj.effectiveDt = moment( this.cityObj.effectiveDt).format("YYYY-MM-DD");
        }
        if (this.cityObj.expDt <= effectiveDt && (!this.cityObj.id || this.cityObj.expDt <= effectiveDt)) {
            this.isVar = true;
        }
        else {
            this.isVar = false;
        }

        if (effectiveDt < todayDate) {
            return this.expiryMinDate = todayDate;
        }
        return this.expiryMinDate = moment(effectiveDt, 'YYYY-MM-DD').add(1, "d").format('YYYY-MM-DD');

    }

    isInactive = <boolean>false;
    removeMinDate(effectiveDate) {
        this.$common.setExpiryDate(effectiveDate, this.isInactive)
    }

    changeDateFormat(effectiveDt, expDt) {

        console.log(effectiveDt)
        this.isVar = true;

        if (effectiveDt) {
            this.cityObj.effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
        }
        if (expDt) {
            this.cityObj.expDt = moment(expDt).format('YYYY-MM-DD');
        }

        this.checkForExpiryDate(effectiveDt)
    }

}
