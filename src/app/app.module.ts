import { ValidDateDirective } from './core/directive/valid-date.directive';
import { AppDateFormatAdapter, APP_DATE_FORMATS } from './date.adapter';
import { MultipleFilterPipe } from './core/pipe/multiple-filter.pipe';
import { NumberOnlyDirective } from './core/directive/numberonly.directive';
import { TextUpperCaseDirective } from './core/directive/text-upper-case.directive';
import { ShowNamePipe } from './core/pipe/showName.pipe';
import { AutoSelectFirstOptionDirective } from './core/directive/auto-select-first-option.directive';
import { SortByPipe } from './core/pipe/sortby.pipe';
import { StringFilterPipe } from './core/pipe/string-filter.pipe';
import { TrackWaybillComponent } from 'src/app/dialog/track-waybill/track-waybill.component';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Component } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavigationComponent } from "./navigation/navigation.component";
import { RouterModule, Routes } from "@angular/router";
import { CustomMaterialModule } from "./core/material.module";
import { LayoutModule } from "@angular/cdk/layout";
import { DatePipe, APP_BASE_HREF } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ToastrModule } from "ngx-toastr";
import { NgxSpinnerModule } from "ngx-spinner";
import { NumericDirective } from "./shared/numeric.directive";
import { AlphanumericDirective } from "./shared/alphanumeric.directive";
import { DatepickerDirective } from "./shared/datepicker.directive";
import { ValidationMsgComponent } from "./validation-msg/validation-msg.component";
import { GreaterZeroDirective } from "./shared/greater-zero.directive";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { NgxPrintModule } from "ngx-print";
import { EmptyRouteComponent } from "./empty-route/empty-route.component";
import { NgxPermissionsModule } from "ngx-permissions";
// import { ChartsModule, ThemeService } from 'ng2-charts';
import 'chartjs-plugin-labels';
import { AuthGuard } from "./core/auth.guard";
import * as moment from 'moment';
import { AuthInterceptor } from "./core/interceptor/auth.interceptor";
import { SelectWaybillComponent } from "./dialog/select-waybill/select-waybill.component";
import { OpenBookingComponent } from './dialog/open-booking/open-booking.component';
import { AssignBookingComponent } from './dialog/assign-booking/assign-booking.component';
import { StartBookingComponent } from './component/start-booking/start-booking.component';
import { AddNewConsigneeComponent } from './dialog/add-new-consignee/add-new-consignee.component';
import { ReschedulePickupComponent } from './dialog/reschedule-pickup/reschedule-pickup.component';
import { ForwardBookingComponent } from './dialog/forward-booking/forward-booking.component';
import { CreateNewRequestComponent } from './dialog/create-new-request/create-new-request.component';
import { EwaybillNumberComponent } from './dialog/ewaybill-number/ewaybill-number.component';
import { ViewWaybillComponent } from './component/view-waybill/view-waybill.component';
import { SwitchBranchComponent } from './dialog/switch-branch/switch-branch.component';
import { ManageVmiComponent } from './component/manage-vmi/manage-vmi.component';
import { AttachPartNumberComponent } from './dialog/attach-part-number/attach-part-number.component';
import { WaybillInventoryComponent } from './component/waybill-inventory/waybill-inventory.component';
import { UgdDashboardComponent } from './component/ugd-dashboard/ugd-dashboard.component';
import { ReRoutingDashboardComponent } from './component/re-routing-dashboard/re-routing-dashboard.component';
import { ReBookingDashboardComponent } from './component/re-booking-dashboard/re-booking-dashboard.component';
import { CreateUgdRequestComponent } from './component/create-ugd-request/create-ugd-request.component';
import { CreateReRoutingRequestComponent } from './component/create-re-routing-request/create-re-routing-request.component';
import { CreateReBookingRequestComponent } from './component/create-re-booking-request/create-re-booking-request.component';
import { UpdateManifestComponent } from './component/update-manifest/update-manifest.component';
import { ExtendManifestComponent } from './dialog/extend-manifest/extend-manifest.component';
import { ScanLoadPackagesComponent } from './component/scan-load-packages/scan-load-packages.component';
import { CreateManifestComponent } from './component/create-manifest/create-manifest.component';
import { CreateStaffComponent } from './component/create-staff/create-staff.component';
import { ViewManifestComponent } from './component/view-manifest/view-manifest.component';
import { StickerPrintComponent } from './dialog/sticker-print/sticker-print.component';
import { ViewStaffDetailsComponent } from './dialog/view-staff-details/view-staff-details.component';
import { ManifestCreationComponent } from './component/manifest-creation/manifest-creation.component';
import { PrintStickerComponent } from './component/print-sticker/print-sticker.component';
import { StaffMasterComponent } from "./component/staff-master/staff-master.component";
import { MyBookingsComponent } from './component/my-bookings/my-bookings.component';
import { ActiveDeviceComponent } from './component/active-device/active-device.component';
import { FormComponent } from './component/form/form.component';
import { CreateWaybillComponent } from './component/create-waybill/create-waybill.component';
import { ViewTrackComponent } from './component/view-track/view-track.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { EditWaybillComponent } from './component/edit-waybill/edit-waybill.component';
import { SearchBranchComponent } from './dialog/search-branch/search-branch.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OnlyNumberAndColonDirective } from './core/directive/onlynumberAndColon';
import { InvoiceAmountConfirmationComponent } from './dialog/invoice-amount-confirmation/invoice-amount-confirmation.component';
import { AlphaNumericDirective } from './core/directive/alphaNumeric.directive';
import { NumericAndDecimalDirective } from './core/directive/numericAndDecimal.directive';
import { FinaliseModalComponent } from './dialog/finalise-modal/finalise-modal.component';
import { ConfirmManifestModalComponent } from './dialog/confirm-manifest-modal/confirm-manifest-modal.component';
import { ConsigneeModalComponent } from './dialog/consignee-modal/consignee-modal.component';
import { SearchCustomerComponent } from './dialog/search-customer/search-customer.component';
import { CancelBookingComponent } from './dialog/cancel-booking/cancel-booking.component';
import { MopDialogComponent } from './dialog/mop-dialog/mop-dialog.component';


