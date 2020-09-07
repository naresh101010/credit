import { Component, OnInit, ViewChild } from '@angular/core';
import { ContractService } from '../contract.service';
import { Router} from '@angular/router';
import { AppSetting } from '../../app.setting';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorConstants } from '../models/constants';
import { MatSort, MatDialog, MatPaginator, Sort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { ContractversionComponent } from '../contractversion/contractversion.component';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from '../services/authorization.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-creditdashboard',
  templateUrl: './creditdashboard.component.html',
  styleUrls: ['../core.css', 'creditdashboard.component.css']
})
export class CreditdashboardComponent implements OnInit {



  msaCust;
  msaData: any = [];
  statusList = [];
  searchType;
  dataSource: any;
  selectedValue = 'ACTIVE';
  firstSort;
  isEditflow: boolean;
  displayedColumns: string[] = ['custName', 'sfdcAccId', 'sfdcOpprId', 'pan', 'gstinNum', 'msaCustAddrs', 'originatingSrc', 'cntrCode', 'cntrExpDt', 'version', 'edit'];
  perList: any = [];
  userName = JSON.parse(sessionStorage.getItem('all')).data.responseData.user.username;
  userId = JSON.parse(sessionStorage.getItem('all')).data.responseData.user.userId;
  searchFilter = '';
  cardDetails: any[] = [];
  draggedObjects : any[] = [];
  favouriteObjects : any[] = [];
  pinnedObject : any;
  menuHierarchy : any;

