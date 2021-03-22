import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSetting } from 'src/app/app.setting';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ErrorConstants } from 'src/app/core/models/constants';
import * as _ from 'lodash';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.css'],
  providers: [DatePipe]
})
export class CommercialComponent implements OnInit, AfterViewChecked {
  @ViewChild('commercialForm',{static:false}) commForm : NgForm;

  displayedColumns: string[] = ['vehicleNumber', 'vehicleModel', 'vehicleTonnage', 'HeightLengthWidth'];
  routeDisplayedColumns: string[] = ['routeTchpntId', 'eta', 'waitTime', 'departTime', 'transitTime'];
  dataSource: any;
  dataSourceClone: any;
  routeDataSource: any = [];
  vehicleTypeList = [];
  assocTypeList = [];
  associateRefData: any;
  maxdate: any;
  minDate: any = new Date();
  minDateStart: any = new Date();
  isValidEffectiveDt: boolean = false;
  isValidExpDt: boolean = false;
  contractDataObj: any;
  isDisableflag: boolean = true;
  editflow: boolean;
  routeData: any;
  teamScheduleTime: number;
  editedNrmRouteOperationalDays: any = [];
  editStatus: any;
  activeButtionIndex: number = 0;
  days = [
    { name: "Sunday", id: 0 },
    { name: "Monday", id: 1 },
    { name: "Tuesday", id: 2 },
    { name: "Wednesday", id: 3 },
    { name: "Thursday", id: 4 },
    { name: "Friday", id: 5 },
    { name: "Saturday", id: 6 }
  ];
  model: any = {
    "assocCntrId": AppSetting.contractId,
    "nrmAssignRouteId": AppSetting.routeId,
    "oprtnlWeekDayArray": [],
    //  "oprtnlWeekDay":"",
    "crtdBy": "user4",
    "crtdDt": "2020-08-16 23:31:20",
    "updBy": "user4",
    "updDt": "2020-08-16 23:31:20",
    "effectiveDt": null,
    "expDt": null,
    "extraDepartFlag": 0,
    "extraDepartRsn": " ",
    "routeSchId": "",
    "scheduleTime": "",
    "nrmRouteSchVehicles": [],
    "nrmRouteOperationalDays": [],
    "nrmRouteDetails": []
  };
  editedResponseData: any = [];
  editedReferenceData: any = {};
  nameOfrouteCode: string;
  exAttrMap = new Map();
  exAttrKeyList = [];
  perList: any = [];
  checkAllVehicle: boolean[] = [];
  activeRouteSchedules : any[] = [];

  constructor(private toast: ToastrService,
    private apiSer: ApiService,
    private spinner: NgxSpinnerService,
    public router: Router,
    private datePipe: DatePipe,
    private permissionsService: NgxPermissionsService,
    private authorizationService: AuthorizationService,
    private route: ActivatedRoute,
    private chageDetect : ChangeDetectorRef) { }

  ngAfterViewChecked() {
    this.chageDetect.detectChanges();   // detect changes 
  }

  ngOnInit() {
    this.authorizationService.setPermissions('COMMERCIAL');
    this.perList = this.authorizationService.getPermissions('COMMERCIAL') == null ? [] : this.authorizationService.getPermissions('COMMERCIAL');
    this.permissionsService.loadPermissions(this.perList);
    this.exAttrMap = this.authorizationService.getExcludedAttributes('ROUTE SCHEDULE CREATION');
    this.exAttrKeyList = Array.from(this.exAttrMap.values());
    console.log('Attribute List', this.exAttrKeyList);
    console.log('Permissions List', this.perList);
    this.route.params.subscribe(x => {
      this.editflow = x.editflow;
    });
    this.editStatus = AppSetting.editStatus;
    this.getContract();
    this.getRouteForComm().then(obj => {
      if (obj) {
        this.getCommercial().then(data => {
          this.spinner.hide();
        }
      );
      }
    })  
    //  this.getRoutes();
  }

