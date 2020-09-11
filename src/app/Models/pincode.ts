import { City } from './city';
import { PincodeFeature } from './pincode-feature';
export class Pincode {
    id?: number;
    descr: string;
    effectiveDt: string;
    expDt: string;
    isUpdateOrRemove: string;
    lkpSafextTypeId: number;
    pincode: string;
    status: number;
    cityDto: City;
    pincodeFeature?: Array<PincodeFeature>;
}