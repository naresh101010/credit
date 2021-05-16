import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '../common.service';
import { map } from 'rxjs/operators';
@Pipe({
  name: 'mapToBranchName'
})
export class MapToBranchNamePipe implements PipeTransform {
constructor(private commonService: CommonService) {}
  transform(id: number) {
    // console.log(id);
    if (!id) {
      return '';
    }
    return this.commonService.getBranchDetailByBrancId([id]).pipe(map((resp: any) => { 
      console.log('resp', resp);
      if (resp && resp.length) {
        return resp[0].branchName
      }
      return '';
    }));
    // console.log('branchame', branchame);
  }

}
