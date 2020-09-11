import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditSegmentComponent } from 'src/app/modals/edit-segment/edit-segment.component';
import { AddSubSegmentComponent } from 'src/app/modals/add-sub-segment/add-sub-segment.component';
import { SegmentLineService } from "src/app/services/segment.service";
import moment from 'moment';
import { AppComponent } from 'src/app/app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthorizationService } from 'src/app/services/authorisation.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
    selector: 'app-segment',
    templateUrl: './segment.component.html',
})
export class SegmentComponent implements OnInit {

    constructor(public dialog: MatDialog,
        private $subSegment: SegmentLineService,
        private $segment: SegmentLineService,
        private appComp: AppComponent,
        private spinner: NgxSpinnerService,
        private AuthorizationService: AuthorizationService,
        private permissionsService: NgxPermissionsService

    ) { }

    ngOnInit() {
debugger
        if (this.segmentObj.segment) {
            this.getSubSegmentBySegmentId(this.segmentObj.segment);
        }
        this.getLodaList()
        this.getSegment();
        this.permissionsService.loadPermissions(this.AuthorizationService.getPermissions('LOOKUP', 'SEGMENT'));
    }
    segmentNameSearchCtrl = <string>'';
    segmentShow;
    showSegment;
    segmentId;
    segmentNameObj;
    searchSegmantName;
    searchSubSegmantName;
    segmentList: Array<any> = [];
    subSegmentList: Array<any> = [];
    activeSegmentList: Array<any> = [];
    segmentObj = <any>{};
    subSegment = <any>{};
    p: number = 1;
    minDate = new Date(new Date().setDate(new Date().getDate()));

clearSubSegment(){

    this.segmentObj.segment='';
    this.subSegmentList=[];
    this.strLengthValidSegment=false;
    this.getSegment();
}
    getallSegment(segmentId) {
        return this.getSubSegmentBySegmentId(segmentId);
    }

    editSegmentModal(subSegment = null, permissionType) {
      this.strLengthValid=false;
      this.searchSegmantName = '';
        let data = {
            status: 1,
            obj: subSegment,
            permissionType: permissionType
        };
        let dialog = this.dialog.open(EditSegmentComponent, {
            width: '55vw',
            panelClass: 'mdmDialog',
            data: data
        })
        dialog.afterClosed().subscribe(response => {

            if (response === true) {
                return;
            }
            if (response) {

                if (subSegment == null) {
                    this.segmentList.splice(0, 0, response);
                    this.appComp.showMessage(`${response.segmentName} IS ADDED`);
                    this.p=1;
                    return this.getSegment();
                }
                else {
                    let index = this.segmentList.findIndex(elem => elem.id == response.id);
                    this.segmentList[index] = response;
                    this.subSegment.id = response.id;
                    if (response.status == 0) {
                        this.appComp.showMessage(`${response.segmentName} IS DELETED`);
                    } else {
                        this.appComp.showMessage(`${response.segmentName} IS UPDATED`);
                    }
                    this.p=1;
                    return this.getSegment();
                }
            }
        })
    }



    AddSubSegmentModal(segmentObj = null, type = null, permissionType) {

this.strLengthValid=false;
 this.searchSubSegmantName='';
if(type==5){
        var data = {
            status: 1,
            obj: segmentObj,
            type: type,
            permissionType: permissionType
        };

}
       else{
            var data = {
            status: 1,
            obj: {...segmentObj},
            type: type,
            permissionType: permissionType
        };
       }

        if (this.segmentObj.id) {
            data = { ... this.segmentList.find(elem => elem.id == this.segmentObj.id), permissionType: permissionType };
        }


        let dialog = this.dialog.open(AddSubSegmentComponent, {
            width: '55vw',
            panelClass: 'mdmDialog',
            data: data
        })

        dialog.afterClosed().subscribe(response => {

            if (response === true) {
                return;
            }
            if (response) {

                if (data.type) {
                    this.subSegmentList.push(response);
                    this.subSegment.id = response.id;
                    this.segmentObj.segment = response.segmentId;
                    this.appComp.showMessage(`${response.subsegmentName} IS ADDED`);
                       this.p=1;
                    return this.getSubSegmentBySegmentId(this.segmentObj.segment);
                }

                else {
                    let index = this.subSegmentList.findIndex(elem => elem.id == segmentObj.id);
                    this.subSegmentList[index] = {...response};
                    this.subSegment.id = response.id;
                    if (response.status == 0) {
                        this.appComp.showMessage(`${response.subsegmentName} IS DELETED`);
                           this.p=1;
                        return this.getSubSegmentBySegmentId(response.segmentId);
                    } else {
                        this.appComp.showMessage(`${response.subsegmentName} IS UPDATED`);
                           this.p=1;
                        return this.getSubSegmentBySegmentId(response.segmentId);
                    }

                }

            }

        })
    }


