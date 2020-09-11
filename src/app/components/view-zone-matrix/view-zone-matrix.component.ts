import { CommonService } from './../../services/common.service';
import { DeleteModalComponent } from 'src/app/modals/delete-modal/delete-modal.component';
import { AddStateComponent } from './../../modals/add-state/add-state.component';
import { MatDialog } from '@angular/material';
import { StateService } from 'src/app/services/state.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LogisticZoneService } from "./../../services/logistic-zone.service";
import { AppComponent } from "./../../app.component";
import { RateGroup } from "./../../Models/rate-group";
import { LogisticZone } from "./../../Models/logistic-zone";
import { ZoneMatrixService } from "./../../services/zone-matrix.service";
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import * as _ from "lodash";
import { ZoneMatrix } from "src/app/Models/zone-matrix";
import { ZoneMatrixList } from "src/app/Models/zone-matrix-list";

import { RateGroupService } from "src/app/services/rate-group.service";
import { DatePipe } from '@angular/common';
import { AuthorizationService } from 'src/app/services/authorisation.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { element } from 'protractor';

@Component({
    selector: "app-view-zone-matrix",
    templateUrl: "./view-zone-matrix.component.html",
    styleUrls: ["./view-zone-matrix.component.css"]
})
export class ViewZoneMatrixComponent implements OnInit {
    constructor(
        private $logisticService: LogisticZoneService,
        private $zoneMatrix: ZoneMatrixService,
        private appComp: AppComponent,
        private $rateGroup: RateGroupService,
        private spinner: NgxSpinnerService,
        private datePipe: DatePipe,
        private $state: StateService,
        private AuthorizationService: AuthorizationService,
        private permissionsService: NgxPermissionsService,
        public dialog: MatDialog,
        private $common:CommonService
    ) { }

    ngOnInit() {
        this.getZones();
        this.permissionsService.loadPermissions(this.AuthorizationService.getPermissions('ZONE MATRIX', 'ZONE MATRIX'));

    }
    rateNameSearchCtrl = <string>'';
    rate2NameSearchCtrl = <string>'';
    submitPermission: boolean;
    p: number = 1;
    logisticCtrl=<string>'';
    type=<string>'Create';
    isVar = <boolean>true;
    viewZone = <boolean>true;
    addZone = <boolean>false;
    zoneMAtrixDetails = <boolean>false;
    isInactive = <boolean>false;
    zoneMatrixCombination = <boolean>false;
    inActiveFlag = <boolean>false;
    zoneObj = <ZoneMatrix>{
        status: 1,
        zmLzMapDTO: [],
        zmRGMapDTO: []
    };
    zoneList: Array<ZoneMatrix> = [];
    countryStateCityList: Array<ZoneMatrix> = [];
    logisticZoneList: Array<any> = [];
    rateGroupList: Array<any> = [];
    zmLzMapDTO: Array<any> = [];
    zmRGMapDTO: Array<any> = [];
    rateGroupWithMatrixList: Array<any> = [];
    testRate: any;
    zoneMatrixList: Array<ZoneMatrixList> = [];
    testLogistic: any;
    zoneMatrixName;
    logisticZoneComb: Array<any> = [];
    stateList: Array<any> = [];
    zmLzRgMapList: Array<any> = [];
    allStateList: Array<any> = [];
    disableNextBtn = false;
    currentDate = moment(new Date()).format("YYYY-MM-DD");

    compareZoneObjects(o1: any, o2: any): boolean {
        if (o2 && o2.status) {
            return o1.id === o2.id;
        }
    }

    compareRateObjects(o1: any, o2: any): boolean {
        if (o2 && o2.status) {
            return o1.id === o2.id;
        }
    }

    checkForSelectedRG(o1: any, o2: any): boolean {
        if (o2) {
            return o1.zmRgMapId === o2.zmRgMapId;
        }
    }

    getZones() {
        this.spinner.show();
        this.$zoneMatrix.getLastUpdatedZones().subscribe(response => {
            this.zoneList = response;
            this.spinner.hide();
        });
    }

    getZmLzRgMapping(zoneMatrixId) {
        this.spinner.show();
        this.$zoneMatrix.getZmLzRgMapping(zoneMatrixId).subscribe((response: any) => {
            this.spinner.hide();
            this.zmLzRgMapList = response;
            this.getRateListByMatrixId();
        })
    }

