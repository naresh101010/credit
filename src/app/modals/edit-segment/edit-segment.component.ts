import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SegmentLineService } from 'src/app/services/segment.service';
import moment from 'moment';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-edit-segment',
    templateUrl: './edit-segment.component.html',
})
export class EditSegmentComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private $segment: SegmentLineService,
        private spinner: NgxSpinnerService,
        private datePipe: DatePipe,
        public dialogRef: MatDialogRef<EditSegmentComponent>,
        public dialog: MatDialog,
        private $common: CommonService,
    ) { }
    @ViewChild("f", null) segmentForm: any;
    ngOnInit() {

        let SegmentObj = { ...this.data.obj };

        if (!(this.data.obj == null)) {
            this.editStatus = this.data.obj.status;
        }
        this.inActiveStatus();
        if (this.data.permissionType == 2) {
            this.submitPermission = false;
            this.isType = "Edit";
        }
        else if (this.data.permissionType == 1) {
            this.isType = "View";
            this.submitPermission = true;
        }
        else {
            this.submitPermission = false;
            this.isType = "Add";
        }

        if (this.segmentObj.expDt < this.currentDate) {
            this.isVar = false;
        }

        this.segmentObj = SegmentObj;
        if (this.segmentObj.status == null) {
            this.segmentObj.status = 1;
        }
        this.getSegment();
    }
    isType: string;
    segmentObj = {} as any;
    isInactive = <boolean>false;
    segmentList: Array<any> = []
    today = new Date();
    currentDate = moment(new Date()).format("YYYY-MM-DD");
    editStatus = {} as any;
    inActiveFlag = <boolean>false;
    submitPermission = <boolean>true;
    getSegment() {

        this.$segment.getAllSegment().subscribe(response => {
            this.segmentList = response;
        });
        if (this.segmentObj.status == 0 && this.segmentObj.expDt < this.currentDate) {
            this.isInactive = true;
            this.expiryMinDate = this.currentDate;
        } else {
            this.isInactive = false;
        }
    }
    addSegment() {

        this.isVar = false;
        if (this.segmentObj.expDt) {
            if (this.segmentObj.expDt < this.currentDate && this.segmentObj.expDt < this.segmentObj.effectiveDt) {
                this.isVar = true;
            }
            else {
                this.isVar = false;
                this.segmentObj.expDt = moment(this.segmentObj.expDt).format("YYYY-MM-DD");
            }
        }

        if (this.segmentObj.id) {
            this.segmentObj.isUpdateOrRemove = "Update";
        }
        if (this.segmentObj.status === 0) {
            let dialog = this.dialog.open(DeleteModalComponent, {
                width: '35vw',
                panelClass: 'mdmDialog',
                data: { title: this.segmentObj.segmentName, heading: "Segment" }
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

    submitData(type = null) {
        this.spinner.show();
        this.isVar = false;
        if (this.segmentObj.effectiveDt) {
            this.segmentObj.effectiveDt = moment(this.segmentObj.effectiveDt).format("YYYY-MM-DD");
            this.today = this.segmentObj.effectiveDt;
        }
        if (this.segmentObj.expDt) {
            this.segmentObj.expDt = moment(this.segmentObj.expDt).format("YYYY-MM-DD");
        }

        this.$segment.saveSegment(this.segmentObj).subscribe(response => {
            // this.segmentForm.submitted = false;
            this.segmentObj.id = response.data.responseData;
            let segmentObj = { ...this.segmentObj };
            this.dialogRef.close(segmentObj);
            this.spinner.hide();
            this.segmentForm.reset();

        })
    }

    inActiveStatus() {

        if (this.editStatus == 0) {
            this.inActiveFlag = true;
        }
    }

    expiryMinDate: any;
    isVar = <boolean>false;
    isChange = <boolean>true;

    checkForExpiryDate(effectiveDt) {
        
        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
        if (this.segmentObj.expDt) {
            this.segmentObj.expDt = moment(this.segmentObj.expDt).format("YYYY-MM-DD");
        }
        if (this.segmentObj.effectiveDt) {
            this.segmentObj.effectiveDt = moment(this.segmentObj.effectiveDt).format("YYYY-MM-DD");
        }
        if (this.segmentObj.expDt <= effectiveDt && (!this.segmentObj.id || this.segmentObj.expDt <= effectiveDt)) {
            this.isVar = true;
        }
        else {
            this.isVar = false;
        }

        if (effectiveDt < todayDate) {
            return this.expiryMinDate = todayDate;
        }
        return this.expiryMinDate = moment(effectiveDt, 'YYYY-MM-DD').add(1, "d").format('YYYY-MM-DD');

    }

    removeMinDate(effectiveDate) {
        this.$common.setExpiryDate(effectiveDate, this.isInactive)
    }

    changeDateFormat(effectiveDt, expDt) {
        
        console.log(effectiveDt)
        this.isVar = true;

        if (effectiveDt) {
            this.segmentObj.effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
        }
        if (expDt) {
            this.segmentObj.expDt = moment(expDt).format('YYYY-MM-DD');
        }

        this.checkForExpiryDate(effectiveDt)
    }

}
