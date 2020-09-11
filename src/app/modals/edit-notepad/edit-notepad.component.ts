import { CommonService } from './../../services/common.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { NotePadService } from 'src/app/services/natepad.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-edit-notepad',
    templateUrl: './edit-notepad.component.html',
})
export class EditNotepadComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<EditNotepadComponent>,
        private $notepad: NotePadService,
        private datePipe: DatePipe,
        private spinner: NgxSpinnerService,
        public dialog: MatDialog,
        private $common: CommonService
    ) { }


    ngOnInit() {

        this.notepadObj = { ... this.data }
        this.notepadObj.effectiveDate = moment(this.notepadObj.effectiveDate).format("YYYY-MM-DD");
        if (this.notepadObj.expiryDate) {
            this.notepadObj.expiryDate = moment(this.notepadObj.expiryDate).format("YYYY-MM-DD");
        }

        if (this.notepadObj.status == 0 && this.notepadObj.expiryDate < this.currentDate) {
            this.isInactive = true;
            this.isVar = false;
            this.expiryMinDate = this.currentDate;
        }
        else {
            this.isInactive = false;
        }

        if (this.notepadObj.status == 0) {
            this.xyz = false;
        }
        if (this.data.attributeIdentifier == "RADIO BUTTON" || this.data.attributeIdentifier == "DROP DOWN") {
            this.isDisabledAttributeType = false;
        }
        else {
            this.isDisabledAttributeType = true;
        }
        this.isVar = false;
        this.getAllAttributeValueValue();
        this.today = this.notepadObj.effectiveDate;
        this.inActiveStatus();
    }
    @ViewChild("f", null) notePadForm: any;
    attributeNameSearchCtrl = <string>'';
    notepadObj = {} as any;
    isNotValid = <boolean>false;
    isDisabledAttributeType = <boolean>false;
    isInactive = <boolean>false;
    inActiveFlag = <boolean>false;
    abc;
    isChange = <boolean>true;
    show = <boolean>true;
    xyz = <boolean>true;
    AttributeList: Array<any> = [];
    today = new Date() as any;
    isVar = <boolean>true;
    currentDate = moment(new Date()).format("YYYY-MM-DD");
    getAllAttributeValueValue() {

        this.$notepad.getAttributeType().subscribe(response => {
            this.AttributeList = response;
        })
    }

    textCheck() {

        if (this.notepadObj.attributeValue) {
            var n = this.notepadObj.attributeValue.search(",");
            if (n == -1) {
                return this.isNotValid = true;
            }
            else {
                return this.isNotValid = false;
            }
        }
    }
    saveNotepad() {

        if (this.xyz == false) {
            if (this.notepadObj.status == 0) {
                this.show = false;
                return;
            }
            else {
                this.show = true;
            }
        }
        if (this.notepadObj.status === 0) {
            let dialog = this.dialog.open(DeleteModalComponent, {
                width: '35vw',
                panelClass: 'mdmDialog',
                data: { title: this.notepadObj.countryName, heading: "Notepad" }
            });

            dialog.beforeClose().subscribe(response => {
                if (response === true) {
                    this.submitData();

                }
            })

        } else {
            this.submitData()
        }


    }

    removevalidText(status) {
        if (status == 1) {
            this.show = true;
        }
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
    submitData(type = null) {
        // this.notepadObj.effectiveDate = moment(this.notepadObj.effectiveDate).format("DD-MM-YYYY HH:mm:ss");
        // if (this.notepadObj.expiryDate) {
        //     this.notepadObj.expiryDate = moment(this.notepadObj.expiryDate).format("DD-MM-YYYY HH:mm:ss");
        // }

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
                else if (this.notepadObj.attributeValue == "" || this.notepadObj.attributeValue == undefined) {
                    return this.isNotValid = true;
                }
            }
        }
        if (this.notepadObj.effectiveDate) {
            this.notepadObj.effectiveDt = moment(this.notepadObj.effectiveDt).format("YYYY-MM-DD");
        }
        if (this.notepadObj.expiryDate) {
            this.notepadObj.expiryDate = moment(this.notepadObj.expiryDate).format("YYYY-MM-DD");
        }
        this.spinner.show();
        this.$notepad.updateNotepad(this.notepadObj).subscribe(response => {
            //  this.notePadForm.submitted = false;
            this.notepadObj.id = response;
            let notepadObj = { ...this.notepadObj };
            this.dialogRef.close(notepadObj);
            // this.notePadForm.reset();
            this.spinner.hide();
        })
    }

    inActiveStatus() {
        if (this.notepadObj.status == 0) {
            this.inActiveFlag = true;
        }
    }

    expiryMinDate: any;

    checkForExpiryDate(effectiveDate) {

        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        if (this.notepadObj.expiryDate <= effectiveDate && (!this.notepadObj.id || this.notepadObj.expiryDate <= effectiveDate)) {
            this.isVar = true;
        }
        else {
            this.isVar = false;
        }
        if (this.notepadObj.effectiveDate) {
            this.notepadObj.effectiveDate = moment(this.notepadObj.effectiveDate).format('YYYY-MM-DD');
        }
        if (this.notepadObj.expiryDate) {
            this.notepadObj.expiryDate = moment(this.notepadObj.expiryDate).format('YYYY-MM-DD');
        }
        if (effectiveDate < todayDate) {
            return this.expiryMinDate = todayDate;
        }
        return this.expiryMinDate = moment(effectiveDate, 'YYYY-MM-DD').add(1, "d").format('YYYY-MM-DD');

    }

    removeMinDate(effectiveDate) {
        this.$common.setExpiryDate(effectiveDate, this.isInactive)
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