  getCommercial() {
    return new Promise((resolve, reject) => {
          this.apiSer.get(`secure/v1/networkcontract/commercial/${AppSetting.contractId}/${this.routeData.id}`)
            .subscribe(res => {
              if (res.data.responseData.length === 0) {
                this.routeDataSource = [];

                this.editedReferenceData = { ...res.data.referenceData };
                if(this.editedReferenceData.route.routeSchedules.length > 0){
                  let todayDt =  this.datePipe.transform(new Date(), 'yyyy-MM-dd')
                  this.activeRouteSchedules =  this.editedReferenceData.route.routeSchedules.filter(x => {
                    let expDt = this.datePipe.transform(x.expiryDate, 'yyyy-MM-dd') 
                    if(expDt){
                      return x.status == 1 && expDt >= todayDt
                    } else {
                      return x.status == 1
                    }
                  });
                }
                this.model.routeSchId = this.activeRouteSchedules[0].id;
                this.model.scheduleTime = this.activeRouteSchedules[0].scheduleTime;
                // this.nameOfrouteCode = res.data.referenceData.route.routeSchedules[0].scheduleCode;
                this.nameOfrouteCode = res.data.referenceData.route.routeCode;

                let editSourceObj = {
                  routeType: 'S',
                  routeTchpntId: res.data.referenceData.route.sourceBranchId,
                  // eta: "",
                  // waitTime: "",
                  departTime: this.activeRouteSchedules[0].scheduleTime,
                  transitTime: "",
                  transitTimeMins : ""
                }
                this.routeDataSource.unshift(editSourceObj);
                if(this.activeRouteSchedules.length > 0){
                  this.activeRouteSchedules[0].routeScheduleTouchPointMapping.forEach(refmap => {
                  let touchpointObj = {
                    routeTchpntId: this.getTouchPointBranchID(refmap.routeTouchPointId),
                    eta: refmap.eta,
                    waitTime: isNaN(parseInt(refmap.waitTimeHrs)) ? '' : refmap.waitTimeHrs,
                    departTime: this.activeRouteSchedules[0].scheduleTime,
                    transitTime: refmap.transitTimeHrs,
                    transitTimeMins : refmap.transitTimeMins,  // add transit time minutes
                    waitTimeMins : refmap.waitTimeMins,    // add waiting Time minutes
                  }
                  this.routeDataSource.push(touchpointObj);
                });
              }

                let editDestinationObj = {
                  routeType: 'D',
                  routeTchpntId: res.data.referenceData.route.destinationBranchId,
                  eta: "",
                  // waitTime: "",
                  // departTime: "",
                  // transitTime: 0
                }
                this.routeDataSource.push(editDestinationObj);
                this.routeDataSource = [...this.routeDataSource];
                console.log('routeDataSource',this.routeDataSource)
                this.setVehicleData(undefined)

              } else {
                this.editedReferenceData = { ...res.data.referenceData };
                
                let referenceScheduleArray = [...this.editedReferenceData.route.routeSchedules];
                this.editedResponseData = [...res.data.responseData];

                if(referenceScheduleArray.length > 0){
                let existData = referenceScheduleArray.filter(x => this.editedResponseData.find(y=> x.id == y.routeSchId));
                if(existData != undefined){
                  let todayDt =  this.datePipe.transform(new Date(), 'yyyy-MM-dd')
                  existData.forEach(element => {
                  let expDt = this.datePipe.transform(element.expiryDate, 'yyyy-MM-dd') 
                    if(expDt){
                     if(element.status == 1 && expDt >= todayDt) {
                      element['isActive'] = true;
                      element['isSaved'] = true;
                     }
                    } else if(element.status == 1){
                      element['isActive'] = true;
                      element['isSaved'] = true;
                    } else {
                      element['isActive'] = false;
                      element['isSaved'] = true;
                    }
                 });
                }
                let filteredData = referenceScheduleArray.filter(x => !this.editedResponseData.find(y=> x.id == y.routeSchId ));
                let  notExistData =  []; 
                if(filteredData) {
                  notExistData = filteredData.filter(x => x.status ==1);
                  if(notExistData.length > 0){
                    notExistData.forEach(ele => ele['isSaved'] = false) 
                   }
                 }
                
                 this.activeRouteSchedules = [...existData,...notExistData]
                } else {
                  this.activeRouteSchedules = [];
                }
                this.setCommercialValue(res.data.responseData,res.data.referenceData,this.activeRouteSchedules);

              }
              resolve(true);
            }, error => {
              this.spinner.hide();
              reject(error);
            })
        }
    )

  }


  getRouteForComm() {
    this.spinner.show();
    return new Promise((resolve, reject) => {
      this.apiSer.get('secure/v1/networkcontract/contracts/routes/' + AppSetting.contractId).subscribe(data => {
        let ob = ErrorConstants.validateException(data);
        if (ob.isSuccess) {
          this.routeData = data.data.responseData;
          let routeID = this.routeData.id;
          this.model.nrmAssignRouteId = routeID;
          resolve(true);
        }
      }, error => {
        this.spinner.hide();
        reject(error);
      })
    })

  }


  getContract() {
    this.spinner.show();
    this.apiSer.get('secure/v1/networkcontract/' + AppSetting.contractId).subscribe(suc => {
      if (suc.data.responseData) {
        this.contractDataObj = suc.data.responseData;
      }
    }, (error) => {
      this.spinner.hide();
      this.toast.error(ErrorConstants.getValue(404));
    });
  }

  assginBranchName(obj) {
    if (obj) {
      let branchObj = this.editedReferenceData.branchList.find(({ branchId }) => branchId === obj.routeTchpntId);
      return branchObj != undefined ? branchObj.branchName : '';
    } else {
      return;
    }
  }



  /*---------- On change Effective Date --------------- */
  effectiveDate(isExpToUpdate) {
    let effYear = parseInt(this.datePipe.transform(this.model.effectiveDt, 'yyyy'))
    if (effYear > 9999) {
      this.model.effectiveDt = "";
    } else {
      // let a = this.datePipe.transform(this.minDateStart, 'yyyy-MM-dd')
      let b = this.datePipe.transform(this.model.effectiveDt, 'yyyy-MM-dd')
      let c = this.datePipe.transform(this.model.expDt, 'yyyy-MM-dd')
      // if (c && a) {
      //   if (a <= b && b < c) {
      //     this.isValidEffectiveDt = false;
      //   }
      //   else {
      //     this.isValidEffectiveDt = true;
      //   }
      // }
      // else
      if (c) {
        if (b < c) {
          this.isValidEffectiveDt = false;
        }
        else {
          this.isValidEffectiveDt = true;
        }
      }
      // else if (a) {
      //   if (b >= a) {
      //     this.isValidEffectiveDt = false;
      //   }
      //   else {
      //     this.isValidEffectiveDt = true;
      //   }
      // } else {
      //   this.isValidEffectiveDt = false;
      // }
      if (b) {
        let e = new Date(b);
        e.setDate(e.getDate() + 1);
        this.minDate = e;
      }

      if (this.model.transitTime != undefined || this.model.transitTimeMins != undefined) {
        this.countExpDate();
      }
      // this.countExpDate()
      // increment exp date by one year
      // if (isExpToUpdate && b && !this.isValidEffectiveDt) {
      //   let f = new Date(b);
      //   f.setFullYear(f.getFullYear() + 1);
      //   this.model.expDt = f;
      // }
    }
    //  this.expDate();
  }

