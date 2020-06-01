import { Component, Input, Inject,OnChanges, ViewChild, Output, EventEmitter, HostListener } from '@angular/core';
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

  radioWithoutNA = [{ id: 1, value: 'RR' },
    { id: 2, value: 'CUSTOM' }
    ]
    

  @ViewChild("fCommandment", null) saveCommandment: any;
  
  isValidCommandment() {
    
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

    if ((this.saveCommandment.form.valid === true || rrFlagValid)) {
      this.saveCommandments(1);
    }else{
      if(this.saveCommandment.form.valid === false){
        this.tosterService.error('Some required fields are missing !!');
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
        this.tosterService.error('Some required fields are missing !!');
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
    console.log(this.inputData);
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
    console.log("inputdata", this.inputData);
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
          console.log(resultData);
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
              this.cmdmntRef.forEach(cmdmntData => {
                let exists = false;
                if (this.cmdmntCharge && this.cmdmntCharge.length > 0) {
                  for (let i = 0; i < this.cmdmntCharge.length; i++) {
                    if (this.cmdmntCharge[i].cmdmntId == cmdmntData.id) {
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
                      this.cmdmntCharge[i].rrValueList = this.createRadio();
                      exists = true;

                      if (this.cmdmntCharge[i].rrFlag == 1 && cmdmntData.cmdmntRrsList && cmdmntData.cmdmntRrsList.length > 0) {
                        this.cmdmntCharge[i].defaultPrice = cmdmntData.cmdmntRrsList[0].rrValue;
                        this.cmdmntCharge[i].defaultLkpCalcMeasureId = cmdmntData.cmdmntRrsList[0].calculationMeasureId;
                        this.cmdmntCharge[i].defaultLkpCalcUnitId = cmdmntData.cmdmntRrsList[0].calculationUnitId;
                        this.cmdmntCharge[i].price = cmdmntData.cmdmntRrsList[0].rrValue;
                        this.cmdmntCharge[i].lkpCalcMeasureId = cmdmntData.cmdmntRrsList[0].calculationMeasureId;
                        this.cmdmntCharge[i].lkpCalcUnitId = cmdmntData.cmdmntRrsList[0].calculationUnitId;
                        this.cmdmntCharge[i].lkpCalcTypeId = cmdmntData.cmdmntRrsList[0].calculationTypeId;
                        this.cmdmntCharge[i].minVal = cmdmntData.cmdmntRrsList[0].minValue;
                        this.cmdmntCharge[i].maxVal = cmdmntData.cmdmntRrsList[0].maxValue;
                        this.cmdmntCharge[i].defaultLkpCalcTypeId = cmdmntData.cmdmntRrsList[0].calculationTypeId;
                        this.cmdmntCharge[i].defaultMinVal = cmdmntData.cmdmntRrsList[0].minValue;
                        this.cmdmntCharge[i].defaultMaxVal = cmdmntData.cmdmntRrsList[0].maxValue;
                        this.cmdmntCharge[i].lkpChrgOnId = cmdmntData.cmdmntRrsList[0].cmdntChrgOnId
                        this.cmdmntCharge[i].defaultLkpChrgOnId = cmdmntData.cmdmntRrsList[0].cmdntChrgOnId
                        this.cmdmntCharge[i].minFrieghtFlg = cmdmntData.cmdmntRrsList[0].minFrieghtFlg
                        this.cmdmntCharge[i].fieldDisabled = true;
                        if (cmdmntData.cmdmntRrsList[0].cmdmntRrSlabList && cmdmntData.cmdmntRrsList[0].cmdmntRrSlabList.length > 0) {
                          this.cmdmntCharge[i].defaultCmdmntSlabCharge = [];
                          cmdmntData.cmdmntRrsList[0].cmdmntRrSlabList.forEach(element => {
                            let cmdmntSlabCharge = new models.CommandmentSlabChargeDTO();
                            cmdmntSlabCharge.price = element.rrValue;
                            cmdmntSlabCharge.slabFrom = element.slabFrom;
                            cmdmntSlabCharge.slabTo = element.slabTo;
                            this.cmdmntCharge[i].defaultCmdmntSlabCharge.push(cmdmntSlabCharge);
                          });
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
                      } else if (this.cmdmntCharge[i].rrFlag == 2) {
                        this.cmdmntCharge[i].fieldDisabled = false;
                        this.cmdmntCharge[i].defaultPrice = null;
                        this.cmdmntCharge[i].defaultLkpCalcMeasureId = null;
                        this.cmdmntCharge[i].defaultLkpCalcUnitId = null;
                        this.cmdmntCharge[i].defaultLkpCalcTypeId = null
                        this.cmdmntCharge[i].defaultMinVal = null
                        this.cmdmntCharge[i].defaultMaxVal = null
                        this.cmdmntCharge[i].defaultLkpChrgOnId = null
                      } else {
                        this.cmdmntCharge[i].fieldDisabled = true;
                        this.cmdmntCharge[i].defaultPrice = null;
                        this.cmdmntCharge[i].defaultLkpCalcMeasureId = null;
                        this.cmdmntCharge[i].defaultLkpChrgOnId = null
                        this.cmdmntCharge[i].defaultLkpCalcUnitId = null;
                        this.cmdmntCharge[i].defaultLkpCalcTypeId = null
                        this.cmdmntCharge[i].defaultMinVal = null
                        this.cmdmntCharge[i].defaultMaxVal = null
                      }

                    }
                  }
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
                  cmdmntChargeNew.minCalcFlag = cmdmntData.minAmountFlag;
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
                    cmdmntChargeNew.minVal = cmdmntData.cmdmntRrsList[0].minValue;
                    cmdmntChargeNew.maxVal = cmdmntData.cmdmntRrsList[0].maxValue;
                    cmdmntChargeNew.defaultLkpCalcTypeId = cmdmntData.cmdmntRrsList[0].calculationTypeId;
                    cmdmntChargeNew.defaultMinVal = cmdmntData.cmdmntRrsList[0].minValue;
                    cmdmntChargeNew.defaultMaxVal = cmdmntData.cmdmntRrsList[0].maxValue;
                    cmdmntChargeNew.lkpChrgOnId = cmdmntData.cmdmntRrsList[0].cmdntChrgOnId
                    cmdmntChargeNew.defaultLkpChrgOnId = cmdmntData.cmdmntRrsList[0].cmdntChrgOnId
                    cmdmntChargeNew.minFrieghtFlg = cmdmntData.cmdmntRrsList[0].minFrieghtFlg
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
                    cmdmntChargeNew.minVal = null;
                    cmdmntChargeNew.maxVal = null;
                    cmdmntChargeNew.defaultPrice = null;
                    cmdmntChargeNew.defaultLkpCalcMeasureId = null;
                    cmdmntChargeNew.defaultLkpCalcUnitId = null;
                    cmdmntChargeNew.defaultLkpCalcTypeId = null;
                    cmdmntChargeNew.defaultMinVal = null;
                    cmdmntChargeNew.defaultMaxVal = null;
                    cmdmntChargeNew.fieldDisabled = false;
                    cmdmntChargeNew.defaultLkpChrgOnId = null;
                  }
                  if (cmdmntData.rrFlag == 2) {
                    cmdmntChargeNew.fieldDisabled = true;
                  }
                  cmdmntChargeList.push(cmdmntChargeNew);
                }
              });
              console.log(cmdmntChargeList);
              console.log(this.cmdmntCharge);
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
            if (element.geoFeatureName && element.geoFeatureName != "") {
              this.geoCmdmntCharge.push(element);
            } else {
              this.nonGeoCmdmntCharge.push(element);
            }
          });
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
    console.log(rrValue, index, geo);
    let rrList = this.createRadio();
    let name = "";
    rrList.forEach(element => {
      if (element.id == rrValue) {
        name = element.value;
      }
    });
    if (geo) {
      if (name == "RR") {
        this.geoCmdmntCharge[index].price = this.geoCmdmntCharge[index].defaultPrice;
        this.geoCmdmntCharge[index].lkpCalcMeasureId = this.geoCmdmntCharge[index].defaultLkpCalcMeasureId;
        this.geoCmdmntCharge[index].lkpCalcUnitId = this.geoCmdmntCharge[index].defaultLkpCalcUnitId;
        this.geoCmdmntCharge[index].lkpCalcTypeId = this.geoCmdmntCharge[index].defaultLkpCalcTypeId;
        this.geoCmdmntCharge[index].lkpChrgOnId = this.geoCmdmntCharge[index].defaultLkpChrgOnId;
        this.geoCmdmntCharge[index].minVal = this.geoCmdmntCharge[index].defaultMinVal;
        this.geoCmdmntCharge[index].maxVal = this.geoCmdmntCharge[index].defaultMaxVal;
        this.geoCmdmntCharge[index].fieldDisabled = true;
        this.geoCmdmntCharge[index].applicableFlag = 1;
        this.geoCmdmntCharge[index].cmdmntSlabCharge = this.geoCmdmntCharge[index].defaultCmdmntSlabCharge;
      } else if (name == "NA") {
        this.geoCmdmntCharge[index].price = null;
        this.geoCmdmntCharge[index].lkpCalcMeasureId = null;
        this.geoCmdmntCharge[index].lkpCalcUnitId = null;
        this.geoCmdmntCharge[index].lkpCalcTypeId = null;
        this.geoCmdmntCharge[index].minVal = null;
        this.geoCmdmntCharge[index].maxVal = null;
        this.geoCmdmntCharge[index].lkpChrgOnId = null;
        this.geoCmdmntCharge[index].fieldDisabled = true;
        this.geoCmdmntCharge[index].applicableFlag = 0;
        this.geoCmdmntCharge[index].cmdmntSlabCharge = [];
      } else if (name == "CUSTOM") {
        this.geoCmdmntCharge[index].price = null;
        this.geoCmdmntCharge[index].lkpCalcMeasureId = null;
        this.geoCmdmntCharge[index].lkpCalcUnitId = null;
        this.geoCmdmntCharge[index].lkpCalcTypeId = null;
        this.geoCmdmntCharge[index].minVal = null;
        this.geoCmdmntCharge[index].maxVal = null;
        this.geoCmdmntCharge[index].lkpChrgOnId = null;
        this.geoCmdmntCharge[index].fieldDisabled = false;
        this.geoCmdmntCharge[index].applicableFlag = 1;
        this.geoCmdmntCharge[index].cmdmntSlabCharge = [];
      }
    } else {
      if (name == "RR") {
        this.nonGeoCmdmntCharge[index].price = this.nonGeoCmdmntCharge[index].defaultPrice;
        this.nonGeoCmdmntCharge[index].lkpCalcMeasureId = this.nonGeoCmdmntCharge[index].defaultLkpCalcMeasureId;
        this.nonGeoCmdmntCharge[index].lkpChrgOnId = this.nonGeoCmdmntCharge[index].defaultLkpChrgOnId;
        this.nonGeoCmdmntCharge[index].lkpCalcUnitId = this.nonGeoCmdmntCharge[index].defaultLkpCalcUnitId;
        this.nonGeoCmdmntCharge[index].lkpCalcTypeId = this.nonGeoCmdmntCharge[index].defaultLkpCalcTypeId;
        this.nonGeoCmdmntCharge[index].minVal = this.nonGeoCmdmntCharge[index].defaultMinVal;
        this.nonGeoCmdmntCharge[index].maxVal = this.nonGeoCmdmntCharge[index].defaultMaxVal;
        this.nonGeoCmdmntCharge[index].fieldDisabled = true;
        this.nonGeoCmdmntCharge[index].applicableFlag = 1;
        this.nonGeoCmdmntCharge[index].cmdmntSlabCharge = this.nonGeoCmdmntCharge[index].defaultCmdmntSlabCharge;
      } else if (name == "NA") {
        this.nonGeoCmdmntCharge[index].price = null;
        this.nonGeoCmdmntCharge[index].lkpCalcMeasureId = null;
        this.nonGeoCmdmntCharge[index].lkpCalcUnitId = null;
        this.nonGeoCmdmntCharge[index].lkpCalcTypeId = null;
        this.nonGeoCmdmntCharge[index].minVal = null;
        this.nonGeoCmdmntCharge[index].maxVal = null;
        this.nonGeoCmdmntCharge[index].lkpChrgOnId = null;
        this.nonGeoCmdmntCharge[index].fieldDisabled = true;
        this.nonGeoCmdmntCharge[index].applicableFlag = 0;
        this.nonGeoCmdmntCharge[index].cmdmntSlabCharge = [];
      } else if (name == "CUSTOM") {
        this.nonGeoCmdmntCharge[index].price = null;
        this.nonGeoCmdmntCharge[index].lkpCalcMeasureId = null;
        this.nonGeoCmdmntCharge[index].lkpCalcUnitId = null;
        this.nonGeoCmdmntCharge[index].lkpCalcTypeId = null;
        this.nonGeoCmdmntCharge[index].minVal = null;
        this.nonGeoCmdmntCharge[index].maxVal = null;
        this.nonGeoCmdmntCharge[index].lkpChrgOnId = null;
        this.nonGeoCmdmntCharge[index].fieldDisabled = false;
        this.nonGeoCmdmntCharge[index].applicableFlag = 1;
        this.nonGeoCmdmntCharge[index].cmdmntSlabCharge = [];
      }
    }
  }

  updateList(index, column, value, geo) {
    console.log(index, column, value, geo);
    if (geo)
      this.geoCmdmntCharge[index][column] = value;
    else
      this.nonGeoCmdmntCharge[index][column] = value;
  }

  changeValue(index, column, value, geo) {
    console.log(index, column, value, geo);
    if (geo)
      this.geoCmdmntCharge[index][column] = value;
    else
      this.nonGeoCmdmntCharge[index][column] = value;
  }

  saveCommandments(nextFlag) {
    console.log(this.cmdmntCharge);
    console.log(this.commandmentResult);
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
    console.log(data);
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

  addSlabCharges(index, geo) {
    var cmdmntId: any = 0;
    var slabChargeList: models.CommandmentSlabChargeDTO[] = [];
    var calTypeId = 0;
    var calcTypeName = "";
    var calTypeList = [];
    if (geo) {
      calTypeId = this.geoCmdmntCharge[index].lkpCalcTypeId;
      cmdmntId = this.geoCmdmntCharge[index].cmdmntId;
      slabChargeList = this.geoCmdmntCharge[index].cmdmntSlabCharge;
      calTypeList = this.geoCmdmntCharge[index].calcTypeList;
    } else {
      calTypeId = this.nonGeoCmdmntCharge[index].lkpCalcTypeId;
      cmdmntId = this.nonGeoCmdmntCharge[index].cmdmntId;
      slabChargeList = this.nonGeoCmdmntCharge[index].cmdmntSlabCharge;
      calTypeList = this.nonGeoCmdmntCharge[index].calcTypeList;
    }

    calTypeList.forEach(element => {
      if (element.id == calTypeId)
        calcTypeName = element.lookupVal;
    });

    if (calcTypeName == 'SLAB') {
      const slabDialog = this.dialog.open(SlabDialogBox, {disableClose: true,
        width: '650px',
        panelClass: 'creditDialog',
        data: { cmdmntId: cmdmntId, slabChargeList: slabChargeList }
      });
      slabDialog.afterClosed().subscribe(result => {
        console.log(result, 'The dialog was closed');
        if (result && result != "") {
          if (geo) {
            this.geoCmdmntCharge[index].cmdmntSlabCharge = result;
          } else {
            this.nonGeoCmdmntCharge[index].cmdmntSlabCharge = result;
          }
        }
      });
    }

  }

  excludePincode(index) {
    console.log(this.geoCmdmntCharge[index]);
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
      if (result && result.length > 0){
        this.geoCmdmntCharge[index].cmdmntGeoExclusion = result;
      } else {
        this.geoCmdmntCharge[index].cmdmntGeoExclusion = [];
      }
    });
  }

  includeStateCity(index) {
    const includeStateCity = this.dialog.open(GeoWiseChargeDialogBox, {disableClose: true,
      panelClass: 'creditDialog',
      data: {
        cmdmntId: this.geoCmdmntCharge[index].cmdmntId, cmdmntGeoWiseChargeList: this.geoCmdmntCharge[index].cmdmntGeoWiseCharge
        , geoFeatureId: this.geoCmdmntCharge[index].geoFeatureId
      },
      width: '120rem',
    });
    includeStateCity.afterClosed().subscribe(result => {
      console.log(result, 'The dialog was closed');
      if (result && result.length > 0)
        this.geoCmdmntCharge[index].cmdmntGeoWiseCharge = result;
    });
  }

  deactivateOrpanChild(newCommandmentList): any {
    var inactiveStatus = 0;
    this.referenceList.statusList.forEach(element => {
      if (element.lookupVal === 'INACTIVE')
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
    public dialogRef: MatDialogRef<GeoWiseChargeDialogBox>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  cmdmntGeoWiseCharges: models.CmdmntGeoWiseChargeDTO[] = [];
  cmdmntGeoWiseChargeList: models.CmdmntGeoWiseChargeDTO[] = [];
  cmdmntGeoWiseCharge = new models.CmdmntGeoWiseChargeDTO();
  cmdmntId: number = 0;
  columns: string[];
  stateList: Lookup[] = [];
  cityList: Lookup[] = [];
  surchargeTypeList: Lookup[] = [];


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
    this.contractservice.getStatesByFeature(this.data.geoFeatureId).subscribe(result => {
      result.data.responseData.forEach(element => {
        this.stateList.push({ id: element.id, lookupVal: element.stateName,descr:element.stateName });
      });
      this.columns = ["state", "city", "desc", "expDate", "amount"];
      console.log(this.data);
      if (this.data.cmdmntGeoWiseChargeList && this.data.cmdmntGeoWiseChargeList.length > 0) {
        this.cmdmntGeoWiseCharges = this.cmdmntGeoWiseCharges.concat(this.data.cmdmntGeoWiseChargeList);
        let dataListMap = new Map();
        for (let i = 0; i < this.cmdmntGeoWiseCharges.length; i++) {
          if (this.cmdmntGeoWiseCharges[i].cityId && this.cmdmntGeoWiseCharges[i].cityId > 0) {
            var data = this.cmdmntGeoWiseCharges[i].stateId 
              + "" + this.cmdmntGeoWiseCharges[i].descr + "" + this.cmdmntGeoWiseCharges[i].expDt
              + "" + this.cmdmntGeoWiseCharges[i].price;
            var index = dataListMap.get(data);
            if (index || index === 0) {
              this.cmdmntGeoWiseChargeList[index].selectedCityList.push(this.cmdmntGeoWiseCharges[i].cityId);
              this.cmdmntGeoWiseChargeList[index].cityCntrl.setValue(this.cmdmntGeoWiseChargeList[index].selectedCityList);
              console.log(this.cmdmntGeoWiseChargeList[index].cityCntrl.value,"aaaaaaaaaa",this.cmdmntGeoWiseChargeList[index].selectedCityList);
            } else {
              dataListMap.set(data, this.cmdmntGeoWiseChargeList.length);
              this.cmdmntGeoWiseCharges[i].selectedCityList = [];
              this.cmdmntGeoWiseCharges[i].selectedCityList.push(this.cmdmntGeoWiseCharges[i].cityId);
              this.cmdmntGeoWiseCharges[i].cityCntrl = new FormControl();
              this.cmdmntGeoWiseCharges[i].cityCntrl.setValue(this.cmdmntGeoWiseCharges[i].selectedCityList);
              console.log(this.cmdmntGeoWiseCharges[i].cityCntrl.value,"bbbb",this.cmdmntGeoWiseCharges[i].selectedCityList);
              this.cmdmntGeoWiseCharges[i].stateList = this.stateList;
              this.cmdmntGeoWiseChargeList.push(this.cmdmntGeoWiseCharges[i]);
              this.getCityStart(this.cmdmntGeoWiseCharges[i].stateId,this.cmdmntGeoWiseChargeList.length -1);
            }
          } else {
            this.cmdmntGeoWiseCharges[i].cityCntrl = new FormControl();
            this.cmdmntGeoWiseCharges[i].stateList = this.stateList;
            this.cmdmntGeoWiseChargeList.push(this.cmdmntGeoWiseCharges[i]);
            this.getCityStart(this.cmdmntGeoWiseCharges[i].stateId,this.cmdmntGeoWiseChargeList.length -1);
          }

        }
      }


      this.cmdmntId = this.data.cmdmntId;
      console.log(this.cmdmntGeoWiseCharges);
      console.log(this.cmdmntId, this.cmdmntGeoWiseChargeList);
    }, error => {
      console.log("Error in getting all states");
    });
  }

  addCharge() {
    this.cmdmntGeoWiseCharge = new models.CmdmntGeoWiseChargeDTO;
    this.cmdmntGeoWiseCharge.stateList = this.cmdmntGeoWiseCharge.stateList.concat(this.stateList);
    this.cmdmntGeoWiseChargeList = this.cmdmntGeoWiseChargeList.concat(this.cmdmntGeoWiseCharge);
    console.log(this.cmdmntGeoWiseChargeList);
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
      }else {
        this.tosterService.error(ob.message);
        this.spinner.hide();
      }
    }, error => {
      this.tosterService.error(ErrorConstants.getValue(404));
    });
}

  getCity(stateId, index) {
    this.cmdmntGeoWiseChargeList[index].cityList = [];
    this.cmdmntGeoWiseChargeList[index].selectedCityList = [];
    this.contractservice.getCityByStateService(stateId).subscribe(result => {
      let ob = ErrorConstants.validateException(result);
      if (ob.isSuccess) {

        var cities = result.data.responseData;
        var stateExists = false;
        var cityExists: string[] = [];
        for (let i = 0; i < this.cmdmntGeoWiseChargeList.length - 1; i++) {
          if (stateId == this.cmdmntGeoWiseChargeList[i].stateId) {
            stateExists = true;
            console.log(stateId);
            this.cmdmntGeoWiseChargeList[i].selectedCityList.forEach(city => {
              cities.forEach(element => {
                if (city == element.id) {
                  cityExists.push(element.id);
                }
              });
            });
          }
        }
        if (cityExists && cityExists.length > 0) {
          cities.forEach(element => {
            if (!cityExists.includes(element.id))
              this.cmdmntGeoWiseChargeList[index].cityList.push({ id: element.id, lookupVal: element.cityName ,descr: element.cityName });
          });
        }
        console.log(cities, "stateExists==>", stateExists);
        if (!stateExists) {
          cities.forEach(element => {
            this.cmdmntGeoWiseChargeList[index].cityList.push({ id: element.id, lookupVal: element.cityName, descr:element.cityName  });
          });
          console.log(this.cmdmntGeoWiseChargeList[index]);
        }
  
  
      }else {
        this.tosterService.error(ob.message);
        this.spinner.hide();
      }
    }, error => {
      this.tosterService.error(ErrorConstants.getValue(404));
    });
  }

  selectCity(index, cntrl) {
    console.log(index, cntrl);
    this.cmdmntGeoWiseChargeList[index].selectedCityList = cntrl;
    console.log(this.cmdmntGeoWiseChargeList[index].selectedCityList);
  }

  addStates() {
    let cmdmntGeoWiseChargesNew: models.CmdmntGeoWiseChargeDTO[];
    cmdmntGeoWiseChargesNew = [];
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

  updateList(index, column, value) {
    console.log(index, column, value);
    this.cmdmntGeoWiseChargeList[index][column] = value;
  }

  changeValue(index, column, value) {
    console.log(index, column, value);
    this.cmdmntGeoWiseChargeList[index][column] = value;
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
  stateList: Lookup[] = [];
  cityList: Lookup[] = [];
  stateId: number;
  cityId: number;

  ngOnInit() {
    this.cmdmntId = this.data.cmdmntId;
    this.getPincode(1);
  }

  getStateList() {
    this.contractservice.getAllStates().subscribe(result => {
      let ob = ErrorConstants.validateException(result);
      if (ob.isSuccess) {
        result.data.responseData.forEach(element => {
          this.stateList.push({ id: element.id, lookupVal: element.stateName,descr: element.stateName });
        });
        console.log(this.stateList);
  
      }else {
        this.tosterService.error(ob.message);
        this.spinner.hide();
      }
    });
  }

  getCityList() {
    this.cityList = [];
    this.spinner.show();
    this.contractservice.getCityByStateService(this.stateId).subscribe(result => {
     let ob = ErrorConstants.validateException(result);
      if (ob.isSuccess) {
        result.data.responseData.forEach(element => {
          this.cityList.push({ id: element.id, lookupVal: element.cityName,descr: element.cityName });
        });
  
      }else {
        this.tosterService.error(ob.message);
      }
      this.spinner.hide();
    }
    ),error=>{
      this.spinner.hide();
      this.tosterService.error(ErrorConstants.getValue(404));
    };
  }

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
        
        console.log(this.allPincodeList);
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
    }), error => {
      this.spinner.hide();
      this.tosterService.error(ErrorConstants.getValue(404));
    };
  }

  addToExcludeList() {
    let pincodeList = JSON.parse(JSON.stringify(this.allPincodeList));
    this.allPincodeList = [];
    pincodeList.forEach(element => {
      if (element.isChecked) {
        element.isChecked = false;
        this.excludedPincodeList.push(element);
      }
      else
        this.allPincodeList.push(element);
    });
    console.log(this.excludedPincodeList);
    console.log(this.allPincodeList);
  }

  removeFromExcludeList() {
    let pincodeList = JSON.parse(JSON.stringify(this.excludedPincodeList));
    this.excludedPincodeList = [];
    pincodeList.forEach(element => {
      if (element.isChecked) {
        element.isChecked = false;
        element.pincode = element.pincodeId;
        this.allPincodeList.push(element);
      }
      else
        this.excludedPincodeList.push(element);
    });
    console.log(this.excludedPincodeList);
    console.log(this.allPincodeList);
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

}

