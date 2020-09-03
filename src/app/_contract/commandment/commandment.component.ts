import { Component, Input, Inject,OnChanges, ViewChild, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import * as models from "../models/commandmentModel";
import { ContractService } from '../contract.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router} from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { ErrorConstants } from '../models/constants';
import { AppSetting } from "../../app.setting";
import { Lookup } from '../models/billingModel';
import { confimationdialog } from '../confirmationdialog/confimationdialog';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from '../services/authorization.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-commandment',
  templateUrl: './commandment.component.html',
  styleUrls: ['../core.css'],
  providers: []
})
export class CommandmentComponent implements OnChanges {

  constructor(private contractservice: ContractService, private dialog: MatDialog, private spinner: NgxSpinnerService,
    private tosterService: ToastrService, private router: Router, private formBuilder: FormBuilder,
    private permissionsService: NgxPermissionsService, private authorizationService: AuthorizationService) { }

  cmdmntCharge: models.Commandment[];
  commandmentResult: models.CommandmentResult;
  cmdmntRef: models.CommandmentRef[];
  referenceList: models.ReferenceData;
  editflow: boolean;
  entityId: number;
  contractId: number;
  businessTypeId: number;
  customerTypeId: number;
  serviceOfferingId: number;
  geoColumns: string[];
  nonGeoColumns: string[];
  geoCmdmntCharge: models.Commandment[];
  nonGeoCmdmntCharge: models.Commandment[];


  createRadio() {
    let radio: models.Radio[] = [{ id: 1, value: 'RR' },
    { id: 0, value: 'NA' },
    { id: 2, value: 'CUSTOM' }
    ];
    return radio;
  }

  @ViewChild("fCommandment", null) saveCommandment: any;

  isValidCommandmentSlab() {
    let slabErrorFlag = false;
    
    this.geoCmdmntCharge.forEach(elem1=>{
      if ((elem1.rrFlag != 0 && elem1.rrFlag != 1) && elem1['slabErrorFlag']) {
         slabErrorFlag = true;     
      }
    })

    this.nonGeoCmdmntCharge.forEach(elem2=>{
      if ((elem2.rrFlag != 0 && elem2.rrFlag != 1) && elem2['slabErrorFlag']) {
         slabErrorFlag = true;   
      }
    })
    return slabErrorFlag;  
  }

  isValidCommandmentState() {
    let errorFlag = false;
    this.geoCmdmntCharge.forEach(data => {
      if ((data.rrFlag === 2) && data.geoTypeName === 'STATE' && data['stateErrorFlag']) {
        errorFlag = true;
      }
    });
    return errorFlag;
  }

  compareMin(element){
    if(element){
      if((Number(element.maxVal))<(Number(element.minVal))){
        element.minFlag = true;
      }
      else{
        element.minFlag = false;
      }
    }
  }
  isValidMinMax() {
    let slabErrorFlag = false;    
    this.geoCmdmntCharge.forEach(elem1=>{
      if ((elem1.rrFlag != 0 && elem1.rrFlag != 1)  && elem1['minFlag']) {
        slabErrorFlag = true;        }
    })
    this.nonGeoCmdmntCharge.forEach(elem2=>{
      if ((elem2.rrFlag != 0 && elem2.rrFlag != 1)  && elem2['minFlag']) {
        slabErrorFlag = true;        }
    })
    return slabErrorFlag;  
  }

  
  isValidCommandment() {
    
    let rrFlagValid = true;

    this.geoCmdmntCharge.forEach(elem1=>{
      if (elem1.rrFlag != 0 && elem1.rrFlag != 1){
          rrFlagValid = false;     
      }
    })

    this.nonGeoCmdmntCharge.forEach(elem2=>{
      if (elem2.rrFlag != 0 && elem2.rrFlag != 1) {
          rrFlagValid = false;     
      }
    })

    if ((this.saveCommandment.form.valid === true || rrFlagValid)) {
      this.saveCommandments(1);
    }else{
      if(this.saveCommandment.form.valid === false){
        this.tosterService.error('Some Required Fields Missing/Invalid !');
      }
    }

  }

  isValidCommandmentDraft() {
    
    let rrFlagValid = true;

    this.geoCmdmntCharge.forEach(elem1=>{
      if (elem1.rrFlag != 0 && elem1.rrFlag != 1) {
          rrFlagValid = false;     
      }
    })

    this.nonGeoCmdmntCharge.forEach(elem2=>{
      if (elem2.rrFlag != 0 && elem2.rrFlag != 1) {
          rrFlagValid = false;     
      }
    })

    if (this.saveCommandment.form.valid === true || rrFlagValid) {
      this.saveCommandments(0);
    }else{
      if(this.saveCommandment.form.valid === false){
        this.tosterService.error('Some Required Fields Missing/Invalid !');
      }
    }

  }

  @Input() inputData: any;
  @Output() cmdmntSaved = new EventEmitter<boolean>();
  isCmdmntSaved = false;
  @Output() anyCmdmntSaved = new EventEmitter<boolean>();
  isAnyCmdSaved = false;

  cmdmntSave(agreed: boolean) {
    this.cmdmntSaved.emit(agreed);
    this.isCmdmntSaved = true;
  }

  anyCmdmntSave(agreed: boolean) {
    this.anyCmdmntSaved.emit(agreed);
    this.isAnyCmdSaved = true;
  }

 
  ngOnChanges() {
    let perList = [];
    if (this.inputData.isCopyRateCard) {
      this.isAnyCmdSaved = false;
    }
    this.authorizationService.setPermissions('RATE CARD');
    perList = perList.concat(this.authorizationService.getPermissions('RATE CARD'));
    this.authorizationService.setPermissions('COMMERCIAL');
    perList = perList.concat(this.authorizationService.getPermissions('COMMERCIAL'));
    this.authorizationService.setPermissions('COMMANDMENT');
    perList = perList.concat(this.authorizationService.getPermissions('COMMANDMENT'));
    this.authorizationService.setPermissions('TNC');
    let tncPermission = [];
    tncPermission = this.authorizationService.getPermissions('TNC');
    if (tncPermission.includes('FUEL DETAILS_CREATE') && tncPermission.includes('FLFC_CREATE')
      && tncPermission.includes('INCREMENT_CREATE') && tncPermission.includes('INSURANCE_CREATE')
      && tncPermission.includes('SECURITY_CREATE') && tncPermission.includes('NOTEPAD_CREATE')) {
      tncPermission.push('TNC_CREATE');
      tncPermission.push('TNC_UPDATE');
    } else if (tncPermission.includes('FUEL DETAILS_UPDATE') && tncPermission.includes('FLFC_UPDATE')
      && tncPermission.includes('INCREMENT_UPDATE') && tncPermission.includes('INSURANCE_UPDATE')
      && tncPermission.includes('SECURITY_UPDATE') && tncPermission.includes('NOTEPAD_UPDATE')) {
      tncPermission.push('TNC_UPDATE');
    }
    perList = perList.concat(tncPermission);
    this.authorizationService.setPermissions('BRANCH');
    perList = perList.concat(this.authorizationService.getPermissions('BRANCH'));
    this.authorizationService.setPermissions('SLA');
    perList = perList.concat(this.authorizationService.getPermissions('SLA'));
    this.authorizationService.setPermissions('VMI');
    perList = perList.concat(this.authorizationService.getPermissions('VMI'));
    this.authorizationService.setPermissions('BILLING');
    perList = perList.concat(this.authorizationService.getPermissions('BILLING'));
    this.authorizationService.setPermissions('COMMANDMENT');
    perList = perList.concat(this.authorizationService.getPermissions('COMMANDMENT'));
    this.permissionsService.loadPermissions(perList);
    
    this.cmdmntCharge = [];
    this.geoCmdmntCharge = [];
    this.nonGeoCmdmntCharge = [];
    this.geoColumns = [];
    this.nonGeoColumns = [];
    if (this.inputData && this.inputData.offeringId) {
      this.entityId = this.inputData.entityId;
      this.editflow = this.inputData.isEdit;
      this.serviceOfferingId = this.inputData.offeringId;
      this.getCommandment();
    }
    else {
      this.tosterService.error("Invalid / Incomplete Input");
    }
  }


