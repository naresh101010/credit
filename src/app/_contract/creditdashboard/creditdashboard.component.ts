import { Component, OnInit, ViewChild } from '@angular/core';
import { ContractService } from '../contract.service';
import { Router} from '@angular/router';
import { AppSetting } from '../../app.setting';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorConstants } from '../models/constants';
import { MatSort, MatDialog, MatPaginator } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { ContractversionComponent } from '../contractversion/contractversion.component';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-creditdashboard',
  templateUrl: './creditdashboard.component.html',
  styleUrls: ['../core.css', 'creditdashboard.component.css']
})
export class CreditdashboardComponent implements OnInit {

    //start Greeting Message
    greeting(){
      let myDate = new Date();
      let hrs = myDate.getHours();

      let greet;

      if (hrs < 12)
          greet = 'Good Morning';
      else if (hrs >= 12 && hrs <= 17)
          greet = 'Good Afternoon';
      else if (hrs >= 17 && hrs <= 24)
          greet = 'Good Evening';

          return greet
    }
 //End Greeting Message

  msaCust;
  msaData: any = [];
  statusList = [];
  searchType;
  dataSource: any;
  selectedValue = 'PENDING';
  isEditflow: boolean;
  displayedColumns: string[] = ['custName', 'opprId', 'pan', 'gstinNum', 'sfdcAccId', 'msaCustAddrs', 'originatingSrc'];
  perList: any = [];
  userName = JSON.parse(sessionStorage.getItem('all')).data.responseData.user.username;

  constructor(private spinner: NgxSpinnerService, private _contractService: ContractService, private tosterservice: ToastrService,
    private router: Router, private dialog: MatDialog, private permissionsService: NgxPermissionsService, private authorizationService: AuthorizationService) { }
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  count;
  checkValue;
  ngOnInit() {
    this.authorizationService.setPermissions('CONTRACT');
    this.perList = this.authorizationService.getPermissions('CONTRACT') == null ? [] : this.authorizationService.getPermissions('CONTRACT');
    this.authorizationService.setPermissions('MSA');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('MSA'));
    this.authorizationService.setPermissions('COMMANDMENT');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('COMMANDMENT'));
    console.log(this.perList);
    this.permissionsService.loadPermissions(this.perList);

    this.searchType = 'MSA' ;
    this.spinner.show();
    this._contractService.contractCount().subscribe(countData =>{
      this.count = countData.data.responseData;
      this.spinner.hide();
    },
    error => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });

    this.countData(this.selectedValue);
  }

  countData(value) {
    this.spinner.show();
    let searchValue = '';
    if (value === 'EXPIRING SOON') {
      searchValue = 'ACTIVE';
    } else {
      searchValue = JSON.parse(JSON.stringify(value));
    }
    this._contractService.getData(searchValue).subscribe(success => {
       let ob = ErrorConstants.validateException(success);
       if (ob.isSuccess) {
        this.msaCust = success.data;
        this.msaData=[];
        this.spinner.hide();
        this.statusList = this.msaCust.referenceData.statusList;
        let currentDate : Date = new Date();
         currentDate.setHours(0, 0, 0, 0);
        let currDateinMilli = new Date(currentDate);
        for (let data of this.msaCust.responseData) {
          for (let statusid of this.statusList) {
            if (data.status === statusid.id) {
              data.statusName = statusid.lookupVal;
            }
          }
          let dateinMilli = new Date(Date.parse(data.cntrExpDt));
          if (value === 'EXPIRING SOON') {
            console.log(currentDate, currDateinMilli, dateinMilli);
            if (dateinMilli.getMonth() === new Date().getMonth() && dateinMilli.getFullYear() === new Date().getFullYear() && dateinMilli.getTime() >= currDateinMilli.getTime()) {
              this.msaData.push(data);
            }
          } else if (value === 'ACTIVE') {
            console.log(currentDate, currDateinMilli.getTime(), dateinMilli.getTime());
            if (dateinMilli.getTime() >= currDateinMilli.getTime()) {
              this.msaData.push(data);
            }
          } else {
            this.msaData.push(data);
          }
        }
      } else {
      this.tosterservice.error(ob.message);
      this.spinner.hide();
    }
    this.dataSource = new MatTableDataSource(this.msaData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  },
  error => {
    this.tosterservice.error(ErrorConstants.getValue(404));
    this.spinner.hide();
  });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterForActiveData(value) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  goToMsa(user) {
    AppSetting.msaCustId = user.id;
    AppSetting.oprtunityId = user.opprId;
    AppSetting.stepperFlag = true;
    AppSetting.sfxCode = 'NOT GENERATED YET';
    this.router.navigate(['/contract/msa'], {skipLocationChange: true});
  }

  openDialogContractVersion(data) {
    const dialogRefVersion = this.dialog.open(ContractversionComponent, {
      width: '690px',
      data: {contractId: data.cntrId, cntrCode: data.cntrCode},
      disableClose: true,
      panelClass: 'creditDialog',
      backdropClass: 'backdropBackground'
    });

    dialogRefVersion.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  showSfxCodeData(data) {
    this.isEditflow = true;
    AppSetting.msaCustId = data.id;
    AppSetting.contractId = data.cntrId;
    AppSetting.stepperFlag = true;
    AppSetting.oprtunityId = data.opprId;
    this.router.navigate(['/contract/opportunity', {'openDialog' : 'true'}], {skipLocationChange : true});
}

  /*-------------- on select block ----------- */
  onSelectBlock(value: string) {
    this.countData(value);
    this.selectedValue = value;
    if (this.selectedValue === 'PENDING') {
      this.displayedColumns = ['custName', 'opprId', 'pan', 'gstinNum', 'sfdcAccId', 'msaCustAddrs', 'originatingSrc',];
    } else if (this.selectedValue === 'ACTIVE' || this.selectedValue === 'EXPIRING SOON') {
      this.displayedColumns = ['custName', 'opprId', 'pan', 'gstinNum', 'sfdcAccId', 'msaCustAddrs', 'originatingSrc', 'sfxCode', 'expDt', 'version', 'edit'];
    } else if (this.selectedValue === 'DRAFT') {
      this.displayedColumns = ['custName', 'opprId', 'pan', 'gstinNum', 'sfdcAccId', 'msaCustAddrs', 'originatingSrc', 'lastUpdateDate'];
    } else if (this.selectedValue === 'SEARCH') {
      this.displayedColumns = ['custName', 'opprId', 'pan', 'gstinNum', 'sfdcAccId', 'msaCustAddrs', 'originatingSrc', 'lastUpdateDate', 'version', 'edit'];
    }
  }

  commandmentSearch() {
    this.router.navigate(['/contract/msaoperation', {'openDialog': 'true'}], {skipLocationChange : true});
  }

}
