import { Component, OnInit } from '@angular/core';
import { EditFuelComponent } from 'src/app/modals/edit-fuel/edit-fuel.component';
import { MatDialog } from '@angular/material';
import { FuelPriceService } from 'src/app/services/fuel.service';
import moment from 'moment';
import { AppComponent } from 'src/app/app.component';
import { FuelStatePriceComponent } from 'src/app/modals/fuel-state-price/fuel-state-price.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthorizationService } from 'src/app/services/authorisation.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { AddMetroComponent } from 'src/app/modals/add-metro/add-metro.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-fuel',
    templateUrl: './fuel.component.html',
    styleUrls: ['./fuel.component.css']
})
export class FuelComponent implements OnInit {

    constructor(public dialog: MatDialog,
        private $fuelPrice: FuelPriceService,
        private datePipe: DatePipe,
        private appComp: AppComponent,
        private spinner: NgxSpinnerService, private AuthorizationService: AuthorizationService,
        private permissionsService: NgxPermissionsService
    ) { }

    ngOnInit() {

        this.getFuelPrice();
        this.metroMappLoadList();
        this.permissionsService.loadPermissions(this.AuthorizationService.getPermissions('LOOKUP', 'FUEL'));
    }
    fuelNameSearchCtrl = <string>'';
    contractTypeNameSearchCtrl = <string>'';
    fuel2NameSearchCtrl = <string>'';
    fuelTypeNameSearchCtrl = <string>'';
    fuel3NameSearchCtrl = <string>'';
    stateNameSearchCtrl = <string>'';
    fuel4NameSearchCtrl = <string>'';
    defaultForm = <boolean>true;
    stateForm = <boolean>false;
    fuelTab;
    submitPermission = <boolean>true;
    showMetro = <boolean>false;
    fuelPriceObj = {
        status: 1
    } as any;
    fuelPriceList: Array<any> = [];
    fuelFuelIndexList: Array<any> = [];
    fuelMapFuelIndexList: Array<any> = [];
    allMetroMappingList: Array<any> = [];
    fuelTypeList: Array<any> = []
    fuelStateList: Array<any> = [];
    fuelContractTypeList: Array<any> = []
    p: number = 1;
    showFuel = <boolean>true;
    addFuel = <boolean>false;
    minDate = new Date(new Date().setDate(new Date().getDate()));
    metroMapList: Array<any> = [];
    fuelIndexList: Array<any> = [];
    cityList: Array<any> = [];
    selectedState: Array<any> = [];
    metroSelected: any;
    lkpFuelIndexId: any;
    searchCtrl = '';
    currentDate = moment(new Date()).format("YYYY-MM-DD");

    FuelTab(fuelIndexId = null) {

        this.showFuel = true;
        this.addFuel = false;
        this.showMetro = false;
        this.p = 1;
        if (fuelIndexId) {
            return this.getFuelIndexList(fuelIndexId);
        }
    }

    clearObj() {

        this.fuelPriceObj = {};

    }

    searchLkpFuelIndexId: any;
    addFuelFunc(fuelIndexId) {

        this.isDisableExpiryDate = false;
        this.addFuel = true;
        this.showFuel = false;
        this.isVar = false;
        this.fuelPriceObj = {};
        this.selectedCities = [];
        this.selectedState = [];
        this.submitPermission = false;
        this.fuelPriceObj.lkpFuelIndexId = fuelIndexId;
        this.fuelIndexList.forEach(elem => {
            if (elem.id == fuelIndexId) {
                if (elem.descr.trim() == "ALL INDIA") {
                    this.isCityShow = true;
                    this.isStateShow = false;
                }
            }
        })
        let lkpFuelIndexName = this.fuelIndexList.find(elem => elem.id == this.fuelPriceObj.lkpFuelIndexId)
        if (!lkpFuelIndexName) {
            return false;
        }
        let eightState = lkpFuelIndexName.descr.includes('8')
        let fourState = lkpFuelIndexName.descr.includes('4')
        let allIndia = lkpFuelIndexName.descr.toLowerCase().includes('all')
        this.IsDisabledState = false;
        if (eightState || fourState) {
            this.isCityShow = false;
            this.isStateShow = false;
            this.IsDisabledState = false;
        } else if (allIndia) {
            this.IsDisabledState = true;
        } else {
            this.isStateShow = true;
            this.isCityShow = true;
        }

    }


