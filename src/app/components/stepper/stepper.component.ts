import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CommonService } from 'src/app/core/services/common.service';


@Component({
  selector: 'stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  constructor(private router: Router, private CommonService_: CommonService) { }


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
      this.currentState = urll.slice(24).split(";")[0].toLowerCase();
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
      this.CommonService_.steperNextFlg = true;
      if (!url.includes('edit')) {
        if(!this.router.url.includes('asso_delivery-contract')){
          this.router.navigate([exactUrl], {skipLocationChange: true});
        }
        else{
          this.router.navigate(['/asso_delivery-contract'+exactUrl], {skipLocationChange: true});
        }
      }
      else {
        if(!this.router.url.includes('asso_delivery-contract')){
          this.router.navigate([exactUrl, { steper: true, 'editflow': 'true' }], {skipLocationChange: true});
        }
        else{
          this.router.navigate(['/asso_delivery-contract'+exactUrl, { steper: true, 'editflow': 'true' }], {skipLocationChange: true});
        }
      }
    }
    else {
      this.CommonService_.steperNextFlg = true;
    }
  }

  onSelectLable(lableValue) {
    switch (lableValue) {
      case 'contract':
        if (this.currentState == "assign-associate") {
          this.router.navigate(['/asso_delivery-contract/assign-associate'], { skipLocationChange: true });
          return;
        } else if (this.step1 == "msaEdit") {
          this.OnNextClick('/assign-associate;edit');
          return;
        } else if (this.step1 === "assign-associate") {
          this.router.navigate(['/asso_delivery-contract/assign-associate'], { skipLocationChange: true });
          return;
        } else if (this.step1 != "assign-associate" && this.step1 != "msaEdit" && this.currentState != "assign-associate") {
          return;
        } else {
          return;
        }

      case 'branch':

        if (this.currentState == "branch-allocation") {
          this.router.navigate(['/asso_delivery-contract/branch-allocation'], { skipLocationChange: true });
          return;
        } else if (this.step2 == "opportunityEdit") {
          this.OnNextClick('/branch-allocation;edit');
          return;
        } else if (this.step2 === "branch-allocation") {
          this.router.navigate(['/asso_delivery-contract/branch-allocation'], { skipLocationChange: true });
          return;
        } else if (this.step2 != "branch-allocation" && this.step2 != "opportunityEdit" && this.currentState != "branch-allocation") {
          return;
        } else {
          return;
        }

      case 'payment':

        if (this.currentState == "booking-payout") {
          this.router.navigate(['/asso_delivery-contract/booking-payout'], { skipLocationChange: true });
          return;
        } else if (this.step3 == "ratecardEdit") {
          this.OnNextClick('/booking-payout;edit');
          return;
        } else if (this.step3 === "booking-payout") {
          this.router.navigate(['/asso_delivery-contract/booking-payout'], { skipLocationChange: true });
          return;
        } else if (this.step3 != "booking-payout" && this.step3 != "ratecardEdit" && this.currentState != "booking-payout") {
          return;
        } else {
          return;
        }

      case 'deduction':

        if (this.currentState == "booking-sla") {
          this.router.navigate(['/asso_delivery-contract/booking-sla'], { skipLocationChange: true });
          return;
        } else if (this.step4 == "billingEdit") {
          this.OnNextClick('/booking-sla;edit');
          return;
        } else if (this.step4 === "booking-sla") {
          this.router.navigate(['/asso_delivery-contract/booking-sla'], { skipLocationChange: true });
          return;
        } else if (this.step4 != "booking-sla" && this.step4 != "billingEdit" && this.currentState != "booking-sla") {
          return;
        } else {
          return;
        }

      case 'document':

        if (this.currentState == "booking-document") {
          this.router.navigate(['/asso_delivery-contract/booking-document'], { skipLocationChange: true });
          return;
        } else if (this.step5 == "documentuploadEdit") {
          this.OnNextClick('/booking-document;edit');
          return;
        } else if (this.step5 === "booking-document") {
          this.router.navigate(['/asso_delivery-contract/booking-document'], { skipLocationChange: true });
          return;
        } else if (this.step5 != "booking-document" && this.step5 != "documentuploadEdit" && this.currentState != "booking-document") {
          return;
        } else {
          return;
        }

        default:
          return;
    }
  }



}
