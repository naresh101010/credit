import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ErrorConstants } from 'src/app/core/models/constants';
import { confimationdialog } from '../confirmationdialog/confimationdialog';
import { AuthorizationService } from '../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { element } from 'protractor';

export class CommdtGeoExclusionDTO {
  descr: string;
  effectiveDt: Date;
  expDt: Date;
  id: number;
  safextFlag:any ;
  dlvryBranchPinMapId: number;
  recIdentifier: number;
  version: number;
  isChecked: boolean;
  pincode: string;
  city: string;
  status: number;
  moveFrom :any;
}

export class Lookup {
  id: number;
  lookupVal: string;
  descr:string;

}

@Component({
  selector: 'app-pincode-customize',
  templateUrl: './pincode-customize.component.html',
  styleUrls: ['./pincode-customize.component.css']
})
export class PincodeCustomizeComponent implements OnInit {

    constructor(private spinner: NgxSpinnerService, private tosterService: ToastrService, private dialog: MatDialog, private contractservice: ApiService,
      public dialogRef: MatDialogRef<PincodeCustomizeComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
      private authorizationService : AuthorizationService,
      private permissionsService: NgxPermissionsService) { }
  
    excludedPincodeList: CommdtGeoExclusionDTO[] = [];
    allPincodeList: CommdtGeoExclusionDTO[] = [];
    cmdmntId: number = 0;
    stateList: Lookup[];
    cityList: Lookup[] = [];
    stateId: number = null;
    cityId: number = null;
    searchState = '';
    searchCity = '';
    perList: any = [];
  
    ngOnInit() {

      this.authorizationService.setPermissions('BRANCH');
      this.perList = this.authorizationService.getPermissions('BRANCH') == null ? [] : this.authorizationService.getPermissions('BRANCH');
      this.authorizationService.setPermissions('PINCODE');
      this.perList = this.perList.concat(this.authorizationService.getPermissions('PINCODE'));
      this.permissionsService.loadPermissions(this.perList);
      console.log('perlist',this.perList);

      this.getAllPincodeAdd();
    }

    getAllPincodeAdd(){
      this.allPincodeList = [];
      this.spinner.show();
      if(this.data && this.data.excludedPincodeList && this.data.excludedPincodeList.length > 0){
        this.data.excludedPincodeList.forEach(elementMain => {
          this.contractservice.getPinCodeFromPincodeId(elementMain.dlvryBranchPinMapId).subscribe((resultData) => {
              elementMain.dlvryBranchPinMapId = resultData.data.responseData.id;
              elementMain.pincode = resultData.data.responseData.pincode;
              elementMain.isChecked = true;
              elementMain.moveFrom = JSON.parse(JSON.stringify(elementMain.safextFlag));
              elementMain.city =   resultData.data.responseData.city.cityName; // cityName ; //
              this.allPincodeList.push(elementMain);
          }, (err) => {
            this.spinner.hide();
  
          })
        });
      }
      this.getStateList();
      
    }
  
    getStateList() {
      this.contractservice.getStatesByPinFeatureId().subscribe(result => {
        let ob = ErrorConstants.validateException(result);
        if (ob.isSuccess) {
          let stateData = [];
          result.data.responseData.forEach(element => {
            stateData.push({ id: element.id, lookupVal: element.stateName,descr: element.stateName });
          });
          this.stateList = JSON.parse(JSON.stringify(stateData));
          this.cityList = [];
          this.cityId = null;
          this.spinner.hide();
    
        }else {
          this.tosterService.error(ob.message);
          this.spinner.hide();
        }
      });
    }
  
    getCityList() {
      this.cityId = null;
      this.spinner.show();
      this.contractservice.getCityByStateNPinFeatureId(this.stateId).subscribe(result => {
       let ob = ErrorConstants.validateException(result);
        if (ob.isSuccess) {
          let cityData = [];
          if(result.data.responseData && result.data.responseData.length == 0){
            this.tosterService.info('City is not available');
          }
          result.data.responseData.forEach(element => {
            cityData.push({ id: element.id, lookupVal: element.cityName,descr: element.cityName });
          });
          this.cityList = JSON.parse(JSON.stringify(cityData));
        }else {
          this.cityList = [];
          this.tosterService.error(ob.message);
        }
        this.spinner.hide();
      },
      error=>{
        this.cityList = [];
        this.spinner.hide();
        this.tosterService.error(ErrorConstants.getValue(404));
      });
    }
  
