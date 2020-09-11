import { CommonService } from './../../services/common.service';
import { BranchAdvanceSearchComponent } from './../../modals/branch-advance-search/branch-advance-search.component';
import { PincodeService } from 'src/app/services/pincode.service';
import { AppComponent } from 'src/app/app.component';
import { Branch } from './../../Models/branch';
import { BranchService } from './../../services/branch.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PincodeSearchComponent } from 'src/app/modals/pincode-search/pincode-search.component';
import { MatDialog } from '@angular/material';
import { ManageBranchMasterComponent } from 'src/app/modals/manage-branch-master/manage-branch-master.component';
import { DeleteModalComponent } from 'src/app/modals/delete-modal/delete-modal.component';
import * as moment from "moment";
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from 'src/app/services/authorisation.service';
import { DatePipe } from '@angular/common';
import { element } from 'protractor';

@Component({
    selector: 'app-branch-details',
    templateUrl: './branch-details.component.html',
    styleUrls: ['./branch-details.component.css']
})
export class BranchDetailsComponent implements OnInit {
    @ViewChild("f", null) branchForm: any;
    @ViewChild("p", null) branchForm2: any;
    @ViewChild("searchBranch1", null) searchBranch1: any;

    mop: any;
    constructor(public dialog: MatDialog, private $pincode: PincodeService, private $branchService: BranchService, private appComp: AppComponent, private spinner: NgxSpinnerService, private AuthorizationService: AuthorizationService, private permissionsService: NgxPermissionsService, private datePipe: DatePipe, private $spinner: NgxSpinnerService, private $common: CommonService) { }

    ngOnInit() {
        this.getBranchList();
        this.branchLoadList();
        this.getSlabFeatureLoad();
        this.searchEmployeeList(null, " ");
        // this.getPincodeList();
        this.permissionsService.loadPermissions(this.AuthorizationService.getPermissions('BRANCH', 'BRANCH'));
    }


    // Slab;
    page = 1;
    paymentMode = false;
    assignManager;
    isSlabFlag: any;
    addAssignManager;
    inputWeightSlab;
    hideMinusBtn;
    selectMop;
    add_btn_hide;
    orgNameSearchCtrl: string = '';
    userIdSearchCtrl: string = '';
    reportNameSearchCtrl: string = '';
    typeNameSearchCtrl: string = '';
    lkpBranchSearchCtrl: string = '';
    operationalSearchCtrl: string = '';
    // managerNameSearchCtrl:string='';
	// new variables
    branchMapping = false;
    addPinBranchMapping = false;
    hidetab = true;
    addBranch = false;
    addBranchManager = false;
    pincode: string;
    weightSlab = {} as any;
    getPincodeNameArr: any[] = [];

    branchObj = {
        status: 1
    } as Branch;

    allBranch: boolean = true;
    isExpand = <boolean>true;
    branchList: Array<Branch> = [];
    tempBranchList: Array<Branch> = [];
    reportingBranchList: Array<Branch> = [];
    branchManagers: any[] = [{ status: 1 }];
    organizationList: Array<any> = [];
    featuresList: Array<any> = [];
    modeOfPayments: Array<any> = [];
    ratingList: Array<any> = [];
    typesList: Array<any> = [];
    slabsList: Array<any> = [];
    managerTypes: Array<any> = [];
    employeeList: Array<any> = [];
    searchBranchName: string;
    pincodeList: Array<any>;
    picodeObj = {} as any;
    searchObj = {
        searchCriteria: 'branchName'
    } as any;
    today = moment(new Date()).format("YYYY-MM-DD");
    expiryMinDate: any;
    isChange = <boolean>true;
    isVar = <boolean>false;
    currentDate = moment(new Date()).format("YYYY-MM-DD");
    isInactive = <boolean>false;

    getBranchList() {
        this.spinner.show();
        this.$branchService.getAll().subscribe(response => {

            this.branchList = response.responseData;
            this.tempBranchList = [...response.responseData];

            this.branchList.forEach((elem) => {
                this.getPincodeNameArr.push(elem.pincodeId)
            })

            this.spinner.hide();
        })
    }

