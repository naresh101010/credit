import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/common.service';
import { ManifestService } from 'src/app/core/service/manifest.service';
import { map } from 'rxjs/operators';
import { ExportService } from 'src/app/core/service/export.service';
import { AddEmailComponent } from 'src/app/dialog/add-email/add-email.component';
import { WaybillService } from 'src/app/core/service/waybill.service';
import { AppComponent } from 'src/app/app.component';
import { BookingInformationService } from 'src/app/core/service/booking-information.service';
@Component({
  selector: 'app-view-manifest',
  templateUrl: './view-manifest.component.html',
  styleUrls: ['./view-manifest.component.css']
})
export class ViewManifestComponent implements OnInit {
  manifestDeatils: any;
  viewListArray: any = [];
  branchId = JSON.parse(sessionStorage.getItem("branchId"))
  userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  headerData = {
    branchCode: "02",
    journeyId: "01",
    originUserType: "03",
    branchId: this.branchId,
    userId: this.userDetails.userId,
  } as any;
  destpinCode:number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _appComp:AppComponent,
    private $bookingInformation : BookingInformationService,
    private waybillService: WaybillService,
    private spinner: NgxSpinnerService,
    private matSnackBar: MatSnackBar,
    private dialog: MatDialog,
    private mainfestService: ManifestService,
    private exportExcelService: ExportService,
    private commonService: CommonService) { }
  waybillList: MatTableDataSource<any>;
  wayBillArray: any = [];
  eWaybillList: MatTableDataSource<any>
  manifestId = '';
  consolidateDataArray = [];
  ngOnInit() {
    const manifestId = sessionStorage.getItem('manifestId');
    sessionStorage.removeItem('selectedManifest');
    console.log('manifestId', manifestId);
    if (manifestId) {
      this.manifestId = manifestId;
      this.getManifestDetais(manifestId);
      this.getConsolidateData()
      this.getVehicles();
    }
  }
  getVehicleNumber(id) {
    return this.vehicleLists.filter(el => el.id == id)[0].vehicleNum;
  }

  getManifestDetais(manifestId: any) {
    this.spinner.show();
    this.mainfestService.getManfestDetailsById(manifestId).subscribe(
      async (resp: any) => {
        if (resp.status == 'SUCCESS') {
          console.log('resp', resp);
          this.manifestDeatils = resp.data.responseData;
          await this.getTolocation(this.manifestDeatils.toBranchId);
          this.waybillList = this.manifestDeatils.manifestWaybillList;
          this.wayBillArray = this.manifestDeatils.manifestWaybillList;
          if (this.wayBillArray.length) {
            this.getwayByWaybillNumber();
          }
        }

      }, (err: any) => {
        this.spinner.hide();

      }
    );
  }
  toLocation = ''
  getTolocation(id) {
    this.commonService.getBranchDetailByBrancId([id]).subscribe(
      (resp) => {
        console.log('xyz',resp)
        if (resp && resp.length) {
          this.toLocation = resp[0].branchName;
          const manifestNum = this.manifestDeatils.manifestNum
          const string = JSON.stringify({ 'To Location': this.toLocation, 'Manifest No': manifestNum });
          this.generateQrCode(string, true);
          this.$bookingInformation.getPincodeByPincodeId(resp[0].pincodeId,this.headerData).subscribe(res => {
             this.destpinCode = res.pincode;
          })
        }
      }
    )
  }
  manifestQrCode = ''
  nicQrCode = '';
  nicNumber = ''
  async generateQrCode(string, isForManifest) {
    const qrCode = await this.mainfestService.generateQrCode(string).toPromise();
    // console.log('qrCode', qrCode);
    if (isForManifest) {
      this.manifestQrCode = 'data:image/png;base64,' + qrCode;
    } else {
      this.nicQrCode = 'data:image/png;base64,' + qrCode;
    }
  }
  getConsignorNameById(cnorId, i) {
    // if (+i === this.wayBillArray.length - 1) {
    //   this.spinner.hide();
    // }
    return this.mainfestService.getConsignerName(cnorId).pipe(map((resp: any) => resp.data.responseData)).toPromise();
  }
  getwayByWaybillNumber() {
    console.log('this.wayBillArray', this.isNic, this.wayBillArray);
    for (let i in this.wayBillArray) {
      this.mainfestService.getByWayBillNumberDetails(this.wayBillArray[i].waybillNumber).subscribe(async (res: any) => {
        console.log('res', res)
      
        let responseData = res.data.responseData;
        if (responseData && responseData.invoiceList && responseData.invoiceList.length) {
          const invoiceList = responseData.invoiceList;
          for (const invoice of invoiceList) {
            console.log('invoice', invoice);
            if (invoice.ewaybillInvoiceDetail) {
              this.EwaybillCount++;
              console.log('this.EwaybillCount', this.EwaybillCount);
            }
          }
        }
        const consignorDetail = await this.getConsignorNameById(responseData.consignorId, i);
        console.log('consignorDetail',consignorDetail)
        this.viewListArray.push({ consignorName: consignorDetail.name, 'consignerId': responseData.consignorId, 'consigneeId': responseData.consigneeId, 'destinationPincode': this.destpinCode, 'wayBillNumber': this.wayBillArray[i].waybillNumber, quantity: this.wayBillArray[i].loadedPkgCount })
        this.waybillList = new MatTableDataSource(this.viewListArray);
        // this.spinner.hide();
        console.log('datasource', this.waybillList)
      }), (err: any) => {
        this.spinner.hide();
      }
    }
    this.spinner.hide();
    return null;
  }

  openEmailModal() {
    if (!this.wayBillArray.length) {
      this._appComp.showMessage('No Waybill Available for this menifest', 'warning');
      return;
    }
    var dialog = this.dialog.open(AddEmailComponent, {
      width: "100rem",
      panelClass: "bookingDialog",
    });
    dialog.afterClosed().subscribe((res: any) => {
      if (res) {
        this.sendEmail(res);
      }
    });
  }
  sendEmail(email) {
    this.spinner.show();
    let wayBillIds = [];
    this.wayBillArray.forEach(element => {
      wayBillIds.push(element.bookingWaybillId);
    });
    // this.waybillService.postSendMail(wayBillIds, email).subscribe(
    //   (resp: any) => {
    //     this.spinner.hide();
    //     console.log(resp);
    //     this._appComp.showMessage(resp['message'],'success');
    //   },
    //   (err) => {
    //     this.spinner.hide();
    //     console.log(err);
    //   }
    // );
    let id = sessionStorage.getItem('manifestId');

    this.mainfestService.sendManifestEmail(id, email).subscribe(data => {
      this.spinner.hide();
      this._appComp.showMessage(data['message'], 'success');
    }, (err) => {
      this.spinner.hide();
    })
  }

  vehicleLists = []
  getVehicles() {
    this.mainfestService.getVehicleListByuserId().subscribe(
      (resp: any) => {
        console.log('vehicle', resp);
        this.vehicleLists = resp.data.responseData;
        // console.log('thisssss', this.vehicleLists);
        // this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
  downloadExcel() {
    // const waybillTable = 'waybill-table';
    // const consolidateTable = 'consolidate-table';

    // if (this.isNic) {
    //   // const data = this.eWaybillList.data;
    //   let data = this.eWaybillList.data;
    //   // console.log('data', data);
    //   if (data && data.length) {
    //     const filename = 'consolidation_numbers.xlsx';
    //     const headers = ['Waybill No.', 'Consignor Name', 'Destination Pincode', 'Quantity'];
    //     data = data.map(el => [el.ewayblCnsolNum, this.getVehicleNumber(el.vehicleId), el.ewayblNum]);
    //     const aoa = [headers, ...data];
    //     console.log('aoa', aoa);
    //     this.exportExcelService.exportexcel(filename, aoa);
    //   }
    // } else {
    //   const filename = 'manifest_numbers.xlsx';
    //   let data = this.waybillList.data;
    //   if (data && data.length) {
    //     const headers = ['Waybill No.', 'Consignor Name', 'Destination Pincode', 'Quantity'];
    //     data = data.map(el => [el.wayBillNumber, el.consignorName, el.destinationPincode, el.quantity]);
    //     const aoa = [headers, ...data];
    //     console.log('aoa', aoa);
    //     // console.log('data', data);
    //     this.exportExcelService.exportexcel(filename, aoa);
    //   }
    // }
    let manifestNum = this.manifestDeatils ? this.manifestDeatils.manifestNum : 'Manifest'
    const filename = `${manifestNum}.pdf`;
    let id = sessionStorage.getItem('manifestId');
    this.spinner.show();
    this.mainfestService.downloadManifestReport(id).subscribe(data => {
      this.spinner.hide();
      var file = new Blob([data], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      //window.open(fileURL);
      var a = document.createElement("a");
      a.href = fileURL;
      a.download = filename;
      a.click();
      this._appComp.showMessage("Download Successfully", 'success');

    }, (err) => {
      this.spinner.hide();
    })
  }
  EwaybillCount = 0;
  nicData() {
    this.isNic = true;
    // this.EwaybillCount = 0
    // this.eWaybillList = this.manifestDeatils.manifestEWaybillMapList;
    this.spinner.show();
    this.getConsolidateData()
  }
  getConsolidateData() {
    this.consolidateDataArray = [];
    this.mainfestService.getConsilidateDataByManifestId(this.manifestId).subscribe(
      (resp: any) => {
        let response = [...resp.data.responseData]
        this.consolidateDataArray = [...resp.data.responseData];

        let result = []
        result = this.consolidateDataArray.reduce((unique, o) => {
          if (!unique.some(obj => obj.ewayblCnsolNum === o.ewayblCnsolNum)) {
            unique.push(o);
          }
          return unique;
        }, []);

        // let test  = result.sort((a,b) => (+b.ewayblCnsolNum)-(+a.ewayblCnsolNum));
        // console.log('test',test)
         if (result.length) {
          result = result.sort((a, b) => {
            if (a.updatedDate && b.updatedDate) {
              const aDate = new Date(a.updatedDate);
              const bDate = new Date(b.updatedDate);
              return bDate.getTime() - aDate.getTime();
            }
            return 1;
          });
          this.nicNumber = result[0].ewayblCnsolNum;
          const str = JSON.stringify({ NIC: this.nicNumber })
          this.generateQrCode(str, false);
        }
       console.log('consolidateDataArray',this.consolidateDataArray,result)
        this.eWaybillList = new MatTableDataSource(result);
        this.spinner.hide();
       
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
        this.EwaybillCount = 0;
      }
    );
  }

  getNoOfEwayBill(element) {
    let filteredData = this.consolidateDataArray.filter(x => x.ewayblCnsolNum == element.ewayblCnsolNum);
    if (filteredData) {
      return filteredData.length;
    } else {
      return 1;
    }
  }

  showConsilidateData() {
    this.isNic = false;
  }
  displayedColumns2: string[] = ['Consolidation', 'Vehicle', 'ewaybill'];
  displayedColumns: string[] = ['waybill', 'pickup', 'mop', 'service'];
  dataSource = ELEMENT_DATA;
  dataSource2 = ELEMENT_DATA2;
  isNic: boolean = false;

}

export interface PeriodicElement {
  waybill: number;
  pickup: string;
  mop: string;
  service: string;

}
export interface PeriodicElement2 {
  Consolidation: string;
  Vehicle: string;
  ewaybill: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { waybill: 12345, pickup: '31/12/2020', mop: 'Credit', service: '50' },
  { waybill: 12345, pickup: '31/12/2020', mop: 'Credit', service: '50' },
  { waybill: 12345, pickup: '31/12/2020', mop: 'Credit', service: '50' },
  { waybill: 12345, pickup: '31/12/2020', mop: 'Credit', service: '50' },
  { waybill: 12345, pickup: '31/12/2020', mop: 'Credit', service: '50' },
  { waybill: 12345, pickup: '31/12/2020', mop: 'Credit', service: '50' },
];
const ELEMENT_DATA2: PeriodicElement2[] = [
  { Consolidation: 'N900023', ewaybill: '322433432334', Vehicle: 'HR12 233 333' },
  { Consolidation: 'N900023', ewaybill: '322433432334', Vehicle: 'HR12 233 333' },
  { Consolidation: 'N900023', ewaybill: '322433432334', Vehicle: 'HR12 233 333' },
  { Consolidation: 'N900023', ewaybill: '322433432334', Vehicle: 'HR12 233 333' },
  { Consolidation: 'N900023', ewaybill: '322433432334', Vehicle: 'HR12 233 333' },
  { Consolidation: 'N900023', ewaybill: '322433432334', Vehicle: 'HR12 233 333' },
];
