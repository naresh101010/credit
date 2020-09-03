import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  HostListener,
} from "@angular/core";
import { ContractService } from "../contract.service";
import { MatExpansionPanel } from "@angular/material";
import { AppSetting } from "../../app.setting";
import * as billing from "../models/billingModel";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { confimationdialog } from "../confirmationdialog/confimationdialog";
import { DatePipe } from "@angular/common";
import { ErrorConstants } from "../models/constants";
import { NgxPermissionsService } from "ngx-permissions";
import { AuthorizationService } from "../services/authorization.service";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";

@Component({
  selector: "app-billing",
  templateUrl: "./billing.component.html",
  styleUrls: ["../core.css"],
  providers: [],
})
export class BillingComponent implements OnInit {
  sfdcAccId = AppSetting.sfdcAccId;
  customerName = AppSetting.customerName;
  sfxCode = AppSetting.sfxCode;
  billingData: billing.BillingModel;
  allBillingData: billing.BillingModel[];
  billingLevelList: billing.Lookup[];
  billingSubLevelList: billing.Lookup[];
  billingSubTypeList: billing.Lookup[];
  paymentTermList: billing.Lookup[];
  billingCycleList: billing.Lookup[];
  billingByList: billing.Lookup[];
  billingByAllList: billing.Lookup[];
  todBasedOnList: billing.Lookup[];
  billingFormatList: billing.Lookup[];
  gbCategoryList: billing.Lookup[];
  ebillingList: billing.Radio[];
  autoBillingList: billing.Radio[];
  todList: billing.Radio[];
  cneeCnorBillList: billing.Radio[];
  billingDtlsList: billing.Radio[];
  billingOfferingList: billing.Offering[];
  billingOfferingId: number = 0;
  cneeCnorFlagList: billing.Radio[];
  categoryList: any;
  excludeBillingFlagList: billing.Radio[];
  selectOffering: boolean = false;
  serviceOfferingId: number = null;
  cneeList: billing.CneeCnor[];
  cnorList: billing.CneeCnor[];
  displayedColumns: string[];
  stateList: billing.Lookup[];
  addBilling: boolean = false;
  billingLevel: string = "";
  opprName: string = "";
  businessType: string = "";
  billingByLevelMapId: number = 0;
  billingByLevelName: string = "";
  rateCardId: number;
  rateCardList: any;
  oldBillingLevelId: number;
  statusList: billing.Lookup[];
  subTypePlaceholder = "";
  minDate;
  maxDate;
  msaBillingExists = false;

  @ViewChild("first", { static: false }) first: MatExpansionPanel;
  @ViewChild("second", { static: false }) second: MatExpansionPanel;

  constructor(
    private contractservice: ContractService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    private tosterService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private acrouter: ActivatedRoute,
    private permissionsService: NgxPermissionsService,
    private authorizationService: AuthorizationService
  ) {}

  createRadio() {
    var radio: any[] = [
      { id: 1, value: "YES" },
      { id: 0, value: "NO" },
    ];
    return radio;
  }
  setBillingDtls() {
    var billingDtls: any[] = [
      { value: "BILLING CYCLE FLAG" },
      { value: "ACTUAL BILL CREATION DATE" },
    ];
    return billingDtls;
  }

  createCategory() {
    var categoryList: any[] = [{ value: "CONSIGNEE" }];
    if (this.businessType != "INBOUND") {
      categoryList.push({ value: "CONSIGNOR TO CONSIGNEE" });
    }
    return categoryList;
  }

  editflow = false;
  isDisable: boolean;
  ngOnInit() {
    this.authorizationService.setPermissions("BILLING");
    this.permissionsService.loadPermissions(
      this.authorizationService.getPermissions("BILLING")
    );
    this.isDisable = false;
    this.acrouter.params.subscribe((params) => {
      if (params["editflow"]) {
        this.editflow = params["editflow"];
        this.isDisable = true;
      }
    });
    if (this.first) this.first.close();

    this.billingData = new billing.BillingModel(this.billingData);
    console.log(this.billingData, "print billingdata");
    this.billingData.aliasName = this.customerName;
    this.billingLevelList = [];
    this.billingSubLevelList = [];
    this.billingSubTypeList = [];
    this.paymentTermList = [];
    this.billingCycleList = [];
    this.billingByList = [];
    this.billingByAllList = [];
    this.todBasedOnList = [];
    this.billingFormatList = [];
    this.gbCategoryList = [];
    this.ebillingList = this.createRadio();
    this.autoBillingList = this.createRadio();
    this.todList = this.createRadio();
    this.cneeCnorBillList = [];
    this.billingDtlsList = this.setBillingDtls();
    this.billingOfferingList = [];
    this.cneeCnorFlagList = this.createRadio();
    this.excludeBillingFlagList = this.createRadio();
    this.cneeList = [];
    this.cnorList = [];
    this.stateList = [];
    this.rateCardId = 0;
    this.rateCardList = [];
    this.allBillingData = [];
    this.oldBillingLevelId = 0;
    this.statusList = [];
    this.loadMSABillingData(1);
  }
  opprAddressList: any = [];
  getOpportunityDetails() {
    this.opprAddressList = [];
    this.contractservice
      .getOportunity(AppSetting.oprtunityId, this.editflow)
      .subscribe(
        (opprResult) => {
          let ob = ErrorConstants.validateException(opprResult);
          if (ob.isSuccess) {
            var result = opprResult.data;
            this.opprName = result.responseData.opprName;
            this.minDate = result.responseData.contract.effectiveDt;
            this.maxDate = result.responseData.contract.expDt;
            for (var item of result.responseData.opprAddr) {
              this.opprAddressList.push(item.addr);
            }
            result.referenceData.businessTypeList.forEach(
              (businessTypeElement) => {
                if (
                  businessTypeElement.id ==
                  result.responseData.contract.lkpBizTypeId
                ) {
                  this.businessType = businessTypeElement.lookupVal;
                  console.log("111" + this.businessType);
                }
              }
            );
            this.categoryList = this.createCategory();
            this.getBillingData();
          } else {
            this.tosterService.error(ob.message);
            this.spinner.hide();
          }
        },
        (error) => {
          this.spinner.hide();
          this.tosterService.error(
            "Error in fetching opportunity and billing data"
          );
        }
      );
  }