    closeDialog(): void {
      
      const dialogRefConfirm = this.dialog.open(confimationdialog, {
        width: '300px',
        panelClass: 'creditDialog',
        data:{message:'Are you sure ?'},
        disableClose: true,
        backdropClass: 'backdropBackground'
      });
  
      dialogRefConfirm.afterClosed().subscribe(value => {
        if(value){
          this.dialogRef.close(false);
        }else{
          console.log('Keep Open');
        }
      });
  
    }

    changeModel(e){
      console.log('rr', e);
    }
  
    getPincode(flag) {
      this.spinner.show();
      this.allPincodeList = this.allPincodeList.filter(obj=>obj.isChecked);
      let cityName:any;
      this.cityList.forEach(obj => {
        if(obj.id == this.cityId){
          cityName = obj.lookupVal;
        }
      })
      this.contractservice.getPincodeByFeature(this.cityId).subscribe(resultData => {
        let ob = ErrorConstants.validateException(resultData);
        if (ob.isSuccess) {
          resultData.data.responseData = resultData.data.responseData.filter(obj=>obj.status)
          if(resultData.data.responseData && resultData.data.responseData.length == 0){
            this.tosterService.info('Pincode is not available');
          }
          if (this.excludedPincodeList && this.excludedPincodeList.length > 0 && flag != 1) {
            resultData.data.responseData.forEach(element => {
              let exists = false;
              this.excludedPincodeList.forEach(exPincode => {
                if (exPincode.dlvryBranchPinMapId == element.id) {
                  exists = true;
                }
              });
              if(!exists){
                // this.allPincodeList = this.allPincodeList.filter(obj=>obj.isChecked);
                let pincodeData = new CommdtGeoExclusionDTO();
                pincodeData.dlvryBranchPinMapId = element.id;
                pincodeData.effectiveDt = element.effectiveDt;
                pincodeData.pincode = element.pincode;
                pincodeData.expDt = element.expDt;
                pincodeData.safextFlag = (element.lkpSafextTypeId > 0) ? 1 : 0;
                pincodeData.moveFrom = JSON.parse(JSON.stringify(pincodeData.safextFlag));
                pincodeData.city = cityName; // element.city.cityName;
                let tempArr = this.allPincodeList.filter(obj=>obj.pincode == element.pincode);
                if(!tempArr ||  tempArr.length == 0){
                  this.allPincodeList.push(pincodeData);
                }
              }
            });
          } else {
            resultData.data.responseData.forEach(element => {
              
              let pincodeData = new CommdtGeoExclusionDTO();
              pincodeData.dlvryBranchPinMapId = element.id;
              pincodeData.pincode = element.pincode;
              pincodeData.effectiveDt = element.effectiveDt;
              pincodeData.expDt = element.expDt;
              pincodeData.safextFlag = (element.lkpSafextTypeId > 0) ? 1 : 0;
              pincodeData.moveFrom = JSON.parse(JSON.stringify(pincodeData.safextFlag));
              pincodeData.city = cityName ; //  element.city.cityName;
              let tempArr = this.allPincodeList.filter(obj=>obj.dlvryBranchPinMapId == element.id);
              if(!tempArr ||  tempArr.length == 0){
                this.allPincodeList.push(pincodeData);
              }
            });
            console.log('>>', this.allPincodeList);
          //   this.allPincodeList = this.allPincodeList.filter(obj => obj.status);
          // console.log('>>>>>......', this.allPincodeList);
          }          
        } else {
          this.tosterService.error(ob.message);
        }
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        this.tosterService.error(ErrorConstants.getValue(404));
      });
    }
  
    addToExcludeList() {
      this.allPincodeList.forEach(element => {
        if (element.isChecked &&  element.safextFlag == 0 ) {
          element.isChecked = false;
          element.safextFlag = 1;
        }
      });
    }
  
