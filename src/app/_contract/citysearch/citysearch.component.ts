import { Component, OnInit, ViewChild, Inject, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ContractService } from '../contract.service';
import { ErrorConstants } from '../models/constants';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { confimationdialog } from '../confirmationdialog/confimationdialog';


export interface CityElement {
  cityName: String;
  id: number;
}

@Component({
  selector: 'app-citysearch',
  templateUrl: './citysearch.component.html',
  styleUrls: ['../core.css']
})


export class CitysearchComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private http: HttpClient, private _contractService: ContractService,
    private spinner: NgxSpinnerService, private tosterservice: ToastrService,
    public dialogRefEdit: MatDialogRef<CitysearchComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, ) { }

  isStateenable = false;
  iscityenable = false;
  searchCtrlCountry = '';
  cityName = '';
  countryId = '';
  countryData: any = {}
  cityData: any = {}
  countryList = []; // for getting statelist
  cityList = [];
  stateList = [];
  cityPlaceList = [];
  selectedPincode: number;
  stateId = ''; //input for service, to get city list
  cityId = ''; //id to get pincode list
  selectedPinList = [];
  cityMap:any;
  type:any;
  ngOnInit() {
    this.type = this.data.type;
    this.cityMap = new Map();
    this.getCountry();
    this.selection.clear();
    if (this.data.selectedCityIdCommaSep) {
      this.selectedPinList = this.data.selectedCityIdCommaSep.split(',');
    }
  }


  getCountry() {
    this.spinner.show();
    this._contractService.getAllCountry().subscribe(success => {

      let ob = ErrorConstants.validateException(success);
      if (ob.isSuccess) {
        this.countryData = success;

        this.countryList = this.countryData.data.responseData;
        console.log(this.countryList, "countryList");
      } else {
        this.tosterservice.error(ob.message);
      }
      this.spinner.hide();
    },
      error => {
        this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      });

  }

  getStateByCountryId() {
    console.log(this.countryId, "countryId id");

    if (this.countryId == 'undefined' || this.countryId == null || this.countryId == '') {
      this.stateList = [];
      this.stateId = '';
    } else {
      this.spinner.show();
      this._contractService.getStateByCountryId(this.countryId).subscribe
        (success => {

          let ob = ErrorConstants.validateException(success);
          if (ob.isSuccess) {
            var resData: any = success;
            this.stateList = resData.data.responseData;
          } else {
            this.tosterservice.error(ob.message);
          }
          this.spinner.hide();
          this.isStateenable = true;
        }, error => {
          this.tosterservice.error(ErrorConstants.getValue(404));
          this.spinner.hide();
        });
    }
  }
  displayedColumns: string[] = ['select', 'city'];
  dataSource = new MatTableDataSource(this.cityList);
  selection = new SelectionModel<CityElement>(true, []);

  getCityByStateId() {
    console.log(this.stateId, "stateid id");

    if (this.stateId == 'undefined' || this.stateId == null || this.stateId == '') {
      //do not hit the service and set the city list as empty
      this.cityList = [];
      this.cityId = '';
    } else {
      this.spinner.show();
      this._contractService.getCityByStateService(this.stateId)
        .subscribe(data => {
          let ob = ErrorConstants.validateException(data);
          if (ob.isSuccess) {
            var resData: any = data;
            this.cityList = resData.data.responseData;
            this.cityList.forEach((ele) => ele.id = ele.id.toString());
            if (this.cityList.length == 0) {
              this.tosterservice.info("No City Found !");
            }
            console.log(this.cityList, "citylist");
            if (this.cityList.length > 0) {
              this.iscityenable = true;
            } else {
              this.iscityenable = false;
            }
            this.cityList.sort((a,b) => {
              const cityNameA = a.cityName.toUpperCase();
              const cityNameB = b.cityName.toUpperCase();
            
              let comparison = 0;
              if (cityNameA > cityNameB) {
                comparison = 1;
              } else if (cityNameA < cityNameB) {
                comparison = -1;
              }
              return comparison;
            
            });
            this.dataSource = new MatTableDataSource(this.cityList);
            for (let dataele of this.cityList) {
              if (this.selectedPinList.indexOf(dataele.id) !== -1) {
                this.selectedPinList.splice(this.selectedPinList.indexOf(dataele.id), 1);
                this.selection.select(dataele);
              }
            }
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataSource.filterPredicate =
              (data: CityElement, filtersJson: string) => {
                const matchFilter = [];
                const filters = JSON.parse(filtersJson);

                filters.forEach(filter => {
                  const val = data[filter.id] === null ? '' : data[filter.id];
                  matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
                });
                return matchFilter.every(Boolean);
              };
          } else {
            this.tosterservice.error(ob.message);
          }
          this.spinner.hide();
        }, error => {
          this.tosterservice.error(ErrorConstants.getValue(404));
          this.spinner.hide();
        });
    }

  }

  applyFilter(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'cityName',
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
      data: { message: 'Are you sure ?' },
      panelClass: 'creditDialog',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if (value) {
        this.dialogRefEdit.close(this.data.selectedCityIdCommaSep);
      } else {
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
  checkboxLabel(row?: CityElement): string {
    let i = 0;
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    i++;
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${i + 1}`;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  showCheckBox() {
    console.log('selection', JSON.stringify("" + this.selection.selected));
    let allchkCityList = [];
    for (let i in this.selection.selected) {
      console.log("seee", JSON.stringify(this.selection.selected[i]));
      allchkCityList.push(this.selection.selected[i].id);
      this.cityMap.set(this.selection.selected[i].id,this.selection.selected[i].cityName);
    }
    if (this.selectedPinList.length > 0)
      allchkCityList = allchkCityList.concat(this.selectedPinList);
    this.data.cityMap.merge(this.cityMap);
    this.dialogRefEdit.close(allchkCityList.toString(),);

  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) { // esc [Close Dialog]
      event.preventDefault();
      if (document.getElementById('closeButton')) {
        let element = document.getElementById('closeButton')  ;
        element.click();
      }
    }
  }

  searchCtrl = '';
  searchCtrlState = '';
  scrollActiveValue() {
    let selectItem = document.getElementsByClassName('mat-selected')[0];
    setTimeout(() => {
      if (selectItem) {
        selectItem.scrollIntoView(false);
      }
    }, 500)
  }

}