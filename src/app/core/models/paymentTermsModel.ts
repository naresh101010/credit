export class PaymentCommercialGen {
    id: 0;
    assocCntrId: any;
    lkpAssocBkngPayoutCtgyId: any;
    lkpAssocBkngExpnsTypeId: any;
    wtType: string;
    lkpCargoPayoutOptId: any;
    minAmtPerWaybl: number;
    maxAmtPerWaybl: number;
    addtnlParamFlag: 0;
    lkpAssocAddtnlParamId: any;
    addtnlParamVal: number;
    effectiveDt: string;
    minFlag = false;
    expDt: string;
    effectiveMinDt: any;
    expMinDt: any;
    exgratiaFlag: 0;
    minGuaranteeFlag: 0;
    promotionApplicableFlag: 0;
    addtnlExpnsFlag: 0;
    addtnlExpnsRemark: string;
    custPymtFlag: 0;
    isValidEffectiveDt = false;
    isValidExpDt = false;
    bookingCommercialEntList : [];
    assocNotepadList:any[] =  [AssocNotepadListObj];
    bookingBranchCommercialList :any[] = [BookingBranchCommercialListObj];
    bookingCommercialCustomerList :any[] =  [BookingCommercialCustomerListObj];
    
}
export class BookingCommercialEntListObjOff {
        id: number;
        serviceOfferingId: number;
        lkpBranchMopId: number;
        price: number;
        bkngCmrclId: number;
}
export class BookingCommercialEntListObjBook {
    id: number;
    serviceOfferingId: number;
    lkpBranchMopId: number;
    price: number;
    bkngCmrclId: number;
}
export class BookingCommercialEntListObjPer {
    id: number;
    lkpCargoCapacityId: number;
    price: number;
    bkngCmrclId: number;
}
export class BookingBranchCommercialListObj {
        id:  number;
        bkngCmrclId:  number;
        assocBranchId:  number;
        amtType: string;
        amt:  number;
        reason: string;
        effectiveDt: string;
        expDt: string;
}

export class AssocNotepadListObj {
    id:  number;
    entityRefId:  number;
    notepadId:  number;
    notepadInputVal:  string;
}

export class BookingCommercialCustomerListObj {
    msaCustId: number;
    lkpAssocBkngPayoutCtgyId: number;
    lkpAssocBkngExpnsTypeId: number;
    maxAmtPerWaybl: number;
    minAmtPerWaybl: number;
    addtnlParamFlag: number;
    lkpAssocAddtnlParamId: number;
    addtnlParamVal: number;
    cntrCode: string;
    effectiveDt: string;
    expDt: string;
    customerName: string;
    commercialEntList: []

}

export class CustCommercialEntListObj {
    id: number;
    serviceOfferingId: number;
    lkpBranchMopId: number;
    lkpCargoCapacityId: number;
    price: number;
    bkngCmrclId: number;
    bkngCmrclCustId: number;
}


export interface Deserializable {
    deserialize(input: any): this;
  }