    editFuelMaster(fuel = null, type = null) {
        if (type == 0) {
            this.submitPermission = false;
        }
        else {
            this.submitPermission = true;
        }
        this.addFuel = true;
        this.showFuel = false;
        this.fuelPriceObj = { ...fuel };
        this.isVar = false;
        this.selectedState = this.fuelStateList.filter(elem => this.fuelPriceObj.fuelStateMaps.findIndex(elm => elm.status && elm.stateId == elem.id) != -1)

        let lkpFuelIndexName = this.fuelIndexList.find(elem => elem.id == this.fuelPriceObj.lkpFuelIndexId)
        if (lkpFuelIndexName.descr.trim() == "ALL INDIA") {
            this.isCityShow = true;
            this.isStateShow = false;
        }
        if (!lkpFuelIndexName) return false;
        let eightState = lkpFuelIndexName.descr.includes('8')
        let fourState = lkpFuelIndexName.descr.includes('4')
        let allIndia = lkpFuelIndexName.descr.toLowerCase().includes('all')
        this.IsDisabledState = false;
        if (eightState || fourState) {
            this.isCityShow = false;
            this.isStateShow = false;
            this.IsDisabledState = false;
            this.getFuelMapDetails(fuel.lkpFuelIndexId);
        } else if (allIndia) {
            this.IsDisabledState = true;
        } else {
            this.isStateShow = true;
            this.isCityShow = true;
        }


        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        if (this.fuelPriceObj.expDt < todayDate) {
            this.isDisableExpiryDate = true;
        } else {
            this.isDisableExpiryDate = false;
        }


    }
    saveStateFuel(obj = undefined) {
        if (!obj.id) {
            obj = {
                "ids": obj
            }
        }

        let dialog = this.dialog.open(FuelStatePriceComponent, {
            width: '73vw',
            panelClass: 'mdmDialog',
            data: obj
        })
        dialog.afterClosed().subscribe(response => {

            if (response === true) {
                return;
            }
            if (response) {
                if (!obj.id) {
                    this.fuelPriceList.push(response);
                    this.appComp.showMessage(`FUEL IS ADDED`);
                    this.p = 1
                    this.getFuelIndexList(response.lkpFuelIndexId);

                }
                else {
                    let index = this.fuelPriceList.findIndex(elem => elem.id == obj.id);
                    response.id = obj.id;
                    this.p = 1
                    this.fuelPriceList.splice(index, 0, response);
                    this.getFuelIndexList(response.lkpFuelIndexId);
                    if (response.status == 0) {
                        this.appComp.showMessage(`FUEL IS DELETED`);
                    }
                    else {
                        this.appComp.showMessage(`FUEL IS UPDATED`);

                    }
                }

            }

        })
    }

    showTable() {
        this.stateForm = false;
        this.showFuel = true;
    }

    getFuelPrice() {
        this.spinner.show();
        this.$fuelPrice.getAllFuelPrice().subscribe(response => {

            this.fuelPriceList = response.responseData;
            this.fuelTypeList = response.referenceData.fuelTypeList;
            this.fuelStateList = response.referenceData.stateList.filter(elem => elem.descr);
            this.fuelContractTypeList = response.referenceData.contractType;
            this.fuelFuelIndexList = response.referenceData.fuelIndexList;
            this.fuelMapFuelIndexList = [...response.referenceData.fuelIndexList.filter(elem => elem.descr.trim() == '8 METRO' || elem.descr.trim() == '4 METRO')];
            this.searchLkpFuelIndexId = this.fuelFuelIndexList[0].id;
            this.spinner.hide();
            return this.getFuelIndexList(this.searchLkpFuelIndexId);

        });
    }

    getFuelIndexList(fuelIndexId, searchLkpFuelIndexId = null) {
        
        this.spinner.show();
        this.p = 1;
        this.$fuelPrice.getFuelIndexByfuelType(fuelIndexId).subscribe(response => {
            this.fuelPriceList = response.responseData;
            this.fuelPriceObj.fuelIndexId = fuelIndexId;
            if (fuelIndexId) {
                this.searchLkpFuelIndexId = fuelIndexId;
            }
            this.spinner.hide();
        })
    }

    getStateId(id) {

        var data = this.fuelFuelIndexList.find(elem => elem.id == id)
        if (data.descr == "STATE") {
            this.defaultForm = false;
            this.stateForm = true;
            return this.getFuelIndexList(id);
        }
    }


