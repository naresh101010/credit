import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CommonService } from 'src/app/core/common.service';

@Component({
  selector: 'stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['../core.css']
})
export class StepperComponent implements OnInit {

  constructor(private router: Router, private CommonService: CommonService) {}

  currentState;
  step1; step2; step3; step4; step5; step6; step7;

  ngOnInit() {
    this.stperIconStyleChange();
  }

  stperIconStyleChange() {
    let urll=this.router.url;
    if(!urll.includes('contract')){
      this.currentState = urll.slice(1).split(";")[0].toLowerCase();
    }
    else{
      this.currentState = urll.slice(10).split(";")[0].toLowerCase();
    }

    // if (this.currentState == 'msa') {
    // }

    if (this.currentState == 'opportunity' || this.currentState == 'msaopportunity') {
      if (urll.includes('steper=true') || urll.includes('openDialog=true')) {
        this.step1 = "msaEdit";
      } else {
        this.step1 = 'msa';
      }
    }

    if (this.currentState == 'service') {
      if (urll.includes('steper=true')) {
        this.step1 = "msaEdit";this.step2 = "opportunityEdit";
      } else {
        this.step1 = 'msa'; this.step2 = 'opportunity';
      }
    }

    if (this.currentState == 'ratecard') {
      if (urll.includes('steper=true')) {
        this.step1 = "msaEdit";this.step2 = "opportunityEdit";this.step3 = "serviceEdit";
      } else {
        this.step1 = 'msa'; this.step2 = 'opportunity';this.step3 = 'service';
      }
    }

    if (this.currentState == 'billing') {
      if (urll.includes('steper=true')) {
        this.step1 = "msaEdit";this.step2 = "opportunityEdit";
        this.step3 = "serviceEdit"; this.step4 = "ratecardEdit";
      } else {
        this.step1 = 'msa';this.step2 = 'opportunity';
        this.step3 = 'service'; this.step4 = 'ratecard';
      }
    }

    if (this.currentState == 'documentupload') {
      if (urll.includes('steper=true')) {
        this.step1 = "msaEdit"; this.step2 = "opportunityEdit"; this.step3 = "serviceEdit";
        this.step4 = "ratecardEdit";
        this.step5 = "billingEdit";
      } else {
        this.step1 = 'msa'; this.step2 = 'opportunity';this.step3 = 'service';
        this.step4 = 'ratecard';
        this.step5 = 'billing';
      }
    }

    if (this.currentState == 'preview') {
      if (urll.includes('steper=true')) {
        this.step1 = "msaEdit"; this.step2 = "opportunityEdit";this.step3 = "serviceEdit";
        this.step4 = "ratecardEdit"; this.step5 = "billingEdit";this.step6 = "documentuploadEdit";
      } else {
        this.step1 = 'msa';this.step2 = 'opportunity';this.step3 = 'service';
        this.step4 = 'ratecard';this.step5 = 'billing'; this.step6 = 'documentupload';
      }
    }
  }

  OnNextClick(url) {
    if (url) {
      let exactUrl;
      exactUrl = url.slice(0).split(";")[0].toLowerCase();
      this.CommonService.steperNextFlg = true;
      if (!url.includes('edit')) {
        if(!this.router.url.includes('contract')){
          this.router.navigate([exactUrl], {skipLocationChange: true});
        }
        else{
          this.router.navigate(['/contract'+exactUrl], {skipLocationChange: true});
        }
      }
      else {
        if(!this.router.url.includes('contract')){
          this.router.navigate([exactUrl, { steper: true, 'editflow': 'true' }], {skipLocationChange: true});
        }
        else{
          this.router.navigate(['/contract'+exactUrl, { steper: true, 'editflow': 'true' }], {skipLocationChange: true});
        }
      }
    }
    else {
      this.CommonService.steperNextFlg = true;
    }
  }
}
