import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditGstComponent } from 'src/app/modals/edit-gst/edit-gst.component';
import { GstService } from 'src/app/services/gst.service';
import { AppComponent } from 'src/app/app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthorizationService } from 'src/app/services/authorisation.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-gst',
	templateUrl: './gst.component.html',
})
export class GstComponent implements OnInit {

	constructor(
		public dialog1: MatDialog,
		private $gst: GstService,
		private appComp: AppComponent,
		private datePipe: DatePipe,
		private spinner: NgxSpinnerService, private AuthorizationService: AuthorizationService,
		private permissionsService: NgxPermissionsService
	) { }
	@ViewChild("f", null) gstForm: any;

	ngOnInit() {

		this.getAll();
		this.permissionsService.loadPermissions(this.AuthorizationService.getPermissions('LOOKUP', 'GST'));
	}


	gstType;
	addGst;
	enterGst = <boolean>false;
	isdisabled = <boolean>false;
	gstObj = {
		status: 1
	} as any;
	submitPermission = <boolean>false;
	gstList: Array<any> = [];
	gstNameList: Array<any> = [];
	p: number = 1;
	today = new Date();
	strLengthValid: boolean = false;

	editModalOpen(obj = null) {
		if (!this.gstObj.gstName) {
			this.enterGst = true;
			return;
		}
		else {
			this.enterGst = false;
		}
		let data = {
			status: 1,
			gstName: this.gstObj.gstName
		}
		// if (obj.id) {
		//     data = { ...this.gstList.find(elem => elem.id == obj.id) }
		// }

		let dialog1 = this.dialog1.open(EditGstComponent, {
			width: '50vw',
			panelClass: 'mdmDialog',
			data: data
		})
		dialog1.afterClosed().subscribe(response => {
			
			if (response === true) {
				return;
			}
			if (response) {

				this.gstList.splice(0, 0, response);
				this.appComp.showMessage(`${response.gstName} IS ADDED`);
				setTimeout(() => {
					this.p = 1;
					this.getAll();
					this.addGst = false;
				}, 1000);
			}

		})
	}

	getAll() {
		this.spinner.show();
		this.$gst.getAllGst().subscribe(response => {
			this.gstList = response.data.responseData;
			this.spinner.hide();
		})
	}

	saveGst() {
		this.spinner.show();
		this.$gst.saveGst(this.gstObj).subscribe(response => {


			if (!this.gstObj.id) {
				this.gstObj.id = response.data.responseData;
				this.gstList.push(this.gstObj);
				this.appComp.showMessage(`${this.gstObj.gstName} IS ADDED`);
			} else {
				this.appComp.showMessage(`${this.gstObj.gstName} IS UPDATED`);
			}

			setTimeout(() => {
				this.addGst = false;
				this.spinner.hide();
			}, 1000);
		})


	}

	View(obj, type = null) {
        
		if (type == 1) {
			this.submitPermission = true;
		}
		this.strLengthValid = false;
		this.gstObj = { ...obj };
		this.addGst = true;
		this.gstNameList = [{ ...obj }];
	}

	clearObj() {
		this.gstObj = {
			status: 1
		}
          this.isdisabled=false;
		this.submitPermission = false;
		this.gstList = [];
		this.gstNameList = [];
	}
editGst(gstName){
    this.spinner.show();
    
    this.$gst.getGstByName(gstName).subscribe(res=>{
          this.spinner.hide();
        if(res){
            this.submitPermission = false;
            this.isdisabled=true;
            this.gstNameList=res;
            this.gstObj.gstName=this.gstNameList[0].gstName;
            this.gstObj.gstVal=this.gstNameList[0].gstVal;
            this.addGst = true;
        }
    })
}
	
	searchGstType(str = null) {
		
		let strlength = str.target.value.length;
		if (strlength > 2 && str.target.value) {
			this.strLengthValid = false;
			this.p = 1;
			this.spinner.show();
			if (!this.gstType || this.gstType.trim() == "") {
				return this.getAll();
			}
			this.$gst.searchByName(this.gstType).subscribe(Response => {
				this.gstList = Response;
				if (!this.gstList.length) {
					this.appComp.showMessage(`Record doesn't exist in Propel-I`, "danger");
				}
				this.spinner.hide();
			});
		} else {
			this.strLengthValid = true;
		}
	}
	searchGstName() {
		
         this.enterGst=false;
		if (!this.gstObj.gstName || this.gstObj.gstName.trim() == "") {
			this.gstNameList = [];
            this.enterGst=true;
		}
		this.gstList.map(elem => {
			if (elem.gstName == this.gstObj.gstName) {
				this.spinner.show();
				this.$gst.searchByName(this.gstObj.gstName).subscribe(Response => {
					this.spinner.hide();
					this.gstNameList = Response;
				});
			}
		})

	}
	clearSearch() {
		if (!this.gstType || this.gstType == "") {
			this.strLengthValid = false;
			return this.getAll();
		}
	}


	effDate() {
		let effYear = parseInt(this.datePipe.transform(this.gstObj.effectiveDt, 'yyyy'))
		if (effYear > 9999) {
			this.gstObj.effectiveDt = "";
		}
	}

	expDate() {
		let expYear = parseInt(this.datePipe.transform(this.gstObj.expDt, 'yyyy'))
		if (expYear > 9999) {
			this.gstObj.expDt = "";
		}
	}

}
