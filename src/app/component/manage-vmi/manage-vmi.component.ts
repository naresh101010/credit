import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AttachPartNumberComponent } from 'src/app/dialog/attach-part-number/attach-part-number.component';
import { ManageVmiService } from 'src/app/core/service/manage-vmi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/common.service';
@Component({
  selector: 'app-manage-vmi',
  templateUrl: './manage-vmi.component.html',
  styleUrls: ['./manage-vmi.component.css']
})
export class ManageVmiComponent implements OnInit {
  wayBilldata: any;
  dataSource: MatTableDataSource<any>;
  attachData: any;
  allLookups = [];
  businessType = '';
  mop = '';
  serviceOffering = ''
  fromBranchName = sessionStorage.getItem("branchName");
  toBranchName = '';
  waybillNumbers = ''
  isWaybillApicalled = false;
  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private manageVmiService: ManageVmiService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private vmiService: ManageVmiService
  ) {
    let a = this.route.snapshot.paramMap.get('data');
    console.log('a', a);

    // this.route.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     let type = this.router.getCurrentNavigation().extras.state;
    //     this.data = type.type;
    //     console.log('data @@@@@' ,type, this.data)
    //   }
    // });
  }
  serviceOfferingList = [];
  ngOnInit() {

    this.getAllLookups();
    this.getServiceOffering();
  }

  openAttachPartNumber(element) {
    const dialogRef = this.dialog.open(AttachPartNumberComponent, {
      width: '67rem',
      panelClass: 'bookingDialog',
      data: {
        item: this.wayBilldata,
        element: element
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:,', result);
      if (result != true) {
        this.spinner.show();
        this.getWayNumberData(this.waybillNumbers.trim());
      }
    });
  }
  getPartsNumber(data) {
    return data.map(el => el.vmiPartNum).join(', ');
  }
  onKeyUp(event) {
    console.log(event.target.value);
    let wayBillNumber = event.target.value.trim();
    let wayBillLength = event.target.value.length;
    console.log('length', wayBillNumber, wayBillLength)
    // if (wayBillLength == 6 || wayBillLength == 15) {
    this.spinner.show();
    this.getWayNumberData(wayBillNumber);
    // }
  }
  getBrancBybranchId(id) {
    return this.commonService.getBranchDetailByBrancId([id]).toPromise();
  }
  getAllLookups() {
    this.commonService.getAllLookups().subscribe((res: any) => {
      // console.log('res getalllookups', res);
      this.allLookups = res;
    }, (err: any) => {

    })
  }
  getWayNumberData(wayBillNumber) {
    this.manageVmiService.getWayBillData(wayBillNumber).subscribe((res: any) => {
      console.log('res', res);
      this.spinner.hide();
      this.isWaybillApicalled = true;
      this.wayBilldata = res.data.responseData;
      // console.log('this.wayBilldata', this.wayBilldata);
      const invoiceList = this.wayBilldata.invoiceList;
      if (invoiceList && invoiceList.length) {
        invoiceList.forEach(element => {
          this.getPartsByInvoiceId(element);
        });
      }
      this.dataSource = this.wayBilldata.invoiceList;
      this.allLookups.forEach(data => {
        if (data.id == this.wayBilldata.branchMOPLookupId) {
          this.mop = data.lookupVal;
        }
        if (data.id == this.wayBilldata.businessTypeLookupId) {
          this.businessType = data.lookupVal;
        }
      });
      this.serviceOfferingList.forEach(el => {
        if (el.id == this.wayBilldata.serviceOfferingId) {
          this.serviceOffering = el.serviceOffering
        }
      });
      this.getToAndFromBranch();
    }, (err) => {
      this.spinner.hide();
      this.isWaybillApicalled = true;
      console.log(err);
    });
  }
  getPartsByInvoiceId(invoice) {
    this.vmiService.getPartDetail(invoice.invoiceId).subscribe((res: any) => {
      console.log('res', res)
      if (res.status == 'SUCCESS') {
        // alert('hi');
        const response = res.data.responseData;
        if (response && response.length) {
          invoice.attachData = res.data.responseData;
        }
        // this.resData = res.data.responseData;
        // console.log('@@',this.resData);
        // this.closeDialog();
        // this.router.navigate(['/bookings-web-booking/manage-vmi'],{state: {data:this.resData})
      }

    })
  }
  async getToAndFromBranch() {
    try {
      if (this.wayBilldata.deliveryGatewayBranchId) {
        const toBranchResp = await this.getBrancBybranchId(this.wayBilldata.deliveryGatewayBranchId)
        if (toBranchResp && toBranchResp.length) {
          this.toBranchName = toBranchResp[0].branchName;
        }
      }
      const fromBranchResp = await this.getBrancBybranchId(this.wayBilldata.bookingBranchId)
      if (fromBranchResp && fromBranchResp.length) {
        this.fromBranchName = fromBranchResp[0].branchName;
      }
    } catch (err) {
      console.log(err);
    }
  }
  getServiceOffering() {

    this.commonService.getAllOfferings().subscribe((response) => {
      if (response) {
        this.serviceOfferingList = response;
      }
    });

  }
  onSubmit() {
    // location.reload();
    this.wayBilldata = null;
    this.waybillNumbers = '';
    this.dataSource = undefined;
  }
  displayedColumns: string[] = ['invoice', 'date', 'amount', 'attach'];


}

export interface PeriodicElement {
  invoice: number;
  date: string;
  amount: number;
  attach: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { invoice: 12345, date: '31/12/2020', amount: 10000, attach: '' },
  { invoice: 12345, date: '31/12/2020', amount: 10000, attach: '' },
  { invoice: 12345, date: '31/12/2020', amount: 10000, attach: '' },
  { invoice: 12345, date: '31/12/2020', amount: 10000, attach: '' },
];
