
import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, PageEvent, Sort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { SwitchBranchComponent } from 'src/app/dialog/switch-branch/switch-branch.component';
// import { ChartType } from 'chart.js';
// import { MultiDataSet, Label, Color } from 'ng2-charts';
import { OpenBookingComponent } from 'src/app/dialog/open-booking/open-booking.component';
import { WaybillDetailsComponent } from 'src/app/dialog/waybill-details/waybill-details.component';
import { SelectWaybillComponent } from 'src/app/dialog/select-waybill/select-waybill.component';
import { AssignBookingComponent } from 'src/app/dialog/assign-booking/assign-booking.component';
import { CreateNewRequestComponent } from 'src/app/dialog/create-new-request/create-new-request.component';
import { TrackWaybillComponent } from 'src/app/dialog/track-waybill/track-waybill.component';
import { SearchBranchComponent } from 'src/app/dialog/search-branch/search-branch.component';
import { BranchService } from 'src/app/core/service/branch.service';
import { CommonService } from 'src/app/core/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppSetting } from '../../app.setting';
import { OpenBookingService } from 'src/app/core/service/open-booking.service';
import { Router } from '@angular/router';
import { DateUtilService } from 'src/app/core/util/date-util.service';
import { SalesDashboardService } from 'src/app/core/service/sales-dashboard.service';
import { DayEndService } from 'src/app/core/service/day-end.service';
import { DatePipe } from '@angular/common';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { CancelBookingComponent } from 'src/app/dialog/cancel-booking/cancel-booking.component';
import { BookingInformationService } from 'src/app/core/service/booking-information.service';
import { AuthorisationService } from 'src/app/core/service/authorisation.service';
import { ExportService } from 'src/app/core/service/export.service';
import { AppComponent } from 'src/app/app.component';
import { WaybillService } from 'src/app/core/service/waybill.service';
import * as moment from "moment";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ApiService } from 'src/app/core/service/api.service';
import { ErrorConstants } from 'src/app/constants';
import { TosterService } from 'src/app/core/service/toster.service';
import { ConsigneeModalComponent } from 'src/app/dialog/consignee-modal/consignee-modal.component';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  logincont: any;
  currentDate;
  previousDate = new Date();
  greet;
  userName;
  myDate = new Date();
  hrs = this.myDate.getHours();
  branchName = sessionStorage.getItem('branchName');
  isUserDetail = false;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('manualWaybill', { static: false, read: MatPaginator }) manualWaybillPaginator: MatPaginator;
  @ViewChild('bookingRecon', { static: false, read: MatPaginator }) bookingReconPaginator: MatPaginator;
  @ViewChild('finnanceInfo', { static: false, read: MatPaginator }) finnanceInfoPaginator: MatPaginator;
  @ViewChild('WayBillPreBook', { static: false }) WayBillPreBookPaginator: MatPaginator;
  perList = []


  // Doughnut
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLabels: Label[] = ['Credit : 00', 'To Pay : 00', 'Paid : 00'];
  public doughnutChartColors: Color[] = [{
    backgroundColor: ['#27AE60', '#4699FD', '#FFA10B']
  }];

  displayedWaybillColumns = ['request', 'waybill', 'pick', 'booking', 'destination', 'sfx', 'customer', 'laying'];
  // displayedPrebookingColumns = ['request', 'waybill', 'pick', 'booking', 'destination', 'sfx', 'customer', 'assignTo', 'assignBtn', 'laying'];
  public doughnutChartData: MultiDataSet = [
    [0, 0, 0],
  ];

  public chartOptions: any = {
    tooltips: { enabled: false },
    hover: { mode: null },
    legend: {
      display: false
    }
  }
  searchOption = 'Customer'

  daysDifference: any;

  // pageNumber = 0;
  // // MatPaginator Inputs
  // length = 0;
  // pageSize = 10;
  // pageSizeOptions: number[] = [5, 10, 25, 100];
  // // MatPaginator Output
  // pageEvent: PageEvent;
  constructor(
    public dialog: MatDialog,
    private commonService: CommonService,
    private $branch: BranchService,
    private spinner: NgxSpinnerService,
    private openBookingService: OpenBookingService,
    private appComp: AppComponent,
    private router: Router,
    private salesDashboardService: SalesDashboardService,
    private dayEndService: DayEndService,
    public datepipe: DatePipe,
    private matSnackBar: MatSnackBar,
    private dateUtil: DateUtilService,
    private $bookingInfo: BookingInformationService,
    private authorisationService: AuthorisationService,
    private changeDetection: ChangeDetectorRef,
    private exportService: ExportService,
    private waybillService: WaybillService,
    private apiService:ApiService,
    private authorizationService:AuthorisationService,
    private tosterservice_:TosterService,
    private permissionsService: NgxPermissionsService
  ) {

    this.permissionsService.loadPermissions(this.perList);

    // this.authorizationService.getPermissions
  }

  userId = JSON.parse(sessionStorage.getItem('all')).data.responseData.user.userId;
  cardDetails: any[] = [];
  draggedObjects: any[] = [];
  favouriteObjects: any[] = [];
  pinnedObject: any;
  menuHierarchy: any;
  // perList: any = [];
  rfrencList:any;
  selectedValue: string = 'ACTIVE';


  simpleArray : any[] = [
    {value : 'report', name: 'Report', iconIfSelected : 'assets/images/pending_icon.png', iconIfNotSelected : 'assets/images/timeline_24px.svg'},
  ]
  /*----------  get all module card details ------- */
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
  allcards =[];
  getModuleCardDetails() {
    this.spinner.show();
    this.apiService.getCardDetails(this.menuHierarchy.id).subscribe(cardDetails => {
      this.allcards = cardDetails.data;
      console.log('allcards', this.allcards);

    for (let cardDetail of cardDetails.data) {
        cardDetail['bookmarkIcon'] = 'bookmark_border';
        cardDetail['favoriteIcon'] = 'favorite_border';
    }
    this.cardDetails = cardDetails.data;

    this.addPermission(this.cardDetails, 'card')




    console.log('after refresh', this.draggedObjects)


   this.spinner.hide();
    this.getDragDropData();
    }, (error) => {
      this.spinner.hide();
      this.tosterservice_.Error(ErrorConstants.getValue(404));
    })
  }

  onSelectBlock(target, path?){
    if(!this.fav_flg || !this.pinFlg){
      return;
    }
    console.log(path)
    this.selectedValue = target;
    if(target == 'SALES DASHBOARD'){
      this.setCurrentDate();this.getSalesDashboradData();this.getBookingSummary();this.openBooking=true; this.saleDashboard=true; this.ePayment=false; this.dayEnd=false;
    }else if(target == 'DAY END'){
      this.openBooking=true; this.saleDashboard=false; this.ePayment=false; this.dayEnd=true; this.getDayEndBookingList();this.getDayFinancialList();this.getMissingWaybillList();
    }else if(target == 'E-PAYMENT'){
      this.checkDayEndForPayemnt();
    }
    if(path){
        this.router.navigate([path]);
    }

  }


  // console.log('view WAYBILL', this.permission.viewWaybill)
  //   console.log('edit WAYBILL', this.permission.editWaybill)

  addPermission(arr, typ){
    let obj = [];
      arr.forEach((item,i) => {
            if(item.targetValue == 'OPEN BOOKING' && this.permission.openBookingList.length > 0){ //1 Open Booking
              item.permission = this.permission.openBookingList;
               obj.push(item)
            }else if(item.targetValue == 'SALES DASHBOARD' && this.permission.salesDashboardList.length > 0){ //2 Sales Dashboard
              item.permission = this.permission.salesDashboardList
               obj.push(item)
            }else if(item.targetValue == 'E-PAYMENT' && this.permission.ePaymentList.length > 0){   // 3 E-Payment
              item.permission = this.permission.ePaymentList
               obj.push(item)
            }else if(item.targetValue == 'DAY END' &&  this.permission.dayEndList.length > 0){  // 4 Day End
              item.permission = this.permission.dayEndList
               obj.push(item)
            }else if(item.targetValue == 'RE BOOKING' &&  this.permission.reBooking.length > 0){  // 5 Initiate UGD/
              item.permission = this.permission.reBooking;
               obj.push(item)
            }else if(item.targetValue == 'VIEW WAYBILL' &&  this.permission.waybillList.length > 0){ // 7 view Waybill
              item.permission = this.permission.waybillList;
               obj.push(item)
            }else if(item.targetValue == 'EDIT WAYBILL' &&  this.permission.waybillList.length > 0){ // 7 --2 edit Waybill
              if( this.permission.waybillList.includes("UPDATE") || this.permission.waybillList.includes("CREATE") ){
                  item.permission = this.permission.waybillList;
                  obj.push(item)
              }
            }else if(item.targetValue == 'WAYBILL INVENTORY' &&  this.permission.waybillInvanteryList.length > 0){ // 7 Waybill Inventory
              item.permission = this.permission.waybillInvanteryList
               obj.push(item)
            }else if(item.targetValue == 'PRINT STICKER' &&  this.permission.printStickerList.length > 0){   // 8 Print Sticker
              item.permission = this.permission.printStickerList
               obj.push(item)
            } else if(item.targetValue == 'MANIFEST' &&  this.permission.manifestList.length > 0){ // 9 Manifest
              item.permission = this.permission.manifestList
               obj.push(item)
            }else if(item.targetValue == 'STAFF MASTER' &&  this.permission.staffMasterList.length > 0){  // 10 Staff Master
              item.permission = this.permission.staffMasterList
               obj.push(item)
            }else if(item.targetValue == 'ACTIVE DEVICES' &&  this.permission.activeDeviceList.length > 0){  // 11 Active Devices
              item.permission = this.permission.activeDeviceList
               obj.push(item)
            } else if(item.targetValue == 'MANAGE VMI' &&  this.permission.manageVmiList.length > 0){   // 12 Manage VMI
              item.permission = this.permission.manageVmiList
               obj.push(item)
            }else if(item.targetValue == 'MY BOOKINGS' &&  this.permission.myBookings.length > 0){ // 13 My Bookings
              item.permission = this.permission.myBookings
               obj.push(item)
            }else if(item.targetValue == 'REPORTS' &&  this.permission.reports.length > 0){ // 14 REPORTS
              item.permission = this.permission.reports
               obj.push(item)
            }
      })

      if(typ == 'drag'){
        this.draggedObjects = [];
        this.draggedObjects = obj;
      }else{
        this.cardDetails = [];
        this.cardDetails = obj;
      }
      obj =[];
  }
  getImagePathCard(pathName, targetValue) {
    if(pathName === 'library_books-24px.png' && targetValue === 'ACTIVE') {
      let imageName = '/assets/images/searchContract_icon.png';
      return imageName
    } else if(pathName === 'library_books-24px.png' && targetValue === 'ASSOCIATE MASTER') {
      let imageName = '/assets/images/associatemaster.png';
      return imageName
    } else {
      return '/assets/images/' + pathName;
    }
  }
  /*---------- get drag drop data ----------- */
  getDragDropData() {
    this.spinner.show();
    this.apiService.getDragDropData(this.menuHierarchy.id).subscribe(data => {
      console.log('right side', data)
      this.draggedObjects = data.data.draggedObjects;
      this.favouriteObjects = data.data.favouriteObjects;
      this.pinnedObject = data.data.pinnedObject;
      var filteredArray = this.cardDetails.filter(x => !this.draggedObjects.find(y => y.objectId === x.objectId));
      this.cardDetails = filteredArray;
      this.spinner.hide();
      // let m = this.draggedObjects.map((drag)=>{
      //    
      //  return {...drag, routingPath:this.cardDetails.find(card => {if(card.objectId == drag.objectId){return card}})}
      // })
      this.draggedObjects.forEach((v,i)=>{ // put path in right side card
        let path = this.allcards.find(t2 => t2.targetValue === v.targetValue).routingPath;
           if(path){
           this.draggedObjects[i].routingPath = path;
          }
      });

      console.log('draggedObject route puting', this.draggedObjects)
      console.log('card details', this.cardDetails)
      // this.draggedObjects.forEach(v=>{
      //     let g = this.cardDetails.find(m=> { if(m.objectId ==v.objectId){ return m}
      //       console.log('find', g)
      //     })
      // })

      // console.log('after routeing path', m)
      this.addPermission(this.draggedObjects, 'drag');
      setTimeout(()=>{
        this.fav_flg = true;
        this.pinFlg = true;
      },500)


    }, (error) => {
      let ob = ErrorConstants.validateException(error.error);
      this.tosterservice_.Warning(ob.message);
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
      finalObj.menuId = this.menuHierarchy.id;
      finalObj.draggedObjects = this.draggedObjects;
      finalObj.userId = this.userId;
      this.spinner.show();
      this.apiService.postDragDropData(finalObj).subscribe(response => {
        this.spinner.hide();
      }, (error) => {
        this.tosterservice_.Error(ErrorConstants.getValue(404));
        this.spinner.hide();
      });
    }

    document.querySelectorAll('.drag_drop_box_without_border .cdk-drag-dragging').forEach(v=>{
      if(v){
        v.remove()
      }
    })


  }



  getImagePath(pathName, targetValue) {
    if (this.selectedValue === targetValue) {
      var image = pathName.split('.');
      var imageName = '/assets/images/' + image[0] + '_white' + '.' + image[1];
      return imageName
    } else {
      return '/assets/images/' + pathName;
    }
  }

  /*------ Add module card in favorite -------- */
  fav_flg = true;
  addToFavorite(item, index) {
    if(!this.fav_flg){return}
    this.fav_flg = false;
    event.stopPropagation();
    var isFavourite = this.favouriteObjects.find(x => x.objectId == item.objectId)
    console.log("isFavourite -- naresh", isFavourite)
    console.log("favouriteObjects -- naresh", this.favouriteObjects)
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
        this.tosterservice_.Warning(dataObject.message);
        this.spinner.hide();
        this.fav_flg = true;
      }
    }, (error) => {
      this.tosterservice_.Error(ErrorConstants.getValue(404));
      this.spinner.hide();
      this.fav_flg = true;
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
  pinFlg = true;
  addToPinnedObj(item, index) {
    if(!this.pinFlg){return}
    this.pinFlg = false;
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
        this.tosterservice_.Warning(dataObject.message);
        this.spinner.hide();
      }
    }, (error) => {
      this.tosterservice_.Error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });
  }

  /** permission code start : initialization**/
  permission = {
    directBooking: [],
    waybillList: [],
    ePaymentList: [],
    salesDashboardList: [],
    manifestList: [],
    printStickerList: [],
    waybillInvanteryList: [],
    staffMasterList: [],
    manageVmiList: [],
    activeDeviceList: [],
    reportList: [],
    openBookingList: [],
    dayEndList: []

  } as any;
  directBookingEnabled: boolean = false;
  epaymentEnabled: boolean = false;
  editWaybillEnabled: boolean = false;
  @ViewChild('pre_booking_tab', { static: false }) pre_booking_tab: ElementRef;
  /** permission code end **/
  ngAfterViewInit() {
    this.waybillService.preBooking_tabObs$.subscribe(v => {
      if (v) {
        this.pre_booking_tab.nativeElement.click()
      }
    })
  }
  ngOnInit() {

    this.spinner.show();
    console.log('deployment done on sit-39');
    this.menuHierarchy = this.authorizationService.getMenuHierarchyId();

    // this.getDayEndDate();
    if (this.hrs < 12) {
      this.greet = 'Good Morning';
    } else if (this.hrs >= 12 && this.hrs < 17) {
      this.greet = 'Good Afternoon';
    } else if (this.hrs >= 17 && this.hrs <= 24) {
      this.greet = 'Good Evening';
    }
    this.userName = JSON.parse(sessionStorage.getItem('all')).data.responseData.user.username;
    this.needPerOf('DIRECT BOOKING', 'directBooking');
    this.needPerOf('WAYBILL', 'waybillList');
    this.needPerOf('E-PAYMENT', 'ePaymentList');
    this.needPerOf('SALES DASHBOARD', 'salesDashboardList');
    this.needPerOf('MANIFEST', 'manifestList');
    this.needPerOf('PRINT STICKER', 'printStickerList');
    this.needPerOf('WAYBILL INVENTORY', 'waybillInvanteryList');
    this.needPerOf('STAFF MASTER', 'staffMasterList');
    this.needPerOf('ACTIVE DEVICES', 'activeDeviceList');
    this.needPerOf('MANAGE VMI', 'manageVmiList');
    this.needPerOf('REPORTS', 'reportList');
    this.needPerOf('OPEN BOOKING', 'openBookingList');
    this.needPerOf('DAY END', 'dayEndList');
    this.needPerOf('RE BOOKING', 'reBooking');
    this.needPerOf('RE ROUTING', 'reRouting');
    this.needPerOf('UGD', 'Ugd');
    this.needPerOf('REPORTS', 'reports');
    this.needPerOf('MY BOOKINGS', 'myBookings');
    this.needPerOf('WAYBILL API', 'waybillApi');
    this.needPerOf('VIEW WAYBILL', 'viewWaybill');
    this.needPerOf('EDIT WAYBILL', 'editWaybill');

    //NARESH

    let createDirectBoooking = this.permission.directBooking.find(elem => elem == "CREATE");
    if (createDirectBoooking) {
      this.directBookingEnabled = true;
    }
    let epayment = this.permission.ePaymentList.find(elem => elem == "CREATE");
    if (epayment) {
      this.epaymentEnabled = true;
    }
    let waybill = this.permission.waybillList.find(elem => elem == "UPDATE");
    if (waybill) {
      this.editWaybillEnabled = true;
    }
    /** setting user specific permissions end **/
    // this.previousDate.setDate(this.previousDate.getDate() - 1)

    if (sessionStorage.getItem('login') === null) {
      this.logincont = this.commonService.getBranchLogin();
    } else {
      this.logincont = sessionStorage.getItem('login');
      // this.spinner.hide();
    }
    // console.log('this.logincont', this.logincont)
    if (this.logincont === null) {
      // sessionStorage.removeItem('branchId');
      console.log('in login count');
      const branch = sessionStorage.getItem('branchId');
      if (!branch) {
        this.getAllBranch();
      } else {
        this.spinner.show();
        this.getDashboardStatus();
        this.getBranchType();
        this.getDayEndDate();
        this.getBookingSummary();
        this.getActiveStaffList();
        this.getActiveDevices();
        this.getDateRangeFromLookup();
        this.getAllLookups();
        this.getAllOfferings();
        this.wayBill('wayBill')
      }
      this.logincont = this.logincont + 1;
      this.commonService.setBranchLogin(this.logincont);
      // this.spinner.hide();
    } else {
      this.spinner.show();
      let type = sessionStorage.getItem('fromScreen');
      console.log(type, 'type')
      this.getDashboardStatus();
      this.getBranchType();
      this.getDayEndDate();
      this.getBookingSummary();
      this.getActiveStaffList();
      this.getActiveDevices();
      this.getDateRangeFromLookup();
      this.getAllLookups();
      this.getAllOfferings();
      if (type == 'waybill') {
        this.wayBill('wayBill')
      } else {
        this.wayBill('preBook')
      }

    }
    if (sessionStorage.getItem("branchId")) {
      this.isPresentBranch = true;
    }
   this.getModuleCardDetails();


    // detect global dash board activity
   if (window['defaultLandingTarget'] && window['defaultLandingTarget'] !== '') {
    this.onSelectBlock(window['defaultLandingTarget']);
    window['defaultLandingTarget'] = '';
    }
  }

  needPerOf(whichPer, per_name){
    this.permission[per_name] = this.authorisationService.getPermissions('BOOKING WEB', whichPer);
  }
  staffList = [];
  getActiveStaffList() {
    this.openBookingService.getStaffList().subscribe((resp: any) => {
      console.log(resp, 'to check');

      if (resp.data.responseData) {
        this.staffList = resp.data.responseData.assocStaffs;
      }
    }, (err) => {
      console.log(err);
      this.spinner.hide();
    })
  }

  openBooking;
  saleDashboard;
  searchPickUp;
  ePayment;
  dayEnd;
  textDisable: boolean = false;
  isPresentBranch: boolean = false;
  dayEndBookingTab = true;
  dayFinancialTab = false;
  dayEndMenualTab = false;
  dayEndcompleted = false;
  branchList: Array<any> = [];
  reBookingRequests: Array<any> = [];
  waybilApiRequests: Array<any> = []
  dataaourceWaybillRebookin: MatTableDataSource<any>
  count = 0;
  ePayemntsList: MatTableDataSource<any>;
  pageNumber = 0;
  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;
  fromDate;
  toDate;
  maxDate = new Date();
  maxToDate = new Date();
  salesUsers: MatTableDataSource<any>;
  salesBookingSummary;
  dashboardSales;
  // dayEnd
  dayEndBookings: MatTableDataSource<any>;
  dayFinanceBookings: MatTableDataSource<any>;
  missingWaybillLists: MatTableDataSource<any>;
  isManualBranch = true;
  branchId = JSON.parse(sessionStorage.getItem("branchId"))
  userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  headerData = {
    branchCode: "02",
    journeyId: "01",
    originUserType: "03",
    branchId: this.branchId,
    userId: this.userDetails.userId,
  } as any;
  activeDeviceCount = 0;
  totalBookings;
  pendingAssignment;
  pendingAction;
  getActiveDevices() {
    this.openBookingService.getActiveDevices().subscribe((resp: any) => {
      const response = resp.data.responseData;
      this.activeDeviceCount = response.activeDeviceCount
    }, (err) => {
      console.log(err);
      this.activeDeviceCount = 0;
    });
  }
  getDashboardStatus() {
    this.openBookingService.getDashboardStatus().subscribe((res: any) => {
      if (res) {
        this.totalBookings = res.data.responseData.assignedWayBills;
        this.pendingAssignment = res.data.responseData.unAssignedWayBills;
        this.pendingAction = res.data.responseData.openWayBills;
      }
      this.isUserDetail = true;

    }, (err: any) => {
      this.spinner.hide();
      this.isUserDetail = true;

    })
  }
  getBranchType() {
    const branchId = sessionStorage.getItem('branchId');
    this.$bookingInfo.branchMannualOrAuto(branchId, this.headerData).subscribe((response) => {
      if (response) {
        this.isManualBranch = true;
        if (response.responseData && response.responseData.length > 0) {
          response.responseData.forEach(elem => {
            if (elem == "AUTO WAYBILL") {
              this.isManualBranch = false;
            }
          })
        }
      }
    });
  }
  getAllBranch() {
    this.spinner.show();
    console.log('getAllBranch');
    this.$branch.getBranchDetails().subscribe((response) => {
      if (response) {
        this.branchList = response;
        if (this.branchList.length) {
          this.isPresentBranch = true;
        }

        if (this.branchList.length == 1) {
          // this.spinner.hide();
          console.log('this.branchlist', this.branchList);
          sessionStorage.setItem("branchId", this.branchList[0].branchId);
          sessionStorage.setItem("branchName", this.branchList[0].branchName);
          this.getDashboardStatus();
          this.getBranchType();
          this.getDayEndDate();
          this.getBookingSummary();
          this.getActiveStaffList();
          this.getActiveDevices();
          this.getDateRangeFromLookup();
          this.getAllLookups();
          this.getAllOfferings();

          // this.wayBill(this.storewayBill);
          // this.getDayEndDate();
          // this.getBranchType();
          // this.getActiveDevices();
          return;
        }
        else {
          this.openSearchBranchModal('Search Branch');
        }
      }
    }, err => {
      this.spinner.hide();
    });
  }
  getAddress(add) {
    // if (add.consignorAddress) {
    //   return add.consignorAddress;
    // }
    if (add.consignorId) {
      if (this.consignorList.length) {
        let addObj = this.consignorList.find(e => e.id == add.consignorId);
        if (addObj) {
          return `${addObj['addrBook'].addr1 ? addObj['addrBook'].addr1 : ''} ${addObj['addrBook'].addr2 ? addObj['addrBook'].addr2 : ''} ${addObj['addrBook'].addr3 ? addObj['addrBook'].addr3 : ''}`;
        }
      }
    } else {
      return `${add.consignorAddressLine1 ? add.consignorAddressLine1 : ''} ${add.consignorAddressLine2 ? add.consignorAddressLine2 : ''} ${add.consignorAddressLine3 ? add.consignorAddressLine3 : ''}`;
    }
    //
    // this.$bookingInfo.getConsignorConsigneeById(add.consignorId).subscribe
  }
  checkDayEndForPayemnt() {
    if (this.checkDayEndIsDoneByToday()) {
      return;
    }
    this.getEpaymentList();
    this.openBooking = true; this.saleDashboard = false; this.ePayment = true; this.dayEnd = false;
  }
  getEpaymentList() {
    console.log('getEpaymentList');
    this.spinner.show();

    const body = {
      "page": this.pageNumber,
      "pageSize": this.pageSize
    }
    this.openBookingService.getEpaymentList(body).subscribe((resp: any) => {
      console.log('resp', resp);
      let response = resp.data.responseData.paymentResponseList;
      response.sort((a, b) => b.pymtRefNum - a.pymtRefNum);
      console.log('response', response);
      this.ePayemntsList = new MatTableDataSource(response);
      this.length = resp.data.responseData.totalCount;
      this.spinner.hide();

    }, (err) => {
      console.log(err);
      this.spinner.hide();
    })
  }
  confirmPayment(element) {
    // console.log({element});
    this.spinner.show();
    const receiptNumber = element.pymtRefNum;
    this.openBookingService.getEpaymentStatusByRecieptNumber(receiptNumber).subscribe(
      (resp: any) => {
        //  ;
        // console.log({resp});
        const response = resp.data.responseData;
        // console.log({response});
        if (response) {
          Object.keys(element).forEach(key => {
            element[key] = response[key];
          });
          // console.log({element});
        }
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    )
  }
  downloadExcel() {
    // const id = 'my-booking-table';
    if (!this.ePayemntsList) return;
    let data = this.ePayemntsList.filteredData;
    console.log('data', data);
    data = data.map(el => {
      return [el.pymtRefNum, el.paymentWaybills.map(el => el.waybillNumber).join(','), this.datepipe.transform(el.createdDate, 'dd/MM/yyyy'), el.totalPaymentAmount, el.lkpPymtRecvdStatusId && el.lkpPymtRecvdStatusId !== 0 ? 'PAID' : 'PENDING', el.custName ? el.custName.toUpperCase() : '']
    });
    data = [['RECEIPT ID', 'WAYBILL NO.', 'REQ. RAISED DATE', 'AMOUNT', 'STATUS', 'CUSTOMER NAME'], ...data];
    console.log('data', data);
    const filename = `E_payments_${this.dateUtil.getFormatedDate('DD/MM/YYYY', this.fromDate)}_to_${this.dateUtil.getFormatedDate('DD/MM/YYYY', this.toDate)}.xlsx`
    this.exportService.exportexcel(filename, data);
  }
  futureDayEnd = false;
  getDayEndDate() {
    this.dayEndService.getDayEndDate().subscribe((res: any) => {
      // console.log('res getDayEndDate', res);
      if (res && res.data && res.data.responseData) {
        console.log('innnnnnnnnnnnnnn');
        this.previousDate = new Date(res.data.responseData.dayendDate);
        if (this.previousDate) {
          this.currentDate = this.dateUtil.getNextDate(this.previousDate);
        }
        const currentDate = new Date();
        if (this.currentDate.getTime() > currentDate.getTime()) {
          this.futureDayEnd = true;
        } else {
          this.futureDayEnd = false;
        }
        this.getDayEndStatus();
      } else {
        console.log('this.currentDate', this.currentDate);
        console.log('this.previousDate', this.previousDate);

        this.futureDayEnd = false;
        this.currentDate = new Date();
        this.previousDate = null;
        if (this.dayEnd) {
          this.getDayEndBookingList();
          this.getDayFinancialList();
          this.getMissingWaybillList();
        }
      }
    }, (err: any) => {
      console.log(err);
    })
  }
  bookingStatus = 0;
  finanicalStatus = 0;
  manualStatus = 0;
  getDayEndStatus() {
    const d = this.datepipe.transform(this.currentDate, "yyyy-MM-dd")
    this.dayEndService.getDayEndStatus(d).subscribe((res: any) => {
      console.log('res getDayEndStatus', res);
      if (res) {
        console.log('inside resssssssssssss')
        const data = res.data.responseData
        if (data) {
          if (data.bookingReconFlag) {
            this.bookingStatus = data.bookingReconFlag
          } else {
            this.bookingStatus = 0;
          }
          if (data.paymentReconFlag) {
            this.finanicalStatus = data.paymentReconFlag
          } else {
            this.finanicalStatus = 0;
          }
          if (data.wayblReconFlag) {
            this.manualStatus = data.wayblReconFlag
          } else {
            this.manualStatus = 0;
          }
        } else {
          this.bookingStatus = 0;
          this.finanicalStatus = 0;
          this.manualStatus = 0;
        }
        // const dd = new Date(res.data.responseData.dayendDate)
        // this.currentDate.setDate(dd.getDate() + 1);
        // const pd = new Date(this.currentDate);
        // this.previousDate.setDate(dd.getDate())
      } else {
        this.bookingStatus = 0;
        this.finanicalStatus = 0;
        this.manualStatus = 0;
      }
      if (this.dayEnd) {
        this.getDayEndBookingList();
        this.getDayFinancialList();
        this.getMissingWaybillList();
      }
    }, (err: any) => {
      this.bookingStatus = 0;
      this.finanicalStatus = 0;
      this.manualStatus = 0;
    })
  }
  msaCustIds = [];
  customerList = [];
  getDayEndBookingList() {
    this.spinner.show();
    const body = {
      bookingBranchId: +sessionStorage.getItem('branchId'),
      // dayendDate: '2021-02-04'
      dayendDate: this.currentDate
    }
    this.dayEndBookings = new MatTableDataSource([]);

    this.dayEndService.getDayEndBookingList(body).subscribe(
      async (resp: any) => {
        let cnorArray = [];
        for (let data of resp.data.responseData) {
          data['lkpBkgReconStatusId'] = 0
          this.msaCustIds.push(Number(data.msaCustId));
          if (data.consignorId) {
            if (!cnorArray.includes(data.consignorId)) {
              cnorArray.push(data.consignorId)
            }
          }
        }
        // console.log('resp.data.responseData', resp.data.responseData)

        if (cnorArray.length > 0) {
          try {
            this.consignorList = await this.commonService.getCnor_cneeList(cnorArray).toPromise();
          } catch (e) {
            this.consignorList = [];
            console.log("No data found");
            this.spinner.hide();
          }
        }

        this.dayEndBookings = new MatTableDataSource(resp.data.responseData);

        this.dayEndBookings.sort = this.sort;
        this.dayEndBookings.paginator = this.bookingReconPaginator;
        this.spinner.hide();
        // this.getCustomerList();
        // console.log('dayEndBookings', this.dayEndBookings)

      },
      (err) => {
        this.spinner.hide();
        this.dayEndBookings.data = [];
        this.dayEndBookings.sort = this.sort;
        this.dayEndBookings.paginator = this.bookingReconPaginator;
        this.changeDetection.detectChanges();
        console.log(err);
      }
    );
  }

  /**  Get Consignor address for day end data */
  getDayEndCnorAddr(ele) {

    if (!ele.consignorId) {
      return '';
    }

    if (this.consignorList.length) {
      let addObj = this.consignorList.find(e => e.id == ele.consignorId);
      if (addObj) {
        return `${addObj['addrBook'].addr1 ? addObj['addrBook'].addr1 : ''} ${addObj['addrBook'].addr2 ? addObj['addrBook'].addr2 : ''} ${addObj['addrBook'].addr3 ? addObj['addrBook'].addr3 : ''}`;
      }
    }

  }

  getCustomerList() {
    this.dayEndService.getCustomerNameList(this.msaCustIds).subscribe((res: any) => {
      console.log('getCustomerListttttttttttttttttttt', res);
      this.customerList = res.data.responseData;
    }, (err: any) => {

    })
  }
  custName(id: any) {
    if (!id) {
      return;
    }
    const nameData = this.consignorList.find((ref) => ref.id === id);
    // console.log('namedata',nameData)
    // console.log('id',id)

    let name = "";
    if (nameData) {
      name = nameData.name;
    }
    return name;
  }
  getDayFinancialList() {
    const body = {
      bookingBranchId: +sessionStorage.getItem('branchId'),
      // dayendDate: '2021-02-04'

      dayendDate: this.currentDate
    }
    this.spinner.show();
    this.dayEndService.getDayFinancialList(body).subscribe(
      (resp: any) => {
        this.spinner.hide();
        console.log('getDayEndBookingList', resp);
        for (let data of resp.data.responseData) {
          data["bookingWayblId"] = data.waybillId,
            data["lkpPaymentMethodId"] = data.paymentMethodLookupId,
            data["paymentAmount"] = data.gttlAmount,
            data["paymentReceivedFlag"] = 0
        }
        this.dayFinanceBookings = new MatTableDataSource(resp.data.responseData);
        this.dayFinanceBookings.paginator = this.finnanceInfoPaginator;

      },
      (err) => {
        this.spinner.hide();
        console.log(err);

        this.dayFinanceBookings.data = [];
        this.dayFinanceBookings.paginator = this.finnanceInfoPaginator;

        this.changeDetection.detectChanges();
      }
    );
  }

  getMissingWaybillList() {
    const body = {
      bookingBranchId: +sessionStorage.getItem('branchId'),
      // dayendDate: '2021-02-04'
      dayendDate: this.currentDate
    }
    this.spinner.show();
    this.dayEndService.getMissingWaybillList(body).subscribe(
      (resp: any) => {
        this.spinner.hide();
        this.missingWaybillLists = new MatTableDataSource(resp.data.responseData);
        this.missingWaybillLists.paginator = this.manualWaybillPaginator;
      },
      (err) => {
        this.spinner.hide();
        this.missingWaybillLists.data = [];
        this.missingWaybillLists.paginator = this.manualWaybillPaginator;
        this.changeDetection.detectChanges();
        console.log(err);
      }
    );
  }

  radioChange(event, element) {
    // console.log('event', event);
    // console.log('event.target', event.value);
    // console.log('element', element)
    element.lkpBkgReconStatusId = Number(event.value);
    // console.log('element', element)
    // console.log('data list', this.dayEndBookings)

  }
  changePaymentReceived(event, element) {
    console.log('event', event);
    element.paymentReceivedFlag = +event.value;
    console.log('data list', this.dayFinanceBookings)
  }
  onChangeFromDate(event: any) {
    console.log(event);
    this.fromDate = event.value;
    let fromDate = new Date(this.fromDate);
    const currentDate = new Date();
    console.log('currentDate', currentDate);
    console.log('this.dateRange', this.dateRange)
    fromDate = this.dateUtil.getDateafterDay(fromDate, this.dateRange);
    console.log('fromDate', fromDate);
    if (fromDate.getTime() > currentDate.getTime()) {
      console.log('inside');
      this.maxToDate = currentDate;
    } else {
      this.maxToDate = fromDate;
    }
  }
  onChangeToDate(event) {
    if (!this.fromDate) {
      this.toDate = null;
      // alert('Please select from date first');
      this.matSnackBar.open('Please select from date first', "", {
        duration: 3000,
        panelClass: ["text-white", "bg-red"],
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      return;
    }
    console.log(event);
    this.toDate = event.value;
  }
  onChangeSalesFromDate(event: any) {
    this.salesFromDate = event.value;
    let fromDate = new Date(this.fromDate);
    const currentDate = new Date();
    // console.log('currentDate', currentDate);
    // console.log('this.dateRange', this.dateRange)
    fromDate = this.dateUtil.getDateafterDay(fromDate, this.dateRange);
    // console.log('fromDate', fromDate);
    if (fromDate.getTime() > currentDate.getTime()) {
      // console.log('inside');
      this.maxToDate = currentDate;
    } else {
      this.maxToDate = fromDate;
    }
    if (this.salesToDate) {
      this.getSalesDashboradData();
    }
  }
  onChangeSalesToDate(event) {
    console.log('event 2', event);
    if (!this.salesFromDate) {
      this.salesToDate = null;
      // alert('Please select from date first');
      this.matSnackBar.open('Please select from date first', "", {
        duration: 3000,
        panelClass: ["text-white", "bg-red"],
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      return;
    }
    this.salesToDate = event.value;
    this.getSalesDashboradData();
  }
  checkFutureDayendOrActiveDeviceCount() {
    if (this.futureDayEnd) {
      this.matSnackBar.open('You can not day end of future date', "", {
        duration: 3000,
        panelClass: ["text-white", "bg-red"],
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      return true;
    }
    if (this, this.activeDeviceCount > 0) {
      this.matSnackBar.open('You can not day end because active devices count is not zero', "", {
        duration: 3000,
        panelClass: ["text-white", "bg-red"],
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      return true;
    }
    return false;
  }
  nextReconcilation() {
    if (this.checkFutureDayendOrActiveDeviceCount()) {
      return;
    }
    console.log('this.dayendbookings', this.dayEndBookings.filteredData)
    // if (this.dayEndBookings.filteredData && this.dayEndBookings.filteredData.length > 0) {
    this.spinner.show();
    const branchId = sessionStorage.getItem("branchId");
    let data = this.dayEndBookings.filteredData;
    data = data.map(el => {
      el.wayblApiWayblNum = el.wayBillNumber;
      return el;
    });
    const body = {
      bookingRecon: data,
      branchId: branchId,
      dayendDate: this.datepipe.transform(this.currentDate, 'yyyy-MM-dd')
    }
    console.log('bodyyyyy', body);
    this.dayEndService.submitReconcilation(body).subscribe((res: any) => {
      this.getDayFinancialList();
      // this.getDayEndDate();
      this.dayEndBookingTab = false;
      this.dayFinancialTab = true;
      this.dayEndMenualTab = false;
      this.dayEndcompleted = false;
      this.spinner.hide();
    }, (err: any) => {
      this.spinner.hide();
    });
  }
  nextInformation() {
    // if (this.dayFinanceBookings.filteredData && this.dayFinanceBookings.filteredData.length > 0) {
    if (this.checkFutureDayendOrActiveDeviceCount()) {
      return;
    }
    this.spinner.show();
    const branchId = sessionStorage.getItem("branchId");
    const body = {
      pymtRecon: this.dayFinanceBookings.filteredData,
      branchId: branchId,
      dayendDate: this.datepipe.transform(this.currentDate, 'yyyy-MM-dd')
    }
    console.log('bodyyyyy', body);
    this.dayEndService.submitInformation(body).subscribe((res: any) => {
      // this.getDayEndDate();
      if (this.isManualBranch) {
        this.dayEndBookingTab = false;
        this.dayFinancialTab = false;
        this.dayEndMenualTab = true;
        this.getMissingWaybillList();
      } else {
        this.submitWaybill();
      }
      console.log('this.dayEndMenualTab', this.dayEndMenualTab);
      console.log('this.manualStatus', this.manualStatus);
      // this.spinner.hide();
    }, (err: any) => {
      this.spinner.hide();
    })

  }
  submitWaybill() {
    // if (this.missingWaybillLists.filteredData && this.missingWaybillLists.filteredData.length > 0) {
    if (this.checkFutureDayendOrActiveDeviceCount()) {
      return;
    }
    this.spinner.show();
    const branchId = sessionStorage.getItem("branchId");
    //wayblNum
    let data = this.missingWaybillLists.filteredData;
    data = data.map(el => {
      el.wayblNum = el.wayBillNumber;
      return el;
    });
    const body = {
      wayblRecon: data ? data : [],
      branchId: branchId,
      dayendDate: this.datepipe.transform(this.currentDate, 'yyyy-MM-dd')
    }
    console.log('bodyyyyy', body);
    this.dayEndService.submitWayBill(body).subscribe((res: any) => {
      this.dayEndBookingTab = false;
      this.dayFinancialTab = false;
      this.dayEndMenualTab = false;
      this.dayEndcompleted = true;
      // for ressetng the data
      this.dayEndService.getDayEndDate().subscribe((res: any) => {
        console.log('res getDayEndDate', res);
        if (res && res.data && res.data.responseData) {
          this.previousDate = new Date(res.data.responseData.dayendDate);
          if (this.previousDate) {
            this.currentDate = this.dateUtil.getNextDate(this.previousDate);
          }
          const currentDate = new Date();
          if (this.currentDate.getTime() > currentDate.getTime()) {
            this.futureDayEnd = true;
          } else {
            this.futureDayEnd = false;
          }
          this.getDayEndBookingList();
          this.getDayFinancialList();
          this.getMissingWaybillList();
          this.getDayEndStatus();
          setTimeout(() => {
            this.dayEndBookingTab = true;
            this.dayEndcompleted = false;
          }, 1500);
        } else {
          this.futureDayEnd = false;
          console.log('something wronggggggggggg');
          this.getDayEndBookingList();
          this.getDayFinancialList();
          this.getMissingWaybillList();
          this.getDayEndStatus();
        }
        this.spinner.hide();
      }, (err: any) => {
        // this.futureDayEnd
        this.spinner.hide();
        this.getDayEndBookingList();
        this.getDayFinancialList();
        this.getMissingWaybillList();
        this.getDayEndStatus();
      })
    }, (err: any) => {
      this.spinner.hide();
      this.getDayEndBookingList();
      this.getDayFinancialList();
      this.getMissingWaybillList();
      this.getDayEndStatus();
    })
  }
  salesFromDate = new Date();
  salesToDate = new Date();
  getSalesDashboradData() {
    this.spinner.show();
    const d = new Date()
    this.daysDifference = '';
    // const previous = d.setDate(d.getDate() - 7)
    let userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
    const body = {
      fromDate: this.datepipe.transform(this.salesFromDate, 'yyyy-MM-dd'),
      toDate: this.datepipe.transform(this.salesToDate, 'yyyy-MM-dd'),
      userId: userDetails.userId.toUpperCase()
    }
    var dtDiff: any = 0;
    //moment.getDateDiff('{date2}','{date1}','y')
    var startDt = moment(this.salesFromDate, 'DD-MM-YYYY');
    var endDt = moment(this.salesToDate, 'DD-MM-YYYY');
    dtDiff = endDt.diff(startDt, 'days');
    dtDiff = +dtDiff + 1;
    this.daysDifference = dtDiff == 1 ? `${dtDiff} Day` : `${dtDiff} Days`;
    console.log('daysDiff', this.daysDifference)

    this.salesUsers = new MatTableDataSource([]);
    this.getSalesUsers(body);
    // this.getSalesBookingSummary(body);
    this.getOutstandingAmount(body);
    this.getSalesDashboard(body);

  }
  /**  Set Current Dates */
  setCurrentDate() {
    this.salesFromDate = new Date();
    this.salesToDate = new Date();
  }
  getSalesBookingSummary(body) {
    this.salesDashboardService.getSalesBookingSummary(body).subscribe(
      (resp: any) => {
        console.log('getSalesBookingSummary', resp);
        this.salesBookingSummary = resp.data.responseData;
      },
      (err) => {
        console.log(err);
      }
    );
  };
  totalSurface = 0;
  totalAir = 0;
  totalExpress = 0;
  getSalesDashboard(body) {
    this.salesDashboardService.getSalesDashboard(body).subscribe(
      (resp: any) => {
        this.saleDashboard = resp.data.responseData;
        if (this.saleDashboard) {
          this.getTotalValues();
        }
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }
  /** get Total Outstanding Amount */
  totalOutstandigAmount: any = 0;
  getOutstandingAmount(body) {
    this.totalOutstandigAmount = 0;
    this.salesDashboardService.getTotalOutstandingAmt(body).subscribe((res: any) => {
      this.totalOutstandigAmount = res.data.responseData;
    }, (error) => {
      this.totalOutstandigAmount = 0;
      this.spinner.hide();
    });
  }

  credit = 0;
  toPay = 0;
  paid = 0;
  getTotalValues() {
    this.credit = 0;
    this.toPay = 0;
    this.paid = 0;
    this.totalSurface = 0;
    this.totalAir = 0;
    this.totalExpress = 0;
    for (let sales of this.saleDashboard.salesByMop) {
      if (this.refType(sales.branchMopId) === 'CREDIT') {
        this.credit = sales.totalAmount
      } else if (this.refType(sales.branchMopId) === 'TO-PAY') {
        this.toPay = sales.totalAmount
      } else if (this.refType(sales.branchMopId) === 'PAID') {
        this.paid = sales.totalAmount
      }
      for (let offer of sales.salesByOffering) {
        if (this.refOffer(offer.offeringId) === 'SURFACE') {
          this.totalSurface = this.totalSurface + offer.totalAmount
        } else if (this.refOffer(offer.offeringId) === 'AIR') {
          this.totalAir = this.totalAir + offer.totalAmount
        } else if (this.refOffer(offer.offeringId) === 'EXPRESS') {
          this.totalExpress = this.totalExpress + offer.totalAmount
        }
      }
    }
    // console.log('credit: ',this.credit,'toPay: ',this.toPay,'Paid: ',this.paid);
    // console.log('surface: ',this.totalSurface,'Air: ',this.totalAir, 'Express: ',this.totalExpress)
    this.setPieChartValues();
  }
  setPieChartValues() {
    this.doughnutChartLabels = [`Credit : ${this.credit}`, `To Pay : ${this.toPay}`, `Paid : ${this.paid}`];
    this.doughnutChartData = [
      [this.credit, this.toPay, this.paid],
    ];
  }
  getSalesUsers(body) {
    // delete body.userId;
    // body = {
    //   "fromDate": "2021-01-04",
    //   "toDate": "2021-01-06"
    // }
    this.salesDashboardService.getSalesUsers(body).subscribe(
      (resp: any) => {
        this.salesUsers = new MatTableDataSource(resp.data.responseData);
        this.salesUsers.paginator = this.paginator;
        // this.spinner.hide();
      },
      (err) => {
        console.log(err);
        // this.spinner.hide();
      }
    );
  }
  bookingSummary: any = [];
  getBookingSummary() {
    this.salesDashboardService.getBookingSummary().subscribe((res: any) => {
      console.log('getBookingSummaryyyyyyyyyyyyyyyyyy', res);
      this.bookingSummary = res.data.responseData;
    }, (err: any) => {
      console.log(err);
    })
  }
  getPickUpName(id) {
    // console.log('this.staffffffidddddddddddddd', this.staffList, id);
    if (!id) {
      return;
    }
    const nameData = this.staffList.filter((ref) => ref.id === Number(id));

    let name = "";
    if (nameData[0]) {
      name = nameData[0].staffFname;
      if (nameData[0].staffMname && nameData[0].staffMname !== 'undefined') {
        name = name + ' ' + nameData[0].staffMname
      }
      if (nameData[0].staffLname && nameData[0].staffLname !== 'undefined') {
        name = name + ' ' + nameData[0].staffLname
      }
    }
    // console.log('name', name);
    return name;
  }


  onPagechange(event: any) {
    console.log(event);
    this.pageEvent = event;
    this.pageNumber = this.pageEvent.pageIndex;
    this.pageSize = this.pageEvent.pageSize;
    if (this.ePayment) {
      this.getEpaymentList();
    }
  }
  openSearchBranchModal(text) {
    sessionStorage.getItem('branchId');
    this.textDisable = true;
    this.spinner.show();
    let dataObj = {
      'textName': text,
      'branches': this.branchList
    }
    const ref = this.dialog.open(SearchBranchComponent, {
      width: '50vw',
      panelClass: 'mat-dialog-responsive',
      disableClose: true,
      data: dataObj
    });
    ref.afterClosed().subscribe((data) => {
      console.log('data', data);
      //this.dataaourceWaybillRebookin = undefined;
      this.dataaourceWaybillRebookin = new MatTableDataSource([]);
      this.branchName = sessionStorage.getItem('branchName');
      this.headerData.branchId = JSON.stringify(sessionStorage.getItem('branchId'))
      if (this.permission.waybillApi.length) {
        // this.getDayEndDate();
        this.getActiveDevices();
        this.getDateRangeFromLookup();
      }
      this.getBranchType();
      this.getDashboardStatus();
      this.getAllLookups();
      this.getAllOfferings();
      this.getActiveStaffList();
      this.getDayEndDate();

      if (!this.openBooking) {
        this.wayBill('wayBill')
      }
      if (this.saleDashboard) {
        this.getSalesDashboradData(); this.getBookingSummary();
      }
      if (this.ePayment) {
        this.getEpaymentList();
      }
    });
    this.textDisable = false

  }
  allLookUps = [];
  bookingUserTypes = [];
  getAllLookups() {
    this.commonService.getAllLookups().subscribe((res: any) => {
      console.log('res getalllookups', res);
      this.allLookUps = res;
      this.bookingUserTypes = this.allLookUps.filter(x => x.lookupTypeVal == 'BOOKING-USER-CTGY');
    }, (err: any) => {

    })
  }
  allOfferings = [];
  getAllOfferings() {
    this.commonService.getAllOfferings().subscribe((res: any) => {
      console.log('res getAllOfferings', res);
      this.allOfferings = res;
    }, (err: any) => {

    })
  }
  refOffer(id: any) {
    if (!id) {
      return;
    }
    const nameData = this.allOfferings.filter((ref) => ref.id === id);
    // console.log('namedata',nameData)
    // console.log('id',id)

    let name = "";
    if (nameData[0]) {
      name = nameData[0].serviceOffering;
    }
    return name;
  }
  offeringValues(mop) {
    let surface = '0';
    let air = '0';
    // console.log('mopppppppp', mop);
    for (let offer of mop.waybillsByOffering) {
      if (this.refOffer(offer.offeringId) === 'SURFACE') {
        surface = offer.totalWaybills
      }
      if (this.refOffer(offer.offeringId) === 'AIR') {
        air = offer.totalWaybills
      }
    }
    return `${mop.totalWaybills} - ${surface}/${air}`
  }
  refType(id: any) {
    if (!id) {
      return;
    }
    const nameData = this.allLookUps.find((ref) => ref.id === id);
    //console.log('namedata',nameData)
    // console.log('id',id)

    let name = "";
    if (nameData) {
      name = nameData.lookupVal;
    }
    return name;
  }

  getAssignedBookingCount(id: any) {
    if (!id) {
      return;
    }
    const nameData = this.bookingSummary.filter((ref) => ref.userId === id);
    let name = "0";
    if (nameData[0]) {
      name = nameData[0].assignedBookingCount;
    }
    return name;
  }

  getOpenBookingCount(id: any) {
    if (!id) {
      return;
    }
    const nameData = this.bookingSummary.filter((ref) => ref.userId === id);
    let name = 0;
    if (nameData[0]) {
      name = (+nameData[0].assignedBookingCount - (+nameData[0].openBookingCount));
    }
    return name;
  }

  bookingFlag: any = 1;
  removeWaybillId() {
    sessionStorage.removeItem('waybillId');
    // sessionStorage.setItem('lastDayEndDate', this.previousDate.toDateString());
    AppSetting.bookingFlag = this.bookingFlag;
  }
  openSwitchBranchModal() {
    this.dialog.open(SwitchBranchComponent, {
      width: '50vw',
      panelClass: 'mat-dialog-responsive',
    });
  }


  openTataAerocityModal(waybilRequest: any) {
    if (this.checkDayEndIsDone()) {
      return;
    }
    if (this.checkDayEndIsDoneByToday()) {
      return;
    }
    // console.log(elemnt)
    if (this.wayBillchange) {
      console.log('WaybillDetailsComponent');
      const dialog = this.dialog.open(WaybillDetailsComponent, {
        width: '50vw',
        panelClass: 'mat-dialog-responsive',
        data: { waybilRequest, type: this.storewayBill }
      });
      dialog.afterClosed().subscribe((resp) => {
        console.log('resp', resp);
        this.wayBill('wayBill');
      });
    } else {
      console.log('OpenBookingComponent');

      const dialog = this.dialog.open(OpenBookingComponent, {
        width: '50vw',
        panelClass: 'mat-dialog-responsive',
        data: { waybilRequest, type: this.storewayBill }
      });
      dialog.afterClosed().subscribe((response) => {
        console.log('response', response)
        this.wayBill('preBook');
        if (response) {
          if (response.action) {
            if (response.action === 'cancel') {
              var dialog = this.dialog.open(CancelBookingComponent, {
                width: '30vw',
                panelClass: 'mat-dialog-responsive',
                data: { waybilRequestDetail: response.data }
              });
              dialog.afterClosed().subscribe((res: any) => {
                if (res === 'success') {
                  this.dataaourceWaybillRebookin = new MatTableDataSource([]);
                  this.wayBill('preBook');
                }
              })
            }
          }
        }
      })
    }
  }

  openDayEndDetail(waybilRequest: any) {

    console.log('dayEnd', this.dayEnd);
    let data = {}
    if (this.dayEnd) {
      data = { waybilRequest, type: 'dayend' }
    } else {
      data = { waybilRequest, type: this.storewayBill }
    }
    this.dialog.open(OpenBookingComponent, {
      width: '40vw',
      panelClass: 'mat-dialog-responsive',
      data: data
    });
  }

  checkDayEndIsDone() {
    if (this.previousDate) {
      if (this.dateUtil.checkDateBeforeYesterday(this.previousDate)) {
        this.matSnackBar.open('Day end has not been done, can not progress for this booking. Please complete dayend', '', {
          duration: 6000,
          panelClass: ["text-white", "bg-red"],
          horizontalPosition: "right",
          verticalPosition: "top",
        })
        return true;;
      }
    }

    return false;
  }
  checkDayEndIsDoneByToday() {
    if (this.previousDate && this.dateUtil.checkDateIsToday(this.previousDate)) {
      // console.log('inmmmm');
      this.matSnackBar.open('Day end has done, can not progress', '', {
        duration: 4000,
        panelClass: ["text-white", "bg-red"],
        horizontalPosition: "right",
        verticalPosition: "top",
      })
      return true;;
    }
    return false;
  }
  navigateToRoute(routes) {
    console.log('routes', routes);
    const isDayendDone = this.checkDayEndIsDoneByToday();
    console.log('isDayendDone', isDayendDone);
    if (isDayendDone) {
      return;
    }
    this.router.navigateByUrl(routes);
    // [routerLink]="['/bookings-web-booking/manifest-creation']"
  }



  openSelectWaybillModal(waybilRequest: any) {
    console.log(waybilRequest, 'waybilRequest')
    let rqstId = waybilRequest.preBookingRequestId;
    if (this.previousDate) {
      if (this.checkDayEndIsDone()) {
        return;
      }
      if (this.checkDayEndIsDoneByToday()) {
        return;
      }
    }
    if (rqstId == undefined) {
      const dialogRef = this.dialog.open(SelectWaybillComponent, {
        width: '50vw', maxHeight: '60rem',
        panelClass: 'mat-dialog-responsive',
        data: { waybilRequest: waybilRequest, staffList: this.staffList }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result, 'result');
      });
    } else {
      this.bookingUserTypes = this.allLookUps.filter(x => x.lookupTypeVal == 'BOOKING-USER-CTGY');
      let assocObj = this.bookingUserTypes.find(x => x.lookupVal == 'ASSOCIATE');
      console.log('assocObj', assocObj);
      if (assocObj) {
        const body = {
          "bookingReqId": rqstId,
          "pickupUserId": JSON.parse(sessionStorage.getItem('userDetails')).userId,
          "lkpPickupUserTypeId": assocObj.id,
        }
        console.log('body', body);
        this.spinner.show();
        this.openBookingService.assignBooking(body).subscribe(
          (resp) => {
            this.spinner.hide();
            this.afterInitiateRequest(waybilRequest)

          }, (err) => {
            this.spinner.hide();
          });

      } else {
        this.bookingUserTypes = this.allLookUps.filter(x => x.lookupTypeVal == 'BOOKING-USER-CTGY');
        let assocObj = this.bookingUserTypes.find(x => x.lookupVal == 'ASSOCIATE');
        console.log('assocObj', assocObj);
        if (assocObj) {
          const body = {
            "bookingReqId": rqstId,
            "pickupUserId": JSON.parse(sessionStorage.getItem('userDetails')).userId,
            "lkpPickupUserTypeId": assocObj.id,
          }
          console.log('body', body);
          this.spinner.show();
          this.openBookingService.assignBooking(body).subscribe(
            (resp) => {
              this.spinner.hide();
              // this.appComp.showMessage(resp['message'],'success');
              this.afterInitiateRequest(waybilRequest)
            },
            (err) => {
              console.log(err);
              this.spinner.hide();
            });

        }
      }

    }


  }

  /**  After Initiate Request */
  afterInitiateRequest(waybilRequest) {
    setTimeout(() => {
      console.log('this.storewayBill', this.storewayBill)
      if (this.storewayBill == 'wayBill') {
        this.dialog.open(SelectWaybillComponent, {
          width: '60vw',
          panelClass: 'mat-dialog-responsive',
          data: { waybilRequest }
        });
      } else {
        if (this.previousDate) {
          sessionStorage.setItem('lastDayEndDate', this.previousDate.toDateString());
        }
        AppSetting.bookingFlag = this.bookingFlag;
        sessionStorage.setItem('bookingReqId', waybilRequest.preBookingRequestId);
        this.router.navigate(['/bookings-web-booking/prebooking-waybill']);

      }
    }, 1500);
  }

  openAssignBookingModal(preBooking: any) {
    console.log('preBooking', preBooking);
    this.bookingUserTypes = [];
    this.bookingUserTypes = this.allLookUps.filter(x => x.lookupTypeVal == 'BOOKING-USER-CTGY');

    if (this.checkDayEndIsDone()) {
      return;
    }
    if (this.checkDayEndIsDoneByToday()) {
      return;
    }
    const dialogRef = this.dialog.open(AssignBookingComponent, {
      width: '40vw', maxHeight: '60rem',
      panelClass: 'mat-dialog-responsive',
      data: { preBooking, type: this.storewayBill, bookingUserTypes: this.bookingUserTypes }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result, 'result');
      this.wayBill('preBook');
      this.getActiveStaffList();
    });
  }

  openCreateNewRequestModal() {
    const dialogRef = this.dialog.open(CreateNewRequestComponent, {
      width: '50vw',
      panelClass: 'mat-dialog-responsive',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (this.fromDate && this.toDate) {
        this.getEpaymentList();
      }
    });
  }

  openTrackWaybillModal() {
    this.dialog.open(TrackWaybillComponent, {
      width: '70vw',
      panelClass: 'mat-dialog-responsive',
    });
  }


  // OPEN BOOKING TABLE
  displayedColumns: string[] = ['request', 'waybill', 'pick', 'booking', 'destination', 'sfx', 'customer', 'assignBtn', 'laying'];
  dataSource = ELEMENT_DATA;



  wayBillchange: boolean = true;
  storewayBill: string = 'wayBill'
  wayBill(value) {
    sessionStorage.removeItem('fromScreen');
    this.storewayBill = value;
    this.count = 0;
    console.log('within waybill API lookups', this.allLookUps)
    this.bookingUserTypes = this.allLookUps.filter(x => x.lookupTypeVal == 'BOOKING-USER-CTGY');
    if (this.storewayBill == 'wayBill') {
      this.displayedWaybillColumns = ['request', 'waybill', 'pick', 'booking', 'destination', 'sfx', 'customer', 'laying'];
      this.wayBillchange = true;
      this.reBookingRequests = [];
      this.waybilApiRequests = [];
      // if branch is selectd
      if (sessionStorage.getItem('branchId')) {
        this.dataaourceWaybillRebookin = new MatTableDataSource([]);
        this.getWaybilApiRequest();
      }
    } else if (this.storewayBill == 'preBook') {
      this.displayedWaybillColumns = ['request', 'waybill', 'pick', 'booking', 'destination', 'sfx', 'customer', 'assignTo', 'assignBtn', 'laying'];
      this.wayBillchange = false;
      this.reBookingRequests = [];
      this.waybilApiRequests = [];
      this.dataaourceWaybillRebookin = new MatTableDataSource([]);
      this.getPreBookingRequest();

    }
    // console.log()
  }
  applyFilter(filterValue) {

    if (this.dayEndBookingTab) {
      this.dayEndBookings.filter = filterValue.trim().toLowerCase();
    }
    if (this.dayFinancialTab) {
      this.dayFinanceBookings.filter = filterValue.trim().toLowerCase();
    }
    if (this.dayEndMenualTab) {
      this.missingWaybillLists.filter = filterValue.trim().toLowerCase();
    }
    if (this.ePayment) {
      this.ePayemntsList.filter = filterValue.trim().toLowerCase();
    }
  }
  searchBooking(filterValue) {
    if (this.dataaourceWaybillRebookin) {
      this.dataaourceWaybillRebookin.filter = filterValue.trim().toLowerCase();
    }
  }
  dateRange;
  getDateRangeFromLookup() {
    console.log('getDateRangeFromLookup')
    this.commonService.getLookUpByType('SEARCH_DATE_RANGE').subscribe((res: any) => {
      console.log('getDateRangeFromLookupgetDateRangeFromLookup', res);
      if (res.length) {
        this.dateRange = +res[0].lookupVal;
        sessionStorage.setItem('dateRange', this.dateRange);
      } else {
        this.dateRange = 0;
      }
      this.wayBill(this.storewayBill);
      const today = new Date();
      const fromDate = new Date();
      fromDate.setDate(today.getDate() - this.dateRange);
      // this.fromDate = fromDate;
    }, (err: any) => {

    })
  }
  consignorList = [];
  getWaybilApiRequest() {
    this.consignorList = [];
    this.spinner.show();

    const today = new Date();

    const body = {
      "branchId": +sessionStorage.getItem('branchId'),
      "fromDate": this.datepipe.transform(today, 'yyyy-MM-dd'),
      "toDate": this.datepipe.transform(today, 'yyyy-MM-dd'),
    }

    this.openBookingService.getWaybilApiRequest(body, true).subscribe(
      async (resp: any) => {
        this.waybilApiRequests = resp.data.responseData;
        console.log(this.waybilApiRequests, 'this.waybilApiRequests')
        this.count = this.waybilApiRequests.length;
        let consignorArr = [];
        this.waybilApiRequests.forEach(x => {
          if (x.consignorId) {
            if (!consignorArr.includes(x.consignorId)) {
              consignorArr.push(x.consignorId);
            }
          }
        })
        if (consignorArr.length > 0) {
          try {
            this.consignorList = await this.commonService.getCnor_cneeList(consignorArr).toPromise();

          } catch (e) {
            console.log("No data found");
            this.consignorList = [];
          }
        }

        this.dataaourceWaybillRebookin = new MatTableDataSource(this.waybilApiRequests);
        this.dataaourceWaybillRebookin.paginator = this.WayBillPreBookPaginator;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.count = 0;
        this.dataaourceWaybillRebookin = new MatTableDataSource([]);
        console.log(err);
      }
    );
  }

  profileDataList = [];

  getPreBookingRequest() {
    this.spinner.show();
    this.consignorList = [];
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'))

    const userId = +userDetails.userId.match(/\d/g)[0];

    const today = new Date();

    const body = {
      "branchId": +sessionStorage.getItem('branchId'),
      "fromDate": this.datepipe.transform(today, 'yyyy-MM-dd'),
      "toDate": this.datepipe.transform(today, 'yyyy-MM-dd'),
    }
    this.openBookingService.getPreBookingRequest(body, true).subscribe(
      async (resp: any) => {
        this.reBookingRequests = resp.data.responseData;
        console.log(this.reBookingRequests, 'this.reBookingRequests')
        let consignorArr = [];
        let profileIds = [];
        this.reBookingRequests.forEach(x => {
          if (x.pickUpFromTime && (x.pickUpFromTime.split(":").length === 3)) {
            x.pickUpFromTime = this.dateUtil.getFormatedTime('hh:mm A', x.pickUpFromTime);
          }
          if (x.consignorId) {
            if (!consignorArr.includes(x.consignorId)) {
              consignorArr.push(x.consignorId);
            }
          }

          let typeVal = this.getPickupType(x);

          if (typeVal) {
            if (typeVal == 'ASSOCIATE' || typeVal == 'EMPLOYEE') {
              if (!profileIds.includes(x.pickupUserId)) {
                profileIds.push(x.pickupUserId);
              }
            }
          }

        })
        if (consignorArr.length > 0) {
          try {
            this.consignorList = await this.commonService.getCnor_cneeList(consignorArr).toPromise();
          } catch (e) {
            console.log("No data found");
            this.consignorList = [];
          }
        }
        if (profileIds.length > 0) {
          try {
            this.profileDataList = await this.commonService.getUserProfileData(profileIds).toPromise();
          } catch (e) {
            this.profileDataList = [];
          }
        }

        this.count = this.reBookingRequests.length;
        this.dataaourceWaybillRebookin = new MatTableDataSource(this.reBookingRequests);
        this.dataaourceWaybillRebookin.paginator = this.WayBillPreBookPaginator;
        const sortState: Sort = { active: 'preBookingRequestId', direction: 'desc' };

        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
        this.dataaourceWaybillRebookin.sort = this.sort;
        this.spinner.hide();

      },
      (err) => {
        this.spinner.hide();
        this.dataaourceWaybillRebookin = new MatTableDataSource([]);
        console.log(err);
      }
    );
  }

  /**   Get Consignor Mobile number for Waybill and Prebooking data */
  getCnorMobileNum(element) {
    // let Obj = this.allLookUps.find(e => e.id === element.customerTypeLkpId);
    // if (Obj) {
    //   if ((Obj.lookupVal).toUpperCase().includes('CREDIT+RETAIL')) {
    //     return element.consignorContactNumber;
    //   } else {
    // if (this.consignorList.length) {
    //   let cnorObj = this.consignorList.find(c => c.id == element.consignorId);
    //   if (cnorObj) {
    //     return cnorObj.mob ? cnorObj.mob : element.consignorContactNumber;
    //   } else {
    //     return '';
    //   }
    // }

    //   }
    // }
    let returnval = '';
    if (element.custTypeLookupId || element.customerTypeLkpId) {

      if (this.consignorList.length > 0) {
        let obj = this.allLookUps.find(e => e.id === element.custTypeLookupId);
        if (obj && element.consignorId) {
          if ((obj.lookupVal).toUpperCase().includes('RETAIL') || (obj.lookupVal).toUpperCase().includes('CREDIT+RETAIL')) {
            let cnor = this.consignorList.find(x => x.id == element.consignorId);
            if (cnor) {
              console.log('this block called')
              returnval = cnor.mob;
            }
          }
        } else {
          returnval = element.consignorContactNumber ? element.consignorContactNumber : '';
        }
      }else{
        returnval = element.consignorContactNumber ? element.consignorContactNumber : '';
      }
      return returnval;
    }else{
      if (this.consignorList.length > 0){
        // let obj = this.allLookUps.find(e => e.id === element.custTypeLookupId);
        if (element.consignorId) {
          let cnor = this.consignorList.find(x => x.id == element.consignorId);
            if (cnor) {
              returnval = cnor.mob;
          }
        }else{
          returnval = element.consignorContactNumber;
        }
      }
      return returnval;
    }



  }
  getCustmName(element) {

    let Obj = this.allLookUps.find(e => e.id === element.customerTypeLkpId);
    if (Obj) {
      if ((Obj.lookupVal).toUpperCase().includes('RETAIL') || (Obj.lookupVal).toUpperCase().includes('CREDIT+RETAIL')) {
        return element.consignorName;
      } else {
        return element.msaName;
      }
    } else {
      return element.msaName;
    }

  }

  /**  Get Pickup Lookup Type  */
  getPickupType(element) {
    if (!element.lkpPickupUserTypeId) {
      return;
    }
    let lookup = '';
    let typeObj = this.bookingUserTypes.find(x => x.id == element.lkpPickupUserTypeId)

    if (typeObj) {
      lookup = typeObj.lookupVal;
    }

    return lookup;
  }

  getAssignedPickupUserName(element) {
    if (!element.pickupUserId) {
      return;
    }

    let pickupType = this.getPickupType(element);
    let returnVal = ''
    if (pickupType) {
      if (pickupType == 'ASSOCIATE' || pickupType == 'EMPLOYEE') {

        let profObj = this.profileDataList.find(p => p.userId == (element.pickupUserId).toUpperCase())

        if (profObj) {
          returnVal = profObj.name
        } else {
          returnVal = '';
        }
      }
      if (pickupType == 'PICKUP-PERSON') {
        returnVal = this.getPickUpName(element.pickupUserId);
      }
    } else {
      returnVal = element.pickupUserId;
    }
    return returnVal;

  }


  /*--  On search User  --*/
  onSearchUserData(value) {
    this.salesUsers.filter = value.trim().toUpperCase();
  }

  // SALE DASHBOARD TABLE
  displayedColumns2: string[] = ['request', 'waybill', 'pick', 'booking', 'destination', 'sfx'];
  dataSource2 = ELEMENT_DATA_2;

  // E-PAYMENT DASHBOARD TABLE
  displayedColumns3: string[] = ['request', 'waybill', 'reqRaisedDate', 'pick', 'booking', 'confirm'];
  dataSource3 = ELEMENT_DATA_3;

  // DAY END TABLE
  displayedColumns4: string[] = ['request', 'waybill', 'pick', 'booking', 'destination', 'sfx', 'customer'];
  dataSource4 = ELEMENT_DATA_4;

  // DAY END TABLE
  displayedColumns5: string[] = ['request', 'waybill', 'pick', 'booking'];
  dataSource5 = ELEMENT_DATA_5;

  // DAY END TABLE
  displayedColumns6: string[] = ['request', 'waybill'];
  dataSource6 = ELEMENT_DATA_6;

}

// OPEN BOOKING TABLE
export interface PeriodicElement {
  request: string;
  waybill: string;
  pick: string;
  booking: string;
  destination: string;
  sfx: string;
  customer: string;
  assignTo: string;
  assignBtn: string;
  laying: string;
}

// SALE DASHBOARD TABLE
export interface PeriodicElement2 {
  request: string;
  waybill: string;
  pick: string;
  pick2: string;
  booking: string;
  booking2: string;
  destination: string;
  destination2: string;
  sfx: string;
  sfx1: string;
}

// E-PAYMENT DASHBOARD TABLE
export interface PeriodicElement3 {
  request: string;
  waybill: string;
  pick: string;
  booking: string;
}

// DAY END DASHBOARD TABLE
export interface PeriodicElement4 {
  request: string;
  waybill: string;
  pick: string;
  booking: string;
  destination: string;
  sfx: string;
  customer: string;
}

// DAY END DASHBOARD TABLE
export interface PeriodicElement5 {
  request: string;
  waybill: string;
  pick: string;
  booking: string;
}

// DAY END DASHBOARD TABLE
export interface PeriodicElement6 {
  request: string;
  waybill: string;
}

// OPEN BOOKING TABLE
const ELEMENT_DATA: PeriodicElement[] = [
  { request: 'TATA AEROCITY', waybill: 'OUTBOUND', pick: 'SFX0012', booking: '9876543210', destination: '01/10/2019', sfx: '12:30 PM', customer: 'NOT AVAILABLE', assignTo: 'NOT AVAILABLE', assignBtn: '', laying: '' },
  { request: 'TATA AEROCITY', waybill: 'OUTBOUND', pick: 'SFX0012', booking: '9876543210', destination: '01/10/2019', sfx: '12:30 PM', customer: 'NOT AVAILABLE', assignTo: 'NOT AVAILABLE', assignBtn: '', laying: '' },
  { request: 'TATA AEROCITY', waybill: 'OUTBOUND', pick: 'SFX0012', booking: '9876543210', destination: '01/10/2019', sfx: '12:30 PM', customer: 'NOT AVAILABLE', assignTo: 'NOT AVAILABLE', assignBtn: '', laying: '' },
  { request: 'TATA AEROCITY', waybill: 'OUTBOUND', pick: 'SFX0012', booking: '9876543210', destination: '01/10/2019', sfx: '12:30 PM', customer: 'NOT AVAILABLE', assignTo: 'NOT AVAILABLE', assignBtn: '', laying: '' },
  { request: 'TATA AEROCITY', waybill: 'OUTBOUND', pick: 'SFX0012', booking: '9876543210', destination: '01/10/2019', sfx: '12:30 PM', customer: 'NOT AVAILABLE', assignTo: 'NOT AVAILABLE', assignBtn: '', laying: '' },
  { request: 'TATA AEROCITY', waybill: 'OUTBOUND', pick: 'SFX0012', booking: '9876543210', destination: '01/10/2019', sfx: '12:30 PM', customer: 'NOT AVAILABLE', assignTo: 'NOT AVAILABLE', assignBtn: '', laying: '' },
  { request: 'TATA AEROCITY', waybill: 'OUTBOUND', pick: 'SFX0012', booking: '9876543210', destination: '01/10/2019', sfx: '12:30 PM', customer: 'NOT AVAILABLE', assignTo: 'NOT AVAILABLE', assignBtn: '', laying: '' },
  { request: 'TATA AEROCITY', waybill: 'OUTBOUND', pick: 'SFX0012', booking: '9876543210', destination: '01/10/2019', sfx: '12:30 PM', customer: 'NOT AVAILABLE', assignTo: 'NOT AVAILABLE', assignBtn: '', laying: '' },
];

// SALE DASHBOARD TABLE
const ELEMENT_DATA_2: PeriodicElement2[] = [
  { request: 'RISHAB SHARMA', waybill: '225', pick: '100 -', pick2: '50/50', booking: '100 -', booking2: '50/50', destination: '45 -', destination2: '40/05', sfx: '10', sfx1: '15' },
  { request: 'RISHAB SHARMA', waybill: '225', pick: '100 -', pick2: '50/50', booking: '100 -', booking2: '50/50', destination: '45 -', destination2: '40/05', sfx: '10', sfx1: '15' },
  { request: 'RISHAB SHARMA', waybill: '225', pick: '100 -', pick2: '50/50', booking: '100 -', booking2: '50/50', destination: '45 -', destination2: '40/05', sfx: '10', sfx1: '15' },
  { request: 'RISHAB SHARMA', waybill: '225', pick: '100 -', pick2: '50/50', booking: '100 -', booking2: '50/50', destination: '45 -', destination2: '40/05', sfx: '10', sfx1: '15' },
];

// E-PAYMENT DASHBOARD TABLE
const ELEMENT_DATA_3: PeriodicElement3[] = [
  { request: '11245641', waybill: '69123455', pick: '29080', booking: 'PAID' },
  { request: '11245641', waybill: '69123455', pick: '29080', booking: 'PAID' },
  { request: '11245641', waybill: '69123455', pick: '29080', booking: 'PENDING' },
  { request: '11245641', waybill: '69123455', pick: '29080', booking: 'PENDING' },
  { request: '11245641', waybill: '69123455', pick: '29080', booking: 'PENDING' },
  { request: '11245641', waybill: '69123455', pick: '29080', booking: 'PENDING' },
  { request: '11245641', waybill: '69123455', pick: '29080', booking: 'PENDING' },
  { request: '11245641', waybill: '69123455', pick: '29080', booking: 'PENDING' },
  { request: '11245641', waybill: '69123455', pick: '29080', booking: 'PENDING' },
];

// DAY END DASHBOARD TABLE
const ELEMENT_DATA_4: PeriodicElement4[] = [
  { request: '28830029', waybill: 'TATA AEROCITY', pick: 'CREATED', booking: '10/10/2019', destination: '12:30 PM', sfx: 'NOT AVAILABLE', customer: '' },
  { request: '28830029', waybill: 'TATA AEROCITY', pick: 'CREATED', booking: '10/10/2019', destination: '12:30 PM', sfx: 'NOT AVAILABLE', customer: '' },
  { request: '28830029', waybill: 'TATA AEROCITY', pick: 'CREATED', booking: '10/10/2019', destination: '12:30 PM', sfx: 'NOT AVAILABLE', customer: '' },
  { request: '28830029', waybill: 'TATA AEROCITY', pick: 'CREATED', booking: '10/10/2019', destination: '12:30 PM', sfx: 'NOT AVAILABLE', customer: '' },
  { request: '28830029', waybill: 'TATA AEROCITY', pick: 'CREATED', booking: '10/10/2019', destination: '12:30 PM', sfx: 'NOT AVAILABLE', customer: '' },
  { request: '28830029', waybill: 'TATA AEROCITY', pick: 'CREATED', booking: '10/10/2019', destination: '12:30 PM', sfx: 'NOT AVAILABLE', customer: '' },
  { request: '28830029', waybill: 'TATA AEROCITY', pick: 'CREATED', booking: '10/10/2019', destination: '12:30 PM', sfx: 'NOT AVAILABLE', customer: '' },
  { request: '28830029', waybill: 'TATA AEROCITY', pick: 'CREATED', booking: '10/10/2019', destination: '12:30 PM', sfx: 'NOT AVAILABLE', customer: '' },
  { request: '28830029', waybill: 'TATA AEROCITY', pick: 'CREATED', booking: '10/10/2019', destination: '12:30 PM', sfx: 'NOT AVAILABLE', customer: '' },
];

// DAY END DASHBOARD TABLE
const ELEMENT_DATA_5: PeriodicElement5[] = [
  { request: 'WB001001', waybill: '10,000', pick: 'CASH', booking: '' },
  { request: 'WB001001', waybill: '10,000', pick: 'CASH', booking: '' },
  { request: 'WB001001', waybill: '10,000', pick: 'CASH', booking: '' },
  { request: 'WB001001', waybill: '10,000', pick: 'CASH', booking: '' },
  { request: 'WB001001', waybill: '10,000', pick: 'CASH', booking: '' },
  { request: 'WB001001', waybill: '10,000', pick: 'CASH', booking: '' },
  { request: 'WB001001', waybill: '10,000', pick: 'CASH', booking: '' },
  { request: 'WB001001', waybill: '10,000', pick: 'CASH', booking: '' },
  { request: 'WB001001', waybill: '10,000', pick: 'CASH', booking: '' },
];

// DAY END DASHBOARD TABLE
const ELEMENT_DATA_6: PeriodicElement6[] = [
  { request: 'WB789001', waybill: 'WE789001' },
  { request: 'WB789001', waybill: 'WE789001' },
  { request: 'WB789001', waybill: 'WE789001' },
  { request: 'WB789001', waybill: 'WE789001' },
  { request: 'WB789001', waybill: 'WE789001' },
  { request: 'WB789001', waybill: 'WE789001' },
  { request: 'WB789001', waybill: 'WE789001' },
  { request: 'WB789001', waybill: 'WE789001' },
  { request: 'WB789001', waybill: 'WE789001' },
  { request: 'WB789001', waybill: 'WE789001' },
];
