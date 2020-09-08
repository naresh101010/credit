import {CommercialProductMap} from './CommercialProductMap'
import {PricingParamTrans} from './PricingParamTrans'
import {SafextBkngCustomCharge} from './SafextBkngCustomCharge'
import {SafextCharge} from './SafextCharge'
import {SafextDlvryCustomCharge} from './SafextDlvryCustomCharge'
import {ZmCustomPrice} from './ZmCustomPrice'
import {ZmPrice} from './ZmPrice'
import {SafexGeoPinState} from './SafexGeoPinState'

export class CommercialDataModel{

    "commercialProductMap": CommercialProductMap[]
    "gstTypeId": number
    "gstinFlag": number
    "id": number
    "lkpChrgById": number
    "lkpPackTypeId": number
    "lkpSlabProtectionId": number
    "packAlias": string
    "prdctCtgyId": number
    "pricingParamTrans": PricingParamTrans[]
    "rateType": string
    "ratecardId": number
    "safextBkngCustomCharge": SafextBkngCustomCharge[]
    "safextCharge": SafextCharge[]
    "safextDlvryCustomCharge": SafextDlvryCustomCharge[]
    "safextFlag": number
    "slabFlag": number
    "zmCustomPrice":ZmCustomPrice[]
    "zmPrice":ZmPrice[]
    "safeextTypeFlag": number
     "deliveryFlag": boolean
     "bookingFlag": boolean
     "sfxStatePinList": SafexGeoPinState[]
     "ZonalSlabCounter":number
     "sfxDlvrSlabCounter":number
     "sfxBookSlabCounter":number
     "stopZonalSlab":boolean
     "stopsfxDlvrSlab":boolean
     "stopsfxBookSlab":boolean
     "lkpChrgByWeight":boolean
     "lkpChrgByPiece":boolean
     "safeextTypeName":string
}