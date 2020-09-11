import { RrValueComponent } from './../../modals/rr-value/rr-value.component';
import { PincodeFeatureComponent } from './../../modals/pincode-feature/pincode-feature.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommandantService } from 'src/app/services/commandant.service';
import { MatDialog } from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthorizationService } from 'src/app/services/authorisation.service';
import { NgxPermissionsService } from 'ngx-permissions';
import moment from 'moment';
import { DeleteModalComponent } from 'src/app/modals/delete-modal/delete-modal.component';
import { CommandmentOrderComponent } from 'src/app/modals/commandment-order/commandment-order.component';
import { CommandmentOrreringComponent } from 'src/app/modals/commandment-orrering/commandment-orrering.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-commandment',
    templateUrl: './commandment.component.html',
    styleUrls: ['./commandment.component.css'],
})

export class CommandmentComponent implements OnInit {

    constructor(public dialog: MatDialog,
        private $commandment: CommandantService,
        private appComp: AppComponent,
        private spinner: NgxSpinnerService,
        private datePipe: DatePipe,
        private AuthorizationService: AuthorizationService,
        private permissionsService: NgxPermissionsService) { }
    @ViewChild("f", null) commandmentForm: any;
    ngOnInit() {

        this.getAllCommandment();
        this.getAllLoad();
        this.permissionsService.loadPermissions(this.AuthorizationService.getPermissions('COMMANDMENT', 'COMMANDMENT'));
    }
    CommandmentNameSearchCtrl = <string>'';
    geoTypeNameSearchCtrl = <string>'';
    subGeoNameSearchCtrl = <string>'';
    calculationNameSearchCtrl = <string>'';
    calculationUnitNameSearchCtrl = <string>'';
    calculationMeasureNameSearchCtrl = <string>'';
    contractNameSearchCtrl = <string>'';
    OfferingNameSearchCtrl = <string>'';
    businessNameSearchCtrl = <string>'';
    chargesNameSearchCtrl = <string>'';
    FormatType = <string>'Create';
    calculation2NameSearchCtrl = <string>'';
    calUnitObjNameSearchCtrl = <string>'';
    calMeasureObjNameSearchCtrl = <string>'';
    chargeObjNameSearchCtrl = <string>'';
    calTypeObjNameSearchCtrl = <string>'';
    calUnitObj2NameSearchCtrl = <string>'';
    calMeasureObj2NameSearchCtrl = <string>'';
    showCommandment = <boolean>true;
    isCommandmentbtn = <boolean>true;
    addCommandment = <boolean>false;
    inActiveFlag = <boolean>false;
    isNotValid = <boolean>false;
    isInactive = <boolean>false;
    isdisableCommandment = <boolean>false;
    isinactive = <boolean>false;
    addCommandmentOffering;
    CommandmentRR = <boolean>false;
    IsCommandmentCreate = <boolean>false;
    isDisableInput = <boolean>true;
    backDisable = <boolean>true;
    hideSaveBtn = <boolean>false;
    cmdName;
    localName: string = '';
    disabledBtn: any;
    loadObj = {} as any
    firstServiceOfferingObj = {} as any;
    // commandmentType = {} as any;
    commandmentObj = <any>{
        commandmentEntityMapDtos: [],
        commandmentOfferingRequestDTOs: [],
        status: 1
    }
    commandmentRrTableList: Array<any> = [];
    commandmentOfferingRequestDTOs: Array<any> = []
    commandmentList: Array<any> = [];
    LoadList: Array<any> = [];
    entityObj = {} as any;
    businessTypeList: Array<any> = [];
    calculationTypeList: Array<any> = [];
    calculationUnitList: Array<any> = [];
    calculationMeasureList: Array<any> = [];
    commandmentCategoryList: Array<any> = [];
    commandmentChargesOnList: Array<any> = [];
    commandmentGeoTypeList: Array<any> = [];
    commandmentTypeList: Array<any> = [];
    customerTypeList: Array<any> = [];
    serviceOffeingList: Array<any> = [];
    subGeoList: Array<any> = [];
    // selected element on create commandment
    selectedCalculationTypeList: Array<any> = [];
    selectedCalculationUnitList: Array<any> = [];
    selectionCalculationMeasureList: Array<any> = [];
    selectedCustomerTypeList: Array<any> = [];
    selectedServiceOfferingList: Array<any> = [];
    selectedBusinessTypeList: Array<any> = [];
    localSelectedCustomerTypeList: Array<any> = [];
    localSelectedChargeList: Array<any> = [];
    localSelectedServiceOfferingList: Array<any> = [];
    localSelectedBusinessTypeList: Array<any> = [];
    selectedChargesList: Array<any> = [];
    concatselectedCustomerList: Array<any> = []

    // concatselectedserviceOfferingList:Array<any>=[]
    concatCommandmentTypeList: Array<any> = [];
    concatCalculationTypeList: Array<any> = [];
    concatCalculationUnitList: Array<any> = [];
    concatCalculationMeasureList: Array<any> = [];
    concatCustomerTypeList: Array<any> = [];
    concatServiceOfferingList: Array<any> = [];
    concatBusinessTypeList: Array<any> = [];
    concatChargesList: Array<any> = [];
    concatGeoTypeList: Array<any> = [];
    serviceOfferingId;
    // geoType = {} as any;
    descr;
    commandmentRrObj = {} as any;
    upperLength: Array<any> = []
    middleLength: Array<any> = []
    lowerLength: Array<any> = [];
    commandmentRrRequestDTO = {} as any;
    commandmentId = {} as any;
    commandmentRRList: Array<any> = [];
    p: number = 1;
    isExpand = <boolean>false;
    submitPermission = <boolean>false;
    selectedEntityList: Array<any> = [];
    today = new Date();
    slabdata;

