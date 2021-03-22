import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AssignVehicleComponent } from 'src/app/dialog/assign-vehicle/assign-vehicle.component';
import { SearchBranchComponent } from 'src/app/dialog/search-branch/search-branch.component';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSetting } from 'src/app/app.setting';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from 'src/app/core/services/authorization.service';

@Component({
  selector: 'app-route-allocation',
  templateUrl: './route-allocation.component.html',
  styleUrls: ['./route-allocation.component.css']
})
export class RouteAllocationComponent implements OnInit {
  displayedColumns: string[] = ['Bcheck', 'Rcode', 'Sbranch', 'Dbranch', 'Tpoint', 'mode', 'Avehicle', 'delete'];
  advanceSearchList: any = [
    { value: "ROUTE CODE" },
    { value: "LOCATION", criteriaValue: "location" }
  ];
  model: any = {}
  dataSource: any = [];
  temTableData = [];
  editflow: any;

  SearchType;
  userBranch;
  DefaultB;
  todaydate;
  branches = [];
  tempArr = [];
  existBranch = [];
  referenceData;
  vehicleTypeStatus:any;
  perList: any = [];
  vehicleClone:any=[];
  isVehicleRequestCompleted : boolean = false;

  constructor(public dialog: MatDialog,
    private apiSer: ApiService,
    private spinner: NgxSpinnerService,
    public router: Router,
    private tosterservice: ToastrService,
    private permissionsService: NgxPermissionsService,
    private authorizationService : AuthorizationService,
    private acRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.authorizationService.setPermissions('ROUTE');
    this.perList = this.authorizationService.getPermissions('ROUTE') == null ? [] : this.authorizationService.getPermissions('ROUTE');
    this.permissionsService.loadPermissions(this.perList);
    console.log('Permissions List', this.perList);
    this.getContract();
    //   this.spinner.show();
    this.model.search = 'ROUTE CODE';
    this.getAllRoutesWithCtr();
    //  this.getAllVehicle();
    this.acRoute.params.subscribe(x => {
      //console.log(x)
      if (x.editflow) {
        this.editflow = x.editflow;
      }
    })
    //console.log(this.editflow,'this is edit flow')
  }
  getContract() {
    this.spinner.show();
    this.apiSer.get('secure/v1/networkcontract/' + AppSetting.contractId)
      .subscribe(response => {
        this.vehicleTypeStatus = response.data.responseData.nrmVehicleType == "MARKET VEHICLE" ? 1 : 0;
        this.getAllVehicle();
        this.spinner.hide();
      });
  }

  getAllVehicle() {
    this.spinner.show();
    let associateId = AppSetting.associateId;
    this.apiSer.get(`secure/v1/associates/vehicles/associate/${associateId}`).subscribe(res => {
      if (res && res.data) {
        //  debugger
        this.vehicleClone=JSON.parse(JSON.stringify(res.data.responseData));
        let newtemp = res.data.responseData;
        newtemp.forEach(element => {
          if (this.vehicleTypeStatus == element.vendorMktFlag) {
            this.tempArr.push(this.setVehicle(element, res.data.referenceData));
          }
        });
        this.spinner.hide();
      }
    }, (error) => {
      this.isVehicleRequestCompleted = true;
      this.tosterservice.error(error.error.errors.error[0].description);
    }, () => {
      this.isVehicleRequestCompleted = true;
    });
    //  

  }
  getAllRoutesWithCtr() {
    this.spinner.show();
    //   let contractId = AppSetting.contractId;
    this.apiSer.get(`secure/v1/networkcontract/contracts/routes/${AppSetting.contractId}`)
      .subscribe(res => {

        if (res && Object.keys(res.data.responseData).length > 0) {

          this.existBranch = [res.data.responseData];
          this.referenceData = res.data.referenceData;
          this.branches = this.existBranch;
          if (this.existBranch && this.existBranch.length > 0) {
            this.existBranch.forEach(element => {
              element.checked = true;
              element.nrmAssignVehicles.forEach(obj => {
                obj.checked = true;
              });
            });
          }
          this.dataSource = [...this.existBranch]
          this.spinner.hide();
        }
      }, (error) => {
        this.tosterservice.error(error.error.errors.error[0].description);
      });

  }

