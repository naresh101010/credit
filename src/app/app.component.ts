import {
  Component,
  OnInit,
  ViewEncapsulation,
  ApplicationRef,
  NgZone,
} from "@angular/core";
import { Router, Event, NavigationStart } from "@angular/router";

@Component({
  selector: "navbar-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  showNav: boolean = false;
  title = "navbar";
  greenHeader = false;
  constructor(
    private router: Router,
    public ref: ApplicationRef,
    private ngZone: NgZone
  ) {
    console.log('123456789 -- 28 aug.')
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (
          event.url == "/login" ||
          event.url.indexOf("/document-upload") !== -1
        ) {
          this.showNav = false;
          this.appendCss("hidden");
        } else if (sessionStorage.getItem("access-token")) {
          this.appendCss("scroll");
          this.showNav = true;
        } else {
          window.location.href = "/login";
        }

        // show green header
        if (
          event.url == "/user-management/object" ||
          event.url == "/user-management/user" ||
          event.url == "/user-management/role" ||
          event.url == "/mdm/branch" ||
          event.url == "/mdm/commandment" ||
          event.url == "/mdm/geography" ||
          event.url == "/mdm/lookup" ||
          event.url == "/mdm/manage-route" ||
          event.url == "/mdm/vehicle" ||
          event.url == "/mdm/notepad" ||
          event.url == "/mdm/zone-matrix/logistic" ||
          event.url == "/mdm/zone-matrix/rate-group" ||
          event.url == "/mdm/zone-matrix/zone" ||
          event.url == "/user-management" ||
          event.url == "/mdm" ||
          event.url == "/user-management/broadcast"
        ) {
       
          this.ngZone.run(() => {
            this.greenHeader = true;
          });
        } else {
          // alert('hide')
          this.ngZone.run(() => {
            this.greenHeader = false;
          });
        }
        //end show green header
      }
    });
  }

  ngAfterViewInit() {
    // if screen size in less than 1024 then hide menu on init
    if (window.innerWidth < 1024) {
      let element = document.getElementById("feature_holder");
      element.classList.remove("menu");
    }
  }

  ngOnInit() {

    //toggle menu
    window["menu"] = {
      menuFlg: false,
      set flg(flg) {
        this.menuFlg = flg;
        let element = document.getElementById("feature_holder");
        let nav = document.getElementsByClassName('nav')[0];
        if (this.menuFlg) {
          element.classList.remove("menu");
          if(nav){
            nav.classList.remove("show");
          }
          
        } else {
          element.classList.add("menu");
          if(nav){
            nav.classList.add("show");
          }
        }
      },
    };
    //end toggle menu

    // ================================= clean dom before switch app
    window.addEventListener("single-spa:before-routing-event", function () {
      if (path().indexOf("/mdm") != -1) {
        notIt("mdmContainer");
      } else if (path().indexOf("associate-management-air") != -1) {
        // notIt("associateManagementBooking ");
      } else if (path().indexOf("associate-management-cargo") != -1) {
        // notIt("associateManagementBooking ");
      } else if (path().indexOf("associate-management-booking") != -1) {
        notIt("associateManagementBooking ");
      } else if (path().indexOf("associate-management-delivery") != -1) {
        notIt("associateManagementDelivery");
      } else if (path().indexOf("associate-management-network") != -1) {
        notIt("associateManagementNetwork");
      } else if (path().indexOf("user-management") != -1) {
        notIt("userContainer");
      } else if (path().indexOf("asso_air-contract") != -1) {
        // notIt("associateManagementBooking ");
      } else if (path().indexOf("asso_booking-contract") != -1) {
        notIt("associateContainer");
      } else if (path().indexOf("asso_network-contract") != -1) {
        // notIt("associateManagementBooking ");
      } else if (path().indexOf("asso_delivery-contract") != -1) {
        // notIt("associateManagementBooking ");
      } else if (path().indexOf("asso_cargo-contract") != -1) {
        // notIt("associateManagementBooking ");
      } else if (path().indexOf("contract/credit") != -1) {
        notIt("contractContainer");
      } else if (path().indexOf("prc-contract") != -1) {
        notIt("prcContainer");
      } else if (path().indexOf("retail-contract") != -1) {
        notIt("retailContainer");
      } else if (
        path().indexOf("login") != -1 ||
        path().indexOf("dashboard") != -1
      ) {
        notIt("all");
      }
    });

    function path() {
      return window.location.pathname;
    }
    function notIt(whichItem) {
      document.querySelectorAll(`#feature_holder .holder`).forEach((v, i) => {
        if (!v.className.includes(whichItem)) {
            document.getElementsByClassName("holder")[i].innerHTML = "";
        }
      });
    }
    // ================================= end clean dom before switch app


 
  }
  appendCss(v) {
    let css = "body { overflow-y: " + v + " !important; }",
      head = document.head || document.getElementsByTagName("head")[0],
      style = document.createElement("style");
    style.type = "text/css";
    head.appendChild(style);
    style.appendChild(document.createTextNode(css));
  }
}