    getSegment() {

        this.spinner.show();
        this.$segment.getAllSegment().subscribe(response => {
            this.p = 1;
            this.segmentList = response;
            this.spinner.hide();
        });
    }

    getSubSegmentBySegmentId(segmentId=null) {

      if(segmentId){
           this.spinner.show();
            this.$subSegment.getAllSubSegment(segmentId).subscribe(response => {
            this.p = 1;
            this.spinner.hide();
            this.searchSubSegmantName='';
            this.subSegmentList = response;
        });
      }
    }

getLodaList(){
    debugger
        this.spinner.show();
        this.$segment.getLoadList().subscribe(response => {
            this.p = 1;
            this.activeSegmentList = response.referenceData.activeSegmentList;
            this.spinner.hide();
        });
}

    saveSegment() {
        this.spinner.show();
        this.segmentObj.effectiveDt = moment(this.segmentObj.effectiveDt).format("YYYY-MM-DD");
        if (this.segmentObj.expDt) {
            this.segmentObj.expDt = moment(this.segmentObj.expDt).format("YYYY-MM-DD");
        }
        this.$segment.saveSegment(this.segmentObj).subscribe(response => {
            if (!this.segmentObj.id) {
                this.p=1;
                this.segmentObj.id = response;
                this.segmentList.splice(0, 0, this.segmentObj);
                this.appComp.showMessage(`PRODUCT Master IS ADDED`);
            }
            this.spinner.hide();
        });
    }

    strLengthValid: boolean = false;
    searchSegment(str) {

        let strlength = str.target.value.length;
        if (strlength > 2 && str.target.value) {
            this.strLengthValid = false;
            if (!this.searchSegmantName || this.searchSegmantName.trim() == "") {
                return this.getSegment();
            }
            this.spinner.show();
            this.p = 1;
            this.$segment.searchBySegmentName(this.searchSegmantName).subscribe(Response => {
                this.spinner.hide();
                this.segmentList = Response;
                if (!this.segmentList.length) {
                    this.appComp.showMessage(`Record doesn't exist in Propel-I`, "danger");
                }
            });
        } else {
            this.strLengthValid = true;
        }
    }

    strLengthValidSegment: boolean = false;
    searchSubSegment(str,segmeentId=null) {

        let strlength = str.target.value.length;
        if (this.segmentObj.segment) {
            if (strlength > 2 && str.target.value) {
                this.strLengthValidSegment = false;
                if (!this.searchSubSegmantName || this.searchSubSegmantName.trim() == "") {
                    if(segmeentId){
                        return this.getSubSegmentBySegmentId(segmeentId);
                    }
                }
                this.spinner.show();
                this.p = 1;
                this.$segment.searchBySubSegmentName(segmeentId,this.searchSubSegmantName).subscribe(Response => {
                    this.spinner.hide();
                    this.subSegmentList = Response;
                    if (!this.subSegmentList.length) {
                        this.appComp.showMessage(`Record doesn't exist in Propel-I`, "danger");
                    }
                });
            } else {
                this.spinner.hide();
                this.strLengthValidSegment = true;
            }
        }
        else{
             this.appComp.showMessage(`Please  Select Segment`, "danger");
        }

    }
    clearSearch() {
        if (!this.searchSegmantName || this.searchSegmantName == "") {
            this.strLengthValid = false;
            return this.getSegment();
        }
    }
    clearSearchSubsegment() {

        if (!this.searchSubSegmantName || this.searchSubSegmantName == "") {
            this.strLengthValidSegment = false;
            return this.getSubSegmentBySegmentId(this.segmentObj.segment);
        }
    }
}