  getCommandment() {
    this.spinner.show();
    this.contractservice.getOportunity(AppSetting.oprtunityId, this.editflow).subscribe(success => {

      let ob = ErrorConstants.validateException(success);
      if (ob.isSuccess) {
        this.businessTypeId = success.data.responseData.contract.lkpBizTypeId;
        this.customerTypeId = success.data.responseData.contract.cntrType;
        this.contractId = success.data.responseData.contract.id;
        let entityIdtoFetch: any;
        if (this.inputData.isCopyRateCard) {
          if (this.inputData.level == 'RATECARD' && !this.isAnyCmdSaved) {
            entityIdtoFetch = this.inputData.copiedRcId
            this.entityId = this.inputData.entityId;
            this.tosterService.info('Save To Copy All Commandments ! ')
          }
          else if (this.inputData.level == 'COMMERCIAL') {
            entityIdtoFetch = this.entityId
            this.tosterService.info('Copied All Commandments ! ')
          }
        } else {
          entityIdtoFetch = this.entityId
        }
        this.contractservice.getCommandmentDetail(this.inputData.level, entityIdtoFetch, this.serviceOfferingId, this.businessTypeId, this.customerTypeId,this.editflow)
        .subscribe(resultData => {
          let ob = ErrorConstants.validateException(resultData);
          if (ob.isSuccess) {
            if (resultData && resultData.data) {
              this.commandmentResult = JSON.parse(JSON.stringify(resultData.data));
              if (this.commandmentResult.responseData)
                this.cmdmntCharge = JSON.parse(JSON.stringify(this.commandmentResult.responseData));
              else
                this.cmdmntCharge = [];
              if (this.commandmentResult.referenceData) {
                this.referenceList = this.commandmentResult.referenceData;
                this.cmdmntRef = this.commandmentResult.referenceData.cmdmntMDMReference;
              }

              let cmdmntChargeList = [];
              this.cmdmntRef = this.cmdmntRef.sort((ele1,ele2) => ele1.commandmentOrder - ele2.commandmentOrder);
              this.cmdmntRef.forEach(cmdmntData => {
                let exists = false;
                if (this.cmdmntCharge && this.cmdmntCharge.length > 0) {
                  for (let i = 0; i < this.cmdmntCharge.length; i++) {
                    if (this.cmdmntCharge[i].cmdmntId === cmdmntData.id) {
                      this.cmdmntCharge[i].commandmentOrder = cmdmntData.commandmentOrder;
                      this.cmdmntCharge[i].cmdmntName = cmdmntData.commandmentName;
                      if (cmdmntData.geoFeatureName && cmdmntData.geoFeatureName != "") {
                        this.cmdmntCharge[i].geoFeatureName = cmdmntData.geoFeatureName;
                        this.cmdmntCharge[i].geoFeatureId = cmdmntData.geoFeatureId;
                        this.cmdmntCharge[i].geoTypeName = cmdmntData.geoType[0].lookupVal;
                      }
                      this.cmdmntCharge[i].calcTypeList = cmdmntData.calcTypeList;
                      this.cmdmntCharge[i].calcMeasureList = cmdmntData.calcMeasureList;
                      this.cmdmntCharge[i].calcUnitList = cmdmntData.calcUnitList;
                      this.cmdmntCharge[i].chargesOnList = cmdmntData.chargesOnList;
                      this.cmdmntCharge[i].minAmountFlag = cmdmntData.minAmountFlag;
                      this.cmdmntCharge[i].maxAmountFlag = cmdmntData.maxAmountFlag;
                      this.cmdmntCharge[i].rrValueList = this.createRadio();
                      exists = true;

                      // setting default value in all cases
                      if(cmdmntData.cmdmntRrsList && cmdmntData.cmdmntRrsList.length > 0) {
                        this.cmdmntCharge[i].defaultPrice = cmdmntData.cmdmntRrsList[0].rrValue;
                        this.cmdmntCharge[i].defaultLkpCalcMeasureId = cmdmntData.cmdmntRrsList[0].calculationMeasureId;
                        this.cmdmntCharge[i].defaultLkpCalcUnitId = cmdmntData.cmdmntRrsList[0].calculationUnitId;
                        this.cmdmntCharge[i].defaultMinFrieghtFlg = cmdmntData.cmdmntRrsList[0].minFrieghtFlg
                        this.cmdmntCharge[i].defaultLkpChrgOnId = cmdmntData.cmdmntRrsList[0].cmdntChrgOnId
                        this.cmdmntCharge[i].defaultLkpCalcTypeId = cmdmntData.cmdmntRrsList[0].calculationTypeId;
                        this.cmdmntCharge[i].defaultLkpCalcTypeName = this.getNameFromLookup(this.cmdmntCharge[i].calcTypeList, this.cmdmntCharge[i].lkpCalcTypeId);
                        this.cmdmntCharge[i].defaultMinVal = cmdmntData.cmdmntRrsList[0].minValue;
                        this.cmdmntCharge[i].defaultMaxVal = cmdmntData.cmdmntRrsList[0].maxValue;
                        if (cmdmntData.cmdmntRrsList[0].cmdmntRrSlabList && cmdmntData.cmdmntRrsList[0].cmdmntRrSlabList.length > 0) {
                          this.cmdmntCharge[i].defaultCmdmntSlabCharge = [];
                          cmdmntData.cmdmntRrsList[0].cmdmntRrSlabList.forEach(element => {
                            let cmdmntSlabCharge = new models.CommandmentSlabChargeDTO();
                            cmdmntSlabCharge.price = element.rrValue;
                            cmdmntSlabCharge.slabFrom = element.slabFrom;
                            cmdmntSlabCharge.slabTo = element.slabTo;
                            this.cmdmntCharge[i].defaultCmdmntSlabCharge.push(cmdmntSlabCharge);
                          });
                      }}

                      if (this.cmdmntCharge[i].rrFlag == 1 && cmdmntData.cmdmntRrsList && cmdmntData.cmdmntRrsList.length > 0) {
                        this.cmdmntCharge[i].price = cmdmntData.cmdmntRrsList[0].rrValue;
                        this.cmdmntCharge[i].lkpCalcMeasureId = cmdmntData.cmdmntRrsList[0].calculationMeasureId;
                        this.cmdmntCharge[i].lkpCalcUnitId = cmdmntData.cmdmntRrsList[0].calculationUnitId;
                        this.cmdmntCharge[i].lkpCalcTypeId = cmdmntData.cmdmntRrsList[0].calculationTypeId;
                        this.cmdmntCharge[i].lkpCalcTypeName = this.getNameFromLookup(this.cmdmntCharge[i].calcTypeList, this.cmdmntCharge[i].lkpCalcTypeId);
                        this.cmdmntCharge[i].minVal = cmdmntData.cmdmntRrsList[0].minValue;
                        this.cmdmntCharge[i].maxVal = cmdmntData.cmdmntRrsList[0].maxValue;
                        this.cmdmntCharge[i].lkpChrgOnId = cmdmntData.cmdmntRrsList[0].cmdntChrgOnId;
                        this.cmdmntCharge[i].minFrieghtFlg = cmdmntData.cmdmntRrsList[0].minFrieghtFlg;
                        this.cmdmntCharge[i].minCalcFlag = this.cmdmntCharge[i].minFrieghtFlg;
                        this.cmdmntCharge[i].fieldDisabled = true;
                          let newSlabCharge: models.CommandmentSlabChargeDTO[] = [];
                          if (this.cmdmntCharge[i].cmdmntSlabCharge && this.cmdmntCharge[i].cmdmntSlabCharge.length > 0) {
                            cmdmntData.cmdmntRrsList[0].cmdmntRrSlabList.forEach(element => {
                              let id = 0;
                              this.cmdmntCharge[i].cmdmntSlabCharge.forEach(chargeElement => {
                                if (element.slabFrom == chargeElement.slabFrom && element.slabTo == chargeElement.slabTo) {
                                  id = chargeElement.id;
                                }
                              });
                              let cmdmntSlabChg = new models.CommandmentSlabChargeDTO();
                              cmdmntSlabChg.price = element.rrValue;
                              cmdmntSlabChg.slabFrom = element.slabFrom;
                              cmdmntSlabChg.slabTo = element.slabTo;
                              if (id > 0) {
                                cmdmntSlabChg.id = id;
                              }
                              newSlabCharge.push(cmdmntSlabChg);
                            });
                            this.cmdmntCharge[i].cmdmntSlabCharge = newSlabCharge;
                          } else {
                            this.cmdmntCharge[i].cmdmntSlabCharge = this.cmdmntCharge[i].defaultCmdmntSlabCharge;
                          }
                        }
                       else if (this.cmdmntCharge[i].rrFlag == 2) {
                        this.cmdmntCharge[i].fieldDisabled = false;
                        this.cmdmntCharge[i].lkpCalcTypeName = this.getNameFromLookup(this.cmdmntCharge[i].calcTypeList, this.cmdmntCharge[i].lkpCalcTypeId);
                        this.cmdmntCharge[i].minFrieghtFlg = this.cmdmntCharge[i].minCalcFlag;
                      } else {
                        this.cmdmntCharge[i].fieldDisabled = true;
                      }

                    }
                  }
                  this.cmdmntCharge = this.cmdmntCharge.sort((ele1,ele2) => ele1.commandmentOrder - ele2.commandmentOrder);
                }
                if (!exists) {
                  let cmdmntChargeNew = new models.Commandment();
                  cmdmntChargeNew.entityId = this.entityId;
                  cmdmntChargeNew.cmdmntName = cmdmntData.commandmentName;
                  if (cmdmntData.geoFeatureName && cmdmntData.geoFeatureName != "") {
                    cmdmntChargeNew.geoFeatureName = cmdmntData.geoFeatureName;
                    cmdmntChargeNew.geoFeatureId = cmdmntData.geoFeatureId;
                    cmdmntChargeNew.geoTypeName = cmdmntData.geoType[0].lookupVal;
                  }
                  cmdmntChargeNew.calcTypeList = cmdmntData.calcTypeList;
                  cmdmntChargeNew.calcMeasureList = cmdmntData.calcMeasureList;
                  cmdmntChargeNew.calcUnitList = cmdmntData.calcUnitList;
                  cmdmntChargeNew.chargesOnList = cmdmntData.chargesOnList;
                  cmdmntChargeNew.applicableFlag = cmdmntData.rrFlag != 0 ? 1 : 0;
                  cmdmntChargeNew.rrFlag = cmdmntData.rrFlag;
                  cmdmntChargeNew.minAmountFlag = cmdmntData.minAmountFlag;
                  cmdmntChargeNew.maxAmountFlag = cmdmntData.maxAmountFlag;
                  cmdmntChargeNew.minVal = null;
                  cmdmntChargeNew.maxVal = null;
                  cmdmntChargeNew.cmdmntId = cmdmntData.id;
                  cmdmntChargeNew.rrValueList = this.createRadio();
                  if (cmdmntData.rrFlag == 1 && cmdmntData.cmdmntRrsList && cmdmntData.cmdmntRrsList.length > 0) {
                    cmdmntChargeNew.defaultPrice = cmdmntData.cmdmntRrsList[0].rrValue;
                    cmdmntChargeNew.defaultLkpCalcMeasureId = cmdmntData.cmdmntRrsList[0].calculationMeasureId;
                    cmdmntChargeNew.defaultLkpCalcUnitId = cmdmntData.cmdmntRrsList[0].calculationUnitId;
                    cmdmntChargeNew.price = cmdmntData.cmdmntRrsList[0].rrValue;
                    cmdmntChargeNew.lkpCalcMeasureId = cmdmntData.cmdmntRrsList[0].calculationMeasureId;
                    cmdmntChargeNew.lkpCalcUnitId = cmdmntData.cmdmntRrsList[0].calculationUnitId;
                    cmdmntChargeNew.lkpCalcTypeId = cmdmntData.cmdmntRrsList[0].calculationTypeId;
                    cmdmntChargeNew.lkpCalcTypeName = this.getNameFromLookup(cmdmntChargeNew.calcTypeList, cmdmntChargeNew.lkpCalcTypeId);
                    cmdmntChargeNew.minVal = cmdmntData.cmdmntRrsList[0].minValue;
                    cmdmntChargeNew.maxVal = cmdmntData.cmdmntRrsList[0].maxValue;
                    cmdmntChargeNew.defaultLkpCalcTypeId = cmdmntData.cmdmntRrsList[0].calculationTypeId;
                    cmdmntChargeNew.defaultLkpCalcTypeName = this.getNameFromLookup(cmdmntChargeNew.calcTypeList, cmdmntChargeNew.lkpCalcTypeId);
                    cmdmntChargeNew.defaultMinVal = cmdmntData.cmdmntRrsList[0].minValue;
                    cmdmntChargeNew.defaultMaxVal = cmdmntData.cmdmntRrsList[0].maxValue;
                    cmdmntChargeNew.lkpChrgOnId = cmdmntData.cmdmntRrsList[0].cmdntChrgOnId
                    cmdmntChargeNew.defaultLkpChrgOnId = cmdmntData.cmdmntRrsList[0].cmdntChrgOnId
                    cmdmntChargeNew.minFrieghtFlg = cmdmntData.cmdmntRrsList[0].minFrieghtFlg
                    cmdmntChargeNew.minCalcFlag = cmdmntData.cmdmntRrsList[0].minFrieghtFlg;
                    cmdmntChargeNew.defaultMinFrieghtFlg = cmdmntData.cmdmntRrsList[0].minFrieghtFlg
                    cmdmntChargeNew.fieldDisabled = true;
                    if (cmdmntData.cmdmntRrsList[0].cmdmntRrSlabList && cmdmntData.cmdmntRrsList[0].cmdmntRrSlabList.length > 0) {
                      cmdmntData.cmdmntRrsList[0].cmdmntRrSlabList.forEach(element => {
                        let cmdmntSlabCharge = new models.CommandmentSlabChargeDTO();
                        cmdmntSlabCharge.price = element.rrValue;
                        cmdmntSlabCharge.slabFrom = element.slabFrom;
                        cmdmntSlabCharge.slabTo = element.slabTo;
                        cmdmntChargeNew.defaultCmdmntSlabCharge.push(cmdmntSlabCharge);
                        cmdmntChargeNew.cmdmntSlabCharge.push(cmdmntSlabCharge);
                      });
                    }
                  } else {
                    cmdmntChargeNew.price = null;
                    cmdmntChargeNew.lkpCalcMeasureId = null;
                    cmdmntChargeNew.lkpCalcUnitId = null;
                    cmdmntChargeNew.lkpCalcTypeId = null;
                    cmdmntChargeNew.lkpCalcTypeName = null;
                    cmdmntChargeNew.minVal = null;
                    cmdmntChargeNew.maxVal = null;
                    cmdmntChargeNew.defaultPrice = null;
                    cmdmntChargeNew.defaultLkpCalcMeasureId = null;
                    cmdmntChargeNew.defaultLkpCalcUnitId = null;
                    cmdmntChargeNew.defaultLkpCalcTypeId = null;
                    cmdmntChargeNew.defaultLkpCalcTypeName = null;
                    cmdmntChargeNew.defaultMinVal = null;
                    cmdmntChargeNew.defaultMaxVal = null;
                    cmdmntChargeNew.fieldDisabled = false;
                    cmdmntChargeNew.defaultLkpChrgOnId = null;
                  }
                  if (cmdmntData.rrFlag === 2) {
                    cmdmntChargeNew.fieldDisabled = true;
                    cmdmntChargeNew.lkpCalcTypeName = this.getNameFromLookup(cmdmntChargeNew.calcTypeList, cmdmntChargeNew.lkpCalcTypeId);
                  }
                  cmdmntChargeList.push(cmdmntChargeNew);
                }
              });
              if(cmdmntChargeList && cmdmntChargeList.length>0)
                this.cmdmntCharge = this.cmdmntCharge.concat(cmdmntChargeList);
              
            }
          }
          else {
            this.tosterService.error(ob.message);
          }
          this.geoColumns = ["cmdmntName", "freight", "rrFlag", "price", "geoTypeName", "geoFeatureName", "lkpCalcTypeId", "lkpCalcUnitId", "lkpCalcMeasureId", "lkpChrgOnId", "minVal", "maxVal"];
          this.nonGeoColumns = ["cmdmntName", "freight", "rrFlag", "price", "lkpCalcTypeId", "lkpCalcUnitId", "lkpCalcMeasureId","lkpChrgOnId", "minVal", "maxVal"];


          this.cmdmntCharge.forEach(element => {
            if (element.cmdmntName && element.cmdmntName !== '') {
            if (element.geoFeatureName && element.geoFeatureName !== '') {
              if (element.rrFlag === 2) {
                element['stateErrorFlag'] = element.cmdmntGeoWiseCharge && element.cmdmntGeoWiseCharge.length > 0 ? false : true;
              } else {
                element['stateErrorFlag'] = false;
              }
              this.geoCmdmntCharge.push(element);
            } else {
              element['stateErrorFlag'] = false;
              this.nonGeoCmdmntCharge.push(element);
            }
          }
        }

          );

          this.spinner.hide();
        }, error => {
          this.spinner.hide();
          this.tosterService.error(ErrorConstants.getValue(404));
        });
      } else {
        this.tosterService.error(ob.message);
        this.spinner.hide();
      }
    },
      error => {
        this.spinner.hide();
        this.tosterService.error(ErrorConstants.getValue(404));
      });
  }

