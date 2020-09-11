import { Component, OnInit, ViewChild } from '@angular/core';
import { NotePadService } from '../services/natepad.service';
import moment from 'moment';
import { MatDialog } from '@angular/material';
import { AppComponent } from '../app.component';
import { EditNotepadComponent } from '../modals/edit-notepad/edit-notepad.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthorizationService } from '../services/authorisation.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { debug } from 'util';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-notepad',
    templateUrl: './notepad.component.html',
    styleUrls: ['./notepad.component.css']
})
export class NotepadComponent implements OnInit {

    constructor(
        private $notepad: NotePadService,
        public dialog: MatDialog,
        private appComp: AppComponent,
        private datePipe: DatePipe,
        private spinner: NgxSpinnerService, private AuthorizationService: AuthorizationService,
        private permissionsService: NgxPermissionsService
    ) { }

    @ViewChild("f", null) form: any;
    userName = JSON.parse(sessionStorage.getItem("all")).data.responseData.user.username;
    //start Greeting Message
greeting(){
    let myDate = new Date();
    let hrs = myDate.getHours();
    let greet;
    if (hrs < 12)
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';

        return greet
  }
  //End Greeting Message
    ngOnInit() {
        this.NotepadComp = NotepadComponent;
        this.permissionsService.loadPermissions(this.AuthorizationService.getPermissions('NOTEPAD', 'NOTEPAD'));
        this.getModule();
        this.getAllAttributeValueValue();

    }
    notepadModuleNameSearchCtrl = <string>'';
    attributeNameSearchCtrl = <string>'';
    notepadEntityNameSearchCtrl = <string>'';

    selected = '0';
    NotepadComp;

    notepadEntityList: Array<any> = [];
    notepadList: Array<any> = [];
    notepadModuleList: Array<any> = [];
    notepadmoduleByEntityList: Array<any> = [];
    AttributeList: Array<any> = [];
    notepadObj = <any>{
        status: 1
    };
    p: number = 1;
    module = {} as any;
    moduleobj = {} as any;
    moduleEntity = {} as any;
    moduleId;
    // moduleEntityId = {} as any;
    disabledBtn;
    addNotepad;
    allNotepad;
    notepadDetails;
    showtext;
    viewNotepad;
    showNotepadDetails;
    hidenotepad;
    NotepadTable;
    isNotValid = false;
    inboundClick = <boolean>false;
    addtext = <boolean>false
    today = moment(new Date()).format("YYYY-MM-DD");
    showtest = <boolean>false;
    isDisabledAttributeType = <boolean>true
    hideNotepadTable = <boolean>false;
    getModule() {

        this.spinner.show();
        this.$notepad.getAllModule().subscribe(response => {
            this.notepadModuleList = response;
            this.spinner.hide();
        })
    }

    onLoad(){
        this.getModule();

        this.addNotepad=false;
        this.hideNotepadTable=false;
        this.moduleobj={};
    }