    getStatesMultiple() {
        let states = [];

        this.selectedState.map(elem => {
            let state = this.fuelPriceObj.fuelStateMaps.find(elm => elm.stateId == elem.id);
            if (state) {
                state.status = 1;
                states.push(state);
            } else {
                states.push({
                    "stateId": elem.id,
                    "id": 0,
                    "status": 1
                });
            }
        })

        this.fuelPriceObj.fuelStateMaps.forEach(elm => {
            let stateIndex = this.selectedState.findIndex(elem => elm.stateId == elem.id);
            if (stateIndex == -1) {
                elm.status = 0
                states.push(elm);
            }
        })

        return states;
    }

    saveFuelPrice(fuelConfirmation) {




        if (this.fuelPriceObj.id) {
            return this.submitFuelPrice();
        }
        let dialog = this.dialog.open(fuelConfirmation, {
            width: '35vw',
            panelClass: 'mdmDialog',
        })

        dialog.afterClosed().subscribe(response => {
            if (response != 'cancel') {
                this.submitFuelPrice();
            } else if (response == 'cancel') {
            }
        });

    }

    submitFuelPrice() {

        this.spinner.show();
        this.fuelPriceObj.effectiveDt = moment(this.fuelPriceObj.effectiveDt).format("YYYY-MM-DD");
        if (this.fuelPriceObj.fuelbaseDt) {
            this.fuelPriceObj.fuelbaseDt = moment(this.fuelPriceObj.fuelbaseDt).format("YYYY-MM-DD");
        }
        if (this.fuelPriceObj.expDt) {
            this.fuelPriceObj.expDt = moment(this.fuelPriceObj.expDt).format("YYYY-MM-DD");
        }

        if (this.selectedState) {
            if (this.fuelPriceObj.id) {
                this.fuelPriceObj.fuelStateMaps = this.getStatesMultiple();
            } else {
                this.selectedState.forEach(elem => {
                    if (this.fuelPriceObj.fuelStateMaps) {
                        let fuelState = this.fuelPriceObj.fuelStateMaps.find(elm => elm.stateId == elem.id);
                        if (!fuelState) {
                            this.fuelPriceObj.fuelStateMaps.push({
                                "stateId": elem.id,
                                "id": 0,
                                "status": 1
                            })
                        }
                    } else {
                        this.fuelPriceObj.fuelStateMaps = [{
                            "stateId": elem.id,
                            "id": 0,
                            "status": 1
                        }]
                    }
                })

            }
        }
        delete this.fuelPriceObj.status;

        this.$fuelPrice.saveFuelPrice(this.fuelPriceObj).subscribe(response => {
            if (!this.fuelPriceObj.id) {
                this.fuelPriceObj.id = response.data;
                this.fuelPriceList.splice(0, 0, this.fuelPriceObj);
                setTimeout(() => {
                    this.p = 1;
                    this.addFuel = false;
                    this.showFuel = true;
                    this.fuelPriceObj.fuelStateMaps = [] as any;
                    let tempId = this.fuelPriceObj.lkpFuelIndexId;
                    this.fuelPriceObj = {} as any;
                    this.fuelPriceObj.lkpFuelIndexId = tempId;
                    this.spinner.hide();
                }, 1000);
                this.appComp.showMessage(`FUEL IS ADDED`);
                return this.getFuelIndexList(this.fuelPriceObj.lkpFuelIndexId);

            }
            else {
                this.fuelPriceList = this.fuelPriceList.map(elem => {
                    if (elem.id == this.fuelPriceObj.id) {
                        elem = this.fuelPriceObj;
                    }
                    return elem;
                })
                this.fuelPriceObj.lkpFuelIndexId = this.fuelPriceObj.lkpFuelIndexId;
                this.appComp.showMessage(`FUEL IS UPDATED`);
                setTimeout(() => {
                    this.p = 1;
                    this.addFuel = false;
                    this.showFuel = true;
                    this.fuelPriceObj.fuelStateMaps = [] as any;
                    let tempId = this.fuelPriceObj.lkpFuelIndexId;
                    this.fuelPriceObj = {} as any;
                    this.fuelPriceObj.lkpFuelIndexId = tempId;
                    this.spinner.hide();
                }, 1000);
                this.getFuelIndexList(this.fuelPriceObj.lkpFuelIndexId);
            }

        });
    }
getMetroListList(selectedMetroId){

        this.spinner.show()
        this.allMetroMappingList.forEach(elem => {
            this.spinner.hide();
            if (selectedMetroId == elem.lkpFuelIndexId) {
                this.metroMapList = [];
                this.metroMapList.push(elem);
            }
        })
    }
    getCities() {
        let cities = [];
        this.selectedCities.forEach(elem => {
            let cityObj = this.selectedCity.find(elm => elm.id == elem.cityId);
            if (cityObj) {
                elem.status = 1;
                cities.push(elem)
            } else {
                elem.status = 0;
                cities.push(elem);
            }
        })

        this.selectedCity.forEach(elem => {
            let cityIndex = this.selectedCities.findIndex(elm => elm.cityId == elem.id);
            if (cityIndex == -1) {
                cities.push({
                    "cityId": elem.id,
                    "id": 0,
                    "status": 1
                })
            }
        })

        return cities;
    }

