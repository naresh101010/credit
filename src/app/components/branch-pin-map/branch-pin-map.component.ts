import { DeleteModalComponent } from 'src/app/modals/delete-modal/delete-modal.component';
import { BranchAdvanceSearchComponent } from './../../modals/branch-advance-search/branch-advance-search.component';
import { MatDialog } from '@angular/material';
import { PincodeBranchSearchComponent } from './../../modals/pincode-branch-search/pincode-branch-search.component';
import { AppComponent } from 'src/app/app.component';
import { PincodeService } from 'src/app/services/pincode.service';
import { BranchService } from './../../services/branch.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthorizationService } from 'src/app/services/authorisation.service';
import { NgxPermissionsService } from 'ngx-permissions';
import moment from 'moment';

@Component({
    selector: 'app-branch-pin-map',
    templateUrl: './branch-pin-map.component.html',
    styleUrls: ['./branch-pin-map.component.css']
})
export class BranchPinMapComponent implements OnInit {

    constructor(public dialog: MatDialog, private $branch: BranchService, private $pincode: PincodeService, private appComp: AppComponent, private spinner: NgxSpinnerService, private AuthorizationService: AuthorizationService,
        private permissionsService: NgxPermissionsService) { }
    @ViewChild("f", null) branchPinMappingForm: any;
    ngOnInit() {
        this.getBranchList();
        this.getPinMapping("''");
        this.getPinBranchLoadList();
        this.getBranchLoadList();
        // this.getPincodeList();
        this.permissionsService.loadPermissions(this.AuthorizationService.getPermissions('BRANCH', 'BRANCH'));
    }
    branchTypeSearchCtrl = <string>'';
    gateTypeSearchCtrl = <string>'';
    slabTypeSearchCtrl = <string>'';
    slabsList: Array<any> = [];
    selectedBranch;
    branchPinList: Array<any> = [];
    branchTypeList: Array<any> = [];
    branchPriorityTypes: Array<any> = [];
    branchList: Array<any> = [];
    searchBranchList: Array<any> = [];
    slabList: Array<any> = [];
    serviceOfferingList: Array<any> = [];
    branchPincodeMappings: Array<any> = [];
    branchPincodeList: Array<any> = [];
    selectedPincodeList: Array<any> = [];
    featuresList: Array<any> = [];
    pincodeList: Array<any> = [];
    selectedPincodes: Array<any> = [];
    selectedServiceOfferings: Array<any> = [];
    AllpincodeList: Array<any> = [];
    pincodeSelected: any;
    viewPinMapping = true;
    effectiveRequired = true;
    isHide = false;
    isDisabled = false;
    isPreview = false;
    searchCriteria = "branchName";
    searchValue: string;

    branchPinObj = {
        type: "BOOKING",
        status: 1
    } as any;
    page = 1;
    bookingPinObj: any = {
        branchType: 'BOOKING',
        status: 1
    };
    isSlab = 0;
    today = moment(new Date()).format("YYYY-MM-DD");
    expiryMinDate: any;
    isChange = <boolean>true;
    isChange2 = <boolean>false;
    isVar = <boolean>false;

    getBranchList() {
        
        this.$branch.getAll().subscribe(response => {
            this.branchList = response.responseData;
        })
    }
    removeDuplicate(arr, comp) {
        if (!arr) return [];
        const unique = arr.map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter((e) => arr[e]).map(e => arr[e]);


        return unique;

    }
    abc() {
        if (this.isDisabled == true || this.branchPinObj.branchId) {
            return;
        }
        else {
            this.resetForm();
        }
    }
    removeDuplicatePincode(arr) {
        if (!arr) return [];

        arr.reduce((unique, item) =>
            unique.includes(item) ? unique : [...unique, item], []);


        return arr;
    }

    // new function to get the pincodes using ids only
    // it will return  all pincode assigned to branch-pin ,we will filter all duplicate ids

