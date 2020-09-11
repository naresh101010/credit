import { LimitToDirective } from './directives/limit-to.directive';
import { AutoSelectFirstOptionDirective } from './directives/auto-select-first-option.directive';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { RrValueComponent } from './modals/rr-value/rr-value.component';
import { BranchAdvanceSearchComponent } from './modals/branch-advance-search/branch-advance-search.component';
import { PercentageNumberDirective } from './directives/percentage-number.directive';
import { StringFilterPipe } from './pipes/string-filter.pipe';
import { MinValidatorDirective } from './directives/min.directive';
import { SortByPipe } from './pipes/sortBy.pipe';
import { ValidDateDirective } from './directives/valid-date.directive';
import { AuthGuard } from './auth.guard';
import { AppSetting } from './app.setting';
import { BranchPinMapComponent } from './components/branch-pin-map/branch-pin-map.component';
import { ShowNamePipe } from './pipes/show-name.pipe';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { TwoDecimalDirective } from './directives/two-decimal.directive';
import { TextUpperCaseDirective } from './directives/text-upper-case.directive';
import { TextUpperCaseDirectiveOnly } from './directives/text-upper-case-only.directive';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { ViewLogisticComponent } from './components/view-logistic/view-logistic.component';
import { ViewZoneMatrixComponent } from './components/view-zone-matrix/view-zone-matrix.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './header/header.component';
import { NavSidebarComponent } from './nav-sidebar/nav-sidebar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ZoneMatrixComponent } from './zone-matrix/zone-matrix.component';
import { OrganisationComponent } from './organisation/organisation.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './HeaderInterceptor';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';
import { StatusDescPipe } from './pipes/status-desc.pipe';
import { AddSlaComponent } from './components/add-sla/add-sla.component';
import { DemoComponent } from './demo/demo.component';
import { AddStateComponent } from './modals/add-state/add-state.component';
import { AdHostDirective } from './directives/ad-host.directive';
import { ManagePinComponent } from './manage-pin/manage-pin.component';
// import { CustomDateAdapter } from './CustomDateAdapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { RateGroupComponent } from './components/rate-group/rate-group.component';
import { GeographyComponent } from './geography/geography.component';
import { AddOrganisationComponent } from './components/add-organisation/add-organisation.component';
import { AddGeographyComponent } from './components/add-geography/add-geography.component';
import { BranchComponent } from './branch/branch.component';
import { EditOrganisationComponent } from './modals/edit-organisation/edit-organisation.component';
import { AddCountryComponent } from './modals/add-country/add-country.component';
import { StateComponent } from './modals/state/state.component';
import { AddDistrictComponent } from './modals/add-district/add-district.component';
import { AddCityComponent } from './modals/add-city/add-city.component';
import { AddPincodeComponent } from './modals/add-pincode/add-pincode.component';
import { PincodeFeatureComponent } from './modals/pincode-feature/pincode-feature.component';
import { NotepadComponent } from './notepad/notepad.component';
import { ViewNotepadComponent } from './components/view-notepad/view-notepad.component';
import { LookupComponent } from './lookup/lookup.component';
import { LookUpComponent } from './components/look-up/look-up.component';
import { ServiceLineComponent } from './components/service-line/service-line.component';
import { ProductMasterComponent } from './components/product-master/product-master.component';
import { SegmentComponent } from './components/segment/segment.component';
import { GstComponent } from './components/gst/gst.component';
import { FuelComponent } from './components/fuel/fuel.component';
import { AddressFeatureComponent } from './components/address-feature/address-feature.component';
import { BillingByValueComponent } from './components/billing-by-value/billing-by-value.component';
import { AddLookupModalComponent } from './modals/add-lookup-modal/add-lookup-modal.component';
import { EditServiceLineComponent } from './modals/edit-service-line/edit-service-line.component';
import { AddProductCategoryComponent } from './modals/add-product-category/add-product-category.component';
import { AddProductMasterComponent } from './modals/add-product-master/add-product-master.component';
import { AddHsnComponent } from './modals/add-hsn/add-hsn.component';
import { EditProductMasterComponent } from './modals/edit-product-master/edit-product-master.component';
import { EditSegmentComponent } from './modals/edit-segment/edit-segment.component';
import { CreateCommandmentComponent } from './create-commandment/create-commandment.component';
import { EditGstComponent } from './modals/edit-gst/edit-gst.component';
import { EditFuelComponent } from './modals/edit-fuel/edit-fuel.component';
import { CommandmentOfferingsComponent } from './modals/commandment-offerings/commandment-offerings.component';
import { EditBillingByValueComponent } from './modals/edit-billing-by-value/edit-billing-by-value.component';
import { EditAddressFeatureComponent } from './modals/edit-address-feature/edit-address-feature.component';
import { ManageRouteComponent } from './manage-route/manage-route.component';
import { EditLookupComponent } from './modals/edit-lookup/edit-lookup.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleMakeComponent } from './components/vehicle-make/vehicle-make.component';
import { VehicleModelComponent } from './components/vehicle-model/vehicle-model.component';
import { VehicleMasterComponent } from './components/vehicle-master/vehicle-master.component';
import { EditVehicleMakeComponent } from './modals/edit-vehicle-make/edit-vehicle-make.component';
import { EditVehicleModelComponent } from './modals/edit-vehicle-model/edit-vehicle-model.component';
import { BranchDetailsComponent } from './components/branch-details/branch-details.component';
import { CommandmentRrComponent } from './commandment-rr/commandment-rr.component';
import { PincodeSearchComponent } from './modals/pincode-search/pincode-search.component';
import { ManageBranchMasterComponent } from './modals/manage-branch-master/manage-branch-master.component';
import { CommandmentOrderComponent } from './modals/commandment-order/commandment-order.component';
import { CommandmentOrreringComponent } from './modals/commandment-orrering/commandment-orrering.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AddSegmentComponent } from './modals/add-segment/add-segment.component';
import { AddSubSegmentComponent } from './modals/add-sub-segment/add-sub-segment.component';
import { EditNotepadComponent } from './modals/edit-notepad/edit-notepad.component';
import { FuelStatePriceComponent } from './modals/fuel-state-price/fuel-state-price.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddFuelStateComponent } from './modals/add-fuel-state/add-fuel-state.component';
import { EditLookupValueModalComponent } from './modals/edit-lookup-value-modal/edit-lookup-value-modal.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CommandmentComponent } from './components/commandment/commandment.component';
import { PricingParameterComponent } from './components/pricing-parameter/pricing-parameter.component';
import { MetroComponent } from './components/metro/metro.component';
import { AddMetroComponent } from './modals/add-metro/add-metro.component';
import { AppDateFormatAdapter, APP_DATE_FORMATS } from './date.adapter';
import { DatePipe } from '@angular/common';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { CustomToolTipComponent } from './components/custom-tool-tip/custom-tool-tip.component';
import { CustomTooltipDirective } from './directives/custom-tooltip.directive';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PincodeBranchSearchComponent } from './modals/pincode-branch-search/pincode-branch-search.component';
import { GstConfirmationComponent } from './modals/gst-confirmation/gst-confirmation.component';
import { HubToHubComponent } from './components/hub-to-hub/hub-to-hub.component';
import { HubToHubAirComponent } from './components/hub-to-hub-air/hub-to-hub-air.component';
import { HubToHubLocalComponent } from './components/hub-to-hub-local/hub-to-hub-local.component';
import { BookingHubComponent } from './components/booking-hub/booking-hub.component';
import { DeliveryLocalRouteComponent } from './components/delivery-local-route/delivery-local-route.component';
import { TouchPointConfirmationComponent } from './modals/touch-point-confirmation/touch-point-confirmation.component';
import { EmptymdmcomponentComponent } from './components/emptymdmcomponent/emptymdmcomponent.component';