    clearObj() {
        this.branchObj = { status: 1 } as Branch;
        this.branchManagers = [{ status: 1 }];
        this.pincode = '';
        this.weightSlab = {} as any;
        this.searchObj.criteriaValue = '';
        this.searchObj.criteriaValue = '';
        return;
    }

    showName(reportingBranchId, nameKey) {
        let object = this.tempBranchList.find(elem => elem['branchId'] == reportingBranchId);

        return object ? object[nameKey] : '-';
    }

    clearSearchBranch() {

        this.searchObj.searchValue = ''
        this.getBranchList();

        if (this.searchObj.searchCriteria.trim() == "pincode") {
            this.hidetab = false;
            this.searchObj.criteriaValue = '';
        }
        else {
            this.hidetab = true;
            this.searchObj.criteriaValue = '';
        }
    }

    getPincode(pincodeId, index = null) {

        this.$pincode.getPincodeById(pincodeId).subscribe(response => {
            this.picodeObj = response.responseData
            if (this.picodeObj.pincode) {
                this.pincode = this.picodeObj.pincode;
            }
            if (!isNaN(index)) {
                this.setFullAddress(index, response.responseData);
            }
        })
    };

    branchLoadList() {
        
        this.$branchService.getBranchLoad().subscribe(response => {
            let loadList = response.referenceData;
            this.organizationList = loadList.organizations;
            this.featuresList = loadList.features;
            this.featuresList.map(elem => elem.isSlabFlag = 0)
            this.modeOfPayments = loadList.modeOfPayments;
            this.modeOfPayments.map(elem => elem.status = 0)
            this.ratingList = loadList.ratings;
            this.typesList = loadList.types;
            this.managerTypes = loadList.managerTypes;
        })
    }

    searchEmployeeList(managerObj = null, searchString = null) {

        let searchVal = ''
        if (managerObj) {
            searchVal = managerObj.userId;
        } else if (searchString) {
            searchVal = searchString;
        }
        this.$branchService.searchEmploye(searchVal).subscribe((response: any) => {

            this.employeeList = response.responseData;

        })
    }


    employeeSelected(o1, o2) {
        if (o2) {
            return o1 == o2;
        }
    }

    public getOptionText = (empId) => {
        if (!empId) return;
        let employee = this.employeeList.find(elem => elem.id == empId)
        if (employee)
            return employee.name;
    };

    getSlabFeatureLoad() {
        this.$branchService.getBranchLoadPinMapping().subscribe(response => {
            this.slabsList = response.referenceData.slabs;
        })
    }

    closeAllBranch(id) {
        this.branchList.map(elem => {
            if (elem.branchId != id) {
                elem.isPreview = false;
            } else {
                elem.isPreview = !elem.isPreview;
            }
        });
    }

    editBranch(editObj) {
        this.allBranch = false;
        this.addBranch = true;
        this.searchObj.criteriaValue = '';
        if (!this.strLengthValid) {
            this.getBranchList();
        }
        this.branchDetails(editObj);

    }

    openBranchInput() {
        this.addBranch = true;
        this.allBranch = true;
    }

    slabShow(branchFeatureId = null, isSlabFlag) {

        let index = this.featuresList.findIndex(elem => elem.id == branchFeatureId)
        let status = isSlabFlag ? 1 : 0;
        status = status == 0 ? 1 : 0;
        this.featuresList[index].isSlabFlag = status;

    }


