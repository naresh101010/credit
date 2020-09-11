import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { throwError as observableThrowError } from "rxjs";

import { AppSetting } from "./app.setting";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class CommonService {
  menuFlg: boolean = false;
  private menuFlgSub = new BehaviorSubject<boolean>(false);
  public menuFlgSub$ = this.menuFlgSub.asObservable();

  constructor(private http: HttpClient) {
    this.greeting();
    setInterval(() => {
      this.greeting();
    }, 8000);
  }

  // this functioon toggle menuFlg and emit to menuFlg$
  toggleMenuFlg() {
    this.menuFlgSub.next((this.menuFlg = !this.menuFlg));
    window["menu"].flg = !this.menuFlg;
  }

  hidemenu() {
    this.menuFlgSub.next(false);
    window["menu"].flg = false;
    let nav = document.getElementsByClassName("nav")[0];
    if (nav) {
      nav.classList.remove("show");
    }
  }

  // global dashboard card
  getDeshboardCard() {
    let cards = JSON.parse(
      sessionStorage.getItem("extracted_permissions")
    ).filter((v) => {
      if (v.childMenu.length > 0) {
        return v;
      }
    });
    //extract single menu
    let simpleMenu = JSON.parse(
      sessionStorage.getItem("all")
    ).data.responseData.menu.filter((v) => {
      if (v.childMenu[0].childMenu.length == 0) {
        return v;
      }
    });
    cards = [...cards, ...simpleMenu];
    return cards;
  }

  // greeting user
  greeting() {
    let myDate = new Date();
    let hrs = myDate.getHours();

    let greet;

    if (hrs < 12) greet = "Good Morning";
    else if (hrs >= 12 && hrs <= 17) greet = "Good Afternoon";
    else if (hrs >= 17 && hrs <= 24) greet = "Good Evening";
    window["greet_msg"] = {
      msg: greet,
      msgListener: function (val) {},
      set m(val) {
        this.msg = val;
        this.msgListener(val);
      },
      get m() {
        return this.msg;
      },
      getGreetMsg: function (listener) {
        this.msgListener = listener;
      },
    };
  }

  broadCastMessage() {
    var headerData = {
      authorization: sessionStorage.getItem("access-token"),
      userId: JSON.parse(sessionStorage.getItem("userDetails")).userId,
    };
    var headers = new HttpHeaders(headerData);
    return this.http
      .get<any>(
        AppSetting.API_ENDPOINT +
          "secure/v1/dashboard/broadcastMessages/latest/5/true",
        { headers: headers }
      )
      .pipe(
        catchError((error: Response) => {
          return observableThrowError("Something went wrong");
        })
      );
  }

  getDragDropData() {
    var userId = JSON.parse(sessionStorage.getItem("userDetails")).userId;
    var headerData = {
      authorization: sessionStorage.getItem("access-token"),
      userId: userId,
    };
    var headers = new HttpHeaders(headerData);
    return this.http
      .get<any>(
        AppSetting.API_ENDPOINT + "secure/v1/dashboard/bookmark/" + 0,
        { headers: headers }
      )
      .pipe(
        catchError((error: Response) => {
          return observableThrowError("Something went wrong");
        })
      );
  }
}
