import { Component,Inject, OnInit, ElementRef, ViewChild, ViewChildren, QueryList, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { AppSetting } from './../../../app.setting'
import { HttpModule } from '@angular/http'
import { MatPaginator, MatSort } from "@angular/material";
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ErrorConstants }  from '../../../core/interceptor/ErrorHnadle';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { throwError as observableThrowError, Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';

export interface DialogData {
  animal: string;
  name: string;
}



export interface PeriodicElement {name: string;userId: number;status: string;symbol: string;}
 const ELEMENT_DATA: PeriodicElement[] = [];

 var userData:any;

@Component({
  selector: 'app-broadcast-message',
  templateUrl: './broadcast-message.component.html',
  styleUrls: ['../../../core.user.css']
})

export class BroadcastMessageComponent implements OnInit {
  selectedStatus: any;
  searchUserPlaceHolder : String ='';
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
public http:HttpModule, private AuthorizationService:AuthorizationService,
private ren:Renderer2,public dialog: MatDialog) {
}



animal: string;
name: string;

openDialog(element): void {
  const dialogRef = this.dialog.open(BroadCastDialog, {disableClose: true,
    width: '85rem',
    data: element,
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if(result.status=="SUCCESS"){
      this.UserList();
    }

  });
}


messageDialog(): void {
  debugger
  const dialogRef = this.dialog.open(NewBroadCastMessage, {disableClose: false,
    width: '80rem',
    data: {name: this.name, animal: this.animal}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result,'The dialog was closed');
    if(result && result.status=="SUCCESS"){
      this.UserList();
    }
  });
}



ngOnInit() {
  const perm = [];
  this.permissionsService.loadPermissions(this.AuthorizationService.getPermissions('user'));
  this.selectedStatus=3;
  this.UserList();
  //this.dataSource.sort = this.sort;

}

userList:any={};
data
dataSource
mname;
holdTopTen:[]
UserList(){
  this.SpinnerService.show();
    this.httpservice.get<any>(AppSetting.API_ENDPOINT+'secure/v1/dashboard/broadcastMessages/latest/10/false',).subscribe(
      data => {
        let ob = ErrorConstants.validateException(data);
        if(ob.isSuccess){
          this.userList=data.data;
          this.holdTopTen=data.data;
          this.mname = this.userList[0].broadcastMessage;
          console.log(this.mname, 'print mname')
          this.Hold_UserSearchData=this.userList;
          userData = this.userList;

          console.log(userData, 'print data')
          if(userData.length == 0){
            this.toast.warning('Record not found');
            }
          this.dataSource = new MatTableDataSource(userData);
          console.log(this.dataSource, 'print data source')
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = (data, attribute) => data[attribute];
          this.SpinnerService.hide();
        }
        else{
          console.log('Error');
          this.toast.warning(ob.message, ob.code);
          this.SpinnerService.hide();
        }
      },
     error=>{
       console.log('Error');
     } );
  }


  displayedColumns: string[] = ['broadcastMessage', 'createdBy',  'effectiveDate', 'expiryDate', 'status'];
  @ViewChild('TABLE', {static: false}) table: ElementRef;
  @ViewChildren('trachForPagination') trachForPagination:QueryList<ElementRef>;


  applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        if(filterValue.length < 3){
          this.dataSource.data = [];
          this.dataSource.data = this.holdTopTen;
          console.log(this.holdTopTen, 'print data source after zero');
          if(filterValue && filterValue.length >=1){
          this.toast.warning('Please enter at least three characters');}
          }
        else if(filterValue.length>=3){
        // this.SpinnerService.show();
        this.httpservice.get<any>(AppSetting.API_ENDPOINT+`secure/v1/dashboard/broadcastMessages/${filterValue}`).subscribe(
          data => {
            let ob = ErrorConstants.validateException(data);
            if(ob.isSuccess){
               if(data.data.length ==0){
                 this.toast.warning('Broadcast message ' + filterValue+ ' does not exist in propel-i', 'Record not found');
                }
              this.dataSource.data =  data.data;
              this.SpinnerService.hide();
            }
            else{
              this.dataSource.data=[];
              this.toast.warning(ob.message, ob.code);
              this.SpinnerService.hide();
            }
        },
        error=>{
          this.toast.warning(ErrorConstants.getValue(404));
          this.SpinnerService.hide();
        }

        );
        this.SpinnerService.hide();
      }

    }

  searchData:any={};
  currentCheckedValue = null;

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

