import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'statusDesc'
})
export class StatusDescPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let status;
        if (value == 0) {
            status = "INACTIVE";
        } else if (value == 1) {
            status = "ACTIVE";
        }
        return status;
    }

}
