import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CommonService } from 'src/app/core/services/common.service';


@Component({
  selector: 'stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  constructor(private router: Router, private commonService: CommonService) { }


  ngOnInit() {
    this.stperIconStyleChange();
  }

  currentState;
  step1; step2; step3; step4; step5; step6; step7;
  stperIconStyleChange() {
   let urll = this.router.url;
   //console.log('url',urll)
    if (!urll.includes('contract')) {
      this.currentState = urll.slice(1).split(";")[0].toLowerCase();
    }
    else {
      this.currentState = urll.slice(23).split(";")[0].toLowerCase();
    }


    // if (this.currentState == 'assign-associate') {
    // }

    if (this.currentState == 'route-allocation' || this.currentState == 'msaopportunity') {
      if (urll.includes('steper=true') || urll.includes('openDialog=true')) {
        this.step1 = "assign-associateEdit";
      } else {
        this.step1 = 'assign-associate';
      }
    }
    if (this.currentState == 'commercial') {
      if (urll.includes('steper=true')) {
        this.step1 = "assign-associateEdit"; this.step2 = "routeEdit";
      } else {
        this.step1 = 'assign-associate'; this.step2 = 'route-allocation';
      }
    }

    if (this.currentState == 'payment-terms') {
      if (urll.includes('steper=true')) {
        this.step1 = "assign-associateEdit"; this.step2 = "routeEdit"; this.step3 = "commercialEdit"
      } else {
        this.step1 = 'assign-associate'; this.step2 = 'route-allocation'; this.step3="commercial"
      }
    }

    if (this.currentState == 'booking-sla') {
      if (urll.includes('steper=true')) {
        this.step1 = "assign-associateEdit"; this.step2 = "routeEdit";
        this.step3 = "commercialEdit"; this.step4 ="paymentEdit"
      } else {
        this.step1 = 'assign-associate'; this.step2 = 'route-allocation';
        this.step3="commercial"; this.step4 = 'payment-terms';
      }
    }

    if (this.currentState == 'booking-document') {
      if (urll.includes('steper=true')) {
        this.step1 = "assign-associateEdit"; this.step2 = "routeEdit";
        this.step3 = "commercialEdit";
        this.step4 = "paymentEdit";
        this.step5 ="deductionEdit"
      } else {
        this.step1 = 'assign-associate'; this.step2 = 'route-allocation';
        this.step3="commercial"
        this.step4 = 'payment-terms';
        this.step5 = 'booking-sla';
      }
    }

    if (this.currentState == 'preview') {
      if (urll.includes('steper=true')) {
        this.step1 = "assign-associateEdit"; this.step2 = "routeEdit";
        this.step3 = "commercialEdit"; this.step4 = "paymentEdit"; this.step5 = "deductionEdit";
        this.step6 ="documentuploadEdit";
      } else {
        this.step1 = 'assign-associate'; this.step2 = 'route-allocation';
        this.step3="commercial"
        this.step4 = 'payment-terms';
        this.step5 = 'booking-sla';this.step6 = 'booking-document';
      }
    }
  }
  
  OnNextClick(url) {
    if (url) {
      let exactUrl;
      exactUrl = url.slice(0).split(";")[0].toLowerCase();
      this.commonService.steperNextFlg = true;
      if (!url.includes('edit')) {
        if(!this.router.url.includes('asso_network-contract')){
          this.router.navigate([exactUrl], {skipLocationChange: true});
        }
        else{
          this.router.navigate(['/asso_network-contract'+exactUrl], {skipLocationChange: true});
        }
      }
      else {
        if(!this.router.url.includes('asso_network-contract')){
          this.router.navigate([exactUrl, { steper: true, 'editflow': 'true' }], {skipLocationChange: true});
        }
        else{
          this.router.navigate(['/asso_network-contract'+exactUrl, { steper: true, 'editflow': 'true' }], {skipLocationChange: true});
        }
      }
    }
    else {
      this.commonService.steperNextFlg = true;
    }
  }

  onSelectLable(lableValue) {
    switch (lableValue) {
      case 'contract':
        if (this.currentState == "assign-associate") {
          this.router.navigate(['/asso_network-contract/assign-associate'], { skipLocationChange: true });
          // this.OnNextClick(null);
          return;
        } else if (this.step1 == "assign-associateEdit") {
          this.OnNextClick('/assign-associate;edit');
          return;
        } else if (this.step1 === "assign-associate") {
          this.router.navigate(['/asso_network-contract/assign-associate'], { skipLocationChange: true });
          return;
        } else if (this.step1 != "assign-associate" && this.step1 != "assign-associateEdit" && this.currentState != "assign-associate") {
          return;
        } else {
          return;
        }

      case 'route':

        if (this.currentState == "route-allocation") {
          this.router.navigate(['/asso_network-contract/route-allocation'], { skipLocationChange: true });
          return;
        } else if (this.step2 == "routeEdit") {
          this.OnNextClick('/route-allocation;edit');
          return;
        } else if (this.step2 === "route-allocation") {
          this.router.navigate(['/asso_network-contract/route-allocation'], { skipLocationChange: true });
          return;
        } else if (this.step2 != "route-allocation" && this.step2 != "routeEdit" && this.currentState != "route-allocation") {
          return;
        } else {
          return;
        }

      case 'commercial':

        if (this.currentState == "commercial") {
          this.router.navigate(['/asso_network-contract/commercial'], { skipLocationChange: true });
          return;
        } else if (this.step3 == "commercialEdit") {
          this.OnNextClick('/commercial;edit');
          return;
        } else if (this.step3 === "commercial") {
          this.router.navigate(['/asso_network-contract/commercial'], { skipLocationChange: true });
          return;
        } else if (this.step3 != "commercial" && this.step3 != "commercialEdit" && this.currentState != "commercial") {
          return;
        } else {
          return;
        }

        case 'payment':

          if (this.currentState == "payment-terms") {
            this.router.navigate(['/asso_network-contract/payment-terms'], { skipLocationChange: true });
            return;
          } else if (this.step4 == "paymentEdit") {
            this.OnNextClick('/payment-terms;edit');
            return;
          } else if (this.step4 === "payment-terms") {
            this.router.navigate(['/asso_network-contract/payment-terms'], { skipLocationChange: true });
            return;
          } else if (this.step4 != "payment-terms" && this.step4 != "paymentEdit" && this.currentState != "payment-terms") {
            return;
          } else {
            return;
          }

      case 'deduction':

        if (this.currentState == "booking-sla") {
          this.router.navigate(['/asso_network-contract/booking-sla'], { skipLocationChange: true });
          return;
        } else if (this.step5 == "deductionEdit") {
          this.OnNextClick('/booking-sla;edit');
          return;
        } else if (this.step5 === "booking-sla") {
          this.router.navigate(['/asso_network-contract/booking-sla'], { skipLocationChange: true });
          return;
        } else if (this.step5 != "booking-sla" && this.step5 != "deductionEdit" && this.currentState != "booking-sla") {
          return;
        } else {
          return;
        }

      case 'document':

        if (this.currentState == "booking-document") {
          this.router.navigate(['/asso_network-contract/booking-document'], { skipLocationChange: true });
          return;
        } else if (this.step6 == "documentuploadEdit") {
          this.OnNextClick('/booking-document;edit');
          return;
        } else if (this.step6 === "booking-document") {
          this.router.navigate(['/asso_network-contract/booking-document'], { skipLocationChange: true });
          return;
        } else if (this.step6 != "booking-document" && this.step6 != "documentuploadEdit" && this.currentState != "booking-document") {
          return;
        } else {
          return;
        }

        default:
          return;
    }
  }


}
