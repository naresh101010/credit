import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ProdMasterService } from 'src/app/services/product-master.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';

@Component({
	selector: 'app-add-product-master',
	templateUrl: './add-product-master.component.html',
})
export class AddProductMasterComponent implements OnInit {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data,
		private $prodCategory: ProdMasterService,
		public dialog: MatDialog,
		private spinner: NgxSpinnerService,
		private datePipe: DatePipe,
		public dialogRef: MatDialogRef<AddProductMasterComponent>,
        private $common: CommonService,
	) { }
	@ViewChild("F", null) ProductForm: any;
	ngOnInit() {

		let obj = { ...this.data };
		this.editStatus = this.data.status;
		this.inActiveStatus();

		if (obj.permissionType == 2) {
			this.submitPermission = false;
			this.isType = "Edit";
		}
		else if (obj.permissionType == 1) {
			this.submitPermission = true;
			this.isType = "View";
		}
		else {
			this.submitPermission = false;
			this.isType = "Add";
		}


		if (obj.id == undefined) {
			this.productObj.prdctCtgyId = obj.obj.prodCat;
			this.selectType = obj.type;
		}
		else {
			this.productObj.prdctCtgyId = obj.prdctCtgyId;
			this.productObj = obj;
		}
		if (this.productObj.status == null) {
			this.productObj.status = 1
		}
		// if (this.productObj.effectiveDt) {
		//   this.today = this.productObj.effectiveDt;
		// }
		if (this.data.prdctCtgyId) {
			this.getProdCategory(this.data.prdctCtgyId);
		}
		else if (this.data.obj.prodCat) {
			this.getProdCategory(this.data.obj.prodCat);
		}
		else {
			this.getProdCategory();
		}
        if (this.productObj.expDt < this.currentDate) {
            this.isVar = false;
        }
	}
  productCatObjNameSearchCtrl = <string>'';
	submitPermission: boolean = true;
	selectType;
	productObj = {} as any;
	prodCategoryList: Array<any> = [];
	lineOfBusinessList: Array<any> = [];
    isInactive = <boolean>false;
	today = new Date();
	currentDate = moment(new Date()).format("YYYY-MM-DD");
	isType: string;

	getcategoryDate(catId) {
		this.prodCategoryList.map(elem => {
			if (elem.id == catId) {
				this.productObj.effectiveDt = elem.effectiveDt;
				if (elem.expDt) {
					this.productObj.expDt = elem.expDt;
				}

			}
		})
	}
	getProdCategory(prodCatId = null) {

		this.$prodCategory.getAllProdCategory().subscribe(response => {
			this.prodCategoryList = response.responseData;
			this.lineOfBusinessList = response.referenceData.lobList;
			if (prodCatId) {
				this.prodCategoryList.map(elem => {
					if (elem.id == prodCatId) {
						this.productObj.effectiveDt = elem.effectiveDt;
						if (elem.expDt) {
							this.productObj.expDt = elem.expDt;
						}

					}
				})
			}
			else if (this.data.obj.prodCat) {
				this.prodCategoryList.map(elem => {
					if (elem.id == this.data.obj.prodCat) {
						this.productObj.effectiveDt = elem.effectiveDt;
						if (elem.expDt) {
							this.productObj.expDt = elem.expDt;
						}

					}
				})
			}
			if (this.productObj.status == 0 && this.productObj.expDt < this.currentDate) {
                    this.isInactive = true;
                    this.expiryMinDate = this.currentDate;
                }else {
                    this.isInactive = false;
                }
		});
	}

	UpdateSubSegment() {

		this.isVar = false;
		if (this.productObj.expDt) {
			if (this.productObj.expDt < this.currentDate && this.productObj.expDt < this.productObj.effectiveDt) {
				this.isVar = true;
			}
			else {
				this.isVar = false;
				this.productObj.expDt = moment(this.productObj.expDt).format("YYYY-MM-DD");
			}
		}

		if (this.productObj.status === 0) {

			let dialog = this.dialog.open(DeleteModalComponent, {
				width: '35vw',
				panelClass: 'mdmDialog',
				data: { title: this.productObj.gstType, heading: "Product Master" }
			});
			dialog.afterClosed().subscribe(response => {
				if (response == true) {
					this.addProductMaster();
				}
			})
		}
		else {
			this.addProductMaster();
		}
		// this.spinner.hide();
	}


	addProductMaster() {
		this.spinner.show();
		if (this.productObj.effectiveDt) {
			this.productObj.effectiveDt = moment(this.productObj.effectiveDt).format("YYYY-MM-DD");
		}
		if (this.productObj.expDt) {
			this.productObj.expDt = moment(this.productObj.expDt).format("YYYY-MM-DD");
		}
		else {
			this.productObj.expDt = '';
		}
		this.$prodCategory.saveProdMaster(this.productObj).subscribe(response => {
			this.productObj.id = response.data.responseData;
			let productObj = { ...this.productObj };
			this.dialogRef.close(productObj);
			this.spinner.hide();
			this.ProductForm.reset();

		});
	}

	editStatus = {} as any;
	inActiveFlag = <boolean>false;
	inActiveStatus() {

		if (this.editStatus == 0) {
			this.inActiveFlag = true;
		}
	}

	expiryMinDate: any;
	isVar = <boolean>true;
	isChange = <boolean>true;

	checkForExpiryDate(effectiveDt) {

		let todayDate = moment(new Date()).format('YYYY-MM-DD');
		effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
		if (this.productObj.expDt) {
			this.productObj.expDt = moment(this.productObj.expDt).format("YYYY-MM-DD");
		}
		if (this.productObj.effectiveDt) {
			this.productObj.effectiveDt = moment(this.productObj.effectiveDt).format("YYYY-MM-DD");
		}
		if (this.productObj.expDt <= effectiveDt && (!this.productObj.id || this.productObj.expDt <= effectiveDt)) {
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


    removeMinDate(effectiveDate) {
        this.$common.setExpiryDate(effectiveDate, this.isInactive)
    }

	changeDateFormat(effectiveDt, expDt) {

		console.log(effectiveDt)
		this.isVar = true;

		if (effectiveDt) {
			this.productObj.effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
		}
		if (expDt) {
			this.productObj.expDt = moment(expDt).format('YYYY-MM-DD');
		}

		this.checkForExpiryDate(effectiveDt)
	}

}