    getAttributeIdentifier() {
        this.notepadObj.attributeValue = '';
        this.notepadObj.attributeIdentifier = '';
        this.isDisabledAttributeType = true;
        this.isNotValid = false;
        if (this.notepadObj.attributeTypeId) {
            this.AttributeList.forEach(elem => {
                if (this.notepadObj.attributeTypeId == elem.id) {
                    this.notepadObj.attributeIdentifier = elem.descr;
                    if (elem.descr == "RADIO BUTTON" || elem.descr == "DROP DOWN") {
                        this.isDisabledAttributeType = false;
                    }
                }
            })

        }
    }
    abc;
    saveNotePad() {

        if (this.notepadObj.attributeTypeId) {
            this.isNotValid = false;
            this.AttributeList.forEach(elem => {
                if (this.notepadObj.attributeTypeId == elem.id) {
                    this.abc = elem.descr;
                }
            })
            if (this.abc == "RADIO BUTTON" || this.abc == "DROP DOWN") {
                if (this.notepadObj.attributeValue) {
                    var n = this.notepadObj.attributeValue.search(",");
                    if (n == -1) {
                        return this.isNotValid = true;
                    }
                }
                else if (this.notepadObj.attributeValue == '' || this.notepadObj.attributeValue == undefined) {
                    return this.isNotValid = true;
                }
            }
        }
        this.spinner.show();
        this.notepadObj.notepadOrder = 12;
        this.notepadmoduleByEntityList.forEach(elem => {
            if (elem.entityId == this.moduleobj.moduleEntityId.entityId) {
                this.notepadObj.moduleEntityMapId = elem.entityId;
            }
        })
        this.notepadObj.effectiveDate = moment(this.notepadObj.effectiveDate).format("YYYY-MM-DD");
        if (this.notepadObj.expiryDate) {
            this.notepadObj.expiryDate = moment(this.notepadObj.expiryDate).format("YYYY-MM-DD");
        }
        let notepadObj = { ...this.notepadObj };
        this.notepadObj.moduleEntityMapId = this.moduleobj.moduleEntityId.entityId;
        this.$notepad.saveAllNotePad(this.notepadObj).subscribe(response => {

            if (!this.notepadObj.id) {
                this.notepadObj.id = response;
                this.notepadList.splice(0, 0, this.notepadObj);
                // this.notepadEntityList.splice(0, 0, this.notepadObj);
                this.appComp.showMessage(`Notepad Is Created`);
            }
            // else {
            //     this.notepadList = this.notepadList.map(elem => {
            //         if (elem.id == this.notepadObj.id) {
            //             elem = this.notepadObj;
            //         }
            //         return elem;

            //     })

            //     this.appComp.showMessage(`NOTEPAD IS UPDATED`);
            // }
            this.getEntityListByModuleValue(this.notepadObj.moduleEntityMapId, "update")
            setTimeout(() => {
                this.addNotepad = false;
                this.addtext = true;
                this.notepadObj = {};
                this.isDisabledAttributeType = true;
                this.spinner.hide();

                // this.getEntityTableByModuleValue();
            }, 1000);
        });
    }

    getNotepad() {

        this.addNotepad = false;
        this.notepadDetails = true;
        this.allNotepad = true;
        this.showtext = true;
        this.addtext = true;
    }
    addNewNotepad() {

        this.addNotepad = true;
        this.notepadDetails = false;
        this.allNotepad = true;
        this.showtext = true;
    }
    showNotePadTable() {

        this.notepadObj = {};
        this.notepadObj.status = 1;
        this.addNotepad = true;
        this.notepadDetails = false;
        this.isNotValid = false;
        this.showtext = true;
        this.allNotepad = false;
        this.showtext = true;
        this.addtext = !this.addtext;
        this.notepadObj.status = 1;
    }

    editNotepadData(obj = null) {

        let data = {
        }

        data = { ...obj };
        let dialog = this.dialog.open(EditNotepadComponent, {
            width: '70vw',
            panelClass: 'mdmDialog',
            data: data,
        });

        dialog.afterClosed().subscribe(response => {
            if (response === true) {
                return;
            }
            if (response) {
                let index = this.notepadList.findIndex(elem => elem.id == response.id);
                this.notepadList[index] = response;
                this.notepadObj.id = response.id;
                if (response.status == 0) {
                    this.appComp.showMessage(`${response.notepadName} Is Deleted`);

                } else {
                    this.appComp.showMessage(`${response.notepadName} Is Updated`);
                }
                return this.getEntityListByModuleValue(response.moduleEntityMapId, "update")
            }
        })
    }

    isChange=true;

    viewNotepadList(index = null) {
        this.notepadList.forEach((elem,i) => {
            if(index!=i){
                elem.isVisible = false
            }
        })
        this.notepadList[index].isVisible = !this.notepadList[index].isVisible;
        // if (this.inboundClick == false) {
        //     this.notepadList.map(elem => elem.isVisible = false)
        //     this.notepadList[index].isVisible = !this.notepadList[index].isVisible;
        //     this.inboundClick = !this.inboundClick;
        // }
        // else {
        //     this.notepadList[index].isVisible = !this.notepadList[index].isVisible;
        // }

    }


