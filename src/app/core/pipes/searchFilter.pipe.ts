import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchFilter",
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: any[], keyValue: string): any {
    if (!value || !keyValue) return value;
    return value.filter(mob => 
        mob.name.toLowerCase().includes(keyValue.toLocaleLowerCase()) || 
        JSON.stringify(mob.deviceId).includes(keyValue.toLocaleLowerCase())
    )     
  }
}