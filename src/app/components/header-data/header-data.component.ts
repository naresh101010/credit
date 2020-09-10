import { Component, OnInit } from '@angular/core';
import { AppSetting } from 'src/app/app.setting';

@Component({
  selector: 'app-header-data',
  template: `
  <div class="bg_gray_msa_4">
  <div class="row">
    <div class="col-md-3 col-sm-6">
      <p><strong>Associate Name: </strong> {{associateData?.contactFname}}</p>
    </div>
    <div class="col-md-3 col-sm-6">
      <p><strong>PAN: </strong> {{(associateData?.panNum).toUpperCase()}}</p>
    </div>
    <div class="col-md-3 col-sm-6">
      <p><strong>Associate Category:</strong> BOOKING</p>
    </div>
    <div class="col-md-3 col-sm-6">
      <p><strong>W.E.F:</strong> {{wef | date: 'dd/MM/yyyy'}}</p>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./header-data.component.css']
})
export class HeaderDataComponent implements OnInit {

  associateData : any;
  wef : any;
  constructor() { }

  ngOnInit() {
    this.associateData = AppSetting.associateObject;
    this.wef = AppSetting.wefDate;
  }

}