  item: any;
  // ebillitem:any;
  getBillingData() {
    this.contractservice
      .getBillingData(AppSetting.contractId, this.editflow)
      .subscribe(
        (billingData) => {
          this.billingData = new billing.BillingModel();
          this.billingData.aliasName = this.customerName;
          var data = billingData.data;
          console.log(data);
          console.log("2222" + this.businessType);
          var offeringId = 0;
          var billingLevelId = 0;
          this.billingLevel = "";
          if (data.referenceData.billingLevelList) {
            this.billingLevelList = this.billingLevelList.concat(
              data.referenceData.billingLevelList
            );
          }
          if (data.responseData && data.responseData.length > 0) {
            this.billingLevelList.forEach((billingLevelelement) => {
              if (
                billingLevelelement.id ===
                data.responseData[0].lkpBillingLevelId
              ) {
                this.billingLevel = billingLevelelement.lookupVal;
              }
            });

            console.log(this.billingData, "BILLINGdATA1");
            this.billingData = JSON.parse(JSON.stringify(data.responseData[0]));
            console.log(this.billingData, "BILLINGdATA2");

            this.allBillingData = JSON.parse(JSON.stringify(data.responseData));
            offeringId = this.billingData.lkpBillingSublevelId;
            billingLevelId = this.billingData.lkpBillingLevelId;
            this.oldBillingLevelId = billingLevelId;
          }

          if (this.billingLevel == "MSA") {
            this.msaBillingExists = this.msaBillingExists && !this.editflow;
            this.second.open();
          } else if (this.billingLevel == "RATE CARD") {
            this.msaBillingExists = false;
            this.rateCardList = [];
            offeringId = 0;
            this.contractservice
              .getRateCardDetail(AppSetting.contractId, this.editflow)
              .subscribe(
                (result) => {
                  let ob = ErrorConstants.validateException(result);
                  if (ob.isSuccess) {
                    if (result && result.data.responseData) {
                      this.rateCardList = this.rateCardList.concat(
                        result.data.responseData
                      );
                    }
                    this.second.close();
                  } else {
                    this.tosterService.error(ob.message);
                    this.spinner.hide();
                  }
                },
                (error) => {
                  console.log("Error in getting rate card data");
                }
              );
          } else if (this.billingLevel != "") {
            this.msaBillingExists = false;
            this.second.open();
          }

          if (data.referenceData.billingByList) {
            if (
              this.billingLevel != "" &&
              this.billingLevel == "MSA" &&
              this.businessType != "ANYWHERE TO ANYWHERE"
            ) {
              data.referenceData.billingByList.forEach((billingByElement) => {
                if (
                  billingByElement.lookupVal == "CONSOLIDATION" ||
                  billingByElement.lookupVal == "DESTINATION BRANCH WISE" ||
                  billingByElement.lookupVal == "DESTINATION STATE WISE"
                )
                  this.billingByList.push(billingByElement);
              });
            } else {
              data.referenceData.billingByList.forEach((billingByElement) => {
                if (billingByElement.lookupVal != "CONSOLIDATION") {
                  if (
                    this.businessType == "INBOUND" &&
                    billingByElement.lookupVal != "BOOKING BRANCH"
                  ){
                    this.billingByList.push(billingByElement);
                  }                  
                  else if (this.businessType == "OUTBOUND"){
                    this.billingByList.push(billingByElement);
                  }
                    
                }
                if (
                  this.businessType == "ANYWHERE TO ANYWHERE" &&
                  (billingByElement.lookupVal == "DESTINATION BRANCH WISE" ||
                    billingByElement.lookupVal == "DESTINATION STATE WISE")
                ) {
                  this.billingByList.push(billingByElement);
                }
              });
            }
            this.billingByAllList = this.billingByAllList.concat(
              data.referenceData.billingByList
            );
          }

          if (data.referenceData.billingCycleList){
            this.billingCycleList = this.billingCycleList.concat(
              data.referenceData.billingCycleList
            );
          }
            
          if (data.referenceData.billingSubLevelList) {
            this.billingSubLevelList = this.billingSubLevelList.concat(
              data.referenceData.billingSubLevelList
            );
            this.billingSubLevelList.forEach((billingSubelement) => {
              if (
                billingSubelement.id == offeringId &&
                billingSubelement.lookupVal != "ALL"
              ) {
                //this.selectOffering = true;
                this.selectOffering = false; //making false as offering not to be selected from UI
              }
            });
          }

          if (
            this.billingData &&
            this.billingData.billingOfferingMap &&
            this.billingData.billingOfferingMap.length == 1 &&
            this.selectOffering
          )
            this.serviceOfferingId = this.billingData.billingOfferingMap[0].serviceOfferingId;

          if (data.referenceData.billingSubTypeList)
            this.billingSubTypeList = this.billingSubTypeList.concat(
              data.referenceData.billingSubTypeList
            );

          if (data.referenceData.paymentTermList)
            this.paymentTermList = this.paymentTermList.concat(
              data.referenceData.paymentTermList
            );

          if (data.referenceData.todBasedOnList)
            this.todBasedOnList = this.todBasedOnList.concat(
              data.referenceData.todBasedOnList
            );

          if (data.referenceData.billingFormatList)
            this.billingFormatList = this.billingFormatList.concat(
              data.referenceData.billingFormatList
            );

          if (data.referenceData.gbCategoryList)
            this.gbCategoryList = this.gbCategoryList.concat(
              data.referenceData.gbCategoryList
            );

          if (data.referenceData.offerings)
            this.billingOfferingList = this.billingOfferingList.concat(
              data.referenceData.offerings
            );

          if (data.referenceData.statusList)
            this.statusList = this.statusList.concat(
              data.referenceData.statusList
            );

          if (this.billingData && this.billingData.billingBy) {
            this.billingByList.forEach((billingByElement) => {
              if (
                billingByElement.id ==
                this.billingData.billingBy[0].billingByLevelMapId
              ) {
                this.billingByLevelMapId = billingByElement.id;
                this.billingByLevelName = billingByElement.lookupVal;
                if (this.billingByLevelName == "CONSOLIDATION") {
                  this.addBilling = false;
                  this.displayedColumns = [
                    "billingBranchId",
                    "submsnBranchId",
                    "collBranchId",
                    "billtoAddr",
                    "gstinNum",
                    "minBillingAmt",
                    "excludeBillingFlag",
                    "excludeBillingDt",
                    "tanNum",
                    "lkpGbCtgyId",
                    "creditRisk",
                    "mnthPotential",
                    "ebillEmail",
                    "bdmEmail",
                    "commBillEmail",
                  ];
                } else if (this.businessType != "ANYWHERE TO ANYWHERE") {
                  this.addBilling = false;
                  if (this.billingByLevelName == "BOOKING BRANCH") {
                    console.log('1')
                    this.displayedColumns = [
                      "billingBranchId",
                      "submsnBranchId",
                      "collBranchId",
                      "billtoAddr",
                      "gstinNum",
                      "minBillingAmt",
                      "excludeBillingFlag",
                      "excludeBillingDt",
                      "tanNum",
                      "lkpGbCtgyId",
                      "creditRisk",
                      "mnthPotential",
                      "ebillEmail",
                      "bdmEmail",
                      "commBillEmail",
                    ];
                  } else if (
                    this.billingByLevelName == "SUBMISSION BRANCH" ||
                    this.billingByLevelName == "COLLECTION BRANCH"
                  ) {
                     console.log("2");
                    this.displayedColumns = [
                      "assignBranchId",
                      "submsnBranchId",
                      "collBranchId",
                      "billtoAddr",
                      "gstinNum",
                      "minBillingAmt",
                      "excludeBillingFlag",
                      "excludeBillingDt",
                      "tanNum",
                      "lkpGbCtgyId",
                      "creditRisk",
                      "mnthPotential",
                      "ebillEmail",
                      "bdmEmail",
                      "commBillEmail",
                    ];
                  } else if (
                    this.billingByLevelName == "DESTINATION BRANCH WISE" &&
                    this.businessType === "OUTBOUND"
                  ) {
                    this.addBilling = true;
                    this.displayedColumns = [
                      "deleteBilling",
                      "billingBranchId",
                      "submsnBranchId",
                      "collBranchId",
                      "billtoAddr",
                      "gstinNum",
                      "minBillingAmt",
                      "excludeBillingFlag",
                      "excludeBillingDt",
                      "tanNum",
                      "lkpGbCtgyId",
                      "creditRisk",
                      "mnthPotential",
                      "ebillEmail",
                      "bdmEmail",
                      "commBillEmail",
                    ];
                  } else if (
                    this.billingByLevelName == "DESTINATION BRANCH WISE" &&
                    this.businessType === "INBOUND"
                  ) {
                    this.displayedColumns = [
                      "assignBranchId",
                      "submsnBranchId",
                      "collBranchId",
                      "billtoAddr",
                      "gstinNum",
                      "minBillingAmt",
                      "excludeBillingFlag",
                      "excludeBillingDt",
                      "tanNum",
                      "lkpGbCtgyId",
                      "creditRisk",
                      "mnthPotential",
                      "ebillEmail",
                      "bdmEmail",
                      "commBillEmail",
                    ];
                  } else if (
                    this.billingByLevelName == "DESTINATION STATE WISE" &&
                    this.businessType === "INBOUND"
                  ) {
                    console.log('1')
                    this.getAllStates();
                    this.displayedColumns = [
                      "assignBranchId",
                      "billingBranchId",
                      "state",
                      "submsnBranchId",
                      "collBranchId",
                      "billtoAddr",
                      "gstinNum",
                      "minBillingAmt",
                      "excludeBillingFlag",
                      "excludeBillingDt",
                      "tanNum",
                      "lkpGbCtgyId",
                      "creditRisk",
                      "mnthPotential",
                      "ebillEmail",
                      "bdmEmail",
                      "commBillEmail",
                    ];
                  } else if (
                    this.billingByLevelName == "DESTINATION STATE WISE" &&
                    this.businessType === "OUTBOUND"
                  ) {
                     console.log("2");
                    this.getAllStates();
                    this.addBilling = true;
                    this.displayedColumns = [
                      "deleteBilling",
                      "billingBranchId",
                      "state",
                      "submsnBranchId",
                      "collBranchId",
                      "billtoAddr",
                      "gstinNum",
                      "minBillingAmt",
                      "excludeBillingFlag",
                      "excludeBillingDt",
                      "tanNum",
                      "lkpGbCtgyId",
                      "creditRisk",
                      "mnthPotential",
                      "ebillEmail",
                      "bdmEmail",
                      "commBillEmail",
                    ];
                  }
                } else if (this.businessType == "ANYWHERE TO ANYWHERE") {
                  this.addBilling = true;
                  if (this.billingByLevelName == "DESTINATION BRANCH WISE") {
                    this.displayedColumns = [
                      "deleteBilling",
                      "billingBranchId",
                      "submsnBranchId",
                      "collBranchId",
                      "billtoAddr",
                      "gstinNum",
                      "minBillingAmt",
                      "excludeBillingFlag",
                      "excludeBillingDt",
                      "tanNum",
                      "lkpGbCtgyId",
                      "creditRisk",
                      "mnthPotential",
                      "ebillEmail",
                      "bdmEmail",
                      "commBillEmail",
                    ];
                  } else if (
                    this.billingByLevelName == "DESTINATION STATE WISE"
                  ) {
                    this.getAllStates();
                    this.displayedColumns = [
                      "deleteBilling",
                      "state",
                      "billingBranchId",
                      "submsnBranchId",
                      "collBranchId",
                      "billtoAddr",
                      "gstinNum",
                      "minBillingAmt",
                      "excludeBillingFlag",
                      "excludeBillingDt",
                      "tanNum",
                      "lkpGbCtgyId",
                      "creditRisk",
                      "mnthPotential",
                      "ebillEmail",
                      "bdmEmail",
                      "commBillEmail",
                    ];
                  }
                }
              }
            });
            for (let i = 0; i < this.billingData.billingBy.length; i++) {
              this.billingData.billingBy[
                i
              ].billtoAddrList = this.billingData.billingBy[i].billtoAddr.split(
                "||"
              );
              this.billingData.billingBy[
                i
              ].ebillemailList = this.billingData.billingBy[i].ebillEmail.split(
                "||"
              );
              this.billingData.billingBy[
                i
              ].bdmemailList = this.billingData.billingBy[i].bdmEmail.split(
                "||"
              );
              this.billingData.billingBy[
                i
              ].communicationemailList = this.billingData.billingBy[
                i
              ].commBillEmail.split("||");
              console.log(
                this.billingData.billingBy,
                "print editable mail data"
              );
              this.item = this.billingData.billingBy[i].bdmemailList[0];
            }
            this.billingData.billingBy.forEach((obj) => {
              obj.billtoAddr = obj.billtoAddrList[0];
              obj.ebillEmail = obj.ebillemailList[0];
              obj.bdmEmail = obj.bdmemailList[0];
              obj.commBillEmail = obj.communicationemailList[0];
            });
            if (
              !this.msaBillingExists &&
              this.businessType !== "ANYWHERE TO ANYWHERE" &&
              this.billingByLevelName !== "CONSOLIDATION" &&
              !(
                this.businessType === "OUTBOUND" &&
                this.billingByLevelName === "DESTINATION STATE WISE"
              ) &&
              !(
                this.businessType === "OUTBOUND" &&
                this.billingByLevelName === "DESTINATION BRANCH WISE"
              )
            ) {
              this.contractservice
                .getAssignBranchDetailByCntr(
                  AppSetting.contractId,
                  this.editflow,
                  this.billingLevel
                )
                .subscribe(
                  (result) => {
                    let ob = ErrorConstants.validateException(result);
                    if (ob.isSuccess) {
                      let branchData = JSON.parse(
                        JSON.stringify(result.data.responseData)
                      );
                      let branchToBillMap = new Map();
                      let billToBranchMap = new Map();
                      branchData.forEach((branchElement) => {
                        let newBillingBy = new billing.BillingBy();
                        var exist = false;
                        newBillingBy.billtoAddrList = this.opprAddressList;
                        newBillingBy.billtoAddr =
                          newBillingBy.billtoAddrList[0];
                        this.billingData.billingBy.forEach((obj) => {
                          if (
                            this.billingByLevelName === "BOOKING BRANCH" &&
                            obj.billingBranchId === branchElement.bkngBranchId
                          ) {
                            console.log("1");                            
                            exist = true;
                          } else if (
                            this.billingByLevelName !== "BOOKING BRANCH" &&
                            obj.assignBranchId === branchElement.bkngBranchId
                          ) {
                            console.log('2')
                            exist = true;
                          }
                        });
                        if (!exist) {
                          if (this.billingByLevelName === "BOOKING BRANCH") {
                            newBillingBy.billingBranchId =
                              branchElement.bkngBranchId;
                            newBillingBy.billingBranchName =
                              branchElement.bkngBranchName;
                            newBillingBy.assignBranchName =
                              branchElement.bkngBranchName;
                          } else {
                            newBillingBy.assignBranchId =
                              branchElement.bkngBranchId;
                            newBillingBy.assignBranchName =
                              branchElement.bkngBranchName;
                          }
                          branchToBillMap.set(
                            newBillingBy.assignBranchName,
                            newBillingBy
                          );
                        }
                      });

                      for (
                        let index = 0;
                        index < this.billingData.billingBy.length;
                        index++
                      ) {
                        const obj = this.billingData.billingBy[index];
                        let newBillingBy = new billing.BillingBy();
                        var exists = false;
                        newBillingBy.billtoAddrList = this.opprAddressList;
                        newBillingBy.billtoAddr =
                          newBillingBy.billtoAddrList[0];
                        branchData.forEach((elementData) => {
                          if (
                            this.billingByLevelName === "BOOKING BRANCH" &&
                            obj.billingBranchId === elementData.bkngBranchId
                          ) {
                            console.log('1')
                            exists = true;
                          } else if (
                            this.billingByLevelName !== "BOOKING BRANCH" &&
                            obj.assignBranchId === elementData.bkngBranchId
                          ) {
                            console.log("2");
                            exists = true;
                          }
                        });
                        if (!exists) {
                          if (this.billingByLevelName === "BOOKING BRANCH") {
                            newBillingBy.billingBranchId = obj.assignBranchId;
                            newBillingBy.billingBranchName =
                              obj.assignBranchName;
                            newBillingBy.assignBranchName =
                              obj.assignBranchName;
                          } else {
                            newBillingBy.assignBranchId = obj.assignBranchId;
                            newBillingBy.assignBranchName =
                              obj.assignBranchName;
                          }
                          billToBranchMap.set(
                            newBillingBy.assignBranchName,
                            index
                          );
                        }
                      }
                      if (
                        billToBranchMap.size > 0 &&
                        branchToBillMap.size > 0
                      ) {
                        let billingIndexList = Array.from(
                          billToBranchMap.values()
                        );
                        let brnchBillData = Array.from(
                          branchToBillMap.values()
                        );

                        for (let j = 0; j < billingIndexList.length; j++) {
                          this.billingData.billingBy[
                            billingIndexList[j]
                          ].assignBranchId = brnchBillData[j].assignBranchId;
                          this.billingData.billingBy[
                            billingIndexList[j]
                          ].billingBranchId = brnchBillData[j].billingBranchId;
                          this.billingData.billingBy[
                            billingIndexList[j]
                          ].assignBranchName =
                            brnchBillData[j].assignBranchName;
                          this.billingData.billingBy[
                            billingIndexList[j]
                          ].billingBranchName =
                            brnchBillData[j].billingBranchName;
                        }

                        if (billingIndexList.length !== brnchBillData.length) {
                          for (
                            let i = billingIndexList.length;
                            i < brnchBillData.length;
                            i++
                          ) {
                            this.billingData.billingBy = this.billingData.billingBy.concat(
                              brnchBillData[i]
                            );
                          }
                        }
                      } else if (branchToBillMap.size > 0) {
                        branchToBillMap.forEach((elementData) => {
                          this.billingData.billingBy = this.billingData.billingBy.concat(
                            elementData
                          );
                        });
                      }
                      let isBranchFound = false;
                      for (
                        let j = 0;
                        j < this.billingData.billingBy.length;
                        j++
                      ) {
                        isBranchFound = false;
                        branchData.forEach((branchElement) => {
                          if (
                            this.billingByLevelName === "BOOKING BRANCH" &&
                            this.billingData.billingBy[j].billingBranchId ===
                              branchElement.bkngBranchId
                          ) {
                            console.log('1')
                            isBranchFound = true;
                          } else if (
                            this.billingByLevelName !== "BOOKING BRANCH" &&
                            this.billingData.billingBy[j].assignBranchId ===
                              branchElement.bkngBranchId
                          ) {
                            console.log("2");
                            isBranchFound = true;
                          }
                        });
                        if (!isBranchFound) {
                          this.billingData.billingBy.splice(j, 1);
                          let temp = JSON.parse(
                            JSON.stringify(this.billingData.billingBy)
                          );
                          this.billingData.billingBy = [];
                          this.billingData.billingBy = temp;
                        }
                      }
                      console.log("AAAAA", this.billingData.billingBy);
                    } else {
                      this.tosterService.error(ob.message);
                    }
                    this.spinner.hide();
                  },
                  (error) => {
                    this.tosterService.error("Error in getting branch data");
                    console.log("error in getting branch data api");
                  }
                );
            } else {
              this.spinner.hide();
            }
          } else {
            this.spinner.hide();
          }
          if (this.billingData && this.billingData.billingCneeCnorMap) {
            this.contractservice
              .getCneeCnorData(AppSetting.msaCustId)
              .subscribe(
                (cneeCnorData) => {
                  let ob_ = ErrorConstants.validateException(cneeCnorData);
                  if (ob_.isSuccess) {
                    for (
                      var k = 0;
                      k < this.billingData.billingCneeCnorMap.length;
                      k++
                    ) {
                      this.cneeList =
                        cneeCnorData.data.referenceData.msaCneeList;
                      this.cnorList =
                        cneeCnorData.data.referenceData.msaCnorList;
                      if (this.cneeList && this.cneeList.length > 0) {
                        for (var i = 0; i < this.cneeList.length; i++) {
                          if (
                            this.billingData.billingCneeCnorMap[k].cneeId ==
                            this.cneeList[i].id
                          )
                            this.billingData.billingCneeCnorMap[
                              k
                            ].cneeName = this.cneeList[i].name;
                        }
                      }
                      if (this.cnorList && this.cnorList.length > 0) {
                        for (var j = 0; j < this.cnorList.length; j++) {
                          if (
                            this.billingData.billingCneeCnorMap[k].cnorId ==
                            this.cnorList[j].id
                          )
                            this.billingData.billingCneeCnorMap[
                              k
                            ].cnorName = this.cnorList[j].name;
                        }
                      }
                    }
                  } else {
                    this.tosterService.error(ob_.message);
                    this.spinner.hide();
                  }
                },
                (error) => {
                  console.log("error in getting cneeCnor data");
                }
              );
          }
          this.changeSubType(this.billingData.lkpBillingSubtypeId, false);
          let elelevelFound = false;
          for (let ele of this.billingByList) {
            if (ele.id == this.billingByLevelMapId) {
              elelevelFound = true;
            }
          }
          if (!elelevelFound) {
            this.billingByLevelMapId = null;
          }
        },
        (error) => {
          console.log("errrrrrrrrorrrrrr in getting billing data api");
        }
      );
  }

