import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContractService } from '../contract.service';
import { ErrorConstants } from '../models/constants';
import { ToastrService } from 'ngx-toastr';
import { confimationdialog } from '../confirmationdialog/confimationdialog';


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

  constructor(
    private contractService: ContractService,
    public dialogCompareVersion: MatDialogRef<CompareversionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private spinner: NgxSpinnerService, private tosterservice: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.spinner.show();
    if (this.data) {
      this.compareVersions(this.data);
    }

  }



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
            // this.spinner.hide();
            this.tosterservice.error(ErrorConstants.getValue(404));
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
            this.spinner.hide();
            this.tosterservice.error(ErrorConstants.getValue(404));
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

    let serviceOfferingsObj = this.versionDifference.serviceOfferings[sindex];
    let rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    if (rateCardsObj.ratecardDTO && rateCardsObj.ratecardDTO.hasOwnProperty(property)) {
      return true;
    }
    else return false;
  }

  ifRatecardTncObjectChanged(item, sindex, rindex, property) {
    let serviceOfferingsObj = this.versionDifference.serviceOfferings[sindex];
    let rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    if (rateCardsObj.tncDTO && rateCardsObj.tncDTO.hasOwnProperty(property)) {
      return true;
    }
    else false;
  }

  ifTncNotePadObjectChanged(sindex, rindex, nindex, property) {
    let serviceOfferingsObj = this.versionDifference.serviceOfferings[sindex];
    let rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    let notepadOBJ = rateCardsObj.tncDTO.notepadDtoList[nindex];
    if (notepadOBJ && notepadOBJ.hasOwnProperty(property)) {
      return true;
    }
    else false;
  }

  ifRatecardCommercialObjectChanged(item, sindex, rindex, cindex, property) {
    let serviceOfferingsObj = this.versionDifference.serviceOfferings[sindex];
    let rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    let commercialObj = rateCardsObj.commercialDTOs[cindex];
    if (commercialObj && commercialObj.hasOwnProperty(property)) {
      return true;
    }
    else false;
  }

  ifRatecardBranchObjectChanged(item, sindex, rindex, cindex, property) {
    let serviceOfferingsObj = this.versionDifference.serviceOfferings[sindex];
    let rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    let branchObj = rateCardsObj.branchDTOs[cindex];
    if (branchObj && branchObj.hasOwnProperty(property)) {
      return true;
    }
    else false;
  }

  ifRatecardCommandmentObjectChanged(item, sindex, rindex, cindex, cdIndex, property) {
    let serviceOfferingsObj = this.versionDifference.serviceOfferings[sindex];
    let rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    let cmdObj = rateCardsObj.commandmentChargeDTOs[cdIndex][cindex];
    if (cmdObj && cmdObj.hasOwnProperty(property)) {
      return true;
    }
    else false;
  }



  ifRatecardCommercialZmPriceObjectChanged(cmitem, zmitem, sindex, rindex, cindex, zmi, property) {

    let serviceOfferingsObj = this.versionDifference.serviceOfferings[sindex];
    let rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    let commercialObj = rateCardsObj.commercialDTOs[cindex];
    let obj = commercialObj.zmPrice[zmi];
    if (obj && obj.hasOwnProperty(property)) {
      return true;
    }
    else false;
  }

  ifRatecardCmdSlabObjectChanged(cmitem, slabitem, sindex, rindex, cindex,cdIndex, slabindex, property) {
    let serviceOfferingsObj = this.versionDifference.serviceOfferings[sindex];
    let rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    let cmdObj = rateCardsObj.commandmentChargeDTOs[cdIndex][cindex];
    let obj = cmdObj.cmdmntSlabCharge[slabindex];
    if (obj && obj.hasOwnProperty(property)) {
      return true;
    }
    else false;
  }


  ifRatecardCSLAObjectChanged(item, sindex, rindex, cindex, property) {
    let serviceOfferingsObj = this.versionDifference.serviceOfferings[sindex];
    let rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    let obj = rateCardsObj.zmSlaDTOs[cindex];
    if (obj && obj.hasOwnProperty(property)) {
      return true
    }
    else false;
  }




  ifRatecardSafextSlaDTOsObjectChanged(item, sindex, rindex, cindex, property) {

    let serviceOfferingsObj = this.versionDifference.serviceOfferings[sindex];
    let rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    let obj = rateCardsObj.safextSlaDTOs[cindex];
    if (obj && obj.hasOwnProperty(property)) {
      return true;
    }
    else false;
  }



  ifRatecardZmSLAObjectChanged(item, sindex, rindex, cindex, property) {

    let serviceOfferingsObj = this.versionDifference.serviceOfferings[sindex];
    let rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    let obj = rateCardsObj.zmSlaDTOs[cindex]
    if (obj && obj.hasOwnProperty(property)) {
      return true;
    }
    else false;
  }



  ifRatecardCommercialZmCustomPriceObjectChanged(cmitem, zmitem, sindex, rindex, cindex, zmi, property) {
    let serviceOfferingsObj = this.versionDifference.serviceOfferings[sindex];
    let rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    let commercialObj = rateCardsObj.commercialDTOs[cindex];
    let obj = commercialObj[zmi]
    if (obj && obj && obj.hasOwnProperty(property)) {
      return true;
    }
    else false;
  }

  ifRatecardCommercialSafextensionObjectChanged(cmitem, sfxitem, sindex, rindex, cindex, obindex, property) {
    let serviceOfferingsObj = this.versionDifference.serviceOfferings[sindex];
    let rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    let commercialObj = rateCardsObj.commercialDTOs[cindex];
    let obj = commercialObj.safextCharge[obindex]
    if (obj && obj.hasOwnProperty(property)) {
      return true;
    }
    else false;
  }



  ifRatecardCommercialSafexDlvryCustomChargeObjectChanged(cmitem, sfxitem, sindex, rindex, cindex, obindex, property) {
    let serviceOfferingsObj = this.versionDifference.serviceOfferings[sindex];
    let rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    let commercialObj = rateCardsObj.commercialDTOs[cindex];

    let obj = commercialObj.safextDlvryCustomCharge[obindex]
    if (obj && obj.hasOwnProperty(property)) {
      return true;
    }
    else false;
  }



  ifRatecardCommercialSafexBkngCustomChargeObjectChanged(cmitem, sfxitem, sindex, rindex, cindex, objindex, property) {
    let serviceOfferingsObj = this.versionDifference.serviceOfferings[sindex];
    let rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    let commercialObj = rateCardsObj.commercialDTOs[cindex];
    let obj = commercialObj.safextBkngCustomCharge[objindex]
    if (obj && obj.hasOwnProperty(property)) {
      return true;
    }
    else false;
  }


  ifRatecardCommercialPricingParamTransObjectChanged(cmitem, sfxitem, sindex, rindex, cindex, obindex, property) {
    let serviceOfferingsObj = this.versionDifference.serviceOfferings[sindex];
    let rateCardsObj = serviceOfferingsObj.rateCards[rindex];
    let commercialObj = rateCardsObj.commercialDTOs[cindex];
    let obj = commercialObj.pricingParamTrans[obindex];
    if (obj && obj.hasOwnProperty(property)) {
      return true;
    }
    else false;
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
        
        result[key] = 'abc' ;
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


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) { // esc [Close Dialog]
      event.preventDefault();
      if (document.getElementById('closeButton')) {
        let element: HTMLElement = document.getElementById('closeButton') as HTMLElement;
        element.click();
      }
    }
  }


}
