import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

    transform(arrList:Array<any>, key?: any): any {
        
        if(arrList.length ==0) return ;
        let sortedList = arrList.sort((a, b) => {
            if(!a[key]) return ;
            return a[key].toString().localeCompare(b[key])
        })

        return sortedList;
    }

}
