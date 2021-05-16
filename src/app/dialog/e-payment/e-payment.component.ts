import { Component, OnInit, Inject } from '@angular/core';
import { OpenBookingService } from 'src/app/core/service/open-booking.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/common.service';
import { NgForm } from '@angular/forms';
import { PaymentReceiptComponent } from '../payment-receipt/payment-receipt.component';

@Component({
  selector: 'app-epayment-popup',
  templateUrl: './e-payment.component.html',
  styleUrls: ['./e-payment.component.css']
})
export class EpaymentRequestComponent implements OnInit {

  showInput: boolean = false;
  billLength: boolean = false;
  totalAmount: number = 0;
  tdAmount: number;
  tdsPercentage: number = 0;
  waybillArray: any = [];
  disablefield: boolean = false;
  number: number = 0;
  paymentWaybillList: any = [];
  consignerId: number = -1;
  branchId: string;
  consignerName: any;
  consignerData: any;
  totalwayBillCount: number = 0;
  tdsApplicable: string = 'true';
  disableButton: boolean = false;
  totalArray: any[];
  customval: number = 0;
  finalTotal: number = 0;
  msgString: string;
  submitted: boolean = false;
  errMsg: string;
  tdsAmount = 'Auto (2%)';
  waybillNumbers = '';
  constructor(
    private openBookingService: OpenBookingService,
    public dialogRef: MatDialogRef<EpaymentRequestComponent>,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.branchId = sessionStorage.getItem('branchId');
    this.waybillNumbers = this.data.waybillNo;
    this.getWayDataByWayBillLength(this.waybillNumbers);
    this.getAllLookups();
  }

  allLookUps = [];
  getAllLookups() {
    this.commonService.getAllLookups().subscribe((res: any) => {
      this.allLookUps = res;
    }, (err: any) => {

    })
  }
  geWaybilCounts(waybilNos: string) {
    return waybilNos ? waybilNos.split(',').length : 0;
  }
  isDisable = false;
  onSubmit(f: NgForm) {
    this.isDisable = true;
    this.submitted = true;
    // Object.keys(f.value).forEach(key => f.controls[key].markAsDirty());
    console.log('f.valueeeeeeeee', f.value);
    if (!f.valid) {
      this.isDisable = false;
      return;
    }
    if (f.value.tanNum !== '') {
      if (!this.validateTan) {
        this.isDisable = false;
        return
      }
    }
    // if (f.valid) {
    const body = this.getBody(f.value);
    console.log('body', body)
    this.spinner.show();
    this.openBookingService.paymentSendLink(body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.isDisable = false;
      this.paymentWaybillList = [];
      if (resp.status == 'SUCCESS') {
        this.dialogRef.close(resp.data.responseData);
      }
    },
      (err) => {
        this.isDisable = false;
        this.spinner.hide();
        console.log(err);
      })
    // }
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  closeDialog() {
    this.dialogRef.close();
  }

  validateTan = true;
  validateTanNum(value) {
    // var txtPANCard = document.getElementById("txtPANCard");
    // var lblPANCard = document.getElementById("lblPANCard")
    console.log('value', value);
    if (value === '') {
      this.validateTan = true;
      return
    }
    this.validateTan = false;
    // var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;

    var regex = /([A-Z]){4}([0-9]){5}([A-Z]){1}$/;
    if (regex.test(value.toUpperCase())) {
      this.validateTan = true;
      return true;
    } else {
      this.validateTan = false;
      return false;
    }
  }