    checkForEditBtn(calculationTypeId) {
        if (!calculationTypeId) {
            return false;
        }
        let find = this.selectedCalculationTypeList.find(elem => elem.id == calculationTypeId);
        if (find && find.descr.toLowerCase().includes('non-slab')) {
            return false;
        }
        return true;
    }
    openRRValue(comandmentRRObj = null, parentIndex) {

        if (!this.checkForEditBtn(comandmentRRObj.commandmentRrRequestDTO.calculationTypeId)) {
            comandmentRRObj.commandmentRrRequestDTO.cmdmntRrSlabList = [];
            return;
        }

        let tempDataObj ={
            tempData:[],
            viewType:false
        };

if(this.submitPermission == true){
    tempDataObj.viewType=true;
}
        if (comandmentRRObj.commandmentRrRequestDTO && comandmentRRObj.commandmentRrRequestDTO.cmdmntRrSlabList && comandmentRRObj.commandmentRrRequestDTO.cmdmntRrSlabList.length) {
            if (this.submitPermission == true) {
                comandmentRRObj.commandmentRrRequestDTO.cmdmntRrSlabList.forEach(element => {
                    element.modeType = true;
                });
            }
            tempDataObj.tempData = [...comandmentRRObj.commandmentRrRequestDTO.cmdmntRrSlabList]
        } else {
            let commandmentRrObj = this.commandmentRrTableList.find(elm => elm.commandmentRrRequestDTO && elm.commandmentRrRequestDTO.cmdmntRrSlabList && elm.commandmentRrRequestDTO.cmdmntRrSlabList.length);
            if (commandmentRrObj && commandmentRrObj.commandmentRrRequestDTO.cmdmntRrSlabList && commandmentRrObj.commandmentRrRequestDTO.cmdmntRrSlabList.length) {
                if (this.submitPermission == true) {
                    comandmentRRObj.commandmentRrRequestDTO.cmdmntRrSlabList.forEach(element => {
                        element.modeType = true;
                    });
                }

                tempDataObj.tempData = [...commandmentRrObj.commandmentRrRequestDTO.cmdmntRrSlabList];
                // tempData.map(elm=> delete elm.id)
                let tempData2 = [];
                let cmdmntRrId = commandmentRrObj.commandmentRrRequestDTO.id;
                tempDataObj.tempData.forEach((elm, index) => {

                    tempData2.push({
                        slabFrom: elm.slabFrom,
                        slabTo: elm.slabTo,
                        rrValue: elm.rrValue,
                        status: elm.status,
                        cmdmntRrId: elm.cmdmntRrId ? elm.cmdmntRrId : cmdmntRrId
                    })
                })

                tempDataObj.tempData = tempData2;
                this.commandmentRrTableList[parentIndex].commandmentRrRequestDTO.cmdmntRrSlabList = [...tempData2];
            }
        }
        // 
        let dialog = this.dialog.open(RrValueComponent, {
            width: '30vw',
            panelClass: 'mdmDialog',
            data: tempDataObj
        });
        dialog.afterClosed().subscribe(response => {

            if (response === true) {
                return;
            }
            if (response) {

                this.commandmentRrTableList[parentIndex].commandmentRrRequestDTO.cmdmntRrSlabList = [...response];

                this.commandmentRrTableList.forEach((element, index) => {
                    if (!element.commandmentRrRequestDTO && !element.commandmentRrRequestDTO.cmdmntRrSlabList.length) {
                        element.commandmentRrRequestDTO.cmdmntRrSlabList = [...response];
                    }
                })

            }

        })
    }

    showcmdTable() {
        this.FormatType = "Create";
        this.showCommandment = false;
        this.submitPermission = false;
        this.addCommandment = true;
        this.backDisable = true;
        this.disabledBtn = true;
        this.isDisableInput = true;
        this.isChecked = false;
        this.isdisableCommandment = false;
        this.commandmentObj = {
            status: 1,
            commandmentEntityMapDtos: [],
            commandmentOfferingRequestDTOs: [],
        } as any;
        this.loadObj = {} as any;
        this.selectedCalculationTypeList = [];
        this.selectedCalculationUnitList = [];
        this.selectionCalculationMeasureList = [];
        this.selectedCalculationTypeList = [];
        this.selectedBusinessTypeList = [];
        this.selectedServiceOfferingList = [];
        this.selectedCustomerTypeList = [];
        this.selectedChargesList = [];
        this.commandmentRRList = [];
    }

    tooltipNames(arrObj, type = null) {

        let name = '';

        if (type == "serviceOffering") {
            arrObj.map(elem => {
                let offerName = this.serviceOffeingList.find(elm => elm.id == elem.serviceOfferingId)
                name += `${offerName.serviceOffering} ,`
            })
        } else if (type == "descr") {
            arrObj.map(elem => {
                let offerName = this.customerTypeList.find(elm => elm.id == elem.customerTypeId)
                name += `${offerName.descr} ,`
            })

        }

        return name.replace(/,\s*$/, "");
    }


    removeDuplicate(arr, comp) {
        if (!arr) return [];
        const unique = arr.map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter((e) => arr[e]).map(e => arr[e]);

        return unique;

    }

    getAllCommandment() {
        this.spinner.show();
        this.$commandment.getAll().subscribe(response => {
            this.p = 1;
            this.commandmentList = response;
            this.spinner.hide();

        })
        setTimeout(() => {
            this.showCommandment = true;
            this.addCommandment = false;
        }, 1000);

    }

