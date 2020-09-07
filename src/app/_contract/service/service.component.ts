import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractService } from '../contract.service';
import { AppSetting } from '../../app.setting';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ErrorConstants }  from '../models/constants';
import { Lookup } from '../models/billingModel';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from '../services/authorization.service';



@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['../core.css']
})
export class ServiceComponent implements OnInit {
  model: any = {}
  serviceofering: any = {}
  services: any = {}
  servicelinelist=[]
  constructor(private spinner: NgxSpinnerService,private router: Router, private contractservice: ContractService,public tosterservice: ToastrService
    ,private acrouter: ActivatedRoute, private permissionsService: NgxPermissionsService, private authorizationService: AuthorizationService) { }
  sfdcAccId =AppSetting.sfdcAccId
  custName  =AppSetting.customerName
  sfxCode = AppSetting.sfxCode
  isDisabled:boolean;
  editflow:boolean;
  offeringList=[]
  count=0;
  servicesId
  IsValid;
  offeringFlag:boolean=false
  oldOfferingList = [];
  statusList : Lookup[] = [];
  @ViewChild("serviceForm", null) fservice: any;

  ngOnInit() {
    this.authorizationService.setPermissions('SERVICE OFFERING');
    this.permissionsService.loadPermissions(this.authorizationService.getPermissions('SERVICE OFFERING'));
    this.isDisabled = false;
    this.editflow = false;
    this.acrouter.params.subscribe(params => {
      if (params['editflow']) { 
        this.editflow = params['editflow'];
        this.isDisabled = true;
      }
    });
    this.getServices()
  }
  
  getServices() {
    this.spinner.show();
    this.contractservice.getServices(AppSetting.contractId,this.editflow)
      .subscribe(
        success => {
        let ob = ErrorConstants.validateException(success);
        if(ob.isSuccess){
          if(success.data.responseData){
            this.services.offerings = success.data.responseData;
            this.servicelinelist= success.data.referenceData.serviceLineList;
            this.statusList = success.data.referenceData.statusList;
            if(this.services.offerings.length>0){
            this.oldOfferingList = JSON.parse(JSON.stringify(this.services.offerings));
            this.model.lkpServiceLineId=this.services.offerings[0].lkpServiceLineId;
            this.model.wmsPct= this.services.offerings[0].wmsPct;
            AppSetting.offeringId= this.services.offerings[0].id
            this.servicesId=this.services.offerings[0].id
                this.getServiceOfering(this.model.lkpServiceLineId, false);
              }
              else { this.spinner.hide(); }
            } else {
              this.spinner.hide();
            }
          } else {
            this.tosterservice.error(ob.message);
            this.spinner.hide();
          }
        },
    error => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });

  }

  @HostListener('document:keydown', ['$event'])

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.altKey && (event.keyCode === 78)) { // alt+n [Next]
        event.preventDefault();
        if(document.getElementById('serviceNextButton')){
          let element = document.getElementById('serviceNextButton')  ;
          element.click();
        }
      }

      if (event.ctrlKey && (event.keyCode === 83)) { // ctrl+s [Save as Draft]
        event.preventDefault();
        if(document.getElementById('secondry-button')){
          let element = document.getElementById('secondry-button')  ;
          element.click();
        }
      }
  
  }
  
  
chkvalidation(){
  let count=0;
  for (var i = 0; i < this.serviceofering.length; i++) {
      if (this.serviceofering[i].isChecked) {
        this.IsValid = true;
        break;
      }
      else{
        count++;
        if(count==this.serviceofering.length){
          this.IsValid = false;
        }
      }
  }
  if(this.serviceofering.length==0){
    this.IsValid = false;
  }
}

