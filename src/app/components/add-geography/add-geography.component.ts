import { NgxSpinnerService } from 'ngx-spinner';
import { LoaderService } from './../../services/loader.service';
import { CityService } from './../../services/city.service';
import { DistrictService } from './../../services/district.service';
import { CountryService } from './../../services/country.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddCountryComponent } from 'src/app/modals/add-country/add-country.component';
import { StateComponent } from 'src/app/modals/state/state.component';
import { AddDistrictComponent } from 'src/app/modals/add-district/add-district.component';
import { AddCityComponent } from 'src/app/modals/add-city/add-city.component';
import { PincodeFeatureComponent } from 'src/app/modals/pincode-feature/pincode-feature.component';
import { AddPincodeComponent } from 'src/app/modals/add-pincode/add-pincode.component';
import { Country } from 'src/app/Models/country';
import { StateService } from 'src/app/services/state.service';
import { PincodeService } from 'src/app/services/pincode.service';
import { District } from 'src/app/Models/district';
import { AppComponent } from 'src/app/app.component';
import { State } from 'src/app/Models/state';
import { City } from 'src/app/Models/city';
import { AuthorizationService } from 'src/app/services/authorisation.service';
import { NgxPermissionsService } from 'ngx-permissions';
import * as moment from "moment";

@Component({
    selector: 'app-add-geography',
    templateUrl: './add-geography.component.html',
})
export class AddGeographyComponent implements OnInit {

    constructor(public dialog: MatDialog, private $country: CountryService, private appComp: AppComponent,
        private $state: StateService, private $district: DistrictService, private $city: CityService,
        private $pincode: PincodeService, private spinner: NgxSpinnerService, private AuthorizationService: AuthorizationService,
        private permissionsService: NgxPermissionsService, private cdDetRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.getAllCountry();
        // this.getPermission();
        this.permissionsService.loadPermissions(this.AuthorizationService.getPermissions('GEOGRAPHY', 'GEOGRAPHY'));

    }

    countryObj;
    districtObj
    stateObj;
    cityTempObj;
    nameWithStatus;
    countryList: Array<Country> = [];
    stateList: Array<State> = [];
    districtList: Array<District> = [];
    cityList: Array<City> = [];
    pincodeList: Array<any> = [];
    organisationList;
    organisationObj;
    countryId;
    stateId;
    districtId;
    pincodeId;
    cityId;
    permissionOperandList: Array<any> = [];
    stateTypeList: Array<any>;
    createHide = <boolean>false;
    UpdateHide = <boolean>false;
    currentDate = moment(new Date()).format("YYYY-MM-DD");

    getAllCountry() {
        this.spinner.show();
        this.$country.getAll().subscribe(response => {
            this.countryList = response.responseData;

            this.countryList.forEach(elem => {
                let status = this.getStatus(elem);
                elem.nameWithStatus = `${elem.countryName}  (${status})`;
            })
            if (this.countryList.length == 1) {
                this.countryId = this.countryList[0].id;
            }
            this.countryList = this.countryList.sort((a, b) => a.countryName.localeCompare(b.countryName))
            this.spinner.hide();
        })
    }

    getPincodesByCity() {
        this.spinner.show();
        this.pincodeId = null;
        this.pincodeList = [];
        this.$pincode.getByCityId(this.cityId).subscribe(response => {
            this.pincodeList = response;
            this.pincodeList.forEach(elem => {
                let status = this.getStatus(elem);
                elem.nameWithStatus = `${elem.pincode}  (${status})`;
            })
            if (this.pincodeList.length == 1) {
                this.pincodeId = this.pincodeList[0].id;
            }
            this.pincodeList = this.pincodeList.sort((a, b) => a.pincode.localeCompare(b.pincode))
            this.spinner.hide();
        })
    }
 
    getStateByCountry() {
        this.spinner.show();
        this.stateId = null;
        this.cityId = null;
        this.districtId = null;
        this.pincodeId = null;
        this.stateList = [];
        this.cityList = [];
        this.pincodeList = [];
        this.districtList = [];
        this.$state.getByCountryId(this.countryId).subscribe(response => {
            this.stateList = response;
            this.stateList.forEach(elem => {
                let status = this.getStatus(elem);
                elem.nameWithStatus = `${elem.stateName}  (${status})`;
            })
            if (this.stateList.length == 1) {
                this.stateId = this.stateList[0].id;
                return this.getDistrictByState();
            }
            this.stateList = this.stateList.sort((a, b) => a.stateName.localeCompare(b.stateName))
            this.spinner.hide();
        })
    }

