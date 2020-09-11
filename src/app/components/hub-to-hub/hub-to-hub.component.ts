import { TouchPointConfirmationComponent } from './../../modals/touch-point-confirmation/touch-point-confirmation.component';
import { MatDialog } from '@angular/material';
import { BranchAdvanceSearchComponent } from './../../modals/branch-advance-search/branch-advance-search.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hub-to-hub',
  templateUrl: './hub-to-hub.component.html',
  styleUrls: ['./hub-to-hub.component.css']
})
export class HubToHubComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
showRoute;
isExpand;
routeSubmit;
searchPoint;
assigSchedule;
touchPointList:Array<any>=[];

routeAdvencedSearch(type=null) {
		
		let dialogModal = this.dialog.open(BranchAdvanceSearchComponent, {
			width: '40vw',
			panelClass: 'mdmDialog'
		})

	// 	dialogModal.afterClosed().subscribe(response => {
						
	// 		if (!response) {
	// 			return;
	// 		}
	// 		if(type=='branchPinList' || type=='branchList'){
	// 			this.page = 1;
	// 			this.branchList = this.branchList.filter(elem=>elem.branchId==response.branchId)
	// 			this.searchObj.searchValue = response.branchName
	// 		}
	// 	})
	 }
     addTouchPoint(){
         
this.touchPointList.push({status:1});
     }
     deleteTOuchPoint(obj,i){
this.touchPointList.splice(i,1);
     }

     showConfirmationMsg(){
         	let dialogModal = this.dialog.open(TouchPointConfirmationComponent, {
			width: '30vw',
			panelClass: 'mdmDialog'
		})
     }
}
