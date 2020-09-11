import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CommandantService } from 'src/app/services/commandant.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-commandment-offerings',
  templateUrl: './commandment-offerings.component.html',
  styleUrls: ['./commandment-offerings.component.css']
})
export class CommandmentOfferingsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private $commandment: CommandantService
  ) { }
  @ViewChild("f", null) commandmentRRForm: any;
  ngOnInit() {

    this.offeringGetList = { ...this.data };
  }
  serviceOfferingNameSearchCtrl = <string>'';
  contractNameSearchCtrl = <string>'';
  calculationUnitNameSearchCtrl = <string>'';
  calculationMeasureNameSearchCtrl = <string>'';
  serviceOfferingeNameSearchCtrl = <string>'';
  businessNameSearchCtrl = <string>'';
  commandmentOfferingObj = {} as any;
  // inputRoewList: Array<any> = [];
  commandmentRrObj = {} as any;
  offeringGetList = {} as any
  commandmentRrSlabList: Array<any> = [];
  commandmentRrRequestDT={} as any;
  showSlabInput: boolean = true;

  AddInputRow() {

    this.commandmentRrSlabList.push({});

  }
  deleteRowInput(i) {
    this.commandmentRrSlabList.splice(i, 1);
  }


  showSlab(obj) {

    if (obj == 24) {

      this.showSlabInput = false;
    }
    else {
      this.showSlabInput = true;
    }
  }

  saveCommandmentRR() {

    // this.commandmentRrObj={ "status": 1};
    this.commandmentRrObj.commandmentRrSlabList = this.commandmentRrSlabList;
    this.commandmentOfferingObj.commandmentRrRequestDTO = { ...this.commandmentRrObj ,"status": 1};
    this.commandmentOfferingObj.commandmentId= this.offeringGetList.obj.id;
    this.commandmentOfferingObj.id= this.offeringGetList.commandmentId;
    // this.commandmentOfferingObj.commandmentRrRequestDTO.commandmentRrObj = this.commandmentRrSlabList;
    this.$commandment.saveCommandantRR(this.commandmentOfferingObj).subscribe(response => {
      if (!this.commandmentOfferingObj.id) {
        this.commandmentOfferingObj.id = response;
        this.commandmentOfferingObj.push(this.commandmentOfferingObj);
        // this.appComp.showMessage(`PRODUCT Master IS ADDED`);
      }
    })
  }
}