import { ModeOfPaymentValidateComponent } from './dialog/mode-of-payment-validate/mode-of-payment-validate.component';
import { SearchPipe } from './core/pipes/search.pipe';
import { ChartsModule, ThemeService } from 'ng2-charts';
import 'chartjs-plugin-labels';
import { WaybillDetailsComponent } from './dialog/waybill-details/waybill-details.component';
import { InitiateBookingComponent } from './component/initiate-booking/initiate-booking.component';
import { CreateStartBookingComponent } from './component/create-start-booking/start-booking.component';
import { PrebookingCreateWaybillComponent } from './component/prebooking-create-waybill/prebooking-create-waybill.component';
import { ToStringPipe } from './core/pipes/to-string.pipe';
import { PaymentReceiptComponent } from './dialog/payment-receipt/payment-receipt.component';
import { ProductConfirmationComponent } from './dialog/product-confirmation/product-confirmation.component';
import { PrebookingRetailComponent } from './component/prebooking-retail/prebooking-retail.component';
import { AddEmailComponent } from './dialog/add-email/add-email.component';
import { WaybillEWaybillComponent } from './dialog/waybill-ewaybill/waybill-ewaybill.component';
import { MapToBranchNamePipe } from './core/pipes/map-to-branch-name.pipe';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ReroutingStartBookingComponent } from './component/rerouting-start-booking/rerouting-start-booking.component';
import { UgdStartBookingComponent } from './component/ugd-start-booking/ugd-start-booking.component';
import { OutboundStartBookingComponent } from './component/outbound-start-booking/outbound-start-booking.component';
import { ViewStartBookingComponent } from './component/view-start-booking/view-start-booking.component';
import { CreatePreBookingComponent } from './component/create-pre-booking/create-pre-booking.component';
import { CancelcompComponent } from './dialog/cancelcomp/cancelcomp.component';
import { EpaymentRequestComponent } from './dialog/e-payment/e-payment.component';
import { PaymentRcptComponent } from './dialog/rcpt-dialog/payment-rcpt.component';
import { CreateInitiateWaybillBookingComponent } from './component/create-waybill-api/create-waybill-api.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { CreateInitiateWaybillComponent } from './component/create-initiate-waybill/create-initiate-waybill.component';
import { SearchFilterPipe } from './core/pipes/searchFilter.pipe';
import { activeMobileFilterPipe } from './core/pipes/activeMobileFilter.pipe';
const appRoutes: Routes = [
  {
    path: "bookings-web-booking",
    children: [
      {
        path: "web-booking",
        component: DashboardComponent,
        data: { title: "Dashboard" },
      },
      {
        path: 'create-start-booking',
        component: CreateStartBookingComponent,
        data: {
          title: 'create start booking'
        }
      },
      {
        path: 'reRouting-start-booking',
        component: ReroutingStartBookingComponent,
        data: {
          title: 'Re-Routing start booking'
        }
      },
      {
        path: 'ugd-start-booking',
        component: UgdStartBookingComponent,
        data: {
          title: 'Ugd start booking'
        }
      },
      {
        path: "start-booking",
        component: StartBookingComponent,
        data: { title: "Start Booking" },
      },
      {
        path: "view-waybill",
        component: ViewWaybillComponent,
        data: { title: "View Waybill" },
      },
      {
        path: "manage-vmi",
        component: ManageVmiComponent,
        data: { title: "Manage VMI" },
      },
      {
        path: "create-rebooking-request",
        component: CreateReBookingRequestComponent,
        data: { title: "Create ReBooking Request" },
      },
      {
        path: "create-rerouting-request",
        component: CreateReRoutingRequestComponent,
        data: { title: "Create ReRouting Request" },
      },
      {
        path: 'view-start-booking',
        component: ViewStartBookingComponent,
        data: { title: "view Start booking" },
      },
      {
        path: "create-ugd-request",
        component: CreateUgdRequestComponent,
        data: { title: "Create UGD Request" },
      },
      {
        path: "waybill-inventory",
        component: WaybillInventoryComponent,
        data: { title: "Waybill Inventory" },
      },
      {
        path: "ugd",
        component: UgdDashboardComponent,
        data: { title: "UGD Dashboard" },
      },
      {
        path: "re-routing",
        component: ReRoutingDashboardComponent,
        data: { title: "Re Routing Dashboard" },
      },
      {
        path: "re-booking",
        component: ReBookingDashboardComponent,
        data: { title: "Re Booking Dashboard" },
      },
      {
        path: "manifest-creation",
        component: ManifestCreationComponent,
        data: { title: "Manifest Creation" },
      },
      {
        path: "print-sticker",
        component: PrintStickerComponent,
        data: { title: "Print Sticker" },
      },
      {
        path: "staff-master",
        component: StaffMasterComponent,
        data: { title: "Staff Master" },
      },
      {
        path: "my-bookings",
        component: MyBookingsComponent,
        data: { title: "My Bookings" },
      },
      {
        path: "active-device",
        component: ActiveDeviceComponent,
        data: { title: "Active Device" },
      },
      {
        path: "form",
        component: FormComponent,
        data: { title: "Active Device" },
      },
      {
        path: "create-waybill",
        component: CreateWaybillComponent,
        data: { title: "Create Waybill" },
      },
      {
        path: "track-waybill",
        component: ViewTrackComponent,
        data: { title: "Track Waybill" },
      },
      {
        path: "create-manifest",
        component: CreateManifestComponent,
        data: { title: "create-manifest" },
      },
      {
        path: "view-manifest",
        component: ViewManifestComponent,
        data: { title: "view-manifest" },
      },
      {
        path: "update-manifest",
        component: UpdateManifestComponent,
        data: { title: "update-manifest" },

      },
      {
        path: "create-staff",
        component: CreateStaffComponent,
        data: { title: "create-staff" },

      },
      {
        path: "edit-waybill",
        component: EditWaybillComponent,
        data: { title: "Edit Waybill" },

      },
      {
        path: "initiate-waybill",
        component: CreateInitiateWaybillBookingComponent,
        data: { title: "Initiate Waybill" },
       },
      {
        path: 'prebooking-initiate-waybill',
        component: PrebookingCreateWaybillComponent,
        data: { title: "Prebooking Initiate Waybill" },
      },
      {
        path: 'prebooking-waybill',
        component: CreatePreBookingComponent,
        data: { title: "Prebooking  Waybill" },
      },
      {
        path: 'outbound-start-booking',
        component: OutboundStartBookingComponent,
        data: { title: "Outbound start booking" },
      },
      {
        path: 'prebooking-start-waybill',
        component: PrebookingRetailComponent,
        data:{title:"Prebooking Initiate Waybill"}
      },
      {
        path: "scan-load-packages",
        component: ScanLoadPackagesComponent,
        data: { title: "Scan Load Packages" },
      },
      {
        path: "payment-rcpt",
        component: PaymentRcptComponent,
        data: { title: "Success" },

      },
    ],
  },
];

