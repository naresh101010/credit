import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdHostDirective } from './core/directives/ad-host.directive';
import { InsuranceDeductionComponent } from './dialog/insurance-deduction/insurance-deduction.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookingPayoutComponent } from './components/booking-payout/booking-payout.component';
import { BookingDocumentComponent } from './components/booking-document/booking-document.component';
import { AssociateKycComponent } from './components/associate-kyc/associate-kyc.component';
import { AssociateStaffComponent } from './components/associate-staff/associate-staff.component';
import { PendingTasksComponent } from './components/pending-tasks/pending-tasks.component';
import { AssignAssociateComponent } from './components/assign-associate/assign-associate.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './core/services/api.service';
// import { PincodesearchComponent } from './components/pincodesearch/pincodesearch.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BookingAssociateContractComponent } from './components/booking-associate-contract/booking-associate-contract.component';
import { JwtService } from './core/services/jwt.service';
import { AuthInterceptor } from './core/services/auth.interceptor';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { PayoutGenDetailComponent } from './components/booking-payout/payout-gen-detail/payout-gen-detail.component';
import { LookupValuePipe } from './core/pipes/lookup-value.pipe'
import { APP_DATE_FORMATS, AppDateFormatAdapter } from './components/date-format/date.adapter';
import { NgxPermissionsModule } from 'ngx-permissions';
import { EmptyComponetComponent } from './empty-componet/empty-componet.component';
import { HeaderDataComponent } from './components/header-data/header-data.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterPipe } from './core/pipes/string-filter.pipe';
import { AlphanumericDirective } from './core/directives/alphanumeric.directive';
import { NumericDirective } from './core/directives/numeric.directive';
import { NumberOnlyDirective } from './core/directives/number-only.directive';
import { GreaterZeroDirective } from './core/directives/greater-zero.directive';
import { AlphabetOnlyDirective } from './core/directives/alphabet.directive';
import { AlphaSpecialCharDirective } from './core/directives/alphaspecialchar.directive';
import { NumericSpecialCharDirective } from './core/directives/numericspecialchar.directive';
import { StepperComponent } from './components/stepper/stepper.component';
import { SortByPipe } from './components/pincodesearch/sort-by.pipe';
import { confimationdialog } from './dialog/confirmationdialog/confimationdialog';
import { EmiCalculationComponent } from './dialog/emi-calculation/emi-calculation.component';
import { CompareVersionComponent } from './dialog/compare-version/compare-version.component';

import { ViewBranchesComponent } from './dialog/view-branches/view-branches.component';
import { SearchBranchComponent } from './dialog/search-branch/search-branch.component';
import { AssignVehicleComponent } from './dialog/assign-vehicle/assign-vehicle.component';
import { ContractUpdateComponent } from './dialog/contract-update/contract-update.component';
import { SearchCustomerComponent } from './dialog/search-customer/search-customer.component';
import { EmiDailyCalculationComponent } from './dialog/emi-daily-calculation/emi-daily-calculation.component';
import { ErrorModalsComponent } from './dialog/error-modals/error-modals.component';
import { AddDesignationComponent } from './dialog/add-designation/add-designation.component';
import { BookingSlaComponent } from './components/booking-sla/booking-sla.component';
import { BranchAllocationComponent } from './components/branch-allocation/branch-allocation.component';
import { CreateAssociateContractComponent } from './components/create-associate-contract/create-associate-contract.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { BranchVehicleAllocationComponent } from './components/branch-vehicle-allocation/branch-vehicle-allocation.component';
import { BookingAssociateContractUpdateComponent } from './dialog/booking-associate-contract-update/booking-associate-contract-update.component';
import { CreateAssociateStaffComponent } from './components/create-associate-staff/create-associate-staff.component';
import { VehicleDocumentComponent } from './components/vehicle-document/vehicle-document.component';
import { VehicleAllocationComponent } from './components/vehicle-allocation/vehicle-allocation.component';
import { CreateAssociateComponent } from './components/create-associate/create-associate.component';
import { SuccessComponent } from './components/success/success.component';
import { PreviewPopupComponent } from './dialog/preview-popup/preview-popup.component';
import { ContractversionComponent } from './components/contractversion/contractversion.component';
import { PreviewComponent, EditPreviewComponent } from './components/preview/preview.component';
import { FromToDirective } from './core/directives/fromTo.directive';
import { ExportAsModule } from 'ngx-export-as';
import { SlaCalulationComponent } from './dialog/sla-calulation/sla-calulation.component';
import { EmailPreviewComponent } from './dialog/email-preview/email-preview.component';
import { BlockCopyPasteDirective } from './core/directives/block-copy-paste.directive';
import { StaffDocumentComponent } from './components/staff-document/staff-document.component';
import { OnlyNumber } from './core/directives/onlyNumber.directive';
import { NgxPrintModule } from 'ngx-print';
import { SearchBankBranchComponent } from './dialog/search-bank-branch/search-branch.component';
import { SearchFieldCheckDirective } from './core/directives/searchFieldCheck.directive';
import { DashboardBranchSearchComponent } from './dialog/dashboard-branch-search/dashboard-branch-search.component';
import { ReportsComponent } from './components/reports/reports.component';

@NgModule({
  declarations: [
    SortByPipe,
    confimationdialog,
    // PincodesearchComponent,
    AppComponent,
    BookingAssociateContractComponent,
    EmiCalculationComponent,
    SlaCalulationComponent,
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
    StaffDocumentComponent,
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
    CompareVersionComponent,
    LookupValuePipe,
    PreviewPopupComponent,
    EmptyComponetComponent,
    ContractversionComponent,
    HeaderDataComponent,
    StringFilterPipe,
    EditPreviewComponent,
    AlphanumericDirective,
    NumericDirective,
    NumberOnlyDirective,
    GreaterZeroDirective,
    AlphabetOnlyDirective,
    AlphaSpecialCharDirective,
    NumericSpecialCharDirective,
    FromToDirective,
    BlockCopyPasteDirective,
    OnlyNumber,
    EmailPreviewComponent,
    SearchBankBranchComponent,
    SearchFieldCheckDirective,
    DashboardBranchSearchComponent,
    ReportsComponent
  ],
  imports: [
    NgxPermissionsModule.forRoot(),
    NgSelectModule,
    MatPaginatorModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    DragDropModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatSlideToggleModule,
    ExportAsModule,
    NgxMatSelectSearchModule,
    NgxPrintModule,
    ToastrModule.forRoot()
  ],
  providers: [
    ApiService,   
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
    SlaCalulationComponent,
    ViewBranchesComponent,
    SearchBranchComponent,
    AssignVehicleComponent,
    ContractUpdateComponent,
    SearchCustomerComponent,
    AddDesignationComponent,
    ErrorModalsComponent,
    InsuranceDeductionComponent,
    EmiDailyCalculationComponent,
    BookingAssociateContractUpdateComponent,
    confimationdialog,
    // PincodesearchComponent,
    ContractversionComponent,
    PreviewPopupComponent,
    CompareVersionComponent,
    SuccessComponent,
    EditPreviewComponent,
    EmailPreviewComponent,
    SearchBankBranchComponent,
    DashboardBranchSearchComponent
  ]
})
export class AppModule { }