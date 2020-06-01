 import {PricingParamRrs} from './PricingParamRrs';

 export class PricingParam {

    'id': number;
    'serviceOfferingId': number;
    'priceParameterResponseDTO': {
          'id': number
          'pricingLabel': string
          'priceCalculationTypeId': string
          'priceCalculationUnitId': number
          'attributeTypeId': number
          'attrVal': string
          'rrFlag': number
        };
    'pricingParamRrs': PricingParamRrs[] ;
 }
