import { Component, OnInit } from '@angular/core';
import { notepad } from './../../Models/notepad';
import { NotePadService } from './../../services/natepad.service';
import { AppComponent } from 'src/app/app.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import notepadJson from '../../../jsons/notepad.json';
import { DeleteModalComponent } from 'src/app/modals/delete-modal/delete-modal.component';
import moment from 'moment';

@Component({
    selector: 'app-view-notepad',
    templateUrl: './view-notepad.component.html',
    styleUrls: ['./view-notepad.component.css']
})
export class ViewNotepadComponent implements OnInit {


    constructor(
        private $notePad: NotePadService,
        private appComp: AppComponent,
        private $http: HttpClient,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.notepadList = <any>notepadJson.data.responseData;
    }
    notepadList: Array<any>;
    addNotepad;
    allNotepad;
    notepadDetails;
    showtext;
    viewNotepad;
    showNotepadDetails;
    NotepadTable;
    notepadObj = {} as any;



    saveNotePad() {
        this.notepadObj.effectiveDate = moment(this.notepadObj.effectiveDate).format("YYYY-MM-DD");
        this.notepadObj.expiryDate = moment(this.notepadObj.expiryDate).format("YYYY-MM-DD");

        this.$notePad.saveAllNotePad(this.notepadObj).subscribe(response => {

            if (!this.notepadObj.id) {
                this.notepadObj.id = response;
                this.notepadList.push(this.notepadObj);
                this.appComp.showMessage(`NOTEPAD IS CREATED`);
            }
            else {
                this.notepadList = this.notepadList.map(elem => {
                    if (elem.id == this.notepadObj.id) {
                        elem = this.notepadObj;
                    }
                    return elem;

                })
                this.appComp.showMessage(`NOTEPAD IS UPDATED`);
            }

            this.notepadObj = {};
            setTimeout(() => {
                this.addNotepad = false;
            }, 1000);
        });
    }



    // saveNotepad() {
    //     this.appComp.showMessage(`Organisation IS ADDED`);
    //     setTimeout(() => {
    //         this.addNotepad = false;
    //     }, 1000);
    // }
    getNotepad() {
        this.addNotepad = false;
        this.notepadDetails = true;
        this.allNotepad = true;
    }
    addNewNotepad() {
        this.addNotepad = true;
        this.notepadDetails = false;
        this.allNotepad = true;
        this.showtext = true;
    }
    showNotePadTable() {
        this.addNotepad = true;
        this.notepadDetails = false;
        this.showtext = true;
        this.allNotepad = false;
        this.showtext = true;
    }

    getNotepadList() {
        this.$http.get('notepad/v1/mdm').subscribe((response: any) => {
            this.notepadList = response.data;
        });
    }

    viewNotepadList(index) {
        this.notepadList[index].isVisible = !this.notepadList[index].isVisible
        this.notepadList[index].isHidden = false
    }

    editNotepadData(index) {
        this.notepadList[index].isHidden = !this.notepadList[index].isHidden
        this.notepadList[index].isVisible = false
    }

    // saveNotePad() {
    //     this.$http.post("notepad/v1/mdm", this.notepadObj).subscribe(response => {
    //     })
    // }

    deleteModalOpen() {
        this.dialog.open(DeleteModalComponent, {
            width: '35vw',
            panelClass: 'mdmDialog'
        })
    }

}