    textCheck(){

        if (this.notepadObj.attributeValue) {
            var n = this.notepadObj.attributeValue.search(",");
            if (n == -1) {
                return this.isNotValid = true;
            }
            else{
                return this.isNotValid = false;
            }
        }
    }
    getEntityByModuleValue(moduleId) {

        this.spinner.show();
        this.hideNotepadTable = false;
        this.addNotepad = false;
        this.notepadList = [];
        this.notepadEntityList = [];
        this.notepadmoduleByEntityList = [];
        this.moduleobj.moduleEntityId = '';
        this.addtext = false;
        this.$notepad.getByModuleId(moduleId.id).subscribe(response => {
            if (response) {
                this.notepadmoduleByEntityList = response;
            }
            else {
                this.notepadmoduleByEntityList = [];
            }
            this.spinner.hide();
        })
    }

    getAllAttributeValueValue() {

        this.$notepad.getAttributeType().subscribe(response => {
            this.AttributeList = response;
        })
    }


    getEntityListByModuleValue(moduleEntityId = null, type = null) {

        this.hideNotepadTable = false;
        this.addNotepad = false;
        this.addtext = true;
        this.notepadList = [];
        this.spinner.show();
        if (moduleEntityId.entityId) {
            moduleEntityId = moduleEntityId.entityId;
        }
        else{
            moduleEntityId = moduleEntityId;
        }
        this.$notepad.getByModuleEntityId(moduleEntityId).subscribe(response => {
            this.notepadEntityList = response;
            this.spinner.hide();
            if (type == "update") {
                return this.getEntityTableByModuleValue();
            }
        })

    }



    getUpdatedEntityList(moduleEntityId) {

        this.addNotepad = false;
        this.addtext = true;
        this.notepadList = [];
        this.spinner.show();
        this.$notepad.getByModuleEntityId(moduleEntityId.entityId).subscribe(response => {
            this.notepadEntityList = response;
            this.spinner.hide();
        })
    }


    getEntityTableByModuleValue() {

        this.hideNotepadTable = true;
        if (this.notepadEntityList.length) {
            this.notepadList = this.notepadEntityList;
            this.p = 1;
            this.notepadList.forEach(elem => elem.isVisible = false);
        }
        else {
            this.appComp.showMessage(`Record Doesn't Exist In Propel-I`, "danger");
        }
    }



    expiryMinDate: any;
    isVar = <boolean>true;
    checkForExpiryDate(effectiveDate) {

        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        if(this.notepadObj.expiryDate){
            this.notepadObj.expiryDate=moment(this.notepadObj.expiryDate).format('YYYY-MM-DD')
        }
        if(this.notepadObj.effectiveDate){
            this.notepadObj.effectiveDate=moment(this.notepadObj.effectiveDate).format('YYYY-MM-DD')
        }
        if (this.notepadObj.expDt > effectiveDate && this.notepadObj.expDt > todayDate) {
            this.isVar = false;
        }
        else if (!this.notepadObj.id) {
            this.isVar = true;
        }

        // if (effectiveDate > this.notepadObj.expDt && this.notepadObj.expDt > todayDate) {
        //     this.isVar = false;
        // }
        if (effectiveDate < todayDate) {
            return this.expiryMinDate = todayDate;
        }
        return this.expiryMinDate = moment(effectiveDate, 'YYYY-MM-DD').add(1, "d").format('YYYY-MM-DD');

    }

    removeMinDate(effectiveDate) {
        this.expiryMinDate = moment(effectiveDate).format('YYYY-MM-DD');
    }

    changeDateFormat(effectiveDate, expiryDate) {
        console.log(effectiveDate)
        this.isVar = true;

        if (effectiveDate) {
            this.notepadObj.effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        }
        if (expiryDate) {
            this.notepadObj.expDt = moment(expiryDate).format('YYYY-MM-DD');
        }

        this.checkForExpiryDate(effectiveDate)
    }

}