  expDate() {
    let expYear = parseInt(this.datePipe.transform(this.model.expDt, 'yyyy'))
    if (expYear > 9999) {
      this.model.expDt = "";
    } else {
      let a = this.datePipe.transform(this.minDateStart, 'yyyy-MM-dd')
      let b = this.datePipe.transform(this.model.effectiveDt, 'yyyy-MM-dd')
      let c = this.datePipe.transform(this.model.expDt, 'yyyy-MM-dd')

      if (b && c) {
        if (b < c) {
          this.isValidExpDt = false;
        }
        else {
          this.isValidExpDt = true;
        }
      } else if (a && c) {
        if (a < c) {
          this.isValidExpDt = false;
        }
        else {
          this.isValidExpDt = true;
        }
      } else {
        this.isValidExpDt = false;
      }
      if (c) {
        var e = new Date(c);
        e.setDate(e.getDate() - 1);
        this.maxdate = e;
      }
    }
  }

  save(flage: boolean) {
    let a = this.dataSource.filter(word => word.checked == true);
    if (a.length == 0) {
      this.toast.info("Assign Vehicle !");
      return;
    }

    this.spinner.show();
    this.routeOperationalDay();
    this.model.effectiveDt = this.datePipe.transform(this.model.effectiveDt, 'yyyy-MM-dd');
    this.model.expDt = this.datePipe.transform(this.model.expDt, 'yyyy-MM-dd');
    this.model.extraDepartFlag = this.model.extraDepartFlag ? 1 : 0;
    if (this.model.effectiveDt == null || this.model.transitTime == undefined) {
      this.spinner.hide();
      return;
    }

    if (this.model.id) {
      this.model.assocCntrId = AppSetting.contractId;
      this.model.nrmRouteDetails = [...this.routeDataSource];
      if (!this.model.nrmRouteDetails[0].id) {
        this.checkRouteDetails(true);
      }
      this.routeDataSource.forEach(obj => {
        delete obj.routeType;
      });
      this.checkVechicalList(this.dataSource, true);
      console.log('model post', this.model)
      this.apiSer.post('secure/v1/networkcontract/commercial', JSON.parse(JSON.stringify(this.model)))
        .subscribe(res => {
          this.routeDataSource = [];
          this.getContract();
          console.log('this.editedResponseData.length', this.editedResponseData.length)
          this.toast.success('Saved Successfully');

          this.getCommercial().then(data => {

            if (flage) {
              if (this.editedResponseData.length >= 1) {
                if (this.editflow) {
                  this.router.navigate(['/asso_network-contract/payment-terms', { steper: true, editflow: this.editflow }], { skipLocationChange: true });
                } else {
                  this.router.navigate(['/asso_network-contract/payment-terms'], { skipLocationChange: true });
                }

              } else {
                this.toast.info("Please add at least one schedule !");
              }
            }
            this.spinner.hide();
          });
          // this.spinner.hide();

          // if(this.model.id ? this.editedResponseData.length  == this.editedReferenceData.route.routeSchedules.length : true){
          // if(this.editedResponseData.length  == this.editedReferenceData.route.routeSchedules.length){


        }, (error) => {
          this.spinner.hide();
          this.toast.error(error.error.errors.error[0].description);
        });

    } else {
      this.checkVechicalList(this.dataSource, false);
      this.checkRouteDetails(false);
      if (this.model.nrmRouteSchVehicles.length == 0 || this.model.nrmRouteOperationalDays.length == 0) {
        this.spinner.hide();
        return;
      }
      this.apiSer.post('secure/v1/networkcontract/commercial', JSON.parse(JSON.stringify(this.model)))
        .subscribe(res => {
          this.routeDataSource = [];
          this.getContract();

          this.toast.success('Saved Successfully');
          // this.spinner.hide();
          this.getCommercial().then(data => {
            if (flage) {
              if (this.editedResponseData.length >= 1) {
                if (this.editflow) {
                  this.router.navigate(['/asso_network-contract/payment-terms', { steper: true, editflow: this.editflow }], { skipLocationChange: true });
                } else {
                  this.router.navigate(['/asso_network-contract/payment-terms'], { skipLocationChange: true });
                }

              } else {
                this.toast.info("Please add at least one schedule !");
              }
            }
            this.spinner.hide();
          });

        }, (error) => {
          this.spinner.hide();
          this.toast.error(error.error.errors.error[0].description);
        });

    }
  }

