import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { StickerPrintComponent } from 'src/app/dialog/sticker-print/sticker-print.component';

@Component({
  selector: 'app-create-waybill',
  templateUrl: './create-waybill.component.html',
  styleUrls: ['./create-waybill.component.css']
})
export class CreateWaybillComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openStickerPrint() {
    this.dialog.open(StickerPrintComponent, {
        width: '50rem',
        panelClass: 'bookingDialog'
    });
}

}
