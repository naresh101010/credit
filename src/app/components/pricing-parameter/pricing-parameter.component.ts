import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material';
import { DeleteModalComponent } from './../../modals/delete-modal/delete-modal.component';
import { AppComponent } from './../../app.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorisation.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { DatePipe } from '@angular/common';
import { PricingParameter } from 'src/app/services/pricing-parameter.service';
import moment from 'moment';

@Component({
    selector: 'app-pricing-parameter',
    templateUrl: './pricing-parameter.component.html',
    styleUrls: ['./pricing-parameter.component.css']
})
export class PricingParameterComponent implements OnInit {
    constructor(public dialog: MatDialog,
        private AuthorizationService: AuthorizationService,
        private datePipe: DatePipe,
        private appComp: AppComponent,
        private spinner: NgxSpinnerService,
        private permissionsService: NgxPermissionsService,
        private $pricing: PricingParameter) { }
    @ViewChild("f", null) pricingForm: any;
    ngOnInit() {

        this.getPricingParameter();
        this.getAllLoad();
        this.permissionsService.loadPermissions(this.AuthorizationService.getPermissions('COMMANDMENT', 'PRICING PARAMETER'));
    }
    attributeTypeNameSearchCtrl = <string>'';
    attributeValNameSearchCtrl = <string>'';
    calculationTypeNameSearchCtrl = <string>'';
    serviceOfferNameSearchCtrl = <string>'';
    contractTypeNameSearchCtrl = <string>'';
    attributeValueTypeNameSearchCtrl = <string>'';
    FormatType = <string>'Create';
    addPricingParameter;
    showPricingParameter = <boolean>true;
    isPricingId = <boolean>false;
    submitPermission = <boolean>false;
    statusDisable = <boolean>false;
    inActiveFlag = <boolean>false;
    strLengthValid: boolean = false;
    hideAttributevalue: boolean = false;
    isInactive: boolean = false;
    notMandatory: boolean = true;
    pricingName: string;
    p: number = 1;
    pricingObj = {
        status: 1
    } as any;
    attributeTypeObj = {} as any;
    pricingParamRrRequestDTO = {} as any;
    // pricingParamRrRequestDTO = {} as any;
    // attributeTable = {} as any;
    today = new Date();

    pricingParameterList: Array<any> = [];
    // attrVal: Array<any> = [];
    serviceOffeingList: Array<any> = [];
    attributeTypeList: Array<any> = [];
    localpricingParamOfferingMapRequestDTOs: Array<any> = [];
    chargeByList: Array<any> = [];
    attributeValue;
    selectedPricingArribute: Array<any> = [];
    customerTypeList: Array<any> = [];
    pricingCalculationTypeList: Array<any> = [];
    selectedContractype: Array<any> = [];
    selectedServiceOffering: Array<any> = [];
    pricingParamOfferingMapRequestDTOs: Array<any> = [];
    clearObj() {

        this.pricingObj = {
            status: 1
        }
        this.FormatType = "Create";
        this.submitPermission = false;
        this.statusDisable = false;
        this.isPricingId = false;
    }
    setOnLoad() {
        this.serviceOffeingList = [];
        this.attributeTypeList = [];
        this.chargeByList = [];
        this.selectedPricingArribute = [];
        this.customerTypeList = [];
        this.pricingCalculationTypeList = [];
        this.selectedContractype = [];
        this.selectedServiceOffering = [];
        this.pricingParamOfferingMapRequestDTOs = [];
        this.attributeTypeObj = {} as any;
        this.pricingParamRrRequestDTO = {} as any;
        this.getPricingParameter();
        this.getAllLoad();
        this.pricingObj = {} as any;
    }
    getAttributeValueByType(attributeId) {

        this.notMandatory = true;
        this.attributeTypeList.forEach(elem => {
            if (attributeId == elem.id) {
                if (elem.descr.trim() == "TEXT") {
                    this.selectedPricingArribute = [];
                    this.hideAttributevalue = true;
                    this.notMandatory = false;
                }
                else {
                    this.hideAttributevalue = false;
                }
                if (elem.descr.trim() == "RADIO BUTTON") {
                    this.notMandatory = false;
                }
            }
        })
    }

