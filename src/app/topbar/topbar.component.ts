import { Component, OnInit, Inject, HostListener } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from "@angular/router";

import { AuthorizationService } from "../core/services/authorization.service";
import { CommonService } from "../common.service";


export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.css"]
})
export class TopbarComponent implements OnInit {
  opened = true;
  menuFlg = true;
  entitylist = [];
  navItems: any;
  user = "";
  defltBranch: "";
  searchDrop = false;
  user_without_permi = false;
  tstUser:boolean = false;
  toggleLogoutScreen:boolean = false;

  constructor(
    private AuthorizationService_: AuthorizationService, public dialog: MatDialog,    
    public CommonService_: CommonService
  ) {}

  openDialog(): void {   
    const dialogRef = this.dialog.open(trackwayBill, {
      panelClass: 'my-panel',
      width: '125rem',minHeight: '32rem',
      position: {
        top: '6.5rem',
        left: '28rem'
      }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
 
  toggleLogout(){
    this.toggleLogoutScreen = !this.toggleLogoutScreen;
  }
  onClickedOutside(e: Event) {
   this.toggleLogoutScreen = false;
  }

  ngOnInit() {
    if(sessionStorage.getItem("all")){
      this.tstUser = false    
    this.defltBranch = JSON.parse(
      sessionStorage.getItem("all")
    ).data.responseData.user.defatultBranchName;
    this.user = JSON.parse(
      sessionStorage.getItem("all")
    ).data.responseData.user.username;
    this.navItems = this.AuthorizationService_.getMenu();
    }else{
      this.tstUser = true;
    }


    if(!sessionStorage.getItem('permissions')){ //if permission not persist
      this.user_without_permi = true;
    }   
    this.searchDropArea();
  }

  logout() {    
    this.AuthorizationService_.logout();
  }


  searchDropArea(){
    this.searchDrop = !this.searchDrop;
  }


  //this will run on window resize -- and hide menu if width is small 1024
  @HostListener('window:resize', ['$event']) onResize(event) {
      if(window.innerWidth < 1024){
        this.CommonService_.hidemenu();  
          let element = document.getElementById("feature_holder");
          element.classList.remove("menu");
      }
  }

}

@Component({
  selector: 'Track-WayBill',
  templateUrl: 'trackwaybill.component.html',
  styleUrls: ['navigation.component.css']
})
export class trackwayBill {
  constructor(
    public dialogRef: MatDialogRef<trackwayBill>,
    public router:Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.router.navigate(['/user-management/track-waybill'])
    this.dialogRef.close();
  }

}