    saveCommandment() {

        // this.commandmentObj = {
        //   commandmentOfferingRequestDTOs: []
        // }
        if (!this.commandmentObj.id) {
            this.concatCommandmentTypeList = [];
            this.concatGeoTypeList = [];
            this.concatCalculationTypeList = [];
            this.concatChargesList = [];
            this.concatCalculationUnitList = [];
            this.concatCalculationMeasureList = [];
        }

        this.isExpand = false;
        if (this.commandmentObj.expiryDate) {
            if (this.commandmentObj.expiryDate < this.currentDate && this.commandmentObj.expiryDate < this.commandmentObj.effectiveDate) {
                this.isVar = true;
            }
            else {
                this.isVar = false;
                this.commandmentObj.expiryDate = moment(this.commandmentObj.expiryDate).format("YYYY-MM-DD");
            }
        }
        if (!this.commandmentObj.id) {
            this.commandmentTypeList.forEach(elemType => {
                if (elemType.id == this.loadObj.commandmentType) {
                    this.concatCommandmentTypeList.push(
                        {
                            "entityCategory": elemType.entityCategory,
                            "lookupEntityId": elemType.id,
                            "status": 1
                        }
                    )
                }
            })
        }
        if (!this.commandmentObj.id) {
            this.commandmentGeoTypeList.forEach(elemType => {
                if (elemType.id == this.loadObj.geoType) {
                    this.concatGeoTypeList.push(
                        {
                            "entityCategory": elemType.entityCategory,
                            "lookupEntityId": elemType.id,
                            "status": 1
                        }
                    )
                }
            })
        }
        if (!this.commandmentObj.id) {
            this.selectedCalculationTypeList.forEach(i => {
                this.concatCalculationTypeList.push(
                    {
                        "entityCategory": i.entityCategory,
                        "lookupEntityId": i.id,
                        "status": 1
                    });
            });
        }
        if (this.commandmentObj.commandmentEntityMapDtos != undefined && this.commandmentObj.commandmentEntityMapDtos.length) {
            if (this.selectedChargesList.length != this.localSelectedChargeList.length) {
                let isPresent = this.selectedChargesList.filter(elem => this.localSelectedChargeList.findIndex(elm => elm.id == elem.id) == -1)
                isPresent.forEach(elem => {
                    this.commandmentObj.commandmentEntityMapDtos.push(
                        {
                            "entityCategory": elem.entityCategory,
                            "lookupEntityId": elem.id,
                            "status": 1
                        });
                })

            }

        }
        else {
            this.selectedChargesList.forEach(i => {
                this.concatChargesList.push(
                    {
                        "entityCategory": i.entityCategory,
                        "lookupEntityId": i.id,
                        "status": 1
                    });
            });
        }
        if (!this.commandmentObj.id) {
            this.selectedCalculationUnitList.forEach(i => {

                this.concatCalculationUnitList.push(
                    {
                        "entityCategory": i.entityCategory,
                        "lookupEntityId": i.id,
                        "status": 1
                    });
            });
        }
        if (!this.commandmentObj.id) {
            this.selectionCalculationMeasureList.forEach(i => {
                this.concatCalculationMeasureList.push(
                    {
                        "entityCategory": i.entityCategory,
                        "lookupEntityId": i.id,
                        "status": 1
                    });
            });
        }

        if (this.commandmentObj.id && this.commandmentObj.commandmentOfferingRequestDTOs.length) {

            if (this.selectedBusinessTypeList.length != this.localSelectedBusinessTypeList.length || this.selectedCustomerTypeList.length != this.localSelectedCustomerTypeList.length || this.selectedServiceOfferingList.length != this.localSelectedServiceOfferingList.length) {

                if (this.selectedBusinessTypeList.length != this.localSelectedBusinessTypeList.length) {
                    let isPresent = this.selectedBusinessTypeList.filter(elem => this.localSelectedBusinessTypeList.findIndex(elm => elm.id == elem.id) == -1)

                    isPresent.forEach(elem => {
                        this.selectedServiceOfferingList.forEach(serviceOffer => {
                            this.selectedCustomerTypeList.forEach(customer => {
                                let alreadyPresent = this.commandmentObj.commandmentOfferingRequestDTOs.find(qwe => qwe.serviceOfferingId == serviceOffer.id && qwe.customerTypeId == customer.id && qwe.businessTypeId == elem.id);
                                if (!alreadyPresent) {

                                    this.commandmentObj.commandmentOfferingRequestDTOs.push(
                                        {
                                            "commandmentId": this.commandmentObj.id,
                                            "serviceOfferingId": serviceOffer.id,
                                            "customerTypeId": customer.id,
                                            "businessTypeId": elem.id,
                                            "status": 1
                                        });
                                }
                            })
                        })
                    })

                }
                if (this.selectedServiceOfferingList.length != this.localSelectedServiceOfferingList.length) {
                    let isPresent = this.selectedServiceOfferingList.filter(elem => this.localSelectedServiceOfferingList.findIndex(elm => elm.id == elem.id) == -1)

                    isPresent.forEach(elem => {
                        this.selectedBusinessTypeList.forEach(business => {
                            this.selectedCustomerTypeList.forEach(customer => {
                                let alreadyPresent = this.commandmentObj.commandmentOfferingRequestDTOs.find(qwe => qwe.serviceOfferingId == elem.id && qwe.customerTypeId == customer.id && qwe.businessTypeId == business.id);
                                if (!alreadyPresent) {
                                    this.commandmentObj.commandmentOfferingRequestDTOs.push(
                                        {
                                            "commandmentId": this.commandmentObj.id,
                                            "serviceOfferingId": elem.id,
                                            "customerTypeId": customer.id,
                                            "businessTypeId": business.id,
                                            "status": 1
                                        });
                                }
                            })
                        })
                    })

                }
                if (this.selectedCustomerTypeList.length != this.localSelectedCustomerTypeList.length) {
                    let isPresent = this.selectedCustomerTypeList.filter(elem => this.localSelectedCustomerTypeList.findIndex(elm => elm.id == elem.id) == -1)

                    isPresent.forEach(elem => {
                        this.selectedBusinessTypeList.forEach(business => {
                            this.selectedServiceOfferingList.forEach(serviceOffer => {
                                let alreadyPresent = this.commandmentObj.commandmentOfferingRequestDTOs.find(qwe => qwe.serviceOfferingId == serviceOffer.id && qwe.customerTypeId == elem.id && qwe.businessTypeId == business.id);
                                if (!alreadyPresent) {
                                    this.commandmentObj.commandmentOfferingRequestDTOs.push(
                                        {
                                            "commandmentId": this.commandmentObj.id,
                                            "serviceOfferingId": serviceOffer.id,
                                            "customerTypeId": elem.id,
                                            "businessTypeId": business.id,
                                            "status": 1
                                        });
                                }
                            })
                        })
                    })

                }
            }


        }
        else if (!this.commandmentObj.id && !this.commandmentObj.commandmentOfferingRequestDTOs.length) {
            if (!this.commandmentObj.commandmentOfferingRequestDTOs) {
                this.commandmentObj.commandmentOfferingRequestDTOs = [];
            }
            if (this.selectedCustomerTypeList.length >= this.selectedBusinessTypeList.length) {
                this.upperLength = this.selectedServiceOfferingList;
                this.middleLength = this.selectedCustomerTypeList;
                this.lowerLength = this.selectedBusinessTypeList;
                this.upperLength.forEach(elem => {
                    this.middleLength.forEach(j => {
                        this.lowerLength.forEach(k => {
                            this.commandmentObj.commandmentOfferingRequestDTOs.push(
                                {
                                    "serviceOfferingId": elem.id,
                                    "customerTypeId": j.id,
                                    "businessTypeId": k.id,
                                    "status": 1
                                });
                        });
                    });
                });
            }
            else {
                this.upperLength = this.selectedServiceOfferingList;
                this.lowerLength = this.selectedCustomerTypeList;
                this.middleLength = this.selectedBusinessTypeList;
                this.upperLength.forEach(elem => {
                    this.middleLength.forEach(j => {
                        this.lowerLength.forEach(k => {
                            this.commandmentObj.commandmentOfferingRequestDTOs.push(
                                {
                                    "serviceOfferingId": elem.id,
                                    "customerTypeId": k.id,
                                    "businessTypeId": j.id,
                                    "status": 1
                                });
                        });
                    });
                });
            }
        }
        if (this.commandmentObj.commandmentEntityMaps) {
            delete this.commandmentObj.commandmentEntityMaps
        }

        if (this.commandmentObj.id && this.commandmentObj.commandmentOfferingList) {
            delete this.commandmentObj.commandmentOfferingList;
        }

        this.commandmentObj.commandmentOfferingRequestDTOs.forEach(element => {
            element.effectiveDate = this.commandmentObj.effectiveDate;
            if (this.commandmentObj.expiryDate) {
                element.expiryDate = this.commandmentObj.expiryDate;
            }
            if (this.commandmentObj.status == 1) {
                element.status = 1;
            }
        });
        if (!this.commandmentObj.id) {
            this.commandmentObj.commandmentEntityMapDtos = this.concatCalculationTypeList.concat(this.concatCalculationUnitList, this.concatCalculationMeasureList, this.concatChargesList, this.concatGeoTypeList, this.concatCommandmentTypeList);
        }
        this.commandmentObj.commandmentEntityMapDtos.forEach(element => {
            element.effectiveDate = this.commandmentObj.effectiveDate;
            if (this.commandmentObj.expiryDate) {
                element.expiryDate = this.commandmentObj.expiryDate;
            }
            if (this.commandmentObj.status == 1) {
                element.status = 1;
            }
        });
        if (this.commandmentObj.expiryDate) {
            this.commandmentObj.expiryDate = moment(this.commandmentObj.expiryDate).format("YYYY-MM-DD");
        }
        if (this.commandmentObj.effectiveDate) {
            this.commandmentObj.effectiveDate = moment(this.commandmentObj.effectiveDate).format("YYYY-MM-DD");
        }
        if (this.commandmentObj.status == 0) {
            this.commandmentObj.commandmentEntityMapDtos.forEach(element => {
                element.effectiveDate = this.commandmentObj.effectiveDate;
                element.status = 0;
                if (this.commandmentObj.expiryDate) {
                    element.expiryDate = this.commandmentObj.expiryDate;
                }
            });
            this.commandmentObj.commandmentOfferingRequestDTOs.forEach(element => {
                element.effectiveDate = this.commandmentObj.effectiveDate;
                element.status = 0;
                if (this.commandmentObj.expiryDate) {
                    element.expiryDate = this.commandmentObj.expiryDate;
                }
            });
            let dialog = this.dialog.open(DeleteModalComponent, {
                width: '35vw',
                panelClass: 'mdmDialog',
                data: { title: this.commandmentObj.commandmentName, heading: "Commandment", content: "commandmentType" }
            });
            dialog.beforeClose().subscribe(response => {

                if (response === "cancel") {
                    return;
                }
                else if (response) {
                    this.updateCommandment();
                }
            })

        } else {
            this.updateCommandment();
        }
    }


