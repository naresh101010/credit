import { BranchService } from './../../services/branch.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-manage-branch-master',
	templateUrl: './manage-branch-master.component.html',
})
export class ManageBranchMasterComponent implements OnInit {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data,
		public dialogRef: MatDialogRef<ManageBranchMasterComponent>,
		private $branchService: BranchService,
		private spinner: NgxSpinnerService
	) { }


	ngOnInit() {
		this.newList = this.data;
	}

	feature = {
		status: 1
	} as any;

	newList: Array<any> = [];

	removeFromList() {
		let index = this.newList.findIndex(elem => elem.isSelected == true);
		this.feature = { ...this.newList.find(elem => elem.isSelected == true) };
		// this.newList.splice(index,1);
	}

	addIntoList() {
		this.newList.push(this.feature);
		this.feature = {
			status: 1
		} as any;
	}

	selectFeature(index) {
		this.newList.map(elem => elem.isSelected = false);
		this.newList[index].isSelected = true;
	}

	submitFeature() {
		this.spinner.show();
		let data = this.newList.filter(elem => !elem.id)
		this.$branchService.saveFeatures(data).subscribe(response => {
			this.dialogRef.close(this.newList);
			this.spinner.hide();
		})
	}


}
