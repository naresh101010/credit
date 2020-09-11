import { GstConfirmationComponent } from './../gst-confirmation/gst-confirmation.component';
import { GstService } from './../../services/gst.service';
import { DeleteModalComponent } from './../delete-modal/delete-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-edit-gst',
	templateUrl: './edit-gst.component.html',
})
export class EditGstComponent implements OnInit {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data,
		public dialog2: MatDialog,
		private $gst: GstService,
		private spinner: NgxSpinnerService,
		private datePipe: DatePipe,
		public dialogRef: MatDialogRef<EditGstComponent>
	) { }
	@ViewChild("f", null) gstForm: any;
	ngOnInit() {

		let gstObj = { ... this.data };
		this.gstObj.gstName = gstObj.gstName;
		// if (this.gstObj.status == null) {
		//     this.gstObj.status = 1;
		// }
		// if (this.gstObj.effectiveDt) {
		//     this.gstObj.effectiveDt = moment(this.gstObj.effectiveDt).format("YYYY-MM-DD");
		//     this.today = this.gstObj.effectiveDt;
		// }
	}

	gstObj = {} as any;
	today = new Date();
	currentDate = moment(new Date()).format("YYYY-MM-DD");

	updateGst() {
		
		if (this.gstObj.id) {
			return this.submitData();
		}
		let dialog2 = this.dialog2.open(GstConfirmationComponent, {
			width: '35vw',
			panelClass: 'mdmDialog',
		})
		dialog2.afterClosed().subscribe(response => {
			
			if (response != 'cancel' && response != undefined) {
				this.submitData();
			} else if (response == 'cancel') {
				// this.fuelPriceObj = {
				// 	status: 1
				// } as any;
			}
		});
	}

	addGst() {
		
	}
	submitData() {

		this.spinner.show();
		if (this.gstObj.effectiveDt) {
			this.gstObj.effectiveDt = moment(this.gstObj.effectiveDt).format("YYYY-MM-DD");
		}

		if (this.gstObj.expDt) {
			this.gstObj.expDt = moment(this.gstObj.expDt).format("YYYY-MM-DD");
		}
		this.gstObj.status = 1;
		this.$gst.saveGst(this.gstObj).subscribe(response => {
			this.gstForm.submitted = false;
			this.gstObj.id = response.data.responseData;
			let gstObj = { ...this.gstObj };
			this.dialogRef.close(gstObj);
			this.spinner.hide()
			this.gstForm.reset();

		})
	}

	expiryMinDate: any;
	isVar = <boolean>true;
	isChange = <boolean>true;

	checkForExpiryDate(effectiveDt) {
		
		let todayDate = moment(new Date()).format('YYYY-MM-DD');
		effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
		if (this.gstObj.expDt) {
			this.gstObj.expDt = moment(this.gstObj.expDt).format("YYYY-MM-DD");
		}
		if (this.gstObj.effectiveDt) {
			this.gstObj.effectiveDt = moment(this.gstObj.effectiveDt).format("YYYY-MM-DD");
		}
		if (this.gstObj.expDt <= effectiveDt && (!this.gstObj.id || this.gstObj.expDt <= effectiveDt)) {
			this.isVar = true;
		}
		else {
			this.isVar = false;
		}

		if (effectiveDt < todayDate) {
			return this.expiryMinDate = todayDate;
		}
		return this.expiryMinDate = moment(effectiveDt, 'YYYY-MM-DD').add(1, "d").format('YYYY-MM-DD');

	}

	removeMinDate(effectiveDt) {

		this.expiryMinDate = moment(effectiveDt).format('YYYY-MM-DD');
	}

	changeDateFormat(effectiveDt, expDt) {
		
		console.log(effectiveDt)
		this.isVar = true;

		if (effectiveDt) {
			this.gstObj.effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
		}
		if (expDt) {
			this.gstObj.expDt = moment(expDt).format('YYYY-MM-DD');
		}

		this.checkForExpiryDate(effectiveDt)
	}
}