    updateCommandment() {
        this.spinner.show();

        this.$commandment.saveCommandant(this.commandmentObj).subscribe(response => {
            this.spinner.hide();
            this.p = 1;
            if (response != null || response != undefined) {
                if (!this.commandmentObj.id) {
                    this.commandmentObj.id = response.id;
                    this.commandmentId = response.commandmentOfferingList[0].id;
                    this.commandmentList.splice(0, 0, this.commandmentObj);
                    let commandmentRrTableList = response.commandmentOfferingList;
                    this.commandmentRrTableList = commandmentRrTableList.map(elem => {
                        elem.commandmentRrRequestDTO = {
                            "commandmentOfferingMapId": elem.id
                        };
                        elem.commandmentId = this.commandmentObj.id;
                        return elem;
                    })
                    this.p = 1;
                    this.appComp.showMessage(`Commandment Is Added`);

                    setTimeout(() => {

                        this.CommandmentRR = true;
                        this.addCommandment = false;
                        return this.getEntityList();
                    }, 1000);
                }
                else if (this.commandmentObj.id && this.commandmentObj.status != 0) {

                    let index = this.commandmentList.findIndex(elem => elem.id == this.commandmentObj.id);
                    // this.commandmentList[index] = this.commandmentObj;
                    this.p = 1;
                    this.appComp.showMessage(`${this.commandmentObj.commandmentName} Is Updated`);
                    setTimeout(() => {
                        this.CommandmentRR = true;
                        this.addCommandment = false;
                        return this.editCommandmentRR(this.commandmentObj.id);
                    }, 1000);
                }
                else {
                    let index = this.commandmentList.findIndex(elem => elem.id == this.commandmentObj.id);
                    // this.commandmentList[index] = this.commandmentObj;
                    this.p = 1;
                    this.appComp.showMessage(`${this.commandmentObj.commandmentName} Is Deleted`);
                    return this.getAllCommandment();
                }
            }
            else {
                this.spinner.hide();
                if (this.commandmentObj.id) {
                    this.appComp.showMessage(`Commandment Deleted failed `, "danger");
                }
                else {
                    this.appComp.showMessage(`Commandment Creation failed `, "danger");
                }
            }
        }, err => {
            // if (err.error.errors.error[0].code == "V_ERR-632") {
            //     this.showCommandment = true;
            //     this.addCommandment = false;
            // }
            this.concatCommandmentTypeList = [];
            this.concatGeoTypeList = [];
            this.concatCalculationTypeList = [];
            this.concatChargesList = [];
            this.concatCalculationUnitList = [];
            this.concatCalculationMeasureList = [];
            return this.editCommandmentRR(this.commandmentObj.id);
        })
        // this.cmdName = '';
        // this.getAllCommandment();
        // this.appComp.showMessage(`Commandment Is Deleted`);
    }


