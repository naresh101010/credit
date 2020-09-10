import { Component, OnInit, ViewChild,Inject, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatSort } from '@angular/material';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import{ AppService} from '../../core/services/app.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { confimationdialog } from '../../dialog/confirmationdialog/confimationdialog';
import { ErrorConstants } from 'src/app/core/models/constants';


export interface PincodeElement {
  pincode: String;
  city:String;
}

export interface PlaceClickedElement {
  id: Number;
  pincode:String;
}

@Component({
  selector: 'app-pincodesearch',
  templateUrl: './pincodesearch.component.html',
  styleUrls: []
})


export class PincodesearchComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private http: HttpClient,
       private appservice:AppService,
       private spinner: NgxSpinnerService, private tosterservice: ToastrService,
     public dialogRefEdit: MatDialogRef<PincodesearchComponent>,
     public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  headerData={ 
    'branchCode': '02',
    'journeyId': '01', 
    'originUserType':'03',
    'userId': 'user123'
    }

    isStateenable = false;
    iscityenable = false;

    cityObj;
    cityName='';
    stateData: any = {}
    cityData: any = {}
    stateList = []; // for getting statelist
    cityList = [];
    pincodeList = [];
    cityPlaceList = [];
    selectedPincode: number;
    stateId=''; //input for service, to get city list
    cityId=''; //id to get pincode list
      
    
  ngOnInit() {
    if(this.data.isSafexttype.length>0){
      console.log('call')
      let arr = [];
      for(let state of this.data.isSafexttype){
        let obj = {};
        obj['id']=state.stateId;
        obj['stateName']=state.state;
        arr.push(obj);
      }
      this.stateList = arr;
    }else{
    this.getState();
    }
  }

 
  getState(){
    this.spinner.show();
    this.appservice.getAllStates().subscribe(success => {

      let ob = ErrorConstants.validateException(success);
      if (ob.isSuccess) {
        this.stateData=success;

        this.stateList=this.stateData.data.responseData;
        console.log(this.stateList, "stateList");
      }else {
        this.tosterservice.error(ob.message);
      }
      this.spinner.hide();
    },
      error => {
        this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      });
   
  }

  getCityByStateId(){
      console.log(this.stateId, "stateid id");
      
      if(this.stateId =='undefined' || this.stateId == null || this.stateId ==''){
        //do not hit the service and set the city list as empty
        this.cityList=[];
        this.cityId='';
      }else{
        this.spinner.show();
        this.appservice.getCityByStateService(this.stateId).subscribe
        (success => {

          let ob = ErrorConstants.validateException(success);
          if (ob.isSuccess) {
            var resData:any =success;
            this.cityList=resData.data.responseData;
            console.log(this.cityList, "city list");
          }else{
            this.tosterservice.error(ob.message);
          }
          this.spinner.hide();
        },error => {
          this.tosterservice.error(ErrorConstants.getValue(404));
          this.spinner.hide();
      });
  }
  this.isStateenable =true;
  }
  displayedColumns: string[] = ['select','pincode','city'];
  dataSource = new MatTableDataSource(this.pincodeList);
  selection = new SelectionModel<PincodeElement>(true, []);

  getPlaceByCityId(){
    this.cityId = this.cityObj.id;
    this.cityName = this.cityObj.cityName;
    console.log("cityid",this.cityId);
  if(this.cityId =='undefined' || this.cityId == null || this.cityId ==''){
    //do not hit the service and set the city list as empty
    this.cityList=[];
    this.cityId='';
  }else{
    this.spinner.show();
    this.appservice.getPlaceByCityService(this.cityId)
      .subscribe(data => {
        let ob = ErrorConstants.validateException(data);
        if (ob.isSuccess) {
          var resData:any =data;
          this.pincodeList=resData.data.responseData;
          if(this.pincodeList.length==0){
            this.tosterservice.info("No Pinocde Found !");
          }
          console.log(this.pincodeList, "cpincodelist");
          if(this.pincodeList.length>0){
            this.iscityenable =true;
          }else{
            this.iscityenable =false;
          }
          this.dataSource = new MatTableDataSource(this.pincodeList); 
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.filterPredicate = 
          (data: PincodeElement, filtersJson: string) => {
            const matchFilter = [];
            const filters = JSON.parse(filtersJson);

            filters.forEach(filter => {
              const val = data[filter.id] === null ? '' : data[filter.id];
              matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
            });
            return matchFilter.every(Boolean);
          };
        }else{
            this.tosterservice.error(ob.message);
        }
          this.spinner.hide();
      },error => {
        this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      }); 
  } 

  }

  selectPincode(row){
    this.selectedPincode= row.pincode;
  }

  savePincode(){
    this.dialogRefEdit.close(this.selectedPincode);
  }

  applyFilter(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'pincode',
      value: filterValue
    });

    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  closeDialog(): void {    
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      data:{message:'Are you sure ?'},
    //  disableClose: true,
    //  backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if(value){
        this.dialogRefEdit.close();
      }else{
        console.log('Keep Open');
      }
    });
  
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

}