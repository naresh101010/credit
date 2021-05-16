import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/common.service';
import { OpenBookingService } from 'src/app/core/service/open-booking.service';

@Component({
  selector: 'app-active-device',
  templateUrl: './active-device.component.html',
  styleUrls: ['./active-device.component.css']
})
export class ActiveDeviceComponent implements OnInit {
  activeDevices;
  activeDeviceCount = 0;
  inActiveCount = 0;
  inActiveDevices;
  staffList;
  searchModel1 = '';
  searchModel2 = '';
  activeRefrenceList;
  inActiveRefrenceList;
  constructor(
    private openBookingService: OpenBookingService, 
    private spinner: NgxSpinnerService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.getAllLookups();

  }

  getActiveDevices() {
    this.openBookingService.getActiveDevices().subscribe((resp: any) => {
      console.log('getActiveDevices', resp);
      this.activeDevices = resp.data.responseData.activeDeviceList;
      this.activeDeviceCount = resp.data.responseData.activeDeviceCount
      this.activeRefrenceList = resp.data.referenceData
      this.activeDevices.forEach(element => {
        element.name = this.refType(element.lkpDeviceModelId);
      });
      console.log(this.activeDevices,'this.activeDevices')

    console.log()
    }, (err) => {
      this.spinner.hide();

      console.log(err);
    })
  }
  allLookUps = [];
  getAllLookups() {
    this.commonService.getAllLookups().subscribe((res: any) => {
      this.allLookUps = res;
      this.getActiveDevices();
      this.getInactiveDevices();
      this.getStaffList();
    }, (err: any) => {

    })
  }
  // getActiveStaffList() {
  //   this.openBookingService.getActiveStaffList().subscribe((resp: any) => {
  //     console.log(resp);
  //     this.staffList = resp.data.responseData.activeDeviceList;
  //     this.activeDeviceCount = resp.data.responseData.activeDeviceCount;
  //     this.spinner.hide();
  //     // this.getActiveDevices();
  //   }, (err) => {
  //     console.log(err);
  //     this.spinner.hide();
  //   })
  // }
  getFullName(staff: any) {
    return `${staff.staffFname} ${staff.staffMname || ''} ${staff.staffLname}`;
  }
  getInactiveDevices() {
    this.openBookingService.getInActiveDevices().subscribe((resp: any) => {
      console.log(resp);
      this.inActiveDevices = resp.data.responseData.inactiveDeviceList;
      this.inActiveCount = resp.data.responseData.inactiveDeviceCount;
      this.inActiveRefrenceList = resp.data.referenceData;
      this.inActiveDevices.forEach(element => {
        element.name = this.refType(element.lkpDeviceModelId);
      });
      this.spinner.hide();
      console.log(this.inActiveDevices, ' this.inActiveDevices');
    }, (err) => {
      this.spinner.hide();

      console.log(err);
    })
  }
  refType(id: any) {
    if (!id) {
      return '';
    }
    const nameData = this.allLookUps.filter((ref) => ref.id === id);
    let name = "";
    if (nameData[0]) {
      name = nameData[0].lookupVal;
    }
    // console.log('nameeee', name);
    if (!name || name === 'undefined' || name === 'UNDEFINED') {
      name = ''
    }
    return name;
  }
  getDeviceId(userId: any) {
    const filtered = this.activeDevices.filter(device => device.userId == userId);
    if (filtered.length > 0) {
      return filtered[0].deviceId;
    }
    return null;
  }
  getStaffList() {
    this.openBookingService.getStaffList().subscribe((resp: any) => {
      console.log(resp);
      this.staffList = resp.data.responseData.assocStaffs
    }, (err) => {
      console.log(err);
      this.spinner.hide();
    })
  }

  getDeviceModel(id) {
    const filtered = this.activeDevices.filter(device => device.userId == id);
    if (filtered.length > 0) {
      const lkpModelId = filtered[0].lkpDeviceModelId;
      return this.getModel(lkpModelId);
    }
    return ''
  }
  getModel(id) {
    return id;
  }
}
