import { Component, OnInit } from '@angular/core';
import { UgdRequestService } from 'src/app/core/service/ugd-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/core/common.service';
import { AppComponent } from 'src/app/app.component';
import { FormGroup } from '@angular/forms';
import { BookingInformationService } from 'src/app/core/service/booking-information.service';
import { HeaderService } from 'src/app/core/util/header.service';
import { BranchService } from 'src/app/core/service/branch.service';
@Component({
  selector: 'app-create-re-routing-request',
  templateUrl: './create-re-routing-request.component.html',
  styleUrls: ['./create-re-routing-request.component.css']
})
export class CreateReRoutingRequestComponent implements OnInit {
  waybillInfo: FormGroup;
  oldWaybillDetails;
  allOfferings = [];
  detail = {};
  waybillNo;
  wayBillData;
  waybillStatus: any;
  lookupData: any;
  modeOfPayment: any;
  businnessType: any;
  offeringData: any;
  surfaceOfferingName: any;
  remark: any;
  availablePackage: any
  data: any;
  requestValues: { wayBillStatus: any; modeOfPayment: any; surfaceOfferingName: any; availablePackage: any; remark: any; sfxCode: any; businessType: any; serviceOfferingName: any; totalPackage: any; };
  wayBillNum: any;
  uploadId: any;
  offeringName: any;
  allLookUps: any = [];
  wayblReschId;
  coBranchId: any;
  requestedServiceOffering;
  remarks = '';
  availablePackages;
  sfxPrcContractcode;
  totalPackageCount;
  isRetail = false;
  destPincode;
  pincodeList: any;
  isDisable = false;

  constructor(
    private ugdservice: UgdRequestService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private commonService: CommonService,
    private appComp: AppComponent,
    private $bookingInfo: BookingInformationService,
    private headerUtil: HeaderService,
    private $branch: BranchService
  ) { }

  ngOnInit() {
    // this.waybillInfo = this.fb.group({
    //   eWaybillNoFlag: ['']
    // })
    this.getAllLookups();
    this.getAllOfferings();
    this.getLookUpType()
    // this.getBranchType();
    this.getCOBranch();
    this.getAllBranchisList();
    this.oldWaybillDetails = JSON.parse(sessionStorage.getItem('oldWaybill'));
    if (this.oldWaybillDetails) {
      this.spinner.show();
      this.wayBillNum = this.oldWaybillDetails.waybillNumber;
      this.isDisable = true;
      this.getOldBranchType();
    } else {
      this.getBranchType();
    }

  }
  raisedlookUp = [];
  getLookUpType() {
    this.commonService.getLookUpByType('LKP_WAYBILL_RESCH_BRANCH_LOC_REQ_TYPE').subscribe((res: any) => {
      console.log('res', res)
      this.raisedlookUp = res;
    }, (err: any) => {
      this.raisedlookUp = [];
    })
  }
  resheduleStatus = [];
  getRescheduleStatus() {
    this.commonService.getLookUpByType('WAYBILL_BOOKING_STATUS').subscribe((res: any) => {
      console.log('res', res);
      this.resheduleStatus = res;
    }, (err: any) => {
      this.resheduleStatus = [];
    })
  }
  resetForm() {
    this.requestValues = {
      wayBillStatus: '',
      modeOfPayment: '',
      surfaceOfferingName: 0,
      availablePackage: '',
      remark: '',
      sfxCode: '',
      businessType: '',
      serviceOfferingName: '',
      totalPackage: '',
    }
  }

