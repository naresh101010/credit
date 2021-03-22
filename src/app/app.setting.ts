export class AppSetting {
    public static API_ENDPOINT = JSON.parse(sessionStorage.getItem('config')).associate_booking.API_ENDPOINT;
    // public static API_ENDPOINT ='http://9fd1f2f0-default-ingressbf-ed49-977150202.ap-south-1.elb.amazonaws.com/assocbbff/'

    //API end point of User Management
    public static API_ENDPOINT_UM = JSON.parse(sessionStorage.getItem('config')).shared.API_ENDPOINT;
    public static API_REPORT_ENDPOINT = JSON.parse(sessionStorage.getItem('config')).shared.API_ENDPOINT_REPORT;
    public static associateId:number; // = 103;
    public static contractId:number; //= 1090;
    public static submitContractId:number;
    public static associateData:any;
    public static associateRefData:any;
    public static associateObject:any ;
    public static editStatus:any ;
    public static editFlow:any ;
    public static deptRefList:any = [] ;


    static vehicleId: any;
    static associateDepartment : any;
    static vehicleNumber : string;

    public static sfdcAccId;
    public static customerName;
    public static msaCustId;
    public static sfxCode = 'NOT GENERATED YET';

    public static oprtunityId
    public static entitytype:any='ASSOCIATE';

    public static wefDate : any;   // to store wefDate
}