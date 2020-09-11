import { ServiceOfferingSla } from './service-offering-sla';

export class RateGroup {
    createdBy?: string;
    createdDate?: string;
    description?: string;
    effectiveDate?: string;
    expiryDate?: string;
    id?: number;
    rateGroupId?: number;
    propelRefId?: number;
    rateGroupName?: string;
    serviceOfferingSlaList?: Array<ServiceOfferingSla>;
    status?: number;
    updateDate?: string;
    updatedBy?: string;
}