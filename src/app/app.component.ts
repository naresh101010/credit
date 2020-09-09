import { Component} from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'app';
  style_css = `/* You can add global styles to this file, and also import other style files */

  @import '~ngx-toastr/toastr';
  html{font-size: 45% !important;}
  body {font-size: 1.4rem; overflow-x: hidden; overflow-y: auto; box-sizing: border-box;font-family: 'Open Sans', sans-serif !important; line-height: 1.8; }
  
  ::-webkit-scrollbar {width: 1.0rem;}
  ::-webkit-scrollbar-track {background: #EBEBF2;} 
  ::-webkit-scrollbar-thumb {background: #6A6868; border-radius: 1rem;}
  ::-webkit-scrollbar-thumb:hover {background: #585757;}
  .retailContainer  h3{margin-top: 0;}
  .retailContainer {margin: 0 0 1rem;}
  .retailContainer.mat-dialog-content {margin: 0 0 1rem !important;}
  .retailContainer #bell{position: relative;right: 10.5rem; color: #6A6868;}
  .retailContainer #profile{position: relative; right: 101%; letter-spacing: 0; color: #1A1A1A;}
  .retailContainer #profileimg{position: relative;  right: 1%;}
  .retailContainer #titleheading{background: #F1F1F1;  width: 110%; margin-top: -12%; height: 5.1rem;}
  .retailContainer #heading{letter-spacing: 0; color: #1A1A1A;position: absolute;top: -5.5rem;left: .2rem;}
  .retailContainer #usersearchicon{position: relative; top: 5.5rem; font-size: 3.5rem; color: #6A6868;}
  .retailContainer #plusicon{color: #27AE60; position: absolute; right: -1%; top: 74%; z-index: 10; font-size: 4.0rem;}
  .retailContainer #userinput{font-size: 1.7rem; position: relative; top: 2.6rem; left: 3.9rem; font-weight: bold;}
  .retailContainer .RoleMH{font-size: 1.7rem; font-weight: bold; color: #1A1A1A; cursor: pointer;}
  .retailContainer #rolesearch{position: relative; top:2.5rem; font-size: 3.5rem; color: #585757;}
  .retailContainer .green-border{background: #27AE60; border: .1rem solid #27AE60; margin-top: -1.0rem; margin-bottom: 0rem;}
  .retailContainer .green-border-heading{background: #27AE60; border: .1rem solid #27AE60; margin-top: 1.4rem; margin-bottom: 1.0rem;}
  
  /* updated new */
  .retailContainer .search {position: relative; color: #1a1a1a; font-size: 1.4rem; padding-top: .7rem; width: 100%; }
  .retailContainer .search input { width: 100%; height: 4.5rem; border:0rem; color:#1a1a1a;}
  .retailContainer .breadcrumb {background: none !important; color:#1a1a1a; font-size: 1.4rem; font-weight:normal; text-align:left; position: relative;top: 0%; font-family:'Open Sans', sans-serif;}
  .retailContainer .breadcrumb .fa-caret-right {color:#1a1a1a; padding: .5rem;}
  .retailContainer .breadcrumb1{background: none !important; font-family: 'Open Sans', sans-serif;color:#1a1a1a; font-size: 1.4rem; font-weight:normal; position: absolute;top: 0%; left: 12%; z-index: 2;}
  .retailContainer .breadcrumb1 .fa-caret-right {color:#1a1a1a; padding: .5rem;}
  .retailContainer .breadcrumb2{background: none !important; font-family: 'Open Sans', sans-serif;color:#1a1a1a; font-size: 1.4rem; font-weight:normal; position: absolute;top: 0%; left: 10%; z-index: 2;}
  .retailContainer .breadcrumb2 .fa-caret-right {color:#1a1a1a; padding: .5rem;}
  
  
  /* User Management */
  .retailContainer #RoleS{color: #27AE60; position: absolute; font-size: 4.0rem; right: 4%; top: 12%;}
  
  .retailContainer a{cursor: pointer; color:#27AE60}
  
  
  /* view permission */
  .retailContainer .sectionOpen{  width: 100%;  height: auto;  cursor: pointer;}
  /* View Permission */
  .retailContainer .viewpermission{  width: 100%;  height: 0%;  background:#EBEBF2;  display: flex;}
  .retailContainer .viewpermi{  width: 25%;  height: 3.5rem;  border-bottom: .1rem solid #EBEBF2;  display: flex;  justify-content: center;  align-items: center;}
  .retailContainer .viewpermi1{  width: 25%;  height: 3.5rem;  display: flex;  justify-content: center;  align-items: center;  }
  .retailContainer .viewpermission1{  width: 100%;  height: 3.5rem;  display: flex;}
  .retailContainer .scrollbar{ overflow-y:scroll;  border-bottom: .1rem solid #EBEBF2;   font-size: 1.4rem;}
  .retailContainer .PermissionMapping{ position: relative;  left: .3rem;  top: .8rem;  font-size: 1.4rem;  font-weight: bold;}
  .retailContainer .userheading{position: relative; font-size: 1.5rem; left: 0rem; top: 1.7rem;}
  
  /* 18NOv2017 */
  .retailContainer #shadow{box-shadow: none;}
  .retailContainer #lending{height: fit-content; max-width: 100%; box-shadow: 0.05rem  0.05rem  0.05rem #ccc;  margin-top: 6.5rem;}
  
  /* 20 October */
  .retailContainer ::ng-deep select option:hover{background: #27AE60} 
  
  .retailContainer ::ng-deep .mat-dialog-container {border-radius: 2rem;position: relative !important;left:1.6% !important;}
  .retailContainer mat-card{box-shadow: none !important;font-family: 'Open Sans', sans-serif !important;}
  .retailContainer .mat-card{box-shadow: none !important; font-family: 'Open Sans', sans-serif !important;}
  .retailContainer ::ng-deep .mat-card{box-shadow: none !important; font-family: 'Open Sans', sans-serif !important;}
  .retailContainer .form-control {border-radius: 0; border: .1rem solid #6a6868; box-shadow: 0rem .2rem .6rem #00000029;height: 2.7rem;}
  .retailContainer .form-control-textarea {padding-left: .6rem; border-radius: 0; border: .1rem solid #6a6868; box-shadow: 0rem .2rem .6rem #00000029;}
  .retailContainer input{text-transform: uppercase;}
  .retailContainer textarea{text-transform: uppercase;}
  .retailContainer .form-control:focus {outline: none; border-color: #27AE60; box-shadow: 0 0 0 0;}
  .retailContainer .form-control:hover{outline: none; border-color: #27AE60; box-shadow: 0 0 0 0;}
  .retailContainer textarea:focus {outline: none; border-color: #27AE60; box-shadow: 0 0 0 0;}
  .retailContainer textarea:hover{outline: none; border-color: #27AE60; box-shadow: 0 0 0 0;}
  .retailContainer .form-control-textarea:focus{border-color: #27AE60;  box-shadow: none; -webkit-box-shadow: none;}
  .retailContainer mat-panel-title{font-weight: bold;}
  
  /* Media Queries */
  
  @media only screen and (max-width: 1534px) {
    html {font-size: 57%;}
  }
  
  @media only screen and (max-width: 1440px) {
      .retailContainer .mat-stepper-horizontal-line{min-width: 6rem !important;}
    }
  
  @media only screen and (max-width: 1440px) {
      html {font-size: 55%;}
    .retailContainer .mat-stepper-horizontal-line{min-width: 5rem !important;}
    }
    
    @media only screen and (max-width: 1366px) {
      html {font-size: 52%;}
      .retailContainer .mat-stepper-horizontal-line{min-width: 4rem !important;}
    }
  
  /* Required Message Style */
  .retailContainer .hasErrorMsg {
    color: red;
    position: absolute;
    left: 0;
    bottom: -8px; 
    right: 0;
    text-align: center;
  }
  /* Required Message Style */
  
  .retailContainer .btn1:disabled{
      cursor: not-allowed !important;
      background-color: #81C784;
    }
    
  .retailContainer .mat-icon-button[disabled] .material-icons{
    cursor: not-allowed;
  }
   
  /* mat-select */
  .mat-select{font-family: 'Open Sans', sans-serif !important;}
  .mat-select-panel:not([class*=mat-elevation-z]) {min-width: calc(100% + 12px) !important; max-width: calc(100% + 12px) !important; width: calc(100% + 12px) !important; box-shadow: none !important;position: absolute !important;top: 2rem !important;left: 1.5rem !important;  border: .1rem solid #ccc !important;}
  .cdk-overlay-pane{transform: translateX(-16) translateY(19) !important;}
  .mat-select{position:absolute; top: 0; }
  .mat-select-value-text{position: relative; top: -.2rem; font-size: 1.4rem !important;text-transform: uppercase !important;}
  .mat-option{height: 2.7rem !important;}
  /* ::ng-deep .mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple) {background-color: #27AE60 !important;color: #fff;} */
  /* mat-select */
  
  .rate_card_container {padding: 0 15px !important;}
  .rate_card_container #commercialboxdivider{width: 100% !important;}
  .rate_card_scroll {width: 100% !important; padding: 5px 0 20px 0 !important; margin-top: 1rem !important;}
  .mat_ngx_select_search {
    font-size: 2rem !important;
    position: absolute;
    top: 0.4rem;
    left: 0;
  }
  
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
  
  .mat-select-search-inner.mat-typography.mat-datepicker-content.mat-tab-header {
    position: fixed !important;
    top: 45.5px !important;
  }
  .mat-select-search-input {padding: 2px 4px 0px 14px !important; font-family: 'Open Sans', sans-serif !important; font-size: 1.4rem !important; text-transform: uppercase !important; position: relative !important;}
  .mat-select-search-clear.mat-icon-button{width: 20px !important; height: 20px !important;}
  .mat-select-search-clear.mat-icon-button .mat-icon{font-size: 2rem !important; line-height: 24px !important}
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
  .mat-option{font-family: 'Open Sans', sans-serif !important;}
  .mat-option-text{font-size: 1.4rem; text-transform: uppercase !important; font-family: 'Open Sans', sans-serif !important;}
  
  
  .toast-bottom-right {
    top: 12px;
    bottom: auto;
  }
  
  @supports (-ms-ime-align:auto) {
    html body .retailContainer .mat-form-field .mat-datepicker-toggle .mat-icon-button {
      top: 1.8rem !important;
    }
  }
  
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
    .retailContainer .date_picker.mat-input-element{
      margin-top: -1rem !important;
    }
  
    .creditDialog.mat-form-field .date_picker.mat-input-element {
      margin-top: 0rem !important;
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
  .cdk-overlay-connected-position-bounding-box .mat-tooltip-panel {
    pointer-events: auto !important;
  }
  .mat-tooltip {
    max-width: initial !important;
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
  }
  
  .ng-value-label {
    font-size: 1.4rem !important;
  }
  .toast-container .ngx-toastr {
    padding: 10px 10px 10px 50px !important;
  }
  `
  core_css = `/* GLOBAL CSS */
  h1{font-size: 4.2rem !important}
  h2{font-size: 3.2rem ! important;}
  h3{font-size: 2.4rem !important; margin-top: 0 !important;margin-bottom: 1rem !important;}
  h4{font-size: 1.8rem !important;}
  h5{font-size: 1.8rem !important;}
  h6{font-size: 1.6rem !important;}
  .retailContainer p{margin: 0 0 1.4rem;}
  .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9{
    min-height: .1rem;padding-right: 1.5rem !important;padding-left: 1.5rem !important;}
  .row{margin-left: -1.5rem !important; margin-right: -1.5rem !important;}
  .retailContainer hr{margin-bottom: 2rem !important;}
  body {
    background-color: #f3f3f3 !important;
    overflow-y: scoll;
  }
  /* green color code  = #27AE60
     disabled color code =  #ccc
     heading background color = #f1f1f1  */
  /* Delete Icon font-size */
  
  .retailContainer .deleteIcon{font-size: 2.4rem !important; position: relative; left: 9rem !important; top: .4rem !important;color: #fff !important;}
  /* */
  /* END OF GLOBAL CSS */
  /* html {font-size: 50%;} */
  .material-icons {color:#27AE60 }
  .retailContainer .overflow::-webkit-autobar{width: .7rem; cursor:  pointer !important;}
  .retailContainer .heading-bar-dashboard {background: #F1F1F1;  padding-top: 1.0rem; padding-bottom: 1.0re; color:black; font-size:1.6rem;} 
  .retailContainer .height{font-size: 1.6rem; height: 4.5rem; padding-top: .5rem; padding-bottom: .5rem;  border-bottom: .1rem solid #f1f1f1; display: flex; align-items: center; }
  .retailContainer .label-text{font-size: 1.6rem; font-weight: bold; padding-top: .6rem; }
  .retailContainer .label-text-value{font-size: 1.6rem; font-weight: 100; padding-top: .6rem}
  .retailContainer .label-text-branch{font-size: 1.6rem !important; font-weight: bold !important;}
  
  .retailContainer .add-more{margin-top: 1.5rem;}                    
  .retailContainer .flex-container {display: flex;flex-wrap: nowrap; margin-bottom: 2rem;}
  .retailContainer .flex-container > .one {width: 22.5%;margin-right: 2.0rem;text-align: center;line-height: 7rem;
    font-size: 3.0rem;}
  .retailContainer .flex-container > .two { width: 10%; text-align: center;line-height: 7rem;font-size: 3.0rem; border-left: .3rem solid #f1f1f1;}
  .retailContainer .one img{width: 100%; height: 100%;}
  .retailContainer .two img{width: 100%; height: 100%;}
  .retailContainer .text{color:#27AE60;}
  .retailContainer .relative{position: relative !important;}
  .retailContainer .absolute{width: 2.1rem;height: 2.1rem; background: #27AE60; position: absolute; border-radius: 50%;
    box-shadow: .1rem .1rem #ccc; display: flex; justify-content: center; align-items: center; color: #fff;
    right: 9.5rem; font-weight: lighter;}
  .retailContainer #background{background: #fff;}
  .retailContainer .mat-card{box-shadow: none !important;}
  .retailContainer .row_center{ text-overflow: ellipsis !important; overflow: hidden !important; white-space: nowrap !important; text-align: left;}
  .retailContainer .row_center1{ text-overflow: ellipsis !important; overflow: hidden !important; white-space: nowrap !important; text-align: left;width: 15rem;}
  .retailContainer .overflow{max-height: 50vh;overflow-y: auto;overflow-x: hidden; box-sizing: border-box; autobar-color: #27ae60 #27ae60; autobar-width: thin;}
  .overflow::-webkit-autobar {width: .7rem;  max-height: 1.0rem;}
  .overflow::-webkit-autobar-track {display: none;border-radius: 1.0rem;}
  .overflow::-webkit-autobar-thumb {background: #6A6868 !important;border-radius: 1.0rem;  max-height: 1.0rem;}
  .overflow::-webkit-autobar-thumb:hover {background: #585757 !important;}
  .retailContainer .hideContent {overflow: hidden;line-height: 1.0rem;height: 50vh;}
  .retailContainer .showContent {line-height: 1.0rem; height: auto;}
  .retailContainer .mat-table{font-family: 'Open Sans', sans-serif !important;}
  .retailContainer .dots{display: inline-block;width: 9%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
  .retailContainer .ten{width: 10%;}
  .retailContainer .eleven{width: 11%;}
  .retailContainer .onetwo{width: 12%;}
  .retailContainer .onethree{width: 13%;}
  .retailContainer .onefour{width: 14%;}
  .retailContainer .onefive{width: 15%;}
  /* tooltip */
  .tooltiptext {display: none; background: #27AE60; color: #fff; text-align: left; border-radius: .6rem; padding: .5rem 0;
    z-index: 1123456;word-break: break-all !important;} 
  .retailContainer .dots:hover .tooltiptext {display: block;}
  .mat-tooltip {background: #27AE60 !important; color: #fff !important; font-size: 1.6rem !important;
  top: 0 !important; right: 0 !important; left: 0 !important; bottom: 0 !important;word-break: break-all;}
   /* Position the tooltip */
  .retailContainer .headingbar{width: 102%;margin-left: -1.8rem; font-weight: 600;}
  .retailContainer .hero-content {
    /* margin-top: 9%; */
    width: 100%!important;
    margin-left: 11%;
    margin-bottom: 5rem;
    /* height: 100vh; */
  }
  .retailContainer .full-width{width: 100% !important;}
  .retailContainer .sfdAcc{text-overflow: ellipsis; white-space: nowrap;}
  .retailContainer .box-margin{margin-top: 3.0rem;}
  .retailContainer .dashboard-heading{position: relative; height: 5rem;}
  .retailContainer .msa-button{position: absolute; right: 0;cursor: pointer !important;}
  .retailContainer .pending-contract{font-size: 2.50rem; font-weight: 500;}
  /* Dashboard end */
  .retailContainer .contractbox{width: 29% !important;background: #fff !important;margin-right: 2.4rem !important;border-radius: .7rem !important;}
  .retailContainer .contractbox2{border-bottom: .1rem solid #27AE60 !important;width: 100%;height: 48% !important;}
  .retailContainer .contractupdate{margin-left: 2.9rem !important;margin-top: 2.3rem !important;}
  .retailContainer .gotocontract{width: 95% !important;margin-left: 1.1rem !important;margin-top: 2.5rem !important;border: none !important;}
  .retailContainer .paddingleft{padding-left: 1rem !important;}
  .retailContainer .paddingleftone{padding-left: 1rem !important;}
  .retailContainer .paddingleft1four{padding-left: 1.4rem !important}
  .retailContainer .paddingrightone{padding-right: 1rem !important;}
  .retailContainer .paddingrightthree{padding-right: 3rem !important;}
  .retailContainer .inline{display: inline !important;position: relative !important;bottom: .5rem !important; font-size: 2rem !important; font-weight: 600;left: -1rem !important;}
  .retailContainer .existingSfx{margin-bottom: 5% !important;padding-top: 0 !important;}
  .cdk-drag-placeholder {visibility: hidden !important;}
  .cdk-drag-animating {display: none !important}
  #cdk-drop-list-0{height: 73rem !important}
  /* *****************************************************************************************************
                                              MSA COMPONENT 
  ****************************************************************************************************** */
  .retailContainer .consignorButton{position: relative; top: 1.5rem; left: -1rem;}
  .retailContainer .pincodeText{cursor: pointer !important; color: #1a1a1a !important;}
  /* Ng- Select */
  .retailContainer .ratecardValue .ng-placeholder{padding-left: 0 !important; }
  .retailContainer .ng-select{top: .6rem !important;}
  .retailContainer .ng-select .ng-select-container .ng-value-container {padding-left: .6rem !important;}
  .retailContainer .ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-marked {background-color:#27AE60 !important;color: #fff;}
  .retailContainer #ngselect.ng-dropdown-panel-items .ng-option.ng-option-marked {background-color:#27AE60 !important;color: #1a1a1a}
  .retailContainer .ng-select .ng-select-container{min-height: 2.7rem !important;border: .1rem solid #6A6868 !important; border-radius: .2rem !important;}
  .retailContainer .ng-select.ng-select-single .ng-select-container {height: 2.7rem !important;}
  .retailContainer .advance-search.ng-select-single .ng-select-container{background-color: #27AE60 !important; color: #fff !important; }
  .retailContainer .ng-dropdown-panel .ng-dropdown-panel-items .ng-option {padding: .2rem 1.0rem !important;background-color: #fff !important; font-size: 1.4rem !important;}
  .retailContainer .ng-select.ng-select-opened>.ng-select-container{border: .1rem solid #27AE60 !important; border-radius: .2rem !important;}
  .retailContainer .ng-select.ng-select-single .ng-select-container .ng-value-container .ng-input {top: 0 !important;}
  .retailContainer ng-select select-dropdown > div {z-index: 2 !important;}
  .retailContainer .ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-selected, .ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-selected.ng-option-marked {
    background-color: none !important;}
  .retailContainer .ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-selected .ng-option-label, .ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-selected.ng-option-marked .ng-option-label {
    font-weight: normal !important ;}
  .retailContainer .advance-search.ng-select-opened>.ng-select-container .ng-arrow {border-color: transparent transparent #fff !important;}
  .retailContainer .ng-dropdown-panel.ng-select-bottom{border: .1rem solid #6A6868 !important; border-radius: .2rem !important;}
  .retailContainer .ng-select .ng-arrow-wrapper .ng-arrow {border-color: #1a1a1a transparent transparent !important;}
  .retailContainer #ngselect .ng-arrow-wrapper .ng-arrow {border-color: #1a1a1a transparent transparent !important;}
  .retailContainer #ngSelect{top: 0 !important;}
  .paddingleft{padding-left: 0 !important;}
  .retailContainer .ng-select .ng-select-container .ng-value-container .ng-input>input{padding-left: .6rem !important;}
  /* Ng-select */
  :-webkit-scrollbar {box-shadow: inset 0 0 .2rem #ccc;border-radius: 2rem;}
  ::-webkit-scrollbar-thumb {border-radius: 1rem;}
  .form-control{height: 2.7rem !important; font-size: 1.6rem; text-transform: uppercase !important}
  .form-control:focus {
    border-color: #27AE60 !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
  }
  
  .hero-content-2{margin-top: 2%;  width: 78%;  margin-left: 11%; margin-bottom: 8rem;position: relative;}
  select{height: 2.7rem;}
  .retailContainer .msaOperation{display: flex;position: relative;}
  .retailContainer .msabutton{text-align: right;position: absolute;right: 0;}
  .retailContainer #mat-card-heading{background-color: #515457 !important; font-size: 1.6rem !important; color: #fff !important; padding: 1.0rem 2.0rem !important;}
  #mat-card-heading{background-color: #515457 !important; font-size: 1.6rem !important; color: #fff !important; padding: 1.0rem 2.0rem !important;}
  .retailDialog #mat-card-heading{background-color: #515457 !important; font-size: 1.6rem !important; color: #fff !important; padding: 1.0rem 2.0rem !important;}
  
  /* Button */
  /* Button */
  .retailContainer .mat-icon-button{width: 4rem !important; height: 4rem !important; line-height: 1.8 !important; border-radius: 0 !important;}
  .retailContainer .mat-raised-button {color : currentColor; padding: 0 1.6rem !important;border-radius: 2rem !important;line-height: 1.6 !important;}
  .retailContainer .example-button-row button,.example-button-row a {margin-right: .8rem;}
  .retailContainer .mat-raised-button.mat-primary {background:  #81C784 !important; border: .2rem solid #81C784 !important;}
  .retailContainer .mat-raised-button:not([disabled]):hover {background: rgb(79, 167, 82) !important;border: .2rem solid rgb(33, 110, 36) !important; }
  .retailContainer .mat-raised-button[disabled] {opacity: 0.6;color : #F1F1F1; background: transparent;}
  .retailContainer tr.mat-header-row {height: 4.5rem !important;}
  .retailContainer button:focus {outline:0;}
  /* end of button  */
  /* end of button  */
  /* mat horizontal line */
  .retailContainer .mat-divider{border-top-color: #27AE60;border-top-width: .2rem;}
  /* mat horizontal line color */
  input{height: 2.7rem; font-size: 1.4rem;}
  .page-header {font-size: 2.4rem;font-weight:normal;margin: 4.0rem 0 0 1.4rem;font-family: 'Open Sans', sans-serif;}
  
  th{background-color: #F1F1F1; line-height: 1.4 !important;}
  .retailContainer select{color: #27AE60;}
  .retailContainer select option:hover {color: black;}
  .retailContainer select option:first-child:hover{color: #27AE60;}
  .retailContainer .consignor-heading{font-weight: bold;}
  .retailContainer table {width: 100%;}
  .retailContainer table.mat-table {box-shadow: none !important;}
  .retailContainer tr.mat-footer-row {font-weight: bold;}
  .retailContainer .mat-table-sticky {border-top: .1rem solid #e0e0e0;}
  .retailContainer .right-aligned-header > .mat-content {justify-content: space-between;}
  .retailContainer .inner-box {background-color:#fff; padding:0; margin:0;}
  .retailContainer .padding20 {padding-top:2.0rem;}
  .retailContainer .text-heading-18 {font-size:1.8rem; font-weight:bold; color:#1a1a1a;}
  .retailContainer .tablinput{height: 1.9rem; width: 9.8rem;}
  .retailContainer .detail{width: 100%;height: 4.5rem; padding: 1.0rem; margin-left: .3rem;}
  .retailContainer .detail1{width: 100%;height: 4.5rem;margin-left: .3rem;}
  .retailContainer .error1{ color: rgb(163, 63, 63); height: 1.0rem;; margin: 0; padding: 0;position:absolute;}
  .retailContainer .error2{margin-left: 1.5rem; color: red; height: 0; margin: 0; padding: 0; height: 1.5rem;}
  .retailContainer .error{font-weight: normal; margin-left: 1.5rem; font-size: 1.4rem; color:red; height: 0; margin:0; padding: 0;position: relative; bottom: .5rem;left: 0 !important; top: 0 !important;}
  .retailContainer .button-msa{color: rgb(33, 110, 36);width: 2.4rem; position: relative; top: .3rem;left: 0%;cursor: pointer;
       font-size: 3.2rem;cursor: pointer; border: none; background-color: transparent;position: relative;}
  .retailContainer #defualtBranchSearch{position: absolute;top: .5rem;left: 2rem;font-size: 1.8rem; color: #ccc; cursor: pointer;}
  .retailContainer #defualtBranchSearch1{position: absolute; right: 4rem; font-size: 1.7rem; top: .5rem; z-index: 10; color: #BCBCCB;}
  .retailContainer #defualtBranchSearch9{position: absolute; right: 2rem; font-size: 1.7rem; top: 1rem; z-index: 10; color: #BCBCCB;}
  .retailContainer #defualtBranchSearch2{position: absolute;left: 2.0rem; font-size: 1.7rem; top: .6rem; z-index: 10; color: #ccc;}
  .retailContainer #defualtBranchSearch5{position: absolute;left: 2.0rem; font-size: 1.7rem; z-index: 10; color: #ccc;}
  .retailContainer #defualtBranchSearchbase{position: absolute;top: .7em;left: 2rem;font-size: 1.8rem; color: #ccc; cursor: pointer;}
  
  .retailContainer .mat-primary .mat-option.mat-selected:not(.mat-option-disabled) {color: #1a1a1a !important;}
   /* Mat Radio Button */
   .retailContainer .mat-card-content, .mat-card-subtitle{font-size: 1.4rem !important;}
   .retailContainer .mat-radio-button {font-family: 'Open Sans', sans-serif !important; position: relative; padding-top: 1rem !important;}
   .retailContainer .mat-radio-label{margin-right: 1rem !important;}
   .retailContainer .mat-radio-label-content{padding-left: 0px !important;position: relative !important; left: -.8rem !important; font-weight: normal; font-size: 1.6rem;margin-top: -1rem;}
   .retailContainer .mat-radio-outer-circle{width: 1.6rem !important; height: 1.6rem !important;border-width: .2rem !important;}
   .retailContainer .mat-radio-inner-circle{width: 1.6rem !important; height: 1.6rem !important;}
   .retailContainer .mat-radio-ripple{width: 0px !important; height: 0px !important;}
   .retailContainer .mat-radio-button.mat-accent .mat-radio-inner-circle {background-color: #27AE60;}
   .retailContainer .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {border-color: #27AE60;}
   .retailContainer .mat-radio-button ~ .mat-radio-button {margin-left: 1.6rem;}
   .retailContainer .mat-radio-inner-circle{width: 1.6rem !important; height: 1.6rem !important;}
   /* end of Radio Button */
  /* Mat - Date Picker */
  .retailContainer #datepickerwidth{width: 100% !important;}
  .retailContainer .mat-datepicker-toggle-default-icon ng-star-inserted{position:absolute; top: -.5rem; }
  .creditDatepicker .mat-calendar-body-selected{background: #27AE60 !important;}
  .creditDatepicker td.mat-calendar-body-cell {font-size: 1.5rem;line-height: 2rem; padding: 1.8rem 0 !important;}
  .creditDatepicker thead.mat-calendar-table-header tr th {background: #f1f1f1; color: #1a1a1a; font-weight: bold; font-size: 1.6rem;}
  
  /* end of Mat data Picker */
  /* checkbox */
  .retailContainer .mat-checkbox-label{font-weight: normal; font-size: 1.6rem;}
  .retailContainer .mat-checkbox-inner-container{width: 1.6rem !important; height: 1.6rem !important;margin-right: 0px !important}
  .retailContainer .mat-checkbox-ripple{width: 0px !important; height: 0px !important;}
  .retailContainer .mat-checkbox .mat-checkbox-frame {border-color: #6a6868; border-width: .2rem;}
  .retailContainer .mat-checkbox-checked .mat-checkbox-background {background-color: #81C784 !important;}
  .retailContainer .mat-checkbox-checked.mat-accent .mat-checkbox-background, .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
    background-color: #27AE60;}
  .retailContainer .mat-checkbox-layout .mat-checkbox-label{padding-left: .6rem !important;}
  /* checkbox */
  /* Mat form field */
  
  .retailContainer .mat-form-field-appearance-outline .mat-form-field-suffix {left: 1.2rem !important; top: -.2rem !important; right: 0 !important;}
  .retailContainer .mat-form-field{width: 100% !important;}
  .retailContainer .mat-form-field-outline{height: 2.7rem; width: 100%;}
  .retailContainer .mat-form-field-infix{height: 2rem; border-top: none !important; top: .7rem !important;}
  .retailContainer .mat-form-field-appearance-outline .mat-form-field-infix {padding: 0em 0 0em 0;}
  .retailContainer .mat-form-field{top: -.5rem; font-family: 'Open Sans', sans-serif !important;}
  .retailContainer .mat-form-field-appearance-outline .mat-form-field-wrapper{margin: 0 !important;}
  .retailContainer .mat-form-field-wrapper{padding-bottom: 0 !important;}
  .retailContainer .mat-form-field-appearance-outline{margin: 0 0;position: relative !important;top: 0 !important;}
  .retailContainer .mat-form-field-appearance-outline:hover{border-color: #27AE60;}
  .retailContainer .mat-form-field-appearance-outline .mat-form-field-outline{position: absolute; top: 0;color: #6a6868 !important ; box-shadow: 0 .2rem .2rem #00000029;}
  .retailContainer .mat-form-field.mat-focused .mat-form-field-ripple {background-color: #27AE60 !important;}
  .retailContainer .mat-form-field-appearance-outline .mat-form-field-outline-thick {color: #27AE60 !important;}
  /* .mat-form-field-appearance-outline.mat-form-field-invalid.mat-form-field-invalid .mat-form-field-outline-thick {color: #f44336 !important;} */
  .retailContainer .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {color: #27AE60 !important;}
  .retailContainer .mat-form-field-appearance-outline .mat-form-field-outline-start {border-radius:0 !important ;
    min-width: 0 !important ;}
  .retailContainer .mat-form-field-appearance-outline .mat-form-field-outline-end {border-radius: 0 !important ;
    min-width: 0 !important ;}
    .retailContainer .mat-focused .mat-form-field-label {color: green !important;}
  .retailContainer .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {
      background-color: #ccc !important;}
  .retailContainer .mat-input-element {position: absolute; top: -.6rem !important;margin-top: .2rem !important}
  .retailContainer .mat-select-trigger{top: .4rem !important;}
  /* End of mat form field */
    /* mat Table */
  .retailContainer tr.mat-footer-row, tr.mat-row{height: 4.2rem !important;}
  .retailContainer td.mat-cell:first-of-type, td.mat-footer-cell:first-of-type, th.mat-header-cell:first-of-type{padding-left: 2.4rem !important;}
  .retailContainer td.mat-cell, td.mat-footer-cell, th.mat-header-cell {border-bottom-width: .1rem !important;}
  .retailContainer mat-header-cell:first-of-type{padding-left: 1.2rem !important;}
  .retailContainer mat-header-cell:last-of-type{padding-right: 0 !important;}
  .retailContainer mat-cell:first-of-type, mat-footer-cell:first-of-type, mat-header-cell:first-of-type {
    padding-left: 1.2rem !important;}
  .retailContainer mat-cell:last-of-type, mat-footer-cell:last-of-type, mat-header-cell:last-of-type {
    padding-right: 0 !important;}
  .retailContainer .mat-header-cell{font-size: 1.6rem; font-weight: 600; background-color: #F1F1F1;}
  .retailContainer .mat-table{font-family: 'Open Sans', sans-serif !important;}
  .retailContainer mat-header-row{min-height: 4.5rem !important;}
  .example-container {overflow: auto;box-shadow: none;}
  .retailContainer mat-footer-row, mat-row {min-height: 4.5rem !important;}
  .retailContainer .mat-cell, .mat-footer-cell {font-size: 1.6rem !important; word-break: break-all !important;}
  .overflow{min-height: 52vh;overflow-y: scroll;overflow-x: hidden; box-sizing: border-box;}
  .overflow::-webkit-scrollbar {width: .7rem;}
  .overflow::-webkit-scrollbar-track {display: none;}
  .overflow::-webkit-scrollbar-thumb {background-color: #6A6868;}
  .overflow::-webkit-scrollbar-thumb:hover {background-color: #585757;}
  /* end of mat table */
  .retailContainer .mat-button, .mat-fab, .mat-flat-button, .mat-icon-button, .mat-mini-fab, .mat-raised-button, .mat-stroked-button{
    font-family:'Open Sans', sans-serif !important;  }
  /* Mat Dialog Container */
  .retailContainer .mat-dialog-container {border-radius: 2.0rem !important;position: relative !important;left:1.6% !important;}
  .retailContainer .cdk-overlay-dark-backdrop {background-color: transparent !important;}
  .retailContainer .cdk-overlay-backdrop {background-color: rgba(51, 51, 51, 0.78) !important;}
  /* End of Mat Dialog Container */
  /* Mat Checkbox */
  .retailContainer .mat-checkbox-inner-container{width: 1.6rem !important; height: 1.6rem !important;margin-right: 0 !important}
  .retailContainer .mat-checkbox-checked.mat-accent .mat-checkbox-background, .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
    background-color: #27AE60;}
  .retailContainer .mat-checkbox-label{font-weight: normal; font-size: 1.2rem;}
  .retailContainer .mat-checkbox-label{font-weight: normal; font-size: 1.2rem;}
  .retailContainer .mat-checkbox-ripple{width: 0 !important; height: 0 !important;}
  .retailContainer .mat-checkbox-checked.mat-accent .mat-checkbox-background, .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
    background-color: #27AE60;}
  /* end of checkbox */
  /* mat-expansion */
  .retailContainer .mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow: none !important;}
  #box-shadow{box-shadow: none; padding-top: 0; padding-bottom: 0; }
  .retailContainer #box-shadow{box-shadow: none; padding-top: 0; padding-bottom: 0;}
  .retailContainer .mat-expansion-panel-spacing {margin: 0 0;}
  .retailContainer .mat-expansion-indicator{transform: rotate(0deg) !important;border-style: none; width: 0; height: 0; border-left: .7rem solid transparent;border-right: .7rem solid transparent; 
    border-top: 1rem solid; position:  relative !important; top: 1rem !important;}
   .retailContainer .mat-expansion-indicator::after{border-style: none;  color: #fff;}
  .retailContainer .mat-expansion-indicator.mat-expanded{transform: rotate(0deg) !important;border-top: 1rem solid #27AE60 !important;}
  .retailContainer .mat-expansion-panel-header.mat-expanded{color:#27AE60; border-bottom: .2rem solid #27AE60;border-radius: 0 !important;}
  .retailContainer .mat-expansion-panel-header {  padding: 0 0!important;border-bottom: .1rem solid #f1f1f1;height: 5.0rem !important;
    font-size: 1.6rem; font-family: 'Open Sans', sans-serif !important}
  .retailContainer .mat-expansion-panel-content{font-family: 'Open Sans', sans-serif !important}
  .retailContainer .mat-content.mat-expanded {border-bottom: .2rem solid red !important; font-weight: bold;}
  .retailContainer .mat-content.mat-expanded {color: #27AE60;border-color: #27AE60;}
  .retailContainer .mat-content { font-weight: bold; padding-top: 2.0rem;}
  .retailContainer .mat-expansion-panel-body {padding: 0 0 0 !important}
  .retailContainer .mat-card { font-family: 'Open Sans', sans-serif !important;}
  .retailContainer .mat-expansion-panel-spacing {margin: 0 0;}
  .retailContainer .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']):hover { background-color: #fff; } 
  /* mat-expansion */
  .retailContainer #plusicon {color: #27AE60; position: relative; right: 0;font-size: 3.2rem; left: .5rem;}
  .retailContainer #exelLink{position: relative;  right: 1.2rem !important;}
  .retailContainer .fonts{font-size: 1.6rem !important;}
  .retailContainer .fontSizeforview{font-size: 3rem !important;} 
  /* Advance Search Pop-Up */
  .retailContainer .branchCode{white-space: nowrap;overflow: hidden;text-overflow: ellipsis;min-width: 16rem;}
  .retailContainer .fa-times{color: #1a1a1a;position: absolute;right: 1rem;top: -1rem; cursor: pointer;opacity: 0.6;}
  .retailContainer .zonalheadingbar{background-color: #F1F1F1; height: 4.5rem; display: flex;  align-items: center; line-height: 1.2;font-size: 1.6rem; font-weight: 500;border-right: .1rem solid #fff;}
  .retailContainer .commercial-padding{padding-left: .5rem; padding-right: .5rem;}
  .retailContainer #popup-hr{margin-top: .5rem; border: 0;border-top: .2rem solid #27AE60;}
  .retailContainer #h2{margin-top: 1.8rem !important; margin-left: 2.0rem; margin-bottom: 0; min-width: 47rem !important;}
  .retailContainer #h3{margin-top: 1.8rem !important; margin-bottom: 0; min-width: 47rem !important;}
  .retailContainer #h4{margin-top: 1.8rem !important; margin-bottom: 0; min-width: 47rem !important;}
  
  .retailContainer .margin-row{margin-right: 0 !important; margin-left: 0 !important;}
  .retailContainer .row-margin{margin-left: 0; margin-right: 0;padding-left: 0 !important;padding-right: 0 !important;position: relative;}
  .retailContainer .background-color{background-color: #27AE60; color: #fff;}
  .retailContainer .searchby{font-weight: bold; font-size: 1.6rem !important; margin-bottom: 2.5rem; padding-left: 1.5rem; margin-right: 0; margin-top: .4rem;}
  .retailContainer .searchby1{font-weight: bold; font-size: 1.6rem !important; margin-bottom: 1.5rem; padding-left: 1.5rem; margin-right: 0; margin-top: .4rem;}
  .retailContainer .mat-dialog-content{display: block; margin: 0 0; padding: 0 0; max-height: 52vh; overflow: auto;}
  .retailContainer .mat-dialog-container{border-radius: 2.0rem; padding: 0; overflow-x: unset;}
  .retailContainer .width{width: 20%;height: 3.5rem; display: flex; border-bottom: 1 solid #f1f1f1; align-items: center;}
  .retailContainer .input-field{height: 2.7rem; padding-left: 2.3rem;cursor: pointer;}
  
  /* Mat Dialog Container */
  .mat-dialog-container {border-radius: 2rem !important;position: relative !important;;left:1.6% !important;;}
  .cdk-overlay-dark-backdrop {background: transparent !important;}
  .cdk-overlay-backdrop {background: rgba(51, 51, 51, 0.78) !important;}
  .creditDialog .cdk-global-scrollblock{top: 0 !important;}
  .retailContainer .cdk-global-scrollblock{top: 0 !important;}
  .cdk-global-scrollblock{top: 0 !important;}
  /* End of Mat Dialog Container */
  /* End of Pop Up */
  .retailContainer .padding-left{padding-left: .6rem;}
  .retailContainer .paddingzero{padding: 0 !important;}
  .retailContainer .paddingtopzero{padding-top: 0 !important;}
  .retailContainer .inputBox{position:  relative !important; top: .5rem !important;}
  .retailContainer .backgroundWhite{background: #fff !important;}
  
  /* Consignor and Consignee */
  .retailContainer .addButton{cursor: pointer !important;color: rgb(33, 110, 36) !important;width: 2.4rem !important; position: relative !important; left: 0% !important; font-size: 3.2rem !important; border: none !important; background-color: transparent !important;top: .3rem !important;}
  .retailContainer .billingdialogforbranch{position: relative !important;height: 3rem !important;padding-top: 1rem !important;margin-top: 1rem !important;}
  
  /* *****************************************************************************************************
                                            End of MSA COMPONENT 
  ****************************************************************************************************** */
  
  /* *****************************************************************************************************
                                            OPPORTUNITY COMPONENT 
  ****************************************************************************************************** */
  .retailContainer input{height: 2.7rem !important; font-size: 1.4rem;}
  .retailContainer .rightpadding{padding-right: 0;}
  /* *****************************************************************************************************
                                            END OF OPPORTUNITY COMPONENT 
  ****************************************************************************************************** */
  
  /* *****************************************************************************************************
                                            SERVICE
  ****************************************************************************************************** */
  .retailContainer .mat-form-field-appearance-outline .mat-form-field-flex{position: static !important;padding: 0 .45em 0 .45em !important;}
  .retailContainer .mat-form-field.mat-focused.mat-primary .mat-select-arrow{color: #1a1a1a !important;}
  .retailContainer .service-fonts-checkbox{font-size: 1.6rem; margin-left: 0rem !important;position: relative; top: .2rem;font-family: 'Open Sans', sans-serif !important;}
  /* *****************************************************************************************************
                                            END OF SERVICE
  ****************************************************************************************************** */
  
  /* *****************************************************************************************************
                                            RATE CAARD
  ****************************************************************************************************** */
  .rcIcon{width: 1.8rem;HEIGHT: 1.8rem;  position: relative;  top: .4rem;  margin-right: .5rem;}
  .retailContainer .rightBottom{margin-right: 1rem !important; margin-bottom: 1rem !important;}
  .retailContainer .customScrollHide{overflow: hidden !important;overflow-y: hidden !important;padding-bottom: 1rem !important;}
  .retailContainer .customScroll{max-width: 100% !important;overflow: scroll !important;overflow-y: hidden !important;}
  .retailContainer .commercialboxRed{width: 13.9rem;border-radius: .5rem !important; height: 11.2rem;margin-top: 1rem !important; box-shadow: 0 .3rem .6rem #00000029; background: #B00020 !important;cursor: pointer;}
  .retailContainer .commercialboxRed p{color: #fff; font-size: 1.2rem;}
  .retailContainer .commercialboxRed h6{color: #fff; margin-top:0; font-size: 1.6rem; font-weight: bold;}
  .retailContainer .commercialboxRed .deleteIcon1{font-size: 2.4rem !important; position: relative; left: 9rem !important; top: .4rem !important;color: #fff !important;}
  .retailContainer .flexproperty{display: flex !important;flex-wrap: wrap !important;}
  .retailContainer #tileLine{border-width: .1rem !important;border-top-color: #fff !important;position: relative;margin-top: -1rem !important;margin-left: -2rem !important;width: 11.9rem !important;}
  .retailContainer .commercialboxflex{display: flex;}
  .retailContainer .commercialbox{width: 13.9rem;border-radius: .5rem !important; height: 11.2rem; margin-top: 1.0rem; box-shadow: 0 .3rem .6rem #00000029; background: #ccc !important;}
  .retailContainer .commercialbox h6{ margin-top: 0 !important; font-size: 1.6rem !important; font-weight: bold; border-radius: .5rem;}
  .retailContainer .commercialbox p{font-size: 1.2rem;}
  .retailContainer .future_card {background: #14773e;position: absolute;margin-top: .1rem;border-radius: 3px;width: 9%;z-index: 123 !important;}
  .retailContainer .commercialbox .deleteIcon1{font-size: 2.4rem !important; color: #00000029 !important; position: relative; left: 9rem !important; top: .4rem !important;}
  .retailContainer #commercialboxdivider{position: relative; width: 7%; background-color: #27AE60; margin-top: -0.4rem; margin-left: -1.0rem; margin-left: -1.2%;border-color: #fff;border-width: .1rem !important;}
  .retailContainer .commercialbox1{width: 13.9rem; height: 11.2rem; margin-top: 1.0rem;   box-shadow: 0 .6rem .6rem #00000029;background-color: #27AE60;border-radius: .5rem;}
  .retailContainer .commercialbox1 h6{color: #fff; margin-top:0; font-size: 1.6rem; font-weight: bold;}
  .retailContainer .commercialbox1 h6.future_rc_txt{cursor: pointer;    font-size: 7px !important;    margin: 0;padding: 10px !important;color: #fff;}
  .retailContainer .commercialbox h6.future_rc_txt{
    cursor: pointer;
      font-size: 7px !important;
      margin: 0;
      padding: 10px !important;
      color: #fff;
  }
  .retailContainer .commercialbox1 h6.future_rc_txt:hover {background-color: #27AE60; color: #fff;border-radius: 3px;}
  .retailContainer .commercialbox h6.future_rc_txt:hover {background-color: #27AE60; color: #fff;border-radius: 3px;}
  .retailContainer .commercialbox1 p{color: #fff; font-size: 1.2rem;}
  .retailContainer .commercialbox1 .deleteIcon1{font-size: 2.4rem !important; position: relative; left: 9rem !important; top: .4rem !important;color: #fff !important;}
  .retailContainer .commercialbox2{width: 13.9rem; border-radius: .5rem !important; height: 11.2rem; margin-top: 1rem; box-shadow: 0 .3rem .6rem #00000029; background-color: linear-gradient(#FFFCFC, #EAEAEA);}
  .retailContainer .commercialbox2 h6{ margin-top:1.0rem; margin-top: 0 !important; font-size: 1.6rem; font-weight: bold; border-radius: .5rem;}
  .retailContainer .commercialbox2 p{font-size: 1.2rem;}
  .retailContainer .commercialbox3{width: 13.9rem;border-radius: .5rem !important; height: 11.2rem; margin-top: 1.0rem; box-shadow: 0 .3rem .6rem #00000029; background-color: #90EE90 !important;}
  .retailContainer .commercialbox3 h6{ margin-top:1.0rem; margin-top: 0 !important; font-size: 1.6rem; font-weight: bold; border-radius: .5rem;}
  .retailContainer .commercialbox3 p{font-size: 1.2rem;}
  .retailContainer #collapsedivider{border-top:.1rem solid #F1F1F1; margin-bottom: .8rem;}
  .retailContainer .zonalheading{font-size: 1.8rem; color: #1a1a1a; font-weight: bold; margin-top: 0;} 
  .retailContainer .zonalheadingheight{height: 5.4rem;}
  .retailContainer .zonalheadingbar1{font-size: 1.6rem; font-weight: 500; background-color: #F1F1F1; height: 2.3rem; display: flex;  align-items: center; justify-content: center; border:.1rem solid #fff;  box-sizing: border-box; }
  .retailContainer .radiofont{font-size: 1.4rem;}
  .retailContainer .field-background{background-color: #F1F1F1;}
  .retailContainer .flexbox{display: flex; align-items: center;margin:.2rem; width: 100%;}
  .retailContainer .Branch{width: 12%; background-color: #F1F1F1;height: 5.4rem; border-right: 1 solid #fff;display: flex; align-items: center; padding-left: .4rem;font-size: 1.5rem;}
  .retailContainer #plusicon1 {color: #27AE60; z-index: 10; font-size: 2.3rem;}#box-shadow{box-shadow: none; padding-top: 0; padding-bottom: 0; }
  .retailContainer #box-shadow{box-shadow: none; padding-top: 0; padding-bottom: 0;}
  .retailContainer #search-icon{position: absolute;top: .8rem;font-size: 1.8rem;left: 2rem;opacity: .5;color: #ccc !important;}
  .retailContainer .pincodeSearch{position: absolute;top: .5rem;font-size: 1.8rem;left: .5rem;opacity: .5;color: #ccc !important;z-index: 9999 !important;}
  .retailContainer 
  .retailContainer .green-border{border: .1rem solid #27AE60; width: 100%;}
  .retailContainer .control{position: relative;padding-left: 2.2rem;}
  .retailContainer #search-icon2{position: absolute;top: .7rem;font-size: 1.8rem;left: 2.0rem;opacity: .3; z-index: 10;}
  .retailContainer #plusicon2{color: #27AE60; position: absolute; cursor: pointer; z-index: 10; font-size: 2.4rem;box-shadow: 0 .1rem .2rem #00000029;margin-left: 3px !important;}
  .retailContainer h5 button#plusicon2{position: relative; box-shadow: none;}
  .retailContainer .right-aligned-header > .mat-content {justify-content: space-between;}
  .retailContainer .mat-content > mat-panel-title, .mat-content > mat-panel-title {flex: 0 0 auto;flex: inherit;}
  .retailContainer .mat-primary .mat-pseudo-checkbox-checked, .mat-primary .mat-pseudo-checkbox-indeterminate {  background-color: #27AE60 !important;}
  .retailContainer .mat-pseudo-checkbox{width: 1.6rem !important; height: 1.6rem !important;}
  .retailContainer #zonal-input{border: none; width: 100%;}
  .retailContainer #zonal-input::placeholder{text-align: center; color: #27AE60;}
  .retailContainer #zonal-input1{width: 100%;}
  .retailContainer #zonal-input1::placeholder{text-align: center; color: #27AE60;}
  .retailContainer .input::placeholder{font-size: 1.6rem !important;}
  .retailContainer .dropdown{ cursor: pointer;}
  .retailContainer .hoverDisplay {position: absolute;top: -3.2rem; width: 200%;right: -6.5rem;padding: 0;}  
  .retailContainer .mousehover:hover + .hoverDisplay{display: block;}
  .retailContainer .from{padding: 0 !important;}
  .retailContainer .to{padding: 0 !important;}
  .retailContainer .three{padding: 0 !important;}
  .retailContainer .flex-direction{flex-direction: column; padding: 0 !important;}
  .retailContainer .flex-box{display: flex;}
  .retailContainer .flexDir{flex-direction: column;align-items: flex-start !important;}
  .retailContainer  #left-margin{margin-left: 2.0rem !important;}
  .retailContainer .consignee-mapping{font-size: 1.8rem; font-weight: bold; padding-bottom: .5rem;}
  .retailContainer .font-size{font-size: 1.6rem; font-weight: bold;}
  .retailContainer .border-bottom{border-bottom: .1rem solid #f1f1f1 !important;padding-top: .5rem; padding-bottom: .5rem;}
  .retailContainer .paddingleftzero{padding-left: 0 !important;}
  .retailContainer .paddingrightzero{padding-right: 0 !important;}
  .retailContainer .paddingleftPincode{padding-left: 2.5rem !important; cursor:  pointer !important;}
  .retailContainer .curson-pointer{cursor: pointer;}
  .retailContainer .paddingleft9{padding-left: .9rem !important;}
  .retailContainer .paddingtop{padding-top: .5rem; padding-bottom: .5rem;}
  .retailContainer .paddingtopone{padding-top: 1rem !important;}
  .retailContainer .paddingBottom{padding-bottom: 1.8rem !important;}
  .retailContainer .naComnd{position: relative !important;top: 1rem !important;}
  .retailContainer .paddingleft1point5rem{padding-left: 1.7rem !important;}
  .retailContainer .paddingleft5rem{padding-left: 5rem !important;}
  
  .contractContainer .geoWidth{width: 10% !important;}
  .creditDialog .geoWidth{width: 10% !important;}
  
  /* base Location */ #defualtBranchSearch3{position: absolute;left: 83% !important; font-size: 1.7rem; top: .4rem;z-index: 10;color: #BCBCCB;}
  .retailContainer .margintop{margin-top: 1rem !important;}
  .retailContainer .paddingleft17{padding-left: 3.5rem !important;}
  .retailContainer .padding17left{padding-left: 1.7rem !important;}
  .retailContainer .security-provided-by{width: 97% !important; margin-left: -.5rem !important;}
  .retailContainer .paddingleftforremarks{padding-left: .3rem !important;}
  .retailContainer .margintop10{margin-top: 1rem !important;}
  .retailContainer .margintop20{margin-top: 2rem !important;}
  .retailContainer .commandmentspace{position: relative;top: 1.3rem;}
  .retailContainer .cityPanel .mat-select-panel{margin-left: 3.2rem !important;}
  .retailContainer .tableBox{padding-left: 0rem !important;padding-right: 3rem !important;margin-top: 1rem !important;width: 20rem !important;}
  .retailContainer .commandmentsection{width: 100% !important; padding-top: 10px; overflow: auto !important;}
  .retailContainer #widthzero{width: 0 !important;}
  .retailContainer .tncheading{font-size: 1.8rem; font-weight: bold;  margin-bottom: 1.5rem;}
  .retailContainer .pricingparameters{margin-top: 1.0rem; margin-bottom: 1.5rem;}
  .retailContainer .addNewButton{color: #27AE60 !important; font-size: 9.5rem !important; cursor: pointer !important; display: flex !important; justify-content: center !important;align-items: center !important;}
  .retailContainer .addNewText{ font-size: 1.6rem !important; position: relative; bottom: 1rem; left: 3.5rem; font-weight: bold;}
  .retailContainer .carton-text{position: relative !important; bottom: 3rem !important;cursor: pointer ; }
  .retailContainer .slaAddIcon{position: absolute !important;left: 0 !important;}
  
  .retailContainer .addSlab{cursor: pointer;color: #27AE60; position: absolute;top: 1rem;z-index: 10;font-size: 3.2rem;}
  .retailContainer .slabPadding{padding-top: .8rem !important;padding-right: 1rem !important;}
  .retailContainer .addButtonSlab{cursor: pointer !important;width: 2.4rem !important; font-size: 3.2rem !important; border: none !important; background: transparent !important;position: absolute !important;
    top: .8rem;}
  .creditDialog .addButtonSlab{cursor: pointer !important;width: 2.4rem !important; font-size: 3.2rem !important; border: none !important; background: transparent !important;position: absolute !important;
      top: .8rem;}
  .retailContainer .saveButton{text-align: center !important;position: relative !important;top: 1rem !important;}
  /* *****************************************************************************************************
                                           END OF RATE CAARD
  ****************************************************************************************************** */
  /*  MSA OPERATION */
  /* .heading-bar { color:#fff; font-size: 1.6rem; position: relative; right: 1.7%;width: 103.4%;}  */
  .retailContainer .heading-bar {background-color: #F1F1F1;padding:1.0rem; color:black; font-size:1.6rem;width: 100%;left: 0;} 
  .retailContainer .heading-bar2 {padding:1.0rem; color:black; font-size:1.6rem;width: 100%;left: 0;} 
  .retailContainer .height{font-size: 1.6rem; height: 4.5rem; padding-top: .5rem; padding-bottom: .5rem;  border-bottom: 1 solid #f1f1f1; display: flex; align-items: center; }
  .retailContainer .label-text{font-size: 1.6rem; font-weight: bold; padding-top: .6rem;}
  .retailContainer .label-text-value{font-size: 1.6rem; font-weight: 100; padding-top: .6rem; text-overflow: ellipsis; white-space: nowrap;}
  /* *****************************************************************************************************
                                           Document Upload
  ****************************************************************************************************** */
  .retailContainer .background{background: #F1F1F1; font-size: 1.6rem;color: #fff;}
  .retailContainer .bottom-border{border-bottom: .1rem solid #f1f1f1;}
  .retailContainer #secondry-button{background: #fff !important; color: #1a1a1a !important; border: .2rem solid #27AE60; font-weight: bold; box-sizing: border-box;}
  .retailContainer .box{opacity: 0.5; padding-top: 2.0rem; padding-bottom: 2.0rem; }
  .retailContainer .material-icons{cursor: pointer !important; }
  .retailContainer .tp-section {display: flex;align-content: center;align-items: center; height: 6.0rem;}
  .retailContainer .tp-margin {margin: 0 !important;}
  .retailContainer .mat-slide-toggle{height: 2.4rem !important;line-height: 1.8;}
  .retailContainer .mat-slide-toggle.mat-checked .mat-slide-toggle-bar{background: #27AE60 !important;}
  .retailContainer .mat-slide-toggle.mat-checked .mat-slide-toggle-thumb{background: #27AE60 !important;}
  .retailContainer .file_name{  white-space: nowrap;overflow: hidden;text-overflow: ellipsis; width: 180% !important;}
  
  /* *****************************************************************************************************
                                           END OF Document Upload
  ****************************************************************************************************** */
  
  /* *****************************************************************************************************
                                           STEPPER
  ****************************************************************************************************** */
  .retailContainer .mat-step-icon-content{display: none !important;}
  .retailContainer .stepperLine{height: .5rem !important; background-color: #27ae60; position: absolute;top: 5.1rem !important; right: 0; width: 100% !important; z-index: 1;}
  .retailContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:focus{background-color: transparent !important;}
  .retailContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header{cursor:  pointer !important;}
  .retailContainer .mat-step-header .mat-step-icon-selected{background-color: #27AE60 !important; cursor:  pointer !important;}
  .retailContainer .mat-step-header .mat-step-icon{background-color: #696969 !important;z-index: 999999 !important; cursor:  pointer !important;}
  .retailContainer .mat-step-header:hover{background-color: rgba(0,0,0,0) !important;}
  
  .retailContainer .darkGreenColorText{color: #27AE60 !important; font-weight: bold;}
  .retailContainer .roundGreyColor{background-color: #ccc !important;}
  .retailContainer .ligtGreenColor{background-color: #81C784 !important;color: #f1f1f1;padding-top: .2rem;display: flex;justify-content: center;
    align-items: center;}
  .retailContainer .darkGreenColor{background-color: #2E8B57 !important;}
  
  
  .retailContainer .mat-step-label{font-size: 1.6rem;}
  .retailContainer .mat-stepper-horizontal, .mat-stepper-vertical {background-color: #F1F1F1 !important;}
  .retailContainer .mat-horizontal-content-container {overflow: hidden; padding: 0 !important;}
  .retailContainer .mat-horizontal-stepper-header {box-sizing: border-box;  flex-direction: column-reverse !important;  height: auto;padding: 0px !important;}
  .retailContainer .mat-horizontal-stepper-header .mat-step-label {padding: 0px 0px 0px !important;}
  .retailContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before, .retailContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after{
    top: 6.8rem !important;}
  .retailContainer .mat-stepper-horizontal-line {border-top-width: 3px !important; border-color: #27AE60 !important; position: relative !important; top: 3.8rem !important;
      margin:0px !important; min-width: 8rem !important;}  
  @media only screen and (max-width: 1440px) {
        .retailContainer .mat-stepper-horizontal-line{min-width: 6rem !important;}
      }
    
  @media only screen and (max-width: 1440px) {
        .retailContainer .mat-stepper-horizontal-line{min-width: 5rem !important;}
      }
      
  @media only screen and (max-width: 1366px) {
        .retailContainer .mat-stepper-horizontal-line{min-width: 4rem !important;}
      }
  .retailContainer .mat-stepper-horizontal-line{opacity: 0;}
  .retailContainer .mat-step-icon{height: 2.4rem !important; width: 2.4rem !important;}
  .retailContainer .mat-horizontal-stepper-header-container { margin-bottom: 1% !important;}
  .stepper-label{position: relative;top: 0px; right: 0px; bottom: 0px; left: 0px;}
  /* Stepper */
  .retailContainer .mat-stepper-horizontal{font-family: 'Open Sans', sans-serif !important;}
  /* end of Stepper */
  
  #stepper{position: absolute !important; top: 13rem !important; right: 6.5rem !important;}
  
  
  
  
  
  /* .retailContainer .breadcrumb{padding: 0rem 1.5rem !important;margin-bottom: 3rem !important;border-radius: .4rem !important;}
  .retailContainer .parent{position: relative !important;}
  .retailContainer .mat-step-label{font-size: 1.6rem;}
  .retailContainer .mat-stepper-horizontal, .mat-stepper-vertical {background: #F1F1F1 !important;}
  .retailContainer .mat-horizontal-content-container {overflow: hidden; padding: 0 !important;}
  .retailContainer .mat-horizontal-stepper-header {box-sizing: border-box;  flex-direction: column-reverse !important;  height: auto;padding: 0px !important;}
  .retailContainer .mat-horizontal-stepper-header .mat-step-label {padding: 0px 0px 0px !important;}
  .retailContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before, .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after{
    top: 6.8rem !important;}
  .retailContainer .mat-stepper-horizontal-line {border-top-width: .3rem !important; border-color: #27AE60 !important; position: relative !important; top: 3.8rem !important;
      margin:0px !important; min-width: 8rem !important;}  
  
  @media only screen and (max-width: 1440px) {
        .retailContainer .mat-stepper-horizontal-line{min-width: 6rem !important;}
      }
    
  @media only screen and (max-width: 1440px) {
        .retailContainer .mat-stepper-horizontal-line{min-width: 5rem !important;}
      }
      
  @media only screen and (max-width: 1366px) {
        .retailContainer .mat-stepper-horizontal-line{min-width: 4rem !important;}
      }
  .retailContainer .mat-step-icon{height: 2.4rem !important; width: 2.4rem !important;}
  .retailContainer .mat-horizontal-stepper-header-container { margin-bottom: 1% !important;}
  .retailContainer .mat-step-header .mat-step-icon {background: #27AE60 !important;}
  .retailContainer .stepper-label{position: relative;top: 0px; right: 0px; bottom: 0px; left: 0px;}
  .retailContainer .mat-stepper-horizontal{font-family: 'Open Sans', sans-serif !important;}
  
  .retailContainer .mat-form-field-appearance-outline .mat-form-field-outline-end, .mat-form-field-appearance-outline .mat-form-field-outline-start{
    border: .1rem solid currentColor !important;}
    .retailContainer .mat-form-field-appearance-outline .mat-form-field-outline-start{display: none !important;} */
  /* *****************************************************************************************************
                                           BULK UPLOAD
  ****************************************************************************************************** */
  .retailContainer .rightalign{text-align: right; float: right; cursor: pointer;}
  .retailContainer .download-error-icon{color: #27AE60; cursor: pointer !important; font-size: 32px;}
  .retailContainer #exelLink1{position: relative;}
  /* *****************************************************************************************************
                                           END BULK UPLOAD
  ****************************************************************************************************** */
  .retailContainer label{margin-bottom: .5rem !important;}
  .retailContainer .margin-span-left{margin-left: -.5rem !important;}
  
  /* *****************************************************************************************************
                                           BILLING
  ****************************************************************************************************** */
  .retailContainer .positionTop{position:  relative !important; top: .5rem !important;}
  .retailContainer .billingby-container {width: 134rem !important;overflow-y: hidden;overflow-x: auto !important;min-height: 14rem !important; margin-top: 1rem !important; autobar-color: #27ae60 #27ae60; autobar-width: thin;}
  .retailContainer .billingby-container .mat-form-field {width: 16rem !important; margin-right: 3rem !important;}
  .retailContainer .billingby-container::-webkit-autobar {height: 1.5rem !important;cursor:  pointer;}
  .retailContainer .billingby-container::-webkit-autobar-track{background: #EBEBF2;}
  .billingby-container::-webkit-autobar-thumb{background: #6A6868 !important; width: .5rem !important;border-radius: 1rem !important;}
  .billingby-container::-webkit-autobar-thumb:hover{background: #585757 !important;}
  .retailContainer #billingSearch{position: absolute;top: .4rem !important; left: .3rem !important; color: #ccc !important; font-size: 1.9rem !important; cursor:  pointer !important;}
  .retailContainer .plusIcon{color: #27AE60; font-size: 4rem; cursor: pointer;position: relative;bottom: .4rem;}
  /* Billing */
  
  
  /* Required Message Style */
  .retailContainer .hasErrorMsgCom {top: 2.3rem; color: red !important;margin-bottom: 0px;width: 25rem !important;text-align: left !important;margin-top: 0px !important;position: absolute !important; left: 1.5rem}
  .retailContainer .commandmentError {color: red !important;}
  .retailContainer .stateError{color: red !important;
    width: 25rem !important;
    position: absolute !important;
    top: 3rem;
    text-align: center !important;}
  
  .retailContainer .hasErrorMsg {color: red !important;margin-bottom: -3px;width: 25rem !important;text-align: left !important;margin-top: 0px !important;position: absolute !important;margin-left: 12px;}
  .retailContainer .marginBilling {margin-bottom: .8rem !important;}
  .retailContainer .marginBottom{margin-bottom: 1.5rem !important;}
  .retailContainer .paddingbottomone{padding-bottom: 1rem !important;}
  .retailContainer .hasErrorMsgRight {color: red !important;position: relative !important;bottom: 0.4rem !important;}
  .retailContainer .hasErrorMsgRightupload {color: red !important;position: relative !important;bottom: 3.5rem !important;left: 1rem;}
  .retailContainer .hasErrorMsgRightSide {color: red; position: absolute; bottom: 1rem;}
  .retailContainer .hasErrorMsgTopSide {color: red; position: absolute; top: 2rem; text-align: left}  
  .cdk-keyboard-focused {outline: 1px solid #27AE60 !important;}
  .retailContainer .close_button{position: absolute; top: -10px; border: 0; right: 0; background: #fff;}
  .retailContainer .Preclose_button{position: relative; top: 0; border: 0; background: #fff;left:4rm;top:-1rem}
  .creditContainer .Preclose_button{position: relative; top: 0; border: 0; background: #fff;left:4rm;top:-1rem}
  .Preclose_button{position: relative; top: 0; border: 0; background: #fff;left:4rm;top:-1rem}
  .retailContainer .preview_print_button{display: flex;align-items: center;}
  .retailContainer .preview_print_button:hover{color: #27AE60 !important; text-decoration: none !important;}
  .retailContainer .preview_print_button:focus{color: #27AE60 !important; text-decoration: none !important;}
  .retailContainer .close_button .fa-times{position: relative; top: 0; right: 0;}
  .retailContainer .pincode_auto{max-height: 50rem; overflow-y: auto;}
  .branch_sec input[type='radio']:after {
    position: relative;
    content: '';
    display: inline-block;
    visibility: visible;
  }
  
  .branch_sec input[type='radio']:checked:after {
    width: 9px;
    height: 9px;
    border-radius: 15px;
    top: 9.28px;
    left: 12.7px;
    position: absolute;
    background-color: #27ae60;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid #27ae60;
  }
  .ng-dropdown-panel.creditNgDropdown .auto-host{max-height: 32rem !important; overflow-y: auto;}
  .mat-option{padding: 0 6px !important; font-family: 'Open Sans', sans-serif !important;}
  .retailContainer .mat-pseudo-checkbox-checked::after{top: 0px !important; left: 0px !important; width: 6px !important;}
  /* credit select */
  .mat-select-panel.creditSelect {
    max-height: 25rem !important;
    overflow-y: auto !important;
    min-width: calc(100% + 11px) !important;
    width: calc(100% + 12px) !important;
    top: 3.2rem !important;
    margin-top: 0rem !important;
    left: 1.5rem !important;
    box-shadow: none !important;
    position: absolute !important;
    border: .1rem solid #6A6868 !important;
    border-radius: .2rem !important;
  }
  .mat-select-panel.creditSelect2 {
    max-height: 25rem !important;
    overflow-y: auto !important;
    min-width: calc(100% + 11px) !important;
    width: calc(100% + 12px) !important;
    top: 2rem !important;
    margin-top: 0rem !important;
    left: 1.5rem !important;
    box-shadow: none !important;
    position: absolute !important;
    border: .1rem solid #6A6868 !important;
    border-radius: .2rem !important;
  }
  .mat-select-panel.creditSelect.state_dropdown:not([class*=mat-elevation-z]) { box-shadow: none !important;position: absolute !important;top: -31rem !important;left: -1rem !important;  border: .1rem solid #ccc !important;}
  .mat-primary.creditSelect .mat-option:hover.mat-selected:not(.mat-option-disabled) {color: #fff !important; background: #27AE60 !important;}
  /* For dropdown setting */
  .mat-select-panel.creditSelect:hover .mat-active{background: transparent !important;color: #1a1a1a !important;}
  .mat-option:hover .mat-active{background: #27AE60 !important; color: #1a1a1a !important;}
  .creditSelect .mat-option.mat-active:hover{background: #27AE60 !important; color: #fff !important;}
  .creditSelect .cdk-overlay-backdrop{background: transparent !important;}
  .cdk-overlay-backdrop.creditSelect{background: transparent !important;}
  .creditSelect .mat-option.mat-active{background: #27AE60 !important; color: #fff !important}
  .mat-option:hover .mat-active{background: #27AE60 !important; color: #1a1a1a !important;}
  .creditSelect .mat-option.mat-active:hover{background: #27AE60 !important; color: #fff !important;}
  
  .mat-select-panel.creditSelect2.state_dropdown:not([class*=mat-elevation-z]) { box-shadow: none !important;position: absolute !important;top: -31rem !important;left: -1rem !important;  border: .1rem solid #ccc !important;}
  .mat-primary.creditSelect2 .mat-option:hover.mat-selected:not(.mat-option-disabled) {color: #fff !important; background: #27AE60 !important;}
  /* For dropdown setting */
  .mat-select-panel.creditSelect2:hover .mat-active{background: transparent !important;color: #1a1a1a !important;}
  .mat-option:hover .mat-active{background: #27AE60 !important; color: #1a1a1a !important;}
  .creditSelect2 .mat-option.mat-active:hover{background: #27AE60 !important; color: #fff !important;}
  .creditSelect2 .cdk-overlay-backdrop{background: transparent !important;}
  .cdk-overlay-backdrop.creditSelect2{background: transparent !important;}
  .creditSelect2 .mat-option.mat-active{background: #27AE60 !important; color: #fff !important}
  .mat-option:hover .mat-active{background: #27AE60 !important; color: #1a1a1a !important;}
  .creditSelect2 .mat-option.mat-active:hover{background: #27AE60 !important; color: #fff !important;}
  .mat-option:focus:not(.mat-option-disabled), .mat-option:hover:not(.mat-option-disabled) {
    background-color: #27ae60 !important;
    color: #ffffff !important;
  }
  .creditDialog .mat-select {
    height: 3rem !important;
    top: -0.4rem !important;
  }
  .creditDialog .mat-select-placeholder {
    position: relative !important;
    top: -.2rem !important;}
  /* End of dropdown setting */
  
  /* credit select end */
  /* ngDropdown */
  .ng-dropdown-panel.creditNgDropdown .scroll-host{max-height: 32rem !important; overflow-y: auto;}
  .ng-dropdown-panel.creditNgDropdown .ng-dropdown-panel-items .ng-option.ng-option-marked {background:#27AE60 !important;color: #fff;}
  .ng-dropdown-panel.creditNgDropdown .ng-dropdown-panel-items .ng-option {font-size: 1.4rem !important; padding: .2rem 1.0rem !important;background: #fff !important;}
  .ng-dropdown-panel.creditNgDropdown .ng-dropdown-panel-items .ng-option.ng-option-selected .ng-option-label, .ng-dropdown-panel.creditNgDropdown .ng-dropdown-panel-items .ng-option.ng-option-selected.ng-option-marked .ng-option-label {
    font-weight: normal !important ;}
  .ng-dropdown-panel.creditNgDropdown.ng-select-bottom{border: .1rem solid #6A6868 !important; border-radius: .2rem !important;z-index: 876459478964578 !important;}
  
  /* End of ngDropdown */
  
  
  .retailContainer .h3HeadingStyle{margin-top: 1.5rem !important;}
  .retailContainer .h3heading{margin-top: 3rem !important;position: relative !important;left: 4% !important;font-weight: bold !important}
  .retailContainer .h3heading{margin-top: 3rem !important;position: relative !important;left: 4% !important;font-weight: bold !important}
  .retailContainer .pincode_input{padding-left: 1.6rem;background:  transparent;color: #1a1a1a !important;}
  .retailContainer .redMark{color: red;}
  .retailContainer .mat-error{margin-top: -8px;}
  .retailContainer .tncflcerror{margin-top: 0rem !important;}
  .retailContainer .state_dialog .fa-times{top: 0rem}
  .retailContainer .state_dialog{position: relative} 
  .retailContainer .autoable_table{overflow-x: auto;max-height: 28rem !important; min-height: 10rem !important; overflow-y: auto !important;}
  .retailContainer .slab_dialog{padding: 15px;}
  .retailContainer .mrgn_btm_2rem{margin-bottom: 2rem}
  .retailContainer input:-webkit-autofill,
  .retailContainer input:-webkit-autofill:hover, 
  .retailContainer input:-webkit-autofill:focus,
  .retailContainer textarea:-webkit-autofill,
  .retailContainer textarea:-webkit-autofill:hover,
  .retailContainer textarea:-webkit-autofill:focus,
  .retailContainer select:-webkit-autofill,
  .retailContainer select:-webkit-autofill:hover,
  .retailContainer select:-webkit-autofill:focus {
    -webkit-text-fill-color: #555 !important;
    -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
    transition: background 5000s ease-in-out 0s !important;
  }
  .retailContainer h6.future_rc_txt {cursor: pointer;font-size: 7px !important;margin: 0;padding: 10px !important; color:#fff}
  .retailContainer h6.future_rc_txt:hover {cursor: pointer;font-size: 7px !important;margin: 0;padding: 10px !important;background-color: #27AE60; color:#fff}
  .retailContainer .future_card {background:#14773e;position: absolute;margin-top: .1rem;border-radius: 3px;width: 9%;z-index: 123 !important;}
  .mat-datepicker-toggle-active{color: #27AE60 !important;}
  .mat-datepicker-content .mat-calendar.creditDatepicker{width: 29.6rem !important; height: 35.4rem !important;}
  .mat-datepicker-toggle .mat-icon-button {top: 0rem !important; border-radius: 0 !important;}
  .creditDatepicker .mat-calendar-body-selected{background: #27AE60 !important;}
  .creditDatepicker td.mat-calendar-body-cell {font-size: 1.5rem;line-height: 2rem; padding: 1.8rem 0 !important;}
  .creditDatepicker thead.mat-calendar-table-header tr th {background: #f1f1f1; color: #1a1a1a; font-weight: bold; font-size: 1.6rem;}
  .retailContainer .required_move_rgt{margin-left: 4rem; margin-top: -0.4rem}
  .retailContainer .sfx_dialog img{width: 64px;}
  
  .retailContainer .mat-select-panel.state_dropdown:not([class*=mat-elevation-z]) { box-shadow: none !important;position: absolute !important;top: -31rem !important;left: -1rem !important;  border: .1rem solid #ccc !important;}
  .retailContainer .mat-datepicker-toggle-active{color: none !important;}
  .retailContainer .mat-datepicker-content .mat-calendar{width: 29.6rem !important; height: 35.4rem !important;}
  .retailContainer .mat-datepicker-toggle .mat-icon-button {top: 0rem !important; border-radius: 0 !important;}
  /* Required Message Style */
  .retailContainer .mat-icon-button[disabled] .material-icons{
    cursor: not-allowed !important;
    opacity: 0.4;
  }
  .retailContainer .removeIcon {
    color: #27AE60;
    display: block;
    cursor: pointer;
    font-size: 2.4rem;
  }
  .retailContainer .heading_bold{font-weight: 700;}
  .retailContainer .to_upper_case{text-transform: uppercase;}
  .retailContainer .card_minor_text{
    line-height: 2rem;
    margin: 0.4rem 0 0 0;
    width: 85px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  /* .retailContainer .slab_width{width: 9rem !important; padding: 0 5px !important;} */
  .retailContainer .slab_width1{width: 16rem !important; padding: 0 5px !important;}
  .retailContainer .customauto{max-width: 100% !important;overflow: auto !important;overflow-y: hidden !important;}
  .retailContainer .customautoHide{overflow: hidden !important;overflow-y: hidden !important;padding-bottom: 1rem !important;}
  .retailContainer .customeRemoveIcon{cursor: pointer; position: relative !important; bottom: .3rem !important;color: #27AE60 !important; display: flex !important;justify-content: center !important;}
  
  .retailContainer .customeWidth{width: 125% !important;height: 5rem !important}
  .retailContainer .customeMaxWidth{width: fit-content !important;}
  .slab_width{width: 9rem !important; padding: 0 5px !important;}
  
  @media only screen and (max-width: 2156px){
    .retailContainer .billingby-container {width: 201rem !important;}
  }
  @media only screen and (max-width: 1872px){
    .retailContainer .billingby-container {width: 198rem !important;}
  }
  @media only screen and (max-width: 1468px){
    .retailContainer .billingby-container {width: 154rem !important;}
  }
  @media only screen and (max-width: 1283px){
    .retailContainer .billingby-container {width: 134rem !important;}
  }
  @media only screen and (max-width: 1235px){
    .retailContainer .billingby-container {width: 120rem !important;}
  }
  @media only screen and (max-width: 1158px){
    .retailContainer .billingby-container {width: 154rem !important;}
  }
  @media only screen and (max-width: 1022px){
    .retailContainer .billingby-container {width: 106rem !important;}
  }
  @media only screen and (max-width: 984px){
    .retailContainer .billingby-container {width: 103rem !important;}
  }
  @media only screen and (max-width: 824px){
    .retailContainer .billingby-container {width: 84rem !important;}
  }
  @media only screen and (max-width: 655px){
    .retailContainer .billingby-container {width: 66rem !important;}
  }
  @media only screen and (max-width: 576px){
    .retailContainer .billingby-container {width: 57rem !important;}
  }
  @media only screen and (max-width: 477px){
    .retailContainer .billingby-container {width: 47rem !important;}
  }
  @media only screen and (max-width: 371px){
    .retailContainer .billingby-container {width: 36rem !important;}
  }
  
  
  @media only screen and (max-width: 268px) {
    .retailContainer .billingby-container {width: 24rem !important;}
  }
  
  /* *****************************************************************************************************
                                           Preview
  ****************************************************************************************************** */
 .retailContainer .leftSpace{margin-top: 2rem !important; padding-left: 1.3rem !important;}
 .retailContainer .leftSpace1{margin-top: 0rem !important;padding-left: 1.3rem !important;}
  .retailContainer .fontZizePreview{font-size: 1.3rem !important;}
  .retailContainer .borderLeftRight{border-left: .2rem solid #fff!important;border-right: .2rem solid #fff!important;
    overflow-wrap: break-word!important;padding-left: .8rem!important;}
  .retailContainer .printButton{cursor: pointer !important;color: rgb(33, 110, 36), !important;width: 2.4rem !important; left: 0% !important;font-size: 3.2rem !important; border: none !important; background: transparent !important;position: relative !important;
    top: .3rem !important;}
  .retailContainer .msaBox{background:  #515457 !important;width: 4% !important;height: 3.2rem !important;}
  .retailContainer .grey_td{background: #b8b7b7 !important; color: #000 !important;word-break: break-all;}
  .retailContainer .green_th{background: #27AE60 !important; color: #000 !important; font-weight: 600;word-break: break-word;font-size: 1.6rem;}
  .retailContainer .printBar{height: 8rem;box-shadow: 0 11px 6px -7px #ccc;position: sticky;background: #fff !important;z-index: 1;top: 6.4rem;
    left: 6.7rem;width: 100%;overflow: hidden;}
  .retailContainer .previewHeading{width: 100%;background: #fff !important;margin-top: 1.5rem !important;}
  .retailContainer .previewHeading2{margin-top: 2%;width: 84%;margin-left: 8%;background: #fff !important;}
  .retailContainer .barContent{padding: 1rem 2rem !important; font-size: 2.4rem !important;}
  .retailContainer .msaBox{background:  #515457 !important;width: 4% !important;height: 3.2rem !important;}
  .retailContainer .leftSpace{margin-top: 2rem !important; padding-left: 1.3rem !important;}
  .retailContainer .leftSpace1{margin-top: 0rem !important;padding-left: 1.3rem !important;}
  .retailContainer .text-heading{font-size: 1.8rem;border-bottom: .2rem solid #fff;display: flex;align-items: center;padding-right: 0 !important;min-height: 6.6rem !important;}
  .retailContainer .text-heading-bar{background: #b8b7b7;font-size: 1.8rem; border-left: .2rem solid #fff;
    border-bottom: .2rem solid #fff;display: flex;align-items: center;min-height: 6.6rem !important;}
  .retailContainer .text-align{text-align: right;}
  .retailContainer .heading{font-size: 2.1rem;font-weight: bold;}
  .retailContainer .zoal-rate-heading{border: .2rem solid #fff;display: flex; align-items: center; text-align: left; color: #fff;font-size: 1.5rem; font-weight: bold;}
  .retailContainer .zoal-rate-content{background: #f1f1f1;border: .2rem solid #fff;padding-left: .5rem !important; padding-right: 1.5rem !important;
      display: flex; align-items: center; text-align: left; font-size: 1.5rem; word-wrap: break-word;}
  .retailContainer .zoal-rate-content1{background: #f1f1f1;border: .2rem solid #fff;padding-left: .5rem !important; padding-right: 1.5rem !important;
        display: block; align-items: center; text-align: left; font-size: 1.5rem; word-wrap: break-word;}
   .retailContainer .btn1 {background: #27AE60; border-radius: 2rem 2rem 2rem 2rem;font-size: 1.6rem;color:#fff}
   .retailContainer .btn1:not([disabled]):hover {background: rgb(18, 107, 55) !important; color: #fff; }
   .retailContainer .contentheight{min-height: 6.6rem !important;}
   .flex-box{display: flex; }
  
   .retailContainer .tableBox{padding-left: 0rem !important;padding-right: 3rem !important;margin-top: 1rem !important;width: 20rem !important;}
  .creditDialog .tableBox{padding-left: 0rem !important;padding-right: 3rem !important;margin-top: 1rem !important;width: 20rem !important;}
  .creditDialog.mat-form-field .date_picker.mat-input-element {
    margin-top: 0rem !important;
  }
  .expiryDate .creditDialog.mat-form-field .date_picker.mat-input-element {
    margin-top: 0rem !important;
  }
  .retailContainer .btn1:disabled{cursor: not-allowed !important;background: #81C784;}
  /** CSS FOR Paginator Starts HERE **/  
  .retailContainer .filter{position:  relative !important;margin-top: 0 !important;top: 1rem !important; }
  .retailContainer #dashboard-search{position: absolute !important;top: .4rem !important;color: #ccc !important;}
  .retailContainer .banner-input1{width: 100%;padding-left: 2.8rem !important; font-size: 1.6rem !important;height: 2.7rem !important;border: none !important;outline: none !important;}
  .retailContainer .banner-input1::placeholder {color: #6A6868; font-size: 1.4rem; font-weight: 400; opacity: 0.5;}
  .retailContainer .mat-paginator-page-size-select{margin: .6rem .4rem 0 .4rem !important;  width: 5rem !important;}
  .retailContainer .mat-paginator-page-size-label {margin: 0 0 !important;position: relative !important;bottom: 1rem !important;right: 1rem !important;}
  .retailContainer .mat-paginator-icon {width: 2.8rem !important;}
  .paginator .mat-form-field{width: 6rem !important;}
  .paginator .mat-form-field-appearance-legacy .mat-form-field-underline{height: .1rem !important;width: 6rem !important;}
  .paginator .mat-select-value{width: 60% !important;}
  .paginator .mat-primary .mat-option.mat-selected:not(.mat-option-disabled){color: #fff !important;}
  .paginator .mat-option.mat-selected:not(.mat-option-multiple){background: #27AE60 !important;}
  .paginator .cdk-overlay-pane{top: 2rem !important;}
  .mat-select-panel{margin-top: 3.5rem !important;}
  
  /* DATA TABLE FILTER */
  /* .filter{margin-top: 1.5rem !important;margin-bottom: 1.5rem !important} */
  .retailContainer td.mat-cell{
    position: relative;padding: 0 5px;
  }
  .retailContainer .pincodefont{    font-size: 1.6rem !important; font-weight: bold;}
  .retailContainer .mat-primary .mat-option.mat-selected:not(.mat-option-disabled){color: #1a1a1a !important;}
  .retailContainer .mat-option:hover:not(.mat-option-disabled){background-color: #27AE60 !important; color: #fff !important}
  .retailContainer .mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple){background-color: #247d4a !important; color: #fff !important ; font-weight: bold }
  .retailContainer .mat-option.mat-active{background-color: #27AE60 !important; color: #fff !important}
  
  /* .mat-primary.creditSelect .mat-option:hover.mat-option.mat-active{background: transparent !important;} */
  
  /* .msaCreationValidation{position: absolute !important;bottom: 1.2rem !important;} */
  .retailContainer .msaMatExpBar{font-size: 1.6rem !important; font-weight: bold;}
  
  .retailContainer .errorText{display: block !important;text-align: left !important;font-size: 1.4rem !important;font-weight: normal !important;}
  .retailContainer .blinkMessage{position: -webkit-sticky !important; position: sticky !important;font-size: 1.6rem !important; top: 6.5rem !important;z-index: 99999 !important;width: 100% !important;text-align: center !important;}
  .retailContainer .alert{padding: 1rem !important;margin-bottom: 2rem !important;border: .1rem solid transparent !important;border-radius: .4rem !important;}
  .retailContainer .alert-dismissible .close {top: -2px;right:1rem !important;}
  .retailContainer .ng-placeholder{color: #6A6868 !important; opacity: .8 !important; padding-left: 1rem !important;position: relative !important;bottom: 0.3rem !important;}
  .retailContainer .blinking{
    animation: mymove 1s infinite;
    -webkit-animation: mymove 1s infinite alternate linear;
  }
  @keyframes mymove {
    from {background:#dff0d8;color: #1a1a1a;}
    to {background:transparent; color: transparent;}
  }
  .retailContainer .blink-text{animation: textMove 3s infinite;animation-direction: alternate-reverse;color: #1a1a1a !important;}
  @keyframes textMove{
    from{color: #1a1a1a !important;}
    to{color: transparent !important;}
  }
  
  /* DATA TABLE FILTER */
  .retailContainer .filter{
    margin-top: 15px;
    margin-bottom: 15px;
  }
  
  .retailContainer .highlight {
    background: yellow  !important;
    color: black;
  }
  .retailContainer .fontWeight{font-weight: bold !important;font-family: 'Open Sans', sans-serif !important;}
  .retailContainer .selectValidation{display: block !important; position: relative !important; bottom: 1rem !important;}
  
  /* mat-option */
  /* .cdk-overlay-pane {min-width: 14.2rem !important;top: 39.3rem !important;left: 49rem !important;} */
  .retailContainer .commandmentValidation{display: block !important;position: relative !important;height: 1.8rem !important;top: -.3rem !important;}
  .retailContainer .commercialButton{
    height: 2.3rem !important;
    font-size: 1.6rem !important;
    background: #27AE60 !important;
    border-radius: .4rem !important;
    padding: 0 !important;
    padding-left: 2.2rem !important;
    padding-right: 2.2rem !important;}
  
  
    .retailContainer .confirmationButton{margin-bottom: 2.5rem !important;margin-top: 1.5rem !important;}
    .retailContainer .marginLeft{margin-left: .5rem !important;}
    .retailContainer .marginleftexclude{margin-left: 1.5rem !important;}
    .retailContainer .marginRight{margin-right: .5rem !important;}
    .retailContainer .exprity{width: 14rem !important; position: relative !important;top: 0rem !important;}
    .retailContainer .docUpload{box-shadow: none !important;padding: 0 !important;font-weight: 600 !important;font-size: 1.4rem !important;}
    .retailContainer .docToggle{position: relative !important;top: .4rem !important;left: 1rem !important;cursor:  pointer !important;}
    .retailContainer .cdk-overlay-pane{transform: none !important;}
  
  /* *****************************************************************************************************
                                           STEPPER
  ****************************************************************************************************** */
  .retailContainer .mat-step-icon-content{display: none !important;}
  .retailContainer .stepperLine{height: .5rem !important; background: #27AE60; position: absolute;top: 5rem !important; right: 0; width: 100% !important; z-index: 1;}
  .retailContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:focus{background: transparent !important;}
  .retailContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header{cursor:  pointer !important;}
  .retailContainer .mat-step-header .mat-step-icon-selected{background: #27AE60 !important; cursor:  pointer !important;}
  .retailContainer .mat-step-header .mat-step-icon{background: #696969 !important;z-index: 999999 !important; cursor:  pointer !important;}
  .retailContainer .mat-step-header:hover{background: rgba(0,0,0,0) !important;}
  
  
  .retailContainer .mat-step-label{font-size: 1.6rem;}
  .retailContainer .mat-stepper-horizontal, .mat-stepper-vertical {background: #F1F1F1 !important;}
  .retailContainer .mat-horizontal-content-container {overflow: hidden; padding: 0 !important;}
  .retailContainer .mat-horizontal-stepper-header {box-sizing: border-box;  flex-direction: column-reverse !important;  height: auto;padding: 0px !important;}
  .retailContainer .mat-horizontal-stepper-header .mat-step-label {padding: 0px 0px 0px !important;}
  .retailContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before, .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after{
    top: 6.8rem !important;}
  .retailContainer .mat-stepper-horizontal-line {border-top-width: 3px !important; border-color: #27AE60 !important; position: relative !important; top: 3.8rem !important;
      margin:0px !important; min-width: 8rem !important;}  
  @media only screen and (max-width: 1440px) {
        .retailContainer .mat-stepper-horizontal-line{min-width: 6rem !important;}
      }
    
  @media only screen and (max-width: 1440px) {
        .retailContainer .mat-stepper-horizontal-line{min-width: 5rem !important;}
      }
      
  @media only screen and (max-width: 1366px) {
        .retailContainer .mat-stepper-horizontal-line{min-width: 4rem !important;}
      }
  .retailContainer .mat-stepper-horizontal-line{opacity: 0;}
  .retailContainer .mat-step-icon{height: 2.4rem !important; width: 2.4rem !important;}
  .retailContainer .mat-horizontal-stepper-header-container { margin-bottom: 1% !important;}
  .retailContainer .stepper-label{position: relative;top: 0px; right: 0px; bottom: 0px; left: 0px;}
  /* Stepper */
  .retailContainer .mat-stepper-horizontal{font-family: 'Open Sans', sans-serif !important;}/* end of Stepper */
  
  /* .retailContainer #stepper{position: absolute !important; top: 0rem !important; right: 2rem !important;} */
  .retailContainer .mat-form-field-appearance-outline .mat-form-field-outline-end, .mat-form-field-appearance-outline .mat-form-field-outline-start{
    border: .1rem solid currentColor !important;}
    .retailContainer .mat-form-field-appearance-outline .mat-form-field-outline-start{display: none !important;}
  .mat-select-value-text {font-size: 1.6rem}
  
  .retailContainer .mat-step-icon .mat-icon,   .mat-step-icon-content {
    z-index: 99;
  }
  .creditDatepicker .mat-calendar-controls .mat-icon-button{width: 5.5rem !important; height: 5.5rem !important;}
    .retailContainer .biilingTable{width: 206rem !important;}
  
    .retailContainer .bilingConsinee{min-height: 4.5rem !important;display: flex;align-items: center;font-size: 1.6rem !important;}
    .retailContainer .billingFonts{font-size: 1.8rem !important;}
    
  
  * {
    outline: none;
    color-adjust: exact;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  @media print{
    .marginZonal{margin-left: 0 !important;}
    .viewHeading{position: relative;left: 3.5%;margin-top: 3rem !important;}
    .geoWidth{width: 10% !important;}
    .leftPrint{position:relative !important; left: -5% !important;}
    .h3Margin{margin-left: 0 !important;}
    .h3HeadingStyle{margin-left: 0 !important;}
    .commercialLeft{position: relative !important; left: -2% !important;margin-top: 2rem}
    .marginZonL{margin-left: -10% !important;}
    .mat-expansion-panel-body{padding: 0 !important;}
    .zoal-rate-content{min-height: 8rem !important;}
    .flex1{flex: 1 !important;}
    .flex2{flex: 2 !important;}
    .flex3{flex: 3 !important;}
    .flex4{flex: 4 !important;}
    .green_th{background: #27AE60 !important; color: #000 !important; font-weight: 600; font-size: 1.5rem;word-break: break-all !important;}
    .grey_td{background: #b8b7b7 !important; color: #000 !important;word-break: break-all !important;}
    .prev_width {width: 11% !important;}
    .highlight {background: yellow  !important;color: black;}
    .text-heading-bar{background: #b8b7b7 !important;word-break: break-all !important;}
    .borderLeftRight{border-left: .2rem solid #fff !important;border-right: .2rem solid #fff !important;}
    .smallPrint{left: 0 !important;}.green_th{background: #27AE60 !important; color: #000 !important; font-weight: 600; font-size: 1.5rem;word-break: break-all !important;}
    .retailContainer .mat-expansion-panel-content
  {
    overflow: visible !important;
    display: block !important;
    visibility: visible !important;
    height: inherit !important;
  }
  .creditDialog .barContent.green_th{background: #27AE60 !important;color: #111 !important;}
  .creditDialog .marginSpanR{margin-left: 1.5rem !important}
  .creditDialog .green_th{background: #27AE60 !important; color: #000 !important; font-weight: 600; font-size: 1.5rem;}
  }
  .retailContainer .commercialSlab-container {width: 160rem !important;}
  
  /******* Stepper CSS ********/
  
  .retailContainer .mat-stepper-horizontal, .mat-stepper-vertical {position: relative;}
  .retailContainer .mat-stepper-horizontal-line.ng-tns-c19-3.ng-star-inserted {opacity: 0;}
  .retailContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-label {display: flex  !important;
    flex-direction: column !important;justify-content: center;align-items: center !important;align-content: center !important;}
  .retailContainer .marginzero{margin: 0 !important;}
  .retailContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-icon{display: none !important;}
  .retailContainer .round{width: 15px;height: 15px;border-radius: 50%; z-index: 4; background: #6d6d6d;box-shadow: 0px -1px 5px #CCC;}
  
  .retailContainer .whiteRound{position: relative;top: -.4rem;z-index: 1;width: 18px;height: 18px;background: white;
    border-radius: 50%;display: flex;text-align: center;align-items: center;box-shadow: 1px 1px 1px #ccc;justify-content: center}
  .retailContainer .whiteRound .fa{font: normal normal normal 10px/.5 FontAwesome !important;}
  
  /******* Stepper CSS ********/
  
  
  /* ============================
  Advance Search ================ */
  .retailContainer .branch_auto{max-width: 99rem;overflow: auto;max-height: 22rem !important;}
  .retailContainer .removeRowMargin{margin-left: 0 !important; margin-right: 0 !important;}
  .retailContainer .branchfonts{font-size: 1.6rem !important;}
  
  /*********** DIalog CSS ************/
  .overflow::-webkit-autobar {width: .7rem;}
  .overflow::-webkit-autobar-track {display: none;}
  .overflow::-webkit-autobar-thumb {background: #6A6868 !important;}
  .overflow::-webkit-autobar-thumb:hover {background: #585757 !important;}
  /* end of mat table */
  
  
  .mat-select-panel .mat-optgroup-label, .mat-select-panel .mat-option {
    font-family: "Open Sans",sans-serif !important;
  }
  .retailContainer .srch_bill_icon{top:-0.3rem !important; left: -0.3rem !important;}
  /*********** DIalog CSS ************/
  
  .mat_ngx_select_search {
    font-size: 2rem;
    position: absolute;
    top: 0.4rem;
    font-size: 2rem !important;
    left: 0;
  }
  .mat-select-search-input {padding: 0px 4px 0px 14px !important; font-family: 'Open Sans', sans-serif !important; font-size: 1.4rem !important; text-transform: uppercase !important;}
  .mat-select-search-clear.mat-icon-button{width: 20px !important; height: 20px !important;}
  .mat-select-search-clear.mat-icon-button .mat-icon{font-size: 2rem !important; line-height: 10px !important}
  .mat-select-panel.creditNgxSelect{
    max-height: 25rem !important;
    overflow-y: auto !important;
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
  .mat-option-text{font-size: 1.4rem; text-transform: uppercase !important; font-family: 'Open Sans', sans-serif !important;}
  
  
  
  
  
  
  
  
  /* Browser support code start */
  
  
  @-moz-document url-prefix(){
    .retailContainer .mat-input-element.date_picker {
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
    .retailContainer .mat-input-element.date_picker {
      margin-top: -2rem !important;
    }
  
    .retailContainer .mat-form-field-appearance-outline .mat-form-field-suffix {
      top: -2rem !important;
    }
    .retailContainer .mat-select-placeholder {
      font-size: 1.6rem;
    }
  
    .retailContainer .mat-select-value-text {
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
    .retailContainer .mat-cell .hasErrorMsg {position: relative !important}

  
  }
  
  
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    /* IE10+ CSS styles go here */
    /** IE 11 fixes */
    .cdk-overlay-pane {
      display: block;
    }
    body{background: #f2f2f2;}
    .cdk-overlay-connected-position-bounding-box .cdk-overlay-pane .mat-select-panel.ng-animating {display: block !important;}
    .mat-paginator, .mat-paginator-page-size .mat-select-trigger {  padding-top: 8px!important;  }
  
    .inputfield3{
      padding-top: 0.2rem;
    }
    .retailContainer #plusicon{
      top:-.2rem;
    }
  
    .pincode_input{
      color:rgba(106, 104, 104, 1)
    }
    .retailContainer .inputBox{
      line-height: 0;
    }
    .mat-datepicker-toggle .mat-icon-button{
      top:1.8rem !important;
    }
    .retailContainer .mat-input-element.date_picker{
      margin-top:-1.6rem !important;
    } 
  
    .retailContainer .mat-form-field-appearance-outline .mat-form-field-suffix{
      top:-4rem !important;
    }
  
    .cdk-overlay-container {
      z-index: 2147483647!important;
    }
  
    .retailContainer .inputBox .mat-select-value-text{
      top:0.4rem;
    }
    .mat-select-value{
      overflow:visible!important;
    }
    .slaAddIcon{ margin-top:-2rem;  } 
    .slaAddIcon.two{line-height: 24px;margin-left: 8px;margin-top: -2rem;}
     .retailContainer .rateCardDetail  .label-text-value{height: 5rem;}
    .retailContainer .hasErrorMsg {color: red !important;width: 14rem !important; position: relative !important; top: -1rem;}
    .retailContainer .marginBilling {margin-bottom: 0rem !important;} 
    .retailContainer .marginBilling.hasErrorMsg{bottom:6px!important;margin:0!important}
  
    .creditDatepicker td.mat-calendar-body-cell {font-size: 1.5rem!important;line-height: 1rem!important;padding: 1.4rem 0 !important;}
  
    
  }
  /* for Edge 12+ CSS */
  @supports (-ms-accelerator:true) {   
    .mat-datepicker-toggle .mat-icon-button { top: 0 !important; }
  }
  
  /* for edge */
  @supports (-ms-ime-align: auto) {
      .retailContainer .mat-input-element.date_picker{
          margin-top:-0.6rem !important;
          font-size:1.3rem;
      } 
        
      body{background: #f3f3f3;}
      .mat-select-value{overflow:auto; }
      .retailContainer .inputBox .mat-select-value-text { top: 0rem;  }
      .slaAddIcon{ margin-top:-2rem;  } 
      .cdk-overlay-connected-position-bounding-box .cdk-overlay-pane .mat-select-panel.ng-animating {display: block !important;}
  
      .mat-datepicker-toggle .mat-icon-button{
        top:1.8rem !important;
      }
  
      .mat-select-value{
        overflow:auto;
      }
      .retailContainer .inputBox .mat-select-value-text {
        top: 0rem;
      }
      .slaAddIcon{ margin-top:-2rem;  } 
      .slaAddIcon.two{
        margin-left:  120px;
        margin-top :-25px;
      }
      
  
  }
  
  
    /* mozila */
    @-moz-document url-prefix() {
      .slaAddIcon.two {
        margin-left: 120px;
        margin-top: -12px;
    }
  
  }
  
  .highlight {
    background: yellow  !important;
    color: black;
  }
  .mat-select-placeholder {
    font-size: 1.4rem !important;
    font-family: 'Open Sans', sans-serif !important;
    text-transform: uppercase !important;
  }
  
  /* Multiselect dropdown */
  .mat-select-panel.multiSelect {min-width: calc(100% + 12px) !important;
    width: 100% !important;top: 1.9rem !important;left: 1.5rem !important;
    box-shadow: none !important;position: absolute !important;border: .1rem solid #6A6868 !important;
    border-radius: .2rem !important;max-height: 29vh !important;overflow-y: auto !important;
    transform: translateX(23px) !important;}
  .multiSelect .mat-pseudo-checkbox{width: 1.6rem !important;height: 1.6rem !important;border: .1rem solid    #6a6868 !important;}
  
  .multiSelect .mat-option:hover:not(.mat-option-disabled){background: #27AE60 !important; color: #fff !important}
  
  .mat-primary.multiSelect .mat-option.mat-selected:not(.mat-option-disabled){color: #1a1a1a !important;}
  .mat-select-panel.multiSelect.state_dropdown:not([class*=mat-elevation-z]) { box-shadow: none !important;position: absolute !important;top: -31rem !important;left: -1rem !important;  border: .1rem solid #ccc !important;}
  .mat-primary.multiSelect .mat-option:hover.mat-selected:not(.mat-option-disabled) {color: #fff !important; background: #27AE60 !important;}
  .multiSelect .mat-option{height: 2.7rem !important;}
  .mat-primary.multiSelect .mat-option.mat-selected:not(.mat-option-disabled) {color: #1a1a1a !important;}
  /* end of multiSelect Dropdown */
  
  
  
  .mat-select-search-inner.mat-typography.mat-datepicker-content.mat-tab-header {position: fixed; top: 45px; }
  
  /* Multiselect dropdown */
  .mat-select-panel.multiSelect {min-width: calc(100% + 12px) !important;margin-top: 0rem !important;
    width: 100% !important;top: 1.9rem !important;left: 1.5rem !important;
    box-shadow: none !important;position: absolute !important;border: .1rem solid #6A6868 !important;
    border-radius: .2rem !important;max-height: 29vh !important;overflow-y: auto !important;
    transform: translateX(23px) !important;}
  .mat-primary .mat-pseudo-checkbox-checked{background: #27AE60 !important;}
  .mat-select-panel.multiSelect:hover .mat-active{background: transparent !important;color: #1a1a1a !important;}
  .multiSelect .mat-option.mat-active:hover{background: #27AE60 !important; color: #fff !important;}
  .mat-select-panel.multiSelect .mat-option.mat-selected:not(.mat-option-multiple){background: #247d4a !important; color: #fff !important ; font-weight: bold }
  
  .mat-primary.multiSelect .mat-option.mat-selected:not(.mat-option-disabled){color: #1a1a1a !important;}
  .mat-select-panel.multiSelect.state_dropdown:not([class*=mat-elevation-z]) { box-shadow: none !important;position: absolute !important;top: -31rem !important;left: -1rem !important;  border: .1rem solid #ccc !important;}
  .mat-primary.multiSelect .mat-option:hover.mat-selected:not(.mat-option-disabled) {color: #fff !important; background: #27AE60 !important;}
  .multiSelect .mat-option{height: 2.7rem !important;}
  .mat-select-panel.multiSelect{min-width: calc(100% + 12px) !important; width: 100% !important;  top: 1.9rem !important;
    left: 1.5rem !important; box-shadow: none !important;position: absolute !important; border: .1rem solid #6A6868 !important;border-radius: .2rem !important;}
  .mat-primary.multiSelect .mat-option.mat-selected:not(.mat-option-disabled) {color: #1a1a1a !important;}
  /* end of multiSelect Dropdown */
  
  
  /* Print Preview */
  .leftSpace{margin-top: 2rem !important; padding-left: 1.3rem !important;}
  .leftSpace1{margin-top: 0rem !important;padding-left: 1.3rem !important;}
  .msaBox{background:  #515457 !important;width: 4% !important;height: 3.2rem !important;}
  .printButton{cursor: pointer !important;color: rgb(33, 110, 36), !important;width: 2.4rem !important; left: 0% !important;font-size: 3.2rem !important; border: none !important; background: transparent !important;position: relative !important;
    top: .3rem !important;}
    .printBar{height: 8rem;box-shadow: 0 11px 6px -7px #ccc;position: sticky;background: #fff !important;z-index: 1;top: 6.4rem;
    left: 6.7rem;width: 100%;overflow: hidden;}
    .previewHeading{width: 100%;background: #fff !important;margin-top: 1.5rem !important;}
    .previewHeading2{margin-top: 2%;width: 84%;margin-left: 8%;background: #fff !important;}
    .barContent{background: #515457 !important;color: #fff !important;padding: 1rem 2rem !important; font-size: 2.4rem !important;}
    .msaBox{background:  #515457 !important;width: 4% !important;height: 3.2rem !important;}
    .leftSpace{margin-top: 2rem !important; padding-left: 1.3rem !important;}
    .leftSpace1{margin-top: 0rem !important;padding-left: 1.3rem !important;}
    .text-heading{background: #f1f1f1;font-size: 1.8rem;border-bottom: .2rem solid #fff;display: flex;align-items: center;padding-right: 0 !important;min-height: 6.6rem !important;}
    .text-heading-bar{background: #b8b7b7;font-size: 1.8rem; border-left: .2rem solid #fff;
    border-bottom: .2rem solid #fff;display: flex;align-items: center;min-height: 6.6rem !important;}
    .text-align{text-align: right;}
    .heading{font-size: 2.1rem;font-weight: bold;}
    .zoal-rate-heading{min-height: 8rem; background: rgb(81, 84, 87);border: .2rem solid #fff;
  display: flex; align-items: center; text-align: left; color: #fff;font-size: 1.5rem; font-weight: bold;}
    .zoal-rate-content{background: #f1f1f1;border: .2rem solid #fff;padding-left: .5rem !important; padding-right: 1.5rem !important;
      display: flex; align-items: center; text-align: left; font-size: 1.5rem; word-wrap: break-word;}
    .zoal-rate-content1{background: #f1f1f1;border: .2rem solid #fff;padding-left: .5rem !important; padding-right: 1.5rem !important;
        display: block; align-items: center; text-align: left; font-size: 1.5rem; word-wrap: break-word;}
     .btn1 {background: #27AE60;color : rgb(49, 46, 46); border-radius: 2rem 2rem 2rem 2rem;font-size: 1.6rem;color:#fff}
     .btn1:not([disabled]):hover {background: rgb(18, 107, 55) !important; color: #fff;}
     .contentheight{min-height: 6.6rem !important;}
  
    .btn1:disabled{cursor: not-allowed !important;background: #81C784;}
  
    .smallPrint{position: relative;left: 10%;}
  
  
    /* end of Print Preview */
  
    .retailContainer .stateValidation{position: absolute !important;width: 25rem;top: 2.5rem;left: 0;color: red !important;}
  
  
  
  
  /* NEW ADD */
  .retailContainer .pincodeauto{max-height: 40rem !important; overflow: auto !important;}
  .retailContainer .displayBlock{display: block !important;}
  .retailContainer .paddingleftwo{padding-left: 2rem !important;}
  
  
  /* end of core file */
  
  
  /*********** DIalog CSS ************/
  
  .creditDialog .branchfonts{font-size: 1.6rem !important;}
  .creditDialog .deleteIcon{font-size: 2.4rem !important; position: relative; left: 9rem !important; top: .4rem !important;color: #fff !important;}
  .creditDialog .overflow::-webkit-scrollbar{width: .7rem; cursor:  pointer !important;}
  .creditDialog .heading-bar-dashboard {background: #F1F1F1;  padding-top: 1.0rem; padding-bottom: 1.0rem; color:black; font-size:1.6rem;} 
  .creditDialog .label-text{font-size: 1.6rem; font-weight: bold; padding-top: .6rem;}
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
  .creditDialog .row_center{ text-overflow: ellipsis !important; overflow: hidden !important; white-space: nowrap !important; text-align: left;}
  .creditDialog .row_center1{ text-overflow: ellipsis !important; overflow: hidden !important; white-space: nowrap !important; text-align: left;width: 15rem;}
  .creditDialog .overflow{max-height: 50vh;min-height: 52vh;overflow-y: scroll;overflow-x: hidden; box-sizing: border-box;}
  .creditDialog .hideContent {overflow: hidden;line-height: 1.0rem;height: 50vh;}
  .creditDialog .showContent {line-height: 1.0rem; height: auto;}
  .creditDialog .dots{display: inline-block;width: 9%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
  .creditDialog .ten{width: 10%;}
  .creditDialog .eleven{width: 11%;}
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
    /* margin-top: 9%; */
    width: 100%!important;
    margin-left: 11%;
    margin-bottom: 5rem;
    /* height: 100vh; */
  }
  .creditDialog .full-width{width: 100% !important;}
  .creditDialog .sfdAcc{text-overflow: ellipsis; white-space: nowrap;}
  .creditDialog .box-margin{margin-top: 3.0rem;}
  .creditDialog .dashboard-heading{position: relative; height: 5rem;}
  .creditDialog .msa-button{position: absolute; right: 0;cursor: pointer !important;}
  .creditDialog .pending-contract{font-size: 2.50rem; font-weight: 500;}
  /* Dashboard end */
  .creditDialog .contractbox{width: 29% !important;background: #fff !important;margin-right: 2.4rem !important;border-radius: .7rem !important;}
  .creditDialog .contractbox2{border-bottom: .1rem solid #27AE60 !important;width: 100%;height: 48% !important;}
  .creditDialog .contractupdate{margin-left: 2.9rem !important;margin-top: 2.3rem !important;}
  .creditDialog .gotocontract{width: 95% !important;margin-left: 1.1rem !important;margin-top: 2.5rem !important;border: none !important;}
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
  .creditDialog .msaOperation{display: flex;position: relative;}
  .creditDialog .msabutton{text-align: right;position: absolute;right: 0;}
  .creditDialog #mat-card-heading{background: #515457 !important; font-size: 1.6rem !important; color: #fff !important; padding: 1.0rem 2.0rem !important;}
  /* Button */
  .creditDialog .mat-icon-button{width: 4rem !important; height: 4rem !important; line-height: 1.8 !important; border-radius: 0 !important;}
  .creditDialog .example-button-row button, .example-button-row a {  margin-right: .8rem; }
  .creditDialog .example-button-row button,.example-button-row a {margin-right: .8rem;}
  .creditDialog .btn1 {background: rgba(255, 222, 121, 0.96);border-radius: 3.0rem 3.0rem 3.0rem 3.0rem;font-size: 1.6rem;color:#fff }
  .creditDialog .btn1:not([disabled]):hover {background: rgb(18, 107, 55);color: #fff; }
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
  .creditDialog .error{margin: 0; padding: 0;  position: relative; font-weight: bold; left: 2.0rem; top: -.4rem;font:1.0rem; font-size: 1.4rem; color:red; height: 0; bottom: .5rem;}
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
   /* end of Radio Button */
   
  /* checkbox */
  .creditDialog .mat-checkbox .mat-checkbox-frame {border-color: #6a6868; border-width: .2rem;}
  .creditDialog .mat-checkbox-checked .mat-checkbox-background {background: #81C784 !important;}
  .creditDialog .mat-checkbox-checked.mat-accent .mat-checkbox-background, .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
    background: #27AE60;}
  .creditDialog .mat-checkbox-layout .mat-checkbox-label{padding-left: .6rem !important;}
  /* checkbox */
  
  /* Mat form field */
  .creditDialog .mat-form-field-appearance-outline .mat-form-field-suffix {left: 1.2rem !important; top: -.2rem !important; right: 0 !important;}
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
  .overflow::-webkit-scrollbar {width: .7rem;  max-height: 1.0rem;}
  .overflow::-webkit-scrollbar-track {display: none;border-radius: 1.0rem;}
  .overflow::-webkit-scrollbar-thumb {background: #6A6868 !important;border-radius: 1.0rem;  max-height: 1.0rem;}
  .overflow::-webkit-scrollbar-thumb:hover {background: #585757 !important;}
  /* end of mat table */
  .creditDialog .mat-button, .mat-fab, .mat-flat-button, .mat-icon-button, .mat-mini-fab, .mat-raised-button, .mat-stroked-button{
    font-family:'Open Sans', sans-serif !important;  }
  /* Mat Dialog Container */
  .mat-dialog-container {border-radius: 2.0rem !important;padding: 0 !important; overflow-x: unset !important;position: relative !important;;left:1.6% !important;;}
  .creditDialog .cdk-overlay-backdrop {background: rgba(51, 51, 51, 0.78) !important;}
  /* End of Mat Dialog Container */
  /* Mat Checkbox */
  .creditDialog .mat-checkbox-inner-container{width: 1.6rem !important; height: 1.6rem !important;margin-right: 0 !important}
  .creditDialog .mat-checkbox-label{font-weight: normal; font-size: 1.2rem;}
  .creditDialog .mat-checkbox-ripple{width: 0 !important; height: 0 !important;}
  /* end of checkbox */
  /* mat-expansion */
  .creditDialog .mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow: none !important;}
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
  
  /* *****************************************************************************************************
                                           Document Upload
  ****************************************************************************************************** */
  .creditDialog .background{font-size: 1.6rem;color: #fff;background: #ccc !important;}
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
  .creditDialog .mat-horizontal-content-container {overflow: hidden; padding: 0 !important;}
  .creditDialog .mat-horizontal-stepper-header {box-sizing: border-box;  flex-direction: column-reverse !important;  height: auto;padding: 0px !important;}
  .creditDialog .mat-horizontal-stepper-header .mat-step-label {padding: 0px 0px 0px !important;}
  .creditDialog .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before, .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after{
    top: 6.8rem !important;}
  .creditDialog .mat-stepper-horizontal-line {border-top-width: .3rem !important; border-color: #27AE60 !important; position: relative !important; top: 3.8rem !important;
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
  .creditDialog .mat-step-icon{height: 2.4rem !important; width: 2.4rem !important;}
  .creditDialog .mat-step-header .mat-step-icon {background: #27AE60 !important;}
  .creditDialog .stepper-label{position: relative;top: 0px; right: 0px; bottom: 0px; left: 0px;}
  /* Stepper */
  .creditDialog .mat-stepper-horizontal{font-family: 'Open Sans', sans-serif !important;}/* end of Stepper */
  
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
  .creditDialog .billingby-container::-webkit-scrollbar {height: 1.5rem !important;cursor:  pointer;}
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
  .creditDialog .close_button{position: absolute; top: -10px; border: 0; right: 0; background: #fff;}
  .creditDialog .close_button .fa-times{position: relative; top: 0; right: 0;}
  .creditDialog .pincode_scroll{max-height: 50rem; overflow-y: auto;}
  .retailContainer .pincode_scroll{max-height: 50rem; overflow-y: auto;}
  
  .creditDialog .printBar_dialog{height: 8rem;box-shadow: 0 7px 6px -7px #ccc;background: #fff !important;z-index: 1;top: 6.4rem;
  left: 6.7rem;width: 100%;overflow: hidden; padding: 2rem; margin-bottom: 1rem;}
  
  .creditDialog .mat-pseudo-checkbox-checked::after{top: 0px !important; left: 0px !important; width: 6px !important;}
  .creditDialog .pincode_input{padding-left: 12px;}
  .creditDialog .redMark{color: red;}
  .creditDialog .mat-error{margin-top: -8px;}
  .creditDialog .state_dialog .fa-times{top: 0rem}
  .creditDialog .state_dialog{position: relative}
  .creditDialog .scrollable_table{overflow-x: hidden; max-height: 28rem !important}
  .creditDialog .slab_dialog{padding: 1.5rem;}
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
  .creditDialog .slab_width{width: 9rem !important; padding: 0 5px !important;}
  
  
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
 .wordWrap{text-overflow: ellipsis !important;overflow: hidden !important;text-align: left;word-break: break-word !important;}
 .creditDialog .grey_td{background: #b8b7b7 !important; color: #000 !important;}
  .creditDialog .leftSpace{margin-top: 2rem !important; padding-left: 1.3rem !important;}
 .creditDialog .leftSpace1{margin-top: 0rem !important;padding-left: 1.3rem !important;}
  .creditDialog .msaBox{background:  #515457 !important;width: 4% !important;height: 3.2rem !important;}
  .creditDialog .previewHeading{width: 100%;background: #fff !important;margin-top: 1.5rem !important;}
  .creditDialog .previewHeading2{margin-top: 2%;width: 84%;margin-left: 8%;background: #fff !important;}
  .creditDialog .barContent{background: #515457 !important;color: #fff !important;padding: 1rem 2rem !important; font-size: 2.4rem !important;}
  .creditDialog .barContent.green_th{background: #27AE60 !important;color: #111 !important;}
  .creditDialog .msaBox{background:  #515457 !important;width: 4% !important;height: 3.2rem !important;}
  .creditDialog .leftSpace{margin-top: 2rem !important; padding-left: 1.3rem !important;}
  .creditDialog .leftSpace1{margin-top: 0rem !important;padding-left: 1.3rem !important;}
  .creditDialog .text-heading{background: #f1f1f1;font-size: 1.8rem;border-bottom: .2rem solid #fff;display: flex;align-items: center;padding-right: 0 !important;min-height: 6.6rem !important;}
  .creditDialog .text-heading-bar{background: #b8b7b7;font-size: 1.8rem;border-left: .2rem solid #fff;border-bottom: .2rem solid #fff;display: flex;align-items: center;min-height: 6.6rem !important;}
  .creditDialog .text-align{text-align: right;}
  .creditDialog .heading{font-size: 2.1rem;font-weight: bold;}
  .creditDialog .green_th{background: #27AE60 !important; color: #000 !important; font-weight: 600; font-size: 1.5rem;}
  .creditDialog .zoal-rate-heading{min-height: 8rem !important; background: rgb(81, 84, 87);border: .2rem solid #fff; min-width: 9%;
  display: flex; align-items: center; text-align: left; color: #fff;font-size: 1.5rem; font-weight: bold;}
  .creditDialog .zoal-rate-content{background: #f1f1f1;border: .2rem solid #fff;padding-left: .5rem !important; padding-right: 1.5rem !important;
      display: flex; align-items: center; text-align: left; font-size: 1.5rem; word-wrap: break-word;}
  .creditDialog .zoal-rate-content1{background: #f1f1f1;border: .2rem solid #fff;padding-left: .5rem !important; padding-right: 1.5rem !important;
        display: block; align-items: center; text-align: left; font-size: 1.5rem; word-wrap: break-word;}   
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
  
  /* .creditDialog #stepper{position: absolute !important; top: 0rem !important; right: 2rem !important;} */
  .creditDialog .mat-form-field-appearance-outline .mat-form-field-outline-end, .mat-form-field-appearance-outline .mat-form-field-outline-start{
    border: .1rem solid currentColor !important;}
  
  .creditDialog .mat-step-icon .mat-icon,   .mat-step-icon-content{z-index: 99;}
    .creditDialog .biilingTable{width: 206rem !important;}
  
    .creditDialog .bilingConsinee{min-height: 4.5rem !important;display: flex;align-items: center;font-size: 1.6rem !important;overflow-wrap: anywhere !important;}
    .creditDialog .billingFonts{font-size: 1.8rem !important;}
   
  .creditDialog .commercialSlab-container {width: 164rem !important;}

  .mat-select-search-no-entries-found{padding: 0 !important}
  
  
  /* ============================
  Advance Search ================ */
  .creditDialog .branch_scroll{max-width: 99rem;overflow: auto;max-height: 22rem !important;}
  .creditDialog .removeRowMargin{margin-left: 0 !important; margin-right: 0 !important;}
  
  .scrollPreview{max-height: 60rem !important;overflow: auto !important;}
  .wordWrap{text-overflow: ellipsis !important; overflow: hidden !important;  text-align: left;}
  .ellipse{text-overflow: ellipsis !important; overflow: hidden !important; white-space: nowrap !important; text-align: left;}
  .static_table_header {
    position: sticky;
      top: 0;
      z-index: 99;
  }
  
  
  
  
  body .col-lg-4.col-md-4.col-sm-4.col-xs-4.mg, body .col-lg-8.col-md-8.col-sm-8.col-xs-8.mg {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .retailContainer .label-text.report {
    font-size: 1.6rem;
    padding-top: 0rem;
  }
  
  
  body .retailContainer.report span.mat-select-placeholder.ng-tns-c4-1.ng-star-inserted,
  body .retailContainer.report span.ng-tns-c4-1.ng-star-inserted {
    color: #fff !important;
  }
  
  .retailContainer.report .mat-raised-button.mat-primary {
    margin-left: 1rem;
    margin-top: 3rem;
  }
  
  .mat-select-panel.creditSelect.reportSelect {    
    top: 2rem !important;
  }
  
   .mat-select-panel.creditSelect.reportSelect{
    top: 1.9rem !important;
  }
  .retailContainer .commandCreate{font-size: 21px !important;margin-right: 3rem !important; position: absolute !important;}
  .retailContainer .disabled_input{
    background-color: transparent;
    caret-color: #eee;
  }
  
  
  
  
  
  /* Browser support code start */
  
  
  @-moz-document url-prefix(){
    .retailContainer .mat-input-element.date_picker {
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
    .retailContainer .mat-form-field-appearance-outline .mat-form-field-suffix {
      top: -2rem !important;
    }
    .retailContainer .mat-select-placeholder {
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
    .retailContainer .mat-cell .hasErrorMsg {position: relative !important}
    .mat-calendar-table-header-divider { display: none;}
    .creditDatepicker td.mat-calendar-body-cell { padding: 1.7rem 0 !important;}
  }
  
  .retailContainer .h3heading{margin-top: 3rem !important;position: relative !important;left: 4% !important;font-weight: bold !important}
  .retailContainer .flex-box{display: flex;}
  .creditDialog .flex-box{display: flex;}
  .retailContainer .flex1{flex: 1 !important;}
  .retailContainer .flex2{flex: 2 !important;}
  .retailContainer .flex3{flex: 3 !important;}
  .retailContainer .flex4{flex: 4 !important;}
  .retailContainer .flex-box{display: flex;}
  .creditDialog .flex1{flex: 1 !important;}
  .creditDialog .flex2{flex: 2 !important;}
  .creditDialog .flex3{flex: 3 !important;}
  .creditDialog .flex4{flex: 4 !important;}
  .retailContainer .smallPrint{position: relative;left: 10%;}
  .retailContainer .overflow-2{max-height: 60rem; overflow: auto;}
  .creditDialog .overflow-2{max-height: 60rem;overflow: auto;}
  .retailContainer .previewScrollBar{overflow: auto;max-height: 60rem;}
  .retailContainer .leftPrint{position:relative !important; left: -5% !important; }
  .creditDialog .leftPrint{position:relative !important; left: -5% !important; }
  .retailContainer .printLmargin{margin-left: -5.2% !important;}
  .creditDialog .printLmargin{margin-left: -5.2% !important;}
  .retailContainer .marginZonL{margin-left: -5% !important;}
  .retailContainer .marginZonal{margin-left: -5% !important;}
  .creditDialog .marginZonL{margin-left: -5% !important;}
  .creditDialog .marginZonal{margin-left: -5% !important;}
  .retailContainer .commercialLeft{position: relative !important; left: -2% !important;margin-top: 2rem}
  .creditDialog .commercialLeft{position: relative !important;  left: -2% !important;margin-top: 2rem}
  .retailContainer .scrollPreview{overflow-y: auto !important;height: 50rem !important;}
  .creditDialog .scrollPreview{overflow-y: auto !important;height: 50rem !important;}
  
  
  
  
  
  
  
  
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    /* IE10+ CSS styles go here */
    /** IE 11 fixes */
    .cdk-overlay-pane{display:block}
    body{background:#f2f2f2}
    .cdk-overlay-connected-position-bounding-box .cdk-overlay-pane .mat-select-panel.ng-animating{display:block!important}
    .mat-paginator,.mat-paginator-page-size .mat-select-trigger{padding-top:8px!important}
    .inputfield3{padding-top:.2rem}
    .retailContainer #plusicon{top:-.2rem}
    .creditDialog .form-control{line-height:0}
    .pincode_input{color:rgba(106,104,104,1)}
    .retailContainer .inputBox{line-height:0}
    .mat-datepicker-toggle .mat-icon-button{top:1.8rem!important}
    .retailContainer .mat-input-element.date_picker{margin-top:-1.6rem!important}
    .retailContainer .mat-form-field-appearance-outline .mat-form-field-suffix{top:-4rem!important}
    .cdk-overlay-container{z-index:2147483647!important}
    .retailContainer .inputBox .mat-select-value-text{top:.4rem}
    .mat-select-value{overflow:visible!important}
    .slaAddIcon{margin-top:-2rem}
    .slaAddIcon.two{line-height:24px;margin-left:8px;margin-top:-2rem}
     .retailContainer .rateCardDetail  .label-text-value{height: 5rem;}
    .retailContainer .hasErrorMsg {color: red !important;width: 14rem !important; position: relative !important; top: -1rem;}
    .retailContainer .marginBilling {margin-bottom: 0rem !important;} 
    .retailContainer .marginBilling.hasErrorMsg{bottom:6px!important;margin:0!important}
    .retailContainer .rateCardDetail  .label-text-value{height: 5rem;}
    .creditDatepicker td.mat-calendar-body-cell {font-size: 1.5rem!important;line-height: 1rem!important;padding: 1.4rem 0 !important;}
  
    
  }
  
  /* for Edge 12+ CSS */
  @supports (-ms-accelerator:true) {   
    .mat-datepicker-toggle .mat-icon-button { top: 0 !important; }
  }
  
  /* for Edge 16+ CSS */
  @supports (-ms-ime-align: auto) {
      .retailContainer .mat-input-element.date_picker{margin-top:-1.8rem !important;font-size:1.3rem; } 
      body{background: #f3f3f3;}
      .mat-select-value{overflow:scroll; }
      .retailContainer .inputBox .mat-select-value-text { top: 0rem;  }
      .slaAddIcon{ margin-top:-2rem;  }  
      .cdk-overlay-connected-position-bounding-box .cdk-overlay-pane .mat-select-panel.ng-animating {display: block !important;}
      .mat-datepicker-toggle .mat-icon-button{top:0rem !important; }
      .retailContainer .inputBox .mat-select-value-text { top: 0rem;  }
      .slaAddIcon{ margin-top:-2rem;  }
      .mNo{color:#000!important; text-decoration: none; }
      .retailContainer .mat-select-value-text {top: -.2rem; }
      body .retailContainer .mat-form-field-infix {     
        top: 0.8rem !important;
    }
    .retailContainer .hasErrorMsg {color: red !important;width: 14rem !important; position: relative !important; top: -1rem;}
    .retailContainer .marginBilling {margin-bottom: 0rem !important;} 
    .retailContainer .btn1.confirmationButton.marginRight{background: #81C784 !important; border: .2rem solid #81C784 !important }
    body .mat-form-field-appearance-outline .mat-select-arrow-wrapper { transform: translateY(0%);}
    app-validation-msg {font-size: 1.4rem}
  .creditDialog .mat-select{ top:-0.2rem !important; } 
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
.mat-select-panel.creditSelect.uploadDocument {  top: 2rem !important;}

.advanceSearch .mat-option.mat-selected:not(.mat-option-multiple):not(.mat-option-disabled) {
  background: #27ae60;
  color: #fff!important;
}

  `
  constructor( ){}
  onRightClick() {
    alert('Due to security reasons you can not press right click');
      return false;
    }

  ngOnInit(){ 
    var container;
    if (/Edge/.test(navigator.userAgent)) {
        container = document.getElementsByTagName('head')[0]
    }else{
        container = document.getElementsByClassName('retailContainer')[0]
    }
      const  style:any = document.createElement('style');
      style.type = 'text/css';    
      style.appendChild(document.createTextNode(this.style_css + this.core_css));
      container.appendChild(style);
  }


}
