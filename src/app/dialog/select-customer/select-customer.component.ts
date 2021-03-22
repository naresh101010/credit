import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { AppSetting } from 'src/app/app.setting';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { ErrorConstants } from 'src/app/core/models/constants';
import { ToastrService } from 'ngx-toastr';
import { confimationdialog } from '../confirmationdialog/confimationdialog';

@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  styleUrls: ['./select-customer.component.css']
})
export class SelectCustomerComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  contractId: any;
  dataSourceCustomers: any;
  customerData: any = [];
  selectedCustomer: any = [];
  model: any = {};
  custType = 0;
  custWithNameArray: any = [];
  displayedColumns: string[] = ['check', 'customerName', 'contractCode', 'Abranch'];
  columnsForCustTable: string[] = ['custName'];
  checkAll: boolean;
  editflow: boolean;
  pcd: boolean;
  isPCD: boolean;
  datasourceCustomerNames : any;
  minchar:boolean= false;
  nomatch: boolean=false;

  advanceSearchList: any = [
    { value: "MSA CODE", criteriaValue: "MSACODE" },
    { value: "MSA NAME", criteriaValue: "MSAID" },
    { value: "SFX/PRC CODE", criteriaValue: "CNTRCODE" }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SelectCustomerComponent>, public spinner: NgxSpinnerService,
    private apiService: ApiService, private toastr: ToastrService,
    public dialog: MatDialog) {
    this.contractId = AppSetting.contractId;

  }

  ngOnInit() {
    this.model.search = 'MSA NAME';
    this.isPCD = this.data.isPCD;
    this.selectedCustomer = [...this.data.previousData];
    this.editflow = this.data.editflow;
    this.pcd = this.data.pcd;
    // let newData = this.convertOldDataToNew();
    // console.log('data',newData)
    // this.dataSourceCustomers = new MatTableDataSource(newData);


  }

  custTypeChange() {
    if (this.model.search == 'MSA NAME') {
      this.model.searchbyname = '';
      this.custWithNameArray = [];
      this.model.msaID = '';
      // this.searchByMSAId();
    } else if (this.model.search == 'MSA CODE') {
      // this.SearchByMSACode();
      this.model.searchByCode = '';
    } else if (this.model.search == 'PRC CODE' || this.model.search == 'SFX CODE') {
      //this.SearchBySFXOrPRCCode();
      this.model.search = this.custType ? 'PRC CODE' : 'SFX CODE';
      this.model.searchBySFXOrPRC = '';
    }
    this.customerData = [];
    this.dataSourceCustomers = new MatTableDataSource(this.customerData);

  }

  closeDailog() {
    this.dialogRef.close(this.selectedCustomer);
  }

  sendCustomerList: any[] = [];

  getCustomersList(finalData) {
    this.spinner.show();
    this.customerData = [];
    let customerType = this.custType == 0 ? 'CREDIT' : 'PRC';
    this.apiService.post(`secure/v1/deliveryCommercial/assocBranchIds/customers?creditOrPrc=${customerType}`, finalData).subscribe(data => {

      this.customerData = data.data.responseData;
      //BEG: Please remove this code before push into GIT.
      // console.log('1 this.customerData', this.customerData);
      // let abc = {
      //   "msaId": 2378,
      //   "customerName": "IBMTEST2",
      //   "contractCode": "SFX10000791",
      //   "branches": [
      //     {
      //       "branchId": 1,
      //       "branchName": "ABOHAR-01"
      //     }
      //   ]
      // }
      // this.customerData.push(abc);
      // console.log('2 this.customerData', this.customerData);
      //END: Please remove this code before push into GIT.
      //  let filteredData = [];
      //  filteredData = this.customerData.filter(x=> !this.selectedCustomer.find(y=> y.msaCustId == x.msaId) );
      //  this.customerData = filteredData.concat(this.convertOldDataToNew());

      // console.log('API Resp', this.customerData)
      this.customerData.forEach(element => {
        let previousObj = this.selectedCustomer.find(cust => cust.msaCustId == element.msaId);
        if (previousObj !== undefined) {
          element['checked'] = true;
        } else {
          element['checked'] = false;
        }
        element['branchNames'] = this.displayBranchName(element.branches)
      });
      this.isCheckedAll();
      this.dataSourceCustomers = new MatTableDataSource(this.customerData);
    
      // console.log('dataSourceCustomers', this.dataSourceCustomers)
      this.spinner.hide();
    }, (error) => {
      this.toastr.error(error.error.errors.error[0].description);
      this.spinner.hide();
    })
  }

  addCustomers() {
    this.dialogRef.close(this.selectedCustomer);
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSourceCustomers.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSourceCustomers.paginator) {
  //     this.dataSourceCustomers.paginator.firstPage();
  //   }
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length > 0 && filterValue.length<3){
      this.minchar= true
      this.nomatch = false;
      this.datasourceCustomerNames.filter = null;  
    }
    else if (filterValue.length == 0) {
      this.minchar = false;
    }
    else {
      this.minchar= false
      this.datasourceCustomerNames.filter = filterValue.trim().toLowerCase();
      if( this.datasourceCustomerNames.filteredData.length > 0){
        this.nomatch = false;
      }
      else{
        this.nomatch = true;
      }
    }
    if (this.datasourceCustomerNames.paginator) {
      this.datasourceCustomerNames.paginator.firstPage();
    }
  }

  onChangeSearchCriteria() {
    this.custWithNameArray = [];
    this.dataSourceCustomers = new MatTableDataSource(this.customerData);
    this.model.searchbyname = '';
  }

  /*------ make all records selected ------- */
  checkedAll(event) {
    if (event) {
      this.dataSourceCustomers.data.forEach(element => {
        element.checked = event.checked;
        this.addCustomer(event.checked, element);
      });
    }
  }

  /*------- check all records are selected or not ---------*/
  isCheckedAll() {
    let checkedData = this.customerData.filter(x => x.checked == true);
    if (checkedData !== undefined) {
      if (checkedData.length == this.customerData.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    }
  }

  SearchByMSAName(obj) {
    // console.log('search...', this.model.searchbyname)
    this.customerData = [];
    this.dataSourceCustomers =  new MatTableDataSource([]);
    if (obj.length > 2) {
      if (this.model.search == "MSA NAME") {
        let searcgObj = this.model.searchbyname.toUpperCase();
        this.spinner.show();
        this.apiService.post(`secure/v1/deliveryCommercial/assocMsaIds/custName?msaName=${searcgObj}`).subscribe(
          data => {
            if (data.status == 'SUCCESS') {
              // console.log('data----', data);
              this.custWithNameArray = data.data.responseData;
              this.datasourceCustomerNames = new MatTableDataSource(this.custWithNameArray);
              this.spinner.hide();
              this.model.searchbyname = '';
            }
            else {
              this.spinner.hide();
              // this.toast.warning(data.message, data.code);
            }
          },
          error => {
            this.toastr.error(ErrorConstants.getValue(404));
            this.spinner.hide();
          });
      }
    }
  }

  displayBranchName(branches) {
    if (branches !== undefined) {
      let branchNames = branches.map(x => x.branchName)
      return branchNames.join(', ');
    }
  }

  /*---------- On select customer ---------- */
  searchByMSAId(id) {
    this.model.msaID = id;
    let finalData = {
      "branchIds": [],
      "contractCodes": [],
      "msaCode": "",
      "msaIds": [this.model.msaID],
      "searchCriteria": "MSAID"
    }
    this.getCustomersList(finalData);
    this.custWithNameArray = [];
    this.datasourceCustomerNames = new MatTableDataSource([]);
    this.minchar = false;
    this.nomatch = false;
  }

  /*---------- On select MSA Code ------------ */
  SearchByMSACode() {
    let finalData = {
      "branchIds": [],
      "contractCodes": [],
      "msaCode": (this.model.searchByCode).toUpperCase(),
      "msaIds": [],
      "searchCriteria": "MSACODE"
    }
    this.getCustomersList(finalData);
  }

  /*------ On Select SFX/PRC Code ---------- */
  SearchBySFXOrPRCCode() {
    let finalData = {
      "branchIds": [],
      "contractCodes": [(this.model.searchBySFXOrPRC).toUpperCase()],
      "msaCode": "",
      "msaIds": [],
      "searchCriteria": "CNTRCODE"
    }
    this.getCustomersList(finalData);
  }

  /*----------- set selected customer object --------- */
  setSelectedCustomerObj(obj) {
    return {
      id: null,
      attr1: obj.customerName,
      msaCustId: obj.msaId,
      cntrCode: obj.contractCode,
      status: '',
      active: this.pcd ? true : false
    }
  }

  isChckedCust = false;
  radioModel = null;
  addCustomerPCD(obj: any) {
    this.isChckedCust = true;
    this.selectedCustomer.push(this.setSelectedCustomerObj(obj));
  }

  /*----------- add customer to selected customer list -------- */
  addCustomer(isChecked, obj) {
    if (isChecked == false) {
      this.selectedCustomer.forEach((element, i) => {
        // console.log(element)
        if (element.msaCustId == obj.msaId) {
          this.selectedCustomer.splice(i, 1);
          return
        }
      });
    } else {
      let isExistObj = this.data.previousData.find(x => x.msaCustId == obj.msaId);

      if (isExistObj == undefined) {
        let custObj = this.setSelectedCustomerObj(obj);
        if (this.editflow) {
          custObj.status = AppSetting.editStatus;
        } else {
          delete custObj.status;
        }
        this.selectedCustomer.push(this.setSelectedCustomerObj(obj));
      } else {
        let dataObj = this.setSelectedCustomerObj(obj);
        dataObj.id = isExistObj.id;
        this.editflow ? dataObj.status = AppSetting.editStatus : dataObj.status = isExistObj.status;
        this.selectedCustomer.push(dataObj);
      }
    }
    // console.log('selected list', this.selectedCustomer);
    this.isCheckedAll();
  }

  /*----- convert selected customer obj to table data obj ------- */
  convertObj(obj) {
    return {
      msaId: obj.msaCustId,
      customerName: obj.attr1,
      contractCode: obj.cntrCode,
      checked: true
    }
  }

  convertOldDataToNew() {
    let preData = [];
    this.selectedCustomer.forEach(element => {
      preData.push(this.convertObj(element))
    });

    return preData;
  }

  closeDialog(): void {

    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      panelClass: 'creditDialog',
      data: { message: 'Are you sure ?' },
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if (value) {
        this.dialogRef.close(this.selectedCustomer);
      } else {
        // console.log('Keep Open');
      }
    });

  }

}
