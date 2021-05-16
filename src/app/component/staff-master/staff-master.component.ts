import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/common.service';
import { OpenBookingService } from 'src/app/core/service/open-booking.service';
import { ViewStaffDetailsComponent } from 'src/app/dialog/view-staff-details/view-staff-details.component';

@Component({
  selector: 'app-staff-master',
  templateUrl: './staff-master.component.html',
  styleUrls: ['./staff-master.component.css']
})
export class StaffMasterComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  totalCount = 0;
  designation = [];
  @ViewChild('matPaginator', { static: false }) matPaginator: MatPaginator;
  constructor(
    public dialog: MatDialog, 
    private openBookingService: OpenBookingService, 
    private spinner: NgxSpinnerService,
    private router: Router,
    private commonService: CommonService) { }

  ngOnInit() {
    this.getAllDesignation();
    this.getStafflist();
    sessionStorage.removeItem('staffId');
    sessionStorage.removeItem('isFolder');
    sessionStorage.removeItem('assocCode');
    sessionStorage.removeItem('staffResponse')
  }
  navigateTocreateStaff() {
    // sessionStorage.removeItem('staffResponse');
    sessionStorage.setItem('assocCode', this.staffResponse.assocCode);
    this.router.navigate(['/bookings-web-booking/create-staff'])
  }
  edit(element){
    sessionStorage.setItem('staffId',element.id);
    sessionStorage.setItem('assocCode', this.staffResponse.assocCode);
    this.router.navigate(['/bookings-web-booking/create-staff'])
  }
  navigateToFolder(element){
    sessionStorage.setItem('staffId',element.id);
    sessionStorage.setItem('isFolder','true');
    this.router.navigate(['/bookings-web-booking/create-staff'])
  }
  getAllDesignation() {
    this.commonService.getAllDesignation().subscribe((res:any)=>{
      console.log('resssssssss', res);
      this.designation = res
    },(err:any)=>{
    })
  }
  refType(id) {
    if (!id) {
      return;
    }
    const nameData = this.designation.filter((ref) => ref.id === id);
    // console.log('namedata',nameData)
    // console.log('id',id)

    let name = "";
    if (nameData[0]) {
      name = nameData[0].lookupVal;
    }
    return name;
  }
  staffResponse;
  getStafflist() {
    this.spinner.show();
    this.openBookingService.getStaffList().subscribe(
      (resp: any) => {
        this.spinner.hide();
        console.log(resp);
        this.staffResponse = resp.data.responseData;
        this.dataSource = new MatTableDataSource(resp.data.responseData.assocStaffs);
        this.dataSource.paginator = this.matPaginator;
        this.totalCount = resp.data.responseData.assocStaffs.length;
        sessionStorage.setItem('staffResponse', JSON.stringify(this.staffResponse));
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
  getFullName(staff: any) {
    return `${staff.staffFname || ''} ${staff.staffMname || ''} ${staff.staffLname || ''}`;
  }
  applyFilter(val) {
    this.dataSource.filter = val.trim();
  }
  openViewStaffDetailModal(staff: any) {
    this.dialog.open(ViewStaffDetailsComponent, {
      width: '40vw',
      panelClass: 'mat-dialog-responsive',
      data: staff
    });
  }

  displayedColumns: string[] = ['request', 'waybill', 'pick', 'booking', 'destination', 'sfx1', 'sfx'];
  // dataSource = ELEMENT_DATA;

}

export interface PeriodicElement {
  request: string;
  waybill: string;
  pick: string;
  booking: string;
  destination: string;
  sfx: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { request: '', waybill: '', pick: '', booking: '', destination: '', sfx: '' },
  { request: '', waybill: '', pick: '', booking: '', destination: '', sfx: '' },
  { request: '', waybill: '', pick: '', booking: '', destination: '', sfx: '' },
  { request: '', waybill: '', pick: '', booking: '', destination: '', sfx: '' },
];
