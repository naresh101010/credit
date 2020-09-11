import { Component, OnInit, HostListener } from "@angular/core";
import { CommonService } from "../common.service";
import { Router, NavigationStart, Event } from "@angular/router";

@Component({
  selector: "navbar-slide-menu",
  templateUrl: "./slide-menu.component.html",
  styleUrls: ["./slide-menu.component.css"],
})
export class SlideMenuComponent implements OnInit {
  navItems: any;
  menuFlg = false;
  opened = "true";
  activeMenuGroup;
  // user_without_permi = false;

  constructor(private router: Router, private CommonService_: CommonService) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {

        // activate target menu tab
        document.querySelectorAll(".menuBtn").forEach((v) => {
          v.classList.remove("active");
        });
        if (document.getElementById(event.url.replace("/", ""))) {
          document
            .getElementById(event.url.replace("/", ""))
            .classList.add("active");
        }
        // end activate target menu tab

        // open menu group section
        document.querySelectorAll(".parent").forEach((v) => {
          v.classList.remove("active");
        });

        document.querySelectorAll(".parent").forEach((v) => {
          let item_: any = v;
          if (item_.innerText.trim() == "MDM" && event.url.includes("/mdm/")) {
            console.log("2");
            item_.classList.add("active");
          } else if (
            item_.innerText.trim() == "USER MANAGEMENT" &&
            event.url.includes("/user-management/")
          ) {
            item_.classList.add("active");
          } else if (
            item_.innerText.trim() == "CONTRACT" &&
            (event.url.includes("/contract/") ||
              event.url.includes("/prc-contract/") ||
              event.url.includes("/retail-contract/"))
          ) {
            item_.classList.add("active");
          } else if (
            item_.innerText.trim() == "ASSOCIATE MANAGEMENT" &&
            (event.url.includes("/associate-management-booking/") ||
              event.url.includes("/associate-management-air/") ||
              event.url.includes("/associate-management-cargo/") ||
              event.url.includes("/associate-management-network/") ||
              event.url.includes("/associate-management-delivery/"))
          ) {
            item_.classList.add("active");
          }
        });
        // end open menu group section




        
      }
    });

    // get nav data from sessionStorage
    this.navItems = this.getFromsessionStroage("menuNew");

    //get menu value
    this.CommonService_.menuFlgSub$.subscribe((v) => {
      this.menuFlg = v;
    });

    if (!sessionStorage.getItem("permissions")) {
      //if permission not persist
      this.menuFlg = false;
    }

    // which menu group open on OnInit

    this.activeMenuGroup = location.pathname
      .split("/")[1]
      .replace("-", " ")
      .toUpperCase();
  }

  togleMenuSection(event) {
    event.srcElement.className = "parent";
  }

  //get item from sessionStroage
  getFromsessionStroage(whichItem) {
    return JSON.parse(sessionStorage.getItem(whichItem));
  }

  flg: boolean = false;
  @HostListener("window:single-spa:before-routing-event")
  beforeRouting() {
    this.flg = true;
  }

  @HostListener("window:single-spa:routing-event")
  afterRoutingEvent() {
    setTimeout((_) => {
      this.flg = false;
    }, 500);
  }
}
