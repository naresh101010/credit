import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { AppSetting } from 'src/app/app.setting';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { CreateAssoModel } from 'src/app/core/models/createAssoModel';
import { ApiService } from 'src/app/core/services/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ErrorConstants } from '../../core/models/constants';
import { DatePipe } from '@angular/common';
import { Validation } from 'src/app/core/directives/validation';
import { AuthorizationService } from '../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { SearchBankBranchComponent } from 'src/app/dialog/search-bank-branch/search-branch.component';

@Component({
  selector: 'app-create-associate',
  templateUrl: './create-associate.component.html',
  styleUrls: ['./create-associate.component.css'],
  providers: [DatePipe]
})
export class CreateAssociateComponent implements OnInit {
  createAssociateFormGroup: FormGroup;
  associateData: CreateAssoModel;
  assocDeptList = new Array();
  assocTypeList = new Array();
  paymentModeList = new Array();
  assocRegdTypeList = new Array();
  id: number;
  resPincodeData: any = [];
  resPincodeError: boolean;
  offcPincodeData: any[] = [];
  offcPincodeError: boolean;
  minDate: Date;
  isValidEffectiveDt: boolean;
  isValidExpDt: boolean;
  residentAddress : FormGroup;
  officeAddress : FormGroup;
  offCity : any;
  resCity : any;
  searchDeptName = '';
  searchDeptName1 = '';
  effMinDate : any;
  perList: any = [];
  gstFlag: boolean = false;
  cashBankList: any;
  accountTypeList: any;
  kycFlag : number;
  statusList : any[] = [        // for security fix
    {value: 1, text : 'ACTIVE'},
    {value: 0, text : 'INACTIVE'}
  ]; 
  isIDExist: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    public fb: FormBuilder,
    public dialog: MatDialog,
    private appservice: ApiService,
    private tosterservice: ToastrService,
    private datePipe: DatePipe,
    private authorizationService : AuthorizationService,
    private permissionsService: NgxPermissionsService) { }

    readMode:boolean=false;
    
  ngOnInit() {
    this.authorizationService.setPermissions('ASSOCIATE');
    this.perList = this.authorizationService.getPermissions('ASSOCIATE') == null ? [] : this.authorizationService.getPermissions('ASSOCIATE');
    this.permissionsService.loadPermissions(this.perList);

    this.id = AppSetting.associateId;

    if(AppSetting.associateId != null){ // security fix
      this.isIDExist = true;
    } else {
      this.isIDExist = false;
    }
    this.spinner.show();
    
    let e = new Date();  
    e.setDate(e.getDate());
    this.minDate = e;
    
    this.createAssociateFormBuilder();

    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.readMode = true;
      }
      else {
        this.readMode = false;
      }
    });

    if (AppSetting.associateId != null) {
      
      this.appservice.get("secure/v1/associates/" + AppSetting.associateId)
        .subscribe((suc) => {
          this.associateData = suc.data.responseData;
          this.assocDeptList = suc.data.referenceData.assocDeptList;
          this.assocTypeList = suc.data.referenceData.assocTypeList;
          this.paymentModeList = suc.data.referenceData.paymentModeList;
          this.assocRegdTypeList = suc.data.referenceData.assocRegdTypeList;
          this.cashBankList = suc.data.referenceData.cashBankList;
          this.accountTypeList = suc.data.referenceData.accountTypeList;
          this.kycFlag = this.associateData.kycFlag;
          // security fix
          this.statusList = [
            {value: 1, text : !this.id ? 'DRAFT' :(this.kycFlag == 1 ? 'ACTIVE' : 'DRAFT') },
            {value: 0, text : 'INACTIVE'}
          ]
          this.setAssociateFormValue();
          this.effMinDate = this.associateData.effectiveDt ? this.associateData.effectiveDt : new Date();      
          this.spinner.hide();
        }, (err) => {
          this.spinner.hide();
        });

    } else {
    //  this.effMinDate = new Date();
      this.appservice.get("secure/v1/associates")
        .subscribe((suc) => {
          this.assocDeptList = suc.data.referenceData.assocDeptList;
          this.assocTypeList = suc.data.referenceData.assocTypeList;
          this.paymentModeList = suc.data.referenceData.paymentModeList;
          this.assocRegdTypeList = suc.data.referenceData.assocRegdTypeList;
          this.cashBankList = suc.data.referenceData.cashBankList;
          this.accountTypeList = suc.data.referenceData.accountTypeList;
          this.spinner.hide();
          // security fix
          this.statusList = [
            {value: 1, text : !this.id ? 'DRAFT' :(this.kycFlag == 1 ? 'ACTIVE' : 'DRAFT') },
            {value: 0, text : 'INACTIVE'}
          ]
        }, (err) => {
          this.spinner.hide();
        });
    }
  }

  branchdata: any;
  bankName: any;
  onSelectBank(event) {
    console.log('Form group',this.createAssociateFormGroup.controls);
    console.log('event', event);
    this.createAssociateFormGroup.controls['bankAddr'].reset();
    this.bankName = event;
    this.spinner.show();
    this.appservice.get(`/secure/v1/fusion/cashbanks/branches/bankname/${this.bankName}`).subscribe(res => {
      this.branchdata = res;
      this.spinner.hide();
    })
  }

  createAssociateFormBuilder() {

    this.createAssociateFormGroup = this.fb.group({
      id: [''],
      tdsPercent: [''],
      aadhaarNum: ['', Validators.required],
      altMob: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10), Validators.pattern("^[0-9]{10,10}$")]],
      assocRegdType: ['', Validators.required],
      bankAcc: ['', Validators.required],
      bankAddr: ['', Validators.required],
      bankName: ['', Validators.required],
      chqFavour: ['', Validators.required],
      companyName: ['', Validators.required],
      contactFname: ['', Validators.required],
      contactLname: ['', Validators.required],
      contactMname: [''],
      // crtdBy: ['', Validators.required],
      gstnRegdFlag: [null, Validators.required],
      tdsCertFlag: [null, Validators.required],
      annivDt: [''],
      // crtdDt: ['', Validators.required],
      descr: [''],
      dob: ['', Validators.required],
      effectiveDt: ['', Validators.required],
      emergencyPhone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      estDt: ['', Validators.required],
      expDt: [''],
      gstinNum: ['', Validators.required],
      gender: ['', Validators.required],
      ifscCode: ['', Validators.required],
      lkpPymtMethodId: ['', Validators.required],
      mob: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      ofcEmail: ['', Validators.required],
      panNum: ['', Validators.required],
      personalEmail: ['', Validators.required],
      status: [1, Validators.required],
      // updDt: ['', Validators.required],
      whatsappNum: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      maritalStatus: [null, Validators.required],
      securityDepositAmt: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      // updBy: ['', Validators.required],
      advncAmt: [''],
      ofcAddrBook: this.fb.group({
        id: [''],
        addr1: ['', Validators.required],
        addr2: [''],
        addr3: [''],
        longitude: [''],
        latitude: [''],
        pincodeId: ['',Validators.required],
        effectiveDt: [''],
        status: [''],
        expDt: [''],
      }),
      resAddrBook: this.fb.group({
        id: [''],
        addr1: ['', Validators.required],
        addr2: [''],
        addr3: [''],
        longitude: [''],
        latitude: [''],
        pincodeId: ['',Validators.required],
        effectiveDt: [''],
        status: [''],
        expDt: [''],
      }),
      assocDeptMaps: ['',Validators.required],
      assocTypeMaps: ['',Validators.required],
      lkpAccountTypeId: ['', Validators.required],
      bankPartyId: [''],
      branchPartyId: ['']
      //  assocStaffs: this.fb.array([this.fb.group({})]),

    });
    this.onChangeGstnRegFlag(0);

    if(this.id == null){
      this.f.status.disable();
    }
  
    this.residentAddress = this.createAssociateFormGroup.get('resAddrBook') as FormGroup;
    this.officeAddress = this.createAssociateFormGroup.get('ofcAddrBook') as FormGroup;

  }

  get f() { return this.createAssociateFormGroup.controls }

  setAssociateFormValue() {
    var editArrayAssocTypeMaps = new Array(this.associateData.assocTypeMaps.length);
    for (let eadm = 0; eadm < this.associateData.assocTypeMaps.length; eadm++) {
      let obj = {
        crtdBy: this.associateData.assocTypeMaps[eadm].crtdBy,
        crtdDt: this.associateData.assocTypeMaps[eadm].crtdDt,
        effectiveDt: this.associateData.assocTypeMaps[eadm].effectiveDt,
        expDt: this.associateData.assocTypeMaps[eadm].expDt,
        id: this.associateData.assocTypeMaps[eadm].id,
        lkpAssocTypeId: this.associateData.assocTypeMaps[eadm].lkpAssocTypeId,
        status: this.associateData.assocTypeMaps[eadm].status,
        updBy: this.associateData.assocTypeMaps[eadm].updBy,
        updDt: this.associateData.assocTypeMaps[eadm].updDt
      }
      editArrayAssocTypeMaps[eadm] = obj;
    }

    var editArrayAssocDeptMaps = new Array(this.associateData.assocDeptMaps.length);
    for (let adm = 0; adm < this.associateData.assocDeptMaps.length; adm++) {
      let obj = {
        crtdBy: this.associateData.assocDeptMaps[adm].crtdBy,
        crtdDt: this.associateData.assocDeptMaps[adm].crtdDt,
        effectiveDt: this.associateData.assocDeptMaps[adm].effectiveDt,
        expDt: this.associateData.assocDeptMaps[adm].expDt,
        id: this.associateData.assocDeptMaps[adm].id,
        lkpAssocDeptId: this.associateData.assocDeptMaps[adm].lkpAssocDeptId,
        status: this.associateData.assocDeptMaps[adm].status,
        updBy: this.associateData.assocDeptMaps[adm].updBy,
        updDt: this.associateData.assocDeptMaps[adm].updDt
      }
      editArrayAssocDeptMaps[adm] = obj;
    }
    this.resPincodeData = [];
    this.offcPincodeData = [];

    let pincodeOffc = {};
    pincodeOffc["pincode"] = this.associateData.ofcAddrBook.pincodeId;
    pincodeOffc["pincodeId"] = this.associateData.ofcAddrBook.pincodeId;
    this.offcPincodeData.push(pincodeOffc);
    let pincodeRes = {};
    pincodeRes["pincode"] = this.associateData.resAddrBook.pincodeId;
    pincodeRes["pincodeId"] = this.associateData.resAddrBook.pincodeId;
    this.resPincodeData.push(pincodeRes);

    //   this.createAssociateFormGroup.setValue({
    this.createAssociateFormGroup.patchValue({
      id: this.associateData.id,
      tdsPercent: this.associateData.tdsPercent,
      aadhaarNum: this.associateData.aadhaarNum,
      altMob: this.associateData.altMob,
      assocRegdType: this.associateData.assocRegdType,
      bankAcc: this.associateData.bankAcc,
      bankName: this.associateData.bankName,
      chqFavour: this.associateData.chqFavour,
      companyName: this.associateData.companyName,
      contactFname: this.associateData.contactFname,
      contactLname: this.associateData.contactLname,
      contactMname: this.associateData.contactMname,
     // crtdBy: this.associateData.crtdBy,
      gstnRegdFlag: this.associateData.gstnRegdFlag,
      tdsCertFlag: this.associateData.tdsCertFlag,
      annivDt: this.associateData.annivDt,
     // crtdDt: this.associateData.crtdDt,
      descr: this.associateData.descr,
      dob: this.associateData.dob,
      effectiveDt: this.associateData.effectiveDt,
      emergencyPhone: this.associateData.emergencyPhone,
      estDt: this.associateData.estDt,
      expDt: this.associateData.expDt,
      gstinNum: this.associateData.gstinNum,
      gender: (this.associateData.gender).trim(),
      ifscCode: this.associateData.ifscCode,
      lkpPymtMethodId: this.associateData.lkpPymtMethodId,
      mob: this.associateData.mob,
      ofcEmail: this.associateData.ofcEmail,
      panNum: this.associateData.panNum,
      personalEmail: this.associateData.personalEmail,
      status: this.associateData.status,
     // updDt: this.associateData.updDt,
      whatsappNum: this.associateData.whatsappNum,
      maritalStatus: (this.associateData.maritalStatus).trim(),
      securityDepositAmt: this.associateData.securityDepositAmt,
     // updBy: this.associateData.updDt,
      advncAmt: this.associateData.advncAmt,
      ofcAddrBook: this.associateData.ofcAddrBook,
      resAddrBook: this.associateData.resAddrBook,
      assocTypeMaps: parseInt(editArrayAssocTypeMaps[0].lkpAssocTypeId),
      assocDeptMaps: editArrayAssocDeptMaps[0].lkpAssocDeptId,
      lkpAccountTypeId: this.associateData.lkpAccountTypeId,
      bankPartyId: this.associateData.bankPartyId,
      branchPartyId: this.associateData.branchPartyId,
      bankAddr: this.associateData.bankAddr
      //  assocStaffs: this.editArrayAssocStaffs

    });
    this.onChangeGstnRegFlag(this.associateData.gstnRegdFlag);
    this.expDate();
    if(this.readMode){
      this.createAssociateFormGroup.disable();

      this.residentAddress.controls.addr2.enable();
      this.officeAddress.controls.addr2.enable();
      this.residentAddress.controls.addr3.enable();
      this.officeAddress.controls.addr3.enable();

      if(this.associateData.ofcAddrBook.pincodeId){
      this.appservice.get('secure/v1/geography/pincode/'+this.associateData.ofcAddrBook.pincodeId).subscribe(data => {
        let ob = ErrorConstants.validateException(data);
          if (ob.isSuccess) {
            this.offCity = data.data.responseData[0].city;
          }
      });
      }
      if(this.associateData.resAddrBook.pincodeId){
        this.appservice.get('secure/v1/geography/pincode/'+this.associateData.resAddrBook.pincodeId).subscribe(data => {
          let ob = ErrorConstants.validateException(data);
            if (ob.isSuccess) {
              this.resCity = data.data.responseData[0].city;
            }
        });
        }
    }
  }

  convertAssocTypResToRef(resdata, refdata) {
    let editArrya = [];
    resdata.forEach(element => {
      editArrya.push(refdata.find(({ id }) => id == element.lkpAssocTypeId));
    });

    return editArrya;
  }

  //------------------------Assign Tns Value --------------//

  onSelectAassignTdsValue(elmnt) {
    this.createAssociateFormGroup.controls['tdsPercent'].setValue(this.assocRegdTypeList.find(({ id }) => id === elmnt).tds);
  }
  onChangeTDSCertifiate(value) {
    if(value == 0) {
      if(this.f.assocRegdType.value) {
        this.onSelectAassignTdsValue(this.f.assocRegdType.value);
      } 
    }
  }

  saveAssociateContract() {

    console.log('form',this.createAssociateFormGroup)
    this.createAssociateFormGroup.markAllAsTouched();
    if(this.createAssociateFormGroup.invalid || this.isValidEffectiveDt || this.isValidExpDt){
      return;
    }
    this.f.status.enable();
    if (AppSetting.associateId != null) {
      let finalData = this.createAssociateFormGroup.value;
      finalData.dob = this.datePipe.transform(this.f.dob.value, 'yyyy-MM-dd');
      finalData.annivDt = this.datePipe.transform(this.f.annivDt.value, 'yyyy-MM-dd');
      finalData.estDt = this.datePipe.transform(this.f.estDt.value, 'yyyy-MM-dd');
      finalData.effectiveDt = this.datePipe.transform(this.f.effectiveDt.value, 'yyyy-MM-dd');
      finalData.expDt = this.datePipe.transform(this.f.expDt.value, 'yyyy-MM-dd');
      finalData.panNum = (this.createAssociateFormGroup.value.panNum).toUpperCase();
      if(finalData.gstnRegdFlag !== 1 && (finalData.gstinNum === '' || finalData.gstinNum == undefined)){
        delete finalData.gstinNum;
      } else {
        finalData.gstinNum = (this.createAssociateFormGroup.value.gstinNum).toUpperCase();
      }

      let previousAssDeptMaps = this.associateData.assocDeptMaps.find(x => x.lkpAssocDeptId == this.createAssociateFormGroup.value.assocDeptMaps);
      if (previousAssDeptMaps !== undefined) {
        finalData.assocDeptMaps = [
          {
            "id": previousAssDeptMaps.id,
            "lkpAssocDeptId": previousAssDeptMaps.lkpAssocDeptId
          }]
      } else {
        finalData.assocDeptMaps = [
          { "lkpAssocDeptId": this.createAssociateFormGroup.value.assocDeptMaps }
        ]
      }
      if(this.associateData.assocCode){
        finalData.assocCode = this.associateData.assocCode;
      }
      let previousAssTypeMaps = this.associateData.assocTypeMaps.find(x => x.lkpAssocTypeId == this.createAssociateFormGroup.value.assocTypeMaps);
      if (previousAssTypeMaps !== undefined) {
        finalData.assocTypeMaps = [
          {
            "id": previousAssTypeMaps.id,
            "lkpAssocTypeId": previousAssTypeMaps.lkpAssocTypeId
          }]
      } else {
        finalData.assocTypeMaps = [
          { "lkpAssocTypeId": this.createAssociateFormGroup.value.assocTypeMaps }
        ]
      }
      this.spinner.show();
      this.appservice.post("secure/v1/associates", finalData)
        .subscribe((suc) => {
          this.spinner.hide();
          AppSetting.associateId = suc.data.responseData;
          AppSetting.associateData = finalData;
          let dept = this.assocDeptList.find(x => x.id === finalData.assocDeptMaps[0].lkpAssocDeptId);
          if(dept !== undefined) {
            AppSetting.associateDepartment = dept.lookupVal;
          } else {
            AppSetting.associateDepartment = '';
          }
          this.router.navigate(['/asso_delivery-contract/associate-kyc'], {skipLocationChange: true});
         
        }, (err) => {
          this.spinner.hide();
          this.tosterservice.error(err.error.errors.error[0].description);
        });

    } else {

      let newArrayAssocDeptMaps: any = [];
      newArrayAssocDeptMaps.push({ "lkpAssocDeptId": this.createAssociateFormGroup.value.assocDeptMaps });

      let newArrayAssocTypeMaps: any = [];
      newArrayAssocTypeMaps.push({ "lkpAssocTypeId": this.createAssociateFormGroup.value.assocTypeMaps });
      
      let finalData = this.createAssociateFormGroup.value;
      finalData.dob = this.datePipe.transform(this.f.dob.value, 'yyyy-MM-dd');
      finalData.annivDt = this.datePipe.transform(this.f.annivDt.value, 'yyyy-MM-dd');
      finalData.estDt = this.datePipe.transform(this.f.estDt.value, 'yyyy-MM-dd');
      finalData.effectiveDt = this.datePipe.transform(this.f.effectiveDt.value, 'yyyy-MM-dd');
      finalData.expDt = this.datePipe.transform(this.f.expDt.value, 'yyyy-MM-dd');
      finalData.assocDeptMaps = newArrayAssocDeptMaps;
      finalData.assocTypeMaps = newArrayAssocTypeMaps;
      finalData.panNum = (this.createAssociateFormGroup.value.panNum).toUpperCase();

      if(finalData.gstnRegdFlag !== 1 && (finalData.gstinNum === '' || finalData.gstinNum == undefined)){
        delete finalData.gstinNum;
      } else {
        finalData.gstinNum = (this.createAssociateFormGroup.value.gstinNum).toUpperCase();
      }

      this.spinner.show();
      this.appservice.post("secure/v1/associates", finalData)
        .subscribe((suc) => {
          this.spinner.hide();
          AppSetting.associateId = suc.data.responseData;
          AppSetting.associateData = finalData;
          let dept = this.assocDeptList.find(x => x.id === finalData.assocDeptMaps[0].lkpAssocDeptId);
          if(dept !== undefined) {
            AppSetting.associateDepartment = dept.lookupVal;
          } else {
            AppSetting.associateDepartment = '';
          }
          this.router.navigate(['/asso_delivery-contract/associate-kyc'], {skipLocationChange: true});
         
        }, (err) => {
          this.spinner.hide();
          this.tosterservice.error(err.error.errors.error[0].description);
        });
    }
  }

  //------------------------Pincode----------------------
  nextReadMode() {
    this.router.navigate(['/asso_delivery-contract/associate-kyc'], {skipLocationChange: true});
  }

  resPincodeSearch(str) {
    if (str.term.length > 6) {
      return false
    }
    this.resPincodeData = [];
    if (str) {
      if (str.term.length > 3 && str.term) {
        this.resPincodeError = false;
        this.appservice.get("secure/v1/geography/pincode/" + str.term).subscribe(success => {
          let ob = ErrorConstants.validateException(success);
          if (ob.isSuccess) {
            this.resPincodeData = success.data.responseData;
            if (this.resPincodeData.length == 0) {
              this.tosterservice.info('No Pincode found !!');
              return;
            }
            for (let val of this.resPincodeData) {
              val["pincodeId"] = val.pincode;
              //val["city"] = val.city.cityName;
            }
          }
         
        },
          error => {
            this.tosterservice.info('No Pincode found !!');
            this.spinner.hide();
          });
      } else {
        this.resPincodeError = true;
      }
    }
  }

  resOnClear() {
    this.resPincodeError = false;
    this.resPincodeData = [];
  }

  offcPincodeSearch(str) {
    if (str.term.length > 6) {
      return false
    }
    this.offcPincodeData = [];
    if (str) {
      if (str.term.length > 3 && str.term) {
        this.offcPincodeError = false;
        this.appservice.get("secure/v1/geography/pincode/" + str.term).subscribe(success => {
          let ob = ErrorConstants.validateException(success);
          if (ob.isSuccess) {
            this.offcPincodeData = success.data.responseData;
            if (this.offcPincodeData.length == 0) {
              this.tosterservice.info('No Pincode found !!');
              return;
            }
            for (let val of this.offcPincodeData) {
              val["pincodeId"] = val.pincode;
            }
          }
        
        },
          error => {
            this.tosterservice.info('No Pincode found !!');
            this.spinner.hide();
          });
      } else {
        this.offcPincodeError = true;
      }
    }
  }

  offcOnClear() {
    this.offcPincodeError = false;
    this.offcPincodeData = [];
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  /*------ On change GSTIN registered flag ---------- */
  onChangeGstnRegFlag(value) {
    if(value === 0) {
      this.gstFlag = true;
    } else {
      this.gstFlag = false;
    }
    if(value == 1){
      this.createAssociateFormGroup.controls.gstinNum.setValidators([Validators.required]);
      this.createAssociateFormGroup.controls.gstinNum.updateValueAndValidity();
    } else {
      this.f.gstinNum.clearValidators();
      this.createAssociateFormGroup.controls.gstinNum.updateValueAndValidity();
    }
  }

  /*---------- On change Effective Date --------------- */
  effectiveDate() {
    let effYear = parseInt(this.datePipe.transform(this.f.effectiveDt.value, 'yyyy'))
    if (effYear > 9999) {
      this.f.effectiveDt.setValue('');
    } else {
      let a = this.datePipe.transform(this.f.estDt.value, 'yyyy-MM-dd');
      let b = this.datePipe.transform(this.f.effectiveDt.value, 'yyyy-MM-dd');
      let c = this.datePipe.transform(this.f.expDt.value, 'yyyy-MM-dd');

      if(c && a){
        if (a <=b && b < c) {
          this.isValidEffectiveDt = false;
        }
        else {
          this.isValidEffectiveDt = true;
        }
      }
      else if(c){
        if (b < c) {
          this.isValidEffectiveDt = false;
        }
        else {
          this.isValidEffectiveDt = true;
        }
      }else if(a){
        if (b >= a) {
          this.isValidEffectiveDt = false;
        }
        else {
          this.isValidEffectiveDt = true;
        }
      }else{
        this.isValidEffectiveDt = false;
      }
    }
   }


   /*------------- On change Expiry date--------------------*/
   minExpDate = '';

  expDate() {
    let expYear = parseInt(this.datePipe.transform(this.f.expDt.value, 'yyyy'))
    if (expYear > 9999) {
      this.f.expDt.setValue('');
    } else {
      let a = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      let b = this.datePipe.transform(this.f.effectiveDt.value, 'yyyy-MM-dd')
      let c = this.datePipe.transform(this.f.expDt.value, 'yyyy-MM-dd')
      if (b && c !== null) {
        if (b <= c && c > a) {
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
      // if (c) {
      //   if (b <= c) {
      //     this.isValidExpDt = false;
      //   }
      //   else {
      //     this.isValidExpDt = true;
      //   }
      // } else {
      //   this.isValidEffectiveDt = false
      // }
    }
  }

   /*---------- check valid date ---------- */
   checkValidDate(control) {
    let expYear = parseInt(this.datePipe.transform(control.value, 'yyyy'));
    if (expYear > 9999) {
      control.setValue('');
    }
  }
  panChk=true;
  onPanChange(event){
    let num = event.target.value;
   this.panChk= Validation.panValidation(num);
  }

  gstnChk=true;
  onGstnChange(event){
    let num = event.target.value;
    this.gstnChk= Validation.gstinValidation(num);
  }

  emailChkOffice=true;
  onEmailChangeOffice(event) {
    let emailOffice = event.target.value;
    this.emailChkOffice = Validation.emailValidation(emailOffice);
  }

  emailChkPerosnal=true;
  onEmailChangePersonal(event){
    let emailPersonal = event.target.value;
    this.emailChkPerosnal= Validation.emailValidation(emailPersonal);
  }
  
  tdsFlag: boolean = false;
  tdsValid(event) {
    let t = event.target.value;
    if (t > 100) {
      this.tdsFlag = true;
    }
    else {
      this.tdsFlag = false;
    }
  }

  validateNumber(event) {
    const keyCode = event.keyCode;

    const excludedKeys = [8, 37, 39, 46];

    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      // event.preventDefault();
    }
  }

  selectBankBranch() {
    const dialogRefEdit = this.dialog.open(SearchBankBranchComponent, {
      width: '50vw',
      panelClass:'selectBranchDialog',
      data: { data: this.branchdata , 'partyID': this.f.branchPartyId.value, bname: this.f.bankName.value }
    });

    dialogRefEdit.afterClosed().subscribe(result => {
      if(result){
        this.createAssociateFormGroup.get('branchPartyId').setValue(result.data.BranchPartyId);
        this.createAssociateFormGroup.get('ifscCode').setValue(result.data.BranchNumber);
        this.createAssociateFormGroup.get('bankAddr').setValue(result.data.BankBranchName);
      }
    });
  }

}