    stateCodeMappingList = [];
    getStateCode(zoneMatrix) {
        this.$zoneMatrix.getStateCode(zoneMatrix.id).subscribe((response: any) => {

            this.stateCodeMappingList = response
            let countryIds = [];
            response.map(elem => {
                if (countryIds.indexOf(elem.countryId) == -1) {
                    countryIds.push(elem.countryId);
                }
            })

            countryIds.forEach(elem => {
                this.getAllStates(elem)
            })



        })
    }

    getAllStates(countryId) {
        this.$state.getByCountryId(countryId).subscribe((response: any) => {
            this.spinner.hide();
            this.allStateList = this.allStateList.concat(response);
            this.responseStateCodeMapping()
        })
    }

    responseStateCodeMapping() {
        this.spinner.show();
        this.stateCodeMappingList.map(elm => {
            this.spinner.hide();
            if (!elm.status) return;
            let zoneObj = this.zoneMatrixList.find(zone => zone.zmLzMapId == elm.zmLzMapId)
            let state = this.allStateList.find(stateElm => stateElm.id == elm.stateId);
            if (!zoneObj.states && state) {
                if (elm.stateId == state.id) {
                    state.status = elm.status
                }
                state.mappingId = elm.id;
                zoneObj.states = [state];
                this.stateList.push(state);
            } else if (state) {
                if (elm.stateId == state.id) {
                    state.status = elm.status
                }
                state.mappingId = elm.id;
                let index = zoneObj.states.findIndex(stateElm => stateElm.id == state.id)
                if (zoneObj.states.findIndex(stateElm => stateElm.id == state.id) == -1) {
                    zoneObj.states.push(state);
                    this.stateList.push(state);
                }
            }
        })
    }

    isNameExists() {
        let isPresent = this.zoneList.find(elem => !this.zoneObj.id &&
            elem.zoneMatrixName == this.zoneObj.zoneMatrixName
        );
        if (isPresent) {
            this.appComp.showMessage(`${this.zoneObj.zoneMatrixName} Is Already Present`, "danger");
            return true
        }
        return false
    }

    getRateListByMatrixId() {

        this.$rateGroup.getMatrixId(this.zoneObj.id).subscribe(response => {
            this.rateGroupWithMatrixList = response;
  if(this.rateGroupWithMatrixList.length==1){
    this.logisticZoneComb.forEach(element=>{
element.zmLzRgMapDTO=this.rateGroupWithMatrixList[0];
            })
            }
            this.logisticZoneComb.map(elem => {

                let zoneMap = null;
                // this.zmLzRgMapList.find(elm=>elm.fromZoneId == elem.zmLzMapId);

                this.zmLzRgMapList.map(mapElm => {
                    if (elem.zmLzMapId == mapElm.fromZoneId && elem.secondObj.zmLzMapId == mapElm.toZoneId) {
                        zoneMap = mapElm
                    }

                })
                if (!zoneMap) return;
                if (!elem.zmLzRgMapDTO) {
                    elem.zmLzRgMapDTO = zoneMap
                }
                elem.zmLzRgMapDTO.groupMapId = zoneMap.id
            })
        });
    }

    getRateList() {
        this.$rateGroup.getValidRateGroups().subscribe(response => {

            this.rateGroupList = response;
        });
    }

    getAllLogisticZones() {
        this.$logisticService.getValidLogisticList().subscribe(response => {

            this.logisticZoneList = response;
        });
    }

    addNewZoneMatrix() {
        this.type="Create";
        this.addZone = true;
        this.viewZone = false;
        this.getAllLogisticZones();
        this.getRateList();
    }

    editZoneMatrix(zone, type = 1) {

        if (type == 0) {
            this.submitPermission = false;
              this.type="Edit";
        }
        else {
            this.submitPermission = true;
              this.type="View";
        }

        let todayDate = moment(new Date()).format('YYYY-MM-DD');

        if (zone.status == 0 && zone.expiryDate < this.currentDate) {
            this.isInactive = true;
            this.isVar = false;
            this.expiryMinDate = todayDate;
        }
        else {
            this.isInactive = false;
            //    this.expiryMinDate=moment(this.logisticObj.expDt).format("YYYY-MM-DD");
        }
        this.isVar = false;
          this.inActiveFlag = false;
        this.spinner.show();
        this.disableNextBtn = false;
        this.$zoneMatrix.getZonesDetails(zone.id).subscribe(response => {

            this.zoneObj = response.responseData;
            this.logisticZoneList = response.referenceData.logisticZoneList;
            this.rateGroupList = response.referenceData.rateGroupList;
            this.zoneObj.effectiveDate = moment(this.zoneObj.effectiveDate).format("YYYY-MM-DD");

            if (this.zoneObj.expiryDate) {
                this.zoneObj.expiryDate = moment(this.zoneObj.expiryDate).format("YYYY-MM-DD");
            }

            this.addZone = true;
            this.viewZone = false;

            this.zmLzMapDTO = this.logisticZoneList.filter(elem => {
                let obj = this.zoneObj.zmLzMapDTO.find(ele => ele.zoneId == elem.id && ele.status == 1);
                if (obj) {
                    elem.status = obj.status;
                    return elem
                }
            })

            this.zmRGMapDTO = this.rateGroupList.filter(elem => {
                let obj = this.zoneObj.zmRGMapDTO.find(ele => ele.rateGroupId == elem.id && ele.status == 1);
                if (obj) {
                    elem.status = obj.status;
                    return elem
                }
            })

            this.spinner.hide();
            this.inActiveStatus();
        }, err => {
            this.disableNextBtn = true;
        })

    }

