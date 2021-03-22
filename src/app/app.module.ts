import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmiCalculationComponent } from './dialog/emi-calculation/emi-calculation.component';
import { ViewBranchesComponent } from './dialog/view-branches/view-branches.component';
import { SearchBranchComponent } from './dialog/search-branch/search-branch.component';
import { AdHostDirective } from './core/directives/ad-host.directive';
import { AssignVehicleComponent } from './dialog/assign-vehicle/assign-vehicle.component';
import { ContractUpdateComponent } from './dialog/contract-update/contract-update.component';
import { SearchCustomerComponent } from './dialog/search-customer/search-customer.component';
import { AddDesignationComponent } from './dialog/add-designation/add-designation.component';
import { ErrorModalsComponent } from './dialog/error-modals/error-modals.component';
import { InsuranceDeductionComponent } from './dialog/insurance-deduction/insurance-deduction.component';
import { EmiDailyCalculationComponent } from './dialog/emi-daily-calculation/emi-daily-calculation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateAssociateContractComponent } from './components/create-associate-contract/create-associate-contract.component';
import { BranchAllocationComponent } from './components/branch-allocation/branch-allocation.component';
import { BookingPayoutComponent } from './components/booking-payout/booking-payout.component';
import { BookingSlaComponent } from './components/booking-sla/booking-sla.component';
import { BookingDocumentComponent } from './components/booking-document/booking-document.component';
import { SuccessComponent } from './components/success/success.component';
import { CreateAssociateComponent } from './components/create-associate/create-associate.component';
import { AssociateKycComponent } from './components/associate-kyc/associate-kyc.component';
import { VehicleAllocationComponent } from './components/vehicle-allocation/vehicle-allocation.component';
import { VehicleDocumentComponent } from './components/vehicle-document/vehicle-document.component';
import { AssociateStaffComponent } from './components/associate-staff/associate-staff.component';
import { CreateAssociateStaffComponent } from './components/create-associate-staff/create-associate-staff.component';
import { PendingTasksComponent } from './components/pending-tasks/pending-tasks.component';
import { AssignAssociateComponent } from './components/assign-associate/assign-associate.component';
import { BookingAssociateContractUpdateComponent } from './dialog/booking-associate-contract-update/booking-associate-contract-update.component';
import { BranchVehicleAllocationComponent } from './components/branch-vehicle-allocation/branch-vehicle-allocation.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { PreviewComponent, EditPreviewComponent } from './components/preview/preview.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './core/services/api.service';
import { PincodesearchComponent } from './components/pincodesearch/pincodesearch.component';
import { confimationdialog } from './dialog/confirmationdialog/confimationdialog';
import { SortByPipe } from './components/pincodesearch/sort-by.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BookingAssociateContractComponent } from './components/booking-associate-contract/booking-associate-contract.component';
import { JwtService } from './core/services/jwt.service';
import { AuthInterceptor } from './core/services/auth.interceptor';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { StepperComponent } from './components/stepper/stepper.component';
import { PayoutGenDetailComponent } from './components/booking-payout/payout-gen-detail/payout-gen-detail.component';
import{ContractversionComponent}from './components/contractversion/contractversion.component';
import { LookupValuePipe } from './core/pipes/lookup-value.pipe'
import { APP_DATE_FORMATS, AppDateFormatAdapter } from './components/date-format/date.adapter';
import { RouteAllocationComponent } from './components/route-allocation/route-allocation.component';
import { CommercialComponent } from './components/commercial/commercial.component';
import { PreviewPopupComponent } from './dialog/preview-popup/preview-popup.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { EmptyComponetComponent } from './empty-componet/empty-componet.component';
import { CompareVersionComponent } from './dialog/compare-version/compare-version.component';
import { HeaderDataComponent } from './components/header-data/header-data.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterPipe } from './core/pipes/string-filter.pipe';
import { AlphanumericDirective } from './core/directives/alphanumeric.directive';
import { NumericDirective } from './core/directives/numeric.directive';
import { NumberOnlyDirective } from './core/directives/number-only.directive';
import {BlockCopyPasteDirective }from './core/directives/block-copy-paste.directive';
import { GreaterZeroDirective } from './core/directives/greater-zero.directive';
import { AlphabetOnlyDirective } from './core/directives/alphabet.directive';
import { AlphaSpecialCharDirective } from './core/directives/alphaspecialchar.directive';
import { NumericSpecialCharDirective } from './core/directives/numericspecialchar.directive';
import { OnlyNumber } from './core/directives/onlyNumber.directive';
import { ExportAsModule } from 'ngx-export-as';
import { NgxPrintModule } from 'ngx-print';
import { EmailPreviewComponent } from './dialog/email-preview/email-preview.component';
import { PaymentTermsComponent } from './components/payment-terms/payment-terms.component';
import { StaffDocumentComponent } from './components/staff-document/staff-document.component';
import { NumericFourDigitsDirective } from './core/directives/numeric-four-digits.directive';
import { SearchBankBranchComponent } from './dialog/search-bank-branch/search-branch.component';
import { SearchFieldCheckDirective } from './core/directives/searchFieldCheck.directive';
import { ReportsComponent } from './components/reports/reports.component';
import { CustomMaxDirective } from './core/directives/customeMax.directive';

