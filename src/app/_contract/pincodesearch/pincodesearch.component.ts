import { Component, OnInit, ViewChild,Inject, HostListener } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatSort } from '@angular/material';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ContractService } from '../contract.service';
import { ErrorConstants } from '../models/constants';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { confimationdialog } from '../confirmationdialog/confimationdialog';


export interface PincodeElement {
  pincode:string;
  city:string;
}

export interface PlaceClickedElement {
  id: number;
  pincode:string;
}

@Component({
  selector: 'app-pincodesearch',
  templateUrl: './pincodesearch.component.html',
  styleUrls: ['../core.css']
})


export class PincodesearchComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private http: HttpClient, private _contractService: ContractService,
       private spinner: NgxSpinnerService, private tosterservice: ToastrService,
     public dialogRefEdit: MatDialogRef<PincodesearchComponent>,
     public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  
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
    selectedPinList = [];
    
    type:any;
  ngOnInit() {
    this.type = this.data.type;
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
    this.selection.clear();
    if(this.data.selectedPinCommaSep){
      this.selectedPinList = this.data.selectedPinCommaSep.split(',');
    }
  }

 
  getState(){
    this.spinner.show();
    this._contractService.getAllStates().subscribe(success => {

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
        this._contractService.getCityByStateService(this.stateId).subscribe
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
    this._contractService.getPlaceByCityService(this.cityId)
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
          for(let dataele of this.pincodeList){
            if(this.selectedPinList.indexOf(dataele.pincode)!== -1){
              this.selectedPinList.splice(this.selectedPinList.indexOf(dataele.pincode),1);
              this.selection.select(dataele);
            }
          }
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
      panelClass: 'creditDialog',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if(value){
        this.dialogRefEdit.close(this.data.selectedPinCommaSep);
      }else{
        console.log('Keep Open');
      }
    });
  
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PincodeElement): string {
    let i=0;
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    i++;
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${i+1}`;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
  showCheckBox() {
    console.log('selection',JSON.stringify(""+this.selection.selected));
    let allchkPincodeList = [];
    for(let i in this.selection.selected){
      console.log("seee",JSON.stringify(this.selection.selected[i]));
      allchkPincodeList.push(this.selection.selected[i].pincode);
    }
    if(this.selectedPinList.length>0){
      allchkPincodeList = allchkPincodeList.concat(this.selectedPinList);
    }    
    this.dialogRefEdit.close(allchkPincodeList.toString());
  
  }
  
 @HostListener('document:keydown', ['$event'])
 handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) { // esc [Close Dialog]
      event.preventDefault();
      if(document.getElementById('closeButton')){
        let element = document.getElementById('closeButton');
        element.click();
      }
    }
}

searchCtrl = '';
searchCtrlState = '';
scrollActiveValue(){
  let selectItem = document.getElementsByClassName('mat-selected')[0];
  setTimeout(()=>{  
      if(selectItem){
        selectItem.scrollIntoView(false);
      }
  },500)
}

}