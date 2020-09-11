import { Country } from './country';
import { District } from './district';

export class City {
    id?: number;
    descr: string;
    effectiveDt: string;
    ewayblInterTh: number;
    ewayblIntraTh: number;
    expDt: string;
    gstNum: string;
    gstStateCode: number;
    isUpdateOrRemove: string;
    lkpStateTypeId: number;
    stateName: string;
    status: number;
    cityName: string;
    type: number;
    nameWithStatus: string;
    district: District;
}