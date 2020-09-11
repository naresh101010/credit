import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddHsnComponent } from 'src/app/modals/add-hsn/add-hsn.component';
import { EditProductMasterComponent } from 'src/app/modals/edit-product-master/edit-product-master.component';
import { AddProductCategoryComponent } from 'src/app/modals/add-product-category/add-product-category.component';
import { AddProductMasterComponent } from 'src/app/modals/add-product-master/add-product-master.component';
import { ProdMasterService } from "./../../services/product-master.service";
import { ProdCategory } from 'src/app/Models/product-category';
import { AppComponent } from 'src/app/app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthorizationService } from 'src/app/services/authorisation.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent implements OnInit {
  @ViewChild("f", null) productCategoryForm: any;
  constructor(
    public dialog: MatDialog,
    private $prodMaster: ProdMasterService,
    private $prodCategory: ProdMasterService,
    private $hsnCode: ProdMasterService,
    private appComp: AppComponent,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    private AuthorizationService: AuthorizationService,
    private permissionsService: NgxPermissionsService,
    private $common: CommonService,

  ) { }

  ngOnInit() {

    this.getHsnCode();
    this.getProdCategory();
    this.getProdMaster();
    this.permissionsService.loadPermissions(this.AuthorizationService.getPermissions('LOOKUP', 'PRODUCH MASTER'));
  }
  productMaster;
  productCategory;
  showProductcategory;
  searchProductCategoryName;
  hsnobj;
  enterProduct=<boolean>false;
  hsncodeNameSearchCtrl = <string>'';
  productCategorySearchCtrl=<string>'';
  productId;
  searchProductName;
  productAllObj = {
    status: 1
  } as any;
  num = 0;
  isSelected = <boolean>false;
  showProductCategoryList=<boolean>false;
  isdisabled=<boolean>false;
  isorgNameChacked = <boolean>true;
  searchCaegoryIndex = {} as any;
  prodMasterList: Array<any> = [];
  prodCategoryList: Array<any> = [];
  hsnCodeList: Array<any> = [];
  productCatList: Array<any> = [];
  lineOfBusinessList: Array<any> = [];
  prodLoadList: Array<any> = [];
  lineOfBusiness;
  hsnId;
  lobIsRequired = true;
  p: number = 1;
  minDate = new Date(new Date().setDate(new Date().getDate()));
  editProductMaster(obj) {

    this.productAllObj = { ...obj };
  }

  listBusiness(type, event) {

    if (!this.productAllObj.prdctCtgyLobMaps) {
      this.productAllObj.prdctCtgyLobMaps = [];
    }

    // if (event.checked) {
    //   let data = {
    //     "lookupId": type.id
    //   }
    //   this.productAllObj.prdctCtgyLobMaps.push(data);
    // } else {
    //   this.productAllObj.prdctCtgyLobMaps = this.productAllObj.prdctCtgyLobMaps.filter(elem => elem.lkpLobId != type.id);
    // }

     if (event.checked) {
            let index = this.productAllObj.prdctCtgyLobMaps.findIndex(elem => elem.lookupId == type.id);
            if (index == -1) {
                // type.status = 1;
                var dsd = {
                    "lookupId": type.id,
                    "status": 1,
                }

                this.productAllObj.prdctCtgyLobMaps.push(dsd);
            } else {
                this.productAllObj.prdctCtgyLobMaps[index].status = 1;
            }
            this.isSelected = true;
            this.isorgNameChacked = true;

        } else {
            let index = this.productAllObj.prdctCtgyLobMaps.findIndex(elem => elem.lookupId == type.id);
            if (this.productAllObj.prdctCtgyLobMaps[index].id) {
                this.productAllObj.prdctCtgyLobMaps[index].status = 0;
            } else {
                this.productAllObj.prdctCtgyLobMaps.splice(index, 1);
            }
            this.num = 0;
            this.productAllObj.prdctCtgyLobMaps.map(elem => {
                if (elem.status == 0) {
                    this.num = this.num + 1;
                }
            })
            if (this.productAllObj.prdctCtgyLobMaps == this.num) {
                this.isSelected = false;
            }

        }

         if (this.productAllObj.prdctCtgyLobMaps == 0) {
            this.lobIsRequired = true;
        } else {
            let activeStatuList = this.productAllObj.prdctCtgyLobMaps.filter(elem => elem.status);
            if (activeStatuList.length == 0) {
                this.lobIsRequired = true;
            }else{
                this.lobIsRequired = false;
            }
        }

  }
  getProductMasterOnLoad(){
    this.getProdCategory();
}
clearObj(){
    this.productAllObj={
        status:1
    }
    this.isdisabled=false;
     this.strLengthValid=false;
    this.searchProductCategoryName='';
        this.getProdCategory();
}


isChecked(line) {
        if (!this.productAllObj || !this.productAllObj.prdctCtgyLobMaps) return;

        let index = this.productAllObj.prdctCtgyLobMaps.findIndex(elem => elem.lookupId == line.id && elem.status == 1);

        if (index != -1) {
            return true;
        }
        return false;

    }
  saveProduct() {

        if (this.productAllObj.prdctCtgyLobMaps.length == 0) {
            this.lobIsRequired = true;
            return;
        } else {
            let activeStatuList =this.productAllObj.prdctCtgyLobMaps.filter(elem => elem.status);
            if (activeStatuList.length == 0) {
                this.lobIsRequired = true;
                return;
            }
        }
    this.spinner.show();
    this.isVar = false;
    this.prodCategoryList.forEach(elem=>{
        if(elem.id==this.productId){
        this.productAllObj.prdctCtgy=elem.prdctCtgy;
        }
    })
    if (this.productAllObj.expDt) {
        if (this.productAllObj.expDt < this.currentDate && this.productAllObj.expDt < this.productAllObj.effectiveDt) {
            this.isVar = true;
        }
        else {
            this.isVar = false;
            this.productAllObj.expDt = moment(this.productAllObj.expDt).format("YYYY-MM-DD");
        }
    }

    this.$prodMaster.saveProdCategory(this.productAllObj).subscribe(response => {

      if (!this.productAllObj.id) {
        this.prodCategoryList.splice(0, 0 ,this.productAllObj);
        this.appComp.showMessage(`PRODUCT CATEGORY IS ADDED`);
      } else {
        this.appComp.showMessage(`${this.productAllObj.prdctCtgy} IS UPDATED`);
      }

      setTimeout(() => {
          this.p=1
        this.productCategory = false;
        this.showProductCategoryList=false
        this.getProdCategory();
        this.spinner.hide();
      }, 1000);
    })


  }

  addHsh() {
    let dialog = this.dialog.open(AddHsnComponent, {
      width: '50vw',
      panelClass: 'mdmDialog'
    })

    dialog.afterClosed().subscribe(response => {
      if (response === true) {
        return;
      }
      if (response) {
        {
          this.hsnCodeList.push(response);
          this.productAllObj.hsnCodeId=response.id;
          this.productAllObj.effectiveDt=response.effectiveDt;
          this.productAllObj.expDt=response.expDt;
          this.appComp.showMessage(`${response.hsncode} IS CREATED`);
        }
      }
    })

  }
  addProductCategory() {
    let dialog = this.dialog.open(AddProductCategoryComponent, {
      width: '50vw',
      panelClass: 'mdmDialog'
    })
    dialog.afterClosed().subscribe(response => {
      if (response === true) {
        return;
      }
      if (response) {
        {
          this.prodCategoryList.push(response);
          this.productId=response.id;
          this.appComp.showMessage(`${response.prdctCtgy} IS CREATED`);
        }
      }
    })
  }
  productMasterModelOpen(productId = null, type = null, permissionType) {

      if(this.searchCaegoryIndex.prodCat){
          this.enterProduct=false;
      }
      else{
           this.enterProduct=true;
           return;
      }
    let data = {
      status: 1,
      obj: productId,
      type: type,
      permissionType:permissionType
    }
    if (productId.id) {
      data = { ... this.productCatList.find(elem => elem.id == productId.id), permissionType:permissionType };
    }
    let dialog = this.dialog.open(AddProductMasterComponent, {
      width: '55vw',
      data: data,
      panelClass: 'mdmDialog'
    })
    dialog.afterClosed().subscribe(response => {

      if (response === true) {
        return;
      }
      if (response) {

        if (productId.prodCat) {
          this.productCatList.splice(0,0,response);
 this.p=1
          this.appComp.showMessage(`${response.prdctName} IS ADDED`);

        }
        else {
          let index = this.productCatList.findIndex(elem => elem.id == response.id);
          this.productCatList[index] = response;
          // this.hsnId = response.id;
           this.p=1
          if (response.status == 0) {
            this.appComp.showMessage(`${response.prdctName} IS DELETED`);
            return this.getProductListById(response.prdctCtgyId);
          }
          else {
            this.appComp.showMessage(`${response.prdctName} IS UPDATED`);
            return this.getProductListById(response.prdctCtgyId);
          }

        }
      }
    })
  }
  editProductMasterModelOpen() {
    this.dialog.open(EditProductMasterComponent, {
      width: '70vw',
      panelClass: 'mdmDialog'
    })
  }
getHsnDate(hsnId){
    this.hsnCodeList.forEach(elem=>{
        if(elem.id==hsnId){
            this.productAllObj.effectiveDt=elem.effectiveDt;
            this.productAllObj.expDt=elem.expDt;
        }
    })
}
  getProdMaster() {
    this.spinner.show();
    this.$prodMaster.getAllProdMaster().subscribe(response => {
      this.prodMasterList = response;
    //   this.searchCaegoryIndex.prodCat = this.prodMasterList[0].prdctCtgyId;
      this.spinner.hide();
    });
  }

  getProdCategory() {
this.spinner.show();
    this.$prodCategory.getAllProdCategory().subscribe(response => {
      this.prodCategoryList = response.responseData;
      this.lineOfBusinessList = response.referenceData.lobList;
       this.spinner.hide();
    });
  }
  getProductListById(productId) {
this.spinner.show();
    this.$prodCategory.getProductById(productId).subscribe(response => {
        this.p=1;
      this.productCatList = response.responseData;
      this.spinner.hide();
    })
  }
  getHsnCode() {
    this.$hsnCode.getAllHsnCode().subscribe(response => {
      this.hsnCodeList = response;
    });
  }

  strLengthValid:boolean = false;
  searchProduct(str) {
    let strlength = str.target.value.length;
    if (strlength > 2 && str.target.value) {
      this.strLengthValid = false;
      this.spinner.show();
       this.p = 1;
      if (!this.searchProductName || this.searchProductName.trim() == "") {
        return this.getProdMaster();
      }
      this.$prodMaster.searchByProductName(this.searchProductName).subscribe(Response => {
        this.prodMasterList = Response;
        if (!this.prodMasterList.length) {
          this.appComp.showMessage(`Record doesn't exist in Propel-I`, "danger");
        }
        this.spinner.hide();
      });
    } else {
      this.strLengthValid = true;
    }
  }
  searchProductCategory(strCategory) {

    let strlength = strCategory.target.value.length;
    if (strlength > 2 && strCategory.target.value) {
      this.strLengthValid = false;
       this.spinner.show();
       this.p = 1;
      if (!this.searchProductCategoryName || this.searchProductCategoryName.trim() == "") {
        return this.getProdCategory();
      }
      this.$prodMaster.searchByProductCategoryName(this.searchProductCategoryName).subscribe(Response => {
        this.prodCategoryList = Response;
        if (!this.prodCategoryList.length) {
          this.appComp.showMessage(`Record doesn't exist in Propel-I`, "danger");
        }
        this.spinner.hide();
      });
    } else {
      this.strLengthValid = true;
    }
  }
clearSearchCategory() {
    if (!this.searchProductCategoryName || this.searchProductCategoryName == "") {
        this.strLengthValid=false;
   return this.getProdCategory();
    }
  }
  clearSearch() {
    if (!this.searchProductName || this.searchProductName == "") {
      return this.getProdMaster();
    }
  }


  submitPermission:boolean = false;
  editProduct(productType, permissionType) {

      this.productCategory=true;
      this.showProductCategoryList=true;
    if (permissionType == 0) {
      this.submitPermission = false;
    }
    else {
        this.submitPermission = true;
    }
    if(productType.status==0){
        this.isdisabled=true;
    }
    else{
        this.isdisabled=false;
    }
    this.strLengthValid=false;
    this.searchProductCategoryName='';
    this.productAllObj={...productType};

  }

  expiryMinDate: any;
  isVar = <boolean>false;
  isChange = <boolean>true;
  currentDate = moment(new Date()).format("YYYY-MM-DD");

  checkForExpiryDate(effectiveDt) {

      let todayDate = moment(new Date()).format('YYYY-MM-DD');
      effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
      if(this.productAllObj.expDt){
          this.productAllObj.expDt = moment(this.productAllObj.expDt).format("YYYY-MM-DD");
      }
      if(this.productAllObj.effectiveDt){
          this.productAllObj.effectiveDt = moment( this.productAllObj.effectiveDt).format("YYYY-MM-DD");
      }
      if (this.productAllObj.expDt <= effectiveDt && (!this.productAllObj.id || this.productAllObj.expDt <= effectiveDt)) {
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

  isInactive = <boolean>false;
    removeMinDate(effectiveDate) {
        this.$common.setExpiryDate(effectiveDate, this.isInactive)
    }

  changeDateFormat(effectiveDt, expDt) {

      console.log(effectiveDt)
      this.isVar = true;

      if (effectiveDt) {
          this.productAllObj.effectiveDt = moment(effectiveDt).format('YYYY-MM-DD');
      }
      if (expDt) {
          this.productAllObj.expDt = moment(expDt).format('YYYY-MM-DD');
      }

      this.checkForExpiryDate(effectiveDt)
  }

}