  changeRR(rrValue, index, geo) {
    let rrList = this.createRadio();
    let name = "";
    rrList.forEach(element => {
      if (element.id == rrValue) {
        name = element.value;
      }
    });
    if (geo) {
      if (name === "RR") {
        this.geoCmdmntCharge[index].price = this.geoCmdmntCharge[index].defaultPrice;
        this.geoCmdmntCharge[index].lkpCalcMeasureId = this.geoCmdmntCharge[index].defaultLkpCalcMeasureId;
        this.geoCmdmntCharge[index].minFrieghtFlg = this.geoCmdmntCharge[index].defaultMinFrieghtFlg;
        this.geoCmdmntCharge[index].lkpCalcUnitId = this.geoCmdmntCharge[index].defaultLkpCalcUnitId;
        this.geoCmdmntCharge[index].lkpCalcTypeId = this.geoCmdmntCharge[index].defaultLkpCalcTypeId;
        this.geoCmdmntCharge[index].lkpCalcTypeName = this.getNameFromLookup(this.geoCmdmntCharge[index].calcTypeList, this.geoCmdmntCharge[index].lkpCalcTypeId);
        this.geoCmdmntCharge[index].lkpChrgOnId = this.geoCmdmntCharge[index].defaultLkpChrgOnId;
        this.geoCmdmntCharge[index].minVal = this.geoCmdmntCharge[index].defaultMinVal;
        this.geoCmdmntCharge[index].maxVal = this.geoCmdmntCharge[index].defaultMaxVal;
        this.geoCmdmntCharge[index].fieldDisabled = true;
        this.geoCmdmntCharge[index].applicableFlag = 1;
        if (this.geoCmdmntCharge[index].defaultCmdmntSlabCharge) {
          this.geoCmdmntCharge[index].cmdmntSlabCharge = this.geoCmdmntCharge[index].defaultCmdmntSlabCharge;
        } else {
        this.geoCmdmntCharge[index].cmdmntSlabCharge = []; }
        this.geoCmdmntCharge[index].cmdmntGeoWiseCharge = [];
        this.geoCmdmntCharge[index].cmdmntGeoExclusion = [];
        this.geoCmdmntCharge[index]['stateErrorFlag'] = false;
      } else if (name === "NA") {
        this.geoCmdmntCharge[index].price = null;
        this.geoCmdmntCharge[index].lkpCalcMeasureId = null;
        this.geoCmdmntCharge[index].lkpCalcUnitId = null;
        this.geoCmdmntCharge[index].lkpCalcTypeId = null;
        this.geoCmdmntCharge[index].defaultLkpCalcTypeName = null;
        this.geoCmdmntCharge[index].minVal = null;
        this.geoCmdmntCharge[index].maxVal = null;
        this.geoCmdmntCharge[index].lkpChrgOnId = null;
        this.geoCmdmntCharge[index].fieldDisabled = true;
        this.geoCmdmntCharge[index].applicableFlag = 0;
        this.geoCmdmntCharge[index].cmdmntSlabCharge = [];
        this.geoCmdmntCharge[index].minFrieghtFlg = 0;
        this.geoCmdmntCharge[index].cmdmntGeoWiseCharge = [];
        this.geoCmdmntCharge[index].cmdmntGeoExclusion = [];
        this.geoCmdmntCharge[index]['stateErrorFlag'] = false;
      } else if (name === "CUSTOM") {
        this.geoCmdmntCharge[index].price = null;
        this.geoCmdmntCharge[index].lkpCalcMeasureId = null;
        this.geoCmdmntCharge[index].lkpCalcUnitId = null;
        this.geoCmdmntCharge[index].lkpCalcTypeId = null;
        this.geoCmdmntCharge[index].lkpCalcTypeName = null;
        this.geoCmdmntCharge[index].minVal = null;
        this.geoCmdmntCharge[index].maxVal = null;
        this.geoCmdmntCharge[index].lkpChrgOnId = null;
        this.geoCmdmntCharge[index].fieldDisabled = false;
        this.geoCmdmntCharge[index].applicableFlag = 1;
        this.geoCmdmntCharge[index].cmdmntSlabCharge = [];
        this.geoCmdmntCharge[index].cmdmntGeoWiseCharge = [];
        this.geoCmdmntCharge[index].cmdmntGeoExclusion = [];
        this.selectonChange(this.geoCmdmntCharge[index]);
        this.geoCmdmntCharge[index]['stateErrorFlag'] = true;
      }
    } else {
      if (name == "RR") {
        this.nonGeoCmdmntCharge[index].price = this.nonGeoCmdmntCharge[index].defaultPrice;
        this.nonGeoCmdmntCharge[index].lkpCalcMeasureId = this.nonGeoCmdmntCharge[index].defaultLkpCalcMeasureId;
        this.nonGeoCmdmntCharge[index].minFrieghtFlg = this.nonGeoCmdmntCharge[index].defaultMinFrieghtFlg;
        this.nonGeoCmdmntCharge[index].lkpChrgOnId = this.nonGeoCmdmntCharge[index].defaultLkpChrgOnId;
        this.nonGeoCmdmntCharge[index].lkpCalcUnitId = this.nonGeoCmdmntCharge[index].defaultLkpCalcUnitId;
        this.nonGeoCmdmntCharge[index].lkpCalcTypeId = this.nonGeoCmdmntCharge[index].defaultLkpCalcTypeId;
        this.nonGeoCmdmntCharge[index].lkpCalcTypeName = this.getNameFromLookup(this.nonGeoCmdmntCharge[index].calcTypeList, this.nonGeoCmdmntCharge[index].lkpCalcTypeId);
        this.nonGeoCmdmntCharge[index].minVal = this.nonGeoCmdmntCharge[index].defaultMinVal;
        this.nonGeoCmdmntCharge[index].maxVal = this.nonGeoCmdmntCharge[index].defaultMaxVal;
        this.nonGeoCmdmntCharge[index].fieldDisabled = true;
        this.nonGeoCmdmntCharge[index].applicableFlag = 1;
        if (this.nonGeoCmdmntCharge[index].defaultCmdmntSlabCharge) {
          this.nonGeoCmdmntCharge[index].cmdmntSlabCharge = this.nonGeoCmdmntCharge[index].defaultCmdmntSlabCharge;
        } else {
        this.nonGeoCmdmntCharge[index].cmdmntSlabCharge = []; }
        this.nonGeoCmdmntCharge[index].cmdmntGeoWiseCharge = [];
        this.nonGeoCmdmntCharge[index].cmdmntGeoExclusion = [];
      } else if (name == "NA") {
        this.nonGeoCmdmntCharge[index].price = null;
        this.nonGeoCmdmntCharge[index].lkpCalcMeasureId = null;
        this.nonGeoCmdmntCharge[index].lkpCalcUnitId = null;
        this.nonGeoCmdmntCharge[index].lkpCalcTypeId = null;
        this.nonGeoCmdmntCharge[index].lkpCalcTypeName = null;
        this.nonGeoCmdmntCharge[index].minVal = null;
        this.nonGeoCmdmntCharge[index].maxVal = null;
        this.nonGeoCmdmntCharge[index].lkpChrgOnId = null;
        this.nonGeoCmdmntCharge[index].fieldDisabled = true;
        this.nonGeoCmdmntCharge[index].applicableFlag = 0;
        this.nonGeoCmdmntCharge[index].cmdmntSlabCharge = [];
        this.nonGeoCmdmntCharge[index].minFrieghtFlg=0;
        this.nonGeoCmdmntCharge[index].cmdmntGeoWiseCharge = [];
        this.nonGeoCmdmntCharge[index].cmdmntGeoExclusion = [];
      } else if (name == "CUSTOM") {
        this.nonGeoCmdmntCharge[index].price = null;
        this.nonGeoCmdmntCharge[index].lkpCalcMeasureId = null;
        this.nonGeoCmdmntCharge[index].lkpCalcUnitId = null;
        this.nonGeoCmdmntCharge[index].lkpCalcTypeId = null;
        this.nonGeoCmdmntCharge[index].lkpCalcTypeName = null;
        this.nonGeoCmdmntCharge[index].minVal = null;
        this.nonGeoCmdmntCharge[index].maxVal = null;
        this.nonGeoCmdmntCharge[index].lkpChrgOnId = null;
        this.nonGeoCmdmntCharge[index].fieldDisabled = false;
        this.nonGeoCmdmntCharge[index].applicableFlag = 1;
        this.nonGeoCmdmntCharge[index].cmdmntSlabCharge = [];
        this.nonGeoCmdmntCharge[index].cmdmntGeoWiseCharge = [];
        this.nonGeoCmdmntCharge[index].cmdmntGeoExclusion = [];
        this.selectonChange(this.nonGeoCmdmntCharge[index]);
      }
    }
  }

