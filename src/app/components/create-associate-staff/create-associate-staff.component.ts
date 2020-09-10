import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddDesignationComponent } from 'src/app/dialog/add-designation/add-designation.component';
import { ApiService } from 'src/app/core/services/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AppSetting } from 'src/app/app.setting';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validation } from 'src/app/core/directives/validation';
import { DatePipe } from '@angular/common';
import { AuthorizationService } from '../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-create-associate-staff',
  templateUrl: './create-associate-staff.component.html'
  providers : [DatePipe]
})
export class CreateAssociateStaffComponent implements OnInit {
  dataSource: any;
  associateData : any;
  searchDeptName= '';
  AssociateStaffData: AssociateStaffElement = new AssociateStaffElement();
  isValidEffectiveDt: boolean;
  isValidExpDt : boolean;
  minDate : Date;
  effMinDate : Date;

  constructor( private tosterservice : ToastrService,private activatedRoute: ActivatedRoute, public router: Router, public dialog: MatDialog, private spinner: NgxSpinnerService, private apiService: ApiService,
                private datePipe : DatePipe,
                private authorizationService : AuthorizationService,
                private permissionsService: NgxPermissionsService) { }
  perList: any = [];

  status = [
    { value: 1, viewValue: 'ACTIVE' },
    { value: 0, viewValue: 'INACTIVE' }
  ];

  maritalStatus = [
    { value: "SINGLE", viewValue: "SINGLE" },
    { value: "MARRIED", viewValue: "MARRIED" }
  ];

