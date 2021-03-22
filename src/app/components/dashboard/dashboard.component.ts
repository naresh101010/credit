import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ContractversionComponent } from './../contractversion/contractversion.component';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { AppSetting } from 'src/app/app.setting';
import { ApiService } from 'src/app/core/services/api.service';
import { BookingAssociateContractUpdateComponent } from '../../dialog/booking-associate-contract-update/booking-associate-contract-update.component';
import { ErrorConstants } from 'src/app/core/models/constants';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ViewBranchesComponent } from 'src/app/dialog/view-branches/view-branches.component';
import { DashboardBranchSearchComponent } from 'src/app/dialog/dashboard-branch-search/dashboard-branch-search.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  minchar: boolean = false;
  nomatch: boolean = false;
  DdraftMode;
  DactiveContract;
  //bookemarkedArray;
  value;
  myDate = new Date();
  currDate: string;
  activeStatusValue = 'ACTIVE';
  userName = JSON.parse(sessionStorage.getItem('all')).data.responseData.user.username;
  userId = JSON.parse(sessionStorage.getItem('all')).data.responseData.user.userId;
  cardDetails: any[] = [];
  draggedObjects: any[] = [];
  favouriteObjects: any[] = [];
  pinnedObject: any;
  menuHierarchy: any;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input() editFlag: boolean;

  @Output() flagEdit: EventEmitter<boolean> = new EventEmitter();

  constructor(private spinner: NgxSpinnerService, public router: Router, public dialog: MatDialog, private apiService: ApiService, private datePipe: DatePipe, private authorizationService: AuthorizationService,
    private permissionsService: NgxPermissionsService, private tosterservice: ToastrService) {
    this.dataSource = new MatTableDataSource([]);
  }

  displayedColumns: string[] = ['contactFname', 'cntrCode', 'vendorDeptt', 'mob', 'contractStartDate', 'contractCreationDate', 'version', 'edit'];
  dataSource: any;  //= ELEMENT_DATA;
  dashboardTotalCount: any = new Object();
  selectedValue: string = 'ACTIVE';
  perList: any = [];
  exAttrMap = new Map();
  exAttrKeyList = [];
  exAttrKeyList1 = [];
  exAttrKeyList2 = [];
  dataEdit: any;
  searchBy: string = 'Org. Name'

  //start Greeting Message
  greeting() {
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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  rfrencList: any;
  expiredArray: any;
  ngOnInit() {
    this.authorizationService.setPermissions('DASHBOARD');
    this.menuHierarchy = this.authorizationService.getMenuHierarchyId();
    this.perList = this.authorizationService.getPermissions('DASHBOARD') == null ? [] : this.authorizationService.getPermissions('DASHBOARD');
    this.authorizationService.setPermissions('CONTRACT');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('CONTRACT'));
    // this.authorizationService.setPermissions('COMMERCIAL');
    // this.perList = this.perList.concat(this.authorizationService.getPermissions('COMMERCIAL'));
    // this.authorizationService.setPermissions('DEDUCTION');
    // this.perList = this.perList.concat(this.authorizationService.getPermissions('DEDUCTION'));
    this.permissionsService.loadPermissions(this.perList);
    // console.log('perlist', this.perList);

    this.resetAppSetting();
    if (window['defaultLandingTarget'] && window['defaultLandingTarget'] !== ''
      && window['defaultLandingTarget'] !== 'ASSOCIATE MASTER' && window['defaultLandingTarget'] !== 'MSA') {
      this.onSelectBlock(window['defaultLandingTarget']);
      window['defaultLandingTarget'] = '';
    } else {
      window['defaultLandingTarget'] = '';
      this.onSelectBlock(this.selectedValue);
    }

    this.spinner.show();

    /*  moved in above line for pinned functionality by Tejaswi */

    // this.apiService.get("secure/v1/deliverycontract/all/ACTIVE").subscribe((suc) => {
    //   this.spinner.hide();    
    //   console.log('data', suc);

    //   this.rfrencList=suc.data.referenceData;
    //   AppSetting.deptRefList =this.rfrencList.assocDeptList;
    //   this.dataSource = new MatTableDataSource(suc.data.responseData);
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;
    // }, (err) => {
    //   this.spinner.hide();
    //   this.tosterservice.error(ErrorConstants.getValue(404));
    // });

    this.apiService.get("secure/v1/deliverycontract/countAssociateContracts").subscribe((suc) => {
      this.dashboardTotalCount = suc.data.responseData;
      this.getModuleCardDetails();
    }, (err) => {
      this.spinner.hide();
      this.tosterservice.error(ErrorConstants.getValue(404));
    });

  }
  newContract() {
    this.router.navigate(['/asso_delivery-contract/create-associate-contract'], { skipLocationChange: true }).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }
  createContrctnavigartion(object) {
    if (object) {
      console.log('object', object);
      // return
      this.router.navigate(['asso_delivery-contract/assign-associate'], { skipLocationChange: true }).then(nav => {
        AppSetting.associateId = object.id;
        AppSetting.associateObject = object;
        AppSetting.contractId = object.contractId;

        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
    }
  }

  resetAppSetting() {
    AppSetting.contractId = null;
    AppSetting.associateId = null;
    AppSetting.associateObject = null;
    AppSetting.editStatus = null;
    AppSetting.wefDate = null;
  }
  setAppSetting(obj) {
    let editStatusObj = this.rfrencList.statusList.filter(obj1 => obj1.lookupVal === 'EDIT')
    AppSetting.contractId = obj.contractId;
    AppSetting.associateId = obj.id;
    AppSetting.associateObject = obj;
    AppSetting.editStatus = editStatusObj[0].id;
    // AppSetting.editFlow:any ;

  }
  countData(value) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.minchar = false
    if (filterValue.length > 0 && filterValue.length < 3) {
      this.nomatch = false;
      this.minchar = true
      this.dataSource.filter = '';
    }
    else if (filterValue.length == 0) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.minchar = false;
      this.nomatch = false;
    }
    else {
      this.minchar = false
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.filteredData.length > 0) {
        this.nomatch = false;
      }
      else if (this.dataSource.filteredData.length === 0) {
        this.nomatch = true;
      }
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilterForActiveData(value) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  //new Add
  // drop(event: Event) { }


  goToMsa(user) { }

  openDialogContractVersion(data) {
    this.setAppSetting(data);
    const dialogRefVersion = this.dialog.open(ContractversionComponent, {
      width: '400px',
      panelClass: 'mat-dialog-responsive',
      data: data
      //  disableClose: true,
      //  panelClass: 'creditDialog',
      //  backdropClass: 'backdropBackground'
    });

    dialogRefVersion.afterClosed().subscribe(result => {
      if (!result) {
        this.resetAppSetting();
      }
      console.log('The dialog was closed');
    });
  }

  searchOption;
  onSelectBlock(value: string) {
    this.searchBy = 'Org. Name'
    this.searchOption = ["Org. Name", "gst", "mobile No", "pan", "vendor Dept", "Branch Name"]
    this.activeStatusValue = 'ACTIVE';
    // if (value !== 'REPORTS') {
      this.selectedValue = value;
    // }
    if (this.selectedValue === 'PENDING') {
      this.displayedColumns = ['contactFname', 'vendorDeptt', 'gstinNum', 'panNum', 'mob', 'contractStartDate', 'contractCreationDate', 'branchData'];
      this.paginator.pageIndex = 0;
      this.searchFlg = false;
      this.state = 'PENDING'
      this.searchString = '';
      this.run(null, "PENDING");
      //this.dataSource.paginator.firstPage();
    } else if (this.selectedValue === 'EXPIRING SOON') {
      this.displayedColumns = ['contactFname', 'vendorDeptt', 'gstinNum', 'panNum', 'mob', 'contractStartDate', 'contractCreationDate', 'branchData', 'version', 'edit'];
      this.paginator.pageIndex = 0;
      this.searchFlg = false;
      this.state = 'EXPIRING'
      this.searchString = '';
      this.run(null, "EXPIRING");

      // this.dataSource.paginator.firstPage();
    } else if (this.selectedValue === 'DRAFT') {
      this.displayedColumns = ['contactFname', 'vendorDeptt', 'gstinNum', 'panNum', 'mob', 'contractStartDate', 'contractCreationDate', 'branchData'];
      this.spinner.show();
      this.paginator.pageIndex = 0;
      this.searchFlg = false;
      this.state = 'DRAFT'
      this.searchString = '';
      this.run(null, "DRAFT");
      // this.dataSource.paginator.firstPage();
    } else if (this.selectedValue === 'ACTIVE') {
      this.displayedColumns = ['contactFname', 'cntrCode', 'vendorDeptt', 'mob', 'contractStartDate', 'contractCreationDate', 'branchData', 'version', 'edit'];
      this.searchOption = ["Org. Name", "contract code", "mobile No", "vendor Dept", "Branch Name"];
      this.spinner.show();
      this.paginator.pageIndex = 0;
      this.searchFlg = false;
      // this.callstatusapi("ACTIVE");
      this.state = 'ACTIVE'
      this.searchString = '';
      this.run(null, "ACTIVE");

      // this.dataSource.paginator.firstPage();
    } else if (this.selectedValue === 'INACTIVE') {
      this.displayedColumns = ['contactFname', 'vendorDeptt', 'gstinNum', 'panNum', 'mob', 'contractStartDate', 'contractCreationDate', 'branchData', 'version'];
      this.spinner.show();
      this.paginator.pageIndex = 0;
      this.searchFlg = false;
      this.state = 'INACTIVE'
      this.searchString = '';
      this.run(null, "INACTIVE");
      // this.callstatusapi("INACTIVE");
      // this.dataSource.paginator.firstPage();
    } else if (this.selectedValue == 'MSA' || this.selectedValue == 'ASSOCIATE MASTER') {
      this.router.navigate(['/asso_delivery-contract/create-associate-contract'], { skipLocationChange: true })
    }
    else if (this.selectedValue == 'REPORTS') {
      this.router.navigate(['/asso_delivery-contract/reports'], { skipLocationChange: true })
    } 
    else {
      this.selectedValue = "ACTIVE"
      this.displayedColumns = ['contactFname', 'cntrCode', 'vendorDeptt', 'mob', 'contractStartDate', 'contractCreationDate', 'branchData', 'version', 'edit'];
      this.spinner.show();
      this.paginator.pageIndex = 0;
      this.searchFlg = false;
      this.state = 'ACTIVE'
      this.searchString = '';
      this.run(null, "ACTIVE");
      // this.callstatusapi("ACTIVE");
      // this.dataSource.paginator.firstPage();
    }
  }


  hideMsg() {
    this.minchar = false;
  }

  state = 'ACTIVE';
  searchString;
  searchFlg = false;
  enterPressed = false;
  inputFild = false;


  mktable(filteredExpirdArr) {
    if (this.enterPressed) {
      this.dataSource = new MatTableDataSource(filteredExpirdArr);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      if (filteredExpirdArr.length == 0) {
        this.nomatch = true;
        this.enterPressed = false;
      } else {
        this.nomatch = false;
      }
    }
  }
  runSearchBy(status, enterTrue?) {
    // console.log('runsearch', this.activeStatusValue)
    if (this.activeStatusValue == 'EXPIRED') {
      let filteredExpirdArr = [];
      if (this.searchString && this.searchString.length < 3) {
        this.minchar = true;
        this.nomatch = false;
        this.enterPressed = false;
        return;
      }

      let searchStr = this.searchString.toUpperCase()
      if (this.searchBy == 'Org. Name') {
        filteredExpirdArr = this.expiredArray.filter((v) => {
          return v.contactFname.includes(searchStr) || v.contactLname.includes(searchStr)
        })
        this.mktable(filteredExpirdArr)
        if (filteredExpirdArr.length == 0) {
          this.minchar = false;
        }
      } else if (this.searchBy == 'contract code') {
        filteredExpirdArr = this.expiredArray.filter((v) => {
          return v.cntrCode.includes(searchStr)
        })
        this.mktable(filteredExpirdArr)
      } else if (this.searchBy == 'mobile No') {
        filteredExpirdArr = this.expiredArray.filter((v) => {
          return v.mob.includes(searchStr)
        })
        this.mktable(filteredExpirdArr)
      }

      this.minchar = false;
      return
    }
    //handle expired record



    this.nomatch = false;


    let body = {};

    if (this.searchString && this.searchString.length < 3) {
      this.minchar = true;
      return;
    }
    else {
      if (this.searchString && this.searchString.length >= 3) {

        this.minchar = false;
        let replaceKey = '';
        if (this.searchBy == 'Org. Name') {
          replaceKey = 'companyName'
        } else if (this.searchBy == 'mobile No') {
          replaceKey = 'mobileNumber'
        } else if (this.searchBy == 'vendor Dept') {
          replaceKey = 'vendorDept'
        } else if (this.searchBy == 'contract code') {
          replaceKey = 'contractCode'
        } if (replaceKey) {
          body[replaceKey] = this.searchString.toUpperCase();
        } else {
          body[this.searchBy] = this.searchString.toUpperCase();
        }
      }
    }
    if (!this.enterPressed && !enterTrue) {
      return;
    } else {
      this.inputFild = true;
    }
    if (status) { this.state = status; }
    this.spinner.show();
    this.apiService.post(`secure/v1/deliverycontract/search/${this.state}`, body).subscribe(
      success => {
        if (success) {
          // this.dataSource = new MatTableDataSource([]);
          // this.totalItems = 0; 

          this.searchFlg = true;
          this.enterPressed = false;
          // body = {};
          this.dataSource = new MatTableDataSource(success.data.responseData);
          if (success.data.responseData.length > 0) {
            this.rfrencList = success.data.referenceData;

            this.totalItems = success.data.responseData.length;
            this.paginator.pageIndex = 0;
            this.nomatch = false;
          } else if (!enterTrue) {
            this.nomatch = true;
          }
          AppSetting.deptRefList = this.rfrencList.assocDeptList;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.inputFild = false;
          this.spinner.hide();

        } else {
          this.spinner.hide();
        }
      },
      error => {
        this.spinner.hide();
        this.enterPressed = false;
        this.inputFild = false;
      }
    )
  }




  totalItems;
  pageSize: any = 10;
  activeStatue;
  run($event: any, status?) {
    //  console.log(this.activeStatusValue)
    if (this.searchFlg || this.activeStatusValue == 'EXPIRED') { return }
    this.nomatch = false;

    //reset
    if ($event && $event.pageSize) {
      this.pageSize = $event.pageSize;
    }
    this.dataSource = new MatTableDataSource([]);
    this.totalItems = 0;
    //end reset



    if (status) {
      this.activeStatue = status
    }
    this.spinner.show();
    this.getPageData(
      this.activeStatue,
      $event && $event.pageIndex ? $event.pageIndex + 1 : '1',
      this.pageSize,
      'DESC',
      'id'
    ).subscribe(
      success => {
        if (success) {
          this.rfrencList = success.data.referenceData;
          AppSetting.deptRefList = this.rfrencList.assocDeptList;

          let data: DashboardModel[] = success.data.responseData;
          this.sortEditedData(data);

          if (success.data.responseData.length > 0) {
            this.totalItems = success.data.responseData[0].totalItems;
          }
          this.dataSource.sort = this.sort;
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      },
      error => {
        this.spinner.hide();
      }
    )
  }

  getPageData(status, pageNo, pageSize, sortDir, sortField) {
    // assocbbff/secure/v1/deliverycontract/all/page/ACTIVE?pageNo=1&pageSize=20&sortDir=DESC&sortField=id
    return this.apiService.get(`secure/v1/deliverycontract/all/page/${status}?pageNo=${pageNo}&pageSize=${pageSize}&sortDir=${sortDir}&sortField=${sortField}`)
  }


  callexpiredstatusapi() {
    this.searchString = '';
    this.spinner.show();
    this.expiredArray = [];
    this.apiService.get("secure/v1/deliverycontract/all/ACTIVE").subscribe(success => {
      if (success) {
        success.data.responseData.forEach(element => {
          element['editStatus'] = this.getStatus(element) ? 1 : 0;
          this.currDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
          if (element.expDt < this.currDate) {
            this.expiredArray.push(element);
            this.spinner.hide();
          } else {
            this.spinner.hide();
          }
        });
        this.spinner.hide();
        if (this.expiredArray && this.expiredArray.length > 0) {
          this.dataSource = new MatTableDataSource(this.expiredArray);
          this.paginator.pageIndex = 0;

          this.dataSource.sort = this.sort;
          const sortState: Sort = { active: 'editStatus', direction: 'desc' };
          this.sort.active = sortState.active;
          this.sort.direction = sortState.direction;
          this.sort.sortChange.emit(sortState);
          this.dataSource.paginator = this.paginator;
        } else {
          this.dataSource = new MatTableDataSource();
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }

      }
      else {
        this.spinner.hide();
      }
    },
      error => {
        this.spinner.hide();
      });


  }

  showSfxCodeData(data) { }


  /*----------- on click on edit icon in case of active contracts ------------ */
  showEditFlowPopup(data) {
    this.spinner.show();
    this.setAppSetting(data);

    /**  Call get contract API to set contract object */
    this.apiService.get('secure/v1/deliverycontract/' + AppSetting.contractId).subscribe(data => {
      let ob = ErrorConstants.validateException(data);
      if (ob.isSuccess) {
        AppSetting.wefDate = data.data.responseData.effectiveDt;        // set effective date (w.e.f)
        this.spinner.hide();
        const dialogRef = this.dialog.open(BookingAssociateContractUpdateComponent, {
          width: '65vw',
          panelClass: 'mat-dialog-responsive',
          data: data,
        });
        dialogRef.afterClosed().subscribe(result => {

          if (!result) {
            this.resetAppSetting();
          }
        });
      } else {
        this.spinner.hide();
      }
    }, (error) => {
      this.spinner.hide();
    })

  }

  getStatus(data) {
    var isEdit = this.rfrencList.statusList.find(x => x.lookupVal === 'EDIT');
    if (isEdit != undefined) {
      if (isEdit.id == data.status) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /*----------  get all module card details ------- */
  getModuleCardDetails() {
    this.spinner.show();
    this.apiService.getCardDetails(this.menuHierarchy[0].id).subscribe(cardDetails => {
      for (let cardDetail of cardDetails.data) {
        cardDetail['bookmarkIcon'] = 'bookmark_border';
        cardDetail['favoriteIcon'] = 'favorite_border';
        if (cardDetail.moduleEntity == 'DASHBOARD') {
          cardDetail['permission'] = cardDetail.objectName + '_READ';
        } else if (cardDetail.targetValue == 'MSA') {
          cardDetail['permission'] = 'CREATE CONTRACT_CREATE';
        } else if (cardDetail.targetValue == 'ASSOCIATE MASTER') {
          cardDetail['permission'] = 'CREATE CONTRACT_READ';
        }
      }
      this.cardDetails = cardDetails.data;
      this.spinner.hide();
      console.log('Card Details', this.cardDetails)
      this.getDragDropData();
    }, (error) => {
      this.spinner.hide();
      this.tosterservice.error(ErrorConstants.getValue(404));
    })
  }

  /*---------- get drag drop data ----------- */
  getDragDropData() {
    this.spinner.show();
    this.apiService.getDragDropData(this.menuHierarchy[0].id).subscribe(data => {
      this.draggedObjects = data.data.draggedObjects;
      this.favouriteObjects = data.data.favouriteObjects;
      this.pinnedObject = data.data.pinnedObject;

      console.log('pinned', this.pinnedObject);
      console.log('favorite', this.favouriteObjects)

      var filteredArray = this.cardDetails.filter(x => !this.draggedObjects.find(y => y.objectId === x.objectId));
      //this.draggedObjects =  this.draggedObjects.filter(x => this.cardDetails.find(y => y.objectId === x.objectId));
      for (let permissionArray of this.draggedObjects) {
        permissionArray['bookmarkIcon'] = 'bookmark_border';
        permissionArray['favoriteIcon'] = 'favorite_border';
        if (permissionArray.moduleEntity == 'DASHBOARD') {
          permissionArray['permission'] = permissionArray.objectName + '_READ';
        } else if (permissionArray.targetValue == 'MSA') {
          permissionArray['permission'] = 'CREATE CONTRACT_CREATE';
        } else if (permissionArray.targetValue == 'ASSOCIATE MASTER') {
          permissionArray['permission'] = 'CREATE CONTRACT_READ';
        }
        if (this.dashboardTotalCount) {
          if (permissionArray.targetValue == 'EXPIRING SOON') {
            permissionArray['count'] = this.dashboardTotalCount.expCount;
          } else if (permissionArray.targetValue == 'DRAFT') {
            permissionArray['count'] = this.dashboardTotalCount.draftCount;
          } else if (permissionArray.targetValue == 'INACTIVE') {
            permissionArray['count'] = this.dashboardTotalCount.inactiveCount;
          } else if (permissionArray.targetValue == 'ACTIVE') {
            permissionArray['count'] = this.dashboardTotalCount.totalCount;
          }
        }

      }
      this.cardDetails = filteredArray;
      for (let card of this.cardDetails) {
        if (card.moduleEntity == 'DASHBOARD' && this.dashboardTotalCount) {
          if (card.targetValue == 'ACTIVE') {
            card['count'] = this.dashboardTotalCount.totalCount;
          } else if (card.targetValue == 'EXPIRING SOON') {
            card['count'] = this.dashboardTotalCount.expCount;
          } else if (card.targetValue == 'DRAFT') {
            card['count'] = this.dashboardTotalCount.draftCount;
          } else if (card.targetValue == 'INACTIVE') {
            card['count'] = this.dashboardTotalCount.inactiveCount;
          }
        }
      }
      this.spinner.hide();
    }, (error) => {
      let ob = ErrorConstants.validateException(error.error);
      this.tosterservice.warning(ob.message);
      this.spinner.hide();
    });
  }

  /*------------- called after card drop ---------- */
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      if (this.draggedObjects.length > 4) {
        var obj = this.draggedObjects[this.draggedObjects.length - 1];
        this.draggedObjects.splice(this.draggedObjects.length - 1, 1);
        this.cardDetails.push(obj);
      }

      for (let i = 0; i < this.draggedObjects.length; i++) {
        this.draggedObjects[i].objectOrder = i + 1;
        this.draggedObjects[i].status = 1;
        delete this.draggedObjects[i].id;
        delete this.draggedObjects[i].menuHierarchy;
        delete this.draggedObjects[i].moduleEntity;
      }

      var finalObj: any = {};
      finalObj.menuId = this.menuHierarchy[0].id;

      finalObj.draggedObjects = this.draggedObjects;
      // finalObj.favouriteObjects = this.favouriteObjects;
      finalObj.userId = this.userId;
      this.spinner.show();
      this.apiService.postDragDropData(finalObj).subscribe(response => {
        this.spinner.hide();
      }, (error) => {
        this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      });
    }
  }

  getImagePath(pathName, targetValue) {
    if (this.selectedValue === 'ACTIVE' && targetValue === 'ACTIVE') {
      let imageName = '/assets/images/searchContact_white.png';
      return imageName
    } else if (pathName === 'library_books-24px.png' && targetValue === 'ACTIVE') {
      let imageName = '/assets/images/searchContract_icon.png';
      return imageName
    } else if (pathName === 'library_books-24px.png' && targetValue === 'ASSOCIATE MASTER') {
      let imageName = '/assets/images/associatemaster.png';
      return imageName
    }
    else if (this.selectedValue === targetValue) {
      let image = pathName.split('.');
      let imageName = '/assets/images/' + image[0] + '_white' + '.' + image[1];
      return imageName
    }
    else {
      return '/assets/images/' + pathName;
    }
  }

  getImagePathCard(pathName, targetValue) {
    if (pathName === 'library_books-24px.png' && targetValue === 'ACTIVE') {
      let imageName = '/assets/images/searchContract_icon.png';
      return imageName
    } else if (pathName === 'library_books-24px.png' && targetValue === 'ASSOCIATE MASTER') {
      let imageName = '/assets/images/associatemaster.png';
      return imageName
    } else {
      return '/assets/images/' + pathName;
    }
  }

  /*------ Add module card in favorite -------- */
  addToFavorite(item, index) {
    event.stopPropagation();
    var isFavourite = this.favouriteObjects.find(x => x.objectId == item.objectId)
    var favoriteObj: any = {}
    favoriteObj.menuHierarchyId = item.menuHierarchyId;
    favoriteObj.moduleEntityId = item.moduleEntityId;
    if (item.objectId) {
      favoriteObj.objectId = item.objectId;
      favoriteObj.menuCard = false;
    }
    else {
      favoriteObj.menuCard = true;
    }
    // isFavourite !==undefined ? isFavourite['favoriteIcon'] = 'favorite_border' : '';
    if (isFavourite !== undefined) {
      isFavourite["favoriteIcon"] = "favorite_border";
    }
    favoriteObj.objectOrder = index + 1;
    favoriteObj.status = isFavourite !== undefined ? 0 : 1;
    favoriteObj.targetValue = item.targetValue;

    var finalObject: any = {};
    finalObject.favouriteObject = favoriteObj;
    finalObject.userId = this.userId;
    this.spinner.show();
    this.apiService.postDragDropData(finalObject).subscribe(data => {
      let dataObject = ErrorConstants.validateException(data);
      if (dataObject.isSuccess) {
        this.getDragDropData();
        this.spinner.hide();
      } else {
        this.tosterservice.warning(dataObject.message);
        this.spinner.hide();
      }
    }, (error) => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });

  }

  checkIsFavorite(data) {
    var object = this.favouriteObjects.find(x => x.objectId == data.objectId);
    if (object !== undefined) {
      data['favoriteIcon'] = 'favorite';
      return true;
    } else {
      data['favoriteIcon'] = 'favorite_border';
      return false;
    }
  }

  checkIsPinned(data): boolean {
    var isPinned
    if (this.pinnedObject !== undefined) {
      if (this.pinnedObject.objectId === data.objectId) {
        data['bookmarkIcon'] = 'bookmark';
        isPinned = true;
      } else {
        data['bookmarkIcon'] = 'bookmark_border';
        isPinned = false;
      }
    } else {
      data['bookmarkIcon'] = 'bookmark_border';
      isPinned = false;
    }
    return isPinned
  }

  /*-------- make module card pinned ------------ */
  addToPinnedObj(item, index) {
    var isPinned;
    event.stopPropagation();
    if (this.pinnedObject !== undefined) {
      if (this.pinnedObject.objectId === item.objectId) {
        isPinned = 0;
        item['bookmarkIcon'] = 'bookmark_border';
      } else {
        item['bookmarkIcon'] = 'bookmark';
        isPinned = 1;
      }
    } else {
      item['bookmarkIcon'] = 'bookmark';
      isPinned = 1;
    }
    var pinnedObj: any = {}
    pinnedObj.menuHierarchyId = item.menuHierarchyId;
    pinnedObj.moduleEntityId = item.moduleEntityId;
    if (item.objectId) {
      pinnedObj.menuCard = false;
      pinnedObj.objectId = item.objectId;
    }
    else {
      pinnedObj.menuCard = true;
    }
    pinnedObj.objectOrder = index + 1;
    pinnedObj.status = isPinned;
    pinnedObj.targetValue = item.targetValue;

    var finalObject: any = {};
    finalObject.pinnedObject = pinnedObj;
    finalObject.userId = this.userId;

    this.spinner.show();
    this.apiService.postDragDropData(finalObject).subscribe(data => {
      let dataObject = ErrorConstants.validateException(data);
      if (dataObject.isSuccess) {
        this.getDragDropData();
        this.spinner.hide();
      } else {
        this.tosterservice.warning(dataObject.message);
        this.spinner.hide();
      }
    }, (error) => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });
  }

  getPermissionsForTable(selectedValue) {
    console.log('selected', selectedValue)
    if (selectedValue == 'EXPIRING SOON') {
      return ['EXPIRING SOON CONTRACTS_READ']
    } else if (selectedValue == 'DRAFT') {
      return ['DRAFT CONTRACTS_READ']
    } else if (selectedValue == 'ACTIVE') {
      return ['ACTIVE CONTRACTS_READ']
    } else if (selectedValue == 'INACTIVE') {
      return ['TERMINATED CONTRACTS_READ']
    } else {
      return ['EXPIRING SOON CONTRACTS_READ', 'DRAFT CONTRACTS_READ', 'ACTIVE CONTRACTS_READ', 'TERMINATED CONTRACTS_READ']
    }

  }

  /*---- Sort Data using edit status ----- */
  sortEditedData(data) {
    data.forEach(element => {
      element['editStatus'] = this.getStatus(element) ? 1 : 0;
    });

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'contractCreationDate': return new Date(item.contractUpdateDate);
        case 'contractStartDate': return new Date(item.contractStartDate);
        default: return item[property];
      }
    };
    const sortState: Sort = { active: 'editStatus', direction: 'desc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

/* 
* open popup to view added branches 
*/

  openBranchPopup(element) {
    this.spinner.show();
    let branchData: any;
    this.apiService.get(`secure/v1/deliverycontract/contracts/branches/${element.contractId}`).subscribe(res => {
      if (res.data) {
        if (res.data.responseData && res.data.responseData.length > 0) {
          branchData = res.data.responseData;
          if (branchData.length > 0) {
            this.dialog.open(ViewBranchesComponent, {
              data: { branchData: branchData },
              width: '55vw', minHeight: '20rem',
              panelClass: 'mat-dialog-responsive',
              disableClose: true
            });
            this.spinner.hide();
          } else {
            console.log("Branch does not exits in contract");
            this.spinner.hide();
          }
        }
      }
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      this.tosterservice.error(ErrorConstants.getValue(404));
    })
  }

  /* 
  * open popup to select branch and filter data using selected branch 
  */

  openBranchSearchPopup() {
    //this.setAppSetting(data);
    const dialogRef = this.dialog.open(DashboardBranchSearchComponent, {
      data: { statusList: this.rfrencList.statusList },
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let searchCriteria = {};
        searchCriteria['branchId'] = result;

        this.spinner.show();
        let expiredArrayData = [];

        this.apiService.post(`secure/v1/deliverycontract/search/${this.state}`, searchCriteria).subscribe(
          success => {
            if (success) {

              this.searchFlg = true;
              this.enterPressed = false;

              if (this.activeStatusValue == 'EXPIRED') {
                success.data.responseData.forEach(element => {
                  element['editStatus'] = this.getStatus(element) ? 1 : 0;
                  this.currDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
                  if (element.expDt < this.currDate) {
                    expiredArrayData.push(element);
                    this.spinner.hide();
                  } else {
                    this.spinner.hide();
                  }
                });
                if (expiredArrayData && expiredArrayData.length > 0) {
                  this.dataSource = new MatTableDataSource(expiredArrayData);
                  this.paginator.pageIndex = 0;

                  this.dataSource.sort = this.sort;

                  this.dataSource.paginator = this.paginator;
                } else {
                  this.nomatch = true;
                  this.dataSource = new MatTableDataSource();
                  this.dataSource.sort = this.sort;
                  this.dataSource.paginator = this.paginator;
                }
                this.spinner.hide();

              } else {

                this.dataSource = new MatTableDataSource(success.data.responseData);
                this.rfrencList = success.data.referenceData;
                if (success.data.responseData.length > 0) {
                  this.totalItems = success.data.responseData.length;
                  this.paginator.pageIndex = 0;
                  this.nomatch = false;
                } else {
                  this.nomatch = true;
                }
                AppSetting.deptRefList = this.rfrencList.assocDeptList;
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.inputFild = false;
                this.spinner.hide();
              }

            } else {
              this.spinner.hide();
            }
          },
          error => {
            this.spinner.hide();
            this.enterPressed = false;
            this.inputFild = false;
          }
        )
      }
    });

  }


}


export interface DashboardModel {
  cntrCode: string;
  contactFname: string;
  contactLname: string;
  contractCreationDate: Date;
  contractId: number;
  contractStartDate: Date;
  contractUpdateDate: Date;
  expDt: Date;
  id: number;
  gstinNum: string;
  mob: string;
  panNum: string;
  status: number
  totalItems: any;
  totalPages: any;
  vendorDeptt: any;
}