  onKeyUp(event) {
    this.wayBillData = undefined;
    this.requestedServiceOffering = undefined;
    this.availablePackages = undefined;
    this.selectedBranchId = undefined;
    this.sfxPrcContractcode = undefined;
    this.totalPackageCount = undefined;
    // this.resetForm();
    let wayBillNumber = event.target.value;
    this.wayBillNum = wayBillNumber;
    let waybillLength = event.target.value.length;
    if (waybillLength >= 6 && waybillLength <= 15) {
      this.getwayBill(wayBillNumber);
    } //this will have the length of the text entered in the input box
    console.log(waybillLength);
  }
  checkPinCodeLength(pincodeId) {

    if (pincodeId.length <= 5) {
      //    if (term.length <=5) {
      return true;
    }
    return false;
  }
  invalidPincode: boolean = false;
  getpincodeDetailsByPincode(pincodeId) {

    this.pincodeList = [];
    if (pincodeId.term) {
      // this.searchConsignee.pincode = pincodeId.term || pincodeId.pincode;
      if (pincodeId.term.toString().length >= 3) {
        return this.gettingPincode(pincodeId.term)
      }
      else if (pincodeId.term.toString().length >= 1 && pincodeId.term.toString().length < 6) {
        this.invalidPincode = true;
      }
      else {
        this.invalidPincode = false;
      }
    }
    else if (pincodeId) {
      return this.gettingPincode(pincodeId);
    }

  }
  checkWaybillSelceted() {
    // if (this.bookingInfoObj.hubDeliveryFlag == 0) {
    if (this.pincodeList.length == 1) {
      if (
        this.destPincode == this.pincodeList[0].pincode
      ) {
        return;
      }
      else {
        this.destPincode = '';
      }
    }
    // }

  }
  gettingPincode(pincodeId) {

    this.$bookingInfo.getPincodeIdByPincode(pincodeId, this.headerData).subscribe(
      (Response) => {

        this.pincodeList = Response;
        this.pincodeList.forEach(elem => {
          elem.pincode = JSON.parse(elem.pincode);
        })
        console.log(Response);
        if (this.pincodeList.length == 1) {
          if (this.destPincode == this.pincodeList[0].pincode) {
            return this.getPincodebyId(this.pincodeList[0]);
          }
        }
      },
      (err) => {

        this.destPincode = '';
        this.invalidPincode = true;
        // this.consigneeList = [];
      }
    );
  }
  isSafextension = false;
  lkpSafextType;
  branchId = JSON.parse(sessionStorage.getItem("branchId"))
  userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  headerData = {
    branchCode: "02",
    journeyId: "01",
    originUserType: "03",
    branchId: this.branchId,
    userId: this.userDetails.userId,
  } as any;
  pincodeId;
  getPincodebyId(pincodeId) {
    console.log('getPincodebyId');
    if (pincodeId == undefined) {
      return;
    }
    if (pincodeId.id) {

      console.log(pincodeId);
      this.pincodeId = pincodeId.id
      this.$bookingInfo.getPincodeByPincodeId(pincodeId.id, this.headerData).subscribe(resp => {

        this.invalidPincode = false;
        this.destPincode = pincodeId.pincode;
        // this.bookingInfoObj.destPincodeId = resp.id;
        this.isSafextension = pincodeId.isSafextension;
        if (this.isSafextension) {
          this.allLookUps.forEach((elem) => {
            if (resp.lkpSafextTypeId == elem.id) {
              this.lkpSafextType = elem.lookupVal;
            }
          });
        }
      });
    }
  }

  emptyData() {
    this.pincodeList = [];
  }
  onClear() {

  }

  otherBranch = false;
  inTransit = false;
  isA2A = false;
  contractType = ''