validInput(event) {
  if ((event.which == 63 || event.keyCode == 63) || (event.which == 47 || event.keyCode == 47)  || (event.which == 92 || event.keyCode == 92)  ||(event.which == 37 || event.keyCode == 37)  ) {
    return false;

  }else{
    return true;
  }
}

}

@Component({
  selector: 'broadcast-dialog',
  templateUrl: 'broadCast_dialog.html',
  styleUrls: ['../../../core.user.css']
})
export class BroadCastDialog {

  constructor(
    public dialogRef: MatDialogRef<BroadCastDialog>,private httpservice:HttpClient, private SpinnerService: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    modelData={
      "broadcastMessage": "",
      "effectiveDate": "",
      "expiryDate": "",
      "id": 0,
      "isAddOrRemove": "remove",
      "status": 0
    }

    headerData={'branchCode':AppSetting.branchCode,'journeyId':AppSetting.journeyId, 'userId': AppSetting.userId}
      //create User Service
      removeBroadcastMessage(reqdata) {
        console.log(reqdata)
        reqdata.status=0;
        reqdata.isAddOrRemove='remove';
        // var headers = new HttpHeaders(this.headerData);
        this.SpinnerService.show();
        return this.httpservice.post(AppSetting.API_ENDPOINT+'secure/v1/dashboard/broadcastMessage',reqdata,).subscribe(
          data => {
            let ob = ErrorConstants.validateException(data);
            if(ob.isSuccess){
              console.log(data, 'print console data')
              this.closeDialog(data);

              this.SpinnerService.hide();
            }
            else{
              console.log('Error');
              this.SpinnerService.hide();
            }
          },
         error=>{
           console.log('Error');
         });
      }
    closeDialog(data): void {
    this.dialogRef.close(data);
  }
}

@Component({
  selector: 'broadcast-message',
  templateUrl: 'new_broadcast_message.html',
  styleUrls: ['../../../core.user.css'],
  providers: [DatePipe]
})
export class NewBroadCastMessage {
  constructor(
    public messageDialogRef: MatDialogRef<NewBroadCastMessage>,private httpservice:HttpClient,private authSer:AuthorizationService,
    public datePipe: DatePipe,
    private SpinnerService: NgxSpinnerService,
    )   {
      this.authSer.getTimeStamp().subscribe( date => {
                  this.today = new Date(date.data.responseData.split("[")[0])
                  if(this.today){
                    this.IsEffDateForvalidation = this.today;
                    this.minDateEffe = this.today
                  }else{
                    this.IsEffDateForvalidation = new Date();
                    this.minDateEffe = new Date()
                  }
                })
     }


    ngOnInit(){
      this.IsEffDateForvalidation = new Date(this.todaydate);
      this.authSer.getTimeStamp().subscribe(date=>{
        this.todaydate = new Date(date.data.responseData.split("[")[0]);
        if(this.todaydate){
          this.IsEffDateForvalidation = this.todaydate;
          this.minDateEffe = this.todaydate;
        }else{
          this.IsEffDateForvalidation = new Date();
          this.minDateEffe = new Date()
        }
      })
    }

    data:any={
      "broadcastMessage": "",
      "effectiveDate": "",
      "expiryDate": "",
      "id": 0,
      "isAddOrRemove": "add",
      "status": 0
    }

