import { Directive, HostBinding, HostListener } from "@angular/core";
@Directive({
  selector: "[toggleMe]"
})
export class ToggleDirective {
  @HostBinding("class.active") active: boolean = false;
  // @HostBinding("class.deactive") deactive: boolean = true;
  @HostListener("click") hasReleased(event) {
    this.active = !this.active;
    // this.deactive = !this.deactive;
  }
}