  updateList(index, column, value, geo) {
    if (geo)
      this.geoCmdmntCharge[index][column] = value;
    else
      this.nonGeoCmdmntCharge[index][column] = value;
  }
  selectonChange(obj){
    if(obj['calcTypeList'] && obj['calcTypeList'].length == 1){
      obj['lkpCalcTypeId']  = obj['calcTypeList'][0].id;
      obj['lkpCalcTypeName'] = obj['calcTypeList'][0].lookupVal;
      if( obj['lkpCalcTypeName'] == "SLAB"){
        if(obj.cmdmntSlabCharge && obj.cmdmntSlabCharge.length > 0){
          obj['slabErrorFlag'] = false;
        }else{
          obj['slabErrorFlag'] = true;
        }
      }
    }

    if(obj['calcUnitList'] && obj['calcUnitList'].length == 1){
      obj['lkpCalcUnitId'] = obj['calcUnitList'][0].id;            
    }

      if(obj['calcMeasureList'] && obj['calcMeasureList'].length == 1){
      obj['lkpCalcMeasureId'] = obj['calcMeasureList'][0].id;            
    }
    if(obj['chargesOnList'] && obj['chargesOnList'].length == 1){
      obj['lkpChrgOnId'] = obj['chargesOnList'][0].id;            
    }
    }

  changeValue(index, column, value, geo) {
    if (geo){
      this.geoCmdmntCharge[index][column] = value;
    }
    else
      this.nonGeoCmdmntCharge[index][column] = value;
  }

  saveCommandments(nextFlag) {
    this.spinner.show();
    let data: models.Commandment[] = [];
    this.geoCmdmntCharge.forEach(element => {
      element.cmdmntLevel = this.inputData.level;
      data.push(element);
    });
    this.nonGeoCmdmntCharge.forEach(element => {
      element.cmdmntLevel = this.inputData.level
      data.push(element);
    });
    let newData =this.deactivateOrpanChild(data);
    newData["contractId"] = this.contractId;
    if (this.inputData.isCopyRateCard) {
      if (this.inputData.level == 'RATECARD' && !this.isAnyCmdSaved) {
        newData.forEach(element => {
          element.id = null
          element["entityId"] = this.entityId;
        });
      }
    }
    this.contractservice.saveCommandment(newData,this.editflow).subscribe(result => {
      let ob = ErrorConstants.validateException(result);
      if (ob.isSuccess) {
        this.tosterService.success("Saved Successfully");
        if(this.inputData.isCopyRateCard){
          this.anyCmdmntSave(true);
        }
        if (nextFlag) {
          this.cmdmntSave(true);
          this.spinner.hide();
        } else {
          this.ngOnChanges();
        }
      } else {
        this.spinner.hide();
        this.tosterService.error(ob.message);
      }
    }, error => {
      this.spinner.hide();
      this.tosterService.error(ErrorConstants.getValue(404));
    });

  }