    getPincodeList(branchList) {

        let singlePincodeIds=[]


        branchList.forEach(elem => {
            
            if(!elem.pincodes) return ;
            
            elem.pincodes.forEach(element => {
                let pincode = singlePincodeIds.find(elm=>elm==element)
                if(!pincode){
                    singlePincodeIds.push(element);
                }
                
            });
        });


        this.$branch.getPincodesByIds(singlePincodeIds).subscribe((response=>{
            this.AllpincodeList=response;
            this.branchPinList.forEach((elem,index)=>{
                if(!elem.pincodeNames){
                    elem.pincodeNames ='';
                    elem.pincodes.forEach(element => {
                        let pincode = response.find(elm=>elm.id==element)
                        if(!pincode) return;
                        elem.pincodeNames = elem.pincodeNames + `${pincode.pincode},`;
                    });

                    elem.pincodeNames = elem.pincodeNames.replace(/,+$/, "");
                }
            })
            setTimeout(() => {
                this.spinner.hide();
            }, 800);
        }))


    }

    // this is the previous function which is used to get all the pincodes 
    // getPincodeList() {
    //     setTimeout(() => {
    //         this.spinner2.show();
    //     }, 200);
    //     this.$branch.getAllPincode().subscribe(response => {
            
    //         this.AllpincodeList = response;
    //         this.branchPinList.forEach((elem,index)=>{
    //             if(!elem.pincodeNames){
    //                 elem.pincodeNames ='';
    //                 elem.pincodes.forEach(element => {
    //                     let pincode = this.AllpincodeList.find(elm=>elm.id==element)
    //                     elem.pincodeNames = elem.pincodeNames + `${pincode.pincode},`;
    //                 });

    //                 elem.pincodeNames = elem.pincodeNames.replace(/,+$/, "");
    //             }
    //         })
    //         setTimeout(() => {
    //             this.spinner2.hide();
    //         }, 200);
    //     })
    // }

    pincodeSearchModalOpen() {

        let dialogModal = this.dialog.open(PincodeBranchSearchComponent, {
            width: '25vw',
            panelClass: 'mdmDialog',
            data: this.pincodeList
        })

        dialogModal.afterClosed().subscribe(response => {

            if (response == true || response == undefined) {
                return;
            }
            this.pincodeList = response;
            var pincode = '';
            this.pincodeList.map(elem => {
                pincode = pincode + `${elem.pincode},`;
            })
            this.pincodeSelected = pincode.replace(/,+$/, "");
        })
    }



    getPinMapping(searchBranch) {
        this.spinner.show();
        this.$branch.getBranchPincodeMapping(searchBranch).subscribe((response: any) => {
            // setTimeout(() => {
            //     this.spinner.hide();
            // }, 1500);
            
            this.branchPinList = response.responseData;
            this.branchPinList.map(elem => elem.isVisible = false)
            this.getPincodeList(this.branchPinList)
        })
    }

    getPinBranchLoadList() {

        this.$branch.getBranchLoadPinMapping().subscribe(response => {
            
            this.slabList = response.referenceData.slabs;
            this.slabList.forEach((elem,index)=>{
                this.slabList[index].lowerUpperVal = this.slabList[index].lowerVal + '-' +this.slabList[index].upperVal
            })


            this.serviceOfferingList = response.referenceData.serviceOfferings;
            this.featuresList = response.referenceData.features;
            this.branchPriorityTypes = response.referenceData.branchPriorityTypes;

        })
    }

    getBranchLoadList() {

        this.$branch.getBranchLoad().subscribe(response => {

            let loadList = { ...response.referenceData };
            this.branchTypeList = loadList.types

        })
    }

    isChecked(line) {
        if (!this.selectedPincodeList || !this.selectedPincodeList) return;

        let index = this.selectedPincodeList.findIndex(elem => elem.id == line.id && elem.status == 1);

        if (index != -1) {
            return true;
        }
        return false;

    }


