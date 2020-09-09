import { Component, OnInit, Input, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { ContractService } from '../contract.service';
import { AppSetting } from "../../app.setting";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ErrorConstants }  from '../models/constants';




@Component({
  selector: 'app-submitbtn',
  templateUrl: './submitbtn.component.html',
  styleUrls: ["../core.css"]
})
export class SubmitbtnComponent implements OnInit, AfterViewChecked {

  @Input() editflow : boolean;

  constructor(
    private contractService: ContractService,
    private tosterservice: ToastrService,
    private spinner: NgxSpinnerService,
    public router: Router,
    private changeDetect : ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    this.changeDetect.detectChanges();
  }   


  submitRateCard() {
    this.contractService.generateSFXCode(AppSetting.contractId,this.editflow)
    .subscribe(result => {
      
      this.tosterservice.success(result.data.responseData.sfxCode);
      this.router.navigate(['/retail-contract/creditdashboard'],{skipLocationChange: true}); 
      },
      error => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
      });
  // this.router.navigate(['/retail-contract/']);    
  }

  previewData(){
    if(this.editflow){
      this.router.navigate(['/retail-contract/preview',{editflow : this.editflow}],{skipLocationChange: true});  
    } else {
      this.router.navigate(['/retail-contract/preview'], {skipLocationChange: true});  
    }
  }

}