    submitManageMaping() {

        let isValidManager = true;
        this.branchManagers.map(elem => {
            if (!elem.userId) {
                isValidManager = false;
            }
        })

        let isRequired = this.checkManagerRequired();

        if (!isValidManager && isRequired) {
            return;
        }

        let data = { ...this.branchObj };
        data.email = data.email.toUpperCase();

        let selectedMop = [...this.modeOfPayments.filter(elem => elem.status)]
        let selectedFeatures = [...this.featuresList.filter(elem => elem.isWeight)];
        if (data.branchId) {


            // also check for condition with status 0 and than checked again
            data.branchModeOfPayments = data.branchModeOfPayments.map(elem => {
                let mopObject = selectedMop.find(elm => elm.id == elem.lkpBranchMopId)
                if (mopObject) {
                    let id = elem.id
                    mopObject.effectiveDt = moment(mopObject.effectiveDt).format("YYYY-MM-DD");
                    mopObject.focValidUpto = moment(mopObject.focValidUpto).format("YYYY-MM-DD");
                    elem = { ...mopObject };
                    elem.status = 1;
                    elem.lkpBranchMopId = elem.id;
                    elem.id = id;
                } else {
                    elem.status = 0
                }

                return elem;
            })


            selectedMop.map(elem => {
                let index = data.branchModeOfPayments.findIndex(elm => elm.lkpBranchMopId == elem.id);
                if (index != -1) {
                    return;
                }
                elem.effectiveDt = moment(elem.effectiveDt).format("YYYY-MM-DD");
                elem.focValidUpto = moment(elem.focValidUpto).format("YYYY-MM-DD");
                elem.lkpBranchMopId = elem.id;
                elem.status = elem.status ? 1 : 0;
                delete elem.id;
                data.branchModeOfPayments.push(elem);
            })


            selectedFeatures.map(elem => {
                let featureObj = data.branchFeatureMaps.find(elm => elm.branchFeatureId == elem.id);
                if (!featureObj) {
                    let obj = {
                        branchFeatureId: elem.id,
                        status: elem.status ? 1 : 0,
                        isSlabFlag: elem.isSlabFlag ? 1 : 0,
                        slabId: elem.slabId,
                    }
                    data.branchFeatureMaps.push(obj)
                } else {
                    featureObj.status = 1;
                    featureObj.isSlabFlag = elem.isSlabFlag;
                    featureObj.slabId = elem.slabId;
                }
            })
            data.branchFeatureMaps.map(elem => {
                let featureObj = selectedFeatures.find(elm => elm.id == elem.branchFeatureId)
                if (!featureObj) {
                    elem.status = 0;
                }
            })
            let isExit = false;
            let newManagersList = [];
            this.branchManagers.map(elem => {

                let isPresent = data.branchManagers.find(elm => elm.lookupManagerTypeId == elem.lookupManagerTypeId && elem.userId == elm.userId);
                if (!elem.id) {
                    if (isPresent && isPresent.status) {
                        isExit = true;
                    } else if (isPresent && !isPresent.status) {
                        let index = data.branchManagers.findIndex(elm => elm.id == isPresent.id)
                        data.branchManagers[index].status = 1;
                    } else {
                        newManagersList.push(elem);
                    }
                } else {
                    if (isPresent && isPresent.status && isPresent.id != elem.id) {
                        isExit = true;
                    }
                }
            });

            if (isExit) {
                return this.appComp.showMessage(`CANNOT HAVE DUPLICATE MANAGER / EMPLOYEE COMBINATION`, 'danger');
            } else {
                newManagersList.map(elem => {
                    if (elem.userId) {
                        data.branchManagers.push(elem);
                    }
                })
            }

            data.branchManagers.map(elem => {
                let index = this.branchManagers.findIndex(elm => elm.lookupManagerTypeId == elem.lookupManagerTypeId && elem.userId == elm.userId);
                if (index == -1) {
                    elem.status = 0;
                }
            })

        } else {

            data.branchModeOfPayments = selectedMop;
            data.branchFeatureMaps = selectedFeatures;
            data.branchManagers = this.branchManagers.filter(elem => elem.userId);
            // here we need to send id on edit case
            data.branchModeOfPayments.map(elem => {
                elem.effectiveDt = moment(elem.effectiveDt).format("YYYY-MM-DD");
                elem.focValidUpto = moment(elem.focValidUpto).format("YYYY-MM-DD");
                elem.lkpBranchMopId = elem.id;
                elem.status = elem.status ? 1 : 0;
                delete elem.id;
            })
            data.branchFeatureMaps.map(elem => {
                elem.branchFeatureId = elem.id;
                elem.status = elem.status ? 1 : 0;
                elem.isSlabFlag = elem.isSlabFlag ? 1 : 0;
                delete elem.id;
            })

        }
        data.preBookingLagTimeFlag = data.preBookingLagTimeFlag ? 1 : 0;

        data.effectiveDate = moment(data.effectiveDate).format("YYYY-MM-DD");
        if (data.expiryDate) {
            data.expiryDate = moment(data.expiryDate).format("YYYY-MM-DD");
        }

        if (data.cutoffTime) {
            let splitLen = data.cutoffTime.split(":")
            if (splitLen.length != 3) {
                data.cutoffTime = `${data.cutoffTime}:00`;
            }
        }
        this.isInactive = false;
        this.$spinner.show();
        this.$branchService.saveBranch(data).subscribe(response => {
            // this.$spinner.hide();
            this.page = 1;
            this.addBranch = false;
            this.addBranchManager = false;
            this.paymentMode = false;
            this.allBranch = true;
            this.getBranchList();
            this.branchLoadList()
            if (this.branchObj.branchId && this.branchObj.status == 0) {
                return this.appComp.showMessage(`BRANCH SUCCESSFULLY DELETED`);
            }
            else if (this.branchObj.branchId) {
                return this.appComp.showMessage(`BRANCH SUCCESSFULLY UPDATED`);
            }
            else {
                return this.appComp.showMessage(`BRANCH SUCCESSFULLY ADDED`);
            }
        })
    }

