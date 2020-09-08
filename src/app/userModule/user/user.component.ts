import { Component, OnInit,  ElementRef,  ViewChild, ViewChildren, QueryList, ChangeDetectorRef, Renderer2  } from '@angular/core';
import * as XLSX from 'xlsx';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import{ AppSetting } from './../../app.setting'
import { HttpModule } from '@angular/http'
import { MatPaginator, MatSort } from "@angular/material";
import { NgxPermissionsService } from 'ngx-permissions';
import {ToastrService} from 'ngx-toastr';


import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ErrorConstants }  from '../../core/interceptor/ErrorHnadle';
import { NgxSpinnerService } from 'ngx-spinner';

import { throwError as observableThrowError } from 'rxjs';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';

export interface PeriodicElement {name: string;userId: number;status: string;symbol: string;}
 const ELEMENT_DATA: PeriodicElement[] = [];

 var userData:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../../core.user.css']
})

export class UserComponent implements OnInit {
  selectedStatus: any;
  searchUserPlaceHolder : string ='';
  Hold_UserSearchData:[];
  userName = JSON.parse(sessionStorage.getItem("all")).data.responseData.user.username;

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

  //pagination and sorting
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    paginaFlg = false;
    showHidePagination(len){
      len.length > 10   ?  this.paginaFlg = true :  this.paginaFlg = false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (data, attribute) => data[attribute];
    }
  // end pagination


constructor(private permissionsService: NgxPermissionsService,private toast: ToastrService,
private ref: ChangeDetectorRef, private SpinnerService: NgxSpinnerService,
private httpservice:HttpClient, public router:Router,
public http:HttpModule, private AuthorizationService_:AuthorizationService,
private ren:Renderer2,

) { }
  pinnedObjects : any;
  favouriteObjects : any[] = [];
  menuHierarchy : any;
  moduleCards : any;
  userId : any;
ngOnInit() {
  const perm = [];
  this.permissionsService.loadPermissions(this.AuthorizationService_.getPermissions('user'));
  this.selectedStatus=3;
  this.UserList();
  this.userId = JSON.parse(sessionStorage.getItem("all")).data.responseData.user.userId;
  this.menuHierarchy = this.AuthorizationService_.getMenuHierarchyId("USER");
  this.getCardDetails(this.menuHierarchy.id).subscribe(cards=> {
  this.getDragDropData().subscribe(data => {
  this.moduleCards = cards.data;
  this.pinnedObjects = data.data.pinnedObject;
  this.favouriteObjects = data.data.favouriteObjects;
  this.preparePinFavorite();
  this.SpinnerService.hide();
      });
  },
   error=>{
   this.SpinnerService.hide();
   console.log('Error');
   });
  //this.dataSource.sort = this.sort;

}




selectValue = false;
manifestBookmark(){
  this.selectValue = !this.selectValue;
}

manifestFavouriteValue = false;
manifestFavourite(){
  this.manifestFavouriteValue = !this.manifestFavouriteValue;
}


userList:any={};
data
dataSource
UserList(){
  this.SpinnerService.show();
    this.httpservice.get<any>(AppSetting.API_ENDPOINT+'secure/v1/users/lastUpdated/10',).subscribe(
      data => {
        let ob = ErrorConstants.validateException(data);
        if(ob.isSuccess){
          this.userList=data.data;
          this.Hold_UserSearchData=this.userList.responseData;
          userData = this.userList.responseData;
          let dptLookup=this.userList.referenceData.userDepartmentList;
          userData.forEach(element=>{
          for (var i = 0; i < dptLookup.length; i++) {
              if (element.userDepartment == dptLookup[i].id) {
                element.userDepartment = dptLookup[i].lookupVal;
              }
          }
          let types  = typeof(element.userDepartment);
          if(typeof(element.userDepartment) == 'number'){
            element.userDepartment = '';
          }
          });
          this.dataSource = new MatTableDataSource(userData);
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = (data, attribute) => data[attribute];
        }
        else{
          console.log('Error');
          this.SpinnerService.hide();
        }
      },
     error=>{
     this.SpinnerService.hide();
       console.log('Error');
     } );
  }