const CustomSelectOptions: INgxSelectOptions = {
    "optionValueField": 'id',
    "optionTextField": 'name',
    "keepSelectedItems": false
};

@NgModule({
    declarations: [
        AppComponent,
        MinValidatorDirective,
        HeaderComponent,
        NavSidebarComponent,
        DashboardComponent,
        ZoneMatrixComponent,
        AddGeographyComponent,
        OrganisationComponent,
        EditModalComponent,
        DeleteModalComponent,
        AddSlaComponent,
        ViewLogisticComponent,
        ViewZoneMatrixComponent,
        StatusDescPipe,
        DateFormatPipe,
        DemoComponent,
        AddStateComponent,
        AdHostDirective,
        ManagePinComponent,
        RateGroupComponent,
        GeographyComponent,
        AddOrganisationComponent,
        BranchComponent,
        EditOrganisationComponent,
        AddCountryComponent,
        StateComponent,
        AddDistrictComponent,
        AddCityComponent,
        PercentageNumberDirective,
        AddPincodeComponent,
        PincodeFeatureComponent,
        NotepadComponent,
        ViewNotepadComponent,
        LookupComponent,
        LookUpComponent,
        ServiceLineComponent,
        ProductMasterComponent,
        SegmentComponent,
        GstComponent,
        FuelComponent,
        AddressFeatureComponent,
        BillingByValueComponent,
        AddLookupModalComponent,
        EditServiceLineComponent,
        AddProductCategoryComponent,
        AddProductMasterComponent,
        AddHsnComponent,
        EditProductMasterComponent,
        TextUpperCaseDirective,
        TextUpperCaseDirectiveOnly,
        EditSegmentComponent,
        CreateCommandmentComponent,
        EditSegmentComponent,
        EditGstComponent,
        EditFuelComponent,
        CommandmentOfferingsComponent,
        EditBillingByValueComponent,
        EditAddressFeatureComponent,
        ManageRouteComponent,
        EditLookupComponent,
        VehicleComponent,
        VehicleMakeComponent,
        VehicleModelComponent,
        VehicleMasterComponent,
        EditVehicleMakeComponent,
        EditVehicleModelComponent,
        BranchDetailsComponent,
        CommandmentRrComponent,
        PincodeSearchComponent,
        ManageBranchMasterComponent,
        CommandmentOrderComponent,
        CommandmentOrreringComponent,
        TwoDecimalDirective,
        NumbersOnlyDirective,
        AddSegmentComponent,
        AddSubSegmentComponent,
        ShowNamePipe,
        EditNotepadComponent,
        FuelStatePriceComponent,
        BranchPinMapComponent,
        AddFuelStateComponent,
        EditLookupValueModalComponent,
        EmptyRouteComponent,
        ValidDateDirective,
        CommandmentComponent,
        GstConfirmationComponent,
        PricingParameterComponent,
        MetroComponent,
        AddMetroComponent,
        SortByPipe,
        CustomToolTipComponent,
        CustomTooltipDirective,
        StringFilterPipe,
        PincodeBranchSearchComponent,
        BranchAdvanceSearchComponent,
        HubToHubComponent,
        HubToHubAirComponent,
        HubToHubLocalComponent,
        BookingHubComponent,
        DeliveryLocalRouteComponent,
        RrValueComponent,
        TouchPointConfirmationComponent,
        EmptymdmcomponentComponent,
        TruncateTextPipe,
        AutoSelectFirstOptionDirective,
        LimitToDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        FlexLayoutModule,
        NgxSpinnerModule,
        NgxPaginationModule,
        NgxPermissionsModule.forRoot(),
        NgxMatSelectSearchModule,
        
        NgxSelectModule.forRoot(CustomSelectOptions)
        // TooltipModule.forRoot()
    ],
    providers: [
        AppSetting,
        AuthGuard,
        DatePipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderInterceptor,
            multi: true
        },
        {
            provide: DateAdapter,
            useClass: AppDateFormatAdapter
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: APP_DATE_FORMATS
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        EditModalComponent,
        BranchAdvanceSearchComponent,
        DeleteModalComponent,
        CommandmentOrderComponent,
        EditLookupValueModalComponent,
        ViewZoneMatrixComponent,
        AddSlaComponent,
        ViewLogisticComponent,
        AddOrganisationComponent,
        AddGeographyComponent,
        EditOrganisationComponent,
        AddCountryComponent,
        StateComponent,
        AddDistrictComponent,
        AddCityComponent,
        AddPincodeComponent,
        PincodeFeatureComponent,
        LookUpComponent,
        ServiceLineComponent,
        ProductMasterComponent,
        SegmentComponent,
        GstComponent,
        FuelComponent,
        EmptymdmcomponentComponent,
        AddFuelStateComponent,
        AddressFeatureComponent,
        BillingByValueComponent,
        EditServiceLineComponent,
        AddLookupModalComponent,
        AddProductCategoryComponent,
        AddProductMasterComponent,
        AddHsnComponent,
        EditProductMasterComponent,
        EditSegmentComponent,
        EditGstComponent,
        GstConfirmationComponent,
        EditFuelComponent,
        CommandmentOfferingsComponent,
        EditBillingByValueComponent,
        EditAddressFeatureComponent,
        VehicleModelComponent,
        VehicleMakeComponent,
        VehicleMasterComponent,
        EditVehicleMakeComponent,
        EditLookupComponent,
        EditVehicleModelComponent,
        BranchDetailsComponent,
        CommandmentRrComponent,
        FuelStatePriceComponent,
        PincodeSearchComponent,
        ManageBranchMasterComponent,
        CommandmentOrreringComponent,
        AddStateComponent,
        AddSegmentComponent,
        AddSubSegmentComponent,
        EditNotepadComponent,
        BranchDetailsComponent,
        BranchPinMapComponent,
        PricingParameterComponent,
        CommandmentComponent,
        HubToHubComponent,
        HubToHubAirComponent,
        HubToHubLocalComponent,
        BookingHubComponent,
        DeliveryLocalRouteComponent,
        MetroComponent,
        AddMetroComponent,
        CustomToolTipComponent,
        PincodeBranchSearchComponent,
        RrValueComponent,
        TouchPointConfirmationComponent
    ]
})

export class AppModule { }
