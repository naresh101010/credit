import { Component, OnInit, Inject } from '@angular/core';
import { CommandantService } from 'src/app/services/commandant.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-commandment-orrering',
  templateUrl: './commandment-orrering.component.html',
})
export class CommandmentOrreringComponent implements OnInit {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private $commandment: CommandantService
  ) { }

  ngOnInit() {
    
    this.offeringGetList = {...this.data};
  }
  commandmentObj = {} as any;
  offeringGetList: Array<any> = [];

  // getAllLoad() {
  //   
  //   this.$commandment.getCommandantLoad().subscribe(response => {
  //     this.businessTypeList = response.businessTypeList;
  //     this.calculationTypeList = response.calculationTypeList;
  //     this.calculationUnitList = response.calculationUnitList;
  //     this.calculationMeasureList = response.calculationMeasureList;
  //     this.serviceOffeingList = response.serviceOffeingList;
  //     this.commandmentCategoryList = response.commandmentCategoryList;
  //     this.commandmentChargesOnList = response.commandmentChargesOnList;
  //     this.commandmentGeoTypeList = response.commandmentGeoTypeList;
  //     this.commandmentTypeList = response.commandmentTypeList;
  //     this.customerTypeList = response.customerTypeList;
  //   })
  // }
}