import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CommonService } from 'src/app/core/services/common.service';


@Component({
  selector: 'stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  constructor(private router: Router, private CommonService: CommonService) { }


  ngOnInit() {
    this.stperIconStyleChange();
  }

  currentState;
  step1; step2; step3; step4; step5; step6; step7;
  stperIconStyleChange() {
   let urll = this.router.url;
    if (!urll.includes('contract')) {
      this.currentState = urll.slice(1).split(";")[0].toLowerCase();
    }
    else {
      this.currentState = urll.slice(23).split(";")[0].toLowerCase();
    }

    // if (this.currentState == 'assign-associate') {
    // }

    if (this.currentState == 'branch-allocation' || this.currentState == 'msaopportunity') {
      if (urll.includes('steper=true') || urll.includes('openDialog=true')) {
        this.step1 = "msaEdit";
      } else {
        this.step1 = 'assign-associate';
      }
    }

    // if (this.currentState == 'service') {
    //   if (urll.includes('steper=true')) {
    //     this.step1 = "msaEdit";this.step2 = "opportunityEdit";
    //   } else {
    //     this.step1 = 'assign-associate'; this.step2 = 'branch-allocation';
    //   }
    // }

    if (this.currentState == 'booking-payout') {
      if (urll.includes('steper=true')) {
        this.step1 = "msaEdit"; this.step2 = "opportunityEdit";
      } else {
        this.step1 = 'assign-associate'; this.step2 = 'branch-allocation';
      }
    }

    if (this.currentState == 'booking-sla') {
      if (urll.includes('steper=true')) {
        this.step1 = "msaEdit"; this.step2 = "opportunityEdit";
        this.step3 = "ratecardEdit";
      } else {
        this.step1 = 'assign-associate'; this.step2 = 'branch-allocation';
        this.step3 = 'booking-payout';
      }
    }

    if (this.currentState == 'booking-document') {
      if (urll.includes('steper=true')) {
        this.step1 = "msaEdit"; this.step2 = "opportunityEdit";
        this.step3 = "ratecardEdit";
        this.step4 = "billingEdit";
      } else {
        this.step1 = 'assign-associate'; this.step2 = 'branch-allocation';
        this.step3 = 'booking-payout';
        this.step4 = 'booking-sla';
      }
    }

    if (this.currentState == 'preview') {
      if (urll.includes('steper=true')) {
        this.step1 = "msaEdit"; this.step2 = "opportunityEdit";
        this.step3 = "ratecardEdit"; this.step4 = "billingEdit"; this.step5 = "documentuploadEdit";
      } else {
        this.step1 = 'assign-associate'; this.step2 = 'branch-allocation';
        this.step3 = 'booking-payout';
        this.step4 = 'booking-sla';this.step5 = 'booking-document';
      }
    }
  }
  
  OnNextClick(url) {
    if (url) {
      let exactUrl;
      exactUrl = url.slice(0).split(";")[0].toLowerCase();
      this.CommonService.steperNextFlg = true;
      if (!url.includes('edit')) {
        if(!this.router.url.includes('asso_booking-contract')){
          this.router.navigate([exactUrl], {skipLocationChange: true});
        }
        else{
          this.router.navigate(['/asso_booking-contract'+exactUrl], {skipLocationChange: true});
        }
      }
      else {
        if(!this.router.url.includes('asso_booking-contract')){
          this.router.navigate([exactUrl, { steper: true, 'editflow': 'true' }], {skipLocationChange: true});
        }
        else{
          this.router.navigate(['/asso_booking-contract'+exactUrl, { steper: true, 'editflow': 'true' }], {skipLocationChange: true});
        }
      }
    }
    else {
      this.CommonService.steperNextFlg = true;
    }
  }


}