  getNameFromLookup(list, id) {
    let name = '';
    list.forEach(element => {
      if (element.id == id)
        name = element.lookupVal;
    });
    return name;
  }

  addSlabCharges(index, geo) {
    var cmdmntId: any = 0;
    var slabChargeList: models.CommandmentSlabChargeDTO[] = [];
    var calTypeId = 0;
    var calcTypeName = "";
    var commmandmentName = "";
    var calTypeList = [];
    let rrFlag = 0; 
    if (geo) {
      calTypeId = this.geoCmdmntCharge[index].lkpCalcTypeId;
      cmdmntId = this.geoCmdmntCharge[index].cmdmntId;
      slabChargeList = this.geoCmdmntCharge[index].cmdmntSlabCharge;
      calTypeList = this.geoCmdmntCharge[index].calcTypeList;
      commmandmentName = this.geoCmdmntCharge[index].cmdmntName;
      rrFlag = this.geoCmdmntCharge[index].rrFlag;
      calcTypeName = this.getNameFromLookup(calTypeList, calTypeId);
      this.geoCmdmntCharge[index].lkpCalcTypeName = calcTypeName;
    } else {
      calTypeId = this.nonGeoCmdmntCharge[index].lkpCalcTypeId;
      cmdmntId = this.nonGeoCmdmntCharge[index].cmdmntId;
      slabChargeList = this.nonGeoCmdmntCharge[index].cmdmntSlabCharge;
      calTypeList = this.nonGeoCmdmntCharge[index].calcTypeList;
      commmandmentName = this.nonGeoCmdmntCharge[index].cmdmntName;
      rrFlag = this.nonGeoCmdmntCharge[index].rrFlag;
      calcTypeName = this.getNameFromLookup(calTypeList, calTypeId);
      this.nonGeoCmdmntCharge[index].lkpCalcTypeName = calcTypeName;
    }

    

    if (calcTypeName === 'SLAB') {
      const slabDialog = this.dialog.open(SlabDialogBox, {disableClose: true,
        width: '700px',
        panelClass: 'creditDialog',
        data: { cmdmntId: cmdmntId, slabChargeList: slabChargeList,
                commmandmentName : commmandmentName, rrFlag : rrFlag }
      });
      slabDialog.afterClosed().subscribe(result => {
        console.log(result, 'The dialog was closed');
        if (result && result !== '') {
          if (geo) {
            this.geoCmdmntCharge[index].cmdmntSlabCharge = result;
            if (result.length > 0 && result[0].price) {
            this.geoCmdmntCharge[index].price = result[0].price;
            }
            this.geoCmdmntCharge[index]['slabErrorFlag'] = false;
          } else {
            this.nonGeoCmdmntCharge[index].cmdmntSlabCharge = result;
            if (result.length > 0 && result[0].price) {
            this.nonGeoCmdmntCharge[index].price = result[0].price;
          }
            this.nonGeoCmdmntCharge[index]['slabErrorFlag'] = false;
          }
        }
          if (geo && (!this.geoCmdmntCharge[index].cmdmntSlabCharge ||
            this.geoCmdmntCharge[index].cmdmntSlabCharge.length === 0)) {
            this.geoCmdmntCharge[index]['slabErrorFlag'] = true;
          } else if (!geo && (!this.nonGeoCmdmntCharge[index].cmdmntSlabCharge ||
            this.nonGeoCmdmntCharge[index].cmdmntSlabCharge.length === 0)) {
            this.nonGeoCmdmntCharge[index]['slabErrorFlag'] = true;
          }
      });
    } else {
      if (geo) {
        this.geoCmdmntCharge[index].cmdmntSlabCharge = [];
        this.geoCmdmntCharge[index]['slabErrorFlag'] = false;
      } else {
        this.nonGeoCmdmntCharge[index].cmdmntSlabCharge = [];
        this.nonGeoCmdmntCharge[index]['slabErrorFlag'] = false;
      }
    }

  }

  excludePincode(index) {
    const excludePincode = this.dialog.open(ExcludePinDialogBox, {disableClose: true,
      panelClass: 'creditDialog',
      data: {
        cmdmntId: this.geoCmdmntCharge[index].cmdmntId, excludedPincodeList: this.geoCmdmntCharge[index].cmdmntGeoExclusion
        , geoFeatureId: this.geoCmdmntCharge[index].geoFeatureId
      },
      width: '60%',
    });
    excludePincode.afterClosed().subscribe(result => {
      console.log(result, 'The dialog was closed');
      if (result) {
        this.geoCmdmntCharge[index].cmdmntGeoExclusion = result;
      }
    });
  }

  includeStateCity(index) {
    const includeStateCity = this.dialog.open(GeoWiseChargeDialogBox, {disableClose: true,
      panelClass: 'creditDialog',
      data: {
        cmdmntId: this.geoCmdmntCharge[index].cmdmntId,
        cmdmntGeoWiseChargeList: JSON.parse(JSON.stringify(this.geoCmdmntCharge[index].cmdmntGeoWiseCharge))
        , geoFeatureId: this.geoCmdmntCharge[index].geoFeatureId, calcUnitList : this.geoCmdmntCharge[index].calcUnitList
      },
      width: '145rem',
    });
    includeStateCity.afterClosed().subscribe(result => {
      console.log(result, 'The dialog was closed');
      if (result) {
        this.geoCmdmntCharge[index].cmdmntGeoWiseCharge = JSON.parse(JSON.stringify(result));
      }
      if (this.geoCmdmntCharge[index].cmdmntGeoWiseCharge) {
        this.geoCmdmntCharge[index]['stateErrorFlag'] = this.geoCmdmntCharge[index].cmdmntGeoWiseCharge.length > 0 ? false : true;
      } else {
        this.geoCmdmntCharge[index]['stateErrorFlag'] = true;
      }
    });
  }

  deactivateOrpanChild(newCommandmentList): any {
    var inactiveStatus = 0;
    this.referenceList.statusList.forEach(element => {
      if (element.lookupVal === 'DELETED')
        inactiveStatus = element.id;
    });

    if (this.commandmentResult.responseData.length > 0) {
      this.commandmentResult.responseData.forEach(oldElement => {

        if ((oldElement.cmdmntGeoExclusion && oldElement.cmdmntGeoExclusion.length > 0)
          || (oldElement.cmdmntGeoWiseCharge && oldElement.cmdmntGeoWiseCharge.length > 0)
          || (oldElement.cmdmntSlabCharge && oldElement.cmdmntSlabCharge.length > 0)) {

          let deactivatedGeoExclusionList = [];
          let deactivatedGeoWiseList = [];
          let deactivatedSlabChrgeList = [];
          let index = null;

          for (let x = 0; x < newCommandmentList.length; x++) {
            if (oldElement.id === newCommandmentList[x].id) {

              //deactivate geo Exclusion
              if (oldElement.cmdmntGeoExclusion && oldElement.cmdmntGeoExclusion.length > 0) {
                oldElement.cmdmntGeoExclusion.forEach(oldGeoEx => {
                  var geoExExists = false;
                  newCommandmentList[x].cmdmntGeoExclusion.forEach(newGeoEx => {
                    if (oldGeoEx.id === newGeoEx.id) {
                      geoExExists = true;
                    }
                  });
                  if (!geoExExists && inactiveStatus > 0) {
                    oldGeoEx.status = inactiveStatus;
                    deactivatedGeoExclusionList.push(oldGeoEx);
                    index = x;
                  }
                });
              }

              //deactivate geo Wise
              if (oldElement.cmdmntGeoWiseCharge && oldElement.cmdmntGeoWiseCharge.length > 0) {
                oldElement.cmdmntGeoWiseCharge.forEach(oldGeoWise => {
                  var geoWiseExists = false;
                  newCommandmentList[x].cmdmntGeoWiseCharge.forEach(newGeoWise => {
                    if (oldGeoWise.id === newGeoWise.id) {
                      geoWiseExists = true;
                    }
                  });
                  if (!geoWiseExists && inactiveStatus > 0) {
                    oldGeoWise.status = inactiveStatus;
                    deactivatedGeoWiseList.push(oldGeoWise);
                    index = x;
                  }
                });
              }


              //deactivate Slab Charge
              if (oldElement.cmdmntSlabCharge && oldElement.cmdmntSlabCharge.length > 0) {
                oldElement.cmdmntSlabCharge.forEach(oldSlab => {
                  var slabExists = false;
                  newCommandmentList[x].cmdmntSlabCharge.forEach(newSlab => {
                    if (oldSlab.id === newSlab.id) {
                      slabExists = true;
                    }
                  });
                  if (!slabExists && inactiveStatus > 0) {
                    oldSlab.status = inactiveStatus;
                    deactivatedSlabChrgeList.push(oldSlab);
                    index = x;
                  }
                });
              }

            }
          }
          if (deactivatedGeoExclusionList.length > 0 && index != null) {
            newCommandmentList[index].cmdmntGeoExclusion = newCommandmentList[index].cmdmntGeoExclusion.concat(deactivatedGeoExclusionList);
          }
          if (deactivatedGeoWiseList.length > 0 && index != null) {
            newCommandmentList[index].cmdmntGeoWiseCharge = newCommandmentList[index].cmdmntGeoWiseCharge.concat(deactivatedGeoWiseList);
          }
          if (deactivatedSlabChrgeList.length > 0 && index != null) {
            newCommandmentList[index].cmdmntSlabCharge = newCommandmentList[index].cmdmntSlabCharge.concat(deactivatedSlabChrgeList);
          }
        }

      });
    }
    return newCommandmentList;


  }

}


