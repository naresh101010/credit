import { Pipe, PipeTransform } from "@angular/core";
var per: any = [];
@Pipe({ name: "nvaPipe" })
export class NavPipe implements PipeTransform {
  transform(value) {
    per.push(value);
    // sessionStorage.setItem("extracted_permission", JSON.stringify(per));
    return "";
  }
}