@NgModule({
  declarations: [
    MapToBranchNamePipe,
    DashboardComponent,
    CreateStartBookingComponent,
    NumericDirective,
    ValidDateDirective,
    AlphanumericDirective,
    DatepickerDirective,
    AppComponent,
    NavigationComponent,
    CreateWaybillComponent,
    ValidationMsgComponent,
    GreaterZeroDirective,
    TextUpperCaseDirective,
    NumberOnlyDirective,
    OnlyNumberAndColonDirective,
    AlphaNumericDirective,
    NumericAndDecimalDirective,
    EmptyRouteComponent,
    MultipleFilterPipe,
    SelectWaybillComponent,
    OpenBookingComponent,
    AssignBookingComponent,
    StartBookingComponent,
    AddNewConsigneeComponent,
    ReschedulePickupComponent,
    ForwardBookingComponent,
    CreateNewRequestComponent,
    EwaybillNumberComponent,
    ViewWaybillComponent,
    SwitchBranchComponent,
    StringFilterPipe,
    SortByPipe,
    ManageVmiComponent,
    AttachPartNumberComponent,
    WaybillInventoryComponent,
    UgdDashboardComponent,
    ReRoutingDashboardComponent,
    ReBookingDashboardComponent,
    CreateUgdRequestComponent,
    CreateReRoutingRequestComponent,
    CreateReBookingRequestComponent,
    UpdateManifestComponent,
    ExtendManifestComponent,
    ScanLoadPackagesComponent,
    CreateManifestComponent,
    CreateStaffComponent,
    ViewManifestComponent,
    StickerPrintComponent,
    ViewStaffDetailsComponent,
    ManifestCreationComponent,
    PrintStickerComponent,
    StaffMasterComponent,
    MyBookingsComponent,
    MyBookingsComponent,
    ActiveDeviceComponent,
    FormComponent,
    ShowNamePipe,
    TrackWaybillComponent,
    ViewTrackComponent,
    CreateWaybillComponent,
    EditWaybillComponent,
    AutoSelectFirstOptionDirective,
    SearchBranchComponent,
    InvoiceAmountConfirmationComponent,
    FinaliseModalComponent,
    ConfirmManifestModalComponent,
    ConsigneeModalComponent,
    ProductConfirmationComponent,
    SearchCustomerComponent,
    CancelBookingComponent,
    MopDialogComponent,
    ModeOfPaymentValidateComponent,
    SearchPipe,
    activeMobileFilterPipe,
    SearchFilterPipe,
    ToStringPipe,
    WaybillDetailsComponent,
    InitiateBookingComponent,
    PrebookingCreateWaybillComponent,
    CreatePreBookingComponent,
    PaymentReceiptComponent,
    ProductConfirmationComponent,
    PrebookingRetailComponent,
    AddEmailComponent,
    WaybillEWaybillComponent,
    ReroutingStartBookingComponent,
    UgdStartBookingComponent,
    OutboundStartBookingComponent,
    ViewStartBookingComponent,
    CancelcompComponent,
    EpaymentRequestComponent,
    PaymentRcptComponent,
    CreateInitiateWaybillComponent,
    CreateInitiateWaybillBookingComponent
  ],

  imports: [
    LayoutModule,
    FlexLayoutModule,
    NgSelectModule,
    BrowserModule,
    ChartsModule,
    NgxSpinnerModule,
    NgxPrintModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    FormsModule,
    ChartsModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
    RouterModule.forRoot(
      appRoutes

      // { useHash: true } // <-- debugging purposes only
    ),
    CustomMaterialModule,
    ToastrModule.forRoot({
      positionClass: "toast-top-right",
      preventDuplicates: true,
      timeOut: 5000,
    }),
    NgxPermissionsModule.forRoot(),
    DragDropModule
  ],
  entryComponents: [
    DashboardComponent,
    SearchBranchComponent,
    SelectWaybillComponent,
    OpenBookingComponent,
    WaybillDetailsComponent,
    AssignBookingComponent,
    StartBookingComponent,
    AddNewConsigneeComponent,
    ReschedulePickupComponent,
    ForwardBookingComponent,
    CancelcompComponent,
    CancelBookingComponent,
    MopDialogComponent,
    EwaybillNumberComponent,
    ViewWaybillComponent,
    SwitchBranchComponent,
    ManageVmiComponent,
    CreateNewRequestComponent,
    AttachPartNumberComponent,
    CreateReBookingRequestComponent,
    CreateReRoutingRequestComponent,
    CreateUgdRequestComponent,
    WaybillInventoryComponent,
    UgdDashboardComponent,
    UpdateManifestComponent,
    ExtendManifestComponent,
    ScanLoadPackagesComponent,
    CreateManifestComponent,
    CreateStaffComponent,
    ViewManifestComponent,
    StickerPrintComponent,
    ViewStaffDetailsComponent,
    ManifestCreationComponent,
    PrintStickerComponent,
    StaffMasterComponent,
    MyBookingsComponent,
    ActiveDeviceComponent,
    FormComponent,
    TrackWaybillComponent,
    CreateWaybillComponent,
    ViewTrackComponent,
    InvoiceAmountConfirmationComponent,
    EditWaybillComponent,
    ConfirmManifestModalComponent,
    FinaliseModalComponent,
    SearchCustomerComponent,
    ConsigneeModalComponent,
    ProductConfirmationComponent,
    ModeOfPaymentValidateComponent,
    PaymentReceiptComponent,
    AddEmailComponent,
    WaybillEWaybillComponent,
    EpaymentRequestComponent,
    PaymentRcptComponent,
    CreateInitiateWaybillComponent,
    CreateInitiateWaybillBookingComponent
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,

    },
    ThemeService,
    {
      provide: DateAdapter,
      useClass: AppDateFormatAdapter
    },
    ThemeService,
    {
      provide: DateAdapter,
      useClass: AppDateFormatAdapter
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS
    },
    { provide: APP_BASE_HREF, useValue: "/" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