  async getwayBill(wayBillNumber) {
    this.layingAt = undefined;
    this.wayBillData = undefined;
    this.spinner.show();
    this.ugdservice.getWayBillData(wayBillNumber).subscribe((res: any) => {
      let transit = false;
      let booking = false;
      let co = false;
      const branch = sessionStorage.getItem('branchId');
      const status = this.refType(res.data.responseData.wayblCurrStatusLookupId)
      if (status !== 'MANIFEST INITIATED') {
        if (status === 'OPERATIONAL CLOSE') {
          this.appComp.showMessage('Operational closed waybill cannot be Rebooked', 'danger');
        } else {
          this.appComp.showMessage('Waybill is not manifested', 'danger');
        }
        this.wayBillNum = '';
        this.spinner.hide();
        return
      }

      if (Number(branch) === res.data.responseData.bookingBranchId) {
        booking = true;
      }

      console.log('after layinga at')
      if (branch && res) {
        if (res.data) {
          if (this.refType(res.data.responseData.wayblCurrStatusLookupId) === 'IN-TRANSIT') {
            transit = true;
          }
        }
      }
      if (Number(branch) === Number(this.coBranchId)) {
        co = true
      }
      if (transit) {
        this.appComp.showMessage('IN-TRANSIT Waybill can not be modified', 'danger');
        this.otherBranch = true;
        this.spinner.hide();
        return
      }
      if ((!booking && !co)) {
        this.appComp.showMessage('Branch not authorized to raise rerouting request ', 'danger');
        this.otherBranch = true;
        this.spinner.hide();
        return
      }
      this.getLayingAt(res.data.responseData.waybillId)


      this.wayBillData = res.data.responseData;
      if (!this.wayBillData.msaCustId || this.wayBillData.msaCustId === 0) {
        this.isRetail = true;
      } else {
        this.isRetail = false;
      }
      this.lookupData = res.data.referenceData.referenceItemList;
      this.sfxPrcContractcode = this.wayBillData.sfxPrcContractcode;
      this.totalPackageCount = this.wayBillData.totalPackageCount;
      if (!this.totalPackageCount || this.totalPackageCount === 0) {
        this.appComp.showMessage('Total packages cannot be null', 'danger');
      }
      // this.getpincodeDetailsById(this.wayBillData.destPincodeId);

      console.log('waybill data', this.wayBillData);
      if (!this.isRetail) {
        if (this.wayBillData.sfxPrcContractcode) {
          let subString = this.wayBillData.sfxPrcContractcode.substring(0, 3);
          subString = subString.toUpperCase();
          // let contractType = '';
          if (subString === 'PRC') {
            this.contractType = 'PRC';
          } else {
            this.contractType = 'CREDIT';
          }
          if (this.wayBillData.prcCntrId) {
            this.getRequestedOfferings(this.contractType, this.wayBillData.prcCntrId);
          } else {
            this.getContractDetails(this.contractType, this.wayBillData.sfxPrcContractcode);
          }
          // if (this.refType(this.wayBillData.businessTypeLookupId) !== 'ANYWHERE TO ANYWHERE') {
          //   this.getContractDetails(this.contractType, this.wayBillData.sfxPrcContractcode)
          // } else {
          //   this.offeringData = this.allServiceOfferings;
          //   this.offeringData = this.offeringData.filter(el => el.id === this.wayBillData.serviceOfferingId);
          //   if (this.offeringData.length > 0) {
          //     this.requestedServiceOffering = this.wayBillData.serviceOfferingId;
          //   }
          //   this.callCommercial();
          //   this.isA2A = true;
          //   this.spinner.hide();
          // }
        } else {
          this.isRetail = true;
          this.offeringData = this.allServiceOfferings;
          if (this.offeringData.length > 0) {
            this.requestedServiceOffering = this.wayBillData.serviceOfferingId;
          }
          this.callCommercial();

          this.spinner.hide();
        }
      } else {
        this.isRetail = true;
        this.contractType = 'RETAIL';

        this.offeringData = this.allServiceOfferings;
        if (this.offeringData.length > 0) {
          this.requestedServiceOffering = this.wayBillData.serviceOfferingId;
        }
        this.callCommercial();
        this.spinner.hide();
      }
      this.spinner.hide();
    }, (err: any) => {
      this.spinner.hide();
    })
  }

  updateDetails() {

  }