    listMetroFlag: boolean = false;
    getMetroMapping() {
        this.spinner.show();

        this.$fuelPrice.getMetroMapList().subscribe(response => {
            this.spinner.hide();
            this.metroMapList = response.responseData;
            this.allMetroMappingList = response.responseData;
            //       let fuelIndexArr = this.metroMapList.filter(elem => elem.descr.trim() == '8 METRO' || elem.descr.trim() == '4 METRO');
            // if(fuelIndexArr.length == 2) {
            //     this.listMetroFlag = true;
            //}
let fuelIndexArr = [];
            this.fuelIndexList.forEach((elem) => {
                this.metroMapList.forEach(element => {
                    if (element.lkpFuelIndexId == elem.id && (elem.descr.trim() == '8 METRO' || elem.descr.trim() == '4 METRO')) {

                        fuelIndexArr.push(element);
                        if (fuelIndexArr.length == 2) {
                            this.listMetroFlag = true;
                        }
                    }
                })
            })
        })
    }

    isMetro(metroObj) {
        let lkpFuelIndexName = this.fuelIndexList.find(elem => elem.id == metroObj.lkpFuelIndexId)
        if (!lkpFuelIndexName) return false;
        let eightState = lkpFuelIndexName.descr.includes('8')
        let fourState = lkpFuelIndexName.descr.includes('4')
        if (fourState || eightState) {
            return true;
        }
        return false;
    }

    metroMappLoadList() {
        this.$fuelPrice.getMetroMapLoad().subscribe(response => {
            this.fuelIndexList = response.referenceData.fuelIndexList
            this.cityList = response.referenceData.cityList
        })
    }


    effDate() {
        let effYear = parseInt(this.datePipe.transform(this.fuelPriceObj.effectiveDt, 'yyyy'))
        if (effYear > 9999) {
            this.fuelPriceObj.effectiveDt = "";
        }
    }

    expDate() {
        let expYear = parseInt(this.datePipe.transform(this.fuelPriceObj.expDt, 'yyyy'))
        if (expYear > 9999) {
            this.fuelPriceObj.expDt = "";
        }
    }

    fuelBaseDate() {
        let expYear = parseInt(this.datePipe.transform(this.fuelPriceObj.fuelbaseDt, 'yyyy'))
        if (expYear > 9999) {
            this.fuelPriceObj.fuelbaseDt = "";
        }
    }

    editMapping(metroMap) {
        this.spinner.show();

        this.$fuelPrice.getMetroMapById(metroMap.lkpFuelIndexId).subscribe(response => {
            this.spinner.hide();
            this.editMappingModal(response.responseData)

        })
    }


    addMetro() {

        let fuelIndexArr = this.fuelIndexList.filter(elem => elem.descr.trim() == '8 METRO' || elem.descr.trim() == '4 METRO');

        let data = {
            "fuelIndexList": fuelIndexArr,
            "cityList": this.cityList
        };

        let addDataObj: any = {
            data: data
        }
        if (this.metroSelected) {
            addDataObj.isAdd = {
                lkpFuelIndexId: this.metroSelected
            }
        }

        let dialog = this.dialog.open(AddMetroComponent, {
            width: '45vw',
            panelClass: 'mdmDialog',
            data: addDataObj
        })

        dialog.afterClosed().subscribe(response => {
            if (response && response.status) {
                this.metroMapList.push(response.data)
                this.appComp.showMessage(`METRO MAPPED`);
            }
        });
    }

