import { GeographyService } from 'src/app/services/geography.service';
import { OrganizationService } from './../../services/organization.service';
import { Organization } from './../../Models/organization';
import { Country } from './../../Models/country';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditOrganisationComponent } from 'src/app/modals/edit-organisation/edit-organisation.component';
import { AddCountryComponent } from 'src/app/modals/add-country/add-country.component';
import { AppComponent } from './../../app.component';

import { CountryService } from 'src/app/services/country.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from 'src/app/services/authorisation.service';

@Component({
    selector: 'app-add-organisation',
    templateUrl: './add-organisation.component.html',
})
export class AddOrganisationComponent implements OnInit {

    constructor(public dialog: MatDialog, private appComp: AppComponent,
        private $geo: GeographyService, private $organization: OrganizationService,
        private $country: CountryService, private spinner: NgxSpinnerService, private AuthorizationService: AuthorizationService,
        private permissionsService: NgxPermissionsService) { }

    ngOnInit() {

        this.getOrganizations();
        this.getLineOfBussiness();
        this.getCountries();
        this.permissionsService.loadPermissions(this.AuthorizationService.getPermissions('GEOGRAPHY', 'ORGANISATION'));
    }
    checkedObj = {} as any
    addOrganisation;
    countryNameSearchCtrl=<string>'';
    isorgNameChacked = <boolean>true;
    inActiveFlag = <boolean>false;
    isSelected = <boolean>false;
    organisationName;
    organisationList: Array<any> = [];
    editObj;
    abc = {} as any;
    num = 0;
    addOrgObj = {
        status: 1,
        orgLobMap: []
    } as Organization;
    countryList: Array<Country>;
    bussinessLine: any;
    orgName: string;
    p = 1;
    lobIsRequired = true;

    // getPermission() {
    //
    //     var a = this.$app.getPermissions("GEOGRAPHY");
    //     if (a.permissions) {
    //         this.permissionOperandList = a.permissions;
    //         this.permissionOperandList.forEach(elem => {
    //             if (elem.permissionId == 1) {
    //                 this.createHide = true;
    //                 this.UpdateHide = true;
    //             }
    //             if (elem.permissionId == 2 || elem.permissionId == 1) {
    //                 this.createHide = true;
    //             }

    //         })
    //     }
    // }

    listBusiness(type, event) {

        if (!this.addOrgObj.orgLobMap) {
            this.addOrgObj.orgLobMap = [];
        }

        if (event.checked) {
            let index = this.addOrgObj.orgLobMap.findIndex(elem => elem.lkpLobId == type.id);
            if (index == -1) {
                // type.status = 1;
                var dsd = {
                    "lkpLobId": type.id,
                    "status": 1,
                    "descr": type.descr
                }

                this.addOrgObj.orgLobMap.push(dsd);
            } else {
                this.addOrgObj.orgLobMap[index].status = 1;
            }
            this.isSelected = true;
            this.isorgNameChacked = true;

        } else {
            let index = this.addOrgObj.orgLobMap.findIndex(elem => elem.lkpLobId == type.id);
            if (this.addOrgObj.orgLobMap[index].id) {
                this.addOrgObj.orgLobMap[index].status = 0;
            } else {
                this.addOrgObj.orgLobMap.splice(index, 1);
            }
            this.num = 0;
            this.addOrgObj.orgLobMap.map(elem => {
                if (elem.status == 0) {
                    this.num = this.num + 1;
                }
            })
            if (this.addOrgObj.orgLobMap.length == this.num) {
                this.isSelected = false;
            }

        }

        if (this.addOrgObj.orgLobMap.length == 0) {
            this.lobIsRequired = true;
        } else {
            let activeStatuList = this.addOrgObj.orgLobMap.filter(elem => elem.status);
            if (activeStatuList.length == 0) {
                this.lobIsRequired = true;
            } else {
                this.lobIsRequired = false;
            }
        }




        // if (event.checked) {
        //     if (this.addOrgObj.id) {
        //         let index = this.addOrgObj.orgLobMap.findIndex(elem => elem.lkpLobId == type.id);
        //         if (index == -1) {
        //             let val = this.bussinessLine.find(elem => elem.id == type.id);
        //             val.status = 1;
        //             val.lkpLobId = val.id;
        //             delete val.id;
        //             this.addOrgObj.orgLobMap.push(val);
        //         } else {
        //             this.addOrgObj.orgLobMap[index].status = 1;
        //         }
        //     }
        //     else {
        //         let data = {
        //             "lkpLobId": type.id,
        //             "status": 1,
        //             "descr": type.lookupVal
        //         }
        //         this.addOrgObj.orgLobMap.push(data);
        //     }
        // } else {
        //     let index = this.addOrgObj.orgLobMap.findIndex(elem => elem.lkpLobId == type.id);
        //     this.addOrgObj.orgLobMap[index].status = 0;
        // }
    }
    wercountryId: any;
    getLineOfBussiness() {

        this.$geo.getLoadData().subscribe(response => {
            // this.bussinessLine = response.referenceData.lineOfBusiness
            if (response.referenceData) {
                this.bussinessLine = response.referenceData.lineOfBusiness;
                // this.bussinessLine.map(elem => elem.lkpLobId = elem.id);
                // for (let index = 0; index < this.bussinessLine.length; index++) {
                //     this.bussinessLine[index].lkpLobId = this.bussinessLine[index].id;
                // delete this.bussinessLine[index].id;

                // }
            } else {
                this.bussinessLine = response.lineOfBusiness
            }
        })
    }