    getDistrictByState() {
        this.spinner.show();
        this.districtId = null;
        this.cityId = null;
        this.pincodeId = null;
        this.cityList = [];
        this.pincodeList = [];
        this.$district.getByStateId(this.stateId).subscribe(response => {
            this.districtList = response;
            this.districtList.forEach(elem => {
                let status = this.getStatus(elem);
                elem.nameWithStatus = `${elem.districtName}  (${status})`;
            })
            if (this.districtList.length == 1) {
                this.districtId = this.districtList[0].id;
                return this.getCitiesByDestrict();
            }
            this.districtList = this.districtList.sort((a, b) => a.districtName.localeCompare(b.districtName));
            this.spinner.hide();
        })
    }

    getCitiesByDestrict() {
        this.spinner.show();
        this.cityId = null;
        this.pincodeId = null;
        this.pincodeList = [];
        this.$city.getByDistrictId(this.districtId).subscribe(response => {
            this.cityList = response;
            this.cityList.forEach(elem => {
                let status = this.getStatus(elem);
                elem.nameWithStatus = `${elem.cityName}  (${status})`;
            })
            if (this.cityList.length == 1) {
                this.cityId = this.cityList[0].id;
                return this.getPincodesByCity();
            }
            this.cityList = this.cityList.sort((a, b) => a.cityName.localeCompare(b.cityName))
            this.spinner.hide();
        })
    }
    openCountryDialog(countryId = null, isType = null) {

        this.spinner.show();
        let data = {
            status: 1,
            type: isType
        };
        if (countryId) {
            data = { ... this.countryList.find(elem => elem.id == countryId) };
            data.type = isType;
        }

        let dialog = this.dialog.open(AddCountryComponent, {
            width: '65vw',
            panelClass: 'mdmDialog',
            data: data
        });
        this.spinner.hide();
        dialog.afterClosed().subscribe(response => {

            if (response === true) {
                return;
            }

            if (response) {

                if (response.type == "delete" && response.status) {
                    let index = this.countryList.findIndex(res => res.id == countryId)
                    // this.countryList.splice(index, 1);
                    // this.countryId = null;
                    // this.countryList[index].status
                    this.countryList[index].nameWithStatus = `${this.countryList[index].countryName}  (${this.countryList[index].status ? 'ACTIVE' : 'INACTIVE'})`;
                    this.cdDetRef.detectChanges();
                    this.appComp.showMessage(`${response.countryName} Is Deleted`);
                    return
                }
                if (!countryId) {
                    this.countryList.push(response);
                    this.countryId = response.id;
                    this.countryList.forEach(elem => {
                        if (elem.id == this.countryId) {
                            let status = this.getStatus(elem);
                            elem.nameWithStatus = `${elem.countryName}  (${status})`;
                        }
                    })
                    this.stateId = null;
                    this.districtId = null;
                    this.cityId = null;
                    this.pincodeId = null;
                    this.stateList = [];
                    this.districtList = [];
                    this.cityList = [];
                    this.pincodeList = [];
                    this.appComp.showMessage(`${response.countryName} Is Added`);

                }
                else {
                    let index = this.countryList.findIndex(elem => elem.id == response.id);
                    this.countryList[index] = response;
                    this.countryId = response.id;
                    this.countryList.forEach(elem => {
                        if (elem.id == this.countryId) {
                            let status = this.getStatus(elem);
                            elem.nameWithStatus = `${elem.countryName}  (${status})`;
                        }
                    })
                    this.appComp.showMessage(`${response.countryName} Is Updated`);
                }
            }
        })
    }