    editMappingModal(editObj) {

        let data = {
            "fuelIndexList": this.fuelIndexList,
            "cityList": this.cityList,
            "EditType": 1
        };

        let dialog = this.dialog.open(AddMetroComponent, {
            width: '45vw',
            panelClass: 'mdmDialog',
            data: { data: data, editObj: editObj }
        })

        dialog.afterClosed().subscribe(response => {
            if (response && response.status) {
                this.getMetroMapping();
            }
        });
    }

    selectedCities: Array<any> = [];
    selectedCity: Array<any> = [];
    toogleDropdown = false;
    isCityShow = <boolean>true;
    isStateShow = <boolean>true;

    checkSelectedCity(o1, o2): boolean {
        if (o2) {
            return o1.id === o2.id
        }
    }

    checkSelectedState(o1, o2): boolean {

        if (o2 && o2) {
            return o1.id === o2.id
        }
    }
    IsDisabledState = <boolean>false;
    getSelectValueByType(fuelTypeId) {

        this.$fuelPrice.getLoadList().subscribe(response => {


        })
    }
    abc: Array<any> = [];
    getFuelMapDetails(lkpFuelIndexId) {

        this.IsDisabledState = false;
        this.fuelIndexList.map(elem => {
            if (lkpFuelIndexId == elem.id) {
                if (elem.descr.trim() == "STATE") {
                    this.isCityShow = true;
                    this.isStateShow = true;
                    this.IsDisabledState = false;
                    this.$fuelPrice.getFuelIndexByfuelType(lkpFuelIndexId).subscribe(response => {
                        this.selectedCities = response.responseData;
                        let selectedCities = [...this.selectedCities.filter(elem => elem.status == 1)];
                        this.selectedCity = this.fuelStateList.filter(elem => selectedCities.findIndex(elm => elm.cityId == elem.id) != -1);

                    })

                }
                else if (elem.descr.trim() == "ALL INDIA") {
                    this.IsDisabledState = true;
                    this.isCityShow = true;
                    this.isStateShow = false;
                }
                else {
                    this.$fuelPrice.getMetroMapById(lkpFuelIndexId).subscribe(response => {
                        this.selectedCities = response.responseData.cities;
                        let selectedCities = [...this.selectedCities.filter(elem => elem.status == 1)];
                        this.selectedCity = this.cityList.filter(elem => selectedCities.findIndex(elm => elm.cityId == elem.id) != -1);
                        this.IsDisabledState = false;
                        this.isCityShow = false;
                        this.isStateShow = false;
                        this.toogleDropdown = true;

                    })
                }
            }

        })

    }

    expiryMinDate: any;
    isDisableExpiryDate = false;
    isChange = <boolean>true;
    isVar = <boolean>false;
    checkForExpiryDate(effectiveDate) {

        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        if (this.fuelPriceObj.expDt) {
            this.fuelPriceObj.expDt = moment(this.fuelPriceObj.expDt).format("YYYY-MM-DD");
        }
        if (this.fuelPriceObj.effectiveDate) {
            this.fuelPriceObj.effectiveDt = moment(this.fuelPriceObj.effectiveDt).format("YYYY-MM-DD");
        }
        if (this.fuelPriceObj.expDt > effectiveDate && this.fuelPriceObj.expDt > todayDate) {
            this.isVar = false;
        }
        else if (!this.fuelPriceObj.id) {
            this.isVar = true;
        }
        if (effectiveDate < todayDate) {
            return this.expiryMinDate = todayDate;
        }
        return this.expiryMinDate = moment(effectiveDate, 'YYYY-MM-DD').add(1, "d").format('YYYY-MM-DD');

    }


    removeMinDate(effectiveDate) {
        this.expiryMinDate = moment(effectiveDate).format('YYYY-MM-DD');
    }

    changeDateFormat(effectiveDate, expDt) {

        console.log(effectiveDate)
        this.isVar = true;

        if (effectiveDate) {
            this.fuelPriceObj.effectiveDt = moment(effectiveDate).format('YYYY-MM-DD');
        }
        if (expDt) {
            this.fuelPriceObj.expDt = moment(expDt).format('YYYY-MM-DD');
        }

        this.checkForExpiryDate(effectiveDate)
    }

}
