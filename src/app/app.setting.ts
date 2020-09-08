import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AppSetting {
  public static API_ENDPOINT = JSON.parse(sessionStorage.getItem('config')).user.API_ENDPOINT
  public static API_ENDPOINT_AUTH = JSON.parse(sessionStorage.getItem('config')).user.API_ENDPOINT_AUTH 
  public static API_ENDPOINT_K8 = "";
  public static branchCode = "B1";
  public static journeyId = "A1";
  public static userId = "";
  public static defaultBranchcode = "";
}
