import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppSetting {
  public static API_ENDPOINT = JSON.parse(sessionStorage.getItem("config"))
    .shared.API_ENDPOINT;
  public static API_ENDPOINT_AUTH = JSON.parse(sessionStorage.getItem("config"))
    .shared.API_ENDPOINT_AUTH;
  public static API_ENDPOINT_DOC_UPLD = JSON.parse(
    sessionStorage.getItem("config")
  ).associate_booking.API_ENDPOINT;
  public static API_ENDPOINT_K8 = "";
  public static branchCode = "B1";
  public static journeyId = "A1";
  public static userId = "";
  public static defaultBranchcode = "";

  public static msaCustId;
  public static oprtunityId;
  public static startDate;
  public static customerName;
  public static sfdcAccId;
  public static contractId;

  public static sfxCode = "NOT GENERATED YET";
}

// 'http://9fd1f2f0-default-ingressbf-ed49-977150202.ap-south-1.elb.amazonaws.com/assocbbff/swagger-ui.html'