    pincodeChecked(type, event) {

        if (!this.selectedPincodeList) {
            this.selectedPincodeList = [];
        }
        if (event.checked) {

            let index = this.selectedPincodeList.findIndex(elem => elem.id == type.id);
            if (index == -1) {
                var dsd = {
                    "id": type.id,
                    "status": 1,
                    "pincode": type.pincode,
                }

                this.selectedPincodeList.push(dsd);
            } else {
                this.selectedPincodeList[index].status = 1;
            }

        } else {
            let index = this.selectedPincodeList.findIndex(elem => elem.id == type.id);
            this.selectedPincodeList.splice(index, 1);

        }

    }

    deleteConfirmation(pinObj = null, i, type) {
        
        let dialogRef = this.dialog.open(DeleteModalComponent, {
            width: '25vw',
            panelClass: 'mdmDialog',
            data: { "heading": type, "title": pinObj.pincode }
        })

        dialogRef.afterClosed().subscribe((response: any) => {

            if (response && response != 'cancel') {
                if (type == "Pincode") {
                    this.deletePincode(pinObj, i);
                } else {
                    this.deleteBranchPinList(i);
                }
            }
        })

    }

    deletePincode(pinObj = null, i) {
        
        this.pincodeList.splice(i, 1);
        let index = this.selectedPincodeList.findIndex(elem => elem.id == pinObj.id)
        if (index != -1) {
            this.selectedPincodeList.splice(index, 1);
        }
        var pincode = '';
        this.pincodeList.map(elem => {
            pincode = pincode + `${elem.pincode},`;
        })
        this.pincodeSelected = pincode.replace(/,+$/, "");
    }

    deleteBranchPinList(i) {
        this.branchPincodeList.splice(i, 1);
    }


    addNewPinMap() {
        this.isDisabled = false;
        this.viewPinMapping = false;
        this.isHide = false;
        if (this.branchPinMappingForm) {
            this.branchPinMappingForm.resetForm();
        }
        this.selectedBranch = '';
        this.selectedPincodeList = [];
        this.pincodeList = [];
        this.branchPinObj = {
            type: 'BOOKING'
        };
    }



    selectBranchObj: any;
    addbranchMappingList() {
        
        // this.isEdit = false;
        this.isVar = false;
        this.isChange2 = false;
        this.pincodeList
        
        this.pincodeList.map(elem=>{
            let isPresent = this.AllpincodeList.find(elm=>elm.id == elem.id);
            if(!isPresent){
                this.AllpincodeList.push(elem);
            }
        })

        if (!this.selectedPincodeList.length) {
            return this.appComp.showMessage(`Please Select atleast one Pincode`);
        }

        
        if (this.selectedPincodeList.length && this.isEdit == -1) {

            if (this.branchPinObj.expiryDate) {
                this.branchPinObj.expiryDate = moment(this.branchPinObj.expiryDate).format("YYYY-MM-DD");
            }
            this.branchPinObj.effectiveDate = moment(this.branchPinObj.effectiveDate).format("YYYY-MM-DD");
            this.branchPinObj.pincodes = [];
            this.selectedPincodeList.map(elem => {
                this.branchPinObj.pincodes.push(elem.id);
            })

            let isPresent = this.checkIfduplicateExists();

            if (isPresent) {
                return this.appComp.showMessage(`Branch Pin Map already exist.`, "danger");
            }

            this.branchPinObj.pincodeNames = this.pincodeTooltips(this.branchPinObj.pincodes)
            this.branchPincodeList.splice(0, 0, { ...this.branchPinObj });
            
        } else if (this.selectedPincodeList.length) {

            if (this.branchPinObj.expiryDate) {
                this.branchPinObj.expiryDate = moment(this.branchPinObj.expiryDate).format("YYYY-MM-DD");
            }
            this.branchPinObj.effectiveDate = moment(this.branchPinObj.effectiveDate).format("YYYY-MM-DD");

            this.branchPinObj.pincodes = [];
            this.selectedPincodeList.map(elem => {
                this.branchPinObj.pincodes.push(elem.id);
            })


            let index = this.isEdit
            if (this.branchPinObj.id) {
                index = this.branchPincodeList.findIndex(elem => elem.id == this.branchPinObj.id);
            }

            this.branchPinObj.pincodeNames = this.pincodeTooltips(this.branchPinObj.pincodes)
            this.branchPincodeList[index] = { ...this.branchPinObj };
            this.isEdit = -1;
            
            if (this.branchPinObj.id) {
                this.branchPinMappingForm.resetForm();
                let type = this.branchPinObj.type
                this.branchPinObj = {
                    type: type
                };
                this.selectedPincodeList = [];
                this.pincodeList.map(elem => elem.checked = 0);

            }
            else {
                this.selectedPincodeList = [];
                this.pincodeList.map(elem => elem.checked = 0);

            }

        }

    }


