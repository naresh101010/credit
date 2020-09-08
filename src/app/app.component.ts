import { Component,  ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { PlatformLocation } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = "app";
  style_css = `html{font-size: 45% !important;}
  body {font-size: 1.4rem; overflow-x: hidden; overflow-y: auto; box-sizing: border-box;font-family: 'Open Sans', sans-serif !important; line-height: 1.8; }
  
  ::-webkit-scrollbar {width: 1.0rem;}
  ::-webkit-scrollbar-track {background: #EBEBF2;}
  ::-webkit-scrollbar-thumb {background: #6A6868; border-radius: 1rem;}
  ::-webkit-scrollbar-thumb:hover {background: #585757;}
  h3{margin-top: 0;}
  p{margin: 0 0 1rem;}
  .prcContainer #bell{position: relative;right: 10.5rem; color: #6A6868;}
  .prcContainer #profile{position: relative; right: 101%; letter-spacing: 0; color: #1A1A1A;}
  .prcContainer #profileimg{position: relative;  right: 1%;}
  .prcContainer #titleheading{background: #F1F1F1;  width: 110%; margin-top: -12%; height: 5.1rem;}
  .prcContainer #heading{letter-spacing: 0; color: #1A1A1A;position: absolute;top: -5.5rem;left: .2rem;}
  .prcContainer #usersearchicon{position: relative; top: 5.5rem; font-size: 3.5rem; color: #6A6868;}
  .prcContainer #plusicon{color: #27AE60; position: absolute; right: -1%; top: 74%; z-index: 10; font-size: 4.0rem;}
  .prcContainer #userinput{font-size: 1.7rem; position: relative; top: 2.6rem; left: 3.9rem; font-weight: bold;}
  .prcContainer .RoleMH{font-size: 1.7rem; font-weight: bold; color: #1A1A1A; cursor: pointer;}
  .prcContainer #rolesearch{position: relative; top:2.5rem; font-size: 3.5rem; color: #585757;}
  .prcContainer .green-border{background: #27AE60; border: .1rem solid #27AE60; margin-top: -1.0rem; margin-bottom: 0rem;}
  .prcContainer .green-border-heading{background: #27AE60; border: .1rem solid #27AE60; margin-top: 1.4rem; margin-bottom: 1.0rem;}
  /* .mat-form-field-underline, .mat-form-field-underline.mat-focused{background-color: #FAFAFA; border-color: #fff;} */
  
  /* updated new */
  .prcContainer .search {position: relative; color: #1a1a1a; font-size: 1.4rem; padding-top: .7rem; width: 100%; }
  .prcContainer .search input { width: 100%; height: 4.5rem; border:0rem; color:#1a1a1a;}
  .prcContainer .breadcrumb {background: none !important; color:#1a1a1a; font-size: 1.4rem; font-weight:normal; text-align:left; position: relative;top: 0%; font-family:'Open Sans', sans-serif;}
  .prcContainer .breadcrumb .fa-caret-right {color:#1a1a1a; padding: .5rem;}
  .prcContainer .breadcrumb1{background: none !important; font-family: 'Open Sans', sans-serif;color:#1a1a1a; font-size: 1.4rem; font-weight:normal; position: absolute;top: 0%; left: 12%; z-index: 2;}
  .prcContainer .breadcrumb1 .fa-caret-right {color:#1a1a1a; padding: .5rem;}
  .prcContainer .breadcrumb2{background: none !important; font-family: 'Open Sans', sans-serif;color:#1a1a1a; font-size: 1.4rem; font-weight:normal; position: absolute;top: 0%; left: 10%; z-index: 2;}
  .prcContainer .breadcrumb2 .fa-caret-right {color:#1a1a1a; padding: .5rem;}
  
  
  /* User Management */
  .prcContainer #RoleS{color: #27AE60; position: absolute; font-size: 4.0rem; right: 4%; top: 12%;}
  
  .prcContainer .error{font:1.0rem; color: rgb(163, 63, 63); height: 0rem; margin:0rem; padding: 0rem;}
  .prcContainer a{cursor: pointer; color:#27AE60}
  
  
  /* view permission */
  .prcContainer .sectionOpen{  width: 100%;  height: auto;  cursor: pointer;}
  /* View Permission */
  .prcContainer .viewpermission{  width: 100%;  height: 0%;  background:#EBEBF2;  display: flex;}
  .prcContainer .viewpermi{  width: 25%;  height: 3.5rem;  border-bottom: .1rem solid #EBEBF2;  display: flex;  justify-content: center;  align-items: center;}
  .prcContainer .viewpermi1{  width: 25%;  height: 3.5rem;  display: flex;  justify-content: center;  align-items: center;  }
  .prcContainer .viewpermission1{  width: 100%;  height: 3.5rem;  display: flex;}
  .prcContainer .scrollbar{ overflow-y:scroll;  border-bottom: .1rem solid #EBEBF2;   font-size: 1.4rem;}
  .prcContainer .PermissionMapping{ position: relative;  left: .3rem;  top: .8rem;  font-size: 1.4rem;  font-weight: bold;}
  .prcContainer .userheading{position: relative; font-size: 1.5rem; left: 0rem; top: 1.7rem;}
  .cdk-drag-placeholder {visibility: hidden !important;}
  .cdk-drag-animating {display: none !important}
  #cdk-drop-list-0{height: 73rem !important}
  
  /* 18NOv2017 */
  .prcContainer #shadow{box-shadow: none;}
  .prcContainer #lending{height: fit-content; max-width: 100%; box-shadow: 0.05rem  0.05rem  0.05rem #ccc;  margin-top: 6.5rem;}
  
  /* 20 October */
  select option:hover{background: #27AE60}
  
  .prcContainer .mat-dialog-container {border-radius: 2.0rem;}
  .prcContainer mat-card{box-shadow: none !important;font-family: 'Open Sans', sans-serif !important;}
  .prcContainer .mat-card{box-shadow: none !important; font-family: 'Open Sans', sans-serif !important;}
  .prcContainer .mat-card{box-shadow: none !important; font-family: 'Open Sans', sans-serif !important;}
  .prcContainer .form-control {border-radius: 0; border: .1rem solid #6a6868; box-shadow: 0rem .2rem .6rem #00000029;height: 2.7rem;}
  .prcContainer .form-control-textarea {padding-left: .6rem; border-radius: 0; border: .1rem solid #6a6868; box-shadow: 0rem .2rem .6rem #00000029;}
  .prcContainer input{text-transform: uppercase;}
  .prcContainer textarea{text-transform: uppercase;}
  .prcContainer .form-control:focus {outline: none; border-color: #27AE60; box-shadow: 0 0 0 0;}
  .prcContainer .form-control:hover{outline: none; border-color: #27AE60; box-shadow: 0 0 0 0;}
  .prcContainer textarea:focus {outline: none; border-color: #27AE60; box-shadow: 0 0 0 0;}
  .prcContainer textarea:hover{outline: none; border-color: #27AE60; box-shadow: 0 0 0 0;}
  .prcContainer .form-control-textarea:focus{border-color: #27AE60;  box-shadow: none; -webkit-box-shadow: none;}
  .prcContainer mat-panel-title{font-weight: bold;}
  
  /* Media Queries */
  
  @media only screen and (max-width: 1534px) {
    html {font-size: 57%;}
  }
  
  @media only screen and (max-width: 1440px) {
      .prcContainer .mat-stepper-horizontal-line{min-width: 6rem !important;}
    }
  
  @media only screen and (max-width: 1440px) {
      html {font-size: 55%;}
      .prcContainer .mat-stepper-horizontal-line{min-width: 5rem !important;}
    }
    
    @media only screen and (max-width: 1366px) {
      html {font-size: 52%;}
      .prcContainer .mat-stepper-horizontal-line{min-width: 4rem !important;}
    }
  
  /* Required Message Style */
  .prcContainer .hasErrorMsg {
    color: red;
    position: absolute;
    left: 0;
    bottom: -8px; 
    right: 0;
    text-align: center;
  }
  /* Required Message Style */
  
  .prcContainer .btn1:disabled{
      cursor: not-allowed !important;
      background-color: #81C784;
    }
    
  .prcContainer .mat-icon-button[disabled] .material-icons{
    cursor: not-allowed;
  }
    
  /********* Dialog CSS ***********/
  
  .creditDialog #bell{position: relative;right: 10.5rem; color: #6A6868;}
  .creditDialog #profile{position: relative; right: 101%; letter-spacing: 0; color: #1A1A1A;}
  .creditDialog #profileimg{position: relative;  right: 1%;}
  .creditDialog #titleheading{background: #F1F1F1;  width: 110%; margin-top: -12%; height: 5.1rem;}
  .creditDialog #heading{letter-spacing: 0; color: #1A1A1A;position: absolute;top: -5.5rem;left: .2rem;}
  .creditDialog #usersearchicon{position: relative; top: 5.5rem; font-size: 3.5rem; color: #6A6868;}
  .creditDialog #plusicon{color: #27AE60; position: absolute; right: -1%; top: 74%; z-index: 10; font-size: 4.0rem;}
  .creditDialog #userinput{font-size: 1.7rem; position: relative; top: 2.6rem; left: 3.9rem; font-weight: bold;}
  .creditDialog .RoleMH{font-size: 1.7rem; font-weight: bold; color: #1A1A1A; cursor: pointer;}
  .creditDialog #rolesearch{position: relative; top:2.5rem; font-size: 3.5rem; color: #585757;}
  .creditDialog .green-border{background: #27AE60; border: .1rem solid #27AE60; margin-top: -1.0rem; margin-bottom: 0rem;}
  .creditDialog .green-border-heading{background: #27AE60; border: .1rem solid #27AE60; margin-top: 1.4rem; margin-bottom: 1.0rem;}
  /* .mat-form-field-underline, .mat-form-field-underline.mat-focused{background-color: #FAFAFA; border-color: #fff;} */
  
  /* updated new */
  .creditDialog .search {position: relative; color: #1a1a1a; font-size: 1.4rem; padding-top: .7rem; width: 100%; }
  .creditDialog .search input { width: 100%; height: 4.5rem; border:0rem; color:#1a1a1a;}
  .creditDialog .breadcrumb {background: none !important; color:#1a1a1a; font-size: 1.4rem; font-weight:normal; text-align:left; position: relative;top: 0%; font-family:'Open Sans', sans-serif;}
  .creditDialog .breadcrumb .fa-caret-right {color:#1a1a1a; padding: .5rem;}
  .creditDialog .breadcrumb1{background: none !important; font-family: 'Open Sans', sans-serif;color:#1a1a1a; font-size: 1.4rem; font-weight:normal; position: absolute;top: 0%; left: 12%; z-index: 2;}
  .creditDialog .breadcrumb1 .fa-caret-right {color:#1a1a1a; padding: .5rem;}
  .creditDialog .breadcrumb2{background: none !important; font-family: 'Open Sans', sans-serif;color:#1a1a1a; font-size: 1.4rem; font-weight:normal; position: absolute;top: 0%; left: 10%; z-index: 2;}
  .creditDialog .breadcrumb2 .fa-caret-right {color:#1a1a1a; padding: .5rem;}
  
  
  /* User Management */
  .creditDialog #RoleS{color: #27AE60; position: absolute; font-size: 4.0rem; right: 4%; top: 12%;}
  
  .creditDialog .error{font:1.0rem; color: rgb(163, 63, 63); height: 0rem; margin:0rem; padding: 0rem;}
  .creditDialog a{cursor: pointer; color:#27AE60}
  
  
  /* view permission */
  .creditDialog .sectionOpen{  width: 100%;  height: auto;  cursor: pointer;}
  /* View Permission */
  .creditDialog .viewpermission{  width: 100%;  height: 0%;  background:#EBEBF2;  display: flex;}
  .creditDialog .viewpermi{  width: 25%;  height: 3.5rem;  border-bottom: .1rem solid #EBEBF2;  display: flex;  justify-content: center;  align-items: center;}
  .creditDialog .viewpermi1{  width: 25%;  height: 3.5rem;  display: flex;  justify-content: center;  align-items: center;  }
  .creditDialog .viewpermission1{  width: 100%;  height: 3.5rem;  display: flex;}
  .creditDialog .scrollbar{ overflow-y:scroll;  border-bottom: .1rem solid #EBEBF2;   font-size: 1.4rem;}
  .creditDialog .PermissionMapping{ position: relative;  left: .3rem;  top: .8rem;  font-size: 1.4rem;  font-weight: bold;}
  .creditDialog .userheading{position: relative; font-size: 1.5rem; left: 0rem; top: 1.7rem;}
  
  /* 18NOv2017 */
  .creditDialog #shadow{box-shadow: none;}
  .creditDialog #lending{height: fit-content; max-width: 100%; box-shadow: 0.05rem  0.05rem  0.05rem #ccc;  margin-top: 6.5rem;}
  
  /* 20 October */
  select option:hover{background: #27AE60}
  
  .creditDialog .mat-dialog-container {border-radius: 2.0rem;}
  .creditDialog mat-card{box-shadow: none !important;font-family: 'Open Sans', sans-serif !important;}
  .creditDialog .mat-card{box-shadow: none !important; font-family: 'Open Sans', sans-serif !important;}
  .creditDialog .mat-card{box-shadow: none !important; font-family: 'Open Sans', sans-serif !important;}
  .creditDialog .form-control {border-radius: 0; border: .1rem solid #6a6868; box-shadow: 0rem .2rem .6rem #00000029;height: 2.7rem;}
  .creditDialog .form-control-textarea {padding-left: .6rem; border-radius: 0; border: .1rem solid #6a6868; box-shadow: 0rem .2rem .6rem #00000029;}
  .creditDialog input{text-transform: uppercase;}
  .creditDialog textarea{text-transform: uppercase;}
  .creditDialog .form-control:focus {outline: none; border-color: #27AE60; box-shadow: 0 0 0 0;}
  .creditDialog .form-control:hover{outline: none; border-color: #27AE60; box-shadow: 0 0 0 0;}
  .creditDialog textarea:focus {outline: none; border-color: #27AE60; box-shadow: 0 0 0 0;}
  .creditDialog textarea:hover{outline: none; border-color: #27AE60; box-shadow: 0 0 0 0;}
  .creditDialog .form-control-textarea:focus{border-color: #27AE60;  box-shadow: none; -webkit-box-shadow: none;}
  .creditDialog mat-panel-title{font-weight: bold;}
  
  /* Media Queries */
  
  @media only screen and (max-width: 1534px) {
    html {font-size: 57%;}
  }
  
  @media only screen and (max-width: 1440px) {
      .creditDialog .mat-stepper-horizontal-line{min-width: 6rem !important;}
    }
  
  @media only screen and (max-width: 1440px) {
      html {font-size: 55%;}
      .creditDialog .mat-stepper-horizontal-line{min-width: 5rem !important;}
    }
    
    @media only screen and (max-width: 1366px) {
      html {font-size: 52%;}
      .creditDialog .mat-stepper-horizontal-line{min-width: 4rem !important;}
    }
  
  /* Required Message Style */
  .creditDialog .hasErrorMsg {
    color: red;
    position: absolute;
    left: 0;
    bottom: -8px; 
    right: 0;
    text-align: center;
  }
  /* Required Message Style */
  
  .creditDialog .btn1:disabled{
      cursor: not-allowed !important;
      background-color: #81C784;
    }
    
  .creditDialog .mat-icon-button[disabled] .material-icons{
    cursor: not-allowed;
  }
  .mat-tooltip {font-family:  'Open Sans', sans-serif !important;}
  /********* Dialog CSS ***********/
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    /* IE10+ CSS styles go here */
    /** IE 11 fixes */
    html .ng-dropdown-panel.creditNgDropdown.ng-select-bottom {
      box-sizing: border-box;
      position: absolute;
      opacity: 1 !important;
      z-index: 9999999999999999999 !important;
      -webkit-overflow-scrolling: touch;
      top: 49px !important;
      left: -590px !important;
      bottom: 0px !important;
      right: 0px !important;
      margin: auto;
      height: 104px;
      border: none !important;
    }
  }`;
  core_css = `/* GLOBAL CSS */
  h1{font-size: 4.2rem !important}
  h2{font-size: 3.2rem ! important;}
  h3{font-size: 2.4rem !important; margin-top: 0 !important;margin-bottom: 1rem !important;}
  h4{font-size: 1.8rem !important;}
  h5{font-size: 1.8rem !important;}
  h6{font-size: 1.6rem !important;}
  .prcContainer p{margin: 0 0 1.4rem;}
  .creditDialog p{margin: 0 0 1.4rem;}
  .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9{
    min-height: .1rem !important;padding-right: 1.5rem !important;padding-left: 1.5rem !important;}
  .row{margin-left: -1.5rem !important; margin-right: -1.5rem !important;}
  .prcContainer hr{margin-bottom: 2rem !important;}
  .creditDialog hr{margin-bottom: 2rem !important;}
  body {
    background-color: #f3f3f3 !important;
  }
  /* green color code  = #27AE60
     disabled color code =  #ccc
     heading background color = #f1f1f1  */
  /* Delete Icon font-size */
  
  .prcContainer .deleteIcon{font-size: 2.4rem !important; position: relative; left: 9rem !important; top: .4rem !important;color: #fff !important;}
  
  /* END OF GLOBAL CSS */
  /* html {font-size: 50%;} */
  .material-icons {color:#27AE60 }
  .burger-menu {color: #575555 !important;}
  .prcContainer .overflow::-webkit-scrollbar{width: .7rem; cursor:  pointer !important;height: 1rem}
  .prcContainer .heading-bar-dashboard {background: #F1F1F1;  padding-top: 1.0rem; padding-bottom: 1.0rem; color:black; font-size:1.6rem;} 
  .prcContainer .label-text-branch{font-size: 1.6rem !important; font-weight: bold !important;}
  .prcContainer .height{font-size: 1.6rem; height: 4.5rem; padding-top: .5rem; padding-bottom: .5rem;  border-bottom: .1rem solid #f1f1f1; display: flex; align-items: center; }
  .prcContainer .label-text{font-size: 1.6rem; font-weight: bold; padding-top: .6rem; }
  .prcContainer .label-text-value{font-size: 1.6rem; font-weight: 100; padding-top: .6rem; text-overflow: ellipsis; white-space: nowrap;}
  
  .prcContainer .add-more{margin-top: 1.5rem;}                    
  .prcContainer .flex-container {display: flex;flex-wrap: nowrap; margin-bottom: 2rem;}
  .prcContainer .flex-container > .one {width: 22.5%;margin-right: 2.0rem;text-align: center;line-height: 7rem;
    font-size: 3.0rem;}
  .prcContainer .flex-container > .two { width: 10%; text-align: center;line-height: 7rem;font-size: 3.0rem; border-left: .3rem solid #f1f1f1;}
  .prcContainer .one img{width: 100%; height: 100%;}
  .prcContainer .two img{width: 100%; height: 100%;}
  .prcContainer .text{color:#27AE60;}
  .prcContainer .relative{position: relative !important;}
  .prcContainer .absolute{width: 2.1rem;height: 2.1rem; background: #27AE60; position: absolute; border-radius: 50%;
    box-shadow: .1rem .1rem #ccc; display: flex; justify-content: center; align-items: center; color: #fff;
    right: 9.5rem; font-weight: lighter;}
  .prcContainer #background{background: #fff;}
  .prcContainer .mat-card{box-shadow: none !important;}
  .prcContainer .customerName{width: 30rem !important;text-overflow: ellipsis !important;overflow: hidden !important;white-space: nowrap !important;}
  
  .customerName .tooltiptext {display: none; background: #515457; color: #fff; text-align: left; border-radius: .6rem; padding: .5rem 0;z-index: 1123456;} 
  .customerName .prcContainer .dots:hover .tooltiptext {display: block;}
  .customerName .mat-tooltip {background: #515457 !important; color: #fff !important; font-size: 1.6rem !important;top: 0 !important; right: 0 !important; left: 0 !important; bottom: 0 !important; word-break: break-all !important;}
   
  .prcContainer .row_center{ text-overflow: ellipsis !important; overflow: hidden !important; white-space: nowrap !important; text-align: left;}
  .prcContainer .row_center1{ text-overflow: ellipsis !important; overflow: hidden !important; white-space: nowrap !important; text-align: left;width: 15rem;}
  .prcContainer .overflow{max-height: 50vh;overflow-y: scroll;overflow-x: hidden; box-sizing: border-box; scrollbar-color: #27ae60 #27ae60; scrollbar-width: thin;}
  .overflow::-webkit-scrollbar {width: .7rem;  max-height: 1.0rem;height: 1rem}
  .overflow::-webkit-scrollbar-track {display: none;border-radius: 1.0rem;}
  .overflow::-webkit-scrollbar-thumb {background: #6A6868 !important;border-radius: 1.0rem;  max-height: 1.0rem;}
  .overflow::-webkit-scrollbar-thumb:hover {background: #585757 !important;}
  .prcContainer .hideContent {overflow: hidden;line-height: 1.0rem;height: 50vh;}
  .prcContainer .showContent {line-height: 1.0rem; height: auto;}
  .prcContainer .mat-table{font-family: 'Open Sans', sans-serif !important;}
  .prcContainer .dots{display: inline-block;width: 9%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
  .prcContainer .ten{width: 10%;}
  .prcContainer .eleven{width: 11%;}
  .prcContainer .onetwo{width: 12%;}
  .prcContainer .onethree{width: 13%;}
  .prcContainer .onefour{width: 14%;}
  .prcContainer .onefive{width: 15%;}
  /* tooltip */
  .tooltiptext {display: none; background: #27AE60; color: #fff; text-align: left; border-radius: .6rem; padding: .5rem 0;
    z-index: 1123456;word-break: break-all !important;} 
  .prcContainer .dots:hover .tooltiptext {display: block;}
  .mat-tooltip {background: #27AE60 !important; color: #fff !important; font-size: 1.6rem !important; max-width: 125rem !important;
  top: 0 !important; right: 0 !important; left: 0 !important; bottom: 0 !important;word-break: break-all;}
   
  /* Position the tooltip */
  .prcContainer .headingbar{width: 102%;margin-left: -1.8rem; font-weight: 600;}
  .prcContainer .hero-content {
   /*  margin-top: 9%; */
    width: 100%!important;
    margin-left: 11%;
    margin-bottom: 5rem;
    /* height: 100vh; */
  }
  .prcContainer .full-width{width: 100% !important;}
  .prcContainer .sfdAcc{text-overflow: ellipsis; white-space: nowrap;}
  .prcContainer .box-margin{margin-top: 3.0rem;}
  .prcContainer .dashboard-heading{position: relative; height: 5rem;}
  .prcContainer .msa-button{position: absolute; right: 0;cursor: pointer !important;}
  .prcContainer .pending-contract{font-size: 2.50rem; font-weight: 500;}
  /* Dashboard end */
  .prcContainer .contractbox{width: 29% !important;background: #fff !important;margin-right: 2.4rem !important;border-radius: .7rem !important;}
  .prcContainer .contractbox2{border-bottom: .1rem solid #27AE60 !important;width: 100%;height: 48% !important;}
  .prcContainer .contractupdate{margin-left: 2.9rem !important;margin-top: 2.3rem !important;}
  .prcContainer .gotocontract{width: 95% !important;margin-left: 1.1rem !important;margin-top: 2.5rem !important;border: none !important;}
  .prcContainer .paddingleft{padding-left: 1rem !important;}
  .prcContainer .paddingleftone{padding-left: 1rem !important;}
  .prcContainer .paddingrightone{padding-right: 1rem !important;}
  .prcContainer .paddingrightthree{padding-right: 3rem !important;}
  .prcContainer .inline{display: inline !important;position: relative !important;bottom: .5rem !important; font-size: 2rem !important; font-weight: 600;left: -1rem !important;}
  .prcContainer .existingSfx{margin-bottom: 5% !important;padding-top: 0 !important;}
  /* *****************************************************************************************************
                                              MSA COMPONENT 
  ****************************************************************************************************** */
  .prcContainer .msaName{max-width: 14rem !important;text-overflow: ellipsis;overflow: hidden !important;white-space: nowrap !important;}  
  .prcContainer .msaDeleteButton{text-align: left !important; padding-left: 0 !important;}
  .prcContainer .msaSearchName{text-overflow: ellipsis !important;overflow: hidden !important;white-space: nowrap !important;width: 15rem !important;padding-right: 1rem;}
  .prcContainer .msaSearchEmail{text-overflow: ellipsis !important;overflow: hidden !important;white-space: nowrap !important;width: 27rem !important; padding-right: 1rem;}
  .prcContainer .msaSearchGST{text-overflow: ellipsis !important;overflow: hidden !important;white-space: nowrap !important;width: 16rem !important; padding-right: 1rem;}
  .prcContainer .msaSearchPAN{text-overflow: ellipsis !important;overflow: hidden !important;white-space: nowrap !important;width: 11rem !important; padding-right: 1rem;}
  
  .prcContainer .consignorButton{position: relative; top: 1.5rem; left: -1rem;}
  .prcContainer .pincodeText{cursor: pointer !important; color: #1a1a1a !important;background: #fff !important;}
  .prcContainer .emailTextMsa{overflow:  hidden !important; text-overflow: ellipsis !important; white-space: nowrap !important; }
  /* Ng- Select */
  .prcContainer .ng-select{top: 0 !important;box-shadow: 0 0.2rem 0.2rem #00000029 !important;padding-top: .3rem !important;
  }
  .prcContainer .ng-option-label{font-size: 1.6rem !important;}
  .prcContainer .ng-select .ng-select-container .ng-value-container {padding-left: .6rem !important;font-size: 1.6rem !important;}
  .ng-dropdown-panel.creditNgDropdown .ng-dropdown-panel-items .ng-option.ng-option-marked {background:#27AE60 !important;color: #fff;}
  #ngselect.ng-dropdown-panel-items .ng-option.ng-option-marked {background:#27AE60 !important;color: #1a1a1a}
  .prcContainer .ng-select .ng-select-container{min-height: 2.7rem !important;border: .1rem solid #6A6868 !important; border-radius: .2rem !important;}
  .prcContainer .ng-select.ng-select-single .ng-select-container {height: 2.7rem !important;}
  .prcContainer .advance-search.ng-select-single .ng-select-container{background: #27AE60 !important; color: #fff !important; }
  .ng-dropdown-panel.creditNgDropdown .ng-dropdown-panel-items .ng-option {font-size: 1.4rem !important; padding: .2rem 1.0rem !important;background: #fff !important;}
  .prcContainer .ng-select.ng-select-opened>.ng-select-container{border: .1rem solid #27AE60 !important; border-radius: .2rem !important;}
  .prcContainer .ng-select.ng-select-single .ng-select-container .ng-value-container .ng-input {top: 0 !important;}
  .prcContainer ng-select select-dropdown > div {z-index: 2 !important;}
  /* .ng-dropdown-panel.creditNgDropdown .ng-dropdown-panel-items .ng-option.ng-option-selected, .ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-selected.ng-option-marked {
    background: none !important;} */
  .ng-dropdown-panel.creditNgDropdown .ng-dropdown-panel-items .ng-option.ng-option-selected .ng-option-label, .ng-dropdown-panel.creditNgDropdown .ng-dropdown-panel-items .ng-option.ng-option-selected.ng-option-marked .ng-option-label {
    font-weight: normal !important ;}
  .prcContainer .advance-search.ng-select-opened>.ng-select-container .ng-arrow {border-color: transparent transparent #fff !important;}
  .ng-dropdown-panel.creditNgDropdown.ng-select-bottom{border: .1rem solid #6A6868 !important; border-radius: .2rem !important;}
  .prcContainer .ng-select .ng-arrow-wrapper .ng-arrow {border-color: #1a1a1a transparent transparent !important;}
  .prcContainer #ngselect .ng-arrow-wrapper .ng-arrow {border-color: #1a1a1a transparent transparent !important;}
  .prcContainer #ngSelect{top: 0 !important;}
  .prcContainer .paddingleft{padding-left: 0 !important;}
  .prcContainer .ng-select .ng-select-container .ng-value-container .ng-input>input{padding-left: .6rem !important;}
  /* Ng-select */
  
  :-webkit-scrollbar {box-shadow: inset 0 0 .2rem #ccc;border-radius: 2rem;height: 1rem}
  ::-webkit-scrollbar-thumb {border-radius: 1rem; background: #6A6868 !important;}
  ::-webkit-scrollbar-thumb:hover {background: #585757 !important;}
  .prcContainer .form-control{height: 2.7rem !important; font-size: 1.6rem;}
  .prcContainer .hero-content-2{margin-top: 2%;  width: 78%;  margin-left: 11%; margin-bottom: 8rem;position: relative;}
  .prcContainer select{height: 2.7rem;color: #27AE60;}
  .prcContainer .msaOperation{display: flex;position: relative;}
  .prcContainer .msabutton{text-align: right;position: absolute;right: 0;bottom: 1rem}
  .prcContainer #mat-card-heading{background: #515457 !important; font-size: 1.6rem !important; color: #fff !important; padding: 1.0rem 2.0rem !important;}
  .prcContainer .mat-button.mat-warn .mat-button-focus-overlay, .mat-icon-button.mat-warn .mat-button-focus-overlay, .mat-stroked-button.mat-warn .mat-button-focus-overlay{background-color: transparent !important;}
  /* Button */
  .prcContainer .mat-icon-button{width: 4rem !important; height: 4rem !important; line-height: 1.8 !important; border-radius: 0 !important;}
  .prcContainer .example-button-row button, .example-button-row a {  margin-right: .8rem; }
  .prcContainer .mat-raised-button.mat-primary {background:  #27AE60; }
  .prcContainer .mat-raised-button {color : currentColor; padding: 0 1.6rem !important;border-radius: 2rem !important;line-height: 1.8 !important;}
  .prcContainer .example-button-row button,.example-button-row a {margin-right: .8rem;}
  .prcContainer .mat-raised-button.mat-primary {background:  #81C784 !important; border: .2rem solid #81C784 !important;}
  .prcContainer .mat-raised-button:not([disabled]):hover {background: rgb(79, 167, 82) !important;border: .2rem solid rgb(33, 110, 36) !important; }
  .prcContainer .mat-raised-button[disabled] {opacity: 0.6;color : #F1F1F1; background: transparent;}
  .prcContainer .btn1 {color: rgb(49, 46, 46);background: rgba(255, 222, 121, 0.96);border-radius: 3.0rem 3.0rem 3.0rem 3.0rem;font-size: 1.6rem;color:#fff }
  .prcContainer .btn1:not([disabled]):hover {background: rgb(18, 107, 55);color: #fff; }
  .prcContainer tr.mat-header-row {height: 4.5rem !important;}
  .prcContainer button:focus {outline:0;}
  /* end of button  */
  /* mat horizontal line */
  .prcContainer .mat-divider{border-top-color: #27AE60;border-top-width: .2rem;}
  /* mat horizontal line color */
  .prcContainer input{height: 2.7rem; font-size: 1.4rem;}
  .prcContainer .page-header {font-size: 2.4rem;font-weight:normal;margin: 4.0rem 0 0 1.4rem;font-family: 'Open Sans', sans-serif;}
  
  .prcContainer th{background: #F1F1F1; line-height: 1.4 !important;}
  .prcContainer select{color: #27AE60;}
  .prcContainer select option:hover {color: black;}
  .prcContainer select option:first-child:hover{color: #27AE60;}
  .prcContainer .consignor-heading{font-weight: bold;}
  .prcContainer table {width: 100%;}
  .prcContainer .dashboardTable .mat-sort-header-arrow, [dir=rtl] .mat-sort-header-position-before .mat-sort-header-arrow {margin: 0px 10px 0 1px !important;}
  .prcContainer .dashboardOppor{width: 13rem !important;}
  .prcContainer table.mat-table {box-shadow: none !important;}
  .prcContainer tr.mat-footer-row {font-weight: bold;}
  .prcContainer .mat-table-sticky {border-top: .1rem solid #e0e0e0;}
  .prcContainer .right-aligned-header > .mat-content {justify-content: space-between;}
  .prcContainer .inner-box {background:#fff; padding:0; margin:0;}
  .prcContainer .padding20 {padding-top:2.0rem;}
  .prcContainer .text-heading-18 {font-size:1.8rem; font-weight:bold; color:#1a1a1a;}
  .prcContainer .tablinput{height: 1.9rem; width: 9.8rem;}
  .prcContainer .detail{width: 100%;height: 4.5rem; padding: 1.0rem; margin-left: .3rem;}
  .prcContainer .detail1{width: 100%;height: 4.5rem;margin-left: .3rem;}
  .prcContainer .error{height: 1.0rem; margin: 0; padding: 0;  position: relative; font-weight: bold; left: 2.0rem; top: -.4rem;font:1.0rem; font-size: 1.4rem; color:red; bottom: .5rem;}
  .prcContainer .error1{ color: rgb(163, 63, 63); height: 1.0rem; margin: 0; padding: 0;position:absolute;}
  .prcContainer .error2{color: red; margin: 0; padding: 0; height: 1.5rem;}
  .prcContainer .button-msa{color: rgb(33, 110, 36);width: 2.4rem; position: relative; top: .3rem;left: 0%;cursor: pointer;
       font-size: 3.2rem;border: none; background: transparent;}
  .prcContainer #defualtBranchSearch{position: absolute;top: .5rem;left: 2rem;font-size: 1.8rem; color: #ccc; cursor: pointer;}
  .prcContainer #defualtBranchSearch1{position: absolute; right: 4rem; font-size: 1.7rem; top: .5rem; z-index: 10; color: #BCBCCB;}
  .prcContainer #defualtBranchSearch9{position: absolute; right: 2rem; font-size: 1.7rem; top: 1rem; z-index: 10; color: #BCBCCB;}
  .prcContainer #defualtBranchSearch2{position: absolute;left: 2.0rem; font-size: 1.7rem; top: .6rem; z-index: 10; color: #ccc;}
  .prcContainer #defualtBranchSearch5{position: absolute;left: 2.0rem; font-size: 1.7rem; z-index: 10; color: #ccc;}
  .prcContainer #defualtBranchSearchbase{position: absolute;top: .7em;left: 2rem;font-size: 1.8rem; color: #ccc; cursor: pointer;}
  
  .mat-primary.creditSelect .mat-option.mat-selected:not(.mat-option-disabled) {color: #1a1a1a !important;}
   /* Mat Radio Button */
   .prcContainer .mat-card-content, .mat-card-subtitle{font-size: 1.4rem !important;}
   .prcContainer .mat-radio-button {font-family: 'Open Sans', sans-serif !important; position: relative; padding-top: 1rem !important;}
   .prcContainer .mat-radio-label{margin-right: 1rem !important;}
   .prcContainer .insured .mat-radio-label{margin-right: -.3rem !important;}
   .prcContainer .penelity .mat-radio-label{margin-right: 0rem !important;}
  
   .prcContainer .mat-radio-label-content{padding-left: 0px !important;position: relative !important; left: -.8rem !important; font-weight: normal; font-size: 1.6rem;margin-top: -1rem;}
   .prcContainer .mat-radio-outer-circle{width: 1.6rem !important; height: 1.6rem !important;border-width: .2rem !important;}
   .prcContainer .mat-radio-inner-circle{width: 1.6rem !important; height: 1.6rem !important;}
   .prcContainer .mat-radio-ripple{width: 0px !important; height: 0px !important;}
   .prcContainer .mat-radio-button.mat-accent .mat-radio-inner-circle {background: #27AE60;}
   .prcContainer .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {border-color: #27AE60;}
   .prcContainer .mat-radio-button ~ .mat-radio-button {margin-left: 1.6rem;}
   .prcContainer .mat-radio-inner-circle{width: 1.6rem !important; height: 1.6rem !important;}
   .prcContainer .mat-radio-button.mat-radio-disabled .mat-radio-label-content{color: #1a1a1a !important;}
   /* end of Radio Button */
  /* Mat - Date Picker */
  .prcContainer #datepickerwidth{width: 100% !important;}
  .prcContainer .mat-datepicker-toggle-default-icon ng-star-inserted{position:absolute; top: -.5rem; }
  .creditDatepicker .mat-calendar-body-selected{background: #27AE60 !important;}
  .creditDatepicker .mat-calendar-body-today:not(.mat-calendar-body-selected){border-color: #27AE60 !important;}
  /* end of Mat data Picker */
  /* checkbox */
  .prcContainer .mat-checkbox-label{font-weight: normal; font-size: 1.6rem;}
  .prcContainer .mat-checkbox-inner-container{width: 1.6rem !important; height: 1.6rem !important;margin-right: 0px !important}
  .prcContainer .mat-checkbox-ripple{width: 0px !important; height: 0px !important;}
  .prcContainer .mat-checkbox .mat-checkbox-frame {border-color: #6a6868; border-width: .2rem;}
  .prcContainer .mat-checkbox-checked .mat-checkbox-background {background: #81C784 !important;}
  .prcContainer .mat-checkbox-checked.mat-accent .mat-checkbox-background, .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
    background: #27AE60;}
  .prcContainer .mat-checkbox-layout .mat-checkbox-label{padding-left: .6rem !important;}
  /* checkbox */
  /* mat-select */
  .mat-select{font-family: 'Open Sans', sans-serif !important;position:absolute; top: 0;}
  .cdk-overlay-connected-position-bounding-box .cdk-overlay-pane .mat-select-panel.ng-animating {display: none !important;} 
  .mat-select-panel.creditSelect {min-width: calc(100% + 10px) !important; width: 100% !important;  top: 1.9rem !important;margin-top: 0rem !important;
    left: 1.5rem !important; box-shadow: none !important;position: absolute !important; border: .1rem solid #6A6868 !important;border-radius: .2rem !important;}
    
  .mat-select-panel {min-width: calc(100% + 10px) !important; width: 100% !important;  top: 1.9rem !important;margin-top: 0rem !important;
    left: 1.5rem !important; box-shadow: none !important;position: absolute !important; border: .1rem solid #6A6868 !important;border-radius: .2rem !important;}
  .mat-select-panel .mat-optgroup-label, .mat-select-panel .mat-option {
      font-family: "Open Sans",sans-serif !important;
  }
  .mat-option {
      height: 2.7rem !important;
  }
    .prcContainer .mat-select-panel::-webkit-scrollbar-track{background: transparent !important;}
    .cdk-overlay-pane {transform: translateX(-16px) !important;}
  .mat-select{position:absolute; top: 0; }
  .mat-select-value-text{position: relative; top: -.2rem; font-size: 1.4rem !important;text-transform: uppercase;}
  .creditSelect .mat-option{height: 2.7rem !important;}
  .creditSelect .mat-option-text{font-size: 1.4rem !important;font-family: "Open Sans", sans-serif !important;}
  
  /* mat-select */
  /* Mat form field */
  .prcContainer .mat-form-field-appearance-outline .mat-form-field-suffix {left: 1.2rem !important; top: -.2rem !important; right: 0 !important;}
  .prcContainer .mat-form-field-outline{height: 2.7rem; width: 100%;}
  .prcContainer .mat-form-field-infix{height: 3.2rem; border-top: none !important; top: 1.2rem !important;}
  .prcContainer .mat-form-field-appearance-outline .mat-form-field-infix {padding: 0em 0 0em 0;}
  .prcContainer .mat-form-field{width: 100% !important;top: -.5rem; font-family: 'Open Sans', sans-serif !important;}
  .prcContainer .mat-form-field-appearance-outline .mat-form-field-wrapper{margin: 0 !important;}
  .prcContainer .mat-form-field-wrapper{padding-bottom: 0 !important;}
  .prcContainer .mat-form-field-appearance-outline{margin: 0 0;position: relative !important;top: 0 !important;}
  .prcContainer .mat-form-field-appearance-outline:hover{border-color: #27AE60;}
  .prcContainer .mat-form-field-appearance-outline .mat-form-field-outline{position: absolute; top: 0;color: #6a6868 !important ; box-shadow: 0 .2rem .2rem #00000029;}
  .prcContainer .mat-form-field.mat-focused .mat-form-field-ripple {background: #27AE60 !important;}
  .prcContainer .mat-form-field-appearance-outline .mat-form-field-outline-thick {color: #27AE60 !important;}
  .prcContainer .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {color: #27AE60 !important;}
  .prcContainer .mat-form-field-appearance-outline .mat-form-field-outline-start {border-radius:0 !important ;
    min-width: 0 !important ;}
  .prcContainer .mat-form-field-appearance-outline .mat-form-field-outline-end {border-radius: 0 !important ;
    min-width: 0 !important ;}
    .prcContainer .mat-focused .mat-form-field-label {color: green !important;}
  .prcContainer .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {
      background: #ccc !important;}
  .prcContainer .msaClas.mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {
        background: #ccc !important;}
  .prcContainer .mat-input-element {position: absolute; top: -.6rem !important;margin-top: .4rem !important}
  /* End of mat form field */
    /* mat Table */
  .prcContainer tr.mat-footer-row, tr.mat-row{height: 4.2rem !important;}
  .prcContainer td.mat-cell:first-of-type, td.mat-footer-cell:first-of-type, th.mat-header-cell:first-of-type{padding-left: 2.4rem !important;}
  .prcContainer td.mat-cell, td.mat-footer-cell, th.mat-header-cell {border-bottom-width: .1rem !important;}
  .prcContainer mat-header-cell:first-of-type{padding-left: 1.2rem !important;}
  .prcContainer mat-header-cell:last-of-type{padding-right: 0 !important;}
  .prcContainer mat-cell:first-of-type, mat-footer-cell:first-of-type, mat-header-cell:first-of-type {
    padding-left: 1.2rem !important;}
  .prcContainer mat-cell:last-of-type, mat-footer-cell:last-of-type, mat-header-cell:last-of-type {
    padding-right: 0 !important;}
  .prcContainer .mat-header-cell{font-size: 1.6rem; font-weight: 600; background: #F1F1F1;}
  .prcContainer .mat-table{font-family: 'Open Sans', sans-serif !important;}
  .prcContainer mat-header-row{min-height: 4.5rem !important;}
  .prcContainer .example-container {overflow: auto;box-shadow: none;}
  .prcContainer mat-footer-row, mat-row {min-height: 4.5rem !important;}
  .prcContainer .mat-cell, .mat-footer-cell {font-size: 1.6rem !important; word-break: break-all !important;}
  .prcContainer .wordBreakall{word-break: break-all !important;}
  .prcContainer .wordBreakWrap{word-break: break-word !important;}
  .prcContainer .borderPreview{border: .2rem solid #fff !important;}
  .prcContainer .commercialPreview{display: flex; flex-direction: column; justify-content: center; min-height: 10rem !important;}
  .prcContainer .commercialPreview p{margin: 0 !important; font-size: 1.8rem;}
  .prcContainer .commercialPreview span{font-weight: bold; font-size: 2rem;}
  .prcContainer .text-heading-P{font-size: 1.8rem;background: #f1f1f1; display: flex;align-items: center; min-height: 6.6rem;}
  .prcContainer .overflow{min-height: 52vh;overflow-y: scroll;overflow-x: hidden; box-sizing: border-box;scrollbar-color: #27ae60 #27ae60; scrollbar-width: thin;}
  .prcContainer .overflow::-webkit-scrollbar{width: .7rem; cursor:  pointer !important;height: 1rem}
  .prcContainer .overflow::-webkit-scrollbar-track {display: none;}
  .overflow::-webkit-scrollbar-thumb {background: #6A6868 !important;}
  .overflow::-webkit-scrollbar-thumb:hover {background: #585757 !important;}
  ::-webkit-scrollbar-thumb {background: #6A6868 !important;}
  ::-webkit-scrollbar-thumb:hover {background: #585757 !important;}
  /* end of mat table */
  .prcContainer .mat-button, .mat-fab, .mat-flat-button, .mat-icon-button, .mat-mini-fab, .mat-raised-button, .mat-stroked-button{
    font-family:'Open Sans', sans-serif !important;  }
  /* Mat Dialog Container */
  .mat-dialog-container {border-radius: 2rem !important;}
  
  .cdk-overlay-dark-backdrop {background: transparent !important;}
  .cdk-overlay-backdrop {background: rgba(51, 51, 51, 0.78) !important;}
  .creditDialog .cdk-global-scrollblock{top: 0 !important;}
  .prcContainer .cdk-global-scrollblock{top: 0 !important;}
  .cdk-global-scrollblock{top: 0 !important;}
  /* End of Mat Dialog Container */
  /* Mat Checkbox */
  .prcContainer .mat-checkbox-inner-container{width: 1.6rem !important; height: 1.6rem !important;margin-right: 0 !important}
  .prcContainer .mat-checkbox-checked.mat-accent .mat-checkbox-background, .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
    background: #27AE60;}
  .prcContainer .mat-checkbox-label{font-weight: normal; font-size: 1.2rem;}
  .prcContainer .mat-checkbox-label{font-weight: normal; font-size: 1.2rem;}
  .prcContainer .mat-checkbox-ripple{width: 0 !important; height: 0 !important;}
  .prcContainer .mat-checkbox-checked.mat-accent .mat-checkbox-background, .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
    background: #27AE60;}
  /* end of checkbox */
  /* mat-expansion */
  .prcContainer .mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow: none !important;}
  .prcContainer #box-shadow{box-shadow: none; padding-top: 0; padding-bottom: 0; }
  .prcContainer #box-shadow{box-shadow: none; padding-top: 0; padding-bottom: 0;}
  .prcContainer .mat-expansion-panel-spacing {margin: 0 0;}
  .prcContainer .mat-expansion-indicator{transform: rotate(0deg) !important;border-style: none; width: 0; height: 0; border-left: .7rem solid transparent;border-right: .7rem solid transparent; 
   border-top: 1rem solid; position:  relative !important; top: 1rem !important;}
  .prcContainer .mat-expansion-indicator::after{border-style: none;  color: #fff;}
  .prcContainer .mat-expansion-indicator.mat-expanded{transform: rotate(0deg) !important;border-top: 1rem solid #27AE60 !important;}
  .prcContainer .mat-expansion-panel-header.mat-expanded{color:#27AE60; border-bottom: .2rem solid #27AE60;border-radius: 0 !important;}
  .prcContainer .mat-expansion-panel-header {  padding: 0 0!important;border-bottom: .1rem solid #f1f1f1;height: 5.0rem !important;
    font-size: 1.6rem; font-family: 'Open Sans', sans-serif !important}
  .prcContainer .mat-expansion-panel-content{font-family: 'Open Sans', sans-serif !important}
  .prcContainer .mat-content.mat-expanded {border-bottom: .2rem solid red !important; font-weight: bold;color: #27AE60;border-color: #27AE60;}
  .prcContainer .mat-content { font-weight: bold; padding-top: 2.0rem;}
  .prcContainer .mat-expansion-panel-body {padding: 0 0 0 !important}
  .prcContainer .mat-card { font-family: 'Open Sans', sans-serif !important;box-shadow: none !important;}
  .prcContainer .mat-expansion-panel-spacing {margin: 0 0;}
  .prcContainer .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']):hover { background: #fff; } 
  /* mat-expansion */
  .prcContainer #plusicon {color: #27AE60; position: relative; right: 0;font-size: 3.2rem; left: .5rem;}
  .prcContainer #exelLink{position: relative;  right: 1.2rem !important;}
  .prcContainer .fonts{font-size: 1.6rem !important;}
  .prcContainer .fontSizeforview{font-size: 3rem !important;}
  /* Advance Search Pop-Up */
  .prcContainer .fa-times{color: #1a1a1a;position: absolute;right: 1rem;top: -1rem; cursor: pointer;opacity: 0.6;}
  .prcContainer .zonalheadingbar{background: #F1F1F1; height: 4.5rem; display: flex;  align-items: center; line-height: 1.2;
  font-size: 1.6rem; font-weight: 500;border-right: .1rem solid #fff;}
  .prcContainer .commercial-padding{padding-left: .5rem; padding-right: .5rem;}
  .prcContainer #popup-hr{margin-top: .5rem; border: 0;border-top: .2rem solid #27AE60;}
  .prcContainer #h2{margin-top: 1.8rem; margin-left: 2.0rem; margin-bottom: 0; min-width: 47rem !important;}
  .prcContainer #h3{margin-top: 1.8rem; margin-bottom: 0; min-width: 47rem !important;}
  .prcContainer #h4{margin-top: 1.8rem; margin-bottom: 0; min-width: 47rem !important;}
  .prcContainer .marginSpan{margin-left: 2.2rem !important;font-weight: bold;}
  .prcContainer .viewHeading{position: relative;left: 3.5%;margin-top: 3rem !important;}
  
  .prcContainer .margin-row{margin-right: 0 !important; margin-left: 0 !important;}
  .prcContainer .row-margin{margin-left: 0; margin-right: 0;padding-left: 0 !important;padding-right: 0 !important;position: relative;}
  .prcContainer .background{background: #27AE60; color: #fff;}
  .prcContainer .searchby{font-weight: bold; font-size: 1.6rem !important; margin-bottom: 2.5rem; padding-left: 1.5rem; margin-right: 0; margin-top: .4rem;}
  .prcContainer .searchby1{font-weight: bold; font-size: 1.6rem !important; margin-bottom: 1.5rem; padding-left: 1.5rem; margin-right: 0; margin-top: .4rem;}
  .prcContainer .mat-dialog-content{display: block; margin: 0 0; padding: 0 0; max-height: 52vh; overflow: auto;}
  .prcContainer .mat-dialog-container{border-radius: 2.0rem; padding: 0; overflow-x: unset;}
  .prcContainer .width{width: 20%;height: 3.5rem; display: flex; border-bottom: 1 solid #f1f1f1; align-items: center;overflow: hidden;text-overflow: ellipsis; white-space: nowrap;}
  .prcContainer .input-field{height: 2.7rem; padding-left: 2.3rem;cursor: pointer;}
  /* End of Pop Up */
  .prcContainer .padding-left{padding-left: .6rem;}
  .prcContainer .paddingzero{padding: 0 !important;}
  .prcContainer .paddingtopzero{padding-top: 0 !important;}
  .prcContainer .inputBox{position:  relative !important; top: .5rem !important;}
  
  .prcContainer .backgroundWhite{background: #fff !important;}
  
  /* Consignor and Consignee */
  .prcContainer .addButton{cursor: pointer !important;color: rgb(33, 110, 36) !important;width: 2.4rem !important; position: relative !important; left: 0% !important; font-size: 3.2rem !important; border: none !important; background: transparent !important;top: .3rem !important;}
  .prcContainer .billingdialogforbranch{position: relative !important;height: 3rem !important;padding-top: 1rem !important;margin-top: 1rem !important;}
  .prcContainer .inputWidth{max-width: 18rem !important;}
  /* *****************************************************************************************************
                                            End of MSA COMPONENT 
  ****************************************************************************************************** */
  
  /* *****************************************************************************************************
                                            OPPORTUNITY COMPONENT 
  ****************************************************************************************************** */
  .prcContainer input{height: auto !important; font-size: 1.4rem;}
  .prcContainer .rightpadding{padding-right: 0;}
  /* *****************************************************************************************************
                                            END OF OPPORTUNITY COMPONENT 
  ****************************************************************************************************** */
  
  /* *****************************************************************************************************
                                            SERVICE
  ****************************************************************************************************** */
  .prcContainer .blockDisplay{display: block !important;font-size:10px !important;}
  .prcContainer .mat-form-field-appearance-outline .mat-form-field-flex{position: static !important;padding: 0 .45em 0 .45em !important;}
  .prcContainer .mat-form-field.mat-focused.mat-primary .mat-select-arrow{color: #1a1a1a !important;}
  .prcContainer .service-fonts-checkbox{font-size: 1.6rem; margin-left: 0rem !important;position: relative; top: .2rem;font-family: 'Open Sans', sans-serif !important;}
  /* *****************************************************************************************************
                                            END OF SERVICE
  ****************************************************************************************************** */
  
  /* *****************************************************************************************************
                                            RATE CAARD
  ****************************************************************************************************** */
  .rcIcon{width: 1.8rem;HEIGHT: 1.8rem;  position: relative;  top: .4rem;  margin-right: .5rem;}
  .prcContainer .containerTile{margin-left: 1.5rem !important;}
  .prcContainer #tileLine{border-width: .1rem !important;border-top-color: #fff !important;position: relative;margin-top: -1rem !important;margin-left: -2rem !important;width: 11.9rem !important;}
  
  /* Branch Assignment */
  .prcContainer .columnWidth{width: 25rem  !important; padding: 1.5rem; position: relative;}
  .prcContainer .sectionWidth{display: flex !important; width: 225rem !important;}
  .prcContainer .customerLocation{border-right: .1rem solid #fff !important;padding-top: .4rem !important;height: 4.5rem !important;}
  .prcContainer .gstInput{padding-left: .5rem !important;text-overflow: ellipsis !important;white-space: nowrap !important;overflow: hidden !important;}
  /* End of Branch Assignment */
  .prcContainer .customeRemoveIcon{cursor: pointer; position: relative !important; bottom: .3rem !important;color: #27AE60 !important; display: flex !important;justify-content: center !important;}
  .prcContainer .flexproperty{display: flex;flex-wrap: wrap;}
  .prcContainer .rightBottom{margin-right: 1rem !important; margin-bottom: 1rem !important;}
  .prcContainer .ng-value {font-size: 1.4rem !important;}
  .selectValue .ng-value{font-size: 1.4rem;padding-top: .3rem;}
  .ngValue .ng-value {font-size: 1.4rem !important;padding-top: 0rem !important;}
  .ng-select .ng-has-value .ng-placeholder {display: none !important;}
  .prcContainer .safextenson{width: 14% !important;}
  .prcContainer .commercialboxflex{display: flex; margin-top: 0 !important;}
  .prcContainer .commercialbox{width: 13.9rem;border-radius: .5rem !important; height: 11.2rem;margin-top: 0 !important; box-shadow: 0 .3rem .6rem #00000029; background: #ccc !important;cursor: pointer;}
  .prcContainer .commercialboxRed{width: 13.9rem;border-radius: .5rem !important; height: 11.2rem;margin-top: 0 !important; box-shadow: 0 .3rem .6rem #00000029; background: #B00020 !important;cursor: pointer;}
  .prcContainer .commercialboxRed p{color: #fff; font-size: 1.2rem;}
  .prcContainer .commercialboxRed h6{color: #fff; margin-top:0; font-size: 1.6rem; font-weight: bold;}
  .prcContainer .commercialboxRed .deleteIcon1{font-size: 2.4rem !important; position: relative; left: 9rem !important; top: .4rem !important;color: #fff !important;}
  .prcContainer .commercialbox h6{ margin-top:1.0rem; margin-top: 0 !important; font-size: 1.6rem; font-weight: bold; border-radius: .5rem;}
  .prcContainer .commercialbox p{font-size: 1.2rem;}
  .prcContainer .commercialbox .deleteIcon1{font-size: 2.4rem !important; color: #00000029 !important; position: relative; left: 9rem !important; top: .4rem !important;}
  .prcContainer #commercialboxdivider{position: relative; width: 7%; background: #27AE60; margin-top: -0.4rem; margin-left: -1.0rem; margin-left: -1.2%;border-color: #fff;border-width: .1rem !important;}
  .prcContainer .commercialbox1{width: 13.9rem; height: 11.2rem; margin-top: 0rem;   box-shadow: 0 .6rem .6rem #00000029;background: #27AE60;border-radius: .5rem;cursor: pointer;}
  .prcContainer .commercialboxcard{width: 13.9rem; height: 11.2rem; box-shadow: 0 .6rem .6rem #00000029;background: #27AE60;border-radius: .5rem;}
  .prcContainer .commercialboxcard h6{color: #fff; margin-top:0; font-size: 1.6rem; font-weight: bold;}
  .prcContainer .commercialboxcard p{color: #fff; font-size: 1.2rem;}
  .prcContainer .commercialboxcard .deleteIcon1{font-size: 2.4rem !important; position: relative; left: 9rem !important; top: .4rem !important;color: #fff !important;}
  .prcContainer .commercialbox1 h6{color: #fff; margin-top:0; font-size: 1.6rem; font-weight: bold;}
  .prcContainer .commercialbox1 p{color: #fff; font-size: 1.2rem;margin-left: 0 !important;}
  .prcContainer .divider{margin-top: 0; margin-bottom: 0 !important;width: 11rem;position: relative;left: -2rem;height: 0rem !important;
    border-width: .1rem !important;}
  .prcContainer .commercialbox1 .deleteIcon1{font-size: 2.4rem !important; position: relative; left: 9rem !important; top: .4rem !important;color: #fff !important;}
  
  .prcContainer .commercialbox2{width: 13.9rem;border-radius: .5rem !important; height: 11.2rem; margin-top: 0rem; box-shadow: 0 .3rem .6rem #00000029; background: linear-gradient(#FFFCFC, #EAEAEA);cursor: pointer;}
  .prcContainer .commercialbox2 h6{ margin-top:1.0rem; margin-top: 0 !important; font-size: 1.6rem; font-weight: bold; border-radius: .5rem;}
  .prcContainer .commercialbox2 p{font-size: 1.2rem;}
  
  .prcContainer .commercialbox3{width: 13.9rem;border-radius: .5rem !important; height: 11.2rem; margin-top: 0rem; box-shadow: 0 .3rem .6rem #00000029; background: #90EE90 !important;cursor: pointer;}
  .prcContainer .commercialbox3 h6{ margin-top:1.0rem; margin-top: 0 !important; font-size: 1.6rem; font-weight: bold; border-radius: .5rem;}
  .prcContainer .commercialbox3 p{font-size: 1.2rem;}
  
  .prcContainer #collapsedivider{background:#F1F1F1; margin-bottom: .8rem;}
  .prcContainer .zonalheading{font-size: 1.8rem; color: #1a1a1a; font-weight: bold; margin-top: 0;} 
  .prcContainer .zonalheadingheight{height: 5.4rem;}
  .prcContainer .zonalheadingbar1{font-size: 1.6rem; font-weight: 500; background: #F1F1F1; height: 2.3rem; display: flex;  align-items: center; justify-content: center; border:.1rem solid #fff;
    box-sizing: border-box; }
  .prcContainer .radiofont{font-size: 1.4rem;}
  .prcContainer .field-background{background: #F1F1F1;}
  .prcContainer .flexbox{display: flex; align-items: center;margin:.2rem; width: 100%;}
  .prcContainer .Branch{width: 12%; background: #F1F1F1;height: 5.4rem; border-right: 1 solid #fff;display: flex; align-items: center; padding-left: .4rem;
    font-size: 1.5rem;}
  .prcContainer #plusicon1 {color: #27AE60; z-index: 10; font-size: 2.3rem;}#box-shadow{box-shadow: none; padding-top: 0; padding-bottom: 0; }
  .prcContainer #box-shadow{box-shadow: none; padding-top: 0; padding-bottom: 0;}
  .prcContainer #search-icon{position: absolute;top: .5rem;font-size: 1.8rem;left: 2rem;color: #ccc !important; z-index: 6 !important;}
  .prcContainer .pincodeSearch{position: absolute;top: .5rem;font-size: 1.8rem;left: .5rem;opacity: .5;color: #ccc !important;z-index: 9999 !important;}
  
  .prcContainer .green-border{border: .1rem solid #27AE60; width: 100%;}
  .prcContainer .control{position: relative;padding-left: 2.2rem;}
  .prcContainer #search-icon2{position: absolute;top: .7rem;font-size: 1.8rem;left: 2.0rem;opacity: .3; z-index: 6;}
  .prcContainer #plusicon2{color: #27AE60; position: absolute; cursor: pointer; z-index: 6; font-size: 2.4rem;box-shadow: 0 .1rem .2rem #00000029;}
  .prcContainer h5 button#plusicon2{position: relative; box-shadow: none;}
  .prcContainer .right-aligned-header > .mat-content {justify-content: space-between;}
  .prcContainer .mat-content > mat-panel-title, .mat-content > mat-panel-title {flex: 0 0 auto;flex: inherit;}
  .prcContainer .mat-primary .mat-pseudo-checkbox-checked, .mat-primary .mat-pseudo-checkbox-indeterminate {
    background: #27AE60 !important;}
  .prcContainer .mat-pseudo-checkbox{width: 1.6rem !important; height: 1.6rem !important;}
  .prcContainer #zonal-input{border: none; width: 100%;height: 2.1rem !important;}
  .prcContainer #zonal-input::placeholder{text-align: center; color: #27AE60;}
  .prcContainer #zonal-input1{width: 100%;}
  .prcContainer #zonal-input1::placeholder{text-align: center; color: #27AE60;}
  .prcContainer .input::placeholder{font-size: 1.6rem !important;}
  .prcContainer .dropdown{ cursor: pointer;}
  .prcContainer .hoverDisplay {position: absolute;top: -3.2rem; width: 200%;right: -6.5rem;padding: 0;}  
  .prcContainer .mousehover:hover + .hoverDisplay{display: block;}
  .prcContainer .from{padding: 0 !important;}
  .prcContainer .to{padding: 0 !important;}
  .prcContainer .three{padding: 0 !important;}
  .prcContainer .flex-direction{flex-direction: column; padding: 0 !important;}
  .prcContainer .flex-box{display: flex; }
  .prcContainer .flex1{flex: 1 !important;}
  .prcContainer .flex2{flex: 2 !important;}
  .prcContainer .flex3{flex: 3 !important;}
  .prcContainer .flex4{flex: 4 !important;}
   .prcContainer #left-margin{margin-left: 2.0rem !important;}
  .prcContainer .consignee-mapping{font-size: 1.8rem; font-weight: bold; padding-bottom: .5rem;}
  .prcContainer .font-size{font-size: 1.6rem; font-weight: bold;}
  .prcContainer .border-bottom{border-bottom: .1rem solid #f1f1f1 !important;padding-top: .5rem; padding-bottom: .5rem;}
  .prcContainer .paddingleftzero{padding-left: 0 !important;}
  .prcContainer .paddingrightzero{padding-right: 0 !important;}
  .prcContainer .paddingleftPincode{padding-left: 2.5rem !important; cursor:  pointer !important;}
  .prcContainer .curson-pointer{cursor: pointer;}
  .prcContainer .paddingleft9{padding-left: .9rem !important;}
  .prcContainer .paddingtop{padding-top: .5rem; padding-bottom: .5rem;}
  .prcContainer .paddingtopone{padding-top: 1rem !important;}
  .prcContainer .paddingtopthree{padding-top: 3rem !important;}
  .prcContainer .paddingleft1point5rem{padding-left: 1.7rem !important;}
  .prcContainer .paddingleft5rem{padding-left: 5rem !important;}
  .prcContainer .paddingtophalf{padding-top: .5rem !important;}
  .prcContainer 
  
  
  /* base Location */ #defualtBranchSearch3{position: absolute;left: 83%; font-size: 1.7rem; top: .4rem;z-index: 10;color: #BCBCCB;}
  .prcContainer .margintop{margin-top: 1.0rem !important;}
  .prcContainer .paddingleft17{padding-left: 1.5rem !important;}
  .prcContainer .padding17left{padding-left: 1.7rem !important;}
  .prcContainer .security-provided-by{width: 97% !important; margin-left: -.5rem !important;}
  .prcContainer .paddingleftforremarks{padding-left: .3rem !important;}
  .prcContainer .margintop10{margin-top: 1rem !important;}
  .prcContainer .margintop20{margin-top: 2rem !important;}
  .prcContainer .commandmentspace{position: relative;top: 1.3rem;}
  .prcContainer .cityPanel .mat-select-panel{margin-left: 3.2rem !important;}
  .prcContainer .tableBox{padding-left: 0rem !important;padding-right: 3rem !important;margin-top: 1rem !important;width: 22rem !important;}
  .prcContainer .tableBoxState{padding-left: 0rem !important;padding-right: 3rem !important;margin-top: 1rem !important;width: 22rem !important;}
  .prcContainer .commandmentsection{width: 100% !important; padding-top: 10px; overflow: auto !important;}
  .prcContainer #widthzero{width: 0 !important;}
  .prcContainer .tncheading{font-size: 1.8rem; font-weight: bold;  margin-bottom: 1.5rem;}
  .prcContainer .pricingparameters{margin-top: 1.0rem; margin-bottom: 1.5rem;}
  .prcContainer .addNewButton{color: #27AE60 !important; font-size: 9.5rem !important; cursor: pointer !important; display: flex !important; justify-content: center !important;align-items: center !important;}
  .prcContainer .addNewText{ font-size: 1.6rem !important; position: relative; bottom: 1rem; left: 3.5rem; font-weight: bold;}
  .prcContainer .carton-text{position: relative !important; bottom: 3rem !important;cursor: pointer ; }
  .prcContainer .slaAddIcon{position: absolute !important;left: 0 !important;}
  
  .prcContainer .addSlab{cursor: pointer;color: #27AE60; position: absolute;top: 1rem;z-index: 10;font-size: 3.2rem;}
  .prcContainer .slabPadding{padding-top: .8rem !important;padding-right: 1rem !important;}
  .prcContainer .addButtonSlab{cursor: pointer !important;width: 2.4rem !important; font-size: 3.2rem !important; border: none !important; background: transparent !important;position: absolute !important;
    top: .8rem;}
  .prcContainer .saveButton{text-align: center !important;position: relative !important;top: 1rem !important;}
  /* *****************************************************************************************************
                                           END OF RATE CAARD
  ****************************************************************************************************** */
  /*  MSA OPERATION */
  /* .heading-bar { color:#fff; font-size: 1.6rem; position: relative; right: 1.7%;width: 103.4%;}  */
  .prcContainer .heading-bar {background: #F1F1F1;padding:1.0rem; color:black; font-size:1.6rem;width: 100%;left: 0;} 
  .prcContainer .heading-bar2 {padding:1.0rem; color:black; font-size:1.6rem;width: 100%;left: 0;} 
  .prcContainer .height{font-size: 1.6rem; height: 4.5rem; padding-top: .5rem; padding-bottom: .5rem;  border-bottom: 1 solid #f1f1f1; display: flex; align-items: center; }
  .prcContainer .label-text{font-size: 1.6rem; font-weight: bold; padding-top: .6rem;}
  .prcContainer .label-text-value{font-size: 1.6rem; font-weight: 100; padding-top: .6rem; text-overflow: ellipsis; white-space: nowrap;}
  
  /* *****************************************************************************************************
                                           Document Upload
  ****************************************************************************************************** */
  .prcContainer .background{background: #F1F1F1; font-size: 1.6rem;color: #fff;}
  .prcContainer .fonts{font-size: 1.6rem;}
  .prcContainer .bottom-border{border-bottom: .1rem solid #f1f1f1;}
  .prcContainer #secondry-button{background: #fff !important; color: #1a1a1a !important; border: .2rem solid #27AE60; font-weight: bold; box-sizing: border-box;}
  .prcContainer .box{opacity: 0.5; padding-top: 2.0rem; padding-bottom: 2.0rem; }
  .prcContainer .material-icons{cursor: pointer !important; }
  .prcContainer .tp-section {display: flex;align-content: center;align-items: center; height: 6.0rem;}
  .prcContainer .tp-margin {margin: 0 !important;}
  .prcContainer .mat-slide-toggle{height: 2.4rem !important;line-height: 1.8;}
  .prcContainer .mat-slide-toggle.mat-checked .mat-slide-toggle-bar{background: #27AE60 !important;}
  .prcContainer .mat-slide-toggle.mat-checked .mat-slide-toggle-thumb{background: #27AE60 !important;}
  .prcContainer .file_name{  white-space: nowrap;overflow: hidden;text-overflow: ellipsis; width: 180% !important; text-transform: uppercase !important;}
  
  /* *****************************************************************************************************
                                           END OF Document Upload
  ****************************************************************************************************** */
  
  /* *****************************************************************************************************
                                           STEPPER
  ****************************************************************************************************** */
  .prcContainer .breadcrumb{padding: 0rem 1.5rem !important;margin-bottom: 3rem !important;border-radius: .4rem !important;}
  .prcContainer .parent{position: relative !important;}
  .prcContainer .mat-step-label{font-size: 1.6rem;}
  .prcContainer .mat-stepper-horizontal, .mat-stepper-vertical {background: #F1F1F1 !important;}
  .prcContainer .mat-horizontal-content-container {overflow: hidden; padding: 0 !important;}
  .prcContainer .mat-horizontal-stepper-header {box-sizing: border-box;  flex-direction: column-reverse !important;  height: auto;padding: 0px !important;}
  .prcContainer .mat-horizontal-stepper-header .mat-step-label {padding: 0px 0px 0px !important;}
  .prcContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before, .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after{
    top: 6.8rem !important;}
  .prcContainer .mat-stepper-horizontal-line {border-top-width: .3rem !important; border-color: #27AE60 !important; position: relative !important; top: 3.8rem !important;
      margin:0px !important; min-width: 8rem !important;}  
  
  @media only screen and (max-width: 1440px) {
        .prcContainer .mat-stepper-horizontal-line{min-width: 6rem !important;}
      }
    
  @media only screen and (max-width: 1440px) {
        .prcContainer .mat-stepper-horizontal-line{min-width: 5rem !important;}
      }
      
  @media only screen and (max-width: 1366px) {
        .prcContainer .mat-stepper-horizontal-line{min-width: 4rem !important;}
      }
  .prcContainer .mat-step-icon{height: 2.4rem !important; width: 2.4rem !important;}
  .prcContainer .mat-horizontal-stepper-header-container { margin-bottom: 1% !important;}
  .prcContainer .mat-step-header .mat-step-icon {background: #27AE60 !important;}
  .prcContainer .stepper-label{position: relative;top: 0px; right: 0px; bottom: 0px; left: 0px;}
  .prcContainer .darkGreenColorText{color: #27AE60 !important; font-weight: bold;}
  .prcContainer .roundGreyColor{background-color: #ccc !important;}
  .prcContainer .ligtGreenColor{background-color: #81C784 !important; color: #f1f1f1;padding-top: .2rem;display: flex;
    align-items: center;justify-content: center;}
  
  .prcContainer .darkGreenColor{background-color: #27AE60 !important;}
  /* Stepper */
  .prcContainer .mat-stepper-horizontal{font-family: 'Open Sans', sans-serif !important;}/* end of Stepper */
  
  .prcContainer .mat-form-field-appearance-outline .mat-form-field-outline-end, .mat-form-field-appearance-outline .mat-form-field-outline-start{
    border: .1rem solid currentColor !important;}
  .prcContainer .mat-form-field-appearance-outline .mat-form-field-outline-start{display: none !important;border-radius:0 !important; min-width: 0 !important;}
  /* *****************************************************************************************************
                                           BULK UPLOAD
  ****************************************************************************************************** */
  .prcContainer .rightalign{text-align: right; float: right; cursor: pointer;}
  .prcContainer .download-error-icon{color: #27AE60; cursor: pointer !important; font-size: 32px;}
  .prcContainer #exelLink1{position: relative;}
  /* *****************************************************************************************************
                                           END BULK UPLOAD
  ****************************************************************************************************** */
  .prcContainer label{margin-bottom: .5rem !important;}
  .prcContainer .margin-span-left{margin-left: -.5rem !important;}
  
  /* *****************************************************************************************************
                                           BILLING
  ****************************************************************************************************** */
  .prcContainer .positionTop{position:  relative !important; top: .5rem !important;}
  .prcContainer .billingby-container {width: 134rem !important;overflow-y: hidden;overflow-x: auto !important;min-height: 14rem !important; margin-top: 1rem !important; scrollbar-color: #27ae60 #27ae60; scrollbar-width: thin;}
  .prcContainer .billingby-container .mat-form-field {width: 16rem !important; margin-right: 3rem !important;}
  .prcContainer .billingby-container::-webkit-scrollbar {height: 1.5rem !important;cursor:  pointer;}
  .prcContainer .billingby-container::-webkit-scrollbar-track{background: #EBEBF2;}
  .billingby-container::-webkit-scrollbar-thumb{background: #6A6868 !important; width: .5rem !important;border-radius: 1rem !important;}
  .billingby-container::-webkit-scrollbar-thumb:hover{background: #585757 !important;}
  .prcContainer #billingSearch{position: absolute;top: .4rem; left: .3rem; color: #ccc !important; font-size: 1.9rem !important; cursor:  pointer !important;}
  .prcContainer .plusIcon{color: #27AE60; font-size: 4rem; cursor: pointer;position: relative;bottom: .4rem;}
  /* Billing */
  
  
  /* Required Message Style */
  .prcContainer .hasErrorMsgRightsla {color: red; width: 25rem !important;text-align: left !important;position: relative !important;top: -1rem;}
  
  .prcContainer .hasErrorMsg {color: red !important;margin-bottom: -3px;width: 25rem !important;text-align: left !important;margin-top: 0px !important;position: absolute !important;margin-left: 12px;}
  .prcContainer .marginBilling {margin-bottom: .8rem !important;}
  .prcContainer .marginBottom{margin-bottom: 1.5rem !important;}
  .prcContainer .marginBottomone{margin-bottom: 1rem !important;}
  .prcContainer .paddingbottomone{padding-bottom: 1rem !important;}
  .prcContainer .hasErrorMsgRight {color: red !important;position: relative !important;bottom: 1rem !important;}
  .prcContainer .hasErrorMsgRightupload {color: red !important;position: relative !important;bottom: 3.5rem !important;left: 1rem;}
  .prcContainer .hasErrorMsgRightSide {color: red; position: absolute; bottom: 1rem;}
  .prcContainer .hasErrorMsgTopSide {color: red; position: absolute; top: 2rem; text-align: left}  
  .cdk-keyboard-focused {outline: 1px solid #27AE60 !important;}
  .prcContainer .close_button{position: absolute; top: -10px; border: 0; right: 0; background: #fff;}
  .prcContainer .Preclose_button{position: relative; top: 0; border: 0; background: #fff;}
  .prcContainer .preview_print_button{display: flex;align-items: center;}
  .prcContainer .preview_print_button:hover{color: #27AE60 !important; text-decoration: none !important;}
  .prcContainer .preview_print_button:focus{color: #27AE60 !important; text-decoration: none !important;}
  .prcContainer .close_button .fa-times{position: relative; top: 0; right: 0;}
  .prcContainer .pincode_scroll{max-height: 50rem; overflow-y: auto;}
  .mat-select-panel.creditSelect {max-height: 29vh !important; overflow-y: auto !important;}
  .ng-dropdown-panel.creditNgDropdown .scroll-host{max-height: 32rem !important; overflow-y: auto;}
  .mat-option{padding: 0 6px !important;}
  .prcContainer .mat-pseudo-checkbox-checked::after{top: 0px !important; left: 0px !important; width: 6px !important;}
  .mat-primary.creditSelect .mat-option:hover.mat-selected:not(.mat-option-disabled) {color: #fff !important; background: #27AE60 !important;}
  
  
  
  .prcContainer .pincode_input{padding-left: 12px; background: #fff !important;}
  .prcContainer .redMark{color: red; font-style: italic;}
  .prcContainer .mat-error{margin-top: -8px; color: red !important;}
  .prcContainer .state_dialog .fa-times{top: 0rem}
  .prcContainer .state_dialog{position: relative}
  .prcContainer .scrollable_table{overflow-x: auto;max-height: 28rem !important; min-height: 10rem !important; overflow-y: auto !important;}
  .prcContainer .stateScroll{ overflow-y: scroll;
    overscroll-behavior-y: contain;
    scroll-snap-type: y mandatory;}
  
  .stateScroll > .scrollTable > .scrollTable:last-child {
      scroll-snap-align: end;
    }
  
  .prcContainer .slab_dialog{padding: 15px;}
  .prcContainer .mrgn_btm_2rem{margin-bottom: 2rem}
  .prcContainer input:-webkit-autofill,
  .prcContainer input:-webkit-autofill:hover, 
  .prcContainer input:-webkit-autofill:focus,
  .prcContainer textarea:-webkit-autofill,
  .prcContainer textarea:-webkit-autofill:hover,
  .prcContainer textarea:-webkit-autofill:focus,
  .prcContainer select:-webkit-autofill,
  .prcContainer select:-webkit-autofill:hover,
  .prcContainer select:-webkit-autofill:focus {
    -webkit-text-fill-color: #555 !important;
    -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
    transition: background 5000s ease-in-out 0s !important;
  }
  .prcContainer h6.future_rc_txt {cursor: pointer;font-size: 7px !important;margin: 0;padding: 10px !important; color:#fff}
  .prcContainer h6.future_rc_txt:hover {cursor: pointer;font-size: 7px !important;margin: 0;padding: 10px !important;background-color: #27AE60; color:#fff}
  .prcContainer .future_card {background:#14773e;position: absolute;margin-top: .1rem;border-radius: 3px;width: 9%;z-index: 123 !important;}
  .mat-select-panel.creditSelect.state_dropdown:not([class*=mat-elevation-z]) { box-shadow: none !important;position: absolute !important;top: -31rem !important;left: -1rem !important;  border: .1rem solid #ccc !important;}
  
  
  
  .mat-datepicker-toggle-active{color: #27AE60 !important;}
  .mat-datepicker-content .mat-calendar.creditDatepicker{width: 29.6rem !important; height: 35.4rem !important;}
  .mat-datepicker-toggle .mat-icon-button {top: 0rem !important; border-radius: 0 !important;}
  .creditDatepicker .mat-calendar-body-selected{background: #27AE60 !important;}
  .creditDatepicker td.mat-calendar-body-cell {font-size: 1.5rem;line-height: 2rem; padding: 1.8rem 0 !important;}
  .creditDatepicker thead.mat-calendar-table-header tr th {background: #f1f1f1; color: #1a1a1a; font-weight: bold; font-size: 1.6rem;}
  .prcContainer .required_move_rgt{margin-left: 4rem; margin-top: -0.4rem}
  .prcContainer .sfx_dialog img{width: 64px;}
  /* Required Message Style */
  .prcContainer .mat-icon-button[disabled] .material-icons{
    cursor: not-allowed !important;
    opacity: 0.4;
  }
  .prcContainer .removeIcon {
    color: #27AE60;
    display: block;
    cursor: pointer;
    font-size: 2.4rem;
  }
  .prcContainer .heading_bold{font-weight: 700;}
  .prcContainer .to_upper_case{text-transform: uppercase;}
  .prcContainer .card_minor_text{
    line-height: 2rem;
    margin: 0.4rem 0 0 0;
    width: 85px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .prcContainer .slab_width{width: 9rem !important; padding: 0 5px !important;}
  .prcContainer .slab_width1{width: 16rem !important; padding: 0 5px !important;}
  .prcContainer .customScroll{max-width: 100% !important;overflow: scroll !important;overflow-y: hidden !important;}
  .prcContainer .customScrollHide{overflow: hidden !important;overflow-y: hidden !important;padding-bottom: 1rem !important;}
  
  .prcContainer .customeWidth{width: 125% !important;height: 5rem !important}
  .prcContainer .customeMaxWidth{width: fit-content !important;}
  @media only screen and (max-width: 2156px){
    .prcContainer .billingby-container {width: 201rem !important;}
  }
  @media only screen and (max-width: 1872px){
    .prcContainer .billingby-container {width: 198rem !important;}
  }
  @media only screen and (max-width: 1468px){
    .prcContainer .billingby-container {width: 154rem !important;}
  }
  @media only screen and (max-width: 1283px){
    .prcContainer .billingby-container {width: 134rem !important;}
  }
  @media only screen and (max-width: 1235px){
    .prcContainer .billingby-container {width: 120rem !important;}
  }
  @media only screen and (max-width: 1158px){
    .prcContainer .billingby-container {width: 154rem !important;}
    .prcContainer .fontZizePreview.prev_width{width: 11% !important;}
    .prcContainer .zoal-rate-heading.prev_width {width: 11% !important;}
    .prcContainer .marginZonL{margin-left: -10% !important;}
    .creditDialog .marginZonL{margin-left: -10% !important;}
  
  }
  @media only screen and (max-width: 1022px){
    .prcContainer .billingby-container {width: 106rem !important;}
    .prcContainer .fontZizePreview.prev_width{width: 11% !important;}
    .prcContainer .zoal-rate-heading.prev_width {width: 11% !important;}
    .prcContainer .marginZonL{margin-left: -10% !important;}
    .creditDialog .marginZonL{margin-left: -10% !important;}
  }
  @media only screen and (max-width: 984px){
    .prcContainer .billingby-container {width: 103rem !important;} 
    .prcContainer .fontZizePreview.prev_width{width: 11% !important;}
    .prcContainer .zoal-rate-heading.prev_width {width: 11%;}
    .prcContainer .marginZonL{margin-left: -10% !important;}
    .creditDialog .marginZonL{margin-left: -10% !important;}
  }
  @media only screen and (max-width: 824px){
    .prcContainer .billingby-container {width: 84rem !important;}
    .prcContainer .fontZizePreview.prev_width{width: 11% !important;}
    .prcContainer .zoal-rate-heading.prev_width {width: 11% !important;}
    .prcContainer .marginZonL{margin-left: -10% !important;}
    .creditDialog .marginZonL{margin-left: -10% !important;}
  }
  @media only screen and (max-width: 655px){
    .prcContainer .billingby-container {width: 66rem !important;}
    .prcContainer .fontZizePreview.prev_width{width: 11% !important;}
    .prcContainer .zoal-rate-heading.prev_width {width: 11% !important;}
    .prcContainer .marginZonL{margin-left: -10% !important;}
    .creditDialog .marginZonL{margin-left: -10% !important;}
  }
  @media only screen and (max-width: 576px){
    .prcContainer .billingby-container {width: 57rem !important;}
    .prcContainer .fontZizePreview.prev_width{width: 11% !important;}
    .prcContainer .zoal-rate-heading.prev_width {width: 11% !important;}
    .prcContainer .marginZonL{margin-left: -10% !important;}
    .creditDialog .marginZonL{margin-left: -10% !important;}
  }
  @media only screen and (max-width: 477px){
    .prcContainer .billingby-container {width: 47rem !important;}
    .prcContainer .fontZizePreview.prev_width{width: 11% !important;}
    .prcContainer .zoal-rate-heading.prev_width {width: 11% !important;}
    .prcContainer .marginZonL{margin-left: -10% !important;}
    .creditDialog .marginZonL{margin-left: -10% !important;}
  }
  @media only screen and (max-width: 371px){
    .prcContainer .billingby-container {width: 36rem !important;}
    .prcContainer .fontZizePreview.prev_width{width: 11% !important;}
    .prcContainer .zoal-rate-heading.prev_width {width: 11% !important;}
    .prcContainer .marginZonL{margin-left: -10% !important;}
    .creditDialog .marginZonL{margin-left: -10% !important;}
  }
  
  
  @media only screen and (max-width: 268px) {
    .prcContainer .billingby-container {width: 24rem !important;}
    .prcContainer .fontZizePreview.prev_width{width: 11% !important;}
    .prcContainer .zoal-rate-heading.prev_width {width: 11% !important;}
    .prcContainer .marginZonL{margin-left: -10% !important;}
    .creditDialog .marginZonL{margin-left: -10% !important;}
  }
  
  /* *****************************************************************************************************
                                           Preview
  ****************************************************************************************************** */
  .previewScrollBar{overflow: auto;max-height: 60rem;}
  .prcContainer .printButton{cursor: pointer !important;color: rgb(33, 110, 36), !important;width: 2.4rem !important; left: 0% !important;font-size: 3.2rem !important; border: none !important; background: transparent !important;position: relative !important;
    top: .3rem !important;}
  .prcContainer .printBar{height: 8rem;box-shadow: 0 7px 6px -7px #ccc;background: #fff !important;z-index: 1;top: 6.4rem;
    left: 6.7rem;width: 100%;overflow: hidden; margin-bottom: 1rem;}
  .creditDialog .printBar_dialog{height: 8rem;box-shadow: 0 7px 6px -7px #ccc;background: #fff !important;z-index: 1;top: 6.4rem;
    left: 6.7rem;width: 100%;overflow: hidden; padding: 2rem; margin-bottom: 1rem;}
    .creditDialog .Preclose_button{position: relative; top: 0; border: 0; background: #fff;}
  .prcContainer .previewHeading{width: 100%;background: #fff !important;margin-top: 1.5rem !important;}
  .prcContainer .previewHeading2{margin-top: 2%;width: 84%;margin-left: 8%;background: #fff !important;}
  .prcContainer .barContent{background: #515457 !important;color: #fff !important;padding: 1rem 2rem !important; font-size: 2.4rem !important;}
  .prcContainer .msaBox{background:  #515457 !important;width: 4% !important;height: 3.2rem !important;}
  .prcContainer .leftSpace{margin-top: 2rem !important; padding-left: 1.3rem !important;}
  .prcContainer .leftSpace1{margin-top: 0rem !important;padding-left: 1.3rem !important;}
  .prcContainer .text-heading{background: #f1f1f1 !important;font-size: 1.8rem;border-bottom: .2rem solid #fff;display: flex;align-items: center;padding-right: 0 !important;min-height: 6.6rem !important;}
  .prcContainer .text-heading-bar{background: #ccc !important;font-size: 1.8rem; border-left: .2rem solid #fff;
    border-bottom: .2rem solid #fff;display: flex;align-items: center;min-height: 6.6rem !important;}
  .prcContainer .text-align{text-align: right;}
  .prcContainer .heading{font-size: 2.1rem;font-weight: bold;}
  .prcContainer .background{background: #ccc !important;}
  .prcContainer .wordbreak{word-break: break-word !important;line-height: 1.2 !important;width: 100% !important;}
  .prcContainer .zoal-rate-heading{ background: rgb(81, 84, 87) !important;border: .2rem solid #fff;
  display: flex; align-items: center; text-align: left; color: #fff;font-size: 1.4rem; font-weight: bold; padding: 0 3px !important;}
  .prcContainer .green_th{background: #27AE60 !important; color: #000 !important; font-weight: 600; font-size: 1.6rem;word-break: break-all;}
  .prcContainer .grey_td{background: #b8b7b7 !important; color: #000 !important;word-break: break-all !important;}
  .prcContainer .prev_close {background-color: #fff;box-shadow: 0 7px 6px -7px #ccc}
  .prcContainer .zoal-rate-heading.prev_width{font-size: 1.4rem; padding: 0 3px !important; width: 10%; word-break: break-all;}
  .prcContainer .geoWidth{width: 10% !important;}
  .creditDialog .geoWidth{width: 10% !important;}
  .prcContainer .fontZizePreview.prev_width{font-size: 1.3rem; padding: 0 3px !important; width: 10%; word-break: break-all;}
  .prcContainer .zoal-rate-content{background: #f1f1f1 !important;border: .2rem solid #fff; padding-right: 1.5rem !important;
      display: flex; align-items: center; text-align: left; font-size: 1.5rem; word-wrap: break-word;}
  .prcContainer .zoal-rate-content1{background: #f1f1f1 !important;border: .2rem solid #fff;padding-left: .5rem !important; padding-right: 1.5rem !important;
        display: block; align-items: center; text-align: left; font-size: 1.5rem; word-wrap: break-word;}   
   .prcContainer .mat-raised-button.mat-primary {background:  #81C784 !important; border: .2rem solid #81C784 !important;}
   .prcContainer .mat-raised-button {color : currentColor;}
   .prcContainer .mat-raised-button:not([disabled]):hover {background: rgb(79, 167, 82) !important;border: .2rem solid rgb(33, 110, 36) !important; }
   .prcContainer .mat-raised-button[disabled] {color : #FFF; opacity: 0.6;}
   .prcContainer .btn1 {background: #27AE60;color : rgb(49, 46, 46); border-radius: 2rem 2rem 2rem 2rem;font-size: 1.6rem;color:#fff}
   .prcContainer .btn1:not([disabled]):hover {background: rgb(18, 107, 55) !important; color: #fff; border: .2rem solid rgb(33, 110, 36) !important;}
   .prcContainer .contentheight{min-height: 6.6rem !important;}
  
  .prcContainer .btn1:disabled{cursor: not-allowed !important;background: #81C784;}
  /** CSS FOR Paginator Starts HERE **/  
  .prcContainer .filter{position:  relative !important;margin-top: 0 !important;top: 1rem !important; margin-top: 15px; margin-bottom: 15px;}
  .prcContainer #dashboard-search{position: absolute !important;top: .4rem !important;color: #ccc !important;}
  .prcContainer .cursor{cursor:  pointer !important;}
  .prcContainer .banner-input1{width: 100%;padding-left: 2.8rem !important; font-size: 1.6rem !important;height: 2.7rem !important;border: none !important;outline: none !important;}
  .prcContainer .banner-input1::placeholder {color: #6A6868; font-size: 1.4rem; font-weight: 400; opacity: 0.5;}
  .mat-paginator-page-size-select{margin: .6rem .4rem 0 .4rem !important;  width: 5rem !important;}
  .mat-paginator-page-size-label {margin: 0 0 !important;position: relative !important;bottom: 1rem !important;right: 1rem !important;}
  .mat-paginator-icon {width: 2.8rem !important;}
  
  
  .paginator .mat-form-field{width: 6rem !important;}
  .paginator .mat-form-field-appearance-legacy .mat-form-field-underline{height: .1rem !important;width: 6rem !important;}
  .paginator .mat-select-value{width: 60% !important;}
  .paginator .mat-primary .mat-option.mat-selected:not(.mat-option-disabled){color: #000 !important;}
  .paginator .mat-option.mat-selected:not(.mat-option-multiple){background: #27AE60 !important;}
  .paginator .cdk-overlay-pane{top: 2rem !important;}
  .mat-select-panel{margin-top: 0rem !important;}
  .mat-primary .mat-option.mat-selected:not(.mat-option-disabled) {color: #000 !important;}
  .mat-option:focus:not(.mat-option-disabled), .mat-option:hover:not(.mat-option-disabled) {background-color: #27AE60 !important; color: #fff !important;}
  /* DATA TABLE FILTER */
  /* .filter{margin-top: 1.5rem !important;margin-bottom: 1.5rem !important} */
  .prcContainer td.mat-cell{
    position: relative;
  }
  .prcContainer .pincodefont{    font-size: 1.6rem !important; font-weight: bold;}
  .mat-primary.creditSelect .mat-option.mat-selected:not(.mat-option-disabled){color: #1a1a1a !important;}
  
  
  .creditSelect .mat-option:hover:not(.mat-option-disabled){background: #27AE60 !important; color: #fff !important}
  .mat-select-panel.creditSelect .mat-option.mat-selected:not(.mat-option-multiple){background: transparent;}
  .creditSelect .mat-option.mat-active{background: #27AE60 !important; color: #fff !important}
  
  .mat-primary.creditSelect .mat-option:hover.mat-selected:not(.mat-option-disabled) {color: #fff !important; background: #27AE60 !important;}
  /* .mat-primary.creditSelect .mat-option:hover.mat-option.mat-active{background: transparent !important;} */
  
  /* .msaCreationValidation{position: absolute !important;bottom: 1.2rem !important;} */
  .prcContainer .msaMatExpBar{font-size: 1.6rem !important; font-weight: bold;}
  .prcContainer .errorText{display: block !important;text-align: left !important;font-size: 1.4rem !important;font-weight: normal !important;}
  .prcContainer .blinkMessage{position: -webkit-sticky !important; position: sticky !important;font-size: 1.6rem !important; top: 6.5rem !important;z-index: 99999 !important;width: 100% !important;text-align: center !important;}
  .prcContainer .alert{padding: 1rem !important;margin-bottom: 2rem !important;border: .1rem solid transparent !important;border-radius: .4rem !important;}
  .prcContainer .alert-dismissible .close {top: -2px;right:1rem !important;}
  .prcContainer .ng-placeholder{color: #6A6868 !important; opacity: .8 !important; padding-left: 1rem !important;position: relative !important;bottom: 0.3rem !important;}
  .prcContainer .blinking{
    animation: mymove 1s infinite;
    -webkit-animation: mymove 1s infinite alternate linear;
  }
  @keyframes mymove {
    from {background:#dff0d8;color: #1a1a1a;}
    to {background:transparent; color: transparent;}
  }
  .prcContainer .blink-text{animation: textMove 3s infinite;animation-direction: alternate-reverse;color: #1a1a1a !important;}
  @keyframes textMove{
    from{color: #1a1a1a !important;}
    to{color: transparent !important;}
  }
  
  /* DATA TABLE FILTER */
  .prcContainer .filter{
    margin-top: 15px;
    margin-bottom: 15px;
  }
  
  .prcContainer .highlight {
    background: yellow  !important;
    color: black;
  }
  .prcContainer .fontWeight{font-weight: bold !important;font-family: 'Open Sans', sans-serif !important;}
  .prcContainer .selectValidation{display: block !important; position: relative !important; bottom: 1rem !important;}
  
  /* mat-option */
  /* .cdk-overlay-pane {min-width: 14.2rem !important;top: 39.3rem !important;left: 49rem !important;} */
  .prcContainer .commandmentValidation{display: block !important;position: relative !important;height: .7rem !important;top: -.5rem !important;}
  .prcContainer .commercialButton{
    height: 2.3rem !important;
    font-size: 1.6rem !important;
    background: #27AE60 !important;
    border-radius: .4rem !important;
    padding: 0 !important;
    padding-left: 2.2rem !important;
    padding-right: 2.2rem !important;}
  
  
    .prcContainer .confirmationButton{margin-bottom: 2.5rem !important;margin-top: 1.5rem !important;}
    .prcContainer .marginLeft{margin-left: .5rem !important;}
    .prcContainer .marginleftexclude{margin-left: 1.5rem !important;}
    .prcContainer .marginRight{margin-right: .5rem !important;}
    .prcContainer .exprity{width: 14rem !important; position: relative !important;top: 0rem !important;}
    .prcContainer .docUpload{box-shadow: none !important;padding: 0 !important;font-weight: 600 !important;font-size: 1.4rem !important;}
    .prcContainer .docToggle{position: relative !important;top: .4rem !important;left: 1rem !important;cursor:  pointer !important;}
    .prcContainer .cdk-overlay-pane{transform: none !important;}
  
  /* *****************************************************************************************************
                                           STEPPER
  ****************************************************************************************************** */
  .prcContainer .mat-step-icon-content{display: none !important;}
  .prcContainer .stepperLine{height: .5rem !important; background: #27AE60; position: absolute;top: 5.1rem !important; right: 0; width: 100% !important; z-index: 1;}
  .prcContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:focus{background: transparent !important;}
  .prcContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header{cursor:  pointer !important;}
  .prcContainer .mat-step-header .mat-step-icon-selected{background: #27AE60 !important; cursor:  pointer !important;}
  .prcContainer .mat-step-header .mat-step-icon{background: #696969 !important;z-index: 999999 !important; cursor:  pointer !important;}
  .prcContainer .mat-step-header:hover{background: rgba(0,0,0,0) !important;}
  
  
  .prcContainer .mat-step-label{font-size: 1.6rem;}
  .prcContainer .mat-stepper-horizontal, .mat-stepper-vertical {background: #F1F1F1 !important;}
  .prcContainer .mat-horizontal-content-container {overflow: hidden; padding: 0 !important;}
  .prcContainer .mat-horizontal-stepper-header {box-sizing: border-box;  flex-direction: column-reverse !important;  height: auto;padding: 0px !important;}
  .prcContainer .mat-horizontal-stepper-header .mat-step-label {padding: 0px 0px 0px !important;}
  .prcContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before, .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after{
    top: 6.8rem !important;}
  .prcContainer .mat-stepper-horizontal-line {opacity: 0;border-top-width: 3px !important; border-color: #27AE60 !important; position: relative !important; top: 3.8rem !important;
      margin:0px !important; min-width: 8rem !important;}
  @media only screen and (max-width: 1440px) {
        .prcContainer .mat-stepper-horizontal-line{min-width: 6rem !important;}
      }
    
  @media only screen and (max-width: 1440px) {
        .prcContainer .mat-stepper-horizontal-line{min-width: 5rem !important;}
      }
      
  @media only screen and (max-width: 1366px) {
        .prcContainer .mat-stepper-horizontal-line{min-width: 4rem !important;}
      }
  .prcContainer .mat-stepper-horizontal-line{opacity: 0;}
  .prcContainer .mat-step-icon{height: 2.4rem !important; width: 2.4rem !important;}
  .prcContainer .mat-horizontal-stepper-header-container { margin-bottom: 1% !important;}
  .prcContainer .stepper-label{position: relative;top: 0px; right: 0px; bottom: 0px; left: 0px;}
  /* Stepper */
  .prcContainer .mat-stepper-horizontal{font-family: 'Open Sans', sans-serif !important;}/* end of Stepper */
  
  .prcContainer #stepper{position: absolute !important; top: 0rem !important; right: 2rem !important;}
  .prcContainer .mat-form-field-appearance-outline .mat-form-field-outline-end, .mat-form-field-appearance-outline .mat-form-field-outline-start{
    border: .1rem solid currentColor !important;}
    .prcContainer .mat-form-field-appearance-outline .mat-form-field-outline-start{display: none !important;}
  .mat-select-value-text {font-size: 1.6rem}
  
  .prcContainer .mat-step-icon .mat-icon,   .mat-step-icon-content {
    z-index: 99;
  }
  .creditDatepicker .mat-calendar-controls .mat-icon-button{width: 5.5rem !important; height: 5.5rem !important;}
    .prcContainer .biilingTable{width: 206rem !important;}
  
    .prcContainer .bilingConsinee{min-height: 4.5rem !important;display: flex;align-items: center;font-size: 1.6rem !important;}
    .prcContainer .billingFonts{font-size: 1.8rem !important;}
    
  
  * {
    outline: none;
    color-adjust: exact;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  @media print{
    .previewHeading2{width: 100% !important; margin-left: 0 !important;}  
  .marginZonal{margin-left: 0 !important;}
  .viewHeading{position: relative;left: 3.5%;margin-top: 3rem !important;}
  .geoWidth{width: 10% !important;}
  .leftPrint{position:relative !important; left: -5% !important;}
  .h3Margin{margin-left: 0 !important;}
  .h3HeadingStyle{margin-left: 0 !important;}
  .commercialLeft{position: relative !important;left: 2.4% !important;}
  .marginZonL{margin-left: -10% !important;}
  .mat-expansion-panel-body{padding: 0 !important;}
  .zoal-rate-content{min-height: 8rem !important;}
  .flex1{flex: 1 !important;}
  .flex2{flex: 2 !important;}
  .flex3{flex: 3 !important;}
  .flex4{flex: 4 !important;}
  .green_th{word-break: break-all !important;}
  .grey_td{word-break: break-all !important;}
  .prev_width {width: 11% !important;}
  .highlight {background: yellow  !important;color: black;}
  .smallPrint{left: 0 !important;}
  @page { margin: 5rem !important;display: none !important; }
  #topbar{display: none !important;}
  .nav{display: none !important;}
  .noneDisplay{display: none !important;}
  body { margin: 1.6cm !important; }
  .mat-expansion-panel-content{overflow: visible !important;display: block !important;visibility: visible !important;height: inherit !important;
  }
  .printButton{cursor: pointer !important;color: rgb(33, 110, 36), !important;width: 2.4rem !important; left: 0% !important;font-size: 3.2rem !important; border: none !important; background: transparent !important;position: relative !important;
    top: .3rem !important;}
  .printBar{height: 8rem;box-shadow: 0 7px 6px -7px #ccc;background: #fff !important;z-index: 1;top: 6.4rem;
    left: 6.7rem;width: 100%;overflow: hidden; margin-bottom: 1rem;}
  .printBar_dialog{height: 8rem;box-shadow: 0 7px 6px -7px #ccc;background: #fff !important;z-index: 1;top: 6.4rem;
    left: 6.7rem;width: 100%;overflow: hidden; padding: 2rem; margin-bottom: 1rem;}
    .barContent{background: #515457 !important;color: #fff !important;padding: 1rem 2rem !important; font-size: 2.4rem !important;}
  .barContent.green_th{background: #27AE60 !important;color: #111 !important;}
  .zoal-rate-heading{min-height: 8rem !important; background: rgb(81, 84, 87) !important;border: .2rem solid #fff; min-width: 9%;
    display: flex; align-items: center; text-align: left; color: #fff;font-size: 1.5rem; font-weight: bold; padding: 0 0.3rem !important; }
    .zoal-rate-content{background: #f1f1f1 !important;word-break: break-all; border: .2rem solid #fff; padding: 0 0.5rem !important; display: flex; align-items: center;
      min-height: 8rem !important; text-align: left; font-size: 1.5rem; max-height: 50px; line-height: 14px;min-width: 9%}
    .zoal-rate-content1{background: #f1f1f1 !important;border: .2rem solid #fff;padding-left: .5rem !important; padding-right: 1.5rem !important;
          display: block; align-items: center; text-align: left; font-size: 1.5rem; word-wrap: break-word;}   
          
   .text-heading{background: #f1f1f1 !important;font-size: 1.8rem;border-bottom: .2rem solid #fff;display: flex;align-items: center;padding: 0 5px !important;min-height: 6.6rem !important;}
   .text-heading-bar{min-height: 4rem;background: #ccc !important;font-size: 1.8rem;border-left: .2rem solid #fff;border-bottom: .2rem solid #fff;display: flex;align-items: center;min-height: 6.6rem !important;}
  
    .green_th{background: #27AE60 !important; color: #000 !important; font-weight: 600; font-size: 1.5rem;}
    .grey_td{background: #b8b7b7 !important; color: #000 !important;}
    
  .highlight {
    background: yellow  !important;
    color: black;
  }
  
   .close_button{position: absolute; top: -10px; border: 0; right: 0; background: #fff;}
  .Preclose_button{position: relative; top: 0; border: 0; background: #fff;}
  .preview_print_button{display: flex;align-items: center;}
  .preview_print_button:hover{color: #27AE60 !important; text-decoration: none !important;}
   .preview_print_button:focus{color: #27AE60 !important; text-decoration: none !important;}
  
  }
  .prcContainer .commercialSlab-container {width: 160rem !important;}
  
  /******* Stepper CSS ********/
  
  .prcContainer .mat-stepper-horizontal, .mat-stepper-vertical {position: relative;}
  .prcContainer .mat-stepper-horizontal-line.ng-tns-c19-3.ng-star-inserted {opacity: 0;}
  .prcContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-label {display: flex  !important;
    flex-direction: column !important;justify-content: center;align-items: center !important;align-content: center !important;}
  .prcContainer .marginzero{margin: 0 !important;}
  .prcContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-icon{display: none !important;}
  .prcContainer .round{width: 16px;height: 16px;border-radius: 50%; z-index: 4; background: #6d6d6d;box-shadow: 0px -1px 5px #CCC;}
  .prcContainer .whiteRound{position: relative;z-index: 1;width: 18px;height: 18px;background: white;
    border-radius: 50%;display: flex;text-align: center;align-items: center;box-shadow: 1px 1px 1px #ccc;justify-content: center}
  .prcContainer .whiteRound .fa{font: normal normal normal 10px/.5 FontAwesome !important;}
  
  /******* Stepper CSS ********/
  
  
  /* ============================
  Advance Search ================ */
  .prcContainer .branch_scroll{max-width: 99rem;overflow: auto;max-height: 22rem !important;}
  .prcContainer .removeRowMargin{margin-left: 0 !important; margin-right: 0 !important;}
  .prcContainer .branchfonts{font-size: 1.6rem !important;}
  
  /*********** DIalog CSS ************/
  
  .creditDialog .branchfonts{font-size: 1.6rem !important;}
  .creditDialog .deleteIcon{font-size: 2.4rem !important; position: relative; left: 9rem !important; top: .4rem !important;color: #fff !important;}
  .creditDialog .overflow::-webkit-scrollbar{width: .7rem; cursor:  pointer !important;height: 1rem}
  .creditDialog .heading-bar-dashboard {background: #F1F1F1;  padding-top: 1.0rem; padding-bottom: 1.0rem; color:black; font-size:1.6rem;} 
  .creditDialog .height{font-size: 1.6rem; height: 4.5rem; padding-top: .5rem; padding-bottom: .5rem;  border-bottom: .1rem solid #f1f1f1; display: flex; align-items: center; }
  .creditDialog .label-text{font-size: 1.6rem; font-weight: bold; padding-top: .6rem; }
  .creditDialog .label-text-branch{font-size: 1.6rem !important; font-weight: bold !important;}
  .creditDialog .label-text-value{font-size: 1.6rem; font-weight: 100; padding-top: .6rem; text-overflow: ellipsis; white-space: nowrap;}
  
  .creditDialog .add-more{margin-top: 1.5rem;}                    
  .creditDialog .flex-container {display: flex;flex-wrap: nowrap; margin-bottom: 2rem;}
  .creditDialog .flex-container > .one {width: 22.5%;margin-right: 2.0rem;text-align: center;line-height: 7rem;
    font-size: 3.0rem;}
  .creditDialog .flex-container > .two { width: 10%; text-align: center;line-height: 7rem;font-size: 3.0rem; border-left: .3rem solid #f1f1f1;}
  .creditDialog .one img{width: 100%; height: 100%;}
  .creditDialog .two img{width: 100%; height: 100%;}
  .creditDialog .text{color:#27AE60;}
  .creditDialog .relative{position: relative !important;}
  .creditDialog .absolute{width: 2.1rem;height: 2.1rem; background: #27AE60; position: absolute; border-radius: 50%;
    box-shadow: .1rem .1rem #ccc; display: flex; justify-content: center; align-items: center; color: #fff;
    right: 9.5rem; font-weight: lighter;}
  .creditDialog #background{background: #fff;}
  .creditDialog .mat-card{box-shadow: none !important;}
  .creditDialog .row_center{ text-overflow: ellipsis !important; overflow: hidden !important; white-space: nowrap !important; text-align: left;}
  .creditDialog .row_center1{ text-overflow: ellipsis !important; overflow: hidden !important; white-space: nowrap !important; text-align: left;width: 15rem;}
  .creditDialog .overflow{max-height: 50vh;min-height: 52vh;overflow-y: scroll;overflow-x: hidden; box-sizing: border-box;}
  .overflow::-webkit-scrollbar {width: .7rem;  max-height: 1.0rem;height: 1rem}
  .overflow::-webkit-scrollbar-track {display: none;border-radius: 1.0rem;}
  .overflow::-webkit-scrollbar-thumb {background: #6A6868 !important;border-radius: 1.0rem;  max-height: 1.0rem;}
  .overflow::-webkit-scrollbar-thumb:hover {background: #585757 !important;}
  .creditDialog .hideContent {overflow: hidden;line-height: 1.0rem;height: 50vh;}
  .creditDialog .showContent {line-height: 1.0rem; height: auto;}
  .creditDialog .mat-table{font-family: 'Open Sans', sans-serif !important;}
  .creditDialog .dots{display: inline-block;width: 9%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
  .creditDialog .ten{width: 10%;}
  .creditDialog .eleven{width: 11%;}
  .creditDialog .paddingrightone{padding-right: 1rem !important;}
  .creditDialog .onetwo{width: 12%;}
  .creditDialog .onethree{width: 13%;}
  .creditDialog .onefour{width: 14%;}
  .creditDialog .onefive{width: 15%;}
  /* tooltip */
  .creditDialog .tooltiptext {display: none; background: #27AE60; color: #fff; text-align: left; border-radius: .6rem; padding: .5rem 0;
    z-index: 1123456;word-break: break-all !important} 
  .creditDialog .dots:hover .tooltiptext {display: block;}
  .creditDialog .mat-tooltip {background: #27AE60 !important; color: #fff !important; font-size: 1.6rem !important;
  top: 0 !important; right: 0 !important; left: 0 !important; bottom: 0 !important;}
   /* Position the tooltip */
  .creditDialog .headingbar{width: 102%;margin-left: -1.8rem; font-weight: 600;}
  .creditDialog .hero-content {
   /*  margin-top: 9%; */
    width: 100%!important;
    margin-left: 11%;
    margin-bottom: 5rem;
    /* height: 100vh; */
  }
  .creditDialog .full-width{width: 100% !important;}
  .creditDialog .sfdAcc{text-overflow: ellipsis; white-space: nowrap;}
  .creditDialog .consiText{text-overflow: ellipsis; overflow: hidden;white-space: nowrap;}
  .creditDialog .box-margin{margin-top: 3.0rem;}
  .creditDialog .dashboard-heading{position: relative; height: 5rem;}
  .creditDialog .msa-button{position: absolute; right: 0;cursor: pointer !important;}
  .creditDialog .pending-contract{font-size: 2.50rem; font-weight: 500;}
  /* Dashboard end */
  .creditDialog .contractbox{width: 29% !important;background: #fff !important;margin-right: 2.4rem !important;border-radius: .7rem !important;}
  .creditDialog .contractbox2{border-bottom: .1rem solid #27AE60 !important;width: 100%;height: 48% !important;}
  .creditDialog .contractupdate{margin-left: 2.9rem !important;margin-top: 2.3rem !important;}
  .creditDialog .gotocontract{width: 95% !important;margin-left: 1.1rem !important;margin-top: 2.5rem !important;border: none !important;}
  .creditDialog .paddingleft{padding-left: 1rem !important;}
  .creditDialog .inline{display: inline !important;position: relative !important;bottom: .5rem !important; font-size: 2rem !important; font-weight: 600;left: -1rem !important;}
  .creditDialog .existingSfx{margin-bottom: 5% !important;padding-top: 0 !important;}
  /* *****************************************************************************************************
                                              MSA COMPONENT 
  ****************************************************************************************************** */
  .creditDialog .consignorButton{position: relative; top: 1.5rem; left: -1rem;}
  .creditDialog .pincodeText{cursor: pointer !important; color: #1a1a1a !important; background: #fff !important;}
  
  /* Ng- Select */
  .creditDialog .ng-select{top: .6rem !important;}
  .creditDialog .ng-select .ng-select-container .ng-value-container {padding-left: .6rem !important;}
  .creditDialog .ng-select .ng-select-container{min-height: 2.7rem !important;border: .1rem solid #6A6868 !important; border-radius: .2rem !important;}
  .creditDialog .ng-select.ng-select-single .ng-select-container {height: 2.7rem !important;}
  .creditDialog .advance-search.ng-select-single .ng-select-container{background: #27AE60 !important; color: #fff !important; }
  .creditDialog .ng-select.ng-select-opened>.ng-select-container{border: .1rem solid #27AE60 !important; border-radius: .2rem !important;}
  .creditDialog .ng-select.ng-select-single .ng-select-container .ng-value-container .ng-input {top: 0 !important;}
  .creditDialog ng-select select-dropdown > div {z-index: 2 !important;}
  .creditDialog .advance-search.ng-select-opened>.ng-select-container .ng-arrow {border-color: transparent transparent #fff !important;}
  .creditDialog .ng-select .ng-arrow-wrapper .ng-arrow {border-color: #1a1a1a transparent transparent !important;}
  .creditDialog #ngselect .ng-arrow-wrapper .ng-arrow {border-color: #1a1a1a transparent transparent !important;}
  .creditDialog #ngSelect{top: 0 !important;}
  .creditDialog .paddingleft{padding-left: 0 !important;}
  .creditDialog .paddingleftone{padding-left: 1rem !important;}
  .creditDialog .ng-select .ng-select-container .ng-value-container .ng-input>input{padding-left: .6rem !important;}
  /* Ng-select */
  .creditDialog .form-control{height: 2.7rem !important; font-size: 1.6rem;}
  .creditDialog .hero-content-2{margin-top: 2%;  width: 78%;  margin-left: 11%; margin-bottom: 8rem;position: relative;}
  .creditDialog select{height: 2.7rem;}
  .creditDialog .msaOperation{display: flex;position: relative;}
  .creditDialog .msabutton{text-align: right;position: absolute;right: 0;}
  .creditDialog #mat-card-heading{background: #515457 !important; font-size: 1.6rem !important; color: #fff !important; padding: 1.0rem 2.0rem !important;}
  /* Button */
  .creditDialog .mat-icon-button{width: 4rem !important; height: 4rem !important; line-height: 1.8 !important; border-radius: 0 !important;}
  .creditDialog .example-button-row button, .example-button-row a {  margin-right: .8rem; }
  .creditDialog .mat-raised-button.mat-primary {background:  #27AE60; }
  .creditDialog .mat-raised-button {color : currentColor; line-height: 3.8rem !important;padding: 0 1.6rem !important;border-radius: 2rem !important;line-height: 1.8 !important;}
  .creditDialog .example-button-row button,.example-button-row a {margin-right: .8rem;}
  .creditDialog .mat-raised-button:not([disabled]):hover {background: rgb(33, 110, 36);}
  .creditDialog .mat-raised-button[disabled] {color : #F1F1F1; background: transparent;}
  .creditDialog .btn1 {background: rgba(255, 222, 121, 0.96);border-radius: 3.0rem 3.0rem 3.0rem 3.0rem;font-size: 1.6rem;color:#fff }
  
  .creditDialog .btn1:not([disabled]):hover {background: rgb(18, 107, 55) !important; color: #fff; border: .2rem solid rgb(33, 110, 36) !important;}
  .creditDialog tr.mat-header-row {height: 4.5rem !important;}
  .creditDialog button:focus {outline:0;}
  /* end of button  */
  /* mat horizontal line */
  .creditDialog .mat-divider{border-top-color: #27AE60;border-top-width: .2rem;}
  /* mat horizontal line color */
  .creditDialog input{height: 2rem !important; font-size: 1.4rem;}
  .creditDialog .page-header {font-size: 2.4rem;font-weight:normal;margin: 4.0rem 0 0 1.4rem;font-family: 'Open Sans', sans-serif;}
  
  .creditDialog th{background: #F1F1F1; line-height: 1.4 !important;}
  .creditDialog select{color: #27AE60;height: 2.7rem;}
  .creditDialog select option:hover {color: black;}
  .creditDialog select option:first-child:hover{color: #27AE60;}
  .creditDialog .consignor-heading{font-weight: bold;}
  .creditDialog table {width: 100%;}
  .creditDialog table.mat-table {box-shadow: none !important;}
  .creditDialog tr.mat-footer-row {font-weight: bold;}
  .creditDialog .mat-table-sticky {border-top: .1rem solid #e0e0e0;}
  .creditDialog .right-aligned-header > .mat-content {justify-content: space-between;}
  .creditDialog .inner-box {background:#fff; padding:0; margin:0;}
  .creditDialog .padding20 {padding-top:2.0rem;}
  .creditDialog .text-heading-18 {font-size:1.8rem; font-weight:bold; color:#1a1a1a;}
  .creditDialog .tablinput{height: 1.9rem; width: 9.8rem;}
  .creditDialog .detail{width: 100%;height: 4.5rem; padding: 1.0rem; margin-left: .3rem;}
  .creditDialog .detail1{width: 100%;height: 4.5rem;margin-left: .3rem;}
  .creditDialog .error{margin: 0; padding: 0;  position: relative; font-weight: bold; left: 2.0rem; top: -.4rem; font-size: 1.4rem; color:red; height: 0; bottom: .5rem;}
  .creditDialog .error1{ color: rgb(163, 63, 63); height: 1.0rem; margin: 0; padding: 0;position:absolute;}
  .creditDialog .error2{color: red; margin: 0; padding: 0; height: 1.5rem;}
  .creditDialog .button-msa{color: rgb(33, 110, 36);width: 2.4rem; position: relative; top: .3rem;left: 0%;cursor: pointer;
       font-size: 3.2rem; border: none; background: transparent;}
  .creditDialog #defualtBranchSearch{position: absolute;top: .5rem;left: 2rem;font-size: 1.8rem; color: #ccc; cursor: pointer;}
  .creditDialog #defualtBranchSearch1{position: absolute; right: 4rem; font-size: 1.7rem; top: .5rem; z-index: 10; color: #BCBCCB;}
  .creditDialog #defualtBranchSearch9{position: absolute; right: 2rem; font-size: 1.7rem; top: 1rem; z-index: 10; color: #BCBCCB;}
  .creditDialog #defualtBranchSearch2{position: absolute;left: 2.0rem; font-size: 1.7rem; top: .6rem; z-index: 10; color: #ccc;}
  .creditDialog #defualtBranchSearch5{position: absolute;left: 2.0rem; font-size: 1.7rem; z-index: 10; color: #ccc;}
  .creditDialog #defualtBranchSearchbase{position: absolute;top: .7em;left: 2rem;font-size: 1.8rem; color: #ccc; cursor: pointer;}
  
   /* Mat Radio Button */
   .creditDialog .mat-card-content, .mat-card-subtitle{font-size: 1.4rem !important;}
   .creditDialog .mat-radio-button {font-family: 'Open Sans', sans-serif !important; position: relative; padding-top: 1rem !important;}
   .creditDialog .mat-radio-label{margin-right: 1rem !important;}
   .creditDialog .mat-radio-label-content{padding-left: 0px !important;position: relative !important; left: -.8rem !important; font-weight: normal; font-size: 1.6rem;margin-top: -1rem;}
   .creditDialog .mat-radio-outer-circle{width: 1.6rem !important; height: 1.6rem !important;border-width: .2rem !important;}
   .creditDialog .mat-radio-inner-circle{width: 1.6rem !important; height: 1.6rem !important;}
   .creditDialog .mat-radio-ripple{width: 0px !important; height: 0px !important;}
   .creditDialog .mat-radio-button.mat-accent .mat-radio-inner-circle {background: #27AE60;}
   .creditDialog .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {border-color: #27AE60;}
   .creditDialog .mat-radio-button ~ .mat-radio-button {margin-left: 1.6rem;}
   .creditDialog .mat-radio-inner-circle{width: 1.6rem !important; height: 1.6rem !important;}
   /* end of Radio Button */
   
  /* checkbox */
  .creditDialog .mat-checkbox-label{font-weight: normal; font-size: 1.6rem;}
  .creditDialog .mat-checkbox-inner-container{width: 1.6rem !important; height: 1.6rem !important;margin-right: 0px !important}
  .creditDialog .mat-checkbox-ripple{width: 0px !important; height: 0px !important;}
  .creditDialog .mat-checkbox .mat-checkbox-frame {border-color: #6a6868; border-width: .2rem;}
  .creditDialog .mat-checkbox-checked .mat-checkbox-background {background: #81C784 !important;}
  .creditDialog .mat-checkbox-checked.mat-accent .mat-checkbox-background, .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
    background: #27AE60;}
  .creditDialog .mat-checkbox-layout .mat-checkbox-label{padding-left: .6rem !important;}
  /* checkbox */
  
  /* Mat form field */
  .creditDialog .mat-form-field-appearance-outline .mat-form-field-suffix {left: 1.2rem !important; top: -.2rem !important; right: 0 !important;}
  .creditDialog .mat-form-field{width: 100% !important;}
  .creditDialog .mat-form-field-outline{height: 2.7rem; width: 100%;}
  .creditDialog .mat-form-field-infix{height: 3.2rem; border-top: none !important; top: 1.2rem !important;}
  .creditDialog .mat-form-field-appearance-outline .mat-form-field-infix {padding: 0em 0 0em 0;}
  .creditDialog .mat-form-field{width: 100% !important;top: -.5rem; font-family: 'Open Sans', sans-serif !important;}
  .creditDialog .mat-form-field-appearance-outline .mat-form-field-wrapper{margin: 0 !important;}
  .creditDialog .mat-form-field-wrapper{padding-bottom: 0 !important;}
  .creditDialog .mat-form-field-appearance-outline{margin: 0 0;position: relative !important;top: 0 !important;}
  .creditDialog .mat-form-field-appearance-outline:hover{border-color: #27AE60;}
  .creditDialog .mat-form-field-appearance-outline .mat-form-field-outline{position: absolute; top: 0;color: #6a6868 !important ; box-shadow: 0 .2rem .2rem #00000029;}
  .creditDialog .mat-form-field.mat-focused .mat-form-field-ripple {background: #27AE60 !important;}
  .creditDialog .mat-form-field-appearance-outline .mat-form-field-outline-thick {color: #27AE60 !important;}
  .creditDialog .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {color: #27AE60 !important;}
  .creditDialog .mat-form-field-appearance-outline .mat-form-field-outline-start {border-radius:0 !important ;
    min-width: 0 !important ;}
  .creditDialog .mat-form-field-appearance-outline .mat-form-field-outline-end {border-radius: 0 !important ;
    min-width: 0 !important ;}
  .creditDialog .mat-focused .mat-form-field-label {color: green !important;}
  .creditDialog .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {
      background: #ccc !important;}
  .creditDialog .mat-input-element {position: absolute; top: -.6rem !important;margin-top: .2rem !important}
  /* End of mat form field */
    /* mat Table */
  .creditDialog tr.mat-footer-row, tr.mat-row{height: 4.2rem !important;}
  .creditDialog td.mat-cell:first-of-type, td.mat-footer-cell:first-of-type, th.mat-header-cell:first-of-type{padding-left: 2.4rem !important;}
  .creditDialog td.mat-cell, td.mat-footer-cell, th.mat-header-cell {border-bottom-width: .1rem !important;}
  .creditDialog mat-header-cell:first-of-type{padding-left: 1.2rem !important;}
  .creditDialog mat-header-cell:last-of-type{padding-right: 0 !important;}
  .creditDialog mat-cell:first-of-type, mat-footer-cell:first-of-type, mat-header-cell:first-of-type {
    padding-left: 1.2rem !important;}
  .creditDialog mat-cell:last-of-type, mat-footer-cell:last-of-type, mat-header-cell:last-of-type {
    padding-right: 0 !important;}
  .creditDialog .mat-header-cell{font-size: 1.6rem; font-weight: 600; background: #F1F1F1;}
  .creditDialog .mat-table{font-family: 'Open Sans', sans-serif !important;}
  .creditDialog mat-header-row{min-height: 4.5rem !important;}
  .creditDialog .example-container {overflow: auto;box-shadow: none;}
  .creditDialog mat-footer-row, mat-row {min-height: 4.5rem !important;}
  .creditDialog .mat-cell, .mat-footer-cell {font-size: 1.6rem !important; word-break: break-all !important;}
  .creditDialog .wordBreakall{word-break: break-all !important;}
  .creditDialog .overflow{min-height: 52vh;overflow-y: scroll;overflow-x: hidden; box-sizing: border-box;}
  .overflow::-webkit-scrollbar {width: .7rem;  max-height: 1.0rem;height: 1rem}
  .overflow::-webkit-scrollbar-track {display: none;border-radius: 1.0rem;}
  .overflow::-webkit-scrollbar-thumb {background: #6A6868 !important;border-radius: 1.0rem;  max-height: 1.0rem;}
  .overflow::-webkit-scrollbar-thumb:hover {background: #585757 !important;}
  /* end of mat table */
  .creditDialog .mat-button, .mat-fab, .mat-flat-button, .mat-icon-button, .mat-mini-fab, .mat-raised-button, .mat-stroked-button{
    font-family:'Open Sans', sans-serif !important;  }
  /* Mat Dialog Container */
  .creditDialog .mat-dialog-container{border-radius: 2.0rem; padding: 0; overflow-x: unset;}
  .creditDialog .cdk-overlay-backdrop {background: rgba(51, 51, 51, 0.78) !important;}
  /* End of Mat Dialog Container */
  /* Mat Checkbox */
  .creditDialog .mat-checkbox-inner-container{width: 1.6rem !important; height: 1.6rem !important;margin-right: 0 !important}
  .creditDialog .mat-checkbox-checked.mat-accent .mat-checkbox-background, .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
    background: #27AE60;}
  .creditDialog .mat-checkbox-label{font-weight: normal; font-size: 1.2rem;}
  .creditDialog .mat-checkbox-label{font-weight: normal; font-size: 1.2rem;}
  .creditDialog .mat-checkbox-ripple{width: 0 !important; height: 0 !important;}
  .creditDialog .mat-checkbox-checked.mat-accent .mat-checkbox-background, .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
    background: #27AE60;}
  /* end of checkbox */
  /* mat-expansion */
  .creditDialog .mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow: none !important;}
  .creditDialog #box-shadow{box-shadow: none; padding-top: 0; padding-bottom: 0; }
  .creditDialog #box-shadow{box-shadow: none; padding-top: 0; padding-bottom: 0;}
  .creditDialog .mat-expansion-panel-spacing {margin: 0 0;}
  .creditDialog .mat-expansion-indicator{transform: rotate(0deg) !important;border-style: none; width: 0; height: 0; border-left: .7rem solid transparent;border-right: .7rem solid transparent; 
   border-top: 1.0rem solid #1a1a1a;}
  .creditDialog .mat-expansion-indicator::after{border-style: none;  color: #fff;}
  .creditDialog .mat-expansion-indicator.mat-expanded{transform: rotate(0deg) !important;}
  .creditDialog .mat-expansion-panel-header.mat-expanded{color:#27AE60; border-bottom: .2rem solid #27AE60;}
  .creditDialog .mat-expansion-panel-header {  padding: 0 0!important;border-bottom: .1rem solid #f1f1f1;height: 5.0rem !important;
    font-size: 1.6rem; font-family: 'Open Sans', sans-serif !important}
  .creditDialog .mat-expansion-panel-content{font-family: 'Open Sans', sans-serif !important}
  .creditDialog .mat-content.mat-expanded {border-bottom: .2rem solid red !important; font-weight: bold;color: #27AE60;border-color: #27AE60;}
  .creditDialog .mat-content { font-weight: bold; padding-top: 2.0rem;}
  .creditDialog .mat-expansion-panel-body {padding: 0 0 0 !important}
  .creditDialog .mat-card { font-family: 'Open Sans', sans-serif !important;box-shadow: none !important;}
  .creditDialog .mat-expansion-panel-spacing {margin: 0 0;}
  .creditDialog .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']):hover { background: #fff; } 
  /* mat-expansion */
  .creditDialog #plusicon {color: #27AE60; position: relative; right: 0;font-size: 3.2rem; left: .5rem;}
  .creditDialog #exelLink{position: relative;  right: 1.2rem !important;}
  .creditDialog .fonts{font-size: 1.6rem !important;}
  .creditDialog .fontSizeforview{font-size: 3rem !important;}
  /* Advance Search Pop-Up */
  .creditDialog .fa-times{color: #1a1a1a;position: absolute;right: 1rem;top: -1rem; cursor: pointer;opacity: 0.6;}
  .creditDialog .zonalheadingbar{background: #F1F1F1; height: 4.5rem; display: flex;  align-items: center; line-height: 1.2;
  font-size: 1.6rem; font-weight: 500;border-right: .1rem solid #fff;}
  .creditDialog .commercial-padding{padding-left: .5rem; padding-right: .5rem;}
  .creditDialog #popup-hr{margin-top: .5rem; border: 0;border-top: .2rem solid #27AE60;}
  .creditDialog #h2{margin-top: 1.8rem !important; margin-left: 2.0rem; margin-bottom: 0; min-width: 47rem !important;}
  .creditDialog #h3{margin-top: 1.8rem !important; margin-bottom: 0; min-width: 47rem !important;}
  .creditDialog #h4{margin-top: 1.8rem !important; margin-bottom: 0; min-width: 47rem !important;}
  
  .creditDialog .margin-row{margin-right: 0 !important; margin-left: 0 !important;}
  .creditDialog .row-margin{margin-left: 0; margin-right: 0;padding-left: 0 !important;padding-right: 0 !important;position: relative;}
  .creditDialog .background{background: #27AE60; color: #fff;}
  .creditDialog .searchby{font-weight: bold; font-size: 1.6rem !important; margin-bottom: 2.5rem; padding-left: 1.5rem; margin-right: 0; margin-top: .4rem;}
  .creditDialog .searchby1{font-weight: bold; font-size: 1.6rem !important; margin-bottom: 1.5rem; padding-left: 1.5rem; margin-right: 0; margin-top: .4rem;}
  .creditDialog .mat-dialog-content{display: block; margin: 0 0; padding: 0 0; max-height: 52vh; overflow: auto;}
  .creditDialog .mat-dialog-container{border-radius: 2.0rem; padding: 0; overflow-x: unset;}
  .creditDialog .width{width: 20%;height: 3.5rem; display: flex; border-bottom: 1 solid #f1f1f1; align-items: center;overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .creditDialog .input-field{height: 2.7rem; padding-left: 2.3rem;cursor: pointer;}
  /* End of Pop Up */
  .creditDialog .padding-left{padding-left: .6rem;}
  .creditDialog .paddingzero{padding: 0 !important;}
  .creditDialog .paddingtopzero{padding-top: 0 !important;}
  .creditDialog .inputBox{position:  relative !important; top: .5rem !important;}
  
  .creditDialog .backgroundWhite{background: #fff !important;}
  
  /* Consignor and Consignee */
  .creditDialog .addButton{cursor: pointer !important;color: rgb(33, 110, 36) !important;width: 2.4rem !important; position: relative !important; left: 0% !important; font-size: 3.2rem !important; border: none !important; background: transparent !important;top: .3rem !important;}
  .creditDialog .billingdialogforbranch{position: relative !important;height: 3rem !important;padding-top: 1rem !important;margin-top: 1rem !important;}
  /* *****************************************************************************************************
                                            End of MSA COMPONENT 
  ****************************************************************************************************** */
  
  /* *****************************************************************************************************
                                            OPPORTUNITY COMPONENT 
  ****************************************************************************************************** */
  .creditDialog input{height: 2.0rem !important;}
  .creditDialog .rightpadding{padding-right: 0;}
  /* *****************************************************************************************************
                                            END OF OPPORTUNITY COMPONENT 
  ****************************************************************************************************** */
  
  /* *****************************************************************************************************
                                            SERVICE
  ****************************************************************************************************** */
  .creditDialog .mat-form-field-appearance-outline .mat-form-field-flex{position: static !important;padding: 0 .45em 0 .45em !important;}
  .creditDialog .mat-form-field.mat-focused.mat-primary .mat-select-arrow{color: #1a1a1a !important;}
  .creditDialog .service-fonts-checkbox{font-size: 1.6rem; margin-left: 0rem !important;position: relative; top: .2rem;}
  /* *****************************************************************************************************
                                            END OF SERVICE
  ****************************************************************************************************** */
  
  /*  MSA OPERATION */
  /* .heading-bar { color:#fff; font-size: 1.6rem; position: relative; right: 1.7%;width: 103.4%;}  */
  .creditDialog .heading-bar {background: #F1F1F1;padding:1.0rem; color:black; font-size:1.6rem;width: 100%;left: 0;} 
  .creditDialog .heading-bar2 {padding:1.0rem; color:black; font-size:1.6rem;width: 100%;left: 0;} 
  .creditDialog .height{font-size: 1.6rem; height: 4.5rem; padding-top: .5rem; padding-bottom: .5rem;  border-bottom: 1 solid #f1f1f1; display: flex; align-items: center; }
  .creditDialog .label-text{font-size: 1.6rem; font-weight: bold; padding-top: .6rem;}
  .creditDialog .label-text-value{font-size: 1.6rem; font-weight: 100; padding-top: .6rem; text-overflow: ellipsis; white-space: nowrap;}
  
  /* *****************************************************************************************************
                                           Document Upload
  ****************************************************************************************************** */
  .creditDialog .background{font-size: 1.6rem;color: #fff;background: #ccc !important;}
  .creditDialog .fonts{font-size: 1.6rem;}
  .creditDialog .bottom-border{border-bottom: .1rem solid #f1f1f1;}
  .creditDialog #secondry-button{background: #fff !important; color: #1a1a1a !important; border: .2rem solid #27AE60; font-weight: bold; box-sizing: border-box;}
  .creditDialog .box{opacity: 0.5; padding-top: 2.0rem; padding-bottom: 2.0rem; }
  .creditDialog .material-icons{cursor: pointer !important; }
  .creditDialog .tp-section {display: flex;align-content: center;align-items: center; height: 6.0rem;}
  .creditDialog .tp-margin {margin: 0 !important;}
  .creditDialog .mat-slide-toggle{height: 2.4rem !important;line-height: 1.8;}
  .creditDialog .mat-slide-toggle.mat-checked .mat-slide-toggle-bar{background: #27AE60 !important;}
  .creditDialog .mat-slide-toggle.mat-checked .mat-slide-toggle-thumb{background: #27AE60 !important;}
  .creditDialog .file_name{  white-space: nowrap;overflow: hidden;text-overflow: ellipsis; width: 180% !important;}
  
  /* *****************************************************************************************************
                                           END OF Document Upload
  ****************************************************************************************************** */
  
  /* *****************************************************************************************************
                                           STEPPER
  ****************************************************************************************************** */
  .creditDialog .breadcrumb{padding: 0rem 1.5rem !important;margin-bottom: 3rem !important;border-radius: .4rem !important;}
  .creditDialog .parent{position: relative !important;}
  .creditDialog .mat-step-label{font-size: 1.6rem;}
  .creditDialog .mat-stepper-horizontal, .mat-stepper-vertical {background: #F1F1F1 !important;}
  .creditDialog .mat-horizontal-content-container {overflow: hidden; padding: 0 !important;}
  .creditDialog .mat-horizontal-stepper-header {box-sizing: border-box;  flex-direction: column-reverse !important;  height: auto;padding: 0px !important;}
  .creditDialog .mat-horizontal-stepper-header .mat-step-label {padding: 0px 0px 0px !important;}
  .creditDialog .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before, .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after{
    top: 6.8rem !important;}
  .creditDialog .mat-stepper-horizontal-line {border-top-width: .3rem !important; border-color: #27AE60 !important; position: relative !important; top: 3.8rem !important;
      margin:0px !important; min-width: 8rem !important; opacity: 0;}
  
  @media only screen and (max-width: 1440px) {
        .creditDialog .mat-stepper-horizontal-line{min-width: 6rem !important;}
      }
    
  @media only screen and (max-width: 1440px) {
        .creditDialog .mat-stepper-horizontal-line{min-width: 5rem !important;}
      }
      
  @media only screen and (max-width: 1366px) {
        .creditDialog .mat-stepper-horizontal-line{min-width: 4rem !important;}
      }
  .creditDialog .mat-step-icon{height: 2.4rem !important; width: 2.4rem !important;}
  .creditDialog .mat-horizontal-stepper-header-container { margin-bottom: 1% !important;}
  .creditDialog .mat-step-header .mat-step-icon {background: #27AE60 !important;}
  .creditDialog .stepper-label{position: relative;top: 0px; right: 0px; bottom: 0px; left: 0px;}
  /* Stepper */
  .creditDialog .mat-stepper-horizontal{font-family: 'Open Sans', sans-serif !important;}/* end of Stepper */
  
  .creditDialog .mat-form-field-appearance-outline .mat-form-field-outline-end, .mat-form-field-appearance-outline .mat-form-field-outline-start{
    border: .1rem solid currentColor !important;}
    .creditDialog .mat-form-field-appearance-outline .mat-form-field-outline-start{display: none !important; border-radius:0 !important;min-width: 0 !important ;}
  /* *****************************************************************************************************
                                           BULK UPLOAD
  ****************************************************************************************************** */
  .creditDialog .rightalign{text-align: right; float: right; cursor: pointer;}
  .creditDialog .download-error-icon{color: #27AE60; cursor: pointer !important; font-size: 32px;}
  .creditDialog #exelLink1{position: relative;}
  /* *****************************************************************************************************
                                           END BULK UPLOAD
  ****************************************************************************************************** */
  .creditDialog label{margin-bottom: .5rem !important;}
  .creditDialog .margin-span-left{margin-left: -.5rem !important;}
  
  /* *****************************************************************************************************
                                           BILLING
  ****************************************************************************************************** */
  .creditDialog .positionTop{position:  relative !important; top: .5rem !important;}
  .creditDialog .billingby-container {width: 134rem !important;overflow-y: hidden;overflow-x: auto !important;min-height: 12rem !important; margin-top: 1rem !important;}
  .creditDialog .billingby-container .mat-form-field {width: 16rem !important; margin-right: 3rem !important;}
  .creditDialog .billingby-container::-webkit-scrollbar {height: 1rem !important;cursor:  pointer;}
  .creditDialog .billingby-container::-webkit-scrollbar-track{background: #EBEBF2;}
  .billingby-container::-webkit-scrollbar-thumb{background: #6A6868 !important; width: .5rem !important;border-radius: 1rem !important;}
  .billingby-container::-webkit-scrollbar-thumb:hover{background: #585757 !important;}
  .creditDialog #billingSearch{position: absolute;top: .4rem !important; left: .3rem !important; color: #ccc !important; font-size: 1.9rem !important; cursor:  pointer !important;}
  .creditDialog .plusIcon{color: #27AE60; font-size: 4rem; cursor: pointer;position: relative;bottom: .4rem;}
  /* Billing */
  
  
  /* Required Message Style */
  .creditDialog .hasErrorMsg {color: red !important;margin-bottom: -3px;width: 25rem !important;text-align: left !important;margin-top: 0px !important;position: absolute !important;margin-left: 12px;}
  .creditDialog .hasErrorMsgRight {color: red !important;position: relative !important;bottom: 1rem !important;}
  .creditDialog .hasErrorMsgRightupload {color: red !important;position: relative !important;bottom: 3.5rem !important;left: 1rem;}
  .creditDialog .hasErrorMsgRightSide {color: red; position: absolute; bottom: 1rem;}
  .creditDialog .hasErrorMsgTopSide {color: red; position: absolute; top: 2rem; text-align: left}  
  .cdk-keyboard-focused {outline: 1px solid #27AE60 !important;}
  .creditDialog .close_button{position: absolute; top: -10px; border: 0; right: 0; background: #fff;}
  .creditDialog .close_button .fa-times{position: relative; top: 0; right: 0;}
  .creditDialog .pincode_scroll{max-height: 50rem; overflow-y: scroll;}
  
  .creditDialog .mat-pseudo-checkbox-checked::after{top: 0px !important; left: 0px !important; width: 6px !important;}
  .creditDialog .pincode_input{padding-left: 12px;}
  .creditDialog .redMark{color: red; font-style: italic;}
  .creditDialog .mat-error{margin-top: -8px;}
  .creditDialog .state_dialog .fa-times{top: 0rem}
  .creditDialog .state_dialog{position: relative}
  .creditDialog .scrollable_table{overflow-x: hidden; max-height: 28rem !important}
  .creditDialog .slab_dialog{padding: 15px;}
  .creditDialog .mrgn_btm_2rem{margin-bottom: 2rem}
  .creditDialog input:-webkit-autofill,
  .creditDialog input:-webkit-autofill:hover, 
  .creditDialog input:-webkit-autofill:focus,
  .creditDialog textarea:-webkit-autofill,
  .creditDialog textarea:-webkit-autofill:hover,
  .creditDialog textarea:-webkit-autofill:focus,
  .creditDialog select:-webkit-autofill,
  .creditDialog select:-webkit-autofill:hover,
  .creditDialog select:-webkit-autofill:focus {
    -webkit-text-fill-color: #555 !important;
    -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
    transition: background 5000s ease-in-out 0s !important;
  }
  .creditDialog .required_move_rgt{margin-left: 4rem; margin-top: -0.4rem}
  .creditDialog .sfx_dialog img{width: 64px;}
  /* Required Message Style */
  .creditDialog .mat-icon-button[disabled] .material-icons{
    cursor: not-allowed !important;
    opacity: 0.4;
  }
  .creditDialog .removeIcon {
    color: #27AE60;
    display: block;
    cursor: pointer;
    font-size: 2.4rem;
  }
  .creditDialog .heading_bold{font-weight: 700;}
  .creditDialog .to_upper_case{text-transform: uppercase;}
  .creditDialog .card_minor_text{
    line-height: 2rem;
    margin: 0.4rem 0 0 0;
    width: 85px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .creditDialog .slab_width{width: 6% !important; padding: 0 5px !important;}
  
  
  @media only screen and (max-width: 2156px){
    .creditDialog .billingby-container {width: 201rem !important;}
  }
  @media only screen and (max-width: 1872px){
    .creditDialog .billingby-container {width: 198rem !important;}
  }
  @media only screen and (max-width: 1468px){
    .creditDialog .billingby-container {width: 154rem !important;}
  }
  @media only screen and (max-width: 1283px){
    .creditDialog .billingby-container {width: 134rem !important;}
  }
  @media only screen and (max-width: 1235px){
    .creditDialog .billingby-container {width: 120rem !important;}
  }
  @media only screen and (max-width: 1158px){
    .creditDialog .billingby-container {width: 154rem !important;}
  }
  @media only screen and (max-width: 1022px){
    .creditDialog .billingby-container {width: 106rem !important;}
  }
  @media only screen and (max-width: 984px){
    .creditDialog .billingby-container {width: 103rem !important;}
  }
  @media only screen and (max-width: 824px){
    .creditDialog .billingby-container {width: 84rem !important;}
    .smallPrint{left: 0 !important;}
  }
  @media only screen and (max-width: 655px){
    .creditDialog .billingby-container {width: 66rem !important;}
  }
  @media only screen and (max-width: 576px){
    .creditDialog .billingby-container {width: 57rem !important;}
  }
  @media only screen and (max-width: 477px){
    .creditDialog .billingby-container {width: 47rem !important;}
  }
  @media only screen and (max-width: 371px){
  
    .creditDialog .billingby-container {width: 36rem !important;}
  }
  @media only screen and (max-width: 268px) {
    .creditDialog .billingby-container {width: 24rem !important;}
  }
  
  /* *****************************************************************************************************
                                           Preview
  ****************************************************************************************************** */
  .creditDialog .previewHeading{width: 100%;background: #fff !important;margin-top: 1.5rem !important;}
  .creditDialog .previewHeading2{margin-top: 2%;width: 84%;margin-left: 8%;background: #fff !important;}
  .creditDialog .barContent{background: #515457 !important;color: #fff !important;padding: 1rem 2rem !important; font-size: 2.4rem !important;}
  .creditDialog .barContent.green_th{background: #27AE60 !important;color: #111 !important;}
  .creditDialog .msaBox{background:  #515457 !important;width: 4% !important;height: 3.2rem !important;}
  .creditDialog .leftSpace{margin-top: 2rem !important; padding-left: 1.3rem !important;}
  .creditDialog .leftSpace1{margin-top: 0rem !important;padding-left: 1.3rem !important;}
  .creditDialog .text-heading{background: #f1f1f1;font-size: 1.8rem;border-bottom: .2rem solid #fff;display: flex;align-items: center;padding: 0 5px !important;min-height: 6.6rem !important;}
  .creditDialog .text-heading-bar{min-height: 4rem;background: #ccc;font-size: 1.8rem;border-left: .2rem solid #fff;border-bottom: .2rem solid #fff;display: flex;align-items: center;min-height: 6.6rem !important;}
  .creditDialog .text-align{text-align: right;}
  .creditDialog .heading{font-size: 2.1rem;font-weight: bold;}
  .creditDialog .background{background: #ccc !important;}
  .creditDialog .wordbreak{word-break: break-word !important;line-height: 1.2 !important;width: 100% !important;}
  .creditDialog .zoal-rate-heading{min-height: 8rem !important; background: rgb(81, 84, 87);border: .2rem solid #fff; min-width: 9%;
  display: flex; align-items: center; text-align: left; color: #fff;font-size: 1.5rem; font-weight: bold; padding: 0 0.3rem !important; }
  .creditDialog .zoal-rate-content{background: #f1f1f1;word-break: break-all; border: .2rem solid #fff; padding: 0 0.5rem !important; display: flex; align-items: center;
    min-height: 8rem !important; text-align: left; font-size: 1.5rem;min-width: 9%}
  .creditDialog .zoal-rate-content1{background: #f1f1f1 !important;border: .2rem solid #fff;padding-left: .5rem !important; padding-right: 1.5rem !important;
        display: block; align-items: center; text-align: left; font-size: 1.5rem; word-wrap: break-word;}   
  .creditDialog .green_th{background: #27AE60 !important; color: #000 !important; font-weight: 600; font-size: 1.5rem;word-break: break-all !important;}
  .creditDialog .grey_td{background: #b8b7b7 !important; color: #000 !important;}
  .creditDialog .mat-raised-button {color : currentColor; line-height: 3.8rem !important;padding: 0 1.6rem !important;border-radius: 2rem !important;line-height: 1.8 !important;}
   .creditDialog .mat-raised-button.mat-primary {background:  #81C784 !important; border: .2rem solid #81C784 !important;}
   .creditDialog .mat-raised-button:not([disabled]):hover {background: rgb(79, 167, 82) !important;border: .2rem solid rgb(33, 110, 36) !important; }
   .creditDialog .mat-raised-button[disabled] {color : #FFF; opacity: 0.6;color : #F1F1F1; background: transparent;}
   .creditDialog .btn1 {color : rgb(49, 46, 46); background: rgba(255, 222, 121, 0.96); border-radius: 2rem 2rem 2rem 2rem;font-size: 1.6rem;color:#fff}
   .creditDialog .btn1:not([disabled]):hover {background: rgb(18, 107, 55) !important; color: #fff; border: .2rem solid rgb(33, 110, 36) !important;}
   .creditDialog .contentheight{min-height: 6.6rem !important;}
  
  .creditDialog .btn1:disabled{cursor: not-allowed !important;background: #81C784;}
  /** CSS FOR Paginator Starts HERE **/  
  .creditDialog .filter{position:  relative !important;margin-top: 0 !important;top: 1rem !important; }
  .creditDialog #dashboard-search{position: absolute !important;top: .4rem !important;color: #ccc !important;}
  .creditDialog .banner-input1{width: 100%;padding-left: 2.8rem !important; font-size: 1.6rem !important;height: 2.7rem !important;border: none !important;outline: none !important;}
  .creditDialog .banner-input1::placeholder {color: #6A6868; font-size: 1.4rem; font-weight: 400; opacity: 0.5;}
  .mat-paginator-page-size-select{margin: .6rem .4rem 0 .4rem !important;  width: 5rem !important;}
  .mat-paginator-page-size-label {margin: 0 0 !important;position: relative !important;bottom: 1rem !important;right: 1rem !important;}
  .mat-paginator-icon {width: 2.8rem !important;}
  /* DATA TABLE FILTER */
  /* .filter{margin-top: 1.5rem !important;margin-bottom: 1.5rem !important} */
  .creditDialog td.mat-cell{
    position: relative;
  }
  .creditDialog .pincodefont{    font-size: 1.6rem !important; font-weight: bold;}
  
  /* .msaCreationValidation{position: absolute !important;bottom: 1.2rem !important;} */
  .creditDialog .msaMatExpBar{font-size: 1.6rem !important; font-weight: bold;}
  .creditDialog .blinkMessage{position: -webkit-sticky !important; position: sticky !important;font-size: 1.6rem !important; top: 6.5rem !important;z-index: 99999 !important;width: 100% !important;text-align: center !important;}
  .creditDialog .alert{padding: 1rem !important;margin-bottom: 2rem !important;border: .1rem solid transparent !important;border-radius: .4rem !important;}
  .creditDialog .alert-dismissible .close {top: -2px;right:1rem !important;}
  .creditDialog .blinking{
    animation: mymove 1s infinite;
    -webkit-animation: mymove 1s infinite alternate linear;
  }
  
  
  /* DATA TABLE FILTER */
  .creditDialog .filter{
    margin-top: 15px;
    margin-bottom: 15px;
  }
  
  .creditDialog .highlight {
    background: yellow  !important;
    color: black;
  }
  .creditDialog .fontWeight{font-weight: bold !important;font-family: 'Open Sans', sans-serif !important;}
  .creditDialog .selectValidation{display: block !important; position: relative !important; bottom: 1rem !important;}
  
  /* .cdk-overlay-pane {min-width: 14.2rem !important;top: 39.3rem !important;left: 49rem !important;} */
  .creditDialog .commandmentValidation{display: block !important;position: relative !important;height: .7rem !important;top: -.5rem !important;}
  .creditDialog .commercialButton{
    height: 2.3rem !important;
    font-size: 1.6rem !important;
    background: #27AE60 !important;
    border-radius: .4rem !important;
    padding: 0 !important;
    padding-left: 2.2rem !important;
    padding-right: 2.2rem !important;}
  
  
    .creditDialog .confirmationButton{margin-bottom: 2.5rem !important;margin-top: 1.5rem !important;}
    .creditDialog .marginLeft{margin-left: .5rem !important;}
    .creditDialog .marginRight{margin-right: .5rem !important;}
    .creditDialog .exprity{width: 14rem !important; position: relative !important;top: 0rem !important;}
    .creditDialog .docUpload{box-shadow: none !important;padding: 0 !important;font-weight: 600 !important;font-size: 1.4rem !important;}
    .creditDialog .docToggle{position: relative !important;top: .4rem !important;left: 1rem !important;cursor:  pointer !important;}
    .creditDialog .cdk-overlay-pane{transform: none !important;}
  
  /* *****************************************************************************************************
                                           STEPPER
  ****************************************************************************************************** */
  .creditDialog .mat-step-icon-content{display: none !important;}
  .creditDialog .stepperLine{height: .3rem !important; background: #27ae60; position: absolute;top: 5.3rem !important; right: 0; width: 100% !important; z-index: 1;}
  .creditDialog .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:focus{background: transparent !important;}
  .creditDialog .mat-stepper-label-position-bottom .mat-horizontal-stepper-header{cursor:  pointer !important;}
  .creditDialog .mat-step-header .mat-step-icon-selected{background: #27AE60 !important; cursor:  pointer !important;}
  .creditDialog .mat-step-header .mat-step-icon{background: #696969 !important;z-index: 999999 !important; cursor:  pointer !important;}
  .creditDialog .mat-step-header:hover{background: rgba(0,0,0,0) !important;}
  
  
  .creditDialog .mat-step-label{font-size: 1.6rem;}
  .creditDialog .mat-stepper-horizontal, .mat-stepper-vertical {background: #F1F1F1 !important;}
  .creditDialog .mat-horizontal-content-container {overflow: hidden; padding: 0 !important;}
  .creditDialog .mat-horizontal-stepper-header {box-sizing: border-box;  flex-direction: column-reverse !important;  height: auto;padding: 0px !important;}
  .creditDialog .mat-horizontal-stepper-header .mat-step-label {padding: 0px 0px 0px !important;}
  .creditDialog .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before, .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after{
    top: 6.8rem !important;}
  .creditDialog .mat-stepper-horizontal-line {border-top-width: 3px !important; border-color: #27AE60 !important; position: relative !important; top: 3.8rem !important;
      margin:0px !important; min-width: 8rem !important;}  
  @media only screen and (max-width: 1440px) {
        .creditDialog .mat-stepper-horizontal-line{min-width: 6rem !important;}
      }
    
  @media only screen and (max-width: 1440px) {
        .creditDialog .mat-stepper-horizontal-line{min-width: 5rem !important;}
      }
      
  @media only screen and (max-width: 1366px) {
        .creditDialog .mat-stepper-horizontal-line{min-width: 4rem !important;}
      }
  .creditDialog .mat-stepper-horizontal-line{opacity: 0;}
  .creditDialog .mat-step-icon{height: 2.4rem !important; width: 2.4rem !important;}
  .creditDialog .mat-horizontal-stepper-header-container { margin-bottom: 1% !important;}
  .creditDialog .stepper-label{position: relative;top: 0px; right: 0px; bottom: 0px; left: 0px;}
  /* Stepper */
  .creditDialog .mat-stepper-horizontal{font-family: 'Open Sans', sans-serif !important;}/* end of Stepper */
  
  .creditDialog #stepper{position: absolute !important; top: 0rem !important; right: 2rem !important;}
  .creditDialog .mat-form-field-appearance-outline .mat-form-field-outline-end, .mat-form-field-appearance-outline .mat-form-field-outline-start{
    border: .1rem solid currentColor !important;}
    .creditDialog .mat-form-field-appearance-outline .mat-form-field-outline-start{display: none !important;}
  
  .creditDialog .mat-step-icon .mat-icon,   .mat-step-icon-content {
    z-index: 99;
  }
    .creditDialog .biilingTable{width: 206rem !important;}
  
    .creditDialog .bilingConsinee{min-height: 4.5rem !important;display: flex;align-items: center;font-size: 1.6rem !important;overflow-wrap: anywhere !important;}
    .creditDialog .billingFonts{font-size: 1.8rem !important;}
   
  .creditDialog .commercialSlab-container {width: 164rem !important;}
  
  
  
  /* ============================
  Advance Search ================ */
  .creditDialog .branch_scroll{max-width: 99rem;overflow: auto;max-height: 22rem !important;}
  .creditDialog .removeRowMargin{margin-left: 0 !important; margin-right: 0 !important;}
  
  .mat-select-panel .mat-optgroup-label, .mat-select-panel .mat-option {
    font-family: "Open Sans",sans-serif !important;
  }
  .prcContainer .srch_bill_icon{top:-0.3rem !important; left: -0.3rem !important;}
  /*********** DIalog CSS ************/
  
  /* Branch CSS For PRC */
  .branchContainer{
    width: 140%;
  }
  
  
  
  .mat_ngx_select_search {
    font-size: 2rem !important;
    position: absolute;
    top: 0.4rem;
    left: 0;
  }
  .mat-select-search-input {padding: 0px 4px 0px 14px !important; font-family: 'Open Sans', sans-serif !important; font-size: 1.4rem !important; text-transform: uppercase !important;}
  .mat-select-search-clear.mat-icon-button{width: 20px !important; height: 20px !important;}
  .mat-select-search-clear.mat-icon-button .mat-icon{font-size: 2rem !important; line-height: 10px !important}
  .mat-select-search-no-entries-found {padding: 0.25rem !important;}
  .mat-select-panel.creditNgxSelect{
    max-height: 25rem !important;
    overflow-y: scroll !important;
    min-width: calc(100% + 12px) !important;
    width: calc(100% + 12px) !important;
    top: 6.2rem !important;
    margin-top: 0rem !important;
    left: 1.5rem !important;
    box-shadow: none !important;
    position: absolute !important;
    border: .1rem solid #6A6868 !important;
    border-radius: .2rem !important;
  }
  .mat-select-panel.creditNgxSelectCity{
    max-height: 25rem !important;
    overflow-y: scroll !important;
    min-width: calc(100% + 12px) !important;
    width: calc(100% + 12px) !important;
    top: 6.2rem !important;
    margin-top: 0rem !important;
    left: 4.7rem !important;
    box-shadow: none !important;
    position: absolute !important;
    border: .1rem solid #6A6868 !important;
    border-radius: .2rem !important;
  }
  .mat-option{font-family: 'Open Sans', sans-serif !important;}
  .mat-option-text{font-size: 1.4rem; text-transform: uppercase !important; font-family: 'Open Sans', sans-serif !important;}
  
  
  
  
  
  
  
  
  /* Browser support code start */
  
  
  @-moz-document url-prefix(){
    .prcContainer .mat-input-element.date_picker {
      margin-top: -0.4rem !important;
    }
    .creditDialog .mat-input-element.date_picker {
      margin-top: -0.4rem !important;
    }
    .mat-icon-button.mat_icon_moz {
      top: -2.26rem !important;
    }
    .slaAddIcon.two { margin-left: 0px; margin-top: -12px; }
    body {
      background-color: #f3f3f3 !important;
    }
  }
  
  @supports (-ms-ime-align:auto) {
    .creditDialog .mat-input-element.date_picker {
      margin-top: -2rem !important;
    }
    .prcContainer .mat-form-field-appearance-outline .mat-form-field-suffix {
      top: -2rem !important;
    }
    .prcContainer .mat-select-placeholder {
      font-size: 1.6rem;
    }
    .creditDialog .mat-select-value-text {
      top: -0.4rem;
    }
    .cdk-overlay-pane {
      display: block;
    }
    .mat-select-panel {
      flex: 1 0 auto;
    }
    .material-icons {
      /* Support for IE */
      font-feature-settings: 'liga';
    }
    body {
      background-color: #f3f3f3 !important;
    }
    .srch_bill_icon{top:0rem !important;}
    .prcContainer .mat-cell .hasErrorMsg {position: relative !important}
  }
  
  
  
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    /* IE10+ CSS styles go here */
    /** IE 11 fixes */
    .cdk-overlay-pane{display:block}
    body{background:#f2f2f2}
    .cdk-overlay-connected-position-bounding-box .cdk-overlay-pane .mat-select-panel.ng-animating{display:block!important}
    .mat-paginator,.mat-paginator-page-size .mat-select-trigger{padding-top:8px!important}
    .inputfield3{padding-top:.2rem}
    .prcContainer #plusicon{top:-.2rem}
    .creditDialog .form-control{line-height:0}
    .pincode_input{color:rgba(106,104,104,1)}
    .prcContainer .inputBox{line-height:0}
    .mat-datepicker-toggle .mat-icon-button{top:1.8rem!important}
    .prcContainer .mat-input-element.date_picker{margin-top:-1.6rem!important}
    .prcContainer .mat-form-field-appearance-outline .mat-form-field-suffix{top:-4rem!important}
    .cdk-overlay-container{z-index:2147483647!important}
    .prcContainer .inputBox .mat-select-value-text{top:.4rem}
    .mat-select-value{overflow:visible!important}
    .slaAddIcon{margin-top:-2rem}
    .slaAddIcon.two{line-height:24px;margin-left:8px;margin-top:-2rem}
     .prcContainer .rateCardDetail  .label-text-value{height: 5rem;}
    .prcContainer .hasErrorMsg {color: red !important;width: 14rem !important; position: relative !important; top: -1rem;}
    .prcContainer .marginBilling {margin-bottom: 0rem !important;} 
    .prcContainer .marginBilling.hasErrorMsg{bottom:6px!important;margin:0!important}
    .prcContainer .rateCardDetail  .label-text-value{height: 5rem;}
    .creditDatepicker td.mat-calendar-body-cell {font-size: 1.5rem!important;line-height: 1rem!important;padding: 1.4rem 0 !important;}
  
    
  }
  
  /* for Edge 12+ CSS */
  @supports (-ms-accelerator:true) {   
    .mat-datepicker-toggle .mat-icon-button {top: 1.8rem !important}
    .prcContainer .mat-checkbox-layout .mat-checkbox-label{padding-left:0.2rem !important;} 
    .slaAddIcon.two { margin-left: 120px;  margin-top: -27px; }
    .mat-calendar-table-header-divider { display: none;}
    .creditDatepicker td.mat-calendar-body-cell { padding: 1.7rem 0 !important;}
    .slaAddIcon.two {  margin-left: 120px;  margin-top: -27px; }
    .material-icons.forEdge {
      margin-left: 8px;
  }
  
  
  
  }
  
  /* for Edge 16+ CSS */
  @supports (-ms-ime-align: auto) {
      .prcContainer .mat-input-element.date_picker{margin-top:-.2rem !important;font-size:1.3rem; } 
      body{background: #f3f3f3;}
      .mat-select-value{overflow:scroll; }
      .prcContainer .inputBox .mat-select-value-text { top: 0rem;  }
      .slaAddIcon{ margin-top:-2rem;  }  
      .cdk-overlay-connected-position-bounding-box .cdk-overlay-pane .mat-select-panel.ng-animating {display: block !important;}
      .mat-datepicker-toggle .mat-icon-button{top: 1.8rem !important }
      .prcContainer .inputBox .mat-select-value-text { top: 0rem;  }   
      .mNo{color:#000!important; text-decoration: none; }
      .prcContainer .mat-select-value-text {top: 0rem; }
      body .prcContainer .mat-form-field-infix { top: 0.8rem !important;}
    .prcContainer .hasErrorMsg {color: red !important;width: 14rem !important; position: relative !important; top: -1rem;}
    .prcContainer .marginBilling {margin-bottom: 0rem !important;} 
    .prcContainer .btn1.confirmationButton.marginRight{background: #81C784 !important; border: .2rem solid #81C784 !important }
    body .mat-form-field-appearance-outline .mat-select-arrow-wrapper { transform: translateY(0%);}
    app-validation-msg {font-size: 1.4rem}
    .prcContainer .mat-checkbox-layout .mat-checkbox-label{padding-left:0.2rem !important;} 
    .slaAddIcon.two { margin-left: 120px; margin-top: -27px; }
    .mat-calendar-table-header-divider { display: none;}
    .creditDatepicker td.mat-calendar-body-cell { padding: 1.7rem 0 !important;}
    .slaAddIcon.two { margin-left: 120px;  margin-top: -27px; }
    .material-icons.forEdge {  margin-left: 8px; }
  
  }
    
  /* Multiselect dropdown */
  
  .mat-select-panel.multiSelect {min-width: calc(100% + 12px) !important;
    width: 100% !important;top: 1.9rem !important;left: 1.5rem !important;
    box-shadow: none !important;position: absolute !important;border: .1rem solid #6A6868 !important;
    border-radius: .2rem !important;max-height: 29vh !important;overflow-y: scroll !important;
    transform: translateX(23px) !important;}
    .mat-select-panel.multiSelect.prdtListSelect {left: -1.7rem !important;}
  .multiSelect .mat-pseudo-checkbox{width: 1.6rem !important;height: 1.6rem !important;border: .2rem solid #1a1a1a !important;}
  .mat-primary .mat-pseudo-checkbox-checked{background: #27AE60 !important;}
  .mat-select-panel.multiSelect:hover .mat-active{background: transparent !important;color: #1a1a1a !important;}
  .multiSelect .mat-option.mat-active:hover{background: #27AE60 !important; color: #fff !important;}
  .mat-select-panel.multiSelect .mat-option.mat-selected:not(.mat-option-multiple){background: #247d4a !important; color: #fff !important ; font-weight: bold }
  .multiSelect .mat-option:hover:not(.mat-option-disabled){background: #27AE60 !important; color: #fff !important}
  .mat-primary.multiSelect .mat-option.mat-selected:not(.mat-option-disabled){color: #1a1a1a !important;}
  .multiSelect .mat-option.mat-active{background: #27AE60 !important; color: #fff !important}
  .mat-select-panel.multiSelect.state_dropdown:not([class*=mat-elevation-z]) { box-shadow: none !important;position: absolute !important;top: -31rem !important;left: -1rem !important;  border: .1rem solid #ccc !important;}
  .mat-primary.multiSelect .mat-option:hover.mat-selected:not(.mat-option-disabled) {color: #fff !important; background: #27AE60 !important;}
  .multiSelect .mat-option{height: 2.7rem !important;}
  .mat-select-panel.multiSelect{min-width: calc(100% + 12px) !important; width: 100% !important;  top: 1.9rem !important;
    left: 1.5rem !important; box-shadow: none !important;position: absolute !important; border: .1rem solid #6A6868 !important;border-radius: .2rem !important;}
  .mat-primary.multiSelect .mat-option.mat-selected:not(.mat-option-disabled) {color: #1a1a1a !important;}
  /* end of multiSelect Dropdown */
  
  
  
  /* For dropdown setting */
  .mat-select-panel.creditSelect:hover .mat-active{background: transparent !important;color: #1a1a1a !important;}
  .mat-option:hover .mat-active{background: #27AE60 !important; color: #1a1a1a !important;}
  .creditSelect .mat-option.mat-active:hover{background: #27AE60 !important; color: #fff !important;}
  .creditSelect .cdk-overlay-backdrop{background: transparent !important;}
  .cdk-overlay-backdrop.creditSelect{background: transparent !important;}
  
  /* End of dropdown setting */
  .mat-select-search-inner.mat-typography.mat-datepicker-content.mat-tab-header {position: fixed; top: 45px;}
  
  /* Multiselect dropdown */
  .mat-select-panel.multiSelect {min-width: calc(100% + 12px) !important;margin-top: 0rem !important;
    width: 100% !important;top: 1.9rem !important;left: 1.5rem !important;
    box-shadow: none !important;position: absolute !important;border: .1rem solid #6A6868 !important;
    border-radius: .2rem !important;max-height: 29vh !important;overflow-y: scroll !important;
    transform: translateX(23px) !important;}
  .multiSelect .mat-pseudo-checkbox{width: 1.6rem !important;height: 1.6rem !important;border: .2rem solid #1a1a1a !important;}
  .mat-primary .mat-pseudo-checkbox-checked{background: #27AE60 !important;}
  .mat-select-panel.multiSelect:hover .mat-active{background: transparent !important;color: #1a1a1a !important;}
  .multiSelect .mat-option.mat-active:hover{background: #27AE60 !important; color: #fff !important;}
  .mat-select-panel.multiSelect .mat-option.mat-selected:not(.mat-option-multiple){background: #247d4a !important; color: #fff !important ; font-weight: bold }
  .multiSelect .mat-option:hover:not(.mat-option-disabled){background: #27AE60 !important; color: #fff !important}
  .mat-primary.multiSelect .mat-option.mat-selected:not(.mat-option-disabled){color: #1a1a1a !important;}
  .multiSelect .mat-option.mat-active{background: #27AE60 !important; color: #fff !important}
  .mat-select-panel.multiSelect.state_dropdown:not([class*=mat-elevation-z]) { box-shadow: none !important;position: absolute !important;top: -31rem !important;left: -1rem !important;  border: .1rem solid #ccc !important;}
  .mat-primary.multiSelect .mat-option:hover.mat-selected:not(.mat-option-disabled) {color: #fff !important; background: #27AE60 !important;}
  .multiSelect .mat-option{height: 2.7rem !important;}
  .mat-select-panel.multiSelect{min-width: calc(100% + 12px) !important; width: 100% !important;  top: 1.9rem !important;
    left: 1.5rem !important; box-shadow: none !important;position: absolute !important; border: .1rem solid #6A6868 !important;border-radius: .2rem !important;}
  .mat-primary.multiSelect .mat-option.mat-selected:not(.mat-option-disabled) {color: #1a1a1a !important;}
  /* end of multiSelect Dropdown */
  
  /* Errortext */
  .prcContainer .errorText{display: block !important;text-align: left !important;font-size: 1.4rem !important;font-weight: normal !important;}
  
  /* Print Preview */
  .printButton{cursor: pointer !important;color: rgb(33, 110, 36), !important;width: 2.4rem !important; left: 0% !important;font-size: 3.2rem !important; border: none !important; background: transparent !important;position: relative !important;
    top: .3rem !important;}
    .printBar{height: 8rem;box-shadow: 0 11px 6px -7px #ccc;background: #fff !important;z-index: 1;top: 6.4rem;
    left: 6.7rem;width: 100%;overflow: hidden;}
    .previewHeading{width: 100%;background: #fff !important;margin-top: 1.5rem !important;}
    .previewHeading2{margin-top: 2%;width: 84%;margin-left: 8%;background: #fff !important;}
    .barContent{background: #515457 !important;color: #fff !important;padding: 1rem 2rem !important; font-size: 2.4rem !important;}
    .msaBox{background:  #515457 !important;width: 4% !important;height: 3.2rem !important;}
    .leftSpace{margin-top: 2rem !important; padding-left: 1.3rem !important;}
    .leftSpace1{margin-top: 0rem !important;padding-left: 1.3rem !important;}
    .text-heading{background: #f1f1f1;font-size: 1.8rem;border-bottom: .2rem solid #fff;display: flex;align-items: center;padding-right: 0 !important;min-height: 6.6rem !important;}
    .text-heading-bar{background: #ccc;font-size: 1.8rem; border-left: .2rem solid #fff;
    border-bottom: .2rem solid #fff;display: flex;align-items: center;min-height: 6.6rem !important;}
    .text-align{text-align: right;}
    .heading{font-size: 2.1rem;font-weight: bold;}
    .wordbreak{word-break: break-word !important;line-height: 1.2 !important;width: 100% !important;}
    .zoal-rate-heading{min-height: 8rem !important; background: rgb(81, 84, 87);border: .2rem solid #fff;
  display: flex; align-items: center; text-align: left; color: #fff;font-size: 1.5rem; font-weight: bold;}
    .zoal-rate-content{background: #f1f1f1;border: .2rem solid #fff; padding-right: 1.5rem !important;
      display: flex; align-items: center; text-align: left; font-size: 1.5rem; word-wrap: break-word;}
    .zoal-rate-content1{background: #f1f1f1 !important;border: .2rem solid #fff;padding-left: .5rem !important; padding-right: 1.5rem !important;
        display: block; align-items: center; text-align: left; font-size: 1.5rem; word-wrap: break-word;}
     .btn1 {background: #27AE60;color : rgb(49, 46, 46); border-radius: 2rem 2rem 2rem 2rem;font-size: 1.6rem;color:#fff}
     .btn1:not([disabled]):hover {background: rgb(18, 107, 55) !important; color: #fff; border: .2rem solid rgb(33, 110, 36) !important;}
     .contentheight{min-height: 6.6rem !important;}
    .btn1:disabled{cursor: not-allowed !important;background: #81C784;}
    .prcContainer .smallPrint{position: relative;left: 10%;}
    .creditDialog .overflow-2{max-height: 60rem; overflow: auto;}
    .prcContainer .overflow-2{max-height: 60rem;overflow: auto;}
    .prcContainer .leftPrint{position:relative !important; left: -5% !important; }
    .creditDialog .leftPrint{position:relative !important; left: -5% !important; }
    .prcContainer .printLmargin{margin-left: -5.2% !important;}
    .creditDialog .printLmargin{margin-left: -5.2% !important;}
    .prcContainer .marginZonL{margin-left: -5% !important;}
    .prcContainer .marginZonal{margin-left: -5% !important;}
    .prcContainer .commercialLeft{position: relative !important; left: -2.4% !important;}
  
    /* end of Print Preview */
  
    .prcContainer .stateValidation{position: absolute !important;width: 25rem;top: 2.2rem;left: 0;color: red !important;}
    .prcContainer .documentTextColor{color: #1a1a1a !important;}
    .prcContainer .commandmentError{color: red !important;width: 25rem !important;text-align: left !important;position: absolute !important;
      top: -1rem;}
    .prcContainer .salesForceWidth{max-width: 30rem !important;padding-right: 1rem;padding-left: .5rem;}
  
  .ng-input input {
    height: 3rem !important;
  }
  .ng-input input[disabled] {
    background-color: #eeeeee4f !important;
  }
  
  .prcContainer .contractWidth{max-width: 25rem !important;padding-right: 1rem;padding-left: .5rem;}
  
  .prcContainer .h3Margin{margin-top: 3rem !important; margin-left: 4rem;}
  .prcContainer .h3HeadingStyle{margin-top: 3rem !important; margin-left: 4.5rem;}
  .creditDialog .h3Margin{margin-top: 3rem !important;margin-left: 4rem;}

  
  
  
  body .col-lg-4.col-md-4.col-sm-4.col-xs-4.mg, body .col-lg-8.col-md-8.col-sm-8.col-xs-8.mg {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .prcContainer .label-text.report {
    font-size: 1.6rem;
    padding-top: 0rem;
  }
  
  
  body .prcContainer.report span.mat-select-placeholder.ng-tns-c4-1.ng-star-inserted,
  body .prcContainer.report span.ng-tns-c4-1.ng-star-inserted {
    color: #fff !important;
  }
  
  .prcContainer.report .mat-raised-button.mat-primary {
    margin-left: 1rem;
    margin-top: 3rem;
  }
  
  .ng-input input[disabled] {
    background-color: #eeeeee4f !important;
  }

  .prcContainer .conBranch{
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: center;
  }

  .mat-select-panel.reportSelect {
    min-width: calc(100% + 10px) !important;
    width: 100% !important;
    top: 8.9rem !important;
    margin-top: 0rem !important;
    left: 1.5rem !important;
    box-shadow: none !important;
    position: absolute !important;
    border: .1rem solid #6A6868 !important;
    border-radius: .2rem !important;
    max-height: 29vh !important;
    overflow-y: auto !important;
}

.aa.mat-select-search-inner.mat-typography.mat-datepicker-content.mat-tab-header {
  position: fixed !important;
  top: 46px !important;
  background: none !important;
  border: 0 !important;
}

#advanceSerach .mat-select-arrow-wrapper {
  opacity: 0!important;
}

.creditNgxSelect.advanceSearch .mat-select-search-inner.mat-typography.mat-datepicker-content.mat-tab-header {
  position: fixed;
  top: 45px;
  left: 12px;
  height: 12px;
  border: 0;
  margin-top: 0;
}

.uploadDocument .mat-select-search-inner.mat-typography.mat-datepicker-content.mat-tab-header {
  position: fixed;
  top: 45px;
  left: 14px;
  border: 0;
 width: calc(100% + 5px) !important;
  height: 17px;

}
.mat-select-panel.creditNgxSelect.advanceSearch {
  top: 44px!important;
  max-height: 2rem;
  min-width: calc(100% + 9px) !important;
}

.uploadDocument .mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple) {
  background: none;
  box-shadow: none;
}
.uploadDocument .mat-option.mat-selected:not(.mat-option-multiple):not(.mat-option-disabled) {
  background: none;
}
  `;

  constructor(private router: Router, location: PlatformLocation) {}

  ngOnInit() {
    var container;
    if (/Edge/.test(navigator.userAgent)) {
      container = document.getElementsByTagName("head")[0];
    } else {
      container = document.getElementsByClassName("prcContainer")[0];
    }
    const style: any = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(this.style_css + this.core_css));
    container.appendChild(style);
  }
}