 onEdit(data){
  this.router.navigate(['user-management/userdetail',data.userId]);
  }

  displayedColumns: string[] = ['userId', 'name', 'userDepartment',  'email', 'effectiveDate', 'expiryDate', 'status', 'symbol'];
  @ViewChild('TABLE', {static: false}) table: ElementRef;
  @ViewChildren('trachForPagination') trachForPagination:QueryList<ElementRef>;

  ExportTOExcel(){
    let sheetObject: any = [];
    this.dataSource.filteredData.map(obj => {
      let objSheet: any = {}
      objSheet['User ID'] = obj.userId;
      objSheet['Name'] = obj.name;
      objSheet['Email Id'] = obj.email;
      objSheet['Active Date'] = obj.effectiveDate;
      objSheet['Inactive Date'] = obj.expiryDate;
      objSheet['Department'] = obj.userDepartment;
      objSheet['Status'] = (obj.status == 1) ? 'ACTIVE' : 'INACTIVE';
      sheetObject.push(objSheet);
    })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(sheetObject);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'userDetails.xlsx');
  }
  searchData:any={};
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      if(this.selectedStatus==1 && filterValue.length>=3 && this.toast.currentlyActive <=0){
      this.SpinnerService.show();
         this.httpservice.get<any>(AppSetting.API_ENDPOINT+`secure/v1/users/search/userId/${filterValue}`, ).subscribe(
           data => {
            let ob = ErrorConstants.validateException(data);
            if(ob.isSuccess){
              let dptLookup=data.data.referenceData.userDepartmentList;
              data.data.responseData.forEach(element=>{
              for (var i = 0; i < dptLookup.length; i++) {
                  if (element.userDepartment == dptLookup[i].id) {
                    element.userDepartment= dptLookup[i].lookupVal;
                  }
              }
              let types  = typeof(element.userDepartment);
                    if(types == 'number'){
                      element.userDepartment = '';
                    }
              })
              this.searchData=data.data;
              this.dataSource.data = [];
                if(data.data.responseData.length ==0 || !data.data.responseData){
                this.toast.warning('User id ' + filterValue+ ' does not exist in propel-i', 'Record not found');
                }
              this.dataSource = new MatTableDataSource(data.data.responseData);
              this.showHidePagination(data.data.responseData);
              this.SpinnerService.hide();
            }
            else{
            this.SpinnerService.hide();
              this.dataSource = [];
              this.toast.warning(ob.message, ob.code);
            }
         },
         error => {
         this.SpinnerService.hide();
          console.log('Front End Error');
       });
      }
      if(this.selectedStatus==2 && filterValue.length>=3 && this.toast.currentlyActive <=0){
      this.SpinnerService.show();
         this.httpservice.get<any>(AppSetting.API_ENDPOINT+`secure/v1/users/search/name/${filterValue}`, )
         .subscribe(
           data => {
            let ob = ErrorConstants.validateException(data);
            if(ob.isSuccess){
              let dptLookup=data.data.referenceData.userDepartmentList;
              data.data.responseData.forEach(element=>{
              for (var i = 0; i < dptLookup.length; i++) {
                  if (dptLookup[i].id == element.userDepartment) {
                    element.userDepartment=dptLookup[i].lookupVal;
                  }
              }
              let types  = typeof(element.userDepartment);
                    if(types == 'number'){
                      element.userDepartment = '';
                    }
              })
              this.searchData= data;
              this.dataSource.data = [];
              if(data.data.responseData.length ==0){
               this.toast.warning('User Name  ' + filterValue+ ' does not exist in propel-i', 'Record not found');
              }
              this.dataSource = new MatTableDataSource(this.searchData.data.responseData);
              this.showHidePagination(data.data.responseData);
              this.SpinnerService.hide();
            }
            else{
              this.SpinnerService.hide();
              this.toast.warning(ob.message, ob.code);
              this.dataSource = [];
            }
          },
          error=>{
            this.SpinnerService.hide();
            console.log('Front End Error');
          });
      }
      if(filterValue.length < 3 && this.toast.currentlyActive <=0){
        this.dataSource = new MatTableDataSource(this.Hold_UserSearchData);
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (data, attribute) => data[attribute];
        this.paginaFlg =false;
        if(filterValue.length >=1){
        this.toast.warning('Please enter atleast three characters');}
      }
  }





