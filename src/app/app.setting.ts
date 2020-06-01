import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})


export class AppSetting {
  //public static API_ENDPOINT = 'http://internal-ade22be1927c711ea9bac0a3257c4306-803686038.ap-south-1.elb.amazonaws.com/';
  public static API_ENDPOINT = JSON.parse(sessionStorage.getItem('config')).credit_contract.API_ENDPOINT;

  public static API_ENDPOINT_K8 = 'http://localhost:8000/';
  public static branchCode = 'B1';
  public static journeyId = 'A1';
  public static userId = 'user111';
  public static serviceOffering ;

  public static msaCustId
  public static oprtunityId
  public static startDate
  public static customerName
  public static sfdcAccId
  public static sfxCode = 'NOT GENERATED YET'



  public static endDate
  public static contractId;
  public static offeringId
  public static ratecardId
  public static serviceOfering=[]
  public static stepperFlag=false
  public static businessType
}