    removeFromExcludeList() {
      this.allPincodeList.forEach(element => {
        if (element.isChecked &&  element.safextFlag ==1) {
          element.isChecked = false;
          element.safextFlag = 0;
        }
      })
    }
  
  
  
    saveExclusion() {
      this.dialogRef.close(this.allPincodeList);
    }
    
    @HostListener('document:keydown', ['$event'])
      handleKeyboardEvent(event: KeyboardEvent) {
        if (event.keyCode === 27) { // esc [Close Dialog]
          event.preventDefault();
          if(document.getElementById('closeButton')){
            let element: HTMLElement = document.getElementById('closeButton') as HTMLElement;
            element.click();
          }
        }
    }
    
    searchCtrl = '';
    searchCtrlCity = '';
    scrollActiveValue(){
      let selectItem = document.getElementsByClassName('mat-selected')[0];
      setTimeout(()=>{  
          if(selectItem){
            selectItem.scrollIntoView(false);
          }
      },500)
    }

    safex;
    sched;
    checkAll(event, flag){
        if(flag == 'safex') {
          this.allPincodeList.forEach(obj => {
            if(obj.safextFlag){
              obj.isChecked = event.checked;
            }
          })
        }else if(flag == 'sched'){
          this.allPincodeList.forEach(obj => {
            if(!obj.safextFlag){
              obj.isChecked = event.checked;
            }
          })
        }
      }

    schedIsChecked(){
      let flag = true;
      let arr:any[]; 
      arr = this.allPincodeList.filter(obj=> !obj.safextFlag);
      if(arr && arr.length > 0){
        this.allPincodeList.forEach(obj => {
          if(!obj.safextFlag){
            if(!obj.isChecked){
              flag = false;
            }
          }
        });
      }else{
        flag = false;
      }

      return flag;
    }
    safexIsChecked(){
      let flag = true;
      let arr:any[]; 
      arr = this.allPincodeList.filter(obj=> obj.safextFlag);
      if(arr && arr.length > 0){
        this.allPincodeList.forEach(obj => {
          if(obj.safextFlag){
            if(!obj.isChecked){
              flag = false;
            }
          }
        });
      }else{
        flag = false;
      }
      return flag;
    }
    scheduledDeliveryFlag;
    safextDeliveryFlag;
    /*  
    *  Check pincode is selected or not 
    */
    checkPinWithFlag(){
      let flag = true;
      let arrSafext:any[]; 
      let arrScheduled:any[]; 

      arrSafext = this.allPincodeList.filter(obj=> obj.safextFlag);
      arrScheduled = this.allPincodeList.filter(obj=> !obj.safextFlag);
      let  tempArrSafext:any[] = arrSafext.filter(obj => obj.isChecked);
      let  tempArrScheduled:any[] = arrScheduled.filter(obj => obj.isChecked);
      if(this.allPincodeList && this.allPincodeList.length > 0){
        if(this.data.scheduledDeliveryFlag && this.data.safextDeliveryFlag){
          if(tempArrScheduled.length > 0 && tempArrSafext.length > 0){
            flag = false;
            return flag              
          }
        }else{
          if(this.data.scheduledDeliveryFlag){
            if(tempArrScheduled.length > 0){
              flag = false;
              return flag              
            }
          }else if(this.data.safextDeliveryFlag){
            if(tempArrSafext.length > 0){
              flag = false;
              return flag              
            }
          }
        }
        return flag

      }
      return flag  
    }

    addedPincodeList(value){
      if(this.allPincodeList !== undefined && this.allPincodeList.length >0){
      if(value == 'schedule'){
        let array = this.allPincodeList.filter(x=> x.safextFlag == 0 && x.moveFrom == 1);
        let filterArry = array.map(x => x.pincode);
        let schedulePinList = filterArry.join(',');
        return filterArry;
      } else {
        let safexArray = this.allPincodeList.filter(x=> x.safextFlag == 1 && x.moveFrom == 0);
        let safexFilterArry = safexArray.map(x => x.pincode);
        let safexPinList = safexFilterArry.join(',');
        return safexPinList;
      }
    } else {
      return;
    }
  }
  
  
  }