    inputWeightSlabShow(branchFeatureId, type: boolean) {

        let index = this.featuresList.findIndex(elem => elem.id == branchFeatureId)
        this.featuresList[index].addNewSlab = type;
    }

    submitSlab(index) {

        if (!this.featuresList[index].lowerVal) {
            return this.appComp.showMessage(`PLEASE PROVIDE LOWER VALUE`, 'danger');
        } else if (!this.featuresList[index].upperVal) {
            return this.appComp.showMessage(`PLEASE PROVIDE UPPER VALUE`, 'danger');
        }

        const slabData = {
            "lowerVal": parseInt(this.featuresList[index].lowerVal),
            "slabCtgy": this.featuresList[index].featureName,
            "status": 1,
            "upperVal": parseInt(this.featuresList[index].upperVal)
        }

        this.$branchService.submitSlab(slabData).subscribe(response => {
            this.slabsList.push(response.responseData);
            this.featuresList[index].addNewSlab = false;
            this.featuresList[index].slabId = response.responseData.id;
        })
    }

    assignManagerShow( step) {
        
        if (this.branchObj.branchId && !this.branchObj.status) {
            return this.deleteModalOpen();
        }

        if (step == "step1") {
            let checked = this.featuresList.filter(elem => elem.isWeight);
            if (checked.length == 0) {
                return this.appComp.showMessage("Please Assign Feature", "danger")
            }
            this.paymentMode = true;
        } else if (step == "step2") {
            let checked = this.modeOfPayments.filter(elem => elem.status);
            if (checked.length == 0) {
                return this.appComp.showMessage("Please Select Mode Of Payment", "danger")
            }
            if (this.branchManagers.length) {
                this.branchManagers.forEach(element => {
                    element.isHide = true;
                })
            }
            this.addBranch = false;
            this.addBranchManager = true;
        }

    }

    goBack() {
        this.addBranch = true;
        this.addBranchManager = false;
    }


    managerSelected(option, index) {
        this.branchManagers[index].userId = option;
    }

    addAssignManagerShow(type, index) {
        
        if (type) {
            this.branchManagers.push({ status: 1 });
        } else {
            this.branchManagers.splice(index, 1);
        }
    }

    branchMappingShow(type, brachObj = null) {
        this.addPinBranchMapping = true;
        if (type == "edit") {

        }
    }

    checkManagerRequired() {

        let type = this.typesList.find(elem => elem.id == this.branchObj.branchTypeId);
        if (type) {
            let branchType = type.branchType.toLowerCase();
            if (branchType == "area" || branchType == "region") {
                return true;
            }
            return false;
        } else {
            return false;
        }


    }