  checkVechicalList(dobj, flag: boolean) {
    if (flag) {
      dobj.forEach(element => {
        if (element.checked) {
          let nrem = this.model.nrmRouteSchVehicles.find(x => x.vehicleId == element.vehicleId);
          if (nrem == undefined) {
            let editNewObj: any = {
              "nrmCmrclId": this.model.id,
              "effectiveDt": this.model.effectiveDt,
              "expDt": this.model.expDt,
              "crtdBy": this.contractDataObj.crtdBy,
              "crtdDt": this.contractDataObj.crtdDt,
              "updBy": this.contractDataObj.updBy,
              "updDt": this.contractDataObj.updDt,
              "vehicleId": element.vehicleId
            }
            if (this.editflow) {
              editNewObj.status = this.editStatus;
              this.model.status = this.editStatus;
            }
            this.model.nrmRouteSchVehicles.push(editNewObj);
          }
        } else {
          let nrem = this.model.nrmRouteSchVehicles.find(x => x.vehicleId == element.vehicleId);
          if (nrem != undefined) {
            _.remove(this.model.nrmRouteSchVehicles, function (e) {
              return e.vehicleId == element.vehicleId;
            });
          }
        }

      });
    } else {
      let editedVechicalArray: any = [];
      dobj.forEach(element => {
        if (element.checked) {
          let newObj: any = {
            "effectiveDt": this.model.effectiveDt,
            "expDt": this.model.expDt,
            "crtdBy": this.contractDataObj.crtdBy,
            "crtdDt": this.contractDataObj.crtdDt,
            "updBy": this.contractDataObj.updBy,
            "updDt": this.contractDataObj.updDt,
            "vehicleId": element.vehicleId
          }
          editedVechicalArray.push(newObj);
        }
      });
      this.model.nrmRouteSchVehicles = [...editedVechicalArray];
    }

  }

  routeOperationalDay() {
    let editedOperationalDayArray: any = [];
    if (this.model.oprtnlWeekDayArray.length == 0) {
      return;
    }
    else {

      this.model.oprtnlWeekDayArray.forEach(element => {
        let fdata = this.model.nrmRouteOperationalDays.find(({ oprtnlWeekDay }) => oprtnlWeekDay == element);
        if (fdata) {
          editedOperationalDayArray.push(fdata);
        }
        else {
          let newObj: any = {
            "effectiveDt": this.model.effectiveDt,
            "expDt": this.model.expDt,
            "crtdBy": this.contractDataObj.crtdBy,
            "crtdDt": this.contractDataObj.crtdDt,
            "updBy": this.contractDataObj.updBy,
            "updDt": this.contractDataObj.updDt,
            "oprtnlWeekDay": element
          }
          if (this.editflow) {
            newObj.status = this.editStatus;
            this.model.status = this.editStatus;
          }
          editedOperationalDayArray.push(newObj);
        }
      });
      this.model.nrmRouteOperationalDays = [...editedOperationalDayArray]
    }
  }
  checkRouteDetails(status: boolean) {
    if (status) {
      let editarray: any = [];
      this.routeDataSource.forEach(element => {

        if (!element.routeType) {
          let newObj = {
            "nrmCmrclId": this.model.id,
            "effectiveDt": this.model.effectiveDt,
            "expDt": this.model.expDt,
            "crtdBy": this.contractDataObj.crtdBy,
            "crtdDt": this.contractDataObj.crtdDt,
            "updBy": this.contractDataObj.updBy,
            "updDt": this.contractDataObj.updDt,
            "routeTchpntId": element.routeTchpntId,
            "transitTime": element.transitTime,
            "transitTimeMins" : element.transitTimeMins,
            //   "departTime": this.model.effectiveDt + " " + "08:00:00",
            "departTime": element.departTime,
            "waitTime": element.waitTime,
            "waitTimeMins": element.waitTimeMins, 
            //     "eta": this.model.effectiveDt + " " + element.eta
            "eta": element.eta
          }
          editarray.push(newObj);
          this.model.nrmRouteDetails = [...editarray];
        } else {
          if (element.routeType == 'S') {
            let newObj = {
              "nrmCmrclId": this.model.id,
              "effectiveDt": this.model.effectiveDt,
              "expDt": this.model.expDt,
              "crtdBy": this.contractDataObj.crtdBy,
              "crtdDt": this.contractDataObj.crtdDt,
              "updBy": this.contractDataObj.updBy,
              "updDt": this.contractDataObj.updDt,
              "routeTchpntId": element.routeTchpntId,
              "transitTime": element.transitTime,
              "transitTimeMins" : element.transitTimeMins,
              //     "departTime": this.model.effectiveDt + " " + "08:00:00",
              "departTime": element.departTime
            }
            editarray.push(newObj);
            this.model.nrmRouteDetails = [...editarray];
          } else {
            let newObj = {
              "nrmCmrclId": this.model.id,
              "effectiveDt": this.model.effectiveDt,
              "expDt": this.model.expDt,
              "crtdBy": this.contractDataObj.crtdBy,
              "crtdDt": this.contractDataObj.crtdDt,
              "updBy": this.contractDataObj.updBy,
              "updDt": this.contractDataObj.updDt,
              "routeTchpntId": element.routeTchpntId,
              //    "waitTime": element.waitTime,
              //    "eta": this.model.effectiveDt + " " + element.eta
              "eta": element.eta
            }
            editarray.push(newObj);
            this.model.nrmRouteDetails = [...editarray];

          }
        }

      });


    } else {
      let editarray: any = [];
      this.routeDataSource.forEach(element => {

        if (!element.routeType) {
          let newObj = {
            "effectiveDt": this.model.effectiveDt,
            "expDt": this.model.expDt,
            "crtdBy": this.contractDataObj.crtdBy,
            "crtdDt": this.contractDataObj.crtdDt,
            "updBy": this.contractDataObj.updBy,
            "updDt": this.contractDataObj.updDt,
            "routeTchpntId": element.routeTchpntId,
            "transitTime": element.transitTime,
            "transitTimeMins" : element.transitTimeMins,
            //   "departTime": this.model.effectiveDt + " " + "08:00:00",
            "departTime": element.departTime,
            "waitTime": element.waitTime,
             "waitTimeMins" : element.waitTimeMins,
            //     "eta": this.model.effectiveDt + " " + element.eta
            "eta": element.eta
          }
          editarray.push(newObj);
          this.model.nrmRouteDetails = [...editarray];
        } else {
          if (element.routeType == 'S') {
            let newObj = {
              "effectiveDt": this.model.effectiveDt,
              "expDt": this.model.expDt,
              "crtdBy": this.contractDataObj.crtdBy,
              "crtdDt": this.contractDataObj.crtdDt,
              "updBy": this.contractDataObj.updBy,
              "updDt": this.contractDataObj.updDt,
              "routeTchpntId": element.routeTchpntId,
              "transitTime": element.transitTime,
              "transitTimeMins" : element.transitTimeMins,
              //     "departTime": this.model.effectiveDt + " " + "08:00:00",
              "departTime": element.departTime
            }
            editarray.push(newObj);
            this.model.nrmRouteDetails = [...editarray];
          } else {
            let newObj = {
              "effectiveDt": this.model.effectiveDt,
              "expDt": this.model.expDt,
              "crtdBy": this.contractDataObj.crtdBy,
              "crtdDt": this.contractDataObj.crtdDt,
              "updBy": this.contractDataObj.updBy,
              "updDt": this.contractDataObj.updDt,
              "routeTchpntId": element.routeTchpntId,
              //    "waitTime": element.waitTime,
              //    "eta": this.model.effectiveDt + " " + element.eta
              "eta": element.eta
            }
            editarray.push(newObj);
            this.model.nrmRouteDetails = [...editarray];

          }
        }

      });

    }

  }


