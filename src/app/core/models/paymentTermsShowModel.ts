export class PaymentCommercialGenShow {
    id: 0;
    assocCntrId: any;
    lkpAirFreightPayoutOptId: number;
    lkpPymtMethodId: number;
    minAmt: number;
    price: number;
    recIdentifier: number;
    wtCalcCtgy: any;
    wtType: any;
    effectiveDt: string;
    expDt: string;
    assocNotepads: any[] = [AssocNotepadListObj];
    airFreightCityPrdctCtgys: [airFreightCityPrdctCtgysObj];
    airFreightWtSlabChrgs: [airFreightWtSlabChrgsObj];

}
export class airFreightCityPrdctCtgysObj {
    id: number;
    airFreightCmrclId: number;
    assocCntrId: number;
    effectiveDt: string;
    expDt: string;
    fromCityId: number;
    toCityId: number;
    recIdentifier: number;
    prdctCtgyId: number;
}
export class airFreightWtSlabChrgsObj {
    id: number;
    price: number;
    airFreightCmrclId: number;
    assocCntrId: number;
    effectiveDt: string;
    expDt: string;
    slabFrom: number;
    slabTo: number;
    recIdentifier: number;
}


export class AssocNotepadListObj {
    id: number;
    entityRefId: number;
    notepadId: number;
    notepadInputVal: string;
}