@NgModule({
  declarations: [
    SortByPipe,
    confimationdialog,
    PincodesearchComponent,
    AppComponent,
    BookingAssociateContractComponent,
    EmiCalculationComponent,
    ViewBranchesComponent,
    SearchBranchComponent,
    AdHostDirective,
    AssignVehicleComponent,
    ContractUpdateComponent,
    SearchCustomerComponent,
    AddDesignationComponent,
    ErrorModalsComponent,
    InsuranceDeductionComponent,
    EmiDailyCalculationComponent,
    DashboardComponent,
    CreateAssociateContractComponent,
    BranchAllocationComponent,
    BookingPayoutComponent,
    BookingSlaComponent,
    BookingDocumentComponent,
    SuccessComponent,
    CreateAssociateComponent,
    AssociateKycComponent,
    VehicleAllocationComponent,
    VehicleDocumentComponent,
    AssociateStaffComponent,
    CreateAssociateStaffComponent,
    PendingTasksComponent,
    AssignAssociateComponent,
    BookingAssociateContractUpdateComponent,
    BranchVehicleAllocationComponent,
    VehicleComponent,
    PreviewComponent,
    EmptyRouteComponent,
    StepperComponent,    
    PayoutGenDetailComponent,
    ContractversionComponent,
    LookupValuePipe,
    RouteAllocationComponent,
    CommercialComponent,
    PreviewPopupComponent,
    EmptyComponetComponent,
    CompareVersionComponent,
    HeaderDataComponent,
    StringFilterPipe,
    EditPreviewComponent,
    AlphanumericDirective,
    NumericDirective,
    NumberOnlyDirective,
    BlockCopyPasteDirective,
    GreaterZeroDirective,
    AlphabetOnlyDirective,
    AlphaSpecialCharDirective,
    NumericSpecialCharDirective,
    NumericFourDigitsDirective,
    OnlyNumber,
    EmailPreviewComponent,
    PaymentTermsComponent,
    StaffDocumentComponent,
    SearchBankBranchComponent,
    SearchFieldCheckDirective,
    ReportsComponent,
    CustomMaxDirective
    
  ],
  imports: [
    NgxPermissionsModule.forRoot(),
    NgSelectModule,
    MatPaginatorModule,
    BrowserModule,
    AppRoutingModule,
    NgxPrintModule,
    BrowserAnimationsModule,
    MaterialModule,
    DragDropModule,
    ExportAsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatSlideToggleModule,
    NgxMatSelectSearchModule,
    ToastrModule.forRoot()
  ],
  providers: [
    ApiService,
    ExportAsModule,   
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,      
    multi: true,
    },
    {provide: DateAdapter, useClass: AppDateFormatAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EmiCalculationComponent,
    ViewBranchesComponent,
    SearchBranchComponent,
    AssignVehicleComponent,
    ContractUpdateComponent,
    SearchCustomerComponent,
    AddDesignationComponent,
    EmailPreviewComponent,
    ErrorModalsComponent,
    InsuranceDeductionComponent,
    EmiDailyCalculationComponent,
    BookingAssociateContractUpdateComponent,
    confimationdialog,
    PincodesearchComponent,
    ContractversionComponent,
    PreviewPopupComponent,
    CompareVersionComponent,
    SuccessComponent,
    EditPreviewComponent,
    SearchBankBranchComponent
  ]
})
export class AppModule { }