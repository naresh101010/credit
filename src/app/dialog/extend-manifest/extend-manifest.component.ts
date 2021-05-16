import { Component, OnInit, Inject } from '@angular/core';
import { ManifestService } from 'src/app/core/service/manifest.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { CommonService } from 'src/app/core/common.service';

@Component({
  selector: 'app-extend-manifest',
  templateUrl: './extend-manifest.component.html',
  styleUrls: ['./extend-manifest.component.css']
})
export class ExtendManifestComponent implements OnInit {
  locationName: any;
  hubValue = [];
  showList = true
  hubname:any;
  branchId: any;
  manifestId: any;
  constructor( 
    private manifestService: ManifestService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public router:Router,
    public dialogRef: MatDialogRef<ExtendManifestComponent>,
    private spinner: NgxSpinnerService,
    private matSnackbar: MatSnackBar,
    private commonService: CommonService
    ) { 
    console.log('data' , data,data.id)
    // this.locationName = data.item;
    this.manifestId = data.id;
  }
  
  ngOnInit() {
    // this.getBranchDetailByBrancId(this.data.branchId)
    this.locationName = this.data.serviceOfferigs;
    sessionStorage.removeItem('manifestId');
    sessionStorage.removeItem('extended');
  }
  getBranchDetailByBrancId(id) {
    this.commonService.getBranchDetailByBrancId([id]).subscribe((resp: any) => {
      console.log(resp);
      // const response = resp.data.responseData;
      if (resp && resp.length) {
        this.locationName = resp[0].branchName
      }
    },(err) => {
      console.log(err);
    })
  }
  onKeyUp(event){
    console.log(event.target.value)
    let hubname = event.target.value;
    let hubnameLength = event.target.value.length;
    if(hubnameLength >= 3){
      this.manifestService.getHubname(hubname).subscribe((resp: any) => {
        this.hubValue = resp.data.responseData;
        this.showList = true;
      })
    }
  }
  no() {
    this.dialogRef.close();
  }
  selectLocation(item){
    this.hubname = item.branchName;
    this.branchId = item.branchId;
    this.showList = false;
    console.log('@2' , this.hubname)
    sessionStorage.setItem('tobranchId' ,this.branchId)
    sessionStorage.setItem('manifestId' ,this.manifestId)
  }
  extendManifest(){
    if (!this.branchId) {
      this.matSnackbar.open('Please select hub name', "", {
        duration: 3000,
        panelClass: ["text-white", "bg-red"],
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      return;
    }
    this.spinner.show();
    this.manifestService.extendManifest(this.branchId, this.manifestId).subscribe((resp: any) => {
      console.log('res' , resp);
      this.spinner.hide();
      // this.dialogRef.close('true');
      sessionStorage.setItem('manifestId', this.manifestId);
      sessionStorage.setItem('extended', 'yes');
      this.consolidateManifest();
      this.router.navigateByUrl('/bookings-web-booking/update-manifest')
    },(err:any)=>{
      this.spinner.hide();
    })
  }
  consolidateManifest() {
    this.manifestService.consilidateDataByManifestId(this.manifestId).subscribe(resp => {
      console.log(resp);
    }, (err) => {
      console.log(err);
    })
  }
}