    savePricing() {
        if (this.pricingObj.expiryDate) {
            if (this.pricingObj.expiryDate < this.currentDate && this.pricingObj.expiryDate < this.pricingObj.effectiveDate) {
                this.isVar = true;
            }
            else {
                this.isVar = false;
                this.pricingObj.expiryDate = moment(this.pricingObj.expiryDate).format("YYYY-MM-DD");
            }
        }
    }
    getPricingParameter() {
        this.spinner.show();
        this.$pricing.getall().subscribe(response => {
            this.spinner.hide();
            this.pricingParameterList = response;
        })
    }
    getAllLoad() {
        this.$pricing.getLoad().subscribe(response => {

            this.pricingCalculationTypeList = response.pricingCalculationTypeList;
            this.attributeTypeList = response.attributeTypeList;
            this.chargeByList = response.chargeByList;
            this.customerTypeList = response.customerTypeList;
            this.serviceOffeingList = response.serviceOffeingList;
        })
    }

    savePricingParameter() {

        this.pricingParamOfferingMapRequestDTOs.forEach(elem => {
            elem.description = this.pricingObj.description;
            elem.effectiveDate = this.pricingObj.effectiveDate;
            elem.expiryDate = this.pricingObj.expiryDate;
            elem.pricingParamRrRequestDTO.effectiveDate = this.pricingObj.effectiveDate;
            elem.pricingParamRrRequestDTO.expiryDate = this.pricingObj.expiryDate;

        })
        if (this.pricingObj.status == 1) {
            this.pricingParamOfferingMapRequestDTOs.forEach(elem => {
                elem.pricingParamRrRequestDTO.status = 1
            })
        }
        this.attributeTypeList.forEach(elem => {
            if (elem.id == this.pricingObj.attributeTypeId) {
                this.pricingObj.attrIdentifier = elem.descr;
            }
        })
        if (this.selectedPricingArribute) {
            var artibuteValue = '';
            this.selectedPricingArribute.forEach(elem => {
                artibuteValue = artibuteValue + `${elem.id},`;
            })

            this.pricingObj.attrVal = artibuteValue.replace(/,+$/, "");
        }

        if (this.selectedCalculationTypeId) {
            var typeString = '';
            this.selectedCalculationTypeId.map(elem => {
                typeString = typeString + `${elem.id},`;
            })

            this.pricingObj.priceCalculationTypeId = typeString.replace(/,+$/, "");
        }

        this.pricingObj.pricingParamOfferingMapRequestDTOs = [...this.pricingParamOfferingMapRequestDTOs];
        this.pricingObj.pricingParamOfferingMapRequestDTOs.forEach(element => {
            element
        });
        if (this.pricingObj.status == 0) {
            this.pricingParamOfferingMapRequestDTOs.forEach(elem => {
                elem.status = 0;
                elem.pricingParamRrRequestDTO.status = 0;

            })
            let dialog = this.dialog.open(DeleteModalComponent, {
                width: '35vw',
                panelClass: 'mdmDialog',
                data: { title: this.pricingObj.commandmentName, heading: "Pricing" }
            });
            dialog.beforeClose().subscribe(response => {

                if (response === "cancel") {
                    return;
                }
                else if (response) {
                    this.updatePricingParameter();
                }
            })

        }
        else {
            this.updatePricingParameter();
        }
    }

    viewPermission() {
        this.setOnLoad();
        this.addPricingParameter = false;
        this.showPricingParameter = true;
    }

