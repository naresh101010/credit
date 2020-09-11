import { CommonService } from './../../services/common.service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryService } from 'src/app/services/country.service';
import { StateService } from 'src/app/services/state.service';
import { DistrictService } from 'src/app/services/district.service';
import { Country } from 'src/app/Models/country';
import { State } from 'src/app/Models/state';
import { District } from 'src/app/Models/district';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/Models/city';
import { GeographyService } from 'src/app/services/geography.service';
import moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { PincodeService } from 'src/app/services/pincode.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-add-pincode',
    templateUrl: './add-pincode.component.html',
})
export class AddPincodeComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private $country: CountryService,
        private $state: StateService,
        private $district: DistrictService,
        private $city: CityService,
        private $geography: GeographyService,
        private $pincode: PincodeService,
        public dialog: MatDialog,
        private spinner: NgxSpinnerService,
        private datePipe: DatePipe,
        private $common: CommonService,
        public dialogRef: MatDialogRef<AddPincodeComponent>
    ) {

    }
    @ViewChild("F", null) pincodeForm: any;
    today = moment(new Date()).format("YYYY-MM-DD");
    ngOnInit() {
        this.getAllCountry();
        this.getLoadList();

        let data = { ...this.data };
        this.editStatus = this.data.pincodeObj.status;
        this.countryList = this.data.countryList;
        this.stateList = this.data.stateList;
        this.districtList = this.data.districtList;
        this.cityList = this.data.cityList;
        if (this.data.city) {
            this.data.pincodeObj.city = this.data.city.id;
        }
        this.pincodeObj = this.data.pincodeObj;

        if (this.pincodeObj.expDt < this.currentDate) {
            this.isVar = false;
        }

        if (this.pincodeObj.status == 0 && this.pincodeObj.expDt < this.currentDate) {
            this.isInactive = true;
            this.expiryMinDate = this.currentDate;
        }
        else {
            this.isInactive = false;
        }

        // this.pincodeObj.city = this.data.city.id
        if (data.type != undefined) {
            if (data.type == 1) {
                this.pincodePrefix = "View";
                this.hideBtn = true;
            }
            else if (data.type == 0 && data.pincodeObj.id) {
                this.pincodePrefix = "Edit";
            }
        }
        else {
            this.pincodePrefix = "Add";
        }
        if (this.pincodeObj.effectiveDt) {
            this.pincodeObj.effectiveDt = moment(this.pincodeObj.effectiveDt).format("YYYY-MM-DD");
            this.today = this.pincodeObj.effectiveDt;
        }
        // if (this.pincodeObj.expDt) {
        // 	this.pincodeObj.expDt = moment(this.pincodeObj.expDt).format("YYYY-MM-DD");
        // }
        this.pincodeObj2.City = this.pincodeObj.city;

        if (data.state && data.country && data.district && data.city) {
            this.isDisabled = true;
        }

        setTimeout(() => {
            // this.pincodeObj.city = data.city.id;

            if (data.country && data.state && data.district) {
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

                this.districtList.map(elem => {
                    if (elem.id == data.district) {
                        this.districtId = elem.id
                    }
                })
            }
        }, 500)

        this.inActiveStatus();

    }
    countryNameSearchCtrl = <string>'';
    stateNameSearchCtrl = <string>'';
    districtNameSearchCtrl = <string>'';
    cityNameSearchCtrl = <string>'';
    pincodeFeatureNameSearchCtrl = <string>'';
    selfExeNameSearchCtrl = <string>'';
    countryList: Array<any>;
    stateList: Array<any>;
    districtList: Array<any>;
    safexTypesList: Array<any>;
    stateFeatureList: Array<any>;
    cityList: Array<any>;
    stateObj: number;
    districtId: number;
    cityId: number;
    stateId: number;
    editStatus = {} as any;
    isDisabled = <boolean>false;
    inActiveFlag = <boolean>false;
    countryId: number;
    pincodeObj = {
        status: 1
    } as any;
    pincodeObj2 = {} as any;
    disabledBtn: boolean;
    pincodePrefix: string;
    hideBtn;

    selectedFeature(o1: any, o2: any): boolean {

        if (o2 && o2) {
            return o1.id === o2.id;
        }
    }

    getPincodeDetails(pincodeId) {

        this.$pincode.getPincodeById(pincodeId).subscribe((response: any) => {

            this.pincodeObj = response.responseData;

            this.pincodeObj2.pincodeFeature = this.stateFeatureList.filter(elem => this.pincodeObj.pincodeFeature.findIndex(elm => elm.status && (elm.pincodeFeatureId == elem.id)) != -1)
            // this.pincodeObj2.pincodeFeature = this.pincodeObj.pincodeFeature;
            if (this.pincodeObj.city.id != undefined) {
                this.pincodeObj.city = this.pincodeObj.city.id;
            }
            if (this.pincodeObj.effectiveDt) {
                this.pincodeObj.effectiveDt = moment(this.pincodeObj.effectiveDt).format("YYYY-MM-DD");
                let today = moment(this.today).format("YYYY-MM-DD");
                if (today < this.pincodeObj.effectiveDt) {
                    this.today = this.pincodeObj.effectiveDt;
                }
            }
            if (this.pincodeObj.expDt) {
                this.pincodeObj.expDt = moment(this.pincodeObj.expDt).format("YYYY-MM-DD");
            }
        })
    }

    getLoadList() {

        this.$geography.getLoadData().subscribe(response => {
            this.safexTypesList = response.referenceData.safexTypes;
            this.stateFeatureList = response.referenceData.pincodeFeatures;
            if (this.data.pincodeObj.id) {
                this.getPincodeDetails(this.data.pincodeObj.id);
            }
        })
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
            // this.stateObj = this.stateId;
        })
    }

    getCitiesByDestrict() {
        this.$city.getByDistrictId(this.districtId).subscribe(response => {
            this.cityList = response;
            // this.districtObj = this.districtId;
        })
    }

    addPincode() {

        this.isVar = false;
        if (this.pincodeObj.expDt) {
            if (this.pincodeObj.expDt < this.currentDate && this.pincodeObj.expDt < this.pincodeObj.effectiveDt) {
                this.isVar = true;
            }
            else {
                this.isVar = false;
                this.pincodeObj.expDt = moment(this.pincodeObj.expDt).format("YYYY-MM-DD");
            }
        }
        if (this.pincodeObj.status == 0) {
            let dialog = this.dialog.open(DeleteModalComponent, {
                width: '35vw',
                panelClass: 'mdmDialog',
                data: { title: this.pincodeObj.pincode, heading: "Pincode" }
            });
            dialog.beforeClose().subscribe(response => {
                if (response === true) {
                    this.updatePincode('delete');

                }
            })
        }
        else {
            this.updatePincode();
        }
    }
    xyz = <boolean>true;
    temmpList: Array<any> = [];
    updatePincode(type = null) {

        this.isVar = false;
        this.spinner.show();
        if (this.pincodeObj.effectiveDt) {
            this.pincodeObj.effectiveDt = moment(this.pincodeObj.effectiveDt).format("YYYY-MM-DD");
        }
        if (this.pincodeObj.expDt) {
            this.pincodeObj.expDt = moment(this.pincodeObj.expDt).format("YYYY-MM-DD");
        }

        let cityVar = this.pincodeObj2.City
        this.pincodeObj.city = {
            id: cityVar
        };
        this.pincodeObj.city.district = {
            id: this.districtId
        }
        this.pincodeObj.city.district.state = {
            id: this.stateId
        };
        this.pincodeObj.city.district.state.country = {
            id: this.countryId
        };

        let picodeFeatures = [];
        if (this.pincodeObj2.pincodeFeature && this.pincodeObj.pincodeFeature) {
            this.pincodeObj2.pincodeFeature.map(elem => {
                let obj = this.pincodeObj.pincodeFeature.find(elm => elem.id == elm.pincodeFeatureId)
                if (obj) {
                    obj.status = 1;
                    picodeFeatures.push(obj);
                } else {
                    elem.status = 1;
                    elem.pincodeFeatureId = elem.id;
                    delete elem.id;
                    picodeFeatures.push(elem);
                }
            })

            let deletedArr = this.pincodeObj.pincodeFeature.filter(elm => picodeFeatures.findIndex(elem => elm.pincodeFeatureId == elem.pincodeFeatureId) == -1);
            deletedArr.map(elem => {
                elem.status = 0;
                picodeFeatures.push(elem);
            })

            this.pincodeObj.pincodeFeature = [...picodeFeatures];
        } else if (!this.pincodeObj.id) {
            this.pincodeObj.pincodeFeature = [];
            this.pincodeObj2.pincodeFeature.map(elem => {
                elem.pincodeFeatureId = elem.id;
                elem.status = 1;
                delete elem.id;
                this.pincodeObj.pincodeFeature.push(elem);
            })

        }

        this.$pincode.savePincode(this.pincodeObj).subscribe(response => {

            this.pincodeObj.id = response;
            this.pincodeObj.stateList = this.stateList;
            this.pincodeObj.districtList = this.districtList;
            this.pincodeObj.cityList = this.cityList;
            if (type == "delete") {
                this.dialogRef.close({ type: "delete", status: true, pincode: this.pincodeObj.pincode });
            } else {
                this.dialogRef.close(this.pincodeObj);
            }
            this.spinner.hide();
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
        if (this.pincodeObj.expDt) {
            this.pincodeObj.expDt = moment(this.pincodeObj.expDt).format("YYYY-MM-DD");
        }
        if (this.pincodeObj.effectiveDt) {
            this.pincodeObj.effectiveDt = moment(this.pincodeObj.effectiveDt).format("YYYY-MM-DD");
        }
        if (this.pincodeObj.expDt <= effectiveDt && (!this.pincodeObj.id || this.pincodeObj.expDt <= effectiveDt)) {
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
            this.pincodeObj.effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
        }
        if (expDt) {
            this.pincodeObj.expDt = moment(expDt).format('YYYY-MM-DD');
        }

        this.checkForExpiryDate(effectiveDt)
    }
}
