import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddDesignationComponent } from 'src/app/dialog/add-designation/add-designation.component';
import { AssignVehicleComponent } from 'src/app/dialog/assign-vehicle/assign-vehicle.component';
import { ContractUpdateComponent } from 'src/app/dialog/contract-update/contract-update.component';
import { EmiCalculationComponent } from 'src/app/dialog/emi-calculation/emi-calculation.component';
import { InsuranceDeductionComponent } from '../../dialog/insurance-deduction/insurance-deduction.component';
import { SearchBranchComponent } from 'src/app/dialog/search-branch/search-branch.component';
import { SearchCustomerComponent } from 'src/app/dialog/search-customer/search-customer.component';
import { ViewBranchesComponent } from 'src/app/dialog/view-branches/view-branches.component';

@Component({
  selector: 'app-booking-associate-contract',
  templateUrl: './booking-associate-contract.component.html',
  styleUrls: ['./booking-associate-contract.component.css']
})
export class BookingAssociateContractComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  addBvehicle;
  showBccustomer;
  soffhide;
  hrHideEx;
  assoBstaff;
  addBstaff;
  dsh_2_show;
  showBcreStaff;
  showDashboardBooking;
  showBAssociate;
  showBCreate;
  showBkyc;
  showBBac;
  showBvehicle;
  showBstaff;
  creAssoAddTable = <boolean>false;
  ascType;
  asooContColapse;
  asoCrtAdd;
  pLine;
  assoKyc;
  addBookMdm;
  bookingBAloct;
  payBoking;
  cusBpayment;
  addBRemark;
  csBpay;
  otherEAdd;
  netAdd;
  slaBemi;
  hidePerWay;
  HoffringBkg;
  VnumberT;
  showBacNext;
  hideBacNext;
  bacUpload;
  BookingSuccess;
  openBavAllo;
  isExpand = <boolean>true;
  showBranchAllocation = <boolean>false;
  vehiDocument;
  showDocumentB;
 

  openEmiModal() {
    let dialog = this.dialog.open(EmiCalculationComponent, {
      width: '40vw',
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });

  }

  openInsuranceDeductionModal() {
    this.dialog.open(InsuranceDeductionComponent, {
      width: '40vw',
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
  }

  openViewBranchesModal() {
    this.dialog.open(ViewBranchesComponent, {
      width: '40vw',
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
  }

  openSearchBranchModal() {
    this.dialog.open(SearchBranchComponent, {
      width: '40vw',
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
  }

  openAssignVehicleModal() {
    this.dialog.open(AssignVehicleComponent, {
      width: '40vw',
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
  }

  openContractUpdateModal() {
    let dialog = this.dialog.open(ContractUpdateComponent, {
      width: '50vw',
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
    dialog.afterClosed().subscribe(response => {
    //  debugger
      if (response) {
        this.showBranchAllocation = true;
        this.creAssoAddTable = false;
      }
    })
  }

  openSearchCustomerModal() {
    this.dialog.open(SearchCustomerComponent, {
      width: '40vw',
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
  }

  openAddDesignationModal() {
    this.dialog.open(AddDesignationComponent, {
      width: '30vw',
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
  }

}
