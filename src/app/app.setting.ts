export class AppSetting {
  public static API_ENDPOINT = JSON.parse(sessionStorage.getItem("config")).associate_airfreight.API_ENDPOINT;
  public static API_ENDPOINT_UM = JSON.parse(sessionStorage.getItem('config')).shared.API_ENDPOINT;
    public static API_REPORT_ENDPOINT = JSON.parse(sessionStorage.getItem('config')).shared.API_ENDPOINT_REPORT;

  // associate_network
//  public static API_ENDPOINT ='http://9fd1f2f0-associate-ingress-94f7-1723126191.ap-south-1.elb.amazonaws.com/asscairbff/'
  public static associateId: number;
  public static contractId: number;
  public static submitContractId: number;
  public  static vehicleId: any;
  public static associateRefData:any;
  public  static routeId:any;

  public static associateData:any;
  public static associateDepartment : any;
  public static associateObject:any ;
  public static  vehicleTypeStatus:number;

  public static vehicleNumber : string;

  public static sfdcAccId;
  public static customerName;
  public static msaCustId;
  public static sfxCode = 'NOT GENERATED YET';

  public static oprtunityId
  public static entitytype:any='ASSOCIATE';
  public static editStatus;
  public static deptRefList;

  public static wefDate : any;   // to store wefDate
}