    selectedCalculationTypeId: any = [];
    editPricingParameter(pricing = null, type = null) {
        this.spinner.show();
        this.pricingObj = { ...pricing };
        this.selectedCalculationTypeId = this.pricingObj.priceCalculationTypeId.split(",").map(elem => this.chargeByList.find(elm => elm.id == elem))
        this.isPricingId = true;
        this.statusDisable = false;
        this.submitPermission = false;
        this.addPricingParameter = true;
        this.showPricingParameter = false;
        this.isVar = false;
        this.FormatType = "Edit";
        this.attributeTypeList.forEach(elem => {
            if (pricing.attributeTypeId == elem.id) {
                if (elem.descr.trim() == "TEXT") {
                    this.selectedPricingArribute = [];
                    this.hideAttributevalue = true;
                    this.notMandatory = false;
                }
                else {
                    this.notMandatory = true;
                    this.hideAttributevalue = false;
                }
                if (elem.descr.trim() == "RADIO BUTTON") {
                    this.notMandatory = false;
                }
            }
        })
        if (type == 1) {
            this.isPricingId = false;
            this.submitPermission = true;
            this.FormatType = "View";

        }
        if (this.pricingObj.status == 0 && this.pricingObj.expiryDate < this.currentDate) {
            this.isInactive = true;
            this.isVar = false;
            this.expiryMinDate = this.currentDate;
        }
        else {
            this.isInactive = false;
        }

        let uniqueList = [];
        this.pricingObj.priceCalculationTypeId = pricing.priceCalculationTypeId;
        uniqueList = pricing.pricingParamOfferingMapResponseDTOs.map(item => item.serviceOfferingId).filter((value, index, self) => self.indexOf(value) === index)
        uniqueList.forEach(elemi => {
            let elem = {
                "id": elemi
            }
            if (!this.selectedServiceOffering) {
                this.selectedServiceOffering = [];
            }
            this.selectedServiceOffering.push(elem);
        })

        uniqueList = pricing.pricingParamOfferingMapResponseDTOs.map(item => item.customerTypeId).filter((value, index, self) => self.indexOf(value) === index)
        uniqueList.forEach(elemi => {
            let elem = {
                "id": elemi
            }
            if (!this.selectedContractype) {
                this.selectedContractype = [];
            }
            this.selectedContractype.push(elem);
        })
        this.$pricing.getPricingParameterById(pricing.id).subscribe(response => {
            this.spinner.hide();
            this.pricingObj = response;

            this.pricingParamOfferingMapRequestDTOs = [...this.pricingObj.pricingParamOfferingMapResponseDTOs];
            delete this.pricingObj.pricingParamOfferingMapResponseDTOs;
            if (response.attrVal) {
                this.selectedPricingArribute = response.attrVal.split(",").map(elem => this.pricingCalculationTypeList.find(elm => elm.id == elem));
            }
            else {
                this.hideAttributevalue = true;
            }
            this.pricingParamOfferingMapRequestDTOs.forEach((elem, i) => {
                elem.pricingParamRrRequestDTO = { ...elem.pricingParamRrs[0] };
                elem.isChecked = true;
                delete elem.pricingParamRrs;
            })

            this.localpricingParamOfferingMapRequestDTOs = [...this.pricingParamOfferingMapRequestDTOs];
            this.inActiveStatus();
        })
    }
    inActiveStatus() {

        if (this.pricingObj.status == 0) {
            this.inActiveFlag = true;
        }
    }
    compareWithfunc(o1, o2) {
        if (o2) {
            return o1.id === o2.id;
        }
    }

    calculationTypeCheck(o1, o2) {
        if (o2) {
            return o1 === parseInt(o2);
        }
    }