    clickOnCommandmentRRSubmit = <boolean>true;
    saveCommandmentRR() {
        
        let isValid = true;

        // return; 
        // commandmentRrObj.isInvalid
        let notValid = false;
        this.commandmentRrTableList.forEach(elem => {
            if (parseFloat(elem.commandmentRrRequestDTO.maxValue) && (parseFloat(elem.commandmentRrRequestDTO.maxValue) < parseFloat(elem.commandmentRrRequestDTO.minValue))) {
                notValid = true;
            }

            isValid = true
     let find = this.selectedCalculationTypeList.find(element => element.id == elem.commandmentRrRequestDTO.calculationTypeId);
        if (find.descr=="SLAB") {
            if (!elem.commandmentRrRequestDTO.cmdmntRrSlabList || (elem.commandmentRrRequestDTO.cmdmntRrSlabList && !elem.commandmentRrRequestDTO.cmdmntRrSlabList.length)) {
                isValid = false;
            }else if(elem.commandmentRrRequestDTO.cmdmntRrSlabList){
                let comRRVal = elem.commandmentRrRequestDTO.cmdmntRrSlabList.filter(el=>el.status);
                if(!comRRVal.length){
                    isValid = false;
                }
            }
        }
            
        })

        if (!isValid) {
            return this.appComp.showMessage("RR Slab Is Required", "danger")
        }



        if (notValid) return;
        this.commandmentRrTableList.forEach(elem => {
            if (parseFloat(elem.commandmentRrRequestDTO.maxValue) && (parseFloat(elem.commandmentRrRequestDTO.maxValue) < parseFloat(elem.commandmentRrRequestDTO.minValue))) {
                notValid = true;
            } else {
                elem.isInvalid = false;
            }
        })
        this.spinner.show();
        this.commandmentRRList = [];
        this.commandmentRrTableList.forEach(elem => {
            if (elem.cmdmntRrsList) {
                delete elem.cmdmntRrsList;
                delete elem.createdBy;
                delete elem.createdDate;
                delete elem.updateDate;
                delete elem.updatedBy;
            }
            this.commandmentRRList.push(elem);
        })
        // for (let index = 0; index < this.commandmentRrTableList.length; index++) {
        //         this.commandmentRRList.push(this.commandmentRrTableList[index]);
        //         delete this.commandmentRrTableList[index];
        // }
        this.$commandment.saveCommandantRR(this.commandmentRRList).subscribe(response => {
            // this.commandmentRRList.push(response);
            this.appComp.showMessage(`Commandment RR Is Added`);
            this.getAllCommandment();
            this.p = 1;
            this.loadObj = {} as any;
            this.commandmentRrTableList = [];
            this.selectedCalculationTypeList = [];
            this.selectedCalculationUnitList = [];
            this.selectionCalculationMeasureList = [];
            this.selectedCalculationTypeList = [];
            this.selectedBusinessTypeList = [];
            this.selectedServiceOfferingList = [];
            this.selectedCustomerTypeList = [];
            this.selectedChargesList = [];
            this.addCommandment = false;
            this.showCommandment = true;
            this.clickOnCommandmentRRSubmit = false;
            this.IsCommandmentCreate = true;
            this.CommandmentRR = false;
            this.commandmentRRList = [];
            this.spinner.hide();

        })

    }
    getEntityList() {

        this.selectedCalculationTypeList = this.selectedCalculationTypeList;
        if (this.selectedCalculationTypeList.length == 1) {
            this.commandmentRrTableList.forEach(element => {
                element.commandmentRrRequestDTO.calculationTypeId = this.selectedCalculationTypeList[0].id;
            })
        }
        this.selectedChargesList = this.selectedChargesList;
        if (this.selectedChargesList.length == 1) {
            this.commandmentRrTableList.forEach(element => {
                element.commandmentRrRequestDTO.cmdntChrgOnId = this.selectedChargesList[0].id;
            })
        }
        this.selectedServiceOfferingList = this.selectedServiceOfferingList;

        this.selectedCustomerTypeList = this.selectedCustomerTypeList;

        this.selectionCalculationMeasureList = this.selectionCalculationMeasureList;
        if (this.selectionCalculationMeasureList.length == 1) {
            this.commandmentRrTableList.forEach(element => {
                element.commandmentRrRequestDTO.calculationMeasureId = this.selectionCalculationMeasureList[0].id;
            })
        }
        this.selectedCalculationUnitList = this.selectedCalculationUnitList;
        if (this.selectedCalculationUnitList.length == 1) {
            this.commandmentRrTableList.forEach(element => {
                element.commandmentRrRequestDTO.calculationUnitId = this.selectedCalculationUnitList[0].id;
            })
        }
        this.selectedBusinessTypeList = this.selectedBusinessTypeList;

    }