/* GeoWiseCharge Component starts */

@Component({
  selector: 'geoWiseCharge-dialog',
  templateUrl: 'commandment.geoWiseCharge.dialog.html',
  styleUrls: ['../core.css']
})

export class GeoWiseChargeDialogBox {
  constructor(private spinner: NgxSpinnerService, private tosterService: ToastrService, private contractservice: ContractService,
    public dialogRef: MatDialogRef<GeoWiseChargeDialogBox>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, 
    private datePipe: DatePipe,) { }

  cmdmntGeoWiseCharges: models.CmdmntGeoWiseChargeDTO[] = [];
  cmdmntGeoWiseChargeList: models.CmdmntGeoWiseChargeDTO[] = [];
  cmdmntGeoWiseCharge = new models.CmdmntGeoWiseChargeDTO();
  cmdmntId: number = 0;
  columns: string[];
  stateList: Lookup[];
  cityList: Lookup[] = [];
  calcUnitList: Lookup[] = [];
  minDate = new Date();


    @ViewChild('bottmScrollEl', null) bottmScrollEl: ElementRef;
  bottomScroll(){
    setTimeout(() => {
      var objDiv =  this.bottmScrollEl.nativeElement;
    objDiv.scrollTop = objDiv.scrollHeight;   
    }, 200);    
    }


  closeDialog(): void {
    // this.dialogRef.close();
    
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      panelClass: 'creditDialog',
      data:{message:'Are you sure ?'},
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if(value){
        this.dialogRef.close();
      }else{
        console.log('Keep Open');
      }
    });
  }

  ngOnInit() {
    this.cmdmntGeoWiseChargeList = [];
    if (this.data.calcUnitList) {
      this.calcUnitList = JSON.parse(JSON.stringify(this.data.calcUnitList));
    }
    this.spinner.show();
    this.contractservice.getStatesByFeature(this.data.geoFeatureId).subscribe(result => {
      let states = [];
      result.data.responseData.forEach(element => {
        states.push({ id: element.id, lookupVal: element.stateName,descr:element.stateName });
      });
      this.stateList = JSON.parse(JSON.stringify(states));
      this.columns = ['state', 'city', 'lkpCalcUnitId', 'desc', 'expDate', 'amount', 'action'];
      if (this.data.cmdmntGeoWiseChargeList && this.data.cmdmntGeoWiseChargeList.length > 0) {
        this.cmdmntGeoWiseCharges = this.cmdmntGeoWiseCharges.concat(JSON.parse(JSON.stringify(this.data.cmdmntGeoWiseChargeList)));
        let dataListMap = new Map();
        for (let i = 0; i < this.cmdmntGeoWiseCharges.length; i++) {
          this.cmdmntGeoWiseCharges[i].validPrice = true;
          this.cmdmntGeoWiseCharges[i].validDt = true;
          if (this.cmdmntGeoWiseCharges[i].cityId && this.cmdmntGeoWiseCharges[i].cityId > 0) {
            var data = this.cmdmntGeoWiseCharges[i].stateId 
              + "" + this.cmdmntGeoWiseCharges[i].descr + "" + this.cmdmntGeoWiseCharges[i].expDt
              + "" + this.cmdmntGeoWiseCharges[i].price + "" + this.cmdmntGeoWiseCharges[i].lkpCalcUnitId;
            var keyPresent = dataListMap.has(data);
            if (keyPresent) {
              var index = dataListMap.get(data);
              this.cmdmntGeoWiseChargeList[index].disableCity = false;
              this.checkDate(index, this.cmdmntGeoWiseChargeList[index].expDt,'expDt');
              this.cmdmntGeoWiseChargeList[index].selectedCityList.push(this.cmdmntGeoWiseCharges[i].cityId);
              this.cmdmntGeoWiseChargeList[index].cityCntrl.setValue(this.cmdmntGeoWiseChargeList[index].selectedCityList);
            } else {
              dataListMap.set(data, this.cmdmntGeoWiseChargeList.length);
              this.cmdmntGeoWiseCharges[i].selectedCityList = [];
              this.cmdmntGeoWiseCharges[i].cityList = [];
              this.cmdmntGeoWiseCharges[i].selectedCityList.push(this.cmdmntGeoWiseCharges[i].cityId);
              this.cmdmntGeoWiseCharges[i].cityCntrl = new FormControl();
              this.cmdmntGeoWiseCharges[i].cityCntrl.setValue(this.cmdmntGeoWiseCharges[i].selectedCityList);
              this.cmdmntGeoWiseCharges[i].stateList = this.stateList;
              this.cmdmntGeoWiseCharges[i].disableCity = false;
              this.cmdmntGeoWiseChargeList.push(this.cmdmntGeoWiseCharges[i]);
              this.checkDate(this.cmdmntGeoWiseChargeList.length -1, this.cmdmntGeoWiseCharges[i].expDt,'expDt');
              this.getCity(this.cmdmntGeoWiseCharges[i].stateId,this.cmdmntGeoWiseChargeList.length -1,true);
            }
          } else {
            this.cmdmntGeoWiseCharges[i].stateList = this.stateList;
            this.cmdmntGeoWiseCharges[i].disableCity = true;
            this.cmdmntGeoWiseCharges[i].selectedCityList = [];
            this.cmdmntGeoWiseCharges[i].cityList = [];
            this.cmdmntGeoWiseCharges[i].cityCntrl = new FormControl();
            this.cmdmntGeoWiseChargeList.push(this.cmdmntGeoWiseCharges[i]);
            this.checkDate(this.cmdmntGeoWiseChargeList.length -1, this.cmdmntGeoWiseCharges[i].expDt,'expDt');
            //this.getCityStart(this.cmdmntGeoWiseCharges[i].stateId,this.cmdmntGeoWiseChargeList.length -1);
          }

        }
      } else {
        this.addCharge();
      }

      this.spinner.hide();
      this.cmdmntId = this.data.cmdmntId;
    }, error => {
      this.spinner.hide();
      console.log("Error in getting all states");
    });
  }

  addCharge() {
    this.cmdmntGeoWiseCharge = new models.CmdmntGeoWiseChargeDTO();
    for(let item of this.calcUnitList){
      if(item.lookupVal==='PERKG'){
        this.cmdmntGeoWiseCharge.lkpCalcUnitId=item.id;
      }
    }
    this.cmdmntGeoWiseCharge.cityCntrl = new FormControl();
    this.cmdmntGeoWiseCharge.stateList = this.cmdmntGeoWiseCharge.stateList.concat(this.stateList);
    this.cmdmntGeoWiseChargeList = this.cmdmntGeoWiseChargeList.concat(this.cmdmntGeoWiseCharge);
    this.bottomScroll();
  }

