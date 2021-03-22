import { Component, OnInit } from '@angular/core';
import { AppSetting } from 'src/app/app.setting';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-header-data',
  template: `
  <div class="bg_gray_msa_4">
  <div class="row">
    <div class="col-md-3 col-sm-6">
      <p class="row_center" matTooltipPosition="above" [matTooltip]="associateData?.contactFname + ' ' + associateData?.contactLname | uppercase"><strong>Associate Name: </strong> {{associateData?.contactFname}}</p>
    </div>
    <div class="col-md-3 col-sm-6">
      <p><strong>Vehicle Type: </strong> {{(associateData?.nrmVehicleType).toUpperCase()}}</p>
    </div>
    <div class="col-md-3 col-sm-6">
      <p><strong>Associate Category:</strong> {{associateCate}}</p>
    </div>
    <div class="col-md-3 col-sm-6">
      <p><strong>W.E.F:</strong> {{wef | date: 'dd/MM/yyyy'}}</p>
    </div>
  </div>
</div>
  `
 
})
export class HeaderDataComponent implements OnInit {

  associateData : any;
  wef : any;
  associateCate:any;
  constructor(  private apiSer: ApiService) { }

  ngOnInit() {
    this.getContract();  
   
  }
  getContract(){
    this.apiSer.get('secure/v1/networkcontract/'+AppSetting.contractId)
    .subscribe(response => {
      this.associateCate='NETWORK';
      this.wef = AppSetting.wefDate;
      this.associateData = AppSetting.associateObject;
      this.associateData['nrmVehicleType']=response.data.responseData.nrmVehicleType;
    });
  }
}
