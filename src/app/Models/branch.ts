export class Branch {    
    email: string;
    expiryDate: string;
    lagTime: number;
    lkpBranchRatingId: number;
    mobile: string;
    operationalBranchId: number;
    organisationId: number;
    phone:string;
    pincodeId:number;
    preBookingLagTimeFlag:number;
    regionBranch: string;
    reportingBranchId: number;
    address: string;
    bankAccNumGeneral: string;
    bankAccNumOffline: string;
    bankAccNumOnline: string;
    branchCode: string;
    branchId?: number;
    branchName:string;
    branchGstNum:string;
    branchTypeId: number;
    cutoffTime: string;
    descr?:string;
    effectiveDate: string;
    propelRefId?: number;
    scanFlag?: number;
    status: number;
    isPreview?: boolean;
    fullAddress?:string;
    branchFeatureMaps?:Array<any>;
    branchManagers?:Array<any>;
    branchModeOfPayments?:Array<any>;

    
}