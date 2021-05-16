import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { WaybillService } from 'src/app/core/service/waybill.service';

@Component({
  selector: 'app-waybill-inventory',
  templateUrl: './waybill-inventory.component.html',
  styleUrls: ['./waybill-inventory.component.css']
})
export class WaybillInventoryComponent implements OnInit {

  constructor(
    private waybillService: WaybillService,
    private spinner: NgxSpinnerService) { }
  dataSource: MatTableDataSource<any>;
  ngOnInit() {
    this.getWaybillInventoryBywaybilBranchid()
  }

  displayedColumns: string[] = ['from', 'to', 'available'];
  // dataSource = ELEMENT_DATA;
  getWaybillInventoryBywaybilBranchid() {
    this.spinner.show();
    this.waybillService.getWaybillInventoryBywaybilBranchid().subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.dataSource = new MatTableDataSource(resp.data.responseData)
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    })
  }
  applyFilter(filterValue) {
    ;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface PeriodicElement {
  from: number;
  to: number;
  available: number;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { from: 12345, to: 12345, available: 23 },
  { from: 12345, to: 12345, available: 23 },
  { from: 12345, to: 12345, available: 23 },
];