import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class AppSetting {
  public static API_ENDPOINT = JSON.parse(sessionStorage.getItem('config')).retail_contract.API_ENDPOINT; 
  public static API_ENDPOINT_UM = JSON.parse(sessionStorage.getItem('config')).shared.API_ENDPOINT;

// public static API_ENDPOINT = "http://internal-9fd1f2f0-default-retailcon-6b88-1115879675.ap-south-1.elb.amazonaws.com/"
  //public static API_ENDPOINT_K8 = 'http://localhost:8000/';
  public static branchCode = 'B1';
  public static journeyId = 'A1';
  public static userId = 'user111';
  public static serviceOffering ;

  public static msaCustId:number;
  public static oprtunityId
  public static startDate
  public static customerName;
  public static sfdcAccId
  public static sfxCode = 'NOT GENERATED YET';
  public static MSALevel;



  public static endDate
  public static contractId;
  public static offeringId
  public static ratecardId
  public static serviceOfering=[]
  public static stepperFlag=false
  public static businessType
  public static msaId:number;
  public static draftId:number;
  public static deleteId:number;
  public static pendingId:number;
  public static activeId:number;
  public static inactiveId:number;

  public static branchEffectiveDt:any;
  public static branchentityId:number;
  
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};