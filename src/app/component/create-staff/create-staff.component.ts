import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { eventNames } from 'process';
import { CommonService } from 'src/app/core/common.service';
import { OpenBookingService } from 'src/app/core/service/open-booking.service';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css']
})
export class CreateStaffComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private openBookingService: OpenBookingService,
    private route: ActivatedRoute,
    private commonService: CommonService) { }
  isCreateStaff: boolean = true;
  form;
  details = { "id": null, name: '', dlNum: '', "aadhaarNum": "", "altMob": "", "mob": "", "ofcEmail": "", "panNum": "", "resAddr": "", "staffFname": "", "staffLname": "", "status": '1', "assocId": null, "desigId": null, "staffMname": '', assocCode: '' }
  documents: any = [];
  docType: any = [];
  docTypeId;
  docSubType: any = [];

  docSubTypeId = 1;
  isValidSubType = false;
  isValidType = false;
  displayedColumns: string[] = ['name', 'designation']
  staffId;
  idDisabled = false;
  design = [];
  checkFileSize = false;
  staffResponse;
  ngOnInit() {
    this.getAllDesignation();
    this.getAllLookups();
    this.getDocumentType();
    // this.getSubType();
    // this.route.queryParamMap.subscribe(query => {
    //   const staffid = query.get('staffId');
    //   if (staffid) {
    //     this.staffId = staffid;
    //     this.getDetails(staffid);
    //     this.getDocumentList(staffid);
    //   }
    // })
    // console.log('staffId', staffId);
    // let assocCode = sessionStorage.getItem('assocCode');
    this.spinner.show();
    const staffResponse = sessionStorage.getItem('staffResponse')
    console.log('staffResponse', staffResponse);
    if (staffResponse) {
      this.staffResponse = JSON.parse(staffResponse);
      
      // assocCode = this.staffResponse.assocCode;
      console.log('assocCode', this.staffResponse.assocCode);
      this.details.assocCode = this.staffResponse.assocCode;
      this.idDisabled = true;
    }
    console.log(this.staffResponse ,' this.staffResponse' )
    const staffId = sessionStorage.getItem('staffId');
    const isFolder = sessionStorage.getItem('isFolder');
    
    if (staffId) {
      this.staffId = staffId;
      this.idDisabled = true;
      this.getDetails(staffId);
      this.getDocumentList(staffId);
    } else {
      // this.details.assocId = assocCode
    }
    if (isFolder) {
      this.isCreateStaff = false;
    }
    console.log('staffId', staffId);

    setTimeout(() => {
      this.spinner.hide()
    }, 2000);
   
  }
  allLookups = [];
  getAllLookups() {
    this.commonService.getAllLookups().subscribe((res: any) => {
      // console.log('res getalllookups', res);
      this.allLookups = res;
    }, (err: any) => {

    });
  }
  fromLookup(id) {
    const filtered = this.allLookups.filter(el => el.id == id);
    if (filtered.length) return filtered[0].lookupVal;
    return '';
  }
  getDepartment() {
    if (this.staffResponse) {
      const assocDeptMaps = this.staffResponse.assocDeptMaps
      const depLkp = assocDeptMaps[0].lkpAssocDeptId;
      console.log('depLkp', depLkp);
      const filteredDep = this.allLookups.filter(el => el.id == depLkp);
      console.log('filteredDep', filteredDep);
      if (filteredDep.length) {
        return filteredDep[0].lookupVal;
      }
      return '';
    }
    return '';
  }
  getAssociate() {
    if (this.staffResponse) {
      const assocRegdType = this.staffResponse.assocRegdType
      console.log('assocRegdType', assocRegdType);
      const filteredAssocType = this.allLookups.filter(el => el.id == assocRegdType);
      console.log('filteredAssocType', filteredAssocType);
      if (filteredAssocType.length) {
        return filteredAssocType[0].lookupVal;
      }
      return '';
    }
    return '';
  }
  getDocumentType() {
    this.commonService.getLookUpByType('ASSOC_DOC_TYPE').subscribe((res: any) => {
      this.docType = res;
      console.log('this.doctype', this.docType);
      if (this.docType.length == 1) {
        this.docTypeId = this.docType[0].id;
        this.getSubType();
      }else{
        this.docTypeId = 1;
      }
    }, (err: any) => {

    })
  }
  docTypeChange() {
    if(this.docTypeId != 1){
      this.getSubType();
      this.isValidType = false;
    }else{
      this.docSubTypeId = 1;
      this.isValidType = true;
    }
    
  }
  docsubTypeChange(){
    console.log(this.docSubTypeId,'this.docSubTypeId')
    if(this.docSubTypeId && this.docSubTypeId != 1){
      this.isValidSubType = false;
    }else{
      this.isValidSubType = true;
    }
  }
  getSubType() {
    this.spinner.show();
    this.openBookingService.getSubType(this.docTypeId).subscribe((res: any) => {
      console.log('this.getSubType', res)
      this.docSubType = res.data.responseData;
      if(this.docSubType[0].length == 1){
        this.docSubTypeId = this.docSubType[0].id;
      }else{
        this.docSubTypeId = 1;
      }
      
      this.spinner.hide();
    }, (err: any) => {
      this.docSubType = [];
      this.spinner.hide();
    })
  }
  getDetails(id) {
    this.openBookingService.getStaffDetailsByStaffId(id).subscribe(
      (resp: any) => {
        console.log(resp);
        console.log(resp.data.responseData,'resp.data.responseData')
        this.details = resp.data.responseData;
        this.details.name = this.getName();
        console.log('this.details.name', this.details.name);
        this.details.status = this.details.status ? this.details.status + '' : '1'; 
        let staffResponse = sessionStorage.getItem('staffResponse')
        if (staffResponse) {
          this.details.assocCode = JSON.parse(staffResponse).assocCode;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getDesignation() {
    if (this.details && this.design) {
      const designationArr = this.design.filter(el => el.id == this.details.desigId);
      if (designationArr.length) {
        return designationArr[0].lookupVal;
      }
    }
  }
  getName() {
    return `${ this.details.staffFname ? this.details.staffFname.trim() : ''}${ this.details.staffMname ? ' ' + this.details.staffMname.trim() : ''}${ this.details.staffLname ? ' '+ this.details.staffLname.trim() : ''}`
  }
  fileDoc;
  fileName;
  getDocumentList(id) {
    this.openBookingService.getStaffDocumentList(id).subscribe(
      (resp: any) => {
        console.log('documents list', resp);
        this.documents = resp.data.responseData;
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }
  handleFileInput(event: any) {
    if (event[0].size > 5242880) {
      this.checkFileSize = true;
      return ;
    }else{
      this.checkFileSize = false;
    }
    this.fileDoc = event[0];
    this.fileName = this.fileDoc.name
    console.log('this.file', this.fileDoc);
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  validatePan = true;
  validatePAN() {
    // var txtPANCard = document.getElementById("txtPANCard");
    // var lblPANCard = document.getElementById("lblPANCard")
    this.validatePan = false;
    const pan = this.details.panNum
    var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    if (regex.test(pan.toUpperCase())) {
      this.validatePan = true;
      return true;
    } else {
      this.validatePan = false;
      return false;
    }
  }
  uploadDoc() {
    if(this.docTypeId == undefined || this.docTypeId == 1 || this.docTypeId == ''){
      this.isValidType = true;
    }

    if(this.docSubTypeId == undefined || this.docSubTypeId == 1 || this.docSubTypeId == 1){

      this.isValidSubType = true;
    }
    if (!this.fileDoc || !this.docSubTypeId) {
      
      
      return
    }else{
      this.isValidType = false;
      this.isValidSubType = false;
    }
    const body = {
      file: this.fileDoc,
      lkpDocSubtypeId: this.docSubTypeId,
      lkpDocTypeId: this.docTypeId,
      staffId: this.staffId
    }
    this.spinner.show();
    this.openBookingService.staffDocumentUpload(body).subscribe((res: any) => {
      this.documents = [];
      this.fileDoc = undefined;
      this.fileName = undefined;
      this.getDocumentList(this.staffId);
    }, (err: any) => {
      this.spinner.hide();
    })
  }

  getAllDesignation() {
    this.commonService.getAllDesignation().subscribe((res: any) => {
      console.log('resssssssss', res);
      this.design = res
      // this.details.desigId = res[0].id;
    }, (err: any) => {
    })
  }
  submitForm(staff: NgForm) {
    if (staff.invalid) {
      return;
    }
    this.form = staff;
    // console.log('this.form', this.details);
    const name = this.details.name
    const distName = name.split(' ')
    // console.log('dist name', distName);
    // console.log('dist name lenngth', distName.length);

    if (distName.length > 2) {
      this.details.staffFname = distName[0];
      this.details.staffMname = distName[1];
      this.details.staffLname = distName[2]
    } else if (distName.length === 2) {
      this.details.staffMname = ' ';
      this.details.staffFname = distName[0];
      this.details.staffLname = distName[1];
    } else if (distName.length === 1) {
      this.details.staffFname = distName[0];
      this.details.staffMname = ' ';
      this.details.staffLname = ' ';
    }
    this.details.panNum = this.details.panNum.toUpperCase();
    this.details.status = this.details.status;
    this.details.assocId = this.staffResponse.id;
    // console.log('this.staffname', this.details.staffFname);
    // console.log('this.middle name', this.details.staffMname);
    // console.log('this.last name', this.details.staffLname);
    // if (!this.validatePan) {
    //   return
    // }
    // return;
    if (this.details.id) {
      this.updateStaff(this.details)
    } else {
      delete this.details.id
      this.createStaff(this.details)
    }
    // this.isCreateStaff = false;
  }
  updateStaff(staff) {
    // staff.status = +staff.status;  
    // Object.keys(staff.value).forEach((key) => staff.controls[key].markAsDirty());
    // if (staff.valid) {
    this.spinner.show();
    // const staffFormValue = staff.value;
    // console.log('staffFormValue', staffFormValue);
    // const body = this.getBody(staffFormValue);
    this.openBookingService.updateStaff(staff).subscribe(
      (resp: any) => {
        console.log('resp update staff', resp);
        this.staffId = resp.data.responseData;
        
        this.isCreateStaff = false;
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.details.status = '1';
      }
    );
    // }
  }
  createStaff(staff) {
    // Object.keys(staff.value).forEach((key) => staff.controls[key].markAsDirty());
    // if (staff.valid) {
    console.log('create staff', staff);
    this.spinner.show();
    // staff.status = +staff.status;
    // const staffFormValue = staff.value;
    // console.log('staffFormValue', staffFormValue);
    // const body = this.getBody(staffFormValue);
    this.openBookingService.createStaff(staff).subscribe(
      (resp: any) => {
        console.log('resp create staff', resp);
        // this.staffId = re
        this.staffId = resp.data.responseData;
        
        this.isCreateStaff = false;
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.details.status = '1';
      }
    );
    // }
  }

  private getBody(staffFormVal) {
    return {
      "aadhaarNum": staffFormVal.adharNum,
      // "altMob": "string",
      "assocId": staffFormVal.assocId,
      // "crtdBy": "string",
      // "crtdDt": "string",
      // "descr": "string",
      "desigId": +staffFormVal.designation,
      "dlNum": staffFormVal.dlNum,
      "dob": new Date('01/09/1996'),
      "effectiveDt": new Date(),
      "emergencyPhone": staffFormVal.contactNum,
      // "estDt": "string",
      // "expDt": "string",
      // "gender": "string",
      // "id": 0,
      // "kycFlag": 0,
      // "maritalStatus": "string",
      "mob": staffFormVal.mobOf,
      "ofcEmail": staffFormVal.email,
      "panNum": staffFormVal.pan,
      // "personalEmail": "string",
      // "propelRefId": 0,
      // "resAddr": "string",
      "staffFname": staffFormVal.staffName.split(' ').length > 1 ? staffFormVal.staffName.split('')[0] : staffFormVal.staffName,
      "staffLname": staffFormVal.staffName.split(' ').length > 1 ? staffFormVal.staffName.split('')[1] : '',
      // "staffMname": "string",
      "status": +staffFormVal.status,
      // "updBy": "string",
      // "updDt": "string",
      // "whatsappNum": "string"
    }
  }
}
