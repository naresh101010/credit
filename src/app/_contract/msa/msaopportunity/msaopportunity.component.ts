import { Component, OnInit } from '@angular/core';
import { DataService } from '../sharedata.service';
import { modelMSA } from '../../modelMSA';
import { TosterService } from '../../toster.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContractService } from '../../contract.service';
import { ErrorConstants } from '../../models/constants';

@Component({
  selector: 'app-msaopportunity',
  templateUrl: './msaopportunity.component.html',
  styleUrls: ['../../core.css']
})
export class MsaopportunityComponent implements OnInit {

  constructor(private sharedSearchdata: DataService,public router: Router,private spinner: NgxSpinnerService,
    private contractservice: ContractService,private tosterservice: TosterService) { }
msaResult:modelMSA=new modelMSA();
opportunityPostData:any={}
address
  ngOnInit(){
    this.sharedSearchdata.currentMessage.subscribe(receivedData => {
      console.log("data received from msa creation component",receivedData);
      this.msaResult=receivedData.data.responseData;
    });
      console.log("msa result",this.msaResult);
      if(this.msaResult){
      this.opportunityPostData["opprAddr"]=this.msaResult.msaCustAddrs;
      this.opportunityPostData["msaCustId"]=this.msaResult.id;
      this.opportunityPostData["prdctCtgy"]=this.msaResult.prdctCtgy;
      this.opportunityPostData["gstinNum"]=this.msaResult.gstinNum;
      this.opportunityPostData["originatingSrc"]=this.msaResult.originatingSrc;
      this.address=this.msaResult.msaCustAddrs[0].addr;
      console.log("opportunity data",this.opportunityPostData);
      }
    
  
  }

  postOpportunity(){
    this.spinner.show();
    this.opportunityPostData.opprAddr[0].addr=this.address
    this.opportunityPostData["lkpOpprType"]='NEW OPPORTUNITY';
    let val = Math.floor(Math.random() * (1000 + 5000)) + 1000;
    console.log("postopportunity called",this.opportunityPostData);
    this.contractservice.postOpportunityPropeli(this.opportunityPostData)
    .subscribe(data => {

      console.log(data, "opportunity response")
      this.sharedSearchdata.changeMessage(data);
      this.router.navigate(['/retail-contract']);
    },

error => {
  console.log("error received:",error)
  this.tosterservice.Error(ErrorConstants.getValue(404));
  this.spinner.hide();
}
    );   

  }

}
