import { Country } from 'src/app/Models/country';
export class State {
    id?: number;
    descr: string;
    ewayblInterTh: number;
    ewayblIntraTh: number;
    gstNum: string;
    gstStateCode: number;
    lkpStateTypeId: number;
    stateName: string;
    status: number;
    effectiveDt: string;
    expDt: string;
    isDisabled?: boolean;
    isUpdateOrRemove?: string;
    country: Country;
    features: any;
    type: number;
    nameWithStatus: string;
}