    updatePricingParameter() {


        this.spinner.show();

        if (!this.pricingObj.status) {

            this.pricingObj.pricingParamOfferingMapRequestDTOs.map(elem => {
                elem.status = 0;
                elem.pricingParamRrRequestDTO.status = 0;
            })
        }
  else{
     this.pricingObj.pricingParamOfferingMapRequestDTOs.map(elem => {
                elem.status = 1;
                elem.pricingParamRrRequestDTO.status = 1;
            })
   }
        this.$pricing.savepricing(this.pricingObj).subscribe(response => {
            this.spinner.hide();

            if (!this.pricingObj.id) {
                this.appComp.showMessage(`${this.pricingObj.pricingLabel} Parameter Is Added`);
            } else if (this.pricingObj.status == 0) {
                // let index = this.pricingParameterList.findIndex(elem => elem.id == this.pricingObj.id);
                // this.pricingParameterList[index] = this.pricingObj;
                this.appComp.showMessage(`${this.pricingObj.pricingLabel} Is Deleted`);

            } else {
                // let index = this.pricingParameterList.findIndex(elem => elem.id == this.pricingObj.id);
                // this.pricingParameterList[index] = this.pricingObj;
                this.appComp.showMessage(`${this.pricingObj.pricingLabel} Is Updated`);
            }

            setTimeout(() => {
                this.p = 1;
                this.showPricingParameter = true;
                this.addPricingParameter = false;
                this.setOnLoad();

                // this.getPricingParameter();
                // this.getAllLoad();
                // this.pricingObj = {} as any;
                this.isPricingId = false;
                this.pricingForm.resetForm();
            }, 1000);
        }, err => {

            setTimeout(() => {
                if (err.error.errors.error[0].code == "B_ERR-644") {
                    this.p = 1;
                    this.showPricingParameter = true;
                    this.addPricingParameter = false;

                    this.setOnLoad();
                    this.isPricingId = false;
                    this.pricingForm.resetForm();
                }
            }, 1000);

        })
    }

    pricingParamTooltip(pricingParamOfferingMapResponseDTOs, type) {

        let returnName = '';

        if (type == "serviceOfferingId") {
            pricingParamOfferingMapResponseDTOs.map(elem => {
                let object = this.serviceOffeingList.find(elm => elm.id == elem.serviceOfferingId)
                if (!object) return;
                returnName += `${object.serviceOffering} , `
            })
        } else if (type == "customerTypeId") {
            pricingParamOfferingMapResponseDTOs.map(elem => {
                let object = this.customerTypeList.find(elm => elm.id == elem.customerTypeId)
                if (!object) return;
                returnName += `${object.descr} , `
            })
        }

        return returnName.replace(/,\s*$/, "");
    }


    removeDuplicate(arr, comp) {
        if (!arr) return [];
        const unique = arr.map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter((e) => arr[e]).map(e => arr[e]);

        return unique;

    }

    getmappingServiceOfferWithContract(type) {

        // this.pricingParamOfferingMapRequestDTOs
        let deleteIndex = [];
        if (type == 'contractype') {
            this.selectedContractype.forEach((elem, index) => {
                this.selectedServiceOffering.forEach((elm) => {
                    let isPresent = this.pricingParamOfferingMapRequestDTOs.find(obj => obj.customerTypeId == elem.id && obj.serviceOfferingId == elm.id);
                    if (isPresent) return;
                    this.pricingParamOfferingMapRequestDTOs.push({
                        "pricingParamRrRequestDTO": {},
                        "customerTypeId": elem.id,
                        "serviceOfferingId": elm.id,
                        "status": 1
                    })
                })
            })

            this.pricingParamOfferingMapRequestDTOs.forEach((elem, i) => {
                let index = this.selectedContractype.findIndex(obj => obj.id == elem.customerTypeId);
                if (index == -1) {
                    deleteIndex.push(i);
                }
            })
        } else if (type == 'serviceOffering') {
            this.selectedServiceOffering.forEach((elem, index) => {
                this.selectedContractype.forEach((elm, index) => {
                    let isPresent = this.pricingParamOfferingMapRequestDTOs.find(obj => obj.serviceOfferingId == elem.id && obj.customerTypeId == elm.id);
                    if (isPresent) return;
                    this.pricingParamOfferingMapRequestDTOs.push({
                        "pricingParamRrRequestDTO": {},
                        "serviceOfferingId": elem.id,
                        "customerTypeId": elm.id,
                        "status": 1
                    })
                })
            })


            this.pricingParamOfferingMapRequestDTOs.forEach((elem, i) => {
                let index = this.selectedServiceOffering.findIndex(obj => obj.id == elem.serviceOfferingId);
                if (index == -1) {
                    deleteIndex.push(i);
                }
            })
        }


        deleteIndex.forEach(element => {
            // this.pricingParamOfferingMapRequestDTOs.splice(element,1);
            delete this.pricingParamOfferingMapRequestDTOs[element]
        });

        this.pricingParamOfferingMapRequestDTOs = this.pricingParamOfferingMapRequestDTOs.filter(elem => elem)
        if (this.selectedPricingArribute.length == 1) {
            this.pricingParamOfferingMapRequestDTOs.forEach(elem => {
                elem.pricingParamRrRequestDTO.attributeValue = this.selectedPricingArribute[0].id;
            })
        }
    }


