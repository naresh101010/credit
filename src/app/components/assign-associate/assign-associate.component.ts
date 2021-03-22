import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';

import { ErrorConstants } from '../../core/models/constants';
import { AppSetting } from '../../app.setting';
import { ApiService } from '../../core/services/api.service';
import { SelectCustomerComponent } from '../../dialog/select-customer/select-customer.component';
import { ViewBranchesComponent } from '../../dialog/view-branches/view-branches.component';
import { confimationdialog } from 'src/app/dialog/confirmationdialog/confimationdialog';
import { AuthorizationService } from '../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-assign-associate',
  templateUrl: './assign-associate.component.html',
  providers: [ApiService, DatePipe]
})
export class AssignAssociateComponent implements OnInit {

  nomatch: boolean=false;
  toflag: boolean=false;
  minchar:boolean= false;
  associateResData: any;
  associateRefData: any;
  selectedContractId: any;
  displayedColumns: string[] = ['AssoName', 'CrDate', 'VenDepartment', 'gst', 'pan', 'mobile'];
  dataSource: any;
  contractData: any;
  selectedOfferings: any = [];
  minDate: Date;
  maxdate : Date;
  minDateStart:any = new Date();
  isValidEffectiveDt: boolean;
  isValidExpDt: boolean;
  isValidSignDt:boolean = false;
  // contractCustomerList: any[] = []; // to be removed for new requirment
  // selectedSubDelivery: string; // to be removed for new requirment
  deptList = AppSetting.deptRefList;
  isServiceOffrValid: boolean;
  isDisable: boolean;
  searchKey: string;
  contractId : number;
  isDisableflag = true;

  contractForm: FormGroup;
  offeringFormArray: FormArray;
  editflow: boolean;
  tileFlag: any;

  perList: any = [];
  exAttrMap = new Map();
  exAttrKeyList =  [];
  isSubDeliveryChange : boolean = false;


  constructor(public dialog: MatDialog, private apiService: ApiService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router,
    private fb: FormBuilder, private datePipe: DatePipe, private route: ActivatedRoute,
    private authorizationService : AuthorizationService,
    private permissionsService: NgxPermissionsService) { }


  ngOnInit() {
    this.contractId = AppSetting.contractId;

    this.authorizationService.setPermissions('CONTRACT');
    this.perList = this.authorizationService.getPermissions('CONTRACT') == null ? [] : this.authorizationService.getPermissions('CONTRACT');
    this.permissionsService.loadPermissions(this.perList);
    if(this.contractId !== null){
    this.exAttrMap = this.authorizationService.getExcludedAttributes('VIEW CONTRACT');
    this.exAttrKeyList = Array.from(this.exAttrMap.values());
    }
    console.log('Attribute List', this.exAttrKeyList);
    console.log('perlist',this.perList)

    

    // let e = new Date();
    // e.setDate(e.getDate() + 1);
    // this.minDate = e;

    this.route.params.subscribe(x => {
      if (x['termination']) { 
        this.tileFlag = x['termination'];
        this.isDisable = true;  
        console.log('Tile Flag', this.tileFlag);
      } else {
        this.editflow = x['editflow'];
        console.log('edit flag', this.editflow);
      }
      

      if(x.editflow){
        this.editflow = x.editflow;
      }
      
    });

    this.contractForm = this.fb.group({
      id: [''],
      cntrCode: [''],
      assocId: [AppSetting.associateId],
      cntrType: [''],
      lkpSubDeliveryId: ['', Validators.required],
      contractCustomerList: [],
      effectiveDt: ['', Validators.required],
      expDt: [null],
      cntrSignDt : ['', Validators.required],
      lkpPymtFreqId: ['', Validators.required],
      status: [''],
      safextDeliveryFlag: [false, Validators.required],
      scheduledDeliveryFlag: [false, Validators.required],
      serviceOfferings: this.fb.array([]),
      weightSlabFrom: ['', Validators.required],
      weightSlabTo: ['', Validators.required],
      descr : ['']
    });

    this.offeringFormArray = this.contractForm.get('serviceOfferings') as FormArray;

    this.getAssociateContract();
    this.setAssociateData();

  }

  get f() { return this.contractForm.controls; }

  setAssociateData() {
    let resArray = [];
    if (AppSetting.associateObject) {
      resArray.push(AppSetting.associateObject);
      this.dataSource = new MatTableDataSource(resArray);
    }
  }

