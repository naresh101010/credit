import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

    transform(value: any, format?: any): any {
        if(!value){
            return "-";
        }
        let returnData;
        if (format) {
            returnData = moment(value).format(format);
        } else {
            returnData = moment(value).format('DD-MM-YYYY');
        }

        return returnData;
    }

}
