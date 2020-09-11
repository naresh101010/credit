import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SegmentLineService } from 'src/app/services/segment.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-sub-segment',
  templateUrl: './add-sub-segment.component.html',
})
export class AddSubSegmentComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    private $segment: SegmentLineService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddSubSegmentComponent>
  ) { }
  @ViewChild("f", null) segmentForm: any;
  ngOnInit() {
debugger
    this.getsubSegment();
    this.obj = { ...this.data };
    if (!(this.data.obj == null)) {
      this.editStatus = this.data.obj.status;
    }
    this.inActiveStatus();
    if (this.data.permissionType == 2) {
      this.submitPermission = false;
      this.isType="Edit";
    }
    else if(this.data.permissionType == 1){
        this.submitPermission = true;
         this.isType="View";
    }
    else{
         this.submitPermission = false;
         this.isType="Add";
    }
    this.isVar = false;
    if (this.obj.obj.id == undefined) {
      this.segmentId = this.obj.obj;
    }
    else {
      this.segmentId = this.obj.obj.segmentId;
      this.subSegment = this.obj.obj;
    }
    if (this.subSegment.status == null) {
      this.subSegment.status = 1;
    }
    if (this.subSegment.effectiveDt) {
      this.subSegment.effectiveDt = moment(this.subSegment.effectiveDt).format("YYYY-MM-DD");
      this.today = this.subSegment.effectiveDt;
    }

  }
  segmentNameSearchCtrl = <string>'';
  isType:string;
  selectDropdown;
  segmentId;
  segmentName
  obj = {} as any;
  subSegment = {} as any;
  segmentList: Array<any> = [];
  subSegmentList: Array<any> = [];
  today = new Date();
  currentDate = moment(new Date()).format("YYYY-MM-DD");
  editStatus={}as any;
  inActiveFlag = <boolean>false;
  submitPermission = <boolean>true;

  UpdateSubSegment() {

    this.isVar = false;
    if (this.subSegment.expDt) {
      if (this.subSegment.expDt < this.currentDate && this.subSegment.expDt < this.subSegment.effectiveDt) {
          this.isVar = true;
      }
      else {
          this.isVar = false;
          this.subSegment.expDt = moment(this.subSegment.expDt).format("YYYY-MM-DD");
      }
    }
    if (this.subSegment.status === 0) {

      let dialog = this.dialog.open(DeleteModalComponent, {
        width: '35vw',
        panelClass: 'mdmDialog',
        data: { title: this.subSegment.subSegmentName, heading: "Sub Segment" }
      });
      dialog.beforeClose().subscribe(response => {
        if (response === true) {
          this.submitData();
        }
      })
    }
    else {
      this.submitData();
    }
  }

  submitData(type = null) {
    this.spinner.show()
    this.isVar = false;
    if (this.subSegment.effectiveDt) {
      this.subSegment.effectiveDt = moment(this.subSegment.effectiveDt).format("YYYY-MM-DD");
    }

    if (this.subSegment.expDt) {
      this.subSegment.expDt = moment(this.subSegment.expDt).format("YYYY-MM-DD");
    }
    this.subSegment.segmentId = this.segmentId;
    this.$segment.saveSubSegment(this.subSegment).subscribe(response => {

      this.segmentForm.submitted = false;
      this.subSegment.id = response.data.responseData;
      let subSegment = { ...this.subSegment };
      this.dialogRef.close(subSegment);
      this.spinner.hide();
      this.segmentForm.reset();

    })
  }
  getsubSegment() {

    this.$segment.getAllSegment().subscribe(response => {
      // this.selectDropdown = false;
      this.segmentList = response;
      // if (this.subSegment.type != null) {
      //   let segmentName = this.segmentList.find(elem => elem.id == this.subSegment.obj);
      //   this.segmentName = segmentName.segmentName;

      // }
      // else {
      //   if (this.subSegment.obj.segmentId) {
      //     this.selectDropdown = true;
      //   }
      // }

    });
  }
  
//   getSegment(segmentId) {

//     this.$segment.getAllSegment().subscribe(response => {
//       this.segmentList = response;
//       if(this.segmentId){
//     this.segmentList.map(elem=>{
//         if(elem.id==segmentId){
//             this.subSegment.effectiveDt=elem.effectiveDt;
//             this.subSegment.expDt=elem.expDt;
//         }
//     })
// }

//     });
//   }

  inActiveStatus() {

    if (this.editStatus == 0) {
    this.inActiveFlag = true;
    }
}

expiryMinDate: any;
isVar = <boolean>true;
isChange = <boolean>true;

checkForExpiryDate(effectiveDt) {

    let todayDate = moment(new Date()).format('YYYY-MM-DD');
    effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
    if(this.subSegment.expDt){
        this.subSegment.expDt = moment(this.subSegment.expDt).format("YYYY-MM-DD");
    }
    if(this.subSegment.effectiveDt){
        this.subSegment.effectiveDt = moment( this.subSegment.effectiveDt).format("YYYY-MM-DD");
    }
    if (this.subSegment.expDt <= effectiveDt && (!this.subSegment.id || this.subSegment.expDt <= effectiveDt)) {
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

removeMinDate(effectiveDt) {

    this.expiryMinDate = moment(effectiveDt).format('YYYY-MM-DD');
}

changeDateFormat(effectiveDt, expDt) {

    console.log(effectiveDt)
    this.isVar = true;

    if (effectiveDt) {
        this.subSegment.effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
    }
    if (expDt) {
        this.subSegment.expDt = moment(expDt).format('YYYY-MM-DD');
    }

    this.checkForExpiryDate(effectiveDt)
}

}