    strLengthValid: boolean = false;
    searchZoneMatrix(str) {
        let strlength = str.target.value.length;
        if (strlength > 2 && str.target.value) {
            this.strLengthValid = false;
            this.spinner.show();
            this.p = 1;
            if (!this.zoneMatrixName || this.zoneMatrixName.trim() == "") {
                return this.getZones();
            }
            this.$zoneMatrix.searchByName(this.zoneMatrixName).subscribe(Response => {
                this.zoneList = Response;
                if (!this.zoneList.length) {
                    this.appComp.showMessage(`Record Doesn't Exist In Propel-I`, "danger");
                }
                this.spinner.hide();
            });
        } else {
            this.strLengthValid = true;
        }
    }

    clearSearch() {
        if (!this.zoneMatrixName || this.zoneMatrixName == "") {
            return this.getZones();
        }
    }

    getZoneByState() {
        this.spinner.show();
        this.$zoneMatrix.getStateZone().subscribe(response => {
            this.zoneList = response;
            this.spinner.hide();
        });
    }

    addZoneMatrix() {


        let isPresent = this.isNameExists();
        if (isPresent) {
            return;
        }
        this.isVar = false;
        let zmLzMapDTO = _.cloneDeep(this.zmLzMapDTO);
        let zmRGMapDTO = _.cloneDeep(this.zmRGMapDTO);

        this.zoneObj.zmLzMapDTO.forEach(elem => {
            let obj = this.zmLzMapDTO.find(ele => ele.id == elem.zoneId);
            elem.status = 1;
            if (!obj) {
                elem.status = 0;
            }
        })

        this.zoneObj.zmRGMapDTO.forEach(elem => {
            let obj = this.zmRGMapDTO.find(ele => ele.id == elem.rateGroupId);

            elem.status = 1;
            if (!obj) {
                elem.status = 0;
            }
        })


        zmLzMapDTO.forEach(elem => {
            let obj = this.zoneObj.zmLzMapDTO.find(ele => ele.zoneId == elem.id);
            if (!obj) {
                this.zoneObj.zmLzMapDTO.push({
                    zoneId: elem.id,
                    status: 1,
                })
            } else {
                obj.status = 1;
            }

        });

        zmRGMapDTO.map(elem => {
            let obj = this.zoneObj.zmRGMapDTO.find(ele => ele.rateGroupId == elem.id);
            if (!obj) {
                this.zoneObj.zmRGMapDTO.push({
                    rateGroupId: elem.id,
                    status: 1,
                })
            } else {
                obj.status = 1;
            }

        });


        if (this.zoneObj.effectiveDate) {
            this.zoneObj.effectiveDate = moment(this.zoneObj.effectiveDate).format("YYYY-MM-DD");
        }

        if (this.zoneObj.expiryDate) {
            if (this.zoneObj.expiryDate < this.currentDate && this.zoneObj.expiryDate < this.zoneObj.effectiveDate) {
                this.isVar = true;
            }
            else {
                this.isVar = false;
                this.zoneObj.expiryDate = moment(this.zoneObj.expiryDate).format("YYYY-MM-DD");
            }
        }

        if (this.zoneObj.status == 0) {
            let dialog = this.dialog.open(DeleteModalComponent, {
                width: '35vw',
                panelClass: 'mdmDialog',
                data: { heading: "Zone Matrix", title: this.zoneObj.zoneMatrixName }
            });

            dialog.afterClosed().subscribe(response => {
                if (response === true) {
                    this.submitZoneForm("delete");
                }
            })

        } else {
            this.submitZoneForm();
        }


    }

