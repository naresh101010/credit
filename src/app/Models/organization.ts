import { ListOfBusiness } from './list-of-business';

export class Organization {
    id?:number;
    countryId:number;
    descr:string;
    isUpdatedOrRemoved:string;
    orgName:string;
    status:number;
    isUpdateOrRemove?:string;
    orgLobMap:Array<ListOfBusiness>;
}