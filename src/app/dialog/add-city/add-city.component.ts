import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorConstants } from '../../core/models/constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialog } from '@angular/material';
import { confimationdialog } from '../confirmationdialog/confimationdialog';
import * as _ from 'lodash'
@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {
  countryList = [];
  stateList = [];
  cityList = [];
  existCityList = [];
  existCityListDesabled = [];
  model: any = {};
  searchcityFromType:any = "";
  searchcityToType:any = "";
  constructor(
    private apiService: ApiService,
    private tosterservice: ToastrService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<AddCityComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.existCityListDesabled = [];
    if(this.data.flag && this.data.dObj){
      if(this.data.dObj.fromCityId){
        this.existCityList = this.data.dObj.fromCityId.split(',');       
      }   
      if(this.data.obj && this.data.obj.length > 0){
        this.existCityListDesabled  = this.data.obj.split(',');
      }   
    } else{
      if(this.data.dObj && this.data.dObj.toCityId){
        this.existCityList = this.data.dObj.toCityId.split(',');        
      }
      if(this.data.obj && this.data.obj.length > 0){
        this.existCityListDesabled  = this.data.obj.split(',');
      }
    }  
    console.log('this.existCityListDesabled', this.existCityListDesabled);
    this.apiService.get('secure/v1/geography/country')
      .subscribe(resultCountry => {
        this.countryList = resultCountry.data.responseData;
   //     console.log(resultCountry.data.responseData)
        this.spinner.hide();
      },
        error => {
          this.spinner.hide();
          this.tosterservice.error(ErrorConstants.getValue(404));
        });
  }
  editContry(data) {
    this.spinner.show();
    if(data.countryId){
    this.apiService.get('secure/v1/geography/state/country/'+data.countryId)
  //  this.apiService.get('secure/v1/geography/state')
      .subscribe(resultState => {
        
        if(resultState.data.responseData && resultState.data.responseData.length > 0){
          this.stateList = resultState.data.responseData;
        }else{
          this.tosterservice.info('State list is not available')
          this.stateList = resultState.data.responseData;
        }
        this.spinner.hide();
      },
        error => {
          this.spinner.hide();
          this.tosterservice.error(ErrorConstants.getValue(404));
        });
      }
  }
  editStates(data) {
    this.spinner.show();
    let thisObj = this;
    this.apiService.get('secure/v1/geography/city/state/'+data.stateId)
      .subscribe(resultState => {
        this.cityList = resultState.data.responseData;
        if(this.cityList && this.cityList.length > 0){
          this.cityList = resultState.data.responseData;
          resultState.data.responseData.forEach(element => {
            this.existCityList.forEach(obj => {
              if(obj == element.id) {
                element.checked = true;
              }
              
            })

          });
          let tempArrObj = [];
          let arrayWithValuesRemoved  = [];
          resultState.data.responseData.forEach(function (this, element, index ){
            if(thisObj.existCityListDesabled && thisObj.existCityListDesabled.length > 0 ){
             let tempInd =  thisObj.existCityListDesabled.indexOf(element.id.toString());
             if(tempInd != -1){
              tempArrObj.push(tempInd);
              element.disabled = true;

             }
            }


          });

        }else{
          
          this.cityList = resultState.data.responseData;
        }
        if(this.cityList.length  == 0){
          this.tosterservice.info('City list is not available')
        }

        this.allTableData=[...resultState.data.responseData];
        this.spinner.hide();
      },
        error => {
          this.spinner.hide();
          this.tosterservice.error(ErrorConstants.getValue(404));
        });
  }

  assignCity() {
 //   console.log(this.cityList)
    let checkedVehicle = this.cityList.filter(obj => obj.checked);
    this.dialogRef.close({ 'checkedVehicle': checkedVehicle })
  }

  // closeDialog() {
  //   this.dialogRef.close();
  // }

  closeDialog(): void {    
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      data:{message:'Are you sure ?'},
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if(value){
        this.dialogRef.close();
      }
    });
  
  }

  allTableData: any = [];
  fiterData(filterValue){
    
    if(!filterValue && filterValue.length >= 3){
      return  this.cityList = this.allTableData.filter(obj => {
          return obj;       
      });
    }else{
      return  this.cityList = this.allTableData.filter(obj => {
          return obj.cityName.toLowerCase().includes(filterValue.toLowerCase());    
        });

    }
  }

  checkAll(event, flag){
    this.cityList.forEach(obj => {
        obj.checked = event.checked;
    })
  }
}