  getpincodeDetailsById(pincodeId) {


    if (pincodeId == null) {
      this.destPincode = '';
      return;
    }
    if (pincodeId == 0) {
      this.appComp.showMessage(`Selected hub has no pincode Id`, "danger");
      this.destPincode = '';
      // this.searchtext = '';
      return;
    }
    this.$bookingInfo.getPincodeByPincodeId(pincodeId, this.headerData).subscribe(
      (Response) => {
        if (Response) {
          this.invalidPincode = false;
          this.destPincode = Response.pincode;
          this.invalidPincode = false;
          this.isSafextension = Response.isSafextension;
          if (this.destPincode) {
            this.getpincodeDetailsByPincode(this.destPincode)
          }
          if (this.isSafextension) {
            this.allLookUps.forEach((elem) => {
              if (Response.lkpSafextTypeId == elem.id) {
                this.lkpSafextType = elem.lookupVal;
              }
            });
          }
          var isPresent = [];
          this.allLookUps.forEach((elem) => {
            if (elem.addrBook.pincodeId == Response.pincode) {
              isPresent.push(elem);
            }
          });
          // this.consigneeList = [...isPresent];
        }
      },
      (err) => {
        // this.invalidPincode = true;
        this.destPincode = '';
        // this.searchtext = '';
      }
    );
  }
  getOldBranchType() {
    const branchId = sessionStorage.getItem('branchId');
    const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));

    // const headers = this.headerUtil.getHeader();
    const headerData = {
      branchCode: "02",
      journeyId: "01",
      originUserType: "03",
      branchId: branchId,
      userId: userDetails.userId,
    } as any;
    let res: any
    this.$bookingInfo.branchMannualOrAuto(branchId, headerData).subscribe((res: any) => {
      this.branchType = res.responseData
      this.getwayBill(this.oldWaybillDetails.waybillNumber);
    })
  }
  branchType = [];
  getBranchType() {
    const branchId = sessionStorage.getItem('branchId');
    const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));

    // const headers = this.headerUtil.getHeader();
    const headerData = {
      branchCode: "02",
      journeyId: "01",
      originUserType: "03",
      branchId: branchId,
      userId: userDetails.userId,
    } as any;
    let res: any
    this.$bookingInfo.branchMannualOrAuto(branchId, headerData).subscribe((res: any) => {
      this.branchType = res.responseData
    })
  }
  layingAt;
  selectedBranchId;
  // branchCode
  getLayingAt(id) {
    this.ugdservice.getLayingAt(id).subscribe((res: any) => {
      console.log('aying at res', res);
      this.layingAt = res.data.responseData;
      if (this.layingAt) {
        if (this.layingAt.availableAtBranchId) {
          this.selectedBranchId = this.layingAt.availableAtBranchId;
        } else {
          const branch = sessionStorage.getItem('branchId');
          this.selectedBranchId = Number(branch);
        }
      }
    }, (err: any) => {
      const branch = sessionStorage.getItem('branchId');
      this.selectedBranchId = Number(branch);
    });
  }
  branchList = [];
  getAllBranchisList() {
    this.spinner.show();
    this.$branch.getBranchDetails().subscribe((response) => {
      if (response) {
        this.branchList = response;
      }
      this.spinner.hide();
    }, (err: any) => {
      this.spinner.hide();
    });
  }
  getBranch(id) {
    if (!id) {
      return '';
    }
    const nameData = this.branchList.filter((ref) => ref.branchId === id);
    let name = "";
    if (nameData[0]) {
      name = nameData[0].branchCode;
    }
    if (!name || name === 'undefined') {
      name = ''
    }
    return name;
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  getAllLookups() {
    this.commonService.getAllLookups().subscribe((res: any) => {
      console.log('res getalllookups', res);
      this.allLookUps = res;
    }, (err: any) => {

    })
  }
  getOfferings() {
    this.ugdservice.getServiceOffering().subscribe((res: any) => {
      console.log('response', res)
      if (res.status == 'SUCCESS') {
        this.offeringData = res.data.responseData;
        let serviceId = this.offeringData.filter(data => data.id == this.wayBillData.serviceOfferingId);
        this.surfaceOfferingName = serviceId;
        if (this.surfaceOfferingName) {
          this.offeringName = serviceId[0].serviceOffering;
          this.requestValues.serviceOfferingName = this.offeringName
        }
        console.log('offer ', this.offeringName);
      }
      else {
        this.toast.show(res.message)
      }
    })

  }
  allServiceOfferings = []
  getAllOfferings() {
    this.ugdservice.getServiceOffering().subscribe((res: any) => {
      this.allServiceOfferings = res.data.responseData;
    })
  }
  offeringType(id) {
    if (!id) {
      return '';
    }
    const nameData = this.allServiceOfferings.filter((ref) => ref.id === id);
    let name = "";
    if (nameData[0]) {
      name = nameData[0].descr;
    }
    // console.log('nameeee', name);
    if (!name || name === 'undefined' || name === 'UNDEFINED') {
      name = ''
    }
    return name;
  }
  onKeyValue(event) {
    console.log('event', event);
    let avlPackage = Number(event.target.value);
    if (this.wayBillData && avlPackage > this.wayBillData.totalPackageCount) {
      this.availablePackages = null;
      event.target.value = null;
      this.showMessage('Available package value should not be greater than total package count', 'danger')
    }
  }
  createReshedule() {
    if (Number(this.availablePackages) < 1) {
      this.appComp.showMessage('Please enter valid available packages', 'danger');
      return;
    } else if (this.refType(this.wayBillData.businessTypeLookupId) === 'ANYWHERE TO ANYWHERE' || this.refType(this.wayBillData.businessTypeLookupId) === 'INBOUND') {
      if (Number(this.availablePackages) !== this.totalPackageCount) {
        this.appComp.showMessage('Available packages cannot be less than total packages', 'danger');
        return;
      }
    }
    let avlPackage = Number(this.availablePackages);
    if (this.wayBillData && avlPackage > this.wayBillData.totalPackageCount) {
      this.availablePackages = null;
      this.availablePackages = null;
      this.showMessage('Available package value should not be greater than total package count', 'danger');
      return
    }
    const body = this.getResheduleBody();
    if (this.oldWaybillDetails) {
      body['id'] = this.oldWaybillDetails.reScheduleDataDTO.id;
      body['newWaybillId'] = this.wayBillData.waybillId;
      body['oldWaybillId'] = this.oldWaybillDetails.waybillId;
    }
    if (this.layingAt) {
      if (this.layingAt.physicalLocationBranchId) {
        body['lkpLayingRaisedId'] = this.raisedlaying('LAYING AT');
      } else {
        body['lkpLayingRaisedId'] = this.raisedlaying('RAISED AT');
      }
    } else {
      body['lkpLayingRaisedId'] = this.raisedlaying('RAISED AT');
    }
    this.spinner.show();
    this.ugdservice.createResheduleReRouting(body).subscribe((res: any) => {
      // this.spinner.hide();
      if (res.status == 'SUCCESS') {
        this.uploadId = res.data.responseData;
        if (this.file) {
          this.uploadDoc();
        } else {
          // this.updateStatus();
          this.router.navigate(['/bookings-web-booking/re-routing']);
        }
      }
    }, (err: any) => {
      this.spinner.hide();
    })


  }

  // getAllLookups() {
  //   this.commonService.getAllLookups().subscribe((res: any) => {
  //     console.log('res getalllookups', res);
  //     this.allLookUps = res;
  //   }, (err: any) => {

  //   })
  // }

  getResheduleBody() {
    return {
      "actionUserRemark": this.remarks,
      "status": 1,
      "wayBillId": this.wayBillData.waybillId,
      "lkpBkgMopId": this.wayBillData.branchMOPLookupId,
      "serviceOfferingId": this.requestedServiceOffering,
      "reSchedulePackageCount": this.availablePackages,
      "destPincode": this.pincodeId,
      "oldWaybillId": this.wayBillData.waybillId,
      'wayblLayingRaisedBranchId': this.selectedBranchId,
      'reScheduleStatus': String(this.raisedlaying('PENDING_FOR_APPROVAL'))
    }
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
  raisedlaying(val: any) {
    if (!val) {
      return;
    }
    const nameData = this.allLookUps.filter((ref) => ref.lookupVal === val);
    let name;
    if (nameData[0]) {
      name = nameData[0].id;
    }
    return name;
  }

  //uploading document
  file;
  fileName;
  selectedFile;
  handleFileInput(files: any) {
    if (files.length > 0) {
      this.selectedFile = files[0].type;
      console.log('selectedFile', this.selectedFile);
    }
    if (this.selectedFile !== 'application/pdf') {

      this.appComp.showMessage('Only .pdf format is allowed', 'danger');
      return
    }
    this.file = files[0]
    this.fileName = this.file.name
  }

  uploadDoc() {
    if (!this.uploadId) {
      this.toast.show('Please enter waybill number');
      this.spinner.hide();
      return;
    }
    let fileD = {
      wayblNumber: this.wayBillData.waybillNumber,
      wayblReSchId: this.uploadId,
      requestType: 'RE_ROUTING',
    };

    this.spinner.show();
    this.ugdservice.uploadDocument(this.file, fileD).subscribe(
      (res: any) => {
        // console.log("fileupload response", res);
        // this.updateStatus();
        this.router.navigate(['/bookings-web-booking/re-routing']);
        this.toast.show(res.message)
        // this.spinner.hide();
      },
      (err: any) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }
  settimeout: any;

  showMessage(message: string, type?: string) {

    let snackbar = document.getElementById("snackbar_module");
    let snack_msg = document.getElementById("snack_msg");
    snackbar.style.display = "block";
    snackbar.style.animation = "fadeIn 0.5s linear";
    snackbar.style.background = "#27AE60";
    if (type == "danger") {
      snackbar.style.background = "#ef4848";
    }
    snack_msg.innerText = message;
    this.removeToast(snackbar);
    let _this = this;
    snackbar.addEventListener('mouseenter', function () {
      console.log("hover in");
      clearTimeout(_this.settimeout);
    })
  }
  removeToast(snackbar = null) {
    if (!snackbar) {
      snackbar = document.getElementById("snackbar_module");
    }
    this.settimeout = setTimeout(() => {
      snackbar.style.animation = "fadeOut 0.5s linear";
      setTimeout(() => {
        snackbar.style.display = "none";
      }, 300);
    }, 3500);
  }
  getCOBranch() {
    this.commonService.getCOBranch().subscribe((res: any) => {
      this.coBranchId = res;
    }, (err: any) => {

    })
  }

  getContractDetails(contractType, contractCode) {
    console.log('getContractDetails')
    this.commonService.getContractDetails(contractType, contractCode).subscribe((res: any) => {
      console.log('getContractDetails', res)
      const id = res.id
      if (id) {
        this.getRequestedOfferings(contractType, id);
      }
    }, (err: any) => {

    })
  }

  getRequestedOfferings(contractType, id) {
    console.log('getRequestedOfferings')
    this.commonService.getOfferingByContract(contractType, id).subscribe((res: any) => {
      if (res) {
        this.offeringData = res
        if (this.offeringData.length > 0) {
          this.requestedServiceOffering = this.wayBillData.serviceOfferingId;
        }
        this.callCommercial();

      }
    }, (err: any) => {

    })
  }
  updateStatus() {
    console.log('update status');
    const status = this.allLookUps.find(elem => elem.lookupTypeVal.trim() == "WAYBILL_BOOKING_STATUS" &&
      elem.lookupVal.trim() === 'RE_ROUTED');
    const body = {
      reRoutingFlag: 1,
      waybillNumber: this.wayBillNum,
      waybillStatus: status.id
    }
    this.ugdservice.updateWaybillStatus(body).subscribe((res: any) => {
      this.router.navigate(['/bookings-web-booking/re-routing']);
    }, (err: any) => {
      this.spinner.hide()
    })
  }
  enterWaybill(event) {
    let waybillLength = event.target.value.length;
    if (waybillLength >= 15) {
      this.onKeyUp(event);
    }
  }

  selectedCommercial;
  isDisableApprove = false;
  // branchId = JSON.parse(sessionStorage.getItem("branchId"))
  // userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  // headerData = {
  //   branchCode: "02",
  //   journeyId: "01",
  //   originUserType: "03",
  //   branchId: this.branchId,
  //   userId: this.userDetails.userId,
  // } as any;
  getCommercials() {
    console.log('getCommercials', this.contractType);
    this.$bookingInfo
      .getCommercialById(this.wayBillData.rateCardId, this.contractType, this.headerData).subscribe((res: any) => {
      // console.log('get commercials', res);
      const commercialData = res.responseData;
      this.selectedCommercial = commercialData.find(elem => elem.id === this.wayBillData.commercialId);
      // this.selectedCommercial = selectCommercial;
      // console.log('selectedCommercial', this.selectedCommercial);
      if (this.wayBillData.msaCustId && this.wayBillData.sfxPrcContractcode && this.wayBillData.sfxPrcContractcode !== '' && this.selectedCommercial) {
        this.offeringChange();
      } else {
        this.retailOfferingChange();
        // this.appComp.showMessage('Matching commercial not found for service','danger')
        // this.spinner.hide();
      }
      // this.spinner.hide();
    }, (err: any) => {
      this.spinner.hide();
    })
  }
  getRetailCommercials() {
    this.isDisableApprove = false;
    // console.log('getRetailCommercials', this.contractType);
    // this.commonService.getRetailCommercials(this.wayBillData.rateCardId).subscribe((res: any) => {
    //   // console.log('get getRetailCommercials', res);
    //   const commercialData = res.data.responseData;
    //   this.selectedCommercial = commercialData.find(elem => elem.id === this.wayBillData.commercialId);
    //   // this.selectedCommercial = selectCommercial;
    //   console.log('selectedCommercial', this.selectedCommercial);
    //   if (!this.wayBillData.msaCustId) {
    //     this.retailOfferingChange();
    //   }
    //   // this.spinnerService.hide();
    // }, (err: any) => {
    //   this.spinner.hide();
    // })
  }
  offeringChange() {
    const val = +this.requestedServiceOffering;
    // console.log('val', val);
    // console.log('this.details.reScheduleBookingDetailsDTO.serviceOfferingId', this.details.reScheduleBookingDetailsDTO.serviceOfferingId);
    console.log('selected commercial', this.selectedCommercial);
    if (!this.wayBillData.sfxPrcContractcode || this.wayBillData.sfxPrcContractcode === '') {
      this.spinner.hide();
      return;
    }
    if (val !== this.wayBillData.serviceOfferingId) {
      // this.spinner.show();
      const body = {
        chargeById: this.selectedCommercial.lkpChrgById,
        contractId: this.wayBillData.prcCntrId,
        contractType: this.contractType,
        productCategoryId: this.selectedCommercial.prdctCtgyId,
        serviceOfferingId: val,
      }
      this.commonService.getRateCardsByCriteria(body).subscribe((res: any) => {
        console.log('response', res);
        if (res) {
          // const response = res.data.responseData;
          if (res.length < 1) {
            this.appComp.showMessage('Matching commercial not found for service ','danger');
            this.isDisableApprove = true;
          } else {
            this.isDisableApprove = false;
          }
        }
        this.spinner.hide();

      }, (err: any) => {
        
        this.spinner.hide();
        this.isDisableApprove = true;
        this.appComp.showMessage('Matching commercial not found for service ','danger');

      })
    } else {
      this.isDisableApprove = false;
      this.spinner.hide();
    }
  }
  retailOfferingChange() {
    const val = +this.requestedServiceOffering;
    // console.log('val', val);
    // console.log('this.details.reScheduleBookingDetailsDTO.serviceOfferingId', this.details.reScheduleBookingDetailsDTO.serviceOfferingId);
    console.log('selected commercial', this.selectedCommercial);
    // if (!this.waybillData.sfxPrcContractcode || this.waybillData.sfxPrcContractcode === '') {
    //   this.spinnerService.hide();
    //   return;
    // }
    if (val !== this.wayBillData.serviceOfferingId) {
      this.spinner.show();
      const body = {
        chargeById: this.selectedCommercial.lkpChrgById,
        productCategoryId: this.selectedCommercial.prdctCtgyId,
        serviceOfferingId: val,
      }
      this.commonService.getRateCardsByCriteria(body).subscribe((res: any) => {
        console.log('response', res);
        if (res) {
          const response = res.data.responseData;
          if (!response.length) {
            
            this.appComp.showMessage('Matching commercial not found for service','danger')
            this.isDisableApprove = true;
          } else {
            this.isDisableApprove = false;
          }
        }
        this.spinner.hide();

      }, (err: any) => {
        this.spinner.hide();
        this.appComp.showMessage('Matching commercial not found for service ','danger')
        
        this.isDisableApprove = true;
      })
    } else {
      this.isDisableApprove = false;
      this.spinner.hide();
    }
  }

  callCommercial(){
        this.getCommercials();
  }
}