  disabled
  ngOnInit() {
    let e = new Date();
    e.setDate(e.getDate() + 1);
    this.minDate = e;
   
    this.authorizationService.setPermissions('ASSOCIATE');
    this.perList = this.authorizationService.getPermissions('ASSOCIATE') == null ? [] : this.authorizationService.getPermissions('ASSOCIATE');
    this.permissionsService.loadPermissions(this.perList);

    this.associateData = AppSetting.associateData;
    this.GetreferenceList();
    this.activatedRoute.queryParams.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.effMinDate = null;
        this.disabled = true;
        this.GetAssociateStaffByid(id);
      }
      else {
        this.effMinDate = new Date();
        this.AssociateStaffData.status=1;
        this.AssociateStaffData.maritalStatus='SINGLE';
        this.disabled = false;
      }
    });
  }

  CreateAssociateStaff() {
    this.spinner.show();
    this.AssociateStaffData.assocId = AppSetting.associateId;
    this.AddNewDesignation();
    this.apiService.post(`secure/v1/associates/staff`, this.AssociateStaffData).subscribe((suc) => {
      this.spinner.hide();
      this.router.navigate(['/asso_booking-contract/associate-staff'], {skipLocationChange: true});
      this.dataSource = suc.data.responseData;
    }, (error) => {
      this.spinner.hide();
      this.tosterservice.error(error.error.errors.error[0].description);
    });
  }

  GetAssociateStaffByid(id) {
    this.spinner.show();
    this.apiService.get(`secure/v1/associates/staff/${id}`).subscribe((suc) => {
      this.spinner.hide();
      this.AssociateStaffData = suc.data.responseData;
      this.AssociateStaffData.status=suc.data.responseData.status;
      this.AssociateStaffData.maritalStatus=suc.data.responseData.maritalStatus.toString().trim();
      this.AssociateStaffData.desigId=suc.data.responseData.desigId;
      this.assocDeptList.desigId=suc.data.responseData.desigId;
      console.log(this.AssociateStaffData);
      this.expDate();
    }, (error) => {
      this.spinner.hide();
      this.tosterservice.error(error.error.errors.error[0].description);
    });
  }

  assocDeptList:any=[];
 GetreferenceList() {
    this.spinner.show();
    this.apiService.get(`secure/v1/associates/staff/`).subscribe((suc) => {
      this.spinner.hide();
      this.assocDeptList = suc.data.referenceData.designationList;
      this.assocDeptList.desigId=suc.data.referenceData.designationList[0].id;
    }, (err) => {
      this.spinner.hide();
    });
  }


  UpdateAssociateStaff() {
    this.spinner.show();
    this.AddNewDesignation();
    this.apiService.post(`secure/v1/associates/staff`, this.AssociateStaffData).subscribe((suc) => {
      this.spinner.hide();
      this.router.navigate(['/asso_booking-contract/associate-staff'], {skipLocationChange: true});
      this.dataSource = suc.data.responseData;
    }, (error) => {
      this.spinner.hide();
      this.tosterservice.error(error.error.errors.error[0].description);
    });
  }

  nextReadMode() {
    this.router.navigate(['/asso_booking-contract/associate-staff'], {skipLocationChange: true});
  }

  flg = false;
  designationvalue
  openAddDesignationModal() {
    const dialogref = this.dialog.open(AddDesignationComponent, {
      width: '30vw',
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
    dialogref.afterClosed().subscribe(result => {
      this.designationvalue = result.obj;
      for (let i = 0; i < this.assocDeptList.length; i++) {
        const element = this.assocDeptList[i];
        if (element.id == 0) {
          element.lookupVal = result.obj.Designation;
          element.descr = result.obj.Description;
          this.flg = true;
          break;
        }
      }
      if (this.flg == false) {
        this.assocDeptList.push({ id: 0, lookupVal: result.obj.Designation, descr: result.obj.Description });
      }
      this.assocDeptList.desigId=0;
      // this.AssociateStaffData.desigId=0;
    });
  }

  AddNewDesignation() {
    if (this.assocDeptList.desigId == 0) {
      this.AssociateStaffData.designation = this.designationvalue.Designation;
      this.AssociateStaffData.designationDescr = this.designationvalue.Description;
      this.AssociateStaffData.desigId = null;
    }
    else {
      this.AssociateStaffData.desigId = this.assocDeptList.desigId;
      this.AssociateStaffData.designation = null;
      this.AssociateStaffData.designationDescr = null;
    }
  }

  
  panChk=true;
  onPanChange(event){
    let num = event.target.value;
   this.panChk= Validation.panValidation(num);
  }
  
  emailChk=true;
  onEmailChange(event){
    let email = event.target.value;
    this.emailChk= Validation.emailValidation(email);
  }
  
  /*---------- check valid date ---------- */
  checkValidDate(field) {
    let expYear = parseInt(this.datePipe.transform(this.AssociateStaffData[field], 'yyyy'));
    if (expYear > 9999) {
      this.AssociateStaffData[field] = '';
    }
  }

  /*---------- On change Effective Date --------------- */
  effectiveDate() {
    let effYear = parseInt(this.datePipe.transform(this.AssociateStaffData.effectiveDt, 'yyyy'))
    if (effYear > 9999) {
      this.AssociateStaffData.effectiveDt = '';
    } else {
      let b = this.datePipe.transform(this.AssociateStaffData.effectiveDt, 'yyyy-MM-dd');
      let c = this.datePipe.transform(this.AssociateStaffData.expDt, 'yyyy-MM-dd');

      if (c) {
        if (b < c) {
          this.isValidEffectiveDt = false;
        }
        else {
          this.isValidEffectiveDt = true;
          this.isValidExpDt = false;
        }
      } else {
        this.isValidEffectiveDt = false
      }
    }
   }


   /*------------- On change Expiry date--------------------*/

  expDate() {
    let expYear = parseInt(this.datePipe.transform(this.AssociateStaffData.expDt, 'yyyy'))
    if (expYear > 9999) {
      this.AssociateStaffData.expDt = '';
    } else {
      let a = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      let b = this.datePipe.transform(this.AssociateStaffData.effectiveDt, 'yyyy-MM-dd');
      let c = this.datePipe.transform(this.AssociateStaffData.expDt, 'yyyy-MM-dd');

      if (b && c !== null) {
        if (b < c && c > a) {
          this.isValidExpDt = false;
          this.isValidEffectiveDt = false;
        }
        else {
          this.isValidExpDt = true;
          this.isValidEffectiveDt = false;
        }
      } else {
        this.isValidExpDt = false;
        this.isValidEffectiveDt = false;
      }
    }
  }


}


export class AssociateStaffElement {
  aadhaarNum: string
  altMob: string
  assocId: number
  assocStaffCode: string
  crtdBy: string
  crtdDt: string
  descr: string
  desigId: string
  designation: string
  designationDescr: string
  dlNum: string
  dob: string
  effectiveDt: string
  emergencyPhone: string
  estDt: string
  expDt: string
  gender: string
  id: number
  maritalStatus: string
  mob: string
  ofcEmail: string
  panNum: string
  resAddr: string
  staffFname: string
  staffLname: string
  staffMname: string
  status: number
  updBy: string
  updDt: string
  whatsappNum: string
}
