import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sticker-print',
  templateUrl: './sticker-print.component.html',
  styleUrls: ['./sticker-print.component.css']
})
export class StickerPrintComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
stickerPrint1;
stickerPrint2;
stickerPrint3;
  displayedColumns: string[] = ['request', 'waybill', 'pick'];
  dataSource = ELEMENT_DATA;

}

export interface PeriodicElement {
  request: string;
  waybill: string;
  pick: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {request: 'CUSS124421123', waybill: '124421123', pick: ''},
];