  setCommercialValue(obj, refObj,activeSchedules) {

    this.routeDataSource = [];

    //let indexData = obj.filter((item) => { return item.routeSchId == refObj.route.routeSchedules[0].id });
    let indexData;
    let currentSchedule;
    for(let i=0; i< activeSchedules.length ; i++){
      let firstEle = obj.find(x => x.routeSchId == activeSchedules[i].id);
      if(firstEle != undefined){
        indexData = firstEle;
        currentSchedule = activeSchedules[i];
        break;
      }
    }

    var element = JSON.parse(JSON.stringify(indexData));
    let foundSourceId = element.nrmRouteDetails.find(({ routeTchpntId }) => routeTchpntId == refObj.route.sourceBranchId);
    let foundDestinationId = element.nrmRouteDetails.find(({ routeTchpntId }) => routeTchpntId == refObj.route.destinationBranchId);
    this.setVehicleData(indexData)
    if (foundSourceId && foundDestinationId) {
      this.model = { ...element };
      this.editedNrmRouteOperationalDays = element.nrmRouteOperationalDays;
      this.model.oprtnlWeekDayArray = element.nrmRouteOperationalDays.map(x => x.oprtnlWeekDay);
      this.model.extraDepartFlag = element.extraDepartFlag == 1 ? true : false;
      this.model.scheduleTime = currentSchedule.scheduleTime;
      // this.nameOfrouteCode = refObj.route.routeSchedules[0].scheduleCode;
      this.nameOfrouteCode = refObj.route.routeCode;

      element.nrmRouteDetails.forEach(data => {
        if (refObj.route.sourceBranchId == data.routeTchpntId) {
          let newObjS = {
            "routeType": 'S',
            "routeTchpntId": data.routeTchpntId,
            //   "eta": "",
            //   "waitTime": "",
            //        "departTime": moment(data.departTime).format('HH:mm:ss'),
            "departTime": data.departTime,
            "transitTime": data.transitTime,
            "transitTimeMins" : data.transitTimeMins,
            "crtdBy": data.crtdBy,
            "crtdDt": data.crtdDt,
            "effectiveDt": data.effectiveDt,
            "expDt": data.expDt,
            "id": data.id,
            "nrmCmrclId": data.nrmCmrclId,
            "recIdentifier": data.recIdentifier,
            "status": data.status,
            "updBy": data.updBy,
            "updDt": data.updDt

          }
          this.routeDataSource.unshift(newObjS);
        }
        else if (refObj.route.destinationBranchId == data.routeTchpntId) {
          let newObjD = {
            "routeType": 'D',
            "routeTchpntId": data.routeTchpntId,
            //     "eta": moment(data.eta).format('HH:mm:ss'),
            "eta": data.eta,
            "waitTime": data.waitTime,
            "waitTimeMins" : data.waitTimeMins,
            //    "departTime": moment(data.departTime).format('HH:mm:ss'),
            "departTime": data.departTime,
            "transitTime": data.transitTime,
            "transitTimeMins" : data.transitTimeMins,
            "crtdBy": data.crtdBy,
            "crtdDt": data.crtdDt,
            "effectiveDt": data.effectiveDt,
            "expDt": data.expDt,
            "id": data.id,
            "nrmCmrclId": data.nrmCmrclId,
            "recIdentifier": data.recIdentifier,
            "status": data.status,
            "updBy": data.updBy,
            "updDt": data.updDt
          }
          this.routeDataSource.push(newObjD);
        } else {
          let newObjT = {
            "routeTchpntId": data.routeTchpntId,
            //   "eta": moment(data.eta).format('HH:mm:ss'),
            "eta": data.eta,
            "waitTime": data.waitTime,
            //       "departTime": moment(data.departTime).format('HH:mm:ss'),
            "departTime": data.departTime,
            "transitTime": data.transitTime,
            "transitTimeMins" : data.transitTimeMins,  // add transit time minutes
            "waitTimeMins" : data.waitTimeMins,    // add waiting Time minutes
            "crtdBy": data.crtdBy,
            "crtdDt": data.crtdDt,
            "effectiveDt": data.effectiveDt,
            "expDt": data.expDt,
            "id": data.id,
            "nrmCmrclId": data.nrmCmrclId,
            "recIdentifier": data.recIdentifier,
            "status": data.status,
            "updBy": data.updBy,
            "updDt": data.updDt
          }
          this.routeDataSource.push(newObjT);
        }
      });
    } else {
      //this.dataSource = Object.assign([], this.dataSourceClone);
      this.model.routeSchId = currentSchedule.id;
      this.model.scheduleTime = currentSchedule.scheduleTime;

      let editSourceObj = {
        routeType: 'S',
        routeTchpntId: refObj.route.sourceBranchId,
        departTime: currentSchedule.scheduleTime,
        transitTime: "",
        transitTimeMins : ""  // add transit time minutes
      }
      this.routeDataSource.unshift(editSourceObj);

      if(this.activeRouteSchedules.length > 0){
        this.activeRouteSchedules[0].routeScheduleTouchPointMapping.forEach(refmap => {
        let touchpointObj = {
          routeTchpntId: this.getTouchPointBranchID(refmap.routeTouchPointId),
          eta: refmap.eta,
          waitTime: isNaN(parseInt(refmap.waitTimeHrs)) ? '' : parseInt(refmap.waitTimeHrs),
          departTime: currentSchedule.scheduleTime,
          transitTime: refmap.transitTimeHrs,
          transitTimeMins : refmap.transitTimeMins,  // add transit time minutes
          waitTimeMins : refmap.waitTimeMins,    // add waiting Time minutes
        }
        this.routeDataSource.push(touchpointObj);
      });
    }

      let editDestinationObj = {
        routeType: 'D',
        routeTchpntId: refObj.route.destinationBranchId,
        eta: "",
        // waitTime: "",
        // departTime: "",
        // transitTime: 0
      }
      this.routeDataSource.push(editDestinationObj);
      this.routeDataSource = [...this.routeDataSource];

    }
  
    const destinationObj = this.routeDataSource.find((item) => item.routeType == 'D');
    const removeDestination = this.routeDataSource.filter((item) => item.routeType !== 'D');
    removeDestination.push(destinationObj);
    this.routeDataSource = [...removeDestination];
    console.log('routeDatasource',this.routeDataSource)

  }