  getWayDataByWayBillLength(waybillNumber) {
    let newNumber = waybillNumber.split(',');
    let newNumberLength = newNumber.length;
    // console.log('new ', newNumberLength)
    waybillNumber = newNumber[newNumberLength - 1];
    let duplicateNumber = this.waybillArray.filter(data => data.wayBillNumber == waybillNumber);
    // console.log('@@@', duplicateNumber, waybillNumber)
    if (duplicateNumber.length > 0) {
      this.toast.warning("This waybillnumber already been input");
      setTimeout(() => {
        this.spinner.hide();
      }, 4000);
      return;
    }
    // console.log('duplicatenumber ', duplicateNumber)
    // console.log('waybill', waybillNumber)
    this.spinner.show();
    
    this.getWaybillDetailsByNumber(waybillNumber);
  }
  getWaybillDetailsByNumber(waybillNumber) {
    this.openBookingService.getWayBill(waybillNumber).subscribe((resp: any) => {
      console.log('resp', resp);
      if (resp.status == "SUCCESS") {
        // implement the api for testing whether the payment of waybill is done or not if the payement is done than do not proceed with this waybill otherwise proceed
        // this.processWaybillResp(resp);

        const waybillId = resp.data.responseData.waybillId;
        this.openBookingService.getEpaymentStatusByWaybillId(waybillId).subscribe(
          (ePaymentResp: any) => {
            console.log('ePaymentResp', ePaymentResp);
            this.spinner.hide();
            const ePyamnetRespone = ePaymentResp.data.responseData;
            console.log('ePyamnetRespone', ePyamnetRespone);
            if (ePyamnetRespone && ePyamnetRespone.lkpPymtRecvdStatusId && ePyamnetRespone.lkpPymtRecvdStatusId != 0) {
              this.toast.warning("Payment of this waybill is done, can not create new request");
              return;
            } else {
              this.processWaybillResp(resp);
            }
          },
          (err) => {
            this.processWaybillResp(resp);
            this.spinner.hide();
          }
        );
      }
      else {
        console.log('inside else');
      }

    },
      (err) => {
        this.totalwayBillCount--
        console.log(err);
        this.spinner.hide();
      })
  }
processWaybillResp(resp) {
  console.log('resp', resp);
   // this.disableButton = true;
        // this.totalwayBillCount = this.totalwayBillCount+1;
        this.number++;
        // console.log('this.number ', this.number)
        let data = resp.data.responseData;
        setTimeout(() => {
          this.spinner.hide();
        }, 4000);
        const mopObj = this.allLookUps.find(el => el.id == data.branchMOPLookupId && el.lookupTypeVal === 'BRANCH_MOP');
        console.log('mopObj', mopObj);
        if (!mopObj || mopObj.lookupVal !== 'PAID') {
          this.toast.warning(`Only PAID waybills allowed`);
          this.waybillNumbers = this.waybillNumbers.replace("," + data.waybillNumber + ',', '');
          this.waybillNumbers = this.waybillNumbers.replace("," + data.waybillNumber, '');
          this.waybillNumbers = this.waybillNumbers.replace(data.waybillNumber, '');
          // 042100000002479,042100000002478
          this.spinner.hide();
          return;
        }
        console.log('proceed');
        if (data.bookingBranchId == this.branchId) {
          if (data.consignorId == null) {
            this.toast.warning("There is no consignor for this waybill number");
            setTimeout(() => {
              this.spinner.hide();
            }, 4000);
            return;
          } else {
            // console.log('this.consignerId', this.consignerId);
            // console.log('data.consignorId', data.consignorId);
            if (this.consignerId == -1) {
              this.consignerId = data.consignorId;
              this.waybillArray.push({ 'wayBillId': data.waybillId, 'wayBillNumber': data.waybillNumber, 'gttlAmount': data.gttlAmount });
              // for (let item of this.waybillArray) {
              this.totalAmount = this.totalAmount + (data.gttlAmount ? data.gttlAmount : 0);
              if (this.tdsApplicable == 'true') {
                this.tdsPercentage = 2;
                this.tdAmount = 0;
                this.tdAmount = (this.totalAmount * 2) / 100;
                console.log('tttt', this.tdAmount, this.totalAmount)
                this.finalTotal = JSON.parse((this.totalAmount - this.tdAmount).toFixed(2));
                // this.totalwayBillCount = this.totalwayBillCount+1;
                // console.log('total', this.totalAmount, this.finalTotal)
              }
              else {
                this.finalTotal = this.totalAmount;
              }
              // }
              this.getConsignerName();
              this.totalwayBillCount++;
            }
            else {
              if (this.consignerId === data.consignorId) {
                this.waybillArray.push({ 'wayBillId': data.waybillId, 'wayBillNumber': data.waybillNumber, 'gttlAmount': data.gttlAmount });
                this.totalAmount = this.totalAmount + data.gttlAmount;

                if (this.tdsApplicable == 'true') {
                  this.tdsPercentage = 2;
                  this.tdAmount = 0;
                  this.tdAmount = (this.totalAmount * 2) / 100;
                  this.finalTotal = this.totalAmount - this.tdAmount;
                  // this.totalwayBillCount = this.totalwayBillCount+1;
                }
                else {
                  this.finalTotal = this.totalAmount;
                }
                // }
                // this.getConsignerName();
                this.totalwayBillCount++;
              }
              else {

                // const waybills = this. = 'waybillNumbers.split(',');
                // this.waybillNumbers = waybills.filter(waybill => waybill != data.waybillNumber).join(', ');
                // this.waybillNumbers = waybills.splice(waybills.length-1, 1).join(',');
                this.toast.warning(`Waybill number should have same Consignor`);
                setTimeout(() => {
                  this.spinner.hide();
                  this.paymentWaybillList = [];
                  this.consignerId = -1;
                  this.waybillArray = [];
                  this.totalAmount = 0;
                  this.totalwayBillCount = 0;
                  this.finalTotal = 0;
                  this.waybillNumbers = '';
                  console.log('this.consignerId', this.consignerId);
                }, 1000);
                return;
              }
            }
          }
        } else {
          this.paymentWaybillList = [];
          this.consignerId = -1
          this.waybillArray = [];
          this.totalAmount = 0;
          this.totalwayBillCount = 0;
          this.finalTotal = 0;
          this.waybillNumbers = '';
          this.toast.warning("The added waybill is not similar to the current branch");
          setTimeout(() => {
            this.spinner.hide();
          }, 4000);
          return;

        }
}
  getBody(val) {
    // console.log(this.branchId)
    // console.log('@@', val.customval)
    if (val.tdsAmount == 'Auto (2%)') {
      this.finalTotal = this.totalAmount
      this.tdsPercentage = 2;
      this.tdAmount = 0;
      this.tdAmount = (this.finalTotal * 2) / 100;
      console.log('tttt', this.tdAmount)
      this.finalTotal = JSON.parse((this.finalTotal - this.tdAmount).toFixed(2));

    }
    if (val.tdsAmount == 'Custom') {
      this.finalTotal = this.totalAmount
      console.log('cust', val.customval)
      this.tdsPercentage = val.customval;
      this.tdAmount = 0;
      this.tdAmount = (this.finalTotal * val.customval) / 100;
      this.finalTotal = JSON.parse((this.finalTotal - this.tdAmount).toFixed(2));
    }

    // for (let item of this.waybillArray) {
    //   console.log('item', item)
    //   this.paymentWaybillList.push({
    // 'bookingWaybillId': item.wayBillId, 'description': "string",
    // 'paymentReqId': 0, 'waybillAmount': item.gttlAmount, 'waybillNumber': item.wayBillNumber
    //   })
    // }
    // console.log('array', this.paymentWaybillList)
    console.log('this.waybillArray', this.waybillArray);
    console.log('this.paymentWaybillList', this.paymentWaybillList);
    return {
      "branchId": this.branchId,
      "contactNumber": val.contactno,
      "customerName": this.consignerName,
      "emailId": val.emailId,
      "paymentWaybillList": this.waybillArray.map(item => ({
        'bookingWaybillId': item.wayBillId, 'description': "string",
        'paymentReqId': 0, 'waybillAmount': item.gttlAmount, 'waybillNumber': item.wayBillNumber
      })),
      "tanNumber": val.tanNum,
      "tdsAmount": this.tdAmount,
      "tdsApplicableFlag": val.tdsApplicable === 'true' ? true : false,
      "tdsPercentage": this.tdsPercentage,
      "tdsTypeId": 0,
      "totalPaymentAmount": this.finalTotal
    }
  }