    openStateDialog(stateId = null, isType = null) {
        let country = this.countryList.find(elem => elem.id == this.countryId);
        let data: any = {
            status: 1,
            type: isType
        };
        if (stateId) {
            data = { ... this.stateList.find(elem => elem.id == stateId) };
            data.type = isType;
        }
        data.country = country;
            data.countryList = this.countryList

        let dialog = this.dialog.open(StateComponent, {
            width: '65vw',
            panelClass: 'mdmDialog',
            data: data
        });

        dialog.afterClosed().subscribe(response => {
            
            if (response === true) {
                return;
            }
            if (response) {

                if (response.type == "delete" && response.status) {
                    let index = this.stateList.findIndex(res => res.id == stateId);
                    this.stateList[index].nameWithStatus = `${this.stateList[index].stateName} (INACTIVE)`;
                    let obj = this.stateList[index];
                    this.stateList.splice(index, 1);

                    setTimeout(() => {
                        this.stateId = obj.id;
                        this.stateList.push(obj);
                        this.stateList = this.stateList.sort((a, b) => a.stateName.localeCompare(b.stateName))
                    }, 100);

                    this.appComp.showMessage(`${response.stateName} Is Deleted`);
                    return
                }

                if (!stateId) {
                    this.stateList.push(response);
                    this.stateId = response.id;
                    this.stateList.forEach(elem => {
                        if (elem.id == this.stateId) {
                            let status = this.getStatus(elem);
                            elem.nameWithStatus = `${elem.stateName}  (${status})`;
                        }
                    })
                    this.countryList.forEach(elem => {
                        if (response.country) {
                            if (elem.id == response.country.id) {
                                this.countryId = response.country.id;
                                let status = this.getStatus(elem);
                                elem.nameWithStatus = `${elem.countryName}  (${status})`;
                            }
                        }

                    })
                    this.districtId = null;
                    this.cityId = null;
                    this.pincodeId = null;
                    this.districtList = [];
                    this.cityList = [];
                    this.pincodeList = [];
                    this.appComp.showMessage(`${response.stateName} Is Added`);
                } else {
                    let index = this.stateList.findIndex(elem => elem.id == response.id);
                    this.stateList[index] = response;
                    this.stateId = response.id;
                    this.stateList.forEach(elem => {
                        if (elem.id == this.stateId) {
                            let status = this.getStatus(elem);
                            elem.nameWithStatus = `${elem.stateName}  (${status})`;
                        }
                    })
                    this.appComp.showMessage(`${response.stateName} Is Updated`);
                }
            }
        })
    }

    openDistrictDialog(districtId = null, isType = null) {

        let country = this.countryList.find(elem => elem.id == this.countryId);
        let state = this.stateList.find(elem => elem.id == this.stateId);
        var district = {};
        if (districtId) {
            district = this.districtList.find(elem => elem.id == this.districtId);

        }
        let data = {
            status: 1,
            state: state ? state : null,
            country: country ? country : null,
            stateList: this.stateList,
            countryList: this.countryList,
            district: district ? district : null,
            type: isType
        };


        let dialog = this.dialog.open(AddDistrictComponent, {
            width: '65vw',
            panelClass: 'mdmDialog',
            data: data
        });

        dialog.afterClosed().subscribe(response => {

            if (response === true) {
                return;
            }
            if (response) {

                if (response.type == "delete" && response.status) {
                    let index = this.districtList.findIndex(res => res.id == districtId)
                    this.districtList[index].nameWithStatus = `${this.districtList[index].districtName} (INACTIVE)`;
                    let obj = this.districtList[index];
                    this.districtList.splice(index, 1);

                    setTimeout(() => {
                        this.districtId = obj.id;
                        this.districtList.push(obj);
                        this.districtList = this.districtList.sort((a, b) => a.districtName.localeCompare(b.districtName))
                    }, 100);
                    this.appComp.showMessage(`${response.districtName} Is Deleted`);
                    return
                }


                if (!districtId) {
                    this.districtList.push(response);
                    this.districtId = response.id;
                    this.stateList = response.stateList;
                    this.districtList.forEach(elem => {
                        if (elem.id == this.districtId) {
                            let status = this.getStatus(elem);
                            elem.nameWithStatus = `${elem.districtName}  (${status})`;
                        }
                    })
                    this.countryList.forEach(elem => {
                        if (response.state.country.id) {
                            if (elem.id == response.state.country.id) {
                                this.countryId = response.state.country.id;
                            }
                        }

                    })
                    this.stateList.forEach(elem => {
                        if (response.state.id) {
                            if (elem.id == response.state.id) {
                                this.stateId = response.state.id;
                                let status = this.getStatus(elem);
                                elem.nameWithStatus = `${elem.stateName}  (${status})`;
                            }
                        }

                    })
                    this.cityId = null;
                    this.pincodeId = null;
                    this.cityList = [];
                    this.pincodeList = [];
                    this.appComp.showMessage(`${response.districtName} Is Added`);
                }
                else {
                    let index = this.districtList.findIndex(elem => elem.id == response.id);
                    this.districtList[index] = response;
                    this.districtId = response.id;
                    this.stateList = response.stateList;
                    this.districtList.forEach(elem => {
                        if (elem.id == this.districtId) {
                            let status = this.getStatus(elem);
                            elem.nameWithStatus = `${elem.districtName}  (${status})`;
                        }
                    })
                    this.countryList.forEach(elem => {
                        if (elem.id == response.state.country.id) {
                            this.countryId = response.state.country.id;
                        }
                    })
                    this.stateList.forEach(elem => {
                        if (elem.id == response.state.id) {
                            this.stateId = response.state.id;
                            let status = this.getStatus(elem);
                            elem.nameWithStatus = `${elem.stateName}  (${status})`;
                        }
                    })

                    this.appComp.showMessage(`${response.districtName} Is Updated`);
                }
            }
        })
    }