    checkIfduplicateExists() {
        let isPresent = false;
        if (this.branchPinObj.type == "BOOKING") {
            this.branchPincodeList.map(elem => {
                if (elem.lkpbranchType == this.branchPinObj.lkpbranchType && elem.branchId == this.branchPinObj.branchId) {
                    isPresent = true;
                }

            })
        } else {
            // section for DELIVERY VALIDATION CHECK
            this.branchPincodeList.map(elem => {
                if (elem.serviceOfferingId == this.branchPinObj.serviceOfferingId && elem.branchId == this.branchPinObj.branchId && elem.slabId == this.branchPinObj.slabId) {
                    isPresent = true;
                }
            })
        }

        return isPresent;
    }

    saveBranchPinMapping() {

        

        let selectedPincodeList = this.branchPincodeList.filter(elem => elem.checked);
        if (!selectedPincodeList.length) {
            return this.appComp.showMessage(`Please select alteast one record.`);
        }

        // selectedPincodeList.map(elem => {
        //     if (isNaN(elem.id)) {
        //         delete elem.id;
        //     }
        // })

        let saveObj: any = {
            type: this.branchPinObj.type,
            branchPincodeMappings: selectedPincodeList
        }
        // this.branchPinObj.id =editObj.id
        if (this.isHide) {
            saveObj.id = selectedPincodeList[0].branchId
        }

        this.spinner.show();
        this.$branch.savePincodeMapping(saveObj).subscribe(response => {
            
            this.spinner.hide();
            
            if (this.isHide) {
                this.appComp.showMessage(`Branch To Pin Mapping Is Updated`);
            }else{
                   response.map(elem => {
                    let index = this.branchPinList.findIndex(elm => elm.id == elem.id);
                    if (index == -1) {
                        this.branchPinList.push(elem)
                    }
                })
                this.appComp.showMessage(`Branch To Pin Mapping Is Added`);
            }

            setTimeout(() => {
                this.branchPincodeList = [];
                this.pincodeList = [];
                this.branchPinMappingForm.resetForm();
                this.branchPinObj = {};
                this.page = 1;
                this.getPinMapping("''");
                this.viewPinMapping = true;
            }, 1000);
        })
    }

    checkForSelectItem(o1, o2) {
        if (o2) {
            return o1 === o2;
        }
    }

    editBranchPinList(index, pinObj) {
        
        this.isEdit = index;
        // this.pincodeList=[];
        // this.selectedPincodeList=[];
        // this.resetForm();
        if (pinObj.effectiveDate < this.today) {
            this.isChange2 = true;
        }
        this.branchPinObj = { ... this.branchPincodeList[index] };
        let branch = this.branchList.find(elem => elem.branchId == this.branchPinObj.branchId)
        if (branch) {
            this.selectedBranch = branch.branchName
        }

        if (this.branchPinObj.pincodes) {
            this.pincodeList.map(elem => elem.checked = false)
            this.branchPinObj.pincodes.map(elem => {
                let pincode = this.AllpincodeList.find(elm => elm.id == elem);
                if (pincode) {
                    // let cityName = this.cityNames.find(obj => obj.id == pincode.id)
                    let index = this.pincodeList.findIndex(elm => elm.pincode == pincode.pincode);
                    let selectedIndex = this.selectedPincodeList.findIndex(elm => elm.pincode == pincode.pincode)
                    if (index == undefined || index == -1) {
                        pincode.checked = true;
                        pincode.cityName = pincode.city ? pincode.city.cityName : null;
                        this.pincodeList.push(pincode);
                        this.selectedPincodeList.push(pincode);
                    }
                    else {
                        // pincode.checked = true;
                        // this.pincodeList[index] = pincode;
                        this.pincodeList[index].checked = true;
                        if (selectedIndex == -1 || selectedIndex == undefined) {
                            this.selectedPincodeList.push(pincode);
                        }
                        else {
                            this.selectedPincodeList[selectedIndex] = pincode;
                        }

                    }
                }
            })
        }

        let pincode = '';
        this.pincodeList.map(elem => {
            pincode = pincode + `${elem.pincode},`;
        })

        this.pincodeSelected = pincode.replace(/,+$/, "");

        this.getPinBranchDetails(this.branchPinObj.type, this.branchPinObj.branchId);

    }

