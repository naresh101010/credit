import { Lookup } from "../billingModel"

export class PricingParamTrans{
    "id": number
    "lkpCalcUnitId": number
    "lkpPricingCalcTypeId": number
    "pricingParamId": number
    "pricingParamVal": string
    "rrFlag": number
    "rrVal": number
    "pricingLabel" : string
    "calUnitName": string
    "calTypeName":string
    "attrName": string
    "pricingParamValArr": number[]
    "attr3": number
    "attributeValue" : number
    "attributeList" : Lookup[];
}