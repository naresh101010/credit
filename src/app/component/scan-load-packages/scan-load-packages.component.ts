import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManifestService } from 'src/app/core/service/manifest.service';

@Component({
  selector: 'app-scan-load-packages',
  templateUrl: './scan-load-packages.component.html',
  styleUrls: ['./scan-load-packages.component.css']
})
export class ScanLoadPackagesComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private mainfestService: ManifestService) { }
  manifestId;
  displayedColumns: string[] = ['waybill', 'pickup'];
  dataSource: MatTableDataSource<any>;
  dataSource1: MatTableDataSource<any>;
  totalPackageCount = 0;
  remainingPackageCount = 0;
  @ViewChild('paginator1', {static: true}) paginator1: MatPaginator;
  @ViewChild('paginator2', {static: true}) paginator2: MatPaginator;
  pageNumber = 0;
  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;
  ngOnInit() {
    this.manifestId = sessionStorage.getItem('manifestId');
    console.log(this.manifestId);
    if (this.manifestId) {
      this.getManifestDetailById();
    }
  }

  getManifestDetailById() {
    this.spinner.show();
    this.mainfestService.getManfestDetailsById(this.manifestId).subscribe(
      async (resp: any) => {
        console.log(resp);
        if (resp.status == 'SUCCESS') {
          const response = resp.data.responseData;
          const waybillList = response.manifestWaybillList;
          let totalRemainingPackage = [];
          let i = 0;
          if (!waybillList.length) {
            this.spinner.hide();
          }
          for (const data of waybillList) {
            const waybillResp: any = await this.mainfestService.getByWayBillNumber(data.waybillNumber).toPromise();
            this.totalPackageCount += (data.avlPkgCount ? data.avlPkgCount : 0);
            console.log('this.totalPackageCount', this.totalPackageCount);
            const waybillDetails = waybillResp.data.responseData;
            const remaninigPackages = await this.mainfestService.getRemainingPackages(waybillDetails.waybillId).toPromise();
            console.log('remaninigPackages', remaninigPackages);
            totalRemainingPackage = [...totalRemainingPackage, ...remaninigPackages];
            this.remainingPackageCount = totalRemainingPackage.length;
            this.dataSource = new MatTableDataSource(totalRemainingPackage);
            this.dataSource1 = new MatTableDataSource(totalRemainingPackage);
            this.dataSource.paginator = this.paginator1;
            this.dataSource1.paginator = this.paginator2;
            i++;
            if (i == waybillList.length) {
              this.spinner.hide();
            }
          }
        }
      }, (err: any) => {
        this.spinner.hide();
      }
    );
  }
}

export interface PeriodicElement {
  waybill: string;
  pickup: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { waybill: 'Cust12213213321', pickup: '900010025155231' },
  { waybill: 'Cust12213213321', pickup: '900010025155231' },
  { waybill: 'Cust12213213321', pickup: '900010025155231' },
  { waybill: 'Cust12213213321', pickup: '900010025155231' },
];
