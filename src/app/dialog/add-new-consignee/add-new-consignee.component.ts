import { Validation } from "./../../shared/validation";
import { NgxSpinnerService } from "ngx-spinner";
import { BookingInformationService } from "./../../core/service/booking-information.service";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Component, OnInit, Inject, ViewChild } from "@angular/core";

@Component({
  selector: "app-add-new-consignee",
  templateUrl: "./add-new-consignee.component.html",
  styleUrls: ["./add-new-consignee.component.css"],
})
export class AddNewConsigneeComponent implements OnInit {
  isConsigner:boolean;
  constructor(
    private $bookingInfo: BookingInformationService,
    public dialogRef: MatDialogRef<AddNewConsigneeComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}
  @ViewChild("f", null) consignerForm: any;
  ngOnInit() {
    ;
    var consigner = this.data;
    if(consigner.type == 'consignee'){
      this.isConsigner = false; 
    }
    if(consigner.type == 'consignor') {
      this.isConsigner = true;
      this.isDisablePincode = false
    }
    console.log(this.data);
    this.consignerObj.lkpConsigntypeId = consigner.ConsigntypeId;
    if (consigner.destinationPincode && consigner.type == 'consignee') {
      this.consignerObj.addrBook.pincodeId = consigner.destinationPincode;
      this.isDisablePincode = true;
    }
      if(consigner.gstinNum){
        this.consignerObj.gstinNum = consigner.gstinNum;
        this.isGstinDisable=true;
      }
      if(consigner.consigneeName){
        this.consignerObj.name = consigner.consigneeName;
        this.isDisableName=true;
      }
      if(consigner.deliveryPlace && consigner.type == 'consignee'){
        this.consignerObj.addrBook.addr1 = consigner.deliveryPlace;
        this.isDisableAddress=true;
      }
  }
  waybillList: Array<any> = [];
  isDisablePincode: boolean = false;
  isGstinDisable: boolean = false;
  isDisableAddress: boolean = false;
  isDisableName: boolean = false;
  consignerObj = {
    addrBook: {},
  } as any;
  searchWayBill;
  getWaybillBuId() {
    ;
    this.spinner.show();
    this.$bookingInfo.getWaybillById(this.searchWayBill).subscribe(
      (response) => {
        if (response) {
          this.spinner.hide();
          this.consignerObj.dealerCode = this.waybillList[0].deliveryStateCode;
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  panChk = false;
  panLength = false;
  onPanChange(num) {
    ;
    if (num.length > 0) {
      this.panChk = Validation.panValidation(num);
      this.panLength = true;
    } else {
      this.panLength = false;
      this.panChk = false;
    }
  }
  tanChk = false;
  tanLength = false;
  onTanChange(num) {
    if (num.length > 0) {
      this.tanLength = true;
      this.tanChk = Validation.tanValidation(num);
    } else {
      this.tanChk = false;
      this.tanLength = false;
    }
  }
  saveConsigner() {
    if (this.tanChk == false && this.tanLength) {
      return;
    }
    this.consignerObj.crtByBranchId = JSON.parse(sessionStorage.getItem("branchId"));
    this.$bookingInfo.saveconsigner(this.consignerObj).subscribe((res) => {
      if (res) {
        this.consignerObj.id = res;
        this.dialogRef.close(this.consignerObj);  
      }
    });
  }
}
