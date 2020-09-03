import { Component, OnInit } from '@angular/core';
import { DataService } from '../sharedata.service';
import { modelMSA } from '../../modelMSA';
import { ToastrService } from 'ngx-toastr';
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
    private contractservice: ContractService,private tosterservice: ToastrService) { }
msaResult:modelMSA=new modelMSA();
opportunityPostData:any={}
address
  ngOnInit(){
    this.sharedSearchdata.currentMessage.subscribe(receivedData => {
      this.msaResult=receivedData.data.responseData;
    });
      console.log("msa result",this.msaResult);
      if(this.msaResult){
      this.opportunityPostData["opprAddr"]=this.msaResult.msaCustAddrs;
      this.opportunityPostData["msaCustId"]=this.msaResult.id;
      this.opportunityPostData["prdctCtgy"]=this.msaResult.prdctCtgy;
      this.opportunityPostData["gstinNum"]=this.msaResult.gstinNum;
      this.opportunityPostData["originatingSrc"]=this.msaResult.originatingSrc;
      let addrArry = this.msaResult.msaCustAddrs[0].addr.split("|");
      this.address=addrArry[0];
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

      let ob = ErrorConstants.validateException(data);
      if (ob.isSuccess) {
        console.log(data, "opportunity response")
        this.sharedSearchdata.changeMessage(data);
      this.router.navigate(['contract'], {skipLocationChange: true});
  
      }else {
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }
    },

error => {
  console.log("error received:",error)
  this.tosterservice.error(ErrorConstants.getValue(404));
  this.spinner.hide();
}
    );   

  }

}