  loadMSABillingData(flag) {
    this.spinner.show();
    this.contractservice.getBillingByMSA(AppSetting.msaCustId).subscribe(
      (billingData) => {
        let ob = ErrorConstants.validateException(billingData);
        if (ob.isSuccess) {
          var data = billingData.data;
          console.log(data);
          console.log(this.billingData);
          var offeringId = 0;
          if (data.responseData && data.responseData.length > 0) {
            this.billingData = JSON.parse(JSON.stringify(data.responseData[0]));
            offeringId = this.billingData.lkpBillingSublevelId;
            this.msaBillingExists = !this.editflow && true;
            this.billingData.id = null;
            if (
              this.billingData &&
              this.billingData.billingOfferingMap &&
              this.billingData.billingOfferingMap.length == 1 &&
              this.selectOffering
            ) {
              this.serviceOfferingId = this.billingData.billingOfferingMap[0].serviceOfferingId;
            }
            if (this.billingData && this.billingData.billingBy) {
              this.billingByList.forEach((billingByElement) => {
                if (
                  billingByElement.id ==
                  this.billingData.billingBy[0].billingByLevelMapId
                ) {
                  this.billingByLevelMapId = billingByElement.id;
                  this.billingByLevelName = billingByElement.lookupVal;
                  if (this.billingByLevelName == "CONSOLIDATION") {
                    this.addBilling = false;
                    this.displayedColumns = [
                      "billingBranchId",
                      "submsnBranchId",
                      "collBranchId",
                      "billtoAddr",
                      "gstinNum",
                      "minBillingAmt",
                      "excludeBillingFlag",
                      "excludeBillingDt",
                      "tanNum",
                      "lkpGbCtgyId",
                      "creditRisk",
                      "mnthPotential",
                      "ebillEmail",
                      "bdmEmail",
                      "commBillEmail",
                    ];
                  } else if (this.businessType != "ANYWHERE TO ANYWHERE") {
                    this.addBilling = false;
                    if (
                      this.billingByLevelName == "DESTINATION BRANCH WISE" &&
                      this.businessType === "OUTBOUND"
                    ) {
                      this.addBilling = true;
                      this.displayedColumns = [
                        "deleteBilling",
                        "billingBranchId",
                        "submsnBranchId",
                        "collBranchId",
                        "billtoAddr",
                        "gstinNum",
                        "minBillingAmt",
                        "excludeBillingFlag",
                        "excludeBillingDt",
                        "tanNum",
                        "lkpGbCtgyId",
                        "creditRisk",
                        "mnthPotential",
                        "ebillEmail",
                        "bdmEmail",
                        "commBillEmail",
                      ];
                    } else if (
                      this.billingByLevelName == "DESTINATION BRANCH WISE" &&
                      this.businessType === "INBOUND"
                    ) {
                      this.displayedColumns = [
                        "assignBranchId",
                        "submsnBranchId",
                        "collBranchId",
                        "billtoAddr",
                        "gstinNum",
                        "minBillingAmt",
                        "excludeBillingFlag",
                        "excludeBillingDt",
                        "tanNum",
                        "lkpGbCtgyId",
                        "creditRisk",
                        "mnthPotential",
                        "ebillEmail",
                        "bdmEmail",
                        "commBillEmail",
                      ];
                    } else if (
                      this.billingByLevelName == "DESTINATION STATE WISE" &&
                      this.businessType === "INBOUND"
                    ) {
                      this.getAllStates();
                      this.displayedColumns = [
                        "assignBranchId",
                        "billingBranchId",
                        "state",
                        "submsnBranchId",
                        "collBranchId",
                        "billtoAddr",
                        "gstinNum",
                        "minBillingAmt",
                        "excludeBillingFlag",
                        "excludeBillingDt",
                        "tanNum",
                        "lkpGbCtgyId",
                        "creditRisk",
                        "mnthPotential",
                        "ebillEmail",
                        "bdmEmail",
                        "commBillEmail",
                      ];
                    } else if (
                      this.billingByLevelName == "DESTINATION STATE WISE" &&
                      this.businessType === "OUTBOUND"
                    ) {
                      this.getAllStates();
                      this.addBilling = true;
                      this.displayedColumns = [
                        "deleteBilling",
                        "billingBranchId",
                        "state",
                        "submsnBranchId",
                        "collBranchId",
                        "billtoAddr",
                        "gstinNum",
                        "minBillingAmt",
                        "excludeBillingFlag",
                        "excludeBillingDt",
                        "tanNum",
                        "lkpGbCtgyId",
                        "creditRisk",
                        "mnthPotential",
                        "ebillEmail",
                        "bdmEmail",
                        "commBillEmail",
                      ];
                    }
                  } else if (this.businessType == "ANYWHERE TO ANYWHERE") {
                    this.addBilling = true;
                    if (this.billingByLevelName == "DESTINATION BRANCH WISE") {
                      this.displayedColumns = [
                        "deleteBilling",
                        "billingBranchId",
                        "submsnBranchId",
                        "collBranchId",
                        "billtoAddr",
                        "gstinNum",
                        "minBillingAmt",
                        "excludeBillingFlag",
                        "excludeBillingDt",
                        "tanNum",
                        "lkpGbCtgyId",
                        "creditRisk",
                        "mnthPotential",
                        "ebillEmail",
                        "bdmEmail",
                        "commBillEmail",
                      ];
                    } else if (
                      this.billingByLevelName == "DESTINATION STATE WISE"
                    ) {
                      this.getAllStates();
                      this.displayedColumns = [
                        "deleteBilling",
                        "state",
                        "billingBranchId",
                        "submsnBranchId",
                        "collBranchId",
                        "billtoAddr",
                        "gstinNum",
                        "minBillingAmt",
                        "excludeBillingFlag",
                        "excludeBillingDt",
                        "tanNum",
                        "lkpGbCtgyId",
                        "creditRisk",
                        "mnthPotential",
                        "ebillEmail",
                        "bdmEmail",
                        "commBillEmail",
                      ];
                    }
                  }
                }
              });
              for (let i = 0; i < this.billingData.billingBy.length; i++) {
                this.billingData.billingBy[
                  i
                ].billtoAddrList = this.billingData.billingBy[
                  i
                ].billtoAddr.split("||");
                this.billingData.billingBy[i].id = null;
                this.billingData.billingBy[
                  i
                ].ebillemailList = this.billingData.billingBy[
                  i
                ].ebillEmail.split("||");
                this.billingData.billingBy[
                  i
                ].bdmemailList = this.billingData.billingBy[i].bdmEmail.split(
                  "||"
                );
                this.billingData.billingBy[
                  i
                ].communicationemailList = this.billingData.billingBy[
                  i
                ].commBillEmail.split("||");
                this.item = this.billingData.billingBy[i].bdmemailList[0];
              }
              this.billingData.billingBy.forEach((obj) => {
                obj.billtoAddr = obj.billtoAddrList[0];
                obj.ebillEmail = obj.ebillemailList[0];
                obj.bdmEmail = obj.bdmemailList[0];
                obj.commBillEmail = obj.communicationemailList[0];
              });
            }
            if (this.billingData && this.billingData.billingCneeCnorMap) {
              this.contractservice
                .getCneeCnorData(AppSetting.msaCustId)
                .subscribe(
                  (cneeCnorData) => {
                    let ob = ErrorConstants.validateException(cneeCnorData);
                    if (ob.isSuccess) {
                      for (
                        var k = 0;
                        k < this.billingData.billingCneeCnorMap.length;
                        k++
                      ) {
                        this.cneeList =
                          cneeCnorData.data.referenceData.msaCneeList;
                        this.cnorList =
                          cneeCnorData.data.referenceData.msaCnorList;
                        if (this.cneeList && this.cneeList.length > 0) {
                          for (var i = 0; i < this.cneeList.length; i++) {
                            if (
                              this.billingData.billingCneeCnorMap[k].cneeId ==
                              this.cneeList[i].id
                            ) {
                              this.billingData.billingCneeCnorMap[
                                k
                              ].cneeName = this.cneeList[i].name;
                              this.billingData.billingCneeCnorMap[k].id = null;
                            }
                          }
                        }
                        if (this.cnorList && this.cnorList.length > 0) {
                          for (var j = 0; j < this.cnorList.length; j++) {
                            if (
                              this.billingData.billingCneeCnorMap[k].cnorId ==
                              this.cnorList[j].id
                            ) {
                              this.billingData.billingCneeCnorMap[
                                k
                              ].cnorName = this.cnorList[j].name;
                              this.billingData.billingCneeCnorMap[k].id = null;
                            }
                          }
                        }
                      }
                    } else {
                      this.tosterService.error(ob.message);
                      this.spinner.hide();
                    }
                  },
                  (error) => {
                    console.log("error in getting cneeCnor data");
                  }
                );
            }
          } else {
            this.msaBillingExists = false;
          }
        } else {
          this.tosterService.error(ob.message);
          this.spinner.hide();
        }
        if (flag === 1) {
          this.getOpportunityDetails();
        } else {
          this.spinner.hide();
        }
        this.changeSubType(this.billingData.lkpBillingSubtypeId, false);
        let elelevelFound = false;
        for (let ele of this.billingByList) {
          if (ele.id == this.billingByLevelMapId) {
            elelevelFound = true;
          }
        }
        if (!elelevelFound) {
          this.billingByLevelMapId = null;
        }
      },
      (error) => {
        console.log("errrrrrrrrorrrrrr in getting billing data api");
        this.spinner.hide();
      }
    );
  }

  changeLevel() {
    this.saveBilling.form.markAsPristine();
    this.saveBilling.form.markAsUntouched();
    this.saveBilling.submitted = false;
    console.log(this.billingData.lkpBillingLevelId);
    this.msaBillingExists = false;
    this.addBilling = false;
    var billingLevelId = this.billingData.lkpBillingLevelId;
    this.rateCardId = null;
    this.billingLevel = "";
    this.billingByList = [];
    this.billingByLevelMapId = null;
    this.billingByLevelName = "";
    this.billingData = new billing.BillingModel();
    this.billingData.aliasName = this.customerName;
    this.billingData.lkpBillingLevelId = billingLevelId;
    this.subTypePlaceholder = "";
    this.billingLevelList.forEach((billingLevelElement) => {
      if (billingLevelElement.id == this.billingData.lkpBillingLevelId)
        this.billingLevel = billingLevelElement.lookupVal;
    });
    this.displayedColumns = [
      "billingBranchId",
      "submsnBranchId",
      "collBranchId",
      "billtoAddr",
      "gstinNum",
      "minBillingAmt",
      "excludeBillingFlag",
      "excludeBillingDt",
      "tanNum",
      "lkpGbCtgyId",
      "creditRisk",
      "mnthPotential",
      "ebillEmail",
      "bdmEmail",
      "commBillEmail",
    ];

    if (
      this.billingLevel != "" &&
      this.billingLevel == "MSA" &&
      this.businessType != "ANYWHERE TO ANYWHERE"
    ) {
      this.billingByAllList.forEach((billingByElement) => {
        if (
          billingByElement.lookupVal == "CONSOLIDATION" ||
          billingByElement.lookupVal == "DESTINATION BRANCH WISE" ||
          billingByElement.lookupVal == "DESTINATION STATE WISE"
        )
          this.billingByList.push(billingByElement);
      });
      this.loadMSABillingData(0);
      this.second.open();
    } else {
      if (this.billingLevel == "RATE CARD") {
        this.second.close();
        this.spinner.show();
        this.rateCardList = [];
        this.contractservice
          .getRateCardDetail(AppSetting.contractId, this.editflow)
          .subscribe(
            (result) => {
              let ob = ErrorConstants.validateException(result);
              if (ob.isSuccess) {
                if (result && result.data.responseData)
                  this.rateCardList = this.rateCardList.concat(
                    result.data.responseData
                  );
                this.spinner.hide();
              } else {
                this.tosterService.error(ob.message);
                this.spinner.hide();
              }
            },
            (error) => {}
          );
      } else {
        this.second.open();
      }
      this.billingByAllList.forEach((billingByElement) => {
        if (billingByElement.lookupVal != "CONSOLIDATION") {
          if (
            this.businessType == "INBOUND" &&
            billingByElement.lookupVal != "BOOKING BRANCH"
          ) {
            this.billingByList.push(billingByElement);
            console.log('1')
          } else if (this.businessType == "OUTBOUND") {
            this.billingByList.push(billingByElement);
            console.log("2");
            
          }
        }
        if (
          this.businessType == "ANYWHERE TO ANYWHERE" &&
          (billingByElement.lookupVal == "DESTINATION BRANCH WISE" ||
            billingByElement.lookupVal == "DESTINATION STATE WISE")
        ) {
          this.billingByList.push(billingByElement);
        }
      });
    }
  }

  showOffering(item) {
    console.log(item);
    if (item.lookupVal == "ALL") {
      console.log('1')
      this.selectOffering = false;
    } else {
      console.log("2");
      this.selectOffering = false;
    }
    //code to be uncommented if service needs to be activated in future
  }