  editInputTransit(timeObj, inx) {
    if (parseInt(timeObj.departTime) >= 0) {
      var date2 = moment(timeObj.departTime, 'HH:mm:ss')
        .add((timeObj.transitTime == '' || timeObj.transitTime == undefined) ? 0 : timeObj.transitTime, 'hours')
        .add(0, 'seconds')
        .add((timeObj.transitTimeMins == '' || timeObj.transitTimeMins == undefined) ? 0 : timeObj.transitTimeMins, 'minutes')
        .format('HH:mm:ss');

        if(inx + 1 <= this.routeDataSource.length - 1){
          this.routeDataSource[inx + 1].eta = date2;
          if(parseInt(timeObj.departTime) >= 0) {
            this.editInputWaiting(this.routeDataSource[inx + 1], inx + 1)
           }
        } 
        this.countExpDate();
     
    }
  }

  editInputWaiting(timeObj, inx) {
    if (parseInt(timeObj.eta) >= 0) {

      var date3 = moment(timeObj.eta, 'HH:mm:ss')
        .add((timeObj.waitTime == '' || timeObj.waitTime == undefined) ? 0 : timeObj.waitTime , 'hours')
        .add(0, 'seconds')
        .add((timeObj.waitTimeMins == '' || timeObj.waitTimeMins == undefined) ? 0 : timeObj.waitTimeMins , 'minutes')
        .format('HH:mm:ss');
        this.routeDataSource[inx].departTime = date3;
        this.countExpDate();
      // if (this.routeDataSource.length == inx + 1) {
        
      //   this.countExpDate()
      // }
      if(parseInt(timeObj.eta) >= 0) {
        this.editInputTransit(this.routeDataSource[inx], inx)
      }

    }

  }