  constructor(private spinner: NgxSpinnerService, private _contractService: ContractService, private tosterservice: ToastrService,
    private router: Router, private dialog: MatDialog, private permissionsService: NgxPermissionsService, private authorizationService: AuthorizationService) { }
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  count;
  checkValue;
  ngOnInit() {
    AppSetting.reset();
    this.authorizationService.setPermissions('CONTRACT');
    this.menuHierarchy = this.authorizationService.getMenuHierarchyId();
    this.perList = this.authorizationService.getPermissions('CONTRACT') == null ? [] : this.authorizationService.getPermissions('CONTRACT');
    this.authorizationService.setPermissions('MSA');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('MSA'));
    this.authorizationService.setPermissions('COMMANDMENT');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('COMMANDMENT'));
    this.permissionsService.loadPermissions(this.perList);
    this.searchType = 'MSA' ;
    this.spinner.show();
    this._contractService.contractCount().subscribe(countData =>{
      this.count = countData.data.responseData;
      this.getModuleCardDetails();
    },
    error => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });

    if(window['defaultLandingTarget'] && window['defaultLandingTarget'] !=''){
          this.onSelectBlock(window['defaultLandingTarget']);
          window['defaultLandingTarget'] =''
          }
          else{
          this.countData(this.selectedValue);
          }
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
      let temp  = this.msaCust.referenceData.cntrIdsInEdit.indexOf(element.cntrId)
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
  countData(value) {
    this.spinner.show();
    this.activeStatusValue='ACTIVE';
    this.searchFilter = '';
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
        this.expiredMsaData=[];
        this.activeDataList=[];
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
             let filterDate = new Date();
             filterDate.setDate(filterDate.getDate() + 60);
             if (dateinMilli.getTime() >= currDateinMilli.getTime() && dateinMilli.getTime() <= filterDate.getTime()) {
               this.msaData.push(data);
             }
           }
           else if (value === 'ACTIVE') {
             if (dateinMilli.getTime() >= currDateinMilli.getTime()) {
               this.activeDataList.push(data);
               this.msaData.push(data);
             } else {
               this.expiredMsaData.push(data);
             }
             this.msaData.forEach(element => {
               if (this.msaCust.referenceData.cntrIdsInEdit.includes(element.cntrId)) {
                 element.getContractIdFlag = true;
               }
             });
           } else {
             this.msaData.push(data);
           }
         }
         if (value === 'ACTIVE'){
           this.tabledataSort();
           this.defaultSortSFX();
         } else {
           this.tabledataSort();
           this.defaultSortColumn();
         }
      } else {
      this.tosterservice.error(ob.message);
      this.spinner.hide();
    }
    this.spinner.hide();
  },
  error => {
    this.tosterservice.error(ErrorConstants.getValue(404));
    this.spinner.hide();
  });
  }

  tabledataSort(){
    for(let msaDataelement of this.msaData){
      msaDataelement.msaCustAddrs[0].addr = msaDataelement.msaCustAddrs[0].addr.replace('|',' ');
      msaDataelement.msaCustAddrs[0].addr = msaDataelement.msaCustAddrs[0].addr + ' ' + msaDataelement.msaCustAddrs[0].pincodeId;
     }
    }

    defaultSortColumn(){
      this.dataSource = new MatTableDataSource(this.msaData);
      this.dataSource.sort = this.sort;
      const sortState: Sort = {active: 'opprId', direction: 'desc'};
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterForActiveData(value) {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
  if(value !== 'MSA' && value !== 'COMMANDMENT' && value != 'REPORTS'){
          this.countData(value);
        }
  //  this.countData(value);
    this.selectedValue = value;
    if (this.selectedValue === 'PENDING') {
      this.displayedColumns = ['custName', 'sfdcAccId', 'sfdcOpprId', 'groupCode', 'pan', 'gstinNum', 'msaCustAddrs', 'originatingSrc',];
    } else if (this.selectedValue === 'ACTIVE' || this.selectedValue === 'EXPIRING SOON') {
      this.displayedColumns = ['custName', 'sfdcAccId', 'sfdcOpprId', 'pan', 'gstinNum', 'msaCustAddrs', 'originatingSrc', 'cntrCode', 'cntrExpDt', 'version', 'edit'];
    }  else if (this.selectedValue === 'INACTIVE') {
      this.displayedColumns = ['custName', 'sfdcAccId', 'sfdcOpprId', 'pan', 'gstinNum', 'msaCustAddrs', 'originatingSrc', 'cntrCode', 'cntrExpDt', 'version'];
    } else if (this.selectedValue === 'DRAFT') {
      this.displayedColumns = ['custName', 'sfdcAccId', 'sfdcOpprId', 'pan', 'gstinNum', 'msaCustAddrs', 'originatingSrc', 'cntrUpdDt'];
    } else if (this.selectedValue === 'SEARCH') {
      this.displayedColumns = ['custName', 'sfdcAccId', 'sfdcOpprId', 'pan', 'gstinNum', 'msaCustAddrs', 'originatingSrc', 'cntrUpdDt', 'version', 'edit'];
    } else if (this.selectedValue === 'MSA') {
      this.router.navigate(['/contract/msaoperation'], {skipLocationChange : true});
    } else if (this.selectedValue === 'COMMANDMENT') {
      this.router.navigate(['/contract/msaoperation', {'openDialog': 'true'}], {skipLocationChange : true});
    }else if (this.selectedValue === 'REPORTS') {
      this.router.navigate(['/contract/report', {'openDialog': 'true'}], {skipLocationChange : true});
    }
  }

  commandmentSearch() {
    this.router.navigate(['/contract/msaoperation', {'openDialog': 'true'}], {skipLocationChange : true});
  }
  reportPage(){
    this.router.navigate(['/contract/report', {'openDialog': 'true'}], {skipLocationChange : true});
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
      this._contractService.getCardDetails(this.menuHierarchy[0].id).subscribe(cardDetails => {
        for(let cardDetail of cardDetails.data){
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
        this.tosterservice.error(ErrorConstants.getValue(404));
      })
    }

    /*---------- get drag drop data ----------- */
    getDragDropData() {
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
        isFavourite !==undefined ? isFavourite['favoriteIcon'] = 'favorite_border' : null;
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