    commandmentOrderModalOpen() {
        this.dialog.open(CommandmentOrderComponent, {
            width: '65vw',
            panelClass: 'mdmDialog'
        });
    }

    editModalOpen() {

        this.dialog.open(CommandmentOrreringComponent, {
            width: '65vw',
            panelClass: 'mdmDialog'
        });
    }


    getSubTypeByGeoType(geoId) {
        var geoName;
        this.commandmentGeoTypeList.forEach(elem => {
            if (geoId == elem.id) {
                geoName = elem.descr;
            }
        })


        this.$commandment.getCommandantLoad().subscribe(response => {
            this.businessTypeList = response.businessTypeList;
            if (geoName == "PINCODE") {
                this.subGeoList = response.geoFeatureDto.pinCodeFeatureList;
                this.subGeoList.forEach(elem => elem.geosubName = elem.pincodeFeature)
            }
            else if (geoName == "STATE") {
                this.subGeoList = response.geoFeatureDto.stateFeatureList;
                this.subGeoList.forEach(elem => elem.geosubName = elem.stateFeature)
            }
            else if (geoName == "ADDRESS") {
                this.subGeoList = response.geoFeatureDto.addressFeatureList;
                this.subGeoList.forEach(elem => elem.geosubName = elem.addressFeatureName)

            }

        })
    }

    getAllLoad() {

        this.$commandment.getCommandantLoad().subscribe(response => {
            this.businessTypeList = response.businessTypeList;
            if (this.businessTypeList.length == 1) {
                this.selectedBusinessTypeList = this.businessTypeList[0].id;
            }
            this.calculationTypeList = response.calculationTypeList;
            if (this.businessTypeList.length == 1) {
                this.selectedCalculationTypeList = this.calculationTypeList[0].id;
            }
            this.calculationUnitList = response.calculationUnitList;
            if (this.businessTypeList.length == 1) {
                this.selectedCalculationUnitList = this.calculationUnitList[0].id;
            }
            this.calculationMeasureList = response.calculationMeasureList;
            if (this.businessTypeList.length == 1) {
                this.selectionCalculationMeasureList = this.calculationMeasureList[0].id;
            }
            this.serviceOffeingList = response.serviceOffeingList;
            if (this.businessTypeList.length == 1) {
                this.selectedServiceOfferingList = this.serviceOffeingList[0].id;
            }
            this.commandmentCategoryList = response.commandmentCategoryList;
            //        if( this.businessTypeList.length==1){
            //   this.selectedBusinessTypeList=this.commandmentCategoryList[0].id;
            //     }
            this.commandmentChargesOnList = response.commandmentChargesOnList;
            if (this.businessTypeList.length == 1) {
                this.selectedChargesList = this.commandmentChargesOnList[0].id;
            }
            this.commandmentGeoTypeList = response.commandmentGeoTypeList;
            if (this.businessTypeList.length == 1) {
                this.loadObj.geoType = this.commandmentGeoTypeList[0].id;
            }
            this.commandmentTypeList = response.commandmentTypeList;
            if (this.businessTypeList.length == 1) {
                this.loadObj.commandmentType = this.commandmentTypeList[0].id;
            }
            this.customerTypeList = response.customerTypeList;
            if (this.businessTypeList.length == 1) {
                this.selectedCustomerTypeList = this.customerTypeList[0].id;
            }
        })
    }

    checkCommandmentType(typeId) {
        let type = this.commandmentTypeList.find(elem => elem.descr == "GEOGRAPHIC");
        if (type.id == typeId) {
            return true;
        }
        return false;
    }

    strLengthValid: boolean = false;
    searchCommandment(cmdName) {

        let strlength = cmdName.length;
        if (strlength > 2 && cmdName) {
            this.strLengthValid = false;
            this.spinner.show();
            this.p = 1;
            if (!cmdName || cmdName.trim() == "") {
                return this.getAllCommandment();
            }
            this.$commandment.SearchCommandment(cmdName).subscribe(Response => {
                this.commandmentList = Response.responseData;
                if (!this.commandmentList.length) {
                    this.appComp.showMessage(`Record Doesn't Exist In Propel-I`, "danger");
                }
                this.spinner.hide();
            }, err => {
                this.cmdName = '';
            });

        } else {
            this.strLengthValid = true;
        }
    }

    clearSearch(cmdName) {
        if (!cmdName || cmdName == "") {
            this.strLengthValid = false;
            return this.getAllCommandment();
        }
    }

    viewpermission() {
        this.commandmentObj = {} as any;
        this.loadObj = {} as any;
        this.selectedCalculationTypeList = [];
        this.selectedCalculationUnitList = [];
        this.selectionCalculationMeasureList = [];
        this.selectedCalculationTypeList = [];
        this.selectedBusinessTypeList = [];
        this.selectedServiceOfferingList = [];
        this.selectedCustomerTypeList = [];
        this.selectedChargesList = [];
        this.commandmentRRList = [];
        this.showCommandment = true;
        this.addCommandment = false;
    }
    backCommandment() {

        this.CommandmentRR = false;
        this.addCommandment = true;
        this.backDisable = false;
        this.hideSaveBtn = false;
    }
    OpenNextTab() {

        this.CommandmentRR = true;
        this.addCommandment = false;
    }