  getAssociateContract() {
    this.spinner.show()
    let assoId = AppSetting.associateId;
    this.apiService.get(`secure/v1/deliverycontract/associate/${assoId}`).subscribe((res) => {
      if (res.status == 'SUCCESS') {
        if (res.data) {
          this.associateResData = res.data.responseData;
          this.associateRefData = res.data.referenceData;
          this.selectedContract(this.associateResData);

        } else {
          this.spinner.hide();
          this.toastr.error('Data not Found');
        }
      } else {
        this.spinner.hide();
        this.toastr.error(res.message);
      }
    }, (err) => {
      this.toastr.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });
  }

  createServiceOfferingsFormArray(offeringList) {
    offeringList.forEach(element => {
      this.offeringFormArray.push(new FormControl(element.selected || false));
    });
  }

  getSelectedOfferings(control, id) {
    this.selectedOfferings = _.map(
      this.contractForm.controls.serviceOfferings["controls"],
      (offer, i) => {
        return offer.value && this.associateRefData.serviceOfferingList[i].id;
      }
    );
    this.getSelectedOfferingsName();
  }

  getSelectedOfferingsName() {
    this.selectedOfferings = _.filter(
      this.selectedOfferings,
      function (hobby) {
        if (hobby !== false) {
          return hobby;
        }
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if (filterValue.length > 0 && filterValue.length<3){
      this.nomatch = false;
      this.minchar= true
      this.dataSource.filter = null;  
    }
    else if (filterValue.length == 0) {
      this.minchar = false;
    }
    else {
      this.minchar= false
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if( this.dataSource.filteredData.length == 0){
        this.nomatch = true
      }
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectedContract(contract) {
    if (AppSetting.contractId !== null) {
      this.getContract();
      this.selectedContractId = AppSetting.contractId;
    } else {
      this.spinner.hide();
      this.f.cntrType.setValue(this.associateRefData.contractTypeList.find(x => x.lookupVal === 'DELIVERY').id);
      this.f.cntrType.disable();
      this.f.status.setValue(this.associateRefData.statusList.find(y => y.lookupVal === 'DRAFT').id);
      this.createServiceOfferingsFormArray(this.associateRefData.serviceOfferingList)
      this.minDate = new Date();
      //this.maxdate = null;
    }
  }

  /*--------------- get contract data by ID ---------- */
  getContract() {
    this.apiService.get('secure/v1/deliverycontract/' + AppSetting.contractId).subscribe(response => {
      let ob = ErrorConstants.validateException(response);
      if (ob.isSuccess) {
        this.contractData = response.data.responseData;

        this.contractForm.patchValue({
          id: this.contractData.id,
          cntrCode: this.contractData.cntrCode ? this.contractData.cntrCode : null,
          assocId: this.contractData.assocId,
          cntrType: parseInt(this.contractData.cntrType),
          lkpSubDeliveryId: this.contractData.lkpSubDeliveryId,
          contractCustomerList: this.contractData.contractCustomerList,
          effectiveDt: this.contractData.effectiveDt,
          cntrSignDt : this.contractData.cntrSignDt,
          expDt: this.tileFlag ? new Date() :  this.contractData.expDt,
          lkpPymtFreqId: this.contractData.lkpPymtFreqId,
          status: this.contractData.status,
          safextDeliveryFlag: this.contractData.safextDeliveryFlag === 1 ? true : false,
          scheduledDeliveryFlag: this.contractData.scheduledDeliveryFlag === 1 ? true : false,
          serviceOfferings: [],
          weightSlabFrom: this.contractData.weightSlabFrom,
          weightSlabTo: this.contractData.weightSlabTo,
          descr : this.contractData.descr
        });
        if(this.tileFlag){
          this.f.status.setValue(this.associateRefData.statusList.find(y => y.lookupVal === 'INACTIVE').id);
        }else if(this.editflow && !this.tileFlag){
          this.f.status.setValue(this.associateRefData.statusList.find(y => y.lookupVal === 'ACTIVE').id);
        }

        //************ to be removed *********
        // this.contractCustomerList = this.contractData.contractCustomerList; 
        // let subDelivObj = this.associateRefData.subDeliveryTypeList.find(x => x.id == this.contractData.lkpSubDeliveryId);
        // if (subDelivObj !== undefined) {
        //   this.selectedSubDelivery = subDelivObj.lookupVal;
        // } else {
        //   this.selectedSubDelivery = '';
        // }


        this.selectedOfferings = this.contractData.serviceOfferings.map(({ serviceOfferingId }) => serviceOfferingId);
        this.associateRefData.serviceOfferingList.forEach(element => {
          let selected = this.selectedOfferings.find(x => x == element.id);
          if (selected !== undefined) {
            this.offeringFormArray.push(new FormControl(element.selected || true));
          } else {
            this.offeringFormArray.push(new FormControl(element.selected || false));
          }
        });

        this.minDateStart = this.f.effectiveDt.value ? this.f.effectiveDt.value : new Date();
        let dateMin = this.f.effectiveDt.value ? this.f.effectiveDt.value : new Date();
        let d = new Date(dateMin) ;
        d.setDate(d.getDate()+1);
        this.minDate = d;
        
        !this.isDisable ? this.expDate() : '';

        this.f.cntrType.disable();
        if(this.tileFlag == 'true'){
          this.contractForm.disable();
          this.f.descr.enable();
          this.f.descr.setValidators(Validators.required);
          this.f.descr.updateValueAndValidity();
        }

        this.editflow ? this.f.cntrSignDt.disable() : '';

        this.spinner.hide();
      } else {
        this.toastr.error(ob.message);
        this.spinner.hide();
      }
    }, (error) => {
      this.toastr.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });
  }

  /*------------ create and update contract ---------*/
  createContractPost() {
    this.contractForm.markAllAsTouched();
    if (this.contractForm.invalid || this.isValidEffectiveDt || this.isValidExpDt || this.selectedOfferings.length == 0) {
      return;
    }
    //************* */ to be removed****************
    // if (this.selectedSubDelivery == 'PCD') {
    //   if ((this.contractForm.controls.contractCustomerList.value === undefined || this.contractForm.controls.contractCustomerList.value.length == 0)) {
    //     this.toastr.info('Please add Customer');
    //     return;
    //   }
    // }

    this.spinner.show();
    this.contractForm.enable();
    let finalData = this.contractForm.value;
    finalData.scheduledDeliveryFlag = this.contractForm.value.scheduledDeliveryFlag == true ? 1 : 0;
    finalData.safextDeliveryFlag = this.contractForm.value.safextDeliveryFlag == true ? 1 : 0;
    finalData.effectiveDt = this.datePipe.transform(this.f.effectiveDt.value, 'yyyy-MM-dd');
    finalData.expDt = this.datePipe.transform(this.f.expDt.value, 'yyyy-MM-dd');
    finalData.cntrSignDt = this.datePipe.transform(this.f.cntrSignDt.value, 'yyyy-MM-dd');
    finalData.contractCustomerList = [];
    AppSetting.wefDate = finalData.effectiveDt;

    if (this.editflow && this.contractForm.dirty) {
      finalData.status = AppSetting.editStatus;    // change status to edit
    }

    // if (finalData.contractCustomerList !== undefined && this.selectedSubDelivery == 'PCD') {
    //   finalData.contractCustomerList.forEach(element => {
    //     element['effectiveDt'] = finalData.effectiveDt
    //     if (element['id'] == null) {
    //       delete element['id'];
    //     }
    //   });
    // } else {
    //   finalData.contractCustomerList = [];
    // }

    if (AppSetting.contractId == null) {
      delete finalData.id;
      delete finalData.cntrCode;
      finalData.serviceOfferings = [];
      if (this.selectedOfferings.length > 0) {
        this.selectedOfferings.forEach(element => {
          finalData.serviceOfferings.push({
            serviceOfferingId: element,
            effectiveDt: finalData.effectiveDt,
            expDt: finalData.expDt
          })
        });
      }
    } else {
      // finalData.cntrSignDt = this.contractData.cntrSignDt;
      finalData.cntrVersion = this.contractData.cntrVersion;
      finalData.ver = this.contractData.ver;
      //finalData.contractCustomerList = this.contractData.contractCustomerList;
      if(!this.contractData.cntrCode){
        delete finalData.cntrCode;
      }

      var previousData = this.contractData.serviceOfferings.filter(x => this.selectedOfferings.find(y => x.serviceOfferingId === y));

      var newData = this.selectedOfferings.filter(x => !previousData.find(y => x === y.serviceOfferingId));

      const newArray = [];
      if (newData.length > 0) {
        newData.forEach(element => {
          newArray.push({
            serviceOfferingId: element,
            effectiveDt: finalData.effectiveDt,
            expDt: finalData.expDt
          })
        });
      }
      finalData.serviceOfferings = previousData.concat(newArray);
    }
    console.log('final Data',JSON.stringify(finalData))
    this.apiService.post(`secure/v1/deliverycontract`, finalData).subscribe((res) => {
      if (res.status == 'SUCCESS') {
        if(AppSetting.contractId !== null) {
          if(this.isSubDeliveryChange)
              this.deleteCustomers();
          else
              this.spinner.hide();
        } else {
          this.spinner.hide();
        }
        AppSetting.contractId = res.data.responseData;
        if (this.isDisable) {
          this.toastr.info(res.message);
          this.router.navigate(['asso_delivery-contract/asso_delivery'], { skipLocationChange: true });
        } else {
          this.toastr.success('Saved Successfully');
          if (this.editflow) {
            this.router.navigate(['asso_delivery-contract/branch-allocation', { steper: true, 'editflow': 'true' }],{ skipLocationChange: true })
          } else {
            this.router.navigate(['asso_delivery-contract/branch-allocation'],{ skipLocationChange: true })
          }
        }
      } else {
        this.spinner.hide();
        this.toastr.error(res.message);
      }
    }, (error) => {
      this.toastr.error(error.error.errors.error[0].description);
      this.spinner.hide();
    });
  }


  signDate() {
    let cntrYear = parseInt(this.datePipe.transform(this.f.cntrSignDt.value, 'yyyy'))
    if (cntrYear > 9999) {
      this.f.cntrSignDt.setValue('');
    } else {
      let a = this.datePipe.transform(this.f.cntrSignDt.value, 'yyyy-MM-dd')
      let b = this.datePipe.transform(this.f.effectiveDt.value, 'yyyy-MM-dd')
      let c = this.datePipe.transform(this.f.expDt.value, 'yyyy-MM-dd')
      if (c) {
        if (a < c) {
          this.isValidSignDt = false;
        }
        else {
          this.isValidSignDt = true;
        }
      } else if (b) {
        if (a <= b) {
          this.isValidSignDt = false;
        }
        else if (b < a) {
          this.isValidEffectiveDt = true;
        }
        else {
          this.isValidSignDt = true;
        }
      } else {
        this.isValidSignDt = false;
      }
      if (!a) {
        let e = new Date(a);
        e.setDate(e.getDate() + 1);
        this.minDate = e;
      }
    }
    this.effectiveDate(false);
    this.expDate();

  }

    effectiveDate(isExpToUpdate) {
      let effYear = parseInt(this.datePipe.transform(this.f.effectiveDt.value, 'yyyy'))
      if (effYear > 9999) {
        this.f.effectiveDt.setValue("");
      } else {
      let a = this.datePipe.transform(this.f.cntrSignDt.value, 'yyyy-MM-dd');
      let b = this.datePipe.transform(this.f.effectiveDt.value, 'yyyy-MM-dd');
      let c = this.datePipe.transform(this.f.expDt.value, 'yyyy-MM-dd');
      if (c) {
        if (b < c && b >= a) {
          this.isValidEffectiveDt = false;
        }
        else {
          this.isValidEffectiveDt = true;
          this.isValidExpDt = false;
        }
      } else {
        this.isValidEffectiveDt = false
        if (b >= a) {
          this.isValidEffectiveDt = false
        } else {
          this.isValidEffectiveDt = true
        }
      }
      if (b) {
        let e = new Date(b);
        e.setDate(e.getDate() + 1);
        this.minDate = e;
      }
    }
    this.expDate();
    }
  
    expDate() {
      let expYear = parseInt(this.datePipe.transform(this.f.expDt.value, 'yyyy'))
      if (expYear > 9999) {
        this.f.expDt.setValue("");
      } else {
      let a = this.datePipe.transform(this.minDateStart, 'yyyy-MM-dd')
      let b = this.datePipe.transform(this.f.effectiveDt.value, 'yyyy-MM-dd')
      let c = this.f.expDt.value ? this.datePipe.transform(this.f.expDt.value, 'yyyy-MM-dd') : null
  
      if (b && c) {
        if (b < c) {
          this.isValidExpDt = false;
          //this.isValidEffectiveDt = false;
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
      } else {
        this.maxdate = null
      }

      }
    }

  /*------------ On Select Sub-delivery --------- */
  onSelectSubDelivery(id) {
    if(AppSetting.contractId != null){
    let selectedVal = this.associateRefData.subDeliveryTypeList.find(x => x.id == id).lookupVal;
    let previousSubDelVal =  this.associateRefData.subDeliveryTypeList.find(x => x.id == this.contractData.lkpSubDeliveryId).lookupVal;

    if(previousSubDelVal != undefined && selectedVal != undefined) {
      if(previousSubDelVal == 'PCD') {
        if(selectedVal != 'PCD'){
          this.isSubDeliveryChange =  true;
        } else {
          this.isSubDeliveryChange =  false;
        }
      } else {
        if(selectedVal == 'PCD'){
          this.isSubDeliveryChange =  true;
        } else {
          this.isSubDeliveryChange =  false;
        }
      }
    }

  }
    
    // if (subDelivery !== undefined) {
    //   this.selectedSubDelivery = subDelivery;
    //   if (subDelivery == 'PCD') {
    //     const dialogRef = this.dialog.open(SelectCustomerComponent, {
    //       data: { previousData: this.contractCustomerList, editflow: this.editflow },
    //       width: '55vw',
    //       panelClass: 'mat-dialog-responsive',
    //       disableClose: true
    //     });

    //     dialogRef.afterClosed().subscribe(data => {
    //       if (data !== undefined) {
    //         this.contractCustomerList = data;
    //         this.f.contractCustomerList.setValue(this.contractCustomerList);
    //       }
    //     })
    //   }
    // }
  }

  openViewBranchesModal(contract) {
    this.spinner.show();
    let branchData: any;
    this.apiService.get(`secure/v1/deliverycontract/contracts/branches/${contract.id}`).subscribe(res => {
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
            this.spinner.hide();
          }
        }
      }
    }, (err) => {
      this.toastr.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });
  }
  /*------------- On terminate Contract ----------- */

  submitRenewal() {
    console.log('Tile Flow', this.tileFlag);
    if(this.tileFlag == "false") {
     this.createContractPost();
    } else {
      console.log('termination');
      this.submitTermNClose();
    }
  }

  submitTermNClose() {
    const dialogRefEdit = this.dialog.open(confimationdialog, {
      data: { message: "Are you sure you want to terminate contract ?" },
      disableClose: true,
      panelClass: 'creditDialog',
      width: '300px'
    });

    dialogRefEdit.afterClosed().subscribe(result => {
      if (result) {
        // let temp = _.find(this.associateRefData.statusList, { 'lookupVal': 'INACTIVE' })
        // this.contractForm.controls.status.setValue(temp.id);
        this.editflow = false;
        this.terminateContract();
      }
    });

  }

  terminateContract() {
    let terminateData = {
      id : this.contractId,
      descr : this.f.descr.value,
    }
    this.apiService.post(`secure/v1/deliverycontract/terminate/`, terminateData).subscribe((res) => {
      console.log('Res of Termination', res.status);
      if(res.status == 'SUCCESS'){
        if (res.data) {
          AppSetting.contractId = res.data.responseData;
         
           this.toastr.info(res.message);
           this.router.navigate(['asso_delivery-contract/asso_delivery'], { skipLocationChange: true });
        
          this.spinner.hide();
        }else {
            this.spinner.hide();
            this.toastr.error('Data not Found');
        }
      }else {
        this.spinner.hide();
        this.toastr.error(res.message);
      }
  
     }, (err) => {
        console.log('Message : ' + err.error.message, + 'Path : ' + err.error.path);
       this.spinner.hide();
       
     }); 
  }
 
  closeNRedirect() {
    this.router.navigate(['asso_delivery-contract/asso_delivery'], { skipLocationChange: true });
  }

  checkValidTrue(){
    this.toflag = false;
    if(Number(this.f.weightSlabFrom.value) > Number(this.f.weightSlabTo.value)){
      this.toflag = true;
    }
  }
  nextReadMode() {
    if(this.editflow){
      this.router.navigate(['asso_delivery-contract/branch-allocation',{steper:true,'editflow': 'true' }], {skipLocationChange: true})
    }else{
      this.router.navigate(['asso_delivery-contract/branch-allocation'], {skipLocationChange: true})
    }
  }

  /**********  When Change PCD to Non-PCD sub-Delivery Or Vice versa then delete added customers on Payment Terms *********/
  deleteCustomers() {
    this.apiService.post(`secure/v1/deliveryCommercial/inactive/${AppSetting.contractId}`).subscribe(result => {
      console.log('Successfully deleted');
      this.spinner.hide();
    }, (err) => {
      this.toastr.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });
  }
}