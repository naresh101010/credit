import { DeleteModalComponent } from './../delete-modal/delete-modal.component';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from "@angular/material";

@Component({
    selector: 'app-rr-value',
    templateUrl: './rr-value.component.html',
    styleUrls: ['./rr-value.component.css']
})
export class RrValueComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog, public dialogRef: MatDialogRef<RrValueComponent>) { }
    @ViewChild("f", null) rrform: NgForm;
    @ViewChild("fromReq", null) fromReq: any;
    @ViewChild("toReq", null) toReq: any;
    ngOnInit() {

        var activeSlabList = [];
        activeSlabList = [...this.data.tempData.sort(function (a, b) { return a.id - b.id })];
        activeSlabList.forEach(elem => {
            if (elem.status == 1) {
                this.rrSlabList.push(elem);
            }
        })
        if (this.rrSlabList.length > 1) {
            this.isdeleteShow = true;
        }
        if (this.data.viewType) {
            this.isdisabled = true;
        }
    }

    rrSlabObj: any = {};
    rrSlabList: Array<any> = [];
    isRequired: boolean = false;
    IsHide: boolean = false;
    addMandatory: boolean = false;
    isdeleteShow: boolean = false;
    isdisabled: boolean = false;
    buttonName: string = 'Save';
    showAddBtn() {

        this.IsHide = false;
        if (this.rrSlabList.length) {
            this.rrSlabList.forEach((elem, index) => {
                this.addMandatory = false;

                if (index == this.rrSlabList.length - 1) {

                }

                if (!elem.slabFrom || !elem.slabTo || !elem.rrValue) {
                    this.IsHide = true;
                }
            })

        }
    }
    cancel() {
        let returnResponse = [...this.data.tempData];

        returnResponse = returnResponse.filter(elem => {
            let item = this.deletedList.find(elm => elm.nameId == elem.nameId);
            if (item && item.id) {
                item.status = 0;
                return elem;
            } else if (!item) {
                return elem;
            }
        })
        this.dialogRef.close(returnResponse);
    }
    addRrSlabROw() {

        let lastElm = this.findLastIndex(this.rrSlabList, 'status', 1);
        let retunval = false;
        if (this.rrSlabList.length) {
            this.rrSlabList.forEach(elem => {
                this.addMandatory = false;
                if (!elem.slabFrom || !elem.slabTo || !elem.rrValue) {
                    this.addMandatory = true;
                    this.isRequired = false;
                    retunval = true;
                }
            })

        }

        if (retunval) return;


        if (!this.rrSlabList.length || lastElm == -1) {
            return this.rrSlabList.push({
                status: 1,
                nameId: this.makeid()
            });
        }
        this.IsHide = true;


        this.rrSlabList.push({
            slabFrom: parseFloat(this.rrSlabList[lastElm].slabTo) + 1,
            limit: this.rrSlabList[lastElm].slabTo,
            status: 1,
            nameId: this.makeid()
        });
        if (this.rrSlabList.length > 1) {
            this.isdeleteShow = true;
        }

    }

    makeid(length = 8) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    checkMaxValue(item) {
        if (parseFloat(item.slabFrom) > parseFloat(item.slabTo)) {
            item.slabTo = '';
        }
    }

    findLastIndex(array, searchKey, searchValue) {
        var index = array.slice().reverse().findIndex(x => x[searchKey] === searchValue);
        var count = array.length - 1
        var finalIndex = index >= 0 ? count - index : index;
        console.log(finalIndex)
        return finalIndex;
    }

    deletedList = [];
    deleteRRSlabRow(index) {

        let dialog = this.dialog.open(DeleteModalComponent, {
            width: '35vw',
            panelClass: 'mdmDialog',
            data: { title: 'this combination', heading: "RR Slab" }
        });
        dialog.beforeClose().subscribe(response => {
            

            if (response === "cancel") {
                return;
            }
            else if (response) {
                this.IsHide = false;
                  this.isdeleteShow = false;
                let item = this.rrSlabList[index];
                if (item.id) {
                    this.rrSlabList[index].status = 0;
                }
                else {
                    this.rrSlabList[index].status = 0;
                    this.rrSlabList.splice(index, 1);
                }
                if (this.rrSlabList.length > 1) {
                    this.isdeleteShow = true;
                } else {
                    delete this.rrSlabList[0].limit
                }
                this.rrSlabList.forEach(elem => {
                    if (!elem.slabFrom || !elem.slabTo || !elem.rrValue) {
                        this.IsHide = true;
                    }

                })
                this.deletedList.push(item);
            }
        })


    }
    retunval: boolean = false;
    emptyRR: boolean = false;
    saveRRSlabList() {
        this.isRequired = false;

        let validList = this.rrSlabList.filter(elm => elm.status == 1);
        if (!validList.length) {
            this.isRequired = false;
            this.addMandatory = false;
            return this.emptyRR = true;
        }
        this.rrSlabList.forEach(elem => {

            if (!elem.slabFrom || !elem.slabTo || !elem.rrValue) {
                this.addMandatory = false;
                this.isRequired = true;
                this.retunval = true;
            }
            else {
                this.retunval = false;
            }

        })
        if (this.retunval == true) {
            return;
        }
        this.dialogRef.close(this.rrSlabList);


    }
}