    openCityDialog(cityId = null, isType = null) {
   
        let country = this.countryList.find(elem => elem.id == this.countryId);
        let state = this.stateList.find(elem => elem.id == this.stateId);

        // let district = {};
        if (this.districtId) {
            var district = this.districtList.find(elem => elem.id == this.districtId);
        }

        let data: any = {
            district: district ? district : null,
            country: country ? country.id : null,
            state: state ? state.id : null,
            stateList: this.stateList,
            countryList: this.countryList,
            districtList: this.districtList,
            type: isType,
            cityObj: {
                status: 1
            }
        };
        if (cityId) {
            data.cityObj = { ... this.cityList.find(elem => elem.id == this.cityId) };
        }

        let dialog = this.dialog.open(AddCityComponent, {
            width: '65vw',
            panelClass: 'mdmDialog',
            data: data
        });

        dialog.afterClosed().subscribe(response => {

            if (response === true) {
                return;
            }
            if (response) {
                if (response.type == "delete" && response.status) {
                    let index = this.cityList.findIndex(res => res.id == cityId)
                    this.cityList[index].nameWithStatus = `${this.cityList[index].cityName} (INACTIVE)`;
                    let obj = this.cityList[index];
                    this.cityList.splice(index, 1);

                    setTimeout(() => {
                        this.cityId = obj.id;
                        this.cityList.push(obj);
                        this.cityList = this.cityList.sort((a, b) => a.cityName.localeCompare(b.cityName))
                    }, 100);
                    this.appComp.showMessage(`${response.cityName} Is Deleted`);
                    return
                }
                if (this.cityId != response.id) {
                    this.cityList.push(response);
                    this.cityId = response.id;
                    this.stateList = response.stateList;
                    this.districtList = response.districtList;
                    this.cityList.forEach(elem => {
                        if (elem.id == this.cityId) {
                            let status = this.getStatus(elem);
                            elem.nameWithStatus = `${elem.cityName}  (${status})`;
                        }
                    })
                    this.countryList.forEach(elem => {
                        if (response.district.state.country.id) {
                            if (elem.id == response.district.state.country.id) {
                                this.countryId = response.district.state.country.id;
                                let status = this.getStatus(elem);
                                elem.nameWithStatus = `${elem.countryName}  (${status})`;
                            }
                        }

                    })
                    this.stateList.forEach(elem => {
                        if (response.district.state.id) {
                            if (elem.id == response.district.state.id) {
                                this.stateId = response.district.state.id;
                                let status = this.getStatus(elem);
                                elem.nameWithStatus = `${elem.stateName}  (${status})`;
                            }
                        }

                    })
                    this.districtList.forEach(elem => {
                        if (response.district.id) {
                            if (elem.id == response.district.id) {
                                this.districtId = response.district.id;
                                let status = this.getStatus(elem);
                                elem.nameWithStatus = `${elem.districtName}  (${status})`;
                            }
                        }

                    })
                    this.pincodeList = [];
                    this.pincodeId = null;
                    this.appComp.showMessage(`${response.cityName} Is Added`);
                }
                else {
                    let index = this.cityList.findIndex(elem => elem.id == response.id);
                    this.cityList[index] = response;
                    this.countryId = response.district.state.country.id;
                    this.cityId = response.id;
                    this.stateList = response.stateList;
                    this.districtList = response.districtList;
                    this.stateId = response.district.state.id;
                    setTimeout(() => {
                        this.districtId = response.district.id;
                    }, 100);
                    this.setDropdownNames();
                    this.appComp.showMessage(`${response.cityName} Is Updated`);
                }
            }

        })

    }

