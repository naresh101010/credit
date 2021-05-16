import { Component, HostListener, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { PlatformLocation } from "@angular/common";
declare const require: any;
const corecss = require('../core.css');
const style_css = require('../styles.css');


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = "app";
  settimeout: any;

  constructor(private router: Router, location: PlatformLocation) {
    console.log("naresh 99#")
  }

  core_css = corecss;
  style_css = style_css;

  ngOnInit() {    
    var container;
    if (/Edge/.test(navigator.userAgent)) {
      container = document.getElementsByTagName("head")[0];
    } else {
      container = document.getElementsByClassName("bookingsContainer")[0];
    }
    const style: any = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(this.core_css.default + this.style_css.default));
    container.appendChild(style);    
  }

  showMessage(message: string, type?: string) {
    let snackbar = document.getElementById("snackbar_module");
    let snack_msg = document.getElementById("snack_msg");
    snackbar.style.display = "block";
    snackbar.style.animation = "fadeIn 0.5s linear";
    snackbar.style.background = "#27AE60";
    snackbar.style.textTransform = "capitalize";
    if (type == "danger") {
      snackbar.style.background = "#ef4848";
    }
    else if (type == 'warning'){
      snackbar.style.background = "rgb(248, 148, 6)";
    }
    snack_msg.innerText = message;
    this.removeToast(snackbar);
  }

  cleartimeout() {
    clearTimeout(this.settimeout);
  }

  removeToast(snackbar = null) {
    if (!snackbar) {
      snackbar = document.getElementById("snackbar_module");
    }
    this.settimeout = setTimeout(() => {
      snackbar.style.animation = "fadeOut 0.5s linear";
      setTimeout(() => {
        snackbar.style.display = "none";
      }, 300);
    }, 3500);
  }
}
