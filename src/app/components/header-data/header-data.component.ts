import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppSetting } from 'src/app/app.setting';

@Component({
  selector: 'app-header-data',
  template: `
  <div class="bg_gray_msa_4">
  <div class="row">
    <div class="col-md-3 col-sm-6">
      <p class="row_center" matTooltipPosition="above" [matTooltip]="associateData?.contactFname + ' ' + associateData?.contactLname | uppercase"><strong>Associate Name: </strong> {{associateData?.contactFname}}</p>
    </div>
    <div class="col-md-3 col-sm-6">
      <p><strong>PAN: </strong> {{(associateData?.panNum).toUpperCase()}}</p>
    </div>
    <div class="col-md-3 col-sm-6">
      <p><strong>Associate Category:</strong> DELIVERY</p>
    </div>
    <div class="col-md-3 col-sm-6">
    <p><strong>W.E.F: </strong><span id="wef_Date"></span></p>
    </div>
  </div>
</div>
  `,
  providers:[DatePipe]
 
})
export class HeaderDataComponent implements OnInit {

  associateData : any;
  wef : any;
  constructor(private datePipe : DatePipe) { }

  ngOnInit() {
    this.associateData = AppSetting.associateObject;
    this.wef = AppSetting.wefDate;
    // security fix
    let dtEle = document.getElementById("wef_Date");
    if(dtEle){
      dtEle.textContent = this.datePipe.transform(this.wef, 'dd/MM/yyyy')
    }
  }

}