selectOffering(data)
{
  //
  if(this.services.offerings.length>0){
for(var i=0;i<this.serviceofering.length;i++){
  var ischeck = this.serviceofering[i].isChecked;
  var id = this.serviceofering[i].id;
  if(ischeck){
    let serviceOff;
for(var j=0;j<this.services.offerings.length;j++){
  if(this.services.offerings[j].serviceOfferingId==id)
   serviceOff = this.services.offerings[j];
} if(!serviceOff){
  let offeringObj={
    "contractId": AppSetting.contractId,
    "lkpServiceLineId": this.services.offerings[0].lkpServiceLineId,
    "serviceOfferingId": id
  } 
  if(!this.offeringList.some(el => id==el.serviceOfferingId)){
  this.offeringList.push(offeringObj)}
}else if(serviceOff.id != null){
    let offeringObj={
      "id":serviceOff.id,
      "contractId": AppSetting.contractId,
      "lkpServiceLineId": serviceOff.lkpServiceLineId,
      "serviceOfferingId": serviceOff.serviceOfferingId
    } 
    if(!this.offeringList.some(el => serviceOff.id==el.id)){
    this.offeringList.push(offeringObj)}
  }else{
    let offeringObj={
      "contractId": AppSetting.contractId,
      "lkpServiceLineId": serviceOff.lkpServiceLineId,
      "serviceOfferingId": serviceOff.serviceOfferingId
    } 
    if(!this.offeringList.some(el => serviceOff.id==el.id)){
      this.offeringList.push(offeringObj)}
   }
}
else{
  for(var k = 0; k < this.offeringList.length; k++) {
    if(this.offeringList[k].serviceOfferingId == id) {
      this.offeringList.splice(k,1);
      }
    }
  }
}}else if (data && data !== null) {
  var ischeck = data.isChecked;
  var id = data.id;
    if(ischeck){
      let newOfferingObj = {
        "contractId": AppSetting.contractId,
        "lkpServiceLineId": this.model.lkpServiceLineId,
        "serviceOfferingId": data.id
      }
      if (this.offeringList && !this.offeringList.some(el => id == el.serviceOfferingId)) {
        this.offeringList.push(newOfferingObj)
      }
    }else{
      for(var k = 0; k < this.offeringList.length; k++) {
        if(this.offeringList[k].serviceOfferingId == id) {
          this.offeringList.splice(k,1);
          }
        }
    }
}
}


  postServices(nextFlag, event: Event) {
    event.preventDefault();
    this.servicelinelist.forEach(element => {
      if (element.id === this.model.lkpServiceLineId && element.lookupVal === 'WMS+DISTRIBUTION') {
        for (let data of this.offeringList) {
          data.wmsPct = this.model.wmsPct;
        }
      }
    });

    console.log("this.offeringList", this.offeringList);
    if (this.offeringList.length > 0) {
      this.spinner.show();
      this.offeringList.forEach(element => {
        element.lkpServiceLineId = this.model.lkpServiceLineId;
      });
      this.deactivateOrphanOffering();
      this.contractservice.postServices(this.offeringList, this.editflow)
        .subscribe(
          success => {
            let ob = ErrorConstants.validateException(success);
            if (ob.isSuccess) {
              this.servicesId = success.data.responseData;
              AppSetting.offeringId = this.servicesId
              this.getServices();
              console.log(this.servicesId);
              this.tosterservice.success("Offering Saved successfully");
              if (nextFlag == true) {
                if (this.editflow) {
                  this.router.navigate(['/contract/ratecard', {steper:true, 'editflow': 'true' }], {skipLocationChange: true});
                } else {
                  this.router.navigate(['/contract/ratecard'], {skipLocationChange: true});
                }
              }
            } else {
              this.tosterservice.error(ob.message);
              this.spinner.hide();
            }
          },
          error => {
            this.tosterservice.error(ErrorConstants.getValue(404));
            this.spinner.hide();
          });

    } else {
      if (nextFlag == true) {
        if (this.editflow) {
          this.router.navigate(['/contract/ratecard', { steper:true,'editflow': 'true' }], {skipLocationChange: true});
        } else {
          this.router.navigate(['/contract/ratecard'], {skipLocationChange: true});
        }
      }
    }

  }
 
  
  isWmsPercRequired:boolean=false;
  offeringIdwithNewRc:any;
  offeringIdwithOldRc:any;
  getServiceOfering(offering,isChange) {
    this.spinner.show();
    let isChangeServiceLine = false;
    if(this.oldOfferingList.length>0 && offering!=this.oldOfferingList[0].lkpServiceLineId){
      isChangeServiceLine= true;
    }
    let serviceLineName='';
    for(let item of this.servicelinelist){
      if(item.id==offering){
        serviceLineName = item.lookupVal;
      }
    }
    if(serviceLineName=='WMS+DISTRIBUTION'){
      this.isWmsPercRequired = true;
    }else{
      this.isWmsPercRequired = false;
    }
    this.offeringList=[]
    AppSetting.serviceOfering=[]
    this.serviceofering = [];
    this.offeringIdwithNewRc = [];
    this.offeringIdwithOldRc = [];
    this.contractservice.getServiceOfering(offering)
      .subscribe(
        success => {
          let ob = ErrorConstants.validateException(success);
          if (ob.isSuccess) {
            this.serviceofering = success.data.responseData;
            if (this.serviceofering.length > 0) {
              this.contractservice.getRateCardDetail(AppSetting.contractId, this.editflow)
                .subscribe(successRC => {
                  let obRc = ErrorConstants.validateException(successRC);
                  let rcData = successRC.data.responseData;
                  let rcRefData = successRC.data.referenceData;
                  for(let rc of rcData){
                    if(rc.isStgRc){
                      for(let serOff of rcRefData.offerings){
                        if(serOff.id==rc.offeringId){
                          this.offeringIdwithNewRc.push(serOff.serviceOfferingId);
                        }
                      }
                    }else{
                      for(let serOff of rcRefData.offerings){
                        if(serOff.id==rc.offeringId){
                          this.offeringIdwithOldRc.push(serOff.serviceOfferingId);
                        }
                      }
                    }
                  }
                  if (obRc.isSuccess) {
                    this.offeringFlag = true
                    for (var i = 0; i < this.serviceofering.length; i++) {
                      for (var j = 0; j < this.services.offerings.length; j++) {
                        if (this.serviceofering[i].id == this.services.offerings[j].serviceOfferingId) {
                          if (!isChangeServiceLine || !isChange) {
                            this.serviceofering[i].isChecked = true;
                            if (this.isDisabled) {
                              if (this.offeringIdwithNewRc.includes(this.serviceofering[i].id)) {
                                this.serviceofering[i]["isDisabled"] = true;
                              } else if (this.offeringIdwithOldRc.includes(this.serviceofering[i].id)){
                                this.serviceofering[i]["isDisabled"] = true;
                              }else{
                                this.serviceofering[i]["isDisabled"] = false;;
                              }
                            }
                          } else {
                            this.serviceofering[i].isChecked = false;
                          }
                        }
                      }
                    }
                    this.chkvalidation();
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
            } else {
              this.offeringFlag = false;
              this.tosterservice.info("No Offering Available For Selected Serviceline.");
              this.chkvalidation();
              this.spinner.hide();
            }
          } else {
            this.offeringFlag = false;
            this.tosterservice.error(ob.message);
            this.chkvalidation();
            this.spinner.hide();
          }
        },
    error => {
      this.offeringFlag= false;
      for(let serviceLine of this.servicelinelist){
        if(serviceLine.id==offering){
          this.tosterservice.error("No Service Line Exist for "+serviceLine.lookupVal);
        }
        this.chkvalidation();
        this.fservice.IsValid = true;
      }
      this.spinner.hide();
      console.log(this.IsValid);
    });

  }

  deactivateOrphanOffering(){
    var inactiveStatus=0;
    this.statusList.forEach(element => {
      if(element.lookupVal==='DELETED'){
        inactiveStatus=element.id;
      }
    });
    let deactivatedOfferingList = [];
    if(this.oldOfferingList.length>0){
      this.oldOfferingList.forEach(oldElement => {
        var exists =false;
        this.offeringList.forEach(newElement => {
            if(oldElement.id===newElement.id){
              exists=true;
            }
        });
        if(!exists && inactiveStatus>0){
          oldElement.status=inactiveStatus;
          deactivatedOfferingList.push(oldElement);
        }
      });
      if(deactivatedOfferingList.length>0){
        this.offeringList = this.offeringList.concat(deactivatedOfferingList);
      }
    }
  }
}
