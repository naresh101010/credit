import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
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
import { CreditdashboardComponent } from './_contract/creditdashboard/creditdashboard.component';
import { OpportunityComponent, SearchContractEdit } from './_contract/opportunity/opportunity.component';
import { ServiceComponent } from './_contract/service/service.component';
import { MsaComponent, ConsignorUploadFile, DownloadErrorFile } from './_contract/msa/msa.component';
import { RatecardComponent, SearchCcDialogBox,BaseLocationSearchB} from './_contract/ratecard/ratecard.component';
import { BillingComponent,CneeCnorDialogBox, BranchDialogBox, AddressDialogBox, EmailDialogBox } from './_contract/billing/billing.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { StepperComponent } from './_contract/stepper/stepper.component';
import { MsaOprationComponent,DownloadReportFile } from './_contract/msa/msa-opration/msa-opration.component';
import { MsacreationComponent,ConsignorAddition,BaseLocationSearchMSA } from './_contract/msa/msacreation/msacreation.component';
import { PreviewComponent, EditPreview } from './_contract/preview/preview.component';
import { DocumentuploadComponent } from './_contract/documentupload/documentupload.component';
import { MsaopportunityComponent } from './_contract/msa/msaopportunity/msaopportunity.component';
import { CommandmentComponent, SlabDialogBox, ExcludePinDialogBox, GeoWiseChargeDialogBox } from './_contract/commandment/commandment.component';
import { PincodesearchComponent } from './_contract/pincodesearch/pincodesearch.component';
import { ExistingsafexlistComponent } from './_contract/existingsafexlist/existingsafexlist.component';
import { ContractversionComponent } from './_contract/contractversion/contractversion.component';
import { confimationdialog } from './_contract/confirmationdialog/confimationdialog';
import { VersionpreviewComponent } from './_contract/versionpreview/versionpreview.component';
import {SearchAllOppertunityDialogBox} from './_contract/opportunity/opportunity.component'
import { CompareversionsComponent } from './_contract/compareversions/compareversions.component';
import { NumericDirective } from './shared/numeric.directive';
import { AlphanumericDirective} from './shared/alphanumeric.directive';
import { DatepickerDirective} from './shared/datepicker.directive';
import { ValidationMsgComponent } from './validation-msg/validation-msg.component';
import { GreaterZeroDirective } from './shared/greater-zero.directive';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateFormatAdapter, APP_DATE_FORMATS} from './_contract/date_formate/date.adapter';
import { NgxPrintModule } from 'ngx-print';
import { SortByPipe } from './_contract/pincodesearch/sort-by.pipe';
import { NgpSortModule } from "ngp-sort-pipe";
import { SfxDialogComponent } from './_contract/sfx-dialog/sfx-dialog.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AuthGuard } from './core/auth.guard';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { ClickOutsideModule } from 'ng-click-outside';
import { AlphabetOnlyDirective } from './shared/alphabet.directive';



const appRoutes: Routes = [
  {path:'contract', canActivate: [AuthGuard], children:[
    { path: '', component: CreditdashboardComponent, data: { title: 'Home Component' }},
    { path:'credit', component: CreditdashboardComponent, data: {title: 'Credit Dashboard'}},
    { path: 'msa', component: MsaComponent, data: {title: 'MSA'}},
    { path: 'opportunity', component: OpportunityComponent, data: {title: 'Oppertunity'}},
    { path: 'service', component: ServiceComponent, data: {title: 'service'}},
    { path: 'ratecard', component: RatecardComponent, data: {title: 'service'}},
    { path: 'ratecard', component: RatecardComponent, data: {title: 'ratecard'}},
    {path: 'billing', component: BillingComponent, data: {title: 'billing'}},
    {path:'msaoperation',component:MsaOprationComponent ,data:{title:'msa'}},
    {path:'msacreation',component:MsacreationComponent ,data:{title:'createmsa'}},
    {path:'preview',component:PreviewComponent ,data:{title:'preview'}},
    { path: 'documentupload', component: DocumentuploadComponent, data: {title: 'documentupload'}},
    { path: 'msaopportunity', component: MsaopportunityComponent, data: {title: 'msaopportunity'}},
    { path: 'commandment', component: CommandmentComponent, data: {title: 'commandment'}},
    { path: 'pincodesearch', component: PincodesearchComponent, data: {title: 'pincodesearch'}},
    { path: 'existingsafexlist', component: ExistingsafexlistComponent, data: {title: 'existingsafexlist'}},
    { path: 'contractversion', component: ContractversionComponent, data: {title: 'contractversion'}},
    { path: 'versionpreview', component: VersionpreviewComponent, data: {title: 'versionpreview'}},
    { path: 'compareversion', component: CompareversionsComponent, data: {title: 'compareversion'}}
  ]}
];

@NgModule({
  declarations: [PreviewComponent,NumericDirective,AlphanumericDirective,DatepickerDirective,
    AppComponent,AlphabetOnlyDirective,
    NavigationComponent,MsaComponent,ConsignorUploadFile,
    CreditdashboardComponent, OpportunityComponent, ServiceComponent,  RatecardComponent,
    BillingComponent, SearchCcDialogBox,SearchAllOppertunityDialogBox,
    // BaseLocationSearchR,
    BaseLocationSearchB, StepperComponent
    ,CneeCnorDialogBox,BranchDialogBox, MsaOprationComponent, MsacreationComponent, DocumentuploadComponent,ConsignorAddition, MsaopportunityComponent,SearchContractEdit,BaseLocationSearchMSA,
    DownloadErrorFile,AddressDialogBox, PincodesearchComponent, ExistingsafexlistComponent, CommandmentComponent, SlabDialogBox, ExcludePinDialogBox, GeoWiseChargeDialogBox, ContractversionComponent, VersionpreviewComponent,
    ValidationMsgComponent,confimationdialog,EditPreview,CompareversionsComponent, GreaterZeroDirective, SortByPipe, SfxDialogComponent,EmailDialogBox, EmptyRouteComponent,DownloadReportFile
  ],
   
  imports: [LayoutModule,FlexLayoutModule,NgSelectModule,
    BrowserModule, NgxSpinnerModule,NgxPrintModule,
    BrowserAnimationsModule,FormsModule, ReactiveFormsModule,HttpClientModule,
    NgpSortModule, ClickOutsideModule, 
    RouterModule.forRoot(
      appRoutes
      
      // { useHash: true } // <-- debugging purposes only
    ),
    CustomMaterialModule,
    ToastrModule.forRoot({
      positionClass :'toast-top-right',
      preventDuplicates: true,
      timeOut: 5000
    }),
    NgxPermissionsModule.forRoot()
  ],
entryComponents: [
   RatecardComponent,SearchCcDialogBox,
   OpportunityComponent,SearchAllOppertunityDialogBox,
   BaseLocationSearchB,
MsaComponent,ConsignorUploadFile,
CneeCnorDialogBox,BranchDialogBox,ConsignorAddition,
MsaopportunityComponent,SearchContractEdit,AddressDialogBox,BaseLocationSearchMSA,DownloadErrorFile,SlabDialogBox
, ExcludePinDialogBox, GeoWiseChargeDialogBox,confimationdialog,EditPreview, SfxDialogComponent,EmailDialogBox,DownloadReportFile],
  providers: [DatePipe,
    {provide: DateAdapter, useClass: AppDateFormatAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,      
      multi: true,
      },
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