    clearSearchInput() {

        if (!this.pricingName || this.pricingName == '') {
            this.strLengthValid = false;
            return this.getPricingParameter();
        }
    }

    searchPricingParameter(str) {

        let strlength = str.target.value.length;
        if (strlength > 2 && str.target.value) {
            this.strLengthValid = false;
            this.p = 1;
            if (!this.pricingName || this.pricingName.trim() == "") {
                return this.getPricingParameter();
            }
            this.$pricing.searchByName(this.pricingName).subscribe(response => {
                this.pricingParameterList = response;
                // if (!this.pricingParameterList.length) {
                //     this.appComp.showMessage(`Record Doesn't Exist In Propel-I`, "danger");
                // }
            });
        } else {
            this.strLengthValid = true;
        }
    }

    expiryMinDate: any;
    isVar = <boolean>true;
    currentDate = moment(new Date()).format("YYYY-MM-DD");

    checkForExpiryDate(effectiveDate) {

        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        // this.pricingObj.effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        if (this.pricingObj.effectiveDate) {
            this.pricingObj.effectiveDate = moment(this.pricingObj.effectiveDate).format("YYYY-MM-DD");
        }
        if (this.pricingObj.expiryDate <= effectiveDate && (!this.pricingObj.id || this.pricingObj.expiryDate <= effectiveDate)) {
            this.isVar = true;
        }
        else if (!this.pricingObj.id) {
            this.isVar = true;
        }
        else {
            this.isVar = false;
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
            this.pricingObj.effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        }
        if (expiryDate) {
            this.pricingObj.expiryDate = moment(expiryDate).format('YYYY-MM-DD');
        }

        this.checkForExpiryDate(effectiveDate);
    }
    LocalAttributeValueList: Array<any> = [];
    LocalchargesByList: Array<any> = [];
    isAttributeValueChecked(arrtibuteVAl) {
        let returnVl = false
        if (this.pricingObj.attrVal && this.pricingObj.id) {
            this.LocalAttributeValueList = this.pricingObj.attrVal.split(",").map(elem => this.pricingCalculationTypeList.find(elm => elm.id == elem));
            this.LocalAttributeValueList.forEach(elem => {
                if (elem.id == arrtibuteVAl.id) {
                    returnVl = true;
                }
            })

            return returnVl;
        }
    }

    iscalculationTypeChecked(calculationType) {
        let returnVl = false
        if (this.pricingObj.priceCalculationTypeId && this.pricingObj.id) {
            this.LocalchargesByList = this.pricingObj.priceCalculationTypeId.split(",").map(elem => this.chargeByList.find(elm => elm.id == elem));
            this.LocalchargesByList.forEach(elem => {
                if (elem.id == calculationType.id) {
                    returnVl = true;
                }
            })

            return returnVl;
        }

    }
    isServiceOfferingChecked(serviceOffer) {
        let returnVl = false
        if (this.pricingObj.id) {
            this.localpricingParamOfferingMapRequestDTOs.forEach(elem => {
                if (elem.serviceOfferingId == serviceOffer.id) {
                    returnVl = true;
                }
            })
        }

        return returnVl;
    }
}