  numericOnly(event): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }

  countExpDate() {
    let totalTime: number = 0;
    let totalMinutes  = 0;
    let totalTransitTime = 0;
    let totalTransitMins = 0;
   
    this.routeDataSource.forEach(element => {
      if (element.transitTime != undefined && element.transitTime != "") { // add transit time hours
        totalTime = totalTime + parseInt(element.transitTime);
        totalTransitTime = totalTransitTime + parseInt(element.transitTime);
      }
      if(element.transitTimeMins != undefined && element.transitTimeMins != "") { // add transit time minutes
        totalMinutes = totalMinutes + parseInt(element.transitTimeMins);
        totalTransitMins = totalTransitMins + parseInt(element.transitTimeMins);
      }
      if (element.waitTime != undefined && element.waitTime != "") { // add waiting time minutes
        totalTransitTime = totalTransitTime + parseInt(element.waitTime);
      }
      if(element.waitTimeMins != undefined && element.waitTimeMins != "") { // add waiting time minutes
        totalTransitMins = totalTransitMins + parseInt(element.waitTimeMins);
      }
      // if (parseInt(element.waitTime) >= 0 && parseInt(element.transitTime) >= 0) {
      //   totalTime = totalTime + parseInt(element.waitTime); 
      // }
    });
   
   let hour = Math.floor(totalTransitMins/60)
   let min = totalTransitMins % 60;
   if(hour >= 1){
    totalTransitTime = totalTransitTime + hour;
   }

    this.model.transitTime = totalTransitTime;
    this.model.transitTimeMins = min;
    
  }

  assignScheduleTime(obj, refOBj, index: number) {
    this.activeButtionIndex = index;
    this.spinner.show();
    let dataFilteById = this.editedResponseData.filter((item) => { return item.routeSchId == obj.id });
    this.nameOfrouteCode = this.editedReferenceData.route.routeCode;
    if (dataFilteById.length == 0) {
      this.model = {
        "assocCntrId": AppSetting.contractId,
        "nrmAssignRouteId": this.routeData.id,
        "oprtnlWeekDayArray": [],
        "crtdBy": "user4",
        "crtdDt": "2020-08-16 23:31:20",
        "updBy": "user4",
        "updDt": "2020-08-16 23:31:20",
        "effectiveDt": null,
        "expDt": null,
        "extraDepartFlag": 0,
        "extraDepartRsn": " ",
        "routeSchId": "",
        "scheduleTime": "",
        "nrmRouteSchVehicles": [],
        "nrmRouteOperationalDays": [],
        "nrmRouteDetails": []
      };
      this.routeDataSource = [];
      this.model.routeSchId = obj.id;
      this.model.scheduleTime = obj.scheduleTime;
      this.nameOfrouteCode = this.editedReferenceData.route.routeCode;

      let editSourceObj = {
        routeType: 'S',
        routeTchpntId: refOBj.route.sourceBranchId,
        // eta: "",
        // waitTime: "",
        departTime: obj.scheduleTime,
        transitTime: "",
        transitTimeMins : ""  // add transit time minutes
      }
      this.routeDataSource.unshift(editSourceObj);

      obj.routeScheduleTouchPointMapping.forEach(refmap => {
        let touchpointObj = {
          routeTchpntId: this.getTouchPointBranchID(refmap.routeTouchPointId),
          eta: refmap.eta,
          waitTime: isNaN(parseInt(refmap.waitTimeHrs)) ? '' : parseInt(refmap.waitTimeHrs),
          departTime: obj.scheduleTime,
          transitTime: refmap.transitTimeHrs,
          transitTimeMins : refmap.transitTimeMins,  // add transit time minutes
          waitTimeMins : refmap.waitTimeMins,    // add waiting Time minutes
        }
        this.routeDataSource.push(touchpointObj);
      });

      let editDestinationObj = {
        routeType: 'D',
        routeTchpntId: refOBj.route.destinationBranchId,
        eta: "",
        // waitTime: "",
        // departTime: "",
        // transitTime: 0
      }
      this.routeDataSource.push(editDestinationObj);
      this.routeDataSource = Object.assign([], this.routeDataSource);
     // this.dataSource = Object.assign([], this.routeData.nrmAssignVehicles);
     this.setVehicleData(undefined);
    } else {
      this.routeDataSource = [];
      let element = dataFilteById[0];
     
      this.setVehicleData(dataFilteById[0]);

      this.model = { ...element };
      this.editedNrmRouteOperationalDays = element.nrmRouteOperationalDays;
      this.model.oprtnlWeekDayArray = element.nrmRouteOperationalDays.map(x => x.oprtnlWeekDay);
      this.model.extraDepartFlag = element.extraDepartFlag == 1 ? true : false;
      this.model.scheduleTime = obj.scheduleTime;
      element.nrmRouteDetails.forEach(data => {
        if (refOBj.route.sourceBranchId == data.routeTchpntId) {
          let newObjS = {
            "routeType": 'S',
            "routeTchpntId": data.routeTchpntId,
            "departTime": data.departTime,
            "transitTime": data.transitTime,
            "transitTimeMins" : data.transitTimeMins,  // add transit time minutes
            "crtdBy": data.crtdBy,
            "crtdDt": data.crtdDt,
            "effectiveDt": data.effectiveDt,
            "expDt": data.expDt,
            "id": data.id,
            "nrmCmrclId": data.nrmCmrclId,
            "recIdentifier": data.recIdentifier,
            "status": data.status,
            "updBy": data.updBy,
            "updDt": data.updDt

          }
          this.routeDataSource.unshift(newObjS);
        }
        else if (refOBj.route.destinationBranchId == data.routeTchpntId) {
          let newObjD = {
            "routeType": 'D',
            "routeTchpntId": data.routeTchpntId,
            "eta": data.eta,
            "waitTime": data.waitTime,
            "departTime": data.departTime,
            "transitTime": data.transitTime,
            "transitTimeMins" : data.transitTimeMins,  // add transit time minutes
            "waitTimeMins" : data.waitTimeMins,    // add waiting Time minutes
            "crtdBy": data.crtdBy,
            "crtdDt": data.crtdDt,
            "effectiveDt": data.effectiveDt,
            "expDt": data.expDt,
            "id": data.id,
            "nrmCmrclId": data.nrmCmrclId,
            "recIdentifier": data.recIdentifier,
            "status": data.status,
            "updBy": data.updBy,
            "updDt": data.updDt
          }
          this.routeDataSource.push(newObjD);
        } else {
          let newObjT = {
            "routeTchpntId": data.routeTchpntId,
            "eta": data.eta,
            "waitTime": data.waitTime,
            "departTime": data.departTime,
            "transitTime": data.transitTime,
            "transitTimeMins" : data.transitTimeMins,  // add transit time minutes
            "waitTimeMins" : data.waitTimeMins,    // add waiting Time minutes
            "crtdBy": data.crtdBy,
            "crtdDt": data.crtdDt,
            "effectiveDt": data.effectiveDt,
            "expDt": data.expDt,
            "id": data.id,
            "nrmCmrclId": data.nrmCmrclId,
            "recIdentifier": data.recIdentifier,
            "status": data.status,
            "updBy": data.updBy,
            "updDt": data.updDt
          }
          this.routeDataSource.push(newObjT);
        }
      });
      const destinationObj = this.routeDataSource.find((item) => item.routeType == 'D');
      const removeDestination = this.routeDataSource.filter((item) => item.routeType !== 'D');
      removeDestination.push(destinationObj);
      this.routeDataSource = [...removeDestination];
      console.log('routeDatasource',this.routeDataSource)
    }
    this.spinner.hide();
  }

  /*--------- Add edit status ------ */
  addEditStatus(model) {

    if (this.editflow) {
      model.status = this.editStatus;
      this.model.status = this.editStatus;
    }
  }
  addEditStatusInOperationalDays() {
    if (this.editflow && this.model.nrmRouteOperationalDays.length > 0) {
      this.model.nrmRouteOperationalDays[0].status = this.editStatus;
      this.model.status = this.editStatus;
    }
  }

  amAndpmFormate(da) {
    if (da) {
      this.teamScheduleTime = parseInt(moment(da, 'HH').format('HH'));
      return parseInt(moment(da, 'HH').format('HH')) <= 12 ? "AM" : "PM";
    } else {
      return null
    }
  }

  checkedAll(event) {
    if (event) {
      this.dataSource.forEach(element => {
        element.checked = event.checked;
      });
    }
  }

  onSelectVehicle() {
    let checkedData = this.dataSource.filter(x => x.checked);
    if (checkedData.length == this.dataSource.length) {
      this.checkAllVehicle[this.activeButtionIndex] = true;
    } else {
      this.checkAllVehicle[this.activeButtionIndex] = false;
    }
  }

  lbh(l, b, h) {
    return `${l} X ${b} X ${h}`;
  }

  selectMulOprtnlWeekDay(obj: any) { }

  nextReadMode() {
    if (this.editflow) {
      this.router.navigate(['asso_network-contract/payment-terms', { steper: true, 'editflow': 'true' }], { skipLocationChange: true });
    } else {
      this.router.navigate(['asso_network-contract/payment-terms'], { skipLocationChange: true });
    }
  }

  /*-------- get touch point branch ID for given touch point mapping ----- */
  getTouchPointBranchID(mappingId) {
    let touchPointObj = this.editedReferenceData.route.routeTouchPoints.find(x => x.id == mappingId);
    return touchPointObj != undefined ? touchPointObj.touchPointBranchId : '';
  }

  setButtonClass(i,obj) {
    if(i == this.activeButtionIndex){
      return 'activeSchedule';
    }

    if(obj.isSaved && obj.isActive){
      return 'savedSchedule';
    } else if(obj.isSaved && !obj.isActive){
      return 'inactiveSchedule';
    } else if(!obj.isSaved){
      return 'notSavedShedule'
    }
  }

   /*---- On change extra departure --------- */ 
  onChangeExtraDept(event) {
    if(!event.checked){
      this.model.extraDepartRsn = '';
    }
  }

  /*---- Set Vehicles for current Schedule --------- */ 

  setVehicleData(currentSchedule){
    let clonedData = JSON.parse(JSON.stringify(this.routeData.nrmAssignVehicles));
    let todayDt = this.datePipe.transform(new Date() , 'yyyy-MM-dd') 
    if (currentSchedule) {
      clonedData.forEach(element => {
        currentSchedule.nrmRouteSchVehicles.forEach(nrsv => {
          if (nrsv.vehicleId == element.vehicleId) {
            element["checked"] = true;
            let expDt = this.datePipe.transform(element.mdmExpDt , 'yyyy-MM-dd') 
            if(expDt){
              if(element.mdmStatus == 1 && expDt >= todayDt) {
                element['isActive'] = true;
              } else {
                element['isActive'] = false;
              }
             } else if(element.mdmStatus == 1){
              element['isActive'] = true;
             } else {
              element['isActive'] = false;
             }
          }
        });
      });
           
      let finalData = clonedData.filter(v => {
        let mdmExpDt = this.datePipe.transform(v.mdmExpDt , 'yyyy-MM-dd');
        if(v.checked){
          return v;
        } else {
          if(mdmExpDt) {
            if(v.mdmStatus == 1 && mdmExpDt >= todayDt) {
              v['isActive'] = true;
              return v;
            }
          } else
          
          if(v.mdmStatus == 1){
            v['isActive'] = true;
            return v;
          }
        }
      
      })

      this.dataSource = finalData;
      this.onSelectVehicle();
    } else {
      let finalData = clonedData.filter(v => {
        let mdmExpDt = this.datePipe.transform(v.mdmExpDt , 'yyyy-MM-dd');
        if(v.checked){
          return v;
        } else {
          if(mdmExpDt) {
            if(v.mdmStatus == 1 && mdmExpDt >= todayDt) {
              v['isActive'] = true;
              return v;
            }
          } else if(v.mdmStatus == 1){
            v['isActive'] = true;
            return v;
          }
        }
      
      })
      this.dataSource = finalData;
    }
  }

  getError(field) {
    let cntl = this.commForm.form.controls[field];
     return cntl;
  }

}


