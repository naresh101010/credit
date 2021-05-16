import { Component, OnInit, Inject } from '@angular/core';
import { ManifestService } from 'src/app/core/service/manifest.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-finalise-modal',
  templateUrl: './finalise-modal.component.html',
  styleUrls: ['./finalise-modal.component.css']
})
export class FinaliseModalComponent implements OnInit {

  constructor(
    private manifestService: ManifestService,
    public dialogRef: MatDialogRef<FinaliseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,
    private spinner: NgxSpinnerService) {
    console.log('data', data)
  }

  ngOnInit() {
  }
  finalizeManifest() {
    this.spinner.show();
    this.manifestService.finalizemanifest(this.data.id).subscribe((resp: any) => {
      console.log('res', resp);
      this.dialogRef.close('true');
      this.spinner.hide();
    }, (err: any) => {
      this.spinner.hide();
    })
  }
}
