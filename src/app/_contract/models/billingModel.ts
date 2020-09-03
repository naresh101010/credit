export class BillingResponse {
    billingLevel: BillingModel[];
    message: string;
    refernceList: ReferenceList;
}
export class ReferenceList {
    billingLevelList: Lookup[];
    billingSubLevelList: Lookup[];
    billingSubTypeList: Lookup[];
    paymentTermList: Lookup[];
    billingCycleList: Lookup[];
    billingByList: Lookup[];
    todBasedOnList: Lookup[];
    billingFormatList: Lookup[];
    gbCategoryList: Lookup[];
    offerings: Offering[];
    stateList: Lookup[];
}
export class BillingModel {
    aliasName: string;
    autoBillingFlag: number;
    billingBy: BillingBy[];
    billingCneeCnorMap: BillingCneeCnorMap[];
    billingDtls: string;
    billingOfferingMap: BillingOfferingMap[];
    billingSubtypeInputVal: string;
    cneeCnorBillingCateg: string;
    cneeCnorFlag: number;
    contractId: number;
    ebillFlag: number;
    entityId: number;
    id: number;
    lkpBillingCycleId: number;
    lkpBillingFormat: number;
    lkpBillingLevelId: number;
    lkpBillingSublevelId: number;
    lkpBillingSubtypeId: number;
    lkpPymtTermId: number;
    lkpTodBasedOnId: number;
    todAmt: number;
    todFlag: number;
    gstinRegdFlag:number

    constructor(billingData: any = {}) {
        this.aliasName = '';
        this.autoBillingFlag = 0;
        this.gstinRegdFlag = 0;
        this.billingBy = [];

        this.billingBy = this.billingBy.concat(new BillingBy());
        this.billingCneeCnorMap = [];
        this.billingCneeCnorMap = this.billingCneeCnorMap.concat(new BillingCneeCnorMap());
        this.billingDtls = 'BILLING CYCLE FLAG';
        this.billingOfferingMap = [];
        this.billingOfferingMap = this.billingOfferingMap.concat(new BillingOfferingMap());
        this.billingSubtypeInputVal = '';
        this.cneeCnorBillingCateg = '';
        this.cneeCnorFlag = 0;
        this.contractId = 0;
        this.ebillFlag = 0;
        this.entityId = 0;
        this.id = 0;
        this.lkpBillingCycleId = null;
        this.lkpBillingFormat = null;
        this.lkpBillingLevelId = null;
        this.lkpBillingSublevelId = null;
        this.lkpBillingSubtypeId = null;
        this.lkpPymtTermId = null;
        this.lkpTodBasedOnId = null;
        this.todAmt = null;
        this.todFlag = 0;
    }
}
export class BillingOfferingMap {
    id: number;
    serviceOfferingId: number;
    status: number;

    constructor(billingOfferingMap: any = {}) {
        this.serviceOfferingId = 0;
        this.id = 0;
    }
}
export class BillingCneeCnorMap {
    cneeId: number;
    cneeName: string;
    cnorId: number;
    cnorName: string;
    id: number
    status: number;
    
    constructor(billingCneeCnorMap: any = {}) {
        this.cneeId = 0;
        this.cnorId = 0;
        this.id = 0;
        this.cneeName = '';
        this.cnorName = '';
    }

}
export class BillingBy {
    assignBranchId: number;
    assignBranchName: string;
    bdmemailList:string[];
    bdmEmail: string;
    ebillemailList:string[];
    ebillEmail: string;
    billingBranchId: number;
    billingBranchName: string;
    billingByLevelMapId: number;
    billtoAddr: string;
    billtoAddrList: string[];
    collBranchId: number;
    collBranchName: string;
    communicationemailList: string[];
    commBillEmail: string;
    creditRisk: number;
    excludeBillingDt: Date;
    excludeBillingFlag: number;
    gstinNum: string;
    id: number;
    lkpGbCtgyId: number;
    minBillingAmt: number;
    mnthPotential: number;
    stateId: number;
    submsnBranchId: number;
    submsnBranchName: string;
    tanNum: string;
    status: number;

    constructor(billingBy: any = {}) {
        this.assignBranchId = 0;
        this.assignBranchName = '';
        this.bdmemailList = [];
        this.bdmEmail = '';
        this.ebillemailList = [];
        this.ebillEmail = '';
        this.billingBranchId = 0;
        this.billingBranchName = '';
        this.billingByLevelMapId = 0;
        this.billtoAddr = '';
        this.billtoAddrList = [];
        this.collBranchId = 0;
        this.collBranchName = '';
        this.communicationemailList =[];
        this.commBillEmail = '';
        this.creditRisk = 0;
        this.ebillEmail = '';
        this.excludeBillingDt = new Date();
        this.excludeBillingFlag = 0;
        this.gstinNum = '';
        this.id = 0;
        this.lkpGbCtgyId = 0;
        this.minBillingAmt = 0;
        this.mnthPotential = 0;
        this.stateId = 0;
        this.submsnBranchId = 0;
        this.submsnBranchName = '';
        this.tanNum = '';
    }
}

export class Radio {
    id: number;
    value: string;
}

export class Lookup {
    id: number;
    lookupVal: string;
    descr:string;

}
export class Offering {
    serviceOffering: string = '';
    serviceOfferingId: number = 0;
}
export class CneeCnor {
    id: number;
    name: string;
    addrBook: AddrBook;
    ischecked: boolean;
}
export class AddrBook{
    id:number;
    addr1:string;
    addr2:string;
    addr3:string;
    pincode:string;
}