  assignConnCnee(item) {
    console.log(item);
    this.spinner.show();
    this.contractservice.getCneeCnorData(AppSetting.msaCustId).subscribe(
      (cneeCnorData) => {
        console.log(cneeCnorData);
        this.cneeList = cneeCnorData.data.referenceData.msaCneeList;
        this.cnorList = cneeCnorData.data.referenceData.msaCnorList;

        if (
          this.billingData &&
          this.billingData.billingCneeCnorMap &&
          this.billingData.billingCneeCnorMap.length > 0
        ) {
          this.billingData.billingCneeCnorMap.forEach(
            (billingCneeCnorElement) => {
              if (this.cneeList && this.cneeList.length > 0) {
                for (var i = 0; i < this.cneeList.length; i++) {
                  if (billingCneeCnorElement.cneeId == this.cneeList[i].id)
                    this.cneeList[i].ischecked = true;
                }
              }
              if (this.cnorList && this.cnorList.length > 0) {
                for (var j = 0; j < this.cnorList.length; j++) {
                  if (billingCneeCnorElement.cnorId == this.cnorList[j].id)
                    this.cnorList[j].ischecked = true;
                }
              }
            }
          );
        }
        this.spinner.hide();
        const dialogCCRef = this.dialog.open(CneeCnorDialogBox, {
          disableClose: true,
          width: "126rem",
          panelClass: "creditDialog",
          data: {
            element: item,
            cneeList: this.cneeList,
            cnorList: this.cnorList,
          },
        });

        dialogCCRef.afterClosed().subscribe((result) => {
          var newBillingCneeCnorMap = [];
          var cneeCnorMap = [];
          if (result && result.element == "CONSIGNEE") {
            result.cneeList.forEach((cneeElement) => {
              if (cneeElement.ischecked == true) {
                newBillingCneeCnorMap.push({
                  cneeId: cneeElement.id,
                  cnorId: 0,
                  id: null,
                  cneeName: cneeElement.name,
                });
              }
            });
            if (
              this.billingData.billingCneeCnorMap &&
              this.billingData.billingCneeCnorMap.length > 0
            ) {
              newBillingCneeCnorMap.forEach((elementNew) => {
                var id = null;
                this.billingData.billingCneeCnorMap.forEach((cnorElement) => {
                  if (elementNew.cneeId == cnorElement.cneeId) {
                    id = cnorElement.id;
                  }
                });
                cneeCnorMap.push({
                  cneeId: elementNew.cneeId,
                  cnorId: 0,
                  id: id,
                  cneeName: elementNew.cneeName,
                });
              });
              this.billingData.billingCneeCnorMap = JSON.parse(
                JSON.stringify(cneeCnorMap)
              );
            } else {
              this.billingData.billingCneeCnorMap = JSON.parse(
                JSON.stringify(newBillingCneeCnorMap)
              );
            }
          } else if (result && result.cnorList && result.cnorList.length > 0) {
            result.cnorList.forEach((cnorElement) => {
              if (cnorElement.ischecked) {
                result.cneeList.forEach((element1) => {
                  if (element1.ischecked)
                    newBillingCneeCnorMap.push({
                      id: null,
                      cneeId: element1.id,
                      cnorId: cnorElement.id,
                      cneeName: element1.name,
                      cnorName: cnorElement.name,
                    });
                });
              }
            });

            if (
              this.billingData.billingCneeCnorMap &&
              this.billingData.billingCneeCnorMap.length > 0
            ) {
              newBillingCneeCnorMap.forEach((elementNew) => {
                var id = null;
                this.billingData.billingCneeCnorMap.forEach(
                  (billingCneeCnorElement) => {
                    if (
                      elementNew.cneeId == billingCneeCnorElement.cneeId &&
                      elementNew.cnorId == billingCneeCnorElement.cnorId
                    ) {
                      id = billingCneeCnorElement.id;
                    }
                  }
                );
                cneeCnorMap.push({
                  cneeId: elementNew.cneeId,
                  cnorId: elementNew.cnorId,
                  id: id,
                  cneeName: elementNew.cneeName,
                  cnorName: elementNew.cnorName,
                });
              });
              this.billingData.billingCneeCnorMap = JSON.parse(
                JSON.stringify(cneeCnorMap)
              );
            } else {
              this.billingData.billingCneeCnorMap = JSON.parse(
                JSON.stringify(newBillingCneeCnorMap)
              );
            }
          } else {
            this.billingData.billingCneeCnorMap = [];
          }
        });
      },
      (error) => {
        this.spinner.hide();
        console.log("Error in getting cneeCnor data.");
      }
    );
  }

  searchBillingBranch(billingBy) {
    if (this.msaBillingExists || this.billingByLevelName === "BOOKING BRANCH") {
      return;
    }
    var flag =
      this.billingByLevelName == "DESTINATION BRANCH WISE"
        ? true
        : false && this.businessType == "OUTBOUND"
        ? true
        : false;
    const billingBrDialog = this.dialog.open(BranchDialogBox, {
      disableClose: true,
      panelClass: "creditDialog",
      data: {
        branchId: billingBy.billingBranchId,
        branchName: billingBy.billingBranchName,
        hubFlag: flag,
      },
    });

    billingBrDialog.afterClosed().subscribe((result) => {
      if (result) {
        billingBy.billingBranchId = result.branchId;
        billingBy.billingBranchName = result.branchName;
      }
    });
  }

