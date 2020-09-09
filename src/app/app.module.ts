import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import {RouterModule, Routes} from "@angular/router";
import {CustomMaterialModule} from "./core/material.module";
import { LayoutModule } from '@angular/cdk/layout';
import {DatePipe, APP_BASE_HREF} from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreditdashboardComponent, EditFlowDataComponent } from './_contract/creditdashboard/creditdashboard.component';
import { GlobalMsaComponent } from './_contract/msa/global-msa/global-msa.component';
import { ContractComponent } from './_contract/contract/contract.component';
import { OpportunityComponent, SearchContractEdit } from './_contract/opportunity/opportunity.component';
import { ServiceComponent } from './_contract/service/service.component';
import {  ConsignorUploadFile,MsaComponent,DownloadErrorFile } from './_contract/msa/msa.component';
import { RatecardComponent, SearchCcDialogBox, BaseLocationSearchB} from './_contract/ratecard/ratecard.component';
import { BillingComponent,CneeCnorDialogBox, BranchDialogBox, AddressDialogBox } from './_contract/billing/billing.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { StepperComponent } from './_contract/stepper/stepper.component';
import { MsaOprationComponent } from './_contract/msa/msa-opration/msa-opration.component';
import { MsacreationComponent,ConsignorAddition,BaseLocationSearchMSA } from './_contract/msa/msacreation/msacreation.component';
import { PreviewComponent, EditPreview,EmailDialogBoxP } from './_contract/preview/preview.component';
import { DocumentuploadComponent } from './_contract/documentupload/documentupload.component';
import { MsaopportunityComponent } from './_contract/msa/msaopportunity/msaopportunity.component';
import { CommandmentComponent, SlabDialogBox, ExcludePinDialogBox, GeoWiseChargeDialogBox } from './_contract/commandment/commandment.component';
import { PincodesearchComponent } from './_contract/pincodesearch/pincodesearch.component';
import { CitysearchComponent } from './_contract/citysearch/citysearch.component';
import { StatesearchComponent } from './_contract/statesearch/statesearch.component';
import { ExistingsafexlistComponent } from './_contract/existingsafexlist/existingsafexlist.component';
import { ContractversionComponent } from './_contract/contractversion/contractversion.component';
import { confimationdialog } from './_contract/confirmationdialog/confimationdialog';
import { VersionpreviewComponent } from './_contract/versionpreview/versionpreview.component';
import { NumericDirective } from './shared/numeric.directive';
import{rangeTncDirective} from './shared/rangeTnc.directive';
import { AlphanumericDirective} from './shared/alphanumeric.directive';
import { DatepickerDirective} from './shared/datepicker.directive';
import { ValidationMsgComponent } from './validation-msg/validation-msg.component';
import { BranchComponent,ConsignorDialog ,BaseLocationAdvanceSearch,BranchConsignorMapplingDialog} from './_contract/branch/branch.component';
import { GreaterZeroDirective } from './shared/greater-zero.directive';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateFormatAdapter, APP_DATE_FORMATS} from './_contract/date_formate/date.adapter';
import { NgxPrintModule } from 'ngx-print';
import { SortByPipe } from './_contract/pincodesearch/sort-by.pipe';
import { NgpSortModule } from "ngp-sort-pipe";
import { SfxDialogComponent } from './_contract/sfx-dialog/sfx-dialog.component';
import { SubmitbtnComponent } from './_contract/submitbtn/submitbtn.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { CompareversionsComponent } from './_contract/compareversions/compareversions.component';
import { SearchAllOppertunityDialogBox } from './_contract/opportunity/opportunity.component';
import { AuthGuard } from './core/auth.guard';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { ClickOutsideModule } from 'ng-click-outside';
import { AlphabetOnlyDirective } from './shared/alphabet.directive';
import { StringFilterPipe } from './shared/string-filter.pipe';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ReportsComponent } from './_contract/reports/reports.component';
import { NumberOnlyDirective } from './shared/number-only.directive';
import { ExportAsModule } from 'ngx-export-as';
import { NotepadSortPipe } from './shared/notepadId-filter.pipe';