    abc = <boolean>false;
    editCommandment(obj = null, type = null) {
          this.spinner.show();
        this.isdisableCommandment = true;
        this.submitPermission = false;
        this.isDisableInput = true;
        this.backDisable = true;
        this.FormatType = "Edit";
        this.inActiveFlag = false;
        if (obj.status == 0 && obj.expiryDate < this.currentDate) {
            this.isInactive = true;
            this.isVar = false;
            this.expiryMinDate = this.currentDate;
        }
        else {
            this.isInactive = false;
        }

        if (type == 1) {
            this.isdisableCommandment = false;
            this.submitPermission = true;
            this.FormatType = "View";

        }
        if (obj.status == 0) {
            this.isinactive = true;
        }
        if (this.clickOnCommandmentRRSubmit == false) {
            this.isCommandmentbtn = false;
            this.isCommandmentbtn = false;
        }

        if (obj.effectiveDate) {
            obj.effectiveDate = moment(obj.effectiveDate).format("YYYY-MM-DD");
            this.today = obj.effectiveDate;
        }

        this.addCommandment = true;
        this.showCommandment = false;
        this.commandmentObj = { ...obj };
        if (this.commandmentObj.status == 0) {
            this.inActiveFlag = true;
        }
        if (obj.commandmentOfferingList) {
            this.commandmentObj.commandmentOfferingRequestDTOs = [...obj.commandmentOfferingList];
        }

        this.localName == this.commandmentObj.commandmentName;
        if (obj.status == 0) {
            this.isDisableInput = false;
        }


        let uniqueList = [];
        if(obj.commandmentOfferingList){
       uniqueList = obj.commandmentOfferingList.map(item => item.businessTypeId).filter((value, index, self) => self.indexOf(value) === index)
        uniqueList.forEach(elemi => {
            let elem = {
                "id": elemi,
                "ischecked": true
            }
            this.selectedBusinessTypeList.push(elem);
        })

        uniqueList = obj.commandmentOfferingList.map(item => item.customerTypeId).filter((value, index, self) => self.indexOf(value) === index)
        uniqueList.forEach(elemi => {
            let elem = {
                "id": elemi,
                "ischecked": true
            }
            this.selectedCustomerTypeList.push(elem);
        })

        uniqueList = obj.commandmentOfferingList.map(item => item.serviceOfferingId).filter((value, index, self) => self.indexOf(value) === index)
        uniqueList.forEach(elemi => {
            let elem = {
                "id": elemi,
                "ischecked": true
            }
            this.selectedServiceOfferingList.push(elem);
        })
        }
      
        // this.selectedEntityList = [...obj.commandmentEntityMaps];

        // this.commandmentObj.commandmentEntityMapDtos=[...obj.commandmentEntityMaps];
        this.commandmentObj.commandmentEntityMapDtos = [];
        obj.commandmentEntityMaps.forEach(elem => {
            if (elem.entityCategory == "CMDMNT_CHRG_ON") {
                this.selectedChargesList.push(elem);
                this.localSelectedChargeList = this.selectedChargesList;
                this.selectedChargesList.forEach(i => {
                    i.id = i.lookupEntityId;
                });
            }
            else if (elem.entityCategory == "CALC_MEASURE") {
                this.selectionCalculationMeasureList.push(elem);
                this.selectionCalculationMeasureList.forEach(i => {
                    i.id = i.lookupEntityId;
                });
            }
            else if (elem.entityCategory == "CALC_UNIT") {
                this.selectedCalculationUnitList.push(elem);
                this.selectedCalculationUnitList.forEach(i => {
                    i.id = i.lookupEntityId;
                });
            }
            else if (elem.entityCategory == "CALC_TYPE") {
                this.selectedCalculationTypeList.push(elem);
                this.selectedCalculationTypeList.forEach(i => {
                    i.id = i.lookupEntityId;
                });
            }
            // else if (elem.entityCategory == "CALC_TYPE") {
            //     this.selectedCalculationTypeList.push(elem);
            // }
            else if (elem.entityCategory == "CMDMNT_TYPE") {
                this.loadObj.commandmentType = elem.lookupEntityId;
            }
            else if (elem.entityCategory == "CMDMNT_GEO_TYPE") {
                this.loadObj.geoType = elem.lookupEntityId;
                this.getSubTypeByGeoType(elem.lookupEntityId);
            }
        })

        this.editCommandmentRR(obj.id);
    }
    editCommandmentRR(commandantId) {

        this.clickOnCommandmentRRSubmit = true;
        this.isCommandmentbtn = false;
        this.localSelectedBusinessTypeList = this.selectedBusinessTypeList;
        this.localSelectedCustomerTypeList = this.selectedCustomerTypeList;
        this.localSelectedServiceOfferingList = this.selectedServiceOfferingList;
        this.$commandment.getcommandantById(commandantId).subscribe(Response => {
            if (Response.description) {
                this.commandmentObj.description = Response.description;
            }
            if (Response.expiryDate) {
                this.commandmentObj.expiryDate = Response.expiryDate;
            }
         this.commandmentObj.commandmentEntityMapDtos=[...Response.commandmentEntityMaps ];
            this.commandmentRrTableList = Response.commandmentOfferingList;

            this.isExpand = true;
            this.selectionCalculationMeasureList.forEach((selectedElem, index) => {
                this.calculationMeasureList.forEach(elem => {
                    if (selectedElem.lookupEntityId == elem.id) {
                        selectedElem.descr = elem.descr;
                    }
                });
            })

            this.selectedCalculationUnitList.forEach(selectedElem => {
                this.calculationUnitList.forEach(elem => {
                    if (selectedElem.lookupEntityId == elem.id) {
                        selectedElem.descr = elem.descr;
                    }
                });
            })
            this.selectedCalculationTypeList.forEach(selectedElem => {
                this.calculationTypeList.forEach(elem => {
                    if (selectedElem.lookupEntityId == elem.id) {
                        selectedElem.descr = elem.descr;
                    }
                });
            })
            this.selectedChargesList.forEach(selectedElem => {
                this.commandmentChargesOnList.forEach(elem => {
                    if (selectedElem.lookupEntityId == elem.id) {
                        selectedElem.descr = elem.descr;
                    }
                });
            })


            let commandmentRrObj = this.commandmentRrTableList.find(elm => elm.cmdmntRrsList && elm.cmdmntRrsList.length);

            for (let index = 0; index < this.commandmentRrTableList.length; index++) {
                if (this.commandmentRrTableList[index].cmdmntRrsList.length > 0) {
                    if (this.commandmentObj.maxAmountFlag == 0 && this.commandmentRrTableList[index].cmdmntRrsList[0].maxValue) {
                        this.commandmentRrTableList[index].cmdmntRrsList[0].maxValue = 0
                    }
                    if (this.commandmentObj.minAmountFlag == 0 && this.commandmentRrTableList[index].cmdmntRrsList[0].minValue) {
                        this.commandmentRrTableList[index].cmdmntRrsList[0].minValue = 0
                    }
                    this.commandmentRrTableList[index].isChecked = true;
                    this.commandmentRrTableList[index].commandmentRrRequestDTO = this.commandmentRrTableList[index].cmdmntRrsList[0];

                    let calculationTypeId = (this.commandmentRrTableList[index].commandmentRrRequestDTO) ? this.commandmentRrTableList[index].commandmentRrRequestDTO.calculationTypeId : null;


                    if (calculationTypeId && this.checkForEditBtn(calculationTypeId)) {

                        if (this.commandmentRrTableList[index].commandmentRrRequestDTO.cmdmntRrSlabList && !this.commandmentRrTableList[index].commandmentRrRequestDTO.cmdmntRrSlabList.length) {
                            this.commandmentRrTableList[index].commandmentRrRequestDTO.cmdmntRrSlabList = [...commandmentRrObj.cmdmntRrsList[0].cmdmntRrSlabList];
                        }
                    }

                    this.clickOnCommandmentRRSubmit = false;
                    this.isCommandmentbtn = true;
                    this.abc = true;
                    // let commandmentRrRequestDTO = this.commandmentRrTableList[index].commandmentRrRequestDTO;
                } else {
                    this.isChecked = true;
                    this.clickOnCommandmentRRSubmit = true;
                    this.isCommandmentbtn = false;
                    this.commandmentRrTableList[index].commandmentRrRequestDTO = {};
                }


            }
this.spinner.hide();
            console.log(this.commandmentRrTableList);
            return this.getEntityList();
        })
    }
    submitCommandment() {

        if (this.commandmentObj.id && this.commandmentObj.status == 1 && this.abc == false) {
            return this.saveCommandmentRR();
        }
        else {
            return this.saveCommandment()
        }
    }
    getStatus() {

        if (this.abc == false && this.commandmentObj.status == 0) {
            this.isChecked = false;
        }
    }
    tempObj = <boolean>true;
    isChecked = <boolean>false;
    serviceOffering(o1, o2) {
        if (o2) {
            return o1.id === o2.id;
        }
    }
    contractType(o1, o2) {
        if (o2) {
            return o1.id === o2.id;
        }
    }
    businessType(o1, o2) {
        if (o2) {
            return o1.id === o2.id;
        }
    }
    calculationType(o1, o2) {
        if (o2) {
            return o1.id === o2.id;
        }
    }
    chargesOn(o1, o2) {
        if (o2) {
            return o1.id === o2.id;
        }
    }
    calculationMeasure(o1, o2) {
        if (o2) {
            return o1.id === o2.id;
        }
    }
    calculationUnit(o1, o2) {
        if (o2) {
            return o1.id === o2.id;
        }
    }