    submitZoneForm(isDelete = null) {
        this.disableNextBtn = true;
        this.spinner.show();
        this.$zoneMatrix.saveZoneMatrix(this.zoneObj).subscribe(response => {

            if (response.error) {
                return this.appComp.showMessage(response.error[0].description, "danger");
            }
            if (this.zoneObj.id) {
                this.appComp.showMessage(`${this.zoneObj.zoneMatrixName} Is Updated`);
            } else {
                this.appComp.showMessage(`${this.zoneObj.zoneMatrixName} Is Added`);
            }
            setTimeout(() => {

                if (isDelete == "delete") {
                    this.addZone = false;
                    this.viewZone = true;
                    this.getZones();
                } else {
                    this.zoneMAtrixDetails = true;
                    this.addZone = false;
                }
                this.disableNextBtn = false;
            }, 1000);
            this.zoneObj.id = response;
            this.getZoneMatrixList();
            this.spinner.hide();
            // this.getZoneMatrixDetailsById(response);

        }, err => {
            this.disableNextBtn = false;
        });
    }

    getZoneMatrixDetailsById(ZoneId) {
        
        this.$zoneMatrix.getZonesDetails(ZoneId).subscribe(response => {


            this.rateGroupWithMatrixList = response.responseData.zmRGMapDTO.filter(elem => {
                let obj = this.rateGroupList.find(el => el.id == elem.rateGroupId);
                // && obj.status==1
                if (obj && elem.status == 1) {
                    elem.name = obj.name;
                    return elem;
                }
            })
            if(this.rateGroupWithMatrixList.length==1){
    this.logisticZoneComb.forEach(element=>{
element.zmLzRgMapDTO=this.rateGroupWithMatrixList[0].id;
            })
            }

        });
    }

    getZoneMatrixList(id = null) {

        this.spinner.show();
        this.$logisticService.getZoneMatrixList(this.zoneObj.id)
            .subscribe(response => {

                this.getStateCode(this.zoneObj);
                this.zoneMatrixList = response.filter(elem => elem.status == 1);
                // this.spinner.hide();
            });
    }

    tooltipCityNames(states) {

        let name = '';
        states.map(elem => {
            name += `${elem.stateName} ,`
        })

        return name.replace(/,\s*$/, "");
    }

    showStateModal(zoneListId, selectedStates = []) {

        let mappingModal = this.dialog.open(AddStateComponent, {
            panelClass: 'mdmDialog',
            width: '30vw',
            data: { id: zoneListId, states: [...this.stateList], selectedStates: selectedStates }
        });

        mappingModal.afterClosed().subscribe(result => {
            if (!result) {
                return;
            }

            let zoneObj = this.zoneMatrixList.find(elem => elem.id == result.id);
            zoneObj.states = result.data
            this.stateList = [];
            this.zoneMatrixList.forEach(elem => {
                if (!elem.states) return;
                elem.states.map(elm => {
                    this.stateList.push(elm);
                })
            })

        });
    }

    submitStateCodeMapping() {

        let data = [];
        let stateMaped = false;
        this.zoneMatrixList.forEach(elem => {
            stateMaped = false;
            if (elem.states) {
                stateMaped = true;
                elem.states.map(el => {
                    let mappingId = this.stateCodeMappingList.find(elm => elm.stateId == el.id);
                    data.push({
                        stateId: el.id,
                        zmLzMapId: elem.zmLzMapId,
                        status: el.status,
                        id: mappingId ? mappingId.id : 0
                    });

                });
            }
        });

        if (!stateMaped) {
            return this.appComp.showMessage("Please Map States With Logistic Zones", "danger");
        }


        let disabledState = this.stateCodeMappingList.filter(stateElm => data.findIndex(qwe => stateElm.stateId == qwe.stateId) == -1);
        disabledState.forEach(el => {
            el.status = 0;
            data.push(el);
        })

        this.spinner.show();

        this.$zoneMatrix.zoneStateMap(data).subscribe(response => {
            this.spinner.hide();
            if (response.error) {
                return this.appComp.showMessage(response.error[0].description, "danger");
            }
            this.zoneMatrixCombination = true;
            this.zoneMAtrixDetails = false;
            let logisticZoneComb = _.clone(this.zoneMatrixList);
            this.logisticZoneComb = this.getCombinations(logisticZoneComb);
            this.getZmLzRgMapping(this.zoneObj.id);
        });
    }


    viewRzlzMap() {

        this.zoneMatrixCombination = true;
        this.zoneMAtrixDetails = false;
        let logisticZoneComb = _.clone(this.zoneMatrixList);
        this.logisticZoneComb = this.getCombinations(logisticZoneComb);
        this.getZmLzRgMapping(this.zoneObj.id);
    }

