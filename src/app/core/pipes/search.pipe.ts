import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "search",
})
export class SearchPipe implements PipeTransform {
  transform(value: any[], key: string, keyValue: string): any {
    // console.log("value", value);
    // console.log("key", key);
    // console.log("keyValue", keyValue);
    if (!key || !keyValue) return value;
    console.log('keyValue', keyValue)
    const lowerCaseKeyVal = keyValue.toString().toLowerCase();
    // console.log("lowerCaseKeyVal", lowerCaseKeyVal);
    const filterData = value.filter((el) => {
      // console.log("el[key]", el[key]);
      const val = el[key].toString().toLowerCase();
      return val.indexOf(lowerCaseKeyVal) > -1;
    });
    return filterData;
  }
}