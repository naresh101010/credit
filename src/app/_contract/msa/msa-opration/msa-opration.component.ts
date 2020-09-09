// import { Component, OnInit } from '@angular/core';
import { Component, OnInit  } from '@angular/core';
import { ContractService } from '../../contract.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { NgxSpinnerService } from "ngx-spinner";
import { searchCriteria } from '../../models/searchCriteria';
import { DataService } from "../sharedata.service";
import {ExistingsafexlistComponent } from "../../existingsafexlist/existingsafexlist.component";
@Component({
  selector: 'app-msa-opration',
  templateUrl: './msa-opration.component.html',
  styleUrls: ["../../core.css"]
})
export class MsaOprationComponent implements OnInit {

  constructor(private contractservice: ContractService,private sharedSearchdata: DataService,private spinner: NgxSpinnerService,private acrouter: ActivatedRoute,
    private router: Router, private dialog: MatDialog) { }

  searchModel:searchCriteria = new searchCriteria();
  editflow = false;
  isDisable = false;
  ngOnInit() {
    this.isDisable = false;
    this.acrouter.params.subscribe(params => {
      if (params['openDialog']) {
        this.editflow = params['openDialog'];
        this.isDisable = true;
      }
    });
    // this.sharedSearchdata.currentMessage.subscribe(msadata => msadata = msadata)
    this.referenceData=this.getMSAReferences();
  }
  msaSearchResult;
  referenceData;
  createmsa=true;
  getMSAsearch(){
    console.log("msa search called");
    this.spinner.show();
    this.contractservice.getMSASearch(this.searchModel)
      .subscribe(data => {
        this.spinner.hide();
       this.msaSearchResult=data.data.responseData;
      });
  }

  getMSAReferences(){
    this.spinner.show();
    this.contractservice.getMSAReferences()
      .subscribe(data => {
       this.referenceData=data.data.referenceData;
        this.spinner.hide();
      });
  }
//msadata:any
  passResultData(msadata){
    let passData ={}
    passData["msadata"]=msadata;
    passData["referenceData"]=this.referenceData;
    this.sharedSearchdata.changeMessage(passData)
   
  }
  
  showMSA(msadata){
	    let passcustId=msadata.id
	    console.log("wholedata",msadata,"called pass showData",passcustId)
	    this.sharedSearchdata.changeMessage(passcustId)	   
	  }
  
      // dialog
  openDialogSFXSearch(msadata): void {
    
    const dialogRefEdit = this.dialog.open(ExistingsafexlistComponent, {
      width: '1000px',
      data: {msaId:msadata.id,isEditflow: true},
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefEdit.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


