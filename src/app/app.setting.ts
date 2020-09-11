import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AppSetting {
  public production = false;
  public localApiUrl = "http://localhost:3000/secure/";
  public geoApiUrl = JSON.parse(sessionStorage.getItem('config')).mdm.geoApiUrl;
  public zoneApiUrl = JSON.parse(sessionStorage.getItem('config')).mdm.zoneApiUrl;
  public lookupNotepadApiUrl = JSON.parse(sessionStorage.getItem('config')).mdm.lookupNotepadApiUrl;
  public commandmentApiUrl = JSON.parse(sessionStorage.getItem('config')).mdm.commandmentApiUrl;
  public branchApiUrl = JSON.parse(sessionStorage.getItem('config')).mdm.branchApiUrl;
  public pricingParameterapiUrl = JSON.parse(sessionStorage.getItem('config')).mdm.pricingParameterapiUrl;






}

// export class AppSetting {
//     // local url
//     public production = false;
//     public localApiUrl = "http://localhost:3000/secure/";
//     public geoApiUrl = "http://internal-aa18f5df64d5e11ea9bac0a3257c4306-287532085.ap-south-1.elb.amazonaws.com/secure/";
//     public zoneApiUrl = "http://internal-a0e01a3894c0811ea9bac0a3257c4306-2035179949.ap-south-1.elb.amazonaws.com/secure/";
//     public lookupNotepadApiUrl = "http://internal-a8b998f554e6611ea9bac0a3257c4306-1036323921.ap-south-1.elb.amazonaws.com/secure/";
//     public commandmentApiUrl = "http://internal-a0db0192d644a11eaa19a023e3146bec-1307889661.ap-south-1.elb.amazonaws.com/secure/";
//     public branchApiUrl = "http://internal-acb12892e52e311ea9bac0a3257c4306-550481844.ap-south-1.elb.amazonaws.com/secure/";


    // SIT urls
    // public production=true;
    // public localApiUrl= "http://localhost:3000/secure/";
    // public geoApiUrl= "http://internal-aa18f5df64d5e11ea9bac0a3257c4306-287532085.ap-south-1.elb.amazonaws.com/secure/";
    // public zoneApiUrl= "http://internal-a7be5d0b953d411eaa69b0a7ef785cff-1271528180.ap-south-1.elb.amazonaws.com/secure/";
    // public lookupNotepadApiUrl= "http://internal-a8b998f554e6611ea9bac0a3257c4306-1036323921.ap-south-1.elb.amazonaws.com/secure/";
    // public commandmentApiUrl= "http://internal-a0db0192d644a11eaa19a023e3146bec-1307889661.ap-south-1.elb.amazonaws.com/secure/";
    // public branchApiUrl= "http://internal-acb12892e52e311ea9bac0a3257c4306-550481844.ap-south-1.elb.amazonaws.com/secure/";

//}