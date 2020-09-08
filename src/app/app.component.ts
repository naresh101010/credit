import { Component, HostListener } from "@angular/core";
import { AuthorizationService } from "./core/services/authorization.service";
import { AppSetting } from "./app.setting";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent  {
  style_css = `html {font-size: 45.5%;}
  body {font-size: 1.4rem; overflow-x: hidden; overflow-y: auto; box-sizing: border-box;font-family: 'Open Sans', sans-serif !important; line-height: 1.8; }
  ::-webkit-scrollbar {width: .7rem;}
  ::-webkit-scrollbar-track {background: #EBEBF2;}
  ::-webkit-scrollbar-thumb {background: #6A6868; border-radius: 2.0rem;}

  .userContainer .margintopone{margin-top: 1rem !important;}
  ::-webkit-scrollbar-thumb:hover {background: #585757;border-radius: 2.0rem;}
  .userContainer #bell{position: relative;right: 8.5rem; top: .3rem; color: #6A6868;}
  .broadcastDatepic .mat-form-field-appearance-outline .mat-form-field-suffix{left: -2rem !important;}
  .broadcastDatepic .mat-form-field-appearance-outline .mat-form-field-flex{padding-left: .5rem !important;}
  .broadcastViewDatepic .mat-form-field-appearance-outline .mat-form-field-suffix{left: .5rem !important;}
  .broadcastDatepic .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{width: 2em !important; right: 2rem!important;}
  .userContainer .deleteMessage{font-size: 1.3rem !important; color: #B00020 !important;position: absolute !important;right: 0 !important;top: 0 !important;}
  .userContainer .deleteIconBroadcast{font-size: 2rem !important;color: #B00020 !important;position: relative;top: .6rem;}
  .userContainer .clickBookMark{font-size: 2.5rem !important;padding-left: 1rem;position: relative;top: -.5rem;color: yellow !important;}
  .userContainer .bookMark{padding-left: 1rem;position: relative;top: -2.3rem;color: #1a1a1a !important;color: orange !important;}
  .userContainer .bookMark2{position: relative;color: orange !important;}
  .userContainer .clickBookMark2{position: relative;color: yellow !important;}
  .userContainer .clickheartIcone{font-size: 2.5rem !important;float: right !important; color: wheat !important;}
  .userContainer .heartIcon{font-size: 2.5rem !important;float: right !important; color: #B00020 !important;}
  .userContainer .heartIcon2{float: right !important;color: green !important;margin-top: -1.5rem !important;}
  .userContainer .clickheartIcone2{float: right !important; color: wheat !important;}
  .userContainer .paddingRadius{border-radius: 1rem !important;padding: 1.8rem !important;}
  .userContainer .secondRow p{cursor: pointer; padding-left: 1rem;width: 50%;font-size: 2.0rem;font-weight: bold;color: #27AE60;margin-bottom: 0 !important;}
  .userContainer .secondRow{display: flex;}
  .userContainer .count_card {background: #fff;border-radius: 8px;height: 13rem;padding: 0 !important;}
  .userContainer .iconImage{float: right;width: 5rem;height: 5rem;margin-left: 2rem;margin-top: 3rem;}
  .userContainer .messageIcon{margin-top: -2rem !important;right: 7.4rem;font-size: 8rem;color: #27AE60 !important;float: right; position: absolute;}
  .userContainer .broadcastMessage{margin-left: auto !important;margin-right: auto !important;width: 91% !important;}
  .userContainer .broadcastColumnsWidth{width: 16rem !important;overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .userContainer .broadcastMessageWidth{cursor: pointer; width: 60rem !important; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;color: #27AE60;}
  .userContainer .orange {color: orange !important;}
  .userContainer .black {color: black !important;}
  .userContainer .red {color: #B00020 !important;}
  .userContainer .deselected_bookmark { color: #1a1a1a !important;}
  .userContainer .iconImage{float: right;
    width: 6.5rem;
    height: 6.5rem;
    position: absolute;
    top: 5.2rem;
    right: 3.2rem;}

  @media only screen and (max-width: 767px){
    .userContainer .count_card {margin-bottom: 15px;}
    .userContainer .mo_mb10 {margin-bottom: 10px;}
    .mo_float_left {float: left;}
  }
  .userContainer #profile{position: relative; right: 101%; letter-spacing: 0; color: #1A1A1A;}
   .userContainer #profileimg{position: relative;  right: 1%;}
   .userContainer #titleheading{ width: 110%; margin-top: -12%; height: 5.1rem;}
   .userContainer #heading{letter-spacing: 0; color: #1A1A1A;position: absolute;top: -5.5rem;left: .2rem;}
   .userContainer #usersearchicon{position: relative; top:5.5rem; font-size: 3.5rem; color: #6A6868;}
   .userContainer #plusicon{color: #27AE60;position: absolute;right: 1rem;top: .6rem;z-index: 10;font-size: 3.5rem;}
   .userContainer #userinput{font-size: 1.7rem; position: relative; top: 2.6rem; left: 3.9rem; font-weight: bold;}
   .userContainer .RoleMH{font-size: 1.7rem; font-weight: bold; color: #1A1A1A; }
   .userContainer #rolesearch{position: relative; top:2.5rem; font-size: 3.5rem; color: #585757;}
   .userContainer .green-border{background: #27AE60; border:.05rem solid #27AE60; margin-top: -.6rem; margin-bottom: 0rem;}
   .userContainer .green-border-heading{background: #27AE60; border:.05rem solid #27AE60;  margin-bottom: 1.0rem; margin-top: .5rem;}
   .userContainer .fa-search{position: absolute;font-size: 2.0rem;opacity: .6;top: 0rem;}
  /* .mat-form-field-underline, .mat-form-field-underline.mat-focused{background-color: #FAFAFA; border-color: #fff;} */
  .userContainer hr{margin-top: 0;}
  /* updated new */

   .userContainer .breadcrumb {color:#1a1a1a; font-size:1.4rem; font-weight:normal; text-align:left; position: absolute;top: 0%; font-family:'Open Sans', sans-serif; background: transparent;}
   .userContainer .breadcrumb .fa-caret-right {color:#1a1a1a; padding:.5rem;}
   .userContainer .breadcrumb1{font-family: 'Open Sans', sans-serif;color:#1a1a1a; font-size:1.4rem; font-weight:normal; position: absolute;top: 0%; left: 12%; z-index: 2;}
   .userContainer .breadcrumb1 .fa-caret-right {color:#1a1a1a; padding:.5rem;}
   .userContainer .breadcrumb2{font-family: 'Open Sans', sans-serif; color: #1a1a1a; font-size: 1.4rem;font-weight: normal; position: absolute;top: 1.3rem; left: 8rem; z-index: 2;}
   .userContainer .breadcrumb2 .fa-caret-right {color:#1a1a1a; padding:.5rem;}
  /* User Management */
   .userContainer #RoleS{color: #27AE60; position: absolute; font-size: 4.0rem; right: 4%; top: 12%;}
   .userContainer input{text-transform: uppercase;}
   .userContainer input:focus {outline: none; border-color: #27AE60; box-shadow: 0 0 0 0;}
   .userContainer input:hover{outline: none; border-color: #27AE60; box-shadow: 0 0 0 0;}
   .userContainer .form-control{width: 100%;box-shadow: 0px .1rem .2rem #00000029;border: .1rem solid #6A6868; border-radius: .2rem;height: 2.7rem;
          font-size: 1.3rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
   .userContainer .form-control:focus{border: .2rem solid #27AE60;  box-shadow: none; -webkit-box-shadow: none;}
   .userContainer mat-panel-title{font-weight: bold;}
   .userContainer .error{ height: 0px; margin:0px; padding: 0px;}
   .userContainer a{ color:#27AE60; cursor: pointer;}
  /* view permission */
   .userContainer .sectionOpen{  width: 100%;  height: auto;  }
  /* View Permission */
   .userContainer .viewpermission{  width: 100%;  height: 0%;  background:#EBEBF2;  display: flex;}
   .userContainer .viewpermi{  width: 25%;  height: 3.5rem;  border-bottom: .1rem solid #EBEBF2;  display: flex;  justify-content: center;  align-items: center;}
   .userContainer .viewpermi1{  width: 25%;  height: 3.5rem;  display: flex;  justify-content: center;  align-items: center;  }
   .userContainer .viewpermission1{  width: 100%;  height: 3.5rem;  display: flex;}
   .userContainer .scrollbar{ overflow-y:scroll;  border-bottom: .1rem solid #EBEBF2;   font-size: 1.4rem;}
   .userContainer .PermissionMapping{ position: relative;  left: .3rem;  top: .8rem;  font-size: 1.4rem;  font-weight: bold;}
   .userContainer .userheading{position: relative; font-size: 1.5rem; left: 0px; top: 1.7rem;}
  /* 18NOv2017 */

   .userContainer #lending{height: fit-content; max-width: 100%; box-shadow: 0.05rem  0.05rem 0.05rem #ccc;  top:6.5rem; margin-bottom: 11rem!important;}
   .userContainer #lending2{margin-top: 6.5rem;box-shadow: 0.05rem  0.05rem 0.05rem #ccc; width: 100%; margin-bottom: 11rem!important;}
   .userContainer #lending3{margin-top: 2.0rem;box-shadow: 0.05rem  0.05rem 0.05rem #ccc; width: 100%; margin-bottom: 11rem!important;}

  /* 20 October */
  .userContainer select option:hover{background: #27AE60}
    .userContainer .mat-dialog-container {border-radius: 6.0rem;}
  /* for mat-expension-border */
  .userContainer  #box-shadow{box-shadow: none; padding-top: 0; padding-bottom: 0; }
    .userContainer .mat-expansion-panel-header-title{border-bottom: .1rem solid #1a1a1a;}
    .userContainer #box-shadow{box-shadow: none; padding-top: 0; padding-bottom: 0; }
  .userContainer  .mat-expansion-panel-header { padding: 0px 1.2rem;}
  .userContainer  h2{font-family: 'Open Sans', sans-serif;}
  .userContainer  .mat-card{box-shadow: none !important; font-family: 'Open Sans', sans-serif !important;}
  .userContainer  .control-label{padding-left: 0px !important;}
  .userContainer  .permission{position: relative; top: 3.8rem; left: 2rem; font-size: 1.6rem;}
  .userContainer .user_create_table td.mat-cell{padding: 0 1rem !important}
  .userContainer .broadcastText{font-size: 1.6rem !important; font-weight: 600;}
  /* Navigation page */

  .userContainer .paddingrightzero{padding-right: 0 !important;}
  .userContainer .broadCastfonts{font-size: 1.6rem; word-break: break-word !important}
  .userContainer .broadcastMarginT{margin-top: 1.5rem !important;margin-left: 0 !important; margin-right: 0 !important;}
  .userContainer .broadcastPad{padding-top: .4rem !important;}
  .datePick .mat-icon-button{left: 1rem !important;}
  .broadError{color: red !important;display: block !important;position: absolute;}

  /* End of Navigation Page */
  /* dashboard */
   .userContainer  .dashboard-heading{position: absolute !important; left: 8rem !important; top: 1.7rem !important;font-size: 2.4rem !important; bottom: 1.6rem;background: transparent;}

   .userContainer  .banner-input1{border: none; margin-left: .6rem; position: relative; width: 93%;left: 2.4rem;}
   .userContainer  .example-container {overflow: auto;overflow-wrap: break-word; box-shadow: none !important;}
   .userContainer  #routerlink{font-size: 1.7rem;padding-bottom: .3rem;color: BLACK;font-weight: bold; cursor: pointer; }
   .userContainer  #dashboard-side-search{position: static; font-size: 2.0rem;opacity: 0.4;color: #585757;}
  /* dashboard */
  /* Main-section */
  .userContainer .page-section{
      width: 100% !important;
      /* margin-left: 8.1rem !important; */
      height: 100vh !important;}
  .userContainer .input-label{height: 2.2rem; font-size: 1.6rem;}
  .userContainer .page-header {font-size: 2.4rem;font-weight:normal;margin:2.0rem 0px 0px 0px;font-family: 'Open Sans', sans-serif;}

  /* end of section */

  /* Role table */
  .userContainer  tr.mat-header-row{height: 4.0rem !important;}
   .userContainer  th{background: #F1F1F1; font-size: 1.6rem !important; color: #1a1a1a !important; font-weight: bold !important;}
   .userContainer  .mat-dialog-table{max-height: 18.2rem; overflow: auto; overflow-wrap: break-word; margin-top: 1.0rem;}
   .userContainer  .overlay-heading{font-size: 1.8rem; font-weight: bold; height: 1.0rem;margin-top: 2.15rem;}
  /* end of table */
  /* Advance Search */
  .userContainer .select{width: 100%; height: 2.7rem; font-size: 1.0rem; padding: 0;border-radius: .2rem;}
  .userContainer .zonalheadingbar{background: #F1F1F1; height: 3.5rem; font-weight: bold; display: flex;  align-items: center; border-right: .1rem solid #fff;}

  /* Advance Search */

  /* Media Queries */
  /* Media Queries */







  .userContainer  .th-text{margin: 0 0 0 !important;}
  .userContainer  .th-text-view{cursor: pointer;margin: 0 0 0 !important;width: fit-content;}
  @media only screen and (max-width: 600px) {
      .userContainer  .dashboard-first-container{padding-right: 2.0rem;padding-left: 2.0rem;}
      .userContainer  .th-text{padding-left: 1.0rem;}
      /* .dashboard-heading{left: 4% !important;} */
      .userContainer  .breadcrumb2{left: 8rem !important;}
     }

     /* .overlay {display: none;} */

      .userContainer  .toast  .close {display: none; }
      .userContainer  .mat-paginator-page-size {margin-right: .8rem;}
     .userContainer  .mat-paginator-page-size-label { margin: 0px 2.1rem !important; width:50%; text-align: right!important;}



     .userContainer .mat-paginator-page-size-select {
        width: 20%!important;
        float: right!important;
        text-align: left!important;
      }

     .userContainer  td.mat-calendar-body-cell {
          /* height: 2px!important; */
          font-size: 1.5rem;
          /* background: red; */
          line-height: 2rem;
          padding: 1.8rem 0 !important;
      }
      .userContainer  .breadcrud_holder {
      display: flex;
      /* margin-left: 8rem; */
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      flex-direction: row;
      -webkit-box-align: end;
      align-items: flex-end;
      -webkit-box-pack: start;
      justify-content: flex-start;
      width: 98%;

  }

  .userContainer  .breadcrud_holder .leftSide {
      width: 93rem;
    }

    .userContainer .leftSide h2{
        font-weight: 600;
    }
     .breadcrud_holder .rightSide {
      /* margin-left: 45%; */
      width: 77rem;
      text-align: right;
  }


  .userContainer  .breadcrud_holder h2 {
      margin-top: 0;
      margin-bottom: 5px;
  }

  .userContainer  .breadcrud_holder.details{
      margin-left: 0;
      margin-bottom: 0rem;
  }

  .userContainer  .breadcrud_holder.details .headerMsg{
      color: #27ae60 !important;
      position: fixed;
      font-size: 1.6rem;
      right: 11rem;
      top: 10.5rem;
      line-height: 17px;
  }


  .userContainer  span.fa.fa-caret-right {
      margin-left: 5px;
      margin-right: 2px;
  }



   .example-button-row a, .example-button-row button {
          margin-right: .8rem;
      }
      .mat-raised-button.mat-primary {
          background-color: #81c784;
      }
      .btn1.mat-raised-button.mat-primary {
          // background-color: #27ae60;
          border-radius: 2rem;
          font-size: 1.6rem;
          color: #fff;
      }
      .mat-raised-button {
          color: currentColor;
          font-family: 'Open Sans',sans-serif!important;
          line-height: 3.6rem!important;
      }
      .mat-raised-button:not([class*=mat-elevation-z]) {
          box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
      }
      .ng-select.ng-select-disabled .ng-arrow-wrapper {
          cursor: default;
      }
      .ng-select .ng-arrow-wrapper {
          cursor: pointer;
          position: relative;
          text-align: center;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
      }


      .userContainer a.downloadFileFonts {color: #fff}
      .userContainer .head_container {width: 100% !important; padding-left: 0; margin-top: -4rem;}
      .userContainer a.downloadFileFonts:hover {color: #fff !important;}
      .userContainer .bread_crumb a, .userContainer .bread_crumb span {
          color: #fff;
          font-size: smaller;
      }
      .userContainer .bread_crumb a:hover, .userContainer .bread_crumb span:hover {
          color: #fff !important;
      }

    .mat-form-field-suffix { margin-right: -12px;}

   `;


   core_css = `/* @import "~@ng-select/ng-select/themes/default.theme.css"; */
   a:focus, a:hover {color: #27AE60 !important;text-decoration: none !important;}
   .material-icons {color:  #81C784 }
   *:focus {outline: 0 !important;}
   /* SCROLL BAR */
   ::-webkit-scrollbar {width: .7rem;}
   ::-webkit-scrollbar-track {background: #EBEBF2;}
   ::-webkit-scrollbar-thumb {background: #6A6868; border-radius: 2.0rem;}
   ::-webkit-scrollbar-thumb:hover {background: #585757;border-radius: 2.0rem;}
   /* SCROLL BAR END */
   /* BUTTON */
   .example-button-row button, .example-button-row a {margin-right: .8rem; }
   .mat-raised-button.mat-primary {background-color:#81C784;}
   .mat-raised-button {color : currentColor; font-family: 'Open Sans', sans-serif !important ;     line-height: 3.6rem !important; }
   .mat-raised-button:not([disabled]):hover {    background-color: rgb(33, 110, 36);  }
   .mat-raised-button[disabled] {color : #1a1a1a !important; background-color: #F1F1F1 !important;}
   .btn1 {color: rgb(49, 46, 46);background-color: #27AE60; border-radius: 2.0rem 2.0rem 2.0rem 2.0rem;
      font-size: 1.6rem; }
   .btn1:not([disabled]):hover {background-color: rgb(18, 107, 55); color: #fff; }
    /* END OF BUTTON */

   .mat-divider {border-top-color: #81C784; border-top-width: .2rem;}

    /* Mat Radio Button */
   .mat-radio-button {font-family: 'Open Sans', sans-serif !important;}
   .mat-radio-label-content{padding-left: 0rem !important;font-weight: normal; font-size: 1.6rem;margin-top: -1rem;}
   .mat-radio-outer-circle{width: 1.6rem !important; height: 1.6rem !important;border-width: .2rem !important;}
   .mat-radio-inner-circle{width: 1.6rem !important; height: 1.6rem !important;}
   .mat-radio-ripple{width: 0rem !important; height: 0rem !important;}
   .mat-radio-button.mat-accent .mat-radio-inner-circle {background-color: #27AE60;}
   .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {border-color: #27AE60;}
   .mat-radio-button ~ .mat-radio-button {margin-left: 1.6rem;}
   .mat-radio-inner-circle{width: 1.6rem !important; height: 1.6rem !important;}
   /* end of Radio Button */

   /* mat-expansion */
   .mat-expansion-panel-spacing {margin: 0;}
   .mat-expansion-indicator{transform: rotate(0deg) !important;border-style: none; width: 0; height: 0; border-left: .7rem solid transparent;border-right: .7rem solid transparent;
    border-top: 1.0rem solid #1a1a1a;}
   .mat-expansion-indicator::after{border-style: none;  color: #fff;}
   .mat-expansion-indicator.mat-expanded{transform: rotate(0deg) !important;}
   .mat-expansion-panel-header.mat-expanded{color:#27AE60; border-bottom: .1rem solid #27AE60;}
   .mat-expansion-panel-header {  padding: 0rem !important;border-bottom: .1rem solid #ccc;height: 5.0rem !important;
     font-size: 1.6rem; font-family: 'Open Sans', sans-serif !important}
   .mat-expansion-panel-content{font-family: 'Open Sans', sans-serif !important}
   .mat-content.mat-expanded {border-bottom: .1rem solid red !important; font-weight: bold; color: #27AE60;border-color: #27AE60;}
   .mat-content { font-weight: bold; padding-top: 2.0rem;}
   .mat-expansion-panel-body {padding: 0rem !important}
   .mat-card{padding:2.5rem 3.0rem !important; font-family: 'Open Sans', sans-serif !important;}
   .mat-expansion-panel-spacing {margin: 0px 0;}
   .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']):hover { background: white; }
   /* mat-expansion */

   /* For Select */
   .mat-form-field{top: -.5rem;}
   .mat-form-field.mat-focused.mat-primary .mat-select-arrow{color: #27AE60;}
   /* .mat-icon-button{position: relative; top: -.5rem; left: .6rem;} */
   .mat-primary .mat-option.mat-selected:not(.mat-option-disabled) {color: #1a1a1a !important;}
   .mat-form-field-appearance-outline{margin: 0}
   .mat-form-field-appearance-outline .mat-form-field-outline{position: absolute; top: .6rem; color: #6a6868 !important ; box-shadow: 0px .2rem .2rem #00000029;}
   .mat-select-panel:not([class*=mat-elevation-z]) {box-shadow: none !important;
     border: .1rem solid #6A6868 !important; border-radius: .2rem !important;}
   .mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple) {background: #27AE60 !important;}
   .mat-form-field-outline{height: 2.7rem !important; width: 100% !important;}
   .mat-input-element{position: absolute; top: 0;}
   .mat-form-field-wrapper{height: 2.7rem;}
   .mat-select-trigger {margin-top:0rem !important;padding-top: 0rem !important;}
   .mat-form-field-infix {border-top: 0rem !important;top: 0rem !important;height: 2.0rem;right: 1rem;left: .01rem; font-size: 1.4rem!important;}
   .mat-form-field-infix {padding: 0rem !important; border-top: 0 solid transparent !important}

   .mat-select{position:absolute; top: 1.1rem; }
   .mat-option.mat-active{background-color: #27AE60 !important;}
   .ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-selected, .ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-selected.ng-option-marked {
     color: normal !important;}
   /* End of Select */

   /* Ng- Select */
   .ng-select .ng-select-container .ng-value-container {padding-left: .6rem !important;}
   .ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-marked {background-color:#27AE60 !important;color: #fff;}
   #ngselect.ng-dropdown-panel-items .ng-option.ng-option-marked {background-color:#27AE60 !important;color: #1a1a1a}
   .ng-select .ng-select-container{min-height: 2.7rem !important;border: .1rem solid #6A6868 !important; border-radius: .2rem !important;}
   .ng-select.ng-select-single .ng-select-container {height: 2.7rem !important;}
   .advance-search.ng-select-single .ng-select-container{background-color: #27AE60 !important; color: #fff !important; }
   .ng-dropdown-panel .ng-dropdown-panel-items .ng-option {padding: .2rem 1.0rem !important;}
   .ng-select.ng-select-opened>.ng-select-container{border: .1rem solid #27AE60 !important; border-radius: .2rem !important;}
   .ng-select.ng-select-single .ng-select-container .ng-value-container .ng-input {top: 0rem !important;}
   .ng-select .select-dropdown > div {z-index: 2 !important;}
   .ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-selected .ng-option-label, .ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-selected.ng-option-marked .ng-option-label {
     font-weight: normal !important ;}
   .advance-search.ng-select-opened>.ng-select-container .ng-arrow {border-color: transparent transparent #fff !important; }
   .ng-dropdown-panel.ng-select-bottom{border: .1rem solid #6A6868 !important; border-radius: .2rem !important; background:#fff}
   .ng-select .ng-arrow-wrapper .ng-arrow {border-color: #1a1a1a transparent transparent !important; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid transparent; margin: 0 4px;}
   #ngselect .ng-arrow-wrapper .ng-arrow {border-color: #fff transparent transparent !important;}
   .paddingleft{padding-left: 0 !important;}
   /* Ng-select */

   /* Data Picker */
    .mat-datepicker-toggle-active{color: none !important;}
    .mat-datepicker-content .mat-calendar{width: 29.6rem !important; max-height: 37.4rem !important;}
     .mat-icon-button {top: -.5rem !important; border-radius: 0rem !important;}
    .mat-calendar-body-selected{background-color: #27AE60 !important;}

   /* Data picker  */
   #profile-button{width: 100% !important; white-space: nowrap !important; overflow: hidden !important;text-overflow: ellipsis !important;font-size: 1.6rem !important; font-weight: 600 !important;position: relative !important;padding-top: 1rem !important; text-align: center !important;}
   .profile-name{position: relative;top: 1rem;    white-space: nowrap !important;overflow: hidden !important;text-overflow: ellipsis !important;}
   /* checkbox */
   .mat-checkbox-ripple{width: 0px !important; height: 0rem !important;}
   .mat-checkbox .mat-checkbox-frame {border-color: #6a6868; border-width: .2rem;}
   .mat-checkbox-checked .mat-checkbox-background {background-color: #81C784 !important;}
   .mat-checkbox-checked.mat-accent .mat-checkbox-background, .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
     background-color: #27AE60;}
   .mat-checkbox-layout .mat-checkbox-label{padding-left: .6rem !important;}
   .textareaoutline{width: 100%;box-shadow: 0px .1rem .2rem #00000029;border: .1rem solid #6A6868; border-radius: .2rem;font-size: 1.3rem; text-transform: uppercase; }
   .textareaoutline:focus{border: .2rem solid #27AE60; outline: none !important;  box-shadow: none; -webkit-box-shadow: none;}
   mat-panel-title{font-weight: bold;}
   .icon-font{font-size: 2rem !important;cursor: pointer !important; width: fit-content !important;}
   /* checkbox */
   /* .mat-icon{height: 2.4rem !important;} */
   /* .mat-icon-button {top: .3rem !important;} */
   /* ***********************************************
                         NAVIGATION
   *********************************************** */

   .form-group.required .control-label:after {
     content:"*";
     color:red;
   }
   .broadcastText{font-size: 1.6rem !important;font-weight: bold;}



   /* ***********************************************
                         LOGIN
   *********************************************** */
   .img{ width: 100%; min-height: 100%; height: 100%; background-image: url('../assets/images/login.jpg'); background-size:cover; background-repeat:no-repeat; background-attachment: fixed}
   .login-input{text-transform: none !important;}
   .positronx{text-decoration:none;color:#ffffff;}
   .box{position:relative;top:0;opacity:1; float:right;padding:6.0rem 5.0rem 4.0rem 5.0rem;width:100%;background:#fff;border-radius:1.0rem;
     transform:scale(1);-webkit-transform:scale(1);-ms-transform:scale(1);z-index:5;max-width:47.0rem; max-height: 42.0rem; margin-right: 12rem;}
   .box.back{transform:scale(.95);-webkit-transform:scale(.95);-ms-transform:scale(.95);top:-.2.0rem;opacity:.8;z-index:-1;}
   .box:before{content:"";width:100%;height:3.0rem;border-radius:1.0rem;position:absolute;top:-1.0rem;background:rgba(255, 255, 255, .6);left:0;transform:scale(.95);-webkit-transform:scale(.95);-ms-transform:scale(.95);z-index:-1;}
   .login-wrapper .example-form{min-width:100%;max-width:30.0rem;width:100%; margin-top: 3rem;}
   .login-wrapper {background: radial-gradient(circle, rgba(0,0,0,0) 1%, rgba(0,0,0,0.7371323529411764) 63%, rgba(0,0,0,0.7483368347338936) 100%);
     width: 100%; height: 100%;}
   .login-wrapper .example-full-width,.login-wrapper .btn-block{width:100% !important;}
   .login-wrapper mat-card-header{text-align:center !important;width:100% !important;display:block !important;font-weight:600 !important;}
   .login-wrapper mat-card-header mat-card-title{font-size:3.0rem !important;margin:0rem !important;}
   .login-wrapper .mat-card{padding:4rem 7rem 5rem !important;}
   .login-wrapper .mat-stroked-button{border: .1rem solid currentColor !important;line-height:5.4rem;background:#FFF7FA !important;}
   .login-wrapper .mat-form-field-appearance-legacy .mat-form-field-infix{padding:0.8375em 0 !important;}
   .rememberMe {color: #a6a6a6;font-weight: normal !important;font-size: 1.2rem !important;}
   .login-wrapper .mat-form-field-appearance-legacy .mat-form-field-underline{bottom: 0 !important; top: 3rem !important;}
   #loginInput{font-size: 1.6rem !important; padding-top: 1rem !important;}
   input:-internal-autofill-selected{background-color: transparent !important;}
   .login-wrapper .mat-focused .mat-form-field-underline .mat-form-field-ripple{background-color: #27AE60 !important;}
   .login-wrapper .mat-focused .mat-form-field-label{color:#27AE60 !important; font-size: 1.6rem !important;}


   /* ***********************************************
                         DASHBOARD
   *********************************************** */
   #dashboard-search {top: 6.3rem !important;}
   #dashboard-search-r {top: 3rem !important;}
   .mat-form-field {font-size: 1.6rem; width: 100%;}
   .viewlink{color:  #81C784;align-content: center;padding-left: 2.0rem;}
   .container{top: -5.1rem;}
   ::-webkit-input-placeholder {color: #6A6868; font-size: 1.4rem; }
   .banner-input1::placeholder {color: #6A6868; font-size: 1.4rem; font-weight: 400; opacity: 0.5;}
   #userinput{margin-top: 9%; position: relative; top: 4.6rem; left: 1%; height: 2.7rem; width: 93%;}
   mat-card{box-shadow: .1rem 0px #ccc;}
   #defualtBranchSearchuser{ z-index: 10; color: #BCBCCB;}
   .mat-card-header-text {  margin: 0rem !important;}
   .mat-form-field-appearance-legacy .mat-form-field-wrapper {padding-bottom: 0rem !important}
   .mat-form-field-appearance-legacy .mat-form-field-infix {padding: 0rem !important}
   .mat-table {font-family: 'Open Sans', sans-serif !important;}
   tr.mat-header-row {height: 4.0rem;}
   .banner-input{border: none; width: 70%;border-bottom: .05rem solid #ccc; margin-left: .6rem;}
   .side-box{margin-top: 2.0rem;}
   .md-grid-tile.mat-grid-tile .mat-figure {display: block !important;}
   .align{text-align: right; float: right;  right: 27rem; position: relative;font-size: 1.6rem; top: 5rem;}
   #lending{top: 0rem !important;}
                             /* ***********************************************
                                     USER CREAE/ EDIT
                             *********************************************** */
   .userCreateIcon{font-size: 3.5rem !important;position: relative !important;top: .5rem !important;}
   .advancesearchradio{position: relative !important;  top: .8rem !important;}
   select{color: #1a1a1a; padding-left: .3rem; padding-top: .1rem;}
   select option:first-child:hover{color: #81C784;}
   .example-container {min-height: 18.0rem;overflow: auto; font-weight: bold;} */
   tr.mat-footer-row {font-weight: bold;}
   .mat-table-sticky {top: -1px !important; border-top: .1rem solid #e0e0e0;}
   #shadow{box-shadow: none;margin-bottom: 10rem !important;}
   .margin-row{margin: 0; padding: 0;}
   #box-shadow{box-shadow: none; padding-top: 0; padding-bottom: 0; }
   #box-shadow{box-shadow: none; padding-top: 0; padding-bottom: 0;}
   .mat-card:not([class*=mat-elevation-z]) {box-shadow: none;}
   .model-pop{background: #27AE60; border: .15rem solid #27AE60;}
   .modal-title{font-size: 2.0rem; font-weight: bolder;}
   #myModal{width: 60%; z-index: 1040 !important;}
   .label{font-size: 1.6rem; font-family: 'Open Sans', sans-serif; font-weight: bold;}
   .label2{font-size: 1.6rem; font-family: 'Open Sans', sans-serif; font-weight: bold;}
   .label1{font-size: 1.6rem; font-family: 'Open Sans', sans-serif; font-weight: bold;}
   /* Advance Search Pop-Up */
   .width{width: 20%;}
   .cdk-overlay-dark-backdrop {background: transparent !important;}
   #popup-hr{margin-top: .5rem; border: 0;border-top: .2rem solid #81C784;}
   #h2{margin-top: 1.8rem; margin-left: 2.0rem; margin-bottom: 0; width: 46.0rem;}
   .row-margin{margin-left: 0; margin-right: 0;}
   .background-color{background: #27AE60; color: #fff;}
   .searchby{position: relative; font-weight: bold; margin-left: 0; padding-left: 1.5rem; margin-right: 0; font-size: 1.6rem;bottom: 1rem;}
   .mat-dialog-content{display: block; margin: 0; padding: 0; max-height: 52vh; overflow: auto;}
   .mat-dialog-container {border-radius: 2.0rem; padding: 0; overflow-x: unset;}
   #trackWayBill .mat-dialog-container{border-radius: none !important;}
   /* End of Pop Up */
   #defualtBranchSearch1{position: absolute; right: 2rem; font-size: 1.7rem; top: .5rem; z-index: 10; color: #BCBCCB;}
   .input-md1{padding-left: .6rem;}

   .bar{width: 20%;}
   input{text-transform: uppercase; padding-left: .6rem;font-size: 1.4rem;}
   .create-user{margin-top: 0;}
   label {font-weight: bold;  font-size: 1.6rem;}
   #datepickerholder{padding-left: 0rem !important;}
   .error6{color: red; margin: 0; padding: 0; height: 1.5rem;position: absolute; bottom: 3.2rem;width: 100%;}
   .error1{color:red; margin: 0; padding: 0; height: 1.5rem;}
   .error2{color: red; margin: 0; padding: 0; height: 1.5rem;}
   .error{
     font-size: 1rem;
       color: red;
       height: 0px;
       margin: 0px;
       padding: 0px;
       position: absolute;
       width: 100%;
       bottom: 0.2rem;
       top: 9px!important;
       left: 8px!important;
       font-weight: normal;
   }
   .error.custome {
     margin-top: 1.2rem;
     margin-left: 1rem;
   }
   #tickmark{width: 3.0rem; height: 3.0rem; color: red;position: absolute; right: 32%;top: 0; font-size: 2.4rem;}
   #tickmark1{color: #27AE60;position: absolute; left: 0;}
   #validationmark{position: relative;  bottom: 1.0rem; left: 12.5rem;}
   #validationmark2{position: relative;  bottom: 1.0rem; left: 12.5rem;}
   #validationmark3{position: relative; bottom: 1.0rem;left: 12.5rem;}
   #validationmark4{position: relative; bottom: 1.0rem;left: 10.2rem;}
   .matCardBottom{border-radius: 1rem; margin-right: 1rem;height: 18rem;}
   .cursorPointer{cursor: pointer !important;}
   .userContainer hr{margin-bottom: 1rem !important;}
   /* Table */
   table {width: 100%; box-shadow: none !important; max-width: 100%; margin-bottom: 0 !important;}
   .table>tbody>tr>td{padding: 0.8rem !important;line-height: 1.42857143; vertical-align: middle;border-top: .1rem solid #ddd;}
   .table>thead>tr>th{padding: .8rem !important; border-bottom: .1rem solid #ddd;}
   td {font-size: 1.6rem;}
   .mat-cell, .mat-footer-cell {font-size: 1.6rem !important; font-weight: 400 !important;}
   th{background: #F1F1F1; font-size: 1.6rem;color: #1a1a1a !important;font-family: 'Open Sans', sans-serif !important; font-weight: 600;}
   tr.mat-header-row{height: 4.0rem !important;}
   tr.mat-row{height: 3.5rem !important;}
   /* End of Table  */
   .viewPermision{position: absolute; left: 3.5rem; top: 18.0rem;}
   .viewPermisionmobile{left: 3.5rem; top: 18.0rem;}
   .mat-checkbox-label{font-weight: normal; font-size: 1.6rem;}
   .mat-checkbox-inner-container{width: 1.6rem !important; height: 1.6rem !important;margin-right: 0rem !important}
   .control-label{padding-left: 0rem !important;}
   .permission {top: 1.6rem;}
   .mat-tooltip {background-color: #27AE60 !important; color: #fff !important; font-size: 1.6rem !important;
    top: 0rem !important; right: 0rem !important; left: 0rem !important; bottom: 0rem !important; max-width: unset !important;}

   /* ***************************************************************************************************
                                             Role Create /Edit
   ***************************************************************************************************** */
   /* p{margin-left: 2%;} */
   .example-spacer{flex: 1 1 auto;}
   .example-icon{padding: 0 2.7rem;position: relative;top: .8rem;}
   .tlabel{background: #F1F1F1; margin-top: 2.0rem;}
   a{cursor: pointer;}
   .mat-header-cell{font-size: 1.6rem !important;}
   .mat-checkbox-checked .mat-checkbox-background {background-color: #81C784 !important;}
   .attribute-table{width: 53%; background: red;}
   .attribute-table th{height: 0;}
   .example-full-width{margin-right: 80%;}
   .example-full-width-2{width:40%;margin:1.0rem;}
   .example-full-width-4{width:40%;}
   .example-full-width-5{width:20%;}
   tr.example-detail-row {height: 0;}
   tr.example-element-row:not(.example-expanded-row):hover {background: white;}
   tr.example-element-row:not(.example-expanded-row):active {background: #efefef;}
   .example-element-row td {border-bottom-width: 0;}
   .example-element-detail {overflow: hidden;display: flex;}
   .example-element-diagram {min-width: 8.0rem;border: .1rem solid black;padding: .8rem;font-weight: lighter;margin: .8rem 0;height: 10.4rem;}
   .example-element-symbol{font-weight: bold;font-size: 4.0rem;line-height: normal;}
   .example-element-description{padding: 1.6rem;}
   .example-element-description-attribution{opacity: 0.5;}
   .bread-crumb{font-size:1.3rem;}
   .icon-bottom{vertical-align:bottom;}
   .bread-crumb a{color:#27AE60;}

   .sel-obj-add  {position: relative;color:  #27ae60; font-weight:500; font-size:1.5rem; }
   select option:hover{content: attr(title);background: #666; color: #000; position: absolute;width: 100%;left: 0;border: none;}
   #defualtBranchSearch{position: absolute; left: 2.5rem; top: .7rem; z-index: 10; color: #BCBCCB; font-size: 1.5rem;}
   .input-md{padding-left: 1.0rem;}
   .form-control{width: 100%;
     /* box-shadow: 0px 2px 6px #00000029; */
   }
   .elgg-input-dropdown:hover{background-color: #000;}
   .form-control option:hover{  background-color: #000 !important;}
   .mat-elevation-z8 {box-shadow: none !important; border: .1rem solid #F1F1F1 !important;}
   #validationbutton{cursor: pointer;color: #27AE60; position: relative; top: 1.0rem; left: 0%; font-size: 2.4rem; border: none; background: transparent;}
   .paddingzero{padding: 0;}

   /* *********************************************************************************************
                                           OBJECT DETAILS
   ****************************************************************************************************/
   select:focus > option:checked {background: #81C784 !important;}
   .objectList{border: .1rem solid #6A6868; border-radius: .4rem;}
   .objectList:hover{border: .1rem solid #81C784;}
   .objectList2{border: none !important; padding-left: .5rem;}
   .list-style{padding-left: .6rem;list-style: none;width: 80%;}
   .list-style2{width: 60%; height: 2.7rem; padding-left: .6rem; padding-top: .1rem;}

   /* shortcuts keys */

   .shortcutskeys{color: #27ae60 !important;font-size: 1.6rem;}
   .marginTop2o{margin-top: 1.5rem;}
   .branch-input{padding-left: 2rem;}
   h3{font-size: 2.4rem !important;}
   #calender{position: relative !important; top: 0rem !important;}

   .mat-form-field-appearance-outline .mat-form-field-outline-end, .mat-form-field-appearance-outline .mat-form-field-outline-start{
     border: .1rem solid currentColor !important;}


   @media only screen and (max-width: 1600px){
     .align{right: 21rem;}
   }
   @media only screen and (max-width: 1440px){
   .align{right: 18rem;}
   }
   @media only screen and (max-width: 1280px){
   .align{right: 16rem;}
   }
   @media only screen and (max-width: 1152px){
   .align{right: 14rem;}
   }
   @media only screen and (max-width: 1024px){
   .align{right: 12rem;}
   }
   @media only screen and (max-width: 800px){
   .align{right: 8rem;}
   }



   .mat-form-field-appearance-outline .mat-form-field-outline-start{display: none !important;}

   .mat-form-field-appearance-outline .mat-form-field-outline-end{
     border-radius: 0!important;
   }
   .fa-times{color: #1a1a1a;position: absolute;right: 1rem;top: -1rem; cursor: pointer;opacity: 0.6;}
   #selectobject{ right: 1rem !important;top: 1rem !important;}
   .displayflex{display: flex; align-items: center;}

   .textoverflow{  white-space: nowrap; overflow: hidden;text-overflow: ellipsis;}

   #role-search .ng-arrow-wrapper{
     display: none !important;

   }

   #role-search .ng-value-label{
     color: transparent !important;
     display: none;
   }
   #role-search .ng-value-container{
     padding-left: 2rem;
     font-size: 1.4rem;
   }
   #role-search .ng-select-container.ng-has-value {
     font-size: 1.4rem;
   }
   #role-search .ng-placeholder{
     font-size: 1.4rem;
     padding-left: 2rem;
   }

   #role-search .ng-input {
     top: 0rem !important;
     padding-left: 2rem;
     font-size: 1.3rem;
     width: 35rem;
   }


   .headerMsg{
     color: #27ae60 !important;
     position: fixed;
     font-size: 1.6rem;
     right: 6.5rem;
     top: 7.5rem;
   }


   .dropdown-menu>.active>a, .dropdown-menu>.active>a:focus, .dropdown-menu>.active>a:hover {
       background-color: #27ae60 !important;
   }
   .dropdown-menu {
     display: block;
     max-height: 200px;
     overflow-y: auto;
     top: 15px!important;
     border-radius: 0!important;
   }

   .mat-paginator-icon{width: 2.8rem !important;}
   td.mat-cell:first-of-type, td.mat-footer-cell:first-of-type, th.mat-header-cell:first-of-type{padding-left: 2.4rem !important;}
   span {
     font-weight: normal;
   }


   .zonalheadingbar {
     font-size: 1.3rem !important;
     width: 20%;
   }


   .page-section {
     font-weight: normal !important;
   }

    .ng-placeholder {
     display: none;
   }

   .imo-trigger{
     display: none !important;
   }
   .table_scroll{
     overflow-x: scroll !important;
     width: 100% !important;
   }
   .gamepad_icon{
     padding-right: 1rem;
   }
   .mat_card_scroll{
     max-height: 85vh;
     overflow-y: scroll;
   }
   .mat-paginator .mat-form-field-appearance-legacy .mat-form-field-wrapper {
     width: auto !important;
   }
   .map_permission_table{max-height: 22.5rem;margin-top: 2.0rem; overflow-wrap: break-word;box-shadow: none;}
   .ng-select.icon_space .ng-select-container .ng-value-container .ng-input>input{padding-left: 2rem;}
   .dashboard .container{width: 100% !important;}
   .containerWidth{width: 100%;}
    .header{position: relative;
                height: 34rem;
                background: #27ae60;
                border-bottom-left-radius: 55% 45%;
                border-bottom-right-radius: 55% 45%;
                }
                input.decorate[type='radio']:after {
                  width: 17px;
                  height: 17px;
                  border-radius: 17px;
                  top: -2px;
                  left: -2px;
                  position: relative;
                  content: '';
                  display: inline-block;
                  visibility: visible;

              }

            input[type='radio']:checked:after {
                  width: 17px;
                  height: 17px;
                  border-radius: 17px;
                  top: -2px;
                  left: -2px;
                  position: relative;
                  background-color: #81C784;
                  content: '';
                  display: inline-block;
                  visibility: visible;
                  border: 2px solid white;
              }
              textarea.textareaoutline {
                resize: none;
             }



              /* Browser support code start */

              //   firefox start======================================================
              @-moz-document url-prefix() {
                input.mat-input-element {
                  margin-top: -1rem!important;
                }
                #advance_search_input_branch{
                  padding-left: 0px!important;
                  height: 2.7rem!important;
                  margin-left: -2rem!important;
                }

                input.decorate[type='radio']:after {
                  width: 17px;
                  height: 17px;
                  border-radius: 17px;
                  top: -2px;
                  left: -2px;
                  position: relative;
                  content: '';
                  display: inline-block;
                  visibility: visible;

              }

            input[type='radio']:checked:after {
                  width: 17px;
                  height: 17px;
                  border-radius: 17px;
                  top: -2px;
                  left: -2px;
                  position: relative;
                  background-color: #81C784;
                  content: '';
                  display: inline-block;
                  visibility: visible;
                  border: 2px solid white;
              }

              .userContainer .permission{
                position :relative;
                top : 1rem;
              }

               }




               @supports (-moz-appearance:none) {
                input.mat-input-element {
                  margin-top: -1rem!important;
                }
                #advance_search_input_branch{
                  padding-left: 0px!important;
                  height: 2.7rem!important;
                  margin-left: -2rem!important;
                }
                .mat-button-wrapper {
                  margin-top: 0.2rem;
                  display: block;
              }
              #advance_search_input_branch {
                padding-left: 4px !important;
              }

              input:focus {
                border: 1px solid #44a40e;
                box-shadow: none;
            }
            input {
              box-shadow: none;
          }



                input.decorate[type='radio']:after {
                  width: 17px;
                  height: 17px;
                  border-radius: 17px;
                  top: -2px;
                  left: -2px;
                  position: relative;
                  content: '';
                  display: inline-block;
                  visibility: visible;

              }

            input[type='radio']:checked:after {
                  width: 17px;
                  height: 17px;
                  border-radius: 17px;
                  top: -2px;
                  left: -2px;
                  position: relative;
                  background-color: #81C784;
                  content: '';
                  display: inline-block;
                  visibility: visible;
                  border: 2px solid white;
              }

              .userContainer .permission{
                position :relative;
                top : 1rem;
              }

            }
            //firefox end======================================================







            //edge start======================================================

                @supports (-ms-ime-align: auto) {
                  input.mat-input-element {
                    margin-top: -1.2rem!important;
                  }
                  #advance_search_input_branch{
                    padding-left: 0px!important;
                    height: 2.7rem!important;
                    margin-left: -2rem!important;
                  }

                  input.decorate[type='radio']:after {
                    width: 17px;
                    height: 17px;
                    border-radius: 17px;
                    top: -2px;
                    left: -2px;
                    position: relative;
                    content: '';
                    display: inline-block;
                    visibility: visible;

                }

              input[type='radio']:checked:after {
                    width: 17px;
                    height: 17px;
                    border-radius: 17px;
                    top: -2px;
                    left: -2px;
                    position: relative;
                    background-color: #81C784;
                    content: '';
                    display: inline-block;
                    visibility: visible;
                    border: 2px solid white;
                }

                .userContainer .permission{
                  position :relative;
                  top : 1rem;
                }

                input.form-control {
                  box-shadow: none;
                  border-radius: 0;
                  border: .2px solid #000;
              }



                }
              /* for Edge 16+ CSS */
              @supports (-ms-ime-align: auto) {
                input.mat-input-element {
                  margin-top: -1.2rem!important;
                }
                #advance_search_input_branch{
                  padding-left: 0px!important;
                  height: 2.7rem!important;
                  margin-left: -2rem!important;
              }
              input.decorate[type='radio']:after {
                width: 17px;
                height: 17px;
                border-radius: 17px;
                top: -2px;
                left: -2px;
                position: relative;
                content: '';
                display: inline-block;
                visibility: visible;

            }

          input[type='radio']:checked:after {
                width: 17px;
                height: 17px;
                border-radius: 17px;
                top: -2px;
                left: -2px;
                position: relative;
                background-color: #81C784;
                content: '';
                display: inline-block;
                visibility: visible;
                border: 2px solid white;
            }


            .userContainer .permission{
              position :relative;
              top : 1rem;
            }
 .broadcastDatepic .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{width: 2em !important; right: 2rem!important;}
                           }

              //end edge ======================================================

   `
  constructor() {
    sessionStorage.setItem("refresh_component", location.pathname.replace('/', ""))
  }
  ngOnInit(){
    console.log('deployment test -- 28 aug.')
    var container;
    if (/Edge/.test(navigator.userAgent)) {
        container = document.getElementsByTagName('head')[0]
    }else{
        container = document.getElementsByClassName('userContainer')[0]
    }
      const  style:any = document.createElement('style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(this.style_css + this.core_css));
      container.appendChild(style);
  }
  title = "app";

  //disable backspace to switch screen sate or URL - naresh
  @HostListener("document:keydown", ["$event"])
  onKeyDown(evt: KeyboardEvent) {
    if (evt.keyCode === 8 || evt.which === 8) {
      let doPrevent = true;
      const types = [
        "text",
        "password",
        "file",
        "search",
        "email",
        "number",
        "date",
        "color",
        "datetime",
        "datetime-local",
        "month",
        "range",
        "search",
        "tel",
        "time",
        "url",
        "week"
      ];
      const target = <HTMLInputElement>evt.target;
      const disabled =
        target.disabled || (<HTMLInputElement>event.target).readOnly;
      if (!disabled) {
        if (target.isContentEditable) {
          doPrevent = false;
        } else if (target.nodeName === "INPUT") {
          let type = target.type;
          if (type) {
            type = type.toLowerCase();
          }
          if (types.indexOf(type) > -1) {
            doPrevent = false;
          }
        } else if (target.nodeName === "TEXTAREA") {
          doPrevent = false;
        }
      }
      if (doPrevent) {
        evt.preventDefault();
        return false;
      }
    }
  }
  //disable backspace to switch screen sate or URL


  //handle browser forcely -- navigate to login page
  // @HostListener('window:beforeunload', [ '$event' ])
  // unloadHandler(event) {
  //    this.AuthorizationService.clearLocalStroage();
  // }
}
