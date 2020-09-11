import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable({
	providedIn: 'root'
})
export class CommonService {

	constructor() { }

	setExpiryDate(effectiveDate,isInactive) {
		if(!isInactive){
            return moment(effectiveDate).format('YYYY-MM-DD');
        }
	}

}