  searchSubmissionBranch(billingBy) {
    if (this.msaBillingExists) {
      return;
    }
    const billingBrDialog = this.dialog.open(BranchDialogBox, {
      disableClose: true,
      panelClass: "creditDialog",
      data: {
        branchId: billingBy.submsnBranchId,
        branchName: billingBy.submsnBranchName,
        hubFlag: false,
      },
    });

    billingBrDialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          billingBy.submsnBranchId = result.branchId;
          billingBy.submsnBranchName = result.branchName;
        }
      },
      (error) => {
        this.tosterService.info("Branch not found !");
        this.spinner.hide();
      }
    );
  }

  collectionBranchError: boolean;
  searchCollectionBranch(billingBy) {
    if (this.msaBillingExists) {
      return;
    }
    const billingBrDialog = this.dialog.open(BranchDialogBox, {
      disableClose: true,
      panelClass: "creditDialog",
      data: {
        branchId: billingBy.collBranchId,
        branchName: billingBy.collBranchName,
        hubFlag: false,
      },
    });

    billingBrDialog.afterClosed().subscribe((result) => {
      console.log(result, "The dialog was closed");
      if (result) {
        billingBy.collBranchId = result.branchId;
        billingBy.collBranchName = result.branchName;
      }
    });
  }

  getAllStates() {
    this.contractservice.getAllStates().subscribe(
      (result) => {
        let ob = ErrorConstants.validateException(result);
        if (ob.isSuccess) {
          result.data.responseData.forEach((stateElement) => {
            this.stateList.push({
              id: stateElement.id,
              lookupVal: stateElement.stateName,
              descr: stateElement.stateName,
            });
          });
        } else {
          this.tosterService.error(ob.message);
          this.spinner.hide();
        }
      },
      (error) => {
        this.tosterService.error("Error in fetching all states");
        console.log("Error in fetching all states");
      }
    );
  }

  changeBillingBy(blngByLvlId) {
    console.log(blngByLvlId);
    console.log(this.billingByAllList);
    this.billingByLevelName = "";
    this.stateList = [];
    this.billingData.billingBy = [];
    this.billingData.billingBy.push(new billing.BillingBy());
    this.billingByAllList.forEach((billingByElement) => {
      if (blngByLvlId == billingByElement.id) {
        this.billingByLevelName = billingByElement.lookupVal;
      }
    });
    if (this.billingByLevelName == "CONSOLIDATION") {
      this.billingData.billingBy = [];
      var newBillingBy = new billing.BillingBy();
      newBillingBy.billtoAddrList = this.opprAddressList;
      newBillingBy.billtoAddr = newBillingBy.billtoAddrList[0];
      this.displayedColumns = [
        "billingBranchId",
        "submsnBranchId",
        "collBranchId",
        "billtoAddr",
        "gstinNum",
        "minBillingAmt",
        "excludeBillingFlag",
        "excludeBillingDt",
        "tanNum",
        "lkpGbCtgyId",
        "creditRisk",
        "mnthPotential",
        "ebillEmail",
        "bdmEmail",
        "commBillEmail",
      ];
      this.billingData.billingBy.push(newBillingBy);
      this.addBilling = false;
    } else if (
      this.businessType === "OUTBOUND" &&
      this.billingByLevelName === "DESTINATION BRANCH WISE"
    ) {
      this.addBilling = true;
      this.displayedColumns = [
        "deleteBilling",
        "billingBranchId",
        "submsnBranchId",
        "collBranchId",
        "billtoAddr",
        "gstinNum",
        "minBillingAmt",
        "excludeBillingFlag",
        "excludeBillingDt",
        "tanNum",
        "lkpGbCtgyId",
        "creditRisk",
        "mnthPotential",
        "ebillEmail",
        "bdmEmail",
        "commBillEmail",
      ];
      this.billingData.billingBy = [];
      var newBillingBy = new billing.BillingBy();
      newBillingBy.billtoAddrList = this.opprAddressList;
      newBillingBy.billtoAddr = newBillingBy.billtoAddrList[0];
      this.billingData.billingBy.push(newBillingBy);
    } else if (
      this.businessType === "OUTBOUND" &&
      this.billingByLevelName === "DESTINATION STATE WISE"
    ) {
      this.addBilling = true;
      this.getAllStates();
      this.displayedColumns = [
        "deleteBilling",
        "billingBranchId",
        "state",
        "submsnBranchId",
        "collBranchId",
        "billtoAddr",
        "gstinNum",
        "minBillingAmt",
        "excludeBillingFlag",
        "excludeBillingDt",
        "tanNum",
        "lkpGbCtgyId",
        "creditRisk",
        "mnthPotential",
        "ebillEmail",
        "bdmEmail",
        "commBillEmail",
      ];
      this.billingData.billingBy = [];
      var newBillingBy = new billing.BillingBy();
      newBillingBy.billtoAddrList = this.opprAddressList;
      newBillingBy.billtoAddr = newBillingBy.billtoAddrList[0];
      this.billingData.billingBy.push(newBillingBy);
    } else if (this.businessType != "ANYWHERE TO ANYWHERE") {
      this.addBilling = false;
      this.contractservice
        .getAssignBranchDetailByCntr(
          AppSetting.contractId,
          this.editflow,
          this.billingLevel
        )
        .subscribe(
          (result) => {
            let ob = ErrorConstants.validateException(result);
            if (ob.isSuccess) {
              this.billingData.billingBy = [];
              let map = new Map();
              if (result.data.responseData.length == 0) {
                this.tosterService.warning(
                  "No Assign branch found for this contract. Kindly create atleast one branch to use " +
                    this.billingByLevelName +
                    " as billing By"
                );
              }
              result.data.responseData.forEach((brnchResult) => {
                var newBillingBy = new billing.BillingBy();
                newBillingBy.billtoAddrList = this.opprAddressList;
                newBillingBy.billtoAddr = newBillingBy.billtoAddrList[0];
                if (this.billingLevel == "RATE CARD") {
                  console.log(this.rateCardId, brnchResult.ratecardId);
                  if (this.rateCardId == brnchResult.ratecardId) {
                    if (this.billingByLevelName == "BOOKING BRANCH") {
                      newBillingBy.billingBranchId = brnchResult.bkngBranchId;
                      newBillingBy.billingBranchName =
                        brnchResult.bkngBranchName;
                      newBillingBy.assignBranchName =
                        brnchResult.bkngBranchName;
                      this.displayedColumns = [
                        "billingBranchId",
                        "submsnBranchId",
                        "collBranchId",
                        "billtoAddr",
                        "gstinNum",
                        "minBillingAmt",
                        "excludeBillingFlag",
                        "excludeBillingDt",
                        "tanNum",
                        "lkpGbCtgyId",
                        "creditRisk",
                        "mnthPotential",
                        "ebillEmail",
                        "bdmEmail",
                        "commBillEmail",
                      ];
                    } else if (
                      this.billingByLevelName == "SUBMISSION BRANCH" ||
                      this.billingByLevelName == "COLLECTION BRANCH"
                    ) {
                      console.log('1')
                      newBillingBy.assignBranchId = brnchResult.bkngBranchId;
                      newBillingBy.assignBranchName =
                        brnchResult.bkngBranchName;
                      this.displayedColumns = [
                        "assignBranchId",
                        "submsnBranchId",
                        "collBranchId",
                        "billtoAddr",
                        "gstinNum",
                        "minBillingAmt",
                        "excludeBillingFlag",
                        "excludeBillingDt",
                        "tanNum",
                        "lkpGbCtgyId",
                        "creditRisk",
                        "mnthPotential",
                        "ebillEmail",
                        "bdmEmail",
                        "commBillEmail",
                      ];
                    } else if (
                      this.billingByLevelName == "DESTINATION BRANCH WISE" &&
                      this.businessType === "INBOUND"
                    ) {
                      console.log("2");
                      newBillingBy.assignBranchId = brnchResult.bkngBranchId;
                      newBillingBy.assignBranchName =
                        brnchResult.bkngBranchName;
                      this.displayedColumns = [
                        "assignBranchId",
                        "submsnBranchId",
                        "collBranchId",
                        "billtoAddr",
                        "gstinNum",
                        "minBillingAmt",
                        "excludeBillingFlag",
                        "excludeBillingDt",
                        "tanNum",
                        "lkpGbCtgyId",
                        "creditRisk",
                        "mnthPotential",
                        "ebillEmail",
                        "bdmEmail",
                        "commBillEmail",
                      ];
                    } else if (
                      this.billingByLevelName == "DESTINATION STATE WISE"
                    ) {
                      this.getAllStates();
                      newBillingBy.assignBranchId = brnchResult.bkngBranchId;
                      newBillingBy.assignBranchName =
                        brnchResult.bkngBranchName;
                      this.displayedColumns = [
                        "assignBranchId",
                        "billingBranchId",
                        "state",
                        "submsnBranchId",
                        "collBranchId",
                        "billtoAddr",
                        "gstinNum",
                        "minBillingAmt",
                        "excludeBillingFlag",
                        "excludeBillingDt",
                        "tanNum",
                        "lkpGbCtgyId",
                        "creditRisk",
                        "mnthPotential",
                        "ebillEmail",
                        "bdmEmail",
                        "commBillEmail",
                      ];
                    }
                    map.set(newBillingBy.assignBranchName, newBillingBy);
                  }
                } else {
                  if (this.billingByLevelName == "BOOKING BRANCH") {
                    newBillingBy.billingBranchId = brnchResult.bkngBranchId;
                    newBillingBy.billingBranchName = brnchResult.bkngBranchName;
                    newBillingBy.assignBranchName = brnchResult.bkngBranchName;
                    this.displayedColumns = [
                      "billingBranchId",
                      "submsnBranchId",
                      "collBranchId",
                      "billtoAddr",
                      "gstinNum",
                      "minBillingAmt",
                      "excludeBillingFlag",
                      "excludeBillingDt",
                      "tanNum",
                      "lkpGbCtgyId",
                      "creditRisk",
                      "mnthPotential",
                      "ebillEmail",
                      "bdmEmail",
                      "commBillEmail",
                    ];
                  } else if (
                    this.billingByLevelName == "SUBMISSION BRANCH" ||
                    this.billingByLevelName == "COLLECTION BRANCH"
                  ) {
                    newBillingBy.assignBranchId = brnchResult.bkngBranchId;
                    newBillingBy.assignBranchName = brnchResult.bkngBranchName;
                    this.displayedColumns = [
                      "assignBranchId",
                      "submsnBranchId",
                      "collBranchId",
                      "billtoAddr",
                      "gstinNum",
                      "minBillingAmt",
                      "excludeBillingFlag",
                      "excludeBillingDt",
                      "tanNum",
                      "lkpGbCtgyId",
                      "creditRisk",
                      "mnthPotential",
                      "ebillEmail",
                      "bdmEmail",
                      "commBillEmail",
                    ];
                  } else if (
                    this.billingByLevelName == "DESTINATION BRANCH WISE" &&
                    this.businessType === "INBOUND"
                  ) {
                    newBillingBy.assignBranchId = brnchResult.bkngBranchId;
                    newBillingBy.assignBranchName = brnchResult.bkngBranchName;
                    this.displayedColumns = [
                      "assignBranchId",
                      "submsnBranchId",
                      "collBranchId",
                      "billtoAddr",
                      "gstinNum",
                      "minBillingAmt",
                      "excludeBillingFlag",
                      "excludeBillingDt",
                      "tanNum",
                      "lkpGbCtgyId",
                      "creditRisk",
                      "mnthPotential",
                      "ebillEmail",
                      "bdmEmail",
                      "commBillEmail",
                    ];
                  } else if (
                    this.billingByLevelName == "DESTINATION STATE WISE"
                  ) {
                    this.getAllStates();
                    newBillingBy.assignBranchId = brnchResult.bkngBranchId;
                    newBillingBy.assignBranchName = brnchResult.bkngBranchName;
                    this.displayedColumns = [
                      "assignBranchId",
                      "billingBranchId",
                      "state",
                      "submsnBranchId",
                      "collBranchId",
                      "billtoAddr",
                      "gstinNum",
                      "minBillingAmt",
                      "excludeBillingFlag",
                      "excludeBillingDt",
                      "tanNum",
                      "lkpGbCtgyId",
                      "creditRisk",
                      "mnthPotential",
                      "ebillEmail",
                      "bdmEmail",
                      "commBillEmail",
                    ];
                  }
                  map.set(newBillingBy.assignBranchName, newBillingBy);
                }
              });
              map.forEach((data) => {
                console.log(data);
                this.billingData.billingBy.push(data);
              });
              console.log(this.billingData.billingBy);
            } else {
              this.tosterService.error(ob.message);
              this.spinner.hide();
            }
          },
          (error) => {
            this.tosterService.error("Error in getting assign branch data");
          }
        );
      this.addBilling = false;
    } else if (this.businessType == "ANYWHERE TO ANYWHERE") {
      this.addBilling = true;
      this.billingData.billingBy = [];
      var newBillingBy = new billing.BillingBy();
      newBillingBy.billtoAddrList = this.opprAddressList;
      newBillingBy.billtoAddr = newBillingBy.billtoAddrList[0];
      this.billingData.billingBy.push(newBillingBy);
      if (this.billingByLevelName == "DESTINATION BRANCH WISE") {
        this.displayedColumns = [
          "deleteBilling",
          "billingBranchId",
          "submsnBranchId",
          "collBranchId",
          "billtoAddr",
          "gstinNum",
          "minBillingAmt",
          "excludeBillingFlag",
          "excludeBillingDt",
          "tanNum",
          "lkpGbCtgyId",
          "creditRisk",
          "mnthPotential",
          "ebillEmail",
          "bdmEmail",
          "commBillEmail",
        ];
      } else if (this.billingByLevelName == "DESTINATION STATE WISE") {
        this.getAllStates();
        this.displayedColumns = [
          "deleteBilling",
          "state",
          "billingBranchId",
          "submsnBranchId",
          "collBranchId",
          "billtoAddr",
          "gstinNum",
          "minBillingAmt",
          "excludeBillingFlag",
          "excludeBillingDt",
          "tanNum",
          "lkpGbCtgyId",
          "creditRisk",
          "mnthPotential",
          "ebillEmail",
          "bdmEmail",
          "commBillEmail",
        ];
      }
    }
  }

  postBillingData(nextKey) {
    this.spinner.show();
    if (!this.billingData.todFlag) {
      this.billingData.todAmt = null;
      this.billingData.lkpTodBasedOnId = null;
    }
    console.log(nextKey, this.billingData);
    this.billingData.contractId = AppSetting.contractId;
    if (this.billingLevel == "MSA")
      this.billingData.entityId = AppSetting.msaCustId;
    if (this.billingLevel == "SFX")
      this.billingData.entityId = AppSetting.contractId;
    if (this.billingLevel == "RATE CARD" && this.billingData.entityId === 0)
      this.billingData.entityId = this.rateCardId;
    var stateLevelId = 0;
    this.billingByAllList.forEach((billingByElement) => {
      if (billingByElement.lookupVal.includes("STATE"))
        stateLevelId = billingByElement.id;
    });

    if (this.billingData.cneeCnorFlag === 0) {
      this.billingData.cneeCnorBillingCateg = null;
      this.billingData.billingCneeCnorMap = [];
    }

    for (var i = 0; i < this.billingData.billingBy.length; i++) {
      this.billingData.billingBy[i].excludeBillingDt =
        this.billingData.billingBy[i].excludeBillingFlag == 0
          ? null
          : this.billingData.billingBy[i].excludeBillingDt;
      this.billingData.billingBy[i].gstinNum =
        this.billingData.gstinRegdFlag == 0
          ? null
          : this.billingData.billingBy[i].gstinNum.toUpperCase();
      this.billingData.billingBy[i].billtoAddr = this.billingData.billingBy[
        i
      ].billtoAddrList.join("||");
      this.billingData.billingBy[i].ebillEmail = this.billingData.billingBy[
        i
      ].ebillemailList.join("||");
      this.billingData.billingBy[i].bdmEmail = this.billingData.billingBy[
        i
      ].bdmemailList.join("||");
      this.billingData.billingBy[i].commBillEmail = this.billingData.billingBy[
        i
      ].communicationemailList.join("||");
      if (!this.billingData.billingBy[i].tanNum) {
        this.billingData.billingBy[i].tanNum = null;
      } else {
        this.billingData.billingBy[i].tanNum = this.billingData.billingBy[
          i
        ].tanNum.toUpperCase();
      }
      console.log(
        this.billingData.billingBy[i].excludeBillingDt,
        "print maial updated"
      );

      this.billingData.billingBy[
        i
      ].billingByLevelMapId = this.billingByLevelMapId;
      if (this.billingByLevelMapId != stateLevelId) {
        this.billingData.billingBy[i].stateId = null;
        if (
          this.billingByLevelName == "BOOKING BRANCH" &&
          this.businessType != "ANYWHERE TO ANYWHERE"
        ) {
          this.billingData.billingBy[
            i
          ].assignBranchId = this.billingData.billingBy[i].billingBranchId;
          this.billingData.billingBy[
            i
          ].assignBranchName = this.billingData.billingBy[i].billingBranchName;
        } else if (
          this.billingByLevelName == "SUBMISSION BRANCH" &&
          this.businessType != "ANYWHERE TO ANYWHERE"
        ) {
          this.billingData.billingBy[
            i
          ].billingBranchId = this.billingData.billingBy[i].submsnBranchId;
          this.billingData.billingBy[
            i
          ].billingBranchName = this.billingData.billingBy[i].submsnBranchName;
        } else if (
          this.billingByLevelName == "COLLECTION BRANCH" &&
          this.businessType != "ANYWHERE TO ANYWHERE"
        ) {
          this.billingData.billingBy[
            i
          ].billingBranchId = this.billingData.billingBy[i].collBranchId;
          this.billingData.billingBy[
            i
          ].billingBranchName = this.billingData.billingBy[i].collBranchName;
        } else if (
          this.billingByLevelName == "DESTINATION BRANCH WISE" &&
          this.businessType == "ANYWHERE TO ANYWHERE"
        ) {
          this.billingData.billingBy[
            i
          ].assignBranchId = this.billingData.billingBy[i].billingBranchId;
          this.billingData.billingBy[
            i
          ].assignBranchName = this.billingData.billingBy[i].billingBranchName;
        } else if (
          this.billingByLevelName == "COLLECTION BRANCH" &&
          this.businessType == "ANYWHERE TO ANYWHERE"
        ) {
          this.billingData.billingBy[
            i
          ].assignBranchId = this.billingData.billingBy[i].collBranchId;
          this.billingData.billingBy[
            i
          ].assignBranchName = this.billingData.billingBy[i].collBranchName;
          this.billingData.billingBy[
            i
          ].billingBranchId = this.billingData.billingBy[i].collBranchId;
          this.billingData.billingBy[
            i
          ].billingBranchName = this.billingData.billingBy[i].collBranchName;
        } else if (
          this.billingByLevelName == "SUBMISSION BRANCH" &&
          this.businessType == "ANYWHERE TO ANYWHERE"
        ) {
          console.log('1')
          this.billingData.billingBy[
            i
          ].assignBranchId = this.billingData.billingBy[i].submsnBranchId;
          this.billingData.billingBy[
            i
          ].assignBranchName = this.billingData.billingBy[i].submsnBranchName;
          this.billingData.billingBy[
            i
          ].billingBranchId = this.billingData.billingBy[i].submsnBranchId;
          this.billingData.billingBy[
            i
          ].billingBranchName = this.billingData.billingBy[i].submsnBranchName;
        } else if (
          this.billingByLevelName == "DESTINATION BRANCH WISE" &&
          this.businessType === "OUTBOUND"
        ) {
          this.billingData.billingBy[
            i
          ].assignBranchId = this.billingData.billingBy[i].billingBranchId;
          this.billingData.billingBy[
            i
          ].assignBranchName = this.billingData.billingBy[i].billingBranchName;
        } else if (
          this.billingByLevelName == "DESTINATION BRANCH WISE" &&
          this.businessType != "ANYWHERE TO ANYWHERE"
        ) {
          console.log("2");
          if (
            !(this.billingLevel === "MSA" && this.businessType === "OUTBOUND")
          ) {
            this.billingData.billingBy[
              i
            ].billingBranchId = this.billingData.billingBy[i].assignBranchId;
            this.billingData.billingBy[
              i
            ].billingBranchName = this.billingData.billingBy[
              i
            ].assignBranchName;
          }
        }
      } else if (
        this.billingByLevelName == "DESTINATION STATE WISE" &&
        this.businessType === "OUTBOUND"
      ) {
        this.billingData.billingBy[
          i
        ].assignBranchId = this.billingData.billingBy[i].billingBranchId;
        this.billingData.billingBy[
          i
        ].assignBranchName = this.billingData.billingBy[i].billingBranchName;
      }
    }

    if (this.selectOffering) {
      if (
        !(
          this.billingData.billingOfferingMap &&
          this.billingData.billingOfferingMap.length > 0 &&
          this.billingData.billingOfferingMap[0].serviceOfferingId > 0 &&
          this.billingData.billingOfferingMap[0].serviceOfferingId ==
            this.serviceOfferingId
        )
      ) {
        this.billingData.billingOfferingMap = [];
        this.billingData.billingOfferingMap.push({
          id: null,
          serviceOfferingId: this.serviceOfferingId,
          status: null,
        });
      }
    } else {
      if (
        this.billingData.billingOfferingMap &&
        this.billingData.billingOfferingMap.length > 0 &&
        this.billingData.billingOfferingMap[0].serviceOfferingId > 0
      ) {
        var existingOfferingList = JSON.parse(
          JSON.stringify(this.billingData.billingOfferingMap)
        );
        existingOfferingList.forEach((offeringElement) => {
          var exists = false;
          this.billingOfferingList.forEach((element1) => {
            if (
              offeringElement.serviceOfferingId == element1.serviceOfferingId
            ) {
              exists = true;
            }
          });
          if (!exists) {
            this.billingData.billingOfferingMap.push({
              id: null,
              serviceOfferingId: offeringElement.serviceOfferingId,
              status: null,
            });
          }
        });
      } else {
        this.billingData.billingOfferingMap = [];
        this.billingOfferingList.forEach((billingOfferingElement) => {
          this.billingData.billingOfferingMap.push({
            id: null,
            serviceOfferingId: billingOfferingElement.serviceOfferingId,
            status: null,
          });
        });
      }
    }
    this.billingData = this.deactivateOrphanChild(this.billingData);
    this.contractservice
      .postBillingData(this.billingData, this.editflow)
      .subscribe(
        (result) => {
          let ob = ErrorConstants.validateException(result);
          if (ob.isSuccess) {
            console.log("result", result);
            this.tosterService.success("Saved Successfully");
            if (nextKey == 1) {
              if (this.billingLevel === "RATE CARD") {
                this.contractservice
                  .validateBilling(AppSetting.contractId, this.editflow)
                  .subscribe((validateResult) => {
                    let validationMessages = "";
                    if (validateResult.data.responseData) {
                      validationMessages = JSON.stringify(
                        validateResult.data.responseData
                      );
                      validationMessages = validationMessages
                        .replace("{", "")
                        .replace("}", "");
                      validationMessages = validationMessages
                        .replace("[", "")
                        .replace("]", "");
                      validationMessages = validationMessages.replace('":', "");
                      validationMessages = validationMessages.replace('"', "");
                    }
                    if (validationMessages && validationMessages != "") {
                      this.tosterService.error(validationMessages);
                      this.ngOnInit();
                    } else {
                      this.spinner.hide();
                      if (this.editflow) {
                        this.router.navigate(
                          [
                            "/contract/documentupload",
                            { steper: true, editflow: "true" },
                          ],
                          { skipLocationChange: true }
                        );
                      } else {
                        this.router.navigate(["/contract/documentupload"], {
                          skipLocationChange: true,
                        });
                      }
                    }
                  });
              } else {
                this.spinner.hide();
                if (this.editflow) {
                  this.router.navigate(
                    [
                      "/contract/documentupload",
                      { steper: true, editflow: "true" },
                    ],
                    { skipLocationChange: true }
                  );
                } else {
                  this.router.navigate(["/contract/documentupload"], {
                    skipLocationChange: true,
                  });
                }
              }
            } else {
              this.ngOnInit();
            }
          } else {
            this.tosterService.error(ob.message);
            this.spinner.hide();
          }
        },
        (error) => {
          this.spinner.hide();
          this.tosterService.error("Error in adding billing", error);
        }
      );
  }

  addBillingBy() {
    var newBillingBy = new billing.BillingBy();
    newBillingBy.billtoAddrList = this.opprAddressList;
    newBillingBy.billtoAddr = newBillingBy.billtoAddrList[0];
    this.billingData.billingBy = this.billingData.billingBy.concat(
      newBillingBy
    );
    console.log(this.billingData.billingBy);
  }
  deleteBillingBy(i) {
    this.billingData.billingBy.splice(i, 1);
    let temp = JSON.parse(JSON.stringify(this.billingData.billingBy));
    this.billingData.billingBy = [];
    this.billingData.billingBy = temp;
  }

  loadRateCard(rateCardId) {
    console.log(rateCardId);
    this.saveBilling.form.markAsPristine();
    this.saveBilling.form.markAsUntouched();
    this.saveBilling.submitted = false;
    this.spinner.show();
    var offeringId = 0;
    this.rateCardId = rateCardId;
    let rateCardExists = false;
    var billingLevel = this.billingData.lkpBillingLevelId;
    this.subTypePlaceholder = "";

    if (this.allBillingData) {
      this.allBillingData.forEach((allBillingElement) => {
        if (
          allBillingElement.entityId == rateCardId &&
          allBillingElement.lkpBillingLevelId ==
            this.billingData.lkpBillingLevelId
        ) {
          Object.assign(this.billingData, allBillingElement);
          rateCardExists = true;
          for (let i = 0; i < this.billingData.billingBy.length; i++) {
            this.billingData.billingBy[
              i
            ].billtoAddrList = this.billingData.billingBy[i].billtoAddr.split(
              "||"
            );
            this.billingData.billingBy[
              i
            ].ebillemailList = this.billingData.billingBy[i].ebillEmail.split(
              "||"
            );
            this.billingData.billingBy[
              i
            ].bdmemailList = this.billingData.billingBy[i].bdmEmail.split("||");
            this.billingData.billingBy[
              i
            ].communicationemailList = this.billingData.billingBy[
              i
            ].commBillEmail.split("||");
            if (
              this.billingData.billingBy[i].ebillemailList &&
              this.billingData.billingBy[i].ebillemailList.length > 0
            ) {
              this.billingData.billingBy[
                i
              ].ebillEmail = this.billingData.billingBy[i].ebillemailList[0];
            }
            if (
              this.billingData.billingBy[i].billtoAddrList &&
              this.billingData.billingBy[i].billtoAddrList.length > 0
            ) {
              this.billingData.billingBy[
                i
              ].billtoAddr = this.billingData.billingBy[i].billtoAddrList[0];
            }
            if (
              this.billingData.billingBy[i].bdmemailList &&
              this.billingData.billingBy[i].bdmemailList.length > 0
            ) {
              this.billingData.billingBy[
                i
              ].bdmEmail = this.billingData.billingBy[i].bdmemailList[0];
            }
            if (
              this.billingData.billingBy[i].communicationemailList &&
              this.billingData.billingBy[i].communicationemailList.length > 0
            ) {
              this.billingData.billingBy[
                i
              ].commBillEmail = this.billingData.billingBy[
                i
              ].communicationemailList[0];
            }
          }
        }
        this.changeSubType(this.billingData.lkpBillingSubtypeId, false);
        let elelevelFound = false;
        for (let ele of this.billingByList) {
          if (ele.id == this.billingByLevelMapId) {
            elelevelFound = true;
          }
        }
        if (!elelevelFound) {
          this.billingByLevelMapId = null;
        }
      });

      if (rateCardExists) {
        this.billingByList.forEach((billingByElement) => {
          if (
            billingByElement.id ==
            this.billingData.billingBy[0].billingByLevelMapId
          ) {
            this.billingByLevelMapId = billingByElement.id;
            this.billingByLevelName = billingByElement.lookupVal;
          }
        });
        if (this.businessType === "ANYWHERE TO ANYWHERE") {
          if (this.billingByLevelName == "DESTINATION BRANCH WISE") {
            this.displayedColumns = [
              "billingBranchId",
              "submsnBranchId",
              "collBranchId",
              "billtoAddr",
              "gstinNum",
              "minBillingAmt",
              "excludeBillingFlag",
              "excludeBillingDt",
              "tanNum",
              "lkpGbCtgyId",
              "creditRisk",
              "mnthPotential",
              "ebillEmail",
              "bdmEmail",
              "commBillEmail",
            ];
          } else if (this.billingByLevelName == "DESTINATION STATE WISE") {
            this.getAllStates();
            this.displayedColumns = [
              "state",
              "billingBranchId",
              "submsnBranchId",
              "collBranchId",
              "billtoAddr",
              "gstinNum",
              "minBillingAmt",
              "excludeBillingFlag",
              "excludeBillingDt",
              "tanNum",
              "lkpGbCtgyId",
              "creditRisk",
              "mnthPotential",
              "ebillEmail",
              "bdmEmail",
              "commBillEmail",
            ];
          }
        } else {
          if (this.billingByLevelName == "BOOKING BRANCH") {
            this.displayedColumns = [
              "billingBranchId",
              "submsnBranchId",
              "collBranchId",
              "billtoAddr",
              "gstinNum",
              "minBillingAmt",
              "excludeBillingFlag",
              "excludeBillingDt",
              "tanNum",
              "lkpGbCtgyId",
              "creditRisk",
              "mnthPotential",
              "ebillEmail",
              "bdmEmail",
              "commBillEmail",
            ];
          } else if (
            this.billingByLevelName == "SUBMISSION BRANCH" ||
            this.billingByLevelName == "COLLECTION BRANCH"
          ) {
            this.displayedColumns = [
              "assignBranchId",
              "submsnBranchId",
              "collBranchId",
              "billtoAddr",
              "gstinNum",
              "minBillingAmt",
              "excludeBillingFlag",
              "excludeBillingDt",
              "tanNum",
              "lkpGbCtgyId",
              "creditRisk",
              "mnthPotential",
              "ebillEmail",
              "bdmEmail",
              "commBillEmail",
            ];
          } else if (
            this.billingByLevelName == "DESTINATION BRANCH WISE" &&
            this.businessType == "OUTBOUND"
          ) {
            this.displayedColumns = [
              "deleteBilling",
              "billingBranchId",
              "submsnBranchId",
              "collBranchId",
              "billtoAddr",
              "gstinNum",
              "minBillingAmt",
              "excludeBillingFlag",
              "excludeBillingDt",
              "tanNum",
              "lkpGbCtgyId",
              "creditRisk",
              "mnthPotential",
              "ebillEmail",
              "bdmEmail",
              "commBillEmail",
            ];
          } else if (
            this.billingByLevelName == "DESTINATION BRANCH WISE" &&
            this.businessType === "INBOUND"
          ) {
            this.displayedColumns = [
              "assignBranchId",
              "submsnBranchId",
              "collBranchId",
              "billtoAddr",
              "gstinNum",
              "minBillingAmt",
              "excludeBillingFlag",
              "excludeBillingDt",
              "tanNum",
              "lkpGbCtgyId",
              "creditRisk",
              "mnthPotential",
              "ebillEmail",
              "bdmEmail",
              "commBillEmail",
            ];
          } else if (
            this.billingByLevelName == "DESTINATION STATE WISE" &&
            this.businessType === "OUTBOUND"
          ) {
            this.getAllStates();
            this.displayedColumns = [
              "deleteBilling",
              "billingBranchId",
              "state",
              "submsnBranchId",
              "collBranchId",
              "billtoAddr",
              "gstinNum",
              "minBillingAmt",
              "excludeBillingFlag",
              "excludeBillingDt",
              "tanNum",
              "lkpGbCtgyId",
              "creditRisk",
              "mnthPotential",
              "ebillEmail",
              "bdmEmail",
              "commBillEmail",
            ];
          } else if (
            this.billingByLevelName == "DESTINATION STATE WISE" &&
            this.businessType === "INBOUND"
          ) {
            this.getAllStates();
            this.displayedColumns = [
              "assignBranchId",
              "billingBranchId",
              "state",
              "submsnBranchId",
              "collBranchId",
              "billtoAddr",
              "gstinNum",
              "minBillingAmt",
              "excludeBillingFlag",
              "excludeBillingDt",
              "tanNum",
              "lkpGbCtgyId",
              "creditRisk",
              "mnthPotential",
              "ebillEmail",
              "bdmEmail",
              "commBillEmail",
            ];
          }
        }

        if (this.billingData && this.billingData.billingCneeCnorMap) {
          this.contractservice.getCneeCnorData(AppSetting.msaCustId).subscribe(
            (cneeCnorData) => {
              let ob = ErrorConstants.validateException(cneeCnorData);
              if (ob.isSuccess) {
                for (
                  let k = 0;
                  k < this.billingData.billingCneeCnorMap.length;
                  k++
                ) {
                  this.cneeList = cneeCnorData.data.referenceData.msaCneeList;
                  this.cnorList = cneeCnorData.data.referenceData.msaCnorList;
                  if (this.cneeList && this.cneeList.length > 0) {
                    for (let i = 0; i < this.cneeList.length; i++) {
                      if (
                        this.billingData.billingCneeCnorMap[k].cneeId ==
                        this.cneeList[i].id
                      ) {
                        this.billingData.billingCneeCnorMap[
                          k
                        ].cneeName = this.cneeList[i].name;
                      }
                    }
                  }
                  if (this.cnorList && this.cnorList.length > 0) {
                    for (let j = 0; j < this.cnorList.length; j++) {
                      if (
                        this.billingData.billingCneeCnorMap[k].cnorId ==
                        this.cnorList[j].id
                      ) {
                        this.billingData.billingCneeCnorMap[
                          k
                        ].cnorName = this.cnorList[j].name;
                      }
                    }
                  }
                }
              } else {
                this.tosterService.error(ob.message);
                this.spinner.hide();
              }
            },
            (error) => {
              console.log("error in getting cneeCnor data");
            }
          );
        }
      }

      if (
        rateCardExists &&
        this.businessType !== "ANYWHERE TO ANYWHERE" &&
        this.billingByLevelName !== "CONSOLIDATION" &&
        !(
          this.businessType === "OUTBOUND" &&
          this.billingByLevelName === "DESTINATION STATE WISE"
        ) &&
        !(
          this.businessType === "OUTBOUND" &&
          this.billingByLevelName === "DESTINATION BRANCH WISE"
        )
      ) {
        this.contractservice
          .getAssignBranchDetailByCntr(
            AppSetting.contractId,
            this.editflow,
            this.billingLevel
          )
          .subscribe(
            (result) => {
              let ob = ErrorConstants.validateException(result);
              if (ob.isSuccess) {
                let branchData = JSON.parse(
                  JSON.stringify(result.data.responseData)
                );
                let branchToBillMap = new Map();
                let billToBranchMap = new Map();
                branchData
                  .filter(
                    (filterData) => this.rateCardId === filterData.ratecardId
                  )
                  .forEach((branchElement) => {
                    let newBillingBy = new billing.BillingBy();
                    newBillingBy.billtoAddrList = this.opprAddressList;
                    newBillingBy.billtoAddr = newBillingBy.billtoAddrList[0];
                    var exist = false;
                    this.billingData.billingBy.forEach((obj) => {
                      if (
                        this.billingByLevelName === "BOOKING BRANCH" &&
                        obj.billingBranchId === branchElement.bkngBranchId
                      ) {
                        console.log('1');
                        exist = true;
                      } else if (                        
                        this.billingByLevelName !== "BOOKING BRANCH" &&
                        obj.assignBranchId === branchElement.bkngBranchId
                      ) {
                        console.log("2");
                        exist = true;
                      }
                    });
                    if (!exist) {
                      if (this.billingByLevelName === "BOOKING BRANCH") {
                        newBillingBy.billingBranchId =
                          branchElement.bkngBranchId;
                        newBillingBy.billingBranchName =
                          branchElement.bkngBranchName;
                        newBillingBy.assignBranchName =
                          branchElement.bkngBranchName;
                      } else {
                        newBillingBy.assignBranchId =
                          branchElement.bkngBranchId;
                        newBillingBy.assignBranchName =
                          branchElement.bkngBranchName;
                      }
                      branchToBillMap.set(
                        newBillingBy.assignBranchName,
                        newBillingBy
                      );
                    }
                  });

                for (
                  let index = 0;
                  index < this.billingData.billingBy.length;
                  index++
                ) {
                  const obj = this.billingData.billingBy[index];
                  let newBillingBy = new billing.BillingBy();
                  var exists = false;
                  newBillingBy.billtoAddrList = this.opprAddressList;
                  newBillingBy.billtoAddr = newBillingBy.billtoAddrList[0];
                  branchData
                    .filter(
                      (filterData) => this.rateCardId === filterData.ratecardId
                    )
                    .forEach((elementData) => {
                      if (
                        this.billingByLevelName === "BOOKING BRANCH" &&
                        obj.billingBranchId === elementData.bkngBranchId
                      ) {
                        exists = true;
                      } else if (
                        this.billingByLevelName !== "BOOKING BRANCH" &&
                        obj.assignBranchId === elementData.bkngBranchId
                      ) {
                        exists = true;
                      }
                    });
                  if (!exists) {
                    if (this.billingByLevelName === "BOOKING BRANCH") {
                      newBillingBy.billingBranchId = obj.assignBranchId;
                      newBillingBy.billingBranchName = obj.assignBranchName;
                      newBillingBy.assignBranchName = obj.assignBranchName;
                    } else {
                      newBillingBy.assignBranchId = obj.assignBranchId;
                      newBillingBy.assignBranchName = obj.assignBranchName;
                    }
                    billToBranchMap.set(newBillingBy.assignBranchName, index);
                  }
                }
                if (billToBranchMap.size > 0 && branchToBillMap.size > 0) {
                  let billingIndexList = Array.from(billToBranchMap.values());
                  let brnchBillData = Array.from(branchToBillMap.values());

                  for (let j = 0; j < billingIndexList.length; j++) {
                    this.billingData.billingBy[
                      billingIndexList[j]
                    ].assignBranchId = brnchBillData[j].assignBranchId;
                    this.billingData.billingBy[
                      billingIndexList[j]
                    ].billingBranchId = brnchBillData[j].billingBranchId;
                    this.billingData.billingBy[
                      billingIndexList[j]
                    ].assignBranchName = brnchBillData[j].assignBranchName;
                    this.billingData.billingBy[
                      billingIndexList[j]
                    ].billingBranchName = brnchBillData[j].billingBranchName;
                  }

                  if (billingIndexList.length !== brnchBillData.length) {
                    for (
                      let i = billingIndexList.length;
                      i < brnchBillData.length;
                      i++
                    ) {
                      this.billingData.billingBy = this.billingData.billingBy.concat(
                        brnchBillData[i]
                      );
                    }
                  }
                } else if (branchToBillMap.size > 0) {
                  branchToBillMap.forEach((elementData) => {
                    this.billingData.billingBy = this.billingData.billingBy.concat(
                      elementData
                    );
                  });
                }
                let isBranchFound = false;
                for (let j = 0; j < this.billingData.billingBy.length; j++) {
                  isBranchFound = false;
                  branchData
                    .filter(
                      (filterData) => this.rateCardId === filterData.ratecardId
                    )
                    .forEach((branchElement) => {
                      if (
                        this.billingByLevelName === "BOOKING BRANCH" &&
                        this.billingData.billingBy[j].billingBranchId ===
                          branchElement.bkngBranchId
                      ) {
                        isBranchFound = true;
                      } else if (
                        this.billingByLevelName !== "BOOKING BRANCH" &&
                        this.billingData.billingBy[j].assignBranchId ===
                          branchElement.bkngBranchId
                      ) {
                        isBranchFound = true;
                      }
                    });
                  if (!isBranchFound) {
                    this.billingData.billingBy.splice(j, 1);
                    let temp = JSON.parse(
                      JSON.stringify(this.billingData.billingBy)
                    );
                    this.billingData.billingBy = [];
                    this.billingData.billingBy = temp;
                  }
                }
                console.log("AAAAA", this.billingData.billingBy);
              } else {
                this.tosterService.error(ob.message);
              }
              this.spinner.hide();
              this.first.open();
              this.second.open();
            },
            (error) => {
              this.spinner.hide();
              this.tosterService.error("Error in getting branch data");
              console.log("error in getting branch data api");
            }
          );
      } else {
        this.spinner.hide();
        this.first.open();
        this.second.open();
      }

      if (this.billingSubLevelList && rateCardExists) {
        this.billingSubLevelList.forEach((billingSubelement) => {
          if (
            billingSubelement.id == offeringId &&
            billingSubelement.lookupVal != "ALL"
          ) {
            //this.selectOffering = true; // code to be use if offering code needs to be change in future
            this.selectOffering = false;
          }
        });
      }

      if (
        rateCardExists &&
        this.billingData &&
        this.billingData.billingOfferingMap &&
        this.billingData.billingOfferingMap.length == 1 &&
        this.selectOffering
      )
        this.serviceOfferingId = this.billingData.billingOfferingMap[0].serviceOfferingId;
    }

    if (!rateCardExists) {
      this.billingData = new billing.BillingModel();
      this.billingData.aliasName = this.customerName;
      this.billingData.lkpBillingLevelId = billingLevel;
      this.billingByLevelMapId = null;
    }
  }

  isValidBillingDt: boolean = false;
  updateList(index, column, value) {
    console.log(event);
    this.billingData.billingBy[index][column] = value;
    console.log(this.billingData.billingBy[index][column]);

    if (!(value == 0 || value == 1) && column === "excludeBillingDt") {
      let a = this.datePipe.transform(value, "yyyy-MM-dd");
      this.billingData.billingBy[index][column] = a;
      if (a < this.minDate || a > this.maxDate) {
        this.isValidBillingDt = true;
      } else {
        this.isValidBillingDt = false;
      }
    }
  }

  changeValue(index, column, value) {
    console.log(event);
    this.billingData.billingBy[index][column] = value;
    console.log(this.billingData.billingBy[index][column]);
  }

  addAddress(index) {
    const addrDialog = this.dialog.open(AddressDialogBox, {
      panelClass: "creditDialog",
      disableClose: true,
    });
    addrDialog.afterClosed().subscribe((result) => {
      console.log(result, "The dialog was closed");
      if (result && result != "") {
        this.billingData.billingBy[index]["billtoAddrList"].push(result);
        this.billingData.billingBy[index]["billtoAddr"] = JSON.parse(
          JSON.stringify(result)
        );
      }
    });
  }

  emailAddress(index) {
    const addrDialog = this.dialog.open(EmailDialogBox, {
      panelClass: "creditDialog",
      disableClose: true,
      width: "100rem",
      data: { bdmemailList: this.billingData.billingBy[index].bdmemailList },
    });
    addrDialog.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.billingData.billingBy[index]["bdmemailList"] = JSON.parse(
          JSON.stringify(result)
        );
        console.log(result, "pirnt result");
        this.billingData.billingBy[index]["bdmEmail"] =
          this.billingData.billingBy[index].bdmemailList.length > 0
            ? this.billingData.billingBy[index].bdmemailList[0]
            : null;
      }
    });
  }

  ebillemailAddress(index) {
    const addrDialog = this.dialog.open(EbillEmailDialogBox, {
      panelClass: "creditDialog",
      disableClose: true,
      width: "100rem",
      data: {
        ebillemailList: this.billingData.billingBy[index].ebillemailList,
      },
    });
    addrDialog.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.billingData.billingBy[index]["ebillemailList"] = JSON.parse(
          JSON.stringify(result)
        );
        console.log(result, "pirnt result");
        this.billingData.billingBy[index]["ebillEmail"] =
          this.billingData.billingBy[index].ebillemailList.length > 0
            ? this.billingData.billingBy[index].ebillemailList[0]
            : null;
      }
    });
  }

  communicationEmail(index) {
    const addrDialog = this.dialog.open(CommunicationEmailDialogBox, {
      panelClass: "creditDialog",
      disableClose: true,
      width: "100rem",
      data: {
        communicationemailList: this.billingData.billingBy[index]
          .communicationemailList,
      },
    });
    addrDialog.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.billingData.billingBy[index][
          "communicationemailList"
        ] = JSON.parse(JSON.stringify(result));
        console.log(result, "pirnt result");
        this.billingData.billingBy[index]["commBillEmail"] =
          this.billingData.billingBy[index].communicationemailList.length > 0
            ? this.billingData.billingBy[index].communicationemailList[0]
            : null;
      }
    });
  }

  @ViewChild("fBilling", null) saveBilling: any;

  isValidBilling() {
    if (this.saveBilling.form.valid === true) {
      this.postBillingData(1);
    }
  }
  isValidBillingDraft() {
    if (this.saveBilling.form.valid === true) {
      this.postBillingData(0);
    }
  }

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.altKey && event.keyCode === 78) {
      // alt+n [Next]
      event.preventDefault();
      if (document.getElementById("billingNextButton")) {
        let nextElement: HTMLElement = document.getElementById(
          "billingNextButton"
        ) as HTMLElement;
        nextElement.click();
      }
    }

    if (event.ctrlKey && event.keyCode === 83) {
      // ctrl+s [Save as Draft]
      event.preventDefault();
      if (document.getElementById("billingDraftButton")) {
        let saveElement: HTMLElement = document.getElementById(
          "billingDraftButton"
        ) as HTMLElement;
        saveElement.click();
      }
    }
  }

  deactivateOrpanChild(
    newBillingData: billing.BillingModel
  ): billing.BillingModel {
    var inactiveStatus = 0;
    this.statusList.forEach((statusElement) => {
      if (statusElement.lookupVal === "DELETED")
        inactiveStatus = statusElement.id;
    });

    if (this.allBillingData && this.allBillingData.length > 0) {
      this.allBillingData.forEach((oldElement) => {
        if (
          (oldElement.billingBy && oldElement.billingBy.length > 0) ||
          (oldElement.billingCneeCnorMap &&
            oldElement.billingCneeCnorMap.length > 0) ||
          (oldElement.billingOfferingMap &&
            oldElement.billingOfferingMap.length > 0)
        ) {
          let deactivatedBillingByList = [];
          let deactivatedCneeCnorList = [];
          let deactivatedOfferingList = [];

          if (oldElement.id === newBillingData.id) {
            //deactivate billing by
            if (oldElement.billingBy && oldElement.billingBy.length > 0) {
              oldElement.billingBy.forEach((oldBillingBy) => {
                var billingByExists = false;
                newBillingData.billingBy.forEach((newBillingBy) => {
                  if (oldBillingBy.id === newBillingBy.id) {
                    billingByExists = true;
                  }
                });
                if (!billingByExists && inactiveStatus > 0) {
                  oldBillingBy.status = inactiveStatus;
                  deactivatedBillingByList.push(oldBillingBy);
                }
              });
            }

            //deactivate cnee-cnor
            if (
              oldElement.billingCneeCnorMap &&
              oldElement.billingCneeCnorMap.length > 0
            ) {
              oldElement.billingCneeCnorMap.forEach((oldCneeCnor) => {
                var cneeCnorExists = false;
                newBillingData.billingCneeCnorMap.forEach((newCneeCnor) => {
                  if (oldCneeCnor.id === newCneeCnor.id) {
                    cneeCnorExists = true;
                  }
                });
                if (!cneeCnorExists && inactiveStatus > 0) {
                  oldCneeCnor.status = inactiveStatus;
                  deactivatedCneeCnorList.push(oldCneeCnor);
                }
              });
            }

            //deactivate offering
            if (
              oldElement.billingOfferingMap &&
              oldElement.billingOfferingMap.length > 0
            ) {
              oldElement.billingOfferingMap.forEach((oldOffering) => {
                var offeringExists = false;
                newBillingData.billingOfferingMap.forEach((newOffering) => {
                  if (oldOffering.id === newOffering.id) {
                    offeringExists = true;
                  }
                });
                if (!offeringExists && inactiveStatus > 0) {
                  oldOffering.status = inactiveStatus;
                  deactivatedOfferingList.push(oldOffering);
                }
              });
            }
          }

          if (deactivatedBillingByList.length > 0) {
            newBillingData.billingBy = newBillingData.billingBy.concat(
              deactivatedBillingByList
            );
          }
          if (deactivatedCneeCnorList.length > 0) {
            newBillingData.billingCneeCnorMap = newBillingData.billingCneeCnorMap.concat(
              deactivatedCneeCnorList
            );
          }
          if (deactivatedOfferingList.length > 0) {
            newBillingData.billingOfferingMap = newBillingData.billingOfferingMap.concat(
              deactivatedOfferingList
            );
          }
        }
      });
    }
    return newBillingData;
  }

  deactivateOrphanChild(
    newBillingData: billing.BillingModel
  ): billing.BillingModel {
    var inactiveStatus = 0;
    this.statusList.forEach((statusElement) => {
      if (statusElement.lookupVal === "DELETED")
        inactiveStatus = statusElement.id;
    });

    console.log(this.allBillingData);
    console.log(newBillingData);

    if (this.allBillingData && this.allBillingData.length > 0) {
      this.allBillingData.forEach((oldElement) => {
        if (
          (oldElement.billingBy && oldElement.billingBy.length > 0) ||
          (oldElement.billingCneeCnorMap &&
            oldElement.billingCneeCnorMap.length > 0) ||
          (oldElement.billingOfferingMap &&
            oldElement.billingOfferingMap.length > 0)
        ) {
          let deactivatedBillingByList = [];
          let deactivatedCneeCnorList = [];
          let deactivatedOfferingList = [];

          if (oldElement.id === newBillingData.id) {
            //deactivate billing by
            if (oldElement.billingBy && oldElement.billingBy.length > 0) {
              oldElement.billingBy.forEach((oldBillingBy) => {
                var billingByExists = false;
                newBillingData.billingBy.forEach((newBillingBy) => {
                  if (oldBillingBy.id === newBillingBy.id) {
                    billingByExists = true;
                  }
                });
                if (!billingByExists && inactiveStatus > 0) {
                  oldBillingBy.status = inactiveStatus;
                  deactivatedBillingByList.push(oldBillingBy);
                }
              });
            }

            //deactivate cnee-cnor
            if (
              oldElement.billingCneeCnorMap &&
              oldElement.billingCneeCnorMap.length > 0
            ) {
              oldElement.billingCneeCnorMap.forEach((oldCneeCnor) => {
                var cneeCnorExists = false;
                newBillingData.billingCneeCnorMap.forEach((newCneeCnor) => {
                  if (oldCneeCnor.id === newCneeCnor.id) {
                    cneeCnorExists = true;
                  }
                });
                if (!cneeCnorExists && inactiveStatus > 0) {
                  oldCneeCnor.status = inactiveStatus;
                  deactivatedCneeCnorList.push(oldCneeCnor);
                }
              });
            }

            //deactivate offering
            if (
              oldElement.billingOfferingMap &&
              oldElement.billingOfferingMap.length > 0
            ) {
              oldElement.billingOfferingMap.forEach((oldOffering) => {
                var offeringExists = false;
                newBillingData.billingOfferingMap.forEach((newOffering) => {
                  if (oldOffering.id === newOffering.id) {
                    offeringExists = true;
                  }
                });
                if (!offeringExists && inactiveStatus > 0) {
                  oldOffering.status = inactiveStatus;
                  deactivatedOfferingList.push(oldOffering);
                }
              });
            }
          }

          if (deactivatedBillingByList.length > 0) {
            newBillingData.billingBy = newBillingData.billingBy.concat(
              deactivatedBillingByList
            );
          }
          if (deactivatedCneeCnorList.length > 0) {
            newBillingData.billingCneeCnorMap = newBillingData.billingCneeCnorMap.concat(
              deactivatedCneeCnorList
            );
          }
          if (deactivatedOfferingList.length > 0) {
            newBillingData.billingOfferingMap = newBillingData.billingOfferingMap.concat(
              deactivatedOfferingList
            );
          }
        }
      });
    }
    return newBillingData;
  }

  changeSubType(id, isChange) {
    if (isChange) this.billingData.billingSubtypeInputVal = null;
    let name;
    for (let item of this.billingSubTypeList) {
      if (item.id == id) {
        name = item.descr;
      }
    }
    switch (name) {
      case "AMOUNT WISE":
        this.subTypePlaceholder = "ENTER AMOUNT HERE";
        break;
      case "NO. OF WAYBILLS":
        this.subTypePlaceholder = "ENTER WAYBILL COUNT HERE";
        break;
      case "PERIODIC":
        this.subTypePlaceholder = "ENTER PERIODICITY HERE";
        break;
      default:
        this.subTypePlaceholder = "";
        break;
    }
  }

  openDetails() {
    if (this.billingLevel === "") {
      this.tosterService.error("Kindly select billing level to continue.");
      this.second.close();
    } else if (this.billingLevel === "RATE CARD" && this.rateCardId === 0) {
      this.tosterService.error("Kindly select any rate card to continue.");
      this.second.close();
      this.first.open();
    }
  }

  searchCtrlState = "";
  scrollActiveValue() {
    let selectItem = document.getElementsByClassName("mat-selected")[0];
    setTimeout(() => {
      if (selectItem) {
        selectItem.scrollIntoView(false);
      }
    }, 500);
  }
}

