import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/common.service';
import { OpenBookingService } from 'src/app/core/service/open-booking.service';

@Component({
  selector: 'app-view-staff-details',
  templateUrl: './view-staff-details.component.html',
  styleUrls: ['./view-staff-details.component.css']
})
export class ViewStaffDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private openBookingService: OpenBookingService, private spinner: NgxSpinnerService, private router: Router, private commonService: CommonService) { }
  staffDetails: any
  ngOnInit() {
    console.log('this.data', this.data);
    this.getStaffDetails();
    this.staffDetails = this.data;
    this.getAllDesignation();
  }
  design = [];
  getDesignation() {
    if (this.staffDetails && this.design) {
      const designationArr = this.design.filter(el => el.id == this.staffDetails.desigId);
      if (designationArr.length) {
        return designationArr[0].lookupVal;
      }
    }
  }
  getAllDesignation() {
    this.commonService.getAllDesignation().subscribe((res: any) => {
      console.log('resssssssss', res);
      this.design = res
      // this.details.desigId = res[0].id;
    }, (err: any) => {
    })
  }
  getStaffDetails() {
    this.spinner.show();
    this.openBookingService.getStaffDetailsByStaffId(this.data.id).subscribe(
      (resp: any) => {
        this.spinner.hide();
        console.log(resp);
        this.staffDetails = resp.data.responseData;
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
  getFullName(staff) {
    return `${staff.staffFname} ${staff.staffMname || ''} ${staff.staffLname || ''}`;
  }
  edit(id){
    console.log('id', id);
    sessionStorage.setItem('staffId',id);
    // sessionStorage.setItem('assocCode', this.staffResponse.assocCode);
    this.router.navigate(['/bookings-web-booking/create-staff'])
  }
}