    setDropdownNames() {


        this.countryList.forEach(elem => {
            if (!elem.nameWithStatus) {
                let status = this.getStatus(elem);
                elem.nameWithStatus = `${elem.countryName}  (${status})`;
            }
        })

        this.cityList.forEach((elem, index) => {
            if (!elem.nameWithStatus) {
                let status = this.getStatus(elem);
                this.cityList[index].nameWithStatus = `${elem.cityName}  (${status})`;
            }
        })

        this.stateList.forEach(elem => {
            if (!elem.nameWithStatus) {
                let status = this.getStatus(elem);
                elem.nameWithStatus = `${elem.stateName}  (${status})`;
            }
        })

        this.districtList.forEach(elem => {
            if (!elem.nameWithStatus) {
                let status = this.getStatus(elem);
                elem.nameWithStatus = `${elem.districtName}  (${status})`;
            }
        })

        this.pincodeList.forEach(elem => {
            if (!elem.nameWithStatus) {
                let status = this.getStatus(elem);
                elem.nameWithStatus = `${elem.pincode}  (${status})`;
            }
        })
    }

    openPinCodeDialog(pincodeId = null, isType = null) {

        let country = this.countryList.find(elem => elem.id == this.countryId);
        let state = this.stateList.find(elem => elem.id == this.stateId);
        let district = this.districtList.find(elem => elem.id == this.districtId);
        if (this.cityId) {
            // var city = this.cityList.find(elem => elem.id = this.cityId);
            this.cityList.forEach(elem => {
                if (elem.id == this.cityId) {
                    this.cityTempObj = elem;
                }
            });
        }
        let data = {
            city: this.cityTempObj ? this.cityTempObj : null,
            country: country ? country.id : null,
            state: state ? state.id : null,
            district: state ? district.id : null,
            districtList: this.districtList,
            stateList: this.stateList,
            countryList: this.countryList,
            cityList: this.cityList,
            type: isType,
            pincodeObj: {
                status: 1,
            }

        };
        if (pincodeId) {
            data.pincodeObj = { ... this.pincodeList.find(elem => elem.id == this.pincodeId) };
        }

        let dialog = this.dialog.open(AddPincodeComponent, {
            width: '65vw',
            panelClass: 'mdmDialog',
            data: data
        });

        dialog.afterClosed().subscribe(response => {

            if (response === true) {
                return;
            }

            if (response) {
                if (response.type == "delete" && response.status) {

                    let index = this.pincodeList.findIndex(res => res.id == pincodeId)
                    this.pincodeList[index].nameWithStatus = `${this.pincodeList[index].pincode} (INACTIVE)`;
                    let obj = this.pincodeList[index];
                    this.pincodeList.splice(index, 1);

                    setTimeout(() => {
                        this.pincodeId = obj.id;
                        this.pincodeList.push(obj);
                        this.pincodeList = this.pincodeList.sort((a, b) => a.pincode.localeCompare(b.pincode))
                    }, 100);
                    this.appComp.showMessage(`${response.pincode} Is Deleted`);
                    return
                }


                if (this.pincodeId != response.id) {
                    this.pincodeList.push(response);
                    this.stateList = response.stateList;
                    this.districtList = response.districtList;
                    this.cityList = response.cityList;

                    setTimeout(() => {
                        this.pincodeId = response.id;
                        this.cityId = response.city.id;
                    }, 100);

                    this.setDropdownNames();

                    this.appComp.showMessage(`${response.pincode} Is Added`);
                }
                else {
                    let index = this.pincodeList.findIndex(elem => elem.id == response.id);
                    this.pincodeList[index] = response;

                    this.stateList = response.stateList;
                    this.districtList = response.districtList;
                    this.cityList = response.cityList;

                    this.setDropdownNames();

                    setTimeout(() => {
                        this.pincodeId = response.id;
                        this.cityId = response.city.id;
                        this.districtId = response.city.district.id;
                        this.districtId = response.city.district.id;
                        this.stateId = response.city.district.state.id;
                    }, 100);


                    this.appComp.showMessage(`${response.pincode} Is Updated`);
                }
            }
        })
    }

    getStatus(object: any) {

        let status = 'INACTIVE';
        if (!object.status) {
            return status;
        }

        if (object.status) {

            status = 'ACTIVE';
            if (!object.expiryDate) {
                status = 'ACTIVE';
            }

            if (object.expiryDate && this.currentDate > object.expiryDate) {
                status = 'INACTIVE';
            }

            if (!object.expiryDate && !object.expDt) {
                status = 'ACTIVE';
            }

            if (object.expDt && this.currentDate > object.expDt) {
                status = 'INACTIVE';
            }

        }

        return status;

    }

    openPinCodeFeatureDialog() {
        this.dialog.open(PincodeFeatureComponent, {
            width: '65vw',
            panelClass: 'mdmDialog',
        });
    }

}