@Component({
  selector: "address-dialog",
  templateUrl: "billing.address.dialog.html",
  styleUrls: ["../core.css"],
})
export class AddressDialogBox {
  constructor(
    public dialogRef: MatDialogRef<AddressDialogBox>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  address1: string = "";
  address2: string = "";
  address3: string = "";

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeDialog(): void {
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: "300px",
      panelClass: "creditDialog",
      data: { message: "Are you sure ?" },
      disableClose: true,
      backdropClass: "backdropBackground",
    });

    dialogRefConfirm.afterClosed().subscribe((value) => {
      if (value) {
        this.dialogRef.close();
      } else {
        console.log("Keep Open");
      }
    });
  }

  ngOnInit() {}

  addAddress() {
    this.data =
      this.address1.toUpperCase() +
      " " +
      this.address2.toUpperCase() +
      " " +
      this.address3.toUpperCase();
    this.dialogRef.close(this.data);
  }

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      // esc [Close Dialog]
      event.preventDefault();
      if (document.getElementById("closeButton")) {
        let escElement: HTMLElement = document.getElementById(
          "closeButton"
        ) as HTMLElement;
        escElement.click();
      }
    }
  }
}

@Component({
  selector: "email-dialog",
  templateUrl: "billing.email.dialog.html",
  styleUrls: ["../core.css"],
})
export class EmailDialogBox {
  constructor(
    public dialogRef: MatDialogRef<EmailDialogBox>,
    public dialog: MatDialog,
    public tosterService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  bdmEmailList = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  visible = true;

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeDialog(): void {
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: "300px",
      data: { message: "Are you sure ?" },
      panelClass: "creditDialog",
      disableClose: true,
      backdropClass: "backdropBackground",
    });

