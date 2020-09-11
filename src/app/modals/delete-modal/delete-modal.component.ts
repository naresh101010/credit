import { Component, OnInit, Input, OnChanges, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
})
export class DeleteModalComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
    }

}
