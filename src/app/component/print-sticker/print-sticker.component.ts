import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-sticker',
  templateUrl: './print-sticker.component.html',
  styleUrls: ['./print-sticker.component.css']
})
export class PrintStickerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
showOnHide;
hideOnShow;
showOnHidePrSt;
hideOnShowRePr;
  displayedColumns: string[] = ['request', 'waybill', 'laying'];
  dataSource = ELEMENT_DATA;

}

export interface PeriodicElement {
  request: string;
  waybill: string;
  laying: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {request: '', waybill: '', laying: ''},
  {request: '', waybill: '', laying: ''},
  {request: '', waybill: '', laying: ''},
  {request: '', waybill: '', laying: ''},
];