    headerData={'branchCode':AppSetting.branchCode,'journeyId':AppSetting.journeyId, 'userId': AppSetting.userId}
      //create User Service
      addBroadcastMsg() {
        // var headers = new HttpHeaders(this.headerData);
        this.SpinnerService.show();
        this.data.expiryDate = moment( this.data.expiryDate).format('YYYY-MM-DD');
        this.data.effectiveDate = moment( this.data.effectiveDate).format('YYYY-MM-DD');
        return this.httpservice.post(AppSetting.API_ENDPOINT+'secure/v1/dashboard/broadcastMessage',this.data,).subscribe(
          data => {
            let ob = ErrorConstants.validateException(data);
            if(ob.isSuccess){
              console.log(data, 'print console data')
              this.closeDialog(data);
              this.SpinnerService.hide();
            }
            else{
              console.log('Error');
              this.SpinnerService.hide();
            }
          },
         error=>{
           console.log('Error');
         } )
      }

      convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
      }

      todayDt;
      IsEffDate:Date;
      IsExpdate:Date;
      IsEffDateForvalidation:Date;
      IsExpdateForvalidation:Date;
      today;
      flgSubmitBtn:boolean = true //show
      minDateEffe;
    EffectiveDateEvent(change, $event){
    if(this.data.effectiveDate){
        if(this.data.effectiveDate.getFullYear() > 9999){
                 this.flgSubmitBtn = false;
                 this.IsExpdateForvalidation = new Date(this.convert('01/01/9999'));
                 this.IsEffDateForvalidation = moment(this.today).add(1, 'days').toDate();
                 }
                 else{
        this.IsEffDateForvalidation = moment(this.data.effectiveDate).add(1, 'days').toDate();}
      }else{
        this.IsEffDateForvalidation = moment(this.today).add(1, 'days').toDate();
      }
      this.validateDt()
    }
    expiryDateMaxValidation:Date;
    ExpiryDateEvent(change, $event){
     if(this.data.expiryDate.getFullYear() > 9999){
             this.flgSubmitBtn = false;
             this.expiryDateMaxValidation = new Date(this.convert('01/01/9999'));
             this.IsExpdateForvalidation =  moment(this.data.expiryDate).subtract(1, 'days').toDate();
             }else{
     if(moment(new Date(this.data.expiryDate).setHours(0,0,0,0)).isSameOrBefore(this.todaydate.setHours(0,0,0,0))){
            //  this.IsExpdateForvalidation =  moment(this.todaydate.setHours(0,0,0,0)).toDate();
              this.IsExpdateForvalidation = moment(this.todaydate).add(1000, 'days').toDate()
             }
             else{
       this.IsExpdateForvalidation =  moment(this.data.expiryDate).subtract(1, 'days').toDate();
       }
       this.validateDt();
       }

    }
    todaydate:Date;
    validateDt(){
      if(!this.IsExpdate &&  moment(this.IsEffDate).isAfter(new Date()))
      {
        this.flgSubmitBtn = true
      }else if(
          moment(this.IsEffDate).isBefore(this.IsExpdate) &&
          moment(new Date(this.IsEffDate).setHours(0,0,0,0)).isSameOrAfter(this.todaydate.setHours(0,0,0,0))
        ){
          this.flgSubmitBtn = true // show
        }else{
          this.flgSubmitBtn = false // hide
        }
        // min max effective date change
        if(moment(new Date(this.IsEffDate).setHours(0,0,0,0)).isSameOrBefore(this.todaydate.setHours(0,0,0,0))){
            this.minDateEffe = this.todaydate;
        }

        if(moment(new Date(this.IsExpdate).setHours(0,0,0,0)).isSameOrBefore(this.todaydate.setHours(0,0,0,0))){
          this.minDateEffe = this.todaydate;
          this.IsExpdateForvalidation = moment(this.todaydate).add(1000, 'days').toDate()
        }

    }




    closeDialog(data): void {
    this.messageDialogRef.close(data);

  }

}