getCityStart(stateId,index){
  this.cmdmntGeoWiseChargeList[index].cityList = [];
    this.contractservice.getCityByStateService(stateId).subscribe(result => {
      let ob = ErrorConstants.validateException(result);
      if (ob.isSuccess) {
        var cities = result.data.responseData;
        cities.forEach(element => {
          this.cmdmntGeoWiseChargeList[index].cityList.push({ id: element.id, lookupVal: element.cityName, descr:element.cityName  });
        });
        this.cmdmntGeoWiseChargeList[index].cityList.sort((a, b) => {
          const cityNameA = a.lookupVal.toUpperCase();
          const cityNameB = b.lookupVal.toUpperCase();
          let comparison = 0;
          if (cityNameA > cityNameB) {
            comparison = 1;
          } else if (cityNameA < cityNameB) {
            comparison = -1;
          }
          return comparison;
        });
      } else {
        this.tosterService.error(ob.message);
        this.spinner.hide();
      }
    }, error => {
      this.tosterService.error(ErrorConstants.getValue(404));
    });
}

  getCity(stateId, index, start) {
    this.spinner.show();
    if(!start) {
    this.cmdmntGeoWiseChargeList[index].cityList = [];
    this.cmdmntGeoWiseChargeList[index].selectedCityList = []; 
   }
    this.contractservice.getCityByStateService(stateId).subscribe(result => {
      let ob = ErrorConstants.validateException(result);
      if (ob.isSuccess) {

        var cities = result.data.responseData;
        var stateExists = false;
        var cityExists: string[] = [];
        for (let i = 0; i < this.cmdmntGeoWiseChargeList.length - 1; i++) {
          if (stateId === this.cmdmntGeoWiseChargeList[i].stateId && i !== index) {
            stateExists = true;
            console.log(stateId);
            this.cmdmntGeoWiseChargeList[i].selectedCityList.forEach(city => {
              cities.forEach(element => {
                if (city === element.id) {
                  cityExists.push(element.id);
                }
              });
            });
          }
        }
        if (cityExists && cityExists.length > 0) {
          cities.forEach(element => {
            if (!cityExists.includes(element.id)) {
              this.cmdmntGeoWiseChargeList[index].cityList.push({ id: element.id, lookupVal: element.cityName ,descr: element.cityName });
          }});
          this.cmdmntGeoWiseChargeList[index].cityList.sort((a, b) => {
            const cityNameA = a.lookupVal.toUpperCase();
            const cityNameB = b.lookupVal.toUpperCase();
            let comparison = 0;
            if (cityNameA > cityNameB) {
              comparison = 1;
            } else if (cityNameA < cityNameB) {
              comparison = -1;
            }
            return comparison;
          });
        }
        console.log(cities, "stateExists==>", stateExists);
        if (!stateExists) {
          cities.forEach(element => {
            this.cmdmntGeoWiseChargeList[index].cityList.push({ id: element.id, lookupVal: element.cityName, descr:element.cityName  });
          });
          this.cmdmntGeoWiseChargeList[index].cityList.sort((a, b) => {
            const cityNameA = a.lookupVal.toUpperCase();
            const cityNameB = b.lookupVal.toUpperCase();
            let comparison = 0;
            if (cityNameA > cityNameB) {
              comparison = 1;
            } else if (cityNameA < cityNameB) {
              comparison = -1;
            }
            return comparison;
          });
        }
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.tosterService.error(ob.message);
      }
    }, error => {
      this.spinner.hide();
      this.tosterService.error(ErrorConstants.getValue(404));
    });
  }

  selectCity(index, cntrl) {
    this.cmdmntGeoWiseChargeList[index].selectedCityList = cntrl;
  }

  addStates() {
    let cmdmntGeoWiseChargesNew: models.CmdmntGeoWiseChargeDTO[];
    cmdmntGeoWiseChargesNew = [];
    let stateList = [];
    let validate = true;
    this.cmdmntGeoWiseChargeList.forEach(element => {
      if (validate && !element.validDt) {
        validate = false;
        this.tosterService.error('Invalid Expiry Date !!');
        return;
      }

      if (validate && !element.validPrice) {
        validate = false;
        this.tosterService.error('Invalid Price !!');
        return;
      }

      if (validate && ((!element.stateId || element.stateId === null)
        || (!element.lkpCalcUnitId || element.lkpCalcUnitId === null)
        || (!element.price || element.price === null || (element.price && !element.price.toString().trim()))
        || (!element.disableCity && (!element.selectedCityList || element.selectedCityList.length === 0)))) {
        validate = false;
        this.tosterService.error('Some Required Fields Missing/Invalid !');
        return;
      }

      if (validate && !(element.selectedCityList && element.selectedCityList.length > 0)) {
        if (stateList.includes(element.stateId)) {
          this.tosterService.warning('Duplicate state exists for all cities. Kindly remove/modify data.');
          validate = false;
        } else {
          stateList.push(element.stateId);
        }
      } else {
        stateList.push(element.stateId);
      }
      if (element.price && element.validPrice) {
        element.price = Number(element.price.toString().trim()); }
    });

    if (validate) {

    for (let i = 0; i < this.cmdmntGeoWiseChargeList.length; i++) {
      var data = this.cmdmntGeoWiseChargeList[i];
      if(this.cmdmntGeoWiseChargeList[i].selectedCityList && this.cmdmntGeoWiseChargeList[i].selectedCityList.length>0){
        var cities = this.cmdmntGeoWiseChargeList[i].selectedCityList;
        for (let j = 0; j < cities.length; j++) {
          var cmdmntGeoCharge = new models.CmdmntGeoWiseChargeDTO;
          data.cityId = cities[j];
          data.cmdmntGeoLevel = "CITY";
          Object.assign(cmdmntGeoCharge, data);
          cmdmntGeoCharge.id = null;
          cmdmntGeoWiseChargesNew.push(cmdmntGeoCharge);
        }
      }
      else {
        var cmdmntGeoCharge = new models.CmdmntGeoWiseChargeDTO;
        data.cityId = null;
        data.cmdmntGeoLevel = "STATE";
        Object.assign(cmdmntGeoCharge, data);
        cmdmntGeoCharge.id = null;
        cmdmntGeoWiseChargesNew.push(cmdmntGeoCharge);
      }
    }
   
    var length = this.cmdmntGeoWiseCharges.length;
    for (let i = 0; i < cmdmntGeoWiseChargesNew.length; i++) {
      var id = 0;
      if (length > 0) {
        this.cmdmntGeoWiseCharges.forEach(oldData => {
          if (oldData.stateId == cmdmntGeoWiseChargesNew[i].stateId && oldData.cityId == cmdmntGeoWiseChargesNew[i].cityId)
            id = oldData.id;
        });
        if(id>0){
          cmdmntGeoWiseChargesNew[i].id = id;
        }else{
          cmdmntGeoWiseChargesNew[i].id = null;
        }
        this.cmdmntGeoWiseCharges.push(cmdmntGeoWiseChargesNew[i]);
      } else {
        this.cmdmntGeoWiseCharges.push(cmdmntGeoWiseChargesNew[i]);
      }
    }
    this.dialogRef.close(cmdmntGeoWiseChargesNew);

  }
  }

  updateList(index, column, value) {
    this.cmdmntGeoWiseChargeList[index][column] = value;
    if (column === 'expDt' && !(value === 0 || value === 1)) {
      this.checkDate(index, value,column);
      }
    if (column === 'price') {
      let regex = /^\d*\.?\d{0,2}$/g;
      let exp = String(value).match(regex);
      this.cmdmntGeoWiseChargeList[index].validPrice = !isNaN(parseFloat(value)) && isFinite(value) && exp !== null && exp.length !== 0;
      }
  }

  checkDate(index, value, column) {
    if (value) {
      let a = this.datePipe.transform(value, 'yyyy-MM-dd');
      let currentDate: Date = new Date();
      currentDate.setHours(0, 0, 0, 0);
      let currDateinMilli = new Date(currentDate);
      let dateinMilli = new Date(Date.parse(a));
      this.cmdmntGeoWiseChargeList[index][column] = a;
      if (dateinMilli.getTime() > currDateinMilli.getTime()) {
        this.cmdmntGeoWiseChargeList[index].validDt = true;
      } else {
        this.cmdmntGeoWiseChargeList[index].validDt = false;
      }
    } else {
      this.cmdmntGeoWiseChargeList[index].validDt = true;
    }
  }

  changeValue(index, column, value) {
    if (column === 'price') {
      let regex = /^\d*\.?\d{0,2}$/g;
      let exp = String(value).match(regex);
      this.cmdmntGeoWiseChargeList[index].validPrice = !isNaN(parseFloat(value)) && isFinite(value) && exp !== null && exp.length !== 0;
    }
    this.cmdmntGeoWiseChargeList[index][column] = value;
  }

  selectAllCity(checked, index) {
    if (!checked) {
      this.getCity(this.cmdmntGeoWiseChargeList[index].stateId, index, false); }
    this.cmdmntGeoWiseChargeList[index].cityCntrl = new FormControl();
    this.cmdmntGeoWiseChargeList[index].disableCity = checked;
    this.cmdmntGeoWiseChargeList[index].selectedCityList = [];
  }

  deleteGeoCharge(index) {
    this.cmdmntGeoWiseChargeList.splice(index, 1);
    let temp = [];
    Object.assign(temp, this.cmdmntGeoWiseChargeList);
    this.cmdmntGeoWiseChargeList = [];
    this.cmdmntGeoWiseChargeList = this.cmdmntGeoWiseChargeList.concat(temp);
    
  }

  @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if (event.keyCode === 27) { // esc [Close Dialog]
        event.preventDefault();
        if(document.getElementById('closeButton')){
          let element: HTMLElement = document.getElementById('closeButton') as HTMLElement;
          element.click();
        }
      }
  }

  searchCtrl = '';
  searchCtrlCity = '';
  scrollActiveValue(){
    let selectItem = document.getElementsByClassName('mat-selected')[0];
    setTimeout(()=>{  
        if(selectItem){
          selectItem.scrollIntoView(false);
        }
    },500)
  }

  getToolTipData(element) {
    let message = '';
    if (element.cityList && element.cityList.length > 0
      && element.cityCntrl && element.cityCntrl.value && element.cityCntrl.value.length > 0) {
      element.cityList.forEach(data => {
        element.cityCntrl.value.forEach(data1 => {
          if (data.id === data1) {
            if (message !== '') {
              message += ', ' + data.lookupVal;
            } else {
              message = data.lookupVal;
            }
          }
        });
      });
    }
    return message;
  }

}

/* Exclude Pincode Component ends */


/* Exclude Pincode Component starts */

@Component({
  selector: 'exPincode-dialog',
  templateUrl: 'commandment.exPincode.dialog.html',
  styleUrls: ['../core.css']
})

export class ExcludePinDialogBox {

