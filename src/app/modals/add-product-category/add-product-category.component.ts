import { Component, OnInit, ViewChild } from '@angular/core';
// import { AppComponent } from "./../../app.component";
import { ProdCategory } from "./../../Models/product-category";
import { ProdCategoryService } from "./../../services/product-category.service";
import moment from 'moment';
import { AddHsnComponent } from '../add-hsn/add-hsn.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProdMasterService } from 'src/app/services/product-master.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
})
export class AddProductCategoryComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private $prodCategory: ProdMasterService,
    private $hsnCode: ProdMasterService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddProductCategoryComponent>
    // private appComp: AppComponent

  ) { }
  @ViewChild("F", null) productCategoryForm: any;
  ngOnInit() {
    this.getHsnCode();
    this.getProdCategory();
  }
  prodCategoryObj = {
    status: 1
  } as any;
  prodCategoryList: Array<any> = [];
  hsnCodeList: Array<any> = [];
  lineOfBusinessList: Array<any> = []
  minDate = new Date(new Date().setDate(new Date().getDate()));
  listBusiness(type, event) {
    if (!this.prodCategoryObj.prdctCtgyLobMaps) {
      this.prodCategoryObj.prdctCtgyLobMaps = [];
    }

    if (event.checked) {
      let data = {
        "lookupId": type.id
      }
      this.prodCategoryObj.prdctCtgyLobMaps.push(data);
    } else {
      this.prodCategoryObj.prdctCtgyLobMaps = this.prodCategoryObj.prdctCtgyLobMaps.filter(elem => elem.lkpLobId != type.id);
    }
  }
  getProdCategory() {

    this.$prodCategory.getAllProdCategory().subscribe(response => {
      this.prodCategoryList = response.responseData;
      this.lineOfBusinessList = response.referenceData.lobList;
    });
  }

  saveProdCategory() {
    this.spinner.show();
    this.isVar = false;
    if (this.prodCategoryObj.expDt) {
        if (this.prodCategoryObj.expDt < this.currentDate && this.prodCategoryObj.expDt < this.prodCategoryObj.effectiveDt) {
            this.isVar = true;
        }
        else {
            this.isVar = false;
            this.prodCategoryObj.expDt = moment(this.prodCategoryObj.expDt).format("YYYY-MM-DD");
        }
    }
    this.prodCategoryObj.effectiveDt = moment(this.prodCategoryObj.effectiveDt).format("YYYY-MM-DD");
    this.prodCategoryObj.expDt = moment(this.prodCategoryObj.expDt).format("YYYY-MM-DD");
    this.$prodCategory.saveProdCategory(this.prodCategoryObj).subscribe(response => {
      this.prodCategoryObj.id = response.data.responseData;
      let prodCategoryObj = { ...this.prodCategoryObj };
      this.dialogRef.close(prodCategoryObj);
      this.spinner.hide();
      this.productCategoryForm.reset();
    });
  }

  hsnDropdownOpen() {
    this.dialog.open(AddHsnComponent, {
      width: '70vw',
      panelClass: 'mdmDialog'
    })
  }
  getHsnCode() {

    this.$hsnCode.getAllHsnCode().subscribe(response => {
      this.hsnCodeList = response;
    });
  }
   
  
  expiryMinDate: any;
  isVar = <boolean>true;
  isChange = <boolean>true;
  currentDate = moment(new Date()).format("YYYY-MM-DD");

  checkForExpiryDate(effectiveDt) {
      
      let todayDate = moment(new Date()).format('YYYY-MM-DD');
      effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
      if(this.prodCategoryObj.expDt){
          this.prodCategoryObj.expDt = moment(this.prodCategoryObj.expDt).format("YYYY-MM-DD");
      }
      if(this.prodCategoryObj.effectiveDt){
          this.prodCategoryObj.effectiveDt = moment( this.prodCategoryObj.effectiveDt).format("YYYY-MM-DD");
      }
      if (this.prodCategoryObj.expDt <= effectiveDt && (!this.prodCategoryObj.id || this.prodCategoryObj.expDt <= effectiveDt)) {
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
          this.prodCategoryObj.effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
      }
      if (expDt) {
          this.prodCategoryObj.expDt = moment(expDt).format('YYYY-MM-DD');
      }

      this.checkForExpiryDate(effectiveDt)
  }

}