    strLengthValid: boolean = false;
    searchBranch(str) {
        let strlength = str.target.value.length;
        if (strlength > 2 && str.target.value) {
            this.searchBranch1.nativeElement.blur();
            this.strLengthValid = false;
            this.spinner.show();
            this.page = 1;
            if (!this.searchObj.criteriaValue || this.searchObj.criteriaValue.trim() == '') {
                return this.getBranchList();
            }

            if (!this.searchObj.searchCriteria) {
                return this.appComp.showMessage("Please Select Search Criteria", "danger")
            }

            this.$branchService.branchAdvanceSearch(this.searchObj.searchCriteria, this.searchObj.criteriaValue).subscribe((response: any) => {
                this.branchList = response.responseData;
                this.spinner.hide();
            })
        } else {
            this.strLengthValid = true;
        }

    }
    clearSearch() {
        if (!this.searchObj.criteriaValue || this.searchObj.criteriaValue == '') {
            this.searchBranch1.nativeElement.blur();
            this.strLengthValid = false;
            return this.getBranchList();
        }
    }
    branchDetails(branch, index = undefined, isPreview = null) {
        if (isPreview == "view" && !branch.isPreview) {
            return;
        }
        this.searchEmployeeList(null, " ");

        if (branch.fullAddress && isPreview == "view") {
            this.$spinner.show();
            setTimeout(() => {
                this.$spinner.hide();
            }, 800);
            return;
        }
        this.$spinner.show();

        this.$branchService.getDetailsById(branch.branchId).subscribe((response: any) => {
            setTimeout(() => {
                this.$spinner.hide();
            }, 1000);
            if (!isNaN(index)) {
                this.getPincode(branch.pincodeId, index);
            }
            if (isNaN(index)) {

                this.branchObj = { ...response.responseData };
                if (this.branchObj.status == 0 && this.branchObj.expiryDate < this.currentDate) {
                    this.isInactive = true;
                    this.isVar = false;
                    this.expiryMinDate = this.currentDate;
                }
                else {
                    this.isInactive = false;
                }

                if (this.branchObj.status) {
                    this.initialActive = true;
                }
                if (response.responseData.branchManagers) {
                    this.branchManagers = [...response.responseData.branchManagers.filter(elem => elem.status)];
                    this.branchManagers.map(elem => {
                        elem.userId = parseInt(elem.userId);
                        if (typeof (elem.userId) == "number") {
                            elem.userSearch = elem.userId
                        }
                    })
                    if (this.branchManagers.length == 0) {
                        this.branchManagers = [{ status: 1 }];
                    }

                }
                this.branchObj.branchFeatureMaps.map(elem => {
                    let feature: any;

                    if (elem.branchFeatureId) {
                        feature = this.featuresList.find(featureElm => featureElm.id == elem.branchFeatureId && elem.status)
                        if (feature) {
                            feature.isWeight = 1;
                            feature.isSlabFlag = elem.isSlabFlag;
                        }
                    }
                    if (elem.slabId) {
                        let slab = this.slabsList.find(slabElm => slabElm.id == elem.slabId)
                        if (slab && feature) {
                            feature.isWeight = 1;
                            feature.slabId = slab.id;
                        }
                    }
                })

                this.branchObj.branchModeOfPayments.map(elem => {
                    let mop: any;
                    if (elem.lkpBranchMopId) {
                        mop = this.modeOfPayments.find(mopElm => mopElm.id == elem.lkpBranchMopId)
                        if (mop) {
                            mop.status = elem.status;
                            mop.focMnthWise = elem.focMnthWise;
                            mop.effectiveDt = elem.effectiveDt;
                            mop.focValidUpto = elem.focValidUpto;
                            mop.focWayblMaxCnt = elem.focWayblMaxCnt;
                        }
                    }
                })


                if (this.branchObj.pincodeId) {
                    this.getPincode(this.branchObj.pincodeId);
                }
            } else {
                index = this.branchList.findIndex(elem => elem.branchId == response.responseData.branchId);
                this.branchList[index] = response.responseData;
                this.branchList[index].isPreview = true;
                this.branchList[index].branchManagers = this.branchList[index].branchManagers.filter(elem => elem.status);
            }
        })
    }

getreportingbranchBybranchId(branchId){
    debugger
     this.$spinner.show();
     this.$branchService.getBranchTypeByBranchId(branchId).subscribe(response => {
          this.$spinner.hide();
            this.reportingBranchList = response;
        },err=>{
             this.$spinner.hide();
        })
}
    pincodeSearchModalOpen() {
        let dialogModal = this.dialog.open(PincodeSearchComponent, {
            width: '20vw',
            panelClass: 'mdmDialog'
        })

        dialogModal.afterClosed().subscribe(response => {
            
            if (!response) {
                return;
            }
            this.branchObj.pincodeId = response.id;
            this.pincode = response.pincode;
        })
    }

