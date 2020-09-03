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


export interface StateElement {
  stateName: string;
  id: number;
}

@Component({
  selector: 'app-statesearch',
  templateUrl: './statesearch.component.html',
  styleUrls: ['../core.css']
})


export class StatesearchComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private http: HttpClient, private _contractService: ContractService,
    private spinner: NgxSpinnerService, private tosterservice: ToastrService,
    public dialogRefEdit: MatDialogRef<StatesearchComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, ) { }

  isStateenable = false;
  iscityenable = false;

  cityName = '';
  countryId = '';
  countryData: any = {}
  cityData: any = {}
  countryList = []; // for getting statelist
  cityList = [];
  stateList = [];
  stateIdListSfx = [];
  cityPlaceList = [];
  selectedPincode: number;
  stateId = ''; //input for service, to get city list
  cityId = ''; //id to get pincode list
  selectedPinList = [];

  type:any;
  ngOnInit() {
    this.type = this.data.type;
    if (this.data.isSafexttype.length > 0) {
      console.log('call')
      let arr = [];
      for (let state of this.data.isSafexttype) {
        arr.push(state.stateId);
      }
      this.stateIdListSfx = arr;
    }
    this.getCountry();
    this.selection.clear();
    if (this.data.selectedStateIdCommaSep) {
      this.selectedPinList = this.data.selectedStateIdCommaSep.split(',');
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

  displayedColumns: string[] = ['select', 'state'];
  dataSource = new MatTableDataSource(this.cityList);
  selection = new SelectionModel<StateElement>(true, []);
  searchCtrlCountry = '';
  getStateByCountryId() {
    console.log(this.stateId, "stateid id");

    if (this.countryId == 'undefined' || this.countryId == null || this.countryId == '') {
      //do not hit the service and set the city list as empty
      this.stateList = [];
      this.stateId = '';
    } else {
      this.spinner.show();
      this._contractService.getStateByCountryId(this.countryId)
        .subscribe(data => {
          let ob = ErrorConstants.validateException(data);
          if (ob.isSuccess) {
            var resData: any = data;
            this.stateList = resData.data.responseData;
            this.stateList.forEach((ele) => ele.id = ele.id.toString());
            console.log(this.stateList, "stateList");
            if (this.stateList.length > 0) {
              this.iscityenable = true;
            } else {
              this.iscityenable = false;
            }
            let tempStateList = []
            if (this.stateIdListSfx.length > 0) {
              for (let dataele of this.stateList) {
                if (this.stateIdListSfx.indexOf(dataele.id) !== -1) {
                  tempStateList.push(dataele);
                }
              }
              this.stateList = tempStateList;
            }
            if (this.stateList.length == 0) {
              this.tosterservice.info("No State Found !");
            }
              this.stateList.sort((a,b) => {
              const stateNameA = a.stateName.toUpperCase();
              const stateNameB = b.stateName.toUpperCase();
            
              let comparison = 0;
              if (stateNameA > stateNameB) {
                comparison = 1;
              } else if (stateNameA < stateNameB) {
                comparison = -1;
              }
              return comparison;
            
            });
            this.dataSource = new MatTableDataSource(this.stateList);
            for (let dataele of this.stateList) {
              if (this.selectedPinList.indexOf(dataele.id) !== -1) {
                this.selectedPinList.splice(this.selectedPinList.indexOf(dataele.id), 1);
                this.selection.select(dataele);
              }
            }
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.dataSource.filterPredicate =
              (data: StateElement, filtersJson: string) => {
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
      id: 'stateName',
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
        this.dialogRefEdit.close(this.data.selectedStateIdCommaSep);
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
  checkboxLabel(row?: StateElement): string {
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
    }
    if (this.selectedPinList.length > 0)
      allchkCityList = allchkCityList.concat(this.selectedPinList);
    this.dialogRefEdit.close(allchkCityList.toString());

  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) { // esc [Close Dialog]
      event.preventDefault();
      if (document.getElementById('closeButton')) {
        let element: HTMLElement = document.getElementById('closeButton') as HTMLElement;
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