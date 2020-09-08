import {LookupIdVal} from './LookupIdVal'
import {PricingParam} from './PricingParam'
import {GstTypeList} from './GstTypeList'
import {RateGroupList} from './RateGroupList'
import {ProductCategoryList} from './ProductCategoryList'
import {SafextStateWise} from './SafextStateWise'


export class ReferenceDataModel{

    "chargeByList": LookupIdVal[]
    "productCategoryList": ProductCategoryList[]
    "packagingTypeList": LookupIdVal[]
    "slabProtectTypeList": LookupIdVal[]
    "safexTypeList": LookupIdVal[]
    "safexLevelList": LookupIdVal[]
    "rateGroupList": RateGroupList[]
    "pricingParam": PricingParam[]
    "pricingCalculationTypeList": LookupIdVal[]
    "pricingCalculationUnitList": LookupIdVal[]
    "attrTypeList": LookupIdVal[]
    "gstTypeList": GstTypeList[]
    "safextStateWise": SafextStateWise[]
    "srcDestList": LookupIdVal[]
    "stateTypeList": LookupIdVal[]
    "statusList": LookupIdVal[]


}