  showInputBox(event) {
    console.log(event);
    if (event == 'Custom') {
      this.showInput = true;
    }
    if (event == 'Auto (2%)') {
      this.showInput = false;
      this.finalTotal = this.totalAmount;
      this.tdsPercentage = 2;
      this.tdAmount = 0;
      this.tdAmount = (this.finalTotal * 2) / 100;
      console.log('tttt', this.tdAmount, this.finalTotal)
      this.finalTotal = JSON.parse((this.finalTotal - this.tdAmount).toFixed(2));
      console.log('tttt', this.tdAmount, this.finalTotal)

    }

  }
  onenterCustomValue(value) {
    console.log(value)
    this.finalTotal = this.totalAmount;
    this.tdsPercentage = value;
    this.tdAmount = 0;
    this.tdAmount = (this.finalTotal * value) / 100;
    console.log('tttt', this.tdAmount, this.finalTotal)
    this.finalTotal = JSON.parse((this.finalTotal - this.tdAmount).toFixed(2));
    console.log('tttt', this.tdAmount, this.finalTotal)
  }
  radioChange(event) {
    console.log('event', event)
    if (event.value == 'false') {
      this.finalTotal = this.totalAmount;
      this.disablefield = true;
    } else {
      this.tdsPercentage = 2;
      this.tdAmount = 0;
      this.tdAmount = (this.totalAmount * 2) / 100;
      console.log('tttt', this.tdAmount, this.totalAmount)
      this.finalTotal = this.totalAmount - this.tdAmount;
      // this.totalwayBillCount = this.totalwayBillCount+1;
      console.log('total', this.totalAmount, this.finalTotal)
      this.disablefield = false;
    }

  }
  getConsignerName() {
    this.openBookingService.getConsignerName(this.consignerId).subscribe((res: any) => {
      console.log('ress', res)
      if (res.status == 'SUCCESS') {
        this.consignerData = res.data.responseData;
        this.consignerName = this.consignerData.name;
        console.log('cname', this.consignerName);

      }
    })
  }
}

