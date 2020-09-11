import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';
import { AddStateComponent } from './modals/add-state/add-state.component';
import { Component,ApplicationRef } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'mat-app';
	settimeout:any;
 core_css = `
* {
  margin: 0;
  padding: 0
}

html {
  font-size: 45% !important;
}

body {
  margin: 0;
  font-family: 'Open Sans', sans-serif !important;
  background: #fff;
  font-weight: 400;
  line-height: 1.8;
  overflow-x: hidden;
  height: 100vh;
  box-sizing: border-box;
  font-size: 1.6rem;
}
.mat-icon-button .mat-icon{
    font-size: 16px !important;
    top: 4px;
    right: 0;
    position: absolute;
}
.mat-icon-button .mat-icon.burger-menu{
    font-size: 35px !important;
    top: 4px;
    right: 0;
    position: absolute;
}
h1 {
  font-size: 4.2rem !important
}

h2 {
  font-size: 3.2rem ! important;
}

h3 {
  font-size: 2.4rem !important
}

h4 {
  font-size: 1.8rem !important;
}

h5 {
  font-size: 1.8rem !important;
}

h6 {
  font-size: 1.6rem !important;
}

p {
  margin: 0 0 1.4rem;
}

/*over write*/
::-webkit-scrollbar {
  width: 1.0rem;
  cursor: pointer;
}

::-webkit-scrollbar-track {
  background: #EBEBF2;
    cursor: pointer;
}

::-webkit-scrollbar-thumb {
  background: #6A6868;
  height: 10.0rem;
    cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
  background: #585757;
    cursor: pointer;
}

.col-lg-1,
.col-lg-10,
.col-lg-11,
.col-lg-12,
.col-lg-2,
.col-lg-3,
.col-lg-4,
.col-lg-5,
.col-lg-6,
.col-lg-7,
.col-lg-8,
.col-lg-9,
.col-md-1,
.col-md-10,
.col-md-11,
.col-md-12,
.col-md-2,
.col-md-3,
.col-md-4,
.col-md-5,
.col-md-6,
.col-md-7,
.col-md-8,
.col-md-9,
.col-sm-1,
.col-sm-10,
.col-sm-11,
.col-sm-12,
.col-sm-2,
.col-sm-3,
.col-sm-4,
.col-sm-5,
.col-sm-6,
.col-sm-7,
.col-sm-8,
.col-sm-9,
.col-xs-1,
.col-xs-10,
.col-xs-11,
.col-xs-12,
.col-xs-2,
.col-xs-3,
.col-xs-4,
.col-xs-5,
.col-xs-6,
.col-xs-7,
.col-xs-8,
.col-xs-9 {
  min-height: .1rem !important;
  padding-right: 1.5rem !important;
  padding-left: 1.5rem !important;
}

.row {
  margin-left: -1.5rem !important;
  margin-right: -1.5rem !important;
}

.tooltiptext {
  display: none;
  background-color: #27AE60;
  color: #fff;
  text-align: left;
  border-radius: .6rem;
  padding: .5rem 0;
  z-index: 1123456;
}

.dots:hover .tooltiptext {
  display: block;
}

/* Button */
.mdmContainer #secondry-button {
  background-color: #fff !important;
  color: #1a1a1a !important;
  border: 2 solid #27AE60;
  font-weight: bold;
  box-sizing: border-box;
}

.mdmContainer button:focus {
  outline: 0;
}
.mdmDialog #secondry-button {
  background-color: #fff !important;
  color: #1a1a1a !important;
  border: 2 solid #27AE60;
  font-weight: bold;
  box-sizing: border-box;
}

.mdmDialog button:focus {
  outline: 0;
}

.mdmContainer mat-footer-cell:first-of-type,
.mdmContainer mat-header-cell:first-of-type {
  padding-left: 1.2rem !important;
}

.mdmContainer mat-footer-cell:last-of-type,
.mdmContainer mat-header-cell:last-of-type {
  padding-right: 0 !important;
}

.mdmContainer .example-container {
  overflow: auto;
  box-shadow: none;
}

.mdmContainer .mat-footer-cell {
  font-size: 1.6rem !important;
  word-break: break-all !important;
}

.mdmDialog mat-footer-cell:first-of-type,
.mdmDialog mat-header-cell:first-of-type {
  padding-left: 1.2rem !important;
}

.mdmDialog mat-footer-cell:last-of-type,
.mdmDialog mat-header-cell:last-of-type {
  padding-right: 0 !important;
}

.mdmDialog .example-container {
  overflow: auto;
  box-shadow: none;
}

.mdmDialog .mat-footer-cell {
  font-size: 1.6rem !important;
  word-break: break-all !important;
}
.mdmContainer .overflow {
  min-height: 52vh;
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
    cursor: pointer;
}

.mdmContainer .overflow::-webkit-scrollbar {
  width: .7rem;
    cursor: pointer;
}

.mdmContainer .overflow::-webkit-scrollbar-track {
  display: none;
    cursor: pointer;
}

.mdmContainer .overflow::-webkit-scrollbar-thumb {
  background: #6A6868;
    cursor: pointer;
}

.mdmContainer .overflow::-webkit-scrollbar-thumb:hover {
  background: #585757;
    cursor: pointer;
}

.mdmDialog .overflow {
  min-height: 52vh;
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
    cursor: pointer;
}

.mdmDialog .overflow::-webkit-scrollbar {
  width: .7rem;
    cursor: pointer;
}

.mdmDialog .overflow::-webkit-scrollbar-track {
  display: none;
    cursor: pointer;
}

.mdmDialog .overflow::-webkit-scrollbar-thumb {
  background: #6A6868;
    cursor: pointer;
}

.mdmDialog .overflow::-webkit-scrollbar-thumb:hover {
  background: #585757;
    cursor: pointer;
}
/* end of mat table */
/* Mat Dialog Container */
.mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
  background-color: #27AE60;
}

.mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
  background-color: #27AE60;
}

/* end of checkbox */
/* mat-expansion */
.mdmContainer #box-shadow {
  box-shadow: none;
  padding-top: 0;
  padding-bottom: 0;
}
.mdmDialog #box-shadow {
  box-shadow: none;
  padding-top: 0;
  padding-bottom: 0;
}
.mdmContainer .heading-bar-dashboard {
  background: #F1F1F1;
  padding-top: 10px;
  padding-bottom: 10px;
  color: black;
  font-size: 16px;
}

.mdmContainer .height {
  font-size: 16px;
  height: 45px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  align-items: center;
}

.mdmContainer .label-text {
  font-size: 16px;
  font-weight: bold;
  padding-top: 6px;
}

.mdmContainer .label-text-value {
  font-size: 16px;
  font-weight: 100;
  padding-top: 6px
}

.mdmContainer .add-more {
  margin-top: 15px;
}

.mdmContainer .flex-container {
  display: flex;
  flex-wrap: nowrap;
}

.mdmContainer .flex-container>.one {
  width: 22.5%;
  margin-right: 20px;
  text-align: center;
  line-height: 75px;
  font-size: 30px;
}

.mdmContainer .flex-container>.two {
  width: 10%;
  text-align: center;
  line-height: 75px;
  font-size: 30px;
}

.mdmContainer .one img {
  width: 100%;
  height: 100%;
}

.mdmContainer .two img {
  width: 100%;
  height: 100%;
}

.mdmContainer .text {
  color: #27AE60;
}

.mdmContainer .relative {
  position: relative;
}

.mdmContainer .absolute {
  width: 21px;
  height: 21px;
  background: #27AE60;
  position: absolute;
  border-radius: 50%;
  box-shadow: 1px 1px #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  right: 95px;
  font-weight: lighter;
}

.mdmContainer #background {
  background: #fff;
}

.mdmContainer .row_center {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
}

.mdmContainer .overflow {
  max-height: 50vh;
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
}

.mdmContainer .hideContent {
  overflow: hidden;
  line-height: 1em;
  height: 50vh;
}

.mdmContainer .showContent {
  line-height: 1em;
  height: auto;
}

.mdmContainer .mat-table {
  font-family: 'Open Sans', sans-serif !important;
}

.mdmContainer .dots {
  display: inline-block;
  width: 9%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mdmContainer .ten {
  width: 10%;
}

.mdmContainer .eleven {
  width: 11%;
}

.mdmContainer .onetwo {
  width: 12%;
}

.mdmContainer .onethree {
  width: 13%;
}

.mdmContainer .onefour {
  width: 14%;
}

.mdmContainer .onefive {
  width: 15%;
}

.mdmContainer .tooltiptext {
  display: none;
  background-color: #27AE60;
  color: #fff;
  text-align: left;
  border-radius: 6px;
  padding: 5px 0;
  z-index: 1123456;
}

/* Position the tooltip */
.mdmContainer .dots:hover .tooltiptext {
  display: block;
}

.mdmContainer .headingbar {
  width: 102%;
  margin-left: -14px;
  font-weight: 600;
}

.mdmContainer .hero-content {
  margin-top: 9%;
  width: 78%;
  margin-left: 11%;
}

.mdmContainer .full-width {
  width: 100%;
}

.mdmContainer .sfdAcc {
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mdmContainer .box-margin {
  margin-top: 30px;
}

/* Dashboard end */

/* ****************************  MSA COMPONENT  ********************************************** */



.mdmContainer .hero-content-2 {
  margin-top: 2%;
  width: 78%;
  margin-left: 11%;
}

.mdmContainer select {
  height: 27px;
  color: #81C784;
}

.mdmContainer .example-button-row button,
.mdmContainer .example-button-row a {
  margin-right: 8px;
}

.mdmContainer .mat-raised-button.mat-primary {
  background-color: #81C784;
}

.mdmContainer .mat-raised-button {
  color: currentColor;
}


.mdmContainer .mat-raised-button:not([disabled]):hover {
  background-color: rgb(33, 110, 36);
}

.mdmContainer .mat-raised-button[disabled] {
  color: #F1F1F1;
  background-color: #6A6868;
  border: 0.1rem solid #6A6868 !important;
}

.mdmContainer .btn1 {
  background-color: #27AE60;
  border-radius: 20px 20px 20px 20px;
  font-size: 16px;
  color: white
}

.mdmContainer .btn1:not([disabled]):hover {
  background-color: #81C784;
  color: #fff;
}

.mdmContainer #secondry-button {
  color: #1a1a1a !important;
  cursor: pointer !important;
  font-size: 1.6rem !important;
  background-color: #fff !important;
  border: 0.2rem solid #27AE60 !important;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  margin: 0 1rem;
  font-family: "Open Sans", sans-serif !important;
  border-radius: 2rem !important;
  padding: 0 1.6rem !important;
  line-height: 1.8 !important;
}

.mdmContainer .mat-divider {
  border-top-color: #27AE60;
  border-top-width: 2px;
  border-top-color: rgba(0, 0, 0, .12)
}

.mdmContainer .page-header {
  font-size: 24px;
  font-weight: normal;
  margin: 40px 0px 0px 14px;
  font-family: 'Open Sans', sans-serif;
}

.mdmContainer th {
  background: #F1F1F1
}


.mdmContainer select option:hover {
  color: black;
}

.mdmContainer select option:first-child:hover {
  color: #81C784;
}

.mdmContainer .consignor-heading {
  font-weight: bold;
}

.mdmContainer table {
  width: 100%;
}

.mdmContainer tr.mat-footer-row {
  font-weight: bold;
}

.mdmContainer .mat-table-sticky {
  border-top: 1px solid #e0e0e0;
}

.mdmContainer .right-aligned-header>.mat-content {
  justify-content: space-between;
}

.mdmContainer .inner-box {
  background-color: #fff;
  padding: 0px;
  margin: 0px;
}

.mdmContainer .heading-bar {
  background-color: #6A6868;
  padding: 10px;
  color: #fff;
  font-size: 16px;
  position: relative;
  right: 1.7%;
  width: 103.4%;
}

.mdmContainer .padding20 {
  padding-top: 20px;
}

.mdmContainer .text-heading-18 {
  font-size: 18px;
  font-weight: bold;
  color: #1a1a1a;
}

.mdmContainer .tablinput {
  height: 19px;
  width: 98px;
}

.mdmContainer .detail {
  width: 100%;
  height: 45px;
  padding: 10px;
  margin-left: 3px;
}

.mdmContainer .detail1 {
  width: 100%;
  height: 45px;
  margin-left: 3px;
}

.mdmContainer .error {
  font-weight: bold;
  font-size: 20px;
  left: 20px;
  top: -4px;
  font: 10px;
  color: red;
  height: 0px;
  margin: 0px;
  padding: 0px;
  position: relative;
  bottom: 5px;
}

.mdmContainer .error1 {
  color: rgb(163, 63, 63);
  height: 10px;
  margin: 0px;
  padding: 0px;
  position: absolute;
}

.mdmContainer .error2 {
  color: red;
  margin: 0px;
  padding: 0px;
  height: 15px;
}


.mdmContainer .button-msa {
  color: rgb(33, 110, 36);
  width: 24px;
  position: relative;
  top: 3px;
  left: 0%;
  cursor: pointer;
  font-size: 32px;
  border: none;
  background: transparent;
}

.mdmContainer button:focus {
  outline: 0;
}

.mdmContainer .searchby {
  font-weight: bold;
  margin-top: 4px;
}

.mdmContainer #defualtBranchSearch {
  position: absolute;
  top: 7px;
  left: 20px;
  font-size: 18px;
  color: #ccc;
  cursor: pointer;
}

.mdmContainer #defualtBranchSearch1 {
  position: absolute;
  right: 13%;
  font-size: 17px;
  top: 12px;
  z-index: 10;
  color: #BCBCCB;
}

.mdmContainer #defualtBranchSearch2 {
  position: absolute;
  left: 20px;
  font-size: 17px;
  top: 6px;
  z-index: 10;
  color: #ccc;
}


/* end of mat table */
.mdmContainer .mat-fab,
.mdmContainer .mat-flat-button,
.mdmContainer .mat-icon-button,
.mdmContainer .mat-mini-fab,
.mdmContainer .mat-raised-button,
.mdmContainer .mat-stroked-button {
  font-family: 'Open Sans', sans-serif !important;
}

/* Mat Dialog Container */

.mdmContainer .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
  background-color: #27AE60;
}
.mdmContainer .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
  background-color: #27AE60;
}

/* end of checkbox */
.mdmContainer .mat-fab,
.mdmContainer .mat-flat-button,
.mdmContainer .mat-icon-button,
.mdmContainer .mat-mini-fab,
.mdmContainer .mat-raised-button,
.mdmContainer .mat-stroked-button {
  font-family: 'Open Sans', sans-serif !important;
}

/* mat-expansion */
.mdmContainer #box-shadow {
  box-shadow: none;
  padding-top: 0;
  padding-bottom: 0;
}

/* mat-expansion */
.mdmContainer #plusicon {
  color: #27AE60;
  position: relative;
  right: 0px;
  font-size: 26px;
  top: 5px;
  left: 5px;
}

.mdmContainer #exelLink {
  position: absolute;
  right: 5rem;
}

.mdmContainer .fonts {
  font-size: 16px;
  font-weight: 600;
}

/* Advance Search Pop-Up */
.mdmContainer .zonalheadingbar {
  background: #F1F1F1;
  height: 45px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
}

.mdmContainer #popup-hr {
  margin-top: 5px;
  border: 0;
  border-top: 2px solid #27AE60;
}

.mdmContainer #h2 {
  margin-top: 18px;
  margin-left: 20px;
  margin-bottom: 0px;
  width: 460px;
}

.mdmContainer .margin-row {
  padding-left: 0;
  padding-right: 0;
  margin-right: 0;
  margin-left: 0;
}

.mdmContainer .row-margin {
  margin-left: 0;
  margin-right: 0;
}

.mdmContainer .background-color {
  background: #27AE60;
  color: #fff;
}

.mdmContainer .searchby {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 25px;
  padding-left: 15px;
  margin-right: 0;
  margin-top: 4px;
}

.mdmContainer .width {
  width: 20%;
  height: 35px;
  display: flex;
  border-bottom: 1px solid #f1f1f1;
  align-items: center;
}

/* End of Pop Up */
/* *****************************************************************************************************
                                          End of MSA COMPONENT 
****************************************************************************************************** */

/* *****************************************************************************************************
                                          OPPORTUNITY COMPONENT 
****************************************************************************************************** */


.mdmContainer #datepickerwidth {
  width: 100% !important;
}

.mdmContainer .rightpadding {
  padding-right: 0;
}

/* *****************************************************************************************************
                                          END OF OPPORTUNITY COMPONENT 
****************************************************************************************************** */

/* *****************************************************************************************************
                                          SERVICE
****************************************************************************************************** */
.mdmContainer .mat-form-field-appearance-outline .mat-form-field-flex {
  position: static !important;
}

.mdmContainer .mat-form-field.mat-focused.mat-primary .mat-select-arrow {
  color: #1a1a1a !important;
  color: rgb(39, 174, 96)
}
.mdmContainer .mat-select:hover{
border-color: #27AE60;
}
.mdmContainer .mat-select:active{
border-color: #27AE60;
}
.mdmContainer .mat-select:visited{
border-color: #27AE60;
}
.mdmContainer .mat-select:focus{
border-color: #27AE60;
}
.mdmContainer .mat-select:focus-within{
border-color: #27AE60;
}
.mdmContainer .mat-radio-outer-circle:hover{
border-color: #27AE60;
}
.mdmContainer .mat-radio-outer-circle:active{
border-color: #27AE60;
}
.mdmContainer .mat-radio-outer-circle:visited{
border-color: #27AE60 !important;
}
.mdmContainer .mat-radio-outer-circle:focus{
border-color: #27AE60;
}
.mdmContainer .mat-radio-outer-circle:focus-within{
border-color: #27AE60;
}
.mdmContainer .mat-select:hover .mat-select-arrow{
border-color: #27AE60;
}
.mdmContainer .mat-select:active .mat-select-arrow{
color: #27AE60;
}
.mdmContainer .mat-select:visited .mat-select-arrow{
    color: #27AE60;
}
.mdmContainer .mat-select:focus .mat-select-arrow{
color: #27AE60;
}
.mdmContainer .mat-select:focus-within .mat-select-arrow{
color: #27AE60;
}

.mdmContainer .mat-form-field-appearance-outline .mat-form-field-flex:hover {
  border-color: #27AE60;
}
.mdmContainer .mat-form-field-appearance-outline .mat-form-field-flex:active {
  border-color: #27AE60;
}
.mdmContainer .mat-form-field-appearance-outline .mat-form-field-flex:visited {
  border-color: #27AE60;
}
.mdmContainer .mat-form-field-appearance-outline .mat-form-field-flex:focus {
  border-color: #27AE60;
}
.mdmContainer .mat-form-field-appearance-outline .mat-form-field-flex:focus-within {
  border-color: #27AE60;
}




.mdmDialog .mat-select:hover{
border-color: #27AE60;
}
.mdmDialog .mat-select:active{
border-color: #27AE60;
}
.mdmDialog .mat-select:visited{
border-color: #27AE60;
}
.mdmDialog .mat-select:focus{
border-color: #27AE60;
}
.mdmDialog .mat-select:focus-within{
border-color: #27AE60;
}
.mdmDialog .mat-radio-outer-circle:hover{
border-color: #27AE60;
}
.mdmDialog .mat-radio-outer-circle:active{
border-color: #27AE60;
}
.mdmDialog .mat-radio-outer-circle:visited{
border-color: #27AE60;
}
.mdmDialog .mat-radio-outer-circle:focus{
border-color: #27AE60;
}
.mdmDialog .mat-radio-outer-circle:focus-within{
border-color: #27AE60;
}
.mdmDialog .mat-select:hover .mat-select-arrow{
color: #27AE60; 
}
.mdmDialog .mat-select:active .mat-select-arrow{
color: #27AE60;
}
.mdmDialog .mat-select:visited .mat-select-arrow{
    color: #27AE60;
}
.mdmDialog .mat-select:focus .mat-select-arrow{
color: #27AE60;
}
.mdmDialog .mat-select:focus-within .mat-select-arrow{
color: #27AE60;
}



.mdmDialog .select_box_dropwodn .mat-form-field-flex:active{
border: 1px solid #27AE60 !important;
}
.mdmDialog .select_box_dropwodn .mat-form-field-flex:hover{
border:1px solid #27AE60 !important;
}
.mdmDialog .select_box_dropwodn .mat-form-field-flex:focus{
border:1px solid #27AE60 !important;
}
.mdmDialog .select_box_dropwodn .mat-form-field-flex:visited{
border:1px solid #27AE60 !important;
}
.mdmDialog .select_box_dropwodn .mat-form-field-flex:focus-within {
border:1px solid #27AE60 !important;
}

.mdmDialog .mat-form-field-appearance-outline .mat-form-field-flex:hover {
  border-color: #27AE60;
}
.mdmDialog .mat-form-field-appearance-outline .mat-form-field-flex:active {
  border-color: #27AE60;
}
.mdmDialog .mat-form-field-appearance-outline .mat-form-field-flex:visited {
  border-color: #27AE60;
}
.mdmDialog .mat-form-field-appearance-outline .mat-form-field-flex:focus {
  border-color: #27AE60;
}
.mdmDialog .mat-form-field-appearance-outline .mat-form-field-flex:focus-within {
  border-color: #27AE60;
}
/* *****************************************************************************************************
                                          END OF SERVICE
****************************************************************************************************** */

/* *****************************************************************************************************
                                          RATE CAARD
****************************************************************************************************** */
.mdmContainer .flexproperty {
  display: flex;
}


.mdmContainer .commercialboxflex {
  display: flex;
  margin-top: 10px;
}

.mdmContainer .commercialbox {
  width: 139px;
  height: 112px;
  margin-top: 10px;
  box-shadow: 0px 3px 6px #00000029;
  background: linear-gradient(#FFFCFC, #EAEAEA);
}

.mdmContainer .commercialbox h6 {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
}

.mdmContainer .commercialbox p {
  font-size: 12px;
}

.mdmContainer #commercialboxdivider {
  position: relative;
  width: 7%;
  background: #27AE60;
  margin-top: -10px;
  margin-left: -10px;
  margin-left: -1.2%;
}

.mdmContainer .commercialbox1 {
  width: 139px;
  height: 112px;
  margin-top: 10px;
  box-shadow: 0px 6px 6px #00000029;
  background: #27AE60;
  border-radius: 5px;
}

.mdmContainer .commercialbox1 h6 {
  color: white;
  margin-top: 0px;
  font-size: 16px;
  font-weight: bold;
}

.mdmContainer .commercialbox1 p {
  color: white;
  font-size: 12px;
}

.mdmContainer #commercialboxdivider {
  position: relative;
  width: 7%;
  background: #27AE60;
  margin-top: -10px;
  margin-left: -10px;
  margin-left: -1.2%;
}

.mdmContainer #collapsedivider {
  background-color: #F1F1F1;
  margin-bottom: 8px;
}

.mdmContainer .zonalheading {
  font-size: 16px;
  color: #1a1a1a;
  font-weight: bold;
  margin-top: 0;
}

.mdmContainer .zonalheadingheight {
  height: 54px;
}

.mdmContainer .zonalheadingbar1 {
  background: #F1F1F1;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #fff;
  box-sizing: border-box;
}

.mdmContainer .radiofont {
  font-size: 14px;
}

.mdmContainer .field-background {
  background-color: #F1F1F1;
}

.mdmContainer .flexbox {
  display: flex;
  align-items: center;
  margin: 2px;
  width: 100%;
}

.mdmContainer .Branch {
  width: 12%;
  background-color: #F1F1F1;
  height: 54px;
  border-right: 1px solid white;
  display: flex;
  align-items: center;
  padding-left: 4px;
  font-size: 15px;
}

.mdmContainer #plusicon1 {
  color: #27AE60;
  z-index: 10;
  font-size: 23px;
}

.mdmContainer #box-shadow {
  box-shadow: none;
  padding-top: 0;
  padding-bottom: 0;
}

.mdmContainer #search-icon {
  position: absolute;
  top: 5px;
  font-size: 18px;
  left: 20px;
  opacity: .5;
}

.mdmContainer .green-border {
  border: 1px solid #27AE60;
  width: 100%;
}

.mdmContainer .control {
  position: relative;
  padding-left: 22px;
}

.mdmContainer #search-icon2 {
  position: absolute;
  top: 7px;
  font-size: 18px;
  left: 20px;
  opacity: .3;
  z-index: 10;
}

.mdmContainer #plusicon2 {
  color: #27AE60;
  position: absolute;
  margin-top: -6px;
  cursor: pointer;
  margin-left: 6px;
  margin-bottom: -15px;
  z-index: 10;
  font-size: 32px;
  box-shadow: 0px 1px 2px #00000029;
}

.mdmContainer .mat-content>mat-panel-title {
  flex: 0 0 auto;
  flex: inherit;
}

.mdmContainer #zonal-input {
  border: none;
  width: 100%;
}

.mdmContainer #zonal-input::placeholder {
  text-align: center;
  color: #27AE60;
}

.mdmContainer #zonal-input1 {
  width: 100%;
}

.mdmContainer #zonal-input1::placeholder {
  text-align: center;
  color: #27AE60;
}

.mdmContainer .dropdown {
  cursor: pointer;
}

.mdmContainer .hoverDisplay {
  position: absolute;
  top: -32px;
  width: 200%;
  right: -65px;
  padding: 0;
}

.mdmContainer .mousehover:hover+.hoverDisplay {
  display: block;
}

.mdmContainer .from {
  padding: 0;
}

.mdmContainer .to {
  padding: 0;
}

.mdmContainer .three {
  padding: 0;
}

.mdmContainer .flex-direction {
  flex-direction: column;
  padding: 0;
}

.mdmContainer .flex-box {
  display: flex;
}

.mdmContainer #left-margin {
  margin-left: 20px !important;
}

.mdmContainer .consignee-mapping {
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 5px;
}

.mdmContainer .font-size {
  font-size: 16px;
  font-weight: bold;
}

.mdmContainer .border-bottom {
  border-bottom: 1px solid #f1f1f1;
  padding-top: 5px;
  padding-bottom: 5px;
}

.mdmContainer .paddingleft {
  padding-left: 0;
}

.mdmContainer .curson-pointer {
  cursor: pointer;
}

.mdmContainer .paddingleft9 {
  padding-left: 9px;
}

/* base Location */
.mdmContainer #defualtBranchSearch3 {
  position: absolute;
  left: 90%;
  font-size: 17px;
  top: 4px;
  z-index: 10;
  color: #BCBCCB;
}

/* *****************************************************************************************************
                                         END OF RATE CAARD
****************************************************************************************************** */
.mdmContainer .mat-badge-content {
  font-weight: 600;
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
  color: #fff;
  background: rgb(39, 174, 96);
  position: absolute;
  text-align: center;
  display: inline-block;
  border-radius: 50%;
  transition: transform .2s ease-in-out;
  transform: scale(.6);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  pointer-events: none
}


.mdmContainer .mat-badge-large .mat-badge-content {
  font-size: 24px;
  width: 28px;
  height: 28px;
  line-height: 28px;
}

.mdmContainer .mat-h1,
.mdmContainer .mat-headline,
.mdmContainer .mat-typography h1 {
  font: 400 24px/32px 'Open Sans', sans-serif;
  margin: 0 0 16px
}

.mdmContainer .mat-h2,
.mdmContainer .mat-title,
.mdmContainer .mat-typography h2 {
  font: 500 20px/32px 'Open Sans', sans-serif;
  margin: 0 0 16px
}

.mdmContainer .mat-h3,
.mdmContainer .mat-subheading-2,
.mdmContainer .mat-typography h3 {
  font: 400 16px/28px 'Open Sans', sans-serif;
  margin: 0 0 16px
}

.mdmContainer .mat-h4,
.mdmContainer .mat-subheading-1,
.mdmContainer .mat-typography h4 {
  font: 400 15px/24px 'Open Sans', sans-serif;
  margin: 0 0 16px
}

.mdmContainer .mat-h5,
.mdmContainer .mat-typography h5 {
  font: 400 calc(14px * .83)/20px 'Open Sans', sans-serif;
  margin: 0 0 12px
}

.mdmContainer .mat-h6,
.mdmContainer .mat-typography h6 {
  font: 400 calc(14px * .67)/20px 'Open Sans', sans-serif;
  margin: 0 0 12px
}

.mdmContainer .mat-body-2,
.mdmContainer .mat-body-strong {
  font: 500 14px/24px 'Open Sans', sans-serif
}

.mdmContainer .mat-body,
.mdmContainer .mat-body-1,
.mdmContainer .mat-typography {
  font: 400 14px/20px 'Open Sans', sans-serif
}

.mdmContainer .mat-body p,
.mdmContainer .mat-body-1 p,
.mdmContainer .mat-typography p {
  margin: 0 0 12px
}

.mdmContainer .mat-caption,
.mdmContainer .mat-small {
  font: 400 12px/20px 'Open Sans', sans-serif
}

.mdmContainer .mat-display-4,
.mdmContainer .mat-typography .mat-display-4 {
  font: 300 112px/112px 'Open Sans', sans-serif;
  letter-spacing: -.05em;
  margin: 0 0 56px
}

.mdmContainer .mat-display-3,
.mdmContainer .mat-typography .mat-display-3 {
  font: 400 56px/56px 'Open Sans', sans-serif;
  letter-spacing: -.02em;
  margin: 0 0 64px
}

.mdmContainer .mat-display-2,
.mdmContainer .mat-typography .mat-display-2 {
  font: 400 45px/48px 'Open Sans', sans-serif;
  letter-spacing: -.005em;
  margin: 0 0 64px
}

.mdmContainer .mat-display-1,
.mdmContainer .mat-typography .mat-display-1 {
  font: 400 34px/40px 'Open Sans', sans-serif;
  margin: 0 0 64px
}


.mdmContainer .mat-button,
.mdmContainer .mat-fab,
.mdmContainer .mat-flat-button,
.mdmContainer .mat-icon-button,
.mdmContainer .mat-mini-fab,
.mdmContainer .mat-raised-button,
.mdmContainer .mat-stroked-button {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 500
}

.mdmContainer .mat-button-toggle {
  font-family: 'Open Sans', sans-serif;
  color: rgba(0, 0, 0, .38);
}

.mdmContainer .mat-card {
  font-family: 'Open Sans', sans-serif;
  background: #fff;
  color: rgba(0, 0, 0, .87)
}


.mdmContainer .mat-card-title {
  font-size: 24px;
  font-weight: 500
}

.mdmContainer .mat-card-header .mat-card-title {
  font-size: 20px
}

.mdmContainer .mat-card-content,
.mdmContainer .mat-card-subtitle {
  font-size: 14px
}

.mdmContainer .mat-checkbox {
  font-family: 'Open Sans', sans-serif
}

.mdmContainer .mat-checkbox-layout .mat-checkbox-label {
  line-height: 24px
}

.mdmContainer .mat-chip {
  font-size: 14px;
  font-weight: 500
}

.mdmContainer .mat-chip .mat-chip-remove.mat-icon,
.mdmContainer .mat-chip .mat-chip-trailing-icon.mat-icon {
  font-size: 18px
}

.mdmContainer .mat-header-cell {
  font-size: 12px;
  font-weight: 500;
  color: rgba(0, 0, 0, .54)
}


.mdmContainer .mat-calendar {
  font-family: 'Open Sans', sans-serif
}

.mdmContainer .mat-calendar-body {
  font-size: 13px
}

.mdmContainer .mat-calendar-body-label,
.mdmContainer .mat-calendar-period-button {
  font-size: 14px;
  font-weight: 500
}

.mdmContainer .mat-calendar-table-header th {
  font-size: 11px;
  font-weight: 400
}

.mdmContainer .mat-dialog-title {
  font: 500 20px/32px 'Open Sans', sans-serif
}

.mdmContainer .mat-expansion-panel-header {
  font-family: 'Open Sans', sans-serif;
  font-size: 15px;
  font-weight: 400
}

.mdmContainer .mat-form-field {
  font-size: inherit;
  font-weight: 400;
  line-height: 1.125;
  font-family: 'Open Sans', sans-serif
}

.mdmContainer .mat-form-field-wrapper {
  padding-bottom: 1.34375em
}

.mdmContainer .mat-form-field-prefix .mat-icon,
.mdmContainer .mat-form-field-suffix .mat-icon {
  font-size: 150%;
  line-height: 1.125
}

.mdmContainer .mat-form-field-prefix .mat-icon-button,
.mdmContainer .mat-form-field-suffix .mat-icon-button {
  height: 1.5em;
  width: 1.5em
}

.mdmContainer .mat-form-field-prefix .mat-icon-button .mat-icon,
.mdmContainer .mat-form-field-suffix .mat-icon-button .mat-icon {
  height: 1.125em;
  line-height: 1.125
}

.mdmContainer .mat-form-field-appearance-outline .mat-form-field-prefix {
  top: -0.2em !important;
}
.mdmDialog .mat-form-field-appearance-outline .mat-form-field-prefix {
  top: -0.3em !important;
}

.mdmContainer .mat-form-field-infix {
  padding: .5em 0;
  border-top: .84375em solid transparent
}

.mdmContainer .mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,
.mdmContainer .mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label {
  transform: translateY(-1.34375em) scale(.75);
  width: 133.33333%
}

.mdmContainer .mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label {
  transform: translateY(-1.34374em) scale(.75);
  width: 133.33334%
}

.mdmContainer .mat-form-field-label-wrapper {
  top: -.84375em;
  padding-top: .84375em
}

.mdmContainer .mat-form-field-label {
  top: 1.34375em;
  color: rgba(0, 0, 0, .6)
}


.mdmContainer .mat-form-field-underline {
  bottom: 1.34375em
}

.mdmContainer .mat-form-field-subscript-wrapper {
  font-size: 75%;
  margin-top: .66667em;
  top: calc(100% - 1.79167em)
}

.mdmContainer .mat-form-field-appearance-legacy .mat-form-field-wrapper {
  padding-bottom: 1.25em
}

.mdmContainer .mat-form-field-appearance-legacy .mat-form-field-infix {
  padding: .4375em 0
}

.mdmContainer .mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,
.mdmContainer .mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label {
  transform: translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);
  -ms-transform: translateY(-1.28125em) scale(.75);
  width: 133.33333%
}

.mdmContainer .mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label {
  transform: translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);
  -ms-transform: translateY(-1.28124em) scale(.75);
  width: 133.33334%
}

.mdmContainer .mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label {
  transform: translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);
  -ms-transform: translateY(-1.28123em) scale(.75);
  width: 133.33335%
}


.mdmContainer .mat-form-field-appearance-legacy .mat-form-field-underline {
  bottom: 2.25em;
  background-color: #fff;
}

.mdmContainer .mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper {
  margin-top: .54167em;
  top: calc(100% - 1.66667em)
}

@media print {

  .mdmContainer .mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,
  .mdmContainer .mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label {
    transform: translateY(-1.28122em) scale(.75)
  }

  .mdmContainer .mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label {
    transform: translateY(-1.28121em) scale(.75)
  }

  .mdmContainer .mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label {
    transform: translateY(-1.2812em) scale(.75)
  }
}

.mdmContainer .mat-form-field-appearance-fill .mat-form-field-infix {
  padding: .25em 0 .75em 0
}

.mdmContainer .mat-form-field-appearance-fill .mat-form-field-label {
  top: 1.09375em;
  margin-top: -.5em
}

.mdmContainer .mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,
.mdmContainer .mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label {
  transform: translateY(-.59375em) scale(.75);
  width: 133.33333%
}

.mdmContainer .mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label {
  transform: translateY(-.59374em) scale(.75);
  width: 133.33334%
}

.mdmContainer .mat-form-field-appearance-outline .mat-form-field-infix {
  padding: 0
}

.mdmContainer .mat-form-field-appearance-outline .mat-form-field-label {
  top: 1.84375em;
  margin-top: -.25em
}

.mdmContainer .mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,
.mdmContainer .mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label {
  transform: translateY(-1.59375em) scale(.75);
  width: 133.33333%
}

.mdmContainer .mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label {
  transform: translateY(-1.59374em) scale(.75);
  width: 133.33334%
}

.mdmContainer .mat-grid-tile-footer,
.mdmContainer .mat-grid-tile-header {
  font-size: 14px
}

.mdmContainer .mat-grid-tile-footer .mat-line,
.mdmContainer .mat-grid-tile-header .mat-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  box-sizing: border-box
}

.mdmContainer .mat-grid-tile-footer .mat-line:nth-child(n+2),
.mdmContainer .mat-grid-tile-header .mat-line:nth-child(n+2) {
  font-size: 12px
}

.mdmContainer input.mat-input-element {
  margin-top: -.0625em
}

.mdmContainer .mat-menu-item {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  background: 0 0;
  color: rgba(0, 0, 0, .87)
}


.mdmContainer .mat-paginator-page-size .mat-select-trigger {
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  color: rgba(0, 0, 0, .54)
}

.mdmContainer .mat-paginator {
  background: #fff;
  color: rgba(0, 0, 0, .54);
  font-family: 'Open Sans', sans-serif;
  font-size: 12px
}
.mdmContainer .mat-radio-button {
  font-family: 'Open Sans', sans-serif
}

.mdmContainer .mat-select {
  font-family: 'Open Sans', sans-serif
}

.mdmContainer .mat-select-trigger {
  height: 2.5rem;
}

.mdmContainer .mat-slide-toggle-content {
  font-family: 'Open Sans', sans-serif
}

.mdmContainer .mat-slider-thumb-label-text {
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-weight: 500
}

.mdmContainer .mat-step-label {
  font-size: 14px;
  font-weight: 400
}

.mdmContainer .mat-step-sub-label-error {
  font-weight: 400
}

.mdmContainer .mat-step-label-error {
  font-size: 14px
}

.mdmContainer .mat-step-label-selected {
  font-size: 14px;
  font-weight: 500
}

.mdmContainer .mat-tab-group {
  font-family: 'Open Sans', sans-serif
}

.mdmContainer .mat-tab-label,
.mdmContainer .mat-tab-link {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, .87)
}

.mdmContainer .mat-toolbar,
.mdmContainer .mat-toolbar h1,
.mdmContainer .mat-toolbar h2,
.mdmContainer .mat-toolbar h3,
.mdmContainer .mat-toolbar h4,
.mdmContainer .mat-toolbar h5,
.mdmContainer .mat-toolbar h6 {
  font: 500 20px/32px 'Open Sans', sans-serif;
  margin: 0
}

.mdmContainer .mat-list-item {
  font-family: 'Open Sans', sans-serif
}

.mdmContainer .mat-list-option {
  font-family: 'Open Sans', sans-serif
}

.mdmContainer .mat-list-base .mat-list-item .mat-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  box-sizing: border-box
}

.mdmContainer .mat-list-base .mat-list-item .mat-line:nth-child(n+2) {
  font-size: 14px
}

.mdmContainer .mat-list-base .mat-list-option {
  font-size: 16px;
  color: rgba(0, 0, 0, .87)
}

.mdmContainer .mat-list-base .mat-list-option .mat-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  box-sizing: border-box
}

.mdmContainer .mat-list-base .mat-list-option .mat-line:nth-child(n+2) {
  font-size: 14px
}

.mdmContainer .mat-list-base[dense] .mat-list-item {
  font-size: 12px
}

.mdmContainer .mat-list-base[dense] .mat-list-item .mat-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  box-sizing: border-box
}

.mdmContainer .mat-list-base[dense] .mat-list-item .mat-line:nth-child(n+2) {
  font-size: 12px
}

.mdmContainer .mat-list-base[dense] .mat-list-option {
  font-size: 12px
}

.mdmContainer .mat-list-base[dense] .mat-list-option .mat-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  box-sizing: border-box
}

.mdmContainer .mat-list-base[dense] .mat-list-option .mat-line:nth-child(n+2) {
  font-size: 12px
}

.mdmContainer .mat-list-base[dense] .mat-subheader {
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-weight: 500
}


.mdmContainer .mat-simple-snackbar {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px
}

.mdmContainer .mat-simple-snackbar-action {
  line-height: 1;
  font-family: inherit;
  font-size: inherit;
  font-weight: 500;
  color: #27ae60
}


.mdmContainer .mat-ripple {
  overflow: hidden;
  position: relative
}

.mdmContainer .mat-ripple.mat-ripple-unbounded {
  overflow: visible
}

.mdmContainer .mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0s cubic-bezier(0, 0, .2, 1);
  transform: scale(0);
  background-color: rgba(0, 0, 0, .1);
}

@media (-ms-high-contrast:active) {
  .mdmContainer .mat-ripple-element {
    display: none
  }
}

.mdmContainer .cdk-visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none
}

.mdmContainer .cdk-global-overlay-wrapper,
.mdmContainer .cdk-overlay-container {
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%
}

.mdmContainer .cdk-overlay-container {
  position: fixed;
  z-index: 1000
}

.mdmContainer .cdk-overlay-container:empty {
  display: none
}

.mdmContainer .cdk-global-overlay-wrapper {
  display: flex;
  position: absolute;
  z-index: 1000
}

.mdmContainer .cdk-overlay-pane {
  position: absolute;
  pointer-events: auto;
  box-sizing: border-box;
  z-index: 1000;
  display: flex;
  max-width: 100%;
  max-height: 100%
}

.mdmContainer .cdk-overlay-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  transition: opacity .4s cubic-bezier(.25, .8, .25, 1);
  opacity: 0
}

.mdmContainer .cdk-overlay-backdrop.cdk-overlay-backdrop-showing {
  opacity: 1
}

@media screen and (-ms-high-contrast:active) {
  .mdmContainer .cdk-overlay-backdrop.cdk-overlay-backdrop-showing {
    opacity: .6
  }
}

.mdmContainer .cdk-overlay-dark-backdrop {
  background: rgba(0, 0, 0, .32)
}

.mdmContainer .cdk-overlay-transparent-backdrop,
.mdmContainer .cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing {
  opacity: 0
}

.mdmContainer .cdk-overlay-connected-position-bounding-box {
  position: absolute;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  min-width: 1px;
  min-height: 1px
}

.mdmContainer .cdk-global-scrollblock {
  position: fixed;
  width: 100%;
  overflow-y: scroll
}

@keyframes cdk-text-field-autofill-start {
  /*!*/
}

@keyframes cdk-text-field-autofill-end {
  /*!*/
}

.mdmContainer .cdk-text-field-autofill-monitored:-webkit-autofill {
  animation-name: cdk-text-field-autofill-start
}

.mdmContainer .cdk-text-field-autofill-monitored:not(:-webkit-autofill) {
  animation-name: cdk-text-field-autofill-end
}

.mdmContainer textarea.cdk-textarea-autosize {
  resize: none
}

.mdmContainer textarea.cdk-textarea-autosize-measuring {
  height: auto !important;
  overflow: hidden !important;
  padding: 2px 0 !important;
  box-sizing: content-box !important
}

.mdmContainer .mat-option {
  color: rgba(0, 0, 0, .87);
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
}

.mdmContainer .mat-option:focus:not(.mat-option-disabled),
.mdmContainer .mat-option:hover:not(.mat-option-disabled) {
  background: rgba(0, 0, 0, .04)
}

.mdmContainer .mat-option.mat-selected:not(.mat-option-multiple):not(.mat-option-disabled) {
  background: rgba(0, 0, 0, .04)
}

.mdmContainer .mat-option.mat-active {
  background: rgba(0, 0, 0, .04);
  color: rgba(0, 0, 0, .87)
}

.mdmContainer .mat-option.mat-option-disabled {
  color: rgba(0, 0, 0, .38)
}

.mdmContainer .mat-accent .mat-option.mat-selected:not(.mat-option-disabled) {
  color: #27ae60
}

.mdmContainer .mat-warn .mat-option.mat-selected:not(.mat-option-disabled) {
  color: #27ae60
}

.mdmContainer .mat-optgroup-label {
  color: rgba(0, 0, 0, .54);
  font: 500 14px/24px 'Open Sans', sans-serif;
}

.mdmContainer .mat-optgroup-disabled .mat-optgroup-label {
  color: rgba(0, 0, 0, .38)
}

.mdmContainer .mat-pseudo-checkbox {
  color: rgba(0, 0, 0, .54)
}

.mdmContainer .mat-pseudo-checkbox::after {
  color: #fafafa
}

.mdmContainer .mat-pseudo-checkbox-disabled {
  color: #6A6868
}

.mdmContainer .mat-primary .mat-pseudo-checkbox-checked,
.mdmContainer .mat-primary .mat-pseudo-checkbox-indeterminate {
  background: rgb(39, 174, 96)
}

.mdmContainer .mat-accent .mat-pseudo-checkbox-checked,
.mdmContainer .mat-accent .mat-pseudo-checkbox-indeterminate,
.mdmContainer .mat-pseudo-checkbox-checked,
.mdmContainer .mat-pseudo-checkbox-indeterminate {
  background: #27ae60
}

.mdmContainer .mat-warn .mat-pseudo-checkbox-checked,
.mdmContainer .mat-warn .mat-pseudo-checkbox-indeterminate {
  background: #27ae60
}

.mdmContainer .mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled,
.mdmContainer .mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background: #6A6868
}

.mdmContainer .mat-elevation-z0 {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, .2), 0 0 0 0 rgba(0, 0, 0, .14), 0 0 0 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z1 {
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z2 {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z3 {
  box-shadow: 0 3px 3px -2px rgba(0, 0, 0, .2), 0 3px 4px 0 rgba(0, 0, 0, .14), 0 1px 8px 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z4 {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z5 {
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 5px 8px 0 rgba(0, 0, 0, .14), 0 1px 14px 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z6 {
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z7 {
  box-shadow: 0 4px 5px -2px rgba(0, 0, 0, .2), 0 7px 10px 1px rgba(0, 0, 0, .14), 0 2px 16px 1px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z8 {
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z9 {
  box-shadow: 0 5px 6px -3px rgba(0, 0, 0, .2), 0 9px 12px 1px rgba(0, 0, 0, .14), 0 3px 16px 2px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z10 {
  box-shadow: 0 6px 6px -3px rgba(0, 0, 0, .2), 0 10px 14px 1px rgba(0, 0, 0, .14), 0 4px 18px 3px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z11 {
  box-shadow: 0 6px 7px -4px rgba(0, 0, 0, .2), 0 11px 15px 1px rgba(0, 0, 0, .14), 0 4px 20px 3px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z12 {
  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, .2), 0 12px 17px 2px rgba(0, 0, 0, .14), 0 5px 22px 4px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z13 {
  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, .2), 0 13px 19px 2px rgba(0, 0, 0, .14), 0 5px 24px 4px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z14 {
  box-shadow: 0 7px 9px -4px rgba(0, 0, 0, .2), 0 14px 21px 2px rgba(0, 0, 0, .14), 0 5px 26px 4px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z15 {
  box-shadow: 0 8px 9px -5px rgba(0, 0, 0, .2), 0 15px 22px 2px rgba(0, 0, 0, .14), 0 6px 28px 5px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z16 {
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, .2), 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z17 {
  box-shadow: 0 8px 11px -5px rgba(0, 0, 0, .2), 0 17px 26px 2px rgba(0, 0, 0, .14), 0 6px 32px 5px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z18 {
  box-shadow: 0 9px 11px -5px rgba(0, 0, 0, .2), 0 18px 28px 2px rgba(0, 0, 0, .14), 0 7px 34px 6px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z19 {
  box-shadow: 0 9px 12px -6px rgba(0, 0, 0, .2), 0 19px 29px 2px rgba(0, 0, 0, .14), 0 7px 36px 6px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z20 {
  box-shadow: 0 10px 13px -6px rgba(0, 0, 0, .2), 0 20px 31px 3px rgba(0, 0, 0, .14), 0 8px 38px 7px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z21 {
  box-shadow: 0 10px 13px -6px rgba(0, 0, 0, .2), 0 21px 33px 3px rgba(0, 0, 0, .14), 0 8px 40px 7px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z22 {
  box-shadow: 0 10px 14px -6px rgba(0, 0, 0, .2), 0 22px 35px 3px rgba(0, 0, 0, .14), 0 8px 42px 7px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z23 {
  box-shadow: 0 11px 14px -7px rgba(0, 0, 0, .2), 0 23px 36px 3px rgba(0, 0, 0, .14), 0 9px 44px 8px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-elevation-z24 {
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, .2), 0 24px 38px 3px rgba(0, 0, 0, .14), 0 9px 46px 8px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-app-background {
  background-color: #fafafa;
  color: rgba(0, 0, 0, .87)
}

.mdmContainer .mat-theme-loaded-marker {
  display: none
}

.mdmContainer .mat-autocomplete-panel {
  background: #fff;
  color: rgba(0, 0, 0, .87)
}

.mdmContainer .mat-autocomplete-panel:not([class*=mat-elevation-z]) {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover) {
  background: #fff
}

.mdmContainer .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover):not(.mat-option-disabled) {
  color: rgba(0, 0, 0, .87)
}

@media (-ms-high-contrast:active) {
  .mdmContainer .mat-badge-content {
    outline: solid 1px;
    border-radius: 0
  }
}

.mdmContainer .mat-badge-accent .mat-badge-content {
  background: #27ae60;
  color: #fff
}

.mdmContainer .mat-badge-warn .mat-badge-content {
  color: #fff;
  background: #27ae60
}

.mdmContainer .mat-badge {
  position: relative
}

.mdmContainer .mat-badge-hidden .mat-badge-content {
  display: none
}

.mdmContainer .mat-badge-disabled .mat-badge-content {
  background: #b9b9b9;
  color: rgba(0, 0, 0, .38)
}

.mdmContainer .mat-badge-content._mat-animation-noopable,
.mdmContainer .ng-animate-disabled .mat-badge-content {
  transition: none
}

.mdmContainer .mat-badge-content.mat-badge-active {
  transform: none
}

.mdmContainer .mat-badge-small .mat-badge-content {
  width: 16px;
  height: 16px;
  line-height: 16px;
  font-size: 9px;
}

.mdmContainer .mat-badge-small.mat-badge-above .mat-badge-content {
  top: -8px
}

.mdmContainer .mat-badge-small.mat-badge-below .mat-badge-content {
  bottom: -8px
}

.mdmContainer .mat-badge-small.mat-badge-before .mat-badge-content {
  left: -16px
}

[dir=rtl] .mdmContainer .mat-badge-small.mat-badge-before .mat-badge-content {
  left: auto;
  right: -16px
}

.mdmContainer .mat-badge-small.mat-badge-after .mat-badge-content {
  right: -16px
}

[dir=rtl] .mdmContainer .mat-badge-small.mat-badge-after .mat-badge-content {
  right: auto;
  left: -16px
}

.mdmContainer .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {
  left: -8px
}

[dir=rtl] .mdmContainer .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {
  left: auto;
  right: -8px
}

.mdmContainer .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {
  right: -8px
}

[dir=rtl] .mdmContainer .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {
  right: auto;
  left: -8px
}

.mdmContainer .mat-badge-medium .mat-badge-content {
  width: 22px;
  height: 22px;
  line-height: 22px
}

.mdmContainer .mat-badge-medium.mat-badge-above .mat-badge-content {
  top: -11px
}

.mdmContainer .mat-badge-medium.mat-badge-below .mat-badge-content {
  bottom: -11px
}

.mdmContainer .mat-badge-medium.mat-badge-before .mat-badge-content {
  left: -22px
}

[dir=rtl] .mdmContainer .mat-badge-medium.mat-badge-before .mat-badge-content {
  left: auto;
  right: -22px
}

.mdmContainer .mat-badge-medium.mat-badge-after .mat-badge-content {
  right: -22px
}

[dir=rtl] .mdmContainer .mat-badge-medium.mat-badge-after .mat-badge-content {
  right: auto;
  left: -22px
}

.mdmContainer .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {
  left: -11px
}

[dir=rtl] .mdmContainer .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {
  left: auto;
  right: -11px
}

.mdmContainer .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {
  right: -11px
}

[dir=rtl] .mdmContainer .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {
  right: auto;
  left: -11px
}


.mdmContainer .mat-badge-large.mat-badge-above .mat-badge-content {
  top: -14px
}

.mdmContainer .mat-badge-large.mat-badge-below .mat-badge-content {
  bottom: -14px
}

.mdmContainer .mat-badge-large.mat-badge-before .mat-badge-content {
  left: -28px
}

[dir=rtl] .mdmContainer .mat-badge-large.mat-badge-before .mat-badge-content {
  left: auto;
  right: -28px
}

.mdmContainer .mat-badge-large.mat-badge-after .mat-badge-content {
  right: -28px
}

[dir=rtl] .mdmContainer .mat-badge-large.mat-badge-after .mat-badge-content {
  right: auto;
  left: -28px
}

.mdmContainer .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {
  left: -14px
}

[dir=rtl] .mdmContainer .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {
  left: auto;
  right: -14px
}

.mdmContainer .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {
  right: -14px
}

[dir=rtl] .mdmContainer .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {
  right: auto;
  left: -14px
}

.mdmContainer .mat-bottom-sheet-container {
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, .2), 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12);
  background: #fff;
  color: rgba(0, 0, 0, .87);
  font: 400 14px/20px 'Open Sans', sans-serif;
}

.mdmContainer .mat-button,
.mdmContainer .mat-icon-button,
.mdmContainer .mat-stroked-button {
  color: inherit;
  background: 0 0
}

.mdmContainer .mat-button.mat-primary,
.mdmContainer .mat-icon-button.mat-primary,
.mdmContainer .mat-stroked-button.mat-primary {
  color: rgb(39, 174, 96)
}

.mdmContainer .mat-button.mat-accent,
.mdmContainer .mat-icon-button.mat-accent,
.mdmContainer .mat-stroked-button.mat-accent {
  color: #27ae60
}

.mdmContainer .mat-button.mat-warn,
.mdmContainer .mat-icon-button.mat-warn,
.mdmContainer .mat-stroked-button.mat-warn {
  color: #27ae60
}

.mdmContainer .mat-button.mat-accent[disabled],
.mdmContainer .mat-button.mat-primary[disabled],
.mdmContainer .mat-button.mat-warn[disabled],
.mdmContainer .mat-button[disabled][disabled],
.mdmContainer .mat-icon-button.mat-accent[disabled],
.mdmContainer .mat-icon-button.mat-primary[disabled],
.mdmContainer .mat-icon-button.mat-warn[disabled],
.mdmContainer .mat-icon-button[disabled][disabled],
.mdmContainer .mat-stroked-button.mat-accent[disabled],
.mdmContainer .mat-stroked-button.mat-primary[disabled],
.mdmContainer .mat-stroked-button.mat-warn[disabled],
.mdmContainer .mat-stroked-button[disabled][disabled] {
  color: rgba(0, 0, 0, .26)
}

.mdmContainer .mat-button.mat-primary .mat-button-focus-overlay,
.mdmContainer .mat-icon-button.mat-primary .mat-button-focus-overlay,
.mdmContainer .mat-stroked-button.mat-primary .mat-button-focus-overlay {
  background-color: rgb(39, 174, 96)
}

.mdmContainer .mat-button.mat-accent .mat-button-focus-overlay,
.mdmContainer .mat-icon-button.mat-accent .mat-button-focus-overlay,
.mdmContainer .mat-stroked-button.mat-accent .mat-button-focus-overlay {
  background-color: #27ae60
}

.mdmContainer .mat-button.mat-warn .mat-button-focus-overlay,
.mdmContainer .mat-icon-button.mat-warn .mat-button-focus-overlay,
.mdmContainer .mat-stroked-button.mat-warn .mat-button-focus-overlay {
  background-color: #27ae60
}

.mdmContainer .mat-button[disabled] .mat-button-focus-overlay,
.mdmContainer .mat-icon-button[disabled] .mat-button-focus-overlay,
.mdmContainer .mat-stroked-button[disabled] .mat-button-focus-overlay {
  background-color: transparent
}

.mdmContainer .mat-button .mat-ripple-element,
.mdmContainer .mat-icon-button .mat-ripple-element,
.mdmContainer .mat-stroked-button .mat-ripple-element {
  opacity: .1;
  background-color: currentColor
}

.mdmContainer .mat-button-focus-overlay {
  background: #000
}

.mdmContainer .mat-stroked-button:not([disabled]) {
  border-color: rgba(0, 0, 0, .12)
}

.mdmContainer .mat-fab,
.mdmContainer .mat-flat-button,
.mdmContainer .mat-mini-fab,
.mdmContainer .mat-raised-button {
  color: rgba(0, 0, 0, .87);
  background-color: #fff
}

.mdmContainer .mat-fab.mat-warn,
.mdmContainer .mat-flat-button.mat-warn,
.mdmContainer .mat-mini-fab.mat-warn,
.mdmContainer .mat-raised-button.mat-warn {
  color: #fff;
  background-color: #27ae60;
}


.mdmContainer .mat-fab.mat-primary,
.mdmContainer .mat-flat-button.mat-primary,
.mdmContainer .mat-mini-fab.mat-primary,
.mdmContainer .mat-raised-button.mat-primary {
  color: #fff;
  background-color: rgb(39, 174, 96);
}

.mdmContainer .mat-fab.mat-accent,
.mdmContainer .mat-flat-button.mat-accent,
.mdmContainer .mat-mini-fab.mat-accent,
.mdmContainer .mat-raised-button.mat-accent {
  background-color: #27ae60;
  color: #fff;
}

.mdmContainer .mat-fab.mat-accent[disabled],
.mdmContainer .mat-fab.mat-primary[disabled],
.mdmContainer .mat-fab.mat-warn[disabled],
.mdmContainer .mat-fab[disabled][disabled],
.mdmContainer .mat-flat-button.mat-accent[disabled],
.mdmContainer .mat-flat-button.mat-primary[disabled],
.mdmContainer .mat-flat-button.mat-warn[disabled],
.mdmContainer .mat-flat-button[disabled][disabled],
.mdmContainer .mat-mini-fab.mat-accent[disabled],
.mdmContainer .mat-mini-fab.mat-primary[disabled],
.mdmContainer .mat-mini-fab.mat-warn[disabled],
.mdmContainer .mat-mini-fab[disabled][disabled],
.mdmContainer .mat-raised-button.mat-accent[disabled],
.mdmContainer .mat-raised-button.mat-primary[disabled],
.mdmContainer .mat-raised-button.mat-warn[disabled],
.mdmContainer .mat-raised-button[disabled][disabled] {
  background-color: rgba(0, 0, 0, .12);
  cursor: not-allowed;
  color: rgba(0, 0, 0, .26);
}

.mdmContainer .mat-fab.mat-primary .mat-ripple-element,
.mdmContainer .mat-flat-button.mat-primary .mat-ripple-element,
.mdmContainer .mat-mini-fab.mat-primary .mat-ripple-element,
.mdmContainer .mat-raised-button.mat-primary .mat-ripple-element {
  background-color: rgba(255, 255, 255, .1)
}

.mdmContainer .mat-fab.mat-accent .mat-ripple-element,
.mdmContainer .mat-flat-button.mat-accent .mat-ripple-element,
.mdmContainer .mat-mini-fab.mat-accent .mat-ripple-element,
.mdmContainer .mat-raised-button.mat-accent .mat-ripple-element {
  background-color: rgba(255, 255, 255, .1)
}

.mdmContainer .mat-fab.mat-warn .mat-ripple-element,
.mdmContainer .mat-flat-button.mat-warn .mat-ripple-element,
.mdmContainer .mat-mini-fab.mat-warn .mat-ripple-element,
.mdmContainer .mat-raised-button.mat-warn .mat-ripple-element {
  background-color: rgba(255, 255, 255, .1)
}

.mdmContainer .mat-flat-button:not([class*=mat-elevation-z]),
.mdmContainer .mat-stroked-button:not([class*=mat-elevation-z]) {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, .2), 0 0 0 0 rgba(0, 0, 0, .14), 0 0 0 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-raised-button:not([class*=mat-elevation-z]) {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-raised-button:not([disabled]):active:not([class*=mat-elevation-z]) {
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-raised-button[disabled]:not([class*=mat-elevation-z]) {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, .2), 0 0 0 0 rgba(0, 0, 0, .14), 0 0 0 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-fab:not([class*=mat-elevation-z]),
.mdmContainer .mat-mini-fab:not([class*=mat-elevation-z]) {
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-fab:not([disabled]):active:not([class*=mat-elevation-z]),
.mdmContainer .mat-mini-fab:not([disabled]):active:not([class*=mat-elevation-z]) {
  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, .2), 0 12px 17px 2px rgba(0, 0, 0, .14), 0 5px 22px 4px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-fab[disabled]:not([class*=mat-elevation-z]),
.mdmContainer .mat-mini-fab[disabled]:not([class*=mat-elevation-z]) {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, .2), 0 0 0 0 rgba(0, 0, 0, .14), 0 0 0 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-button-toggle-group,
.mdmContainer .mat-button-toggle-standalone {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-button-toggle-group-appearance-standard,
.mdmContainer .mat-button-toggle-standalone.mat-button-toggle-appearance-standard {
  box-shadow: none;
  border: solid 1px rgba(0, 0, 0, .12)
}


.mdmContainer .mat-button-toggle .mat-button-toggle-focus-overlay {
  background-color: rgba(0, 0, 0, .12)
}

.mdmContainer .mat-button-toggle-appearance-standard {
  color: rgba(0, 0, 0, .87);
  background: #fff
}

.mdmContainer .mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
  background-color: #000
}

.mdmContainer .mat-button-toggle-group-appearance-standard .mat-button-toggle+.mat-button-toggle {
  border-left: solid 1px rgba(0, 0, 0, .12)
}

[dir=rtl] .mdmContainer .mat-button-toggle-group-appearance-standard .mat-button-toggle+.mat-button-toggle {
  border-left: none;
  border-right: solid 1px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle+.mat-button-toggle {
  border-left: none;
  border-right: none;
  border-top: solid 1px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-button-toggle-checked {
  background-color: #e0e0e0;
  color: rgba(0, 0, 0, .54)
}

.mdmContainer .mat-button-toggle-checked.mat-button-toggle-appearance-standard {
  color: rgba(0, 0, 0, .87)
}

.mdmContainer .mat-button-toggle-disabled {
  color: rgba(0, 0, 0, .26);
  background-color: #eee
}

.mdmContainer .mat-button-toggle-disabled.mat-button-toggle-appearance-standard {
  background: #fff
}

.mdmContainer .mat-button-toggle-disabled.mat-button-toggle-checked {
  background-color: #6A6868
}

.mdmContainer .mat-card:not([class*=mat-elevation-z]) {
  box-shadow: none;
}

.mdmContainer .mat-card.mat-card-flat:not([class*=mat-elevation-z]) {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, .2), 0 0 0 0 rgba(0, 0, 0, .14), 0 0 0 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-card-subtitle {
  color: rgba(0, 0, 0, .54)
}

.mdmContainer .mat-checkbox-frame {
  border-color: rgba(0, 0, 0, .54)
}

.mdmContainer .mat-checkbox-checkmark {
  fill: #fafafa
}

.mdmContainer .mat-checkbox-checkmark-path {
  stroke: #fafafa !important
}

@media (-ms-high-contrast:black-on-white) {
  .mdmContainer .mat-checkbox-checkmark-path {
    stroke: #000 !important
  }
}

.mdmContainer .mat-checkbox-mixedmark {
  background-color: #fafafa
}

.mdmContainer .mat-checkbox-checked.mat-primary .mat-checkbox-background,
.mdmContainer .mat-checkbox-indeterminate.mat-primary .mat-checkbox-background {
  background-color: rgb(39, 174, 96)
}

.mdmContainer .mat-checkbox-checked.mat-accent .mat-checkbox-background,
.mdmContainer .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
  background-color: #27ae60
}

.mdmContainer .mat-checkbox-checked.mat-warn .mat-checkbox-background,
.mdmContainer .mat-checkbox-indeterminate.mat-warn .mat-checkbox-background {
  background-color: #27ae60
}

.mdmContainer .mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background,
.mdmContainer .mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background {
  background-color: #6A6868
}

.mdmContainer .mat-checkbox-disabled:not(.mat-checkbox-checked) .mat-checkbox-frame {
  border-color: #6A6868
}

.mdmContainer .mat-checkbox-disabled .mat-checkbox-label {
  color: rgba(0, 0, 0, .54)
}

@media (-ms-high-contrast:active) {
  .mdmContainer .mat-checkbox-disabled {
    opacity: .5
  }
}

@media (-ms-high-contrast:active) {
  .mdmContainer .mat-checkbox-background {
    background: 0 0
  }
}

.mdmContainer .mat-checkbox .mat-ripple-element {
  background-color: #000
}

.mdmContainer .mat-checkbox-checked:not(.mat-checkbox-disabled).mat-primary .mat-ripple-element,
.mdmContainer .mat-checkbox:active:not(.mat-checkbox-disabled).mat-primary .mat-ripple-element {
  background: rgb(39, 174, 96)
}

.mdmContainer .mat-checkbox-checked:not(.mat-checkbox-disabled).mat-accent .mat-ripple-element,
.mdmContainer .mat-checkbox:active:not(.mat-checkbox-disabled).mat-accent .mat-ripple-element {
  background: #27ae60
}

.mdmContainer .mat-checkbox-checked:not(.mat-checkbox-disabled).mat-warn .mat-ripple-element,
.mdmContainer .mat-checkbox:active:not(.mat-checkbox-disabled).mat-warn .mat-ripple-element {
  background: #27ae60
}

.mdmContainer .mat-chip.mat-standard-chip {
  background-color: #e0e0e0;
  color: rgba(0, 0, 0, .87)
}

.mdmContainer .mat-chip.mat-standard-chip .mat-chip-remove {
  color: rgba(0, 0, 0, .87);
  opacity: .4
}

.mdmContainer .mat-chip.mat-standard-chip:not(.mat-chip-disabled):active {
  box-shadow: 0 3px 3px -2px rgba(0, 0, 0, .2), 0 3px 4px 0 rgba(0, 0, 0, .14), 0 1px 8px 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-chip.mat-standard-chip:not(.mat-chip-disabled) .mat-chip-remove:hover {
  opacity: .54
}

.mdmContainer .mat-chip.mat-standard-chip.mat-chip-disabled {
  opacity: .4
}

.mdmContainer .mat-chip.mat-standard-chip::after {
  background: #000
}

.mdmContainer .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary {
  background-color: rgb(39, 174, 96);
  color: #fff
}

.mdmContainer .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove {
  color: #fff;
  opacity: .4
}

.mdmContainer .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-ripple-element {
  background: rgba(255, 255, 255, .1)
}

.mdmContainer .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn {
  background-color: #27ae60;
  color: #fff
}

.mdmContainer .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove {
  color: #fff;
  opacity: .4
}

.mdmContainer .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-ripple-element {
  background: rgba(255, 255, 255, .1)
}

.mdmContainer .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent {
  background-color: #27ae60;
  color: #fff
}

.mdmContainer .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove {
  color: #fff;
  opacity: .4
}

.mdmContainer .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-ripple-element {
  background: rgba(255, 255, 255, .1)
}

.mdmContainer .mat-table {
  background: #fff;
  font-family: 'Open Sans', sans-serif
}

.mdmContainer .mat-table tbody,
.mdmContainer .mat-table tfoot,
.mdmContainer .mat-table thead,
.mdmContainer .mat-table-sticky,
.mdmContainer [mat-footer-row],
.mdmContainer [mat-header-row],
.mdmContainer [mat-row],
.mdmContainer mat-footer-row,
.mdmContainer mat-header-row,
.mdmContainer mat-row {
  background: inherit
}

.mdmContainer mat-footer-row,
.mdmContainer mat-header-row,
.mdmContainer mat-row,
.mdmContainer td.mat-cell,
.mdmContainer td.mat-footer-cell,
.mdmContainer th.mat-header-cell {
  border-bottom-color: rgba(0, 0, 0, .12)
}

.mdmContainer .mat-calendar-arrow {
  border-top-color: rgba(0, 0, 0, .54)
}

.mdmContainer .mat-datepicker-content .mat-calendar-next-button,
.mdmContainer .mat-datepicker-content .mat-calendar-previous-button,
.mdmContainer .mat-datepicker-toggle {
  color: rgba(0, 0, 0, .54)
}

.mdmContainer .mat-calendar-table-header {
  color: rgba(0, 0, 0, .38)
}

.mdmContainer .mat-calendar-table-header-divider::after {
  background: rgba(0, 0, 0, .12)
}

.mdmContainer .mat-calendar-body-label {
  color: rgba(0, 0, 0, .54)
}

.mdmContainer .mat-calendar-body-cell-content {
  color: rgba(0, 0, 0, .87);
  border-color: transparent
}

.mdmContainer .mat-calendar-body-disabled>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {
  color: rgba(0, 0, 0, .38)
}

.mdmContainer .cdk-keyboard-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected),
.mdmContainer .cdk-program-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected),
.mdmContainer .mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {
  background-color: rgba(0, 0, 0, .04)
}

.mdmContainer .mat-calendar-body-today:not(.mat-calendar-body-selected) {
  border-color: rgba(0, 0, 0, .38)
}

.mdmContainer .mat-calendar-body-disabled>.mat-calendar-body-today:not(.mat-calendar-body-selected) {
  border-color: rgba(0, 0, 0, .18)
}

.mdmContainer .mat-calendar-body-selected {
  background-color: rgb(39, 174, 96);
  color: #fff
}

.mdmContainer .mat-calendar-body-disabled>.mat-calendar-body-selected {
  background-color: rgba(63, 81, 181, .4)
}

.mdmContainer .mat-calendar-body-today.mat-calendar-body-selected {
  box-shadow: inset 0 0 0 1px #fff
}

.mdmContainer .mat-datepicker-content {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);
  background-color: #fff;
  color: rgba(0, 0, 0, .87)
}

.mdmContainer .mat-datepicker-content.mat-accent .mat-calendar-body-selected {
  background-color: #27ae60;
  color: #fff
}

.mdmContainer .mat-datepicker-content.mat-accent .mat-calendar-body-disabled>.mat-calendar-body-selected {
  background-color: rgba(255, 64, 129, .4)
}

.mdmContainer .mat-datepicker-content.mat-accent .mat-calendar-body-today.mat-calendar-body-selected {
  box-shadow: inset 0 0 0 1px #fff
}

.mdmContainer .mat-datepicker-content.mat-warn .mat-calendar-body-selected {
  background-color: #27ae60;
  color: #fff
}

.mdmContainer .mat-datepicker-content.mat-warn .mat-calendar-body-disabled>.mat-calendar-body-selected {
  background-color: rgba(244, 67, 54, .4)
}

.mdmContainer .mat-datepicker-content.mat-warn .mat-calendar-body-today.mat-calendar-body-selected {
  box-shadow: inset 0 0 0 1px #fff
}

.mdmContainer .mat-datepicker-content-touch {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, .2), 0 0 0 0 rgba(0, 0, 0, .14), 0 0 0 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-datepicker-toggle-active {
  color: rgb(39, 174, 96)
}

.mdmContainer .mat-datepicker-toggle-active.mat-accent {
  color: #27ae60
}

.mdmContainer .mat-datepicker-toggle-active.mat-warn {
  color: #27ae60
}

.mdmContainer .mat-dialog-container {
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, .2), 0 24px 38px 3px rgba(0, 0, 0, .14), 0 9px 46px 8px rgba(0, 0, 0, .12);
  background: #fff;
  color: rgba(0, 0, 0, .87)
}

.mdmContainer .mat-divider-vertical {
  border-right-color: rgba(0, 0, 0, .12)
}

.mdmContainer .mat-expansion-panel {
  background: #fff;
  color: rgba(0, 0, 0, .87)
}

.mdmContainer .mat-expansion-panel:not([class*=mat-elevation-z]) {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-action-row {
  border-top-color: rgba(0, 0, 0, .12)
}

.mdmContainer .mat-expansion-panel .mat-expansion-panel-header.cdk-keyboard-focused:not([aria-disabled=true]),
.mdmContainer .mat-expansion-panel .mat-expansion-panel-header.cdk-program-focused:not([aria-disabled=true]),
.mdmContainer .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:hover:not([aria-disabled=true]) {
  background: rgba(0, 0, 0, .04)
}

@media (hover:none) {
  .mdmContainer .mat-expansion-panel:not(.mat-expanded):not([aria-disabled=true]) .mat-expansion-panel-header:hover {
    background: #fff
  }
}

.mdmContainer .mat-expansion-panel-header-title {
  color: rgba(0, 0, 0, .87);
  font-weight: 600;
}

.mdmContainer .mat-expansion-indicator::after,
.mdmContainer .mat-expansion-panel-header-description {
  color: rgba(0, 0, 0, .54)
}

.mdmContainer .mat-expansion-panel-header[aria-disabled=true] {
  color: rgba(0, 0, 0, .26)
}

.mdmContainer .mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-description,
.mdmContainer .mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-title {
  color: inherit
}

.mdmContainer .mat-hint {
  color: rgba(0, 0, 0, .6)
}

.mdmContainer .mat-form-field.mat-focused .mat-form-field-label {
  color: rgb(39, 174, 96)
}

.mdmContainer .mat-form-field.mat-focused .mat-form-field-label.mat-accent {
  color: #27ae60
}

.mdmContainer .mat-form-field.mat-focused .mat-form-field-label.mat-warn {
  color: #27ae60
}

.mdmContainer .mat-focused .mat-form-field-required-marker {
  color: #27ae60
}

.mdmContainer .mat-form-field-ripple {
  background-color: rgba(0, 0, 0, .87)
}

.mdmContainer .mat-form-field.mat-focused .mat-form-field-ripple {
  background-color: rgb(39, 174, 96)
}

.mdmContainer .mat-form-field.mat-focused .mat-form-field-ripple.mat-accent {
  background-color: #27ae60
}

.mdmContainer .mat-form-field.mat-focused .mat-form-field-ripple.mat-warn {
  background-color: #27ae60
}

.mdmContainer .mat-form-field-type-mat-native-select.mat-focused:not(.mat-form-field-invalid) .mat-form-field-infix::after {
  color: rgb(39, 174, 96)
}

.mdmContainer .mat-form-field-type-mat-native-select.mat-focused:not(.mat-form-field-invalid).mat-accent .mat-form-field-infix::after {
  color: #27ae60
}

.mdmContainer .mat-form-field-type-mat-native-select.mat-focused:not(.mat-form-field-invalid).mat-warn .mat-form-field-infix::after {
  color: #27ae60
}

.mdmContainer .mat-form-field.mat-form-field-invalid .mat-form-field-label {
  color: red;
}

.mdmContainer .mat-form-field.mat-form-field-invalid .mat-form-field-label .mat-form-field-required-marker,
.mdmContainer .mat-form-field.mat-form-field-invalid .mat-form-field-label.mat-accent {
  color: red;
}
.mdmContainer .mat-form-field.mat-form-field-invalid .mat-form-field-label .mat-form-field-required-marker {
  display: none;
}

.mdmContainer .mat-form-field.mat-form-field-invalid .mat-form-field-ripple,
.mdmContainer .mat-form-field.mat-form-field-invalid .mat-form-field-ripple.mat-accent {
  background-color: #27ae60
}

.mdmContainer .mat-error {
  color: #27ae60
}

.mdmContainer .mat-form-field-appearance-legacy .mat-form-field-label {
  color: rgba(0, 0, 0, .54);
  top: 1.28125em
}

.mdmContainer .mat-form-field-appearance-legacy .mat-hint {
  color: rgba(0, 0, 0, .54)
}


.mdmContainer .mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline {
  background-image: linear-gradient(to right, rgba(0, 0, 0, .42) 0, rgba(0, 0, 0, .42) 33%, transparent 0);
  background-size: 4px 100%;
  background-repeat: repeat-x
}

.mdmContainer .mat-form-field-appearance-standard .mat-form-field-underline {
  background-color: rgba(0, 0, 0, .42)
}

.mdmContainer .mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline {
  background-image: linear-gradient(to right, rgba(0, 0, 0, .42) 0, rgba(0, 0, 0, .42) 33%, transparent 0);
  background-size: 4px 100%;
  background-repeat: repeat-x
}

.mdmContainer .mat-form-field-appearance-fill .mat-form-field-flex {
  background-color: rgba(0, 0, 0, .04)
}

.mdmContainer .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex {
  background-color: rgba(0, 0, 0, .02)
}

.mdmContainer .mat-form-field-appearance-fill .mat-form-field-underline::before {
  background-color: rgba(0, 0, 0, .42)
}

.mdmContainer .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-label {
  color: rgba(0, 0, 0, .38)
}

.mdmContainer .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-underline::before {
  background-color: transparent
}

.mdmContainer .mat-form-field-appearance-outline .mat-form-field-outline-thick {
  color: rgba(0, 0, 0, .87)
}

.mdmContainer .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {
  color: rgb(39, 174, 96)
}

.mdmContainer .mat-form-field-appearance-outline.mat-focused.mat-accent .mat-form-field-outline-thick {
  color: #27ae60
}

.mdmContainer .mat-form-field-appearance-outline.mat-focused.mat-warn .mat-form-field-outline-thick {
  color: #27ae60
}

.mdmContainer .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-label {
  color: rgba(0, 0, 0, .38)
}

.mdmContainer .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {
  color: rgba(0, 0, 0, .06)
}

.mdmContainer .mat-icon.mat-primary {
  color: rgb(39, 174, 96)
}

.mdmContainer .mat-icon.mat-accent {
  color: #27ae60
}

.mdmContainer .mat-icon.mat-warn {
  color: #27ae60
}

.mdmContainer .mat-form-field-type-mat-native-select .mat-form-field-infix::after {
  color: rgba(0, 0, 0, .54)
}

.mdmContainer .mat-form-field-type-mat-native-select.mat-form-field-disabled .mat-form-field-infix::after,
.mdmContainer .mat-input-element:disabled {
  color: rgba(0, 0, 0, .38);
  background-color: #eee;
  opacity: 1;
  width: 100%;
  border-radius: 0 !important;
}

.mdmContainer .mat-input-element {
  caret-color: rgb(39, 174, 96);
  padding: 4px;
  font-size: 1.6rem;
}

.mdmContainer textarea.mat-input-element {
  padding: 8px 4px !important;
}
.mdmContainer .mat-input-element::placeholder {
  color: rgba(0, 0, 0, .42)
}

.mdmContainer .mat-input-element::-moz-placeholder {
  color: rgba(0, 0, 0, .42)
}

.mdmContainer .mat-input-element::-webkit-input-placeholder {
  color: rgba(0, 0, 0, .42)
}

.mdmContainer .mat-input-element:-ms-input-placeholder {
  color: rgba(0, 0, 0, .42)
}

.mdmContainer .mat-accent .mat-input-element {
  caret-color: #27ae60
}

.mdmContainer .mat-form-field-invalid .mat-input-element,
.mdmContainer .mat-warn .mat-input-element {
  caret-color: #27ae60
}

.mdmContainer .mat-form-field-type-mat-native-select.mat-form-field-invalid .mat-form-field-infix::after {
  color: #27ae60
}

.mdmContainer .mat-list-base .mat-list-item {
  color: rgba(0, 0, 0, .87);
  font-size: 16px
}


.mdmContainer .mat-list-base .mat-subheader {
  color: rgba(0, 0, 0, .54);
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 500
}

.mdmContainer .mat-list-item-disabled {
  background-color: #eee
}

.mdmContainer .mat-action-list .mat-list-item:focus,
.mdmContainer .mat-action-list .mat-list-item:hover,
.mdmContainer .mat-list-option:focus,
.mdmContainer .mat-list-option:hover,
.mdmContainer .mat-nav-list .mat-list-item:focus,
.mdmContainer .mat-nav-list .mat-list-item:hover {
  background: rgba(0, 0, 0, .04)
}

.mdmContainer .mat-menu-panel {
  background: #fff
}

.mdmContainer .mat-menu-panel:not([class*=mat-elevation-z]) {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-menu-item[disabled],
.mdmContainer .mat-menu-item[disabled]::after {
  color: rgba(0, 0, 0, .38)
}

.mdmContainer .mat-menu-item .mat-icon-no-color,
.mdmContainer .mat-menu-item-submenu-trigger::after {
  color: rgba(0, 0, 0, .54)
}

.mdmContainer .mat-menu-item-highlighted:not([disabled]),
.mdmContainer .mat-menu-item.cdk-keyboard-focused:not([disabled]),
.mdmContainer .mat-menu-item.cdk-program-focused:not([disabled]),
.mdmContainer .mat-menu-item:hover:not([disabled]) {
  background: rgba(0, 0, 0, .04)
}

.mdmContainer .mat-paginator-decrement,
.mdmContainer .mat-paginator-increment {
  border-top: 2px solid rgba(0, 0, 0, .54);
  border-right: 2px solid rgba(0, 0, 0, .54)
}

.mdmContainer .mat-paginator-first,
.mdmContainer .mat-paginator-last {
  border-top: 2px solid rgba(0, 0, 0, .54)
}

.mdmContainer .mat-icon-button[disabled] .mat-paginator-decrement,
.mdmContainer .mat-icon-button[disabled] .mat-paginator-first,
.mdmContainer .mat-icon-button[disabled] .mat-paginator-increment,
.mdmContainer .mat-icon-button[disabled] .mat-paginator-last {
  border-color: rgba(0, 0, 0, .38)
}

.mdmContainer .mat-progress-bar-background {
  fill: #c5cae9
}

.mdmContainer .mat-progress-bar-buffer {
  background-color: #c5cae9
}

.mdmContainer .mat-progress-bar-fill::after {
  background-color: rgb(39, 174, 96)
}

.mdmContainer .mat-progress-bar.mat-accent .mat-progress-bar-background {
  fill: #ff80ab
}

.mdmContainer .mat-progress-bar.mat-accent .mat-progress-bar-buffer {
  background-color: #ff80ab
}

.mdmContainer .mat-progress-bar.mat-accent .mat-progress-bar-fill::after {
  background-color: #27ae60
}

.mdmContainer .mat-progress-bar.mat-warn .mat-progress-bar-background {
  fill: #ffcdd2
}

.mdmContainer .mat-progress-bar.mat-warn .mat-progress-bar-buffer {
  background-color: #ffcdd2
}

.mdmContainer .mat-progress-bar.mat-warn .mat-progress-bar-fill::after {
  background-color: #27ae60
}

.mdmContainer .mat-progress-spinner circle,
.mdmContainer .mat-spinner circle {
  stroke: rgb(39, 174, 96)
}

.mdmContainer .mat-progress-spinner.mat-accent circle,
.mdmContainer .mat-spinner.mat-accent circle {
  stroke: #27ae60
}

.mdmContainer .mat-progress-spinner.mat-warn circle,
.mdmContainer .mat-spinner.mat-warn circle {
  stroke: #27ae60
}

.mdmContainer .mat-radio-outer-circle {
  border-color: rgba(0, 0, 0, .54)
}

.mdmContainer .mat-radio-button.mat-primary.mat-radio-checked .mat-radio-outer-circle {
  border-color: rgb(39, 174, 96)
}

.mdmContainer .mat-radio-button.mat-primary .mat-radio-inner-circle,
.mdmContainer .mat-radio-button.mat-primary .mat-radio-ripple .mat-ripple-element:not(.mat-radio-persistent-ripple),
.mdmContainer .mat-radio-button.mat-primary.mat-radio-checked .mat-radio-persistent-ripple,
.mdmContainer .mat-radio-button.mat-primary:active .mat-radio-persistent-ripple {
  background-color: rgb(39, 174, 96)
}

.mdmContainer .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {
  border-color: #27AE60
}

.mdmContainer .mat-radio-button.mat-accent .mat-radio-inner-circle,
.mdmContainer .mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element:not(.mat-radio-persistent-ripple),
.mdmContainer .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-persistent-ripple,
.mdmContainer .mat-radio-button.mat-accent:active .mat-radio-persistent-ripple {
  background-color: #27AE60
}

.mdmContainer .mat-radio-button.mat-warn.mat-radio-checked .mat-radio-outer-circle {
  border-color: #27AE60
}

.mdmContainer .mat-radio-button.mat-warn .mat-radio-inner-circle,
.mdmContainer .mat-radio-button.mat-warn .mat-radio-ripple .mat-ripple-element:not(.mat-radio-persistent-ripple),
.mdmContainer .mat-radio-button.mat-warn.mat-radio-checked .mat-radio-persistent-ripple,
.mdmContainer .mat-radio-button.mat-warn:active .mat-radio-persistent-ripple {
  background-color: #27AE60
}

.mdmContainer .mat-radio-button.mat-radio-disabled .mat-radio-outer-circle,
.mdmContainer .mat-radio-button.mat-radio-disabled.mat-radio-checked .mat-radio-outer-circle {
  border-color: rgba(0, 0, 0, .38)
}

.mdmContainer .mat-radio-button.mat-radio-disabled .mat-radio-inner-circle,
.mdmContainer .mat-radio-button.mat-radio-disabled .mat-radio-ripple .mat-ripple-element {
  background-color: rgba(0, 0, 0, .38)
}

.mdmContainer .mat-radio-button.mat-radio-disabled .mat-radio-label-content {
  color: rgba(0, 0, 0, .38)
}

.mdmContainer .mat-radio-button .mat-ripple-element {
  background-color: #000
}

.mdmContainer .mat-select-value {
  color: rgba(0, 0, 0, .87);
      padding: 2px 0;
}

.mdmContainer .mat-select-placeholder {
  color: rgba(0, 0, 0, .42)
}

.mdmContainer .mat-select-disabled .mat-select-value {
  color: rgba(0, 0, 0, .38)
}

.mdmContainer .mat-select-arrow {
  color: rgba(0, 0, 0, .54)
}

.mdmContainer .mat-select-panel {
  background: #fff
}

.mdmContainer .mat-select-panel:not([class*=mat-elevation-z]) {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12)
}

.mdmContainer .mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple) {
  background: rgba(0, 0, 0, .12)
}


.mdmContainer .mat-form-field.mat-focused.mat-accent .mat-select-arrow {
  color: #27ae60
}

.mdmContainer .mat-form-field.mat-focused.mat-warn .mat-select-arrow {
  color: #27ae60
}

.mdmContainer .mat-form-field .mat-select.mat-select-invalid .mat-select-arrow {
  color: red;
}

.mdmContainer .mat-form-field .mat-select.mat-select-disabled .mat-select-arrow {
  color: rgba(0, 0, 0, .38)
}

.mdmContainer .mat-drawer-container {
  background-color: #fafafa;
  color: rgba(0, 0, 0, .87)
}

.mdmContainer .mat-drawer {
  background-color: #fff;
  color: rgba(0, 0, 0, .87)
}

.mdmContainer .mat-drawer.mat-drawer-push {
  background-color: #fff
}

.mdmContainer .mat-drawer:not(.mat-drawer-side) {
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, .2), 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-drawer-side {
  border-right: solid 1px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-drawer-side.mat-drawer-end {
  border-left: solid 1px rgba(0, 0, 0, .12);
  border-right: none
}

[dir=rtl] .mdmContainer .mat-drawer-side {
  border-left: solid 1px rgba(0, 0, 0, .12);
  border-right: none
}

[dir=rtl] .mdmContainer .mat-drawer-side.mat-drawer-end {
  border-left: none;
  border-right: solid 1px rgba(0, 0, 0, .12)
}

.mdmContainer .mat-drawer-backdrop.mat-drawer-shown {
  background-color: rgba(0, 0, 0, .6)
}

.mdmContainer .mat-slide-toggle.mat-checked .mat-slide-toggle-thumb {
  background-color: #27ae60
}

.mdmContainer .mat-slide-toggle.mat-checked .mat-slide-toggle-bar {
  background-color: rgba(255, 64, 129, .54)
}

.mdmContainer .mat-slide-toggle.mat-checked .mat-ripple-element {
  background-color: #27ae60
}

.mdmContainer .mat-slide-toggle.mat-primary.mat-checked .mat-slide-toggle-thumb {
  background-color: rgb(39, 174, 96)
}

.mdmContainer .mat-slide-toggle.mat-primary.mat-checked .mat-slide-toggle-bar {
  background-color: rgba(63, 81, 181, .54)
}

.mdmContainer .mat-slide-toggle.mat-primary.mat-checked .mat-ripple-element {
  background-color: rgb(39, 174, 96)
}

.mdmContainer .mat-slide-toggle.mat-warn.mat-checked .mat-slide-toggle-thumb {
  background-color: #27ae60
}

.mdmContainer .mat-slide-toggle.mat-warn.mat-checked .mat-slide-toggle-bar {
  background-color: rgba(244, 67, 54, .54)
}

.mdmContainer .mat-slide-toggle.mat-warn.mat-checked .mat-ripple-element {
  background-color: #27ae60
}

.mdmContainer .mat-slide-toggle:not(.mat-checked) .mat-ripple-element {
  background-color: #000
}

.mdmContainer .mat-slide-toggle-thumb {
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
  background-color: #fafafa
}

.mdmContainer .mat-slide-toggle-bar {
  background-color: rgba(0, 0, 0, .38)
}

.mdmContainer .mat-slider-track-background {
  background-color: rgba(0, 0, 0, .26)
}

.mdmContainer .mat-primary .mat-slider-thumb,
.mdmContainer .mat-primary .mat-slider-thumb-label,
.mdmContainer .mat-primary .mat-slider-track-fill {
  background-color: rgb(39, 174, 96)
}

.mdmContainer .mat-primary .mat-slider-thumb-label-text {
  color: #fff
}

.mdmContainer .mat-accent .mat-slider-thumb,
.mdmContainer .mat-accent .mat-slider-thumb-label,
.mdmContainer .mat-accent .mat-slider-track-fill {
  background-color: #27ae60
}

.mdmContainer .mat-accent .mat-slider-thumb-label-text {
  color: #fff
}

.mdmContainer .mat-warn .mat-slider-thumb,
.mdmContainer .mat-warn .mat-slider-thumb-label,
.mdmContainer .mat-warn .mat-slider-track-fill {
  background-color: #27ae60
}

.mdmContainer .mat-warn .mat-slider-thumb-label-text {
  color: #fff
}

.mdmContainer .mat-slider-focus-ring {
  background-color: rgba(255, 64, 129, .2)
}

.mdmContainer .cdk-focused .mat-slider-track-background,
.mdmContainer .mat-slider:hover .mat-slider-track-background {
  background-color: rgba(0, 0, 0, .38)
}

.mdmContainer .mat-slider-disabled .mat-slider-thumb,
.mdmContainer .mat-slider-disabled .mat-slider-track-background,
.mdmContainer .mat-slider-disabled .mat-slider-track-fill {
  background-color: rgba(0, 0, 0, .26)
}

.mdmContainer .mat-slider-disabled:hover .mat-slider-track-background {
  background-color: rgba(0, 0, 0, .26)
}

.mdmContainer .mat-slider-min-value .mat-slider-focus-ring {
  background-color: rgba(0, 0, 0, .12)
}

.mdmContainer .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb,
.mdmContainer .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb-label {
  background-color: rgba(0, 0, 0, .87)
}

.mdmContainer .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb,
.mdmContainer .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb-label {
  background-color: rgba(0, 0, 0, .26)
}

.mdmContainer .mat-slider-min-value:not(.mat-slider-thumb-label-showing) .mat-slider-thumb {
  border-color: rgba(0, 0, 0, .26);
  background-color: transparent
}

.mdmContainer .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused .mat-slider-thumb,
.mdmContainer .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover .mat-slider-thumb {
  border-color: rgba(0, 0, 0, .38)
}

.mdmContainer .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused.mat-slider-disabled .mat-slider-thumb,
.mdmContainer .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover.mat-slider-disabled .mat-slider-thumb {
  border-color: rgba(0, 0, 0, .26)
}

.mdmContainer .mat-slider-has-ticks .mat-slider-wrapper::after {
  border-color: rgba(0, 0, 0, .7)
}

.mdmContainer .mat-slider-horizontal .mat-slider-ticks {
  background-image: repeating-linear-gradient(to right, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7) 2px, transparent 0, transparent);
  background-image: -moz-repeating-linear-gradient(.0001deg, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7) 2px, transparent 0, transparent)
}

.mdmContainer .mat-slider-vertical .mat-slider-ticks {
  background-image: repeating-linear-gradient(to bottom, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7) 2px, transparent 0, transparent)
}

.mdmContainer .mat-step-header.cdk-keyboard-focused,
.mdmContainer .mat-step-header.cdk-program-focused,
.mdmContainer .mat-step-header:hover {
  background-color: rgba(0, 0, 0, .04)
}

@media (hover:none) {
  .mdmContainer .mat-step-header:hover {
    background: 0 0
  }
}

.mdmContainer .mat-step-header .mat-step-label,
.mdmContainer .mat-step-header .mat-step-optional {
  color: rgba(0, 0, 0, .54)
}

.mdmContainer .mat-step-header .mat-step-icon {
  background-color: rgba(0, 0, 0, .54);
  color: #fff
}

.mdmContainer .mat-step-header .mat-step-icon-selected,
.mdmContainer .mat-step-header .mat-step-icon-state-done,
.mdmContainer .mat-step-header .mat-step-icon-state-edit {
  background-color: rgb(39, 174, 96);
  color: #fff
}

.mdmContainer .mat-step-header .mat-step-icon-state-error {
  background-color: transparent;
  color: #27ae60
}

.mdmContainer .mat-step-header .mat-step-label.mat-step-label-active {
  color: rgba(0, 0, 0, .87)
}

.mdmContainer .mat-step-header .mat-step-label.mat-step-label-error {
  color: #27ae60
}

.mdmContainer .mat-stepper-horizontal,
.mdmContainer .mat-stepper-vertical {
  background-color: #fff;
  font-family: 'Open Sans', sans-serif !important;
}

.mdmContainer .mat-stepper-vertical-line::before {
  border-left-color: rgba(0, 0, 0, .12)
}

.mdmContainer .mat-horizontal-stepper-header::after,
.mdmContainer .mat-horizontal-stepper-header::before,
.mdmContainer .mat-stepper-horizontal-line {
  border-top-color: rgba(0, 0, 0, .12)
}

.mdmContainer .mat-sort-header-arrow {
  color: #757575
}

.mdmContainer .mat-tab-header,
.mdmContainer .mat-tab-nav-bar {
  border-bottom: 1px solid rgba(0, 0, 0, .12)
}

.mdmContainer .mat-tab-group-inverted-header .mat-tab-header,
.mdmContainer .mat-tab-group-inverted-header .mat-tab-nav-bar {
  border-top: 1px solid rgba(0, 0, 0, .12);
  border-bottom: none
}

.mdmContainer .mat-tab-label.mat-tab-disabled,
.mdmContainer .mat-tab-link.mat-tab-disabled {
  color: rgba(0, 0, 0, .38)
}

.mdmContainer .mat-tab-header-pagination-chevron {
  border-color: rgba(0, 0, 0, .87)
}

.mdmContainer .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {
  border-color: rgba(0, 0, 0, .38)
}

.mdmContainer .mat-tab-group[class*=mat-background-] .mat-tab-header,
.mdmContainer .mat-tab-nav-bar[class*=mat-background-] {
  border-bottom: none;
  border-top: none
}

.mdmContainer .mat-tab-group.mat-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-group.mat-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-group.mat-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-group.mat-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {
  background-color: rgba(197, 202, 233, .3)
}

.mdmContainer .mat-tab-group.mat-primary .mat-ink-bar,
.mdmContainer .mat-tab-nav-bar.mat-primary .mat-ink-bar {
  background-color: rgb(39, 174, 96)
}

.mdmContainer .mat-tab-group.mat-primary.mat-background-primary .mat-ink-bar,
.mdmContainer .mat-tab-nav-bar.mat-primary.mat-background-primary .mat-ink-bar {
  background-color: #fff
}

.mdmContainer .mat-tab-group.mat-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-group.mat-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-group.mat-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-group.mat-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {
  background-color: rgba(255, 128, 171, .3)
}

.mdmContainer .mat-tab-group.mat-accent .mat-ink-bar,
.mdmContainer .mat-tab-nav-bar.mat-accent .mat-ink-bar {
  background-color: #27ae60
}

.mdmContainer .mat-tab-group.mat-accent.mat-background-accent .mat-ink-bar,
.mdmContainer .mat-tab-nav-bar.mat-accent.mat-background-accent .mat-ink-bar {
  background-color: #fff
}

.mdmContainer .mat-tab-group.mat-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-group.mat-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-group.mat-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-group.mat-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {
  background-color: rgba(255, 205, 210, .3)
}

.mdmContainer .mat-tab-group.mat-warn .mat-ink-bar,
.mdmContainer .mat-tab-nav-bar.mat-warn .mat-ink-bar {
  background-color: #27ae60
}

.mdmContainer .mat-tab-group.mat-warn.mat-background-warn .mat-ink-bar,
.mdmContainer .mat-tab-nav-bar.mat-warn.mat-background-warn .mat-ink-bar {
  background-color: #fff
}

.mdmContainer .mat-tab-group.mat-background-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-group.mat-background-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-group.mat-background-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-group.mat-background-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {
  background-color: rgba(197, 202, 233, .3)
}

.mdmContainer .mat-tab-group.mat-background-primary .mat-tab-header,
.mdmContainer .mat-tab-group.mat-background-primary .mat-tab-header-pagination,
.mdmContainer .mat-tab-group.mat-background-primary .mat-tab-links,
.mdmContainer .mat-tab-nav-bar.mat-background-primary .mat-tab-header,
.mdmContainer .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination,
.mdmContainer .mat-tab-nav-bar.mat-background-primary .mat-tab-links {
  background-color: rgb(39, 174, 96)
}

.mdmContainer .mat-tab-group.mat-background-primary .mat-tab-label,
.mdmContainer .mat-tab-group.mat-background-primary .mat-tab-link,
.mdmContainer .mat-tab-nav-bar.mat-background-primary .mat-tab-label,
.mdmContainer .mat-tab-nav-bar.mat-background-primary .mat-tab-link {
  color: #fff
}

.mdmContainer .mat-tab-group.mat-background-primary .mat-tab-label.mat-tab-disabled,
.mdmContainer .mat-tab-group.mat-background-primary .mat-tab-link.mat-tab-disabled,
.mdmContainer .mat-tab-nav-bar.mat-background-primary .mat-tab-label.mat-tab-disabled,
.mdmContainer .mat-tab-nav-bar.mat-background-primary .mat-tab-link.mat-tab-disabled {
  color: rgba(255, 255, 255, .4)
}

.mdmContainer .mat-tab-group.mat-background-primary .mat-tab-header-pagination-chevron,
.mdmContainer .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-chevron {
  border-color: #fff
}

.mdmContainer .mat-tab-group.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,
.mdmContainer .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {
  border-color: rgba(255, 255, 255, .4)
}

.mdmContainer .mat-tab-group.mat-background-primary .mat-ripple-element,
.mdmContainer .mat-tab-nav-bar.mat-background-primary .mat-ripple-element {
  background-color: rgba(255, 255, 255, .12)
}

.mdmContainer .mat-tab-group.mat-background-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-group.mat-background-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-group.mat-background-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-group.mat-background-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {
  background-color: rgba(255, 128, 171, .3)
}

.mdmContainer .mat-tab-group.mat-background-accent .mat-tab-header,
.mdmContainer .mat-tab-group.mat-background-accent .mat-tab-header-pagination,
.mdmContainer .mat-tab-group.mat-background-accent .mat-tab-links,
.mdmContainer .mat-tab-nav-bar.mat-background-accent .mat-tab-header,
.mdmContainer .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination,
.mdmContainer .mat-tab-nav-bar.mat-background-accent .mat-tab-links {
  background-color: #27ae60
}

.mdmContainer .mat-tab-group.mat-background-accent .mat-tab-label,
.mdmContainer .mat-tab-group.mat-background-accent .mat-tab-link,
.mdmContainer .mat-tab-nav-bar.mat-background-accent .mat-tab-label,
.mdmContainer .mat-tab-nav-bar.mat-background-accent .mat-tab-link {
  color: #fff
}

.mdmContainer .mat-tab-group.mat-background-accent .mat-tab-label.mat-tab-disabled,
.mdmContainer .mat-tab-group.mat-background-accent .mat-tab-link.mat-tab-disabled,
.mdmContainer .mat-tab-nav-bar.mat-background-accent .mat-tab-label.mat-tab-disabled,
.mdmContainer .mat-tab-nav-bar.mat-background-accent .mat-tab-link.mat-tab-disabled {
  color: rgba(255, 255, 255, .4)
}

.mdmContainer .mat-tab-group.mat-background-accent .mat-tab-header-pagination-chevron,
.mdmContainer .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-chevron {
  border-color: #fff
}

.mdmContainer .mat-tab-group.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,
.mdmContainer .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {
  border-color: rgba(255, 255, 255, .4)
}

.mdmContainer .mat-tab-group.mat-background-accent .mat-ripple-element,
.mdmContainer .mat-tab-nav-bar.mat-background-accent .mat-ripple-element {
  background-color: rgba(255, 255, 255, .12)
}

.mdmContainer .mat-tab-group.mat-background-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-group.mat-background-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-group.mat-background-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-group.mat-background-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),
.mdmContainer .mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {
  background-color: rgba(255, 205, 210, .3)
}

.mdmContainer .mat-tab-group.mat-background-warn .mat-tab-header,
.mdmContainer .mat-tab-group.mat-background-warn .mat-tab-header-pagination,
.mdmContainer .mat-tab-group.mat-background-warn .mat-tab-links,
.mdmContainer .mat-tab-nav-bar.mat-background-warn .mat-tab-header,
.mdmContainer .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination,
.mdmContainer .mat-tab-nav-bar.mat-background-warn .mat-tab-links {
  background-color: #27ae60
}

.mdmContainer .mat-tab-group.mat-background-warn .mat-tab-label,
.mdmContainer .mat-tab-group.mat-background-warn .mat-tab-link,
.mdmContainer .mat-tab-nav-bar.mat-background-warn .mat-tab-label,
.mdmContainer .mat-tab-nav-bar.mat-background-warn .mat-tab-link {
  color: #fff
}

.mdmContainer .mat-tab-group.mat-background-warn .mat-tab-label.mat-tab-disabled,
.mdmContainer .mat-tab-group.mat-background-warn .mat-tab-link.mat-tab-disabled,
.mdmContainer .mat-tab-nav-bar.mat-background-warn .mat-tab-label.mat-tab-disabled,
.mdmContainer .mat-tab-nav-bar.mat-background-warn .mat-tab-link.mat-tab-disabled {
  color: rgba(255, 255, 255, .4)
}

.mdmContainer .mat-tab-group.mat-background-warn .mat-tab-header-pagination-chevron,
.mdmContainer .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-chevron {
  border-color: #fff
}

.mdmContainer .mat-tab-group.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,
.mdmContainer .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {
  border-color: rgba(255, 255, 255, .4)
}

.mdmContainer .mat-tab-group.mat-background-warn .mat-ripple-element,
.mdmContainer .mat-tab-nav-bar.mat-background-warn .mat-ripple-element {
  background-color: rgba(255, 255, 255, .12)
}

.mdmContainer .mat-toolbar {
  background: #f5f5f5;
  color: rgba(0, 0, 0, .87)
}

.mdmContainer .mat-toolbar.mat-primary {
  background: rgb(39, 174, 96);
  color: #fff
}

.mdmContainer .mat-toolbar.mat-accent {
  background: #27ae60;
  color: #fff
}

.mdmContainer .mat-toolbar.mat-warn {
  background: #27ae60;
  color: #fff
}

.mdmContainer .mat-toolbar .mat-focused .mat-form-field-ripple,
.mdmContainer .mat-toolbar .mat-form-field-ripple,
.mdmContainer .mat-toolbar .mat-form-field-underline {
  background-color: currentColor
}

.mdmContainer .mat-toolbar .mat-focused .mat-form-field-label,
.mdmContainer .mat-toolbar .mat-form-field-label,
.mdmContainer .mat-toolbar .mat-form-field.mat-focused .mat-select-arrow,
.mdmContainer .mat-toolbar .mat-select-arrow,
.mdmContainer .mat-toolbar .mat-select-value {
  color: inherit
}

.mdmContainer .mat-toolbar .mat-input-element {
  caret-color: currentColor
}

.mdmContainer .mat-tree {
  background: #fff;
  font-family: 'Open Sans', sans-serif
}

.mdmContainer .mat-nested-tree-node,
.mdmContainer .mat-tree-node {
  color: rgba(0, 0, 0, .87);
  font-weight: 400;
  font-size: 14px
}

.mdmContainer .mat-snack-bar-container {
  color: rgba(255, 255, 255, .7);
  background: #323232;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12)
}


.mdmContainer .mandatory {
  color: red !important;
}

/* DatePicker CSS */
.mdmDatepicker .mat-calendar-body-today:not(.mat-calendar-body-selected) {
  border-color: #27AE60 !important;
}

.mdmDatepicker .mat-calendar-controls .mat-icon-button {
  width: 5.5rem !important;
  height: 5.5rem !important;
}

.mdmContainer .mat-datepicker-toggle-active {
  color: #27AE60 !important;
}

.mat-datepicker-content .mat-calendar.mdmDatepicker {
  width: 29.6rem !important;
  height: 35.4rem !important;
}

.mdmContainer .mat-datepicker-toggle .mat-icon-button {
  top: 0.3rem !important;
  border-radius: 0 !important;
}

.mdmDialog .mat-datepicker-toggle .mat-icon-button {
  top: 0.3rem !important;
  border-radius: 0 !important;
}

.mdmDatepicker .mat-calendar-body-selected {
  background-color: #27AE60 !important;
}

.mdmDatepicker td.mat-calendar-body-cell {
  font-size: 1.5rem;
  line-height: 2rem;
  padding: 1.8rem 0 !important;
}

.mdmDatepicker thead.mat-calendar-table-header tr th {
  background-color: #f1f1f1;
  color: #1a1a1a;
  font-weight: bold;
  font-size: 1.6rem;
}

/* DatePicker CSS */

/* MatSelect Dropdown CSS */

.mdmContainer .mat-select {
  font-family: 'Open Sans', sans-serif !important;
  position: relative !important;
}

.mat-select-panel.anyClass:not([class*=mat-elevation-z]) {
  box-shadow: none !important;
  position: absolute !important;
  top: 2.6rem !important;
  left: 1.4rem !important;
  border: .1rem solid #ccc !important;
  /* min-width: calc(100% + 12px) !important; */
}


.mdmContainer .mat-select-value-text {
  position: relative;
  top: 1px;
  font-size: 1.6rem !important;
}

.mdmContainer .mat-form-field.mat-focused.mat-primary .mat-select-arrow {
  color: #1a1a1a !important;
}

.mat-select-panel.anyClass {
  max-height: 30rem !important;
  overflow-y: scroll !important;
  margin-top: 0 !important;
}

.mat-primary.anyClass .mat-option:hover.mat-selected:not(.mat-option-disabled) {
  color: #fff !important;
  background: #27AE60 !important;
}

.mat-select-panel.state_dropdown:not([class*=mat-elevation-z]) {
  box-shadow: none !important;
  position: absolute !important;
  top: -31rem !important;
  left: -1rem !important;
  border: .1rem solid #ccc !important;
}

.mat-primary.anyClass .mat-option.mat-selected:not(.mat-option-disabled) {
  color: #1a1a1a !important;
}

.anyClass .mat-option:hover:not(.mat-option-disabled) {
  background-color: #27AE60 !important;
  color: #fff !important
}

.mat-select-panel.anyClass .mat-option.mat-selected:not(.mat-option-multiple) {
  background-color: #247d4a !important;
  color: #fff !important;
  font-size: 1.5rem;
  font-weight: bold
}
.anyClass .mat-select-panel .mat-option {
  font-size: 1.5rem !important;
}
.anyClass .mat-option.mat-active {
  background-color: #27ae60 !important;
  color: #fff !important;
}

.ng-dropdown-panel .scroll-host {
  max-height: 32rem !important;
  overflow-y: scroll;
}

.anyClass .mat-option {
  padding: 0 6px !important;
  height: 2.7rem !important;
  font-size: 1.6rem;
}

.mat-pseudo-checkbox-checked::after {
  top: 2px !important;
  left: 2px !important;
  width: 6px !important;
}

/* MatSelect Dropdown CSS */

/* MatSelect Dropdown CSS */

.mdmDialog .mat-select {
  font-family: 'Open Sans', sans-serif !important;
  position: relative !important;
}

.mdmDialog .mat-select-value-text {
  position: relative;
  top: 0.5rem;
  font-size: 1.6rem !important;
}

/* MatSelect Dropdown CSS */



/* Dialog Box CSS */
.cdk-visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none
}

.cdk-global-overlay-wrapper,
.cdk-overlay-container {
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%
}

.cdk-overlay-container {
  position: fixed;
  z-index: 1000
}

.cdk-overlay-container:empty {
  display: none
}

.cdk-global-overlay-wrapper {
  display: flex;
  position: absolute;
  z-index: 1000
}

.cdk-overlay-pane {
  position: absolute;
  pointer-events: auto;
  box-sizing: border-box;
  z-index: 1000;
  display: flex;
  max-width: 100%;
  max-height: 100%;
  transform: translateX(-16px) !important;
}

.cdk-overlay-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  transition: opacity .4s cubic-bezier(.25, .8, .25, 1);
  opacity: 0
}

.cdk-overlay-dark-backdrop {
  background: rgba(0, 0, 0, .32);
}

.cdk-overlay-backdrop.cdk-overlay-backdrop-showing {
  opacity: 1;
}

.mdmDialog .mat-dialog-container {
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, .2), 0 24px 38px 3px rgba(0, 0, 0, .14), 0 9px 46px 8px rgba(0, 0, 0, .12);
  background: #fff;
  color: rgba(0, 0, 0, .87);
  border-radius: 20px !important;
  padding: 0;
  overflow-x: unset;
  overflow-y: hidden;
}

.mdmDialog .modal-container {
  width: auto;
  position: relative;
  padding: 2rem;
}

.mdmDialog .sub_heading {
  padding-left: 0px;
  font-weight: 400;
  font-size: 30px;
  margin: 0 0 1rem 0;
}

.mdmDialog h5.sub_heading {
  font-weight: 700;
  font-size: 18px;
}

.mdmDialog .modals_cancel_btn {
  position: absolute;
  right: 1rem;
  top: 1rem;
  color: #27AE60;
  cursor: pointer;
}

.mdmDialog .border_row {
  color: #27AE60;
      border: 0.5px solid;
}


.mdmDialog .all_form {
  padding: 0 20px;
}

.mdmDialog .mat-grid-tile .mat-figure {
  display: block !important;
}

.mdmDialog mat-label {
  font-size: 1.6rem;
  color: #1a1a1a;
}

.mdmDialog .mandatory {
  color: red !important;
}


.mdmDialog textarea.mat-input-element {
  padding: 8px 4px !important;
}

.mdmDialog .mat-form-field-appearance-legacy .mat-form-field-wrapper {
  padding-bottom: 1.25em;
}

.mdmDialog .select_box_dropwodn .mat-form-field-flex {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
  0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  border-radius: 0px;
  border: 1px solid #1a1a1a !important;
  position: absolute;
  outline: none !important;
}

.mdmDialog .mat-form-field-appearance-legacy .mat-form-field-underline {
  background-color: rgba(0, 0, 0, .42);
  bottom: 2.25em;
}

.mdmDialog .mat-form-field-ripple {
  background-color: rgba(0, 0, 0, .87);
}

.mdmDialog .mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper {
  margin-top: .54167em;
  top: calc(100% - 1.66667em);
}

.mdmDialog .mat-form-field-subscript-wrapper {
  font-size: 75%;
  margin-top: .66667em;
  top: calc(100% - 1.79167em);
}

.mdmDialog .mat-grid-tile.module_area .mat-figure {
  padding: 0px 0px !important;
  text-align: center;
}

.mdmDialog .mat-form-field-wrapper {
  position: relative;
}

/* mat-select */
.mdmDialog .mat-select-panel:not([class*=mat-elevation-z]) {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);
  border: 1px solid #ccc !important;
}

.mdmDialog .cdk-overlay-pane {
  transform: translateX(-16px) translateY(19px) !important;
}

.mdmDialog .mat-datepicker-content .mat-calendar-next-button,
.mat-datepicker-content .mat-calendar-previous-button,
.mat-datepicker-toggle {
  color: rgba(0, 0, 0, .54);
}

.mdmDialog .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button {
  font-size: 12px !important;
}

.mdmDialog .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button {
  height: 0em !important;
  padding: 2px 0;
}

.mdmDialog .mat-ripple {
  overflow: hidden;
  position: relative;
}

.mdmDialog .mat-checkbox .mat-ripple-element {
  background-color: #000
}

.mdmDialog .mat-checkbox-checked:not(.mat-checkbox-disabled).mat-primary .mat-ripple-element,
.mdmDialog .mat-checkbox:active:not(.mat-checkbox-disabled).mat-primary .mat-ripple-element {
  background: rgb(39, 174, 96)
}

.mdmDialog .mat-checkbox-checked:not(.mat-checkbox-disabled).mat-accent .mat-ripple-element,
.mdmDialog .mat-checkbox:active:not(.mat-checkbox-disabled).mat-accent .mat-ripple-element {
  background: #27AE60
}

.mdmDialog .mat-checkbox-checked:not(.mat-checkbox-disabled).mat-warn .mat-ripple-element,
.mdmDialog .mat-checkbox:active:not(.mat-checkbox-disabled).mat-warn .mat-ripple-element {
  background: #27AE60
}

.mdmDialog .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-ripple-element {
  background: rgba(255, 255, 255, .1)
}

.mdmDialog .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-ripple-element {
  background: rgba(255, 255, 255, .1)
}

.mdmDialog .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-ripple-element {
  background: rgba(255, 255, 255, .1)
}

.mdmDialog .mat-radio-button.mat-primary .mat-radio-inner-circle,
.mdmDialog .mat-radio-button.mat-primary .mat-radio-ripple .mat-ripple-element:not(.mat-radio-persistent-ripple),
.mdmDialog .mat-radio-button.mat-primary.mat-radio-checked .mat-radio-persistent-ripple,
.mdmDialog .mat-radio-button.mat-primary:active .mat-radio-persistent-ripple {
  background-color: rgb(39, 174, 96)
}

.mdmDialog .mat-radio-button.mat-accent .mat-radio-inner-circle,
.mdmDialog .mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element:not(.mat-radio-persistent-ripple),
.mdmDialog .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-persistent-ripple,
.mdmDialog .mat-radio-button.mat-accent:active .mat-radio-persistent-ripple {
  background-color: #27AE60
}

.mdmDialog .mat-radio-outer-circle {
  border-color: rgba(0, 0, 0, .54)
}

.mdmDialog .mat-radio-button.mat-primary.mat-radio-checked .mat-radio-outer-circle {
  border-color: rgb(39, 174, 96)
}

.mdmDialog .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {
  border-color: #27AE60
}

.mdmDialog .mat-radio-button.mat-warn.mat-radio-checked .mat-radio-outer-circle {
  border-color: #27AE60
}

.mdmDialog .mat-radio-button.mat-radio-disabled .mat-radio-outer-circle,
.mdmDialog .mat-radio-button.mat-radio-disabled.mat-radio-checked .mat-radio-outer-circle {
  border-color: rgba(0, 0, 0, .38)
}

.mdmDialog .mat-radio-button.mat-radio-disabled .mat-radio-inner-circle,
.mdmDialog .mat-radio-button.mat-radio-disabled .mat-radio-ripple .mat-ripple-element {
  background-color: rgba(0, 0, 0, .38)
}

.mdmDialog .mat-radio-button.mat-radio-disabled .mat-radio-label-content {
  color: rgba(0, 0, 0, .38)
}

.mdmDialog .mat-radio-button .mat-ripple-element {
  background-color: #000
}

.mdmDialog .mat-select-value {
  color: rgba(0, 0, 0, .87)
}

.mdmDialog .mat-select-placeholder {
  color: rgba(0, 0, 0, .42)
}

.mdmDialog .mat-select-disabled .mat-select-value {
  color: rgba(0, 0, 0, .38)
}

.mdmDialog .mat-select-arrow {
  color: rgba(0, 0, 0, .54)
}

.mdmDialog .mat-select-panel {
  background: #fff
}

.mdmDialog .mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple) {
  background: rgba(0, 0, 0, .12)
}

.mdmDialog .mat-form-field.mat-focused.mat-primary .mat-select-arrow {
  color: rgb(39, 174, 96)
}

.mdmDialog .mat-form-field.mat-focused.mat-accent .mat-select-arrow {
  color: #27AE60
}

.mdmDialog .mat-form-field.mat-focused.mat-warn .mat-select-arrow {
  color: #27AE60
}

.mdmDialog .mat-form-field .mat-select.mat-select-invalid .mat-select-arrow {
  color: red;
}

.mdmDialog .mat-form-field .mat-select.mat-select-disabled .mat-select-arrow {
  color: rgba(0, 0, 0, .38)
}

.mdmDialog .mat-ripple.mat-ripple-unbounded {
  overflow: visible
}

.mdmDialog .mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0s cubic-bezier(0, 0, .2, 1);
  transform: scale(0)
}

.mdmDialog .mat-button .mat-ripple-element,
.mdmDialog .mat-icon-button .mat-ripple-element,
.mdmDialog .mat-stroked-button .mat-ripple-element {
  opacity: .1;
  background-color: currentColor
}

.mdmDialog .mat-fab.mat-accent[disabled],
.mdmDialog .mat-fab.mat-primary[disabled],
.mdmDialog .mat-fab.mat-warn[disabled],
.mdmDialog .mat-fab[disabled][disabled],
.mdmDialog .mat-flat-button.mat-accent[disabled],
.mdmDialog .mat-flat-button.mat-primary[disabled],
.mdmDialog .mat-flat-button.mat-warn[disabled],
.mdmDialog .mat-flat-button[disabled][disabled],
.mdmDialog .mat-mini-fab.mat-accent[disabled],
.mdmDialog .mat-mini-fab.mat-primary[disabled],
.mdmDialog .mat-mini-fab.mat-warn[disabled],
.mdmDialog .mat-mini-fab[disabled][disabled],
.mdmDialog .mat-raised-button.mat-accent[disabled],
.mdmDialog .mat-raised-button.mat-primary[disabled],
.mdmDialog .mat-raised-button.mat-warn[disabled],
.mdmDialog .mat-raised-button[disabled][disabled] {
  background-color: rgba(0, 0, 0, .12);
  color: rgba(0, 0, 0, .26);
  cursor: not-allowed !important;
}

.mdmDialog .mat-flat-button:not([class*=mat-elevation-z]),
.mat-stroked-button:not([class*=mat-elevation-z]) {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, .2), 0 0 0 0 rgba(0, 0, 0, .14), 0 0 0 0 rgba(0, 0, 0, .12);
}

.mdmDialog .round_btn {
  border-radius: 50px !important;
  border-radius: 30px;
  padding: 0 30px;
}

.mdmDialog .theme_btn {
  color: #fff !important;
  cursor: pointer !important;
  font-size: 1.6rem !important;
  background-color: #27AE60 !important;
  border: 0.2rem solid #27AE60 !important;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  margin: 0 1rem;
  font-family: "Open Sans", sans-serif !important;
  border-radius: 2rem !important;
  padding: 0 1.6rem !important;
  line-height: 1.8 !important;
}

.mdmDialog .theme_btn:hover {
  background-color: #81c784 !important;
  border: 0.2rem solid #81c784 !important;
}
.mdmDialog .theme_btn[disabled] {
  background-color: #6A6868 !important;
  cursor: not-allowed !important;
  border: 0.1rem solid #6A6868 !important;
}
.mdmDialog .select_box_dropwodn .mat-form-field-flex .mat-select {
  border: none;
}

.mdmDialog .mat-select {
  text-transform: uppercase !important;
  position: relative !important;
  border: 1px solid #6a6868;
  border-radius: 0;
  margin-bottom: 22px;
  padding: 0 4px;
  height: 3rem;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
}
.mdmDialog .pd_4_modal {
  padding: 0 !important;
      height: 3.4rem;
    line-height: 18px;
}
.mdmDialog .mat-select-disabled {
  background-color: #eee;
}
.mdmDialog .mat-form-field-appearance-legacy .mat-form-field-infix {
  padding: 0rem;
  border-top: 0 !important;
  height: 3rem;
}

.mdmDialog .mat-form-field-appearance-outline .mat-form-field-prefix .rupee_icon {
  padding-left: 1rem;
}

.mdmDialog .hdr_srch_field input {
  padding: 0.7rem 0.5rem 0.7rem 3.5rem;
  text-transform: uppercase;
  border: 1px solid #ddd;
}

.mdmDialog input.mat-input-element {
  margin-top: -.0625em;
  height: 3rem;
  font-size: 1.6rem;
}

.mdmDialog .mat-form-field-appearance-outline .mat-form-field-infix {
  padding: 0px !important;
  border-radius: 3px;
  overflow: hidden;
  border-top: 0 !important;
}

.mdmDialog .form-control:focus {
  border-color: #fff;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
  box-shadow: none;
}

.mdmDialog .mat-form-field-label-wrapper {
  top: -.84375em;
  padding-top: .84375em;
  left: 1rem !important;
}

.mdmDialog .mat-form-field-appearance-outline .mat-form-field-wrapper {
  margin: .25em 0;
}

.mdmDialog .mat-form-field {
  font-size: inherit;
  font-weight: 400;
  line-height: 1.125;
  width: 100%;
  font-family: 'Open Sans', sans-serif !important;
}
.mdmDialog .mat-form-field-appearance-outline .mat-form-field-flex {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
  0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  border: 1px solid #6A6868;
  height: 3.4rem;
}
.mdmDialog .text_area_input.mat-form-field-appearance-outline .mat-form-field-flex {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
  0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  border: 1px solid #6A6868;
  height: auto;
}
.mdmDialog .mat-form-field-appearance-outline .mat-form-field-flex:hover {
  border-color: #27AE60;
}
.mdmDialog .mat-select-trigger{
  height: 2.4rem !important;
}

.mdmDialog .form-control {
  margin: 0 !important;
  height: 3rem !important;
  box-shadow: none;
  text-transform: uppercase;
}

.mdmDialog .mat-input-element {
  caret-color: rgb(39, 174, 96) !important;
  padding: 4px;
}

.mdmDialog .mat-form-field-appearance-outline .mat-form-field-outline-thick {
  color: #27AE60 !important;
}

.mdmDialog .mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-end {
  border-width: 1px;
}

.mdmDialog .mat-form-field-appearance-outline .mat-form-field-outline-start,
.mdmDialog .mat-form-field-appearance-outline .mat-form-field-outline-end {
  border-radius: 0 !important;
  border: none;
  min-width: 0px !important;
}

.mdmDialog .mat-form-field-appearance-outline .mat-form-field-outline {
  top: 0 !important;
}

.mdmDialog .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-datepicker-toggle-default-icon {
  margin-top: 3px;
}

.mdmDialog .mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-start {
  border-width: 1px;
}

.mdmDialog .module_area {
  text-align: center;
  position: relative;
}

.mdmDialog .mat-paginator,
.mdmDialog .mat-paginator-page-size .mat-select-trigger {
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  color: rgba(0, 0, 0, .54)
}

.mdmDialog .mat-select-trigger {
  height: 1.125em
}

.mdmDialog .branch_next_btn {
  text-align: center;
}

.mdmDialog .width_block {
  width: 100%;
}

.mdmDialog .branch_next_btn button {    
  cursor: pointer !important;
  color: #fff;
  font-size: 1.6rem !important;
  background-color: #27AE60 !important;
  border: 0.2rem solid #27AE60 !important;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  margin: 0 1rem;
  font-family: "Open Sans", sans-serif !important;
  border-radius: 2rem !important;
  padding: 0 1.6rem !important;
  line-height: 1.8 !important;
}

.mdmDialog .branch_next_btn button:hover {
  background: #81c784;
}

.mdmDialog .branch_next_btn button[disabled] {
  background: #6A6868;
  border: 0.1rem solid #6A6868 !important;
  cursor: not-allowed !important;
}

.mdmDialog .radio_button_pr {
  padding-right: 15px;
}



/* table css start */
.mdmDialog .mat-table {
  display: block;
  background: #fff;
  font-family: 'Open Sans', sans-serif !important;
}

.mdmDialog .mr-top-0 {
  margin-top: 0px !important;
}

.mdmDialog .mat-row,
.mdmDialog .mat-header-row {
  display: flex;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  align-items: center;
  min-height: 33px;
  padding: 0 24px;
}

.mdmDialog .mat-row.branch_table_head .mat-cell,
.mdmDialog .mat-header-cell,
.mdmDialog .mat-footer-cell {
  flex: 1;
  overflow: hidden;
  word-wrap: break-word;
  font-size: 1.6rem !important;
  color: #1a1a1a !important;
  font-weight: 700 !important;
  font-family: 'Open Sans', sans-serif !important;
}
.mat-tooltip{
max-width: initial !important;
text-align: center !important;
}
.mdmDialog .mat-cell {
  flex: 1;
  overflow: hidden;
  word-wrap: break-word;
  font-size: 1.6rem !important;
  color: #1a1a1a !important;
  font-family: 'Open Sans', sans-serif !important;
}

.mdmDialog .primary_color {
  color: #27AE60 !important;
}
.mdmDialog .example-form {
  min-width: 150px;
  max-width: 500px;
  width: 100%;
}

.mdmDialog .example-full-width {
  width: 100%;
}

.mdmDialog td {
  padding-right: 8px;
}

.mdmDialog .mat_table_main .mat-row {
  border-bottom: 1px solid #f1f1f1;
}
.mdmDialog .mat-row.table_main_header {
  background: #F1F1F1;
  font-weight: 700;
}
.mdmDialog .card_body1 {
  overflow-y: scroll;
  max-height: 120px !important;
}


.mdmDialog .mat-header-cell {
  font-size: 12px;
  font-weight: 500
}

.mdmDialog .upper-case {
  text-transform: uppercase;
}
.mdmDialog .mat-table tbody,
.mdmDialog .mat-table tfoot,
.mdmDialog .mat-table thead,
.mdmDialog .mat-table-sticky,
.mdmDialog [mat-footer-row],
.mdmDialog [mat-header-row],
.mdmDialog [mat-row],
.mdmDialog mat-footer-row,
.mdmDialog mat-header-row,
.mdmDialog mat-row {
  background: inherit
}

.mdmDialog .icon_theme_color {
  color: #36ad5f;
  font-size: 18px;
}

.mdmDialog .add_btn {
  font-size: 9px;
  background: #27AE60;
  color: #fff;
  width: 30px;
  height: 30px;
  line-height: 20px !important;
  min-width: 30px !important;
  padding-left: 3px !important;
  border-radius: 30px !important;
  margin-left: 10px !important;
  box-shadow: 0px 6px 6px #0000003D;
}

.mdmDialog .mat-form-field-appearance-outline.mat-form-field-invalid.mat-form-field-invalid .mat-form-field-outline-thick {
  color: #f44336 !important;
}

.mdmDialog .display_inline_model {
  display: inline-block;
  margin: 0 10px;
}
.mdmDialog .mat-form-field.mat-form-field-invalid .mat-form-field-label .mat-form-field-required-marker {
  display: none;
}
.mdmDialog .mat-form-field-appearance-outline .mat-form-field-suffix {
  top: -2px !important;
}


/* SCROLLBAR CSS */
.mdmContainer .scrollbar {
  overflow-y: scroll;
  height: 50px;
}

.mdmContainer .scrollbar::-webkit-scrollbar {
  width: 7px;
  background-color: #6e6e6e;
  border-radius: 15px;
  cursor: pointer;
}

.mdmContainer .scrollbar::-webkit-scrollbar-thumb {
  background-color: #6A6868;
  border-radius: 15px;
  cursor: pointer;
}

.mdmContainer .scrollbar mat-label {
  width: 100%;
}
.mdmContainer :-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px grey;
  border-radius: 10px;
}

.mdmContainer ::-webkit-scrollbar-thumb {
  background: #6A6868;
  border-radius: 10px;
}

.mdmContainer ::-webkit-scrollbar-thumb:hover {
  background:#6A6868;
}

.mdmContainer ::-webkit-scrollbar:horizontal {
  width: 7px !important;
  height: 7px !important;
}
.mdmContainer :-webkit-scrollbar-track:horizontal {
  box-shadow: inset 0 0 2px grey;
  border-radius: 10px;
}
.mdmContainer ::-webkit-scrollbar-thumb:horizontal {
  background: #6A6868;
  border-radius: 10px;
}
.mdmContainer ::-webkit-scrollbar-thumb:horizontal:hover {
  background: #27AE60;
}

.mdmContainer .overflow::-webkit-scrollbar-thumb {
  background: #6A6868;
  border-radius: 10px;
  max-height: 100px;
}

.mdmContainer .overflow::-webkit-scrollbar {
  width: 7px;
  max-height: 100px;
}

.mdmContainer .overflow::-webkit-scrollbar-track {
  display: none;
  border-radius: 10px;
}
.mdmContainer .overflow::-webkit-scrollbar-thumb:hover {
  background: #585757;
}

.mdmContainer .scrollbar {
  overflow-y: scroll;
  height: 50px;
}

.mdmContainer .scrollbar::-webkit-scrollbar {
  width: 7px;
  background-color: #6e6e6e;
  border-radius: 15px;
}

.mdmContainer .main_scrollbar {
  height: 280px;
  overflow-y: scroll;
  padding-right: 5px;
}
.mdmContainer .main_scrollbar_pin_branch {
  height: 250px;
  overflow-y: scroll;
  padding-right: 5px;
}
 .cdk-global-scrollblock {
 top: 0px !important;
}

.mdmContainer .main_scrollbar::-webkit-scrollbar {
  width: 7px;
  background-color: #6e6e6e;
  border-radius: 15px;
}


.mdmContainer .main_scrollbar::-webkit-scrollbar-thumb {
  background-color: #6A6868;
  border-radius: 15px;
}
.mdmContainer .main_scrollbar_pin_branch::-webkit-scrollbar {
  width: 7px;
  background-color: #6e6e6e;
  border-radius: 15px;
}


.mdmContainer .main_scrollbar_pin_branch::-webkit-scrollbar-thumb {
  background-color: #6A6868;
  border-radius: 15px;
}

::-webkit-scrollbar-thumb {
  background: #6A6868;
}

.mdmContainer .pin_code_list::-webkit-scrollbar {
  width: 7px;
  background-color: #27AE60;
  border-radius: 15px;
}

.mdmContainer .pin_code_list::-webkit-scrollbar-thumb {
  background-color: #6A6868;
  border-radius: 15px;
}
.mdmDialog .dialog_scroll {
  overflow-y: scroll;
  height: 450px !important;
}
/* SCROLLBAR CSS */

.mdmContainer .mat-button[disabled] {
  background: #6a6868 !important;
  cursor: not-allowed !important;
  color: #fff !important;
}
.mdmContainer .table_fixed {
  position: sticky !important;
  width: 100%;
  top: 0;
  margin-top: 0 !important;
  z-index: 99 !important;
}
.mdmDialog .table_fixed {
  position: sticky !important;
  width: 100%;
  top: 0;
  margin-top: 0 !important;
  z-index: 99 !important;
}
.mdmContainer .mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background, .mdmContainer .mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background {
    background-color: #6A6868 !important;
}
`;
    style_css = `/* aman Global css start */
.mdmContainer .pagination_area .ngx-pagination .current {
  padding: 2px 7px !important;
  background: #27AE60 !important;
  color: #fefefe;
  cursor: default;
  margin: 0 5px !important;
}

.mdmContainer .ngx-pagination .disabled {
  padding: 0.1875rem 0.625rem;
  color: #6A6868 !important;
  cursor: default;
  font-weight: 600 !important;
}

.mdmContainer .ngx-pagination a:hover,
.mdmContainer .ngx-pagination button:hover {
  background: transparent !important;
}

.mdmContainer .mat-flat-button.mat-primary[disabled] {
  background-color: #6A6868 !important;
  border-color: #6A6868 !important;
}

.mdmContainer .mat-fab.mat-accent[disabled],
.mdmContainer .mat-fab.mat-primary[disabled],
.mdmContainer .mat-fab.mat-warn[disabled],
.mdmContainer .mat-fab[disabled][disabled],
.mdmContainer .mat-flat-button.mat-accent[disabled],
.mdmContainer .mat-flat-button.mat-primary[disabled],
.mdmContainer .mat-flat-button.mat-warn[disabled],
.mdmContainer .mat-flat-button[disabled][disabled],
.mdmContainer .mat-mini-fab.mat-accent[disabled],
.mdmContainer .mat-mini-fab.mat-primary[disabled],
.mdmContainer .mat-mini-fab.mat-warn[disabled],
.mdmContainer .mat-mini-fab[disabled][disabled],
.mdmContainer .mat-raised-button.mat-accent[disabled],
.mdmContainer .mat-raised-button.mat-primary[disabled],
.mdmContainer .mat-raised-button.mat-warn[disabled],
.mdmContainer .mat-raised-button[disabled][disabled] {
  background-color: #6A6868 !important;
  border-color: #6A6868 !important;
  cursor: not-allowed !important;
}

.mdmContainer .pagination_area {
  padding: 10px 20px 0 !important;
  text-align: right;
}

.mdmContainer .ngx-pagination li:focus {
  outline: none !important;
}

.mdmContainer .ngx-pagination a,
.mdmContainer .ngx-pagination button {
  font-weight: 600;
  outline: none !important;
}


.mdmContainer .active {
  background: #27AE60 !important;
  color: #fff !important;
}

.mdmContainer .cursor-pointer {
  cursor: pointer;
}

.mdmContainer .mat-card-content>:first-child,
.mdmContainer .mat-card>:first-child {
  margin-top: 0;
}

.mdmContainer .sub_sub_heading {
  font-size: 20px;
  padding: 2px;
  font-weight: 400;
  margin: 0px 0px 30px 0px;
}


.mdmContainer .bg_grey {
  background: #6a6868;
  border-radius: 0;
}

.mdmContainer .text_white {
  color: #fff;
  font-weight: 700;
  opacity: 1;
}

.mdmContainer table {
  width: 100%;
}

.mdmContainer .mb_2 {
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, .12);
}

.mdmContainer .bg_light_grey {
  background: #fff;
  margin-bottom: 8px;
}

.mdmContainer .mat_mb_0 {
  margin-bottom: 0px;
}

.mdmContainer mat-label {
  font-size: 1.6rem;
  color: #1a1a1a;
}

.mdmContainer mat-label strong {
  color: #2b2a2a;
}
.mdmContainer mat-label b {
  color: #2b2a2a;
}


.mdmContainer .round_btn {
  padding: 0 30px;
  border-radius: 50px !important;
}

.mdmContainer .mat-grid-tile.notepad_card mat-label {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.mdmContainer .breadcrumbs_icon {
  font-size: 22px;
  height: 20px;
}


.mdmContainer .mat_card_padding {
  padding: 0;
  margin-bottom: 30px;
}

.mdmContainer .icon_theme_color {
  color: #36ad5f;
  font-size: 18px;
}

.mdmContainer .flex_5 .mat-select {
  width: 75%
}

.mdmContainer .toolbar_heading {
  background: transparent;
  height: auto;
  justify-content: center;
  font-size: 1vw;
  font-family: 'Open Sans', sans-serif !important;
  overflow: hidden;
  white-space: initial;
  line-height: 22px;
  padding: 0px 10px;
}

/* table css start */

.mdmContainer .mr-top-0 {
  margin-top: 0px !important;
}

.mdmContainer .mat-row.branch_table_head .mat-cell,
.mdmContainer .mat-header-cell,
.mdmContainer .mat-footer-cell {
  flex: 1;
  overflow: hidden;
  word-wrap: break-word;
  vertical-align: middle;
  font-size: 1.6rem !important;
  color: #1a1a1a !important;
  font-weight: 700 !important;
  font-family: 'Open Sans', sans-serif !important;
}

.mdmContainer .mat-cell {
  flex: 1;
  overflow: hidden;
  word-wrap: break-word;
  font-size: 1.6rem !important;
  color: #1a1a1a !important;
  font-family: 'Open Sans', sans-serif !important;
}

.mdmContainer .mat-cell.rr_command_radio {
  padding: 0;
}

.mdmContainer .rr_command_radio .mat-radio-label-content {
  padding-left: 0;
}

.mdmContainer .rr_command_radio .radio_button_pr {
  padding-right: 4px;
}

.mdmContainer .example-form {
  min-width: 150px;
  max-width: 500px;
  width: 100%;
}

.mdmContainer .example-full-width {
  width: 100%;
}

.mdmContainer td {
  padding-right: 8px;
}

.mdmContainer .mat_table_main .mat-row {
  border-bottom: 1px solid #f1f1f1;
}

.mdmContainer .mat-table {
  font-family: 'Open Sans', sans-serif !important;
  display: block;
}


.mdmContainer textarea {
  padding: 5px;
}

.mdmContainer .pl_1 {
  padding-left: 2px;
}

.mdmContainer .pl_2 {
  padding-left: 5px;
}

.mdmContainer .pl_3 {
  padding-left: 7px;
}

.mdmContainer .pl_4 {
  padding-left: 12px;
}

.mdmContainer .table_border {
  border: 1px solid #f1f1f1;
  margin-bottom: 30px;
}

.mdmContainer .command_dropdown {
  height: 3rem;
  margin: 0px 5px 0px 0px;
  padding: 0 0px;
}



.mdmContainer .padd_left_tbl {
  padding-left: 12px !important;
}


/* table css end */

@media only screen and (max-width: 767px) {
  .mdmContainer .mat-grid-tile.notepad_open_card .mat-figure {
    padding: 0;
  }


  .mdmContainer .toolbar_heading {
    justify-content: left;
    height: auto;
  }

  .mdmContainer .bg_light_grey .mat-button {
    min-width: 25px;
    padding: 0px;
  }

  .mdmContainer .mat_table_main .mat-row {
    padding: 0px 2px;
  }
}

html,
body {
  height: 100%;
}


body {
  margin: 0;
  font-family: 'Open Sans', sans-serif !important;
  background-color: #eee !important;
}


.mdmContainer .theme_color {
  color: #27AE60 !important;
}

.mdmContainer .theme_bg_color {
  background: #27AE60 !important;
}

.mdmContainer .color_white {
  color: #fff !important;
}

.mdmContainer .color_black {
  color: #333;
}

.mdmContainer .position_relative {
  position: relative !important;
}

.mdmContainer .mat-grid-tile.notepad_card .mat-figure {
  justify-content: flex-start !important;
  padding: 0 20px;
}

.mdmContainer .mat-grid-tile.notepad_open_card .mat-figure {
  justify-content: flex-start !important;
  padding: 5px 20px;
  align-items: start;
}

.mdmContainer .mr_top_10 {
  margin-top: -9px !important;
}

.mdmContainer .mat-grid-tile.module_area.module_btn .mat-figure {
  padding: 5px 0px;
}

.mdmContainer .mat-grid-tile.module_area.module_txt .mat-figure {
  padding: 5px 15px;
  justify-content: start;
  padding-left: 35px;
}

.mdmContainer .module_area {
  position: relative;
}

.mdmDialog .module_area {
  position: relative;
}

.mdmContainer .mat-card {
  font-family: 'Open Sans', sans-serif !important;
}

.mdmContainer .hdr_srch_field .mat-form-field-infix {
  width: 100%;
}

.mdmContainer .mat_form_field {
  width: 150px !important;
}

.mdmContainer .mat_card_zone {
  padding: 2.5rem 3rem !important;
  border-radius: 0px !important;
  min-height: auto;
  margin-bottom: 50px;
}

.mdmContainer .mat_card_zone.zone_card {
  margin-bottom: 140px;
}

.mdmContainer .left_00 {
  left: 0;
}

.mdmContainer .add_new_left.mat-grid-tile .mat-figure {
  justify-content: left;
}

.mdmContainer .mat_cell_icon {
  display: flex !important;
  justify-content: flex-start !important;
  height: 30px;
  padding: 2px;
}

.mdmContainer .grid_title h3 {
  margin: 20px 0;
}

/* modals css start */
.mdmContainer h5.sub_heading {
  font-weight: 700;
  font-size: 18px;
}

.mdmContainer .modals_cancel_btn {
  position: absolute;
  right: 0px;
  top: 0;
  color: #27AE60;
  cursor: pointer;
}

.mdmContainer .modals_card {
  padding: 0px !important;
  box-shadow: none !important;
}

.mdmContainer .mat-dialog-container {
  padding: 10px !important;
}

.mdmContainer .modal-container {
  width: auto;
  position: relative;
}

.mdmContainer .border_row {
  color: #27AE60;
}

/* delete modals stert */
.mdmContainer .delete_modal {
  text-align: center;
  padding: 0 105px;
}

.mdmContainer .delete_modal p {
  line-height: 22px;
  font-size: 15px;
  margin: 30px 0 56px;
}

.mdmContainer .display_inline {
  display: inline-block;
  margin: 0 15px 0px 0;
}


.mdmContainer .mat-expansion-panel-body {
  padding: 0 7px 12px 0 !important;
}

.mdmContainer .float_right {
  float: right;
}

.mdmContainer .mat-button {
  min-width: 30px !important;
  padding: 0 4px !important;
  line-height: 31px !important;
}

.mdmContainer .mat-expansion-panel-header {
  padding: 0 15px !important;
}

.mdmContainer .padding_15 {
  padding: 0 15px;
}


.mdmContainer .mat-expansion-indicator::after {
  border-style: solid !important;
  border-width: 0px !important;
  content: '';
  display: inline-block !important;
  padding: 0px !important;
  transform: none !important;
  vertical-align: middle;
  border-left: 7px solid transparent !important;
  border-right: 7px solid transparent !important;
  border-top: 13px solid !important;
}

.mdmContainer .mat-grid-tile .mg_left_3 {
  margin: 0 -3px !important;
}

.mdmContainer .mat_card_zone .mat-grid-tile .mat-figure {
  display: block;
}

.mdmContainer .mr_rl_10 {
  margin: 0 10px;
}

.mdmContainer .minimize_icon {
  position: absolute;
  top: -7px;
  left: 3px;
}

/* adarsh css start */
.mdmContainer .container {
  width: 100%;
  padding: 0;
  margin: 0;
  position: relative;
}

.mdmContainer .mat-form-field {
  width: 100%;
}

.mdmContainer .breadcrumbs span {
  font-size: 1.4rem;
  font-weight: 400;
}

.mdmContainer .breadcrumbs span a {
  color: #36ad5f;
  cursor: pointer;
}

.mdmContainer .breadcrumbs_nav {
  min-height: 3rem !important;
  background: #eee;
}

.mdmContainer .breadcrumbs_nav .breadcrumbs {
  height: 3rem !important;
}

.mdmContainer .mat-toolbar-row,
.mdmContainer .mat-toolbar-single-row .breadcrumbs {
  padding-left: 0px !important;
}

.mdmContainer .sub_heading {
  font-weight: 600;
  margin: 0 0 1rem 0;
  font-size: 2rem !important;
}

.mdmContainer .button_grid_position {
  margin-top: 0px;
}

.mdmContainer .button_grid_position:before {
  content: '';
  position: absolute;
  top: 0px;
  right: 0px;
  width: 2px;
  height: 100%;
  background: #d9d9d98f;
}

.mdmContainer .ml_grid {
  margin-top: 15px;
}


.mdmContainer .mat-row,
.mdmContainer .mat-header-row {
  display: flex;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  align-items: center;
  padding: 0px 24px 0;
  min-height: 33px;
}

.mdmContainer .hdr_srch_field {
  padding-left: 0px;
  position: relative;
  margin: 5px 0px 0;
}

.mdmContainer .hdr_srch_field input {
  padding-left: 30px;
  border: 1px solid #ddd;
}

.mdmContainer .hdr_srch_field .search_icon {
  position: absolute;
  top: 4px;
  left: 5px;
  font-size: 20px;
  color: #6f6c6c !important;
}

.mdmContainer .add_btn {
  font-size: 1rem;
  color: #fff !important;
  background: #27AE60 !important;
  width: 27px;
  height: 26px;
  line-height: 0px !important;
  min-width: 25px !important;
  padding-left: 2px !important;
  border-radius: 30px !important;
  margin-left: 10px !important;
  box-shadow: 0px 6px 6px #0000003D;
}

.mdmContainer .add_btn:hover {
  background-color: #81C784 !important;
  color: #fff !important;
}
.mdmContainer .add_btn[disabled]:hover {
  background-color: #81C784 !important;
  color: #fff !important;
}

.mdmContainer .mat-grid-tile .mat-figure {
  display: block !important;
}

.mdmContainer .mat_card_zone .mat-cell {
  text-transform: uppercase;
  text-align: left;
}

.mdmContainer .mat_table_input .mat-cell {
  padding: 2px;
}

.mdmContainer .mat_table_input .mat-row,
.mdmContainer .mat-header-row {
  border-color: #ddd;
}

.mdmContainer .mat_card_zone .mat-row {
  border: none;
  background: #ffffff;
  margin: 3px 0;
  border-bottom: 1px solid rgba(0, 0, 0, .12);
}

.mdmContainer .invalid-feedback {
  color: #f44336;
  position: absolute;
  top: 3.7rem;
  text-align: left;
  font-size: 1.5rem;
  line-height: 2rem;
  left: 0;
  text-transform: capitalize !important;
}

.mdmContainer .invalid-feedback2 {
  color: #f44336;
  position: relative;
  font-size: 1.5rem;
  text-align: left;
  text-transform: capitalize !important;
  line-height: 1.8rem;
}

.mdmDialog .invalid-feedback {
  color: #f44336;
  position: absolute;
  line-height: 1.8rem;
  top: 4.3rem;
  font-size: 1.6rem;
  text-align: left;
  left: 0;
}

.mdmContainer .pos_relative {
  position: relative;
}

.mdmContainer .coloe_red {
  color: #f44336;
}
.mdmDialog .coloe_red {
  color: #f44336;
}

.mdmDialog .pos_relative {
  position: relative;
}
.mdmContainer .table_color {
  color: #27AE60;
}
.mdmContainer span.hyperlink {
  color: #27AE60;
  cursor:pointer;
}

.mdmContainer .active_btn,
.mdmContainer .deactive_btn {
  width: 11vw;
  height: 37px;
  color: #fff;
  margin-bottom: 8px !important;
  border-radius: 0px !important;
  text-transform: uppercase;
  font-weight: 400;
}
.mdmContainer .width-13vw{
    width: 14vw !important;
}
.mdmDialog .width-13vw{
    width: 14vw !important;
}

.mdmContainer .active_btn {
  background: #27AE60 !important;
  color: #fff !important;
}

.mdmContainer .snackbar {
  max-width: 90% !important;
  margin-left: auto !important;
  margin-right: auto !important;
  margin-bottom: 1rem !important;
  padding: 10px !important;
  background-color: #0b8357;
  color: #f7f0cf;
}

.mdmContainer .mat-snack-bar-container {
  max-width: 100% !important;
  color: rgba(255, 255, 255, .7);
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
}

.mdmContainer .deactive_btn {
  background: #F1F1F1;
  color: #333;
}

.mdmContainer .selected_list li {
  display: inline;
  font-size: 1.6rem;
}

.mdmContainer .selected_list ul {
  list-style: none;
  margin: 0;

}

.mdmContainer .grid_title {
  padding-left: 2rem;
  margin-top: 0 !important;
}

.mdmContainer .mr_1rem {
  margin-top: 1rem  !important;
}

.mdmContainer .mat_table_main .mat-button {
  line-height: 25px;
}

.mdmContainer .card_white {
  width: 278px !important;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 6px #0000000A;
  opacity: 1;
  margin-top: 50px;
}

.mdmContainer .dashboard_icon {
  position: absolute;
  top: 5px;
  left: 5px;
}

.mdmContainer .location_icon {
  position: absolute;
  top: 40%;
  right: 15px;
}

.mdmContainer .card_white p {
  width: 72%;
  margin: 45px 35px;
}

.mdmContainer .dashboard_icon,
.mdmContainer .location_icon,
.mdmContainer .card_white p {
  color: #27AE60;
}

.mdmContainer .zone_title {
  font-weight: 400;
  letter-spacing: 0;
  color: #1A1A1A;
  border-bottom: 2px solid #81C784 !important;
  margin: 1rem 0px 4rem 0px;
  padding: 0px 0;
}


.mdmContainer .theme_btn {
  color: #fff !important;
  cursor: pointer !important;
  font-size: 1.6rem !important;
  background-color: #27AE60 !important;
  border: 0.2rem solid #27AE60 !important;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  margin: 0 1rem;
  font-family: "Open Sans", sans-serif !important;
  border-radius: 2rem !important;
  padding: 0 1.6rem !important;
  line-height: 1.8 !important;
}

.mdmContainer .theme_btn:hover {
  background-color: #81C784 !important;
  border: 0.2rem solid #81C784 !important;
}

.mdmContainer .zone_mapping .mat-button {
  position: absolute;
  top: 0px;
  right: 0px;
  width: auto;
  height: auto;
  line-height: 20px;
  min-width: auto;
  padding: 5px;
}

.mdmContainer .zone_mapping .material-icons {
  color: #27AE60;
}

.mdmContainer .zone_mapping {
  position: relative;
}

.mdmContainer .table_main_header .mat-cell {
  text-transform: uppercase;
}

.mdmContainer .select_rate_group select,
.mdmContainer .select_rate_group select:focus {
  width: 100%;
  border: none;
  border-bottom: 2px solid #F1F1F1;
  font-size: 22px;
  padding: 0px;
  padding-bottom: 2px;
  outline: none;
  box-shadow: none;
}

.mdmContainer .mr_top_20 {
  margin-top: 40px;
}

.mdmContainer .mr-top-20 {
  margin-top: 20px;
}

.mdmContainer .bdr_top_none {
  border-top: 0px !important;
}

.mdmContainer .btn_mt {
  margin-top: 25px;
}

.mdmContainer .select_rate_group {
  margin-top: 10px;
}
.mdmContainer .pd_4_2 {
  padding: 1rem 0 0 2rem !important; 
}

.mdmContainer .bg_shado_none {
  background: transparent;
  box-shadow: none;
  color: #333;
}

.mdmContainer .add_geography_edit {
  color: #27AE60;
}

.mdmContainer .manage_pin p,
.mdmContainer .manage_pin .material-icons {
  font-size: 15px;
  font-weight: 600;
  color: #27AE60;
  cursor: pointer;
}

.mdmContainer .hdr_srch_field input {
  border: none !important;
  padding: 0.7rem 0.5rem 0.7rem 3.5rem;
  text-transform: uppercase;
  padding-left: 30px;
  border: 1px solid #ddd;
  /* width: 116px; */
}

.mdmContainer .mr_top_30 {
  margin-top: 0.5rem !important;
}

.mdmContainer .pin_code_list ul {
  list-style: none;
  padding-left: 5px;
  margin: 0px;
}

.mdmContainer .pin_code_list {
  min-height: 100px;
  height: 100px;
  overflow-y: scroll;
  padding-right: 5px;
  border: 1px solid #ddd;
  margin: 0 0 12px;
}

.mdmContainer .drag_icon {
  text-align: center;
}

.mdmContainer .drag_icon i {
  font-weight: 900;
  cursor: pointer;
}
.mdmContainer .drag_icon em {
  font-weight: 900;
  cursor: pointer;
}

.mdmContainer .drag_icon i:hover {
  color: #27AE60;
}

.mdmContainer .dragan_drop_dialog {
  width: 80%;
  margin: auto;
}

.mdmContainer .pin_crid_block .mat-grid-tile .mat-figure {
  display: block !important;
}

.mdmContainer .expand_less_more {
  position: absolute;
  bottom: 0px;
  left: 50%;
  right: 0px;
  justify-content: center;
  text-align: center;
}

.mdmContainer .expand_less_more i {
  color: #27AE60;
  cursor: pointer;
}

.mdmContainer .expand_less_more em {
  color: #27AE60;
  cursor: pointer;
}

.mdmContainer .mat_figure_block .mat-grid-tile .mat-figure {
  display: block !important;
}

.mdmContainer .mr_top_40 {
  margin: 40px 0 0;
}

.mdmContainer .radio_btn_margin {
  margin-bottom: 15px;
}
.mandatory_input.mat-form-field-appearance-outline .mat-form-field-flex{
border:1px solid red !important;
}
/* snackbar_css_start */
.mdmContainer #snackbar_module {
  display: none;
  position: fixed;
  background: #F89406 ;
  padding: 15px;
  right: 2%;
  border-radius: 5px;
  text-transform: capitalize !important;
  z-index: 9999;
  top: 4%;
  text-align: left;
  width: 20%;

}

.mdmContainer .mat-expansion-panel-content {
  font-family: 'Open Sans', sans-serif !important;
}

.mdmContainer #snackbar_module h2 {
  color: #FFFFFF;
  margin: 0;
  text-transform: capitalize !important;
  font-weight: 500;
  font-size: 1.6rem !important;
}

.mdmContainer .mr_left_70 {
  height: 30px !important;
}

.mdmContainer .pd_8 input.input_padding {
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}

.mdmContainer .card_body {
  padding: 1px 0 20px !important;
  border-radius: 10px !important;
  box-shadow: 0 0.2rem 0.2rem #00000029 !important;
}

@keyframes fadeIn {

  0% {
    opacity: 0
  }

  100% {
    opacity: 1
  }
}

@keyframes fadeOut {

  0% {
    opacity: 1
  }

  100% {
    opacity: 0
  }
}

/* adarsh css end */
.mdmContainer .upper-case {
  text-transform: uppercase;
}

.mdmContainer .date_choose_picker {
  font-size: 17px !important;
  color: #c5c2c2 !important;
  font-weight: 300 !important;
}

/*Chosen style*/
.mdmContainer .chosen-wrapper {
  margin: 0 auto 25px;
  max-width: 400px;
  position: relative;
}

.mdmContainer .chosen-wrapper:after {
  pointer-events: none;
  content: "";
  position: absolute;
  top: 32px;
  right: 20px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid rgba(0, 0, 0, 0.5);
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 9;
}

.mdmContainer .chosen-wrapper.is-active:after {
  border-top: 8px solid black;
  -ms-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

.mdmContainer .chosen-wrapper .chosen-container .chosen-single {
  border-radius: 0;
  height: 70px;
  border: solid 2px #d9d9d9;
  font-size: 22px;
  color: rgba(0, 0, 0, 0.5);
  padding: 0 30px;
  line-height: 66px;
  transition: all 0.3s ease;
  box-shadow: none;
  background: #fff;
}

.mdmContainer .chosen-wrapper .chosen-container .chosen-single b {
  display: none !important;
}

.mdmContainer .chosen-wrapper .chosen-container .chosen-single span {
  letter-spacing: 0;
  padding: 0;
  line-height: inherit;
}

.mdmContainer .chosen-wrapper .chosen-container.chosen-with-drop .chosen-single {
  border-width: 2px 2px 1px;
  border-color: #000 #000 #d9d9d9;
  color: #000;
  background-image: none;
}

.mdmContainer .chosen-wrapper .chosen-container.chosen-with-drop .chosen-drop {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.mdmContainer .chosen-wrapper .chosen-container.chosen-container-single-nosearch .chosen-search {
  display: none;
}

.mdmContainer .chosen-wrapper .chosen-container .chosen-drop {
  letter-spacing: 0;
  border-radius: 0;
  box-shadow: none;
  border-width: 0 2px 2px;
  border-color: #000;
  margin-top: 0;
  -webkit-transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  -o-transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  opacity: 0;
}

.mdmContainer .chosen-wrapper .chosen-container .chosen-results {
  font-size: 22px;
  color: #000;
  max-height: 245px;
  margin: 0;
  padding: 0;
}

.mdmContainer .chosen-wrapper .chosen-container .chosen-results li {
  padding: 16px 30px 18px;
  margin: 0;
  border-bottom: 1px solid #e5e5e5;
  -webkit-transition: all 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  -o-transition: all 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  transition: all 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  line-height: 20px;
}

.mdmContainer .chosen-wrapper .chosen-container .chosen-results li.highlighted {
  background-color: #eeeeee !important;
  color: #000;
  background-image: none;
}

.mdmContainer .chosen-wrapper--style2:after {
  right: 0;
}

.mdmContainer .chosen-wrapper--style2:before {
  content: '';
  width: 0;
  border-top: 2px solid #000;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  transition: all 0.2s cubic-bezier(0.06, 1, 0.89, 0.85);
}

.mdmContainer .chosen-wrapper--style2.is-active:before {
  width: 100%;
}

.mdmContainer .chosen-wrapper--style2 .chosen-container .chosen-single {
  border-width: 0 0 2px;
  padding: 0;
}

.mdmContainer .chosen-wrapper--style2 .chosen-container.chosen-with-drop .chosen-single {
  border-width: 0 0 2px;
}

.mdmContainer .chosen-wrapper--style2 .chosen-container.chosen-with-drop .chosen-drop {
  opacity: 1;
  visibility: visible;
  transform: translateY(5px);
}

.mdmContainer .chosen-wrapper--style2 .chosen-container .chosen-drop {
  border-color: #d9d9d9;
  border-top: 2px solid #d9d9d9;
}

.mdmContainer .chosen-wrapper--style2 .chosen-container .chosen-results li {
  padding: 16px 15px 18px;
}

/*ScrollBox style*/
.mdmContainer .nicescroll-rails {
  border-left: 1px solid #d9d9d9;
  transform: translate(-2px);
  top: 0 !important;
  cursor: pointer;
}

.mdmContainer .nicescroll-rails .nicescroll-cursors {
  width: 6px !important;
  margin-right: 2px;
}

.mdmContainer .link {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 20px;
}

.mdmContainer .link a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
}

.mdmContainer .link .fa {
  font-size: 28px;
  margin-right: 8px;
  color: #000;
}

.mdmContainer .mapping_dropdown .mat-form-field-type-mat-select .mat-form-field-label {
  color: #333 !important;
}

.mdmContainer .mapping_dropdown .mat-row {
  min-height: 7vh !important;
}

.mdmContainer .mapping_dropdown .select_box_dropwodn .mat-form-field-flex {
  box-shadow: none !important;
  border-radius: 0 !important;
  border: 1px solid #6a6868 !important;
  margin: 0px 0 !important;
  padding: 0px !important;
  background: #fff !important;
  height: 3rem !important;
}

.mdmContainer .mapping_dropdown .select_box_dropwodn {
  height: 23px;
}

.mdmContainer .rupee_icon {
  position: absolute;
  top: -15px;
  left: 6px;
}

.mdmContainer .tab_btn_active {
  margin: 0 20px 0px 0 !important;
  padding: 35px 0px 70px !important;
  color: #fff;
  background: #27AE60;
  font-weight: 600;
}

.mdmContainer .tab_btn_active p {
  font-size: 12px;
}

.mdmContainer .tab_btn_deactive p {
  font-size: 12px;
}

.mdmContainer .tab_btn_deactive {
  margin: 0 20px 0px 0 !important;
  padding: 35px 0px 70px !important;
  color: #27AE60;
  background: #fff;
  font-weight: 600;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12) !important;
}

.mdmContainer .search_icon {
  z-index: 1 !important;
  color: #fff !important;
  cursor: pointer;
}


/* branch css start */
.mdmContainer .search_branch h3 {
  border-bottom: 1px solid #ddd;
  margin: 0px;
  margin-bottom: 15px;
}

.mdmContainer .last_update h3 {
  border-bottom: 1px solid #27AE60;
  font-weight: 400;
}

.mdmContainer .all_branch_main {
  border-right: 1px solid #ddd;
  padding-right: 5%;
  min-height: 300px;
}

.mdmContainer .all_branch_select .mat-select {
  border: 1px solid #27ae60;
  font-size: 12px;
  position: relative !important;
  padding: 0 0 0px 4px;
  height: 3.6rem;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
    color: #fff !important;
    position: relative !important;
}
 .mdmContainer .all_branch_select {
  background: #27ae60;
    color: #fff;
}
.mdmContainer .all_branch_select .mat-select-value-text{
   margin: 0px !important;
    color: #fff;
}
.mdmContainer .all_branch_select  .mat-select-arrow{
    color: #fff;
}
.mdmContainer .search_branch_name span{
font-size:2.5rem;
font-weight: 600;
}

.mdmContainer .search_branch_name{
margin: 0 0 20px;
}
.mdmContainer .search_branch_name hr{
    margin: 2px 0;
    width: 15%;
    border-bottom: 1px solid #27ae60;
    text-align: left;
}
.mdmContainer .all_brnach_search input.mat-input-element {
  padding: 0px 0px 0px 24px;
  margin-left: 2px;
  border: 1px solid #ddd;
  width: 76%;
  margin-top: -3px;
  font-size: 12px;
  text-transform: uppercase;
}

.mdmContainer .all_brnach_search {
  position: relative;
}

.mdmContainer .all_brnach_search i {
  position: absolute;
  top: 3px;
  left: 4px;
  font-size: 18px;
}
.mdmContainer .all_brnach_search em {
  position: absolute;
  top: 3px;
  left: 4px;
  font-size: 18px;
}


.mdmContainer .all_brnach_search button {
  position: absolute;
  top: 0px;
  right: -5px;
  font-size: 12px;
  background: #27AE60;
  color: #fff;
  width: 25px;
  height: 25px;
  min-width: 25px !important;
  border-radius: 30px !important;
  box-shadow: 0px 6px 6px #0000003D;
}

.mdmContainer .all_branch_right .mat-row {
  padding: 0px 5px;
  margin-bottom: 8px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, .12);
}

.mdmContainer .all_branch_right .mat-cell {
  text-transform: uppercase;
}

.mdmContainer .branch_table_head {
  background: #eeeeee !important;
  min-height: 35px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 35px;
  border-bottom: 1px solid rgba(0, 0, 0, .12);
}

.mdmContainer .branch_table_dis {
  background: #fff;
  min-height: 30px;
}

.mdmContainer .branch_table_dis .mat-button {
  line-height: 16px !important;
}

.mdmContainer .branch_table_dis .material-icons {
  font-size: 20px;
  color: #27AE60;
}

.mdmContainer .all_branch_right .mat-table {
  padding-top: 15px;
}

.mdmContainer .comm_table_responsive {
  overflow-x: scroll;
}

.mdmContainer .comm_mat_table {
  width: 130%;
  display: table;
}
.mdmContainer .comm_mat_table.pricing_mat_table {
  width: 100%;
}

.mdmContainer .comm_table_responsive .mat-row {
  display: table-row;
}

.mdmContainer .comm_table_responsive .mat-cell {
  display: table-cell;
  border-bottom: 1px solid rgba(0, 0, 0, .12);
}

.mdmContainer .width_mat_cell_1 {
  width: 9%;
}

.mdmContainer .width_mat_cell_2 {
  width: 9%;
}

.mdmContainer .width_mat_cell_3 {
  width: 6%;
}

.mdmContainer .card_mb {
  margin-bottom: 30px;
}

.mdmContainer .create_branch h3 {
  margin: 0px;
  margin-bottom: 15px;
  font-weight: 600;
}

.mdmContainer .create_branch h4 {
  border-bottom: 2px solid #27AE60;
  margin: 0px;
  margin-bottom: 15px;
  font-weight: 400;
  font-weight: 700;
}

.mdmContainer .brnch_feature_header {
  border-bottom: 2px solid #27AE60;
  border-radius: 0px !important;
  padding: 0px !important;
  height: 40px !important;
}

.mdmContainer .shadow_none {
  box-shadow: none !important;
  position: relative;
}

.mdmContainer .brnch_feature_header:hover {
  background-color: transparent !important;
}

.mdmContainer .branch_feature_heading h2 {
  font-size: 15px;
  font-weight: 700;
  margin: 0px;
}

.mdmContainer .assign_feature_pt {
  padding-top: 10px;
}

.mdmContainer .branch_merge_position {
  text-align: right;
  float: right;
  font-weight: 700;
  color: #27AE60;
  cursor: pointer;
}

.mdmContainer .branch_next_btn {
  text-align: center;
}

.mdmContainer .width_block {
  width: 100%;
}

.mdmContainer .branch_next_btn button {    
  cursor: pointer !important;
  font-size: 1.6rem !important;
  background-color: #27AE60 !important;
  border: 0.2rem solid #27AE60 !important;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  margin: 0 1rem;
  font-family: "Open Sans", sans-serif !important;
  border-radius: 2rem !important;
  padding: 0 1.6rem !important;
  line-height: 1.8 !important;
  color: #fff !important;
}

.mdmContainer .branch_next_btn button:hover {
  background: #81c784 !important;
  border-color: #81c784 !important;
}

.mdmContainer .radio_button_pr {
  padding-right: 15px;
}

.mdmContainer .branch_add_brn {
  background: #27AE60;
  color: #fff;
  border-radius: 50% !important;
  min-width: auto !important;
  padding: 2px 3px !important;
  box-shadow: 0px 6px 6px #0000003D;
  line-height: 23px !important;
}

.mdmContainer .branch_bg_gray {
  background: #6a6868;
}

.mdmContainer .branch_bg_gray h5 {
  text-align: center;
  margin: 0px;
  color: #fff;
  padding: 9px 0px;
  font-size: 1.6rem;
  font-weight: 600;
}

.mdmContainer .brnach_add_assign {
  position: relative;
}

.mdmContainer .brnach_add_assign button {
  position: absolute;
  top: 0px;
  right: -40px;
}

.mdmContainer .last_update {
  padding: 0px;
}

.mdmContainer .pin_branch_mapping h3 {
  margin: 0px;
  font-size: 2rem !important;
  font-weight: 700;
  height: 3rem;
}

.mdmContainer .pin_branch_pb {
  padding-bottom: 15px;
}

.mdmContainer .branch_sub_heading {
  font-size: 15px !important;
  font-weight: 700;
  color: #27AE60;
}

/* branch css end */

.mdmContainer .round_icon_btn {
  padding: 0 !important;
  width: 35px;
  height: 35px;
  border-radius: 30px !important;
}

.mdmContainer .round_icon_btn .mat-button-wrapper {
  margin: auto;
  margin-top: -2px;

}

/* manage route css start */
.mdmContainer .manage_route_table .mat-table {
  padding: 5px 0px;
}

.mdmContainer .manage_route_table {
  border-radius: 0px;
  border: 1px solid #ddd;
  padding: 0px;
}

.mdmContainer .route_searchbar .search_bar {
  position: absolute;
  top: 3px;
  font-size: 20px;
  left: 4px;
}

.mdmContainer .route_searchbar input {
  padding-left: 22px;
  width: 100%;
}

.mdmContainer .line_height_55 h3 {
  line-height: 30px !important;
}

.mdmContainer .bg_green {
  background-color: #27AE60 !important;
}

.mdmContainer .bg_green .route_deactive h3 {
  color: #fff !important;
}

.mdmContainer .manage_route_tab {
  text-align: center;
  height: 66px;
  border-radius: 0px !important;
  margin: 15px 0px 10px 0px;
  padding: 20px 5px !important;
  cursor: pointer;
}

.mdmContainer .bg_dark_gary {
  background: #eee !important;
}

.mdmContainer .product_active_btn {
  background: #F1F1F1 !important;
}

.mdmContainer .manage_route_tab h3 {
  line-height: 24px;
}

.mdmContainer .bg_gray_color {
  background-color: #F1F1F1 !important;
}

.mdmContainer .route_active {
  background-color: #27AE60 !important;
}

.mdmContainer .route_active h3 {
  color: #fff !important;
}


.mdmContainer .color_dark {
  background-color: #F1F1F1 !important;
}

.mdmContainer .color_dark h3 {
  color: #333 !important;
}

.mdmContainer .form-control {
  margin: 0 !important;
  height: 2.7rem !important;
  box-shadow: none;
}

.mdmContainer .route_deactive {
  background-color: #fff;
}

.mdmContainer .route_deactive h3 {
  color: #27AE60;
}

.mdmContainer .route_touch_point {
  padding: 25px;
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
}

.mdmContainer .route_touch_point h4 {
  border: none;
}

.mdmContainer .padding_0 {
  padding: 0px;
}

.mdmContainer .manage_schedule {
  padding-top: 15px;
}

.mdmContainer .manage_schedule h4 {
  border: none;
}


/* manage route css end */
.mdmContainer .order_dragan_drop {
  position: absolute;
  top: 42%;
  left: 15px;
}

.mdmContainer .order_dragan_drop i {
  font-size: 40px;
  color: #27AE60;
  display: inline;
}
.mdmContainer .order_dragan_drop em {
  font-size: 40px;
  color: #27AE60;
  display: inline;
}

.mdmContainer .orgination_modal_inner {
  width: 90%;
  margin: auto;
}

.mdmContainer .rr_value_round {
  width: 25px;
  height: 30px;
  margin-bottom: 15px !important;
}

.mdmContainer .mt_15 {
  margin-top: 15px !important;
}

@media only screen and (max-width:1440px) and (min-width: 1366px) {
.mdmDialog .adjust_text_overflow {
    display: -webkit-inline-box;
    display: inline-flex;
    overflow: hidden;
    min-width: 50px;
}
  .mdmContainer .active_btn,
  .mdmContainer .deactive_btn {
    width: 154px;
    height: 37px;
  }

  .mdmContainer .mat-form-field-label {
    top: 17px !important;
  }

  .mdmContainer .mapping_dropdown .select_box_dropwodn {
    height: 3rem;
  }

  .mdmContainer .container {
    width: 100%;
    margin: 0;
    padding: 0;
  }


  .mdmContainer .mat-select-arrow {
    margin-top: 0px !important;
  }

  .mdmContainer .date_picker_adjust .mat-input-element {
    padding: 4px;
    margin: 0;
    font-size: 1.6rem;
    height: 22px;
  }

  .mdmContainer .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-datepicker-toggle-default-icon {
    margin-top: 0.4rem;
  }

  .mdmContainer .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,
  .mdmContainer .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button {
    font-size: 12px !important;
  }

}

@media only screen and (max-width:1365px) and (min-width: 1024px) {

  .mdmContainer .hdr_srch_field input {
    width: 100px;
  }
.mdmContainer .invalid-feedback{
    font-size: 1rem !important;
}
.mdmDialog .adjust_text_overflow {
    display: -webkit-inline-box;
    display: inline-flex;
    overflow: hidden;
    min-width: 50px;
}
.mdmContainer .margin--11{
    margin: -16px 0 !important;
}
.mdmContainer .invalid-feedback2{
    font-size: 1rem !important;
}
  .mdmContainer .add_btn {
    margin-left: 4px !important;
  }

  .mdmContainer .mat_card_zone .mat-row {
    min-height: 2vh;
  }

  .mdmContainer .container {
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .mdmContainer .active_btn,
  .mdmContainer .deactive_btn {
    width: 11vw;
    height: 37px;
    margin-bottom: 8px !important;
    font-size: 11px !important;
  }

  .mdmContainer .line_height_55 h3 {
    line-height: 24px !important;
  }

  .mdmContainer .hdr_srch_field .search_icon {
    top: 5px !important;
    font-size: 1.6rem;
  }


  .mdmContainer .date_picker_adjust .mat-input-element {
    padding: 0px 0px 0px 0px;
    margin: 7px 0 8px;
  }

  .mdmContainer .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,
  .mdmContainer .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button {
    font-size: 13px !important;
  }

  .mdmContainer .mapping_dropdown .select_box_dropwodn {
    height: 30px;
  }

  .mdmContainer .card_white {
    width: 175px !important;
  }

  .mdmContainer .table_main_header .mat-cell {
    text-transform: uppercase;
  }

  .mdmContainer .hdr_srch_field .material-icons {
    left: 15px !important;
  }

  .mdmContainer .hdr_srch_field {
    padding-left: 10px !important;
  }

  .mdmContainer .user-img img {
    margin: 0 0px 0 30px !important;
  }

  .mdmContainer .mat-icon-button.menu_icon_position {
    position: absolute;
    top: 10px;
    left: 0;
    padding: 0 15px;
  }
  

  .mdmContainer .mat-icon-button.header_bell {
    position: absolute;
    right: 20%;
    top: 0 !important;
    padding: 0 15px;
  }

  .mdmContainer .hdr_srch_field .search_icon {
    font-size: 1.5vw;
  }

}

@media only screen and (max-width:1280px) and (min-width: 800px) {
  .mdmContainer .container {
    width: 100%;
    padding: 0;
    margin: 0;
  }
}

@media only screen and (max-width:1702px) and (min-width:1446px) {
  .mdmContainer .hdr_srch_field input {
    padding-left: 21px;
    border: 1px solid #ddd;
    width: 166px;
  }

}

@media only screen and (max-width:1023px) and (min-width: 768px) {
  .mdmContainer .hdr_srch_field input {
    width: 65px;
  }
.mdmContainer .invalid-feedback{
    font-size: 1rem !important;
}
.mdmContainer .invalid-feedback2{
    font-size: 1rem !important;
}
  .mdmContainer .material-icons {
    font-size: 20px;
  }

  .mdmContainer .add_btn {
    background: #27AE60 !important;
    color: #fff !important;
    width: 20px;
    height: 20px;
    line-height: 17px !important;
    min-width: 20px !important;
    padding-left: 0px !important;
    border-radius: 30px !important;
    margin-left: 10px !important;
    box-shadow: 0px 6px 6px #0000003D;
    font-size: 10px !important;
  }

  .mdmContainer .mat-select-arrow {
    margin-top: -8.5px !important;
  }

  .mdmContainer .mat-select {
    height: 17px;
    position: relative !important;
  }

  .mdmContainer .add_btn {
    margin-left: 4px !important;
  }

  .mdmContainer .mat_card_zone .mat-row {
    min-height: 2vh;
  }

  .mdmContainer .card_white {
    width: 140px !important;
  }

  .mdmContainer .card_white p {
    width: 74px;
    margin: 48px 7px;
  }

  .mdmContainer .active_btn,
  .mdmContainer .deactive_btn {
    height: 3vh;
  }

  .mdmContainer .mat_card_zone .mat-row {
    min-height: 2vh;
  }
}

@media only screen and (max-width:767px) {

  .mdmContainer .card_white {
    width: 100% !important;
    margin-top: 20px;
  }

  .mdmContainer .all_form {
    padding: 0 0px;
  }

  .mdmContainer .active_btn,
  .mdmContainer .deactive_btn {
    margin: 0px;
    padding: 0 9px;
    width: 100px;
    border-radius: 0;
    margin-right: 5px !important;
  }

  .mdmContainer .mat_card_zone .mat-grid-tile .mat-figure {
    padding: 0px;
  }  

  .mdmContainer .grid_title {
    margin: 13px 0;
  }

  .mdmContainer .button_grid_position:before {
    display: none;
  }

  .mdmContainer .mobile_height_sidebar {
    height: 66px !important;
  }

  .mdmContainer .coll_lookpup_height {
    height: 100px !important;
  }

  .mdmContainer .mat_card_zone {
    padding: 15px !important;
  }

  .mdmContainer .mat-grid-tile.notepad_open_card .mat-figure {
    padding: 0;
  }

  .mdmContainer .mat-grid-tile.notepad_card .mat-figure {
    padding: 0;
  }

  .mdmContainer .mat-grid-tile.module_area .mat-figure {
    justify-content: flex-start !important;
  }

  .mdmContainer .container {
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .mdmContainer .add_btn {
    float: right;
    position: absolute !important;
    right: -45px;
    top: 0;
  }


  .mdmContainer .hdr_srch_field {
    padding-left: 0px;
    position: relative;
    margin: 5px 0px;
    width: 146px;
    margin: 0 25px;
  }

  .mdmContainer .mapping_dropdown .select_box_dropwodn .mat-form-field-flex {
    height: 27px !important;
  }
}


.mdmContainer .pin_slab_list_dropdown {
  width: 94% !important;
  margin: auto !important;
}


.mdmContainer .notepad_view_table mat-expansion-panel {
  border-radius: 0 !important;
  background-color: #f1f1f1 !important;
  box-shadow: none !important;
}

.mdmContainer .notepad_view_table mat-expansion-panel-header {
  height: 34px !important;
}

.mdmContainer .notepad_view_table mat-panel-title {
  color: #333 !important;
  font-weight: 700 !important;
  font-size: 2rem !important;
}

.mdmContainer .display_flex {
  list-style-type: none;
}

.mdmContainer i.icon_btn_display {
  font-size: 2.5rem;
  margin: 5px 7px;
  cursor: pointer;
}

.mdmContainer em.icon_btn_display {
  font-size: 2.5rem;
  margin: 5px 7px;
  cursor: pointer;
}
.mdmContainer .add_btn_icon {
  font-size: 2.5rem;
  background: #27AE60 !important;
  color: #fff !important;
  width: 26px;
  text-align: center;
  height: 26px;
  line-height: 26px !important;
  padding-left: 0 !important;
  border-radius: 30px !important;
  margin-left: 10px !important;
  box-shadow: 0px 5px 5px #0000003D;
  cursor: pointer;
}

.mdmContainer .add_btn_icon:hover {
  background-color: #81C784 !important;
}

.mdmContainer .edit_btn_color {
  color: #27AE60 !important;
  margin: 0 7px !important;
  cursor: pointer;
}

.mdmContainer .mr-top--10 {
  margin: -10px 0 !important;
}

.mdmDialog i.icon_btn_display {
  font-size: 2.5rem;
  margin: 5px 7px;
  cursor: pointer;
}

.mdmDialog em.icon_btn_display {
  font-size: 2.5rem;
  margin: 5px 7px;
  cursor: pointer;
}
.mdmDialog .add_btn_icon {
  font-size: 2.5rem;
  background: #27AE60 !important;
  color: #fff !important;
  width: 26px;
  text-align: center;
  height: 26px;
  line-height: 26px !important;
  padding-left: 0 !important;
  border-radius: 30px !important;
  margin-left: 10px !important;
  box-shadow: 0px 5px 5px #0000003D;
  cursor: pointer;
}

.mdmDialog .add_btn_icon:hover {
  background-color: #81C784 !important;
}

.mdmDialog .edit_btn_color {
  color: #27AE60 !important;
  margin: 0 7px !important;
  cursor: pointer;
}

.mdmDialog .mr-top--10 {
  margin: -10px 0 !important;
}

.mdmContainer .display_flex li {
  font-size: 2rem;
  font-weight: 600;
  display: inline-block;
  margin: 0 10px 0 0;
}

.mdmContainer .Retegroup_all_form {
  text-align: right;
  margin: 30px 0;
  font-size: 1.6rem;
  font-weight: 600;
  color: red;
}

.mdmContainer .notepad_bdr {
  border-top: 2px solid #27ae60;
  width: 100%;
  margin: auto;
  padding: 10px 0;
}

.mdmContainer .font-wt-600 {
  font-weight: 600;
}

.mdmContainer .back_notepad {
  text-align: right;
  -moz-text-align: right;
  font-size: 14px;
  margin: 0 1px;
  font-weight: 600;
  color: #14773e;
  cursor: pointer;
}

.ngx-select__choices {
  width: 100%;
  height: auto;
  max-height: 200px;
  overflow-x: hidden;
  margin-top: 0;
  position: absolute;
  border-radius: 0px !important;
  border: 1px solid !important;
  border-top: 0px !important;
}

.mdmContainer .listlogistics {
  text-align: left;
  margin: 0 20px !important;
}

.mdmContainer .table_scroll {
  max-height: 500px !important;
  overflow-y: scroll;
}

/* Container Form CSS */

.mdmContainer .input_control {
  width: 100%;
}

.mdmContainer .input_control input,
.mdmContainer .input_control select,
.mdmContainer .input_control textarea {
  padding: 5px;
  border: 1px solid #f1f1f1;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
  width: 100%;
  background: transparent;
}

.mdmContainer .input_control input::placeholder,
.mdmContainer .input_control textarea::placeholder {
  padding-left: 0px;
}

.mdmContainer .bdr_radius_0 {
  box-shadow: none !important;
  border-radius: 0px !important;
}

.mdmContainer .mr_00 {
  margin: 0px !important;
}

.mdmContainer .mat-option.mat-option-disabled {
  color: #9a9999 !important;
}


.mdmContainer .mat-form-field-appearance-outline .mat-form-field-infix {
  padding: 0 !important;
  border-radius: 3px;
  overflow: hidden;
}

.mdmContainer .mat-form-field-appearance-outline .mat-form-field-outline {
  color: #1a1a1a;
  display: none;
  top: 0 !important;
}

.mdmContainer .mat-form-field-type-mat-native-select .mat-form-field-infix::after {
  border-left: 7px solid transparent !important;
  border-right: 7px solid transparent !important;
  border-top: 13px solid !important;
  top: 40% !important;
  right: 6px !important;
}

.mdmContainer .mat-form-field-appearance-outline .mat-form-field-outline-thick {
  color: #27AE60;
  opacity: 1;
}

.mdmContainer .mat-form-field-infix {
  border-top: 0px;
  width: auto !important;
}

.mdmContainer .mat-form-field-appearance-outline .mat-form-field-suffix {
  top: -2px !important;
}

.mdmContainer .top_10 .date_picker_adjust .mat-input-element {
  top: 3px 0 !important;
}


.mdmContainer .date_picker_adjust .mat-input-element {
  padding: 4px;
  margin: 0;
  height: 3rem;
}

.mdmContainer .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-datepicker-toggle-default-icon {
  margin-top: 0.4rem;
}

.mdmContainer .mat-form-field-appearance-outline .mat-form-field-flex {
  border: 1px solid #6A6868;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
}

.mdmContainer .text_area_input.mat-form-field-appearance-outline .mat-form-field-flex {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  border: 1px solid #6A6868;
  height: auto;
}

.mdmContainer .mat-select-value-text {
  margin: 0px !important;
}

.mdmContainer .mandatory_input .mat-form-field-flex {
  border: 1px solid #f44336 !important;
}

.mdmContainer .mat-form-field-type-mat-select .mat-form-field-label {
  margin: -2px 12px !important;
  color: #ddd;
}

.mdmContainer .mandatory_input.mat-form-field-appearance-outline.mat-form-field-invalid.mat-form-field-invalid .mat-form-field-outline-thick {
  color: #f44336;
}

.mdmContainer .mat-cell .mat-form-field-type-mat-select .mat-form-field-label {
  margin: -1px 12px !important;
}

.mdmContainer .mat-form-field.mat-form-field-invalid .mat-form-field-label mat-label {
  color: red;
}

.mdmContainer .mat_card_zone .mat-row.table_main_header {
  background: #F1F1F1;
  font-weight: 700;
}

.mdmContainer .mat-checkbox-checked.mat-accent .mat-checkbox-background,
.mdmContainer .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
  background-color: #27AE60 ;
}

.mat-checkbox-checked.mat-accent .mat-checkbox-background,
.mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
  background-color: #27AE60 ;
}

.mdmContainer .mat-checkbox-background {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  transition: #27AE60 90ms cubic-bezier(0, 0, .2, .1), opacity 90ms cubic-bezier(0, 0, .2, .1) !important;
}

.mdmContainer .select_down_dropdown .mat-form-field-flex {
  border: 1px solid;
  height: 34px;
  border-radius: 3px;
  box-shadow: 0px 2px 6px #00000029;
}

.mdmContainer .select_down_dropdown select {
  padding: 0 !important;
  height: 17px !important;
  text-transform: uppercase;
}

.mdmContainer .all_form {
  padding: 0 20px;
}

.mdmContainer .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,
.mdmContainer .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button {
  height: 0.5em !important;
  padding: 2px 0;
}

.mdmDialog .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,
.mdmDialog .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button {
  height: 1.5em !important;
  padding: 2px 0;
}

.mdmContainer .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-datepicker-toggle-default-icon {
  font-size: 1.6rem !important;
}

.mdmContainer .mat-select {
  text-transform: uppercase !important;
  border: 1px solid #6a6868;
  padding: 4px 0 0 4px;
  height: 3rem;
  box-shadow: none !important;
}
.mdmContainer .search_select_branch.mat-select {
  padding: 0 0 0 4px;
}
.mdmContainer .select_down_dropdown .mat-form-field-label {
  margin: 0 5px !important;
}

.mdmContainer .mat-grid-tile.module_area .mat-figure {
  padding: 0px 0px !important;
  text-align: center;
}

.mdmContainer .mat_card_zone form {
  margin-top: -5px;
  margin-bottom: 1rem;
}

.mat-form-field-appearance-outline .mat-form-field-flex {
  padding: 0 !important;
  margin-top: -2px !important;
}

.mdmContainer .all_form select {
  width: 100%;
  height: 34px;
  background: #fff;
}

.mdmContainer .mat-form-field-appearance-outline .mat-form-field-outline-start {
  border-radius: 3px 0 0 3px !important;
}

.mdmContainer .mat-form-field-appearance-outline .mat-form-field-outline-end {
  border-radius: 0 3px 3px 0 !important;
}

.mdmContainer .select_box_dropwodn .mat-form-field-flex {
  box-shadow: none;
  border-radius: 0px;
  /* border: 1px solid #6a6868; */
  position: absolute;
}

/* .mdmContainer .select_box_dropwodn .mat-form-field-flex .mat-select {
  border: none;
} */

.mdmContainer .mat-select-arrow {
  border-left: 4px solid transparent !important;
  border-right: 4px solid transparent !important;
  border-top: 9px solid !important;
  right: 8px !important;
  margin-top: -1.5px !important;
}

.mdmContainer .mat-form-field-appearance-legacy .mat-form-field-infix {
  padding: 0px;
  height: 3rem;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
}

.mdmContainer .mat-select-panel .mat-option {
  border-bottom: 1px solid #ddd !important;
  background: #fff !important;
  border-top: none !important;

}

.mdmContainer .mat-select-panel .mat-option:hover {
  background: #27AE60 !important;
  color: #fff;
}


.mdmContainer .mat-select-panel:not([class*=mat-elevation-z]) {
  border: 2px solid #27AE60;
  box-shadow: none;
}


.mdmContainer .cursor_auto {
  cursor: auto;
}

.mdmContainer .mat-primary .mat-option.mat-selected:hover {
  color: #fff !important;
}

.mdmContainer .select_box_dropwodn .mat-form-field-flex:active {
  border: 1px solid transparent;
  box-shadow: 0px 0px 0px 2px #27AE60 inset;
}

.mdmContainer .select_box_dropwodn .mat-form-field-flex:focus {
  border: 1px solid transparent;
  box-shadow: none;
}

.mdmContainer .add_branch_main mat-label {
  font-size: 1.6rem;
}

.mdmContainer .mat_select {
  border: 1px solid #6a6868;
  border-radius: 0;
  margin-bottom: 22px;
  padding: 0 4px;
  height: 3rem;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
}

.mdmContainer label {
  font-size: 1.6rem !important;
}
.mdmDialog p.safetextmsg{
    font-size: 11px;
    text-align: left;
    line-height: 14px;
    margin: 5px 0;
    color: #3f63b5;
}
.mdmContainer .mat_select:hover,
.mdmContainer .mat_select:focus {
  border: 1px solid #27AE60;
}

.mdmContainer .search_branch_detail {
  position: relative;
}

.mdmContainer .search_branch_detail i {
  position: absolute;
  top: 4px;
  left: 3px;
  font-size: 15px;
}
.mdmContainer .search_branch_detail em {
      position: absolute;
    top: 6px;
    left: 3px;
    font-size: 13px;
}
.mdmContainer .search_branch_detail em.search_icon {
  color: #000 !important;
}
.mdmContainer .search_branch_detail input {
  width: 94%;
}

.mdmContainer .branch_date_piker .mat-form-field-flex {
  height: 28px;
  width: 75%;
  top: 4px !important;
}

.mdmContainer .last_update .mat-form-field-wrapper {
  padding-bottom: 0px !important;
}

.mdmContainer .mat-form-field-appearance-legacy.command_dropdown .mat-form-field-infix {
  padding: 0px !important;
}

.mdmContainer .table_input .mat-form-field-appearance-outline .mat-form-field-flex {
  width: 75%;
  margin: 0px !important;
}

.mdmContainer .table_input .mat-form-field-wrapper {
  padding-bottom: 0px !important;
}

.mdmContainer .add_branch_main .table_input input {
  padding: 4px 5px;
}

.mdmContainer .rupees_adjust_field .mat-form-field-infix {
  padding: 0px 17px 0 !important;
  border-radius: 3px !important;
}

.mdmContainer .mat-form-field-appearance-outline.mandatory_input .mat-form-field-outline {
  color: #f44336 !important;
}

.mdmContainer .mandatory_input .mat-checkbox-frame {
  border-color: red !important;
}

.mdmContainer .mat-pseudo-checkbox-checked {
  background: #27ae60 !important;
}

.mdmContainer .mat-form-field-appearance-legacy .mat-form-field-wrapper {
  width: 100% !important;
}

.mdmContainer .mat-placeholder-required.mat-form-field-required-marker {
  display: none;
}

.mdmContainer .ngx-select__item {
  padding: 2px 6px !important;
  line-height: 2.3rem !important;
  font-size: 1.6rem !important;
}

/* Container Form CSS */


/* Dialog Form CSS */


.mdmDialog .mat-form-field-appearance-legacy .mat-form-field-wrapper {
  width: 100% !important;
}

.mdmDialog .mat-placeholder-required.mat-form-field-required-marker {
  display: none;
}
.mdmDialog .adjust_text_overflow{
    display: inline-flex;
    overflow: hidden;
}
.mdmDialog .dislay_flex{
    display:flex;
    padding: 0 4px;
}
.mdmDialog .pd_00{
     padding: 0px !important;
}
.mdmDialog .pd_00 .radio_button_pr {
    padding-right: 0px !important;
}
/* Dialog Form CSS */

/* Form CSS */

.mat-button-ripple.mat-ripple,
.mat-button-focus-overlay {
  visibility: hidden;
}

.mat-accent .mat-pseudo-checkbox-checked,
.mat-accent .mat-pseudo-checkbox-indeterminate,
.mat-pseudo-checkbox-checked,
.mat-pseudo-checkbox-indeterminate {
  background: #27ae60 !important;
}
.mdmContainer .mat-form-field-disabled .mat-form-field-flex {
  background-color: #eee;
}
.mdmDialog .mat-form-field-disabled .mat-form-field-flex {
  background-color: #eee;
}
.mdmContainer .selection_dropdown .ngx-select__toggle {
  color: #333 !important;
  border-color: #ccc !important;
  border-radius: 0px !important;
  height: 3.5rem !important;
  padding: 0 26px;
  border: 1px solid #333 !important;
}

.mdmContainer .selection_dropdown .form-control {
  padding: 0 26px;
  border-radius: 0px;
  border: 1px solid #333;
}
.mdmDialog .selection_dropdown .ngx-select__toggle {
  color: #333 !important;
  border-color: #ccc !important;
  border-radius: 0px !important;
  height: 3.5rem !important;
  padding: 0 26px;
  border: 1px solid #333 !important;
}

.mdmDialog .selection_dropdown .form-control {
  padding: 0 26px;
  border-radius: 0px;
  border: 1px solid #333;
}

.mdmContainer .search_icon_dropdown {
  position: absolute;
  font-size: 2.5rem !important;
  margin: 3px;
  z-index: 999;
}
.mdmDialog .search_icon_dropdown {
  position: absolute;
  font-size: 2.5rem !important;
  margin: 3px;
  z-index: 999;
}

.mdmContainer .display_overflow_hidden {
  min-height: 22px !important;
  height: 22px !important;
  display: block !important;
  overflow: hidden !important;
}
.mdmDialog .display_overflow_hidden {
  min-height: 22px !important;
  height: 22px !important;
  display: block !important;
  overflow: hidden !important;
}

/* Form CSS */
.mdmContainer .commnd_txt {
  width: 175px;
  display: inline-block;
  overflow: hidden;
  background: #eee;
  padding: 1px 4px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  border: 1px solid #6a6868;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: not-allowed;
}

.mdmContainer .text-center {
  text-align: center !important;
}

.mdmContainer .cursor-none {
  cursor: default !important;
}

.mdmDialog .cursor-none {
  cursor: default !important;
}

.mdmContainer .input_height {
  height: 55px;
}

.mdmDialog .input_height {
  height: 55px;
}
.mdmDialog .gb_white_theme {
      background-color: #fff !important;
    color: #333 !important;
    font-weight: 900 !important;
}
.mdmDialog .gb_white_theme:hover {
      background-color: #fff !important;
    color: #333 !important;
    font-weight: 900 !important;
}


.mdmContainer a.downloadFileFonts {
  color: #fff
}

.mdmContainer .head_container {
  width: 100% !important;
  padding-left: 0;
  margin-top: -4rem;
}

.mdmContainer a.downloadFileFonts:hover {
  color: #fff !important;
}

.mdmContainer .bread_crumb a,
.mdmContainer .bread_crumb span {
  color: #fff;
  font-size: 1.3rem;
}
.mdmDialog .bg_theme{
    background-color: #27AE60 !important;
    border: 1px solid #27AE60;
}
.mdmDialog .bg_theme .mat-select-value-text{
   color: #fff !important;
}
.mdmDialog .bg_theme .mat-select-arrow{
   color: #fff !important;
}
.mdmContainer .bread_crumb a:hover,
.mdmContainer .bread_crumb span:hover {
  color: #fff !important;
}

.mdmContainer span.fa.fa-caret-right {
  margin-left: 5px;
  margin-right: 2px;
}

.mdmContainer .uppercase {
  text-transform: uppercase !important;
}

.mat-select-panel.anyClass {
  min-width: calc(100% + 12px) !important;
  width: calc(100% + 12px) !important;
  max-width: calc(100% + 12px) !important;
  top: 2.6rem !important;
  margin-top: 0 !important;
}

.mat-select-panel.multipleAnyClass {
  min-width: calc(100% + 12px) !important;
  width: calc(100% + 12px) !important;
  max-width: calc(100% + 12px) !important;
  left: 4.7rem !important;
  top: 2.6rem !important;
}

.mat-select-panel.multipleAnyClass3 {
  min-width: calc(100% + 12px) !important;
    width: calc(100% + 12px) !important;
    max-width: calc(100% + 12px) !important;
    left: 4.7rem !important;
    top: 6rem !important;
}
.cdk-overlay-connected-position-bounding-box .cdk-overlay-pane .mat-select-panel.ng-animating {
  display: none;
}

.mdmContainer .text_wrap {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.mdmContainer .mat-radio-label {
  font-family: "Open Sans", sans-serif !important;
}
.mdmDialog .text_wrap {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.mdmDialog .mat-radio-label {
  font-family: "Open Sans", sans-serif !important;
}

.mdmContainer .mat-select-disabled {
  background-color: #eee !important;
}

.mdmContainer .card_body1 {
  overflow-y: scroll;
  max-height: 140px !important;
}

.anyClass .mat-select-search-input {
  padding: 6px 36px 2px 16px !important;
  text-transform: uppercase;
  box-sizing: border-box !important;
}

.mat-select-panel.multipleAnyClass_search {
  min-width: calc(100% + 14px) !important;
  width: calc(100% + 14px) !important;
  max-width: calc(100% + 14px) !important;
  left: 4.7rem !important;
  top: 6.2rem !important;
}

.mdmContainer .mat-select-search-inner {
  margin: -4px 0 !important;
}

.mdmContainer .mat-select-search-clear.mat-icon-button {
  top: -5px !important;
  right: -7px !important;
}

.mdmContainer .mat-option-text,
.mdmContainer .mat-select-search-inner .mat-input-element {
  font-family: 'Open Sans', sans-serif !important;
  text-transform: uppercase !important;
}

.mdmContainer .mat-icon-button .mat-icon {
  font-size: 2rem !important;
}

.mdmContainer .mat-select-search-no-entries-found {
  padding: 3px 6px !important;
}

.mdmDialog .mat-select-search-inner {
  margin: -4px 0 !important;
}

.mdmDialog .mat-select-search-clear.mat-icon-button {
  top: -5px !important;
  right: -7px !important;
}

.mdmDialog .mat-option-text,
.mdmDialog .mat-select-search-inner .mat-input-element {
  font-family: 'Open Sans', sans-serif !important;
  text-transform: uppercase !important;
}

.mdmDialog .mat-icon-button .mat-icon {
  font-size: 2rem !important;
}

.mdmDialog .mat-select-search-no-entries-found {
  padding: 3px 6px !important;
}

.mdmContainer .mat-tooltip-handset {
  font-size: 14px;
  padding-top: 8px;
  padding-bottom: 8px
}

.mat-tooltip {
    max-width: 400px !important;
    background-color: #27AE60 !important;
    color: #fff !important;
    text-transform: uppercase !important;
    font-family: 'Open Sans', sans-serif !important;
    font-size: 1.6rem !important;
    margin: 0 14px !important;
    overflow: visible !important;
    overflow-wrap: break-word;
}
.cdk-overlay-connected-position-bounding-box .mat-tooltip-panel {
  pointer-events: auto !important;
  margin-left: -50px;
  margin-bottom: 2px;
}
.mdmContainer .mat-select.ng-touched.ng-invalid {
  border: 1px solid red !important;
}
.mdmContainer .mat-select.ng-invalid.mat-select-invalid{
    border: 1px solid red !important; 
}
.mdmDialog .mat-select.ng-touched.ng-invalid {
  border: 1px solid red !important;
}
.mdmContainer .mat-form-field-appearance-outline.ng-touched.ng-invalid .mat-form-field-flex {
  border: 1px solid red;
}
.mdmDialog .mat-form-field-appearance-outline.ng-touched.ng-invalid .mat-form-field-flex {
  border: 1px solid red;
}
.mdmContainer .mat-cell, .mat-footer-cell{
padding: 0 10px !important;
}
.mdmDialog input.mat-input-element:disabled {
  background-color: #eee;
}
.mdmDialog .search_select_branch{
        padding: 0 4px 0px !important;
    }
.anyClass .mat_ngx_select_search {
  font-size: 2.4rem;
  position: absolute;
  top: 1rem;
  left: 0;
}
.mdmContainer .margin--11{
    margin: -11px 0;
}
.mdmContainer .font-19{
  font-size: 19px ;
}
.mdmContainer .width-20vw{
  width: 20vw;
  height: 24px;
}
.mdmContainer .mr_top_22{
margin: 0 0 22px !important;
}
.mdmContainer .pos_absolute{
    position: absolute !important;
    top: 71%;
}
.mdmDialog .pos_absolute{
    position: absolute !important;
    top: 71%;
}
@-moz-document url-prefix(){
  .mdmContainer .mat-select-trigger{
    height: 2.4rem !important;
  }
  .mdmContainer .mat-form-field-appearance-legacy .mat-form-field-underline {
    bottom: 3.2em;
  }
  .mdmContainer .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button, 
  .mdmContainer .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{
    height: 1.5em !important;
    padding: 10px 0 0 0;
  }
  .mat-select-panel.anyClass {
    min-width: calc(100% + 11px) !important;
    width: calc(100% + 11px) !important;
    max-width: calc(100% + 11px) !important;
    top: 2.6rem !important;
  }
  .mat-select-panel.multipleAnyClass {
    min-width: calc(100% + 11px) !important;
    width: calc(100% + 11px) !important;
    max-width: calc(100% + 11px) !important;
    left: 4.7rem !important;
    top: 2.6rem !important;
  }
  .mdmContainer .mat-input-element.cutoff_time {
    padding: 0 4px !important;
    position: relative;
    top: -6px;
  }
}

.mdmContainer .mr-top-8 {
  margin: 0px 0px 0px;
  padding: 4px 4px 8px 4px !important;
}
.mdmDialog .theme_btn{
    text-transform: capitalize;
}
.mdmContainer .theme_btn{
    text-transform: capitalize;
}
.mdmContainer .mr--5{
    margin: -7px 0 !important;
}
.mdmContainer .mr-top-5{
    margin: 5px 0 0 !important;
}
.mdmContainer .form-control[readonly]{
    background-color: #fff !important;
}
.mat-select-panel.anyClass.multipleAnyClass_search_2{
    left: 1.4rem !important;
    top: 6.2rem !important;
}
.mdmContainer .pd_left_20{
padding: 0 0px 0 20px;
}
.mdmContainer .bg_branch_geay{
    background-color: #F8F8F8 !important;
}
.mdmContainer .text-left{
    text-align: left !important;
}
.mdmDialog .text-left{
    text-align: left !important;
}
.mdmDialog .mr_left_5_5{
    margin:5px 8px 5px 0;
}
.mdmDialog .mr_left_15_5{
       margin: -14px 0 0;
    text-align: right;
}
.mdmContainer button.btn_with_bdr{
        background: transparent;
    background-color: transparent !important;
    color: #333 !important;
    padding: 3px 20px!important;
    border: 1px solid #27AE60 !important;
    font-weight: 700;
}
.mdmContainer button.btn_with_bdr:hover{
    background: transparent !important;
}
.mdmContainer .width_2_percn{
    width:2%;
}
.mdmContainer .pd_left_22{
    padding: 0 0 0 22px;
}
.mdmDialog .pd_left_22{
    padding: 0 0 0 22px;
}
.mdmDialog .mr-10 {
    margin:0 0 20px 0 !important;
  }
.mdmDialog .search_icon_bar{
    position: absolute;
    font-size: 15px;
    top: 5px;
    left: 5px;
}
@supports (-ms-ime-align:auto) {
  .cdk-overlay-pane {
    display: block;
  }
  .mat-select-panel {
    flex: 1 0 auto;
  }
  .mdmContainer .material-icons {
    /* Support for IE */
    font-feature-settings: 'liga';
  }
  .mdmDialog .material-icons {
    /* Support for IE */
    font-feature-settings: 'liga';
  }
  .cdk-overlay-connected-position-bounding-box .cdk-overlay-pane .mat-select-panel.ng-animating {display: block !important;}
  .mdmContainer :not(.mat-form-field-appearance-legacy).mat-form-field .mat-form-field-prefix .mat-icon-button, 
  .mdmContainer :not(.mat-form-field-appearance-legacy).mat-form-field .mat-form-field-suffix .mat-icon-button {
    margin-top: -2.6rem;
    height: 1.5em !important;
  }
  .mdmDialog :not(.mat-form-field-appearance-legacy).mat-form-field .mat-form-field-prefix .mat-icon-button, 
  .mdmDialog :not(.mat-form-field-appearance-legacy).mat-form-field .mat-form-field-suffix .mat-icon-button{
    margin-top: -2.6rem;
  }
  .mat-select-panel.anyClass {
    min-width: calc(100% + 8px) !important;
    width: calc(100% + 8px) !important;
    max-width: calc(100% + 8px) !important;
    top: 2.6rem !important;
  }
  
  .mat-select-panel.multipleAnyClass {
    min-width: calc(100% + 8px) !important;
    width: calc(100% + 8px) !important;
    max-width: calc(100% + 8px) !important;
    left: 4.7rem !important;
    top: 2.6rem !important;
  }
  .mdmContainer .select_box_dropwodn .mat-form-field-flex .mat-select{
    margin-top: 0rem;
  }
  .mdmContainer .mat-select {
    padding: 4px;
  }
  .mdmDialog input.mat-input-element:disabled {
    background-color: #eee;
  }
   
  .mdmContainer input.mat-input-element:disabled {
    background-color: #eee;
  }
  .mdmContainer .mat-input-element.cutoff_time {
    padding: 0 4px !important;
    position: relative;
    top: -6px;
  }

}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  /* IE10+ CSS styles go here */
  /** IE 11 fixes */
  .cdk-overlay-pane {
    display: block;
  }
}


@-moz-document url-prefix() {

  .mdmContainer .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-datepicker-toggle-default-icon,
  .mdmContainer .mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-datepicker-toggle-default-icon {
    margin: -14px 5px !important;
  }
  
.mdmContainer .mr--5{
  margin: 0px 0 !important;
}

}
.mdmContainer .pd_000{
  padding: 0px !important;
}
.mdmDialog .pd_000{
  padding: 0px !important;
}

[hidden] {
	display: none !important;
  }
.mdmContainer .add_btn .material-icons{
  color: #fff !important;
}
.mdmDialog .add_btn .material-icons{
  color: #fff !important;
}

/* route css only 08/jun/2020 */
.mdmContainer .manage_route_sec .breadcrumbs_nav{
  background: transparent;
}
.mdmContainer .manage_route_sec .breadcrumbs span a, .mdmContainer .manage_route_sec .breadcrumbs span, .mdmContainer .manage_route_sec .breadcrumbs_icon{
  color: #fff;
}
.mdmContainer .rout_good_morning h2, .mdmContainer .rout_good_morning h3{
  color: #fff;
}

.mdmContainer .rout_good_morning h2{
  line-height: 40px;
  font-weight: 400;
  margin: 0px;
}
.mdmContainer .rout_good_morning span{
  font-weight: 600;
}
.mdmContainer .rout_good_morning{
  margin-bottom: 30px;
}
.mdmContainer .route_hub_btn_sec{
  height: 400px;
  border-right: 1px solid #ddd;
}
.mdmContainer .route_hub_btn_sec{
  text-align: center;
}
.mdmContainer .route_hub_btn_sec .mat-button{
  width: 80%;
  margin-bottom: 10px;
}
.mdmContainer .route_details_h{
  padding-left: 15px;
}
.mdmContainer .route_hub_btn_sec .deactive{
  background: #fafafa;
}
.mdmContainer .route_tale_inhancement .mat-table{
  padding: 0px;
}
.mdmContainer .manage_route_sec .all_branch_right .mat-row{
  margin-bottom: 2px;
  border: none;
}
.mdmContainer .manage_route_sec .manage_route_table{
  border: none;
}
.mdmContainer .manage_route_sec .all_branch_right .mat-row{
  background: #fafafa;
}
.mdmContainer .search_form_route .mat-input-element{
  padding-left: 20px !important;
}
.mdmContainer .route_tale_inhancement .mat-row{
  border: none;
  background: #fafafa;
}
.mdmContainer .dragndrop_delete{
  position: relative;
}
.mdmContainer .dragndrop_delete i{
  position: absolute;
  top: 0px;
  right: 0px;
}
.mdmContainer .hyperLink_Color {
 color:#27AE60 !important;
}
.mdmContainer .route_touch_new{
  border-bottom: none;
}
.mat-select-search-inner.mat-typography.mat-datepicker-content.mat-tab-header {
    position: fixed !important;
    top: 45.5px !important;
}
.mat-select-search-no-entries-found {
    padding: 4px !important;
    text-align: center !important;
}
@media only screen and (min-width:768px)  and (max-width:1365px){
 .mdmContainer .width_mat_cell_2 {
    width: 19% !important;
}
.mdmContainer .mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background, .mdmContainer .mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background {
    background-color: #6A6868 !important;
}

}
`

       ngOnInit(){
        var container;
        if (/Edge/.test(navigator.userAgent)) {
            container = document.getElementsByTagName('head')[0]
        }else{
            container = document.getElementsByClassName('mdmContainer')[0]
        }
          const  style:any = document.createElement('style');
          style.type = 'text/css';    
          style.appendChild(document.createTextNode( this.core_css + this.style_css));
          container.appendChild(style);
    }
    constructor(public dialog: MatDialog, public ref: ApplicationRef) {
        setInterval(()=>{this.ref.tick() }, 100)
         sessionStorage.setItem("refresh_component", location.pathname.replace('/', ""))
  
    }

    showMessage(message: string, type?: string) {

        let snackbar = document.getElementById("snackbar_module");
        let snack_msg = document.getElementById("snack_msg");
        snackbar.style.display = "block";
        snackbar.style.animation = "fadeIn 0.5s linear";
        snackbar.style.background = "#F89406";
         snackbar.style.textTransform = "capitalize";
        if (type == "danger") {
            snackbar.style.background = "#ef4848";
        }
        snack_msg.innerText = message;
        this.removeToast(snackbar);
	}
	
	cleartimeout(){
		clearTimeout(this.settimeout);
	}
	
	removeToast(snackbar =null){
		if(!snackbar){
			snackbar = document.getElementById("snackbar_module");
		}
		this.settimeout= setTimeout(() => {
            snackbar.style.animation = "fadeOut 0.5s linear";
			setTimeout(() => {
			    snackbar.style.display = "none";
			}, 300);
        }, 3500);
	}

    openDeleteDialog(heading, title) {
        return this.dialog.open(DeleteModalComponent, {
            panelClass: 'mdmDialog',
            width: '30vw',
            data: { heading: heading, title: title }
        });
    }


    openAddStateDialog(zoneId = null, stateList = null, selectedStates = null) {
        return this.dialog.open(AddStateComponent, {
            panelClass: 'mdmDialog',
            width: '30vw',
            data: { id: zoneId, states: stateList, selectedStates: selectedStates }
        });
    }



}
