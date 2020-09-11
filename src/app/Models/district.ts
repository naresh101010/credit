import { State } from './state';
import { Country } from './country';

export class District {
    id?: number;
    descr: string;
    ewayblInterTh: number;
    ewayblIntraTh: number;
    lkpStateTypeId: number;
    districtName: string;
    status: number;
    effectiveDt: string;
    expDt: string;
    isUpdateOrRemove?: string;
    isDisabled?: boolean;
    nameWithStatus: string;
    state?: State;
    type: number;
    country?: Country;
}