    manageBranchMasterModalOpen() {
        let dialogObj = this.dialog.open(ManageBranchMasterComponent, {
            width: '35vw',
            panelClass: 'mdmDialog',
            data: [...this.featuresList]
        })

        dialogObj.afterClosed().subscribe(response => {
            if (!response) {
                return;
            }

            this.featuresList.concat(response);

        })
    }

    deleteModalOpen() {
        let dialogRef = this.dialog.open(DeleteModalComponent, {
            width: '25vw',
            panelClass: 'mdmDialog',
            data: { "heading": "Branch", "title": this.branchObj.branchName }
        })

        dialogRef.afterClosed().subscribe((response: any) => {

            if (response && response != 'cancel') {
                this.submitManageMaping();
            }
        })
    }

    checkForExpiryDate(effectiveDate) {

        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        if (this.branchObj.expiryDate) {
            this.branchObj.expiryDate = moment(this.branchObj.expiryDate).format("YYYY-MM-DD");
        }
        if (this.branchObj.effectiveDate) {
            this.branchObj.effectiveDate = moment(this.branchObj.effectiveDate).format("YYYY-MM-DD");
        }
        if (this.branchObj.expiryDate > effectiveDate && this.branchObj.expiryDate > todayDate) {
            this.isVar = false;
        }
        else if (!this.branchObj.branchId) {
            this.isVar = true;
        }
        if (effectiveDate < todayDate) {
            return this.expiryMinDate = todayDate;
        }
        return this.expiryMinDate = moment(effectiveDate, 'YYYY-MM-DD').add(1, "d").format('YYYY-MM-DD');

    }

    removeMinDate(effectiveDate) {
        this.$common.setExpiryDate(effectiveDate, this.isInactive);
    }

    changeDateFormat(effectiveDate, expDt) {
        console.log(effectiveDate)
        this.isVar = true;

        if (effectiveDate) {
            this.branchObj.effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        }
        if (expDt) {
            this.branchObj.expiryDate = moment(expDt).format('YYYY-MM-DD');
        }

        this.checkForExpiryDate(effectiveDate)
    }


    clearMaxValue(minValue, maxValue2, index) {
        this.featuresList[index].isInvalid = false;
        if (parseFloat(minValue) > parseFloat(maxValue2)) {
            this.featuresList[index].upperVal = '';
            this.featuresList[index].isInvalid = true;
        }
    }

    initialActive = false;

    checkForDisableStatus() {

        if (this.initialActive) {
            return false;
        }

        if (!this.branchObj.status && this.branchObj.branchId) {
            return true;
        }

        if (!this.branchObj.status && !this.branchObj.branchId) {
            return true;
        }

    }

    viewBranchAdvanceSearch(type = null) {

        let dialogModal = this.dialog.open(BranchAdvanceSearchComponent, {
            width: '25vw',
            panelClass: 'mdmDialog',
            data: { 'branchTypes': this.typesList, 'searchCriteria': this.searchObj.searchCriteria }
        })

        dialogModal.afterClosed().subscribe(response => {

            if (!response) {
                return;
            }
            if (type == 'branchPinList' || type == 'branchList') {
                this.page = 1;
                this.branchList = this.branchList.filter(elem => elem.branchId == response.branchId)
                this.searchObj.searchValue = response.branchName
            }
        })
    }


    setFullAddress(index, element) {

        if (index == null) {
            return;
        }

        if (this.branchList[index].fullAddress) {
            return;
        }

        let fullAddress = this.branchList[index].address

        if (element.city) {
            fullAddress = `${fullAddress} , ${element.city.cityName}`;
        }
        if (element.city.district) {
            fullAddress = `${fullAddress} , ${element.city.district.districtName}`;
        }
        if (element.city.district.state) {
            fullAddress = `${fullAddress} , ${element.city.district.state.stateName}`;
        }
        this.branchList[index].fullAddress = fullAddress;
    }


}