    getCombinations(arr: Array<any>) {
        let count = arr.length * arr.length;
        let permutationCom = [];

        let index = 0;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < arr.length; j++) {
                permutationCom[i] = _.clone(arr[index]);
                permutationCom[i].secondObj = _.clone(arr[j]);
                i++;
            }
            index++;
        }

        return permutationCom.filter(element => element != undefined);
    }

    nextStep() {
        this.zoneMAtrixDetails = true;
        this.addZone = false;
        this.disableNextBtn = false;
        this.getZoneMatrixList();
    }

    submitLzRzMapping() {
        let data = [];

        let isValid = true;
        this.logisticZoneComb.forEach(elem => {
            if (elem.zmLzRgMapDTO) {
                let dataObj: any = {
                    fromZoneId: elem.zmLzMapId,
                    toZoneId: elem.secondObj.zmLzMapId,
                    zmRgMapId: elem.zmLzRgMapDTO.zmRgMapId,
                    status: 1,
                }

                let isPresnt = this.zmLzRgMapList.find(mapElm => elem.zmLzMapId == mapElm.fromZoneId && elem.secondObj.zmLzMapId == mapElm.toZoneId)
                if (elem.zmLzRgMapDTO.groupMapId) {
                    dataObj.id = elem.zmLzRgMapDTO.groupMapId
                } else if (isPresnt) {
                    dataObj.id = isPresnt.id
                } else {
                    dataObj.id = 0
                }
                data.push(dataObj);
            } else {
                isValid = false;
            }
        });

        if (!isValid) {
            return this.appComp.showMessage(`Please Map All Rate Groups`, 'danger');
        }
        this.spinner.show();
        this.$zoneMatrix.zmLzRgMapping(data).subscribe(response => {
            this.spinner.hide();
            if (response.error) {
                return this.appComp.showMessage(response.error[0].description, "danger");
            }
            if (response) {
                this.appComp.showMessage('Zone - Rate Group Mapped');
                this.resetZoneView();

            }
        });
    }

    inActiveStatus() {

        if (this.zoneObj.status == 0) {
            this.inActiveFlag = true;
        }
    }

    effDate() {
        let effYear = parseInt(this.datePipe.transform(this.zoneObj.effectiveDate, 'yyyy'))
        if (effYear > 9999) {
            this.zoneObj.effectiveDate = "";
        }
    }

    expDate() {
        let expYear = parseInt(this.datePipe.transform(this.zoneObj.expiryDate, 'yyyy'))
        if (expYear > 9999) {
            this.zoneObj.expiryDate = "";
        }
    }

    resetZoneView() {
        this.viewZone = true;
        this.addZone = false;
        this.zoneMAtrixDetails = false;
        this.zoneMatrixCombination = false;
        this.getZones();
        this.stateList = [];
        this.zoneObj = {} as any;
        this.p = 1;
        this.zmLzMapDTO = {} as any;
        this.zmRGMapDTO = {} as any;
    }



    expiryMinDate: any;
    isChange = <boolean>true;

    checkForExpiryDate(effectiveDate) {

        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');

        if (this.zoneObj.expiryDate) {
            this.zoneObj.expiryDate = moment(this.zoneObj.expiryDate).format("YYYY-MM-DD");
        }
        if (this.zoneObj.effectiveDate) {
            this.zoneObj.effectiveDate = moment(this.zoneObj.effectiveDate).format("YYYY-MM-DD");
        }
        if (this.zoneObj.expiryDate > effectiveDate && this.zoneObj.expiryDate > todayDate) {
            this.isVar = false;
        }
        else if (!this.zoneObj.id) {
            this.isVar = true;
        }
        if (effectiveDate < todayDate) {
            return this.expiryMinDate = moment(todayDate, 'YYYY-MM-DD').add(1, "d").format('YYYY-MM-DD');
        }
        return this.expiryMinDate = moment(effectiveDate, 'YYYY-MM-DD').add(1, "d").format('YYYY-MM-DD');

    }

    removeMinDate(effectiveDate) {
        this.$common.setExpiryDate(effectiveDate,this.isInactive);
        // this.expiryMinDate = moment(effectiveDate).format('YYYY-MM-DD');
    }

    changeDateFormat(effectiveDate, expiryDate) {

        this.isVar = true;
        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        if (effectiveDate) {
            this.zoneObj.effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        }

        if (expiryDate) {
            this.zoneObj.expiryDate = moment(expiryDate).format('YYYY-MM-DD');
        }

        this.checkForExpiryDate(effectiveDate)
    }

}
