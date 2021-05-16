import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ManifestService } from 'src/app/core/service/manifest.service';

@Component({
  selector: 'app-confirm-manifest-modal',
  templateUrl: './confirm-manifest-modal.component.html',
  styleUrls: ['./confirm-manifest-modal.component.css']
})
export class ConfirmManifestModalComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmManifestModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private manifestService: ManifestService
  ) { }

  ngOnInit() {
    console.log('data', this.data)
  }

  yes(){
    this.manifestService.confirmManifest(this.data.id).subscribe((res:any)=>{
      this.dialogRef.close(true);
    },(err:any)=>{

    })
  }

}
