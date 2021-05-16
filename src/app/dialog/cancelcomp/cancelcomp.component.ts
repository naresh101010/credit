import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StartBookingComponent } from 'src/app/component/start-booking/start-booking.component';
import { ManifestService } from 'src/app/core/service/manifest.service';
import { ConfirmManifestModalComponent } from '../confirm-manifest-modal/confirm-manifest-modal.component';

@Component({
  selector: 'app-cancelcomp',
  templateUrl: './cancelcomp.component.html',
  styleUrls: ['./cancelcomp.component.css']
})
export class CancelcompComponent implements OnInit {
  
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<StartBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit() {
    console.log('data', this.data)
  }

  yes(){

  }

}
