export class PaymentTermsModel {
  "addtnlAmtFlag": number;
  "addtnlPrice": number;
  "addtnlPymtType": string;
  "assocCntrId": number;
  "attr1": string;
  "attr2": string;
  "attr3": number;
  "attr4": number;
  "cmprsnFlag": number;
  "cmprsnPrice": number;
  "cmprsnWith": string;
  "crtdBy": string;
  "crtdDt": any;
  "custPymtFlag": number;
  "customerCommercial": PaymentTermsModel[];
  "deliveryProductList": DeliveryProductList[];
  "deliveryVehicleChargeList": DeliveryVehicleChargeList[];
  "deliveryWtSlabChargeList": DeliveryWtSlabChargeList[];
  "descr": string;
  "dlvryPayoutCtgy": string;
  "effectiveDt": any;
  "expDt": any;
  "id": number;
  "lkpAssocDlvryPayoutOptId": number;
  "minAmtWaybill": number;
  "nextDayIncntv": number;
  "prdctCtgyId": number;
  "price": number;
  "recIdentifier": number;
  "sameDayIncntv": number;
  "secondDayIncntv": number;
  "status": number;
  "thirdDayIncntv": number;
  "tripOpt": string;
  "updBy": string;
  "updDt": any;
  "ver": number;
  "wtBasis": string;
  "wtType": string;
  "sameDayDlvryRate": string;
  "msaCustId": number;
  "cntrCode": string;
  "isPcdDel": number

  constructor() {
    this.addtnlAmtFlag = null;
    this.addtnlPrice = null;
    this.sameDayDlvryRate = null;
    this.addtnlPymtType = "";
    this.assocCntrId = null;
    this.cmprsnFlag = null;
    this.cmprsnPrice = null;
    this.cmprsnWith = '';
    this.custPymtFlag = 0;
    this.customerCommercial = [];
    this.deliveryProductList = [];
    this.deliveryVehicleChargeList = [];
    this.deliveryWtSlabChargeList = [];  //[new DeliveryWtSlabChargeList()];
    this.dlvryPayoutCtgy = '';
    this.effectiveDt = '';
    this.expDt = '';
    this.lkpAssocDlvryPayoutOptId = null;
    this.minAmtWaybill = null;
    this.nextDayIncntv = null;
    this.prdctCtgyId = null;
    this.price = null;
    this.sameDayIncntv = null;
    this.secondDayIncntv = null;
    this.thirdDayIncntv = null;
    this.tripOpt = '';
    this.wtBasis = '';
    this.wtType = '';
    this.msaCustId = null;
    this.cntrCode = '';
    this.isPcdDel = 0;
  }
}

export class DeliveryWtSlabChargeList {
  "assocCntrId": number;
  "attr1": string;
  "attr2": string;
  "attr3": number;
  "attr4": number;
  "cmprsnPrice": number;
  "crtdBy": string;
  "crtdDt": any;
  "descr": string;
  "dlvryCmrclId": number;
  "effectiveDt": any;
  "expDt": any;
  "id": number;
  "price": number;
  "recIdentifier": number;
  "status": number;
  "updBy": string;
  "updDt": any;
  "ver": number;
  "wtSlabFrom": number;
  "wtSlabTo": number;
  "isNewSla": boolean

  constructor() {
    this.assocCntrId = new PaymentTermsModel().assocCntrId;
    this.effectiveDt = new PaymentTermsModel().effectiveDt;
    this.expDt = new PaymentTermsModel().expDt;
    this.cmprsnPrice = null;
    this.dlvryCmrclId = null;
    this.price = null;
    this.wtSlabFrom = null;
    this.wtSlabTo = null;
  }
}

export class DeliveryVehicleChargeList {
  "assocCntrId": number;
  "attr1": string;
  "attr2": string;
  "attr3": number;
  "attr4": number;
  "crtdBy": string;
  "crtdDt": any;
  "descr": string;
  "dlvryCmrclId": number;
  "effectiveDt": any;
  "expDt": any;
  "id": number;
  "price": number;
  "recIdentifier": number;
  "status": number;
  "updBy": string;
  "updDt": any;
  "vehicleId": number;
  "ver": number
  constructor() {
    this.assocCntrId = new PaymentTermsModel().assocCntrId;
    this.effectiveDt = new PaymentTermsModel().effectiveDt;
    this.expDt = new PaymentTermsModel().expDt;
  }
}


export class DeliveryProductList {
  "assocCntrId": number;
  "attr1": string;
  "attr2": string;
  "attr3": number;
  "attr4": number;
  "prdctName": string;
  "crtdBy": string;
  "crtdDt": any;
  "descr": string;
  "dlvryCmrclId": number;
  "effectiveDt": any;
  "expDt": any;
  "id": number;
  "productId": number;
  "recIdentifier": number;
  "status": number;
  "updBy": string;
  "updDt": any;
  "ver": number
  constructor() {
    // this.assocCntrId = new PaymentTermsModel().assocCntrId;
    this.effectiveDt = new PaymentTermsModel().effectiveDt;
    this.expDt = new PaymentTermsModel().expDt;
    this.recIdentifier = null;
    this.id = null;
    this.status = null;
    this.crtdBy = '';
    this.updBy = '';
    this.updDt = '';
    this.crtdDt = '';
  }
}