import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CommonService } from 'src/app/core/common.service';
import { AppSetting } from 'src/app/app.setting';
import { DataService } from "../msa/sharedata.service";


@Component({
  selector: 'stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['../core.css', './stepper.component.css']
})
export class StepperComponent implements OnInit {

  constructor(private router: Router, private CommonService: CommonService,private sharedSearchdata: DataService,) {}
    firstFormGroup;
   secondFormGroup;
   thirdFormGroup;
   fourthFormGroup;
   fifthFormGroup;
   sixFormGroup;
   editflow;
  currentState;
  step1; step2; step3; step4; step5; step6; step7;
  msaLevel:boolean=false;

  ngOnInit() {
    this.stperIconStyleChange();
  }
  
  stperIconStyleChange() {
    let urll=this.router.url;
    this.sharedSearchdata.currentMSALevel.subscribe(mlevel => {
   console.log(mlevel,'stepper')
   if(mlevel=='MSA CLUSTER')
   {
     this.msaLevel=true;
   }else{
     this.msaLevel=false;
   }
  });



    this.currentState = urll.slice(17).split(";")[0].toLowerCase();
    // if(!urll.includes('contract')){
    //   this.currentState = urll.slice(1).split(";")[0].toLowerCase();
    // }
    // else{
    //   this.currentState = urll.slice(10).split(";")[0].toLowerCase();
    // }
   // console.log(this.currentState,':::this is url data',urll.includes("msa",0))
    if (this.currentState == 'msa') {
    }

    // if (this.currentState == 'opportunity' || this.currentState == 'msaopportunity') {
    //   if (urll.includes('steper=true') || urll.includes('openDialog=true')) {
    //     this.step1 = "msaEdit";
    //   } else {
    //     this.step1 = 'msa';
    //   }
    // }
  
    if (this.currentState == 'contract' || this.currentState == 'msaopportunity') {
      if (urll.includes('editflow=true') || urll.includes('openDialog=true')) {
        this.step1 = "msaEdit";
      } else {
        this.step1 = 'msa';
      }
    }


    if (this.currentState == 'service') {
    
      if (urll.includes('editflow=true')) {
        this.step1 = "msaEdit";this.step2 = "contractEdit";
      } else {
        this.step1 = 'msa'; this.step2 = 'contract';
      }
    }

    if (this.currentState == 'ratecard') {
      if (urll.includes('editflow=true')) {
        this.step1 = "msaEdit";this.step2 = "contractEdit";this.step3 = "serviceEdit";
      } else {
        this.step1 = 'msa'; this.step2 = 'contract';this.step3 = 'service';
      }
    }

    if (this.currentState == 'branch') {
      if (urll.includes('editflow=true')) {
        this.step1 = "msaEdit";this.step2 = "contractEdit";
        this.step3 = "serviceEdit"; this.step4 = "ratecardEdit";
      } else {
        this.step1 = 'msa';this.step2 = 'contract';
        this.step3 = 'service'; this.step4 = 'ratecard';
      }
    }

    // if (this.currentState == 'documentupload') {
    //   if (urll.includes('steper=true')) {
    //     this.step1 = "msaEdit"; this.step2 = "opportunityEdit"; this.step3 = "serviceEdit";
    //     this.step4 = "ratecardEdit";this.step5 = "billingEdit";
    //   } else {
    //     this.step1 = 'msa'; this.step2 = 'opportunity';this.step3 = 'service';
    //     this.step4 = 'ratecard';this.step5 = 'billing';
    //   }
    // }

    if (this.currentState == 'preview') {
      if (urll.includes('editflow=true')) {
        this.step1 = "msaEdit"; this.step2 = "contractEdit";this.step3 = "serviceEdit";
        this.step4 = "ratecardEdit"; this.step5 = "branchEdit";
      } else {
        this.step1 = 'msa';this.step2 = 'contract';this.step3 = 'service';
        this.step4 = 'ratecard';this.step5 = 'branch'; 
      }
    }
  }

  OnNextClick(url?) {
    if (url) {
      let exactUrl;
      exactUrl = url.slice(0).split(";")[0].toLowerCase();
      this.CommonService.steperNextFlg = true;
      if (!url.includes('edit')) {
        if(!this.router.url.includes('retail-contract')){
          this.router.navigate([exactUrl],{skipLocationChange: true});
        }
        else{
          this.router.navigate(['/retail-contract/'+exactUrl], {skipLocationChange: true});
        }
      }
      else {
        if(!this.router.url.includes('/retail-contract')){
          this.router.navigate([exactUrl, {'editflow': 'true' }], {skipLocationChange: true});
        }
        else{
          this.router.navigate(['/retail-contract/'+exactUrl, {'editflow': 'true' }], {skipLocationChange: true});
        }
      }
    }
    else {
      this.CommonService.steperNextFlg = true;
    }
  }
}