    dialogRefConfirm.afterClosed().subscribe((value) => {
      if (value) {
        this.dialogRef.close();
      } else {
        console.log("Keep Open");
      }
    });
  }

  ngOnInit() {
    console.log(this.data);
    if (this.data.bdmemailList) {
      this.data.bdmemailList.forEach((element) => {
        if (element.trim() !== "") {
          this.bdmEmailList.push(element);
        }
      });
      console.log(this.bdmEmailList);
    }
  }

  emailAddress() {
    this.data = this.bdmEmailList;
    this.dialogRef.close(this.data);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    let regex = /^[A-Za-z_0-9.]{2,}@([A-Za-z0-9]{1,}[.]{1}[A-Za-z]{2,6}|[A-Za-z0-9]{1,}[.][A-Za-z]{2,6}[.]{1}[A-Za-z]{2,6})$/g;
    if ((value || "").trim() && value.match(regex)) {
      this.bdmEmailList.push(value);
      if (input) {
        input.value = "";
      }
    } else if (value.trim() && !value.match(regex)) {
      this.tosterService.error("Please provide a valid email.");
    }
  }

  remove(mail: string): void {
    const index = this.bdmEmailList.indexOf(mail);

    if (index >= 0) {
      this.bdmEmailList.splice(index, 1);
    }
  }

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      // esc [Close Dialog]
      event.preventDefault();
      if (document.getElementById("closeButton")) {
        let escElement: HTMLElement = document.getElementById(
          "closeButton"
        ) as HTMLElement;
        escElement.click();
      }
    }
  }
}