currentCheckedValue = null;
radioLabel = [{name:"User ID", value:1}, {name:"Name", value:2}, {name:"Top 10", value:3}]

 checkState(el) {
  setTimeout(() => {
    if (this.currentCheckedValue && this.currentCheckedValue === el.value) {
      el.checked = false;
      this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-focused');
      this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-program-focused');
      this.currentCheckedValue = null;
      this.selectedStatus = null;
    } else {
      this.currentCheckedValue = el.value
    }
  })
}


searchValue
toptendata(a, btn){
this.checkState(btn);
if(this.selectedStatus ==1){
this.searchUserPlaceHolder = 'Search by user id with minimum 3 characters'
}
else if(this.selectedStatus ==2){
this.searchUserPlaceHolder = 'Search by user name with minimum 3 characters'
}
if(this.selectedStatus ==3){
this.searchUserPlaceHolder = ''
}
  this.searchValue='';
    this.dataSource = new MatTableDataSource(this.Hold_UserSearchData);
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, attribute) => data[attribute];
    this.showHidePagination(this.Hold_UserSearchData);
}

validInput(event) {
  if ((event.which == 63 || event.keyCode == 63) || (event.which == 47 || event.keyCode == 47)  || (event.which == 92 || event.keyCode == 92)  ||(event.which == 37 || event.keyCode == 37)  ) {
    return false;

  }else{
    return true;
  }
}

     // post drag and drop data

        postDragDropData(data) {
         var headerData={'branchCode':AppSetting.branchCode,'journeyId':AppSetting.journeyId, 'userId': AppSetting.userId}
          var headers = new HttpHeaders(headerData);
          return this.httpservice.post<any>(AppSetting.API_ENDPOINT + "secure/v1/dashboard/bookmark",data, { headers: headers }).pipe(catchError((error: Response) => {
            return observableThrowError("Something went wrong");
          }));
        }

        // get dragged data, feature data
             getDragDropData() {
             var headerData={'branchCode':AppSetting.branchCode,'journeyId':AppSetting.journeyId, 'userId': AppSetting.userId}
                var headers = new HttpHeaders(headerData);
                return this.httpservice.get<any>(AppSetting.API_ENDPOINT +"secure/v1/dashboard/bookmark/"+ this.menuHierarchy.id, { headers: headers }).pipe(catchError((error: Response) => {
                  return observableThrowError("Something went wrong");
                }));
             }

 // get module card details
    getCardDetails(menuHierarchyId) {
    var headerData={'branchCode':AppSetting.branchCode,'journeyId':AppSetting.journeyId, 'userId': AppSetting.userId}
      var headers = new HttpHeaders(headerData);
      return this.httpservice.get<any>(AppSetting.API_ENDPOINT +"secure/v1/dashboard/moduleCardDetails/"+ menuHierarchyId, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    }

favoriteObjectArray : any =[];

    preparePinFavorite(){
    let favObject;
    this.moduleCards.forEach(card => {
    if(this.favouriteObjects){
     favObject = this.favouriteObjects.filter(function (item) {
      return item.objectId === card.objectId;
             });
             }
      card['bookmarkIcon'] = 'bookmark_border';
      card['favoriteIcon'] = 'favorite_border';
      card['isFavorite'] = false;
      card['isPinned'] = false;
      debugger
      if(favObject && favObject.length > 0 ){
      card['favoriteIcon'] = 'favorite';
      card['isFavorite'] = true;
      }
      var pinnedObject;
      if(this.pinnedObjects){
      if(this.pinnedObjects.objectId == card.objectId){
      pinnedObject = this.pinnedObjects;
      card['isPinned'] = true;
       card['bookmarkIcon'] = 'bookmark';
      }
       if(pinnedObject && pinnedObject.length > 0){
            card['bookmarkIcon'] = 'bookmark';
            card['isPinned'] = true;
            }
            }
      this.favoriteObjectArray =[];
      console.log("card.isPinned : ", card.isPinned);
      console.log("card.bookmarkIcon : ", card.bookmarkIcon);
      this.favoriteObjectArray.push(Object.assign({}, card));
     }
    );
    }







    /*------ Add module card in favorite -------- */
        addToFavorite(item,index) {
        event.stopPropagation();
         var isFavourite;
        if(this.favouriteObjects){
          isFavourite = this.favouriteObjects.find(x => x.objectId == item.objectId)}
          var favoriteObj = item;
            if(item.objectId){
            favoriteObj.menuCard = false;
            }
            else{
            favoriteObj.menuCard = true;
            }
            var finalObject : any = {};
            favoriteObj.status = isFavourite !== undefined ? 0 : 1;
            favoriteObj['favoriteIcon'] = favoriteObj.status == 1 ? 'favorite' : 'favorite_border';
            favoriteObj['isFavorite'] = favoriteObj.status == 1 ? true : false;
            finalObject.favouriteObject = favoriteObj;
            finalObject.userId = this.userId;
            console.log('favoriteObj',finalObject)
            this.SpinnerService.show();
            this.postDragDropData(finalObject).subscribe(data => {
            let dataObject = ErrorConstants.validateException(data);
             if(dataObject.isSuccess){
             this.getDragDropData().subscribe(dragDropData => {
             this.favouriteObjects = dragDropData.data.favouriteObjects;
             this.preparePinFavorite();
             this.SpinnerService.hide();
             });
              }else{
             favoriteObj['favoriteIcon'] = favoriteObj.status == 1 ? 'favorite_border' : 'favorite';
             favoriteObj['isFavorite'] = favoriteObj.status == 1 ? false : true;
             this.toast.warning('', dataObject.message);
             this.SpinnerService.hide();}
             },(error) => {
            this.toast.error(ErrorConstants.getValue(404));
            this.SpinnerService.hide();
             });
        }

 /*------ Add module card in favorite -------- */
        addToPin(item) {
        event.stopPropagation();
        var isPinned;
        if(this.pinnedObjects){
         if(this.pinnedObjects.objectId == item.objectId){
          isPinned = true;
          }
          }
          var pinnedObj = item;
            if(item.objectId){
            pinnedObj.menuCard = false;
            }
            else{
            pinnedObj.menuCard = true;
            }
            var finalObject : any = {};
            pinnedObj.status = (isPinned !== undefined || isPinned == true) ? 0 : 1;
            pinnedObj['bookmarkIcon'] = pinnedObj.status == 1 ? 'bookmark' : 'bookmark_border';
            pinnedObj['isPinned'] = pinnedObj.status == 1 ? true : false;
            finalObject.pinnedObject = pinnedObj;
            finalObject.userId = this.userId;
            console.log('favoriteObj',finalObject)
            this.SpinnerService.show();
            this.postDragDropData(finalObject).subscribe(data => {
            let dataObject = ErrorConstants.validateException(data);
             if(dataObject.isSuccess){
             this.getDragDropData().subscribe(dragDropData => {
             this.pinnedObjects = dragDropData.data.pinnedObject;
             this.preparePinFavorite();
             this.SpinnerService.hide();
             });
              }else{
              pinnedObj['bookmarkIcon'] = pinnedObj.status == 1 ? 'bookmark_border' : 'bookmark';
              pinnedObj['isPinned'] = pinnedObj.status == 1 ? false : true;
             this.toast.warning(dataObject.code, dataObject.message);
             this.SpinnerService.hide();}
             },(error) => {
            this.toast.error(ErrorConstants.getValue(404));
            this.SpinnerService.hide();
             });
        }

}
