import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContractService } from '../contract.service';
import { ErrorConstants } from '../models/constants';
import { ToastrService } from 'ngx-toastr';
import { confimationdialog } from '../confirmationdialog/confimationdialog';
import * as _ from 'lodash';
import { EmailDialogBoxP } from '../preview/preview.component';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';

@Component({
  selector: 'app-compareversions',
  templateUrl: './compareversions.component.html',
  styleUrls: ['../core.css']
})
export class CompareversionsComponent implements OnInit {
  versions: any;
  islatest: boolean;
  obj2: any;
  obj1: any;
  enableDialog: boolean;
  isv1: boolean;
  isv2: boolean;
  versionCompare: any;
  versionDifference: any;
  versionIndex: any;

  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'printPreview', // the id of html/table element
  }
  
  constructor(
    private contractService: ContractService,
    public dialogCompareVersion: MatDialogRef<CompareversionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private spinner: NgxSpinnerService, private tosterservice: ToastrService,
    public dialog: MatDialog,
    private exportAsService: ExportAsService
  ) { }

  ngOnInit() {
    this.spinner.show();
    if (this.data) {
      this.compareVersions(this.data);
    }

  }

  // ifRatecardClustBranchCosignObjectChanged( sindex, rindex, cindex, item){
  //   let serviceOfferingsObj, rateCardsObj, branchObj, branchPinCneeCnorDtoListObj1;
  //   let serviceOfferingsObj2, rateCardsObj2, branchObj2, branchPinCneeCnorDtoListObj2;

  //   serviceOfferingsObj = this.obj1.serviceOfferings[sindex];
  //   rateCardsObj = serviceOfferingsObj.rateCards[rindex];
  //   branchObj = rateCardsObj.branchDTOs[cindex];

  //   serviceOfferingsObj2 = _.find(this.obj2.serviceOfferings, {'serviceLine': serviceOfferingsObj.serviceLine, 'serviceOfferingName': serviceOfferingsObj.serviceOfferingName});
  //   if(serviceOfferingsObj2){
  //     rateCardsObj2 =  serviceOfferingsObj2.rateCards;     
  //     if(rateCardsObj2){
  //       rateCardsObj2.filter(obj => {
  //        let commercialObjTemp = _.find(obj.branchDTOs, {'id' : branchObj.id}); 
  //         if(commercialObjTemp){
  //           branchObj2 = commercialObjTemp
  //         }
  //       });
  //       if (branchObj2) {
  //         branchPinCneeCnorDtoListObj1 = item;
  //         branchPinCneeCnorDtoListObj2 = _.find(branchObj2.branchPinCneeCnorDtoList, { 'cneeCnorId': item.cneeCnorId });
  //         if (branchPinCneeCnorDtoListObj2) {
  //           return false
  //         } else {
  //           return true;
  //         }
  //       } else {
  //         return true;
  //       }
  //     }else{
  //       return true;
  //     }
  //   }else{
  //     return true;
  //   }
  // }


  compareVersions(data: any) {
    this.versions = this.data.versions;
    for (let i = 0; i < this.versions.length; i++) {
      if (this.versions[i].index === 0) {
        this.islatest = true;
      }
    }
    if (this.islatest) {
      let version2;
      for (let i = 0; i < this.versions.length; i++) {
        if (this.versions[i].index !== 0) {
          version2 = this.versions[i].cntrVer;
        }
      }
      this.contractService.getPreview(this.data.contractId, true)
        .subscribe(result => {
          this.obj1 = result.data.responseData;
          for (let objS of this.obj1.serviceOfferings) {
            if (objS.rateCards) {
              for (let objR of objS.rateCards) {
                if (objR.commercialDTOs) {
                  for (let objCom of objR.commercialDTOs) {
                    var safexCharges = '';
                    for (let objSafex of objCom.safextCharge) {
                      if (safexCharges.indexOf(objSafex.safextCtgy) == -1) {
                        safexCharges = safexCharges + objSafex.safextCtgy + ',';
                      }
                    }
                    objCom['safexChargesType'] = safexCharges.substring(0, safexCharges.lastIndexOf(','));
                  }
                }
              }
            }
          }
          this.isv1 = true;

          this.contractService.getHistoryPreviewContractVersion(this.data.contractId, version2)
            .subscribe(result => {
              this.obj2 = result.data.responseData;
              for (let objS of this.obj2.serviceOfferings) {
                if (objS.rateCards) {
                  for (let objR of objS.rateCards) {
                    if (objR.commercialDTOs) {
                      for (let objCom of objR.commercialDTOs) {
                        var safexCharges = '';
                        for (let objSafex of objCom.safextCharge) {
                          if (safexCharges.indexOf(objSafex.safextCtgy) == -1) {
                            safexCharges = safexCharges + objSafex.safextCtgy + ',';
                          }
                        }
                        objCom['safexChargesType'] = safexCharges.substring(0, safexCharges.lastIndexOf(','));
                      }
                    }
                  }
                }
              }
              this.versionDifference = this.compareVersionDifference(this.obj2, this.obj1);
              this.versionCompare = this.compareVersionCom(this.obj2, this.obj1);
              this.isv2 = true;
              this.spinner.hide();
            },
              error => {
                this.spinner.hide();
                this.tosterservice.error(ErrorConstants.getValue(404));
              });
        },
          error => {
            this.tosterservice.error(ErrorConstants.getValue(404));
            this.dialogCompareVersion.close();
            this.spinner.hide();
          });

    }

    else {
      var version1 = (this.versions[0].cntrVer > this.versions[1].cntrVer) ? this.versions[0].cntrVer : this.versions[1].cntrVer;
      var version2 = (this.versions[0].cntrVer < this.versions[1].cntrVer) ? this.versions[0].cntrVer : this.versions[1].cntrVer;
      this.contractService.getHistoryPreviewContractVersion(this.data.contractId, version1)
        .subscribe(result => {
          this.obj1 = result.data.responseData;
          /**
           * Get the Distinct Safex category(Booking, Delivery) from child list for each commercial 
           * and set the same at commercial level
           */
          for (let objS of this.obj1.serviceOfferings) {
            if (objS.rateCards) {
              for (let objR of objS.rateCards) {
                if (objR.commercialDTOs) {
                  for (let objCom of objR.commercialDTOs) {
                    var safexCharges = '';
                    for (let objSafex of objCom.safextCharge) {
                      if (safexCharges.indexOf(objSafex.safextCtgy) == -1) {
                        safexCharges = safexCharges + objSafex.safextCtgy + ',';
                      }
                    }
                    objCom['safexChargesType'] = safexCharges.substring(0, safexCharges.lastIndexOf(','));
                  }
                }
              }
            }
          }
          this.enableDialog = true;
          this.contractService.getHistoryPreviewContractVersion(this.data.contractId, version2)
            .subscribe(result => {
              this.obj2 = result.data.responseData;
              /**
               * Get the Distinct Safex category(Booking, Delivery) from child list for each commercial 
               * and set the same at commercial level
               */
              for (let objS of this.obj2.serviceOfferings) {
                if (objS.rateCards) {
                  for (let objR of objS.rateCards) {
                    if (objR.commercialDTOs) {
                      for (let objCom of objR.commercialDTOs) {
                        var safexCharges = '';
                        for (let objSafex of objCom.safextCharge) {
                          if (safexCharges.indexOf(objSafex.safextCtgy) == -1) {
                            safexCharges = safexCharges + objSafex.safextCtgy + ',';
                          }
                        }
                        objCom['safexChargesType'] = safexCharges.substring(0, safexCharges.lastIndexOf(','));
                      }
                    }
                  }
                }
              }
              this.versionDifference = this.compareVersionDifference(this.obj2, this.obj1);
              this.versionCompare = this.compareVersionCom(this.obj2, this.obj1);
              this.isv2 = true;
              this.spinner.hide();

            },
              error => {
                this.spinner.hide();
                this.tosterservice.error(ErrorConstants.getValue(404));
              });
        },
          error => {
            this.tosterservice.error(ErrorConstants.getValue(404));
            this.dialogCompareVersion.close();
            this.spinner.hide();
          });
    }
  }


  ifBillingByObjectChanged(bindex, property) {
    let changedObject = this.versionDifference.billingPrevDTO.billingBy[bindex];
    if (changedObject && changedObject.hasOwnProperty(property)) {
      return true;
    }
    else false;
  }

  ifBillingCneeorMapObjectChanged(bindex, property) {
    let changedObject = this.versionDifference.billingPrevDTO.billingCneeCnorMap[bindex];
    if (changedObject && changedObject.hasOwnProperty(property)) {
      return true;
    }
    else false;
  }

  ifServiceObjectChanged(sindex, property) {

    let changedObject = this.versionDifference.serviceOfferings[sindex];
    if (changedObject && changedObject.hasOwnProperty(property)) {
      return true;
    }
    else false;
  }

  ifRatecardObjectChanged(item, sindex, rindex, property) {
    let serviceOfferingsObj, rateCardsObj, ratecardDTOObj;
    let serviceOfferingsObj2, rateCardsObj2, ratecardDTOObj2;

    serviceOfferingsObj = this.obj1.serviceOfferings[sindex];
    rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    ratecardDTOObj = rateCardsObj.ratecardDTO;
    serviceOfferingsObj2 = _.find(this.obj2.serviceOfferings, {'serviceLine': serviceOfferingsObj.serviceLine, 'serviceOfferingName': serviceOfferingsObj.serviceOfferingName});
    if(serviceOfferingsObj2){
      rateCardsObj2 =  serviceOfferingsObj2.rateCards;     
      if(rateCardsObj2){
        let temp =  rateCardsObj2.filter(obj => {
         return obj.ratecardDTO.id ==  ratecardDTOObj.id;
        }); 
        if(temp.length > 0){
          ratecardDTOObj2 = temp[0].ratecardDTO;
        }
        if(ratecardDTOObj2){
          if(ratecardDTOObj2[property] != ratecardDTOObj[property]){     
            if (ratecardDTOObj2[property] < ratecardDTOObj[property]) {
              return {flage : true, compare: 'arrow_upward'}
            } else if (ratecardDTOObj2[property] > ratecardDTOObj[property]) {
              return {flage : true, compare: 'arrow_downward'}
            } else {
              return {flage : true, compare: null} 
            }   
          }else {
            return {flage : false, compare: null}
          }
        }else {
          return {flage : true,compare: null}
        }
      }else{
        return {flage : true,compare: null}
      }
    }else{
      return {flage : true,compare: null}
    }
  }

  ifRatecardTncObjectChanged(item, sindex, rindex, property) {
    let serviceOfferingsObj, rateCardsObj, tncObj;
    let serviceOfferingsObj2, rateCardsObj2, tncObj2;

    serviceOfferingsObj = this.obj1.serviceOfferings[sindex];
    rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    tncObj = rateCardsObj.tncDTO;
    serviceOfferingsObj2 = _.find(this.obj2.serviceOfferings, {'serviceLine': serviceOfferingsObj.serviceLine, 'serviceOfferingName': serviceOfferingsObj.serviceOfferingName});
    if(serviceOfferingsObj2){
      rateCardsObj2 =  serviceOfferingsObj2.rateCards;     
      if(rateCardsObj2){
        let temp =  rateCardsObj2.filter(obj => {
         return obj.tncDTO.id ==  tncObj.id;
        }); 
        if(temp.length > 0){
          tncObj2 = temp[0].tncDTO;
        }
        if(tncObj2){
          if(tncObj2[property] != tncObj[property]){
            if (tncObj2[property] < tncObj[property]) {
              return {flage : true, compare: 'arrow_upward'}
            } else if (tncObj2[property] > tncObj[property]) {
              return {flage : true, compare: 'arrow_downward'}
            } else {
              return {flage : true, compare: null} 
            } 
          }else {
           return {flage : false, compare: null}
          }
        }else {
          return {flage : true,compare: null}
        }
      }else{
        return {flage : true,compare: null}
      }
    }else{
      return {flage : true,compare: null}
    }
  }

  ifTncNotePadObjectChanged(obj, property) {
    // notepadInputVal
    let notepadOBJ;
    let notepadOBJ2;
    notepadOBJ = obj;//tncObj.notepadDtoList[nindex];
    notepadOBJ2 = _.find(this.obj2.retailCustomerDTO.notepadTrans, { 'id': notepadOBJ.id });
    if (notepadOBJ2) {
      if (notepadOBJ2[property] != notepadOBJ[property]) {
        return true
      } else {
        return false;
      }
    } else {
      return true;
    }



  }

  ifRatecardCommercialObjectChanged(item, sindex, rindex, cindex, property) {
    let serviceOfferingsObj, rateCardsObj, commercialObj;
    let serviceOfferingsObj2, rateCardsObj2, commercialObj2;

    serviceOfferingsObj = this.obj1.serviceOfferings[sindex];
    rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    commercialObj = rateCardsObj.commercialDTOs[cindex];

    serviceOfferingsObj2 = _.find(this.obj2.serviceOfferings, {'serviceLine': serviceOfferingsObj.serviceLine, 'serviceOfferingName': serviceOfferingsObj.serviceOfferingName});
    if(serviceOfferingsObj2){
      rateCardsObj2 =  serviceOfferingsObj2.rateCards;     
      if(rateCardsObj2){
        rateCardsObj2.filter(obj => {
        let commercialObjTemp = _.find(obj.commercialDTOs, {'id' : commercialObj.id}); 
          if(commercialObjTemp){
            commercialObj2 = commercialObjTemp
          }
        });
        if(commercialObj2){
          if(commercialObj2[property] != commercialObj[property]){
            if (commercialObj2[property] < commercialObj[property]) {
              return {flage : true, compare: 'arrow_upward'}
            } else if (commercialObj2[property] > commercialObj[property]) {
              return {flage : true, compare: 'arrow_downward'}
            } else {
              return {flage : true, compare: null} 
            } 
          }else {
          return {flage : false, compare: null}
          }
        }else {
          return {flage : true,compare: null}
        }
      }else{
        return {flage : true,compare: null}
      }
    }else{
      return {flage : true,compare: null}
    }
  }


  ifRatecardBranchObjectChanged(item, sindex, rindex, cindex, property) {
    let serviceOfferingsObj, rateCardsObj, branchObj;
    let serviceOfferingsObj2, rateCardsObj2, branchObj2;

    serviceOfferingsObj = this.obj1.serviceOfferings[sindex];
    rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    branchObj = rateCardsObj.branchDTOs[cindex];

    serviceOfferingsObj2 = _.find(this.obj2.serviceOfferings, {'serviceLine': serviceOfferingsObj.serviceLine, 'serviceOfferingName': serviceOfferingsObj.serviceOfferingName});
    if(serviceOfferingsObj2){
      rateCardsObj2 =  serviceOfferingsObj2.rateCards;     
      if(rateCardsObj2){
        rateCardsObj2.filter(obj => {
         let commercialObjTemp = _.find(obj.branchDTOs, {'id' : branchObj.id}); 
          if(commercialObjTemp){
            branchObj2 = commercialObjTemp
          }
        });
        if(branchObj2){
          if(branchObj2[property] != branchObj[property]){
              return true
          }else {
            return false;
          }
        }else {
          return true;
        }
      }else{
        return true;
      }
    }else{
      return true;
    }
  }
  // Cluster Branch Start 
  ifRatecardClustBranchObjectChanged(item, property) {
   // debugger
    let branchObj;
    let branchObj2: any = [];
    branchObj = item;//this.obj1.branchDTOs[cindex];
    
    branchObj2 = _.find(this.obj2.clusterBranchDTOs, { 'id': branchObj.id });

    if (branchObj2) {
      if (branchObj2[property] != branchObj[property]) {
        return true
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  // Cluster Branch End

  ifRatecardClustBranchCosignObjectChanged(branchItem,b,j,item, property){
    let branchObj, branchPinCneeCnorDtoListObj1;
    let branchObj2: any = [], branchPinCneeCnorDtoListObj2;
    branchObj = branchItem;//this.obj1.branchDTOs[cindex];
    branchObj2 = _.find(this.obj2.clusterBranchDTOs, { 'id': branchObj.id });
    if (branchObj2) {
      branchPinCneeCnorDtoListObj1 = item;
      branchPinCneeCnorDtoListObj2 = _.find(branchObj2.branchPinCneeCnorDtoList, { 'id': item.cneeCnorId });
      if (branchPinCneeCnorDtoListObj2) {
        return true
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  ifRatecardCommandmentObjectChanged(item, sindex, rindex, cindex, cdIndex, property) {
    let serviceOfferingsObj, rateCardsObj, commandmendObj, zmPriceObj;
    let serviceOfferingsObj2, rateCardsObj2, commandmendObj2, zmPriceObj2;

    serviceOfferingsObj = this.obj1.serviceOfferings[sindex];
    rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    commandmendObj = rateCardsObj.commandmentChargeDTOs[cdIndex][cindex];
    serviceOfferingsObj2 = _.find(this.obj2.serviceOfferings, {'serviceLine': serviceOfferingsObj.serviceLine, 'serviceOfferingName': serviceOfferingsObj.serviceOfferingName});
    if(serviceOfferingsObj2){
      rateCardsObj2 =  serviceOfferingsObj2.rateCards;     
      if(rateCardsObj2){
        rateCardsObj2.filter(obj => {
         let commercialObjTemp = _.find(obj.commandmentChargeDTOs[cdIndex], {'id' : commandmendObj.id}); 
          if(commercialObjTemp){
            commandmendObj2 = commercialObjTemp
          }
        });
        if(commandmendObj2){
          // zmPriceObj2 = _.find(commandmendObj2.pricingParamTrans, {'id' : zmPriceObj.id});
          // if(zmPriceObj2){
            if(commandmendObj2[property] != commandmendObj[property]){
              if (commandmendObj2[property] < commandmendObj[property]) {
                return {flage : true, compare: 'arrow_upward'}
              } else if (commandmendObj2[property] > commandmendObj[property]) {
                return {flage : true, compare: 'arrow_downward'}
              } else {
                return {flage : true, compare: null} 
              } 
          }else {
           return {flage : false, compare: null}
          }
          // }else{
          //   return true
          // }
        }else {
          return {flage : true,compare: null}
        }
      }else{
        return {flage : true,compare: null}
      }
    }else{
      return {flage : true,compare: null}
    }
  }


  ifRatecardCommercialZmPriceObjectChanged(cmitem, zmitem, sindex, rindex, cindex, zmi, property) {
    let serviceOfferingsObj, rateCardsObj, commercialObj, zmPriceObj;
    let serviceOfferingsObj2, rateCardsObj2, commercialObj2, zmPriceObj2;

    serviceOfferingsObj = this.obj1.serviceOfferings[sindex];
    rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    commercialObj = rateCardsObj.commercialDTOs[cindex];
    zmPriceObj = commercialObj.zmPrice[zmi];

    serviceOfferingsObj2 = _.find(this.obj2.serviceOfferings, {'serviceLine': serviceOfferingsObj.serviceLine, 'serviceOfferingName': serviceOfferingsObj.serviceOfferingName});
    if(serviceOfferingsObj2){
      rateCardsObj2 =  serviceOfferingsObj2.rateCards;     
      if(rateCardsObj2){
        rateCardsObj2.filter(obj => {
         let commercialObjTemp = _.find(obj.commercialDTOs, {'id' : commercialObj.id}); 
          if(commercialObjTemp){
            commercialObj2 = commercialObjTemp
          }
        });
        if(commercialObj2){
          zmPriceObj2 = _.find(commercialObj2.zmPrice, {'id' : zmPriceObj.id});
          if(zmPriceObj2){
            if(zmPriceObj2[property] != zmPriceObj[property]){
              if (zmPriceObj2[property] < zmPriceObj[property]) {
                return {flage : true, compare: 'arrow_upward'}
              } else if (zmPriceObj2[property] > zmPriceObj[property]) {
                return {flage : true, compare: 'arrow_downward'}
              } else {
                return {flage : true, compare: null} 
              } 
          }else {
           return {flage : false, compare: null}
          }
          }else{
            return {flage : true,compare: null}
          }
        }else {
          return {flage : true,compare: null}
        }
      }else{
        return {flage : true,compare: null}
      }
    }else{
      return {flage : true,compare: null}
    }
  }


  ifRatecardCmdSlabObjectChanged(cmitem, slabitem, sindex, rindex, cindex,cdIndex, slabindex, property) {
    let serviceOfferingsObj, rateCardsObj, commandmendObj, zmPriceObj;
    let serviceOfferingsObj2, rateCardsObj2, commandmendObj2, zmPriceObj2;

    serviceOfferingsObj = this.obj1.serviceOfferings[sindex];
    rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    commandmendObj = rateCardsObj.commandmentChargeDTOs[cdIndex][cindex];
    zmPriceObj = commandmendObj.cmdmntSlabCharge[slabindex];
    serviceOfferingsObj2 = _.find(this.obj2.serviceOfferings, {'serviceLine': serviceOfferingsObj.serviceLine, 'serviceOfferingName': serviceOfferingsObj.serviceOfferingName});
    if(serviceOfferingsObj2){
      rateCardsObj2 =  serviceOfferingsObj2.rateCards;     
      if(rateCardsObj2){
        rateCardsObj2.filter(obj => {
         let commercialObjTemp = _.find(obj.commandmentChargeDTOs[cdIndex], {'id' : commandmendObj.id}); 
          if(commercialObjTemp){
            commandmendObj2 = commercialObjTemp
          }
        });
        if(commandmendObj2){
          zmPriceObj2 = _.find(commandmendObj2.cmdmntSlabCharge, {'id' : zmPriceObj.id});
          if(zmPriceObj2){
            if (zmPriceObj2[property] != zmPriceObj[property]) {
              if (zmPriceObj2[property] < zmPriceObj[property]) {
                return { flage: true, compare: 'arrow_upward' }
              } else if (zmPriceObj2[property] > zmPriceObj[property]) {
                return { flage: true, compare: 'arrow_downward' }
              } else {
                return { flage: true, compare: null }
              }
            } else {
              return { flage: false, compare: null }
            }
          }else{
            return {flage : true,compare: null}
          }
        }else {
          return {flage : true,compare: null}
        }
      }else{
        return {flage : true,compare: null}
      }
    }else{
      return {flage : true,compare: null}
    }
  }


  ifRatecardCSLAObjectChanged(item, sindex, rindex, cindex, property) {
    let serviceOfferingsObj, rateCardsObj, slaObj, zmPriceObj;
    let serviceOfferingsObj2, rateCardsObj2, slaObj2, zmPriceObj2;

    serviceOfferingsObj = this.obj1.serviceOfferings[sindex];
    rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    slaObj = rateCardsObj.zmCustomSlaDTOs[cindex]
    serviceOfferingsObj2 = _.find(this.obj2.serviceOfferings, {'serviceLine': serviceOfferingsObj.serviceLine, 'serviceOfferingName': serviceOfferingsObj.serviceOfferingName});
    if(serviceOfferingsObj2){
      rateCardsObj2 =  serviceOfferingsObj2.rateCards;     
      if(rateCardsObj2){
        rateCardsObj2.filter(obj => {
        let commercialObjTemp = _.find(obj.zmCustomSlaDTOs, {'id' : slaObj.id}); 
          if(commercialObjTemp){
            slaObj2 = commercialObjTemp
          }
        });
        if(slaObj2){
            if(slaObj2[property] != slaObj[property]){
              if (slaObj2[property] < slaObj[property]) {
                return {flage : true, compare: 'arrow_upward'}
              } else if (slaObj2[property] > slaObj[property]) {
                return {flage : true, compare: 'arrow_downward'}
              } else {
                return {flage : true, compare: null} 
              } 
          }else {
          return {flage : false, compare: null}
          }
        }else {
          return {flage : true,compare: null}
        }
      }else{
        return {flage : true,compare: null}
      }
    }else{
      return {flage : true,compare: null}
    }
  }



  ifRatecardSafextSlaDTOsObjectChanged(item, sindex, rindex, cindex, property) {

    let serviceOfferingsObj, rateCardsObj, slaObj, zmPriceObj;
    let serviceOfferingsObj2, rateCardsObj2, slaObj2, zmPriceObj2;

    serviceOfferingsObj = this.obj1.serviceOfferings[sindex];
    rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    slaObj = rateCardsObj.safextSlaDTOs[cindex]
    serviceOfferingsObj2 = _.find(this.obj2.serviceOfferings, {'serviceLine': serviceOfferingsObj.serviceLine, 'serviceOfferingName': serviceOfferingsObj.serviceOfferingName});
    if(serviceOfferingsObj2){
      rateCardsObj2 =  serviceOfferingsObj2.rateCards;     
      if(rateCardsObj2){
        rateCardsObj2.filter(obj => {
         let commercialObjTemp = _.find(obj.safextSlaDTOs, {'id' : slaObj.id}); 
          if(commercialObjTemp){
            slaObj2 = commercialObjTemp
          }
        });
        if(slaObj2){
            if(slaObj2[property] != slaObj[property]){
              if (slaObj2[property] < slaObj[property]) {
                return {flage : true, compare: 'arrow_upward'}
              } else if (slaObj2[property] > slaObj[property]) {
                return {flage : true, compare: 'arrow_downward'}
              } else {
                return {flage : true, compare: null} 
              } 
          }else {
           return {flage : false, compare: null}
          }
        }else {
          return {flage : true,compare: null}
        }
      }else{
        return {flage : true,compare: null}
      }
    }else{
      return {flage : true,compare: null}
    }
  }



  ifRatecardZmSLAObjectChanged(item, sindex, rindex, cindex, property) {

    let serviceOfferingsObj, rateCardsObj, slaObj, zmPriceObj;
    let serviceOfferingsObj2, rateCardsObj2, slaObj2, zmPriceObj2;

    serviceOfferingsObj = this.obj1.serviceOfferings[sindex];
    rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    slaObj = rateCardsObj.zmSlaDTOs[cindex]
    serviceOfferingsObj2 = _.find(this.obj2.serviceOfferings, {'serviceLine': serviceOfferingsObj.serviceLine, 'serviceOfferingName': serviceOfferingsObj.serviceOfferingName});
    if(serviceOfferingsObj2){
      rateCardsObj2 =  serviceOfferingsObj2.rateCards;     
      if(rateCardsObj2){
        rateCardsObj2.filter(obj => {
         let commercialObjTemp = _.find(obj.zmSlaDTOs, {'id' : slaObj.id}); 
          if(commercialObjTemp){
            slaObj2 = commercialObjTemp
          }
        });
        if(slaObj2){
            if(slaObj2[property] != slaObj[property]){
              if (slaObj2[property] < slaObj[property]) {
                return {flage : true, compare: 'arrow_upward'}
              } else if (slaObj2[property] > slaObj[property]) {
                return {flage : true, compare: 'arrow_downward'}
              } else {
                return {flage : true, compare: null} 
              } 
          }else {
           return {flage : false, compare: null}
          }
        }else {
          return {flage : true,compare: null}
        }
      }else{
        return {flage : true,compare: null}
      }
    }else{
      return {flage : true,compare: null}
    }
  }



  ifRatecardCommercialZmCustomPriceObjectChanged(cmitem, zmitem, sindex, rindex, cindex, zmi, property) {
    let serviceOfferingsObj, rateCardsObj, commercialObj, zmPriceObj;
    let serviceOfferingsObj2, rateCardsObj2, commercialObj2, zmPriceObj2;

    serviceOfferingsObj = this.obj1.serviceOfferings[sindex];
    rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    commercialObj = rateCardsObj.commercialDTOs[cindex];
    zmPriceObj = commercialObj.zmCustomPrice[zmi];

    serviceOfferingsObj2 = _.find(this.obj2.serviceOfferings, {'serviceLine': serviceOfferingsObj.serviceLine, 'serviceOfferingName': serviceOfferingsObj.serviceOfferingName});
    if(serviceOfferingsObj2){
      rateCardsObj2 =  serviceOfferingsObj2.rateCards;     
      if(rateCardsObj2){
        rateCardsObj2.filter(obj => {
         let commercialObjTemp = _.find(obj.commercialDTOs, {'id' : commercialObj.id}); 
          if(commercialObjTemp){
            commercialObj2 = commercialObjTemp
          }
        });
        if(commercialObj2){
          zmPriceObj2 = _.find(commercialObj2.zmCustomPrice, {'id' : zmPriceObj.id});
          if(zmPriceObj2){
            if(zmPriceObj2[property] != zmPriceObj[property]){
              if (zmPriceObj2[property] < zmPriceObj[property]) {
              return {flage : true, compare: 'arrow_upward'}
            } else if (zmPriceObj2[property] > zmPriceObj[property]) {
              return {flage : true, compare: 'arrow_downward'}
            } else {
              return {flage : true, compare: null} 
            } 
          }else {
           return {flage : false, compare: null}
          }
          }else{
            return {flage : true,compare: null}
          }
        }else {
          return {flage : true,compare: null}
        }
      }else{
        return {flage : true,compare: null}
      }
    }else{
      return {flage : true,compare: null}
    }
  }


  ifRatecardCommercialSafextensionObjectChanged(cmitem, sfxitem, sindex, rindex, cindex, obindex, property) {

    let serviceOfferingsObj, rateCardsObj, commercialObj, zmPriceObj;
    let serviceOfferingsObj2, rateCardsObj2, commercialObj2, zmPriceObj2;

    serviceOfferingsObj = this.obj1.serviceOfferings[sindex];
    rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    commercialObj = rateCardsObj.commercialDTOs[cindex];
    zmPriceObj = commercialObj.safextCharge[obindex];

    serviceOfferingsObj2 = _.find(this.obj2.serviceOfferings, {'serviceLine': serviceOfferingsObj.serviceLine, 'serviceOfferingName': serviceOfferingsObj.serviceOfferingName});
    if(serviceOfferingsObj2){
      rateCardsObj2 =  serviceOfferingsObj2.rateCards;     
      if(rateCardsObj2){
        rateCardsObj2.filter(obj => {
         let commercialObjTemp = _.find(obj.commercialDTOs, {'id' : commercialObj.id}); 
          if(commercialObjTemp){
            commercialObj2 = commercialObjTemp
          }
        });
        if(commercialObj2){
          zmPriceObj2 = _.find(commercialObj2.safextCharge, {'id' : zmPriceObj.id});
          if(zmPriceObj2){
            if(zmPriceObj2[property] != zmPriceObj[property]){
              if (zmPriceObj2[property] < zmPriceObj[property]) {
              return {flage : true, compare: 'arrow_upward'}
            } else if (zmPriceObj2[property] > zmPriceObj[property]) {
              return {flage : true, compare: 'arrow_downward'}
            } else {
              return {flage : true, compare: null} 
            } 
          }else {
           return {flage : false, compare: null}
          }
          }else{
            return {flage : true,compare: null}
          }
        }else {
          return {flage : true,compare: null}
        }
      }else{
        return {flage : true,compare: null}
      }
    }else{
      return {flage : true,compare: null}
    }
    
  }


  ifRatecardCommercialSafexDlvryCustomChargeObjectChanged(cmitem, sfxitem, sindex, rindex, cindex, obindex, property) {
    let serviceOfferingsObj, rateCardsObj, commercialObj, zmPriceObj;
    let serviceOfferingsObj2, rateCardsObj2, commercialObj2, zmPriceObj2;

    serviceOfferingsObj = this.obj1.serviceOfferings[sindex];
    rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    commercialObj = rateCardsObj.commercialDTOs[cindex];
    zmPriceObj = commercialObj.safextDlvryCustomCharge[obindex];

    serviceOfferingsObj2 = _.find(this.obj2.serviceOfferings, {'serviceLine': serviceOfferingsObj.serviceLine, 'serviceOfferingName': serviceOfferingsObj.serviceOfferingName});
    if(serviceOfferingsObj2){
      rateCardsObj2 =  serviceOfferingsObj2.rateCards;     
      if(rateCardsObj2){
        rateCardsObj2.filter(obj => {
         let commercialObjTemp = _.find(obj.commercialDTOs, {'id' : commercialObj.id}); 
          if(commercialObjTemp){
            commercialObj2 = commercialObjTemp
          }
        });
        if(commercialObj2){
          zmPriceObj2 = _.find(commercialObj2.safextDlvryCustomCharge, {'id' : zmPriceObj.id});
          if(zmPriceObj2){
            if(zmPriceObj2[property] != zmPriceObj[property]){
              if (zmPriceObj2[property] < zmPriceObj[property]) {
              return {flage : true, compare: 'arrow_upward'}
            } else if (zmPriceObj2[property] > zmPriceObj[property]) {
              return {flage : true, compare: 'arrow_downward'}
            } else {
              return {flage : true, compare: null} 
            } 
          }else {
           return {flage : false, compare: null}
          }
          }else{
            return {flage : true,compare: null}
          }
        }else {
          return {flage : true,compare: null}
        }
      }else{
        return {flage : true,compare: null}
      }
    }else{
      return {flage : true,compare: null}
    }
   
  }



  ifRatecardCommercialSafexBkngCustomChargeObjectChanged(cmitem, sfxitem, sindex, rindex, cindex, objindex, property) {

    let serviceOfferingsObj, rateCardsObj, commercialObj, zmPriceObj;
    let serviceOfferingsObj2, rateCardsObj2, commercialObj2, zmPriceObj2;

    serviceOfferingsObj = this.obj1.serviceOfferings[sindex];
    rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    commercialObj = rateCardsObj.commercialDTOs[cindex];
    zmPriceObj = commercialObj.safextBkngCustomCharge[objindex];

    serviceOfferingsObj2 = _.find(this.obj2.serviceOfferings, {'serviceLine': serviceOfferingsObj.serviceLine, 'serviceOfferingName': serviceOfferingsObj.serviceOfferingName});
    if(serviceOfferingsObj2){
      rateCardsObj2 =  serviceOfferingsObj2.rateCards;     
      if(rateCardsObj2){
        rateCardsObj2.filter(obj => {
         let commercialObjTemp = _.find(obj.commercialDTOs, {'id' : commercialObj.id}); 
          if(commercialObjTemp){
            commercialObj2 = commercialObjTemp
          }
        });
        if(commercialObj2){
          zmPriceObj2 = _.find(commercialObj2.safextBkngCustomCharge, {'id' : zmPriceObj.id});
          if(zmPriceObj2){
            if(zmPriceObj2[property] != zmPriceObj[property]){
              if (zmPriceObj2[property] < zmPriceObj[property]) {
              return {flage : true, compare: 'arrow_upward'}
            } else if (zmPriceObj2[property] > zmPriceObj[property]) {
              return {flage : true, compare: 'arrow_downward'}
            } else {
              return {flage : true, compare: null} 
            } 
          }else {
           return {flage : false, compare: null}
          }
          }else{
            return {flage : true,compare: null}
          }
        }else {
          return {flage : true,compare: null}
        }
      }else{
        return {flage : true,compare: null}
      }
    }else{
      return {flage : true,compare: null}
    }
   
  }


  ifRatecardCommercialPricingParamTransObjectChanged(cmitem, sfxitem, sindex, rindex, cindex, obindex, property) {
    let serviceOfferingsObj, rateCardsObj, commercialObj, zmPriceObj;
    let serviceOfferingsObj2, rateCardsObj2, commercialObj2, zmPriceObj2;

    serviceOfferingsObj = this.obj1.serviceOfferings[sindex];
    rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    commercialObj = rateCardsObj.commercialDTOs[cindex];
    zmPriceObj = commercialObj.pricingParamTrans[obindex];

    serviceOfferingsObj2 = _.find(this.obj2.serviceOfferings, {'serviceLine': serviceOfferingsObj.serviceLine, 'serviceOfferingName': serviceOfferingsObj.serviceOfferingName});
    if(serviceOfferingsObj2){
      rateCardsObj2 =  serviceOfferingsObj2.rateCards;     
      if(rateCardsObj2){
        rateCardsObj2.filter(obj => {
         let commercialObjTemp = _.find(obj.commercialDTOs, {'id' : commercialObj.id}); 
          if(commercialObjTemp){
            commercialObj2 = commercialObjTemp
          }
        });
        if(commercialObj2){
          zmPriceObj2 = _.find(commercialObj2.pricingParamTrans, {'id' : zmPriceObj.id});
          if(zmPriceObj2){
            if(zmPriceObj2[property] != zmPriceObj[property]){
              if (zmPriceObj2[property] < zmPriceObj[property]) {
              return {flage : true, compare: 'arrow_upward'}
            } else if (zmPriceObj2[property] > zmPriceObj[property]) {
              return {flage : true, compare: 'arrow_downward'}
            } else {
              return {flage : true, compare: null} 
            } 
          }else {
           return {flage : false, compare: null}
          }
          }else{
            return {flage : true,compare: null}
          }
        }else {
          return {flage : true,compare: null}
        }
      }else{
        return {flage : true,compare: null}
      }
    }else{
      return {flage : true,compare: null}
    }
  }

  ifBiillingDtobjectChanged(bi, property) {
    let billingDtoObj = this.versionDifference.billingDtoList[bi];
    if (billingDtoObj && billingDtoObj.hasOwnProperty(property)) {
      return true;
    }
    else return false;
  }

  ifBiillingByItemObjectChanged(bi, bbi, property) {
    let billingDtoObj = this.versionDifference.billingDtoList[bi];
    let bbiObj = billingDtoObj.billingBy[bbi];
    if (bbiObj && bbiObj.hasOwnProperty(property)) {
      return true;
    }
    else return false;
  }

  ifCnItemObjectChanged(bi, ci, property) {
    let billingDtoObj = this.versionDifference.billingDtoList[bi];
    let bcn = billingDtoObj.billingCneeCnorMap[ci];
    if (bcn && bcn.hasOwnProperty(property)) {
      return true;
    }
    else return false;
  }
  ifOfferingObjectChanged(bi, oi, property) {
    let billingDtoObj = this.versionDifference.billingDtoList[bi];
    let bo = billingDtoObj.billingOfferingMap[oi];
    if (bo && bo.hasOwnProperty(property)) {
      return true;
    }
    else return false;
  }

  ifRatecardsafextSlaObjectChanged(item, sindex, rindex, cindex, property) {
    let serviceOfferingsObj, rateCardsObj, slaObj, zmPriceObj;
    let serviceOfferingsObj2, rateCardsObj2, slaObj2, zmPriceObj2;

    serviceOfferingsObj = this.obj1.serviceOfferings[sindex];
    rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    slaObj = rateCardsObj.safextSlaDTOs[cindex]
    serviceOfferingsObj2 = _.find(this.obj2.serviceOfferings, {'serviceLine': serviceOfferingsObj.serviceLine, 'serviceOfferingName': serviceOfferingsObj.serviceOfferingName});
    if(serviceOfferingsObj2){
      rateCardsObj2 =  serviceOfferingsObj2.rateCards;     
      if(rateCardsObj2){
        rateCardsObj2.filter(obj => {
         let commercialObjTemp = _.find(obj.safextSlaDTOs, {'id' : slaObj.id}); 
          if(commercialObjTemp){
            slaObj2 = commercialObjTemp
          }
        });
        if(slaObj2){
            if(slaObj2[property] != slaObj[property]){
              if (slaObj2[property] < slaObj[property]) {
              return {flage : true, compare: 'arrow_upward'}
            } else if (slaObj2[property] > slaObj[property]) {
              return {flage : true, compare: 'arrow_downward'}
            } else {
              return {flage : true, compare: null} 
            } 
          }else {
           return {flage : false, compare: null}
          }
        }else {
          return {flage : true,compare: null}
        }
      }else{
        return {flage : true,compare: null}
      }
    }else{
      return {flage : true,compare: null}
    }
  }

  compareVersionDifference(obj1, obj2) {
    const result = {};
    if (Object.is(obj1, obj2)) {
      return undefined;
    }
    if (!obj2 || typeof obj2 !== 'object') {
      return obj2;
    }
    Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach(key => {
      if (obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
        result[key] = obj2[key];
      }
      if (typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
        const value = this.compareVersionDifference(obj1[key], obj2[key]);
        if (value !== undefined) {
          result[key] = value;
        }
      }
    });
    return result;
  }


  compareVersionCom(obj1, obj2) {
    const result = {};
    if (Object.is(obj1, obj2)) {
      return undefined;
    }
    if (!obj2 || typeof obj2 != 'object') {
      return obj2;
    }
    Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach(key => {
      if ((obj2[key]) != obj1[key] && !Object.is(obj1[key], obj2[key])) {
        
        result[key] = obj2[key];
        if (obj2[key] > obj1[key]) {
          result[key] = 'arrow_upward';
        } else if (obj2[key] < obj1[key]) {
          result[key] = 'arrow_downward';
        }

      }
      if (typeof obj2[key] == 'object' && typeof obj1[key] == 'object') {
        const value = this.compareVersionCom(obj1[key], obj2[key]);
        if (value != undefined) {
          result[key] = value;
        }
      }
    });
    return result;
  }

  closeDialog() {
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      data: { message: 'Are you sure ?' },
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if (value) {
        this.dialogCompareVersion.close();
      } else {
        console.log('Keep Open');
      }
    });
  }

  sendEmail(){

    let userDt = JSON.parse(sessionStorage.getItem("all")).data.responseData.user;
    
    const addrDialog = this.dialog.open(EmailDialogBoxP, {
      panelClass: 'creditDialog',
      disableClose: true,
      data : {email : userDt.email}
    });
    addrDialog.afterClosed().subscribe(result => {           
      if (result && result!="") {

    this.spinner.show();
    let ob = {
      "userId": userDt.userId, "toEmail": result,
      "subject": "Preview PDF For: " +this.obj1.msaDto.custName, "contractCode": this.obj1.sfxCode?this.obj1.sfxCode:'NOT GENERATED YET'
    }
    this.exportAsService.get(this.exportAsConfig).subscribe(content => {
      let file1 = this.b64toBlob(content)
      this.sendData(ob,file1)
    }); 
    // const printContent = document.getElementById("previewContent");
    // let doc = new jspdf('p', 'pt', 'a4');
    // doc.fromHTML(printContent.innerHTML, 15, 15);
    // var file = new Blob([doc.output()], {
    //   type: 'application/pdf'
    // });
    }
  });    
}

 b64toBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'application/pdf' });
  }

 sendData(ob, file){
  this.spinner.show();
  this.contractService.sendEmail(file, JSON.stringify(ob))
  .subscribe(data => {
    this.spinner.hide();
    this.tosterservice.success("Email Sent Successfully !");
  }, error => {
    this.spinner.hide();
    this.tosterservice.error('Issue In Sending Email !');
  });

 }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) { // esc [Close Dialog]
      event.preventDefault();
      if (document.getElementById('closeButton')) {
        let element = document.getElementById('closeButton')  ;
        element.click();
      }
    }
  }


}