// Dialog Component for ebil
@Component({
  selector: "email-dialog",
  templateUrl: "billing.ebilEmail.dialog.html",
  styleUrls: ["../core.css"],
})
export class EbillEmailDialogBox {
  constructor(
    public dialogRef: MatDialogRef<EbillEmailDialogBox>,
    public dialog: MatDialog,
    public tosterService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ebillemailList = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  visible = true;

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeDialog(): void {
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: "300px",
      data: { message: "Are you sure ?" },
      panelClass: "creditDialog",
      disableClose: true,
      backdropClass: "backdropBackground",
    });

    dialogRefConfirm.afterClosed().subscribe((value) => {
      if (value) {
        this.dialogRef.close();
      } else {
        console.log("Keep Open");
      }
    });
  }

  ngOnInit() {
    console.log(this.data);
    if (this.data.ebillemailList) {
      this.data.ebillemailList.forEach((element) => {
        if (element.trim() !== "") {
          this.ebillemailList.push(element);
        }
      });
      console.log(this.ebillemailList);
    }
  }

  ebillemailAddress() {
    this.data = this.ebillemailList;
    this.dialogRef.close(this.data);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    let regex = /^[A-Za-z_0-9.]{2,}@([A-Za-z0-9]{1,}[.]{1}[A-Za-z]{2,6}|[A-Za-z0-9]{1,}[.][A-Za-z]{2,6}[.]{1}[A-Za-z]{2,6})$/g;
    if ((value || "").trim() && value.match(regex)) {
      this.ebillemailList.push(value);
      if (input) {
        input.value = "";
      }
    } else if (value.trim() && !value.match(regex)) {
      this.tosterService.error("Please provide a valid email.");
    }
  }

  remove(mail: string): void {
    const index = this.ebillemailList.indexOf(mail);

    if (index >= 0) {
      this.ebillemailList.splice(index, 1);
    }
  }

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      // esc [Close Dialog]
      event.preventDefault();
      if (document.getElementById("closeButton")) {
        let escElement: HTMLElement = document.getElementById(
          "closeButton"
        ) as HTMLElement;
        escElement.click();
      }
    }
  }
}
//Dialog end of ebil

//communication email dialog
@Component({
  selector: "email-dialog",
  templateUrl: "billing.comunicationemail.dialog.html",
  styleUrls: ["../core.css"],
})
export class CommunicationEmailDialogBox {
  constructor(
    public dialogRef: MatDialogRef<CommunicationEmailDialogBox>,
    public dialog: MatDialog,
    public tosterService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  communicationemailList = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  visible = true;

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeDialog(): void {
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: "300px",
      data: { message: "Are you sure ?" },
      panelClass: "creditDialog",
      disableClose: true,
      backdropClass: "backdropBackground",
    });

    dialogRefConfirm.afterClosed().subscribe((value) => {
      if (value) {
        this.dialogRef.close();
      } else {
        console.log("Keep Open");
      }
    });
  }

  ngOnInit() {
    console.log(this.data);
    if (this.data.communicationemailList) {
      this.data.communicationemailList.forEach((element) => {
        if (element.trim() !== "") {
          this.communicationemailList.push(element);
        }
      });
      console.log(this.communicationemailList);
    }
  }

  communicationEmail() {
    this.data = this.communicationemailList;
    this.dialogRef.close(this.data);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    let regex = /^[A-Za-z_0-9.]{2,}@([A-Za-z0-9]{1,}[.]{1}[A-Za-z]{2,6}|[A-Za-z0-9]{1,}[.][A-Za-z]{2,6}[.]{1}[A-Za-z]{2,6})$/g;
    if ((value || "").trim() && value.match(regex)) {
      this.communicationemailList.push(value);
      if (input) {
        input.value = "";
      }
    } else if (value.trim() && !value.match(regex)) {
      this.tosterService.error("Please provide a valid email.");
    }
  }

  remove(mail: string): void {
    const index = this.communicationemailList.indexOf(mail);

    if (index >= 0) {
      this.communicationemailList.splice(index, 1);
    }
  }

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      // esc [Close Dialog]
      event.preventDefault();
      if (document.getElementById("closeButton")) {
        let escElement: HTMLElement = document.getElementById(
          "closeButton"
        ) as HTMLElement;
        escElement.click();
      }
    }
  }
}

//end of communication email dialog

/* dialog component start */

@Component({
  selector: "conn-cnee-dialog",
  templateUrl: "billing.conn-cnee.dialog.html",
  styleUrls: ["../core.css"],
})
export class CneeCnorDialogBox {
  constructor(
    public dialogRef: MatDialogRef<CneeCnorDialogBox>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeDialog(): void {
    // this.dialogRef.close();
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: "300px",
      data: { message: "Are you sure ?" },
      panelClass: "creditDialog",
      disableClose: true,
      backdropClass: "backdropBackground",
    });

    dialogRefConfirm.afterClosed().subscribe((value) => {
      if (value) {
        this.dialogRef.close();
      } else {
        console.log("Keep Open");
      }
    });
  }

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      // esc [Close Dialog]
      event.preventDefault();
      if (document.getElementById("closeButton")) {
        let escElement: HTMLElement = document.getElementById(
          "closeButton"
        ) as HTMLElement;
        escElement.click();
      }
    }
  }
}

/* dialog component ends */

/* branch search dialog component start */

@Component({
  selector: "branch-search-dialog",
  templateUrl: "billing.branch.dialog.html",
  styleUrls: ["../core.css"],
})
export class BranchDialogBox {
  model: any = {};
  twoAPIdata: any;
  showData: any = [];
  tableData: any;
  newData: any = [];
  tabledataLength: number = 0;

  constructor(
    private contractservice: ContractService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<BranchDialogBox>,
    private tosterservice: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data1: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeDialog(): void {
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: "300px",
      data: { message: "Are you sure ?" },
      panelClass: "creditDialog",
      disableClose: true,
      backdropClass: "backdropBackground",
    });

    dialogRefConfirm.afterClosed().subscribe((value) => {
      if (value) {
        this.dialogRef.close();
      } else {
        console.log("Keep Open");
      }
    });
  }

  ngOnInit() {
    this.model.search = "NAME";
    // this.model.searchbyname = this.data1.branchName;
  }

  allTableData: any = [];
  fiterData(filterValue) {
    if (!filterValue) {
      return (this.tableData = this.allTableData.filter((obj) => {
        console.log(obj, "print branch code with nameeeeeeeeeeeeeeeeeeeee");
        return obj;
      }));
    } else {
      return (this.tableData = this.allTableData.filter((obj) => {
        console.log(obj, "print branch code with name");
        return obj.branchCode.toLowerCase().includes(filterValue.toLowerCase());
      }));
    }
  }

  searchBranchFlag: boolean = false;
  advanceFlag() {
    this.searchBranchFlag = true;
  }

  advanceDefaultError: boolean;
  advanceDefaultBranchName(str) {
    if (str) {
      this.advanceDefaultError = true;
      if (str.length > 2 && str) {
        this.advanceDefaultError = false;
        this.spinner.show();
        this.contractservice
          .searchBranch(
            this.model.searchbyname.toUpperCase(),
            this.data1.hubFlag
          )
          .subscribe(
            (branchList) => {
              let ob = ErrorConstants.validateException(branchList);
              if (ob.isSuccess) {
                var data = branchList.data.responseData;
                if (data && data.length > 0) {
                  data.sort((a, b) => {
                    const branchNameA = a.branchName.toUpperCase();
                    const branchNameB = b.branchName.toUpperCase();
                    let comparison = 0;
                    if (branchNameA > branchNameB) {
                      comparison = 1;
                    } else if (branchNameA < branchNameB) {
                      comparison = -1;
                    }
                    return comparison;
                  });
                }
                this.twoAPIdata = {};
                this.tableData = {};
                this.twoAPIdata = data;
                this.tableData = data;
                this.spinner.hide();
                for (let data of this.tableData) {
                  if (data.branchType == "CORPORATE") {
                    data.regionBranch = "";
                  } else if (data.branchType == "REGION") {
                    data.regionBranch = data.branchName;
                  }
                }
                this.allTableData = [...this.tableData];
                this.tabledataLength = this.tableData.length;
              } else {
                this.tosterservice.error(ob.message);
                this.spinner.hide();
              }
            },
            (error) => {
              this.tosterservice.info("Branch not found !");
              this.spinner.hide();
            }
          );
      }
    }
  }

  setBranch(branch) {
    this.data1 = branch;
  }

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      // esc [Close Dialog]
      event.preventDefault();
      if (document.getElementById("closeButton")) {
        let escElement: HTMLElement = document.getElementById(
          "closeButton"
        ) as HTMLElement;
        escElement.click();
      }
    }
  }
}

/* branch search dialog component ends */