  constructor(private spinner: NgxSpinnerService, private tosterService: ToastrService, private dialog: MatDialog, private contractservice: ContractService,
    public dialogRef: MatDialogRef<ExcludePinDialogBox>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  excludedPincodeList: models.CommdtGeoExclusionDTO[] = [];
  allPincodeList: models.CommdtGeoExclusionDTO[] = [];
  cmdmntId: number = 0;
  stateList: Lookup[];
  cityList: Lookup[] = [];
  stateId: number;
  cityId: number;
  allCheckedEx = false;
  allCheckedInc = false;

  ngOnInit() {
    this.cmdmntId = this.data.cmdmntId;
    this.getPincode(1);
  }

  getStateList() {
    this.contractservice.getStatesByPinFeatureId(this.data.geoFeatureId).subscribe(result => {
      let ob = ErrorConstants.validateException(result);
      if (ob.isSuccess) {
        let stateData = [];
        result.data.responseData.forEach(element => {
          stateData.push({ id: element.id, lookupVal: element.stateName,descr: element.stateName });
        });
        this.stateList = JSON.parse(JSON.stringify(stateData));
        this.cityList = [];
        this.cityId = null;
  
      }else {
        this.tosterService.error(ob.message);
        this.spinner.hide();
      }
    });
  }

  getCityList() {
    this.spinner.show();
    this.contractservice.getCityByStateNPinFeatureId(this.stateId,this.data.geoFeatureId).subscribe(
      
      result => {
        let ob = ErrorConstants.validateException(result);
          if (ob.isSuccess) {
            let cityData = [];
            result.data.responseData.forEach(element => {
              cityData.push({ id: element.id, lookupVal: element.cityName,descr: element.cityName });
            });
            this.cityList = JSON.parse(JSON.stringify(cityData));
          }else {
            this.cityList = [];
            this.tosterService.error(ob.message);
          }
          this.spinner.hide();
    },
    error=>{
      this.cityList = [];
      this.spinner.hide();
      console.log(error);
      this.tosterService.error(ErrorConstants.getValue(404));
    }

    )}

  closeDialog(): void {
    
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      panelClass: 'creditDialog',
      data:{message:'Are you sure ?'},
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if(value){
        this.dialogRef.close();
      }else{
        console.log('Keep Open');
      }
    });

  }

  getPincode(flag) {
    this.spinner.show();
    this.allPincodeList = [];
    this.contractservice.getPincodeByFeature(this.stateId, this.cityId, this.data.geoFeatureId).subscribe(resultData => {
      let ob = ErrorConstants.validateException(resultData);
      if (ob.isSuccess) {
        if (this.excludedPincodeList && this.excludedPincodeList.length > 0 && flag != 1) {
          resultData.data.responseData.forEach(element => {
            var exists = false;
            this.excludedPincodeList.forEach(exPincode => {
              if (exPincode.pincodeId.toString() === element.pincode) {
                exists = true;
              }
            });
            if(!exists){
              var pincodeData = new models.CommdtGeoExclusionDTO();
              pincodeData.pincodeId = element.pincode;
              pincodeData.pincode = element.pincode;
              pincodeData.city = element.city.cityName;
              this.allPincodeList.push(pincodeData);
            }
          });
        } else {
          resultData.data.responseData.forEach(element => {
            var pincodeData = new models.CommdtGeoExclusionDTO();
            pincodeData.pincodeId = element.pincode;
            pincodeData.pincode = element.pincode;
            pincodeData.city = element.city.cityName;
            this.allPincodeList.push(pincodeData);
          });
        }
        if (flag === 1) {
          this.getStateList();
          this.excludedPincodeList = this.excludedPincodeList.concat(this.data.excludedPincodeList);
          this.allPincodeList.forEach(element => {
            for (let i = 0; i < this.excludedPincodeList.length; i++) {
              if(element.pincode===this.excludedPincodeList[i].pincodeId.toString()){
                this.excludedPincodeList[i].city= JSON.parse(JSON.stringify(element.city));
              }
            }
          });
          this.allPincodeList = [];
        }
      } else {
        this.tosterService.error(ob.message);
      }
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.tosterService.error(ErrorConstants.getValue(404));
    });
  }

  addToExcludeList() {
    this.allCheckedEx = false;
    this.allCheckedInc = false;
    let pincodeList = JSON.parse(JSON.stringify(this.allPincodeList));
    this.allPincodeList = [];
    pincodeList.forEach(element => {
      if (element.isChecked) {
        element.isChecked = false;
        this.excludedPincodeList.push(element);
      } else {
        this.allPincodeList.push(element);
    }});
  }

  removeFromExcludeList() {
    this.allCheckedEx = false;
    this.allCheckedInc = false;
    let pincodeList = JSON.parse(JSON.stringify(this.excludedPincodeList));
    this.excludedPincodeList = [];
    pincodeList.forEach(element => {
      if (element.isChecked) {
        element.isChecked = false;
        element.pincode = element.pincodeId;
        this.allPincodeList.push(element);
      } else {
        this.excludedPincodeList.push(element);
    }});
  }

  changeAllInc(value) {
    if (value === true) {
      this.allPincodeList.forEach(element => {
        element.isChecked = true;
      });
    } else {
      this.allPincodeList.forEach(element => {
        element.isChecked = false;
      });
    }
  }
  changeAllEx(value) {
    if (value === true) {
      this.excludedPincodeList.forEach(element => {
        element.isChecked = true;
      });
    } else {
      this.excludedPincodeList.forEach(element => {
        element.isChecked = false;
      });
    }
  }
  resetAllInc() {
    this.allPincodeList.forEach(element => {
      if (!element.isChecked) {
        this.allCheckedInc = false;
        return;
      }});
      this.allCheckedInc = true;
  }
  resetAllEx() {
    this.excludedPincodeList.forEach(element => {
      if (!element.isChecked) {
        this.allCheckedEx = false;
        return;
      }});
      this.allCheckedEx = true;
  }

  saveExclusion() {
    this.dialogRef.close(this.excludedPincodeList);
  }

  @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if (event.keyCode === 27) { // esc [Close Dialog]
        event.preventDefault();
        if(document.getElementById('closeButton')){
          let element: HTMLElement = document.getElementById('closeButton') as HTMLElement;
          element.click();
        }
      }
  }

  searchCtrl = '';
  searchCtrlCity = '';
  scrollActiveValue(){
    let selectItem = document.getElementsByClassName('mat-selected')[0];
    setTimeout(()=>{  
        if(selectItem){
          selectItem.scrollIntoView(false);
        }
    },500);
  }

}

/* Exclude Pincode Component ends */
/* slab component starts */

@Component({
  selector: 'slab-dialog',
  templateUrl: 'commandment.slab.dialog.html',
  styleUrls: ['../core.css']
})

export class SlabDialogBox {

  constructor(private tosterService: ToastrService,public dialogRef: MatDialogRef<SlabDialogBox>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  slabChargeList: models.CommandmentSlabChargeDTO[] = [];
  slabCharge = new models.CommandmentSlabChargeDTO();
  cmdmntId: number = 0;
  slabColumns: string[];
  rrFlag = 0;

  closeDialog(): void {
    // this.dialogRef.close();
    
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      panelClass: 'creditDialog',
      data:{message:'Are you sure ?'},
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if(value){
        this.dialogRef.close();
      }else{
        console.log('Keep Open');
      }
    });
  }
  commmandmentName:any;
  ngOnInit() {
    this.slabColumns = ["slabFrom", "slabTo", "price","action"];
    this.slabChargeList = this.slabChargeList.concat(this.data.slabChargeList);
    this.cmdmntId = this.data.cmdmntId;
    this.commmandmentName = this.data.commmandmentName;
    this.rrFlag = this.data.rrFlag;
    if(this.slabChargeList.length == 0){
      //this.addSlab();
    }    
  }
  isAddSlabEnabled = false;

  addSlab() {
    var length = this.slabChargeList.length;
    for(var i = 0; i < length; i++){
      if(Number(this.slabChargeList[i]['slabFrom']) > Number(this.slabChargeList[i]['slabTo'])){
        this.tosterService.info('TO Value should be greater than FROM ');
        return;
      }
    }
    this.slabCharge = new models.CommandmentSlabChargeDTO();
    if(length == 0){this.slabCharge.slabFrom =0;}
    if (length > 0) {
      this.slabCharge.slabFrom = Number(this.slabChargeList[length - 1].slabTo) + 1;
      this.slabCharge.slabTo = null;
      this.slabCharge.price = null;
    }
    this.slabChargeList = this.slabChargeList.concat(this.slabCharge);
  }

  saveSlab() {
    for(var i = 0; i < this.slabChargeList.length; i++){
      if(Number(this.slabChargeList[i]['slabFrom']) > Number(this.slabChargeList[i]['slabTo'])){
        this.tosterService.info('TO Value should be greater than FROM ');
        return;
      }
    }
    this.dialogRef.close(this.slabChargeList);
  }

  updateList(index, column, valueObj) {
    let value:any;
    if(valueObj % 1 == 0){
      value = Math.floor(valueObj)
    }else{
      value = valueObj;
    }
    
    if(column=='slabTo'){
      if(this.slabChargeList[index+1]){
          this.slabChargeList[index + 1]["slabFrom"] = Number(value) + 1;
      }
    }
    this.slabChargeList[index][column] = value;
  }
  

  changeValue(index, column, value) {
    if(column=='slabTo'){
      if(this.slabChargeList[index+1]){
        this.slabChargeList[index + 1]["slabFrom"] = Number(value) + 1;
      }
    }
    this.slabChargeList[index][column] = value;
  }

  deleteSLab(i){
    this.slabChargeList.splice(i,1);
    let temp = JSON.parse(JSON.stringify(this.slabChargeList));
    this.slabChargeList = [];
    this.slabChargeList = temp;
  }

}

/* slab component ends */