  openSearchBranchModal() {
    const dialogRef = this.dialog.open(SearchBranchComponent, {
      data: { data: this.branches, referenceData: this.referenceData },
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.searchType) {
        this.SearchType = result.searchType
      }
      if (result != undefined && result.userBranch) {
        this.userBranch = result.userBranch; // Defult Branch Data
        this.DefaultB = result.defaultBranch;   // Defult Branch Data
      }
      if (result != undefined && result.defaultBranch) {
        let existBranch = [];
        result.defaultBranch.forEach(element => {
          if (this.todaydate) { //if server time persist
            element.effectiveDate_min = this.todaydate;
            element.expiryDate_min = this.todaydate;
          } else {
            element.effectiveDate_min = new Date();
            element.expiryDate_min = new Date();
          }
          // effective
          element.effectiveDate_max = null;
          // expiry
          element.expiryDate_max = null;
          this.setBranchWithVecle(element);
        });
        if (existBranch.length > 0) {
          this.tosterservice.info(`Branch Name  ${existBranch} already exists in List`);
        }

      }
      if (result.defaultBranch) {
        this.branches = result.defaultBranch;
        this.existBranch = this.branches;
        this.dataSource = new MatTableDataSource(this.branches);
      }

    });

  }

  setBranchWithVecle(element) {
    element.nrmAssignVehicles = [];
    element.assocCntrId = AppSetting.contractId;
  }

  checkInPriviArry = (objArray, val) => {
    for (var i = 0; i < objArray.length; i++) {
      if (objArray[i].branchId == val.branchId) {
        return true;
      }
    }
    return false;
  };

  submit(btnName) {
    // debugger
    this.spinner.show();
    let fdata;
    if (this.existBranch.length != 0 && this.dataSource.length >= 1) {
      console.log("going to update", this.existBranch, this.dataSource);
      let a = this.dataSource.filter(word => word.nrmAssignVehicles);
      if (this.existBranch[0].id == a[0].id) {
        fdata = this.existBranch[0];
        delete fdata.checked;
        fdata.nrmAssignVehicles.forEach(obj => {
          delete obj.checked;
        });
        AppSetting.routeId = fdata.id;

      } else {
        let changeData: any = a[0];
        fdata = this.existBranch[0];
        delete fdata.checked;
        fdata.destinationBranchId = changeData.destinationBranchId;
        fdata.routeCode = changeData.routeCode;
        fdata.routeId = changeData.id;
        fdata.routeModeId = changeData.routeModeId;
        fdata.sourceBranchId = changeData.sourceBranchId;
        fdata.touchPointFlag = changeData.touchPointFlag;

        fdata.nrmAssignVehicles.forEach(obj => {
          delete obj.checked;
          obj.bodyHeight = changeData.nrmAssignVehicles[0].bodyHeight;
          obj.bodyLength = changeData.nrmAssignVehicles[0].bodyLength;
          obj.bodyWidth = changeData.nrmAssignVehicles[0].bodyWidth;
          obj.vehicleId = changeData.nrmAssignVehicles[0].vehicleId;
          obj.vehicleModel = changeData.nrmAssignVehicles[0].vehicleModel;
          obj.vehicleNumber = changeData.nrmAssignVehicles[0].vehicleNumber;
          obj.vehicleTonnge = changeData.nrmAssignVehicles[0].vehicleTonnge;
        });
      }

    //  console.log("post route", JSON.stringify(fdata))
      this.apiSer.post(`secure/v1/networkcontract/contracts/routes`, fdata).subscribe(res => {
        if (res.data.responseData) {
          this.tosterservice.success('Saved Successfully');
          if (btnName == 'next') {
            this.spinner.hide();
            AppSetting.routeId = res.data.responseData;
            if (this.editflow) {
              this.router.navigate(['/asso_network-contract/commercial', { steper: true, editflow: this.editflow }], { skipLocationChange: true });
            } else {
              this.router.navigate(['/asso_network-contract/commercial'], { skipLocationChange: true });
            }
          } else {
            this.getAllRoutesWithCtr();
            this.tempArr = [];
            this.dataSource = [];
            this.existBranch = [];
            //   this.getAllVehicle();
            // this.tempArr=[];
            this.getContract();
            this.spinner.hide();
          }
        }
      }, (error) => {
        this.tosterservice.error(error.error.errors.error[0].description);
        this.spinner.hide();
      });

    } else if (this.existBranch.length == 0 && this.dataSource.length != 0) {
      let a = this.dataSource.filter(word => word.nrmAssignVehicles);
      fdata = a[0];
      fdata["routeId"] = fdata.id;
      fdata["assocCntrId"] = AppSetting.contractId;
      delete fdata.nrmAssignVehicles[0].branchName;
      delete fdata.nrmAssignVehicles[0].checked;
      delete fdata.id;
      delete fdata.checked;
      this.apiSer.post(`secure/v1/networkcontract/contracts/routes`, fdata).subscribe(res => {
        if (res.data.responseData) {
          this.tosterservice.success('Saved Successfully');
          if (btnName == 'next') {
            this.spinner.hide();
            AppSetting.routeId = res.data.responseData;
            this.router.navigate(['asso_network-contract/commercial'], { skipLocationChange: true }).then(nav => {
            }, err => {
            });
          } else {
            this.getAllRoutesWithCtr();
            //  this.getAllVehicle();
            this.tempArr = [];
            this.dataSource = [];
            this.existBranch = [];
            this.getContract();
            this.spinner.hide();
          }
        }
      }, (error) => {
        this.tosterservice.error(error.error.errors.error[0].description);
        this.spinner.hide();
      });
    }
    // if (this.existBranch.length != 0 && this.dataSource.length == 1) {
    //   fdata = this.existBranch[0];
    //   delete fdata.checked;
    //   fdata.nrmAssignVehicles.forEach(obj => {
    //     delete obj.checked;
    //   });
    //   AppSetting.routeId = fdata.id;
    //   //console.log("post route",JSON.stringify(fdata))
    //   this.apiSer.post(`secure/v1/networkcontract/contracts/routes`, fdata).subscribe(res => {
    //     if (res.data.responseData) {
    //       this.tosterservice.success('Saved Successfully');
    //       if (btnName == 'next') {

    //         if(this.editflow){
    //           this.router.navigate(['/asso_network-contract/commercial', { steper: true, editflow: this.editflow }],{skipLocationChange: true});
    //         } else {
    //         this.router.navigate(['/asso_network-contract/commercial'],{skipLocationChange: true});
    //         }
    //       } else {
    //         this.getAllRoutesWithCtr();
    //     //    this.getAllVehicle();
    //         this.tempArr=[];
    //         this.dataSource=[];
    //         this.getContract();

    //         this.spinner.hide();
    //       }
    //     }
    //   });

    // }else if(this.existBranch.length != 0 && this.dataSource.length > 1){
    //   //console.log("going to update",this.existBranch,this.dataSource);
    //   let a = this.dataSource.filter(word => word.nrmAssignVehicles);
    //   let changeData:any=a[0];
    //   fdata = this.existBranch[0];
    //   delete fdata.checked;
    //   fdata.destinationBranchId=changeData.destinationBranchId;
    //   fdata.routeCode= changeData.routeCode;
    //   fdata.routeId= changeData.id;
    //   fdata.routeModeId= changeData.routeModeId;
    //   fdata. sourceBranchId= changeData.sourceBranchId;
    //   fdata.touchPointFlag=changeData.touchPointFlag;

    //   fdata.nrmAssignVehicles.forEach(obj => {
    //        delete obj.checked;
    //        obj.bodyHeight =changeData.nrmAssignVehicles[0].bodyHeight;
    //        obj.bodyLength = changeData.nrmAssignVehicles[0].bodyLength;
    //        obj.bodyWidth = changeData.nrmAssignVehicles[0].bodyWidth;
    //        obj.vehicleId = changeData.nrmAssignVehicles[0].vehicleId;
    //        obj.vehicleModel= changeData.nrmAssignVehicles[0].vehicleModel;
    //        obj.vehicleNumber= changeData.nrmAssignVehicles[0].vehicleNumber;
    //        obj.vehicleTonnge= changeData.nrmAssignVehicles[0].vehicleTonnge;
    //   });

    // //  //console.log("post route",JSON.stringify(fdata))
    //   this.apiSer.post(`secure/v1/networkcontract/contracts/routes`, fdata).subscribe(res => {
    //     if (res.data.responseData) {
    //       this.tosterservice.success('Saved Successfully');
    //       if (btnName == 'next') {
    //         this.spinner.hide();
    //         AppSetting.routeId = res.data.responseData;
    //         if(this.editflow){
    //           this.router.navigate(['/asso_network-contract/commercial', { steper: true, editflow: this.editflow }],{skipLocationChange: true});
    //         } else {
    //         this.router.navigate(['/asso_network-contract/commercial'],{skipLocationChange: true});
    //         }
    //       } else {
    //         this.getAllRoutesWithCtr();
    //         this.tempArr=[];
    //         this.dataSource=[];
    //      //   this.getAllVehicle();
    //        // this.tempArr=[];
    //        this.getContract();
    //         this.spinner.hide();
    //       }
    //     }
    //   },(error)=>{
    //      this.tosterservice.error(error.error.errors.error[0].description); 
    //      this.spinner.hide();
    //     });

    // } else if(this.existBranch.length == 0 && this.dataSource.length != 0) {
    //   let a = this.dataSource.filter(word => word.nrmAssignVehicles);
    //   fdata = a[0];
    //   fdata["routeId"] = fdata.id;
    //   fdata["assocCntrId"] = AppSetting.contractId;
    //   delete fdata.nrmAssignVehicles[0].branchName;
    //   delete fdata.nrmAssignVehicles[0].checked;
    //   delete fdata.id;
    //   delete fdata.checked;
    //   //console.log("post route",JSON.stringify(fdata))
    //   this.apiSer.post(`secure/v1/networkcontract/contracts/routes`, fdata).subscribe(res => {
    //     if (res.data.responseData) {
    //       this.tosterservice.success('Saved Successfully');
    //       if (btnName == 'next') {
    //         this.spinner.hide();
    //         AppSetting.routeId = res.data.responseData;
    //         this.router.navigate(['asso_network-contract/commercial'], {skipLocationChange: true}).then(nav => {
    //           //console.log(nav); // true if navigation is successful
    //         }, err => {
    //           //console.log(err) // when there's an error
    //         });
    //       } else {
    //         this.getAllRoutesWithCtr();
    //       //  this.getAllVehicle();
    //         this.tempArr=[];
    //         this.dataSource=[];
    //         this.getContract();
    //         this.spinner.hide();
    //       }
    //     }
    //   },(error)=>{
    //      this.tosterservice.error(error.error.errors.error[0].description); 
    //      this.spinner.hide();
    //     });
    // } 

  }

  validationBranchCheck(btnName) {
    let a = this.dataSource.filter(word => word.checked == true);
    if (a[0].nrmAssignVehicles == undefined || a[0].nrmAssignVehicles.length == 0) {
      this.tosterservice.info("Assign Vehicle !");
      return;
    }
    else if (this.dataSource && this.dataSource.length != 0 && a[0].nrmAssignVehicles.length != 0) {
  //    this.submit(btnName);
    var vechleStatus:any;
    let vehichFilterArray=a[0].nrmAssignVehicles.map((obj)=> {return obj.vehicleId});
   
    vehichFilterArray.forEach( element => {
      vechleStatus= this.vehicleClone.find(({id,vendorMktFlag})=>id == element && vendorMktFlag == this.vehicleTypeStatus);
      if(vechleStatus == undefined){
        return;
      }
    });
    if(vechleStatus){
       this.submit(btnName);
      }else{
        let message=this.vehicleTypeStatus?'Vehicle Not Alllowed For Market Contract, Please Remove!':'Vehicle Not Alllowed For Scheduled Contract,Please Remove!';   
        this.tosterservice.info(message);
      }

    } else {
      return;
    }
  }

  setVehicle(obj, ref) {
    if (ref) {
      ref.vehicleModelList.forEach(element => {
        if (obj.vehicleModelId == element.id) {
          obj.vehicleModel = element.vehicleModelName
        }
      });
    }
    let temp = {
      "branchName": [
        "string"
      ],
      // "id" : obj.id,
      "vendorMktFlag":obj.vendorMktFlag,
      "bodyHeight": obj.bodyHeight,
      "bodyLength": obj.bodyLength,
      "bodyWidth": obj.bodyWidth,
      "refBranchName": obj.refBranchName,
      "status": obj.status,
      "vehicleId": obj.id,
      "vehicleModel": obj.vehicleModel,
      "vehicleNumber": obj.vehicleNum,
      "vehicleTonnge": obj.vehicleTonnge ? obj.vehicleTonnge : obj.modelCargoCapacity,
      "checked": false, 
      "expDt" : obj.expDt
    }
    return temp;

  }

  openAssignVehicleModal(obj) {

    const vehicle = JSON.parse(JSON.stringify(this.tempArr));
    const dialogRef = this.dialog.open(AssignVehicleComponent, {
      data: { 'tempVehicle': vehicle, 'obj': obj , 'vehicleTypeStatus': this.vehicleTypeStatus},
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }
  deleteBranch(element) {
    this.dataSource.data = this.branches = this.branches.filter(function (obj) {
      return obj.branchId !== element.branchId;
    });
  }


  //------------------Route start-------------

  advanceDefaultBranchName(obj) {
    if (obj.length > 2) {
      if (this.model.search == "ROUTE CODE") {
        let searcgObj = this.model.searchbyroutecode.toUpperCase();
        this.spinner.show();
        this.apiSer.get(`secure/v1/routes/${searcgObj}`).subscribe(
          data => {
            if (data.status == 'SUCCESS' && data.data.responseData.length > 0) {

             
              this.temTableData = data.data.responseData;
              this.temTableData.forEach((e) => {
                e['checked'] = false;
              });
              this.dataSource = [...this.temTableData];
              this.referenceData = data.data.referenceData;
              this.spinner.hide();
            }
            else {
              this.dataSource = [];
              this.spinner.hide();
              this.tosterservice.error(searcgObj + " Code is not Found !");
            }
          },
          error => {
            this.dataSource = [];
            this.tosterservice.error(searcgObj + " Code is not Found !");
            this.spinner.hide();
          });
      }
    } else {
      return;
    }
  }

  defaultSourceNDestinationBranch(sobj) {
    if (sobj) {
     let obj =  this.referenceData.branchList.find(({ branchId }) => branchId === sobj)
       if(obj !== undefined){
         return obj.branchName;
       } else {
         return '';
       }
    }
  }

  searchSourceDestion(obj) {
    this.model.searchbysourcebranch = this.model.searchbysourcebranch == null ? '' : this.model.searchbysourcebranch;
    this.model.searchbydestinationbranch = this.model.searchbydestinationbranch == null ? '' : this.model.searchbydestinationbranch;
    if (this.model.search == "LOCATION" || this.model.searchbysourcebranch || this.model.searchbydestinationbranch) {
      //  let searcgObj = this.model.searchbyroutecode.toUpperCase();
      let apiRoute;
      if (this.model.searchbydestinationbranch || this.model.searchbysourcebranch) {
        if (this.model.searchbydestinationbranch && this.model.searchbysourcebranch) {
          apiRoute = `secure/v1/routes/location?destinationBranchId=${this.model.searchbydestinationbranch}&sourceBranchId=${this.model.searchbysourcebranch}`
        } else if (this.model.searchbydestinationbranch) {
          apiRoute = `secure/v1/routes/location?destinationBranchId=${this.model.searchbydestinationbranch}`
        }
        else if (this.model.searchbysourcebranch) {
          apiRoute = `secure/v1/routes/location?sourceBranchId=${this.model.searchbysourcebranch}`
        }
      } else {
        apiRoute = `secure/v1/routes/location`
      }
      // if(`?destinationBranchId=${this.model.searchbydestinationbranch}&sourceBranchId=${this.model.searchbysourcebranch}`)
      this.spinner.show();
      this.apiSer.get(`${apiRoute}`).subscribe(
        data => {
          if (data.status == 'SUCCESS' && data.data.responseData.length > 0) {

            this.dataSource = [];
            this.dataSource = data.data.responseData;
            this.referenceData = data.data.referenceData;
            this.spinner.hide();
          }
          else {
            this.spinner.hide();
            this.dataSource = [];
            this.tableDataSourcSearch = [];
            this.tableDataDestinationSearch = [];
            this.tosterservice.error(`No Route Found !`);
            this.model.searchbysourcebranch = null;
            this.model.searchbydestinationbranch = null;
          }
        },
        error => {
          this.dataSource = [];
          this.tableDataSourcSearch = [];
          this.tableDataDestinationSearch = [];
          this.tosterservice.error(`No Route Founds !`);
          this.spinner.hide();
          this.model.searchbysourcebranch = null;
          this.model.searchbydestinationbranch = null
        });

    }
  }

  defaultMode(mobj) {

    if (mobj) {
      return this.referenceData.routeModeList.find(({ id }) => id === mobj).lookupVal;
    }

  }

  radiobuttonClick(robj) {
    this.dataSource.forEach((e) => {
      e['checked'] = false;
    });
    robj.checked = true;

  }
  tableDataSourcSearch: any = [];
  tableDataDestinationSearch: any = [];

  defaultSearchBySourceBranch(str) {
    if (str) {
      if (str.term.length > 2 && str.term) {

        this.apiSer.get(`secure/v1/routes/branchName/${str.term}`)
          .subscribe(success => {
            this.tableDataSourcSearch = []
            this.tableDataSourcSearch = success.data.responseData;
            for (let val of this.tableDataSourcSearch) {
              val["sourceBranchName"] = val.branchName;
              val["sourcecnBranchId"] = val.branchId;
            }
            //   this.tableDataLocSearchLength = this.tableDataLocSearch.length;          
          },
            error => {
              //  this.tosterservice.info('No Base Location found !!');
              //  this.spinner.hide();
            });
      }
    }

  }

  defaultSearchByDestinationBranch(str) {
    if (str) {
      if (str.term.length > 2 && str.term) {

        this.apiSer.get(`secure/v1/routes/branchName/${str.term}`)
          .subscribe(success => {
            this.tableDataDestinationSearch = []
            this.tableDataDestinationSearch = success.data.responseData;
            for (let val of this.tableDataDestinationSearch) {
              val["destinationBranchName"] = val.branchName;
              val["destinationBranchId"] = val.branchId;
            }
            //   this.tableDataLocSearchLength = this.tableDataLocSearch.length;   

          },
            error => {
              //  this.tosterservice.info('No Base Location found !!');
              //  this.spinner.hide();
            });
      }
    }

  }

  nextReadMode() {
    if(this.editflow){
      this.router.navigate(['asso_network-contract/commercial',{ steper:true,'editflow': 'true' }], {skipLocationChange: true});
    }else{
      this.router.navigate(['asso_network-contract/commercial'], {skipLocationChange: true});
    }
  }

  onClear(){}
  emptyData(){}

}