    expiryMinDate: any;
    isVar = <boolean>false;
    currentDate = moment(new Date()).format("YYYY-MM-DD");

    checkForExpiryDate(effectiveDate) {

        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        if (this.commandmentObj.effectiveDate) {
            this.commandmentObj.effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        }
        if (this.commandmentObj.expDt > effectiveDate && this.commandmentObj.expDt > todayDate) {
            this.isVar = false;
        }
        else if (!this.commandmentObj.id) {
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

    changeDateFormat(effectiveDate, expiryDate) {
        this.isVar = true;
        console.log(effectiveDate)
        if (effectiveDate) {
            this.commandmentObj.effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        }
        if (expiryDate) {
            this.commandmentObj.expiryDate = moment(expiryDate).format('YYYY-MM-DD');
        }

        this.checkForExpiryDate(effectiveDate);
    }
    clearMaxValue(minValue, maxValue2, index) {
        this.commandmentRrTableList[index].isInvalid = false;
        if (parseFloat(minValue) > parseFloat(maxValue2)) {
            this.commandmentRrTableList[index].commandmentRrRequestDTO.maxValue = '';
            this.commandmentRrTableList[index].isInvalid = true;
        }
    }

    isBussinessChecked(businessType) {

        let returnVl = false
        if (this.commandmentObj.commandmentOfferingRequestDTOs) {
            this.commandmentObj.commandmentOfferingRequestDTOs.forEach(elem => {
                if (elem.businessTypeId == businessType.id) {
                    returnVl = true;
                }
            })

            return returnVl;
        }
    }

    isServiceOfferingChecked(offering) {

        let returnVl = false
        if (this.commandmentObj.commandmentOfferingRequestDTOs) {
            this.commandmentObj.commandmentOfferingRequestDTOs.forEach(elem => {
                if (elem.serviceOfferingId == offering.id) {
                    returnVl = true;
                }
            })

            return returnVl;
        }
    }

    isContractTypeChecked(contract) {

        let returnVl = false
        if (this.commandmentObj.commandmentOfferingRequestDTOs) {
            this.commandmentObj.commandmentOfferingRequestDTOs.forEach(elem => {
                if (elem.customerTypeId == contract.id) {
                    returnVl = true;
                }
            })

            return returnVl;
        }
    }
    isChargesOnChecked(contract) {

        let returnVl = false;
        if (this.commandmentObj.commandmentEntityMaps) {
            this.commandmentObj.commandmentEntityMaps.forEach(elem => {
                if (elem.lookupEntityId == contract.id) {
                    returnVl = true;
                }
            })

            return returnVl;
        }
    }


}

