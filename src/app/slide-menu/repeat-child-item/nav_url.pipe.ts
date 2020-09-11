import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "nvaUrlPipe" })
export class NavUrlPipe implements PipeTransform {
  transform(value) {
    return value.toLowerCase().replace(" ", "-");
  }
}