    clearSearch() {
        this.searchValue = '';
        this.getPinMapping("''");
    }

    editPinBranch(editObj, i) {
        
        this.viewPinMapping = false;
        this.isHide = true;
        this.branchPinObj.type = editObj.type
        this.searchValue = '';
       
        this.isDisabled = true;
        editObj.checked = true;
        this.branchPincodeList = [];
        
        this.branchPincodeList.push(editObj);
    }


    getPinBranchDetails(branchType, branchId) {

        // this.$branch.getPinBranchDetails(branchType,branchId).subscribe((response)=>{

        // this.branchPinObj = response[0]
        // })

    }

    isEdit = -1;
    viewBranchPin(index = null) {

        this.branchPinList.map((elem, i) => {
            if (index != i) {
                elem.isVisible = false
            }
        })
        this.branchPinList[index].isVisible = !this.branchPinList[index].isVisible;
    }

    checkDisable(branchId) {

        if (!branchId) return false;

        if (typeof (branchId) == "string") {
            return false;
        }
        return true;

    }

    viewBranchAdvanceSearch(type = null) {
        let dialogModal = this.dialog.open(BranchAdvanceSearchComponent, {
            width: '50vw',
            panelClass: 'mdmDialog',
            data: { 'priorityTypes': this.branchPriorityTypes, 'branchTypes': this.branchTypeList, 'searchCriteria': this.searchCriteria }
        })

        dialogModal.afterClosed().subscribe(response => {

            if (!response) {
                return;
            }

            if (type == 'branchPinList') {
                this.page = 1;
                this.branchPinList = this.branchPinList.filter(elem => elem.branchId == response.branchId)
                this.searchValue = response.branchName;
            } else {
                this.selectedBranch = response.branchName;
                this.branchPinObj.branchId = response.branchId;
            }
        })
    }



    checkForExpiryDate(effectiveDate) {

        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        if (this.branchPinObj.expiryDate) {
            this.branchPinObj.expiryDate = moment(this.branchPinObj.expiryDate).format("YYYY-MM-DD");
        }
        if (this.branchPinObj.effectiveDate) {
            this.branchPinObj.effectiveDate = moment(this.branchPinObj.effectiveDate).format("YYYY-MM-DD");
        }
        if (this.branchPinObj.expiryDate > effectiveDate && this.branchPinObj.expiryDate > todayDate) {
            this.isVar = false;
        }
        else if (!this.branchPinObj.branchId) {
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

        this.isVar = true;

        if (effectiveDate) {
            this.branchPinObj.effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        }
        if (expDt) {
            this.branchPinObj.expiryDate = moment(expDt).format('YYYY-MM-DD');
        }

        this.checkForExpiryDate(effectiveDate)
    }


    pincodeTooltips(pincodes) {
        let name = '';
        pincodes.map(elem => {
            let pincodeObj = this.AllpincodeList.find(elm => elm.id == elem)
            if(!pincodeObj) return ;
            name += `${pincodeObj.pincode},`
        })

        return name.replace(/,\s*$/, "");
    }

    resetForm() {
        this.isVar = false;
        this.pincodeList = [] as any;
        this.branchPinMappingForm.resetForm();
    }

}