/* Exclude Pincode Component ends */
/* slab component starts */

@Component({
  selector: 'slab-dialog',
  templateUrl: 'commandment.slab.dialog.html',
  styleUrls: ['../core.css']
})

export class SlabDialogBox {

  constructor(public dialogRef: MatDialogRef<SlabDialogBox>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  slabChargeList: models.CommandmentSlabChargeDTO[] = [];
  slabCharge = new models.CommandmentSlabChargeDTO();
  cmdmntId: number = 0;
  slabColumns: string[];

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
    this.slabColumns = ["slabFrom", "slabTo", "price"];
    this.slabChargeList = this.slabChargeList.concat(this.data.slabChargeList);
    this.cmdmntId = this.data.cmdmntId;
    if(this.slabChargeList.length == 0){
      this.addSlab();
    }
    
  }
  isAddSlabEnabled = false;
  addSlab() {
    var length = this.slabChargeList.length;
    this.slabCharge = new models.CommandmentSlabChargeDTO();
    if (length > 0) {
      this.slabCharge.slabFrom = Number(this.slabChargeList[length - 1].slabTo);
      this.slabCharge.slabTo = null;
      this.slabCharge.price = null;
    }
    this.slabChargeList = this.slabChargeList.concat(this.slabCharge);
  }

  saveSlab() {
    this.dialogRef.close(this.slabChargeList);
  }

  updateList(index, column, value) {
    console.log(index, column, value);
    this.slabChargeList[index][column] = value;
  }

  changeValue(index, column, value) {
    console.log(index, column, value);
    this.slabChargeList[index][column] = value;
  }

}

/* slab component ends */