const appRoutes: Routes = [
{path:'retail-contract', canActivate: [AuthGuard],  children:[
  { path: 'retail', component: CreditdashboardComponent, data: { title: 'Home Component' }},
  { path:'creditdashboard', component: CreditdashboardComponent, data: {title: 'Credit Dashboard'}},
 // { path: 'msa', component: MsaComponent, data: {title: 'MSA'}},
  { path: 'opportunity', component: OpportunityComponent, data: {title: 'Oppertunity'}},
  { path: 'service', component: ServiceComponent, data: {title: 'service'}},
  { path: 'ratecard', component: RatecardComponent, data: {title: 'service'}},
  { path: 'ratecard', component: RatecardComponent, data: {title: 'ratecard'}},
  {path: 'billing', component: BillingComponent, data: {title: 'billing'}},
  //{path:'msaoperation',component:MsaOprationComponent ,data:{title:'msa'}},
  {path:'msacreation',component:MsacreationComponent ,data:{title:'createmsa'}},
  {path:'preview',component:PreviewComponent ,data:{title:'preview'}},
  { path: 'documentupload', component: DocumentuploadComponent, data: {title: 'documentupload'}},
  { path: 'msaopportunity', component: MsaopportunityComponent, data: {title: 'msaopportunity'}},
  { path: 'commandment', component: CommandmentComponent, data: {title: 'commandment'}},
  { path: 'pincodesearch', component: PincodesearchComponent, data: {title: 'pincodesearch'}},
  { path: 'citysearch', component: CitysearchComponent, data: {title: 'citysearch'}},
    { path: 'statesearch', component: StatesearchComponent, data: {title: 'statesearch'}},
  { path: 'existingsafexlist', component: ExistingsafexlistComponent, data: {title: 'existingsafexlist'}},
  { path: 'contractversion', component: ContractversionComponent, data: {title: 'contractversion'}},
  { path: 'versionpreview', component: VersionpreviewComponent, data: {title: 'versionpreview'}},
  { path: 'msa', component: GlobalMsaComponent, data: { title: 'msa' } },
  { path: 'msa/:id', component: GlobalMsaComponent, data: { title: 'msa' } },
 // { path: 'contract/:id', component: ContractComponent, data: { title: 'contract' } },
  { path: 'contract', component: ContractComponent, data: { title: 'contract' } },
  { path: 'branch', component: BranchComponent, data: { title: 'branch' } },
  { path: "report", component: ReportsComponent, data: { title: "report" }   },
  { path: '**', component: EmptyRouteComponent }
]}

 

];

@NgModule({
  declarations: [
  StatesearchComponent,
  CitysearchComponent,
    EmptyRouteComponent,
    SfxDialogComponent,
    GreaterZeroDirective,
    SortByPipe,
    PreviewComponent,
    NumericDirective,
    AlphanumericDirective,
    DatepickerDirective,
    AppComponent,
    NavigationComponent,
    MsaComponent,
    ConsignorUploadFile,
    CreditdashboardComponent,
    OpportunityComponent, 
    ServiceComponent,  
    RatecardComponent,
    BillingComponent, 
    SearchCcDialogBox,
    BaseLocationSearchB, 
    StepperComponent,
    CneeCnorDialogBox,
    BranchDialogBox, 
    BranchConsignorMapplingDialog,
    MsaOprationComponent, 
    MsacreationComponent, 
    DocumentuploadComponent,
    ConsignorAddition, 
    MsaopportunityComponent,
    SearchContractEdit,
    BaseLocationSearchMSA,
    DownloadErrorFile,
    AddressDialogBox, 
    PincodesearchComponent, 
    ExistingsafexlistComponent, 
    CommandmentComponent, 
    SlabDialogBox, 
    ExcludePinDialogBox, 
    GeoWiseChargeDialogBox, 
    ContractversionComponent, 
    VersionpreviewComponent,
    ValidationMsgComponent, 
    confimationdialog,
    EditPreview,
    GlobalMsaComponent,
    ContractComponent, 
    BranchComponent,
    ConsignorDialog,
    BaseLocationAdvanceSearch,
    EditFlowDataComponent,
    SubmitbtnComponent,
    CompareversionsComponent,
    SearchAllOppertunityDialogBox,
    AlphabetOnlyDirective,
    StringFilterPipe,
    rangeTncDirective,
    NotepadSortPipe,
    ReportsComponent,
    NumberOnlyDirective,
    EmailDialogBoxP
  ],
   
  imports: [
  ExportAsModule,
    NgpSortModule,
    NgxPrintModule,
    FilterPipeModule,
    LayoutModule,
    FlexLayoutModule,
    NgSelectModule,
    BrowserModule, 
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
     ClickOutsideModule,
     NgxMatSelectSearchModule,
    RouterModule.forRoot(
      appRoutes     
     
    ),
    CustomMaterialModule,
     ToastrModule.forRoot({
      positionClass :'toast-bottom-right',
      preventDuplicates: true,
      timeOut: 5000
    }),
    DragDropModule,
    NgxPermissionsModule.forRoot()
  ],
entryComponents: [
  EmailDialogBoxP,
  CompareversionsComponent,
  ContractversionComponent,
  SfxDialogComponent,
  BaseLocationAdvanceSearch,
  BranchComponent,  
  ConsignorDialog,
  RatecardComponent,
  SearchCcDialogBox,
  BaseLocationSearchB,
  MsaComponent,
  ConsignorUploadFile,
  CneeCnorDialogBox,
  BranchDialogBox,
  BranchConsignorMapplingDialog,
  ConsignorAddition,
  MsaopportunityComponent,
  SearchContractEdit,
  AddressDialogBox,
  BaseLocationSearchMSA,
  DownloadErrorFile,
  SlabDialogBox,
  ExcludePinDialogBox,
  GeoWiseChargeDialogBox,
  confimationdialog,EditPreview,
  EditFlowDataComponent],
  providers: [DatePipe,
      {provide: DateAdapter, useClass: AppDateFormatAdapter},
      {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
      { provide: APP_BASE_HREF, useValue: '/' },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,      
        multi: true,
        },
      
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

