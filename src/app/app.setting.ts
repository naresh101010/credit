import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AppSetting {

  // public static API_ENDPOINT = 'http://internal-a4923df86806c11eaa19a023e3146bec-1295913038.ap-south-1.elb.amazonaws.com/';

  public static serviceOffering;

  public static msaCustId
  public static oprtunityId
  public static startDate
  public static customerName
  public static sfdcAccId
  public static sfxCode = 'NOT GENERATED YET'



  public static endDate
  public static offeringId
  public static ratecardId
  public static serviceOfering = []
  public static stepperFlag = false
  public static businessType
  public static bookingFlag;



  public production = false;
  public localApiUrl = "http://localhost:3000/secure/";
  // public lookupUrl = 'http://9fd1f2f0-default-ingressbf-ed49-977150202.ap-south-1.elb.amazonaws.com/assmgmtbkbff/secure/';
  // public requestUrl = 'http://9fd1f2f0-default-ingressbf-ed49-977150202.ap-south-1.elb.amazonaws.com/assmgmtbkbff/secure/';
  // public static API_ENDPOINT = 'http://87f5a331-booking-ingressbf-7f74-1144915769.ap-south-1.elb.amazonaws.com/bookwebff/'
  // public static API_ENDPOINT_UM = "http://87f5a331-usrmgmt-ingressbf-c13b-1269328967.ap-south-1.elb.amazonaws.com/userbff/"
  public static API_ENDPOINT_AUTH = JSON.parse(sessionStorage.getItem("config")).shared.API_ENDPOINT_AUTH;
  public static API_ENDPOINT = JSON.parse(sessionStorage.getItem("config")).bookings.API_ENDPOINT
  public static API_ENDPOINT_UM = JSON.parse(sessionStorage.getItem('config')).shared.API_ENDPOINT;


  public static associateId: number;
  public static contractId: number;
  public static submitContractId: number;
  static vehicleId: any;
}





// export class AppSetting {
