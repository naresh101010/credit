import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ContractService } from '../contract.service';
import { Router } from '@angular/router';
import { AppSetting } from '../../app.setting';
import { NgxSpinnerService } from "ngx-spinner";
//import { TosterService } from './../toster.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorConstants } from '../models/constants';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog,Sort} from '@angular/material';
import { DataService } from '../msa/sharedata.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ContractversionComponent } from '../contractversion/contractversion.component';
import { confimationdialog } from '../confirmationdialog/confimationdialog';
import { AuthorizationService } from '../services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';


export interface ratecarddetailsElement {
  MSALevel: string;
  name: string;
  serviceOffering: string;
  ratecard: string;
  status: string;
}

@Component({
  selector: 'app-creditdashboard',
  templateUrl: './creditdashboard.component.html',
  styleUrls: ['../core.css',
    'creditdashboard.component.css',]
})
export class CreditdashboardComponent implements OnInit {
  msaCust;
  msaData: any = []
  statusList = [];
  pendingList: any[];
  draftList: any[];
  searchFilter = '';
  activeList: any[];
  displayedColumns: string[] = ['custLevel', 'custName', 'serviceOffering', 'attr1', 'status', 'updDt'];
  dataSource: any;
  dateFormat : string;
  userName = JSON.parse(sessionStorage.getItem('all')).data.responseData.user.username;
  userId = JSON.parse(sessionStorage.getItem('all')).data.responseData.user.userId;
  perList: any = [];
  isDataExist : boolean;
  selectedValue = 'ACTIVE';
  countPending: number;
  countExpiringSoon: number;
  countTotal: number;
  countDraft : number;
  countInactive:number;
  simpleArray : any[] = [
    {value : 'report', name: 'Report', iconIfSelected : '/assets/images/pending_icon.png', iconIfNotSelected : '/assets/images/timeline_24px.svg'},
  ]
  bookemarkedArray : any[];
  cardDetails: any[] = [];
  draggedObjects : any[] = [];
  favouriteObjects : any[] = [];
  pinnedObject : any;
  menuHierarchy : any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private spinner: NgxSpinnerService,
    private _contractService: ContractService,
    private tosterservice: ToastrService,
    private sharedSearchdata: DataService,
    private router: Router,
    private dialog: MatDialog,
    private authorizationService : AuthorizationService,
    private permissionsService: NgxPermissionsService) { }

  count;
    ngOnInit() {
    this.authorizationService.setPermissions('CONTRACT');
    this.menuHierarchy = this.authorizationService.getMenuHierarchyId();
    this.perList = this.authorizationService.getPermissions('CONTRACT') == null ? [] : this.authorizationService.getPermissions('CONTRACT');
    this.authorizationService.setPermissions('MSA');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('MSA'));
    this.authorizationService.setPermissions('COMMANDMENT');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('COMMANDMENT'));
    this.authorizationService.setPermissions('DASHBOARD');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('DASHBOARD'));
  //  console.log(this.perList);
    this.permissionsService.loadPermissions(this.perList);
    this.dateFormat = this.sharedSearchdata.displayDateFormat;
    this.spinner.show();
    this._contractService.getContractCount().subscribe(success => {
      this.countTotal = success.data.responseData.totalCount;
      this.countPending = success.data.responseData.pendingCount;
      this.countDraft =  success.data.responseData.draftCount;
      this.countExpiringSoon = success.data.responseData.expCount;
      this.countInactive=success.data.responseData.inactiveCount;
      this.count = success.data.responseData;
      this.getModuleCardDetails();
    },
      error => {
        this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      });
     if(window['defaultLandingTarget'] && window['defaultLandingTarget'] !=''){
      this.onSelectBlock(window['defaultLandingTarget']);
      window['defaultLandingTarget'] ='';
      }
      else{
      this.countData(this.selectedValue);
      }        
  }


  reportPage(){
    this.router.navigate(['/retail-contract/report', {'openDialog': 'true'}], {skipLocationChange : true});
  }
  activeStatusValue= "ACTIVE";
  activeStatus(event) {
    this.activeStatusValue = event.value;
    if(this.activeStatusValue=='ACTIVE'){
      this.msaData = this.activeDataList;
      this.tabledataSort();
      this.defaultSortSFX();
    } else {
      this.msaData = this.expiredMsaData;
      this.msaData.forEach(element => {
      let temp  = this.msaCust.referenceData.cntrIdsInEdit.indexOf(Number(element.cntrId));
      if(!(temp == -1)){
       element.getContractIdFlag  = true;
      }
     });
      this.tabledataSort(); 
      this.defaultSortSFX();     
    }
    this.applyFilterForActiveData(this.searchFilter);
  }

  expiredMsaData:any;
  activeDataList:any;
  ngOnChanges(){
    // this.selectedValue = value;
    console.log(this.selectedValue, 'print selected value')
  }
  // ngOnChanges(changes: SimpleChanges): void
  countData(value){ 
    this.spinner.show();
    this.activeStatusValue='ACTIVE';
    let searchValue = '';
    if (value === "EXPIRING SOON") {
      searchValue = "ACTIVE";
    } else {
      searchValue = JSON.parse(JSON.stringify(value));
    }
    this._contractService.getData(searchValue).subscribe(success => {
      let ob = ErrorConstants.validateException(success);
      if (ob.isSuccess) {
       this.msaCust = success.data   
       console.log(success.data, 'print msaCust')     
       this.msaData=[];
       this.expiredMsaData=[];
       this.activeDataList=[];
        this.spinner.hide();
        this.statusList = this.msaCust.referenceData.statusList;
        AppSetting.draftId=this.msaCust.referenceData.statusList.find(({ lookupVal }) => lookupVal === "DRAFT").id;
        AppSetting.activeId=this.msaCust.referenceData.statusList.find(({ lookupVal }) => lookupVal === "ACTIVE").id;
        AppSetting.inactiveId=this.msaCust.referenceData.statusList.find(({ lookupVal }) => lookupVal === "INACTIVE").id;
        AppSetting.pendingId=this.msaCust.referenceData.statusList.find(({ lookupVal }) => lookupVal === "PENDING").id;
        AppSetting.deleteId=this.msaCust.referenceData.statusList.find(({ lookupVal }) => lookupVal === "DELETED").id;
        let currentDate : Date = new Date();
        currentDate.setHours(0, 0, 0, 0);
        let currDateinMilli = new Date(currentDate);
        console.log(this.msaCust, 'print msa data')
        if(this.msaCust.responseData){          
          for (let data of this.msaCust.responseData){
            for (let statusid of this.statusList){
              if (data.status === statusid.id) {
                data.statusName = statusid.lookupVal;
              }
            }
  
            let dateinMilli = new Date(Date.parse(data.expDt));
            if (value === 'EXPIRING SOON') {
              // if (dateinMilli.getMonth() === new Date().getMonth() && dateinMilli.getFullYear() === new Date().getFullYear() && dateinMilli.getTime() >= currDateinMilli.getTime()) {
                 this.msaData.push(data);
                 console.log(this.msaData, 'print console ')
              // }
            }              
            else if (value === 'ACTIVE' ){           
              if (dateinMilli.getTime() >= currDateinMilli.getTime()) {
                this.activeDataList.push(data);
                this.msaData.push(data);
              }else{
                //expired - msaDatapushed
                this.expiredMsaData.push(data);
              }
  
              this.msaData.forEach(element => {
               let temp  = this.msaCust.referenceData.cntrIdsInEdit.indexOf(Number(element.cntrId))                  
               if((temp != -1)){
                element.getContractIdFlag = true;
               }
              });
            } else {
              this.msaData.push(data);
            }
          }

        }

        if (value === 'ACTIVE' || value === 'EXPIRING SOON') {
          this.tabledataSort();
          this.defaultSortSFX();
        } else {
          this.tabledataSort();
          this.defaultSortColumn();
        }
      } 
      else {
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }
      this.tabledataSort();
    },
      error => {
        this.tosterservice.error(ErrorConstants.getValue(404));
        this.spinner.hide();
      });   
  }

  tabledataSort(){
        this.dataSource = new MatTableDataSource(this.msaData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.paginator.firstPage();
  }
  defaultSortColumn(){
    this.dataSource = new MatTableDataSource(this.msaData);
    this.dataSource.sort = this.sort;
    const sortState: Sort = {active: 'updDt', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
    this.dataSource.paginator = this.paginator;
    this.paginator.firstPage();
  }
  defaultSortSFX(){
    this.dataSource = new MatTableDataSource(this.msaData);
    this.dataSource.sort = this.sort;
    const sortState: Sort = {active: 'cntrCode', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction; 
    this.sort.sortChange.emit(sortState);
    this.dataSource.paginator = this.paginator;
    this.paginator.firstPage();
  }


  goToMsa(user) {
    AppSetting.msaCustId = user.id
    AppSetting.oprtunityId = user.opprId
    AppSetting.stepperFlag = true;
    this.router.navigate(['/retail-contract/msa'],{skipLocationChange: true});
  }
  goToEditContract() {
    AppSetting.msaCustId = 1981
    AppSetting.oprtunityId = 1717
    AppSetting.contractId = 1981;
    AppSetting.stepperFlag = true;
    this.router.navigate(['/retail-contract/opportunity', { 'openDialog': 'true' }],{skipLocationChange: true});
  }
  tooltip: boolean = true;
  toolTip() {
    this.tooltip = false;
  }
  applyFilter(event: Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.filteredData.length ==0){
      this.isDataExist =  true;
      
    } else {
      this.isDataExist = false;
     
    }
    console.log('datasource',this.dataSource)
  }

  applyFilterForActiveData(value) {
    this.dataSource.filter = value.trim().toLowerCase();
    if(this.dataSource.filteredData.length ==0){
      this.isDataExist =  true;
    } else {
      this.isDataExist = false;
    }
  }
  returnstatus(data: any) {
    for (let a of this.msaCust.referenceData.statusList) {
      if (data == a.id) {
        return a.lookupVal;
      }
    }
  }
  returnserviceoffering(data: string) {
    if (data != null) {
      const a = data.split(',');
      var c = '';
      for (let b of a) {
        let result = this.msaCust.referenceData.serviceOfferingList.find(({ id }) => id == b);
        if (result) {
          c = c + ',' + result.serviceOffering;
        }
      }
      return c.slice(1);
    }
  }
  createmsa(term: any) {  
    if (term != null) {
      this.router.navigate(['/retail-contract/msa'],{skipLocationChange: true});
      AppSetting.msaId=term;
      this.sharedSearchdata.changeRetailCode('NOT GENERATED YET');
    }
    else {
      this.sharedSearchdata.changeRetailCode('NOT GENERATED YET');
      AppSetting.msaId=0;
      this.router.navigate(['/retail-contract/msa'],{skipLocationChange: true});
    }
  }

  /*------- on select contract -------- */

  onSelectBlock(value: string) {   
    if(value !== 'MSA' && value !== 'COMMANDMENT' && value !== 'report'){
      this.countData(value); 
    }
    this.selectedValue = value;
    if (this.selectedValue === 'PENDING') {
      this.displayedColumns = ['custLevel', 'custName', 'serviceOffering', 'ratecarattr1d', 'status'];
    } else if (this.selectedValue == 'EXPIRING SOON') {
     this.displayedColumns = ['custLevel', 'custName', 'serviceOffering', 'attr1', 'cntrCode', 'status', 'updDt', 'version', 'edit'];
    } else if (this.selectedValue === 'DRAFT') {
      this.displayedColumns = ['custLevel', 'custName', 'serviceOffering', 'attr1', 'status', 'updDt'];
      this.spinner.show();
    } else if (this.selectedValue == 'ACTIVE') {
      this.displayedColumns = ['custLevel', 'custName', 'serviceOffering', 'attr1', 'cntrCode', 'status', 'updDt', 'version', 'edit'];
      this.spinner.show();
    }else if(this.selectedValue === 'INACTIVE') {
      this.displayedColumns = ['custLevel', 'custName', 'serviceOffering', 'attr1', 'cntrCode', 'status', 'updDt', 'version',];
      this.spinner.show();
    }else if (this.selectedValue === 'MSA') {
      this.router.navigate(['/retail-contract/msaoperation'], {skipLocationChange : true});
    } else if (this.selectedValue === 'COMMANDMENT') {
      this.router.navigate(['/retail-contract/msaoperation', {'openDialog': 'true'}], {skipLocationChange : true});
    }  else if (this.selectedValue === 'REPORTS') {
      this.router.navigate(['/retail-contract/report', {'openDialog': 'true'}], {skipLocationChange : true});
    }

  }
   /*----------- on click on eye icon in case of active contracts ------------ */
   showVersionPopup(element) {
     this.spinner.show();
        this._contractService.getContractByMSAId(element.id).subscribe(success => {
              const dialogRef = this.dialog.open(ContractversionComponent,{
                width: '690px',data:{contractId:success.data.responseData[0].id}
              });
              dialogRef.afterClosed().subscribe(result => {
            //    console.log('The dialog was closed'); 
              });
        },
          error => {
            this.tosterservice.error(ErrorConstants.getValue(404));
            
          });
  }

  /*----------- on click on edit icon in case of active contracts ------------ */
  showEditFlowPopup(data) {
    this.sharedSearchdata.changeMessage({ id: data.id });
    this.sharedSearchdata.changeMSALevel(data.custLevel);
    this.sharedSearchdata.changeRetailCode(data.cntrCode);
  //  console.log(data);

    AppSetting.msaId = data.id;

    this._contractService.getContractByMSAIdInEditFlow(AppSetting.msaId)
    .subscribe(response => {
      AppSetting.contractId = response.data.responseData.id;
     });

    const dialogRef = this.dialog.open(EditFlowDataComponent, {
      width: '475px',
      data: data,
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

  }


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

/*----------  get all module card details ------- */
getModuleCardDetails() {
  this.spinner.show();
  this._contractService.getCardDetails(this.menuHierarchy[0].id).subscribe(cardDetails => {
    for(let cardDetail of cardDetails.data){
      console.log(cardDetail, "this.cardDetails")

    cardDetail['bookmarkIcon'] = 'bookmark_border';
    cardDetail['favoriteIcon'] = 'favorite_border';
    if(cardDetail.moduleEntity == 'DASHBOARD'){
    cardDetail['permission'] = 'CONTRACT_READ';
    }
    else if(cardDetail.objectName == 'COMMANDMENT'){
    cardDetail['permission'] = cardDetail.objectName + '_UPDATE';
    cardDetail.objectName = 'BULK UPDATE COMMANDMENTS';
    }
    else{
    cardDetail['permission'] = cardDetail.objectName + '_READ';
    }
    }
    this.cardDetails = cardDetails.data;
    this.getDragDropData();
  }, (error) => {
    this.spinner.hide();
  })
}

/*---------- get drag drop data ----------- */
getDragDropData() {
    this.spinner.show();
    this._contractService.getDragDropData(this.menuHierarchy[0].id).subscribe(data => {
    this.draggedObjects = data.data.draggedObjects;
    this.favouriteObjects = data.data.favouriteObjects;
    this.pinnedObject = data.data.pinnedObject;

    console.log('pinned',this.pinnedObject)

    var filteredArray =  this.cardDetails.filter(x => !this.draggedObjects.find(y => y.objectId === x.objectId));
    //this.draggedObjects =  this.draggedObjects.filter(x => this.cardDetails.find(y => y.objectId === x.objectId));
    for(let permissionArray of this.draggedObjects){
          permissionArray['bookmarkIcon'] = 'bookmark_border';
          permissionArray['favoriteIcon'] = 'favorite_border';
          if(permissionArray.moduleEntity == 'DASHBOARD'){
            permissionArray['permission'] = 'CONTRACT_READ';
            if(this.count){
            if(permissionArray.targetValue =='PENDING'){
            permissionArray['count'] = this.count.pendingCount;
            }else if(permissionArray.targetValue =='EXPIRING SOON'){
            permissionArray['count'] = this.count.expCount;
            }else if(permissionArray.targetValue =='DRAFT'){
            permissionArray['count'] = this.count.draftCount;
            }else if(permissionArray.targetValue =='INACTIVE'){
            permissionArray['count'] = this.count.inactiveCount;
            }
            }
          }
          else if(permissionArray.objectName == 'COMMANDMENT'){
          permissionArray['permission'] = permissionArray.objectName + '_UPDATE';
          permissionArray.objectName = 'BULK UPDATE COMMANDMENTS';
          }else{
          permissionArray['permission'] = permissionArray.objectName + '_READ';
          }
          }
    this.cardDetails = filteredArray;
    for(let card of this.cardDetails){
                  if(card.moduleEntity == 'DASHBOARD' && this.count){
                    if(card.targetValue =='PENDING' ){
                    card['count'] = this.count.pendingCount;
                    }else if(card.targetValue =='EXPIRING SOON'){
                    card['count'] = this.count.expCount;
                    }else if(card.targetValue =='DRAFT'){
                    card['count'] = this.count.draftCount;
                    }else if(card.targetValue =='INACTIVE'){
                    card['count'] = this.count.inactiveCount;
                    }
                  }
                  }
    this.spinner.hide();
    console.log('draggedObjects : ',this.draggedObjects)
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
    finalObj.draggedObjects = this.draggedObjects;
   // finalObj.favouriteObjects = this.favouriteObjects;
    finalObj.userId = this.userId;

    this.spinner.show();
    this._contractService.postDragDropData(finalObj).subscribe(response => {
     this.spinner.hide();
    }, (error) => {
    this.tosterservice.error(ErrorConstants.getValue(404));
    this.spinner.hide();
    });
  }
}

getImagePath(pathName,targetValue) {
  if(this.selectedValue === targetValue){
    var image= pathName.split('.');
    var imageName='/assets/images/' +image[0]+ '_white'+ '.' + image[1];
    return imageName
  } else {
   return '/assets/images/'+pathName;
  }
}

/*------ Add module card in favorite -------- */
addToFavorite(item,index) {
  event.stopPropagation();
  var isFavourite = this.favouriteObjects.find(x => x.objectId == item.objectId)
  var favoriteObj : any = {}
    favoriteObj.menuHierarchyId = item.menuHierarchyId;
    favoriteObj.moduleEntityId = item.moduleEntityId;
    if(item.objectId){
    favoriteObj.objectId = item.objectId;
    favoriteObj.menuCard = false;
    }
    else{
    favoriteObj.menuCard = true;
    }
    if (isFavourite !== undefined) {
      isFavourite["favoriteIcon"] = "favorite_border";
    }
    // isFavourite !==undefined ? isFavourite['favoriteIcon'] = 'favorite_border' : '';
    //isFavourite['favoriteIcon'] = isFavourite !==undefined ? 'favorite_border' : '';
    favoriteObj.objectOrder = index+1;
    favoriteObj.status = isFavourite !== undefined ? 0 : 1;
    favoriteObj.targetValue = item.targetValue;

    var finalObject : any = {};
    finalObject.favouriteObject = favoriteObj;
    finalObject.userId = this.userId;
    console.log('favoriteObj',finalObject)
    this.spinner.show();
    this._contractService.postDragDropData(finalObject).subscribe(data => {
    let dataObject = ErrorConstants.validateException(data);
     if(dataObject.isSuccess){
     this.getDragDropData();
     this.spinner.hide();
      }else{
     this.tosterservice.warning(dataObject.message);
     this.spinner.hide();}
     },(error) => {
    this.tosterservice.error(ErrorConstants.getValue(404));
    this.spinner.hide();
     });

}

checkIsFavorite(data) {
  var object = this.favouriteObjects.find(x=> x.objectId == data.objectId);
  if(object !== undefined){
  data['favoriteIcon'] = 'favorite';
    return true;
  } else {
  data['favoriteIcon'] = 'favorite_border';
    return false;
  }
}

checkIsPinned(data): boolean {
  var isPinned
  if(this.pinnedObject !== undefined){
    if(this.pinnedObject.objectId === data.objectId) {
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

addToPinnedObj(item,index) { 
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
  if(item.objectId){
  pinnedObj.menuCard = false;
  pinnedObj.objectId = item.objectId;
  }
  else{
  pinnedObj.menuCard = true;
  }
  pinnedObj.objectOrder = index+1;
  pinnedObj.status = isPinned;
  pinnedObj.targetValue = item.targetValue;

  var finalObject: any = {};
  finalObject.pinnedObject = pinnedObj;
  finalObject.userId = this.userId;

  console.log('pinned final', finalObject);

  this.spinner.show();
  this._contractService.postDragDropData(finalObject).subscribe(data => { 
  let dataObject = ErrorConstants.validateException(data);
  if(dataObject.isSuccess){
    this.getDragDropData();
    this.spinner.hide();
  }else{
    this.tosterservice.warning(dataObject.message);
    this.spinner.hide();
  }
  }, (error) =>{
  this.tosterservice.error(ErrorConstants.getValue(404));
  this.spinner.hide();
  });
}





}












/*------------ component to open edit flow popup ------------ */

@Component({
  selector: 'app-edit-flow-data',
  templateUrl: '../opportunity/dialog_Box_search1.html',
  styleUrls: ['../core.css']
})
export class EditFlowDataComponent implements OnInit {
msaId : any;
msaLevel : string;
retailCode : string;
EditFlowDataComponent;
//newRateRoute;
  constructor(public dialogRefEdit: MatDialogRef<EditFlowDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private sharedSearchdata: DataService,
    private router : Router,
    private dialog: MatDialog ) {

  }
  ngOnInit() {
 //   console.log('check deployment status --- 26-05-2020', )

    this.sharedSearchdata.currentMessage.subscribe(x =>{this.msaId=x});
    
    this.sharedSearchdata.currentMSALevel.subscribe(level =>  this.msaLevel = level);
 
	  this.sharedSearchdata.currentRetailCode.subscribe(code => this.retailCode = code);
  }

  close() {
  //  this.dialogRefEdit.close();
  const dialogRefConfirm = this.dialog.open(confimationdialog, {
    width: '300px',
    data:{message:'Are you sure ?'},
    disableClose: true,
    panelClass: 'creditDialog',
    backdropClass: 'backdropBackground'
  });
  
  dialogRefConfirm.afterClosed().subscribe(value => {
    if(value){
      this.dialogRefEdit.close();
    }else{
    //  console.log('Keep Open');
    }
  });
  }

  closeDialog() {
    
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      data:{message:'Are you sure ?'},
      disableClose: true,
      panelClass: 'creditDialog',
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if(value){
        this.dialogRefEdit.close();
      }else{
      //  console.log('Keep Open');
      }
    });
  }

  /*---------- On Click on General Edit ------------- */
  generalEditRoute(){
    this.dialogRefEdit.close();
    this.router.navigate(['/retail-contract/msa',{editflow : true}],{skipLocationChange: true});
  }

  /*--------- On Click on contract Termination --------- */
  contractTermRoute(){
    this.dialogRefEdit.close();
    this.router.navigate(['/retail-contract/contract',{editflow : true,termination: true}], {skipLocationChange: true});
  }

  /*------------ On Click On New Offer Addition ------------- */
  newOffRoute(){
    this.dialogRefEdit.close();
    this.router.navigate(['/retail-contract/service',{editflow : true}], {skipLocationChange: true});
  }

    /*------------ On Click On New Rate Card (Existing Offering) Addition ------------- */
    newRateRoute(){
      this.dialogRefEdit.close();
      this.router.navigate(['/retail-contract/ratecard',{editflow : true}], {skipLocationChange: true});
    }
  
  
}