    getOrganizations() {

        this.spinner.show();

        this.$organization.getAll().subscribe(response => {
            this.organisationList = response.responseData;
            this.spinner.hide();

        })
    }

    getOrganizationDetails(orgId, i) {
        this.$organization.getDetailsById(orgId).subscribe(response => {

            let data = response.responseData;
            if (data.orgLobMap) {
                this.addOrgObj.orgLobMap = data.orgLobMap
            }
        })
    }

    isChecked(line) {

        if (!this.addOrgObj || !this.addOrgObj.orgLobMap) return;

        let index = this.addOrgObj.orgLobMap.findIndex(elem => elem.lkpLobId == line.id && elem.status == 1);

        if (index != -1) {
            return true;
        }
        return false;

    }
    varName: any;
    addOnClick(orgName) {
        this.varName = orgName;
        this.addOrganisation = true;
        this.submitPermission = false;
    }

    strLengthValid: boolean = false;
    searchOrg(str) {
        let strlength = str.target.value.length;
        if (strlength > 2 && str.target.value) {
            this.strLengthValid = false;
            this.spinner.show();
            this.p = 1;
            if (!this.orgName || this.orgName.trim() == "") {
                return this.getOrganizations();

            }

            this.$organization.searchOrg(this.orgName).subscribe(response => {
                this.organisationList = response.responseData;
                if (!this.organisationList.length) {
                    this.appComp.showMessage(`Record doesn't exist in Propel-I`, "danger");
                }
                this.spinner.hide();
            })
        } else {
            this.strLengthValid = true;
        }

    }
    clearSearch() {
        if (!this.orgName || this.orgName == '') {
            return this.getOrganizations();
        }
    }
    getCountries() {

        this.$country.getAll().subscribe(response => {
            this.countryList = response.responseData;
            this.countryList.map(elem => {
                elem.nameWithStatus = `${elem.countryName}`;
            })
            this.countryList = this.countryList.sort((a, b) => a.countryName.localeCompare(b.countryName))
        })
    }

    deleteOrg(index) {

        let deleteData = this.organisationList[index];
        deleteData.status = 0;
        this.$organization.updateOrg(deleteData).subscribe(response => {
            this.organisationList.splice(index, 1);
        })
    }

    updateDetails() {
        this.$organization.updateOrg(this.addOrgObj).subscribe(response => {

            // this.organisationList.splice(index, 1);
        })
    }
    submitPermission: boolean = true;

    editOrganization(organisationObj, i, type) {
        if (type == 0) {
            this.submitPermission = false;
        }
        else {
            this.submitPermission = true;
        }
        this.addOrgObj = { ...organisationObj };
        this.addOrganisation = true
        this.getOrganizationDetails(organisationObj.id, i)
        this.inActiveStatus();
    }

    openOrganisationDialog() {
        this.dialog.open(EditOrganisationComponent, {
            height: '400px',
            panelClass: 'mdmDialog',
            width: '70vw',
        });


    }
    openCountryDialog() {

        let country = this.countryList.find(elem => elem.id == this.addOrgObj.countryId)

        let dialog = this.dialog.open(AddCountryComponent, {
            panelClass: 'mdmDialog',
            width: '70vw',
            data: country ? country : { type: this.varName }
        });
        dialog.afterClosed().subscribe(response => {

            if (response === true) {
                return;
            }

            if (response) {
                this.countryList.push(response);
                this.addOrgObj.countryId = response.id;
                this.appComp.showMessage(`${response.countryName} Is Added`);
            }
        })
    }

    openDeleteDialog(deleteObj, index) {

        let dialogRef = this.appComp.openDeleteDialog(
            "Organization",
            deleteObj.orgName
        );
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.deleteOrg(index);

            }
        });
    }

    openEditOrganisationDialog() {

        this.dialog.open(EditOrganisationComponent, {
            width: '70vw',
            panelClass: 'mdmDialog'
        });
    }


    saveOrganisation() {

        this.lobIsRequired = false;
        if (this.addOrgObj.orgLobMap.length == 0) {
            this.lobIsRequired = true;
            return;
        } else {
            let activeStatuList = this.addOrgObj.orgLobMap.filter(elem => elem.status);
            if (activeStatuList.length == 0) {
                this.lobIsRequired = true;
                return;
            }
        }
        this.spinner.show();
        this.$organization.addOrg(this.addOrgObj).subscribe(response => {
            if (!this.addOrgObj.id) {
                // this.addOrgObj.id = response.id
                // this.organisationList = response;
                this.appComp.showMessage(`${this.addOrgObj.orgName} Is Added`);
            } else {
                this.appComp.showMessage(`${this.addOrgObj.orgName} Is Updated`);
            }

            // this.spinner.hide();
            setTimeout(() => {
                this.addOrgObj = {
                    status: 1
                } as Organization;
                this.addOrganisation = false;
                this.getOrganizations();
            }, 1000);
        })


    }

    inActiveStatus() {

        if (this.addOrgObj.status == 0) {
            this.inActiveFlag = true;
        }

    }

}
